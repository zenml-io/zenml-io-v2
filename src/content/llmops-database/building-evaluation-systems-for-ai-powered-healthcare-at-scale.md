---
title: "Building Evaluation Systems for AI-Powered Healthcare at Scale"
slug: "building-evaluation-systems-for-ai-powered-healthcare-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69958972fbc80e340f206c7e"
  exportedAt: "2026-02-23T10:04:49.317Z"
  source: "live"
  lastPublished: "2026-02-19T10:00:02.226Z"
  lastUpdated: "2026-02-18T09:49:32.142Z"
  createdOn: "2026-02-18T09:42:10.071Z"
llmopsTags:
  - "healthcare"
  - "chatbot"
  - "high-stakes-application"
  - "prompt-engineering"
  - "rag"
  - "few-shot"
  - "human-in-the-loop"
  - "error-handling"
  - "fallback-strategies"
  - "evals"
  - "argilla"
  - "monitoring"
  - "guardrails"
  - "openai"
  - "anthropic"
industryTags: "healthcare"
company: "Sword Health"
summary: "Sword Health developed Phoenix, an AI care specialist that provides clinical support to patients during physical therapy sessions and between appointments. The company addressed the challenge of deploying large language models safely in healthcare by implementing a comprehensive evaluation framework combining offline and online assessments. Their approach includes building diverse evaluation datasets through strategic sampling and synthetic data generation, developing multiple types of evaluators (human-based, code-based, and LLM-as-judge), conducting vibe checks before release, and maintaining continuous monitoring in production through guardrails, A/B testing, manual audits, and automated evaluation of production traces. This eval-driven development process enables iterative improvement, quality assurance, objective model comparison, and cost optimization while ensuring patient safety."
link: "https://youtu.be/95bsrQmOOI8?si=4TF47TlvXz9t_gJN"
year: 2026
seo:
  title: "Sword Health: Building Evaluation Systems for AI-Powered Healthcare at Scale - ZenML LLMOps Database"
  description: "Sword Health developed Phoenix, an AI care specialist that provides clinical support to patients during physical therapy sessions and between appointments. The company addressed the challenge of deploying large language models safely in healthcare by implementing a comprehensive evaluation framework combining offline and online assessments. Their approach includes building diverse evaluation datasets through strategic sampling and synthetic data generation, developing multiple types of evaluators (human-based, code-based, and LLM-as-judge), conducting vibe checks before release, and maintaining continuous monitoring in production through guardrails, A/B testing, manual audits, and automated evaluation of production traces. This eval-driven development process enables iterative improvement, quality assurance, objective model comparison, and cost optimization while ensuring patient safety."
  canonical: "https://www.zenml.io/llmops-database/building-evaluation-systems-for-ai-powered-healthcare-at-scale"
  ogTitle: "Sword Health: Building Evaluation Systems for AI-Powered Healthcare at Scale - ZenML LLMOps Database"
  ogDescription: "Sword Health developed Phoenix, an AI care specialist that provides clinical support to patients during physical therapy sessions and between appointments. The company addressed the challenge of deploying large language models safely in healthcare by implementing a comprehensive evaluation framework combining offline and online assessments. Their approach includes building diverse evaluation datasets through strategic sampling and synthetic data generation, developing multiple types of evaluators (human-based, code-based, and LLM-as-judge), conducting vibe checks before release, and maintaining continuous monitoring in production through guardrails, A/B testing, manual audits, and automated evaluation of production traces. This eval-driven development process enables iterative improvement, quality assurance, objective model comparison, and cost optimization while ensuring patient safety."
---

## Overview

Sword Health has deployed Phoenix, an AI care specialist designed to bring clinical expertise into patient interactions for physical therapy and musculoskeletal care. Clara Matauss from Sword Health presented their comprehensive approach to building and maintaining evaluation systems for large language models in healthcare settings. The case study focuses on how the company addresses the fundamental challenge of ensuring LLMs remain safe, reliable, and useful when deployed in high-stakes medical contexts where patient safety is paramount.

Phoenix serves dual roles in the care continuum. During therapy sessions, it acts as a conversational companion that greets patients, sets expectations, follows up on previous progress, answers questions, responds to voice comments, and provides feedback based on motion tracking data to create a one-on-one experience. Between sessions, Phoenix augments clinician capabilities by making recommendations, detecting signs of patient disengagement, and prompting clinicians to reach out to members at appropriate times. This allows care to scale without compromising quality, which is a critical consideration in healthcare delivery.

