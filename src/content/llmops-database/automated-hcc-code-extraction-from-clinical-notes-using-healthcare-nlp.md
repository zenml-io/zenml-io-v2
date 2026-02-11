---
title: "Automated HCC Code Extraction from Clinical Notes Using Healthcare NLP"
slug: "automated-hcc-code-extraction-from-clinical-notes-using-healthcare-nlp"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "677808228c8e4922539b7ce5"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:53:27.359Z"
  createdOn: "2025-01-03T15:54:10.356Z"
llmopsTags:
  - "healthcare"
  - "document-processing"
  - "regulatory-compliance"
  - "structured-output"
  - "semantic-search"
  - "error-handling"
  - "chunking"
  - "fastapi"
  - "postgresql"
  - "monitoring"
  - "hugging-face"
industryTags: "healthcare"
company: "WVU Medicine"
summary: "WVU Medicine implemented an automated system for extracting Hierarchical Condition Category (HCC) codes from clinical notes using John Snow Labs' Healthcare NLP models. The system processes radiology notes for upcoming patient appointments, extracts relevant diagnoses, converts them to CPT codes, and then maps them to HCC codes. The solution went live in December 2023 and has processed over 27,000 HCC codes with an 18.4% acceptance rate by providers, positively impacting over 5,000 patients."
link: "https://www.youtube.com/watch?v=6jTyxiREvVE"
year: 2023
seo:
  title: "WVU Medicine: Automated HCC Code Extraction from Clinical Notes Using Healthcare NLP - ZenML LLMOps Database"
  description: "WVU Medicine implemented an automated system for extracting Hierarchical Condition Category (HCC) codes from clinical notes using John Snow Labs' Healthcare NLP models. The system processes radiology notes for upcoming patient appointments, extracts relevant diagnoses, converts them to CPT codes, and then maps them to HCC codes. The solution went live in December 2023 and has processed over 27,000 HCC codes with an 18.4% acceptance rate by providers, positively impacting over 5,000 patients."
  canonical: "https://www.zenml.io/llmops-database/automated-hcc-code-extraction-from-clinical-notes-using-healthcare-nlp"
  ogTitle: "WVU Medicine: Automated HCC Code Extraction from Clinical Notes Using Healthcare NLP - ZenML LLMOps Database"
  ogDescription: "WVU Medicine implemented an automated system for extracting Hierarchical Condition Category (HCC) codes from clinical notes using John Snow Labs' Healthcare NLP models. The system processes radiology notes for upcoming patient appointments, extracts relevant diagnoses, converts them to CPT codes, and then maps them to HCC codes. The solution went live in December 2023 and has processed over 27,000 HCC codes with an 18.4% acceptance rate by providers, positively impacting over 5,000 patients."
---

## Overview

WVU Medicine is a comprehensive health system operating across 25 hospitals in North Central West Virginia, southern Pennsylvania, Western Ohio, and Eastern Maryland. The organization has a strong affiliation with the academic Medical Center at West Virginia University, allowing them to combine research capabilities with patient care. Their flagship facility, Ruby Memorial Hospital in Morgantown, West Virginia, was recognized by US News and World Report as the top hospital in West Virginia.

A key advantage for WVU Medicine's AI initiatives is that all 25 hospitals operate on the same Electronic Medical Record (EMR) system and follow standardized procedures, making it easier to scale new implementations across the organization. The AI team at WVU Medicine focuses on developing predictive and classification models across various areas including population health, revenue cycle, and ambulatory services.

## The Problem

The case study centers on Hierarchical Condition Category (HCC) coding, which is a system that categorizes patient chronic conditions to predict future healthcare needs and ensure appropriate care management. HCC coding serves multiple purposes: enhancing patient care through personalized treatment plans, improving population health management, supporting regulatory compliance and quality reporting, and increasing patient engagement.

The fundamental challenge is that providers must evaluate chronic conditions and document relevant HCC codes while simultaneously assessing and treating patients. These codes are derived from clinical notes, exam reports, and other unstructured patient documents—a task that is both extensive and detail-oriented. Given the scale and complexity of the organization, keeping up with comprehensive HCC coding is overwhelming, which often leads to some codes being missed from patient diagnosis charts despite providers' best efforts.

The importance of accurate and comprehensive HCC coding cannot be overstated because these codes affect payment adjustments to health plans based on patient health status and demographics, particularly for Medicare Advantage plan enrollers. More critically, accurate coding enables early identification of high-risk patients and development of targeted, personalized care plans.

## Technical Solution

WVU Medicine built an in-house CPT (Current Procedural Terminology) code extraction engine using John Snow Labs' Spark NLP Healthcare module. The workflow follows a clear pipeline: clinical notes are processed to extract diagnoses, which are then translated into CPT codes, which are subsequently mapped to HCC codes.

### NLP Model Architecture and Customization

The John Snow Labs Healthcare NLP model employs several sophisticated techniques for extracting meaningful context from clinical notes:

- Machine learning-based approaches
- Ontology integration
- Context analysis
- Linguistic pattern recognition
- Specific rules including negation handling

