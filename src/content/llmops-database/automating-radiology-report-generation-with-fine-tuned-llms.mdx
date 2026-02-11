---
title: "Automating Radiology Report Generation with Fine-tuned LLMs"
slug: "automating-radiology-report-generation-with-fine-tuned-llms"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67780766c87f5680521ae769"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:51:39.489Z"
  createdOn: "2025-01-03T15:51:02.548Z"
llmopsTags:
  - "healthcare"
  - "document-processing"
  - "high-stakes-application"
  - "fine-tuning"
  - "model-optimization"
  - "knowledge-distillation"
  - "token-optimization"
  - "pytorch"
  - "fastapi"
  - "meta"
  - "hugging-face"
industryTags: "healthcare"
company: "Heidelberg University"
summary: "Researchers at Heidelberg University developed a novel approach to address the growing workload of radiologists by automating the generation of detailed radiology reports from medical images. They implemented a system using Vision Transformers for image analysis combined with a fine-tuned Llama 3 model for report generation. The solution achieved promising results with a training loss of 0.72 and validation loss of 1.36, demonstrating the potential for efficient, high-quality report generation while running on a single GPU through careful optimization techniques."
link: "https://www.youtube.com/watch?v=Gk3x6bDgCvw"
year: 2024
seo:
  title: "Heidelberg University: Automating Radiology Report Generation with Fine-tuned LLMs - ZenML LLMOps Database"
  description: "Researchers at Heidelberg University developed a novel approach to address the growing workload of radiologists by automating the generation of detailed radiology reports from medical images. They implemented a system using Vision Transformers for image analysis combined with a fine-tuned Llama 3 model for report generation. The solution achieved promising results with a training loss of 0.72 and validation loss of 1.36, demonstrating the potential for efficient, high-quality report generation while running on a single GPU through careful optimization techniques."
  canonical: "https://www.zenml.io/llmops-database/automating-radiology-report-generation-with-fine-tuned-llms"
  ogTitle: "Heidelberg University: Automating Radiology Report Generation with Fine-tuned LLMs - ZenML LLMOps Database"
  ogDescription: "Researchers at Heidelberg University developed a novel approach to address the growing workload of radiologists by automating the generation of detailed radiology reports from medical images. They implemented a system using Vision Transformers for image analysis combined with a fine-tuned Llama 3 model for report generation. The solution achieved promising results with a training loss of 0.72 and validation loss of 1.36, demonstrating the potential for efficient, high-quality report generation while running on a single GPU through careful optimization techniques."
---

## Overview

This case study comes from a research presentation at NLP Summit by Abin Krishna Vala, a researcher at Heidelberg University working within the Department of Radiology and Nuclear Medicine at University Hospital Mannheim. The research group, led by Professor Shinberg and Professor Flourish, focuses on providing AI-based solutions in radiology and has published numerous papers on the topic. The presentation describes the development of a novel approach for automating radiology report generation using multimodal large language models.

The core problem being addressed is the significant increase in CT procedures, particularly during on-call hours, which has led to growing workloads for radiologists. This surge has contributed to longer wait times, delayed examinations, and higher rates of burnout among radiologists. The proposed solution leverages deep learning and large language models to automate the generation of detailed radiology reports from medical images and radiologist impressions.

## Technical Architecture

The proposed system uses a multi-stage pipeline architecture that combines computer vision and natural language processing components:

The input consists of medical images (CT scans) and radiologist impressions. Multiple Vision Transformers are trained to extract encodings from the images, with models functioning as classifiers and also supporting segmentation and object detection/localization tasks. The research notes that Vision Transformers have been outperforming traditional convolutional neural networks in some areas, with specific mentions of Trans-UNets, Swin Transformers, M-Formers, ViT-Med, and SE-Formers as popular models in the open-source community.

The reports are processed through an LLM where final embeddings are extracted. These embeddings are then processed into a decoder-only Transformer architecture, concatenated with the encodings from the vision model. This process is repeated n times, where n is a hyperparameter. The combined encodings are then processed through a linear block and a softmax layer to generate the output reports.

## LLM Fine-Tuning Process

A significant portion of the work focuses on fine-tuning Llama 3 8B Instruct for medical text generation. The choice of Llama 3 was motivated by its strong performance on benchmarks, with the presentation noting that it has surpassed GPT and GPT-4 in several areas. The 8 billion parameter model offers robust solutions with a reasonable context window size, making it suitable for the task.

The fine-tuning pipeline consists of several key stages:

**Data Pre-processing with Alpaca Format**: Since Llama 3 is an instruct model, the team formatted their data using the Alpaca prompt format, which is specifically designed for Llama models. This format enables instruction-based learning and enhances flexibility while improving training efficiency. The structure includes an introduction explaining the task, followed by an instruction (the radiologist impression) and a response (the detailed report). This approach trains the model to use radiologist impressions as input and generate detailed reports as output.

The team took an interesting approach by generating detailed reports from impressions rather than the reverse (summarizing detailed reports into impressions). This was done to avoid overloading the overall architecture with longer context requirements.

**Quantization**: The team employed 4-bit quantization to optimize the model. Quantization reduces the precision of numerical values, significantly decreasing model size, resulting in faster inference times and lower training costs. The presentation acknowledges the trade-off that reducing precision may lead to slight decreases in accuracy but maintains it's a highly effective method for practical deployment. The technique also lowers power consumption, making the process more sustainable.

**Parameter-Efficient Fine-Tuning (PEFT) with LoRA**: The team used Low-Rank Adaptation (LoRA), a technique that enhances model efficiency by using low-rank matrix decomposition during fine-tuning. Only these decomposed low-rank matrices are trained while the original model weights remain frozen. This approach significantly reduces the number of trainable parameters while preserving model capacity, minimizing computational resources needed for fine-tuning and speeding up the adaptation process.

## Training Infrastructure and Configuration

One of the notable aspects of this research is the demonstration that effective LLM fine-tuning can be achieved on relatively modest hardware. The team used an RTX 5000 GPU, showing that 4-bit quantized models can be trained on a single GPU with minimal to decent configuration.

Key training details include:
- **Model**: Unsloth Fast LLM 4-bit quantized Llama 3
- **Maximum sequence length**: 5,000 tokens (matching the average report length)
- **Training epochs**: 2,000
- **Training library**: Supervised Fine-Tuning Trainer (SFT Trainer) from Hugging Face
- **Optimizer**: AdamW with weight decay (L2 regularization applied on gradients)
- **Loss function**: Categorical cross-entropy

The Unsloth library was chosen for its support of 4-bit quantized models, though the presentation notes some challenges with limited customizable options in the current implementation.

## Evaluation and Results

After 2,000 epochs, the model achieved:
- Training loss: 0.72
- Validation loss: 1.36
- Average BLEU score on training data: 0.69
- Average BLEU score on validation data: 0.33

The presenter notes that while the BLEU score of 0.33 on validation data might seem modest, this metric only compares if words appeared in the generation, which is a limited measure for medical report quality. The team acknowledges this limitation and is conducting human evaluation with senior radiologists at the hospital to better assess the quality and clinical utility of generated reports.

## Advantages and Challenges

The presentation highlights several advantages of the approach:
- Efficient fine-tuning of LLMs on a single GPU
- High-quality and reliable report generation
- Support for quantization enabling faster inference and reduced training costs

Challenges encountered include:
- Limited customizable options with Unsloth in the current implementation
- 4-bit quantization may not match performance of higher-bit quantization models
- The team notes that Llama Index is providing better support for Llama 3 in recent times, suggesting potential for future improvements

## Production Considerations and LLMOps Insights

This case study provides several insights relevant to LLMOps in healthcare settings:

**Resource Efficiency**: The demonstration that effective fine-tuning can be achieved on a single RTX 5000 GPU is significant for organizations with limited computational resources. The combination of quantization and LoRA makes LLM deployment more accessible.

**Domain Adaptation**: The use of the Alpaca format for instruction-based learning shows a practical approach to adapting general-purpose LLMs for specialized medical tasks. This structured approach to data formatting is crucial for consistent model behavior.

**Evaluation Strategy**: The acknowledgment that automated metrics like BLEU have limitations and the inclusion of human evaluation by domain experts (senior radiologists) reflects best practices for high-stakes medical AI applications. This multi-faceted evaluation approach is essential for healthcare deployments where accuracy is critical.

**Trade-offs in Quantization**: The honest discussion of the precision-accuracy trade-off in quantization provides valuable guidance for practitioners making deployment decisions. The choice of 4-bit quantization represents a practical compromise between resource constraints and model performance.

It's worth noting that this is research-stage work being presented at an academic conference, and the system may not yet be deployed in clinical production settings. The validation loss being significantly higher than training loss (1.36 vs 0.72) suggests there may be room for improvement in generalization, which would be important to address before clinical deployment. Human evaluation results were not yet available at the time of the presentation, which is crucial information that would be needed to assess clinical readiness.