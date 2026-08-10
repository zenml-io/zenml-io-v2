---
title: "Scaling Generative AI in Large Industrial Enterprise Through Platform Architecture"
slug: "scaling-generative-ai-in-large-industrial-enterprise-through-platform-architecture"
draft: false
llmopsTags:
  - "chatbot"
  - "document-processing"
  - "data-analysis"
  - "poc"
  - "rag"
  - "embeddings"
  - "reranking"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "langchain"
  - "llama-index"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "fastapi"
  - "microservices"
  - "api-gateway"
  - "documentation"
  - "orchestration"
  - "open-source"
  - "microsoft-azure"
  - "databricks"
industryTags: "energy"
company: "OMV"
summary: "OMV, Austria's largest industrial company operating across chemicals, fuels, and plastics sectors, faced the challenge of scaling generative AI across highly heterogeneous business divisions with 140+ use case demands from business units. The company implemented a federated platform approach centered on a central AI platform team that develops reusable building blocks and reference architectures, which multiple product development teams then assemble into AI products. This resulted in 40+ proof-of-concepts and delivery projects, 15 live generative AI use cases, and 11 generative AI products unified through a single web portal called the AI Hub, enabling the organization to scale AI capabilities without requiring hundreds of developers while maintaining consistency and operational efficiency across diverse business models ranging from geological engineering to retail operations."
link: "https://www.youtube.com/watch?v=c8KP7I7x6f8"
year: 2026
seo:
  title: "OMV: Scaling Generative AI in Large Industrial Enterprise Through Platform Architecture - ZenML LLMOps Database"
  description: "OMV, Austria's largest industrial company operating across chemicals, fuels, and plastics sectors, faced the challenge of scaling generative AI across highly heterogeneous business divisions with 140+ use case demands from business units. The company implemented a federated platform approach centered on a central AI platform team that develops reusable building blocks and reference architectures, which multiple product development teams then assemble into AI products. This resulted in 40+ proof-of-concepts and delivery projects, 15 live generative AI use cases, and 11 generative AI products unified through a single web portal called the AI Hub, enabling the organization to scale AI capabilities without requiring hundreds of developers while maintaining consistency and operational efficiency across diverse business models ranging from geological engineering to retail operations."
  canonical: "https://www.zenml.io/llmops-database/scaling-generative-ai-in-large-industrial-enterprise-through-platform-architecture"
  ogTitle: "OMV: Scaling Generative AI in Large Industrial Enterprise Through Platform Architecture - ZenML LLMOps Database"
  ogDescription: "OMV, Austria's largest industrial company operating across chemicals, fuels, and plastics sectors, faced the challenge of scaling generative AI across highly heterogeneous business divisions with 140+ use case demands from business units. The company implemented a federated platform approach centered on a central AI platform team that develops reusable building blocks and reference architectures, which multiple product development teams then assemble into AI products. This resulted in 40+ proof-of-concepts and delivery projects, 15 live generative AI use cases, and 11 generative AI products unified through a single web portal called the AI Hub, enabling the organization to scale AI capabilities without requiring hundreds of developers while maintaining consistency and operational efficiency across diverse business models ranging from geological engineering to retail operations."
notion:
  pageId: "3b8f8dff-2538-8003-b155-de4a129136a0"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-10T15:16:00.000Z"
  lastEditedTime: "2026-08-10T15:16:00.000Z"
  publishedAt: "2026-08-10T15:32:18Z"
---

## Overview

OMV is Austria's largest industrial company, operating as an integrated chemicals, fuels, and plastics enterprise with global operations. What makes OMV particularly interesting from an LLMOps perspective is the extreme heterogeneity of its business model, spanning four very different business divisions: heavy industry, complex geological engineering, chemical science, market trading, and a full-fledged retail chain including fuel stations. None of these business models are inherently digital, yet all require sophisticated digital platforms to operate effectively.

