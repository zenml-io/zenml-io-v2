---
title: "GenAI Governance in Practice: Access Control, Data Quality, and Monitoring for Production LLM Systems"
slug: "genai-governance-in-practice-access-control-data-quality-and-monitoring-for-production-llm-systems"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "692433ce6aa5b8088b202d5e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:28:45.649Z"
  createdOn: "2025-11-24T10:30:38.477Z"
llmopsTags:
  - "healthcare"
  - "customer-support"
  - "document-processing"
  - "question-answering"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "few-shot"
  - "error-handling"
  - "human-in-the-loop"
  - "chunking"
  - "system-prompts"
  - "agent-based"
  - "evals"
  - "langchain"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "fastapi"
  - "monitoring"
  - "api-gateway"
  - "databases"
  - "guardrails"
  - "compliance"
  - "security"
  - "documentation"
  - "open-source"
  - "microsoft-azure"
  - "amazon-aws"
  - "google-gcp"
industryTags: "consulting"
company: "Xomnia"
summary: "Martin Der, a data scientist at Xomnia, presents practical approaches to GenAI governance addressing the challenge that only 5% of GenAI projects deliver immediate ROI. The talk focuses on three key pillars: access and control (enabling self-service prototyping through tools like Open WebUI while avoiding shadow AI), unstructured data quality (detecting contradictions and redundancies in knowledge bases through similarity search and LLM-based validation), and LLM ops monitoring (implementing tracing platforms like LangFuse and creating dynamic golden datasets for continuous testing). The solutions include deploying Chrome extensions for workflow integration, API gateways for centralized policy enforcement, and developing a knowledge agent called \"Genie\" for internal use cases across telecom, healthcare, logistics, and maritime industries."
link: "https://www.youtube.com/watch?v=SnD9qN2qbhY"
year: 2025
seo:
  title: "Xomnia: GenAI Governance in Practice: Access Control, Data Quality, and Monitoring for Production LLM Systems - ZenML LLMOps Database"
  description: "Martin Der, a data scientist at Xomnia, presents practical approaches to GenAI governance addressing the challenge that only 5% of GenAI projects deliver immediate ROI. The talk focuses on three key pillars: access and control (enabling self-service prototyping through tools like Open WebUI while avoiding shadow AI), unstructured data quality (detecting contradictions and redundancies in knowledge bases through similarity search and LLM-based validation), and LLM ops monitoring (implementing tracing platforms like LangFuse and creating dynamic golden datasets for continuous testing). The solutions include deploying Chrome extensions for workflow integration, API gateways for centralized policy enforcement, and developing a knowledge agent called \"Genie\" for internal use cases across telecom, healthcare, logistics, and maritime industries."
  canonical: "https://www.zenml.io/llmops-database/genai-governance-in-practice-access-control-data-quality-and-monitoring-for-production-llm-systems"
  ogTitle: "Xomnia: GenAI Governance in Practice: Access Control, Data Quality, and Monitoring for Production LLM Systems - ZenML LLMOps Database"
  ogDescription: "Martin Der, a data scientist at Xomnia, presents practical approaches to GenAI governance addressing the challenge that only 5% of GenAI projects deliver immediate ROI. The talk focuses on three key pillars: access and control (enabling self-service prototyping through tools like Open WebUI while avoiding shadow AI), unstructured data quality (detecting contradictions and redundancies in knowledge bases through similarity search and LLM-based validation), and LLM ops monitoring (implementing tracing platforms like LangFuse and creating dynamic golden datasets for continuous testing). The solutions include deploying Chrome extensions for workflow integration, API gateways for centralized policy enforcement, and developing a knowledge agent called \"Genie\" for internal use cases across telecom, healthcare, logistics, and maritime industries."
---

## Overview

This case study presents a comprehensive framework for GenAI governance based on practical experience from Xomnia, a consulting firm that has built production LLM applications across telecom, healthcare, logistics, and maritime industries. The presenter, Martin Der, addresses the sobering reality that a recent study suggests only 5% of GenAI projects deliver on their promised ROI, arguing that while many projects start as "cool demos," they often fail due to inadequate attention to governance concerns including access control, data quality, security, monitoring, and compliance.

The talk is structured around three practical pillars of GenAI governance maturity: access and control, unstructured data quality, and LLMOps monitoring. Rather than focusing on policy development, the presentation offers concrete technical implementations and architectural patterns for moving from proof-of-concept to production-grade LLM systems. The speaker emphasizes that organizations should map their current maturity level across these domains and make informed architectural choices early, rather than attempting to retrofit governance capabilities after systems are already deployed.

## Access and Control: Combating Shadow AI

