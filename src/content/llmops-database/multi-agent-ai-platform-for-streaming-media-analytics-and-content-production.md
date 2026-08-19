---
title: "Multi-Agent AI Platform for Streaming Media Analytics and Content Production"
slug: "multi-agent-ai-platform-for-streaming-media-analytics-and-content-production"
draft: false
llmopsTags:
  - "content-moderation"
  - "summarization"
  - "chatbot"
  - "question-answering"
  - "classification"
  - "multi-modality"
  - "caption-generation"
  - "customer-support"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "multi-agent-systems"
  - "agent-based"
  - "cost-optimization"
  - "human-in-the-loop"
  - "few-shot"
  - "evals"
  - "langchain"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "compliance"
  - "wandb"
  - "databricks"
  - "openai"
  - "anthropic"
  - "google-gcp"
industryTags: "media-entertainment"
company: "MBC Shahid"
summary: "MBC Shahid, the leading Arabic streaming platform in the MENA region with 35 million monthly active users, evolved from traditional BI dashboards to AI-powered data products through a three-season journey. The company built multiple production LLM applications using Databricks, including Enigma (a conversational analytics platform merging quantitative viewing data with qualitative sentiment from customer comments), interactive AI-generated dashboards via Genie, and Spectra Studio (an automated video processing system for generating short-form content, subtitles, and compliance checks). These applications process massive scale data including 2.5 billion viewing hours annually, handle multi-language Arabic dialects, and significantly reduce manual work like generating 50 daily shorts during Ramadan peak periods while maintaining human oversight for quality control."
link: "https://www.youtube.com/watch?v=cA_HTWEhTtM"
year: 2026
seo:
  title: "MBC Shahid: Multi-Agent AI Platform for Streaming Media Analytics and Content Production - ZenML LLMOps Database"
  description: "MBC Shahid, the leading Arabic streaming platform in the MENA region with 35 million monthly active users, evolved from traditional BI dashboards to AI-powered data products through a three-season journey. The company built multiple production LLM applications using Databricks, including Enigma (a conversational analytics platform merging quantitative viewing data with qualitative sentiment from customer comments), interactive AI-generated dashboards via Genie, and Spectra Studio (an automated video processing system for generating short-form content, subtitles, and compliance checks). These applications process massive scale data including 2.5 billion viewing hours annually, handle multi-language Arabic dialects, and significantly reduce manual work like generating 50 daily shorts during Ramadan peak periods while maintaining human oversight for quality control."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-ai-platform-for-streaming-media-analytics-and-content-production"
  ogTitle: "MBC Shahid: Multi-Agent AI Platform for Streaming Media Analytics and Content Production - ZenML LLMOps Database"
  ogDescription: "MBC Shahid, the leading Arabic streaming platform in the MENA region with 35 million monthly active users, evolved from traditional BI dashboards to AI-powered data products through a three-season journey. The company built multiple production LLM applications using Databricks, including Enigma (a conversational analytics platform merging quantitative viewing data with qualitative sentiment from customer comments), interactive AI-generated dashboards via Genie, and Spectra Studio (an automated video processing system for generating short-form content, subtitles, and compliance checks). These applications process massive scale data including 2.5 billion viewing hours annually, handle multi-language Arabic dialects, and significantly reduce manual work like generating 50 daily shorts during Ramadan peak periods while maintaining human oversight for quality control."
notion:
  pageId: "3c1f8dff-2538-8060-a89f-fcee5246d682"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T09:05:00.000Z"
  lastEditedTime: "2026-08-19T09:05:00.000Z"
  publishedAt: "2026-08-19T09:11:48Z"
---

## Overview

MBC Shahid represents a sophisticated production deployment of multiple LLM-powered applications in the media streaming industry. As the largest streaming platform in the MENA region serving 35 million monthly active users, the company processes 2.5 billion viewing hours annually with 9 billion player events and generates $370 million in revenue. The case study chronicles their evolution through three distinct phases, culminating in a mature LLMOps practice built on Databricks that has transformed their capabilities from basic BI reporting to AI-driven data products.

The journey demonstrates a thoughtful approach to building production AI systems that started with foundational data infrastructure and progressively added capabilities. Their strategic decision to build both vertically and horizontally—delivering immediate business value while creating reusable components for future use cases—proved critical to their success. This principle of creating reusable "data bricks" evolved from traditional feature stores in their early ML work to skills for agents in their current LLM implementations, showing how sound architectural principles translate across technology generations.

## Technical Architecture and Infrastructure

The technical foundation relies heavily on Databricks as the core platform, with Unity Catalog providing comprehensive governance across all AI applications. A critical architectural decision was implementing AI Gateway as the first layer of their system, which ensures that users receive answers only within the scope of data they have access to in the lakehouse. This governance-first approach addresses a fundamental challenge in production LLM systems: maintaining data security and access control while enabling natural language interactions.

