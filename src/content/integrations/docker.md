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