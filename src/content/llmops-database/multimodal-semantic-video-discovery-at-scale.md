---
title: "Multimodal Semantic Video Discovery at Scale"
slug: "multimodal-semantic-video-discovery-at-scale"
draft: false
llmopsTags:
  - "multi-modality"
  - "unstructured-data"
  - "realtime-application"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "chunking"
  - "latency-optimization"
  - "error-handling"
  - "evals"
  - "databases"
  - "load-balancing"
  - "microservices"
  - "scaling"
  - "serverless"
  - "orchestration"
  - "security"
  - "reliability"
  - "scalability"
  - "elasticsearch"
  - "amazon-aws"
industryTags: "media-entertainment"
company: "Conde Nast"
summary: "Condé Nast partnered with the AWS Generative AI Innovation Center to replace metadata-only video search with multimodal semantic discovery across a library of more than 140,000 videos. The production system uses TwelveLabs Marengo embeddings through Amazon Bedrock to represent visual, audio, and transcript content, Amazon OpenSearch Service for vector search, and decoupled asynchronous ingestion and query-serving planes running on AWS. In a May 2026 benchmarking workshop, Condé Nast reported that discovery time fell from an average of 250 minutes to approximately 2 minutes per task, with more than 90% less manual review effort and estimated annual operational savings of approximately $800,000; these outcomes are customer-reported estimates rather than independently validated results."
link: "https://aws.amazon.com/blogs/machine-learning/how-conde-nast-built-multimodal-video-discovery-with-amazon-bedrock/"
year: 2026
seo:
  title: "Conde Nast: Multimodal Semantic Video Discovery at Scale - ZenML LLMOps Database"
  description: "Condé Nast partnered with the AWS Generative AI Innovation Center to replace metadata-only video search with multimodal semantic discovery across a library of more than 140,000 videos. The production system uses TwelveLabs Marengo embeddings through Amazon Bedrock to represent visual, audio, and transcript content, Amazon OpenSearch Service for vector search, and decoupled asynchronous ingestion and query-serving planes running on AWS. In a May 2026 benchmarking workshop, Condé Nast reported that discovery time fell from an average of 250 minutes to approximately 2 minutes per task, with more than 90% less manual review effort and estimated annual operational savings of approximately $800,000; these outcomes are customer-reported estimates rather than independently validated results."
  canonical: "https://www.zenml.io/llmops-database/multimodal-semantic-video-discovery-at-scale"
  ogTitle: "Conde Nast: Multimodal Semantic Video Discovery at Scale - ZenML LLMOps Database"
  ogDescription: "Condé Nast partnered with the AWS Generative AI Innovation Center to replace metadata-only video search with multimodal semantic discovery across a library of more than 140,000 videos. The production system uses TwelveLabs Marengo embeddings through Amazon Bedrock to represent visual, audio, and transcript content, Amazon OpenSearch Service for vector search, and decoupled asynchronous ingestion and query-serving planes running on AWS. In a May 2026 benchmarking workshop, Condé Nast reported that discovery time fell from an average of 250 minutes to approximately 2 minutes per task, with more than 90% less manual review effort and estimated annual operational savings of approximately $800,000; these outcomes are customer-reported estimates rather than independently validated results."
notion:
  pageId: "3f4f8dff-2538-80fd-8b48-e2f1ec0fabce"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-09T08:42:00.000Z"
  lastEditedTime: "2026-10-09T08:42:00.000Z"
  publishedAt: "2026-10-09T08:53:17Z"
---

## Overview

Condé Nast operates a large archive spanning brands such as Vogue, GQ, Vanity Fair, and Wired. Before this project, editorial teams typically searched using video titles and descriptions and then manually scrubbed through candidate files. This made it difficult to find content based on what was actually said, shown, or heard in a video. The source describes an average of 250 minutes per content-discovery task and more than 140,000 videos in the archive. It also identifies an operational dependency on institutional knowledge: when the people who knew where assets were located were unavailable, relevant material could remain effectively undiscoverable.

