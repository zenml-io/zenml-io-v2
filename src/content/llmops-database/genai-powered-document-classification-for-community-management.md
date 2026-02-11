---
title: "GenAI-Powered Document Classification for Community Management"
slug: "genai-powered-document-classification-for-community-management"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "698add71f60c528768db3652"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-10T11:06:51.158Z"
  lastUpdated: "2026-02-10T07:51:47.668Z"
  createdOn: "2026-02-10T07:25:37.739Z"
llmopsTags:
  - "document-processing"
  - "classification"
  - "prompt-engineering"
  - "cost-optimization"
  - "latency-optimization"
  - "evals"
  - "scalability"
  - "orchestration"
  - "serverless"
  - "anthropic"
  - "amazon-aws"
industryTags: "other"
company: "Associa"
summary: "Associa, North America's largest community management company managing 48 million documents across 26 TB of data, faced significant operational inefficiencies due to manual document classification processes that consumed employee hours and created bottlenecks. Collaborating with the AWS Generative AI Innovation Center, Associa built a generative AI-powered document classification system using Amazon Bedrock and the GenAI IDP Accelerator. The solution achieved 95% classification accuracy across eight document types at an average cost of 0.55 cents per document, using Amazon Nova Pro with a first-page-only approach combined with OCR and image inputs. The system processes documents automatically, integrates seamlessly into existing workflows, and delivers substantial cost savings while reducing manual classification effort and improving operational efficiency."
link: "https://aws.amazon.com/blogs/machine-learning/how-associa-transforms-document-classification-with-the-genai-idp-accelerator-and-amazon-bedrock?tag=soumet-20"
year: 2026
---

## Overview

Associa is North America's largest community management company, overseeing approximately 7.5 million homeowners through 15,000 employees distributed across more than 300 branch offices. The company manages a massive document repository of approximately 48 million documents spanning 26 TB of data. Prior to this generative AI initiative, Associa's document management system lacked efficient automated classification capabilities, forcing employees to spend substantial time manually categorizing and organizing incoming documents across multiple document types. This manual process was both time-consuming and error-prone, creating operational bottlenecks that resulted in delays and reduced productivity across the organization.

The solution developed in collaboration with the AWS Generative AI Innovation Center represents a production-scale implementation of generative AI for document classification. Built using the Generative AI Intelligent Document Processing (GenAI IDP) Accelerator and Amazon Bedrock, the system automatically categorizes incoming documents with high accuracy while providing cost efficiency and seamless integration into existing operational workflows. According to Andrew Brock, President of Digital & Technology Services and Chief Information Officer at Associa, the solution improves how employees manage and organize documents with significant reductions in manual effort, substantial cost savings, and operational improvements while maintaining high accuracy standards.

## Technical Architecture and Infrastructure

The solution is built on the GenAI IDP Accelerator, a cloud-based document processing solution constructed on AWS infrastructure that automatically extracts and organizes information from various document types. The accelerator employs OCR technology through Amazon Textract combined with generative AI models available through Amazon Bedrock to convert unstructured documents into structured, usable data. The architecture is designed to scale seamlessly to handle high document volumes, which is critical for Associa's operational requirements given their massive document repository and distributed branch structure.

The accelerator features a flexible, modular design implemented using AWS CloudFormation templates that can accommodate different types of document processing while sharing core infrastructure for job management, progress tracking, and system monitoring. The accelerator supports three distinct processing patterns, with this implementation utilizing Pattern 2 that combines OCR capabilities from Amazon Textract with classification powered by Amazon Bedrock foundation models. This pattern proved optimal for Associa's use case, which required both text extraction and intelligent classification across multiple document categories.

## Evaluation Framework and Methodology

The development team conducted a comprehensive evaluation to optimize the document classification workflow across three critical dimensions: prompt input strategy, prompt design approach, and model selection. This systematic evaluation framework was essential for identifying the configuration that would deliver the highest accuracy while minimizing processing inference costs for Associa's specific document types and operational requirements.

