---
title: "Fine-tuning LLMs for Toxic Speech Classification in Gaming"
slug: "fine-tuning-llms-for-toxic-speech-classification-in-gaming"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3d1d44743e4fb687a725"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:36:55.745Z"
  createdOn: "2024-11-21T14:01:01.855Z"
llmopsTags:
  - "amazon-aws"
  - "content-moderation"
  - "devops"
  - "error-handling"
  - "fine-tuning"
  - "high-stakes-application"
  - "hugging-face"
  - "model-optimization"
  - "monitoring"
  - "poc"
  - "pytorch"
  - "reliability"
  - "scalability"
  - "scaling"
industryTags: "media-entertainment"
company: "Large Gaming Company"
summary: "AWS Professional Services helped a major gaming company build an automated toxic speech detection system by fine-tuning Large Language Models. Starting with only 100 labeled samples, they experimented with different BERT-based models and data augmentation techniques, ultimately moving from a two-stage to a single-stage classification approach. The final solution achieved 88% precision and 83% recall while reducing operational complexity and costs compared to the initial proof of concept."
link: "https://aws.amazon.com/blogs/machine-learning/aws-performs-fine-tuning-on-a-large-language-model-llm-to-classify-toxic-speech-for-a-large-gaming-company?tag=soumet-20"
year: 2023
seo:
  title: "Large Gaming Company: Fine-tuning LLMs for Toxic Speech Classification in Gaming - ZenML LLMOps Database"
  description: "AWS Professional Services helped a major gaming company build an automated toxic speech detection system by fine-tuning Large Language Models. Starting with only 100 labeled samples, they experimented with different BERT-based models and data augmentation techniques, ultimately moving from a two-stage to a single-stage classification approach. The final solution achieved 88% precision and 83% recall while reducing operational complexity and costs compared to the initial proof of concept."
  canonical: "https://www.zenml.io/llmops-database/fine-tuning-llms-for-toxic-speech-classification-in-gaming"
  ogTitle: "Large Gaming Company: Fine-tuning LLMs for Toxic Speech Classification in Gaming - ZenML LLMOps Database"
  ogDescription: "AWS Professional Services helped a major gaming company build an automated toxic speech detection system by fine-tuning Large Language Models. Starting with only 100 labeled samples, they experimented with different BERT-based models and data augmentation techniques, ultimately moving from a two-stage to a single-stage classification approach. The final solution achieved 88% precision and 83% recall while reducing operational complexity and costs compared to the initial proof of concept."
---

## Overview

This case study documents AWS Professional Services' engagement with a large gaming company to build an automated toxic speech detection system for online player communications. The video gaming industry serves over 3 billion users worldwide, and maintaining a socially responsible gaming environment requires effective moderation of player interactions. The customer's goal was to replace manual moderation processes with an automated system that could classify voice and text excerpts into custom-defined toxic language categories, improving both speed and quality of detection.

The project was executed as a joint effort between two AWS teams: the Generative AI Innovation Center (GAIIC) for proof of concept development, and the ProServe ML Delivery Team (MLDT) for productionization. This two-team handoff model represents an interesting organizational approach to LLMOps, where specialized research teams develop and validate solutions before handing them to production-focused teams.

## The Data Challenge and Transfer Learning Approach

One of the central LLMOps challenges in this case study was the severe scarcity of labeled training data. The customer initially provided only approximately 100 labeled samples—far below the commonly recommended minimum of 1,000 samples for fine-tuning LLMs. Training a custom language model from scratch was not viable due to cost and time constraints.

The solution leveraged transfer learning, specifically fine-tuning pre-trained foundation models. The key insight was to find models pre-trained on data with similar characteristics to gaming chat: short-form, casual text from diverse user populations. Twitter data proved to be an excellent proxy, as tweets share similar length and vocabulary diversity characteristics with gaming chat messages.

The team selected BERTweet-based models from the Hugging Face Model Hub. BERTweet uses the RoBERTa pre-training procedure, which improves upon standard BERT training through several modifications: larger batch sizes, removal of the next sentence prediction objective, training on longer sequences, and dynamic masking patterns. The base BERTweet model was pre-trained on 850 million English tweets, making it the first large-scale language model specifically pre-trained for English tweets.

## Model Selection and Experimentation

Three models were evaluated during the proof of concept phase:

- **vinai/bertweet-base**: The baseline BERTweet model pre-trained on general tweets
- **cardiffnlp/bertweet-base-offensive**: BERTweet further fine-tuned on 14,100 annotated offensive tweets from SemEval-2019 Task 6
- **cardiffnlp/bertweet-base-hate**: BERTweet further fine-tuned on 19,600 hate speech tweets from SemEval-2019 Task 5

The progressive pre-training approach—starting with a general language model, then domain-specific pre-training, then task-specific fine-tuning—represents a best practice in transfer learning for NLP tasks. Models pre-trained on toxic language detection tasks provided a better starting point than general-purpose language models.

## Two-Stage vs. Single-Stage Architecture

The proof of concept employed a two-stage prediction architecture: a binary classifier first determined whether text was toxic or non-toxic, and only toxic content proceeded to a second fine-grained classifier that categorized the type of toxicity according to customer-defined categories. This cascading approach achieved strong results: 92% precision, 90% recall, and 91% F1 for the binary classifier, with 81% precision, 80% recall, and 81% F1 for the fine-grained classifier.

However, the production team identified significant operational challenges with the two-stage approach:

- **Monitoring complexity**: Two models require double the monitoring infrastructure and may drift at different rates, creating inconsistent retraining schedules
- **Cost**: Running two models in production doubles inference costs
- **Latency**: Sequential inference through two models increases response time

These are critical LLMOps considerations that often don't surface during proof of concept phases but become significant in production environments. The team opted to consolidate into a single-stage multi-class classifier that includes non-toxic as one of the classification labels.

## Data Augmentation Strategy

To address the limited labeled data, the team employed data augmentation by incorporating third-party labeled data from the Jigsaw Toxicity Kaggle competition. They mapped the Jigsaw labels to customer-defined toxicity categories and combined this with the original customer data. This approach of leveraging publicly available labeled datasets to supplement limited proprietary data is a practical strategy when training data is scarce.

For the production model, the customer provided an additional 5,000 labeled samples (3,000 non-toxic, 2,000 toxic), bringing the total training dataset to approximately 10,000 samples with the PoC data included. This demonstrates the iterative nature of ML projects—the initial data constraint was addressed through a combination of transfer learning, data augmentation, and customer data collection efforts.

## Fine-Tuning Implementation

The implementation used the Hugging Face Transformers library, which provides a unified API for working with different transformer architectures. The code demonstrates the standard fine-tuning workflow:

The pre-trained model is loaded with a modified classification head using `AutoModelForSequenceClassification.from_pretrained()`, where the `num_labels` parameter specifies the number of output classes. This automatically replaces the pre-trained model's classification head with a new randomly initialized head sized appropriately for the task.

Key training hyperparameters that were tuned include:
- Number of training epochs
- Per-device batch sizes for training and evaluation
- Learning rate
- Optimizer selection
- Metric for selecting the best model checkpoint

The training used an 80/20 train/test split for validation, with model checkpointing based on evaluation metrics at each epoch. The `load_best_model_at_end=True` parameter ensures the best-performing checkpoint is retained rather than simply the final epoch.

## Production Model Performance

The single-stage bertweet-base-offensive model achieved 88% precision, 83% recall, 86% F1, and 89% AUC. While these metrics represent a slight decrease from the two-stage approach (91% precision, 90% recall, 90% F1, 92% AUC), the customer accepted this trade-off in favor of the operational benefits.

Interestingly, the results also show the impact of pre-training domain relevance:
- bertweet-base (general): 76% precision, 72% recall, 74% F1
- bertweet-base-hate: 85% precision, 82% recall, 84% F1
- bertweet-base-offensive: 88% precision, 83% recall, 86% F1

The offensive speech pre-trained model outperformed both the general model and the hate speech model, suggesting that offensive language detection aligns more closely with the gaming toxicity classification task than hate speech detection.

## Infrastructure and Tooling

The development utilized Amazon SageMaker notebooks for experimentation and model training. The Hugging Face Transformers library provided the model loading, tokenization, and training infrastructure. The productionization (detailed in a separate Part 2 not included in this text) was built on SageMaker for scalable deployment.

This case study highlights several important LLMOps lessons: the value of transfer learning for low-data scenarios, the operational trade-offs between model accuracy and system complexity, the importance of selecting pre-trained models with domain-relevant training data, and the need for separate consideration of proof of concept and production requirements. The handoff model between research and production teams, while adding coordination overhead, allowed each team to focus on their respective strengths.