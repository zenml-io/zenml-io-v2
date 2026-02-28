---
title: "WhyLabs whylogs"
slug: "whylogs"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8a933e758809377b2e8"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-09-25T07:41:31.685Z"
  lastUpdated: "2024-09-25T07:41:31.685Z"
  createdOn: "2023-10-12T09:13:13.788Z"
integrationType: "data-validator"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/4700d856/66d868f3b9571c825b718744_whylogs.png"
shortDescription: "Maintain data quality and detect drift with WhyLabs whylogs in ZenML pipelines"
docsUrl: "https://sdkdocs.zenml.io/0.65.0/integration_code_docs/integrations-whylogs/"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/cfe9e196/66dab4ef2b33e92c2eb200fc_whylogs_integration.png"
seo:
  title: "Integrate WhyLabs whylogs with ZenML - Data Validator Integrations"
  description: "Maintain data quality and detect drift with WhyLabs whylogs in ZenML pipelines"
  canonical: "https://www.zenml.io/integrations/whylogs"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/cfe9e196/66dab4ef2b33e92c2eb200fc_whylogs_integration.png"
  ogTitle: "Integrate WhyLabs whylogs with ZenML - Data Validator Integrations"
  ogDescription: "Maintain data quality and detect drift with WhyLabs whylogs in ZenML pipelines"
overviewTitle: "Maintain data quality and detect drift with WhyLabs whylogs in ZenML pipelines"
overviewDescription: "The WhyLabs whylogs integration with ZenML enables you to seamlessly integrate data and model profiling capabilities into your ML pipelines. By leveraging whylogs profiles, you can monitor data quality, detect data and model drift, and take automated corrective actions to ensure the reliability and performance of your models in production."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Seamless data profiling in ZenML pipelines<br>‍</strong>Easily generate whylogs data profiles directly within your ZenML pipeline steps for any pandas DataFrame.</li><li id=\"\"><strong id=\"\">Flexible integration options<br>‍</strong>Use the standard <code id=\"\">WhylogsProfilerStep</code>, custom steps with the <code id=\"\">WhylogsDataValidator</code>, or call the <code id=\"\">whylogs</code> library directly.</li><li id=\"\"><strong id=\"\">Automated data validation<br>‍</strong>Implement data quality checks and corrective actions based on the generated whylogs profiles.</li><li id=\"\"><strong id=\"\">Effortless visualization of profiles<br>‍</strong>View interactive whylogs profile visualizations directly in the ZenML dashboard or Jupyter notebooks.</li><li id=\"\"><strong id=\"\">Easy WhyLabs platform logging<br>‍</strong>Upload profiles to WhyLabs’ cloud platform for centralized tracking, analysis and documentation of data and models.</li></ul>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Statistical data profiling and summarization</li><li id=\"\">Data quality validation</li><li id=\"\">Data drift detection</li><li id=\"\">Model drift and performance degradation detection</li><li id=\"\">Support for tabular data in pandas DataFrames</li></ul>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\"># zenml integration install whylogs -y\n# zenml data-validator register whylogs_data_validator --flavor=whylogs\n# zenml stack register custom_stack -dv whylogs_data_validator -o default -a default --set\n\n\nfrom typing import Annotated,Tuple\nimport pandas as pd\nimport whylogs as why\nfrom sklearn import datasets\nfrom whylogs.core import DatasetProfileView\n\nfrom zenml.integrations.whylogs.flavors.whylogs_data_validator_flavor import (\n    WhylogsDataValidatorSettings,\n)\nfrom zenml import step, pipeline\n\n\n@step(\n    settings={\n        \"data_validator.whylogs\": WhylogsDataValidatorSettings(\n            enable_whylabs=True, dataset_id=\"model-1\"\n        )\n    }\n)\ndef data_loader() -> Tuple[\n    Annotated[pd.DataFrame, \"data\"],\n    Annotated[DatasetProfileView, \"profile\"]\n]:\n    \"\"\"Load the diabetes dataset.\"\"\"\n    X, y = datasets.load_diabetes(return_X_y=True, as_frame=True)\n\n    # merge X and y together\n    df = pd.merge(X, y, left_index=True, right_index=True)\n\n    profile = why.log(pandas=df).profile().view()\n    return df, profile\n\n@pipeline(enable_cache=False)\ndef my_pipeline():\n    data, profile = data_loader()\n    #... do something with the data\n\nif __name__ == \"__main__\":\n    my_pipeline()</code></pre></div>"
documentationLinkText: "Whylogs integration SDK docs"
additionalResources:
  - label: "WhyLabs whylogs Documentation"
    href: "https://whylogs.readthedocs.io/"
