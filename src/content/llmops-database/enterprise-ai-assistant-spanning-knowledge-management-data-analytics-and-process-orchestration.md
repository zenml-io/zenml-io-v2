---
title: "Enterprise AI Assistant Spanning Knowledge Management, Data Analytics, and Process Orchestration"
slug: "enterprise-ai-assistant-spanning-knowledge-management-data-analytics-and-process-orchestration"
draft: false
llmopsTags:
  - "chatbot"
  - "question-answering"
  - "customer-support"
  - "data-analysis"
  - "summarization"
  - "translation"
  - "document-processing"
  - "rag"
  - "prompt-engineering"
  - "semantic-search"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "error-handling"
  - "fallback-strategies"
  - "system-prompts"
  - "evals"
  - "databases"
  - "api-gateway"
  - "orchestration"
  - "monitoring"
  - "security"
  - "guardrails"
  - "microsoft-azure"
industryTags: "other"
company: "Heineken"
summary: "Heineken developed Hoppy, an enterprise-wide AI assistant designed to address scattered data platforms, language barriers, remote assistance needs, self-service analytics, and event-driven alerts across their global operations. The solution consists of three main pillars: knowledge management indexing documents from SharePoint, Collibra, and other sources; chat-with-data functionality connecting to Power BI, Azure, and SAP systems with over 95% accuracy; and process orchestration for accelerated workflows including Service Now integration. The platform serves all Heineken employees globally through Microsoft Teams and web/mobile apps, with personalized responses based on user location and role, and has achieved recognition where 50% of users report learning new things through the assistant."
link: "https://www.youtube.com/watch?v=PN8eFF2jYx4"
year: 2024
seo:
  title: "Heineken: Enterprise AI Assistant Spanning Knowledge Management, Data Analytics, and Process Orchestration - ZenML LLMOps Database"
  description: "Heineken developed Hoppy, an enterprise-wide AI assistant designed to address scattered data platforms, language barriers, remote assistance needs, self-service analytics, and event-driven alerts across their global operations. The solution consists of three main pillars: knowledge management indexing documents from SharePoint, Collibra, and other sources; chat-with-data functionality connecting to Power BI, Azure, and SAP systems with over 95% accuracy; and process orchestration for accelerated workflows including Service Now integration. The platform serves all Heineken employees globally through Microsoft Teams and web/mobile apps, with personalized responses based on user location and role, and has achieved recognition where 50% of users report learning new things through the assistant."
  canonical: "https://www.zenml.io/llmops-database/enterprise-ai-assistant-spanning-knowledge-management-data-analytics-and-process-orchestration"
  ogTitle: "Heineken: Enterprise AI Assistant Spanning Knowledge Management, Data Analytics, and Process Orchestration - ZenML LLMOps Database"
  ogDescription: "Heineken developed Hoppy, an enterprise-wide AI assistant designed to address scattered data platforms, language barriers, remote assistance needs, self-service analytics, and event-driven alerts across their global operations. The solution consists of three main pillars: knowledge management indexing documents from SharePoint, Collibra, and other sources; chat-with-data functionality connecting to Power BI, Azure, and SAP systems with over 95% accuracy; and process orchestration for accelerated workflows including Service Now integration. The platform serves all Heineken employees globally through Microsoft Teams and web/mobile apps, with personalized responses based on user location and role, and has achieved recognition where 50% of users report learning new things through the assistant."
notion:
  pageId: "3b8f8dff-2538-808c-a5a7-f213eed0c687"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-10T15:14:00.000Z"
  lastEditedTime: "2026-08-10T15:14:00.000Z"
  publishedAt: "2026-08-10T15:22:48Z"
---

## Overview

Heineken developed Hoppy, a comprehensive enterprise AI assistant that represents a mature LLMOps deployment spanning multiple use cases and touching all employees across a global organization. The project originated from a simple concept of being able to ask natural language questions about sales data and evolved into a multi-pillar platform addressing five key enterprise challenges: scattered data and platforms making information hard to find for senior management, language barriers with English documentation not accessible to all employees globally, need for 24-hour remote assistance especially at breweries in remote locations, self-service analytics capabilities for executives who want to perform analysis without bothering their teams, and event-driven alerts rather than passive report checking.

The presentation provides valuable insights into the realities of deploying and maintaining a production LLM system at enterprise scale, including the challenges of rapid technology evolution, the importance of brand building and change management, and the complexity of measuring value in productivity-focused AI applications.

## Architecture and Technical Implementation

The technical architecture is built around Microsoft Teams as the primary interface, with additional web and mobile app interfaces being developed. The system uses a bot framework that maintains user context including location and role information, which is critical for personalization and security. When a user asks a question, it goes through an orchestration layer that routes to the appropriate agent or service.

A particularly interesting architectural decision is that all queries first pass through the knowledge index for enrichment before being routed to specific agents. This means that even data queries benefit from the semantic understanding captured in the knowledge base. For example, if a user uses an abbreviation or refers to a program that includes certain operating companies, the system translates this into proper SQL statements with full entity names and legal entities. This knowledge-aware query translation reportedly contributes to the high accuracy rates they claim for their data access pillar.

