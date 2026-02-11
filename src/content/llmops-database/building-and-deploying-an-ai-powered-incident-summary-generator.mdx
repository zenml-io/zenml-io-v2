---
title: "Building and Deploying an AI-Powered Incident Summary Generator"
slug: "building-and-deploying-an-ai-powered-incident-summary-generator"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3d17cecffc957880e4cc"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:38:00.230Z"
  createdOn: "2024-11-21T14:00:55.123Z"
llmopsTags:
  - "cache"
  - "compliance"
  - "documentation"
  - "error-handling"
  - "guardrails"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "security"
  - "structured-output"
  - "system-prompts"
industryTags: "tech"
company: "Incident.io"
summary: "incident.io developed an AI feature to automatically generate and suggest incident summaries using OpenAI's models. The system processes incident updates, Slack conversations, and metadata to create comprehensive summaries that help newcomers get up to speed quickly. The feature achieved a 63% direct acceptance rate, with an additional 26% of suggestions being edited before use, demonstrating strong practical utility in production."
link: "https://incident.io/blog/lessons-learned-from-building-our-first-ai-product"
year: 2024
seo:
  title: "Incident.io: Building and Deploying an AI-Powered Incident Summary Generator - ZenML LLMOps Database"
  description: "incident.io developed an AI feature to automatically generate and suggest incident summaries using OpenAI's models. The system processes incident updates, Slack conversations, and metadata to create comprehensive summaries that help newcomers get up to speed quickly. The feature achieved a 63% direct acceptance rate, with an additional 26% of suggestions being edited before use, demonstrating strong practical utility in production."
  canonical: "https://www.zenml.io/llmops-database/building-and-deploying-an-ai-powered-incident-summary-generator"
  ogTitle: "Incident.io: Building and Deploying an AI-Powered Incident Summary Generator - ZenML LLMOps Database"
  ogDescription: "incident.io developed an AI feature to automatically generate and suggest incident summaries using OpenAI's models. The system processes incident updates, Slack conversations, and metadata to create comprehensive summaries that help newcomers get up to speed quickly. The feature achieved a 63% direct acceptance rate, with an additional 26% of suggestions being edited before use, demonstrating strong practical utility in production."
---

## Overview

Incident.io is an incident management tool that helps organizations collaborate during incident response. A central challenge they identified was keeping incident summaries fresh and up-to-date—responders are typically focused on mitigating issues and don't have bandwidth to maintain documentation. This case study documents their journey building their first production AI feature: suggested summaries powered by OpenAI's models.

The project began with a prototype in early 2023 by one of their founding engineers, which demonstrated that summarizing incidents using updates, Slack conversations, and metadata was feasible. Once OpenAI improved model performance and reliability, the team invested in building a production-ready native experience. A small team (one product engineer lead, one engineer, and one data analyst) scoped and built the initial working version in five days, launching to all customers in November 2023.

## Human-in-the-Loop Design Philosophy

One of the most significant LLMOps decisions documented in this case study was the choice between automatic summarization versus human-approved suggestions. The team debated two approaches: proposing summaries for human acceptance/rejection, or automatically updating summaries with an undo option. Despite arguments that any fresh summary would be better than a stale one, they chose the human-approval approach.

Their reasoning was grounded in observed user behavior with AI features—when AI does something unhelpful, users tend to either ignore all AI suggestions or disable the feature entirely. They observed this "rage against the machine" behavior during early access testing. The design philosophy was to position AI as a "helpful side-kick" rather than forcing users to clean up AI mistakes. This represents a mature understanding of LLM deployment challenges: even highly capable models produce enough errors that user trust can erode quickly without proper guardrails.

## Feedback Collection and Metrics

A critical production LLMOps practice was implementing explicit feedback buttons on every suggestion: accept, edit, and "bad suggestion." The "bad suggestion" button was purely for tracking purposes, not user workflow, allowing the team to measure how often suggestions were unhelpful.

At the time of writing, their metrics showed:
- 20% of suggestions get actioned (a button is clicked)
- Of actioned suggestions: 63% accepted, 26% edited, 11% rejected

These metrics provided concrete evidence for their human-in-the-loop design decision—since the majority of suggestions go unused, they don't have high enough conviction to auto-set summaries. However, the data also suggested considering changes to make suggestions more visible (they're currently hidden in a thread). This demonstrates using production feedback to drive iteration decisions rather than relying solely on offline evaluation.

## Prompt Engineering Practices

