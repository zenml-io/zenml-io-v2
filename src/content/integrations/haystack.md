---
title: "Haystack"
slug: "haystack"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68adac6fed017de4d4eec8c6"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T13:39:39.566Z"
  lastUpdated: "2025-08-26T13:03:53.544Z"
  createdOn: "2025-08-26T12:45:35.925Z"
integrationType: "agents"
logo:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/b4aa5fd6/68adac7ae1cc8ab4416a746d_haystack.png"
shortDescription: "Integrate your Haystack RAG pipelines with ZenML"
docsUrl: "https://docs.zenml.io"
githubUrl: "https://github.com/zenml-io/zenml/tree/main/examples/agent_framework_integrations/haystack"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/2fef600a/68adae3536f0ab1d3b12bdec_haystack-img.png"
relatedBlogPosts:
  - "best-agentic-ai-frameworks"
  - "llamaindex-alternatives"
seo:
  title: "Integrate Haystack with ZenML - Agents Integrations"
  description: "Integrate your Haystack RAG pipelines with ZenML"
  canonical: "https://www.zenml.io/integrations/haystack"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/2fef600a/68adae3536f0ab1d3b12bdec_haystack-img.png"
  ogTitle: "Integrate Haystack with ZenML - Agents Integrations"
  ogDescription: "Integrate your Haystack RAG pipelines with ZenML"
overviewTitle: "Integrate your Haystack RAG pipelines with ZenML"
overviewDescription: "Haystack provides a component-based framework for Retrieval-Augmented Generation (RAG); integrating Haystack with ZenML wraps your retrievers, prompt builders, and LLM calls inside reproducible pipelines with artifact tracking, observability, and a clean path from local experiments to production."
featuresWithZenmlHtml: "<ul><li><strong id=\"\">End-to-end RAG orchestration.</strong> Run complete Haystack retrieval and generation pipelines inside ZenML.</li><li>‍<strong id=\"\">Unified artifact tracking.</strong> Automatically log queries, retrieved documents, and answers as ZenML artifacts.</li><li>‍<strong id=\"\">Custom evaluation workflows.</strong> Add eval steps to measure answer quality, latency, or retrieval accuracy.</li><li>‍<strong id=\"\">Flexible retriever integration.</strong> Swap in-memory retrievers for vector databases or cloud backends within the same pipeline.</li><li>‍<strong id=\"\">Production-ready pipelines.</strong> Scale Haystack RAG from local dev to production orchestrators like Kubernetes or Airflow with no code changes.</li></ul>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Retrieval-Augmented Generation.</strong> Build RAG flows with retriever, prompt builder, and LLM.</li><li id=\"\">‍<strong id=\"\">Component architecture.</strong> Swap or configure components without changing your pipeline shape.</li><li id=\"\">‍<strong id=\"\">In-memory store.</strong> Use a simple in-memory document store and retriever for quick starts.</li></ul>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\">from zenml import ExternalArtifact, pipeline, step\nfrom haystack_agent import pipeline as haystack_pipeline\n\n@step\ndef run_haystack(question: str) -> str:\n    # Execute the Haystack pipeline and extract the first LLM reply\n    result = haystack_pipeline.run(\n        {\"retriever\": {\"query\": question},\n         \"prompt_builder\": {\"question\": question}},\n        include_outputs_from={\"llm\"},\n    )\n    replies = result.get(\"llm\", {}).get(\"replies\", [])\n    return replies[0] if replies else \"No response generated\"\n\n@pipeline\ndef haystack_rag_pipeline() -> str:\n    q = ExternalArtifact(value=\"What city is home to the Eiffel Tower?\")\n    return run_haystack(q.value)\n\nif __name__ == \"__main__\":\n    print(haystack_rag_pipeline())</code></pre></div>"
documentationLinkText: "ZenML Documentation"
githubLinkText: "ZenML Agent Framework Integrations (GitHub)"
additionalResources:
  - label: "Haystack Documentation"
    href: "https://docs.haystack.deepset.ai/docs/intro"
isUpdatedToNewFormat: true
---

<ul><li><strong>End-to-end RAG orchestration.</strong> Run complete Haystack retrieval and generation pipelines inside ZenML.</li><li><strong>Unified artifact tracking.</strong> Automatically log queries, retrieved documents, and answers as ZenML artifacts.</li><li><strong>Custom evaluation workflows.</strong> Add eval steps to measure answer quality, latency, or retrieval accuracy.</li><li><strong>Flexible retriever integration.</strong> Swap in-memory retrievers for vector databases or cloud backends within the same pipeline.</li><li><strong>Production-ready pipelines.</strong> Scale Haystack RAG from local dev to production orchestrators like Kubernetes or Airflow with no code changes.</li></ul><ul><li><strong>Retrieval-Augmented Generation.</strong> Build RAG flows with retriever, prompt builder, and LLM.</li><li><strong>Component architecture.</strong> Swap or configure components without changing your pipeline shape.</li><li><strong>In-memory store.</strong> Use a simple in-memory document store and retriever for quick starts.</li></ul>
```
from zenml import ExternalArtifact, pipeline, step
from haystack_agent import pipeline as haystack_pipeline

@step
def run_haystack(question: str) -> str:
    # Execute the Haystack pipeline and extract the first LLM reply
    result = haystack_pipeline.run(
        {"retriever": {"query": question},
         "prompt_builder": {"question": question}},
        include_outputs_from={"llm"},
    )
    replies = result.get("llm", {}).get("replies", [])
    return replies[0] if replies else "No response generated"

@pipeline
def haystack_rag_pipeline() -> str:
    q = ExternalArtifact(value="What city is home to the Eiffel Tower?")
    return run_haystack(q.value)

if __name__ == "__main__":
    print(haystack_rag_pipeline())
```
