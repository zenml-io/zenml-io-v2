---
title: "Building an MLOps Platform at HelloFresh"
slug: "hellofresh-hellofreshs-ml-platform-building-an-mlops-platform-at-hellofresh"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "mlflow"
  - "tecton"
  - "data-ingestion"
  - "deployment"
  - "feature-engineering"
  - "model-evaluation"
  - "model-validation"
  - "retraining"
  - "serving"
  - "training"
industryTags: "e-commerce"
company: "HelloFresh"
companySlug: "hellofresh"
platformName: "HelloFresh's ML platform"
contentType: "video"
summary: "HelloFresh built a comprehensive MLOps platform to address inconsistent tooling, scaling difficulties, reliability issues, and technical debt accumulated during their rapid growth from 2017 through the pandemic. The company developed a two-tiered approach with Spice Rack (a low-level API for ML engineers providing configurability through wrappers around multiple tools) and MLOps Factory (a high-level API for data scientists enabling automated pipeline creation in under 15 minutes). The platform standardizes MLOps across the organization, reducing pipeline creation time from four weeks to less than one day for engineers, while serving eight million active customers across 18 countries with hundreds of millions of meal deliveries annually."
link: "https://www.youtube.com/watch?v=W_tyjkHbqBk"
year: 2022
seo:
  title: "HelloFresh: Building an MLOps Platform at HelloFresh - ZenML MLOps Database"
  description: "HelloFresh built a comprehensive MLOps platform to address inconsistent tooling, scaling difficulties, reliability issues, and technical debt accumulated during their rapid growth from 2017 through the pandemic. The company developed a two-tiered approach with Spice Rack (a low-level API for ML engineers providing configurability through wrappers around multiple tools) and MLOps Factory (a high-level API for data scientists enabling automated pipeline creation in under 15 minutes). The platform standardizes MLOps across the organization, reducing pipeline creation time from four weeks to less than one day for engineers, while serving eight million active customers across 18 countries with hundreds of millions of meal deliveries annually."
  canonical: "https://www.zenml.io/mlops-database/hellofresh-hellofreshs-ml-platform-building-an-mlops-platform-at-hellofresh"
  ogTitle: "HelloFresh: Building an MLOps Platform at HelloFresh - ZenML MLOps Database"
  ogDescription: "HelloFresh built a comprehensive MLOps platform to address inconsistent tooling, scaling difficulties, reliability issues, and technical debt accumulated during their rapid growth from 2017 through the pandemic. The company developed a two-tiered approach with Spice Rack (a low-level API for ML engineers providing configurability through wrappers around multiple tools) and MLOps Factory (a high-level API for data scientists enabling automated pipeline creation in under 15 minutes). The platform standardizes MLOps across the organization, reducing pipeline creation time from four weeks to less than one day for engineers, while serving eight million active customers across 18 countries with hundreds of millions of meal deliveries annually."
mlops:
  source: "sqlite"
  entryId: 148
  sourceUrl: "https://www.youtube.com/watch?v=W_tyjkHbqBk"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.061913"
  lastUpdated: "2026-04-14 10:05:31"
---

## Problem Context

HelloFresh experienced explosive growth starting around 2017, with particularly dramatic expansion during the pandemic as consumers became interested in learning to cook at home. By 2022, the company was serving eight million active customers worldwide, delivering nearly 67 million meals, operating in 18 countries, and processing almost 600 million orders. This rapid scaling created significant MLOps challenges that became increasingly difficult to ignore.

The company's organizational structure followed the Spotify model with autonomous tribes and squads distributed across multiple alliances including growth, marketing, product, assortment, foundations, technology operations, and finance and analytics. Data science teams proliferated throughout these groups, broadly categorized into marketing-focused teams and supply chain/operations teams, split between North American and international operations. This autonomy, while enabling teams to move fast initially, created substantial friction as the organization matured.

The core problems facing HelloFresh's data science organization included inconsistent tooling across teams with no company-wide standards, scaling difficulties especially when deploying models across different geographies, reliability issues with data pipelines and ETL processes, and significant accumulated technical debt. Teams had limited communication with each other, sometimes had overlapping scope, and developed tooling independently. Critically, no teams had mature end-to-end MLOps pipelines. The organization found itself in what leadership described as "awkward teenage years" as a data science organization, with functional but immature capabilities that needed systematic improvement to become world-class.

