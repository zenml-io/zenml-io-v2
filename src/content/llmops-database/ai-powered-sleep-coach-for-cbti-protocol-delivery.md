---
title: "AI-Powered Sleep Coach for CBTI Protocol Delivery"
slug: "ai-powered-sleep-coach-for-cbti-protocol-delivery"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69242b7bd0272d1ce3e0485e"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:27:44.073Z"
  createdOn: "2025-11-24T09:55:07.808Z"
llmopsTags:
  - "healthcare"
  - "chatbot"
  - "question-answering"
  - "content-moderation"
  - "high-stakes-application"
  - "rag"
  - "prompt-engineering"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "system-prompts"
  - "evals"
  - "semantic-search"
  - "langchain"
  - "fastapi"
  - "monitoring"
  - "documentation"
  - "openai"
industryTags: "healthcare"
company: "Rest"
summary: "Rest, a company that evolved from developing a podcast player app, built an AI sleep coach to help people solve chronic sleep problems through an 8-week protocol based on Cognitive Behavioral Therapy for Insomnia (CBTI). The problem they identified was that while CBTI is clinically proven to be effective for 80% of people with insomnia, it typically costs thousands of dollars, requires specialized practitioners who have year-long waitlists, and isn't accessible to most people. Rest's solution uses voice-first AI agents powered by OpenAI's GPT-4 and integrated with Vapi for voice capabilities, creating daily check-ins where the AI coaches users through the CBTI protocol with personalized guidance based on their sleep logs, behavioral patterns, and personal context stored in a custom memory system. The product evolved iteratively from a text-based chatbot to a sophisticated voice agent with RAG for knowledge retrieval, dynamic agenda generation tailored to each user's program stage and recent sleep data, and multi-layered memory systems that track user context over time. The company now logs hundreds of hours of voice conversations monthly with users preferring voice interactions for the intimacy and ease it provides in discussing sleep challenges."
link: "https://www.youtube.com/watch?v=dKXSHY5AY4c"
year: 2025
seo:
  title: "Rest: AI-Powered Sleep Coach for CBTI Protocol Delivery - ZenML LLMOps Database"
  description: "Rest, a company that evolved from developing a podcast player app, built an AI sleep coach to help people solve chronic sleep problems through an 8-week protocol based on Cognitive Behavioral Therapy for Insomnia (CBTI). The problem they identified was that while CBTI is clinically proven to be effective for 80% of people with insomnia, it typically costs thousands of dollars, requires specialized practitioners who have year-long waitlists, and isn't accessible to most people. Rest's solution uses voice-first AI agents powered by OpenAI's GPT-4 and integrated with Vapi for voice capabilities, creating daily check-ins where the AI coaches users through the CBTI protocol with personalized guidance based on their sleep logs, behavioral patterns, and personal context stored in a custom memory system. The product evolved iteratively from a text-based chatbot to a sophisticated voice agent with RAG for knowledge retrieval, dynamic agenda generation tailored to each user's program stage and recent sleep data, and multi-layered memory systems that track user context over time. The company now logs hundreds of hours of voice conversations monthly with users preferring voice interactions for the intimacy and ease it provides in discussing sleep challenges."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-sleep-coach-for-cbti-protocol-delivery"
  ogTitle: "Rest: AI-Powered Sleep Coach for CBTI Protocol Delivery - ZenML LLMOps Database"
  ogDescription: "Rest, a company that evolved from developing a podcast player app, built an AI sleep coach to help people solve chronic sleep problems through an 8-week protocol based on Cognitive Behavioral Therapy for Insomnia (CBTI). The problem they identified was that while CBTI is clinically proven to be effective for 80% of people with insomnia, it typically costs thousands of dollars, requires specialized practitioners who have year-long waitlists, and isn't accessible to most people. Rest's solution uses voice-first AI agents powered by OpenAI's GPT-4 and integrated with Vapi for voice capabilities, creating daily check-ins where the AI coaches users through the CBTI protocol with personalized guidance based on their sleep logs, behavioral patterns, and personal context stored in a custom memory system. The product evolved iteratively from a text-based chatbot to a sophisticated voice agent with RAG for knowledge retrieval, dynamic agenda generation tailored to each user's program stage and recent sleep data, and multi-layered memory systems that track user context over time. The company now logs hundreds of hours of voice conversations monthly with users preferring voice interactions for the intimacy and ease it provides in discussing sleep challenges."
