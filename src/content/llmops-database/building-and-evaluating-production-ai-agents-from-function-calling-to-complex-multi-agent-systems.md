---
title: "Building and Evaluating Production AI Agents: From Function Calling to Complex Multi-Agent Systems"
slug: "building-and-evaluating-production-ai-agents-from-function-calling-to-complex-multi-agent-systems"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "692429e8d0a8bbce012817a4"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:27:33.093Z"
  createdOn: "2025-11-24T09:48:24.536Z"
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "summarization"
  - "question-answering"
  - "poc"
  - "content-moderation"
  - "data-analysis"
  - "prompt-engineering"
  - "few-shot"
  - "agent-based"
  - "multi-agent-systems"
  - "fine-tuning"
  - "instruction-tuning"
  - "human-in-the-loop"
  - "error-handling"
  - "latency-optimization"
  - "evals"
  - "docker"
  - "langchain"
  - "llama-index"
  - "pytorch"
  - "fastapi"
  - "wandb"
  - "monitoring"
  - "open-source"
  - "documentation"
  - "google-gcp"
  - "anthropic"
  - "openai"
  - "meta"
  - "hugging-face"
industryTags: "tech"
company: "Google Deepmind"
summary: "This case study explores the evolution of LLM-based systems in production through discussions with Raven Kumar from Google DeepMind about building products like Notebook LM, Project Mariner, and working with the Gemini and Gemma model families. The conversation covers the rapid progression from simple function calling to complex agentic systems capable of multi-step reasoning, the critical importance of evaluation harnesses as competitive advantages, and practical considerations around context engineering, tool orchestration, and model selection. Key insights include how model improvements are causing teams to repeatedly rebuild agent architectures, the importance of shipping products quickly to learn from real users, and strategies for evaluating increasingly complex multi-modal agentic systems across different scales from edge devices to cloud-based deployments."
link: "https://www.youtube.com/watch?v=CloimQsQuJM"
year: 2025
seo:
  title: "Google Deepmind: Building and Evaluating Production AI Agents: From Function Calling to Complex Multi-Agent Systems - ZenML LLMOps Database"
  description: "This case study explores the evolution of LLM-based systems in production through discussions with Raven Kumar from Google DeepMind about building products like Notebook LM, Project Mariner, and working with the Gemini and Gemma model families. The conversation covers the rapid progression from simple function calling to complex agentic systems capable of multi-step reasoning, the critical importance of evaluation harnesses as competitive advantages, and practical considerations around context engineering, tool orchestration, and model selection. Key insights include how model improvements are causing teams to repeatedly rebuild agent architectures, the importance of shipping products quickly to learn from real users, and strategies for evaluating increasingly complex multi-modal agentic systems across different scales from edge devices to cloud-based deployments."
  canonical: "https://www.zenml.io/llmops-database/building-and-evaluating-production-ai-agents-from-function-calling-to-complex-multi-agent-systems"
  ogTitle: "Google Deepmind: Building and Evaluating Production AI Agents: From Function Calling to Complex Multi-Agent Systems - ZenML LLMOps Database"
  ogDescription: "This case study explores the evolution of LLM-based systems in production through discussions with Raven Kumar from Google DeepMind about building products like Notebook LM, Project Mariner, and working with the Gemini and Gemma model families. The conversation covers the rapid progression from simple function calling to complex agentic systems capable of multi-step reasoning, the critical importance of evaluation harnesses as competitive advantages, and practical considerations around context engineering, tool orchestration, and model selection. Key insights include how model improvements are causing teams to repeatedly rebuild agent architectures, the importance of shipping products quickly to learn from real users, and strategies for evaluating increasingly complex multi-modal agentic systems across different scales from edge devices to cloud-based deployments."
---

## Overview

