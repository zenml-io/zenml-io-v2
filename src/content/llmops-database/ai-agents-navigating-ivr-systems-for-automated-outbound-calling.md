---
title: "AI Agents Navigating IVR Systems for Automated Outbound Calling"
slug: "ai-agents-navigating-ivr-systems-for-automated-outbound-calling"
draft: false
llmopsTags:
  - "healthcare"
  - "customer-support"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "memory"
  - "error-handling"
  - "fallback-strategies"
  - "monitoring"
industryTags: "tech"
company: "Sierra"
summary: "Sierra developed a platform capability enabling AI agents to autonomously navigate Interactive Voice Response (IVR) systems when making outbound phone calls to other businesses. The problem addressed is that AI agents need to interact with legacy phone tree systems designed for humans, which involves complex timing decisions, modality switching between speech and DTMF tones, detecting when a human has been reached, and handling unpredictable IVR behaviors. Sierra's solution provides out-of-the-box IVR navigation capabilities combined with memory systems and intelligent retry logic, enabling agents to achieve 85% success rates (a 49% improvement over baseline). Multiple customers across healthcare and insurance have deployed this capability, with use cases including prior authorization checks, pharmacy medication transfers, and insurance claim status inquiries, achieving success rates between 70-94% depending on the specific application."
link: "https://sierra.ai/blog/navigating-ivr-systems"
year: 2026
seo:
  title: "Sierra: AI Agents Navigating IVR Systems for Automated Outbound Calling - ZenML LLMOps Database"
  description: "Sierra developed a platform capability enabling AI agents to autonomously navigate Interactive Voice Response (IVR) systems when making outbound phone calls to other businesses. The problem addressed is that AI agents need to interact with legacy phone tree systems designed for humans, which involves complex timing decisions, modality switching between speech and DTMF tones, detecting when a human has been reached, and handling unpredictable IVR behaviors. Sierra's solution provides out-of-the-box IVR navigation capabilities combined with memory systems and intelligent retry logic, enabling agents to achieve 85% success rates (a 49% improvement over baseline). Multiple customers across healthcare and insurance have deployed this capability, with use cases including prior authorization checks, pharmacy medication transfers, and insurance claim status inquiries, achieving success rates between 70-94% depending on the specific application."
  canonical: "https://www.zenml.io/llmops-database/ai-agents-navigating-ivr-systems-for-automated-outbound-calling"
  ogTitle: "Sierra: AI Agents Navigating IVR Systems for Automated Outbound Calling - ZenML LLMOps Database"
  ogDescription: "Sierra developed a platform capability enabling AI agents to autonomously navigate Interactive Voice Response (IVR) systems when making outbound phone calls to other businesses. The problem addressed is that AI agents need to interact with legacy phone tree systems designed for humans, which involves complex timing decisions, modality switching between speech and DTMF tones, detecting when a human has been reached, and handling unpredictable IVR behaviors. Sierra's solution provides out-of-the-box IVR navigation capabilities combined with memory systems and intelligent retry logic, enabling agents to achieve 85% success rates (a 49% improvement over baseline). Multiple customers across healthcare and insurance have deployed this capability, with use cases including prior authorization checks, pharmacy medication transfers, and insurance claim status inquiries, achieving success rates between 70-94% depending on the specific application."
notion:
  pageId: "3bcf8dff-2538-801e-a4d3-e347a2bbec13"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-14T06:39:00.000Z"
  lastEditedTime: "2026-08-14T06:39:00.000Z"
  publishedAt: "2026-08-14T06:53:48Z"
---

## Overview

This case study describes Sierra's production deployment of AI agents capable of autonomously navigating IVR (Interactive Voice Response) phone systems to conduct outbound business calls. The article, published in August 2026, presents both the technical challenges of deploying LLM-based voice agents in real-world telephony environments and Sierra's engineering solutions for making such systems reliable at scale. Multiple customers have deployed this capability across healthcare and insurance sectors, representing a mature production LLMOps implementation rather than an experimental proof-of-concept.

