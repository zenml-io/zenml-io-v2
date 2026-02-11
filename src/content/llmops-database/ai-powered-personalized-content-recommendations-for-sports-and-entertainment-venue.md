---
title: "AI-Powered Personalized Content Recommendations for Sports and Entertainment Venue"
slug: "ai-powered-personalized-content-recommendations-for-sports-and-entertainment-venue"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3dea14433edf3e9f829a"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:45:10.312Z"
  createdOn: "2024-11-21T14:04:26.588Z"
llmopsTags:
  - "api-gateway"
  - "content-moderation"
  - "data-analysis"
  - "data-integration"
  - "databases"
  - "google-gcp"
  - "latency-optimization"
  - "model-optimization"
  - "monitoring"
  - "realtime-application"
  - "reliability"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "visualization"
industryTags: "media-entertainment"
company: "Golden State Warriors"
summary: "The Golden State Warriors implemented a recommendation engine powered by Google Cloud's Vertex AI to personalize content delivery for their fans across multiple platforms. The system integrates event data, news content, game highlights, retail inventory, and user analytics to provide tailored recommendations for both sports events and entertainment content at Chase Center. The solution enables personalized experiences for 18,000+ venue seats while operating with limited technical resources."
link: "https://www.youtube.com/watch?v=lwfw46L-YFg"
year: 2023
seo:
  title: "Golden State Warriors: AI-Powered Personalized Content Recommendations for Sports and Entertainment Venue - ZenML LLMOps Database"
  description: "The Golden State Warriors implemented a recommendation engine powered by Google Cloud's Vertex AI to personalize content delivery for their fans across multiple platforms. The system integrates event data, news content, game highlights, retail inventory, and user analytics to provide tailored recommendations for both sports events and entertainment content at Chase Center. The solution enables personalized experiences for 18,000+ venue seats while operating with limited technical resources."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-personalized-content-recommendations-for-sports-and-entertainment-venue"
  ogTitle: "Golden State Warriors: AI-Powered Personalized Content Recommendations for Sports and Entertainment Venue - ZenML LLMOps Database"
  ogDescription: "The Golden State Warriors implemented a recommendation engine powered by Google Cloud's Vertex AI to personalize content delivery for their fans across multiple platforms. The system integrates event data, news content, game highlights, retail inventory, and user analytics to provide tailored recommendations for both sports events and entertainment content at Chase Center. The solution enables personalized experiences for 18,000+ venue seats while operating with limited technical resources."
---

## Overview