This case study emerges from a podcast conversation between Hugo Bowne-Anderson and Raven Kumar, a researcher at Google DeepMind who has worked on the Gemini and Gemma model families and contributed to products including Notebook LM, Project Mariner, and other AI applications. The discussion provides deep insights into how Google and the broader AI community are building production LLM systems, with particular focus on agentic capabilities, evaluation strategies, and the rapid pace of change forcing continuous architectural redesign.

The conversation is particularly valuable because it captures a moment of significant transition in the field—recorded immediately after the Gemini 3.0 release—and demonstrates how quickly LLMOps practices must evolve. Kumar provides both high-level product thinking and granular technical details about building reliable AI systems at scale, informed by a decade of experience moving from probabilistic Bayesian models at organizations like SpaceX to modern LLM-based products.

## The Evolution of LLM Capabilities and Agent Architecture

Kumar traces the evolution of language models through three distinct modalities that fundamentally shape how they're deployed in production. The first generation consisted of "completion LLMs" exemplified by GPT-2, which simply finished text sequences. These evolved into "instruction-tuned" or "chat" models like ChatGPT and Gemini, which most users interact with today through natural language interfaces. The third modality introduced "function calling" or "tool calling" capabilities, first released by OpenAI in January 2023, which enabled LLMs to interact with external systems through structured API calls.

The implications for production systems have been profound. Function calling introduced fundamentally more complex interaction patterns than simple chat interfaces. As Kumar explains, even the simplest tool-calling scenario requires multiple LLM invocations: first to determine whether a tool should be called and generate the appropriate parameters, then to process the tool's response and provide a natural language answer. This immediately doubles the evaluation complexity compared to single-turn interactions.

The pace of capability improvement has been extraordinary. Kumar notes that Gemini 1.0 was released in December 2023, with tool calling support possibly arriving only with Gemini 1.5 in February 2024. Within just 17 months, the models progressed from basic two-turn tool interactions to complex multi-step reasoning. With Gemini 3.0, the models can work on problems for six to seven minutes, making multiple tool calls, detecting and fixing errors, and rewriting code multiple times before arriving at solutions. This represents a qualitative shift from precision-based quick responses to self-sufficient behavior solving complex tasks over extended time horizons.

## The Continuous Rebuild Cycle

One of the most striking revelations concerns how model improvements are forcing continuous architectural changes in production systems. Kumar describes rewriting agentic harnesses (the orchestration code around models) three times in three years as Gemini improved. The pattern involves removing defensive coding and checks that are no longer necessary as models become more capable of self-correction, while simultaneously adding new complexity to handle increasingly sophisticated use cases.

This phenomenon extends beyond Google. Kumar references external products like Claude Code and Manis that have reportedly "ripped out" and rebuilt their core functionality five times in a single year. The agent harness—essentially the scaffolding of tool calls, error handling, and orchestration logic—becomes obsolete as models gain native capabilities that previously required explicit programming. However, this isn't simple feature deletion; it's a shifting window where old complexity is removed while new capabilities enable more ambitious applications requiring different types of orchestration.

This creates a challenging environment for production LLM teams. Traditional software development assumes relatively stable foundations, but LLMOps currently requires maintaining systems where core capabilities fundamentally change on a quarterly or faster cadence. Evaluation harnesses become critical not just for quality assurance but for rapidly determining which architectural components can be safely removed and which new capabilities can be reliably leveraged.

## Evaluation as Competitive Advantage

The conversation places exceptional emphasis on evaluation infrastructure as potentially the most important competitive differentiator in LLMOps. Kumar articulates evaluation harnesses as "repeatable ways to understand eval results"—structured, automated systems for testing that move beyond manual "vibe checking" to rigorous, computer-assisted assessment.

The progression from informal to formal evaluation mirrors traditional software testing but with unique LLM characteristics. Kumar uses food preparation analogies to illustrate: making a simple sandwich initially involves vibing whether it tastes good, but professional chefs take structured notes on ingredients and techniques. For LLM systems, this structure becomes essential because human evaluation is inconsistent (you might have a cold one day, or be full from another meal, affecting judgment) and time-intensive when done manually.

