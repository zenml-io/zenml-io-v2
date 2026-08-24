---
title: "Synthetic Medical Record Generation for Healthcare AI Evaluation"
slug: "synthetic-medical-record-generation-for-healthcare-ai-evaluation"
draft: false
llmopsTags:
  - "healthcare"
  - "high-stakes-application"
  - "unstructured-data"
  - "document-processing"
  - "classification"
  - "prompt-engineering"
  - "agent-based"
  - "human-in-the-loop"
  - "harness-engineering"
  - "evals"
  - "chunking"
  - "documentation"
industryTags: "healthcare"
company: "Anterior"
summary: "Anterior, a clinician-led AI company building agents for healthcare administrative workflows, faced the challenge of needing high-quality medical record data for evaluation while being unable to retain protected health information (PHI) due to regulatory constraints. The company developed a sophisticated synthetic data generation pipeline that reverses their inference workflow: starting with sampled labels and reasoning traces from symbolic policy representations, they use LLMs in a coarse-to-fine pattern to progressively generate patient journeys and medical documents. This approach enables diverse data generation while maintaining clinical fidelity. The pipeline produces synthetic data that clinicians can distinguish from real records only 60% of the time in blind reviews, and approximately 90% of their evaluation datasets now consist of synthetic data, enabling high production accuracy across multiple customer deployments without depending on real PHI."
link: "https://www.youtube.com/watch?v=XAsb7MIAzm8"
year: 2026
seo:
  title: "Anterior: Synthetic Medical Record Generation for Healthcare AI Evaluation - ZenML LLMOps Database"
  description: "Anterior, a clinician-led AI company building agents for healthcare administrative workflows, faced the challenge of needing high-quality medical record data for evaluation while being unable to retain protected health information (PHI) due to regulatory constraints. The company developed a sophisticated synthetic data generation pipeline that reverses their inference workflow: starting with sampled labels and reasoning traces from symbolic policy representations, they use LLMs in a coarse-to-fine pattern to progressively generate patient journeys and medical documents. This approach enables diverse data generation while maintaining clinical fidelity. The pipeline produces synthetic data that clinicians can distinguish from real records only 60% of the time in blind reviews, and approximately 90% of their evaluation datasets now consist of synthetic data, enabling high production accuracy across multiple customer deployments without depending on real PHI."
  canonical: "https://www.zenml.io/llmops-database/synthetic-medical-record-generation-for-healthcare-ai-evaluation"
  ogTitle: "Anterior: Synthetic Medical Record Generation for Healthcare AI Evaluation - ZenML LLMOps Database"
  ogDescription: "Anterior, a clinician-led AI company building agents for healthcare administrative workflows, faced the challenge of needing high-quality medical record data for evaluation while being unable to retain protected health information (PHI) due to regulatory constraints. The company developed a sophisticated synthetic data generation pipeline that reverses their inference workflow: starting with sampled labels and reasoning traces from symbolic policy representations, they use LLMs in a coarse-to-fine pattern to progressively generate patient journeys and medical documents. This approach enables diverse data generation while maintaining clinical fidelity. The pipeline produces synthetic data that clinicians can distinguish from real records only 60% of the time in blind reviews, and approximately 90% of their evaluation datasets now consist of synthetic data, enabling high production accuracy across multiple customer deployments without depending on real PHI."
notion:
  pageId: "3c6f8dff-2538-8072-aed6-cd015da4804e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-24T09:06:00.000Z"
  lastEditedTime: "2026-08-24T09:06:00.000Z"
  publishedAt: "2026-08-24T09:28:03Z"
---

## Overview

Anterior is a clinician-led AI company backed by Sequoia and NEA that builds AI agents for high-stakes healthcare administrative workflows in production, including prior authorization, payment integrity, and HEDIS measures. The company's work primarily involves policy-guided decision-making over highly unstructured medical data, particularly scanned fax bundles containing medical records. Approximately 70% of medical communication in healthcare still occurs via fax, making this the primary data format they work with. The case study presents a comprehensive approach to synthetic data generation that addresses a critical LLMOps challenge: the need for large-scale evaluation datasets when the most valuable data cannot be retained due to regulatory constraints.

## The Core Problem

The fundamental challenge Anterior faces is that healthcare demands exceptionally high accuracy baselines—95% is considered insufficient. Meeting these standards requires extensive evaluation on realistic medical records that capture the long tail of rare cases and nuanced scenarios. Medical records are information-dense, present in various formats including handwritten notes, tables, checkboxes, key-value pairs, and images, and model entire clinical trajectories where every patient's journey differs significantly.