The evaluation dataset consisted of 465 PDF documents distributed across eight distinct document types: Bylaws, CCR Declarations, Certificate of Insurance, Contracts, Minutes, Plat Map, Policies and Resolutions, and Rules and Regulations. The dataset also included samples categorized as "Unknown" document type—typically drafts or email correspondences that lacked sufficient classification criteria. The distribution across document types was notably unbalanced, ranging from just 6 samples for Policies and Resolutions to 155 samples for Minutes. This imbalanced distribution reflects real-world operational conditions and made the evaluation more representative of production challenges.

## Prompt Input Optimization: Full PDF vs. First Page Only

The initial evaluation phase examined whether to use full PDF documents (all pages) or only the first page as input to the classification prompt. Using Amazon Nova Pro with both OCR and image data, the full PDF approach achieved an overall classification accuracy of 91%, correctly classifying 425 out of 465 documents at an average cost of 1.10 cents per document. Performance varied significantly across document types, with Certificate of Insurance achieving 100% accuracy and Minutes achieving 95% accuracy. However, the Unknown document type posed substantial challenges, achieving only 40% accuracy with just 8 out of 20 documents correctly classified.

The team then experimented with using only the first page of PDF documents for classification. This approach yielded substantial improvements: overall accuracy increased from 91% to 95% with 443 out of 465 documents classified correctly, while classification cost per document decreased by approximately 50% from 1.10 cents to 0.55 cents. Perhaps most significantly, Unknown document classification accuracy improved dramatically from 40% to 85%. The team hypothesized that first pages typically contain the most distinctive document features and identifying characteristics, whereas later pages in drafts or email threads can introduce noise that confuses the classifier. This first-page-only approach also delivered faster processing speeds and lower infrastructure costs, making it the clear choice for subsequent evaluations.

## Prompt Design Evaluation: OCR Plus Image vs. Image Only

The next evaluation phase examined whether OCR data extraction was necessary for document classification or whether using the document image alone in a multimodal prompt would suffice. Removing the OCR text extraction from the prompt and relying entirely on visual features would eliminate Amazon Textract costs and simplify the processing pipeline. Using Amazon Nova Pro with only image input on the first page, the system achieved 93% overall accuracy, correctly classifying 433 out of 465 documents at a significantly reduced cost of 0.18 cents per document.

However, this image-only approach demonstrated similar weaknesses to the full PDF classification approach, particularly for Unknown document types. While overall accuracy remained relatively high at 93%, Unknown documents saw accuracy drop to just 50%, correctly classifying only 10 out of 20 documents. This represented a substantial degradation from the 85% Unknown document accuracy achieved with the combined OCR and image approach. For Associa's operational requirements, accurate Unknown document classification was identified as critical for downstream human review processes and overall operational efficiency. Despite the cost advantages of the image-only approach (0.18 cents vs. 0.55 cents per document), the team selected the combined OCR and image approach to maintain classification capability for edge cases and ambiguous documents.

## Model Selection and Performance Comparison

Using the optimal configuration of first-page-only classification with combined OCR and image inputs, the team evaluated multiple foundation models available through Amazon Bedrock to identify the optimal balance of accuracy and cost. The models evaluated included Amazon Nova Lite, Amazon Nova Pro, Amazon Nova Premier, and Anthropic's Claude Sonnet 4. The evaluation focused on three key metrics: overall classification accuracy across all document types, classification accuracy specifically for Unknown documents, and per-document classification costs.

Overall classification accuracy ranged from 95% to 96% across all models, demonstrating that modern foundation models have reached high capability levels for document classification tasks. Certain document types like Certificate of Insurance, Plat Map, and Minutes achieved 98-100% accuracy across all evaluated models, suggesting these categories have highly distinctive characteristics. The more significant variation appeared in Unknown document type performance, where model selection had substantial impact.

Anthropic's Claude Sonnet 4 achieved the highest Unknown document accuracy at 95%, followed by Amazon Nova Premier at 90% and Amazon Nova Pro at 85%. Amazon Nova Lite, despite matching the overall 95% accuracy of most other models, achieved only 50% accuracy on Unknown documents—the same weakness observed with the image-only approach. However, the superior performance of Claude Sonnet 4 came at a cost premium, increasing classification cost from 0.55 cents to 1.21 cents per document—more than double the cost of Amazon Nova Pro. Amazon Nova Premier achieved the best overall classification accuracy at 96% for 1.12 cents per document, representing a middle ground between Nova Pro and Claude Sonnet 4.

