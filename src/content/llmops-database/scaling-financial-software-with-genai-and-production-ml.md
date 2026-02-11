---
title: "Scaling Financial Software with GenAI and Production ML"
slug: "scaling-financial-software-with-genai-and-production-ml"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "679393b8d1899a3cfb179c9f"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:58:13.119Z"
  createdOn: "2025-01-24T13:20:56.755Z"
llmopsTags:
  - "fraud-detection"
  - "customer-support"
  - "document-processing"
  - "regulatory-compliance"
  - "realtime-application"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "multi-agent-systems"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "elasticsearch"
  - "chromadb"
  - "monitoring"
  - "databases"
  - "microservices"
  - "openai"
  - "microsoft-azure"
  - "amazon-aws"
industryTags: "finance"
company: "Ramp"
summary: "Ramp, a financial technology company, has integrated AI and ML throughout their operations, from their core financial products to their sales and customer service. They evolved from traditional ML use cases like fraud detection and underwriting to more advanced generative AI applications. Their Ramp Intelligence suite now includes features like automated price comparison, expense categorization, and an experimental AI agent that can guide users through the platform's interface. The company has achieved significant productivity gains, with their sales development representatives booking 3-4x more meetings than competitors through AI augmentation."
link: "https://www.youtube.com/watch?v=yGcXDNHYlbs&list=PLHYy8ChnMLKB1mP4ohDv3MYwmalr1wA33&index=8"
year: 2023
seo:
  title: "Ramp: Scaling Financial Software with GenAI and Production ML - ZenML LLMOps Database"
  description: "Ramp, a financial technology company, has integrated AI and ML throughout their operations, from their core financial products to their sales and customer service. They evolved from traditional ML use cases like fraud detection and underwriting to more advanced generative AI applications. Their Ramp Intelligence suite now includes features like automated price comparison, expense categorization, and an experimental AI agent that can guide users through the platform's interface. The company has achieved significant productivity gains, with their sales development representatives booking 3-4x more meetings than competitors through AI augmentation."
  canonical: "https://www.zenml.io/llmops-database/scaling-financial-software-with-genai-and-production-ml"
  ogTitle: "Ramp: Scaling Financial Software with GenAI and Production ML - ZenML LLMOps Database"
  ogDescription: "Ramp, a financial technology company, has integrated AI and ML throughout their operations, from their core financial products to their sales and customer service. They evolved from traditional ML use cases like fraud detection and underwriting to more advanced generative AI applications. Their Ramp Intelligence suite now includes features like automated price comparison, expense categorization, and an experimental AI agent that can guide users through the platform's interface. The company has achieved significant productivity gains, with their sales development representatives booking 3-4x more meetings than competitors through AI augmentation."
---

## Overview

Ramp is a corporate finance platform that positions itself as a "command and control system for finance," enabling companies to issue cards, make payments, manage approvals, and automate accounting from a single interface. The company, founded in 2019 and now serving approximately 25,000 businesses ranging from early-stage startups to publicly traded companies like Shopify, claims its customers save an average of 5% on their expenses. This case study, derived from a podcast conversation between Ramp CEO Eric Glyman and Matt Turck at Data Driven NYC, reveals how the company has deeply embedded AI and machine learning throughout both its products and internal operations.

What makes this case study particularly interesting from an LLMOps perspective is that Ramp represents a company that was using AI and ML techniques well before the generative AI wave, and has subsequently layered generative AI capabilities on top of their existing ML infrastructure. The company's CEO explicitly noted that they would have branded their earlier company, Paribus (acquired by Capital One), as an "AI agent" if it were 2024 — suggesting a long history with production AI systems.

## Data Infrastructure and Platform Architecture

Ramp's data infrastructure is notably heterogeneous, reflecting the diverse requirements of different use cases across the platform. The company uses multiple database technologies chosen for specific performance characteristics:

- **Snowflake**: Heavy usage for analytics and data warehousing
- **AWS**: Core application infrastructure and storage
- **ClickHouse**: Selected specifically for its performance on analytics queries, particularly important for fraud detection scenarios where speed matters
- **Materialize**: Used for real-time fraud detection, where the ability to run analyses in seconds rather than minutes can prevent millions of dollars in losses
- **Vector databases**: Mentioned in the context of AI-oriented applications
- **OpenAI via Azure**: Powers generative AI features

