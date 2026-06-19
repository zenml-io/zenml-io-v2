---
title: "Building Production-Grade Customer Experience Agents at Enterprise Scale"
slug: "building-production-grade-customer-experience-agents-at-enterprise-scale"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "question-answering"
  - "high-stakes-application"
  - "multi-modality"
  - "prompt-engineering"
  - "few-shot"
  - "model-optimization"
  - "error-handling"
  - "agent-based"
  - "harness-engineering"
  - "memory"
  - "latency-optimization"
  - "cost-optimization"
  - "fallback-strategies"
  - "system-prompts"
  - "mcp"
  - "a2a"
  - "evals"
  - "rag"
  - "fine-tuning"
  - "reranking"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "cicd"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "open-source"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "cache"
  - "langchain"
  - "anthropic"
  - "openai"
  - "google-gcp"
  - "meta"
industryTags: "tech"
company: "Sierra"
summary: "Sierra has built a comprehensive platform for deploying customer experience agents across sales, service, and loyalty touchpoints for Fortune 20 companies. The platform addresses the challenge of building reliable, low-latency conversational AI at enterprise scale by developing a modular architecture that orchestrates 10-15 different models per conversation turn, supports voice and multimodal experiences with sub-2-second latency requirements, and implements outcome-based pricing models tied to business results like sales conversions and customer satisfaction. Sierra serves most of the Fortune 20, handling use cases from airline booking and flight disruptions to retail product discovery and payment processing, with agents operating across 60+ languages and processing conversation volumes that would represent billions of annual interactions."
link: "https://www.youtube.com/watch?v=uCKhOmth2ms"
year: 2026
seo:
  title: "Sierra: Building Production-Grade Customer Experience Agents at Enterprise Scale - ZenML LLMOps Database"
  description: "Sierra has built a comprehensive platform for deploying customer experience agents across sales, service, and loyalty touchpoints for Fortune 20 companies. The platform addresses the challenge of building reliable, low-latency conversational AI at enterprise scale by developing a modular architecture that orchestrates 10-15 different models per conversation turn, supports voice and multimodal experiences with sub-2-second latency requirements, and implements outcome-based pricing models tied to business results like sales conversions and customer satisfaction. Sierra serves most of the Fortune 20, handling use cases from airline booking and flight disruptions to retail product discovery and payment processing, with agents operating across 60+ languages and processing conversation volumes that would represent billions of annual interactions."
  canonical: "https://www.zenml.io/llmops-database/building-production-grade-customer-experience-agents-at-enterprise-scale"
  ogTitle: "Sierra: Building Production-Grade Customer Experience Agents at Enterprise Scale - ZenML LLMOps Database"
  ogDescription: "Sierra has built a comprehensive platform for deploying customer experience agents across sales, service, and loyalty touchpoints for Fortune 20 companies. The platform addresses the challenge of building reliable, low-latency conversational AI at enterprise scale by developing a modular architecture that orchestrates 10-15 different models per conversation turn, supports voice and multimodal experiences with sub-2-second latency requirements, and implements outcome-based pricing models tied to business results like sales conversions and customer satisfaction. Sierra serves most of the Fortune 20, handling use cases from airline booking and flight disruptions to retail product discovery and payment processing, with agents operating across 60+ languages and processing conversation volumes that would represent billions of annual interactions."
notion:
  pageId: "384f8dff-2538-808a-8151-e5a81f2c8873"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-19T11:02:00.000Z"
  lastEditedTime: "2026-06-19T11:02:00.000Z"
  publishedAt: "2026-06-19T11:10:03Z"
---

## Overview

Sierra has developed an enterprise-grade platform for building and deploying customer experience agents that serve most of the Fortune 20 and approximately 40-50% of the Fortune 50-100. The company operates at the intersection of customer service, sales, and loyalty, enabling agents to handle complex, multi-turn conversations across voice and chat modalities. The platform distinguishes itself through its comprehensive approach to LLMOps challenges including model orchestration, latency optimization, security compliance, and outcome-based business alignment.

The platform's scope extends beyond traditional customer service to encompass the full customer lifecycle. For airlines, this includes flight browsing, booking, seat selection, pet-in-cabin additions, flight disruptions, and baggage handling. Sierra agents operate under outcome-based pricing models where the agent can earn commission on sales, fundamentally changing the economics and incentive alignment compared to traditional SaaS models. This pricing approach reflects confidence in delivering measurable business outcomes including increased customer satisfaction, resolution rates, and conversion rates.

## Platform Architecture and Agent Building

