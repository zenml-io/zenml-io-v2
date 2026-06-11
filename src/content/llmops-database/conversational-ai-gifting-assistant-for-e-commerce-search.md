---
title: "Conversational AI Gifting Assistant for E-commerce Search"
slug: "conversational-ai-gifting-assistant-for-e-commerce-search"
draft: false
llmopsTags:
  - "customer-support"
  - "question-answering"
  - "classification"
  - "chatbot"
  - "prompt-engineering"
  - "agent-based"
  - "memory"
  - "few-shot"
  - "error-handling"
  - "human-in-the-loop"
  - "evals"
  - "langchain"
  - "kubernetes"
  - "postgresql"
  - "cicd"
  - "monitoring"
  - "orchestration"
  - "fastapi"
  - "open-source"
  - "documentation"
  - "openai"
industryTags: "e-commerce"
company: "Etsy"
summary: "Etsy developed a gifting assistant agent to address challenges in searching through their unique, unstructured inventory of handcrafted and vintage items. The agent uses LangChain and LangGraph to enable conversational search, helping shoppers iteratively refine gift recommendations through natural dialogue. The team built the system with a focus on engineering reliability, evaluation rigor, and streamlined deployment, launching a beta version in production within six weeks with a small team of three senior engineers and one designer. Early results showed high-quality search results and relatively high purchase rates in the limited release."
link: "https://www.youtube.com/watch?v=CS5HojyZ5FE"
year: 2026
seo:
  title: "Etsy: Conversational AI Gifting Assistant for E-commerce Search - ZenML LLMOps Database"
  description: "Etsy developed a gifting assistant agent to address challenges in searching through their unique, unstructured inventory of handcrafted and vintage items. The agent uses LangChain and LangGraph to enable conversational search, helping shoppers iteratively refine gift recommendations through natural dialogue. The team built the system with a focus on engineering reliability, evaluation rigor, and streamlined deployment, launching a beta version in production within six weeks with a small team of three senior engineers and one designer. Early results showed high-quality search results and relatively high purchase rates in the limited release."
  canonical: "https://www.zenml.io/llmops-database/conversational-ai-gifting-assistant-for-e-commerce-search"
  ogTitle: "Etsy: Conversational AI Gifting Assistant for E-commerce Search - ZenML LLMOps Database"
  ogDescription: "Etsy developed a gifting assistant agent to address challenges in searching through their unique, unstructured inventory of handcrafted and vintage items. The agent uses LangChain and LangGraph to enable conversational search, helping shoppers iteratively refine gift recommendations through natural dialogue. The team built the system with a focus on engineering reliability, evaluation rigor, and streamlined deployment, launching a beta version in production within six weeks with a small team of three senior engineers and one designer. Early results showed high-quality search results and relatively high purchase rates in the limited release."
notion:
  pageId: "37cf8dff-2538-80e3-8e40-c35c646ca33d"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-11T11:36:00.000Z"
  lastEditedTime: "2026-06-11T11:37:00.000Z"
  publishedAt: "2026-06-11T12:12:44Z"
---

## Overview

Etsy, a two-sided marketplace connecting millions of merchants selling handcrafted or vintage items to over 86 million buyers, developed a conversational AI gifting assistant to tackle unique search challenges inherent to their platform. The company's inventory presents special difficulties because items lack fixed attribute schemas, instead relying on unstructured descriptions that can be cluttered and noisy. Additionally, important product details are often captured in visual elements like listing images, and effective search requires domain expertise across diverse niches ranging from fine arts to fandoms. The Etsy team believed that an agentic approach would be particularly valuable for gifting scenarios, where shoppers often know who they want to buy for but lack specific product ideas. The vision was to create an agent that could collaboratively and iteratively refine recommendations with the shopper to find the perfect gift.

The project was led by Derrick Kondo, an engineer on the GenAI Enablement team, and involved approximately three senior engineers and one designer. The team successfully moved from initial development to a beta production launch in just six weeks, a timeline they attribute to leveraging LangChain abstractions and platform capabilities. Early production results indicated that the agent returns high-quality search results with a relatively thin harness and achieves relatively high purchase rates in the limited release, though specific metrics were not disclosed in the presentation.

## Technical Architecture and Design Philosophy

The team adopted a philosophy of starting as simple as possible and only adding complexity when justified. For the core agent framework, they selected LangChain based on several factors: it was best-in-class and first-to-market in the agentic space, provided agent-native observability and evaluation capabilities, and offered vendor optionality—an important consideration given rising token costs and model capacity issues. The architectural decision to maintain vendor optionality reflects a pragmatic approach to managing LLM operations in production where cost and availability can be significant concerns.

