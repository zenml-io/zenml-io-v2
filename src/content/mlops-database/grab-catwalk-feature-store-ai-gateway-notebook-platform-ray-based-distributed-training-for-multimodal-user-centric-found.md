---
title: "Ray-based distributed training for multimodal user-centric foundation models and large-scale user embeddings at Grab"
slug: "grab-catwalk-feature-store-ai-gateway-notebook-platform-ray-based-distributed-training-for-multimodal-user-centric-found"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "pipeline-orchestration"
  - "ray"
  - "spark"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Grab"
companySlug: "grab"
platformName: "Catwalk / Feature Store / AI Gateway / Notebook Platform"
contentType: "video"
summary: "Grab, a Singapore-based super app operating across eight countries and 800 cities, built custom user-centric foundation models to learn holistic representations from their diverse multimodal data spanning ride-hailing, food delivery, grocery, and financial services. The team developed a novel architecture using modality-specific adapters to tokenize heterogeneous data (tabular user attributes, time series behaviors, merchant IDs, locations), pre-trained using masked language modeling and next token prediction, and extracted embeddings for downstream tasks across multiple verticals. By migrating to Ray for distributed training on heterogeneous clusters with CPU offloading for massive embedding layers (40 million user embeddings), they achieved 6x training speedup, increased GPU utilization from 19% to 85%, and demonstrated meaningful improvements over traditional methods and specialized models in multiple production use cases."
link: "https://www.youtube.com/watch?v=DRtha-uVgpY"
year: 2025
seo:
  title: "Grab: Ray-based distributed training for multimodal user-centric foundation models and large-scale user embeddings at Grab - ZenML MLOps Database"
  description: "Grab, a Singapore-based super app operating across eight countries and 800 cities, built custom user-centric foundation models to learn holistic representations from their diverse multimodal data spanning ride-hailing, food delivery, grocery, and financial services. The team developed a novel architecture using modality-specific adapters to tokenize heterogeneous data (tabular user attributes, time series behaviors, merchant IDs, locations), pre-trained using masked language modeling and next token prediction, and extracted embeddings for downstream tasks across multiple verticals. By migrating to Ray for distributed training on heterogeneous clusters with CPU offloading for massive embedding layers (40 million user embeddings), they achieved 6x training speedup, increased GPU utilization from 19% to 85%, and demonstrated meaningful improvements over traditional methods and specialized models in multiple production use cases."
  canonical: "https://www.zenml.io/mlops-database/grab-catwalk-feature-store-ai-gateway-notebook-platform-ray-based-distributed-training-for-multimodal-user-centric-found"
  ogTitle: "Grab: Ray-based distributed training for multimodal user-centric foundation models and large-scale user embeddings at Grab - ZenML MLOps Database"
  ogDescription: "Grab, a Singapore-based super app operating across eight countries and 800 cities, built custom user-centric foundation models to learn holistic representations from their diverse multimodal data spanning ride-hailing, food delivery, grocery, and financial services. The team developed a novel architecture using modality-specific adapters to tokenize heterogeneous data (tabular user attributes, time series behaviors, merchant IDs, locations), pre-trained using masked language modeling and next token prediction, and extracted embeddings for downstream tasks across multiple verticals. By migrating to Ray for distributed training on heterogeneous clusters with CPU offloading for massive embedding layers (40 million user embeddings), they achieved 6x training speedup, increased GPU utilization from 19% to 85%, and demonstrated meaningful improvements over traditional methods and specialized models in multiple production use cases."
mlops:
  source: "sqlite"
  entryId: 204
  sourceUrl: "https://www.youtube.com/watch?v=DRtha-uVgpY"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.617915"
  lastUpdated: "2026-04-14T19:55:58.665326"
---

## Problem Context

Grab faced fundamental challenges in leveraging their rich, diverse data ecosystem for machine learning at scale. As a super app spanning ride-hailing, food delivery, grocery shopping, logistics, advertising, and financial services across eight countries and 800 cities, they accumulated massive volumes of heterogeneous data including user transaction histories across all verticals, click event streams capturing app interactions, user and driver preference data, merchant and driver performance insights, marketplace dynamics (supply/demand, traffic, weather), and experimental treatment effects.

Traditionally, Grab utilized three approaches to extract value from this data: manually created user attributes from analyst teams, specialized models trained for individual use cases, and knowledge graphs capturing entity relationships. However, these approaches had significant limitations. Specialized models required substantial engineering effort for each use case and struggled with data sparsity and cold start problems. Manual attribute engineering couldn't capture the nuanced, holistic understanding of user behavior across Grab's diverse verticals. The team recognized an opportunity to build a foundation model that could learn representations directly from raw data and generalize across multiple downstream tasks, rather than continuing to build narrow, task-specific solutions.

