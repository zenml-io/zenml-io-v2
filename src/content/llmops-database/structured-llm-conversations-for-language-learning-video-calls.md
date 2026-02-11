---
title: "Structured LLM Conversations for Language Learning Video Calls"
slug: "structured-llm-conversations-for-language-learning-video-calls"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68091e6f0aa0351b77644cf0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:06:36.846Z"
  createdOn: "2025-04-23T17:07:59.808Z"
llmopsTags:
  - "chatbot"
  - "translation"
  - "speech-recognition"
  - "structured-output"
  - "prompt-engineering"
  - "system-prompts"
  - "human-in-the-loop"
  - "error-handling"
  - "monitoring"
  - "reliability"
  - "guardrails"
  - "openai"
  - "anthropic"
  - "google-gcp"
industryTags: "education"
company: "Duolingo"
summary: "Duolingo implemented an AI-powered video call feature called \"Video Call with Lily\" that enables language learners to practice speaking with an AI character. The system uses carefully structured prompts, conversational blueprints, and dynamic evaluations to ensure appropriate difficulty levels and natural interactions. The implementation includes memory management to maintain conversation context across sessions and separate processing steps to prevent LLM overload, resulting in a personalized and effective language learning experience."
link: "https://blog.duolingo.com/ai-and-video-call/"
year: 2025
seo:
  title: "Duolingo: Structured LLM Conversations for Language Learning Video Calls - ZenML LLMOps Database"
  description: "Duolingo implemented an AI-powered video call feature called \"Video Call with Lily\" that enables language learners to practice speaking with an AI character. The system uses carefully structured prompts, conversational blueprints, and dynamic evaluations to ensure appropriate difficulty levels and natural interactions. The implementation includes memory management to maintain conversation context across sessions and separate processing steps to prevent LLM overload, resulting in a personalized and effective language learning experience."
  canonical: "https://www.zenml.io/llmops-database/structured-llm-conversations-for-language-learning-video-calls"
  ogTitle: "Duolingo: Structured LLM Conversations for Language Learning Video Calls - ZenML LLMOps Database"
  ogDescription: "Duolingo implemented an AI-powered video call feature called \"Video Call with Lily\" that enables language learners to practice speaking with an AI character. The system uses carefully structured prompts, conversational blueprints, and dynamic evaluations to ensure appropriate difficulty levels and natural interactions. The implementation includes memory management to maintain conversation context across sessions and separate processing steps to prevent LLM overload, resulting in a personalized and effective language learning experience."
---

## Overview

Duolingo's "Video Call with Lily" feature represents a compelling case study in deploying Large Language Models for educational purposes. The feature enables language learners to engage in real-time spoken conversations with an AI character named Lily, providing speaking practice in a low-pressure environment. This article, published in April 2025, provides a behind-the-scenes look at how Duolingo's engineering and learning design teams structure their LLM interactions to create a consistent, pedagogically sound, and engaging user experience.

The fundamental challenge addressed in this case study is that while modern LLMs like ChatGPT, Claude, and Gemini are trained on vast amounts of language data and can produce natural-sounding exchanges, they cannot be simply instructed to "teach a language learner" without significant additional structure and guidance. The Duolingo team has developed a sophisticated prompting architecture that transforms general-purpose language models into specialized educational tools.

## Technical Architecture and Prompt Engineering

At the core of Duolingo's approach is a carefully designed prompt structure that employs a three-character paradigm for organizing LLM interactions:

- **System**: Acts as a coach providing instructions to the AI. Duolingo's Learning Designers write these instructions to define how Lily should behave, respond, and guide conversations.
- **Assistant**: This is Lily herself—the AI character who responds to users according to System instructions.
- **User**: The language learner engaging in the conversation.

This structure allows the team to maintain separation between instructional content (System) and conversational behavior (Assistant), enabling precise control over the AI's output while still allowing natural conversation flow. The System instructions include detailed information about Lily's personality (described as a "sarcastic emo teenage girl"), her backstory, strategies for helping stuck learners, and guidelines for speaking at the appropriate CEFR (Common European Framework of Reference for Languages) level.

## Conversation Structure and Flow Control

The team has implemented a predictable four-part structure for every conversation:

- **Opener**: The System instructs Lily on an initial greeting in the target language. Engineers have built a rotation of greetings appropriate to each CEFR level to provide variety while maintaining consistency.
- **First Question**: This crucial element sets the conversational topic and scene. It must be relevant to current learning objectives and appropriately challenging.
- **Conversation**: A free-flowing exchange where Lily reacts naturally to user input while staying aligned with System instructions.
- **Closer**: After a predetermined number of exchanges, a programmatic intervention triggers the System to instruct Lily to end the call, preventing endless conversations.

This structure demonstrates a key LLMOps principle: constraining AI behavior through predictable patterns while still allowing sufficient flexibility for natural interaction.

