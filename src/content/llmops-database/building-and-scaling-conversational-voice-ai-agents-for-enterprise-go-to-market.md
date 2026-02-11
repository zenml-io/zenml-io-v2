---
title: "Building and Scaling Conversational Voice AI Agents for Enterprise Go-to-Market"
slug: "building-and-scaling-conversational-voice-ai-agents-for-enterprise-go-to-market"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "693be48d2f7ddf86bb27c019"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:36:11.904Z"
  createdOn: "2025-12-12T09:46:53.127Z"
llmopsTags:
  - "customer-support"
  - "healthcare"
  - "regulatory-compliance"
  - "realtime-application"
  - "multi-modality"
  - "prompt-engineering"
  - "latency-optimization"
  - "cost-optimization"
  - "agent-based"
  - "multi-agent-systems"
  - "error-handling"
  - "fallback-strategies"
  - "semantic-search"
  - "vector-search"
  - "evals"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "scaling"
  - "serverless"
  - "orchestration"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "cache"
  - "redis"
  - "langchain"
  - "spacy"
  - "openai"
  - "google-gcp"
  - "meta"
  - "hugging-face"
industryTags: "tech"
company: "Thoughtly / Gladia"
summary: "Thoughtly, a voice AI platform founded in late 2023, provides conversational AI agents for enterprise sales and customer support operations. The company orchestrates speech-to-text, large language models, and text-to-speech systems to handle millions of voice calls with sub-second latency requirements. By optimizing every layer of their stack—from telephony providers to LLM inference—and implementing sophisticated caching, conditional navigation, and evaluation frameworks, Thoughtly delivers 3x conversion rates over traditional methods and 15x ROI for customers. The platform serves enterprises with HIPAA and SOC 2 compliance while handling both inbound customer support and outbound lead activation at massive scale across multiple languages and regions."
link: "https://www.youtube.com/watch?v=5Z68pPGc9QM"
year: 2025
seo:
  title: "Thoughtly / Gladia: Building and Scaling Conversational Voice AI Agents for Enterprise Go-to-Market - ZenML LLMOps Database"
  description: "Thoughtly, a voice AI platform founded in late 2023, provides conversational AI agents for enterprise sales and customer support operations. The company orchestrates speech-to-text, large language models, and text-to-speech systems to handle millions of voice calls with sub-second latency requirements. By optimizing every layer of their stack—from telephony providers to LLM inference—and implementing sophisticated caching, conditional navigation, and evaluation frameworks, Thoughtly delivers 3x conversion rates over traditional methods and 15x ROI for customers. The platform serves enterprises with HIPAA and SOC 2 compliance while handling both inbound customer support and outbound lead activation at massive scale across multiple languages and regions."
  canonical: "https://www.zenml.io/llmops-database/building-and-scaling-conversational-voice-ai-agents-for-enterprise-go-to-market"
  ogTitle: "Thoughtly / Gladia: Building and Scaling Conversational Voice AI Agents for Enterprise Go-to-Market - ZenML LLMOps Database"
  ogDescription: "Thoughtly, a voice AI platform founded in late 2023, provides conversational AI agents for enterprise sales and customer support operations. The company orchestrates speech-to-text, large language models, and text-to-speech systems to handle millions of voice calls with sub-second latency requirements. By optimizing every layer of their stack—from telephony providers to LLM inference—and implementing sophisticated caching, conditional navigation, and evaluation frameworks, Thoughtly delivers 3x conversion rates over traditional methods and 15x ROI for customers. The platform serves enterprises with HIPAA and SOC 2 compliance while handling both inbound customer support and outbound lead activation at massive scale across multiple languages and regions."
---

## Overview

Thoughtly is a conversational voice AI platform that was started in late 2023 by founder and CEO Tori Leonard, making it one of the first companies in the voice AI space. Alex, who joined as head of engineering in August 2024 and later became CTO and co-founder, shared detailed insights into the technical architecture and LLMOps challenges of building production voice AI systems at scale. The platform focuses on omni-channel AI agents that handle voice, phone, SMS, and email across the entire customer journey, with particular strength in conversational go-to-market use cases like outbound lead activation and inbound customer support.

The company has processed millions of calls and moved upmarket from initially serving SMBs to now serving large enterprises and mid-market companies. Their customers report 3x conversion rates over traditional contact methods and 15x return on investment. The platform is HIPAA and SOC 2 compliant, reflecting the maturity needed to serve enterprise customers in regulated industries.

## Technical Architecture and Orchestration

