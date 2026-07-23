---
title: "Execution Graph-Based Anomaly Detection and Automated Remediation in Payment Processing"
slug: "execution-graph-based-anomaly-detection-and-automated-remediation-in-payment-processing"
draft: false
llmopsTags:
  - "fraud-detection"
  - "realtime-application"
  - "latency-optimization"
  - "error-handling"
  - "fallback-strategies"
  - "kubernetes"
  - "monitoring"
  - "microservices"
  - "scaling"
industryTags: "finance"
company: "JP Morgan Chase"
summary: "JP Morgan Chase's payments team implemented an execution graph-based system to detect anomalies and drifts in their real-time payment processing infrastructure. The system represents request processing as directed acyclic graphs (DAGs), establishing baselines for normal behavior and using statistical methods to identify structural changes, scale deviations, and performance degradations. By leveraging OpenTelemetry for telemetry data collection and stream processing for analysis, the solution identifies where issues occur in multi-node service architectures and automates remediation actions based on drift categorization. The approach significantly reduced mean time to discovery by enabling real-time detection within single time windows rather than waiting for multiple monitoring periods, while minimizing false alarms through fine-tuned thresholds and client-specific baselines."
link: "https://www.youtube.com/watch?v=u1yaOeEX4e8"
year: 2026
seo:
  title: "JP Morgan Chase: Execution Graph-Based Anomaly Detection and Automated Remediation in Payment Processing - ZenML LLMOps Database"
  description: "JP Morgan Chase's payments team implemented an execution graph-based system to detect anomalies and drifts in their real-time payment processing infrastructure. The system represents request processing as directed acyclic graphs (DAGs), establishing baselines for normal behavior and using statistical methods to identify structural changes, scale deviations, and performance degradations. By leveraging OpenTelemetry for telemetry data collection and stream processing for analysis, the solution identifies where issues occur in multi-node service architectures and automates remediation actions based on drift categorization. The approach significantly reduced mean time to discovery by enabling real-time detection within single time windows rather than waiting for multiple monitoring periods, while minimizing false alarms through fine-tuned thresholds and client-specific baselines."
  canonical: "https://www.zenml.io/llmops-database/execution-graph-based-anomaly-detection-and-automated-remediation-in-payment-processing"
  ogTitle: "JP Morgan Chase: Execution Graph-Based Anomaly Detection and Automated Remediation in Payment Processing - ZenML LLMOps Database"
  ogDescription: "JP Morgan Chase's payments team implemented an execution graph-based system to detect anomalies and drifts in their real-time payment processing infrastructure. The system represents request processing as directed acyclic graphs (DAGs), establishing baselines for normal behavior and using statistical methods to identify structural changes, scale deviations, and performance degradations. By leveraging OpenTelemetry for telemetry data collection and stream processing for analysis, the solution identifies where issues occur in multi-node service architectures and automates remediation actions based on drift categorization. The approach significantly reduced mean time to discovery by enabling real-time detection within single time windows rather than waiting for multiple monitoring periods, while minimizing false alarms through fine-tuned thresholds and client-specific baselines."
notion:
  pageId: "3a6f8dff-2538-809b-9999-c00be7046baa"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-23T08:32:00.000Z"
  lastEditedTime: "2026-07-23T08:32:00.000Z"
  publishedAt: "2026-07-23T08:57:41Z"
---

## Overview

JP Morgan Chase's payments team developed a sophisticated monitoring and automated remediation system centered on execution graphs to detect anomalies and performance drifts in their payment processing infrastructure. The presenter, Ritik, who leads the payments team, describes how the system moves beyond traditional persistence graphs and property graphs to utilize short-lived execution graphs that holistically represent request processing flows and automatically detect deviations from expected behavior.

