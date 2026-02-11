---
title: "Enterprise-Scale LLM Deployment with Self-Evolving Models and Graph-Based RAG"
slug: "enterprise-scale-llm-deployment-with-self-evolving-models-and-graph-based-rag"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67e64702d74386944a4beb35"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:05:06.655Z"
  createdOn: "2025-03-28T06:51:46.788Z"
llmopsTags:
  - "healthcare"
  - "fraud-detection"
  - "customer-support"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "rag"
  - "prompt-engineering"
  - "error-handling"
  - "human-in-the-loop"
  - "semantic-search"
  - "system-prompts"
  - "postgresql"
  - "monitoring"
  - "documentation"
  - "open-source"
  - "langchain"
  - "guardrails"
  - "meta"
  - "microsoft-azure"
  - "openai"
industryTags: "finance"
company: "Writer"
summary: "Writer, an enterprise AI company founded in 2020, has evolved from building basic transformer models to delivering full-stack GenAI solutions for Fortune 500 companies. They've developed a comprehensive approach to enterprise LLM deployment that includes their own Palmera model series, graph-based RAG systems, and innovative self-evolving models. Their platform focuses on workflow automation and \"action AI\" in industries like healthcare and financial services, achieving significant efficiency gains through a hybrid approach that combines both no-code interfaces for business users and developer tools for IT teams."
link: "https://www.youtube.com/watch?v=NKXRjZd74ic"
year: 2024
seo:
  title: "Writer: Enterprise-Scale LLM Deployment with Self-Evolving Models and Graph-Based RAG - ZenML LLMOps Database"
  description: "Writer, an enterprise AI company founded in 2020, has evolved from building basic transformer models to delivering full-stack GenAI solutions for Fortune 500 companies. They've developed a comprehensive approach to enterprise LLM deployment that includes their own Palmera model series, graph-based RAG systems, and innovative self-evolving models. Their platform focuses on workflow automation and \"action AI\" in industries like healthcare and financial services, achieving significant efficiency gains through a hybrid approach that combines both no-code interfaces for business users and developer tools for IT teams."
  canonical: "https://www.zenml.io/llmops-database/enterprise-scale-llm-deployment-with-self-evolving-models-and-graph-based-rag"
  ogTitle: "Writer: Enterprise-Scale LLM Deployment with Self-Evolving Models and Graph-Based RAG - ZenML LLMOps Database"
  ogDescription: "Writer, an enterprise AI company founded in 2020, has evolved from building basic transformer models to delivering full-stack GenAI solutions for Fortune 500 companies. They've developed a comprehensive approach to enterprise LLM deployment that includes their own Palmera model series, graph-based RAG systems, and innovative self-evolving models. Their platform focuses on workflow automation and \"action AI\" in industries like healthcare and financial services, achieving significant efficiency gains through a hybrid approach that combines both no-code interfaces for business users and developer tools for IT teams."
---

# Writer: Enterprise AI Platform for Production LLM Deployments

## Overview

This case study is drawn from a conversation between Harrison Chase (CEO of LangChain) and Waseem (co-founder and CTO of Writer), discussing Writer's journey building a full-stack generative AI platform for enterprise customers. Writer has been in the AI space since 2020, predating the ChatGPT boom, and has evolved from building statistical models to deploying transformer-based systems at scale across Fortune 500 companies in financial services, healthcare, and consumer goods retail.

The conversation provides valuable insights into the practical realities of deploying LLMs in production enterprise environments, covering everything from model development to RAG architectures, evaluation strategies, and emerging paradigms like self-evolving models. It's worth noting that as a vendor conversation, some claims should be viewed through a marketing lens, though the technical details shared offer genuine insights into enterprise LLMOps challenges.

## The Evolution from Experimentation to Production Value

Writer's journey mirrors the broader enterprise AI adoption curve. In 2021-2022, before ChatGPT, the company faced significant education challenges—their sales presentations literally had to explain that "generative AI is not a Wikipedia" because customers would ask which database the generated text was being copied from. ChatGPT served as massive market education, shifting the conversation from "how does this work?" to "how does this compare to ChatGPT?"

