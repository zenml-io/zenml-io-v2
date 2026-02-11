---
title: "Scaling Generative AI Features to Millions of Users with Infrastructure Optimization and Quality Evaluation"
slug: "scaling-generative-ai-features-to-millions-of-users-with-infrastructure-optimization-and-quality-evaluation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6936b764349a4eea2bd1c83f"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:34:32.208Z"
  createdOn: "2025-12-08T11:32:52.748Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "question-answering"
  - "summarization"
  - "classification"
  - "document-processing"
  - "high-stakes-application"
  - "structured-output"
  - "realtime-application"
  - "regulatory-compliance"
  - "prompt-engineering"
  - "few-shot"
  - "model-optimization"
  - "cost-optimization"
  - "latency-optimization"
  - "fallback-strategies"
  - "human-in-the-loop"
  - "a2a"
  - "evals"
  - "system-prompts"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "cicd"
  - "scaling"
  - "serverless"
  - "devops"
  - "continuous-deployment"
  - "continuous-integration"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "cache"
  - "amazon-aws"
  - "anthropic"
industryTags: "tech"
company: "Slack"
summary: "Slack faced significant challenges in scaling their generative AI features (Slack AI) to millions of daily active users while maintaining security, cost efficiency, and quality. The company needed to move from a limited, provisioned infrastructure to a more flexible system that could handle massive scale (1-5 billion messages weekly) while meeting strict compliance requirements. By migrating from SageMaker to Amazon Bedrock and implementing sophisticated experimentation frameworks with LLM judges and automated metrics, Slack achieved over 90% reduction in infrastructure costs (exceeding $20 million in savings), 90% reduction in cost-to-serve per monthly active user, 5x increase in scale, and 15-30% improvements in user satisfaction across features—all while maintaining quality and enabling experimentation with over 15 different LLMs in production."
link: "https://www.youtube.com/watch?v=6vBNKmSc614"
year: 2025
seo:
  title: "Slack: Scaling Generative AI Features to Millions of Users with Infrastructure Optimization and Quality Evaluation - ZenML LLMOps Database"
  description: "Slack faced significant challenges in scaling their generative AI features (Slack AI) to millions of daily active users while maintaining security, cost efficiency, and quality. The company needed to move from a limited, provisioned infrastructure to a more flexible system that could handle massive scale (1-5 billion messages weekly) while meeting strict compliance requirements. By migrating from SageMaker to Amazon Bedrock and implementing sophisticated experimentation frameworks with LLM judges and automated metrics, Slack achieved over 90% reduction in infrastructure costs (exceeding $20 million in savings), 90% reduction in cost-to-serve per monthly active user, 5x increase in scale, and 15-30% improvements in user satisfaction across features—all while maintaining quality and enabling experimentation with over 15 different LLMs in production."
  canonical: "https://www.zenml.io/llmops-database/scaling-generative-ai-features-to-millions-of-users-with-infrastructure-optimization-and-quality-evaluation"
  ogTitle: "Slack: Scaling Generative AI Features to Millions of Users with Infrastructure Optimization and Quality Evaluation - ZenML LLMOps Database"
  ogDescription: "Slack faced significant challenges in scaling their generative AI features (Slack AI) to millions of daily active users while maintaining security, cost efficiency, and quality. The company needed to move from a limited, provisioned infrastructure to a more flexible system that could handle massive scale (1-5 billion messages weekly) while meeting strict compliance requirements. By migrating from SageMaker to Amazon Bedrock and implementing sophisticated experimentation frameworks with LLM judges and automated metrics, Slack achieved over 90% reduction in infrastructure costs (exceeding $20 million in savings), 90% reduction in cost-to-serve per monthly active user, 5x increase in scale, and 15-30% improvements in user satisfaction across features—all while maintaining quality and enabling experimentation with over 15 different LLMs in production."
---

## Overview

This case study documents Slack's comprehensive journey in scaling their generative AI capabilities (branded as Slack AI) from initial deployment to serving millions of daily active users. The presentation, delivered at AWS re:Invent 2025 by Jean Ting (AWS Principal Solutions Architect), Austin Bell (Director at Slack for ML, Search, and AI), and Sharya Kath Reddy (Slack Infrastructure Engineer), provides detailed insights into both infrastructure optimization and quality evaluation frameworks necessary for production-scale LLM deployments.

