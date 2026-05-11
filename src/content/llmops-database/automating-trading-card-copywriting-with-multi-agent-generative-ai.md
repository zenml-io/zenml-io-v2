---
title: "Automating Trading Card Copywriting with Multi-Agent Generative AI"
slug: "automating-trading-card-copywriting-with-multi-agent-generative-ai"
draft: false
llmopsTags:
  - "content-moderation"
  - "regulatory-compliance"
  - "poc"
  - "rag"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "few-shot"
  - "chunking"
  - "evals"
  - "serverless"
  - "documentation"
  - "compliance"
  - "guardrails"
  - "scalability"
  - "amazon-aws"
  - "anthropic"
industryTags: "media-entertainment"
company: "Fanatics Collectibles"
summary: "Fanatics Collectibles, a leading trading card company operating under brands like Topps, faced a significant challenge in creating compelling card back copy at scale. Their editorial teams spent weeks researching player stats, crafting narratives, and ensuring compliance with strict licensing agreements for each card set. The company implemented a multi-agent system using Amazon Bedrock to automate the research, copywriting, and quality assurance process. The solution combined a structured data pipeline for player statistics, a web search agent for qualitative research, and a specialized QA agent that validates copy against complex compliance guidelines. The system achieved remarkable results: a 90% reduction in production time (from weeks to hours), 40% fewer edits required by the QA team due to better compliance adherence, and 90% cost savings in content creation, while maintaining quality standards that collectors couldn't reliably distinguish from human-written copy."
link: "https://www.youtube.com/watch?v=plJylA9v_uc"
year: 2026
seo:
  title: "Fanatics Collectibles: Automating Trading Card Copywriting with Multi-Agent Generative AI - ZenML LLMOps Database"
  description: "Fanatics Collectibles, a leading trading card company operating under brands like Topps, faced a significant challenge in creating compelling card back copy at scale. Their editorial teams spent weeks researching player stats, crafting narratives, and ensuring compliance with strict licensing agreements for each card set. The company implemented a multi-agent system using Amazon Bedrock to automate the research, copywriting, and quality assurance process. The solution combined a structured data pipeline for player statistics, a web search agent for qualitative research, and a specialized QA agent that validates copy against complex compliance guidelines. The system achieved remarkable results: a 90% reduction in production time (from weeks to hours), 40% fewer edits required by the QA team due to better compliance adherence, and 90% cost savings in content creation, while maintaining quality standards that collectors couldn't reliably distinguish from human-written copy."
  canonical: "https://www.zenml.io/llmops-database/automating-trading-card-copywriting-with-multi-agent-generative-ai"
  ogTitle: "Fanatics Collectibles: Automating Trading Card Copywriting with Multi-Agent Generative AI - ZenML LLMOps Database"
  ogDescription: "Fanatics Collectibles, a leading trading card company operating under brands like Topps, faced a significant challenge in creating compelling card back copy at scale. Their editorial teams spent weeks researching player stats, crafting narratives, and ensuring compliance with strict licensing agreements for each card set. The company implemented a multi-agent system using Amazon Bedrock to automate the research, copywriting, and quality assurance process. The solution combined a structured data pipeline for player statistics, a web search agent for qualitative research, and a specialized QA agent that validates copy against complex compliance guidelines. The system achieved remarkable results: a 90% reduction in production time (from weeks to hours), 40% fewer edits required by the QA team due to better compliance adherence, and 90% cost savings in content creation, while maintaining quality standards that collectors couldn't reliably distinguish from human-written copy."
notion:
  pageId: "35df8dff-2538-80c2-ba32-d5079122ff86"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-11T20:35:00.000Z"
  lastEditedTime: "2026-05-11T20:35:00.000Z"
  publishedAt: "2026-05-11T20:41:09Z"
---

## Overview

Fanatics Collectibles, which produces trading cards across major sports and entertainment properties through their iconic Topps brand, tackled a complex content generation challenge by building a production-grade multi-agent LLM system using Amazon Bedrock. The company needed to automate the creation of card back copy while maintaining high quality standards and strict compliance with constantly evolving licensing agreements from organizations like MLB, NBA, and UFC.

The business problem was substantial: for each player batch, editors spent weeks researching statistics, reading game summaries, and crafting unique narratives. Beyond the creative work, editors had to cross-reference complex compliance rulebooks that changed frequently. The roster changes throughout the product cycle created urgent last-minute requests, putting enormous pressure on already tight timelines. Every card went through multiple QA rounds with internal teams and licensing partners, and any compliance miss meant another week of iteration.

