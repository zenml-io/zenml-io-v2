---
title: "Microsoft Azure"
slug: "azure"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8ac100b7faa4f49cf58"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-22T12:54:05.951Z"
  lastUpdated: "2024-10-15T11:07:45.689Z"
  createdOn: "2023-10-12T09:13:16.079Z"
integrationType: "cloud-infrastructure"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/0b467777/6527ce2024e7fba068681cae_azure.svg"
shortDescription: "Seamlessly Orchestrate ML Pipelines on Azure with ZenML"
docsUrl: "https://docs.zenml.io/how-to/popular-integrations/azure-guide"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/ae821537/66e03182a8f04e71e997f5b5_azure_stack.PNG.png"
seo:
  title: "Integrate Microsoft Azure with ZenML - Cloud Infrastructure Integrations"
  description: "Seamlessly Orchestrate ML Pipelines on Azure with ZenML"
  canonical: "https://www.zenml.io/integrations/azure"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/ae821537/66e03182a8f04e71e997f5b5_azure_stack.PNG.png"
  ogTitle: "Integrate Microsoft Azure with ZenML - Cloud Infrastructure Integrations"
  ogDescription: "Seamlessly Orchestrate ML Pipelines on Azure with ZenML"
overviewTitle: "Seamlessly Orchestrate ML Pipelines on Azure with ZenML"
overviewDescription: "Integrate the power of Microsoft Azure with ZenML to effortlessly orchestrate and manage your machine learning pipelines in the cloud. This integration allows you to leverage Azure's scalable infrastructure and comprehensive ML services while benefiting from ZenML's streamlined workflow management capabilities."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\">Seamless deployment of ZenML pipelines on Azure infrastructure</li><li id=\"\">Scalable compute resources for efficient model training and inference</li><li id=\"\">Enable collaboration by sharing artifacts across teams and stakeholders</li><li id=\"\">Flexible orchestrator settings for serverless, compute instance or compute cluster modes</li><li id=\"\">Secure access to artifacts using Azure authentication methods</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Comprehensive cloud-based environment for the entire ML lifecycle</li><li id=\"\">Scalable compute resources and managed services for ML workloads</li><li id=\"\">Visual interface for monitoring and managing ML experiments and models</li><li id=\"\">Seamless integration with other Azure services and tools</li><li id=\"\">Enterprise-grade security and compliance features</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">\n# Register a ZenML Azure stack by using existing infrastructure\n# zenml stack register &lt;STACK_NAME> -p azure\n\n# OR, create a ZenML Azure stack by deploying new infrastructure\n# zenml stack deploy -p azure\n\nfrom zenml import pipeline, step\n\n\n@step\ndef hello_world() -> str:\n    return \"Hello World!\"\n\n\n@pipeline\ndef my_pipeline():\n    _ = hello_world()\n\n\nif __name__ == \"__main__\":\n    my_pipeline()\n    </code></pre></div>"
documentationLinkText: "Read a detailed Azure guide on how to establish a ZenML Azure stack and execute your pipelines"
additionalResources:
  - label: "Deploy an Azure stack using the 1-click deployment tool"
    href: "https://docs.zenml.io/how-to/stack-deployment/deploy-a-cloud-stack"
  - label: "Register an Azure stack using the stack wizard"
    href: "https://docs.zenml.io/how-to/stack-deployment/register-a-cloud-stack"
isUpdatedToNewFormat: true
---

<ul><li>Seamless deployment of ZenML pipelines on Azure infrastructure</li><li>Scalable compute resources for efficient model training and inference</li><li>Enable collaboration by sharing artifacts across teams and stakeholders</li><li>Flexible orchestrator settings for serverless, compute instance or compute cluster modes</li><li>Secure access to artifacts using Azure authentication methods</li></ul>

<ul><li>Comprehensive cloud-based environment for the entire ML lifecycle</li><li>Scalable compute resources and managed services for ML workloads</li><li>Visual interface for monitoring and managing ML experiments and models</li><li>Seamless integration with other Azure services and tools</li><li>Enterprise-grade security and compliance features</li></ul>

```python
# Register a ZenML Azure stack by using existing infrastructure
# zenml stack register <STACK_NAME> -p azure

# OR, create a ZenML Azure stack by deploying new infrastructure
# zenml stack deploy -p azure

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
The code example demonstrates how to register an Azure stack with ZenML:

<ol><li>Use the CLI to register a stack using either by using existing infrastructure or by deploying it anew</li><li>Use the <code>@step</code> and <code>@pipeline</code> decorators to define a pipeline and run it on your new Azure stack.</li></ol>

