---
title: "The Hidden Complexities of Building Production LLM Features: Lessons from Honeycomb's Query Assistant"
slug: "the-hidden-complexities-of-building-production-llm-features-lessons-from-honeycomb-s-query-assistant"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3dc5c4b043ab73685d4e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:39:01.573Z"
  createdOn: "2024-11-21T14:03:49.957Z"
llmopsTags:
  - "compliance"
  - "cost-optimization"
  - "documentation"
  - "error-handling"
  - "fallback-strategies"
  - "guardrails"
  - "high-stakes-application"
  - "latency-optimization"
  - "legacy-system-integration"
  - "openai"
  - "prompt-engineering"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "security"
  - "system-prompts"
industryTags: "tech"
company: "Honeycomb"
summary: "Honeycomb shares candid insights from building Query Assistant, their natural language to query interface, revealing the complex reality behind LLM-powered product development. Key challenges included managing context window limitations with large schemas, dealing with LLM latency (2-15+ seconds per query), navigating prompt engineering without established best practices, balancing correctness with usefulness, addressing prompt injection vulnerabilities, and handling legal/compliance requirements. The article emphasizes that successful LLM implementation requires treating models as feature engines rather than standalone products, and argues that early access programs often fail to reveal real-world implementation challenges."
link: "https://www.honeycomb.io/blog/hard-stuff-nobody-talks-about-llm"
year: 2024
seo:
  title: "Honeycomb: The Hidden Complexities of Building Production LLM Features: Lessons from Honeycomb's Query Assistant - ZenML LLMOps Database"
  description: "Honeycomb shares candid insights from building Query Assistant, their natural language to query interface, revealing the complex reality behind LLM-powered product development. Key challenges included managing context window limitations with large schemas, dealing with LLM latency (2-15+ seconds per query), navigating prompt engineering without established best practices, balancing correctness with usefulness, addressing prompt injection vulnerabilities, and handling legal/compliance requirements. The article emphasizes that successful LLM implementation requires treating models as feature engines rather than standalone products, and argues that early access programs often fail to reveal real-world implementation challenges."
  canonical: "https://www.zenml.io/llmops-database/the-hidden-complexities-of-building-production-llm-features-lessons-from-honeycomb-s-query-assistant"
  ogTitle: "Honeycomb: The Hidden Complexities of Building Production LLM Features: Lessons from Honeycomb's Query Assistant - ZenML LLMOps Database"
  ogDescription: "Honeycomb shares candid insights from building Query Assistant, their natural language to query interface, revealing the complex reality behind LLM-powered product development. Key challenges included managing context window limitations with large schemas, dealing with LLM latency (2-15+ seconds per query), navigating prompt engineering without established best practices, balancing correctness with usefulness, addressing prompt injection vulnerabilities, and handling legal/compliance requirements. The article emphasizes that successful LLM implementation requires treating models as feature engines rather than standalone products, and argues that early access programs often fail to reveal real-world implementation challenges."
---

## Overview

Honeycomb, an observability platform company, developed Query Assistant, a natural language querying interface that allows users to express desired queries in plain English (e.g., "Which service has the highest latency?" or "What are my errors, broken down by endpoint?"). The system translates these natural language inputs into structured Honeycomb queries. This case study provides a candid and technically detailed account of the challenges faced when building production-grade LLM features, offering valuable insights that cut through the typical AI hype.

The article, written by Phillip Carter in May 2023, stands out for its honest assessment of the difficulties in productionizing LLMs. The author explicitly acknowledges that "a lot of that hype is just some demo bullshit that would fall over the instant anyone tried to use it for a real task that their job depends on." This refreshingly pragmatic perspective sets the tone for a detailed exploration of real-world LLMOps challenges.

## Technical Architecture

Query Assistant operates through prompt engineering, assembling various pieces of context to send to an LLM. The prompt includes the user's natural language input, information about Honeycomb query structure (visualization operators, filter operators, clause structure), domain knowledge about instrumentation data (e.g., understanding that trace.parent_id does-not-exist refers to a root span), the customer's schema (real columns needed for queries), several examples in a few-shot format, any existing query context, and specific instructions.

The output from the LLM is parsed, validated, and corrected if possible before executing against Honeycomb's query engine. Notably, the team deliberately avoided implementing a chat UI, believing it was the wrong interface for their use case. They opted for minimal UI changes—just a textbox and button—while keeping the rest of the standard Honeycomb interface intact.

## Context Window Challenges

One of the most significant technical challenges was handling the LLM context window limitations. Some Honeycomb customers have schemas with over 5,000 unique fields, far exceeding what can fit in the context window of models like gpt-3.5-turbo. The team evaluated several approaches to address this constraint.

