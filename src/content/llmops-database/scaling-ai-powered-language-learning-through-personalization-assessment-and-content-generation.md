---
title: "Scaling AI-Powered Language Learning Through Personalization, Assessment, and Content Generation"
slug: "scaling-ai-powered-language-learning-through-personalization-assessment-and-content-generation"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "699c0ededd3214d2c0cf2d66"
  exportedAt: "2026-02-23T10:04:49.317Z"
  source: "staged-only"
  lastUpdated: "2026-02-23T08:25:02.641Z"
  createdOn: "2026-02-23T08:25:02.641Z"
llmopsTags:
  - "healthcare"
  - "content-moderation"
  - "translation"
  - "question-answering"
  - "classification"
  - "summarization"
  - "chatbot"
  - "data-analysis"
  - "structured-output"
  - "multi-modality"
  - "poc"
  - "caption-generation"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "model-optimization"
  - "instruction-tuning"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "chunking"
  - "system-prompts"
  - "evals"
  - "monitoring"
  - "api-gateway"
  - "microservices"
  - "cicd"
  - "scaling"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "langchain"
  - "llama-index"
  - "openai"
  - "anthropic"
industryTags: "education"
company: "Duolingo"
summary: "Duolingo has evolved from engineering-led personalization to sophisticated AI-driven learning experiences over the past decade. The company addresses the challenge of effective language learning at scale by implementing personalized difficulty modeling through their BirdBrain system, automated assessment capabilities, and generative AI for content creation and conversational practice. By retraining learning scientists to develop prompt engineering and agentic workflow skills, Duolingo has dramatically accelerated content development while maintaining learning effectiveness, enabled low-pressure conversational practice through AI character interactions, and achieved learning outcomes that match or exceed traditional classroom instruction across multiple subjects."
link: "https://www.youtube.com/watch?v=cfqkihwZVxQ"
year: 2026
---

## Overview

Duolingo represents a comprehensive case study in deploying AI systems for educational technology at massive scale. The company, which teaches languages and other subjects including math, music, and chess, has built sophisticated AI infrastructure that spans personalization, assessment, and content generation. What makes this case particularly instructive from an LLMOps perspective is the decade-long evolution from traditional ML-based personalization to modern generative AI systems, and the organizational transformation required to operationalize these technologies effectively.

The case study centers on insights from Bojana Pajak, VP of Learning at Duolingo and the company's first learning scientist hired in 2015. Her journey from being an isolated research function to leading a 40+ person team embedded across product organizations provides valuable lessons about integrating AI capabilities with domain expertise in production environments.

## Initial AI Infrastructure: Personalization and Assessment

Before the generative AI era, Duolingo built substantial AI capabilities focused on two primary areas. The first was personalization through a system called BirdBrain, which represents a sophisticated production ML system for modeling student knowledge. BirdBrain analyzes the complete interaction history of each user, tracking how they answer different exercise types, and generates predictions about the probability of correct answers for any new exercise. This prediction capability enables real-time difficulty personalization, ensuring learners receive appropriately challenging content based on their current knowledge state.

The technical approach combines user behavior tracking, exercise performance modeling, and adaptive content selection. While the specific model architecture is not detailed, the system has evolved continuously and remains in production, suggesting a robust MLOps infrastructure supporting ongoing iteration and improvement. The personalization extends beyond just difficulty levels to include sequencing decisions, determining not just what content to show but in what order, though the core curriculum remains consistent across users.

The second major AI application was assessment, particularly for the Duolingo English Test, a high-stakes language proficiency certification. This product innovated beyond traditional assessment methods by leveraging AI from inception to create adaptive testing experiences. The AI-driven approach was initially controversial in the assessment research community but has gained acceptance through demonstrated rigor and is now accepted by universities worldwide. Notably, Duolingo has developed techniques for rapid proficiency assessment that are being brought back into the main app, creating a bidirectional flow of innovation between products.

## Generative AI Transformation: Content, Conversation, and Feedback

The advent of large language models created new opportunities across three major areas at Duolingo. The first and perhaps most impactful was content generation. The company faces a constant challenge of creating educational content across multiple languages and subjects, with a backlog that would have taken approximately 100 years to complete with traditional methods. Generative AI has dramatically accelerated this timeline while maintaining quality through human-in-the-loop processes.

The second application involves interactive conversational features, exemplified by the video call with Lily feature. Lily is one of Duolingo's characters, specifically designed as an unimpressed teenager, and learners can now practice conversational skills through natural dialogue with this AI-powered character. This addresses a critical challenge in language learning: speaking anxiety. Many learners feel pressure and embarrassment when practicing with humans, but the AI interaction provides a low-stakes environment for building confidence. Research conducted by Duolingo showed that after just four to six weeks of practice including these conversational exercises, learners could formulate their own thoughts and messages, both in writing and orally, much faster than traditionally expected.

