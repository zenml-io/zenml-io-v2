---
title: "Multilingual Content Navigation and Localization System"
slug: "multilingual-content-navigation-and-localization-system"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3cd9d98fe19c351d52d4"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:38:26.819Z"
  createdOn: "2024-11-21T13:59:53.461Z"
llmopsTags:
  - "compliance"
  - "content-moderation"
  - "error-handling"
  - "fine-tuning"
  - "google-gcp"
  - "latency-optimization"
  - "load-balancing"
  - "microservices"
  - "model-optimization"
  - "monitoring"
  - "multi-modality"
  - "realtime-application"
  - "reliability"
  - "scalability"
  - "scaling"
  - "security"
  - "system-prompts"
  - "translation"
industryTags: "media-entertainment"
company: "Intercom"
summary: "YouTube, a Google company, implements a comprehensive multilingual navigation and localization system for its global platform. The source text appears to be in Dutch, demonstrating the platform's localization capabilities, though insufficient details are provided about the specific LLMOps implementation."
link: "https://www.youtube.com/watch?v=VTrJqRfJ5gk"
year: 2024
seo:
  title: "Intercom: Multilingual Content Navigation and Localization System - ZenML LLMOps Database"
  description: "YouTube, a Google company, implements a comprehensive multilingual navigation and localization system for its global platform. The source text appears to be in Dutch, demonstrating the platform's localization capabilities, though insufficient details are provided about the specific LLMOps implementation."
  canonical: "https://www.zenml.io/llmops-database/multilingual-content-navigation-and-localization-system"
  ogTitle: "Intercom: Multilingual Content Navigation and Localization System - ZenML LLMOps Database"
  ogDescription: "YouTube, a Google company, implements a comprehensive multilingual navigation and localization system for its global platform. The source text appears to be in Dutch, demonstrating the platform's localization capabilities, though insufficient details are provided about the specific LLMOps implementation."
---

## Overview

Intercom is a B2B SaaS company providing customer support solutions, serving primarily small and medium-sized businesses. Their product includes the familiar chat bubble seen on many websites and a productivity-focused inbox for support representatives. The speaker, who joined Intercom approximately six years ago to build their machine learning function, shares the company's journey from traditional ML approaches to productizing LLMs in production following the release of ChatGPT in late 2022.

This case study offers a candid look at how a mature SaaS company with existing ML infrastructure pivoted rapidly to incorporate large language models into their core product offerings, providing valuable insights into practical LLMOps considerations.

## The Pre-LLM Era: Resolution Bot

Before the LLM revolution, Intercom built Resolution Bot, a "last generation" chatbot that used traditional ML techniques. The system worked by recognizing user questions and matching them to pre-curated responses. When a user asked something like "I need help on my order," the bot would identify whether this matched a trained topic and serve a pre-configured answer. Users could accept the answer, request alternatives, or escalate to a human agent—the latter being the "failure state" they tried to minimize.

The backend setup process aimed to be accessible to non-technical users. It included features like showing previously asked similar questions and employed an active learning system to learn the boundaries of question clusters. For example, the system needed to distinguish between "resetting my password" and "resetting my colleague's password"—syntactically similar but semantically different queries requiring different handling.

Intercom also implemented unsupervised clustering approaches to help customers identify their most common question categories, essentially productizing clustering algorithms. They even experimented with early generative features for the inbox, trying to build effective typeahead and auto-complete using models like T5 and BERT, though they "just couldn't get it to work" for summarization use cases.

Despite providing substantial dollar value in revenue and helping customers who invested in setup, Resolution Bot had significant limitations. The curation process was friction-heavy, and while accuracy was acceptable for simple questions, it wasn't great overall. The system worked but required considerable manual effort to maintain and improve.

## The ChatGPT Inflection Point

The team had anticipated that advances in dialogue systems would "radically change customer service" when they saw Google's LaMDA paper, though they didn't know the timeline. ChatGPT's release in November 2022 was their signal that "it's time to go."

Their initial goals were threefold: build internal belief in the technology's transformative potential, get features live with customers quickly (since customers immediately began asking for "something like ChatGPT but for customer support"), and establish early mover advantage in what they saw as a fundamental shift in customer service.

## Rapid Feature Deployment

The team shipped three initial features remarkably quickly, all focused on the inbox (agent-facing) rather than customer-facing applications:

**Summarization**: Before a support representative hands off a case to a colleague, they typically write a summary. This feature automated that process. The speaker notes this was an "easy feature" that shipped in about a week—a stark contrast to their previous failed attempts using T5 and BERT, which "just couldn't get it to work."

**Tone Adjustment**: This allowed agents to make responses more or less friendly, adjusting the communication style for different contexts.

**Expand**: Agents could write shorthand notes and have the LLM expand them into fully-fleshed responses. The speaker notes this had mixed reception—"some people love this, some people are more lukewarm"—and they subsequently developed a second generation that incorporates vector search to pull in previous similar conversations as context.

The timeline was aggressive: they decided to build on December 5th, had prototypes by December 20th, gave customers access on January 13th, and launched publicly with customer testimonials on January 31st—based on just a couple weeks of actual usage.

## Categorizing Feature Difficulty

