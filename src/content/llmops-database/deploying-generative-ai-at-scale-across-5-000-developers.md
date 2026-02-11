---
title: "Deploying Generative AI at Scale Across 5,000 Developers"
slug: "deploying-generative-ai-at-scale-across-5-000-developers"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6973931bb206c8074a94be52"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-03T15:19:04.226Z"
  lastUpdated: "2026-01-23T16:05:31.704Z"
  createdOn: "2026-01-23T15:26:19.385Z"
llmopsTags:
  - "fraud-detection"
  - "customer-support"
  - "code-generation"
  - "chatbot"
  - "question-answering"
  - "summarization"
  - "document-processing"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "reranking"
  - "cost-optimization"
  - "latency-optimization"
  - "human-in-the-loop"
  - "chunking"
  - "evals"
  - "agent-based"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "cicd"
  - "scaling"
  - "serverless"
  - "devops"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "cache"
  - "microsoft-azure"
  - "openai"
  - "google-gcp"
  - "meta"
industryTags: "insurance"
company: "Liberty IT"
summary: "Liberty IT, the technology division of Fortune 100 insurance company Liberty Mutual, embarked on a large-scale deployment of generative AI tools across their global workforce of over 5,000 developers and 50,000+ employees. The initiative involved rolling out custom GenAI platforms including Liberty GPT (an internal ChatGPT variant) to 70% of employees and GitHub Copilot to over 90% of IT staff within the first year. The company faced challenges including rapid technology evolution, model availability constraints, cost management, RAG implementation complexity, and achieving true adoption beyond basic usage. Through building a centralized AI platform with governance controls, implementing comprehensive learning programs across six streams, supporting 28 different models optimized for various use cases, and developing custom dashboards for cost tracking and observability, Liberty IT successfully navigated these challenges while maintaining enterprise security and compliance requirements."
link: "https://www.youtube.com/watch?v=tRL2sRDg_DA"
year: 2026
seo:
  title: "Liberty IT: Deploying Generative AI at Scale Across 5,000 Developers - ZenML LLMOps Database"
  description: "Liberty IT, the technology division of Fortune 100 insurance company Liberty Mutual, embarked on a large-scale deployment of generative AI tools across their global workforce of over 5,000 developers and 50,000+ employees. The initiative involved rolling out custom GenAI platforms including Liberty GPT (an internal ChatGPT variant) to 70% of employees and GitHub Copilot to over 90% of IT staff within the first year. The company faced challenges including rapid technology evolution, model availability constraints, cost management, RAG implementation complexity, and achieving true adoption beyond basic usage. Through building a centralized AI platform with governance controls, implementing comprehensive learning programs across six streams, supporting 28 different models optimized for various use cases, and developing custom dashboards for cost tracking and observability, Liberty IT successfully navigated these challenges while maintaining enterprise security and compliance requirements."
  canonical: "https://www.zenml.io/llmops-database/deploying-generative-ai-at-scale-across-5-000-developers"
  ogTitle: "Liberty IT: Deploying Generative AI at Scale Across 5,000 Developers - ZenML LLMOps Database"
  ogDescription: "Liberty IT, the technology division of Fortune 100 insurance company Liberty Mutual, embarked on a large-scale deployment of generative AI tools across their global workforce of over 5,000 developers and 50,000+ employees. The initiative involved rolling out custom GenAI platforms including Liberty GPT (an internal ChatGPT variant) to 70% of employees and GitHub Copilot to over 90% of IT staff within the first year. The company faced challenges including rapid technology evolution, model availability constraints, cost management, RAG implementation complexity, and achieving true adoption beyond basic usage. Through building a centralized AI platform with governance controls, implementing comprehensive learning programs across six streams, supporting 28 different models optimized for various use cases, and developing custom dashboards for cost tracking and observability, Liberty IT successfully navigated these challenges while maintaining enterprise security and compliance requirements."
---

## Overview and Context

Liberty IT serves as the technology arm of Liberty Mutual, a Fortune 100 insurance company generating approximately 50 billion dollars in revenue. The organization operates with a complex technology landscape spanning legacy systems built in COBOL and C++ through to modern cloud infrastructure on AWS, serving both high-throughput retail workloads and high-complexity commercial insurance operations. With approximately 5,000 developers globally and 900 technical staff across three locations in Ireland alone, Liberty IT represents a significant enterprise-scale LLMOps deployment that differs fundamentally from startup approaches.

