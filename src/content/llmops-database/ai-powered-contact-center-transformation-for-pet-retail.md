---
title: "AI-Powered Contact Center Transformation for Pet Retail"
slug: "ai-powered-contact-center-transformation-for-pet-retail"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69316376a9521dd1ca3abb7a"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:33:02.491Z"
  createdOn: "2025-12-04T10:33:26.340Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "classification"
  - "summarization"
  - "question-answering"
  - "poc"
  - "agent-based"
  - "prompt-engineering"
  - "semantic-search"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "evals"
  - "monitoring"
  - "api-gateway"
  - "orchestration"
  - "guardrails"
  - "scalability"
  - "databases"
  - "amazon-aws"
industryTags: "e-commerce"
company: "PetCo"
summary: "PetCo transformed its contact center operations serving over 10,000 daily customer interactions by implementing Amazon Connect with integrated AI capabilities. The company faced challenges balancing cost efficiency with customer satisfaction while managing 400 care team members handling everything from e-commerce inquiries to veterinary appointments across 1,500+ stores. By deploying call summaries, automated QA, AI-supported agent assistance, and generative AI-powered chatbots using Amazon Q and Connect, PetCo achieved reduced handle times, improved routing efficiency, and launched conversational self-service capabilities. The implementation emphasized starting with high-friction use cases like order status inquiries and grooming salon call routing, with plans to expand into conversational IVR and appointment booking through voice and chat interfaces."
link: "https://www.youtube.com/watch?v=xBEpKmrvYcI"
year: 2025
seo:
  title: "PetCo: AI-Powered Contact Center Transformation for Pet Retail - ZenML LLMOps Database"
  description: "PetCo transformed its contact center operations serving over 10,000 daily customer interactions by implementing Amazon Connect with integrated AI capabilities. The company faced challenges balancing cost efficiency with customer satisfaction while managing 400 care team members handling everything from e-commerce inquiries to veterinary appointments across 1,500+ stores. By deploying call summaries, automated QA, AI-supported agent assistance, and generative AI-powered chatbots using Amazon Q and Connect, PetCo achieved reduced handle times, improved routing efficiency, and launched conversational self-service capabilities. The implementation emphasized starting with high-friction use cases like order status inquiries and grooming salon call routing, with plans to expand into conversational IVR and appointment booking through voice and chat interfaces."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-contact-center-transformation-for-pet-retail"
  ogTitle: "PetCo: AI-Powered Contact Center Transformation for Pet Retail - ZenML LLMOps Database"
  ogDescription: "PetCo transformed its contact center operations serving over 10,000 daily customer interactions by implementing Amazon Connect with integrated AI capabilities. The company faced challenges balancing cost efficiency with customer satisfaction while managing 400 care team members handling everything from e-commerce inquiries to veterinary appointments across 1,500+ stores. By deploying call summaries, automated QA, AI-supported agent assistance, and generative AI-powered chatbots using Amazon Q and Connect, PetCo achieved reduced handle times, improved routing efficiency, and launched conversational self-service capabilities. The implementation emphasized starting with high-friction use cases like order status inquiries and grooming salon call routing, with plans to expand into conversational IVR and appointment booking through voice and chat interfaces."
---

## Overview

This case study documents PetCo's journey implementing AI and LLM-powered capabilities within their contact center operations using Amazon Connect as their primary platform. The presentation, delivered at AWS re:Invent 2024 by Connie Watkins from AWS and Travis Gelbrick from PetCo, provides detailed insights into how a major pet retailer with over 1,500 stores deployed production LLM systems to transform customer experience while managing operational costs. PetCo operates a contact center with approximately 400 care team members handling over 10,000 customer interactions daily, with roughly half of the volume related to e-commerce inquiries and the remainder covering store complaints, veterinary appointments, grooming bookings, and other services.

The context for this transformation is particularly interesting because pet-related customer service often involves highly emotional interactions. As Travis noted, customers consider their pets family members, which means issues around prescriptions, delayed deliveries of pet food, or other problems can generate intense emotional responses that require careful handling. This emotional dimension adds complexity to the AI deployment challenge, as the systems need to recognize when human intervention is necessary versus when automated assistance is appropriate.

## Business Strategy and Problem Definition

