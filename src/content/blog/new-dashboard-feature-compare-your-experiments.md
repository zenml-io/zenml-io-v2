---
title: "New Dashboard Feature: Compare Your Experiments"
slug: "new-dashboard-feature-compare-your-experiments"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "678525ed4a16785150e7f75e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-04-27T13:33:03.335Z"
  lastUpdated: "2025-04-27T13:33:03.335Z"
  createdOn: "2025-01-13T14:40:45.237Z"
author: "alex-strick-van-linschoten"
category: "zenml-updates"
tags:
  - "visualization"
  - "dashboard"
  - "model-control-plane"
  - "monitoring"
date: "2025-01-13T00:00:00.000Z"
readingTime: 4 mins
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/2dba7ec3/678524f9be42385bc570eedf_Metadata_Comparison_Tool_Jan_13_2025.png"
seo:
  title: "New Dashboard Feature: Compare Your Experiments - ZenML Blog"
  description: "ZenML's new Experiment Comparison Tool brings powerful experiment tracking capabilities to your ML pipelines. Compare up to 20 pipeline runs simultaneously through intuitive tabular and parallel coordinates visualizations, helping teams derive actionable insights from their pipeline metadata. Now available in the Pro tier dashboard."
  canonical: "https://www.zenml.io/blog/new-dashboard-feature-compare-your-experiments"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/2dba7ec3/678524f9be42385bc570eedf_Metadata_Comparison_Tool_Jan_13_2025.png"
  ogTitle: "New Dashboard Feature: Compare Your Experiments - ZenML Blog"
  ogDescription: "ZenML's new Experiment Comparison Tool brings powerful experiment tracking capabilities to your ML pipelines. Compare up to 20 pipeline runs simultaneously through intuitive tabular and parallel coordinates visualizations, helping teams derive actionable insights from their pipeline metadata. Now available in the Pro tier dashboard."
---

In modern machine learning workflows, understanding the nuances of your pipeline performance is essential for making informed decisions. Today, we're introducing the Experiment Comparison Tool, an addition to ZenML's Pro tier that brings in-dashboard experiment tracking capabilities to your MLOps workflow.

The complexity of machine learning pipelines generates rich metadata at every step—from model performance metrics to system telemetry. The Experiment Comparison Tool transforms this wealth of information into actionable insights, enabling teams to make data-driven decisions with confidence.``

<iframe src="https://www.loom.com/embed/693b2d829600492da7cd429766aeba6a?sid=fa4cd579-2dc7-452b-9698-8a92e50fe9fe" frameBorder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>

## Core Capabilities

Our approach to metadata and metrics analysis combines power with simplicity, offering two complementary views that cater to different analytical needs.

### Comprehensive Cross-Pipeline Run Analysis

The tool supports comparison of up to 20 pipeline runs simultaneously, accommodating any numerical (`float` or `int`) metadata your pipelines generate. This flexibility means you can track everything from model accuracy to custom performance indicators, all within a unified interface.

### Structured Tabular Analysis

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/450c5949/678525ed4a16785150e7f734_678524df5bdf915eb062b4a1_CleanShot_20Jan_2013_202025.png" alt="A tabular view comparing three rocket telemetry pipeline runs side by side. The table shows detailed information including run IDs, creation times, and author, followed by various environmental and engine metrics like visibility, humidity, and engine temperature. Each metric displays numerical values with percentage changes indicated by up/down arrows, allowing for easy comparison between runs. The interface includes model version tags and a search bar at the top." />
</figure>

The tabular view provides a methodical approach to run comparison:

<ul><li>Clear tabular presentation of sequential pipeline runs</li><li>Automatic comparative analysis between runs</li><li>Key run metadata (model, stack, start time, run executor) presented alongside your custom metadata</li></ul>