The case study offers candid insights into the challenges of prompt engineering, describing it as "both a science and an art." The team found that many techniques listed in online guides made no difference for their use case, while small rephrasing changes had huge impact. This required comfortable iteration through trial and error.

### Custom Tooling for Prompt Development

To support prompt iteration, they built a command-line tool for running prompts against fixture files. Each fixture was a JSON file containing real-life incident data, tagged as particular test case types. Key scenarios they tested included:
- New incidents with limited data
- Long-running incidents with thousands of messages requiring extraction

The tooling allowed testing at specific timestamps within incident timelines, filtering out data that came after the test point. This enabled rapid iteration: make a small prompt change, run against a scenario, evaluate results, repeat. The article mentions alternatives like promptfoo and promptimize for teams not wanting to build custom tooling.

### Structured Output with JSON Mode

Rather than trying to coerce GPT to produce well-structured summaries through prompt engineering alone, they used OpenAI's JSON mode to enforce a specific response format. They defined four components of a good summary:
- Problem (required): High-level sentence explaining the incident cause
- Impact (optional): How the problem affected customers
- Causes (optional): What triggered the incident
- Steps to resolve (optional): Actions taken so far

This approach guaranteed summaries would contain key information in a digestible order without extensive prompt coercion. It represents a pragmatic LLMOps pattern: using structural constraints to ensure output quality rather than relying solely on prompt engineering.

### Project Sequencing Challenges

The team documented how AI projects require different planning than typical software projects. Key observations included:

- Prompt engineering requires additional time that's not easily parallelizable—best to have one person focused on it
- Daily goals won't always be met due to trial-and-error nature of the work
- Estimation is difficult; a ticket to "stop the model from suggesting its own next steps" was expected to take 30 minutes but took a full day
- Edge cases will emerge post-launch, requiring additional prompt engineering cycles

Their approach was to launch to 10% of customers first, work on something else for a week, then process feedback themes in batch. This phased rollout allowed real-world testing while managing blast radius.

## Data and Legal Considerations

The case study highlights important operational concerns beyond the technical implementation. Since they used OpenAI as a third-party processor, they needed to update their sub-processor list, which required notifying all account holders with a 30-day objection period.

Customer questions they had to address included:
- How data would be stored within OpenAI
- Whether data would be used for model training
- Which specific data would be sent
- Encryption practices
- Concrete benefits of the integration

Their answer to data concerns included that OpenAI does not store data for training, plus they negotiated a "super-strict zero-data retention agreement" preventing even log storage.

On the data access side, they had concerns about Slack message enrichment. They normally called the Slack API on-the-fly rather than storing customer data, but worried that enriching hundreds of messages would be too slow. The solution was using Slack's conversation history endpoint for bulk enrichment.

## Reusable AI Infrastructure

A significant LLMOps investment was building foundations for subsequent AI features. They created a dedicated directory structure for AI features with a standard interface that each prompt must implement. A single entry point (`RunPrompt`) handles:
- Checking if the customer has enabled OpenAI as a subprocessor
- Loading required incident data
- Determining if there's sufficient data for good AI results
- Building prompts and calling OpenAI
- Storing responses and metadata

This abstraction means new AI features only need to implement the interface and call `RunPrompt`, without handling "admin aspects" of using OpenAI. The design paid off when building their next feature (suggested follow-ups)—they could test the concept without implementing any front-end code, just by fulfilling the interface and running prompts via their CLI tool against real incidents.

## Critical Assessment

The case study presents genuinely useful lessons for teams building LLM-powered features. The emphasis on human-in-the-loop design, explicit feedback collection, and iterative prompt development represents mature LLMOps thinking. Their metrics-driven approach to evaluating whether to increase automation is particularly valuable.

However, some caveats apply. The 20% action rate on suggestions is relatively low, suggesting the feature may have limited impact for most users—though the fact that half of all summary updates now come from AI indicates value for active users. The team acknowledges they haven't solved prompt engineering challenges, just developed practices to make iteration more manageable.

The legal and data handling considerations are valuable additions often missing from AI feature case studies. Their zero-data retention agreement with OpenAI and proactive customer communication demonstrate enterprise-readiness thinking that smaller teams might overlook.

## Key Takeaways

The case study ultimately provides a realistic picture of building production LLM features: technically achievable with modern APIs but requiring significant investment in tooling, iteration processes, feedback mechanisms, and organizational communication. The author's self-aware observation that they left machine learning for "more predictable progress" only to find themselves back in similar territory captures the practical reality of LLM development—it shares many challenges with traditional ML despite being more accessible to software engineers.