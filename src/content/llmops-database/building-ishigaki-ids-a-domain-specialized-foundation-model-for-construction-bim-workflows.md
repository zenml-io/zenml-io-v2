---
title: "Building Ishigaki-IDS: A Domain-Specialized Foundation Model for Construction BIM Workflows"
slug: "building-ishigaki-ids-a-domain-specialized-foundation-model-for-construction-bim-workflows"
draft: false
llmopsTags:
  - "structured-output"
  - "document-processing"
  - "fine-tuning"
  - "reinforcement-learning"
  - "instruction-tuning"
  - "model-optimization"
  - "evals"
  - "pytorch"
  - "amazon-aws"
  - "nvidia"
  - "hugging-face"
industryTags: "other"
company: "ONESTRUCTION"
summary: "ONESTRUCTION, a construction technology startup, developed Ishigaki-IDS, a foundation model specialized for generating IDS (Information Delivery Specifications) files used in BIM (Building Information Modeling) workflows in the construction industry. The challenge was to build a domain-specialized model in a data-scarce field where IDS is a relatively new standard published in 2024, requiring specialized knowledge of IFC vocabulary and XML grammar. With technical advisory from AWS GenAIIC, ONESTRUCTION implemented a three-stage training pipeline (continued pre-training with synthetic data, supervised fine-tuning, and reinforcement learning with verifiable rewards) built on Qwen3 models and trained on AWS infrastructure using Amazon EC2 P5en instances with NVIDIA H200 GPUs orchestrated by AWS ParallelCluster. The model achieved near-100% compliance on XML and IDS structural validation and over 80% on content consistency, significantly outperforming general frontier models which scored under 25% on IDS structural compliance and near 0% on content consistency."
link: "https://aws.amazon.com/blogs/machine-learning/how-onestruction-built-the-ishigaki-ids-foundation-model-with-aws-genaiic/"
year: 2026
seo:
  title: "ONESTRUCTION: Building Ishigaki-IDS: A Domain-Specialized Foundation Model for Construction BIM Workflows - ZenML LLMOps Database"
  description: "ONESTRUCTION, a construction technology startup, developed Ishigaki-IDS, a foundation model specialized for generating IDS (Information Delivery Specifications) files used in BIM (Building Information Modeling) workflows in the construction industry. The challenge was to build a domain-specialized model in a data-scarce field where IDS is a relatively new standard published in 2024, requiring specialized knowledge of IFC vocabulary and XML grammar. With technical advisory from AWS GenAIIC, ONESTRUCTION implemented a three-stage training pipeline (continued pre-training with synthetic data, supervised fine-tuning, and reinforcement learning with verifiable rewards) built on Qwen3 models and trained on AWS infrastructure using Amazon EC2 P5en instances with NVIDIA H200 GPUs orchestrated by AWS ParallelCluster. The model achieved near-100% compliance on XML and IDS structural validation and over 80% on content consistency, significantly outperforming general frontier models which scored under 25% on IDS structural compliance and near 0% on content consistency."
  canonical: "https://www.zenml.io/llmops-database/building-ishigaki-ids-a-domain-specialized-foundation-model-for-construction-bim-workflows"
  ogTitle: "ONESTRUCTION: Building Ishigaki-IDS: A Domain-Specialized Foundation Model for Construction BIM Workflows - ZenML LLMOps Database"
  ogDescription: "ONESTRUCTION, a construction technology startup, developed Ishigaki-IDS, a foundation model specialized for generating IDS (Information Delivery Specifications) files used in BIM (Building Information Modeling) workflows in the construction industry. The challenge was to build a domain-specialized model in a data-scarce field where IDS is a relatively new standard published in 2024, requiring specialized knowledge of IFC vocabulary and XML grammar. With technical advisory from AWS GenAIIC, ONESTRUCTION implemented a three-stage training pipeline (continued pre-training with synthetic data, supervised fine-tuning, and reinforcement learning with verifiable rewards) built on Qwen3 models and trained on AWS infrastructure using Amazon EC2 P5en instances with NVIDIA H200 GPUs orchestrated by AWS ParallelCluster. The model achieved near-100% compliance on XML and IDS structural validation and over 80% on content consistency, significantly outperforming general frontier models which scored under 25% on IDS structural compliance and near 0% on content consistency."
