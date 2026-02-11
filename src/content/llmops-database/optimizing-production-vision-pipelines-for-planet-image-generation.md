---
title: "Optimizing Production Vision Pipelines for Planet Image Generation"
slug: "optimizing-production-vision-pipelines-for-planet-image-generation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ed47b6116916ebb755a"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:38:44.091Z"
  createdOn: "2024-11-21T14:08:20.146Z"
llmopsTags:
  - "fine-tuning"
  - "hugging-face"
  - "latency-optimization"
  - "model-optimization"
  - "multi-modality"
  - "orchestration"
  - "prompt-engineering"
  - "reliability"
  - "scalability"
  - "scaling"
  - "token-optimization"
  - "unstructured-data"
industryTags: "tech"
company: "Prem AI"
summary: "At Prem AI, they tackled the challenge of generating realistic ethereal planet images at scale with specific constraints like aspect ratio and controllable parameters. The solution involved fine-tuning Stable Diffusion XL with a curated high-quality dataset, implementing custom upscaling pipelines, and optimizing performance through various techniques including LoRA fusion, model quantization, and efficient serving frameworks like Ray Serve."
link: "https://www.youtube.com/watch?v=POL7gSRFXqE"
year: 2024
seo:
  title: "Prem AI: Optimizing Production Vision Pipelines for Planet Image Generation - ZenML LLMOps Database"
  description: "At Prem AI, they tackled the challenge of generating realistic ethereal planet images at scale with specific constraints like aspect ratio and controllable parameters. The solution involved fine-tuning Stable Diffusion XL with a curated high-quality dataset, implementing custom upscaling pipelines, and optimizing performance through various techniques including LoRA fusion, model quantization, and efficient serving frameworks like Ray Serve."
  canonical: "https://www.zenml.io/llmops-database/optimizing-production-vision-pipelines-for-planet-image-generation"
  ogTitle: "Prem AI: Optimizing Production Vision Pipelines for Planet Image Generation - ZenML LLMOps Database"
  ogDescription: "At Prem AI, they tackled the challenge of generating realistic ethereal planet images at scale with specific constraints like aspect ratio and controllable parameters. The solution involved fine-tuning Stable Diffusion XL with a curated high-quality dataset, implementing custom upscaling pipelines, and optimizing performance through various techniques including LoRA fusion, model quantization, and efficient serving frameworks like Ray Serve."
---

## Overview

This case study comes from a talk by Biswaroop, a Senior ML Engineer at Prem AI, presented at an MLOps community event. The talk focuses on deploying vision-based generative AI pipelines in production, specifically for generating realistic planetary images at scale. While the presentation uses planet image generation as a concrete example, the techniques and principles discussed are broadly applicable to production vision pipelines using diffusion models.

Prem AI appears to be a company working on ML infrastructure and tooling, as evidenced by their grant program offering free fine-tuning jobs, ML model deployments, and ML ad-hoc support to developers. The talk provides practical insights into the challenges of moving from experimentation to production-grade vision systems.

## Problem Statement

The use case involves generating millions of images of "realistic and ethereal planets" that must adhere to specific constraints. These constraints include spatial requirements such as maintaining small spaces at both sides and height boundaries, with planets appearing only within designated regions. Additionally, there are controllable parameters for physical attributes including planet color (e.g., bluish-whitish tones), sky characteristics, presence of nebulae, planetary rings, and atmospheric conditions. A critical technical requirement is that all images must follow a specific 21:9 ultrawide aspect ratio.

The challenge here is representative of many production image generation scenarios where simple text-to-image generation without fine-tuning lacks the consistency and fine-grained control needed for production use cases. As the speaker notes, basic generation with configurable prompts "doesn't quite work" when high levels of control are required.

## Solution Architecture

### Fine-Tuning Approach

Rather than relying on basic generation, the team opted for fine-tuning as their primary approach. The rationale is straightforward: when you need consistent, controllable outputs, fine-tuning on a curated dataset provides significantly better control than prompt engineering alone.

The fine-tuning strategy involves several key components. First, they developed a structured prompt creation strategy where prompts follow an ordered format starting with color, moving to atmospheric details, then celestial bodies (moons), and finally sky characteristics. This structured approach enables systematic variation of attributes during training and inference. For example, a prompt might read: "deep blue planet with frosted cloudy zones, no moons, distant stars dark sky."

For dataset curation, the team created a small but high-quality dataset using tools like Photoshop and Midjourney. The emphasis is on quality over quantity and ensuring the dataset covers a good variance of the attributes that will be controlled via prompts. This is a pragmatic approach that acknowledges that for many specialized use cases, a well-curated small dataset outperforms a larger but noisier one.

