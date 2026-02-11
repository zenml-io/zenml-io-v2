---
title: "Leveraging LangSmith for Debugging Tools & Actions in Production LLM Applications"
slug: "leveraging-langsmith-for-debugging-tools-actions-in-production-llm-applications"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ddf2c38c27da7ccd0a8"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:34:35.145Z"
  createdOn: "2024-11-21T14:04:15.667Z"
llmopsTags:
  - "customer-support"
  - "documentation"
  - "error-handling"
  - "langchain"
  - "latency-optimization"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "question-answering"
  - "reliability"
  - "scalability"
  - "semantic-search"
  - "structured-output"
  - "system-prompts"
industryTags: "tech"
company: "Mendable"
summary: "Mendable.ai enhanced their enterprise AI assistant platform with Tools & Actions capabilities, enabling automated tasks and API interactions. They faced challenges with debugging and observability of agent behaviors in production. By implementing LangSmith, they successfully debugged agent decision processes, optimized prompts, improved tool schema generation, and built evaluation datasets, resulting in a more reliable and efficient system that has already achieved $1.3 million in savings for a major tech company client."
link: "https://blog.langchain.dev/how-mendable-leverages-langsmith-to-debug-tools-actions/"
year: 2024
seo:
  title: "Mendable: Leveraging LangSmith for Debugging Tools & Actions in Production LLM Applications - ZenML LLMOps Database"
  description: "Mendable.ai enhanced their enterprise AI assistant platform with Tools & Actions capabilities, enabling automated tasks and API interactions. They faced challenges with debugging and observability of agent behaviors in production. By implementing LangSmith, they successfully debugged agent decision processes, optimized prompts, improved tool schema generation, and built evaluation datasets, resulting in a more reliable and efficient system that has already achieved $1.3 million in savings for a major tech company client."
  canonical: "https://www.zenml.io/llmops-database/leveraging-langsmith-for-debugging-tools-actions-in-production-llm-applications"
  ogTitle: "Mendable: Leveraging LangSmith for Debugging Tools & Actions in Production LLM Applications - ZenML LLMOps Database"
  ogDescription: "Mendable.ai enhanced their enterprise AI assistant platform with Tools & Actions capabilities, enabling automated tasks and API interactions. They faced challenges with debugging and observability of agent behaviors in production. By implementing LangSmith, they successfully debugged agent decision processes, optimized prompts, improved tool schema generation, and built evaluation datasets, resulting in a more reliable and efficient system that has already achieved $1.3 million in savings for a major tech company client."
---

## Overview

Mendable.ai is a platform that helps enterprise teams answer technical questions using AI. This case study, authored by Nicolas Camara (CTO of Mendable), describes how they leveraged LangSmith from LangChain to debug and optimize their "Tools & Actions" feature, which enables AI agents to perform automated actions beyond simple question-and-answer interactions. The case study provides valuable insights into the challenges of building production-grade agentic AI systems and the importance of observability tooling in LLMOps.

## Business Context and Use Case

The case study highlights a significant enterprise deployment where Mendable equipped approximately 1,000 customer success and sales personnel at a $20+ billion tech company with GTM (Go-To-Market) assistants. These assistants provide technical guidance, process help, and industry expertise. The reported results include $1.3 million in savings over five months, with projections of $3 million in annual savings due to decreased research time and reduced dependency on technical resources. While these numbers come from the company itself and should be viewed with appropriate skepticism, they do illustrate the scale and potential impact of the deployment.

The Tools & Actions feature represents an evolution from simple Q&A to action-based AI assistants. A typical workflow example involves a salesperson asking about key initiatives for a prospect, where the assistant could:

- Call CRM APIs to get team information
- Use Google News or DUNS API for recent news
- Query CoreSignal API for hiring trends based on job postings
- Synthesize all this information into actionable sales insights

This expansion in capabilities introduces significant complexity in terms of reliability, debugging, and observability.

## Technical Challenges

The core technical challenge Mendable faced was the "black box" nature of agent execution. When building applications that depend on agentic behavior, reliability and observability become critical concerns. Understanding the key interactions and decisions within an agent loop is inherently tricky, especially when the agent has access to multiple resources and is embedded in a production pipeline.

A specific design feature that introduced complexity was allowing users to create custom tools via API calls. Users could input tags like `&lt;ai-generated-value>` when creating API requests, which the AI would fill at request time based on the user's question and the schema. This "just-in-time" AI input/output pattern created numerous moving parts that were difficult to debug.

