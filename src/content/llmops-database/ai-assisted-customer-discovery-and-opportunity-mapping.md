---
title: "AI-Assisted Customer Discovery and Opportunity Mapping"
slug: "ai-assisted-customer-discovery-and-opportunity-mapping"
draft: false
llmopsTags:
  - "document-processing"
  - "summarization"
  - "classification"
  - "data-analysis"
  - "visualization"
  - "structured-output"
  - "unstructured-data"
  - "regulatory-compliance"
  - "prompt-engineering"
  - "system-prompts"
  - "human-in-the-loop"
  - "evals"
  - "error-handling"
  - "agent-based"
  - "harness-engineering"
  - "latency-optimization"
  - "mcp"
  - "databases"
  - "orchestration"
  - "open-source"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "cache"
  - "anthropic"
  - "amazon-aws"
industryTags: "tech"
company: "Vistaly"
summary: "Vistaly transformed its product-discovery platform from a manually maintained opportunity-solution-tree canvas into an AI-assisted workflow that processes customer interviews, generates interview snapshots, synthesizes findings across interviews, and updates structured opportunity-solution trees. The system combines LLM-based extraction and synthesis with deterministic data handling, tool calls, repair loops, stable identifiers, semantic change sets, human correction paths, and production evaluation guardrails. Early users found the automated workflow substantially faster than manual synthesis, although the company continues to address input-quality problems, model-specific prompt behavior, output review, privacy requirements, and the usability of reviewing increasingly large tree updates."
link: "https://www.youtube.com/watch?v=zverZHvdpPo"
year: 2026
seo:
  title: "Vistaly: AI-Assisted Customer Discovery and Opportunity Mapping - ZenML LLMOps Database"
  description: "Vistaly transformed its product-discovery platform from a manually maintained opportunity-solution-tree canvas into an AI-assisted workflow that processes customer interviews, generates interview snapshots, synthesizes findings across interviews, and updates structured opportunity-solution trees. The system combines LLM-based extraction and synthesis with deterministic data handling, tool calls, repair loops, stable identifiers, semantic change sets, human correction paths, and production evaluation guardrails. Early users found the automated workflow substantially faster than manual synthesis, although the company continues to address input-quality problems, model-specific prompt behavior, output review, privacy requirements, and the usability of reviewing increasingly large tree updates."
  canonical: "https://www.zenml.io/llmops-database/ai-assisted-customer-discovery-and-opportunity-mapping"
  ogTitle: "Vistaly: AI-Assisted Customer Discovery and Opportunity Mapping - ZenML LLMOps Database"
  ogDescription: "Vistaly transformed its product-discovery platform from a manually maintained opportunity-solution-tree canvas into an AI-assisted workflow that processes customer interviews, generates interview snapshots, synthesizes findings across interviews, and updates structured opportunity-solution trees. The system combines LLM-based extraction and synthesis with deterministic data handling, tool calls, repair loops, stable identifiers, semantic change sets, human correction paths, and production evaluation guardrails. Early users found the automated workflow substantially faster than manual synthesis, although the company continues to address input-quality problems, model-specific prompt behavior, output review, privacy requirements, and the usability of reviewing increasingly large tree updates."
notion:
  pageId: "3ecf8dff-2538-80c5-9d57-f51d92e5b24b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-01T08:35:00.000Z"
  lastEditedTime: "2026-10-01T08:35:00.000Z"
  publishedAt: "2026-10-11T09:46:06Z"
---

## Overview

Vistaly is a product-management SaaS platform for organizing customer discovery around opportunity solution trees (OSTs). An OST connects a business or product outcome to customer opportunities, possible solutions, and the assumptions that require testing. The original product gave teams a purpose-built visual alternative to tools such as Miro, Mural, or FigJam, while retaining interview evidence and supporting detail behind each node. The central problem was that product teams often conduct customer interviews but perform only shallow synthesis, lose evidence in disconnected research repositories, or manually maintain diagrams that become difficult to update and interpret.

Vistaly’s newer workflow uses LLMs to process uploaded customer interviews into structured interview snapshots, synthesize several snapshots into an initial opportunity-solution tree, and incorporate additional interviews into an existing tree. This is not presented as a fully autonomous decision-maker. The production design combines model-generated analysis with application tools, deterministic data transformations, validation and repair loops, change tracking, user edits, and ongoing evaluation. The reported benefit is practical rather than a quantified business metric: even early, relatively slow AI workflows were faster than the teams’ previous manual process and made synthesis more likely to happen. The main limitation is that the resulting tree is only as reliable as the interviews and intermediate analyses from which it is generated.

