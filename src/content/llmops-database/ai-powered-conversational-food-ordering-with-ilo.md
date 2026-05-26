---
title: "AI-Powered Conversational Food Ordering with iLo"
slug: "ai-powered-conversational-food-ordering-with-ilo"
draft: false
llmopsTags:
  - "chatbot"
  - "question-answering"
  - "content-moderation"
  - "customer-support"
  - "prompt-engineering"
  - "latency-optimization"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "embeddings"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "fastapi"
  - "langchain"
  - "pinecone"
  - "chromadb"
  - "qdrant"
industryTags: "e-commerce"
company: "iFood"
summary: "iFood developed iLo, a conversational AI agent that transforms how millions of users discover and order food through natural language interactions across multiple channels including WhatsApp, in-app chat, and voice. The system addresses the classic recommender challenge of hyper-personalization at scale by combining traditional machine learning techniques with LLMs to understand complex user preferences including price sensitivity, dietary restrictions, location preferences, and taste profiles. Early results show 16% faster order completion compared to traditional search and 35% higher conversion from search to cart addition, with the system currently serving approximately half a million users as part of iFood's \"jet ski\" innovation model for rapid experimentation."
link: "https://www.youtube.com/watch?v=dH-1INvvELo"
year: 2026
seo:
  title: "iFood: AI-Powered Conversational Food Ordering with iLo - ZenML LLMOps Database"
  description: "iFood developed iLo, a conversational AI agent that transforms how millions of users discover and order food through natural language interactions across multiple channels including WhatsApp, in-app chat, and voice. The system addresses the classic recommender challenge of hyper-personalization at scale by combining traditional machine learning techniques with LLMs to understand complex user preferences including price sensitivity, dietary restrictions, location preferences, and taste profiles. Early results show 16% faster order completion compared to traditional search and 35% higher conversion from search to cart addition, with the system currently serving approximately half a million users as part of iFood's \"jet ski\" innovation model for rapid experimentation."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-conversational-food-ordering-with-ilo"
  ogTitle: "iFood: AI-Powered Conversational Food Ordering with iLo - ZenML LLMOps Database"
  ogDescription: "iFood developed iLo, a conversational AI agent that transforms how millions of users discover and order food through natural language interactions across multiple channels including WhatsApp, in-app chat, and voice. The system addresses the classic recommender challenge of hyper-personalization at scale by combining traditional machine learning techniques with LLMs to understand complex user preferences including price sensitivity, dietary restrictions, location preferences, and taste profiles. Early results show 16% faster order completion compared to traditional search and 35% higher conversion from search to cart addition, with the system currently serving approximately half a million users as part of iFood's \"jet ski\" innovation model for rapid experimentation."
notion:
  pageId: "366f8dff-2538-8019-bd0d-efc0772d6fca"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-20T15:33:00.000Z"
  lastEditedTime: "2026-05-20T15:33:00.000Z"
  publishedAt: "2026-05-20T15:37:21Z"
---

## Overview and Business Context

iFood, a major Brazilian food delivery platform processing hundreds of millions of orders per month, developed iLo as a conversational AI agent to revolutionize food discovery and ordering. The project emerged from iFood's "jet ski" innovation framework, which emphasizes rapid experimentation with small, agile teams that can test new concepts quickly and cheaply. This approach has previously generated entire business units including fintech services and grocery delivery. iLo represents a fundamental shift from search-based discovery to suggestion-based ordering, where users can express complex, multi-dimensional preferences through natural language rather than navigating filters and sorted lists.

The core challenge iFood faced was hyper-personalization at scale: serving millions of users with vastly different food preferences, economic profiles, location constraints, and ordering patterns. Traditional recommender systems excel at suggesting items within known user preferences but struggle with exploration—introducing users to new options they might enjoy but have never ordered. Additionally, factors like price sensitivity, delivery time preferences, restaurant ratings, and dietary restrictions create a complex multi-dimensional optimization problem that simple sorting and filtering cannot solve effectively.

## Technical Architecture and LLM Integration

The technical foundation of iLo centers around what the team calls the LCM (a summarization model that consolidates multiple recommendation approaches). The LCM serves as a comprehensive user profile that captures the full characteristics of each user, including their historical ordering patterns, taste preferences, price sensitivity, location preferences, and temporal behaviors. This profile becomes the foundation for making personalized recommendations that balance multiple competing factors.

Rather than relying solely on generative AI, iFood takes a hybrid approach that combines traditional machine learning, optimization techniques, and LLMs. The team explicitly notes that while LLMs are a crucial component, they represent just one part of a broader AI ecosystem that includes classical recommendation algorithms, collaborative filtering, and constraint optimization. The LCM essentially creates a rich semantic representation of the user that can be consumed by both traditional ML models and generative systems.

