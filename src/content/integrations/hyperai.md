---
title: "HyperAI"
slug: "hyperai"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "665715c49d95a35623e9d544"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-09-26T19:35:11.125Z"
  lastUpdated: "2024-09-26T19:35:11.125Z"
  createdOn: "2024-05-29T11:47:16.835Z"
integrationType: "orchestrator"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/086f51c7/66d8677d9b340eb855a7ebd8_hyperai.png"
shortDescription: "Effortlessly orchestrate your ZenML pipelines on HyperAI's cloud compute platform"
docsUrl: "https://docs.zenml.io/how-to/training-with-gpus/training-with-gpus"
githubUrl: "https://docs.zenml.io/stack-components/orchestrators/hyperai"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/1f084b2e/665715bccfd22d44bfc95770_CleanShot_2024-05-29_at_13.46.48.png"
seo:
  title: "Integrate HyperAI with ZenML - Orchestrator Integrations"
  description: "Effortlessly orchestrate your ZenML pipelines on HyperAI's cloud compute platform"
  canonical: "https://www.zenml.io/integrations/hyperai"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/1f084b2e/665715bccfd22d44bfc95770_CleanShot_2024-05-29_at_13.46.48.png"
  ogTitle: "Integrate HyperAI with ZenML - Orchestrator Integrations"
  ogDescription: "Effortlessly orchestrate your ZenML pipelines on HyperAI's cloud compute platform"
overviewTitle: "Effortlessly orchestrate your ZenML pipelines on HyperAI's cloud compute platform"
overviewDescription: "Streamline your machine learning operations by deploying ZenML pipelines on HyperAI instances. This integration enables you to leverage HyperAI's cutting-edge cloud infrastructure for seamless and efficient pipeline execution, making AI accessible to everyone."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\">Seamless deployment of ZenML pipelines on HyperAI instances</li><li id=\"\">Effortless setup and configuration through HyperAI Service Connector</li><li id=\"\">Support for scheduled pipelines using cron expressions or specified start times</li><li id=\"\">Smooth integration with ZenML's container registry and image builder components</li><li id=\"\">Ability to leverage GPU acceleration for enhanced performance</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Cutting-edge cloud compute platform designed for AI accessibility</li><li id=\"\">Docker-based infrastructure for flexible and portable pipeline execution</li><li id=\"\">Support for GPU-accelerated workloads using NVIDIA drivers and toolkit</li><li id=\"\">SSH key-based access for secure connection to HyperAI instances</li><li id=\"\">Managed solution for running ML pipelines without infrastructure overhead</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">\n# Register the HyperAI service connector\n# zenml service-connector register hyperai_connector --type=hyperai --auth-method=rsa-key --base64_ssh_key=<BASE64_SSH_KEY> --hostnames=<INSTANCE_1>,..,<INSTANCE_N> --username=<USERNAME>\n\n# Register the HyperAI orchestrator\n# zenml orchestrator register hyperai_orch --flavor=hyperai\n\n# Register and activate a stack with the HyperAI orchestrator\n# zenml stack register hyperai_stack -o hyperai_orch ... --set\n\nfrom datasets import Dataset\nimport torch\nfrom zenml import pipeline, step\nfrom zenml.integrations.hyperai.flavors.hyperai_orchestrator_flavor import HyperAIOrchestratorSettings\n\nhyperai_orchestrator_settings = HyperAIOrchestratorSettings(\n    mounts_from_to={\n        \"/home/user/data\": \"/data\",\n        \"/mnt/shared_storage\": \"/shared\",\n        \"/tmp/logs\": \"/app/logs\"\n    }\n)\n\n@step\ndef load_data() -> Dataset:\n		# load some data\n\n@step(settings={\"orchestrator.hyperai\": hyperai_orchestrator_settings})\ndef train(data: Dataset) -> torch.nn.Module:\n    print(\"Running on HyperAI instance!\")\n\n@pipeline(enable_cache=False)\ndef ml_training():\n	  data = load_data()\n    train(data)\n    # ... do more things\n\n# Run the pipeline on HyperAI\nml_training()\n</code></pre></div>"
documentationLinkText: "Training with GPUs in ZenML"
githubLinkText: "ZenML HyperAI Orchestrator Documentation"
additionalResources:
  - label: "HyperAI Official Website"
    href: "https://www.hyperai.ai/"
isUpdatedToNewFormat: true
---

<ul><li>Seamless deployment of ZenML pipelines on HyperAI instances</li><li>Effortless setup and configuration through HyperAI Service Connector</li><li>Support for scheduled pipelines using cron expressions or specified start times</li><li>Smooth integration with ZenML's container registry and image builder components</li><li>Ability to leverage GPU acceleration for enhanced performance</li></ul>

<ul><li>Cutting-edge cloud compute platform designed for AI accessibility</li><li>Docker-based infrastructure for flexible and portable pipeline execution</li><li>Support for GPU-accelerated workloads using NVIDIA drivers and toolkit</li><li>SSH key-based access for secure connection to HyperAI instances</li><li>Managed solution for running ML pipelines without infrastructure overhead</li></ul>

```python
# Register the HyperAI service connector
# zenml service-connector register hyperai_connector --type=hyperai --auth-method=rsa-key --base64_ssh_key=<base64_ssh_key> --hostnames=<instance_1>,..,<instance_n> --username=<username>

# Register the HyperAI orchestrator
# zenml orchestrator register hyperai_orch --flavor=hyperai

# Register and activate a stack with the HyperAI orchestrator
# zenml stack register hyperai_stack -o hyperai_orch ... --set

from datasets import Dataset
import torch
from zenml import pipeline, step
from zenml.integrations.hyperai.flavors.hyperai_orchestrator_flavor import HyperAIOrchestratorSettings

hyperai_orchestrator_settings = HyperAIOrchestratorSettings(
    mounts_from_to={
        "/home/user/data": "/data",
        "/mnt/shared_storage": "/shared",
        "/tmp/logs": "/app/logs"
    }
)

@step
def load_data() -> Dataset:
        # load some data

@step(settings={"orchestrator.hyperai": hyperai_orchestrator_settings})
def train(data: Dataset) -> torch.nn.Module:
    print("Running on HyperAI instance!")

@pipeline(enable_cache=False)
def ml_training():
      data = load_data()
    train(data)
    # ... do more things

# Run the pipeline on HyperAI
ml_training()
</username></instance_n></instance_1></base64_ssh_key>
```
This code snippet demonstrates the setup and usage of a HyperAI service connector and orchestrator within the ZenML framework. It includes registering a HyperAI service connector, creating a HyperAI orchestrator, and setting up a stack. The code then defines a machine learning pipeline with two steps: load_data and train. The train step is configured with specific HyperAI orchestrator settings, including mount points. Finally, the pipeline is defined and executed, allowing the training step to run on a HyperAI instance.