---
title: "AI-Powered Clinical Decision Support for Women's Reproductive Health Diagnostics"
slug: "ai-powered-clinical-decision-support-for-womens-reproductive-health-diagnostics"
draft: false
llmopsTags:
  - "healthcare"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "multi-modality"
  - "classification"
  - "summarization"
  - "prompt-engineering"
  - "agent-based"
  - "human-in-the-loop"
  - "evals"
  - "error-handling"
  - "fallback-strategies"
  - "pytorch"
  - "fastapi"
  - "databases"
  - "monitoring"
  - "guardrails"
  - "reliability"
  - "security"
  - "compliance"
  - "documentation"
  - "amazon-aws"
  - "anthropic"
  - "openai"
industryTags: "healthcare"
company: "Hertility"
summary: "Hertility, a UK-based women's health tech company, developed two AI products to reduce diagnostic timelines and improve clinical efficiency in reproductive health. The first product, GynaAI, uses a Bayesian network to provide probabilistic diagnoses based on comprehensive health assessments and blood test results, reducing the typical 10-year diagnosis timeline for conditions like endometriosis. The second product automates pelvic ultrasound scan analysis and clinical letter generation using computer vision models and LLMs with agentic validation loops. Both systems maintain human-in-the-loop workflows with two-step clinician review processes, achieving efficient scaling while meeting strict UK and EU medical device regulations. The solutions leverage Hertility's unique dataset of over one million women's health assessments paired with blood results, scan images, and clinical diagnoses."
link: "https://www.youtube.com/watch?v=SPN0kAENr00"
year: 2026
seo:
  title: "Hertility: AI-Powered Clinical Decision Support for Women's Reproductive Health Diagnostics - ZenML LLMOps Database"
  description: "Hertility, a UK-based women's health tech company, developed two AI products to reduce diagnostic timelines and improve clinical efficiency in reproductive health. The first product, GynaAI, uses a Bayesian network to provide probabilistic diagnoses based on comprehensive health assessments and blood test results, reducing the typical 10-year diagnosis timeline for conditions like endometriosis. The second product automates pelvic ultrasound scan analysis and clinical letter generation using computer vision models and LLMs with agentic validation loops. Both systems maintain human-in-the-loop workflows with two-step clinician review processes, achieving efficient scaling while meeting strict UK and EU medical device regulations. The solutions leverage Hertility's unique dataset of over one million women's health assessments paired with blood results, scan images, and clinical diagnoses."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-clinical-decision-support-for-womens-reproductive-health-diagnostics"
  ogTitle: "Hertility: AI-Powered Clinical Decision Support for Women's Reproductive Health Diagnostics - ZenML LLMOps Database"
  ogDescription: "Hertility, a UK-based women's health tech company, developed two AI products to reduce diagnostic timelines and improve clinical efficiency in reproductive health. The first product, GynaAI, uses a Bayesian network to provide probabilistic diagnoses based on comprehensive health assessments and blood test results, reducing the typical 10-year diagnosis timeline for conditions like endometriosis. The second product automates pelvic ultrasound scan analysis and clinical letter generation using computer vision models and LLMs with agentic validation loops. Both systems maintain human-in-the-loop workflows with two-step clinician review processes, achieving efficient scaling while meeting strict UK and EU medical device regulations. The solutions leverage Hertility's unique dataset of over one million women's health assessments paired with blood results, scan images, and clinical diagnoses."
notion:
  pageId: "3aaf8dff-2538-80c6-a759-ebea6d636372"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-27T12:01:00.000Z"
  lastEditedTime: "2026-07-27T12:01:00.000Z"
  publishedAt: "2026-07-27T12:12:37Z"
---

## Overview

Hertility operates as a women's health tech company in the UK and Ireland, specializing in reproductive health from menstruation through menopause. The company has built a unique dataset over seven years comprising approximately one million women who have completed comprehensive health assessments, with substantial subsets having blood test results, pelvic ultrasound scans, and telemedicine consultations. This rich dataset connects symptoms, blood biomarkers, imaging data, and clinical diagnoses in ways that are rare in women's health research, which has historically been underfunded and underrepresented in medical studies.

