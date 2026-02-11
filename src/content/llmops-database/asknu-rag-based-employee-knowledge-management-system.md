---
title: "AskNu: RAG-Based Employee Knowledge Management System"
slug: "asknu-rag-based-employee-knowledge-management-system"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ad9c564d67fc640f5c1e8"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:12:20.006Z"
  createdOn: "2025-12-23T18:04:53.672Z"
llmopsTags:
  - "question-answering"
  - "customer-support"
  - "chatbot"
  - "document-processing"
  - "classification"
  - "rag"
  - "embeddings"
  - "few-shot"
  - "prompt-engineering"
  - "semantic-search"
  - "chunking"
  - "langchain"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "cache"
  - "elasticsearch"
industryTags: "finance"
company: "Nubank"
summary: "Nubank developed AskNu, an AI-powered Slack integration to help its 9,000 employees quickly access internal documentation across multiple Confluence spaces. The solution uses a Retrieval Augmented Generation (RAG) framework with a two-stage process: first routing queries to the appropriate department using dynamic few-shot classification, then generating personalized answers from relevant documentation. After six months of deployment, the system achieved 5,000 active users, processed 280,000 messages, received 80% positive feedback, reduced support tickets by 96%, and decreased information retrieval time from 30 minutes (or up to 8 hours with tickets) down to 9 seconds."
link: "https://building.nubank.com/ai-solution-for-search/"
year: 2025
seo:
  title: "Nubank: AskNu: RAG-Based Employee Knowledge Management System - ZenML LLMOps Database"
  description: "Nubank developed AskNu, an AI-powered Slack integration to help its 9,000 employees quickly access internal documentation across multiple Confluence spaces. The solution uses a Retrieval Augmented Generation (RAG) framework with a two-stage process: first routing queries to the appropriate department using dynamic few-shot classification, then generating personalized answers from relevant documentation. After six months of deployment, the system achieved 5,000 active users, processed 280,000 messages, received 80% positive feedback, reduced support tickets by 96%, and decreased information retrieval time from 30 minutes (or up to 8 hours with tickets) down to 9 seconds."
  canonical: "https://www.zenml.io/llmops-database/asknu-rag-based-employee-knowledge-management-system"
  ogTitle: "Nubank: AskNu: RAG-Based Employee Knowledge Management System - ZenML LLMOps Database"
  ogDescription: "Nubank developed AskNu, an AI-powered Slack integration to help its 9,000 employees quickly access internal documentation across multiple Confluence spaces. The solution uses a Retrieval Augmented Generation (RAG) framework with a two-stage process: first routing queries to the appropriate department using dynamic few-shot classification, then generating personalized answers from relevant documentation. After six months of deployment, the system achieved 5,000 active users, processed 280,000 messages, received 80% positive feedback, reduced support tickets by 96%, and decreased information retrieval time from 30 minutes (or up to 8 hours with tickets) down to 9 seconds."
---

## Overview and Business Context

Nubank, a fintech company with approximately 9,000 employees distributed across multiple global locations, faced a common enterprise challenge: enabling efficient access to internal knowledge at scale. The company's organizational structure emphasized team autonomy, with each team maintaining its own processes and documentation within Confluence. While this approach fostered ownership and independence, it created information silos that made navigating the knowledge base complex and time-consuming. Employees frequently spent significant time searching for information or determining which team owned specific processes, often resulting in support ticket creation. Rather than viewing this as an operational bottleneck, Nubank's IT Engineering, People & Culture, and NuLLM teams collaborated to develop AskNu, an AI-powered solution that would democratize information access while preserving team autonomy.

## Technical Architecture and LLMOps Implementation

The AskNu system represents a sophisticated implementation of Retrieval Augmented Generation (RAG) deployed as a Slack-integrated application. The architectural design addresses a fundamental challenge in enterprise LLM applications: how to provide accurate, up-to-date answers from dynamic internal documentation without the prohibitive cost of continuously fine-tuning models. The team explicitly chose RAG over fine-tuning approaches, recognizing that new relevant information emerges constantly across the organization and that fine-tuning would be "way too costly" for their use case. This decision reflects practical LLMOps thinking about balancing performance, cost, and maintainability in production systems.

The system architecture consists of several interconnected components working together to deliver real-time answers. The indexing pipeline automatically extracts textual information from every Confluence department page and processes it through a chunking mechanism. Each chunk retains critical metadata including document ID, title, URL, and department affiliation. These chunks are then converted into embeddings—numerical vector representations capturing semantic meaning—using an LLM. The resulting knowledge base combines these embeddings with their associated metadata, creating a searchable semantic index of the organization's documentation.

A particularly noteworthy operational decision is the automatic refresh cycle: the indexing process runs every two hours to ensure employees always access current information. This refresh frequency represents a practical balance between system load and information freshness, demonstrating how production LLM systems must consider infrastructure constraints alongside user needs. The two-hour interval suggests that Nubank's documentation update velocity doesn't require real-time synchronization, but that same-day currency is important enough to warrant frequent rebuilds.

## Two-Stage Query Processing Architecture

