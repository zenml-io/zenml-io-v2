---
title: "Evolving GitHub Copilot through LLM Experimentation and User-Centered Design"
slug: "evolving-github-copilot-through-llm-experimentation-and-user-centered-design"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3bc21b1a50ef57921bc0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:27:19.472Z"
  createdOn: "2024-11-21T13:55:14.358Z"
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "compliance"
  - "databases"
  - "document-processing"
  - "documentation"
  - "embeddings"
  - "guardrails"
  - "microsoft"
  - "openai"
  - "prompt-engineering"
  - "rag"
  - "reliability"
  - "scalability"
  - "security"
  - "semantic-search"
  - "system-prompts"
  - "vector-search"
industryTags: "tech"
company: "Github"
summary: "GitHub's evolution of GitHub Copilot showcases their systematic approach to integrating LLMs across the development lifecycle. Starting with experimental access to GPT-4, the GitHub Next team developed and tested various AI-powered features including Copilot Chat, Copilot for Pull Requests, Copilot for Docs, and Copilot for CLI. Through iterative development and user feedback, they learned key lessons about AI tool design, emphasizing the importance of predictability, tolerability, steerability, and verifiability in AI interactions."
link: "https://github.blog/ai-and-ml/llms/how-were-experimenting-with-llms-to-evolve-github-copilot/"
year: 2023
seo:
  title: "Github: Evolving GitHub Copilot through LLM Experimentation and User-Centered Design - ZenML LLMOps Database"
  description: "GitHub's evolution of GitHub Copilot showcases their systematic approach to integrating LLMs across the development lifecycle. Starting with experimental access to GPT-4, the GitHub Next team developed and tested various AI-powered features including Copilot Chat, Copilot for Pull Requests, Copilot for Docs, and Copilot for CLI. Through iterative development and user feedback, they learned key lessons about AI tool design, emphasizing the importance of predictability, tolerability, steerability, and verifiability in AI interactions."
  canonical: "https://www.zenml.io/llmops-database/evolving-github-copilot-through-llm-experimentation-and-user-centered-design"
  ogTitle: "Github: Evolving GitHub Copilot through LLM Experimentation and User-Centered Design - ZenML LLMOps Database"
  ogDescription: "GitHub's evolution of GitHub Copilot showcases their systematic approach to integrating LLMs across the development lifecycle. Starting with experimental access to GPT-4, the GitHub Next team developed and tested various AI-powered features including Copilot Chat, Copilot for Pull Requests, Copilot for Docs, and Copilot for CLI. Through iterative development and user feedback, they learned key lessons about AI tool design, emphasizing the importance of predictability, tolerability, steerability, and verifiability in AI interactions."
---

## Overview

This case study documents GitHub's internal experimentation process for evolving GitHub Copilot from a code completion tool into a comprehensive AI-powered developer assistant. The work was primarily conducted by GitHub Next, the company's R&D department, which received early access to OpenAI's GPT-4 model before its public release in March 2023. The article provides valuable insights into the challenges, learnings, and design principles that emerged from deploying LLM-powered features across the GitHub platform.

GitHub Copilot was initially released in preview in 2021 as an AI pair programmer focused on code suggestions within the IDE. The case study describes how the company sought to extend this capability across the entire software development lifecycle, moving beyond just code generation to assist with pull requests, documentation lookup, and command-line operations.

## Core Experimentation Principles

GitHub developed four key pillars that guide their AI experimentation work, which serve as useful heuristics for any team deploying LLMs in production:

- **Predictable**: The team emphasizes creating tools that guide developers toward their goals without surprising or overwhelming them. This speaks to the importance of consistent behavior in LLM-powered applications.

- **Tolerable**: Acknowledging that AI models can and will produce incorrect outputs, the team designed for situations where users should be able to spot incorrect suggestions easily and address them at low cost to focus and productivity.

- **Steerable**: When responses aren't correct or aligned with user intent, the system should allow users to guide the AI toward a better solution. This reflects practical experience that banking on perfect model outputs is unrealistic.

- **Verifiable**: Solutions must be easy to evaluate. The team recognized that models are imperfect but can be valuable tools when users can verify their outputs.

These principles represent mature thinking about LLMOps challenges—specifically around managing hallucinations, maintaining user trust, and designing for failure modes rather than assuming perfect model performance.

## Product Development Case Studies

### Copilot for Pull Requests

The team led by Andrew Rice, Don Syme, Devon Rifkin, Matt Rothenberg, Max Schaefer, Albert Ziegler, and Aqeel Siddiqui explored applying AI to pull requests, a core GitHub workflow. They prototyped several features including automatic code suggestions for reviews, summarization capabilities, and test generation.

A critical learning emerged during internal testing with GitHub employees (Hubbers). The initial implementation generated AI descriptions and walkthroughs as comments on pull requests. User feedback was negative—not because the content was poor, but because the presentation implied authoritativeness that made developers anxious about potential errors.

The breakthrough came from a UX pivot: instead of presenting AI-generated content as comments, the team reframed it as suggestions that developers could preview and edit before using. This subtle change in framing transformed user reception entirely. As Rice noted, "The content was exactly the same as before, it was just presented differently."

