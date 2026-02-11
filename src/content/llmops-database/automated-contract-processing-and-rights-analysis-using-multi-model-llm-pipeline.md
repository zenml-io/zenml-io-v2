---
title: "Automated Contract Processing and Rights Analysis Using Multi-Model LLM Pipeline"
slug: "automated-contract-processing-and-rights-analysis-using-multi-model-llm-pipeline"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69281a91e31b9d60a3c6a797"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:30:02.458Z"
  createdOn: "2025-11-27T09:32:01.240Z"
llmopsTags:
  - "document-processing"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "structured-output"
  - "rag"
  - "prompt-engineering"
  - "embeddings"
  - "human-in-the-loop"
  - "chunking"
  - "orchestration"
  - "serverless"
  - "elasticsearch"
  - "documentation"
  - "compliance"
  - "guardrails"
  - "anthropic"
  - "amazon-aws"
industryTags: "media-entertainment"
company: "Condé Nast"
summary: "Condé Nast, a global media company managing complex contracts across multiple brands and geographies, faced significant operational bottlenecks due to manual contract review processes that were time-consuming, error-prone, and led to missed revenue opportunities. AWS developed an automated solution using Amazon Bedrock with Anthropic's Claude 3.7 Sonnet to process contracts through a multi-stage pipeline: converting PDFs to text using visual reasoning capabilities, extracting metadata fields through structured prompting, comparing contracts to existing templates using a knowledge base with RAG, and clustering low-similarity contracts to identify new template patterns. The solution reduced processing time from weeks to hours, improved accuracy in rights management, enabled better scalability during high-volume periods, and transformed how subject matter experts could drive AI application development through prompt engineering rather than traditional software development cycles."
link: "https://aws.amazon.com/blogs/machine-learning/how-conde-nast-accelerated-contract-processing-and-rights-analysis-with-amazon-bedrock?tag=soumet-20"
year: 2025
seo:
  title: "Condé Nast: Automated Contract Processing and Rights Analysis Using Multi-Model LLM Pipeline - ZenML LLMOps Database"
  description: "Condé Nast, a global media company managing complex contracts across multiple brands and geographies, faced significant operational bottlenecks due to manual contract review processes that were time-consuming, error-prone, and led to missed revenue opportunities. AWS developed an automated solution using Amazon Bedrock with Anthropic's Claude 3.7 Sonnet to process contracts through a multi-stage pipeline: converting PDFs to text using visual reasoning capabilities, extracting metadata fields through structured prompting, comparing contracts to existing templates using a knowledge base with RAG, and clustering low-similarity contracts to identify new template patterns. The solution reduced processing time from weeks to hours, improved accuracy in rights management, enabled better scalability during high-volume periods, and transformed how subject matter experts could drive AI application development through prompt engineering rather than traditional software development cycles."
  canonical: "https://www.zenml.io/llmops-database/automated-contract-processing-and-rights-analysis-using-multi-model-llm-pipeline"
  ogTitle: "Condé Nast: Automated Contract Processing and Rights Analysis Using Multi-Model LLM Pipeline - ZenML LLMOps Database"
  ogDescription: "Condé Nast, a global media company managing complex contracts across multiple brands and geographies, faced significant operational bottlenecks due to manual contract review processes that were time-consuming, error-prone, and led to missed revenue opportunities. AWS developed an automated solution using Amazon Bedrock with Anthropic's Claude 3.7 Sonnet to process contracts through a multi-stage pipeline: converting PDFs to text using visual reasoning capabilities, extracting metadata fields through structured prompting, comparing contracts to existing templates using a knowledge base with RAG, and clustering low-similarity contracts to identify new template patterns. The solution reduced processing time from weeks to hours, improved accuracy in rights management, enabled better scalability during high-volume periods, and transformed how subject matter experts could drive AI application development through prompt engineering rather than traditional software development cycles."
---

## Overview and Business Context

Condé Nast is a century-old global media powerhouse with prestigious brands including Vogue, The New Yorker, GQ, and Vanity Fair, reaching hundreds of millions of consumers across print, digital, and social platforms. The company manages an extensive and complex portfolio of contracts, rights, and licensing agreements spanning multiple brands and geographies. Prior to implementing this LLM-powered solution, Condé Nast relied on manual processes for contract review, particularly during strategic initiatives like brand acquisitions or expansions. Rights management experts spent considerable time identifying and matching incoming contracts to existing templates, extracting granted rights and metadata, and managing licensing agreements for various creative assets including images, videos, and text content from global contributors.

