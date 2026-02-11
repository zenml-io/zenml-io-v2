---
title: "Building Production AI Agents with Advanced Testing, Voice Architecture, and Multi-Model Orchestration"
slug: "building-production-ai-agents-with-advanced-testing-voice-architecture-and-multi-model-orchestration"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "693fb7653ca588e692ad7689"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:36:29.102Z"
  createdOn: "2025-12-15T07:23:17.101Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "speech-recognition"
  - "realtime-application"
  - "high-stakes-application"
  - "multi-modality"
  - "poc"
  - "rag"
  - "fine-tuning"
  - "prompt-engineering"
  - "few-shot"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "embeddings"
  - "reranking"
  - "system-prompts"
  - "evals"
  - "cicd"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "orchestration"
  - "continuous-integration"
  - "continuous-deployment"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "langchain"
  - "postgresql"
  - "openai"
  - "google-gcp"
  - "anthropic"
  - "meta"
industryTags: "tech"
company: "Sierra"
summary: "Sierra, an AI agent platform company, discusses their comprehensive approach to deploying LLMs in production for customer service automation across voice and chat channels. The company addresses fundamental challenges in productionizing AI agents including non-deterministic behavior, latency requirements, and quality assurance through novel solutions like simulation-based testing that runs thousands of parallel test scenarios, speculative execution for voice latency optimization, and constellation-based multi-model orchestration where 10-20 different models handle various aspects of each conversation. Their outcome-based pricing model aligns incentives with customer success, while their hybrid no-code/code platform enables both business and technical teams to collaboratively build, test, and deploy agents. The platform serves large enterprise customers across multiple industries, with agents handling millions of customer interactions in production environments."
link: "https://www.youtube.com/watch?v=9HmR6eGKNwo"
year: 2025
seo:
  title: "Sierra: Building Production AI Agents with Advanced Testing, Voice Architecture, and Multi-Model Orchestration - ZenML LLMOps Database"
  description: "Sierra, an AI agent platform company, discusses their comprehensive approach to deploying LLMs in production for customer service automation across voice and chat channels. The company addresses fundamental challenges in productionizing AI agents including non-deterministic behavior, latency requirements, and quality assurance through novel solutions like simulation-based testing that runs thousands of parallel test scenarios, speculative execution for voice latency optimization, and constellation-based multi-model orchestration where 10-20 different models handle various aspects of each conversation. Their outcome-based pricing model aligns incentives with customer success, while their hybrid no-code/code platform enables both business and technical teams to collaboratively build, test, and deploy agents. The platform serves large enterprise customers across multiple industries, with agents handling millions of customer interactions in production environments."
  canonical: "https://www.zenml.io/llmops-database/building-production-ai-agents-with-advanced-testing-voice-architecture-and-multi-model-orchestration"
  ogTitle: "Sierra: Building Production AI Agents with Advanced Testing, Voice Architecture, and Multi-Model Orchestration - ZenML LLMOps Database"
  ogDescription: "Sierra, an AI agent platform company, discusses their comprehensive approach to deploying LLMs in production for customer service automation across voice and chat channels. The company addresses fundamental challenges in productionizing AI agents including non-deterministic behavior, latency requirements, and quality assurance through novel solutions like simulation-based testing that runs thousands of parallel test scenarios, speculative execution for voice latency optimization, and constellation-based multi-model orchestration where 10-20 different models handle various aspects of each conversation. Their outcome-based pricing model aligns incentives with customer success, while their hybrid no-code/code platform enables both business and technical teams to collaboratively build, test, and deploy agents. The platform serves large enterprise customers across multiple industries, with agents handling millions of customer interactions in production environments."
---

## Overview

This case study presents Sierra's approach to building and operating production AI agents at enterprise scale, primarily focused on customer service automation. Sierra works with large consumer companies (most with over $1 billion in revenue and millions of customers) to deploy AI agents across both chat and voice channels. The discussion reveals sophisticated LLMOps practices developed through experience with hundreds of customers since early 2023, less than six months after ChatGPT's launch. The company serves notable clients including SiriusXM and Sonos, handling real production traffic across diverse industries and use cases.

## Fundamental Differences from Traditional Software