The company developed two distinct AI-powered products to address critical gaps in women's healthcare: GynaAI for probabilistic diagnosis and a scan automation system for ultrasound image analysis and clinical letter generation. Both products aim to reduce the typical diagnostic timeline, which can extend up to 10 years for conditions like endometriosis in traditional healthcare settings, while maintaining clinical quality and regulatory compliance.

## GynaAI: Bayesian Diagnostic Model

The first major AI product, GynaAI, represents a sophisticated approach to clinical decision support using Bayesian networks rather than more opaque deep learning models. This architectural choice was deliberate, prioritizing transparency and clinical trust over potentially higher accuracy from black-box models.

The system operates on Hertility's comprehensive health assessment comprising up to 70 questions covering medical history, cycle data, exercise, lifestyle, and symptoms. This data is combined with blood test results to generate probabilistic diagnoses for 18 reproductive health conditions. The Bayesian network structure functions as a causal directed graph that models relationships between symptoms, biomarkers, and diagnoses based on both historical patient data and clinical best practice guidelines.

A critical design decision was to treat diagnoses as independent rather than mutually exclusive classifications. Women often present with multiple concurrent conditions, such as polycystic ovary syndrome and premenstrual syndrome, which affect different biological systems. The model therefore provides probability estimates for each potential diagnosis independently, acknowledging the complexity of real-world clinical presentations.

The output presents clinicians with probability estimates such as "73% likelihood of this diagnosis" accompanied by transparent reasoning showing which symptoms and biomarkers contributed to the assessment. This transparency serves multiple purposes: it builds trust with clinicians who must put their professional reputation behind the diagnoses, it supports more nuanced clinical thinking beyond binary decision-making, and it helps patients understand the inherent uncertainty in medical diagnosis.

From an LLMOps perspective, the evaluation strategy for GynaAI leverages the company's extensively labeled dataset where clinicians have reviewed and diagnosed every case combining health assessments and blood results. This provides ground truth for model validation. However, the team identified a significant risk of automation bias where clinicians might increasingly defer to AI recommendations over time, artificially inflating apparent accuracy metrics. To mitigate this, they maintain holdout datasets and regularly introduce fresh clinicians who haven't been exposed to the model's outputs to provide independent diagnostic assessments.

## Scan Automation System

The second AI product addresses the operational complexity and clinical burden of processing pelvic ultrasound scans. The system tackles multiple challenges across the imaging workflow, from image ingestion through clinical letter generation.

The technical pipeline begins with automated infrastructure to receive DICOM format images from multiple scan provider partners with minimal human intervention. The team engineered this to require only one manual click in the process, though they continue working to eliminate even that step. DICOM images contain complex metadata alongside the imaging data, requiring sophisticated parsing and processing.

The first machine learning task involves image classification. Scans arrive as zip files with unlabeled, randomly named images. Computer vision models classify each image by type: Doppler images showing blood flow, left ovary, right ovary, various uterine views, etc. This seemingly simple task significantly reduces administrative burden by presenting organized, labeled images to clinicians rather than requiring them to manually identify each image.

Beyond classification, the system performs object detection and segmentation within images. It identifies and draws contours around follicles, endometrium, and ovaries using PyTorch-based models trained in-house on carefully labeled data. The labeling process itself was resource-intensive, requiring individuals with both ultrasound interpretation skills and sufficient technical expertise to create properly formatted training data.

A notable technical advantage comes from the precision of machine learning-based volume calculations. Traditional radiologist workflows use ellipse approximations to estimate ovarian volume by drawing two axes on the image. Hertility's models can trace irregular contours more accurately, potentially providing more precise volume measurements than standard clinical practice. However, for certain measurements like follicle counts, the system defers to radiologist expertise since multiple image slices may show the same follicle, requiring human judgment to avoid double-counting.

The image processing pipeline employs data augmentation techniques including slicing, distortion, and transformations during training. This serves dual purposes: improving model robustness to varied scan quality and equipment, and incidentally obscuring patient names and dates of birth that typically appear on ultrasound images, providing an additional privacy protection layer.

