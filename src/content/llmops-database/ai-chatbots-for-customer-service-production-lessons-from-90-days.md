---
title: "AI Chatbots for Customer Service: Production Lessons from 90 Days"
slug: "ai-chatbots-for-customer-service-production-lessons-from-90-days"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "rag"
  - "embeddings"
  - "reranking"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "chunking"
  - "error-handling"
  - "human-in-the-loop"
  - "agent-based"
  - "evals"
  - "langchain"
  - "monitoring"
  - "anthropic"
  - "openai"
  - "cohere"
industryTags: "tech"
company: "EdsDev"
summary: "EdsDev deployed multiple customer service chatbots for clients and shares production insights after 90 days of operation. The problem addressed was handling customer service inquiries at scale while maintaining quality and satisfaction. Their solution combined RAG-based retrieval systems with LLMs (primarily Claude 3.5 Sonnet and GPT-4o), semantic chunking strategies, reranking passes, and structured escalation paths to human agents. Results showed that well-designed bots could handle 60% of tickets with resolution rates climbing from 30-40% initially to 60%+ through weekly review and optimization. The case study emphasizes that retrieval quality and operational discipline matter far more than model selection, with most failures attributed to poor chunking, inadequate context, or broken escalation paths rather than model limitations."
link: "https://edsdev.ca/blog/2026-05-28-ai-chatbots-for-customer-service-what-actually-works-after-90-days-in-"
year: 2026
seo:
  title: "EdsDev: AI Chatbots for Customer Service: Production Lessons from 90 Days - ZenML LLMOps Database"
  description: "EdsDev deployed multiple customer service chatbots for clients and shares production insights after 90 days of operation. The problem addressed was handling customer service inquiries at scale while maintaining quality and satisfaction. Their solution combined RAG-based retrieval systems with LLMs (primarily Claude 3.5 Sonnet and GPT-4o), semantic chunking strategies, reranking passes, and structured escalation paths to human agents. Results showed that well-designed bots could handle 60% of tickets with resolution rates climbing from 30-40% initially to 60%+ through weekly review and optimization. The case study emphasizes that retrieval quality and operational discipline matter far more than model selection, with most failures attributed to poor chunking, inadequate context, or broken escalation paths rather than model limitations."
  canonical: "https://www.zenml.io/llmops-database/ai-chatbots-for-customer-service-production-lessons-from-90-days"
  ogTitle: "EdsDev: AI Chatbots for Customer Service: Production Lessons from 90 Days - ZenML LLMOps Database"
  ogDescription: "EdsDev deployed multiple customer service chatbots for clients and shares production insights after 90 days of operation. The problem addressed was handling customer service inquiries at scale while maintaining quality and satisfaction. Their solution combined RAG-based retrieval systems with LLMs (primarily Claude 3.5 Sonnet and GPT-4o), semantic chunking strategies, reranking passes, and structured escalation paths to human agents. Results showed that well-designed bots could handle 60% of tickets with resolution rates climbing from 30-40% initially to 60%+ through weekly review and optimization. The case study emphasizes that retrieval quality and operational discipline matter far more than model selection, with most failures attributed to poor chunking, inadequate context, or broken escalation paths rather than model limitations."
notion:
  pageId: "37cf8dff-2538-8032-9135-c112ce455079"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-11T12:06:00.000Z"
  lastEditedTime: "2026-06-11T12:06:00.000Z"
  publishedAt: "2026-06-11T12:12:48Z"
---

## Overview

EdsDev, a software development consultancy established in 2018, documented their experiences deploying and operating AI-powered customer service chatbots for multiple clients over a 90-day production period. This case study provides a pragmatic, operations-focused perspective on what actually works when running LLM-based customer support systems at scale. The company deployed several chatbots for different clients, with outcomes ranging from successfully handling 60% of tickets to one deployment being shut down after six weeks. Their key insight is that success in production depends far more on retrieval infrastructure, operational discipline, and product design than on LLM model selection.

The case study is particularly valuable for its honest assessment of the gap between demonstration systems and production-ready deployments, and for its emphasis on the ongoing operational work required to maintain quality. EdsDev challenges common vendor claims and provides specific technical patterns, metrics, and failure modes observed in real customer interactions.

