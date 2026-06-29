---
title: "AI-Powered Consent Education Tool for Preventing Gender-Based Violence"
slug: "ai-powered-consent-education-tool-for-preventing-gender-based-violence"
draft: false
llmopsTags:
  - "content-moderation"
  - "chatbot"
  - "healthcare"
  - "prompt-engineering"
  - "system-prompts"
  - "evals"
  - "postgresql"
  - "anthropic"
industryTags: "other"
company: "Override"
summary: "Override Labs developed \"Is This Okay?\" (ITO), a nonprofit AI chatbot designed to prevent sexual assault among high school-aged teenagers by providing judgment-free guidance on sexually ambiguous scenarios. The product uses Claude LLM with carefully designed system prompts incorporating motivational interviewing techniques, hard-coded risk classification rules, and safety guardrails to help primarily teenage boys reflect on consent boundaries without shame or indictment. Initial prototyping showed directional shifts toward more cautious decision-making in ambiguous situations, with users taking more time to reflect rather than proceeding confidently with potentially harmful physical actions."
link: "https://www.youtube.com/watch?v=P51t3JJCag8"
year: 2026
seo:
  title: "Override: AI-Powered Consent Education Tool for Preventing Gender-Based Violence - ZenML LLMOps Database"
  description: "Override Labs developed \"Is This Okay?\" (ITO), a nonprofit AI chatbot designed to prevent sexual assault among high school-aged teenagers by providing judgment-free guidance on sexually ambiguous scenarios. The product uses Claude LLM with carefully designed system prompts incorporating motivational interviewing techniques, hard-coded risk classification rules, and safety guardrails to help primarily teenage boys reflect on consent boundaries without shame or indictment. Initial prototyping showed directional shifts toward more cautious decision-making in ambiguous situations, with users taking more time to reflect rather than proceeding confidently with potentially harmful physical actions."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-consent-education-tool-for-preventing-gender-based-violence"
  ogTitle: "Override: AI-Powered Consent Education Tool for Preventing Gender-Based Violence - ZenML LLMOps Database"
  ogDescription: "Override Labs developed \"Is This Okay?\" (ITO), a nonprofit AI chatbot designed to prevent sexual assault among high school-aged teenagers by providing judgment-free guidance on sexually ambiguous scenarios. The product uses Claude LLM with carefully designed system prompts incorporating motivational interviewing techniques, hard-coded risk classification rules, and safety guardrails to help primarily teenage boys reflect on consent boundaries without shame or indictment. Initial prototyping showed directional shifts toward more cautious decision-making in ambiguous situations, with users taking more time to reflect rather than proceeding confidently with potentially harmful physical actions."
notion:
  pageId: "38ef8dff-2538-80be-8e66-cfd3898e3455"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-29T15:10:00.000Z"
  lastEditedTime: "2026-06-29T15:10:00.000Z"
  publishedAt: "2026-06-29T15:15:34Z"
---

## Overview

Override Labs is a nonprofit organization founded by Priya Nakra focused on building technology to prevent harm from gender-based violence. The flagship product, "Is This Okay?" (ITO), emerged from an incubator program funded by the Fund to Prevent Sexual Assault, with a specific charter to build digital tools for preventing sexual assault in the 15-19 year old demographic. The organization operates on the principle that AI and technology advancements have historically introduced disproportionate harm to women and children when companies rush to market without proper red teaming and safety considerations.

The core insight driving the product comes from statistics showing that 93% of juvenile sexual assault involves victims who know their perpetrator personally, suggesting that a significant portion of harm stems from confusion and ambiguous scenarios rather than purely malicious intent. The organization specifically targets teenage boys who are open to reflection and learning, acknowledging that the product is not designed to reach already radicalized individuals in spaces like the manosphere or red pill communities.

## Problem Discovery and Research Methodology

The discovery process involved innovative use of publicly available data and careful research design. Nakra scraped approximately 2,000 posts from teenager-focused subreddits including the teenager subreddit and dating advice communities to understand what questions teenagers were actually asking. This analysis revealed substantial volumes of consent-related and coercion-related questions, validating that teenagers actively seek guidance on these sensitive topics in anonymous online forums.

Working with a licensed therapist who specializes in treating young men with problematic sexual behaviors, the team developed an evaluation rubric and designed early product validation studies. These studies involved recruiting 18-year-old males to assess their level of consent education, present them with ambiguous scenarios, measure their confidence in proceeding physically, and then observe attitude shifts after using the tool. While these studies were explicitly positioned as directional rather than definitive, they showed promising shifts toward more cautious decision-making and increased reflection before taking physical action.

Additional guidance came from positive masculinity coaches who work with young men who feel they have been "canceled" or isolated due to incidents. This input proved crucial for calibrating the product's tone and approach, ensuring it remained inviting rather than indicting.

