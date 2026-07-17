---
title: "CPU-Based Infrastructure for AI Inference and Agentic Workflows"
slug: "cpu-based-infrastructure-for-ai-inference-and-agentic-workflows"
draft: false
llmopsTags:
  - "fraud-detection"
  - "code-generation"
  - "content-moderation"
  - "document-processing"
  - "classification"
  - "multi-modality"
  - "realtime-application"
  - "speech-recognition"
  - "embeddings"
  - "vector-search"
  - "model-optimization"
  - "knowledge-distillation"
  - "latency-optimization"
  - "cost-optimization"
  - "agent-based"
  - "kubernetes"
  - "vllm"
  - "onnx"
  - "databases"
  - "cache"
  - "scaling"
  - "open-source"
  - "security"
  - "google-gcp"
  - "anthropic"
industryTags: "tech"
company: "Resemble AI / Turpopuffer"
summary: "This case study explores how Turpopuffer and Resemble AI architect their AI infrastructure to optimize for inference and agentic workflows on Google Cloud Platform. Turpopuffer built a search engine enabling models to attend to trillions of tokens by caching data from object storage to NVMe and DRAM, serving customers like Cursor and Notion with billions of documents. Resemble AI developed foundation models for generative voice AI and deepfake detection, strategically distributing workloads between GPUs for low-latency inference and CPUs for data processing, batch operations, and model distillation. Both companies demonstrate significant cost savings and performance improvements by auditing their AI stacks and identifying which workloads benefit from CPU-based infrastructure versus accelerators, achieving up to 30% better price performance with specific VM configurations."
link: "https://www.youtube.com/watch?v=x3LntcL1ffs&list=PLFZU5nT4APFA&index=47"
year: 2026
seo:
  title: "Resemble AI / Turpopuffer: CPU-Based Infrastructure for AI Inference and Agentic Workflows - ZenML LLMOps Database"
  description: "This case study explores how Turpopuffer and Resemble AI architect their AI infrastructure to optimize for inference and agentic workflows on Google Cloud Platform. Turpopuffer built a search engine enabling models to attend to trillions of tokens by caching data from object storage to NVMe and DRAM, serving customers like Cursor and Notion with billions of documents. Resemble AI developed foundation models for generative voice AI and deepfake detection, strategically distributing workloads between GPUs for low-latency inference and CPUs for data processing, batch operations, and model distillation. Both companies demonstrate significant cost savings and performance improvements by auditing their AI stacks and identifying which workloads benefit from CPU-based infrastructure versus accelerators, achieving up to 30% better price performance with specific VM configurations."
  canonical: "https://www.zenml.io/llmops-database/cpu-based-infrastructure-for-ai-inference-and-agentic-workflows"
  ogTitle: "Resemble AI / Turpopuffer: CPU-Based Infrastructure for AI Inference and Agentic Workflows - ZenML LLMOps Database"
  ogDescription: "This case study explores how Turpopuffer and Resemble AI architect their AI infrastructure to optimize for inference and agentic workflows on Google Cloud Platform. Turpopuffer built a search engine enabling models to attend to trillions of tokens by caching data from object storage to NVMe and DRAM, serving customers like Cursor and Notion with billions of documents. Resemble AI developed foundation models for generative voice AI and deepfake detection, strategically distributing workloads between GPUs for low-latency inference and CPUs for data processing, batch operations, and model distillation. Both companies demonstrate significant cost savings and performance improvements by auditing their AI stacks and identifying which workloads benefit from CPU-based infrastructure versus accelerators, achieving up to 30% better price performance with specific VM configurations."
notion:
  pageId: "398f8dff-2538-800e-a597-e1644e024e11"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-09T12:35:00.000Z"
  lastEditedTime: "2026-07-09T12:35:00.000Z"
  publishedAt: "2026-07-09T14:24:54Z"
---

## Overview

