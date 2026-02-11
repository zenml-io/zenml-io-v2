---
title: "LLM-Powered Information Extraction from Pediatric Cardiac MRI Reports"
slug: "llm-powered-information-extraction-from-pediatric-cardiac-mri-reports"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6778070ccb6fd9dbd7922950"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:52:52.806Z"
  createdOn: "2025-01-03T15:49:32.646Z"
llmopsTags:
  - "healthcare"
  - "document-processing"
  - "unstructured-data"
  - "regulatory-compliance"
  - "few-shot"
  - "prompt-engineering"
  - "embeddings"
  - "fastapi"
  - "spacy"
  - "microsoft-azure"
industryTags: "healthcare"
company: "UK National Health Service (NHS)"
summary: "Great Ormond Street Hospital NHS Trust developed a solution to extract information from 15,000 unstructured cardiac MRI reports spanning 10 years. They implemented a hybrid approach using small LLMs for entity extraction and few-shot learning for table structure classification. The system successfully extracted patient identifiers and clinical measurements from heterogeneous reports, enabling linkage with structured data and improving clinical research capabilities. The solution demonstrated significant improvements in extraction accuracy when using contextual prompting with models like FLAN-T5 and RoBERTa, while operating within NHS security constraints."
link: "https://www.youtube.com/watch?v=SR-dT6KkYNk"
seo:
  title: "UK National Health Service (NHS): LLM-Powered Information Extraction from Pediatric Cardiac MRI Reports - ZenML LLMOps Database"
  description: "Great Ormond Street Hospital NHS Trust developed a solution to extract information from 15,000 unstructured cardiac MRI reports spanning 10 years. They implemented a hybrid approach using small LLMs for entity extraction and few-shot learning for table structure classification. The system successfully extracted patient identifiers and clinical measurements from heterogeneous reports, enabling linkage with structured data and improving clinical research capabilities. The solution demonstrated significant improvements in extraction accuracy when using contextual prompting with models like FLAN-T5 and RoBERTa, while operating within NHS security constraints."
  canonical: "https://www.zenml.io/llmops-database/llm-powered-information-extraction-from-pediatric-cardiac-mri-reports"
  ogTitle: "UK National Health Service (NHS): LLM-Powered Information Extraction from Pediatric Cardiac MRI Reports - ZenML LLMOps Database"
  ogDescription: "Great Ormond Street Hospital NHS Trust developed a solution to extract information from 15,000 unstructured cardiac MRI reports spanning 10 years. They implemented a hybrid approach using small LLMs for entity extraction and few-shot learning for table structure classification. The system successfully extracted patient identifiers and clinical measurements from heterogeneous reports, enabling linkage with structured data and improving clinical research capabilities. The solution demonstrated significant improvements in extraction accuracy when using contextual prompting with models like FLAN-T5 and RoBERTa, while operating within NHS security constraints."
---

## Overview

This case study comes from Great Ormond Street Hospital (GOSH), a pediatric NHS trust in the UK that specializes in treating children and young people with rare and complex conditions. The presentation was delivered by Bavi Rajendran (Senior Data Scientist leading NLP and Computer Vision) and Sabin Sabu (NLP and ML Engineer), both part of the Digital Research Environment (DRE) team within GOSH Drive, the hospital's innovation hub. The work described is part of a five-year partnership with Raj (likely referring to a research or technology partner).

The fundamental problem the team addressed was the massive amount of valuable clinical information locked within unstructured data in their electronic patient record systems. Clinicians and researchers frequently need to perform retrospective analysis on patient cohorts for clinical decision-making or secondary research purposes, but this data—including text reports, discharge summaries, and images—is not available in structured formats. For example, a clinician wanting to identify all patients diagnosed with Tetralogy of Fallot would need to manually review unstructured reports, a process that is time-consuming, requires domain expertise, and can only be done on small subsets of data.

## The Cardiac MRI Report Challenge

The specific use case focused on approximately 15,000 cardiac MRI (CMR) reports produced over a 10-year period by different consultants. These reports existed as PDF documents containing clinical measurements in tabular format along with free-text information. Due to being created over such a long timeframe by various physicians, the reports were heterogeneous in nature—lacking consistent structure or format. The clinical measurements contained within these reports are highly valuable for precision medicine research, drug discovery, and cohort studies in the cardiac domain.

The goal was to enable automated extraction of information from these reports to answer clinical questions in a timely manner, support clinical decision-making, and enrich the hospital's structured data assets. Successfully extracting patient identifiers from these reports would allow linking this newly structured data with GOSH's existing structured data holdings, which are described as one of the largest data points available in the UK for research and analysis.

## Infrastructure: The GRID System

A significant operational challenge was the lack of strong infrastructure to process large volumes of data, combined with strict NHS information governance requirements. The team developed a solution called GRID, consisting of two Linux servers with distinct roles:

- **Development Server**: Has internet access for building and testing pipelines, but processing patient data is prohibited
- **Staging Server**: Disconnected from the internet but permitted for running pipelines on actual patient data

This architecture enabled the team to develop and iterate on their NLP pipelines while maintaining compliance with NHS data governance requirements. The presenters emphasized that GRID was crucial for the project, reducing processing time from days on a work laptop to just a few hours.

