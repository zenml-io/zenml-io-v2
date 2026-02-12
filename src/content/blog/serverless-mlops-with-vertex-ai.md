---
title: "Serverless MLOps with Vertex AI"
slug: "serverless-mlops-with-vertex-ai"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "65312960e3b1659d5250d50a"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2023-10-19T13:26:24.950Z"
  lastUpdated: "2023-10-19T13:26:24.950Z"
  createdOn: "2023-10-19T13:04:32.085Z"
author: "alexej-penner"
category: "zenml"
tags:
  - "zenml"
  - "cloud"
  - "integrations"
  - "mlops"
date: "2022-06-27T00:00:00.000Z"
readingTime: 11 Mins Read
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/3d53096b/653128dd93ba438c4d32e95b_VertexLogo.png"
seo:
  title: "Serverless MLOps with Vertex AI - ZenML Blog"
  description: "How ZenML lets you have the best of both worlds, serverless managed infrastructure without the vendor lock in."
  canonical: "https://www.zenml.io/blog/serverless-mlops-with-vertex-ai"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/a281639e/653128dd93ba438c4d32e95b_VertexLogo.png"
  ogTitle: "Serverless MLOps with Vertex AI - ZenML Blog"
  ogDescription: "How ZenML lets you have the best of both worlds, serverless managed infrastructure without the vendor lock in."
---

**Last updated:** November 14, 2022.

