---
title: "Google Cloud Vertex AI Pipelines"
slug: "gcp-vertexai"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8aa8b6c10a93e045e28"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-22T12:54:05.951Z"
  lastUpdated: "2024-10-15T10:55:41.255Z"
  createdOn: "2023-10-12T09:13:14.382Z"
integrationType: "orchestrator"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/3621e87c/66d86886a6dc58ed59b15d41_vertex.png"
shortDescription: "Streamline your MLOps workflows on GCP with ZenML and Vertex AI Pipelines"
docsUrl: "https://docs.zenml.io/stack-components/orchestrators/vertex"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/e0ff5439/66e7310b0dcb8cb0f1d0050a_image__9_.png"
relatedBlogPosts:
  - "cloud-composer-airflow-vs-vertex-ai-kubeflow"
  - "easy-mlops-pipelines"
  - "building-scalable-forecasting-solutions"
seo:
  title: "Integrate Google Cloud Vertex AI Pipelines with ZenML - Orchestrator Integrations"
  description: "Streamline your MLOps workflows on GCP with ZenML and Vertex AI Pipelines"
  canonical: "https://www.zenml.io/integrations/gcp-vertexai"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/e0ff5439/66e7310b0dcb8cb0f1d0050a_image__9_.png"
  ogTitle: "Integrate Google Cloud Vertex AI Pipelines with ZenML - Orchestrator Integrations"
  ogDescription: "Streamline your MLOps workflows on GCP with ZenML and Vertex AI Pipelines"
overviewTitle: "Streamline your MLOps workflows on GCP with ZenML and Vertex AI Pipelines"
overviewDescription: "Enhance your machine learning operations by leveraging the power of Vertex AI Pipelines orchestration through ZenML. This integration enables you to run production-ready, scalable ML pipelines on Google Cloud Platform, taking advantage of the fully managed serverless infrastructure and intuitive UI for tracking pipeline runs."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\">Seamlessly integrate ZenML pipelines with Vertex AI Pipelines for end-to-end ML workflows on GCP</li><li id=\"\">Easily deploy and scale your pipelines using Vertex AI's managed serverless infrastructure</li><li id=\"\">Track and monitor pipeline runs through the intuitive Vertex AI UI, accessible directly from ZenML</li><li id=\"\">Leverage GPU acceleration for compute-intensive steps in your ZenML pipelines</li><li id=\"\">Schedule recurring pipeline runs using Vertex AI's native scheduling capabilities</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Fully managed serverless infrastructure for running ML pipelines at scale</li><li id=\"\">Intuitive UI for visualizing and monitoring pipeline runs and logs</li><li id=\"\">Native support for GPU-accelerated workloads</li><li id=\"\">Flexible scheduling options for recurring pipeline runs</li><li id=\"\">Seamless integration with other GCP services and tools in the Vertex AI platform</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-shell\">\nzenml integration install gcp\nzenml stack set ...\n</code></pre></div><div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">\nfrom zenml.integrations.gcp.flavors.vertex_orchestrator_flavor import VertexOrchestratorSettings\n\n# Choose an accelerator to run on\nvertex_settings = VertexOrchestratorSettings(\n                node_selector_constraint=(\n                    \"cloud.google.com/gke-accelerator\",\n                    \"NVIDIA_TESLA_P4\",\n                )\n            )\n\n@pipeline(\n    settings={\n        \"orchestrator.vertex\": vertex_settings,\n    }\n)\ndef vertex_pipeline():\n    ingest_data()\n    train_model()\n    evaluate_model()\n\n# Run the pipeline\nvertex_pipeline()\n</code></pre></div>"
documentationLinkText: "Read the full Vertex AI Pipelines integration documentation"
additionalResources:
  - label: "Using Vertex with a full google stack"
    href: "https://docs.zenml.io/how-to/popular-integrations/gcp-guide"
  - label: "Learn more about Vertex AI Pipelines in the GCP documentation"
    href: "https://cloud.google.com/vertex-ai/docs/pipelines/introduction"
isUpdatedToNewFormat: true
---

<ul><li>Seamlessly integrate ZenML pipelines with Vertex AI Pipelines for end-to-end ML workflows on GCP</li><li>Easily deploy and scale your pipelines using Vertex AI's managed serverless infrastructure</li><li>Track and monitor pipeline runs through the intuitive Vertex AI UI, accessible directly from ZenML</li><li>Leverage GPU acceleration for compute-intensive steps in your ZenML pipelines</li><li>Schedule recurring pipeline runs using Vertex AI's native scheduling capabilities</li></ul>

<ul><li>Fully managed serverless infrastructure for running ML pipelines at scale</li><li>Intuitive UI for visualizing and monitoring pipeline runs and logs</li><li>Native support for GPU-accelerated workloads</li><li>Flexible scheduling options for recurring pipeline runs</li><li>Seamless integration with other GCP services and tools in the Vertex AI platform</li></ul>

```shell
zenml integration install gcp
zenml stack set ...
```

```python
from zenml.integrations.gcp.flavors.vertex_orchestrator_flavor import VertexOrchestratorSettings

# Choose an accelerator to run on
vertex_settings = VertexOrchestratorSettings(
                node_selector_constraint=(
                    "cloud.google.com/gke-accelerator",
                    "NVIDIA_TESLA_P4",
                )
            )

@pipeline(
    settings={
        "orchestrator.vertex": vertex_settings,
    }
)
def vertex_pipeline():
    ingest_data()
    train_model()
    evaluate_model()

# Run the pipeline
vertex_pipeline()
```
This code snippet demonstrates how to configure a ZenML pipeline to run on Vertex AI Pipelines. The VertexOrchestratorSettings allows you to specify settings and other settings for the Vertex AI job. The pipeline steps are defined as usual, and the pipeline is run by calling vertex_pipeline().