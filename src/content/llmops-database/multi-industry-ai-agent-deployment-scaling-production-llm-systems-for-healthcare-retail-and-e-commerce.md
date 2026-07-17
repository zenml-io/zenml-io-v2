---
title: "Multi-Industry AI Agent Deployment: Scaling Production LLM Systems for Healthcare, Retail, and E-commerce"
slug: "multi-industry-ai-agent-deployment-scaling-production-llm-systems-for-healthcare-retail-and-e-commerce"
draft: false
llmopsTags:
  - "healthcare"
  - "customer-support"
  - "classification"
  - "question-answering"
  - "chatbot"
  - "high-stakes-application"
  - "rag"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "evals"
  - "memory"
  - "few-shot"
  - "kubernetes"
  - "databases"
  - "open-source"
  - "monitoring"
  - "orchestration"
  - "google-gcp"
industryTags: "e-commerce"
company: "Williams Sonoma / Smyths Toys / Northwell Health"
summary: "Three organizations—Northwell Health, Williams-Sonoma, and Smyths Toys—share their production AI deployment experiences at a Google Cloud panel. Northwell Health leverages AI for clinical staff support, surgical video analysis, and knowledge management during Epic EHR migrations. Williams-Sonoma built customer-facing service agents and guided discovery agents for product exploration, implementing an \"agent-testing-agent\" framework using Gemini models to ensure quality at scale across multiple brands. Smyths Toys deployed an AI-driven customer service system that handled 60% of department volume during peak season with £1 million ROI, then expanded to building a \"digital buyer\" assistant that challenges human buyers on inventory decisions worth hundreds of millions. All three organizations emphasize the importance of trusted data platforms, business stakeholder buy-in, and focusing on experience rather than leading with technology."
link: "https://youtu.be/GyMhvHn7al4"
year: 2025
seo:
  title: "Williams Sonoma / Smyths Toys / Northwell Health: Multi-Industry AI Agent Deployment: Scaling Production LLM Systems for Healthcare, Retail, and E-commerce - ZenML LLMOps Database"
  description: "Three organizations—Northwell Health, Williams-Sonoma, and Smyths Toys—share their production AI deployment experiences at a Google Cloud panel. Northwell Health leverages AI for clinical staff support, surgical video analysis, and knowledge management during Epic EHR migrations. Williams-Sonoma built customer-facing service agents and guided discovery agents for product exploration, implementing an \"agent-testing-agent\" framework using Gemini models to ensure quality at scale across multiple brands. Smyths Toys deployed an AI-driven customer service system that handled 60% of department volume during peak season with £1 million ROI, then expanded to building a \"digital buyer\" assistant that challenges human buyers on inventory decisions worth hundreds of millions. All three organizations emphasize the importance of trusted data platforms, business stakeholder buy-in, and focusing on experience rather than leading with technology."
  canonical: "https://www.zenml.io/llmops-database/multi-industry-ai-agent-deployment-scaling-production-llm-systems-for-healthcare-retail-and-e-commerce"
  ogTitle: "Williams Sonoma / Smyths Toys / Northwell Health: Multi-Industry AI Agent Deployment: Scaling Production LLM Systems for Healthcare, Retail, and E-commerce - ZenML LLMOps Database"
  ogDescription: "Three organizations—Northwell Health, Williams-Sonoma, and Smyths Toys—share their production AI deployment experiences at a Google Cloud panel. Northwell Health leverages AI for clinical staff support, surgical video analysis, and knowledge management during Epic EHR migrations. Williams-Sonoma built customer-facing service agents and guided discovery agents for product exploration, implementing an \"agent-testing-agent\" framework using Gemini models to ensure quality at scale across multiple brands. Smyths Toys deployed an AI-driven customer service system that handled 60% of department volume during peak season with £1 million ROI, then expanded to building a \"digital buyer\" assistant that challenges human buyers on inventory decisions worth hundreds of millions. All three organizations emphasize the importance of trusted data platforms, business stakeholder buy-in, and focusing on experience rather than leading with technology."
notion:
  pageId: "398f8dff-2538-80b0-bdcc-e0eaf494ecba"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-09T11:48:00.000Z"
  lastEditedTime: "2026-07-09T15:20:00.000Z"
  publishedAt: "2026-07-09T15:22:58Z"
---

This panel discussion features three distinct organizations deploying production AI systems at scale, offering valuable insights into practical LLMOps challenges across healthcare, e-commerce, and retail sectors. The cases represent mature implementations that have survived peak operational periods and demonstrate measurable business impact.

## Williams-Sonoma Family of Brands

Williams-Sonoma represents a sophisticated multi-brand e-commerce deployment with both deterministic and generative AI components. The organization started with a customer service agent available 24/7 to handle order tracking and delivery scheduling queries. This foundation enabled expansion into what they call "guided discovery agents," which go beyond traditional chatbots to provide conversational product exploration. The first implementation for the Williams-Sonoma brand helps customers explore cookware, appliances, table settings, and complete meal planning scenarios like hosting Thanksgiving dinner.

