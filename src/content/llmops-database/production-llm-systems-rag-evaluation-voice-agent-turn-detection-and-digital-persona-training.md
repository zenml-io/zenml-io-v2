---
title: "Production LLM Systems: RAG Evaluation, Voice Agent Turn Detection, and Digital Persona Training"
slug: "production-llm-systems-rag-evaluation-voice-agent-turn-detection-and-digital-persona-training"
draft: false
llmopsTags:
  - "question-answering"
  - "chatbot"
  - "document-processing"
  - "content-moderation"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "agent-based"
  - "latency-optimization"
  - "evals"
  - "chunking"
  - "langchain"
  - "postgresql"
  - "redis"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "docker"
  - "kubernetes"
  - "openai"
  - "anthropic"
  - "meta"
  - "google-gcp"
industryTags: "tech"
company: "Various"
summary: "This case study presents three distinct production LLM implementations. Deep Verified built a self-hosted RAG platform for regulated fintech environments with comprehensive evaluation frameworks measuring answer accuracy, retrieval accuracy, latency, and observability over time. Alex AI developed a conversational voice agent for recruiting that solves the complex turn detection problem using dynamic stop thresholds, multiple voice activity detection models, and LLM-based confidence scoring to determine when candidates have finished speaking. Deli created digital personas that replicate individuals' communication styles by building temporal knowledge graphs from social media and personal data, ingesting 100,000 pieces of content daily, and using stylometry techniques to ensure each digital twin authentically represents its subject's unique voice and communication patterns."
link: "https://www.youtube.com/watch?v=Wgud1JJNLfs"
year: 2026
seo:
  title: "Various: Production LLM Systems: RAG Evaluation, Voice Agent Turn Detection, and Digital Persona Training - ZenML LLMOps Database"
  description: "This case study presents three distinct production LLM implementations. Deep Verified built a self-hosted RAG platform for regulated fintech environments with comprehensive evaluation frameworks measuring answer accuracy, retrieval accuracy, latency, and observability over time. Alex AI developed a conversational voice agent for recruiting that solves the complex turn detection problem using dynamic stop thresholds, multiple voice activity detection models, and LLM-based confidence scoring to determine when candidates have finished speaking. Deli created digital personas that replicate individuals' communication styles by building temporal knowledge graphs from social media and personal data, ingesting 100,000 pieces of content daily, and using stylometry techniques to ensure each digital twin authentically represents its subject's unique voice and communication patterns."
  canonical: "https://www.zenml.io/llmops-database/production-llm-systems-rag-evaluation-voice-agent-turn-detection-and-digital-persona-training"
  ogTitle: "Various: Production LLM Systems: RAG Evaluation, Voice Agent Turn Detection, and Digital Persona Training - ZenML LLMOps Database"
  ogDescription: "This case study presents three distinct production LLM implementations. Deep Verified built a self-hosted RAG platform for regulated fintech environments with comprehensive evaluation frameworks measuring answer accuracy, retrieval accuracy, latency, and observability over time. Alex AI developed a conversational voice agent for recruiting that solves the complex turn detection problem using dynamic stop thresholds, multiple voice activity detection models, and LLM-based confidence scoring to determine when candidates have finished speaking. Deli created digital personas that replicate individuals' communication styles by building temporal knowledge graphs from social media and personal data, ingesting 100,000 pieces of content daily, and using stylometry techniques to ensure each digital twin authentically represents its subject's unique voice and communication patterns."
notion:
  pageId: "3aaf8dff-2538-80ef-9582-fd76ab2f638b"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-27T11:59:00.000Z"
  lastEditedTime: "2026-07-27T11:59:00.000Z"
  publishedAt: "2026-07-27T12:06:36Z"
---

This case study encompasses three distinct production LLM systems, each addressing different challenges in deploying and operating large language models at scale. The presentations come from Deep Verified (RAG evaluation platform), Alex AI (voice agent for recruiting), and Deli (digital persona creation), representing different facets of modern LLMOps challenges.

