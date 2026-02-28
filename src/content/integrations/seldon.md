---
title: "Seldon"
slug: "seldon"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8ac3dc9a436e1245ee4"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-22T12:54:05.951Z"
  lastUpdated: "2024-10-15T11:26:08.502Z"
  createdOn: "2023-10-12T09:13:16.100Z"
integrationType: "deployer"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/61cf63b9/66d867fc21b538fc589f4961_seldon.png"
shortDescription: "Deploy production-grade ML models on Kubernetes with Seldon Core and ZenML"
docsUrl: "https://docs.zenml.io/stacks-and-components/component-guide/model-deployers/seldon"
githubUrl: "https://github.com/SeldonIO/seldon-core"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/33766a2c/6527e423e6b6cd263131262d_seldon_example_fab0d3e081.gif"
seo:
  title: "Integrate Seldon with ZenML - Deployer Integrations"
  description: "Deploy production-grade ML models on Kubernetes with Seldon Core and ZenML"
  canonical: "https://www.zenml.io/integrations/seldon"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/33766a2c/6527e423e6b6cd263131262d_seldon_example_fab0d3e081.gif"
  ogTitle: "Integrate Seldon with ZenML - Deployer Integrations"
  ogDescription: "Deploy production-grade ML models on Kubernetes with Seldon Core and ZenML"
overviewTitle: "Deploy production-grade ML models on Kubernetes with Seldon Core and ZenML"
overviewDescription: "Integrate Seldon Core's powerful model serving capabilities into your ZenML pipelines for seamless deployment of ML models to Kubernetes. This integration enables advanced deployment strategies, model explainability, outlier detection, and efficient management of complex ML workflows in production environments."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Seamless Model Deployment to Kubernetes<br>‍</strong>Effortlessly deploy your ZenML pipeline models to Seldon Core on Kubernetes for production-grade serving.</li><li id=\"\"><strong id=\"\">Advanced Deployment Strategies<br>‍</strong>Leverage Seldon Core's advanced deployment features like A/B testing, canary releases, and multi-armed bandits within ZenML pipelines.</li><li id=\"\"><strong id=\"\">Streamlined Model Monitoring<br>‍</strong>Monitor your deployed models' performance, detect outliers, and explain predictions, all integrated with ZenML's tracking capabilities.</li><li id=\"\"><strong id=\"\">Customizable Inference Servers<br>‍</strong>Deploy custom model serving logic using pre-built inference servers for popular ML frameworks or bring your own custom code.</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Microservice-based architecture for model serving</li><li id=\"\">Built-in model explainability and outlier detection</li><li id=\"\">Advanced deployment strategies (A/B testing, canary releases, etc.)</li><li id=\"\">REST and gRPC inference endpoints</li><li id=\"\">Integration with Kubernetes native tools like Istio and Prometheus</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">\nfrom zenml.integrations.seldon.steps import seldon_model_deployer_step\nfrom zenml.integrations.seldon.services import SeldonDeploymentConfig\nfrom zenml import pipeline\n\n@pipeline\ndef seldon_deployment_pipeline():\n    model = ...\n    seldon_model_deployer_step(\n        model=model,\n        service_config=SeldonDeploymentConfig(\n            model_name=\"my-model\",\n            replicas=1,\n            implementation=\"SKLEARN_SERVER\",\n            resources=SeldonResourceRequirements(\n                requests={\"cpu\": \"100m\", \"memory\": \"100Mi\"},\n                limits={\"cpu\": \"1\", \"memory\": \"1Gi\"}\n            )\n        ),\n    )\n</code></pre></div>"
documentationLinkText: "ZenML Seldon deployment guide"
githubLinkText: "Seldon Core GitHub repository"
additionalResources:
  - label: "Seldon Core documentation"
    href: "https://docs.seldon.io/"
isUpdatedToNewFormat: false
---

<ul><li><strong>Seamless Model Deployment to Kubernetes<br /></strong>Effortlessly deploy your ZenML pipeline models to Seldon Core on Kubernetes for production-grade serving.</li><li><strong>Advanced Deployment Strategies<br /></strong>Leverage Seldon Core's advanced deployment features like A/B testing, canary releases, and multi-armed bandits within ZenML pipelines.</li><li><strong>Streamlined Model Monitoring<br /></strong>Monitor your deployed models' performance, detect outliers, and explain predictions, all integrated with ZenML's tracking capabilities.</li><li><strong>Customizable Inference Servers<br /></strong>Deploy custom model serving logic using pre-built inference servers for popular ML frameworks or bring your own custom code.</li></ul>

<ul><li>Microservice-based architecture for model serving</li><li>Built-in model explainability and outlier detection</li><li>Advanced deployment strategies (A/B testing, canary releases, etc.)</li><li>REST and gRPC inference endpoints</li><li>Integration with Kubernetes native tools like Istio and Prometheus</li></ul>

```python
from zenml.integrations.seldon.steps import seldon_model_deployer_step
from zenml.integrations.seldon.services import SeldonDeploymentConfig
from zenml import pipeline

@pipeline
def seldon_deployment_pipeline():
    model = ...
    seldon_model_deployer_step(
        model=model,
        service_config=SeldonDeploymentConfig(
            model_name="my-model",
            replicas=1,
            implementation="SKLEARN_SERVER",
            resources=SeldonResourceRequirements(
                requests={"cpu": "100m", "memory": "100Mi"},
                limits={"cpu": "1", "memory": "1Gi"}
            )
        ),
    )
```
This code example demonstrates how to deploy a model to Seldon Core using the seldon_model_deployer_step within a ZenML pipeline. The model is configured with a deployment name, number of replicas, server implementation type, and resource requirements. The step seamlessly integrates the model deployment process into the ZenML pipeline flow.