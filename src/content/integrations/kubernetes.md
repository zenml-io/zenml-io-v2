---
title: "Kubernetes"
slug: "kubernetes"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8ac3386dc06afca7a9b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-22T12:54:05.951Z"
  lastUpdated: "2024-10-15T11:01:17.375Z"
  createdOn: "2023-10-12T09:13:16.105Z"
integrationType: "orchestrator"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/c62112d9/66d867f173c4a5c0d77847e5_kubernetes.png"
shortDescription: "Seamlessly Orchestrate ML Pipelines on Kubernetes with ZenML"
docsUrl: "https://docs.zenml.io/stack-components/orchestrators/kubernetes"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/6ca5afd0/66e14084f1622ce81a2706e7_image__6_.png"
relatedBlogPosts:
  - "how-to-run-production-ml-workflows-natively-on-kubernetes"
  - "zenml-kubernetes-kubeflow"
seo:
  title: "Integrate Kubernetes with ZenML - Orchestrator Integrations"
  description: "Seamlessly Orchestrate ML Pipelines on Kubernetes with ZenML"
  canonical: "https://www.zenml.io/integrations/kubernetes"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/6ca5afd0/66e14084f1622ce81a2706e7_image__6_.png"
  ogTitle: "Integrate Kubernetes with ZenML - Orchestrator Integrations"
  ogDescription: "Seamlessly Orchestrate ML Pipelines on Kubernetes with ZenML"
---

<ul><li>Orchestrate ZenML pipelines on Kubernetes with minimal configuration</li><li>Scale ML workloads seamlessly across Kubernetes clusters</li><li>Easily transition from local to distributed orchestration</li><li>Ideal for teams new to distributed ML looking for a lightweight solution</li></ul>

<ul><li>Automated container orchestration and scaling</li><li>Declarative configuration using YAML files</li><li>Support for GPU-accelerated workloads</li><li>Rich ecosystem of tools and extensions</li><li>Industry standard for managing containerized applications</li></ul>

```bash
# Step 1: Register a new Kubrnetes orchestrator
>>> zenml orchestrator register <ORCHESTRATOR_NAME> \
    --flavor=kubernetes
    
# Step 2: Authernticate Sagemaker orchestrator
# Option 1 (recomended): Service Connector
>>> zenml orchestrator connect <ORCHESTRATOR_NAME> --connector <CONNECTOR_NAME>

# Option 2 (not recommended): Explicit authentication
>>> zenml orchestrator register <ORCHESTRATOR_NAME> \
    --flavor=kubernetes \
    --kubernetes_context=<KUBERNETES_CONTEXT>

# Step 3: Update your stack to use the Sagemaker orchestrator
>>> zenml stack update -o <ORCHESTRATOR_NAME>
```

```python
from zenml import step, pipeline
from zenml.integrations.kubernetes.flavors.kubernetes_orchestrator_flavor import (
    KubernetesOrchestratorSettings,
)

kubernetes_settings = KubernetesOrchestratorSettings(
    pod_settings={
        "resources": {
            "requests": {"cpu": "1", "memory": "1Gi"},
            "limits": {"cpu": "2", "memory": "2Gi"},
        },
        "labels": {
            "app": "ml-pipeline",
            "environment": "production",
            "team": "mlops",
        },
    },
    orchestrator_pod_settings={
        "resources": {
            "requests": {"cpu": "1", "memory": "1Gi"},
            "limits": {"cpu": "2", "memory": "2Gi"},
        },
        "labels": {
            "app": "zenml-orchestrator",
            "component": "pipeline-runner",
            "team": "mlops",
        },
    },
)

@step
def load_data() -> dict:
    # Load data here
    return {1: [1, 2], 2: [3, 4]}

@step
def preprocess_data(raw_data: dict) -> dict:
    # Preprocess data here
    return {k: v * 2 for k, v in raw_data.items()}

@pipeline(
    settings={
        "orchestrator.kubernetes": kubernetes_settings,
    }
)
def my_kubernetes_pipeline():
    # Pipeline steps here
    raw_data = load_data()
    preprocess_data(raw_data)

if __name__ == "__main__":
    my_kubernetes_pipeline()
    
```
This code snippet demonstrates how to configure a ZenML pipeline to run on a Kubernetes cluster. The KubernetesOrchestratorSettings object is used to specify the Kubernetes relevant settings for the pipeline. These settings are then passed to the @pipeline decorator using the settings parameter. The pipeline steps are defined as usual.