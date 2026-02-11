---
title: "Automated Knowledge Base Enhancement Using LLMs and Clustering for Customer Support"
slug: "automated-knowledge-base-enhancement-using-llms-and-clustering-for-customer-support"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68a6d0676b9ac6b86e89700c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:19:12.645Z"
  createdOn: "2025-08-21T07:53:11.716Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "human-in-the-loop"
  - "evals"
  - "open-source"
industryTags: "tech"
company: "Doordash"
summary: "DoorDash developed an automated system to enhance their support chatbot's knowledge base by identifying content gaps through clustering analysis of escalated customer conversations and using LLMs to generate draft articles from user-generated content. The system uses semantic clustering to identify high-impact knowledge gaps, classifies issues as actionable problems or informational queries, and automatically generates polished knowledge base articles that are then reviewed by human specialists before deployment through a RAG-based retrieval system. The implementation resulted in significant improvements, with escalation rates dropping from 78% to 43% for high-traffic clusters, while maintaining human oversight for quality control and edge case handling."
link: "https://careersatdoordash.com/blog/doordash-llm-chatbot-knowledge-with-ugc/"
year: 2025
seo:
  title: "Doordash: Automated Knowledge Base Enhancement Using LLMs and Clustering for Customer Support - ZenML LLMOps Database"
  description: "DoorDash developed an automated system to enhance their support chatbot's knowledge base by identifying content gaps through clustering analysis of escalated customer conversations and using LLMs to generate draft articles from user-generated content. The system uses semantic clustering to identify high-impact knowledge gaps, classifies issues as actionable problems or informational queries, and automatically generates polished knowledge base articles that are then reviewed by human specialists before deployment through a RAG-based retrieval system. The implementation resulted in significant improvements, with escalation rates dropping from 78% to 43% for high-traffic clusters, while maintaining human oversight for quality control and edge case handling."
  canonical: "https://www.zenml.io/llmops-database/automated-knowledge-base-enhancement-using-llms-and-clustering-for-customer-support"
  ogTitle: "Doordash: Automated Knowledge Base Enhancement Using LLMs and Clustering for Customer Support - ZenML LLMOps Database"
  ogDescription: "DoorDash developed an automated system to enhance their support chatbot's knowledge base by identifying content gaps through clustering analysis of escalated customer conversations and using LLMs to generate draft articles from user-generated content. The system uses semantic clustering to identify high-impact knowledge gaps, classifies issues as actionable problems or informational queries, and automatically generates polished knowledge base articles that are then reviewed by human specialists before deployment through a RAG-based retrieval system. The implementation resulted in significant improvements, with escalation rates dropping from 78% to 43% for high-traffic clusters, while maintaining human oversight for quality control and edge case handling."
---

DoorDash's case study presents a comprehensive LLMOps implementation focused on automatically enhancing their customer support chatbot's knowledge base through a sophisticated pipeline combining clustering algorithms with large language models. This system addresses the fundamental challenge of scaling customer support operations while maintaining quality, particularly relevant for a high-volume marketplace platform serving both customers and delivery drivers (Dashers).

The core problem DoorDash faced was the inability of manual knowledge base maintenance to keep pace with their growing marketplace complexity. New policies, product changes, and edge cases continually created knowledge gaps that required fresh content, but traditional manual approaches were too resource-intensive and slow to scale effectively. Their solution demonstrates a mature approach to LLMOps that balances automation with human oversight.

The technical architecture begins with a semantic clustering pipeline that processes thousands of anonymized chat transcripts, specifically focusing on conversations that were escalated to live agents. This strategic filtering ensures the system identifies genuine knowledge gaps where the chatbot failed to provide adequate assistance. The clustering approach uses open-source embedding models selected for strong semantic similarity performance, implementing a lightweight clustering routine with configurable similarity thresholds typically ranging from 0.70 to 0.90. The system measures cosine similarity between new embedded chats and existing cluster centroids, either assigning chats to existing clusters and updating centroids through running means, or creating new clusters when similarity thresholds aren't met.

