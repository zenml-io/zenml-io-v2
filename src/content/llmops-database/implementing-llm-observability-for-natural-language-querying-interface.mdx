---
title: "Implementing LLM Observability for Natural Language Querying Interface"
slug: "implementing-llm-observability-for-natural-language-querying-interface"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3de6bd64d6869633e23f"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:42:46.202Z"
  createdOn: "2024-11-21T14:04:22.885Z"
llmopsTags:
  - "fine-tuning"
  - "monitoring"
  - "open-source"
  - "openai"
  - "prompt-engineering"
  - "question-answering"
  - "rag"
  - "reliability"
  - "scalability"
industryTags: "tech"
company: "Honeycomb"
summary: "Honeycomb implemented a natural language querying interface for their observability product and faced challenges in maintaining and improving it post-launch. They solved this by implementing comprehensive observability practices, capturing everything from user inputs to LLM responses using distributed tracing. This approach enabled them to monitor the entire user experience, isolate issues, and establish a continuous improvement flywheel, resulting in higher product retention and conversion rates."
link: "https://www.youtube.com/watch?v=VxmVr-ceIks"
year: 2023
seo:
  title: "Honeycomb: Implementing LLM Observability for Natural Language Querying Interface - ZenML LLMOps Database"
  description: "Honeycomb implemented a natural language querying interface for their observability product and faced challenges in maintaining and improving it post-launch. They solved this by implementing comprehensive observability practices, capturing everything from user inputs to LLM responses using distributed tracing. This approach enabled them to monitor the entire user experience, isolate issues, and establish a continuous improvement flywheel, resulting in higher product retention and conversion rates."
  canonical: "https://www.zenml.io/llmops-database/implementing-llm-observability-for-natural-language-querying-interface"
  ogTitle: "Honeycomb: Implementing LLM Observability for Natural Language Querying Interface - ZenML LLMOps Database"
  ogDescription: "Honeycomb implemented a natural language querying interface for their observability product and faced challenges in maintaining and improving it post-launch. They solved this by implementing comprehensive observability practices, capturing everything from user inputs to LLM responses using distributed tracing. This approach enabled them to monitor the entire user experience, isolate issues, and establish a continuous improvement flywheel, resulting in higher product retention and conversion rates."
---

## Overview

Honeycomb, an observability company, developed a natural language querying interface for their product that allows users to query their observability data using natural language rather than learning the company's query interface. This case study, presented by Phillip Carter (a Honeycomb engineer and OpenTelemetry maintainer), provides an honest and detailed look at the challenges of making LLM-powered features production-ready beyond an initial beta release.

The core insight from this case study is that while it's relatively easy to ship an LLM-powered feature quickly (the speaker suggests a product engineering team with a month and OpenAI API keys can produce something useful), the real challenge lies in iterating and improving the feature over time without introducing regressions. The speaker emphasizes that "pretty good is not production ready" and that after the initial marketing splash, users will expect much more from the product.

## The Challenge of LLM Reliability in Production

The presentation highlights several fundamental challenges with making LLMs reliable in production settings:

Traditional software engineering tools fall short when working with LLMs. Unit tests, IDE debugging, and regression tests are described as "exceptionally difficult with LLMs if not impossible depending on what you're doing." This is a significant departure from standard software development practices and requires new approaches.

Prompt engineering introduces fragility. The speaker notes that "very very subtle changes in your prompt can massively influence the way that the LLM is going to behave." This makes it easy to introduce regressions, sometimes for behaviors that the team didn't even realize were working in the first place. This unpredictability is a core challenge of LLMOps.

RAG pipelines add complexity. As the system pulls in additional context and data for each request, each component becomes another variable that can affect LLM behavior. The Honeycomb system has approximately 40 steps in their RAG pipeline, and tweaking any one of these can dramatically change outputs.

## The Solution: Comprehensive Observability

Honeycomb's approach was to apply observability practices more extensively than they had for any other product feature. The key was capturing literally everything about each request:

**What They Capture:**
- User IDs and team IDs for context
- Full text sent to every single request to OpenAI
- Every decision made in their RAG pipeline (approximately 40 steps)
- Full response from the LLM
- Parsed data structures from responses
- Validation results at each step
- Every possible failure mode
- User feedback at the end of the interaction

