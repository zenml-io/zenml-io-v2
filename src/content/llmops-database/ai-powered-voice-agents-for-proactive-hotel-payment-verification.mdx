---
title: "AI-Powered Voice Agents for Proactive Hotel Payment Verification"
slug: "ai-powered-voice-agents-for-proactive-hotel-payment-verification"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "693161c384b3a8c94f50788a"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:32:55.928Z"
  createdOn: "2025-12-04T10:26:11.995Z"
llmopsTags:
  - "customer-support"
  - "realtime-application"
  - "chatbot"
  - "prompt-engineering"
  - "agent-based"
  - "error-handling"
  - "few-shot"
  - "evals"
  - "human-in-the-loop"
  - "latency-optimization"
  - "multi-agent-systems"
  - "fastapi"
  - "monitoring"
  - "documentation"
  - "openai"
  - "microsoft-azure"
industryTags: "tech"
company: "Perk"
summary: "Perk, a business travel management platform, faced a critical problem where virtual credit cards sent to hotels sometimes weren't charged before guest arrival, leading to catastrophic check-in experiences for exhausted travelers. To prevent this, their customer care team was making approximately 10,000 proactive phone calls per week to hotels. The team built an AI voice agent system that autonomously calls hotels to verify and request payment processing. Starting with a rapid prototype using Make.com, they iterated through extensive prompt engineering, call structure refinement, and comprehensive evaluation frameworks. The solution now successfully handles tens of thousands of calls weekly across multiple languages (English, German), matching or exceeding human performance while dramatically reducing manual workload and uncovering additional operational insights through systematic call classification."
link: "https://www.youtube.com/watch?v=TEC595J6EyE"
year: 2025
seo:
  title: "Perk: AI-Powered Voice Agents for Proactive Hotel Payment Verification - ZenML LLMOps Database"
  description: "Perk, a business travel management platform, faced a critical problem where virtual credit cards sent to hotels sometimes weren't charged before guest arrival, leading to catastrophic check-in experiences for exhausted travelers. To prevent this, their customer care team was making approximately 10,000 proactive phone calls per week to hotels. The team built an AI voice agent system that autonomously calls hotels to verify and request payment processing. Starting with a rapid prototype using Make.com, they iterated through extensive prompt engineering, call structure refinement, and comprehensive evaluation frameworks. The solution now successfully handles tens of thousands of calls weekly across multiple languages (English, German), matching or exceeding human performance while dramatically reducing manual workload and uncovering additional operational insights through systematic call classification."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-voice-agents-for-proactive-hotel-payment-verification"
  ogTitle: "Perk: AI-Powered Voice Agents for Proactive Hotel Payment Verification - ZenML LLMOps Database"
  ogDescription: "Perk, a business travel management platform, faced a critical problem where virtual credit cards sent to hotels sometimes weren't charged before guest arrival, leading to catastrophic check-in experiences for exhausted travelers. To prevent this, their customer care team was making approximately 10,000 proactive phone calls per week to hotels. The team built an AI voice agent system that autonomously calls hotels to verify and request payment processing. Starting with a rapid prototype using Make.com, they iterated through extensive prompt engineering, call structure refinement, and comprehensive evaluation frameworks. The solution now successfully handles tens of thousands of calls weekly across multiple languages (English, German), matching or exceeding human performance while dramatically reducing manual workload and uncovering additional operational insights through systematic call classification."
---

## Overview

Perk is a business travel management platform with a distinctive value proposition: business travelers can book accommodations without using personal credit cards, as Perk handles payment directly through virtual credit cards (VCCs) or credit lines. The company's mission centers on eliminating "shadow work"—the non-core tasks that consume approximately seven hours per week per person across organizations.

The case study focuses on solving a high-impact but relatively infrequent problem: hotels sometimes fail to note or charge the virtual credit cards Perk sends them. While the process generally works well, when it fails, travelers arrive after exhausting journeys to find their rooms unpaid or even released. This represents one of the most painful possible customer experiences, directly undermining Perk's core value proposition.

To proactively prevent these scenarios, Perk's customer care team was making approximately 10,000 calls per week to hotels within 48 hours of guest check-in, verifying that VCCs had been received and requesting immediate payment processing. The team recognized this as an ideal candidate for AI automation and built a voice agent system that now handles tens of thousands of calls weekly across multiple languages.

## Initial Exploration and Prototyping

The journey began approximately two years before production deployment when the team experimented with voice AI technologies. Philip, a senior software engineer, recalls seeing a Google demonstration about six or seven years prior showing an AI assistant booking appointments, which planted the seed for voice automation. When ChatGPT and OpenAI's capabilities exploded around two years ago, the team began experimenting with connecting OpenAI's language models to text-to-speech services like ElevenLabs and Deepgram, creating proof-of-concept demonstrations like booking breakfast additions to hotel reservations.

