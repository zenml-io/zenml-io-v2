---
title: "Building Evaluation Frameworks for AI Product Managers: A Workshop on Production LLM Testing"
slug: "building-evaluation-frameworks-for-ai-product-managers-a-workshop-on-production-llm-testing"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "695109d8fa62c0d991c8dc7e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-28T10:51:50.806Z"
  createdOn: "2025-12-28T10:43:36.231Z"
llmopsTags:
  - "poc"
  - "chatbot"
  - "prompt-engineering"
  - "few-shot"
  - "human-in-the-loop"
  - "multi-agent-systems"
  - "agent-based"
  - "evals"
  - "error-handling"
  - "langchain"
  - "crewai"
  - "monitoring"
  - "documentation"
  - "fastapi"
  - "wandb"
  - "open-source"
  - "openai"
  - "anthropic"
  - "google-gcp"
  - "microsoft-azure"
industryTags: "tech"
company: "Arize"
summary: "This workshop, presented by Aman, an AI product manager at Arize, addresses the challenge of shipping reliable AI applications in production by establishing evaluation frameworks specifically designed for product managers. The problem identified is that LLMs inherently hallucinate and are non-deterministic, making traditional software testing approaches insufficient. The solution involves implementing \"LLM as a judge\" evaluation systems, building comprehensive datasets, running experiments with prompt variations, and establishing human-in-the-loop validation workflows. The approach demonstrates how product managers can move from \"vibe coding\" to \"thrive coding\" by using data-driven evaluation methods, prompt playgrounds, and continuous monitoring. Results show that systematic evaluation can catch issues like mismatched tone, missing features, and hallucinations before production deployment, though the workshop candidly acknowledges that evaluations themselves require validation and iteration."
link: "https://www.youtube.com/watch?v=2HNSG990Ew8"
year: 2025
seo:
  title: "Arize: Building Evaluation Frameworks for AI Product Managers: A Workshop on Production LLM Testing - ZenML LLMOps Database"
  description: "This workshop, presented by Aman, an AI product manager at Arize, addresses the challenge of shipping reliable AI applications in production by establishing evaluation frameworks specifically designed for product managers. The problem identified is that LLMs inherently hallucinate and are non-deterministic, making traditional software testing approaches insufficient. The solution involves implementing \"LLM as a judge\" evaluation systems, building comprehensive datasets, running experiments with prompt variations, and establishing human-in-the-loop validation workflows. The approach demonstrates how product managers can move from \"vibe coding\" to \"thrive coding\" by using data-driven evaluation methods, prompt playgrounds, and continuous monitoring. Results show that systematic evaluation can catch issues like mismatched tone, missing features, and hallucinations before production deployment, though the workshop candidly acknowledges that evaluations themselves require validation and iteration."
  canonical: "https://www.zenml.io/llmops-database/building-evaluation-frameworks-for-ai-product-managers-a-workshop-on-production-llm-testing"
  ogTitle: "Arize: Building Evaluation Frameworks for AI Product Managers: A Workshop on Production LLM Testing - ZenML LLMOps Database"
  ogDescription: "This workshop, presented by Aman, an AI product manager at Arize, addresses the challenge of shipping reliable AI applications in production by establishing evaluation frameworks specifically designed for product managers. The problem identified is that LLMs inherently hallucinate and are non-deterministic, making traditional software testing approaches insufficient. The solution involves implementing \"LLM as a judge\" evaluation systems, building comprehensive datasets, running experiments with prompt variations, and establishing human-in-the-loop validation workflows. The approach demonstrates how product managers can move from \"vibe coding\" to \"thrive coding\" by using data-driven evaluation methods, prompt playgrounds, and continuous monitoring. Results show that systematic evaluation can catch issues like mismatched tone, missing features, and hallucinations before production deployment, though the workshop candidly acknowledges that evaluations themselves require validation and iteration."
---

## Overview

