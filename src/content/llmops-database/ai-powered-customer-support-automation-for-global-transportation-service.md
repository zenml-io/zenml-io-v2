---
title: "AI-Powered Customer Support Automation for Global Transportation Service"
slug: "ai-powered-customer-support-automation-for-global-transportation-service"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3d17a8900b0868f8d30d"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:36:47.791Z"
  createdOn: "2024-11-21T14:00:55.556Z"
llmopsTags:
  - "classification"
  - "compliance"
  - "customer-support"
  - "error-handling"
  - "fallback-strategies"
  - "microservices"
  - "microsoft-azure"
  - "monitoring"
  - "prompt-engineering"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "scaling"
  - "security"
  - "semantic-search"
  - "translation"
industryTags: "tech"
company: "Lime"
summary: "Lime, a global micromobility company, implemented Forethought's AI solutions to scale their customer support operations. They faced challenges with manual ticket handling, language barriers, and lack of prioritization for critical cases. By implementing AI-powered automation tools including Solve for automated responses and Triage for intelligent routing, they achieved 27% case automation, 98% automatic ticket tagging, and reduced response times by 77%, while supporting multiple languages and handling 1.7 million tickets annually."
link: "https://forethought.ai/case-studies/lime-case-study/"
year: 2024
seo:
  title: "Lime: AI-Powered Customer Support Automation for Global Transportation Service - ZenML LLMOps Database"
  description: "Lime, a global micromobility company, implemented Forethought's AI solutions to scale their customer support operations. They faced challenges with manual ticket handling, language barriers, and lack of prioritization for critical cases. By implementing AI-powered automation tools including Solve for automated responses and Triage for intelligent routing, they achieved 27% case automation, 98% automatic ticket tagging, and reduced response times by 77%, while supporting multiple languages and handling 1.7 million tickets annually."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-customer-support-automation-for-global-transportation-service"
  ogTitle: "Lime: AI-Powered Customer Support Automation for Global Transportation Service - ZenML LLMOps Database"
  ogDescription: "Lime, a global micromobility company, implemented Forethought's AI solutions to scale their customer support operations. They faced challenges with manual ticket handling, language barriers, and lack of prioritization for critical cases. By implementing AI-powered automation tools including Solve for automated responses and Triage for intelligent routing, they achieved 27% case automation, 98% automatic ticket tagging, and reduced response times by 77%, while supporting multiple languages and handling 1.7 million tickets annually."
---

## Overview

Lime is a global leader in micromobility, providing electric bikes and scooters in over 200 cities across five continents. With a mission to build sustainable, affordable transportation alternatives, the company has powered more than 250 million rides. As with any high-volume consumer service, customer support is a critical operational function, and Lime faced significant challenges in scaling their support operations to match their exponential business growth.

This case study examines how Lime partnered with Forethought, an AI-powered customer experience platform, to automate and optimize their customer support operations. The implementation demonstrates practical applications of AI and LLM-based technologies in production environments for ticket classification, automated response generation, and workflow automation.

## The Challenge: Manual Support at Scale

Before implementing AI-powered solutions, Lime's support center operated in a traditional, manual fashion that presented several critical challenges:

**Lack of Intelligent Routing**: Every support agent handled every type of ticket without any system to prioritize or route specific tickets to specialized agents. This created inefficiencies as agents with specific expertise were not matched to relevant tickets.

**Multilingual Complexity**: As a global company, Lime receives support tickets in many different languages. Agents frequently had to toggle between Google Translate and their ticketing system to handle common inquiries, creating friction and slowing response times.

**No Priority-Based Processing**: Despite having strong compliance partnerships with cities, Lime did not prioritize support tickets based on criticality. Critical issues like rider accidents or city official compliance inquiries were handled in the same order as routine questions about charges from weeks ago. This approach posed significant risks to both customer safety and business partnerships.

**Limited Self-Service Channels**: The company lacked a chat widget or comprehensive self-service options. All support inquiries came through email, phone, the Lime app, or web forms, requiring agent intervention for every case regardless of complexity.

With over 1.7 million tickets annually and exponential business growth, manual processing was unsustainable.

## Solution Architecture: Multi-Agent AI System

Lime implemented Forethought's multi-agentic AI platform, deploying several interconnected components to address their support automation needs.

### Triage Agent: Intelligent Classification and Routing

The Triage Agent serves as the initial processing layer for incoming support tickets. It performs two key functions:

**Language Detection and Routing**: The system automatically identifies the language of incoming tickets and routes them to dedicated language-speaking agents. This eliminates the manual translation workflow and ensures customers receive native-language support.

**Category Classification and Priority Assignment**: Triage layers language classification with category predictions to determine service levels based on severity. The system uses custom tags and triggers so that when Forethought predicts a specific language and category combination, the case is automatically routed to the appropriate queue. Critical inquiries (such as accident reports or city compliance issues) are now prioritized over routine questions.

