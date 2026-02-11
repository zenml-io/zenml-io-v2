---
title: "Fact-Centric Legal Document Review with Custom AI Pipeline"
slug: "fact-centric-legal-document-review-with-custom-ai-pipeline"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69510936e829454783efea72"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-28T10:51:50.812Z"
  createdOn: "2025-12-28T10:40:54.565Z"
llmopsTags:
  - "document-processing"
  - "classification"
  - "unstructured-data"
  - "high-stakes-application"
  - "structured-output"
  - "rag"
  - "embeddings"
  - "agent-based"
  - "multi-agent-systems"
  - "error-handling"
  - "chunking"
  - "api-gateway"
  - "monitoring"
  - "guardrails"
  - "reliability"
  - "openai"
industryTags: "legal"
company: "Mary Technology"
summary: "Mary Technology, a Sydney-based legal tech firm, developed a specialized AI platform to automate document review for law firms handling dispute resolution cases. Recognizing that standard large language models (LLMs) with retrieval-augmented generation (RAG) are insufficient for legal work due to their compression nature, lack of training data access for sensitive documents, and inability to handle the nuanced fact extraction required for litigation, Mary built a custom \"fact manufacturing pipeline\" that treats facts as first-class citizens. This pipeline extracts entities, events, actors, and issues with full explainability and metadata, allowing lawyers to verify information before using downstream AI applications. Deployed across major firms including A&O Shearman, the platform has achieved a 75-85% reduction in document review time and a 96/100 Net Promoter Score."
link: "https://www.youtube.com/watch?v=cptduBASjRU"
year: 2025
seo:
  title: "Mary Technology: Fact-Centric Legal Document Review with Custom AI Pipeline - ZenML LLMOps Database"
  description: "Mary Technology, a Sydney-based legal tech firm, developed a specialized AI platform to automate document review for law firms handling dispute resolution cases. Recognizing that standard large language models (LLMs) with retrieval-augmented generation (RAG) are insufficient for legal work due to their compression nature, lack of training data access for sensitive documents, and inability to handle the nuanced fact extraction required for litigation, Mary built a custom \"fact manufacturing pipeline\" that treats facts as first-class citizens. This pipeline extracts entities, events, actors, and issues with full explainability and metadata, allowing lawyers to verify information before using downstream AI applications. Deployed across major firms including A&O Shearman, the platform has achieved a 75-85% reduction in document review time and a 96/100 Net Promoter Score."
  canonical: "https://www.zenml.io/llmops-database/fact-centric-legal-document-review-with-custom-ai-pipeline"
  ogTitle: "Mary Technology: Fact-Centric Legal Document Review with Custom AI Pipeline - ZenML LLMOps Database"
  ogDescription: "Mary Technology, a Sydney-based legal tech firm, developed a specialized AI platform to automate document review for law firms handling dispute resolution cases. Recognizing that standard large language models (LLMs) with retrieval-augmented generation (RAG) are insufficient for legal work due to their compression nature, lack of training data access for sensitive documents, and inability to handle the nuanced fact extraction required for litigation, Mary built a custom \"fact manufacturing pipeline\" that treats facts as first-class citizens. This pipeline extracts entities, events, actors, and issues with full explainability and metadata, allowing lawyers to verify information before using downstream AI applications. Deployed across major firms including A&O Shearman, the platform has achieved a 75-85% reduction in document review time and a 96/100 Net Promoter Score."
---

## Overview

Mary Technology is a legal technology company based in Sydney, Australia, with a growing global presence. The company focuses specifically on automating document review for law firms handling dispute resolution and litigation cases. This case study is particularly valuable from an LLMOps perspective because it demonstrates a critical lesson: not all production AI problems can be solved by standard LLM approaches, even with modern techniques like RAG or agentic frameworks. The presentation, delivered by CEO and co-founder Dan, argues that legal document review for disputes requires a fundamentally different architecture than typical LLM-based systems.

The core thesis is that while large language models are powerful generalist tools, they are fundamentally "compression machines" that strip away the precise nuance and meaning required for legal work. Mary's solution involves building a specialized "fact manufacturing pipeline" that processes legal documents through multiple stages to create a persistent, auditable fact layer. This fact layer then feeds into traditional LLM-based tools for downstream applications like drafting and analysis. The company reports significant production results, including 75-85% time reduction in document review processes and an exceptionally high 96/100 Net Promoter Score from customers including major firms like A&O Shearman.

## The Problem: Why Standard LLMs Fail for Legal Document Review

Dan identifies four fundamental problems with using standard LLMs for legal dispute resolution work, providing important insights for LLMOps practitioners about the limitations of general-purpose models in specialized domains.

