---
title: "Challenges in Designing Human-in-the-Loop Systems for LLMs in Production"
slug: "challenges-in-designing-human-in-the-loop-systems-for-llms-in-production"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3fd6d87d2c0220a49157"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:37:41.444Z"
  createdOn: "2024-11-21T14:12:38.876Z"
llmopsTags:
  - "fine-tuning"
  - "guardrails"
  - "high-stakes-application"
  - "human-in-the-loop"
  - "monitoring"
  - "multi-agent-systems"
  - "multi-modality"
  - "openai"
  - "reliability"
  - "scalability"
industryTags: "tech"
company: "V7"
summary: "V7, a training data platform company, discusses the challenges and limitations of implementing human-in-the-loop experiences with LLMs in production environments. The presentation explores how despite the impressive capabilities of LLMs, their implementation in production often remains simplistic, with many companies still relying on basic feedback mechanisms like thumbs up/down. The talk covers issues around automation, human teaching limitations, and the gap between LLM capabilities and actual industry requirements."
link: "https://www.youtube.com/watch?v=9JlbIv-BZOU"
year: 2023
seo:
  title: "V7: Challenges in Designing Human-in-the-Loop Systems for LLMs in Production - ZenML LLMOps Database"
  description: "V7, a training data platform company, discusses the challenges and limitations of implementing human-in-the-loop experiences with LLMs in production environments. The presentation explores how despite the impressive capabilities of LLMs, their implementation in production often remains simplistic, with many companies still relying on basic feedback mechanisms like thumbs up/down. The talk covers issues around automation, human teaching limitations, and the gap between LLM capabilities and actual industry requirements."
  canonical: "https://www.zenml.io/llmops-database/challenges-in-designing-human-in-the-loop-systems-for-llms-in-production"
  ogTitle: "V7: Challenges in Designing Human-in-the-Loop Systems for LLMs in Production - ZenML LLMOps Database"
  ogDescription: "V7, a training data platform company, discusses the challenges and limitations of implementing human-in-the-loop experiences with LLMs in production environments. The presentation explores how despite the impressive capabilities of LLMs, their implementation in production often remains simplistic, with many companies still relying on basic feedback mechanisms like thumbs up/down. The talk covers issues around automation, human teaching limitations, and the gap between LLM capabilities and actual industry requirements."
---

## Overview

This case study comes from a talk by Alberto, founder of V7, a training data platform company, presented at an MLOps conference. V7 handles ground truth data for hundreds of AI companies, giving them a unique vantage point on what constitutes good training data and how the landscape is evolving with LLMs. The talk focuses on the challenges and realities of implementing human-in-the-loop experiences for LLMs in production, offering a candid and somewhat sobering assessment of where the industry currently stands.

## Company Background and Perspective

V7 operates as a training data platform, which means they are deeply involved in the process of creating, managing, and quality-controlling the ground truth data that feeds into neural networks. Alberto notes that they handle petabytes of well-labeled training data, which gives them research capabilities and insights into what makes data valuable for AI systems. This perspective is important because it shapes their view on the gap between LLM capabilities and practical deployment.

The company has observed a significant shift in the industry paradigm: moving from a world where smaller amounts of very well-labeled data were the norm, to a world dominated by enormous amounts of poorly labeled data. This transition has profound implications for human-in-the-loop processes and LLMOps more broadly.

## Current State of LLMs in Production

One of the most striking observations from this talk is the honest assessment that progress in human-in-the-loop interaction with LLMs has been slower than anticipated. Despite the rapid advancement of LLM capabilities, the actual production implementations remain relatively simplistic. Alberto specifically calls out the ubiquitous thumbs up/thumbs down feedback mechanism as an example of "huge untapped potential" that the industry is failing to capitalize on. He predicts that looking back, this era will seem cringeworthy in terms of how primitively we're treating systems that handle important information.

Within V7's own product, LLM usage tends to fall into what Alberto describes as a "glorified zero-shot model" pattern. In the context of computer vision applications, LLMs are generally used to manipulate other models rather than directly process visual data, since multimodal models remain unreliable for production use. He characterizes current LLM usage as essentially a "glorified command-K" - a search or command interface rather than a true intelligent co-pilot.

## The Co-Pilot Paradigm: Expectations vs. Reality

A significant portion of the talk addresses the gap between how we conceptualize LLMs (as co-pilots continuously supporting user actions and maintaining awareness of task context) versus how they're actually used. Using the analogy of an actual flight co-pilot who assists with the complete task of taking off and landing, Alberto points out that in most machine learning software, the atomic unit of a task is much shorter. Users interact with LLMs more like retrievers - sending a query, getting a response, and starting a completely new task.