Sierra's platform is organized into three main sections: Analyze, Build, and Release. The Analyze section includes an explorer agent for deep research across customer conversations and data, reports, and monitors that function as always-on evaluators. The Build section features Ghostwriter, an agent similar to Cursor or Claude for Computers but specialized for building customer experience agents. It also includes a layer called Journeys, which represents the underlying source code but uses natural language and standard operating procedures rather than traditional code. The Release section handles collaboration, change management, and governance procedures essential for Fortune 20 deployment requirements.

The platform architecture has evolved through multiple layers. At the base is Agent OS, which manages a constellation of models and translates tasks into prompts and data injection across 10-15 different models that might be invoked for a single conversation turn. Some models are frontier models for top-tier reasoning, others are in-house fine-tuned models for specific tasks, and still others are classifier models optimized for cost and performance. Above this sits the Agent SDK, a code-based layer for agent orchestration and context management. However, over the past 18 months, most agent development has shifted to the no-code Journeys layer, which compiles deterministically and isomorphically down to Agent SDK code.

The Journeys DSL represents a careful balance between model capabilities and human-readable specification. The design philosophy involves meeting models where they are versus forcing new abstractions. For example, coding agents excel at file systems, Git, and grep, so Sierra materializes structures into these formats to leverage existing model strengths. However, for truly novel concepts specific to customer experience orchestration, Sierra invests in making models proficient through context engineering and fine-tuning. The team estimates this split at roughly 80% meeting models on their turf and 20% teaching models Sierra-specific concepts.

Ghostwriter has dramatically changed the learning curve for building agents. Users can describe high-level goals like orchestrating order returns, flight booking, or primary care referrals to specialists, and Ghostwriter already understands these concepts as an expert in Journeys. Critically, Ghostwriter writes Journeys directly rather than code, allowing users to inspect and understand the output. Teaching models the Journeys format has proven surprisingly tractable despite not being in training data, through careful prompt engineering and context injection.

## Model Orchestration and Selection

Sierra's approach to model orchestration represents sophisticated multi-model coordination. A typical conversation turn involves approximately one-third frontier model calls, one-third classifier models, and one-third speculative execution particularly for voice. Frontier models handle the bulk of reasoning but typically in only one or two inferences per turn. The remaining calls handle tasks like knowledge retrieval, classification, and preparatory work to maintain low latency.

The platform maintains deep modularity across model providers, driven both by technical requirements and capacity planning. No single provider leads across all dimensions, particularly for voice capabilities including transcription, synthesis, and native voice-to-voice models. Sierra can multi-home providers for any language, customer, or use case. This modularity proved essential during high-traffic events like Black Friday and Cyber Monday when capacity becomes the limiting factor. Load tests have simulated concurrency levels that would represent billions of annual conversations.

A concrete example of model ensembling involves transcription for thick UK accents from northern regions. One model delivers the highest quality transcription but hallucinates during silence more than others. Sierra runs two models in parallel: if the first model indicates silence, it's trusted; if not, the second model is trusted. This type of optimization would be impossible with a single-provider approach or without parallel execution capabilities.

The platform supports switching between model providers with relatively low friction when models are at comparable intelligence levels. The primary challenge lies in ensuring evaluations are robust enough to validate equivalent performance. Teams have discovered that attempting to switch models often reveals evaluation gaps, prompting eval improvements that strengthen the overall system. Changes during model switching primarily involve prompt adjustments to accommodate model-specific quirks, though tool availability may also constrain which models can handle specific tasks.

## Voice and Multimodal Experiences

Voice represents one of Sierra's most sophisticated technical achievements and accounts for the majority of Sierra conversations. The voice architecture looks fundamentally different from standard agent harnesses due to extreme latency constraints. Users expect responses within one to two seconds, otherwise they wonder if the connection is lost. This requirement has driven extensive parallelism throughout the system.

One major unlock involved parallelizing thinking, listening, and talking as separate concurrent processes. While listening, the agent begins thinking about potential responses. While talking, it continues listening for interruptions. This mirrors human conversation more accurately than sequential processing. Sierra has also invested heavily in progress indicators, where the agent says things like "hang on a second while I look up your account" to maintain engagement during longer operations.

Naturalism in voice extends beyond synthesis quality to what the agent actually says. Testing revealed that robotic-sounding responses often stem from robotic text rather than poor synthesis. The combination of natural language generation and high-quality voice synthesis creates compelling experiences. Multilingualism adds complexity, with Sierra supporting approximately 60 languages. Some languages like Hungarian have word error rates around 20% with even the best single transcription provider, necessitating multi-provider ensembling to reduce errors.