## LLM Architecture and Technical Implementation

The technical architecture is deliberately simple and focused, avoiding more complex AI patterns in favor of reliability and safety. The product does not use agents, model context protocol, or retrieval augmented generation. Instead, it relies on a straightforward pipeline with deterministic safety rules preceding any LLM invocation.

The core flow begins with narrative collection through a free-text interface. Before Claude is ever called, the system applies hard-coded, deterministic risk classification rules. The backend uses Supabase to store modular functions including the system prompts. The risk classification function examines multiple factors including whether alcohol or drugs are involved, whether there is an age gap between parties, whether power imbalances exist, and what stage of physical interaction has occurred. These factors, identified with guidance from public health professionals, are the standard questions that would be asked in any clinical assessment of consent.

The risk classification results in either "red flag" or "yellow flag" categorizations. Notably, the system was deliberately designed never to provide a "green flag" or explicit permission to proceed. Even in neutral scenarios, responses include substantial disclaimer language about communication, consent principles, and checking in with the other person.

Once risk is classified deterministically, Claude is invoked with a structured prompt that includes the full situation context, the risk tier, and specific guidance on the desired response structure and tone. If users have follow-up questions, these hit a different function that maintains conversation context while continuing to apply safety constraints.

## Prompt Engineering and Therapeutic Techniques

A central innovation involves incorporating motivational interviewing techniques from clinical therapy into the system prompts. Motivational interviewing is specifically designed for non-judgmental, empathetic communication around ambiguous or ambivalent feelings. The approach emphasizes three core principles: demonstrating a collaborative partnership, showing acceptance of the situation without being unconditionally permissive, and evoking reflection and thoughtful next steps.

Most responses follow a three-part structure: validating what was heard from the user, describing what the other person involved might be feeling without engaging in problematic AI impersonation, and suggesting self-reflection rather than concrete actions. The goal is consistently to prompt pause and consideration rather than to provide directive advice.

The tone was carefully calibrated to match "your friend's older brother" - someone who is wise and slightly more experienced but still relatable because they were once in similar situations. This framing emerged from analyzing what made certain Reddit moderators effective in these communities and attempting to replicate that balance of validation and guidance.

## Safety Architecture and Guardrails

Safety was treated as the paramount concern from the beginning, with Nakra explicitly starting with a "South Star" - the worst-case scenario to avoid at all costs, which is someone using the tool to cause harm or justify harmful behavior. All design decisions flowed from preventing this outcome.

An early iteration included a "red flag list" of degrading language about women that would immediately stop the conversation and correct the user. However, feedback from masculinity coaches led to a crucial revision: immediately shutting down the conversation would prevent users from opening up and continuing to engage. The revised approach still identifies degrading language but responds by asking questions like "What do you want out of this relationship?" or "What does this person mean to you?" to humanize the other person and redirect the conversation without being punitive.

The evaluation framework, developed with clinical advisor input, examines multiple dimensions including situational assessment, risk assessment, safety severity, and tone. Olivia Rolley, serving as AI advisor and board member, helped design the evaluation approach and safety rubric, bringing experience from consumer AI development at companies like Netflix.

The product uses the 2,000 scraped Reddit posts as evaluation datasets, combining these real-world examples with clinical guidance to create comprehensive test scenarios spanning the range of possible conversations. The evaluation process assesses not just whether responses are technically correct but whether they successfully bring users along in understanding rather than simply delivering judgments.

## Privacy-First Design

Given the sensitive nature of the content, Override Labs implemented privacy-by-design principles from the outset. The product requires no account creation, logs no IP addresses, collects no personally identifiable information, and uses only session IDs to maintain conversation coherence within a single interaction. Conversations are not linked across sessions, intentionally preventing the system from building long-term user profiles.

This approach stands in stark contrast to commercial LLM products where persistent user identity and comprehensive data collection are fundamental to the business model. The privacy architecture actually provides product benefits: eliminating login friction increases likelihood that users will try the tool in moments of uncertainty, and the lack of persistent tracking signals to users that their sensitive questions will not follow them.

The privacy-first approach did create marketing challenges. Meta advertising platforms were unavailable because they require pixel tracking and cookie consent banners, which Nakra viewed as antithetical to the trust needed for this use case. Instead, advertising focused on platforms like Reddit, Snapchat, and TikTok where targeting could be accomplished through interest-based and demographic approaches without invasive tracking.

## User Experience and Interaction Design

The interface is deliberately minimal to reduce friction and cognitive load. The assumption is that users may be in distressed, spiraling, or even intoxicated states when they access the tool. Every design decision prioritized straightforward interaction without excessive navigation, carousels, or visual complexity that might interrupt the user's need to share their situation.

