---
title: "Automating Search Engine Marketing Ad Generation with Multi-Stage LLM Pipeline"
slug: "automating-search-engine-marketing-ad-generation-with-multi-stage-llm-pipeline"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6887790d826fac541a8b075b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:17:10.919Z"
  createdOn: "2025-07-28T13:20:13.410Z"
llmopsTags:
  - "customer-support"
  - "content-moderation"
  - "classification"
  - "structured-output"
  - "poc"
  - "prompt-engineering"
  - "few-shot"
  - "human-in-the-loop"
  - "a2a"
  - "evals"
  - "system-prompts"
  - "fastapi"
  - "monitoring"
  - "google-gcp"
industryTags: "tech"
company: "Thumbtack"
summary: "Thumbtack faced significant challenges with their manual Search Engine Marketing (SEM) ad creation process, where 80% of ad assets were generic templates across all ad groups, leading to suboptimal performance and requiring extensive manual effort. They developed a multi-stage LLM-powered solution that automates the generation, review, and grouping of Google Responsive Search Ads (RSAs) headlines and descriptions, incorporating specific keywords and value propositions for each ad group. The implementation was rolled out in four phases, with initial proof-of-concept showing 20% increase in traffic and 10% increase in conversions, and the final phase demonstrating statistically significant improvements in click-through rates and conversion value using Google's Drafts and Experiments feature for robust measurement."
link: "https://medium.com/thumbtack-engineering/automating-ad-generations-with-llms-8ac887f02e0a"
year: 2025
seo:
  title: "Thumbtack: Automating Search Engine Marketing Ad Generation with Multi-Stage LLM Pipeline - ZenML LLMOps Database"
  description: "Thumbtack faced significant challenges with their manual Search Engine Marketing (SEM) ad creation process, where 80% of ad assets were generic templates across all ad groups, leading to suboptimal performance and requiring extensive manual effort. They developed a multi-stage LLM-powered solution that automates the generation, review, and grouping of Google Responsive Search Ads (RSAs) headlines and descriptions, incorporating specific keywords and value propositions for each ad group. The implementation was rolled out in four phases, with initial proof-of-concept showing 20% increase in traffic and 10% increase in conversions, and the final phase demonstrating statistically significant improvements in click-through rates and conversion value using Google's Drafts and Experiments feature for robust measurement."
  canonical: "https://www.zenml.io/llmops-database/automating-search-engine-marketing-ad-generation-with-multi-stage-llm-pipeline"
  ogTitle: "Thumbtack: Automating Search Engine Marketing Ad Generation with Multi-Stage LLM Pipeline - ZenML LLMOps Database"
  ogDescription: "Thumbtack faced significant challenges with their manual Search Engine Marketing (SEM) ad creation process, where 80% of ad assets were generic templates across all ad groups, leading to suboptimal performance and requiring extensive manual effort. They developed a multi-stage LLM-powered solution that automates the generation, review, and grouping of Google Responsive Search Ads (RSAs) headlines and descriptions, incorporating specific keywords and value propositions for each ad group. The implementation was rolled out in four phases, with initial proof-of-concept showing 20% increase in traffic and 10% increase in conversions, and the final phase demonstrating statistically significant improvements in click-through rates and conversion value using Google's Drafts and Experiments feature for robust measurement."
---

## Case Study Overview

Thumbtack, a platform connecting customers with local service professionals, implemented a comprehensive LLM-powered solution to automate their Search Engine Marketing (SEM) ad creation process. This case study demonstrates a sophisticated multi-stage LLM pipeline that addresses the challenges of generating personalized, high-quality ad copy at scale while maintaining strict compliance with Google's advertising requirements and character limits.

The company's SEM strategy relied heavily on Google Responsive Search Ads (RSAs), which can contain up to 15 headlines (30 characters each) and 4 descriptions (90 characters each). Prior to the LLM implementation, Thumbtack's ad creation process was entirely manual and template-based, resulting in 80% of ad assets being generic across all ad groups, with 11 out of 15 headlines being identical regardless of the specific service or keywords being targeted.

## Technical Architecture and LLM Implementation

The solution comprises a sophisticated three-stage LLM pipeline that demonstrates advanced LLMOps practices in production environments. The first stage focuses on **automatic generation**, where LLMs create ad assets based on structured inputs including ad group names, target keywords, advertising best practices, and strict character count restrictions. This generation process is designed to be highly contextual, incorporating specific keywords and value propositions relevant to each ad group, enabling personalization that was previously impossible at scale.

The second stage implements an **automatic review and selection mechanism** using the "LLM as judge" approach. This is a particularly noteworthy LLMOps pattern where a second LLM evaluates and filters the output from the first generation stage. The review LLM is specifically trained to identify and eliminate poorly drafted assets, ensuring adherence to Thumbtack's quality standards and advertising requirements. This automated filtering significantly reduces the manual review burden while maintaining quality control, representing a practical application of multi-agent LLM systems in production.

