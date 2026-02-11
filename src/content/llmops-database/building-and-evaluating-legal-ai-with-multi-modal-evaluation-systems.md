---
title: "Building and Evaluating Legal AI with Multi-Modal Evaluation Systems"
slug: "building-and-evaluating-legal-ai-with-multi-modal-evaluation-systems"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68342baa4b65b9048024dcf3"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-01T11:07:45.646Z"
  lastUpdated: "2025-11-26T11:44:43.751Z"
  createdOn: "2025-05-26T08:51:54.869Z"
llmopsTags:
  - "document-processing"
  - "question-answering"
  - "classification"
  - "summarization"
  - "structured-output"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "rag"
  - "prompt-engineering"
  - "few-shot"
  - "human-in-the-loop"
  - "multi-agent-systems"
  - "agent-based"
  - "chunking"
  - "system-prompts"
  - "langchain"
  - "monitoring"
  - "documentation"
  - "openai"
industryTags: "legal"
company: "Unify"
summary: "Harvey, a legal AI company, has developed a comprehensive approach to building and evaluating AI systems for legal professionals, addressing the unique challenges of document complexity, nuanced outputs, and high-stakes accuracy requirements. Their solution combines human-in-the-loop evaluation with automated model-based assessments, custom benchmarks like BigLawBench, and a \"lawyer-in-the-loop\" product development philosophy that embeds legal domain experts throughout the engineering process. The company has achieved significant scale with nearly 400 customers globally, including one-third of the largest 100 US law firms, demonstrating measurable improvements in evaluation quality and product iteration speed through their systematic LLMOps approach."
link: "https://www.youtube.com/watch?v=kuXtW03cZEA"
year: 2025
seo:
  title: "Unify: Building and Evaluating Legal AI with Multi-Modal Evaluation Systems - ZenML LLMOps Database"
  description: "Harvey, a legal AI company, has developed a comprehensive approach to building and evaluating AI systems for legal professionals, addressing the unique challenges of document complexity, nuanced outputs, and high-stakes accuracy requirements. Their solution combines human-in-the-loop evaluation with automated model-based assessments, custom benchmarks like BigLawBench, and a \"lawyer-in-the-loop\" product development philosophy that embeds legal domain experts throughout the engineering process. The company has achieved significant scale with nearly 400 customers globally, including one-third of the largest 100 US law firms, demonstrating measurable improvements in evaluation quality and product iteration speed through their systematic LLMOps approach."
  canonical: "https://www.zenml.io/llmops-database/building-and-evaluating-legal-ai-with-multi-modal-evaluation-systems"
  ogTitle: "Unify: Building and Evaluating Legal AI with Multi-Modal Evaluation Systems - ZenML LLMOps Database"
  ogDescription: "Harvey, a legal AI company, has developed a comprehensive approach to building and evaluating AI systems for legal professionals, addressing the unique challenges of document complexity, nuanced outputs, and high-stakes accuracy requirements. Their solution combines human-in-the-loop evaluation with automated model-based assessments, custom benchmarks like BigLawBench, and a \"lawyer-in-the-loop\" product development philosophy that embeds legal domain experts throughout the engineering process. The company has achieved significant scale with nearly 400 customers globally, including one-third of the largest 100 US law firms, demonstrating measurable improvements in evaluation quality and product iteration speed through their systematic LLMOps approach."
---

## Overview

This case study comes from a conference talk by Ben Lee Wilds, who leads engineering at Harvey, a legal AI company. Harvey provides AI-powered tools for lawyers and legal professionals, offering products ranging from general-purpose assistants for document drafting and summarization to large-scale document extraction tools and domain-specific agents and workflows. The company serves nearly 400 customers globally, including one-third of the largest 100 US law firms and eight of the top ten largest firms.

The talk focuses on the unique challenges of building and evaluating AI products in the legal domain and presents Harvey's comprehensive approach to LLMOps, particularly around evaluation strategies that combine human judgment with automated assessment methods.

## The Legal AI Challenge

