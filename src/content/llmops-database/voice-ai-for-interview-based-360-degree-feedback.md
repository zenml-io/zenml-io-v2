---
title: "Voice AI for Interview-Based 360-Degree Feedback"
slug: "voice-ai-for-interview-based-360-degree-feedback"
draft: false
llmopsTags:
  - "chatbot"
  - "speech-recognition"
  - "realtime-application"
  - "summarization"
  - "structured-output"
  - "data-analysis"
  - "unstructured-data"
  - "rag"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "error-handling"
  - "fallback-strategies"
  - "evals"
  - "latency-optimization"
  - "cost-optimization"
  - "agent-based"
  - "monitoring"
  - "orchestration"
  - "reliability"
  - "guardrails"
  - "open-source"
industryTags: "hr"
company: "Your360"
summary: "Your360 uses voice AI to make interview-based developmental 360-degree feedback more accessible than traditional executive-coaching engagements. The system conducts a self-discovery call with an employee, interviews selected colleagues confidentially, synthesizes the conversations into an anonymized report, and delivers the findings through an interactive AI coaching debrief that ends with a development plan. The production system uses cascaded speech components, explicit conversation state machines, orchestration, automated observability and evaluation, human review for flagged cases, and multiple synthesis passes to balance conversational naturalness, feedback depth, attribution accuracy, privacy, latency, model changes, and cost. The company reports expanding from early individual and pilot users to broader organizational cohorts, although the discussion provides qualitative rather than independently verified outcome metrics."
link: "https://www.youtube.com/watch?v=7FUJkQuq6Ms"
year: 2025
seo:
  title: "Your360: Voice AI for Interview-Based 360-Degree Feedback - ZenML LLMOps Database"
  description: "Your360 uses voice AI to make interview-based developmental 360-degree feedback more accessible than traditional executive-coaching engagements. The system conducts a self-discovery call with an employee, interviews selected colleagues confidentially, synthesizes the conversations into an anonymized report, and delivers the findings through an interactive AI coaching debrief that ends with a development plan. The production system uses cascaded speech components, explicit conversation state machines, orchestration, automated observability and evaluation, human review for flagged cases, and multiple synthesis passes to balance conversational naturalness, feedback depth, attribution accuracy, privacy, latency, model changes, and cost. The company reports expanding from early individual and pilot users to broader organizational cohorts, although the discussion provides qualitative rather than independently verified outcome metrics."
  canonical: "https://www.zenml.io/llmops-database/voice-ai-for-interview-based-360-degree-feedback"
  ogTitle: "Your360: Voice AI for Interview-Based 360-Degree Feedback - ZenML LLMOps Database"
  ogDescription: "Your360 uses voice AI to make interview-based developmental 360-degree feedback more accessible than traditional executive-coaching engagements. The system conducts a self-discovery call with an employee, interviews selected colleagues confidentially, synthesizes the conversations into an anonymized report, and delivers the findings through an interactive AI coaching debrief that ends with a development plan. The production system uses cascaded speech components, explicit conversation state machines, orchestration, automated observability and evaluation, human review for flagged cases, and multiple synthesis passes to balance conversational naturalness, feedback depth, attribution accuracy, privacy, latency, model changes, and cost. The company reports expanding from early individual and pilot users to broader organizational cohorts, although the discussion provides qualitative rather than independently verified outcome metrics."
notion:
  pageId: "3faf8dff-2538-800c-928c-cc71f36afe99"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-15T15:12:00.000Z"
  lastEditedTime: "2026-10-15T15:12:00.000Z"
  publishedAt: "2026-10-20T14:47:20Z"
---

## Overview

Your360 is building a voice-AI product for developmental, interview-based 360-degree feedback. Traditional 360 processes often rely on annual performance reviews, surveys, or expensive engagements involving a professional coach who interviews an employee's manager, peers, and direct reports. Your360's system attempts to make the richer interview-based format available to more employees and organizations while preserving confidentiality and giving participants a way to process the results. The intended buyers are primarily organizations with leadership-development or talent-development functions, although the product was initially validated with individuals and small cohorts.

