---
title: "Multi-Agent Personalization Engine with Proactive Memory System for Batch Processing"
slug: "multi-agent-personalization-engine-with-proactive-memory-system-for-batch-processing"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "693054c25873cf4e5e9f8891"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:30:57.022Z"
  createdOn: "2025-12-03T15:18:26.032Z"
llmopsTags:
  - "customer-support"
  - "content-moderation"
  - "classification"
  - "summarization"
  - "chatbot"
  - "data-analysis"
  - "structured-output"
  - "unstructured-data"
  - "rag"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "semantic-search"
  - "vector-search"
  - "few-shot"
  - "system-prompts"
  - "mcp"
  - "crewai"
  - "pinecone"
  - "qdrant"
  - "chromadb"
  - "langchain"
  - "api-gateway"
  - "databases"
  - "microservices"
industryTags: "tech"
company: "Personize.ai"
summary: "Personize.ai, a Canadian startup, developed a multi-agent personalization engine called \"Cortex\" to generate personalized content at scale for emails, websites, and product pages. The company faced challenges with traditional RAG and function calling approaches when processing customer databases autonomously, including inconsistency across agents, context overload, and lack of deep customer understanding. Their solution implements a proactive memory system that infers and synthesizes customer insights into standardized attributes shared across all agents, enabling centralized recall and compressed context. Early testing with 20+ B2B companies showed the system can perform deep research in 5-10 minutes and generate highly personalized, domain-specific content that matches senior-level quality without human-in-the-loop intervention."
link: "https://www.youtube.com/watch?v=4Uq4gnAGpDQ"
year: 2025
seo:
  title: "Personize.ai: Multi-Agent Personalization Engine with Proactive Memory System for Batch Processing - ZenML LLMOps Database"
  description: "Personize.ai, a Canadian startup, developed a multi-agent personalization engine called \"Cortex\" to generate personalized content at scale for emails, websites, and product pages. The company faced challenges with traditional RAG and function calling approaches when processing customer databases autonomously, including inconsistency across agents, context overload, and lack of deep customer understanding. Their solution implements a proactive memory system that infers and synthesizes customer insights into standardized attributes shared across all agents, enabling centralized recall and compressed context. Early testing with 20+ B2B companies showed the system can perform deep research in 5-10 minutes and generate highly personalized, domain-specific content that matches senior-level quality without human-in-the-loop intervention."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-personalization-engine-with-proactive-memory-system-for-batch-processing"
  ogTitle: "Personize.ai: Multi-Agent Personalization Engine with Proactive Memory System for Batch Processing - ZenML LLMOps Database"
  ogDescription: "Personize.ai, a Canadian startup, developed a multi-agent personalization engine called \"Cortex\" to generate personalized content at scale for emails, websites, and product pages. The company faced challenges with traditional RAG and function calling approaches when processing customer databases autonomously, including inconsistency across agents, context overload, and lack of deep customer understanding. Their solution implements a proactive memory system that infers and synthesizes customer insights into standardized attributes shared across all agents, enabling centralized recall and compressed context. Early testing with 20+ B2B companies showed the system can perform deep research in 5-10 minutes and generate highly personalized, domain-specific content that matches senior-level quality without human-in-the-loop intervention."
---

## Overview

Personize.ai is a Canadian startup with US presence focused on building what they call "generative personalization" at scale. The company is moving beyond traditional template-based, token-driven personalization toward AI-generated content that can match or exceed human quality for individual customers. Their work represents an interesting LLMOps case study because they focus specifically on batch processing with AI agents against customer databases (primarily CRM systems), rather than conversational chatbots or co-pilots. This creates a unique set of operational challenges around consistency, accuracy, reliability, and cost at scale.

The presentation discusses their journey building a multi-agent personalization engine for emails, websites, and product pages, with particular emphasis on their novel approach to memory management called "Cortex." The system operates in production environments where there is no human-in-the-loop for individual tasks, only high-level human supervision, making reliability and consistency critical operational concerns.

## Core Problem and Architecture

The fundamental architecture employs multi-agent execution around customer databases, particularly CRM systems. The company learned that personalization requires an agentic approach with multiple sequential steps: deep research, inference, reasoning, sometimes planning, and finally content generation. This multi-step process must happen at scale for potentially tens of thousands of customers.

From an LLMOps perspective, Personize.ai encountered several production-specific challenges that differ from typical LLM deployment scenarios. First, they define accuracy not as "beautiful text" but as content that meets specific business criteria for that particular company. Early feedback from businesses indicated that aesthetically pleasing content "doesn't mean anything" if it doesn't align with business objectives. This forced them to operationalize accuracy definitions on a per-company basis.

