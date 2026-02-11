---
title: "Building Product Copilots: Engineering Challenges and Best Practices"
slug: "building-product-copilots-engineering-challenges-and-best-practices"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f403424d8a6bb4884bbea"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:39:27.197Z"
  createdOn: "2024-11-21T14:14:12.135Z"
llmopsTags:
  - "cache"
  - "chatbot"
  - "code-generation"
  - "compliance"
  - "cost-optimization"
  - "documentation"
  - "error-handling"
  - "fallback-strategies"
  - "guardrails"
  - "human-in-the-loop"
  - "langchain"
  - "microsoft"
  - "monitoring"
  - "openai"
  - "orchestration"
  - "prompt-engineering"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "security"
  - "semantic-search"
  - "structured-output"
  - "system-prompts"
  - "token-optimization"
industryTags: "tech"
company: "Various"
summary: "A comprehensive study examining the challenges faced by 26 professional software engineers in building AI-powered product copilots. The research reveals significant pain points across the entire engineering process, including prompt engineering difficulties, orchestration challenges, testing limitations, and safety concerns. The study provides insights into the need for better tooling, standardized practices, and integrated workflows for developing AI-first applications."
link: "https://arxiv.org/html/2312.14231v1"
year: 2023
seo:
  title: "Various: Building Product Copilots: Engineering Challenges and Best Practices - ZenML LLMOps Database"
  description: "A comprehensive study examining the challenges faced by 26 professional software engineers in building AI-powered product copilots. The research reveals significant pain points across the entire engineering process, including prompt engineering difficulties, orchestration challenges, testing limitations, and safety concerns. The study provides insights into the need for better tooling, standardized practices, and integrated workflows for developing AI-first applications."
  canonical: "https://www.zenml.io/llmops-database/building-product-copilots-engineering-challenges-and-best-practices"
  ogTitle: "Various: Building Product Copilots: Engineering Challenges and Best Practices - ZenML LLMOps Database"
  ogDescription: "A comprehensive study examining the challenges faced by 26 professional software engineers in building AI-powered product copilots. The research reveals significant pain points across the entire engineering process, including prompt engineering difficulties, orchestration challenges, testing limitations, and safety concerns. The study provides insights into the need for better tooling, standardized practices, and integrated workflows for developing AI-first applications."
---

## Summary

This academic research paper from Microsoft and GitHub presents findings from a mixed-methods study involving 26 professional software engineers who are actively building AI-powered "copilot" products. The study was conducted in late 2023 and provides a comprehensive examination of the real-world challenges faced when integrating Large Language Models (LLMs) into production software systems. Unlike marketing materials or vendor documentation, this is an empirical research study with systematic methodology, making it a valuable source for understanding the actual state of LLMOps practices across the industry.

The term "copilot" in this context refers broadly to any software system that translates user actions into prompts for an LLM and transforms the outputs into suitable formats for user interaction. Examples include GitHub Copilot for code generation, Windows Copilot for OS interactions, and Microsoft 365 Copilot for productivity applications.

## Methodology and Participants

The researchers recruited participants through two mechanisms: internal Microsoft engineers working on publicly announced Copilot products (14 participants) and external engineers from various companies recruited via UserInterviews.com (12 participants). Importantly, they screened out engineers with extensive data science or ML backgrounds to be representative of general software engineers encountering AI integration for the first time. They also excluded engineers who merely used AI tools rather than integrating them into products.

The study combined semi-structured interviews (45 minutes each) with structured brainstorming sessions to both identify pain points and collaboratively explore potential solutions. This balanced approach helps mitigate the inherent biases in each methodology.

## Prompt Engineering Challenges

The study found that prompt engineering was fundamentally different from typical software engineering processes, with participants describing it as "more of an art than a science." Several key challenges emerged:

**Trial and Error Nature**: Engineers started in ad hoc environments like OpenAI's playground, bouncing between different tools based on availability. The process was described as "stumbling around" and "playing around with prompts" without structured guidance. As one participant noted, "Experimenting is the most time-consuming if you don't have the right tools."

**Output Wrangling**: Getting consistent, machine-readable output proved extremely difficult. Engineers attempted various tactics like providing JSON schemas for responses, but discovered "a million ways you can effect it." The models would sometimes generate malformed outputs, hallucinate stop tokens, or produce inconsistent formatting. An interesting finding was that working with the model's natural output tendencies (like ASCII tree representations for file structures) yielded better results than forcing specific formats.

**Context and Token Management**: Engineers struggled with providing appropriate context while staying within token limits. Participants described challenges in "distilling a really large dataset" and "selectively truncating" conversation history. Testing the impact of different prompt components on overall performance proved particularly difficult.

**Asset Management**: Prompts evolved into complex libraries of templates, examples, and fragments that needed to be dynamically assembled. While engineers kept these assets in version control, there was no systematic approach to tracking performance over time or validating the impact of changes.

## Orchestration Complexity

Production copilots require sophisticated orchestration beyond simple single-turn interactions:

