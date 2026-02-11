---
title: "Optimizing Security Incident Response with LLMs at Google"
slug: "optimizing-security-incident-response-with-llms-at-google"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3de56bce187890d4ce1c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:37:50.404Z"
  createdOn: "2024-11-21T14:04:21.407Z"
llmopsTags:
  - "compliance"
  - "documentation"
  - "error-handling"
  - "google-gcp"
  - "guardrails"
  - "high-stakes-application"
  - "human-in-the-loop"
  - "monitoring"
  - "prompt-engineering"
  - "regulatory-compliance"
  - "reliability"
  - "security"
industryTags: "tech"
company: "Google"
summary: "Google implemented LLMs to streamline their security incident response workflow, particularly focusing on incident summarization and executive communications. They used structured prompts and careful input processing to generate high-quality summaries while ensuring data privacy and security. The implementation resulted in a 51% reduction in time spent on incident summaries and 53% reduction in executive communication drafting time, while maintaining or improving quality compared to human-written content."
link: "https://security.googleblog.com/2024/04/accelerating-incident-response-using.html"
year: 2024
seo:
  title: "Google: Optimizing Security Incident Response with LLMs at Google - ZenML LLMOps Database"
  description: "Google implemented LLMs to streamline their security incident response workflow, particularly focusing on incident summarization and executive communications. They used structured prompts and careful input processing to generate high-quality summaries while ensuring data privacy and security. The implementation resulted in a 51% reduction in time spent on incident summaries and 53% reduction in executive communication drafting time, while maintaining or improving quality compared to human-written content."
  canonical: "https://www.zenml.io/llmops-database/optimizing-security-incident-response-with-llms-at-google"
  ogTitle: "Google: Optimizing Security Incident Response with LLMs at Google - ZenML LLMOps Database"
  ogDescription: "Google implemented LLMs to streamline their security incident response workflow, particularly focusing on incident summarization and executive communications. They used structured prompts and careful input processing to generate high-quality summaries while ensuring data privacy and security. The implementation resulted in a 51% reduction in time spent on incident summaries and 53% reduction in executive communication drafting time, while maintaining or improving quality compared to human-written content."
---

## Overview

Google's Security Workflow Automation team, in collaboration with their Privacy and Security Incident Response groups, developed an LLM-powered system to accelerate the creation of incident summaries and executive communications. Security incident management at Google's scale involves a rigorous five-step process: identification, coordination, resolution, closure, and continuous improvement. A critical but time-consuming aspect of this process is communicating incident status to various stakeholders including executives, team leads, and partner teams. The team estimated that writing thorough summaries could take nearly an hour for simpler incidents and multiple hours for complex communications.

The hypothesis was that generative AI could digest incident information faster, freeing incident responders to focus on critical tasks. The results validated this: LLM-generated summaries were produced 51% faster while receiving quality ratings 10% higher than human-written equivalents.

## Input Processing and Data Handling

One of the significant LLMOps challenges addressed was handling the diverse, unstructured data typical of security incidents. The data processed includes free-form text, logs, images, links, impact statistics, timelines, and code snippets. To make this manageable for the LLM, the team implemented a structured preprocessing pipeline.

Long and noisy sections of code and logs were replaced with self-closing XML-style tags like `<Code Section/>` and `<Logs/>`. This approach served dual purposes: preserving structural information while conserving tokens for more important facts, and reducing the risk of hallucinations that might arise from the model attempting to interpret technical artifacts.

During prompt engineering iterations, the team added additional semantic tags including `<Title>`, `<Actions Taken>`, `<Impact>`, `<Mitigation History>`, and `<Comment>`. This structured tagging approach mirrored their incident communication templates and allowed implicit information to be conveyed to the model. The self-explanatory nature of these tags also provided convenient aliases for prompt instructions, enabling directives like "Summarize the `<Security Incident>`".

## Iterative Prompt Engineering

The team documented a transparent, iterative approach to prompt development across three major versions:

**Version 1** started with a simple summarization task. The limitations quickly became apparent: summaries were too long for executive consumption, important facts like incident impact and mitigation were missing, writing style was inconsistent and didn't follow best practices (passive voice, tense, terminology, format), irrelevant data from email threads was included, and the model struggled to identify the most relevant and up-to-date information.

