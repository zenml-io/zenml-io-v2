---
title: "Scaling LLM and ML Models to 300M Monthly Requests with Self-Hosting"
slug: "scaling-llm-and-ml-models-to-300m-monthly-requests-with-self-hosting"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67f513bd5e28e00ccae41eaf"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:05:35.863Z"
  createdOn: "2025-04-08T12:17:01.461Z"
llmopsTags:
  - "question-answering"
  - "classification"
  - "high-stakes-application"
  - "realtime-application"
  - "cost-optimization"
  - "latency-optimization"
  - "error-handling"
  - "fallback-strategies"
  - "docker"
  - "redis"
  - "postgresql"
  - "load-balancing"
  - "monitoring"
  - "databases"
  - "cache"
  - "fastapi"
  - "scaling"
  - "devops"
  - "microsoft-azure"
  - "amazon-aws"
industryTags: "media-entertainment"
company: "StoryGraph"
summary: "StoryGraph, a book recommendation platform, successfully scaled their AI/ML infrastructure to handle 300M monthly requests by transitioning from cloud services to self-hosted solutions. The company implemented multiple custom ML models, including book recommendations, similar users, and a large language model, while maintaining data privacy and reducing costs significantly compared to using cloud APIs. Through innovative self-hosting approaches and careful infrastructure optimization, they managed to scale their operations despite being a small team, though not without facing significant challenges during high-traffic periods."
link: "https://www.youtube.com/watch?v=ZFQq5Djd5JY"
year: 2024
seo:
  title: "StoryGraph: Scaling LLM and ML Models to 300M Monthly Requests with Self-Hosting - ZenML LLMOps Database"
  description: "StoryGraph, a book recommendation platform, successfully scaled their AI/ML infrastructure to handle 300M monthly requests by transitioning from cloud services to self-hosted solutions. The company implemented multiple custom ML models, including book recommendations, similar users, and a large language model, while maintaining data privacy and reducing costs significantly compared to using cloud APIs. Through innovative self-hosting approaches and careful infrastructure optimization, they managed to scale their operations despite being a small team, though not without facing significant challenges during high-traffic periods."
  canonical: "https://www.zenml.io/llmops-database/scaling-llm-and-ml-models-to-300m-monthly-requests-with-self-hosting"
  ogTitle: "StoryGraph: Scaling LLM and ML Models to 300M Monthly Requests with Self-Hosting - ZenML LLMOps Database"
  ogDescription: "StoryGraph, a book recommendation platform, successfully scaled their AI/ML infrastructure to handle 300M monthly requests by transitioning from cloud services to self-hosted solutions. The company implemented multiple custom ML models, including book recommendations, similar users, and a large language model, while maintaining data privacy and reducing costs significantly compared to using cloud APIs. Through innovative self-hosting approaches and careful infrastructure optimization, they managed to scale their operations despite being a small team, though not without facing significant challenges during high-traffic periods."
---

## Overview

StoryGraph is a book tracking and recommendation application that helps readers discover books based on their mood and preferences. The company grew from approximately 1,000 users in June 2020 to over 6 million monthly active users by January 2024, all while being run by a two-person team with a single engineer (Rob) handling all AI, machine learning, and DevOps responsibilities. This case study, presented by Rob at NDC Porto and covering experiences through January 2025, provides valuable insights into building and operating ML and LLM infrastructure at scale with minimal resources.

The core technical challenge was delivering AI-powered features—including book mood classification, recommendation engines, personalized previews, and content moderation—to millions of users while maintaining profitability as a freemium app where only a small fraction of users pay for the service. This required radical cost optimization and a willingness to self-host virtually everything, including large language models.

## The ML/AI Journey

Rob's journey into AI began with the Fast.AI deep learning course, which taught a practical, hands-on approach to machine learning rather than starting with heavy mathematical theory. His first production ML model was built to classify books by mood, turning what was previously a weeks-long manual process into seconds of automated classification. This initial success led to increasingly sophisticated ML integrations over the following years.

The ML models deployed at StoryGraph include:

- Book mood classification models for categorizing books by emotional content
- A recommendation engine that analyzes reading history and preferences
- "Personalized preview" features that help readers determine if a specific book is a good fit for them
- A computer vision model trained to detect whether uploaded images are actual book covers (content moderation)
- Similar users/readers matching models
- Approximately a dozen specialized ML models in total

## LLM Integration and Scale

The most significant LLMOps aspect of this case study is the deployment of large language models for the "story graph preview" and "personalized preview" features, which were released approximately 18 months before the January 2025 timeframe. These features analyze user preferences and reading history to determine book compatibility, and they require LLM inference for every book page load.

The scale of LLM operations is substantial: approximately 1 million LLM requests per average day, translating to roughly 10 requests per second during typical usage. During the presentation, Rob demonstrated a live view showing real-time requests hitting the LLM infrastructure.

A critical decision was made to self-host LLMs rather than using external APIs like ChatGPT. This decision was driven by two primary factors:

**Privacy**: StoryGraph's community values data privacy, and self-hosting guarantees that user data never leaves their infrastructure. This is particularly important for a reading-focused app where book preferences and reading history can reveal sensitive personal information.

**Cost**: Rob calculated that using GPT-4 for their LLM use cases would cost approximately $770,000 per month at their scale. By self-hosting, they achieve the same functionality at a fraction of the cost. This cost differential is existential for a freemium app with millions of free users—external LLM APIs would make the business model completely unviable.

The LLM implementation took approximately six months of experimentation and iteration to find a solution that worked effectively while remaining economically sustainable. This extended development time highlights the real-world challenges of deploying LLMs in production, especially when cost constraints are tight.

## Infrastructure Evolution and Self-Hosting Strategy

The infrastructure journey represents a significant theme in this case study. StoryGraph started on Heroku, the industry-standard platform for Ruby on Rails applications, but quickly discovered that cloud costs were unsustainable for a freemium business model.

The original Heroku setup cost over $100,000 per year:
- Three performance L web servers at $500/month each
- PostgreSQL database (Standard 9) at $5,800/month for 500GB RAM to hold the entire database
- Elasticsearch at $1,086/month (highest tier required)
- Memcached at $66/month

After migrating to dedicated servers (Hetzner), the costs dropped dramatically while performance improved:
- Web servers: 4x cores, 9x memory at 1/5 the price
- Database: Same specs at less than 1/10 the price
- Elasticsearch: 4x cores, 8x memory, 3 servers instead of 2, at 30% of the price
- Total: Approximately $114/month with significantly better specifications

This migration required learning to manage backups, deployment, software installation, security, failover, and load balancing. Cloud 66 was adopted as a management layer at approximately $10/month per server to handle these operational concerns, making the self-hosting transition manageable for a small team.

## Queuing and Distributed Processing

A significant technical challenge was managing ML inference jobs across multiple servers. Rob experimented with several approaches before landing on Redis-based queuing:

**Failed approach 1: Watch folder with file conflicts** - Servers would "fight" for files by uploading timestamped empty files and comparing timestamps. This approach was unreliable and complex.

**Failed approach 2: Direct load balancing** - Eight servers behind a load balancer each processed requests directly. This failed when requests took 30-60 seconds (typical for ML inference), causing timeouts when more than a few users submitted requests per minute.

**Successful approach: Redis queuing** - Using Redis (which also powers Sidekiq for Ruby on Rails), Rob implemented a simple queuing system. The key insight was that Redis's `BRPOP` command naturally manages server ordering—any number of servers can listen for queue items, and Redis ensures orderly distribution without conflicts.

This architecture enabled a creative approach to maximizing compute resources: any machine with a GPU can join the cluster to process ML jobs without opening network ports. Rob mentioned that even the laptop used to give the presentation was processing live requests from the app. This "unused GPU is a wasted GPU" philosophy maximizes hardware utilization.

## Database Scaling with YugabyteDB

