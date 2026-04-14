---
title: "Meta's Infrastructure Evolution and the Advent of AI"
slug: "meta-fblearner-flow-orchestration-evolution-metas-infrastructure-evolution-and-the-advent-of-ai"
draft: false
mlopsTags:
  - "compute-management"
  - "metadata-store"
  - "model-serving"
  - "monitoring"
  - "kubernetes"
  - "ray"
  - "retraining"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "Meta"
companySlug: "meta"
platformName: "FBLearner Flow + orchestration evolution"
contentType: "blog"
summary: "Meta's infrastructure has evolved from a simple LAMP stack serving thousands of users to a massive global AI platform serving 3.4 billion people, requiring continuous innovation across hardware, software, and data center design. The advent of AI workloads, particularly large language models starting in 2022, fundamentally transformed infrastructure requirements from traditional web serving to massive GPU clusters requiring specialized cooling, power delivery, and networking. Meta built clusters scaling from 4,000 GPUs in the late 2010s to 24,000 H100 GPUs in 2023, then to 129,000 H100 GPUs, and is now constructing Prometheus (1 gigawatt) and Hyperion (5 gigawatts) clusters, while developing custom silicon like MTIA for ranking and recommendation workloads and embracing open standards through the Open Compute Project to enable vendor diversity and ecosystem health."
link: "https://engineering.fb.com/2025/09/29/data-infrastructure/metas-infrastructure-evolution-and-the-advent-of-ai/"
year: 2025
seo:
  title: "Meta: Meta's Infrastructure Evolution and the Advent of AI - ZenML MLOps Database"
  description: "Meta's infrastructure has evolved from a simple LAMP stack serving thousands of users to a massive global AI platform serving 3.4 billion people, requiring continuous innovation across hardware, software, and data center design. The advent of AI workloads, particularly large language models starting in 2022, fundamentally transformed infrastructure requirements from traditional web serving to massive GPU clusters requiring specialized cooling, power delivery, and networking. Meta built clusters scaling from 4,000 GPUs in the late 2010s to 24,000 H100 GPUs in 2023, then to 129,000 H100 GPUs, and is now constructing Prometheus (1 gigawatt) and Hyperion (5 gigawatts) clusters, while developing custom silicon like MTIA for ranking and recommendation workloads and embracing open standards through the Open Compute Project to enable vendor diversity and ecosystem health."
  canonical: "https://www.zenml.io/mlops-database/meta-fblearner-flow-orchestration-evolution-metas-infrastructure-evolution-and-the-advent-of-ai"
  ogTitle: "Meta: Meta's Infrastructure Evolution and the Advent of AI - ZenML MLOps Database"
  ogDescription: "Meta's infrastructure has evolved from a simple LAMP stack serving thousands of users to a massive global AI platform serving 3.4 billion people, requiring continuous innovation across hardware, software, and data center design. The advent of AI workloads, particularly large language models starting in 2022, fundamentally transformed infrastructure requirements from traditional web serving to massive GPU clusters requiring specialized cooling, power delivery, and networking. Meta built clusters scaling from 4,000 GPUs in the late 2010s to 24,000 H100 GPUs in 2023, then to 129,000 H100 GPUs, and is now constructing Prometheus (1 gigawatt) and Hyperion (5 gigawatts) clusters, while developing custom silicon like MTIA for ranking and recommendation workloads and embracing open standards through the Open Compute Project to enable vendor diversity and ecosystem health."
mlops:
  source: "sqlite"
  entryId: 156
  sourceUrl: "https://engineering.fb.com/2025/09/29/data-infrastructure/metas-infrastructure-evolution-and-the-advent-of-ai/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.614425"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context: The AI Infrastructure Transformation

Meta's infrastructure journey spans 21 years of exponential growth, but the advent of AI workloads fundamentally challenged every assumption about how to scale infrastructure. The traditional web serving model relied on cost-efficient but unreliable commodity hardware with software systems designed to mask failures. Internet services throughout the 2000s and 2010s could simply retry failed requests on different machines, achieving high availability through redundancy.