However, these medical records are protected health information (PHI), subject to strict regulations. Anterior's contracts prohibit them from retaining, reusing, or deriving information from this data. Even redacting, anonymizing, or keeping derivative copies is completely prohibited. This creates an impossible situation: the dataset they need most for building robust evaluation systems is the data they're least allowed to keep. Nothing survives in any persistent dataset.

## The Synthetic Data Solution

Anterior's solution centers on synthetic generation of medical records that can be used for evaluation purposes. While synthetic data generation has become a hot topic, with frontier labs using it for continued pre-training, reinforcement learning, and agent development, Anterior recognized that simply using LLMs to generate synthetic data in a straightforward manner presents significant challenges, especially at scale.

The key problems with naive LLM-based synthetic generation include difficulty generating diverse, realistic records, particularly when attempting to one-shot the entire process. Medical records often exceed 300 pages—comparable to asking an LLM to write a novel in one shot. Additionally, LLMs suffer from mode collapse when generating diverse, creative data, primarily due to limited exposure to medical records in pre-training corpora and because current pre-training and post-training objectives incentivize being helpful rather than creative or diverse.

## The Reverse Inference Approach

Anterior's innovative approach involves reversing their forward inference workflow. Their production workflows start with unstructured data and a policy, execute the policy against the data following a reasoning trace, and arrive at an outcome or label. The synthetic generation pipeline reverses this: it starts by sampling a random label, determines a reasoning trace for that label, and then generates data backwards from those inputs.

This reverse approach provides critical advantages. By sampling labels and reasoning traces with sufficient diversity, the generated data becomes conditioned on diverse inputs, circumventing the mode collapse problem. The distribution sampled from policies provides a much more uniform and effective prior than what emerges naturally from LLM generation.

## Policy Representation and Symbolic Reasoning

A crucial enabler of this approach is Anterior's explicit modeling of policies as symbolic decision trees. Healthcare policies, such as those determining medical necessity for devices like CPAP machines, outline diverse conditions under which outcomes should be approved or rejected. These function as decision trees with multiple branches representing different clinical scenarios.

Anterior invests significant engineering effort in modeling these policies symbolically, which provides better accuracy and consistency when executing them in LLM-based workflows. The symbolic representation enables deterministic sampling of different reasoning traces for any given outcome, providing the diverse conditioning inputs needed for medical record generation. This sampling approach allows testing for far more scenarios than would likely appear in production data, addressing the problem that even a 95% score on 200 production cases reveals nothing about performance on rare edge cases outside that distribution.

## The Generation Pipeline Architecture

The synthetic data generation pipeline follows a coarse-to-fine pattern that progressively builds medical records layer by layer, using LLMs throughout but in a structured, controlled manner:

**Patient Invariants**: The pipeline begins by creating foundational patient characteristics—biological sex, birth date, blood group—that remain constant throughout a patient's life.

**Patient Journey Generation**: Using the invariants and a reasoning trace, an LLM produces an ordered list of events and provider encounters the patient experienced. This creates a high-level overview in natural language of what the patient went through across their lifespan.

**Document Planning**: Since real-world documentation is primarily generated during provider encounters, the pipeline models this explicitly. For each encounter in the patient journey, the system generates a document plan.

**Document Generation**: Based on the document plan and the preceding patient history, the pipeline fans out to generate actual documents, hydrating them with synthetic medical information. This fan-out architecture is crucial for scalability.

**Refinement Loop**: A set of evaluation models provides feedback to improve specific parts of generated documents. One key evaluation is an LLM-based consistency check across all documents, ensuring no contradictions or conflicting information exists between independently generated documents.

The coarse-to-fine layering serves multiple critical purposes. It keeps prompt payloads token-efficient from both input and output perspectives, enables scaling across longer patient journeys without overloading context windows, and allows parallel document generation while maintaining overall coherence through consistency checking.

## Automated Label Generation and Round-Trip Validation

An elegant property of this approach is that because the pipeline starts with sampled labels and reasoning traces, it can perform round-trip validation. After generating medical records, the system can run its original task against the generated data and compare the output against the initial labels. This validates that the generated data aligns with the intended task inputs and outputs, providing correct labels by construction without expensive manual annotation processes. This built-in validation mechanism significantly reduces the cost and time required for dataset creation.

## Text-Domain Generation Strategy

All generation occurs in plain text and markdown format rather than rendered PDFs. Anterior made a deliberate decision not to invest in generating realistic-looking PDF renderings because state-of-the-art PDF parsers can already convert complex PDFs into markdown representations effectively. This means the entire synthetic generation and evaluation process operates in the text domain, avoiding unnecessary complexity while focusing on the content that matters for their production systems.