## Problem and Product Context

Vistaly began as software for visually representing opportunity solution trees and related product or KPI structures. Manual canvas tools were flexible but created operational problems: moving a branch could require redrawing connections, large diagrams created excessive cognitive load, and the supporting evidence for an opportunity was usually stored elsewhere. Vistaly therefore associated interview notes, excerpts, and potentially video clips with individual opportunity nodes. Users could inspect the evidence behind a tree rather than treating the diagram as an unsupported collection of opinions.

The arrival of generative AI changed user expectations. Product teams were uploading interview material to general-purpose models such as Claude and asking for shortcut synthesis or automatically generated trees. Vistaly observed requests for these capabilities and some churn pressure around the possibility that customers would prefer an AI-native discovery workflow. The company chose not merely to add isolated AI features to its first product, but to rebuild much of the system as V2 around the new workflow. V1 remained available to existing customers, but new signups were directed toward the V2 beta or waitlist while the team concentrated on the redesigned architecture and experience.

## Production Workflow and Architecture

In V2, a user uploads three customer interviews as an initial input. The system creates an interview snapshot for each interview, identifying elements such as the customer’s journey, problems, pain points, unmet needs, and other relevant evidence. It then synthesizes the snapshots into a first draft of an opportunity-solution tree. Additional interviews can be uploaded later, after which a synthesis operation updates the existing tree rather than generating an unrelated artifact from scratch.

The workflow evolved from an early guided conversational interface. That prototype processed one interview at a time and walked the user through individual extracted insights. The model was given a product-manager-oriented system prompt, a pre-seeded opening message, and tools for finding matching cards in the existing tree or creating new cards. A single interview with many insights could require many model and database interactions, including asynchronous calls and streamed responses. Although this was faster than manual work, users experienced the chat flow as slow because the conversational interface established an expectation of immediate answers. Vistaly subsequently moved toward automated batch-style extraction and synthesis, with review and correction available when needed rather than forcing users through every intermediate step.

A key architectural principle is layered analysis. The system first extracts meaningful moments and opportunities from each interview. It then consolidates findings across interviews, determines how interview-level opportunities map to consolidated tree opportunities, and organizes the resulting structure into branches. This resembles a data pyramid: higher-level tree synthesis depends on the quality of lower-level extraction and snapshot generation. The team explicitly recognized that an LLM should not repeatedly reason over unstructured raw transcripts whenever a structured intermediate representation can provide better context, consistency, and speed.

## Reliability, State, and Tooling

The hardest production problems were not simply generating plausible text. The model had to modify a structured, collaborative artifact while preserving application state. Early prototypes allowed models to drop identifiers, change IDs unpredictably, place opportunity text in ID fields, or otherwise produce invalid updates. These failures exposed the need for stable identifiers, provenance, deterministic application logic, and explicit state-transition rules.

Vistaly initially attempted to derive a change set by comparing an input tree with an output tree. That was insufficient because the same pair of trees can be explained by multiple technically valid diffs. A semantic merge, for example, is materially different to a user from deleting one node and reassigning its evidence elsewhere. The revised design taught the agent a constrained set of meaningful tree operations, or “moves,” and required it to record those operations while constructing the update. Deterministic application code then validates that the change set can be applied to the original tree to produce the intended result and that the resulting update remains semantically intelligible to the user.

This design separates probabilistic reasoning from state mutation. The LLM proposes or selects semantic operations, while application code enforces identifiers, schema expectations, relationships, and reproducible execution. Vistaly also added validation and repair loops. A model performs an activity, a tool checks for errors, and the model is asked to correct the result until validation succeeds or a maximum retry limit is reached. The team reported that identifier issues and change-set defects became substantially less frequent after these controls were introduced, although occasional problems still required attention.

## Evaluation and Guardrails

The system’s evaluation work is organized around concrete error modes rather than a single generic quality score. One example involved tree nodes with too many children, which indicated that related opportunities might not have been grouped into meaningful subcategories. A simple code assertion first flagged nodes above a child-count threshold. This reduced the cost of semantic evaluation because an LLM-as-judge was used only on suspicious nodes rather than every node.

The semantic judge was calibrated against manually labeled examples. The team found that judge calibration itself could be distorted when the evaluation examples contained upstream errors such as poorly framed opportunities or incorrect placement. Prompt-only changes caused a tradeoff: encouraging more subgrouping could produce poorly framed parent nodes, while stricter framing rules could cause the model to avoid creating parents altogether. The eventual solution was an orchestration change, not a magical prompt. The child-overload condition was added to a targeted repair loop, allowing one process to preserve well-framed parent descriptions while another repair step addressed grouping structure.