This manual, rule-based approach created significant operational bottlenecks that were both time-consuming and prone to human error. The inefficiencies led Condé Nast to take a conservative approach to utilizing rights, which in turn resulted in missed revenue opportunities. The company needed a modern solution that could automate contract processing while maintaining high standards of accuracy and regulatory compliance. This case study represents an interesting example of how traditional media companies can leverage LLMs in production to transform core business processes that have historically required deep human expertise.

## Technical Architecture and Production Infrastructure

The solution leverages a comprehensive AWS infrastructure orchestrated through AWS Step Functions to manage the multi-stage processing pipeline. Amazon S3 serves as the central storage layer for incoming contracts, reference templates, and all solution outputs. Amazon OpenSearch Serverless provides the vector store infrastructure for similarity matching and retrieval operations. Amazon Bedrock serves as the foundational LLM platform, providing access to Anthropic's Claude 3.7 Sonnet model through a unified API. Amazon SageMaker AI hosts the processing jobs that execute the various stages of the pipeline, while AWS Lambda handles integration with downstream systems.

The architecture demonstrates a thoughtful approach to production LLM deployment, separating concerns across different processing stages while maintaining data governance and access controls throughout. The use of Step Functions for orchestration provides visibility into the workflow execution and enables error handling and retry logic, which are essential for production reliability. The intermediate processed outputs are governed by the same access restrictions as raw source data, addressing security and compliance requirements that are particularly important in legal document processing contexts.

## Multi-Stage LLM Processing Pipeline

The production system implements a sophisticated multi-stage pipeline that showcases several advanced LLMOps patterns. The workflow begins when users upload contracts to an input S3 bucket, triggering Amazon EventBridge to initiate the Step Functions workflow. This event-driven architecture enables automated processing while maintaining auditability.

**Stage 1: Document Preprocessing and OCR** - The first SageMaker Processing job handles document conversion from PDFs to digital text. This stage leverages the visual reasoning capabilities of Claude 3.7 Sonnet to perform transcription from PDF images into raw text files. Notably, the system can handle complex document characteristics including handwritten notes, strikethroughs, and specialized formatting such as single versus multiple column layouts. This visual reasoning approach represents an interesting evolution beyond traditional OCR techniques, as the LLM can apply contextual understanding when interpreting visual elements. The preprocessing stage also implements a chunking strategy to handle large documents that may span hundreds of pages, repeatedly executing the extraction process on smaller segments. The resulting text files are stored in S3 to serve as the foundation for downstream processing stages and future generative AI use cases.

**Stage 2: Metadata Extraction** - A second SageMaker Processing job consumes the text output and uses Claude 3.7 Sonnet to extract pre-specified metadata fields. The implementation uses structured prompt engineering, providing the LLM with a schema consisting of every potential metadata field of interest accompanied by short descriptions to guide the extraction process. This approach demonstrates a production pattern for constrained generation where the prompt template serves as both specification and instruction, helping ensure consistent structured output that can be programmatically consumed by downstream systems.

**Stage 3: Template Matching with RAG** - The third processing stage implements a retrieval augmented generation pattern to discover similar existing templates. The system compares incoming contract text against possible templates stored in an Amazon Bedrock knowledge base, which uses vector embeddings to enable semantic similarity search. Beyond simply identifying similar templates, Claude 3.7 Sonnet analyzes and determines key semantic differences from the most similar templates. This combination of retrieval and LLM-based analysis represents a sophisticated application of RAG where the language model provides interpretive analysis on top of the retrieved context rather than simply using retrieval to ground generation.

The results from these stages are collated in spreadsheets containing extracted metadata fields, most similar templates and boilerplates, and identified differences. These outputs are saved to S3 and notifications are sent to business and legal staff for review. Importantly, incoming contracts with low similarity scores across all templates are routed to a separate S3 bucket for alternative processing, demonstrating a production pattern of exception handling and workflow branching based on confidence thresholds.

