---
title: "AI-Powered Travel Assistant for Rail and Coach Platform"
slug: "ai-powered-travel-assistant-for-rail-and-coach-platform"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6908853a41d25af05a3b7325"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:22:25.978Z"
  createdOn: "2025-11-03T10:34:34.714Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "question-answering"
  - "summarization"
  - "realtime-application"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "agent-based"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "system-prompts"
  - "evals"
  - "error-handling"
  - "fallback-strategies"
  - "langchain"
  - "pinecone"
  - "guardrails"
  - "monitoring"
  - "api-gateway"
  - "orchestration"
  - "databases"
  - "open-source"
  - "anthropic"
  - "amazon-aws"
industryTags: "tech"
company: "Trainline"
summary: "Trainline, the world's leading rail and coach ticketing platform serving 27 million customers across 40 countries, developed an AI-powered travel assistant to address underserved customer needs during the travel experience. The company identified that while they excelled at selling tickets, customers lacked support during their journeys when disruptions occurred or they had questions about their travel. They built an agentic AI system using LLMs that could answer diverse customer questions ranging from refund requests to real-time train information to unusual queries like bringing pets or motorbikes on trains. The solution went from concept to production in five months, launching in February 2025, and now handles over 300,000 conversations monthly. The system uses a central orchestrator with multiple tools including RAG with 700,000 pages of curated content, real-time train data APIs, terms and conditions lookups, and automated refund capabilities, all protected by multiple layers of guardrails to ensure safety and factual accuracy."
link: "https://www.youtube.com/watch?v=bZsXtfgrw_k"
year: 2025
seo:
  title: "Trainline: AI-Powered Travel Assistant for Rail and Coach Platform - ZenML LLMOps Database"
  description: "Trainline, the world's leading rail and coach ticketing platform serving 27 million customers across 40 countries, developed an AI-powered travel assistant to address underserved customer needs during the travel experience. The company identified that while they excelled at selling tickets, customers lacked support during their journeys when disruptions occurred or they had questions about their travel. They built an agentic AI system using LLMs that could answer diverse customer questions ranging from refund requests to real-time train information to unusual queries like bringing pets or motorbikes on trains. The solution went from concept to production in five months, launching in February 2025, and now handles over 300,000 conversations monthly. The system uses a central orchestrator with multiple tools including RAG with 700,000 pages of curated content, real-time train data APIs, terms and conditions lookups, and automated refund capabilities, all protected by multiple layers of guardrails to ensure safety and factual accuracy."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-travel-assistant-for-rail-and-coach-platform"
  ogTitle: "Trainline: AI-Powered Travel Assistant for Rail and Coach Platform - ZenML LLMOps Database"
  ogDescription: "Trainline, the world's leading rail and coach ticketing platform serving 27 million customers across 40 countries, developed an AI-powered travel assistant to address underserved customer needs during the travel experience. The company identified that while they excelled at selling tickets, customers lacked support during their journeys when disruptions occurred or they had questions about their travel. They built an agentic AI system using LLMs that could answer diverse customer questions ranging from refund requests to real-time train information to unusual queries like bringing pets or motorbikes on trains. The solution went from concept to production in five months, launching in February 2025, and now handles over 300,000 conversations monthly. The system uses a central orchestrator with multiple tools including RAG with 700,000 pages of curated content, real-time train data APIs, terms and conditions lookups, and automated refund capabilities, all protected by multiple layers of guardrails to ensure safety and factual accuracy."
---

## Overview

Trainline is the world's leading rail and coach ticketing platform, operating across 40 countries with over 27 million customers including 18 million in the UK. Originally starting as a phone-based booking service (hence the name), the company has evolved into a comprehensive digital platform that aggregates tickets from hundreds of train operators, making cross-border and multi-operator rail travel significantly easier for consumers. The company's core strength has been simplifying the ticket purchasing process, but they recognized a significant gap in the post-purchase travel experience.

The challenge Trainline identified was that customers had underserved needs during their actual travel journeys. Drawing parallels to other consumer tech like food delivery where real-time tracking and updates have become expected, Trainline saw an opportunity to provide similar support for rail travel. They broke down the problem space into three key areas: helping customers know what's happening with their journey, understanding the severity of any problems, and providing solutions when issues arise. This ranges from simple notifications about cancellations (which they were already doing with millions of push and email messages) to more complex scenarios like understanding whether a bridge disruption or an animal on the tracks represents a serious delay, and ultimately helping customers resolve their issues through an AI assistant.

