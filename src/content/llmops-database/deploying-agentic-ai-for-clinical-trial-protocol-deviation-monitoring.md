---
title: "Deploying Agentic AI for Clinical Trial Protocol Deviation Monitoring"
slug: "deploying-agentic-ai-for-clinical-trial-protocol-deviation-monitoring"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6908a11af496ab9e7008456e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:24:58.575Z"
  createdOn: "2025-11-03T12:33:30.618Z"
llmopsTags:
  - "healthcare"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "document-processing"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "evals"
  - "langchain"
  - "llama-index"
  - "fastapi"
  - "pytorch"
  - "documentation"
  - "monitoring"
  - "guardrails"
  - "reliability"
industryTags: "healthcare"
company: "Bayezian Limited"
summary: "Bayezian Limited deployed a multi-agent AI system to monitor protocol deviations in clinical trials, where traditional manual review processes were time-consuming and error-prone. The system used specialized LLM agents, each responsible for checking specific protocol rules (visit timing, medication use, inclusion criteria, etc.), working on top of a pipeline that processed clinical documents and used FAISS for semantic retrieval of protocol requirements. While the system successfully identified patterns early and improved reviewer efficiency by shifting focus from manual checking to intelligent triage, it encountered significant challenges including handover failures between agents, memory lapses causing coordination breakdowns, and difficulties handling real-world data ambiguities like time windows and exceptions. The team improved performance through structured memory snapshots, flexible prompt engineering, stronger handoff signals, and process tracking, ultimately creating a useful but imperfect system that highlighted the gap between agentic AI theory and production reality."
link: "https://aihub.org/2025/09/15/deploying-agentic-ai-what-worked-what-broke-and-what-we-learned/"
year: 2025
seo:
  title: "Bayezian Limited: Deploying Agentic AI for Clinical Trial Protocol Deviation Monitoring - ZenML LLMOps Database"
  description: "Bayezian Limited deployed a multi-agent AI system to monitor protocol deviations in clinical trials, where traditional manual review processes were time-consuming and error-prone. The system used specialized LLM agents, each responsible for checking specific protocol rules (visit timing, medication use, inclusion criteria, etc.), working on top of a pipeline that processed clinical documents and used FAISS for semantic retrieval of protocol requirements. While the system successfully identified patterns early and improved reviewer efficiency by shifting focus from manual checking to intelligent triage, it encountered significant challenges including handover failures between agents, memory lapses causing coordination breakdowns, and difficulties handling real-world data ambiguities like time windows and exceptions. The team improved performance through structured memory snapshots, flexible prompt engineering, stronger handoff signals, and process tracking, ultimately creating a useful but imperfect system that highlighted the gap between agentic AI theory and production reality."
  canonical: "https://www.zenml.io/llmops-database/deploying-agentic-ai-for-clinical-trial-protocol-deviation-monitoring"
  ogTitle: "Bayezian Limited: Deploying Agentic AI for Clinical Trial Protocol Deviation Monitoring - ZenML LLMOps Database"
  ogDescription: "Bayezian Limited deployed a multi-agent AI system to monitor protocol deviations in clinical trials, where traditional manual review processes were time-consuming and error-prone. The system used specialized LLM agents, each responsible for checking specific protocol rules (visit timing, medication use, inclusion criteria, etc.), working on top of a pipeline that processed clinical documents and used FAISS for semantic retrieval of protocol requirements. While the system successfully identified patterns early and improved reviewer efficiency by shifting focus from manual checking to intelligent triage, it encountered significant challenges including handover failures between agents, memory lapses causing coordination breakdowns, and difficulties handling real-world data ambiguities like time windows and exceptions. The team improved performance through structured memory snapshots, flexible prompt engineering, stronger handoff signals, and process tracking, ultimately creating a useful but imperfect system that highlighted the gap between agentic AI theory and production reality."
---

## Overview

This case study from Bayezian Limited provides a candid, practitioner-focused account of deploying agentic AI systems in production for clinical trial protocol deviation monitoring. Written by Francis Osei, Clinical AI & Data Scientist at Bayezian Limited, the article explicitly positions itself as a reality check against the hype surrounding agentic AI, emphasizing lived experience over theoretical ideals. The work takes place in a highly regulated environment where trust, reproducibility, and compliance with standards like CDISC are mandatory rather than optional.

Bayezian Limited operates at the intersection of data science, statistical modeling, and clinical AI governance. The company has deployed agentic systems across multiple internal projects including generating clinical codes from statistical analysis plans, monitoring synthetic Electronic Health Records for rule violations, and running chained reasoning loops to validate document alignment. The case study focuses specifically on a multi-agent system designed to detect protocol deviations in clinical trial data streams, a task traditionally requiring painstaking manual review of spreadsheets and protocol documents.