AI training workloads broke this paradigm entirely. When Meta began training large language models in 2022, training jobs that previously ran on 128 GPUs suddenly required 2,000 to 4,000 GPUs running synchronously. Any single straggling or failing GPU would halt the entire cluster's progress. Unlike web requests that can be retried elsewhere, an AI training cluster runs as a single cohesive job where individual failures cascade into complete job failures. The checkpoint-and-restart process takes so long that frequent failures prevent any meaningful training progress.

The scale requirements continued accelerating. Meta's AI researchers discovered that dedicating more computational power to pre-training produced higher quality and more performant LLM models. This created an insatiable demand for larger clusters, pushing infrastructure engineers to scale by orders of magnitude repeatedly. The challenge extended beyond just adding more GPUs—it required holistic planning across data center space, cooling systems, mechanical infrastructure, hardware design, network topology, storage architecture, and software optimization to extract maximum performance.

Additionally, Meta faced workload heterogeneity challenges. Ranking and recommendation models that deliver personalized experiences have fundamentally different requirements than LLMs. The shift from community-based content ranking (where Facebook surfaced content based on what a few hundred friends liked) to personalized short-form video recommendations required understanding and ranking all uploaded content for each individual user—orders of magnitude more computation. Furthermore, LLMs themselves rapidly evolved beyond pure pre-training to include reinforcement learning, supervised fine-tuning, test-time inference, and reasoning, each requiring custom hardware and software support.

## Architecture & Design: From Web Serving to AI Clusters

Meta's infrastructure architecture evolved through distinct phases, each addressing different scaling challenges.

### Early Scaling Architecture (2004-2010)

The initial architecture built on the LAMP stack (Linux, Apache, MySQL, PHP) used a simple database-per-university model. Common web servers connected students to their university's database. As the social graph emerged to connect users across universities, Meta developed new distributed systems including Memcache deployments for database load management, the TAO social graph system, extensive caching and data management systems, ranking services for News Feed, and photo/video sharing services.

Physical infrastructure expanded from Bay Area co-location facilities to Virginia, then to purpose-built data centers in Prineville, Oregon and Forest City, North Carolina. This geographic distribution created two critical architecture requirements: an edge infrastructure with compute capacity beside every local ISP connected via peering networks, and a high-bandwidth multipath backbone network interconnecting data centers so users experienced consistent service regardless of physical connection point.

### Global Fleet Management Architecture (2010-2020)

As Meta scaled to data center regions with multiple buildings and hundreds of points-of-presence globally, they built comprehensive distributed systems:

- **Twine**: A cluster management system scaling to millions of machines per data center region
- **Tectonic**: A data center-scale distributed file system
- **ZippyDB**: A strongly consistent distributed key-value store
- **Shard Manager**: Managing tens of millions of data shards across hundreds of thousands of servers for hundreds of applications
- **Delos**: A control plane for global infrastructure
- **Service Router**: Managing the global service mesh
- **Kraken**: Leveraging live traffic load tests to identify resource utilization bottlenecks
- **Taiji**: Managing user traffic load balancing
- **Maelstrom**: Handling data center-scale disasters while minimizing user impact

