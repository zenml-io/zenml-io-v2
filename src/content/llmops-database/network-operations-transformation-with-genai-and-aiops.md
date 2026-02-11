---
title: "Network Operations Transformation with GenAI and AIOps"
slug: "network-operations-transformation-with-genai-and-aiops"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f414c5e7ff7120b73a026"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:43:19.526Z"
  createdOn: "2024-11-21T14:18:52.073Z"
llmopsTags:
  - "cost-optimization"
  - "databases"
  - "devops"
  - "google-gcp"
  - "internet-of-things"
  - "latency-optimization"
  - "legacy-system-integration"
  - "model-optimization"
  - "monitoring"
  - "orchestration"
  - "realtime-application"
  - "reliability"
  - "scalability"
  - "scaling"
industryTags: "telecommunications"
company: "Vodafone"
summary: "Vodafone implemented a comprehensive AI and GenAI strategy to transform their network operations, focusing on improving customer experience through better network management. They migrated from legacy OSS systems to a cloud-based infrastructure on Google Cloud Platform, integrating over 2 petabytes of network data with commercial and IT data. The initiative includes AI-powered network investment planning, automated incident management, and device analytics, resulting in significant operational efficiency improvements and a planned 50% reduction in OSS tools."
link: "https://www.youtube.com/watch?v=pk26aS4Qm14"
year: 2023
seo:
  title: "Vodafone: Network Operations Transformation with GenAI and AIOps - ZenML LLMOps Database"
  description: "Vodafone implemented a comprehensive AI and GenAI strategy to transform their network operations, focusing on improving customer experience through better network management. They migrated from legacy OSS systems to a cloud-based infrastructure on Google Cloud Platform, integrating over 2 petabytes of network data with commercial and IT data. The initiative includes AI-powered network investment planning, automated incident management, and device analytics, resulting in significant operational efficiency improvements and a planned 50% reduction in OSS tools."
  canonical: "https://www.zenml.io/llmops-database/network-operations-transformation-with-genai-and-aiops"
  ogTitle: "Vodafone: Network Operations Transformation with GenAI and AIOps - ZenML LLMOps Database"
  ogDescription: "Vodafone implemented a comprehensive AI and GenAI strategy to transform their network operations, focusing on improving customer experience through better network management. They migrated from legacy OSS systems to a cloud-based infrastructure on Google Cloud Platform, integrating over 2 petabytes of network data with commercial and IT data. The initiative includes AI-powered network investment planning, automated incident management, and device analytics, resulting in significant operational efficiency improvements and a planned 50% reduction in OSS tools."
---

## Summary

Vodafone, one of the world's largest telecommunications companies, is undertaking a comprehensive transformation of its network operations using AI and GenAI technologies in partnership with Google Cloud. This case study, presented as a conversation between Simon Norton (Head of Digital Network and OSS practice at Vodafone) and Brian Kracik from Google Cloud, outlines how Vodafone is applying generative AI to enhance customer experience through improved network management, operations, and investment planning.

The conversation reveals that Vodafone's AI journey in the network domain began approximately four to five years ago with traditional AIOps implementations, and they are now evolving to incorporate GenAI capabilities across the entire network lifecycle. It's worth noting that this is a promotional interview hosted by Google Cloud, so the perspectives shared are inherently positive about the partnership and technology choices.

## The Problem Space

Vodafone faced several interconnected challenges that necessitated a transformation of their network operations approach:

The first major challenge was dealing with legacy OSS (Operational Support Systems). Like most established telecoms, Vodafone had accumulated a substantial base of legacy tools that made it difficult to extract insights and correlate information across different systems. Simon Norton described the challenge of trying to understand the "insight action cycle" when data was fragmented across IT systems, commercial systems, and network systems.

The second challenge involved understanding customer experience as a multivariate problem. Norton emphasized that great or poor customer experience isn't driven by a singular event but rather a "linear chain of events with many variables." The network is a huge variable in this equation, but pinpointing exactly where network interventions should be made to improve experience was historically difficult.

A third challenge was the inability to correlate data across previously siloed on-premises deployments of performance management tools, device analytics, and customer experience management platforms. Norton explicitly stated that building applications on top of correlated data "simply wasn't possible" with their previous infrastructure.

## The Solution Architecture and LLMOps Implementation

Vodafone's approach to solving these challenges involves multiple layers of technical implementation, with GenAI serving as a key capability on top of a solid data foundation.

### Data Foundation on Google Cloud

The foundational decision that Norton describes as "prescient" was Vodafone's strategic partnership with Google Cloud, which began approximately five years ago. Today, they have:

- Hundreds of network data sources integrated to the cloud
- Greater than 2 petabytes of network data available at any given time
- Integration of commercial data, IT data, customer experience data alongside network data
- The ability to "mesh data sets" and build products in ways that weren't previously possible

This data platform serves as the foundation upon which both traditional AI/ML and GenAI applications are built. Without this unified data layer, the GenAI applications would lack the context and information needed to be useful.

### Net Perform: Device Analytics Platform

One specific product mentioned is "Net Perform," which was migrated to GCP in December. This advanced device analytics capability enables Vodafone to understand exactly how customers experience the network from their devices. The platform allows correlation of device-level data with traditional network feeds from customer experience management platforms and performance management platforms. This enables more personalized customer experiences and powers capabilities like guided diagnostics journeys for customers.

### GenAI for Network Operations Copiloting

The most significant LLMOps application discussed is the use of GenAI as a copilot for complex incident management. Norton described this as follows: when closed-loop automation using traditional AI/ML methods cannot handle an incident, GenAI becomes "brilliant to copilot the human" by:

- Providing network data context
- Surfacing relevant network knowledge
- Presenting information about previous similar incidents and how they were resolved
- Putting this synthesized picture "into the hands of that second-line engineer so they can fix the problem quicker"

The value proposition is straightforward: "Less problems, fixed more quickly? Better customer experience."

This represents a classic copilot pattern in LLMOps where the LLM augments human decision-making rather than fully automating it. This is particularly appropriate for complex incident management where edge cases are common and the consequences of errors are significant.

### Smart CapEx: GenAI-Powered Network Investment Planning

Another GenAI application under development is what Vodafone calls "smart CapEx" - a GenAI-powered next-generation network investment planning capability. This requires integration of:

- Commercial data products
- Customer experience feeds
- Revenue per site information
- All network data

Norton emphasized that building such a product requires fundamentally different ways of working, bringing together data sets and expertise from multiple teams. His team may not be expert on commercial data sets, while commercial teams may not understand network data - the GenAI application requires both.

### Unified Performance Management

A major infrastructure modernization effort involves creating "Unified Performance Management" - a single system to replace over 100 traditional performance management systems across different network domains. This consolidation:

- Eliminates proprietary solutions that varied by market and network domain
- Presents all network performance data in Google Cloud
- Makes data accessible for consumption in AI models and other products
- Improves data quality and consistency (eliminating the challenges of integrating 100+ data sources)
- Reduces economic complexity of data integration

### OSS Simplification Program

The broader context for these GenAI initiatives is a massive OSS simplification and modernization program. In the next three years, Vodafone plans to:

- Reduce their legacy base by over 600 tools and applications
- Achieve approximately 50% reduction in the absolute number of OSS tools
- Create "super strong foundations" for AI and GenAI applications

Norton acknowledged that while GenAI is exciting, the underlying OSS is "mission critical in its nature" and if legacy persists, it will hinder the ability to achieve higher-level AI objectives.

## Organizational and Cultural Considerations

An interesting aspect of this case study is the emphasis on organizational change rather than just technology. Norton repeatedly stressed the importance of cross-functional collaboration:

- The Google Cloud data platform promotes cross-functional working in "completely new ways relative to the previous ways of working"
- He advocated for putting "smart, creative people together and get out of the way"
- He cautioned against the traditional approach of "jealously guarding one's data because data equals power"
- The smart CapEx product requires teams from network, commercial, and customer experience to work together

This reflects a common theme in LLMOps implementations: the technology is often the easier part, while organizational alignment and cultural change present greater challenges.

## Critical Assessment

While this case study provides valuable insights into how a major telecom is approaching GenAI in network operations, it's important to note several limitations:

The interview is promotional in nature, hosted by Google Cloud and featuring their customer. Specific quantitative results or metrics are largely absent. We hear about plans and intentions (e.g., the 600 tool reduction target) but limited evidence of achieved outcomes from the GenAI implementations specifically.

The GenAI applications described - particularly the incident management copilot - are presented as aspirational use cases rather than fully deployed production systems. Norton uses phrases like "I really think that AI operations, coupled with GenAI, is going to be game changing for us" which suggests these capabilities are still emerging.

The technical details of how GenAI models are trained, deployed, monitored, and maintained in production are not discussed. Questions about model selection, fine-tuning, prompt engineering, evaluation metrics, and governance are not addressed.

That said, the case study does illustrate a pragmatic approach to LLMOps: building on a solid data foundation, starting with traditional AI/ML and adding GenAI where it provides unique value (particularly in human-in-the-loop scenarios), and recognizing that organizational change is as important as technical implementation. The emphasis on using GenAI for copiloting complex decisions rather than full automation reflects a mature understanding of where current LLM capabilities are most effectively applied.