This disconnect has implications for how we should design production systems. The expectation of a seamless, context-aware assistant doesn't match the reality of discrete, stateless interactions that characterize most current implementations.

## V7's Auto Label Feature

The talk provides a concrete example of V7's approach to multimodal human-in-the-loop systems through their "Auto Label" feature. This is described as a large model that takes a small prompt (such as "segment these airplanes") and automatically identifies and segments all similar objects in an image. It represents a true multimodal co-pilot that understands both language instructions and visual content - for instance, understanding that a user wants to label only Qantas airplanes for a specific class.

However, Alberto is candid about the limitations they've encountered. The fundamental challenge is that if a model can fully automate the work of an expert labeler, then that labeling task probably shouldn't have required a human in the first place. Conversely, when you have true domain experts (engineers, radiologists, etc.) contributing out-of-distribution knowledge, it becomes extremely difficult to automate their contributions because they are, by design, introducing novel information that wasn't in the training set.

## Key Challenges Identified for Production LLMOps

### Automation is Overrated

Alberto challenges the industry assumption that automation is always the goal. He notes that it takes considerable time for end-to-end automation systems or even QA-assistance co-pilots to find their way into production. With LLMs specifically, the challenge is exacerbated because these models are "very impressive" and can "convince us that they're very intelligent by their means of speech" while not actually performing better than smaller, fine-tuned models on specific tasks. This is a critical observation for LLMOps practitioners who may be tempted to deploy general-purpose LLMs when bespoke solutions would be more reliable.

### No Room for Error in Many Industrial Applications

For computer vision applications in particular, many use cases have no undo capability. Robotic picking of an apple or cutting of a tree cannot be reversed if the model makes a mistake. This zero-tolerance environment is fundamentally at odds with the probabilistic, sometimes-wrong nature of LLM outputs. Most industry use cases have been designed with strictly defined, discrete outcomes (buy/sell, accelerate/don't accelerate), and the elaborate reasoning capabilities of LLMs with their 55,000-token vocabularies become essentially wasted when the actual problems are quite simple.

### Co-pilots vs. Existing SaaS Solutions

Many industries already have purpose-built software (like Bloomberg terminals for trading) that has been optimized for specific workflows with exactly the right buttons to complete tasks. In many cases, these don't need an LLM-like interface at all - they just need to complete actions, which can often be done with classical machine learning or standard deep learning models fine-tuned on domain-specific data. This raises questions about where LLMs genuinely add value versus where they're being shoehorned into existing workflows.

### People Are Terrible Teachers

When users are given the ability to retrain or provide feedback to models, they typically provide incorrect information or frame it in ways that don't align with how models are typically trained. This is a significant barrier to implementing effective RLHF-style continuous learning in production systems.

### Information Asymmetry

Often the issue with LLM responses isn't that they're wrong, but that they provide the wrong information to the wrong person at the wrong time. This contextual appropriateness problem remains largely unsolved in production systems.

## Industry Examples and Comparisons

Alberto briefly surveys how other companies are approaching these challenges. Adept has created systems that navigate websites and perform clicks on behalf of users, but this represents only one paradigm for human-AI interaction. OpenAI's interface is described as "pretty simplistic" but functional, though not optimal for tasks like retrieving house prices. Sana is highlighted as having one of the better implementations for visual feedback with LLM responses, and Glean is noted for their enterprise search approach.

## Assessment and Implications

This talk provides valuable perspective on the current state of LLMOps from a company at the intersection of data quality and AI deployment. The key takeaways for practitioners include:

The honest acknowledgment that the industry is in a "transitionary period" where LLMs are still finding their appropriate production use cases is refreshing. Rather than overselling capabilities, the talk presents a grounded view of where current technology excels and where it falls short.

The emphasis on simple feedback mechanisms (thumbs up/down) representing a missed opportunity suggests that more sophisticated human-in-the-loop designs could significantly improve LLM performance in production, but the industry hasn't yet invested in developing these interfaces.

The observation that specialized, fine-tuned models often outperform general LLMs on specific tasks while being more reliable is an important consideration for production deployments. It suggests that LLMOps strategies should carefully evaluate when general-purpose LLMs are truly necessary versus when traditional ML approaches would be more appropriate.

Finally, the talk underscores that the challenges of deploying LLMs in production are not purely technical - they involve fundamental questions about human-computer interaction, user experience design, and understanding the nature of expert knowledge that resists automation.