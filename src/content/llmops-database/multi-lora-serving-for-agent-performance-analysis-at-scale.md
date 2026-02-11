---
title: "Multi-LoRA Serving for Agent Performance Analysis at Scale"
slug: "multi-lora-serving-for-agent-performance-analysis-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "674f201b757f5ab21724d498"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:46:51.657Z"
  createdOn: "2024-12-03T15:13:31.868Z"
llmopsTags:
  - "customer-support"
  - "speech-recognition"
  - "fine-tuning"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "scaling"
  - "monitoring"
  - "openai"
  - "meta"
industryTags: "tech"
company: "Convirza"
summary: "Convirza, facing challenges with their customer service agent evaluation system, transitioned from Longformer models to fine-tuned Llama-3-8b using Predibase's multi-LoRA serving infrastructure. This shift enabled them to process millions of call hours while reducing operational costs by 10x compared to OpenAI, achieving an 8% improvement in F1 scores, and increasing throughput by 80%. The solution allowed them to efficiently serve over 60 performance indicators across thousands of customer interactions daily while maintaining sub-second inference times."
link: "https://predibase.com/blog/convirza-case-study"
year: 2024
seo:
  title: "Convirza: Multi-LoRA Serving for Agent Performance Analysis at Scale - ZenML LLMOps Database"
  description: "Convirza, facing challenges with their customer service agent evaluation system, transitioned from Longformer models to fine-tuned Llama-3-8b using Predibase's multi-LoRA serving infrastructure. This shift enabled them to process millions of call hours while reducing operational costs by 10x compared to OpenAI, achieving an 8% improvement in F1 scores, and increasing throughput by 80%. The solution allowed them to efficiently serve over 60 performance indicators across thousands of customer interactions daily while maintaining sub-second inference times."
  canonical: "https://www.zenml.io/llmops-database/multi-lora-serving-for-agent-performance-analysis-at-scale"
  ogTitle: "Convirza: Multi-LoRA Serving for Agent Performance Analysis at Scale - ZenML LLMOps Database"
  ogDescription: "Convirza, facing challenges with their customer service agent evaluation system, transitioned from Longformer models to fine-tuned Llama-3-8b using Predibase's multi-LoRA serving infrastructure. This shift enabled them to process millions of call hours while reducing operational costs by 10x compared to OpenAI, achieving an 8% improvement in F1 scores, and increasing throughput by 80%. The solution allowed them to efficiently serve over 60 performance indicators across thousands of customer interactions daily while maintaining sub-second inference times."
---

## Overview

Convirza is an AI-powered software platform founded in 2001 that helps enterprises gain insights into their customer journey and agent performance through call analytics. The company processes millions of calls per month using AI models to extract key information and produce scorecards for evaluating agent performance. This case study, published in November 2024, documents their transition from legacy Longformer models to a multi-LoRA serving architecture built on Predibase's managed platform.

It's worth noting that this case study is published by Predibase, the vendor providing the solution, so the results should be interpreted with that commercial context in mind. However, the technical approach and architectural decisions described are instructive for understanding modern LLMOps practices around efficient fine-tuning and serving.

## The Problem: Infrastructure Limitations with Legacy Models

Convirza's previous solution relied on Longformer AI models trained on over 60 performance indicators to analyze customer service calls. As the company sought to provide deeper, more customized insights to meet evolving customer expectations, they encountered several significant operational challenges.

Training times were a major bottleneck, with each iteration taking anywhere from 9 to 24+ hours. This slow iteration cycle limited the team's ability to respond quickly to changing customer needs and experiment with new indicators. The long feedback loop between model development and deployment made it difficult to iterate on model quality in a timely manner.

Serving infrastructure presented even greater challenges. Each Longformer model required dedicated compute resources, resulting in monthly costs ranging from $500 to $1,500 per indicator. With over 60 indicators, this drove inference costs into the hundreds of thousands of dollars per year. This cost structure made it economically challenging to deploy custom indicators for specific customers or industries, limiting Convirza's ability to differentiate their product.

The company explored fine-tuning small language models (SLMs) as an alternative approach, aiming for faster iteration cycles and improved accuracy while controlling costs. However, they quickly realized that building and maintaining their own serving infrastructure for multi-LoRA deployment would require tackling numerous technical challenges, including handling highly variable workloads and meeting high throughput requirements. The engineering resources required to build this infrastructure would have been substantial and would have diverted focus from their core product development.

## The Solution: Multi-LoRA Serving with Predibase

Convirza adopted Predibase's managed platform to address these infrastructure challenges. The key technical innovation was using LoRA (Low-Rank Adaptation) adapters combined with Predibase's LoRA eXchange (LoRAX) multi-LoRA serving infrastructure. This approach allowed Convirza to train separate LoRA adapters for each of their 60+ performance indicators while serving them all from a single Meta Llama-3-8b base model.