Slack operates at massive scale, processing 1-5 billion messages weekly, 100-500 million files, and 1-5 billion searches. They offer over a dozen different generative AI features spanning various complexity levels, including AI summaries across product surfaces, in-house QA systems for querying Slack data, daily digests, and content generation capabilities. The challenge was delivering these features while maintaining strict security and compliance requirements (FedRAMP Moderate), controlling costs, and ensuring high quality outputs.

## Infrastructure Evolution and Optimization

### Initial Architecture (Mid-2023 to Mid-2024)

Slack initially deployed their AI features using Amazon SageMaker with a provisioned throughput model. The architecture consisted of their VPC containing Slack instances, with requests routed through VPC endpoints (utilizing AWS internal networking) to SageMaker endpoints that wrapped the models. They operated primarily in the US-East-1 region and implemented a concurrency checker within their VPC to manage load by prioritizing requests into three tiers: highest priority (latency-sensitive real-time requests), medium priority (5-10 minute SLA), and batch jobs (overnight processing).

This initial approach faced several critical limitations. The infrastructure experienced peaky traffic patterns with vastly different throughput characteristics between time-sensitive requests and batch workloads. During the GPU shortage period, it took weeks to obtain additional compute capacity, making scaling extremely difficult. Slack had to maintain GPUs in on-demand capacity reserves even during non-peak times, resulting in significant over-provisioning for most of the day. This fixed cost structure prevented diversification across multiple LLMs and slowed experimentation with new models and features.

### Migration to Amazon Bedrock

The migration opportunity emerged in mid-2024 when Amazon Bedrock achieved FedRAMP Moderate compliance, meeting Slack's stringent security requirements. Bedrock offered several compelling advantages: the ability to serve requests within Slack's trust boundary with guarantees that inputs and outputs wouldn't be shared with model providers, access to a diverse collection of frontier models, and rapid addition of new models to the registry (typically within a day of public release).

Slack followed a methodical migration approach. They first focused on understanding Bedrock's infrastructure models, initially maintaining the provisioned throughput approach to simplify migration before tackling the shift to on-demand infrastructure. They conducted extensive internal load testing and compute calculations to scientifically determine the equivalence between Bedrock model units and their existing SageMaker compute. For example, they discovered that Claude Instant on a SageMaker P4D instance equated to one Bedrock model unit (a 1:1 mapping), while Claude Haiku on P5 instances required two P5s to equal one Bedrock model unit.

Once equivalent compute was provisioned, Slack ran shadow traffic for two weeks, duplicating every SageMaker request to Bedrock to understand service internals and build monitoring dashboards covering latency, time-to-first-token, and other critical metrics. They then executed a gradual cutover process at 1%, 5%, 10%, and finally 100%, progressively serving actual responses from Bedrock rather than SageMaker.

### Transition to On-Demand Infrastructure

While Bedrock with provisioned throughput provided improvements, Slack identified further optimization opportunities. They couldn't dynamically scale provisioned throughput, still experiencing cost inefficiencies. They enhanced their platform with backup model capabilities for automatic rerouting during incidents or regressions, emergency stop features for specific features or models, and exposure to Bedrock-specific capabilities like tool use, prompt caching, and guardrails.

The transition to Bedrock's on-demand infrastructure represented a fundamental shift from managing bare instances to working with quota-based systems measured in input tokens per minute (TPM) and requests per minute (RPM). Slack leveraged their extensive metadata from the provisioned throughput era to calculate appropriate RPM and TPM requirements and request corresponding quotas. Their architecture evolved to replace the concurrency checker with RPM and TPM checkers that could isolate features and prevent any single feature from consuming the entire Bedrock cluster capacity.

A significant advantage of the on-demand model was access to US cross-region inference profiles. Given Slack's FedRAMP Moderate compliance requirements necessitating US-boundary operations, they could now leverage both US-East-1 and US-West-2 regions, dramatically accelerating compute delivery and improving resilience.

### Infrastructure Results

The infrastructure transformation delivered extraordinary results. Slack expanded from experimenting with one LLM to over 15 LLMs in production. Reliability increased substantially through higher LLM flexibility enabling fallback models, quick model switching during incidents, and continuous experimentation to optimize for quality and cost. Most dramatically, despite exponential growth in Slack AI customer adoption, they achieved greater than 90% savings in infrastructure costs, exceeding $20 million in dollar value. This transformation validated their principle that "the real test of scalable infrastructure isn't just how fast it grows but how well it protects what matters as it grows."

