---
title: "Azure Blob Storage"
slug: "azure-blob-storage"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66e13cfc323ff456460a6ca1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-07T06:35:19.390Z"
  lastUpdated: "2024-10-07T06:35:19.390Z"
  createdOn: "2024-09-11T06:47:24.368Z"
integrationType: "artifact-store"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/79d78fd5/66e13cf5daf0568ff1fd3d5e_download__1_.png"
shortDescription: "Efficiently Store and Share ZenML Artifacts with Azure Blob Storage"
docsUrl: "https://docs.zenml.io/stack-components/artifact-stores/azure"
githubUrl: "https://docs.zenml.io/how-to/popular-integrations/azure-guide"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/04d97fd2/66e13c84de6cdd3f8bac6caa_azure_blob_storage.PNG.png"
seo:
  title: "Integrate Azure Blob Storage with ZenML - Artifact Store Integrations"
  description: "Efficiently Store and Share ZenML Artifacts with Azure Blob Storage"
  canonical: "https://www.zenml.io/integrations/azure-blob-storage"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/04d97fd2/66e13c84de6cdd3f8bac6caa_azure_blob_storage.PNG.png"
  ogTitle: "Integrate Azure Blob Storage with ZenML - Artifact Store Integrations"
  ogDescription: "Efficiently Store and Share ZenML Artifacts with Azure Blob Storage"
---

<ul><li>Seamlessly store and retrieve pipeline artifacts in Azure Blob Storage</li><li>Enable collaboration by sharing artifacts across teams and stakeholders</li><li>Scale storage effortlessly to handle the growing demands of ML projects</li><li>Integrate with other Azure-based stack components for end-to-end MLOps</li><li>Secure access to artifacts using Azure authentication methods</li></ul>

<ul><li>Scalable and durable object storage for unstructured data</li><li>High availability and geo-redundancy options</li><li>Flexible access control and security features</li><li>Cost-effective storage for large-scale ML artifacts</li><li>Seamless integration with other Azure services</li></ul>

```python
# 1. Install the ZenML `azure` integration
# zenml integration install azure

# 2. Register an Azure artifact store
# zenml artifact-store register <NAME> --flavor azure --path=<PATH_TO_STORAGE>

# 3. Register a stack with the new artifact store
# zenml register stack <STACK_NAME> -a <NAME> -o default --set

from typing import Annotated

from zenml import pipeline, step
from zenml.client import Client

@step
def hello_world() -> Annotated[str, "my_first_artifact"]:
    return "Hello World!"

@pipeline
def my_pipeline():
    _ = hello_world()

if __name__ == "__main__":
    my_pipeline()

    # Fetch the artifact and print it
    print("Result: ", Client().get_artifact_version("my_first_artifact").load())
    
```
This code example demonstrates how to set up and use the Azure Blob Storage integration with ZenML:

<ol><li>Install the Azure integration</li><li>Register an Azure Artifact Store by using the path to your blob storage</li><li>Register a ZenML stack with the Azure Artifact Store</li><li>Use the <code>@step</code> and <code>@pipeline</code> decorators to define a pipeline to store artifacts in the Azure Artifact Store.</li></ol>

