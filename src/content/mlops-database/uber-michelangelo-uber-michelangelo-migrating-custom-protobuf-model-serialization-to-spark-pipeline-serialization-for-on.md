---
title: "Uber Michelangelo: Migrating Custom Protobuf Model Serialization to Spark Pipeline Serialization for Online Serving"
slug: "uber-michelangelo-uber-michelangelo-migrating-custom-protobuf-model-serialization-to-spark-pipeline-serialization-for-on"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "notebooks"
  - "pipeline-orchestration"
  - "databricks"
  - "docker"
  - "horovod"
  - "kubernetes"
  - "mlflow"
  - "spark"
  - "data-prep"
  - "data-validation"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Uber"
companySlug: "uber"
platformName: "Michelangelo"
contentType: "blog"
summary: "Uber evolved its Michelangelo ML platform's model representation from custom protobuf serialization to native Apache Spark ML pipeline serialization to enable greater flexibility, extensibility, and interoperability across diverse ML workflows. The original architecture supported only a subset of Spark MLlib models with custom serialization for high-QPS online serving, which inhibited experimentation with complex model pipelines and slowed the velocity of adding new transformers. By adopting standard Spark pipeline serialization with enhanced OnlineTransformer interfaces and extensive performance tuning, Uber achieved 4x-15x load time improvements over baseline Spark native models, reduced overhead to only 2x-3x versus their original custom protobuf, and enabled seamless interchange between Michelangelo and external Spark environments like Jupyter notebooks while maintaining millisecond-scale p99 latency for online serving."
link: "https://www.uber.com/blog/michelangelo-machine-learning-model-representation/"
year: 2019
seo:
  title: "Uber: Uber Michelangelo: Migrating Custom Protobuf Model Serialization to Spark Pipeline Serialization for Online Serving - ZenML MLOps Database"
  description: "Uber evolved its Michelangelo ML platform's model representation from custom protobuf serialization to native Apache Spark ML pipeline serialization to enable greater flexibility, extensibility, and interoperability across diverse ML workflows. The original architecture supported only a subset of Spark MLlib models with custom serialization for high-QPS online serving, which inhibited experimentation with complex model pipelines and slowed the velocity of adding new transformers. By adopting standard Spark pipeline serialization with enhanced OnlineTransformer interfaces and extensive performance tuning, Uber achieved 4x-15x load time improvements over baseline Spark native models, reduced overhead to only 2x-3x versus their original custom protobuf, and enabled seamless interchange between Michelangelo and external Spark environments like Jupyter notebooks while maintaining millisecond-scale p99 latency for online serving."
  canonical: "https://www.zenml.io/mlops-database/uber-michelangelo-uber-michelangelo-migrating-custom-protobuf-model-serialization-to-spark-pipeline-serialization-for-on"
  ogTitle: "Uber: Uber Michelangelo: Migrating Custom Protobuf Model Serialization to Spark Pipeline Serialization for Online Serving - ZenML MLOps Database"
  ogDescription: "Uber evolved its Michelangelo ML platform's model representation from custom protobuf serialization to native Apache Spark ML pipeline serialization to enable greater flexibility, extensibility, and interoperability across diverse ML workflows. The original architecture supported only a subset of Spark MLlib models with custom serialization for high-QPS online serving, which inhibited experimentation with complex model pipelines and slowed the velocity of adding new transformers. By adopting standard Spark pipeline serialization with enhanced OnlineTransformer interfaces and extensive performance tuning, Uber achieved 4x-15x load time improvements over baseline Spark native models, reduced overhead to only 2x-3x versus their original custom protobuf, and enabled seamless interchange between Michelangelo and external Spark environments like Jupyter notebooks while maintaining millisecond-scale p99 latency for online serving."
mlops:
  source: "sqlite"
  entryId: 10
  sourceUrl: "https://www.uber.com/blog/michelangelo-machine-learning-model-representation/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.060427"
  lastUpdated: "2026-04-14T19:54:34.023177"
---

## Problem Context

Uber's Michelangelo ML platform supports thousands of production models across diverse use cases including marketplace forecasting, customer support ticket classification, ETA calculation, and NLP-powered features like One-Click Chat. The platform was originally designed with a monolithic architecture that tightly coupled workflows and Spark jobs for training and serving, relying on custom protobuf representation of trained models for online serving.

