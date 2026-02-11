---
title: "Azure Container Registry"
slug: "azure-container-registry"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66e13a2f59cc3bb7911aa945"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-22T12:54:05.951Z"
  lastUpdated: "2024-10-15T11:04:17.106Z"
  createdOn: "2024-09-11T06:35:27.978Z"
integrationType: "container-registry"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/17995d8c/66e13a26e684bf295214fe94_images.png"
shortDescription: "Seamlessly Store and Manage Container Images with Azure Container Registry Integration in ZenML"
docsUrl: "https://docs.zenml.io/stack-components/container-registries/azure"
githubUrl: "https://docs.zenml.io/how-to/popular-integrations/azure-guide"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/830681f9/66e1395395acb9f1c9e14722_azure_container_registry.PNG.png"
seo:
  title: "Integrate Azure Container Registry with ZenML - Container Registry Integrations"
  description: "Seamlessly Store and Manage Container Images with Azure Container Registry Integration in ZenML"
  canonical: "https://www.zenml.io/integrations/azure-container-registry"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/830681f9/66e1395395acb9f1c9e14722_azure_container_registry.PNG.png"
  ogTitle: "Integrate Azure Container Registry with ZenML - Container Registry Integrations"
  ogDescription: "Seamlessly Store and Manage Container Images with Azure Container Registry Integration in ZenML"
---

<ul><li>Seamless integration of Azure Container Registry within ZenML pipelines</li><li>Effortless storage and management of container images for ML components</li><li>Scalable and reliable container registry backed by Azure's cloud infrastructure</li><li>Integrate with other Azure-based stack components for end-to-end MLOps</li><li>Secure access and authentication using Azure credentials or service connectors</li></ul>

<ul><li>Fully-managed, private container registry for storing Docker and OCI images</li><li>High availability and geo-replication for global deployments</li><li>Integrated security features like role-based access control and network restrictions</li><li>Support for artifact signing and image vulnerability scanning</li><li>Comprehensive APIs and tooling for automation and CI/CD integration</li></ul>

```python
# 1. Install the ZenML `azure` integration
# zenml integration install azure

# 2. Register an Azure container registry using its URI
# zenml container-registry register <NAME> --flavor=azure --uri="<YOUR URI>"

# 3. Update your stack with your new container registry 
# zenml stack update -c <NAME>

from zenml import pipeline, step

@step
def hello_world() -> str:
    return "Hello World!"

@pipeline
def my_pipeline():
    _ = hello_world()

if __name__ == "__main__":
    my_pipeline()
    
```
The code example demonstrates how to set up and use Azure Container Registry with ZenML:

<ol><li>Install the Azure integration</li><li>Register a container registry with the Azure flavor</li><li>Update your active stack with your new container registry (You need a containerized remote orchestrator and a remote artifact store)</li><li>Use the <code>@step</code> and <code>@pipeline</code> decorators to define a pipeline. The orchestrator will use container images that are pushed to the Azure Container Registry when the pipeline is run.</li></ol>