The fundamental business problem is straightforward: AI agents increasingly need to call other companies to accomplish tasks, such as healthcare providers checking prior authorizations with insurers or insurance companies confirming repair status with auto body shops. While the underlying infrastructure (voice over public switched telephone networks) already exists, the challenge lies in programmatically navigating IVR systems that were designed for human callers, not AI agents.

## Customer Deployments and Use Cases

Sierra provides three concrete customer examples, though they maintain anonymity for most:

A top-5 healthcare payer built an agent that calls doctor's offices to provide timely prior authorization updates for patients. Notably, they deployed this system in under five days using Sierra's platform, suggesting the infrastructure provides significant developer velocity for this use case.

A digital pharmacy with nationwide operations uses agents to call local pharmacies for medication transfer coordination, representing a high-volume, geographically distributed deployment scenario.

A revenue cycle management company deployed agents to call insurance payers for claim status checks, achieving a 70% overall success rate with 94% success for specific payers. This variance in performance across different target systems is a critical real-world consideration in LLMOps—not all external systems are equally amenable to automation, and production systems must account for this heterogeneity.

## Technical Challenges in Production Voice AI

Sierra identifies five core technical challenges that make IVR navigation difficult for AI agents, each with important LLMOps implications:

**Timing and Turn-Taking**: IVR systems begin with preambles requiring no response (legal disclosures, language selection prompts), and agents must classify whether each utterance is a statement or question, and whether the appropriate response is speech, DTMF tones, or silence. Responding too quickly causes the agent to miss critical information; responding too slowly causes the IVR to repeat or disconnect. During hold periods, agents must remain silent, which runs counter to their conversational training. This represents a significant challenge in prompt engineering and system design—the agent's behavior must dynamically shift based on call state.

**Response Modality Switching**: IVRs often request keyword-based responses ("in a few words, tell me why you're calling") rather than natural sentences, but once a human is reached, the agent must engage in fluid conversation. This modality switching is a non-trivial LLMOps challenge, as the same underlying model must operate in two very different modes within a single session, and failure to recognize the transition point leads to call failure (humans hang up on agents that respond with keywords rather than conversation).

**Human Detection**: Identifying when a human has answered is surprisingly difficult. Hold music can end abruptly mid-note followed by "hello?" with no transition. Many IVRs play recorded greetings that sound nearly identical to human support associates. This is fundamentally an audio classification and state inference problem that must operate in real-time with high accuracy—false positives waste human time, while false negatives cause the agent to treat humans as menu systems.

**IVR Unpredictability**: Phone trees may be broken (accepting only speech despite instructing to "press 3"), time-dependent (no one available outside business hours despite successful navigation), or fundamentally unable to serve the agent's goal (requiring information the agent doesn't possess). This unpredictability means production systems cannot rely on hardcoded navigation paths and must handle graceful degradation and informative failure modes.

**DTMF Handling**: Many IVRs, particularly authentication gates in healthcare and financial services, accept only DTMF (dual-tone multi-frequency) keypad tones. Speaking "two" will not work. Agents must classify which input modality the IVR expects and generate tones with correct duration and inter-digit spacing, representing a multi-modal output challenge where the LLM must control not just language generation but also signal timing.

## Sierra's Technical Solution

Sierra's approach combines several LLMOps techniques into an integrated platform capability:

**Out-of-the-Box Navigation**: Rather than requiring customers to hardcode paths through each phone tree, Sierra provides generic IVR navigation as a platform feature. The agent makes decisions about when to speak or stay silent, whether to use speech or DTMF, how to traverse multi-level menus, and how to recognize human handoff. For human detection specifically, Sierra mentions that "the agent plots where it thinks it is in the phone tree against what was just said, and what it hears in the audio," suggesting a multi-modal inference approach combining state tracking, natural language understanding, and audio feature analysis.