The production workflow is organized around three AI-mediated experiences. First, a feedback recipient has a roughly 15-minute self-discovery conversation with the voice coach, currently called Tam, to discuss work context, strengths, growth areas, and the topics on which they want feedback. The recipient then selects feedback providers. Those providers participate in shorter conversations, generally around 10 to 20 minutes, in which the system elicits observations about the recipient's strengths, development areas, and requested topics. Finally, the system synthesizes the conversations into a 360 report and conducts a longer interactive debrief with the recipient. Rather than simply presenting a document, the AI walks through the findings, gives the recipient time to reflect and ask questions, and helps produce an action plan for the following weeks.

## Problem and Product Design

The central product problem is not merely collecting opinions. It is obtaining specific, candid, developmentally useful observations and presenting them in a way that encourages a growth mindset. Your360 distinguishes developmental feedback from performance management: the intended experience is not to determine compensation or promotion, but to help a person understand how their behavior is experienced by others and what they could work on next.

Voice is used as more than an alternative input channel. The company views conversation as a way to let participants explain, qualify, and explore observations without forcing them to compose polished written feedback. Feedback providers can ramble or think aloud, while the system extracts the useful signal rather than exposing a raw transcript. This is particularly important for anonymity: the organization receives synthesized outputs rather than the underlying conversations. The product also progressively reveals findings during the debrief instead of handing the recipient an undifferentiated report to read alone.

The design has to balance two competing goals. The system must gather enough detail to support a credible report, but it must also respect the limited time and attention of feedback providers who are doing a favor for a colleague. Recipient conversations can prioritize reflection and exploration, while provider conversations prioritize completion and low friction. Providers may use a telephone call or participate while away from a desk, so dropped calls, reconnection, and simple access are operational concerns.

## Voice-Agent Architecture

The team initially experimented with a single prompt and higher-level voice platforms. That approach was insufficient for a workflow containing multiple conversational phases, long calls, sensitive content, and strict requirements around transitions. The current design uses a cascaded speech architecture, separating speech recognition, language-model processing, speech synthesis, and orchestration. The company moved from a more constrained abstraction-layer platform, described as Retell, toward LiveKit as an orchestration layer so it could control the individual providers, voices, timing, user interface interactions, and application logic more directly.

Conversation state machines provide the main control structure. For example, a self-discovery call has stages for strengths, growth areas, and requested feedback topics. Each state has an intended objective and guardrails, but the agent cannot behave like a rigid questionnaire. A recipient might begin discussing a growth area while the system is nominally introducing strengths, or might answer several later questions in an earlier response. The implementation therefore needs to detect when information has already been supplied, decide whether an area has been explored deeply enough, and transition when the participant signals readiness. Prompts and transition conditions are tuned to recognize both explicit cues, such as saying they are ready to move on, and implicit conversational cues.

This architecture also addresses long-running sessions. The report-debrief call has a median duration of about 44 minutes, with some sessions reaching 90 minutes. The team encountered a default 60-minute limit in an earlier platform when an initial user continued talking for the full hour. That experience exposed the need for explicit support for extended sessions, including state persistence, orchestration, call recovery, and synchronization between the voice experience and the visual report. Earlier calls generally lasted 15 to 20 minutes, so the longer debrief introduced a substantially different reliability and interaction problem.

The system must also manage an unstable model stack. Speech-to-text, text-to-speech, orchestration, and language-model providers can change independently, and an application can regress even when its own code has not changed. The team evaluates model choices across conversational adherence, personality, time to first token, latency, speech quality, reasoning behavior, and cost. Reasoning-oriented models may be capable in text workflows but unsuitable for voice if their deliberation adds delay or causes the agent to behave less directly. The practical result is that model substitution is not treated as a drop-in upgrade; each provider and version needs to be evaluated against the specific voice workflow.

## Synthesis, Privacy, and Anonymization

The synthesis pipeline transforms multiple conversations into a structured report rather than copying transcripts. It identifies recurring strengths, growth areas, requested topics, and concrete examples, while trying to avoid repetition and overemphasizing isolated comments. The report can be viewed through organizational frameworks such as company values or leadership principles. For teams, Your360 can analyze interdependent groups such as leadership or scrum teams; for larger populations of similar roles, it can aggregate patterns against a common framework and produce an organizational heat-map-style view of potential strengths and development gaps.

