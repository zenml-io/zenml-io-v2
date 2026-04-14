---
title: "Dagli: Faster and easier machine learning on the JVM, without the tech debt"
slug: "linkedin-pro-ml-dagli-faster-and-easier-machine-learning-on-the-jvm-without-the-tech-debt"
draft: false
mlopsTags:
  - "model-registry"
  - "model-serving"
  - "pipeline-orchestration"
  - "spark"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "serving"
  - "training"
industryTags: "media-entertainment"
company: "LinkedIn"
companySlug: "linkedin"
platformName: "Pro-ML"
contentType: "blog"
summary: "LinkedIn developed Dagli, an open-source machine learning library for JVM languages, to address the persistent technical debt and engineering complexity of building, training, and deploying ML pipelines to production. The library represents ML pipelines as directed acyclic graphs (DAGs) where the same pipeline definition serves both training and inference, eliminating the need for duplicate implementations and brittle glue code. Dagli provides extensive built-in components including neural networks, gradient boosted decision trees, FastText, logistic regression, and feature transformers, along with sophisticated optimizations like graph rewriting, parallel execution, and cross-training to prevent overfitting in multi-stage pipelines. The framework emphasizes bug resistance through static typing, immutability, and intuitive APIs while leveraging multicore CPUs and GPUs for efficient single-machine training and serving."
link: "https://engineering.linkedin.com/blog/2020/open-sourcing-dagli"
year: 2020
seo:
  title: "LinkedIn: Dagli: Faster and easier machine learning on the JVM, without the tech debt - ZenML MLOps Database"
  description: "LinkedIn developed Dagli, an open-source machine learning library for JVM languages, to address the persistent technical debt and engineering complexity of building, training, and deploying ML pipelines to production. The library represents ML pipelines as directed acyclic graphs (DAGs) where the same pipeline definition serves both training and inference, eliminating the need for duplicate implementations and brittle glue code. Dagli provides extensive built-in components including neural networks, gradient boosted decision trees, FastText, logistic regression, and feature transformers, along with sophisticated optimizations like graph rewriting, parallel execution, and cross-training to prevent overfitting in multi-stage pipelines. The framework emphasizes bug resistance through static typing, immutability, and intuitive APIs while leveraging multicore CPUs and GPUs for efficient single-machine training and serving."
  canonical: "https://www.zenml.io/mlops-database/linkedin-pro-ml-dagli-faster-and-easier-machine-learning-on-the-jvm-without-the-tech-debt"
  ogTitle: "LinkedIn: Dagli: Faster and easier machine learning on the JVM, without the tech debt - ZenML MLOps Database"
  ogDescription: "LinkedIn developed Dagli, an open-source machine learning library for JVM languages, to address the persistent technical debt and engineering complexity of building, training, and deploying ML pipelines to production. The library represents ML pipelines as directed acyclic graphs (DAGs) where the same pipeline definition serves both training and inference, eliminating the need for duplicate implementations and brittle glue code. Dagli provides extensive built-in components including neural networks, gradient boosted decision trees, FastText, logistic regression, and feature transformers, along with sophisticated optimizations like graph rewriting, parallel execution, and cross-training to prevent overfitting in multi-stage pipelines. The framework emphasizes bug resistance through static typing, immutability, and intuitive APIs while leveraging multicore CPUs and GPUs for efficient single-machine training and serving."
mlops:
  source: "sqlite"
  entryId: 47
  sourceUrl: "https://engineering.linkedin.com/blog/2020/open-sourcing-dagli"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.060817"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

LinkedIn identified a fundamental challenge plaguing production machine learning systems: the accumulation of technical debt from maintaining separate implementations for training and inference pipelines. While the ML ecosystem had matured with excellent tools like TensorFlow, PyTorch, Spark, and scikit-learn for individual model training, the end-to-end process of constructing integrated pipelines that include feature transformers, training models, and deploying them to production remained unnecessarily cumbersome and error-prone.

The core pain points motivating Dagli's development centered on duplicated work required to accommodate both training and inference modes. Teams typically needed to implement pipeline logic twice—once for the training environment and again for the serving environment—leading to brittle "glue" code that complicated future evolution and maintenance. This duplication created opportunities for logic bugs where training and inference implementations diverged, ultimately generating long-term technical debt that hindered model iteration and improvement.

Beyond the training-inference divide, LinkedIn recognized that many common ML engineering tasks lacked adequate tooling: preventing overfitting when one model consumes another's output, efficiently executing complex multi-stage pipelines, deploying models as cohesive units rather than collections of loosely-coupled components, and providing type safety to catch errors at compile time rather than runtime.

## Architecture & Design

Dagli's fundamental architectural innovation lies in representing machine learning pipelines as directed acyclic graphs where nodes represent computations and edges represent data dependencies. This DAG abstraction enables a single pipeline definition to serve both training and inference without code duplication, fundamentally solving the train-serve skew problem that plagues traditional ML systems.