Second, they face substantial challenges with unstructured data when dealing with large databases and multiple agents. Third, batch processing at scale with multiple agents becomes extremely expensive without careful planning and optimization. Fourth, latency becomes a significant issue with multiple tool calls and API interactions. Finally, they must ensure reliability in an autonomous system without human intervention for each task.

## The Customer Understanding Challenge

A central technical challenge highlighted in the presentation is customer understanding. For accurate personalization at scale, agents must deeply understand customers in a unified, shared way across all agents. This becomes critical for consistency—without shared understanding, different agents might generate conflicting experiences for the same customer. The company identified this as a foundational LLMOps problem: how do you ensure multiple agents, possibly built by different builders, generate consistent output at scale while maintaining deep customer understanding?

## Limitations of Traditional Approaches

The presentation offers a critical assessment of two common approaches to agent memory in production systems, which is valuable for understanding their operational trade-offs:

**RAG and Vector Databases:** While these systems provide excellent interfaces to large amounts of data and enable agents to retrieve relevant chunks at task time, Personize.ai found that "having access to raw data doesn't mean that I know my customer." Several operational problems emerged: retrieval can be influenced by how prompts are written, creating inconsistency when the same agent runs repeatedly or when different agents access the same data. The chunks retrieved might come from different parts of the data, leading to partial understanding. For personalization use cases, this creates risks of inaccuracy and challenges for proper personalization, ultimately affecting the reliability and trust businesses can place in delegating customer communication at scale.

**MCPs and Function Calling:** Giving AI agents tools to connect with applications and databases also presented challenges. The approach remains sensitive to prompts and instructions. When working with multiple databases (especially in larger enterprises), function calling can result in adding large amounts of not-necessarily-relevant data to context, creating context overload. Furthermore, different agents might call functions differently, preventing the establishment of shared understanding across all agents.

## The Cortex Solution: Proactive Memory Management

Personize.ai's proposed solution, called "Cortex" (inspired by the human cortex), represents an evolving approach to memory management specifically designed for their batch processing, multi-agent use case. The system is described as work-in-progress, with the team actively learning, testing, and experimenting. Several key principles underpin this approach:

**Proactive Memory:** Rather than simply capturing raw data, the system runs internal agents to infer information, synthesize insights, and extract meaning. The example given is determining whether a company is B2B or B2C—information that might disqualify significant portions of a database or trigger different service treatments, but which rarely appears explicitly in raw data. The system proactively examines data to capture this information and add it to memory before agents need it.

**Standardized Attributes:** Every memory is captured with standard naming per customer, making them searchable and enabling filters, routing, and scoring. This standardization is crucial for operational reliability. When querying tens of thousands of companies at scale with language models, the system needs predictability on accuracy and trustworthy results. The combination of proactive inference and standardized attributes addresses this operational requirement.

**Versioning:** The system implements versioning for memories, though details are limited in the presentation. This suggests awareness of the need to track changes in customer understanding over time.

**Centralized Recall:** Built on top of proactive memorization and standardized attributes, centralized recall provides consistent access to the "bigger picture" for every agent. Different businesses building many powerful agents each need access to customer data, and traditionally each might take weeks to implement their own access methods. Centralized recall offers a consistent reference point. Because of proactive memorization that moves from raw data to memories, the system compacts information, leaving more context space available for agents to do their work while keeping things simple and lightweight.

## Prompt and Memory Architecture Refinement

An interesting operational learning involves how the team evolved their prompt architecture. Initially, prompts across different multi-step agent processes were hardcoded with instructions, best practices, shots, and examples. This created knowledge loss when team members changed or when customers wanted modifications. 

The team restructured this into a multi-layered memory system with three levels of reusability: user-level memorization, company-level memory, and contact-level memory. The goal is to shrink task-specific prompts to just the essentials of that particular task while making everything else reusable for agents. During Q&A, it was mentioned that they recognize the need for additional organizational and department-level layers to support scenarios where different departments should have siloed knowledge access. This suggests a schema-based approach for enforcing structure and naming conventions in memorization.

The team describes having "some intelligent way of matching the right parts of instruction to the agent," where agents can look at all possible context and choose what they need. However, they acknowledge needing more control and that this remains a work-in-progress. The Q&A exchange highlights this as "context engineering," a term that captures the operational challenge of managing what context different agents access.

## Implementation and Production Results

For implementation, Personize.ai offers a "one-click implementation" that performs deep research, typically taking between 5-10 minutes. The goal is full customer understanding that enables the system to generate content in the proposed manner. Over approximately three months at the time of the presentation, they've been testing with 20+ B2B companies, experimenting with implementing their Cortex system.

