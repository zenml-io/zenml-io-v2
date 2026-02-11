---
title: "Evidently"
slug: "evidently"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8a9742b8bf1e7823972"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-22T12:54:05.951Z"
  lastUpdated: "2024-10-15T11:17:23.809Z"
  createdOn: "2023-10-12T09:13:13.481Z"
integrationType: "data-validator"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/30001cf5/66d868feae26c1d6b7e42f24_evidently.png"
shortDescription: "Ensure data quality and guard against drift with Evidently profiling in ZenML"
docsUrl: "https://docs.zenml.io/stack-components/data-validators/evidently"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/b8f413a4/66e02ec6c735595e832d5d8b_image__3_.png"
relatedBlogPosts:
  - "10-reasons-zenml-evidently-ais-monitoring-tool"
seo:
  title: "Integrate Evidently with ZenML - Data Validator Integrations"
  description: "Ensure data quality and guard against drift with Evidently profiling in ZenML"
  canonical: "https://www.zenml.io/integrations/evidently"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/b8f413a4/66e02ec6c735595e832d5d8b_image__3_.png"
  ogTitle: "Integrate Evidently with ZenML - Data Validator Integrations"
  ogDescription: "Ensure data quality and guard against drift with Evidently profiling in ZenML"
---

<ul><li>Seamless integration of Evidently data profiling and validation steps into ZenML pipelines</li><li>Automated data quality checks and data drift detection for improved ML reliability</li><li>Comprehensive model performance analysis and comparison within ZenML workflows</li><li>Easy configuration and customization of Evidently metrics and tests using ZenML utilities</li><li>Direct visualization of Evidently reports and test results in the ZenML dashboard</li></ul>

<ul><li>Comprehensive data quality analysis and reporting</li><li>Automated data drift and model drift detection</li><li>Flexible configuration of custom metrics and validation tests</li><li>Support for both classification and regression tasks</li><li>Detailed insights into feature behavior and distributions</li></ul>

```python
import pandas as pd

from zenml import pipeline, step

from typing_extensions import Tuple, Annotated

from zenml.artifacts.artifact_config import ArtifactConfig

import pandas as pd
from sklearn import datasets

@step
def data_loader() -> pd.DataFrame:
    """Load the OpenML women's e-commerce clothing reviews dataset."""
    reviews_data = datasets.fetch_openml(
        name="Womens-E-Commerce-Clothing-Reviews", version=2, as_frame="auto"
    )
    reviews = reviews_data.frame
    return reviews
    
@step
def data_splitter(
    reviews: pd.DataFrame,
) -> Tuple[Annotated[pd.DataFrame, ArtifactConfig(name="reference_dataset")], Annotated[pd.DataFrame, ArtifactConfig(name="comparison_dataset")]]:
    """Splits the dataset into two subsets, the reference dataset and the
    comparison dataset.
    """
    ref_df = reviews[reviews.Rating > 3].sample(
        n=5000, replace=True, ignore_index=True, random_state=42
    )
    comp_df = reviews[reviews.Rating < 3].sample(
        n=5000, replace=True, ignore_index=True, random_state=42
    )
    return ref_df, comp_df

from zenml.integrations.evidently.metrics import EvidentlyMetricConfig
from zenml.integrations.evidently.steps import (
    EvidentlyColumnMapping,
    evidently_report_step,
)

text_data_report = evidently_report_step.with_options(
    parameters=dict(
        column_mapping=EvidentlyColumnMapping(
            target="Rating",
            numerical_features=["Age", "Positive_Feedback_Count"],
            categorical_features=[
                "Division_Name",
                "Department_Name",
                "Class_Name",
            ],
            text_features=["Review_Text", "Title"],
        ),
        metrics=[
            EvidentlyMetricConfig.metric("DataQualityPreset"),
            EvidentlyMetricConfig.metric(
                "TextOverviewPreset", column_name="Review_Text"
            ),
            EvidentlyMetricConfig.metric_generator(
                "ColumnRegExpMetric",
                columns=["Review_Text", "Title"],
                reg_exp=r"[A-Z][A-Za-z0-9 ]*",
            ),
        ],
        # We need to download the NLTK data for the TextOverviewPreset
        download_nltk_data=True,
    ),
)

import json

@step
def text_analyzer(
    report: str,
) -> Tuple[Annotated[int, ArtifactConfig(name="missing_values_current")], Annotated[int, ArtifactConfig(name="missing_values_reference")]]:
    """Analyze the Evidently text Report and return the number of missing
    values in the reference and comparison datasets.
    """
    result = json.loads(report)["metrics"][0]["result"]
    return (
        result["current"]["number_of_missing_values"],
        result["reference"]["number_of_missing_values"],
    )

@pipeline(enable_cache=False)
def text_data_report_test_pipeline():
    """Links all the steps together in a pipeline."""
    data = data_loader()
    reference_dataset, comparison_dataset = data_splitter(data)
    report, _ = text_data_report(
        reference_dataset=reference_dataset,
        comparison_dataset=comparison_dataset,
    )
    text_analyzer(report)

if __name__ == "__main__":
    # Run the pipeline
    text_data_report_test_pipeline()
```
In the code above, Evidently is used within a ZenML pipeline to monitor and validate data quality and text data characteristics. The **EvidentlyColumnMapping** is configured to specify targets, numerical features, categorical features, and text features, helping Evidently understand the data structure. The **evidently_report_step** generates a report with various metrics, including **DataQualityPreset** for data quality overview, **TextOverviewPreset** for text data overview, and **ColumnRegExpMetric** to check for specific patterns in text columns. The **text_analyzer** step then analyzes this report to extract the number of missing values in the reference and comparison datasets. The pipeline links these steps, loading the data, splitting it into reference and comparison datasets, generating the Evidently report, and analyzing it for missing values. This setup integrates Evidently’s capabilities into a ZenML pipeline for comprehensive data validation.