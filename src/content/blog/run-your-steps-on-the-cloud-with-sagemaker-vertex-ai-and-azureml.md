---
title: "Run your steps on the cloud with Sagemaker, Vertex AI, and AzureML"
slug: "run-your-steps-on-the-cloud-with-sagemaker-vertex-ai-and-azureml"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "653178dc15ea0ecb3a6fe495"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2023-10-19T18:43:40.726Z"
  lastUpdated: "2023-10-19T18:43:40.726Z"
  createdOn: "2023-10-19T18:43:40.726Z"
author: "hamza-tahir"
category: "zenml"
tags:
  - "cloud"
  - "evergreen"
  - "integrations"
  - "zenml"
date: "2022-03-25T00:00:00.000Z"
readingTime: 6 Mins Read
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/53e56e35/653177e4626cf16635f1d3ca_clouds.jpg"
seo:
  title: "Run your steps on the cloud with Sagemaker, Vertex AI, and AzureML - ZenML Blog"
  description: "With ZenML 0.6.3, you can now run your ZenML steps on Sagemaker, Vertex AI, and AzureML! It’s normal to have certain steps that require specific infrastructure (e.g. a GPU-enabled environment) on which to run model training, and Step Operators give you the power to switch out infrastructure for individual steps to support this."
  canonical: "https://www.zenml.io/blog/run-your-steps-on-the-cloud-with-sagemaker-vertex-ai-and-azureml"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/574570f9/653177e4626cf16635f1d3ca_clouds.jpg"
  ogTitle: "Run your steps on the cloud with Sagemaker, Vertex AI, and AzureML - ZenML Blog"
  ogDescription: "With ZenML 0.6.3, you can now run your ZenML steps on Sagemaker, Vertex AI, and AzureML! It’s normal to have certain steps that require specific infrastructure (e.g. a GPU-enabled environment) on which to run model training, and Step Operators give you the power to switch out infrastructure for individual steps to support this."
---

**Last updated:** November 21, 2022.