The multi-LoRA architecture provides significant operational advantages. Instead of deploying 60+ separate model instances (each requiring dedicated GPU resources), Convirza can now share a single base model across all adapters. The LoRA adapters are small (typically a few megabytes) and can be loaded dynamically at inference time, dramatically reducing the memory footprint and compute requirements compared to running multiple full models.

Training LoRA adapters is also substantially faster than full model fine-tuning. This enables much shorter iteration cycles, allowing Convirza's AI team to experiment more rapidly with new indicators and respond more quickly to customer feedback. In the first month after adoption, they trained and deployed adapters for over 20 indicators.

The Predibase platform provides autoscaling GPU infrastructure designed to handle load spikes with short cold-start times. This is particularly important for Convirza's use case, where call processing workloads can be highly variable with significant peak-hour demand. According to the VP of AI at Convirza, their workload requires scaling up to double-digit A100 GPUs during peak periods. The autoscaling capability ensures they can maintain SLAs during these spikes without over-provisioning infrastructure during quieter periods.

## Technical Architecture Details

The architecture centers on the Llama-3-8b model as the base, with LoRA adapters providing the specialized behavior for each performance indicator. When an inference request comes in, the appropriate adapter is loaded and applied to the base model to generate predictions.

The multi-LoRA serving approach (LoRAX) handles the orchestration of loading and unloading adapters efficiently. This includes optimizations for batching requests across different adapters and minimizing adapter switching overhead. The system achieves sub-second mean inference time even while serving 60+ adapters, with an average response time under two seconds according to the quoted metrics.

The GPU infrastructure uses A100s and includes autoscaling capabilities that can spin up additional compute resources as needed. Cold-start times are minimized to ensure that scaling events don't significantly impact response latency during traffic spikes.

## Results and Performance Claims

The case study reports several significant improvements after adopting the Predibase platform:

- **Cost**: 10x reduction compared to OpenAI API costs for equivalent functionality
- **Accuracy**: 8% higher average F1 score compared to OpenAI on their evaluation tasks
- **Throughput**: 80% higher throughput compared to OpenAI, and 4x higher throughput compared to their previous Longformer-based solution
- **Latency**: Sub-second mean inference time with average response times under two seconds

These results should be interpreted carefully given the commercial nature of the publication. The comparison to "OpenAI" is somewhat vague - it's not specified which OpenAI model was used for comparison, what prompting strategy was employed, or how exactly the F1 scores were measured. The claim that fine-tuned SLMs outperform OpenAI's models on domain-specific tasks is plausible, as fine-tuning on task-specific data often improves performance for narrow classification tasks. However, the magnitude of improvement and the cost comparison methodology would benefit from more transparency.

The 10x cost reduction claim is also context-dependent. Fine-tuned open-source models served on dedicated infrastructure are typically cheaper per token than commercial APIs at high volumes, but this doesn't account for the engineering time required to build and maintain such systems (which Convirza is outsourcing to Predibase).

## LLMOps Lessons and Best Practices

This case study illustrates several important LLMOps patterns:

**Multi-LoRA as a scaling strategy**: When an application requires many specialized model behaviors (like 60+ classification tasks), multi-LoRA serving can be dramatically more efficient than deploying separate model instances. The key insight is that the base model parameters can be shared while small adapter layers provide task-specific customization.

**Managed platforms for infrastructure complexity**: Building production-grade serving infrastructure with autoscaling, efficient batching, and low latency is non-trivial. For companies whose core competency is not ML infrastructure, managed platforms can accelerate time-to-production and reduce operational burden.

**SLMs vs. large API-based models**: For specific, well-defined tasks with sufficient training data, fine-tuned smaller models can outperform larger general-purpose models while being more cost-effective. This represents a common pattern in production LLM systems where specialized models handle high-volume, narrow tasks.

**Autoscaling for variable workloads**: Call center analytics has predictable but highly variable traffic patterns (peak hours, business days, etc.). Autoscaling infrastructure that can handle these spikes without over-provisioning during quiet periods is essential for cost-effective operation.

The case study also highlights the importance of iteration speed in LLMOps. Moving from 9-24+ hour training cycles to much faster LoRA adapter training enables more rapid experimentation and faster response to customer needs. This agility is often as valuable as raw model performance improvements.

## Conclusion

Convirza's migration from Longformer models to a multi-LoRA architecture on Predibase represents a common pattern in LLMOps: leveraging modern fine-tuning techniques and managed infrastructure to reduce costs while improving performance. While the specific metrics should be taken with appropriate skepticism given the commercial source, the architectural approach of using multi-LoRA serving to efficiently support many specialized classifiers from a single base model is a well-established and effective pattern for production LLM systems with similar requirements.