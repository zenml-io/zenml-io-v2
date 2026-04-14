---
title: "Revisiting Reliability in Large-Scale Machine Learning Research Clusters"
slug: "meta-fblearner-flow-orchestration-evolution-revisiting-reliability-in-large-scale-machine-learning-research-clusters"
draft: false
mlopsTags:
  - "compute-management"
  - "experiment-tracking"
  - "monitoring"
  - "kubernetes"
  - "training"
industryTags: "media-entertainment"
company: "Meta"
companySlug: "meta"
platformName: "FBLearner Flow + orchestration evolution"
contentType: "paper"
summary: "Meta conducted a comprehensive reliability analysis of two large-scale, multi-tenant machine learning research clusters to understand and address failure patterns in AI infrastructure at scale. The research examined 11 months of operational data spanning 4 million jobs and over 150 million A100 GPU hours, revealing that while large jobs are most vulnerable to failures, smaller jobs constitute the majority of workloads and should inform optimization strategies. The team developed a taxonomy of failures, introduced key reliability metrics including Mean Time to Failure projections for various GPU scales, and proposed methods to estimate Effective Training Time Ratio as a function of job parameters. Their findings emphasize the need for flexible, workload-agnostic, and reliability-aware infrastructure, system software, and algorithms to push the boundaries of ML training at scale."
link: "https://ai.meta.com/research/publications/revisiting-reliability-in-large-scale-machine-learning-research-clusters/"
year: 2025
seo:
  title: "Meta: Revisiting Reliability in Large-Scale Machine Learning Research Clusters - ZenML MLOps Database"
  description: "Meta conducted a comprehensive reliability analysis of two large-scale, multi-tenant machine learning research clusters to understand and address failure patterns in AI infrastructure at scale. The research examined 11 months of operational data spanning 4 million jobs and over 150 million A100 GPU hours, revealing that while large jobs are most vulnerable to failures, smaller jobs constitute the majority of workloads and should inform optimization strategies. The team developed a taxonomy of failures, introduced key reliability metrics including Mean Time to Failure projections for various GPU scales, and proposed methods to estimate Effective Training Time Ratio as a function of job parameters. Their findings emphasize the need for flexible, workload-agnostic, and reliability-aware infrastructure, system software, and algorithms to push the boundaries of ML training at scale."
  canonical: "https://www.zenml.io/mlops-database/meta-fblearner-flow-orchestration-evolution-revisiting-reliability-in-large-scale-machine-learning-research-clusters"
  ogTitle: "Meta: Revisiting Reliability in Large-Scale Machine Learning Research Clusters - ZenML MLOps Database"
  ogDescription: "Meta conducted a comprehensive reliability analysis of two large-scale, multi-tenant machine learning research clusters to understand and address failure patterns in AI infrastructure at scale. The research examined 11 months of operational data spanning 4 million jobs and over 150 million A100 GPU hours, revealing that while large jobs are most vulnerable to failures, smaller jobs constitute the majority of workloads and should inform optimization strategies. The team developed a taxonomy of failures, introduced key reliability metrics including Mean Time to Failure projections for various GPU scales, and proposed methods to estimate Effective Training Time Ratio as a function of job parameters. Their findings emphasize the need for flexible, workload-agnostic, and reliability-aware infrastructure, system software, and algorithms to push the boundaries of ML training at scale."
mlops:
  source: "sqlite"
  entryId: 157
  sourceUrl: "https://ai.meta.com/research/publications/revisiting-reliability-in-large-scale-machine-learning-research-clusters/"
  exportedAt: "2026-04-14T12:26:23Z"
  createdAt: "2026-02-05T15:40:56.615335"
  lastUpdated: "2026-04-14 10:01:48"
---

## Problem Context

Operating large-scale machine learning infrastructure presents fundamental reliability challenges that become increasingly acute as model sizes and training clusters continue to grow. Despite decades of research on infrastructure failures, the ML community lacks clear understanding of how job failures impact workloads across different scales in production environments. Meta identified several critical gaps in existing knowledge: the relationship between job size and failure vulnerability, the relative importance of optimizing for large versus small jobs in multi-tenant environments, and the ability to predict and model failure rates at various GPU scales.