---

## Overview

Rest represents a compelling case study in building production LLM applications for healthcare and wellness, specifically addressing chronic insomnia through an AI-powered sleep coach. The company's journey from podcast app to AI sleep coach illustrates many of the practical challenges and iterative decisions teams face when deploying LLMs in sensitive, high-stakes domains.

The founding story is instructive: Rest originally operated a successful independent podcast player app launched in 2017. Through user behavior analysis, they discovered approximately 10% of users were leveraging the app to help them fall asleep by listening to content at night. While not a majority use case, the team recognized that for users struggling with sleep, this was an exceptionally valuable problem with potentially higher willingness to pay compared to general podcast listening. This insight, combined with research into the sleep problem space and the emergence of capable LLMs, led them to pivot toward building an AI sleep coach.

## Problem Space and CBTI

A critical foundation for understanding Rest's LLMOps approach is their grounding in Cognitive Behavioral Therapy for Insomnia (CBTI), a clinically validated treatment protocol with proven efficacy for approximately 80% of people suffering from insomnia. The problem Rest identified through jobs-to-be-done research was that while CBTI works, it faces massive accessibility barriers. Traditional CBTI delivery requires trained therapists or specialized coaches, costs thousands of dollars out-of-pocket, and involves year-long waitlists for quality practitioners. For example, their lead scientific advisor Dr. RJ Mason at UCSF has an 18-month waitlist and conducts CBTI in group settings due to capacity constraints.

CBTI differs fundamentally from basic "sleep hygiene" advice (go to bed at the same time, keep your room cool, avoid screens). Instead, it addresses underlying root causes of insomnia by tackling what clinicians call "perpetuating factors" - the compensatory behaviors people develop in response to initial sleep problems that actually make insomnia chronic and persistent. Through their research, Rest identified user segments engaging in "do-it-yourself sleep hacking" - throwing various solutions at the wall (cooling mattresses, sleep trackers, supplements, environmental modifications) without a systematic approach. While some succeeded, many struggled without clear guidance.

## Initial LLM Prototyping

Rest's first experiments with LLMs began around the time GPT-4 launched. Martin, the CEO, describes their initial approach as exploring whether AI could generate personalized sleep improvement plans, similar to how people were using ChatGPT for meal plans or workout routines. This early prototype could produce recommendations based on general sleep hygiene principles and gave the team a glimpse that the technology had sufficient domain knowledge about sleep to potentially build something more sophisticated.

Their first productionized feature was a text-based chatbot in the app that would gather information from users through conversation and provide personalized recommendations. This represented their entry point into production LLM deployment, but it came with significant challenges around ensuring clinical appropriateness and building user trust.

## Error Analysis and Domain Expert Integration

A cornerstone of Rest's LLMOps practice has been rigorous error analysis from the very beginning. When they launched their initial chatbot, they established a process of reviewing conversation traces with sleep experts. Specifically, they worked with therapists who would manually label turn-by-turn interactions between the AI coach and users, categorizing them as "good" or "bad" from a clinical perspective. This human-in-the-loop evaluation revealed both strengths and critical gaps - while the AI could hold conversations and provide some useful guidance, it wasn't sufficient to deliver the structured, systematic CBTI protocol that users needed.

This error analysis process, conducted weekly, became the foundation for their product roadmap. As Ignasio (CTO) describes it, they follow an approach influenced by Shreya Shankar and Hamel Husain's work on LLMOps, with Martin serving as the "benevolent dictator" who reviews annotated conversation samples. They established annotation queues using Langfuse, their observability platform, where they sample everyday conversations and flag specific traces for review. When sleep science questions arise during error analysis, they consult with Dr. Mason to understand clinical nuances and ensure the AI coach aligns with how expert practitioners would handle specific situations.

## Agent Architecture Evolution

Rest's technical architecture evolved through several distinct phases, each addressing limitations discovered through user feedback and error analysis:

**Phase 1: Basic OpenAI Assistant**
Initially, Rest built a rudimentary agent directly on top of GPT-4. They quickly found this approach gave them insufficient control and too much complexity to manage themselves. They wanted to focus on the problem domain rather than low-level agent orchestration.

