---
title: "Pigeon"
slug: "pigeon"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66570ff80be6d9ebd5bf3840"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-09-24T10:03:55.708Z"
  lastUpdated: "2024-09-24T10:03:55.708Z"
  createdOn: "2024-05-29T11:22:32.415Z"
integrationType: "data-annotator"
logo:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/7bb9fa5c/66d867bc92fc1deb5ec3e4b8_pigeon.png"
shortDescription: "Streamline Data Annotation in Jupyter Notebooks with Pigeon and ZenML"
docsUrl: "https://docs.zenml.io/stack-components/annotators/pigeon"
githubUrl: "https://github.com/agermanidis/pigeon"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/163e5654/66e747284698690459556b8c_pigeon_integration.png"
seo:
  title: "Integrate Pigeon with ZenML - Data Annotator Integrations"
  description: "Streamline Data Annotation in Jupyter Notebooks with Pigeon and ZenML"
  canonical: "https://www.zenml.io/integrations/pigeon"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/163e5654/66e747284698690459556b8c_pigeon_integration.png"
  ogTitle: "Integrate Pigeon with ZenML - Data Annotator Integrations"
  ogDescription: "Streamline Data Annotation in Jupyter Notebooks with Pigeon and ZenML"
---

<ul><li><strong>Seamless Integration with Jupyter Notebooks<br /></strong>Annotate your data without leaving your familiar Jupyter notebook environment, ensuring a smooth workflow.</li><li><strong>Easy Setup and Configuration<br /></strong>Installing and registering the Pigeon annotator with ZenML is a straightforward process, requiring minimal effort.</li><li><strong>Efficient Data Management<br /></strong>Utilize ZenML's <code>annotator dataset</code> commands to easily list, delete, and retrieve statistics for your annotated datasets.</li><li><strong>Streamlined ML Workflows<br /></strong>Incorporate Pigeon annotations seamlessly into your ZenML pipelines, enabling efficient data labeling within your ML workflows.</li></ul>

<ul><li>Ultra-lightweight and open-source</li><li>Supports text classification, image classification, and text captioning</li><li>Intuitive interface for quick and easy labeling</li><li>Ideal for small to medium-sized datasets</li><li>Facilitates collaborative labeling within Jupyter notebooks</li></ul>

```python
from zenml.client import Client

annotator = Client().active_stack.annotator

annotations = annotator.launch(
    data=[
        'This movie was fantastic!',
        'I was disappointed by the ending of the book.'
    ],
    options=[
        'positive',
        'negative'
    ]
)
```

The code example demonstrates how to use the Pigeon annotator within a Jupyter notebook using ZenML. It launches the annotator with a list of text data and predefined label options. The annotator returns the labeled data as a list of tuples, each containing the text and its corresponding label.