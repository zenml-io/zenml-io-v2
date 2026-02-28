---
title: "Deepchecks"
slug: "deepchecks"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8ac7a8eb1c405640636"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-07T06:36:19.612Z"
  lastUpdated: "2024-10-07T06:36:19.612Z"
  createdOn: "2023-10-12T09:13:16.443Z"
integrationType: "data-validator"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/544fdc24/66d867e77279ed98da4c637f_deepchecks.png"
shortDescription: "Automate robust data and model validation in your ML pipelines with Deepchecks and ZenML"
docsUrl: "https://docs.zenml.io/stack-components/data-validators/deepchecks"
githubUrl: "https://github.com/zenml-io/zenml/tree/main/examples/deepchecks"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/19463ec9/66e0303fc6916694d6ca6c99_image__4_.png"
seo:
  title: "Integrate Deepchecks with ZenML - Data Validator Integrations"
  description: "Automate robust data and model validation in your ML pipelines with Deepchecks and ZenML"
  canonical: "https://www.zenml.io/integrations/deepchecks"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/19463ec9/66e0303fc6916694d6ca6c99_image__4_.png"
  ogTitle: "Integrate Deepchecks with ZenML - Data Validator Integrations"
  ogDescription: "Automate robust data and model validation in your ML pipelines with Deepchecks and ZenML"
overviewTitle: "Automate robust data and model validation in your ML pipelines with Deepchecks and ZenML"
overviewDescription: "The Deepchecks integration enables you to seamlessly incorporate comprehensive data integrity, data drift, model drift and model performance checks into your ZenML pipelines. By leveraging Deepchecks' extensive library of pre-configured tests, you can easily validate the quality and reliability of the datasets and models used in your ML workflows, ensuring more robust and production-ready pipelines."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\">Seamlessly integrate Deepchecks tests into ZenML pipelines using pre-built steps</li><li id=\"\">Automatically validate data integrity, detect data drift, evaluate models and compare model performance</li><li id=\"\">Visualize interactive test results and reports directly in ZenML artifacts and dashboard</li><li id=\"\">Implement test result based branching and error handling for more robust pipelines</li><li id=\"\">Switch between different levels of integration to maximize flexibility</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Extensive library of pre-configured data validation and model evaluation tests</li><li id=\"\">Supports both tabular data and computer vision use cases</li><li id=\"\">Smart defaults allow running test suites with minimal configuration</li><li id=\"\">Fully customizable test conditions and validation logic</li><li id=\"\">Generates interactive visual reports for easier analysis and sharing</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">\nimport pandas as pd\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.base import ClassifierMixin\nfrom sklearn.ensemble import RandomForestClassifier\n\nfrom zenml import pipeline, step\nfrom zenml.integrations.constants import DEEPCHECKS, SKLEARN\n\nfrom deepchecks.tabular.datasets.classification import iris\nfrom typing_extensions import Tuple, Annotated\n\nfrom zenml.artifacts.artifact_config import ArtifactConfig\n\nLABEL_COL = \"target\"\n\n@step\ndef data_loader() -> Tuple[\n    Annotated[\n        pd.DataFrame, ArtifactConfig(name=\"reference_dataset\")\n    ],\n    Annotated[\n        pd.DataFrame,\n        ArtifactConfig(name=\"comparison_dataset\"),\n    ],\n]:\n    \"\"\"Load the iris dataset.\"\"\"\n    iris_df = iris.load_data(data_format=\"Dataframe\", as_train_test=False)\n    df_train, df_test = train_test_split(\n        iris_df, stratify=iris_df[LABEL_COL], random_state=0\n    )\n    return df_train, df_test\n\n@step\ndef trainer(df_train: pd.DataFrame) -> Annotated[ClassifierMixin, ArtifactConfig(name=\"model\")]:\n    # Train Model\n    rf_clf = RandomForestClassifier(random_state=0)\n    rf_clf.fit(df_train.drop(LABEL_COL, axis=1), df_train[LABEL_COL])\n    return rf_clf\n\nfrom zenml.integrations.deepchecks.steps import (\n    deepchecks_data_integrity_check_step,\n)\n\ndata_validator = deepchecks_data_integrity_check_step.with_options(\n    parameters=dict(\n        dataset_kwargs=dict(label=LABEL_COL, cat_features=[]),\n    ),\n)\n\nfrom zenml.integrations.deepchecks.steps import (\n    deepchecks_data_drift_check_step,\n)\n\ndata_drift_detector = deepchecks_data_drift_check_step.with_options(\n    parameters=dict(dataset_kwargs=dict(label=LABEL_COL, cat_features=[]))\n)\n\nfrom zenml.integrations.deepchecks.steps import (\n    deepchecks_model_validation_check_step,\n)\n\nmodel_validator = deepchecks_model_validation_check_step.with_options(\n    parameters=dict(\n        dataset_kwargs=dict(label=LABEL_COL, cat_features=[]),\n    ),\n)\n\nfrom zenml.integrations.deepchecks.steps import (\n    deepchecks_model_drift_check_step,\n)\n\nmodel_drift_detector = deepchecks_model_drift_check_step.with_options(\n    parameters=dict(\n        dataset_kwargs=dict(label=LABEL_COL, cat_features=[]),\n    ),\n)\n\nfrom zenml.config import DockerSettings\ndocker_settings = DockerSettings(required_integrations=[DEEPCHECKS, SKLEARN])\n\n@pipeline(enable_cache=True, settings={\"docker\": docker_settings})\ndef data_validation_pipeline():\n    \"\"\"Links all the steps together in a pipeline\"\"\"\n    df_train, df_test = data_loader()\n    data_validator(dataset=df_train)\n    data_drift_detector(\n        reference_dataset=df_train,\n        target_dataset=df_test,\n    )\n    model = trainer(df_train)\n    model_validator(dataset=df_train, model=model)\n    model_drift_detector(\n        reference_dataset=df_train, target_dataset=df_test, model=model\n    )\n\n\nif __name__ == \"__main__\":\n    # Run the pipeline\n    data_validation_pipeline()\n    \n    </code></pre></div>"
documentationLinkText: "Deepchecks Integration Docs"
githubLinkText: "Example: Data Validation Pipeline with Deepchecks"
additionalResources:
  - label: "Deepchecks Website"
    href: "https://deepchecks.com/"