The company has observed a significant shift in enterprise priorities since 2024. Rather than asking about specific models or tools, enterprises now focus almost exclusively on business value delivery. Waseem notes that customers are saying: "We spent the last few years a lot of money playing with tokens, building in-house stuff. It's not scalable, it's not working. Maybe we have one or two online use cases we utilize today. Can you help us?" This represents a maturation from experimentation to production-focused thinking.

Enterprises now want solutions that are transparent, reliable, and deployable in their own secure environments while still being integratable and scalable. The build-versus-buy debate has evolved into a hybrid approach—enterprises want ownership and control without building everything from scratch or relying on opaque APIs from AI labs.

## Primary Use Cases: From Chatbots to Action AI

Writer reports that enterprise customers have largely moved past simple chatbot implementations. The dominant pattern is now "workflow and action AI"—systems that optimize complex business processes. Specific examples mentioned include:

Healthcare claims processing represents a major use case, where traditional workflows involve hundreds of steps. AI systems can reportedly optimize these workflows by 30-50%, processing claims in real-time with significant time savings. In financial services, wealth management and portfolio risk management are key applications, where RAG-enabled systems analyze portfolios, perform web searches, and produce daily reports that teams can utilize immediately.

The UX evolution for these systems is interesting: enterprises typically start with chat interfaces during proof-of-concept phases to maintain control and visibility over every step. As trust builds, they transition to fully backend-automated systems. However, regardless of the interface, monitoring capabilities are essential—enterprises require full visibility into inputs, outputs, and all processing details to maintain performance and guarantee results.

## The Business-IT Partnership Model

A key insight from Writer's experience is the partnership model required for successful enterprise AI deployment. Unlike traditional software where IT either buys off-the-shelf solutions or builds custom systems, AI agents require genuine collaboration between IT and business users.

IT teams maintain responsibility for security, deployment, and scaling, but business users own the actual workflows and understand the domain-specific processes. Writer reports that successful enterprise customers deploying hundreds of AI agents at scale are those where this partnership functions well. On average, each enterprise employee may have between two and five AI agents, and they think of themselves as supervisors of these agents, wanting to see audit logs and control systems.

This has led Writer to develop both no-code interfaces for business users and code-based interfaces for IT teams. Business users can describe workflow steps in natural language, which gets visualized as flows. IT can later add code, install libraries, and implement monitoring tools like LangSmith. The sweet spot appears to be letting business users define processes while IT maintains the underlying infrastructure.

## Technical Architecture: Graph-Based RAG Without Graph Databases

One of the most technically interesting aspects of Writer's approach is their RAG architecture evolution. They've been building RAG-like systems since the original RAG paper in 2020, starting with Lucene/Solr/Elasticsearch full-text search, moving to semantic search, and eventually to graph-based systems.

However, they encountered significant challenges with traditional graph databases at enterprise scale. When dealing with thousands or millions of documents, standard approaches faced both accuracy degradation and performance issues. Rather than simply throwing more compute at the problem, they took a different approach: they built what they call a "graph-based system" without using any graph database, instead leveraging Postgres. The rationale is that graphs are fundamentally nodes and edges, which can be efficiently represented in PostgreSQL.

For retrieval, they utilize Fusion Decoder (based on a Meta paper) and implement dense space matching rather than standard similarity measures. This custom approach reflects a broader industry pattern—Waseem notes that "nobody today is just putting vector database with embedding and two lines of code. Each one has their own small tweak optimization around it."

The key configuration insight they've discovered is that the critical optimization isn't in the data, graph, or matching algorithms—it's in question translation. Different enterprise users have vastly different query behaviors: some type keywords like Google searches, while others ask complex, vague questions with extensive context. Understanding and handling this behavioral variance is more impactful than tuning retrieval parameters.

## Evaluation and Business Value Measurement

