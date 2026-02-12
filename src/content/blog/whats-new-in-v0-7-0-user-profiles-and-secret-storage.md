---
title: "What's New in v0.7.0: 🔡 User Profiles and Secret Storage 🤫"
slug: "whats-new-in-v0-7-0-user-profiles-and-secret-storage"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "65316207519c6b905eea4e8b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-01-26T10:14:15.843Z"
  createdOn: "2023-10-19T17:06:15.180Z"
author: "james-w-browne"
category: "zenml"
tags:
  - "release-notes"
  - "zenml"
date: "2022-03-28T00:00:00.000Z"
readingTime: 4 Mins Read
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/249ec10c/6531618ac31a6fa3503f4a1b_balloons__1_.jpg"
---

**Last updated:** November 3, 2022.

With ZenML 0.7.0, a lot has been revamped under the hood about how things are stored. Importantly what this means is that ZenML now has system-wide profiles that let you register stacks to share across several of your projects! If you still want to manage your stacks for each project folder individually, profiles let you continue to do that as well.

Most projects of any complexity will require passwords or tokens to access data and infrastructure, and for this purpose ZenML 0.7.0 introduces the Secrets Manager stack component to seamlessly pass around these values to your steps. Our AWS integration also allows you to use AWS Secrets Manager as a backend to handle all your secret persistence needs.

Finally, in addition to the new AzureML and Sagemaker Step Operators that [version 0.6.3](https://blog.zenml.io/zero-seven-zero-release/2022-03-14-zero-six-three-release.md) brought, this release also adds the ability to run individual steps on GCP’s Vertex AI.

Beyond this, some smaller bugfixes and documentation changes combine to make ZenML 0.7.0 a more pleasant user experience. For a detailed look at what’s changed, give [our full release notes](https://github.com/zenml-io/zenml/releases/tag/0.7.0) a glance.

## 🗿 Profiles and Global Stack Storage

Ever wanted to use the same stack configuration in multiple projects? Well now you can! ZenML 0.7.0 moves the storage of stack configurations out of the .zen folder inside of each individual project and into the system-wide ZenML application configuration folder. What this means is you can now interact with ZenML using CLI commands from anywhere, not just in zen repository projects with a .zen folder. Adding a new stack component, for instance an orchestrator using

```bash
zenml orchestrator register kubeflow_orchestrator --type=kubeflow
```

means that this orchestrator will now be available to use in any ZenML projects on your local machine.

Still want separation of concerns with isolated environments for each project? This is where profiles come in. You can now register a new profile using:

```bash
zenml profile create NEW_PROFILE_NAME
zenml profile activate NEW_PROFILE_NAME
```

This provides you with a completely fresh environment that only has the default local stack pre-registered, where you can work without disturbing other profiles or projects. You can specify both globally and on a project (folder) level which profile to default to using. For ease of transition, any legacy ZenML repositories (projects) will automatically be migrated to a new isolated profile so you can maintain the separation you are used to:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/7967a43a/6531619186dad4136a61c2de_legacy-migration.png" alt="Migration of Legacy Profiles" />
</figure>

## 🔑 Secret Management

Most projects of a certain complexity or using cloud infrastructure will involve secrets of some kind. You use secrets, for example, when connecting to AWS. These secrets, in this case the access_key_id and secret_access_key, are usually stored in the ~/.aws/credentials file. You might find you need to access those secrets from within your Kubernetes cluster as it runs individual steps, or you might just want a centralized location for the storage of secrets across your project. As of this release, ZenML offers a basic [local secrets manager](https://docs.zenml.io/) and an integration with the managed [AWS Secrets Manager](https://aws.amazon.com/secrets-manager).

This now lets you easily specify secrets as dependencies for pipelines from the decorator:

```bash
@pipeline(required_integrations=[TENSORFLOW], secrets=["aws"], enable_cache=True)
def mnist_pipeline(importer, normalizer, trainer, evaluator):
    """Steps that require access to an AWS account here"""
```

## ➕ Other Updates, Additions and Fixes

Google Cloud’s Vertex AI is now available as a step operator to run individual steps of your pipeline in the cloud. Simply register it as you would any other stack component from the CLI:

```bash
zenml step-operator register vertex \
    --type=vertex \
    --project=zenml-core \
    --service_account_path=... \
    --region=europe-west1 \
    --machine_type=n1-standard-4 \
    --base_image=<custom_base_image> \
    --accelerator_type=...
</custom_base_image>
```

More details about the parameters that you can configure can be found in the class definition of Vertex Step Operator in the [API docs](https://apidocs.zenml.io/0.7.0/api_docs/integrations/#zenml.integrations.vertex.step_operators.vertex_step_operator).

Another change addresses the fact that while in most cases [materializers](https://docs.zenml.io/) should be used to control how artifacts are consumed and output from steps in a pipeline, there is sometimes a need to have a completely non-materialized artifact in a step. ZenML now provides this option of [bypassing materialization](https://docs.zenml.io/).

## 🙌 Community Contributions

We received [a contribution](https://github.com/zenml-io/zenml/pull/485) from [Avram](https://github.com/avramdj), in which he fixed a typo in our documentation. Thank you, Avram!

## Contribute to ZenML!

Join our [Slack](https://zenml.io/slack-invite/) to let us know what you think we should build next!

Keep your eyes open for future releases and make sure to vote on your favorite feature of our [roadmap](https://zenml.io/roadmap) to make sure it gets implemented as soon as possible.

[Photo by [Jason Leung](https://unsplash.com/@ninjason?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/balloon?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)]

