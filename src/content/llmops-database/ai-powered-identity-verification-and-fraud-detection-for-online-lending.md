---
title: "AI-Powered Identity Verification and Fraud Detection for Online Lending"
slug: "ai-powered-identity-verification-and-fraud-detection-for-online-lending"
draft: false
llmopsTags:
  - "fraud-detection"
  - "document-processing"
  - "classification"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "prompt-engineering"
  - "embeddings"
  - "vector-search"
  - "few-shot"
  - "error-handling"
  - "fallback-strategies"
  - "cost-optimization"
  - "latency-optimization"
  - "system-prompts"
  - "evals"
  - "serverless"
  - "api-gateway"
  - "monitoring"
  - "cicd"
  - "documentation"
  - "security"
  - "compliance"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "devops"
  - "scalability"
  - "reliability"
  - "cache"
  - "anthropic"
  - "amazon-aws"
industryTags: "finance"
company: "Sun Finance"
summary: "Sun Finance, a Latvian fintech operating across nine countries, faced challenges with their identity document verification pipeline where 60% of microloan applications required manual review due to OCR extraction errors, with processing times ranging from 10 minutes to 20 hours. Partnering with the AWS Generative AI Innovation Center, they built a serverless AI-powered solution combining Amazon Textract for OCR, Amazon Rekognition for fallback extraction and face detection, and Amazon Bedrock's Claude Sonnet 4 for intelligent structuring and fraud detection. The solution improved extraction accuracy from 79.7% to 90.8%, reduced per-document costs by 91%, cut processing time to under 5 seconds, and achieved 81% accuracy in fraud detection by combining visual pattern analysis with vector-based background similarity search using Amazon Titan Multimodal Embeddings and Amazon S3 Vectors."
link: "https://aws.amazon.com/blogs/machine-learning/sun-finance-automates-id-extraction-and-fraud-detection-with-generative-ai-on-aws/"
year: 2026
seo:
  title: "Sun Finance: AI-Powered Identity Verification and Fraud Detection for Online Lending - ZenML LLMOps Database"
  description: "Sun Finance, a Latvian fintech operating across nine countries, faced challenges with their identity document verification pipeline where 60% of microloan applications required manual review due to OCR extraction errors, with processing times ranging from 10 minutes to 20 hours. Partnering with the AWS Generative AI Innovation Center, they built a serverless AI-powered solution combining Amazon Textract for OCR, Amazon Rekognition for fallback extraction and face detection, and Amazon Bedrock's Claude Sonnet 4 for intelligent structuring and fraud detection. The solution improved extraction accuracy from 79.7% to 90.8%, reduced per-document costs by 91%, cut processing time to under 5 seconds, and achieved 81% accuracy in fraud detection by combining visual pattern analysis with vector-based background similarity search using Amazon Titan Multimodal Embeddings and Amazon S3 Vectors."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-identity-verification-and-fraud-detection-for-online-lending"
  ogTitle: "Sun Finance: AI-Powered Identity Verification and Fraud Detection for Online Lending - ZenML LLMOps Database"
  ogDescription: "Sun Finance, a Latvian fintech operating across nine countries, faced challenges with their identity document verification pipeline where 60% of microloan applications required manual review due to OCR extraction errors, with processing times ranging from 10 minutes to 20 hours. Partnering with the AWS Generative AI Innovation Center, they built a serverless AI-powered solution combining Amazon Textract for OCR, Amazon Rekognition for fallback extraction and face detection, and Amazon Bedrock's Claude Sonnet 4 for intelligent structuring and fraud detection. The solution improved extraction accuracy from 79.7% to 90.8%, reduced per-document costs by 91%, cut processing time to under 5 seconds, and achieved 81% accuracy in fraud detection by combining visual pattern analysis with vector-based background similarity search using Amazon Titan Multimodal Embeddings and Amazon S3 Vectors."
notion:
  pageId: "353f8dff-2538-80b9-8149-f3549cb44d84"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-01T08:12:00.000Z"
  lastEditedTime: "2026-05-01T08:12:00.000Z"
  publishedAt: "2026-05-10T06:03:19Z"
---

## Overview

Sun Finance is a technology-first online lending marketplace founded in 2017 and headquartered in Latvia. The company operates across nine countries and processes a new loan request every 0.63 seconds, delivering more than 4 million evaluations monthly. This case study focuses on their identity verification (IDV) pipeline for one of their highest-volume industries processing approximately 80,000 monthly microloan applications. The company faced a significant operational challenge where approximately 60% of applications required manual operator review, primarily due to OCR extraction errors rather than actual fraud or customer mistakes. Sun Finance partnered with the AWS Generative AI Innovation Center to rebuild their identity verification and fraud detection pipeline using generative AI technologies.

