---
title: "Cloud-Native Synthetic Data Generator for Data Pipeline Testing"
slug: "cloud-native-synthetic-data-generator-for-data-pipeline-testing"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ade3191ce3499084ef7ed"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:46.700Z"
  createdOn: "2025-12-23T18:23:45.333Z"
llmopsTags:
  - "data-analysis"
  - "data-cleaning"
  - "data-integration"
  - "poc"
  - "prompt-engineering"
  - "cost-optimization"
  - "fastapi"
  - "serverless"
  - "orchestration"
  - "scalability"
  - "security"
  - "compliance"
  - "databases"
  - "amazon-aws"
  - "databricks"
industryTags: "tech"
company: "GoDaddy"
summary: "GoDaddy faced challenges in testing data pipelines without production data due to privacy concerns and the labor-intensive nature of manual test data creation. They built a cloud-native synthetic data generator that combines LLM intelligence (via their internal GoCode API) with scalable traditional data generation tools (Databricks Labs Datagen and EMR Serverless). The system uses LLMs to understand schemas and automatically generate intelligent data generation templates rather than generating each row directly, achieving a 99.9% cost reduction compared to pure LLM generation. This hybrid approach resulted in a 90% reduction in time spent creating test data, complete elimination of production data in test environments, and 5x faster pipeline development cycles."
link: "https://www.godaddy.com/resources/news/building-a-synthetic-data-generator"
year: 2025
seo:
  title: "GoDaddy: Cloud-Native Synthetic Data Generator for Data Pipeline Testing - ZenML LLMOps Database"
  description: "GoDaddy faced challenges in testing data pipelines without production data due to privacy concerns and the labor-intensive nature of manual test data creation. They built a cloud-native synthetic data generator that combines LLM intelligence (via their internal GoCode API) with scalable traditional data generation tools (Databricks Labs Datagen and EMR Serverless). The system uses LLMs to understand schemas and automatically generate intelligent data generation templates rather than generating each row directly, achieving a 99.9% cost reduction compared to pure LLM generation. This hybrid approach resulted in a 90% reduction in time spent creating test data, complete elimination of production data in test environments, and 5x faster pipeline development cycles."
  canonical: "https://www.zenml.io/llmops-database/cloud-native-synthetic-data-generator-for-data-pipeline-testing"
  ogTitle: "GoDaddy: Cloud-Native Synthetic Data Generator for Data Pipeline Testing - ZenML LLMOps Database"
  ogDescription: "GoDaddy faced challenges in testing data pipelines without production data due to privacy concerns and the labor-intensive nature of manual test data creation. They built a cloud-native synthetic data generator that combines LLM intelligence (via their internal GoCode API) with scalable traditional data generation tools (Databricks Labs Datagen and EMR Serverless). The system uses LLMs to understand schemas and automatically generate intelligent data generation templates rather than generating each row directly, achieving a 99.9% cost reduction compared to pure LLM generation. This hybrid approach resulted in a 90% reduction in time spent creating test data, complete elimination of production data in test environments, and 5x faster pipeline development cycles."
---

## Overview

GoDaddy's synthetic data generator represents a sophisticated production LLMOps implementation that addresses a critical challenge in modern data engineering: how to test data pipelines safely and efficiently without exposing sensitive production data. This case study is particularly notable for its hybrid architecture that strategically combines LLM intelligence with traditional scalable data generation tools, demonstrating a pragmatic approach to LLMOps that balances innovation with cost-effectiveness and operational reliability.

The company operates as a data-driven organization with numerous data streams and pipelines that require rigorous testing before production deployment. The core problem they faced was twofold: first, testing pipelines without production data was slow, laborious, and risky; second, copying production data into lower environments (development, testing, staging) introduced unacceptable privacy and security concerns. Manual test data creation didn't scale when dealing with tens to hundreds of schemas, and engineers were spending days crafting test datasets. This bottleneck created hesitancy among data producers and consumers, increased security risks, and slowed down pipeline development cycles significantly.

## The Hybrid LLM Architecture

The breakthrough innovation in GoDaddy's approach lies in recognizing that LLMs should be used for intelligence at template-creation time rather than for generating every individual data row. This architectural decision fundamentally shaped the entire system and represents a mature understanding of LLMOps economics and scalability constraints.

