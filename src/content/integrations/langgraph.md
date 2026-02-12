---
title: "LangGraph"
slug: "langgraph"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68adb6420c3610d12a0c4455"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T14:51:22.115Z"
  lastUpdated: "2025-08-26T14:11:55.248Z"
  createdOn: "2025-08-26T13:27:30.675Z"
integrationType: "agents"
logo:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/caf5a2cc/68adb6487c9c6ad23ac9e67d_langgraph.png"
shortDescription: "LangGraph ReAct agent integrated with ZenML."
docsUrl: "https://docs.zenml.io"
githubUrl: "https://github.com/zenml-io/zenml/tree/main/examples/agent_framework_integrations/langgraph"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/43826c39/68adc07280542f235f7548dc_langgraph-img.png"
relatedBlogPosts:
  - "langgraph-alternatives"
  - "langgraph-pricing"
seo:
  title: "Integrate LangGraph with ZenML - Agents Integrations"
  description: "LangGraph ReAct agent integrated with ZenML."
  canonical: "https://www.zenml.io/integrations/langgraph"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/43826c39/68adc07280542f235f7548dc_langgraph-img.png"
  ogTitle: "Integrate LangGraph with ZenML - Agents Integrations"
  ogDescription: "LangGraph ReAct agent integrated with ZenML."
---

<ul><li><strong>ReAct agent orchestration.</strong> Execute LangGraph ReAct agents as ZenML steps inside versioned pipelines.</li><li><strong>Message lineage.</strong> Track user prompts, intermediate messages, and final responses as artifacts for audit and debugging.</li><li><strong>Tool visibility.</strong> Log tool inputs and outputs from search or calculators alongside the agent step.</li><li><strong>Evaluation-ready.</strong> Add post-run checks to score answers, latency, or tool effectiveness.</li><li><strong>Portable deployment.</strong> Run the same agent graph locally or on Kubernetes and Airflow through ZenML stacks.</li></ul><ul><li><strong>ReAct pattern.</strong> Reasoning-and-acting agents built as message graphs.</li><li><strong>Message-based communication.</strong> Agents exchange structured messages across nodes.</li><li><strong>Built-in tools.</strong> Search and calculator tools available for quick problem solving.</li></ul>
```
from zenml import ExternalArtifact, pipeline, step
from langgraph_agent import agent  # prebuilt LangGraph ReAct agent

@step
def run_langgraph(query: str) -> str:
   messages = [{"role": "user", "content": query}]
   result = agent.invoke({"messages": messages})
   msgs = result.get("messages", [])
   return getattr(msgs[-1], "content", str(result)) if msgs else str(result)

@pipeline
def langgraph_agent_pipeline() -> str:
   q = ExternalArtifact(value="What is the weather in San Francisco?")
   return run_langgraph(q.value)

if __name__ == "__main__":
   print(langgraph_agent_pipeline())
```
