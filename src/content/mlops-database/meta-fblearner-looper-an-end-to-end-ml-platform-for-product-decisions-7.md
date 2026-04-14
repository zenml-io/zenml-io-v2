---
title: "Looper: An End-to-End ML Platform for Product Decisions"
slug: "meta-fblearner-looper-an-end-to-end-ml-platform-for-product-decisions-7"
draft: false
mlopsTags:
  - "data-versioning"
  - "experiment-tracking"
  - "feature-store"
  - "labeling"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "workflow-automation"
  - "mlflow"
  - "ab-testing"
  - "data-ingestion"
  - "deployment"
  - "feature-engineering"
  - "hyperparameter-tuning"
  - "model-evaluation"
  - "model-validation"
  - "retraining"
  - "serving"
  - "shadow-deployment"
  - "training"
industryTags: "media-entertainment"
company: "Meta"
companySlug: "meta"
platformName: "FBLearner"
contentType: "video"
summary: "Looper is an end-to-end ML platform developed at Meta that hosts hundreds of ML models producing 4-6 million AI outputs per second across 90+ product teams. The platform addresses the challenge of enabling product engineers without ML expertise to deploy machine learning capabilities through a concept called \"smart strategies\" that separates ML code from application code. By providing comprehensive automation from data collection through model training, deployment, and A/B testing for product impact evaluation, Looper allows non-ML engineers to successfully deploy models within 1-2 months with minimal technical debt. The platform emphasizes tabular/metadata use cases, automates model selection between GBDTs and neural networks, implements online-first data collection to prevent leakage, and optimizes resource usage including feature extraction bottlenecks. Product teams report 20-40% of their metric improvements come from Looper deployments."
link: "https://www.youtube.com/watch?v=UAZHJK9VWPY"
year: 2022
seo:
  title: "Meta: Looper: An End-to-End ML Platform for Product Decisions - ZenML MLOps Database"
  description: "Looper is an end-to-end ML platform developed at Meta that hosts hundreds of ML models producing 4-6 million AI outputs per second across 90+ product teams. The platform addresses the challenge of enabling product engineers without ML expertise to deploy machine learning capabilities through a concept called \"smart strategies\" that separates ML code from application code. By providing comprehensive automation from data collection through model training, deployment, and A/B testing for product impact evaluation, Looper allows non-ML engineers to successfully deploy models within 1-2 months with minimal technical debt. The platform emphasizes tabular/metadata use cases, automates model selection between GBDTs and neural networks, implements online-first data collection to prevent leakage, and optimizes resource usage including feature extraction bottlenecks. Product teams report 20-40% of their metric improvements come from Looper deployments."
  canonical: "https://www.zenml.io/mlops-database/meta-fblearner-looper-an-end-to-end-ml-platform-for-product-decisions-7"
  ogTitle: "Meta: Looper: An End-to-End ML Platform for Product Decisions - ZenML MLOps Database"
  ogDescription: "Looper is an end-to-end ML platform developed at Meta that hosts hundreds of ML models producing 4-6 million AI outputs per second across 90+ product teams. The platform addresses the challenge of enabling product engineers without ML expertise to deploy machine learning capabilities through a concept called \"smart strategies\" that separates ML code from application code. By providing comprehensive automation from data collection through model training, deployment, and A/B testing for product impact evaluation, Looper allows non-ML engineers to successfully deploy models within 1-2 months with minimal technical debt. The platform emphasizes tabular/metadata use cases, automates model selection between GBDTs and neural networks, implements online-first data collection to prevent leakage, and optimizes resource usage including feature extraction bottlenecks. Product teams report 20-40% of their metric improvements come from Looper deployments."
mlops:
  source: "sqlite"
  entryId: 7
  sourceUrl: "https://www.youtube.com/watch?v=UAZHJK9VWPY"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.060398"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Meta faces a fundamental challenge in scaling machine learning capabilities across diverse product surfaces: most product engineering teams lack dedicated ML expertise, yet they need to make data-driven product decisions in domains where closed-form heuristics are suboptimal. The platform addresses several critical pain points that motivated its development:

**Product Objective Misalignment**: Product objectives, especially delayed or long-term metrics like monthly active users, rarely match closed-form loss functions used in machine learning. Teams struggle to bridge the gap between ML metrics and actual product impact, requiring proxy tasks and careful evaluation through causal experiments.