The system combines three key components in production. First, they leverage **Databricks Labs Datagen**, a proven library for generating data at scale that typically requires manual template creation. Second, they use **GoCode**, which is GoDaddy's internal LLM API service, to analyze schemas and automatically generate sophisticated Datagen templates with realistic distributions, constraints, and relationships. Third, they employ **EMR Serverless** to provide the distributed compute infrastructure needed to generate billions of rows efficiently.

This architectural choice delivers several critical advantages. The LLM provides intelligence at template-time, understanding business context and creating realistic generation rules once per schema rather than being invoked for every row. Datagen and EMR handle the heavy lifting of generating millions of records from those templates, providing the scale needed for production testing. The cost efficiency is dramatic—they pay LLM costs once per schema rather than per row, achieving what they estimate as a 99.9% cost reduction compared to pure LLM generation approaches. The system also demonstrates domain awareness, with the LLM inferring realistic patterns from column names and constraints (for example, email fields automatically get valid email formats, phone numbers follow regional patterns).

## LLM-Powered Template Generation

The GoCode template generation component represents the intelligent core of the system. When a schema is submitted, GoCode doesn't just perform superficial type mapping—it understands semantic meaning and business context. For instance, when presented with a simple schema containing fields like customer_id, email, age, registration_date, and country, the LLM generates a sophisticated Datagen template that includes UUIDs for customer IDs, realistic email addresses with appropriate domain distributions, age distributions that follow normal distributions with realistic parameters (mean of 35, standard deviation of 12, bounded between 18 and 95), timestamp ranges that span appropriate historical periods, and weighted geographic distributions that reflect realistic customer distribution patterns.

This semantic understanding is crucial for generating truly useful synthetic data. The LLM infers not just data types but realistic distributions, understands that certain fields need specific formats and validation rules, and creates weighted distributions for categorical data based on typical business patterns. This level of intelligence would be extremely difficult and time-consuming for engineers to manually encode for hundreds of schemas.

However, GoDaddy encountered challenges with LLM hallucinations during template generation. Early versions sometimes produced templates with syntax errors or logically impossible constraints, such as age ranges from -10 to 300. They implemented a validation layer that checks generated templates against schema constraints and a library of known-good patterns. When invalid templates are detected, they're regenerated with more specific prompts that guide the LLM toward valid outputs. This validation layer represents a critical LLMOps pattern—treating LLM outputs as potentially unreliable and implementing programmatic validation rather than blindly trusting generated code.

## Distributed Execution with EMR Serverless

The execution layer of the system demonstrates sophisticated distributed computing orchestration. Their initial prototype used Lambda functions for generation, which worked adequately for small datasets but hit the hard 15-minute timeout limit when attempting to generate millions of rows. This represents a common pitfall in LLMOps architectures—underestimating the scale requirements of production systems.

They pivoted to EMR Serverless, which can run for hours and scale horizontally across numerous nodes. This required significant reengineering, including rewriting generation logic in Spark to take advantage of distributed processing capabilities. The Spark jobs are optimized specifically for synthetic data generation with several key techniques. Data is generated in parallel across partitions for maximum throughput, they use Spark's structured streaming to generate data without loading entire datasets into memory (maintaining memory efficiency even at massive scale), and they implement smart batching where multiple small generation requests are combined into single EMR jobs to reduce overhead and improve cost efficiency.

The move to EMR Serverless also addressed cost optimization concerns. Running always-on EMR clusters for every generation request would be prohibitively expensive. EMR Serverless with intelligent job batching reduced costs by approximately 80% compared to always-on cluster approaches. This cost optimization is critical for making the system viable at GoDaddy's scale, where potentially hundreds of teams might be generating synthetic data regularly.

## End-to-End Production Workflow

The complete production workflow demonstrates mature LLMOps orchestration and state management. When a producer or consumer submits a schema via the Data Lake API, the payload includes the schema definition, dataset name, target S3 bucket and path, and generation parameters such as row count, partitions, and date range. The Data Lake API persists this as a new record in DynamoDB, tracking the schema, owner, target S3 location, desired state, and initial status (such as SUBMITTED).

