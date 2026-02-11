---
title: "AI-Powered Betting Assistant for Sports Wagering Platform"
slug: "ai-powered-betting-assistant-for-sports-wagering-platform"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6932b36bff302a78c340e789"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:33:42.276Z"
  createdOn: "2025-12-05T10:26:51.931Z"
llmopsTags:
  - "chatbot"
  - "customer-support"
  - "question-answering"
  - "high-stakes-application"
  - "realtime-application"
  - "regulatory-compliance"
  - "rag"
  - "prompt-engineering"
  - "agent-based"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "few-shot"
  - "evals"
  - "human-in-the-loop"
  - "serverless"
  - "api-gateway"
  - "databases"
  - "redis"
  - "cache"
  - "postgresql"
  - "monitoring"
  - "fastapi"
  - "guardrails"
  - "amazon-aws"
  - "anthropic"
industryTags: "media-entertainment"
company: "FanDuel"
summary: "FanDuel, America's leading sportsbook platform handling over 16.6 million bets during Super Bowl Sunday 2025, developed AAI (an AI-powered betting assistant) to address friction in the customer betting journey. Previously, customers would leave the FanDuel app to research bets on external platforms, often getting distracted and missing betting opportunities. Working with AWS's Generative AI Innovation Center, FanDuel built an in-app conversational assistant using Amazon Bedrock that guides customers through research, discovery, bet construction, and execution entirely within their platform. The solution reduced bet construction time from hours to seconds (particularly for complex parlays), improved customer engagement, and was rolled out incrementally across states and sports using a rigorous evaluation framework with thousands of test cases to ensure accuracy and responsible gaming safeguards."
link: "https://www.youtube.com/watch?v=XmBDchavCW8"
year: 2025
seo:
  title: "FanDuel: AI-Powered Betting Assistant for Sports Wagering Platform - ZenML LLMOps Database"
  description: "FanDuel, America's leading sportsbook platform handling over 16.6 million bets during Super Bowl Sunday 2025, developed AAI (an AI-powered betting assistant) to address friction in the customer betting journey. Previously, customers would leave the FanDuel app to research bets on external platforms, often getting distracted and missing betting opportunities. Working with AWS's Generative AI Innovation Center, FanDuel built an in-app conversational assistant using Amazon Bedrock that guides customers through research, discovery, bet construction, and execution entirely within their platform. The solution reduced bet construction time from hours to seconds (particularly for complex parlays), improved customer engagement, and was rolled out incrementally across states and sports using a rigorous evaluation framework with thousands of test cases to ensure accuracy and responsible gaming safeguards."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-betting-assistant-for-sports-wagering-platform"
  ogTitle: "FanDuel: AI-Powered Betting Assistant for Sports Wagering Platform - ZenML LLMOps Database"
  ogDescription: "FanDuel, America's leading sportsbook platform handling over 16.6 million bets during Super Bowl Sunday 2025, developed AAI (an AI-powered betting assistant) to address friction in the customer betting journey. Previously, customers would leave the FanDuel app to research bets on external platforms, often getting distracted and missing betting opportunities. Working with AWS's Generative AI Innovation Center, FanDuel built an in-app conversational assistant using Amazon Bedrock that guides customers through research, discovery, bet construction, and execution entirely within their platform. The solution reduced bet construction time from hours to seconds (particularly for complex parlays), improved customer engagement, and was rolled out incrementally across states and sports using a rigorous evaluation framework with thousands of test cases to ensure accuracy and responsible gaming safeguards."
---

## Overview

FanDuel's AAI (AI betting assistant) represents a comprehensive production deployment of large language models in a highly regulated, high-stakes environment. As America's number one sportsbook, FanDuel processes massive volumes—over 16.6 million bets during Super Bowl Sunday 2025 alone, with nearly 3 million active users and peaks of 70,000 bets per minute. The company operates in a complex regulatory landscape where sports betting rules vary significantly by state, with strict data residency requirements governed by the Wire Act ensuring all betting transactions remain within state boundaries.

