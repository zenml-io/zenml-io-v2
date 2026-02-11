---
title: "GitHub Container Registry"
slug: "github-container-registry"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66ed55b3ec2980b3a8a300f2"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-09-23T10:14:48.452Z"
  lastUpdated: "2024-09-23T10:13:50.881Z"
  createdOn: "2024-09-20T11:00:03.121Z"
integrationType: "container-registry"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/155b2955/66ed55a89d83ced32b398f65_6160c8171ad47563a5a862ae_github_packages.png"
shortDescription: "Streamline Container Image Management with GitHub Container Registry and ZenML"
docsUrl: "https://docs.zenml.io/stack-components/container-registries/github"
githubUrl: "https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/2a1f47c8/66ed54db9bb347d23672ec60_image__25_.png"
seo:
  title: "Integrate GitHub Container Registry with ZenML - Container Registry Integrations"
  description: "Streamline Container Image Management with GitHub Container Registry and ZenML"
  canonical: "https://www.zenml.io/integrations/github-container-registry"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/2a1f47c8/66ed54db9bb347d23672ec60_image__25_.png"
  ogTitle: "Integrate GitHub Container Registry with ZenML - Container Registry Integrations"
  ogDescription: "Streamline Container Image Management with GitHub Container Registry and ZenML"
---

<ul><li><strong>Streamlined Container Registry Setup<br /></strong>Quickly register and configure the GitHub Container Registry in ZenML with just a few CLI commands.</li><li><strong>Efficient Container Image Versioning<br /></strong>ZenML automatically tags and versions your container images, ensuring reproducibility and easy rollbacks.</li><li><strong>Effortless handling of credentials:</strong> <br />Using ZenML’s Service Connectors, you can register your credentials once and ZenML would automatically use them when needed without the end-user needing access to them.</li></ul>

<ul><li>Built-in container registry for GitHub repositories</li><li>Secure storage and distribution of Docker container images</li><li>Granular access control and permissions management</li><li>Seamless integration with GitHub Actions for automated workflows</li><li>Supports both public and private container images</li></ul>

```python
from zenml import pipeline, step

# Ensure you have the GitHub integration installed
# zenml integration install github -y

# Register the GitHub Container Registry
# zenml container-registry register github_registry \\
#     --flavor=github \\
#     --uri=ghcr.io/my-org

# Add the container registry to your active stack
# zenml stack update -c github_registry

@step
def my_containerized_step():
    print("This step runs in a container from GitHub registry")

@pipeline
def github_registry_pipeline():
    my_containerized_step()

if __name__ == "__main__":
    github_registry_pipeline()
```
The code example demonstrates how to register the GitHub Container Registry in ZenML, add it to the active stack, and use it to run a containerized step within a pipeline. The my_containerized_step will be executed inside a container image pulled from the specified GitHub Container Registry.