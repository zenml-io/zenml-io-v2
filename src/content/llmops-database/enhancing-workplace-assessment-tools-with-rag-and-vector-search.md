---
title: "Enhancing Workplace Assessment Tools with RAG and Vector Search"
slug: "enhancing-workplace-assessment-tools-with-rag-and-vector-search"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "675b1a0fc0fab564393addba"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:50:13.874Z"
  createdOn: "2024-12-12T17:14:55.589Z"
llmopsTags:
  - "unstructured-data"
  - "structured-output"
  - "question-answering"
  - "rag"
  - "vector-search"
  - "semantic-search"
  - "fastapi"
  - "security"
  - "microsoft-azure"
  - "databricks"
industryTags: "hr"
company: "Thomas"
summary: "Thomas, a company specializing in workplace behavioral assessments, transformed their traditional paper-based psychometric assessment system by implementing generative AI solutions through Databricks. They leveraged RAG and Vector Search to make their extensive content database more accessible and interactive, enabling automated personalized insights generation from unstructured data while maintaining data security. This modernization allowed them to integrate their services into platforms like Microsoft Teams and develop their new \"Perform\" product, significantly improving user experience and scaling capabilities."
link: "https://www.databricks.com/customers/thomas"
year: 2024
seo:
  title: "Thomas: Enhancing Workplace Assessment Tools with RAG and Vector Search - ZenML LLMOps Database"
  description: "Thomas, a company specializing in workplace behavioral assessments, transformed their traditional paper-based psychometric assessment system by implementing generative AI solutions through Databricks. They leveraged RAG and Vector Search to make their extensive content database more accessible and interactive, enabling automated personalized insights generation from unstructured data while maintaining data security. This modernization allowed them to integrate their services into platforms like Microsoft Teams and develop their new \"Perform\" product, significantly improving user experience and scaling capabilities."
  canonical: "https://www.zenml.io/llmops-database/enhancing-workplace-assessment-tools-with-rag-and-vector-search"
  ogTitle: "Thomas: Enhancing Workplace Assessment Tools with RAG and Vector Search - ZenML LLMOps Database"
  ogDescription: "Thomas, a company specializing in workplace behavioral assessments, transformed their traditional paper-based psychometric assessment system by implementing generative AI solutions through Databricks. They leveraged RAG and Vector Search to make their extensive content database more accessible and interactive, enabling automated personalized insights generation from unstructured data while maintaining data security. This modernization allowed them to integrate their services into platforms like Microsoft Teams and develop their new \"Perform\" product, significantly improving user experience and scaling capabilities."
---

## Overview

Thomas is a people science company with over 40 years of experience in psychometric assessments, focused on helping organizations improve workplace collaboration and job satisfaction by understanding how people interact. The company faced significant challenges scaling their traditional paper-based assessment model, which contained an enormous volume of content—described as "millions to the point of billions of words"—designed for one-on-one interpretations. Their legacy system struggled to connect with modern work applications and required labor-intensive manual training of HR directors and hiring managers to understand and implement assessments.

The core business challenge was twofold: first, making their people science tools more accessible to a broader range of employees; and second, reducing the time their own staff spent providing personalized feedback to customers. With a user profile being completed every 90 seconds, the need for efficient data ingestion and processing was critical for maintaining their market leadership position.

## Technical Implementation

### Platform Foundation

Thomas adopted the Databricks Data Intelligence Platform running on Azure to transform their data handling capabilities. The platform provided an integrated environment for their entire data workflow—from ingestion through transformation to analysis—while maintaining the security requirements necessary for handling sensitive psychometric and personal data.

### RAG Architecture and Vector Search

The centerpiece of Thomas's LLMOps implementation is their use of retrieval augmented generation (RAG) techniques combined with Databricks Vector Search. This architecture allows them to prompt LLMs with relevant context retrieved from their extensive content database. The implementation addresses a fundamental problem they had: guiding users to the specific pieces of content needed to solve their problems within an ocean of possible content variations.

According to Dr. Luke Treglown, Director of Data Science, the Vector Search capability was described as a "breakthrough" for the company. Rather than delivering 40- to 50-page reports to clients, they could now enable users to ask questions and receive dynamically generated, relevant answers. This represents a shift from static document delivery to interactive, query-based insights.

### Natural Language Processing Integration

The platform leverages NLP capabilities to enable users to propose queries in natural language and receive automatically generated insights from unstructured data. This is particularly significant given the massive volume of textual content Thomas had accumulated over decades. The GenAI integration transforms what was previously described as a "nightmare" of content management into a searchable, responsive system.

### Production Deployment Considerations

The case study highlights several important LLMOps considerations for production deployments:

**Security and Ethics**: Thomas emphasizes that Databricks provides a secure environment that allows them to leverage their large datasets and AI capabilities without compromising ethical commitments to customers. The platform's built-in features for managing data access and integration with existing security protocols ensure sensitive information remains protected and data integrity is maintained.

**Explainability and Transparency**: A notable aspect of their implementation is the focus on making GenAI outputs explainable. Treglown specifically mentions that "with Databricks, GenAI is not a black box." They can walk customers step-by-step through how insights were generated, which is crucial for a company dealing with psychometric assessments where trust and understanding of the methodology is essential.

**Speed to Production**: The platform enabled rapid development cycles, with Thomas moving from proof of concept to minimum viable product in weeks rather than months. This accelerated timeline suggests an effective MLOps/LLMOps infrastructure that reduces friction in the development-to-production pipeline.

### Product Integration

The GenAI capabilities have been integrated into multiple customer-facing products and platforms:

- **Perform Product**: A new product built on the GenAI foundation that delivers personalized assessment insights
- **Microsoft Teams Integration**: Their services are now available within workflows clients already use, maintaining continuous engagement without disrupting daily operations
- **Multiple Platform Deployments**: The company successfully integrated GenAI into three different platforms within a three-month period, demonstrating the scalability and reusability of their LLMOps infrastructure

## Results and Impact

The implementation has delivered measurable business outcomes according to the case study. User experience has become significantly more interactive, personalized, and efficient for locating content and information. User satisfaction has increased and deeper engagement has been observed, though specific metrics are not provided.

From an organizational perspective, Thomas has embraced a culture of innovation and continues to push boundaries in people science. The unified data foundation they've established provides flexibility for future AI initiatives.

## Critical Assessment

While this case study presents compelling benefits, it's important to note several considerations:

The case study is published on Databricks' own website as a customer story, which naturally presents the partnership in a favorable light. Specific quantitative metrics on accuracy, latency, cost savings, or user adoption rates are not provided, making it difficult to independently verify the claimed improvements.

The transition from "billions of words" of static content to a RAG-based system is technically sound, but the case study doesn't address potential challenges such as hallucination management, content accuracy verification, or how they handle edge cases where the retrieved context may not adequately support a response.

The claim about going from proof of concept to MVP "in weeks" is impressive but lacks detail on what resources were required or what functionality was included in the MVP versus the full production system.

Additionally, while the case study mentions ethical commitments and data protection, it doesn't specifically address how they ensure the LLM outputs maintain the scientific validity and reliability standards expected in psychometric assessments. This is a critical consideration when AI generates insights that may influence hiring decisions or workplace dynamics.

## Conclusion

Thomas's implementation represents a practical example of applying RAG and vector search to solve a real business problem—making decades of accumulated content searchable and actionable through natural language queries. The focus on explainability, security, and integration with existing workflows demonstrates mature thinking about productionizing GenAI. However, as with any vendor-published case study, the claimed benefits should be considered alongside the inherent promotional nature of the content.