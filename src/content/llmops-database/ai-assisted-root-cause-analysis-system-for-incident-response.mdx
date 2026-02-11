---
title: "AI-Assisted Root Cause Analysis System for Incident Response"
slug: "ai-assisted-root-cause-analysis-system-for-incident-response"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67ac9868d9215f5455a1b1f4"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:00:19.537Z"
  createdOn: "2025-02-12T12:47:36.563Z"
llmopsTags:
  - "high-stakes-application"
  - "code-interpretation"
  - "fine-tuning"
  - "prompt-engineering"
  - "semantic-search"
  - "model-optimization"
  - "error-handling"
  - "monitoring"
  - "reliability"
  - "meta"
  - "hugging-face"
industryTags: "tech"
company: "Meta"
summary: "Meta developed an AI-assisted root cause analysis system to streamline incident investigations in their large-scale systems. The system combines heuristic-based retrieval with LLM-based ranking to identify potential root causes of incidents. Using a fine-tuned Llama 2 model and a novel ranking approach, the system achieves 42% accuracy in identifying root causes for investigations at creation time in their web monorepo, significantly reducing the investigation time and helping responders make better decisions."
link: "https://engineering.fb.com/2024/06/24/data-infrastructure/leveraging-ai-for-efficient-incident-response/"
year: 2024
seo:
  title: "Meta: AI-Assisted Root Cause Analysis System for Incident Response - ZenML LLMOps Database"
  description: "Meta developed an AI-assisted root cause analysis system to streamline incident investigations in their large-scale systems. The system combines heuristic-based retrieval with LLM-based ranking to identify potential root causes of incidents. Using a fine-tuned Llama 2 model and a novel ranking approach, the system achieves 42% accuracy in identifying root causes for investigations at creation time in their web monorepo, significantly reducing the investigation time and helping responders make better decisions."
  canonical: "https://www.zenml.io/llmops-database/ai-assisted-root-cause-analysis-system-for-incident-response"
  ogTitle: "Meta: AI-Assisted Root Cause Analysis System for Incident Response - ZenML LLMOps Database"
  ogDescription: "Meta developed an AI-assisted root cause analysis system to streamline incident investigations in their large-scale systems. The system combines heuristic-based retrieval with LLM-based ranking to identify potential root causes of incidents. Using a fine-tuned Llama 2 model and a novel ranking approach, the system achieves 42% accuracy in identifying root causes for investigations at creation time in their web monorepo, significantly reducing the investigation time and helping responders make better decisions."
---

## Summary

Meta has developed an AI-assisted root cause analysis (RCA) system designed to accelerate and improve incident investigations across their infrastructure. This case study, published in June 2024, demonstrates how Meta is leveraging large language models in production to help engineers quickly identify the underlying causes of system issues. The system specifically targets investigations involving code changes in monolithic repositories, where the sheer volume of changes across many teams can make manual investigation extremely time-consuming and complex.

The core claim is a 42% accuracy rate in identifying root causes within the top five suggested code changes at investigation creation time for their web monorepo. While this may seem modest at first glance, it's important to contextualize this within the massive scale of Meta's operations, where reducing the search space from potentially thousands of changes to just five represents a significant time savings for incident responders.

## Problem Statement

Incident investigation at Meta's scale presents several unique challenges. When issues arise in systems that depend on monolithic repositories (monorepos), responders face a daunting task: they must sift through an accumulating number of code changes made by numerous teams to identify which specific change may have caused the problem. This is compounded by the need for responders to quickly build context about what's broken, which systems are affected, and who might be impacted.

These challenges make investigating anomalies both complex and time-consuming. The traditional approach requires significant manual effort and domain expertise, which can slow down incident mitigation and extend the impact of system issues.

## Technical Architecture

The system employs a two-stage architecture that combines heuristic-based retrieval with LLM-based ranking:

### Stage 1: Heuristic-Based Retrieval

The first stage uses traditional heuristics to dramatically reduce the search space. Starting from potentially thousands of code changes, the retriever narrows down candidates to a few hundred relevant changes. The heuristics include factors such as code and directory ownership, as well as exploration of the runtime code graph of impacted systems. This stage is critical because it ensures that the more computationally expensive LLM-based ranking only needs to process a manageable number of candidates without significant reduction in recall.

### Stage 2: LLM-Based Ranking