The Data Lake Management Service (DLMS) API is invoked to start a generation workflow for that specific schema and version. DLMS acts as the orchestrator, handling authentication, validation, idempotency checks, and retry logic. It triggers compute by calling a Lambda function that constructs the complete job specification—including schema reference, template, and Spark parameters—and submits it to EMR Serverless.

Within the workflow, the GoCode template engine renders a strongly typed data model and generation logic from the schema, incorporating field types, constraints, distributions, and primary key/foreign key rules. The output is compiled or packaged for Spark execution. The Spark job on EMR uses this generated code to synthesize realistic, schema-conformant records at scale, handling partitioning strategies, data skew, nullability constraints, and referential integrity between related tables. Data is serialized to Parquet format with appropriate compression and column types.

The output is written directly to the producer's designated S3 bucket prefix, maintaining data ownership and security boundaries. Cross-account writes are enabled via bucket policies or assumed roles depending on organizational security policies. Throughout execution, the workflow updates DynamoDB status (transitioning from SUBMITTED to RUNNING to SUCCEEDED or FAILED) and exposes status via the DLMS API for UI polling or automation integration.

## Security and Cross-Account Access

Security architecture represents a critical consideration in this LLMOps implementation. Writing generated data to producer-owned S3 buckets across different AWS accounts introduced complex permission challenges. GoDaddy implemented a flexible permission model supporting both bucket policies and assumed roles, allowing producers to choose their preferred security approach based on their team's specific requirements and compliance needs.

This design maintains the principle of least privilege—the synthetic data generator doesn't maintain long-lived credentials or have standing access to producer buckets. Instead, access is granted on-demand through temporary credentials or explicit bucket policies. This aligns with GoDaddy's zero-trust security model and ensures that synthetic data generation doesn't become a security vulnerability despite operating across organizational boundaries.

## Quality Validation and Data Realism

Generated synthetic data goes through multiple layers of validation to ensure quality and usefulness. Schema compliance validation ensures all required fields are present with correct data types. Constraint validation checks unique constraints, foreign key relationships, and custom business rules. Statistical validation compares generated distributions against expected patterns to ensure realism. Referential integrity validation ensures that relationships between tables are properly maintained—for example, that foreign keys reference valid primary keys in related tables.

GoDaddy is candid about the limitations of synthetic data in their documentation. While synthetic data excels at privacy compliance (containing no personally identifiable information), scalability (generating billions of records on demand), and edge case coverage (deliberately including rare events or future-state scenarios), it also has inherent limitations. Realism gaps exist where even the best synthetic data may miss subtle patterns or correlations present in production data. Real-world data contains "messiness" that's difficult to replicate, including typos, incomplete records, and unexpected relationships. Generating realistic synthetic data requires deep understanding of the business domain, data relationships, and constraints. Validation remains challenging—determining whether synthetic data is "good enough" for a particular use case remains one of the hardest problems in the field.

They recommend that teams periodically compare synthetic data distributions with production patterns to ensure ongoing realism and use synthetic data as one tool in a comprehensive testing arsenal rather than the sole testing approach.

## Architectural Decisions and Rationale

GoDaddy's architectural choices reflect thoughtful LLMOps engineering principles. Scalability was paramount—EMR and Spark can handle billions of rows through intelligent partitioning and autoscaling, ensuring the solution grows with the company's data needs and eliminates bottlenecks inherent in traditional data generation approaches.

Type safety and performance guided their technology choices. The Go-based template generation ensures compile-time correctness and delivers better runtime performance compared to interpreted language alternatives. This catches errors early in the development cycle and maintains high generation speeds in production.

Security follows established GoDaddy best practices. Producers maintain ownership of their buckets with access granted through time-limited mechanisms rather than long-lived credentials. Observability is built into the core architecture—every job is comprehensively tracked in DynamoDB with metadata including timestamps, row counts, output paths, and detailed error messages. This visibility is crucial for debugging issues and monitoring system health at scale.

Idempotency prevents costly mistakes. Job keys are derived from schema ID, version, date, and partition, preventing duplicate runs and protecting against both accidental re-execution and wasted compute resources. This is particularly important given the potential cost of EMR cluster time.

## Evaluation of Alternative Approaches

