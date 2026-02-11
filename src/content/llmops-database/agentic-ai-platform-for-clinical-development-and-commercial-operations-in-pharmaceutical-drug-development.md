---
title: "Agentic AI Platform for Clinical Development and Commercial Operations in Pharmaceutical Drug Development"
slug: "agentic-ai-platform-for-clinical-development-and-commercial-operations-in-pharmaceutical-drug-development"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6936b97a45e41ac9ab4970cd"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:34:41.156Z"
  createdOn: "2025-12-08T11:41:46.684Z"
llmopsTags:
  - "healthcare"
  - "regulatory-compliance"
  - "document-processing"
  - "data-analysis"
  - "content-moderation"
  - "summarization"
  - "classification"
  - "rag"
  - "embeddings"
  - "fine-tuning"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "semantic-search"
  - "vector-search"
  - "model-optimization"
  - "instruction-tuning"
  - "error-handling"
  - "latency-optimization"
  - "chunking"
  - "system-prompts"
  - "mcp"
  - "evals"
  - "orchestration"
  - "databases"
  - "monitoring"
  - "guardrails"
  - "security"
  - "compliance"
  - "documentation"
  - "open-source"
  - "langchain"
  - "postgresql"
  - "cache"
  - "fastapi"
  - "amazon-aws"
industryTags: "healthcare"
company: "AstraZeneca"
summary: "AstraZeneca partnered with AWS to deploy agentic AI systems across their clinical development and commercial operations to accelerate their goal of delivering 20 new medicines by 2030. The company built two major production systems: a Development Assistant serving over 1,000 users across 21 countries that integrates 16 data products with 9 agents to enable natural language queries across clinical trials, regulatory submissions, patient safety, and quality domains; and an AZ Brain commercial platform that uses 500+ AI models and agents to provide precision insights for patient identification, HCP engagement, and content generation. The implementation reduced time-to-market for various workflows from months to weeks, with field teams using the commercial assistant generating 2x more prescriptions, and reimbursement dossier authoring timelines dramatically shortened through automated agent workflows."
link: "https://www.youtube.com/watch?v=EFXkgy3Fd_c"
year: 2025
seo:
  title: "AstraZeneca: Agentic AI Platform for Clinical Development and Commercial Operations in Pharmaceutical Drug Development - ZenML LLMOps Database"
  description: "AstraZeneca partnered with AWS to deploy agentic AI systems across their clinical development and commercial operations to accelerate their goal of delivering 20 new medicines by 2030. The company built two major production systems: a Development Assistant serving over 1,000 users across 21 countries that integrates 16 data products with 9 agents to enable natural language queries across clinical trials, regulatory submissions, patient safety, and quality domains; and an AZ Brain commercial platform that uses 500+ AI models and agents to provide precision insights for patient identification, HCP engagement, and content generation. The implementation reduced time-to-market for various workflows from months to weeks, with field teams using the commercial assistant generating 2x more prescriptions, and reimbursement dossier authoring timelines dramatically shortened through automated agent workflows."
  canonical: "https://www.zenml.io/llmops-database/agentic-ai-platform-for-clinical-development-and-commercial-operations-in-pharmaceutical-drug-development"
  ogTitle: "AstraZeneca: Agentic AI Platform for Clinical Development and Commercial Operations in Pharmaceutical Drug Development - ZenML LLMOps Database"
  ogDescription: "AstraZeneca partnered with AWS to deploy agentic AI systems across their clinical development and commercial operations to accelerate their goal of delivering 20 new medicines by 2030. The company built two major production systems: a Development Assistant serving over 1,000 users across 21 countries that integrates 16 data products with 9 agents to enable natural language queries across clinical trials, regulatory submissions, patient safety, and quality domains; and an AZ Brain commercial platform that uses 500+ AI models and agents to provide precision insights for patient identification, HCP engagement, and content generation. The implementation reduced time-to-market for various workflows from months to weeks, with field teams using the commercial assistant generating 2x more prescriptions, and reimbursement dossier authoring timelines dramatically shortened through automated agent workflows."
---

## Overview

This case study presents a comprehensive look at AstraZeneca's enterprise-wide deployment of agentic AI systems in partnership with AWS, spanning both clinical development (R&D) and commercial operations. The pharmaceutical company embarked on an ambitious "Bold Ambition 2030" goal to deliver 20 new medicines by 2030 and achieve $80 billion in revenue while transforming patient outcomes. The case study is notable for showcasing production-grade, multi-agent systems deployed at scale across global operations, with specific attention to the LLMOps challenges inherent in regulated pharmaceutical environments.

