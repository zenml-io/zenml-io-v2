---
title: "Implementing LLMOps in Restricted Networks with Long-Running Evaluations"
slug: "implementing-llmops-in-restricted-networks-with-long-running-evaluations"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67d81dc34182456017e363e3"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:03:44.281Z"
  createdOn: "2025-03-17T13:04:03.803Z"
llmopsTags:
  - "high-stakes-application"
  - "regulatory-compliance"
  - "legacy-system-integration"
  - "prompt-engineering"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "docker"
  - "cicd"
  - "monitoring"
  - "api-gateway"
  - "devops"
  - "continuous-deployment"
  - "continuous-integration"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "fastapi"
  - "microsoft-azure"
industryTags: "tech"
company: "Microsoft"
summary: "A case study detailing Microsoft's experience implementing LLMOps in a restricted network environment using Azure Machine Learning. The team faced challenges with long-running evaluations (6+ hours) and network restrictions, developing solutions including opt-out mechanisms for lengthy evaluations, implementing Git Flow for controlled releases, and establishing a comprehensive CI/CE/CD pipeline. Their approach balanced the needs of data scientists, engineers, and platform teams while maintaining security and evaluation quality."
link: "https://devblogs.microsoft.com/ise/llmops-in-restricted-networks-and-continuous-evaluation-long-run-constraints/"
year: 2025
seo:
  title: "Microsoft: Implementing LLMOps in Restricted Networks with Long-Running Evaluations - ZenML LLMOps Database"
  description: "A case study detailing Microsoft's experience implementing LLMOps in a restricted network environment using Azure Machine Learning. The team faced challenges with long-running evaluations (6+ hours) and network restrictions, developing solutions including opt-out mechanisms for lengthy evaluations, implementing Git Flow for controlled releases, and establishing a comprehensive CI/CE/CD pipeline. Their approach balanced the needs of data scientists, engineers, and platform teams while maintaining security and evaluation quality."
  canonical: "https://www.zenml.io/llmops-database/implementing-llmops-in-restricted-networks-with-long-running-evaluations"
  ogTitle: "Microsoft: Implementing LLMOps in Restricted Networks with Long-Running Evaluations - ZenML LLMOps Database"
  ogDescription: "A case study detailing Microsoft's experience implementing LLMOps in a restricted network environment using Azure Machine Learning. The team faced challenges with long-running evaluations (6+ hours) and network restrictions, developing solutions including opt-out mechanisms for lengthy evaluations, implementing Git Flow for controlled releases, and establishing a comprehensive CI/CE/CD pipeline. Their approach balanced the needs of data scientists, engineers, and platform teams while maintaining security and evaluation quality."
---

## Overview

This case study from Microsoft's ISE (Industry Solutions Engineering) team documents a real-world engagement implementing LLMOps practices for a Large Language Model chat application in a highly restricted network environment. The engagement highlights the practical challenges that organizations face when deploying LLM applications in enterprise settings with strict security requirements, and provides detailed solutions for managing continuous evaluation in production pipelines.

The customer was using Azure Machine Learning (AML) for the first time in their environment, which added complexity to the implementation. The LLM application was developed using Prompt Flow, Microsoft's framework for building LLM-powered applications, and the team established automated pipelines for evaluation and deployment within the constraints of a private network infrastructure.

## Network Architecture Challenges

The engagement took place within a private network operating entirely on private IPs within an Azure Virtual Network. This design pattern is common in enterprise environments with strict security requirements. The network was divided into subnets with resources allocated based on their roles and functionalities. Network Security Groups (NSGs) enforced whitelisting rules, allowing only trusted IPs or specific resources to connect. Critically, the network had no public IPs whatsoever, relying entirely on private endpoints or secure tunnels like VPN gateways for any external access.

This restricted network architecture created several specific challenges for the LLMOps implementation. The pfazure SDK, which is designed to be generic, had issues resolving the compute/runtime host until the Fully Qualified Domain Name (FQDN) was properly configured. The team also discovered that AML managed endpoints did not work properly with the private network and integrated services, forcing them to fall back to Docker packaging of the Prompt Flow and deploying to Azure Web App instead. Additionally, blob storage and other Azure resources needed to be resolved to private IPs, which required explicit no-proxy configurations in the pipeline scripts.

The process of obtaining permissions for the Service Principal to access AML and other resources was notably lengthy due to customer-specific security requirements. This is a common friction point in enterprise LLM deployments that is often underestimated in planning phases.

## Pipeline Architecture

The team established a comprehensive three-stage pipeline consisting of Continuous Integration (CI), Continuous Evaluation (CE), and Continuous Deployment (CD).

### Continuous Integration

The CI stage focused on code quality and basic validation. This included code quality checks, unit tests, and syntactic validation of the Prompt Flow using sample data. The CI checks ran on every pull request to ensure that basic code standards were maintained before any merging occurred.

### Continuous Evaluation

The CE stage was more comprehensive and included environment setup, synthetic data preparation for evaluation, node-level evaluation of the Prompt Flow components, node-level evaluation metrics collection, end-to-end flow simulation and evaluation, and registration of the Prompt Flow in Azure ML. This stage was where the bulk of the LLM-specific validation occurred.

### Continuous Deployment

