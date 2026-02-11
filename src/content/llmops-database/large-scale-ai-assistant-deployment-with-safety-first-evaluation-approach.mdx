---
title: "Large-Scale AI Assistant Deployment with Safety-First Evaluation Approach"
slug: "large-scale-ai-assistant-deployment-with-safety-first-evaluation-approach"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "677b9f3ab3227ba460afadf9"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:53:50.599Z"
  createdOn: "2025-01-06T09:15:38.709Z"
llmopsTags:
  - "chatbot"
  - "content-moderation"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "prompt-engineering"
  - "rag"
  - "error-handling"
  - "human-in-the-loop"
  - "system-prompts"
  - "fallback-strategies"
  - "monitoring"
  - "cicd"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "openai"
  - "anthropic"
  - "microsoft-azure"
  - "google-gcp"
industryTags: "tech"
company: "Discord"
summary: "Discord implemented Clyde AI, a chatbot assistant that was deployed to over 200 million users, focusing heavily on safety, security, and evaluation practices. The team developed a comprehensive evaluation framework using simple, deterministic tests and metrics, implemented through their open-source tool PromptFu. They faced unique challenges in preventing harmful content and jailbreaks, leading to innovative solutions in red teaming and risk assessment, while maintaining a balance between casual user interaction and safety constraints."
link: "https://www.youtube.com/watch?v=OrtBEBLMXdM"
year: 2023
seo:
  title: "Discord: Large-Scale AI Assistant Deployment with Safety-First Evaluation Approach - ZenML LLMOps Database"
  description: "Discord implemented Clyde AI, a chatbot assistant that was deployed to over 200 million users, focusing heavily on safety, security, and evaluation practices. The team developed a comprehensive evaluation framework using simple, deterministic tests and metrics, implemented through their open-source tool PromptFu. They faced unique challenges in preventing harmful content and jailbreaks, leading to innovative solutions in red teaming and risk assessment, while maintaining a balance between casual user interaction and safety constraints."
  canonical: "https://www.zenml.io/llmops-database/large-scale-ai-assistant-deployment-with-safety-first-evaluation-approach"
  ogTitle: "Discord: Large-Scale AI Assistant Deployment with Safety-First Evaluation Approach - ZenML LLMOps Database"
  ogDescription: "Discord implemented Clyde AI, a chatbot assistant that was deployed to over 200 million users, focusing heavily on safety, security, and evaluation practices. The team developed a comprehensive evaluation framework using simple, deterministic tests and metrics, implemented through their open-source tool PromptFu. They faced unique challenges in preventing harmful content and jailbreaks, leading to innovative solutions in red teaming and risk assessment, while maintaining a balance between casual user interaction and safety constraints."
---

## Overview