**Phase 2: OpenAI Assistants Platform**
The team migrated to OpenAI's Assistants API, which provided managed agent capabilities. This allowed them to delegate conversation management to the platform while focusing on prompt engineering. They began developing extensive system prompts that encoded knowledge about CBTI, the Rest protocol, sleep science, and instructions for how the coach should interact with users. The focus at this stage was making the AI supportive, able to explain the science behind recommendations, and capable of building user commitment to the program.

**Phase 3: Retrieval-Augmented Generation (RAG)**
As their system prompts grew larger and larger, they encountered a common LLM limitation: excessively long context makes the model less focused and more prone to missing important details. The team explored several vector database options including Pinecone and offerings from various platforms, but ultimately decided to start simple with OpenAI's file-based RAG implementation. This allowed them to extract general sleep knowledge, CBTI protocol details, and educational content from the system prompt into retrievable documents. The system prompt then included clear guidelines about when and how to query this knowledge base. User-specific information remained in the prompt itself because they wanted it to be central and always present, rather than dependent on semantic retrieval triggering.

This RAG implementation required careful prompt engineering to guide the agent on when to perform retrievals. As Ignasio notes, RAG requires something in the immediate conversational context to trigger a semantic query, so they had to balance what stayed in-prompt versus what moved to retrieval.

## Voice Integration and Dual-Stack Challenge

A pivotal evolution came with the introduction of voice-based interactions in July (presumably 2024). The team was initially skeptical about voice for several reasons: users might be with partners or in public settings where speaking aloud would be awkward, and their user base includes many older adults who might not be comfortable with voice AI. However, the results were transformative.

Voice became the preferred interaction method for the majority of users. The team found that voice created a warmer, more intimate connection that encouraged users to open up about something as private as sleep struggles. Voice also proved more efficient for sharing detailed contextual information compared to typing on a mobile phone. Critically, voice strengthened trustworthiness - a essential quality for a product that asks users to make significant behavioral changes like strictly following wake times and earliest bedtimes.

For voice implementation, Rest integrated with Vapi, a platform for building voice agents that handles the full stack including streaming, speech-to-text, and text-to-speech. They chose models for each layer of this stack while Vapi managed the integration complexity. Importantly, they continued using OpenAI's GPT-4 as their LLM, but this created a significant architectural challenge: they now maintained two parallel agent implementations - one text-based using OpenAI's Assistants API directly, and one voice-based using GPT-4 through Vapi's infrastructure.

This dual-stack architecture became a real burden. The voice path gained more user adoption and became the primary focus for new features, which meant the text-based path began to lag behind. The two systems didn't always behave identically despite attempts to keep prompts synchronized. Changes made to one stack required adaptation and testing for the other. As Martin describes it, they have version control for prompts but managing parallel branches for different stacks creates messiness. This represents a common LLMOps challenge: third-party platforms provide valuable abstraction and managed services, but they also lock you into specific interfaces and create integration complexity when you need to support multiple modalities.

## Memory Systems and Personalization

A critical requirement for delivering effective CBTI is personalization and continuity. Unlike a general chatbot where each conversation starts fresh, Rest needed their AI coach to remember user context, track progress through the multi-week program, and avoid frustrating users by forgetting previously discussed information.

Rest implemented a multi-layered memory system. After each conversation, a separate LLM-powered process reviews the transcript and extracts information that falls into specific categories they want to remember - things like user challenges that prevented them from following guidance, personal context like having a dog that wakes them up early, travel plans, life stressors, etc. Each memory is timestamped with when it occurred and in what conversational context.

At the start of new conversations, the system retrieves relevant memories to include in the agent's context. They prioritize recency, operating under the heuristic that more recent memories are generally more relevant. Very old memories may be filtered out entirely, though they're still exploring how to identify which memories should be "perennial" versus which should have expiration dates. This mirrors human memory to some extent - we remember recent conversations clearly but details from years ago may fade unless they come up repeatedly.

The memory system remains a work in progress. Users express frustration when the AI asks about something already discussed or fails to remember important context. As Ignasio describes, it's "almost like a product within a product" with significant complexity around memory lifetime, relevance scoring, and how to surface the right memories at the right time. They're actively working on combining structured data (sleep logs, quantitative metrics) with unstructured data (conversational memories) to identify patterns - for example, correlating a behavioral change a user mentioned weeks ago with an improvement visible in their recent sleep data.

## Dynamic Agenda Generation

