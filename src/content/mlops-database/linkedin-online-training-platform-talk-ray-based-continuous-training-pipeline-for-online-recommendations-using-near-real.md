---
title: "Ray-based continuous training pipeline for online recommendations using near-real-time Kafka data"
slug: "linkedin-online-training-platform-talk-ray-based-continuous-training-pipeline-for-online-recommendations-using-near-real"
draft: false
mlopsTags:
  - "data-versioning"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "flyte"
  - "horovod"
  - "iceberg"
  - "kubernetes"
  - "ray"
  - "spark"
  - "ab-testing"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "LinkedIn"
companySlug: "linkedin"
platformName: "online training platform (talk)"
contentType: "video"
summary: "LinkedIn's AI training platform team built a scalable online training solution using Ray to enable continuous model updates from near-real-time user interaction data. The system addresses the challenge of moving from batch-based offline training to a continuous feedback loop where every click and interaction feeds into model training within 15-minute windows. Deployed across major AI use cases including feed ranking, ads, and job recommendations, the platform achieved over 2% improvement in job application rates while reducing computational costs and enabling fresher models. The architecture leverages Ray for scalable data ingestion from Kafka, manages distributed training on Kubernetes, and implements sophisticated streaming data pipelines to ensure training-inference consistency."
link: "https://www.youtube.com/watch?v=dMvZu4W0SG4"
year: 2025
seo:
  title: "LinkedIn: Ray-based continuous training pipeline for online recommendations using near-real-time Kafka data - ZenML MLOps Database"
  description: "LinkedIn's AI training platform team built a scalable online training solution using Ray to enable continuous model updates from near-real-time user interaction data. The system addresses the challenge of moving from batch-based offline training to a continuous feedback loop where every click and interaction feeds into model training within 15-minute windows. Deployed across major AI use cases including feed ranking, ads, and job recommendations, the platform achieved over 2% improvement in job application rates while reducing computational costs and enabling fresher models. The architecture leverages Ray for scalable data ingestion from Kafka, manages distributed training on Kubernetes, and implements sophisticated streaming data pipelines to ensure training-inference consistency."
  canonical: "https://www.zenml.io/mlops-database/linkedin-online-training-platform-talk-ray-based-continuous-training-pipeline-for-online-recommendations-using-near-real"
  ogTitle: "LinkedIn: Ray-based continuous training pipeline for online recommendations using near-real-time Kafka data - ZenML MLOps Database"
  ogDescription: "LinkedIn's AI training platform team built a scalable online training solution using Ray to enable continuous model updates from near-real-time user interaction data. The system addresses the challenge of moving from batch-based offline training to a continuous feedback loop where every click and interaction feeds into model training within 15-minute windows. Deployed across major AI use cases including feed ranking, ads, and job recommendations, the platform achieved over 2% improvement in job application rates while reducing computational costs and enabling fresher models. The architecture leverages Ray for scalable data ingestion from Kafka, manages distributed training on Kubernetes, and implements sophisticated streaming data pipelines to ensure training-inference consistency."
mlops:
  source: "sqlite"
  entryId: 192
  sourceUrl: "https://www.youtube.com/watch?v=dMvZu4W0SG4"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T15:40:56.617512"
  lastUpdated: "2026-04-14T19:55:56.300360"
---

## Problem Context

LinkedIn's AI training platform faced fundamental challenges in keeping machine learning models fresh and relevant at scale. Traditional batch-based offline training operated on daily or quarterly cycles, creating significant lag between user interactions and model updates. This staleness problem manifested in multiple ways that motivated the shift to online training.

The core pain points driving this initiative included model freshness degradation, where models trained on yesterday's data couldn't capture today's trends and user behavior shifts. Daily incremental training represented the fastest refresh cycle for most models, with some operating on quarterly full retraining schedules. This meant models could be operating on information that was hours, days, or even months out of date.

Computational inefficiency represented another major challenge. Frequent retraining with large time windows required processing the same historical data repeatedly. Each daily retrain would process overlapping data from previous training runs, wasting significant computational resources without adding new learning.

The engineering team also struggled with dependency management and runtime fragility. Before implementing this standardized platform, AI engineers trained models using custom Python images and custom training scripts. This heterogeneity made debugging extremely difficult, as isolating issues between infrastructure code and user code became a complex archaeological exercise. When production issues arose in online training scenarios, the resolution timeline demands were much tighter than batch training, requiring a more robust and standardized approach.