**Reasoning Through Edge Cases**: The agent applies reasoning to handle quirks the IVR doesn't explicitly explain. The example given involves member IDs that may contain letters or dependent suffixes while IVRs accept only numbers. If the full ID is rejected, the agent can reason about alternative formats and retry without prefix letters or suffixes. This represents a form of in-context learning and hypothesis testing within a single call session.

**Memory and Intelligent Retries**: Agents maintain memory of which paths work for which phone lines, when departments are actually open, and successful strategies for reaching specific goals. Failed calls inform retry strategies rather than starting from scratch. This is a critical production LLMOps pattern—systems learn from operational data to improve future performance, and retry logic incorporates learned context rather than naive repetition.

**Learning Loop**: Every call generates feedback about success, failure, and failure modes. Sierra uses this feedback for continuous improvement of navigation and retry strategies. While the article doesn't detail the specific mechanisms (whether this involves fine-tuning, prompt refinement, routing logic updates, or some combination), the existence of a systematic learning loop is fundamental to production LLMOps.

## Evaluation Methodology

Sierra has built a comprehensive evaluation framework for this capability, demonstrating sophisticated LLMOps practices:

**Representative Test Set**: They constructed a set of IVR trees based on cross-industry experience, incorporating the technical quirks outlined in the challenges section. Each tree has specific goals ("reach a human", "retrieve a fact", "execute an action"), and the agent is deliberately kept blind to the tree structure, receiving only the goal and necessary customer details—mirroring real-world conditions.

**Outcome-Based Grading**: Evaluation focuses on whether the agent achieved the goal. For a task like "find out how much is covered by the insurer for knee surgery," success requires returning the correct number. This outcome-based evaluation is more rigorous than process-based metrics and aligns with actual business value.

**Real-World Testing**: Because most challenges are audio-based, evaluation runs over actual telephone networks. Agents dial real numbers, hear synthesized prompts, send actual DTMF tones, and experience real timers and hold periods. This production-fidelity testing is essential for voice AI systems where simulated environments may miss critical failure modes.

**Controlled Experiments**: Sierra runs A/B testing with "bare" control arms (agent with only goal and basic tools) versus "guided" experimental arms (with IVR navigation feature enabled). This controlled methodology allows attribution of performance gains to specific capabilities. The reported results show the navigation feature increases overall pass rate by 49%, from 57% to 85%, with largest improvements on "reach a person" tasks.

**Iterative Improvement**: The evaluation framework serves as the foundation for "hillclimbing with specific customer context" beyond the baseline 85% pass rate, suggesting continuous optimization using customer-specific data.

## Production Deployment Considerations

Several aspects of the article reveal important LLMOps considerations for production voice AI systems:

**Monitoring**: The article mentions that "all agents come with monitors so you understand their IVR performance," indicating built-in observability for this capability. Monitoring is essential for production LLM systems, particularly for complex multi-step processes like IVR navigation where failures can occur at many points.

**Variable Performance by Target System**: The revenue cycle management customer's experience (70% overall success, 94% for specific payers) highlights that production performance is heavily dependent on the characteristics of external systems being called. Effective LLMOps for this use case requires per-target system performance tracking and potentially specialized strategies for different targets.

**Rapid Deployment**: The top-5 healthcare payer built their agent in under five days, suggesting Sierra's platform provides significant abstraction and tooling that accelerates time-to-production. This developer velocity is a key LLMOps platform capability.

**Policy and Trust Issues**: The article acknowledges that some companies have policies against serving automated callers. Sierra's current workaround involves agents identifying themselves directly and scheduling callbacks with humans, but they note the longer-term need for standardized agent identification and authorization mechanisms. This highlights a critical non-technical challenge in deploying production AI agents: regulatory, policy, and trust considerations that can block otherwise functional systems.

## LLMOps Architecture Implications

