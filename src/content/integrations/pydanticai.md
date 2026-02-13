---
title: "PydanticAI"
slug: "pydanticai"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68adc68e0c3610d12a146360"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T14:51:22.115Z"
  lastUpdated: "2025-08-26T14:42:24.930Z"
  createdOn: "2025-08-26T14:37:02.480Z"
integrationType: "agents"
logo:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/ac3aac54/68adc6964e4ca90c41950ffa_pydantic.png"
shortDescription: "PydanticAI type-safe agents integrated with ZenML"
docsUrl: "https://docs.zenml.io"
githubUrl: "https://github.com/zenml-io/zenml/tree/main/examples/agent_framework_integrations/pydanticai"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/77d9c754/68adc7b3c1e15b4e493af0d3_pydanticai-img.png"
relatedBlogPosts:
  - "llm-agents-in-production-architectures-challenges-and-best-practices"
seo:
  title: "Integrate PydanticAI with ZenML - Agents Integrations"
  description: "PydanticAI type-safe agents integrated with ZenML"
  canonical: "https://www.zenml.io/integrations/pydanticai"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/77d9c754/68adc7b3c1e15b4e493af0d3_pydanticai-img.png"
  ogTitle: "Integrate PydanticAI with ZenML - Agents Integrations"
  ogDescription: "PydanticAI type-safe agents integrated with ZenML"
overviewTitle: "PydanticAI type-safe agents integrated with ZenML"
overviewDescription: "PydanticAI extends the Pydantic ecosystem with type-safe AI agents that validate structured outputs and integrate tools. Running them with ZenML puts these agents into production-ready pipelines, ensuring reproducibility, artifact lineage, and deployment flexibility."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Type-safe orchestration.</strong> Run PydanticAI agents inside ZenML pipelines with guaranteed structured outputs.</li><li id=\"\">‍<strong id=\"\">Artifact tracking.</strong> Store queries, validated responses, and error cases as ZenML artifacts.</li><li id=\"\">‍<strong id=\"\">Error handling.</strong> Integrate post-run checks or evaluation steps to catch invalid responses.</li><li id=\"\">‍<strong id=\"\">Composable workflows.</strong> Combine PydanticAI with retrieval, evals, and deployment steps in a single pipeline.</li><li id=\"\">‍<strong id=\"\">Portable execution.</strong> Move seamlessly from local runs to scalable orchestrators like Kubernetes or Airflow.</li></ul>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Type-safe agents.</strong> Ensure AI outputs conform to strict schemas defined with Pydantic.</li><li id=\"\">‍<strong id=\"\">Simple run_sync API.</strong> Call agents with a straightforward synchronous interface.</li><li id=\"\">‍<strong id=\"\">Tool integration.</strong> Extend agents with callable Python functions as tools.</li></ul>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\">from zenml import ExternalArtifact, pipeline, step\nfrom pydanticai_agent import agent\n\n@step\ndef run_pydanticai(query: str) -> str:\n   result = agent.run_sync(query)\n   return str(result.output)\n\n@pipeline\ndef pydanticai_agent_pipeline() -> str:\n   q = ExternalArtifact(value=\"What is the secret data?\")\n   return run_pydanticai(q.value)\n\nif __name__ == \"__main__\":\n   print(pydanticai_agent_pipeline())</code></pre></div>"
documentationLinkText: "ZenML Documentation"
githubLinkText: "ZenML Agent Framework Integrations (GitHub)"
additionalResources:
  - label: "PydanticAI Documentation"
    href: "https://ai.pydantic.dev/"
isUpdatedToNewFormat: true
---

<ul><li><strong>Type-safe orchestration.</strong> Run PydanticAI agents inside ZenML pipelines with guaranteed structured outputs.</li><li><strong>Artifact tracking.</strong> Store queries, validated responses, and error cases as ZenML artifacts.</li><li><strong>Error handling.</strong> Integrate post-run checks or evaluation steps to catch invalid responses.</li><li><strong>Composable workflows.</strong> Combine PydanticAI with retrieval, evals, and deployment steps in a single pipeline.</li><li><strong>Portable execution.</strong> Move seamlessly from local runs to scalable orchestrators like Kubernetes or Airflow.</li></ul><ul><li><strong>Type-safe agents.</strong> Ensure AI outputs conform to strict schemas defined with Pydantic.</li><li><strong>Simple run_sync API.</strong> Call agents with a straightforward synchronous interface.</li><li><strong>Tool integration.</strong> Extend agents with callable Python functions as tools.</li></ul>
```
from zenml import ExternalArtifact, pipeline, step
from pydanticai_agent import agent

@step
def run_pydanticai(query: str) -> str:
   result = agent.run_sync(query)
   return str(result.output)

@pipeline
def pydanticai_agent_pipeline() -> str:
   q = ExternalArtifact(value="What is the secret data?")
   return run_pydanticai(q.value)

if __name__ == "__main__":
   print(pydanticai_agent_pipeline())
```
