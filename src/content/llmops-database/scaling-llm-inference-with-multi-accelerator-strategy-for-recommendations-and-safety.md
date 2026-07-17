---
title: "Scaling LLM Inference with Multi-Accelerator Strategy for Recommendations and Safety"
slug: "scaling-llm-inference-with-multi-accelerator-strategy-for-recommendations-and-safety"
draft: false
llmopsTags:
  - "content-moderation"
  - "customer-support"
  - "classification"
  - "multi-modality"
  - "fine-tuning"
  - "cost-optimization"
  - "latency-optimization"
  - "model-optimization"
  - "multi-agent-systems"
  - "embeddings"
  - "kubernetes"
  - "vllm"
  - "pytorch"
  - "tensorflow"
  - "fastapi"
  - "monitoring"
  - "scaling"
  - "orchestration"
  - "open-source"
  - "google-gcp"
  - "meta"
  - "hugging-face"
industryTags: "media-entertainment"
company: "Spotify"
summary: "Spotify faced exponentially growing compute demands from deploying LLMs across recommendation systems and content safety at global scale, serving 700 million users. The company implemented a multi-accelerator strategy using both GPUs and TPUs through a shared resource pool, leveraging open-source inference engines (vLLM and SGLang) to enable seamless hardware switching. By adopting Google Cloud's TPUs alongside their existing GPU fleet and fine-tuning open-weight models like Gemma on Spotify-specific data, they achieved 30-40% cost savings on certain workloads while maintaining latency targets, allowing continuous innovation in AI features like AI DJ and multilingual safety moderation without being constrained by accelerator availability."
link: "https://youtu.be/WbMlr83CYDA"
year: 2026
seo:
  title: "Spotify: Scaling LLM Inference with Multi-Accelerator Strategy for Recommendations and Safety - ZenML LLMOps Database"
  description: "Spotify faced exponentially growing compute demands from deploying LLMs across recommendation systems and content safety at global scale, serving 700 million users. The company implemented a multi-accelerator strategy using both GPUs and TPUs through a shared resource pool, leveraging open-source inference engines (vLLM and SGLang) to enable seamless hardware switching. By adopting Google Cloud's TPUs alongside their existing GPU fleet and fine-tuning open-weight models like Gemma on Spotify-specific data, they achieved 30-40% cost savings on certain workloads while maintaining latency targets, allowing continuous innovation in AI features like AI DJ and multilingual safety moderation without being constrained by accelerator availability."
  canonical: "https://www.zenml.io/llmops-database/scaling-llm-inference-with-multi-accelerator-strategy-for-recommendations-and-safety"
  ogTitle: "Spotify: Scaling LLM Inference with Multi-Accelerator Strategy for Recommendations and Safety - ZenML LLMOps Database"
  ogDescription: "Spotify faced exponentially growing compute demands from deploying LLMs across recommendation systems and content safety at global scale, serving 700 million users. The company implemented a multi-accelerator strategy using both GPUs and TPUs through a shared resource pool, leveraging open-source inference engines (vLLM and SGLang) to enable seamless hardware switching. By adopting Google Cloud's TPUs alongside their existing GPU fleet and fine-tuning open-weight models like Gemma on Spotify-specific data, they achieved 30-40% cost savings on certain workloads while maintaining latency targets, allowing continuous innovation in AI features like AI DJ and multilingual safety moderation without being constrained by accelerator availability."
notion:
  pageId: "398f8dff-2538-8061-a8ea-d5f6ef57aaf7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-09T13:59:00.000Z"
  lastEditedTime: "2026-07-09T15:19:00.000Z"
  publishedAt: "2026-07-09T15:24:22Z"
---

## Overview and Context

Spotify operates one of the largest-scale LLM deployments in the media and entertainment industry, serving AI-powered features to over 700 million users globally. The case study, presented jointly by Google Cloud and Spotify's machine learning platform team, illustrates how the company navigated the rapid evolution from classical machine learning to modern AI systems while managing exponentially growing infrastructure demands. The core challenge centered on sustaining product innovation without being blocked by accelerator constraints, particularly given the supply limitations and cost trajectory of GPU-based inference.

The presentation features perspectives from both infrastructure providers and practitioners. Google Cloud's product management team outlines their hardware and software strategy for LLM inference, while Spotify's staff machine learning engineer details how their platform team orchestrates these components to productionize AI workloads at scale.

## Infrastructure Philosophy and Platform Architecture

