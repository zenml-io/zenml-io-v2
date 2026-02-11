---
title: "Fine-tuning Multimodal Models for Banking Document Processing"
slug: "fine-tuning-multimodal-models-for-banking-document-processing"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "682871399337e116b8d8ec83"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:09:22.654Z"
  createdOn: "2025-05-17T11:21:29.038Z"
llmopsTags:
  - "document-processing"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "multi-modality"
  - "fine-tuning"
  - "rag"
  - "model-optimization"
  - "token-optimization"
  - "latency-optimization"
  - "fastapi"
  - "vllm"
  - "pytorch"
  - "kubernetes"
  - "monitoring"
  - "amazon-aws"
  - "microsoft-azure"
  - "anthropic"
industryTags: "finance"
company: "Apoidea Group"
summary: "Apoidea Group tackled the challenge of efficiently processing banking documents by developing a solution using multimodal large language models. They fine-tuned the Qwen2-VL-7B-Instruct model using LLaMA-Factory on Amazon SageMaker HyperPod to enhance visual information extraction from complex banking documents. The solution significantly improved table structure recognition accuracy from 23.4% to 81.1% TEDS score, approaching the performance of more advanced models while maintaining computational efficiency. This enabled reduction of financial spreading process time from 4-6 hours to just 10 minutes."
link: "https://aws.amazon.com/blogs/machine-learning/how-apoidea-group-enhances-visual-information-extraction-from-banking-documents-with-multimodal-models-using-llama-factory-on-amazon-sagemaker-hyperpod?tag=soumet-20"
year: 2025
seo:
  title: "Apoidea Group: Fine-tuning Multimodal Models for Banking Document Processing - ZenML LLMOps Database"
  description: "Apoidea Group tackled the challenge of efficiently processing banking documents by developing a solution using multimodal large language models. They fine-tuned the Qwen2-VL-7B-Instruct model using LLaMA-Factory on Amazon SageMaker HyperPod to enhance visual information extraction from complex banking documents. The solution significantly improved table structure recognition accuracy from 23.4% to 81.1% TEDS score, approaching the performance of more advanced models while maintaining computational efficiency. This enabled reduction of financial spreading process time from 4-6 hours to just 10 minutes."
  canonical: "https://www.zenml.io/llmops-database/fine-tuning-multimodal-models-for-banking-document-processing"
  ogTitle: "Apoidea Group: Fine-tuning Multimodal Models for Banking Document Processing - ZenML LLMOps Database"
  ogDescription: "Apoidea Group tackled the challenge of efficiently processing banking documents by developing a solution using multimodal large language models. They fine-tuned the Qwen2-VL-7B-Instruct model using LLaMA-Factory on Amazon SageMaker HyperPod to enhance visual information extraction from complex banking documents. The solution significantly improved table structure recognition accuracy from 23.4% to 81.1% TEDS score, approaching the performance of more advanced models while maintaining computational efficiency. This enabled reduction of financial spreading process time from 4-6 hours to just 10 minutes."
---

## Overview

Apoidea Group is a Hong Kong-based AI-focused FinTech independent software vendor (ISV) that develops document processing solutions for multinational banks. Their flagship product, SuperAcc, is a sophisticated document processing service that uses proprietary document understanding models to process diverse document types including bank statements, financial statements, and KYC documents. The company has deployed their solutions with over 10 financial services industry clients, demonstrating reliability in production banking environments with claimed ROI of over 80%.

This case study documents Apoidea's collaboration with AWS to enhance their visual information extraction capabilities by fine-tuning large vision-language models (LVLMs) for table structure recognition on banking and financial documents. The work specifically focuses on fine-tuning the Qwen2-VL-7B-Instruct model using LLaMA-Factory on Amazon SageMaker HyperPod infrastructure.

## Problem Statement

The banking industry faces significant challenges with repetitive document processing tasks including information extraction, document review, and auditing. These tasks require substantial human resources and slow down critical operations such as Know Your Customer (KYC) procedures, loan applications, and credit analysis. Traditional approaches face several specific challenges:

- Bank statement formats vary significantly across financial institutions with unique layouts, columns, and transaction description formats
- Documents are often scanned with low quality, resulting in blurry, faded, or poorly aligned images that create challenges for OCR systems
- Traditional solutions rely on orchestrating multiple models for tasks like layout analysis, entity extraction, and table structure recognition, which increases system complexity
- Single-modality models fail to leverage the multi-faceted nature of information, leading to less precise predictions
- Models developed for specific document features are inherently limited in scope and lack access to diverse training data
- Error propagation between pipeline stages compounds inaccuracies
- Computational requirements of multi-stage systems present scalability challenges

The specific use case addressed in this case study is table structure recognition from complex financial documents, where models need to accurately identify table structures including merged cells, hierarchical headers, and varying layouts while maintaining content fidelity.

## Technical Solution Architecture

### Base Model Selection

The team selected Qwen2-VL-7B-Instruct as the base model for fine-tuning. This choice was significant because modern vision-language models use pre-trained vision encoders (such as vision transformers) as their backbone to extract visual features, which are then fused with textual embeddings in a multimodal transformer architecture. The pre-trained knowledge of Qwen2-VL provided a strong foundation for domain-specific adaptation. Notably, the model's multilingual capabilities were preserved even when fine-tuning on English datasets alone, still yielding good performance on Chinese evaluation datasets.

### Fine-Tuning Framework: LLaMA-Factory

LLaMA-Factory is an open-source framework designed for efficient training and fine-tuning of large language models. It supports over 100 popular models and integrates advanced techniques including:

- LoRA (Low-Rank Adaptation)
- QLoRA (Quantized LoRA)
- Full-parameter fine-tuning
- Supervised fine-tuning (SFT)
- Reinforcement learning from human feedback (RLHF)
- Direct preference optimization (DPO)

The framework provides efficiency advantages by significantly reducing computational and memory requirements for fine-tuning large models through quantization techniques. Its modular design integrates cutting-edge algorithms like FlashAttention-2 and GaLore for high performance and scalability.

### Training Infrastructure: Amazon SageMaker HyperPod

The distributed training was conducted on Amazon SageMaker HyperPod, which provides purpose-built infrastructure for training large-scale models. Key features leveraged include:

- Simplified distributed training setup and management
- Flexible scaling from single-GPU experiments to multi-GPU data parallelism
- Integration with Amazon FSx for Lustre for seamless data synchronization across worker nodes
- Integration with Slurm for job scheduling and resource management
- Automatic monitoring and replacement of faulty hardware for cluster resiliency
- Visual Studio Code connectivity for development

The solution used QLoRA and data parallel distributed training orchestrated through Slurm sbatch scripts. By freezing most parameters through QLoRA during initial fine-tuning stages, the team achieved faster convergence and better utilization of pre-trained knowledge, especially with limited data.

### Data Preprocessing

The training data was preprocessed to use image inputs with HTML structure as the output format. HTML was chosen because:

- It is the most common format for representing tabular data in web applications
- It is straightforward to parse and visualize
- It is compatible with most web browsers for rendering and manual review

The preprocessing is critical for the model to learn patterns of expected output format and adapt to the visual layout of tables. The team noted that model performance is highly dependent on fine-tuning data quality, with domain-specific data achieving a 5-point improvement in TEDS score with only 10% of data compared to general datasets.

### Inference and Deployment

For production inference, the team uses vLLM for hosting the quantized model. vLLM provides:

- Efficient memory management
- Optimized attention mechanisms for high-throughput inference
- Native support for the Qwen2-VL series model

The deployment process involves:

- Applying 4-bit quantization to reduce model size while maintaining accuracy
- Configuring the vLLM server with optimal parameters for batch processing and memory allocation
- Exposing the model through RESTful APIs for integration with existing document processing pipelines

## Evaluation Results

The evaluation focused on the FinTabNet dataset containing complex tables from S&P 500 annual reports. The team used Tree Edit Distance-based Similarity (TEDS) metric, which assesses both structural and content similarity between generated HTML tables and ground truth. TEDS-S specifically measures structural similarity.

The results demonstrated significant improvements:

- Qwen2-VL-7B-Instruct Base: TEDS 23.4, TEDS-S 25.3
- Qwen2-VL-7B-Instruct Fine-tuned: TEDS 81.1, TEDS-S 89.7
- Claude 3 Haiku: TEDS 69.9, TEDS-S 76.2
- Claude 3.5 Sonnet: TEDS 86.4, TEDS-S 87.1

The fine-tuned model showed a dramatic improvement from the base version (TEDS improved from 23.4 to 81.1), surpassed Claude 3 Haiku, and approached Claude 3.5 Sonnet accuracy levels while maintaining more efficient computational requirements. The structural understanding (TEDS-S of 89.7) actually exceeded Claude 3.5 Sonnet's 87.1.

## Best Practices Identified

Through experimentation, the team identified several key insights for fine-tuning multimodal table structure recognition models:

**Data Quality and Domain Specificity**: Fine-tuning doesn't require massive datasets; relatively good performance was achieved with just a few thousand samples. However, imbalanced datasets lacking sufficient examples of complex elements like long tables and forms with merged cells can lead to biased performance. Maintaining balanced distribution of document types during fine-tuning ensures consistent performance across various formats.

**Synthetic Data Generation**: When real-world annotated data is limited, synthetic data generation using document data synthesizers can be effective. Combining real and synthetic data during fine-tuning helps mitigate out-of-domain issues, particularly for rare or domain-specific text types.

**Base Model Selection**: More powerful base models yield better results. The Qwen2-VL's pre-trained visual and linguistic features provided a strong foundation, and multilingual capabilities were preserved even when fine-tuning on English datasets alone.

## Security Considerations

The case study addresses security considerations essential for working with sensitive financial documents:

- Data security through encryption at rest using AWS KMS and in transit using TLS
- Strict S3 bucket policies with VPC endpoints
- Least-privilege access controls through IAM roles
- Training environments operate within private subnets in dedicated VPCs
- Secure model hosting with vLLM requires deployment in private VPC subnets with proper API Gateway protections and token-based authentication

The solution complies with banking-grade security standards including ISO 9001 and ISO 27001.

## Business Impact Claims

It should be noted that some claims in this case study come from Apoidea's marketing materials and AWS partnership content. The claimed business impacts include:

- Financial spreading process reduced from 4-6 hours to 10 minutes with less than 30 minutes for staff review
- SME banking review of multiple bank statements spanning 6 months reduced to 10 minutes
- Over 80% ROI for banking clients
- Successful deployment with over 10 FSI clients

These figures should be evaluated with appropriate skepticism as they originate from the vendor and cloud partner rather than independent verification. However, the technical approach of using fine-tuned vision-language models to replace multi-stage document processing pipelines is a sound architectural decision that addresses real inefficiencies in traditional document extraction systems.

## Technical Implementation Resources

The solution provides open-source implementation available through a GitHub repository with step-by-step guidance for fine-tuning Qwen2-VL-7B-Instruct on SageMaker HyperPod, enabling organizations to adapt the approach for their own document processing challenges using domain-specific data.