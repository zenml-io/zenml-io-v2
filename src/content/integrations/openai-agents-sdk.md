---
title: "OpenAI Agents SDK"
slug: "openai-agents-sdk"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68adc434c5f674c570826c12"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T14:51:22.115Z"
  lastUpdated: "2025-08-26T14:33:57.100Z"
  createdOn: "2025-08-26T14:27:00.325Z"
integrationType: "agents"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/f221e966/68adc43932c9097522a666d3_openai.png"
shortDescription: "OpenAI Agents SDK integrated with ZenML"
docsUrl: "https://docs.zenml.io"
githubUrl: "https://github.com/zenml-io/zenml/tree/main/examples/agent_framework_integrations/openai_agents_sdk"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/9a636a7f/68adc595169ac0f55969f218_openai-img.png"
relatedBlogPosts:
  - "the-ultimate-guide-to-llm-batch-inference-with-openai-and-zenml"
seo:
  title: "Integrate OpenAI Agents SDK with ZenML - Agents Integrations"
  description: "OpenAI Agents SDK integrated with ZenML"
  canonical: "https://www.zenml.io/integrations/openai-agents-sdk"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/9a636a7f/68adc595169ac0f55969f218_openai-img.png"
  ogTitle: "Integrate OpenAI Agents SDK with ZenML - Agents Integrations"
  ogDescription: "OpenAI Agents SDK integrated with ZenML"
overviewTitle: "OpenAI Agents SDK integrated with ZenML"
overviewDescription: "The OpenAI Agents SDK lets you build structured agents that use GPT models with function tools and tracing. Integrating it with ZenML wraps those agents inside reproducible pipelines with artifact tracking, observability, and deployment flexibility, so your prototypes scale into production-ready systems."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Structured agent orchestration.</strong> Run OpenAI Agents SDK agents as reproducible ZenML pipeline steps.</li><li id=\"\">‍<strong id=\"\">Artifact tracking.</strong> Capture prompts, tool calls, and agent responses as ZenML artifacts for full lineage.</li><li id=\"\">‍<strong id=\"\">Built-in monitoring.</strong> Combine SDK’s tracing with ZenML’s observability features.</li><li id=\"\">‍<strong id=\"\">Composable workflows.</strong> Integrate OpenAI agents with evals, retrieval, or deployment steps in one pipeline.</li><li id=\"\">‍<strong id=\"\">Scalable deployment.</strong> Move seamlessly from local tests to production orchestrators like Kubernetes or Airflow.</li></ul>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Structured agent execution.</strong> Define GPT-powered agents with structured inputs/outputs.</li><li id=\"\">‍<strong id=\"\">Function tools.</strong> Extend agent capabilities with the <code id=\"\">@function_tool</code> decorator.</li><li id=\"\">‍<strong id=\"\">Tracing built-in.</strong> Get detailed monitoring of tool usage and model calls.</li></ul>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\">from zenml import ExternalArtifact, pipeline, step\nfrom openai_agent import agent\nimport agents\n\n@step\ndef run_openai(query: str) -> str:\n   runner = agents.run.DEFAULT_AGENT_RUNNER\n   result = runner.run_sync(agent, query)\n   return str(result.final_output)\n\n@pipeline\ndef openai_agent_pipeline() -> str:\n   q = ExternalArtifact(value=\"Tell me a fun fact about Tokyo\")\n   return run_openai(q.value)\n\nif __name__ == \"__main__\":\n   print(openai_agent_pipeline())</code></pre></div>"
documentationLinkText: "ZenML Documentation"
githubLinkText: "ZenML Agent Framework Integrations (GitHub)"
additionalResources:
  - label: "OpenAI Agents SDK Documentation"
    href: "https://openai.github.io/openai-agents-python/"
isUpdatedToNewFormat: true
---

<ul><li><strong>Structured agent orchestration.</strong> Run OpenAI Agents SDK agents as reproducible ZenML pipeline steps.</li><li><strong>Artifact tracking.</strong> Capture prompts, tool calls, and agent responses as ZenML artifacts for full lineage.</li><li><strong>Built-in monitoring.</strong> Combine SDK’s tracing with ZenML’s observability features.</li><li><strong>Composable workflows.</strong> Integrate OpenAI agents with evals, retrieval, or deployment steps in one pipeline.</li><li><strong>Scalable deployment.</strong> Move seamlessly from local tests to production orchestrators like Kubernetes or Airflow.</li></ul><ul><li><strong>Structured agent execution.</strong> Define GPT-powered agents with structured inputs/outputs.</li><li><strong>Function tools.</strong> Extend agent capabilities with the <code>@function_tool</code> decorator.</li><li><strong>Tracing built-in.</strong> Get detailed monitoring of tool usage and model calls.</li></ul>
```
from zenml import ExternalArtifact, pipeline, step
from openai_agent import agent
import agents

@step
def run_openai(query: str) -> str:
   runner = agents.run.DEFAULT_AGENT_RUNNER
   result = runner.run_sync(agent, query)
   return str(result.final_output)

@pipeline
def openai_agent_pipeline() -> str:
   q = ExternalArtifact(value="Tell me a fun fact about Tokyo")
   return run_openai(q.value)

if __name__ == "__main__":
   print(openai_agent_pipeline())
```