These systems addressed cache consistency problems (notifications about photos users couldn't see, out-of-order chat messages) by building cache invalidation systems and eventually a consistency API for distributed systems.

### AI Cluster Architecture (2020-Present)

AI clusters represent a fundamentally different architecture. Rather than distributed systems masking hardware failures, AI clusters are high-performance computational systems with hundreds or thousands of powerful GPUs with ample memory, interconnected via high-bandwidth low-latency networks, running custom software stacks optimized for maximum performance.

Meta's initial AI clusters interconnected 4,000 GPUs for training ranking and recommendation models. As LLMs emerged in 2022, they built two 24,000 H100 GPU clusters in late 2023, one using Infiniband and one using RoCE networking, allowing exploration of different network technologies. These clusters used all available power in a data center building (typically low tens of megawatts).

The next architectural leap involved repurposing five production data center buildings to create a single 129,000 H100 GPU cluster within months—an unprecedented move in Meta's history where data centers typically consist of five or more identical buildings in a single region.

### Heterogeneous Hardware Architecture

To handle workload diversity and vendor dependencies, Meta developed an architecture supporting multiple accelerator types:

- NVIDIA H100 and Blackwell GPUs for LLM training
- AMD MI300 accelerators serving various workloads
- Meta Training and Inference Accelerator (MTIA) custom silicon optimized for ranking and recommendation inference, deployed at scale primarily for ads workloads
- Custom training chips for ranking and recommendations ramping to production
- Multiple chips in development for future deployment

Software abstraction layers, particularly open source PyTorch and Triton, hide hardware differences from developers. This architectural decision enables workload portability across heterogeneous hardware types.

### Next-Generation Architectures

Prometheus, currently under construction, is a 1-gigawatt cluster spanning multiple data center buildings, weatherproof tents, and adjacent colocation facilities. The software stack, including Twine and MAST, evolved to support long-distance training across geographically distributed data centers.

Hyperion, expected online beginning in 2028, will scale to 5 gigawatts once complete.

## Technical Implementation: Hardware, Software, and Infrastructure Choices

### GPU and Accelerator Deployment

Meta deployed diverse GPU and accelerator technologies to handle workload requirements:

The Blackwell GB200 deployment illustrates the technical challenges. A single pod consists of six racks, with the middle two racks housing 72 NVIDIA Blackwell GPUs consuming approximately 140 kilowatts. Without facility liquid cooling in traditional data centers, Meta deployed four air-assisted liquid cooling (AALC) racks to prevent thermal damage. This pod produces 360 petaflops of FP16 compute capacity while consuming more than 800x the power of typical CPUs and delivering hundreds of thousands of times more compute capacity.

Meta is beginning work with GB300 systems, representing further improvements over GB200.

### Custom Silicon Development

MTIA (Meta Training and Inference Accelerator) represents Meta's silicon investment optimized specifically for ranking and recommendation inference workloads. MTIA v2 is deployed at scale in data centers, primarily serving ads workloads, delivering massive efficiency improvements over vendor silicon.

The custom training chip for ranking and recommendations is ramping to production, with multiple additional chips in various development stages for deployment over the next couple of years.

### Advanced Cooling and Power Delivery

Traditional data centers lack facility liquid cooling, necessitating innovative solutions. The air-assisted liquid cooling deployment for Blackwell GPUs demonstrates the thermal management challenges. Individual racks now consume 140 kilowatts, compared to typical CPU racks.

Rack power density increases drove standardization efforts. Meta worked through the Open Compute Project to adapt rack standards for AI needs, standardizing systems, racks, and power delivery as density continues climbing.

### Networking Infrastructure

Meta explored multiple network technologies for AI clusters:

- Infiniband networking for one 24,000 GPU cluster
- RoCE (RDMA over Converged Ethernet) for another 24,000 GPU cluster
- Custom scale-up and scale-out network designs to allow mixing different GPUs and accelerators

The networking requirements differ dramatically from traditional web serving. AI training demands low-latency, high-bandwidth interconnects where any network jitter impacts entire cluster performance. Meta invests in standardizing these networks so customers can mix/match different hardware types and use the latest cost-effective solutions.

Silicon photonics emerged as a critical technology path. As interconnected chips grow larger with increasing power demands, optical solutions offer faster signaling over larger distances with significantly reduced rack power consumption. Advanced optical solutions represent the only viable path to increase shoreline bandwidth beyond 3.2 terabits and move beyond backplane constraints connecting more endpoints. However, these solutions face challenges including higher power consumption and reduced reliability compared to electrical signaling.

### Software Stack Evolution

Meta heavily invested in software abstraction to enable heterogeneous hardware support:

- **PyTorch**: Provides consistent programming interfaces for machine learning developers and researchers across different hardware types
- **Triton**: Enables optimization across diverse accelerators
- **Hierarchical Sequential Transduction Units (HSTU)**: Accelerated training and inference by 10-1000x for generative recommenders, influenced by LLM developments
- **Twine and MAST**: Evolved to support long-distance training across geographically distributed data centers for Prometheus

The software investments focus on minimizing developer friction when adopting new hardware. If new hardware requires rewriting libraries, kernels, and applications, adoption resistance increases dramatically.

### Open Standards Commitment

Meta made 187 contributions (approximately 25% of all technical contributions) to the Open Compute Project since inception. Key OCP contributions include:

- **Catalina**: An open-design high-powered rack for AI workloads unveiled at the annual OCP Global Summit
- **Grand Teton**: An AI hardware platform featuring single monolithic system design with fully integrated power, control, compute, and fabric interfaces

Open standards efforts aim to enable standardization across systems, racks, power delivery, scale-up and scale-out networks, and software interfaces. This standardization helps Meta innovate quickly and deploy at scale while building next-generation data centers and power grids.

## Scale & Performance: Concrete Metrics and Growth Trajectory

### User Scale

Meta serves over 3.4 billion people globally across multiple applications and hardware products, representing unprecedented scale for real-time personalized experiences.

### Cluster Evolution

The GPU cluster scaling demonstrates exponential growth:

- **Late 2010s**: Initial 4,000 GPU clusters for ranking and recommendation models
- **2022**: Training jobs scaled from 128 GPUs to 2,000-4,000 GPUs within weeks as LLMs emerged
- **Late 2023**: Two clusters of 24,000 H100 GPUs each, among the largest globally at the time
- **2024**: Single cluster with 129,000 H100 GPUs created by repurposing five production data center buildings
- **2025+**: Prometheus 1-gigawatt cluster under construction, Hyperion 5-gigawatt cluster expected online beginning 2028

### Compute Capacity

The GB200 pod specifications illustrate the computational density:

- 72 NVIDIA Blackwell GPUs per two racks
- 360 petaflops of FP16 compute capacity per six-rack pod
- ~140 kilowatts power consumption for the two GPU racks
- 800x the power consumption of typical CPU racks
- Hundreds of thousands of times more compute capacity than traditional systems

### Fleet Management Scale

Meta's distributed systems manage extraordinary scale:

- **Twine**: Millions of machines per data center region
- **Shard Manager**: Tens of millions of data shards across hundreds of thousands of servers for hundreds of applications
- **Edge Infrastructure**: Hundreds of points-of-presence globally
- **Data Centers**: Multiple regions, each with five or more buildings

### Reliability Improvements

Through collaboration with industry partners, Meta drove the interruption rate for AI training jobs down by approximately 50x based on normalized interruption and reliability metrics. This achievement was critical because frequent job failures prevent training progress given the lengthy checkpoint-and-restart cycles.

### Hardware Diversity

In 2025 alone, Meta introduced a subset of 5-6 different SKUs of accelerator hardware into production, demonstrating the operational complexity of managing heterogeneous AI infrastructure at scale.

### Performance Optimization

HSTU (Hierarchical Sequential Transduction Units) delivered 10-1000x acceleration for training and inference in generative recommenders, demonstrating the impact of LLM-influenced architectural innovations on recommendation systems.

MTIA custom silicon provides "massive benefits in efficiency" over vendor silicon for ranking and recommendation inference workloads, though specific numerical metrics were not disclosed.

## Trade-offs & Lessons: Key Insights for Practitioners

### The Synchronous Execution Challenge

The fundamental difference between web serving and AI training creates unavoidable trade-offs. Web serving architectures can mask failures through redundancy and retries, achieving high availability with unreliable hardware. AI training requires all GPUs running synchronously, making every component a single point of failure for the entire job. This necessitates much higher hardware reliability and sophisticated failure detection and recovery mechanisms. The 50x improvement in interruption rates demonstrates that even with significant engineering investment, this remains an ongoing challenge rather than a solved problem.

### The Scale-Before-Optimization Tension

Meta repeatedly faced decisions between optimizing existing infrastructure versus building larger clusters. The pattern shows they consistently chose scale: when 4,000 GPU jobs weren't running optimally, they simultaneously worked to fix those issues while designing 24,000 GPU clusters. This aggressive scaling approach succeeded but required enormous engineering resources and willingness to tolerate imperfect utilization during transition periods.

### Vendor Diversity vs. Operational Simplicity

Meta explicitly embraced hardware heterogeneity (NVIDIA, AMD, custom MTIA silicon) to avoid vendor lock-in and encourage market diversity. However, they acknowledge this creates significant operational challenges: difficulty moving workloads between hardware types, reduced utilization from stranded capacity, and strong developer resistance when new hardware requires code changes. The lesson is that vendor diversity requires heavy investment in software abstraction layers (PyTorch, Triton) to be viable—it's not just a procurement strategy but a comprehensive software engineering commitment.

### Network Technology Exploration

Building two separate 24,000 GPU clusters with different network technologies (Infiniband vs. RoCE) represents a sophisticated approach to technology risk management. Rather than betting everything on one networking solution, Meta ran parallel experiments at enormous scale. This strategy requires significant capital investment but provides invaluable learning about trade-offs before committing to even larger deployments.

### Workload-Specific Silicon

The MTIA custom silicon deployment demonstrates that hyperscalers can achieve significant efficiency gains for specific workload profiles (ranking and recommendation inference) with custom hardware. However, the decision to also pursue custom training chips and multiple chips in development reveals that silicon development is a long-term, multi-year commitment requiring substantial ongoing investment. The trade-off is improved efficiency and reduced vendor dependence against increased complexity, longer development cycles, and the risk of silicon becoming obsolete if workloads evolve.

### The Open Standards Imperative

Meta's extensive OCP contributions (187 submissions, 25% of all contributions) reflect a calculated strategy: investing in open standards creates economies of scale, improves fleet consistency, and enables collaborative problem-solving with other hyperscalers. The trade-off is sharing proprietary innovations and investing engineering time in community coordination rather than internal optimization. Meta explicitly states these benefits "will only be amplified in the era of AI," suggesting open standards become more valuable rather than less as infrastructure complexity increases.

### Infrastructure-First AI Development

The evolution from 4,000 to 129,000 GPU clusters within a few years required unprecedented infrastructure decisions like emptying five production data centers. This reveals that AI model development at Meta operates in lockstep with infrastructure availability—model researchers can't advance without cluster capacity, and infrastructure teams must build speculatively based on projected needs. Organizations without this level of infrastructure commitment face fundamental constraints on model development.

### Cooling and Power as First-Class Design Constraints

The GB200 deployment requiring four air-assisted liquid cooling racks demonstrates that thermal management isn't an afterthought but a primary design constraint. Traditional data center assumptions (air cooling, moderate power density) no longer apply. Organizations building AI infrastructure must redesign cooling, power distribution, and even building structures from first principles. Meta's use of weatherproof tents for Prometheus illustrates the extent to which infrastructure constraints drive creative solutions.

### Geographic Distribution for Scale

The Prometheus cluster spanning multiple buildings, tents, and colocation facilities, with software (Twine, MAST) evolved for long-distance training, represents a architectural shift. When power and space constraints limit single-location clusters, geographic distribution becomes necessary despite increased networking complexity and latency challenges. This suggests future AI clusters may increasingly resemble distributed systems rather than monolithic supercomputers.

### Hardware Scaling Limits Drive Innovation

Meta identifies specific technical challenges driving their research agenda: reticle size limits (830 mm²) constraining single-die performance, the need for advanced packaging (2.5D/3D chiplets), memory bandwidth vs. compute trade-offs on limited silicon beachfront, and the power budget explosion at rack level. These aren't abstract concerns but concrete barriers forcing innovation in silicon photonics, memory disaggregation, and advanced packaging. Organizations planning long-term AI infrastructure must engage with these fundamental limits rather than assuming linear scaling continues.

### The Software Abstraction Investment

Meta's heavy investment in PyTorch, Triton, and other abstraction layers represents a critical lesson: hardware heterogeneity only works with sophisticated software infrastructure. The goal is making new hardware adoption as frictionless as possible—if developers must rewrite code for each new accelerator, hardware diversity becomes untenable. This requires sustained investment in compiler technology, runtime optimization, and developer tooling, not just hardware procurement.

### Open Weight Models as Infrastructure Tools

Meta positions open weight models not just as application resources but as infrastructure standardization tools: "open weight models give application developers cost efficient access to high quality LLMs, and at the same time, give infrastructure and hardware engineers a standard workload to optimize for." This dual purpose—democratizing AI access while creating benchmark workloads—represents a strategic approach where open source contributions directly benefit internal infrastructure optimization.

### The Reliability-Performance Balance

Achieving 50x reduction in interruption rates required "collaboration with the industry and our partners," suggesting this wasn't achievable through Meta's efforts alone. The lesson is that AI training reliability depends on the entire hardware and software ecosystem—GPU manufacturers, network vendors, systems integrators—working together. Organizations can't solve reliability purely through internal engineering; it requires vendor partnerships and industry-wide efforts.
