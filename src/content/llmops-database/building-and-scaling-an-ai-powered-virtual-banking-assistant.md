---
title: "Building and Scaling an AI-Powered Virtual Banking Assistant"
slug: "building-and-scaling-an-ai-powered-virtual-banking-assistant"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "prompt-engineering"
  - "few-shot"
  - "error-handling"
  - "human-in-the-loop"
  - "latency-optimization"
  - "fastapi"
  - "monitoring"
  - "microsoft-azure"
industryTags: "finance"
company: "Virgin Money"
summary: "Virgin Money developed Ready, an AI-powered virtual assistant for conversational banking, starting with a credit card service problem in 2023. The team began with basic FAQ bot functionality and gradually evolved through 2024 and 2025, adding API connectivity, proactive messaging, and contextual capabilities. Despite two failed attempts to deploy generative AI customer-facing in 2024 due to risk concerns and hallucination issues, they successfully pivoted to deploying generative AI internally for colleague support. By maintaining disciplined iteration, customer-focused design principles, and a cross-functional team structure, Virgin Money achieved the highest customer satisfaction scores in the bank, reduced live agent escalations by 25-33% across different banking services, and delivered enhancements every four working days on average throughout 2025."
link: "https://www.youtube.com/watch?v=WuhytMprzcc"
year: 2026
seo:
  title: "Virgin Money: Building and Scaling an AI-Powered Virtual Banking Assistant - ZenML LLMOps Database"
  description: "Virgin Money developed Ready, an AI-powered virtual assistant for conversational banking, starting with a credit card service problem in 2023. The team began with basic FAQ bot functionality and gradually evolved through 2024 and 2025, adding API connectivity, proactive messaging, and contextual capabilities. Despite two failed attempts to deploy generative AI customer-facing in 2024 due to risk concerns and hallucination issues, they successfully pivoted to deploying generative AI internally for colleague support. By maintaining disciplined iteration, customer-focused design principles, and a cross-functional team structure, Virgin Money achieved the highest customer satisfaction scores in the bank, reduced live agent escalations by 25-33% across different banking services, and delivered enhancements every four working days on average throughout 2025."
  canonical: "https://www.zenml.io/llmops-database/building-and-scaling-an-ai-powered-virtual-banking-assistant"
  ogTitle: "Virgin Money: Building and Scaling an AI-Powered Virtual Banking Assistant - ZenML LLMOps Database"
  ogDescription: "Virgin Money developed Ready, an AI-powered virtual assistant for conversational banking, starting with a credit card service problem in 2023. The team began with basic FAQ bot functionality and gradually evolved through 2024 and 2025, adding API connectivity, proactive messaging, and contextual capabilities. Despite two failed attempts to deploy generative AI customer-facing in 2024 due to risk concerns and hallucination issues, they successfully pivoted to deploying generative AI internally for colleague support. By maintaining disciplined iteration, customer-focused design principles, and a cross-functional team structure, Virgin Money achieved the highest customer satisfaction scores in the bank, reduced live agent escalations by 25-33% across different banking services, and delivered enhancements every four working days on average throughout 2025."
notion:
  pageId: "3b8f8dff-2538-8070-a743-d52231e3587f"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-10T15:15:00.000Z"
  lastEditedTime: "2026-08-10T15:15:00.000Z"
  publishedAt: "2026-08-10T15:22:53Z"
---

## Overview

Virgin Money embarked on a journey to build and scale Ready, an AI-powered virtual assistant for conversational banking. This case study represents a particularly honest account of building conversational AI in production at a financial services institution, including both successes and notable failures. The initiative began in early 2023 with a specific problem in their credit card business unit, where customers had a digital-only application process with no branch access. Rather than investing more heavily in mobile app development, the team experimented with chat as an alternative channel, ultimately developing this into a comprehensive conversational AI capability that scaled across the enterprise.

What makes this case study particularly valuable from an LLMOps perspective is the transparency around the iterative learning process, the pragmatic approach to deployment, and the realistic assessment of what worked and what didn't over a multi-year production deployment spanning 2023 through 2025. The team's willingness to pivot when generative AI proved unsuitable for customer-facing applications, and their success in deploying it internally instead, provides important lessons about risk management and graduated rollout strategies in regulated industries.

## Initial Problem and Approach

