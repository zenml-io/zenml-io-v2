---
title: "Automated Synopsis Generation Pipeline with Human-in-the-Loop Quality Control"
slug: "automated-synopsis-generation-pipeline-with-human-in-the-loop-quality-control"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67fbc7ebce9c79468531977a"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:06:02.566Z"
  createdOn: "2025-04-13T14:19:23.673Z"
llmopsTags:
  - "content-moderation"
  - "structured-output"
  - "regulatory-compliance"
  - "prompt-engineering"
  - "fine-tuning"
  - "human-in-the-loop"
  - "error-handling"
  - "system-prompts"
  - "fastapi"
  - "open-source"
  - "api-gateway"
  - "openai"
  - "meta"
  - "hugging-face"
industryTags: "media-entertainment"
company: "Netflix"
summary: "Netflix developed an automated pipeline for generating show and movie synopses using LLMs, replacing a highly manual context-gathering process. The system uses Metaflow to orchestrate LLM-based content summarization and synopsis generation, with multiple human feedback loops and automated quality control checks. While maintaining human writers and editors in the process, the system has significantly improved efficiency and enabled the creation of more synopses per title while maintaining quality standards."
link: "https://www.youtube.com/watch?v=t90W1DgKPl4"
year: 2025
seo:
  title: "Netflix: Automated Synopsis Generation Pipeline with Human-in-the-Loop Quality Control - ZenML LLMOps Database"
  description: "Netflix developed an automated pipeline for generating show and movie synopses using LLMs, replacing a highly manual context-gathering process. The system uses Metaflow to orchestrate LLM-based content summarization and synopsis generation, with multiple human feedback loops and automated quality control checks. While maintaining human writers and editors in the process, the system has significantly improved efficiency and enabled the creation of more synopses per title while maintaining quality standards."
  canonical: "https://www.zenml.io/llmops-database/automated-synopsis-generation-pipeline-with-human-in-the-loop-quality-control"
  ogTitle: "Netflix: Automated Synopsis Generation Pipeline with Human-in-the-Loop Quality Control - ZenML LLMOps Database"
  ogDescription: "Netflix developed an automated pipeline for generating show and movie synopses using LLMs, replacing a highly manual context-gathering process. The system uses Metaflow to orchestrate LLM-based content summarization and synopsis generation, with multiple human feedback loops and automated quality control checks. While maintaining human writers and editors in the process, the system has significantly improved efficiency and enabled the creation of more synopses per title while maintaining quality standards."
---

## Overview

This case study comes from a Netflix engineering talk describing how the company has implemented LLMs into their content synopsis generation workflow. Synopses are the short descriptions viewers see when browsing content, helping them make informed decisions about what to watch. At Netflix's scale, creating multiple synopses for every title across their catalog requires significant creative resources, and the team sought to enhance this process through automation while keeping human creativity at the center.

The speaker emphasizes a key philosophical point that shapes their entire approach: Netflix is explicitly not in the business of replacing creative workers. The goal is to augment writers' capabilities by handling the time-consuming context gathering and initial drafting, allowing them to focus on what they do best—editing and ensuring quality.

## The Original Manual Process

Before LLM integration, the synopsis fulfillment flow was highly manual and unpredictable. Content would arrive from production in various forms—viewables, audio, closed caption scripts, and sometimes full scripts—in different formats and languages. A post-production team would gather these sources and create formatted briefs for the company. Writers would then need to read through all materials (sometimes watching entire shows for sensitive content) to gather enough context to write synopses.

The challenges with this approach included:
- Inconsistent timing of source material arrival
- Variable formats requiring constant adaptation
- Difficulty planning writer capacity
- High time investment per synopsis
- Need for multiple synopses per title (different angles, character focuses, etc.)

## The LLM-Powered Solution Architecture

The team built their solution on top of Metaflow, an open-source workflow orchestration framework. The speaker expresses enthusiasm for Metaflow's out-of-the-box capabilities, noting that much of the infrastructure complexity was already solved by the framework.

### Generation Flow

The generation pipeline follows a modular architecture designed for flexibility. The key components include:

**Asset Store and Prompt Library**: These are curated in collaboration with writers, containing the building blocks for generation. This collaborative curation is important—the team explicitly notes that some of them "are not even English native speakers," making writer input essential for quality prompts.

**Context Summarization**: The first step processes the raw source materials (closed caption scripts, viewables, audio descriptions, sometimes full scripts) into summaries. This addresses the context window limitations of LLMs while extracting the most relevant information.

**Synopsis Generation**: Using the summarized context, the system generates draft synopses using a dedicated prompt library. The prompts include:
- Instructions and guidelines (human-written)
- Examples sourced from member feedback data showing what good synopses look like
- The generated summary of the content

The team currently uses OpenAI models but is actively testing open-source alternatives including Llama. They've designed the system to be modular specifically because they recognize foundational models are updated every few months—they can swap out models without rebuilding the entire pipeline.