Training-inference consistency posed perhaps the most subtle but critical challenge. In offline training workflows, features were computed in batch Spark pipelines, potentially using different feature computation logic or feature versions than what ran during online inference. This skew between training and serving could silently degrade model quality, and the team needed a solution that guaranteed features used during training were identical to those logged during inference.

## Architecture & Design

LinkedIn's online training platform architecture is built on several key layers that work together to create a continuous learning system. The foundation rests on an internal Kubernetes computing platform that provides the orchestration layer for all training workloads.

### Infrastructure Layer

Each training job launches as a dedicated Ray cluster managed by a Flyte-based workflow management system. This provides declarative workflow definitions and handles the lifecycle management of training runs. HDFS serves as the persistent storage layer for model checkpoints, training status, and artifacts. After training completes, models undergo required post-processing before being published to the serving infrastructure.

### Data Pipeline Architecture

The data generation pipeline implements a sophisticated streaming architecture that ensures training-inference consistency. The flow begins with multiple Kafka topics serving as inputs. A critical component is the feature tracking topic, which logs exact feature values used during online model inference. This creates an audit trail ensuring that training uses precisely the same feature values that were presented to the model during serving.

Additional Kafka topics carry user signals like job applications, clicks, and other interactions. These signals originate from vertical team backend services that receive user actions and publish them for downstream consumption.

An attribution service performs the first stage of processing, implementing stream-based joining between features and user signals. The join operates on unique impression IDs with a one-hour window to maximize positive label capture while balancing memory requirements. Given the large window size, the system implements an optimization where feature vectors are offloaded to a Redis cache, reducing memory pressure on the stream processor. When events fall within the join window, the system rehydrates events by fetching feature values from cache using impression IDs, reconstructing complete training samples.

The joined samples flow to a data transformation service, another stream processing component that performs critical preprocessing. Features logged for tracking use a nested format optimized for efficient logging, while training requires a flattened wide-column format. The transformation service handles this conversion and implements pipeline configurations for negative sampling, custom labeling logic, and routing to different sinks. Some topics ETL data into HDFS for offline training, while others flow directly to online training consumers.

### Training Service Architecture

The training layer decouples data workers from training workers using Ray actors, creating clean separation of concerns. Data workers handle ingestion from either offline data managed by Iceberg or streaming data from Kafka, using different implementations appropriate for each source. Training workers implement the actual model training using TensorFlow or PyTorch frameworks.

A critical architectural decision involved moving away from user-managed Python environments. Instead of allowing engineers to build and manage custom Docker images, the platform requires users to call an exporter API that compiles and serializes the training compute graph. This includes forward passes, loss calculation, backpropagation, and optimizer updates. TensorFlow models use SavedModel format, while PyTorch models leverage torch.export to create FX graphs. This static graph approach dramatically simplifies reproducibility and safety, enabling versioning and validation of compute graphs rather than arbitrary Python scripts.

The platform launches different Ray actors for different roles during training execution. The system no longer requires users to ship Python code at runtime—only serialized model artifacts and input datasets. A standard training loop executes forward pass, loss calculation, backward pass, and optimizer updates. For distributed training scenarios, the platform supports Horovod for TensorFlow and torch.distributed built on Ray Train. However, for online training use cases, the QPS for training data typically doesn't justify distributed training. Distributed training primarily serves offline replay experiments with large batch datasets.

An evaluation service runs in parallel, taking multiple checkpoints saved during training and executing evaluation on consistent evaluation datasets. This parallelization accelerates the validation process.

### Data Ingestion Optimization with Ray

The data ingestion layer addresses a critical challenge: LinkedIn's Kafka infrastructure was primarily built for Java stacks, but most ML engineers work in Python. The legacy messaging API presented two severe bottlenecks—it made blocking calls to fetch messages from Kafka clusters, and operated single-threaded.

Ray Core provided an elegant solution through its first-class Python support. The team built a scalable data ingestion service where one Ray worker handles one request. Despite its simplicity, this approach demonstrates near-linear scaling from one CPU to 100 CPUs.

Further optimization leveraged Ray's object store and zero-copy capabilities. When actors return dictionaries or raw messages, performance is five times slower compared to returning NumPy arrays or TensorFlow tensors. This performance difference stems from additional serialization, deserialization, and copying overhead for non-native NumPy objects. Using native array types eliminates these costs through zero-copy sharing.

