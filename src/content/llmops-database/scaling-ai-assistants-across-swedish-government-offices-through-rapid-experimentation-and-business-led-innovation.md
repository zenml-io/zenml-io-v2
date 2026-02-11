---
title: "Scaling AI Assistants Across Swedish Government Offices Through Rapid Experimentation and Business-Led Innovation"
slug: "scaling-ai-assistants-across-swedish-government-offices-through-rapid-experimentation-and-business-led-innovation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6908a81ff496ab9e70098a0f"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:23:40.721Z"
  createdOn: "2025-11-03T13:03:27.870Z"
llmopsTags:
  - "question-answering"
  - "document-processing"
  - "summarization"
  - "data-analysis"
  - "classification"
  - "chatbot"
  - "poc"
  - "rag"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "human-in-the-loop"
  - "cost-optimization"
  - "chunking"
  - "system-prompts"
  - "evals"
  - "documentation"
  - "guardrails"
  - "langchain"
  - "anthropic"
  - "openai"
  - "meta"
industryTags: "government"
company: "Government of Sweden"
summary: "The Government of Sweden's offices embarked on an ambitious AI transformation initiative starting in early 2023, deploying over 30 AI assistants across various departments to cognitively enhance civil servants rather than replace them. By adopting a \"fail fast\" approach centered on business-driven innovation rather than IT-led technology push, they achieved significant efficiency gains including reducing company analysis workflows from 24 weeks to 6 weeks and streamlining citizen inquiry analysis. The initiative prioritized early adopters, transparent sharing of both successes and failures, and maintained human accountability throughout all processes while rapidly testing assistants at scale using cloud-based platforms like Intric that provide access to multiple LLM providers."
link: "https://www.youtube.com/live/Rx6Ix3zdyr0"
year: 2025
seo:
  title: "Government of Sweden: Scaling AI Assistants Across Swedish Government Offices Through Rapid Experimentation and Business-Led Innovation - ZenML LLMOps Database"
  description: "The Government of Sweden's offices embarked on an ambitious AI transformation initiative starting in early 2023, deploying over 30 AI assistants across various departments to cognitively enhance civil servants rather than replace them. By adopting a \"fail fast\" approach centered on business-driven innovation rather than IT-led technology push, they achieved significant efficiency gains including reducing company analysis workflows from 24 weeks to 6 weeks and streamlining citizen inquiry analysis. The initiative prioritized early adopters, transparent sharing of both successes and failures, and maintained human accountability throughout all processes while rapidly testing assistants at scale using cloud-based platforms like Intric that provide access to multiple LLM providers."
  canonical: "https://www.zenml.io/llmops-database/scaling-ai-assistants-across-swedish-government-offices-through-rapid-experimentation-and-business-led-innovation"
  ogTitle: "Government of Sweden: Scaling AI Assistants Across Swedish Government Offices Through Rapid Experimentation and Business-Led Innovation - ZenML LLMOps Database"
  ogDescription: "The Government of Sweden's offices embarked on an ambitious AI transformation initiative starting in early 2023, deploying over 30 AI assistants across various departments to cognitively enhance civil servants rather than replace them. By adopting a \"fail fast\" approach centered on business-driven innovation rather than IT-led technology push, they achieved significant efficiency gains including reducing company analysis workflows from 24 weeks to 6 weeks and streamlining citizen inquiry analysis. The initiative prioritized early adopters, transparent sharing of both successes and failures, and maintained human accountability throughout all processes while rapidly testing assistants at scale using cloud-based platforms like Intric that provide access to multiple LLM providers."
---

## Overview

The Government of Sweden's offices (approximately 6,500 employees across Stockholm and 100 embassies worldwide) undertook a comprehensive AI assistant deployment initiative beginning in spring 2023. This case study provides rare insight into how a government organization successfully scaled generative AI adoption through a business-first approach that prioritizes cognitive enhancement of civil servants over process automation. Led by Peter Nordström (Head of Innovation Unit within the Digitalization Department) and Magnus Enell (Change Manager with a PhD in political science working on loan from the Ministry of Finance), the initiative represents a pragmatic approach to LLMOps that balances rapid experimentation with careful governance considerations.

