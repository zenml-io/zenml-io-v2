---
title: "From Fine-Tuning to Agentic RAG: Reducing Technical Debt in Conversational AI for Auto Lease Buyouts"
slug: "from-fine-tuning-to-agentic-rag-reducing-technical-debt-in-conversational-ai-for-auto-lease-buyouts"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "classification"
  - "rag"
  - "fine-tuning"
  - "prompt-engineering"
  - "agent-based"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "cost-optimization"
  - "latency-optimization"
  - "system-prompts"
  - "evals"
  - "langchain"
  - "fastapi"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "postgresql"
  - "mysql"
  - "sqlite"
  - "redis"
  - "anthropic"
  - "openai"
industryTags: "automotive"
company: "Lease End"
summary: "Lease End built an LLM-based conversational application in late 2024 to help customers nearing the end of their auto lease connect with sales teams via text messages. Initially, the system used a RAG-based workflow with fine-tuned models for intent classification across six categories, which generated $12 million in revenue at 50x ROI but accumulated significant technical debt. The fine-tuning approach required week-long iteration cycles to fix production issues, locked the team into specific model versions, and created architecture rigidity. In 2026, the team migrated to an agentic framework with skills, tools, and resources, replacing fine-tuning with better prompting and context provision. This rebuild reduced the fix-to-deploy cycle from one week to under an hour, improved accuracy beyond the fine-tuned baseline, enabled model flexibility, and lowered total costs despite higher per-message API expenses."
link: "https://www.youtube.com/watch?v=4loPnxvWWhg"
year: 2026
seo:
  title: "Lease End: From Fine-Tuning to Agentic RAG: Reducing Technical Debt in Conversational AI for Auto Lease Buyouts - ZenML LLMOps Database"
  description: "Lease End built an LLM-based conversational application in late 2024 to help customers nearing the end of their auto lease connect with sales teams via text messages. Initially, the system used a RAG-based workflow with fine-tuned models for intent classification across six categories, which generated $12 million in revenue at 50x ROI but accumulated significant technical debt. The fine-tuning approach required week-long iteration cycles to fix production issues, locked the team into specific model versions, and created architecture rigidity. In 2026, the team migrated to an agentic framework with skills, tools, and resources, replacing fine-tuning with better prompting and context provision. This rebuild reduced the fix-to-deploy cycle from one week to under an hour, improved accuracy beyond the fine-tuned baseline, enabled model flexibility, and lowered total costs despite higher per-message API expenses."
  canonical: "https://www.zenml.io/llmops-database/from-fine-tuning-to-agentic-rag-reducing-technical-debt-in-conversational-ai-for-auto-lease-buyouts"
  ogTitle: "Lease End: From Fine-Tuning to Agentic RAG: Reducing Technical Debt in Conversational AI for Auto Lease Buyouts - ZenML LLMOps Database"
  ogDescription: "Lease End built an LLM-based conversational application in late 2024 to help customers nearing the end of their auto lease connect with sales teams via text messages. Initially, the system used a RAG-based workflow with fine-tuned models for intent classification across six categories, which generated $12 million in revenue at 50x ROI but accumulated significant technical debt. The fine-tuning approach required week-long iteration cycles to fix production issues, locked the team into specific model versions, and created architecture rigidity. In 2026, the team migrated to an agentic framework with skills, tools, and resources, replacing fine-tuning with better prompting and context provision. This rebuild reduced the fix-to-deploy cycle from one week to under an hour, improved accuracy beyond the fine-tuned baseline, enabled model flexibility, and lowered total costs despite higher per-message API expenses."
notion:
  pageId: "3c6f8dff-2538-8044-b8cd-f027d59279bd"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-24T09:09:00.000Z"
  lastEditedTime: "2026-08-24T09:09:00.000Z"
  publishedAt: "2026-08-24T09:15:34Z"
---

Lease End operates in the automotive financing space, specifically connecting customers who are ending their auto leases with financing options to buy out their leases. In late 2024, the company deployed an LLM-based conversational application that allowed customers to interact with their sales team through text messages, enabling them to ask questions about the sales process, schedule calls, and receive reminders.

The initial architecture was built on a workflow-based approach using retrieval-augmented generation. The system searched a vector database containing previously seen messages that had been manually classified with customer intent. For example, messages like "Call me tomorrow" would be classified as wanting to talk later, while "I've got time now" indicated readiness for immediate contact. However, this RAG approach struggled to capture the nuance inherent in natural conversation, leading the team to explore fine-tuning as a solution.

The rationale for moving to fine-tuning was multi-faceted. The team believed fine-tuning would deliver better accuracy for intent classification, which was critical since the entire system depended on correctly identifying whether customers wanted to talk immediately, schedule a call, opt out, or take other actions. Fine-tuned smaller models promised lower costs and reduced latency, important considerations when responding to thousands of messages daily in real-time. The narrow, structured nature of the task, bucketing conversations into six distinct categories, seemed ideally suited for supervised fine-tuning. Additionally, the team believed fine-tuning would provide model-agnostic flexibility, allowing them to switch providers easily by simply retraining on their proprietary data.