Once the search space is reduced, the system employs a fine-tuned Llama 2 (7B) model to perform intelligent ranking of the remaining candidates. The team explored different ranking algorithms and prompting strategies before settling on an "election-based" ranking approach.

The election mechanism works as follows: prompts are structured to contain a maximum of 20 code changes at a time, and the LLM is asked to identify the top five changes from each batch. The outputs across multiple LLM requests are then aggregated, and the process repeats iteratively until only five candidates remain. This approach was designed to accommodate context window limitations while still enabling the model to reason across different changes effectively.

## Model Training Pipeline

The training process represents one of the most interesting LLMOps aspects of this case study. Meta describes a multi-phase approach to preparing their Llama 2 (7B) model for the root cause analysis task:

### Continued Pre-Training (CPT)

The first phase involved continued pre-training using limited and approved internal documentation, including wikis, Q&As, and code. This step was designed to expose the base Llama 2 model to Meta-specific artifacts and terminology, helping the model understand the company's unique technical context and vocabulary.

### Supervised Fine-Tuning (SFT)

The second phase involved supervised fine-tuning where Meta mixed Llama 2's original SFT data with internal context and a dedicated investigation RCA dataset. The RCA SFT dataset consisted of approximately 5,000 instruction-tuning examples. Each example contained details of 2-20 code changes from the retriever (including the known root cause) along with information available at the investigation's start, such as the title and observed impact.

A key design decision was to work with the limited information available at investigation creation time. While this naturally means lower information density, it allows the model to perform better in real-world scenarios where responders have minimal context at the beginning of an investigation.

### Log Probability-Based Ranking

An interesting technical detail is the use of log probabilities (logprobs) for ranking. By using the same fine-tuning data format for each possible culprit, the team was able to gather the model's logprobs and rank the search space based on relevancy to a given investigation. They then curated additional fine-tuning examples where the model was expected to yield a list of potential code changes ordered by their logprobs-ranked relevance, with the expected root cause at the start. Appending this dataset to the original RCA SFT dataset and re-running SFT gave the model the ability to respond appropriately to prompts asking for ranked lists.

## Production Considerations and Safeguards

Meta explicitly acknowledges both the opportunities and risks of deploying AI in this context. On the risk side, suggesting wrong root causes could mislead engineers and potentially extend incident resolution time. To mitigate this, Meta implemented several safeguards:

- **Closed feedback loops**: All employee-facing features prioritize mechanisms that allow responders to validate results independently. This ensures that engineers can reproduce the outputs generated by the AI system.

- **Explainability**: Results are designed to be explainable, helping engineers understand why certain changes were suggested as potential root causes.

- **Confidence measurement**: The system employs confidence measurement methodologies to detect low-confidence answers and avoid recommending them to users. This represents a deliberate trade-off of reach in favor of precision—the system may not provide suggestions in all cases, but when it does, the suggestions are more likely to be accurate.

## Results and Evaluation

The primary metric reported is 42% accuracy in identifying root causes within the top five suggested code changes. This was measured through backtesting using historical investigations and information available at their start. It's worth noting that this accuracy figure applies specifically to investigations related to Meta's web monorepo, and performance may vary for other repositories or types of investigations.

While 42% accuracy means the system fails to identify the root cause in the top five for the majority of investigations, the value proposition is in significantly reducing the search space that engineers must manually investigate. Going from potentially hundreds or thousands of changes to five represents a substantial productivity improvement even when the true root cause isn't in the top five.

## Future Directions

Meta outlines several future directions for this technology:

- Expanding AI-based systems to autonomously execute full workflows and validate their results, moving beyond just suggestion-making to actual automated remediation.

- Using AI to detect potential incidents before code push, shifting from reactive root cause analysis to proactive risk mitigation.

## Critical Assessment

This case study provides a solid example of LLMOps practices for a production AI system, though several aspects warrant consideration:

- The 42% accuracy figure, while seemingly low, should be evaluated in context. At Meta's scale, even partial automation of the investigation process could save significant engineering time.

- The reliance on backtesting rather than live production metrics means real-world performance may differ. The controlled nature of backtesting may not fully capture the complexity of live incident response.

- The system's dependence on quality heuristics in the first stage means that if the true root cause is filtered out early, the LLM cannot recover it.

- The training data of approximately 5,000 examples is relatively modest, suggesting there may be room for improvement with more data or different training approaches.

Overall, this represents a practical application of LLMs to a real operational challenge, with thoughtful consideration of production deployment concerns including accuracy, explainability, and confidence calibration.