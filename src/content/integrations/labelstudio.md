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
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/a3a3cd0e/66d867d15dd7dff0bd9fbe50_label-studio.png"
shortDescription: "Streamline Data Annotation in ZenML Pipelines with Label Studio"
docsUrl: "https://docs.zenml.io/stack-components/annotators/label-studio"
githubUrl: "https://github.com/zenml-io/zenml-projects/tree/main/end-to-end-computer-vision"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/82697994/66e7484f2d8394657bfcd53f_labelstudio_integration.png"
seo:
  title: "Integrate Label Studio with ZenML - Data Annotator Integrations"
  description: "Streamline Data Annotation in ZenML Pipelines with Label Studio"
  canonical: "https://www.zenml.io/integrations/labelstudio"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/82697994/66e7484f2d8394657bfcd53f_labelstudio_integration.png"
  ogTitle: "Integrate Label Studio with ZenML - Data Annotator Integrations"
  ogDescription: "Streamline Data Annotation in ZenML Pipelines with Label Studio"
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