The core challenge that Sword Health addresses is that evaluation in healthcare is inherently difficult compared to other domains. Models must communicate naturally with patients while respecting clinical boundaries and fitting within existing clinician workflows. Evaluations need to capture the complexity of care delivery, which involves messy inputs and long-term outcomes that don't always have clear immediate metrics. Everything that Phoenix says, when it says it, and how it says it must be validated both before and after release through a combination of offline and online evaluations.

## The Importance of Evaluations in Healthcare LLM Deployment

The presentation emphasizes that lack of proper evaluation has been a key challenge in deploying large language models to production environments generally, and this is amplified in healthcare contexts. Testing LLMs is inherently difficult and often slows down development velocity, but it's essential to measure performance in real scenarios to increase confidence when deploying at scale in high-stakes situations where patient safety is at risk.

Sword Health identifies four main benefits driving their evaluation investment. First, iterative improvement allows them to answer whether version 2 is truly better than version 1 with objective evidence rather than subjective impressions. Second, quality assurance before and after release helps catch regressions where new model updates might inadvertently degrade performance on certain criteria. Third, objective model comparison enables decisions about switching to different underlying models while maintaining or improving performance. Fourth, potential cost savings can be realized by switching to smaller, more efficient models when evaluations demonstrate they can maintain or improve current performance levels, which is important for sustainable deployment at scale.

## Offline Evaluation: Pre-Release Quality Assurance

Sword Health follows an iterative development process for offline evaluations conducted before releasing new versions to production. The process begins with building evaluation datasets by collecting examples, defining evaluation criteria, and performing human annotation. They then develop a suite of evaluators which can be human-based, code-based, or LLM-based depending on the evaluation task. Finally, before release, they perform a vibe check round to ensure the release meets quality and consistency standards and to catch new issues not yet covered by existing evaluations. If all checks pass, the new version is released to production.

### Building Evaluation Datasets

When real data is available, a common first step is collecting examples at random, but Sword Health found this approach results in datasets over-represented with simple and common use cases. To avoid this problem, they deliberately create evaluation datasets by gathering different types of examples: challenging edge cases, rare examples that test boundary conditions, examples that stress test different parts of the application such as tool calling, retrieval-augmented generation, or different prompt branches, and examples representative of previously solved issues or new features.

When no real data is available, evaluation datasets can be built using synthetic examples. Even when real data exists, synthetic generation is valuable for creating examples representing long-tail scenarios or rare situations that haven't yet appeared in production. For Phoenix conversations, evaluation dataset items include the same context passed to the model along with the full conversation transcript between Phoenix and the patient. Over time, these datasets are continuously improved with new examples collected through user feedback or manual audits, creating a living evaluation system that evolves with the product.

### Defining Evaluation Criteria

For each feature, Sword Health defines a set of criteria that explicitly specify what success looks like. They deliberately keep outputs binary with simple pass/fail or yes/no classifications to reduce ambiguity and improve alignment between evaluators. One example criterion they use ensures that Phoenix maintains an appropriate tone during conversations, which is especially important in healthcare contexts where tone can significantly impact patient experience and trust.

The success of evaluations depends critically on ensuring that automated evaluators align with expert judgment. To guarantee this alignment, Sword Health performs human annotation on collected examples, typically using a clinical expert or product manager as the annotator. For each example in the evaluation dataset, the annotator provides feedback using the previously defined evaluation criteria. This human-annotated ground truth then serves as the standard against which automated evaluators are validated.

### Building Multiple Types of Evaluators

Sword Health employs three distinct types of evaluators, each suited for different tasks with different failure modes. The choice of evaluator type depends on the specific aspect of model behavior being assessed.

Human evaluations are used to assess aspects requiring complex reasoning and subjective judgment about tone and appropriateness. Before major updates or releases, Sword Health performs pairwise comparisons in Gondola, their internal annotation tool, where human experts evaluate model outputs. Based on these expert scores, they make deployment decisions about whether a model is ready for production. While this method is time-consuming and expensive and can suffer from inter-annotator disagreement, it remains essential for evaluating aspects that require expert clinical judgment or product taste that cannot easily be codified.

