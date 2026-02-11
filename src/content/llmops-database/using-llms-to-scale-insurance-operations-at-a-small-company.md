---
title: "Using LLMs to Scale Insurance Operations at a Small Company"
slug: "using-llms-to-scale-insurance-operations-at-a-small-company"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3bae3bf14d773fc24830"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:39:08.626Z"
  createdOn: "2024-11-21T13:54:54.962Z"
llmopsTags:
  - "amazon-aws"
  - "classification"
  - "compliance"
  - "devops"
  - "document-processing"
  - "documentation"
  - "embeddings"
  - "error-handling"
  - "fallback-strategies"
  - "google-gcp"
  - "guardrails"
  - "high-stakes-application"
  - "hugging-face"
  - "monitoring"
  - "open-source"
  - "prompt-engineering"
  - "question-answering"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "scaling"
  - "security"
  - "semantic-search"
industryTags: "insurance"
company: "Anzen"
summary: "Anzen, a small insurance company with under 20 people, leveraged LLMs to compete with larger insurers by automating their underwriting process. They implemented a document classification system using BERT and AWS Textract for information extraction, achieving 95% accuracy in document classification. They also developed a compliance document review system using sentence embeddings and question-answering models to provide immediate feedback on legal documents like offer letters."
link: "https://www.youtube.com/watch?v=1_NTxx3CJXg"
year: 2023
seo:
  title: "Anzen: Using LLMs to Scale Insurance Operations at a Small Company - ZenML LLMOps Database"
  description: "Anzen, a small insurance company with under 20 people, leveraged LLMs to compete with larger insurers by automating their underwriting process. They implemented a document classification system using BERT and AWS Textract for information extraction, achieving 95% accuracy in document classification. They also developed a compliance document review system using sentence embeddings and question-answering models to provide immediate feedback on legal documents like offer letters."
  canonical: "https://www.zenml.io/llmops-database/using-llms-to-scale-insurance-operations-at-a-small-company"
  ogTitle: "Anzen: Using LLMs to Scale Insurance Operations at a Small Company - ZenML LLMOps Database"
  ogDescription: "Anzen, a small insurance company with under 20 people, leveraged LLMs to compete with larger insurers by automating their underwriting process. They implemented a document classification system using BERT and AWS Textract for information extraction, achieving 95% accuracy in document classification. They also developed a compliance document review system using sentence embeddings and question-answering models to provide immediate feedback on legal documents like offer letters."
---

## Company Overview and Business Context

Anzen is a small insurtech startup with fewer than 20 employees that tackles the $23 billion annual problem of employment-related lawsuits (employees suing employers). Their solution combines traditional insurance coverage with a software product aimed at helping companies avoid lawsuits in the first place. The presenter, Cam Feenstra, shared insights from approximately 18 months of experience at the company, discussing how a small team can leverage LLMs to "punch above their weight" and compete with much larger insurance incumbents.

The talk was framed around the inherent challenges small companies face when competing with larger organizations: limited capital, smaller teams, less data, and fewer network effects. However, Anzen has sought to capitalize on advantages in agility and faster adoption of new technologies like LLMs, which larger companies may be slower to deploy due to bureaucracy or "if it's not broke don't fix it" attitudes.

## Use Case 1: Automated Insurance Underwriting Pipeline

### The Traditional Problem

Insurance underwriting involves evaluating companies seeking coverage—reviewing financials, litigation history, and various risk factors—to determine whether to write a policy and at what price. The traditional workflow involves:

- Retail insurance brokers sitting between clients and insurance companies
- Applications arriving via email or fax in numerous different formats
- A dedicated team manually receiving, deduplicating, and extracting information from applications
- Applications being long, dense, and inconsistently formatted, making automated extraction challenging
- Underwriters making final decisions based on extracted information

Making this process as frictionless as possible for brokers is critical since brokers work with many clients and many insurance carriers simultaneously—if the process is difficult, they simply take their business elsewhere.

### The LLM-Powered Solution

Anzen implemented an automated pipeline with two main components:

**Document Classification:** They built a classifier based on Google's BERT model to determine whether incoming attachments are insurance applications. Starting from essentially random baseline performance, they:

- Pulled approximately 300 attachments from their team inbox
- Manually labeled them in an afternoon
- Trained a classifier achieving 95% accuracy, 90% precision, and 100% recall
- Tested multiple open-source models from Hugging Face with various training configurations
- Deliberately optimized for recall over precision, accepting some noise to ensure no applications were missed

The presenter emphasized the remarkable efficiency gain here: what would previously have required training a model from scratch (at least an order of magnitude more effort and data) was accomplished in under a week end-to-end. The 300 labeled samples were sufficient for production-quality performance.

**Information Extraction:** For extracting specific fields from applications (company name, financial details, etc.), they used AWS Textract's question-answering feature. This API allows queries like "What is the company applying for insurance?" and extracts answers from PDF documents. While AWS doesn't disclose implementation details, the performance suggests LLM technology under the hood.