**Data Drift and Non-Stationarity**: Product-generated data continuously drifts from training distributions, often changing daily or weekly. This contrasts sharply with the "Kaggle paradigm" of fixed datasets and creates ongoing maintenance burdens for teams trying to keep models fresh and relevant.

**Correlation vs Causation Gap**: ML models capturing correlations in data don't guarantee product metric improvements when deployed. Network effects, feedback loops, and complex system interactions mean that well-performing models by loss function metrics can fail to move product objectives.

**Resource Bottlenecks**: Real-time feature extraction emerged as a surprising bottleneck, consuming more resources than training and inference combined in many cases. Feature engineering, data joins, network access, and database queries create substantial overhead that individual teams struggle to optimize.

**Accessibility Barriers**: Only 15% of product teams using Looper include ML engineers. Manual hyperparameter optimization, managing large search spaces, trading off multiple objectives, and updating complex heuristics as team members change creates insurmountable barriers for most product teams.

**Technical Debt Accumulation**: Teams attempting heroic one-off ML integrations often launch models that work initially but require extensive ongoing maintenance, with manual data operations, parameter tuning, and deployment management creating unsustainable technical debt.

The platform emerged organically from engineers supporting the PyLearner training system observing repeated patterns: product engineers would approach with promising ML ideas but lack the complete skillset spanning logging setup, table management, model training, evaluation, hosting, and production deployment. The gap between conception and delivery was simply too large for individual engineers or small teams.

## Architecture and Design

Looper implements a vertical, end-to-end platform architecture organized around the concept of "smart strategies" - a design pattern that embeds AI capabilities into software systems while maintaining clean separation between ML code and application code. The architecture emphasizes software-centric ML integration rather than traditional file-based approaches.

**Smart Strategy Abstraction**: Each smart strategy produces outputs, decisions, or predictions based on well-defined data sources and label sources, using a hosted ML model and decision policy. The decision shape can range from binary classifications to content rankings to entire video codec configurations. For reinforcement learning applications, the decision shape corresponds to the action space. Smart strategies are deployed in production environments interacting with many users, learning from feedback in closed-loop fashion.

**API Design and Decision Point Interception**: The platform exposes a compact RPC API with just two primary calls that intercept decision points in application code: `get_decision` and `observe`. The `get_decision` call logs inputs taken from feature stores and attempts to produce outputs using available ML models. If no model exists yet, it returns a default prediction while logging inputs for future training. The `observe` RPC collects feedback such as user selections or engagement signals, enabling loss function evaluation. This design keeps application code clean and delegates all data quality and management concerns to the platform.

**Online-First Data Collection**: Rather than working with pre-existing datasets, Looper implements an online-first approach where features are logged in real-time during inference, labels are observed later, and joins happen in real-time within the platform. The platform maintains full chain of custody of data throughout this process. This approach prevents data leakage, train-serve skew, and other data hygiene issues that plague traditional offline ML workflows. The platform determines what data to collect and manages all tables automatically.

**Strategy Blueprint Versioning System**: The strategy blueprint serves as the central configuration artifact ensuring ML configuration remains separate from code while supporting full versioning. Blueprints capture feature inputs, feature transformations, labels, model configuration, decision policy parameters, and data compatibility information. When any component updates, version numbers increment automatically. This enables reproducibility, A/B test bookkeeping, and vertical optimization experiments where multiple configurations can be compared systematically. The blueprint tracks which training tables to use, hyperparameter values, and all other deployment details.

**Automated Training and Canary Deployment Pipeline**: When sufficient labeled data accumulates, the platform automatically trains ML models. Newly trained models are published as "canary" or "shadow" models that evaluate on live traffic without affecting product behavior. The platform profiles canary performance against production models using live data. If the canary demonstrates improvement, it gets promoted through the configuration system. This automated pipeline enables recurring training schedules with fresh models reflecting current data trends - a critical capability given rapid data drift.

**Model Selection and Multi-Model Support**: The platform implements automatic model selection across multiple model families including gradient boosted decision trees (particularly XGBoost), deep neural networks (both dense and sparse), and linear models. While the platform supports various architectures, XGBoost and other GBDT implementations dominate usage because they train quickly, serve efficiently, and consistently perform well on the tabular/metadata use cases the platform targets. The platform automatically selects which model type fits a given application based on data characteristics, though users can override these choices.