Anonymity is treated as a product and safety requirement rather than a superficial data-labeling feature. The stated default requires at least four relevant feedback providers before reporting group-level patterns, and the report may identify feedback as coming from a group, such as peers or direct reports, without identifying an individual. The system also avoids exposing raw transcripts and limits access to sensitive information. One-off comments may be excluded from prominent findings, while corroborated patterns receive more weight. Manager feedback can be treated differently from peer or direct-report feedback because of how recipients interpret its authority, but the system still needs to prevent incorrect attribution.

The company uses multiple synthesis passes. One pass is primarily structural and defensive: it checks that the report follows the expected format, preserves attribution, does not accidentally attribute one person's statement to another, maintains balance between strengths and growth areas, and avoids excessive negativity or unnecessarily revealing quotations. Other passes take a more open-ended view of the same source conversations to identify potentially missed themes, alternative interpretations, or patterns that the constrained report generation may have omitted. The team compares these outputs rather than assuming that one generation is complete or correct. This is a practical form of ensemble-style quality control, although it does not eliminate the need for judgment or human escalation.

## Evaluation and Observability

Your360 reports automated observability and evaluation systems that monitor call quality and identify cases requiring intervention. The system tracks quality dimensions described as sentiment, customer value, and product quality, alongside checks for known failure modes. When a failure is found, the team can create a representative persona or scenario and add it to regression evaluations. This is important because changing a prompt, orchestration rule, model, or speech provider can solve one issue while introducing another.

Early development relied heavily on friendly users, advisers, coaches, and pilot customers who agreed that the team could inspect calls, transcripts, screen recordings, and resulting artifacts. The team used these sessions to discover failures such as dropped calls, insufficient depth, awkward interruption, poor state transitions, long-session limits, and mismatches between what a participant remembered and what actually happened. Internal team members also repeatedly interacted with the voice coach to test the experience. Product researchers compared observed behavior with post-call interviews, since a participant's perception of a 15-minute or 50-minute conversation may differ substantially from the measured duration or interaction flow.

The production policy is a targeted human-in-the-loop model rather than routine manual review of every call. Automated systems flag possible problems, and authorized personnel investigate flagged cases because incorrect attribution or misleading feedback would undermine trust. Customers may prefer additional human review even though the product is designed to automate much of the coaching workflow. This is a reasonable tradeoff for a sensitive HR application: full manual review would reduce scalability and weaken confidentiality, while zero human access would make it difficult to diagnose failures and maintain a high accuracy bar.

## Results and Tradeoffs

The company describes qualitative evidence of market adoption: it began with individual users and small organizational cohorts, and organizations that started as early pilots later expanded to broader groups such as all managers or employees. It also reports customers returning for a second 360 cycle. These signals suggest that the workflow is useful enough for some organizations to continue using it, but the available evidence does not establish causal improvements in leadership behavior, employee retention, or business performance. The product's strongest demonstrated achievement is operational: it has assembled a multi-stage voice workflow, long-session orchestration, anonymized synthesis, interactive report delivery, and evaluation infrastructure for a sensitive production use case.

The main tradeoff is between natural conversation and reliable coverage. A rigid survey is easier to validate but feels unnatural and misses information offered out of order. A completely open-ended agent can feel more human but may fail to cover required topics, over-explore one answer, or produce inconsistent reports. State machines, transition logic, structured report formats, and regression evaluations provide control, while flexible prompts and user signals preserve conversational freedom.

Other tradeoffs involve privacy versus observability, automation versus review, quality versus latency, and model capability versus cost. The system needs enough access to conversations and artifacts to perform error analysis, but access must be restricted because the content concerns interpersonal judgments in the workplace. The product therefore relies on consent and trusted early adopters during development, automated flagging in normal operation, and selective human investigation. Future work focuses on the period after the initial 360: helping recipients turn awareness into action, tracking progress between cycles, supporting follow-up feedback, and providing organizations with useful aggregate insights without exposing individual conversations.
