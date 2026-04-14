---
title: "Michelangelo: end-to-end ML platform for scalable training, deployment, and production monitoring at Uber"
slug: "uber-michelangelo-michelangelo-end-to-end-ml-platform-for-scalable-training-deployment-and-production-monitoring-at-uber"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "dask"
  - "docker"
  - "horovod"
  - "spark"
  - "data-ingestion"
  - "data-prep"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Uber"
companySlug: "uber"
platformName: "Michelangelo"
contentType: "video"
summary: "Uber built Michelangelo, an end-to-end machine learning platform designed to enable data scientists and engineers to deploy and operate ML solutions at massive scale across the company's diverse use cases. The platform supports the complete ML workflow from data management and feature engineering through model training, evaluation, deployment, and production monitoring. Michelangelo powers over 100 ML use cases at Uber—including Uber Eats recommendations, self-driving cars, ETAs, forecasting, and customer support—serving over one million predictions per second with sub-five-millisecond latency for most models. The platform's evolution has shifted from enabling ML at scale (V1) to accelerating developer velocity (V2) through better tooling, Python support, simplified distributed training with Horovod, AutoTune for hyperparameter optimization, and improved visualization and monitoring capabilities."
link: "https://www.infoq.com/presentations/uber-ml-michelangelo/"
year: 2019
seo:
  title: "Uber: Michelangelo: end-to-end ML platform for scalable training, deployment, and production monitoring at Uber - ZenML MLOps Database"
  description: "Uber built Michelangelo, an end-to-end machine learning platform designed to enable data scientists and engineers to deploy and operate ML solutions at massive scale across the company's diverse use cases. The platform supports the complete ML workflow from data management and feature engineering through model training, evaluation, deployment, and production monitoring. Michelangelo powers over 100 ML use cases at Uber—including Uber Eats recommendations, self-driving cars, ETAs, forecasting, and customer support—serving over one million predictions per second with sub-five-millisecond latency for most models. The platform's evolution has shifted from enabling ML at scale (V1) to accelerating developer velocity (V2) through better tooling, Python support, simplified distributed training with Horovod, AutoTune for hyperparameter optimization, and improved visualization and monitoring capabilities."
  canonical: "https://www.zenml.io/mlops-database/uber-michelangelo-michelangelo-end-to-end-ml-platform-for-scalable-training-deployment-and-production-monitoring-at-uber"
  ogTitle: "Uber: Michelangelo: end-to-end ML platform for scalable training, deployment, and production monitoring at Uber - ZenML MLOps Database"
  ogDescription: "Uber built Michelangelo, an end-to-end machine learning platform designed to enable data scientists and engineers to deploy and operate ML solutions at massive scale across the company's diverse use cases. The platform supports the complete ML workflow from data management and feature engineering through model training, evaluation, deployment, and production monitoring. Michelangelo powers over 100 ML use cases at Uber—including Uber Eats recommendations, self-driving cars, ETAs, forecasting, and customer support—serving over one million predictions per second with sub-five-millisecond latency for most models. The platform's evolution has shifted from enabling ML at scale (V1) to accelerating developer velocity (V2) through better tooling, Python support, simplified distributed training with Horovod, AutoTune for hyperparameter optimization, and improved visualization and monitoring capabilities."
mlops:
  source: "sqlite"
  entryId: 12
  sourceUrl: "https://www.infoq.com/presentations/uber-ml-michelangelo/"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.060448"
  lastUpdated: "2026-04-14T19:54:34.882805"
---

## Problem Context

Uber faced a fundamental challenge in scaling machine learning across a rapidly growing organization with increasingly diverse ML use cases. Unlike companies with one or two dominant ML applications, Uber had a wide array of equal-weight ML problems spanning the entire business—from real-time prediction services for Uber Eats and dynamic pricing to self-driving car perception systems and operational forecasting. The company processes 15 million trips per day across 600 cities with 75 million riders and 3 million drivers, generating massive volumes of real-world physical data from GPS traces, accelerometers, and sensor-equipped vehicles.

The core pain points that motivated building Michelangelo included the lack of a unified workflow for ML development, significant friction in data pipeline management, difficulty deploying models to production at scale, and the inability to monitor model performance once deployed. Individual teams were building one-off solutions, leading to duplicated effort and inconsistent practices. Data scientists struggled with the plumbing required to get data to models in production, often spending more time on infrastructure than on actual modeling work. The temporal-spatial nature of Uber's marketplace—where riders and drivers must be matched in close proximity in both time and space—added unique complexity requiring sophisticated forecasting and optimization models.