**Training Data Availability**: Legal documents involved in disputes are highly sensitive and contain confidential information from law firms' clients or internal employees. This data is not publicly available and cannot be collected for training purposes without violating confidentiality obligations. This represents a critical constraint that prevents the usual fine-tuning or domain adaptation approaches that might be used in other industries. The inability to leverage sensitive training data means that pre-trained models lack the specific understanding of the types of documents, terminology, and patterns common in dispute resolution.

**Absence of Single Right Answers**: Unlike many machine learning problems where there's a clear ground truth, legal disputes inherently involve multiple perspectives. There are at least two sides to every matter, each with their own narrative and interpretation of facts. This means you cannot simply train a model to converge toward "the right answer" as you might with traditional supervised learning. The system must be capable of understanding and representing all potential narratives depending on which side is being represented. This fundamentally challenges the typical LLM fine-tuning paradigm.

**Compression Loss of Critical Meaning**: Dan describes LLMs as fundamentally "compression machines" and walks through the multiple layers of compression that occur when processing legal documents. The pipeline starts with converting document pages to images, then extracting text from those images (which loses formatting, handwritten notes, and visual context), then converting to tokens, then to embeddings, then contextual compression, and finally chunking and summarization. Each layer strips away meaning and nuance that may be legally significant. For instance, handwritten notes in margins, specific formatting, crossed-out text, or the physical presentation of information can all carry legal weight. The compression inherent in LLM processing destroys this information before it can be properly analyzed.

**Facts Are Not Directly Present in Raw Data**: This is perhaps the most subtle but important problem Dan identifies. Legal "facts" are not simply text strings that can be extracted from documents. They require interpretation, disambiguation, cross-referencing, and contextualization. Dan provides several compelling examples: a reference to "A. Smith" might refer to Alice or Andrew Smith, requiring entity resolution across the entire corpus; dates formatted as "5/3/2025" could mean May 3rd or March 5th depending on regional conventions and matter context; the term "PT" in medical records means "patient" but needs to be resolved to the actual person's name; facts may be mentioned multiple times across documents with potential contradictions that need reconciliation; and the provenance of a fact (whether from primary evidence, hearsay, or different document types) affects its legal weight.

## The Architectural Approach: Fact-First Pipeline

Rather than applying LLMs directly to documents, Mary has built what they call a "fact manufacturing pipeline" that treats facts as first-class objects in the system architecture. This represents a significant departure from typical RAG or agentic approaches.

The core architectural principle is to create a structured fact layer before applying any LLM-based reasoning. This involves intensive, specialized processing that Dan acknowledges "large language models simply don't like because it's incredibly process heavy and it's not a generalized task, it's very specific." The pipeline extracts every event, entity, actor, issue, and other relevant elements from documents, then processes these through multiple stages to create what Dan describes as "a digital case as an object."

Each fact is represented as an object with extensive metadata underneath it. This metadata enables relationship building between facts and supports construction of the entire case as a structured object graph. Critically, every piece of metadata must be explainable—if the system makes any decision or inference (determining a date, identifying relevance, resolving an entity), it must surface the rationale and evidence for that decision. This explainability requirement is essential for the legal domain where attorneys have professional obligations to verify information before filing documents with courts or opposing parties.

The fact layer includes logic for identifying contradictions between facts extracted from different documents. This is crucial in litigation where conflicting accounts and evidence are common. The system doesn't just extract information; it analyzes relationships and flags potential conflicts that require human review.

Only after this high-quality fact layer is constructed does Mary then employ more standard AI technologies like RAG and agentic frameworks. The LLMs work on top of the structured fact layer rather than directly on raw documents. This creates a persistent, auditable fact foundation that can be reliably used both within Mary's platform for investigation work and piped downstream to other AI applications for drafting, analysis, or other legal tasks.

## Technical Capabilities and Processing

While Dan doesn't provide exhaustive technical implementation details, the presentation and demo reveal several key capabilities that illustrate the production system's sophistication.

**Document Processing and Organization**: The system automatically processes documents received via email or uploaded through existing legal workflow tools. It handles bundled files, splitting them into individual structured documents, categorizing and renaming them, and organizing them back into the user's workflow. This suggests integration capabilities with common legal practice management systems.

**Optical Character Recognition and Handwriting**: The demo shows processing of handwritten medical records with challenging handwriting. The system can perform OCR on handwritten text and cross-reference handwriting patterns across documents to potentially identify authorship. This is particularly important for dispute resolution where handwritten notes, signatures, and informal documents often carry significant evidentiary weight.