This case study emerges from a workshop led by Aman, an AI product manager at Arize, delivered at what appears to be an AI engineering conference. The session focuses on establishing evaluation frameworks for AI product managers working with LLM-based applications in production. Aman brings a unique background, having started as an engineer working on self-driving cars at Cruise in 2018-2019, where he became a PM for evaluation systems, then moved to Spotify to work on ML platforms and recommender systems using embeddings, before joining Arize where he has worked for approximately three and a half years on evaluation systems for both traditional ML and generative AI applications.

The workshop is particularly notable because it addresses a critical gap in LLMOps: how product managers, who may not have deep engineering access or expertise, can still meaningfully participate in and drive the evaluation of AI systems. The presentation acknowledges a fundamental shift in expectations for product managers, where stakeholders now expect higher-resolution specifications and more technical competence when working with AI engineers.

## The Core Problem: Non-Determinism and Hallucination

The workshop begins by establishing why traditional software testing approaches fail with LLM applications. Aman frames this around three key differences:

**Determinism vs Non-Determinism**: Traditional software is deterministic (1 + 1 always equals 2), while LLM agents are non-deterministic and can be manipulated to agree with incorrect statements (if convinced, they'll say 1 + 1 equals 3). This fundamental property makes unit testing approaches insufficient.

**Multiple Execution Paths**: LLM agents can take multiple paths to accomplish tasks, unlike traditional code which follows predictable execution flows. Interestingly, Aman notes that you actually want agents to "hallucinate in the right way" - meaning creative generation is desirable, but needs to be constrained and validated.

**Data Dependency**: While traditional integration tests rely on existing codebases and documentation, agent-based systems rely heavily on enterprise data. This data becomes a key differentiator and must be incorporated into evaluation approaches.

Critically, Aman emphasizes that even the chief product officers at OpenAI (Kevin) and Anthropic (Mike) openly acknowledge that their models hallucinate and that writing evaluations is essential. This represents approximately 95% of the LLM market share telling customers their products aren't fully reliable. Greg Brockman from OpenAI and industry observers like Gary Tan note that evaluations are emerging as a real competitive moat for AI startups.

## The Evaluation Framework: LLM as a Judge

The workshop introduces "LLM as a judge" as the primary scalable evaluation approach. The anatomy of an evaluation consists of four components:

**Role Setting**: Defining what the evaluation agent's purpose is
**Task Definition**: Specifying what needs to be evaluated
**Context Provision**: Providing the actual text or output to evaluate (shown in curly braces as variables)
**Goal and Terminology**: Defining what constitutes good vs bad outputs with specific labels

An example toxicity evaluation is presented where the system examines text and classifies it as "toxic" or "not toxic" based on defined criteria.

A critical technical insight shared is about scoring: Product managers often want to ask the LLM to provide numerical scores (e.g., 1-5 ratings), but this approach is problematic because even advanced LLMs are "really bad at numbers" due to how tokens are represented. The recommended approach is to use text labels that can then be mapped to scores programmatically if needed. Arize has research demonstrating this at scale across most models.

The workshop distinguishes between three types of evaluations:
- **LLM as a judge**: Using an LLM to evaluate outputs (the focus of the workshop)
- **Code-based evaluation**: Using deterministic code to check outputs
- **Human annotations**: Manual review by subject matter experts

## Practical Implementation: The AI Trip Planner Example

The workshop includes a live-coded demonstration building an AI trip planner using a multi-agent architecture. This example is significant because it moves beyond chatbot patterns to demonstrate form-based inputs feeding into agent systems that could incorporate retrieval, RAG, or tool calling underneath.

**The Architecture**: The system uses multiple specialized agents:
- A research agent
- A budget agent  
- A local experiences agent
- An itinerary agent that synthesizes outputs from the other three

This architecture is built using LangGraph (the workshop also references Crew AI as another agent framework option). The form accepts inputs like destination (Tokyo), duration (7 days), budget ($1,000), interests (food), and travel style (adventurous).

**Why Multi-Agent Matters**: While a user could paste these requirements into ChatGPT, the structured approach allows for sophisticated backend operations. For example, the budget constraint requires mathematical calculations and accounting logic that gets consistently applied. The interest parameters can trigger specific retrieval or tool-calling behaviors. The parallel execution of research, budget, and local experience agents feeding into a synthesis agent demonstrates production-grade agent orchestration.

## Observability and Tracing

A crucial LLMOps component introduced is comprehensive tracing and visualization. The Arize platform provides:

**Traces and Spans**: Every request generates a trace consisting of spans (units of work with timing information). Each span has a type: agent, tool, or LLM. This follows the OpenTelemetry standard, which means instrumentation isn't locked into proprietary formats.

**Agent Visualization**: The platform generates visual representations of agent architectures showing the flow from user input through parallel agent execution to final synthesis. This allows product managers and engineers to understand system behavior at an aggregate level rather than just seeing function calls in code.

**Production Data Inspection**: The system captures input, output, and metadata for each request. This includes not just the final response but the intermediate steps, which agents were invoked, what tools were called, and the latency characteristics of each component.

The workshop emphasizes this as a critical capability for product managers: being able to ask engineering teams "what does our agent actually look like?" and getting clear visualizations rather than needing to parse code.

## Prompt Engineering and Iteration Workflow

One of the most practical LLMOps workflows demonstrated is the prompt playground capability. This allows taking production traces with all their variable values and pulling them into an interactive environment for iteration.

**The Workflow**:
- Production traces are captured with all prompt variables (destination, duration, travel style, etc.)
- A specific trace can be selected and opened in a prompt playground
- All variables are automatically populated from the production request
- The prompt template can be modified directly in the UI
- Different variables can be tested without changing code
- Results can be compared across model versions (e.g., GPT-4o vs GPT-4o-mini)

**The PM Responsibility Question**: Aman poses a thought-provoking question: should writing prompts be the responsibility of engineers or product managers? Since product managers are ultimately responsible for the final product experience, they may need more control over prompts than traditional role boundaries suggest. This challenges conventional PM/engineering divisions of labor.

In the live demo, Aman modifies a prompt to:
- Reduce verbosity (keep output to 500 characters or less)
- Change the tone (make it "super friendly")
- Add a marketing component (always offer a discount if user provides email)

The system allows running these variations immediately and comparing outputs, though Aman candidly notes that with just one example, "there's no way that a system like this scales" - you need systematic evaluation across datasets.

## Dataset Management and Experimentation

The workshop demonstrates moving from single-example iteration to systematic evaluation:

**Dataset Creation**: Production traces can be selected and added to datasets. These datasets function like structured collections (essentially spreadsheets) where examples can be annotated and used for repeated evaluation.

**Experiments**: The platform supports A/B testing of prompts across entire datasets. For example, running "Prompt A" (baseline) versus "Prompt B" (modified with new instructions) across 12 examples simultaneously. Each experiment generates metrics comparing the variations.

**Synthetic Data**: Aman mentions using Cursor AI to generate synthetic test data by hitting the same server to create 15 different itineraries for testing purposes. This demonstrates using AI tools to bootstrap evaluation datasets when production data is limited.

**Version Control for Prompts**: The system includes a "prompt hub" functioning like a GitHub repository for prompts, allowing teams to save versions, compare them, and even use specific versions in production code. This addresses prompt management, a common gap in LLMOps workflows.

## Human-in-the-Loop Validation

A critical insight shared is that "you need evals for your evals" - LLM judges cannot be blindly trusted. The workshop demonstrates a complete workflow:

**Initial LLM Evaluation**: Running automated evaluations across a dataset (e.g., classifying responses as "friendly" or "robotic")

**Human Labeling Queue**: Product managers and subject matter experts can review examples in a labeling interface and provide ground truth annotations. These labels are applied back to the dataset automatically.

**Evaluation of Evaluations**: A meta-evaluation checks whether LLM judge labels match human labels. In the live demo, a "friendly" evaluation showed only ~8% agreement with human labels, indicating the evaluation itself needed improvement.

The workflow revealed that the initial "friendly vs robotic" evaluation was failing to match human judgment. This led to identifying specific improvements needed:
- Adding few-shot examples to the evaluation prompt
- Making the criteria more strict and specific
- Using the AI copilot within the platform to help rewrite evaluation prompts

Aman emphasizes that teams should not be "ashamed" of starting with spreadsheet-based evaluation - having human labels is better than no evaluation at all. The goal is to make human annotation scalable through LLM judges, not to eliminate it entirely.

## Advanced LLMOps Patterns

Several advanced patterns were discussed, either in the demo or during Q&A:

**Tool Calling Evaluation**: Beyond evaluating text outputs, the system can evaluate whether agents selected and used the correct tools. This wasn't demonstrated in detail but Arize has separate materials on this topic.

**Continuous Production Evaluation**: Evaluations can run not just on static datasets but on all incoming production data, automatically labeling and classifying requests. This enables:
- Detecting distribution drift (new types of requests not seen before)
- Identifying "hard examples" where the system has low confidence
- Building datasets of edge cases for targeted improvement

**Prompt Chaining**: For complex workflows where Prompt A feeds into Prompt B which feeds into Prompt C, the ability to test the entire chain (coming soon to the platform) rather than individual prompts in isolation.

**Temperature Tuning**: When LLM judges show high variance, lowering the temperature parameter makes responses more repeatable, though it doesn't eliminate variance entirely. Another option is running evaluations multiple times to profile the judge's variance.

**Custom Model Endpoints**: The platform supports using any model provider (OpenAI, Azure, Google) or custom model endpoints including specialized models like BERT or ALBERT for specific evaluation tasks.

## The Development Lifecycle: From Prototype to Production

Aman presents a conceptual loop for AI product development:

**Development Phase**: Start with small datasets (even 10 examples), run initial evaluations, iterate on prompts and models. This phase is not statistically significant and won't convince stakeholders to ship, but it's essential for initial validation.

**Curation and Iteration**: Build up datasets, continue experiments, refine evaluations until the team feels confident enough to ship. This phase involves getting team alignment on what "good enough" means.

**Production Deployment**: Once live, run evaluations on production data continuously. This will reveal new edge cases and failure modes not anticipated during development.

**Feedback Loop**: Take production examples (especially failures) and add them back to development datasets for further iteration.

He provides a compelling analogy from his self-driving car experience at Cruise: Initially, the car could barely drive one block. Once that worked, they built evaluation datasets for straight roads. Once straight roads worked, they needed datasets for left turns. Once left turns worked, they needed datasets for left turns with pedestrians nearby. The point is that you discover what needs evaluation only after shipping and encountering real-world scenarios.

The acceptable bar for production depends heavily on industry context - healthcare and legal tech require much higher confidence than a travel planning application.

## Instrumentation and Integration

The technical implementation uses open standards:

**OpenTelemetry Foundation**: Arize is built on OpenTelemetry conventions for tracing, meaning instrumentation isn't vendor-locked. Teams keep their trace data even if they stop using Arize.

**Auto-Instrumentation**: For common frameworks like LangGraph or LangChain, instrumentation can be as simple as:
```python
pip install arize-phoenix arize-otel
langchain_instrument()
```

This single line knows where to intercept in the code to structure logs appropriately.

**Custom Instrumentation**: For specific functions or components not automatically captured, developers can add function decorators to trace additional spans.

**Metadata Enrichment**: Beyond basic timing and latency data (what traditional observability tools like DataDog provide), the system captures LLM-specific metadata like user IDs, session IDs, multi-turn conversation context, and structured representations of agent actions. This enrichment enables the visualizations and analysis capabilities shown.

## Team Dynamics and Organizational Insights

Several noteworthy observations about how LLMOps changes team structures:

**Faster Development Cycles**: The ability to go from idea to updated prompt to production deployment has compressed to single-day iterations in some cases, far faster than traditional software development.

**PM Technical Expectations**: There's a clear shift toward expecting product managers to be more technically literate, able to interact with codebases using AI tools like Cursor, and capable of building working prototypes independently.

**The "Vibe Coding to Thrive Coding" Paradigm**: Aman contrasts "vibe coding" (building something that looks good without systematic validation) with "thrive coding" (using data and evaluation to have confidence in what's being shipped). Prototyping with tools like Bolt or Lovable is fine for experiments, but production systems require rigorous evaluation.

**Influence Through Demonstration**: For PMs without code access, the recommendation is to build impressive prototypes that demonstrate what's possible, thereby earning the right to push organizational boundaries around PM technical involvement.

**Skills Over Roles**: Aman proposes thinking about team members as having "skill stacks" (like baseball cards) rather than rigid roles. Someone might love talking to customers but hate being on-call for production issues, while another person loves shipping high-quality code and being responsible during outages. Complementary skill matching may be more important than traditional role definitions.

**Public Learning**: At Arize, town halls feature employees demoing what they're building with AI, creating company-wide awareness of possibilities and catalyzing adoption across teams.

## Critical Assessment and Limitations

The workshop includes several honest acknowledgments of limitations:

**Demo Brittleness**: Aman openly states the code repository was being updated "up until this very moment" and "there's a decent likelihood" it's broken. This reflects the reality of rapidly evolving tooling and frameworks.

**Evaluation Complexity**: The live demo showed the "friendly vs robotic" evaluation failing to match human judgment - a candid admission that writing good evaluations is hard and requires iteration.

**Not a Complete Solution**: The trip planner is explicitly described as a "toy example" not representative of production sophistication. The focus is on demonstrating workflows, not claiming perfect implementations.

**The Infinite Regression Problem**: You need evaluations for your agents, then evaluations for your evaluations, then ways to validate those meta-evaluations. At some point, human judgment remains necessary - you cannot fully automate trust.

**Statistical Significance**: Ten or twelve examples in a dataset is explicitly noted as insufficient for confident production deployment. The workshop doesn't provide clear guidance on how many examples are "enough," noting it depends heavily on business context and risk tolerance.

**Model Limitations with Numbers**: Even advanced LLMs struggle with numerical reasoning due to tokenization, requiring workarounds like mapping text labels to scores rather than asking for direct numerical outputs.

## Practical Takeaways for LLMOps Practitioners

The workshop concludes with several actionable insights:

**Start Simple**: Begin with spreadsheet-based evaluation and human labels. Being able to systematically review outputs is better than having no process at all.

**Visualization Matters**: Being able to see agent architectures, trace flows, and system behavior at an aggregate level provides crucial insights that code alone doesn't reveal.

**Iterate on Evaluations**: Just as you iterate on prompts and models, plan to iterate on evaluation criteria and implementations. First versions will likely be wrong.

**Use Production Data**: The ability to take real production traces and replay them with variations is more valuable than synthetic testing alone.

**Build Datasets Incrementally**: You won't know what edge cases matter until you encounter them in production. Plan to continuously grow evaluation datasets based on real-world failures.

**Enable PM Technical Participation**: Giving product managers tools like prompt playgrounds, no-code evaluation interfaces, and data export capabilities allows them to contribute without full code access.

**Evaluations as Requirements**: Consider providing evaluation specifications and test datasets as product requirements rather than traditional PRDs - this gives engineering teams clearer acceptance criteria for AI features.

The workshop represents a practical, hands-on approach to LLMOps that acknowledges both the power and limitations of current evaluation methodologies while providing concrete workflows that teams can implement today. The emphasis on human-in-the-loop validation, systematic dataset building, and cross-functional tooling addresses real gaps in how organizations are deploying LLM applications to production.