Early ML efforts at Uber revealed that Machine Learning is far more than just training models. The end-to-end workflow encompasses data management, feature engineering, training, evaluation, deployment, serving, and continuous monitoring. Without a unified platform, each of these stages introduced friction that slowed innovation and made it difficult to scale ML across the organization. The initial goal was straightforward: enable teams to deploy and operate ML solutions at full Uber scale. As the platform matured, the focus shifted toward developer velocity and empowering individual model owners to be fully self-sufficient from early prototyping through production deployment and operationalization.

## Architecture & Design

Michelangelo is architected as a comprehensive end-to-end platform supporting the complete ML lifecycle through integrated online and offline systems. The architecture distinguishes between batch/offline processing for data preparation and training versus online/real-time systems for serving predictions with low latency.

**Data Layer Architecture**

The foundation begins with Uber's data lake built on Hadoop and Hive tables, where all company data funnels. The platform provides two primary data processing paths. For offline batch processing, data scientists write Spark or SQL jobs to perform feature engineering—screening, joining, and aggregating raw data into feature tables and outcome labels used for training. For online serving, features computed in batch jobs are copied into Cassandra key-value stores, enabling fast retrieval at prediction time.

A critical architectural innovation is the streaming path for fresh features. While two-week aggregations like average restaurant meal prep time can be computed daily via batch jobs, real-time features like current restaurant busyness require streaming computation. The platform ingests data from Kafka, runs Flink jobs for stream aggregation, and writes results to both Cassandra for online serving and Hive for training, ensuring perfect parity between online and offline feature values through double-writing.

**Feature Store**

At the heart of the data management layer sits a centralized feature store where teams register, curate, and share features across different models. This architectural choice dramatically reduces duplicate feature engineering work—rather than writing new queries to compute features, modelers select from the feature catalog. Critically, once a model references features from the store, the platform automatically wires up the production pipelines to deliver those features to the model at prediction time, eliminating manual infrastructure work.

**Training Infrastructure**

The training layer supports multiple execution environments. For traditional tree-based and linear models, the platform runs large-scale distributed training on CPU clusters. For deep learning, training executes on GPU clusters using TensorFlow and PyTorch frameworks, powered by Uber's custom Horovod distributed training infrastructure. Horovod eliminates the parameter server architecture, instead using MPI and ring reduction techniques to more efficiently shuffle gradients during distributed training while dramatically simplifying the API for model developers.

**Model Registry and Metadata Management**

All trained models are stored in a centralized model database (replacing an earlier Cassandra-based approach) that captures comprehensive metadata: who trained the model, when, what dataset was used, hyperparameters, evaluation metrics, and the complete learned parameters (tree split points for tree models, network weights for neural networks). The registry maintains lineage and enables rigorous comparison of tens or hundreds of model variants during the iterative development process.

**Serving Infrastructure**

The deployment and serving layer supports both batch and online prediction modes. For batch predictions, models deploy into scheduled Spark jobs that generate predictions at regular cadences. For online serving—which handles the majority of Uber's production ML workload—models deploy into containerized prediction services that expose network-based request-response APIs.

The online serving architecture implements a routing layer that directs incoming requests to the appropriate model based on headers. The prediction service can load multiple models simultaneously and route to the correct one. When features are needed from the feature store, the service fetches them from Cassandra, joins them with features provided in the request payload, assembles the complete feature vector, scores the model, and returns the prediction—all within tight latency constraints.

**Monitoring and Feedback Loop**

The monitoring architecture closes the loop by logging predictions back to Hadoop, where batch jobs join predictions with observed outcomes collected from production systems. For example, Uber Eats meal delivery time predictions are joined with actual delivery times an hour later when batch pipelines run. This generates ongoing accuracy metrics for models in production, though the batch nature introduces a delay (typically one hour) before accuracy can be assessed. For use cases like fraud detection where outcome labels may arrive 90 days later, alternative approaches monitor feature and prediction distributions over time to detect anomalies indicating model degradation.

## Technical Implementation

**Core Technology Stack**

The platform's offline batch processing relies heavily on Apache Spark for distributed data processing and Hive for data warehousing. Streaming features leverage Apache Kafka for message ingestion and Apache Flink for stream processing. Cassandra serves as the online feature store, chosen for its ability to serve high-throughput reads with low latency. The data lake runs on Hadoop clusters.

