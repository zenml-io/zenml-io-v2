---
title: "Building a Pipeline for Automating Case Study Classification"
slug: "building-a-pipeline-for-automating-case-study-classification"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67d2bdbdc62c9d3e389441ba"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-03-20T15:18:26.207Z"
  lastUpdated: "2025-03-20T15:00:18.927Z"
  createdOn: "2025-03-13T11:13:01.807Z"
author: "marwan-zaarab"
category: "llmops"
tags:
  - "automation"
  - "finetuning"
  - "model-control-plane"
  - "zenml-project"
date: "2025-03-13T00:00:00.000Z"
readingTime: 6 mins
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/bf4da687/67d2c92e0d7f0444d4e2d950_Automating_Case_Study_Classification__1_.png"
seo:
  title: "Building a Pipeline for Automating Case Study Classification - ZenML Blog"
  description: "Can automated classification effectively distinguish real-world, production-grade LLM implementations from theoretical discussions? Follow my journey building a reliable LLMOps classification pipeline—moving from manual reviews, through prompt-engineered approaches, to fine-tuning ModernBERT. Discover practical insights, unexpected findings, and why a smaller fine-tuned model proved superior for fast, accurate, and scalable classification."
  canonical: "https://www.zenml.io/blog/building-a-pipeline-for-automating-case-study-classification"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/bf4da687/67d2c92e0d7f0444d4e2d950_Automating_Case_Study_Classification__1_.png"
  ogTitle: "Building a Pipeline for Automating Case Study Classification - ZenML Blog"
  ogDescription: "Can automated classification effectively distinguish real-world, production-grade LLM implementations from theoretical discussions? Follow my journey building a reliable LLMOps classification pipeline—moving from manual reviews, through prompt-engineered approaches, to fine-tuning ModernBERT. Discover practical insights, unexpected findings, and why a smaller fine-tuned model proved superior for fast, accurate, and scalable classification."
---