This case study comes from a talk by a Discord engineer who led LLM product teams and shipped several products at Discord scale, including Clyde AI—an agent with RAG capabilities deployed to over 200 million users. The speaker is also a maintainer of promptfoo, an open-source library for evaluations and red teaming. The presentation offers candid insights into what worked (and what didn't) when deploying LLMs at massive scale for a consumer platform with a particularly challenging user base.

The central thesis of the talk is that the hardest part of deploying LLMs at scale wasn't the models, fine-tuning, or product development—it was ensuring the chatbot didn't teach users how to create harmful content. At Discord's scale, any failure mode with even a one-in-a-million probability will manifest hundreds of times, making safety and risk mitigation absolutely critical.

## The Core Challenge: Safety at Scale

The speaker emphasizes that the biggest repeat launch blockers were security, legal, safety, and policy concerns—not technical model performance. Working with these stakeholders to quantify and mitigate risk became a primary focus. Without systematic approaches to measuring these risks, vulnerabilities would be discovered in production, which at Discord's scale meant significant real-world harm and media attention.

A notable example was the "grandma jailbreak" which originated on Discord, where users would prompt the AI to roleplay as a deceased grandmother who would share dangerous information as a bedtime story. This became a widely-publicized incident that illustrated the creative adversarial behavior the team had to defend against.

## Evaluation Philosophy: Evals as Unit Tests

The most important operational insight from the talk was treating evaluations as traditional unit tests rather than complex ML evaluation systems. This philosophy had several practical implications:

**Simplicity over sophistication**: Rather than implementing complex LLM-graded evaluations or training classifiers to measure personality traits, the team used simple deterministic checks. For example, to measure whether the chatbot maintained a casual personality, they simply checked if responses began with lowercase letters. This provided 80% of the value for 1% of the effort.

**Local and fast execution**: Evaluations should run locally without cloud dependencies. The speaker suggested that if you're on an airplane with a local model, you should still be able to run your evals. This enabled developers to run dozens of evaluations per day as a quick reflex.

**Component-level testing**: Rather than building large end-to-end evaluations, the team broke down their system architecture and created targeted evals for specific components. For a web search feature, this meant separate test suites for triggering logic (when to use the tool) and summarization ability (tested against static context rather than live data).

**Deterministic metrics**: The speaker advocated for basic deterministic metrics despite acknowledging this goes against current industry trends toward LLM-as-judge approaches. The reasoning was that simple metrics that everyone understands scale better across teams.

## Evaluation Culture and Workflow

Building an evaluation culture was emphasized as critical to success. The practical implementation included:

Every pull request was expected to include an evaluation, at minimum as a link pasted in the PR. For teams with more maturity, evaluations were integrated into CI/CD pipelines. This made evaluation a routine part of development rather than an afterthought.

The team built and open-sourced promptfoo, a CLI tool for running evaluations locally with declarative configuration files. The tool was designed to be developer-first, avoiding over-engineered solutions or cloud-based evaluation platforms.

## Prompt Engineering Learnings

Several practical insights emerged around prompt management:

**Less is more**: The team initially tried to prompt out all failure modes discovered through evaluations, but eventually hit diminishing and then negative returns. Removing content from prompts and giving the LLM room to do "the right thing" proved more effective than piling on special cases.

**Prompts as vendor lock-in**: The speaker noted that prompts are a form of vendor lock-in. Simply taking a GPT-optimized prompt and testing it with Claude or Llama won't work well. Each model family requires prompt optimization.

**Model drift mitigation**: An interesting creative solution addressed the problem of lower-powered models (like LLaMA and GPT-3.5) drifting from their system prompt during long conversations. The team would randomly inject GPT-4 responses to act as "bowling alley bumpers" to get the model back on track. The speaker acknowledged uncertainty about whether this was genuinely clever or just a hack that happened to work.

## Observability Approach

For observability, Discord used Datadog rather than specialized LLM observability platforms. The speaker's philosophy was that "the best observability tool is the one you're already using." The team found it straightforward to extract relevant metrics and feed them into their existing monitoring infrastructure alongside other product metrics.

Some online production evaluations were implemented, including model-graded evaluations, but these were built in-house as simple one-shot implementations rather than using specialized tools.

## The Feedback Loop Challenge

The speaker candidly admitted that the ideal feedback loop—incorporating live production data back into evaluation datasets—was never achieved due to privacy constraints. This is notable because it's often presented as a best practice in LLMOps discussions. Instead, the team gathered data from internal dogfooding, public social media posts about failures and successes, and whatever public examples they could find. This honest acknowledgment of limitations provides a realistic counterpoint to idealized LLMOps workflows.

## Configuration and Prompt Management

The team used Git as the source of truth for prompt versioning and Retool for configuration management, allowing non-technical team members to toggle settings. The speaker acknowledged better solutions likely exist but emphasized that simple, working solutions were preferred over elaborate tooling.

## Red Teaming and Safety Assessment

Red teaming was particularly important given Discord's user base. The team developed systematic approaches to pre-deployment risk assessment:

**Risk categorization**: The promptfoo tool includes risk assessment views breaking down potential harms by category—brand risk, legal risk, and various harmful content categories.

**Automated adversarial testing**: Basic harmful input testing verified that models refused obviously problematic requests. But more sophisticated testing was needed for application-specific jailbreaks introduced by custom prompts layered on base models.

**LLM-based red teaming**: The team implemented a feed-forward loop where an attacker LLM sends adversarial inputs while a judge LLM guides rewording, euphemisms, and synonyms to bypass safeguards. This approach was more effective at exposing cracks in safeguards than basic harmful input testing.

**Comprehensive failure mode coverage**: Beyond direct harmful content, the team tested for PII leaks, hallucinations, prompt hijacking (users asking the bot to do unrelated tasks like homework), and inappropriate political opinions.

The speaker emphasized that pre-deployment risk assessment was more important than live filtering, though both matter. This is notable given that more commercial solutions seem focused on the filtering side.

## Trade-offs and Practical Considerations

Several practical trade-offs were discussed:

**Cost vs. accuracy**: At scale, the cost of running more capable models became a significant concern, requiring careful consideration of when to use cheaper vs. more expensive models.

**Specificity vs. flexibility in prompts**: Over-specified prompts eventually showed negative returns, suggesting that giving models appropriate freedom produces better results than exhaustive instruction.

## Key Takeaways

The case study provides a refreshingly practical perspective on LLMOps at scale. The emphasis on simplicity, deterministic metrics, local execution, and treating evaluations as routine development hygiene rather than elaborate ML processes stands in contrast to much industry discussion of sophisticated evaluation frameworks. The candid acknowledgment of what didn't work—like closing the feedback loop with production data—adds credibility to the recommendations.

The safety and red teaming focus is particularly valuable given the consumer context and adversarial user behavior. The open-sourcing of promptfoo as a result of this work provides a concrete, usable artifact for teams facing similar challenges.