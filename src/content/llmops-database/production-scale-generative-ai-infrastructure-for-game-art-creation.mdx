---
title: "Production-Scale Generative AI Infrastructure for Game Art Creation"
slug: "production-scale-generative-ai-infrastructure-for-game-art-creation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694af5f13315d3f83009c2ec"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:48.718Z"
  createdOn: "2025-12-23T20:05:05.878Z"
llmopsTags:
  - "content-moderation"
  - "caption-generation"
  - "fine-tuning"
  - "model-optimization"
  - "latency-optimization"
  - "cost-optimization"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "microservices"
  - "scaling"
  - "devops"
  - "orchestration"
  - "pytorch"
  - "fastapi"
  - "nvidia"
  - "meta"
  - "hugging-face"
industryTags: "media-entertainment"
company: "Playtika"
summary: "Playtika, a gaming company, built an internal generative AI platform to accelerate art production for their game studios with the goal of reducing art production time by 50%. The solution involved creating a comprehensive infrastructure for fine-tuning and deploying diffusion models (Stable Diffusion 1.5, then SDXL) at scale, supporting text-to-image, image-to-image, and inpainting capabilities. The platform evolved from using DreamBooth fine-tuning with separate model deployments to LoRA adapters with SDXL, enabling efficient model switching and GPU utilization. Through optimization techniques including OneFlow acceleration framework (achieving 40% latency reduction), FP16 quantization, NVIDIA MIG partitioning, and careful infrastructure design, they built a cost-efficient system serving multiple game studios while maintaining quality and minimizing inference latency."
link: "https://medium.com/@playtika-tech-ai/generative-art-at-scale-in-playtika-cf36be807fea"
year: 2024
seo:
  title: "Playtika: Production-Scale Generative AI Infrastructure for Game Art Creation - ZenML LLMOps Database"
  description: "Playtika, a gaming company, built an internal generative AI platform to accelerate art production for their game studios with the goal of reducing art production time by 50%. The solution involved creating a comprehensive infrastructure for fine-tuning and deploying diffusion models (Stable Diffusion 1.5, then SDXL) at scale, supporting text-to-image, image-to-image, and inpainting capabilities. The platform evolved from using DreamBooth fine-tuning with separate model deployments to LoRA adapters with SDXL, enabling efficient model switching and GPU utilization. Through optimization techniques including OneFlow acceleration framework (achieving 40% latency reduction), FP16 quantization, NVIDIA MIG partitioning, and careful infrastructure design, they built a cost-efficient system serving multiple game studios while maintaining quality and minimizing inference latency."
  canonical: "https://www.zenml.io/llmops-database/production-scale-generative-ai-infrastructure-for-game-art-creation"
  ogTitle: "Playtika: Production-Scale Generative AI Infrastructure for Game Art Creation - ZenML LLMOps Database"
  ogDescription: "Playtika, a gaming company, built an internal generative AI platform to accelerate art production for their game studios with the goal of reducing art production time by 50%. The solution involved creating a comprehensive infrastructure for fine-tuning and deploying diffusion models (Stable Diffusion 1.5, then SDXL) at scale, supporting text-to-image, image-to-image, and inpainting capabilities. The platform evolved from using DreamBooth fine-tuning with separate model deployments to LoRA adapters with SDXL, enabling efficient model switching and GPU utilization. Through optimization techniques including OneFlow acceleration framework (achieving 40% latency reduction), FP16 quantization, NVIDIA MIG partitioning, and careful infrastructure design, they built a cost-efficient system serving multiple game studios while maintaining quality and minimizing inference latency."
---

## Overall Summary

Playtika, a mobile gaming company, developed an internal generative AI platform to revolutionize their art production pipeline across multiple game studios. The platform addresses the creative needs of designers, content creators, and marketing teams by providing text-to-image, image-to-image, sketch-to-image, and inpainting capabilities. The business objective was ambitious: achieve a 50% reduction in art production time while simultaneously increasing the volume of art assets, enabling more game features, personalized content, and cohesive visual experiences. The case study provides detailed insights into both the model production pipeline (the "use case factory") and the complex infrastructure challenges of serving diffusion models at scale in a production environment.