While the article doesn't provide detailed architecture diagrams, several architectural patterns can be inferred:

**Multi-Modal Processing**: The system must process audio inputs (speech, hold music, tones), generate both speech and DTMF outputs, and maintain state awareness across the conversation. This suggests an architecture where the LLM operates as a reasoning and decision-making layer orchestrating specialized audio processing and generation components.

**State Tracking**: The agent maintains awareness of position within phone trees, requiring either explicit state machines, learned state representations, or some hybrid approach. The mention of plotting "where it thinks it is in the phone tree" suggests probabilistic state tracking rather than deterministic navigation.

**Memory Systems**: Both short-term memory (within a call) and long-term memory (across calls to the same phone system) are essential. The long-term memory appears to include learned navigation paths, department hours, and successful strategies, which must be retrieved and applied in context.

**Tool Use and Orchestration**: The reference to "basic tools" in the evaluation methodology suggests a tool-use architecture where the LLM can invoke specialized capabilities (DTMF generation, silence periods, etc.) as needed.

**Reasoning and Planning**: The ability to reason through edge cases (like reformatting member IDs) and navigate novel IVR structures without hardcoded paths requires sophisticated reasoning capabilities, likely involving chain-of-thought prompting or similar techniques.

## Business Model and Outcomes Focus

The article references Sierra's "outcomes-based model at scale: you pay for results, not tokens," suggesting a deployment model aligned with actual business value rather than infrastructure consumption. This has important LLMOps implications—optimization focuses on task completion rates and business outcomes rather than minimizing token usage or latency per se, which may lead to different architectural choices than cost-per-token optimization.

## Future Directions and Industry Evolution

Sierra acknowledges that the IVR landscape itself is changing, with companies replacing phone trees with AI agents. They position their current capability as handling today's "messy phone systems" while working toward better agent-to-agent interaction protocols. This suggests an interesting evolutionary path where the current LLMOps challenge (navigating human-designed IVRs) is a transitional problem, though one likely to persist for years given the installed base of legacy phone systems.

The call for standardized agent identification and authorization protocols points to emerging needs in the AI agent ecosystem—as agents become more autonomous and capable, production deployments require robust identity, authentication, and authorization frameworks that don't yet exist in standardized form.

## Critical Assessment

As a vendor article, this piece naturally emphasizes Sierra's capabilities and successes. Several areas warrant balanced consideration:

The 85% success rate and 49% improvement metrics are presented without full context about baseline difficulty, comparison to alternative approaches, or variance across different types of IVR systems. The one customer-specific metric provided (70% overall, 94% for specific payers) shows significant variance that suggests overall success rates may obscure important performance distribution.

The "less than five days" deployment timeline is compelling but comes from a single example with a top-5 healthcare payer, likely with substantial technical resources. Whether this timeline generalizes to typical customers isn't clear.

The article doesn't discuss failure modes in detail, error recovery, handling of edge cases beyond the member ID example, or how the system degrades when it cannot complete a task. These operational realities are critical for production LLMOps but aren't covered in depth.

The learning loop and memory systems are described at a high level without specifics about implementation, data requirements, cold-start problems for new phone systems, or how quickly improvements materialize.

Despite these limitations, the case study represents a sophisticated production LLMOps implementation addressing a genuine business problem with measurable results. The evaluation methodology in particular shows mature engineering practices, and the multiple customer deployments across different use cases suggest real production viability rather than isolated success stories. The technical challenges identified are specific, realistic, and grounded in actual telephony system behavior, lending credibility to the overall narrative.

The case study is valuable for LLMOps practitioners as it demonstrates the gap between conversational AI capabilities and production deployment requirements when interacting with legacy infrastructure designed for humans. It highlights the importance of evaluation frameworks that test under production-fidelity conditions, the need for memory and learning systems in production agents, and the reality that external system heterogeneity creates performance variance that must be managed and monitored in production deployments.
