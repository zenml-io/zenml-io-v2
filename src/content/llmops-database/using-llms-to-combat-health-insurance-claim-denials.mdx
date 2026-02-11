---
title: "Using LLMs to Combat Health Insurance Claim Denials"
slug: "using-llms-to-combat-health-insurance-claim-denials"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69739c8f26b5fa42e716e126"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-03T15:19:04.226Z"
  lastUpdated: "2026-01-23T16:11:16.738Z"
  createdOn: "2026-01-23T16:06:39.039Z"
llmopsTags:
  - "healthcare"
  - "document-processing"
  - "question-answering"
  - "classification"
  - "high-stakes-application"
  - "structured-output"
  - "regulatory-compliance"
  - "fine-tuning"
  - "prompt-engineering"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "pytorch"
  - "tensorflow"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "nvidia"
  - "hugging-face"
industryTags: "healthcare"
company: "Fight Health Insurance"
summary: "Fight Health Insurance is an open-source project that uses fine-tuned large language models to help people appeal denied health insurance claims in the United States. The system processes denial letters, extracts relevant information, and generates appeal letters based on training data from independent medical review boards. The project addresses the widespread problem of insurance claim denials by automating the complex and time-consuming process of crafting effective appeals, making it accessible to individuals who lack the resources or knowledge to navigate the appeals process themselves. The tool is available both as an open-source Python package and as a free hosted service, though the sustainability model is still being developed."
link: "https://www.youtube.com/watch?v=CeHaypeHhYE"
year: 2026
seo:
  title: "Fight Health Insurance: Using LLMs to Combat Health Insurance Claim Denials - ZenML LLMOps Database"
  description: "Fight Health Insurance is an open-source project that uses fine-tuned large language models to help people appeal denied health insurance claims in the United States. The system processes denial letters, extracts relevant information, and generates appeal letters based on training data from independent medical review boards. The project addresses the widespread problem of insurance claim denials by automating the complex and time-consuming process of crafting effective appeals, making it accessible to individuals who lack the resources or knowledge to navigate the appeals process themselves. The tool is available both as an open-source Python package and as a free hosted service, though the sustainability model is still being developed."
  canonical: "https://www.zenml.io/llmops-database/using-llms-to-combat-health-insurance-claim-denials"
  ogTitle: "Fight Health Insurance: Using LLMs to Combat Health Insurance Claim Denials - ZenML LLMOps Database"
  ogDescription: "Fight Health Insurance is an open-source project that uses fine-tuned large language models to help people appeal denied health insurance claims in the United States. The system processes denial letters, extracts relevant information, and generates appeal letters based on training data from independent medical review boards. The project addresses the widespread problem of insurance claim denials by automating the complex and time-consuming process of crafting effective appeals, making it accessible to individuals who lack the resources or knowledge to navigate the appeals process themselves. The tool is available both as an open-source Python package and as a free hosted service, though the sustainability model is still being developed."
---

## Overview and Context

Fight Health Insurance is a personal open-source project created by Holden, an Apache Spark developer with a decade of experience in distributed data processing. The project emerged from personal experiences with insurance claim denials, including medical care after being hit by a car, transgender healthcare coverage issues, and ultimately a pet insurance denial for anesthesia during a dog's root canal. The project aims to democratize access to effective insurance appeals by using fine-tuned language models trained on successful historical appeals from independent medical review board data.

The use case represents a compelling application of LLMs in production to address a real-world problem affecting millions of Americans. The system processes insurance denial letters, extracts key information, and generates appeal letters that are more likely to succeed based on patterns learned from tens of thousands of historical appeal records.

## Technical Architecture and Model Training

### Data Sources and Preparation

The project relies on Independent Medical Review data, which represents third-level appeal cases specifically related to medical necessity denials. This data source has inherent biases since it only captures appeals that have reached this advanced stage, but it represents the best publicly available dataset for the task. The training dataset contains tens of thousands of records, which the creator processes and transforms to produce suitable training data for fine-tuning operations.

The data processing pipeline extracts key information from denial letters including the denied procedure or treatment, the insurance company's stated reason for denial, and relevant patient medical history. This extraction serves as the foundation for generating contextually appropriate appeals.

### Model Training Infrastructure

One of the most significant LLMOps challenges discussed is the economics and logistics of GPU access for training. The creator made a deliberate architectural decision to rent GPUs by the hour for training operations while using owned GPUs for inference. This approach balances the high computational demands of training against the need to control costs for ongoing inference operations. However, this constraint also limits the size of models that can be deployed to those that will fit on consumer-grade GPUs that an individual can afford.