The system operates across multiple channels with different technical requirements and constraints. WhatsApp serves as an asynchronous text-based interface, the iFood app provides both traditional search and conversational modes with rich graphical rendering, and voice channels offer real-time synchronous interaction. Each channel requires different technical considerations, particularly around latency, response formatting, and interaction patterns.

## Multi-Channel Deployment and Experience Design

One of the most sophisticated aspects of iLo's LLMOps implementation is its multi-channel architecture that maintains consistent intelligence while adapting the user experience to each channel's constraints. The system is built with a flexible configuration layer using remote config parameters that allow the team to adjust behavior without code changes. This includes tuning the verbosity of responses, the number of items returned, the balance between exploration and exploitation in recommendations, and the acceptable latency thresholds.

For WhatsApp, iLo can take more time to respond since users expect asynchronous communication. The system can also be more verbose, sending longer descriptions and multiple messages. For voice interactions, the constraints are much tighter—latency must be minimal, responses must be concise, and the system cannot list multiple detailed options since listening to long descriptions is tedious. The team found that voice interfaces require a more concierge-like approach, quickly presenting one or two strong recommendations with brief explanations rather than comprehensive option lists.

The in-app experience leverages rich graphical components including image carousels, price comparisons, delivery time estimates, and rating displays. The team developed what they call "Tinder mode," where users can swipe through food options. This interaction pattern provides valuable data about user preferences beyond their ordering history, allowing the system to learn what appeals to users even when they don't ultimately order those items. This addresses the cold-start problem for new food categories and helps the system understand the boundaries of user preferences.

## Latency Optimization and Perceived Performance

Latency emerged as one of the most critical LLMOps challenges for iLo. The team extensively researched user perception of AI response times and found a complex relationship between latency and trust. Based on research from computer-supported cooperative work studies, they identified that responses between 4 and 16 seconds are generally acceptable for complex queries, but this varies significantly based on query complexity and channel.

If a system responds too quickly to a complex question, users suspect it didn't think deeply enough about the answer. If it's too slow for a simple query, users lose confidence. This led to a focus on both actual latency and perceived latency. For perceived latency, iLo employs several strategies: streaming responses that show text being generated in real-time, status messages that explain what the system is doing, and engaging content like trivia questions or personalized messages while users wait.

On the technical side, latency optimization required careful attention to data dependencies. The team learned that agent performance often bottlenecks not on the LLM itself but on external data sources. If iLo needs to fetch financial information, restaurant availability, or inventory data from other systems, those API calls can dominate the overall response time. The solution involved pre-computing what could be anticipated, establishing service-level agreements with other teams providing data, and implementing asynchronous workflows that fetch data in the background rather than in the critical path of the user interaction.

The team also made strategic decisions about model selection and intelligence trade-offs by channel. For voice, they might accept slightly less optimal recommendations if it means cutting latency by several seconds. For WhatsApp, they can invest more compute time in finding the absolute best match since users don't expect instant responses. This channel-specific calibration is managed through the remote configuration system, allowing rapid experimentation with different parameters.

## Recommendation Intelligence and the Exploration Challenge

The recommendation system tackles one of the hardest problems in personalization: how to expand beyond what you know a user likes. The example discussed extensively was a hypothetical user who only orders Japanese food. A naive system would keep recommending sushi indefinitely, but this creates a filter bubble that doesn't serve the user well long-term.

iLo addresses this through several mechanisms. First, the LCM profile captures not just what users have ordered but latent preferences inferred from their behavior patterns, including price sensitivity across different contexts, quality thresholds, delivery time tolerance, and affinities to flavor profiles rather than just cuisine types. Second, the system implements intelligent exploration strategies that test boundaries of user preferences with thoughtful suggestions that have some connection to known preferences.

A critical insight from their testing was the boundary between different preference dimensions. For example, every user has a personal definition of "cheap" that depends on their economic profile and the context of the meal. If a user asks for "a cheap burger," the system shouldn't just sort by price and return the absolute cheapest option, which might be low quality and unappealing. Instead, it needs to understand that user's quality-price boundary—the sweet spot where price is acceptable but quality remains good. This requires combining explicit signals (what they've ordered), implicit signals (what they've browsed but not ordered), and contextual factors (time of day, day of week, recent ordering patterns).

The Tinder-mode swiping interface provides particularly rich training data for this exploration challenge. When users swipe through options, the system learns from both positive signals (swiped right) and negative signals (swiped left), and it can present options that are deliberately outside the user's typical choices to gauge interest. This creates a much richer preference map than order history alone would provide.

## Prompt Engineering and Contextual Adaptation