## Technical Architecture and Agentic Approach

What makes Trainline's implementation particularly notable is their bold decision to build a fully agentic system from the very beginning. When they started this project in August 2023 (with production launch in February 2025), LLMs had only been widely available for about two years, and agentic reasoning capabilities were still relatively unproven at scale. The UK market had not seen this kind of AI assistant solution deployed at Trainline's scale, making this a genuinely pioneering effort.

The team built a proof of concept in just two months to validate whether LLMs could reliably reason through diverse customer situations and select appropriate tools to call. This POC featured a central orchestrator with a small set of tools: a simple vector database, a terms and conditions lookup tool, and a mock refund endpoint. The validation demonstrated that the system could reliably route queries to the appropriate tool - calling the terms and conditions tool for policy questions, using information retrieval for general queries, and triggering the refund endpoint when customers asked about refunds.

The production architecture maintains this core principle of a single central orchestrator working in an agentic loop, deciding when it has completed its task. The orchestrator has access to multiple tools that can be either simple API calls or more complex agent-based systems. This architectural choice was made when such patterns were still emerging, requiring the team to place a bet on an approach that hadn't yet been standardized. They adopted key engineering principles including separation of concerns both in tool structure and service architecture, ensuring the system would be maintainable and scalable from day one.

The orchestrator now integrates with approximately seven hundred thousand pages of curated content, real-time train positioning APIs, journey itinerary tools, terms and conditions lookups, and refund processing capabilities. The system can access real-time information about train delays, platform changes, station amenities, and disruptions ranging from infrastructure problems to animals on tracks. Importantly, the assistant also has the ability to seamlessly hand off conversations to human agents when appropriate, particularly for sensitive situations like bereavement or serious illness.

## RAG Implementation and Information Retrieval

The retrieval-augmented generation component of Trainline's system evolved from about 450 documents in the POC to 700,000 pages of information in production. This massive scale-up required careful engineering to maintain performance and accuracy. The team built the vector database infrastructure to be scalable from the start, but encountered numerous challenges in the data preparation and retrieval pipeline.

One significant challenge was extracting data from CMS systems that weren't designed to feed AI systems. The team had to build internal scrapers to pull content from their website, then carefully parse HTML markup to create clean inputs for the vector database. The content itself presented complexity - individual paragraphs often covered multiple subjects and could be quite lengthy. For example, a paragraph about Eurostar seating needed to retain "Eurostar" context for semantic relevance but including the entire paragraph would introduce too much noise and lead to hallucinations.

The solution involved implementing sophisticated semantic chunking strategies that could break down content while preserving necessary context. The team had to navigate information hierarchy challenges, as they were incorporating content from multiple sources: national rail guidelines, industry information, Trainline-specific policies, and individual train operator policies. These sources don't necessarily contradict each other but contain important nuances - for instance, certain carriers might offer more compensation than the regulatory minimum in specific scenarios.

To handle this complexity, Trainline implemented what they call an "information retrieval service" that does more than simple semantic search. This service uses a specialized LLM that acts as a judge, taking retrieved information, evaluating its relevance to the customer's query, and only passing summarized, relevant context back to the main orchestrator. Each entry in the vector database includes metadata about the source, recency, and type of information, which helps the LLM understand how to prioritize and layer different pieces of information appropriately.

## Tool Design and Prompt Engineering

The team learned important lessons about tool design as they scaled the system. Initially, they would give the assistant very comprehensive JSON responses from tools - for example, the real-time tool would return everything the system might need to know about a train's status. They discovered that breaking this down into separate, more focused tools significantly reduced hallucinations and improved the system's ability to reason effectively.

Prompt engineering proved to be both an art and a science. In the early days, as different engineers added features, the prompt grew long and unwieldy, contributing to problems like the assistant becoming overly persistent in trying to help customers and getting stuck in loops. The solution involved careful prompt refinement, moving logic out of prompts and into tool validation checks, and implementing clear directives about what the assistant should and shouldn't attempt to answer.

The team employs multiple layers of control in their system. They use prompts for high-level guidance, external guardrails for safety checks, thoughtful tool structure design, and validation checks within individual tools. For example, many of their main tools include data validation that happens before information is passed back to the orchestrator. This multi-layered approach provides both flexibility and safety.

