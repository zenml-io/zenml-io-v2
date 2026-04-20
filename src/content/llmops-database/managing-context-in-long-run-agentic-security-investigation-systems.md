---
title: "Managing Context in Long-Run Agentic Security Investigation Systems"
slug: "managing-context-in-long-run-agentic-security-investigation-systems"
draft: false
llmopsTags:
  - "fraud-detection"
  - "high-stakes-application"
  - "classification"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "agent-based"
  - "system-prompts"
  - "error-handling"
  - "token-optimization"
  - "latency-optimization"
  - "orchestration"
  - "monitoring"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Slack"
summary: "Slack developed a multi-agent AI system for automating security investigations that must maintain coherence across hundreds of inference requests and megabytes of output. The challenge was managing context windows and alignment across multiple specialized agents (Director, Experts, and Critic) working collaboratively over extended investigation periods. Their solution implements three complementary context channels: a Director's Journal for structured working memory, a Critic's Review with credibility-scored findings, and a Critic's Timeline for consolidated chronological evidence. This approach eliminates the need for extensive message history passing between agent invocations, instead relying on online context summarization that maintains alignment while preserving specialized agent roles. The system successfully handles complex investigations spanning multiple rounds, with the Critic filtering out approximately 26% of findings that don't meet plausibility thresholds, enabling more trustworthy automated security analysis."
link: "https://slack.engineering/managing-context-in-long-run-agentic-applications/"
year: 2026
seo:
  title: "Slack: Managing Context in Long-Run Agentic Security Investigation Systems - ZenML LLMOps Database"
  description: "Slack developed a multi-agent AI system for automating security investigations that must maintain coherence across hundreds of inference requests and megabytes of output. The challenge was managing context windows and alignment across multiple specialized agents (Director, Experts, and Critic) working collaboratively over extended investigation periods. Their solution implements three complementary context channels: a Director's Journal for structured working memory, a Critic's Review with credibility-scored findings, and a Critic's Timeline for consolidated chronological evidence. This approach eliminates the need for extensive message history passing between agent invocations, instead relying on online context summarization that maintains alignment while preserving specialized agent roles. The system successfully handles complex investigations spanning multiple rounds, with the Critic filtering out approximately 26% of findings that don't meet plausibility thresholds, enabling more trustworthy automated security analysis."
  canonical: "https://www.zenml.io/llmops-database/managing-context-in-long-run-agentic-security-investigation-systems"
  ogTitle: "Slack: Managing Context in Long-Run Agentic Security Investigation Systems - ZenML LLMOps Database"
  ogDescription: "Slack developed a multi-agent AI system for automating security investigations that must maintain coherence across hundreds of inference requests and megabytes of output. The challenge was managing context windows and alignment across multiple specialized agents (Director, Experts, and Critic) working collaboratively over extended investigation periods. Their solution implements three complementary context channels: a Director's Journal for structured working memory, a Critic's Review with credibility-scored findings, and a Critic's Timeline for consolidated chronological evidence. This approach eliminates the need for extensive message history passing between agent invocations, instead relying on online context summarization that maintains alignment while preserving specialized agent roles. The system successfully handles complex investigations spanning multiple rounds, with the Critic filtering out approximately 26% of findings that don't meet plausibility thresholds, enabling more trustworthy automated security analysis."
notion:
  pageId: "348f8dff-2538-8061-a65f-f22ec366c084"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-20T06:47:00.000Z"
  lastEditedTime: "2026-04-20T06:47:00.000Z"
  publishedAt: "2026-04-20T06:50:50Z"
---

## Overview

This case study from Slack describes their production implementation of a sophisticated multi-agent LLM system designed to automate security investigations. Published in April 2026, this represents the second article in a series detailing their agentic security investigation service. The system demonstrates advanced LLMOps practices for managing long-running agentic applications that can span hundreds of inference requests and generate megabytes of output—a challenge that goes well beyond typical short-run agent applications.

The fundamental problem Slack addresses is maintaining coherence and alignment across multiple AI agents working collaboratively over extended time periods. Unlike simple chatbot applications where context management is straightforward, security investigations require multiple specialized agents to coordinate effectively while each maintains its own tailored view of the investigation state. The system architecture includes three primary agent roles: a Director that orchestrates the investigation, multiple domain-specific Experts that gather evidence using specialized tools, and a Critic that reviews and validates findings.

## The Context Window Challenge in Production