A basic evaluation harness consists of Python scripts with code-based checks and potentially LLM-as-judge components, plus a gold standard dataset of expected inputs and outputs. However, agent evaluation introduces significantly more complexity. Even the simplest function-calling workflow requires evaluating both whether the correct tool was called with appropriate parameters and whether the subsequent natural language response appropriately incorporated the tool's results.

Kumar emphasizes that evaluation complexity scales with system complexity. For multi-agent systems or those using multiple tools, evaluation must occur at multiple levels: end-to-end product experience, individual component performance (like retrieval quality separate from generation quality), tool selection accuracy across different numbers and types of available functions, and behavior across multiple reasoning steps in complex multi-hop scenarios. The analogy to classic search and retrieval evaluation is instructive—just as one might evaluate recall and precision at K for search results before assessing overall generation quality, agent systems require hierarchical evaluation strategies.

The strategic value of robust evaluation infrastructure manifests in several ways. First, it enables rapid iteration by providing immediate feedback on changes. Second, it creates institutional knowledge about model behavior that persists as team members change. Third, it allows teams to quickly assess new model versions and make informed decisions about architectural simplification. Kumar notes that with each Gemini release, they run existing evaluation harnesses to determine what can be removed, what needs adjustment, and what new capabilities can be exploited.

## Product Development Philosophy and User Learning

Kumar articulates a pragmatic philosophy for shipping LLM products that balances preparation with speed to market. The approach involves getting systems "good enough" through internal evaluation and vibe testing, then releasing quickly to learn from real users. The rationale is that user behavior invariably differs from builder expectations, and real-world usage reveals both positive opportunities (unexpected use cases worth supporting) and negative issues (failure modes not anticipated during development).

The Notebook LM audio overview feature provides a concrete example. The initial release featured a single-button interface with no customization—users received whatever the system generated. After launch, the team discovered strong user demand for more control over the generated podcasts, leading to iterative feature additions around customization. Conversely, they also discovered failure modes (like hallucinations or cultural mistakes) that weren't apparent in pre-launch testing with limited perspectives.

