---
title: "Lyft’s Reinforcement Learning Platform"
slug: "lyft-lyftlearn-feature-store-lyfts-reinforcement-learning-platform"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "pipeline-orchestration"
  - "databricks"
  - "spark"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "monitoring"
  - "retraining"
  - "serving"
  - "training"
industryTags: "automotive"
company: "Lyft"
companySlug: "lyft"
platformName: "LyftLearn + Feature Store"
contentType: "blog"
summary: "Lyft built a comprehensive Reinforcement Learning platform focused on Contextual Bandits to address decision-making problems where supervised learning and optimization models struggled, particularly for applications without clear ground truth like dynamic pricing and recommendations. The platform extends Lyft's existing LyftLearn machine learning infrastructure to support RL model development, training, and serving, leveraging Vowpal Wabbit for modeling and building custom tooling for Off-Policy Evaluation using the Coba framework. The system enables continuous online learning with batch updates ranging from 10 minutes to 24 hours, allowing models to adapt to non-stationary distributions, with initial validation showing near-optimal performance of 83% click-through rate accounting for exploration overhead."
link: "https://eng.lyft.com/lyfts-reinforcement-learning-platform-670f77ff46ec"
year: 2024
seo:
  title: "Lyft: Lyft’s Reinforcement Learning Platform - ZenML MLOps Database"
  description: "Lyft built a comprehensive Reinforcement Learning platform focused on Contextual Bandits to address decision-making problems where supervised learning and optimization models struggled, particularly for applications without clear ground truth like dynamic pricing and recommendations. The platform extends Lyft's existing LyftLearn machine learning infrastructure to support RL model development, training, and serving, leveraging Vowpal Wabbit for modeling and building custom tooling for Off-Policy Evaluation using the Coba framework. The system enables continuous online learning with batch updates ranging from 10 minutes to 24 hours, allowing models to adapt to non-stationary distributions, with initial validation showing near-optimal performance of 83% click-through rate accounting for exploration overhead."
  canonical: "https://www.zenml.io/mlops-database/lyft-lyftlearn-feature-store-lyfts-reinforcement-learning-platform"
  ogTitle: "Lyft: Lyft’s Reinforcement Learning Platform - ZenML MLOps Database"
  ogDescription: "Lyft built a comprehensive Reinforcement Learning platform focused on Contextual Bandits to address decision-making problems where supervised learning and optimization models struggled, particularly for applications without clear ground truth like dynamic pricing and recommendations. The platform extends Lyft's existing LyftLearn machine learning infrastructure to support RL model development, training, and serving, leveraging Vowpal Wabbit for modeling and building custom tooling for Off-Policy Evaluation using the Coba framework. The system enables continuous online learning with batch updates ranging from 10 minutes to 24 hours, allowing models to adapt to non-stationary distributions, with initial validation showing near-optimal performance of 83% click-through rate accounting for exploration overhead."
mlops:
  source: "sqlite"
  entryId: 166
  sourceUrl: "https://eng.lyft.com/lyfts-reinforcement-learning-platform-670f77ff46ec"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.615914"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Lyft faced decision-making challenges that traditional supervised learning and optimization approaches couldn't adequately solve. These problems shared several characteristics that made them particularly difficult: the absence of fully labeled ground truth data, the need for efficient exploration of different options, and complexity that couldn't be captured through mathematical optimization alone. Applications like dynamic pricing, recommendations, A/B testing optimization, and messaging personalization required systems that could learn from partial feedback while optimizing toward high-level business metrics like conversion rates or revenue.

Traditional supervised learning models only make predictions that require additional processing for decision-making, such as threshold logic or business rule alignment. This separation created challenges in directly optimizing for business objectives and adapting to changing environments. The team needed a solution that could handle non-stationary distributions like shifting customer preferences, dynamic competitive landscapes, and major disruptions like pandemics. Additionally, many business applications lacked sufficient labeled training data, making supervised approaches impractical.

The core motivation was to build a platform that could support Reinforcement Learning at scale across Lyft's product portfolio, with particular focus on Contextual Bandits as the sweet spot between expressiveness and complexity for typical internet industry applications. The platform needed to integrate with existing ML infrastructure to leverage proven components while adding RL-specific capabilities for exploration, online learning, and model evaluation without ground truth.