Before implementing proper observability tooling, the development process was cluttered with `console.log` statements throughout the codebase and suffered from high-latency debugging runs. Trying to understand why a tool wasn't being called or why an API request had failed became what the author describes as a "nightmare." There was no proper visibility into the agentic behavior or whether custom tools were working as expected.

## LangSmith Integration and Solution

Mendable was already using LangChain's OpenAI tool agents, which made the integration with LangSmith straightforward. LangSmith provided the observability capabilities needed to understand agent behavior in production.

### Tracing and Call Hierarchy Visualization

When tracing is enabled in LangChain, the application captures and displays a detailed visualization of the run's call hierarchy. This feature allows developers to explore:

- Inputs and outputs at each step
- Parameters passed between components
- Response times for individual operations
- Feedback mechanisms
- Token consumption metrics
- Other critical operational metrics

This visibility proved immediately valuable. The case study describes an example where, upon connecting LangSmith to the Tools & Actions module, the team quickly spotted problems that were previously invisible. One trace revealed that a call to `ChatOpenAI` was taking 7.23 seconds—an unusually long time. Upon investigation, they discovered that the prompt had concatenated all of their RAG pipeline prompts and sources with the Tools & Actions content, leading to significant delays in the streaming process. This insight allowed them to optimize which chunks of the prompt needed to be used by the Tools & Actions module, reducing overall latency.

### Tool Inspection and Schema Validation

A particularly valuable aspect of LangSmith's tracing capabilities was the ability to inspect tool inputs. Since Mendable allows users to create custom tools, they needed to ensure that the tool-building process in the UI was both easy and performant. This meant that when a tool was created in the backend, it needed to have the correct schema defined—partially by user input (API request details) and partially by what the AI would automatically provide at request time.

The case study provides an example of a "Recent News Tool" where the query parameter inside `&#123;query: &#123;q&#125;&#125;` was generated by the AI. Ensuring this query was accurate to user intent while also being optimized for the specific tool being used was challenging. LangSmith made it easy to verify this by running the same tool with different queries approximately 20 times and quickly scrolling through traces to confirm output and schema accuracy.

For traces that weren't accurate, the team could either drill deeper into the trace to understand the issue or annotate it within LangSmith for later review. This led to an important insight: the tool descriptions were critical for generating correct schemas and inputs. Armed with this knowledge, they improved the AI-generated portions of tool creation and updated their product to emphasize the importance of providing detailed descriptions when users create tools.

### Dataset Building for Evaluation

As optimization experiments accumulated, the need to quickly save inputs and outputs for further evaluation became apparent. LangSmith's dataset functionality allowed the team to select specific runs and add them to a dataset with a single button click. This created a centralized repository of trace data that could be used for ongoing evaluation, either manually or through LangSmith's built-in evaluation capabilities.

## LLMOps Best Practices Demonstrated

This case study illustrates several important LLMOps best practices:

**Observability as a First-Class Concern**: The transition from console.log debugging to proper tracing infrastructure represents a maturation in how AI applications should be developed and maintained. Production AI systems require visibility into their decision-making processes.

**Performance Optimization Through Visibility**: The 7.23-second latency issue would have been extremely difficult to diagnose without proper tracing. The ability to identify which component was slow and why (prompt concatenation) enabled targeted optimization.

**Iterative Testing and Validation**: Running tools multiple times with different inputs and reviewing traces allowed for systematic quality improvement. This approach is more rigorous than ad-hoc testing.

**Data Collection for Future Evaluation**: Building datasets from production runs creates a foundation for regression testing, A/B testing, and ongoing model evaluation.

**User Experience Considerations**: The insight that tool descriptions are critical for proper AI behavior led to both technical improvements and UX changes to guide users toward better tool creation.

## Limitations and Considerations

It's worth noting that this case study comes from the LangChain blog and was written by a customer of LangSmith, so there is an inherent promotional element. The specific metrics cited ($1.3 million in savings, $3 million projected) are self-reported and not independently verified. The case study also doesn't discuss any limitations or challenges with LangSmith itself, which suggests a somewhat one-sided perspective.

Additionally, the Tools & Actions feature is described as early-stage ("we are still early in the process"), so long-term production reliability data isn't available. The case study focuses primarily on the debugging and development phase rather than ongoing production monitoring and maintenance.

## Conclusion

Mendable's experience demonstrates the critical importance of observability tooling in production LLM applications, particularly for agentic systems that make complex decisions and interact with external APIs. LangSmith provided the visibility needed to move from chaotic debugging to systematic optimization, enabling faster development cycles and more reliable deployments. For teams building similar agentic AI systems, this case study underscores the value of investing in proper tracing and debugging infrastructure early in the development process.