After considering trade-offs between accuracy, cost, and operational requirements, the team selected Amazon Nova Pro as the optimal model choice. At 95% overall accuracy and 85% Unknown document accuracy for 0.55 cents per document, Amazon Nova Pro offered the best balance for Associa's production deployment. While Claude Sonnet 4's 95% Unknown document accuracy was superior, the cost premium was not justified given Amazon Nova Pro's strong overall performance. Similarly, while Nova Premier offered marginally better overall accuracy (96% vs. 95%), the additional cost (1.12 cents vs. 0.55 cents) did not warrant the minimal accuracy improvement.

## Production Deployment and Operational Considerations

The final production configuration uses Amazon Nova Pro on Amazon Bedrock with a first-page-only approach combining OCR text extraction via Amazon Textract and document image in a multimodal prompt. This configuration achieves 95% classification accuracy at an average cost of 0.55 cents per document, representing a substantial improvement over manual classification processes in terms of both speed and cost efficiency. The GenAI IDP Accelerator infrastructure facilitates reliable performance scaling to handle high volumes of documents across Associa's distributed branch network.

The solution's modular architecture allows for future adaptations and improvements as both document types and foundation model capabilities evolve. The systematic evaluation methodology established during development provides a framework for reassessing configuration choices as new models become available or as operational requirements change. The emphasis on Unknown document classification reflects sophisticated thinking about production LLM systems—recognizing that edge cases and ambiguous inputs require special attention and that classification systems must not only categorize known types accurately but also identify documents that don't fit established categories for human review.

## Critical Assessment and Balanced Perspective

While this case study presents compelling results, several aspects warrant balanced consideration. First, the evaluation dataset of 465 documents, while substantial, represents a small fraction of Associa's 48 million document repository. The highly imbalanced class distribution (6 to 155 samples per category) raises questions about whether the evaluation results will generalize across the full production environment. The performance claims should be understood as reflecting this specific evaluation dataset rather than guaranteed production performance across all document variations and edge cases.

Second, the case study does not provide detailed information about false positive rates, confusion matrices, or specific misclassification patterns beyond aggregate accuracy numbers. Understanding which document types are commonly confused with one another would provide valuable insights for system refinement and for setting appropriate expectations for operational deployment. The dramatic improvement in Unknown document classification from the full PDF approach (40%) to the first-page approach (85%) suggests that document structure and layout play significant roles, but the case study does not deeply explore why this occurred or whether there are systematic patterns in remaining misclassifications.

Third, while cost per document is tracked carefully (ranging from 0.18 cents to 1.21 cents depending on configuration), the case study does not provide a comprehensive total cost of ownership analysis. The stated costs appear to reflect primarily inference costs for the foundation models and potentially OCR costs for Textract, but do not appear to include infrastructure costs for the accelerator framework, storage costs, data transfer costs, or ongoing operational and maintenance costs. For a complete business case evaluation, these additional cost components would need to be factored in alongside the demonstrated inference cost savings.

Fourth, the case study does not address important production LLM system concerns such as monitoring, observability, error handling, or handling of concept drift over time. As Associa's document types evolve or as new document categories emerge, the system will require ongoing evaluation and potentially retraining or prompt refinement. The case study does not describe mechanisms for detecting performance degradation, triggering human review for low-confidence predictions, or collecting feedback to improve the system over time.

Finally, while the case study emphasizes seamless integration into existing workflows, it provides limited detail about the actual integration implementation, user experience considerations, or change management processes. The success of AI systems in production often depends as much on organizational adoption and workflow integration as on technical performance metrics. Understanding how employees interact with the system, how classification errors are handled and corrected, and how the system supports rather than replaces human judgment would provide a more complete picture of operational impact.

Despite these considerations, the case study demonstrates thoughtful LLMOps practices including systematic evaluation methodology, explicit consideration of cost-accuracy trade-offs, attention to edge case performance (Unknown documents), and selection of appropriate foundation models based on empirical testing rather than assumptions. The emphasis on first-page-only classification represents practical optimization for the specific use case, and the comprehensive model comparison provides valuable reference data for similar document classification applications.