---
title: "MultiCare: A Large-Scale Medical Case Report Dataset for AI Model Training"
slug: "multicare-a-large-scale-medical-case-report-dataset-for-ai-model-training"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "677806b0d5a085d2748e3624"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:51:57.432Z"
  createdOn: "2025-01-03T15:48:00.124Z"
llmopsTags:
  - "healthcare"
  - "multi-modality"
  - "semantic-search"
  - "open-source"
  - "spacy"
  - "hugging-face"
industryTags: "healthcare"
company: "National University of the South"
summary: "The MultiCare dataset project addresses the challenge of training AI models for medical applications by creating a comprehensive, multimodal dataset of clinical cases. The dataset contains over 75,000 case report articles, including 135,000 medical images with associated labels and captions, spanning multiple medical specialties. The project implements sophisticated data processing pipelines to extract, clean, and structure medical case reports, images, and metadata, making it suitable for training language models, computer vision models, or multimodal AI systems in the healthcare domain."
link: "https://www.youtube.com/watch?v=LeVdLKvfQNc"
year: 2023
seo:
  title: "National University of the South: MultiCare: A Large-Scale Medical Case Report Dataset for AI Model Training - ZenML LLMOps Database"
  description: "The MultiCare dataset project addresses the challenge of training AI models for medical applications by creating a comprehensive, multimodal dataset of clinical cases. The dataset contains over 75,000 case report articles, including 135,000 medical images with associated labels and captions, spanning multiple medical specialties. The project implements sophisticated data processing pipelines to extract, clean, and structure medical case reports, images, and metadata, making it suitable for training language models, computer vision models, or multimodal AI systems in the healthcare domain."
  canonical: "https://www.zenml.io/llmops-database/multicare-a-large-scale-medical-case-report-dataset-for-ai-model-training"
  ogTitle: "National University of the South: MultiCare: A Large-Scale Medical Case Report Dataset for AI Model Training - ZenML LLMOps Database"
  ogDescription: "The MultiCare dataset project addresses the challenge of training AI models for medical applications by creating a comprehensive, multimodal dataset of clinical cases. The dataset contains over 75,000 case report articles, including 135,000 medical images with associated labels and captions, spanning multiple medical specialties. The project implements sophisticated data processing pipelines to extract, clean, and structure medical case reports, images, and metadata, making it suitable for training language models, computer vision models, or multimodal AI systems in the healthcare domain."
---

## Overview

MultiCare is a research project from the National University of the South that tackles a fundamental challenge in medical AI: the availability of high-quality, multimodal training data for developing language models, computer vision models, and multimodal models in healthcare. Presented by Maidani, a medical doctor and data scientist, this case study focuses on the creation and distribution of a comprehensive clinical case report dataset rather than model deployment per se, but provides critical infrastructure for LLMOps in the medical domain.

The project demonstrates a systematic approach to dataset engineering that enables downstream LLM and multimodal model training. While this is primarily a data infrastructure project, it represents an essential component of the LLMOps pipeline: without high-quality, well-structured training data, production-ready medical AI systems cannot be built.

## Dataset Composition and Scale

The MultiCare dataset is substantial in scope, containing more than 75,000 case report articles spanning from 1990 to recent years. These articles were authored by approximately 380,000 medical professionals and reference about 96,000 patients. The dataset totals 8.8 gigabytes and includes 135,000 medical images across virtually every imaging modality used in clinical practice.

The demographic distribution shows a mean patient age of 41.5 years, with a relatively balanced gender split of 48.5% female and 51.5% male patients. The dataset covers multiple medical specialties including oncology, surgery, cardiology, and many others, making it versatile for various medical AI applications.

The image types are diverse and representative of real clinical practice, including CT scans, ultrasounds, X-rays, mammographies, pathology images, electrocardiograms, and endoscopies. Each image comes with multiple layers of labels covering image type, imaging technique (such as Doppler or contrast status), anatomical information (view type, body part, laterality), and clinical findings visible in the images.

## Data Quality Considerations

One of the most insightful aspects of this presentation is the careful analysis of why clinical case data differs from and offers certain advantages over medical records for AI training. The presenter highlights several key distinctions that are relevant for anyone building production medical AI systems.

Clinical cases tend to over-represent rare and complex presentations compared to the distribution found in typical medical records. While this creates a distribution shift from real-world clinical practice, it also provides richer variety for training models that need to recognize unusual conditions. The text quality in published case reports is generally higher than in medical records because the content undergoes multiple rounds of review before publication. This reduces noise in the training data.

