---
title: "Google ADK Agent"
slug: "google-adk-agent"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68adaa69d4b1b16ee3db101b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T13:39:39.566Z"
  lastUpdated: "2025-08-26T13:25:01.098Z"
  createdOn: "2025-08-26T12:36:57.754Z"
integrationType: "agents"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/7d912ea5/68adaa7150cb5160b3708993_google-adk.png"
shortDescription: "Google Agent Development Kit integrated with ZenML"
docsUrl: "https://docs.zenml.io"
githubUrl: "https://github.com/zenml-io/zenml/tree/main/examples/agent_framework_integrations/google-adk"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/f9dcbd2a/68adab8d6ad81d3c14b9b59b_google-adk-img.png"
relatedBlogPosts:
  - "best-agentic-ai-frameworks"
  - "production-ready-ai-agents-why-your-mlops-stack-is-missing-piece"
seo:
  title: "Integrate Google ADK Agent with ZenML - Agents Integrations"
  description: "Google Agent Development Kit integrated with ZenML"
  canonical: "https://www.zenml.io/integrations/google-adk-agent"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/f9dcbd2a/68adab8d6ad81d3c14b9b59b_google-adk-img.png"
  ogTitle: "Integrate Google ADK Agent with ZenML - Agents Integrations"
  ogDescription: "Google Agent Development Kit integrated with ZenML"
overviewTitle: "Conversational Agent Framework"
overviewDescription: "Google ADK lets you build Gemini-powered agents with a simple callable interface and built-in tools; connecting ADK to ZenML wraps those agents in reproducible pipelines with artifact tracking, observability, and an easy path from local experiments to production."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Pipeline orchestration.</strong> Run Google ADK agents as ZenML steps inside reproducible pipelines.</li><li id=\"\">‍<strong id=\"\">Artifact management.</strong> Capture agent inputs and outputs for lineage, versioning, and auditability.</li><li id=\"\">‍<strong id=\"\">Evaluation ready.</strong> Add post-run checks or eval steps to monitor quality over time.</li><li id=\"\">‍<strong id=\"\">Infrastructure agnostic.</strong> Scale from local runs to Kubernetes, Airflow, and other ZenML stacks.</li><li id=\"\">‍<strong id=\"\">Composable workflows.</strong> Combine agents with retrieval, evals, and deployment steps in one DAG.</li></ul>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Gemini-powered agents.</strong> Build on Google’s latest models through ADK.</li><li id=\"\">‍<strong id=\"\">Simple callable interface.</strong> Invoke agents directly or through common <code id=\"\">run</code> and <code id=\"\">execute</code> methods.</li><li id=\"\">‍<strong id=\"\">Built-in tools.</strong> Integrate calculations and custom tools inside agent workflows.</li></ul>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\">from zenml import ExternalArtifact, pipeline, step\nfrom adk_agent import root_agent\n\n@step\ndef run_adk(query: str) -> str:\n    return str(root_agent.run(query))\n\n\n@pipeline\ndef google_adk_pipeline() -> str:\n    q = ExternalArtifact(value=\"What's the weather like in Tokyo?\")\n    return run_adk(q.value)\n\nif __name__ == \"__main__\":\n    print(google_adk_pipeline())</code></pre></div>"
documentationLinkText: "ZenML Documentation"
githubLinkText: "ZenML Agent Framework Integrations (GitHub)"
additionalResources:
  - label: "Google ADK Documentation"
    href: "https://google.github.io/adk-docs/"
isUpdatedToNewFormat: true
---

<ul><li><strong>Pipeline orchestration.</strong> Run Google ADK agents as ZenML steps inside reproducible pipelines.</li><li><strong>Artifact management.</strong> Capture agent inputs and outputs for lineage, versioning, and auditability.</li><li><strong>Evaluation ready.</strong> Add post-run checks or eval steps to monitor quality over time.</li><li><strong>Infrastructure agnostic.</strong> Scale from local runs to Kubernetes, Airflow, and other ZenML stacks.</li><li><strong>Composable workflows.</strong> Combine agents with retrieval, evals, and deployment steps in one DAG.</li></ul><ul><li><strong>Gemini-powered agents.</strong> Build on Google’s latest models through ADK.</li><li><strong>Simple callable interface.</strong> Invoke agents directly or through common <code>run</code> and <code>execute</code> methods.</li><li><strong>Built-in tools.</strong> Integrate calculations and custom tools inside agent workflows.</li></ul>
```
from zenml import ExternalArtifact, pipeline, step
from adk_agent import root_agent

@step
def run_adk(query: str) -> str:
    return str(root_agent.run(query))

@pipeline
def google_adk_pipeline() -> str:
    q = ExternalArtifact(value="What's the weather like in Tokyo?")
    return run_adk(q.value)

if __name__ == "__main__":
    print(google_adk_pipeline())
```