## Clinician Ownership and Human-in-the-Loop

A fundamental principle underlying Anterior's approach is that domain experts, not AI engineers, should own the data pipeline. AI engineers lack the expertise to determine what constitutes a good medical record, so clinicians must make these determinations. Anterior implements this through two mechanisms:

**Interactive Steering**: Clinicians can interject at each point in the generation process with human-in-the-loop controls. At any stage, a clinician can steer generation to produce medical records matching their requirements. Clinicians commonly review interesting production cases, extract insights, and use the steering mechanisms to create similar cases for evaluation. This enables modeling failure cases either proactively or after observing them in production.

**Skills-Based Architecture**: The entire pipeline is modeled as a skills-based workflow running on a generic agent harness built internally. Every component—patient journey generation, document generation, document enrichment, evaluations—is implemented as a skill that runs on this harness. This architecture enables clinicians to make significant changes without engineering involvement. For example, adding support for a new document type or customizing intake forms for a new customer requires only creating a new skill file and attaching it to the pipeline. This skills-based interface proves valuable across many of Anterior's workflows, both for internal tools and production systems.

## Production Results and Impact

While Anterior currently uses synthetic data primarily for evaluation rather than training, the approach has delivered substantial benefits. Approximately 90% of their evaluation datasets now consist of synthetic data, which has enabled maintaining high production accuracy scores across many customer deployments.

The generated data achieves meaningful clinical fidelity. In blind reviews, clinicians could distinguish synthetic records from real records only 60% of the time—approaching the random chance threshold that would indicate indistinguishability, though with acknowledged room for improvement.

Perhaps most significantly, the ability to generate high-quality synthetic data on demand has transformed their deployment process. Datasets can now be created just-in-time for customer deployments. Rather than waiting for customers to provide data—which may lack coverage of important edge cases—Anterior can model all relevant edge cases, simulate them, and test workflows before going live. This dramatically accelerates deployment timelines and reduces risk, as systems can be thoroughly evaluated against comprehensive synthetic datasets that may actually cover more scenarios than limited production samples would provide.

## LLMOps Lessons and Recommendations

The case study offers several valuable insights for LLMOps practitioners building synthetic data pipelines:

**Reverse Workflows**: Consider reversing your inference workflow for generation. If your production system maps from data to outputs, try generating by sampling outputs first and working backwards to data.

**Diversity from Appropriate Distributions**: Ensure diversity is sampled from distributions appropriate to your use case rather than relying on LLM sampling alone. Symbolic representations, decision trees, or other structured approaches can provide better diversity than native LLM generation.

**Emulate Real Processes**: Try to emulate the actual process by which real data is generated. Anterior models how medical records are created during patient encounters, with each encounter producing specific documentation types. This structural fidelity improves realism.

**Empower Domain Experts**: Give domain experts the keys to the pipeline. In vertical AI applications, domain experts understand data quality and edge cases far better than AI engineers. Skills-based architectures or similar abstractions enable domain experts to iterate independently.

## Critical Assessment

The approach demonstrates sophisticated engineering and thoughtful design, but claims should be evaluated carefully. The 60% distinguishability rate in blind reviews is promising but indicates synthetic data isn't yet truly indistinguishable from real data. The company notes this is "room for improvement," which is fair, though it means generated data may not fully capture all the complexity and subtle patterns of real medical records.

The case study focuses on evaluation use cases rather than training, which is a more conservative and lower-risk application of synthetic data. This is appropriate given the high-stakes healthcare context, but it means questions about whether this synthetic data could effectively replace real data for model training remain open.

The reliance on symbolic policy representations is both a strength and a potential limitation. It enables excellent control and diversity sampling, but requires significant upfront investment in modeling policies symbolically. This may not generalize well to domains where such structured representations are harder to create or maintain.

The skills-based architecture enabling clinician ownership is architecturally elegant but requires organizational commitment to enabling non-engineers to work with these abstractions. The success of this approach depends on factors beyond pure technology—training, documentation, organizational culture, and ongoing support systems.

Overall, the case study represents a mature, thoughtful approach to a genuine LLMOps challenge in a highly regulated domain. The solution demonstrates sophisticated orchestration of multiple LLM calls with careful attention to token efficiency, consistency validation, and domain expert involvement. While some claims around data quality could benefit from more rigorous quantitative evaluation beyond blind reviews, the practical impact—enabling 90% synthetic datasets supporting production deployments—suggests the approach delivers meaningful value in practice.