Spotify's machine learning platform team operates with a fundamental mandate: ensure that product innovation is never blocked by lack of compute. This drives their infrastructure decisions across the entire ML lifecycle, from training and fine-tuning through to inference serving. The platform team abstracts away infrastructure complexity so that product and modeling teams can focus on building user experiences rather than worrying about how to scale their models to hundreds of millions of users.

A critical insight from Spotify's experience is that the pace of change in AI infrastructure has fundamentally shifted. With classical ML, framework and infrastructure changes occurred over years - the transition from TensorFlow dominance around 2019 to PyTorch adoption happened gradually. In contrast, modern AI sees similar magnitude changes happening in months rather than years. New model families, inference engines, and hardware options constantly emerge, requiring platform teams to build systems that can adapt quickly while maintaining stability for production workloads.

The shared accelerator pool represents Spotify's architectural response to this challenge. Rather than statically assigning GPUs to specific services, they created a dynamic pool from which recommendation systems, safety workloads, search, and other services all draw capacity. This approach significantly improves utilization because workloads have complementary demand patterns - when one service experiences traffic spikes, another might taper off. The economic and operational efficiency gains from this pooling strategy proved substantial enough that Spotify expanded the concept to include both GPUs and TPUs as part of a unified multi-accelerator strategy.

## Hardware Strategy and TPU Integration

Google Cloud's presentation emphasizes that their TPU lineage extends back to 2015 with the V1 chip, representing over a decade of iterative innovation specifically targeting inference workloads. The latest generation, announced as Trillium for training and Ironwood for inference, reflects hardware design choices specifically addressing modern LLM serving challenges. For the Ironwood inference chips, Google reduced network hops to seven through topology changes, increased total SRAM to 384MB to support larger KV caches for low-latency serving, reduced latency by 2x through the butterfly topology compared to previous generations, and improved performance per dollar by 80% compared to V5.

For Spotify, the motivation to evaluate TPUs stemmed from practical constraints rather than purely technical curiosity. GPU scarcity meant that simply provisioning more capacity wasn't always feasible, and the infrastructure team continuously seeks ways to optimize their accelerator footprint. The evaluation revealed that TPU economics varied significantly by workload type. For AI DJ interactions, TPUs met latency targets while yielding approximately 30% potential cost savings compared to GPUs. For safety classification workloads, particularly prefill-heavy text processing, TPUs demonstrated around 40% potential cost savings. The multilingual safety workload showed even more dramatic results, with roughly 58% potential cost savings on TPUs over GPUs.

Critically, the hardware evaluation didn't require massive re-architecture efforts because of Spotify's inference engine choices. The ability to switch between GPU and TPU backends with minimal code changes - described as just two lines of configuration in some cases - made the evaluation practical. This hardware portability emerged as a key architectural principle: building on inference engines that abstract hardware differences enables continuous optimization of accelerator economics without disrupting production services.

## Open-Source Inference Engine Strategy

Google Cloud's software strategy centers on highly performant, composable open-source components spanning from orchestration through inference engines down to hardware. The two primary engines, vLLM and SGLang, have become foundational to the inference industry. vLLM saw a complete re-architecture announced in October 2025, while SGLang emerged shortly after using many of the same composable components. Google's direct integration work in these projects aims to deliver near-zero developer friction when adopting TPUs - the same configurations and user experiences developers already know from GPU deployments carry over.

For Spotify, vLLM initially served as the primary inference engine for their earlier LLM deployments. The AI DJ feature, which uses LLMs to understand user prompts and introduce music recommendations in a conversational interface, deployed on vLLM running on GKE. This choice proved strategic when evaluating TPUs because vLLM's hardware abstraction meant the evaluation required minimal code changes. The production deployment stack remained largely unchanged while the underlying hardware shifted.

As LLM roles evolved at Spotify, SGLang entered their inference stack alongside vLLM. The transition from using LLMs primarily at the edges of experiences - understanding user prompts and orchestrating routing - to pushing them deeper into core algorithms created new requirements. When LLMs began actively participating in candidate generation and scoring for recommendations, the interaction patterns shifted from simple text-in-text-out to more complex embeddings and structured outputs. SGLang's support for these patterns, combined with its JAX implementation offering both GPU and TPU backends, made it a natural addition to the stack.

The platform team's willingness to introduce multiple inference engines reflects their evaluation criteria for infrastructure building blocks. They assess whether components fit immediate needs while also evaluating whether they'll evolve as use cases change. Both vLLM and SGLang demonstrated this adaptability through active development communities, hardware flexibility, and responsiveness to emerging model architectures. The presentation emphasizes that popular open-source frameworks benefit from massive community traction across academia, AI labs, and enterprises, creating important contribution flywheels that drive continuous improvement.

