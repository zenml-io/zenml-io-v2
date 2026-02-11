---
title: "LangChain"
slug: "langchain"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68adafa6e7477a341ac960c4"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T13:39:39.566Z"
  lastUpdated: "2025-08-26T13:23:32.601Z"
  createdOn: "2025-08-26T12:59:18.197Z"
integrationType: "agents"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/986b08b5/68adafb26944ec2a46778809_langchain.png"
shortDescription: "LangChain agent chains integrated with ZenML"
docsUrl: "https://docs.zenml.io"
githubUrl: "https://github.com/zenml-io/zenml/tree/main/examples/agent_framework_integrations/langchain"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/e2efe0d8/68adb54f8efaceb435c1b7db_langchain-img.png"
relatedBlogPosts:
  - "productionalizing-langchain-and-llamaindex-with-a-zenml-mlops-pipeline-to-help-community-slack-support"
  - "langgraph-alternatives"
seo:
  title: "Integrate LangChain with ZenML - Agents Integrations"
  description: "LangChain agent chains integrated with ZenML"
  canonical: "https://www.zenml.io/integrations/langchain"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/e2efe0d8/68adb54f8efaceb435c1b7db_langchain-img.png"
  ogTitle: "Integrate LangChain with ZenML - Agents Integrations"
  ogDescription: "LangChain agent chains integrated with ZenML"
---

<ul><li><strong>Orchestrated runnable chains.</strong> Run LangChain chains as reproducible ZenML pipeline steps.</li><li><strong>Tracked outputs.</strong> Automatically log prompts, summaries, and tool results for lineage and debugging.</li><li><strong>Custom evaluation hooks.</strong> Add eval steps to score generations, monitor latency, or validate correctness.</li><li><strong>Composable workflows.</strong> Combine LangChain with RAG, agents, or deployment steps in a single DAG.</li><li><strong>Production-ready pipelines.</strong> Move from prototyping to scalable workflows on Kubernetes, Airflow, or other stacks.</li></ul><ul><li><strong>Runnable chains.</strong> Execute LangChain chains with integrated tools and components.</li><li><strong>Math and search.</strong> Extend workflows with calculators, web search, and retrieval helpers.</li><li><strong>Composable architecture.</strong> Build flexible pipelines using chain composition and pipe operators.</li></ul>
```
from zenml import ExternalArtifact, pipeline, step
from langchain_agent import chain

@step
def run_chain(url_input: str) -> str:
   # Extract URL from "Summarize: URL" format
   if ":" in url_input and url_input.startswith("Summarize"):
       url = url_input.split(":", 1)[1].strip()
   else:
       url = url_input  # Fallback to use input as URL directly
   return chain.invoke({"url": url})

@pipeline
def langchain_summarization_pipeline() -> str:
   doc = ExternalArtifact(
       value="Summarize: https://python.langchain.com/docs/introduction/"
   )
   return run_chain(doc.value)

if __name__ == "__main__":
   print(langchain_summarization_pipeline())
```
