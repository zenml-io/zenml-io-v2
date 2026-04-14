---
title: "An Introduction to AI at LinkedIn"
slug: "linkedin-pro-ml-an-introduction-to-ai-at-linkedin"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "feature-store"
  - "metadata-store"
  - "model-registry"
  - "model-serving"
  - "monitoring"
  - "pipeline-orchestration"
  - "azure-ml"
  - "spark"
  - "ab-testing"
  - "data-ingestion"
  - "data-prep"
  - "data-validation"
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
summary: "LinkedIn's Head of AI provides a comprehensive overview of how the company leverages artificial intelligence across its entire platform to connect members with economic opportunities. Facing challenges in scaling AI talent and infrastructure while managing hundreds of models in production, LinkedIn developed Pro-ML, a centralized ML automation platform that manages the complete lifecycle of features and models across all engineering teams. Combined with organizational innovations like the AI Academy and a centralized-but-embedded team structure, plus infrastructure built on Kafka, Samza, Spark, TensorFlow, and Microsoft Azure services, LinkedIn achieved significant business impact including a 30% increase in job applications from one personalization model, 40% year-over-year growth in overall applications, 45% improvement in recruiter InMail response rates, and 10-20% improvement in article recommendation click-through rates."
link: "https://engineering.linkedin.com/blog/2018/10/an-introduction-to-ai-at-linkedin"
year: 2018
seo:
  title: "LinkedIn: An Introduction to AI at LinkedIn - ZenML MLOps Database"
  description: "LinkedIn's Head of AI provides a comprehensive overview of how the company leverages artificial intelligence across its entire platform to connect members with economic opportunities. Facing challenges in scaling AI talent and infrastructure while managing hundreds of models in production, LinkedIn developed Pro-ML, a centralized ML automation platform that manages the complete lifecycle of features and models across all engineering teams. Combined with organizational innovations like the AI Academy and a centralized-but-embedded team structure, plus infrastructure built on Kafka, Samza, Spark, TensorFlow, and Microsoft Azure services, LinkedIn achieved significant business impact including a 30% increase in job applications from one personalization model, 40% year-over-year growth in overall applications, 45% improvement in recruiter InMail response rates, and 10-20% improvement in article recommendation click-through rates."
  canonical: "https://www.zenml.io/mlops-database/linkedin-pro-ml-an-introduction-to-ai-at-linkedin"
  ogTitle: "LinkedIn: An Introduction to AI at LinkedIn - ZenML MLOps Database"
  ogDescription: "LinkedIn's Head of AI provides a comprehensive overview of how the company leverages artificial intelligence across its entire platform to connect members with economic opportunities. Facing challenges in scaling AI talent and infrastructure while managing hundreds of models in production, LinkedIn developed Pro-ML, a centralized ML automation platform that manages the complete lifecycle of features and models across all engineering teams. Combined with organizational innovations like the AI Academy and a centralized-but-embedded team structure, plus infrastructure built on Kafka, Samza, Spark, TensorFlow, and Microsoft Azure services, LinkedIn achieved significant business impact including a 30% increase in job applications from one personalization model, 40% year-over-year growth in overall applications, 45% improvement in recruiter InMail response rates, and 10-20% improvement in article recommendation click-through rates."
mlops:
  source: "sqlite"
  entryId: 49
  sourceUrl: "https://engineering.linkedin.com/blog/2018/10/an-introduction-to-ai-at-linkedin"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T11:03:51.060835"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

LinkedIn faces a fundamental challenge at the intersection of scale and personalization: connecting every member of the professional workforce to economic opportunity requires efficiently sorting through massive amounts of data—job postings, potential connections, feed content, candidates for recruiters—and aligning recommendations with individual member interests. The company needed to apply AI pervasively across all products rather than in isolated applications, but faced two critical constraints common across the tech industry in 2018.

The first constraint was the worldwide AI talent shortage. LinkedIn needed to scale their team of AI engineers, statisticians, and data scientists to meet growing demand across product teams while maintaining quality and enabling knowledge sharing. The second constraint was infrastructure scalability—deploying sophisticated, compute-intensive models built by processing very large datasets required significant platform innovation. Additionally, LinkedIn already had a rich collection of data from many different sources, but needed systematic ways to standardize and leverage this data across hundreds of models serving different use cases.