The genesis of AAI came from a global hackathon in early 2024 where FanDuel brought together hundreds of participants—engineers, data scientists, business leads, and C-suite executives—to identify the best opportunities for applying generative AI. The winning concept addressed a fundamental friction in the customer journey: bettors would research information outside the FanDuel app (on Google, TikTok, etc.), get distracted, and miss betting opportunities. The typical customer journey involved research, discovery of available bets, bet construction (especially complex parlays), and execution—a process that could take hours and frequently resulted in abandoned betting sessions.

## Partnership and Development Approach

FanDuel partnered with AWS's Generative AI Innovation Center, a global team of strategists and scientists dedicated to delivering generative AI solutions at scale (AWS invested over $200 million in this team). The engagement started modestly with just one FanDuel engineer working alongside 3-4 AWS data scientists in an advisory capacity—essentially "office hours" for guidance on architecture, service selection, and code sharing. This humble beginning created a "train the trainer" effect, with that initial engineer becoming a catalyst for broader AI adoption across FanDuel. The partnership eventually expanded to 15 engagements, 10 of which reached production, with 20-30 more planned.

The development process followed a structured path: validation of the idea through a 60-minute diagnostic call with senior executives and engineering leads; a discovery workshop to identify customer needs, challenges, KPIs, and requirements; rapid prototyping; and finally, production rollout. The entire journey from concept to production deployment happened remarkably quickly—in a matter of weeks, not months or years—demonstrating the value of rapid experimentation and consistent APIs for model interaction.

## Architecture and Technical Implementation

The production architecture of AAI is built on AWS serverless technologies, with API Gateway handling rate limiting, authentication, and authorization at the entry point. AWS Lambda functions serve as the primary compute layer, chosen specifically because FanDuel didn't initially know what traffic volumes to expect. Lambdas provide serverless scaling with low memory requirements and handle routing logic and data collection.

The system implements a retrieval-augmented generation (RAG) pattern with multiple data sources. EC2 instances and EKS clusters host the main sportsbook services and data that feed the LLMs. Amazon RDS stores player and team statistics. ElastiCache (Redis) provides caching for frequently accessed data—critical for performance since multiple customers often bet on the same games. DynamoDB serves dual purposes: caching frequently accessed data and, crucially, storing conversation history to provide context for the LLM.

Amazon Bedrock serves as the foundational model platform, chosen for several key reasons: ease of learning and quick team onboarding, wide model selection enabling experimentation, serverless scaling without infrastructure management, and cost-effective token-based pricing. FanDuel experimented with multiple models including Claude Haiku and Meta Llama before settling on Amazon Nova Light and Nova Pro for their balance of performance and cost-effectiveness. The consistent Bedrock API enabled rapid prototyping without developers needing to manage multiple proprietary SDKs, custom authentication frameworks, or disparate observability systems—they could simply flip a model ID to experiment with different LLMs.

## Data Flow and Intent-Based Routing

AAI implements a multi-intent workflow pattern. When a customer prompt arrives, the system first makes an "get intent" call to Bedrock to determine what the customer wants. Based on this intent classification, Lambda functions route requests to appropriate data sources—RDS for statistics, EC2/EKS instances for sportsbook services. The retrieved information is sent back to Bedrock for enhancement and formatting before being rendered to the customer.

Different intent types receive different handling. Responsible gaming prompts (like "I'm going to lose my house") trigger immediate static responses directing users to responsible gaming resources. Statistical queries ("stats about Donovan Mitchell") fetch data from RDS, which Bedrock then formats according to the prompt. Bet construction requests pull from multiple sources to assemble complex parlays.

## Context Management and Conversation History

A critical technical challenge emerged around context management. Initially, the team didn't fully anticipate the need for conversation memory. When customers asked follow-up questions using pronouns ("create a parlay for him" after asking about Donovan Mitchell), the LLM lacked context to understand the reference. This issue became particularly acute with multiple players and teams in conversation.