Prior to building the platform, ML engineers needed approximately four weeks to build a pipeline that wasn't even fully end-to-end with all necessary MLOps components. This slow deployment cycle, combined with the lack of standardization and scalability, motivated the comprehensive platform initiative.

## Architecture and Design

HelloFresh designed a multi-layered platform architecture with distinct products addressing different user personas and their specific needs. The platform follows an 80/20 philosophy where 80% of models can be fully automated through high-level APIs, while the remaining 20% that require custom configurations can be easily created through low-level APIs.

The platform architecture consists of five fundamental layers. At the base sits the service layer with five major components: experiment manager (artifact management and tracking), feature store, orchestration engine, inference endpoints for serving, and monitoring and drift detection capabilities. An integration layer sits above this, enabling communication from platform products down to individual tools and their configuration.

Above the integration layer, two distinct products serve different personas. Spice Rack is a low-level API designed for ML engineers who prioritize configurability. It functions as a wrapper around multiple MLOps tools, allowing engineers to learn one unified API rather than mastering five to seven different services. Spice Rack accelerates development through templates for popular pipeline architectures that occur frequently across the organization. The platform aims to reduce pipeline creation time from four weeks down to less than one day.

MLOps Factory represents the high-level API designed for data scientists who want to move quickly without deep infrastructure knowledge. If a model meets certain input specifications, this API automatically generates a complete end-to-end MLOps pipeline in approximately 10 to 15 minutes. Users sacrifice configurability for speed, getting standardized pipelines with limited customization options.

The user experience resembles working with a Python library like scikit-learn. Users pip install the library, then typically download pre-populated templates from GitHub for common pipeline architectures at HelloFresh. They modify configuration details like data sources, model architecture, and evaluation metrics, then execute the pipeline build.

The pipeline workflow follows a standard pattern: create a model specification with six configuration steps, read data from the feature store, train and validate the model, decide on promotion based on performance against a golden dataset compared to the production model, deploy via either REST endpoint or batch scoring, and perform model monitoring to report performance and drift.

## Technical Implementation

HelloFresh conducted an extensive tool selection process before building the platform. They evaluated approximately 60 different MLOps vendors, categorizing them across different capabilities and eventually narrowing to 12-15 serious contenders. Rather than evaluating tools individually in isolation, they ran a hackathon-style evaluation testing how different tools integrated with each other, recognizing that integration quality often matters more than individual tool capabilities.

For the feature store selection, they took a particularly rigorous scientific approach. They ran agile sessions with multiple data science teams to identify needs, clustering questions into categories including technical requirements, security, cost, user experience, and short and long-term strategic considerations. They prioritized questions as low, medium, or high importance, creating weights for evaluation scoring. Three vendors underwent technical evaluation with quantitative scoring where possible and qualitative assessment for aspects like user experience. This process resulted in selecting Tecton as their feature store platform.

The platform testing involved building five different technology stacks with various tool combinations, mapping which parts of the MLOps pipeline each stack covered. They tested multiple pipeline implementations, iteratively identifying which tools worked well for different pipeline stages, then combining successful components and swapping services to find the optimal integration. After several rounds of experimentation, they converged on an MVP pipeline that balanced functionality, integration quality, and implementation speed.

The organization standardized on Python as the common denominator across all tools and APIs. The platform emphasizes open source tools over closed source, APIs over graphical interfaces, and lightweight APIs over heavily integrated tools to avoid vendor lock-in. The team deliberately chose a middle ground between a single end-to-end tool (creating lock-in risk) and ten different tools (creating excessive complexity).

Development followed a practical over perfect philosophy, acknowledging that the MLOps landscape evolves rapidly with new companies and better tools emerging constantly. The architecture specifically allows swapping underlying components without changing the API surface exposed to users, who should only notice performance improvements rather than API changes.

## Scale and Performance

HelloFresh operates at significant scale as the world's largest meal kit company, with seven out of ten meal kits globally being HelloFresh products. The company serves eight million active customers, delivered nearly 67 million meals in 2022, operates across 18 countries with plans to expand to 19, and processed almost 600 million orders. The tech organization consists of approximately 1,000 people.

Data science teams work with substantial data volumes including hundreds of millions of rows and many gigabytes to terabytes of data. They deal with multiple data sources including data lakes, data warehouses, streaming data, and product website/app data. Models predominantly use tabular data based on the team's analysis of existing models across the organization.