## Trust, Security, and Reliability Pillars

Slack established three core pillars guiding their AI deployment. The trust pillar centered on never training generative AI models on customer data, not logging customer data, allowing workspace admins to opt in or out of specific features, maintaining zero retention of data sent to LLM providers, and ensuring inputs and outputs aren't shared with providers. The security pillar encompassed operating within FedRAMP Moderate compliance space, ensuring services remain within their trust boundary, and implementing technical access controls (e.g., preventing access to private channel messages by users not in those channels). The reliability pillar focused on high availability, contextual relevance of responses, and transparency through citations allowing customers to trace answers back to source messages.

## Quality Evaluation and Experimentation Framework

### The Quality Challenge

Austin Bell highlighted a common challenge facing generative AI teams: making prompt and pipeline changes that appear to improve outputs but actually cause regressions in other areas, creating a "whack-a-mole" cycle with no net quality improvements over weeks. This stems from the subjective nature of generative AI outputs compared to classical machine learning where precision, recall, and engagement metrics provide clearer signals. Slack's philosophy became "you can only improve what you have the ability to measure."

### Quality Definition Framework

Slack defined quality through two primary pillars: quality (is the answer providing what users wanted and is it accurate) and safety (fostering the correct environment and ensuring data security). They further decomposed quality into objective measurements and subjective measurements.

Objective measurements addressed deterministic, table-stakes outputs that users would immediately notice if broken: proper rendering, correct JSON/XML parsing, properly formatted IDs and links for Slack navigation. Without these fundamentals, content quality becomes irrelevant as users cannot interact with the system properly.

Subjective measurements tackled harder problems: factual accuracy (truthfulness based on grounded context), answer relevancy (addressing the actual question asked), and attribution accuracy (correctly attributing content to users or files—a particularly important problem for Slack given their collaboration-centric platform).