The legal domain presents particularly difficult challenges for LLM-based applications that go beyond typical enterprise use cases. Lawyers work with extraordinarily complex documents—often hundreds or thousands of pages long—that contain extensive cross-references to other documents, case law, and legislation. The documents themselves can be challenging from a document understanding perspective, featuring handwriting, scanned notes, multi-column layouts, embedded tables, and multiple mini-pages on single pages.

The outputs required are equally complex: long-form text, detailed tables, and sometimes diagrams or charts for reports, all written in the specialized language legal professionals expect. Critically, mistakes in this domain can be career-impacting, making verification essential. This isn't just about preventing outright hallucinations, but about catching subtle misinterpretations or misconstrued statements that are "just not quite factually correct."

A particularly important insight from the talk is that quality in legal AI is highly nuanced and subjective. The speaker presented an example of two responses to the same document understanding question—both factually correct with no hallucinations—yet one was strongly preferred by in-house lawyers due to additional nuance and detail in the definitions. This subjectivity makes automated evaluation extremely challenging.

## Product Development Philosophy

Harvey's approach to building legal AI products is built on three core principles that directly influence their LLMOps practices:

**Applied AI Focus**: The company emphasizes that success requires combining state-of-the-art AI with best-in-class UI. It's not enough to have the best model; the AI must be packaged in a way that meets customers where they are and solves real-world problems.

**Lawyer-in-the-Loop**: This is perhaps the most distinctive aspect of Harvey's approach. Lawyers are embedded at every stage of the product development process, working side-by-side with engineers, designers, and product managers. They contribute to identifying use cases, collecting datasets, creating evaluation rubrics, iterating on UI, and conducting end-to-end testing. This approach acknowledges that the complexity and nuance in legal work requires genuine domain expertise that engineers alone cannot replicate.

**Prototype Over PRD**: Rather than relying on detailed product requirement documents, Harvey emphasizes rapid prototyping and iteration. They've invested heavily in their own AI prototyping stack to iterate on prompts, algorithms, and UI simultaneously. This approach makes work tangible and accelerates learning cycles.

The workflow for building a new feature follows a collaborative pattern: lawyers provide initial context about what a document type is, how it's used, and when it comes up in daily work. They then collaborate with engineers to build the algorithm and evaluation dataset. Engineers build a prototype, and the team iterates through multiple cycles of reviewing outputs until the results meet expert standards.

## Three-Layered Evaluation Framework

Harvey's evaluation strategy operates at three distinct levels, reflecting the complexity of assessing legal AI quality:

### Human Preference Judgments

Human evaluation remains Harvey's highest-quality signal, and significant effort goes into improving the throughput and efficiency of collecting human preference data. The primary tool is the classic side-by-side evaluation, where human raters (often trained attorneys given the domain expertise required) compare two responses to the same query.

For each comparison, raters are asked to provide relative preferences, numerical ratings on a scale (typically 1-7, from "very bad" to "very good"), and qualitative feedback. These evaluations drive launch decisions for new models, prompts, or algorithms. Harvey has built custom tooling to scale these evaluations, allowing them to be run routinely across many different tasks.

### Automated Model-Based Evaluations (LLM-as-Judge)

Given the cost and time requirements of human evaluation—especially when using domain experts like trained attorneys—Harvey seeks to leverage automated evaluations wherever possible. However, they acknowledge significant challenges with applying existing academic benchmarks to real-world legal work.

The speaker specifically critiques benchmarks like LegalBench, which tend to feature simple yes/no questions with no reference to external materials. Real legal work involves complex, open-ended questions with subjective answers that require analyzing extensive external documents.

To address this gap, Harvey built their own benchmark called **BigLawBench**, which contains complex open-ended tasks with subjective answers that more closely mirror actual legal work. An example question might ask to "analyze these trial documents, draft an analysis of conflicts, gaps, contradictions, etc."—with expected outputs spanning multiple paragraphs.