The motivation for this research stems from the operational reality of running state-of-the-art AI supercomputer clusters where reliability directly impacts researcher productivity, resource utilization, and the feasibility of training frontier models. As training runs scale to thousands of GPUs and consume weeks or months of compute time, even small improvements in reliability translate to significant gains in effective training capacity. The challenge is compounded in multi-tenant research environments where diverse workload characteristics, from small experimental jobs to massive production training runs, must coexist on shared infrastructure.

Meta's research addresses the tension between optimizing for the most resource-intensive jobs versus the most numerous jobs. While large-scale training runs represent the headline use cases and consume the most GPU hours, smaller jobs make up the majority of submitted workloads and play crucial roles in research workflows including experimentation, hyperparameter tuning, and model validation. Understanding this distribution and its implications for reliability engineering became a central focus of their analysis.

## Architecture & Design

The research analyzes two distinct large-scale ML clusters at Meta, both designed as multi-tenant research environments supporting diverse workloads. These clusters represent state-of-the-art AI infrastructure purpose-built for training large language models and other frontier AI systems. The architecture supports concurrent execution of thousands of jobs with varying resource requirements, from single-GPU experimental runs to multi-thousand GPU training sessions.

The cluster infrastructure is built around NVIDIA A100 GPUs, representing one of the most advanced accelerator platforms available during the study period. The systems are designed to support both data parallelism and model parallelism strategies, enabling researchers to scale training across hundreds or thousands of GPUs for large model development. The multi-tenant nature requires sophisticated scheduling, resource allocation, and isolation mechanisms to ensure fair sharing while maintaining high utilization rates.

Meta's analysis framework introduces a taxonomy of failures that categorizes the various ways jobs can fail in production clusters. This taxonomy distinguishes between hardware failures, software failures, network issues, and job-level problems, providing a structured approach to understanding and addressing reliability issues. The framework also establishes key reliability metrics tailored to ML workloads, recognizing that traditional infrastructure reliability measures may not capture the unique characteristics of training jobs.

The research team developed analytical models to project Mean Time to Failure (MTTF) as a function of GPU scale, enabling predictions about how failure rates scale with cluster size. This modeling approach provides a quantitative foundation for capacity planning and reliability engineering decisions. Additionally, they proposed methods to estimate Effective Training Time Ratio, a metric that captures the proportion of allocated time that actually contributes to training progress after accounting for failures, checkpointing overhead, and recovery time.

## Technical Implementation

The analysis is based on production telemetry data collected over 11 months of operation from two separate ML research clusters at Meta. This dataset encompasses approximately 4 million jobs representing diverse workload patterns, research objectives, and resource requirements. The total compute capacity analyzed exceeds 150 million A100 GPU hours, providing unprecedented visibility into reliability patterns at scale.

The research methodology involves statistical analysis of job completion rates, failure patterns, and their correlation with various job characteristics including GPU count, job duration, framework choice, and model architecture. The team fitted failure models to historical data, using regression techniques to project MTTF at various scales and identify which factors most strongly predict job failures.

Meta's approach to estimating Effective Training Time Ratio combines empirical measurement with analytical modeling. By tracking actual training progress relative to wall-clock time, accounting for checkpoint frequency, checkpoint duration, failure rates, and recovery overhead, they developed a predictive model that can estimate this metric for arbitrary job configurations. This enables researchers to make informed decisions about checkpoint frequency, fault tolerance strategies, and resource allocation before launching expensive training runs.

The implementation includes monitoring and instrumentation throughout the software stack to capture failure events, their root causes, and their impact on job completion. This telemetry infrastructure provides the data foundation for both operational incident response and longer-term reliability analysis. The team developed automated analysis pipelines to process this telemetry data, identify patterns, and generate insights about failure distributions across different job sizes and characteristics.

## Scale & Performance

The scale of Meta's analysis provides unique insights into reliability at production ML infrastructure levels. Over 11 months, the two clusters processed approximately 4 million jobs, representing an enormous diversity of workloads from exploratory research to production model training. The total compute capacity analyzed exceeded 150 million A100 GPU hours, placing this among the largest empirical studies of ML infrastructure reliability.

The research reveals critical patterns about failure rates and their relationship to job scale. While specific MTTF numbers vary with GPU count and job configuration, the fitted models demonstrate how failure probability increases with the number of GPUs involved in a training job. Large jobs running across thousands of GPUs face fundamentally different reliability challenges than small single-GPU experiments, with their exposure to hardware, network, and software failures increasing proportionally with resource footprint.