The genesis of Ready came from a business problem rather than a technology-first initiative. Virgin Money's credit card business operated as a digital-only channel, and the organization sought alternatives to simply building out more mobile app features. Within approximately eight weeks, they stood up a basic click-to-chat-to-human capability just to gather data on how customers would use chat differently compared to phone support or mobile apps.

From an LLMOps perspective, this data-gathering phase was foundational. The team assembled subject matter experts from the business rather than AI specialists initially, and focused on understanding actual usage patterns. This approach of starting with human chat to establish baselines before introducing automation is a sound production strategy that helped them understand the problem space before committing to specific technical solutions.

## Customer Research and Risk-Aware Design (Early 2023)

An important aspect of their early deployment strategy involved extensive customer research conducted in early 2023. The team held sessions with both customers and colleagues to understand existing AI usage patterns in personal life and expectations for AI in banking. The findings were sobering: customers at that time expressed minimal trust in AI for financial services, wanted only simple matters handled, and indicated they would double-check any AI-provided information by calling or requesting confirmation emails.

This customer feedback directly informed their LLMOps approach. Rather than pushing ahead with sophisticated capabilities, they deliberately kept the initial deployment to a very basic FAQ bot with conversational elements but limited topic coverage. This reflects mature thinking about production AI deployment in regulated, high-trust environments—building trust incrementally rather than over-promising capabilities that could erode confidence if they failed.

## Technical Foundation and Architecture

The team used Microsoft's conversational AI technology stack, though specific products are not detailed in the case study. Through 2023 and early 2024, they focused on building foundational technical capabilities including API connectivity to backend systems, proactive messaging functionality, and the ability for Ready to act on behalf of customers in limited circumstances.

From an LLMOps perspective, this layered approach to building production capabilities makes sense. Rather than attempting to deploy a fully-featured system immediately, they established integration patterns, messaging infrastructure, and limited transactional capabilities while continuously monitoring customer acceptance and trust levels. The API connectivity in particular represents critical infrastructure for any production conversational AI system—enabling the bot to access real customer data rather than forcing customers to provide information the bank already knows.

## Award Recognition and Scaling Challenges (Early 2024)

In early 2024, the credit card Ready bot won an award for best use of AI in financial services. This external validation dramatically changed the internal dynamics, bringing sudden executive attention after nearly a year of operating somewhat under the radar. The CEO and C-suite began asking what else was possible and what the roadmap looked like.

Critically, the team's response to this attention demonstrates mature LLMOps thinking. Rather than accelerating development to meet executive excitement, they deliberately paused to establish clear principles and guardrails. They defined their vision and operating principles, including commitments to not ask customers questions the system already knew answers to, maintaining conversational flow without loops, escalating to humans when appropriate, and establishing Ready as having its own persona as part of the team.

This pause to establish governance, design principles, and operational guidelines before scaling represents exactly the kind of disciplined approach that differentiates successful production LLMOps from experimental projects. The pressure to move fast with executive sponsorship can lead teams to cut corners on the foundational policies and processes that enable sustainable scaling.

## Migration and Enhancement (Mid-2024)

With principles established, the team began scaling Ready across different banking contexts. They had legacy keyword-matching bots that needed migration to the new conversational platform. They added deep links, contextual entry points based on whether customers arrived from browsers versus mobile apps, and leveraged advancing capabilities in the Microsoft platform.

The migration from keyword-matching to conversational AI yielded a 25% increase in containment rates—meaning more customer inquiries were successfully resolved without escalating to human agents. This represents a significant operational improvement and validates the value of the more sophisticated natural language understanding capabilities.

From a technical operations perspective, the team deliberately reduced the number of different tracks and components they had to maintain, govern, and update. This simplification of the technical estate while simultaneously improving conversational capabilities represents smart LLMOps practice—managing technical debt and operational complexity while delivering business value.

## Business Banking Deployment

The team also deployed Ready for business banking customers, which presented different challenges. Business banking involves significantly more complex customer types and query patterns. Importantly, business banking already had live chat with human agents operating on a different technical stack.

The LLMOps approach here was pragmatic: first migrate to the Microsoft stack to consolidate platforms, then deploy a simple FAQ bot without backend connectivity or transactional capabilities. Despite this basic functionality, they achieved a 33% reduction in escalations to live agents simply by handling straightforward informational queries conversationally.

