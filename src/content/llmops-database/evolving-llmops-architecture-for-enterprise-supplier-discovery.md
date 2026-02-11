---
title: "Evolving LLMOps Architecture for Enterprise Supplier Discovery"
slug: "evolving-llmops-architecture-for-enterprise-supplier-discovery"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67bc370c8020f0d0c2104089"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:01:48.216Z"
  createdOn: "2025-02-24T09:08:28.239Z"
llmopsTags:
  - "structured-output"
  - "unstructured-data"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "rag"
  - "prompt-engineering"
  - "semantic-search"
  - "embeddings"
  - "few-shot"
  - "human-in-the-loop"
  - "error-handling"
  - "system-prompts"
  - "chunking"
  - "latency-optimization"
  - "cost-optimization"
  - "fastapi"
  - "langchain"
  - "chromadb"
  - "kubernetes"
  - "monitoring"
  - "databases"
  - "cicd"
  - "scaling"
  - "pytorch"
  - "redis"
  - "openai"
  - "microsoft-azure"
  - "amazon-aws"
  - "hugging-face"
  - "nvidia"
industryTags: "e-commerce"
company: "Various"
summary: "A detailed case study of implementing LLMs in a supplier discovery product at Scoutbee, evolving from simple API integration to a sophisticated LLMOps architecture. The team tackled challenges of hallucinations, domain adaptation, and data quality through multiple stages: initial API integration, open-source LLM deployment, RAG implementation, and finally a comprehensive data expansion phase. The result was a production-ready system combining knowledge graphs, Chain of Thought prompting, and custom guardrails to provide reliable supplier discovery capabilities."
link: "https://www.infoq.com/presentations/architecture-llm/?topicPageSponsorship=88befbbd-30f0-4d18-9d43-0bf2cb3e751d"
year: 2024
seo:
  title: "Various: Evolving LLMOps Architecture for Enterprise Supplier Discovery - ZenML LLMOps Database"
  description: "A detailed case study of implementing LLMs in a supplier discovery product at Scoutbee, evolving from simple API integration to a sophisticated LLMOps architecture. The team tackled challenges of hallucinations, domain adaptation, and data quality through multiple stages: initial API integration, open-source LLM deployment, RAG implementation, and finally a comprehensive data expansion phase. The result was a production-ready system combining knowledge graphs, Chain of Thought prompting, and custom guardrails to provide reliable supplier discovery capabilities."
  canonical: "https://www.zenml.io/llmops-database/evolving-llmops-architecture-for-enterprise-supplier-discovery"
  ogTitle: "Various: Evolving LLMOps Architecture for Enterprise Supplier Discovery - ZenML LLMOps Database"
  ogDescription: "A detailed case study of implementing LLMs in a supplier discovery product at Scoutbee, evolving from simple API integration to a sophisticated LLMOps architecture. The team tackled challenges of hallucinations, domain adaptation, and data quality through multiple stages: initial API integration, open-source LLM deployment, RAG implementation, and finally a comprehensive data expansion phase. The result was a production-ready system combining knowledge graphs, Chain of Thought prompting, and custom guardrails to provide reliable supplier discovery capabilities."
---

## Overview

This case study comes from a QCon London 2024 presentation by Nischal HP, VP of Data Science and ML Engineering at Scoutbee, a company operating in the supply chain intelligence space. Scoutbee provides enterprise customers like Unilever and Walmart with a semantic search platform for supplier discovery—essentially a specialized search engine that helps organizations find manufacturers and suppliers that meet specific criteria. The presentation chronicles an 18-month journey of integrating LLMs into their existing product, moving from initial POC to production deployment through four distinct evolutionary stages.

The context is particularly relevant for enterprise LLMOps because it addresses the challenges of bringing LLMs to production in environments where data privacy, reliability, and domain expertise are paramount. Unlike consumer-facing applications where occasional errors might be tolerable, enterprise supply chain decisions involve significant business risk, making trust and explainability essential requirements.

## Stage 1: Initial LLM Integration

The journey began in early 2023 with a straightforward approach: connecting the existing application to ChatGPT via API, using LangChain for prompt engineering. This represented the minimal viable integration that many organizations attempted during the initial LLM wave. The existing infrastructure included knowledge graphs populated through distributed inferencing with Spark and smaller ML models.

The immediate problems that emerged were instructive for understanding LLMOps challenges:

- **Lack of domain knowledge**: The foundational models had no understanding of supplier discovery concepts, leading to conversations that veered off-topic
- **Hallucinations**: The model fabricated supplier information that appeared convincing but was entirely fictional
- **Overly chatty responses**: Users found the conversational overhead frustrating and asked for the old form-based interface
- **Enterprise security concerns**: Customers were uncomfortable with production workloads flowing through external APIs like ChatGPT

Despite these issues, user feedback indicated genuine enthusiasm for the experience, validating the market opportunity while highlighting the substantial work required for production readiness.

## Stage 2: Open-Source LLMs and Guardrails

The privacy and security concerns drove the decision to self-host open-source models. The team deployed LLaMA-13B (initially obtained through unofficial channels before Hugging Face availability) with FastChat API. This immediately increased complexity and cost—the organization became responsible for infrastructure that was expensive to operate compared to API-based approaches.

A critical LLMOps learning emerged: **prompt engineering is not portable across models**. The prompts developed for ChatGPT required substantial rework to function with LLaMA, meaning any future model changes would require similar effort.

For domain adaptation, the team explored several approaches including zero-shot learning, in-context learning, few-shot learning, and agents. They implemented agents that could understand tasks, make queries to different systems, and synthesize answers. Heavy prompt engineering was required to feed domain knowledge into these agents.

