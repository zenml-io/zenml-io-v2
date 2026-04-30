---
title: "Event-Driven RAG System for Healthcare Benefits Using MCP"
slug: "event-driven-rag-system-for-healthcare-benefits-using-mcp"
draft: false
llmopsTags:
  - "healthcare"
  - "chatbot"
  - "document-processing"
  - "question-answering"
  - "rag"
  - "embeddings"
  - "semantic-search"
  - "prompt-engineering"
  - "agent-based"
  - "langchain"
  - "postgresql"
  - "redis"
  - "fastapi"
  - "serverless"
  - "microservices"
  - "api-gateway"
  - "databases"
  - "monitoring"
  - "security"
  - "anthropic"
  - "amazon-aws"
industryTags: "healthcare"
company: "Daisy Health"
summary: "Daisy Health, a late-seed stage startup providing a digital healthcare marketplace for underserved communities, faced challenges with PDF-based benefits documents that were ubiquitously used but poorly managed, leading to outdated vector stores and manual reindexing. They implemented a production LLM system using Anthropic's Model Context Protocol (MCP) with an event-driven architecture on AWS, combining Lambda functions triggered by S3 uploads for real-time document vectorization and a chatbot interface for employees to query their benefits. The solution enables automated ingestion of plan documents from providers, uses elicitation to gather context like plan status and employer information, and provides personalized benefits recommendations by grounding responses in vectorized plan data stored in LanceDB, all while maintaining security through JWT tokens and AWS Cognito integration."
link: "https://www.youtube.com/watch?v=PS3zoAhxwug"
year: 2026
seo:
  title: "Daisy Health: Event-Driven RAG System for Healthcare Benefits Using MCP - ZenML LLMOps Database"
  description: "Daisy Health, a late-seed stage startup providing a digital healthcare marketplace for underserved communities, faced challenges with PDF-based benefits documents that were ubiquitously used but poorly managed, leading to outdated vector stores and manual reindexing. They implemented a production LLM system using Anthropic's Model Context Protocol (MCP) with an event-driven architecture on AWS, combining Lambda functions triggered by S3 uploads for real-time document vectorization and a chatbot interface for employees to query their benefits. The solution enables automated ingestion of plan documents from providers, uses elicitation to gather context like plan status and employer information, and provides personalized benefits recommendations by grounding responses in vectorized plan data stored in LanceDB, all while maintaining security through JWT tokens and AWS Cognito integration."
  canonical: "https://www.zenml.io/llmops-database/event-driven-rag-system-for-healthcare-benefits-using-mcp"
  ogTitle: "Daisy Health: Event-Driven RAG System for Healthcare Benefits Using MCP - ZenML LLMOps Database"
  ogDescription: "Daisy Health, a late-seed stage startup providing a digital healthcare marketplace for underserved communities, faced challenges with PDF-based benefits documents that were ubiquitously used but poorly managed, leading to outdated vector stores and manual reindexing. They implemented a production LLM system using Anthropic's Model Context Protocol (MCP) with an event-driven architecture on AWS, combining Lambda functions triggered by S3 uploads for real-time document vectorization and a chatbot interface for employees to query their benefits. The solution enables automated ingestion of plan documents from providers, uses elicitation to gather context like plan status and employer information, and provides personalized benefits recommendations by grounding responses in vectorized plan data stored in LanceDB, all while maintaining security through JWT tokens and AWS Cognito integration."
notion:
  pageId: "352f8dff-2538-8017-b0c5-daa5955edb8e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-30T13:13:00.000Z"
  lastEditedTime: "2026-04-30T13:13:00.000Z"
  publishedAt: "2026-04-30T13:16:36Z"
---

## Overview

Daisy Health is a late-seed stage startup based in San Diego operating in the healthcare benefits space. Their platform serves as a digital marketplace connecting brokers with employer clients, hosting approximately 50,000 employees with access to various healthcare options including telemedicine and generic prescriptions. A key value proposition is providing telemedicine and generic prescriptions for under $30 per month per employee, specifically targeting small and medium-sized businesses, tribal nations, and underserved communities that may lack traditional insurance coverage. Their entire platform is built as a SaaS and AI-powered web application that handles the full lifecycle from proposal creation through employee roster management, payment processing, and analytics.

The case study demonstrates a production LLM implementation centered around using Anthropic's Model Context Protocol (MCP) to solve real-world document management and information retrieval challenges in healthcare benefits administration. The technical implementation showcases both the architectural decisions and practical considerations involved in deploying an event-driven RAG system at scale.

## Problem Statement and Context

