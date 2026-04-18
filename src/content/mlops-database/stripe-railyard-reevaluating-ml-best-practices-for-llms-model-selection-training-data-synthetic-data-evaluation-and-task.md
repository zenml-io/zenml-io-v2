---
title: "Reevaluating ML Best Practices for LLMs: model selection, training data, synthetic data, evaluation, and task specificity"
slug: "stripe-railyard-reevaluating-ml-best-practices-for-llms-model-selection-training-data-synthetic-data-evaluation-and-task"
draft: false
mlopsTags:
  - "experiment-tracking"
  - "labeling"
  - "model-registry"
  - "monitoring"
  - "deployment"
  - "model-evaluation"
  - "serving"
  - "training"
industryTags: "finance"
company: "Stripe"
companySlug: "stripe"
platformName: "Railyard"
contentType: "video"
summary: "Emmanuel Ameisen, a Research Engineer at Anthropic and former ML Engineer at Stripe, challenges fundamental machine learning principles that have guided practitioners for years. Drawing on nearly a decade of ML experience including work on Stripe's Radar fraud detection team and mentoring over a hundred data scientists, he argues that the emergence of large language models has invalidated core ML wisdom around model selection, training data requirements, synthetic data usage, automated evaluation, and task specificity. His presentation systematically deconstructs traditional ML best practices—such as starting with simple models, using only relevant training data, avoiding synthetic data, relying on human evaluation, and building narrow task-specific models—demonstrating how LLMs have fundamentally altered the calculus for each of these decisions while acknowledging that certain principles like focusing on useful problems, treating models skeptically, maintaining strong engineering practices, and comprehensive monitoring remain as critical as ever."
link: "https://home.mlops.community/public/videos/everything-weve-been-taught-about-ml-is-wrong"
year: 2022
seo:
  title: "Stripe: Reevaluating ML Best Practices for LLMs: model selection, training data, synthetic data, evaluation, and task specificity - ZenML MLOps Database"
  description: "Emmanuel Ameisen, a Research Engineer at Anthropic and former ML Engineer at Stripe, challenges fundamental machine learning principles that have guided practitioners for years. Drawing on nearly a decade of ML experience including work on Stripe's Radar fraud detection team and mentoring over a hundred data scientists, he argues that the emergence of large language models has invalidated core ML wisdom around model selection, training data requirements, synthetic data usage, automated evaluation, and task specificity. His presentation systematically deconstructs traditional ML best practices—such as starting with simple models, using only relevant training data, avoiding synthetic data, relying on human evaluation, and building narrow task-specific models—demonstrating how LLMs have fundamentally altered the calculus for each of these decisions while acknowledging that certain principles like focusing on useful problems, treating models skeptically, maintaining strong engineering practices, and comprehensive monitoring remain as critical as ever."
  canonical: "https://www.zenml.io/mlops-database/stripe-railyard-reevaluating-ml-best-practices-for-llms-model-selection-training-data-synthetic-data-evaluation-and-task"
  ogTitle: "Stripe: Reevaluating ML Best Practices for LLMs: model selection, training data, synthetic data, evaluation, and task specificity - ZenML MLOps Database"
  ogDescription: "Emmanuel Ameisen, a Research Engineer at Anthropic and former ML Engineer at Stripe, challenges fundamental machine learning principles that have guided practitioners for years. Drawing on nearly a decade of ML experience including work on Stripe's Radar fraud detection team and mentoring over a hundred data scientists, he argues that the emergence of large language models has invalidated core ML wisdom around model selection, training data requirements, synthetic data usage, automated evaluation, and task specificity. His presentation systematically deconstructs traditional ML best practices—such as starting with simple models, using only relevant training data, avoiding synthetic data, relying on human evaluation, and building narrow task-specific models—demonstrating how LLMs have fundamentally altered the calculus for each of these decisions while acknowledging that certain principles like focusing on useful problems, treating models skeptically, maintaining strong engineering practices, and comprehensive monitoring remain as critical as ever."
mlops:
  source: "sqlite"
  entryId: 81
  sourceUrl: "https://home.mlops.community/public/videos/everything-weve-been-taught-about-ml-is-wrong"
  exportedAt: "2026-04-14T19:56:19Z"
  createdAt: "2026-02-05T11:03:51.061192"
  lastUpdated: "2026-04-14T19:54:58.902880"
---

## Problem Context

The traditional machine learning paradigm established clear principles that guided practitioners for years: start with simple baseline models like logistic regression, train on task-relevant datasets, avoid synthetic or model-generated data, rely on human evaluation for quality assessment, and build narrow models for specific tasks. These principles emerged from practical experience across thousands of ML projects and became foundational teachings in data science education and industry practice.