The guardrails implementation was particularly innovative. Rather than using a linear validation approach, they developed a **Graphs of Thought** methodology inspired by research from ETH Zurich. This modeled the business process as a graph, allowing different guardrails to be invoked depending on where the user was in their workflow. This was necessary because supplier discovery involves dynamic, non-linear business processes rather than simple query-response patterns.

However, testing agents proved to be a nightmare. The reasoning process was opaque—agents would sometimes invoke data APIs appropriately, sometimes make up answers, and debugging was extremely difficult without the ability to set breakpoints in the "thinking" process. This made the team uncomfortable with bringing agents to production.

## Stage 3: RAG Implementation for Hallucination Reduction

The persistence of hallucinations led to implementing Retrieval-Augmented Generation (RAG). This significantly expanded the engineering stack to include:

- Chain of Thought prompting for reasoning transparency
- Query rewriting and multi-query generation
- Custom guardrails based on Graphs of Thought
- Query-based data retrieval
- Answer summarization

The Chain of Thought approach was chosen specifically to address the agent opacity problem. Instead of a direct question-to-answer path, the LLM now followed an explicit reasoning process that could be observed and validated. This reasoning process could be taught through few-shot examples, providing a "roadmap" for the LLM without requiring full model retraining.

The team also implemented query transformation to handle the diversity of user inputs. Some users typed keywords (Google-style), while others provided extensive narrative context. The system needed to normalize these inputs into standard forms and potentially split complex queries into multiple sub-queries.

**Observability** became critical at this stage. The team identified two distinct observation requirements:
- **Service-level metrics**: Response times, token processing rates, and infrastructure performance
- **Conversation quality metrics**: Context precision and recall, answer faithfulness, and the relationship between retrieved data and generated responses

The Ragas framework (open-source) was adopted to generate scores for generation and retrieval quality, providing actionable insights for system improvement.

Key outcomes from RAG implementation:
- Hallucinations drastically reduced through forcing the model to use retrieved data and provide citations
- Knowledge graphs served as the data source rather than vector databases, maintaining explainability
- Agent elimination made testing significantly easier
- All conversation data and results were stored to power observability and product metrics

New challenges emerged: users began interrogating the data more deeply, requiring conversational capabilities the system didn't yet support, and latency increased significantly with more processing steps.

## Stage 4: Data Scaling and Infrastructure Evolution

With the LLM layer stabilized, the bottleneck shifted to data quality and coverage. The effectiveness of RAG depends entirely on having comprehensive, high-quality data to retrieve.

The team chose knowledge graphs over pure vector embeddings for several reasons:
- Better explainability for enterprise users with diverse technical backgrounds
- Easier correction of errors
- Semantic understanding of relationships between data entities
- Data provenance tracking

The knowledge graph ontology design, which originally took 6-9 months, could potentially be accelerated to months using LLMs—an interesting example of using LLMs to improve LLM-powered systems.

For populating the knowledge graph at scale, the team employed a **teacher-student approach**: using a superior LLM to generate high-quality training data, then fine-tuning smaller, more economical models on this data. Human validation remained in the loop, but the effort reduction was 10-20x compared to purely human annotation. This approach was motivated by practical constraints: large models are expensive to operate, and GPU availability in AWS regions (Frankfurt, Ireland, North Virginia) was already constrained.

To handle language variation in user queries, they used LLMs to generate facts with synonyms and alternative phrasings, expanding the knowledge graph's query understanding.

The scaling challenges required a fundamental infrastructure change. The team identified several pain points:
- Spark pipelines were difficult to integrate with LLM workloads
- Data scientists weren't Spark-aware, requiring translation by ML engineers
- Observing and debugging Spark failures was challenging for Python-focused teams
- Managing separate data, ML, and LLM pipelines created operational complexity

The solution was adopting **Ray** (open-source from UC Berkeley, with Anyscale providing the enterprise platform). Ray provides a universal compute framework that allows data scientists to scale code using simple decorators rather than understanding distributed systems. The platform also provided optimized LLM hosting on smaller GPUs, running on the company's own infrastructure to maintain privacy requirements.

## Key LLMOps Lessons and Takeaways

The presentation concluded with practical wisdom that reflects hard-won operational experience:

**Business Considerations**:
- Not every product needs LLMs—traditional databases and search systems remain effective for many use cases
- ROI calculation is essential given the investment in upskilling, infrastructure, and maintenance
- LLMs come with significant costs that must be justified by business value

**Technical Practices**:
- Version control everything: prompts, data, agents, APIs, with proper metadata tagging
- Store all data and metadata for debugging and improvement
- Measure everything—the technology is alluring but requires empirical validation
- Design for flexibility while maintaining reliability
- Think in terms of complete systems, not just the LLM component

**Guardrails and Safety**:
- Guardrails are essential—the Air Canada chatbot example illustrates the liability risks of ungoverned AI agents
- Domain adaptation cannot be skipped for enterprise applications
- Human-in-the-loop validation remains necessary

**Team Management**:
- Prompt engineering fatigue and burnout are real concerns
- Data scientists may fear obsolescence when APIs can replicate their work
- Active investment in upskilling builds support systems and capability
- Embrace failure as part of the innovation process

The overall arc of the case study demonstrates that moving LLMs to production is an evolutionary journey requiring substantial architectural changes, new observability practices, data infrastructure investment, and organizational adaptation. The 18-month timeline reflects the reality that enterprise LLM deployment is far more complex than initial POCs suggest.