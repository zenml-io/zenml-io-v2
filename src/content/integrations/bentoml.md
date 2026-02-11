---
title: "BentoML"
slug: "bentoml"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8abdedce731d073d037"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-09T09:56:37.030Z"
  lastUpdated: "2024-10-09T09:53:34.828Z"
  createdOn: "2023-10-12T09:13:15.091Z"
integrationType: "deployer"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/6cfafd53/66d86853b0842f70eedf9d56_bentoml.png"
shortDescription: "Seamlessly Deploy Models to Production with ZenML and BentoML"
docsUrl: "https://docs.zenml.io/stack-components/model-deployers/bentoml"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/99b6b6cd/67064aab171e78a558352cf9_image__36_.png"
seo:
  title: "Integrate BentoML with ZenML - Deployer Integrations"
  description: "Seamlessly Deploy Models to Production with ZenML and BentoML"
  canonical: "https://www.zenml.io/integrations/bentoml"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/99b6b6cd/67064aab171e78a558352cf9_image__36_.png"
  ogTitle: "Integrate BentoML with ZenML - Deployer Integrations"
  ogDescription: "Seamlessly Deploy Models to Production with ZenML and BentoML"
---

<ul><li><strong>Streamlined Model Packaging</strong>: Effortlessly package trained models into Bentos using ZenML's built-in BentoML steps</li><li><strong>Local Model Serving</strong>: Deploy and serve models locally for development and testing with the BentoML Model Deployer</li><li><strong>Container-based Model Serving</strong>: ZenML’s in-built steps convert your bento into Docker images and automatically push them to your Stack’s Container Registry, from where you can deploy them anywhere.</li><li><strong>Cloud Deployment Ready</strong>: Bentos are versioned and tracked and you can fetch them from ZenML for seamless deployment to various cloud platforms using <code>bentoctl</code> &nbsp;or <code>yatai</code> .</li><li><strong>Standardized Deployment Workflow</strong>: Establish a consistent and reproducible model deployment process across your organization</li></ul>

<ul><li>Framework-agnostic model packaging and serving</li><li>Supports local, cloud, and Kubernetes deployments</li><li>Easy-to-use Python API for defining prediction services</li><li>Automatic generation of OpenAPI specifications</li><li>Built-in monitoring and logging capabilities</li></ul>

```bash
zenml model-deployer register bentoml_deployer --flavor=bentoml
zenml stack update -d bentoml_deployer
```

You first need to define a BentoML Service in a [service.py](http://service.py/) file and define the logic to serve your model there. It could look like the following:

```shell
@bentoml.service(
    name=SERVICE_NAME,
)
class MNISTService:
    def __init__(self):
        # load model
        self.model = bentoml.pytorch.load_model(MODEL_NAME)
        self.model.eval()

    @bentoml.api()
    async def predict_ndarray(
        self, 
        inp: Annotated[np.ndarray, DType("float32"), Shape((28, 28))]
    ) -> np.ndarray:
        inp = np.expand_dims(inp, (0, 1))
        output_tensor = await self.model(torch.tensor(inp))
        return to_numpy(output_tensor)
```

You can then define your pipeline as follows:

```python
from zenml import pipeline, step
from zenml.integrations.bentoml.steps import bento_builder_step
from zenml.integrations.bentoml.steps import bentoml_model_deployer_step

@pipeline
def bento_builder_pipeline():
    model = model_training_step()
    bento = bento_builder_step(
        model=model,
        model_name="pytorch_mnist",  # Name of the model
        model_type="pytorch",  # Type of the model (pytorch, tensorflow, sklearn, xgboost..)
        service="service.py:CLASS_NAME",  # Path to the service file within zenml repo
    )
    deployed_model = bentoml_model_deployer_step(
        bento=bento,
        model_name="pytorch_mnist",  # Name of the model
        port=3001,  # Port to be used by the http server
        deployment_type="container" # the type of deployment, either local or container
    )
```
This code example demonstrates how to use ZenML's BentoML integration steps within a pipeline. First, the bento_builder_step packages the trained model into a Bento bundle. Then, the bentoml_model_deployer_step deploys the Bento locally or as a container, making it available for serving predictions via an HTTP endpoint.