They considered disabling the feature for large schemas, chunking schemas and making concurrent LLM calls with relevancy scoring, chaining LLM calls to iteratively build and refine queries, using embeddings with distance functions to select relevant schema subsets, and finding creative alternatives. The team ultimately discovered that constraining schemas to fields that received data in the past seven days significantly reduced schema sizes and usually fit within the context window. However, even this approach wasn't sufficient for all customers, sometimes requiring field truncation that led to hit-or-miss experiences.

The team experimented with Claude 100k's larger context window but found it to be several times slower with full schemas and more prone to hallucinations compared to using embeddings to select smaller, relevant field subsets. The honest assessment: "there's no complete solution to the context window problem."

## Latency and Chaining Considerations

Commercial LLMs like gpt-3.5-turbo and Claude were identified as the best available options at the time, though latency ranged from 2 to 15+ seconds depending on various factors including model choice, input complexity, schema size, and prompt instructions. GPT-4 API access was available but deemed "far too slow" for their use case.

The team explicitly rejected chaining approaches popularized by frameworks like LangChain. Beyond the latency multiplication issue, they highlighted the compound probability problem: a 90% accurate process repeated 5 times results in only 59% accuracy (0.9^5 = 0.59). While there are mitigation strategies, the team found "no tangible improvements in the ability to generate a Honeycomb query when chaining LLM calls together." The pointed warning: "LangChain won't solve all your life's problems."

## Prompt Engineering Challenges

The case study provides valuable insights into prompt engineering experimentation. The team tried zero-shot prompting (didn't work), single-shot prompting (worked poorly), few-shot prompting with examples (worked well), the "Let's think step by step" technique (made outputs less likely for ambiguous inputs), and chain of thought prompting (unclear results due to insufficient validation time).

A particularly interesting finding was the tension between correctness and usefulness. Users submitted extremely varied inputs—from highly specific queries using exact Honeycomb terminology to extremely vague inputs like just the word "slow." The team's philosophy was to show something rather than nothing, even for vague inputs. However, zero-shot chain of thought prompting actually made this worse by reliably failing to generate queries for vague inputs.

Additionally, the team had to balance user intent with best practices. For example, aggregations like AVG() or P90() hide full distributions, so the team wanted to automatically pair them with HEATMAP() visualizations. This domain knowledge integration complicated prompt engineering efforts, as optimizing for one aspect often degraded another.

## Security: Prompt Injection Defenses

The team took prompt injection seriously, describing it as "kinda like SQL injection, except worse and with no solution today." Their defensive measures included ensuring LLM outputs are non-destructive and undoable, preventing any human paging based on LLM output, keeping the LLM disconnected from databases and other services, parsing and validating LLM output into specific formats, avoiding a chat UI to make prompt injection experimentation more difficult, truncating inputs and allowed outputs, and implementing per-user daily rate limits.

The team explicitly noted that people were already attempting prompt injection in their system, including attempts to extract information from other customers. Their most critical safeguard was ensuring LLM operations never touch sensitive user data.

## Legal and Compliance Requirements

The team addressed several legal and compliance concerns as part of productionization. They conducted a full security and compliance audit of LLM providers (only OpenAI met their requirements), drafted new terms and conditions detailing data handling, updated overall terms of service, ensured terms were accessible within the UI, provided easy controls to disable the feature entirely, and flagged out customers with BAAs (Business Associate Agreements) requiring case-by-case handling.

The emphasis on completing this work before launch, despite time pressure, reflects mature product thinking: "You might think it's unnecessary to do this sort of thing for an initial launch, but it is if you care about keeping your customers trusting and happy."

## Product Philosophy and Lessons Learned

The team emphasized that LLMs are "engines for features," not products themselves. They deliberately avoided creating "HoneycombGPT" as a thin wrapper around OpenAI's API, focusing instead on extending their existing product UI. The bulk of the work involved standard product activities: design validation, aggressive scoping to meet a one-month deadline, decision-making around roadblocks, and extensive dogfooding.

The critique of Early Access programs is particularly noteworthy: the team argues that unless such programs have large, representative user samples, they merely create false confidence. Real-world user behavior consistently surprised them with edge cases and unexpected inputs. Their recommendation is to ship broadly and learn from real usage rather than hiding behind limited access programs.

## Key Takeaways for LLMOps Practitioners

This case study offers several pragmatic lessons for anyone building LLM-powered features. Context window management requires creative solutions, and there's no silver bullet—even larger context windows come with trade-offs. Chaining LLM calls introduces compounding latency and accuracy issues that may not be worth the complexity. Prompt engineering remains more art than science, with trade-offs between handling broad inputs and producing correct outputs. Security requires defense in depth, with the most important safeguard being non-destructive, reversible operations. Legal and compliance work cannot be deferred if you have enterprise customers. And finally, LLMs should be treated as feature enablers, not products in themselves—standard product development practices still apply.