The first pillar addresses the common problem of "shadow AI" - when users aren't provided with appropriate tools and resort to using unauthorized services like ChatGPT, potentially exposing sensitive information. The speaker argues that organizations have a responsibility to provide users with proper tools for identifying use cases, prototyping solutions, and accessing intuitive interfaces.

**Self-Service Prototyping with Open WebUI**

Xomnia's primary recommendation for enabling controlled experimentation is implementing Open WebUI, an open-source platform that provides enterprise-grade features comparable to commercial solutions. Open WebUI allows organizations to:

- Host models locally while also connecting to managed cloud models
- Implement custom GPTs with system prompts and structured outputs
- Connect custom pipelines for more advanced agentic workflows
- Build and manage knowledge bases with a user-friendly interface
- Provide business users with sandbox environments for prototyping

The key insight here is empowering business users to think about LLM applications in terms of simple steps within existing processes, rather than immediately jumping to complex agent architectures, which the speaker characterizes as "booby traps" for inexperienced users. By teaching users about system prompts, structured outputs, and basic RAG concepts, organizations can democratize GenAI development while maintaining control.

Xomnia reports that companies implementing this type of platform with appropriate training are "way more successful" at identifying and quickly prototyping use cases. Business users gain the ability to scan Excel files and PowerPoint presentations at scale, with the option to integrate custom OCR for enhanced document processing with markdown conversion.

**Integration Over Context Switching**

A critical lesson from production deployments is the importance of meeting users where they work rather than forcing context switches. The speaker shares an example from a healthcare company where customer service representatives use a chat application to handle patient medical questions. Rather than requiring agents to switch between the chat interface, medical information systems, and other applications, Xomnia integrated LLM capabilities directly into the primary workflow through Chrome extensions and custom buttons.

This integration approach allows healthcare agents to leverage LLM-generated responses, summarizations, and priority assessments within a single application window, dramatically improving adoption. The speaker emphasizes that asking users to navigate through "three layers of login screens" to access a custom GPT in a separate tab fundamentally undermines the value proposition of GenAI assistance.

**API Gateway for Centralized Policy Enforcement**

For organizations with multiple LLM applications in production, the speaker recommends implementing an API gateway as a centralized policy enforcement layer. This architectural pattern provides several key benefits:

- Centralized management of API keys and authentication
- Ability to quickly switch between latest models across Azure, AWS, or Google Vertex AI
- Enforcement of policies like PII reduction at a single layer rather than maintaining redundant implementations across multiple applications
- Application of safety and compliance standards consistently
- More granular control over token distribution across different teams

The speaker notes that without this centralization, different teams often implement redundant solutions for common concerns like PII reduction, with each team tackling the same challenge independently. By handling these concerns once at the gateway level - potentially even fine-tuning specialized models for tasks like PII detection - organizations can distribute robust solutions across all applications. The API gateway becomes the "perfect place to implement your policy as code."

## Unstructured Data Quality: Managing Knowledge Base Integrity

The second pillar addresses a critical challenge in production RAG systems: ensuring the quality and consistency of unstructured text data in knowledge bases. The speaker emphasizes that organizations need to move from "big data dumps" to carefully curated knowledge bases with fresh, correct, and consistent information.

**The Genie Knowledge Agent Case Study**

Xomnia recently deployed an internal MVP called "Genie," a knowledge agent that answers questions about past consulting cases and consultant availability. Built using a React framework, Genie thinks through queries and uses appropriate tools - checking availability in Trello and retrieving consultant resumes in the appropriate language.

The speaker uses a hypothetical query about his own AWS experience to illustrate a common data quality problem: he updates his English resume regularly but only updates his Dutch CV when needed for Dutch-speaking clients. This creates conflicting knowledge sources that can severely degrade RAG performance. When both documents are retrieved for the same query (as they would be given their high similarity), the system produces ambiguous answers, forcing account managers to manually verify information.

This example illustrates how contradictions in knowledge bases can "destroy your RAG pipeline" by introducing ambiguity exactly when the system needs to provide confident, accurate responses.

**Data Quality Experiment Methodology**

To identify these issues at scale, the speaker proposes running targeted data quality experiments before (or after) ingesting documents into production vector databases. The methodology involves:

- Starting with a manageable subset of documents (10-50 documents depending on total chunks)
- Running similarity searches for each chunk with appropriate thresholds to identify candidate pairs that discuss similar topics
- Testing these similar chunks for redundancy using LLM-based classification
- For non-redundant similar content, running contradiction checks to identify disagreeing statements

The speaker notes that while there are "smarter ways" to detect exact duplicates (like hashing and clustering techniques), very similar content with different tones or intended audiences (external vs. internal communication) can also cause problems in RAG systems and warrant detection.