The model choice was Stable Diffusion XL, selected with careful attention to aspect ratio compatibility. The speaker notes that SDXL was trained on specific aspect ratios, and for their 21:9 requirement (ratio of approximately 2.3), the closest supported training resolution was 1536x640 (ratio of 2.4). Using the model at or near its training resolution is crucial for maximizing output quality, a detail often overlooked in production deployments.

### Custom Upscaling Pipeline

A distinctive aspect of this production pipeline is the custom upscaling workflow, which the speaker describes as "a very creative area" where teams are still figuring out best practices. The pipeline follows a multi-stage pattern designed to enhance image quality beyond what the base model produces.

The workflow begins with an initial 2x upscale using a dedicated upscaler model, followed by resizing back to the target dimensions. The image then passes through an image-to-image pipeline to add fine details that were missing in the original generation. Finally, another upscale pass is performed followed by a final resize to target dimensions.

This iterative approach addresses the common problem that raw diffusion model outputs, while compositionally correct, often lack fine detail and can appear "smudged." The speaker shows comparative results demonstrating significantly more defined features after upscaling, including detailed magma cracks on planetary surfaces and distinct nebula patterns versus smudged alternatives.

The speaker recommends exploring "comfy workflows" (referring to ComfyUI community workflows) as a resource for upscaling pipeline ideas, acknowledging the community-driven nature of current best practices in this space.

## Production Optimization Techniques

The talk dedicates significant attention to performance optimization for production deployment, covering both latency and throughput improvements.

### LoRA Fusion

When using parameter-efficient fine-tuning techniques like LoRA (Low-Rank Adaptation), the speaker strongly recommends fusing the LoRA weights with the base model weights before deployment. This eliminates the runtime overhead of applying LoRA adapters dynamically during inference, resulting in measurable latency improvements. This is a straightforward optimization that is often overlooked but provides essentially "free" performance gains.

### Torch Compile

The talk advocates for using `torch.compile` whenever possible, noting that "compiled codes are amazing" for inference performance. PyTorch's compilation capabilities can significantly reduce inference latency through graph optimizations, kernel fusion, and other compiler optimizations. However, the speaker implies there are situations where compilation may not be applicable, suggesting awareness of the current limitations around dynamic shapes and certain operations.

### Model Quantization

Quantization is presented as a valuable optimization technique, though with the acknowledgment that "it's always not possible to use quantized variants." When applicable, quantization can provide substantial speedups, as shown in graphs presented during the talk. The key is testing quantized models to ensure quality degradation is acceptable for the specific use case.

### Stable Fast Library

The speaker gives a "shout out" to the stable-fast repository, which consolidates many of the optimizations mentioned above into a single library. According to the talk, stable-fast handles LoRA fusion, compilation, and other optimizations internally, simplifying the optimization process for practitioners. The main caveat mentioned is that it works best with Hugging Face's diffusers library, though it can be adapted for other frameworks.

### Serving Framework: Ray Serve

For serving infrastructure, the speaker mentions using Ray Serve and finding it "quite useful." Key features highlighted include out-of-the-box micro-batching support for improving throughput, multi-model multiplexing capabilities, and general infrastructure support for production ML serving. Ray Serve's batching capabilities are particularly relevant for vision pipelines where batch processing can significantly improve GPU utilization.

## Key Takeaways and Best Practices

The speaker concludes with several actionable recommendations for production vision pipelines:

**Data Quality Over Quantity**: Even with small datasets, focusing on quality of both images and prompts is more important than scale. This applies to the prompt structure and ordering as much as to the image quality itself.

**Target Low-Hanging Fruits**: The optimization techniques discussed (LoRA fusion, compilation, quantization) represent accessible performance gains that should be implemented early in production deployment.

**Pipeline-Level Optimization**: Since production deployments involve entire pipelines (not just single models), there are numerous opportunities for parallelization and batching across pipeline stages. The speaker encourages teams to actively identify and exploit these opportunities.

**Creative Upscaling**: Custom upscaling pipelines can significantly differentiate output quality, and teams should experiment with different approaches rather than settling for default upscaling.

## Critical Assessment

While the talk provides valuable practical insights, there are some limitations to note. The specific quantitative results (latency improvements, throughput gains) are shown in graphs but not discussed in detail, making it difficult to assess the magnitude of improvements. The planet generation use case, while illustrative, may not translate directly to all vision use cases. Additionally, the talk doesn't address challenges like model versioning, A/B testing, or monitoring in production, which are important aspects of mature LLMOps practices.

The promotion of Prem AI's grant program at the end suggests some of the content may be influenced by marketing considerations, though the technical content itself appears practical and grounded in real implementation experience.

Overall, this case study provides a useful blueprint for teams looking to deploy fine-tuned diffusion models in production, with particular emphasis on the optimization and quality enhancement techniques that differentiate production-grade systems from experimental deployments.