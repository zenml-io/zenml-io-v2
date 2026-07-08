---
title: "Verifiable Continual Learning for AI Agents in Production"
slug: "verifiable-continual-learning-for-ai-agents-in-production"
draft: false
llmopsTags:
  - "customer-support"
  - "reinforcement-learning"
  - "prompt-engineering"
  - "fine-tuning"
  - "memory"
  - "harness-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "evals"
industryTags: "tech"
company: "RELAI"
summary: "RELAI, a company founded by University of Maryland professor Soheil Feizi, addresses the challenge of continual learning for AI agents in production environments. Traditional approaches struggle to convert production logs into actionable improvements without causing regressions in existing functionality. RELAI's Verifiable Continual Learning (VCL) engine transforms production logs and feedback into replayable learning environments, performs root cause analysis to route fixes to the appropriate layer (model weights, harness/context, or memory), and implements regression-aware optimization to ensure improvements don't break existing capabilities. Their approach demonstrated a 10% performance improvement in their support agent benchmark while maintaining prior functionality, with the system being compatible with major agent frameworks and requiring only two commands to implement."
link: "https://www.youtube.com/watch?v=2IxD9OB3XuQ"
year: 2026
seo:
  title: "RELAI: Verifiable Continual Learning for AI Agents in Production - ZenML LLMOps Database"
  description: "RELAI, a company founded by University of Maryland professor Soheil Feizi, addresses the challenge of continual learning for AI agents in production environments. Traditional approaches struggle to convert production logs into actionable improvements without causing regressions in existing functionality. RELAI's Verifiable Continual Learning (VCL) engine transforms production logs and feedback into replayable learning environments, performs root cause analysis to route fixes to the appropriate layer (model weights, harness/context, or memory), and implements regression-aware optimization to ensure improvements don't break existing capabilities. Their approach demonstrated a 10% performance improvement in their support agent benchmark while maintaining prior functionality, with the system being compatible with major agent frameworks and requiring only two commands to implement."
  canonical: "https://www.zenml.io/llmops-database/verifiable-continual-learning-for-ai-agents-in-production"
  ogTitle: "RELAI: Verifiable Continual Learning for AI Agents in Production - ZenML LLMOps Database"
  ogDescription: "RELAI, a company founded by University of Maryland professor Soheil Feizi, addresses the challenge of continual learning for AI agents in production environments. Traditional approaches struggle to convert production logs into actionable improvements without causing regressions in existing functionality. RELAI's Verifiable Continual Learning (VCL) engine transforms production logs and feedback into replayable learning environments, performs root cause analysis to route fixes to the appropriate layer (model weights, harness/context, or memory), and implements regression-aware optimization to ensure improvements don't break existing capabilities. Their approach demonstrated a 10% performance improvement in their support agent benchmark while maintaining prior functionality, with the system being compatible with major agent frameworks and requiring only two commands to implement."
notion:
  pageId: "397f8dff-2538-80db-95e6-daba3b12ca4e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T19:58:00.000Z"
  lastEditedTime: "2026-07-08T20:14:00.000Z"
  publishedAt: "2026-07-08T20:18:51Z"
---

## Overview

RELAI is developing a verifiable continual learning platform for AI agents in production, founded by Soheil Feizi, who is both CEO of the company and an associate professor at the University of Maryland. The fundamental problem they address is one of the core challenges in LLMOps: how to systematically improve AI agents from their production experiences without introducing regressions or forgetting previously learned behaviors. The company's approach represents a structured methodology for handling the complete lifecycle of agent improvement, from identifying failures through to deploying verified fixes.

The presentation describes a comprehensive framework that tackles two fundamental challenges in continual learning: obtaining meaningful feedback from production systems and then acting upon that feedback in a safe, verifiable manner. While the presentation is clearly promotional in nature and showcases RELAI's product, it does articulate genuine LLMOps challenges that practitioners face when operating agents at scale.

## The Feedback Problem in Production

RELAI's framework starts by addressing a critical distinction between development and production environments. During development, teams typically work with curated benchmarks that have explicit evaluators, providing clear pass/fail signals or reward scores. These benchmarks allow teams to measure agent performance and iterate on improvements in a controlled setting. However, production environments present a fundamentally different challenge: instead of benchmarks with clear evaluation criteria, teams have session logs that capture user interactions with agents, often without explicit feedback about whether the interaction was successful.

The company identifies two approaches to extracting feedback from production logs. The first is automatic feedback generation, where other models, LLMs, or coded logic analyze logs to provide critiques. This approach can scale but may lack the nuance of domain expertise. Some implementations even have agents self-critique their own logs, though this introduces potential biases. The second approach involves human expert review of selected logs, providing domain-specific feedback on agent behavior and alignment with desired outcomes. While lower in volume, this expert feedback is positioned as critical for capturing the subtle requirements of production applications.