A key finding concerns the distribution of job sizes within the clusters. Despite the prominence of large-scale training runs in public discourse, smaller jobs constitute the majority of submitted workloads. This distribution has important implications for optimization priorities - while improving reliability for large jobs yields higher absolute GPU hour savings, improvements that benefit all job sizes impact more users and more workflows. The research quantifies this trade-off, providing data-driven guidance for reliability investment decisions.

The Effective Training Time Ratio metric captures the real-world impact of failures on training efficiency. This ratio accounts for time lost to failures, checkpoint overhead, recovery processes, and other reliability-related inefficiencies. By modeling this metric as a function of job parameters, Meta enables researchers to predict how configuration choices will impact actual training throughput before committing resources.

The analysis identifies workload properties that correlate with reliability outcomes, comparing patterns across the two distinct clusters to identify which findings generalize versus which are cluster-specific. This cross-cluster comparison provides confidence that observed patterns reflect fundamental characteristics of large-scale ML training rather than artifacts of particular infrastructure implementations.

## Trade-offs & Lessons

Meta's research reveals fundamental trade-offs in optimizing reliability for multi-tenant ML clusters. The tension between optimizing for large jobs versus small jobs represents a central challenge. Large jobs consume the most GPU hours and face the highest failure rates, making them natural targets for reliability investment. However, small jobs dominate by count and represent the majority of user interactions with the system. The research demonstrates that effective reliability strategies must address both segments, requiring workload-agnostic approaches that benefit jobs across the scale spectrum.

The fitted failure models provide practical tools for projecting reliability at different scales, but they also highlight inherent challenges in scaling ML training. As jobs grow to thousands of GPUs, maintaining acceptable MTTF requires increasingly sophisticated fault tolerance, checkpointing strategies, and recovery mechanisms. The research suggests that pushing to larger scales will require not just incremental improvements but potentially fundamental changes in training algorithms and system software.

The Effective Training Time Ratio modeling approach offers valuable insights for practitioners. By quantifying the relationship between checkpoint frequency, job scale, and actual training throughput, the model enables informed decision-making about fault tolerance strategies. However, the research also reveals that no single checkpoint strategy is optimal across all job sizes and durations - researchers must tune these parameters based on their specific workload characteristics.

Meta's analysis emphasizes the need for flexible, reliability-aware infrastructure that can adapt to diverse workload requirements. Hard-coded assumptions about optimal checkpoint intervals, fault tolerance mechanisms, or recovery strategies fail to serve the full range of jobs running in multi-tenant environments. The research advocates for systems that expose reliability trade-offs to users, providing guidance and defaults while allowing customization for specific use cases.

The cross-cluster comparison reveals both reassuring consistency and important variations. Some failure patterns and reliability characteristics proved consistent across both environments, suggesting fundamental properties of large-scale ML training. Other patterns varied between clusters, highlighting the importance of environment-specific tuning and the danger of over-generalizing from single-cluster studies.

The research identifies key future research directions for improving AI supercomputer reliability. These include developing more sophisticated failure prediction models that can trigger proactive interventions, designing training algorithms with built-in resilience to failures, creating checkpoint and recovery mechanisms with lower overhead, and building scheduling systems that account for reliability characteristics when making placement decisions.

Meta's work provides the ML infrastructure community with both quantitative baselines and conceptual frameworks for reasoning about reliability at scale. The failure taxonomy, reliability metrics, and modeling approaches offer practical tools for operators of large ML clusters. The empirical findings about job size distributions, failure rates, and their relationship to workload characteristics provide data-driven guidance for reliability engineering priorities.

The research ultimately argues for a holistic approach to reliability that spans hardware infrastructure, system software, ML frameworks, and training algorithms. No single layer can solve reliability challenges independently - effective solutions require co-design across the stack with awareness of how components interact. The emphasis on workload-agnostic approaches reflects the reality that multi-tenant research environments must serve diverse use cases, and reliability solutions that optimize for narrow scenarios may underserve the broader community.

For practitioners operating or building large-scale ML infrastructure, Meta's findings offer several actionable insights. Understanding the distribution of job sizes in your environment should inform reliability investment priorities. Developing failure models specific to your infrastructure enables better capacity planning and helps set realistic expectations for training at different scales. Exposing Effective Training Time Ratio metrics to users helps them make informed decisions about checkpoint frequency and fault tolerance strategies. And building flexibility into infrastructure enables adaptation to evolving workload characteristics rather than locking in assumptions that may not hold as model architectures and training techniques evolve.