The CD stage handled the actual deployment process. The Prompt Flow was versioned and containerized using Docker, with the image pushed to Azure Container Registry. The containerized application was then deployed to Azure Web App, followed by smoke tests on a test dataset. The team also established endpoint monitoring for health checks and performance monitoring for response time and latency metrics.

## Git Flow Branching Strategy

The team adopted Git Flow as their branching strategy, which proved particularly effective for managing the collaboration between Data Scientists, Engineers, and Platform teams. Three main branches were used: develop (the gatekeeping branch for feature integration), feature branches (following a naming convention of developer-name/issue-id-feature-name), and main (the deployment trigger branch).

The benefits of this approach included organized work through clear branch types, efficient testing at different stages, and multi-version support using semantic versioning. However, the team acknowledged that Git Flow can overcomplicate and slow the development process for simpler products, and that hotfixes and bug fixes must follow the full flow, which can delay urgent deployments.

## The Long-Running Evaluation Challenge

One of the most significant operational challenges was the end-to-end evaluation run, which took approximately 6 hours to complete. This evaluation ran a very large set of simulated data through a detailed evaluation flow. Running this for every commit or every release would create significant bottlenecks in the deployment pipeline.

The Data Science team recognized that this comprehensive E2E evaluation was not necessary for every change. For example, a simple bug fix should not require waiting 6 hours for deployment. This insight led to the development of a configuration-driven approach to evaluation runs.

## PR Label-Based Opt-Out Mechanism

The solution implemented was an opt-out flag system using pull request labels. When creating a PR to the main branch, the person creating the PR could assign a "skip-e2e-evaluation" label to signal that the comprehensive evaluation should be skipped.

The system worked as follows: when the opt-out flag (label) was present, the long-running E2E evaluation flow was not executed as part of the CE pipeline. When the label was absent, the full evaluation would run. This gave teams explicit control over whether to run the comprehensive evaluation based on the nature of the changes being deployed.

To prevent bottlenecks while still maintaining quality gates, the team implemented a dual-evaluation approach. A minimal dataset end-to-end run (~30 minutes) was executed before every development deployment, ensuring basic functionality. The complete dataset evaluation (~6 hours) was executed in parallel with the development deployment and had the opt-out option based on the PR label.

The implementation used GitHub Actions with the `actions/github-script` action to detect PR labels and determine whether to run the full evaluation. The script retrieved the PR number associated with a commit, then checked for the presence of the skip label, returning a boolean that controlled the pipeline flow.

## Trade-offs and Considerations

The team documented both the advantages and limitations of this approach with admirable transparency.

### Advantages

The labeled PR mechanism provided a clear, explicit trigger that reduced ambiguity and ensured important steps were not missed. The automation potential allowed integration of label detection into the CI/CD pipeline, speeding up the overall evaluation cycle. Testing efforts could be focused specifically on PRs marked for comprehensive evaluation, optimizing resource utilization. Labels provided visibility to all team members about a PR's status and testing requirements, aiding in tracking and accountability.

### Limitations

Team members needed to be informed and trained on the labeling system and its importance, requiring ongoing adoption efforts. The ability to opt-out might be misused or prone to human error, potentially leading to skipped evaluations that could compromise stability. Managing labels and their associated automation created maintenance overhead, especially when multiple labels are in use.

### Mitigations

To prevent misuse of the opt-out mechanism, the team implemented a PR template with a checklist ensuring the Data Science team or other stakeholders were informed when the evaluation was skipped. This created accountability and visibility around the decision to skip comprehensive testing.

## Technical Decisions and Trade-offs

The team made several pragmatic decisions during implementation. Although the llmops-promptflow-template samples from Microsoft worked after FQDN configuration, the team decided to perform AML flow validations via command line instead. This decision was made to keep the pipeline lightweight and reduce maintenance burden on the platform side.

Links to metrics and AML jobs for end-to-end component validations were provided in pipeline summaries for manual validation by data scientists before promoting changes to the next stages. This hybrid automated/manual approach acknowledged that not all validation can or should be fully automated, particularly for LLM applications where human judgment on output quality may be necessary.

## Continuous Evaluation Scheduling Considerations

The case study provides guidance on CE scheduling options. Continuous scheduling is suitable for projects with frequent commits and high collaboration, offering immediate feedback but being resource-intensive. On-demand scheduling works best for projects with infrequent updates or when manual triggering is preferred. Timer-based scheduling (such as nightly builds) is ideal for projects requiring periodic updates with predictable workflows.

Factors influencing CE frequency include codebase activity level, available CI/CD infrastructure resources, testing requirements and duration, and alignment with deployment cycles. High-activity repositories benefit from continuous or frequent CE runs, while extensive or time-consuming tests may push toward less frequent or on-demand runs to optimize resource usage.

## Conclusions and Lessons Learned

This engagement demonstrates the importance of flexibility, automation, and strategic decision-making when operating LLMOps in restricted network environments. The systematic approach with structured branching and strategic CE runs helped manage complex dependencies and collaborations among data scientists, engineers, and platform teams.

Key takeaways include the need for careful network configuration when using Azure ML in private network environments, the value of making long-running evaluations configuration-driven rather than mandatory, and the importance of establishing clear communication and accountability mechanisms around opt-out capabilities. The case study also highlights that enterprise LLM deployments often require significant workarounds and whitelisting efforts that can extend timelines significantly beyond initial estimates.