The LLMOps architecture recognizes a critical distinction between deterministic queries (order status) and generative responses (menu planning with dietary restrictions). This hybrid approach requires sophisticated testing frameworks that can evaluate both response types across multiple brands simultaneously. Product catalogs provide the retrievable foundation, but the real engineering challenge involves transforming decades of in-store associate knowledge—about what items complement each other, room design principles, and buying guides—into retrievable data formats that agents can leverage.

A particularly innovative LLMOps practice at Williams-Sonoma is their "agent-testing-agent" framework built on Gemini models. This approach addresses the fundamental challenge of evaluating conversational AI at scale across multiple brands. Rather than relying solely on human evaluation, which is time-consuming and limits deployment velocity, they use one Gemini model to test agent responses through multi-turn conversation simulations. The testing agent evaluates not just text responses but also images, buying guides, and other response formats, providing suggestions for conversational design improvements. This meta-agent approach accelerates time-to-market while maintaining quality standards.

Evaluation metrics extend beyond traditional e-commerce conversion and revenue tracking to include depth of conversation, time spent with the agent, customer sentiment, and return engagement. These qualitative indicators better capture whether customers genuinely find value in the guided discovery experience—whether they're satisfied with their planned Thanksgiving menu or feel ownership over a designed room.

The organization positions its agents as companions that eliminate the need for customers to open 15-20 browser tabs while shopping, instead guiding them from planning through execution in a unified conversational experience. They're exploring small language models, particularly Google's Gemma series, as the next frontier. The open-weight nature of these models appeals to their need for transparency while offering the potential to train or configure domain-specific models on their proprietary knowledge of recipes, design principles, and product relationships.

## Smyths Toys

Smyths Toys provides one of the most concrete ROI examples in the panel, having deployed AI through a complete retail cycle including the critical Christmas peak period. As the world's largest dedicated toy retailer, they began with a proof of concept focused on customer service, specifically the ubiquitous "where's my order" question. Starting in January 2025, they rapidly scaled to handle 60% of the entire customer service department's workload, processing 300,000 emails and expanding to cover social media and all other customer interaction channels.

The LLMOps infrastructure leverages BigQuery as the central data platform, with SAP S4 HANA remaining the master system of record. Data federation from SAP to BigQuery enables complex AI reasoning without overloading the transactional system. They initially used the SLT connector but are transitioning to newer no-data-copy delta share technology as the SLT connector approaches end-of-life in 2027. From BigQuery, they've built a custom AI environment using Kubernetes and Cortex, with results fed back into SAP systems.

The customer service deployment delivered approximately £1 million ROI during the peak season. Normally requiring 50 temporary staff for the three-month Christmas period in addition to 30 permanent employees, they recruited only nine temporary staff and finished with about three as natural attrition eliminated the need for backfilling. This occurred despite a 20% increase in customer interactions driven by sales growth, with human agents handling 36% fewer tickets. The system they call "Cody" proved resilient enough that they switched off phone lines entirely on Black Friday 2025, routing everything through AI—and the phones never came back on.

The technical implementation philosophy emphasizes that the AI doesn't need to be a chatbot requiring explicit customer interaction. Instead, it operates behind the scenes, monitoring buyer activity and challenging decisions at appropriate moments. This design recognizes that senior buyers might be too busy to think through every question, while junior buyers may not know what questions to ask. The AI proactively suggests reconsidering purchase orders or evaluating alternative vendors.

The strategic vision extends to building a "digital buyer" assistant for inventory management. With hundreds of millions of pounds in stock, even a 2-3% improvement in buying decisions generates enormous returns. This digital workforce concept aims to preserve institutional knowledge as experienced buyers move on, particularly important as Smyths expanded from Ireland and UK into Germany, Austria, and Switzerland, often through acquisitions like Toys R Us properties. The approach accelerates junior staff development by providing senior-level decision-making frameworks immediately rather than waiting years for knowledge transfer.

Smyths' decision to partner with Google Cloud stemmed less from technology differentiation (acknowledging competitors have strong offerings) and more from delivery confidence. They rejected vendors who sent large teams dominated by account managers, preferring Google's engineer-led approach with small teams focused on building real deliverables. Being measured on outcomes rather than technology choices, they needed a partner aligned with execution.

## Northwell Health

Northwell Health, the largest health system in New York State, takes a platform-centric approach to LLMOps, recognizing that AI capabilities depend fundamentally on trusted data infrastructure. Their multi-year modernization journey focused first on establishing platforms: Epic as the medical record system and core hospital engine, Google Cloud for infrastructure and data analytics, plus Salesforce and ServiceNow as key operational platforms. This foundation ingests data from multiple sources to enable AI applications across three constituencies: administrative and back-office staff, clinical staff (nurses and doctors), and patients directly.