This finding has significant implications for LLMOps practitioners: the acceptance of AI-generated content often depends more on how it's presented and integrated into existing workflows than on the raw quality of the output. Designing for editability and user control can make imperfect outputs acceptable, while presenting them as authoritative can make even good outputs problematic.

### Copilot for Docs

Eddie Aftandilian and Johan Rosenkilde developed Copilot for Docs using a retrieval-augmented generation (RAG) architecture. In late 2022, they had been exploring embeddings and retrieval systems, prototyping a vector database for other GitHub Copilot experiments. When they received GPT-4 access, they realized they could use their retrieval engine to search documentation corpora and compose results into prompts that elicit better, more topical answers.

The technical approach involved using embeddings to index documentation, retrieving relevant sections based on user queries, and then using those retrieved sections to construct prompts for the LLM. This RAG pattern has become a standard approach for grounding LLM responses in specific knowledge bases, and this case study provides insight into its early application at scale.

During testing, the team discovered an interesting user behavior pattern: even when the AI's direct answers weren't perfectly correct, users valued the feature because it provided references and links to documentation. Users were essentially treating Copilot for Docs as an enhanced search engine. The linked references made it easier to evaluate what the AI produced, shifting the burden of verification to a manageable task.

Aftandilian emphasized that "human feedback is the true gold standard for developing AI-based tools" and advocated for shipping products early to gather real user feedback rather than optimizing in isolation. This reflects a key LLMOps principle: evaluation in production with real users often reveals insights that offline testing cannot capture.

The team also noted that the chat-like modality of Copilot for Docs made answers feel less authoritative, which increased user tolerance for imperfect responses. This finding suggests that conversational interfaces may be more forgiving of LLM errors than other presentation formats.

### Copilot for CLI

Johan Rosenkilde and Matt Rothenberg developed Copilot for CLI, which allows developers to describe desired command-line operations in natural language and receive appropriate shell commands with explanations. The concept originated at a GitHub Next team meeting in October 2022, where Rosenkilde pitched an idea for using LLMs to help with CLI commands.

A notable aspect of this development was the rapid prototyping approach: Rothenberg built a working prototype during Rosenkilde's thirty-minute presentation. This prototype demonstrated feasibility and value, though it required significant refinement before becoming a technical preview.

A key feature that emerged during development was the explanation field, which provides a structured breakdown of each part of the generated command. This feature serves multiple purposes: it helps developers learn about shell scripting, allows verification that the command will perform the intended action, and acts as a security feature by clearly showing what files or systems will be affected.

Rosenkilde noted the technical challenges of getting the LLM to produce the desired structured explanations: "It's very unnatural for a language model to produce something that looks like this." This required significant prompt engineering effort to achieve the scannable, structured format they wanted rather than the paragraph-style explanations the model naturally produced.

The development of Copilot for CLI highlights the importance of UX design in LLM applications. Rosenkilde, a self-described "backend person," acknowledged that much of the product's success hinged on UX decisions and rapid iteration through design options.

## Key LLMOps Learnings

Several themes emerge from this case study that are relevant to LLMOps practitioners:

**UX Design is Critical**: Multiple teams independently discovered that how AI outputs are presented matters as much or more than output quality. Framing AI content as suggestions rather than authoritative answers, providing references for verification, and designing for editability all significantly improved user acceptance.

**Design for Imperfection**: Rather than striving for perfect accuracy, the teams designed systems that make imperfection tolerable. This includes providing verification mechanisms, making edits low-cost, and ensuring errors don't have severe consequences.

**Ship Early for Feedback**: Multiple researchers emphasized the value of shipping prototypes to real users quickly. Internal testing with GitHub employees provided crucial feedback that shaped product direction, and findings from production usage often surprised the development teams.

**Structured Outputs Require Effort**: Getting LLMs to produce structured, scannable outputs (like the CLI explanation field) required significant prompt engineering work, as this is "unnatural" for language models.

**Chat Modalities May Be More Forgiving**: The conversational interface of Copilot for Docs made users more tolerant of imperfect answers compared to more authoritative presentation formats.

## Production Deployment Context

The timeline described in the case study shows GitHub received early GPT-4 access in late 2022, conducted extensive experimentation and internal testing, and launched technical previews in March 2023 to coincide with the public GPT-4 announcement. This suggests a development cycle of several months from model access to production preview.

The case study notably does not provide detailed technical infrastructure information about how these services are deployed, scaled, or monitored in production. It focuses primarily on the experimentation and design process rather than operational concerns like latency, cost management, or reliability.

The internal testing process with "Hubbers" (GitHub employees) represents a structured approach to gathering feedback before wider release, suggesting a staged deployment strategy that allows for iteration before public availability.

## Considerations and Balance

It's worth noting that this case study is published on GitHub's own blog and serves partially as marketing content for GitHub Copilot. While the learnings described appear genuine and the challenges acknowledged are realistic, readers should consider that the positive framing and selection of stories reflects GitHub's perspective on their own products.

The case study provides limited quantitative data about user satisfaction, accuracy rates, or adoption metrics. The described learnings are primarily qualitative observations from the development process. Organizations evaluating similar approaches would benefit from establishing their own measurement frameworks for evaluating LLM-powered features.