A critical LLMOps challenge highlighted in this case study is that language model APIs are inherently stateless. To provide continuity between requests, callers must provide the complete message history with each request. While most agent frameworks solve this by simply accumulating message history between API calls, this approach fails for long-running applications as it inevitably fills the context window. Even approaching the context window limit degrades response quality. For complex security investigations that can span hundreds of inference requests, this becomes a fundamental architectural constraint.

Slack's approach is notably bold: they rely entirely on three specialized context channels and **do not pass any message history forward between agent invocations**. This represents a significant departure from typical agent framework patterns and demonstrates a sophisticated understanding of LLM behavior in production. The team explicitly notes that even if context windows were infinitely large, accumulated message history could impede agents' capacity to respond appropriately to new information—an important insight about information overload versus recency bias in agentic systems.

## The Three-Channel Context Architecture

Slack's solution implements three complementary context channels, each serving distinct purposes while together providing complete context without overwhelming individual agents.

### The Director's Journal

The Director's Journal functions as a structured working memory system that captures the orchestration layer's reasoning process. The Director agent has access to a journaling tool and is prompted to update it frequently with short notes. The journal supports six distinct entry types: decisions (strategic choices), observations (patterns noticed), findings (confirmed facts), questions (open items), actions (steps taken or planned), and hypotheses (working theories). Each entry is automatically annotated with investigation context including phase, round number, and timestamp. The Director can also assign priority levels, list follow-up actions, and include citation references to evidential artifacts.

The journal's value lies in providing a common narrative that keeps all agents aligned to the investigation's evolving direction. Every agent receives the current journal content in their prompt, presented chronologically, with system prompt guidance explaining how to interpret it. This allows the Director to lead the investigation toward conclusions, measure progress, identify dead-ends, and make course corrections. Analysis of their production system shows that decision and observation entries dominate the journal, reflecting its role as a strategic coordination mechanism rather than a detailed evidence repository.

### The Critic's Review System

The Critic's Review addresses a fundamental LLMOps challenge: LLM hallucination and misinterpretation. Even with strict guidelines, Expert agents can produce findings that are invented or grossly misinterpret data. The Critic's role is to assess Expert work by checking that reported findings are supported by evidence and that interpretations are sound.

Rather than providing all information directly (which would be impractical given the volume), the Critic receives a summary report and uses four specialized tools to examine cited evidence: get_tool_call (inspect arguments and metadata), get_tool_result (examine actual output), get_toolset_info (list available tools for a specific Expert), and list_toolsets (list all toolsets by Expert). This tool-based approach allows the Critic to examine both evidence and methodology—when an Expert cites a specific tool use as supporting a finding, the Critic can inspect the exact parameters used and the actual data returned.

The Review produces an annotated findings report with credibility scores on a five-level scale: Trustworthy (0.9-1.0, supported by multiple sources), Highly-plausible (0.7-0.89, corroborated by single source), Plausible (0.5-0.69, mixed evidence), Speculative (0.3-0.49, poor evidence support), and Misguided (0.0-0.29, no evidence or misinterpreted). Production data from 170,000 reviewed findings shows a distribution where 37.7% are Trustworthy, 25.4% Highly-plausible, 11.1% Plausible, 10.4% Speculative, and 15.4% Misguided. Notably, over a quarter of findings don't meet the plausibility threshold—demonstrating the value of this filtering layer in production.

Slack acknowledges the reasonable concern that the Critic's Review might provide false assurance since it's also conducted by model inference. They address this through three mitigations. First, they use a stronger model for the Critic—since it only reviews submitted findings rather than conducting full exploration, token costs remain manageable while benefiting from improved accuracy and nuance interpretation. Second, they carefully formulate narrow, specific instructions rather than open-ended questions, since LLMs are more likely to hallucinate on broader queries. Third, they implement the Critic's Timeline task as an additional validation layer.

### The Critic's Timeline

The Timeline task immediately follows Review in the investigation sequence and represents an elegant approach to cross-validation. The Critic constructs the most plausible consolidated timeline from three sources: the most recent Review, the previous Timeline, and the Director's Journal. Unlike the Review task which is token-intensive and requires correct use of many tools, Timeline assembly operates entirely on data in the prompt. The design intuition is that this narrower scope leaves greater capacity for reasoning in the problem domain rather than data gathering methodology.

