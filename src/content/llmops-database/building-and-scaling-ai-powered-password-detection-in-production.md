---
title: "Building and Scaling AI-Powered Password Detection in Production"
slug: "building-and-scaling-ai-powered-password-detection-in-production"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67cb0e65519ffff86c14d557"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:02:32.446Z"
  createdOn: "2025-03-07T15:19:01.588Z"
llmopsTags:
  - "code-generation"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "prompt-engineering"
  - "few-shot"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "monitoring"
  - "cicd"
  - "scaling"
  - "security"
  - "reliability"
  - "scalability"
  - "microsoft-azure"
  - "openai"
industryTags: "tech"
company: "Github"
summary: "Github developed and deployed Copilot secret scanning to detect generic passwords in codebases using AI/LLMs, addressing the limitations of traditional regex-based approaches. The team iteratively improved the system through extensive testing, prompt engineering, and novel resource management techniques, ultimately achieving a 94% reduction in false positives while maintaining high detection accuracy. The solution successfully scaled to handle enterprise workloads through sophisticated capacity management and workload-aware request handling."
link: "https://github.blog/engineering/platform-security/finding-leaked-passwords-with-ai-how-we-built-copilot-secret-scanning/"
year: 2025
seo:
  title: "Github: Building and Scaling AI-Powered Password Detection in Production - ZenML LLMOps Database"
  description: "Github developed and deployed Copilot secret scanning to detect generic passwords in codebases using AI/LLMs, addressing the limitations of traditional regex-based approaches. The team iteratively improved the system through extensive testing, prompt engineering, and novel resource management techniques, ultimately achieving a 94% reduction in false positives while maintaining high detection accuracy. The solution successfully scaled to handle enterprise workloads through sophisticated capacity management and workload-aware request handling."
  canonical: "https://www.zenml.io/llmops-database/building-and-scaling-ai-powered-password-detection-in-production"
  ogTitle: "Github: Building and Scaling AI-Powered Password Detection in Production - ZenML LLMOps Database"
  ogDescription: "Github developed and deployed Copilot secret scanning to detect generic passwords in codebases using AI/LLMs, addressing the limitations of traditional regex-based approaches. The team iteratively improved the system through extensive testing, prompt engineering, and novel resource management techniques, ultimately achieving a 94% reduction in false positives while maintaining high detection accuracy. The solution successfully scaled to handle enterprise workloads through sophisticated capacity management and workload-aware request handling."
---

## Overview

GitHub developed Copilot secret scanning, an AI-powered feature within GitHub Secret Protection that detects generic passwords in users' codebases. This case study provides valuable insights into the end-to-end process of building, testing, iterating, and scaling an LLM-based production system for security-critical applications. The feature was announced for general availability in October 2024, following extensive private and public preview phases.

The core problem GitHub aimed to solve was the detection of generic passwords—a task that traditional regular expression-based approaches struggled with due to the varied and unpredictable structures of user-created passwords. While regex works well for provider-minted secrets with strict formats, it generates excessive noise (false positives) when applied to generic passwords, creating alert fatigue for security teams and developers.

## Technical Architecture

At the heart of Copilot secret scanning is an LLM request structured through a carefully crafted prompt. The prompt includes general information about the type of vulnerability being detected (passwords), the source code location and contents of the file where the vulnerability may exist, and a strict JSON format specification for the model output to enable automated processing. This structured output approach is a common LLMOps pattern for ensuring reliable integration with downstream systems.

The initial implementation used GPT-3.5-Turbo with few-shot prompting—a technique that provides the model with example inputs and outputs to demonstrate the expected task behavior. This was chosen as a resource-effective model that could run detections at scale. However, the team quickly discovered limitations during the private preview phase.

## Evaluation Framework Development

A critical component of this LLMOps implementation was the development of a robust offline evaluation framework. Initially, the team created manually curated test cases with both positive and negative findings to validate their approach before customer deployment. This proved insufficient when the model failed on unconventional file types and structures not typically seen in standard programming languages.

The team enhanced their evaluation framework in several key ways:

- **Incorporating real-world feedback:** Reports from private preview participants were added to increase the diversity of test cases, ensuring the evaluation set represented actual production scenarios rather than idealized examples.

- **Visual deviation analysis:** The framework was enhanced to allow visual identification and analysis of deviations resulting from model or prompt changes, enabling the team to better understand the impact of different modifications to their prompting strategy.

- **Synthetic test case generation:** Leveraging GPT-4, the team created additional test cases based on learnings from existing secret scanning alerts in open source repositories. This represents an interesting meta-use of LLMs—using one model to generate evaluation data for another.

The evaluation framework measured both precision (ability to find secrets accurately with low false positive rates) and recall (ability to find secrets reliably with low false negative rates), allowing the team to make informed trade-offs during development.

