---
title: "Lazy Loading Integrations in ZenML"
slug: "lazy-loading-integrations-in-zenml"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6530b00be6cefa01869bfe90"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-01-26T14:50:01.918Z"
  createdOn: "2023-10-19T04:26:51.373Z"
author: "baris-can-durak"
category: "zenml"
tags:
  - "evergreen"
  - "mlops"
  - "tooling"
  - "zenml"
date: "2021-11-26T00:00:00.000Z"
readingTime: 5 Mins Read
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/e6f47b99/6530af83193a7bf8d264920e_sam_zen_mode.jpg"
---

**Last updated:** October 17, 2022.

When working on a project in Python, it is very likely that you will run into an issue where even the simplest of imports can lead to a chain of imports, which in turn can cost you a few seconds of run time before you even start to use what you imported. Left unchecked, this eager consumption of time can become even more apparent and annoying if you working on a project where the response time is critical and there are a wide variety of tools in play. Let’s put this into perspective for a tool that handles Machine Learning workflows in a production setting.

## Fractured space of Machine Learning

In recent years, the field of Machine Learning has become even more fractured, especially in a production setting. Anyone who deals with a Machine Learning workflow needs to not only think about designing and training models but also a wide variety of tasks ranging from data ingestion to processing, from training to serving, from distributed processing to orchestration. The solutions to these problems are usually tailored to the problem at hand and they utilize a different set of tools/frameworks to bring forth a solution. Naturally, it is impossible to claim that there is only”**one”** set of tools/frameworks that can solve it all.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/4ba90beb/6530afb3d5cc716731a5bd76_sam_frustrated.jpeg" alt="" />
</figure>

We think about this all the time at **ZenML** and it is why we aim to create an environment where our users already have access to some of the widely used tools while having the option to extend the framework as they see fit. Through a set of high-level abstractions, we want to minimize the friction as much as possible between these moving parts of an ML workflow. At the core of this solution, we have our **Integrations**.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/735e25d5/6530afb3d0bce1093eff5a15_sam_zen_mode.jpeg" alt="" />
</figure>

## What do Integrations bring to the table?

In order to describe the concept of **Integrations**, we can draw an example from one of our base concepts, namely *the artifact store*. The artifact store is an integral part of any pipeline execution in **ZenML** and as the name suggests, it is used to store the outputs of each step within your pipeline. When you install **ZenML**, you directly get access to our built-in LocalArtifactStore.

However, this local implementation barely scratches the surface of what is needed in a production setting. With your infrastructure in mind, you might find it more ideal to utilize the Google Cloud Platform (or any other cloud provider) to set up your environment, in which case you would not care about loading any other artifact store implementation than the GCPArtifactStore. That is why the **Integrations** are there.

They propose a solution, where you will find a bunch of implementations bundled up together within the context of an **Integration.** For instance, by simply activating our GCPIntegration, you gain access to all our tools that are related to Google Cloud Platform, like the GCPArtifactStore, GCPMetadataStore, and much more to come. Moreover, since they are all wrapped up by this concept, we can make sure that their requirements are set up properly and they are only loaded when you actually need them.

## How are the Integrations implemented?

In **ZenML**, an **Integration** is a simple Python class which features a NAME, a list of REQIUREMENTS, and a few helper functions, namely check_installation and activate:

```bash
class Integration(metaclass=IntegrationMeta):
    """Base class for integration in ZenML"""

    NAME = "base_integration"
    REQUIREMENTS: List[str] = []

    @classmethod
    def check_installation(cls) -> bool:
        """Method to check whether the required packages are installed"""
        ...

    @classmethod
    def activate(cls) -> None:
        """Method to activate the integration"""
```

While NAME, REQUIREMENTS, and check_installation are quite self-explanatory, the activate method is a bit more complicated and key to our operation. In short, it is responsible for loading and registering the tools which come with the Integration. This method of lazy-loading gives us an opportunity to be optimized in terms of time and choose the exact moment when we want to load the actual **Integration**.

## How do I use the tools that come with an Integration?

Assuming that you have installed the requirements of an **Integration**, you can go ahead simply import any tools within its arsenal and start using it:

```bash
from zenml.integrations.tensorflow.materializers import KerasMaterializer
```

Even though this seems relatively straightforward, we also need to take a look at what happens if the integration you installed brings a component that is not necessarily imported or used within your pipeline creation code. Let’s take a look at what happens when you create a basic step:

Normally, when you are creating a step in **ZenML**, the input and output annotations play a major role in the execution of the step. If not otherwise set, **ZenML** will take a look at the annotations, find the default materializer in its materializer_registry for each annotation, and use the dedicated materializer object to use for either reading or writing.

```bash
@step
def trainer(X_train: np.ndarray, y_train: np.ndarray) -> tf.keras.Model:
        ...
```

In this example, the output of the step is a tf.keras.Model and normally, in its barest form, the materializer_registry has no materializer pre-loaded for this type. This is mainly due to the fact that it will not be needed by everybody who will use our tools. Making them load a materializer for an annotation that they will not need would be a waste of time. However, to counteract that, we can keep track of which **Integrations** you have installed in your environment and activate them upon pipeline execution. This way you will have access to the tool within the integration *when it matters.*

## What is in store for the Integrations in the future?

**Integrations** are a new concept that we recently added to our arsenal and we hope that they will be a great gateway for us and our users to extend **ZenML** wherever we need. For us, the next immediate step will likely revolve around implementing an easy way for you to manage your **Integrations** through our CLI tool. If you are interested in **ZenML** or if you have any questions or feedback, make sure to [join our Slack](https://zenml.io/slack-invite/) to let us know what you think we should build next!

*Barış Can Durak is a Machine Learning Engineer at ZenML.*