Code-based evaluators are used for aspects with clear and objective criteria. Their key advantage is scalability: once created, they can run thousands of evaluations quickly and consistently. One example shown is a relatively simple code evaluator that ensures model output remains within a specific character count limit. These deterministic evaluators are fast, reliable, and eliminate variability, making them ideal for checking structural constraints and formatting requirements.

LLM-as-judge evaluators represent a middle ground between code-based and human-based approaches. They can evaluate more complex and subjective aspects than code-based evaluators while processing thousands of evaluations in a short timeframe, unlike human evaluators. The critical component is creating an effective LLM-as-judge prompt. Sword Health's prompts include the task definition, the conversation transcript being evaluated, the rubric item containing the evaluation criteria, and clear instructions for the evaluation process.

To ensure LLM-as-judge evaluators align with human judgment, Sword Health divides evaluation datasets into three sets following machine learning best practices. The training set provides few-shot examples to guide the evaluator. The development set is used to iterate on the prompt and measure alignment with human judgment. The test set remains untouched until the end and provides an unbiased measure of final performance. The development process starts simple with clear prompt structure and criteria, then evaluates development set examples using the created evaluators, measures metrics like true positive rate and true negative rate, analyzes mistakes where human and model judgments disagree, and refines the evaluation prompt to reduce mistakes. This cycle repeats until satisfactory agreement is reached, at which point performance is validated on the test set.

Once the evaluation suite is created, it can measure and compare performance of different model versions based on the defined criteria, providing confidence about what has improved or regressed in new versions. This enables data-driven decisions about model updates rather than relying on intuition or limited manual testing.

### Vibe Checks: The Essential Manual Review

Despite extensive investment in building automated evaluators, Sword Health acknowledges that something they cannot escape from is manual vibe checking. Before releasing models to production, they typically perform a vibe check round, which is essentially a manual inspection of outputs. The goal is to ensure that no unexpected issues not yet covered by the evaluators surface before patients are exposed to the new version.

Critically, the presentation acknowledges that evaluations sometimes fail to capture the full picture of quality. A new version can improve on evaluation metrics but still fail the vibe check. In such cases, they hold the release and perform another improvement cycle rather than pushing forward based solely on metrics. This reveals a mature understanding of the limitations of automated evaluation and the continued importance of human judgment, especially in healthcare contexts. They use annotation tools like Gondola or Argilla that allow reviewers to see full context and provide feedback in a structured way during these manual review sessions.

## Online Evaluation: Continuous Production Monitoring

Once released to production, models continue under evaluation at Sword Health. Continuous evaluation ensures that model performance holds up in real-world conditions, that regressions are caught early, and that user experience keeps improving with every iteration. They maintain a tight feedback loop between production and development by enforcing guardrails, conducting A/B tests, performing manual audits on production traces, and running evaluators on production traces. Insights collected through this process feed back into the evaluation dataset and criteria, ensuring they remain reliable and aligned with real-world conditions.

### Guardrails for Real-Time Safety

Some evaluators can be deployed as guardrails that act as real-time safety checks preventing unwanted content from reaching end users. Typically, these are implemented as code-based evaluators for latency considerations, since they must execute in the request path without adding significant delay. However, for more critical validations such as detecting medical advice that exceeds Phoenix's intended scope, Sword Health also relies on LLM-as-judge evaluators despite the latency considerations, demonstrating their prioritization of safety over speed in critical scenarios.

When guardrails fail by catching problematic content, the system can either fall back to a static safe message or retry the generation a few times to attempt producing acceptable output. This approach prevents patients from being exposed to potentially harmful or inappropriate content even when the underlying model produces it.

### A/B Testing Large Language Models

The ultimate test of a new release is conducted in production through A/B testing, which validates whether the new version drives the user behaviors and outcomes Sword Health aims for. They note that performing A/B tests with large language models is not fundamentally different from A/B testing traditional products. They define success metrics including user feedback metrics, usage metrics, and acceptance metrics, then measure the lift between model versions.

However, A/B testing with LLMs suffers from the same problems as traditional A/B tests. First, convincing stakeholders to hold back a new and hopefully improved version from the larger population can be challenging, especially when there's confidence in the improvements. Second, data volume may not be sufficient to make statistically sound decisions quickly, and waiting months for A/B test results is impractical in fast-moving development environments. Third, ensuring the test is statistically sound is essential to avoid false conclusions from noise or confounding factors. Finally, even when everything is properly set up, the most common outcome is that the new version is not statistically different from the previous version, which can be frustrating but is important information nonetheless.

