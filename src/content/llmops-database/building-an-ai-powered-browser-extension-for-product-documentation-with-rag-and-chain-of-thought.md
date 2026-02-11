---
title: "Building an AI-Powered Browser Extension for Product Documentation with RAG and Chain-of-Thought"
slug: "building-an-ai-powered-browser-extension-for-product-documentation-with-rag-and-chain-of-thought"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ad7524e470ee001a88c33"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:12:19.179Z"
  createdOn: "2025-12-23T17:54:26.461Z"
llmopsTags:
  - "document-processing"
  - "content-moderation"
  - "classification"
  - "poc"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "latency-optimization"
  - "cost-optimization"
  - "few-shot"
  - "pinecone"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "openai"
  - "anthropic"
  - "google-gcp"
industryTags: "education"
company: "Reforge"
summary: "Reforge developed a browser extension to help product professionals draft and improve documents like PRDs by integrating expert knowledge directly into their workflow. The team evolved from simple RAG (Retrieve and Generate) to a sophisticated Chain-of-Thought approach that classifies document types, generates tailored suggestions, and filters content based on context. Operating with a lean team of 2-3 people, they built the extension through rapid prototyping and iterative development, integrating into popular tools like Google Docs, Notion, and Confluence. The extension uses OpenAI models with Pinecone for vector storage, emphasizing privacy by not storing user data, and leverages innovative testing approaches like analyzing course recommendation distributions and reference counts to optimize model performance without accessing user content."
link: "https://www.reforge.com/blog/howwebuiltit"
year: 2024
seo:
  title: "Reforge: Building an AI-Powered Browser Extension for Product Documentation with RAG and Chain-of-Thought - ZenML LLMOps Database"
  description: "Reforge developed a browser extension to help product professionals draft and improve documents like PRDs by integrating expert knowledge directly into their workflow. The team evolved from simple RAG (Retrieve and Generate) to a sophisticated Chain-of-Thought approach that classifies document types, generates tailored suggestions, and filters content based on context. Operating with a lean team of 2-3 people, they built the extension through rapid prototyping and iterative development, integrating into popular tools like Google Docs, Notion, and Confluence. The extension uses OpenAI models with Pinecone for vector storage, emphasizing privacy by not storing user data, and leverages innovative testing approaches like analyzing course recommendation distributions and reference counts to optimize model performance without accessing user content."
  canonical: "https://www.zenml.io/llmops-database/building-an-ai-powered-browser-extension-for-product-documentation-with-rag-and-chain-of-thought"
  ogTitle: "Reforge: Building an AI-Powered Browser Extension for Product Documentation with RAG and Chain-of-Thought - ZenML LLMOps Database"
  ogDescription: "Reforge developed a browser extension to help product professionals draft and improve documents like PRDs by integrating expert knowledge directly into their workflow. The team evolved from simple RAG (Retrieve and Generate) to a sophisticated Chain-of-Thought approach that classifies document types, generates tailored suggestions, and filters content based on context. Operating with a lean team of 2-3 people, they built the extension through rapid prototyping and iterative development, integrating into popular tools like Google Docs, Notion, and Confluence. The extension uses OpenAI models with Pinecone for vector storage, emphasizing privacy by not storing user data, and leverages innovative testing approaches like analyzing course recommendation distributions and reference counts to optimize model performance without accessing user content."
---

## Overview and Business Context

Reforge, an education company focused on product management and growth, built an AI-powered browser extension to solve a persistent customer challenge: while users valued their educational courses, they struggled to apply the extensive content to their everyday work. The company had previously launched "Reforge Artifacts" to showcase real work from industry leaders, but feedback indicated that users still found it difficult to integrate this knowledge into their daily workflows. The extension represents a strategic shift toward embedded, contextual assistance that meets users where they work rather than requiring them to access a separate platform.

The development was led by Dan Wolchonok, VP of New Products at Reforge, with an initially small team of two people that eventually grew to three with the addition of engineer Eddie Johnston. The case study is particularly interesting from an LLMOps perspective because it demonstrates how a lean team can iteratively build and deploy a production AI system while navigating real-world constraints around privacy, cost, and quality.

## Product Functionality and Value Proposition

The Reforge extension integrates into popular workplace tools including Google Docs, Notion, Confluence, and Coda. When users are drafting documents, they can click the Reforge logo to open a side panel that provides three core capabilities: drafting documents using frameworks from Reforge experts, providing feedback on existing documents based on expert content, and showing examples of how experts have created similar documents. The extension particularly focuses on Product Requirements Documents (PRDs), aligning them with Reforge's 4D roadmapping process which emphasizes strategy, vision, customer focus, and business impact.