**Training Frameworks**

Tree-based models and linear models use custom distributed training implementations optimized for CPU clusters. For deep learning, the platform supports both TensorFlow and PyTorch, with training orchestrated through Uber's Horovod framework. Horovod's key innovation replaces TensorFlow's native parameter server approach with an MPI-based ring-allreduce algorithm that reduces communication overhead during distributed training. From the developer perspective, Horovod requires only a few API calls added to standard TensorFlow code—initialization, broadcast of initial variables, and wrapping the optimizer—making the transition from single-node to distributed training dramatically simpler than configuring parameter servers and worker nodes.

**PyML: Python-Based Flexible Serving**

Recognizing that the initial high-scale infrastructure wasn't accessible enough for many data scientists, Uber developed PyML to support arbitrary Python-based models. Data scientists can train models using any Python library (scikit-learn, XGBoost, custom algorithms) in familiar environments like Jupyter notebooks. They implement a simple serving interface (load model, predict function), specify dependencies via requirements files, and upload the model via API.

The system packages everything into a Docker container that deploys to the same serving infrastructure. Architecturally, PyML uses a nested container approach: the existing high-scale prediction service acts as a gateway proxy, routing requests to a local Docker container running the Python scoring code. This provides the same monitoring, networking, and operational support as native models while enabling full Python flexibility. The tradeoff is slightly higher latency and less resource efficiency compared to native implementations, but the developer velocity improvement is substantial—teams can quickly deploy models for single cities, prove value, and then justify rebuilding on the high-scale system if needed.

**Web UI and API Layer**

The platform exposes both a web-based UI and programmatic APIs. The UI organizes work around "projects"—containers for specific modeling problems. Within a project, users connect to Hive tables, view all trained models, examine detailed evaluation reports with confusion matrices and feature importance visualizations, explore tree structures for interpretability, and deploy models with a single click. The API layer enables automation and integration, allowing teams to drive the entire workflow programmatically from Python or Java code.

**Visualization and Debugging Tools**

The platform provides extensive model inspection capabilities. For all models, it displays standard metrics (AUC, precision, recall for classification; MSE, MAE for regression) and generates comprehensive feature reports showing distributions, importance scores, and statistics (mean, min, max, standard deviation). For tree models specifically, an interactive tree explorer lets users drill into individual trees, examine split points, and trace how specific feature vectors flow through the model to produce predictions—critical for debugging unexpected model behavior.

## Scale & Performance

**Production Serving Scale**

Michelangelo serves over one million predictions per second across all use cases at Uber. For tree-based and linear models deployed to the native serving infrastructure without Cassandra lookups, P95 latency typically remains under five milliseconds. When online features must be fetched from Cassandra, an additional 5-20 milliseconds of latency is incurred, but total prediction time still comfortably stays within the 100-millisecond budget for most user-facing applications.

Deep learning model inference presents more challenging latency characteristics, as inference time scales with model complexity. The platform continues to optimize deep learning serving, but tree models demonstrate consistently fast performance suitable for real-time applications.

**Data and Trip Volume**

Uber completes over 15 million trips daily and had completed 4 billion trips in the year preceding the 2019 presentation (with growth continuing). The company operates across 600 cities with 75 million riders and 3 million drivers. The platform processes GPS traces, accelerometer data, and other sensor inputs from millions of devices, generating massive data volumes that feed into the Hadoop data lake.

**Model Diversity**

The platform supports over 100 distinct ML use cases spanning the company, from customer-facing applications (Uber Eats recommendations, ETAs, pricing, self-driving perception) to operational systems (forecasting, capacity planning, customer support routing, anomaly detection). The Uber Eats homepage alone scores hundreds of models on every page load to personalize restaurant rankings, meal recommendations, and delivery time estimates.

**Training Efficiency**

Horovod demonstrates substantial training efficiency improvements over native TensorFlow distributed training. By eliminating parameter server bottlenecks and using ring-allreduce for gradient synchronization, Horovod achieves better scaling characteristics on GPU clusters while requiring minimal code changes from data scientists.

## Trade-offs & Lessons

**Scale vs. Flexibility**

The platform's evolution illustrates a fundamental tradeoff between resource efficiency at scale versus developer accessibility and flexibility. The initial high-scale implementation targeted the highest-value use cases requiring massive data volumes, low-latency serving, and resource-efficient prediction. This was the right first choice for Uber's most strategic applications. However, this focus on scale made the platform less accessible for the long tail of modeling problems and alienated data scientists accustomed to flexible Python workflows.

