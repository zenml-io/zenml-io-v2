---
title: "Easy MLOps pipelines: 1-click deployments for AWS, GCP, and Azure"
slug: "easy-mlops-pipelines"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "668e3ed88fcf7519537ceddc"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-07-25T08:23:34.195Z"
  lastUpdated: "2024-07-25T08:23:25.452Z"
  createdOn: "2024-07-10T07:57:12.560Z"
author: "zenml-team"
category: "zenml-updates"
tags:
  - "zenml"
  - "sagemaker"
  - "aws"
  - "stacks"
date: "2024-07-10T00:00:00.000Z"
readingTime: 7 mins
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/45bdd3cd/668e3ebe04a81851b815076c_1-click-deployments.webp"
seo:
  title: "Easy MLOps pipelines: 1-click deployments for AWS, GCP, and Azure - ZenML Blog"
  description: "Streamline your machine learning platform with ZenML. Learn how ZenML's 1-click cloud stack deployments simplify setting up MLOps pipelines on AWS, GCP, and Azure."
  canonical: "https://www.zenml.io/blog/easy-mlops-pipelines"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/3a7188ef/668e3ebe04a81851b815076c_1-click-deployments.webp"
  ogTitle: "Easy MLOps pipelines: 1-click deployments for AWS, GCP, and Azure - ZenML Blog"
  ogDescription: "Streamline your machine learning platform with ZenML. Learn how ZenML's 1-click cloud stack deployments simplify setting up MLOps pipelines on AWS, GCP, and Azure."
---

Running a machine learning pipeline on a cloud provider can be tricky — a data scientist needs to package their code into a portable format and deploy it using some orchestration service — whether bare metal VMs, Kubernetes, or even a managed container service.