**Integrated Experimentation Framework**: Looper extends the traditional notion of end-to-end ML platforms by integrating deeply with Meta's experimentation infrastructure for A/B testing and causal impact evaluation. The platform plugs into existing A/B testing APIs, automatically collecting supervision signals in the form of test results. This enables product impact evaluation with multiple objective optimization, trading off metrics without pushing any single objective too far. The platform handles bookkeeping for experiments comparing smart strategy performance against baselines.

**Personalization and Heterogeneous Treatment Effects**: The experimentation system includes specialized support for detecting heterogeneous treatment effects - identifying which subjects in A/B tests are likely to benefit from particular treatments. This represents a form of automated personalization where the platform builds models predicting treatment benefit using available features and A/B test outcomes. The decision API for personalized experiments closely resembles standard A/B testing APIs, simplifying adoption while enabling sophisticated personalization.

**Resource Optimization Infrastructure**: The end-to-end visibility enables comprehensive resource accounting across data joins, feature extraction, model training, inference, and causal experiments. The platform profiles resource consumption systematically, identifying bottlenecks that might fall through the cracks in horizontal toolbox-style platforms. This led to targeted optimizations for feature extraction, which analysis revealed dominated resource consumption in many deployments, consuming more than training and inference combined.

## Technical Implementation

The platform targets use cases involving tabular data and metadata rather than images, audio, or complex NLP tasks. This focus shapes many technical decisions and optimizations throughout the stack.

**Data and Feature Management**: Looper works primarily with mixes of categorical, sparse, and dense features that lack the spatial correlation structure of images. Features come from diverse sources requiring joins across multiple tables. The platform implements automated feature selection to manage large feature spaces efficiently, identifying which features actually contribute to model performance. Feature engineering can be extremely expensive - some engineered features cost far more to compute than raw data access. The platform balances feature utility against extraction costs.

**Model Training Infrastructure**: Training happens on standard CPU servers rather than specialized hardware for most use cases. Since GBDT models dominate and train efficiently on CPUs, GPU access often isn't necessary. When GPUs are available, wait times for GPU allocation sometimes exceed CPU training time, making CPU training more practical. The platform supports recurring training schedules with automated retraining as new labeled data arrives, keeping models fresh despite rapid data drift.

**Inference and Serving**: The platform serves 4-6 million predictions or decisions per second across all hosted models. Inference for GBDT models incurs latency measured in single-digit milliseconds, while deep neural networks can add several additional milliseconds. The predictor infrastructure hosts canary models alongside production models, enabling shadow evaluation on live traffic. Profiling revealed feature extraction as the dominant latency contributor rather than model inference itself, motivating optimization focus on data access patterns, database queries, and network operations.

**Monitoring and Alerting**: The platform implements comprehensive monitoring covering ML performance metrics, label distribution changes, feature distribution drift, and data availability. Automated alerts notify users when distributions shift significantly or data sources become unavailable. This proactive monitoring catches problems early enough for teams to respond before production impact. The platform tracks model freshness and data recency as key operational metrics.

**Integration with Meta Infrastructure**: Looper leverages Meta's existing metric store and data infrastructure extensively. Access to company-wide metrics that wouldn't be available to external platforms enables sophisticated product impact evaluation. The platform integrates with internal experimentation systems, configuration management, and logging infrastructure. This deep integration enables the software-centric approach where platform clients don't manage files or tables directly.

**Application Categories and Use Cases**: The platform hosts 400-1000 models at any given time across 90+ product teams. Applications span personalized experiences, various types of content ranking (though not newsfeed ranking, which uses specialized infrastructure), data prefetching and precomputation, user notifications and prompts, and value estimation tasks predicting quantities like latency or memory usage. The GraphQL team achieved 2% compute savings at peak server load using Looper to decide which prefetch requests to service, representing significant impact on a highly-tuned system.

**Prefetching and Precomputation Use Cases**: Two detailed examples illustrate platform capabilities. Meta's GraphQL implementation uses Looper to decide which prefetch requests to honor and which to skip, balancing latency improvements against bandwidth consumption and server resources. This saved 2% compute at peak load in an already heavily optimized system. A second example involves predictive screen rendering for Facebook's mobile app on resource-constrained devices, where the platform models user behavior through embeddings based on activity history to predict what to prefetch and render. The platform provides "free" labels in these scenarios - within minutes of prefetching, the system knows whether prefetched data was actually used.