## Prompt Engineering and Model Experimentation

The team conducted extensive experimentation to improve detection quality, exploring multiple dimensions of the problem:

**Model selection:** They experimented with different models including GPT-3.5-Turbo, GPT-4, GPT-4-Turbo, and GPT-4o-mini. A notable finding was that using GPT-4 as a confirming scanner to validate candidates found by GPT-3.5-Turbo improved precision without reducing recall, though at higher resource cost.

**Voting mechanisms:** The team tried asking the model the same question multiple times and combining responses, which produced more deterministic responses but had no material impact on precision.

**Prompting strategies:** Multiple prompting techniques were evaluated including Fill-in-the-Middle, Zero-Shot, and Chain-of-Thought. Through collaboration with Microsoft colleagues, they implemented MetaReflection, described as a novel offline reinforcement learning technique that uses experiential learnings from past trials to develop a hybrid Chain-of-Thought and few-shot prompt. This approach improved precision with only a small penalty in recall.

The final solution uses a combination of all these techniques, demonstrating that production LLM systems often require multi-faceted approaches rather than single silver-bullet solutions.

## Scaling and Capacity Management

A significant LLMOps challenge emerged during public preview: managing resources at scale. Secret scanning not only processes incoming Git pushes but also scans entire Git histories across all branches, meaning resource requirements grow linearly with customer adoption.

The team employed multiple strategies to optimize resource usage:

**Content filtering:** They identified and excluded classes of changes unlikely to contain credentials, such as media files or test/mock/spec files, reducing unnecessary LLM calls.

**Model optimization:** Experimentation with newer, more efficient models (GPT-4-Turbo and GPT-4o-mini) was conducted to find options that maintained performance with lower resource costs.

**Context window optimization:** Different context window sizes were tested to find a balance between resource consumption and latency.

**Tokenization improvements:** The team implemented memory-efficient tokenization that retained information from previous tokenizations while processing new file portions.

The most impactful change was the development of a workload-aware request management system. The team observed that assigning static rate limits to individual workloads (like scanning incoming commits versus full history scans) was suboptimal because different workloads have different traffic patterns—commits correlate with working hours while full history scans correlate with feature enablement events. This led to situations where one workload hit rate limits while resources allocated to other workloads sat unused.

Drawing inspiration from existing solutions like Doorman and GitHub's Freno, along with weighted fair-priority queue algorithms, the team developed an algorithm that sets a range of limits for each workload. This prevents any workload from overwhelming the LLM while allowing it to utilize unused resources from other workloads. The strategy proved so effective that it was adopted by Copilot Autofix and security campaigns as well.

## Mirror Testing for Production Validation

Before general availability, the team implemented a mirror testing framework that ran their prompt and filtering changes against a subset of repositories participating in the public preview. This approach allowed them to assess changes in real alert volumes and false positive resolutions without impacting actual users.

The mirror testing revealed significant improvements: in some cases, a 94% reduction in false positives across organizations, with very few missed real passwords. This before-and-after comparison validated that the iterative improvements during private and public preview led to increased precision without sacrificing recall.

## Key Lessons and Ongoing Operations

The team distilled several key learnings applicable to LLMOps broadly:

- **Precision as primary goal:** For security applications, reducing alert noise is critical. Teams need accurate, actionable alerts, not comprehensive but noisy ones.

- **Diverse test case coverage:** The evaluation framework must incorporate diverse examples based on real-world customer feedback, not just idealized test cases.

- **Resource management:** Scalability must be balanced with performance through intelligent resource allocation rather than simple scaling.

- **Collaborative innovation:** Partnerships with other teams (in this case, Microsoft) help push capabilities forward.

The feature now runs on nearly 35% of all GitHub Secret Protection repositories. The team continues to monitor performance, conduct mirror testing, and refine detection capabilities based on customer feedback and detection trends. This ongoing operational commitment is typical of production LLM systems, which require continuous monitoring and iteration rather than one-time deployment.

## Balanced Assessment

This case study provides a transparent view into the challenges of deploying LLMs for security-critical applications. The acknowledgment that initial deployments "failed spectacularly in some customer repositories" and that LLMs have "limiting nature" when dealing with unconventional file formats demonstrates honest assessment of LLM capabilities. The 94% false positive reduction figure, while impressive, is described as applying to "some organizations" rather than being universal, suggesting varying results across different contexts.

The case study is notably light on specific metrics around recall (false negative rates), focusing primarily on precision improvements. For a security application, understanding how many real passwords are missed would be valuable context that isn't fully provided. Additionally, the specific computational costs and latency characteristics of the production system aren't disclosed, making it difficult to fully assess the resource efficiency claims.