The use case focuses on the critical challenge of maintaining performance and reliability in real-time payment processing systems where milliseconds matter. The system handles requests flowing through multiple layers including edge layers, gateways, Kubernetes ingress controllers, authentication and authorization services, orchestration layers, and various parallel processing services. The complexity of this multi-node architecture makes it challenging to quickly identify where performance degradations occur and what actions should be taken to remediate them.

## Technical Architecture and Approach

The core innovation lies in representing the entire request processing flow as directed acyclic graphs (DAGs). Each request's journey through the system is modeled as a graph where nodes represent individual services or processing steps, and edges represent the flow of execution and context passing between services. This DAG representation provides several key advantages: it establishes a clear execution order, tracks what context exists at each node and what gets passed downstream, and makes the overall request flow explicit and analyzable.

The system operates on a tiered detection approach, similar to airport security screening. The first tier performs rapid baseline comparison against known good request execution patterns. If the request processing matches the expected baseline within acceptable tolerance, no further analysis is needed, conserving computational resources. Only when deviations are detected does the system move to deeper tiers of analysis to determine the nature of the problem and appropriate remediation.

OpenTelemetry serves as the telemetry collection mechanism, feeding trace data from all nodes in the payment processing pipeline. This data flows asynchronously to avoid impacting the performance of actual payment processing, which is critical for real-time operations. The architecture employs Kafka for stream processing, with two distinct processing paths: a hot path for rapid decision-making and automated responses, and a cold path for more thorough reconciliation and analysis that trades speed for accuracy.

## Baseline Modeling and Client-Specific Behavior

A sophisticated aspect of the system is its recognition that different request types and clients have fundamentally different performance characteristics. The system establishes baseline behaviors that are context-aware and client-specific. For example, requests from Client A might normally complete in one timeframe while Client B's requests take longer due to geographic location requiring additional validation steps or currency conversion. Rather than using a single global threshold that would generate excessive false positives, the system maintains granular baselines.

This granularity extends to the type of operation as well. The system differentiates between baselines for different payment types such as real-time payments versus wire payments, rather than treating all POST requests identically. This fine-grained baseline approach significantly reduces noise in alerts and enables more accurate anomaly detection.

## Drift Detection and Categorization

The system distinguishes between anomalies and drifts. Anomalies represent one-time deviations from expected behavior, such as a request taking longer than usual due to temporary network congestion or a transient issue. Drifts represent systematic changes in behavior patterns over time that indicate the baseline itself needs updating. The presentation uses the analogy of a commute that normally takes one hour but suddenly takes longer one day versus a commute that has gradually increased to consistently take 20 minutes longer over the course of a year.

The system categorizes drifts into three primary types. Structural drifts occur when new nodes are added to or removed from the processing pipeline. For instance, if a new membership check step is introduced at a service layer, this changes the fundamental structure of the execution graph. The system detects these structural changes by comparing the graph topology against expected patterns. Scale drifts happen when existing services can no longer handle the volume of requests at previous performance levels, indicating a need for horizontal scaling or architectural changes like making certain calls asynchronous. Covariate drifts occur when the distribution of request types changes without any system modification—for example, if international requests increase from 40% to a much higher percentage of total traffic, the overall average request time will naturally increase due to the additional currency conversion and validation steps required for international transactions.

Each drift category requires different remediation strategies. Structural drifts may necessitate baseline updates to incorporate new processing steps or investigate why steps were removed. Scale drifts might trigger autoscaling policies or architectural refactoring decisions. Covariate drifts may require establishing separate baselines for different request categories or adjusting global thresholds to reflect the new request distribution.

## Anomaly Detection Techniques and Challenges

The system employs statistical methods for drift detection, specifically mentioning Maximum Mean Discrepancy (MMD) and Kullback-Leibler divergence as techniques for identifying when current behavior has diverged from established baselines. The approach was benchmarked using OpenTelemetry and a benchmarking tool called star bench, injecting millions of traces over seven-day periods and deliberately introducing anomalies to train the detection system before live deployment.