AstraZeneca's implementation represents a mature approach to productionizing LLMs, moving beyond simple chatbot use cases to sophisticated agentic workflows that automate complex tasks, orchestrate across multiple data sources, and integrate deeply into existing enterprise systems. The case study involves two primary speakers from AstraZeneca: Cassie Gregson (VP for R&D IT) and Ravi Gopalakrishnan (VP for Commercial and Data Science AI), alongside Ujwal from AWS who leads machine learning for Healthcare and Life Sciences.

## Strategic Context and LLMOps Philosophy

AWS's presentation emphasized several foundational LLMOps principles learned from working with 95% of the top 20 pharmaceutical organizations. A key insight presented was that "there are no shortcuts" with agentic AI - successful production deployments require careful attention to data foundations that cannot be treated as an afterthought. Traditional data products designed for analytics and human interaction are insufficient for agents, which require specific patterns and organizational structures. This observation reflects a mature understanding of LLMOps where data engineering and architecture are recognized as critical prerequisites rather than parallel workstreams.

The AWS team articulated a three-tier approach to production agentic AI: data foundations at the base, AI applications in the middle tier (which can be standalone applications, browser extensions, or embedded chatbots), and sophisticated agent workflows at the top. This layered architecture reflects production-grade thinking about how to build scalable, maintainable LLM systems. The emphasis on getting data and application strategy "fixed" before expecting value from agents demonstrates a realistic understanding of LLMOps maturity curves.

## Clinical Development Assistant: Architecture and Production Deployment

AstraZeneca's Development Assistant represents a significant production deployment that went from proof of concept to MVP in just 6 weeks through partnership with AWS. The system serves over 1,000 users across 21 countries, integrating 16 different data products across clinical, patient safety, regulatory, and quality domains. The architecture employs a true multi-agent system with 9 distinct agents working together, supported by 8 knowledge bases spanning 7 different domains.

From an LLMOps perspective, this deployment addresses several critical production challenges. First, the system tackles the fundamental problem of siloed, disparate data sources - a common challenge in pharmaceutical organizations where clinical trial data, regulatory submissions, patient safety reports, and quality documentation traditionally exist in separate systems. The solution applies contextual ontologies to bring these data sources together in a way that agents can effectively query and reason over. This approach to data preparation specifically for agent consumption represents sophisticated LLMOps practice.

The natural language interface allows clinical researchers, scientists, and other R&D personnel to ask conversational questions like "What are our highest performing clinical trial sites?" or "How many clinical trial sites do we have?" without needing to know where data resides or how to transform it. Critically, the system shows its reasoning, displays the underlying data sources, and provides click-through access to every source document and data product. This transparency mechanism addresses a key LLMOps concern in regulated industries: the need for auditability and verification. Users can validate the agent's responses by examining source materials, which is essential for building trust and meeting regulatory requirements.

The system's deployment architecture ensures appropriate access controls, allowing users to query only data products they have authorization to access. This role-based access control integration represents mature thinking about production LLM deployments in enterprise environments. The ability to scale from POC to 1,000+ users across 21 countries in 6 weeks suggests a well-designed infrastructure architecture, likely leveraging AWS's global infrastructure and managed services.

The business impact focuses on time savings - every minute saved in the drug development pipeline translates to faster patient access to medicines. Tasks that previously required hours of manual work (finding data across systems, transforming it, analyzing it, and deriving insights) can now be accomplished through natural language queries with immediate responses. This acceleration compounds across the entire clinical development lifecycle.

## Commercial Platform: AZ Brain Architecture and Scale

The commercial side of AstraZeneca's AI deployment, called AZ Brain, represents an even more sophisticated LLMOps implementation at extraordinary scale. The platform was explicitly designed around specific use cases rather than starting with technology - the team conducted extensive user research with field teams and medical science liaisons to understand their needs before building technical components. This use-case-driven approach to LLMOps reflects best practices in product development and helps ensure that technical investments deliver actual business value.

AZ Brain is built on four key components. First, a unified linked data foundation that integrates multiple heterogeneous data sources: multimodal claims and EMR data providing real-world evidence, market research data from physician conversations, domain intelligence on healthcare providers and patients, medical research including clinical trial reports and publications, conference proceedings from major events like ASCO and ESMO, continuously updated NCCN guidelines (which change frequently for precision therapies), and internal CRM and digital engagement data. The integration of these diverse data types - structured claims data, unstructured clinical documents, real-time event information, and evolving clinical guidelines - represents significant data engineering work fundamental to effective LLMOps.