Sierra now has production agents running on native voice-to-voice models, representing a significant architectural shift. However, these models currently work reliably primarily for English, cost nearly an order of magnitude more than text-based approaches, and aren't yet as reliable for complex tool calling and instruction following. Consequently, voice-to-voice models serve a fraction of Sierra's market, specifically cases with simpler journeys where naturalism matters more than complex procedural logic.

The evolution of voice-to-voice model APIs has been instructive. Early APIs had poor developer ergonomics, bundling voice activity detection with model inference in ways that limited flexibility. Sierra's approach involves using the entire orchestration pipeline and piping input audio with prompt context into audio models for last-mile synthesis. This preserves control over conversation flow while leveraging voice model capabilities. The team estimates that voice-to-voice models won't serve more than 50% of traffic for at least 18-24 months, primarily due to multilingual requirements and cost considerations.

## Knowledge Management and Context Engineering

Sierra emphasizes context engineering as the key to great agent building, which they define as showing agents everything they need to do the right thing but nothing more. As models improve, precision requirements for "everything they need" and "nothing more" have both relaxed somewhat, allowing less spoon-feeding of context. Early Agent SDK versions focused on only exposing exactly what models needed at each step. The current generation is more like presenting the right dish rather than individual bites, with future iterations potentially allowing even less structure.

Progressive disclosure represents a critical context engineering principle. Bringing information into the prompt should happen only when relevant, but removing context through prompt compaction must avoid creating incoherence. If one part of the prompt contradicts another due to lossy compression, agent performance degrades significantly. The team has learned that when agents appear to be performing poorly, the issue is almost always prompt engineering rather than model limitations. A key insight is that when models seem too dumb, they're actually too smart and detecting contradictions or confusion in the provided context.

Prompt caching receives pragmatic treatment at Sierra. While the team doesn't invalidate caches without good reason, quality always comes first over cache optimization. When agent outcomes are highly valuable (selling $100 products or generating $1,000 lifetime value customers), the cost savings from cache optimization pale in comparison to quality improvements. This allows Sierra to prioritize context correctness over cache maintenance.

For knowledge retrieval specifically, Sierra built in-house fine-tuned models running on open-weights base models. This decision came from hitting the limits of out-of-the-box retrieval and reranking models. The research team evaluates these custom models against alternatives, but the decision to build in-house comes only when pushing state-of-the-art in areas critical to customer value. Sierra generally avoids building models that require many millions of dollars in training runs, leaving frontier model development to OpenAI, Anthropic, and Google.

## Agent Data Platform and Memory

The Agent Data Platform represents Sierra's approach to combining structured ML data with unstructured conversational context. Large language models excel at in-the-moment empathy, understanding emotional context like frustration from a delayed flight or urgency from being late to a reservation. However, they lack deeper understanding of customer preferences that previous-generation recommender systems capture well. The Agent Data Platform integrates with customer data platforms and internal systems, or operates on Sierra-native data, using machine learning models to power customer-specific strategies.

A concrete application involves sales offers. Structured data might indicate the right offer to present, but pure ML-based presentation feels stilted. LLMs understand how to present offers naturally, attribute them appropriately, and weigh multiple offers based on conversational context. This combination appears frequently in sales, loyalty, and retention conversations.

Memory functions as a first-class primitive on the Sierra platform. During conversations, the system can store memories either implicitly through automatic detection or explicitly when the agent decides something is worth remembering. Future conversations with the same identified customer can extract these memories. Examples include greeting customers by name, remembering previous call topics, acknowledging past frustrating experiences, or recalling preferences like aisle seats or in-flight internet usage.

Authentication represents a critical constraint for memory systems. Phone numbers don't guarantee identity due to shared office lines or family phones. Every business must define policies for memory extraction and classify memories by sensitivity level. Saying "Harrison, thanks for calling again" poses minimal risk, while "Are you calling about your social security number?" requires stringent verification.

Memory can be configured at three levels. First, journey builders can specify important information to remember like birthdays. Second, at conversation start, builders can define remembering priorities. Third, agents can automatically identify important information worth storing based on conversational context. From a retrieval perspective, individual customer memories are typically three orders of magnitude smaller than knowledge bases, making the retrieval and ranking problem relatively simple regardless of storage structure.

## Evaluation and Monitoring

Sierra's evaluation strategy differs between internal Agent OS development and customer-facing agent building. Internally, evaluations resemble those at any applied AI company, testing individual tasks across the model constellation. For customers, the evaluation problem becomes far more complex due to conversation variability.