PetCo's approach to LLMOps emphasizes a critical principle that emerged strongly from the presentation: defining business outcomes before selecting technology solutions. Travis explicitly acknowledged that his team had sometimes gotten this backwards, getting excited about "shiny objects" in technology before clearly establishing what outcomes they wanted to achieve. The company structured their thinking around balancing cost efficiency with customer satisfaction by categorizing interactions based on potential impact on customer loyalty.

The framework distinguishes between low-impact interactions like simple order status inquiries, where AI-powered self-service is appropriate, versus high-impact conversations such as dealing with pet loss, high-lifetime-value customer retention, or premium membership cancellations where human interaction delivers more value. This segmentation strategy drives routing decisions and determines where to invest in AI versus human resources. This represents a thoughtful approach to LLMOps that goes beyond simply automating everything possible and instead focuses on optimizing for business value.

A key metric mentioned for measuring success involves looking at containment across the entire customer journey rather than just individual interactions. If a customer chats and then calls 30 minutes later, PetCo considers whether the initial interaction was truly successful or if there's an underlying issue to address. This holistic view of customer journey effectiveness represents a more sophisticated approach to measuring AI system performance than simple per-interaction metrics.

## Technology Architecture and Platform Strategy

PetCo made a strategic decision to consolidate on Amazon Connect as their unified platform rather than maintaining five or more disparate applications stitched together. This architectural choice has significant implications for their LLMOps approach. By having phone, IVR, chat, transcripts, and analytics all running through a single platform with native integrations, PetCo avoids the complexity of managing multiple integration points and can more easily extract insights across channels.

Travis emphasized three criteria for their technology selection: fewer integrations to reduce management overhead and free up finite resources, an aggressive roadmap that keeps pace with AI advances, and enterprise-grade capabilities for scale and data protection. The native integration between Amazon Connect and Contact Lens for conversation analytics proved particularly valuable, allowing them to access transcripts and insights without complex data extraction processes.

The speed of implementation that Amazon Connect enabled was highlighted through two specific examples. First, PetCo piloted routing grooming salon calls to the contact center. Previously, groomers had to stop grooming pets to answer phones at individual salons, creating operational inefficiency. The IT team built an IVR to route these calls from six grooming salons to the contact center within weeks rather than months. Second, for veterinary hospitals where callback requests were getting routed to agents who simply transferred them back to the hospital with no value added, the team rapidly built an IVR solution to handle this more efficiently. These examples demonstrate how the platform's flexibility enabled rapid iteration, which is essential for effective LLMOps.

## LLM-Powered Features in Production

PetCo deployed multiple AI and LLM-powered capabilities in production, each addressing specific operational challenges:

**Call Summarization**: Amazon Connect's AI-generated call summaries automatically create concise paragraphs capturing key information from customer interactions. These summaries are inserted directly into case notes, reducing handle time for agents. Beyond efficiency gains, the summaries provide significant value for supervisors and quality teams who can quickly understand customer situations without reading full transcripts. This represents a practical application of LLMs that delivers immediate operational value while also improving downstream processes like case management and knowledge extraction.

**Automated Quality Assurance**: Moving beyond traditional sampling-based QA where coaches review a small fraction of calls, PetCo implemented automated QA rules that evaluate every single interaction. A specific example mentioned was creating a rule to flag when agents put customers on hold for two minutes or more, as data showed this correlated with degraded customer satisfaction scores. This complete coverage enabled by AI allows the organization to identify patterns and coaching opportunities that would be impossible to detect with manual sampling. The system displays agent performance relative to team averages and overall contact center averages, providing context for supervisors to prioritize coaching interventions.

**AI-Supported Agent Assistance**: Rather than requiring agents to manually search for and open knowledge articles, PetCo is implementing capabilities where Amazon Connect and Q in Connect automatically surface relevant information based on the ongoing conversation transcript. The system can pop up a paragraph with an answer directly relevant to what the customer is discussing, reducing the cognitive load on agents and improving response accuracy and speed. Travis indicated they believe they're "just scratching the surface" with this capability and see significant potential for expansion.

**Generative AI Chatbot**: In early November (approximately one month before the presentation), PetCo launched chat on Amazon Connect incorporating a chatbot built using Amazon Lex flows for approximately four high-frequency use cases like order status inquiries. They loaded 20 knowledge base articles into what was then called Amazon Q and Connect (now Amazon Q in Connect) to provide generative AI-powered responses to customer questions. This represents a relatively cautious initial deployment with plans to expand the knowledge base significantly. Travis was candid about lessons learned, noting they thought they had covered all the utterances but discovered gaps once the system went live, requiring ongoing tuning and addition of new utterances in real time.