The Golden State Warriors, a historic NBA franchise founded in 1946 with seven championships (most recently in 2022), embarked on a comprehensive digital transformation journey when they moved to their new venue, Chase Center, in 2019. This case study, presented at a Google Cloud event by Daniel Brusklowski (VP of Technology at the Warriors) and Miles from SADA (Google Cloud's implementation partner), details how the organization leveraged AI and machine learning to create personalized fan experiences across digital touchpoints.

The Warriors represent an interesting case in the LLMOps and AI space because they are fundamentally a sports and entertainment organization—not a technology company—yet they have embraced advanced AI systems to enhance their fan engagement. With fewer than 600 total employees and a core mission centered on basketball excellence and community engagement, they needed technology solutions that could be implemented with limited resources while delivering enterprise-grade personalization at scale.

## Business Context and Problem Statement

The challenge facing the Warriors was multi-faceted. After every game (82 regular season games plus preseason and playoffs), the organization produces an enormous volume of content: game previews, recaps, photo galleries, videos, player highlights, and associated editorial content. This creates what Daniel described as a "fire hose" of content. The fundamental question became: how do you get the right content to the right people at the right time on the right device in a way that makes sense for each individual fan?

Beyond game content, Chase Center hosts over 150 events per year, with only about 50 being Warriors games. The venue hosts concerts, family shows, and community events, meaning the content recommendation challenge extends across multiple genres and audience interests. The organization also operates in Thrive City (their 3-acre outdoor plaza), manages the Santa Cruz Warriors G-League team, runs an Esports operation, and recently acquired a WNBA expansion franchise starting in 2025.

The traditional approach of showing the same content to all visitors was insufficient for an organization positioning itself as a "media and entertainment organization that happens to play basketball." With 18,064 seats in Chase Center potentially representing 18,064 different desired experiences, personalization became a strategic imperative.

## Technical Architecture and Implementation

The solution centers on a Vertex AI-powered recommendation engine that the Warriors began developing approximately two years before the presentation (around 2022-2023). The architecture follows a clean separation of concerns with three main layers: data ingestion, AI processing, and delivery.

### Data Ingestion Layer

The system ingests multiple data sources:

- **Event Data**: All games, concerts, and events happening at Chase Center and Thrive City
- **Content Data**: News articles, game highlights, video content, and photo galleries from the content management system
- **Retail Inventory**: Product availability and merchandising data (a more recent addition)
- **User Analytics**: Behavioral data tracking what events, articles, and content users engage with

A critical enabler for this project was the Warriors' early adoption of BigQuery as their data warehouse, which began in 2017 when they first partnered with Google Cloud. Daniel emphasized that having years of historical data already organized in BigQuery made standing up the recommendation engine significantly easier. The data warehouse was designed to scale with organizational needs and enable future use cases that weren't yet imagined.

### AI Processing Layer

The core of the system is Google Cloud's Discovery Engine (part of Vertex AI), which processes the incoming data streams to generate personalized recommendations. The architecture uses Dataflow to transform raw user events and feed them into the Discovery Engine, which then merges content metadata with behavioral signals to produce recommendations.

The team was candid about their approach: they leveraged Google Cloud's pre-built APIs rather than building custom ML models from scratch. Daniel noted that "the amount of APIs that are now available to just basically start building" made it easier than ever to experiment and iterate quickly. This API-first approach allowed a small team without dedicated ML engineers to implement sophisticated recommendation capabilities.

### Delivery Layer (GSW API)

A key architectural decision was building an abstraction layer they call the "GSW API" (Golden State Warriors API). This middleware layer takes the output from the Discovery Engine and makes it consumable by various front-end applications. The philosophy behind this is "build once, deploy everywhere"—the same recommendation logic can power:

- The Warriors Plus and Chase Center mobile applications
- The Chase Center website (with a new design launching soon)
- CRM email campaigns with personalized content and retail recommendations
- Potentially future applications like in-arena screens, the scoreboard system, and IPTV systems

This abstraction approach is a pragmatic LLMOps pattern that allows the team to focus on customer experience (the "right side of the screen") rather than the underlying AI infrastructure (the "left side").

## Production Deployment and Results

The recommendation engine was already in production at the time of the presentation, with the team showing screenshots of an upcoming website redesign that would feature personalized content tiles. The key user-facing feature is that "every single person in this room will see something different on this tile" based on their historical engagement and current trending content.

Two specific recommendation contexts were highlighted:

- **Chase Center News**: Personalized article recommendations based on user interests and engagement history
- **Upcoming Events**: Tailored event suggestions based on genre preferences (rock concerts, pop, R&B, family shows) inferred from past behavior

The organization tracks brand health, NPS (Net Promoter Score), and customer satisfaction religiously, surveying fans to understand their expectations and matching internal priorities against this feedback. While specific metrics weren't shared, the team expressed confidence that the personalization efforts are "fundamentally impacting the fan experience and therefore our business in a positive way."

## Organizational and Operational Considerations

Several LLMOps-relevant operational insights emerged from the discussion:

**Resource Constraints**: The Warriors explicitly acknowledged they are "not a tech company" and have limited resources. The technology choices were driven by what could be implemented and maintained by a lean team. Google Cloud's managed services (BigQuery, Vertex AI, Firebase, App Engine) were chosen specifically because they reduce operational burden.

**Focus and Discipline**: Daniel repeatedly emphasized the importance of not chasing "shiny objects" or using "AI for the sake of using AI." The team limits themselves to a handful of high-impact projects per year, selected based on consumer research and organizational priorities. This disciplined approach to project selection is crucial for successful LLMOps in resource-constrained environments.

**Partner Ecosystem**: The Warriors didn't attempt to go it alone. They leveraged Google Cloud for infrastructure and AI capabilities, then partnered with SADA (described as Google Cloud's "back to back to back to back to back to back to back partner of the year") for implementation expertise. This white-glove onboarding approach, followed by handoff to an implementation partner, represents a common enterprise LLMOps pattern.

**Iterative Development**: The AI journey began with exploratory conversations in 2017-2018, well before generative AI became mainstream. The initial focus was on cloud infrastructure and data warehousing, which laid the groundwork for ML/AI capabilities to be added incrementally. The recommendation engine itself went through a pilot phase before production deployment.

## Technology Stack Summary

The complete technology stack mentioned includes:

- **Data Warehouse**: BigQuery (in use since 2017)
- **AI/ML Platform**: Vertex AI, specifically the Discovery Engine/Recommendation AI
- **Data Processing**: Dataflow for event transformation
- **Application Infrastructure**: Firebase, App Engine
- **Emerging Tools**: Gemini for Workspace (being explored), Vertex AI more broadly

## Future Directions

The team indicated they are "just scratching the surface" of what's possible. They mentioned ongoing experimentation with Gemini for Workspace and broader Vertex AI capabilities. The modular architecture (particularly the GSW API abstraction) positions them to expand AI-powered personalization to additional touchpoints like in-venue screens and the massive scoreboard (the largest indoor scoreboard in North America with over 25 million pixels).

## Critical Assessment

While the case study presents a compelling narrative, a few caveats are worth noting:

- The presentation was delivered at a Google Cloud event with SADA as co-presenter, so there's inherent promotional context
- Specific metrics on recommendation accuracy, engagement lift, or business impact were not shared
- The complexity of evaluating and monitoring recommendation quality in production wasn't addressed
- Details on A/B testing, model retraining, or handling cold-start problems were not discussed

That said, the case study provides a valuable template for sports and entertainment organizations (and similar content-heavy businesses) looking to implement AI-powered personalization with limited technical resources, emphasizing pragmatic architecture choices and managed services over custom ML development.