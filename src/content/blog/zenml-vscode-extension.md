---
title: "The ZenML VSCode Extension: Bridging Python and TypeScript"
slug: "zenml-vscode-extension"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "660a830db76c5f3a71d06259"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-05-03T07:38:41.574Z"
  lastUpdated: "2024-05-03T07:38:37.938Z"
  createdOn: "2024-04-01T09:49:01.695Z"
author: "marwan-zaarab"
category: "zenml"
tags:
  - "integrations"
  - "machine-learning"
  - "news"
  - "open-source"
  - "python"
  - "zenml"
date: "2024-04-01T00:00:00.000Z"
readingTime: 8 mins
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/96619f85/660ac3dc8cf57b508528727a_High_Level_Overview.png"
seo:
  title: "The ZenML VSCode Extension: Bridging Python and TypeScript - ZenML Blog"
  description: "Community member Marwan Zaarab explains how and why he built a VS Code Extension for ZenML."
  canonical: "https://www.zenml.io/blog/zenml-vscode-extension"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/7c576569/660ac3dc8cf57b508528727a_High_Level_Overview.png"
  ogTitle: "The ZenML VSCode Extension: Bridging Python and TypeScript - ZenML Blog"
  ogDescription: "Community member Marwan Zaarab explains how and why he built a VS Code Extension for ZenML."
---