### Evaluation Flow: LLM-as-a-Judge

A critical component of the system is the evaluation pipeline that acts as a quality control filter before exposing drafts to writers. The speaker emphasizes this was essential for building trust: "if we just were to show them what we can generate just by prompting ChatGPT they probably run away."

The evaluation uses what the speaker calls "LLM as a judge" or "Constitutional AI"—giving models a set of guidelines (a "constitution") and having them score outputs against criteria. Five specialized models evaluate each synopsis:

- **Precision**: Checks for actual plot content in the synopsis—without plot information, it's not really telling viewers what the title is about
- **Accuracy**: Catches hallucinations (the speaker mentions "very funny examples from the beginning" when they weren't scoring for this)
- **Tone**: Ensures alignment with Netflix voice and appropriateness for the content type (avoiding children's show tone for horror films, for example)
- **Clarity**: Evaluates readability and precision of language
- **Writing Style**: Checks grammar, AP style rules, comma usage, spacing, etc.

Synopses must pass all five criteria to be exposed via the API. Failed synopses go back, and the system catches bad batches that might result from poor-quality source material before they waste writers' time.

### Spoiler Prevention

An interesting operational challenge addressed in the Q&A: preventing spoilers in generated synopses. The solution is multi-layered:
- For series, they truncate input to only the first one or two episodes
- The LLM-as-a-judge can catch certain spoilers (though the speaker acknowledges it's "not perfect yet")
- Human writers provide the final catch—they would "catch it like in a second" if a spoilery synopsis made it through

## Human Feedback Loops

One of the most exciting aspects of the system, according to the speaker, is the instrumentation of multiple human feedback loops—described as "a treasure to have if you're in the business of training models." The system captures four human feedback signals and one model-based signal:

- **Synopsis Scoring**: Initial quality assessment from the evaluation models
- **Writer Adoption Metrics**: When writers receive drafts, every edit they make is tracked, providing valuable training data
- **Editor QC Feedback**: The quality control process from editors
- **Editor Pushback**: When editors reject strings that passed initial QC
- **Member Data**: Viewer behavior signals—if someone reads a synopsis, watches a movie, and stays until the end, that's a positive signal; if they abandon after 15 minutes, the synopsis may have misrepresented the content

## Model Training and Fine-Tuning Strategy

The team is building toward fine-tuned models using the feedback data collected through the system. OpenAI allows limited fine-tuning, but open-source models provide more flexibility. The speaker notes they don't yet have enough data to fully justify a fine-tuned model but expects to reach that point "in the short term." They're still evaluating which of the four feedback sources will prove most useful for training.

## A/B Testing and Model Comparison

For testing new models, the team runs parallel generation—putting two models side by side generating for the same title, then measuring which outputs writers prefer. This allows them to evaluate whether switching from OpenAI to Llama or other models makes sense for their use case.

## Writer-Facing Integration

The system exposes an API that the writer platform queries. When writers need synopses for an upcoming title (the example given is shows launching in about three months), they can pull available drafts, pre-populate their editing interface, and modify as needed. The system tracks:
- Whether drafts are adopted
- How many changes are made
- Whether drafts are rejected entirely ("this is actually terrible not even worth editing")

All of this feeds back into the quality improvement cycle.

## Results and Business Impact

While the speaker couldn't share exact numbers, they confirmed:
- Time savings are "pretty substantial"—enough to justify production deployment
- The team has actually hired more writers, not fewer
- Writers can now produce more synopses because they're not starting from scratch
- The economic model works: with a fixed budget, they can scale synopsis creation by eliminating the from-scratch drafting process

The speaker is careful to frame this as scaling capability rather than headcount reduction: "we kept the room, we kept every single writer, we actually hired more."

## Architectural Philosophy

A key theme throughout the talk is modularity and flexibility. The team explicitly designed for model obsolescence—recognizing that building tightly coupled to any single provider (like OpenAI) would be problematic given the rapid pace of foundational model development. Metaflow's workflow abstraction enables them to swap components "as much as we want."

The human-in-the-loop requirement is presented as both a quality necessity and a philosophical commitment. Even looking to the future, the speaker maintains that "for the foreseeable future we will not be removing any humans in the loop" because humans remain "a little better at writing and creative things."

## Technical Considerations and Lessons

Several practical LLMOps insights emerge from this case study:

The importance of quality gates before human exposure cannot be overstated—bad outputs would erode trust and actually increase time spent rather than saving it. The five-criteria evaluation system with hard pass/fail requirements ensures only viable drafts consume writer attention.

Prompt engineering is treated as a collaborative discipline requiring domain expertise. Writers helped craft the prompt libraries because they understand what makes good synopses.

The feedback loop architecture isn't just about model improvement—it's about building organizational trust and demonstrating value through measurable adoption metrics.