The system integrates with multiple backend data sources including Power BI, Azure data platforms, and SAP BTP. Security is implemented at multiple levels, with users only able to access data they have permissions for in the underlying systems. This permission replication is highlighted as a critical feature given that Hoppy provides access to sensitive sales and financial information.

## Three-Pillar Structure

The solution is organized around three main pillars. The first is knowledge management, which involves building an index of documents from various sources including SharePoint, KPI definitions from Collibra, data from Knime, and other internal tools. This creates a unified knowledge base that can be queried regardless of where information originally resided.

The second pillar is chat with your data, allowing users to interact with data from Power BI, Azure, and SAP BTP using natural language. The team claims over 95% accuracy for this capability, though the methodology for measuring this accuracy is not detailed in the presentation. The knowledge index integration with this pillar is noteworthy as it demonstrates a sophisticated approach to query understanding rather than treating data access as purely a text-to-SQL problem.

The third pillar is orchestration and accelerated processes, which includes integration with the process organization platform and Service Now. The Service Now integration is designed to first attempt to answer questions from the knowledge base, and only create a ticket if that fails, with automatic routing to the appropriate support group. This represents a more sophisticated approach than simple ticket creation, attempting to deflect support requests where possible.

## Cross-Cutting Features and Capabilities

Beyond the three pillars, the team emphasizes several cross-cutting features that represent important LLMOps considerations. The trusted and secure functionality ensures that permissions are replicated from underlying systems and that users only see information appropriate to their access level and geography. Knowledge localization is supported, with certain documentation available only to specific user groups.

Knowledge awareness goes beyond just having access to documents. The system actively revalidates knowledge endpoints as business changes occur, and importantly, has strategies for situations where Hoppy cannot provide an answer. Rather than simply stating inability to help, the system attempts to guide users to where they can find the information, whether that's a fallback to SharePoint, specialized internal agents, or other resources.

Personalization is implemented at multiple levels beyond just conversation history. The system needs to understand user-specific information to customize responses. For example, an employee in Mexico asking about invoice creation needs different information than someone in another country. This requires building comprehensive user profiles and incorporating that context into prompts before generating responses.

The insight-driven capability moves beyond simple question answering to provide research agent functionality that can guide users through possible root causes and corrective actions, not just report numbers. Proactivity and action orientation represent the most advanced capabilities, allowing Hoppy to initiate contact with users through notifications and enabling them to take actions directly from the chat interface.

## Bot Persona and Brand Building

An interesting aspect of the project is the emphasis on brand building and persona design. The team created marketing materials and videos for Hoppy two years before having a deployable product, which they acknowledge sounds crazy in retrospect but proved valuable for building organizational recognition. This early marketing opened doors to different departments for discussing new use cases and integration opportunities.

Hoppy is presented as a female digital colleague with a friendly personality consistent with Heineken's brand style, represented by a bottle opener icon that pops up to help unlock blocked information. The team runs evaluations specifically to ensure that interactions with end users maintain consistency with this persona. This attention to persona design reflects an understanding that enterprise AI adoption depends not just on technical capabilities but on user experience and emotional engagement.

## User Experience and Interface Design

The current implementation primarily uses Microsoft Teams, but the team recognizes limitations in delivering all use cases within that interface. They are developing a more comprehensive web-based portal where users can interact with Hoppy and discover available use cases. The portal design includes grouping use cases by function such as HR, sales and marketing, and finance, with access controls based on user permissions.

Gamification elements are being incorporated, including a beer glass visualization showing what percentage of the platform the user has explored and how many use cases they've tested, with prizes available to drive engagement. The system also plans to connect to users' calendars to understand their schedule and share relevant sources to prepare them for meetings.

Response formatting is standardized with important features for trust and usability. Responses to process questions include links to source documents, which is emphasized as critical for users who need to verify that instructions come from official Heineken procedures rather than hallucinations. Follow-up questions are automatically suggested, which is particularly beneficial for new joiners learning about processes. Fallback mechanisms redirect users to SharePoint or other resources when Hoppy cannot provide a direct answer, and integration with the IT ticketing system allows for ticket creation directly from Hoppy.

## User Personas and Use Case Focus

While Hoppy is enabled for all Heineken employees globally without regional restrictions, the team realized they need to focus on specific user personas with dedicated use cases to effectively monitor, track, and deliver concrete value. They selected four main operational user personas and customize use cases for each, recognizing that different personas have different problems to solve and therefore different success criteria.

This focused approach within a broadly available platform represents a pragmatic LLMOps strategy, balancing the desire to provide universal access with the need to demonstrate clear value and manage development priorities effectively.

## Value Measurement and Success Metrics