This case study presents insights from two AI companies operating at production scale on Google Cloud Platform, demonstrating the fundamental shift from training-focused to inference-focused infrastructure in 2026. The presentation features Simon Eskildsen, CEO of Turpopuffer, and Zohaib Ahmed, CEO of Resemble AI, who share their experiences architecting AI stacks that balance GPU acceleration with CPU-based workloads. The central thesis is that 2026 represents a historic tipping point where inference token volume surpasses training token volume, fundamentally changing infrastructure requirements toward sustained usage at scale, power efficiency, and latency optimization.

The presentation frames this shift through three emerging infrastructure trends: agentic sandboxing for running untrusted code in isolated environments, data processing for handling massive token volumes, and CPU-based inference for cost optimization. Both companies demonstrate that modern AI production systems require sophisticated orchestration between accelerators and CPUs, with most workflows consisting of mixed architectures where certain tasks are CPU-optimal while others require GPU acceleration.

## Turpopuffer: Search Engine Architecture for Trillion-Scale Token Access

Turpopuffer has built a vector search engine specifically designed to enable LLMs to attend to trillions of tokens that would never fit in a context window. The company operates at massive scale, processing millions of writes per second to Google Cloud Storage and serving high-volume queries for customers including Cursor and Anthropic. Their architecture demonstrates a sophisticated approach to managing the economics and performance of AI inference at scale.

The fundamental architecture principle is complete decoupling of storage and compute. All data by default resides in Google Cloud Storage object storage, meaning the entire VM fleet could be shut down without losing a terabyte of data. This design reflects hard-won operational lessons from Simon's nearly decade-long experience on call at Shopify, where data durability through VM failures is paramount. The system implements a tiered caching strategy where data "puffs up" from cold storage into hot caches as it becomes operational. When a user or agent begins querying a namespace, data moves from GCS to NVMe SSD cache, then to DRAM cache, and finally into L1, L2, and L3 CPU caches for actual query serving.

This architecture proves particularly effective for workloads with temporal locality. Cursor, described as probably one of the largest search workloads in SaaS globally, stores trillions of documents representing individual code bases. When a developer opens a code base in Cursor or an agent begins operating on it, the first query experiences higher latency as data is pulled from object storage. However, as the agent or user continues working, subsequent queries benefit from increasingly warm caches, delivering the fast performance required for interactive development workflows.

Notion represents another significant customer with over 10 billion documents stored in Turpopuffer. When users open dialogue boxes to ask questions or search their wiki, the system hints and drags relevant data into node-level caches from GCS, enabling LLMs to reason over enterprise knowledge bases. This architecture allows Notion to provide AI features across massive document collections without prohibitive costs from attending to all tokens simultaneously.

The presentation articulates five reasons why search engines like Turpopuffer are essential for LLM production systems, collectively remembered as "SCRAP." Scale refers to the physical impossibility of attending to trillions of tokens like the entire internet or entire enterprise knowledge bases in a single context window. Cost addresses the economic reality that attending to a million or more tokens costs many dollars, even tens of dollars per operation, making search-based retrieval far more economical. Recall highlights the technical challenge that models struggle to reason effectively over very large context windows because training datasets with hundreds of thousands of tokens and ground truth answers are extremely rare. The Harry Potter series is cited as an example of a dataset around 100,000 tokens, but this is insufficient to train robust reasoning over long contexts. ACLs emphasizes that the industry is not yet ready for trust-based security where documents and permissions are provided to models with the expectation that access controls will be respected in attention mechanisms. Strict ACL enforcement through search ensures only authorized tokens reach the context window. Performance addresses the fundamental computational reality that searching the entire internet can be accomplished in 100 milliseconds using indexing techniques, while attention mechanisms scale quadratically and cannot achieve similar performance over comparable data volumes.

From an infrastructure perspective, Turpopuffer operates over 100 clusters across tens of regions worldwide. This distributed deployment necessitates flexibility in VM selection, and the company actively participates in Google Cloud's research preview programs to test new SKUs. The presentation highlights that Axion-based VMs on ARM architecture deliver exceptional price performance for their workloads. The company has developed detailed performance benchmarking showing wide distribution in price performance across different CPU SKUs, with newer generations generally offering better throughput. However, they maintain the ability to run on older SKUs when necessary, demonstrating infrastructure flexibility.