The classification system predicts over 2.5 million tags annually for language and category, achieving 98% automatic tagging accuracy. This automated classification directly contributed to a 77% reduction in time to first response.

### Solve Agent: Automated Response Generation

The Solve Agent handles direct customer interactions through chat widgets and email channels. Key capabilities include:

**Intent Interpretation**: The system interprets the intent behind customer requests, moving beyond simple keyword matching to understand what customers actually need.

**Knowledge Base Search**: Solve searches the entire database of knowledge articles and previously resolved tickets to find the most accurate response. This represents a form of retrieval-augmented generation (RAG) where the AI draws from the company's institutional knowledge to generate responses.

**Multilingual Support**: The Solve Agent currently supports 4 languages globally, with plans to expand. This enables consistent automated support across Lime's international operations.

**Intelligent Escalation**: When customer questions are too complex for automated resolution, the system automatically routes customers to the help center web form, which is then passed to a human support agent.

The Solve Agent deflects approximately 27% of cases that come through email and web channels, representing significant agent time savings at Lime's scale.

### Workflow Builder: RPA-Guided Processes

Lime uses Forethought's Workflow Builder to create Robotic Process Automation (RPA) guided workflows. These automated workflows handle end-to-end processes through pre-set rules and integrate with internal tools to complete specific automation tasks:

- Damaged vehicle reports
- Charge and payment issues
- Receipt inquiries

These workflows represent deeper integration between the AI layer and Lime's operational systems, enabling full automation of routine processes without human intervention.

## Production Deployment Considerations

Several aspects of this implementation highlight important LLMOps considerations:

### Integration Architecture

The solution integrates across multiple touchpoints: email, chat widget, web forms, and the Lime mobile app. This multi-channel deployment requires consistent AI behavior and response quality across different input modalities. The system also integrates with internal tools for workflow automation, suggesting API-based connectivity to Lime's backend systems.

### Multilingual Operations

Supporting 4 languages globally with plans for expansion represents a significant production challenge. The AI models must accurately detect language, correctly classify intent across languages, and generate appropriate responses in each supported language. This requires either multilingual models or language-specific model deployments.

### Classification Accuracy at Scale

Processing 2.5 million tags annually with 98% accuracy demonstrates reliable production performance. However, it's worth noting that 2% error rate still represents approximately 50,000 incorrectly tagged tickets annually. The system's integration with human agent queues provides a safety net for misclassified or complex cases.

### Escalation Handling

The architecture maintains clear escalation paths from automated systems to human agents. This hybrid approach ensures that AI limitations don't result in customer frustration while still capturing efficiency gains on automatable inquiries.

## Results and Business Impact

The implementation delivered measurable results:

- **27% of cases automated** through the Solve Agent
- **2.5 million tags** predicted annually for language and category
- **98% automatic ticket tagging** accuracy
- **77% reduction in time to first response**

The case study claims these improvements led to "significant cost savings while improving customer satisfaction," though specific cost figures are not provided. The efficiency gains are logical given the volume of tickets and the high percentage of automation achieved.

## Critical Assessment

While the case study presents impressive results, several points merit consideration:

**Vendor-Provided Data**: This case study originates from Forethought's marketing materials, meaning the metrics presented are self-reported and selected to present the solution favorably. Independent verification of results would strengthen confidence in the claims.

**Deflection vs. Resolution**: The 27% case automation rate measures deflection, but it's unclear what percentage of these deflected cases actually resolved the customer's issue versus merely providing some response. True resolution rates would be a more meaningful metric.

**Customer Satisfaction Impact**: While improved response times generally correlate with satisfaction, the case study doesn't provide specific CSAT or NPS metrics to demonstrate actual customer experience improvements.

**Complexity of "Simple Questions"**: The case study notes that Solve handles deflection of "simple questions," but the boundary between simple and complex is not defined. Understanding this threshold would help assess the solution's true capabilities.

## Future Directions

Lime plans to expand their use of Workflow Builder to create additional automated processes, which they predict will significantly scale their global support footprint. The company also plans to add more language support through the Solve Agent.

The partnership approach highlighted by Dawn Phelps (Senior Customer Support Content and AI Manager) suggests ongoing collaboration with Forethought for continuous improvement and expansion of AI capabilities, which is a healthy approach to managing production AI systems that require ongoing tuning and enhancement.

## Conclusion

This case study demonstrates a practical, production deployment of AI-powered customer support automation at significant scale. The multi-agent architecture—with separate systems for classification/routing, automated response, and workflow automation—represents a modular approach that allows incremental implementation and optimization. The results, while vendor-reported, suggest meaningful operational improvements through AI automation, particularly in multilingual, high-volume customer support environments.