The discussion of value measurement provides honest insights into the challenges of quantifying AI assistant impact. For use cases that are well-established in production, specifically knowledge access and information retrieval, the team has validated process changes, time savings per user, and steps eliminated when users are redirected to Hoppy. However, they acknowledge that the primary benefits are personal productivity and learning, which are difficult to monetize in a straightforward way. The metric that 50% of users report learning new things with Hoppy is highlighted, representing a soft but meaningful measure of impact.

The team is candid that the biggest value for the organization in terms of hard savings will come from actionable items currently in testing or development, rather than from the knowledge and data access capabilities already deployed. This represents an honest assessment that initial AI assistant deployments often focus on productivity and user experience improvements that are real but hard to quantify, while more measurable business impact requires moving up the value chain to decision support and automated actions.

## Development Approach and Team Organization

The team's discussion of working in the AI project environment provides valuable insights into LLMOps challenges. They highlight that the rapid evolution of the market has forced them through three migrations in the past two years, with the clear possibility of more to come. Each migration requires dedicating at least one developer for three months, which impacts the ability to deliver other priority use cases. This represents a significant LLMOps consideration that organizations must plan for.

Another challenge is that use cases that seem exciting and fill a niche when development begins often become standard vendor offerings by the time they're delivered, somewhat diminishing the value of custom development. This highlights the tension between build versus buy decisions in rapidly evolving AI markets.

To maintain flexibility amid constant change, the team shifted to one-week sprints and spends more time on proofs of concept and spikes. While one-week sprints were challenging initially, they provide natural opportunities to redirect focus and re-plan priorities. This agile approach seems essential for LLMOps given the pace of change in underlying technologies and capabilities.

## Future Vision and Roadmap

The team's vision for a truly impactful digital colleague experience involves creating an end-to-end integrated platform that spans the user's entire workday. The envisioned experience starts with mobile notifications pushing business headlines, KPI highlights from the data platform, and top priorities from process orchestration. During the workday, Hoppy can participate in stand-ups as an avatar in Teams, sharing sales revenue analysis with deep research highlighting anomalies and proposed actions.

Proactive features include pushing notifications about shipment delays and drafting supplier escalation emails. A critical principle is maintaining human-in-the-loop control, with Hoppy never taking actions without user decision. Background work completion handles routine items without escalation, but exceptions trigger alerts for human sign-off. At day's end, a podcast feature summarizes the day's data, allowing users to consume information in audio format.

This vision represents a sophisticated understanding of how AI assistants can integrate into daily workflows while respecting the need for human oversight and control. The focus on proactive assistance rather than just reactive query answering shows maturity in thinking about AI assistant design.

## LLMOps Considerations and Challenges

Several LLMOps challenges emerge from this case study. The migration requirements highlight the operational burden of maintaining production LLM systems as the underlying technology evolves. Organizations must plan for periodic migrations and the developer time they consume, treating this as an ongoing operational cost rather than a one-time deployment effort.

The knowledge management aspect requires continuous revalidation as business processes change, representing an ongoing content operations challenge. The team's focus on what happens when the system cannot answer questions shows sophisticated thinking about failure modes and graceful degradation.

Security and permission replication across multiple backend systems is complex, especially in a global organization with diverse data access requirements. The personalization requirements add another layer of complexity, needing to incorporate user context including location, role, and potentially calendar information into prompt construction.

Measuring value remains challenging, particularly for productivity-focused use cases. The team's honesty about the difficulty of monetizing personal productivity improvements and the focus on actionable use cases for harder ROI is instructive for others building similar systems.

The importance of brand building and change management is emphasized through the early marketing investment and persona design, suggesting that technical excellence alone is insufficient for enterprise AI adoption. The gamification approach and focus on user engagement reflects an understanding that adoption is a people problem as much as a technology problem.

## Critical Assessment

While the presentation provides valuable insights into a real-world enterprise LLM deployment, several claims warrant scrutiny. The over 95% accuracy for chat-with-data is impressive but lacks detail on how this is measured, what constitutes accuracy, and on what types of queries. Different organizations define data access accuracy differently, and understanding the methodology would be important for assessing this claim.

The value metrics presented are largely qualitative, with the 50% learning metric being the primary quantitative measure shared for deployed capabilities. While the team is honest that hard ROI is challenging to demonstrate, organizations considering similar investments would benefit from more detailed time savings calculations or process efficiency improvements.

The vision presented is ambitious, particularly the proactive notification and action suggestion capabilities. The acknowledgment that much of this is still in testing or development is important context. The gap between vision and current reality is significant, which is typical for AI projects but important to recognize when evaluating the case study.

The persona design and brand building approach is interesting but raises questions about whether the significant investment in marketing materials two years before product availability was optimal, or whether that effort could have been better spent on faster development or more thorough user research.

Overall, this case study represents a thoughtful and relatively mature approach to enterprise LLMOps, with honest discussion of challenges and realistic assessment of where value is and isn't being captured. The multi-pillar architecture with knowledge-aware orchestration is sophisticated, and the attention to security, personalization, and user experience reflects production-ready thinking. The challenges around migrations, value measurement, and the gap between current capabilities and future vision are common to many enterprise AI deployments and provide valuable lessons for others on similar journeys.