The project demonstrates a mature LLMOps implementation that moved from proof-of-concept to production within a compressed timeline. The AWS Generative AI Innovation Center engagement ran for 32 business days (August 26 - October 9, 2025), followed by 26 days for technical handover (completed November 14, 2025). Sun Finance then took 35 business days to move the solution into production, including a 14-day production freeze over the holiday period, and went live on January 22, 2026. The total timeline from kickoff to production was 107 business days.

## Business Problem and Context

The original identity verification system built in 2019 using Amazon Rekognition and Amazon Textract struggled with several critical challenges. The company expanded into developing regions that presented unique complexity: documents needed to be processed in both English and local languages, with the local language text being underrepresented in traditional OCR training datasets. Sun Finance needed to handle 7 different ID types, each with different layouts and formats.

The manual workload breakdown revealed that of the 60% of applications requiring manual review, approximately 80% stemmed from mismatches between extracted information and customer-entered data. Critically, 60% of these mismatches were actually OCR errors rather than customer mistakes. The remaining 20% of manual interventions related to fraud detection flags. Fraud was a real concern, with about 10% of daily requests being actual fraudulent applications where fraudsters used similar images with distinctive patterns to bypass basic controls while submitting multiple loan applications.

The existing system had cost and speed constraints that blocked business expansion. The high per-document cost and requirement for approximately 3 full-time equivalents (FTEs) dedicated to manual verification in this region alone meant the unit economics prevented expansion into industries with lower-value microloans. Processing times ranged from under 10 minutes for automated cases to 20 hours for manual reviews outside business hours.

## Technical Architecture and LLMOps Implementation

The solution demonstrates sophisticated LLMOps practices through a fully serverless architecture on AWS that exposes two primary API routes through Amazon API Gateway: one for ID extraction (`/extract-id`) and one for fraud detection (`/detect-fraud`).

### ID Extraction Pipeline - Iterative Development Approach

The ID extraction system evolution demonstrates excellent LLMOps experimentation methodology. The team iterated through three distinct approaches over four weeks, with each failure informing the next architectural improvement:

**Approach 1: Claude Sonnet 4 Alone (61.8% accuracy)** - The initial attempt sent ID images directly to Anthropic's Claude Sonnet 4 via Amazon Bedrock, asking it to extract fields as JSON. This approach failed significantly, achieving only 61.8% overall accuracy with ID number extraction at just 43%. The critical insight was that Claude's built-in safety protocols for handling personally identifiable information (PII) caused the model to refuse extraction from some files or perform poorly on sensitive documents. While Claude excels at general document analysis and OCR tasks, its privacy protections made it unsuitable for direct extraction from identity documents containing PII.

**Approach 2: Amazon Textract + Claude Structuring (85% accuracy)** - The breakthrough came from separating OCR from structuring. Amazon Textract handled raw text extraction from ID images, then Claude Sonnet 4 structured the output into 7 standardized fields: document type, date of birth, name, surname, middle name, ID number, and expiry date. This single architectural change produced an 11.6% accuracy jump. The approach worked because Amazon Textract as a specialized OCR service doesn't have the same PII refusal mechanisms as Claude, so it reliably extracted text from every ID image without triggering safety protocols. Once text was extracted, Claude could focus on what it does best: intelligent structuring, handling local language text with diacritical marks, inferring missing information from context, and applying document-specific extraction rules.

**Approach 3: Multi-Tier OCR + Validation (90.8% accuracy)** - The final iteration added Amazon Rekognition as a fallback for images where Amazon Textract struggled (typically low-quality scans, unusual document angles, or damaged IDs) plus validation rules for ID number formatting, date standardization, and document type normalization. The multi-tier architecture works with Amazon Textract as primary OCR, Amazon Rekognition providing backup extraction when Amazon Textract confidence is low, Claude structuring the combined output, and validation rules catching formatting errors. ID numbers get padded to the correct length based on document type, and dates are standardized to YYYY-MM-DD format.

The weekly accuracy progression across 585 test images showed that the team didn't beat the baseline until Week 4 when they added Amazon Textract. This iterative experimentation and measurement approach is a hallmark of good LLMOps practice.

### Fraud Detection Pipeline - Parallel Orchestration

The fraud detection system demonstrates sophisticated LLMOps orchestration using AWS Step Functions to run two detection methods in parallel, then combining their scores into a final risk assessment. The implementation processes images in 3-5 seconds, down from 6-8 seconds when run sequentially.

**Visual Pattern Detection** - Claude Sonnet 4 via Amazon Bedrock analyzes submitted selfie images for signs of fraud including screen photos (visible bezels, scan lines, moiré patterns), screen glare and reflections, and digital manipulation artifacts. Images scoring 85% confidence or higher are flagged. The system is designed to ignore normal characteristics like blur, compression artifacts, and standard cropping to reduce false positives. Screen photo detection works well with 95%+ confidence on known patterns.