The company's generative AI journey began in earnest around late 2022, though their emerging technology research team had been tracking AI developments prior to ChatGPT's public release. The architecture team had been working in machine learning and MLOps for approximately four to five years before pivoting heavily to GenAI. Their approach was guided by their CTO's philosophy to "get our knees skinned" - an explicit acknowledgment that mistakes and learning would be part of the journey rather than something to avoid at all costs.

## Initial Deployment and Adoption Challenges

Liberty IT's GenAI rollout centered on two primary tools: Liberty GPT, their internal ChatGPT variant, and GitHub Copilot for developers. The initial deployment achieved impressive metrics, with Liberty GPT reaching 70% of Liberty Mutual employees and GitHub Copilot reaching 60% adoption initially, eventually climbing to over 90% within Liberty IT during the first year. However, the team quickly discovered that deployment statistics masked significant adoption challenges.

The "bazaar versus cathedral" model framed their approach, with the bazaar representing their ideal of universal access and contribution, versus the cathedral model where only specialists have access. While they aspired to the bazaar model, achieving it proved far more complex than anticipated. The final miles of deployment proved hardest, with technical issues around regional regulations, internal protections, data sovereignty, and egress concerns creating barriers to complete rollout.

More critically, the team found that having a tool deployed did not equate to effective usage. Initial telemetry and surveys revealed that many users were employing Liberty GPT merely as "better Google" rather than as a thought partner. The concept of thought partnership involves prompting the LLM to teach rather than do - asking it to critique solutions, interview the user about business proposals, suggest weaknesses or omissions, rather than simply executing tasks. Similarly, GitHub Copilot usage remained basic initially, with users not leveraging advanced features effectively.

## Educational Initiatives and Continuous Learning

Recognition that deployment did not equal fluency led to a multi-tiered educational response. Initially, the organization saw organic grassroots efforts with spontaneous "prompt unconferences" and peer-learning sessions organized by developers with support from their people leaders. While valuable for initial awareness, these ad hoc efforts lacked consistency and scale.

The architecture team responded by creating "inspirational sessions" - deliberately framed as non-prescriptive explorations rather than formal training. These sessions covered topics like prompting techniques with Copilot, vibe coding practices, and standardizing GitHub Copilot usage through instruction files. The presenters explicitly positioned these as "what we know so far" rather than "the right way," acknowledging the rapidly evolving nature of the technology. This approach also allowed for humor and accessibility, making the learning less intimidating.

However, the HR director ultimately pushed for more structure, noting that grassroots efforts, while valuable, created duplication, inconsistent availability (feast or famine dynamics), and lacked systematic coverage. This led to the formal establishment of a six-stream GenAI learning mission. All employees participate in the AI literacy stream through online training, workshops, hackathons, and promptathons. Specialized streams exist for people leaders, architects, senior engineers, and other roles. The architecture team maintains engagement through monthly open office hours where they demonstrate latest developments and provide resources for experimentation.

The learning challenge has been compounded by rapidly moving targets. The shift from basic GitHub Copilot completions to agent mode with asynchronous code development in the workspace, and subsequently to newer coding agent tools, meant that educational materials and best practices required constant updating. Practitioners found themselves continuously rewriting their metaphorical CVs as terminology evolved from "vibe coder" to "spec-driven developer" within months.

## Model Selection and Management at Scale

A significant early misconception within Liberty IT was treating LLMs as commodity "white goods" that could be swapped interchangeably, with only price and regional availability as differentiators. Testing and production experience quickly dispelled this notion. The team discovered meaningful behavioral differences across models through practical use cases.

One illustrative example involved generating answers about complex insurance processes. Using stylometric analysis, they found that Gemini models simplified technical terminology, which was problematic when users specifically needed the complexity and jargon preserved for accuracy and professional communication. Switching to OpenAI models for this use case maintained the appropriate technical language. Other distinctions emerged around image processing capabilities, code generation quality, and various specialized tasks.

This recognition led Liberty IT to support a plurality of models - approximately 28 different models at last count. The strategy involves optimizing across performance characteristics and cost for specific use cases rather than defaulting to the latest frontier model for all applications. This approach requires ongoing evaluation as new models release and pricing structures shift, with older model prices typically dropping as newer versions emerge.