The DAG consists of three types of nodes at its foundation. Root nodes represent pipeline inputs, either as "placeholders" that accept values provided during training and inference (like features extracted from raw data), or as "generators" like Constant, ExampleIndex, and RandomDouble that automatically produce values for each example. Child nodes are "transformers" that accept one or more input values per example and produce output values, encompassing both feature transformations (Tokens, BucketIndex, Rank, Index) and learned statistical models (XGBoostRegression, LiblinearClassifier, NeuralNetwork).

Transformers exist in two states within Dagli's execution model. "Preparable" transformers examine training data to learn parameters or determine optimal configurations, then become "prepared" transformers that can efficiently process new examples. This distinction applies not just to statistical models but also to feature engineering components—for example, BucketIndex analyzes value distributions across training examples to determine optimal bucket boundaries with even distribution, then uses those boundaries during inference.

The DAG abstraction enables sophisticated graph optimizations that would be difficult or impossible with traditional pipeline implementations. Dagli automatically deduplicates semantically identical nodes to eliminate redundant computation, elides nodes not required to prepare the DAG or infer its outputs, avoids caching intermediate results wherever possible to conserve memory, and pre-computes outputs for nodes whose values are provably independent of example data (analogous to constant folding in compiler optimization).

Beyond these intrinsic optimizations, individual nodes can provide custom "graph reducers" that rewrite portions of the DAG for simplification. Nested DAGs get flattened and replaced with their corresponding subgraphs. ConditionalValue nodes (functioning like ternary operators) eliminate themselves when their conditional input has a constant value. Inverse operations cancel each other out—for example, a Tupled2 node creating a tuple followed by Value1FromTuple extracting a field will eliminate both nodes from the graph.

## Technical Implementation

Dagli is implemented as a pure JVM library supporting Java and other JVM languages, leveraging the ecosystem's strong static typing, mature tooling, and extensive infrastructure. The implementation emphasizes immutability throughout—pipeline definitions are immutable objects, making them thread-safe and enabling safe sharing across execution contexts.

The execution model centers on DAGExecutors that prepare (train) and apply (infer with) DAGs using different strategies optimized for different workloads. The MultithreadedDAGExecutor maximizes throughput during training by implementing several parallelization strategies. Examples are conceptually split into small, sequential, fixed-size blocks rather than processed individually, reducing synchronization overhead while enabling minibatching for transformers like neural networks that benefit from processing multiple examples simultaneously. Transformers can begin executing on example blocks as soon as input values arrive from parent nodes rather than waiting for all examples to be processed, with bounded buffers limiting memory usage. Preparable transformers can perform much of their work during the initial streaming pass over data before materializing the final prepared transformer.

For inference workloads, FastPreparedDAGExecutor adopts a specialized strategy optimized for both batch and online serving. Example blocks are processed in single executor threads to minimize inter-thread synchronization overhead, maximizing throughput for batch inference while also minimizing latency for online serving scenarios where individual prediction latency matters most. The framework allows clients to select alternative executors when specific DAG characteristics (such as exceptional computational expense) might benefit from different execution strategies.

Individual model implementations leverage existing JVM libraries and tools. XGBoost integration provides gradient boosted decision trees. Liblinear supplies logistic regression. The framework includes an enhanced Java port of FastText for text classification. Neural network support comes through a layer-oriented API that specifies architectures as directed acyclic graphs of layer nodes, with the underlying implementation using DeepLearning4J for computation. Neural networks, FastText, and XGBoost implementations are themselves heavily multithreaded and can leverage SIMD instructions or GPUs for parallelized computation, sharing the executor's ForkJoinPool to avoid excessive concurrent threads and contention.

The serialization story is straightforward but powerful: entire pipelines serialize and deserialize as single objects, dramatically simplifying deployment compared to systems requiring coordination of multiple artifacts. This approach eliminates entire classes of version skew bugs where different pipeline components fall out of sync.

## Cross-Training for Overfitting Prevention

Dagli implements a sophisticated solution to a pernicious problem in multi-stage ML pipelines: overfitting when one model consumes another's output as a feature. The issue manifests when an upstream model memorizes training labels to some degree (achieving higher accuracy on training data than test data), then a downstream model overfits to these memorized predictions rather than learning generalizable patterns.

The framework addresses this through transformers that can produce different outputs during training versus inference, enabling cross-training strategies. The KFoldCrossTrained node implements K-fold cross-training where, with K=3 for example, Dagli trains three different versions of the upstream model, each on two-thirds of training data. Each model version predicts labels for the one-third of data it didn't see during training, ensuring every training example receives a prediction from a model that didn't include it in training. During inference on new examples, an arbitrary model version is selected. This ensures the distribution of upstream predictions remains consistent between training and inference, allowing downstream models to learn generalizable patterns rather than overfitting to training artifacts.

## Built-in Components and Extensibility

Dagli ships with an extensive collection of production-ready components spanning the full ML pipeline lifecycle. Statistical models include K-means clustering, gradient boosted decision trees via XGBoost, logistic regression via liblinear, isotonic regression, FastText for text classification, and neural networks through the layer-oriented API. Meta-transformers provide model selection (choosing the best from candidate models), cross-training (preventing overfitting in multi-stage pipelines), and specialized capabilities like training independent model variants on arbitrary example groups for per-cohort residual modeling.

