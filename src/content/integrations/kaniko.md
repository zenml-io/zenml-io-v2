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
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/56435a28/66d8683157d8287eda0bbc84_kaniko.png"
shortDescription: "Build Container Images Effortlessly with Kaniko and ZenML"
docsUrl: "https://docs.zenml.io/stack-components/image-builders/kaniko"
githubUrl: "https://github.com/GoogleContainerTools/kaniko"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/9db69c0a/66e02b513d4f8dbbe140fad1_Screenshot_2024-09-04_at_10.16.07.png"
seo:
  title: "Integrate Kaniko with ZenML - Image Builder Integrations"
  description: "Build Container Images Effortlessly with Kaniko and ZenML"
  canonical: "https://www.zenml.io/integrations/kaniko"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/9db69c0a/66e02b513d4f8dbbe140fad1_Screenshot_2024-09-04_at_10.16.07.png"
  ogTitle: "Integrate Kaniko with ZenML - Image Builder Integrations"
  ogDescription: "Build Container Images Effortlessly with Kaniko and ZenML"
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