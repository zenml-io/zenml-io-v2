---
title: "MLflow"
slug: "mlflow"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8a93dc9a436e12459b9"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-08T12:31:37.262Z"
  lastUpdated: "2024-10-08T11:30:27.755Z"
  createdOn: "2023-10-12T09:13:13.001Z"
integrationType: "experiment-tracker"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/7e447a6a/66d8692949cd3b8bf2f4dcc6_mlflow.png"
shortDescription: "Seamlessly track and visualize ZenML pipeline experiments with MLflow"
docsUrl: "https://docs.zenml.io/stack-components/experiment-trackers/mlflow"
githubUrl: "https://github.com/zenml-io/zenml/blob/main/tests/integration/examples/mlflow/run.py"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/fcd451e4/6704f16f3a197dff1d594688_Integration_image__4_.png"
seo:
  title: "Integrate MLflow with ZenML - Experiment Tracker Integrations"
  description: "Seamlessly track and visualize ZenML pipeline experiments with MLflow"
  canonical: "https://www.zenml.io/integrations/mlflow"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/fcd451e4/6704f16f3a197dff1d594688_Integration_image__4_.png"
  ogTitle: "Integrate MLflow with ZenML - Experiment Tracker Integrations"
  ogDescription: "Seamlessly track and visualize ZenML pipeline experiments with MLflow"
---

<ul><li>Seamless integration of MLflow tracking within ZenML steps</li><li>Automatically link ZenML runs to MLflow experiments for easy navigation</li><li>Leverage MLflow's intuitive UI to visualize and compare pipeline results</li><li>Supports various MLflow deployment scenarios for flexibility</li><li>Secure configuration options using ZenML Secrets</li></ul>

<ul><li>Comprehensive experiment tracking and logging</li><li>Intuitive UI for visualizing and comparing runs</li><li>Support for a wide range of ML frameworks and languages</li><li>Flexible deployment options (local, remote server, Databricks)</li><li>Model registry for streamlined model versioning and deployment</li></ul>

```python
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.base import BaseEstimator
from sklearn.datasets import load_iris
from zenml import pipeline, step
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import mlflow

@step(experiment_tracker="mlflow_tracker")
def train_model() -> BaseEstimator:
    mlflow.autolog()
    iris = load_iris()
    X_train, X_test, y_train, y_test = train_test_split(
        iris.data, iris.target, test_size=0.2, random_state=42
    )
    model = RandomForestClassifier()
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    mlflow.log_param("n_estimators", model.n_estimators)
    mlflow.log_metric("train_accuracy", accuracy_score(y_test, y_pred))
    return model

@pipeline(enable_cache=False)
def training_pipeline():
    train_model()

training_pipeline()
```
This code snippet demonstrates how to use the MLflow experiment tracker within a ZenML pipeline step. The @step decorator is used to specify the MLflow tracker, and MLflow's autolog() captures relevant information automatically. Additional parameters and metrics are logged explicitly. The pipeline is then run with the tracking enabled, allowing results to be viewed in the MLflow UI.