notion:
  pageId: "3bcf8dff-2538-809d-a875-c10926a84d81"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-14T06:40:00.000Z"
  lastEditedTime: "2026-08-14T06:40:00.000Z"
  publishedAt: "2026-08-14T06:53:44Z"
---

## Overview

ONESTRUCTION, a construction technology startup focused on solving industry problems through openBIM, partnered with AWS Generative AI Innovation Center (GenAIIC) to build Ishigaki-IDS, a foundation model specialized for construction industry BIM workflows. The project was developed as part of GENIAC (Generative AI Accelerator Challenge) Phase 3 and represents an interesting case study in building domain-specialized foundation models for data-scarce fields.

The business context centers on Japan's construction sector labor shortage and the national-level promotion of BIM as a solution. BIM enables design, construction, and maintenance teams to share information through digital representations of buildings. However, BIM adoption has been slow due to the specialist knowledge required, particularly around IDS (Information Delivery Specifications), an XML-based standard that defines and validates information attached to BIM models (specifically IFC/Industry Foundation Classes models). The barrier to entry for authoring IDS files—which requires fluency in its grammar plus knowledge of IFC and its rules—was high enough that ONESTRUCTION saw an opportunity for AI to democratize access.

## Domain Challenges

The case study explicitly identifies three technical challenges that shaped the LLMOps approach. First, data scarcity was a fundamental constraint. IDS is a relatively new standard published in 2024, and construction as a domain has limited public web content compared to fields like finance, healthcare, or law where billions to hundreds of billions of tokens are available for training. Even after collecting recent web data, the volume was insufficient and lacked the depth needed for the model to pick up adequate context about IDS and related topics.

Second, the model needed to learn an IFC vocabulary comprising several thousand terms with specific mappings (e.g., "beam" to IfcBeam, "air conditioner" to IfcUnitaryEquipment). Historically this mapping was done manually by domain experts, and the model needed to internalize this directly.

Third, IDS has specialized grammar beyond plain XML. Its tag structure varies depending on what information is being attached or validated, requiring repeated patterns and dedicated tags that general-purpose foundation models struggle to produce accurately.

## Solution Architecture

ONESTRUCTION built Ishigaki-IDS on top of Qwen3, an open-source LLM from Alibaba Cloud known for strong multilingual capabilities. The choice of Qwen3 was strategic due to its availability in multiple parameter sizes (8B, 14B, 32B), allowing the team to experiment at smaller scales before committing to full training runs at 32B parameters. This scaling flexibility is a practical LLMOps consideration for resource-constrained projects.

The training infrastructure leveraged AWS cloud services in a carefully orchestrated configuration. The core compute consisted of two Amazon EC2 P5en.48xlarge instances equipped with NVIDIA H200 Tensor Core GPUs. Orchestration was handled by AWS ParallelCluster, an open-source tool that simplifies deploying and managing HPC clusters on AWS. Data storage utilized Amazon FSx for Lustre, a fully managed file system optimized for compute-intensive workloads that delivers sub-millisecond latencies and high throughput. This architecture provided stable multi-node distributed training with parallel access to large datasets, addressing a critical operational requirement for foundation model training.

## Three-Stage Training Pipeline

The most technically interesting aspect of this case study is the three-stage training pipeline designed to address the domain challenges.

**Continued Pre-Training (CPT):** In the first stage, the team injected IDS and IFC domain knowledge using a combination of web corpora and synthetic data created with internal domain experts. The synthetic data generation strategy was crucial given the data scarcity problem. The team generated valid IDS files at scale and built synthetic datasets that explained IDS-related documents from multiple angles. Notably, synthetic data covered most of the training corpus—a bold approach that reflects the severity of the data scarcity problem. The case study emphasizes that synthetic data quality mattered more than quantity, and that domain expert involvement in synthetic data creation was the critical differentiator for model performance.