A distinguishing aspect of Rest's product is that the AI coach comes to conversations with an agenda, rather than waiting for the user to drive the interaction. This reflects how CBTI practitioners operate - they have specific educational points to cover, milestones to acknowledge, and behaviors to address based on where someone is in the protocol.

Rest implemented a "dynamic agenda" system that runs before each daily check-in. It processes all available user data - the previous night's sleep log, the user's position in the 8-week program, recent compliance with recommendations, historical trends, and relevant memories - to generate three priority items the coach should discuss. Each agenda item includes not just a topic but a detailed prompt snippet (several lines of instructions) explaining how the coach should approach that topic with this specific user.

This agenda generation has to happen quickly, in the gap between when a user finishes logging their sleep and when they start the check-in conversation. If the processing takes too long, the system either makes users wait or starts the conversation without an agenda, using previous night's data as a fallback. This real-time requirement shapes their architectural choices - they can't run lengthy offline batch processes for agenda generation.

The agenda becomes part of the agent's context, with a framing prompt explaining how to work through agenda items, followed by the user-specific agenda itself. This approach allows the AI to have structured goals for each conversation while remaining responsive if users want to discuss something else or dive deeper into a particular topic.

## Guardrails and Safety

Operating in the healthcare/wellness domain requires careful attention to safety guardrails. Rest positions itself as a wellness tool rather than medical treatment, explicitly avoiding diagnosis of insomnia or other conditions. They don't provide guidance on medications or interact with pharmaceutical treatments, and they maintain clear disclaimers that users should consult physicians for medical conditions.

To enforce these boundaries, Rest implements LLM-powered evaluations that run on conversation traces. They have specific evals designed to detect any instances where the coach ventures into medication advice or medical guidance. Fortunately, these violations rarely occur, but the evaluation system ensures they're caught immediately when they do happen. These safety evals run as part of their continuous monitoring alongside sampling for quality review.

The team consulted with legal counsel and has been thoughtful about regulatory positioning. They acknowledge the evolving regulatory landscape around AI health applications and don't rule out eventually seeking medical device classification or similar regulatory pathways, but for now maintain clear positioning as a wellness and sleep improvement tool that complements but doesn't replace medical care.

## Evaluation Infrastructure

Rest's evaluation approach combines multiple methodologies. At the foundation is their weekly error analysis process where Martin reviews sampled conversations from annotation queues in Langfuse. They also conduct user interviews roughly weekly, providing qualitative insights into how people experience the product and where it falls short. Customer support inquiries provide another signal about issues and confusion.

For automated evaluation, they use LLM-based evals focused primarily on safety and boundary violations - detecting when the coach discusses prohibited topics like medications or diagnoses. They're exploring Hamming, a platform for building reproducible test scenarios where an LLM-powered simulated user converses with their coach through voice, allowing them to create consistent test cases that exercise different parts of the conversation flow and agent behavior.

The evaluation philosophy is pragmatic and iterative. Rather than building comprehensive eval suites upfront, they focus on the most pressing issues revealed through error analysis and user feedback, then add targeted evals to prevent regression. This aligns with their broader technical philosophy of starting simple and adding complexity only when clearly needed.

## Technical Philosophy and Trade-offs

Throughout the interview, Ignasio emphasizes that their team had no prior experience with LLMs before starting this project - they're learning as they go. They've explicitly explored more sophisticated options like LangGraph for building complex agent architectures, MemGPT/Mem0 for advanced memory management, and other cutting-edge tools. In each case, they concluded "maybe, but clearly not right now."

This discipline around not over-engineering is noteworthy. The team acknowledges they're using managed platforms (OpenAI Assistants, Vapi) that provide less control than building everything from scratch, but the trade-off is worth it at their stage. They can focus on understanding user needs, refining the CBTI delivery approach, and improving conversation quality rather than building infrastructure. As they mature, they may need more control and custom architectures, but they're letting user needs and concrete problems drive that evolution rather than technical curiosity.

Martin references Ellen Brandenburgger's analogy from Stack Overflow of "taking one bite of the apple at a time," which perfectly captures their approach. Each iteration addresses a specific limitation: prompts too long → add RAG; users prefer voice → integrate Vapi; AI forgets context → build memory; conversations lack structure → implement dynamic agendas. This measured progression from simple to complex, always grounded in observed problems, represents mature LLMOps practice.