**Contradiction and Redundancy Detection Prompts**

The contradiction check involves passing two chunks to an LLM with instructions tailored to the specific use case, asking whether contradictions exist. The key is structuring the output to include:

- Binary contradiction flag
- Confidence levels
- Identification of the specific contradicting statements

Similarly, redundancy checks can identify full duplicates, partial duplicates, and similar content, again with confidence levels that help prioritize remediation efforts.

The speaker emphasizes that confidence levels are crucial for "seeing the forest through the trees" because LLMs will flag many potential issues due to context limitations or ambiguous disclaimers. By focusing first on high-confidence issues, teams can establish baselines and identify patterns - such as discovering that certain metadata partitions consistently contain problems, suggesting those sources should be removed or reconciled into a single source of truth.

**Competitive Performance**

In an interesting anecdote, the speaker mentions competing with an entire SaaS company specializing in this problem. By using a "brute force approach" of comparing every chunk based on similarity and running them through more advanced prompts than shown in the presentation, Xomnia's solution actually outperformed the commercial vendor. The only remaining challenge is scalability, which they plan to address in the coming year.

## LLMOps Monitoring: From Print Statements to Production Observability

The third pillar addresses the evolution from basic debugging (the "good old print statement") to comprehensive production monitoring. The speaker notes that working on complex workflows and pipelines has made the need for proper observability tools undeniable.

**Tracing and Observability with LangFuse**

The first requirement is a platform for examining traces of LLM interactions. While teams might initially focus only on total token costs and usage, detailed trace breakdowns reveal much more valuable information:

- Tracking individual tool calls and their inputs/outputs
- Identifying why certain information was missed in multi-step reasoning
- Determining whether tool descriptions need to be more elaborate or include more edge cases

Xomnia implemented LangFuse as their LLMOps platform for evaluating and optimizing Genie. LangFuse provides the visibility needed to understand complex agentic workflows and debug failures in production.

**Golden Dataset Strategy**

A crucial component of the monitoring approach is continuous testing against golden datasets - curated collections of queries with known correct answers. The speaker emphasizes several important principles:

**Golden datasets must be dynamic assets rather than one-time creations.** The speaker asks the audience about their experience with golden datasets, receiving nods of recognition when asking if it was difficult and if they only did it once. This reflects a common pattern: teams invest significant effort to create an initial test set and then never update it, leading to drift between the test scenarios and actual system behavior.

**Synthetic generation with human validation** is the recommended approach rather than purely manual curation. The process involves:

- Providing diverse examples of expected query types (e.g., "does [person] have experience with [technology]" or "do we have any past cases that [condition]")
- Iterating over knowledge in the database (or sampling randomly)
- Generating synthetic queries with answers extracted directly from source documents
- Having humans validate these answers, correct hallucinations, and identify missing knowledge

This approach significantly accelerates dataset creation because the answer is usually present, requiring only validation and refinement rather than creation from scratch.

**Testing should be continuous during both development and production.** The platform enables testing for:

- Faithfulness to prompts
- Completeness of answers
- Retrieval accuracy (whether the right documents were retrieved)
- Custom metrics specific to the use case

While continuous testing is most useful during experimentation and development, it should continue in production as models are updated and knowledge evolves.

**Ownership and triggers** are essential for maintaining golden datasets at scale. The speaker suggests that when his resume is updated, synthetic Q&A pairs should be automatically generated for human validation - and he should be the validator since he knows his own background best. This principle of appointing specific owners for different parts of the knowledge base helps ensure validation quality and prevents burnout from trying to centralize all validation work.

**Edge cases and rare entities** need special attention in golden datasets. The speaker notes that while expert validation of production outputs provides realistic assessment, edge cases and rare entities don't occur frequently enough to be well-represented in organic usage patterns. A curated golden dataset can oversample these difficult cases to ensure they're properly handled, preventing the "performance drift" that occurs when systems work well on common queries but fail on unusual ones.

The speaker draws a parallel to how benchmark performances of LLMs have dropped over time: "the trivial cases are solved, the hard ones are still left to solve." Organizations need to intentionally test edge cases rather than assuming that good performance on common queries generalizes to all scenarios.

**Integrating with DSPy and Other Tools**

The speaker mentions DSPy as an example of tools for "programming LLMs themselves" that can leverage curated golden datasets. These datasets can be fed back into optimization loops, enabling more sophisticated approaches to prompt optimization and system tuning.

## Cross-Cutting Considerations and Implementation Guidance

**Maturity Model and Prioritization**

The speaker presents a maturity framework spanning from baseline to managed, measured, and optimized levels across the three pillars. However, he explicitly cautions against treating this as a prescriptive model where all domains must reach "optimized" before deploying any applications.