ZenML has become an essential tool in the rapidly developing landscape of Machine Learning and MLOps, making it easier to build, deploy, and manage ML models in production environments. The creation of [a Visual Studio Code (VSCode) extension for ZenML](https://marketplace.visualstudio.com/items?itemName=ZenML.zenml-vscode) marks another step towards improving developer workflows, combining the flexible capabilities of ZenML and Python with the structured environment of TypeScript.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/0061c1f7/660a843e1bf8a5e02a557c5f_CleanShot_2024-04-01_at_11.53.43.png" alt="__wf_reserved_inherit" />
</figure>

This project took on the challenge of integrating different programming languages to create a smooth workflow, accommodating ZenML's various server configurations—from local to cloud-based setups—within the VSCode ecosystem. My journey involved bringing together Python's versatility with TypeScript's structure, aiming to enhance the user experience.

## Integration

The effort to integrate Python with TypeScript within VSCode explored various approaches, from leveraging *node.js* subprocesses for executing ZenML scripts to contemplating a Flask microservice for data retrieval. Yet, these routes faced obstacles in security, reliability, and the comprehensive encapsulation of ZenML's features.

### The Solution: vscode-python-tools-extension

The  template proved to be the most suitable solution, leveraging the Language Server Protocol (LSP) to enable communication between the VSCode extension and a language server. LSP is a widely-used protocol that facilitates inter-process communication between a code editor or IDE and a language server, providing language-specific features like auto-completion, go to definition, and more.

Adopting the *vscode-python-tools-extension* template was a crucial decision in the implementation journey, offering two main benefits:

<ul><li><strong>Dependency Management</strong>: The clear separation between Python and TypeScript dependencies prevented conflicts and simplified the update process, ensuring smooth operation. This separation allowed me to manage the dependencies of each language independently, reducing the risk of compatibility issues and making the extension easier to maintain.</li><li><strong>Efficient Communication</strong>: By using LSP, I established a reliable channel for data exchange, enabling the extension to interact dynamically with the ZenML library. This communication channel improved the extension's responsiveness and functionality, allowing the integration of ZenML's Python-based capabilities into the TypeScript-developed VSCode extension.</li></ul>

The *vscode-python-tools-extension* template provided a solid base for connecting Python and TypeScript, allowing me to leverage the strengths of both languages while ensuring a cohesive and efficient development process. This approach made it easier to integrate ZenML into VSCode and set the stage for future improvements and expansions of the extension's capabilities.

### High-level overview

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/96619f85/660ac3dc8cf57b508528727a_High_Level_Overview.png" alt="__wf_reserved_inherit" />
</figure>

### Custom LSP Server Implementation

The core of the extension's functionality relies on the Language Server Protocol (LSP), enabling actions within VSCode to trigger corresponding Python operations on the server side. This process involves serializing results into JSON for transmission back to the client, where they are deserialized and integrated into the VSCode interface. The cycle ensures that results are transmitted following a well-defined pathway:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/fd077354/660ac3518cf57b508527d26f_Serialization_Deserialization.png" alt="__wf_reserved_inherit" />
</figure>

**1. Action Execution**: In the VSCode extension for ZenML, user interactions trigger Python scripts on the LSP server using a standard method, *workspace/executeCommand*. This approach, highlighted in the *switchActiveStack* function below, allows the execution of server-side custom commands, like *zenml-python.switchActiveStack*, to modify the active ZenML stack. Importantly, while *zenml-python.switchActiveStack*is a custom command, *workspace/executeCommand* remains the default method employed for all LSP server command executions.

```
const switchActiveStack = async (stackId: string): Promise<activestackresponse> => {
    // Retrieve the language client instance for communication with the LSP server
    const client = LSClient.getInstance().getLanguageClient();
    
    // Execute a command on the server side to switch the active stack
    // by sending a request to the 'workspace/executeCommand' RPC method
    const result = await client.sendRequest('workspace/executeCommand', {
        command: 'zenml-python.switchActiveStack', // The specific command to execute
        arguments: [stackId], // Arguments for the command
    });

    // The function returns an object with the stack ID and name
    return result; 
};
</activestackresponse>
```

**2. Result Generation**: The Python-based LSP server executes the requested code and generates results, which can be simple data types, dictionaries, lists, or complex objects:

```
@LSP_SERVER.command("zenml-python.switchActiveStack")
@LSP_SERVER.zenml_command(wrapper_name="stacks_wrapper")
def set_active_stack(wrapper_instance, args):
        """Sets the active ZenML stack to the specified stack."""
        return wrapper_instance.set_active_stack(args)
```

The *zenml_command* decorator ensures commands are executed through the properly initialized ZenML client. It routes commands to the ZenML client or specific wrappers based on the *wrapper_name* argument, allowing dynamic execution of ZenML functionalities depending on the command requirements.

**3. Serialization, Transmission, and Deserialization**: The generated results are serialized into JSON format using the JSON-RPC protocol, which is part of LSP. The serialized data is then transmitted back to the VSCode extension via the LSP's output channel. Upon receipt, the extension deserializes the JSON data for rendering and user interaction.

The *vscode-python-tools-extension* template handles the serialization, transmission, and deserialization steps by leveraging the LSP framework. This standardization simplifies development, allowing focus on the ZenML extension's core functionalities.

The custom LSP server implementation enables seamless communication between the VSCode extension and the Python-based ZenML operations, facilitating a smooth user experience and efficient execution of ZenML functionalities within the VSCode environment.

#### LSP Client-Server Flow

Command handlers setup on the Python-based LSP server side allowed us to send messages between the extension and the user's Python environment, which allowed for execution of ZenML-related operations directly from the ZenML Python library. The figure below provides a basic overview of these interactions:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/e30d5582/660ac37107e76c0164192554_LSP_client_server_flow.png" alt="__wf_reserved_inherit" />
</figure>

## Architectural Decision: ZenML Independence

A key architectural decision was to keep ZenML separate from the extension's dependencies, assuming users have ZenML installed locally in their environment. This approach offers flexibility in managing ZenML installations and ensures compatibility with various workflows.

The main challenge with this decision was ensuring the selected Python interpreter in VSCode had ZenML installed. If ZenML was not detected, the extension needed to notify users and guide them towards selecting an interpreter with ZenML.

### Activation Process

The activation process orchestrates the initialization of the extension's core components in the following order:

<ol><li>Python-based LSP server</li><li>Output Channel (JSON-RPC communication layer)</li><li>Python (from <em>ms-python.python</em>)</li><li>Language Client</li><li>ZenML Client (checks local installation)</li><li>Registration of commands on the Python side (for ZenML Client operations)</li><li>Views setup and registration of commands on the TypeScript side (for UI interactions)</li></ol>

The diagram below illustrates the detailed activation process:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/5e9a826e/660ac38dd3c9f291d4b1b530_Activation__1_.png" alt="__wf_reserved_inherit" />
</figure>

By decoupling ZenML from the extension's dependencies, users gain the flexibility to manage their ZenML installations independently, ensuring compatibility with their preferred workflows. The extension's activation process sets up the Python-based LSP server, ZenML client, and command handlers, creating a seamless bridge between VSCode and the user's Python environment. This architecture empowers users to execute ZenML operations directly from VSCode, enhancing productivity and simplifying MLOps workflows.

### High-level mapping of system components

The core components of the extension and their functionality is shown here:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/c843a23c/660acd157dca8ed5d32e6aee_components-map.png" alt="__wf_reserved_inherit" />
</figure>

## Additional Goals and Challenges

With the basic functionality in place, the focus shifted towards enhancing the extension's usefulness by synchronizing it with MLOps or configuration changes happening outside the IDE environment.

### Real-Time Monitoring and Buffering Changes

To achieve this synchronization, we leveraged the [Watchdog library](https://github.com/gorakhargosh/watchdog) for filesystem observation and implemented an *EventBus* for emitting events in response to notifications. The *EventBus* allowed data providers (server, stacks, pipeline runs, and environment views) to react to changes in a decoupled manner. Watchdog enabled real-time monitoring of the *config.yaml* file, while the *EventBus *facilitated communication between different components of the extension.

To prevent overloading the output channel with unnecessary notifications, I introduced a timer and a check to send notifications only when a change occurred. This was accomplished by tracking the last known *url* and *active_stack_id*.

The LSP server set up a file watcher for ZenML's *config.yaml* as follows:

```
def process_config_change(self, config_file_path: str):
    """Process the configuration file change."""
    with suppress_stdout_temporarily():
        try:
            with open(config_file_path, "r") as f:
                config = yaml.safe_load(f)

                new_url = config.get("store", {}).get("url", "")
                new_stack_id = config.get("active_stack_id", "")

                url_changed = new_url != self.last_known_url
                stack_id_changed = new_stack_id != self.last_known_stack_id
                # Send ZENML_SERVER_CHANGED if url changed
                if url_changed:
                    server_details = {
                        "url": new_url,
                        "api_token": config.get("store", {}).get("api_token", ""),
                        "store_type": config.get("store", {}).get("type", ""),
                    }
                    self.LSP_SERVER.send_custom_notification(
                        ZENML_SERVER_CHANGED,
                        server_details,
                    )
                    self.last_known_url = new_url
                # Send ZENML_STACK_CHANGED if stack_id changed
                if stack_id_changed:
                    self.LSP_SERVER.send_custom_notification(ZENML_STACK_CHANGED, new_stack_id)
                    self.last_known_stack_id = new_stack_id
```

On the TypeScript side, the language client was set up with notification listeners and handlers:

```
/**
 * Sets up notification listeners for the language client.
 */
public setupNotificationListeners(): void {
  this.client.onNotification(LSP_ZENML_SERVER_CHANGED, 
      this.handleServerChanged.bind(this)
    );
    
  this.client.onNotification(LSP_ZENML_STACK_CHANGED, 
      this.handleStackChanged.bind(this)
    );
}

/**
 * Handles the zenml/stackChanged notification.
 * 
 * @param activeStackId The ID of the active stack.
 */
public async handleStackChanged(activeStackId: string): Promise<void> {
  await storeActiveStack(activeStackId);
  this.eventBus.emit(LSP_ZENML_STACK_CHANGED, activeStackId);
}</void>
```

If a user switches the active stack via the ZenML CLI, it triggers the LSClient's notification handler, which emits the *LSP_ZENML_STACK_CHANGED* event. The *StackDataProvider* and the VSCode status bar item for the extension then refresh to reflect the update:

```
/// StackDataProvider.ts
private subscribeToEvents(): void {
  this.eventBus.on(LSP_ZENML_STACK_CHANGED, () => this.refresh());
}

// ZenMLStatusBar.ts
private subscribeToEvents(): void {
  this.eventBus.on(LSP_ZENML_STACK_CHANGED, async () => {
    await this.refreshActiveStack();
  });

  this.eventBus.on(SERVER_STATUS_UPDATED, ({ isConnected, serverUrl }) => {
    this.updateServerStatusIndicator(isConnected, serverUrl);
  });
}
```

### Avoiding overloading of the output channel

Two significant challenges were faced during the development process:

<ol><li>Initializing the ZenML client and executing commands without overloading the LSP server, as excessive output (e.g., logs from errors/warnings) could potentially break the output channel, which is essential for the extension's functionality.</li><li>Gracefully handling potential errors during initialization and running of the LSP server to allow continued communication with the client and inform the user about errors when appropriate.</li></ol>

Managing the verbose output from ZenML, including standard output and logging from errors or warnings, was a significant hurdle. If left unchecked, this output could overload the LSP server's output channel, leading to crashes and disrupting the extension's functionality. To mitigate this issue, I implemented a dual approach:

<ul><li><strong>Output Suppression Mechanisms</strong>: I developed utility functions to temporarily suppress <em>stdout</em> and logging during critical operations. By utilizing a context manager, I silenced unnecessary output when importing modules or executing ZenML commands, maintaining the integrity of the output channel.</li><li><strong>Lazy Module Imports with Logging Suppression</strong>: To further reduce initialization noise and minimize the risk of overloading the LSP server, I designed a lazy import function. This function delays module loading until absolutely necessary and temporarily elevates the logging level to suppress non-critical logs. This approach ensures that only essential information is processed and transmitted through the LSP server, safeguarding against misleading errors such as "Content-Length must be included in the headers."</li></ul>

### Conclusion

The development of the ZenML VS Code extension demonstrates the potential of integrating Python libraries into VS Code extensions. By leveraging the LSP, real-time monitoring, and an event-driven architecture, it's possible to bridge the gap between TypeScript and Python, delivering a seamless user experience aligned with ZenML's mission to lower the barriers of entry to machine learning. The decision to rely on a local installation of ZenML, while introducing certain trade-offs, was made to maximize flexibility and ensure consistency with the user's development environment.

Work continues on the refinement and enhancement of the ZenML VS Code extension, and I invite you to [try out the extension](https://marketplace.visualstudio.com/items?itemName=ZenML.zenml-vscode) and experience the benefits of streamlined MLOps workflows firsthand. Your feedback and contributions are invaluable in shaping the future of this tool and the broader ZenML ecosystem.

*Marwan Zaarab is a software engineer and an open source developer. He enjoys developing tools that enhance developer productivity and collaboration. Feel free to reach out and *[connect on LinkedIn](https://www.linkedin.com/in/marwan-zaarab/)*.*