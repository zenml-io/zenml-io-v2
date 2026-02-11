---
title: "AI-Powered Fraud Detection in E-commerce Using AWS Fraud Detector"
slug: "ai-powered-fraud-detection-in-e-commerce-using-aws-fraud-detector"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69259f729b70e8d7fe730559"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:28:51.569Z"
  createdOn: "2025-11-25T12:22:10.786Z"
llmopsTags:
  - "fraud-detection"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "human-in-the-loop"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "serverless"
  - "monitoring"
  - "databases"
  - "amazon-aws"
industryTags: "e-commerce"
company: "Awaze"
summary: "E-commerce companies face significant fraud challenges, with UK e-commerce fraud reaching £1 billion stolen in 2024 despite preventing £1.5 billion. The speaker describes implementing AWS Fraud Detector, a fully managed machine learning service, to detect various fraud types including promo abuse, credit card chargeback fraud, account hijacking, and triangulation fraud. The solution uses historical labeled data to build predictive models that score orders between 0-1000 based on fraud likelihood, requiring human review for GDPR compliance. The implementation covers evaluation strategies focusing on true positives and false positives, feature engineering including geolocation enrichment, deployment options via SageMaker or Lambda, and continuous improvement through model retraining at different frequencies depending on fraud trend velocity."
link: "https://www.youtube.com/watch?v=clG3P1yoSw0"
year: 2025
seo:
  title: "Awaze: AI-Powered Fraud Detection in E-commerce Using AWS Fraud Detector - ZenML LLMOps Database"
  description: "E-commerce companies face significant fraud challenges, with UK e-commerce fraud reaching £1 billion stolen in 2024 despite preventing £1.5 billion. The speaker describes implementing AWS Fraud Detector, a fully managed machine learning service, to detect various fraud types including promo abuse, credit card chargeback fraud, account hijacking, and triangulation fraud. The solution uses historical labeled data to build predictive models that score orders between 0-1000 based on fraud likelihood, requiring human review for GDPR compliance. The implementation covers evaluation strategies focusing on true positives and false positives, feature engineering including geolocation enrichment, deployment options via SageMaker or Lambda, and continuous improvement through model retraining at different frequencies depending on fraud trend velocity."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-fraud-detection-in-e-commerce-using-aws-fraud-detector"
  ogTitle: "Awaze: AI-Powered Fraud Detection in E-commerce Using AWS Fraud Detector - ZenML LLMOps Database"
  ogDescription: "E-commerce companies face significant fraud challenges, with UK e-commerce fraud reaching £1 billion stolen in 2024 despite preventing £1.5 billion. The speaker describes implementing AWS Fraud Detector, a fully managed machine learning service, to detect various fraud types including promo abuse, credit card chargeback fraud, account hijacking, and triangulation fraud. The solution uses historical labeled data to build predictive models that score orders between 0-1000 based on fraud likelihood, requiring human review for GDPR compliance. The implementation covers evaluation strategies focusing on true positives and false positives, feature engineering including geolocation enrichment, deployment options via SageMaker or Lambda, and continuous improvement through model retraining at different frequencies depending on fraud trend velocity."
---

## Overview

This case study presents a comprehensive examination of deploying and operationalizing machine learning for fraud detection in e-commerce environments, shared by Daisy Doyle, a data scientist with experience at Very Group and Awaze. While the presentation primarily discusses traditional machine learning rather than large language models specifically, it offers valuable insights into MLOps practices that parallel LLMOps challenges, particularly around model evaluation, deployment, human-in-the-loop workflows, and continuous improvement in production environments.

The context for this work is substantial: UK e-commerce fraud in 2024 experienced over three million events resulting in £1 billion stolen, with prevention efforts stopping just under £1.5 billion—representing only about 60% prevention rate. The speaker worked on fraud detection implementations across multiple companies and uses two fictional examples (EV Trading Cards and Snorlax Spar Breaks) to illustrate different operational patterns and requirements.

## Fraud Types and Business Context

The case study identifies four primary fraud types in e-commerce that the detection systems need to address:

**Promo abuse** involves fraudsters manipulating email addresses to repeatedly claim free offers and discounts. These manipulated addresses remain technically legitimate, making them difficult for standard user interfaces to detect. **Credit card chargeback fraud** occurs when customers receive goods or services but falsely claim they never received them, reporting the transaction as fraudulent—resulting in losses for both the merchant and the legitimate cardholder. **Account hijacking** is particularly common in buy-now-pay-later schemes, where fraudsters use stolen credentials to place fraudulent orders, leaving legitimate customers to dispute unexpected bills. **Triangulation fraud** involves a complex three-party scheme where customers place legitimate orders through fraudsters who fulfill them using stolen credit cards, ultimately resulting in chargeback claims when the card theft is discovered.