### Production Architecture

The automated pipeline works as follows:
- Application arrives in inbox
- Classifier determines if it's an insurance application
- Duplicate detection filters out repeated submissions (since companies may work with multiple brokers)
- Information extraction pulls relevant fields
- Alert sent to underwriting team for final decision

This replaced what would traditionally require a dedicated team just for intake and preprocessing.

## Use Case 2: Document Compliance Analysis

### The Hypothesis

Anzen hypothesized that entrepreneurs and startups could benefit from automated compliance review of HR documents (offer letters, separation agreements) rather than relying solely on expensive legal review. The key requirement was high accuracy—they explicitly wanted to avoid "bogus outputs" that might mislead users on compliance matters.

### Technical Implementation

The solution uses a multi-step pipeline for each document type:

**Feature Extraction Architecture:**
- Domain knowledge gathered from attorneys about common compliance issues
- For each document type, they defined specific features to extract (e.g., salary, exempt/non-exempt status for offer letters)
- Two-step extraction process:
  - Sentence embeddings (using Microsoft's MiniLM model) for semantic search to identify relevant document sections
  - Question-answering model (BERT-based) to extract exact values from those sections
- Business logic layer applies attorney-provided rules to generate positive and negative insights

Notably, they found that MiniLM (not technically a large language model) outperformed larger models for the semantic search component—a reminder that "larger" isn't always better for specific tasks.

The system was prototyped with just a few dozen examples of each document type, with manually written prompts for feature extraction. While the presenter noted it was too early to confirm the hypothesis, the prototype was built in approximately one week and initial feedback has been positive.

## Key LLMOps Learnings

### Infrastructure Considerations

The presenter emphasized that deploying LLMs in production still requires strong infrastructure expertise:
- Models are resource-intensive
- Understanding performance under load is critical
- Standard production system concerns (reliability, scalability) are even more important with LLMs
- That said, for prototyping, they successfully deployed reasonably large models on standard CPU instances without specialized hardware

### Evaluation and Monitoring

Evaluation metrics are described as "very important" for understanding if models perform as well in production as in testing and whether performance degrades over time. However, the presenter was candid that at their current scale, evaluation is largely manual:
- Outputs go to a Slack channel for human review
- Team members flag incorrect classifications or misses
- Periodic model improvement based on accumulated feedback
- The original labeled dataset serves as a regression test baseline

This represents an honest assessment that startups often must balance ideal practices against resource constraints, with more automated evaluation planned as they scale.

### API vs. Self-Hosted Cost Considerations

An important operational insight: when using external APIs, iteration costs can be significant or even prohibitive. Since business logic on top of model outputs requires frequent changes, and testing different prompts or configurations requires repeated API calls, these costs must be factored into planning. This is a practical consideration often overlooked in proof-of-concept work.

### Debugging LLMs

During the Q&A, the presenter discussed the unique challenges of debugging LLM-based systems:
- Trial and error remains a primary approach
- No tools exist today to trace information flow through models
- Evaluation metrics become essential since you can't explain what the model is "thinking"
- Following research on Twitter/X and bookmarking promising techniques
- The field is emerging and may become a formal discipline within years

### Future Directions

Anzen has been cautious about deploying generative models like GPT-4 in production, focusing instead on proven classification and extraction approaches. However, they're exploring:
- LLM-powered underwriting assistants that could fetch company data and make initial recommendations (early experiments show promise)
- Natural language compliance Q&A systems to help users navigate scattered compliance information

## Critical Observations

The presenter offered balanced perspectives on when LLMs are and aren't appropriate:
- Traditional wisdom of "use ML as little as possible" still applies
- LLMs excel at previously unsolved problems (noting examples of failed automated underwriting systems)
- Using LLMs unnecessarily can degrade systems: they're slow, may only work 80% of the time, and introduce unpredictability
- Model non-determinism and API provider model updates create reliability challenges unlike traditional software
- The vision of "text as the new UI" is viewed skeptically—good software will be built on top of LLMs rather than replacing traditional interfaces

The discussion also touched on the fundamental challenge of output reliability: no amount of prompt engineering can force models to produce exact desired formats, and experiments with AI agent loops (popular at the time) often failed to produce consistent results.

## Practical Takeaways for Small Teams

The case study demonstrates that small teams can effectively deploy LLMs by:
- Starting with well-understood problems where traditional solutions exist as baselines
- Using pre-trained models and fine-tuning with limited data (hundreds, not thousands of samples)
- Combining multiple smaller models (embeddings + QA) rather than relying on one large model
- Building prototypes rapidly (under a week) to validate hypotheses before major investment
- Accepting manual evaluation processes initially while planning for automation
- Being selective about which problems truly benefit from LLM solutions