The reported results are noteworthy from an LLMOps perspective, though the presentation appropriately notes that this is work-in-progress and requires critical evaluation. What has impressed clients is that within a couple of minutes, the AI writes in a manner resembling a senior person from that company. The system can articulate and personalize website sections with language and writing quality very tailored to the domain, even for very technical domains. It can generate blog posts aligned with company brand voice. The claim is that this gives agents quick and immediate awareness of business context and knowledge of how to operate for that company, with access to the right customer information through the recall mechanism. The stated improvement is moving from weeks of building, trial-and-error development to minutes for agent deployment.

## Platform and Integration Strategy

Personize.ai has built a "Personalized Studio" as their centralized product, with centralized memorization and recall built in. Every agent registered in their platform (through API or natively) has recall and memorization as part of its capabilities. They're working on early access to MCPs (Model Context Protocol), their APIs, and Zapier integration. The strategic goal is enabling more people to use their system without needing to come to their studio directly, suggesting a platform play where their memory system becomes infrastructure for other agent builders.

## Balanced Assessment and Open Questions

The presentation is refreshingly honest about the work-in-progress nature of the system, which is appropriate for production LLM systems still being refined. Several aspects deserve balanced consideration:

**Strengths of the Approach:**
- The focus on proactive inference rather than raw data retrieval addresses real consistency problems in multi-agent systems
- Standardized attributes provide operational predictability needed for production scale
- Centralized recall reduces duplication and inconsistency across agents
- Context compression through memory summarization addresses real production cost and latency concerns
- The multi-layered memory architecture (user, company, contact) shows thoughtful separation of concerns

**Areas Requiring Further Validation:**
- The claimed 5-10 minute implementation time for full customer understanding seems ambitious and would benefit from more detailed evaluation metrics
- The quality claims ("senior person" level writing) are subjective and would benefit from more rigorous evaluation frameworks
- The system's behavior at true production scale (beyond 20 B2B companies) remains to be seen
- The trade-offs of proactive inference (computational cost, potential information loss, accuracy of inferences) aren't fully explored
- Access control, multi-tenancy, and organizational siloing are acknowledged as incomplete

**Open Technical Questions:**
- How do they validate the accuracy of proactively inferred attributes?
- What happens when proactive inferences are wrong, and how is that corrected?
- How do they handle the cold-start problem for new customers with limited data?
- What are the computational costs of proactive memory generation versus on-demand retrieval?
- How do they prevent the memory system itself from becoming stale or outdated?
- What evaluation frameworks do they use to measure "personalization quality" objectively?

The Q&A discussion introduces an important question about siloing memory across knowledge domains—ensuring agents in one department don't access knowledge from another. The response indicates they're working on schema-based approaches with organizational and department-level layers, but this remains incomplete. This highlights a critical operational challenge: as these systems scale, access control and multi-tenancy become essential, especially when operating across different organizations or sensitive departments within a single organization.

## Production LLMOps Considerations

From an LLMOps perspective, this case study illuminates several important considerations for deploying multi-agent systems at scale:

**Consistency vs. Flexibility Trade-offs:** The tension between allowing agents flexibility in how they access and interpret data versus ensuring consistency across agents is fundamental. Personize.ai's approach favors consistency through standardization, but this requires upfront work to define what should be standardized.

**Context Engineering as Discipline:** The presenter and moderator both identify "context engineering" as a key challenge. This encompasses not just what goes into context windows, but who has access to what, how context is structured, and how it's reused across agents. This is emerging as a distinct discipline within LLMOps.

**Batch Processing Economics:** The focus on batch processing rather than real-time interaction changes the economic calculus. The ability to spend 5-10 minutes on deep research per customer works for batch scenarios but wouldn't for real-time applications. This suggests different optimization strategies for different deployment patterns.

**Evaluation in Absence of Ground Truth:** When businesses say content "looks good" but "doesn't mean anything," this highlights the challenge of evaluating generated content without clear ground truth. The move toward company-specific accuracy definitions suggests that evaluation frameworks must be customized per deployment.

**Memory as Infrastructure:** The vision of memory-as-a-service that other agent builders can leverage suggests treating memory management as infrastructure rather than application logic. This has implications for how LLMOps platforms might evolve.

The presentation characterizes their approach as "super RAG" or "RAG on steroids," which captures the relationship to traditional retrieval-augmented generation while acknowledging the significant enhancements around proactive inference, standardization, and centralized recall. The work represents an interesting evolution in thinking about how to manage state and memory in production multi-agent systems, particularly for batch processing scenarios where consistency and cost-effectiveness are paramount operational concerns.