## The Problem Domain

Clinical trials generate complex data streams including scheduled lab results, adverse event logs, visit records, and medication tracking. Hidden within these streams are subtle protocol deviations that can affect safety, skew outcomes, and trigger regulatory scrutiny. Examples include visits occurring outside allowed time windows, skipped tests, or improper dose changes. Traditional review processes are time-consuming, context-dependent, and prone to delays or oversights. The team sought to build an AI-driven approach that could act as a vigilant reviewer to help human teams focus on issues requiring genuine clinical judgment, rather than replacing human oversight entirely.

## System Architecture and Design

The system was built around a multi-agent architecture where each agent had a focused responsibility for checking specific types of protocol rules. Rather than using one large model for everything, the task was decomposed into smaller, more manageable parts. Individual agents reviewed visit timing, medication use, inclusion/exclusion criteria, missed procedures, and serious adverse events. This modular approach made each agent easier to understand, test, and less likely to be overwhelmed by conflicting information.

A critical early component was a classifier that determined the type of incoming document (screening form, post-randomization visit report, etc.), which then routed the document to appropriate downstream agents. For screening files, the inclusion/exclusion criteria checker was activated. For visit documents, agents responsible for timing, treatment exposure, scheduled procedures, and adverse events were engaged.

Importantly, Bayezian chose to build their system largely from the ground up rather than relying heavily on packaged orchestration frameworks like LangChain or LlamaIndex. While they explored these frameworks, they ultimately constructed a lightweight pipeline using well-tested Python tools to maintain greater control over transparency and integration—critical requirements for regulatory traceability. For semantic memory and search capabilities, protocol content was indexed using FAISS, a vector store optimized for fast similarity-based retrieval. This allowed agents to fetch relevant protocol rules dynamically and reason through them with appropriate context.

The system operated in two phases. In the first phase (green in their architecture diagram), protocol documents were parsed, structured, and embedded into searchable memory. In the second phase (orange), real-time agents classified incoming clinical data from the Clinical Trial Management System (CTMS), reasoned over protocol rules, detected deviations, and escalated issues with human oversight. Throughout the process, structured memory stores maintained key protocol elements that agents could reference, and handoff mechanisms attempted to pass context between agents as tasks progressed through the workflow.

## Production Challenges and Failure Modes

The case study is particularly valuable for its honest account of where agentic systems struggled in production. While early tests on structured examples showed promise, moving to real trial conditions exposed significant gaps. Real-world data rarely follows neat patterns—information arrives out of order, visit dates overlap, and exceptions buried in footnotes become critical.

One of the most frequent and problematic issues was handover failure. A deviation might be correctly identified by one agent, only to be lost, misunderstood, or misclassified by the next agent in the chain. These were not coding errors but coordination breakdowns—small lapses in memory between steps that led to significant differences in outcomes. The information needed for proper decision-making was often available in the system but not in the right place at the right time.

Decisions based on time windows proved especially fragile. An agent might recognize that a visit was missing but fail to remember whether the protocol allowed a buffer period. This kind of reasoning required holding specific details in working memory, and without that capability, agents would misfire—sometimes raising alarms too early, other times not at all.

A concrete example illustrates the problem: An agent flagged a missing Day 14 lab test as a protocol deviation. However, the protocol allowed a two-day window on either side of Day 14, and a test had been recorded on Day 13. The information about the allowable window had been extracted and embedded in the system's memory, but at the moment of evaluation, that context wasn't carried through. The agent saw an empty cell for Day 14 and treated it as a breach. From a human perspective, this would have been trivial to resolve with a glance at the timeline, but for the agent, the absence of flexibility in its immediate prompt triggered an incorrect response. This false positive triggered unnecessary escalation and pulled attention away from genuine issues.

The author emphasizes that these failures highlighted the difference between autonomy and understanding. Agents could follow instructions and maintain logic across complex checks, but they didn't infer the way people do—they didn't fill in blanks or read between the lines effectively.

## Iterative Improvements and LLMOps Practices

The team made several targeted changes to stabilize the system based on their observations of failure modes. First, they introduced structured memory snapshots that acted like running notes, capturing key protocol rules and exceptions at each stage. Rather than expecting every agent to remember what came before, they created a shared reference space. This made it easier to maintain details like visit windows or exemption clauses as tasks moved between agents.

Second, they moved beyond rigid prompt templates. Early versions relied on predefined phrasing that limited agent flexibility. Over time, they allowed agents to generate their own sets of questions and reason through answers independently, giving them more space to interpret ambiguous situations. Prompts were rewritten to be clearer and more grounded in the original trial language, using phrasing that study nurses would naturally use. Small improvements in prompt wording made noticeable differences in performance.