A critical differentiator from general-purpose tools like ChatGPT is that the extension grounds its suggestions exclusively in vetted Reforge material from industry leaders and reputable companies. This constraint actually becomes a feature, as it increases trust and domain authority compared to general LLMs that might hallucinate or provide generic advice. The extension also includes specific Reforge references in responses, which drives trust and allows users to verify suggestions against source material.

## Iterative Development Approach and Roadmap

The development followed a deliberately incremental approach, breaking down the roadmap into small, achievable steps given resource constraints. The team started with a basic version that displayed relevant artifacts based on browsing history, examining visited domains over 7 or 28 days to understand which tools people used. This initial version featured a side panel offering artifacts tailored to page content, but testing revealed it needed to provide more direct value.

The next iteration involved creating an internal Retool dashboard where users could input document content and receive related artifacts. Importantly, the team used an LLM to generate the structure of both the user's document and retrieved artifacts, then compared these structures to identify potential improvements. This focus on rapid prototyping prioritized functionality over polish, allowing quick validation of concepts.

Following this, the team embedded their existing in-app chat feature via iframe, allowing users to input prompts and receive suggestions. While "janky," this approach served as a simulation of a custom chat interface without the investment of building one from scratch. This experimentation revealed that the product could be more than just an accessory to the Artifacts product, but rather a standalone productivity tool. Only after this validation did the team fork the chat feature's backend and frontend components and begin building a more sophisticated production version.

The MVP roadmap included forking Reforge chat components (front and backend), implementing authentication with Reforge accounts, establishing proper development tooling, Google Docs integration, personalization based on user identity, and onboarding flows. This methodical progression from concept validation to production implementation exemplifies effective LLMOps practice for resource-constrained teams.

## Technical Architecture: From Simple RAG to Chain-of-Thought

The initial architecture employed a straightforward RAG (Retrieve and Generate) approach. When a user clicked "Help Me Improve My Document," JavaScript retrieved the document contents and sent them to the Reforge backend along with the type of help requested. The system generated embeddings for both the user's document and their prompt, then performed similarity search to find relevant Reforge material across artifacts, guides, and lessons. Relevant documents and associated metadata were retrieved and sent to the LLM along with a system prompt to generate suggestions, which were then streamed back to the extension for real-time interaction.

However, this simple RAG approach produced inconsistent outputs and lacked reliability. The critical limitation was that suggestions varied wildly depending on document type—a job description requires fundamentally different advice than a PRD—yet the system couldn't accurately distinguish between document types. Beta testers reported receiving suggestions for improving job descriptions while working on PRDs and vice versa, highlighting a fundamental classification problem.

The team's breakthrough came with implementing a Chain-of-Thought approach that explicitly added document classification as a distinct processing step. This architectural shift allowed the system to direct the LLM along specific paths, asking targeted questions like "What would an expert suggest for this type of document?" or "How would an expert evaluate this kind of document?" The new flow generates three different suggestions for each document, runs embeddings on both the suggestions and document content, then filters content to match both the document type and suggestion type. For example, if the document concerned marketing technology, the system sourced material specifically from Reforge's marketing programs to ensure alignment with domain expectations.

This sophisticated RAG implementation represents a significant evolution in system design. Rather than simple similarity search, the system performs parallel processing where the LLM produces suggestions given more specific Reforge content and targeted questions, then collects all suggestions and streams all three back to the extension. This approach balances depth of analysis with reasonable latency for interactive use.

## Technology Stack and Tool Selection

The production system uses OpenAI for both LLM inference and embeddings generation, with Pinecone serving as the vector database for storing embeddings. For prompt management and storage, the team uses LaunchDarkly and Adaline, with Segment handling analytics instrumentation. The testing infrastructure relies on Adaline, which serves dual purposes of prompt storage and logging for experimentation and evaluation of LLM outputs.

For broader data infrastructure, the team uses Snowflake as their data warehouse, with MetaBase for business intelligence, Segment for data collection, and Amplitude for analytics. This combination provides comprehensive visibility into how users interact with the extension while respecting privacy constraints.

The choice to build as a Chrome extension rather than a standalone application was deliberate and strategic. Extensions are faster to develop, integrate directly into tools people already use, and have potential to run fully locally as AI models improve—a consideration for privacy-conscious users. The team specifically mentions excitement about Chrome's plans to ship LLMs locally in the browser, which would eliminate the need for data to travel to the cloud.

## Privacy-First Architecture and Testing Challenges