**Stage 4: Human Review and System Integration** - The architecture implements a human-in-the-loop pattern where reviewers validate the system results. An AWS Lambda function loads validated results into Condé Nast's rights and royalties management system, with notification messages indicating success or failure of the load operation. This integration point is critical for production deployment, as the LLM-powered analysis must ultimately feed into existing business systems and workflows.

**Stage 5: Clustering and New Template Discovery** - Contracts that showed low similarity to existing templates undergo additional processing through a clustering algorithm that groups them based on text similarity and granted rights. This stage produces spreadsheets with cluster labels, similarity scores, contract text, and interactive visualizations. Human reviewers use these outputs to draft new templates for future deals and system runs. This feedback loop enables continuous improvement of the template library, with newly identified templates being uploaded to the knowledge base in Stage 3 for future processing runs. This pattern demonstrates how production LLM systems can implement discovery and learning capabilities that improve over time through human expertise combined with algorithmic pattern detection.

## Prompt Engineering and Model Usage Patterns

The solution demonstrates several important prompt engineering patterns for production deployment. The metadata extraction stage uses schema-driven prompting where the model receives structured specifications of the desired output fields along with descriptions to guide extraction. This approach helps ensure consistency and reduces the likelihood of hallucination or incorrect field mapping, which would be problematic in a legal compliance context.

The template comparison stage shows a more complex prompting pattern where the model must both identify similarities and articulate semantic differences. This requires the LLM to perform comparative analysis rather than simple classification, demonstrating the use of reasoning capabilities in production. The case study indicates that human evaluation and feedback loops were essential for refining these prompts over time, highlighting the iterative nature of production prompt engineering.

The choice of Claude 3.7 Sonnet across all stages represents a deliberate model selection decision. While the case study doesn't detail the model selection process, the consistent use of a single model family suggests benefits in terms of operational simplicity and consistent behavior characteristics across the pipeline. However, this does raise questions about whether different stages might benefit from different models optimized for specific tasks - for example, whether smaller, faster models might suffice for metadata extraction while reserving larger models for semantic analysis tasks.

## Knowledge Base and RAG Implementation

The Amazon Bedrock knowledge base serves as the core retrieval system for template matching. While the case study doesn't provide extensive technical details about the knowledge base implementation, it represents a production RAG pattern where domain-specific documents (contract templates) are embedded and stored for semantic retrieval. The quality and comprehensiveness of this template library proved critical to system performance, with the case study noting that accuracy improved significantly when provided with diverse, high-quality example documents spanning multiple brands and geographies.

This observation highlights an important LLMOps consideration: the quality of retrieval sources can be as important as prompt engineering and model selection in RAG systems. The need for comprehensive historical contract archives suggests that organizations implementing similar solutions must invest in curating and organizing reference materials, not just in the LLM infrastructure itself. The system's ability to identify low-similarity contracts and route them for new template creation demonstrates a practical approach to handling the reality that no retrieval system will have perfect coverage, and that production systems must gracefully handle out-of-distribution scenarios.

## Data Preprocessing and Document Handling

The case study emphasizes that data preprocessing quality was foundational to overall system performance. The development of an advanced document processing capability that could handle diverse document types including handwritten notes, scanned copies, and multi-column PDFs required significant engineering effort. The system also needed to efficiently process large files both in terms of file size and page count.

This preprocessing challenge illustrates an important LLMOps lesson: production systems working with real-world documents cannot assume clean, well-formatted inputs. The chunking strategy for large documents demonstrates a practical pattern for handling context window limitations, though the case study doesn't detail how the system maintains coherence across chunks or reconciles extracted information from multiple segments of the same document. The conversion of PDFs to images for processing by Claude's vision capabilities represents an interesting architectural choice that leverages multimodal model capabilities rather than relying on traditional text extraction techniques.

## Human-in-the-Loop and Validation Patterns

The architecture explicitly incorporates human validation as a required step before results are loaded into production systems. This human-in-the-loop pattern serves multiple purposes: it provides quality assurance for high-stakes legal decisions, generates training data for future model refinement, and maintains human oversight in a domain where errors could have significant business and legal consequences.

The case study notes that human expertise remained essential for handling nuanced cases and providing feedback loops for prompt engineering. This represents a pragmatic approach to production LLM deployment where automation accelerates routine work while human experts focus on complex cases and strategic initiatives. The system essentially democratizes access to rights management expertise by encoding expert knowledge into prompts that address routine queries, rather than attempting to fully automate expert decision-making.

