---
title: "Scaling Custom AI Application Development Through Modular LLM Framework"
slug: "scaling-custom-ai-application-development-through-modular-llm-framework"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68ac083abc8b483e98f1eae6"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:19:33.081Z"
  createdOn: "2025-08-25T06:52:42.269Z"
llmopsTags:
  - "document-processing"
  - "classification"
  - "structured-output"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "rag"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "few-shot"
  - "chunking"
  - "evals"
  - "multi-agent-systems"
  - "kubernetes"
  - "cicd"
  - "scaling"
  - "orchestration"
  - "continuous-deployment"
  - "microservices"
  - "devops"
  - "monitoring"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "cache"
  - "openai"
industryTags: "finance"
company: "BlackRock"
summary: "BlackRock developed an internal framework to accelerate AI application development for investment operations, reducing development time from 3-8 months to a couple of days. The solution addresses challenges in document extraction, workflow automation, Q&A systems, and agentic systems by providing a modular sandbox environment for domain experts to iterate on prompt engineering and LLM strategies, coupled with an app factory for automated deployment. The framework emphasizes human-in-the-loop processes for compliance in regulated financial environments and enables rapid prototyping through configurable extraction templates, document management, and low-code transformation workflows."
link: "https://www.youtube.com/watch?v=08mH36_NVos"
year: 2025
seo:
  title: "BlackRock: Scaling Custom AI Application Development Through Modular LLM Framework - ZenML LLMOps Database"
  description: "BlackRock developed an internal framework to accelerate AI application development for investment operations, reducing development time from 3-8 months to a couple of days. The solution addresses challenges in document extraction, workflow automation, Q&A systems, and agentic systems by providing a modular sandbox environment for domain experts to iterate on prompt engineering and LLM strategies, coupled with an app factory for automated deployment. The framework emphasizes human-in-the-loop processes for compliance in regulated financial environments and enables rapid prototyping through configurable extraction templates, document management, and low-code transformation workflows."
  canonical: "https://www.zenml.io/llmops-database/scaling-custom-ai-application-development-through-modular-llm-framework"
  ogTitle: "BlackRock: Scaling Custom AI Application Development Through Modular LLM Framework - ZenML LLMOps Database"
  ogDescription: "BlackRock developed an internal framework to accelerate AI application development for investment operations, reducing development time from 3-8 months to a couple of days. The solution addresses challenges in document extraction, workflow automation, Q&A systems, and agentic systems by providing a modular sandbox environment for domain experts to iterate on prompt engineering and LLM strategies, coupled with an app factory for automated deployment. The framework emphasizes human-in-the-loop processes for compliance in regulated financial environments and enables rapid prototyping through configurable extraction templates, document management, and low-code transformation workflows."
---

## BlackRock's AI Application Development Framework: A Production LLMOps Case Study

BlackRock, the world's largest asset management firm, has developed a comprehensive internal framework to scale the development of custom AI applications for investment operations. This case study demonstrates how a major financial institution addressed the operational challenges of deploying LLMs at scale while maintaining regulatory compliance and domain expertise integration.

The company's investment operations teams serve as the backbone for portfolio managers and analysts who process torrents of daily information to develop investment strategies and execute trades. These teams require sophisticated internal tools across multiple domains, making rapid application development crucial for business operations. BlackRock identified four primary categories of AI applications they needed to build: document extraction systems, complex workflow automation, Q&A chat interfaces, and agentic systems.

### Core Business Challenge and Use Case

The specific use case presented involved the New Issue Operations team, responsible for setting up securities when market events occur, such as IPOs or stock splits. This process traditionally required manual ingestion of prospectuses or term sheets, consultation with domain experts across equity, ETF, and other business teams, creation of structured outputs, collaboration with engineering teams for transformation logic, and integration with downstream applications. This end-to-end process historically took between 3 to 8 months for complex use cases, creating significant operational bottlenecks.

The company attempted to implement fully agentic systems for this workflow but found them inadequate due to the complexity and domain knowledge requirements inherent in financial instrument processing. This led to the recognition that human-in-the-loop approaches were essential, particularly in highly regulated environments where compliance and "four eyes" checks are mandatory.

### Technical Architecture and LLMOps Implementation

BlackRock's solution centers on a two-component architecture consisting of a Sandbox environment and an App Factory. The Sandbox serves as a playground for domain experts to build and refine extraction templates, run extractions on document sets, and compare results across different approaches. The App Factory functions as a cloud-native operator that takes definitions from the Sandbox and automatically spins out production applications.

The underlying infrastructure includes a traditional data platform for ingestion, a developer platform for orchestration, and pipeline components for transformation and distribution. However, the innovation lies in federating the pain points of prompt creation, extraction template management, and LLM strategy selection directly to domain experts, dramatically accelerating iteration cycles.

### Prompt Engineering and Template Management

The framework provides sophisticated prompt engineering capabilities that go beyond simple template management. Domain experts can configure multiple fields for extraction with corresponding prompts, data types, validation rules, and inter-field dependencies. For example, in bond processing, if a security is marked as callable, related fields like call date and call price automatically become required, demonstrating the complex business logic the system can handle.