WVU Medicine customized the base model to better suit their specific needs. This customization involved refining the token extraction process by removing irrelevant details such as family history and suggestive comments. The goal was to accurately extract CPT codes that are relevant to the specific patient at the specific time of care. Additionally, since their patient population is unique, they filter out codes that are not applicable to their patient demographics.

### Confidence Scoring

A notable feature of their implementation is the confidence scoring mechanism. The model outputs a confidence score for each extracted diagnosis:
- A confidence score of 1.0 indicates the model is highly confident that the diagnosis is present in the clinical note
- A confidence score of 0.0 indicates no confidence in the diagnosis
- These confidence scores are used to further filter CPT codes, helping to reduce false positives and ensure only high-quality predictions reach providers

### Production Integration Workflow

The integration workflow demonstrates thoughtful production engineering:

The system queries the EMR database to gather all upcoming patient appointments scheduled over the next 14 days. This forward-looking approach ensures timely and relevant data processing. For these patients, all associated radiology notes are retrieved—these notes contain crucial information for identifying potential diagnoses.

The CPT extraction engine processes these radiology notes, efficiently handling large volumes of unstructured data to identify relevant CPT codes. The extracted codes are stored in a database where data manipulation and filtering assigns a "load value" to each code. The filtering logic removes codes that are already attached to the patient's diagnosis chart and those with low confidence levels. A load value of 1 indicates the code should be loaded into the EMR system; a load value of 0 indicates it should not.

An automated process picks up these filtered CPT codes and loads them into the EMR front-end system, ensuring relevant codes are available to providers during patient visits.

### Real-Time Provider Integration

The production workflow incorporates a sophisticated feedback mechanism through best practice alerts. During patient visits, providers receive real-time alerts containing suggested HCC codes as they enter diagnoses. Providers have three options:
- Accept the code (adding it to the patient record)
- Reject the code (if they disagree with the prediction)
- Mark the code as invalid

These responses are tracked for future validation and audit purposes, creating a feedback loop that helps refine the process and ensure accuracy over time. This human-in-the-loop approach is critical for healthcare applications where clinical judgment must remain paramount.

### Data Pipeline and File Processing

The data architecture team developed a process that scans output tables, retrieving codes and patient information for entries with a load value of 1. This process also pulls supplemental data necessary to trigger the best practice alert. A flat file format is generated and stored in a designated file location. The EMR system's internal process then ingests these files, converts CPT codes to HCC codes, and ensures the best practice alert is displayed during patient encounters.

### Document Tracking and Efficiency

A key factor in the model's operational efficiency is the document tracking system. WVU Medicine maintains records of all scanned documents to avoid rescanning the same files when patients schedule subsequent appointments. This optimization streamlines the process and ensures fast runtime, with the full operation completing in under an hour.

## Results and Performance

The model went live in December 2023, making it a relatively new implementation at the time of this presentation. The team noted they are still training providers to use it effectively. Key metrics reported include:

- Over 27,000 HCC codes extracted since launch
- 18.4% acceptance rate by providers
- Over 5,000 patients positively impacted through more accurate health status documentation

The 18.4% acceptance rate deserves some context—while this may seem modest, in healthcare settings where false positives could have serious implications, a conservative approach that prioritizes precision is often preferable. The fact that providers can reject or mark codes as invalid provides important quality control.

## Future Development Plans

WVU Medicine outlined several next steps for the project:

**Model Upgrades**: They are developing version 2 based on the latest John Snow Labs Healthcare NLP model, which in testing shows more codes extracted with higher precision. They acknowledged that their current workflow has drawbacks around model upgrades—currently requiring an elaborate process. They are actively improving infrastructure to make model upgrades a single-line code change, which represents a significant DevOps/MLOps improvement.

**Expanded Document Coverage**: Plans to extend beyond radiology documents to include progress notes, providing a more comprehensive view of patient information.

**Additional Use Cases**: Exploring extension of the base Healthcare NLP model to other patient care areas, including classification of mislabeled documents and identifying incidental findings.

## Lessons Learned and Partnership Value

The presenter emphasized the importance of having strong operational business partners for complex healthcare AI projects. Success depends heavily on thorough clinical data validation and meticulous workflow evaluation, which requires operational expertise beyond pure AI capabilities.

As a smaller AI team, WVU Medicine found value in partnering with John Snow Labs' Professional Services, which helped them implement their ideas using state-of-the-art AI tools within a few months. They strongly encouraged other small AI teams to consider leveraging such professional services to expedite implementation and realize value sooner.

## Critical Assessment

While the presentation highlights significant achievements, several aspects warrant consideration:

- The 18.4% acceptance rate, while representing over 5,000 positively impacted patients, also implies that 81.6% of extracted codes were rejected or marked invalid. Understanding the breakdown between rejections and invalid codes would provide more insight into model accuracy versus clinical disagreement.
- The model has only been live since December 2023, so long-term performance and provider adoption trends remain to be seen.
- The focus on radiology documents is a specific scope—progress notes and other document types may present different extraction challenges.
- The presentation comes from a healthcare NLP summit sponsored by John Snow Labs, so the perspective is naturally favorable toward the vendor's tools.

Overall, this case study represents a practical example of deploying healthcare NLP in a production environment with thoughtful attention to clinical workflow integration, provider feedback loops, and operational efficiency considerations.