**Version 2** attempted to address these issues with a more elaborate prompt. The model was instructed to be concise and given explicit guidance on what constitutes a well-written summary, focusing on main incident response steps (coordination and resolution). However, limitations persisted: summaries still didn't consistently address incidents in the expected format, the model sometimes lost sight of the task or failed to incorporate all guidelines, struggled with focusing on latest updates, and showed tendencies toward drawing conclusions on hypotheses with minor hallucinations.

**Version 3 (Final)** introduced two key improvements: the insertion of two human-crafted summary examples (few-shot learning) and the introduction of a `<Good Summary>` tag. The tag served multiple purposes—it highlighted high-quality summaries and instructed the model to begin immediately with the summary without repeating the task (a common LLM behavior). This final version produced "outstanding summaries" in the desired structure, covering all key points with minimal hallucinations.

## Privacy and Risk Management Infrastructure

Given that security incidents can contain confidential, sensitive, and privileged data, the team built an infrastructure with privacy by design. Every component of the pipeline—from user interface to the LLM to output processing—has logging turned off. The LLM itself does not use any input or output for retraining.

Instead of traditional logging for monitoring, the team relies on metrics and indicators to ensure proper functionality. This represents an interesting LLMOps pattern where privacy requirements necessitate alternative approaches to system observability.

## Human-in-the-Loop Workflow Design

A critical aspect of the deployment was ensuring the LLM complemented rather than replaced human judgment. The workflow integration features a 'Generate Summary' button in the UI that pre-populates a text field with the LLM's proposed summary. Users have three options: accept the summary as-is, make manual modifications before accepting, or discard the draft entirely and start fresh.

This design pattern addresses several concerns: it mitigates risks around potential hallucinations and errors by requiring human review, it accounts for human misinterpretation of LLM-generated content, and it maintains human accountability. The team emphasizes the importance of monitoring quality and feedback over time.

## Evaluation Methodology

The team conducted a rigorous comparative evaluation with a sample of 100 summaries: 50 human-written (from both native and non-native English speakers) and 50 LLM-written using the final prompt. Summaries were presented to security teams in a blind evaluation without revealing the author.

Results showed LLM-written summaries covered all key points and were rated 10% higher than human-written equivalents. The time savings were measured across a sample size of 300 summaries, showing 51% time reduction per incident summary.

## Edge Case Handling

An important production consideration emerged around input size. The team discovered hallucination issues when input size was small relative to prompt size—in these cases, the LLM would fabricate most of the summary and key points would be incorrect. The solution was programmatic: if input size is smaller than 200 tokens, the system does not call the LLM and instead relies on human-written summaries. This represents a practical example of understanding model limitations and implementing guardrails in production.

## Extension to Complex Use Cases

Building on summarization success, the team expanded to more complex executive communications drafted on behalf of Incident Commanders. These communications go beyond summaries to include multiple sections (summary, root cause, impact, mitigation), follow specific structures and formats, and must adhere to writing best practices including neutral tone, active voice, and minimal acronyms.

The experiment with executive communications showed generative AI can evolve beyond high-level summarization. LLM-generated drafts reduced time spent on executive summaries by 53% while delivering at least on-par content quality in terms of factual accuracy and adherence to writing best practices.

## Future Directions

The team mentions exploring generative AI for other security applications including teaching LLMs to rewrite C++ code to memory-safe Rust and getting generative AI to read design documents and issue security recommendations based on content. These represent potential expansions of the LLMOps infrastructure established for incident response.

## Critical Assessment

While the results are impressive, it's worth noting that this case study comes from Google's own security blog, so there may be some inherent positive bias. The evaluation methodology, while described, doesn't specify whether the blind evaluators knew the experiment was comparing humans to LLMs. The 10% quality improvement is reported without confidence intervals or statistical significance testing. Additionally, the privacy infrastructure that prevents logging may create challenges for debugging and continuous improvement that aren't fully addressed in the write-up. The approach of simply not calling the LLM for small inputs (under 200 tokens) is pragmatic but doesn't address how to improve performance on these edge cases over time.