The speaker offers a useful framework for categorizing LLM feature difficulty based on two dimensions: out-of-the-box accuracy and cost of errors.

**Easy features** combine high out-of-the-box accuracy with low error costs. Summarization exemplifies this—GPT performs well, and occasional imperfections don't cause significant harm. The speaker argues this represents "a qualitatively big different change in ML": the ability to ship production features in weeks is genuinely new.

**Hard features** either have high error costs or low out-of-the-box accuracy. The Expand feature fell into this category because it requires the right context to work well across diverse businesses; without domain-specific information, it produces generic or inappropriate responses.

## Building Fin: The LLM-Powered Customer-Facing Bot

Initially, the team avoided customer-facing LLM applications due to hallucination concerns—they believed "large language models will hallucinate too much" to put directly in front of customers. However, they successfully built Fin, their new LLM-powered bot, starting around February 2023.

Key design goals for Fin included:
- Conversing naturally
- Answering questions about the specific business using only their information
- Reducing hallucinations to acceptable levels
- Requiring minimal configuration

The team gained early access to GPT-4 approximately a month or two before its public launch, finding it "a much more instructable model." Using retrieval-augmented generation (RAG), they achieved what they describe as effectively hallucination-free operation. When constrained to provided knowledge base content through appropriate prompting ("just using this information from a knowledge base answer, constrained to that information"), the model "works very reliably in production."

The speaker pushes back against hallucination concerns, suggesting that "if you've used them in the right way, they don't hallucinate very much." This is achieved by avoiding reliance on the model's parametric knowledge and instead providing relevant, controlled context.

A critical advantage over Resolution Bot is the elimination of curation friction. Users can "just throw all your contents of your knowledge base at the bot" without the extensive setup and maintenance required previously. The speaker claims accuracy rates are "about as high as we used to get with all that leg work and curation" that only some customers successfully completed.

## Architectural Insights

Fin employs an LLM agent architecture. The outer layer is an LLM agent that orchestrates the overall bot behavior, while individual components that answer specific question types use custom prompts. The speaker describes it as "a big collection of prompts and then an overall prompt that kind of figures out which one to use."

The system relies heavily on vector search for retrieval, recognizing that context windows, while growing, cannot accommodate entire knowledge bases. Even with larger context windows, putting too much information in may degrade response quality. Vector search enables selective retrieval of relevant content to feed into the LLM's context window.

## Development Philosophy and LLMOps Practices

The speaker articulates several key development principles that apply specifically to LLMOps:

**Breadth-first development**: Always build minimal versions of each component before going deep. Ship quickly and iterate rather than perfecting individual pieces.

**Time to first customer use as primary metric**: The speaker considers this "the biggest predictor of success of an ML product, even if it uses no machine learning at all." Getting a product live with customers enables real feedback and iterative improvement.

**Ship expensive, optimize later**: A notable pattern is their willingness to go to production with expensive, capacity-constrained models like GPT-4. They ship, validate the feature works, then replace with cheaper alternatives (including traditional classifiers) when warranted. This represents a fundamental shift in how they build ML products.

**Prompts before models**: For tasks where traditional NLP techniques could work, they now often "write a prompt that describes what we want and ship it," deferring more sophisticated solutions until proven necessary.

The ML team itself is designed for velocity: small, senior, product-focused, with embedded engineers. They maintain ownership of shipping capability without external gatekeeping—anyone blocking A/B testing or deployment would slow them down unacceptably.

## Conceptual Framework for LLMs

The speaker proposes a mental model for understanding LLMs in production contexts, arguing it's unhelpful to think of them as "token predictors." Instead, he suggests thinking of them as comprising two components: a database (from training data) and a reasoning engine.

For production applications, they actively avoid the database component—the parametric knowledge baked in during training—because it's uncontrollable, potentially outdated, and approximate. Instead, they leverage the reasoning engine capabilities while providing controlled, retrieved context.

He illustrates with a toy example: given a scenario about a mouse stealing cheese with a cat in the room, the model can reason that if told the cat is deaf, the warning about a bell becomes irrelevant. This kind of multi-step reasoning "works reliably" and is "meaningful" for their diverse customer base because they don't need to fine-tune per customer—the general reasoning ability applies across contexts.

## Results and Business Impact

While specific metrics aren't heavily detailed, several outcomes are noted:

- Summarization received "really great feedback" and has been running successfully
- Fin achieved general availability approximately two weeks before the talk
- Accuracy rates match or exceed the curated Resolution Bot approach
- Customer adoption was rapid once features became available
- The elimination of curation friction expanded the potential customer base, since many customers never completed the extensive setup Resolution Bot required

The speaker expresses strong conviction that AI "is going to completely change customer service and customer support," driven by the domain's structure: textual data, repetitive queries, debuggable processes, and workflows with inherent patterns.

## Broader Observations

The speaker reflects on the three stages of coming to terms with LLMs: initial amazement, disillusionment over hallucinations, and finally recognizing they're "pretty incredible when you apply them right." He cautions against both uncritical enthusiasm and dismissive skepticism based on theoretical limitations.

He predicts that historical focus on ChatGPT's knowledge limitations (old training data, approximate information) will be seen as a distraction, since the real value lies in reasoning capabilities applied to controlled, retrieved context—the RAG paradigm now becoming standard in production systems.