The architecture also addresses the critical challenge of network bandwidth and storage performance. Filtering trillions of tokens down to the most relevant ones requires high network bandwidth and high-performance storage to prevent IO bottlenecks. Turpopuffer leverages Google Cloud's managed Lustre filesystem and network-optimized VM series to eliminate these bottlenecks, particularly important during the data ingestion phase when millions of writes per second flow to GCS.

## Resemble AI: Multi-Model Foundation Model Development and Serving

Resemble AI presents a different but complementary perspective, building foundation models from scratch for generative voice AI and deepfake detection. The company has been developing these models for five to six years, accumulating extensive experience in training, fine-tuning, and serving models across diverse deployment environments. Their product portfolio includes generative voice models like Chatterbox, deepfake detection models handling multimodal inputs, and watermarking systems for authenticity verification.

The company's flagship deepfake detection model has grown to 3 billion parameters and operates on trillions of data points. This model can determine whether images, videos, or audio files were created by AI or humans, addressing critical fraud prevention use cases. One specific application detects document fraud where open-source image generation models are used to alter passport photos. Another application performs real-time verification of whether participants in Google Meet calls are actual humans or AI-generated deepfakes by analyzing facial characteristics. These diverse use cases require different latency profiles and infrastructure approaches.

Resemble AI's infrastructure strategy centers on matching workload characteristics to appropriate compute resources. The generative voice model Chatterbox requires extremely low latency for real-time conversational applications, making GPU deployment essential. The company serves these models on GPUs to meet strict latency requirements that users expect from voice interfaces. In contrast, deepfake detection often operates in batch mode with higher throughput requirements but relaxed latency constraints, making CPU-based inference more cost-effective. Watermarking represents another workload where spinning up GPUs for thousands or hundreds of thousands of audio and video streams would be cost-prohibitive, so CPU deployment with ONNX-compiled models provides the optimal economic profile.

The training pipeline demonstrates sophisticated use of Google Cloud's service portfolio. H100 GPUs train the 3 billion parameter deepfake detection foundation models, with new model versions published on a weekly basis. Fine-tuning for customer-specific datasets uses Vertex AI with lower-tier GPUs, demonstrating workload segmentation even within the training phase. The company then optimizes models using VLLM and TensorRT, and frequently exports to ONNX format for CPU deployment. This multi-stage optimization pipeline reflects the production reality that model development doesn't end at training but continues through serving optimization.

Data processing represents a massive CPU workload for Resemble AI. Training on trillions of data points requires extensive preprocessing, with each data point undergoing various transformations and feature extraction before model training. The company generates synthetic datasets daily by running newly released generative AI models to ensure their detection models remain current. This continuous data generation and processing pipeline accumulates multiple terabytes daily, requiring robust storage infrastructure. The company relies heavily on Google Kubernetes Engine for orchestration, N-series VMs for data cleaning and transformation, and Hyperdisk and Lustre for centralized data storage accessible to machine learning teams.

The presentation emphasizes the operational advantage this infrastructure provides in terms of iteration velocity. Previously, deploying new detection models took multiple weeks. With their current architecture, the company publishes detection models almost daily, with weekly publication being the maximum interval. This rapid iteration proves essential given the frequent release of new generative AI models that could potentially evade detection. In just the past month, six model versions reached customers, demonstrating approximately weekly publication cadence.

Model distillation represents a key technique for enabling CPU deployment. Chatterbox Nano exemplifies this approach as a 100 million parameter model distilled from the larger Chatterbox model. Most users cannot distinguish between the full model and the distilled version for text-to-speech applications, yet Chatterbox Nano runs efficiently on CPU VMs or even local machines. This democratizes deployment options and dramatically reduces serving costs. The company has applied similar distillation techniques to Gemma models, discovering that fine-tuning can actually occur on CPU instances rather than requiring GPU infrastructure, which represents a surprising and valuable efficiency gain.