## Use Case: AI Recommendations at Scale

Spotify's recommendation workloads illustrate how LLM roles expanded from peripheral to core algorithmic components. The AI Playlisting feature allows users to describe music preferences in natural language - a mood, vibe, or genre - and receive generated playlists matching that description. Initially, LLMs served primarily as translators, converting freeform user prompts into structured signals that traditional recommendation systems could consume.

This functionality evolved into the AI DJ experience, where users interact conversationally with a personalized DJ persona. The DJ acknowledges user interactions and introduces music recommendations, creating a more engaging entry point into Spotify's catalog. Scaling this to millions of concurrent users required significant GPU fleet capacity, motivating the infrastructure team's search for ways to relieve that pressure through alternative hardware.

The deeper algorithmic integration of LLMs fundamentally changed infrastructure requirements. When recommendation systems began using LLMs for candidate generation - creating pools of potential next tracks and podcasts - and for scoring and ranking those candidates, the inference load multiplied dramatically. The system now processes user listening history context to generate hundreds of content candidates, then scores those hundreds of candidates, all multiplied across millions of users. This created intense accelerator pressure that couldn't be solved simply by adding more GPUs.

Spotify's evaluation of TPUs for these workloads involved collaboration with Google Professional Services to optimize parity between GPU and TPU deployments for large-scale inference. The ability to use SGLang for both hardware backends enabled systematic comparison of performance and cost characteristics. The workload shapes proved suitable for TPU economics while meeting the latency requirements for real-time recommendation serving.

## Use Case: Content Safety at Global Scale

Safety moderation represents another large-scale inference workload with distinct characteristics. Safety systems operate across the entire Spotify application, becoming particularly critical anywhere user input appears. Search autocomplete suggestions must be safe by Spotify's definition. AI DJ interactions require moderation of both user requests and the DJ's generated responses to align with brand and safety standards.

The combination of always-on coverage across the application, support for hundreds of millions of users globally, and aggressive latency targets - often under 40 milliseconds - creates another significant accelerator demand. Because Spotify had already deployed vLLM, evaluating this workload on TPUs required minimal friction. The prefill-heavy text classification pattern showed strong affinity for TPU economics, yielding the 40% cost savings mentioned earlier.

The evolution of safety workloads mirrors the pattern seen in recommendations: LLM responsibilities expanded from simple text classification to multimodal catalog understanding. Traditional approaches to flagging violative content relied on collaborative filtering, using user affinity patterns to identify problematic material. Multimodal LLMs enabled Spotify to understand their catalog directly - analyzing images, audio, and video without depending on user behavior signals. This capability improvement came with substantial infrastructure costs, requiring the platform team to deploy various optimization strategies.

The safety use case also highlights Spotify's multilingual requirements. Early text-based safety workloads focused on English, but serving a global audience demands multilingual coverage. LLM advances in multilingual understanding enabled expansion to support 70+ languages. Spotify evaluated model families specifically for language coverage breadth and quality, leading to fine-tuned Gemma models as strong candidates for production deployment.

## Model Selection and Fine-Tuning Strategy

The case study reveals a deliberate strategy regarding open-weight versus API-based models. Spotify does use API-based models like Gemini and OpenAI for initial prototypes to get features in front of users quickly. However, after initial launch, they transition to open-weight models that they can fine-tune on Spotify's proprietary data. This approach reflects several strategic bets: that open-weight models will continuously improve (as evidenced by the Gemma family's progression), that fine-tuning on in-house data will yield quality improvements, and that they can optimize infrastructure footprint through various techniques unavailable with API-based serving.

The Gemma model family emerges as particularly important to Spotify's production deployments. Google positioned Gemma as co-designed for TPUs - trained on TPUs but designed for deployment across diverse hardware backends from personal devices to data center servers. The Gemma 4 models, announced just weeks before the presentation with Apache 2.0 licensing, demonstrated quality improvements over predecessors while maintaining relatively small sizes. The 31B and 26B mixture-of-experts models reportedly outrank models 10x their size on human evaluations.

For Spotify's image understanding safety workloads, the product modeling team evaluated visual understanding models in the Gemma family, then fine-tuned selected models on Spotify data. The iterative workflow involves evaluating different model families and sizes, fine-tuning them, then repeating as new model versions release. When Gemma 4 launched during their Gemma 3 rollout, early benchmarks showed a 2.6% improvement on distinguishing high-severity content. The Gemma 3 12B model quality levels appeared achievable with smaller Gemma 4 model sizes, representing efficiency gains from model architecture improvements.

