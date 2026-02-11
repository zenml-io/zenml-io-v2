---
title: "AI-Powered Postmortem Analysis for Site Reliability Engineering"
slug: "ai-powered-postmortem-analysis-for-site-reliability-engineering"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6908868233caff77b8dd8271"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:22:45.793Z"
  createdOn: "2025-11-03T10:40:02.329Z"
llmopsTags:
  - "classification"
  - "summarization"
  - "data-analysis"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "error-handling"
  - "multi-agent-systems"
  - "postgresql"
  - "elasticsearch"
  - "redis"
  - "fastapi"
  - "anthropic"
  - "amazon-aws"
industryTags: "e-commerce"
company: "Zalando"
summary: "Zalando developed an LLM-powered pipeline to analyze thousands of incident postmortems accumulated over two years, transforming them from static documents into actionable strategic insights. The traditional human-centric approach to postmortem analysis was unable to scale to the volume of incidents, requiring 15-20 minutes per document and making it impossible to identify systemic patterns across the organization. Their solution involved building a multi-stage LLM pipeline that summarizes, classifies, analyzes, and identifies patterns across incidents, with a particular focus on datastore technologies (Postgres, DynamoDB, ElastiCache, S3, and Elasticsearch). Despite challenges with hallucinations and surface attribution errors, the system reduced analysis time from days to hours, achieved 3x productivity gains, and uncovered critical investment opportunities such as automated change validation that prevented 25% of subsequent datastore incidents."
link: "https://engineering.zalando.com/posts/2025/09/dead-ends-or-data-goldmines-ai-powered-postmortem-analysis.html"
year: 2025
seo:
  title: "Zalando: AI-Powered Postmortem Analysis for Site Reliability Engineering - ZenML LLMOps Database"
  description: "Zalando developed an LLM-powered pipeline to analyze thousands of incident postmortems accumulated over two years, transforming them from static documents into actionable strategic insights. The traditional human-centric approach to postmortem analysis was unable to scale to the volume of incidents, requiring 15-20 minutes per document and making it impossible to identify systemic patterns across the organization. Their solution involved building a multi-stage LLM pipeline that summarizes, classifies, analyzes, and identifies patterns across incidents, with a particular focus on datastore technologies (Postgres, DynamoDB, ElastiCache, S3, and Elasticsearch). Despite challenges with hallucinations and surface attribution errors, the system reduced analysis time from days to hours, achieved 3x productivity gains, and uncovered critical investment opportunities such as automated change validation that prevented 25% of subsequent datastore incidents."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-postmortem-analysis-for-site-reliability-engineering"
  ogTitle: "Zalando: AI-Powered Postmortem Analysis for Site Reliability Engineering - ZenML LLMOps Database"
  ogDescription: "Zalando developed an LLM-powered pipeline to analyze thousands of incident postmortems accumulated over two years, transforming them from static documents into actionable strategic insights. The traditional human-centric approach to postmortem analysis was unable to scale to the volume of incidents, requiring 15-20 minutes per document and making it impossible to identify systemic patterns across the organization. Their solution involved building a multi-stage LLM pipeline that summarizes, classifies, analyzes, and identifies patterns across incidents, with a particular focus on datastore technologies (Postgres, DynamoDB, ElastiCache, S3, and Elasticsearch). Despite challenges with hallucinations and surface attribution errors, the system reduced analysis time from days to hours, achieved 3x productivity gains, and uncovered critical investment opportunities such as automated change validation that prevented 25% of subsequent datastore incidents."
---

## Overview

Zalando, a major e-commerce platform, embarked on a two-year journey to leverage Large Language Models (LLMs) as intelligent assistants for analyzing incident postmortems at scale. The company had accumulated thousands of postmortem documents through their mature SRE culture, but traditional human-centric analysis couldn't scale to extract strategic insights across the entire corpus. The initiative focused specifically on datastore technologies including Postgres, AWS DynamoDB, AWS ElastiCache, AWS S3, and Elasticsearch, with the goal of identifying recurring failure patterns and informing infrastructure investment decisions.

## The Production Context and Problem

Zalando inherited a robust postmortem culture from Google's SRE book, where every significant incident undergoes root cause analysis, implementation of preventive actions, and sign-off from engineering leadership up to VP level depending on severity. These insights are shared through weekly operational reviews and engineering communities, creating a rich learning culture. However, this process faced fundamental scalability challenges. Reading a single postmortem thoughtfully takes 15-20 minutes, meaning a dedicated reviewer can process perhaps four per hour. When multiplied by thousands of documents, strategic questions like "Why do datastores fail most frequently at scale?" became practically impossible to answer without excessive cognitive load and time investment.

The team identified three core limitations of the traditional approach: postmortems vary widely in depth and clarity making pattern extraction difficult, root cause analyses reflect team assumptions while subtle factors go unspoken, and making connections across teams requires immense cognitive load and informal networking. The company risked missing systemic signals that could inform infrastructure investments, reacting to symptoms instead of root causes, and delaying decisions due to insufficient cross-domain insights.