Third, they added stronger handoff signals—markers that told the next agent what had just happened, what context was essential, and what action was expected. This was analogous to writing handover notes for a colleague. Without these signals, agents sometimes acted without full context or missed the point altogether.

Finally, they built in process checks to track what happened after alerts were raised: Did the follow-up agent respond? Was the right report generated? If not, where did the thread break? These checks provided better visibility into system behavior and helped spot patterns that weren't obvious from output alone.

None of these changes made the system perfect, but they made errors easier to trace and fixes faster to test, building confidence that when something went wrong, the team would know where to look.

## Evaluation Approach

The team developed an evaluation methodology grounded in practical use rather than theoretical benchmarks. They asked clinical reviewers to manually mark protocol deviations in a set of patient records, creating a gold standard reference set. They then ran the same data through the agentic system and tracked matches, calculating sensitivity and specificity—essentially, how well the system picked up real issues and avoided false alarms.

Critically, they also evaluated the process itself, not just individual agent decisions. They tracked handovers between agents, whether detected issues were correctly passed along, whether follow-up steps were triggered, and whether the right outputs were produced. This revealed that getting the right answer was necessary but insufficient—information had to reach the right place at the right time.

The team paid attention to metrics rarely featured in research papers: consistency across repeated attempts, memory retention across steps, tool usage appropriateness, and the frequency of human intervention required. They looked at system stability from one run to the next and monitored how information moved through the system without being lost or altered. These practical indicators proved more revealing about real-world performance than traditional benchmarks.

## Results and Practical Value

The system proved genuinely useful despite not living up to theoretical promises. It spotted patterns early, highlighted issues that might have been overlooked, and changed how people interacted with the data. Rather than spending hours checking every line, reviewers focused on edge cases and thought more critically about responses. The role shifted from manual detective work to intelligent triage.

What agentic AI provided was structure rather than magic: pace for routine checks, consistency in decisions, and visibility into what was flagged and why. Every alert came with a traceable rationale and every step with a record, making it easier to explain and trust the system. The experience demonstrated that agents excel at following instructions, handling repetition, and maintaining logic across complex checks—valuable capabilities in clinical research where consistency matters as much as cleverness.

However, the system also clarified fundamental limitations. Agents don't infer like people do, don't fill in blanks effectively, and struggle with coordination across complex workflows. The work didn't suggest agentic systems were ready to run trials autonomously, but it did show they could support processes in measurable, transparent, and worthwhile ways.

## Broader Context and Call for Better Evaluation

The author positions this work within broader research on agentic AI in clinical contexts, referencing work on automating clinical pharmacology modeling and trial design, agentic retrieval-augmented generation for patient-facing systems, and multi-agent systems simulating cross-disciplinary collaboration in therapeutic molecule design.

The case study concludes with a call for practical evaluation standards that focus on what happens when systems are used in the real world rather than what they're supposed to do in principle. The author argues that the most useful insights emerge from failure modes—when agents lose track of tasks, forget what just happened, or take unexpected turns under pressure. Current evaluation approaches remain too abstract and don't reflect what it takes to complete tasks that unfold over time, involve memory management, tool switching, and multi-agent coordination.

## Critical LLMOps Lessons

This case study is valuable for its balanced, critical perspective on agentic AI in production. Key LLMOps takeaways include:

- **Architecture choices matter deeply**: The decision to build custom pipelines rather than rely on packaged frameworks reflected regulatory and transparency requirements specific to healthcare.

- **Memory and state management are critical failure points**: The gap between having information available in the system and having it accessible at the right moment for the right agent proved to be a dominant challenge.

- **Handoff and coordination mechanisms require explicit design**: Inter-agent communication doesn't happen reliably without structured handoff signals and shared memory constructs.

- **Prompt engineering remains essential but insufficient**: While better prompts helped, they couldn't solve coordination and memory issues on their own.

- **Evaluation must reflect production conditions**: Traditional LLM benchmarks don't capture the complexity of multi-step, multi-agent workflows operating on ambiguous real-world data.

- **Human-in-the-loop is not optional**: The system was designed for intelligent triage and augmentation, not full automation, reflecting realistic expectations for high-stakes domains.

- **Traceability and interpretability are production requirements**: Every decision needed a traceable rationale for regulatory compliance, influencing architecture and tooling choices throughout.

The case study stands out for avoiding both excessive hype and undue pessimism, instead offering a grounded account of what it actually takes to deploy agentic AI systems in regulated, high-stakes production environments where reliability, interpretability, and compliance are mandatory.