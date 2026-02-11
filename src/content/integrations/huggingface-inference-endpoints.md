---
title: "Hugging Face (Inference Endpoints)"
slug: "huggingface-inference-endpoints"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66571460f0ae080c7d5759f1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-09-23T12:10:33.332Z"
  lastUpdated: "2024-09-23T12:10:33.332Z"
  createdOn: "2024-05-29T11:41:20.431Z"
integrationType: "deployer"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/f6bd0bf5/66d86795fb809547dcae5c99_huggingface.png"
shortDescription: "Effortlessly deploy Hugging Face models to production with ZenML"
docsUrl: "https://docs.zenml.io/stack-components/model-deployers/huggingface"
githubUrl: "https://github.com/zenml-io/zenml/blob/main/tests/integration/examples/huggingface/run.py"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/cf23e4ac/66eb2fe7ff5d3a1b03a74048_Integration_image__1_.png"
seo:
  title: "Integrate Hugging Face (Inference Endpoints) with ZenML - Deployer Integrations"
  description: "Effortlessly deploy Hugging Face models to production with ZenML"
  canonical: "https://www.zenml.io/integrations/huggingface-inference-endpoints"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/cf23e4ac/66eb2fe7ff5d3a1b03a74048_Integration_image__1_.png"
  ogTitle: "Integrate Hugging Face (Inference Endpoints) with ZenML - Deployer Integrations"
  ogDescription: "Effortlessly deploy Hugging Face models to production with ZenML"
---

<ul><li>Seamless deployment of Hugging Face models directly from ZenML pipelines</li><li>Simplified management of inference endpoints within the ZenML ecosystem</li><li>Automatically scale deployments based on demand using Hugging Face's infrastructure</li><li>Maintain a centralized registry of deployed models for easy tracking and monitoring</li></ul>

<ul><li>Secure model hosting on dedicated Hugging Face infrastructure</li><li>Autoscaling capabilities to handle variable inference workloads</li><li>Support for a wide range of model types and frameworks</li><li>Pay-per-use pricing for cost-effective deployments</li><li>Enterprise-grade security features like VPC deployment</li></ul>

```python
from zenml.integrations.huggingface.steps import huggingface_model_deployer_step
from zenml.integrations.huggingface.services.huggingface_deployment import HuggingFaceDeploymentService
from zenml.integrations.huggingface.services import HuggingFaceServiceConfig

@step
def predictor(
    service: HuggingFaceDeploymentService,
) -> Annotated[str, "predictions"]:
    # Run a inference request against a prediction service
    data = load_live_data()
    prediction = service.predict(data)
    return prediction
    
@pipeline
def deploy_and_infer():
    service_config = HuggingFaceServiceConfig(model_name=model_name)
    service = huggingface_model_deployer_step(
        model_name="text-classification-model",
        accelerator="gpu",
        hf_repository="myorg/text-classifier",
        task="text-classification"
    )
    predictor(service)
```

This code snippet demonstrates how to use the huggingface_model_deployer_step within a ZenML pipeline to deploy a trained model to Hugging Face Inference Endpoints. The step takes in the model artifact, a name for the deployment, the Hugging Face repository path, an access token, and specifies the type of task the model performs.