The fundamental challenge facing Daisy Health stemmed from the ubiquitous nature of PDF documents in the healthcare industry. Benefits plan documents, summary of benefits and coverage (SBC) documents, and other critical information were constantly being emailed or uploaded to their platform in an ad hoc manner. This process lacked proper versioning, and the team often wouldn't know when new documents arrived or when existing ones were updated. The manual nature of this workflow created several production challenges.

The existing RAG implementation required completely reindexing the entire vector store whenever a new document was received, which was operationally inefficient and created windows where the system was serving potentially outdated information. The process also placed significant burden on brokers and employers who had to manually submit documents, creating friction in the user experience. The team recognized that removing humans from this document submission process and instead integrating directly with healthcare providers would dramatically improve both operational efficiency and data freshness.

The vision was to enable providers to either push documents to REST endpoints or allow Daisy Health to pull documents from provider websites or other sources on a scheduled basis, all while maintaining real-time vectorization and enabling employees to have high-quality chatbot experiences grounded in current, accurate plan information.

## Technical Architecture and Infrastructure

The production system is built on a modern cloud-native stack centered around Node.js and NestJS for microservices and schedulers. The architecture leverages AWS heavily, with AWS Lambda providing the event-driven backbone, S3 serving as the source of truth for document storage, and AWS Bedrock hosting the LLM models (specifically Claude Sonnet 3.5 at the time of the presentation).

The vector database implementation uses LanceDB for storing embeddings, with AWS Titan serving as the embedding model for vectorization. Security is implemented through AWS Cognito for authentication, with JWT tokens passed through an API gateway to ensure that all MCP server calls are properly authenticated and authorized based on the logged-in user's context.

A critical architectural decision was the use of streaming HTTP rather than standard I/O for the MCP server communication. This choice was driven by the multi-user, web-application nature of the platform, where multiple users might be accessing the system simultaneously. Streaming HTTP enables low-latency communication with persistent connections and bidirectional data flow, which better suits their production requirements than the simpler standard I/O approach.

## MCP Integration and Implementation

The implementation of Model Context Protocol represents a notable production use case that extends beyond typical chatbot interactions. The team built their own MCP server using Anthropic's npm package, exposing it through their existing REST API infrastructure. This MCP server provides two primary tools: one for vectorizing plan data and another for searching the vectorized documents.

The document ingestion flow demonstrates an interesting architectural pattern where REST endpoints coexist with MCP. Providers or internal systems can POST documents to publicly accessible REST endpoints (with authentication), which then drop files into S3 buckets. AWS Lambda functions listen for S3 events and, when triggered, call the MCP server's vectorization tool. This tool receives the S3 key, plan ID, and MIME type, then handles parsing the PDF, generating embeddings with AWS Titan, and storing the vectorized data in LanceDB. The event-driven nature ensures that vectorization happens in real-time as documents arrive, eliminating the need for manual reindexing.

The search functionality integrates MCP with their chatbot interface, where employees can ask natural language questions about their benefits. The chatbot leverages MCP tools to search the vector store, but notably implements elicitation to gather additional context. The elicitation mechanism prompts for plan status and employer information, which allows the system to perform more targeted retrieval from the vector database rather than searching across all documents.

An important architectural nuance is that while the MCP inspector demonstration shows visible elicitation prompts, the production chatbot application can determine some of this information automatically by inspecting the authenticated user's session. The system knows which employer the employee works for and can infer plan status, passing this context to the MCP server without explicitly asking the user. This demonstrates how MCP elicitation can be both user-facing and system-driven depending on the available context.

## Production Chatbot Capabilities

The production chatbot demonstrates several sophisticated capabilities that showcase the practical value of grounding LLM responses in vectorized plan documents. Employees can ask questions like "Do you offer PPO or HMO medical plans?" and receive specific answers based on their employer's available options. The system retrieves relevant plan information from multiple providers and presents it clearly.

The chatbot supports comparative queries, such as requesting a side-by-side comparison of different plans in table format. The LLM generates structured tables comparing features like network restrictions, out-of-pocket expenses, and coverage details, all pulled from the SBC documents stored in the vector database. This demonstrates the system's ability to synthesize information across multiple documents and present it in user-friendly formats.

More advanced functionality includes detailed benefit inquiries where employees ask about specific coverage items, with the system extracting granular information from the plan documents. The most sophisticated capability is personalized plan recommendations, where employees can describe their health needs (chronic asthma, physical therapy, chiropractic care, etc.) and receive tailored recommendations. The LLM analyzes available plans and provides reasoned recommendations based on factors like upfront costs, specific coverage for mentioned needs, and family considerations.

## Operational Challenges and Lessons Learned