Several challenges required careful engineering to avoid false positives. One significant issue is delayed telemetry from individual nodes. If one of seven services in a processing pipeline delays sending its telemetry data, the monitoring system might incorrectly interpret this as a structural change where that service was removed from the flow. The system needed fine-tuning to distinguish between genuinely missing services and delayed reporting. The solution involves using tail-based sampling and analysis, tracking when service requests start and when they complete, rather than assuming missing data means structural changes.

Cold start scenarios present another challenge. When new endpoints are deployed or new request patterns emerge, the system needs to recognize these as requiring new baseline establishment rather than treating them as deviations from existing patterns. The system addresses this through awareness of deployment events and careful labeling strategies that help distinguish between different request types from the outset.

## Automated Remediation and Risk Management

Once the system identifies the type of drift and localizes where in the processing pipeline the issue occurs, it can move toward automated remediation. However, the system incorporates risk assessment before taking automated actions. When a remediation strategy is identified, the system evaluates the risk of implementing that solution. For lower-risk changes, automated rollout might begin with 5-10% of nodes, with monitoring to verify the solution is effective before expanding to 100% of the infrastructure.

The presentation emphasizes that automated decisions must be well-explained. Using the analogy of a doctor telling a patient their health score is 22 without context, the system ensures that all data and decisions are explainable, enabling operators to understand why certain actions were taken and make informed decisions about whether to allow automation to proceed or intervene manually.

## Production Results and Operational Impact

The system achieved significant improvements in mean time to discovery (MTTD) of issues. By enabling real-time detection within single monitoring windows rather than requiring comparison across multiple time windows, problems can be identified and addressed much faster. This is particularly critical in payment processing where delays directly impact customer experience and business operations.

The reduction in false alarms through client-specific and operation-specific baselines means that engineering teams can focus on genuine issues rather than investigating noise. The system's awareness of deployment events helps avoid spurious alerts during known change windows, while still maintaining vigilance for unexpected behavior.

## System Design Considerations

The architecture emphasizes asynchronous data collection to ensure that monitoring overhead doesn't impact the performance of actual payment processing. This is achieved through the OpenTelemetry instrumentation feeding data to Kafka streams for analysis separate from the critical payment path.

Labeling strategy emerged as crucial for effective operation. While labels enable fine-grained analysis and categorization, the system requires careful tuning to ensure labels are meaningful and applied consistently across the infrastructure. The granularity of baselines—establishing them per payment type, per client category, and per operation rather than using overly broad categories—proved essential for reducing noise.

Window definitions for considering structural changes or other drift types need to be well-defined and potentially customized per client or request type. This prevents premature conclusions about system behavior based on insufficient data while still enabling rapid detection of genuine issues.

The system must maintain awareness of deployment pipelines and new rollouts. Integration with deployment systems allows the anomaly detection to contextualize behavior changes, distinguishing between expected deviations from new deployments that might need rollback versus unexpected issues requiring investigation.

## Broader Implications

While the presentation focuses primarily on statistical and graph-based approaches rather than explicitly machine learning or LLM-based techniques, it represents sophisticated production monitoring and automated operations that create the foundation for more advanced AI-driven operations. The system demonstrates mature thinking about baseline modeling, drift detection, automated remediation with risk management, and the importance of explainability—all critical concerns for production AI systems.

The execution graph approach provides a structured representation of complex distributed system behavior that could potentially be extended with more advanced AI techniques for prediction, root cause analysis, and remediation strategy selection. The emphasis on categorizing drifts and understanding their root causes demonstrates the kind of structured reasoning about system behavior that modern AI operations requires.

The case represents production operations at scale in a highly regulated, mission-critical environment where payment processing requires both extreme reliability and performance. The lessons around avoiding false positives, maintaining client-specific baselines, and carefully managing automated actions with risk assessment are directly applicable to LLMOps and AI operations more broadly, where similar challenges of monitoring complex, multi-component systems and automating responses while managing risk are paramount.
