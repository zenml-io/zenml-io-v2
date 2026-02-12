---
title: "The struggles of defining a Machine Learning Pipeline"
slug: "the-struggles-of-defining-a-machine-learning-pipeline"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "667d2ac3422f8dbe68f30d9c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-06-28T08:13:27.463Z"
  lastUpdated: "2024-06-27T10:20:10.555Z"
  createdOn: "2024-06-27T09:02:59.957Z"
author: "hamza-tahir"
category: "zenml"
tags:
  - "bitesize"
  - "zenml"
  - "mlops"
date: "2024-06-27T00:00:00.000Z"
readingTime: 5 mins
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/f1883fa8/667d2f3d608e1ff6938f0e9e_struggles-ml.webp"
seo:
  title: "The struggles of defining a Machine Learning Pipeline - ZenML Blog"
  description: "On the difficulties in precisely defining a machine learning pipeline, exploring how code changes, versioning, and naming conventions complicate the concept in MLOps frameworks like ZenML."
  canonical: "https://www.zenml.io/blog/the-struggles-of-defining-a-machine-learning-pipeline"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/9b5a5360/667d2f3d608e1ff6938f0e9e_struggles-ml.webp"
  ogTitle: "The struggles of defining a Machine Learning Pipeline - ZenML Blog"
  ogDescription: "On the difficulties in precisely defining a machine learning pipeline, exploring how code changes, versioning, and naming conventions complicate the concept in MLOps frameworks like ZenML."
---

ZenML is all about pipelines - they lie at the [very center of the framework](https://docs.zenml.io/user-guide/starter-guide/create-an-ml-pipeline). When we initially designed ZenML, it was centered around the idea of chaining together a set of Python functions (`steps`) using another (`pipeline`) function.

However, three years down the line, I still struggle to define *exactly* what a machine learning pipeline really is.

## Why does it matter?

Before I get into it, let me briefly motivate why it even matters. My team at ZenML has been developing the framework [for close to three years now](https://www.zenml.io/blog/zenml-why-we-built-it), and this has always been a source of internal debate. Because the *definition* of one of the core concepts in your tool correlated a lot to how people use and understand the value of it. You can’t use what you don’t grasp.

Additionally, from a purely product perspective, this also in a very real way affects how features such as Role-based Access Control, Triggers, Events, and many more are implemented. These things need to be represented in the backend somehow and the relationships are crucial to avoiding a technical debt nightmare.

Finally, it’s about establishing a meaningful standard through the industry. Even if these topics can be esoteric and vague, I feel like teams should think about them, as at the end they do make a lasting, long-term impact on development efficiency and output.

So let’s get into it.

## A naive definition

Consider the following simple ZenML pipeline:

```
@step
def a_loading_data_step() -> pd.Dataframe:
    return load_data(df)
    
@step
def a_training_step(df: pd.Dataframe):
    train_model(df)
    
@pipeline
def training_pipeline():
    df = a_loading_data_step()
    some_training_logic(df)
```

I'm obfuscating some of the actual logic to focus on the *structure* of the pipeline itself. It’s quite basic - Two functions called one after the other. These functions can be treated as independent jobs orchestrated together in their independent environments.

So that’s easy, right? If I call `training_pipeline()`, the function generates a `pipeline run` and the `pipeline` is called `training_pipeline`. Every time I called the `training_ipeline()` function, it produces another run.

However, what would happen if I did this:

```
@step
def a_loading_data_step() -> pd.Dataframe:
    print("Haha I changed the code!") # Added a line
    return load_data(df)
```

Now, if I called `training_pipeline()`, I get another run.

**But is it the same pipeline? Well here is where it gets tricky…**

## The lines blur

Some people might say, yes it is the same pipeline because it is *functionally* the same. The `print` statement does not *really* change the pipeline, and technically the pipeline is under the `umbrella` of whatever the original author meant `training_pipeline` to be → Which is it loads some specific data and trains a specific model.

But how far can we take this? What if we completely rip out the data loading and the training function and replace it with a completely different set of data and functionality? I mean *technically* it’s a training pipeline … but is it really the same one though?

We could say that the *combination* of `a_loading_data_step` and `a_training_step` is what makes the `training_pipeline`. However, the problem is that if I change the name of these functions but leave the step code unchanged — We get the same problem, just at the step level, and not at the pipeline level.

At this moment, I’m not even sure what a step is anymore!

## Introducing pipeline versions

One way to solve this is to [introduce *Versions](https://docs.zenml.io/how-to/build-pipelines/version-pipelines) →* You see, it’s the *same* pipeline but it's a different *version*!

Well, that doesn’t work either. We’ve kicked the can down the road. What exactly is a *pipeline version*? Is it just the exact collection of code and configuration the moment we ran that pipeline? In that case, isn’t that also the same as a run? Also, do I expect that everytime I add a small print statement, I get another version of this same pipeline? I’d end up having 100 pipeline versions in a day!

Also, ZenML allows you to configure a step as well, without [changing the code](https://docs.zenml.io/user-guide/production-guide/understand-stacks):

```
@step(experiment_tracker="mlflow")
def a_training_step(df: pd.Dataframe):
    train_model(df)
```

Now the *code* has not changed but the *configuration* has. So is this a new version then? Well I’d say not really. It’s more of the same version having another run. But in the end, who knows?

Finally, to make it even worse, what if another colleague of mine also decided to create a pipeline called `training_pipeline` with a *completely different* set of functions? That would end up merging the two pipelines, their versions, and their runs - even though functionally they have nothing to do with each other - except the name of course.

Something doesn’t work here.

## So what is a Machine Learning Pipeline?

So if a pipeline isn’t just a namespace, or an individual collection of code and config, or even an individual run, what exactly *is* it?

**I’ll level with you: I have not figured it out yet**.

The above implementation is how ZenML works currently. A pipeline is simply the name of the `@pipeline` function, and each time the code or definition of the DAG changes, a new version is created. So, when you call the pipeline function, you create a new version if something changes, and then you create a run *for that version*.  In summary, for now, a pipeline is a namespace, it’s structure and code is a version, and each invocation is a run, even if the configuration changes.

I’ve heard numerous complaints that it isn’t perfect. I hear you. But we’re open to ideas.

Perhaps the real answer is to enforce more constraints or introduce another concept that makes these definitions easier.

Do you want to add to the discussion? Join the [Slack community](https://zenml.io/slack) and let us know — Happy to learn! See you there.