**Entity Extraction and Resolution**: The system extracts entities including names, businesses, and their roles in cases. Critically, it performs entity resolution—understanding when "A. Smith," "Alice Smith," and "Smith" all refer to the same person, or distinguishing between multiple people with similar names. The demo shows how "PT" in medical records is resolved to "Rowan McNamee" (the actual patient name) rather than being left as an ambiguous abbreviation. This disambiguation is essential for accurate fact construction and downstream querying.

**Temporal Processing**: The system extracts dates and times from various formats and resolves ambiguities. It understands regional date conventions and uses case context to determine which interpretation is likely correct. It can construct timelines of events across documents, providing chronological views of case developments.

**Relevance Assessment**: Each extracted fact receives a relevance assessment with explanation. The demo shows a fact assessed as not relevant because "the entry focuses on a separate medical issue" from the core matter. Lawyers can quickly scan facts, see relevance judgments, but also drill down to examine the original source and reasoning if they believe something marked irrelevant might actually matter.

**Gap Detection and Data Leak Identification**: The platform identifies gaps in evidence that need assessing and can detect possible data leaks. This suggests analytical capabilities beyond simple extraction—the system understands what information should be present for different case types and flags anomalies.

**Case Summarization**: The system generates concise case summaries that distill entire matters into a few clear paragraphs, giving any team member the ability to understand a case in minutes even if they've never seen it before.

**Collaborative Features**: The platform supports real-time collaboration between lawyers, colleagues, and external experts. Users can draft directly into their existing tools, suggesting integration with word processors and other legal software.

**Dynamic Updates**: The system adapts as new evidence, events, and documents emerge, keeping the case representation aligned with current information. This implies some form of incremental processing and fact graph updating rather than batch-only processing.

## The User Experience and Verification Workflow

A critical aspect of Mary's LLMOps approach is the emphasis on human verification rather than autonomous decision-making. Dan illustrates this with a thought experiment: if an LLM produced a "perfect letter of demand" claiming to be ideal and fully supported by evidence, would a lawyer file it with the court? The correct answer (confirmed by the lawyer in the audience) is no—attorneys have professional obligations to verify information and must be personally confident in any submissions they make.

This illustrates a fundamental difference between legal LLM applications and consumer-facing AI assistants. The system cannot simply provide answers; it must provide a "world-class review and verification experience" that allows lawyers to build confidence in the facts and narratives they're constructing.

The user interface shown in the demo reflects this philosophy. Facts are presented in concise, scannable form—necessary because lawyers need to review many facts quickly to identify which ones are relevant. However, each fact is expandable to show: the exact page and location in source documents where the fact originated; additional details and variations of how the fact could be expressed; and complete rationale for any decisions the system made (why dates were interpreted a certain way, why relevance was assessed at a particular level, how entities were resolved).

This design enables what Dan describes as the lawyer's real need: "not something that knows what the question's going to be, yet can understand all of the facts and give you all of the potential narratives for you yourself to review and verify and become confident in." The system is built for exploration and verification rather than question-answering.

## Production Deployment and Results

Mary Technology has achieved meaningful production deployment with quantifiable results, which is particularly notable given the conservative, high-stakes nature of the legal industry.

The platform is being used by many of the largest law firms in Australia, including A&O Shearman (one of the largest law firms globally with presence in Australia, UK, and elsewhere). The company is onboarding new firms weekly, suggesting growing market adoption.

The reported 75-85% reduction in time spent on document review represents massive operational improvement. Document review is described as "probably the biggest bottleneck in litigation" where "so much of the time is spent" and "so much of the cost is accrued." Given that large litigation cases can involve thousands of documents and consume hundreds or thousands of attorney hours in review, this level of time reduction translates to substantial cost savings and faster case progression.

The 96/100 Net Promoter Score is exceptionally high and suggests genuine user satisfaction. Dan attributes this to the fact that document review is "one of the most difficult, annoying, frustrating jobs that you can do as part of this process." The high NPS indicates the system is actually being adopted by working lawyers rather than being imposed by management—a critical distinction in professional services where tools that don't genuinely help tend to be abandoned regardless of executive mandates.

## Critical Assessment and Balanced Perspective

While Mary's approach appears technically sound and the reported results are impressive, several considerations are worth noting for a balanced assessment:

**Validation of Claims**: The presentation is fundamentally a sales pitch delivered at what appears to be a conference or demo day. While the 75-85% time reduction and 96/100 NPS are specific claims, there's no detail provided about how these metrics were measured, over what time period, across how many cases or users, or whether they come from independent assessment or self-reporting. The A&O Shearman customer reference is valuable but limited details are provided about the specific use case or scale of deployment.