The team also implemented a prefetching pattern using Ray's data generator capabilities. One pool of workers handles I/O operations (fetching from Kafka), while another pool performs heavy lifting—preprocessing, parsing, batching, and tensorization. Overlapping I/O with computation provides an additional 2x throughput improvement.

### Monitoring and Alerting

The platform implements comprehensive monitoring by sending metrics calculated during training and evaluation to a centralized monitoring and alerting platform. Key alerts include input traffic monitoring (QPS of training data), offset lag monitoring (how far behind real-time the system is processing), label distribution monitoring (ensuring sampling rates are correct), and real-time progressive evaluation metrics that track model quality during training.

## Technical Implementation

### Serialization and State Management

The platform takes comprehensive snapshots of training state, including model parameters, optimizer states, and data loading states. For offline incremental training, the system stores date partitions managed by Iceberg tables, providing time-travel capabilities and schema evolution. For online training, snapshots include Kafka offsets and internal timestamps, enabling exact replay from any point in the stream. All artifacts package into folders and store in HDFS for record keeping and auditability.

### Model Export and Compilation

The torch.export process required careful constraint management. The team cannot tolerate graph breaks and must control dynamic shapes, requiring upfront constraints during export. When compilation errors occur, the typical resolution involves instructing users how to modify model code to satisfy export constraints. To date, issues have been resolvable within torch.export capabilities, though future issues might require engaging with the PyTorch open-source team.

### Testing and Validation Strategy

The platform integrates with LinkedIn's online A/B testing system. Engineers train models and publish them to testing slots, comparing against baseline models (typically static models or previous-generation training approaches). The visualization platform shows performance metrics compared to baselines, with both models trained on identical time windows to ensure fair comparison.

For incremental training, models are retrained daily and published to comparison slots. For online training, models publish every 15 minutes (for some verticals) or every 12 hours (for ads), depending on traffic volume and use case requirements. The publishing frequency varies by vertical team based on their experimental results determining optimal model freshness.

Validation timelines also vary by vertical. Job recommendations, for example, use two-week validation windows to ensure statistical significance before declaring a model superior to the baseline. The validation period depends on dataset volume and traffic volume, ensuring A/B tests reach statistical power.

### Version Management

Each model publication generates a new version that overwrites the previous version in that specific model slot. For a given slot, only the latest version exists, which simplifies serving infrastructure. The comparison methodology involves testing the continuously updating slot against a static baseline model in a separate slot, measuring whether the fresh model outperforms the frozen baseline.

The specific experimental setup depends on the hypothesis being tested. Teams might compare a new model architecture trained from scratch against a production model, or they might validate whether enabling online training provides benefits over batch training. Different hypotheses require different experimental designs and version management strategies.

## Scale & Performance

### Throughput and Latency Improvements

The Ray-based data ingestion service demonstrates near-linear scaling characteristics, moving from single-CPU performance to 100-CPU performance with minimal overhead. The zero-copy optimization using NumPy arrays and TensorFlow tensors provides a 5x performance improvement over serializing dictionaries. The prefetching pattern with overlapped I/O and computation delivers an additional 2x improvement. Combined, these optimizations represent roughly 10x improvement in data ingestion throughput.

Model update latency decreased dramatically from daily or quarterly cycles to 15-minute windows for online training use cases. This represents a 96x improvement (from 24 hours to 15 minutes) for the fastest refresh cycle.

### Business Impact

The job recommendation model achieved over 2% improvement in job application rate when switching from batch training to online training. This represents significant business value, as job applications are a primary success metric for LinkedIn's talent marketplace.

Computational cost reduction came from two sources. First, online training avoids retraining on previously trained data by loading from checkpoints and training only on new data. Second, the approach enables enlarging time windows without the computational penalty of reprocessing historical data in each training run.

### Training Data QPS

For online training scenarios, the QPS for training data typically doesn't justify distributed training. Single-worker trainers can handle approximately 1000 QPS throughput, which satisfies current online training requirements. Distributed training primarily serves offline replay experiments where large batch datasets require parallelization.

### Join Window and Cache Strategy