isUpdatedToNewFormat: true
---

<ul><li>Seamlessly integrate Deepchecks tests into ZenML pipelines using pre-built steps</li><li>Automatically validate data integrity, detect data drift, evaluate models and compare model performance</li><li>Visualize interactive test results and reports directly in ZenML artifacts and dashboard</li><li>Implement test result based branching and error handling for more robust pipelines</li><li>Switch between different levels of integration to maximize flexibility</li></ul>

<ul><li>Extensive library of pre-configured data validation and model evaluation tests</li><li>Supports both tabular data and computer vision use cases</li><li>Smart defaults allow running test suites with minimal configuration</li><li>Fully customizable test conditions and validation logic</li><li>Generates interactive visual reports for easier analysis and sharing</li></ul>

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.base import ClassifierMixin
from sklearn.ensemble import RandomForestClassifier

from zenml import pipeline, step
from zenml.integrations.constants import DEEPCHECKS, SKLEARN

from deepchecks.tabular.datasets.classification import iris
from typing_extensions import Tuple, Annotated

from zenml.artifacts.artifact_config import ArtifactConfig

LABEL_COL = "target"

@step
def data_loader() -> Tuple[
    Annotated[
        pd.DataFrame, ArtifactConfig(name="reference_dataset")
    ],
    Annotated[
        pd.DataFrame,
        ArtifactConfig(name="comparison_dataset"),
    ],
]:
    """Load the iris dataset."""
    iris_df = iris.load_data(data_format="Dataframe", as_train_test=False)
    df_train, df_test = train_test_split(
        iris_df, stratify=iris_df[LABEL_COL], random_state=0
    )
    return df_train, df_test

@step
def trainer(df_train: pd.DataFrame) -> Annotated[ClassifierMixin, ArtifactConfig(name="model")]:
    # Train Model
    rf_clf = RandomForestClassifier(random_state=0)
    rf_clf.fit(df_train.drop(LABEL_COL, axis=1), df_train[LABEL_COL])
    return rf_clf

from zenml.integrations.deepchecks.steps import (
    deepchecks_data_integrity_check_step,
)

data_validator = deepchecks_data_integrity_check_step.with_options(
    parameters=dict(
        dataset_kwargs=dict(label=LABEL_COL, cat_features=[]),
    ),
)

from zenml.integrations.deepchecks.steps import (
    deepchecks_data_drift_check_step,
)

data_drift_detector = deepchecks_data_drift_check_step.with_options(
    parameters=dict(dataset_kwargs=dict(label=LABEL_COL, cat_features=[]))
)

from zenml.integrations.deepchecks.steps import (
    deepchecks_model_validation_check_step,
)

model_validator = deepchecks_model_validation_check_step.with_options(
    parameters=dict(
        dataset_kwargs=dict(label=LABEL_COL, cat_features=[]),
    ),
)

from zenml.integrations.deepchecks.steps import (
    deepchecks_model_drift_check_step,
)

model_drift_detector = deepchecks_model_drift_check_step.with_options(
    parameters=dict(
        dataset_kwargs=dict(label=LABEL_COL, cat_features=[]),
    ),
)

from zenml.config import DockerSettings
docker_settings = DockerSettings(required_integrations=[DEEPCHECKS, SKLEARN])

@pipeline(enable_cache=True, settings={"docker": docker_settings})
def data_validation_pipeline():
    """Links all the steps together in a pipeline"""
    df_train, df_test = data_loader()
    data_validator(dataset=df_train)
    data_drift_detector(
        reference_dataset=df_train,
        target_dataset=df_test,
    )
    model = trainer(df_train)
    model_validator(dataset=df_train, model=model)
    model_drift_detector(
        reference_dataset=df_train, target_dataset=df_test, model=model
    )

if __name__ == "__main__":
    # Run the pipeline
    data_validation_pipeline()
    
    
```
In the code above, Deepchecks is integrated with ZenML to perform various data validation and model validation checks. The **data_loader** step loads the Iris dataset and splits it into training and testing sets. The **trainer** step trains a RandomForestClassifier on the training data. The **deepchecks_data_integrity_check_step** is used to validate the integrity of the training data, while the **deepchecks_data_drift_check_step** detects any data drift between the training and testing datasets. The **deepchecks_model_validation_check_step** validates the trained model on the training data, and the **deepchecks_model_drift_check_step** checks for model drift between the training and testing datasets. These steps are linked together in a ZenML pipeline, which is configured to use Docker settings for the required integrations. This setup ensures comprehensive data and model validation using Deepchecks within a ZenML pipeline.