**Ranking Applications**: The platform includes specialized support for ranking use cases where the decision shape is a ranked list. This includes enhanced support for ranking objectives that account for positional bias - the tendency for users to select top-ranked items regardless of quality. The API provides richer interfaces for collecting ranking feedback and evaluating ranking quality metrics.

## Scale and Performance

The platform operates at substantial scale across Meta's products with concrete performance metrics demonstrating production impact:

**Deployment Scale**: Looper hosts between 400 and 1000 ML models simultaneously, serving 90+ product teams (updated from 70+ mentioned earlier in the talk). The platform produces 4 to 6 million AI outputs per second spanning predictions, decisions, rankings, and other inference types. This scale spans diverse applications from interface personalization to notification frequency control to content ranking.

**Adoption Timeline**: Product teams typically follow a consistent timeline from initial exploration to production deployment. Initial model configuration takes approximately two days. Training a model on product feedback and iterating once requires about two weeks or less. Online product experiments through A/B testing typically run for up to four weeks. Full product launch happens within one to two months after initial data collection begins. This rapid timeline reflects the platform's emphasis on ease of use and automation.

**Product Impact**: Product teams commonly report that 20-40% of their total metric improvements during calendar periods come from Looper deployments. In some cases, teams outperform their stated goals by 2x specifically due to smart strategies deployed on the platform. These represent significant contributions to product quality and business metrics.

**Resource Consumption Profile**: Detailed profiling revealed surprising resource distribution. Feature extraction clearly dominates resource consumption in many applications, exceeding both training and inference costs. For GBDT models, which are lightweight and fast, feature extraction includes data joins, database access, network operations, and feature engineering computations. Some engineered features cost substantially more than raw data access. This insight motivated targeted optimization efforts including feature selection and extraction pipeline optimization.

**Inference Latency**: GBDT models typically serve predictions with latency in single-digit milliseconds. Deep neural networks add several additional milliseconds to inference time. However, overall system latency is dominated by feature extraction rather than model inference itself, shifting optimization focus toward data access patterns and preprocessing rather than model architecture.

**Training Efficiency**: The platform prioritizes training speed and iteration velocity over squeezing maximum performance from individual models. Since GBDT models train efficiently on standard CPU hardware, teams can iterate rapidly. Automated model selection, hyperparameter tuning, and recurring training schedules mean models stay fresh despite data drift, often maintaining better performance than heavily-tuned static models.

**Resource Savings from Optimization**: The GraphQL prefetching use case achieved 2% compute savings at peak server load in a system already subjected to extensive manual optimization. This demonstrates the platform's ability to deliver measurable efficiency improvements even in mature, performance-critical systems. Across all applications, the platform's resource optimization efforts - particularly around feature extraction - deliver economies of scale by amortizing optimization work across many use cases rather than requiring each team to optimize independently.

## Trade-offs and Lessons

The Looper platform embodies numerous design trade-offs and offers valuable lessons for practitioners building ML platforms:

**Vertical Integration vs Flexibility**: By choosing a vertical, end-to-end architecture over a horizontal toolbox approach, Looper gains comprehensive visibility and optimization opportunities but constrains flexibility. Teams cannot easily customize individual components or bring their own tools. The trade-off favors ease of use, automation, and low technical debt over maximum expressiveness. For Meta's use cases with 85% of teams lacking ML expertise, this proves highly successful.

**Online-First Data Collection Trade-offs**: The online-first approach prevents data leakage and train-serve skew by maintaining full chain of custody, but complicates data cleaning and exploratory analysis. Teams cannot easily examine or manipulate training data offline. The platform must automate data cleaning (a current project showing good results) rather than providing extensive manual data manipulation tools. For applications with rapidly changing data distributions, avoiding leakage and skew outweighs exploratory flexibility.

**Tabular Data Focus Limitations**: Restricting scope to tabular data and metadata rather than images, audio, or complex NLP enables specialized optimizations and simpler model selection but limits applicability. Use cases with fixed datasets, stable distributions, or rich structured data (like images) don't benefit as much from Looper's strengths around data drift handling, rapid iteration, and automated freshness. The platform philosophy acknowledges this scope limitation explicitly rather than claiming universal applicability.