A compelling use case involves surgical video analysis. Surgeons capture video from procedures to build training datasets, annotate and markup footage, and eventually support simulation-based learning. The longer-term vision resembles automotive lane-assist technology—providing gentle guidance during procedures if surgeons begin to veer from optimal approaches. Achieving this requires massive video data collection and sophisticated model training. They're using the Google platform with various models to extract maximum information and knowledge from surgical videos, training exclusively on their proprietary data that surgeons guard closely given the competitive value of techniques from some of the world's leading doctors.

The LLMOps challenge here involves managing video data at scale, including archiving strategies with different storage tiers to optimize cost while maintaining accessibility. This addresses a fundamental AI principle: models are only as useful as the memory and data they can access. Storing data in inaccessible repositories defeats the purpose, so the architecture balances long-term memory for training with short-term memory for real-time decision support.

A more immediately deployed use case emerged from Epic EHR migrations. Their first wave migrated 35,000 people in a single day, generating 2-4 questions per person in subsequent days. They built an AI-powered knowledge repository using expected questions, integrated inline with existing tools so staff could click a button to grab context and engage conversationally for answers. This deflected significant call volume during the migration. They've since refined the knowledge articles in preparation for next month's migration, which will be one of the largest Epic migrations ever attempted.

The system design embodies a key LLMOps principle: putting AI capabilities inline within existing workflows rather than requiring users to context-switch to separate systems. The more seamlessly AI integrates into daily tools, the greater the adoption and benefit. The knowledge repository grows organically as staff interactions contribute data that refines the system—a virtuous cycle of improvement.

Northwell's evaluation approach remains largely qualitative in these early stages, focusing on whether AI makes staff more efficient and effective. The Epic migration support provides clearer metrics around ticket deflection and continuity of care preservation. Their philosophy emphasizes partnering with key stakeholders, leading with desired experiences rather than technology capabilities, and maintaining momentum through experimentation despite inevitable mistakes in this rapidly evolving space.

## Cross-Cutting LLMOps Themes

All three organizations emphasize that AI adoption is non-optional for competitive survival. Smyths views it as essential to avoiding obsolescence. Northwell faces financial headwinds and supply-demand imbalances in healthcare—people living longer creating more demand with limited staff supply, requiring efficiency tools to do more with less. Williams-Sonoma pursued the "what if customers could talk to our brand" vision, recognizing that typing into search bars doesn't constitute real conversation.

The change management dimension emerges as perhaps the hardest challenge. Smyths initially faced resistance from customer service staff fearing job loss, but sentiment completely reversed—now the department complains AI automation isn't being delivered fast enough. The lesson: bringing business and people along matters more than having the most authentic technical solution. An AI system that the business owns and actually uses beats cutting-edge technology that sits unused.

Data engineering consistently appears as foundational work. Williams-Sonoma must transform unstructured knowledge into retrievable formats. Smyths federates transactional data from SAP to analytics-optimized environments. Northwell builds multi-source data platforms with appropriate access controls. All recognize that LLM capabilities depend entirely on the quality, accessibility, and governance of underlying data.

The organizations deploy on Google Cloud Platform leveraging BigQuery for analytics, Vertex AI for model deployment, Kubernetes for orchestration, and various Gemini models for both application logic and meta-tasks like testing. The choice reflects Google's global infrastructure scale, data center maturity, model flexibility including open-source options, and willingness to integrate competitor models. For Smyths particularly, Google's product engineering DNA and engineer-led engagement model proved decisive.

Evaluation strategies vary by use case. Customer service allows clear ROI calculations based on staffing reductions and ticket deflection. Conversational discovery requires measuring engagement depth, sentiment, and return usage. Clinical applications focus on efficiency gains and care continuity. Healthcare surgical applications represent longer-term investments in data collection before full capability realization. The common thread: moving beyond vanity metrics to measures that reflect genuine business value and user experience quality.

Looking forward, the organizations anticipate small language models playing increasing roles as compute becomes a frontier constraint. The ability to train or configure domain-specific models on proprietary knowledge—Williams-Sonoma's recipes and design principles, Smyths' buying expertise, Northwell's clinical protocols—offers potential advantages over general-purpose LLMs with guardrails. The digital workforce concept spans all three: AI augmenting human decision-making, preserving institutional knowledge, and accelerating capability development for junior staff.

The agentic era implies moving beyond single-purpose chatbots to comprehensive digital assistants that operate both in conversation with users and autonomously behind the scenes, monitoring activities and proactively surfacing insights. This requires robust observability frameworks—Williams-Sonoma's agent-testing-agent approach exemplifies meta-AI systems that enable scaling of quality assurance itself. As these systems mature, the competitive bar rises for consumer experience expectations across industries, with healthcare needing to match the personalized, contextual experiences that retail and e-commerce deliver.