The speaker emphasizes that fraud patterns vary significantly across different business models. EV Trading Cards, which sells limited edition trading cards through a buy-now-pay-later scheme, experiences rapidly changing fraud trends every four to six weeks, typically coinciding with new high-ticket item releases, with account takeover being their primary fraud type. In contrast, Snorlax Spar Breaks sees slower-moving trends with fraud concentrating around major events in the Pokémon calendar, primarily experiencing credit card chargeback and triangulation fraud.

## Technology Stack: AWS Fraud Detector

The core technology employed is AWS Fraud Detector, a fully managed fraud detection service. The system requires 18 months of historical data with known fraudulent or legitimate labels to build its models. A critical caveat acknowledged by the speaker is that the models are black-box—the internal workings cannot be inspected or explained in detail. This opacity presents challenges for understanding model behavior and debugging, a concern that resonates with similar transparency issues in LLM deployments.

The service outputs fraud scores between zero and one thousand, representing the likelihood that an order is fraudulent, with one thousand indicating very high fraud probability and zero indicating very low probability. The expected distribution shows blue (fraudulent) orders clustering toward higher scores and green (legitimate) orders clustering toward lower scores, though there is inevitable overlap in the middle ranges that creates evaluation challenges.

An important operational requirement highlighted is GDPR compliance. Because the system processes customer personal information, decisions cannot be made automatically by the AI system alone—human reviewers must examine cases before final decisions are made. This human-in-the-loop requirement has significant implications for throughput, cost, and operational design, and represents a common pattern in production AI systems where regulatory, ethical, or business requirements mandate human oversight.

## Evaluation Strategy and Metrics

The speaker provides substantial detail on evaluation approaches, emphasizing that standard accuracy metrics are misleading for fraud detection. When fraud represents less than 0.5% of orders (a typical scenario), a model that simply classifies all orders as legitimate would achieve 99.5% accuracy while catching zero fraud. This class imbalance problem requires more sophisticated evaluation.

The focus shifts to **true positive rate** (catching actual fraud events) and **false positive rate** (incorrectly flagging legitimate orders). The goal is maximizing true positives while minimizing false positives, a tradeoff that must be calibrated based on business context. False positives create customer friction and operational overhead from unnecessary reviews, while false negatives result in financial losses from undetected fraud.

The evaluation process begins with offline testing using one month of held-out test data before production deployment. The speaker provides concrete examples with cost calculations:

For the high-volume EV Trading Cards scenario, approximately 2% of orders are expected to be fraud, with each item costing around £500 and human review costing £5 per order. For the lower-volume, higher-value Snorlax Spar Breaks scenario, fraud rates and review processes differ, with slightly cheaper human review costs but higher item values.

A significant practical constraint is the cost of AWS Fraud Detector predictions themselves: three cents per prediction. While this seems nominal, for companies processing 100,000 orders monthly, testing every single order would generate thousands of dollars in AWS bills. This cost consideration drives the sampling strategy for testing.

The testing approach uses three progressively realistic samples:

The first sample contains 100% fraud events (100 fraud, 0 legitimate). If the model predicts 98% of these as fraud, it demonstrates baseline fraud-detection capability. The second sample uses a 50/50 split of legitimate and fraudulent orders, testing whether the model can distinguish between classes when both are equally represented. The third sample reflects the realistic 2% fraud versus 98% legitimate distribution, validating whether the model can still detect the fraud signal when it's extremely rare in the data stream.

This progressive testing strategy mirrors best practices in LLMOps evaluation, where models should be tested under increasingly realistic conditions before production deployment, though the specific metrics and sampling strategies differ based on the use case.

## Feature Engineering and Model Improvement

The case study emphasizes feature engineering as critical for model improvement. AWS Fraud Detector provides feature importance scores for variables, and the speaker recommends providing human reviewers with the five most important features along with explanations to help them contextualize fraud scores. However, important caveats emerge from examining these importance scores.

Some features may have zero importance, indicating they provide no value to the model. When many variables are included, combining features or reducing feature count may improve performance. Conversely, if one feature has dramatically higher importance than all others, it may have too much weight, potentially making the model brittle or overfitted to that single signal.

AWS Fraud Detector offers **variable enrichment** capabilities through proprietary databases of fraudulent email addresses, home addresses, and contact numbers. For the trading cards use case, geolocation enrichment proves particularly valuable for detecting triangulation fraud. The service can compare billing addresses, IP addresses, and shipping addresses to identify suspicious patterns—for example, orders placed from completely different countries than the billing or shipping addresses.

This enrichment capability parallels techniques in LLMOps where external knowledge sources, retrieval systems, or specialized APIs augment base model capabilities, though the specific mechanisms differ significantly between traditional ML feature engineering and LLM prompt augmentation or retrieval-augmented generation.

## Deployment Architecture

