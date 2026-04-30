---
title: "Building the First Airline MCP Server for Agent-Based Customer Interactions"
slug: "building-the-first-airline-mcp-server-for-agent-based-customer-interactions"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "question-answering"
  - "poc"
  - "regulatory-compliance"
  - "agent-based"
  - "prompt-engineering"
  - "human-in-the-loop"
  - "latency-optimization"
  - "mcp"
  - "a2a"
  - "api-gateway"
  - "security"
  - "guardrails"
  - "open-source"
  - "documentation"
  - "serverless"
  - "cloudflare"
  - "anthropic"
industryTags: "other"
company: "Turkish Airlines"
summary: "Turkish Airlines, through its innovation arm Turkish Technology, developed one of the first Model Context Protocol (MCP) servers in the airline industry to enable natural language interactions with their flight booking and customer service systems. The project aimed to simplify complex travel planning tasks by allowing users to interact with airline services through conversational AI agents rather than traditional UI forms. The implementation leveraged OAuth 2.1 for authentication, exposed read-only APIs for flight search, booking details, check-in status, and frequent flyer information, while addressing enterprise security concerns through rate limiting, API proxying, and cloudflare-based security controls. The MCP server is currently in production and accessible to end users through their frequent flyer program authentication."
link: "https://www.youtube.com/watch?v=KWvkPFnHwlM"
year: 2026
seo:
  title: "Turkish Airlines: Building the First Airline MCP Server for Agent-Based Customer Interactions - ZenML LLMOps Database"
  description: "Turkish Airlines, through its innovation arm Turkish Technology, developed one of the first Model Context Protocol (MCP) servers in the airline industry to enable natural language interactions with their flight booking and customer service systems. The project aimed to simplify complex travel planning tasks by allowing users to interact with airline services through conversational AI agents rather than traditional UI forms. The implementation leveraged OAuth 2.1 for authentication, exposed read-only APIs for flight search, booking details, check-in status, and frequent flyer information, while addressing enterprise security concerns through rate limiting, API proxying, and cloudflare-based security controls. The MCP server is currently in production and accessible to end users through their frequent flyer program authentication."
  canonical: "https://www.zenml.io/llmops-database/building-the-first-airline-mcp-server-for-agent-based-customer-interactions"
  ogTitle: "Turkish Airlines: Building the First Airline MCP Server for Agent-Based Customer Interactions - ZenML LLMOps Database"
  ogDescription: "Turkish Airlines, through its innovation arm Turkish Technology, developed one of the first Model Context Protocol (MCP) servers in the airline industry to enable natural language interactions with their flight booking and customer service systems. The project aimed to simplify complex travel planning tasks by allowing users to interact with airline services through conversational AI agents rather than traditional UI forms. The implementation leveraged OAuth 2.1 for authentication, exposed read-only APIs for flight search, booking details, check-in status, and frequent flyer information, while addressing enterprise security concerns through rate limiting, API proxying, and cloudflare-based security controls. The MCP server is currently in production and accessible to end users through their frequent flyer program authentication."
notion:
  pageId: "352f8dff-2538-801f-b284-ee5941cf7f88"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-30T13:12:00.000Z"
  lastEditedTime: "2026-04-30T13:12:00.000Z"
  publishedAt: "2026-04-30T13:17:04Z"
---

## Overview

Turkish Airlines, through its technology subsidiary Turkish Technology and specifically its Digital Lab innovation team, developed what they claim to be the first MCP (Model Context Protocol) server implementation in the airline industry. Turkish Airlines is one of the world's largest carriers, operating over 500 aircraft with plans to expand to 800, serving approximately 90 million passengers annually and flying to more countries than any other airline. The Digital Lab serves as the innovation engine for Turkish Technology, which aims to become a technology provider not just for Turkish Airlines and its subsidiaries, but for the entire airline industry over the next decade.

The MCP implementation represents Turkish Airlines' bet on conversational interfaces as the future of customer interaction, operating under the thesis that "chat is the new UI" and that customers will increasingly interact with airline services through AI agents across various platforms. The project was conceived at the beginning of 2026 when MCP gained significant attention in the technology community. The implementation went from conception to production deployment within a matter of weeks after the OAuth specification for MCP was released, with development starting approximately one to two weeks after that release. Notably, the system is described as fully live and production-ready rather than a demonstration or proof of concept.

## Business Problem and Use Cases

The core business problem Turkish Airlines aimed to solve was the complexity of airline booking and travel management interfaces. Traditional airline websites and applications require users to navigate multiple forms, fill numerous fields, and manually coordinate various aspects of travel planning such as timing, connections, baggage policies, and check-in procedures. This complexity becomes particularly evident in scenarios involving multiple stakeholders or time-sensitive coordination.

The primary use cases demonstrated include flight search and booking assistance, where users can describe their travel needs in natural language rather than filling out search forms. A specific example provided involves a scenario where a mother-in-law needs to travel to the airport but must wait for a babysitter to arrive first. Rather than manually calculating travel times, airport arrival requirements, and searching through flight options, a user can simply describe the situation to an LLM platform, which uses the MCP server to identify the optimal flight and generate a booking link with all information pre-filled.