**IVR Self-Service**: Working with their partner Pronetics, PetCo implemented order status capabilities in their IVR that can match caller ID to existing orders and proactively ask if that's what the customer is calling about. If confirmed, the system reads back the order information and only escalates to an agent if the customer still needs help after hearing the status. This represents a straightforward but effective application of AI to deflect routine inquiries while maintaining the option for human assistance.

**Conversational IVR (Planned)**: PetCo is in business requirements phase for implementing conversational IVR, which they view as transformative for both customer experience and routing intelligence. The conversational approach will make it easier for customers to naturally explain their needs rather than navigating menu trees, while also enabling the system to pull information from their CRM to enable smarter routing decisions based on customer context.

## Data and Knowledge Management Challenges

A recurring theme throughout the presentation was the critical importance of data quality and knowledge content management for successful LLM deployment. Both Connie and Travis emphasized that "bad data in equals bad data out." Travis shared that his team spent significant time with Amazon working on formatting the initial knowledge articles correctly for AI consumption, which differed from how articles were formatted for human agents.

The challenge of knowledge base readiness emerged as one of the most significant barriers to successful AI implementation. Many organizations discover that their knowledge content is outdated, inconsistent, or scattered across silos when they attempt to deploy generative AI. Travis mentioned examples of finding articles that hadn't been updated since 2021, which would lead to poor customer experiences if surfaced by AI systems. This highlights an often-underestimated aspect of LLMOps: the significant content operations work required to prepare, structure, and maintain the knowledge foundation that LLMs draw upon.

PetCo is on an ongoing journey learning how article formatting and content impacts AI outcomes both for direct customer-facing chatbots and for agent assistance features. This iterative refinement of knowledge content based on observing AI system performance in production represents a key operational practice for successful LLMOps. The presentation emphasized designing around outcomes first, then organizing data and business logic to support those outcomes, rather than letting existing data structures constrain what's possible.

## Monitoring, Evaluation, and Iteration

PetCo's approach to monitoring their LLM-powered systems reflects sophisticated thinking about production AI operations. The Contact Lens interface displayed in the presentation shows multiple AI-derived insights for each customer interaction: an AI-generated contact summary in the upper right, QA rule evaluations in the middle showing how the specific contact compares to agent average and all-contacts average, and sentiment analysis showing customer emotional state at the beginning and end of the interaction.

Travis indicated they're still learning how to operationalize this data effectively. One vision is creating supervisor dashboards that show team-wide metrics including ending sentiment scores, enabling supervisors to identify which agents need more coaching attention. This represents thoughtful consideration of how to turn AI-generated insights into actionable management decisions rather than simply generating reports.

For the chatbot deployment, PetCo emphasized the critical importance of robust reporting to understand where the system is succeeding and failing. They're tracking which utterances are getting missed, where customers are abandoning in the conversation flow, and other indicators of friction. This reporting foundation enables the continuous iteration that Travis and Connie both emphasized as essential, following the principle of "think big, start small, and iterate."

The presentation highlighted new capabilities announced at re:Invent for evaluating self-service interaction performance and AI agent observability. These include metrics for percentage of contacts involving AI, handoff rates from AI to human agents, conversational turns for self-service interactions, and average handling time for agent-assisted cases. Having unified visibility into both human and AI agent performance enables more sophisticated optimization of the overall system.

## Organizational Change Management and Governance

The presentation emphasized that technical implementation represents only part of the LLMOps challenge. PetCo invested significant effort in change management, working with cross-functional teams spanning customer care, IT, and product management, along with trusted partners including Pronetics and Julia. Travis acknowledged feeling "blessed to have a great group of partners and stakeholders that are kind of in service of the customer outcomes."

The organization had to navigate both internal stakeholder concerns and external regulatory requirements. They worked through an AI governance council and had to address "scary" aspects of using AI in customer-facing applications. Multiple US state-specific laws add complexity to deploying conversational AI, requiring careful attention to compliance and data protection. The team found it necessary to "sell" their approach internally, explaining what they were trying to accomplish, how they were using AI, and how they were implementing safeguards.