## Validation and Proof of Concept

Before committing to a full-scale production system, Fanatics conducted a rigorous proof of concept to answer a critical question: could AI-generated card copy actually meet collector quality expectations? They designed an experiment where they created two versions of card back copy for a set of players—one written by human editors and one generated by an LLM. These pairs were shown to seasoned collectors in a focus group.

The results were compelling. The AI-generated copy had a high acceptance rate among collectors, and across the test set, there was no significant preference between AI-generated and human-written copy. Collectors couldn't reliably tell the difference and were satisfied with both versions. However, the experiment also revealed important shortcomings. The LLM struggled with temporal sequencing concepts like "the next night" and tended toward overly dramatic language. These findings informed the design of the production solution and highlighted areas requiring specific guardrails.

## Architecture and System Design

The production system centers on a multi-agent architecture orchestrated through Amazon Bedrock, specifically using Claude Opus as the supervisor agent. The design addresses three core challenges: accurate research, quality copywriting, and compliance validation.

**Research and Data Pipeline**

The research component consists of two parallel systems working together. First, a structured player statistics knowledge base ingests and refines official MLB data sources through an automated data pipeline, ensuring complete accuracy. However, raw statistics alone proved insufficient. The team developed an intelligent stats selection system—an automated ranking algorithm that identifies only the most flattering and relevant statistics worth including in card back copy. This approach was directly inspired by how their editorial team manually selected stats.

The second component is a web search agent that serves as a qualitative research partner. After being initialized with copy requirements, the writer agent decides whether web search is needed. If so, it invokes a Lambda function that calls a web search API and processes the results, ultimately generating a response with the latest information and reference URLs. This combination of accurate stats from the knowledge base plus real-time qualitative research from the web search agent provides the foundation for compelling, factually correct card back copy at scale.

**Quality Assurance and Compliance**

The QA agent represents a critical production component that addresses the complex compliance requirements. Amazon Bedrock's knowledge base functionality allowed the team to load extensive MLB style guide books and licensing requirements directly into the system. However, they quickly discovered that the model would sometimes miss important rules even when all documentation was available in the knowledge base.

To address this, they implemented a sectional approach to quality assurance. Rather than processing everything at once, they broke down the generated copy into sections: player name, stats presentation, narrative structure, and so on. The QA agent then reviews each section systematically against relevant guidelines that have also been sorted by topics. This proactive context management, rather than relying solely on large context windows, dramatically improved their catch rate for compliance issues.

Beyond the LLM-based solution, the team also implemented traditional NLP methods to solve specific problems. They built a progressive word tracking system that monitors word usage across entire card sets to counter the LLM's tendency toward dramatic and repetitive language. This system ensures variety and creativity by tracking word frequency and flagging overuse. Additionally, to make language more engaging and aligned with their brand voice, they randomly select relevant historical card back copy and include it in the initial prompt as inspiration for the agent, essentially giving the AI examples of their best human work to emulate.

**End-to-End Workflow**

The complete workflow begins with predefined specifications where editors input the player list, theme, and any additional requirements. This triggers the writer supervisor agent powered by Claude Opus, which orchestrates the entire process. The writer agent analyzes requirements, determines what information is missing, and generates card back copy by pulling from the MLB card back example knowledge base. When needed, it invokes the web search agent to research current player information through Lambda and the Tavily AI API. Simultaneously, if validated stats are available, they're pulled from the stats knowledge base fed by the stats pipeline.

Once copy is drafted, the QA agent validates it against MLB guidelines, checks formatting rules and character limits through a QA Lambda function, and ensures quality standards are met. This multi-agent orchestration, combining knowledge bases, web search, stats pipelines, and quality assurance, transforms what used to take two weeks into a process that completes in under a day.

## Development Approach and Tooling

The team took a pragmatic approach to development that's instructive for LLMOps practitioners. When Amazon Bedrock was still new to their team, they built their first proof of concept entirely in the GUI console without CDK or formal deployment infrastructure. This wasn't corner-cutting but a deliberate strategy. The console removed friction, allowing them to test prompts instantly, compare models, and understand system behavior in hours instead of days. For a brand-new service, this fast feedback loop proved incredibly valuable.