## The Reality Gap: Demos vs. Production

EdsDev identifies a critical pattern in LLM deployment for customer service: systems that perform excellently on curated evaluation datasets experience dramatic performance degradation when exposed to real users. Their observations across three deployments revealed that bot accuracy on actual conversations was approximately 40-50% of the accuracy measured on pre-launch evaluation sets. This reality gap emerges because real users behave unpredictably—they provide incomplete context, paste screenshots, write in multiple languages within single messages, and ask questions that assume shared knowledge that the bot cannot access.

This observation highlights a fundamental LLMOps challenge: the difficulty of constructing evaluation datasets that truly represent production distribution. The clean question-answer pairs used for pre-launch testing fail to capture the messy, contextually-dependent nature of actual customer interactions. EdsDev notes that this gap should be planned for explicitly rather than treated as a surprise that triggers emergency meetings when metrics decline post-launch.

## Technical Architecture and Implementation Patterns

The core technical architecture EdsDev employs follows a RAG (Retrieval-Augmented Generation) pattern with several specific enhancements. Their implementation pipeline processes each customer message through multiple stages: initial vector search retrieves approximately 20 candidate chunks, a reranking pass (using Cohere's rerank-3 model) reduces this to the top 5 most relevant chunks, and finally an LLM generates a response with access to these chunks, conversation history, and a set of tools including order lookup, escalation to human agents, and callback scheduling.

The code snippet they share reveals a straightforward architecture: `const chunks = await vectorSearch(query, { topK: 20 }); const reranked = await rerank(query, chunks, { topK: 5 }); const answer = await generate({ system: SUPPORT_SYSTEM_PROMPT, context: reranked, history: conversation.slice(-6), tools: [lookupOrder, escalateToHuman, scheduleCallback] });`

This architecture prioritizes retrieval quality over model sophistication. EdsDev conducted a parallel deployment experiment running the same support bot on both Claude 3.5 Sonnet and GPT-4o for a month on split traffic. The customer satisfaction (CSAT) difference between the two models was statistically insignificant. Critically, the conversations that failed did so for identical reasons across both models—they lacked the right context, or the correct information was embedded in poorly chunked documents. This finding directly contradicts common assumptions that model selection is the primary driver of chatbot quality.

## Retrieval Quality as the Primary Success Factor

EdsDev identifies retrieval as "the whole game" when it comes to production chatbot performance. Their investigation of user complaints about "AI hallucinations" revealed that the vast majority were actually retrieval failures rather than generation failures. The LLMs were functioning correctly by generating responses consistent with the chunks they received—the problem was that the chunks themselves were wrong, incomplete, or irrelevant.

They implemented several specific strategies to improve retrieval quality. First, they moved away from fixed token-count chunking toward semantic chunking based on document structure, using markdown headings as natural boundaries when possible. This approach preserves the logical coherence of information rather than arbitrarily splitting text mid-concept. Second, they store source URLs with every chunk and surface these links in responses, which serves the dual purpose of building user trust and enabling engineers to debug retrieval failures. Third, they implemented a reranking pass using Cohere's rerank-3 model before final generation, which they report noticeably reduces "close but wrong" answers where the retrieval system returns topically related but not actually relevant information.

An additional operational pattern they emphasize is maintaining separate indices for different types of content, particularly distinguishing between evergreen documentation and frequently-changing policy information. Pricing and refund policies are specifically called out as high-risk areas where outdated information can cause significant customer service problems. This suggests a need for versioned knowledge bases with clear update workflows—a distinctly non-trivial infrastructure requirement that simple demo systems typically don't address.

## Escalation Path Design and Tool Use

The `escalateToHuman` tool in EdsDev's implementation is described as "not decoration"—it gets invoked in roughly 20% of conversations across their deployed bots. This high escalation rate is presented as a feature rather than a failure. The key differentiator between helpful bots and frustrating ones is not minimizing escalations but ensuring that when escalation happens, it includes proper context handoff so human agents can continue the conversation effectively.

This design philosophy directly contradicts optimization strategies focused solely on deflection rates. EdsDev explicitly warns against measuring deflection alone, noting that "a bot that confidently says 'I can't help with that, goodbye' has a 100% deflection rate and a 0% satisfaction rate." Their approach requires scope discipline—explicitly defining what the bot can and cannot handle well, and designing graceful failure modes with context preservation when the bot reaches its limits.

The tool-calling architecture they employ allows the bot to take actions beyond just generating text responses, including looking up order information and scheduling callbacks. This extends the bot's utility beyond pure information retrieval into transactional interactions, though the case study doesn't provide detailed implementation specifics for these integrations.

## Metrics and Monitoring Framework

EdsDev evolved their metrics framework based on early mistakes. Initially they tracked deflection rate alone, which created perverse incentives. Their current monitoring dashboard includes five key metrics reviewed weekly: resolution rate (measured by explicit user confirmation via thumbs-up or follow-up message classification), escalation rate with reason codes, time-to-first-response on escalated tickets (which can actually worsen if bot handoffs aren't optimized), CSAT scores compared between bot-only and bot-then-human conversations, and a qualitative review of 20 randomly sampled conversations read end-to-end by a human.

This metrics framework balances quantitative efficiency measures with qualitative outcome assessment. The manual conversation review is positioned as "the most valuable thing on the list and the easiest to skip." EdsDev reports that this review consistently surfaces product bugs, broken links, and policy contradictions every single week. They characterize the chatbot as "the most honest user research tool you've ever deployed" because it logs verbatim interactions without fatigue or selection bias.

The emphasis on weekly review processes highlights a critical LLMOps operational requirement: these systems require continuous human oversight and iterative improvement. The technology does not achieve a stable, "set and forget" state. Instead, ongoing maintenance involves monitoring failed conversations, improving retrieval strategies, updating knowledge bases, and refining prompts based on observed weaknesses.

## Performance Expectations and Timeline

EdsDev provides specific performance benchmarks based on their deployments. They advise planning for a 60-90 day curve to reach production quality, with the first two weeks focused on initial connection and evaluation, and the subsequent eight weeks devoted to finding and addressing gaps. Initial resolution rates typically start around 30-40% on real traffic and climb into the 60% range through iterative improvement. For well-scoped support bots with decent documentation, they report that 40-65% of conversations can end without human intervention, with SaaS products with strong documentation performing toward the higher end and products involving billing, account-specific data, or shipping trending lower.

These benchmarks provide a reality check against vendor claims. EdsDev specifically warns that vendors quoting 80%+ deflection rates should be asked how exactly they're counting, noting that "user stopped replying" is not equivalent to "problem solved." This caution reflects their broader skepticism about oversimplified metrics that don't capture actual user satisfaction or problem resolution.

## Build vs. Buy Decision Framework

The case study addresses the common question of whether to build on open-source frameworks or purchase managed solutions. EdsDev's recommendation is straightforward: build if you have an engineer who will own retrieval, evaluations, and weekly conversation review; otherwise buy. They acknowledge that open-source repositories like Chatwoot, Botpress, and LangChain templates can produce working prototypes quickly, and that free tiers from vendors like Tidio or Intercom's Fin can work for genuinely small volumes (20-50 tickets per week).

However, they emphasize that the hidden cost of building is not the initial code but the ongoing operations: knowledge base updates, prompt tuning, monitoring escalations, and addressing the product bugs that the bot surfaces. For small businesses with low volume, managed tools are presented as genuinely appropriate. For anything beyond that scale, the operational burden becomes the primary cost driver rather than software licensing fees.

This framework implicitly acknowledges that LLMOps maturity varies significantly across organizations. The build path requires not just technical capability but organizational commitment to ongoing maintenance. The buy path trades flexibility and control for reduced operational complexity, a tradeoff that makes sense for teams without dedicated LLMOps capacity.

## Common Failure Modes

EdsDev identifies three primary failure modes that kill chatbot projects, listed in order of frequency. First, nobody owns the bot after launch, causing documentation to become stale and quality to decay over time. Second, the escalation path is broken, leading frustrated users to blame the company rather than recognizing limitations of the automated system. Third, teams optimize for deflection instead of resolution, training customers to view the bot as an obstacle to bypass rather than a helpful resource.

Notably, model choice "is rarely in the top five" causes of failure. This observation reinforces their central thesis that operational discipline and system design matter far more than LLM capabilities. The failures they document are primarily organizational and architectural rather than technological limitations of the underlying models.

Another interesting failure pattern they mention is the gap between demo performance and sustained production operation. The first 30 days are described as "a lie"—every chatbot looks great in week one when tested with known questions and clean data. Real performance only becomes visible when messy user traffic arrives, typically revealing significant accuracy degradation around day 20-30.

## Unresolved Challenges and Ongoing Questions

EdsDev candidly discusses areas where they haven't reached firm conclusions. Voice-based support agents built on the same retrieval infrastructure are described as "impressive in the demo and exhausting in practice." Latency matters more than expected, interruption handling proves difficult, and customer reactions polarize strongly—they either love it or hang up within 15 seconds with no middle ground. This suggests that voice interfaces introduce additional UX and technical challenges that text-based systems don't face.

Another unresolved question concerns bot personality. Too little personality makes the bot feel like "a worse search box," while too much creates uncanny valley effects, especially during escalations. EdsDev reports that their most successful deployments landed on "somewhere boring and competent"—not attempting to be friends or cold robots, but rather "a useful coworker who knows the docs." This suggests a design philosophy of transparent capability rather than human simulation.

## Model and Infrastructure Choices

While EdsDev deliberately downplays model selection as a key success factor, they do mention using Claude 3.5 Sonnet and GPT-4o as their primary LLMs for generation. For reranking, they specifically call out Cohere's rerank-3 model as "cheap" and effective at reducing incorrect answers. Vector search is mentioned but the specific vector database isn't identified. The overall infrastructure appears to be relatively straightforward by modern LLMOps standards—vector search, reranking, LLM generation with tool calling, and structured prompt engineering with system prompts and conversation history.

The conversation history management is worth noting: they pass only the most recent six conversational turns (`conversation.slice(-6)`) to the generation model. This represents a practical compromise between maintaining conversational coherence and managing context window constraints and latency. Six turns provides three full user-bot exchanges, which appears sufficient for most customer service interactions while keeping context manageable.

## SOC 2 and Enterprise Considerations

EdsDev briefly mentions that enterprise customers will require SOC 2 reviews, indicating that compliance and security considerations are non-trivial for production deployments. This is presented as one of the hidden costs of the "free tier" approach—while the software may be free or cheap, meeting enterprise security and compliance requirements adds operational overhead that small free-tier solutions typically don't address. This suggests that the path to enterprise deployment involves infrastructure choices, audit processes, and compliance work that goes well beyond the core AI functionality.

## Knowledge Management and Content Strategy

An implicit theme throughout the case study is the critical importance of knowledge management. The effectiveness of RAG-based systems depends fundamentally on the quality, organization, and currency of the underlying documentation. EdsDev describes the weekly conversation review process as consistently revealing "product bugs, broken links, and policy contradictions," which suggests that deploying a chatbot effectively forces organizations to confront gaps and inconsistencies in their documentation and policies.

This creates an interesting feedback loop: the chatbot surfaces documentation problems, humans fix them, and retrieval quality improves, leading to better bot performance. However, this virtuous cycle only functions if the organization has committed to the ongoing review and improvement process. Without that commitment, documentation staleness becomes a steady drag on bot performance.

## Practical Guidance and Positioning

The case study concludes with EdsDev offering to consult with organizations considering chatbot deployment, positioning themselves as honest advisors who will recommend building, buying, or waiting based on the specific situation. This positioning—emphasizing realism over optimism—is consistent with the overall tone of the piece, which deliberately counters oversimplified vendor narratives.

The frequently asked questions section reinforces key messages: expect 60-90 days to production quality, free tiers work for genuinely small businesses, build only if you have dedicated ownership, expect 40-65% deflection rates for well-scoped bots, and most failures are organizational rather than technical. These synthesized answers provide practical guidance grounded in their deployment experience.

Overall, this case study represents a valuable contribution to LLMOps knowledge specifically because it emphasizes operational realities over technological capabilities. The message is not that LLMs are insufficient for customer service but that successful deployment requires significant infrastructure, ongoing human oversight, disciplined metrics, and realistic expectations about what automation can achieve. The technology enables significant efficiency gains—handling 60% of tickets represents substantial cost savings and potentially improved response times—but only when embedded in well-designed operational systems with committed ownership.