Writer takes a distinctly pragmatic approach to evaluation. They report that enterprises have lost trust in standard benchmarks like MMLU due to data contamination concerns. Instead, they focus on business value metrics—specifically, time savings and productivity gains.

For their own model evaluation (the Palmera series), they've created in-house internal evaluations rather than relying on public benchmarks. These are enterprise-focused, emphasizing function calling capabilities and hallucination measurement. They explicitly do not optimize for MMLU scores, instead focusing on "reasoning and behavior"—how the model actually behaves in real use cases.

An important finding is that LLM-as-a-judge approaches haven't worked well for them: "We try a lot to use LLM as a judge. It did not end well. Make Palmera to judge Palmera—yes, always everything is great." They've found human involvement necessary for reliable evaluation, though they've also found humans unreliable for ongoing production feedback.

For enterprise customers, measurement focuses on specific use case metrics. In healthcare claims processing, they measure average time to process claims with and without AI. Large enterprises already track how much time individual contributors spend on specific tasks, making it straightforward to measure AI impact. Writer works with customers to get these numbers directly rather than relying solely on platform dashboards, finding that customer-measured results build greater trust and buy-in.

## The Open Source Imperative

A clear theme throughout the conversation is enterprise preference for open-source components. Large enterprises especially view AI as core to their business and want ownership rather than rental. Writer has made their Palmera models open source for enterprise use in response to this demand.

The sentiment against proprietary model APIs is strong: "We're done with the renting, I'm done with the black box, I'm done with this lab giving me an amazing model, and six months later, distill the API and everything basically blows up." Enterprises want models they can control with their own duplication policies, or at minimum work with vendors who provide transparent, owned solutions.

This extends to the framework layer as well, with open-source tooling providing flexibility and confidence that enterprises can build, extend, and implement complex systems on top of their stack.

## Emerging Technology: Self-Evolving Models

Perhaps the most forward-looking discussion involves Writer's work on "self-evolving" or "self-aware" models, which they announced quietly in December 2024 and demonstrated in London in early 2025. This represents a contrarian take on the industry trend toward reasoning or "thinking" models, which Waseem characterizes as "a waste of tokens generated right and left."

The self-evolving model concept involves LLMs with active learning that continue training themselves in real-time without external databases or scripts. The model takes feedback, builds dynamic memory, and improves over time. The primary use case is agentic flows with multi-turn, multi-step tool calling, where traditional approaches often drop to 20-30% accuracy.

The mechanism relies on self-reflection rather than human feedback or LLM-as-judge approaches. After generating a response, the model reflects on whether that answer was correct. If not, it continues iterating and building memory to avoid reproducing the same errors. Over thousands of requests for the same task type, the model converges on correct behavior.

This addresses a critical enterprise concern: 80-90% accuracy isn't acceptable for business-critical processes. As Waseem puts it: "You tell me every 100 requests, 10 of them are completely wrong—I cannot run a business with this." The goal is achieving 99-100% accuracy for multi-step workflows.

## Current Gaps and Opportunities

The conversation acknowledges significant gaps in the current LLMOps ecosystem. At the model layer, even advanced models struggle with simple math tests. RAG systems remain far from solved, requiring significant manual optimization for each deployment. Frameworks, including Writer's own, are described as "encapsulating multiple tools" rather than providing clear semantics or opinions about how to scale and build AI agents.

This honest assessment suggests substantial opportunities for builders in the space, particularly around more opinionated, production-ready agent frameworks and more robust retrieval systems that scale without extensive per-customer configuration.

## Conclusion

Writer's experience offers a realistic view of enterprise LLMOps: significant progress has been made in moving from experimentation to production, but substantial challenges remain around accuracy, evaluation, and scalable architecture. The shift toward business value measurement, the importance of IT-business collaboration, and the push for open-source ownership represent key themes that likely apply broadly to enterprise AI adoption. The self-evolving model work, if successful, could address one of the most persistent challenges in agentic AI—achieving production-grade reliability in complex, multi-step workflows.