The AskNu system employs a distinctive two-stage search and generation process, a design choice that addresses specific challenges in multi-domain knowledge retrieval. When a user submits a query through Slack, the system doesn't immediately generate an answer. Instead, it performs an initial search across the entire knowledge base and uses the retrieved chunks to power a routing decision. This routing stage—what the team calls "Dynamic Few-Shot Classification"—determines which department's documentation is most relevant to the query.

The rationale for this two-stage approach is explicitly stated: to prevent the LLM from mixing documentation from different departments, which could lead to inaccurate or confusing answers. This concern reflects real-world experience with RAG systems where context mixing can produce plausible-sounding but incorrect responses by blending information from incompatible domains. The two-stage design also addresses another practical concern: distinguishing between queries that require internal documentation and those that don't, such as translation requests, summarization tasks, or general knowledge questions that can be answered from the LLM's training data alone.

## Dynamic Few-Shot Classification for Routing

The routing mechanism represents an innovative application of in-context learning for production systems. The team leverages the few-shot learning capabilities of LLMs, wherein models can adapt to new tasks at runtime based on examples provided in the prompt. Rather than using static examples, AskNu implements "Dynamic Few-Shot Classification" where the examples fed to the LLM are determined by the chunks retrieved during the initial search phase. This means the routing decision is informed by actual content similarity: the retrieved chunks, their associated departments, and the user query are all provided to the LLM, which then classifies which department should handle the request.

This dynamic approach offers several advantages over static classification. It allows the routing system to adapt as documentation evolves, since the examples change based on what's currently in the knowledge base. It also means the classifier has access to semantically relevant examples for each query rather than relying on fixed representatives that might not capture the full range of departmental documentation. The system also includes an "External Source" classification for queries that don't require internal documentation, with examples of such queries included in the few-shot prompt to help the model distinguish between internal and external information needs.

The routing quality metrics—78% precision and 77% recall—provide valuable context about the system's performance in production. These metrics indicate that the router correctly identifies the appropriate department in roughly three out of four cases, which is respectable but not perfect. The balanced precision and recall suggest the system doesn't systematically over-route or under-route to specific departments. However, these figures also imply that roughly one in four queries might not be routed optimally, which could lead to incomplete or incorrect answers if the wrong department's documentation is searched in the second stage.

## Answer Generation and User Experience