The fine-tuning pipeline involved collecting examples, using LLM-as-judge techniques to label data automatically, manual review of those labels, creating holdout sets for evaluation, executing the fine-tuning process, and checking metrics. From a business perspective, the application appeared successful, contributing $12 million in revenue at a 50x return on investment within the first year. However, beneath these impressive numbers, technical debt was accumulating.

Production issues revealed the limitations of the fine-tuned approach. One failure pattern involved customers receiving appointment confirmations for future dates, then responding with simple acknowledgments like "Sounds good," which the system misinterpreted as requests for immediate calls. Another pattern showed the system initiating calls in response to simple greetings, demonstrating overeager behavior that frustrated customers and led to missed opportunities. While the overall system performed well, these spectacular failures highlighted fundamental problems with the approach.

The critical issue was not identifying fixes but making them manageable. The fine-tuning iteration cycle proved extraordinarily complex and time-consuming. First, the team had to gather examples of problematic interactions. They then needed to determine whether they had sufficient examples to justify retraining, and if not, they synthesized additional examples using an LLM, which required manual validation to ensure training data quality. After labeling examples with appropriate categorization bins and validating through manual review, the actual fine-tuning process took about an hour. However, initial attempts rarely succeeded. Fixing one problem frequently caused regressions in other areas, creating a whack-a-mole dynamic where solved issues would resurface after subsequent retraining. The entire cycle from data gathering through labeling, fine-tuning, iteration, and deployment consumed approximately one week.

This lengthy process forced the team to triage bugs systematically. They asked three key questions before committing to retraining: How frequent is the issue? Does it severely hurt customer experience? Can a band-aid fix prevent the need for a full retrain? They ranked bugs based on tolerable customer pain, a problematic approach for a production system. Critical issues that required immediate fixes included customers repeatedly stating call preferences that were ignored, or scheduled calls failing to register in the system due to malformed payloads.

This situation created what the speaker characterized as a "calcification tax," where increased usage made the system progressively more rigid. Contrary to initial expectations, fine-tuning locked the team into their specific model rather than providing flexibility. Nuances existed between model versions even within the same provider, changing required training data characteristics. Across different providers, differences were even more pronounced, including training data structure, quantity requirements for good results, and training interface interactions. The cost and complexity of switching became prohibitive, forcing the team to maintain consistency with their original model choice despite wanting to upgrade.

Architecture became similarly calcified. The workflow-based approach built in late 2024 represented best practices at that time, but the rapidly evolving AI landscape introduced better architectures that the team could not adopt because they were consumed with maintaining the existing system. This prevented them from taking advantage of performance improvements available through architectural evolution.

The turning point came in early 2026 when the team began using Claude for coding tasks. They observed that Claude required no model changes for different tasks; instead, performance improved by changing skills, resources, and context provided to the model. This insight prompted reconsideration of their messaging application approach. The team migrated from their workflow system to an agentic framework built around skills, tools, and resources that skills could load to obtain necessary context. They piggybacked this migration onto an existing project developing a new agentic framework, using their messaging application as one of the first production tests.

The process transformation was dramatic. The previous approach involved a triage cycle to accumulate sufficient problems to justify retraining, followed by the week-long training cycle. The new approach simplified to: discover a problem, adjust the system prompt or affected skill, validate performance against a curated set of examples collected during production operations, iterate a few times, and deploy by uploading markdown files to an S3 bucket. This reduced the problem-discovery-to-fix cycle from one week to under one hour.

The rebuild did increase per-message costs since it utilized more capable frontier models with higher API pricing. However, multiple factors offset this. Accuracy improved significantly beyond what fine-tuning achieved, addressing the original primary concern. The fix process reduction from days to minutes dramatically improved responsiveness to customer issues. The model became unfrozen, finally delivering the vendor flexibility that fine-tuning had promised but failed to provide. The agentic framework was built model-agnostic, supporting OpenAI, Anthropic, and other providers, with the critical factor being the context provided rather than the specific model. Most importantly, total cost decreased because the team spent far less time maintaining and retraining the system.

The case study provides important cautionary lessons about fine-tuning decisions in production LLM systems. The speaker systematically debunked the original rationale for fine-tuning: better accuracy was achieved through the rebuilt system; lower cost per message was the wrong metric when total cost decreased; lower latency from smaller models proved marginally beneficial in practice; even narrow, structured tasks accumulated technical debt; and vendor control proved illusory due to provider-specific nuances. The speaker suggested fine-tuning might remain appropriate for privacy concerns requiring data control or offline solutions requiring local models, but cautioned about long-term taxes even in those scenarios.

The fundamental recommendation emerging from this experience is to fine-tune only when literally unable to call a frontier model, and even then, to carefully evaluate whether the benefits outweigh the calcification tax. The case demonstrates how architectural choices that appear optimal initially can create compounding maintenance burdens that ultimately undermine system agility and increase total cost of ownership. The shift toward agentic frameworks with better prompting and context provision represents a more maintainable approach for production conversational AI systems, even when per-inference costs appear higher on the surface.

This case study offers valuable insights into the hidden costs of fine-tuning in production environments, particularly the technical debt and organizational rigidity that accumulate over time. It illustrates how the rapid evolution of LLM capabilities and architectures can make seemingly sophisticated approaches obsolete quickly, and how simpler approaches leveraging better models and improved context management can outperform more complex fine-tuned solutions while maintaining greater operational flexibility.
