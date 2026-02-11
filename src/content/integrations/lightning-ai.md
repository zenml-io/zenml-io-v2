---
title: "Lightning AI"
slug: "lightning-ai"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66e7f09f23216d0baea27187"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-22T12:54:05.951Z"
  lastUpdated: "2024-10-15T10:33:54.929Z"
  createdOn: "2024-09-16T08:47:27.653Z"
integrationType: "orchestrator"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/4a361b85/66e7e9e24447135c7c269f29_Lightning_AI_Logo.jpeg"
shortDescription: "Accelerate and simplify model training with Lightning AI Studio and ZenML"
docsUrl: "https://docs.zenml.io/stack-components/orchestrators/lightning"
githubUrl: "https://lightning.ai/docs/"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/d21d0f70/670e4506e05e18c255ec5f86_Integration_image__6_.png"
seo:
  title: "Integrate Lightning AI with ZenML - Orchestrator Integrations"
  description: "Accelerate and simplify model training with Lightning AI Studio and ZenML"
  canonical: "https://www.zenml.io/integrations/lightning-ai"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/d21d0f70/670e4506e05e18c255ec5f86_Integration_image__6_.png"
  ogTitle: "Integrate Lightning AI with ZenML - Orchestrator Integrations"
  ogDescription: "Accelerate and simplify model training with Lightning AI Studio and ZenML"
---

<ul><li><strong>Faster Execution:</strong> Automatic packaging and upload of code to your Lightning AI Studio.</li><li><strong>Reproducible Training</strong>: Ensure consistent training results by encapsulating Lightning AI configurations within ZenML pipelines.</li><li><strong>Quick Experimentation:</strong> Using ZenML’s configurable pipelines, you can run experiments with different parameters and on different machines quickly.</li><li><strong>Seamless Tracking</strong>: Track and compare model metrics, hyperparameters, and artifacts using ZenML's experiment tracking features.</li></ul>

<ul><li>Managed infrastructure, including GPUs, for running your pipelines.</li><li>Deployment of models supported.</li><li>Built-in support for distributed training.</li><li>Easy scaling of workloads on Lightning AI’s infrastructure.</li></ul>

You have to first set up your stack to include a Lightning AI orchestrator. Run the following commands after replacing the values with your own.

```shell
zenml orchestrator register lightning_orchestrator \
    --flavor=lightning \
    --user_id=<YOUR_LIGHTNING_USER_ID> \
    --api_key=<YOUR_LIGHTNING_API_KEY> \
    --username=<YOUR_LIGHTNING_USERNAME> \
    --teamspace=<YOUR_LIGHTNING_TEAMSPACE> \
    --organization=<YOUR_LIGHTNING_ORGANIZATION>

# Register and activate a stack with the new orchestrator
zenml stack register lightning_stack -o lightning_orchestrator ... --set
```

You can also define settings inside your pipeline code and pass it to the settings parameter of your pipeline. Find out all the values you can set [from our code docs.](https://sdkdocs.zenml.io/latest/integration_code_docs/integrations-lightning/#zenml.integrations.lightning.flavors.lightning_orchestrator_flavor.LightningOrchestratorSettings)

```shell
from zenml import pipeline, step
from zenml.integrations.lightning.flavors.lightning_orchestrator_flavor import (
    LightningOrchestratorSettings,
)

lightning_settings = LightningOrchestratorSettings(
    main_studio_name="my_studio",  # change this to your studio name if you already have one
    machine_type="cpu",
    async_mode=True,
    custom_commands=["pip install -r requirements.txt"],
)

@step
def load_data() -> dict:
    """Simulates loading of training data and labels."""

    training_data = [[1, 2], [3, 4], [5, 6]]
    labels = [0, 1, 0]

    return {"features": training_data, "labels": labels}

@step
def train_model(data: dict) -> None:
    """
    A mock 'training' process that also demonstrates using the input data.
    In a real-world scenario, this would be replaced with actual model fitting logic.
    """
    total_features = sum(map(sum, data["features"]))
    total_labels = sum(data["labels"])

    print(
        f"Trained model using {len(data['features'])} data points. "
        f"Feature sum is {total_features}, label sum is {total_labels}"
    )

@pipeline(settings={"orchestrator": lightning_settings})
def simple_ml_pipeline():
    """Define a pipeline that connects the steps."""
    dataset = load_data()
    train_model(dataset)

if __name__ == "__main__":
    run = simple_ml_pipeline()
    # You can now use the `run` object to see steps, outputs, etc.
```
The code example demonstrates running a simple pipeline with the Lightning AI orchestrator. You can see that we set a studio name explicitly; ZenML creates one for you if you leave it empty. We can also configure a host of other options in the settings. In the snippet above, we have added the settings directly in code but you can also [use YAML files](https://docs.zenml.io/how-to/use-configuration-files) to keep the code and configuration separate, allowing you to run the same piece of code with multiple configs.