The case study provides valuable insight into why existing solutions fell short, demonstrating the team's thorough evaluation process before building their custom solution. Manual test data creation had engineers spending days crafting JSON files and SQL scripts, an approach that couldn't scale to hundreds of schemas and millions of records. Production data sampling seemed attractive but introduced security risks, compliance nightmares, and couldn't generate future-state scenarios or edge cases that haven't yet occurred in production.

Off-the-shelf generators like Faker and Mockaroo work well for simple schemas but struggled with GoDaddy's complex relationships, custom constraints, and domain-specific business logic. Pure LLM generation was experimented with—having LLMs generate entire datasets directly. While the quality was impressive, the cost and latency of generating millions of rows made this approach completely impractical. They estimate that generating one million customer records via pure LLM generation would cost thousands of dollars and take days to complete, making it economically and operationally infeasible.

Each failed approach taught them something valuable and led to the hybrid solution that combines LLM intelligence with traditional tool scalability.

## Production Results and Impact

Since launching the system into production, GoDaddy has measured significant quantitative impact. They achieved a 90% reduction in time spent creating test data, representing substantial engineering time savings across numerous teams. They accomplished 100% elimination of production data in test environments, fully addressing the security and compliance concerns that motivated the project. Pipeline development cycles accelerated by 5x, dramatically improving time-to-production for new data products and features.

The system has been designed as a self-service API where teams can generate data with a simple API call without requiring synthetic data expertise. This democratization of synthetic data generation has been critical to achieving widespread adoption across the organization.

## Lessons Learned and LLMOps Best Practices

GoDaddy shares several valuable lessons for teams building similar LLMOps systems. The hybrid approach of combining LLM intelligence with traditional scalable tools proved essential—pure LLM generation doesn't scale economically, while traditional generators lack the intelligence to create realistic data without extensive manual configuration.

Investing in validation early is critical. Bad synthetic data is worse than no data, as it can create false confidence in pipeline behavior. Building robust validation into the pipeline from day one prevents downstream quality issues. Making the system self-service was identified as crucial for adoption—the biggest barrier to usage is complexity, and their API-first approach means teams can generate data without understanding the underlying architectural complexity.

Planning for schema evolution was essential. Schemas change frequently in production environments, so building versioning and backwards compatibility into the system from the start prevents future pain. They emphasize that synthetic data has inherent limits—it's excellent for functional testing and development but may not catch all production edge cases, so it should be used as one tool in a comprehensive testing arsenal rather than as a complete replacement for production-like testing.

## Future Directions

GoDaddy indicates they're exploring smarter, more context-aware synthetic data powered by emerging tools like Model Context Protocol (MCP), suggesting ongoing investment in improving the intelligence of their template generation. They're also considering open-sourcing components of this solution to benefit teams beyond GoDaddy facing similar challenges, which would represent a valuable contribution to the LLMOps community.

The project was developed with contributions from their 2025 summer interns (Benson Doan, Anwita Kamath, and Yousuf Al-Bassyioni), demonstrating how the system provided opportunities for learning and skill development while solving real production problems.

## Critical Assessment

This case study represents a mature and pragmatic approach to LLMOps that avoids common pitfalls. The decision to use LLMs for template generation rather than row generation demonstrates clear-eyed assessment of economic constraints and scale requirements. The validation layers address LLM reliability concerns directly rather than assuming generated outputs are correct. The comprehensive observability and error handling show production-grade engineering discipline.

However, the case study is presented by GoDaddy themselves in a blog post that promotes their technical capabilities, so some healthy skepticism about claimed results is warranted. The 90% time reduction and 5x development cycle acceleration metrics are impressive but lack details about measurement methodology or baseline comparisons. The system is described as "newly completed and still in early stages of adoption," suggesting these results may be from limited pilot deployments rather than widespread production usage.

The reliance on their internal GoCode LLM API means this architecture isn't directly replicable by organizations without similar internal LLM infrastructure, though the architectural patterns and hybrid approach remain valuable. The complexity of the full stack—involving DynamoDB, Lambda, EMR Serverless, Spark, S3 cross-account access, and custom orchestration—suggests significant operational overhead and expertise requirements for maintenance and evolution.

Overall, this represents a sophisticated and well-architected LLMOps implementation that solves a real production problem with measurable business impact, while demonstrating mature engineering judgment about when and how to leverage LLMs in production systems.