The choice of Materialize for real-time fraud detection is particularly noteworthy. As Glyman explained, when fraud occurs and attackers realize there's an open credit line, they often execute rapid-fire transactions. The difference between stopping fraud seconds after it starts versus minutes later can translate to millions of dollars in losses. This is a clear example of how infrastructure choices in LLMOps directly impact business outcomes.

The company maintains a centralized customer data platform (CDP) owned by the data team, which ensures standardized data models across the organization. This centralization is considered critical — without it, disparate models would proliferate across teams. Analytics tools like Looker are layered on top to enable non-engineering staff to query data.

## Traditional Machine Learning in Production

Before discussing generative AI, it's worth examining Ramp's extensive use of traditional machine learning, which forms the foundation of many core product features:

### Underwriting

Ramp extends credit to businesses, requiring sophisticated underwriting decisions. The company ingests bank transaction data, credit bureau information, and other financial signals to make approval decisions. Glyman offered a balanced perspective on the value of ML in underwriting — noting that while the fintech industry has sometimes overstated its importance, ML does provide meaningful improvements. He estimated that great ML-based models can push approval rates from the low 90s to the mid-90s, enabling Ramp to say yes to more customers while maintaining low loss rates. For context, corporate card losses are significantly lower than consumer cards — Amex historically loses 0.1-0.2% per year in the corporate segment, and Ramp claims to be below that figure.

### Fraud Detection

Fraud prevention relies heavily on ML models that analyze clustering patterns and typical transaction behaviors for each company. The real-time nature of this system is critical — account takeovers and velocity attacks require immediate response. The infrastructure choices (ClickHouse, Materialize) were specifically made to support the latency requirements of fraud detection.

### Receipt Matching and OCR

Receipt matching was one of Ramp's earliest ML use cases. The company's key insight was that expense management traditionally required two separate apps — one for the credit card transaction and another for expense reporting. By combining these, Ramp gained a significant advantage: receipt matching becomes a matching problem rather than a pure OCR problem. When a user uploads a receipt, the system already has transaction data to match against, enabling far higher accuracy than competitors who rely solely on image recognition.

## Generative AI: The Ramp Intelligence Suite

Ramp launched their "Ramp Intelligence" suite of GPT-powered capabilities in 2023. The CEO made an interesting observation about the early generative AI landscape: there was a phase where companies wanted to "put a chatbot everywhere," but Ramp never encountered customers who wished they could "chat with their bank account." Instead, they focused on use cases where AI could genuinely improve outcomes.

### Price Intelligence

When users view a vendor page, Ramp cleanses merchant data (converting cryptic transaction codes like "SFDC*" into recognizable names like "Salesforce") and shows how the customer's prices compare to aggregated data from other Ramp customers. This is a data network effect in action — the more customers use the platform, the better the price intelligence becomes.

### Expense Intelligence

The system can automatically categorize expenses with enough detail to distinguish between, for example, a "shrimp cocktail" and an "old fashioned" — enabling compliance managers to focus on meaningful policy violations rather than manually reviewing every transaction.

### Accounting Intelligence and Automation

Ramp describes this as "autocomplete for accounting categories." By learning from how companies code transactions over time, and leveraging patterns from across the customer base, the system can increasingly automate the accounting process.

## Data Privacy Considerations

Given the sensitive nature of financial data, Glyman addressed data privacy practices directly. The vast majority of individual company performance data is strictly off-limits for sharing. The price intelligence feature operates on a "give-get" model — customers must opt in to submit their data to access aggregated benchmarks, and can opt out if preferred. For AI features that leverage third-party providers (like OpenAI), Ramp maintains data privacy agreements and audits not just their own practices but the downstream handling by partners.

## Agentic AI: Experimental Frontiers

The most forward-looking LLMOps work at Ramp involves agentic AI capabilities currently in alpha testing. When OpenAI released GPT-4o with multimodal capabilities, Ramp began experimenting with an agent that can see what the user sees on their screen.

