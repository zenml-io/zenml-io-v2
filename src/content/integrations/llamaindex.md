---
title: "LlamaIndex"
slug: "llamaindex"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68adc2ae2834158a0f6e081e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T14:51:22.115Z"
  lastUpdated: "2025-08-26T14:25:09.690Z"
  createdOn: "2025-08-26T14:20:30.481Z"
integrationType: "agents"
logo:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/dc393543/68adc2b39206458c0cbe525e_llamaindex.png"
shortDescription: "LlamaIndex Function Agent integrated with ZenML"
docsUrl: "https://docs.zenml.io"
githubUrl: "https://github.com/zenml-io/zenml/tree/main/examples/agent_framework_integrations/langgraph"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/da7c121c/68adc3b0a9eaacaf244b9b63_llamaindex.img.png"
relatedBlogPosts:
  - "llamaindex-vs-langgraph"
  - "llamaindex-pricing"
seo:
  title: "Integrate LlamaIndex with ZenML - Agents Integrations"
  description: "LlamaIndex Function Agent integrated with ZenML"
  canonical: "https://www.zenml.io/integrations/llamaindex"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/da7c121c/68adc3b0a9eaacaf244b9b63_llamaindex.img.png"
  ogTitle: "Integrate LlamaIndex with ZenML - Agents Integrations"
  ogDescription: "LlamaIndex Function Agent integrated with ZenML"
overviewTitle: "LlamaIndex Function Agent integrated with ZenML"
overviewDescription: "LlamaIndex lets you build function agents that call multiple tools and often run asynchronously; integrating it with ZenML executes those agents inside reproducible pipelines with artifact lineage, observability, and a clean path from local development to production."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Async-friendly orchestration.</strong> Run LlamaIndex function agents that require awaiting inside ZenML steps without changing agent code.</li><li id=\"\">‍<strong id=\"\">Tool call lineage.</strong> Track queries, intermediate tool outputs, and final responses as versioned artifacts.</li><li id=\"\">‍<strong id=\"\">Composable pipelines.</strong> Chain agents with retrieval, evals, and deployment in one DAG.</li><li id=\"\">‍<strong id=\"\">Evaluation ready.</strong> Add post-run checks to score response quality, latency, and tool accuracy.</li><li id=\"\">‍<strong id=\"\">Portable execution.</strong> Move the same pipeline from local runs to Kubernetes or Airflow via ZenML stacks.</li></ul>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Function agents.</strong> Define agents that call Python tools to solve tasks.</li><li id=\"\">‍<strong id=\"\">Async execution.</strong> Properly await <code id=\"\">agent.run(...)</code> for non-blocking workflows.</li><li id=\"\">‍<strong id=\"\">Multiple tools.</strong> Plug in weather, tip calculator, and custom utilities.</li></ul>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\">from zenml import ExternalArtifact, pipeline, step\nfrom agent import agent  # LlamaIndex function agent with tools\n\n@step\ndef run_llamaindex(query: str) -> str:\n   # LlamaIndex agent.run is async; await it inside the step\n   import asyncio\n   async def _run():\n       return await agent.run(query)\n   resp = asyncio.run(_run())\n   return str(getattr(resp, \"response\", resp))\n\n@pipeline\ndef llamaindex_agent_pipeline() -> str:\n   q = ExternalArtifact(\n       value=\"What's the weather in New York and calculate a 15% tip for $50?\"\n   )\n   return run_llamaindex(q.value)\n\nif __name__ == \"__main__\":\n   print(llamaindex_agent_pipeline())</code></pre></div>"
documentationLinkText: "ZenML Documentation"
githubLinkText: "ZenML Agent Framework Integrations (GitHub)"
additionalResources:
  - label: "LlamaIndex Documentation"
    href: "https://docs.llamaindex.ai/en/stable/"
isUpdatedToNewFormat: true
---

<ul><li><strong>Async-friendly orchestration.</strong> Run LlamaIndex function agents that require awaiting inside ZenML steps without changing agent code.</li><li><strong>Tool call lineage.</strong> Track queries, intermediate tool outputs, and final responses as versioned artifacts.</li><li><strong>Composable pipelines.</strong> Chain agents with retrieval, evals, and deployment in one DAG.</li><li><strong>Evaluation ready.</strong> Add post-run checks to score response quality, latency, and tool accuracy.</li><li><strong>Portable execution.</strong> Move the same pipeline from local runs to Kubernetes or Airflow via ZenML stacks.</li></ul><ul><li><strong>Function agents.</strong> Define agents that call Python tools to solve tasks.</li><li><strong>Async execution.</strong> Properly await <code>agent.run(...)</code> for non-blocking workflows.</li><li><strong>Multiple tools.</strong> Plug in weather, tip calculator, and custom utilities.</li></ul>
```
from zenml import ExternalArtifact, pipeline, step
from agent import agent  # LlamaIndex function agent with tools

@step
def run_llamaindex(query: str) -> str:
   # LlamaIndex agent.run is async; await it inside the step
   import asyncio
   async def _run():
       return await agent.run(query)
   resp = asyncio.run(_run())
   return str(getattr(resp, "response", resp))

@pipeline
def llamaindex_agent_pipeline() -> str:
   q = ExternalArtifact(
       value="What's the weather in New York and calculate a 15% tip for $50?"
   )
   return run_llamaindex(q.value)

if __name__ == "__main__":
   print(llamaindex_agent_pipeline())
```