However, the rapid advancement of large language models from 2019 through 2022 created a fundamental disconnect between these established principles and optimal practice. Emmanuel Ameisen, who spent years teaching these principles while mentoring over a hundred transitioning data scientists and later implementing them on Stripe's Radar fraud detection team, found that nearly all of his core intuitions about ML best practices had become outdated. This created a knowledge gap where experienced practitioners were applying mental models that no longer aligned with the capabilities and characteristics of modern LLM-based systems.

The challenge extends beyond individual practitioner confusion to organizational ML strategy. Companies building ML systems faced decisions about when to apply traditional approaches versus LLM-based approaches, how to evaluate these systems, and how to adapt MLOps practices for a fundamentally different paradigm. The talk addresses these challenges by systematically examining each traditional principle and explaining why it no longer holds in the LLM era.

## Architecture & Design Philosophy Shifts

The presentation doesn't describe a specific ML platform architecture but rather documents a paradigm shift in how ML systems should be conceptualized and built. The traditional architecture followed a clear pattern: identify a specific task, collect relevant training data for that task, train a task-specific model (starting simple and increasing complexity only if needed), evaluate using automated metrics supplemented by human review, and deploy the narrow model to production where it performs only its trained task.

The LLM-based paradigm inverts many of these architectural principles. Instead of starting with simple models and progressively adding complexity, practitioners now start with extremely complex foundation models containing hundreds of billions of parameters. Rather than training on narrow task-specific datasets, these models train on essentially all available internet data. Instead of building separate models for separate tasks, a single general model handles multiple disparate tasks through prompting and in-context learning.

The data flow architecture has fundamentally changed. Traditional ML pipelines moved from raw data collection to feature engineering to model training to deployment. LLM-based systems often skip the training phase entirely for specific tasks, instead flowing from problem definition directly to prompt engineering to few-shot or zero-shot inference. When training does occur, it may involve the model generating its own training data through techniques like Constitutional AI, where a model reads a set of principles and then generates and evaluates responses based on those principles, creating a self-improvement loop that would have been considered theoretically unsound in traditional ML frameworks.

## Technical Implementation and Concrete Examples

The presentation provides several concrete examples illustrating the paradigm shift. For text classification tasks, the evolution is stark: in 2015, implementing logistic regression with bag-of-words embeddings would take half a day and provide a reasonable baseline. By 2019, fine-tuning BERT (110 million parameters) would take a couple hours and provide better results. In 2022, prompting an LLM (100+ billion parameters) provides superior results in approximately two minutes with no training required.

At Stripe, Ameisen worked on fraud detection models that were quintessentially narrow—trained specifically on credit card transaction data to predict fraudulent activity. These models exemplified traditional ML: task-specific training data, carefully engineered features, and narrow applicability. The models would never be used to generate text or perform unrelated tasks because their architecture and training precluded such capabilities.

The Constitutional AI technique developed at Anthropic represents a specific implementation of the synthetic data principle. The system works by having a trained model read a constitution (a set of principles), then using that same model to evaluate whether responses align with those principles, then training the original model based on these model-generated evaluations. This creates a feedback loop where model-generated data improves model performance—something that traditional ML wisdom suggested would lead to mode collapse or overfitting to synthetic artifacts.

For model evaluation, the presentation references specific research showing that GPT-4, when used to evaluate model outputs, achieved higher agreement with expert human raters than crowd workers did. In one study examining ethical behavior evaluation, the model-based evaluation approach outperformed human crowd workers across multiple dimensions including detecting deceptive behavior, manipulation, and potential harms. This finding challenges the long-held belief that automated metrics like BLEU and ROUGE are too pessimistic and that human evaluation represents the gold standard.

## Scale and Performance Characteristics

While the presentation doesn't provide detailed performance metrics from Stripe's systems specifically, it does illustrate the scale transition across ML generations. Logistic regression models might contain thousands of parameters (depending on embedding dimensions). BERT-class models contain approximately 110 million parameters. Modern LLMs routinely exceed 100 billion parameters, representing a million-fold increase in model complexity over traditional approaches.

The performance advantages manifest in multiple dimensions. The original GPT-3 paper demonstrated that large models with zero-shot prompting could outperform fine-tuned state-of-the-art models on certain tasks, despite the fine-tuned models being trained specifically on relevant task data. This suggests that the additional capacity and broad training data of LLMs provides benefits that outweigh the advantages of task-specific optimization in many scenarios.

Iteration speed has also changed dramatically. What previously took half a day to implement as a baseline (logistic regression) or several hours (BERT fine-tuning) now takes minutes through LLM prompting. This acceleration in iteration speed represents one of the key reasons why "start with a complex model" has become viable—the complexity no longer translates to longer development cycles.