However, RELAI argues that logs plus feedback are insufficient for learning. The key insight they present is that single instances of failures, even with feedback attached, are not testable or replayable. What's needed instead is what they term a "replayable learning environment" - essentially a simulation that can be rerun with defined success criteria. This represents inferring a distribution from a single observation, which is an ambitious goal with inherent challenges.

## Learning Environment Construction

The process of creating learning environments from production logs involves several complex technical challenges. The system must determine how tools that appeared in the agent's behavior should be simulated - whether to use real tools, mock tools, or some hybrid approach. If mocking is chosen, the system needs to determine what data should drive those mocks to create realistic simulations. When agents interact with users, the system needs to infer synthetic user behaviors that represent the patterns observed in production. Finally, the system must construct evaluators that define success for the simulated scenario.

This learning environment construction is where RELAI's approach moves from observable logs to inferred test cases. The quality and fidelity of these inferred environments is critical to the entire downstream optimization process, yet the presentation doesn't deeply explore the validation of these inferred environments or discuss potential failure modes when the inference is incorrect. This represents a significant trust boundary in the system - practitioners would need to have confidence that the learning environments accurately capture the relevant aspects of production scenarios.

Once these executable learning environments are created, they enable systematic testing of agent variants, allowing teams to verify fixes and measure improvements in a controlled manner before deploying to production.

## Multi-Layer Optimization Approach

RELAI's framework conceptualizes agent improvement across three distinct layers, each with different cost and capability tradeoffs. This multi-layer perspective is one of the more valuable contributions to LLMOps thinking in their approach.

The model layer involves changing the weights of the underlying LLM or other models used by the agent. Techniques mentioned include supervised fine-tuning (SFT), where the model imitates correct trajectories using labeled samples, and various reinforcement learning approaches like DPO (Direct Preference Optimization), GRPO (Group Relative Policy Optimization), and other RL-based post-training methods that sample trajectories, score them against reward or preference signals, and reinforce winning behaviors. Low-Rank Adaptation (LoRA) is mentioned as a way to make weight updates cheaper and safer by limiting which parameters can change. These model-layer changes are the most expensive computationally but can address fundamental capability limitations. However, they typically require benchmarks with explicit evaluators rather than working directly from logs and feedback.

The harness layer, also called the context engineering layer, involves modifying the components that surround the LLM: prompts, skills, tools, code, and workflows. RELAI describes two categories of approaches here. Trace-to-harness methods involve analyzing logs with feedback and using a coding agent to propose improvements to the agent. While this can work directly from logs and feedback, it's not inherently testable - you don't know if the changes work even for the specific case that triggered them, and you certainly don't know the impact on other scenarios. Methods like GEPPO and prompt search take a different approach, mutating prompts or other harness components, scoring different candidates, and keeping winners through search algorithms like evolutionary approaches. These are testable but require benchmarks and explicit evaluators to provide the scoring signal.

The memory layer is the cheapest and fastest to update, involving writing down facts or distilling skills so agents don't need to rediscover them. Methods mentioned include LETA and MemZero for storing facts or corrections in information memory, and skill distillation approaches that compress successful trajectories into reusable skills. While fast and able to work directly from logs and feedback, memory updates are typically unverified - there's no systematic way to test whether the memory addition actually resolves the issue or whether it might create unexpected problems in other contexts.

RELAI's key insight here is that effective continual learning shouldn't focus exclusively on any single layer. Instead, the system should identify "the smallest durable change at the right layer of the agent" - a principle that aims to make improvements that are both minimally invasive and genuinely resolve the underlying issue.

## Verifiable Continual Learning Framework

The core of RELAI's product offering is what they term Verifiable Continual Learning (VCL), which is built on four foundational principles:

**Replayability** addresses the conversion of one-off failures into tests that can be rerun. This involves the learning environment construction process described earlier, lifting logs and feedback into simulations with evaluators. This principle makes everything downstream testable and verifiable.

**Holisticness** recognizes that single failures often have multiple possible causes and multiple possible fixes. RELAI provides an illustrative example: an agent that cites a stale policy and skips required escalation might have issues in the memory layer (stale facts), prompt optimization, tool behavior (policy normalization), workflow structure (missing escalation gates), or model capabilities (insufficient reasoning). The holistic principle means performing root cause analysis to route fixes to the appropriate layer - the one that explains the failure with the smallest durable change.

**Lifelongness** addresses the regression problem that plagues many continual learning approaches. The principle is that new fixes must improve new cases without breaking past functionality. RELAI positions regression awareness not as a post-hoc check but as an integral part of the optimization process itself. If the agent has been optimized on K past learning environments and a new failure creates learning environment K+1, the naive approach would be to optimize only for K+1, which risks regressing on the previous K environments. RELAI's approach implements regression-aware learning where new failures are fixed subject to the constraint of no regression on past learning environments. They acknowledge this needs to be computationally efficient and not scale linearly with K, though the specific algorithmic approaches to achieve this efficiency aren't detailed.