The network bottleneck between rented GPU infrastructure and data sources presents a classic distributed computing challenge. Unlike enterprise data center environments with high-speed interconnects, individual developers renting GPUs face slow network connections that become a significant bottleneck. This necessitates different configuration strategies compared to typical enterprise deployments, with much more conservative data movement patterns.

### Checkpointing and Resilience

A critical aspect of the training infrastructure is the handling of preemption events. Even when renting non-preemptible GPU instances, the creator observed that jobs can still be interrupted, whether due to hardware failures or other reasons. This makes checkpointing essential for the training process. Checkpoints capture the model state periodically during training, allowing the process to resume from the last saved state rather than starting over completely.

The trade-off with checkpointing is storage management. Checkpoints are not small, and they accumulate over time as training progresses. The creator emphasizes the importance of provisioning persistent storage attached to rented GPU instances to ensure checkpoints survive preemption events. Without persistent storage, preemption means losing all progress since the last checkpoint that was saved to remote storage.

The checkpointing pattern differs significantly from the resilience model in Apache Spark, where individual task failures can be recovered by recomputing just the lost portion. In deep learning training, losing a node typically requires rolling back to the last checkpoint and replaying all updates, making checkpoint frequency a critical parameter for managing the trade-off between recovery time and storage overhead.

### Fine-Tuning Process and Tooling

The project underwent a significant evolution with the introduction of Axolotl, an open-source tool that greatly simplified the fine-tuning workflow. Axolotl made it much easier to experiment with different base models to evaluate their performance on the specific task of generating insurance appeals. This kind of model selection and experimentation is a core LLMOps challenge, as different base models can have dramatically different performance characteristics for specialized domains.

The fine-tuning approach involves training the model on historical appeals that reached independent medical review boards, teaching it the language, structure, and argumentation patterns that have proven successful. The model learns to incorporate patient medical history and frame arguments in ways that align with regulatory requirements and insurance company processes.

## Inference Architecture and Deployment

### Model Sizing and Hardware Constraints

The constraint of running inference on consumer-grade GPUs that an individual can afford significantly influenced the model selection process. This is a practical LLMOps consideration that differs from many enterprise deployments where larger models with better performance can be deployed using cloud GPU resources. The project demonstrates how resource constraints shape architectural decisions, forcing careful evaluation of the performance-to-size ratio of different base models.

### Production Workflow

The production system implements a multi-stage workflow. First, it processes the denial letter to extract structured information about what was denied and why. The system then prompts the user to confirm that the extracted information is correct, providing a human-in-the-loop validation step that improves reliability. Users also provide their medical history, which the system incorporates into the appeal generation.

An identified limitation of the current approach is that it relies on users to provide their complete medical history, which most people cannot recall accurately. The creator plans to evolve this to an interview-style interaction where the system asks targeted questions about medical history, likely to surface more relevant context for generating stronger appeals.

### Hosted Service Deployment

The project is available both as an open-source Python package and as a hosted service at fighthealthinsurance.com. The hosted service removes technical barriers for end users who simply need help with a denied claim rather than wanting to manage their own deployment. This dual distribution model reflects a common pattern in open-source LLMOps projects where both self-hosted and managed service options coexist.

The hosted service deployment presents ongoing cost challenges since training and inference both have real dollar costs in terms of GPU time and compute resources. The creator has architected the system to minimize costs through careful resource management, but there are still non-zero operational expenses. The business model is explicitly uncertain, following what the creator describes as the underpants gnomes approach: step one is building and deploying the service, step two is uncertain, and step three is hopefully profit.

## LLMOps Challenges and Lessons Learned

### Cost Management

The economics of GPU access emerged as one of the most significant practical challenges. Renting GPUs by the hour for training is expensive, which influenced the decision to separate training and inference infrastructure. This is a common pattern in production LLM deployments where training happens on powerful rented resources while inference uses more cost-effective dedicated hardware.

The creator's approach of using owned hardware for inference reflects a careful cost-benefit analysis. While cloud-based inference offers scalability advantages, the ongoing per-request costs can become prohibitive for services that need to remain accessible and free to end users. This tension between cloud economics and service sustainability is a fundamental LLMOps challenge for projects without clear revenue models.

### Data Movement and Network Bottlenecks

The network bottleneck between data sources and rented GPU infrastructure represents a classic distributed systems challenge that takes on new dimensions in LLM training. The creator's experience highlights how network topology and bandwidth can become the limiting factor, requiring different configuration strategies than would be used in co-located data center environments.