The company's experience with on-premises deployments has informed their cloud architecture. Deploying models on-premise requires packaging models to run efficiently on customer hardware, typically CPU-based. This constraint has driven expertise in VLLM optimization and particularly ONNX model export, which has become significantly easier over the past two years. The result is model artifacts that aren't locked to specific runtimes and can deploy flexibly across diverse environments. The company also leverages newer techniques like causal diffusion to achieve additional inference speedups on CPU infrastructure.

Workflow orchestration through Apache Airflow plays a significant role in their production pipeline. The company profiles pipelines carefully to identify tasks that run more efficiently on CPUs versus GPUs, then distributes work accordingly through Airflow. This separation allows parallel execution of CPU-bound tasks without occupying expensive GPU resources, optimizing both cost and throughput. Lightweight classifiers running on CPUs route inputs to appropriate specialized models, creating an efficient multi-model serving architecture where the expensive GPU-based models only process inputs that genuinely require their capabilities.

## Infrastructure Patterns and Production Best Practices

Both companies demonstrate several common patterns that emerge as best practices for LLM production operations. First is the principle of workload segmentation based on resource characteristics rather than assuming all AI workloads require GPUs. Both Turpopuffer and Resemble AI carefully analyze which operations are memory-bound, compute-bound, IO-bound, or latency-sensitive, then select infrastructure accordingly. This requires detailed profiling and benchmarking but delivers substantial cost savings.

Second is the importance of data infrastructure as a first-class concern. Both companies invest heavily in storage and networking infrastructure to eliminate bottlenecks. Turpopuffer's architecture depends fundamentally on fast object storage and high-performance caching layers. Resemble AI's rapid iteration velocity depends on centralized, high-performance storage for training data accessible across the machine learning team. Neither company treats data infrastructure as an afterthought but rather as a critical enabler of their AI capabilities.

Third is the value of decoupled architectures. Turpopuffer's complete separation of storage and compute provides operational resilience and flexibility to adopt new VM types as they become available. Resemble AI's separation of training, optimization, and serving allows different optimization strategies for each phase. These decoupled architectures require more sophisticated orchestration but provide flexibility that proves valuable as infrastructure options evolve.

Fourth is the strategic use of managed services where appropriate. Both companies leverage GKE for orchestration, managed Lustre for filesystem performance, and various managed storage services. This allows engineering resources to focus on their core differentiators rather than infrastructure management. However, both also demonstrate willingness to operate lower in the stack when necessary, such as Turpopuffer's direct use of VMs and object storage APIs.

Fifth is continuous optimization and experimentation. Turpopuffer actively participates in research previews of new VM types and benchmarks performance across their distributed deployment. Resemble AI continuously refines their models through distillation, quantization, and export to different runtimes. Neither company treats their infrastructure as static but rather as continuously evolving based on new capabilities and changing workload characteristics.

## Agentic Workflows and Security Considerations

The presentation situates these infrastructure patterns within the broader trend toward agentic AI systems that take autonomous actions. The example of an agent purchasing a running jacket illustrates how agent workflows combine foundational model capabilities with application runtime operations. Breaking down the prompt, researching inventory through third-party APIs, optimizing choices, and executing purchases represent a mix of accelerator-optimal and CPU-optimal tasks.

Agentic sandboxing emerges as a critical infrastructure requirement. When autonomous agents write and execute code, that code is often untrusted and requires secure, isolated environments. This use case spans both reinforcement learning during training and production agentic applications. The infrastructure challenge involves spinning up hundreds or thousands of sandboxes per second with varying resource requirements, where startup time often represents the key bottleneck. Google Cloud's solutions range from fully managed options like the Gemini App Enterprise Agent platform to DIY approaches using direct VM provisioning for maximum isolation. GKE Agent Sandbox running on Google Axion processors provides up to 30% better price performance compared to competing hyperscalers for these workloads.

Security through isolation appears as a recurring theme. Turpopuffer's discussion of ACLs emphasizes that search-based retrieval provides strict access control over which tokens reach model context windows. Sandboxing provides similar isolation for code execution. These security patterns reflect the production reality that AI systems increasingly interact with sensitive data and take consequential actions, requiring defense-in-depth approaches rather than relying solely on model behavior.