PyML represents a deliberate compromise—accepting slightly higher latency, less resource efficiency, and non-distributed training constraints in exchange for dramatically improved developer experience. Teams can now rapidly prototype in Python using familiar tools, deploy to production quickly to prove value, and then justify rebuilding on the high-scale infrastructure if the use case demands it. This two-tier approach balances the needs of both high-scale strategic applications and rapid experimentation.

**Data Management is the Hard Part**

A consistent theme emphasized throughout the presentation is that data management, not modeling algorithms, represents the hardest part of production ML. Feature engineering, maintaining online-offline parity, wiring up data pipelines to deliver the right features at the right time, and ensuring data quality consume far more effort than training models. The centralized feature store and automated pipeline generation directly address this pain point, allowing data scientists to focus on modeling problems rather than data plumbing.

**Bringing Tools to Developers**

An early mistake was not embracing the tools data scientists already knew and preferred—particularly Python and Jupyter notebooks. The initial platform required learning new workflows and interfaces optimized for scale but foreign to typical data science practice. V2 of the platform corrects this by bringing the platform capabilities to developers in their preferred environments. The PyML integration, Jupyter notebook support, and API-first design enable data scientists to work in familiar contexts while leveraging platform infrastructure.

**Real-Time ML Challenges**

Real-time ML—particularly the streaming feature computation and low-latency serving required for Uber's use cases—remains quite challenging to implement correctly and operate reliably. The team invested heavily in making these systems "run themselves" so that data scientists can own the end-to-end workflow without becoming distributed systems experts. The streaming path with Flink, the double-write pattern for online-offline parity, and the nested container approach for Python serving all represent careful architectural choices to abstract away operational complexity.

**Monitoring: From Batch to Real-Time**

The initial monitoring approach joined predictions to outcomes via hourly batch jobs, providing accurate accuracy metrics but with significant delay. While sufficient for many use cases, some scenarios (fraud detection with 90-day label delays, or urgent anomaly detection needs) require faster feedback. The newer approach monitors feature and prediction distributions in near real-time to detect data pipeline breakages or model drift before waiting for outcome labels. This layered monitoring strategy—combining precise delayed metrics with fast approximate anomaly detection—better serves the diversity of use cases.

**Auto-ML and Hyperparameter Optimization**

AutoTune demonstrates the value of automating tedious parts of the ML workflow that don't require human intelligence. Hyperparameter tuning for tree models typically involves searching a high-dimensional space of configuration options (number of trees, tree depth, learning rate, and many others). Rather than forcing data scientists to run hundreds of manual experiments via grid search or random search, AutoTune applies Bayesian optimization techniques to learn the shape of the hyperparameter space and converge on strong configurations in far fewer iterations. This directly accelerates time-to-deployment while freeing data scientists to focus on feature engineering and problem formulation where human expertise adds unique value.

**Organizational Aspects**

Beyond technology, Uber has invested significantly in organizational structure and processes to make ML work at scale across hundreds of practitioners. The devops philosophy—having engineers own code from development through production—translates directly to ML: empowering data scientists to own the complete workflow from prototyping through production monitoring creates faster iteration cycles and better operational outcomes. The platform's architecture directly supports this ownership model by providing automated deployment, serving infrastructure, and monitoring without requiring data scientists to become infrastructure specialists.

**Open Source Contributions**

While the platform leverages substantial open source infrastructure (Spark, Kafka, Flink, Hadoop, TensorFlow, PyTorch), Uber has found that making these technologies work reliably at scale requires significant additional engineering investment. "Nothing's free" captures the reality that adopting open source doesn't eliminate complexity—it shifts it to integration, tuning, and operational challenges. Uber has contributed back to the community, most notably with Horovod, which has gained wide adoption for its combination of performance improvements and API simplicity.

**Developer Velocity as Strategic Imperative**

The shift from V1 (enable ML at scale) to V2 (accelerate ML innovation) reflects a maturing understanding of how ML creates competitive advantage. Once the foundational infrastructure exists, velocity becomes the key differentiator. Faster iteration cycles compound over time—teams that can experiment with more model variants, deploy updates more frequently, and respond more quickly to production issues will accumulate advantages that are difficult for competitors to overcome. The V2 investments in PyML, Horovod, AutoTune, Manifold visualizations, and real-time monitoring all directly target this velocity goal.