The core hypothesis was that a single foundation model could extract meaningful embeddings for all marketplace entities (users, drivers, merchants, locations) and serve as a base for fine-tuning on specific use cases, addressing data sparsity and reducing engineering overhead. This represented a shift from task-specific optimization to building shared representations that capture the interconnected nature of user behavior across Grab's ecosystem.

## Architecture & Design

Grab's foundation model architecture centers on a modality-aware design that handles both tabular attributes and time series behavioral data through a unified framework. The system consists of several key architectural components working in concert.

At the input layer, the team developed a sophisticated tokenization strategy that represents data as key-value pairs. Keys provide event context (such as "order_merchant" or "dietary_preference") while values contain the actual data. This approach generalizes across both tabular data (column name-value pairs) and time series events (action type-value pairs), creating a unified representation scheme. Rather than treating each unique ID as a distinct token (which would cause vocabulary explosion), the architecture groups data into modalities: text (keys and categorical values), numerical values, merchant IDs, location IDs, and other entity types.

Each modality flows through a custom adapter designed specifically for that data type. The merchant adapter, for example, combines a pre-trained text embedding model to encode the key ("order_merchant") with an embedding layer lookup for the merchant ID value. Crucially, adapters are designed as replaceable components, allowing the team to iterate on individual adapter implementations without restructuring the entire model. The merchant adapter v2, currently under development, incorporates additional attributes like menu items, opening hours, and location data to better handle cold start scenarios where individual merchant embeddings haven't been trained.

The core transformer model processes outputs from these adapters while maintaining different invariance properties for different data types. For tabular data, the model uses learnable tokens to ensure column-order invariance—predictions shouldn't change based on attribute ordering. For time series data, the architecture employs both absolute and relative positional embeddings to capture temporal dependencies, as the sequence order is semantically meaningful.

The pre-training strategy combines masked language modeling with next token prediction across this multimodal input. Different prediction heads handle different modalities: classification or similarity losses for entity IDs like users and merchants, mean squared error losses for numerical predictions. This multi-objective pre-training avoids biasing the model toward any single task, which was a critical lesson from early experiments where supervised fine-tuning on specific tasks created embeddings too specialized for general use.

Embedding extraction happens at two levels. Long-term user embeddings come directly from the ID embedding layers, which accumulate knowledge about user behavior patterns throughout training on historical data. Short-term interaction embeddings are generated by feeding recent time series sequences through the model and applying sequence aggregation to the output representations. Downstream teams consume these embeddings as additional features in their existing models, providing a less invasive integration path than wholesale model replacement.

## Technical Implementation

The implementation leveraged Ray as the core distributed training framework, which proved essential for both performance and experimentation velocity. Prior to Ray adoption, the team's workflow involved multiple painful iteration cycles: creating separate Spark jobs for preprocessing, manually managing storage paths to track experimental datasets, choosing between small-scale experiments (fast but non-representative) or large-scale runs (slow preprocessing), and being limited to single-node training with only vertical scaling options.

Ray's heterogeneous cluster support transformed this workflow by enabling separation of CPU-intensive data preprocessing from GPU-intensive model training. The architecture offloads the massive embedding layers and optimizer states to CPU memory, freeing GPU capacity for the core transformer computations. This proved critical given the scale of Grab's entity vocabulary—approximately 40 million monthly active users alone, resulting in embedding layers requiring hundreds of gigabytes of memory.

To manage these enormous embedding layers, the implementation employs sparse optimizer techniques that approximate full Adam optimization by recognizing that individual batches only touch a subset of all embeddings. The sparse optimizer paired with CPU offloading completely removes embedding layer memory pressure from GPUs. Similarly, for the prediction heads used during pre-training (which must characterize next merchant predictions across all possible merchants), the team evolved through multiple approaches: vanilla classification layers (too memory and compute intensive), hierarchical classification networks that subdivide the output space by city then location (reduced FLOPs but still high memory), and finally BYOL-style target networks updated via exponential moving average and offloaded to CPU (minimizing both memory and compute requirements).

The data pipeline processes multiple data types: user transaction data across all verticals, click event streams, preference specifications, merchant and driver analytics, and marketplace state data. Pre-trained text embeddings from public foundation models encode common knowledge like dish descriptions and cuisine types, while Grab-specific contextual learning focuses on entity relationships and behavioral patterns unique to their ecosystem.

## Scale & Performance

The performance improvements from migrating to Ray and optimizing the architecture were substantial and measurable. Training time decreased by 6x compared to the pre-Ray implementation. GPU utilization jumped from a critically poor 19% to a healthy 85%. The team noted that reaching near-100% GPU utilization wasn't feasible given the CPU-heavy optimization requirements from embedding layer updates and last-mile data preprocessing, making 85% an excellent result for their workload characteristics.

Before optimization, generating embeddings for just 1 million users required 10 hours of pre-training time—clearly unscalable for Grab's 40 million monthly active users. The distributed training on heterogeneous clusters, with scaled CPU resources for data loading and preprocessing separated from GPU resources for model training, eliminated the resource contention that had throttled the previous single-node implementation.