### Advanced Parallel Coordinates View

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/3f776b46/678525ed4a16785150e7f741_678524f9be42385bc570eedf_Metadata_20Comparison_20Tool_20Jan_2013_202025.png" alt="An interactive parallel coordinates plot showing multiple rocket telemetry metrics across different pipeline runs. The visualization displays various flight parameters like acceleration, altitude, drag coefficient, and fuel remaining on parallel vertical axes, with colored lines connecting related values across runs. Each run is represented by a different colored line, showing how values vary across parameters. On the right side, there&#039;s a parameters panel listing the different metrics that can be toggled, and below the graph is a table showing run details including pipeline and model versions." />
</figure>

The parallel coordinates visualization gives you the ability to do multi-dimensional analysis. It supports interactive parameter exploration as well as filtering and grouping. As long as the values are numeric, we'll plot them out for you here.

### Share Visualizations

The Experiment Comparison Tool is designed with team collaboration in mind. Each visualization configuration is preserved in the URL, allowing you to share specific analysis views with team members. This feature ensures consistent analysis across your organization and helps you have meaningful discussions about pipeline performance, all grounded in your run metadata.

## When to Use ZenML's Experiment Comparison Tool

The MLOps ecosystem offers several mature experiment tracking solutions like [MLflow](https://mlflow.org/) and [Weights & Biases](https://wandb.ai/), each serving distinct needs in the machine learning workflow. While these tools excel at model-centric workflows—tracking training metrics, comparing architectures, and conducting hyperparameter optimization—ZenML's Experiment Comparison tool takes a different approach by focusing on pipeline-level insights and operational metrics.

The tool shines when you need to understand your ML pipelines holistically, tracking and comparing operational metrics, system telemetry, and pipeline-specific metadata alongside your model metrics. Since it's integrated directly into your pipeline orchestration workflow, you can analyze everything from processing times and resource utilization to data preprocessing statistics without adding new tools to your stack.

The Experiment Comparison tool complements rather than replaces traditional experiment trackers. Many teams use both: ZenML for pipeline-level insights and operational metrics, alongside specialized tools for in-depth model experimentation and development.

## Getting Started

The Experiment Comparison Tool is available now for Pro-tier users. Implementation is straightforward:

<ol><li>Configure your pipelines to log numerical metadata</li><li>Access the dashboard through your Pro account</li><li>Select your pipeline runs</li><li>Explore both visualization modes to uncover insights</li></ol>

We already have [full documentation on logging metadata](https://docs.zenml.io/concepts/metadata) available in our standard documentation. Your code to log the metadata or metrics might look something like this, for example:

```
from zenml import step, pipeline, log_metadata, Model
from zenml.enums import ModelStages

@step
def process_engine_metrics() -> float:
    # do some machine learning things here :)
    
    log_metadata(
        metadata={
            "thrust_efficiency": 0.92,  # Realistic efficiency for advanced rocket engines
            "fuel_consumption_rate": 245,  # kg/s - More typical consumption rate
            "engine_temperature": 3650,  # Kelvin - Realistic operating temperature
            "nozzle_pressure": 2.8,  # MPa - Typical operating pressure for modern rocket engines
        }
    )
    return 0.92

@pipeline(
    enable_cache=False,
    model=Model(
        name="RocketTelemetryModel",
        version=ModelStages.LATEST,
    ),
)
def rocket_telemetry_pipeline():
    efficiency = process_engine_metrics()

rocket_telemetry_pipeline()
```

## Looking Forward

The Experiment Comparison Tool represents our initial step into experiment tracking functionality. While the current implementation provides a solid foundation for pipeline analysis, we're keen to understand how teams use it in practice. Your feedback will be instrumental in shaping the tool's evolution, ensuring it continues to meet the real-world needs of MLOps teams.

Ready to enhance your pipeline analysis? Explore the Experiment Comparison Tool in your Pro-tier dashboard today.

*If you have any feedback about the comparison tool, please *[let us know over in the Slack community](https://zenml.io/slack)*!*