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
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/c62112d9/66d867f173c4a5c0d77847e5_kubernetes.png"
shortDescription: "Seamlessly Orchestrate ML Pipelines on Kubernetes with ZenML"
docsUrl: "https://docs.zenml.io/stack-components/orchestrators/kubernetes"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/6ca5afd0/66e14084f1622ce81a2706e7_image__6_.png"
relatedBlogPosts:
  - "how-to-run-production-ml-workflows-natively-on-kubernetes"
  - "zenml-kubernetes-kubeflow"
seo:
  title: "Integrate Kubernetes with ZenML - Orchestrator Integrations"
  description: "Seamlessly Orchestrate ML Pipelines on Kubernetes with ZenML"
  canonical: "https://www.zenml.io/integrations/kubernetes"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/6ca5afd0/66e14084f1622ce81a2706e7_image__6_.png"
  ogTitle: "Integrate Kubernetes with ZenML - Orchestrator Integrations"
  ogDescription: "Seamlessly Orchestrate ML Pipelines on Kubernetes with ZenML"
overviewTitle: "Seamlessly Orchestrate ML Pipelines on Kubernetes with ZenML"
overviewDescription: "Leverage the power of Kubernetes to orchestrate and scale your machine learning workflows using ZenML's Kubernetes integration. This lightweight, minimalist orchestrator enables you to run ML pipelines on Kubernetes clusters without the complexity of managing additional frameworks like Kubeflow."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\">Orchestrate ZenML pipelines on Kubernetes with minimal configuration</li><li id=\"\">Scale ML workloads seamlessly across Kubernetes clusters</li><li id=\"\">Easily transition from local to distributed orchestration</li><li id=\"\">Ideal for teams new to distributed ML looking for a lightweight solution</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Automated container orchestration and scaling</li><li id=\"\">Declarative configuration using YAML files</li><li id=\"\">Support for GPU-accelerated workloads</li><li id=\"\">Rich ecosystem of tools and extensions</li><li id=\"\">Industry standard for managing containerized applications</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-bash\">\n# Step 1: Register a new Kubrnetes orchestrator\n>>> zenml orchestrator register &lt;ORCHESTRATOR_NAME> \\\n    --flavor=kubernetes\n    \n# Step 2: Authernticate Sagemaker orchestrator\n# Option 1 (recomended): Service Connector\n>>> zenml orchestrator connect &lt;ORCHESTRATOR_NAME> --connector &lt;CONNECTOR_NAME>\n\n# Option 2 (not recommended): Explicit authentication\n>>> zenml orchestrator register &lt;ORCHESTRATOR_NAME> \\\n    --flavor=kubernetes \\\n    --kubernetes_context=&lt;KUBERNETES_CONTEXT>\n\n# Step 3: Update your stack to use the Sagemaker orchestrator\n>>> zenml stack update -o &lt;ORCHESTRATOR_NAME>\n</code></pre></div><div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">\nfrom zenml import step, pipeline\nfrom zenml.integrations.kubernetes.flavors.kubernetes_orchestrator_flavor import (\n    KubernetesOrchestratorSettings,\n)\n\nkubernetes_settings = KubernetesOrchestratorSettings(\n    pod_settings={\n        \"resources\": {\n            \"requests\": {\"cpu\": \"1\", \"memory\": \"1Gi\"},\n            \"limits\": {\"cpu\": \"2\", \"memory\": \"2Gi\"},\n        },\n        \"labels\": {\n            \"app\": \"ml-pipeline\",\n            \"environment\": \"production\",\n            \"team\": \"mlops\",\n        },\n    },\n    orchestrator_pod_settings={\n        \"resources\": {\n            \"requests\": {\"cpu\": \"1\", \"memory\": \"1Gi\"},\n            \"limits\": {\"cpu\": \"2\", \"memory\": \"2Gi\"},\n        },\n        \"labels\": {\n            \"app\": \"zenml-orchestrator\",\n            \"component\": \"pipeline-runner\",\n            \"team\": \"mlops\",\n        },\n    },\n)\n\n\n@step\ndef load_data() -> dict:\n    # Load data here\n    return {1: [1, 2], 2: [3, 4]}\n\n\n@step\ndef preprocess_data(raw_data: dict) -> dict:\n    # Preprocess data here\n    return {k: v * 2 for k, v in raw_data.items()}\n\n\n@pipeline(\n    settings={\n        \"orchestrator.kubernetes\": kubernetes_settings,\n    }\n)\ndef my_kubernetes_pipeline():\n    # Pipeline steps here\n    raw_data = load_data()\n    preprocess_data(raw_data)\n\n\nif __name__ == \"__main__\":\n    my_kubernetes_pipeline()\n    </code></pre></div>"
documentationLinkText: "ZenML Kubernetes Integration Documentation"
additionalResources:
  - label: "Kubernetes Documentation"
    href: "https://kubernetes.io/docs/home/"
isUpdatedToNewFormat: true
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