The platform serves as a back-office tool available to game studio stakeholders including creative teams, designers, copywriters, account managers, and monetization managers. Beyond game development, it plays a crucial role in producing marketing materials and orchestrating in-game campaigns. What distinguishes this implementation is the emphasis on maintaining Playtika's distinct visual style for each studio and image type, developed through extensive in-house research and user feedback. The technical requirements centered on enabling fine-tuning of in-house models based on proprietary IP assets, deploying these models to production without requiring R&D involvement for each deployment, serving models cost-efficiently with emphasis on latency and stability, and keeping pace with the rapid evolution of generative AI models with minimal user experience disruption.

## The Use Case Factory: Model Production at Scale

After a successful proof of concept with several studios, Playtika embarked on creating what they termed a "use case factory" to generate numerous high-quality machine learning models tailored to different studio needs. This required establishing a well-defined process with three key components: fine-tuning infrastructure, model evaluation, and model deployment. To manage this workflow, they developed a dedicated user interface deployed in their training environment and exposed to internal users. The UI provided control over the fine-tuning process while offering flexibility in parameter selection.

The UI featured automatic caption generation to reduce manual effort, a fine-tune section allowing users to adjust parameters (some automated or set to defaults), and an inference section enabling users to test models and generate outputs for analysis. The workflow enabled users to generate dozens of models with varying configurations. The selection process involved collaboration with studio clients who would tag the most accurate and relevant outputs during inference. The best model configuration—the one consistently producing the highest-quality images—would then be registered in the model registry with its optimal configuration, ensuring readiness for production deployment.

The use cases were divided into three categories: character, background, and additional elements. Importantly, they found that generating a specific model per use case yielded significantly better results than attempting to create more generalized models. This decision, while improving quality, introduced scaling challenges that would influence their architectural evolution.

## Evolution of Fine-Tuning Methods and Architecture

### DreamBooth Era: Quality Over Scalability

When Stable Diffusion 1.5 launched, Playtika evaluated three fine-tuning methods: DreamBooth, Textual Inversion (TI), and LoRA (Low-Rank Adaptation). From an engineering perspective, LoRA and TI maintain base model weights unchanged and produce separate, compact weight files acting as plugins, while DreamBooth creates entirely new model weights. In terms of quality, DreamBooth emerged as the superior choice, so quality concerns drove them to select it as their initial fine-tuning method.

However, this decision created significant infrastructure challenges. With multiple studios, multiple categories per studio (character, background, elements), and multiple actions to support (text-to-image, image-to-image, inpainting), the number of required deployments multiplied dramatically: Studios × Categories Per Studio × Actions. Each deployment required several gigabytes of model weights. They deliberately chose not to switch models in memory during inference due to concerns about smooth switching, latency impact, and operational efficiency.

This architecture meant each service was tailored to reflect a unique action and use case, with each model and action preloaded at startup time. The approach raised concerns about GPU underutilization, particularly when multiple use cases were active with at least one pod operational per use case. The large file sizes and proliferation of deployments created a scaling bottleneck that demanded reevaluation.

### Transition to SDXL and LoRA: Architectural Transformation

The introduction of SDXL 1.0 prompted a reassessment of their fine-tuning approach. After reevaluating DreamBooth, TI, and LoRA methods with SDXL as the base model, they concluded that LoRA now met their quality criteria for production deployment. The combination of SDXL with LoRA proved successful in both quality and engineering dimensions, representing a significant architectural shift.

This new approach provided several advantages. First, SDXL enabled serving different actions like text-to-image, image-to-image, and inpainting without retraining separate models for each action. It allowed generalization of services and fast, easy switching between actions during inference using Auto pipeline and the load_lora method. The LoRA method enabled them to persist only one large base model in the model registry, with dozens of smaller addons/plugins where each represents a use case. At request time, clients supply a model ID along with generation configuration, which is loaded at inference time and unloaded afterward.