Users can invoke this agent with a keyboard shortcut (Control+B) and issue natural language commands like "I'd like to issue a card for $50 that can only be used at Starbucks." The model then acts as a "tour guide," navigating the interface, clicking tabs, entering inputs, and completing actions like issuing cards or booking travel.

The reliability metrics here are telling: Glyman estimated the agent works correctly 60-90% of the time for controlled tasks within the Ramp experience. He acknowledged this isn't high enough for general release in a financial product where reliability requirements are stringent, but the company continues testing and improving these capabilities.

This represents an important lesson for LLMOps practitioners: the threshold for "production ready" varies dramatically by domain. A 60-90% success rate might be acceptable for a content recommendation system but is insufficient for a system that moves money.

## Internal Operations: AI-Augmented Productivity

Perhaps equally interesting to the product applications is how Ramp uses AI internally to drive operational efficiency. The company claims their SDRs (Sales Development Representatives) book 3-4 times as many meetings as competitors, largely due to AI augmentation of their workflow.

Rather than purchasing external "AI SDR" products, Ramp decomposed the SDR workflow into components and built targeted automation for each:
- Identifying signals that predict good prospects (funding announcements, finance team hires)
- Building prospect lists
- Looking up contact information
- Writing personalized outreach copy
- Measuring results to improve messaging

The organizational structure that enables this is notable: cross-functional teams with joint accountability. In the SDR example, outbound reps, growth engineers, and the growth team work together toward a single goal (booking meetings), with each contributing their expertise.

### Gong Call Analysis and "Toby"

Ramp has recorded over 100,000 sales calls through Gong. Rather than expecting humans to review this corpus, they built systems to query it using LLMs. "Toby" is an internal AI assistant that can answer questions about customer sentiment, reasons for wins and losses against competitors, and other insights from the call transcripts. Sentiment analysis identifies both the happiest and most disgruntled customers. SDRs use these insights to craft better messaging, and product managers use it for research.

This represents a common but valuable LLMOps pattern: using LLMs to make previously inaccessible data (in this case, unstructured audio transcripts) queryable and actionable.

## Organizational Structure for AI

Ramp's applied AI team has an unusual mandate: they can enter any team to identify opportunities for AI application. The team implemented ClickHouse and drove infrastructure improvements. As an example of their impact, they worked with underwriters on cases that couldn't be fully automated by ML, reducing average manual underwriting time from two days to roughly half a day.

The data team reports into the CTO and maintains centralized ownership of the customer data platform to prevent model fragmentation. Analytics tools and automation are built on top of this centralized foundation. Customer support notably reports into product rather than operations, based on the philosophy that problems should trigger product fixes rather than ticket resolution.

## Lessons on Production AI Reliability

Several interesting patterns emerge from Ramp's experience with production AI:

The CEO emphasized that "almost 100%" of companies applying for credit can be approved — the goal of ML underwriting isn't to reject more customers but to confidently approve more while maintaining low loss rates.

For agentic AI, the 60-90% reliability range isn't acceptable for financial products, even with user supervision. This suggests a framework for evaluating production readiness that accounts for domain-specific risk tolerance.

Real-time requirements in fraud detection drove specific infrastructure choices (ClickHouse, Materialize) over general-purpose databases. The difference between seconds and minutes of latency translates directly to financial impact.

The company maintains an "alpha" user group ("Ramp Slab") for testing experimental features, providing a controlled environment to iterate on reliability before broader release.

## Cultural Elements Supporting AI Adoption

Ramp tracks the number of days since incorporation (1,942 at the time of recording) as a cultural touchstone for maintaining urgency and velocity. Teams are kept small (the core spend management team has 13-14 people despite the product's maturity) to preserve agility. Engineers and data scientists are explicitly connected to business outcomes rather than siloed into technical work, enabling the kind of cross-functional collaboration that produced the AI-augmented SDR workflow.

The company celebrates rapid iteration — a feature was reportedly built and shipped within a week of a customer requesting it on Twitter during a holiday weekend — creating cultural reinforcement for the velocity that enables rapid AI experimentation and deployment.