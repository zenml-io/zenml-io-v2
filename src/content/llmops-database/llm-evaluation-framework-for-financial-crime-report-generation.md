---
title: "LLM Evaluation Framework for Financial Crime Report Generation"
slug: "llm-evaluation-framework-for-financial-crime-report-generation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3faa3acd24a6fb12fbc0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:05:57.524Z"
  createdOn: "2024-11-21T14:11:54.347Z"
llmopsTags:
  - "compliance"
  - "documentation"
  - "error-handling"
  - "few-shot"
  - "fraud-detection"
  - "guardrails"
  - "high-stakes-application"
  - "human-in-the-loop"
  - "monitoring"
  - "openai"
  - "prompt-engineering"
  - "regulatory-compliance"
  - "reliability"
  - "security"
industryTags: "finance"
company: "Sumup"
summary: "SumUp developed an LLM application to automate the generation of financial crime reports, along with a novel evaluation framework using LLMs as evaluators. The solution addresses the challenges of evaluating unstructured text output by implementing custom benchmark checks and scoring systems. The evaluation framework outperformed traditional NLP metrics and showed strong correlation with human reviewer assessments, while acknowledging and addressing potential LLM evaluator biases."
link: "https://medium.com/inside-sumup/evaluating-the-performance-of-an-llm-application-that-generates-free-text-narratives-in-the-context-c402a0136518"
year: 2023
seo:
  title: "Sumup: LLM Evaluation Framework for Financial Crime Report Generation - ZenML LLMOps Database"
  description: "SumUp developed an LLM application to automate the generation of financial crime reports, along with a novel evaluation framework using LLMs as evaluators. The solution addresses the challenges of evaluating unstructured text output by implementing custom benchmark checks and scoring systems. The evaluation framework outperformed traditional NLP metrics and showed strong correlation with human reviewer assessments, while acknowledging and addressing potential LLM evaluator biases."
  canonical: "https://www.zenml.io/llmops-database/llm-evaluation-framework-for-financial-crime-report-generation"
  ogTitle: "Sumup: LLM Evaluation Framework for Financial Crime Report Generation - ZenML LLMOps Database"
  ogDescription: "SumUp developed an LLM application to automate the generation of financial crime reports, along with a novel evaluation framework using LLMs as evaluators. The solution addresses the challenges of evaluating unstructured text output by implementing custom benchmark checks and scoring systems. The evaluation framework outperformed traditional NLP metrics and showed strong correlation with human reviewer assessments, while acknowledging and addressing potential LLM evaluator biases."
---

## Overview

Sumup, a financial technology company offering payment services, faces regulatory compliance requirements including Anti-Money Laundering (AML) transaction monitoring. When compliance agents identify suspicious account activity, they must escalate and report it to authorities by writing detailed financial crime reports called "Reason for Suspicion" narratives. These reports outline observed behavior, provide supporting evidence, and draw from multiple sources including ML model predictions, investigation notes, and verification processes.

The company developed an LLM-powered application to automate the generation of these financial crime reports, significantly reducing the time agents spend on repetitive documentation tasks. However, a critical LLMOps challenge emerged: how do you effectively evaluate the quality of free-text narratives produced by an LLM in a production environment?

## The Core LLMOps Challenge: Evaluating Unstructured LLM Outputs

The case study focuses primarily on the evaluation methodology for LLM-generated text, which represents a fundamental challenge in deploying LLMs for production use cases. Unlike traditional ML models that produce numerical predictions with well-established mathematical evaluation methods, assessing narrative quality involves qualitative and subjective aspects.

The team identified several key challenges unique to LLM application evaluation:

- **Diverse output**: The model needs stability to generate comparable results across different runs
- **Subjective evaluation**: Different narratives can be adequate and contain relevant information but be written differently
- **Metric definition**: Defining what constitutes a "good response" requires custom criteria
- **Lack of application-level benchmarks**: Existing LLM benchmarks focus on model capabilities (like GPT-3.5) rather than application-specific quality
- **Limitations of traditional NLP metrics**: Standard metrics may miss important nuances specific to the use case

## Why Traditional NLP Metrics Failed

The team initially tested traditional NLP metrics, specifically ROUGE scores (measuring n-gram overlap between generated and reference text). Their findings demonstrated that these metrics were inadequate for the use case. When comparing an accurately generated text against an inaccurately generated one, the ROUGE scores showed minimal differences:

For inaccurately generated text, they observed ROUGE-1, ROUGE-2, and ROUGE-L metrics with precision, recall, and F-scores. The accurately generated text achieved higher scores, but the differences between the two opposing examples were minimal. The team concluded that traditional metrics could not effectively differentiate between good and bad outputs, especially for texts with subtle differences. These metrics also failed to check text structure or compare the presence or absence of specific information—critical requirements for financial crime reports.

The fundamental issue is that metrics like ROUGE concentrate on semantic similarity or n-gram patterns without considering broader context: Does the report provide supporting evidence? Is the structure adequate? Does it cover relevant topics? These are the questions that matter in production but that traditional metrics cannot answer.