A serverless architecture allows you to run code without having to directly manage infrastructure. This helps the developer focus on the code without worrying about managing infrastructure or costs racking up for continuously running (virtual) machines. Additionally, serverless architectures can quickly scale up to meet the changing needs for computation. [Vertex AI pipelines](https://cloud.google.com/vertex-ai/docs/pipelines/introduction) is Google’s very own serverless pipeline orchestration tool that we will be using today.

However, the advantages are only part of the story. As much as serverless architectures can help you quickly scale, they come with a hidden cost: vendor lock-in. As you build your processes and services around the provider specific APIs and you become more and more dependent on the specific provider with significant costs associated with a potential switch.

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/39fe514e/653128fb7f74a7aab1d37835_lockin.jpeg" alt="Lock-In" />
</figure>

But fret not, ZenML is the perfect abstraction layer that will make it as easy as pie to quickly switch your pipeline orchestration from local to Vertex AI to any of our other Orchestrators.

## Prerequisites

This tutorial assumes that you have:

<ul><li><a href="https://www.python.org/">Python</a> installed (version 3.7-3.9)</li><li><a href="https://www.docker.com/">Docker</a> installed and running</li><li>Access to a <a href="https://cloud.google.com/">gcp</a> project space</li><li><a href="https://cloud.google.com/sdk/gcloud">gcloud CLI</a> installed on your machine and authenticated</li><li><a href="https://docs.zenml.io/user-guide/starter-guide/switch-to-production">Remote ZenML Server</a> A Remote Deployment of the ZenML HTTP server and Database</li></ul>

## Remote ZenML Server

For Advanced use cases where we have a remote orchestrator such as Vertex AI or to share stacks and pipelines with the team, we need to have a separate, remote ZenML Server. It should be accessible from your machine as well as all stack components that may need access to information or configurations from the server. [Read more information about the use case here](https://docs.zenml.io/user-guide/starter-guide/switch-to-production)

In order to achieve this there are two different ways to get access to a remote ZenML Server.

<ol><li>Deploy and manage the server manually on <a href="https://docs.zenml.io/user-guide/starter-guide/switch-to-production">your own cloud</a>.</li><li>Sign up for <a href="https://zenml.io/pricing">ZenML Enterprise</a> and get access to a hosted version of the ZenML Server with no setup required.</li></ol>

## Starting locally

To get started we will set everything up locally to initially run our pipeline on our own machine then we will run the pipeline with Vertex AI. To do so we first have to install zenml sklearn and gcp integrations, and we also initialize a ZenML repo.

```bash
pip install "zenml[server]"

zenml integration install sklearn gcp

zenml connect --url http://zenml-server... # if you have a remote server

# initialize a local ZenML Repository
zenml init
```

Now we create a Python file with the following contents in the same directory where we ran zenml init:

```bash
import random

from zenml.pipelines import pipeline
from zenml.steps import Output, step

@step
def get_first_num() -> Output(first_num=int):
    """Returns an integer."""
    return 10

@step(enable_cache=False)
def get_random_int() -> Output(random_num=int):
    """Get a random integer between 0 and 10"""
    return random.randint(0, 10)

@step
def subtract_numbers(first_num: int, random_num: int) -> Output(result=int):
    """Subtract random_num from first_num."""
    return first_num - random_num

@pipeline
def vertex_example_pipeline(get_first_num, get_random_int, subtract_numbers):
    # Link all the steps artifacts together
    first_num = get_first_num()
    random_num = get_random_int()
    subtract_numbers(first_num, random_num)

# Initialize a new pipeline run
pipe = vertex_example_pipeline(
    get_first_num=get_first_num(),
    get_random_int=get_random_int(),
    subtract_numbers=subtract_numbers(),
)

pipe.run()
```

Finally, we can run this python file:

```bash
python run.py
```

And voilà, we’ve run our machine learning pipeline locally. Not too impressive, but buckle up, we’ll take this same pipeline to the next level momentarily. But first lets look at our current stack to understand how our pipeline was run and tracked.

```bash
zenml stack describe
```

And you’ll probably get the following printout:

```bash
       Stack Configuration        
┏━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━┓
┃ COMPONENT_TYPE │ COMPONENT_NAME ┃
┠────────────────┼────────────────┨
┃ ARTIFACT_STORE │ default        ┃
┠────────────────┼────────────────┨
┃ ORCHESTRATOR   │ default        ┃
┗━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━┛
      'local' stack (ACTIVE)
```

This is your [ZenML stack](https://docs.zenml.io/user-guide/starter-guide/understand-stacks) that describes the different components that work hand-in-hand to run and track your pipeline including its artifacts and metadata. This is what we’ll now need to replace with a GCP stack later on.

## Setup of GCP Project and Resources

Before we can orchestrate our pipeline using Vertex AI we will need to set up all the required resources and permissions on GCP. This is a one time effort that you will not need to repeat. Feel free to skip and adjust these steps as you see fit. In total, we will create a gcp project, a storage container using [Cloud storage](https://blog.zenml.io/vertex-ai-blog/#cloud-storage), a [container registry](https://blog.zenml.io/vertex-ai-blog/#container-registry), a [secret manager](https://blog.zenml.io/vertex-ai-blog/#secret-manager) and [vertex ai](https://blog.zenml.io/vertex-ai-blog/#vertex-ai) enabled.

To start we will create a new gcp project for the express purpose of having all our resources encapsulated into one overarching entity.

Click on the project select box

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/22d72fa9/653128fa12fffcb42808e34e_GCP_project0.png" alt="Create Project 1" />
</figure>

Create a New Project

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/bd20a958/652fc9098320ec57475de056_gcp-create-project.png" alt="Create Project 2" />
</figure>

and name your project

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/ae6add9b/653128f95b4c42da7ca20369_GCP_project2.png" alt="Create Project 3" />
</figure>

It will take some time for your project to be created. Once it is created you will need to enable billing for the project so that you can set up all required resources.

You will need the project name and project id in the following steps again.

<ul><li>The project name will be referred to as &lt;gcp_project_name&gt;</li><li>The <a href="https://support.google.com/googleapi/answer/7014113?hl=en">project number</a> will be referred to as &lt;gcp_project_id&gt;</li></ul>

This project number can be found on your project dashboard.

### Cloud Storage

Search cloud storage or use this [link](https://console.cloud.google.com/storage/).

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/c51bbefa/653128f8a2cf0880e1ce6644_GCP_Storage0.png" alt="Create Storage 1" />
</figure>

Once the bucket is created, you can find the storage URI as follows.

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/5b0a1db2/653128f8b814e571605ec1c2_GCP_Storage1.png" alt="Create Storage 2" />
</figure>

For the creation of the [ZenML Artifact Store](https://blog.zenml.io/vertex-ai-blog/#zenml-artifact-store) you will need the following data:

<ul><li>gsutil URI</li></ul>

### Container Registry

Search container registry or use this [link](https://console.cloud.google.com/marketplace/product/google/containerregistry.googleapis.com).

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/769d6990/653128f912736ea7b1b8cff5_GCP_GCR0.png" alt="Enable Container Registry 0" />
</figure>

You can find your container registry host (&lt;registry_host>) under settings of your projects’ container registry

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/ea15bcb8/653128fc52ed944e062c4117_GCP_GCR1.png" alt="Enable Container Registry 1" />
</figure>

For the creation of the [ZenML Container Registry](https://blog.zenml.io/vertex-ai-blog/#zenml-container-registry) you will need the following data:

URI - this is constructed as follows &lt;registry_host>/&lt;gcp_project_name>/&lt;custom_name> with the &lt;custom_name> being configurable for each different project that you might want to run.

### Secret Manager

<ul><li>Search secret manager or use this <a href="https://console.cloud.google.com/marketplace/product/google/secretmanager.googleapis.com">link</a></li></ul>

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/330e369c/653128f94264b7097e76161e_GCP_SM0.png" alt="Enable Secret_Manager 1" />
</figure>

You won’t need to do anything else here. The Secret Manager will be uniquely identifiable by the &lt;gcp_project_id> .

### Vertex AI

Search vertex ai or use this [link](https://console.cloud.google.com/vertex-ai).

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/413b939b/653128f8309e6998ec0f1873_GCP_Vertex0.png" alt="Enable Vertex AI 1" />
</figure>

Make sure you choose the appropriate region for your location. You will need to remember this location for the [ZenML Orchestrator](https://blog.zenml.io/vertex-ai-blog/#zenml-orchestrator).

## Set up Permissions

With all the resources set up you will now need to set up a service account with all the right permissions. This service account will need to be able to access all the different resources that we have set up so far.

Start by searching for IAM in the search bar or use this link: https://console.cloud.google.com/iam-admin. Here you will need to create a new Service Account.

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/7bf95f9b/653128fb0dd75789d344f2b3_GCP_Service0.png" alt="Enable Service Account 1" />
</figure>

First off you’ll need to name the service account. Make sure to give it a clear name and description.

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/5e937782/653128faef2177a17720afaa_GCP_Service1.png" alt="Enable Service Account 2" />
</figure>

This service account will need to have the roles of: Vertex AI Custom Code Service Agent, Vertex AI Service Agent, Container Registry Service Agent and Secret Manager Admin (for some reason the Secret Manager Secret Accessor role is not enough here).

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/bcd84c40/653128f8bdf253e6ab09ef2f_GCP_Service2.png" alt="Enable Service Account 3" />
</figure>

Finally, you need to make sure your own account will have the right to run-as this service account. It probably also makes sense to give yourself the right to manage this service account to perform changes later on.

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/25b8e0fb/653128f901113741c291e186_GCP_Service3.png" alt="Enable Service Account 4" />
</figure>

Finally, you can now find your new service account in the IAM tab. You’ll need the Principal when creating your [ZenML Orchestrator](https://blog.zenml.io/vertex-ai-blog/#zenml-orchestrator).

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/f93254d2/653128f91a5749a8955b8d61_GCP_Service4.png" alt="Enable Service Account 4" />
</figure>

## Setting up the ZenML Stack

With everything on the GCP side done, we can now jump into the ZenML side.

### ZenML artifact-store

The **artifact store** stores all the artifacts that get passed as inputs and outputs of your pipeline steps. To register our blob storage container,

```bash
zenml artifact-store register gcp_artifact_store --flavor=gcp --path=<gsutil-uri>
</gsutil-uri>
```

The PATH_TO_YOUR_GCP_BUCKET is the path to your GCP bucket in the following format gs://xxx .

### ZenML container-registry

We’ll also need to configure a **container registry** which will point ZenML to a Docker registry to store the images that ZenML builds in order to run your pipeline.

```bash
zenml container-registry register gcp_registry --flavor=gcp --uri=<container_registry_uri>
</container_registry_uri>
```

The CONTAINER_REGISTRY_URI will have a format like this eu.gcr.io/xxx/xxx. Refer to the [gcp container registry](https://blog.zenml.io/vertex-ai-blog/#container-registry)

### ZenML secret-manager

The **secrets manager** is used to securely store all your credentials so ZenML can use them to authenticate with other components like your artifact store.

```bash
zenml secrets-manager register gcp_secrets_manager --flavor=gcp_secrets_manager --project_id=<project_id>
</project_id>
```

For the secrets manager, all we’ll need is the gcp PROJECT_ID.

### ZenML orchestrator

The **orchestrator** is responsible for running all the steps in your machine learning pipeline. In this tutorial we’ll use the new Vertex AI orchestrator which, as the name already indicates, uses Vertex AI pipelines to orchestrate your ZenML pipeline.

The orchestrator needs the PROJECT_ID and the GCP_LOCATION in which to run the Vertex AI pipeline. Additionally, you should set the WORKLOAD_SERVICE_ACCOUNT to the service account you created with secret manager access, it will be in the format: xxx@xxx.iam.gserviceaccount.com.

```bash
zenml orchestrator register vertex_orch --flavor=vertex --project=<project_id> --location=<gcp_location> --workload_service_account=<service_account>
</service_account></gcp_location></project_id>
```

### Combine your stack

Our stack components are ready to be configured and set as the active stack.

```bash
zenml stack register gcp_vertex_stack -a gcp_artifact_store -o vertex_orch -c gcp_registry -x gcp_secrets_manager --set
```

## Running

Wow, we’ve made it past all the setting-up steps, and we’re finally ready to run our code on Vertex AI now. All we have to do is call our Python function from earlier, sit back and wait.

```bash
python run.py
```

In the background zenml will use the active stack to run the pipeline using Vertex AI. To do this the orchestrator will build a Docker image that contains all your pipeline code, including its requirements and push it to the container registry. Additionally, a Vertex AI pipeline job is created which contains the information of how the separate steps of the pipeline are related to each other through their inputs and outputs. Once the Docker image is pushed, Vertex AI can now pull the image and use it to run each step of the pipeline in the correct order. You will see a printout in your terminal that will take you into the Vertex AI UI where you’ll be able to observe live, as your pipeline get executed. It should look a little bit like this:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/932d341b/653128f9f3a6d5dfa4169e83_vertex_ai_ui.png" alt="Running Pipeline" />
</figure>

## Cleanup

Cleanup should be fairly straightforward now, in case you bundled all of these resources into one separate project. Simply navigate to the [Cloud Resource Manager](https://console.cloud.google.com/cloud-resource-manager) and delete your project:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/f05d486a/653128fa7213b13e8a7b550e_GCP_Delete0.png" alt="Running Pipeline" />
</figure>

## Conclusion

I hope this guide was able to show you how easy it is to take your code and deploy it on Vertex AI pipelines through the magic of the ZenML Stack without changing the code itself. What this means is, that you will be fully free to switch your orchestrator away from Vertex AI and GCP at any point with minimal effort. For example, you could switch to using our [Kubeflow Pipelines Orchestrator](https://docs.zenml.io/stacks-and-components/component-guide/orchestrators/kubeflow) to run pipelines on top of Cloud or On-Prem Infrastructure. Alternatively, you could also switch to the completely free [Github Actions Orchestrator](https://blog.zenml.io/github-actions-orchestrator/).

If you have any question or feedback regarding this tutorial, let us know [here](https://zenml.hellonext.co/p/github-actions-orchestrator-tutorial-feedback) or join our [weekly community hour](https://www.eventbrite.com/e/zenml-meet-the-community-tickets-354426688767). If you want to know more about ZenML or see more examples, check out our [docs](https://docs.zenml.io/), [examples](https://github.com/zenml-io/zenml/tree/main/examples) or join our [Slack](https://zenml.io/slack-invite/).

[*Image Credit: Photo by *[Google](https://cloud.google.com/blog/products/ai-machine-learning/google-cloud-launches-vertex-ai-unified-platform-for-mlops)]