This architectural transformation significantly impacted service utilization and model management efficiency. The new architecture meant each service embodied a specific action, while switching between use cases during inference time was seamlessly managed through LoRA loading. This reduced the total number of large deployments and improved resource utilization, though challenges remained around maximizing GPU efficiency.

## Infrastructure and Image Building Considerations

Unlike classical machine learning models, generative AI models require GPUs and NVIDIA dependencies that significantly increase Docker image sizes. Classical models might result in images of only a few hundred megabytes with small model binaries and minimal Python dependencies. In contrast, generative AI models require several gigabytes just for the base image and dependencies. An additional challenge emerged from data scientists' preference for NVIDIA's optimized PyTorch image, which, while well-suited for their needs, proved extremely large.

In serving systems, keeping Docker containers lean is crucial. When scaling up, pulling container images quickly requires minimizing their size. Additionally, Hugging Face's from_pretrained method only allows loading models into GPU memory either from the Hugging Face Hub or a localhost directory, necessitating downloading the base model each time a new pod launches.

Their solutions included using an optimized base image—specifically nvidia/cuda:12.2.2-cudnn8-runtime-ubuntu22.04—which includes everything necessary for inference while allowing control over Python version and dependency management. Rather than "baking" models into images, they implemented deferred model loading, loading base models at startup. While this could introduce delays from downloading models during pod startup, they mitigated this by ensuring all models are stored in a model registry mounted across all services. This approach allows retrieving model paths directly from the registry, bypassing Hugging Face limitations and enabling rapid loading from storage cache.

## GPU Utilization and Performance Optimization

### Identifying the Utilization Problem

After establishing their LoRA-based architecture, extensive load testing was conducted to establish baselines for throughput and latency. In their use case, batch size was fixed at 4 (each "Generate" click produces 4 images). Combined with switching LoRAs in memory for every inference, this made options like dynamic batching challenging and could lead to low GPU utilization, making efficient resource utilization a major bottleneck.

Initial monitoring using nvidia-smi for utilization values proved misleading. They discovered that nvidia-smi indicates the percentage of time when one or more kernels were actively executing on the GPU, not necessarily reflecting true computational utilization. To address this, they implemented dcgm-exporter to access DCGM-based metrics for comprehensive GPU performance views. They observed situations where GPU utilization appeared at 100% while Tensor Core utilization was only 45.5%, indicating the GPU was busy but compute capabilities weren't fully leveraged.

To tackle this challenge, they pursued three strategies: reducing memory footprint to deploy more models per GPU, accelerating inference to enhance processing speed, and implementing parallel GPU computation to run more requests simultaneously and maximize GPU core usage.

### Acceleration Frameworks and Optimization Techniques

In pursuing improved inference speed, they explored various acceleration techniques. They evaluated acceleration methods including LoRA LCM and distilled versions of SDXL such as SDXL Turbo, but both failed to meet image quality standards. Their requirements for an acceleration framework were specific: robust SDXL support, low compilation time, LoRA support without fusing (as required by TensorRT at the time), minimal LoRA switching time, ability to switch to new base models with the same architecture without recompilation, and dynamic image size support without recompilation.

They selected OneFlow over TensorRT (NVIDIA) and AITemplate (Meta) for its exceptional developer experience and state-of-the-art speed enhancements, achieving a 40% reduction in latency time. They noted that the speed of development and support for new models from OneFlow was impressive. To reduce memory footprint, they used the FP16 format with specific fixes. They continue monitoring advancements and adapting their solution accordingly.

### GPU Parallel Processing and NVIDIA Technologies

After significantly improving latency and reducing memory footprint, they revisited DCGM metrics focusing on GPU utilization and Tensor Core utilization. Both showed improvement, but metrics indicated GPUs could handle additional concurrent requests on the same device. However, while GPUs are designed for high parallelism within a single request, managing multiple requests concurrently on a single GPU requires careful handling. It's not as straightforward as CPU multi-threading.