The Swedish government offices present an interesting organizational context: they don't have large citizen-facing systems like the tax agency, making them more focused on knowledge-intensive internal processes involving policy analysis, company oversight, legislative review, and international coordination. This created an ideal environment for AI assistant adoption since civil servants were dealing with massive volumes of documents and analytical work under significant time pressure.

## Strategic Approach and Principles

The fundamental strategic principle driving this initiative was **cognitive enhancement rather than process transformation**. Rather than attempting to redesign workflows or automate decision-making, the team focused on making civil servants more effective within their existing processes. This approach proved critical to rapid adoption because it meant the 400-year tradition of responsible information handling and judgment within government offices could remain intact while still gaining efficiency benefits.

The innovation team acted as an **incubator within the digitalization department**, taking new ideas and projects, testing them rapidly, and either scaling successful ones into operational systems or quickly killing unsuccessful experiments. This "fail fast" philosophy was genuine - when showcasing results to the broader organization, they deliberately included both successes and failures to build credibility and transparency. This contrasts sharply with typical government IT projects that might spend years in planning before any real-world testing.

A core insight was that **business (core operations) must drive the change, not IT**. The team found themselves in an unusual situation where they had "cognitively mature civil servants in a very knowledge-intensive environment longing for this new tool." Rather than pushing technology that users didn't understand or want, they encountered civil servants actively seeking shortcuts to deliver more under pressure. This demand-pull rather than supply-push dynamic fundamentally shaped their approach.

The team maintained **platform and model agnosticism** as a deliberate strategy. They selected the Intric platform specifically because it allows switching between language models from Anthropic (Claude), OpenAI (GPT-4), and open-source models like Gemini and Llama hosted in Sweden. This flexibility serves multiple purposes: it allows testing different models for different use cases, provides leverage in vendor negotiations, enables handling more sensitive information with locally-hosted models, and reduces the risk of lock-in given how rapidly the AI landscape evolves.

## Technical Architecture and Platform

The technical foundation centers on the **Intric platform**, which provides a managed environment for building and deploying AI assistants. In this architecture, an "AI assistant" is essentially a packaged bundle of information, prompts, and data sent to a language model to generate responses. The platform abstracts away much of the complexity of working directly with LLM APIs while providing important governance and management capabilities.

Each assistant is built on a **RAG (Retrieval-Augmented Generation) architecture**. Users building assistants must first structure their knowledge sources and upload them into the assistant's knowledge base. The assistant then uses this contextualized data along with carefully crafted prompts to respond to queries. The platform allows configuring which language model to use and adjusting parameters like temperature (the creativity vs. determinism slider).

The platform operates in a **workspace model** where individuals can build personal assistants and then selectively share access with colleagues. They haven't yet deployed assistants as widely-accessible widgets, maintaining tighter control during the pilot phases. This allows validation of assistant quality, ownership clarification, and policy development before broader sharing.

An interesting technical evolution mentioned was the integration of **external databases** directly into the platform. The Swedish Statistical Bureau (SCB) and municipal economic data (Kolada) databases are now integrated, allowing assistants to query these sources directly. When a user asks a question requiring this data, the assistant creates a research plan (which the user can modify), executes queries against the databases, analyzes the results, and presents findings. This represents movement toward more agentic behavior where the assistant can take actions beyond simple retrieval from uploaded documents.

The team made a **conscious decision to use cloud services** rather than on-premises infrastructure. This was partly pragmatic (they lack the personnel and expertise to manage GPU infrastructure) and partly strategic (cloud services allow easy access to latest capabilities without large upfront investment). They successfully navigated security and compliance concerns around cloud usage, demonstrating that with proper controls, cloud deployment is viable even for government use cases.

## Deployment Process and Change Management