The organization faced a significant scaling challenge with generative AI adoption. Business units generated 140+ demands for generative AI solutions, requiring the IT organization to find a sustainable way to deliver value without requiring massive developer headcount. The case study presents a comprehensive platform-based approach to LLMOps that enabled the organization to support 40+ proof-of-concepts and delivery projects, deploy 15 live generative AI use cases, and create 11 generative AI products serving multiple use cases simultaneously.

## The Platform Architecture Philosophy

The core philosophy driving OMV's LLMOps approach centers on identifying reoccurring patterns across use cases and building reusable components rather than creating bespoke solutions for each demand. The enterprise architect responsible for the initiative describes a process that starts with analyzing incoming use cases from business units to identify common needs. When multiple use cases require similar capabilities, such as analyzing tabular Excel-style data, the platform team develops a single product or building block that can serve all those use cases simultaneously. This pattern-based approach forms the foundation of their ability to scale.

The organizational structure implements a federated model where multiple AI product development teams are supported by one central platform team. The central platform team focuses on creating building blocks that development teams can then assemble into complete AI products, eliminating the need to build solutions from scratch each time. This separation of concerns allows the platform team to focus on reusable infrastructure while product teams focus on delivering business value through specific applications.

## Demand Management and Governance

A critical component of the LLMOps system is the central funnel where all 140+ business demands are managed. This centralized backlog enables the organization to evaluate each potential use case across multiple dimensions: business impact, data quality, feasibility, and existence of a viable business case. This governance layer ensures that development resources are allocated to use cases with genuine potential rather than pursuing every request indiscriminately.

The platform team plays a decisive role in determining which use cases to implement and which development team should execute the work. This centralized decision-making process prevents duplication of effort and ensures alignment with strategic priorities. The governance structure also addresses the critical question of build-versus-buy decisions, particularly regarding whether to invest in developing new building blocks internally or wait for strategic partners like Microsoft or Google to release relevant capabilities.

## Building Blocks as the Core Abstraction

The building block concept represents the central technical abstraction in OMV's LLMOps architecture. Building blocks are reusable components that handle specific capabilities needed across multiple AI products. The platform team has developed an extensive library of these building blocks that cover various aspects of generative AI applications.

Key building blocks include the AI Hub itself, which serves as the web portal for accessing all AI products. The Core Library handles communication with large language models, embedding models, and rerankers, abstracting away the complexity of interacting with different AI services. The Core Bot Template provides conversation handling, dialogue management, and conversation history capabilities that any chatbot application can leverage, preventing each product team from reimplementing these common features.

Content extraction building blocks handle the complexity of extracting text and information from various file formats including PDFs and PowerPoint presentations, with support for image descriptions. The AI Indexer building block manages the process of indexing content into vector databases, another common need across multiple applications. Web scrapers provide data acquisition capabilities. All of these building blocks are designed to be composable, allowing product teams to select and combine the components needed for their specific use case.

The lifecycle management of these building blocks presents significant operational challenges. Since individual building blocks are used across many AI products, updating a building block requires careful orchestration to roll out new versions to all dependent products. This creates a dependency management challenge typical of platform engineering but amplified by the rapid evolution of generative AI technologies.

## Reference Architectures and Standardization

Beyond building blocks, the platform team maintains reference architectures that serve as templates for how AI solutions should be structured. For example, if a team needs to deploy a chatbot with agentic tool calling capabilities on their cloud platform, a specific reference architecture dictates exactly how that solution should look. This standardization provides multiple benefits: it makes solutions easier to operate since operations teams encounter consistent architectures, it enables automation of solution instantiation, and it reduces the cognitive load on product development teams who don't need to make architectural decisions from first principles.

The reference architectures are published centrally along with comprehensive documentation, learning paths, and design guidelines. This knowledge repository enables both internal teams and external development partners to understand how to build AI products that conform to organizational standards. The emphasis on documentation and standardization reflects a mature approach to LLMOps that recognizes that technical capabilities alone are insufficient without the organizational knowledge to use them effectively.

## The AI Hub as a Unified Interface