## Cost Optimization and Economic Considerations

Both companies demonstrate sophisticated thinking about the economics of AI production systems. Turpopuffer's tiered storage architecture directly addresses the cost challenge that attending to large context windows can cost tens of dollars per operation. By enabling models to search and retrieve only relevant tokens, they make it economically feasible to operate over trillion-token knowledge bases. The cold storage approach for inactive data means customers aren't paying for compute and high-performance storage for data that isn't actively queried.

Resemble AI's segmentation of workloads between GPUs and CPUs reflects similar economic thinking. Watermarking thousands of streams on GPUs would be cost-prohibitive, but CPU deployment makes it economically viable. Model distillation transforms the economics of deployment by enabling CPU serving for workloads that would otherwise require expensive GPU infrastructure. The ability to fine-tune models on CPU instances rather than requiring GPUs further reduces costs for customer-specific model customization.

The broader infrastructure trend toward CPU-based inference reflects market maturation. Early AI production systems often defaulted to GPU deployment because that's where training occurred and where early inference examples ran. However, as organizations gain production experience, they discover many workloads don't require the compute density of GPUs and achieve better price performance on optimized CPU instances. This trend aligns with the shift from training to inference mentioned at the presentation's opening, where the volume of inference tokens is surpassing training tokens in 2026.

## Critical Assessment and Balanced Perspective

While this presentation offers valuable insights into production AI infrastructure, several caveats deserve mention. First, both presenters represent companies that have chosen Google Cloud Platform, and the presentation occurs at a Google conference. This creates inherent selection bias toward GCP-favorable narratives. Organizations on other cloud platforms or multi-cloud architectures might experience different tradeoffs.

Second, the claim that 2026 represents a historic tipping point where inference volume surpasses training volume, while plausible, is presented without supporting data or methodology. The actual ratio of inference to training tokens depends heavily on how one counts and which workloads are included. A handful of foundation model training runs involve enormous token volumes, while inference is distributed across millions of smaller operations. The metric itself may be somewhat arbitrary.

Third, the price-performance claims, particularly the 30% improvement for GKE Agent Sandbox on Axion, should be interpreted carefully. Price-performance comparisons depend heavily on the specific workload, measurement methodology, and which competitors are being compared. What works best for Turpopuffer's search workload or Resemble AI's processing pipeline may not generalize to other AI applications.

Fourth, the presentation somewhat oversimplifies the CPU versus GPU decision. In practice, many workloads benefit from heterogeneous infrastructure with some operations on CPUs, some on GPUs, and increasingly some on specialized inference accelerators. The cleanest architectural divisions between CPU and GPU workloads occur for companies like these that have invested significant engineering effort in profiling, optimization, and workload segmentation. Organizations with less mature AI engineering practices may not achieve similar results.

Fifth, both companies operate at substantial scale with sophisticated engineering teams. Turpopuffer operates over 100 clusters globally, and Resemble AI has been developing foundation models for five to six years. The infrastructure patterns they've developed may not be immediately accessible to smaller organizations or those earlier in their AI maturity journey. Some of the optimizations require deep expertise in areas like ONNX export, VLLM optimization, and TensorRT compilation.

That said, the fundamental insights about workload segmentation, data infrastructure importance, and the shift toward inference-optimized infrastructure appear broadly applicable across organizations of different sizes and industries. The specific tools and scale may differ, but the principles of matching workloads to appropriate infrastructure and avoiding default GPU deployment for all AI operations translate well to other contexts. The emphasis on profiling, benchmarking, and continuous optimization reflects engineering discipline that benefits any production AI system regardless of scale.

The presentation's practical focus on production realities rather than research benchmarks provides valuable perspective often missing from AI infrastructure discussions. The emphasis on operational concerns like data durability, rapid iteration velocity, and cost optimization reflects the concerns of teams actually running AI systems at scale rather than demonstrating capabilities in controlled environments.
