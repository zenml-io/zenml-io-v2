---
title: "Building an AI Teaching Assistant: ChatLTV at Harvard Business School"
slug: "building-an-ai-teaching-assistant-chatltv-at-harvard-business-school"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3deaafc5042f7f0f5262"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:36:02.042Z"
  createdOn: "2024-11-21T14:04:26.217Z"
llmopsTags:
  - "chatbot"
  - "chunking"
  - "compliance"
  - "document-processing"
  - "documentation"
  - "langchain"
  - "microsoft-azure"
  - "monitoring"
  - "openai"
  - "pinecone"
  - "prompt-engineering"
  - "question-answering"
  - "rag"
  - "reliability"
  - "scalability"
  - "security"
  - "semantic-search"
  - "vector-search"
industryTags: "education"
company: "Harvard"
summary: "Harvard Business School developed ChatLTV, a specialized AI teaching assistant for the Launching Tech Ventures course. Using RAG with a corpus of course materials including case studies, teaching notes, and historical Q&A, the system helped 250 MBA students prepare for classes and understand course content. The implementation leveraged Azure OpenAI for security, Pinecone for vector storage, and Langchain for development, resulting in over 3000 student queries and improved class preparation and engagement."
link: "https://www.linkedin.com/pulse/ai-professor-harvard-chatltv-jeffrey-bussgang-oiaie/"
year: 2023
seo:
  title: "Harvard: Building an AI Teaching Assistant: ChatLTV at Harvard Business School - ZenML LLMOps Database"
  description: "Harvard Business School developed ChatLTV, a specialized AI teaching assistant for the Launching Tech Ventures course. Using RAG with a corpus of course materials including case studies, teaching notes, and historical Q&A, the system helped 250 MBA students prepare for classes and understand course content. The implementation leveraged Azure OpenAI for security, Pinecone for vector storage, and Langchain for development, resulting in over 3000 student queries and improved class preparation and engagement."
  canonical: "https://www.zenml.io/llmops-database/building-an-ai-teaching-assistant-chatltv-at-harvard-business-school"
  ogTitle: "Harvard: Building an AI Teaching Assistant: ChatLTV at Harvard Business School - ZenML LLMOps Database"
  ogDescription: "Harvard Business School developed ChatLTV, a specialized AI teaching assistant for the Launching Tech Ventures course. Using RAG with a corpus of course materials including case studies, teaching notes, and historical Q&A, the system helped 250 MBA students prepare for classes and understand course content. The implementation leveraged Azure OpenAI for security, Pinecone for vector storage, and Langchain for development, resulting in over 3000 student queries and improved class preparation and engagement."
---

## Overview

This case study documents Harvard Business School (HBS) Professor Jeffrey Bussgang's experiment in deploying a production LLM-based chatbot called "ChatLTV" to serve as an AI faculty co-pilot for his MBA entrepreneurship course, "Launching Tech Ventures" (LTV). The project ran during the Fall 2023 semester and represents a compelling example of deploying RAG-based LLM systems in an educational setting with real users at scale.

The course has been taught for thirteen years and serves approximately 250 MBA students across three sections. The unique advantage for this LLM deployment was the existence of a substantial proprietary corpus built over those years: over 50 HBS cases and teaching notes, two books, numerous book chapters, dozens of PowerPoint decks, Excel spreadsheets, a complete online course transcript with glossary, video interview transcripts, and three years of Slack Q&A history. This totaled roughly 200 documents and 15 million words of content—an ideal foundation for a RAG-based system.

## Technical Architecture

The ChatLTV system employed a classic Retrieval Augmented Generation (RAG) architecture, which the case study describes in reasonable detail. The core components included:

**LLM Selection and Deployment:** The team chose OpenAI's GPT-4 as the underlying language model. However, rather than calling OpenAI's APIs directly, they routed all requests through Microsoft's Azure OpenAI Service. This decision was driven primarily by compliance and privacy requirements, as HBS holds copyright on much of the content. Azure OpenAI provides contractual guarantees that data fed into the service is not used to retrain models available to others, addressing a critical concern for academic institutions with proprietary materials.

**Vector Database:** The corpus was embedded and stored in Pinecone, which the case study notes is SOC2 Type II compliant. When queries came in, relevant content chunks were retrieved from Pinecone and provided as context to the LLM. Only relevant segments (e.g., a few paragraphs of a particular case or teaching note) were sent to Azure OpenAI depending on the specific query, further limiting exposure of proprietary content.

**Middleware:** LangChain was used as middleware to simplify the codebase and accelerate development. This is a common choice for RAG applications and allowed the small team to iterate more quickly.

**Integration Layer:** ChatLTV was deployed as a Slack app, embedding directly into the existing course Slack workspace. This was a strategically sound decision since students were already required to use Slack as part of their workflow and grade requirements. The Slack integration supported both private and public channels, allowing students to choose whether their queries were visible to peers or only to themselves and faculty.

## Prompt Engineering and Development

The case study provides insight into the iterative nature of LLM application development. The team settled on a carefully crafted system prompt after extensive trial and error: "You are a world-class algorithm to answer questions in a specific format. You use the context provided to answer the question and list your sources in the format specified. Do not make up answers."

