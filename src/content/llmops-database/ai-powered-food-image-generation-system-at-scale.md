---
title: "AI-Powered Food Image Generation System at Scale"
slug: "ai-powered-food-image-generation-system-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68b01850f930ef7b96c63af8"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:20:05.590Z"
  createdOn: "2025-08-28T08:50:24.039Z"
llmopsTags:
  - "content-moderation"
  - "multi-modality"
  - "structured-output"
  - "high-stakes-application"
  - "fine-tuning"
  - "prompt-engineering"
  - "model-optimization"
  - "cost-optimization"
  - "few-shot"
  - "evals"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "scaling"
  - "serverless"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "open-source"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "pytorch"
  - "fastapi"
  - "postgresql"
  - "cache"
  - "elasticsearch"
  - "openai"
  - "google-gcp"
  - "amazon-aws"
industryTags: "e-commerce"
company: "Delivery Hero"
summary: "Delivery Hero built a comprehensive AI-powered image generation system to address the problem that 86% of food products lacked images, which significantly impacted conversion rates. The solution involved implementing both text-to-image generation and image inpainting workflows using Stable Diffusion models, with extensive optimization for cost efficiency and quality assurance. The system successfully generated over 100,000 production images, achieved 6-8% conversion rate improvements, and reduced costs to under $0.003 per image through infrastructure optimization and model fine-tuning."
link: "https://www.infoq.com/presentations/ai-food-image-generation/"
year: 2025
seo:
  title: "Delivery Hero: AI-Powered Food Image Generation System at Scale - ZenML LLMOps Database"
  description: "Delivery Hero built a comprehensive AI-powered image generation system to address the problem that 86% of food products lacked images, which significantly impacted conversion rates. The solution involved implementing both text-to-image generation and image inpainting workflows using Stable Diffusion models, with extensive optimization for cost efficiency and quality assurance. The system successfully generated over 100,000 production images, achieved 6-8% conversion rate improvements, and reduced costs to under $0.003 per image through infrastructure optimization and model fine-tuning."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-food-image-generation-system-at-scale"
  ogTitle: "Delivery Hero: AI-Powered Food Image Generation System at Scale - ZenML LLMOps Database"
  ogDescription: "Delivery Hero built a comprehensive AI-powered image generation system to address the problem that 86% of food products lacked images, which significantly impacted conversion rates. The solution involved implementing both text-to-image generation and image inpainting workflows using Stable Diffusion models, with extensive optimization for cost efficiency and quality assurance. The system successfully generated over 100,000 production images, achieved 6-8% conversion rate improvements, and reduced costs to under $0.003 per image through infrastructure optimization and model fine-tuning."
---

Delivery Hero, a global food delivery company operating across 70+ countries with nearly $50 billion in GMV, developed a sophisticated AI-powered image generation system to solve a critical business problem: 86% of their food products lacked images, which significantly impacted customer conversion rates. This case study demonstrates a comprehensive approach to deploying generative AI models in production at scale, covering everything from initial MVP development to advanced optimization and safety systems.

## Business Problem and Initial Approach

The project began when data analysis revealed that products without images had dramatically lower purchase rates, with only 14% of products being bought without images compared to much higher conversion rates for products with visual content. This led to the hypothesis that improving menu content quality through AI-generated images would positively influence conversion rates. The team developed two complementary approaches: text-to-image generation using product descriptions and metadata, and an image inpainting solution that detected existing food images from vendors, masked the food objects, and regenerated them based on product specifications.

## MVP Development and Infrastructure

The initial MVP was built on Google Cloud Platform using a sophisticated architecture that demonstrated best practices for MLOps pipelines. The system utilized Cloud Run for the backend, Postgres for data storage, Pub/Sub for message queuing, and Google Cloud Storage for image storage. A critical component was Vertex AI Pipelines, which provided orchestration capabilities built on Kubeflow and Kubernetes abstractions, allowing rapid development of complex ML workflows.

The pipeline architecture was designed with modularity in mind, with each component running in separate environments optimized for specific hardware requirements. For example, the Grounding DINO object detection model required GPU resources with specific drivers, while simpler image selection components could run on lighter infrastructure. This approach demonstrated sophisticated resource management and cost optimization from the early stages.

Initially, the system relied on OpenAI's DALL-E for image generation, but the team quickly recognized the need to migrate to self-hosted models for cost efficiency and scalability. The MVP generated Google Forms for content teams to review and select appropriate images, providing human oversight while automating the bulk of the generation process.

## Migration to Self-Hosted Stable Diffusion

The transition to self-hosted Stable Diffusion models marked a significant technical evolution in the project. The team implemented a deep understanding of Stable Diffusion architecture, including the Variational AutoEncoder for image-to-latent space mapping, U-Net for denoising, and CLIP for text-image alignment. This technical depth enabled sophisticated optimizations later in the project.

However, the migration revealed unexpected challenges with CLIP's handling of non-Latin languages. Despite CLIP being trained on 50+ languages, Chinese and Arabic product names generated poor results. The solution involved translating non-Latin product names to English using Google's translation API, demonstrating practical problem-solving in production environments. Additionally, CLIP's 77-token context limit posed challenges for detailed prompts, which was solved using the Compel library that chunks large prompts and combines their embeddings.