The core of Thoughtly's system involves orchestrating multiple AI services in real-time to create natural conversational experiences. When a caller speaks, the audio travels through several layers: first to a phone carrier, then to a Voice over IP (VoIP) provider, which sends the audio to Thoughtly's platform. The orchestration pipeline then involves:

**Speech-to-Text Processing**: The audio is transcribed into text format using providers like Gladia, which was specifically chosen for supporting over 100 languages—critical for global expansion. The goal is to achieve end-of-turn detection and time-to-first-byte latencies in the 50-150 millisecond range, compared to 400-700 milliseconds that was typical a year prior.

**Language Model Processing**: The transcribed text goes to a large language model (currently using GPT-4, with experimentation on GPT-4.1 nano for faster inference) which performs two critical functions:
- **Step Finding**: Determining where the caller is in the overall conversation workflow that customers have defined
- **Response Generation**: Creating appropriate responses based on the current step, which may involve pulling information from knowledge bases or making external API calls to CRM systems like Salesforce or HubSpot

**Text-to-Speech Generation**: The LLM's text response is converted back to audio using TTS providers. While 11Labs was mentioned for quality, alternatives like Cartesia were discussed for faster inference. The team evaluates providers using the TTS Arena leaderboard and focuses on both quality and latency characteristics.

**Media Playback**: The generated audio is sent back through the VoIP provider and carrier to the caller.

Each conversation turn involves this complete loop, and a typical call may have dozens of turns. The total cost per call includes fees at each layer (STT, LLM inference, TTS, VoIP, carrier fees) plus infrastructure costs, making cost optimization critical for unit economics.

## Latency Optimization Strategies

Latency is perhaps the most critical technical challenge in production voice AI. The team defines latency as the time from when a caller finishes speaking to when the agent begins responding. Target latencies are in the hundreds of milliseconds to maintain natural conversation flow. If an agent takes 4-5 seconds to respond, callers assume something is wrong and may interrupt, causing the system to cancel partially-generated responses and restart the loop.

Several sophisticated optimization techniques are employed:

**Speculative Computing and Caching**: The team experiments with predicting common responses and pre-generating them. For example, if certain conversational paths are deterministic (only 3-4 possible responses), the system can cache TTS output for frequently used phrases and skip both LLM and TTS inference entirely for those turns.

**Selective LLM Bypass**: In some cases, the team bypasses the LLM entirely for certain conversation turns, using mathematical approaches instead. When responses are highly predictable, they use cosine similarity scoring against cached responses rather than invoking the LLM, reducing latency from ~300ms to near-instant. This works by computing vector similarity between the current conversation state and pre-computed instruction embeddings, selecting the closest match above a confidence threshold.

**Parallel Vendor Calls**: For critical paths, the system can send requests to multiple vendors simultaneously and use whichever responds first, as long as it meets quality thresholds. This hedging strategy helps manage tail latencies.

**Smart Request Routing**: The team experimented with sending partial responses to TTS before the LLM fully completes generation, masking LLM latency with TTS processing. However, this introduces risk if the caller says something unexpected that requires a completely different response.

**Infrastructure Decisions**: The team evaluated on-premises model hosting versus API-based services. They found that the rapid improvement in commercial API latencies (50-150ms for STT now versus 400-700ms a year ago) eliminated the need for self-hosting, especially considering that network hops within AWS alone add ~150ms of latency. Self-hosting also introduces GPU cold start problems (10-20 minutes to provision), making it difficult to handle traffic spikes efficiently. The team uses WebSocket connections instead of REST APIs in certain cases for lower latency.

Latency requirements also vary by use case and customer expectations. Some customers want agents to speak slower or wait longer after a caller pauses before responding, so the platform provides controls to adjust these parameters.

## Evaluation and Testing Frameworks

Building robust evaluation (eval) frameworks has been critical to the team's ability to move fast without breaking production. As Alex noted, "having good evals will save us time ultimately and it's a very important sanity check." The team developed these capabilities through hard experience rather than planning from the beginning.

Their eval approach includes:

**Golden Dataset Development**: Creating curated datasets of conversation examples that represent key use cases, edge cases, and quality benchmarks. These datasets are used to replay conversations and test how different models or configurations would perform.

**Regression Testing**: When evaluating new models (e.g., GPT-4 vs GPT-4.1 nano) or vendors, the team runs golden datasets through both options and uses cosine similarity and other metrics to detect regressions in response quality or navigation accuracy.

**Model Comparison**: Since the market evolves rapidly with new models releasing frequently, having automated evals allows the team to quickly benchmark whether a new release (from OpenAI, Google, or other providers) actually improves their use cases enough to justify switching. This is particularly important because the market may look very different in 3-6 months when a development effort completes, so decisions must account for anticipated improvements across the ecosystem.

