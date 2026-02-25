---
title: "What's New in v0.5.7"
slug: "whats-new-in-v0-5-7"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "65315efaad085808c86cb4db"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-01-26T10:23:43.773Z"
  createdOn: "2023-10-19T16:53:14.025Z"
author: "alex-strick-van-linschoten"
category: "zenml"
tags:
  - "release-notes"
  - "zenml"
date: "2022-01-17T00:00:00.000Z"
readingTime: 3 Mins Read
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/3140f3e2/65315e8de292fecbae779cfb_yoksel-zok-H9Un6az4rno-unsplash.jpg"
---

**Last updated:** November 3, 2022.

ZenML 0.5.7 is out now and we bring you not one but two brand new integrations to cover common use cases. ZenML now supports [MLFlow for tracking](https://www.mlflow.org/docs/latest/tracking.html) pipelines as experiments and [Evidently](https://github.com/evidentlyai/evidently) for detecting drift in your ML pipelines in production!

There are a bunch of other smaller changes, including preventing Kubeflow Pipelines from timing out during the local installation process and a bunch of improvements to the feedback that the ZenML CLI tool gives you. For a detailed look at what’s changed, give [our full release notes](https://github.com/zenml-io/zenml/releases/tag/0.5.7) a glance.

## MLFlow Tracking

[You voted](https://github.com/zenml-io/zenml/discussions/115), we integrated! This new addition of [MLFlow Tracking](https://www.mlflow.org/docs/latest/tracking.html) as part of ZenML’s integrations means that you can track your training runs using MLFlow. This gives you a handy web UI that you can use to log and query your experiments. ZenML is tracking all of your parameters and metrics already, but you might prefer to visualize those changes in the MLFlow web UI.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/4bbb0c23/653004d4eb404487bba19253_mlflow-screenshot.png" alt="Tracking machine learning training runs with MLFlow" />
</figure>

We’ve [written an example](https://docs.zenml.io/stacks-and-components/component-guide/experiment-trackers/mlflow) that showcases the integration that you can check out by using the zenml example pull mlflow CLI command. The README file offers full instructions for how to set this up manually, but if you just want to try out the UI and let ZenML handle the local setup for you, just type zenml example run mlflow.

Watch this space for more MLFlow goodness coming your way!

## Evidently for Drift Detection

[Evidently](https://github.com/evidentlyai/evidently) is an open-source tool for detecting drift among your data inputs. Machine learning pipelines are built on top of those data inputs, so it is worth checking for drift if you have a model that was trained on a certain distribution of data.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/fdd41450/65315e94a573237c2d5547b9_evidently-screenshot.png" alt="Detecting and visualizing data drift with Evidently" />
</figure>

The ZenML integration with Evidently implements this functionality in the form of several standardized steps. You select which of the profile sections you want to use in your step by passing a string into the EvidentlyProfileConfig. Possible options supported by Evidently are:

<ul><li>“datadrift”</li><li>“categoricaltargetdrift”</li><li>“numericaltargetdrift”</li><li>“classificationmodelperformance”</li><li>“regressionmodelperformance”</li><li>“probabilisticmodelperformance”</li></ul>

For example, you could define a step to detect drift using our standard interface in the following way:

```bash
drift_detector = EvidentlyProfileStep(
    EvidentlyProfileConfig(
        column_mapping=None,
        profile_section="datadrift",
    )
)
```

Here you can see that defining the step is extremely simple using our class-based interface and then you just have to pass in the two dataframes when defining the pipeline for the comparison to take place.

```bash
@pipeline
def drift_detection_pipeline(data_loader, full_data, partial_data, drift_detector):
    data_loader = data_loader()
    full_data = full_data(data_loader)
    partial_data = partial_data(data_loader)
    drift_detector(reference_dataset=full_data, comparison_dataset=partial_data)
```

As with MLFlow, we’ve [written an example](https://github.com/zenml-io/zenml/tree/0.5.7/examples/drift_detection) for you to see how it all works in code. You can check it out by using the zenml example pull drift_detection CLI command. The README file offers full instructions for how to set this up manually, but if you just want to try out the UI and let ZenML handle the local setup for you, just type zenml example run drift_detection.

## Contribute to ZenML!

Join our [Slack](https://zenml.io/slack-invite/) to let us know what you think we should build next!

Keep your eyes open for future releases and make sure to vote on your favorite feature of our [roadmap](https://zenml.io/roadmap) to make sure it gets implemented as soon as possible.

[Image credit: Photo by [Yoksel 🌿 Zok](https://unsplash.com/@yoksel?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/balloons?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)]