Connie emphasized developing "accountable mission owners" or change champions within the organization who can help propel AI adoption as the technology evolves rapidly. The presentation noted that the conversation happening in December 2024 would look very different in six months or twelve months, requiring organizations to build adaptive capacity rather than assuming a stable technology landscape. This suggests investing in continuous learning and organizational flexibility as core LLMOps capabilities beyond just technical infrastructure.

## Future Roadmap and Strategic Direction

PetCo outlined several expansion areas for their AI capabilities. Beyond the conversational IVR already in requirements phase, they plan to enable customers to book grooming appointments and vaccination appointments directly through the chatbot and eventually through voice channels using Amazon Connect. Currently the system sends customers to a web link for booking, but this creates visibility gaps where PetCo can't determine if customers are lost in the transition. Direct booking through conversational interfaces would close this loop and provide better data on customer journey effectiveness.

The company plans to significantly expand their knowledge base beyond the initial 20 articles loaded into the generative AI system. This expansion is essential for broadening the scope of inquiries the chatbot can handle autonomously. They're also focusing on extracting more insights from Contact Lens, believing they can derive significantly more value from conversation analytics than they currently achieve.

Travis emphasized the importance of "designing for the future" when working with technology teams. His concern is avoiding architectural decisions that corner the organization and make future expansion difficult or expensive. This forward-looking architectural thinking is essential for LLMOps given the rapid pace of capability evolution in the AI space. The goal is to keep building incrementally on a solid foundation rather than periodically needing to rearchitect from scratch.

The presentation also touched on Amazon's latest announcements at re:Invent 2024, including agentic self-service with humanlike voices through integration with Nova Sonic, AI-powered predictive insights for personalized recommendations, unified evaluation of self-service and agent interactions, and enhanced AI agent observability. These capabilities point toward increasingly sophisticated conversational AI that can adapt to customer tone and style, proactively surface relevant products or information, and provide comprehensive performance visibility.

## Critical Assessment and Balanced Perspective

While the presentation comes from AWS and a partner customer, providing generally positive framing of the technology, several aspects suggest a reasonably grounded and realistic perspective. Travis's candor about lessons learned and mistakes made lends credibility to the narrative. His acknowledgment that the team sometimes got excited about technology before clearly defining outcomes, that they missed utterances they thought they had covered in the chatbot, and that they're still learning how to operationalize sentiment data all suggest realistic self-assessment rather than purely promotional messaging.

The emphasis on starting small and iterating, rather than attempting comprehensive transformations immediately, represents sensible LLMOps practice. PetCo's initial chatbot deployment with just 20 knowledge articles and four flows for high-frequency use cases reflects appropriate caution and a learning mindset. The recognition that data quality and knowledge content preparation represent major challenges, not just technical integration, demonstrates awareness of real-world implementation difficulties.

However, specific quantitative results are limited in the presentation. While PetCo mentions they are "bringing down handle time" through call summaries and achieving other operational improvements, concrete metrics around cost savings, containment rates, customer satisfaction changes, or ROI are not provided. This makes it difficult to assess the magnitude of impact achieved. The chatbot deployment was only about a month old at the time of the presentation, which is quite recent for drawing definitive conclusions about success.

The architectural decision to consolidate on a single vendor platform (Amazon Connect) has clear benefits for integration simplicity and feature velocity, but also creates vendor lock-in and dependency on that vendor's roadmap alignment with PetCo's needs. While Travis noted they wanted a partner with an "aggressive roadmap," this also means PetCo's capabilities are constrained by what Amazon chooses to prioritize and deliver.

The presentation acknowledges but doesn't deeply explore the critical challenge of determining when AI assistance is appropriate versus when human interaction delivers more value. The framework of categorizing interactions by potential impact on customer loyalty is conceptually sound, but implementing this in practice requires sophisticated understanding of customer context and intent that may be difficult to achieve systematically. The highly emotional nature of some pet-related interactions adds complexity that simple routing rules may not handle well.

Overall, this case study provides valuable insights into practical LLMOps implementation in a customer service context, with particular value in its honest discussion of data preparation challenges, the importance of organizational change management, and the iterative approach to deploying increasingly sophisticated AI capabilities. The emphasis on starting with clear business outcomes, building reporting foundations for continuous improvement, and designing flexible architectures for evolution represents solid LLMOps practice applicable across industries.