**Supervised Fine-Tuning (SFT):** The second stage trained the model on pairs of IDS authoring instructions (in CSV or natural language) and their expected IDS output. This is a relatively standard SFT approach, but the case study acknowledges that SFT alone produced expected issues such as plausible but incorrect XML tag choices and wrong attribute values. This honest assessment suggests the team had realistic expectations about what each training stage could and couldn't accomplish.

**Reinforcement Learning with Verifiable Rewards (RLVR):** The third stage is where the LLMOps innovation becomes particularly clear. Instead of using human feedback or model-based rewards (as in RLHF or similar approaches), the team used IDS-Audit-Tool from buildingSMART, the international standards body, as the reward function. This tool checks XML well-formedness, IDS structural validity, and semantic consistency, providing mechanical correctness signals that the model could iterate against. The verifiable nature of these rewards is significant—they're deterministic, reproducible, and directly aligned with the acceptance criteria for production use. The case study argues that RLVR fits the IDS task well because it refines output quality without requiring large amounts of supervised data, which is particularly valuable in data-poor domains. The team's lesson learned reinforced this: verifiable rewards accelerated iteration faster than manual evaluation would allow.

## Collaborative Development Process

The case study describes a structured collaboration between ONESTRUCTION and AWS GenAIIC with biweekly technical advisory sessions. At each milestone, ONESTRUCTION brought training results and evaluation data, and together the teams worked through five key areas: training data design (synthetic data strategies and data mix balancing across CPT, SFT, and RLVR stages), evaluation benchmarks (metrics covering IFC and IDS knowledge, structured generation, and general dialogue ability), training stages and techniques (refining CPT, SFT, and RLVR including long-context handling, reward shaping, and structured generation), training infrastructure (parallelization, throughput, and stability for distributed training), and result diagnosis (diagnosing root causes when issues appeared and setting direction for the next iteration).

This iterative, milestone-driven approach with external technical advisory represents a practical LLMOps pattern for organizations that have domain expertise but may not have deep in-house expertise in foundation model training. The structured cadence allowed the team to course-correct based on concrete results rather than theoretical assumptions.

## Evaluation and Benchmarking

ONESTRUCTION built IDS-Bench, a custom evaluation benchmark developed with their internal IDS specialists. IDS-Bench measures performance across multiple dimensions: IFC version, construction discipline (architecture, structure, MEP, and common), language (Japanese and English), and the Implement, Structure, and Content axes. This multi-dimensional evaluation reflects what the model needs to handle in real work, rather than generic benchmarks that might not correlate with actual use case performance.

The results showed Ishigaki-IDS scoring close to 100% on XML structural compliance and IDS structural compliance, and above 80% on IDS content consistency. By contrast, general frontier models produced well-formed XML but scored under approximately 25% on IDS structural compliance and near 0% on IDS content consistency. This stark performance gap validates the domain-specialization approach and suggests that general frontier models, despite their impressive capabilities on general tasks, lack the specialized knowledge and structural understanding required for niche technical domains like IDS.

The model also supports context-length scaling with YaRN (Yet another RoPE extensioN), which extends the context window of transformer models beyond their original training length without major performance degradation. The team confirmed that the model generates correctly with inputs and outputs up to approximately 120,000 tokens, which is important for handling complex BIM scenarios where large amounts of structured data need to be processed.

## Validation and User Feedback

Beyond benchmark performance, the case study describes a joint proof-of-concept with buildingSMART where both IDS specialists and non-specialists responded positively to using the model in their work. Importantly, users appreciated the model's ability to produce the intended IDS even from ambiguous prompts, which suggests the model has learned useful generalization rather than simply memorizing training examples. The users also provided suggestions for further development, which the team interpreted as reinforcing that the model is useful in practice.

This user validation is a critical component of LLMOps—quantitative benchmarks matter, but ultimately the model needs to be adopted and trusted by practitioners in real workflows. The inclusion of both specialists and non-specialists in the validation also aligns with the original goal of democratizing IDS authoring for those who aren't BIM specialists.