The third major application is personalized feedback generation. Previously, feedback for learner mistakes was hardcoded and generic. With generative AI, Duolingo can now provide context-aware, personalized explanations that specifically address why a learner made a particular mistake and offer tailored guidance. This represents a significant improvement in the learning experience and demonstrates how LLMs can enhance educational interactions beyond simple question-answering.

## Critical LLMOps Breakthrough: Skill Transformation and Agentic Workflows

One of the most significant insights from this case study concerns organizational capability rather than pure technology. When asked about the biggest breakthroughs enabling generative AI deployment, Pajak emphasized retraining the learning science team rather than model capabilities themselves. The learning scientists and designers developed entirely new skill sets including prompt engineering, building evaluators, and implementing agentic workflows.

This skill transformation proved crucial because these team members uniquely combined domain expertise in learning science with the ability to articulate requirements to AI systems. They could specify exactly what effective educational content requires, create specific rubrics for automated evaluators, and design quality criteria that engineers or other AI practitioners without educational expertise could not formulate. This represents a critical LLMOps pattern: embedding AI literacy within domain expert teams rather than creating separate AI teams that lack contextual knowledge.

The agentic workflow implementation appears to be central to Duolingo's content generation capabilities. While specific technical details are limited, the approach involves learning scientists designing workflows where AI agents handle content generation according to well-defined specifications and evaluation criteria. The mention of continuously iterating on these workflows and using advanced models like Claude Opus or Gemini as thought partners suggests a sophisticated approach to workflow design where the specifications themselves evolve based on production experience.

## Production Infrastructure and Processes

Beyond individual AI capabilities, Duolingo has invested significantly in production infrastructure to operationalize generative AI at scale. When scaling content generation, the company undertook a fundamental rethinking of course creation from first principles. The traditional manual approach used custom-built courses, but this was redesigned with AI-native processes. The new approach involves batching content differently, finding grouping strategies that make content generation more effective, and creating propagation mechanisms so changes can scale broadly rather than requiring individual customization.

The company built custom internal workflows and pipelines specifically designed as a content generation machine. A critical design decision involves deliberately choosing where to keep humans in the loop versus where to rely on full automation. This human-in-the-loop strategy balances quality assurance with scale efficiency, though specific criteria for these decisions are not detailed.

The infrastructure investment was substantial enough that for Duolingo's math course, the company decided to completely scrap existing content and rebuild it entirely using AI-assisted processes. This suggests strong confidence in the new infrastructure and a willingness to make major architectural shifts when new approaches prove superior.

## Evaluation and Quality Assurance

Duolingo employs a sophisticated multi-layered evaluation strategy that addresses both immediate quality concerns and long-term learning effectiveness. For AI-generated content and features, learning scientists build specialized evaluators based on educational rubrics they develop. These evaluators presumably assess whether generated content meets learning science criteria, though technical implementation details are not provided.

For overall learning effectiveness, the company uses multiple measurement approaches at different timescales. The fastest signals come from standard engagement metrics like retention, time spent learning, and session completion rates. These provide rapid feedback on whether new experiences are frustrating or engaging learners.

An intermediate signal comes from analyzing the difficulty level of content users can handle through the BirdBrain personalization system. If users start seeing easier content after a change, this suggests they are struggling more and may not be learning as effectively. Conversely, successfully handling more difficult content suggests positive learning outcomes.

The most rigorous evaluation involves formal research studies conducted by learning scientists. These studies recruit Duolingo learners and test them with independent standardized assessments, not Duolingo-developed measures. The company controls for confounding factors like use of other learning methods and ideally recruits learners who use only Duolingo. Some studies are cross-sectional snapshots testing learners at specific course completion points, while others employ pre-test/post-test designs following learners over several months.

A particularly interesting finding from these long-term studies is that learning effectiveness has improved substantially over time. Comparing cohorts from 2020 to 2024 using identical assessments at the same course points shows significant improvements, providing validation that the continuous product enhancements including AI integration have meaningfully improved learning outcomes. In some cases, Duolingo learning outcomes now match or exceed traditional classroom instruction, a surprising finding that the team did not initially expect.

For conversational AI features specifically, Duolingo has developed an innovative evaluation approach using the video calls themselves as assessment tools. By analyzing conversational interactions, the system can estimate speaking proficiency and use this as a proxy for overall language ability. This provides relatively rapid signal from short interactions, creating a feedback loop between the learning experience and assessment.