A core theme throughout the discussion is how LLMOps fundamentally differs from traditional software operations. While traditional software is cheap, fast, reliable, and deterministic, AI systems are expensive to run, relatively slow (getting slower as reasoning capabilities improve), and non-deterministic. This non-determinism brings creativity and flexibility but also introduces hallucination risks. The methodology required at different stages of the development and deployment flywheel differs substantially from traditional software approaches, though interestingly, not everything needs to change—some traditional software engineering practices remain essential.

## Testing and Evaluation Philosophy

Sierra's flagship testing approach centers on "simulations" rather than traditional unit tests. Unlike unit tests that run once and pass or fail deterministically, Sierra's simulations run each conversation scenario 5-15 times to account for non-deterministic behavior. These simulations employ a three-agent architecture: a user agent (simulating customer behavior), the AI agent being tested, and an evaluator agent (LLM-as-judge) that assesses whether conversations meet specific checklists and quality criteria. The system also tracks data changes resulting from conversations, similar to their open-source TaoBench evaluation framework.

Critical simulations run as part of the CI/CD pipeline during commit merges to main or release scheduling. To handle potential slowness, Sierra employs high degrees of parallelism—300 simulations can execute simultaneously rather than sequentially. This parallel execution strategy makes simulation-based testing practical despite the computational overhead.

For voice specifically, simulations incorporate libraries of background noise, various voices, different accents, and microphone quality variations to simulate real-world conditions. Customers like SiriusXM have users calling from cars or busy streets, so testing must account for these environmental factors. Running simulations 5-15 times across 300-400 scenarios provides confidence that agents behave as expected across diverse conditions.

## Red Teaming and Adversarial Testing

Sierra distinguishes between "happy path" simulations and adversarial simulations designed to abuse the agent. They maintain custom models specifically for detecting abuse, with customer-specific configurations reflecting different audience concerns—some customers prioritize detecting self-harm and bullying content, others focus on system hacking attempts. The company takes a practical approach to adversarial testing: while AI models aren't particularly good at imagining terrible things people might say (likely due to model provider guardrails), Sierra uses "verbatim simulations" where they hardcode specific malicious scripts to test against prompt hijacking and other attack vectors.

Importantly, Sierra doesn't rely on AI models to safeguard sensitive information access—they use deterministic systems for access control. The AI agent only accesses information available to the authenticated user, identical to permissions on the website. This tried-and-true software engineering approach ensures that permission boundaries remain deterministic rather than subject to model hallucination or manipulation.

## Voice-Specific Architecture and Latency Optimization

Voice introduces unique challenges that drove significant architectural innovation at Sierra. The team evolved from basic back-and-forth capability to handling sophisticated verbal cues and interruptions. A key insight: interruption isn't objective—someone might be agreeing, encouraging, interrupting, or redirecting conversation. Most automated systems stop and restart regardless of what was said, creating awkward hall-dancing-style interactions. Sierra's agents distinguish between different types of interruptions and understand conversational context to determine turn-taking appropriately.

Latency optimization for voice requires sophisticated approaches. Between a user finishing speaking and the agent responding, Sierra invokes 10-20 different models including embedding models for RAG, frontier models with reasoning tokens for complex reasoning, and fine-tuned fast/cheap classification models for task understanding. Running these serially would be prohibitively slow, so Sierra employs extensive speculative execution and parallel processing.

The speculative execution approach is particularly interesting: the agent might begin retrieving knowledge from a database simultaneously while a smarter model reasons about whether that retrieval is even necessary. If the decision model determines retrieval was needed, the information is already available; otherwise, the speculative work is discarded. This compiler-inspired approach comes from team members with experience building complex systems like the Tornado async Python web server. The architecture evolved primarily for voice latency requirements but now powers all Sierra agents, including chat and email where latency matters less.

## Speech-to-Speech Models and Production Tradeoffs

Sierra maintains a modular architecture supporting both traditional text-to-speech pipelines and newer speech-to-speech models like GPT audio models and Gemini audio models. While the team believes speech-to-speech represents the future—comparing current text-based communication to "passing notes across the table"—production hallucination levels remain too high for larger customers. Text-to-speech remains the most reliable approach for production deployment.