Instead, he recommends that teams map their current position and, critically, consider which concerns are relevant to their specific context. For example, if business processes don't naturally lead to shadow AI, investing heavily in self-service platforms may not be necessary. Some organizations might focus on getting one application running well rather than building entire prototyping platforms.

The key insight is that teams should **consider these governance concerns during design rather than retrofitting them later**. Making architectural choices with future governance needs in mind - even if not fully implementing all capabilities initially - prevents organizations from "running out of options because you didn't consider the design choices up front."

**Scalability and Cost Considerations**

For the data quality experiment, the speaker provides concrete guidance on estimating costs: take the number of chunks, multiply by average tokens per chunk, then divide by two (since similarity comparisons of A→B and B→A are redundant). This calculation helps organizations determine whether they're dealing with thousands or millions of documents and whether to build in-house solutions or purchase vendor platforms.

**Compliance and PII Handling**

The speaker addresses compliance concerns including PII reduction and handling of sensitive information like social security numbers and medical data. Solutions include:

- Using smaller local models or Python packages to filter sensitive information before it reaches LLM APIs
- Detecting harmful information in outputs before returning to users
- Leveraging platform-specific compliance features like Azure's EU data zone deployments with different data processing requirements compared to global deployments

The API gateway architecture is particularly valuable here, as it provides a single enforcement point for compliance policies across all applications.

**Beyond Chatbots**

A recurring theme is the importance of thinking beyond chatbot interfaces. The speaker repeatedly emphasizes that while chat is a natural starting point, true value comes from integrating LLM capabilities into existing workflows - whether through Chrome extensions, embedded buttons, or API integrations with existing business applications.

## Critical Assessment and Limitations

While the presentation offers valuable practical guidance, several areas warrant balanced consideration:

**Claimed vs. Demonstrated Results**: The talk primarily describes architectural patterns and approaches rather than presenting quantitative results. Claims like "way more successful" at identifying use cases or outperforming commercial data quality vendors lack specific metrics. Organizations should pilot these approaches with clear success criteria rather than assuming the same results will transfer to their context.

**Complexity vs. Simplicity Tradeoffs**: The recommended architecture - with API gateways, LLMOps platforms, golden datasets, and data quality pipelines - represents significant infrastructure overhead. While appropriate for organizations with multiple production applications, smaller teams or single-use cases might find this overengineered. The speaker's advice to consider which domains are relevant to specific contexts is important guidance here.

**Data Quality Methodology Maturity**: The contradiction and redundancy detection approach using similarity search and LLM-based classification is computationally expensive (O(n²) comparisons in the worst case, even with similarity thresholds). The speaker acknowledges that scalability remains an unsolved challenge. Organizations considering this approach should carefully test on representative data samples before committing to production-scale implementation.

**Golden Dataset Maintenance**: While the speaker correctly identifies that golden datasets must be dynamic and continuously updated, the proposed solution - synthetic generation with triggers and designated owners - still requires significant ongoing human effort. Organizations should carefully consider whether they have the bandwidth to maintain these datasets before committing to this approach, as stale golden datasets can give false confidence about system performance.

**Tool-Specific Recommendations**: The presentation makes specific tool recommendations (Open WebUI, LangFuse, DSPy) based on Xomnia's experience. While these are legitimate open-source options, organizations should evaluate alternatives based on their specific requirements, existing infrastructure, and team capabilities rather than treating these as universal best practices.

## Conclusions and Broader Implications

This case study provides valuable insight into the operational challenges of moving GenAI from demo to production at a consulting firm that has deployed applications across multiple industries. The three-pillar framework - access and control, data quality, and monitoring - addresses real pain points that many organizations encounter.

The emphasis on preventing shadow AI through self-service platforms while maintaining governance, the recognition that data quality in knowledge bases is crucial for RAG performance, and the need for continuous monitoring and testing all reflect mature operational thinking about production LLM systems.

Perhaps most valuable is the speaker's pragmatic approach to governance maturity: rather than prescribing a one-size-fits-all solution, he encourages organizations to assess their specific needs, make informed architectural choices early, and incrementally build governance capabilities as they scale their GenAI initiatives. This balanced perspective - acknowledging that not every organization needs every capability at the highest maturity level - is refreshingly practical in a field often characterized by hype and overcomplicated solutions.

For organizations struggling with the "5% success rate" challenge mentioned at the beginning of the talk, this case study offers concrete starting points: implement a self-service prototyping environment, run data quality experiments on your knowledge bases before large-scale RAG deployment, and establish observability and testing infrastructure early in the development lifecycle rather than treating it as an afterthought.