This demonstrates an important LLMOps principle: production value doesn't always require sophisticated capabilities. A simple, well-designed bot that handles common simple queries effectively can deliver significant operational benefits and improve customer experience without the complexity and risk of more advanced integrations. The team explicitly called out that it doesn't always need to be an "all singing and all dancing bot"—understanding what customers actually need and deploying appropriately scoped solutions faster can be more valuable than over-engineering.

## Failed Generative AI Attempts and Strategic Pivot (2024)

Perhaps the most valuable LLMOps lessons in this case study come from candid discussion of failure. The team attempted twice during 2024 to deploy a generative AI customer-facing bot and failed both times. The reasons were twofold: the organization's risk appetite wasn't sufficient to accept the technology in customer-facing applications, and frankly the technology itself wasn't reliable enough for their standards. They observed hallucinations—instances where the AI generated incorrect or fabricated information—which is completely unacceptable in financial services contexts.

The decision to stop pursuing customer-facing generative AI and pivot to a different use case demonstrates mature production judgment. Rather than continuing to push against organizational risk constraints or accepting inadequate technology, they looked for alternative applications where the risk profile was more acceptable.

The successful pivot was to deploy generative AI internally for colleague support at the end of 2024. This provided conversational answers to help customer service colleagues handle customer-facing queries. As the first generative AI deployment of its kind within Virgin Money, this internal application serves multiple LLMOps purposes: it delivers value to colleagues handling customer interactions, it generates usage data and success stories to build internal confidence, and it allows the organization to gain production experience with generative AI in a more controlled risk environment before eventually moving to customer-facing applications.

This graduated approach to deploying increasingly powerful AI capabilities—starting with simple FAQ bots, progressing to API-connected conversational systems, and ultimately introducing generative AI in internal-facing applications before customer-facing ones—represents excellent LLMOps practice for regulated industries. The team explicitly noted their hope to have customer-facing generative AI sometime in the future based on data and confidence built from the internal deployment.

## Changing Customer Behavior Patterns

An interesting observation from production usage data is that contacts increased rather than decreased. This contradicts typical transformation program expectations where reducing contact volume is often a goal. Instead, customers appear to be using Ready more frequently as an "AI companion" or "intelligent partner" rather than traditional self-service.

This behavioral shift has important implications for LLMOps and how success should be measured. Rather than viewing increased interaction volume as negative, the team recognizes it reflects customers preferring conversational AI to traditional self-service options like menu navigation or FAQ pages. From an operations perspective, if these increased interactions are handled efficiently by the AI without human escalation, this represents successful deployment even with higher volume. This suggests that production metrics should focus on resolution quality, customer satisfaction, and containment rates rather than simply reducing interaction volume.

## Continuous Improvement and Peak Performance (2024-2025)

The original credit card Ready bot that won the award was already performing well—second highest in customer satisfaction scores across all of Virgin Money. However, the team continued enhancing it through 2024, applying learnings from other deployments, adding deep links, and upgrading the underlying technology platform. These enhancements resulted in Ready achieving the top customer satisfaction score in the entire bank.

This explicitly reinforces a critical LLMOps principle: launching the bot is when the work begins, not when it ends. Continuous enhancement, applying learnings, monitoring performance, and iterating based on data are essential for maintaining and improving production AI systems. The temptation in many organizations is to move teams onto new projects once something is "launched," but this case demonstrates the value of sustained investment in optimization.

## Team Structure and Velocity

Virgin Money's team structure and working model enabled remarkable velocity—delivering enhancements on average every four working days throughout 2025. With fewer than 30 people supporting the conversational AI capability, this pace required breaking down traditional role boundaries.

The case study uses the example of Gordon, a team member who speaks to customers and stakeholders, designs conversation journeys, documents requirements, builds implementations in the low-code platform, participates in four-eye testing checks, and defines training materials for contact center staff. Multiple team members developed this kind of end-to-end capability rather than remaining specialized in narrow roles.

From an LLMOps perspective, this cross-functional skill development addresses one of the key bottlenecks in production AI operations—handoffs between specialized teams. When individuals can carry work through multiple lifecycle stages, it eliminates coordination overhead, reduces misunderstandings from requirements translation, and enables much faster iteration cycles. The low-code nature of the platform enabled this by making implementation accessible to people without deep programming expertise.

This team structure reflects broader trends in successful LLMOps organizations: moving away from siloed specialists toward multi-skilled individuals who understand the full context from business need through implementation and operations. The ability to deliver every four working days suggests a highly effective continuous delivery pipeline with minimal friction in the development-to-deployment process.

