---
title: "Great Expectations"
slug: "great-expectations"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8a97fe4040c66f09012"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-11-06T08:42:05.099Z"
  lastUpdated: "2024-11-06T08:42:05.099Z"
  createdOn: "2023-10-12T09:13:13.923Z"
integrationType: "data-validator"
logo:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/88d6b213/672b2bda616f148555a240b5_great-expectations.png"
shortDescription: "Ensure Data Quality and Consistency in Your ML Pipelines with Great Expectations and ZenML"
docsUrl: "https://docs.zenml.io/stack-components/data-validators/great-expectations"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/34660601/6527c48a33e7588093872882_great_expectations_b3266e867a.webp"
seo:
  title: "Integrate Great Expectations with ZenML - Data Validator Integrations"
  description: "Ensure Data Quality and Consistency in Your ML Pipelines with Great Expectations and ZenML"
  canonical: "https://www.zenml.io/integrations/great-expectations"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/34660601/6527c48a33e7588093872882_great_expectations_b3266e867a.webp"
  ogTitle: "Integrate Great Expectations with ZenML - Data Validator Integrations"
  ogDescription: "Ensure Data Quality and Consistency in Your ML Pipelines with Great Expectations and ZenML"
---

<ul><li>Seamless integration of Great Expectations data validation within ZenML pipelines</li><li>Automated storage and versioning of Expectation Suites and Validation Results using ZenML's Artifact Store</li><li>Easy visualization of Great Expectations artifacts directly in the ZenML dashboard or Jupyter notebooks</li><li>Flexible deployment options for stores to leverage existing Great Expectations configurations or let ZenML manage the setup</li></ul>

<ul><li>Automated data profiling to generate validation rules (Expectations) based on dataset properties</li><li>Comprehensive data quality checks using predefined or inferred Expectations</li><li>Human-readable documentation of validation rules, quality checks, and results</li><li>Support for various data formats and sources, with ZenML currently supporting pandas DataFrames</li></ul>

```python
from zenml.integrations.great_expectations.steps.ge_validator import (
    great_expectations_validator_step,
)

ge_validator_step = great_expectations_validator_step.with_options(
    parameters={
        "expectations_list": [
            GreatExpectationExpectationConfig(
                expectation_name="expect_column_values_to_be_between",
                expectation_args={
                    "column": "X_Minimum",
                    "min_value": 0,
                    "max_value": 2000
                },
            ),
        ],
        "data_asset_name": "steel_plates_train_df",
    }
)

@pipeline(enable_cache=False, settings={"docker": docker_settings})
def validation_pipeline():
    imported_data = importer()
    train, test = splitter(imported_data)
    ge_validator_step(train)

validation_pipeline()
```
The code example demonstrates a simple ZenML pipeline that integrates Great Expectations for data validation. It starts by importing the great_expectations_validator_step step and defining a data importer step. We can specify our list of expectations using the GreatExpectationExpectationConfig class, where each expectation is defined through an expectation name and some expectation arguments like the column name. When you run the pipeline, the resulting artifacts are automatically stored and versioned using ZenML's Artifact Store. By default, the great validation stores for validation results and checkpoints are also configured to your active artifact store.