The deployment approach focused heavily on **identifying and supporting early adopters** rather than attempting organization-wide rollout. The team actively seeks out "AI pilots" - civil servants showing initiative and interest in applying AI to their work. This started organically through word-of-mouth and evolved into a more structured nomination process.

The **nomination and selection process** works as follows: heads of units nominate individuals they believe would be effective AI pilots based on their cognitive maturity, readiness to commit, and the feasibility of their proposed use case. The innovation team reviews nominations, selects pilots considering both individual qualifications and portfolio balance (avoiding duplication, ensuring appropriate complexity levels), and then provides licenses and onboarding support. This gamification element creates healthy competition while ensuring scarce resources go to highest-impact opportunities.

**Onboarding and training** centers on teaching civil servants the "craft of prompting." The team emphasizes that civil servants need to understand how RAG databases work to trust the outputs and use assistants effectively. For simple cases, users can find value immediately with minimal training. For complex cases like the company analyst (described below), effective prompting requires significant skill. The team runs regular workshops where civil servants get hands-on experience, which consistently converts skeptics into enthusiasts once they see practical applications.

A critical aspect of change management is **maintaining transparency through shared learning**. When they brought pilots together for end-of-phase showcases, they deliberately included both successful and failed experiments. This credibility-building approach proved more effective than typical "highlight reel" presentations. They also created shared repositories where prompts and system prompts are available for others to learn from and adapt.

The team employs **"feet on the ground" evangelization** - saying yes to meetings, showing up to listen and demonstrate, and actively seeking out conversations wherever they can. When they hear about challenges that might be addressable with AI, they "kick in the door" to join the conversation. This grassroots approach, combined with formal mechanisms like innovation arenas and town hall meetings, creates multiple pathways for engagement.

Importantly, they **frame AI in historical and mission context** rather than leading with technology. Magnus Enell's background in political science and constitutional history proves valuable here. By connecting AI capabilities to the 400-year tradition of developing legitimate due process and good governance, they help civil servants understand this as part of an ongoing evolution in how the country is governed, not just a technology fad. This contextual framing resonates more deeply than purely technical explanations.

## Key Use Cases and Results

The **Company Analyst assistant** exemplifies the potential of well-executed AI assistants. The government owns a portfolio of 40 companies (including major entities like Vattenfall, PostNord, and others) that collectively employ 122,000 people and generate 850 billion kronor in revenue. A dedicated department analyzes these companies across multiple dimensions (sustainability, human rights, efficiency, etc.) to ensure responsible government ownership.

Previously, this analytical work took **24 weeks per cycle**. Analysts would download reports, read through them, take manual notes, and synthesize findings. The assistant was built by uploading company reports into the RAG database and creating an extraordinarily detailed system prompt - 6.5 A4 pages of questions representing their analytical and judgment framework. The same analytical workflow continues, but now mediated through the assistant. The result: **the same analytical work with reportedly higher quality now takes 6 weeks**, a 4x improvement.

Critically, this assistant was **built by Karen Swenson, the government's first data specialist within the owning department, with minimal support from the IT team**. This exemplifies their principle of business-driven development. The department knows their domain, understands what analysis is needed, and could encode that expertise into the prompt. The IT team provided the platform and training but didn't need to become company analysis experts.

Another impactful use case involved **analyzing citizen inquiries**. Each year about 6,000 people call government offices with questions and concerns across a vast range of topics. At year-end, these calls were manually analyzed to identify patterns and themes - labor-intensive work. One civil servant (Erica) requested a license to experiment. Five to six weeks later, she reported that her team had performed the analysis both manually and with AI, found they reached the same results, and announced they would no longer do it manually. This happened **without the IT department even knowing the project was underway** - exactly the kind of business-led innovation they hoped to enable.

A particularly high-stakes use case involved **environmental permit legislation review**. A commissioned investigation produced 6,000 pages of analysis and 300 pages of legislative proposals, plus another 4,000 pages with 200 pages of proposals being sent to 250 organizations for review. Two people were tasked with analyzing the anticipated 25,000 pages of feedback. Unsurprisingly, they reached out for AI assistance, illustrating how the tool naturally gets pulled into the highest-value, most time-constrained scenarios.