The solution architecture centers on a LangChain v1 ReAct agent, chosen for its balance of abstraction and control. The ReAct pattern involves the model deciding which tools to invoke based on a request, reasoning about the results after invocation, and then either continuing the tool-calling loop or returning a curated list of listing recommendations. The system includes two main points of customization: middleware that can intercept and modify agent behavior, and the tools themselves.

The tool set includes several categories:
- Retrieval tools for searching and viewing listings
- Memory tools for finding and saving information about recipient profiles
- Skills that allow the model to dynamically load instructions on how to use retrieval or memory tools

For long-term memory management of recipient information, the team uses a PostgreSQL key-value store, providing persistent storage of user preferences and recipient profiles across sessions.

## Engineering Challenges and Solutions

### Reliability: Addressing Model Spin

One of the earliest reliability problems the team encountered was what they termed "spin"—repeated tool calls by the model for the same specific tool. To address this, they created middleware with matching conditions and graduated intervention strategies. The middleware monitors for repeated tool calls and intervenes at different severity levels. For example, when the model makes five repeated calls to the search listings tool, the middleware adds instructions to the system prompt telling the model to synthesize its findings or ask the user for more input. If the pattern continues to ten repeated tool calls, the middleware raises an error and asks the user to try again. This graduated approach balances allowing the model flexibility while preventing infinite loops or wasteful computation.

### Reliability: Hallucination of Listing IDs

Another model unreliability issue involved hallucination of listing IDs, where the model would sometimes return truncated or invalid IDs. The solution involved creating a ledger system within the tools. For instance, the search listings tool records all observed listing IDs in a ledger during execution. After the model completes its run, middleware compares the curated set of IDs the model returns with the observed IDs in the ledger and fixes discrepancies in a best-effort manner. This pattern demonstrates a pragmatic approach to handling LLM unreliability through deterministic validation and correction layers.

### Memory Management: Recipient Profile Corruption

The team discovered that the model would sometimes corrupt recipient memory data, such as storing a t-shirt size under the interest field rather than the appropriate size field. To debug and resolve these issues, they created a terminal UI agent debugger that provides visibility into agent state and store interactively while being integrated with Python's native debugger. This tool supports semantic breakpoints, such as breakpoints at specific nodes in the agent graph, in addition to traditional program stack inspection. Using this debugger, the team identified and resolved seven or eight different issues, leading to solutions like creating broader, richer, and more descriptive recipient memory schemas that better guide the model's memory management behavior.

### Frontend Speed: Streaming with Infrastructure Constraints

The team wanted to stream results from the LangGraph agent back to clients for better user experience, but faced infrastructure challenges. Their LangGraph self-deployment existed in a relatively new Kubernetes cluster that they didn't want to expose directly to the internet, as this would require re-implementing authentication endpoints and adding redundant security protections. Meanwhile, their existing longstanding Etsy web cluster ran Apache, which was not designed for long-running requests.

The architecture team developed an innovative socket-passing pattern that allows reuse of existing web infrastructure. When a client request arrives, PHP and the Apache worker authenticate the request as usual, then pass the file descriptor to a long-running daemon running in a sidecar container. After the handoff, the Apache worker is freed and released, while the long-running daemon handles streaming update events back to the client. This solution demonstrates creative problem-solving that respects existing infrastructure constraints while enabling modern streaming capabilities.

## Evaluation Methodology

The team developed a comprehensive evaluation approach covering both the agent trajectory (the path to a result) and the final outcome quality. This two-dimensional evaluation reflects mature thinking about agent systems, recognizing that both the process and the end result matter.

### Trajectory Evaluation

Beyond standard integration and unit tests, the team created pass-K tests for non-deterministic agent behavior. These tests invoke a non-deterministic test K times and ensure that the empirical pass rate exceeds some threshold. For example, given a question about a seller, they have a test that checks whether the agent successfully calls the get-shop tool across multiple invocations. This approach acknowledges the stochastic nature of LLM-based agents while still maintaining quality standards through statistical validation.

### Outcome Evaluation: LLM Judge Alignment

For evaluating final outcomes, the team wanted to ensure that listings were relevant to both the recipient profile and shopper constraints like budget. They recognized the need for an LLM judge aligned to a golden dataset but faced significant methodological challenges:
- How to generate a diverse dataset
- How to align and calibrate human reviewers for consistent labeling
- How to avoid data leakage when training an LLM judge on the golden dataset
- What criteria and metrics to use for validation

Rather than leaving these decisions ad-hoc, the team created an Etsy Agents CLI that leverages LangSmith APIs to streamline the entire evaluation workflow. This tooling operationalizes best practices so they can be used by all engineers, including those who are ML-nascent product engineers rather than ML specialists.

### Dataset Generation