## Challenges and Considerations

The case study reveals several important challenges in deploying AI for educational purposes. The most fundamental is the temporal mismatch between learning outcomes and typical product development cycles. Learning happens over long timescales and is non-linear, meaning short-term signals can be misleading. Something that appears to improve learning in a two-week window might actually prove less effective over months, while approaches that show slower initial progress might lead to better long-term outcomes. This creates tension with standard A/B testing frameworks optimized for quick iteration.

Duolingo addresses this through its multi-layered evaluation strategy, accepting that different signals serve different purposes. Quick engagement metrics inform rapid iteration, while longer-term studies validate strategic directions, even though they cannot guide daily product decisions. This represents a mature approach to metrics in domains where ultimate outcomes cannot be measured quickly.

Another challenge involves balancing learning effectiveness with engagement and motivation. Duolingo explicitly avoids two extremes: making the experience too game-like at the expense of learning, or optimizing purely for academic effectiveness in ways that cause user burnout. The company has found that designing for the intersection of effective learning and engaging experience from the outset works better than trying to add engagement to academically optimal experiences or vice versa. This design philosophy influences AI implementation decisions, where capabilities must serve both learning and engagement goals simultaneously.

The organizational challenge of integrating learning science with technology development is also notable. It took approximately two years for the first learning scientist to establish credibility and demonstrate value through measurable wins in both engagement metrics and learning outcomes. Even now, with 40+ learning scientists and designers, each new hire from traditional tech companies encounters the role for the first time and must learn how to collaborate effectively. The company addresses this through a matrix organization structure where learning scientists embed in cross-functional product teams led by product managers and engineers, with learning designers sometimes co-leading teams focused on teaching features.

## Expansion Beyond Languages and Transfer Learning

Duolingo's expansion into math, music, chess, and other subjects provides insights into how AI-powered educational approaches generalize across domains. The core methodology of active, hands-on learning through exercises proved broadly applicable, suggesting the underlying AI infrastructure and pedagogical approach transfer well. However, each subject required domain-specific adaptations. Math courses emphasized content breadth and real-world relevance, music courses focused even more heavily on fun and interactivity with extensive animations and visualizations, while chess leveraged bite-sized puzzles with character-delivered tips.

Interestingly, innovation flows bidirectionally between subjects. The chess course developed explicit, brief, often humorous tips delivered by a character named Oscar during puzzle-solving. This approach worked so well that Duolingo is now exploring how to bring similar in-the-moment guidance to language learning. This suggests the multi-subject approach creates a portfolio of experiments where successful patterns in one domain can enhance others, accelerating overall innovation velocity.

## Future Directions: Advanced Personalization

Looking forward, Duolingo is most excited about next-generation personalization capabilities enabled by generative AI. While the company has long personalized difficulty levels and sequencing, the vision extends to generating experiences on-the-fly that match individual learner needs across multiple dimensions. Examples include thematic personalization where the same grammatical concepts are taught using topics aligned with individual interests, such as sports versus arts, rather than a single topic for all learners.

Other personalization dimensions under consideration include adaptive character selection, tone, and various stylistic elements based on individual preferences and responses. The combination of infinite content generation capability, sophisticated user modeling through systems like BirdBrain, and memory of individual reactions to different content types creates opportunities for highly individualized learning paths that share educational objectives but differ substantially in presentation and thematic content.

## Key Takeaways for LLMOps Practitioners

This case study offers several important lessons for deploying LLMs in production. First, the most critical enabler may not be model capabilities but rather organizational capability to operationalize them effectively. Duolingo's investment in retraining domain experts to work directly with AI systems proved more important than the models themselves.

Second, production AI infrastructure requires fundamental rethinking of workflows and processes, not just applying AI to existing approaches. Duolingo completely redesigned course creation from first principles to enable AI-native development.

Third, evaluation strategies must match the domain's temporal dynamics and success criteria. Quick proxy metrics enable iteration while rigorous long-term studies validate strategic direction, and both are necessary.

Fourth, human-in-the-loop approaches require thoughtful decisions about where human judgment adds value versus where automation suffices. These decisions should be deliberate architectural choices, not defaults.

Finally, the case demonstrates that sophisticated AI deployment can achieve outcomes comparable to or exceeding traditional approaches in complex domains like education, but this requires sustained investment in infrastructure, evaluation, and organizational capability development over many years. Duolingo's decade-long journey from initial skepticism about AI-driven assessment to market acceptance, and from basic personalization to sophisticated generative experiences, illustrates the patience and persistence required to fully realize AI's potential in production systems.