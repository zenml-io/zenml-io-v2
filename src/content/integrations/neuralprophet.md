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
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/57ed57da/66d86825158860fcb2891449_neural-prophet.png"
shortDescription: "Enhance Time Series Forecasting with NeuralProphet and ZenML"
docsUrl: "https://github.com/zenml-io/zenml/tree/main/src/zenml/integrations/neural_prophet"
githubUrl: "https://github.com/ourownstory/neural_prophet"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/41904b7c/66e0299d19eef2b296480c6a_Screenshot_2024-09-04_at_10.33.51.png"
seo:
  title: "Integrate NeuralProphet with ZenML - Modeling Integrations"
  description: "Enhance Time Series Forecasting with NeuralProphet and ZenML"
  canonical: "https://www.zenml.io/integrations/neuralprophet"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/41904b7c/66e0299d19eef2b296480c6a_Screenshot_2024-09-04_at_10.33.51.png"
  ogTitle: "Integrate NeuralProphet with ZenML - Modeling Integrations"
  ogDescription: "Enhance Time Series Forecasting with NeuralProphet and ZenML"
overviewTitle: "Enhance Time Series Forecasting with NeuralProphet and ZenML"
overviewDescription: "Integrate NeuralProphet's powerful time series forecasting capabilities into your ZenML pipelines for seamless and efficient modeling of temporal data. This integration enables you to leverage NeuralProphet's state-of-the-art algorithms and intuitive API within the structured framework of ZenML, streamlining your time series modeling workflow."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Seamless Integration</strong>: Effortlessly incorporate NeuralProphet models into your ZenML pipelines, ensuring a smooth and unified workflow.</li><li id=\"\"><strong id=\"\">Reproducibility</strong>: Leverage ZenML's versioning and tracking capabilities to ensure reproducibility and traceability of your NeuralProphet models.</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Flexible time series modeling with support for trends, seasonality, and holidays</li><li id=\"\">Intuitive API for defining and training models</li><li id=\"\">Automatic hyperparameter tuning for optimized model performance</li><li id=\"\">Built-in model evaluation and visualization tools</li><li id=\"\">Ability to incorporate external regressors and custom loss functions</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">\nfrom zenml import pipeline, step\nimport pandas as pd\nfrom neuralprophet import NeuralProphet\n\n@step\ndef load_data() -> pd.DataFrame:\n    # Load your time series data here\n    data = pd.read_csv('time_series_data.csv')\n    return data\n\n@step\ndef trainer_step(data: pd.DataFrame) -> NeuralProphet:\n    model = NeuralProphet()\n    model.fit(data, freq=\"D\")\n    return model\n\n@pipeline\ndef time_series_pipeline():\n    data = load_data()\n    trainer_step(data)\n\n\nif __name__ == \"__main__\":\n    time_series_pipeline()\n</code></pre></div>"
documentationLinkText: "NeuralProphet Integration Source Code"
githubLinkText: "GitHub Repository: NeuralProphet"
isUpdatedToNewFormat: true
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