The solution involved using DynamoDB as conversation memory. For each new prompt, the system retrieves previous prompts from that customer session and provides them to the LLM, enabling contextual understanding. This represents an important learning about the paradigm shift required for generative AI development—traditional functional testing and development cycles don't directly translate, and teams must understand LLM-specific behaviors like hallucinations and the need for explicit context.

## Performance Optimization and Latency Reduction

Latency posed a significant challenge. FanDuel operates with a "1-second rule" for search responses, but initial AAI implementations had P99 latency of 12 seconds—unacceptable for customer experience. The team employed both traditional and AI-specific optimization strategies. Traditional approaches included aggressive caching in Redis for commonly requested data (like tonight's game information that multiple customers would query). AI-specific optimizations involved working with AWS to fine-tune models and select more efficient model variants.

These combined efforts reduced P99 latency from 12 seconds to approximately 5 seconds—still above the 1-second ideal but acceptable for complex conversational interactions. The case demonstrates that model optimization alone isn't sufficient; traditional architectural patterns like caching remain crucial for LLM-based applications.

## Handling Real-Time Sports Complexity

Sports betting presents unique real-time challenges. During live games, particularly fast-paced ones like basketball, odds change constantly. When LeBron James approaches a scoring milestone, the probability and pricing must update in real-time. This creates challenges for both customers and LLMs in constructing bets quickly enough.

FanDuel's solution for live scenarios limits AAI to single bets rather than complex parlays. When customers request parlays during live games, the system explains that live parlays aren't available but offers relevant single-bet alternatives. This represents a pragmatic production decision—prioritizing accuracy and user experience over feature completeness in challenging edge cases.

## Customer Behavior and Vagueness Handling

A key insight from production deployment: customers treat conversational AI like search engines, using vague keywords rather than complete sentences. When a customer types simply "bets," AAI responds conversationally by asking clarifying questions—which sport (NFL, NBA, NHL), which game, which player. This multi-turn dialogue mirrors human conversation and guides customers to specific betting opportunities through a suggestion-based approach.

The system also handles sports-specific slang and colloquialisms—"LBJ" for LeBron James, "the birds" for the Philadelphia Eagles. While the team acknowledges this isn't an exhaustive solution and remains an ongoing challenge, they've implemented mappings for common terms. This highlights the long-tail nature of production LLM systems where edge cases continually emerge.

## Responsible Gaming and Safety

Responsible gaming is central to AAI's design, reflecting FanDuel's commitment to setting industry standards as a responsible operator. The system includes explicit safeguards to detect concerning prompts related to problem gambling and immediately responds with links to responsible gaming resources. This represents a critical difference from the prototype stage, where edge cases like "I'm going to bet my house" weren't handled—acceptable in prototyping but unacceptable in customer-facing production.

The assistant is explicitly designed as a research and discovery tool, not a recommender system. It doesn't suggest bets autonomously but responds to customer prompts, maintaining customer control throughout the journey. This design philosophy balances AI assistance with human judgment, avoiding full autonomy in favor of an assistive approach where customers retain decision-making authority at each step.

## Evaluation Framework and Testing Strategy

Traditional test-driven development cycles don't translate well to LLM applications, so FanDuel developed a comprehensive evaluation framework. They created test suites with thousands of test cases organized into categories, each with defined accuracy thresholds. Any change to four critical factors—the model, the prompt, the data, or the code—triggers evaluation against these thresholds.

Results are categorized as regression (below threshold, requiring investigation), progression (above threshold, potentially establishing new baselines), or meeting expectations. This provides quantitative metrics for model changes, data shifts, and code updates. When AWS released Nova Light 2 (mentioned as releasing "yesterday" during the talk), FanDuel could immediately test it against their benchmark suite to ensure no regression.

Beyond static testing, data scientists monitor live customer interactions through a feedback loop, using both static and dynamic evaluations with ground truth comparisons. This discovers new categories of interactions and prompts, feeding back into the test suite—creating a continuous improvement cycle. The team chose accuracy as their primary production metric over more academic measures like precision and recall, though those remain relevant for data science teams.

## Rollout Strategy and Incremental Deployment

FanDuel's rollout strategy emphasized learning and accuracy through incremental deployment: one sport at a time, one state at a time. The alpha pilot involved a small group of "friendly customers" providing rapid feedback on how the chatbot worked and how they interacted with it. This progressed to beta releases throughout 2025 (Q1, Q2, and ongoing beta 3), gradually expanding geographic and sport coverage.

This cautious approach reflects the high-stakes nature of sports betting—errors could result in financial losses, regulatory violations, or damage to customer trust. The incremental strategy also supported their learning objectives around customer behavior patterns and technical performance under varying loads.

## Model Sensitivity and Drift Management

The team discovered that models are highly sensitive to changes in multiple dimensions. Data sources used by AAI (the "tools") are often shared with other FanDuel services, so changes made for other purposes can impact LLM performance. Customer prompt patterns evolve over time as users learn to interact with conversational AI more effectively. Model updates from providers introduce potential performance shifts. All these factors create drift that must be monitored and managed.

The evaluation framework addresses this by treating any change as a trigger for testing. This comprehensive approach ensures that external factors (shared service changes) and user behavior evolution don't silently degrade performance. It represents mature thinking about production LLM operations where model performance isn't static but requires ongoing monitoring and adjustment.

## Future Directions and Emerging Technologies

FanDuel is actively exploring several emerging technologies. They're evaluating Model Context Protocol (MCP) for internal use cases. Bedrock Agent Core, launched at AWS New York Summit, offers primitives for runtime, identity, and observability specifically designed for agentic AI applications. While Lambda functions have served AAI well, Agent Core provides capabilities for workloads ranging from milliseconds to 8-hour durations, potentially better suited as AAI adds more features and complexity.

API Gateway streaming responses represent another area of active investigation. This capability allows streaming Bedrock responses live to users rather than batching or chunking, potentially improving user experience further. FanDuel is also exploring AWS's Strands SDK to provide consistent patterns for building generative AI applications.

## Metrics and Business Impact

While the presentation focused heavily on technical implementation, business metrics were noted. The most dramatic impact: bet construction time dropped from hours (particularly for complex parlays) to seconds. Internal research showed customers typically spent hours researching and constructing parlays; AAI reduced this to mere seconds in demonstrations. This time reduction directly addresses the core problem—customers leaving the app, getting distracted, and missing betting opportunities.

Success metrics span three categories: event-based (counting AAI usage, measuring drop-off rates, tracking abandoned bets), time-based (total journey time, time per subsection like bet construction), and interactive (CSAT and direct customer feedback). This multi-dimensional measurement approach provides visibility into both technical performance and customer satisfaction.

## Production Lessons and Paradigm Shifts

The case study emphasizes several paradigm shifts required for production LLM operations. Generative AI development differs fundamentally from traditional software development in testing approaches, debugging methodologies, and quality assurance. Teams must develop new intuitions about model behavior, understand hallucination patterns, and design for probabilistic rather than deterministic systems.

The importance of consistent APIs and platforms (like Bedrock) cannot be overstated for rapid experimentation. Traditional approaches like caching remain highly relevant alongside AI-specific optimizations. The need for explicit context management through conversation history storage represents a non-obvious requirement that emerged through production experience. Finally, incremental rollout with rigorous evaluation frameworks provides the safety and learning necessary for high-stakes applications in regulated industries.

FanDuel's journey from hackathon idea to production deployment in weeks demonstrates what's possible with appropriate partnerships, clear problem definition, rapid prototyping philosophy, and willingness to learn from production deployment rather than seeking perfection before launch.