One interesting challenge they faced was the assistant's excessive helpfulness - it would sometimes refuse to give up on solving a customer's problem and would loop repeatedly trying different approaches. The team addressed this through a combination of prompt cleanup, better tool structure, and implementing hard limits on the number of reasoning cycles the assistant could perform before either providing a response or gracefully handing off to a human agent.

## Guardrails and Safety

Safety and factual accuracy were priorities from day one. The system implements guardrails at multiple points in the conversation flow. When a customer query comes in, it first passes through an input guardrail check. The system then populates state with relevant metadata about the customer and their ticket information before the agent begins its reasoning process.

As the orchestrator works through its reasoning and tool calls, if it decides to end the interaction and respond to the customer, the response must pass through an output guardrail. This guardrail performs two key checks: contextual grounding to verify the response is based on information actually provided by the tools, and toxicity checking to ensure nothing harmful is being communicated.

The team made a conscious UX decision to allow completely open-ended text input rather than providing prompts or guidance about what questions to ask. This was based on user research showing that too much guidance made customers feel they weren't interacting with a truly capable AI system - it seemed more like a decision tree. The open-ended approach also provides invaluable product data, showing the team what customers actually want help with, unprompted.

Importantly, the system knows when to escalate to human agents. If the assistant determines it cannot help a customer, or if a customer mentions sensitive situations like bereavement or serious illness, the system immediately hands over to a human agent. This handoff happens seamlessly within the chat interface, preserving context so the human agent can see the full conversation history.

## Latency Optimization

Response time was a critical concern for a customer-facing chat system. Initially, the average response time was about 12 seconds, with the primary bottleneck being the number of reasoning calls the orchestrator needed to make. Each reasoning call requires waiting for the LLM to generate its full response before taking the next step.

The team approached latency optimization from multiple angles. They worked with their cloud provider AWS to implement intelligent routing across different inference servers in the EU and UK regions. They also made strategic model choices, using smaller, faster models for simpler tasks while reserving larger models for complex reasoning. For example, they use smaller models for the RAG summarization task while employing more capable models like Claude for the main orchestration reasoning.

Through these efforts, they reduced average latency to approximately five to six seconds. The team's philosophy was that accuracy trumps speed - a customer waiting an extra five seconds for a correct answer is better served than receiving a wrong answer instantly. They compare their response time favorably to human customer support agents, which can vary considerably depending on time of day and agent availability.

From a UX perspective, the team is exploring ways to set appropriate expectations and reduce perceived latency. This includes carefully designed loading animations and potentially showing users what the system is doing at each step (retrieving documents, analyzing information, composing response). They're learning from other AI companies that have successfully used animation patterns to make wait times feel shorter and build trust that the system is actively working on the customer's problem.

## Evaluation Strategy Evolution

Evaluation represents one of the most challenging and sophisticated aspects of Trainline's LLMOps practice. The team's approach evolved significantly from launch to their current state, reflecting the broader industry's learning curve around evaluating agentic AI systems.

At launch, the team relied primarily on human evaluation and small-scale automated tests. They conducted semantic similarity checks for certain key questions but depended heavily on controlled human evaluation sessions. Recognizing that safety was paramount, they outsourced red teaming to a third party to specifically test for toxicity and attempt to break the system. They also conducted multiple internal red teaming rounds, creating a split between chaotic adversarial testing and carefully controlled evaluation of customer value.