## Scalability and Multi-Cloud Architecture

The system's scaling phase involved a complex multi-cloud architecture spanning AWS and GCP, though the presenter noted this was a mistake that added unnecessary complexity and integration challenges. The final architecture used AWS for the generation components while maintaining other services on GCP, requiring sophisticated CI/CD orchestration through GitHub Actions that routed different models to appropriate cloud environments based on the workflow requirements.

The production system achieved impressive scale, processing up to 100,000 images daily through an Elastic Kubernetes Service cluster that auto-scaled from 0 to 36 nodes using KEDA (Kubernetes Event Driven Autoscaler) for message-based scaling. This demonstrated sophisticated infrastructure management and cost optimization through dynamic resource allocation.

## Model Optimization and Cost Reduction

One of the most technically impressive aspects of the project was the systematic approach to model optimization. The team conducted comprehensive GPU benchmarking across Tesla T4, A100, and L4 instances, ultimately selecting L4 GPUs for their optimal cost-per-image ratio at 1.6 cents compared to OpenAI's 2 cents per image. This represented a 50% cost reduction while maintaining quality.

The optimization process was methodical and data-driven. Starting from a baseline of 3 minutes per image on T4 GPUs, the team implemented multiple optimization techniques: migrating from float32 to float16 precision (4x improvement), replacing the standard VAE with Tiny VAE (0.5 second improvement), adjusting Classifier-Free Guidance settings (0.2 second improvement), reducing generation steps from 50 to 40 (3.8 second improvement), and using PyTorch's torch.compile for weight pre-compilation. The final result was 11.2 seconds per image, representing an 85% reduction in generation time and achieving costs under $0.003 per image - approximately 8x more cost-effective than DALL-E.

## Quality Measurement and Evaluation Framework

Addressing the fundamental challenge of evaluating generative AI quality without ground truth, the team developed an innovative automated evaluation system. Rather than relying on subjective human assessment, they created multiple computer vision models aligned with their product guidelines, covering image positioning, composition, coloring, and content requirements. Each aspect was evaluated by a separate model, and the combined scores provided an objective quality metric.

This evaluation framework enabled systematic comparison of different model versions and configurations. Using a standardized dataset of 1000 product descriptions stratified by entities and categories, they tested various model configurations, ultimately identifying Stable Diffusion Juggernaut V9 with IP adapter as the optimal configuration. This approach demonstrates sophisticated evaluation methodology for generative AI systems in production.

## Model Fine-Tuning for Local Cuisine

The system faced significant challenges with local and exotic dishes that weren't well-represented in the base model's training data. Rather than using LoRA (Low-Rank Adaptation) fine-tuning, which would have required managing thousands of different adapters for various local dishes, the team implemented full model fine-tuning using OneTrainer framework.

The fine-tuning process involved careful dataset curation, extracting relevant local dish data from their warehouse, filtering duplicates and inappropriate images, and implementing additional recaptioning using multimodal language models. The training configuration included standard deep learning parameters like learning rate scheduling, warmup steps, and optimizers, plus image augmentation techniques to increase dataset diversity.

While the fine-tuned model excellently handled local dishes, it showed some degradation in common items like pizza, demonstrating the typical trade-offs in model specialization. The solution involved serving multiple model versions and routing requests based on product metadata, showing sophisticated model management in production.

## AI Safety and Quality Assurance Systems

Recognizing the reputational risks of generating inappropriate content, the team implemented a comprehensive AI safety system. This multi-component approach included creature and people detection using a customized version of the Recognize Anything model with 5,000+ tags, optical character recognition using EasyOCR to detect and filter malformed text, spatial analysis using Grounding DINO to ensure proper product positioning with adequate margins, and advanced image quality assessment measuring contrast, exposure, saturation, and blur levels using Laplacian gradient calculations.

The safety system assigned scores to all generated images, automatically filtering out problematic content before human review. This approach ensured that inappropriate or low-quality images never reached end users while maintaining high throughput in the generation pipeline.

## Production Impact and Results

The system's production deployment demonstrated significant business impact, generating over 1 million images with more than 100,000 products receiving generated images on the platform. The business hypothesis was validated through A/B testing, showing 6-8% conversion rate improvements when images were added to products. The cost optimization achieved savings in the hundreds of thousands to millions of euros range at the projected scale of tens of millions of images.

The deployment strategy involved gradual rollout to restaurant owners through their application interface, allowing them to review AI-generated suggestions and select the most appropriate images for their menus. This human-in-the-loop approach maintained quality control while achieving scale efficiency.

## Key Technical Lessons and Best Practices

The project yielded several critical insights for LLMOps practitioners. The multi-cloud approach proved unnecessarily complex and should be avoided unless absolutely necessary, as integration challenges significantly delayed deliverables. Model optimization investment showed exceptional ROI, with every hour spent on optimization translating to substantial cost savings at scale. Most importantly, the team emphasized the critical importance of automating quality measurement before focusing on model improvement, as you cannot optimize what you cannot measure effectively.

The case study demonstrates sophisticated end-to-end MLOps practices, from initial problem identification through MVP development, scaling, optimization, and production deployment. The combination of technical depth, business impact measurement, and systematic optimization approaches provides a comprehensive template for deploying generative AI systems at scale in production environments.