**Background Similarity Analysis** - This component catches fraud rings (groups of fraudsters submitting selfies from the same location) through a three-step pipeline. First, Amazon Rekognition masks faces to focus on the background. Then Amazon Titan Multimodal Embeddings generates a 1024-dimensional vector of the background. Finally, Amazon S3 Vectors searches for matches against known fraud patterns. The team conducted a valuable comparison between text-based and visual embeddings for similarity search. Text embeddings (having Claude describe the background, then comparing descriptions) achieved 91% accuracy but only 27.8% precision and 21.7% recall. Visual embeddings performed significantly better with 96% accuracy, 80% precision, and 52% recall.

**Risk Assessment** - The scoring algorithm weighs visual pattern detection (50%) and background similarity (50%) equally. Scores of 75+ indicate high-confidence fraud, 38-74 indicate medium confidence, and below 38 is classified as legitimate.

### Fraud Ingestion Pipeline

An important LLMOps consideration is the continuous learning loop. The architecture includes a fraud ingestion pipeline where confirmed fraud images are ingested from Amazon S3 through a Lambda function, processed by Amazon Rekognition for face masking, vectorized by Amazon Bedrock Titan Embeddings, and stored in Amazon S3 Vectors. This grows the reference database over time, enabling the system to improve its detection capabilities as it encounters new fraud patterns.

## Production Deployment and Infrastructure

The serverless architecture demonstrates mature LLMOps infrastructure practices. The entire solution runs on AWS Lambda, AWS Step Functions, and Amazon API Gateway. This design enabled the team to modify individual Lambda functions, test changes immediately, and deploy updates without downtime - critical during a 6-week engagement where the approach changed weekly.

Authentication uses Amazon Cognito with AWS SigV4 request signing. AWS WAF protects against common web security issues. Data is encrypted at rest with AWS Key Management Service (AWS KMS) and in transit via TLS 1.2+. The infrastructure is defined in Terraform, demonstrating infrastructure-as-code best practices. The deployment passed security audits with 25 findings analyzed: 14 false positives, 9 justified exceptions, and 2 deferred for production.

## Model Selection and Performance

The solution primarily uses Anthropic's Claude Sonnet 4 via Amazon Bedrock for intelligent structuring and visual analysis, along with Amazon Titan Multimodal Embeddings for generating vector representations. The choice of Claude Sonnet 4 appears well-justified based on its multilingual capabilities and document understanding, though the team had to learn through experimentation that direct PII extraction wasn't suitable for this model.

The model access was enabled through Amazon Bedrock, which provides a managed service approach that simplifies production deployment. There's no mention of provisioned throughput in the main implementation, suggesting the team used on-demand inference, though the cleanup section mentions checking for provisioned throughput configurations.

## Results and Performance Metrics

The production system was evaluated against 585 ID images with impressive improvements:

**ID Extraction Performance:**
- Name: 84.93% → 87.72% (+2.79%)
- Date of birth: 81.25% → 90.80% (+9.55%)
- Document type: 78.43% → 96.40% (+17.97%)
- ID number: 74.32% → 89.40% (+15.08%)
- Overall accuracy: 79.73% → 90.80% (+11.07%)

ID number extraction, previously the weakest field at 74.32%, improved by over 15 percentage points. Document type classification reached 96.4%. Average processing time: 4.42 seconds per document.

**Fraud Detection Performance:**
The combined end-to-end fraud detection pipeline achieved 81% accuracy with 59% recall and 83% specificity. The 59% recall means the system catches about 6 in 10 fraud cases. While this might seem low, it reflects a business reality: false positives create customer friction, while missed fraud can be caught through other controls. As the fraud pattern database grows with confirmed cases, recall is expected to improve.

**Cost and Speed:**
The ID extraction component achieved a 91% cost reduction versus the previous solution, making it economically viable to serve industries with lower-value microloans. The fraud detection pipeline completes in 3-5 seconds per image.

**Operational Impact:**
- Manual intervention projected to drop from 60% to 30% of applications, cutting the review workload in half
- Staffing projected to decrease from approximately 3 FTEs to approximately 1 FTE for this industry
- Region expansion now economically viable for low-value loan economies
- Adaptability - adding a new document type or language requires prompt engineering and validation, not retraining specialized models

## Scalability and Prompt Engineering

The solution's architecture demonstrates excellent scalability planning for LLMOps. Sun Finance operates across nine countries, and the serverless design enables industry-specific deployments without infrastructure duplication. Adding a new economy requires configuration updates and redeployment through the CI/CD pipeline using Terraform. The team updates Claude Sonnet 4 prompts via Amazon Bedrock and defines document-specific validation rules, then tests against a validation dataset.