The AI Hub represents the user-facing manifestation of the platform architecture. Rather than having AI capabilities scattered across various tools and interfaces, which the organization found created confusion among employees, the AI Hub provides a single access point for all generative AI products. This web application serves as both a product catalog and an access control mechanism.

Through the AI Hub, employees can access various AI products including an internal GPT version with access to company data, specialized assistants for tasks like translation and tabular data analysis, courses, a prompt library, documentation, and guiding principles. The centralization addresses a real organizational challenge where proliferation of AI tools across different platforms made it impossible to maintain oversight and created friction for end users trying to understand what capabilities were available.

The AI Hub architecture implements a gateway pattern where the hub backend receives browser requests and forwards them to the actual AI products, which may be deployed on different infrastructure. This architectural separation allows product teams to maintain governance over their specific product infrastructure while the platform team maintains the unified interface and routing layer. The hub supports multiple deployment models including custom chatbots running on Microsoft Azure, low-code solutions from Microsoft Copilot Studio, UiPath, and Databricks AI, and non-chatbot assistants with form-based interfaces.

A notable technical detail is that all AI products expose APIs, making them programmatically accessible. The architecture has been extended to support the Model Context Protocol, enabling products to be accessed through automated flows beyond just human-facing web interfaces. A mobile app extends the AI Hub experience beyond desktop browsers, recognizing that many industrial workers may need AI assistance in field settings.

## Technology Stack and Cloud Infrastructure

The technology stack builds primarily on the Microsoft Azure ecosystem, leveraging Azure Foundry services. The core technologies include large language models, embedding models for semantic search and retrieval, vector databases for storing and querying embeddings, rerankers for improving retrieval quality, document intelligence services, OCR capabilities, and various content extraction services.

The Microsoft-centric approach reflects a strategic decision to align with a primary cloud provider, though the architecture appears flexible enough to accommodate other platforms where needed. Product development teams operate their own infrastructure for their specific products on the right side of the architecture, while the platform team manages the central AI Hub and building blocks.

Low-code platforms play a significant role in the ecosystem, with Microsoft Copilot Studio, UiPath, and Databricks AI all represented as viable options for certain use cases. This pragmatic approach recognizes that not all AI products require custom development and that low-code platforms can accelerate delivery for appropriate use cases, as long as they can be integrated into the unified AI Hub interface.

## Organizational Model and Scaling

The organizational model deserves careful examination as it represents the human side of the LLMOps strategy. The central platform team remains relatively small but plays a critical role in enabling scale. Rather than hiring 100 or 200 AI developers, the organization invests in a focused platform team that multiplies the effectiveness of multiple product development teams.

Product development teams are often staffed by external developers, a detail that highlights the importance of the platform's documentation, reference architectures, and building blocks. External teams can be productive because they inherit standardized patterns and reusable components rather than starting from blank slates. The platform team provides onboarding for these external teams and maintains a feedback loop where product teams can request adaptations to existing building blocks or entirely new building blocks based on their needs.

The community of practice represents another important organizational element. This forum brings together interested users and AI engineers to communicate, exchange experiences, and share ideas. While the presentation doesn't elaborate extensively on the community of practice, its inclusion signals recognition that successful LLMOps requires not just technical infrastructure but also mechanisms for knowledge sharing and collaboration across organizational boundaries.

## Quality Foundations: Data Platform

The entire AI platform architecture rests on a stable data platform with well-defined data products. Each data product has an assigned owner who guarantees data quality, recognizing that AI solutions are fundamentally dependent on high-quality data inputs. This data governance layer addresses one of the most common failure modes in enterprise AI initiatives where poor data quality undermines otherwise well-engineered AI solutions.

The emphasis on data products as a foundation reflects a mature data engineering practice that predates the generative AI push. Rather than treating data preparation as an afterthought, the architecture explicitly positions the data platform as the base layer upon which building blocks and AI products are constructed. This architectural decision means that product teams can rely on curated, quality-assured data rather than each team independently solving data acquisition and quality challenges.

