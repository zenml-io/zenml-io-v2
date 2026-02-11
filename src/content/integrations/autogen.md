---
title: "AutoGen"
slug: "autogen"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68ad8c6f09f88ef2e34126d9"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T11:08:15.173Z"
  lastUpdated: "2025-08-26T10:59:40.836Z"
  createdOn: "2025-08-26T10:29:03.921Z"
integrationType: "agents"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/b4a393dc/68ad8c7a730f133727136baa_autogen.png"
shortDescription: "Seamlessly orchestrate flexible, emergent multi-agent workflows inside ZenML pipelines."
docsUrl: "https://github.com/zenml-io/zenml/tree/main/examples/agent_framework_integrations/autogen"
githubUrl: "https://github.com/zenml-io/zenml/tree/main/examples/agent_framework_integrations/autogen"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/682d6695/68ad8fc2f874d72b5e74f0ad_autogen-img.png"
relatedBlogPosts:
  - "langgraph-vs-autogen"
  - "crewai-vs-autogen"
seo:
  title: "Integrate AutoGen with ZenML - Agents Integrations"
  description: "Seamlessly orchestrate flexible, emergent multi-agent workflows inside ZenML pipelines."
  canonical: "https://www.zenml.io/integrations/autogen"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/682d6695/68ad8fc2f874d72b5e74f0ad_autogen-img.png"
  ogTitle: "Integrate AutoGen with ZenML - Agents Integrations"
  ogDescription: "Seamlessly orchestrate flexible, emergent multi-agent workflows inside ZenML pipelines."
---

<ul><li>Embed AutoGen's <strong>GroupChat agent workflows</strong> as pipeline steps for reproducible orchestration.</li><li>Automatically <strong>track prompts, agent interactions, tool calls, and outputs</strong> in ZenML’s artifact store for full lineage.</li><li>Add <strong>evaluation or validation steps</strong> post-agent execution to continuously monitor performance or quality drift.</li><li>Maintain freedom to choose your preferred <strong>orchestrator (local, Kubernetes, Airflow, etc.)</strong> through ZenML’s stack flexibility.</li></ul><ul><li><strong>Conversational Agent Execution. </strong>Execute multi-agent chat loops (with optional human-in-the-loop) within ZenML steps using AutoGen's async messaging model.</li></ul>

<ul><li><strong>Modular Tools &amp; Memory</strong>. Integrate custom tools (Python functions, APIs) and memory systems with your agents—plugged into a pipeline structure that tracks each interaction step.</li></ul>

<ul><li><strong>Complete Observability</strong>. ZenML captures and versions everything—from conversation history to agent outputs—so artifacts can be inspected, reproduced, and compared later.</li></ul>

<ul><li><strong>Automated Quality Control</strong>. Insert evaluation steps (e.g., checking coherence or correctness of agent outputs) right after execution to flag failures and streamline quality feedback loops.</li></ul>

<ul><li><strong>Infrastructural Flexibility. </strong>Pipelines are portable across infrastructures and can combine AutoGen with other tools (e.g., vector DBs, RAG steps) thanks to ZenML’s provider-agnostic stack approach.</li></ul>
```
from zenml import pipeline, step
from zenml.integrations.autogen import AutoGenAgentStep

@step
def agent_chat_step() -> str:
    # Define and run an AutoGen multi-agent GroupChat
    # (Placeholder—adapt with actual AutoGen API calls)
    response = run_autogen_groupchat(...)
    return response

@step
def evaluate_response(response: str) -> bool:
    # Insert your evaluation logic (e.g., correctness, relevance)
    return some_quality_check(response)

@pipeline
def autogen_agent_pipeline():
    resp = agent_chat_step()
    ok = evaluate_response(resp)

if __name__ == "__main__":
    p = autogen_agent_pipeline()
    p.run()
```