This early experimentation proved crucial when the virtual credit card problem surfaced during road mapping sessions with Steve (Product Manager) and Gabby (Engineering Manager). The team immediately recognized the connection between their experimental voice technology and this real production problem. As Gabby noted, the technology had evolved significantly over those two years in terms of reasoning capability, speed, and latency, making it viable for actual production use.

The initial prototype was developed during an AI workshop and hackathon for non-technical employees. Within approximately one to one-and-a-half weeks, the team had a working prototype built entirely on Make.com, a no-code workflow automation platform. This approach was deliberately chosen to accelerate development without requiring backend engineering changes or code deployment to production systems.

## Technical Architecture and Integration Approach

The Make.com workflow integrated multiple systems and services:

- **Data Source**: The system connected to Perk's Zendesk instance, which contained tickets directing customer care agents which hotels to call. These tickets included all necessary information: phone numbers, hotel details, guest names, and authorization forms for virtual credit cards.

- **Information Extraction**: The workflow used regular expressions to parse and extract structured data from tickets, including phone numbers, guest names, and credit card information.

- **Voice Infrastructure**: Initially using ElevenLabs for text-to-speech and integrating with Twilio (Perk's existing telephony provider) to place actual calls.

- **LLM Integration**: OpenAI's models powered the conversational intelligence, understanding responses and generating appropriate dialogue.

This architecture's key advantage was that it operated completely external to Perk's core platform, essentially replicating human agent workflows without requiring code changes or infrastructure deployment. As Gabby emphasized, they created what amounted to an automation workflow using AI where needed rather than simply "putting AI on everything."

## Prompt Engineering and Conversation Design Evolution

The team's journey through prompt engineering and conversation design reveals important lessons about production LLM deployment:

### Initial Single-Agent Approach

The first iteration used a single comprehensive prompt giving the AI agent its complete mission with general guidelines. Internal testing quickly revealed this approach had poor reliability and success rates. The agent was too unconstrained, leading to unpredictable behavior and frequent failures.

One memorable example: when the team gave the agent a role as "an experienced travel agent," it took this too literally and began believing it could change bookings, cancel reservations, and exercise authority beyond its intended scope. The team learned that narrowing scope and being extremely specific about permitted actions was critical.

### Structured Multi-Stage Approach

The breakthrough came from breaking the call into distinct moments or stages, each with its own focused prompt:

- **IVR Navigation**: A specialized agent solely responsible for navigating interactive voice response systems (pressing appropriate numbers, selecting menu options).

- **Booking Confirmation**: Verifying the hotel was discussing the correct reservation by confirming guest name, dates, and booking reference.

- **Payment Engagement**: The core mission of confirming the VCC was received and requesting it be charged.

- **Call Termination**: Properly ending the conversation.

Each stage maintained context from previous stages to ensure conversational coherence while having narrowly defined responsibilities. This structural approach dramatically improved reliability and success rates.

### Text-to-Speech Challenges

The team encountered surprising challenges with voice rendering that text-based LLM work doesn't face:

- **Number Pronunciation**: Seven-digit booking reference numbers would be read as "eight million, seven hundred forty-seven thousand..." rather than individual digits. The team learned about text-to-speech markup language and implemented spacing between characters and numbers.

- **Language Conventions**: They learned to use conventions like saying "O" instead of "zero" for English speakers.

- **Verbosity Control**: Early versions were extremely verbose, repeating guest names and information multiple times, creating painful call experiences.

- **Pacing**: Calls could be too fast for hotel staff to follow or get stuck in repetitive loops.

These were addressed through extensive prompt iteration and markup language specifications.

### Handling Edge Cases and Off-Ramps

Initial prompts were too mission-focused, creating what the team humorously described as a "Karen" personality—the AI would persistently demand to speak to managers if the initial contact couldn't help. The team had to build in appropriate "off-ramps" for scenarios where the objective genuinely couldn't be completed, allowing graceful conversation termination rather than aggressive persistence.

## Evaluation and Quality Assurance Framework

The evaluation approach demonstrates sophisticated LLMOps practice, evolving through multiple iterations:

### Early Manual Evaluation

In the earliest phase with Make.com prototypes, Steve and Gabby would literally sit in a room watching transcripts appear slowly on a screen, unable to even hear the call, just seeing text output. They would manually assess each call, noting failures and patterns.

As call volume increased to handfuls per day, the entire team would listen to every single call, maintaining a Google spreadsheet with detailed annotations about what went right, wrong, and why. This manual phase was crucial for understanding the problem space, identifying failure modes, and building intuition about conversation dynamics.

### Classification Evaluation

The team developed success criteria in collaboration with their accommodations team, identifying three primary success outcomes:

- Hotel agrees to charge the VCC immediately during the call
- Hotel commits to charging at guest arrival
- Hotel commits to charging at guest checkout

They also cataloged numerous failure scenarios: random disconnections, inability to navigate IVR, hotel staff not understanding the request, call getting stuck in loops, and more.

Using this taxonomy, they built an LLM-based classifier that evaluates call transcripts and assigns outcomes. Critically, they created a ground truth dataset from their manually labeled calls, allowing them to run evaluations against known correct classifications whenever they modified prompts or logic.

The classification evaluation initially was extremely strict—only accepting exact phrasings as success. Through iteration and examining false negatives, they learned to recognize natural language variations. For example, "Yeah, I'm on that for you, don't worry about it" should register as success, as should "We'll charge it tomorrow" when tomorrow is the check-in date.

A significant evolution was moving from single-reason classification to multi-reason classification. The team discovered that multiple failure modes could occur in a single call (stuck in IVR AND hotel said they won't charge VCC). Version 2 of their classifier uses multiple flags for different aspects of the call rather than forcing selection of a single reason.

### Behavioral Evaluation

Beyond success/failure classification, the team implemented behavioral evaluation using LLM-as-judge approaches. For every call, they evaluate:

- **Politeness**: Is the agent courteous and professional?
- **Proper Introduction**: Does it introduce itself and Perk appropriately?
- **Repetition**: Is it getting stuck in loops repeating the same information?
- **Abrupt Termination**: Does it hang up mid-conversation without proper closure?
- **Frustration Generation**: Is the interaction frustrating for the human?

Each dimension receives scores that are tracked over time as metrics. This allowed the team to detect when prompt changes inadvertently degraded behavioral quality. In one instance, they made a small change that increased repetitive behavior, caught it in the metrics, and rolled back the change.

### Production Monitoring and Sampling

Even with automated evaluations, the team continues regular sampling of actual calls. They recognize that non-deterministic natural language behavior cannot be fully captured by any dataset, no matter how comprehensive. After deploying changes, they continue listening to sample calls to catch edge cases and unanticipated behaviors.

They maintain a Slack channel where every call initially posted outcomes, allowing daily team review sessions. At scale with tens of thousands of calls weekly, they focus on failure cases, reviewing samples to understand what went wrong and whether it represents a pattern requiring prompt iteration.

### Ground Truth Evolution

The team recognizes their ground truth dataset must evolve. As they encounter new samples and edge cases not covered by existing data, they add them to maintain evaluation coverage of the actual production distribution.

Philip notes the balance between automated evaluation (fast feedback loops for iteration) and human sampling (catching what automated systems miss). The evaluations build confidence for deployment but don't replace human judgment entirely.

## Production Deployment and Scaling

The production deployment strategy was notably pragmatic:

### Gradual Rollout

Rather than a big-bang launch, the team gradually increased call volume. They started with a few calls per day, then dozens, then hundreds, eventually scaling to thousands. This gradual approach allowed them to maintain quality oversight and catch issues before they affected large volumes.

The Make.com workflow's ticket-reading approach made this easy to control—they could simply adjust how many Zendesk tickets the workflow processed, effectively throttling call volume while monitoring quality.

### Multi-Language Expansion

After validating in the US and Canada (English), they expanded to the UK (also English), then Germany (their largest international market). The Germany expansion revealed an important technical insight: they initially kept prompts in English while having the AI speak German. Data quality suffered significantly. When they translated prompts to German with help from a data engineer, results improved dramatically. The team hypothesized that the LLM was translating English prompts to German, generating responses, then translating back to English, losing nuance and accuracy in the process. This learning established a principle: prompts should be in the native language of the desired output.

Spanish is now in the roadmap, with potential for many more languages given Perk's European customer base.

### Infrastructure Migration

While the system launched to production using Make.com, the team is now migrating most functionality to their own infrastructure. However, they note that the Make.com "prototype" effectively became the production system and served them well at scale. The migration appears driven by long-term infrastructure control and integration needs rather than Make.com's inability to handle the load.

## Outcomes and Impact

### Quantitative Results

- **Call Volume**: System now handles over 10,000 calls per week (matching the volume previously requiring an entire customer care team)
- **Language Coverage**: Operating in multiple languages (English, German, with Spanish forthcoming)
- **Success Rate**: Matching or exceeding human agent performance
- **North Star Metric**: Reduced the number of customers experiencing check-in problems due to unpaid rooms

### Qualitative Benefits

Steve emphasizes the scale advantage: the AI can make far more calls than the overwhelmed customer care team could. Importantly, Perk didn't have customer care teams of sufficient size in many international markets (Germany, Spain, Sweden, France), so the AI enabled proactive outreach that was previously impossible.

Perhaps unexpectedly, the system generates valuable operational data. By systematically classifying every call, Perk now has rich data about failure modes in their payment process: hotels that didn't receive VCCs, hotels that don't accept virtual credit cards, and other process breakdowns they weren't aware of. This data is driving a roadmap of future improvements to address root causes.

### Team and Organizational Impact

The success created immediate internal demand. Steve reports that the day they announced the initial release (handling about 500 calls per week at that point), his Slack filled with messages from teams across the company saying "We have this other problem where half the team is calling places all day." The solution found clear product-market fit internally, with expanding use cases planned for the next year.

## Key Lessons and LLMOps Insights

### Rapid Prototyping with No-Code Tools

The Make.com approach allowed the team to build, iterate, and even deploy to production without traditional software development cycles. This dramatically accelerated learning and time-to-value. The ability to connect to existing systems (Zendesk, Twilio) and orchestrate complex workflows visually was crucial for early experimentation.

### Importance of Narrowing Scope

A consistent theme throughout the case study is the need to constrain AI agent behavior. Single, broad prompts failed reliably. Breaking tasks into focused stages with specific responsibilities dramatically improved performance. This aligns with broader LLMOps best practices around task decomposition.

### Evaluation as a Practice, Not a Phase

The team's evaluation approach evolved from manual review to automated classification to behavioral scoring, but never eliminated human sampling. They treat evaluation as an ongoing practice that enables confident iteration rather than a one-time validation checkpoint. The ground truth dataset evolves with production experience, and metrics are monitored continuously to detect degradation.

Philip's journey—learning about evaluations through trial, error, and suffering pain—illustrates that rigorous, data-driven iteration separates successful LLM products from failed experiments. The team's daily practice of reviewing metrics, examining failures, and sampling calls embodies the scientific mindset required for production LLM systems.

### Multimodal and Real-Time Challenges

Voice AI introduces challenges beyond text-based systems: pronunciation, pacing, latency, and the unforgiving nature of real-time human conversation. The team had to learn text-to-speech markup language and iterate on voice rendering in ways that wouldn't occur with text applications. Interestingly, they report that latency hasn't been a significant problem with current model speeds—the technology has evolved to handle real-time conversation adequately.

### Language and Localization

The team's learning about keeping prompts in native languages rather than English reveals an important technical consideration for multilingual deployments. The hypothesis about translation overhead degrading performance should inform architecture decisions for global products.

### Balancing Automation and Human Judgment

Despite sophisticated automation, the team maintains human oversight through sampling and maintains multiple evaluation approaches (classification, behavioral, manual review). They recognize the limitations of any single evaluation method and use a portfolio approach to maintain quality confidence.

### Product-Market Fit Within Organizations

The rapid internal demand for similar solutions after the initial launch suggests that voice AI agents for routine but voluminous calling tasks represent a significant opportunity across many business functions. The "shadow work" framing is apt—these are tasks that must be done but don't represent core value creation, making them ideal automation candidates.

## Technical Stack Summary

While the full production stack is evolving, the key components include:

- **LLM**: OpenAI models for language understanding and generation
- **Voice Synthesis**: Initially ElevenLabs, though current provider may have changed
- **Telephony**: Twilio for call placement and management
- **Workflow Orchestration**: Make.com (transitioning to custom infrastructure)
- **Data Systems**: Zendesk for task management and data extraction
- **Monitoring**: Custom dashboards tracking success rates, behavioral metrics, and failure patterns
- **Evaluation**: Custom LLM-based classification and behavioral scoring against ground truth datasets

## Future Directions

The team is focused on:

- **Language Expansion**: Adding Spanish and eventually other European languages
- **Success Rate Improvement**: Particularly around IVR navigation, which remains a challenge
- **New Use Cases**: Applying the voice agent framework to other high-volume calling scenarios across the organization
- **Infrastructure Migration**: Moving from Make.com to owned infrastructure for long-term control and integration
- **Root Cause Resolution**: Using the operational data now available to fix underlying process issues causing payment failures

The case study represents a mature LLMOps implementation that moved from experimentation to production impact through disciplined iteration, comprehensive evaluation, and pragmatic technology choices that prioritized speed of learning over architectural purity.