*If you are of a more visual disposition, please check out this blog’s *[accompanying video tutorial](https://www.youtube.com/watch?v=rMf10sjJjZM)*.*

<figure class="w-richtext-figure-type-video w-richtext-align-fullwidth" style="padding-bottom:56.25%" data-rt-type="video" data-rt-align="fullwidth" data-rt-max-width="" data-rt-max-height="56.25%" data-rt-dimensions="0:0" data-page-url=""><iframe src="https://www.youtube.com/embed/rMf10sjJjZM" frameBorder="0" allowfullscreen=""></iframe></figure>

[Subscribe to the ZenML YouTube Channel](https://www.youtube.com/channel/UCi79n61eV2sVyYxJOqk_bMw)*.*

# What is a step operator?

The step operator defers the execution of individual steps in a pipeline to specialized runtime environments that are optimized for Machine Learning workloads. This is helpful when there is a requirement for specialized cloud backends ✨ for different steps. One example could be using powerful GPU instances for training jobs or distributed compute for ingestion streams.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/beb027cf/65315f56f7e61ff7b180417b_zen-in-the-clouds.gif" alt="ZenML step operators allow training in the cloud" />
</figure>

# I’m confused 🤔. How is it different from an orchestrator?

An orchestrator is a higher level entity than a step operator. It is what executes the entire ZenML pipeline code and decides what specifications and backends to use for each step.

The orchestrator runs the code which launches your step in a backend of your choice. If you don’t specify a step operator, then the step code runs on the same compute instance as your orchestrator.

While an orchestrator defines how and where your entire pipeline runs, a step operator defines how and where an individual step runs. This can be useful in a variety of scenarios. An example could be if one step within a pipeline needed to run on a separate environment equipped with a GPU (like a trainer step).

# How do I use it?

A step operator is a stack component, and is therefore part of a [ZenML stack](https://docs.zenml.io/getting-started/core-concepts#stacks-and-components).

An operator can be registered as part of the stack as follows:

```bash
zenml step-operator register OPERATOR_NAME \
    --type=OPERATOR_TYPE
    ...
```

And then a step can be decorated with the custom_step_operator parameter to run it with that operator backend:

```bash
from zenml.client import Client

step_operator = Client().active_stack.step_operator
@step(step_operator=step_operator.name)
def trainer(...) -> ...:
    """Train a model"""
    # This step will run in environment specified by operator
```

**

# Run on AWS Sagemaker, GCP Vertex AI, and Microsoft Azure ML

<figure class="w-richtext-figure-type-video w-richtext-align-fullwidth" style="padding-bottom:56.25%" data-rt-type="video" data-rt-align="fullwidth" data-rt-max-width="" data-rt-max-height="56.25%" data-rt-dimensions="0:0" data-page-url=""><iframe src="https://giphy.com/embed/lrW5C1vjtWKb3X2oom" frameBorder="0" allowfullscreen=""></iframe></figure>

The step operator makes you feel like this -- [via GIPHY](https://giphy.com/gifs/BoschGlobal-like-a-boss-likeabosch-bosch-lrW5C1vjtWKb3X2oom)

ZenML’s cloud integrations are now extended to include step operators that run an individual step in all of the public cloud providers hosted ML platform offerings. The ZenML [GitHub repository](https://github.com/zenml-io/zenml/tree/main/examples) gives a great example of how to use these integrations. Let’s walk through one example, with AWS Sagemaker, in this blog. The other two clouds are quite similar and follow the same pattern.

## Introduction to AWS Sagemaker

[AWS Sagemaker](https://aws.amazon.com/sagemaker/) is a hosted ML platform offered by Amazon Web Services. It manages the full lifecycle of building, training, and deploying machine learning (ML) models for any use case with fully managed infrastructure, tools, and workflows. It offers specialized compute instances to run your training jobs and has a beautiful UI to track and manage your models and logs.

You can now use the new SagemakerStepOperator class to submit individual steps to be run on compute instances managed by Amazon Sagemaker.

## Set up a stack with the AWS Sagemaker StepOperator

As we are working in the cloud, we need to first do a bunch of preperatory steps to regarding permissions and resource creation. In the future, ZenML will automate a lot of this way. For now, follow these manual steps:

<ul><li>Create or choose an S3 bucket to which Sagemaker should output any artifacts from your training run. Then register it as an artifact store:</li></ul>

<ul></ul>

```bash
zenml artifact-store register s3-store \
    --type=s3
    --path=<s3_bucket_path>
</s3_bucket_path>
```

<ul><li>A container registry has to be configured in the stack. This registry will be used by ZenML to push your job images that Sagemaker will run. Register this as well:</li></ul>

```bash
# register the container registry
zenml container-registry register ecr_registry --type=default --uri=<account_id>.dkr.ecr.us-east-1.amazonaws.com
</account_id>
```

**

<ul><li>Set up the aws cli set up with the right credentials. Make sure you have the permissions to create and manage Sagemaker runs.</li><li>Create a role in the IAM console that you want the jobs running in Sagemaker to assume. This role should at least have the AmazonS3FullAccess and AmazonSageMakerFullAccess policies applied. Check <a href="https://docs.aws.amazon.com/sagemaker/latest/dg/sagemaker-roles.html#sagemaker-roles-create-execution-role">this link</a> to learn how to create a role.</li><li>Choose what instance type needs to be used to run your jobs. You can get the list <a href="https://docs.aws.amazon.com/sagemaker/latest/dg/notebooks-available-instance-types.html">here</a>.</li><li>Come up with an experiment name if you have one created already. Check <a href="https://docs.aws.amazon.com/sagemaker/latest/dg/experiments-create.html">this guide</a> to know how. If not provided, the job runs would be independent of an experiment.</li><li>Optionally, select a custom docker image that you want ZenML to use as a base image for creating an environment to run your jobs in Sagemaker.</li><li>Once you have all these values handy, you can proceed to setting up the components required for your stack.</li></ul>

```bash
# create the sagemaker step operator
zenml step-operator register sagemaker \
    --type=sagemaker
    --role=<sagemaker_role> \
    --instance_type=<sagemaker_instance_type>
    --base_image=<custom_base_image>
    --bucket_name=<s3_bucket_name>
    --experiment_name=<sagemaker_experiment_name>
</sagemaker_experiment_name></s3_bucket_name></custom_base_image></sagemaker_instance_type></sagemaker_role>
```

The command to register the stack component would look like the following. More details about the parameters that you can configure can be found in the class definition of Sagemaker Step Operator in the [API docs](https://apidocs.zenml.io/).

<ul><li>Register the sagemaker stack with the same pattern as always:</li></ul>

```bash
# register the sagemaker stack
zenml stack register sagemaker_stack \
    -o local_orchestrator \
    -c ecr_registry \
    -a s3-store \
    -s sagemaker

# activate the stack
zenml stack set sagemaker_stack
```

And now you have the stack up and running! Note that similar steps can be undertaken with Vertex AI and Azure ML. See the [docs](https://docs.zenml.io/stacks-and-components/component-guide/step-operators) for more information.

## Create a pipeline with the step operator decorator

Once the above is out of the way, any step of any pipeline we create can be decorated with the following decorator:

```bash
from zenml.client import Client

step_operator = Client().active_stack.step_operator
@step(step_operator=step_operator.name)
def trainer(...) -> ...:
    """Train a model"""
    # This step will run as a custom job in Sagemaker
```

**

ZenML will take care of packaging the step for you into a docker image, pushing the image, provisioning the resources for the custom job, and monitoring it as it progresses. Once complete, the pipeline will continue as always.

You can also switch the “sagemaker” operator with any other operator of your choosing, and it will work with the same step code as you always have. Modularity at its best!

So what are you waiting for? Read more about step operators in the [docs](https://docs.zenml.io/), or try it yourself with the [full example at the GitHub repository](https://github.com/zenml-io/zenml/tree/main/examples). Make sure to leave a star if you do end up there!

[Image credit: Photo by [lukaszlada](https://unsplash.com/@lukaszlada?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/LtWFFVi1RXQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)]