The prompt engineering challenge proved particularly complex in financial contexts, where simple extraction tasks often require extensive domain knowledge encoding. BlackRock noted that prompts which started as a few sentences frequently evolved into three-paragraph descriptions of complex financial instruments. The framework addresses this by providing versioning, comparison capabilities, and evaluation datasets to assess prompt performance systematically.

### LLM Strategy Selection and Model Management

The system supports multiple LLM strategies that can be dynamically selected based on document characteristics and use case requirements. For simple investment-grade corporate bonds, in-context learning with smaller models might suffice. However, for complex documents spanning thousands or even 10,000 pages, the system must handle context limitations and token limits by automatically switching to different strategies such as RAG-based approaches or chain-of-thought reasoning.

This strategic flexibility addresses real-world production challenges where document complexity varies dramatically. The framework allows domain experts to experiment with different LLM strategies, mix them with various prompts, and iterate quickly without requiring deep technical knowledge of the underlying models or their limitations.

### Production Deployment and Infrastructure Management

The App Factory component handles the complex deployment challenges associated with AI applications in production environments. This includes traditional concerns like distribution, access control, and user federation, as well as AI-specific challenges such as infrastructure selection and cost management. The system can automatically provision different types of clusters based on use case requirements - GPU-based inference clusters for intensive analysis tasks like processing 500 research reports overnight, or burstable clusters for less demanding workloads.

Cost control mechanisms are built into the deployment process, recognizing that AI applications can have highly variable resource requirements. The system aims to make app deployment as close to a traditional CI/CD pipeline as possible, abstracting away the complexity of AI infrastructure management from the domain experts.

### Document Processing and Management

The framework includes sophisticated document management capabilities, with ingestion from the data platform, automatic tagging according to business categories, labeling, and embedding generation. This creates a structured foundation for various extraction strategies and enables efficient document retrieval and processing across different use cases.

The document processing pipeline handles the complexity of financial documents, which can vary dramatically in structure, length, and content. The system's ability to automatically categorize and process these documents reduces the manual overhead typically associated with document-centric AI workflows.

### Validation and Quality Control

Recognizing the critical nature of financial data extraction, the framework includes multiple layers of quality control and validation. Operators can configure QC checks on result values, implement field-level constraints, and define complex inter-field dependencies. This ensures that extracted data meets business requirements and regulatory standards before being passed to downstream systems.

The validation framework goes beyond simple data type checking to include business rule validation, making it suitable for highly regulated environments where data accuracy and compliance are paramount.

### Human-in-the-Loop Integration

BlackRock emphasizes the importance of human-in-the-loop design, particularly in regulated financial environments. Rather than pursuing fully automated agentic approaches, the framework is designed to augment human expertise while maintaining necessary oversight and control. This approach recognizes that while LLMs can significantly accelerate document processing and analysis, human domain expertise remains essential for complex financial decision-making and regulatory compliance.

The system provides interfaces that allow domain experts to review extraction results, make corrections, and validate outputs before they are passed to downstream processes. This ensures that the benefits of AI automation are realized while maintaining the oversight required in financial services.

### Integration and Workflow Automation

Beyond extraction capabilities, the framework includes low-code/no-code workflow builders that allow operators to create transformation and execution workflows. This addresses a common limitation in AI tools where extraction results must be manually downloaded, transformed, and uploaded to downstream systems. Instead, operators can build end-to-end pipelines that automatically handle data transformation and system integration.

This workflow automation capability significantly reduces the operational overhead of AI applications and makes them more suitable for production environments where seamless integration with existing systems is essential.

### Challenges and Lessons Learned

BlackRock identified several key challenges in scaling AI application development. First, the complexity of prompt engineering in specialized domains requires significant investment in training domain experts. Financial instruments often require extensive contextual description that goes far beyond simple extraction prompts.

Second, educating the organization about LLM strategies and their appropriate application across different use cases proved essential. The framework's success depends on users understanding when to apply different approaches and how to configure them effectively for their specific needs.

Third, the company learned the importance of rigorous ROI evaluation when moving from experimentation to production. The cost and complexity of AI applications must be carefully weighed against alternative solutions, including off-the-shelf products that might provide faster, more cost-effective solutions for certain use cases.

### Production Impact and Results

The implementation of this framework dramatically reduced application development time from 3-8 months to just a few days for complex use cases. This acceleration enables BlackRock to be more responsive to business needs and to experiment with AI applications that might not have been feasible under the previous development model.

The modular design allows for reuse of components across different use cases, creating economies of scale in AI application development. Domain experts can leverage existing extraction templates, transformation logic, and deployment configurations when building new applications, further accelerating development cycles.

### Security and Compliance Considerations

Operating in the financial services sector, BlackRock has implemented multiple layers of security and compliance controls throughout the framework. These span infrastructure, platform, application, and user levels, with policies designed to prevent data leakage and ensure regulatory compliance. The system operates within BlackRock's secure network environment with appropriate access controls and audit capabilities.

The framework's design recognizes that financial services firms must balance AI innovation with stringent security and compliance requirements, leading to architectural decisions that prioritize security and auditability alongside performance and usability.

This case study demonstrates how large financial institutions can successfully implement LLMOps at scale by focusing on domain expert empowerment, modular architecture design, and human-in-the-loop processes that maintain compliance while dramatically accelerating AI application development cycles.