For multilingual safety, Gemma 3 9B emerged as a strong fit during initial evaluation. While that rollout progressed in production, Gemma 4 launched with notable improvements: 2x better hate speech detection and 28% fewer false positives. The platform team's infrastructure design enabled rapid model upgrades to capture these quality improvements without major deployment changes. The presentation emphasizes that Gemma 4's co-design on TPUs creates optimism about further performance-per-dollar gains as inference engines like vLLM optimize for the new model architectures.

## Operational Efficiency and Resource Management

Beyond core inference serving, Spotify's platform team optimizes for operational efficiency through various Google Cloud features. Processing their image catalog of four billion images for safety moderation would require two years of continuous GPU time if run naively. To make such large-scale backfills practical and cost-effective, they leverage Dynamic Workload Scheduler, spot instances, and future reservations. These capabilities allow them to tune workload execution for efficiency while managing costs.

The shared accelerator pool concept extends beyond just GPU and TPU mixing to encompass sophisticated workload placement decisions. The platform team analyzes workload characteristics to determine which accelerator type offers better economics for each use case. Prefill-heavy text workloads show strong TPU affinity, while other patterns may favor GPUs. By controlling exactly what workloads get scheduled on each accelerator type, they continuously optimize for cost and performance across their entire fleet.

This approach requires treating accelerators as fungible resources to some degree, which depends fundamentally on the hardware abstraction provided by inference engines. The presentation repeatedly emphasizes that because vLLM and SGLang span multiple hardware backends, Spotify can make placement decisions dynamically based on capacity availability and cost optimization without requiring application-level changes. This flexibility improves overall system resilience and enables continuous optimization as hardware options and pricing evolve.

## Model Development and Infrastructure Alignment

A key theme throughout the case study is the parallel evolution happening on modeling and infrastructure sides. Product teams continuously launch new AI features and iterate existing ones through model upgrades and tuning, often pushing inference stack limits. The platform team's role involves keeping product needs and infrastructure capabilities aligned so that product teams can adopt latest models and innovations without worrying about production scale operationalization.

The presentation describes the AI innovation pace creating both growth and efficiency cycles. Growth comes from launching new features and enriching existing ones with more sophisticated models. Efficiency comes from building stacks using composable open-source and Google Cloud building blocks that enable continuous optimization. Over years of vLLM iterations, Spotify has observed the raw accelerator footprint needed to serve workloads significantly decrease through software improvements alone, independent of hardware changes.

This illustrates an important LLMOps principle: infrastructure investment shouldn't just scale linearly with demand but should actively bend the cost curve through optimization. The presentation positions this as a sustainable approach where Spotify can "keep innovating with AI and deliver the best possible experience to users" without accelerator growth becoming economically untenable.

## Broader Ecosystem and Future Directions

Google Cloud's presentation situates this case study within broader ecosystem efforts. Their vision involves making it effortless for customers to serve models on TPUs while delivering industry-leading price performance and state-of-the-art developer experience for large-scale production serving. The emphasis on open source extends beyond just inference engines to include orchestration layers and hardware-level libraries, with initiatives like the MaxDiffusion project collecting high-performance composable components.

The roadmap priorities center on ensuring emerging open-weight models run exceptionally well and cost-effectively on the newest AI chips launching in late 2026 and Q1 2027. Continued focus on supporting more modalities and longer context windows for state-of-the-art models reflects the workload evolution Spotify described. Google also emphasizes continuing co-design efforts with customers training or releasing foundation models, ensuring optimal performance across TPUs and other hardware backends.

For practitioners considering similar architectures, the case study offers several validated approaches: shared accelerator pools improve utilization when workload demand patterns vary; multi-accelerator strategies with GPUs and TPUs provide economic optimization opportunities and capacity resilience; open-source inference engines with hardware abstraction enable low-friction evaluation and switching; open-weight models with fine-tuning on proprietary data can deliver better economics and quality than API-based approaches at scale; and systematic workload characterization allows strategic placement decisions across heterogeneous hardware.

The presentation concludes with resources for getting started, including reproducible recipes for various model sizes across different data distributions using vLLM, GitHub links for the vLLM and SGLang projects, and demo notebooks for Google's Trillium and Ironwood chips. These resources reflect the emphasis throughout on making advanced LLM serving accessible through well-documented, open-source tooling rather than proprietary platforms.