## LLM-Based Entity Extraction Pipeline

Given the heterogeneous nature of the CMR reports spanning a decade, traditional rule-based NLP techniques were not viable because they could not accommodate all the variations and changes in report formats over time. The team turned to large language models as question-answering tools, leveraging their ability to "absorb the heterogeneity of the data without much development overhead."

A key constraint was the lack of GPU resources, forcing the team to work with smaller LLMs that could run on CPU. They framed the extraction task as question-answering, providing the model with a context (an unstructured chunk of text from a report) and asking questions like "What is the patient name?"

### Model Evaluation and Findings

The team evaluated several models for entity extraction, including:
- **BERT**: Showed lower performance compared to other models
- **Flan-T5 Small**: Performed poorly with significant hallucination issues—so severe that the team did not include it in formal reporting
- **Flan-T5 Large**: Provided the best results among tested models
- **RoBERTa**: Also evaluated as part of the comparison

### The Impact of Prompt Engineering

A particularly interesting finding emerged from their experiments with prompt engineering. By adding contextual prompts that explained the nature of the document (e.g., "This is a part from an unstructured text in a cardiac MRI report in the GOSH hospital"), the team observed significant improvements in entity extraction performance for names and reference names in Flan-T5 and RoBERTa models.

However, they discovered an unexpected result with BERT: performance on extracting MRN (Medical Record Numbers) and NHS numbers actually dropped when prompts were added. The team speculated that BERT may struggle with extracting very large numbers (which NHS numbers and MRNs typically are), based on literature suggesting this limitation. Why adding prompts specifically worsened this performance remains an open research question.

### Interpretability Analysis with Integrated Gradients

The team used integrated gradients to analyze attention and attribution scores within the models. Their visualization showed that when context prompts were provided, the model's ability to correctly identify patient names increased substantially. Without prompts, models were confused when multiple names appeared in the text (patient name, clinician name, hospital name), as they lacked context to prioritize which name was being requested. This interpretability analysis reinforced the importance of proper prompt engineering for domain-specific extraction tasks.

## Table Classification Using Few-Shot Learning

The second major component of the pipeline addressed extracting structured measurements from tables within the PDF reports. Initial attempts with rule-based table extraction failed to scale across the 10-year dataset due to data heterogeneity and the problem of incorrectly captured information being classified as tabular data.

The team observed that while there was variation in the data, tables followed consistent patterns: a header row followed by value rows containing measurements. They needed to classify each row as either a header row, a value row, or incorrectly captured information. However, they had limited annotated examples to work with.

### SetFit Approach

The team adopted SetFit (Sentence Transformer Fine-tuning), a few-shot learning approach that:
- Generates sentence pairs based on contrastive training
- Fine-tunes sentence transformers to capture example representations
- Uses the resulting embeddings in a classical ML classification head

For implementation details:
- **Sentence Transformer**: DistilRoBERTa was found to provide the best performance
- **Classification Head**: SVM classifier
- **Training Data**: 280 examples for training, 80 for validation
- **Hyperparameter Optimization**: Conducted systematic hyperparameter search

The team visualized embedding spaces before and after fine-tuning, showing clear separation between non-relevant/incorrect information, header rows, and value rows after the SetFit process. This visualization demonstrated how the contrastive learning approach successfully organized the representation space for effective classification.

Results showed a significant performance boost with the SetFit-based classifier compared to rule-based approaches, achieving strong F1 scores on data randomly sampled across the full 10-year dataset to ensure the approach handled heterogeneity.

## Future Directions

The team outlined several areas for future work:
- Testing the generalizability of components across other report types and use cases
- Exploring zero-shot approaches with general-purpose and domain-specific LLMs (given that the current models were not trained on their data yet performed well)
- Expanding the few-shot learning approach to other classification tasks where patterns exist but training data is limited

## LLMOps Considerations

This case study illustrates several practical LLMOps challenges and solutions in a healthcare context:

**Infrastructure Constraints**: The need to balance development agility (internet access for packages and models) with data governance (patient data isolation) led to the GRID architecture—a practical pattern for regulated industries.

**Compute Limitations**: Without GPU access, the team was forced to work with smaller models that could run on CPU, demonstrating that production LLM deployments must work within available compute budgets.

**Model Selection Through Evaluation**: The team conducted systematic evaluation of multiple models, discovering that apparent "smaller" variants (like Flan-T5 Small) can have serious issues like hallucination that make them unsuitable for production use.

**Prompt Engineering as a Production Concern**: The significant performance improvements from proper prompt design, along with unexpected degradation in some cases (BERT on large numbers), highlights that prompt engineering requires careful evaluation and cannot be assumed to universally improve performance.

**Hybrid Approaches**: The combination of LLM-based question-answering for entity extraction with few-shot learning (SetFit) for table classification shows that production NLP systems often benefit from selecting the right technique for each sub-problem rather than using a single approach throughout.

**Interpretability**: The use of integrated gradients to understand model behavior reflects good practice for production ML systems, especially in healthcare where understanding model decisions has clinical and regulatory implications.