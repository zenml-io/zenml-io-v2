---
title: "CrewAI"
slug: "crew-ai"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68ada5aecdf2fd1ec282453c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T13:39:39.566Z"
  lastUpdated: "2025-08-26T13:26:05.455Z"
  createdOn: "2025-08-26T12:16:46.341Z"
integrationType: "agents"
logo:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/2fce639d/68ada5b4b2a1841dcdba89e4_crew-ai.png"
shortDescription: "CrewAI multi-agent crew framework integrated with ZenML"
docsUrl: "https://docs.zenml.io"
githubUrl: "https://github.com/zenml-io/zenml/tree/main/examples/agent_framework_integrations/crewai"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/8f1f077a/68ada9c93969573d85a40ddd_crew-image.png"
relatedBlogPosts:
  - "langgraph-vs-crewai"
  - "crewai-pricing"
seo:
  title: "Integrate CrewAI with ZenML - Agents Integrations"
  description: "CrewAI multi-agent crew framework integrated with ZenML"
  canonical: "https://www.zenml.io/integrations/crew-ai"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/8f1f077a/68ada9c93969573d85a40ddd_crew-image.png"
  ogTitle: "Integrate CrewAI with ZenML - Agents Integrations"
  ogDescription: "CrewAI multi-agent crew framework integrated with ZenML"
---

<ul><li><strong>Pipeline orchestration.</strong> Run CrewAI crews as ZenML steps inside reproducible pipelines.</li><li><strong>Artifact management.</strong> Capture inputs and outputs for lineage, versioning, and auditability.</li><li><strong>Built-in evaluation hooks.</strong> Add post-run checks or eval steps to monitor quality over time.<strong>Infrastructure agnostic.</strong> Scale from local runs to Kubernetes, Airflow, and other ZenML stacks.</li><li><strong>Composable workflows.</strong> Combine crews with retrieval, evals, and deployment steps in one DAG.</li></ul><ul><li><strong>Multi-agent crews.</strong> Define collaborators with roles, goals, and tools.</li><li><strong>Task delegation.</strong> Break work into tasks and route them to the right agent.</li><li><strong>Collaborative execution.</strong> Agents coordinate to research, draft, and refine outputs.</li><li><strong>Pluggable patterns.</strong> Start from examples like research and writing crews and customize.</li></ul>
```
from zenml import ExternalArtifact, pipeline, step
from crewai_agent import crew

@step
def run_crewai(query: str) -> str:
    result = crew.kickoff(inputs={"city": query})
    return str(result)

@pipeline
def crewai_travel_pipeline() -> str:
    q = ExternalArtifact(value="Berlin")
    return run_crewai(q.value)

if __name__ == "__main__":
    print(crewai_travel_pipeline())
```
