---
title: "Huggingface Model to Sagemaker Endpoint: Automating MLOps with ZenML"
slug: "huggingface-to-sagemaker"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6556278baf485b3d83c3bec1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2023-12-01T11:01:34.558Z"
  lastUpdated: "2023-12-01T11:01:34.558Z"
  createdOn: "2023-11-16T14:30:35.842Z"
author: "hamza-tahir"
category: "tutorials"
tags:
  - "applied-zenml"
  - "sagemaker"
  - "huggingface"
  - "model-control-plane"
date: "2023-11-16T00:00:00.000Z"
readingTime: 8 mins
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/01c3fb83/6556276e837f48a1862d831f_training_pipeline_overview.png"
seo:
  title: "Huggingface Model to Sagemaker Endpoint: Automating MLOps with ZenML - ZenML Blog"
  description: "Deploying Huggingface models to AWS Sagemaker endpoints typically only requires a few lines of code. However, there's a growing demand to not just deploy, but to seamlessly automate the entire flow from training to production with comprehensive lineage tracking. ZenML adeptly fills this niche, providing an end-to-end MLOps solution for Huggingface users wishing to deploy to Sagemaker."
  canonical: "https://www.zenml.io/blog/huggingface-to-sagemaker"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/81c84e3e/6556276e837f48a1862d831f_training_pipeline_overview.png"
  ogTitle: "Huggingface Model to Sagemaker Endpoint: Automating MLOps with ZenML - ZenML Blog"
  ogDescription: "Deploying Huggingface models to AWS Sagemaker endpoints typically only requires a few lines of code. However, there's a growing demand to not just deploy, but to seamlessly automate the entire flow from training to production with comprehensive lineage tracking. ZenML adeptly fills this niche, providing an end-to-end MLOps solution for Huggingface users wishing to deploy to Sagemaker."
---