## Infrastructure and Operational Lessons

The case study identifies stable infrastructure as enabling experimentation freedom. The reliable distributed training on Amazon EC2 P5en instances, AWS ParallelCluster, and Amazon FSx for Lustre allowed the team to focus on model improvements rather than debugging cluster issues. This is a often-underappreciated aspect of LLMOps—infrastructure stability and reliability directly impact the velocity of experimentation and iteration.

The use of AWS ParallelCluster for orchestration is worth noting as it provides an abstraction layer that simplifies cluster management while still allowing access to powerful accelerator hardware. The choice of Amazon FSx for Lustre for high-throughput data access reflects an understanding that I/O can become a bottleneck in distributed training scenarios, particularly when dealing with large synthetic datasets.

## Critical Assessment

While the case study presents impressive results, a few areas warrant balanced consideration. First, the heavy reliance on synthetic data (covering "most of the training corpus") is both innovative and potentially risky. The case study emphasizes that quality matters more than quantity and that domain expert involvement was critical, but there's limited discussion of how the team validated that synthetic data accurately represents the distribution of real-world IDS authoring scenarios. Synthetic data can introduce biases or patterns that don't generalize to real use cases.

Second, while the IDS-Bench evaluation is comprehensive along multiple dimensions, the metrics are primarily measuring structural correctness and compliance rather than semantic usefulness or appropriateness for specific construction scenarios. The 80%+ content consistency score is strong, but the 20% gap raises questions about which types of errors remain and whether they're acceptable in production use.

Third, the case study doesn't discuss deployment considerations, inference optimization, or how the model is being served to end users. There's no mention of latency requirements, cost per inference, or how the model is integrated into ONESTRUCTION's existing product suite. These are important LLMOps considerations for production systems.

Fourth, the comparison to "general frontier models" is useful for demonstrating the value of domain specialization, but the case study doesn't provide details about which specific models were tested or how prompts were engineered for those comparisons. It's possible that with better prompt engineering or few-shot examples, general models could perform better than the reported ~0% content consistency, though likely still worse than the specialized model.

## Broader Implications

This case study demonstrates a viable pattern for building domain-specialized foundation models in data-scarce fields: start with a strong open-source base model, heavily invest in high-quality synthetic data generation with domain expert involvement, use a multi-stage training pipeline tailored to the specific challenges of the domain, leverage verifiable reward signals when available, and invest in stable training infrastructure to enable rapid iteration.

The RLVR approach using a standards body verification tool as the reward function is particularly transferable to other domains where mechanical correctness can be verified programmatically (e.g., code generation, database query generation, formal specification authoring). The pattern of using deterministic, reproducible verification tools as reward functions offers significant advantages over human feedback in terms of scalability and consistency.

The case study also validates the value of structured technical advisory partnerships. The biweekly cadence with AWS GenAIIC provided ONESTRUCTION with access to deep technical expertise without requiring them to build that capability in-house, accelerating the project timeline and likely avoiding numerous dead ends.

## Future Directions

The case study mentions that ONESTRUCTION will continue working with AWS to bring AI tools to the construction industry, suggesting that Ishigaki-IDS is part of a broader strategy rather than a one-off project. The model is available on Hugging Face, which demonstrates a commitment to openness and community engagement, though the case study doesn't discuss the licensing model or whether there are commercial restrictions.

From an LLMOps perspective, the next natural steps would include deployment optimization, integration into production workflows, monitoring and observability instrumentation, continuous evaluation on real user queries, and potentially active learning approaches where the model can be fine-tuned on real usage patterns. The case study doesn't address these production concerns, which is understandable given the focus on the training phase, but they're critical for long-term success.

Overall, this case study provides a well-documented example of domain-specialized foundation model development with clear articulation of challenges, thoughtful solution design, and honest assessment of results. The three-stage training pipeline, verifiable rewards approach, and emphasis on synthetic data quality offer reusable patterns for similar projects in other specialized domains.