## Testing and Quality Assurance

While not extensively detailed, the case study mentions four-eye checks with a testing team, indicating some level of validation process before deployment. Given the rapid delivery cadence and the financial services regulatory context, Virgin Money likely has automated testing as well as these manual checks, though specifics aren't provided.

The observation about hallucinations in the failed generative AI attempts suggests they had evaluation processes capable of detecting these failure modes. The decision to stop deployment based on quality concerns demonstrates that testing and evaluation criteria were being enforced rather than simply pushing ahead to meet deadlines.

## Risk Management and Governance

Throughout the case study, risk management emerges as a constant consideration without being explicitly detailed. The organization's insufficient risk appetite for customer-facing generative AI in 2024, the deliberate establishment of principles and guardrails when scaling, the choice to keep early bots simple based on customer trust concerns, and the escalation to humans when appropriate all reflect ongoing risk considerations.

For LLMOps in regulated industries like financial services, this risk management layer is essential but often under-discussed in case studies that focus purely on technical capabilities. Virgin Money's experience shows how production deployment timelines and architectural choices are heavily influenced by risk tolerance, regulatory concerns, and customer trust dynamics, not just technical feasibility.

## Technology Platform Choices

The case study mentions using Microsoft's conversational AI technology stack, with references to the platform evolving and offering new opportunities throughout 2024. The low-code nature of the platform was explicitly called out as enabling broader team participation in implementation.

While not providing extensive technical detail, this suggests they're likely using Microsoft Bot Framework, Azure AI services, or related conversational AI platforms. The ability to connect APIs, implement proactive messaging, handle contextual entry, and deploy both rule-based and more advanced conversational capabilities all align with Microsoft's enterprise conversational AI offerings.

The migration from legacy keyword-matching systems to the Microsoft platform represents a common LLMOps challenge—modernizing older conversational systems to take advantage of natural language understanding while maintaining continuity of service.

## Lessons for LLMOps Practice

Several key lessons emerge from Virgin Money's experience that apply broadly to LLMOps:

**Start with customer needs and build trust incrementally.** Their research-driven approach and willingness to deploy simpler capabilities than technically possible, based on customer comfort levels, reflects mature thinking about production AI in trust-sensitive contexts.

**Establish principles and guardrails before scaling.** The deliberate pause to define vision, principles, and operating guidelines when executive attention increased prevented scaling problems and established sustainable foundations.

**Be willing to pivot when technology or risk profiles don't align.** The failed generative AI attempts and successful pivot to internal deployment show the value of recognizing when to change course rather than forcing unsuitable technology into production.

**Continuous improvement after launch is essential.** The enhancement of already-successful bots to achieve peak performance demonstrates that production AI systems require ongoing investment and optimization.

**Cross-functional team structures enable velocity.** Breaking down role silos and developing multi-skilled team members eliminated handoff bottlenecks and enabled exceptional delivery pace.

**Simple solutions can deliver significant value.** The business banking bot with no backend connectivity still achieved 33% reduction in escalations, proving sophisticated capabilities aren't always necessary for production value.

**Measure success appropriately for conversational AI.** The increase in contact volume being viewed positively reflects understanding that conversational AI changes user behavior in ways that traditional metrics may not capture accurately.

## Critical Assessment

While this case study provides valuable insights, several claims warrant balanced assessment. The delivery velocity of every four working days on average is impressive but lacks context about the scope and complexity of these releases—they could range from minor content updates to significant feature additions. The customer satisfaction achievement, while certainly positive, doesn't provide enough detail about measurement methodology, sample sizes, or comparison contexts to fully evaluate.

The characterization that "technology is begging for us to go quicker" in the introduction seems at odds with the later admission that generative AI wasn't reliable enough for customer-facing deployment in 2024, suggesting the technology landscape is more uneven than initially claimed. The presentation has an element of self-promotion around the award and achievements, though the candid discussion of failures provides important balance.

The case study would benefit from more technical detail about architecture, specific Microsoft products used, evaluation methodologies for detecting issues like hallucinations, and the governance processes that support both rapid delivery and risk management. Nevertheless, the honest account of the journey, including failures and pivots, makes this a valuable LLMOps case study for understanding real-world production deployment of conversational AI in financial services.