A particularly striking finding involves crowd worker behavior: research indicates that 33-46% of crowd workers on platforms like Mechanical Turk now use LLMs when completing labeling tasks. This means that even when organizations believe they're obtaining human ground truth labels, they're often getting LLM-generated labels, which helps explain the shrinking gap between automated and human evaluation approaches.

## Trade-offs and Lessons Learned

The presentation acknowledges important caveats and limitations to the paradigm shift. Not all traditional ML principles have been invalidated—the core principle of focusing on solving useful problems rather than playing with cool tools remains as important as ever. Ameisen emphasizes that models still aren't magic; they hallucinate, make mistakes, and exhibit biases. Responsible ML practitioners must build systems that account for these failure modes rather than assuming model infallibility.

Engineering skills have become more rather than less important in the LLM era. While the models themselves are more capable, deploying them reliably at scale presents significant engineering challenges. Issues like handling breaking version changes in LLM APIs, managing latency spikes, post-processing outputs, and crafting effective prompts all require substantial engineering effort. The MLOps discipline remains critical—whether called MLOps or LLMOps, the operational challenges of monitoring, versioning, and maintaining production ML systems haven't diminished.

The presentation acknowledges that certain domains still benefit from traditional approaches. Tasks outside of natural language processing may not yet have foundation models with comparable capabilities. Scenarios requiring extremely specialized domain knowledge or working with modalities where large pretrained models don't exist will still require more traditional ML approaches.

One key insight concerns the concept of model "overhangs"—the existence of capabilities in a model that weren't explicitly trained and may not be immediately apparent. Traditional ML models had no such overhang; a fraud classifier could classify fraud and nothing else. LLMs exhibit capabilities beyond their training objective, with emergent abilities that surface only through extensive probing. This creates both opportunities (discovering new use cases) and risks (unexpected behaviors with safety implications).

The speaker's experience transitioning from Stripe to Anthropic provides perspective on different scales of ML work. At Stripe, he focused on building and improving specific models for fraud detection and leading MLOps efforts for the Radar team—a traditional ML engineering role focused on deploying and maintaining production models. At Anthropic, the focus shifted to improving the foundation models themselves, working on research engineering problems that push the boundaries of what LLMs can do.

## Practical Implications for MLOps

The paradigm shift has specific implications for MLOps practices. Monitoring remains essential, but what's monitored may change—instead of tracking feature distributions and prediction confidence scores, practitioners now track prompt effectiveness, output quality, and potentially model version changes from external API providers. The risk of silent failures remains as high as ever; models can degrade in production without obvious signals, requiring ongoing vigilance.

Data quality continues to matter enormously, perhaps even more so in the LLM paradigm. While LLMs can work with broader training data, prompt engineering requires carefully curated examples and clear instructions. Poor data quality in few-shot examples or unclear prompting can severely degrade performance. The "garbage in, garbage out" principle still applies, just at a different stage of the pipeline.

Version control and reproducibility present new challenges. When using external LLM APIs, the model itself may change without the practitioner's direct control. Documenting which model version was used for which decisions becomes critical for reproducibility and debugging. Organizations must develop strategies for handling model updates that might change behavior in production systems.

The concept of "model evaluation using models" introduces interesting dependencies. If an organization uses GPT-4 to evaluate outputs from their production model, they've created a dependency on an external system for their quality assurance process. This requires careful consideration of costs, latency, availability, and the meta-question of how to validate that the evaluation model itself is performing correctly.

## Enduring Principles

Despite the dramatic shifts, the presentation concludes by emphasizing principles that remain constant. The most important activity for ML practitioners is still solving useful problems rather than playing with new tools. The temptation to over-engineer solutions or chase the latest architectures remains a trap that wastes time and resources.

Models require skeptical treatment regardless of their capabilities. Building products that assume models will sometimes be wrong—incorporating verification steps, human-in-the-loop workflows, or confidence thresholds—remains essential. The specific failure modes may differ (hallucination versus misclassification), but the need for defensive system design persists.

Engineering fundamentals continue to differentiate successful ML deployments from failed ones. Whether deploying traditional ML models or LLM-based systems, challenges around latency, reliability, scalability, error handling, and user experience remain central. The presentation suggests that engineering skills have become progressively more important throughout Ameisen's career, a trend that shows no signs of reversing.

The presentation serves as both a historical document capturing a moment of paradigm transition and a practical guide for practitioners navigating the shift from traditional ML to LLM-based approaches. By systematically examining each traditional principle and explaining why it no longer holds—while also identifying which principles remain timeless—it provides a framework for understanding how to adapt ML practice for the current era while maintaining the disciplined, skeptical approach that has always characterized good ML engineering.