## Solution Architecture: Multi-Stage LLM Pipeline

Rather than using high-end LLMs with large context windows, Zalando deliberately chose to build a multi-stage pipeline where each stage specializes in a single objective. This design decision was driven by observations of the "lost in the middle" effect, where details in the middle of long inputs are often overlooked or distorted. Large contexts also don't guarantee perfect recall and can increase latency, memory usage, and cost. The pipeline implements a functional "map-fold" pattern as its key building block, where a large set of documents is independently processed using a language model to extract relevant information (the "map" phase), then these outputs are aggregated either by another LLM invocation or deterministic function into a higher-level summary (the "fold" or "reduce" phase).

The pipeline consists of five distinct stages, each with clear inputs and outputs:

**Summarization Stage**: This stage distills complex incident reports into structured summaries covering five core dimensions: issue summary, root causes, impact, resolution, and preventive actions. Using the TELeR (Turn, Expression, Level of Details, Role) technique for prompt engineering, the LLM extracts only essential information with strict constraints: no guessing, no assumptions, and no speculative content. If something is unclear or missing in the original postmortem, the summary explicitly states that fact. The output is designed to be readable for both humans and machines, enabling stakeholders to quickly understand incidents without sifting through large contexts.

**Classification Stage**: This stage systematically identifies whether specific datastore technologies directly contributed to incidents. The model receives a postmortem summary along with a list of technologies in question and returns only the name of technologies with confirmed direct connection or "None" if there is no such link. The prompt strictly prohibits inference or assumption, ensuring only explicitly stated connections are flagged. Surface Attribution Error was a significant obstacle here, requiring careful prompt design with negative examples to prevent the model from attributing causality based on mere mentions of technology names.

**Analyzer Stage**: The most crucial phase extracts a short 3-5 sentence digest highlighting the root cause or fault condition involving the technology, the role it played in the overall failure scenario, and any contributing factors. The output targets a technical audience and is designed to be precise and readable without requiring access to the full postmortem, taking only 30-60 seconds to understand the critical aspects of each incident. This stage adds critical interpretive value by turning raw incident data into a derivative dataset about technological failures usable for further processing.

**Patterns Stage**: This stage performs cross-incident analysis by feeding the entire set of incident digests into an LLM within a single prompt. The prompt explicitly prohibits inference, redundancy, or the inclusion of any information not grounded in source data. The output is a concise list of common failure themes across incidents, serving as a foundation for human analysis and facilitating identification of reliability risks, architectural vulnerabilities, or process gaps.

**Opportunity Stage**: This final stage combines the identified patterns with the original postmortem corpus to surface investment opportunities for the organization.

## Technical Evolution and Model Selection

The pipeline went through several evolutions in terms of models and hosting solutions. Initially, the team employed open source models hosted within LM Studio, driven by compliance concerns around PII data in postmortems (including on-call responder information, business metrics, GMV losses, etc.). Legal alignment was a pre-condition before using cloud-hosted LLMs. The team experimented with small models ranging from 3B to 12B parameters but observed up to 40% probability for hallucination at summary and analysis phases. These models would fabricate plausible summaries, for instance creating a non-existent DynamoDB incident solely because DynamoDB was mentioned in a linked playbook title.

The initial releases utilized multiple models (3B, 12B, and 27B parameters) requiring about 20 seconds per document for classification and 60 seconds per incident for analysis, enabling processing of annual data in under 24 hours. The most recent iteration is powered by Claude Sonnet 4 on AWS Bedrock, which processes each postmortem in approximately 30 seconds, offering immediate analytical opportunities. With Claude Sonnet 4, hallucinations became negligible, though the team notes that approximately 10% attribution errors persist even with this advanced model.

## Human-in-the-Loop and Quality Assurance

Despite the automation goals, human curation remained essential throughout development and deployment. During pipeline development, the team conducted 100% human curation of output batches, involving analysis of generated postmortem digests compared to original postmortems. This curation process was purely labelling, requiring colleagues to upvote or downvote results. The feedback loop from humans helped refine prompts and make optimal model selections for each stage. As the system matured, human curation was relaxed to 10-20% of randomly sampled summaries from each output batch.

The team still relies on human expertise to proofread the final report and apply editorial changes to summaries and incident patterns. This approach was crucial for building trust and demonstrating the AI's role as an assistant capable of producing high quality output. By ensuring each stage's input/output was human-readable and subject to curation, they fostered acceptance of the results. The pivotal role of digests allowed humans to observe all incidents holistically and precisely validate and curate LLM-produced reports.

Reliable accuracy in extracting numerical data such as GMV or EBIT loss, affected customers, and repair time from postmortems was not achieved, so the team depends on their internal incident dataset as a trustworthy source of truth for opportunity analysis.

## Key Findings and Business Impact