Second, the platform employs "a whole host of AI models and services" that are use-case-specific. This includes models for understanding patient pathways and lines of therapy in oncology, predictive models for patient eligibility for particular indications or drugs, patient progression models across lines of therapy, and response prediction based on personal characteristics. The system also includes AI classification models for various use cases. The deployment of 500+ experiments with roughly half progressed to production suggests an experimental culture with rigorous evaluation processes for determining which models merit production deployment. This scale of model management represents a sophisticated LLMOps operation requiring robust MLOps infrastructure for training, evaluation, versioning, deployment, monitoring, and retraining.

Third, the platform delivers insights through a suite of products tailored to different user personas and workflows. A particularly innovative example is "predictive field triggers" - real-time notifications sent to field representatives when a patient is predicted to show up to a doctor with symptoms indicating they've progressed from one treatment line to another, making them eligible for an AstraZeneca drug. This enables timely, informed conversations between sales representatives and oncologists. This represents agentic AI embedded into operational workflows rather than standalone applications, demonstrating sophisticated thinking about how to integrate AI into existing business processes.

Fourth, the platform was explicitly designed for scaling across multiple dimensions: multiple tumor types in oncology, multiple disease areas in biopharmaceutical products, multiple biomarker therapy types, and geographic expansion from the US to Europe and eventually Asia and South America. This multi-dimensional scaling requirement drove architectural decisions around platformization and building reusable components - fundamental LLMOps considerations when deploying at enterprise scale.

The commercial assistant agents perform sophisticated tasks beyond simple information retrieval. The system queries and interrogates different datasets, models, documents, and guidelines to provide concrete recommendations at an "N equals 1 level" - meaning personalized insights for individual healthcare provider and patient combinations, which is critical for targeted therapies where every HCP-patient pair represents a unique scenario. Field teams using this system generate 2x more prescriptions compared to those not using it, demonstrating clear business impact and ROI from the LLMOps investment.

## Agentic AI Workflows: Beyond Insights to Automation

AstraZeneca's evolution from "AI-driven insights" to "agents performing tasks, orchestrating and automating workflows, and making decisions" represents a maturity progression in LLMOps. The company identified five primary domains for agentic automation:

Insights generation from real-world evidence data represents the first domain, automating the laborious manual analytics previously required by medical colleagues to mine publications and data. Content creation is the second domain, bringing agility to promotional and medical information content creation and review processes. This likely involves automating drafting, initial review, and potentially suggesting edits while keeping humans in the loop for final approval - a balanced approach to automation in regulated content contexts.

Reimbursement dossier authoring represents the third use case, addressing a traditionally laborious multi-month process. Market research automation is the fourth domain, where creating market share views and forecasts for a new target product profile (TPP) for prostate cancer previously took 3 months with expensive domain experts but can now be accomplished in weeks. The fifth domain involves marketing workflow automation.

The dimension content lifecycle agent deserves particular attention as a production LLMOps example. This suite of agents takes complicated scientific literature and tables from approved publications and documents and formats them according to specific templates required by different regulatory authorities (Germany, Canada, US each have different requirements). This highly structured, template-driven content generation with strict regulatory requirements represents a challenging LLMOps use case. The reduction from months to weeks for this process has direct business impact - faster regulatory approval means faster patient access to drugs.

A critical aspect emphasized throughout is the "human in the loop" paradigm. While agents perform tasks, orchestrate workflows, and make recommendations, humans remain involved in decision-making, particularly for high-stakes actions. This reflects both responsible AI practices and practical considerations for deploying AI in regulated industries where ultimate accountability must rest with humans.

## AWS Technology Stack and LLMOps Tooling

The case study provides significant detail on the AWS technology stack enabling these deployments, offering insights into production LLMOps infrastructure. Amazon Bedrock Agent Core, unveiled at AWS's New York Summit and generally available for several months at the time of presentation, serves as a cornerstone technology. Agent Core provides several critical LLMOps capabilities:

A secure, isolated runtime environment for deploying agents at scale with infrastructure-level isolation - essential for regulated industries requiring strong governance and security boundaries. A virtual gateway for accessing external tools, whether from AWS marketplace, customer-built agents, or tools wrapped as containers using protocols like Model Context Protocol (MCP). Sophisticated memory management that preserves both short-term in-context memory and long-term memory with intelligent mechanisms for loading and offloading between storage mediums - addressing a key challenge in conversational AI systems. Built-in authentication and authorization capabilities for agent actions, handling complex scenarios like translating natural language queries into SQL that must execute against databases with appropriate access controls verified.