Condé Nast and the AWS Generative AI Innovation Center built a production multimodal discovery system using TwelveLabs Marengo through Amazon Bedrock. The system generates embeddings for video segments, indexes them in Amazon OpenSearch Service, and uses a query tier to return semantically relevant clips with timestamps. It supports natural-language intent, visual and audio signals, transcript content, image-based queries, typo-tolerant interpretation, and precise segment retrieval. According to a May 2026 benchmarking workshop cited by the source, discovery time decreased to approximately two minutes per task, a 99.2% reduction, while manual review effort fell by more than 90%. The article also reports approximately $800,000 in estimated annual operational savings. These figures are important indicators of impact, but the source does not provide the benchmark design, sample size, baseline variation, search-quality metrics, or independent verification, so they should be treated as reported results rather than general proof of performance.

## Problem and use-case design

The central limitation was not simply slow search; it was a mismatch between how editors describe desired content and how conventional metadata represents it. An editor might search for “beginner yoga content with calming backgrounds” or “behind-the-scenes fashion week moments,” whereas a filename or manually written description may contain none of those terms. A keyword index therefore could not reliably connect user intent with the underlying audiovisual material. The system was designed to search inside videos and identify relevant moments rather than only identify whole files.

The team conducted user research with editorial staff before finalizing the embedding and query design. This helped establish the abstraction level and vocabulary for real searches. That step is an important LLMOps and information-retrieval practice: production quality depends not only on the model but also on representative queries, useful result granularity, and an understanding of how users judge relevance. The source says the team experimented with segment length because short segments could lose context while long segments could dilute the semantic signal. It does not disclose the final segment duration, retrieval metrics, relevance thresholds, or the size and composition of the evaluation set.

## Architecture and production workflow

The architecture separates an asynchronous ingestion and indexing plane from a synchronous query and serving plane. This separation avoids forcing compute-intensive embedding generation and low-latency search to compete for the same resources. It also allows backfill processing, ongoing ingestion, and user search traffic to scale and fail independently.

When a video is uploaded, it is stored in Amazon S3. An event triggers the ingestion process and passes along video metadata. An ingestion service running on Amazon ECS with AWS Fargate validates the file, extracts properties such as format, duration, and resolution, and divides the video into segments. An Auto Scaling group distributes processing across Availability Zones so chunks can be handled in parallel. Each segment is submitted to the TwelveLabs Marengo embedding model through Amazon Bedrock using asynchronous invocation. Marengo is selected for its ability to jointly represent visual, audio, and transcript signals, producing vectors intended to capture the semantic content of each segment across modalities.

The generated embeddings are persisted in an S3 bucket for durability and indexed into Amazon OpenSearch Service. OpenSearch provides managed k-nearest-neighbor vector search, metadata filtering, and multi-AZ replication. The source describes AWS Step Functions as the orchestration mechanism for asynchronous processing and backlog handling. Per-step retries, parallelism, and traceability were particularly important during the initial backfill of the 140,000-plus-video library. These controls are operationally significant because embedding pipelines are vulnerable to transient service failures, malformed media, throttling, partial completion, and the need to replay failed work without rebuilding the entire index.

The query path begins when a user request reaches an external Application Load Balancer. The frontend service runs on ECS with Fargate and forwards the request through an internal load balancer to a search service. That service converts the natural-language or image query into a vector representation and performs a k-nearest-neighbor search against OpenSearch. It then enriches results with titles, thumbnails, and other references retrieved from Amazon DocumentDB, returning relevant clips and timestamps to the user. The source states that the serving services use Auto Scaling groups across Availability Zones.

## Governance, resilience, and operations

The use of Amazon Bedrock avoids operating a separate model-serving stack for the specialized embedding model and gives the implementation a common API for foundation-model access. The article highlights IAM, VPC network isolation, and CloudTrail auditability as governance controls. Compute and data workloads are placed in private subnets, with only the external load balancer publicly reachable and outbound traffic routed through NAT gateways. These measures address access control, network exposure, and audit logging, although the source does not describe retention policies, data classification, encryption configuration, access-review processes, or controls for sensitive media.