This pattern also addresses a key challenge in legal and compliance applications: the need for explainability and accountability. By requiring human validation before system outputs affect business operations, Condé Nast maintains appropriate control while still achieving substantial efficiency gains.

## Workflow Orchestration and Error Handling

The use of AWS Step Functions for orchestration provides a production-grade workflow management layer. While the case study doesn't detail specific error handling strategies, Step Functions enables patterns like retry logic, timeout handling, and conditional branching based on processing results. The ability to route low-similarity contracts to alternative processing paths demonstrates this conditional logic in action.

The event-driven triggering through EventBridge when new contracts are uploaded shows how the system integrates into existing business processes rather than requiring manual initiation. This automation reduces operational overhead and ensures consistent processing of all incoming contracts. The notification system that alerts business and legal staff when results are ready, and again when loading to downstream systems succeeds or fails, provides necessary visibility into system operations for stakeholders who may not directly interact with the technical infrastructure.

## Scalability and Performance Characteristics

The case study reports that processing time was reduced from weeks to hours, representing a dramatic efficiency improvement. The system handles increased workloads during high-volume periods such as brand acquisitions without requiring additional human resources, demonstrating horizontal scalability. The use of serverless components like Amazon OpenSearch Serverless, Lambda, and managed services like SageMaker and Bedrock suggests an architecture that can scale up and down based on demand without manual infrastructure management.

However, the case study doesn't provide detailed performance metrics such as throughput (contracts processed per hour), latency for different processing stages, or cost analysis. In production LLM deployments, these metrics are critical for capacity planning and cost management. The multi-stage pipeline architecture with separate SageMaker Processing jobs for each stage may introduce latency compared to a more tightly integrated processing flow, but provides clear separation of concerns and independent scalability for different stages.

## Model Access and Integration Patterns

The case study highlights Amazon Bedrock's multi-model access through a single API as a key benefit. This abstraction layer simplifies model integration and potentially enables future model switching or A/B testing without requiring extensive code changes. The seamless integration of the Bedrock SDK with SageMaker Processing suggests that AWS services are designed to work together, reducing integration complexity compared to assembling components from multiple vendors.

However, this also represents a degree of vendor lock-in to the AWS ecosystem. Organizations considering similar implementations should weigh the operational simplicity of integrated AWS services against the flexibility of more modular, cloud-agnostic architectures. The case study doesn't mention whether Condé Nast evaluated alternative deployment patterns such as self-hosted models or other cloud platforms.

## Deployment Strategy and Rollout Approach

The implementation followed an incremental deployment strategy, starting with a subset of contracts for specific brands before full-scale rollout. This phased approach enabled rapid iteration and refinement based on real-world feedback, leading to a more robust final solution. This represents a production best practice for LLM systems where behavior with real data often differs from expectations based on development testing.

The case study emphasizes early stakeholder alignment, involving legal teams, rights management experts, and technical staff from the project's inception. This collaborative approach ensured the solution met both compliance requirements and operational efficiency needs, facilitating smoother adoption across the organization. In complex enterprise deployments, particularly those touching legal and compliance domains, this stakeholder alignment is often as critical as technical execution.

## Impact on Development Processes and Organizational Capabilities

An interesting observation from the case study is how the project transformed Condé Nast's approach to software development for generative AI applications. By enabling subject matter experts to drive development through prompt engineering, the organization discovered a more direct path to creating technical solutions. Experts could express requirements in plain English directly to language models, reducing traditional development complexity while improving accuracy and relevance of outcomes.

This shift represents a broader trend in LLMOps where the line between technical and domain expertise becomes blurred. Prompt engineering as a discipline allows non-developers to participate more directly in system behavior specification, though this also raises questions about governance, version control, and testing of prompt-based systems compared to traditional code. The case study presents this democratization positively, but organizations should also consider how to maintain appropriate engineering discipline around prompt development, testing, and deployment.

## Downstream Integration and Ecosystem Effects