This challenge connects to the creator's extensive background in Apache Spark and distributed data processing. Many of the same principles apply: understanding data locality, minimizing data movement, and configuring systems based on actual bottlenecks rather than assumptions. However, the specific constraints of rented GPU infrastructure in geographically dispersed locations create unique challenges compared to traditional big data processing.

### Model Experimentation and Selection

The introduction of Axolotl as a tool for simplifying fine-tuning workflow represents an important LLMOps lesson about the value of specialized tooling. Being able to easily experiment with different base models is crucial for finding the right performance-to-resource-cost trade-off. In production LLM deployments, this kind of experimentation capability is essential for optimization and continuous improvement.

The ability to systematically evaluate different models on the specific task domain allows for data-driven decisions about which base model to use. This is particularly important when working under resource constraints, as it enables finding the smallest model that can achieve acceptable performance rather than defaulting to the largest possible model.

### Reliability and Preemption Handling

The unexpected level of preemption even on nominally non-preemptible instances taught important lessons about building resilient training pipelines. The solution of implementing comprehensive checkpointing with persistent storage represents a fundamental LLMOps pattern for any training infrastructure that might face interruptions.

The accumulation of checkpoints over time also highlights storage management as an operational concern. Production LLM training pipelines need strategies for checkpoint retention and cleanup to avoid unbounded storage growth while maintaining the ability to recover from failures or roll back to earlier model versions.

### Human-in-the-Loop Validation

The system's approach of extracting structured information from denial letters and then asking users to confirm accuracy represents an important pattern for production LLM systems in high-stakes domains. Rather than assuming the model's extraction is perfect, the system incorporates human validation at a critical juncture. This increases reliability and user trust while keeping the human burden minimal compared to writing the entire appeal from scratch.

The planned evolution toward an interview-based medical history collection similarly reflects learning about how to structure interactions with LLMs to get better inputs. Rather than asking users for open-ended medical history that they may not remember, the system will guide them through targeted questions that are more likely to surface relevant information.

## Open Source and Sustainability Considerations

The project exists at the intersection of open source software development and LLMOps deployment. The creator made the strategic decision to release the code as open source while also running a free hosted service, reflecting a belief that the users and developers of this tool are largely distinct populations. Unlike typical open source projects where users often become contributors, most people dealing with insurance denials are unlikely to submit pull requests.

This disconnect between users and developers creates sustainability challenges. Traditional open source funding models often rely on corporate sponsors who use the software, but in this case the primary beneficiaries are individuals dealing with claim denials. The creator is working without a clear monetization strategy, which raises questions about long-term sustainability of both the development effort and the hosted service infrastructure.

The discussion of open source sustainability touches on broader industry tensions around licensing, corporate control of foundations, and the challenges of maintaining projects when commercial cloud providers can offer the software as a service more effectively than the creators. While not specific to LLMOps, these concerns are particularly acute for LLM-based projects given the high infrastructure costs for training and inference.

## Technical Context from Broader Discussion

The creator's background in Apache Spark and distributed data processing provides valuable context for understanding their approach to LLMOps challenges. Many of the same distributed systems principles apply: understanding bottlenecks, optimizing data movement, implementing checkpointing for resilience, and making architectural decisions based on actual resource constraints rather than theoretical best practices.

The discussion of resource profiles in Spark, where different job stages can request different hardware resources, parallels the LLMOps pattern of using different infrastructure for training versus inference. The idea of only using expensive specialized hardware when actually needed rather than for entire pipelines is a cost optimization pattern that translates across domains.

The creator's emphasis on understanding data characteristics before processing, particularly looking at distributions and skew in data, also translates to the LLM domain. Understanding the characteristics of the training data from independent medical review boards, including its biases and coverage gaps, informs how the model should be trained and deployed.

## Production Readiness and Future Development

The current production deployment at fighthealthinsurance.com represents a functional but evolving system. The creator has identified several areas for improvement, particularly around medical history collection, which suggests an iterative development approach common in LLMOps where systems are deployed and refined based on real-world usage.

The system architecture demonstrates practical LLMOps patterns including separation of training and inference infrastructure, checkpointing for training resilience, human-in-the-loop validation, and dual distribution as both open source code and hosted service. However, the uncertain business model and reliance on individual developer resources highlights the challenges of sustaining production LLM systems outside of well-funded commercial or institutional contexts.

The project serves as a case study in how LLMs can be applied to specific domain problems where the combination of document understanding, information extraction, and text generation can automate complex processes that were previously only accessible to experts. The focus on making insurance appeals accessible to ordinary individuals demonstrates the potential for LLMs to democratize access to services that require specialized knowledge, while the honest discussion of challenges and limitations provides valuable lessons for others building production LLM systems.