While the specific prompt engineering techniques are not detailed, several LLMOps considerations emerge around how iLo formulates queries to the underlying LLMs. The system needs to balance several competing objectives: being conversational and natural, understanding imprecise or ambiguous requests, extracting structured information from unstructured queries, and providing explanations that justify recommendations without being verbose.

The team developed different verbosity profiles for different channels. For text-based interfaces, iLo might provide a brief explanation of why a recommendation fits. For voice, this gets compressed further. The system also handles progressive refinement—when a user's initial query is very open-ended, iLo can either ask clarifying questions (more natural in voice) or present diverse options to learn from the selection (better for graphical interfaces).

An interesting feature is the "Tell me about me" query, where iLo generates a personalized profile description based on the user's ordering history and inferred preferences. This creates a "wow moment" where users realize how well the system understands them, building trust in the recommendations. From an LLMOps perspective, this requires careful prompt design to generate engaging, accurate, and non-creepy descriptions of user behavior.

## Production Challenges and Lessons Learned

Several hard-won lessons emerged from deploying iLo at scale. First, the team emphasizes the importance of data governance and coordination across teams before scaling. Since iLo consumes data from multiple sources (restaurant menus, inventory systems, delivery logistics, user profiles, payment systems), any latency or reliability issues in those upstream systems directly impacts the agent's performance. The solution required cross-functional alignment and establishing clear service-level agreements before attempting to scale beyond pilot users.

Second, measuring success and understanding user sentiment proved surprisingly difficult. Traditional product metrics like NPS didn't translate well to the Brazilian market, where users often misinterpreted the questions. The team had to rely heavily on qualitative analysis of actual conversations, looking at where users expressed frustration, where they abandoned flows, and where they successfully completed orders. They also use LLM-as-judge approaches to automatically categorize and score conversations, though this requires careful validation.

Third, scope creep became an issue as users began treating iLo as a general-purpose customer service bot rather than specifically a food ordering agent. When users encountered problems with deliveries, payments, or account issues, they would report them through iLo. This created a challenge: ignoring such requests makes the system seem unhelpful, but handling them requires routing to different systems and potentially different agents. The team is still working through the question of whether to create specialized agents for different purposes with explicit handoffs, or to build one omnibus agent that can handle all iFood interactions behind a unified interface.

Fourth, the team learned that model selection and infrastructure decisions need to be channel-specific. For voice interactions, they found it crucial to use models that can process audio directly rather than using a speech-to-text layer followed by text processing, as the additional latency from the multi-stage pipeline was unacceptable. Modern multimodal models that can handle text, images, and audio in a single forward pass proved essential for meeting voice latency requirements.

## Experimentation and Iteration Framework

iLo follows iFood's jet ski methodology rigorously. The system started with a small pilot of around half a million users, allowing rapid iteration without risking the core food delivery business. The team runs continuous A/B tests on various parameters: different LLM models, different numbers of recommendations, different explanation styles, different UI components, and different latency optimization strategies.

Key metrics include order completion rate, time from search to checkout, search-to-cart-addition conversion rate, user retention, and session length. Early results showed a 16% improvement in order completion speed and 35% higher conversion from search to cart, which are substantial gains in a business where conversion rate and time to order directly impact revenue.

The remote configuration system allows the team to experiment with different agent behaviors without deploying new code. They can adjust parameters like how many items to show, whether to ask clarifying questions or make immediate suggestions, how to balance price versus quality in rankings, and how much explanation to provide with recommendations. This rapid experimentation capability is essential for the jet ski model—they can test hypotheses quickly, learn from real user behavior, and iterate toward product-market fit.

## Future Directions and Agent Ecosystem

The team is actively exploring proactive recommendations where iLo suggests food orders without explicit user requests, based on time of day, past patterns, and contextual signals. They're also working on more sophisticated multi-turn conversations where the agent can gather preferences through dialogue rather than requiring users to express everything upfront.

A broader question they're grappling with is the agent-to-agent future. As users increasingly adopt personal AI assistants, the interaction model shifts from human-to-iLo to user-agent-to-iLo. In this paradigm, the user's agent might negotiate with iLo on their behalf, and the user only gets involved for final decisions. This requires rethinking authentication, preference sharing, and how much autonomy to grant to automated agents.

The team also discussed whether to maintain a single unified agent that handles all iFood interactions or to create specialized agents (ordering agent, customer service agent, account management agent) that hand off to each other. Both approaches have merit: specialized agents can be optimized for specific tasks and maintain clearer boundaries, while a unified agent provides a simpler user experience without requiring users to understand which agent handles which task.

Overall, iLo represents a sophisticated production LLM system that carefully balances multiple technical constraints, user experience considerations, and business objectives across a complex multi-channel deployment serving millions of users in a latency-sensitive, personalization-heavy domain.