The Simulations product addresses customer evaluation needs by supporting adversarial users, background noise in voice, persona-based testing across 20+ saved personas, and comprehensive coverage of the high-dimensional space including voice, chat, multiple languages, and various user archetypes. Quality simulations serve as a clear indicator of agent building maturity. They enable teams to make improvements confidently while ensuring no regressions, particularly important for large teams managing complex agents with extensive capabilities.

Monitors provide always-on evaluation of production conversations. They run on every conversation, flagging items for review or issue creation based on configurable criteria. This frees customer teams from reading thousands of conversations daily, instead reviewing perhaps five flagged conversations for confidence before proceeding with their day. Monitors represent one of Sierra's most popular features because they enable focus on strategic improvements like customer satisfaction and resolution rate rather than manual conversation review.

The concept of monitoring the monitors reflects Sierra's philosophy that "the solution to all problems with AI is more AI." When something is 90% accurate, build a verifier that's 90% accurate, then verify that verifier at 90% accuracy, achieving three or four nines of reliability through layered non-deterministic systems. This approach acknowledges that perfect determinism isn't achievable with LLMs but that layered verification can reach enterprise reliability requirements.

Sierra has released multiple benchmarks in the TAL-bench suite including TAL-bench for tool calling and process following, TAL-voice for voice capabilities, TAL-knowledge for knowledge retrieval, and MU-bench for multilingual transcription. These benchmarks emerged from internal needs and positive external reception. They primarily evaluate providers rather than agents, helping Sierra assess new models. For instance, when exciting new transcription models emerge, Sierra requests MU-bench results before deeper evaluation. For actual production agents, customer-specific simulations provide more relevant evaluation than general benchmarks.

## Reinforcement Learning and Post-Training

Sierra has extensively explored reinforcement learning, attracted by two promises: increasing model quality ceilings and enabling similar task performance on more models (particularly open-weights models approaching frontier model performance). In practice, enterprise RL has delivered more on the second promise than the first.

Two major challenges limit RL deployment. First, non-deterministic model behavior creates regurgitation risk. Sierra never fine-tunes models on data that could be inappropriately regurgitated, making this a non-starter for many use cases. Second, frontier models improve so rapidly that agility matters more than optimization for slightly older model generations. RL makes sense for areas like knowledge retrieval where Sierra pushes state-of-the-art, but often represents a rounding error against natural model improvements over 3-6 month horizons.

Recent interest in RL has been driven more by cost than capability. When frontier model performance is good but costs are prohibitive (particularly for coding and similar high-volume tasks), teams investigate training smaller models to achieve similar performance at lower cost. At Sierra, capacity rather than cost has driven multi-provider support, particularly for retail customers during Black Friday and Cyber Monday spikes. Load tests simulating billions of annual conversations require resilience to individual provider downtime and capacity to use whichever provider can serve at scale.

## Security and Compliance: Payments Infrastructure

Sierra invested heavily in payments infrastructure before it made obvious business sense, a long-term bet on agentic commerce exceeding e-commerce. The platform achieved PCI DSS Level 1 certification, becoming the only voice payments platform at launch where customers don't need to transfer to another system for checkout. This certification came from a QSA (Qualified Security Assessor) and involved substantial operational work.

The payments infrastructure runs on completely isolated clusters where payment information never reaches external LLM providers, since none are PCI-certified appropriately. This required spinning up separate infrastructure, achieving security certification, and ensuring all operational procedures met security assessor requirements. The investment reflects belief that agentic commerce where personal AI assistants like Claude or ChatGPT transact with brand agents will exceed e-commerce's hundreds of billions of dollars and percentage points of GDP.

Sierra supports both direct customer-to-agent interactions and agent-to-agent commerce through protocols like MCP (Model Context Protocol). Sierra agents can function as MCP servers, making their capabilities available to ChatGPT and other platforms. For example, Redfin's AI search runs on a Sierra agent both on Redfin's website and as a ChatGPT app. While some argue brands could expose raw APIs instead of agents, Sierra's position is that platforms help brands present products optimally, streamline checkout, and handle complex presentation logic that goes beyond simple API calls.

## Continual Learning and Automation

Sierra's continual learning pipeline currently keeps humans in the loop but approaches increasing automation. Monitors can automatically detect issues, Ghostwriter can automatically suggest fixes, and humans review before deployment. In the near future, Sierra agents will begin improving themselves autonomously in high-confidence scenarios, similar to how employees provide FYI updates for some work and request approval for others.