Their lakehouse architecture evolved from handling structured data in season one to incorporating unstructured data and event streams in season two, dealing with fast-evolving schemas across nine different major application platforms including smart TVs, gaming consoles, and mobile apps. This schema evolution challenge required robust handling capabilities that the lakehouse architecture provided. By season three, they had built a comprehensive data foundation spanning structured quantitative data, unstructured qualitative data from customer comments, and multimodal video content.

The infrastructure supports massive scale operations with robust monitoring and evaluation frameworks. MLflow plays a central role in their LLMOps practice, used extensively for both training and inference tracking. They maintain inference tables that enable systematic evaluation of model quality and cost, allowing data-driven decisions about model selection and optimization. This evaluation framework proved essential given the multiple LLM providers they work with.

## Model Selection and Cost Optimization

A particularly mature aspect of their LLMOps practice is the systematic approach to model selection balancing cost versus performance. The team experimented with multiple LLM providers including Gemini models, OpenAI models, and Anthropic models, conducting rigorous evaluations to find the right balance for each use case. This evaluation process leveraged MLflow's capabilities to track both the quality of answers and the cost per inference, enabling quantitative comparisons across different model options.

The cost optimization extends beyond just model selection. In their video processing pipeline for Spectra Studio, they implemented a single-pass architecture that generates multiple outputs—shorts generation, compliance checking, subtitling, and content metadata—from one video processing run. This architectural decision significantly lowers the total cost of ownership for running AI models on video content, which can be particularly expensive when dealing with long-running shows across multiple languages and dialects. The business context makes this optimization crucial: during Ramadan peak periods, they publish approximately 50 episodes per day, making per-video processing costs multiply rapidly.

## Enigma: Conversational Analytics Platform

Enigma represents their flagship conversational analytics application that merges quantitative viewing data with qualitative insights from customer comments. The platform ingests free-text customer feedback from multiple sources including Twitter, Facebook, and their internal shorts platform, enabling qualitative analytics at scale far beyond traditional consultancy-driven samples of hundreds of people. Instead, they analyze tens of thousands of comments per title or series, providing unprecedented insight into audience reactions.

The technical implementation uses vector search as a foundational capability, with data collected from various social platforms ingested and indexed for AI queries. This allows natural language questions like asking about top comments regarding a specific show, with the system retrieving relevant sentiment and thematic information. The architecture combines this unstructured data capability with Genie for querying structured tabular data about viewing patterns, engagement metrics, and performance indicators.

A sophisticated use case demonstrates the power of this integration: analysts can ask questions like why drop-off rates increased between episode 8 and episode 9 compared to previous episodes, and the system will analyze free-text customer comments to identify themes and reasons. This goes well beyond basic sentiment analysis to provide character-level, scene-level, and episode-level insights about what resonates with audiences and what falls flat. The qualitative feedback directly feeds into content decisions, including whether to greenlight additional seasons of shows and which characters or storylines to emphasize.

The agent architecture behind Enigma orchestrates multiple capabilities, accessing both vector search for comment analysis and Genie spaces for quantitative metrics. The system maintains context about user permissions through Unity Catalog integration, ensuring users only receive insights about data they have authorization to access. The conversational interface significantly lowers the barrier to insights compared to traditional BI tools, enabling marketing teams and content strategists to explore data without requiring technical expertise.

## AI-Generated Interactive Dashboards

Moving beyond the limitations of traditional BI tools like PowerBI, MBC Shahid developed a system for generating completely interactive HTML-based dashboards using LLM agents and Genie. The motivation was both functional and aesthetic—they needed more dynamic visualizations than traditional BI tools support and wanted more engaging, better-looking interfaces to re-engage internal business consumers.

The technical architecture features a text input where users request dashboards in natural language, such as asking for a 360-degree view report of engagement. This triggers an orchestrator agent connected to well-curated Genie spaces containing relevant data about engagement metrics, comments enriched with sentiment analysis, and topic modeling of discussion themes. The orchestrator agent decomposes the high-level request into a series of specific questions, such as querying engagement data for the last two months on a particular show.

After gathering answers to these constituent questions, the orchestration layer collects all KPIs and metrics and generates HTML code with embedded visualizations and charts. Images and visual assets are stored in Databricks volumes and rendered within the application interface. This approach provides an experience where users can request custom dashboards through prompts rather than going to BI analysts and waiting for manual dashboard creation.