This illustrates an important LLMOps lesson from the case: prompts, judges, and downstream metrics cannot be treated independently when outputs form a multi-stage pipeline. An upstream extraction error can appear as a downstream tree-organization error, and fixing one layer can expose or amplify defects in another. Vistaly’s evaluation approach therefore combines code-level assertions, calibrated model-based judgment, targeted repair, production event data, and qualitative customer conversations. The team also plans to use user actions such as reframing an opportunity or moving a node as signals for error analysis, rather than relying only on explicit thumbs-up or thumbs-down feedback.

## Human Oversight and User Experience

Vistaly originally designed the AI as a collaborative draft that users would inspect and approve. In practice, many users preferred to see the generated tree immediately and did not want to review every snapshot before synthesis. The product consequently shifted toward automation while retaining ways to edit and correct the result. This is a pragmatic human-in-the-loop design: users are not required to validate every intermediate model decision, but the artifact remains editable and updates are represented as changes that can be understood and, ideally, reversed.

As trees become larger, the principal UX challenge changes from generation to comprehension. A first tree based on three interviews is relatively easy to inspect. Later updates can include merges, new opportunities, moves, and source reassignment, making it difficult to determine what changed without overwhelming the user. Vistaly is exploring a combination of direct canvas editing and an agent that explains or applies changes through natural language. This introduces additional requirements for scoped tools, versioning, undo and rollback, permissions, and protection against accidentally overwriting colleagues’ work. The company recognizes that a chat interface creates a high expectation that the assistant can access all relevant workspace content and perform nearly any action, so exposing a limited or poorly scoped agent can be misleading.

## Data Quality, Privacy, and Model Operations

The quality of customer interviews is a major constraint. Uploaded material may be a genuine discovery interview, a sales demonstration, a stakeholder meeting, a team conversation, a leading-question session, or even synthetic or otherwise low-quality content. If the input does not provide strong evidence, a polished generated tree can create false confidence. Vistaly is considering interview coaching and signal-quality feedback so that the system can warn users about weak evidence instead of presenting it as established customer truth. This is especially important because users may interpret an expert-associated product as implicitly endorsing every generated result.

The company also treats customer interview data as sensitive enterprise information. It has worked on privacy, regional data isolation, deletion workflows, and compliance requirements including GDPR, SOC 2, and ISO-related work. Because some customers did not want their data or inference routed through US-hosted services, the implementation moved some production inference from Anthropic’s direct API to Amazon Bedrock, including European Bedrock inference. That choice improved regional deployment options but introduced tradeoffs: Bedrock may not expose every provider feature or model capability, and service-level token limits can differ from the limits of the underlying model. The team therefore needs deployment-specific behavior and testing rather than assuming that an API migration is transparent.

Production model selection is also less interchangeable than it first appears. Vistaly primarily uses Anthropic models, with production behavior and prompts tuned to a particular model version. Upgrading to a newer model is treated as a migration project because prompt behavior, tool use, caching, and output quality can change. The team maintains the ability to run model experiments and uses other models in evaluations, but it has not found that simply routing requests among many models automatically produces better results. Model-specific prompts, orchestration, provider features, cost, regional availability, and evaluation scores all influence the choice.

## Results and Tradeoffs

The case demonstrates that LLMs can make a difficult product-research activity more accessible, particularly for teams that previously abandoned synthesis or extracted only the most memorable interview comments. Early users reportedly found even the imperfect guided workflow faster than their previous process, and the V2 product makes it possible to turn several interviews into a structured starting tree with substantially less manual effort. The reported outcome is therefore improved workflow adoption and speed, not proof that the generated trees are objectively correct or that product decisions improved by a measured percentage.

The tradeoffs are substantial. Automation can raise the floor for inexperienced teams, but it can also make weak interviews look authoritative. Conversational workflows provide flexibility but may feel slow and imply broad capabilities. More repair loops improve reliability but add model calls, latency, and cost. Hosted model services can support compliance and regional controls while limiting access to the newest features. LLM-based semantic judgments are useful but require calibration and can be contaminated by errors in their own test data. Finally, rebuilding around AI enabled Vistaly to remove architectural baggage and reach early V2 users quickly, but it also required reworking core services after the team discovered the importance of provenance, stable IDs, semantic operations, and deterministic state management. The strongest production lesson is that dependable LLM applications require an engineered system around the model: structured intermediate data, explicit domain operations, validation, repair, evaluation, privacy controls, and a UX that makes uncertainty and change understandable.