## Deep Verified: Self-Hosted RAG with Comprehensive Evaluation

Deep Verified developed a RAG platform specifically designed for regulated environments in fintech where proprietary information cannot be uploaded to third-party models. The founder Alex explains that financial advisors with proprietary information refused to use external models, necessitating a self-hosted solution that could be managed entirely within enterprise boundaries.

The platform addresses a critical gap in production RAG systems: continuous quality measurement over time. While many teams can build RAG pipelines, far fewer have implemented systematic approaches to measuring answer quality over time. This observation reveals a common maturity gap in production LLM deployments where initial implementation receives focus but ongoing quality assurance remains underdeveloped.

The evaluation framework encompasses four core components that represent a holistic view of RAG system performance. Answer accuracy measures whether the system provides correct responses to user queries, such as correctly stating China's GDP growth forecast. Retrieval accuracy assesses whether the system retrieves the correct source documents from the vector database. Latency tracking monitors how quickly the platform returns answers. Observability provides detailed traces showing what happened at each pipeline stage, enabling debugging when issues arise.

The RAG pipeline itself implements an agentic flow with multiple stages. When users submit questions, an LLM first rewrites the query into a more comprehensive version before retrieval begins. This query rewriting step helps bridge the gap between how users naturally phrase questions and the terminology used in source documents. The system then retrieves relevant information from the vector database, generates an answer, validates the response, and finally returns it to the user if validation passes.

The platform demonstrates evaluation in action through a simple UI where users can upload PDF documents, configure how many documents to search against, and trigger evaluation runs manually or on a schedule. Recent evaluation runs display performance percentages for both correct answers and correct retrievals, with declining percentages signaling potential issues requiring investigation. For the demonstration, the presenter used IMF regional economic outlook documents and world economic outlook reports as test data.

The evaluation framework operates by comparing RAG pipeline outputs against an evaluation dataset containing expected answers and expected source documents. The pipeline progresses through rewrite, retrieve, generate, and validate stages while evaluation metrics capture answer accuracy, retrieval accuracy, latency history, and trend analysis. This systematic approach transforms evaluation from subjective assessment to objective measurement.

Observability emerges as a critical complement to evaluation metrics. While evaluation reveals what happened, observability explains why it happened. Deep Verified uses LangSmith for tracing, providing detailed information for each pipeline stage including latency measurements and intermediate outputs. For query rewriting specifically, traces show both the original user question and the LLM-rewritten version, enabling teams to understand how query transformation affects results.

The presenter shares concrete examples of how evaluation enabled data-driven optimization decisions. In different experiments, the team observed performance varying between 80% accuracy rates, but evaluation helped identify whether problems stemmed from answer generation accuracy or retrieval accuracy. This diagnostic capability prevents teams from optimizing the wrong component. In another experiment focused on reducing latency, disabling the query rewriting step improved speed but degraded answer quality. Evaluation made this tradeoff visible and quantifiable, enabling informed decisions based on measurable data rather than intuition.

The demonstration shows the platform tracking query rewrites where user questions like asking about China's economic outlook in 2026 get expanded into more comprehensive questions by the LLM. The system then provides answers with supporting evidence, shows the retrieved document chunks, and displays references to source documents. Quality trends and performance trends visualizations track accuracy and latency over time, enabling teams to spot degradation before it impacts users significantly.

Future development plans include scaling to larger evaluation datasets beyond the initial five-question test set, implementing pipeline profiles that enable or disable features like query rewriting based on latency versus quality preferences, integrating evaluation into continuous integration pipelines similar to unit testing in software development, and maintaining the self-hosted and data sovereign deployment model that initially motivated the platform.

## Alex AI: Turn Detection in Production Voice Agents

Alex AI built a conversational voice agent that autonomously sources, screens, places, and evaluates candidates for staffing agencies and large enterprises. CTO and co-founder John Rayal focuses specifically on turn detection, which he identifies as a more challenging problem than latency in voice agent development.