The pricing differential between models proved substantial and business-critical. GPT-4.1 was priced around 8 dollars per million tokens, GPT-5 at 10 dollars, while Claude Opus 4.1 commanded 75 dollars per million tokens at the time discussed. The team emphasized that junior engineers (and the presenters humorously included themselves in this category when it comes to cost optimization) could easily make model selection choices that dramatically impacted costs without proper education and guidance.

## Platform Engineering and Governance

The vision for engineer autonomy, long established at Liberty IT through their platform engineering approach predating the term's widespread use, met significant friction when applied to GenAI. The team aspired to provide self-service access to models, allowing smart engineers and data scientists to achieve optimal business outcomes with minimal constraints. However, GenAI adoption proved fundamentally different from cloud adoption.

Multiple barriers emerged immediately. Access to initial models was gated through complex request processes, even with established partnerships like Microsoft. Provider capacity constraints were severe enough that there were jokes about Microsoft canceling employee bonuses to fund chip purchases and data center expansion. Roadmap visibility was poor, making it difficult to plan around when specific models would become available in specific regions. The "battleship diagram of doom" illustrated the patchy regional availability of different models across Azure regions, requiring complex workarounds like splitting quota across use cases.

Beyond availability, legal teams raised concerns about use cases and regulations, while security teams confronted new threat vectors including prompt injection and jailbreak attacks. Rate limiting issues emerged across different use cases as usage scaled. These factors collectively necessitated building a centralized platform rather than providing direct API access to developers.

The platform approach delivered multiple benefits beyond just managing scarce model capacity. It provided the responsible AI committee and security teams with greater control and visibility. A central pane of glass enabled observability across all GenAI usage. Guardrails could be consistently applied. Cost tracking and controls became feasible. While this represented a compromise on the autonomy ideal, the team maintains that vision as a long-term goal once "day two" operational concerns are fully addressed within a safe, governed framework.

## Cost Management and Observability

The cost dynamics of GenAI at scale created urgent operational challenges reminiscent of early serverless adoption. The ability to do "a year's testing in one week" applies both to beneficial rapid iteration and to catastrophic cost accumulation. Liberty IT experienced this directly when one use case began burning through 20,000 dollars within a couple of hours of running. The platform architect's call asking "have you seen this?" initiated urgent investigation into whether the usage was legitimate or represented an attack or runaway process.

In this instance, the usage proved legitimate - a team with a massive corpus of data requiring conversion for value extraction. However, the incident highlighted the critical need for cost controls. The team worked with the use case owner to pivot to a different model offering similar quality at a substantially different price point, ultimately saving approximately 40,000 dollars on that single workload.