The team built a batch processing capability into the Etsy Agents CLI to run multi-user simulations for dataset generation. This same infrastructure serves multiple purposes beyond evaluation: batch generation for running agents across the entire inventory, and load testing for productionization. The architecture uses parallel and distributed workers that send requests to the agent as a service in LangSmith deployments. Importantly, the same service handles both real-time and batch requests, avoiding offline versus online drift. This ensures consistent governance and observability through LangSmith and follows the DRY (Don't Repeat Yourself) principle by using the same framework for any use case and agent.

### Human Annotation and Calibration

Once the dataset was generated, the merchant team labeled listing relevance for each example. The team emphasized the importance of reviewer calibration to ensure consistent labeling, recommending the use of statistics like Cohen's Kappa to measure alignment while discounting alignment by chance. This is especially important when the distribution of samples across classes is skewed, which is common in relevance labeling tasks.

### Judge Training and Validation

The team created train, validation, and test splits in LangSmith using industry best practices for LLM prompt optimization, specifically a 20/40/40 split ratio. They developed an alignment tool that uses automated prompt optimization techniques such as JEPA (which uses an LLM to reflect on the judge's errors and adjust the prompt accordingly) to align the judge to the golden dataset. The tool outputs standard metrics related to precision and recall. Throughout this process, LangSmith was essential for understanding both the judgments made by the LLM judge and its judgment stability over time.

Once the LLM judge was trained and validated, they could use it with their classification tool to run evaluations on both the holdout set and other production examples, providing ongoing quality monitoring.

## Deployment System

The deployment infrastructure reflects sophisticated DevOps practices adapted for LLM applications. The system operates within an Etsy Agents monorepo, which enables automatic agent project discovery and creates CI/CD pipelines dynamically. The team emphasizes that no Terraform configuration or handwritten pipelines are required—developers only need to specify a YAML file for deployment resources. The build system uses LangSmith deployment APIs to deploy in a scalable and reliable way.

This approach significantly reduces the operational burden of deploying new agents or agent versions, allowing product engineers to focus on application logic rather than infrastructure concerns. The six-week timeline from start to beta production launch suggests that this streamlined deployment approach, combined with LangChain abstractions, significantly accelerated development.

## LLMOps Maturity and Platform Thinking

The case study demonstrates several markers of LLMOps maturity. At the application level, the team ensures reliability through deterministic checks implemented in middleware code. The modularity of this middleware design has forward-looking benefits: as LLMs improve and subsume functionality currently handled by middleware, the modular architecture makes it easy to swap components in and out.

At the platform level, LangSmith provides foundational services and tools, and the team found it straightforward to build integrations and customizations for their internal workloads and systems. The approach of having platform engineers integrated with the product team and co-developing the agent proved effective for defining requirements for integration and platform development, creating a tight feedback loop between platform capabilities and product needs.

## Critical Assessment

While the presentation describes impressive engineering accomplishments and a rapid path to production, some caution is warranted in interpreting the claims. The presenter mentions "high-quality search results" and "relatively high purchase rates" but provides no specific metrics, benchmarks against baseline search, or statistical significance testing. The six-week development timeline is presented as a success story enabled by LangChain, but it's unclear how much of this speed came from the framework versus the team's expertise, existing infrastructure, or the limited scope of a beta release.

The heavy reliance on LangChain and LangSmith creates vendor lock-in risk, even though the team values "vendor optionality" at the LLM model level. While they can swap underlying LLM providers, their entire agent architecture, evaluation pipeline, and deployment system are tightly coupled to the LangChain ecosystem. The long-term implications of this dependency aren't addressed.

The middleware-based solutions for model reliability (handling spin, fixing hallucinated IDs, managing memory corruption) represent workarounds for fundamental model limitations. While pragmatic and necessary for production systems, these patches add complexity and may mask problems that would be better addressed through improved prompting, better model selection, or fundamental architectural changes. The team acknowledges this somewhat by noting that middleware can be removed as models improve, but the current system appears to require significant deterministic scaffolding around the LLM to function reliably.

The evaluation methodology is sophisticated, particularly the LLM judge alignment workflow and the use of pass-K tests for stochastic behavior. However, the reliance on an LLM judge to evaluate LLM outputs introduces potential circularity, and while they mention avoiding data leakage, the specifics of how they validated that their judge genuinely generalizes are not detailed.

The socket-passing pattern for streaming is clever but represents technical debt—a workaround for infrastructure limitations rather than a clean architectural solution. While it unblocks the immediate need, it adds complexity at the boundaries between systems that may create maintenance burden.

Overall, this represents a solid production LLM application with thoughtful engineering and evaluation practices, built rapidly by leveraging an established framework. The team demonstrates awareness of common pitfalls in LLM applications and has developed reasonable mitigations. However, the lack of quantitative results, heavy framework dependency, and reliance on corrective middleware suggest this is an early-stage production system that will likely require continued refinement and possibly architectural evolution as the technology and their understanding of user needs mature.