**Intent Detection and Routing**: Systems needed to first determine user intent from natural language inputs and then route to appropriate "skills" (like adding tests or generating documentation). After receiving model responses, additional processing was needed to interpret and apply the results appropriately.

**Commanding Limitations**: Engineers noted significant gaps between user expectations and actual copilot capabilities. Users expected copilots to perform any available product action, but considerable engineering effort and safety concerns limited open-ended access.

**Agent-Based Approaches**: Some teams explored agent-based architectures for more complex workflows and multi-turn interactions. While more powerful, these approaches were described as having behaviors that are "really hard to manage and steer." Models struggled with recognizing task completion and often got "stuck in loops or went really far off track."

## Testing and Evaluation Challenges

Perhaps the most significant LLMOps challenge identified was testing non-deterministic systems:

**Flaky Tests Everywhere**: Traditional unit testing approaches broke down because each model response could differ. One participant described running "each test 10 times" and only considering it passed if 7 of 10 instances succeeded. Engineers maintained manually curated spreadsheets with hundreds of input/output examples, with multiple acceptable outputs per input. Some teams adopted metamorphic testing approaches focusing on structural properties rather than exact content.

**Benchmark Creation**: No standardized benchmarks existed, forcing each team to create their own. Building manually labeled datasets was described as "mind-numbingly boring and time-consuming," often requiring outsourcing. One team labeled approximately 10,000 responses externally.

**Cost and Resource Constraints**: Running benchmarks through LLM endpoints introduced significant costs ("each test would probably cost 1-2 cents to run, but once you end up with a lot of them, that will start adding up"). Some teams were asked to stop automated testing due to costs or interference with production endpoints.

**Quality Thresholds**: Determining what constitutes "good enough" performance remained elusive. Teams resorted to simple grading schemes (A, B, C, etc.) with averaging to mitigate biases, but lacked established guidelines.

## Safety, Privacy, and Compliance

The study highlighted significant concerns around responsible AI deployment:

**Safety Guardrails**: Engineers described the challenge of preventing off-topic or harmful conversations. One participant noted the stakes: "Windows runs in nuclear power plants." Content filtering on managed endpoints was sometimes insufficient, requiring additional rule-based classifiers and manual blocklists.

**Privacy Constraints**: Processing was needed to ensure outputs didn't contain identifiable information. Some organizations established partnerships with OpenAI for internally hosted models to avoid data ingestion policies that posed compliance risks.

**Telemetry Limitations**: A catch-22 situation emerged where telemetry was needed to understand user interactions, but privacy constraints prevented logging user prompts. Teams could see what skills were used but not what users actually asked.

**Responsible AI Assessments**: These reviews were significantly more intensive than traditional security or privacy reviews, requiring multiple weeks of documentation and assessment work. One team needed to generate automated benchmarks covering hundreds of subcategories of potential harm before shipping.

## Learning and Knowledge Evolution

The study documented significant challenges in building expertise:

**Lack of Established Practices**: Engineers described starting "from scratch" with no established learning paths. They relied heavily on social media communities, examples from others' prompts, and even using GPT-4 itself to bootstrap understanding.

**Knowledge Volatility**: Investment in formal learning resources was limited because "the ecosystem is evolving quickly and moving so fast." There was uncertainty about whether skills like prompt engineering would remain relevant.

**Mindshift Required**: Some engineers experienced fundamental realizations that required abandoning deterministic thinking. As one participant stated: "You cannot expect deterministic responses, and that's terrifying to a lot of people. There is no 100% right answer... The idea of testing is not what you thought it was."

## Developer Experience and Tooling Gaps

**Tool Selection**: While libraries like LangChain offered "basic building blocks and most rich ecosystem" with "clear-cut examples," they were primarily useful for prototypes. Most participants did not adopt LangChain for actual products, citing the learning curve and preference for focusing on customer problems.

**Integration Challenges**: Getting frameworks running required piecing things together manually with "no consistent easy way to have everything up and running in one shot." Behavioral discrepancies between different model hosts added complexity.

**Missing Unified Workflow**: There was "no one opinionated workflow" that integrated prompt engineering, orchestration, testing, benchmarking, and telemetry.

## Proposed Solutions and Opportunities

The study identified several areas for tool improvement:

- **Prompt Linters**: Automated validation against team-defined best practices
- **Prompt Tracing and Optimization**: Techniques inspired by delta-debugging to identify impactful prompt components
- **LLM-Assisted Prompt Writing**: Using GPT-4 as a "sounding board" to detect ambiguities in prompts
- **Automated Benchmark Creation**: Systems to capture and convert user feedback into benchmarks
- **Cost Alerting**: Mechanisms to warn of drastic cost changes from prompt modifications
- **Unified Development Environments**: "One-stop shop" solutions with templates for common applications

## Limitations and Considerations

The researchers acknowledge several limitations: reliance on participant recall, potential for responses reflecting ideal practices rather than actual behavior, and findings that may be specific to the professional contexts and model capabilities available at the time. As models evolve, some challenges may dissipate while new ones emerge.

This study provides valuable empirical grounding for understanding LLMOps challenges, moving beyond anecdotal evidence to systematic documentation of pain points across the production lifecycle.