Deploying [Huggingface](https://huggingface.co/) models to [AWS Sagemaker](https://aws.amazon.com/sagemaker/) endpoints typically only requires a few lines of code. However, there's a growing demand to not just deploy, but to seamlessly automate the entire flow from training to production with comprehensive lineage tracking. ZenML adeptly fills this niche, providing an end-to-end MLOps solution for Huggingface users wishing to deploy to Sagemaker. Below, we’ll walk through the architecture that ZenML employs to bring a Huggingface model into production with AWS Sagemaker. Of course all of this can be adapted to not just Sagemaker, but any other model deployment service like GCP Vertex or Azure ML Platform

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/4b6568c7/655634b7d30cb780727ae038_pipelines_overview.png" alt="" />
</figure>

This blog post showcases one way of using [ZenML](https://zenml.io/) pipelines to achieve this:

<ul><li>Create and version a dataset in a feature_engineering_pipeline.</li><li>Train/Finetune a BERT-based Sentiment Analysis NLP model and push to Huggingface Hub in a training_pipeline.</li><li>Promote this model to Production by comparing to previous models in a promotion_pipeline.</li><li>Deploy the model at the Production Stage to a <a href="https://aws.amazon.com/pm/sagemaker/">AWS Sagemaker</a> endpoint with a deployment_pipeline.</li></ul>

This blog post is accompanied by a [YouTube series tutorial](https://www.youtube.com/watch?v=Q1EH2H8Akgo&list=PLhNrLW_IWplw6dBbmGcL828-atJMu3CwF) and a [Github repository](https://github.com/zenml-io/zenml-huggingface-sagemaker). Check them out if you’d like to see it in action with the code!

<figure class="w-richtext-figure-type-video w-richtext-align-center" style="padding-bottom:33.723653395784545%" data-rt-type="video" data-rt-align="center" data-rt-max-width="" data-rt-max-height="33.723653395784545%" data-rt-dimensions="854:480" data-page-url="https://www.youtube.com/watch?v=Q1EH2H8Akgo&amp;list=PLhNrLW_IWplw6dBbmGcL828-atJMu3CwF"><iframe allowFullScreen={true} frameBorder="0" scrolling="no" src="https://www.youtube.com/embed/Q1EH2H8Akgo" title="[1/5] Huggingface to Sagemaker with ZenML Pipelines - Introduction to the MLOps process"></iframe></figure>

# 🍳Breaking it down

## 👶 Start with feature engineering

Watch the video of this section:

<figure class="w-richtext-figure-type-video w-richtext-align-center" style="padding-bottom:33.723653395784545%" data-rt-type="video" data-rt-align="center" data-rt-max-width="" data-rt-max-height="33.723653395784545%" data-rt-dimensions="854:480" data-page-url="https://www.youtube.com/watch?v=7OTV--X9bKk&amp;t=1s"><iframe allowFullScreen={true} frameBorder="0" scrolling="no" src="https://www.youtube.com/embed/7OTV--X9bKk?start=1" title="[2/5] Huggingface to Sagemaker with ZenML Pipelines - Feature engineering with a Huggingface Dataset"></iframe></figure>

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/e982b21f/6556353a385b46aa9bbb543d_pipelines_feature_eng.png" alt="" />
</figure>

Automated feature engineering forms the foundation of this MLOps workflow. Thats why the first pipeline is the feature engineering pipeline. This pipeline loads some data from Huggingface and uses a base tokenizer to create a tokenized dataset. The data loader step is a simple Python function that returns a Huggingface dataloader object:

```python
import numpy as np
from datasets import DatasetDict, load_dataset
from typing_extensions import Annotated
from zenml import step

@step
def data_loader() -> Annotated[DatasetDict, "dataset"]:
    logger.info(f"Loading dataset airline_reviews... ")
    dataset = load_dataset("Shayanvsf/US_Airline_Sentiment")
    dataset = sample_dataset(dataset)
    return dataset
```

Notice that you can give each dataset a name with Python’s Annotated object. The DatasetDict is a native Huggingface dataset which ZenML knows how to persist through steps. This flow ensures reproducibility and version control for every dataset iteration.

## 💪 Train the model with Huggingface Hub as the model registry

Watch the video for this section:

<figure class="w-richtext-figure-type-video w-richtext-align-center" style="padding-bottom:33.723653395784545%" data-rt-type="video" data-rt-align="center" data-rt-max-width="" data-rt-max-height="33.723653395784545%" data-rt-dimensions="854:480" data-page-url="https://www.youtube.com/watch?v=YoQoT5eSMek&amp;t=29s"><iframe allowFullScreen={true} frameBorder="0" scrolling="no" src="https://www.youtube.com/embed/YoQoT5eSMek?start=29" title="[3/5] Huggingface to Sagemaker with ZenML Pipelines - Training a BERT based Sentiment Classifer"></iframe></figure>

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/01c3fb83/6556276e837f48a1862d831f_training_pipeline_overview.png" alt="" />
</figure>

Once the feature engineering pipeline has run a few times, we have many datasets to choose from. We can feed our desired one into a function that trains the model on the data. Thanks to the ZenML Huggingface integration, this data is loaded directly from the [ZenML artifact store](https://docs.zenml.io/stacks-and-components/component-guide/artifact-stores).

On the left side, we see our local MLOps stack, which defines our infrastructure and tooling we are using for this particular pipeline. ZenML makes it easy to run on a [local stack](https://docs.zenml.io/user-guide/starter-guide/understand-stacks) on your development machine, or switch out the stack to run on a AWS Kubeflow-based stack (if you want to scale up).

On the right side is the new kid on the block - the **ZenML Model Control Plane**. The Model Control Plane is a new feature in ZenML that allows users to have a complete overview of their machine learning models. It allows teams to consolidate all artifacts related to their ML models into one place, and manage its lifecycle easily as you can see from this view from the [ZenML Cloud](https://cloud.zenml.io/):

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/890bf91d/655635a42cb69eee96efaacf_mcp_2.png" alt="" />
</figure>

In this case, the training pipeline pushes the model into Huggingface each time its trained, and tracks the revision to establish lineage:

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/555f0759/655635ba8364e8a5e4e693a3_hf_repo_commit.png" alt="" />
  <figcaption>Notice that the pipeline creates a commit on Huggingface Hub automatically</figcaption>
</figure>

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/bc4ff47d/655635db6f42324843741d98_training_pipeline_with_hf.png" alt="" />
  <figcaption>The same commit is tracked in ZenML</figcaption>
</figure>

Interested in the Model Control Plane? [Book a demo](https://zenml.io/book-a-demo) to see it in action.

## 🫅Promote the model to production

Watch the video of this section:

<figure class="w-richtext-figure-type-video w-richtext-align-center" style="padding-bottom:33.723653395784545%" data-rt-type="video" data-rt-align="center" data-rt-max-width="" data-rt-max-height="33.723653395784545%" data-rt-dimensions="854:480" data-page-url="https://www.youtube.com/watch?v=_A2l3OMezvE&amp;list=PLhNrLW_IWplw6dBbmGcL828-atJMu3CwF&amp;index=5"><iframe allowFullScreen={true} frameBorder="0" scrolling="no" src="https://www.youtube.com/embed/_A2l3OMezvE" title="[4/5] Huggingface to Sagemaker with ZenML Pipelines - Promoting the model to Production"></iframe></figure>

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/91ad41d7/65563624cecadcbf0affcb72_promoting_pipeline_overview.png" alt="" />
</figure>

Following training, the automated promotion pipeline evaluates models against predefined metrics, identifying and marking the most performant one as 'Production ready'. This is another common use case for the Model Control Plane; we store the relevant metrics there to access them easily later:

```python
# Get the current model
current_model = get_step_context().model_version

# Get the production model
prod_model = ModelVersion(
    name=current_model.name,
    version="production",
)

# Get the current metrics
current_metrics = current_model.get_model_artifact(name="model").metadata["metrics"].value

# Get the previous best metrics
prod_metrics = prod_model.get_model_artifact(name="model").metadata["metrics"].value

# If current model is better promote it
if prod_metrics < current_metrics:
  current_model.set_stage("production")
```

## 💯 Deploy the model to AWS Sagemaker Endpoints

Watch the video of this section:

<figure class="w-richtext-figure-type-video w-richtext-align-center" style="padding-bottom:33.723653395784545%" data-rt-type="video" data-rt-align="center" data-rt-max-width="" data-rt-max-height="33.723653395784545%" data-rt-dimensions="854:480" data-page-url="https://www.youtube.com/watch?v=0-dSE4vzwHY&amp;list=PLhNrLW_IWplw6dBbmGcL828-atJMu3CwF&amp;index=5"><iframe allowFullScreen={true} frameBorder="0" scrolling="no" src="https://www.youtube.com/embed/0-dSE4vzwHY" title="[5/5] Huggingface to Sagemaker with ZenML Pipelines - Deploying to AWS Sagemaker Endpoints"></iframe></figure>

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/bc9cd5ea/65563639cdc36d997045cef0_deploying_pipeline_overview.png" alt="" />
</figure>

This is the final step to automate the deployment of the slated production model to a Sagemaker endpoint. The deployment pipelines handles the complexities of AWS interactions and ensures that the model, along with its full history and context, is transitioned into a live environment ready for use. Here again we use the Model Control Plane interface to query the Huggingface revision and use that information to push to Huggingface Hub:

```python
# For the Production model, get the metadata of the Huggingface Model
repo_id = prod_model.metadata["repo_id"].value
revision = prod_model.metadata["revision"].value

# Use that to deploy directly to Sagemaker
hub = {
    "HF_MODEL_ID": repo_id,
    "HF_MODEL_REVISION": revision,
}

# Create the HF Model Class
huggingface_model = HuggingFaceModel(
    env=hub,
        ...
)

# Deploy to sagemaker
huggingface_model.deploy(...)
```

### Gradio App - Interactive Demo After Deployment

After deploying to Sagemaker, the repository ships with a Gradio app that uses the ZenML client to fetch the production model, and query the Sagemaker endpoint:

```python
# Get the production model
prod_model = ModelVersion(
   name="distil_bert_sentiment_analysis",
   version="production"
)

# Get the sagemaker endpoint
endpoint_name = prod_model.metadata["sagemaker_endpoint_name"].value

# Use the endpoint to make the prediction
...
```

The app is therefore decoupled from the other process, and running smoothly. It will always pick up the production version:

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/bfde3f0a/6556365ff4454f14a81e3035_nlp_zenml_demo.png" alt="" />
</figure>

## Conclusion

ZenML builds upon the straightforward deployment capability of Huggingface models to AWS Sagemaker, and transforms it into a sophisticated, repeatable, and transparent MLOps workflow. It takes charge of the intricate steps necessary for modern ML systems, ensuring that software engineering leads can focus on iteration and innovation rather than operational intricacies.

To delve deeper into each stage, refer to the comprehensive guide on GitHub: [zenml-io/zenml-huggingface-sagemaker](https://github.com/zenml-io/zenml-huggingface-sagemaker). Additionally, this YouTube playlist provides a detailed visual walkthrough of the entire pipeline: [Huggingface to Sagemaker ZenML tutorial](https://www.youtube.com/watch?v=Q1EH2H8Akgo&list=PLhNrLW_IWplw6dBbmGcL828-atJMu3CwF).

Interested in standardizing your MLOps workflows? ZenML Cloud is now available to all - get a managed ZenML server with important features such as RBAC and pipeline triggers. [Book a demo](https://zenml.io/book-a-demo) with us now to learn how you can create your own MLOps pipelines today.