The Critic follows explicit consolidation rules: include only events supported by credible citations, remove duplicates, prefer sources with stronger evidence when timestamps conflict, and maintain chronological ordering. The Critic also identifies up to three significant gaps (evidential, temporal, or logical inconsistencies) to focus the Director's attention on what matters most. The Timeline itself receives a confidence score using a narrative-building rubric similar to the Review scoring system.

This Timeline task raises the bar for hallucinated findings by enforcing narrative coherence. To be preserved, each finding must be consistent with the full chain of evidence. Findings that contradict or lack support from the broader narrative are pruned. A hallucination can only survive if it is more coherent with the body of evidence than any real observation it competes with—a significantly higher bar than the individual Review scores alone provide.

## Production Implementation Insights

Several aspects of Slack's implementation reveal sophisticated LLMOps practices. The system processes investigations through a series of defined phases, with each phase implementing distinct agent interactions. Within phases, there may be multiple rounds, where each round is one full iteration. Critically, there's no preset limit on the number of rounds—investigations continue until the Director determines they can be concluded. This open-ended structure requires robust context management since the system cannot predict runtime resource requirements.

The multi-agent design carefully balances conflicting requirements of continuity and creativity. Each agent receives a tailored view of the investigation state calibrated to its role. If agents aren't anchored to the wider team, investigations become disconnected and incoherent. Conversely, sharing too much information stifles creativity and encourages confirmation bias. The three-channel approach addresses this by providing shared strategic context (Journal) and validated evidence (Review and Timeline) without forcing agents to process every detail of every other agent's work.

The specimen content included in the article (from a real investigation, edited for generalization) shows the system handling a false positive security alert where a detection rule incorrectly flagged a package hook script based on pathname string matching rather than actual kernel module loading. The investigation spanned multiple rounds, engaged multiple domain Experts (endpoint telemetry, identity/access, configuration management, user behavior), and ultimately reached a high-confidence conclusion (0.83 Timeline confidence score) that the activity was legitimate system maintenance on a development environment. The Director's Journal shows progression from initial event identification through hypothesis formation to final determination, while the Critic's Review shows appropriate credibility scoring (most findings in the 0.85-0.92 range) and the Timeline presents a coherent chronological narrative with clearly identified evidence gaps.

## Model Selection and Cost Trade-offs

A notable LLMOps decision is using a stronger model specifically for the Critic role. This represents a thoughtful cost-performance trade-off: while stronger models are more expensive per token, the Critic's scope is limited to reviewing submitted findings rather than exploring the full problem space, keeping token volumes manageable. The investment in model quality at this validation layer provides leverage across the entire system by filtering out unreliable findings before they can propagate. This design pattern—using stronger models for validation/consolidation tasks with bounded scope rather than uniformly across all agents—demonstrates mature thinking about production LLM system economics.

## Implications for LLMOps Practices

This case study offers several important lessons for LLMOps practitioners building complex agentic systems. First, message history accumulation strategies that work for simple agents fail at scale, and thoughtful alternatives are necessary. Second, context management should be purpose-built for the application domain rather than relying on generic framework capabilities. Third, multi-agent systems require explicit mechanisms for alignment and coherence that go beyond simply sharing information. Fourth, validation layers using stronger models can provide cost-effective quality assurance. Fifth, scoring and filtering mechanisms are essential for production systems where hallucination risks are unacceptable.

The approach also highlights important challenges. The system's reliance on three specific context channels means those channels must be carefully maintained and versioned. Changes to Journal structure, Review scoring rubrics, or Timeline formats could affect investigation quality. The team must balance prescriptiveness (strict formats that models reliably produce) with flexibility (allowing natural language expressiveness). The Critic's dual role as both reviewer and timeline consolidator creates dependencies that must be carefully orchestrated.

While Slack presents this as a successful production system, they appropriately acknowledge limitations. The Critic itself uses LLM inference and could hallucinate, though mitigations reduce this risk. The scoring distributions show substantial filtering (26% of findings below plausibility threshold), but determining the true positive and false positive rates of this filtering would require extensive human evaluation. The Timeline confidence scores provide useful signals but their calibration—whether a 0.83 score truly indicates 83% reliability—remains an open question.

Overall, this case study demonstrates that sophisticated, long-running agentic applications are viable in production with appropriate architectural patterns for context management, multi-agent coordination, and quality validation. The three-channel approach with specialized roles and explicit validation mechanisms represents a mature pattern that other organizations could adapt for complex LLM applications requiring extended reasoning and collaboration across multiple specialized models.