The team also developed **multiple specialized assistants for searching internal information** rather than one monolithic search tool. By breaking down information search by type or source, they achieve better user understanding and more reliable results. This modular approach trades some convenience for transparency and effectiveness - users understand what each assistant does and can trust its outputs more readily.

**Transcription and meeting support** emerged as a surprisingly impactful category. Civil servants spend enormous time in meetings taking notes, which prevents them from fully engaging. Automatic transcription with AI-powered summarization and action item extraction allows fuller participation while ensuring better documentation. The ability to photograph handwritten notes and have them transcribed and analyzed also proved popular.

## LLMOps Challenges and Learnings

**Information management and legal uncertainty** emerged as the biggest challenge. Swedish law around public information disclosure created complex questions: Are system prompts public documents? Are interaction logs? How should civil servants determine what information can be uploaded to assistants? While civil servants have 400-year traditions of handling sensitive information, using AI assistants required **leveling up information management skills** to be more explicit and granular. The solution wasn't centralized policy dictates but rather enabling civil servants to sharpen these skills within their specific contexts, since different ministries handle information quite differently.

**GDPR and automated decision-making** required careful navigation. The team maintains that by keeping humans in the loop (assistants support but don't replace civil servant judgment), they avoid most automated decision-making concerns. They point to the tax agency's 100 million annual decisions (95 million automated) as evidence that automated decision in government is permissible with proper compliance work. Their approach of "risk management by design" means considering legal, security, and governance implications from the start rather than as an afterthought.

A surprising operational challenge was **cost management and model selection**. When GPT-4 performance degraded, they sent a note suggesting users switch to Claude Opus. Many did, and when the invoice arrived, they discovered Opus costs 10x more per token. This highlighted the need for civil servants to understand economics (avoiding unnecessary greetings and thank-yous to chatbots) and the organization's need for clear cost allocation models. Their emerging approach: provide efficient small models as default, but allow users to opt into more expensive models if they're willing to have their department bear the cost.

**Validation and quality assurance** presents ongoing challenges. In the citizen inquiry analysis case, they could compare AI results against manual analysis for validation. But going forward, they'll likely skip manual analysis - so what's the validation baseline? They're working to develop **validation frameworks that transcend specific model versions** since model capabilities evolve rapidly. This is particularly critical for assistants that will be shared organization-wide rather than used by their creators.

**Platform maturity and feature evolution** created interesting dynamics. Several times they contemplated development projects to add capabilities (like web scraping for open data) only to have those features appear in the standard platform within weeks. This reinforced their strategy of using cloud services and avoiding custom development where possible. However, it also requires staying current with rapid platform evolution and helping users understand new capabilities.

The team learned that **prompting complexity matters tremendously**. Simple assistants work with minimal prompting skill, but sophisticated assistants like the company analyst require deep understanding. Teaching civil servants to prompt effectively isn't just about syntax - it's about understanding RAG database behavior, knowing when to trust outputs, and structuring prompts to match analytical frameworks. This is genuine skill development, not just tool training.

**Process decomposition** emerged as a critical principle. When assistants try to do too much in one interaction, results become "sketchy" (unreliable). The solution is breaking processes into digestible pieces, potentially with separate assistants for each piece. However, this creates an **orchestration challenge** - connecting assistants in workflows while maintaining transparency and accountability at each step. They envision civil servants managing knowledge-driven processes where assistants handle individual tasks but humans oversee the overall flow, ensuring accountability isn't lost in automation.

## Organizational Model and Governance

For the pilot phases, the innovation team provided **centralized support** with team members each managing a portfolio of pilot users. Peter and Magnus split the initial 30-40 interested civil servants between them, checking in weekly to understand challenges and needs. This high-touch approach enabled rapid learning but doesn't scale.

For scale, they're developing a **two-tiered organizational model**. The first tier is broad access through a nomination process where departments identify AI pilots to work on opportunistic use cases. The second tier is **"Top Gun" - a center of excellence** bringing together the best pilots to work on the highest-impact, government-office-wide use cases. This strategic layer allows surgical focus on challenges requiring more development, deeper expertise, or broader coordination.

They're establishing the role of **AI Editor** - individuals with formal responsibility for managing specific assistants. Using the metaphor of a stable, AI editors ensure assistants are "fed" with updated data and "mucked out" of outdated information regularly. This creates clear accountability, which is essential in government contexts. Editors must be formally assigned this responsibility by their managers as part of their portfolio.

A **Capability Council** comprised of core business representatives will make decisions about organizational placement of assistants - should an assistant be managed at the department level, ministry level, or government-office-wide? This governance structure ensures business rather than IT drives these strategic decisions.

The emerging governance model emphasizes **validation requirements for shared assistants**. Before an assistant built by one person can be used by others, there must be clear documentation of its precision level, data sources, ownership, and appropriate use cases. This allows users to make informed judgments about trusting and using assistants they didn't build themselves.

## Future Direction and Implications

The team is moving from proving technical feasibility (pilot phase one) to **building organizational and governance frameworks** for scale (pilot phase two). This includes developing policies for assistant sharing, establishing the center of excellence and capability council, ensuring each ministry has development capacity, and working through legal and compliance frameworks more systematically.

They're exploring **more agentic capabilities** as they become available. The database integration represents early steps toward agents that can take actions beyond document retrieval. However, they maintain focus on "assistants" that enhance human agency rather than "agents" that transfer agency from civil servants to systems. This preserves accountability while still enabling significant automation.

The concept of **compound AI systems** emerged in their discussions - combining different AI techniques (LLMs, small language models, specialized reasoning models) for different tasks, orchestrated together with contextualized data and guardrails. While they haven't explicitly adopted this framing, their modular approach to building specialized assistants and their platform's multi-model support positions them well for this evolution.

They acknowledge the **rapidly evolving landscape** makes long-term technology investments risky. What works today may be completely outdated in a year. This reinforces their cloud services strategy and model agnosticism. They're comfortable being "test and learn" at significant scale rather than making large upfront commitments.

There's recognition that success metrics need refinement. While they've achieved impressive efficiency gains (4x speedup for company analysis, significant time savings in various analytical tasks, mental relief for overburdened civil servants), they need more sophisticated ways to measure quality, validate outputs, and assess broader impacts on decision quality and organizational effectiveness.

## Broader Insights for LLMOps

This case study offers several valuable insights for LLMOps practitioners beyond government contexts. First, the **business-first, technology-second principle** proves powerful across domains. When users desperately want the capability and IT provides an enabling platform rather than prescribed solutions, adoption accelerates dramatically. This requires IT to be comfortable with less control and more facilitation.

Second, the **importance of genuine "fail fast"** culture cannot be overstated. Publicly sharing failures alongside successes builds trust and accelerates organizational learning far more than curated success stories. Many organizations claim this but few execute it as thoroughly as this team.

Third, **platform and model agnosticism** provides valuable flexibility in a rapidly evolving market. While this case study uses Intric specifically, the broader principle of avoiding lock-in and maintaining optionality applies regardless of specific platform choices. The ability to quickly switch models when performance or cost issues arise proved operationally important.

Fourth, **change management and training are as important as technology**. Teaching users to prompt effectively, helping them understand when to trust AI outputs, and building communities of practice around shared learning enabled adoption far more than technical excellence alone would have.

Fifth, the **modular approach to assistants** (many specialized assistants rather than one monolithic system) offers significant advantages for transparency, validation, and user understanding, even though it creates orchestration challenges. This mirrors emerging best practices in AI system design around compound systems.

Finally, the case demonstrates that **rapid experimentation at scale is possible even in risk-averse, highly-regulated environments** like government. The keys are maintaining human accountability, starting with lower-risk use cases, building compliance considerations in from the start, and having leadership willing to support intelligent risk-taking. The contrast between this approach and typical multi-year government IT projects is striking and instructive.