## The LLM-as-a-Judge Solution

Rather than relying on human review (which is time-consuming and impractical at scale), the team developed an LLM-driven evaluation approach. This methodology uses an LLM to evaluate another LLM's output, a technique often called "LLM-as-a-judge."

The evaluator was designed with custom benchmark checks embedded in a prompt, each focusing on specific quality criteria for financial crime reports:

- **Topic coverage**: Ensuring consistency between the generated narrative's topics and those in the reference text
- **Customer profile data**: Confirming the inclusion of required customer data in the narrative
- **Supporting facts**: Checking for supporting facts related to the described behavior
- **Avoiding invented facts (hallucination detection)**: Verifying no additional facts were created beyond those in the reference text
- **Conclusion**: Ensuring the generated text includes a proper conclusion

The evaluator was instructed to produce a numerical score between 0-5 for each criterion, where 5 represents excellent coverage and 0 signifies very poor coverage. Each score is accompanied by an explanation, providing both quantitative metrics for comparison and qualitative insights for debugging.

## Evaluation Results and Validation

The LLM-driven evaluator demonstrated clear differentiation between high-quality and low-quality generated text. An accurately generated narrative received an average general score of 4.67, with scores of 4-5 across all criteria. The evaluator correctly identified that topics matched the reference, customer data was present, suspicious indicators were consistent, and the conclusion was clear.

In contrast, an inaccurately generated text (which included invented information about police reports and illicit activities not present in the reference) received an average score of 2.5. The evaluator correctly flagged the hallucinated facts, giving a score of 1 for "check_facts_are_not_invented" and explaining: "The generated text mentions police reports and illicit activities, which are not present in the reference text. This is a clear sign of invented facts."

Crucially, the team validated their automated evaluation against real agent feedback. They ran an initial iteration where agents manually reviewed and scored each LLM-generated narrative. The results showed that the automated text generation evaluation was often closely related to the comments and scores provided by human agents. Furthermore, the improvement areas identified by humans closely matched those highlighted by the automated evaluation.

## Addressing LLM Evaluator Limitations and Biases

The case study demonstrates awareness of the limitations and biases inherent in using LLMs as evaluators, referencing the academic study "Judging LLM-as-a-judge with MT-Bench and Chatbot Arena" by Lianmin Zheng. Three key biases are identified:

- **Position bias**: LLM evaluators tend to favor the first result when comparing two outcomes
- **Verbose bias**: LLM models prefer longer responses, even if they lack clarity compared to shorter answers
- **Self-enhancement bias**: LLMs may prefer answers generated by other LLMs over human-authored text

To mitigate these biases, the team implemented specific strategies:

- **Position swapping**: Swapping the reference and result positions to counteract position bias
- **Few-shot prompting**: Adding labeled examples to calibrate the evaluator and reduce bias, particularly for verbose bias. By providing pre-labeled examples that exemplify a perfect score of 5, the model can replicate these results and minimize subjectivity

The team also noted that these metrics are application-specific and cannot be used to compare across different projects. A score of 3 in one project does not equate to the same score in another unrelated project, making standardization across the organization challenging.

## Production Considerations and Workflow Integration

The solution maintains a human-in-the-loop approach for the actual report generation. The case study emphasizes that "prior human confirmation and investigation are paramount, as the consequences of automatically raising an alert without verification have an extremely high impact." The LLM assists agents in documentation after they have confirmed suspicious activity, rather than automatically generating alerts.

The automated evaluation method serves a specific role in the MLOps workflow: it empowers data scientists to test model improvements without adding extra workload to compliance agents. Agents can concentrate on reviewing final results rather than participating in every evaluation iteration during development.

## Practical Implementation Details

The evaluation system outputs structured JSON responses containing individual criterion scores, explanations for each score, and an aggregated general score with overall explanation. This format enables automated processing and monitoring of evaluation results at scale.

The team used synthetic but realistic examples for demonstration, such as a merchant named "Donald Duck" operating a beauty/barber business with suspicious transaction patterns including failed transactions, unusual processing hours, and excessive chargebacks. This approach protected real customer data while validating the evaluation methodology.

## Assessment and Considerations

While the case study presents a practical approach to LLM evaluation in production, some considerations should be noted. The reliance on LLM-as-a-judge creates a dependency on the evaluator LLM's capabilities and potential biases. The team acknowledges this but their mitigation strategies (position swapping, few-shot prompting) may not fully eliminate all biases. Additionally, the correlation between automated and human evaluation was described qualitatively ("closely related," "usually matched") rather than with precise statistical measures, which would strengthen the validation claims.

The approach of using application-specific benchmark checks is sensible for specialized domains like financial crime reporting, where generic LLM benchmarks would indeed be insufficient. However, organizations adopting this approach should invest in defining robust criteria specific to their use case and validating against sufficient human evaluation samples.