This configuration-driven approach to expanding to new markets and document types is a key LLMOps pattern. Rather than requiring model retraining or fine-tuning, the system relies on prompt engineering to adapt to new contexts. The text indicates that "adding a new document type or language requires prompt engineering and validation, not retraining specialized models."

The fraud detection system's two complementary methods provide different scalability characteristics. Visual pattern detection via Claude Sonnet 4 identifies screen photos and digital manipulation using techniques that are largely universal across industries. Background similarity analysis using Amazon S3 Vectors catches fraud rings by comparing backgrounds against known patterns, with confirmed fraud cases added to improve detection over time.

The modular architecture enables continuous enhancement through the AWS Step Functions orchestration, which allows adding new fraud detection methods as parallel Lambda functions without disrupting existing checks. Future capabilities mentioned include EXIF metadata analysis, device fingerprinting, and geolocation validation, each of which would integrate as additional parallel checks without requiring architectural changes.

## Critical Lessons for LLMOps

The case study articulates five practical takeaways that represent valuable LLMOps lessons:

**OCR + LLM beats LLM alone** - Claude Sonnet 4 alone achieved 61.8% accuracy for ID extraction, below the existing baseline. Adding Amazon Textract for raw text extraction and using Claude only for structuring jumped accuracy to 85%. The lesson is that LLMs are good at understanding context and normalizing messy data but not as reliable at precise character-by-character recognition from images.

**Multi-tier OCR delivers resilience** - The cascading approach using Amazon Textract as primary and Amazon Rekognition as fallback demonstrates that no single OCR service handles every edge case, but the combination adds minimal cost while avoiding complete failures on challenging images.

**Fraud detection needs multiple methods** - Visual pattern detection catches screen photos at 95%+ confidence. Background similarity catches fraud rings through location patterns. But background similarity only achieves 55% recall on seen patterns and drops to 16.7% on novel patterns. Neither method alone is sufficient, and the system improves as more confirmed fraud cases are added to the database.

**Start simple, add complexity when metrics demand it** - The team achieved a 91% cost reduction by using Amazon Textract as primary OCR instead of Claude for everything. They called `AnalyzeID` only when specific fields were missing and cached embeddings for fraud detection. This demonstrates the LLMOps principle of reserving expensive models for tasks where they're actually needed.

**Serverless enables rapid iteration** - The parallel execution in AWS Step Functions cut fraud detection latency by 40% with minimal code changes. The ability to modify and deploy individual Lambda functions without downtime was critical during a 6-week engagement where the approach evolved weekly.

## Future Development and Continuous Improvement

Sun Finance plans several enhancements that demonstrate ongoing LLMOps maturity:

**Expand visual detection** - The current system only checks for screen photos but misses cartoons, illustrations, and AI-generated images. Expanding the detection prompt is identified as the lowest-effort, highest-impact improvement, demonstrating the value of prompt engineering in production systems.

**More training data** - Continuous collection of confirmed fraud cases and diverse background patterns will directly improve background similarity recall beyond the current 55% on seen patterns. This demonstrates the importance of the data flywheel in LLMOps.

**Additional fraud signals** - Integrating EXIF metadata analysis, device fingerprinting, and geolocation validation would add detection paths that don't depend on visual analysis, particularly valuable for novel fraud patterns.

**Multi-language expansion** - Expanding to Sun Finance's other economies across Southeast Asia, Africa, Latin America, and Europe requires language-specific prompt engineering and validation rules. Claude's multilingual capabilities provide a starting point, and the team is building a configuration framework to enable expansion without code changes.

## Assessment and Critical Perspective

While this case study demonstrates impressive results, it's important to note that this is an AWS-published case study about an AWS customer using AWS services. The 91% cost reduction claim should be viewed with some caution as it compares against an unspecified "previous solution" without detailed cost breakdowns. The fraud detection recall of 59% is acknowledged as relatively low, though the text provides reasonable business justification for conservative thresholds.

The architecture demonstrates mature LLMOps practices including: rapid iterative development with clear metrics, separation of concerns between specialized services, serverless deployment for scalability, infrastructure-as-code with Terraform, security controls and audit compliance, parallel processing for latency optimization, continuous learning through fraud pattern ingestion, and configuration-driven expansion rather than model retraining.

The compressed timeline from proof-of-concept to production (107 business days total, with only 35 days for Sun Finance to move to production) is impressive and speaks to the maturity of AWS's managed services for LLM deployment. The ability to iterate weekly during the 6-week engagement demonstrates the value of serverless architecture and infrastructure-as-code for LLMOps experimentation.

The case study provides valuable insights into production LLM deployment challenges that are often overlooked, particularly around model safety features (Claude's PII protections) creating unexpected constraints, and the importance of combining specialized tools rather than relying on a single LLM for all tasks.
