---
title: "Google Cloud Storage (GCS)"
slug: "google-cloud-storage"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66d871c150920c0ed909d966"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-09-26T19:36:45.576Z"
  lastUpdated: "2024-09-26T19:36:45.576Z"
  createdOn: "2024-09-04T14:42:09.657Z"
integrationType: "artifact-store"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/8c3c56cb/66d870a806cf369e1b62ffe4_google_cloud_storage.png"
shortDescription: "Seamlessly Store your pipeline step outputs with Google Cloud Storage (GCS)"
docsUrl: "https://docs.zenml.io/stack-components/artifact-stores/gcp"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/8b41365f/66d87125d06e345b0cab8209_gcs_integration.png"
relatedBlogPosts:
  - "cloud-composer-airflow-vs-vertex-ai-kubeflow"
  - "building-scalable-forecasting-solutions"
  - "easy-mlops-pipelines"
seo:
  title: "Integrate Google Cloud Storage (GCS) with ZenML - Artifact Store Integrations"
  description: "Seamlessly Store your pipeline step outputs with Google Cloud Storage (GCS)"
  canonical: "https://www.zenml.io/integrations/google-cloud-storage"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/8b41365f/66d87125d06e345b0cab8209_gcs_integration.png"
  ogTitle: "Integrate Google Cloud Storage (GCS) with ZenML - Artifact Store Integrations"
  ogDescription: "Seamlessly Store your pipeline step outputs with Google Cloud Storage (GCS)"
overviewTitle: "Seamlessly Store your pipeline step outputs with Google Cloud Storage (GCS)"
overviewDescription: "Integrate Google Cloud Storage (GCS) with ZenML to leverage a scalable and reliable artifact store for your ML workflows. This integration enables you to store and share pipeline artifacts, making it ideal for collaboration, remote execution, and production-grade MLOps."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\">Seamlessly store and retrieve ZenML pipeline artifacts using GCS.</li><li id=\"\">Share artifacts across teams and enable remote pipeline execution.</li><li id=\"\">Scale storage effortlessly to handle production-grade ML workflows.</li><li id=\"\">Ensure secure access to artifacts with GCP authentication methods.</li><li id=\"\">Easily integrate GCS with other ZenML stack components.</li></ul>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Scalable and durable object storage for any amount of data</li><li id=\"\">Highly available and performant storage infrastructure</li><li id=\"\">Secure access control and encryption for data protection</li><li id=\"\">Seamless integration with other GCP services and tools</li><li id=\"\">Cost-effective storage with flexible pricing options</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\">zenml integration install gcp\nzenml stack set ...</code></pre></div><div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">from typing_extensions import Annotated\n\nfrom zenml import pipeline, step\nfrom zenml.client import Client\n\n@step\ndef my_step(input_dict: dict) -> Annotated[dict, \"dict_from_aws_cloud_storage\"]:\n    output_dict = input_dict.copy()\n    output_dict[\"message\"] = \"Store this in cloud storage\"\n    return output_dict\n\n@pipeline\ndef my_pipeline(input_dict: dict):\n    my_step(input_dict)\n\nif __name__ == \"__main__\":\n    input_data = {\"key\": \"value\"}\n    my_pipeline(input_data)\n\n		# access the remote file from local code\n		data = Client().get_artifact_version(name_id_or_prefix=\"dict_from_aws_cloud_storage\").load()\n		\n    print(\n        \"The artifact value you saved in the `my_pipeline` run is:\\n \"\n        f\"{data}\"\n    )</code></pre></div>"
documentationLinkText: "ZenML GCS Artifact Store Documentation"
additionalResources:
  - label: "Using Artifact Registry with Google Cloud"
    href: "https://docs.zenml.io/how-to/popular-integrations/gcp-guide"
isUpdatedToNewFormat: true
---

<ul><li>Seamlessly store and retrieve ZenML pipeline artifacts using GCS.</li><li>Share artifacts across teams and enable remote pipeline execution.</li><li>Scale storage effortlessly to handle production-grade ML workflows.</li><li>Ensure secure access to artifacts with GCP authentication methods.</li><li>Easily integrate GCS with other ZenML stack components.</li></ul><ul><li>Scalable and durable object storage for any amount of data</li><li>Highly available and performant storage infrastructure</li><li>Secure access control and encryption for data protection</li><li>Seamless integration with other GCP services and tools</li><li>Cost-effective storage with flexible pricing options</li></ul>

```
zenml integration install gcp
zenml stack set ...
```

```python
from typing_extensions import Annotated

from zenml import pipeline, step
from zenml.client import Client

@step
def my_step(input_dict: dict) -> Annotated[dict, "dict_from_aws_cloud_storage"]:
    output_dict = input_dict.copy()
    output_dict["message"] = "Store this in cloud storage"
    return output_dict

@pipeline
def my_pipeline(input_dict: dict):
    my_step(input_dict)

if __name__ == "__main__":
    input_data = {"key": "value"}
    my_pipeline(input_data)

        # access the remote file from local code
        data = Client().get_artifact_version(name_id_or_prefix="dict_from_aws_cloud_storage").load()
        
    print(
        "The artifact value you saved in the `my_pipeline` run is:\n "
        f"{data}"
    )
```
The example demonstrates how to create and register a GCP stack in ZenML through the dashboard. The registered ZenML stack contains a GCS Artifact Store. This enables seamless storage and retrieval of pipeline artifacts using Google Cloud Storage. For this the stack is set as the active stack. The example python code then implicitely uses the configured Cloud Storage as backend.