**Internal Benchmarking**: The team maintains internal benchmarks across different dimensions: latency at each layer (STT, LLM, TTS), accuracy, conversation quality, and business metrics like conversion rates. This allows them to make informed tradeoffs.

The team has not yet adopted third-party eval platforms like Koval or Hawk, having built internal capabilities, but acknowledged these tools could be valuable for teams entering the space now.

## Accuracy and Conditional Navigation

Beyond latency, accuracy in determining conversation state and generating appropriate responses is critical. The team built a "conditional navigation" feature that allows agents to intelligently route to different conversation nodes based on external API responses or earlier caller statements. For example, if a caller provides a date of birth indicating they're under 18, the agent can navigate to an age-appropriate conversation path.

This requires the LLM to maintain conversation context, understand the workflow defined by the customer, and make reliable decisions about which step comes next. The team uses a "language model as a judge" pattern in combination with vector similarity scoring to improve reliability. By having multiple verification layers—mathematical/vector-based and LLM-based—they can achieve higher accuracy than using either alone.

## Infrastructure and Scaling Challenges

Thoughtly has built infrastructure to handle millions of calls with high reliability requirements. Key considerations include:

**Regional Distribution**: Servers are deployed globally to serve customers in different countries with lower latency. The platform supports over 100 languages through Gladia's STT capabilities, enabling truly global deployment.

**Traffic Prediction**: The team maintains close communication with sales to understand expected volume from new customers. For outbound campaigns, predicting traffic is easier (e.g., calling West Coast leads between 8-9 AM), but inbound support traffic can spike unpredictably if a customer's website goes down. The team over-provisions capacity and designs for elastic scaling.

**Defensive Coding**: Writing code that anticipates failure modes and scales gracefully is critical. The team focuses on knowing where the product will be in 3-6 months and building slightly ahead of current needs without over-engineering.

**Monitoring and Alerting**: Like wearing an Apple Watch to monitor health metrics, the team has comprehensive monitoring to detect issues before they become critical. The goal is to "break a little" (indicating pushing the boundaries) but not "break too much" (causing outages).

**Database and Cache Design**: Smart caching at multiple layers—TTS output, common responses, external API results—reduces load and improves latency. The team carefully considers what to cache, for how long, and how to invalidate stale data.

**WebSocket vs HTTP**: For certain high-throughput scenarios, the team migrated from HTTP APIs to WebSocket connections to reduce overhead and improve real-time performance.

## Compliance and Enterprise Requirements

Serving enterprises required significant investment in compliance and security. Thoughtly is both HIPAA compliant (critical for healthcare customers) and SOC 2 compliant (required by most enterprises). Achieving compliance involves:

- Robust data privacy and encryption
- Multi-tenancy with strong data segregation
- Security controls and access management
- Documentation of processes and controls
- Regular audits

For HIPAA, much of the work is self-declaration of processes, though audits can verify claims. SOC 2 is more rigorous, requiring demonstration of controls before certification. The team recommended tools like Devel and Vanta for startups pursuing compliance, as well as fractional Chief Information Security Officers (CISOs) as a middle ground before hiring full-time compliance staff.

One lesson learned: keeping the vendor and infrastructure stack lean makes compliance much easier. When Gladia went through certifications, they found that having too many disparate providers created a "nightmare" of documentation and risk assessment. Thoughtly benefited from this insight.

## Product Integration and Vertical Focus

Beyond the core voice capabilities, Thoughtly provides extensive integrations with CRM systems (Salesforce, HubSpot), booking platforms (Calendly, Cal.com), and other tools. These integrations are API-based rather than using newer standards like Model Context Protocol (MCP), primarily due to latency concerns—having the LLM decide autonomously when to call an MCP server introduces variable latency that can disrupt conversation flow.

The team emphasized the importance of vertical focus. While voice AI can theoretically serve any industry (making it tempting to go horizontal), going deep in specific verticals provides:

- Domain-specific insights that competitors lack
- Ability to build specialized workflows and integrations for that vertical
- Learning that compounds (insights from one customer in healthcare apply to others in healthcare)
- Stronger defensibility and first-mover advantages

This vertical approach also guides ML investment decisions. If the team invests in custom model training or fine-tuning for a specific vertical, those improvements benefit all customers in that vertical, creating better ROI than horizontal improvements.

## Machine Learning Investment Decisions

The team thinks carefully about when to invest in custom ML versus using off-the-shelf models. Key considerations include:

**Market Evolution Rate**: If they invest 3-6 months in training a custom STT model to improve accuracy, will commercial providers like Gladia or OpenAI have improved enough in that timeframe to eliminate the advantage? The market moves extremely fast, making some ML investments obsolete before completion.