**Efficiency** recognizes that the continual learning loop needs to run frequently and therefore must be computationally practical. Different layers have different computational costs: memory updates are cheap, harness changes are medium complexity, and model weight changes are expensive. The optimization loop itself must also be efficient, particularly when implementing the regression-aware optimization that considers all past learning environments.

## Implementation and Architecture

RELAI's system implements these principles in a learning loop that accepts various input signals: logs, feedback, or even direct instructions and prompts. The loop follows these steps:

The system first lifts input signals into replayable learning environments, making everything testable and verifiable. It then performs root cause analysis and routes fixes to the appropriate layer - memory, model, or harness - implementing the holisticness principle. The optimization is regression-aware rather than treating regression as a post-hoc check, implementing the lifelongness principle. The entire loop is designed to run efficiently and produce a reviewable version update that explains what changed and why.

From an integration perspective, RELAI positions their system as easy to adopt, requiring just two commands after a one-time setup. The setup involves creating a learning harness in the agent, and agents can be built on any major agent framework. Once set up, users create learning environments from various signals and then call the optimize function to improve the agent, with the output being a pull request with the optimized version.

## Benchmark and Results

RELAI developed a continual learning benchmark based on a fictional support agent scenario to demonstrate their approach. The benchmark includes reproducible test beds with deterministic evaluators and deliberately includes "regression traps" - scenarios where overfitting to the latest fix would break previously successful behaviors. This is a valuable contribution to the LLMOps community, as benchmarks for continual learning are less common than standard task benchmarks.

In their demonstration, they show creating a learning environment from a simple instruction about handling rude and adversarial callers. The system generates simulators with personas, intents, and tools, plus evaluators defining success metrics. The initial agent scored 78%, and after one optimization loop with their system, the score increased to 97%, representing a 10% improvement. They also demonstrate the flow with production logs and feedback, such as the instruction to keep fast eligible refunds but not generalize generosity beyond thresholds.

While these results are compelling, it's important to note that they're demonstrated on RELAI's own benchmark with their own scenarios. Independent validation on diverse real-world production systems would be necessary to fully assess the generalizability of the approach and the consistency of improvement magnitudes. The 10% improvement figure, while significant, is from a single example scenario rather than a systematic evaluation across multiple domains.

## Critical Assessment and LLMOps Considerations

RELAI's framework addresses genuine challenges in production LLMOps, particularly around the gap between identifying issues in production and safely deploying fixes. The multi-layer optimization approach is conceptually sound, recognizing that not all problems require expensive model retraining when prompt or memory adjustments might suffice.

However, several aspects merit careful consideration for practitioners:

The learning environment inference from single production logs represents a significant leap. The quality of these inferred environments is critical to everything downstream, yet it's unclear how often these environments accurately capture the essential aspects of production scenarios versus creating spurious test cases. Practitioners would need validation mechanisms to ensure learning environments are representative.

The root cause analysis that routes fixes to appropriate layers is positioned as automatic, but the decision of whether a failure stems from model limitations versus prompt engineering versus memory issues is often nuanced and context-dependent. The accuracy of this routing is crucial, and it's unclear what happens when the analysis misattributes causes.

The regression-aware optimization is perhaps the most important contribution but also the most complex to implement efficiently. The details of how they maintain computational efficiency while considering all past learning environments are not elaborated. As the number of learning environments grows, the challenge of ensuring no regressions while still allowing necessary changes becomes increasingly difficult.

The framework's reliance on various AI components - using models to critique logs, generate synthetic users, create evaluators, and perform root cause analysis - introduces multiple points where errors can compound. While automation is necessary for scale, human oversight likely remains important at various stages.

From a broader LLMOps perspective, RELAI's approach represents thinking about agents as systems that require ongoing maintenance and improvement processes, not just initial development and deployment. The emphasis on verifiability and regression testing reflects software engineering principles being appropriately applied to AI systems. The framework provides structure for what is often an ad-hoc process of responding to production issues.

The integration claim of just two commands is appealing but likely simplifies the actual integration complexity. Adapting existing agents to work within RELAI's learning harness, ensuring compatibility with existing evaluation pipelines, and training teams to interpret and act on the system's outputs would involve significant effort beyond those two commands.

Overall, RELAI is tackling an important problem space in LLMOps - the systematic improvement of agents from production experience while maintaining reliability. Their framework provides a structured approach with valuable principles around replayability, holistic analysis, lifelong learning, and efficiency. However, as with any vendor presentation, the real-world effectiveness would need to be validated through independent use across diverse production scenarios, and practitioners should carefully evaluate whether the system's automated decisions align with their domain requirements and risk tolerances.