This comprehensive data capture allows the team to isolate specific problems cleanly. The speaker shows how they can filter to view every instance where they failed to produce a query for a user, grouped by user input and LLM response. This makes it immediately clear what inputs are causing problems and what the LLM is (or isn't) producing.

## Distributed Tracing for LLM Systems

A key architectural decision was treating the LLM system as a distributed system, which it fundamentally is—involving Honeycomb's application, OpenAI's API, and their querying engine as separate components. They use distributed tracing to capture the full user experience.

The traces are connected to their entire application, not just the LLM call in isolation. Each trace dealing with the LLM portion is approximately 48 spans in length, with the RAG pipeline making up the majority. One collapsed section alone contains over 20 spans, representing the decisions made before any request to OpenAI is sent.

This level of detail allows the team to:
- Get a full picture view of what happened when something fails
- Understand exactly what occurred throughout the entire process
- Feed this information into prompt engineering or fine-tuning efforts
- Know precisely what to look for when validating that fixes are working

## Monitoring the End User Experience

The monitoring approach focuses on the full end-to-end user experience rather than just technical metrics like latency and errors. Every one of the 48 spans counts as a bucket of events that they monitor. When failures occur, they can examine all dimensions of the data to isolate specific error patterns.

For example, if they see an error like "ML response does not contain valid JSON," they can group by that field, query for specific instances of that problem, and dig into individual requests to understand root causes.

## The Improvement Flywheel

Perhaps the most valuable insight from this case study is the establishment of a continuous improvement flywheel:

The team identifies problems through observability data, makes a fix in their prompt engineering, deploys that fix, and then examines the past 24 hours of data to determine whether their rate of success or failure improved. They deploy daily and continuously look at what happened over the previous day. Over time, this iterative process is how they made their LLMs reliable.

This approach treats LLM improvement as an empirical, data-driven process rather than relying on intuition or limited testing.

## Results and Business Impact

The feature launch was around May 3rd of the relevant year, and the initial release solved approximately 80% of use cases—described as "pretty awesome" for a first release. However, the remaining 20% represented a long tail of important edge cases that paying customers cared about.

After implementing their observability-driven improvement process, they achieved:
- Higher product retention overall, especially for new teams unfamiliar with the interface
- Higher conversion rates to paid tiers
- Strong positive reception from the sales team, who found that the natural language interface eliminated the need to teach prospects how to use the UI during the sales process

The sales team could simply direct prospects to type what they want in a text box and hit "get query," significantly streamlining the onboarding experience.

## Practical Guidance and Future Outlook

The speaker emphasizes that this approach is accessible today using existing tools:
- OpenTelemetry, which supports 11 languages
- Any of the dozen or so observability tools available (not necessarily Honeycomb)
- Custom instrumentation following distributed tracing principles

The data collected serves multiple purposes: it's the source for prompt engineering improvements, fine-tuning decisions, and any evaluations being performed.

Looking forward, the speaker (who is an OpenTelemetry project maintainer) notes that the community is developing semantic conventions for AI and vector database instrumentation, automatic instrumentation libraries, and best practices for manual instrumentation. Within approximately six months from the presentation, getting started with this level of observability should become significantly easier.

## Key Takeaways for LLMOps Practitioners

This case study offers several important lessons for teams building with LLMs in production:

The initial launch is the easy part. The hard work begins after users have expectations and you need to iterate without breaking things that already work. Teams should plan for this phase from the beginning.

Traditional software testing approaches have limited applicability to LLM systems. New approaches centered on observability and real-world behavior analysis are necessary.

Treat LLM systems as distributed systems from the start. Use distributed tracing to capture the full context of each request across all components.

Capture everything, not just the obvious metrics. User inputs, full prompts, every RAG pipeline decision, LLM responses, parsing results, validation outcomes, and user feedback all provide valuable signal for improvement.

Establish a daily improvement cycle. Deploy changes, observe results over 24 hours, and use that data to guide the next iteration. This empirical approach is more effective than trying to anticipate all edge cases in advance.

The case study is notable for its honesty about the challenges involved—the speaker acknowledges that their blog posts about "the hard stuff nobody's talking about" struck a nerve with the LLM development community, suggesting that many teams struggle with similar issues but don't publicly discuss them.