One of the most technically significant decisions was migrating from PostgreSQL to YugabyteDB, an open-source PostgreSQL-compatible distributed database. This was prompted by the January 2024 outage when the single PostgreSQL database couldn't handle the traffic surge (100,000 Goodreads imports × 1,000 rows each × 10 pieces of information = approximately 1 billion inserts during peak traffic).

The YugabyteDB cluster deployed was substantial:
- 10 servers initially, scaled to 60 servers for January 2025
- 960 cores total
- 2.5 TB RAM
- 40 TB storage
- Cost: approximately $2,000/month (compared to a single Heroku database at much higher cost)

However, the migration required query optimization. Some queries that ran in 100ms on PostgreSQL took 400 seconds on YugabyteDB initially. Three techniques were used to optimize queries:

**CTE Rewriting**: Converting queries to Common Table Expressions allowed YugabyteDB to more efficiently distribute query execution across servers. ChatGPT was used to automate this conversion—the original query was pasted in, and ChatGPT rewrote it as a CTE, with testing on staging to verify correctness and performance.

**Additional Indexes**: Distributed databases require more indexes than single-server databases because scanning across multiple servers is expensive. The extra write overhead from additional indexes was offset by the increased capacity from having more servers.

**Denormalized Tables**: For complex join queries, denormalized tables were created that pre-join data, reducing multi-table lookups to single-table scans. The trade-off is manual management of data consistency using Rails triggers.

## Production Incidents and Lessons Learned

The case study details multiple production incidents that provide valuable operational insights:

**June 2020 (20,000 users)**: Two-week outage when a viral tweet drove unexpected traffic. Core ML features were down while the team learned to scale.

**January 2024 (6 million users)**: Database overwhelmed by traffic and Goodreads imports. Temporary fixes included disabling imports and adding read replicas, but replication sync issues caused continued problems. The issue was never fully resolved—traffic naturally decreased as users gave up or completed their setup.

**November 2024**: Tik Tok virality increased daily unique visitors from 150,000 to 1 million. The HAProxy load balancer's network became saturated despite low CPU usage. The solution was installing HAProxy locally on each web server, eliminating the network bottleneck, and adding PGBouncer for connection pooling.

**January 2025**: The most recent outage was caused by an HAProxy session persistence cookie that pinned users to the same server throughout their session. Two servers were handling 700-800 sessions each while eight others handled only 20 each. Users who randomly got assigned to overloaded servers experienced multi-minute page loads. Removing the cookie setting resolved the issue immediately.

## Self-Hosted Alternatives to Cloud Services

Beyond infrastructure, StoryGraph self-hosts several services that would otherwise be expensive cloud subscriptions:

- **Analytics**: Self-hosted PostHog instead of Mixpanel (which would cost $100,000+/year at their scale) for approximately $400/month
- **Monitoring**: Self-hosted SigNoz instead of Datadog for approximately $100/month
- **All ML/LLM inference**: Self-hosted on dedicated GPU servers

Most self-hosted services were installed with single Docker commands, demonstrating that self-hosting has become significantly more accessible.

## Key Takeaways for LLMOps

This case study offers several practical insights for teams considering self-hosted LLM deployments:

The cost differential between API-based LLMs and self-hosted models can be enormous at scale—in this case, $770,000/month versus a fraction of that. For applications with high LLM request volumes and limited per-request revenue, self-hosting may be the only viable path.

Privacy guarantees are simpler with self-hosted models. Rather than relying on API provider policies and data processing agreements, self-hosting ensures data never leaves controlled infrastructure.

LLM deployment requires significant experimentation time. The six months spent developing the preview features reflects the real-world iteration required to achieve acceptable quality and cost efficiency.

Queuing systems are essential for ML inference that takes seconds rather than milliseconds. Redis provides a simple, battle-tested solution for distributing inference jobs across multiple GPU servers.

Maximizing hardware utilization matters when self-hosting. Any available GPU (including personal devices) can be added to the inference cluster to handle peak loads.

The combination of timing, open-source tooling, and accessible GPU hardware has made sophisticated ML/LLM deployment achievable for small teams. The key success factor emphasized throughout the presentation is persistence and willingness to learn through trial and error rather than formal training or advanced degrees.