The solution involved building custom dashboards (screenshots were considered for presentation but deemed too risky even blurred, given GenAI's capability to potentially reconstruct blurred information), implementing cost tracking middleware, and establishing automated alerting and notifications. Observability for GenAI was positioned as equally or more critical than traditional application observability. Education became crucial, ensuring teams understood the cost implications of model choices.

The team also emphasized returning to old-school architectural patterns when facing resource constraints. Batch processing and other techniques from eras when hardware was scarce proved relevant again as token costs created new scarcity dynamics. The pattern repeats throughout technology history: new capabilities emerge at high cost, driving reapplication of proven efficiency patterns until the technology commoditizes.

## RAG Implementation Complexity

Retrieval Augmented Generation emerged as a critical use case for enabling LLMs to leverage enterprise-specific information, but implementation proved far more complex than off-the-shelf tutorials suggested. While nearly everyone in technical audiences has experimented with RAG tutorials across various programming languages and frameworks, production RAG systems require addressing a substantial "complexity iceberg" beneath the visible surface.

The team estimated that off-the-shelf libraries and frameworks take implementations to approximately 65% of production requirements. Going further demands deep expertise across multiple dimensions: understanding embedding models and their behavior, vector store selection and optimization, re-ranking strategies, prompt enhancement techniques, multi-turn dialogue management for iterative refinement, and additional capabilities like intelligent summarization.

Non-determinism poses particular challenges for production RAG systems. The same question asked multiple times yields different answers with equal apparent certainty, creating trust and reproducibility concerns. This drove focus on groundedness - the emerging discipline of ensuring LLM responses can be traced back to source material through citations and verification. Groundedness ensures that enhanced responses genuinely derive from provided data rather than hallucination or information from other sources. For engineers adding GenAI features to applications, groundedness expertise has become essential.

Critical decisions multiply throughout RAG pipeline design. Teams must select appropriate models, determine embedding storage strategies, choose chunking approaches for documents (sentence-level versus paragraph-level granularity), and select embedding models themselves. Evaluation methodology becomes perhaps the most critical decision - how to ensure answers meet quality standards. While approximately four standard evaluation metrics exist in common libraries, specific use cases often require custom evaluation metrics tailored to particular requirements.

The trust challenge extends beyond groundedness to include comprehensive citation systems and validation that material used in answer generation genuinely exists in source documents. Adjacent challenges include sourcing unstructured data, extracting information while preserving visual cues and formatting that carry semantic meaning, and handling the complexity of real-world document structures.

Automated evaluation pipelines proved essential for managing RAG system complexity. With numerous configurable parameters and optimization levers, teams cannot effectively assess the impact of changes without systematic testing against golden datasets containing expected questions and validated answers. The pipeline enables continuous refinement and comparison of approaches as new techniques emerge.

The field continues rapid evolution with new papers and libraries like GraphRAG appearing regularly. The weekly cadence of significant developments means teams must maintain continuous learning, with architects and CTOs frequently circulating new papers marked as "drop everything and read this immediately." This pace demands organizational structures and processes that support ongoing adaptation.

## Technical Debt and Deprecation

A recurring theme throughout Liberty IT's GenAI journey involves building capabilities that vendors subsequently provide as standard services, immediately obsoleting custom development. The parallel to early serverless adoption is direct - companies built custom implementations for gaps in vendor offerings, only to see those offerings deprecated when AWS, Azure, and Google released their own versions of the same services.

Early GPT-3.5 models had token limits insufficient for summarizing large documents, requiring Liberty IT to build a multi-stage summarization service that created summaries of summaries. Modern models with higher token limits eliminated this need entirely. Similarly, the architecture team invested significant effort in standardizing GitHub Copilot best practices and instruction file recommendations, work that became largely redundant when GitHub released their comprehensive customization page with templates and examples.

The team maintains a metaphorical "tech graveyard" for these deprecated capabilities. The summarization service has been buried. A two-way SMS solution, various evaluation frameworks, and other custom-built services all rest there. The AI platform itself has "an open grave" with the team acknowledging it will likely eventually be replaced by vendor-provided solutions as the ecosystem matures.

This pattern demands architectural approaches that facilitate component replacement. Composite architectures allowing services to be swapped out became essential. The willingness to "kill your darlings" - abandoning custom solutions as vendor alternatives emerge - represents necessary discipline. The team emphasizes focusing engineering effort on services that truly matter to the business - unique capabilities or domain-specific implementations rather than infrastructure that will inevitably commoditize.

The half-life of GenAI solutions is recognized as very short compared to traditional software. This reality requires different planning horizons and different attitudes toward technical investment. What teams build today should be understood as scaffolding - useful now, likely temporary, and designed for replacement rather than long-term maintenance.

## Performance Optimization and User Experience

The team encountered significant user experience challenges when rolling out GenAI-enhanced features. Initial assumptions held that users would tolerate response times up to 15 seconds for capabilities they had never previously had access to - novel insights and analysis types that weren't possible before GenAI. This assumption proved incorrect. Users voted with their feet, reverting to older applications rather than accepting the latency.

The optimization effort addressed multiple layers. At the user interface level, progress indicators and the ability to perform other tasks while long-running operations completed became essential. Perception management matters as much as absolute speed - keeping users engaged and informed prevents abandonment. Backend optimization included introducing GPU compute for appropriate workloads, applying all the RAG optimization techniques to improve efficiency below the waterline, and taking advantage of vendor upgrades like improved vector database performance.

Through comprehensive optimization across these dimensions, the team reduced response times from 15 seconds to approximately 3 seconds, achieving acceptable user experience thresholds. The effort highlighted that GenAI applications must meet the same performance expectations as traditional applications despite the computational overhead of LLM inference. Understanding how long users are actually willing to wait for specific types of results, rather than assuming they will accommodate new technology, proved critical for adoption.

## Architectural Governance and Evolution

Attempting to establish a GenAI Northstar architecture revealed cultural and process challenges at scale. Northstar architectures serve important functions in large organizations - providing alignment, guiding investment decisions, and facilitating communication with executives. However, assembling twelve architects to create one produced thirteen opinions, leading to extended debates over terminology, conceptual placement of components within architectural layers, and other details.

The team ultimately drew a line in the sand, time-boxing architectural discussions and prioritizing progress over perfection. This pragmatic approach enabled them to achieve "good enough" alignment, secure investment, build out their platform, and unlock use cases for developers. The organization is now on its second iteration of the architecture, having refined it to address developments like agentic AI. External validation from Bain and Company positioned their architectural thinking in the top quartile, suggesting the pragmatic approach succeeded.

The lessons emphasized avoiding the pitfalls of historical practices like UML, Rational Rose, and architecture reviews that obsessed over line angles and spacing precision. Time-boxing debate, publishing iteratively, and accepting good enough rather than perfect proved essential for maintaining momentum in a rapidly evolving field. A Northstar architecture remains necessary for success at enterprise scale, but the process for creating and maintaining it must match the pace of technological change.

## Organizational and Cultural Factors

Throughout the deployment, Liberty IT maintained clear awareness of their constraints as a regulated, established financial services company managing billions in customer funds. The presenters repeatedly emphasized they were "not a plucky three-person startup" and humorously suggested that any startups in the audience should potentially do the reverse of everything discussed. This self-awareness shaped every decision around governance, security, cost controls, and deployment velocity.

The balance between innovation velocity and appropriate safeguards emerged as a central tension. Engineers want access to cutting-edge models and APIs without restrictions. The organization needs security, compliance, auditability, and cost control. The presenters acknowledged this as a "bitter pill to swallow" but maintained that engineer autonomy remains a priority within a safe, governed framework. The metaphor of Barry's Amusements - a Northern Ireland fairground where children burn through tokens too quickly and end up disappointed - illustrated the need to avoid situations where developers run out of allocated resources mid-project while still enabling productive experimentation.

Partnership strategy heavily influenced success. As an established enterprise with deep Microsoft relationships, Liberty IT leveraged existing partnerships rather than engaging with cutting-edge startups. While potentially less exciting, established partnerships provided necessary legal frameworks, governance structures, and contractual protections required at their scale and in their regulatory environment. This pragmatic approach to partnerships represents a key differentiator from startup strategies.

The "warts and all" presentation style, explicitly showing failures and recoveries rather than a polished success narrative, reflects organizational culture that embraces learning through mistakes. The CTO's mandate to "get our knees skinned" gave explicit permission for experimentation and failure, creating psychological safety for teams to try new approaches knowing that not everything would work perfectly the first time. This cultural element likely contributed significantly to the organization's ability to move quickly despite their size and regulatory constraints.

## Synthesis and Ongoing Evolution

Liberty IT's experience deploying GenAI at enterprise scale across 5,000 developers reveals the profound gap between tutorial-level understanding and production operations. Nearly every aspect that appears straightforward in small-scale demonstrations - model selection, RAG implementation, cost management, user adoption - becomes exponentially more complex at scale in regulated environments. The nine lessons shared represent hard-won operational knowledge from an organization that moved quickly while maintaining the governance and controls required in financial services.

The continuous evolution of the technology itself compounds operational challenges. With weekly significant developments in models, frameworks, and techniques, teams must maintain learning velocity while simultaneously stabilizing production systems. The balance between staying current with frontier capabilities and building reliable, cost-effective solutions for business use cases requires constant attention and sophisticated organizational capabilities spanning technical architecture, education, governance, and cultural adaptability.

The case study ultimately demonstrates that successful enterprise GenAI deployment requires treating it as a distinct discipline rather than an extension of cloud or traditional software practices, while simultaneously applying timeless software engineering principles around modularity, observability, cost management, and user experience. The specific configurations Liberty IT developed will likely be deprecated as the ecosystem matures and vendors fill gaps, but their approach to navigating the deployment journey offers valuable patterns for other large organizations undertaking similar transformations.