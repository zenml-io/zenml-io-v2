---
title: "AzureML Pipelines"
slug: "azureml-pipelines"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66e13883ee69d26d00bd5d86"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-07T06:35:36.531Z"
  lastUpdated: "2024-10-07T06:35:36.531Z"
  createdOn: "2024-09-11T06:28:19.692Z"
integrationType: "orchestrator"
logo:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/ed101323/66e1387810bf16edba7b800d_azure-machine-learning-service-logo-445C459FD8-seeklogo.com.png"
shortDescription: "Effortlessly Orchestrate Your ZenML Pipelines with the Power of AzureML"
docsUrl: "https://docs.zenml.io/stack-components/orchestrators/azureml"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/03e0ad7f/66e137aad67f99ae59720b12_azureml.PNG.png"
seo:
  title: "Integrate AzureML Pipelines with ZenML - Orchestrator Integrations"
  description: "Effortlessly Orchestrate Your ZenML Pipelines with the Power of AzureML"
  canonical: "https://www.zenml.io/integrations/azureml-pipelines"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/03e0ad7f/66e137aad67f99ae59720b12_azureml.PNG.png"
  ogTitle: "Integrate AzureML Pipelines with ZenML - Orchestrator Integrations"
  ogDescription: "Effortlessly Orchestrate Your ZenML Pipelines with the Power of AzureML"
overviewTitle: "Effortlessly Orchestrate Your ZenML Pipelines with the Power of AzureML"
overviewDescription: "Seamlessly integrate ZenML with AzureML Pipelines to leverage the robustness and scalability of Microsoft's cloud-based orchestration service. This integration enables you to efficiently build, train, deploy, and manage your machine learning models, streamlining your MLOps workflow."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\">Seamless execution of ZenML pipelines on AzureML infrastructure</li><li id=\"\">Easy configuration of compute resources for optimal performance</li><li id=\"\">Secure access and authentication using Azure credentials or service connectors</li><li id=\"\">Integrate with other Azure-based stack components for end-to-end MLOps</li><li id=\"\">Support for scheduled pipeline runs using cron expressions or intervals</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">A comprehensive environment for the entire ML lifecycle</li><li id=\"\">Scalable computing resources for training and inference</li><li id=\"\">Integrated model management and deployment capabilities</li><li id=\"\">Collaborative workspace for team productivity</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">\n# 1. Install the ZenML `azure` integration\n# zenml integration install azure\n\n# 2. Register an AzureML container registry\n# zenml orchestrator register &lt;NAME> -f azureml \\\n#    --subscription_id=&lt;YOUR_AZUREML_SUBSCRIPTION_ID> \\\n#    --resource_group=&lt;NAME_OF_YOUR_RESOURCE_GROUP> \\\n#    --workspace=&lt;NAME_OF_YOUR_AZUREML_WORKSPACE> \\ \n#    --connector azure_connector\n\n# 3. Update your stack with your new container registry \n# zenml stack update -o &lt;NAME>\n\nfrom zenml import pipeline, step\nfrom zenml.integrations.azure.flavors import AzureMLOrchestratorSettings\n\nazureml_settings = AzureMLOrchestratorSettings(\n    mode=\"compute-cluster\",\n    compute_name=\"my-gpu-cluster\",  # Will fetch or create this instance\n    size=\"Standard_NC6s_v3\",  # Using a NVIDIA Tesla V100 GPU\n    tier=\"Dedicated\",  # Can be set to either \"Dedicated\" or \"LowPriority\"\n    min_instances=2,\n    max_instances=10,\n    idle_time_before_scaledown_down=60,\n)\n\n@step\ndef hello_world() -> str:\n    return \"Hello World!\"\n\n\n@pipeline\ndef my_pipeline():\n    _ = hello_world()\n\n\nif __name__ == \"__main__\":\n    my_pipeline()\n    \n   </code></pre></div>"
documentationLinkText: "Read the ZenML AzureML Orchestrator Documentation"
additionalResources:
  - label: "Read the guide for setting up a full Azure stack"
    href: "https://docs.zenml.io/how-to/popular-integrations/azure-guide"
  - label: "Azure Machine Learning Documentation"
    href: "https://learn.microsoft.com/en-us/azure/machine-learning/?view=azureml-api-2"
isUpdatedToNewFormat: true
---

<ul><li>Seamless execution of ZenML pipelines on AzureML infrastructure</li><li>Easy configuration of compute resources for optimal performance</li><li>Secure access and authentication using Azure credentials or service connectors</li><li>Integrate with other Azure-based stack components for end-to-end MLOps</li><li>Support for scheduled pipeline runs using cron expressions or intervals</li></ul>

<ul><li>A comprehensive environment for the entire ML lifecycle</li><li>Scalable computing resources for training and inference</li><li>Integrated model management and deployment capabilities</li><li>Collaborative workspace for team productivity</li></ul>

```python
# 1. Install the ZenML `azure` integration
# zenml integration install azure

# 2. Register an AzureML container registry
# zenml orchestrator register <NAME> -f azureml \
#    --subscription_id=<YOUR_AZUREML_SUBSCRIPTION_ID> \
#    --resource_group=<NAME_OF_YOUR_RESOURCE_GROUP> \
#    --workspace=<NAME_OF_YOUR_AZUREML_WORKSPACE> \ 
#    --connector azure_connector

# 3. Update your stack with your new container registry 
# zenml stack update -o <NAME>

from zenml import pipeline, step
from zenml.integrations.azure.flavors import AzureMLOrchestratorSettings

azureml_settings = AzureMLOrchestratorSettings(
    mode="compute-cluster",
    compute_name="my-gpu-cluster",  # Will fetch or create this instance
    size="Standard_NC6s_v3",  # Using a NVIDIA Tesla V100 GPU
    tier="Dedicated",  # Can be set to either "Dedicated" or "LowPriority"
    min_instances=2,
    max_instances=10,
    idle_time_before_scaledown_down=60,
)

@step
def hello_world() -> str:
    return "Hello World!"

@pipeline
def my_pipeline():
    _ = hello_world()

if __name__ == "__main__":
    my_pipeline()
    
  
```
This code snippet demonstrates how to configure an AzureML orchestrator in ZenML using the `AzureMLOrchestratorSettings` class. It sets up a compute cluster with GPU instances and defines a simple pipeline with a single step. Running the pipeline triggers execution on the configured AzureML infrastructure.

The code example demonstrates how to set up and use an AzureML Orchestrator with ZenML:

<ol><li>Install the Azure integration</li><li>Register an orchestrator with the <code>azureml</code> flavor</li><li>Update your active stack with your orchestrator.<ul><li>You will need a remote artifact store and a container registry)</li></ul></li><li>Use the <code>@step</code> and <code>@pipeline</code> decorators to define a pipeline. Once executed, ZenML will create the corresponding AzureML job.</li></ol>