## Architecture & Design

Lyft's RL platform architecture extends the existing LyftLearn supervised learning infrastructure with RL-specific components. The system has two primary entry points for model deployment: an Experimentation Interface for launching untrained bandit models that learn only in production through observation feedback (typically used for efficient A/B testing), and a Model Development pathway for sophisticated models developed in source-controlled repositories with potential offline pre-training.

The platform's core workflow begins with model registration in a centralized Model Database. Models are then loaded into LyftLearn Serving instances using existing model syncing capabilities, enabling zero-downtime hot-swapping of model versions. The serving layer handles scoring requests over the network, with modifications to support RL-specific requirements including providing the action space for every scoring request, logging action propensities for training, and capturing business event data for reward calculation.

The Policy Update component orchestrates the continuous learning cycle. It pulls model scoring events and corresponding client application responses from the Data Warehouse, joins these datasets, and applies customer-provided reward functions. This processed data drives incremental model updates through a Model CI/CD workflow that schedules training jobs and handles model promotion. The retrained models are written back to S3 and promoted in the Model Database, triggering automatic deployment to serving instances.

Data flows through the system in a continuous loop: context features flow from applications to the serving layer, which returns action recommendations along with logged propensities. Application events containing reward signals are captured separately and later joined with scoring events using session IDs as UUIDs. This joined dataset becomes the training data for the next update cycle, with frequency ranging from every 10 minutes to 24 hours depending on the application.

The architecture deliberately separates reward calculation from immediate application feedback. Rather than having applications directly emit reward values, the system logs the raw metrics needed to calculate rewards (like article selections or booking completions). This design allows teams to iterate on reward function definitions and evaluate different formulations without requiring application changes.

## Technical Implementation

The platform's technology stack centers on Vowpal Wabbit (VW) as the primary Contextual Bandit library, chosen for its maturity after a decade of development and maintenance by Microsoft Research. VW provides battle-tested features including multiple exploration algorithms (like epsilon-greedy), various policy evaluation methods, and advanced capabilities like conditional bandits. Despite its text-based interface quirks, VW's research pedigree and comprehensive feature set made it the strongest choice, validated by the Contextual Bandit Bake-off comparative study.

Lyft built an internal RL library with three architectural layers to integrate VW and other RL algorithms with their ML ecosystem. The Core layer adapts RL-specific components to existing supervised learning interfaces through an RL base model class that extends the generic model class and overrides model loading, training, and testing to follow RL patterns. This layer includes data models for events and responses, utilities for extracting logged event data, transforming training data, and processing rewards.

The Library layer implements the abstract core base classes for specific applications, including VW integration and custom Multi-Armed Bandit algorithms. For VW specifically, this handles the library's serialization schemes, metric emission, feature weight tracking, and translation between Python feature dictionaries and VW's text format. The Evaluation layer provides Shapley Values-based feature importance analysis for context feature selection and customizations for the Coba Off-Policy Evaluation framework.

The serving infrastructure uses the same scoring API endpoints as traditional models but extends request bodies with RL-specific arguments. Model handlers process input data before passing to model artifacts, performing necessary feature transformations for VW models and translating outputs into expected formats. This design allows RL models to coexist with supervised models on the same infrastructure without requiring separate serving stacks.

