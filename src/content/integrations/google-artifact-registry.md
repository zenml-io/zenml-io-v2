---
title: "Google Artifact Registry"
slug: "google-artifact-registry"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66e742974bf234c8f2c86f06"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-09-26T19:36:25.420Z"
  lastUpdated: "2024-09-26T19:36:25.420Z"
  createdOn: "2024-09-15T20:24:55.178Z"
integrationType: "container-registry"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/8badb0ed/66e7427b73f65bd26a9715f2_unnamed.png"
shortDescription: "Leverage Google’s Container Registry in ZenML Pipelines with Google Artifact Registry Integration"
docsUrl: "https://docs.zenml.io/stack-components/container-registries/gcp"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/c06a45da/66e741dd0314d43f576e7594_image__14_.png"
relatedBlogPosts:
  - "cloud-composer-airflow-vs-vertex-ai-kubeflow"
  - "building-scalable-forecasting-solutions"
seo:
  title: "Integrate Google Artifact Registry with ZenML - Container Registry Integrations"
  description: "Leverage Google’s Container Registry in ZenML Pipelines with Google Artifact Registry Integration"
  canonical: "https://www.zenml.io/integrations/google-artifact-registry"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/c06a45da/66e741dd0314d43f576e7594_image__14_.png"
  ogTitle: "Integrate Google Artifact Registry with ZenML - Container Registry Integrations"
  ogDescription: "Leverage Google’s Container Registry in ZenML Pipelines with Google Artifact Registry Integration"
overviewTitle: "Leverage Google’s Container Registry in ZenML Pipelines with Google Artifact Registry Integration"
overviewDescription: "Seamlessly integrate the Google Artifact Registry with ZenML. Store, manage, and deploy containerized components within your ML pipelines, leveraging the scalability and reliability of Google Cloud Platform without exposing the complexity to your data scientists."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\">Seamless integration of Google Artifact Registry as a container registry in ZenML stacks</li><li id=\"\">Effortless storage and retrieval of containerized pipeline environments</li><li id=\"\">Scalable and reliable container management backed by Google Cloud infrastructure</li><li id=\"\">Streamlined deployment of ML pipelines with versioned container images</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Centralized container image storage and management</li><li id=\"\">No local credentials necessary</li><li id=\"\">Secure access control and permissions management</li><li id=\"\">Automatic versioning and rebuilding of step docker images where necessary</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-bash\">\n# Step 1: Install all required gcp packaes \nzenml integration install gcp\n\n# Step 2: Register the GCP container registry\nzenml container-registry register gcp_registry \\\n  --flavor=gcp \\\n  --uri=\"&lt;YOUR URI>\"\n\n# Step 3: Update your stack to use the selected container registry\n# Make sure your stack already contains a remote artifact store\n# and orchestrator\nzenml stack update -c gcp_registry\n\n# Step 4: Set up authentication (choose one method)\nzenml container-registry connect gcp_registry -i\n\n# Step 5: Validate that your stack has a remote orchestrator in it\n# Not all orchestrators require a built image, so in order to use the\n# container registry you would need a remote orchestrator/step operator\n# used in your stack\nzenml stack describe\n</code></pre></div><div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-python\">\nfrom zenml import pipeline, step\n\n@step\ndef example_step():\n    print(\"This step will be containerized and pushed to GCP container registry\")\n\n@pipeline\ndef my_pipeline():\n    example_step()\n\nif __name__ == \"__main__\":\n    my_pipeline()\n    </code></pre></div>"
documentationLinkText: "Google Artifact Registry Documentation"
additionalResources:
  - label: "Using Artifact Registry with Google Cloud"
    href: "https://docs.zenml.io/how-to/popular-integrations/gcp-guide"
isUpdatedToNewFormat: true
---

<ul><li>Seamless integration of Google Artifact Registry as a container registry in ZenML stacks</li><li>Effortless storage and retrieval of containerized pipeline environments</li><li>Scalable and reliable container management backed by Google Cloud infrastructure</li><li>Streamlined deployment of ML pipelines with versioned container images</li></ul>

<ul><li>Centralized container image storage and management</li><li>No local credentials necessary</li><li>Secure access control and permissions management</li><li>Automatic versioning and rebuilding of step docker images where necessary</li></ul>

```bash
# Step 1: Install all required gcp packaes 
zenml integration install gcp

# Step 2: Register the GCP container registry
zenml container-registry register gcp_registry \
  --flavor=gcp \
  --uri="<YOUR URI>"

# Step 3: Update your stack to use the selected container registry
# Make sure your stack already contains a remote artifact store
# and orchestrator
zenml stack update -c gcp_registry

# Step 4: Set up authentication (choose one method)
zenml container-registry connect gcp_registry -i

# Step 5: Validate that your stack has a remote orchestrator in it
# Not all orchestrators require a built image, so in order to use the
# container registry you would need a remote orchestrator/step operator
# used in your stack
zenml stack describe
```

```python
from zenml import pipeline, step

@step
def example_step():
    print("This step will be containerized and pushed to GCP container registry")

@pipeline
def my_pipeline():
    example_step()

if __name__ == "__main__":
    my_pipeline()
    
```
This code example demonstrates how to integrate Google Artifact Registry with ZenML:

<ol><li>Install the GCP integration</li><li>Register the Google Artifact Registry with the URI</li><li>Update the ZenML stack to use the registered container registry</li><li>Set up authentication using one of the available methods</li><li>Define a step and pipeline that will use the Google Artifact Registry for containerized components</li></ol>

When the pipeline is run, the step will be containerized and the image will be pushed to the specified Google Artifact Registry, enabling seamless integration with the GCP ecosystem.