**Generalizability Concerns**: All of Dan's examples come from specific types of legal work—primarily personal injury cases and dispute resolution. While he claims the system works "for employment, any type of law you can do this with," different practice areas have vastly different requirements. Contract analysis, transactional work, regulatory compliance, and other legal domains may require different architectural approaches. The focus on unstructured, handwritten, and messy documents suggests the system is optimized for litigation discovery rather than other legal workflows.

**The Custom Pipeline Trade-off**: Mary's approach requires building and maintaining a complex custom processing pipeline rather than leveraging off-the-shelf LLM capabilities. This has several implications: significant engineering investment required to build and maintain the pipeline; potentially slower adaptation to new LLM capabilities as they emerge (since they're only used for the final layer); possible challenges scaling to new document types or legal jurisdictions that may require pipeline modifications; and dependency on Mary's continued development rather than benefiting from ecosystem-wide improvements to general LLMs.

**Integration Complexity**: While the demo shows integration with existing legal tools, the presentation provides limited detail about how difficult these integrations are to implement and maintain. Legal technology ecosystems are often fragmented with numerous practice management systems, document management systems, and other tools. The extent to which Mary's platform truly "connects with your existing systems" may vary significantly across different firm technology stacks.

**The Explainability Question**: While Dan emphasizes that "every piece of that metadata has to be explainable," the demo shows relatively simple explanations ("the entry focuses on a separate medical issue"). In complex cases with subtle legal reasoning, the explanations provided by the system may not be sufficiently detailed for attorneys to fully verify the system's judgments. There's a potential risk that users might trust "explained" decisions without truly verifying them if the explanations sound plausible but aren't actually complete.

**Comparison with RAG Approaches**: Dan's critique of standard RAG systems for legal work is compelling, but it's worth noting that RAG implementations can vary significantly in sophistication. Advanced RAG systems with proper entity resolution, metadata extraction, and multi-stage processing might close some of the gap Mary identifies, though perhaps not completely. The presentation positions Mary's approach as categorically different, but the boundary between "sophisticated RAG with heavy preprocessing" and "fact layer with LLM on top" may be more blurred than suggested.

**The Human Verification Bottleneck**: While Mary reduces document review time substantially, the architecture still requires human verification of facts—this is actually a design principle rather than a limitation. However, this means the system cannot fully eliminate the bottleneck; it can only reduce it. In extremely large cases with tens of thousands of documents, even with 80% time reduction, the remaining review work may still be substantial.

## LLMOps Lessons and Implications

This case study offers several valuable lessons for LLMOps practitioners:

**Domain Requirements May Override General Capabilities**: The legal domain's specific requirements around explainability, verification, nuance preservation, and adversarial contexts mean that general-purpose LLMs, even with techniques like RAG, may be fundamentally insufficient. Other high-stakes domains (healthcare, safety-critical systems, financial compliance) may have similar characteristics requiring specialized architectures.

**Compression-Aware Design**: Understanding that LLMs are "compression machines" and designing systems that preserve critical information before that compression occurs is important for applications where detail matters. This might mean structured extraction pipelines, preservation of document metadata and formatting, or hybrid architectures that combine structured and unstructured processing.

**Explainability as a First-Class Requirement**: In professional contexts where users have legal or regulatory obligations, explainability cannot be an afterthought or nice-to-have feature. Building systems where every decision has accessible rationale may require fundamental architectural choices about how information flows through the system.

**Facts as Structured Objects**: Treating domain entities (in this case, legal facts) as first-class objects with rich metadata and relationships, rather than as text to be embedded and retrieved, may be necessary for complex reasoning tasks. This suggests a role for knowledge graphs, entity resolution systems, and structured data models even in LLM-centric applications.

**Layered Architecture**: Mary's approach of building a structured fact layer and then applying LLMs on top of that layer (rather than having LLMs work directly on raw data) represents an interesting architectural pattern. This separation of concerns—specialized processing for extraction and structuring, general LLMs for reasoning and generation—may be applicable in other domains.

**Verification UX Design**: For high-stakes applications, the user experience must be designed around verification and confidence-building rather than just answer delivery. This means providing drill-down capabilities, source linking, explanation access, and tools for users to explore and validate system outputs rather than simply accept them.

**Integration Over Replacement**: Mary's system is designed to work with existing legal workflows and tools rather than replacing them entirely. This integration-first approach may be more practical for deploying AI in conservative industries with established toolchains.

Overall, Mary Technology's case study demonstrates that production LLM systems in specialized, high-stakes domains may require fundamentally different architectures than consumer applications or general knowledge work tools. The fact-centric pipeline approach, emphasis on explainability and verification, and treatment of LLMs as one component in a larger system rather than the core intelligence offer valuable patterns for LLMOps practitioners working in similar contexts.