## Clinical Letter Generation with Agentic Validation

The most sophisticated LLMOps implementation comes in automated clinical letter generation. After scan images are processed and reviewed by a clinician, the system generates comprehensive clinical letters synthesizing information from the health assessment, blood test results, scan findings, and any consultation notes.

The technical architecture uses large language models accessed through AWS Bedrock rather than direct API calls to providers like OpenAI or Anthropic. This decision reflects both regulatory compliance requirements and the need to keep protected health information within controlled infrastructure boundaries. Running LLMs through Bedrock ensures all data processing occurs within Hertility's governed AWS environment, simplifying compliance with UK CQC accreditation and EU medical device regulations.

A critical design principle involves data minimization and pseudoanonymization. Personally identifiable information like names and dates of birth never enters the LLM; these elements are added only to the letter header and footer after the clinical content is generated. This approach removes unnecessary noise from the generation process while maintaining strict privacy protections.

The most sophisticated aspect of the letter generation system is the agentic validation loop designed to prevent hallucinations and ensure factual accuracy. After initial letter generation, a second LLM call acts as a fact-checker, verifying that every claim in the letter is grounded in the actual patient data. When discrepancies are detected, the system regenerates the letter. This process can iterate multiple times, though data shows it rarely requires more than two loops to achieve factual consistency, and almost never needs three.

This validation architecture provides multiple benefits beyond immediate accuracy. It creates a live evaluation pipeline that surfaces recurring error patterns, informing improvements to prompts and system design. The team monitors loop frequency over time as a key metric, with decreases indicating improved initial generation quality.

The agentic approach proves particularly effective because LLMs demonstrate strong capabilities as fact-checkers when prompted to show their work and cite specific sources for verification. By requiring the validation agent to identify exactly where each fact should appear in the patient record, the system achieves much more reliable grounding than single-pass generation.

## Human-in-the-Loop Design

Despite sophisticated AI capabilities, Hertility maintains rigorous human oversight through a two-step clinician review process. The first clinician reviews AI-generated content including scan analysis summaries and clinical letters. Critically, a second clinician with fresh eyes and no prior involvement in the patient's care provides independent review before any information reaches the patient.

This dual review serves multiple purposes. It guards against automation bias where the first reviewer might unconsciously defer to AI recommendations. It provides redundancy against edge cases where AI might fail in unexpected ways. And it maintains the clinical standard of care expected in regulated medical practice.

The team explicitly designed for "go fast to go slow" - using AI to dramatically accelerate the review process enables time for thorough two-step human validation without overall workflow delays. The efficiency gains from automated image classification, volume calculations, and letter drafting create capacity for more careful human oversight at critical decision points.

## Regulatory Compliance and Data Governance

Operating in regulated healthcare environments fundamentally shaped Hertility's LLMOps approach. The company holds CQC accreditation in the UK and CE marking for medical devices in the EU, requiring extensive documentation, validation, and governance processes.

The team emphasizes that addressing regulatory requirements from the beginning, rather than as an afterthought, ultimately accelerates deployment and scaling. While it may feel slower initially to build with compliance in mind, the alternative of retrofitting regulation into existing systems proves far more difficult and can block deployment entirely.

Data governance principles include strict data minimization, removing personally identifiable information from AI systems wherever possible, and maintaining pseudoanonymization. All machine learning models are trained in-house rather than using external services, keeping protected health information within controlled boundaries. When LLMs are necessary, access occurs exclusively through AWS Bedrock with contractual and technical controls ensuring data remains in Hertility's infrastructure.

The regulatory framework also influenced evaluation strategies. The team cannot simply release AI systems and monitor outcomes; they must validate safety and efficacy before deployment through structured clinical trials and documentation. This necessitates careful holdout dataset management, independent clinician review, and ongoing monitoring for concept drift or performance degradation.

## Training Data and Model Development

Hertility's competitive advantage stems from its unique dataset connecting symptoms, blood biomarkers, imaging, and clinician-labeled diagnoses across hundreds of thousands of patients. This labeled dataset enables supervised learning approaches with clinical ground truth unavailable in most research contexts.