**Automation vs Control**: Extensive automation through AutoML, automatic model selection, automated canary deployment, and recurring training reduces engineering burden dramatically but limits expert control. ML engineers surveyed report enjoying the automation even when they could manually perform the tasks, because it saves time for other work. The 15% of teams with ML expertise value automation for efficiency rather than capability enablement. However, teams with unusual requirements or domain-specific optimizations may find constraints frustrating.

**GBDT Dominance and Model Selection**: While the platform supports deep neural networks and other architectures, XGBoost and GBDT models dominate usage due to consistently strong performance on tabular data, fast training, and efficient inference. This empirical result - familiar to Kaggle contestants - contrasts with research literature heavily focused on deep learning for vision and NLP. The lesson: model architecture selection should be empirically driven by application characteristics rather than following research trends.

**Product Metrics vs ML Loss Functions**: The gap between ML loss functions and product objectives motivates the platform's integration with causal experimentation. Teams optimize proxy tasks during training but evaluate real product impact through A/B tests. This acknowledges that correlation captured by ML models doesn't guarantee causation or product improvement. The platform architecture explicitly bridges this gap rather than assuming model performance improvements translate to product wins.

**Feature Extraction as Primary Bottleneck**: The discovery that feature extraction dominates resource consumption surprised the team and contradicts common assumptions that model training or inference are primary costs. For lightweight GBDT models, data access, joins, and preprocessing far exceed computation. This lesson redirected optimization efforts toward feature selection, data pipeline efficiency, and extraction cost modeling. Practitioners should profile entire ML systems comprehensively rather than assuming computational costs dominate.

**Free Labels from System Design**: Several successful applications derive "free" labels from system behavior rather than requiring expensive manual annotation. Prefetching use cases know within minutes whether prefetched data was used. A/B tests generate treatment outcomes as labels automatically. This design pattern - identifying applications where supervision emerges from system operation - enables ML deployment in domains where labeling would otherwise be prohibitive. Future work aims to generalize this by supporting automated label stream selection.

**Low Technical Debt through Automation**: Teams consistently cite low maintenance burden and technical debt as major value drivers. Automated recurring training, canary deployment, database versioning, monitoring, and alerting mean models stay fresh and operational without constant manual intervention. This contrasts sharply with heroic one-off ML integrations that work initially but accumulate technical debt rapidly. The lesson: automation that handles mundane maintenance tasks is often more valuable than cutting-edge model architectures.

**Economies of Scale in Platform Design**: Optimizations that might be too expensive or boring for individual teams become worthwhile when amortized across hundreds of models and 90+ teams. Feature extraction optimization, automated feature selection, resource profiling, and data pipeline tuning all benefit from economy of scale. Vertical platforms enable these investments where horizontal toolboxes cannot justify them.

**Rapid Data Drift in Production**: The emphasis on non-stationary data distributions and automated retraining reflects production reality that differs from academic research settings. Data trends change daily or weekly in live products with evolving user behavior, seasonal patterns, and product changes. Models trained on fixed datasets rapidly become stale. The platform's value proposition centers on handling this drift automatically through fresh training schedules rather than treating it as an afterthought.

**Barriers to Entry Matter More Than Peak Performance**: Survey results indicate teams value ease of use, fast onboarding, and automation over achieving maximum possible model performance. Manual hyperparameter optimization in large search spaces ranks as a top pain point. The ability to deploy moderately complex models rapidly outweighs capability to deploy highly complex models slowly. This insight - emphasizing velocity and accessibility over peak performance - drove many platform design decisions.

**Future Directions and Open Challenges**: The team identifies several areas for future development. Moving beyond the "Kaggle paradigm" of fixed datasets toward fully automated iterative online experimentation remains partially complete. Feature engineering automation remains difficult despite progress on feature selection. Automated resource-quality trade-offs would help teams balance inference cost against model performance. Platform-level AutoML considering non-linear interactions between use cases represents a frontier - for example, detecting opportunities to merge similar models, recommending successful features to older models, or optimizing resource allocation across competing applications. These multi-scale AutoML opportunities emerge specifically from having many models on a unified platform rather than isolated deployments.
