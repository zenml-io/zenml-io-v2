---
title: "LightGBM"
slug: "lightgbm"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8a8f9346497a5ed4edf"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-22T12:54:05.951Z"
  lastUpdated: "2024-10-14T07:27:59.819Z"
  createdOn: "2023-10-12T09:13:12.246Z"
integrationType: "modeling"
logo:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/a87bf467/66d869586acd2fac3976e2b4_lightgbm.png"
shortDescription: "Supercharge your ZenML pipelines with LightGBM's fast and efficient gradient boosting"
docsUrl: "https://docs.zenml.io/stacks-and-components/component-guide/model-trainers/lightgbm"
githubUrl: "https://github.com/zenml-io/zenml/tree/main/examples/lightgbm"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/ae087dce/6527cced38d4e13f4af3f15e_LightGBM.svg"
seo:
  title: "Integrate LightGBM with ZenML - Modeling Integrations"
  description: "Supercharge your ZenML pipelines with LightGBM's fast and efficient gradient boosting"
  canonical: "https://www.zenml.io/integrations/lightgbm"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/ae087dce/6527cced38d4e13f4af3f15e_LightGBM.svg"
  ogTitle: "Integrate LightGBM with ZenML - Modeling Integrations"
  ogDescription: "Supercharge your ZenML pipelines with LightGBM's fast and efficient gradient boosting"
---

<ul><li><strong>Seamless Integration</strong>: Effortlessly incorporate LightGBM into ZenML pipelines using dedicated steps and components.</li><li><strong>Optimized Model Training</strong>: Harness LightGBM's speed and efficiency to train high-quality models rapidly within ZenML workflows.</li><li><strong>Simplified Hyperparameter Tuning</strong>: Utilize ZenML's orchestration capabilities to streamline hyperparameter tuning for LightGBM models.</li><li><strong>Enhanced Reproducibility</strong>: Ensure reproducible experiments and model versioning by leveraging ZenML's tracking and management features.</li></ul>

<ul><li>Gradient Boosting Decision Tree (GBDT) algorithm for high-performance machine learning tasks</li><li>Distributed training for handling large datasets efficiently</li><li>Support for various learning objectives, including regression, classification, and ranking</li><li>Ability to handle categorical features directly without one-hot encoding</li><li>Built-in mechanisms for handling missing values and preventing overfitting</li></ul>

```python
from zenml import pipeline, step
from zenml.integrations.lightgbm.steps import lightgbm_trainer_step

@step
def load_data():
    # Load and preprocess the dataset
    train_data = ...
    test_data = ...
    return train_data, test_data

@pipeline
def lightgbm_pipeline():
    train_data, test_data = load_data()
    lightgbm_trainer_step(
        train_data=train_data,
        test_data=test_data,
        params={
            'objective': 'binary',
            'metric': 'auc',
            'num_leaves': 31,
            'learning_rate': 0.05,
            'feature_fraction': 0.9,
            'bagging_fraction': 0.8,
            'bagging_freq': 5,
            'verbose': 0
        }
    )

if __name__ == "__main__":
    # Run the pipeline
    lightgbm_pipeline()
```
The code example demonstrates how to create a ZenML pipeline that integrates LightGBM for model training. The load_data step loads and preprocesses the dataset. The lightgbm_trainer_step is used to train a LightGBM model with specified parameters. The pipeline is then executed, showcasing the seamless integration of LightGBM within the ZenML workflow.