The [LLMOps Database](https://zenml.io/llmops-database), maintained by ZenML, is a growing repository of real-world case studies documenting LLM deployments in production. Initially, this database relied on a manual curation process—a labor-intensive approach involving embeddings-based search and human review. The question arose: could this classification process be automated to enable the database to grow more efficiently?

This post outlines my journey in building an automated classification pipeline capable of distinguishing theoretical discussions from concrete, production-grade generative AI (GenAI) implementations. I'll share the challenges faced, approaches tested, and practical insights gained along the way.

## Defining the Classification Problem

### What Makes a Production LLM Case Study?

My first attempts at classification revealed that identifying production implementations wasn't as straightforward as it seemed. Articles filled with technical jargon and implementation details often described research prototypes rather than deployed systems. Meanwhile, genuine production stories were sometimes buried in discussions of experimentation and iteration.

To establish clear evaluation criteria, I manually reviewed 100 articles, categorizing them as either accepts or rejects for the database. This process helped shape an initial taxonomy for LLMOps case studies:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/816b6ae2/67d3516ec1379757d1423abb_classification_taxonomy.svg" alt="__wf_reserved_inherit" />
</figure>

Essentially, high-quality case studies needed to demonstrate:

- Technical implementation details- Operational metrics from real usage- Evidence of iteration based on user feedback- Indications of a fully deployed system in a production environment

Unlike research articles with standardized structures (Abstract, Methodology, Results, etc.), GenAI implementation stories come in many formats across blogs, company websites, and even as (transcripts of) YouTube videos. This diversity makes classification particularly challenging.

### Learning From Examples

To better illustrate the nuances of classification, I examined how [DeepSeek’s R1 model](https://huggingface.co/deepseek-ai/DeepSeek-R1)  performed on four representative articles.

### Successful Classifications

**True Positive: **[What I Learned Developing with LLMs](https://www.opslevel.com/resources/what-i-learned-developing-with-llms)

This article demonstrated strong production evidence through:

- Detailed technical implementation using LangChain and OpenAI's GPT models- Documentation of real-world challenges like prompt injection- Specific performance metrics and operational insights- Iterative improvements based on production feedback

**True Negative: **[Efficient LLM Scheduling by Learning to Rank](https://hao-ai-lab.github.io/blogs/vllm-ltr/)

Correctly rejected because it:

- Focused on research approaches without production evidence- Lacked real-world deployment metrics- Emphasized experimental results over operational insights

### Misclassifications

**False Positive: **[AI Agents Are Here, But Can Generic LLMs power them to Solve Specific Enterprise Use Cases?](https://medium.com/@pavankamat24/ai-agents-are-here-but-can-generic-llms-truly-solve-specific-enterprise-use-cases-7da08a8c27ea)

The model was misled by:

- Compelling metrics (500+ developers, 1.5M+ lines reviewed)- Specific acceptance rates (27%)- References to existing customers (15+)

Yet closer inspection revealed:

- A focus on future plans rather than implemented systems- Lack of technical implementation details- Absence of deployment challenges or operational metrics- Marketing-heavy content over implementation specifics

**False Negative: **[Better Customer Support Using RAG at Thomson Reuters](https://medium.com/tr-labs-ml-engineering-blog/better-customer-support-using-retrieval-augmented-generation-rag-at-thomson-reuters-4d140a6044c3)

Initially misclassified because:

- The implementation details emerged late in the article- It had an unconventional structure for presenting production evidence

But it actually contained:

- A complete production RAG system serving customer support agents- Integration with enterprise systems (CRM, knowledge base)- Detailed technical components including vector databases- Clear business impact metrics

## Building the Classification Pipeline

### Approach #1: Prompt-Based Classification

My initial approach relied on a structured prompt that directed the model to evaluate articles against specific criteria:

```python
prompt_template = """Evaluate whether the following article provides concrete evidence of a valid case study for a production GenAI system. Accept the article if it contains the following:
- Technical implementation details
- Operational metrics from real usage
- Discussion of iteration based on user feedback
- Evidence of a fully deployed system in a live production environment

Article to evaluate: {{article_text}}"""
```

The model would then output a JSON object with the following keys:

```json
{
  "is_accepted": true,
  "confidence": 0.95,
  "reason": "Contains technical implementation details, operational metrics..."
}
```

However, this method produced inconsistent results, particularly for ambiguous cases where theoretical discussion overlapped with practical implementation. Confidence scores often seemed disconnected from the model’s reasoning.

### Improving with ReAct-Style Prompting

Inspired by [Daniel van Strien's blog post](https://danielvanstrien.xyz/posts/2025/deepseek/distil-deepseek-modernbert.html), I modified the approach to give the model space to reason through each case before making a judgment:

```python
prompt_template = """You are a specialized classifier for LLMOps case studies. Your task is to determine if the following article describes a real-world, production implementation of an LLM system.

<think>
First, analyze what the article is about and summarize the key technical elements.
Next, identify any specific implementation details, architecture descriptions, or technical challenges.
Then, look for operational metrics, user feedback, or evidence of iteration.
Finally, determine if there's clear evidence this system is deployed and serving real users.
</think>

Article to evaluate: {{article_text}}"""
```

This approach led to more nuanced evaluations, but still suffered from run-to-run inconsistencies. The challenge was finding the right balance between structured criteria and flexibility in the model's reasoning process.

### Approach #2: Fine-Tuning ModernBERT

After wrestling with the inconsistencies of prompt-based classification, I decided to explore a different approach: fine-tuning ModernBERT, a more lightweight model that could potentially offer better consistency and lower latency.

### Building the Training Pipeline

I designed a modular training pipeline to automate the entire workflow, from data ingestion to model evaluation:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/9b40ddbc/67d2c3617ea1f6fa0528fada_training_pipeline.png" alt="__wf_reserved_inherit" />
  <figcaption>Training pipeline DAG</figcaption>
</figure>

The pipeline automates these key steps:

1. **Data augmentation**: Combining 834 manually labeled articles with 560 additional examples classified by DeepSeek R12. **Preprocessing**: Standardizing text formats and preparing for tokenization3. **Data splitting**: Creating training, validation, and test sets (80/10/10 split)4. **Model training**: Fine-tuning ModernBERT with optimized hyperparameters5. **Evaluation**: Measuring accuracy, F1 score, and other key metrics6. **Model persistence**: Saving the trained model for deployment

### Hyperparameter Optimization

The initial training runs showed promising results, but I suspected there was still room for improvement. To refine the model further, I experimented with different hyperparameter configurations, focusing on key parameters such as learning rate, batch size, and training duration.

```python
training_args = TrainingArguments(
    learning_rate=3e-5,           # After testing 1e-5 to 5e-5
    per_device_train_batch_size=8, # Balance between memory and training speed
    per_device_eval_batch_size=64, # Larger for faster evaluation
    num_train_epochs=8,           # Sweet spot between underfitting and overfitting
    lr_scheduler_type="cosine",   # Gradual learning rate decay
    warmup_ratio=0.1,             # Important for stable training start
    eval_strategy="epoch",        # Evaluate after each epoch
    save_strategy="epoch",
    load_best_model_at_end=True,
    metric_for_best_model="f1",   # Optimize for balanced precision/recall
    weight_decay=0.01,            # Reduce overfitting
    max_grad_norm=1.0,            # Prevent exploding gradients
    label_smoothing_factor=0.1    # Improve generalization
)
```

### Performance Results

The optimization process paid off. The final model achieved a significant improvement, reaching an F1 score of 0.921 on the test set compared to the baseline:

<table class="zenml-table"> <thead> <tr class="zenml-tr"> <th class="zenml-th">Model Variant</th> <th class="zenml-th">F1 Score</th> <th class="zenml-th">ROC AUC</th> <th class="zenml-th">Memory Usage</th> </tr> </thead> <tbody> <tr class="zenml-tr"> <td class="zenml-td zenml-variant-cell">Initial Model</td> <td class="zenml-td">0.876</td> <td class="zenml-td">0.935</td> <td class="zenml-td">3.48GB</td> </tr> <tr class="zenml-tr zenml-highlight-row zenml-optimized-row"> <td class="zenml-td zenml-variant-cell">Optimized Model</td> <td class="zenml-td">0.921</td> <td class="zenml-td">0.955</td> <td class="zenml-td">2.65GB</td> </tr> <tr class="zenml-tr"> <td class="zenml-td zenml-variant-cell">Memory-Optimized</td> <td class="zenml-td">0.893</td> <td class="zenml-td">0.940</td> <td class="zenml-td">663MB <span class="zenml-memory-reduction">(-81%)</span></td> </tr> </tbody></table>

One of the most surprising findings was in memory optimization. By increasing the batch size to 16 and using gradient accumulation, I **reduced memory usage by 81%**—from 3.48GB to 663MB—while sacrificing only **3% in F1 score** (from 0.921 to 0.893).

The parallel coordinates plot below from [ZenML's Model Control Plane ](https://docs.zenml.io/how-to/model-management-metrics/model-control-plane)provides a visual representation of this performance/resource tradeoff:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/a5e3b89f/67d2c32f71129fc94e3204ac_ft_model_comparison.png" alt="__wf_reserved_inherit" />
  <figcaption>Parallel coordinates plot comparing ModernBERT performance between 3 different fine-tuned models</figcaption>
</figure>

This visualization underscores a critical insight: while the **Optimized Model **provided the best raw performance, the **Memory-Optimized Variant **delivered nearly e**quivalent classification quality** while dramatically reducing resource consumption. In a production setting where resources are a key constraint, this trade-off becomes particularly valuable.

## Comparing ModernBERT with Claude Haiku

To evaluate the effectiveness of our classification approaches, I conducted a head-to-head comparison of **ModernBERT** against **Claude Haiku **The results were remarkable: **our fine-tuned ModernBERT** **model outperformed Claude Haiku by over 30% in accuracy**, while also being **69× faster and 225× cheaper per 1,000 classifications**. The methodology used to achieve these results is detailed below so read on to learn more.

For this comparison, I tested two ModernBERT variants:

1. **Initial Model:** Trained only on the original human-labeled dataset (~846 articles)2. **Optimized Model**: Trained on the augmented dataset (original + 560 additional examples)

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/3c534340/67d2c44c3b69cac0dfc29f38_modernbert_claude_haiku_comparison.png" alt="__wf_reserved_inherit" />
  <figcaption>Model Performance Comparison (ModernBERT vs. Claude Haiku)</figcaption>
</figure>

The graph illustrates two separate evaluation runs:

- **Purple line**: Optimized ModernBERT vs. Claude Haiku (300 samples)- **Orange line**: Initial ModernBERT vs. Claude Haiku (139 samples)

While ideally, both tests would use the same sample size, these comparisons still provide meaningful insights into classification performance across different datasets. I should note this isn't exactly an apples-to-apples comparison—ModernBERT was fine-tuned specifically for this task, while Claude Haiku was using prompts to reason through each case. 

Fine-tuned models like ours benefit from **task-specific optimization**, leading to greater consistency and lower latency. Prompted models, on the other hand, rely on **on-the-fly reasoning** which can be more flexible but less predictable.

At the end of the day, what matters in real-world applications is getting accurate results efficiently and affordably. By this standard, ModernBERT's fine-tuning approach clearly came out on top for production use. Read on to learn more about the metrics that tell this story.

### Performance Metrics

The detailed metrics revealed significant differences in classification performance:

#### Optimized ModernBERT vs. Claude Haiku (300 samples)

<table class="zenml-table"> <thead> <tr class="zenml-tr"> <th class="zenml-th">Metric</th> <th class="zenml-th">Optimized ModernBERT</th> <th class="zenml-th">Claude Haiku</th> <th class="zenml-th">Difference</th> </tr> </thead> <tbody> <tr class="zenml-tr"> <td class="zenml-td zenml-metric-cell">Accuracy</td> <td class="zenml-td zenml-performance-cell">96.67%</td> <td class="zenml-td">65.67%</td> <td class="zenml-td zenml-positive-difference">+31.00%</td> </tr> <tr class="zenml-tr zenml-highlight-row"> <td class="zenml-td zenml-metric-cell">F1 Score</td> <td class="zenml-td zenml-performance-cell">96.67%</td> <td class="zenml-td">69.00%</td> <td class="zenml-td zenml-positive-difference">+27.67%</td> </tr> <tr class="zenml-tr"> <td class="zenml-td zenml-metric-cell">Precision</td> <td class="zenml-td zenml-performance-cell">96.67%</td> <td class="zenml-td">72.69%</td> <td class="zenml-td zenml-positive-difference">+23.98%</td> </tr> <tr class="zenml-tr zenml-highlight-row"> <td class="zenml-td zenml-metric-cell">Recall</td> <td class="zenml-td zenml-performance-cell">96.67%</td> <td class="zenml-td">65.67%</td> <td class="zenml-td zenml-positive-difference">+31.00%</td> </tr> <tr class="zenml-tr zenml-latency-row"> <td class="zenml-td zenml-metric-cell">Avg. Latency</td> <td class="zenml-td zenml-performance-cell">0.093s</td> <td class="zenml-td">6.45s</td> <td class="zenml-td zenml-positive-difference">69× faster</td> </tr> <tr class="zenml-tr zenml-cost-row zenml-highlight-row"> <td class="zenml-td zenml-metric-cell">Cost per 1000 samples</td> <td class="zenml-td zenml-performance-cell">$1.11</td> <td class="zenml-td">$249.51</td> <td class="zenml-td zenml-positive-difference">225× cheaper</td> </tr> </tbody></table>

#### Initial ModernBERT vs. Claude Haiku (139 samples)

<table class="zenml-table"> <thead> <tr class="zenml-tr"> <th class="zenml-th">Metric</th> <th class="zenml-th">Initial ModernBERT</th> <th class="zenml-th">Claude Haiku</th> <th class="zenml-th">Difference</th> </tr> </thead> <tbody> <tr class="zenml-tr"> <td class="zenml-td zenml-metric-cell">Accuracy</td> <td class="zenml-td zenml-performance-cell">87.05%</td> <td class="zenml-td">74.10%</td> <td class="zenml-td zenml-positive-difference">+12.95%</td> </tr> <tr class="zenml-tr zenml-highlight-row"> <td class="zenml-td zenml-metric-cell">F1 Score</td> <td class="zenml-td zenml-performance-cell">87.05%</td> <td class="zenml-td">73.34%</td> <td class="zenml-td zenml-positive-difference">+13.71%</td> </tr> <tr class="zenml-tr"> <td class="zenml-td zenml-metric-cell">Precision</td> <td class="zenml-td zenml-performance-cell">87.05%</td> <td class="zenml-td">77.42%</td> <td class="zenml-td zenml-positive-difference">+9.63%</td> </tr> <tr class="zenml-tr zenml-highlight-row"> <td class="zenml-td zenml-metric-cell">Recall</td> <td class="zenml-td zenml-performance-cell">87.05%</td> <td class="zenml-td">74.10%</td> <td class="zenml-td zenml-positive-difference">+12.95%</td> </tr> <tr class="zenml-tr"> <td class="zenml-td zenml-metric-cell">ROC AUC</td> <td class="zenml-td zenml-performance-cell">93.56%</td> <td class="zenml-td">74.22%</td> <td class="zenml-td zenml-positive-difference">+19.34%</td> </tr> <tr class="zenml-tr zenml-latency-row zenml-highlight-row"> <td class="zenml-td zenml-metric-cell">Avg. Latency</td> <td class="zenml-td zenml-performance-cell">0.098s</td> <td class="zenml-td">16.25s</td> <td class="zenml-td zenml-positive-difference">165× faster</td> </tr> <tr class="zenml-tr zenml-cost-row"> <td class="zenml-td zenml-metric-cell">Cost per 1000 samples</td> <td class="zenml-td zenml-performance-cell">$1.18</td> <td class="zenml-td">$1,122.40</td> <td class="zenml-td zenml-positive-difference">951× cheaper</td> </tr> </tbody></table>

One of the biggest takeaways was that even the Initial ModernBERT model—trained only on human-labeled data—significantly outperformed Claude Haiku. This highlights that fine-tuning on a well-curated dataset, even a small one, can be more effective than prompt engineering with a larger model.

### Operational Considerations

The differences between the two models became even more striking when examining operational metrics:

- **Latency**: ModernBERT was **69-165× faster **than Claude Haiku, with average inference times under 100ms compared to several seconds for API calls.- **Cost**: ModernBERT was **225-951× more cost-effective**, with classification costs estimated at ~$1.15 per 1,000 samples, compared to $250–$1,100 for Claude Haiku.- **Reliability**: Local inference eliminated API rate limits and potential connectivity issues, making it a more stable solution for production deployment.

Given these findings, **ModernBERT was the clear winner** in terms of both classification performance and operational efficiency. For production environments, I would recommend using the Memory-Optimized ModernBERT model as the primary classifier—offering a near-perfect balance between accuracy and efficiency.

## Key Takeaways

1. **Fine-tuning outperforms prompt engineering for consistency** – Pre-trained models with carefully curated datasets deliver better results than sophisticated prompts alone.2. **Balanced evaluation criteria are essential for ambiguous cases** – Clear distinctions between theoretical and production-level implementations improve classification accuracy.3. **The "why" behind classifications matters** – Understanding the reasoning process was often more important than the final binary decision. This insight helped improve both the prompt-based and fine-tuned approaches.4. **Resource efficiency matters in production** – Low-latency, cost-effective models are preferable for large-scale deployments.5. **Augmenting training data enhances model performance **– Leveraging high-quality human-labeled data improves classification accuracy.

## Next Steps

For those looking to build similar classification systems, I recommend:

1. Start with manual review to develop a deep understanding of the classification criteria2. Experiment with both prompt-based and fine-tuning approaches3. Pay attention to the reasoning process, not just the final classifications4. Consider resource efficiency alongside raw accuracy metrics

**Bottom line:** sophisticated prompt engineering helped me understand the problem, but a well-trained smaller model turned out to be the practical solution for production.

## Try It Yourself

Want to build your own automated research paper classifier? The complete implementation of this project, called "Research Radar", is now available in the [zenml-projects](https://github.com/zenml-io/zenml-projects) repository on GitHub. You can find it [here](https://github.com/zenml-io/zenml-projects/tree/main/research-radar).

The repository includes all the code needed to:

- Run the classification pipeline with DeepSeek R1- Fine-tune ModernBERT for your specific classification needs- Compare your fine-tuned model with commercial alternatives- Deploy your model to Hugging Face

The project comes with comprehensive documentation and a step-by-step guide to help you adapt it to your specific research domain. With ZenML, all pipelines are tracked in the dashboard, allowing you to monitor performance metrics, visualize results, and manage model versions through the Model Control Plane.