For example, if a knowledge article contains a contradiction and the agent can verify the correct answer from the website with high confidence, it might send an FYI rather than requesting approval. All primitives for this automation exist; the constraint is customer comfort level and appropriate confidence thresholds. Most Fortune 20 customers want to review every agent change given the business criticality, and Sierra won't pull the future forward faster than customers want.

The Explorer agent functions as deep research for customer context and conversation data, similar to ChatGPT's deep research but domain-specific. Users can ask questions like why resolution rates dipped or how to generate more sales. Explorer can run on daily schedules, proactively identifying issues and partnering with Ghostwriter to suggest fixes. Under the hood, Explorer and Ghostwriter are converging toward a shared harness expert in using Agent Studio through file system architectures that map to product structures and increasingly powerful tools like knowledge base creation.

## Developer Experience and Team Structure

Sierra has pioneered an agent builder role that combines customer intuition, technical depth, agency, product judgment, communication skills, intensity, and leadership. The role emerged from discovering that enterprise sales dynamics combined with consumer-grade end products creates unique requirements. Agent builders develop deep relationships with individual enterprise customers while maintaining focus on consumer-grade conversational experiences.

The AI-native interview process involves building a complete product end-to-end over several hours, then reviewing with a team. This reveals how candidates think about scope, what they consider their job versus off-limits, and whether they extend beyond expected boundaries to build great products. Agency becomes visible through how much candidates believe is in their control versus fixed externally.

Coding agents have changed the equation for product development, creating what Sierra calls the "faster car, more pit stops" dynamic. Formula 1 cars need more frequent tire changes than regular cars because they drive faster and burn more rubber. Similarly, coding agents enable much faster code production and review, but product judgment and customer intuition are needed more frequently, not less. People who bring these skills themselves can operate in tight loops with coding agents. Teams where these skills are siloed between roles need even tighter collaboration including more frequent standups.

The forward-deployed engineering or agent builder model has proven particularly effective. Many successful team members have experience in both engineering and product management roles. The multidisciplinary approach matters more than ever as systems thinking and architecture design remain critical for directing coding agents effectively, while customer conversation skills and agency determine how well builders can discover and deliver value.

## Multi-Agent Systems

Sierra takes a skeptical stance toward multi-agent systems, believing they're often less useful than builders expect. Teams should examine their motivations carefully. If the goal is allowing separate teams to work on separate agents, that's shipping the org chart. If the goal is conceptual comfort from separating concerns, that's not optimizing for impact.

A common anti-pattern involves one agent doing triage and another executing tasks. This architecture deprives the task agent of triage context and deprives the triage agent of procedural information, destroying value. Sierra agents typically represent a single brand with proper context engineering eliminating the need for separation.

Multi-agent systems make sense only for truly separable jobs where earlier context provides no value to later tasks. However, as of May 2026, such cases are rare. Organizational difficulties might occasionally justify quality drops, but optimizing purely for quality rarely benefits from multi-agent architectures compared to better context engineering. The team maintains a monolith-loyalist position on this topic.

## Outcome-Based Pricing Model

Outcome-based pricing represents perhaps the primary operational reason for Sierra's success with Fortune 20 companies. It aligns incentives between Sierra and customers in ways that cut through prioritization debates and resource allocation complexity typical of enterprise partnerships. When delivering $100 outcomes and keeping a portion, everyone rows in the same direction.

The model will likely become the norm for differentiated, high-value activities. Commoditized capabilities like simple knowledge lookups suit usage-based or seat-based pricing due to simplicity. But outcomes like membership sales or car purchases carry sufficient value that companies gladly pay premium percentages.

Pricing must be customer-specific because outcome value varies dramatically. Troubleshooting complex device setup averaging 20 turns with extensive context engineering differs fundamentally from quick TV signal resets or balance checks. Outcomes might range from tens of dollars to much lower values depending on complexity and business value.

Within single customers, Sierra sometimes differentiates pricing between outcome types but avoids dogmatism. The alignment benefits are so high that over-engineering specific outcome values misses the forest for the trees. Most customers prefer simple, mutually understood, fair arrangements over perfect value engineering. Incentive alignment, trust building, and expanding into new use cases over time matter more than pricing precision.

The relative rarity of outcome-based pricing stems partly from products becoming more similar to what raw token purchases could create as models improve, and partly from the space being very early. Sierra expects significant growth in outcome-based models as the market matures, paralleling how customers care about work output rather than hours invested.