## UX and Modality Considerations

The team is actively thinking about how UX paradigms should evolve for AI-native products. They note that most voice AI interfaces today just show a voice visualization animation with no supporting visual elements. Rest is exploring a visual language that corresponds to different types of conversational content - displaying charts when discussing metrics, showing animations for educational concepts, writing out action items visually. This reflects an understanding that effective AI products often require carefully designed multimodal experiences rather than just pure conversation.

They also acknowledge interesting tensions in their interface. For example, the morning sleep log captures very specific numeric data - times when users went to bed, tried to fall asleep, actually fell asleep, woke up, got out of bed, etc. They're debating whether to keep the current UI of time pickers versus having a conversational intake that extracts this structured data from natural discussion. There's a UX cost/benefit calculation around what works better for users versus what's easier to implement technically.

## Results and Adoption

While the interview doesn't provide specific quantitative metrics around user outcomes or retention, there are several signals of success. The product is logging hundreds of hours of voice conversations monthly and that volume is growing rapidly. Voice has become the dominant interaction modality. The team is actively onboarding new users through what appears to be a functioning business model (the discussion of willingness to pay and revenue suggests they've validated commercial viability).

More significantly, the qualitative feedback indicates the product is delivering value. Users describe powerful conversations with the AI coach, particularly noting the 24/7 availability as valuable - some users have meaningful interactions in the middle of the night when experiencing sleep difficulties. The trust-building that was a central design goal appears to be working, as evidenced by users opening up about personal challenges and following the program's requirements.

## Future Roadmap

Rest has a clear vision for continued evolution across several dimensions. On the intelligence side, they plan to build what they call a "super expert" that combines CBTI with adjacent disciplines like habit formation (drawing on BJ Fogg's work), chronobiology, and neuroscience. This reflects an opportunity unique to AI - synthesizing knowledge across multiple domains in ways that individual human practitioners cannot.

They're developing "intake interviews" - structured conversations at the start of the journey and at various checkpoints to comprehensively understand user context. Combined with their next-generation memory system, this will enable linking behavioral changes users mention with patterns in their structured sleep data, providing more sophisticated cause-and-effect explanations.

On the UX side, they're building out more evening interactions including a wind-down routine feature, and developing a visual taxonomy that surfaces different content types (metrics, educational concepts, action items) to complement voice conversations.

## Broader LLMOps Lessons

Rest's case study illuminates several important patterns in production LLM deployment:

**Domain expertise is essential** - Their partnership with Dr. Mason and other sleep experts, integrated into error analysis and knowledge curation, ensures clinical appropriateness. Building healthcare AI without deep domain expertise would be reckless.

**Start simple, add complexity incrementally** - Their progression from basic prompts to RAG to memory to dynamic agendas represents measured iteration driven by observed needs rather than technical novelty.

**Error analysis drives roadmap** - Weekly review of conversation traces, annotated by humans with domain context, provides the signal for what to improve next. This creates a tight feedback loop between deployment and development.

**Multi-modality creates integration challenges** - Supporting both text and voice through different platforms created a dual-stack maintenance burden that slowed development. Teams should carefully consider whether multiple modalities are necessary early or can be deferred.

**Memory and personalization are product-critical** - For applications requiring continuity across sessions, memory systems become essential infrastructure. The complexity of managing memory lifecycle, relevance, and integration with structured data shouldn't be underestimated.

**Managed platforms offer valuable trade-offs** - Using OpenAI Assistants and Vapi reduced time-to-market and let the team focus on their domain problem, even though it meant less control. For early-stage products, this trade-off often makes sense.

**Safety requires proactive design** - Operating in healthcare/wellness required careful positioning, legal counsel, clear disclaimers, and automated safety checks. These weren't afterthoughts but core to responsible deployment.

**Trust is the foundation** - The entire technical architecture serves the goal of building user trust - through consistent memory, scientific explanations, empathetic tone, appropriate voice interactions, and reliable guidance. Technical sophistication matters only insofar as it supports this higher-order product goal.

Rest's journey demonstrates that successfully deploying LLMs in sensitive, high-stakes domains requires balancing technical sophistication with practical constraints, always keeping user needs and safety at the center of decision-making. Their measured, evidence-driven approach to building production AI represents a model for other teams tackling complex problem spaces with LLM technology.