Importantly, clinical case reports do not contain Protected Health Information (PHI), addressing one of the major regulatory and ethical concerns in medical AI development. The text is also more concise and avoids irrelevant filler content (like "patient denies pain") that is common in medical records but adds noise for training purposes. However, the images tend to be smaller in resolution than those in medical records, which may impact certain computer vision applications.

## Data Pipeline Architecture

The data creation pipeline demonstrates good practices for building reproducible data processing workflows. The process began with identifying open-access case report articles from PubMed Central using the BioC API. Metadata and article contents were extracted using Biopython, requests, and BeautifulSoup libraries.

A critical preprocessing step involved patient-level segmentation. Since some articles contain multiple patients, the pipeline identifies and separates text sections corresponding to individual patients. Demographic information (age and gender) was extracted from the clinical text using regex-based approaches, followed by normalization to ensure consistent representation.

Image preprocessing addressed a common challenge in medical publishing: compound images where multiple images are combined into a single file. The pipeline uses edge detection (implemented via OpenCV) to identify image boundaries and automatically split compound images into individual components. This is essential for proper image-label alignment in training multimodal models. The same approach was used to remove borders that might appear around images.

Caption processing was particularly sophisticated. For compound images with compound captions (e.g., "brain CT scan showing mass in the frontal lobe (A) and hemorrhage in the right temporal lobe (B)"), the system splits the caption and assigns relevant portions to each sub-image while preserving shared context. This required careful text parsing to maintain semantic accuracy.

## Label Extraction and Normalization

The image labeling system uses contextual parsers from the JSSS library combined with custom dictionaries to extract structured information from unstructured caption text. The extracted entities include imaging modality (CT, MRI), anatomical sites (brain, frontal lobe), and clinical findings (mass, hemorrhage).

The presenter makes an important technical point about why this approach works well for caption data: captions are descriptive by nature and rarely contain hypothetical or negated mentions ("no mass seen" or "if tumor is present"). This eliminates the need for assertion models or relation extraction that would be necessary for processing full clinical narratives.

Extracted entities are then normalized using mapping dictionaries. For example, variations like "CT," "CAT scan," and "computed tomography" would all map to a standardized "CT" label. Similarly, "brain," "frontal lobe," and "cerebral" might all normalize to a "brain" anatomical label depending on the use case.

## Distribution and Accessibility

The dataset is distributed through multiple channels: Zenodo for archival access, Hugging Face for integration with modern ML workflows, and GitHub for code and documentation. A data article published in Data in Brief provides academic documentation and citation.

The GitHub repository includes notebooks demonstrating dataset creation methodology, extended demos for exploration, and tools for users who want to create case series without coding. This attention to accessibility suggests awareness of the diverse user base from pure ML researchers to medical professionals.

## Subset Creation Framework

Perhaps the most operationally useful component is the MedicalDatasetCreator class, which enables users to create custom subsets tailored to specific use cases. The framework supports multiple filter types:

- Metadata filters: publication year range, license type, MeSH terms
- Demographic filters: age range, gender
- Content filters: keywords in clinical case text
- Image filters: specific image labels
- Caption filters: keywords or normalized extractions in captions

The example provided shows creating a "male brain tumor dataset" by applying filters for minimum age of 18, male gender, captions containing terms like "metastasis," "tumor," or "mass," and normalized labels including "MRI" or "brain."

Output formats include text-only (for language model training), image-only (for computer vision), multimodal (for combined training), and series format organized by patient (for clinical research rather than model training).

## Implications for LLMOps

While this case study focuses on dataset creation rather than model deployment, it addresses a critical bottleneck in medical AI LLMOps: the availability of properly structured, labeled, and accessible training data. The modular design allowing custom subset creation is particularly relevant for organizations that need to fine-tune models for specific medical domains or imaging modalities.

The multi-source distribution strategy (Zenodo, Hugging Face, GitHub) reflects modern practices for research data that needs to integrate with production ML pipelines. The upcoming second version of the dataset indicates ongoing maintenance, which is essential for datasets intended for production use.

It is worth noting that while the dataset is comprehensive, users would need to perform their own evaluation of data quality, potential biases in case report publishing, and suitability for their specific production use cases. The presentation is honest about limitations like smaller image sizes compared to medical records, which is a balanced acknowledgment of trade-offs.