The generated dashboards combine multiple data sources in ways that traditional BI tools struggle with. For example, a title performance dashboard merges internal episodic decay data with sentiment analysis from customer comments, providing integrated views of both quantitative performance and qualitative audience reaction. This feeds directly into content decisions like whether to produce additional seasons, which characters to feature more prominently, and whether pacing meets audience expectations. The insights move beyond simply saying a show performed well to understanding what drove that performance and what should be done next.

## Spectra Studio: Multimodal Video Processing

Spectra Studio represents the most technically ambitious application, extending their AI capabilities from text and structured data into multimodal video processing. As a media business working primarily with video content, often in Arabic across various dialects, they needed automated capabilities for content processing at scale. The platform performs multiple functions in a single pass through video content: generating short-form clips for their TikTok-like feature, compliance checking for regional content restrictions, subtitling across multiple languages, and rich content metadata generation.

The technical stack processes videos stored in Databricks volumes using Whisper for speech-to-text transcription. Once transcription is available, LLMs can quickly identify scene types and dramatic moments, enabling automated clip selection for shorts generation. The system cuts videos into segments based on AI-identified iconic or dramatic scenes, addressing the business need to create engaging short-form content without human reviewers watching entire episodes.

A significant technical challenge involves converting widescreen video to the vertical format required for mobile shorts. Simply cropping would miss key elements, so the system uses OpenCV for face tracking and scene analysis to ensure important visual elements remain centered in the reframed vertical video. This automatic reframing isn't perfect, so the interface includes human-in-the-loop capabilities with controls allowing editors to manually select between different detected people in a scene if the automatic selection doesn't capture the right focus. This design philosophy—automating the bulk of the work while providing manual controls for refinement—prevents situations where teams repeatedly regenerate content from scratch trying to achieve perfection.

The compliance functionality addresses the reality of operating across numerous regions with different content regulations. Automated flagging of potentially non-compliant scenes in both shorts and long-form content helps manage regulatory risk before broadcasting. The subtitling capability similarly allows human editing and refinement rather than fully automated generation, maintaining quality while dramatically accelerating the process.

During peak periods like Ramadan, the scale advantages become clear. Publishing 50 episodes daily makes manual processing physically impossible—even watching 50 episodes takes more than a full workday before any actual work begins. Spectra Studio enables processing, captioning, and shorts generation for all 50 episodes within the same day in a short timeframe. The single-pass architecture keeps costs manageable even at this scale by avoiding redundant processing for different output types.

## Organizational Structure and Development Approach

The organizational model supporting these LLMOps initiatives shows maturity in how they structure AI development work. They created what they call "FTE pods"—small, focused teams assigned to specific business problems. Each pod includes a business sponsor who owns the problem being solved, ensuring they address actual business needs rather than solutions looking for problems. A pod lead owns delivery, with teams of two to four engineers working on tight timelines.

The team composition evolved significantly, with many analytics specialists and data engineers upskilled into AI engineer roles. This reflects the shifting nature of work from traditional analytics reporting to building AI-powered products. The FTE pod model embeds these teams directly with business units to understand their challenges firsthand, described as living their lives and seeing their daily burdens before designing solutions.

Development timelines are notably aggressive, targeting one to two weeks for MVPs and a couple of months for working products delivering real business impact. This rapid iteration cycle requires strong foundational infrastructure and reusable components—the data bricks philosophy they established early. By building horizontal capabilities that each new use case can leverage, they avoid starting from scratch on every project and maintain velocity.

The progression of capabilities shows thoughtful layering. Early decisions like implementing a feature store to ensure ML model outputs are saved unambiguously and reused across projects evolved into building agent skills that can be reused across business applications. This consistency in architectural principles—building reusable components rather than accumulating technical debt and maintenance burden—enabled their acceleration through progressively more sophisticated AI applications.

## Production Deployment and Governance

The production deployment architecture demonstrates enterprise-grade considerations around governance, security, and user experience. All applications are deployed as custom Databricks Apps, providing a consistent deployment model while connecting to various resources in the Databricks environment. The apps aren't just notebooks or experimental interfaces but fully-featured applications that business users can access and use in their daily workflows.

Unity Catalog integration ensures comprehensive governance across all applications. When users interact with conversational interfaces or request generated dashboards, they receive information only about data they have permissions to access. This governance layer is transparent to end users but critical for enterprise deployment, ensuring that democratizing access through natural language interfaces doesn't compromise data security.

AI Gateway serves as the first layer in the architecture, providing a control point for all LLM interactions. This enables monitoring, logging, and potentially cost control across all agent interactions. The combination of AI Gateway and Unity Catalog creates a robust governance framework that allows the organization to deploy powerful AI capabilities while maintaining appropriate controls.