The team identified four core principles for evaluation: groundedness/factuality (are responses based on real information?), relevance (are responses helpful?), helpfulness (do they solve the customer's problem?), and consistency (are similar queries handled similarly?). These principles guided both their launch evaluation and their evolution toward more sophisticated approaches.

Matt, the head of machine learning engineering, became interested in reference-free evaluation and LLM-as-judge approaches before they even built the assistant. The team recognized early that traditional evaluation approaches wouldn't scale for their use case. Unlike large AI companies that can hire teams of AI tutors to label prompts and responses, Trainline needed a more practical approach. With customers potentially asking millions of different questions across diverse contexts, manually labeling comprehensive datasets wasn't feasible.

What excited the team about LLM-as-judge was research demonstrating high human alignment - the ability to have a small team of human labelers create a ground truth dataset, then train judge models that could scale that human judgment across millions of interactions. This represented a breakthrough in making evaluation practical for production systems.

The team evaluated several observability platforms and ultimately partnered with Braintrust, which provided the all-in-one solution they were looking for: logging, online monitoring, and offline evaluation with consistent evaluation methodology across both contexts. They set up multiple judge models aligned with their core principles, and they're using their historical human evaluation data to validate judge alignment.

## User Context Simulator

Perhaps the most innovative aspect of Trainline's evaluation approach is their custom-built "user context simulator," which addresses a unique challenge in their domain. Unlike many AI assistants that work with static information, Trainline's assistant must handle queries that depend on real-time, dynamic data about specific trains, disruptions, and customer journeys.

The problem they identified was this: how do you evaluate whether the assistant correctly answered a question about a train's platform when that query happened in the past and the real-time conditions have changed? A customer might have asked "what platform is my train on?" and been told platform 4, then challenged that response saying they thought it was platform 5. To properly test whether the assistant handles such scenarios correctly, you need to recreate the exact ticket context and real-time train status that existed at that moment.

Their solution is ingenious: rather than trying to find historical tickets that match specific scenarios, they generate synthetic tickets in their test environment that correspond to real trains running in real time. The user context simulator then samples actual customer queries from production to understand the types of questions people ask, and uses an LLM to generate similar queries that are contextually appropriate for the specific synthetic ticket.

The system might generate hundreds or thousands of queries for each test ticket, asking questions like "what platform is my train on?", "is there a toilet at the station?", "can I get breakfast before my early train?", all contextualized to the specific journey. It can even simulate challenging scenarios where customers dispute information or ask follow-up questions, testing the assistant's ability to handle back-and-forth conversations.

Because they've integrated Braintrust, all the judges and monitoring they use for production evaluation can be applied to these simulated conversations. The team has only recently built this capability and is still validating it, but early results are promising. From a cost perspective, using smaller models for the simulation (with newer efficient models like GPT-4.5 Haiku) means the expense is manageable compared to their production inference costs, especially since they're running these comprehensive evaluations monthly or per-release rather than continuously.

## Model Selection and Cost Optimization

Trainline takes a pragmatic, task-appropriate approach to model selection. Their system is architected to be model-agnostic, allowing them to use different models for different components based on the requirements of each task. The main orchestrator uses Claude (specifically Claude 4 and keeping updated with the latest versions like 4.5), which provides the sophisticated reasoning needed for the central decision-making role.

For simpler, more specialized tasks, they use smaller models to keep costs manageable. For example, their RAG summarization step uses a more efficient model than the main reasoning loop, as the task is more constrained. They're evaluating newer releases like Claude 4.5 Haiku, which appears to offer near-frontier-level performance at a fraction of the cost of larger models.

The team has considered fine-tuning smaller models for specific tasks but questions whether this investment makes sense given how rapidly foundation model capabilities are improving and costs are decreasing. What might require fine-tuning today could be handled by an off-the-shelf model at lower cost in six months, making it unclear whether the engineering effort of maintaining fine-tuned models provides sufficient long-term value.

Cost optimization happens at multiple levels: choosing appropriately-sized models for each task, careful prompt engineering to minimize token usage, efficient tool design that reduces the number of reasoning cycles needed, and infrastructure optimization like AWS's multi-region routing to improve inference efficiency.

## Production Insights and Customer Behavior

Since launching in February 2025, the assistant has engaged in over one million conversations with 300,000 monthly active users currently. The data has revealed surprising insights about customer needs and behavior that weren't apparent from traditional customer support channels.

As expected, refunds remain the most common customer support issue, and this is reflected in assistant usage. However, what's novel is when and how customers are engaging with the assistant. Traditional customer support contacts typically happen right after purchasing a ticket or after completing travel, not during the journey itself. The assistant, being available 24/7 with low friction to access, has revealed a whole category of mid-journey questions that customers have but wouldn't typically call customer support about.

Customers on less familiar routes, risky journeys (expensive tickets, booked far in advance, traveling with children or lots of luggage), are asking reassurance questions: "Is there a toilet at the station?", "What platform is the toilet on?", "Can I get breakfast at the station?", "Where can I find a Pret?". These practical, situational questions represent a long tail of customer needs that the traditional phone-based support team rarely if ever encountered.

The team also gets more unusual queries that demonstrate the breadth of customer concerns: "Can I take a turtle on the train?", "Can I take my motorbike on the train?". The customer support team has been amazed reviewing the types of questions coming through the assistant - many are things they've never been asked before despite years of operation.

This reveals an important insight about AI assistants in customer service: they don't just replace existing support channels, they reveal latent demand for support that existed but wasn't being met due to friction in accessing help. Customers are willing to ask an AI assistant questions they would never bother calling about, and providing these answers improves the overall travel experience and builds confidence in less experienced travelers.

## Organizational and Process Learnings

The rapid development cycle - from zero to production in five months - required close collaboration between product managers, engineers, and ML specialists. David, Billy, and Matt emphasize that this kind of agentic AI development demands much tighter integration between these roles than traditional software development.

Product managers need to develop technical literacy about LLMs, agentic systems, prompt engineering, and evaluation. Billy, who joined Trainline with prior AI startup experience, still found he needed to rapidly upskill on agentic systems specifically. The technology is evolving so rapidly that even recent experience can feel outdated quickly. David notes that evaluation has evolved from spreadsheets with expected vs. actual answers to sophisticated LLM-as-judge systems, and product managers need to get comfortable with the non-deterministic nature of AI outputs and the inherent subjectivity in evaluating quality.

The team emphasizes that iteration needs to happen much earlier in the development cycle than traditional software. With non-deterministic systems, you can't fully specify behavior upfront and then ship exactly what you designed. Instead, you need to build, test, evaluate, refine, and repeat - all before reaching production. This represents a significant mindset shift for teams accustomed to traditional software development practices.

Keeping up with the pace of change in AI capabilities is a team effort. No individual can stay current with everything happening in the field. The team shares resources and information, focusing on understanding what's newly possible rather than getting lost in every technical detail. Close collaboration with ML engineers who are reading papers and tracking capabilities is essential for product managers to make informed decisions about what features to pursue.

The concept of "just now possible" - things that weren't feasible months ago but suddenly become achievable with new model releases or techniques - means plans need to remain flexible. Product roadmaps that would be set in stone in traditional software need to be adaptable when a new capability suddenly makes a different approach viable.

## Challenges and Trade-offs

The team is refreshingly candid about challenges and trade-offs they're managing. The non-deterministic nature of AI responses means there isn't always a single "right" answer, and even within the team, people may disagree about whether a particular response is optimal. This requires getting comfortable with ambiguity and thinking probabilistically about quality rather than deterministically.

Cost remains a constant consideration, though improving rapidly with more efficient models. Every product decision involves thinking about inference costs in a way that cloud computing had largely abstracted away. The team sees parallels to earlier eras of computing where resource constraints were more immediate concerns.

Environmental impact of inference is also on their radar as a consideration for the industry broadly. As a company promoting greener transport, being thoughtful about the carbon footprint of their AI systems aligns with their mission.

The assistant's persistence in trying to help - while generally positive - occasionally creates problems when it won't accept that it can't solve a particular problem. Balancing helpfulness with knowing when to gracefully hand off to humans remains an ongoing calibration.

Platform changes and station amenities represent a content maintenance challenge. Keeping 700,000 pages of information current, especially for real-time information about station facilities and train amenities, requires ongoing investment.

## Future Directions

The team sees nearly infinite possibilities for expansion. The core platform of the agentic assistant provides a foundation for integrating additional tools and capabilities. They want to answer more types of questions, provide better answers to existing questions, and reach more customers (potentially expanding beyond their current markets).

The evaluation infrastructure they've built, particularly the user context simulator, provides a foundation for safely testing new capabilities before deployment. As they add new tools or expand the information available to the assistant, they can comprehensively test how these changes affect performance across diverse customer scenarios.

The team is watching model developments closely, particularly smaller models that approach frontier capabilities at lower cost. These developments could enable them to handle more conversations, respond faster, or add more sophisticated capabilities while maintaining or reducing costs.

There's potential to make the assistant more proactive, not just responding to questions but anticipating customer needs based on their journey context. If a customer has a tight connection, the assistant might proactively provide information about the platform for their connecting train or alert them to potential delays.

Overall, Trainline's travel assistant represents a sophisticated, production-grade implementation of agentic AI that balances ambitious technical architecture with practical constraints around safety, cost, and reliability. Their evaluation approach, particularly the user context simulator, represents genuine innovation in how to test AI systems that operate on real-time, dynamic data. The team's transparency about challenges and trade-offs, combined with their rapid iteration and learning, makes this a valuable case study for organizations considering similar agentic AI deployments.