NVIDIA offers several solutions: Time Slicing (default), which allows the GPU to alternate between different tasks by dividing available time among them; MIG (Multi-Instance GPU), which enables creating multiple isolated instances within a single physical GPU, each with dedicated resources; and MPS (Multi-Process Server), which allows multiple processes to share a single GPU more efficiently by managing resource access and reducing context-switching overhead.

Their exploration of NVIDIA MPS and MIG yielded mixed results. Initially assuming MPS would be optimal given its ability to allow multiple CUDA applications to share a GPU, they encountered significant issues including insufficient documentation, and critically, the MPS server responsible for receiving and combining requests frequently crashed, causing significant quality of service degradation. Unable to identify the root cause of these failures, they discontinued MPS usage.

Shifting to MIG, they observed more promising outcomes. By partitioning the A100 GPU into different configurations, they tested various latency and throughput scenarios. The most effective configuration involved two slices: MIG 3g.20gb and MIG 4g.20gb. This setup allowed serving more users with a minor trade-off of a few additional seconds in latency. With this configuration, they could choose which service would be deployed with lesser resources, with leaner services like image-to-image suffering less penalty than text-to-image since they require fewer resources.

## Ongoing Optimization Work

They continue working on quantization of base models. By making models smaller and requiring fewer cores/resources, they may be able to use MIG without penalty. OneFlow offers quantization as part of their enterprise service, and Quanto by Hugging Face is another promising solution they're monitoring.

## Critical Assessment and LLMOps Considerations

This case study provides valuable insights into the practical challenges of deploying generative AI models at scale in production environments. The evolution from DreamBooth to LoRA with SDXL demonstrates the importance of balancing quality requirements with operational efficiency—a common tension in LLMOps. While the initial focus on quality led them to DreamBooth despite its operational challenges, the maturation of LoRA with better base models eventually provided an acceptable quality-efficiency trade-off.

The infrastructure decisions around Docker image optimization, model registry management, and deferred loading represent thoughtful approaches to common LLMOps challenges. The discovery that nvidia-smi provides misleading utilization metrics and the subsequent adoption of DCGM-based monitoring highlights the importance of proper observability in GPU-based serving systems. The detailed exploration of GPU sharing technologies (MPS, MIG, Time Slicing) and their honest assessment of MPS failures provides valuable lessons for others deploying similar systems.

However, certain aspects warrant balanced consideration. The claimed 50% reduction in art production time is stated as a goal rather than a demonstrated result in the case study. The text focuses heavily on the infrastructure and optimization journey but provides limited quantitative evidence of business impact or user adoption metrics. The emphasis on achieving 40% latency reduction through OneFlow is notable, but the case study would benefit from more comprehensive performance baselines and comparisons.

The architectural evolution from massive proliferation of deployments to a more centralized approach with LoRA switching represents sound engineering, though the fixed batch size of 4 and inability to leverage dynamic batching suggests remaining optimization opportunities. The ongoing work on quantization and continued exploration of GPU sharing strategies indicates this is an evolving system rather than a fully optimized final state.

From an LLMOps perspective, the case study excels in demonstrating end-to-end infrastructure for model production and deployment, including the "use case factory" concept for systematic fine-tuning and evaluation. The emphasis on creating tooling (the fine-tuning UI) that enables non-R&D users to deploy models aligns well with LLMOps principles of democratization and self-service. The model registry pattern and careful version management reflect mature MLOps practices applied to generative AI.

The case study's focus on diffusion models for image generation rather than large language models means some aspects differ from typical LLMOps challenges around prompt engineering, retrieval augmentation, or safety filtering. However, the core concerns around efficient serving, model management, GPU optimization, and balancing quality with operational constraints remain highly relevant to anyone deploying large generative models in production. The honest discussion of failed approaches (MPS) and ongoing challenges provides realistic perspective often missing from vendor-focused case studies.