The deployment strategy varies based on order volume and processing requirements. For high-volume order flows, the speaker consistently uses **Amazon SageMaker** pipelines, praising their power for processing large amounts of information quickly. SageMaker provides comprehensive MLOps capabilities including model training, versioning, deployment, and monitoring.

For lower-volume scenarios, **AWS Lambda** functions offer a more cost-effective alternative. However, Lambda's 15-minute timeout constraint requires careful architectural design. The recommended pattern uses two Lambda functions: one for ingesting data and setting up predictions, and another for extracting results, removing personal information (for GDPR compliance), and distributing relevant results to appropriate stakeholders. This serverless architecture reduces costs when prediction volume doesn't justify maintaining dedicated compute resources.

A critical operational constraint is that AWS Fraud Detector cannot process predictions in true real-time—it can only handle one batch of predictions at any given time. This limitation shapes the entire operational design. For companies needing rapid results (such as those shipping goods within hours), the workaround involves processing the previous hour's orders in batches. This approach requires careful feature engineering to ensure all necessary information can be collected and processed within the one-hour window before the next batch begins.

This batch processing constraint highlights a common tension in production ML/AI systems between ideal real-time processing and practical infrastructure limitations, requiring architectural compromises that balance business requirements against technical constraints.

## Live Trial and Human Reviewer Integration

The transition to live production involves careful management of human reviewer integration. The speaker identifies a critical challenge: human reviewers have their own expertise and biases, but introducing an AI model with numerical scores can override years of reviewer experience. If the model isn't actually strong, over-reliance on its scores could degrade decision quality rather than improve it.

To address this during the initial live trial period, different strategies apply based on product characteristics:

For **low-cost orders with fast fraud confirmation cycles** (such as 30-day return periods for physical goods), a "watch and learn" approach allows the system to observe without immediate intervention. Orders are tracked against what reviewers flagged as fraud, and after the fraud confirmation window closes (when customers either return items or fraud becomes apparent), this ground truth feeds back to both reviewers and the model. The speaker notes that companies are already losing money to fraud, so "one more month isn't really that much more of a loss if you think about it"—a pragmatic if somewhat concerning approach that prioritizes learning over immediate loss prevention.

For **high-cost items or services** where chargebacks may not occur for up to a year or longer, the emphasis shifts to more thorough investigation. Reviewers receive more information, more time for decisions, and potentially the opportunity to contact customers directly for verification. This tiered approach recognizes that different fraud scenarios require different risk management strategies.

This human-AI collaboration pattern reflects broader themes in LLMOps around human feedback loops, active learning, and the challenge of calibrating appropriate levels of automation versus human oversight based on risk and uncertainty.

## Model Retraining and Continuous Improvement

The retraining strategy explicitly depends on fraud trend velocity, not arbitrary schedules. For **slower-moving trends** (like Snorlax Spar Breaks with seasonal fraud patterns), quarterly retraining or retraining around major calendar events suffices. Alternatively, retraining can trigger when features begin to drift, indicating the data distribution has changed.

For **fast-moving trends** (like EV Trading Cards with trends changing every four to six weeks), monthly retraining is appropriate, though the speaker notes that even faster retraining might be necessary if trends change more rapidly. This adaptive retraining schedule contrasts with arbitrary monthly or quarterly schedules, demonstrating operational maturity in recognizing that model refresh requirements should align with actual business and fraud pattern dynamics.

The **prediction generation frequency** similarly depends on business requirements rather than technical capability. Companies selling physical goods with shipments leaving warehouses within hours need information as quickly as possible. Companies selling services can potentially wait several days before acting on fraud predictions. However, the batch processing limitation of AWS Fraud Detector constrains how frequently predictions can be generated, requiring alignment between business needs, technical constraints, and feature engineering timelines.

## Threshold Optimization and Fraud Tolerance

The fraud score threshold—the point above which orders receive human review—requires careful calibration based on context. The speaker describes two approaches:

For businesses with diverse fraud trends and many different fraud patterns (common when selling varied goods), a **set threshold** approach based on reviewer capacity works well. Setting the threshold at 800 or 900 (on the 0-1000 scale) might be appropriate, with possible adjustments throughout the year based on seasonal patterns or capacity changes.

For businesses with distinctive, concentrated fraud trends and lower order volumes, a **moving threshold** based on rank ordering might be more effective—for example, reviewing the top 100 highest-scoring orders regardless of their absolute scores. This approach adapts automatically to the score distribution without requiring manual threshold adjustments.

Perhaps most provocatively, the speaker raises the question of **how much fraud should be allowed to happen**. This counterintuitive suggestion stems from a fundamental challenge in fraud detection: when events are stopped in progress, there's no definitive ground truth about whether they were actually fraudulent. Models need confirmed fraudulent data for retraining, but intervention prevents confirmation. The speaker suggests that businesses might need to allow a small percentage of suspected fraud to complete in order to obtain definitely labeled fraud examples for model improvement. This approach requires careful consideration of risk tolerance and acceptable losses, but it addresses a genuine challenge in continuously improving models for events that are interrupted by the detection system itself.