ZenML solves this with our fundamental [stack](https://docs.zenml.io/user-guide/production-guide/understand-stacks) concept. Put simply, a stack is the configuration of the infrastructure and tooling that defines *where* and *how* a pipeline executes. Let’s take a simple example. Here is a simple pipeline in ZenML:

```
@step
def a_loading_data_step() -> pd.Dataframe:
    return load_data()
    
@step
def a_training_step(df: pd.Dataframe):
    train_model(df)
    
@pipeline
def training_pipeline():
    df = a_loading_data_step()
    some_training_logic(df)
```

If a user saved this in a file called [run.py](http://run.py), did `pip install zenml`, and ran `python run.py`, this pipeline would execute on a so-called `default` stack. The default stack consists of two components:

<ul><li>The local <a href="https://docs.zenml.io/stack-components/orchestrators"><code>orchestrator</code></a>: Each step is run locally in the same environment as the runner script.</li><li>The local <code>artifact store</code>: Each step produces artifacts that are stored on the local filesystem.</li></ul>

## ☁️ The challenges of a remote (cloud) stack

If you wanted to run this pipeline remotely (let’s say on your AWS account), you’d need to change the `orchestrator` to be one of the supported AWS orchestrators with ZenML (let’s say the [AWS Sagemaker](https://docs.zenml.io/stack-components/orchestrators/sagemaker) orchestrator), and the [artifact store to be a S3 bucket](https://docs.zenml.io/stack-components/artifact-stores/s3). Additionally, you’d need to add an [AWS ECR  container registry](https://docs.zenml.io/stack-components/container-registries/aws) to your stack, so that ZenML can package your code into a docker image, push it to the registry, and execute the [Sagemaker job.](https://sagemaker-examples.readthedocs.io/en/latest/sagemaker_processing/scikit_learn_data_processing_and_model_evaluation/scikit_learn_data_processing_and_model_evaluation.html)

In principle, this is a few lines of CLI code with ZenML (We even have a guide for this [here](https://docs.zenml.io/how-to/popular-integrations/aws-guide)). However, we heard [again and again](https://zenml.slack.com/archives/C01FWQ5D0TT/p1719315671958489) from our community that this was one of the most difficult parts of the journey in the ZenML experience.

<ul><li>Registration is a <strong>multi-faceted process</strong>, with the service connector registration followed by stack components, and finally the stacks themselves.</li><li>Along the way, things tend to fail, largely with <strong>local CLI setups and cloud permissions.</strong></li><li>It can be <strong>overwhelming</strong> to dive into cloud concepts, especially for teams who do not have the necessary resources/time in-house.</li></ul>

So this month, we sat down and crafted out some features to solve it. The result is two big new additions to the ZenML product - and today we’re going to talk about the first one: **1-click cloud stack deployments.**

## 🚢 1-click Stack Deployments

This feature is for users who **do not have existing infrastructure features.** Here is how it works:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/a862109d/668e3af06e2922c6c6f6100e_stacks_diagram.webp" alt="Select a cloud provider, ZenML generates a URL, user executes the template flow, the flow includes a step than deploys infrastructure. " />
</figure>

The cool thing about this feature is that it uses native cloud technologies (like [AWS Cloudformation](https://aws.amazon.com/cloudformation/)) to give users a more controlled experience in their cloud accounts. We’ve also tried our best to make sure that the user is aware of what exactly is provisioned on their account along the way.

## How to use it

> 📢 Note that this feature is only available in a deployed version of ZenML (not in a local scenario via zenml up). Learn how to deploy ZenML here.

To deploy a stack with the 1-click Stack Deployment, you can [deploy](https://docs.zenml.io/getting-started/deploying-zenml) and [connect](https://docs.zenml.io/how-to/connecting-to-zenml) to ZenML, and then use:

```
> zenml stack deploy -p aws
```

This will launch a CLI flow that will guide you through registering a stack.

If you’d rather go via the dashboard, you can do by clicking on the `Stacks` section and creating a new stack, and then clicking on “Create Stack”:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/8f249670/668e3ba72bd96c7de79e6c77_one-click-deployment.gif" alt="__wf_reserved_inherit" />
</figure>

> ⚠️ We’ve deprecated the old zenml stack deploy command that used mlstacks as a backend and replaced it with this more native cloud implementation. To use mlstacks, you can do so directly.

## 📺 See it in action

Here is @Baris Can Durak recording a 2-minute video showcasing the new feature in action:

<figure class="w-richtext-figure-type-video w-richtext-align-fullwidth" style="padding-bottom:75%" data-rt-type="video" data-rt-align="fullwidth" data-rt-max-width="" data-rt-max-height="75%" data-rt-dimensions="640:480" data-page-url="https://www.youtube.com/watch?v=AME3YzfeXpc"><iframe allowFullScreen={true} frameBorder="0" scrolling="no" src="https://www.youtube.com/embed/AME3YzfeXpc" title="Easier MLOps Stacks I: Introducing 1-click cloud stack deployments"></iframe></figure>

## 🤸What’s next?

Hopefully, this feature will make life a lot easier for new and existing users of ZenML. For now, we’ve shipped support for AWS, but GCP and Azure should soon follow suit. If you’d like even more stack options, just let us know [on Slack](https://zenml.io/slack) so we can prioritize.

Oh, and if you already have cloud resources and want to re-use them, don’t worry. We got you covered! Stay tuned for part 2 of this series.

## 🦫 Try it now

Try these features today! In order to get access, simply [update to the 0.61.0 version](https://github.com/zenml-io/zenml/releases/tag/0.61.0):

```
pip install zenml>=0.61.0
```

The full docs are available [here](https://docs.zenml.io/how-to/stack-deployment/deploy-a-cloud-stack).

As always, feedback is appreciated. Much love from the ZenML team and hope you like these new features!

## ❓FAQ

### What is an MLOps pipeline and how does ZenML help create one?

An MLOps pipeline is an end-to-end workflow that orchestrates the steps involved in building, deploying, and monitoring machine learning models. ZenML provides an ML platform that makes it easy to define MLOps pipelines using Python and deploy them to various cloud services like AWS and GCP with just a few clicks, as described above.

### How can ZenML's 1-click cloud stack deployments accelerate ML platform setup?

Setting up the infrastructure for a machine learning platform can be complex and time-consuming, especially when dealing with cloud providers. ZenML's 1-click cloud stack deployments simplify this by automatically provisioning the necessary resources and registering the stack components back in ZenML. This allows data science teams to quickly set up an MLOps pipeline without worrying about the underlying infrastructure.

### Does ZenML support both AWS MLOps and GCP MLOps pipelines?

Yes, ZenML provides a cloud-agnostic MLOps platform that allows you to easily deploy and run ML pipelines on both AWS and GCP infrastructure. With ZenML, you can define your pipeline once and then deploy it to your cloud provider of choice with minimal configuration. Support for Azure is also planned for the near future.