The third stage involves **automatic asset separation and grouping**, where the system intelligently distributes selected headlines and descriptions across multiple ads within each ad group. This addresses the critical business requirement of avoiding repetition and overlap between ads, ensuring optimal utilization of available ad slots. The system can separate assets based on various criteria such as adjectives, keywords, or thematic elements to create distinct ad variations.

## Production Deployment and Experimentation Strategy

The deployment strategy demonstrates sophisticated LLMOps practices through a phased rollout approach spanning four distinct phases. The initial proof-of-concept (Phase 1) targeted high-spend ad groups and employed synthetic control methods for impact measurement, revealing a 20% increase in traffic and 10% increase in conversions. However, the team encountered significant challenges with measurement reliability due to the volatile nature of SEM metrics, leading to the adoption of more robust experimental methodologies.

The progression through phases shows iterative improvement in the LLM system's capabilities. Phases 1 and 2 focused solely on automatic generation, while Phase 3 incorporated the automatic review and selection components. Phase 4 represented the complete system implementation, including asset separation functionality, and utilized Google's built-in Drafts and Experiments (D&E) feature for more reliable impact measurement.

This experimentation approach highlights a critical LLMOps consideration: the importance of robust measurement methodologies when deploying LLM systems in production environments where business metrics can be highly volatile and influenced by external factors. The team's pivot from synthetic control methods to Google's D&E platform demonstrates adaptive experimentation practices essential for LLMOps success.

## Quality Assurance and Validation Framework

The system incorporates multiple layers of quality assurance that reflect mature LLMOps practices. Beyond the automated LLM-based review, the solution includes parsing mechanisms to filter out irrelevant content and validate adherence to character limits and best practices. The system implements checks to ensure that LLMs in the review and selection stages only refine existing content rather than generating new, unvalidated material, addressing a common concern in multi-stage LLM pipelines about content drift and quality control.

Despite the extensive automation, the system maintains human oversight for final asset selection, particularly for legal compliance and quality control. This hybrid approach represents a balanced LLMOps strategy that leverages automation for efficiency while preserving human judgment for critical business decisions. The manual review component serves as a crucial safety net, especially important given the direct customer-facing nature of the generated content and potential legal implications of advertising copy.

## Business Impact and Scalability Achievements

The implementation achieved significant business impact while solving previously intractable scalability challenges. The automation enabled Thumbtack to create highly personalized ads for all ad groups, incorporating specific keywords and value propositions that were previously impossible to implement manually. The system saved several months of manual review time and enabled personalization tasks that were deemed "nearly impossible" under the manual approach.

The final phase results using Google's D&E methodology showed statistically significant improvements in impressions, click-through rates (CTR), and conversions, with higher conversion value per request. Importantly, these improvements were achieved while maintaining return on ad spend (ROAS), demonstrating that the LLM-generated content not only increased volume but also maintained or improved quality metrics.

## Technical Challenges and LLMOps Lessons

The case study reveals several critical challenges inherent in production LLM deployments for content generation. Character limit constraints posed significant technical challenges, requiring precise prompt engineering to ensure generated content adhered to Google's strict requirements while maintaining quality and relevance. The system needed to balance multiple competing objectives: keyword incorporation, value proposition communication, character limits, uniqueness requirements, and brand compliance.

The measurement challenges encountered during phases 2 and 3 highlight a crucial LLMOps consideration: the difficulty of attributing business impact to LLM interventions in complex, multi-variable environments like digital advertising. The team's experience demonstrates the importance of selecting appropriate experimental designs and measurement methodologies when deploying LLM systems in production.

The multi-stage pipeline approach also presents interesting technical challenges around maintaining consistency and quality across different LLM calls while preventing content drift. The system's implementation of checks to ensure review-stage LLMs only select from initially generated content rather than creating new material addresses this concern and represents a best practice for multi-agent LLM systems.

## Future Development and Continuous Improvement

The case study outlines ambitious plans for continuous improvement that reflect mature LLMOps thinking. Future developments include dynamic asset updating and removal based on performance metrics, ensuring optimal utilization of available ad slots. The system aims to incorporate real-time feedback loops that can automatically update ad copy based on new value propositions or changing market conditions.

The ultimate goal of minimizing manual review while maintaining quality represents a common trajectory in LLMOps implementations: progressive automation with maintained quality controls. The team's approach of gradual capability expansion while preserving human oversight demonstrates a thoughtful progression strategy for production LLM systems.

This case study represents a comprehensive example of LLMOps implementation that addresses real business challenges through sophisticated technical solutions while maintaining appropriate quality controls and measurement practices. The multi-stage pipeline, robust experimentation methodology, and iterative deployment approach provide valuable insights for organizations considering similar LLM implementations in content generation and marketing automation contexts.