This creates a feedback loop where user data informs evaluation set expansion. When users from Australia or New Zealand encounter issues with culturally-specific content (Kumar's running example involves Vegemite versus Marmite confusion), these scenarios get added to the evaluation harness. The infrastructure built pre-launch makes it straightforward to add new test cases, verify fixes, and rapidly deploy improvements. The competitive advantage emerges from the velocity of this cycle: evaluation infrastructure → user feedback → evaluation expansion → fix → verification → deployment.

Kumar also emphasizes starting with fundamentals when learning agent development. He strongly recommends implementing basic function calling (like a weather API example) from scratch using open models like Gemma, even if production systems will use different models. This hands-on experience reveals the "leaky abstractions" in LLM systems—the complexity hidden beneath polished interfaces that becomes critical when debugging production issues or optimizing performance.

## Context Engineering and Management

Context window management represents a fascinating area where rapid model improvements have dramatically simplified production systems. Kumar traces the evolution from early models with 4K token limits (requiring extensive manual context management in Python) through 8K, 32K, 128K windows to current million-token-plus capabilities. Each expansion enabled removal of context management code, simplifying systems and reducing failure modes.

However, larger context windows don't eliminate all challenges. Kumar discusses "needle in a haystack" testing—inserting specific facts at various positions in long contexts to assess retrieval reliability. This evaluation informed prompt engineering decisions about where to place critical information (beginning versus end of context) based on model-specific performance characteristics. Importantly, Kumar characterizes this as understanding system limitations to structure inputs appropriately rather than requiring users to manage context placement manually.

The discussion acknowledges research showing that context utilization degrades with distractors even when retrieval of isolated facts succeeds—what some researchers call "context rot." Kumar's response emphasizes that effective evaluation must reflect actual use cases. Notebook LM, for instance, involves highly curated, high-signal sources where context degradation is less problematic. A meeting summarizer aggregating multiple participant inputs might face more severe issues. This reinforces that teams must build custom evaluations matching their specific application characteristics rather than relying solely on benchmark metrics.

Current models like Gemini 3.0 demonstrate improved ability to maintain coherence across long contexts without extensive engineering. Kumar notes that defensive prompting techniques and context management code are increasingly unnecessary, allowing teams to simply provide full context and trust the model to extract relevant information. This represents another instance of the architectural simplification enabled by capability improvements.

## Tool Use and Function Calling at Scale

The progression of tool-use capabilities illuminates key production considerations. Early models struggled with even two to five simultaneous tools, frequently selecting inappropriate functions or becoming confused between options. Current models handle ten or more functions reliably, differentiating between diverse capabilities like weather retrieval, email composition, slide deck creation, coding assistance, terminal commands, browser interaction, and even robotics control.

Kumar provides a taxonomy of tool complexity that informs evaluation strategy. Some APIs are straightforward (like Pandas plotting), while others are intricate (like D3.js visualization). An agent designed to automatically visualize spreadsheets must be evaluated on both extremes—can it effectively use simple interfaces and complex ones? Similarly, modern tools include not just traditional APIs but entire execution environments (coding tools, terminal access, browser automation).

The discussion reveals sophisticated tool-use behaviors emerging in latest models. Gemini 3.0 exhibits self-correction when tool calls fail due to environmental issues (API rate limits, authentication failures, malformed responses) rather than requiring explicit retry logic in the agent harness. This capability would have required manual detection and handling code just a year prior. Kumar notes explicitly removing Python-based failure detection logic because models now handle these situations autonomously.

An interesting observation concerns tool parameter intelligence. When provided good tool descriptions, modern LLMs perform implicit transformations—for example, converting "Sydney" to latitude/longitude coordinates when an API requires numerical location parameters, without explicit instruction to do so. This demonstrates sophisticated reasoning about API requirements and reduces the need for multi-step workflows where one tool performs format conversions before invoking another.

The conversation also touches on tool use in multimodal contexts. Systems like Stitch (Google's UI design agent) work with both code and image outputs. Evaluation for such systems must encompass multiple modalities—not just text inputs and outputs but image quality assessment, appropriateness of visual edits, and coherence between code and visual results. Kumar suggests the fundamental evaluation principles remain constant (gold standard inputs, structured assessment, automated execution) but complexity increases with modality diversity.

## Multi-Agent Architectures and Orchestration

Kumar addresses emerging architectures where orchestrator agents spin up sub-agents and manage context distribution between them. While acknowledging he hasn't directly built such systems, he articulates an evaluation philosophy based on multi-level assessment. At the product level, does the multi-agent system accomplish tasks better than single-model alternatives or different architectures? At the component level, does each sub-agent perform its specific function effectively (context compression, specialized reasoning, domain-specific generation)?

The motivation for these architectures includes both capability specialization and context management. An orchestrator might offload context to a sub-agent that compresses, summarizes, or extracts relevant information before passing results back, managing the "context rot" problem where full utilization of large context windows shows degradation. This allows working within effective context limits while maintaining access to large information sources.

Kumar suggests that evaluation for multi-agent systems requires hierarchical thinking—understanding how component evaluations "roll up" to overall system assessment. This mirrors traditional distributed systems testing where unit tests, integration tests, and end-to-end tests each serve distinct purposes. The key insight is that robust component evaluation provides diagnostic capability when end-to-end metrics show problems, enabling rapid identification of which sub-system requires attention.

The conversation also references external products like Anthropic's research agent that employs orchestration patterns. Kumar notes that examining traces from such systems—literally looking at what agents do step-by-step—reveals failure modes not apparent from high-level metrics. In one example, sub-agents were frequently summarizing low-quality SEO content, a problem only visible through human inspection of intermediate steps that then informed targeted fixes.

## The Two Cultures of Agents

An important conceptual framework emerges around what Kumar and Bowne-Anderson term "the two cultures of agents." The first culture emphasizes deterministic workflows with explicit orchestration—the approach documented in Anthropic's widely-referenced blog post about building effective agents. This involves prompt chaining, routing, evaluator-optimizer patterns, and other structured techniques that provide reliability and predictability. Systems built this way use LLMs as components within larger programmatic workflows.

The second culture embraces high-agency autonomous systems where LLMs operate with substantial freedom over extended periods. This approach accepts less consistency and reliability in exchange for more ambitious capabilities, but requires strong human supervision. Kumar uses AI-assisted coding as an example: he wouldn't characterize it as consistent or reliable, but with active oversight it provides immense value. The key is matching supervision intensity to agent autonomy level.

The choice between approaches depends on use case requirements. Risk tolerance is crucial—production systems serving end users might require workflow-based reliability, while internal tools or research applications might benefit from higher agency. Time horizons matter too: Kumar describes using Manis for research tasks that complete in 10 minutes, providing enough time for review and iteration but not so long that supervision becomes impractical. If tasks took hours, the workflow would break down.

This framework helps resolve apparent contradictions in LLMOps practice. Both "careful engineering of deterministic workflows" and "letting models autonomously solve problems" are valid approaches depending on context. The mistake is applying one paradigm where the other is appropriate—either over-constraining capable models or under-supervising unreliable ones.

## Model Selection: Frontier vs. Specialized vs. On-Device

Kumar articulates a sophisticated perspective on model selection that recognizes distinct use cases for different model scales. Frontier models like Gemini represent the absolute state-of-the-art in capability, pushing what's possible in AI and handling general-purpose tasks at the highest quality. However, they require cloud infrastructure and internet connectivity.

The Gemma family (270M, 1B, 4B, 12B, 27B parameters) serves different needs. While not frontier in absolute capability, these models represent the Pareto frontier for their size—optimized for efficiency, on-device deployment, and fine-tuning. This enables use cases impossible with large models: offline operation, edge deployment, low-latency requirements, specialized domains through fine-tuning, and privacy-sensitive applications where data cannot leave devices.

Kumar provides vivid examples: Dolphin Gemma runs underwater with scuba divers studying dolphins where internet connectivity is impossible. Gaming NPCs use fine-tuned models to generate dialogue without cloud dependencies. Medical applications like CodeCancer2 predict cancer markers with specialized fine-tuning far exceeding general models for that specific task, though unable to answer general questions.

For function calling specifically, Kumar suggests that while Gemma 270M cannot replace coding agents for complex tasks, it can be fine-tuned to excel at one to five specific function calls for constrained applications. This creates opportunities for edge-based agents with reliable tool use for defined scopes without cloud dependencies or associated costs and latency.

The production implication is that model selection should match deployment constraints and task requirements. Teams building systems requiring offline operation, real-time response, or specialized domain expertise should consider smaller fine-tuned models despite lower general capability. Conversely, open-ended applications requiring broad knowledge and complex reasoning benefit from frontier models despite infrastructure requirements.

Kumar also notes that hosted models on production-grade infrastructure provide smoother experiences than self-hosted open-weight models. The serving infrastructure—load balancing, scaling, optimization, API design—matters as much as model weights for production deployments. Teams self-hosting must handle these concerns or use inference frameworks like Ollama or LangChain, whereas cloud APIs provide this infrastructure as a service.

## Advanced Evaluation Techniques

The discussion reveals several sophisticated evaluation approaches beyond basic test sets. Dynamic evaluation allows eval scenarios to adapt as agents execute, with potentially other LLMs mocking responses or changing conditions. This tests robustness to unexpected situations and edge cases more effectively than static prompt-response pairs.

Docker containers increasingly serve as evaluation environments for agents that modify file systems, install dependencies, or perform other stateful operations. The container provides isolation for testing, can be configured with specific initial states, and gets torn down after evaluation completes. This enables safe, repeatable testing of agents that perform complex system-level operations.

For multimodal systems, evaluation must encompass audio and image assessment, not just text. Kumar suggests the fundamental approach remains consistent (structured inputs, automated assessment, gold standards) but execution becomes more time-intensive and complex. The value of automated harnesses increases since manual evaluation of audio and visual outputs is even more subjective and inconsistent than text assessment.

Kumar emphasizes testing at different function complexity levels and with varying numbers of available tools. An agent might perform well with three simple functions but fail with ten complex ones or vice versa. Evaluation should span this spectrum to understand operational boundaries. Similarly, testing across modalities (text, code, images, audio) reveals capability differences that inform appropriate use cases.

The conversation also touches on needle-in-haystack testing for context windows, though Kumar characterizes it as somewhat limited. While it validates basic retrieval across long contexts, real-world performance depends on distractor density, information integration requirements, and task complexity not captured by simple fact retrieval. Teams should build custom context evaluations reflecting their specific usage patterns rather than relying solely on this benchmark.

## Practical Considerations and Production Wisdom

Several practical insights emerge for teams building production LLM systems. Starting with fundamentals by manually implementing basic function calling with open models builds intuition about underlying mechanics essential for debugging production issues. Even teams planning to use closed models benefit from this hands-on understanding of "leaky abstractions."

Shipping quickly after achieving minimal quality enables learning from real users whose behavior invariably differs from builder expectations. The goal is "good enough" not "perfect" before initial release, followed by rapid iteration based on actual usage. This requires balancing evaluation rigor with speed to market—over-preparing delays learning from the ultimate evaluation environment (production users).

Building evaluation infrastructure before achieving product-market fit may seem premature, but pays dividends throughout the product lifecycle. Even simple automated checks provide velocity advantages over purely manual testing. As products mature and complexity grows, the evaluation foundation supports rapid experimentation and safe deployment of improvements.

Kumar repeatedly emphasizes understanding your specific system deeply to identify where complexity and failure modes arise, then targeting evaluation at those areas. Generic benchmarks provide limited value compared to custom evaluations matching actual usage patterns, data characteristics, and user expectations. The team's knowledge of their system informs what to test and how.

The conversation also reveals pragmatic realities about model behavior. Even frontier models have limitations—Gemma 270M would "miserably fail" at complex coding tasks despite being excellent for its size. Understanding and communicating model capabilities honestly helps set appropriate expectations and guides users toward suitable applications.

## Looking Forward

Kumar expresses excitement about both frontier advancement (Gemini 3.0 represents the best AI has ever been) and Pareto frontier progression (smaller models continuously improving for their size/efficiency class). The parallel evolution enables both pushing absolute capability limits and expanding what's possible on constrained devices or with specialized fine-tuning.

The evaluation and agent orchestration spaces will likely see continued rapid evolution. As models become more capable, they require less explicit orchestration for fixed-complexity tasks, but teams apply them to increasingly complex problems maintaining similar orchestration needs. This "shifting window" of complexity continues as long as capability improvements enable tackling harder problems.

The emphasis on custom evaluation harnesses as competitive advantages suggests that production LLMOps will increasingly differentiate on infrastructure and process rather than just model selection. Teams with robust evaluation enabling rapid iteration and safe deployment of improvements will outpace competitors regardless of model choice. The ability to quickly assess new model versions and restructure systems appropriately becomes more valuable as change accelerates.

The two cultures of agents will likely persist, with deterministic workflow approaches dominating high-stakes production deployments while high-agency autonomous systems serve internal tools and applications accepting stronger supervision requirements. Teams must thoughtfully match architectural patterns to use case characteristics rather than defaulting to any single paradigm.