The clustering process includes iterative threshold optimization and manual inspection of top clusters to ensure each represents a distinct issue, with manual merging of clusters that merely rephrase the same questions. This human-in-the-loop approach for cluster validation demonstrates thoughtful LLMOps practice, recognizing that fully automated clustering can miss nuanced differences or create spurious groupings.

Once clusters are established, the system employs LLMs for dual purposes: classification and content generation. The classification component categorizes clusters as either actionable problems requiring workflow recipes and policy lookups, or informational queries suitable for knowledge base articles. For informational clusters, the LLM generates polished first drafts by ingesting issue summaries and exemplary support agent resolutions. This approach leverages the substantial value embedded in human agent responses while scaling content creation through automation.

The human review process represents a critical LLMOps component, with content specialists and operations partners reviewing auto-generated drafts for policy accuracy, appropriate tone, and edge case handling. The system acknowledges that even within single topic clusters, multiple valid resolutions may exist depending on various factors including order type, delivery status, temporary policy overrides, and privacy considerations. This recognition of complexity and the need for human oversight reflects mature LLMOps thinking that avoids over-automation.

To improve LLM performance, DoorDash expanded transcript sample sets and added explicit instructions for surfacing policy parameters, conditional paths, and privacy redactions. The iterative refinement process, with logged corrections feeding back into future iterations, demonstrates systematic improvement practices essential for production LLM systems.

The deployment architecture uses Retrieval-Augmented Generation (RAG) for serving the enhanced knowledge base. Articles are embedded and stored in vector databases, enabling the chatbot to retrieve relevant content and generate contextually appropriate responses. The system maintains consistency between the knowledge base generation pipeline and the production chatbot by ensuring alignment in issue summarization, embedding models, and prompt structures. This attention to consistency across the pipeline prevents retrieval mismatches that could degrade system performance.

A particularly thoughtful design choice involves embedding only the "user issue" portion of knowledge base articles rather than entire entries, enabling more precise matching between live user issues and stored solutions. This approach reduces noise and increases precision in the retrieval process.

The evaluation methodology demonstrates comprehensive LLMOps practices, incorporating both offline experiments using LLM judges to benchmark improvements and online A/B testing with selected audiences to assess real-world impact. The reported results show substantial improvements, with escalation rates for high-traffic clusters dropping from 78% to 43%, and approximately 75% of knowledge base retrieval events now containing user-generated content. These metrics indicate the system effectively addresses critical knowledge gaps.

However, the case study merits balanced assessment. While the results appear impressive, they represent DoorDash's own internal measurements and may reflect optimistic reporting typical of company blog posts. The 35-percentage-point reduction in escalation rates, while substantial, doesn't provide context about absolute volumes, cost impacts, or potential negative effects such as increased resolution time or customer satisfaction changes. The focus on escalation reduction as the primary success metric, while logical, doesn't capture the full customer experience impact.

The technical approach, while sound, relies heavily on clustering quality and threshold optimization that requires significant manual tuning and inspection. The system's dependence on human reviewers for quality control, while appropriate, may limit scalability benefits and introduce bottlenecks during high-volume periods. The consistency requirements between generation and serving pipelines create operational complexity that could introduce failure modes not discussed in the case study.

The LLMOps implementation demonstrates several best practices including iterative refinement, comprehensive evaluation methodology, and thoughtful human-AI collaboration. The system's architecture addresses key production concerns such as consistency, precision, and quality control. However, the case study would benefit from more detailed discussion of failure modes, operational costs, and long-term maintenance requirements that are crucial for sustainable LLMOps implementations.

DoorDash's ongoing initiatives, including personalized order-specific context integration, suggest continued evolution of their LLMOps capabilities. The acknowledgment that future articles should be "dynamically tailored to each Dasher, customer, or order status" indicates awareness of personalization opportunities, though this introduces additional complexity around data privacy, model consistency, and evaluation metrics.

This case study represents a mature LLMOps implementation that thoughtfully combines automation with human oversight, demonstrates systematic evaluation practices, and achieves measurable business impact. While the reported results should be interpreted with appropriate skepticism typical of company-published case studies, the technical approach and architectural decisions reflect solid LLMOps principles and provide valuable insights for organizations facing similar customer support scaling challenges.