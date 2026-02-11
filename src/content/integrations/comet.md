---
title: "Comet"
slug: "comet"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "665715011697fdaaa50546cd"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-09-20T07:58:19.195Z"
  lastUpdated: "2024-09-20T07:58:19.195Z"
  createdOn: "2024-05-29T11:44:01.112Z"
integrationType: "experiment-tracker"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/7195594b/66d8678adb416cf13838baeb_comet.png"
shortDescription: "Effortlessly track and visualize Comet experiments with ZenML pipelines"
docsUrl: "https://docs.zenml.io/stack-components/experiment-trackers/comet"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/cb2888c4/66e9ab03fc78245ffa53c4af_Integration_image.png"
relatedBlogPosts:
  - "integrate-zenml-and-comet-for-better-experiment-tracking"
seo:
  title: "Integrate Comet with ZenML - Experiment Tracker Integrations"
  description: "Effortlessly track and visualize Comet experiments with ZenML pipelines"
  canonical: "https://www.zenml.io/integrations/comet"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/cb2888c4/66e9ab03fc78245ffa53c4af_Integration_image.png"
  ogTitle: "Integrate Comet with ZenML - Experiment Tracker Integrations"
  ogDescription: "Effortlessly track and visualize Comet experiments with ZenML pipelines"
---

<ul><li>Automatically log metrics, parameters, models, and more from ZenML steps to Comet experiments</li><li>Easily enable Comet tracking in steps using the <code>@step</code> decorator</li><li>Retrieve Comet experiment URLs for each pipeline run via ZenML metadata</li><li>Organize experiments with automatic <code>pipeline_name</code> and <code>pipeline_run_name</code> tags</li><li>Configure additional experiment settings using <code>CometExperimentTrackerSettings</code></li></ul>

<ul><li>Interactive web-based UI to visualize and compare experiments</li><li>Supports logging metrics, hyperparameters, datasets, models, and more</li><li>Workspaces and projects to organize experiments across teams</li><li>Extensive visualization and charting of tracked data</li><li>Easy sharing of experiment results and insights</li></ul>

```python
from zenml import step

@step(experiment_tracker="comet_tracker")
def my_step():
    ...
    # go through some experiment tracker methods
    experiment_tracker.log_metrics({"my_metric": 42})
    experiment_tracker.log_params({"my_param": "hello"})

    # or use the Experiment object directly
    experiment_tracker.experiment.log_model(...)

    # or pass the Comet Experiment object into helper methods
    from comet_ml.integration.sklearn import log_model
    log_model(
        experiment=experiment_tracker.experiment,
        model_name="SVC",
        model=model,
    )
        ...
    
```
This code snippet demonstrates how to enable Comet experiment tracking in a ZenML step using the @step decorator. It retrieves the active stack's experiment tracker and logs metrics and parameters to the Comet experiment associated with the step. It also uses the [Comet Experiment](https://www.comet.com/docs/v2/api-and-sdk/python-sdk/reference/Experiment/#comet_ml.Experiment) object directly to log a scikit-learn model.