Sierra makes long-term architectural investments supporting speech-to-speech models out-of-the-box despite current limitations. They test each new release (like OpenAI's new real-time audio model) to identify specific languages, customers, and use cases where the technology might work. The expectation is that speech-to-speech will gradually disrupt text-to-speech approaches as quality improves. Transcription remains necessary even with speech-to-speech models since API calls can't be made with voice tokens, so transcription is always part of the pipeline.

## Multi-Model Orchestration ("Constellation")

Sierra employs what they call a "constellation of models"—10-20 different models invoked between receiving user input and generating a response. This ensemble includes embedding models for RAG, frontier models with reasoning capabilities, and fine-tuned classification models. The agent architecture breaks problems into tasks handled by different models, selecting optimal models for each task while executing with high speed through parallelization.

The architecture follows a "goals and guardrails" paradigm rather than rigid decision trees. While decision trees and flowcharts can be useful conceptual tools (analogous to thinking about electron energy levels), the actual implementation is better represented as an "electron cloud"—a web of interconnected models and decisions. Goals define what the agent should accomplish (e.g., help reset a radio, process a payment), while guardrails constrain behavior (allowed offers, truthfulness requirements, regulatory compliance).

## Model Evaluation and Selection

When new models release, Sierra runs comprehensive evaluation suites, but this isn't a simple benchmark process. Different models may perform better with different prompting strategies, few-shot approaches, or fine-tuning configurations. Determining whether a new model's ceiling exceeds the local maximum achieved with previous models requires days or weeks of iterative testing.

For voice across different languages, Sierra maintains a rubric and works with callers who can test models in realistic scenarios for each language and dialect (e.g., Brazilian Portuguese vs. Portugal Portuguese). This human-in-the-loop evaluation approach ensures models don't overfit to synthetic data and remain representative of real-world usage.

## Fine-Tuning Strategy

Sierra uses fine-tuning selectively for high-leverage, specific circumstances—particularly for conversational voice style and tone. Foundation models are primarily trained for chat and AGI objectives rather than low-latency conversational voice experiences. Fine-tuning for style can significantly improve voice agents, but Sierra maintains strict protocols: customer-specific data requires customer-specific models to prevent data leakage, while general tone/style improvements can apply across customers.

The team carefully considers durability—style is appropriate for fine-tuning since brands rarely change tone dramatically, but promotional offers or time-sensitive information should not be encoded in weights since models become outdated when circumstances change. The principle of "right tool for the job" guides decisions about whether solutions belong at the weight level, in agent architecture, in task prompts, or through model selection.

## Continuous Improvement and Learning from Production

Sierra implements systems that learn from production interactions, particularly when agents escalate to human representatives. The platform analyzes post-transfer human actions to detect missing knowledge or standard operating procedures. AI systems author draft articles suggesting knowledge additions based on patterns where 150+ agents mentioned topics the AI agent doesn't understand. This continuous improvement loop addresses a common concern: companies often believe they're "not ready" because their knowledge base isn't comprehensive. Sierra's approach is to launch with appropriate scoping and use the agent itself to identify knowledge gaps, creating a prioritized list of improvements.

This creates an "upward spiral" where business incentives align—large customers have 10+ full-time employees evaluating conversations and identifying improvement opportunities because it's such an important business problem. Sierra's outcome-based pricing model (only charging when agents successfully complete tasks) further aligns incentives. This pricing approach provides early warning of performance issues rather than discovering problems at renewal time, leading to higher NPS scores with customers.

## Platform Architecture: No-Code and Code Integration

Sierra evolved from a primarily developer platform to supporting both no-code and code approaches with isomorphic architecture—users can switch between approaches without one-way doors. Customer service teams can build journeys in no-code, then seamlessly integrate code-based tool implementations when engineers need to implement specific API integrations with streaming or other complex requirements.

This architecture emerged from recognizing that optimal outcomes occur when business stakeholders (who understand goals, metrics, and standard operating procedures) collaborate with technical teams (who handle API connections and complex implementations). The no-code platform abstracts away technical complexity like failing evals while preserving the ability to "drop down" to code for specific needs. Most agents are now built in no-code, with many built directly by customers rather than Sierra employees.

## Enterprise Integration and Change Management

Sierra integrates with enterprise change management processes, including customer-specific release cycles and continuous integration workflows. This integration has been crucial for scaling—some potential customers loved the product but couldn't adopt when it was primarily a developer platform because operations teams needed ownership. Supporting both no-code (for operations/CX teams) and code (for developers) resolved this friction, enabling faster deployment. One of the 10 largest US businesses went from first meeting to production in approximately three months.

## Agent Development Lifecycle

Sierra conceptualizes an "Agent Development Lifecycle" analogous to traditional software development cycles: plan, build, test, release, optimize, analyze, and repeat. However, each step requires first-principles analysis of what changed when using AI systems alongside deterministic systems rather than only deterministic systems. Some steps require opposite approaches from traditional software, some require identical approaches, and some require hybrid methods.

The speaker emphasizes spending nine months as an agent product manager and engineer, working directly with customers to build agents including the first version of SiriusXM's agent. This close customer engagement enabled intuitive understanding of customer pain, celebrating successes, and directly confronting failures. This experiential knowledge informed product development decisions in ways that create more integrated solutions compared to purely theoretical approaches.

## Quality Assurance and Human Oversight

Sierra incorporates sophisticated quality assurance processes including what the speaker describes as "evaluation parties"—gathering entire company floors including non-technical staff to label real agent-customer conversations across multiple metrics. This approach helps business stakeholders understand AI behavior while catching anomalies that engineers might miss but subject matter experts immediately identify as problematic. The company also works with advisors like Will Guidara (author of "Unreasonable Hospitality" and former operator of 11 Madison Park restaurant) who helps evaluate tone and language quality, identifying moments where agents successfully connect with users in ways worth scaling.

## Conversation Tracing and Debugging

Production conversation traces reveal the complexity underneath apparently simple interactions. A single user message might trigger 10-20 model invocations executing in parallel with various dependencies. Sierra built systems that allow developers to understand exactly why decisions were made and fix specific issues without causing regressions elsewhere—addressing the fundamental challenge that LLM decision-making is often opaque and difficult to debug.

## Scaling and Distribution Challenges

The platform addresses the reality that approximately 20% of Google searches have never been made before—representing constantly changing information needs. Similarly, customer service inquiries change daily based on events, outages, promotions, or news. Agents must be truly resilient rather than optimized for narrow distributions. Working with companies that have millions of customers creates different challenges than small-scale deployments, requiring systems that handle long-tail edge cases and novel situations.

## Training and Talent Development

Sierra launched an APX program (Agent Product manager/engineer × entrepreneur) for new graduates, combining engineering, product management, and entrepreneurship over 12 months (originally 18 months, shortened due to rapid pace). The program involves six months in product management and six months in engineering, working directly with customers to build agents. The multidisciplinary structure attracts future entrepreneurs, creating a talent pipeline of people who will likely start companies in 2-10 years. The program draws inspiration from Google's APM program where both Sierra co-founders participated in early classes.

## Hospitality and Service Excellence Principles

Sierra incorporates hospitality principles into agent design through work with Will Guidara, who advises on tone and language. The company aspires to create agents that understand users at the level of three-Michelin-star restaurants like 11 Madison Park, going beyond baseline customer service to create exceptional experiences. Guidara's feedback focuses on identifying "bright spots"—moments where agents successfully connect with users empathetically—and scaling those behaviors across all interactions.

## Outcome Metrics and Business Model Alignment

The outcome-based pricing model where Sierra only charges for successful agent completions creates strong incentive alignment. This turns lagging indicators into leading indicators—Sierra prefers to know immediately when agents underperform rather than discovering issues at renewal time. While this creates financial risk if agents fail at scale, it ensures rapid problem identification and resolution, ultimately creating stronger customer relationships and higher satisfaction.

The model represents a sophisticated approach to LLMOps where technical excellence, business incentives, and customer success create reinforcing feedback loops. The platform enables continuous improvement through production learning, comprehensive testing through simulation, and collaborative development through hybrid no-code/code tooling, all while managing the fundamental non-determinism and latency challenges inherent in production AI systems.