The solution's outputs feed into multiple downstream processes and integrate with other internal Condé Nast software solutions, including their rights and royalties management system. This integration demonstrates that production LLM systems rarely operate in isolation but must fit into existing business process ecosystems. The structured output format (spreadsheets with metadata, similarity scores, etc.) enables programmatic consumption by these downstream systems.

The case study also mentions that the preprocessing text files serve as a foundation for "a suite of existing and future generative AI use cases," suggesting that the investment in high-quality document processing creates reusable assets. One specific example mentioned is a system that translates complex rights availability information into plain language for non-technical users. This cascading value from foundational LLM infrastructure represents an important consideration in production deployment: initial investments can enable multiple applications and use cases over time.

## Challenges and Limitations

While the case study is primarily positive (which is expected given its promotional nature), some challenges and limitations can be inferred. The emphasis on data preprocessing as "foundational" and requiring an "advanced OCR system" suggests significant engineering effort was required before the core LLM functionality could be effective. Organizations considering similar implementations should anticipate substantial work in data preparation and document handling.

The continued requirement for human validation indicates that full automation was not achieved or deemed appropriate. While this is presented as a strength (maintaining human oversight), it also means the system has not eliminated manual effort, but rather shifted it from initial processing to validation and exception handling. The efficiency gains are real but not complete automation.

The case study mentions that contracts with low template similarity require additional processing through clustering and manual template creation. This suggests the system's effectiveness depends on the comprehensiveness of the template library, and that ongoing curation is necessary. The need to rerun the solution after new templates are uploaded indicates an iterative rather than one-pass process for some contracts.

## Technical Gaps and Unanswered Questions

Several technical details that would be valuable for assessing this LLMOps implementation are not covered in the case study. There is no discussion of evaluation metrics, test datasets, or accuracy measurements. How is the quality of metadata extraction validated? What are the false positive and false negative rates for template matching? How is semantic similarity quantified and what thresholds determine routing to the clustering path?

The case study doesn't address prompt version control, A/B testing of different prompts, or systematic evaluation of prompt changes. There is no mention of monitoring and observability infrastructure for tracking system performance in production, detecting drift, or identifying degradation over time. Cost analysis is absent - while the efficiency gains are clear in time savings, the financial cost of operating the system at scale is not discussed.

The treatment of large documents through chunking raises questions about how the system maintains document-level coherence and reconciles information across chunks. How are contradictory extractions from different chunks resolved? The clustering algorithm for identifying new templates is mentioned but not detailed - what clustering approach is used, and how are appropriate granularity and groupings determined?

## Security, Privacy, and Compliance Considerations

The case study notes that intermediate processed data outputs are governed by the same access restrictions as raw source data, addressing security and compliance concerns. This is particularly important given the sensitive nature of contract information. The use of Amazon Bedrock, which is described as providing "security, privacy, and responsible AI" capabilities, suggests that data does not leave the AWS environment and is not used for model training by the model provider, though this is not explicitly stated.

The human validation requirement also serves as a compliance control, ensuring that automated analysis does not directly drive decisions without expert review. However, the case study doesn't detail specific regulatory requirements that were addressed, audit capabilities, or how the system maintains records of processing decisions for future legal review.

## Comparative Assessment and Industry Context

This implementation represents a sophisticated production deployment of LLMs for document processing and analysis. The multi-stage pipeline architecture, integration with existing business systems, and human-in-the-loop validation demonstrate mature LLMOps practices. The use of managed AWS services provides operational simplicity at the cost of some vendor lock-in.

Compared to simple single-model deployments, this solution shows the complexity of real-world production systems that must handle varied document formats, integrate with existing workflows, provide escape hatches for edge cases, and maintain quality assurance. The emphasis on preprocessing quality and reference data comprehensiveness highlights that successful LLM deployments require substantial surrounding infrastructure beyond just model API calls.

The transformation of development processes through prompt engineering by domain experts represents an interesting organizational evolution, though it would be valuable to understand how Condé Nast governs and maintains quality control over prompt-based system development compared to traditional software development practices.

Overall, while the case study is promotional in nature and omits technical details that would enable complete assessment, it presents a credible example of production LLM deployment in a high-stakes business domain. The reported benefits of reduced processing time, improved accuracy, and enhanced scalability are consistent with successful enterprise AI implementations, and the architecture demonstrates thoughtful consideration of reliability, validation, and integration requirements for production systems.