Once the router identifies the appropriate department (or determines the query doesn't need internal documentation), a second search is triggered. This search is constrained to only the documents belonging to the classified department, creating a focused context for answer generation. The retrieved chunks from this department-specific search, along with the original user query, are fed into an LLM to generate a personalized response. Importantly, the system provides references to the URLs of the retrieved documents, allowing users to verify information or dive deeper into the source material. This citation practice is critical for enterprise knowledge systems where users may need to reference official documentation or verify AI-generated answers.

The user experience design includes a fallback mechanism: if users are unsatisfied with the generated answer, they're redirected to the appropriate department's portal where they can raise a support ticket. This graceful degradation acknowledges that no AI system is perfect and provides users with a clear path forward when automation fails. The combination of rapid AI-generated answers with fallback to human support represents a pragmatic approach to augmenting rather than replacing existing support channels.

## Production Metrics and Business Impact

After six months of general availability to all employees, AskNu demonstrated significant adoption and measurable impact. The system attracted 5,000 distinct users (representing over half of Nubank's employee base), processed 280,000 user messages, and achieved a 70% return rate within 30-day periods, indicating that users found the tool valuable enough to use repeatedly. The most striking operational metric is the 96% ticket deflection rate for internal domain queries, meaning the system successfully prevented 96% of what would have been support tickets from being created. This deflection rate represents substantial cost savings in support team workload and, more importantly, eliminates the wait time employees would have experienced.

The speed improvement is equally impressive: answers arrive in approximately 9 seconds compared to up to 30 minutes for manual Confluence searches or up to 8 hours when requiring ticket resolution. This acceleration in information access translates to tangible productivity gains across the organization. The system received 80% positive feedback on answers, though notably only 6% of users provided feedback at all. This low response rate is typical for enterprise tools where users may only provide feedback when something goes wrong, making the 80% positive rate particularly meaningful among those who chose to respond.

The answer accuracy metric—74% of internal domain answers labeled as accurate by department owners—provides important context about system limitations. While three-quarters accuracy might seem concerning in isolation, it's important to consider this in context. First, accuracy is assessed by department owners through regular audits, suggesting a rigorous evaluation process rather than user sentiment. Second, even with 74% accuracy, the system apparently provides enough value that users continue to engage at high rates. This suggests that even imperfect answers may be useful as starting points for further investigation, especially given the citation links to source documents. However, this accuracy figure also indicates substantial room for improvement and underscores why the fallback to human support remains necessary.

## Content Governance and System Monitoring

The case study mentions that department owners regularly audit answers to identify improvement opportunities in the documentation itself. This approach to content governance represents a sophisticated understanding of knowledge management: the AI system doesn't just surface existing documentation but also helps identify where documentation is inadequate, inconsistent, or duplicated. By analyzing where the system struggles to provide accurate answers, Nubank can systematically improve the underlying knowledge base. The authors note that future work will address content governance more explicitly, including methods to spot duplicate or inconsistent documentation, identify frequently asked questions, and detect gaps where documentation doesn't exist.

This content governance loop illustrates an important LLMOps principle: production LLM systems should include mechanisms for continuous improvement not just of the model or retrieval system, but of the underlying data sources. In enterprise knowledge management, the quality of the documentation directly determines the ceiling of what any retrieval system can achieve. By using the AI system as a diagnostic tool to improve documentation quality, Nubank creates a virtuous cycle where better documentation leads to better answers, which leads to higher user satisfaction and adoption.

## Technical Decisions and Tradeoffs

Several technical decisions in the AskNu implementation reveal thoughtful consideration of production tradeoffs. The choice to use RAG rather than fine-tuning prioritizes flexibility and cost-effectiveness over potentially higher accuracy that fine-tuning might provide. The two-hour indexing refresh cycle balances infrastructure load against information currency. The two-stage architecture trades additional latency (two searches instead of one) for improved answer quality by preventing context mixing. The dynamic few-shot classification approach adds prompt complexity but provides adaptability as documentation evolves.

The system's reliance on embeddings for semantic search is standard practice for RAG systems, but the text doesn't specify which embedding model is used or whether it's a general-purpose model or one specialized for the domain. Similarly, while the case study mentions using "a LLM" for classification and generation, it doesn't specify which model(s) are deployed in production. This lack of specificity is common in corporate case studies but limits reproducibility and makes it difficult to assess whether the reported performance might be specific to particular model choices.

The routing precision and recall metrics (78% and 77% respectively) suggest that approximately one in four queries might be misrouted. The downstream impact of misrouting on final answer quality isn't explicitly quantified, though the 74% answer accuracy figure may partially reflect routing errors. An interesting question is whether the system includes any fallback mechanisms when routing confidence is low—for example, searching across multiple departments or escalating directly to human support. The text doesn't mention such mechanisms, suggesting the system commits to a single department routing decision for each query.

## Future Directions and System Evolution

The team outlines several directions for future development. They're working on improving the router to increase end-to-end metrics, acknowledging that the 78/77% precision/recall leaves room for enhancement. More ambitiously, they plan to integrate the solution with enterprise systems to enable task automation beyond information retrieval, such as opening tickets, requesting payslips, requesting vacation time, or provisioning platform access. This evolution from question-answering to task execution represents a significant expansion of scope, moving from a purely informational system to one capable of taking actions on behalf of users.

This planned expansion raises interesting LLMOps considerations around safety, authorization, and error handling that aren't addressed in the current case study. Taking actions with real consequences (like submitting vacation requests) requires higher reliability than information retrieval, where users can verify answers before acting on them. It will be interesting to see how Nubank approaches these challenges as AskNu evolves from a knowledge assistant to an action-taking agent.

## Critical Assessment and Balanced Perspective

While the case study presents AskNu as a clear success—and the adoption and ticket deflection metrics certainly support that characterization—it's important to consider potential limitations and unaddressed questions. The 74% answer accuracy rate means roughly one in four answers contains inaccuracies according to department owner audits. For an employee relying on the system for time-sensitive decisions, this error rate could be problematic if they don't verify answers against source documentation. The case study doesn't address how users are educated about the system's limitations or encouraged to verify critical information.

The 96% ticket deflection rate is impressive but raises questions about the 4% of queries that still result in tickets. Are these queries fundamentally different in nature? Do they represent edge cases the system can't handle, or are they tickets opened after unsatisfactory AI answers? Understanding the characteristics of non-deflected tickets could provide insights for further improvement. Similarly, the 70% return rate means 30% of users don't return within 30 days—what causes this drop-off, and do these users represent dissatisfied customers or simply infrequent information seekers?

The low feedback response rate (6%) makes it difficult to draw strong conclusions from the 80% positive feedback figure. Users who don't provide feedback might have very different experiences than those who do, and without understanding this self-selection bias, the true satisfaction level remains somewhat uncertain. The case study would benefit from discussing efforts to increase feedback rates or alternative methods for measuring user satisfaction.

From a technical perspective, the dynamic few-shot classification approach is clever but adds complexity to the prompt engineering and potentially increases inference costs by requiring retrieved chunks to be included in the classification prompt. The text doesn't discuss the computational or financial costs of running the system, making it difficult to assess cost-effectiveness beyond the ticket deflection benefits. For organizations considering similar implementations, understanding the infrastructure requirements and ongoing operational costs would be valuable information.

Despite these questions and limitations, AskNu represents a sophisticated production deployment of RAG technology that delivers measurable business value in an enterprise setting. The system successfully balances competing concerns around accuracy, speed, coverage, and cost. The architectural choices—particularly the two-stage process and dynamic few-shot classification—demonstrate thoughtful engineering adapted to the specific challenges of multi-domain enterprise knowledge management. The integration with existing workflows through Slack and the fallback to traditional support channels shows pragmatic product thinking about how AI systems fit into existing organizational processes rather than requiring users to adapt to entirely new paradigms.