Two years of data analysis revealed that recurring patterns are primarily related to how datastore technologies are used rather than flaws in the technologies themselves. Configuration and deployment, along with capacity and scaling, emerged as primary reasons for datastore incidents. The most recurring incident patterns identified included: absence of automated change validation at config and infrastructure as code levels with poor visibility into changes and their effects, inconsistent or ad-hoc change management practices including manual intervention, absence of progressive delivery with datastores (such as canary or blue-green deployments), underestimating traffic patterns, failing to scale ahead of demand or delayed auto-scale responses, and bottlenecks due to memory, CPU, or IOPS constraints.

Specific case studies highlighted the value of the approach. AWS S3 incidents were consistently tied to misconfigurations in deployment artifacts preventing applications from accessing S3 buckets, often due to manual errors or untested changes. This insight directly led to automated change validation for infrastructure as code, which shielded the organization from 25% of subsequent datastore incidents, demonstrating clear return on investment. AWS ElastiCache incidents showed a consistent trend of 80% CPU utilization causing elevated latency at peak traffic, leading to strategic direction on capacity planning, instance type selection, and traffic management.

The datastore portfolio proved mature and resilient, with incidents very rarely directly attributed to technological flaws. In five years, they encountered problems with JDBC drivers and incidents related to only two known PostgreSQL bugs: one involving a race condition in the AUTOVACUUM LAUNCHER process in PostgreSQL 12, and another involving a memory leak in PostgreSQL 17's logical replication when DDL commands are executed in parallel with large numbers of transactions.

## Challenges and Limitations

The team identified three key obstacles impacting pipeline quality: hallucination, surface attribution error, and latency. Hallucination was particularly problematic with smaller models, reaching up to 40% probability. The team experimented with various prompting strategies, emphasizing strict requirements and clearly articulating expectations with examples, conducting human-led curation until hallucination effects dropped below 15%. The transition to larger-scale models like Claude Sonnet 4 made hallucinations negligible.

Surface Attribution Error dominated almost every stage of the pipeline, where the model makes decisions based on surface-level clues rather than deeper meaning or causality. The model shows bias toward prominent keywords on the surface level instead of reasoning through context to identify actual causal factors. For instance, it could offer a well-structured explanation regarding AWS S3's contribution to an incident even if "S3" is merely mentioned without being causally linked. Although negative prompting was employed to mitigate this issue, approximately 10% attribution errors persist even with Claude Sonnet 4.

Surface Attribution Error often accompanies overfitting, as both involve relying on superficial patterns from past data rather than deeper signals. General purpose LLMs trained on publicly available data struggle to identify emerging failure patterns or properly deal with proprietary technology. Since the datastore analysis focused exclusively on public technologies, overfitting was negligible, but analysis of Zalando internal technologies (like their Skipper product) proved unacceptable. Remediation of such issues requires model fine-tuning.

Latency was also a critical concern for rapid iteration. The team concluded that overall document processing time should not exceed 120 seconds; otherwise, processing annual data becomes impractically long. Initial releases with 27B parameter models required 90-120 seconds per document, providing no bandwidth to chain multiple stages. The initial concept of a no-code agentic solution was quickly deemed unfeasible due to performance limitations, inaccuracies, and hallucinations encountered during prototype development.

## Results and Operational Impact

The AI analysis significantly reduced the time for analysis from days to hours and achieved 3x productivity boosts—reading summaries and making conclusions requires about 5 minutes compared to 15-20 minutes for raw postmortems. The solution achieved scalability across multiple technological areas, and surfaced "hidden hotspots" like improper connection pool configuration or circuit breakers leading to cascading failures that were previously considered stable. The system enabled processing of annual data analysis in under 24 hours with the intermediate model architecture and provides near-immediate analysis with Claude Sonnet 4.

## Lessons Learned and Recommendations

The team's key takeaways align with broader industry insights about AI: LLMs can effectively turn vast corpora of human-authored postmortems into dynamic, decision-making datasets, surfacing patterns and systemic issues impossible to identify manually at scale. A multi-stage LLM pipeline where each stage specializes in a single objective proved more effective and reliable than using single high-end LLMs with large context windows, mitigating issues like "lost in the middle" and improving accuracy. Human-in-the-loop remains crucial—despite automation, human curation, examination, labeling, and quality control at each stage are essential for refining prompts, ensuring accuracy, fostering trust, and addressing novel failure modes that AI might overlook.

Their recommendations for others include starting small with focused use cases and embracing rapid iterations, prioritizing prompt engineering by investing time in crafting precise and constrained prompts to minimize hallucinations and surface attribution errors, designing solutions with evolvability in mind and shipping pipelines with golden datasets for testing, and designing for human interpretability by ensuring intermediate outputs are human-readable to facilitate trust and validation.

The case demonstrates that AI, when implemented thoughtfully with a human-in-the-loop approach, can transform postmortems from mere "dead ends" into invaluable "data goldmines," providing strategic insights to drive targeted reliability investments and cultivate more intelligent infrastructure. The approach brings speed to turning postmortems into predictive signals for reliable futures, proving that incidents hold blueprints to strategic infrastructure wins when organizations listen correctly.