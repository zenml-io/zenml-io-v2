---
title: "Prodigy"
slug: "prodigy"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66570f40a01e58e6cca21d77"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-22T12:54:05.951Z"
  lastUpdated: "2024-10-15T10:49:24.499Z"
  createdOn: "2024-05-29T11:19:28.557Z"
integrationType: "data-annotator"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/28d36c77/66d867c72a6cc880ff3bea62_explosion.png"
shortDescription: "Streamline Data Annotation with Prodigy and ZenML"
docsUrl: "https://docs.zenml.io/stack-components/annotators/prodigy"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/fa505287/66570ec4c81ad89f310d6969_Prodigy_0.58.0_Image__1_.png"
seo:
  title: "Integrate Prodigy with ZenML - Data Annotator Integrations"
  description: "Streamline Data Annotation with Prodigy and ZenML"
  canonical: "https://www.zenml.io/integrations/prodigy"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/fa505287/66570ec4c81ad89f310d6969_Prodigy_0.58.0_Image__1_.png"
  ogTitle: "Integrate Prodigy with ZenML - Data Annotator Integrations"
  ogDescription: "Streamline Data Annotation with Prodigy and ZenML"
overviewTitle: "Streamline Data Annotation with Prodigy and ZenML"
overviewDescription: "Enhance your machine learning workflows by integrating Prodigy, a modern annotation tool, with ZenML. This powerful combination enables efficient data labeling, data inspection, and error analysis, streamlining your ML pipeline and improving model performance."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Seamless Integration</strong>: <br>Easily incorporate Prodigy as a data annotation step within your ZenML pipelines.</li><li id=\"\"><strong id=\"\">Efficient Data Labeling</strong>: <br>Leverage Prodigy's intuitive and optimized interface for fast and accurate data annotation.</li><li id=\"\"><strong id=\"\">Flexible Workflow Customization</strong>: <br>Customize annotation workflows using Prodigy's pre-built components and ZenML's extensible architecture.</li><li id=\"\"><strong id=\"\">Streamlined Data Management</strong>: <br>Effortlessly manage datasets, annotations, and metadata within the ZenML framework.</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Intuitive and efficient web-based annotation interface</li><li id=\"\">Pre-built workflows for various annotation tasks</li><li id=\"\">Customizable scripts for data loading, saving, and annotation logic</li><li id=\"\">Extensible front-end with custom HTML and JavaScript support</li><li id=\"\">Optimized for fast and accurate data labeling</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\"># zenml annotator register prodigy --flavor prodigy\n# optionally also pass in --custom_config_path=\"&alt;PATH_TO_CUSTOM_CONFIG_FILE>\"\n# zenml stack register prodigy -o default -a default -an prodigy --set\n\n# wget https://raw.githubusercontent.com/explosion/prodigy-recipes/master/example-datasets/news_headlines.jsonl\n\n# Now annotate your data\n# zenml annotator dataset annotate your_dataset --command=\"textcat.manual news_topics ./news_headlines.jsonl --label Technology,Politics,Economy,Entertainment\"\n\n# access the data later on using Python in your pipelines\nfrom zenml import step\nfrom zenml.client import Client\n\n@step\ndef import_annotations() -> List[Dict[str, Any]]:\n    zenml_client = Client()\n    annotations = zenml_client.active_stack.annotator.get_labeled_data(dataset_name=\"your_dataset\")\n    # Do something with the annotations\n    return annotations\n    </code></pre></div>"
documentationLinkText: "ZenML Prodigy Integration Docs"
additionalResources:
  - label: "Prodigy Documentation"
    href: "https://prodi.gy/docs"
  - label: "Blog: How to annotate image data for object detection with Prodigy"
    href: "https://mlops.systems/posts/2021-11-29-prodigy-object-detection-training.html"
isUpdatedToNewFormat: true
---

<ul><li><strong>Seamless Integration</strong>: <br />Easily incorporate Prodigy as a data annotation step within your ZenML pipelines.</li><li><strong>Efficient Data Labeling</strong>: <br />Leverage Prodigy's intuitive and optimized interface for fast and accurate data annotation.</li><li><strong>Flexible Workflow Customization</strong>: <br />Customize annotation workflows using Prodigy's pre-built components and ZenML's extensible architecture.</li><li><strong>Streamlined Data Management</strong>: <br />Effortlessly manage datasets, annotations, and metadata within the ZenML framework.</li></ul>

<ul><li>Intuitive and efficient web-based annotation interface</li><li>Pre-built workflows for various annotation tasks</li><li>Customizable scripts for data loading, saving, and annotation logic</li><li>Extensible front-end with custom HTML and JavaScript support</li><li>Optimized for fast and accurate data labeling</li></ul>

```python
# zenml annotator register prodigy --flavor prodigy
# optionally also pass in --custom_config_path="&alt;PATH_TO_CUSTOM_CONFIG_FILE>"
# zenml stack register prodigy -o default -a default -an prodigy --set

# wget https://raw.githubusercontent.com/explosion/prodigy-recipes/master/example-datasets/news_headlines.jsonl

# Now annotate your data
# zenml annotator dataset annotate your_dataset --command="textcat.manual news_topics ./news_headlines.jsonl --label Technology,Politics,Economy,Entertainment"

# access the data later on using Python in your pipelines
from zenml import step
from zenml.client import Client

@step
def import_annotations() -> List[Dict[str, Any]]:
    zenml_client = Client()
    annotations = zenml_client.active_stack.annotator.get_labeled_data(dataset_name="your_dataset")
    # Do something with the annotations
    return annotations
    
```
This code snippet demonstrates how to import annotations from Prodigy within a ZenML step. It uses the ZenML client to access the active stack's annotator component and retrieves the labeled data for a specific dataset. The annotations can then be processed further in the pipeline.