The platform's performance improvements are dramatic compared to the previous state. Pipeline creation time drops from four weeks for ML engineers using manual approaches to less than one day using Spice Rack templates. For data scientists using MLOps Factory, the target is approximately 10 to 15 minutes to spin up complete infrastructure for models meeting input specifications. This represents roughly a 20x improvement for engineers and a potential 100x+ improvement for data scientists following the automated path.

The company analyzed their model landscape across multiple dimensions including ML orchestration patterns, data structures, retraining cadence, inference cadence, deployment types (batch versus real-time), model architectures (predominantly boosted trees), target variables, and complexity levels. This comprehensive mapping informed decisions about which capabilities to prioritize in the platform.

## Trade-offs and Lessons

HelloFresh's platform development journey offers substantial lessons for organizations building MLOps infrastructure. The most emphasized principle throughout the presentation was avoiding the temptation to build a Swiss army knife that handles every possible hypothetical situation. Instead, they advocate building for specific use cases with representative teams within specific verticals, developing pipeline templates iteratively based on real needs rather than imagined requirements.

The multi-API approach with high and low-level interfaces represents a deliberate trade-off between ease of use and configurability. Rather than forcing a single interface that satisfies nobody completely, they acknowledged that ML engineers and data scientists have fundamentally different needs and priorities. This segmentation allows serving both audiences effectively while managing the inherent tension between flexibility and automation.

Tool selection required balancing scientific rigor against speed. Their thorough evaluation process for the feature store took many months and involved detailed scoring matrices, representative of high-stakes decisions for foundational platform components. However, recognizing they couldn't apply this level of rigor to every tooling decision, they developed faster hackathon-based evaluation methods testing multiple tools simultaneously with focus on integration quality. They explicitly time-boxed evaluation periods, acknowledging that perfect information is impossible and decisions must be made with bounded analysis.

The organization learned that understanding users comes before building solutions. They spent many months simply mapping who the data science teams were, what problems they worked on, what model architectures and data they used, what tooling they preferred, and their pain points. This discovery phase felt slow but prevented building the wrong platform. They created visualization frameworks including maturity heat maps showing model capabilities across ten MLOps categories, tool usage maps across teams, and model architecture breakdowns that informed prioritization decisions.

Launching incrementally proved crucial to gaining adoption. Rather than building all ten desired MLOps capabilities immediately, they launched with a subset that provided sufficient incremental value to make autonomous teams want to adopt the platform. The initial version excludes model optimization and drift detection, recognizing these as secondary priorities compared to core pipeline automation, deployment, and basic monitoring.

Communication and organizational dynamics represented ongoing challenges. Forcing platform adoption rarely succeeds; instead, platforms must solve real problems that excite users. They established an MLOps council with representatives from data science teams across the organization, creating a two-way communication channel for platform updates and roadmap input. The team conducted initial development in "stealth mode" with a small team to avoid getting bogged down by too many opinions during early stages, collecting input broadly first but making decisions quickly with a focused group.

The Spotify model's autonomous teams, while enabling fast initial movement, created the very problems the platform needed to solve. The organization recognized this tension explicitly, understanding that some centralization and standardization was necessary to scale effectively despite autonomous team structures. This represents a maturation pattern likely common to growing data science organizations.

Starting from a maturity assessment using Microsoft's MLOps framework, they positioned themselves at level one (DevOps but no MLOps) at the beginning of 2022, expecting to reach level four by the following summer as models migrated to the platform. This honest self-assessment created clarity about the gap between current and desired states.

Testing strategy prioritized getting the platform into users' hands over comprehensive automated testing initially. They incorporated some behavior-driven development testing but kept it light during beta, planning to expand testing coverage in future releases. This pragmatic approach balanced quality concerns against speed to value.

The most counterintuitive lesson may be the emphasis on templates over raw functionality. While the underlying infrastructure enables flexibility, the primary value delivery mechanism became pre-built templates for common pipeline architectures. This insight emerged from working closely with teams on specific use cases, building a library of templates representing frequent patterns. Templates transform infrastructure capabilities into immediately usable solutions, dramatically reducing the knowledge barrier for platform adoption.

Finally, vendor lock-in avoidance shaped architecture fundamentally. Given the MLOps landscape's rapid evolution with new companies emerging monthly and existing vendors over-promising integration capabilities, the team built abstraction layers allowing component replacement. They expect better tools will emerge and designed explicitly for this eventuality, ensuring the platform can evolve without forcing users to relearn interfaces or rewrite pipelines.