Other key use cases include baggage allowance queries, check-in status verification, accessing booking details, retrieving flight status information, discovering promotional offers for specific destinations, accessing city guides for travel destinations, and managing frequent flyer profile information including upcoming bookings and miles expiration. The implementation emphasizes user convenience by eliminating the need to remember PNR numbers or other booking references; users can simply ask about their upcoming flights and the system intelligently retrieves the relevant information.

## Technical Architecture and Implementation

The MCP server architecture was designed with enterprise security and governance as primary constraints. Rather than creating new direct connections to core airline booking systems, Turkish Airlines chose to proxy their existing mobile application and web application APIs. This approach provided several advantages: it leveraged already-vetted and production-tested API surfaces, avoided introducing new security attack vectors into core systems, and allowed the team to move quickly without requiring extensive integration work with legacy airline booking systems.

Authentication is handled through OAuth 2.1, specifically integrating with Turkish Airlines' Miles&Smiles frequent flyer program. This creates an inherently end-user-focused implementation rather than a B2B or developer-oriented tool. Every user must authenticate through their frequent flyer account before accessing MCP functionality. However, this authentication requirement presented a significant technical challenge because OAuth 2.1 is a relatively new standard and Turkish Airlines' existing OAuth infrastructure did not support it. Rather than waiting potentially a year or more for enterprise systems to be upgraded, the team decided to implement the OAuth 2.1 layer within the MCP server itself.

The OAuth 2.1 implementation was facilitated by Cloudflare, which provides both an example implementation and infrastructure through their Workers platform. Cloudflare is used not only for the OAuth layer but also as a security control point for the entire MCP implementation. The security architecture includes rate limiting based on frequent flyer ID to prevent scraping of flight availability data, which could otherwise be used by competitors or third parties to build alternative booking platforms. This rate limiting strategy ties directly to the authentication requirement, as every authenticated request can be tracked and limited per user.

The tools currently exposed through the MCP server include flight search capabilities, flight status retrieval, booking detail access, check-in eligibility verification, promotional offer discovery, city guide information, and user profile data from the frequent flyer program. All of these are currently read-only operations, representing a deliberate security and risk management decision for the initial production release.

## Development Tools and Open Source Contributions

Turkish Airlines has developed and open-sourced several components related to their MCP implementation. They created Takeoff UI, a UI component library specifically designed for airline industry applications. Recognizing that standard UI libraries don't adequately address airline-specific interface needs such as seat maps, flight status displays, and booking flows, they built this specialized library and released it as open source. On top of Takeoff UI, they developed a Takeoff UI MCP server that allows developers to explore and understand the available components through conversational interaction.

The development utilized Cloudflare's Agent SDK alongside their Workers platform, suggesting a serverless or edge computing deployment model at least for certain components of the system. This architectural choice likely provides benefits in terms of global distribution, latency reduction, and scaling capabilities given Turkish Airlines' worldwide operations.

## Enterprise LLM Strategy and Internal Tooling

Beyond the customer-facing MCP implementation, Turkish Airlines has developed internal LLM infrastructure to address security and data privacy concerns common in enterprise environments. They deployed on-premise GPU infrastructure running models such as Qwen 3 and potentially other open-source models. On this infrastructure, they built an internal ChatGPT-like platform called "TakeAI GPT" that all employees can use without sending sensitive data to external cloud LLM providers.

Within this internal platform, they've enabled MCP support and are currently using Atlassian MCP servers to integrate with tools like Jira and Confluence. This allows employees to query work items, retrieve documentation, and access other enterprise information through conversational interfaces. However, the speaker noted that adding MCP servers to enterprise applications is significantly more complex than might be expected and that better centralized management solutions are needed for enterprise MCP deployments.

## Production Challenges and Security Considerations

The transition to production revealed several significant challenges. Security and governance concerns were paramount, particularly given the timing of the development which coincided with a security incident involving GitHub MCP exposing private data. This incident heightened concerns among security stakeholders about introducing new potential vulnerabilities.

To address these concerns, the team implemented multiple security layers beyond just OAuth authentication and rate limiting. They deliberately limited initial functionality to read-only operations to minimize potential damage from security incidents or implementation flaws. All data access goes through existing, battle-tested API layers rather than creating new data access patterns. The Cloudflare-based architecture provides additional security controls and monitoring capabilities.

The authentication layer itself presented challenges beyond just OAuth 2.1 support. The team needed to balance security requirements with user experience, particularly around token refresh, session management, and the multi-platform nature of MCP usage where users might interact with Turkish Airlines services through various LLM platforms and applications.

Rate limiting strategy required careful consideration of business objectives versus technical constraints. The team needed to prevent data scraping and competitive intelligence gathering while still providing responsive service to legitimate users. The decision to rate-limit by frequent flyer ID created a natural throttling mechanism while also incentivizing user authentication and frequent flyer program engagement.

## Future Development and Roadmap