The fundamental challenge of turn detection is determining when the AI agent should start speaking and when it should stop speaking. While stopping is relatively straightforward (finish what you're saying or stop if interrupted), determining when to start speaking again requires accurately detecting when humans have finished talking. Two failure modes plague naive implementations: jumping in too early causes the agent to interrupt users, creating frustration through repeated interruptions, while waiting too long creates awkward silences where candidates may ask "Are you there?" Neither failure mode provides acceptable user experience.

The difficulty stems from the enormous variety of conversational exchanges. Some conversations involve rapid back-and-forth exchanges while others include natural pauses where speakers expect others to wait. Because no one-size-fits-all solution exists, the team needed to understand how humans make these determinations and then adapt those principles to the limited data available to voice agents.

Humans rely on multiple signals including body language, facial expressions, tone, context, and eye contact to determine when to speak. Voice agents have access to only two data sources: raw audio and transcription. The core LLMOps challenge becomes extracting maximal signal from this limited data to make accurate and reliable turn detection decisions.

Alex AI chose an orchestration architecture over voice-to-voice approaches like GPT Realtime. Voice-to-voice systems offer simple APIs where audio goes in and audio comes out, but they operate as black boxes without visibility into intermediate steps. Orchestration architecture requires managing transcription models, LLM models, and voice models separately through a state machine implemented as a while loop, but provides much more control over the voice agent experience and visibility into every pipeline component. The presenter notes that while most production voice agents currently use orchestration, the landscape may shift toward voice-to-voice approaches as technologies like GPT Live mature.

The naive approach to turn detection simply waits for silence, using a stop threshold (e.g., 2 seconds of silence) before assuming the user finished talking. While this works for simple conversations, production deployment reveals it breaks in most cases, producing either false positives where the agent jumps in too quickly or false negatives where it waits too long. The fundamental problem is that different conversational contexts require different stop thresholds, and no single value covers all scenarios.

Alex AI's solution implements dynamic stop thresholds that adjust based on conversational context. Whenever the voice agent says anything, an LLM classifies whether it expects a short answer or a long answer. Questions like "Are you authorized to work in the US?" expect short yes/no responses, while prompts like "Tell me your career history" anticipate longer answers with natural pauses. This classification drives dynamic stop threshold adjustment for each exchange.

While candidates speak, the system analyzes audio through two parallel voice activity detection models: Silero VAD and Deepgram's endpointing solution. Both models receive the dynamic stop threshold as input and signal when they believe the candidate stopped talking. When either model triggers, the system optimistically generates the LLM response and synthesizes voice, but crucially gates actually sending this audio back to the candidate.

This gating mechanism prevents false positives through two additional checks. NLP analysis examines whether the candidate's response ends with common filler phrases like "give me a minute" or "um" that typically indicate incomplete thoughts. Simultaneously, an LLM evaluates the confidence level that the candidate's response represents a complete thought addressing the previous question. Only when both NLP analysis and the LLM confirm the response is complete does the system actually send the generated audio back to the candidate.

This create a feedback loop that can execute multiple times during a single candidate response. If a candidate pauses briefly, Silero VAD might trigger, but if the LLM determines the answer is incomplete, the system cancels the prepared response and continues listening. This loop continues until one of the voice activity detection models signals end-of-turn and both the LLM and NLP analysis confirm completeness.

The architecture enables highly dynamic turn detection that adapts to conversational context. The system might wait longer during deep technical interviews where candidates explain complex concepts or respond snappily during quick screening calls with rapid back-and-forth exchanges. After shipping this solution, Alex AI observed significant improvements in candidate experience and overall conversation quality across different interview types.

Key learnings from this implementation emphasize starting with human behavior as the baseline. When building humanlike agents, teams should ask what humans would do and what expected behavior looks like, then consider how AI can match or exceed human performance. With limited available data, creativity in extracting signal becomes critical, and combining multiple signals often outperforms any single all-in-one model, though the rapidly changing model landscape may eventually produce unified solutions.

The architecture employs optimistic generation, preparing responses before final commitment but gating irreversible actions like actually playing audio to users. This pattern increases costs slightly but dramatically improves user experience and conversation quality. Turn detection represents just one of many voice agent challenges alongside back-channeling, background speech handling, and tool calling.

A surprising discovery from global deployment revealed that different cultures and languages have different conversational expectations and interaction patterns. This required fine-tuning each deployment based on the language Alex speaks, meaning solving turn detection for English doesn't automatically solve it for every other language. The architecture needed sufficient modularity and configurability to deploy effectively worldwide.

The presenter emphasizes that the described architecture represents one point in time rather than the current production system, acknowledging that the voice agent space changes month-over-month or even week-over-week with new models and techniques emerging constantly.

## Deli: Digital Personas with Temporal Knowledge Graphs and Stylometry

Deli raised funding from Sequoia to create digital versions of people that can talk and sound like them. The platform serves customers like fitness influencer Arnold Schwarzenegger and Jay Shetty who have large audiences that want personalized interactions but cannot access these personalities directly due to time constraints or cost. Deli creates AI versions that provide personalized advice behind optional paywalls, and recently opened a free tier enabling anyone to create digital representations of themselves.

The onboarding process collects massive amounts of personal data from social media, Google Drive, work documents, and other accumulated digital footprints. This creates two critical LLMOps challenges: reliability and latency. When users complete onboarding and land on their profile showing their digital version, they naturally want to test it immediately by asking questions. If the training hasn't finished or significant content is missing, and the user asks a specific question that reveals gaps, they immediately lose confidence and churn. This makes fast, reliable content ingestion a production-critical requirement.

Deli currently processes 5,000 to 100,000 pieces of content per day with 99.8% success rate. The remaining 0.2% failures stem from real-world integration challenges rather than code bugs. Pulling data from YouTube, Instagram, Twitter, Google Drive, and other sources encounters IP bans requiring IP rotation, memory problems from downloading large amounts of audio data simultaneously, and various other production infrastructure challenges.

The platform currently averages 4.5 minutes to complete training for 90% of content. Even within that 90%, the system prioritizes accounts containing the most important information, particularly LinkedIn since it typically contains the most comprehensive data about professional careers. This prioritization ensures that even if complete training takes longer, users can still get meaningful interactions from their digital personas quickly.

Deli implemented Temporal as a durable workflow orchestration system. Temporal provides automatic failover with retries and state memory management. If code execution crashes, perhaps due to scaling containers up from 50 to 60 or reducing container counts causing some processes to be killed, durable workflows preserve process state on Temporal's servers, enabling recovery without data loss. This infrastructure choice directly addresses the reliability requirement.

Audio attribution presents another production challenge. When processing podcasts with 50 to 100 hours of audio, the system must accurately identify when the specific person spoke versus other speakers, otherwise the digital persona would claim statements made by others. Deli solves this by collecting voice clips during onboarding for voice cloning, then using those same clips to pinpoint which portions of audio the person actually spoke. This ensures training data accurately represents only that individual's statements.

The knowledge representation uses a temporal knowledge graph structure with nodes representing entities and edges representing relationships between those entities. This differs from simple vector storage by explicitly modeling how concepts and experiences connect for each individual. All ingested data undergoes normalization into JSON format regardless of source type, and this normalized data becomes available to agents building the graph through tool calling.

The agents building the graph have awareness of content types—they know whether content comes from Twitter and should be handled accordingly—but the key insight is that any entity or concept discussed in content gets associated with relevant entities in the graph, allowing the representation to grow more comprehensive over time. The system tracks knowledge density through a metric called knowledge points, conceptually similar to clusters in vector space. If a person's knowledge graph shows high density in specific areas, those topics accumulate together.

The presenter provides a personal example: as a software engineer, entities related to software engineering would have many connecting edges to related concepts like mathematics, college classes, and work experience. However, the same person discusses hobbies like playing soccer and fitness, which would appear in different regions of the knowledge graph with different connection patterns. This structure becomes critical at retrieval time because the system can predict where conversations are heading based on graph topology, and the digital persona agent can guide conversations toward related topics, mimicking how real people naturally steer discussions.

The second presentation from Deli focuses on ensuring digital personas authentically represent individual communication styles. Co-founder Val explains that the most common customer success complaint is "this doesn't sound like me," even when the system has successfully ingested all their LinkedIn, YouTube, and Spotify data. The head of AI tasked Val with solving this problem during his first week, and initially Val felt overwhelmed since major AI labs like OpenAI and Anthropic haven't solved this problem—they only operate single chatbots while Deli faces the unique challenge of creating many distinct personas.

Val found inspiration in stylometry, a technique famously used to prove that J.K. Rowling wrote a book published under the pseudonym Robert Galbraith. Readers suspected Rowling wrote it based on writing style, but needed proof. Stylometry operates on the principle that every person has a unique writing fingerprint hidden in the occurrence patterns of words they use. By creating a bag of 50 words and measuring how often each word appears, researchers can create a statistical fingerprint for each author. Comparing document fingerprints against known author fingerprints enables attribution.

Val realized this is exactly the problem Deli faces. He gathered conversation files from multiple digital personas and built fingerprints for each, then created training and test sets to measure accuracy. The initial experiment achieved just under 70% accuracy compared to a 3% random baseline, demonstrating that stylometric fingerprinting could distinguish between different digital personas significantly better than chance.

However, this initial experiment potentially contained bias since different users discussed different topics—Sequoia investors versus sports coaches naturally cover different subject matter. To eliminate topic bias, Val conducted a harder experiment asking the same 100 questions to each digital persona. While accuracy dropped as expected for this more challenging test, it remained substantially above the random baseline.

Interestingly, failures to correctly identify digital personas clustered around the base model itself. When a digital persona matched the base model rather than its intended user, this indicated insufficient training. This insight transformed stylometric scoring from just an evaluation metric into a signal of training quality, revealing when Deli failed to adequately customize a digital persona.

Deli scaled this approach from a one-time score to continuous testing integrated into their release process. Each release triggers tests measuring the style score for every digital persona, ensuring that with each iteration, the system better captures individual communication patterns. This continuous measurement addresses the core customer complaint by making "sounds like me" an objective, measurable property rather than a subjective assessment.

## Cross-Cutting LLMOps Themes

These three case studies collectively illustrate several important LLMOps principles. First, evaluation and measurement must be first-class concerns in production systems. Deep Verified's comprehensive evaluation framework, Alex AI's user experience metrics for turn detection quality, and Deli's stylometry testing all demonstrate that production LLM systems require systematic approaches to measuring whether they actually work as intended. Subjective assessment and intuition are insufficient for reliable production operation.

Second, production LLM systems face infrastructure challenges that extend beyond model performance. Deep Verified handles deployment in regulated environments with data sovereignty requirements. Alex AI manages streaming architectures coordinating multiple models in real-time. Deli processes 100,000 pieces of content daily with reliability requirements. These operational concerns require engineering investment comparable to model optimization.

Third, production systems often require combining multiple signals and models rather than relying on single solutions. Alex AI uses two voice activity detection models plus LLM analysis plus NLP pattern matching to achieve reliable turn detection. Deli combines knowledge graphs with stylometry. Deep Verified combines vector retrieval with LLM generation with validation. This pattern of composing multiple specialized components appears consistently across mature production systems.

Fourth, the gap between initial implementation and production-grade operation remains substantial. Deep Verified observed that while many teams build RAG systems, far fewer implement ongoing quality measurement. Alex AI notes that solving problems like turn detection for one language doesn't automatically solve them for others. These observations highlight that production LLM systems require sustained engineering investment beyond initial prototyping.

Finally, all three systems demonstrate the importance of understanding and optimizing for human expectations. Deep Verified enables financial advisors to work with proprietary data in their preferred deployment model. Alex AI explicitly models human conversational behavior to create natural interactions. Deli focuses on authentically representing individual communication styles. This human-centered approach distinguishes production systems from research prototypes.