The system is designed for high availability across multiple Availability Zones. OpenSearch is described as using synchronous replication across three Availability Zones, with two active and one standby; DocumentDB uses a primary and standby replica across two Availability Zones. Load balancers can route around failed compute instances, and ingestion, frontend, and search services can scale horizontally. The production system had reportedly been running for six months at the time of the article, with search remaining available while ingestion reprocessed backfill data or received updates. The decoupled design therefore provides an operational boundary between indexing work and interactive search availability.

Asynchronous embedding generation is presented as essential rather than optional at this scale. Synchronous calls for every segment of more than 140,000 videos would create a substantial bottleneck and could make backfill progress dependent on interactive request latency. Asynchronous invocation allows the system to queue work, process it in parallel, retry individual failures, and continue serving existing indexed content. The source does not provide throughput, queue-depth, latency, model cost, failure-rate, or freshness objectives, so the practical capacity and economics of the pipeline cannot be independently assessed from the case study.

## Capabilities and evaluation

The user-facing capabilities include intent-based natural-language search, multimodal matching across transcripts, visual elements, and audio, image-based similarity queries, typo tolerance, and timestamp-level results. These capabilities represent a retrieval system built around embeddings rather than a generative answer system: the primary model output is a vector used to locate media, while metadata services enrich the returned records. This distinction matters for evaluation and risk. Retrieval relevance, timestamp accuracy, coverage, duplicate results, and query latency are more directly relevant than conventional text-generation metrics such as fluency.

The reported evaluation was a benchmarking workshop in May 2026. Condé Nast reports a reduction from 250 minutes to approximately two minutes per discovery task, more than 90% less manual review, improved discovery of previously underused assets, and an estimated $800,000 in annual operational savings. Faster access is also described as improving responsiveness to advertiser requests and sales opportunities. However, the source does not specify whether the 250-minute baseline was measured prospectively or reconstructed, how tasks were selected, whether users knew which system was being evaluated, or how the financial estimate was calculated. It also does not publish precision, recall, nDCG, timestamp hit rate, false-positive rates, cost per indexed hour, or search latency percentiles. Those omissions limit reproducibility and make it difficult to separate model gains from workflow redesign and interface improvements.

## Tradeoffs and lessons

The principal tradeoff is the cost and complexity of precomputing and storing multimodal embeddings for a very large video collection. The decoupled pipeline, autoscaling compute, asynchronous model calls, durable intermediate storage, vector indexing, and multi-AZ deployment improve resilience and responsiveness, but they also introduce multiple services to operate and monitor. Reprocessing content can consume substantial compute and model capacity, while OpenSearch storage and replication add continuing infrastructure costs. The source emphasizes the benefits but does not publish a total-cost-of-ownership comparison with the previous workflow or alternative search architectures.

Model and index evolution also require lifecycle management. If Marengo or the segmentation strategy changes, existing vectors may need to be regenerated and reindexed. Maintaining compatibility between embedding versions, query embeddings, metadata, and ranking behavior is an important production concern not detailed in the article. Likewise, multimodal retrieval can surface visually or semantically similar content that is editorially inappropriate, legally restricted, outdated, or missing necessary rights metadata. Metadata filtering, access controls, human review, and audit trails would be important safeguards for a media archive, though the case study does not describe them in detail.

The strongest transferable lesson is to begin with real user language and operational constraints rather than selecting a model first. The project connected editorial research, segment-level experimentation, asynchronous processing, retrieval infrastructure, and high-availability deployment. For organizations with large audiovisual archives, the pattern is plausible: persist source media, extract and segment content, generate multimodal embeddings asynchronously, store vectors in a managed search system, and keep interactive retrieval independent from backfill and ingestion. The reported results suggest substantial productivity potential for Condé Nast, but a production assessment should supplement them with retrieval-quality measurements, cost and capacity data, freshness and availability objectives, security details, and a controlled comparison against the prior search process.