Safety decomposed into harm (measuring toxicity and bias to ensure alignment with Slack's values) and security (protecting against prompt injection attacks and preventing search poisoning, both unintended and malicious).

### Evaluation Approach Evolution

Slack's evaluation capabilities evolved through several stages. Initially, they enabled product engineers to manually review outputs across small datasets following prompt or pipeline changes, while introducing automated programmatic metrics to capture objective quality measurements and prevent regressions on formatting and rendering.

They then progressed to their current state, tackling complex quality definitions through LLM-based quality metrics (measuring factual accuracy and answer relevancy) and leveraging guardrails to capture safety and harm issues. The goal was combining automated programmatic metrics with LLM judges and guardrails to evaluate quality on much larger, production-representative datasets, enabling larger-scale experiments and tests.

The future vision involves developing CICD for generative AI, defining verified outputs and automating test suites to catch regressions and enable faster quality improvements. Slack runs dozens of task-specific LLM judges, working with each product team to develop rubrics defining quality for their specific feature. Importantly, engineers only define rubrics without writing code to deploy evaluators, accelerating deployment. Amazon Bedrock Guardrails provide easy measurement of toxicity, harm, and prompt injection on both inputs and outputs.

### Experimentation Workflow

Slack developed a workflow reminiscent of traditional machine learning best practices. Engineers begin with offline experimentation on "golden sets"—small, verified datasets of 10-20 samples from internal data allowing manual review of prompt changes. If confident, they progress to "validation sets" ranging from 100-1000 samples, much more representative of production data. The combination of automated programmatic metrics and quality metrics helps capture large-scale regressions and verify intended quality improvements.

A critical principle is providing the fastest possible feedback loop at each step, enabling engineers to fail quickly, iterate, and ship features faster. While automation is the goal, human-in-the-loop remains essential since evaluators aren't perfect. Giving engineers visibility into changes and LLM responses across data accelerates development.

After offline validation, online evaluation begins through AB testing, integrating all evaluators to measure both quality metrics and user feedback before production rollout. This provides confidence in quality improvements without regressions before exposing changes to many users.

### Evaluation Results

Slack shared concrete examples demonstrating the framework's value. Prompt engineering improvements to content serialization sent to LLMs yielded 5% improvement in factual accuracy and 6% improvement in user attribution accuracy. Model upgrades, run through their evaluation flow for every new model or version, resulted in an 11% increase in user satisfaction and 3-5% increases in key quality metrics for one recent upgrade. Notably, they've also identified new versions causing regressions and decided against rollout. Cost management initiatives maintained quality while switching to more efficient LLMs, with one change achieving 60% cost reduction while maintaining similar quality.

## Integration Case Study: Search Query Understanding

Slack demonstrated how infrastructure flexibility and evaluation frameworks combine to enable seamless generative AI integration through their search query understanding use case. Operating at scale with a fraction of 1-5 billion weekly searches being complex queries, even small inefficiencies translate to high costs.

Search query understanding transforms natural language queries like "Can you find me the FY25 sales deck that John Doe sent me recently?" into structured search parameters. An LLM pipeline generates JSON with filters and refined queries: extracting the core query ("FY25 sales PowerPoint deck"), generating multiple parallel query variations, identifying time ranges ("past 3 months" from "recently"), limiting file types (presentations), and filtering by participants (John Doe).

The search pipeline uses ML models to quickly distinguish informational from navigational searches. Informational searches flow through query understanding before search retrieval, ML ranking, and LLM response generation.

### The Challenge and Solution

Slack's existing LLM for query understanding met quality goals but exceeded search latency budgets and incurred extremely high costs at scale. They wanted to maintain quality while simultaneously reducing latency and costs. Their infrastructure and experimentation capabilities enabled systematic evaluation of alternative LLMs.

They ran offline experiments comparing Amazon Nova Lite to their original LLM across latency and key quality metrics using dozens of aggregated evaluators. Small sample testing showed significant latency reductions and quality improvements. Confident from offline results, they proceeded to online AB testing, measuring latency, automated quality metrics, and user satisfaction.

Results showed significantly improved latency with no significant change in user satisfaction or automated quality metrics. After prompt engineering iterations, the switch to Nova Lite achieved 46% reduction in P50 latency and 70% cost reduction for the feature, with no user-visible quality regression.

## Overall Business Impact

The combination of infrastructure optimization and quality frameworks delivered transformative results over the past year. Slack achieved 90% reduction in cost-to-serve Slack AI per monthly active user while simultaneously increasing operational scale by nearly 5x. User satisfaction and feedback increased 15-30% across Slack AI's marquee features. These improvements demonstrate that infrastructure efficiency and rigorous quality evaluation aren't opposing forces but complementary capabilities enabling sustainable scaling of production LLM systems.

## Critical Assessment and Balanced Perspective

While Slack's presentation demonstrates impressive engineering and business outcomes, several considerations warrant attention. The case study is presented by Slack in partnership with AWS at an AWS event (re:Invent), naturally emphasizing positive outcomes and AWS service benefits. The specific savings figures ($20 million, 90% cost reductions) should be viewed in context—we don't know the absolute cost baseline, and such dramatic savings often reflect initial inefficiency rather than purely superior technology choices.

The migration timeline (mid-2023 to mid-2024 for initial Bedrock migration, continuing through 2025) suggests this is still a relatively young deployment. Long-term operational challenges may emerge as the system matures. The presentation focuses heavily on AWS Bedrock, and while the benefits appear genuine, alternative approaches (self-hosted models, other cloud providers, hybrid architectures) aren't explored.

The quality evaluation framework, while sophisticated, still relies significantly on LLM judges, which themselves can have biases and limitations. The "dozens of task-specific LLM judges" represent substantial engineering investment and ongoing maintenance burden not fully captured in the presentation. The human-in-the-loop requirements indicate full automation hasn't been achieved, suggesting continued operational overhead.

That said, the systematic approach to migration (shadow traffic, gradual rollout percentages), the principled thinking about quality definition before measurement implementation, and the concrete examples with specific metrics lend credibility to the case study. The acknowledgment of challenges (regressions from model upgrades, the "whack-a-mole" quality problem) provides helpful transparency. The architectural decisions around security, compliance, and trust boundaries reflect mature enterprise thinking appropriate for a collaboration platform handling sensitive business communications.

Overall, this represents a valuable case study of production LLMOps at significant scale, though readers should interpret specific cost savings claims contextually and recognize that results may vary significantly based on organizational context, existing infrastructure, and specific use cases.