The model itself operates at substantial scale. The embedding layer for 40 million users constitutes 40 million parameters just for that single component. For comparison, they referenced a similar-sized model (likely Qwen-Free) with a vocabulary of only 150K tokens embedded at dimension 48, illustrating how Grab's entity-centric approach requires fundamentally different infrastructure than standard language model training.

The team has successfully onboarded multiple use cases across different Grab verticals in the first phase of their rollout, focusing on embedding consumption. Early results show improvements over both traditional methods (manual attributes, knowledge graphs) and specialized models built for individual tasks. Downstream teams integrate embeddings as additional features, measuring improvement through standard metrics like AUC uplift on their specific prediction tasks.

## Trade-offs & Lessons

The journey to production-ready foundation models involved extensive experimentation and iteration, with several critical lessons for practitioners building custom enterprise foundation models.

**Why build custom rather than fine-tune LLMs**: The team explicitly addressed this question. Large language models excel at general tasks but lack knowledge about Grab-specific entities—users, merchants, drivers, locations, and the relationships between them. This enterprise-specific knowledge is fundamental to Grab's value proposition, making a custom architecture that learns from Grab's data directly more appropriate than adapting general-purpose models.

**Experimentation is essential**: The improvement curve was non-linear. Early iterations showed minimal or no improvements over baselines. Reaching production-quality embeddings required extensive iteration on dataset creation (identifying which events matter, handling duplicates, choosing representations), adapter design (how to encode locations, merchants, other entities), model architecture (time encoding strategies, transformer design choices), and loss head design (the evolution from vanilla classification to hierarchical to BYOL-style approaches). The team emphasized that machine learning at this scale is fundamentally about experimentation—the faster iteration cycles enable, the more likely you are to find working solutions.

**Infrastructure directly impacts innovation velocity**: Training time matters, but implementation speed matters equally. The ability to rapidly prototype new adapters, test different data representations, and iterate on model architectures proved as important as raw training throughput. Ray's support for quick experimentation while also enabling distributed training at scale made it possible to maintain fast iteration cycles even as experiments grew in complexity.

**Pre-training objectives require careful design**: Early experiments with supervised fine-tuning on large-scale tasks biased embeddings toward those specific objectives, reducing generalization. The diverse nature of Grab's app (ride-hailing, food delivery, grocery, banking) meant no single task appropriately represented the full scope of user behavior. Switching to unsupervised pre-training via masked language modeling and next token prediction avoided this bias. However, the team identified a remaining gap: current pre-training focuses on single-token prediction, while embedding use cases care about summarizing entire user journeys. Future work targets pre-training objectives that better align with embedding extraction.

**Adapter-centric design enables evolution**: The modular adapter architecture proved crucial for future-proofing. As Grab adds new data types or improves entity representations (like the merchant adapter v2 incorporating item catalogs and hours), they can update individual adapters without restructuring the entire model. This modularity also helps with cold start problems—richer adapters can generate meaningful representations even for entities with limited interaction history.

**Resource constraints drive innovation**: Not having hundreds of H100s like major tech companies forced creative solutions. CPU offloading for embedding layers and optimizer states, sparse optimizer techniques, and BYOL-style target networks were all motivated by memory constraints. These constraints led to an architecture that's potentially more resource-efficient than approaches developed with unlimited compute budgets.

**Heterogeneous workloads need heterogeneous infrastructure**: The realization that both model training and data loading were CPU-intensive, leading to resource contention on homogeneous GPU nodes, was critical. Ray's heterogeneous cluster support allowing dedicated CPU nodes for data preprocessing and GPU nodes for model training directly addressed this bottleneck.

**Embedding integration lowers adoption barriers**: While fine-tuning the foundation model on downstream tasks showed promise in some cases, many teams preferred keeping their existing model architectures and consuming embeddings as additional features. This less invasive integration path accelerated adoption, though it potentially leaves value on the table compared to full model replacement. The team is exploring both paths—embeddings for quick wins and full architectural replacement for teams willing to bet on time series learning over traditional wide-and-deep architectures.

**Evaluation requires close collaboration**: Measuring embedding quality isn't straightforward. The team relies heavily on downstream user partnerships, onboarding their models to embedding benchmark suites and measuring task-specific metrics like AUC improvements. While not directly interpretable, these pragmatic evaluations justify adoption—if embeddings improve downstream performance, users are satisfied. The team is separately working on explainability analysis to understand what's encoded in embeddings.

Future directions include scaling both model and data size (which early experiments suggest will continue improving performance), developing better pre-training objectives aligned with embedding use cases, enriching adapters with multi-parameter event encodings, and improving inhomogeneous time series encoding to handle events spanning from seconds to days apart. The team maintains a blog post with additional technical details for practitioners interested in deeper implementation specifics.
