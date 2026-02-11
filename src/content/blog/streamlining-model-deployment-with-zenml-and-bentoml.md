---
title: "Streamlining Model Deployment with ZenML and BentoML"
slug: "streamlining-model-deployment-with-zenml-and-bentoml"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6706572b688e87b11b094719"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-22T12:54:05.951Z"
  lastUpdated: "2024-10-11T13:32:20.658Z"
  createdOn: "2024-10-09T10:12:59.169Z"
author: "jayesh-sharma"
category: "mlops"
tags:
  - "zenml"
  - "bentoml"
  - "deployment"
date: "2024-10-10T00:00:00.000Z"
readingTime: 5 mins
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/cf015114/670928e0f450ab54a976946c_bento_cover_image.png"
seo:
  title: "Streamlining Model Deployment with ZenML and BentoML - ZenML Blog"
  description: "This blog post discusses the integration of ZenML and BentoML in machine learning workflows, highlighting their synergy that simplifies and streamlines model deployment. ZenML is an open-source MLOps framework designed to create portable, production-ready pipelines, while BentoML is an open-source framework for machine learning model serving. When combined, these tools allow data scientists and ML engineers to streamline their workflows, focusing on building better models rather than managing deployment infrastructure. The combination offers several advantages, including simplified model packaging, local and container-based deployment, automatic versioning and tracking, cloud readiness, standardized deployment workflow, and framework-agnostic serving."
  canonical: "https://www.zenml.io/blog/streamlining-model-deployment-with-zenml-and-bentoml"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/cf015114/670928e0f450ab54a976946c_bento_cover_image.png"
  ogTitle: "Streamlining Model Deployment with ZenML and BentoML - ZenML Blog"
  ogDescription: "This blog post discusses the integration of ZenML and BentoML in machine learning workflows, highlighting their synergy that simplifies and streamlines model deployment. ZenML is an open-source MLOps framework designed to create portable, production-ready pipelines, while BentoML is an open-source framework for machine learning model serving. When combined, these tools allow data scientists and ML engineers to streamline their workflows, focusing on building better models rather than managing deployment infrastructure. The combination offers several advantages, including simplified model packaging, local and container-based deployment, automatic versioning and tracking, cloud readiness, standardized deployment workflow, and framework-agnostic serving."
---

In any machine learning workflow, the ability to efficiently test models locally and deploy them to production environments is crucial. This blog post explores how the integration of ZenML and BentoML creates a powerful synergy that simplifies and streamlines the model deployment process, enabling data scientists and ML engineers to bridge the gap between development and production seamlessly.

We'll dive into the challenges of model deployment, introduce the key features of ZenML and BentoML, and demonstrate how their integration can revolutionize your MLOps workflow. Whether you're a seasoned ML practitioner or just starting your journey, this guide will provide valuable insights into creating a more efficient and robust model deployment pipeline.

### Deploying models is challenging

Developing a high-performing model is only half the battle. The real challenge often lies in deploying these models to production environments where they can deliver value to end-users.  Data scientists working on the models shouldn't have to worry about packaging, versioning, and deploying their models. It helps if you can track your model deployment candidates locally, have them versioned automatically, compare metrics between version and then ultimately deploy the best model to production with ease. This is where ZenML and BentoML can help you!

### Enter ZenML and BentoML