A specific example illustrates the data standardization challenge: one company might have a job titled "senior software engineer" while another calls the same role "lead developer." Multiplied across millions of member profiles, this variation makes it extremely difficult to provide good search experiences for recruiters where all these varying job titles should appear in relevant results. Beyond talent acquisition, similar challenges existed across job recommendations, feed content personalization, candidate search, sales lead scoring, advertising targeting, content moderation, infrastructure routing, and notification optimization.

## Architecture & Design

LinkedIn's AI platform architecture centers on Pro-ML, described as an "AI automation" platform that provides centralized management of features and machine learning models for every engineering team at the company. Pro-ML serves as a single platform for the entire machine learning lifecycle: developing, training, deploying, and testing models. The platform manages hundreds of models in production and hundreds of thousands of features across LinkedIn's various products.

The feature engineering architecture addresses data standardization through a hybrid human-machine approach. Taxonomists create taxonomies of titles and skills, while machine learning models including LSTM networks and other neural network architectures suggest relationships between titles and infer additional skills beyond what members explicitly list. For instance, the system can infer that someone with "machine learning" skills also understands at least a subset of "AI." This knowledge representation forms part of the LinkedIn Knowledge Graph, which captures taxonomies and relationships that enable better search and recommendation experiences.

The overall AI system design follows a structured approach connecting product goals to machine learning optimization. Each system starts with a broad objective like "provide new job opportunities for our members that match their skills and interests." These objectives map to intermediate relevance metrics that serve as proxies for the product goal, since direct optimization of high-level business metrics is often infeasible. For job recommendations, relevance metrics include member applications to recommended jobs, confirmed hires, and clicks on job listings. Algorithms then optimize for these relevance metrics, with A/B testing validating which changes yield the best results in practice.

A critical architectural consideration is holistic optimization that balances utility on both sides of the customer-member experience. LinkedIn explicitly designs systems to avoid local optimization traps, such as increasing job recommendation engagement by overwhelming members with too many suggestions, particularly those not actively job hunting. This multi-sided optimization approach, detailed in research presented at KDD 2014, manifests across products from feed content to job recommendations to candidate search results for recruiters.

The data infrastructure architecture uses Kafka as the "central nervous system" with stream processing handled by Samza, LinkedIn's open source framework. This streaming foundation enables real-time data flows throughout the platform. Data processing leverages Spark with Scala extensively, while Pig and Hive handle data analytics workloads. The architecture also integrates Microsoft Azure AI services through a partnership, including the Microsoft Text Analytics API for dynamic content translation in the feed.

## Technical Implementation

LinkedIn employs three broad classes of deep learning architectures for natural language processing and computer vision tasks: LSTM networks for sequential data, convolutional neural networks (CNNs) for spatial patterns, and sequence-to-sequence models for transformation tasks. These deep learning methods automatically learn complex hierarchical structures present in data using neural networks with multiple layers. For certain supervised learning tasks, the platform also uses canonical multi-layered perceptrons.

For personalization at the member level, LinkedIn developed new classes of machine learning models based on generalized mixed effects models (GLMix). These models combine disparate data sources including member intent signals, profile data, and information about a member's network to deliver extensive personalization in recommendations and search results. The GLMix approach enables capturing both population-level patterns and individual member preferences within a unified framework.

The deep learning workflows extensively use TensorFlow, Google's open source framework, for model development and training. Data processing relies heavily on Spark with Scala as the primary language, providing distributed computing capabilities for large-scale data transformation. Pig and Hive complement Spark for analytics workloads. LinkedIn has contributed to the Hadoop ecosystem and released open source projects including Ambry for storage and custom projects to accelerate machine learning use cases on Spark.

The platform consumes a wide variety of open source software while also contributing back to the ecosystem. Kafka and Samza, both originally developed at LinkedIn, have become widely adopted across the industry. The streaming data systems enable real-time processing patterns critical for features like feed ranking and notification delivery. The integration with Microsoft Azure services provides access to pre-built AI capabilities like text analytics without requiring internal development.

Pro-ML implements centralized feature management, addressing the complexity of maintaining hundreds of thousands of features used across hundreds of models. This centralization enables feature reuse across teams, consistent feature computation, and simplified model development workflows. The platform handles the complete model lifecycle from initial development through training, deployment, and ongoing testing, dramatically reducing the time required to build and ship new AI-powered products.

## Organizational Scaling

LinkedIn adopted a centralized organizational model to scale AI talent effectively. AI engineers, statisticians, and data scientists embed with product teams for localized problem-solving while maintaining reporting relationships within a centralized AI organization. This matrix structure enables knowledge sharing and cross-collaboration on disparate projects while still applying product-specific optimizations.