Once the proof of concept worked and they validated the workflow, they moved to AWS CDK for production deployment. This transition was driven by specific needs: repeatable deployments, multiple environment support, and scalability across different sports licenses. While they developed the solution for baseball first, they needed to scale it to other properties like NBA, UFC, and WWE. Each sport has slightly different compliance requirements and style guidelines, but the core architecture remains the same. By implementing the entire solution using AWS CDK and generalizing it as a template, they built it once and can now deploy many times with minimal effort. This is a clear example of mature LLMOps thinking about reusability and standardization.

## User Interface and Asynchronous Design

As a data science team without deep front-end or UX experience, they used Streamlit to build a clean, functional interface in pure Python. However, they faced a significant architectural challenge: each run can take several minutes for multi-agent processing or even hours when running batches of 100 subjects. A traditional web app model where the UI waits for the entire job to finish isn't stable for long-running workflows due to browser session timeouts, network connection drops, or laptops going to sleep.

They designed the system to be asynchronous by decoupling the UI from the processing. Instead of the UI doing the work, it submits work as a job that runs in the background. A worker processes independently, and the UI checks job status and displays progress and results whenever the user returns. This approach makes the web UI stable, scalable, and user-friendly even for heavy workloads, and it allowed them to deliver a business-facing interface without building a full front-end application.

## Model Selection and Prompt Engineering

The team selected Claude Opus as their supervisor agent, leveraging its strong reasoning capabilities for orchestrating complex multi-agent workflows. The use of a knowledge base with RAG patterns for both compliance documents and historical card examples represents a sophisticated approach to grounding the model's outputs. By including randomly selected historical card examples in prompts as inspiration, they effectively used few-shot learning to maintain brand voice and quality standards.

The sectional approach to QA, where the model reviews different aspects of the copy separately with targeted context, demonstrates advanced prompt engineering that balances context window limitations with comprehensive coverage. This is more effective than simply relying on ever-larger context windows, as it ensures the most relevant information is foregrounded for each specific validation task.

## Business Impact and Production Metrics

The system delivered transformative business results. The company achieved a 90% reduction in production time, with card back creation moving from weeks to hours with minimal human intervention. This speed improvement proved particularly valuable for handling last-minute roster changes and urgent production requests that previously created bottlenecks.

Quality metrics also improved significantly, with 40% fewer edits required by the QA team. AI-generated card back copy produced fewer errors and more consistently aligned with licensing guidelines compared to the manual process. The AI followed complex compliance documents more reliably than manual processes, resulting in fewer costly revision cycles with licensing partners.

Cost savings were substantial at 90% reduction in production creation costs, though the more significant value lies in freeing the editorial team to focus on high-value creative work. Editors can now spend time developing new card concepts, crafting premium content for special editions, and strategic planning rather than spending weeks on research and compliance checking.

## Critical Assessment and Learnings

While the results are impressive, several aspects warrant balanced consideration. The initial POC revealed that collectors couldn't distinguish between human and AI-generated copy, which validates the quality but also raises questions about whether the solution might be overengineered for the task at hand. The fact that LLMs struggled with temporal sequencing and tended toward dramatic language suggests these remain active areas requiring ongoing monitoring and refinement.

The layered approach combining LLM-based generation, RAG for compliance, traditional NLP for word tracking, and sectional QA demonstrates sophistication but also complexity. This multi-layered system requires ongoing maintenance and expertise to operate effectively. The asynchronous processing architecture, while necessary for long-running jobs, adds operational complexity that teams must manage.

The choice to start with GUI-based development before moving to CDK is pragmatic and well-reasoned, though it does mean the team went through two implementation cycles. This tradeoff between rapid experimentation and production-ready infrastructure is common in LLMOps but represents real development cost.

The system's scalability across multiple sports properties through templated CDK deployments is a clear success, though each new sport still requires customization of compliance rules and style guidelines. This isn't fully automated scaling but rather efficient replication with configuration management.

Overall, this case study represents a mature approach to LLMOps that combines multiple techniques—multi-agent orchestration, RAG, traditional ML methods, asynchronous processing, and thoughtful infrastructure choices—to solve a genuine business problem with measurable impact. The team demonstrated strong engineering judgment in validation methodology, incremental development, and understanding when to use different tools for different problems. The solution maintains human oversight where it matters most while automating repetitive work, which represents a sustainable production pattern for generative AI systems.