## Operational Challenges and Lessons Learned

The presentation candidly acknowledges several significant operational challenges. Identifying appropriate building blocks from the stream of business demands requires architectural judgment and pattern recognition. With 150+ demands to evaluate, maintaining oversight and identifying recurring patterns represents a substantial cognitive challenge that cannot be easily automated.

The build-versus-buy decision for building blocks requires ongoing attention. Should the organization invest in developing a custom AI web scraper, or is there a commercial or open-source alternative coming from strategic partners? These decisions have long-term implications for maintenance burden and architectural flexibility, and making them wisely requires both technical insight and awareness of the broader ecosystem roadmap.

Lifecycle management of building blocks presents another challenge category. As building blocks evolve, new versions must be rolled out to potentially dozens of dependent AI products. This creates a version management challenge that requires careful coordination and potentially sophisticated dependency tracking. The presentation doesn't detail the specific tooling or processes used for this lifecycle management, suggesting this remains an area of ongoing operational refinement.

Managing external development teams adds another layer of complexity. These teams must be onboarded to the platform, taught to use building blocks correctly, guided to follow reference architectures, and integrated into feedback loops. The quality and consistency of AI products developed by external teams depends heavily on how well the platform team has documented patterns and how effectively they can transfer knowledge.

## Key Takeaways and Critical Assessment

The presenter offers several key takeaways that reflect hard-won lessons from scaling generative AI in a large enterprise. The self-service platform approach enables scaling without massive developer headcount, a claim that appears supported by the metrics presented. Creating reference architectures for recurring patterns ensures homogeneity across solutions, which pays dividends in operational efficiency. Building reusable building blocks prevents duplication of effort, though this requires careful evaluation of when to invest in new building blocks. The central platform team is identified as the key role enabling scale, a conclusion that aligns with the overall architecture.

From a critical perspective, several aspects of this case study warrant balanced assessment. The approach is clearly well-suited to large enterprises with heterogeneous business models and high demand for AI capabilities. The emphasis on standardization and reusability makes sense in this context. However, the presentation does not deeply explore potential downsides of this centralized platform approach, such as whether standardization might limit innovation at the edges or whether the central platform team could become a bottleneck for novel use cases that don't fit existing patterns.

The building block abstraction is powerful but requires significant upfront investment and ongoing maintenance. Organizations considering this approach must be prepared for the architectural work of identifying patterns and the engineering work of creating truly reusable components. The presentation suggests this investment pays off, but the timeline to achieve return on investment is not discussed.

The reliance on Microsoft Azure and associated services creates both benefits and risks. The tight integration with Azure Foundry services likely accelerates development and provides enterprise-grade capabilities, but it also creates vendor lock-in that might limit flexibility in the future. The architecture's support for multiple low-code platforms suggests some awareness of avoiding over-dependence on any single tool, though the overall Microsoft centricity is clear.

The governance model with centralized demand evaluation and prioritization is essential for preventing chaos but requires strong organizational buy-in. Business units must accept that not all 140+ demands will be implemented immediately and that central prioritization serves the organization's overall interests. The presentation doesn't address how conflicts are resolved when business units disagree with prioritization decisions.

The AI Hub as a single access point addresses a real user experience problem and provides a clear governance boundary. However, it also creates a single point of failure and could become a constraint if the hub architecture cannot evolve as quickly as the underlying AI products need to. The API-first approach and MCP support suggest awareness of these risks and an effort to maintain flexibility.

Overall, this case study presents a thoughtful and mature approach to LLMOps in a large industrial enterprise. The emphasis on reusable building blocks, reference architectures, and federated development teams reflects solid platform engineering principles adapted to the specific challenges of generative AI. The organization has clearly moved beyond ad-hoc AI experiments to a systematic approach capable of supporting dozens of use cases in production. The candid acknowledgment of ongoing challenges around lifecycle management, pattern identification, and external team coordination adds credibility to the narrative and provides valuable insights for others pursuing similar initiatives.
