---
title: "Elastic Container Registry"
slug: "elastic-container-registry"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66e143a09bd6404b31f93c7f"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-11-06T08:48:55.847Z"
  lastUpdated: "2024-11-06T08:48:55.847Z"
  createdOn: "2024-09-11T07:15:44.277Z"
integrationType: "container-registry"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/c63dd028/672b2d75af6d63a749c8fac0_elastic_container_registry.png"
shortDescription: "Streamline container image management with AWS ECR and ZenML"
docsUrl: "https://docs.zenml.io/stack-components/container-registries/aws"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/26a5339b/66e141fc72ee3b06c3de0f80_Screenshot_2024-09-04_at_10.44.37.png"
relatedBlogPosts:
  - "easy-mlops-pipelines-2-stack-wizard"
  - "easy-mlops-pipelines"
seo:
  title: "Integrate Elastic Container Registry with ZenML - Container Registry Integrations"
  description: "Streamline container image management with AWS ECR and ZenML"
  canonical: "https://www.zenml.io/integrations/elastic-container-registry"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/26a5339b/66e141fc72ee3b06c3de0f80_Screenshot_2024-09-04_at_10.44.37.png"
  ogTitle: "Integrate Elastic Container Registry with ZenML - Container Registry Integrations"
  ogDescription: "Streamline container image management with AWS ECR and ZenML"
---

<ul><li>Seamless integration with ZenML pipelines</li><li>Efficient storage and retrieval of container images</li><li>Simplified authentication using AWS Service Connector</li><li>Scalable and reliable container registry for ML workflows</li><li>Optimized for use with AWS-based stack components</li></ul>

<ul><li>Secure and private container image storage</li><li>Fine-grained access control and permissions</li><li>High availability and durability</li><li>Integrates with other AWS services</li></ul>

```bash
# Step 1: Install the AWS integration
>>> zenml integration install aws

# Step 2: Register the AWS ECR container registry
>>> zenml container-registry register ecr_registry \
     --flavor=aws \
     --uri="<ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com"

# Step 3: Update your stack to use the new container registry
>>> zenml stack update -c ecr_registry

# Step 4: Set up authentication (choose one method)
# Method 1: Local Authentication
>>> aws ecr get-login-password --region <REGION> | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.<REGION>.amazonaws.com

# Method 2: AWS Service Connector (recommended)
>>> zenml container-registry connect ecr_registry -i

# Step 5: Validate that your stack has a remote orchestrator in it
# Not all orchestrators require a built image, so in order to use the
# container registry you would need a remote orchestrator/step operator
# used in your stack
>>> zenml stack describe
```

```python
from zenml import pipeline, step

@step
def example_step():
    print("This step will be containerized and pushed to ECR")

@pipeline
def my_pipeline():
    example_step()

if __name__ == "__main__":
    my_pipeline()
    
```
The code example demonstrates how to set up and use the AWS ECR container registry with ZenML. It includes the necessary steps to install the AWS integration, register the ECR container registry component, update the ZenML stack, and set up authentication. The example also shows a simple pipeline with a step that will be containerized and pushed to ECR.