The default experience begins with free text input, though a guided mode exists for users who prefer more structure. In practice, most users opt for free text, suggesting comfort with the chat interface paradigm that has become familiar through consumer AI products. Suggestion chips below the text input help orient users to the types of scenarios the tool addresses.

Based on the content of the free text submission, the system dynamically asks "safety floor questions" about factors like intoxication, age differences, and power imbalances. This adaptive questioning feels conversational while ensuring the risk classification has necessary information.

## Evaluation Challenges and Prevention Metrics

One of the most complex aspects of the project involves measuring effectiveness. Unlike traditional product development where success metrics involve growth, engagement, or revenue, prevention work measures the absence of something - in this case, the absence of assault. This fundamentally changes what success looks like and dramatically extends the timeline for meaningful measurement.

The team conducted directional usability studies showing attitude shifts after product interaction, but Nakra and Rolley both acknowledge these are proxies at best. True measurement requires longitudinal studies tracking the same users over multiple months to observe whether they return to the product organically, whether they recommend it to peers, and ultimately whether behavior change occurs in real-world scenarios.

The prevention field operates on a fundamentally different philosophy than Silicon Valley product management. Rather than seeking to build the definitive solution that captures maximum market share, prevention work recognizes that every intervention helps and that comprehensive prevention requires an ecosystem of complementary approaches. As Nakra notes, the goal is to be "a prevention solution" rather than "the prevention solution."

## Product Ecosystem and Distribution Strategy

While ITO for teenage boys was the initial wedge product, Override Labs is developing a broader prevention platform. A parallel product targets young women to help them recognize coercive or emotionally manipulative relationships earlier. The same underlying engine and evaluation framework can be adapted across these different personas and use cases.

Recognizing that direct advertising to teenagers presents challenges, the team developed creative distribution approaches including a web-based game featuring simulated text message scenarios. Users select a friend avatar and navigate group chat or one-on-one text scenarios where the friend experiences ambiguous sexual or dating situations. The game creates reflection moments and ultimately directs users to the ITO homepage if they begin considering their own scenarios. This gamification provides higher click-through rates than directly promoting a "consent reflection tool."

Longer-term sustainability models focus on institutional licensing rather than consumer monetization. Potential customers include schools, youth-serving organizations, college campuses, Greek life programs, sports teams, and corporate environments. The consumer product remains free to end users while institutions pay for integration, API access, or proactive messaging capabilities on their platforms.

## Technical Stack and Development Economics

The product demonstrates how AI has changed the economics of software development for social good applications. As a solo founder with advisors rather than a full engineering team, Nakra built a functional product that would have required millions of dollars and years of development in traditional software paradigms. The ability to leverage Claude through API calls with carefully designed prompts and lightweight infrastructure allowed rapid iteration and deployment without massive capital requirements.

The technical simplicity is a feature rather than a limitation. By avoiding complex multi-agent systems, extensive orchestration, or sophisticated RAG implementations, the product remains maintainable, auditable, and easier to evaluate for safety properties. The deterministic risk classification layer ensures critical safety logic is not delegated to the unpredictability of LLM reasoning.

## Organizational Model and Funding

Override Labs operates as a nonprofit, initially supported by an incubator program modeled on Y Combinator but focused on philanthropic causes. The incubator included a demo day where family foundations and donor-advised funds could offer grant funding. Ongoing funding strategy involves applying to grant programs and open calls specifically focused on prevention work and technology for social good.

The organizational structure includes Nakra as founder and product lead, Rolley as AI advisor and board member, a clinical advisor specializing in problematic sexual behaviors, and guidance from public health professionals at the funding organization. This multidisciplinary team ensures technical decisions are informed by clinical expertise and prevention research rather than purely engineering considerations.

## Broader Implications for AI and Social Good

The case study illustrates several important principles for deploying LLMs in sensitive domains. First, the integration of domain expertise from clinicians, therapists, and public health professionals proves essential for appropriate prompt design and evaluation criteria. Second, privacy-first architecture can be both ethically necessary and functionally beneficial in building user trust. Third, simpler technical architectures with deterministic safety layers may be more appropriate than complex agent-based systems when stakes are high and transparency is critical.

The project also demonstrates how AI is enabling a new category of software focused on social benefit rather than profit maximization. Historically, software development costs limited creation to problems that supported strong business models. Lower barriers to development through LLM APIs and modern infrastructure enable individuals and small teams to address important social problems that may never generate commercial returns but create meaningful community benefit.

The deliberate decision to build slowly with extensive safety consideration stands in contrast to the "move fast and break things" ethos of commercial AI development. While Override Labs benefits from not having revenue targets or investor pressure, the approach provides an important counterexample to the assumption that AI deployment must prioritize speed to market above safety and efficacy validation.