The inference tables maintained through MLflow provide production monitoring and quality tracking. By logging all inference requests and responses, they can evaluate quality metrics, track costs, and identify issues or degradation in model performance. This observability is essential for maintaining production systems where business users depend on consistent, high-quality outputs.

## Multi-Language and Cultural Considerations

An important aspect often understated in the presentation but critical to the technical implementation is the multi-language and dialect support required. Operating in the MENA region means handling Arabic across various dialects, with Spectra Studio specifically highlighted as working across different Arabic language variations. This adds complexity to speech-to-text processing, natural language understanding for comment analysis, and content metadata generation.

The scale of customer comment analysis across platforms like Twitter and Facebook in Arabic, extracting sentiment and themes, represents non-trivial NLP work. The ability to provide these insights at scale—tens of thousands of comments per title—suggests robust language model capabilities handling regional language variations. Similarly, the subtitling functionality across multiple languages must maintain quality across this linguistic diversity.

## Business Impact and Value Delivery

The business impact spans multiple dimensions. The Customer 360 implementation and audience integrations to 13 different paid media platforms plus their CRM system enable sophisticated retargeting based on churn prediction, content clustering, and RFM scoring. They send 500 million push notifications and emails annually with individualized recommendations, tracking user journeys through content to manage engagement and reduce churn while increasing customer lifetime value.

The conversational analytics through Enigma transforms how content strategy decisions are made, providing integrated quantitative and qualitative insights that inform greenlighting decisions, character development, pacing adjustments, and story direction. Moving from sample-based qualitative research to comprehensive analysis of all customer feedback represents a fundamental upgrade in insight quality and coverage.

The operational efficiency gains from Spectra Studio address clear pain points in content operations. Eliminating the need to manually watch content to identify short-worthy segments, automating compliance checking across regional requirements, and accelerating subtitling all directly reduce costs and time to market. The ability to process 50 daily episodes during peak periods would require massive manual teams without automation.

The interactive dashboard generation addresses engagement and adoption challenges with internal business users. Traditional BI tools often create friction between analysts and business stakeholders, with request backlogs and limited customization. Enabling self-service dashboard generation through natural language requests while maintaining governance represents a significant democratization of data access and insight generation.

## Critical Assessment and Limitations

While the presentation emphasizes successes, several areas warrant balanced consideration. The human-in-the-loop design in Spectra Studio acknowledges that automated reframing and scene selection "is never perfect," requiring manual controls for refinement. This is appropriate engineering but means the efficiency gains, while substantial, aren't complete automation. The labor savings should be measured against actual workflows rather than assuming full automation.

The aggressive development timelines of one to two weeks for MVPs and a couple of months for production systems suggest either exceptional team capabilities or potentially simplified scoping. Most organizations struggle with similar timelines for production-grade LLM applications, raising questions about whether these represent fully robust production systems or whether some complexity is deferred to later iterations.

The model selection and cost optimization work is presented as rigorous, using MLflow for evaluation across Gemini, OpenAI, and Anthropic models. However, the specific evaluation metrics, benchmarks, and results aren't detailed. Balanced assessment would acknowledge that cost-quality tradeoffs involve subjective judgments and may vary across different use cases within their portfolio.

The governance and security framework using Unity Catalog and AI Gateway addresses critical enterprise concerns, but the presentation doesn't discuss challenges or limitations encountered. Production deployments typically face edge cases around permissions, data lineage, and access control that require ongoing refinement. The maturity of their implementation suggests they've worked through these issues, but acknowledging the challenges would provide valuable insights for others.

The reliance on Databricks as the comprehensive platform provides coherent integration but creates vendor concentration. Organizations considering similar architectures should assess whether this platform-centric approach aligns with their broader technology strategy and risk tolerance regarding vendor dependencies.

## Conclusion and Broader Implications

MBC Shahid's LLMOps journey demonstrates how media organizations can successfully deploy production LLM applications at scale when built on solid data infrastructure foundations. Their progression from basic BI to conversational analytics to multimodal video processing shows how capabilities can be layered progressively, with each phase building on previous investments.

The organizational model of FTE pods embedded with business units, the technical principle of building reusable horizontal capabilities alongside vertical use case delivery, and the governance-first architecture using Unity Catalog and AI Gateway together represent a mature approach to enterprise LLMOps. The variety of applications—from conversational analytics to generated dashboards to video processing—demonstrates versatility in applying LLM capabilities to diverse business needs.

The emphasis on cost optimization through model selection evaluation and single-pass video processing shows commercial maturity often missing from AI case studies. Similarly, the human-in-the-loop design acknowledges practical realities about AI capabilities and user needs rather than pursuing full automation regardless of quality implications. These pragmatic engineering decisions likely contribute significantly to their successful production deployments and business adoption.
