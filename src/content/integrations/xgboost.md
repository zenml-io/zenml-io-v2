---
title: "XGBoost"
slug: "xgboost"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8a97be2a14ddfb6557f"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-09T08:52:08.455Z"
  lastUpdated: "2024-10-09T08:52:08.455Z"
  createdOn: "2023-10-12T09:13:13.041Z"
integrationType: "modeling"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/1736887d/66d8691e2943609aef09f8ee_xgboost.png"
shortDescription: "Supercharge your ML pipelines with XGBoost and ZenML"
docsUrl: "https://sdkdocs.zenml.io/latest/integration_code_docs/integrations-xgboost/"
githubUrl: "https://github.com/dmlc/xgboost"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/36f23444/66ed58cb5b64309d6f3c1a19_image__29_.png"
seo:
  title: "Integrate XGBoost with ZenML - Modeling Integrations"
  description: "Supercharge your ML pipelines with XGBoost and ZenML"
  canonical: "https://www.zenml.io/integrations/xgboost"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/36f23444/66ed58cb5b64309d6f3c1a19_image__29_.png"
  ogTitle: "Integrate XGBoost with ZenML - Modeling Integrations"
  ogDescription: "Supercharge your ML pipelines with XGBoost and ZenML"
---

<ul><li><strong>Seamless Integration</strong>: Effortlessly incorporate XGBoost into your ZenML pipelines, streamlining your model training process.</li><li><strong>Reproducibility</strong>: Ensure reproducible and traceable experiments by versioning your XGBoost models and pipelines with ZenML.</li></ul>

<ul><li>Gradient Boosting: XGBoost utilizes the gradient boosting framework for efficient and accurate predictions.</li><li>Regularization: Built-in L1 and L2 regularization techniques help prevent overfitting.</li><li>Parallel Processing: XGBoost supports parallel processing, enabling faster training on large datasets.</li><li>Handling Missing Values: XGBoost has built-in mechanisms to handle missing values automatically.</li><li>Tree Pruning: Advanced pruning techniques reduce model complexity and improve generalization.</li></ul>

```python
from zenml import pipeline, step
import xgboost as xgb

@step
def trainer(
    mat_train: xgb.DMatrix,
    ...
) -> xgb.Booster:
    """Trains a XGBoost model on the data."""
    params = {
        "max_depth": max_depth,
        "eta": eta,
        "objective": objective,
    }
    return xgb.train(params, mat_train, num_round)

@pipeline(enable_cache=True)
def xgboost_pipeline():
    """Links all the steps together in a pipeline."""
    mat_train, mat_test = data_loader()
    model = trainer(mat_train)
    predictor(model, mat_test)

if __name__ == "__main__":
    # Run the pipeline
    xgboost_pipeline()
```
This code example demonstrates a simple ZenML pipeline that integrates XGBoost for model training. The data_loader step returns a DMatrix object which ZenML stores in your artifact store and makes it available to the next step. The trainer step takes this object in and returns a trained model of type Booster. ZenML knows how to save these two types and automatically versions these artifacts based on your pipeline runs, thus enabling reproducibility and lineage for your XGBoost pipelines.