The attribution service uses a one-hour join window, representing a trade-off between maximizing positive label capture (longer windows catch more delayed user signals) and resource requirements (longer windows require more state). Offloading feature vectors to Redis cache mitigates the memory pressure this large window would otherwise create.

## Trade-offs & Lessons

### Benefits Realized

The static graph approach through TensorFlow SavedModel and torch.export proved transformative for operational stability. By eliminating user-managed Python environments and arbitrary runtime code, the platform dramatically simplified debugging and reduced the time to isolate issues. Version control and validation of serialized compute graphs is far more tractable than validating collections of Python scripts with complex dependency chains.

The decoupling of data workers from training workers using Ray actors created clean interfaces that simplified both development and testing. Each component can evolve independently, and the Ray framework handles the complexity of distributed coordination.

Training-inference consistency achieved through feature logging during inference eliminated the subtle but pernicious problem of feature skew. By using exactly the same feature values for training that were used during inference, the system guarantees consistency without requiring complex feature versioning or point-in-time joins.

### Challenges and Limitations

The legacy Kafka Python client based on REST proxy represents a significant bottleneck compared to native Java implementations. While Ray's scalability mitigates this limitation, the fundamental client performance remains suboptimal. The team had to architect around this constraint rather than solving it at the source.

The torch.export compilation process introduced new constraints on model authoring. Engineers must write models that satisfy export requirements, avoiding graph breaks and properly specifying shape constraints. This represents a trade-off where operational benefits (reproducibility, safety, versioning) come at the cost of some flexibility in model development.

The platform doesn't currently support distributed training for online training scenarios because the training data QPS doesn't warrant it. This represents an architectural choice optimized for current scale. If future models grow larger or traffic increases substantially, the platform would need to incorporate parameter server or distributed training capabilities.

Validation timelines present operational complexity. Two-week validation windows for job recommendations mean that model iterations have long feedback cycles for determining whether changes improve production metrics. The 15-minute model publication frequency creates a version management challenge where hundreds of versions might exist during a single validation period, though the architecture addresses this by maintaining only the latest version per slot.

### Future Directions

The team is exploring streaming partial parameter updates as an optimization for model deployment. Instead of going through full model publishing and deployment cycles, they would send updated parameters directly from the optimizer to serving containers. For sparse parameters like embedding tables with sparse gradients, only updated rows would transfer, dramatically reducing network traffic. Benchmarks show this approach could reduce model update latency by 15x.

Sequential model support represents another frontier. Sequential models require different data organization—user past action histories rather than activities partitioned by impression ID. The platform needs to track updated user activities and avoid retraining on past sequences, requiring new state management approaches.

Graph optimization and auto-tuning capabilities are planned to reduce manual configuration burden. The team wants to run optimization passes for compilation, kernel fusion, and replacement, along with a hardware planner that automatically determines optimal hardware requirements based on user-provided batch sizes. This would eliminate manual GPU count and I/O configuration tuning.

LLM-based recommendation represents an emerging use case requiring platform evolution. Beyond training, LLM workflows include model distillation and reinforcement learning with human feedback. The team plans to extend the system with additional Ray actor types—teacher inference workers, student training workers, and RLHF reference workers. These different worker types would communicate via message queues and potentially leverage Ray's recently launched RDMA features for direct memory access and faster communication.

### Key Insights for Practitioners

The shift from user-managed environments to serialized compute graphs represents a critical lesson in balancing flexibility versus operational stability. While serialization introduces constraints, the debugging and reproducibility benefits far outweigh the limitations for production systems.

Investing in training-inference consistency through feature logging pays dividends. The complexity of implementing feature tracking topics and streaming joins is justified by eliminating subtle feature skew bugs that are nearly impossible to debug after the fact.

Ray's first-class Python support proved essential for bridging the Java-Python divide in the infrastructure stack. Rather than rewriting Kafka infrastructure or forcing ML engineers to work in Java, Ray enabled scaling the Python side to compensate for legacy client performance limitations.

Linear scalability doesn't require complex architectures. The simple pattern of one Ray worker per request, combined with careful attention to serialization (zero-copy) and overlap (prefetching), delivered order-of-magnitude performance improvements with relatively straightforward code.

Monitoring and alerting deserve first-class attention in online training systems. Unlike batch training where failures can be addressed on human timescales, online training issues require immediate detection and response. Comprehensive metrics for input traffic, lag, label distribution, and progressive evaluation enable rapid issue identification.