This original architecture created several significant pain points that inhibited the platform's evolution. The custom protobuf representation made adding support for new Spark transformers extremely difficult and time-consuming, slowing the velocity of platform extensibility. Customers were prevented from flexibly experimenting with arbitrarily complex model pipelines, and models trained outside of core Michelangelo could not be served within the platform's infrastructure. Additionally, maintaining a custom internal version of Spark complicated upgrade cycles whenever new Spark versions were released.

As Michelangelo expanded to support more diverse use cases, particularly deep learning workflows that required distributed training on GPU clusters using Horovod while leveraging Spark for data preprocessing and low-latency CPU-based serving, the limitations of the custom representation became increasingly problematic. The platform needed to maintain consistency between training and serving environments across different operational contexts, from GPU-based distributed training to JVM-based low-latency serving infrastructure.

Another critical requirement emerged from data scientists wanting to build and experiment with complex models in familiar Jupyter Notebook environments through Uber's Data Science Workbench using PySpark, while still leveraging the Michelangelo ecosystem for distributed training, deployment, and serving. This workflow demanded seamless interchange of models between environments, support for ensemble learning and multi-task learning techniques, and the ability to perform dynamic data manipulation and custom evaluations.

## Architecture & Design

The evolved Michelangelo architecture centers on standard Spark ML pipeline serialization as the universal model representation contract. This approach provides a consistent architecture across diverse ML workflows while maintaining interoperability with external Spark tool sets.

The core architectural principle treats the entire ML workflow as a pipeline that must be deployed holistically for serving. This includes not just the trained model itself, but all data transformations, feature extraction, preprocessing steps, and post-prediction transformations. Raw predictions often need to be interpreted or transformed back into labels, or mapped to different dimensional spaces like log space for downstream consumption. The pipeline can also augment predictions with additional metadata such as confidence intervals and calibrated probabilities via probabilistic calibration.

The architecture introduces a clear separation between components relevant to different stages of the ML workflow. During model development and evaluation, operations like hyperparameter optimization, cross-validation, and generation of ad-hoc metadata for model interpretation are critical. However, once models are ready for production, these steps should not be incorporated into the serving infrastructure. This motivated development of a workflow and operator framework on top of common orchestration engines, allowing users to compose custom servable pipeline models as well as orchestrate custom operations in a directed graph to materialize the final servable pipeline model along with useful artifacts.

For online serving, the architecture maintains a local SparkContext to handle loading of any unoptimized transformers, but critically does not keep this SparkContext running when no model loads are active. This design decision prevents negative performance impacts from SparkContext overhead, such as actions from the SparkContext cleaner, which can degrade serving latency.

The pipeline architecture ensures consistency between online and offline serving by eliminating custom pre-scoring and post-scoring implementations outside of the PipelineModel. All transformation logic is encapsulated within pipeline stages, with common score functions implemented once and reused across both online and offline contexts.

## Technical Implementation

The technical implementation centered on extending standard Spark transformers with an OnlineTransformer trait to enable lightweight single-row predictions for real-time serving scenarios. This interface extends the out-of-the-box Spark Transformer interface and enforces two critical methods:

The first method, Transform(instance: Dataset[Any]), serves as the entry point for distributed batch serving using Spark's standard Dataset-based execution model. The second method, scoreInstance(instance: Map[String, Any]): Map[String, Object], provides a lighter-weight API for single-row prediction requests that bypasses the significant overhead incurred by Datasets and Spark SQL Engine's Catalyst Optimizer, which performs query planning and optimization on every request.

When a Spark PipelineModel is loaded, any Transformer with a comparable class implementing the OnlineTransformer trait is automatically mapped to that class. This allows existing trained Spark models comprised of supported transformers to gain online serving capability without additional work. The OnlineTransformer also implements Spark's MLWritable and MLReadable interfaces, providing native support for serialization and deserialization.

Within each pipeline stage, the standard implementation pattern involves creating a common score function that can be applied both as a Spark User-Defined Function (UDF) on input DataFrames for offline Transform operations and directly to online scoreInstance and scoreInstances methods. This pattern is enforced through unit tests and end-to-end integration tests to guarantee online and offline scoring consistency.

The implementation required extensive performance tuning to make native Spark pipeline serialization viable for online serving. Initial measurements revealed that native Spark pipeline load latency was 8x-44x slower than the custom protobuf representation, which was unacceptable for online serving where models are virtually sharded across serving instances and loaded at startup, during deployment, or upon receiving prediction requests.