A foundational architectural decision was to not store any user or company data. The system doesn't store document contents, generated suggestions, user messages, or LLM responses. Data is used only transiently for the purpose of sending requests to the LLM and receiving responses. Agreements with LLM providers stipulate that they neither store data submitted through the API nor train models on it, creating end-to-end privacy guarantees.

While admirable from a privacy perspective, this decision creates significant challenges for traditional LLMOps practices that rely on logging, monitoring, and continuous improvement based on production data. The team developed creative approaches to testing and optimization using the limited data they do store, demonstrating innovative LLMOps practices under constraints.

One approach leverages the distribution of course recommendations as a proxy for model intelligence. Initially, the extension disproportionately recommended the "Scaling and Product Delivery" course, which seemed unlikely to be relevant to every use case. After switching to the more sophisticated RAG system, the distribution shifted toward "Mastering Product Management" and "Product Management Foundations," which better aligned with common document types like PRDs. Further investigation revealed a bug where not all Reforge program content was stored in Pinecone, preventing the extension from searching the full corpus. Fixing this bug resulted in a much more diverse distribution of course recommendations across many programs, serving as a measurable signal of improved relevance without accessing user content.

Another metric tracks the frequency of Reforge material references in suggestions. Before implementing major improvements, the majority of responses likely contained zero references. After tracking began, less than 50% of responses contained no references, and version 4.0 showed significant increases in reference counts. While more references generally indicate better grounding in source material, the team recognizes the need for balance—receiving 11 references might be excessive and hurt usability. This metric provides visibility into whether changes to models or providers impact a key value driver (domain-grounded suggestions) without requiring access to actual user documents.

For internal team members, the team uses Adaline to store prompts and send logs, enabling experimentation and evaluation of LLM outputs. This provides better visibility into what's being sent to the LLM and its responses, but only works for the team itself, not production users. This creates a testing environment that approximates but doesn't fully replicate production conditions.

## Key Tradeoffs: Latency, Cost, and Quality

The team explicitly identifies three critical dimensions for AI product management: latency, cost, and quality. These factors are intrinsically linked and require constant balancing based on product requirements and business constraints.

Latency encompasses both overall response time and time-to-first-token. Faster responses enhance user experience, but achieving low latency might require using smaller, less capable models or limiting the depth of retrieval and analysis. The streaming response architecture represents one approach to managing perceived latency—users see results appearing in real-time rather than waiting for complete generation.

Cost management is particularly important given the need to support both free and paid users without burning through resources faster than revenue generation. The team models worst-case cost per user and multiplies by edge-case user counts to understand risk exposure. Starting from scratch provided the advantage of building value before facing legacy cost structures. The team maintains flexibility to switch between OpenAI's 4o, Gemini Pro 1.5, and Anthropic's best models based on output quality and cost considerations, creating test datasets of inputs and evaluating outputs across providers. This provider-agnostic approach is good LLMOps practice, avoiding lock-in and enabling optimization as the market evolves.

Quality encompasses accuracy, relevance, and usefulness of suggestions. The sophisticated RAG approach with document classification significantly improved quality by providing appropriate context for different document types. However, quality improvements often come at the expense of latency (more processing steps) and cost (more expensive models or more tokens processed). The team's approach to balancing these dimensions involves continuous measurement of proxy metrics and willingness to iterate based on observed performance.

## Evaluation and Continuous Improvement

Without access to production user data, traditional A/B testing and detailed performance analysis becomes impossible. The team's evaluation strategy instead relies on indirect signals and limited internal testing. The Adaline tool provides one mechanism for internal evaluation, allowing the team to experiment with different prompts and compare outputs systematically, though only for team members.

The course recommendation distribution and reference count metrics serve as business-level indicators of model performance. Changes in these distributions following system updates provide signals about whether improvements are working as intended. However, these are relatively coarse-grained measures that don't capture nuances of suggestion quality or usefulness.

The team also mentions user feedback loops as part of their development process, though the case study doesn't detail specific mechanisms for collecting structured feedback. Beta tester feedback about receiving inappropriate suggestions for document types directly led to the document classification enhancement, showing the value of qualitative feedback even without quantitative logging.

An interesting aspect of their evaluation approach is the focus on "limiting suggestions to material on Reforge" as a quality constraint rather than limitation. Unlike ChatGPT which generates the next most likely token from general training, the Reforge extension aims to keep suggestions grounded in vetted expert material. This constraint becomes measurable through reference counts and serves as a differentiator in the market.

## Chunking, Ranking, and Vector Database Strategies