The LinkedIn AI Academy program equips employees across functions with AI knowledge. Engineers take a five-week course consisting of one-day-per-week deep-dive classes followed by a one-month apprenticeship with the core AI team. This curriculum takes participants from understanding how to incorporate and maintain AI systems through actually shipping one for their team. Product managers and executives participate in a condensed single-day deep-dive session focused on domain knowledge needed to manage AI products.

## Scale & Performance

The platform manages hundreds of machine learning models in production across various products, with hundreds of thousands of features centrally managed through Pro-ML. This scale of model deployment requires sophisticated infrastructure to handle training, serving, and monitoring.

Specific business impact metrics demonstrate the platform's effectiveness. A single AI system improving personalization of "Jobs You May Be Interested In" (JYMBII) produced a 30% increase in job applications. More broadly, job applications overall grew more than 40% year-over-year based on various AI-driven optimizations to both the member and recruiter ecosystems. AI-driven improvements to recruiter products increased InMail response rates by 45% while simultaneously reducing notification volume sent to members. Article recommendations in the feed improved by 10-20% measured by click-through rate.

These metrics reflect the compound effect of systematic AI application across the platform. The 40% year-over-year growth in job applications results from optimizations throughout the job-seeking funnel: better job recommendations to members, improved candidate search for recruiters, more effective InMail targeting, and optimized notification delivery. The simultaneous improvement in InMail response rates and reduction in notification volume demonstrates successful multi-objective optimization that enhances both member experience and business outcomes.

## Trade-offs & Lessons

LinkedIn's experience reveals several key insights for practitioners building ML platforms at scale. The centralized organizational model with embedded engineers represents a deliberate trade-off between specialization and product focus. While embedding AI experts with product teams risks knowledge silos, maintaining centralized reporting enables cross-team collaboration and knowledge sharing. This hybrid approach attempts to capture benefits of both models.

The investment in Pro-ML as a centralized ML automation platform reflects a build-versus-buy decision to create custom infrastructure rather than relying entirely on third-party MLOps tools. This choice makes sense given LinkedIn's scale and specific requirements around feature management across hundreds of models, but requires significant engineering investment. The payoff comes in "massively accelerated" speed for building and deploying new products, though specific velocity metrics are not provided.

The hybrid human-machine approach to data standardization acknowledges that full automation is neither feasible nor desirable for certain tasks. Taxonomists creating structured knowledge representations complement machine learning models that suggest relationships and infer attributes. This division of labor leverages human judgment for definitional work while using ML for scale and pattern recognition.

The focus on holistic optimization rather than narrow metric improvement represents an important lesson learned, likely through experience with local optimization traps. The explicit discussion of potential failure modes—overwhelming members with recommendations, surfacing jobs with low acceptance probability—suggests LinkedIn encountered these issues in practice. The multi-sided optimization approach from KDD 2014 research addresses these challenges but adds complexity to model development and evaluation.

The extensive use of open source software combined with contributions back to the ecosystem demonstrates a pragmatic approach to technology choices. LinkedIn adopts proven tools like TensorFlow while developing custom infrastructure where necessary, as with Kafka and Samza. Contributing these internal tools to open source provides community benefit while potentially easing talent acquisition by making LinkedIn's technology stack more familiar to external candidates.

The AI Academy investment in employee education reflects recognition that AI talent shortage extends beyond hiring—existing employees need upskilling to effectively incorporate AI into products. The multi-week engineer program with apprenticeship component represents significant time investment but produces engineers capable of independently shipping AI systems. The condensed executive program addresses the need for AI literacy among decision-makers who may not implement models but need to understand capabilities and limitations.

The integration with Microsoft Azure AI services through partnership shows willingness to leverage external capabilities rather than building everything internally. Using the Text Analytics API for feed translation represents a strategic decision to consume commodity AI services, freeing internal resources for differentiated capabilities. This pragmatic approach to build-versus-buy at the feature level complements the platform-level decision to build Pro-ML.

The measurement approach linking AI systems to business outcomes through relevance metrics and A/B testing provides a rigorous framework for validating improvements. The discussion of metric selection pitfalls—optimizing narrow engagement metrics at the expense of experience—highlights the importance of thoughtful metric design. The reported business impacts across multiple product areas demonstrate systematic application of these principles at scale.