Several specific optimizations were implemented to address load time overhead. For all transformers, replacing Spark's sc.textFile (which forms an RDD of strings for small one-line files) with direct Java I/O for local files significantly improved performance. For transformers like LogisticRegression, StringIndexer, and LinearRegression, replacing sparkSession.read.parquet with ParquetUtil.read and direct Parquet read/getRecord operations greatly improved load times.

Tree ensemble transformers required particular attention. Loading these models involved reading metadata files serialized to disk, which invoked groupByKey, sortByKey, and Spark distributed read/select/sort/collect operations on small files. Replacing these with direct Parquet read/getRecord operations was substantially faster. On the save side, tree ensemble node and metadata weights DataFrames were coalesced to avoid writing large numbers of small, slow-to-read files.

The platform leverages Apache Spark MLlib as the foundational machine learning library, with support for classical machine learning, time series forecasting, and deep learning models. For deep learning workflows specifically, the architecture maintains Spark for data preprocessing and low-latency serving while utilizing Horovod for distributed deep learning training on GPU clusters.

## Scale & Performance

Michelangelo supports thousands of models in production across Uber's diverse use cases, ranging from marketplace forecasting to customer support automation and NLP applications. The platform operates in a multi-tenant model serving setup where resource agility and health monitoring are critical concerns.

The performance tuning efforts yielded substantial improvements in model load times. The combination of optimizations reduced native Spark model load time from 8x-44x slower than custom protobuf to only 2x-3x slower, representing a 4x-15x speedup over baseline Spark native models. This level of overhead was deemed acceptable given the significant benefits of using a standard representation.

For online serving scenarios demanding millisecond-scale p99 latency, such as marketing and fraud detection use cases, the lightweight scoreInstance API provides the necessary performance characteristics by avoiding Dataset overhead and Catalyst Optimizer query planning on each request. The architecture maintains this low latency while supporting high-QPS (queries per second) workloads across thousands of models.

The platform's serving infrastructure is JVM-based, allowing it to leverage existing low-latency serving infrastructure while maintaining compatibility with Spark's ecosystem. Models are virtually sharded across serving instances, with load operations occurring at strategic points in the lifecycle rather than on every prediction request.

## Trade-offs & Lessons

The team evaluated several alternative approaches before settling on native Spark pipeline serialization, each with distinct trade-offs. MLeap was considered for its standalone serialization support and dedicated lightweight runtime, but its proprietary Bundle.ML persistence format limited interoperability with plain Spark MLlib tool sets. More critically, MLeap introduced risk of serving-time behavior deviation since models are loaded from a different format than they had in memory during training. The library also created friction for Spark update velocity since separate save/load methods must be added for each transformer beyond those used by Spark MLlib natively.

Standard export formats like PMML and PFA were also evaluated. While PMML has direct support in Spark and aardpfark provides Spark export to PFA, these representations presented even higher risks of serving-time behavior deviation, as general standards can have different interpretations in particular implementations. They also created higher friction for Spark update velocity, potentially requiring updates to the standards themselves depending on Spark changes.

The decision to use standard Spark ML pipeline serialization involved accepting some initial performance overhead in exchange for critical benefits: expressive power for complex pipelines, seamless interchange with external Spark tool sets, low risk of model interpretation deviation between training and serving, and minimal friction for Spark updates and writing custom transformers/estimators.

A key lesson from the implementation was the importance of performance tuning native Spark operations for production serving requirements. Out-of-the-box Spark serialization and loading operations were designed for distributed cluster scenarios, not for the tight latency budgets required by online serving. However, with targeted optimizations focusing on local file I/O, direct Parquet access, and careful management of SparkContext lifecycle, the team achieved acceptable performance while maintaining standard formats.

The architectural decision to separate development-time operations from serving-time components proved valuable. By using a workflow and operator framework to orchestrate model training, evaluation, and preparation while keeping the servable artifact clean and focused, the platform supports flexible experimentation without compromising serving efficiency.

The approach of implementing common score functions that can be reused across online and offline contexts, combined with comprehensive testing, provides strong guarantees of consistency between training and serving. This addresses one of the most critical challenges in production ML systems: ensuring that models behave identically in serving as they did during evaluation.

After more than a year running in production, native Spark model representation has proven robust and extensible, enabling new use cases like flexible experimentation in Data Science Workbench Jupyter environments and end-to-end deep learning with TFTransformers. The team shared their experiences at Spark AI Summit 2019 and filed a SPIP (Spark Project Improvement Proposal) and JIRA to contribute their changes back to the open source Spark MLlib project, demonstrating commitment to the broader community.