The team encountered several practical challenges when implementing MCP in production. One significant observation was around the modularity that MCP provides by separating prompts, tools, and resources. This decomposition enables more modular AI workflows, which aligns well with modern microservices architectures. However, this modularity comes with tradeoffs in terms of implementation complexity.

The choice of transport mechanism proved important. While standard I/O might work for single-user scenarios, the multi-tenant web application context required streaming HTTP. This decision impacted how they architected the MCP server integration with their existing REST infrastructure, essentially wrapping the MCP server with REST endpoints for certain flows.

A technical limitation encountered was the lack of rich argument support in the JSON-RPC protocol underlying MCP resources. This led the team to use tools for operations that might semantically be GET requests in traditional REST terms. The workaround was functional but highlighted some maturity gaps in the MCP ecosystem at the time of implementation.

The team also noted that the MCP libraries felt somewhat bulky and less mature compared to more established frameworks. Code that might be concise in other contexts required more boilerplate with current MCP implementations. However, they expressed optimism that as the standard matures and libraries evolve, this situation will improve.

## Security and Multi-Tenancy Considerations

Security implementation in this multi-tenant healthcare application is critical given the sensitive nature of benefits information. The system integrates MCP server calls with their existing authentication infrastructure by extracting JWT tokens from AWS Cognito and passing them through the API gateway. This ensures that all MCP operations are properly authenticated and authorized.

The architecture ensures that when an employee queries the chatbot, the system can determine which employer they work for and which plans they have access to, using this context to filter results appropriately. This context-aware filtering happens both at the application layer (determining which information to send to the MCP server) and potentially within the MCP server's search implementation itself, ensuring proper data isolation between different employers and their employees.

## Future Directions and Expansion Plans

The team identified several areas for expanding their MCP implementation based on initial success. Elicitation is seen as particularly promising for other workflows beyond benefits queries. One specific use case mentioned is proposal building, which involves significant back-and-forth interaction with users to gather requirements. Using MCP elicitation for this conversational flow could streamline the proposal creation process.

Human-in-the-loop validation represents another planned enhancement. When the LLM returns low-confidence responses, the system could trigger real-time alerts to human reviewers who can validate the response before it reaches the end user. This would add a quality control layer for edge cases or ambiguous queries.

Semantic search improvements are planned to enable more sophisticated filtering capabilities. For example, allowing users to filter results by specific attributes like copay amounts or particular benefit types (dental, vision, telemedicine) would enable more precise information retrieval. This would likely involve extending the MCP tools to accept additional filter parameters.

Client-side expansion is also being considered. Rather than only embedding the chatbot in their own web application, the team is exploring whether to make their capabilities available through third-party MCP clients. This could include integration with ChatGPT as a tool or building MCP integrations for workplace collaboration platforms like Slack and Microsoft Teams, where many of their users already spend significant time.

## Critical Assessment and Balanced Perspective

The case study presents a legitimate production use case for MCP, but several aspects warrant balanced consideration. The decision to use MCP for the document ingestion flow (Lambda calling MCP server for vectorization) is architecturally interesting but may not provide clear advantages over a more direct Lambda-to-database approach. The team acknowledged this was partly driven by demonstration purposes and the desire to showcase multiple MCP tools, which is honest but suggests some aspects may be overengineered for the specific problem.

The modularity benefits of MCP are real in terms of creating reusable building blocks, but the tradeoff is additional abstraction layers and potential performance overhead. Whether this tradeoff is worthwhile depends on how much reuse actually occurs across different parts of their system or future integrations.

The elicitation feature is genuinely useful for gathering context, but the implementation shows that much of the contextual information can be derived from user session data without explicit prompting. This suggests that while elicitation is valuable for truly unknown information, traditional session management and application context might handle many use cases more efficiently.

The system's value is clearly demonstrated in the employee chatbot experience, where grounding LLM responses in specific plan documents provides concrete utility. The ability to compare plans, extract specific coverage details, and provide personalized recommendations represents genuine value-add functionality that would be difficult to achieve without LLM capabilities. However, the accuracy and reliability of these recommendations in production at scale remain questions that would need ongoing monitoring and validation.

The technical stack choices (NestJS, AWS Bedrock, LanceDB) appear reasonable for a startup environment, providing good developer experience and managed services. The event-driven architecture properly addresses the original problem of manual reindexing, though the complexity of managing Lambda functions, S3 events, and MCP server coordination introduces operational overhead that must be carefully managed.

Overall, the case study demonstrates a thoughtful implementation of LLMOps principles in a healthcare context, with clear attention to security, multi-tenancy, and user experience, while also honestly acknowledging the learning curve and maturity challenges associated with newer technologies like MCP.
