---
title: "Kaniko"
slug: "kaniko"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8ab284ee870b05fafb4"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-07T06:36:34.525Z"
  lastUpdated: "2024-10-07T06:36:34.525Z"
  createdOn: "2023-10-12T09:13:15.398Z"
integrationType: "image-builder"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/56435a28/66d8683157d8287eda0bbc84_kaniko.png"
shortDescription: "Build Container Images Effortlessly with Kaniko and ZenML"
docsUrl: "https://docs.zenml.io/stack-components/image-builders/kaniko"
githubUrl: "https://github.com/GoogleContainerTools/kaniko"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/9db69c0a/66e02b513d4f8dbbe140fad1_Screenshot_2024-09-04_at_10.16.07.png"
seo:
  title: "Integrate Kaniko with ZenML - Image Builder Integrations"
  description: "Build Container Images Effortlessly with Kaniko and ZenML"
  canonical: "https://www.zenml.io/integrations/kaniko"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/9db69c0a/66e02b513d4f8dbbe140fad1_Screenshot_2024-09-04_at_10.16.07.png"
  ogTitle: "Integrate Kaniko with ZenML - Image Builder Integrations"
  ogDescription: "Build Container Images Effortlessly with Kaniko and ZenML"
overviewTitle: "Build Container Images Effortlessly with Kaniko and ZenML"
overviewDescription: "Seamlessly integrate Kaniko, a powerful container image builder, with your ZenML pipelines. This integration allows you to build container images without relying on Docker, making it ideal for environments where Docker is not available or when you're already familiar with Kubernetes."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\">Eliminate the need for Docker on your client machine</li><li id=\"\">Seamlessly integrate with Kubernetes clusters for building images</li><li id=\"\">Customize build pod configurations to suit your specific requirements</li></ul><p>‍</p>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\">Dockerless container image building</li><li id=\"\">Native integration with Kubernetes</li><li id=\"\">Efficient layer caching for faster builds</li><li id=\"\">Extensible with additional build arguments and configurations</li></ul><p>‍</p>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\" class=\"language-shell\">\nzenml image-builder register &lt;NAME> \\\n    --flavor=kaniko \\\n    --kubernetes_context=&lt;KUBERNETES_CONTEXT>\nzenml stack update -i &lt;NAME>\n</code></pre></div>"
documentationLinkText: "Read the full Kaniko integration docs"
githubLinkText: "Kaniko GitHub repository"
isUpdatedToNewFormat: true
---

<ul><li>Eliminate the need for Docker on your client machine</li><li>Seamlessly integrate with Kubernetes clusters for building images</li><li>Customize build pod configurations to suit your specific requirements</li></ul>

<ul><li>Dockerless container image building</li><li>Native integration with Kubernetes</li><li>Efficient layer caching for faster builds</li><li>Extensible with additional build arguments and configurations</li></ul>

```shell
zenml image-builder register <NAME> \
    --flavor=kaniko \
    --kubernetes_context=<KUBERNETES_CONTEXT>
zenml stack update -i <NAME>
```
This code snippet demonstrates how to register the Kaniko image builder in ZenML and update the active stack to use it.