**Vertical Applicability**: ML investments make more sense when going vertical. A custom model trained on dental office conversations benefits all dental customers, whereas horizontal improvements have less compounding benefit.

**Cost vs Performance**: Commercial APIs have steadily decreased in price while improving quality. The team found that self-hosting GPUs often costs more when accounting for over-provisioning (needed for P95/P99 latency guarantees), cold start issues, and engineering overhead.

**Latency Gains**: Some ML investments (like hosting models on-premises) were pursued for latency improvements but became unnecessary as commercial APIs reached sufficiently low latency (&lt;150ms for STT).

The team previously experimented with on-premises STT hosting but found it wasn't worth the infrastructure complexity and cost given the rapid improvement in commercial offerings.

## Customer Expectations and Market Maturity

The market for voice AI has matured significantly since Thoughtly's founding in late 2023. Initially, customers were largely experimental—testing AI capabilities without intent to buy. Now, customers have clearer expectations and are ready to purchase production systems.

However, expectations vary dramatically by industry. Banking customers (Chase, Capital One) have extremely low tolerance for hallucinations and expect near-perfect accuracy. Other industries are more forgiving. Understanding and managing these different expectations is an ongoing challenge.

The team also noted that as customers learn more about AI capabilities, they expect continuous improvement. This creates pressure to not just maintain quality but constantly improve, which requires thinking 3-6 months ahead about where the market will be.

## Cost Structure and Unit Economics

The all-in cost per call includes:

- STT processing (per minute of audio)
- LLM inference (per token generated)
- TTS generation (per character)
- VoIP provider fees
- Carrier fees
- Server infrastructure
- Company operational expenses (salaries, etc.)

These costs are all decreasing over time as:
- Cloud providers compete on price
- AI model costs drop (as seen with OpenAI, Anthropic, etc.)
- Infrastructure becomes more efficient

Additionally, better AI agents complete calls faster by navigating conversations more efficiently, reducing per-call duration and thus cost. This creates a virtuous cycle where quality improvements also improve unit economics.

The team mentioned that pricing may shift from per-minute (like traditional call centers) to outcome-based pricing (per successful resolution, per conversion), aligning incentives around results rather than time spent.

## Development Velocity and Culture

Alex emphasized the importance of strong engineering culture and code quality for maintaining high development velocity. Key principles include:

**Minimal Technical Debt**: Not leaving "dead bodies" in the codebase. The team hired engineers focused on code quality and structure to prevent legacy debt from accumulating.

**Staying Current**: Constantly evaluating new models, vendors, and techniques to ensure the stack remains competitive.

**Clear Prioritization**: With many potential features, the team ruthlessly prioritizes based on customer needs and long-term vision. They stay close to customers to understand real pain points.

**Effective Cross-Org Communication**: Engineering stays in close contact with sales to anticipate traffic, with product to align on roadmap, and with customers to understand requirements.

**Avoiding Distractions**: Not constantly comparing with competitors but focusing on unique value and unaddressed customer needs.

The team is hiring engineers in their New York office, looking for individuals who can thrive in this fast-moving environment.

## Lessons Learned and Recommendations

For teams building in the voice AI space, key recommendations include:

**Focus on Delivering Value**: Many companies can generate revenue by letting customers experiment with AI, but true success requires solving real problems and delivering measurable results.

**Go Vertical**: Pick a specific industry and go deep rather than trying to serve everyone horizontally. This builds defensibility and compounds learnings.

**Invest in Evals Early**: Good evaluation frameworks save enormous time and enable confident, rapid iteration.

**Think Ahead**: Make decisions based on where the market will be in 3-6 months, not just where it is today, given the rapid pace of improvement across all layers of the stack.

**Choose Vendors Carefully**: Not all vendors are equal. Benchmark thoroughly and choose partners who can scale with you (like Gladia for multi-language support).

**Lean Infrastructure**: Keep the vendor stack as small as possible, especially if compliance is important. Too many providers creates complexity.

**Balance Speed and Quality**: Move fast enough that things occasionally break (indicating you're pushing boundaries) but not so fast that you create serious reliability issues.

**Optimize the Full Stack**: Latency and cost optimization require attention to every layer—STT, LLM, TTS, networking, caching—not just one area.

The voice AI market is enormous (500 billion hours of audio generated annually in customer support and meetings) with massive opportunity for automation. Multiple winners will emerge serving different use cases, similar to how the internet hosting market has AWS, Vercel, Cloudflare, and others coexisting. The key is execution, focus, and building something customers truly need.