Training follows two phases: warm-starting before launch and continuous updates during model lifetime. Warm-starting trains models offline on log data from existing policies (which don't need to be bandits—they can be heuristics). If logged actions include propensities, learning is more effective, but the system works without them as long as rewards can be associated with actions. This approach avoids costly exploration phases and kickstarts performance while allowing continued adaptation.

Continuous updates leverage the same Model CI/CD pipeline used for supervised learning automatic retraining. Update queries join all model scoring events since the last cycle with relevant reward data. Scoring events include context features, selected action, action probabilities, and UUIDs. For delayed rewards, joining logic becomes more sophisticated. The system extracts training fields into dataframes, performs data cleaning and normalization, then updates models. Training cycles emit VW's internal loss metrics and feature weight changes for monitoring convergence.

## Scale & Performance

The platform's validation used a news recommendation demo inspired by VW use cases. The model recommended among four article categories (politics, sports, music, food) based on two categorical context features (user and time of day) with two values each. Using epsilon-greedy exploration with 20% exploration rate, the model handled network-based requests simulating realistic production deployment with incremental retraining every 10 minutes.

Performance metrics demonstrated the system's adaptation capabilities. In a seven-action variant, click-through rate started at approximately 14% (1/7) during even exploration. After the first training cycle and model sync, performance climbed to nearly 83% CTR—close to the theoretical optimum when accounting for 20% exploration spent on six suboptimal variants. This represents roughly 5.9x improvement over random selection.

The demo included aggressive distribution shifts every 30 minutes to stress-test adaptation. When shifts occurred, performance dropped immediately but recovered within the next 10-minute update cycle. This pattern validated the platform's ability to track non-stationary distributions, though the test represented more extreme shifts than typical business applications would encounter.

The platform supports batch update frequencies from 10 minutes to 24 hours depending on application requirements. More frequent updates enable faster adaptation to changing environments but increase computational overhead. The 10-minute cycle in the demo represents the aggressive end of this spectrum, suitable for high-velocity applications requiring rapid response to shifts.

Model serving uses the existing LyftLearn infrastructure's zero-downtime hot-swap capability, allowing new model versions to replace old ones without service interruption. The stateless design enables distributed serving for horizontal scalability, though specific request volumes and latency numbers aren't disclosed in the case study.

## Trade-offs & Lessons

The team discovered that supporting RL models on an extensible ML platform proved straightforward, but achieving good model performance required substantial effort. The evaluation challenge emerged as the steepest learning curve—without labeled ground truth data and with immature tooling compared to supervised learning, teams needed extensive trial and error to build intuition about what works.

A critical lesson was starting with known distributions. The team strongly recommends working first with classification datasets or simulations where reward distributions are controllable. Both approaches are supported in Coba, the open-source Contextual Bandit benchmark framework that became instrumental for model development. Coba provides data sourcing (from bandit logs, classification datasets, or simulations), multiple learner implementations including VW adapters, experiment configurations for different data processing approaches, and Off-Policy Evaluation reward estimators like Inverse Propensity Score (IPS), Direct Method (DM), and Doubly Robust (DR).

When transitioning to real-world applications, reward normalization emerged as essential, along with careful hyperparameter evaluation including learning rate and interaction terms. The team learned not to rely solely on total accumulated reward for candidate model evaluation, as this metric proves sensitive to estimator errors. Context-specific convergence metrics provide additional insights, and overlaying candidate model arm selection frequencies with average arm rewards in log data helps assess environmental adaptation.

The evaluation methodology comparison revealed important trade-offs. Off-policy evaluation trains models directly on logged data using internal estimators to reduce problems to supervised learning form, while on-policy evaluation trains on the model's own scores with reward imputation for untaken actions. On-policy generally works less well for offline learning but provides useful cross-checks, especially with skewed action distributions or when testing exploration algorithms. Rejection sampling evaluates exploration algorithms by filtering samples the candidate model would unlikely have taken, but may reject up to 95% of samples when policies differ significantly.

Running multiple evaluation passes over slightly shuffled data versions (jiggling row order without scrambling long-term patterns) helps establish confidence intervals, a practice the team adopted for more robust validation. This addresses the inherent uncertainty in estimator-based evaluation.

The team acknowledges significant downsides to RL approaches. Most Contextual Bandit libraries use simplistic linear models lacking the expressiveness of tree-based or neural network models. Solving problems without fully labeled ground truth inherently requires more data and makes performance assessment more challenging. The scarcity of mature libraries and best practice guidance necessitates substantial exploration.

Looking forward, Lyft plans to leverage the platform investments across more product use-cases. Current investigations include non-linear Contextual Bandits for improved performance, better evaluation techniques for non-stationary problems, and full-RL solutions for more complex sequential decision-making challenges beyond the Contextual Bandit sweet spot. The platform's extensibility and integration with existing infrastructure position it well for this expansion.

The team's explicit decision to log raw metrics rather than computed rewards proved particularly valuable, enabling reward function iteration without application changes. This architectural choice reflects mature thinking about the experimental nature of RL development and the need for flexibility as understanding evolves. Similarly, the choice to extend existing infrastructure rather than building parallel systems reduced operational overhead and accelerated adoption by leveraging familiar workflows and tooling.