The team acknowledges they haven't yet employed highly sophisticated chunking and ranking strategies in their vector database implementation. Documents are split into manageable chunks using basic approaches, with standard ranking algorithms for similarity search. They explicitly identify this as an area for improvement in coming months, suggesting current performance is adequate but not optimized.

This represents a pragmatic approach to LLMOps: ship something that works reasonably well, then optimize based on observed limitations rather than over-engineering upfront. The team's willingness to acknowledge areas for improvement without compromising the overall product demonstrates mature engineering judgment.

The discovery of the bug where not all Reforge program content was stored in Pinecone highlights the importance of data quality in RAG systems. The vector database is only as good as the content it contains, and comprehensive coverage of source material proved critical for generating diverse, relevant recommendations.

## Lessons and Insights on AI Product Development

A key theme throughout the case study is that "AI is a tool, not a strategy." The team emphasizes starting with a clear understanding of core customer problems rather than looking for ways to apply AI. Their journey from simple artifact display to sophisticated document assistance demonstrates how breaking down the roadmap into achievable goals can build toward significant capabilities while maintaining focus on user value.

The rapid prototyping approach using tools like Retool and iframe embeddings before committing to custom development exemplifies lean product development adapted for AI. These techniques allowed validation of concepts with minimal investment, reducing risk of building sophisticated systems that don't solve real problems.

The team's advice for aspiring AI product managers emphasizes understanding key variables (latency, cost, quality) and their interrelationships. Technical background helps navigate complexities, but the fundamental skill is understanding how these variables affect product decisions and user experience. The recommendation to "start building" reflects a learn-by-doing philosophy appropriate for a rapidly evolving field.

## Future Roadmap and Evolution

Planned improvements include further optimizations to make responses smarter, integrations into Miro and Jira where significant percentages of the customer base works, and more seamless in-text suggestions similar to Grammarly's spell-check functions. The team also expresses interest in developing a knowledge graph and expert graph to focus on the right level of granularity—recognizing that the appropriate PRD structure varies depending on whether someone works in FinTech, B2B, consumer social at a large company, or a small company.

This knowledge graph vision represents a more ambitious approach to context management, moving beyond simple similarity search to understanding relationships between concepts, document types, company contexts, and expert knowledge. Such an approach could significantly improve relevance but would require substantial investment in data modeling and system design.

The aspiration to leverage local browser LLMs as they become more capable reflects strategic thinking about privacy, cost, and performance. Running models locally would eliminate data transmission concerns, reduce API costs, and potentially improve latency, though current local model capabilities may not yet match cloud-based alternatives in quality.

## Critical Assessment and Balanced Perspective

While the case study provides valuable technical insights, it should be noted that this is fundamentally a promotional piece from Reforge about their own product. Claims about effectiveness and user value should be interpreted in that context. The emphasis on differentiating from ChatGPT through domain grounding is valid, but the actual quality difference depends on the breadth and quality of Reforge's content library and how well the retrieval system matches user needs to available content.

The privacy-first architecture, while admirable, creates real limitations for optimization and debugging. Traditional LLMOps practices rely heavily on logging, monitoring, and analyzing production behavior to identify issues and opportunities for improvement. The workarounds using distribution metrics are clever but provide much less granular insight than full logging would enable. This represents a genuine tradeoff between privacy and operational excellence that organizations must navigate based on their values and requirements.

The team's acknowledgment that chunking and ranking strategies aren't yet sophisticated suggests the system has room for improvement in retrieval quality. Simple chunking approaches often result in splitting content at arbitrary boundaries rather than semantic boundaries, which can degrade retrieval relevance. The effectiveness of the current system may be partially due to the relatively constrained domain (product management documentation) rather than sophisticated technical approaches.

The reliance on streaming responses to manage perceived latency is effective UX design but doesn't fundamentally address latency if users need to wait for complete responses before acting on suggestions. The three-suggestion approach likely increases total latency compared to single suggestions, though parallel processing may mitigate this.

From a business perspective, the resource constraints (2-3 person team) drove many architectural decisions. While the team frames this positively as enabling focus and rapid iteration, it also means less investment in sophisticated approaches that might significantly improve quality. The choice to build a Chrome extension rather than native applications, while strategically sound, limits the user experience compared to deeply integrated native tools.

Overall, the case study demonstrates competent execution of LLMOps practices for a specific use case with clear constraints. The iterative development approach, attention to key performance dimensions, and creative solutions to testing challenges under privacy constraints provide valuable lessons for teams building similar systems. However, readers should maintain critical perspective on claims and recognize that the ultimate measure of success—whether the extension actually improves user productivity and satisfaction—isn't deeply explored in this promotional content.