## Critical Assessment and Limitations

While the case study provides valuable operational insights, several important caveats and limitations warrant attention:

The **black-box nature of AWS Fraud Detector** limits transparency and debugging capability. When models behave unexpectedly, the inability to inspect decision logic makes diagnosis difficult. This opacity is problematic for building trust with human reviewers, explaining decisions to customers, and meeting potential regulatory requirements for explainability in automated decision-making.

The **cost structure** of three cents per prediction may be prohibitive for some businesses, particularly those with high order volumes and low margins. This economic constraint forced the speaker to use sampling rather than comprehensive testing, which may miss edge cases or subtle model weaknesses that only appear at scale.

The **GDPR requirement for human review** is presented as absolute, but the legal landscape around automated decision-making is more nuanced. While human oversight is generally advisable for high-stakes decisions, the specific legal requirements depend on jurisdiction, decision type, and implementation details. The blanket assertion that GDPR always requires human review may be oversimplified.

The suggestion to **deliberately allow some fraud** to obtain labeled training data is ethically and practically problematic. It potentially violates duties to customers (whose stolen cards are used) and payment processors. It may conflict with anti-fraud regulations and industry standards. And it creates perverse incentives where better fraud prevention paradoxically degrades model quality by reducing training data availability. Alternative approaches like synthetic data generation, simulation, or industry data sharing consortiums might address the labeled data challenge without deliberately allowing fraud.

The **batch processing limitation** of AWS Fraud Detector is presented as a constraint to work around, but for businesses requiring true real-time fraud detection (such as digital goods delivered instantly), this may be a disqualifying limitation. The workaround of processing previous hours in batches introduces detection delays that could be exploited by sophisticated fraudsters.

The case study focuses heavily on the technical and operational aspects but provides limited discussion of **business outcomes**. What fraud detection rates were actually achieved? How did false positive rates affect customer experience? What were the total costs including AWS fees, human review, false positives, and missed fraud? These metrics would provide crucial context for evaluating the approach's effectiveness.

## Relevance to LLMOps

While this case study centers on traditional machine learning rather than large language models, it offers several parallels to LLMOps challenges:

**Evaluation complexity**: The inadequacy of simple accuracy metrics and the need for task-specific evaluation criteria mirrors challenges in LLM evaluation, where perplexity or accuracy on benchmark datasets often fail to capture real-world performance on specific use cases.

**Human-in-the-loop workflows**: The integration of human reviewers with AI predictions, the challenge of calibrating appropriate reliance on model outputs, and the need to prevent over-automation all directly parallel LLM deployment scenarios where human oversight remains necessary.

**Continuous improvement and retraining**: The need for ongoing model updates as patterns shift resembles challenges in LLMOps around model drift, the need for fine-tuning on domain-specific data, and the question of when and how to update deployed models.

**Cost management**: AWS Fraud Detector's per-prediction pricing model parallels token-based pricing for LLM APIs, requiring similar economic optimization strategies around sampling, batching, and selective use of more expensive models.

**Black-box opacity**: The inability to inspect AWS Fraud Detector's internal decision-making mirrors interpretability challenges with large language models, where even with attention visualization and similar techniques, understanding why specific outputs were generated remains difficult.

**Deployment architecture decisions**: The choice between SageMaker for high-volume scenarios and Lambda for lower-volume use cases parallels decisions in LLMOps around dedicated model serving infrastructure versus serverless functions for LLM inference.

## Conclusions and Key Takeaways

The speaker's conclusion emphasizes that "monitoring and evaluating is shaped completely by the business and the context of your data and it's not necessarily just the technical constraints around it." This insight captures perhaps the most important lesson: production ML/AI systems require deep integration of technical capabilities with business context, operational realities, regulatory requirements, and human workflows.

The case study demonstrates that successful operationalization of AI for fraud detection requires:

- Context-appropriate evaluation strategies that account for class imbalance and business costs
- Feature engineering tailored to specific fraud patterns and available data
- Deployment architectures matched to volume, latency, and cost requirements
- Careful integration of human reviewers with calibrated reliance on model outputs
- Adaptive retraining schedules based on pattern velocity rather than arbitrary timelines
- Threshold optimization strategies that reflect fraud distributions and review capacity
- Pragmatic tradeoffs between ideal technical approaches and real-world constraints

The presentation offers valuable operational wisdom gained through practical experience implementing fraud detection across multiple companies, even as it leaves questions about ultimate effectiveness, costs, and the advisability of certain recommendations like deliberately allowing fraud for training data purposes.