These Agent Core capabilities address substantial "undifferentiated heavy lifting" that would otherwise require significant engineering effort from each customer. By providing these as managed service primitives, AWS reduces the barrier to production deployment of agentic systems.

AWS also released an open source toolkit for healthcare and life sciences under MIT Zero license, containing templates, examples, and deployment scripts that allow developers to get started quickly without paying licensing fees. The toolkit is organized around "supervisors" - orchestrators with access to specific tool sets. For example, the R&D supervisor has access to information on molecules, clinical trials, and research; the clinical supervisor accesses information for designing trials, reviewing protocols, and comparing outcomes; the content supervisor enables report generation, competitive analysis, and regulatory submissions.

This open source approach serves multiple purposes from an LLMOps perspective: it reduces time-to-value for customers experimenting with use cases, it establishes best practices and patterns for common scenarios, it builds community and ecosystem around AWS's AI services, and it provides a pathway for customers to contribute improvements back. The toolkit is maintained to stay current as Agent Core evolves, relieving individual development teams from tracking every new platform capability.

Beyond the open source toolkit, AWS introduced production-ready packaged assets for specific use cases within a portal interface. This represents a progression from code-first developer experiences (native AWS services), to template-based development (open source toolkit), to configuration-driven deployment (portal with packaged assets). This tiered approach acknowledges different customer personas: some want full control and are comfortable working with APIs and code, others want starting templates they can customize, and still others want pre-built solutions they can configure and deploy. Effective LLMOps platforms must serve all these personas.

The broader AWS stack includes infrastructure components like containers and AWS Trainium chips for training and inference, APIs for fine-tuning pre-trained models, and services like Amazon Nova Forge for model customization. The emphasis on fine-tuning and training capabilities reflects an important LLMOps principle: while foundation models provide broad capabilities, true competitive differentiation comes from incorporating proprietary data. Nova Forge enables blending model weights with customer data, creating specialized models that leverage both general foundation model knowledge and domain-specific information. This addresses a common customer question: "If everyone has access to the same models, how do we differentiate?" The answer lies in data and customization, which requires robust infrastructure for training and fine-tuning at scale.

The development services layer includes specific models, guardrailing and optimization capabilities, and Agent Core for building agents. The life sciences-specific additions (toolkit and AI portal) sit on top of this general-purpose infrastructure, demonstrating how AWS is creating vertical-specific accelerators built on horizontal platform capabilities.

Integration examples mentioned include Stanford's Bomni project now available in the toolkit, providing access to literature search, molecular information queries, and TCGA database queries for oncology research via MCP servers. These can be blended with proprietary customer data, all running within customer AWS accounts to maintain data privacy and security - critical for pharmaceutical companies handling confidential research data and patient information.

## LLMOps Challenges and Considerations

While the case study presents impressive results, several LLMOps challenges are evident between the lines. The 6-week POC-to-MVP timeline for the Development Assistant, while rapid, represents just the beginning of the LLMOps journey. Moving from MVP to production-grade systems supporting 1,000+ users requires addressing scalability, reliability, monitoring, observability, incident response, and continuous improvement processes. The case study doesn't detail these operational aspects, but they are implicit in any production deployment at this scale.

The claim of 500+ experiments with roughly half in production suggests a rigorous evaluation and selection process, but the case study doesn't describe the evaluation methodology, success criteria, or governance processes for promoting models from experiment to production. In regulated industries, these processes must be documented and defensible. The LLMOps infrastructure supporting this experimental velocity and production deployment scale likely includes sophisticated experiment tracking, model versioning, A/B testing capabilities, and deployment automation.

The integration of 16 data products across multiple domains for the Development Assistant raises questions about data quality, consistency, freshness, and lineage - all critical LLMOps concerns. The application of "contextual ontologies" suggests significant data engineering work to create unified semantic models across disparate sources. Maintaining these integrations as source systems evolve represents an ongoing operational challenge. The case study mentions continuous retraining of production models, which requires automated pipelines for data ingestion, feature engineering, model training, evaluation, and deployment - classic MLOps capabilities that become even more complex with LLM systems.

