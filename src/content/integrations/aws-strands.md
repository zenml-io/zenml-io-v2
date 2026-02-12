---
title: "AWS Strands"
slug: "aws-strands"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68ad93ec832a3a50938f738e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T13:39:39.566Z"
  lastUpdated: "2025-08-26T13:02:20.812Z"
  createdOn: "2025-08-26T11:01:00.201Z"
integrationType: "agents"
logo:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/7035354b/68ad93f3f7b83030996de1af_aws-strands.png"
shortDescription: "Build and orchestrate Strands agents with reproducible ZenML pipelines."
docsUrl: "https://docs.zenml.io"
githubUrl: "https://github.com/zenml-io/zenml/tree/main/examples/agent_framework_integrations/autogen"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/c8617db2/68ada471e15a1cc0b3f503d4_aws-strands-img.png"
relatedBlogPosts:
  - "production-ready-ai-agents-why-your-mlops-stack-is-missing-piece"
seo:
  title: "Integrate AWS Strands with ZenML - Agents Integrations"
  description: "Build and orchestrate Strands agents with reproducible ZenML pipelines."
  canonical: "https://www.zenml.io/integrations/aws-strands"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/c8617db2/68ada471e15a1cc0b3f503d4_aws-strands-img.png"
  ogTitle: "Integrate AWS Strands with ZenML - Agents Integrations"
  ogDescription: "Build and orchestrate Strands agents with reproducible ZenML pipelines."
---

<ul><li><strong>Run Strands agents</strong> as reproducible ZenML pipeline steps.</li><li>Automatically <strong>log and version agent inputs and outputs</strong> with ZenML’s artifact store.</li><li>Insert <strong>evaluation or monitoring steps</strong> alongside agent execution for observability.</li><li>Seamlessly scale from <strong>local execution to cloud orchestrators</strong> (Kubernetes, Airflow, etc.).</li></ul><ul><li><strong>Simple Callable Agents.</strong> Run Strands agents directly inside ZenML steps with a clean Pythonic interface.</li><li><strong>Built-in Tools.</strong> Extend agent capabilities easily with the <code>@tool</code> decorator.</li><li><strong>Math &amp; Reasoning.</strong> Enable agents to handle math operations and logical calculations out of the box.</li><li><strong>Artifact Management.</strong> Automatically capture and version all inputs and outputs with ZenML’s artifact store.</li><li><strong>Scalable Deployment.</strong> Move seamlessly from local experiments to production pipelines on Kubernetes, Airflow, or other orchestrators.</li></ul>
```
from zenml import ExternalArtifact, pipeline, step
from agent import agent

@step
def run_strands(query: str) -> str:
    return str(agent(query))

@pipeline
def strands_weather_pipeline() -> str:
    q = ExternalArtifact(value="What's the weather like in Tokyo?")
    return run_strands(q.value)

if __name__ == "__main__":
    print(strands_weather_pipeline())
```
This is a minimal example. See the [full weather agent pipeline](https://github.com/zenml-io/zenml/tree/main/examples/agent_framework_integrations) for advanced usage with artifacts, formatting, and error handling.