## Multi-Stage Prompting to Prevent LLM Overload

One of the most interesting technical insights from this case study is Duolingo's discovery that combining too many instructions into a single prompt can degrade output quality. The team found that when first-question generation instructions were combined with general conversation instructions, the LLM would produce undesirable results such as overly complex sentences or missing target vocabulary.

Their solution was to implement a multi-stage prompting architecture. The first question is generated in a separate "Conversation Prep" phase with focused instructions about CEFR level, required vocabulary, and other criteria. This question is then fed into the "Main Conversation" phase as a pre-determined input. The article notes that "when your Video Call is ringing, that's when the System is formulating the first question"—indicating this preparation happens in real-time just before the conversation begins.

This approach reflects a broader LLMOps best practice: decomposing complex tasks into simpler, more focused subtasks can significantly improve output quality. The analogy provided—that a human given fifty tasks at once will either forget some or complete all in a "half-baked way"—illustrates the intuition behind this design decision.

## Memory and Personalization System

The feature includes a sophisticated memory system that enables Lily to remember information about users across sessions. After each call ends, the transcript is processed by the LLM with a specific prompt asking "What important information have we learned about the User?" The extracted facts are stored in a "List of Facts" that becomes part of the System instructions for subsequent calls.

This approach allows Lily to make personalized callbacks to previous conversations, such as "How are your dogs doing?" or "Have you tried any good tacos lately?" The article describes this as making calls feel "personalized and magical"—a key user experience goal.

From an LLMOps perspective, this demonstrates a pattern for implementing persistent memory in conversational AI systems without fine-tuning or complex vector database retrieval. By using the LLM itself to extract salient facts and then injecting those facts into future System prompts, the team achieves personalization through prompt augmentation rather than model modification.

## Real-Time Evaluation and Dynamic Adaptation

Perhaps the most operationally sophisticated element described is the mid-call evaluation system. The team recognized that rigid adherence to pre-planned topics could create poor user experiences—for example, when a learner excitedly shares news about completing a course and Lily responds with an unrelated question about Swiss folk music.

To address this, they implemented real-time evaluations during the conversation itself. The System evaluates user responses and asks Lily to consider questions such as:
- Did the learner mention something Lily would find exciting?
- Was there inappropriate content?
- Does the learner seem confused?
- Does the learner want to lead the conversation in a different direction?

Based on these evaluations, Lily can dynamically adjust her responses—expressing excitement when appropriate, rephrasing when confusion is detected, or abandoning her original topic to follow the learner's lead.

This represents a significant operational complexity: the LLM is performing evaluative reasoning in real-time during active conversations, not just generating responses. The article mentions "the LLM is always working—even during the Video Call itself" to ensure quality, suggesting continuous evaluation alongside generation.

## Balancing Competing Priorities

The case study highlights the challenge of balancing multiple, sometimes competing, requirements in production AI systems:

- **Pedagogical appropriateness**: Content must match CEFR proficiency levels
- **Character consistency**: Lily must maintain her sarcastic teenage personality throughout
- **Engagement**: Conversations must feel natural and delightful, not robotic
- **Safety**: Inappropriate content must be handled (the mid-call evaluation includes hanging up if needed)
- **Personalization**: Individual learner context should inform interactions
- **Structure**: Conversations need predictable flow without feeling scripted

The solution involves layering multiple systems (character instructions, level-appropriate vocabulary, memory injection, real-time evaluation) rather than attempting to solve everything with a single prompt.

## Critical Assessment

While this case study provides valuable insights into Duolingo's approach, it's worth noting some limitations:

The article is promotional in nature and doesn't discuss failure modes, error rates, or quantitative measures of success. There's no discussion of how often the mid-call evaluations fail to catch problematic responses, or how frequently the memory system extracts incorrect or irrelevant facts.

The article also doesn't address latency considerations, which would be significant for real-time voice conversations with multiple LLM calls (question generation, response generation, mid-call evaluation) happening within a single interaction.

Additionally, there's no mention of which specific LLM provider powers the feature, model versioning strategies, or how they handle model updates that might affect Lily's behavior. These would be important operational considerations for a feature of this scale.

Despite these limitations, the case study provides a useful template for teams building character-based conversational AI with specific behavioral requirements. The multi-stage prompting approach, memory system design, and real-time evaluation patterns are all applicable techniques for similar production deployments.

## Conclusion

Duolingo's Video Call with Lily demonstrates that deploying LLMs for specialized educational applications requires significant engineering beyond basic API integration. The combination of structured prompting, multi-stage processing, persistent memory, and real-time evaluation creates a system that transforms general-purpose language models into targeted educational tools with consistent personality and appropriate pedagogical behavior. This case study offers practical insights for teams facing similar challenges in constraining and directing LLM behavior for domain-specific applications.