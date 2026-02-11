---
title: "Neptune"
slug: "neptune"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8ab110b5e7278547b40"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-09-23T14:12:22.602Z"
  lastUpdated: "2024-09-23T10:17:06.127Z"
  createdOn: "2023-10-12T09:13:15.155Z"
integrationType: "experiment-tracker"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/6ede5306/66d868461faf236b9f779ba8_neptune.png"
shortDescription: "Supercharge your ZenML pipelines with Neptune's powerful experiment tracking capabilities"
docsUrl: "https://docs.zenml.io/stack-components/experiment-trackers/neptune#full-code-example"
githubUrl: "https://docs.zenml.io/stack-components/experiment-trackers/neptune"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/46a1c764/66ed4e8a604dbf06577c760f_Integration_image__2_.png"
seo:
  title: "Integrate Neptune with ZenML - Experiment Tracker Integrations"
  description: "Supercharge your ZenML pipelines with Neptune's powerful experiment tracking capabilities"
  canonical: "https://www.zenml.io/integrations/neptune"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/46a1c764/66ed4e8a604dbf06577c760f_Integration_image__2_.png"
  ogTitle: "Integrate Neptune with ZenML - Experiment Tracker Integrations"
  ogDescription: "Supercharge your ZenML pipelines with Neptune's powerful experiment tracking capabilities"
---

<ul><li>Effortlessly track and visualize ZenML pipeline runs in Neptune</li><li>Log models, parameters, metrics, and artifacts from pipeline steps</li><li>Seamlessly transition from experimentation to production workflows</li><li>Share pipeline results with team members and stakeholders via Neptune</li><li>Leverage Neptune as a model registry for production-ready models</li></ul>

<ul><li>Interactive experiment tracking and visualization</li><li>Comprehensive logging of metrics, parameters, artifacts, and more</li><li>Collaborative workspace for sharing results with team members</li><li>Flexible and customizable experiment management</li><li>Integrates with popular ML frameworks and libraries</li></ul>

```python
import numpy as np
from zenml import step
from zenml.integrations.neptune.experiment_trackers.run_state import (
    get_neptune_run,
)
from zenml.integrations.neptune.flavors import NeptuneExperimentTrackerSettings

neptune_settings = NeptuneExperimentTrackerSettings(tags={"classifier", "mnist"})

@step(
    experiment_tracker="<NEPTUNE_TRACKER_STACK_COMPONENT_NAME>",
    settings={
        "experiment_tracker": neptune_settings
    }
)
def training_step(
    x_test: np.ndarray,
    y_test: np.ndarray,
    model,
) -> float:
    """Log metadata to Neptune run"""
    neptune_run = get_neptune_run()
    neptune_run["metrics"] = ...
    ...
```
This code snippet demonstrates how to use the Neptune experiment tracker in a ZenML pipeline step. The @step decorator enables the Neptune tracker, and the get_neptune_run() function retrieves the current Neptune run object. This object can be used to log metrics and metadata into the active Neptune context.