For the Bayesian diagnostic model, labels come from clinicians who reviewed every health assessment and blood test combination, providing diagnoses. This creates extensive training data for probabilistic models that reflect actual clinical decision-making patterns while being constrained by evidence-based guidelines.

For computer vision models, the labeling challenge proved more substantial. Creating accurate contour labels for anatomical structures in ultrasound images required individuals with both sonography interpretation skills and technical capability to generate properly formatted annotations. The team invested significant time building this labeled dataset before model training could begin.

The company also contributes back to medical research, publishing findings from their dataset. Recent work on testosterone reference ranges in women exemplifies this: standard clinical ranges were based on small historical samples, but Hertility tests more testosterone in a single day than was used in the original reference studies. Their age-specific regression models provide more accurate normative data than previously available, published for broader clinical use.

## Evaluation Strategies and Metrics

Beyond standard holdout validation sets, Hertility employs several sophisticated evaluation approaches tailored to clinical AI deployment. For the Bayesian diagnostic model, they track not just agreement between AI and clinician diagnoses, but watch for increasing agreement over time that might indicate automation bias rather than genuine model improvement. Introducing fresh clinicians unexposed to AI recommendations provides critical benchmarking.

For image processing models, evaluation includes comparison against hand-labeled ground truth, but also clinical utility metrics like whether automated volume calculations fall within acceptable clinical ranges and whether classification accuracy meets standards for diagnostic use.

The agentic validation loop in letter generation provides built-in evaluation through the loop frequency metric. Decreasing iterations to achieve factual consistency indicates improving generation quality, while patterns in what gets flagged for regeneration inform targeted improvements.

An important insight from the team is that evaluation must account for the messiness of real-world data. Training image models on slightly distorted, sliced, and augmented scans helps them handle variations in scan quality, equipment, and acquisition techniques encountered in production. This robustness testing goes beyond standard accuracy metrics to assess performance under realistic operational conditions.

## Challenges and Lessons Learned

Several key challenges emerged during development. The infrastructure challenge of reliably ingesting DICOM images from multiple provider systems with minimal manual intervention required significant engineering effort. Building labeled datasets for both diagnostic models and image segmentation proved more time-consuming than anticipated, requiring rare combinations of clinical and technical expertise.

Managing the tradeoff between automation and clinical oversight remains ongoing work. While AI dramatically improves efficiency, maintaining appropriate human involvement at critical decision points requires thoughtful workflow design. The two-step review process represents one solution, but the team continues refining how to optimize clinician time while preserving quality.

The team learned that transparency in AI decision-making matters enormously in clinical contexts. Choosing Bayesian networks over potentially more accurate but less interpretable models reflects this priority. Clinicians trust systems they can understand and interrogate, even if that means accepting slightly lower raw performance metrics.

Starting with regulatory compliance rather than retrofitting it later proved essential for actually deploying AI in clinical practice. While it feels slower initially, it prevents the much larger cost of rebuilding systems to meet requirements after development.

## Impact and Future Directions

The AI systems aim to address the significant diagnostic delay problem in women's health, where conditions like endometriosis can take up to 10 years from symptom onset to diagnosis in traditional healthcare settings. By providing probabilistic diagnoses early in the patient journey based on accessible health assessments and at-home blood tests, Hertility compresses this timeline dramatically.

The scan automation system addresses both efficiency and quality concerns. Clinicians report that automating administrative tasks like image organization and initial letter drafting reduces burnout and allows them to focus on higher-value clinical judgment. The system may also improve diagnostic precision through more accurate volume calculations and consistent analysis.

The company continues expanding its product offerings and is exploring expansion beyond the UK and Ireland markets, though international deployment will require navigating different regulatory environments and partnerships. They are also working to refine their AI systems based on growing data and clinical feedback, with the goal of not just matching but exceeding current clinical best practice guidelines.

The case demonstrates that production LLM deployment in highly regulated medical contexts is achievable with appropriate architecture choices, evaluation strategies, and governance frameworks. Success requires balancing automation benefits against safety requirements, investing in human-in-the-loop workflows, and building with compliance as a core design principle rather than an afterthought.
