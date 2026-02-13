---
title: "Docker"
slug: "docker"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66e02db6dda42f38d5ba3f7b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-11-06T09:18:00.083Z"
  lastUpdated: "2024-11-06T08:45:04.174Z"
  createdOn: "2024-09-10T11:29:58.289Z"
integrationType: "orchestrator"
logo:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/6d22d316/672b2c89a8055420705702e2_docker.png"
shortDescription: "Effortlessly Run ZenML Pipelines in Isolated Docker Containers"
docsUrl: "https://docs.zenml.io/stack-components/orchestrators/local-docker"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/11a05ef0/66e02ce6b06f752d507881bc_Screenshot_2024-09-04_at_10.02.06.png"
seo:
  title: "Integrate Docker with ZenML - Orchestrator Integrations"
  description: "Effortlessly Run ZenML Pipelines in Isolated Docker Containers"
  canonical: "https://www.zenml.io/integrations/docker"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/11a05ef0/66e02ce6b06f752d507881bc_Screenshot_2024-09-04_at_10.02.06.png"
  ogTitle: "Integrate Docker with ZenML - Orchestrator Integrations"
  ogDescription: "Effortlessly Run ZenML Pipelines in Isolated Docker Containers"
overviewTitle: "Effortlessly Run ZenML Pipelines in Isolated Docker Containers"
overviewDescription: "Integrate ZenML with Docker to execute your ML pipelines in isolated environments locally. This integration simplifies debugging and ensures consistent execution across different systems."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Isolated Pipeline Execution</strong>: Run each step of your ZenML pipeline in a separate Docker container, ensuring isolation and reproducibility.</li><li id=\"\"><strong id=\"\">Local Debugging</strong>: Debug issues that occur when running pipelines in Docker containers without the need for remote infrastructure.</li><li id=\"\"><strong id=\"\">Consistent Environments</strong>: Maintain consistent execution environments across different systems by leveraging Docker containers.</li><li id=\"\"><strong id=\"\">Easy Setup</strong>: Seamlessly integrate Docker with ZenML using the built-in local Docker orchestrator.</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Containerization of applications</li><li id=\"\">Isolation of processes and dependencies</li><li id=\"\">Portability across different systems</li><li id=\"\">Efficient resource utilization</li><li id=\"\">Reproducibility of environments</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">\nfrom zenml import step, pipeline\nfrom zenml.orchestrators.local_docker.local_docker_orchestrator import (\n    LocalDockerOrchestratorSettings,\n)\n\n@step\ndef preprocess_data():\n    # Preprocessing logic here\n    pass\n\n@step\ndef train_model():\n    # Model training logic here\n    pass\n\nsettings = {\n    \"orchestrator.local_docker\": LocalDockerOrchestratorSettings(\n        run_args={\"cpu_count\": 2}\n    )\n}\n\n@pipeline(settings=settings)\ndef ml_pipeline():\n    data = preprocess_data()\n    train_model(data)\n\nif __name__ == \"__main__\":\n    ml_pipeline()\n</code></pre></div>"
documentationLinkText: "Read the full documentation on the Local Docker Orchestrator"
additionalResources:
  - label: "Learn how to enable GPU support with the Local Docker Orchestrator"
    href: "https://docs.zenml.io/how-to/training-with-gpus/training-with-gpus"
  - label: "Explore the ZenML SDK documentation for LocalDockerOrchestrator"
    href: "https://sdkdocs.zenml.io/latest/core_code_docs/core-orchestrators/#zenml.orchestrators.local_docker.local_docker_orchestrator.LocalDockerOrchestrator"
isUpdatedToNewFormat: true
---

<ul><li><strong>Isolated Pipeline Execution</strong>: Run each step of your ZenML pipeline in a separate Docker container, ensuring isolation and reproducibility.</li><li><strong>Local Debugging</strong>: Debug issues that occur when running pipelines in Docker containers without the need for remote infrastructure.</li><li><strong>Consistent Environments</strong>: Maintain consistent execution environments across different systems by leveraging Docker containers.</li><li><strong>Easy Setup</strong>: Seamlessly integrate Docker with ZenML using the built-in local Docker orchestrator.</li></ul>

<ul><li>Containerization of applications</li><li>Isolation of processes and dependencies</li><li>Portability across different systems</li><li>Efficient resource utilization</li><li>Reproducibility of environments</li></ul>

```python
from zenml import step, pipeline
from zenml.orchestrators.local_docker.local_docker_orchestrator import (
    LocalDockerOrchestratorSettings,
)

@step
def preprocess_data():
    # Preprocessing logic here
    pass

@step
def train_model():
    # Model training logic here
    pass

settings = {
    "orchestrator.local_docker": LocalDockerOrchestratorSettings(
        run_args={"cpu_count": 2}
    )
}

@pipeline(settings=settings)
def ml_pipeline():
    data = preprocess_data()
    train_model(data)

if __name__ == "__main__":
    ml_pipeline()
```
This code example demonstrates how to create a simple ZenML pipeline that runs each step in a Docker container using the local Docker orchestrator. The pipeline consists of two steps: preprocess_data and train_model. The LocalDockerOrchestratorSettings is used to specify additional configuration, such as the CPU count for the Docker containers. Finally, the pipeline is executed by calling ml_pipeline().