This prompt reflects several LLMOps best practices: clearly defining the model's role, instructing it to use the provided context, requiring source attribution (critical in an academic setting), and explicitly prohibiting hallucination.

## Testing and Evaluation

The development team created approximately 500 Q&A test queries to manually evaluate ChatLTV's performance. This is a substantial test set for a domain-specific application and demonstrates good LLMOps practice. They implemented both manual and automated evaluation approaches:

**Automated Evaluation:** They used OpenAI to compare model outputs against ground truth data and generate quality scores. This represents an increasingly common pattern in LLMOps where LLMs are used to evaluate LLM outputs, though the case study does not provide details on the specific evaluation prompts or metrics used.

**Manual Testing:** In addition to automated scoring, informal user testing was conducted with prospective users drawn from past student cohorts. This revealed important gaps in the initial implementation.

One key finding from testing was that students would want to ask administrative questions (due dates, office hours, project parameters) that weren't covered by the academic content. This led to the creation of a separate "Course Admin" content corpus that the model was trained to check first when answering queries. This is a useful architectural pattern: segmenting content by purpose and prioritizing certain segments for certain query types.

## Code Base and Development Effort

The case study provides unusually specific metrics on the development effort:

- Total backend code: 8,000 lines
  - RAG implementation: 800 lines
  - Content indexing: 900 lines
  - Backend APIs, tests, and deployment code: remainder
- Content Management System (CMS): 9,000 lines (web-based application)
- Development timeline: approximately 2-3 person months

The author notes that with 2023-2024 improvements in development tools, the codebase would likely be substantially smaller (perhaps half the size) if built today. This reflects the rapid evolution of LLMOps tooling and abstractions.

The CMS allowed faculty to add or delete content and observe student queries—the latter capability proved particularly valuable for the faculty experience, as described below.

## Production Results and Usage Patterns

The system was launched in early September 2023 and ran through the full semester. Key metrics include:

- Over 170 of 250 students (approximately 68%) made queries
- Over 3,000 total queries during the semester
- Approximately 130 queries per case (24 cases total)
- Nearly 40% of users rated chatbot quality at 4 or 5 (on what appears to be a 5-point scale)
- 99% of queries were made through private channels, with only about a dozen using public channels

The overwhelming preference for private queries is an interesting behavioral finding with implications for similar educational deployments—students were reluctant to expose their questions and potential knowledge gaps to peers.

## Faculty Experience and Observability

Perhaps the most novel aspect of this case study is the emphasis on faculty observability. The CMS dashboard allowed the professor to review student queries before class, typically finding peak usage between 10pm and 2am the night before. This created what the author describes as "a unique window into what my students were asking about before walking into the classroom."

The case study provides several illustrative examples of how this observability enhanced teaching:

- Identifying an introverted student who was deeply prepared based on thoughtful chatbot queries, enabling a confident cold-call that led to an excellent class discussion
- Noticing a non-native English speaker struggling with startup acronyms, leading the professor to publicly post a glossary via ChatLTV
- Understanding that a student who frequently asked for case summaries was actually a young mother who prepared days in advance and used the chatbot for morning refreshers, not as a shortcut

These examples demonstrate that LLM observability isn't just about system performance—it can provide pedagogical insights not available through traditional teaching methods.

## Supplementary Experiment: Custom GPTs for Paper Feedback

Toward the end of the semester, the author conducted a second experiment using OpenAI's Custom GPTs feature (launched in late 2023). In approximately two hours and with no code, he created "HBS LTV Feedback," a custom GPT designed to provide critical academic feedback on final course papers and startup ideas.

The author notes he had to prompt the GPT to be "tougher and more critical than its instincts might normally be," reflecting a common challenge with LLMs that tend toward diplomatic rather than constructive criticism. The experiment enabled providing individualized written feedback to approximately 125 student teams—something described as historically unprecedented in HBS's 100+ year history due to time constraints.

## Considerations and Limitations

While the case study is largely positive, several considerations emerge:

**Selection Bias:** The 40% quality rating of 4-5 applies only to students who used the chatbot and completed surveys. The 32% of students who didn't use ChatLTV at all aren't represented in satisfaction metrics.

**Evaluation Methodology:** The automated evaluation approach (using OpenAI to score OpenAI outputs) has known limitations and potential biases. The case study doesn't detail ground truth construction or inter-rater reliability for manual testing.

**Privacy Trade-offs:** While Azure OpenAI and Pinecone provide compliance benefits, the faculty's ability to observe all student queries raises its own privacy considerations. The author doesn't discuss whether students were fully aware their queries were being monitored.

**Generalizability:** The success here was enabled by an unusually rich corpus accumulated over 13 years. Most courses or use cases won't have this advantage.

## Key LLMOps Takeaways

This case study illustrates several LLMOps best practices: choosing RAG to ground responses in authoritative content, using compliant infrastructure (Azure OpenAI, SOC2-compliant Pinecone) for sensitive content, building substantial test sets with both manual and automated evaluation, iterating on prompts based on testing feedback, segmenting content by purpose, providing source attribution to build trust, and investing in observability tooling (the CMS) that enables ongoing understanding of system usage. The project demonstrates that with modern tools, a small team can build and deploy a production LLM application in a few person-months, though the author acknowledges that development time continues to decrease as tooling improves.