The need for role-based access control and authentication at multiple levels (user access to data products, agent authentication to databases, authorization for specific queries) represents significant security and governance complexity in production LLM deployments. The case study mentions these capabilities but doesn't detail the implementation approach. In pharmaceutical environments with strict regulatory requirements around data access and audit trails, these systems must be robust and fully logged.

The human-in-the-loop approach for high-stakes decisions is appropriate but raises questions about workflow design: How are tasks routed to humans? What context is provided? How are human decisions captured and fed back into the system? How is overall process performance monitored? These operational questions are central to effective LLMOps but aren't addressed in detail.

The geographic scaling from US to Europe to Asia introduces additional complexity around data residency requirements, local regulations, language support, and cultural considerations in UI/UX design. The case study mentions this scaling but doesn't discuss the technical and operational challenges involved.

## Business Impact and ROI

The business results presented are substantial but should be interpreted with appropriate context. The 2x increase in prescriptions for field teams using the commercial assistant is impressive, but the case study doesn't detail the measurement methodology, control groups, or potential confounding factors. In pharmaceutical sales, many factors influence prescription rates beyond tool availability. Nevertheless, even if the true effect is smaller than 2x, any significant increase represents meaningful business value given the scale of operations and revenue per prescription.

The reduction from months to weeks for various workflows (market research, reimbursement dossier authoring) translates to faster time-to-market for drugs, which has cascading value: earlier revenue realization, longer patent exclusivity period for monetization, and most importantly, earlier patient access to potentially life-saving medicines. In an industry where development timelines stretch over years or decades, shaving weeks or months off any step compounds across the pipeline.

The scale of deployment (1,000+ users across 21 countries for the Development Assistant alone) suggests substantial organizational change management beyond the technical implementation. The adoption across diverse geographies and user roles indicates successful attention to user experience, training, and support - often underappreciated aspects of LLMOps that determine whether technical capabilities translate to actual business value.

The stated goal of delivering 20 new medicines by 2030 and achieving $80 billion in revenue represents an extraordinarily ambitious target. While AI and agentic systems will contribute, it's important to recognize these as tools supporting broader strategic initiatives rather than silver bullets. The case study appropriately frames AI as enabling "precision" (breath of capabilities) and speed, combined with human purpose, as the formula for success.

## Evaluation and Critical Perspective

This case study presents an impressive production deployment of agentic AI systems at enterprise scale in a highly regulated industry. Several aspects deserve recognition: the emphasis on data foundations as prerequisites rather than afterthoughts, the use-case-driven approach to technology selection, the attention to human-in-the-loop patterns for appropriate scenarios, the investment in reusable platforms and components for scaling, and the transparent presentation of reasoning and sources to build user trust.

However, as with any vendor-customer presentation, certain caveats apply. The business results (2x prescription increase, timeline reductions) are presented without detailed methodology or independent verification. AWS and AstraZeneca have strong incentives to present positive results, so claims should be understood in that context. The technical implementation details are somewhat high-level - we don't see the actual architectures, data pipelines, model configurations, or operational monitoring systems that underpin these deployments.

The rapid 6-week POC-to-MVP timeline, while impressive, may gloss over significant preparatory work in data infrastructure, security frameworks, and organizational readiness that enabled such velocity. Organizations attempting to replicate this timeline without similar foundational capabilities may face longer journeys. The case study also doesn't discuss challenges, setbacks, or lessons learned from failures - any implementation of this scale certainly encountered obstacles.

The production deployment of 500+ models represents significant operational complexity that isn't fully explored. Questions about model monitoring, performance degradation detection, retraining triggers, version management, and rollback procedures are critical for LLMOps at this scale but aren't addressed. The integration points between agents, between agents and data sources, and between the AI systems and existing enterprise applications likely required substantial engineering effort that isn't detailed.

Despite these limitations inherent in vendor case studies, the AstraZeneca implementation represents a legitimate and impressive example of enterprise-scale LLMOps in action. The combination of clinical development and commercial use cases demonstrates broad organizational commitment to AI transformation. The attention to productionization concerns (security, access control, auditability, scaling) reflects mature thinking about what it takes to move beyond demos to systems that deliver sustained business value.

The partnership model between AstraZeneca and AWS, where customer feedback drives platform development (evidenced by features in Agent Core, the open source toolkit, and the AI portal), represents effective ecosystem dynamics that benefit the broader community. This case study contributes to the emerging body of knowledge around production LLMOps practices, particularly in regulated industries where requirements around transparency, auditability, and human oversight are especially stringent.