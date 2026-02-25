---
title: "Label Studio"
slug: "labelstudio"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527effbce96c5557fa89d64"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-09-20T07:38:27.542Z"
  lastUpdated: "2024-09-20T07:38:27.542Z"
  createdOn: "2023-10-12T13:09:15.899Z"
integrationType: "data-annotator"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/a3a3cd0e/66d867d15dd7dff0bd9fbe50_label-studio.png"
shortDescription: "Streamline Data Annotation in ZenML Pipelines with Label Studio"
docsUrl: "https://docs.zenml.io/stack-components/annotators/label-studio"
githubUrl: "https://github.com/zenml-io/zenml-projects/tree/main/end-to-end-computer-vision"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/82697994/66e7484f2d8394657bfcd53f_labelstudio_integration.png"
seo:
  title: "Integrate Label Studio with ZenML - Data Annotator Integrations"
  description: "Streamline Data Annotation in ZenML Pipelines with Label Studio"
  canonical: "https://www.zenml.io/integrations/labelstudio"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/82697994/66e7484f2d8394657bfcd53f_labelstudio_integration.png"
  ogTitle: "Integrate Label Studio with ZenML - Data Annotator Integrations"
  ogDescription: "Streamline Data Annotation in ZenML Pipelines with Label Studio"
overviewTitle: "Streamline Data Annotation in ZenML Pipelines with Label Studio"
overviewDescription: "Integrate Label Studio, a leading open-source annotation platform, with ZenML to seamlessly incorporate data annotation into your ML workflows. This integration enables efficient labeling of diverse data types, including images, audio, text, and time series, directly within ZenML pipelines."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\">Seamless integration of data annotation steps into ZenML pipelines</li><li id=\"\">Support for various annotation types (image, audio, text, time series)</li><li id=\"\">Automated dataset registration and syncing with Label Studio</li><li id=\"\">Easy access to annotated data for downstream pipeline steps</li><li id=\"\">Seamless integration with ZenML’s cloud artifact stores (AWS, Azure, GCP)</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Supports a wide range of annotation types and use cases</li><li id=\"\">User-friendly web interface for efficient data labeling</li><li id=\"\">Customizable label configurations for project-specific requirements</li><li id=\"\">Collaborative annotation with multiple users and roles</li><li id=\"\">Export annotations in standard formats for further analysis</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">\n# Setup Label Studio integration\n# 1. Create a secret with your Label Studio API key:\n#    zenml secret create label_studio_secrets --api_key=\"&lt;your_label_studio_api_key>\"\n\n# 2. Register the Label Studio annotator:\n#    zenml annotator register label_studio --flavor label_studio --authentication_secret=\"label_studio_secrets\"\n\n# 3. Update your stack with the Label Studio annotator:\n#    zenml stack update -an label_studio\n\nfrom zenml import pipeline, step\nfrom typing import Dict, Any\nfrom zenml.client import Client\n\n@step\ndef data_loader() -> Dict[str, Any]:\n    \"\"\"Load labeled data from the active annotator.\"\"\"\n    client = Client()\n    annotator = client.active_stack.annotator\n    return annotator.get_labeled_data(dataset_name=\"my_dataset\")\n\n@pipeline\ndef my_pipeline():\n    \"\"\"Define the pipeline using the data loader step.\"\"\"\n    data = data_loader()\n    # Process the labeled data here\n\nif __name__ == \"__main__\":\n    my_pipeline()\n\n# Additional CLI commands for working with Label Studio:\n# - List all datasets:\n#   zenml annotator dataset list\n# - Get statistics for a specific dataset:\n#   zenml annotator dataset stats &lt;dataset_id>\n</code></pre></div>"
documentationLinkText: "Label Studio Integration Documentation"
githubLinkText: "End-to-End Computer Vision Example with Label Studio"
additionalResources:
  - label: "Label Studio Official Documentation"
    href: "https://labelstud.io/guide/"
compareSlug: "zenml-vs-label-studio"
isUpdatedToNewFormat: true
---

<ul><li>Seamless integration of data annotation steps into ZenML pipelines</li><li>Support for various annotation types (image, audio, text, time series)</li><li>Automated dataset registration and syncing with Label Studio</li><li>Easy access to annotated data for downstream pipeline steps</li><li>Seamless integration with ZenML’s cloud artifact stores (AWS, Azure, GCP)</li></ul>

<ul><li>Supports a wide range of annotation types and use cases</li><li>User-friendly web interface for efficient data labeling</li><li>Customizable label configurations for project-specific requirements</li><li>Collaborative annotation with multiple users and roles</li><li>Export annotations in standard formats for further analysis</li></ul>

```python
# Setup Label Studio integration
# 1. Create a secret with your Label Studio API key:
#    zenml secret create label_studio_secrets --api_key="<your_label_studio_api_key>"

# 2. Register the Label Studio annotator:
#    zenml annotator register label_studio --flavor label_studio --authentication_secret="label_studio_secrets"

# 3. Update your stack with the Label Studio annotator:
#    zenml stack update -an label_studio

from zenml import pipeline, step
from typing import Dict, Any
from zenml.client import Client

@step
def data_loader() -> Dict[str, Any]:
    """Load labeled data from the active annotator."""
    client = Client()
    annotator = client.active_stack.annotator
    return annotator.get_labeled_data(dataset_name="my_dataset")

@pipeline
def my_pipeline():
    """Define the pipeline using the data loader step."""
    data = data_loader()
    # Process the labeled data here

if __name__ == "__main__":
    my_pipeline()

# Additional CLI commands for working with Label Studio:
# - List all datasets:
#   zenml annotator dataset list
# - Get statistics for a specific dataset:
#   zenml annotator dataset stats <dataset_id>
```
This code snippet demonstrates how to set up and use the Label Studio annotator integration with ZenML. It includes instructions for creating a secret with the Label Studio API key, registering the Label Studio annotator, and updating the ZenML stack with the annotator. The code defines a pipeline with a data_loader step that retrieves labeled data from the active annotator using the specified dataset name. The pipeline can then process the labeled data further. Additional CLI commands for working with Label Studio datasets are also provided.<figure class="w-richtext-figure-type-video w-richtext-align-fullwidth" style="padding-bottom:56.206088992974244%" data-rt-type="video" data-rt-align="fullwidth" data-rt-max-width="" data-rt-max-height="56.206088992974244%" data-rt-dimensions="854:480" data-page-url="https://www.youtube.com/watch?v=bLFGnoApWeU"><iframe allowFullScreen={true} frameBorder="0" scrolling="no" src="https://www.youtube.com/embed/bLFGnoApWeU" title=""></iframe></figure>