[ZenML](https://www.zenml.io/) is an extensible, open-source MLOps framework designed to create portable, production-ready machine learning pipelines. It offers a simple, intuitive API that allows you to define your ML workflows as a series of steps, making it easy to manage complex pipelines.

[BentoML](https://www.bentoml.com/) is an open-source framework for machine learning model serving. It simplifies the process of packaging machine learning models and deploying them as production APIs, supporting various ML frameworks and deployment options.

When combined, these tools allow data scientists and ML engineers to streamline their workflows, focusing on building better models rather than managing deployment infrastructure.

### Why Integrate ZenML and BentoML?

At ZenML, we believe in making the ML workflow as simple and intuitive as possible. To this end, we have features like automatic tracking and versioning of data and model artifacts which help you be on top of your development journey. When you pair ZenML with BentoML, you don't have to worry about packaging and deploying your models. Just define your BentoML service, and ZenML will take care of building and deploying your models with a host of configuration options.

The combination of ZenML and BentoML brings several advantages to the table:

<ul><li><strong>Simplified Model Packaging</strong>: ZenML's built-in BentoML steps make it easy to package trained models into production-ready Bentos.</li><li><strong>Local and Container-based Deployment</strong>: Deploy models locally for development and testing, or as containers for more production-like environments</li><li><strong>Automatic Versioning and Tracking</strong>: ZenML automatically versions and tracks your Bentos, making it easier to manage different model versions and choose the right one for production.</li><li><strong>Cloud-Ready</strong>: Seamlessly deploy Bentos to various cloud platforms using tools like <code>bentoctl</code> or <code>yatai</code>.</li><li><strong>Standardized Deployment Workflow</strong>: Establish a consistent and reproducible model deployment process across your organization.</li><li><strong>Framework-agnostic Serving</strong>: Support for various ML frameworks, allowing you to serve models regardless of the underlying technology.</li></ul>

### Getting Started

To leverage the power of ZenML and BentoML in your projects, follow these steps:

**Step 1: Installation and Setup**

First, make sure you have ZenML installed and the BentoML integration enabled:

```shell
pip install zenml
zenml integration install bentoml -y
```

You will now need to register BentoML as a ZenML Model Deployer. Register the BentoML model deployer with ZenML:

```shell
zenml model-deployer register bentoml_deployer --flavor=bentoml
```

After creating the model deployer stack component, you can now compose a ZenML Stack with this deployer and other necessary components like an artifact store and orchestrator:

```shell
zenml stack register bentoml_stack \
    -d bentoml_deployer \
    -a default \
    -o default
```

Set it as the active stack so that ZenML knows it should be used for running pipelines:

```shell
zenml stack set bentoml_stack
```

**Step 2: Create a BentoML Service**

Create a `service.py` file to define your [BentoML Service](https://docs.bentoml.com/en/latest/guides/services.html). You can find an example below. This is where you define the logic to be used for serving your models.

<ul><li>You define a service using the <code>@bentoml.service</code> decorator on your class. Note the class name here as it would be needed later.</li><li>You can define APIs for your service. These form the paths that you can call on your service once it is deployed. In this example, we have two APIs, <code>predict_ndarray</code> and <code>predict_image</code> .</li><li>Follow the <a href="https://docs.bentoml.com/en/latest/guides/iotypes.html">Input and output types guide</a> on the BentoML documentation to learn how to define the types for your APIs and how to use validators on them.</li></ul>

```shell
import bentoml
from bentoml.validators import DType, Shape
import numpy as np
import torch

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

    @bentoml.api()
    async def predict_image(self, f: PILImage) -> np.ndarray:
        assert isinstance(f, PILImage)
        arr = np.array(f) / 255.0
        assert arr.shape == (28, 28)
        arr = np.expand_dims(arr, (0, 1)).astype("float32")
        output_tensor = await self.model(torch.tensor(arr))
        return to_numpy(output_tensor)
```

**Step 3: Define Your ZenML Pipeline**

Once you have the Service defined, you should now create a ZenML pipeline that trains a model, builds a Bento, and deploys it.

Although ZenML has pre-built steps that you can use for creating a bento, you can also do this by yourself. You can use the [bentos.build](http://bentos.build) function from the `bentoml` library to achieve this and customize the build process as you see fit.

```python
# Build the BentoML bundle. You can use any of the parameters supported by the bentos.build function.
bento = bentos.build(
    service=service,
    models=[model_name],
    version=version,
    labels=labels,
    description=description,
    include=include,
    exclude=exclude,
    python=python,
    docker=docker,
    build_ctx=working_dir or source_utils.get_source_root(),
)
```

The model_name here should be the name with which your model is saved to BentoML, typically through one of the following commands,

```python
bentoml.MODEL_TYPE.save_model(model_name, model, labels=labels)
# or
bentoml.picklable_model.save_model(
    model_name,
    model,
)
```

Now, your custom step could look something like this:

```python
from zenml import step

@step
def my_bento_builder(model) -> bento.Bento:
    # Load the model from the model artifact
    model = load_artifact_from_response(model)
    # save to bentoml
    bentoml.pytorch.save_model(model_name, model)
    
    # Build the BentoML bundle. You can use any of the parameters supported by the bentos.build function.
    bento = bentos.build(
        ...
    )
    
    return bento
```

You can learn more about this in our BentoML documentation under the [How to use it](https://docs.zenml.io/stack-components/model-deployers/bentoml#how-do-you-use-it) section.

You can also just use in-built ZenML steps:

<ul><li><code>bento_builder_step</code>: it <a href="https://docs.bentoml.com/en/latest/guides/build-options.html">builds and packages</a> your model into a bento, which is a format containing all the components - source code, Python packages, as well as model references and configuration - required for running a BentoML Service.</li><li><code>bentoml_model_deployer_step</code>: this step takes in your bento and then deploys it either as a local server or in a container with a host of configuration options.</li></ul>

Check out the [BentoML ZenML SDK docs](https://sdkdocs.zenml.io/0.55.5/integration_code_docs/integrations-bentoml/) for more information on how you can configure these steps.

Your pipeline code can look like the following:

```shell
from zenml import pipeline, step
from zenml.integrations.bentoml.steps import bento_builder_step, bentoml_model_deployer_step

@step
def train_model():
    # Your model training code here
    return trained_model

@pipeline
def bentoml_pipeline():
    model = train_model()
    bento = bento_builder_step(
        model=model,
        model_name="pytorch_mnist",
        model_type="pytorch",
        service="service.py:MNISTService",
    )
    bentoml_model_deployer_step(
        bento=bento,
        model_name="pytorch_mnist",
        port=3000,
        deployment_type="container"  # you need to have docker locally for this
    )

# Run the pipeline
bentoml_pipeline()
```

Make sure that the `service` parameter in the `bento_builder_step` has the right file name and the class name that we noted down earlier.

## Result: Your ZenML pipelines running with BentoML

Once set up, your ZenML pipelines will seamlessly integrate with BentoML, allowing for efficient model packaging and deployment.  You can watch the pipeline on your ZenML Dashboard and inspect the step logs, metadata and also the outputs.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/41a56d42/6706572a688e87b11b0946a8_6706556b6f3052c5cdefb094_image_20_37_.png" alt="A pipeline page showing a prediction pipeline run with a stack wtih bentoml" />
</figure>

### Accessing Your Deployed Model

After running the pipeline, you can access your deployed model using the URL of your deployed model. This URL is present in the logs after a successful pipeline run.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/1fb5b9f9/6706572a688e87b11b0946b0_6706559f41c933b4b74ba595_image_20_38_.png" alt="The CLI output after running a training pipeline which ultimately packages your model into a bento and serves it locally" />
</figure>

This URL will lead you to a docs page where you can find an OpenAPI specification of your BentoML service. You can also try out queries on your defined Service APIs.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/43baf1e0/6706572a688e87b11b0946ac_670655dfc2535658788c438b_msedge_l0vq6Lfnsj.png" alt="An OpenAPI specification page showing the deployed BentoML service with the available service APIs" />
</figure>

You can also use ZenML’s model-deployers CLI to find details about your deployed model like the host and port, among other details like the status of the deployment.

```shell
# get the list of all deployed models
zenml model-deployer models list

# describe the model you want
zenml model-deployer models describe <ID>
```

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/1640011c/6706572a688e87b11b0946ba_6706562a713bd954bd29e018_image_20_39_.png" alt="CLI output of the zenml model-deployer models describe command showing all model details." />
</figure>

You can now send prediction requests to this model either directly or have a ZenML prediction pipeline that automatically detects what model to use based on the pipeline and step name information.

### Building a prediction pipeline

You can design a pipeline like the following

```shell
@pipeline()
def inference_fashion_mnist(
    model_name: str, pipeline_name: str, step_name: str
):
    """Perform inference with a model deployed through BentoML.

    Args:
        pipeline_name: The name of the pipeline that deployed the model.
        step_name: The name of the step that deployed the model.
        model_name: The name of the model that was deployed.
    """
    inference_data = inference_loader()
    prediction_service = bentoml_prediction_service_loader(
        model_name=model_name, pipeline_name=pipeline_name, step_name=step_name
    )
    predictor(inference_data=inference_data, service=prediction_service)
```

where bentoml_prediction_service_loader step is defined to find the right deployed model server based on your pipeline name and step name. This removes a manual step to figure out what model version was deployed by which pipeline and automates the inference part of your workflow.

```shell
@step(enable_cache=False)
def bentoml_prediction_service_loader(
    pipeline_name: str, step_name: str, model_name: str
) -> Union[BentoMLLocalDeploymentService, BentoMLContainerDeploymentService]:
    """Get the BentoML prediction service started by the deployment pipeline.

    Args:
        pipeline_name: name of the pipeline_name that deployed the model.
        step_name: the name of the step that deployed the model.
        model_name: the name of the model that was deployed.
    """
    model_deployer = BentoMLModelDeployer.get_active_model_deployer()

    services = model_deployer.find_model_server(
        pipeline_name=pipeline_name,
        pipeline_step_name=step_name,
        model_name=model_name,
    )
    ...

    return services[0]
```

### Conclusion

The integration of ZenML and BentoML offers a powerful solution for streamlining the model deployment process. By leveraging this combination, data scientists and ML engineers can focus more on developing great models and less on the intricacies of deployment. This approach not only saves time but also ensures consistency and reproducibility in the deployment process, ultimately leading to more robust and reliable ML applications in production.

As the field of MLOps continues to evolve, tools like ZenML and BentoML play a crucial role in bridging the gap between model development and production deployment. By adopting these tools and practices, teams can significantly reduce the time and complexity involved in bringing machine learning models from development to production.