For automated evaluation of these complex outputs, Harvey develops detailed rubrics broken into categories:
- **Structure**: Is the response formatted appropriately (e.g., as a table with specific columns)?
- **Style**: Does the response emphasize actionable advice?
- **Substance**: Does the response correctly state specific facts from the source documents?
- **Accuracy**: Does the response contain hallucinations or misconstrued information?

Critically, all evaluation criteria are crafted by in-house domain experts and are distinct for each question-answer pair, representing substantial investment in evaluation infrastructure.

### Step-wise Workflow Evaluation

For complex multi-step workflows and agents, Harvey breaks problems into components to evaluate each step separately, making the overall evaluation problem more tractable. The speaker uses RAG as a canonical example, where a typical pipeline includes query rewriting, chunk/document retrieval, answer generation, and citation creation. Each step can be evaluated independently.

This decomposition approach allows greater use of automated evaluations and is applied to complex workflows, citation accuracy, and agentic processes. The principle extends to any multi-step process where intermediate outputs can be assessed against clear criteria.

## Real-World Launch Case Study: GPT-4.1

The speaker provided a concrete example of their evaluation process in action when OpenAI released GPT-4.1 (April 2025). Harvey received early access to the model and followed a structured evaluation process:

First, they ran BigLawBench to get a rough quality assessment. GPT-4.1 performed better than other foundation models in the context of Harvey's AI systems, showing promising results.

Next, they conducted human rater evaluations. Comparing their baseline system against the new 4.1-based system, they found the new system's responses skewed significantly toward higher ratings on the 1-7 scale.

Despite the positive results, they ran additional tests on product-specific datasets to understand where the model worked well and where it had shortcomings. They also conducted extensive internal dogfooding to collect qualitative feedback.

This additional testing uncovered regressions that automated metrics wouldn't catch—for example, GPT-4.1 was much more likely to start every response with "Certainly!" which was off-brand for Harvey's product. These issues had to be addressed before rollout.

## Tools and Infrastructure

Harvey uses a combination of commercial and custom tooling for their evaluation infrastructure. They leverage LangSmith extensively for a subset of their evaluations, particularly routine evaluations related to step-wise task breakdowns. However, they've also built their own tools for human rater-focused evaluations, suggesting that no single platform meets all their needs. The speaker encourages finding what works best rather than committing to a single solution.

## Key Learnings

**Invest in Tooling ("Sharpen Your Axe")**: Evaluation is fundamentally an engineering problem. Investment in strong tooling, processes, and documentation pays back quickly—the speaker suggests 10-fold returns. Better tooling made it easier to run evaluations, which led to more teams using them more frequently, improving iteration speed and product quality while increasing confidence in launches.

**Taste Matters Alongside Metrics**: While rigorous, repeatable evaluations are critical, human judgment, qualitative feedback, and taste remain essential. The team learns substantially from qualitative feedback from raters, internal dogfooding, and customers. Many product improvements don't impact evaluation metrics meaningfully but clearly make the product better—by making it faster, more consistent, or easier to use.

**Process Data is the Future**: Looking forward, the speaker argues that building domain-specific agentic workflows requires "process data"—information about how things actually get done within organizations. For example, an M&A transaction involves months of work across hundreds of subtasks, but there's no written playbook. This knowledge often exists only in hallway conversations or handwritten notes. Extracting and applying this kind of process data to models could drive the next breakthroughs in agentic systems.

## Citation and Verification Features

Harvey includes citation features to ground all AI statements in verifiable sources, allowing users to verify that summaries and generated content are correct and acceptable. This addresses the career-impacting nature of mistakes in legal work and reflects the domain's emphasis on accuracy and verifiability.

## Product Capabilities

The talk mentions several product capabilities that represent production LLM applications:
- Document summarization and drafting
- Firm-specific customization using internal knowledge bases and templates
- Large-scale document analysis (analyzing hundreds or thousands of documents simultaneously)
- Red-line analysis workflows
- Multi-step agentic search
- Personalization and memory features
- Long-running task execution

These capabilities demonstrate a mature LLMOps practice with RAG implementations, agent orchestration, and domain-specific fine-tuning through prompt engineering and customization layers.