Feature transformers cover diverse use cases: text processing including tokenization, bucketization for discretizing continuous values, statistical transformers for computing order statistics, list operations like ngram generation, feature vectorization for converting categorical and numeric features into model-ready formats, and discrete distribution manipulation. Evaluation algorithms for multiple problem types are implemented as transformers usable independently or within DAGs.

The framework makes custom transformers trivially easy to implement. FunctionResult nodes wrap existing methods as transformers with minimal boilerplate, allowing developers to leverage arbitrary Java methods within DAG definitions. Creating novel transformer types from scratch is similarly straightforward, with the framework handling execution, optimization, and serialization concerns.

Data ingestion supports arbitrary sources through simple Iterable interfaces, with convenient readers provided for delimiter-separated value files and Avro format. @Structs provide a type-safe, bug-resistant way to represent training examples with compile-time checking of field types and names.

## Scale & Performance Characteristics

While the document doesn't provide specific throughput numbers, the implementation reveals several performance-oriented design choices. The framework targets single-machine training and inference with heavy exploitation of multicore CPUs (increasingly common with core counts reaching dozens per machine) and GPU acceleration where applicable. The MultithreadedDAGExecutor achieves parallelism at multiple granularities: across independent transformers in the DAG, across example blocks within individual transformers, and within transformer implementations themselves through multithreading and SIMD/GPU acceleration.

The fixed-size block processing strategy balances multiple concerns: blocks must be small enough to enable parallelism and keep memory usage bounded through bounded buffers, yet large enough to amortize overhead and enable effective minibatching for neural networks. This design allows Dagli to efficiently utilize modern hardware for real-world model training without requiring distributed training infrastructure for many practical workloads.

The FastPreparedDAGExecutor's single-threaded-per-block strategy for inference optimizes for both batch throughput scenarios (where aggregate examples per second matters) and online latency scenarios (where individual prediction time matters). This flexibility allows the same pipeline to serve different production contexts without reimplementation.

## Trade-offs & Key Insights

Dagli makes deliberate trade-offs in its design philosophy. The choice to target single-machine execution with deep multicore/GPU exploitation rather than distributed training limits the scale of problems it can address compared to frameworks like Spark MLlib or Kubeflow, but dramatically simplifies deployment and reduces operational complexity for the substantial class of problems that fit within single-machine resource envelopes. LinkedIn's focus on this niche reflects a pragmatic observation: many production ML problems don't require massive distributed training, and the operational burden of distributed systems often outweighs their benefits.

The framework's emphasis on immutability and static typing trades some runtime flexibility for compile-time safety and clarity. Pipelines can't be dynamically modified during execution, but this constraint prevents entire classes of bugs that plague more dynamic systems. The strong typing throughout catches errors at compile time that would otherwise manifest as subtle runtime issues in production.

The DAG abstraction itself represents a key insight: by making the data dependencies and computation structure explicit and machine-readable, the framework gains latitude for aggressive optimization while keeping individual component implementations simple. Each transformer can be written as a relatively straightforward "black box" that focuses on its specific concern, while the framework handles parallelization, memory management, and graph optimization globally. This separation of concerns reduces the complexity tax on developers adding new models or transformers.

The graph optimization approach—combining intrinsic optimizations that leverage DAG structure with node-specific graph reducers—creates a cascade effect where initial optimizations enable subsequent ones. A nested DAG gets flattened, exposing new opportunities for node deduplication; deduplicated nodes may enable constant folding; constant folding may trigger conditional elimination. This compositional optimization strategy would be extremely difficult to implement in traditional imperative pipeline code.

The cross-training mechanism for preventing overfitting in multi-stage pipelines addresses a problem that's often handled ad-hoc or ignored entirely in production systems. Making this capability a first-class framework feature with clean API support dramatically lowers the barrier to building sophisticated pipelines that actually generalize well.

LinkedIn's decision to open-source Dagli reflects a bet that standardization and community adoption in the JVM ML space will benefit the ecosystem broadly. The JVM has historically lagged Python in ML tooling despite its dominance in enterprise production systems. Dagli attempts to provide a comprehensive, production-ready framework that leverages JVM strengths (static typing, mature tooling, operational familiarity) while learning from Python ecosystem innovations.

The serialization-as-a-single-object approach trades some flexibility for massive simplification in deployment. Systems that serialize individual components separately can theoretically update components independently, but in practice this flexibility is rarely needed and the coordination complexity it introduces causes more problems than it solves. Dagli's monolithic serialization ensures complete consistency between all pipeline components.

The framework's extensibility through FunctionResult nodes and custom transformers acknowledges that no framework can anticipate all use cases. By making it trivial to incorporate arbitrary Java methods or implement new transformer types, Dagli avoids the common trap of comprehensive frameworks that become straightjackets when requirements exceed their built-in capabilities.
