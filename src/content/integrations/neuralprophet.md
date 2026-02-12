---
title: "NeuralProphet"
slug: "neuralprophet"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8ab27236b7dc040ebe6"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-09T08:53:17.661Z"
  lastUpdated: "2024-10-09T08:53:17.661Z"
  createdOn: "2023-10-12T09:13:15.552Z"
integrationType: "modeling"
logo:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/57ed57da/66d86825158860fcb2891449_neural-prophet.png"
shortDescription: "Enhance Time Series Forecasting with NeuralProphet and ZenML"
docsUrl: "https://github.com/zenml-io/zenml/tree/main/src/zenml/integrations/neural_prophet"
githubUrl: "https://github.com/ourownstory/neural_prophet"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/41904b7c/66e0299d19eef2b296480c6a_Screenshot_2024-09-04_at_10.33.51.png"
seo:
  title: "Integrate NeuralProphet with ZenML - Modeling Integrations"
  description: "Enhance Time Series Forecasting with NeuralProphet and ZenML"
  canonical: "https://www.zenml.io/integrations/neuralprophet"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/41904b7c/66e0299d19eef2b296480c6a_Screenshot_2024-09-04_at_10.33.51.png"
  ogTitle: "Integrate NeuralProphet with ZenML - Modeling Integrations"
  ogDescription: "Enhance Time Series Forecasting with NeuralProphet and ZenML"
---

<ul><li><strong>Seamless Integration</strong>: Effortlessly incorporate NeuralProphet models into your ZenML pipelines, ensuring a smooth and unified workflow.</li><li><strong>Reproducibility</strong>: Leverage ZenML's versioning and tracking capabilities to ensure reproducibility and traceability of your NeuralProphet models.</li></ul>

<ul><li>Flexible time series modeling with support for trends, seasonality, and holidays</li><li>Intuitive API for defining and training models</li><li>Automatic hyperparameter tuning for optimized model performance</li><li>Built-in model evaluation and visualization tools</li><li>Ability to incorporate external regressors and custom loss functions</li></ul>

```python
from zenml import pipeline, step
import pandas as pd
from neuralprophet import NeuralProphet

@step
def load_data() -> pd.DataFrame:
    # Load your time series data here
    data = pd.read_csv('time_series_data.csv')
    return data

@step
def trainer_step(data: pd.DataFrame) -> NeuralProphet:
    model = NeuralProphet()
    model.fit(data, freq="D")
    return model

@pipeline
def time_series_pipeline():
    data = load_data()
    trainer_step(data)

if __name__ == "__main__":
    time_series_pipeline()
```
This code example demonstrates a simple ZenML pipeline that integrates NeuralProphet for time series forecasting. The pipeline consists of two steps:

<ol><li><code>load_data</code>: Loads the time series data from a CSV file.</li><li><code>train_model</code>: Trains a NeuralProphet model on the data.</li></ol>