isUpdatedToNewFormat: true
---

<ul><li><strong>Seamless data profiling in ZenML pipelines<br /></strong>Easily generate whylogs data profiles directly within your ZenML pipeline steps for any pandas DataFrame.</li><li><strong>Flexible integration options<br /></strong>Use the standard <code>WhylogsProfilerStep</code>, custom steps with the <code>WhylogsDataValidator</code>, or call the <code>whylogs</code> library directly.</li><li><strong>Automated data validation<br /></strong>Implement data quality checks and corrective actions based on the generated whylogs profiles.</li><li><strong>Effortless visualization of profiles<br /></strong>View interactive whylogs profile visualizations directly in the ZenML dashboard or Jupyter notebooks.</li><li><strong>Easy WhyLabs platform logging<br /></strong>Upload profiles to WhyLabs’ cloud platform for centralized tracking, analysis and documentation of data and models.</li></ul><ul><li>Statistical data profiling and summarization</li><li>Data quality validation</li><li>Data drift detection</li><li>Model drift and performance degradation detection</li><li>Support for tabular data in pandas DataFrames</li></ul>
```python
# zenml integration install whylogs -y
# zenml data-validator register whylogs_data_validator --flavor=whylogs
# zenml stack register custom_stack -dv whylogs_data_validator -o default -a default --set

from typing import Annotated,Tuple
import pandas as pd
import whylogs as why
from sklearn import datasets
from whylogs.core import DatasetProfileView

from zenml.integrations.whylogs.flavors.whylogs_data_validator_flavor import (
    WhylogsDataValidatorSettings,
)
from zenml import step, pipeline

@step(
    settings={
        "data_validator.whylogs": WhylogsDataValidatorSettings(
            enable_whylabs=True, dataset_id="model-1"
        )
    }
)
def data_loader() -> Tuple[
    Annotated[pd.DataFrame, "data"],
    Annotated[DatasetProfileView, "profile"]
]:
    """Load the diabetes dataset."""
    X, y = datasets.load_diabetes(return_X_y=True, as_frame=True)

    # merge X and y together
    df = pd.merge(X, y, left_index=True, right_index=True)

    profile = why.log(pandas=df).profile().view()
    return df, profile

@pipeline(enable_cache=False)
def my_pipeline():
    data, profile = data_loader()
    #... do something with the data

if __name__ == "__main__":
    my_pipeline()
```
This code snippet demonstrates the integration of WhyLogs, a data profiling and validation library, with ZenML, a machine learning pipeline framework. It defines a data_loader step that loads the diabetes dataset using scikit-learn, merges the features (X) and target (y) into a single DataFrame, and generates a WhyLogs profile of the data. The data_loader step is annotated with WhyLogs settings to enable WhyLabs integration and specify a dataset ID. The code then defines a pipeline called my_pipeline that includes the data_loader step and can be extended to perform further operations on the data. Finally, the if __name__ == "__main__": block ensures that the pipeline is executed when the script is run directly.<figure class="w-richtext-figure-type-video w-richtext-align-fullwidth" style="padding-bottom:56.206088992974244%" data-rt-type="video" data-rt-align="fullwidth" data-rt-max-width="" data-rt-max-height="56.206088992974244%" data-rt-dimensions="854:480" data-page-url="https://www.youtube.com/watch?v=kSPclhhIlfI"><iframe allowFullScreen={true} frameBorder="0" scrolling="no" src="https://www.youtube.com/embed/kSPclhhIlfI" title="Model Serving &amp; Monitoring with BentoML + WhyLabs"></iframe></figure>