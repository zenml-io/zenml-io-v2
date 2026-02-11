---
title: "Argilla"
slug: "argilla"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6657105d78625a6544f0b4d1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-09-25T07:42:22.593Z"
  lastUpdated: "2024-09-25T07:42:22.593Z"
  createdOn: "2024-05-29T11:24:13.856Z"
integrationType: "data-annotator"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/38135087/66d867abbb012c9b857c9b33_argilla.png"
shortDescription: "Streamline Data Annotation in ZenML Pipelines with Argilla"
docsUrl: "https://docs.zenml.io/stack-components/annotators/argilla"
githubUrl: "https://github.com/argilla-io/argilla"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/371e363f/66e74c4209220bebc2e991df_argilla_integration.png"
seo:
  title: "Integrate Argilla with ZenML - Data Annotator Integrations"
  description: "Streamline Data Annotation in ZenML Pipelines with Argilla"
  canonical: "https://www.zenml.io/integrations/argilla"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/371e363f/66e74c4209220bebc2e991df_argilla_integration.png"
  ogTitle: "Integrate Argilla with ZenML - Data Annotator Integrations"
  ogDescription: "Streamline Data Annotation in ZenML Pipelines with Argilla"
---

<ul><li>Seamless integration of Argilla's data annotation capabilities within ZenML pipelines</li><li>Support for local and deployed instances of Argilla, including Hugging Face Spaces</li><li>Access to annotated datasets and annotations through ZenML CLI and SDK</li><li>Efficient data curation and labeling for text data in ML workflows</li><li>Enhanced model performance through human feedback and expertise</li></ul>

<ul><li>Focus on specific use cases and human-in-the-loop approaches</li><li>Support for each step in the MLOps cycle, from data labeling to model monitoring</li><li>Faster data curation using both human and machine feedback</li><li>Designed to enhance the development of small and large language models (LLMs) and NLP tasks</li><li>Actively involves human experts in the tool-building process</li></ul>

```python
# register an annotator authentication secret first
# zenml secret create argilla_secrets --api_key="<your_argilla_api_key>"
# then register the annotator itself
# zenml annotator register argilla --flavor argilla --authentication_secret=argilla_secrets

from zenml.client import Client

client = Client()
annotator = client.active_stack.annotator

# list dataset names
dataset_names = annotator.get_dataset_names()

# get a specific dataset
dataset = annotator.get_dataset("dataset_name")

# get the annotations for a dataset
annotations = annotator.get_labeled_data(dataset_name="dataset_name")

# launch the annotation interface via the CLI
# zenml annotator dataset annotate <dataset_name>
```
The code example demonstrates how to use the ZenML Python SDK to interact with the Argilla annotator. It shows how to list dataset names, retrieve a specific dataset, and get the annotations for a dataset using the annotator object obtained from the active ZenML stack.<figure class="w-richtext-figure-type-video w-richtext-align-center" style="padding-bottom:33.723653395784545%" data-rt-type="video" data-rt-align="center" data-rt-max-width="" data-rt-max-height="33.723653395784545%" data-rt-dimensions="854:480" data-page-url="https://www.youtube.com/watch?v=-HhqLPK6S7I"><iframe allowFullScreen={true} frameBorder="0" scrolling="no" src="https://www.youtube.com/embed/-HhqLPK6S7I" title="Optimizing RAG Pipelines by fine-tuning custom embedding models on synthetic data with ZenML"></iframe></figure>