Turkish Airlines has an ambitious roadmap for expanding MCP capabilities beyond the current read-only operations. They are actively working on check-in flows that would allow users to complete check-in through conversational interactions, including intelligent seat selection based on natural language preferences. A specific example provided is a user requesting a window seat that won't be exposed to direct sunlight during a morning flight, requiring the system to understand flight route, time of day, sun position, and aircraft configuration.

Disruption management is identified as a key future use case. Flight disruptions are among the most frustrating experiences for both airlines and passengers, and Turkish Airlines is exploring whether MCP can enable proactive, automated rebooking suggestions when disruptions occur. This would represent a significant advancement from current disruption handling processes, which typically require customers to wait in long queues or navigate complex rebooking interfaces.

The team is particularly excited about MCP UI capabilities, recognizing that purely text-based interactions are inadequate for certain airline use cases. Viewing a seat map as formatted text, for example, provides a poor user experience compared to visual representations. They are waiting for MCP client platforms to support UI rendering capabilities that would allow the server to return structured visual components rather than just text responses.

Plans also include integrating MCP capabilities into Turkish Airlines' own customer service assistant applications, suggesting that the technology will be used not just as a protocol for external platform integration but also as an internal architecture for their own conversational AI systems.

## Critical Assessment and Considerations

While Turkish Airlines presents this as a significant innovation in airline customer service, several aspects warrant balanced consideration. The implementation is currently limited to read-only operations, meaning users cannot actually book flights, change reservations, or complete other transactional operations through the MCP interface. This significantly limits the practical utility, as users still must ultimately complete transactions through traditional interfaces.

The requirement for frequent flyer authentication creates a barrier to entry and limits the user base to existing loyalty program members. While this serves security and business objectives, it means casual travelers or first-time customers cannot benefit from the technology. The authentication requirement also adds friction to what is meant to be a simplified, conversational user experience.

The reliance on existing mobile and web APIs means the MCP layer is fundamentally limited by the capabilities and design of those underlying systems. Any limitations, inefficiencies, or design choices in the existing APIs will propagate to the MCP experience. The proxy architecture, while providing security benefits, also introduces additional latency and potential failure points.

The claim to be the "first airline" to implement MCP is difficult to verify and represents marketing language that should be viewed skeptically. The timing of development, starting weeks after OAuth specifications were released, suggests rapid implementation that may not have fully addressed all edge cases or production scenarios. The acknowledgment that "adding an MCP to an enterprise application is much harder" than expected and the need for "better centralized management" suggests there are significant operational challenges that remain unresolved.

The internal LLM platform using on-premise models like Qwen 3 represents a pragmatic approach to enterprise AI deployment but raises questions about model performance, maintenance burden, and whether the security benefits justify the operational complexity compared to enterprise-grade cloud LLM services with appropriate data protection agreements.

The open-source contributions around Takeoff UI, while valuable to the community, also serve business objectives of establishing Turkish Technology as a platform provider to the airline industry. The dual goals of community contribution and commercial positioning should be recognized when evaluating these efforts.

## LLMOps Maturity and Operational Considerations

From an LLMOps perspective, this case study reveals an organization in the early stages of production LLM deployment but with thoughtful attention to enterprise requirements. The authentication and rate limiting infrastructure demonstrates understanding of production operational needs beyond just making a demo work. The decision to limit initial functionality to read-only operations shows appropriate caution and risk management for a high-stakes production environment serving millions of customers.

The multi-environment approach, with separate infrastructure for internal employee use versus external customer-facing applications, reflects mature thinking about different security and performance requirements across use cases. The on-premise GPU deployment for internal use addresses legitimate data privacy concerns while the customer-facing MCP server appropriately leverages cloud infrastructure for global reach.

However, the acknowledged challenges around centralized MCP management and the complexity of enterprise integration suggest the operational tooling and practices are still maturing. The reliance on external platforms like Cloudflare for critical security and authentication functions creates dependencies that need careful monitoring and management.

The roadmap focus on expanding functionality rather than optimizing existing capabilities might indicate the project is still in a feature development phase rather than operational optimization phase. True production maturity would typically involve extensive monitoring, performance optimization, error handling refinement, and iterative improvement based on real user behavior and feedback, which aren't extensively discussed in this presentation.

## Industry Implications and Broader Context

This implementation represents an interesting test case for MCP as an industry standard and for conversational AI in highly regulated, safety-critical industries like aviation. Airlines face unique challenges around data accuracy, real-time inventory management, complex pricing rules, and regulatory compliance that make LLM deployment more challenging than many other industries.

The choice to expose functionality through MCP rather than building proprietary conversational interfaces demonstrates a bet on open standards and ecosystem development. If MCP becomes widely adopted, Turkish Airlines' early investment could provide competitive advantages and learning that translates to better customer experiences. Conversely, if MCP fails to achieve broad adoption or is superseded by alternative standards, the investment may represent technical debt.

The focus on end-user accessibility rather than developer or B2B use cases is notable and somewhat unusual for early MCP implementations. This suggests Turkish Airlines sees direct customer value rather than viewing MCP purely as a developer tool or API alternative. Whether customers actually prefer conversational interfaces for travel booking versus traditional search interfaces remains to be proven through usage data and customer feedback that isn't provided in this presentation.