### Manual Inspection and Observability

Sword Health emphasizes that manual inspection, while somewhat tedious, represents one of the highest return-on-investment tasks in machine learning operations. By regularly reviewing production traces, they detect failure patterns early, understand root causes, mitigate issues, and create evaluations that prevent problems from resurfacing. This closes the loop between production monitoring and evaluation development.

To make manual inspection effective requires extensive observability infrastructure. For each request or sampled request, Sword Health logs comprehensive information including input metadata, outputs, documents retrieved through retrieval-augmented generation, different tool invocations, user feedback, and evaluation results when available. This visibility provides a full picture of what happens in production, enables faster debugging, and allows more efficient issue resolution. The level of observability described suggests significant investment in logging, storage, and tooling infrastructure to support this capability.

### Running Evaluators on Production Traces

Once observability is in place, the same evaluators created and used for offline evaluation can also run on production traces. Depending on the criticality of the issue being monitored, evaluators can run on all production traces or just a subsample. For Phoenix, which has unsupervised conversations with patients in high-stakes healthcare contexts, the same set of evaluators that runs in development also runs in production continuously.

If pass rates drop below specific thresholds, the team is prompted to investigate and take corrective measures. This might indicate model degradation, distribution shift in patient interactions, or emerging edge cases not previously encountered. The ability to detect these issues quickly through automated evaluation at scale is critical for maintaining quality and safety in production healthcare applications.

## Key Insights and Balanced Assessment

Sword Health's approach represents a mature and comprehensive LLMOps practice specifically tailored for the unique challenges of healthcare deployment. Several aspects deserve particular attention in a balanced assessment.

The emphasis on diverse evaluation dataset construction beyond random sampling shows sophistication in understanding that model performance on common cases doesn't predict behavior on edge cases and rare scenarios that nevertheless occur in production. The deliberate inclusion of challenging examples and synthetic data for long-tail scenarios represents best practice in evaluation development.

The multi-modal evaluator strategy combining human, code-based, and LLM-as-judge approaches recognizes that no single evaluation method is sufficient. Each has strengths and weaknesses, and the appropriate choice depends on what's being evaluated. This pragmatic approach avoids dogmatism while maintaining rigor where needed.

The acknowledgment that vibe checks remain essential despite extensive automated evaluation represents intellectual honesty about the limitations of current evaluation methods. The willingness to hold releases that pass automated metrics but fail manual review demonstrates appropriate caution in healthcare contexts. However, this also reveals a potential scalability challenge: as the product grows and release velocity increases, the manual vibe check bottleneck may become increasingly difficult to maintain.

The integration of offline and online evaluation with feedback loops between production monitoring and evaluation development creates a learning system that improves over time. This is more sophisticated than treating evaluation as a one-time gate before deployment. However, the presentation doesn't deeply address how they prioritize which production issues to encode into evaluations, which could lead to evaluation suite bloat over time.

The A/B testing discussion is refreshingly honest about the challenges and frequent lack of statistical significance between versions. Many presentations would gloss over these practical difficulties. However, the discussion doesn't address how they make decisions when A/B tests are inconclusive, which is acknowledged to be the common case.

The observability infrastructure described, with comprehensive logging of inputs, outputs, retrieved documents, tool calls, and user feedback, represents significant engineering investment. While this enables powerful debugging and analysis capabilities, the costs of storing and processing this data at scale are not discussed. Organizations considering similar approaches should carefully consider the infrastructure requirements and associated costs.

One notable gap in the presentation is limited discussion of computational costs and latency considerations beyond brief mentions. Running LLM-as-judge evaluators on all production traces for Phoenix, which has unsupervised patient conversations, likely involves substantial computational expense. The tradeoff between evaluation coverage and cost isn't explored in depth.

The presentation also doesn't deeply address versioning and reproducibility challenges. As evaluation datasets, criteria, and evaluators evolve over time, comparing performance across distant time periods becomes challenging. How Sword Health manages this evolution and maintains historical comparability isn't discussed.

Overall, Sword Health's approach represents thoughtful and comprehensive LLMOps practice for healthcare applications. The emphasis on safety through multiple layers of evaluation, the honest acknowledgment of limitations and challenges, and the integration of offline and online evaluation demonstrate maturity. However, organizations should recognize that this level of evaluation rigor requires significant investment in tooling, infrastructure, expertise, and process that may not be immediately achievable for all teams.