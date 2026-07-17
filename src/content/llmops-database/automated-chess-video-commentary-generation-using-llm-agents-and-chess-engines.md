---
title: "Automated Chess Video Commentary Generation Using LLM Agents and Chess Engines"
slug: "automated-chess-video-commentary-generation-using-llm-agents-and-chess-engines"
draft: false
llmopsTags:
  - "content-moderation"
  - "chatbot"
  - "caption-generation"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "error-handling"
  - "fastapi"
  - "google-gcp"
industryTags: "media-entertainment"
company: "TNG"
summary: "TNG developed an automated system that generates chess instructional videos by combining LLMs with traditional chess engines to explain chess positions and games. The system addresses the fundamental challenge that while chess engines can evaluate positions accurately, they cannot explain moves in natural language, whereas LLMs can generate explanations but lack chess-playing ability. Their solution uses an agent-based architecture with Google's Gemini Flash 1.5 Pro, equipped with multiple chess-specific tools including legal move generators, engine evaluations, and checks-captures-threats analysis. The system automatically downloads games from Lichess nightly, analyzes them, generates commentary scripts, and produces videos complete with voice narration using ElevenLabs V3 text-to-speech. The YouTube channel has achieved over 500,000 views and 4,000+ subscribers within the first month of automated operation, with video production costs around 20-30 cents per video and error rates of approximately 5%."
link: "https://www.youtube.com/watch?v=BqZrTdgBaPw"
year: 2026
seo:
  title: "TNG: Automated Chess Video Commentary Generation Using LLM Agents and Chess Engines - ZenML LLMOps Database"
  description: "TNG developed an automated system that generates chess instructional videos by combining LLMs with traditional chess engines to explain chess positions and games. The system addresses the fundamental challenge that while chess engines can evaluate positions accurately, they cannot explain moves in natural language, whereas LLMs can generate explanations but lack chess-playing ability. Their solution uses an agent-based architecture with Google's Gemini Flash 1.5 Pro, equipped with multiple chess-specific tools including legal move generators, engine evaluations, and checks-captures-threats analysis. The system automatically downloads games from Lichess nightly, analyzes them, generates commentary scripts, and produces videos complete with voice narration using ElevenLabs V3 text-to-speech. The YouTube channel has achieved over 500,000 views and 4,000+ subscribers within the first month of automated operation, with video production costs around 20-30 cents per video and error rates of approximately 5%."
  canonical: "https://www.zenml.io/llmops-database/automated-chess-video-commentary-generation-using-llm-agents-and-chess-engines"
  ogTitle: "TNG: Automated Chess Video Commentary Generation Using LLM Agents and Chess Engines - ZenML LLMOps Database"
  ogDescription: "TNG developed an automated system that generates chess instructional videos by combining LLMs with traditional chess engines to explain chess positions and games. The system addresses the fundamental challenge that while chess engines can evaluate positions accurately, they cannot explain moves in natural language, whereas LLMs can generate explanations but lack chess-playing ability. Their solution uses an agent-based architecture with Google's Gemini Flash 1.5 Pro, equipped with multiple chess-specific tools including legal move generators, engine evaluations, and checks-captures-threats analysis. The system automatically downloads games from Lichess nightly, analyzes them, generates commentary scripts, and produces videos complete with voice narration using ElevenLabs V3 text-to-speech. The YouTube channel has achieved over 500,000 views and 4,000+ subscribers within the first month of automated operation, with video production costs around 20-30 cents per video and error rates of approximately 5%."
notion:
  pageId: "397f8dff-2538-8060-ad2e-cf10b4574517"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T20:00:00.000Z"
  lastEditedTime: "2026-07-08T20:00:00.000Z"
  publishedAt: "2026-07-08T20:10:36Z"
---

## Overview

TNG has built a production system that automatically generates educational chess videos by combining large language models with traditional chess engines and analysis tools. The project represents an interesting case study in LLMOps because it tackles a specific domain where neither traditional AI nor LLMs alone can solve the problem adequately. Traditional chess engines like Stockfish can evaluate positions with superhuman accuracy but cannot explain their reasoning in natural language that humans find instructive. Conversely, LLMs can generate fluent explanations but historically have been poor at actually playing or analyzing chess accurately. The TNG team's solution creates an agentic system that leverages the strengths of both approaches.

The system represents a fully automated production pipeline that runs nightly, processes real chess games from Lichess, generates analysis, creates video scripts with visual annotations, synthesizes narration, and publishes to YouTube. This represents a mature LLMOps implementation with considerations around cost management, error monitoring, quality control, and content strategy. The team has moved from manual oversight to near-fully automated operation, though they maintain the ability to review outputs and intervene when necessary.

## Technical Architecture and Model Selection

The core of the system is built around an agentic architecture using Google's Gemini Flash 1.5 Pro model. The team specifically noted that this model represents a significant improvement over previous iterations in chess understanding, likely due to targeted post-training. When examining the reasoning traces, they observed that Gemini Flash 1.5 Pro demonstrates substantially better chess comprehension compared to earlier models. Before settling on Gemini, the team experimented with other frontier models, and interestingly found that Grok 4 was the best performer for their use case in autumn of the previous year, outperforming models from OpenAI and other providers for chess-specific reasoning.

The choice of model is critical to the system's performance. The LLM needs not just general reasoning capabilities but specific chess understanding to effectively utilize the tools provided and generate coherent, accurate explanations of complex tactical and strategic concepts. The improvement in base chess knowledge in newer models has enabled the team to shift more of the reasoning burden to the LLM itself rather than relying on extensive preprocessing in Python scripts.

## Tool-Based Agent Design

The system implements a comprehensive set of chess-specific tools that the LLM agent can call to analyze positions and generate explanations. This tool-based approach is central to the LLMOps architecture, as it allows the LLM to ground its reasoning in accurate chess analysis while leveraging its natural language capabilities for explanation.

The tool suite includes several key components. A legal moves tool prevents the agent from ever considering illegal moves, addressing a common failure mode where LLMs hallucinate invalid chess positions or moves. The agent has access to a complete chessboard representation and can play moves, take them back, and explore different variations autonomously. This gives the agent the ability to think through tactical sequences and variations just as a human chess teacher would when explaining a position.

A chess engine integration allows the agent to request computer evaluations of positions, providing the ground truth for which moves are objectively best. However, the system goes beyond just identifying the best move. A particularly interesting tool is the checks-captures-threats analysis, which provides structured information about forcing moves in a position. This is based on a well-known chess teaching heuristic that beginners should focus on checks, captures, and threats when analyzing positions. By providing this information as a structured tool output, the system gives the agent diverse tactical options to consider and explain, not just the single best move.

The team also integrated web search capabilities for certain types of videos, allowing the agent to incorporate historical context about famous games or players. Additionally, they use the Maia engine from the University of Toronto, which is designed to predict human moves at different skill levels rather than just playing optimally. This allows the system to consider what moves a player of a particular rating might play, enabling more pedagogically valuable explanations that account for common human errors and thought patterns.

The provision of what the team calls conflicting information through these tools is actually beneficial. By giving the agent access to both the objectively best moves and the most likely human moves, along with various tactical motifs, the system can generate richer explanations that address what viewers might be thinking or what mistakes they might make. This is more valuable pedagogically than simply always pointing to the optimal continuation.

## Evolution of the Architecture

An important insight from the presentation is how the architecture evolved as LLM capabilities improved. Initially, the team used extensive Python preprocessing scripts to analyze chess positions and assemble information from various sources before passing a comprehensive package to the LLM for natural language generation. The LLM was primarily functioning as a text generation engine operating on pre-analyzed data.

However, with the advent of reasoning models and improved chess understanding in base models, the team shifted toward letting the agent do more of the thinking itself. Instead of preprocessing all the relevant information and handing it to the model, they provide the tools and let the agent decide when and how to use them. This represents a common pattern in LLMOps maturity where teams initially use LLMs for narrow generation tasks but increasingly leverage agentic capabilities as models improve.

This shift raises interesting questions about where reasoning should happen in an LLM system. The team explicitly discussed this tradeoff. On one hand, you can do extensive preprocessing and give the LLM a curated information package, which may be more reliable but less flexible. On the other hand, you can provide tools and let the agent explore and reason, which may discover novel insights but could also lead to errors or inefficient tool usage. The team has clearly moved toward the latter approach, finding that modern models are capable enough to handle this responsibility.

## Production Pipeline and Automation

The end-to-end production pipeline demonstrates mature LLMOps practices for automated content generation. Every night, the system automatically downloads chess games from Lichess, a popular online chess platform. These games are analyzed in the background using the agentic system, which explores variations, identifies critical moments, brilliant moves, and blunders, and generates explanatory commentary.

The output of the analysis phase is a specialized format that captures not just the text commentary but also visual annotations. The agent decides which squares to highlight, which arrows to draw on the board, and which moves should be tagged as brilliant or as blunders. This structured output is then passed to a video generation pipeline.

For the audio component, the system uses ElevenLabs V3 for text-to-speech synthesis. The team highlighted an interesting capability where they can use audio tags in the text to control the emotional tone of the narration, such as marking sections as excited to make the voice sound more enthusiastic. This attention to production quality shows maturity in thinking about the end-user experience, not just the technical accuracy of the content.

The entire pipeline from game download to YouTube upload has been automated, though the team maintains oversight capabilities. This represents a significant LLMOps challenge: balancing full automation for scale with quality control. Initially, the team reviewed every video before publication, but as confidence in the system grew, they moved toward a more permissive approach where they might review outputs occasionally and take down problematic videos after publication if needed.

## Quality Control and Error Rates

Quality control in production LLM systems is always challenging, and the team has developed specific approaches for their use case. They report an error rate of approximately one in twenty videos, or about 5%. These errors typically involve significant mistakes like missing a checkmate or providing incorrect analysis. This error rate is notable because it is low enough to be manageable but high enough that fully unsupervised operation carries some risk.

The team's approach to quality control has evolved. Initially skeptical about fully automated operation, they manually reviewed videos before publication. However, recognizing that the error rate is acceptable and that errors provide valuable learning signals, they have become more comfortable with automated publication. When errors occur, they can analyze what went wrong, often discovering that a particular tool call was missing or that the agent failed to explore a critical variation. These failures inform improvements to the prompt structure, tool design, or quality checks.

This pragmatic approach to quality reflects a mature understanding of production LLM systems. Perfect accuracy may be impossible or prohibitively expensive, so the question becomes whether the error rate is acceptable for the use case. For educational chess content, occasional errors may be tolerable, especially if they can be corrected after publication. This is quite different from, say, medical or financial applications where errors would be much more costly.

## Cost Management

The economics of the system are revealing about LLMOps cost considerations. At approximately 20-30 cents per video for standard-length content, the system can produce content at scale relatively affordably. However, the team noted that longer videos can cost several euros, indicating significant variance based on content complexity and length.

Importantly, the team is not currently optimizing aggressively for cost. They prefer to err on the side of higher quality commentary, even if this means higher LLM usage. They've identified clear optimization opportunities, such as redundant tool calls where the agent might analyze the same position multiple times or go through a game twice. These inefficiencies could be eliminated with more sophisticated prompt engineering or agentic frameworks, but the team has prioritized quality over cost optimization at this stage.

This cost structure is only viable because of recent improvements in LLM pricing and efficiency. The use of Gemini Flash 1.5 Pro rather than a larger, more expensive model is likely crucial to keeping costs manageable. The fact that they can produce content at this price point while still generating detailed, multi-minute videos with extensive tool calls speaks to the rapid improvement in cost-performance ratios for LLM APIs.

The business model is still developing. The YouTube channel had not yet reached monetization thresholds at the time of the presentation, meaning the operation was net negative financially. However, with over 500,000 views and rapid subscriber growth, monetization appears feasible in the near future. The question will be whether ad revenue can offset LLM API costs and other operational expenses.

## Content Strategy and Personalization

An interesting aspect of the system is the content strategy considerations. The team is using real games from Lichess players, which means they're analyzing games from players of all skill levels, not just grandmasters. This creates an opportunity for personalization that traditional chess content cannot easily provide. A famous chess streamer like GothamChess would never analyze an individual amateur player's game, but this automated system can.

The team envisions a future where players can submit their own games and receive personalized video analysis. This represents a different value proposition than generic chess instruction and could enable new business models around personalized educational content. However, it also raises content strategy questions about what to publish publicly on YouTube versus what to offer as a personalized service.

The team is still figuring out which types of games and positions make for good public content. Some videos feature checkmate-in-one puzzles that expert players would find trivial but that genuine beginners need explained. Other videos cover more complex tactical sequences. Balancing content for different skill levels is an ongoing challenge. The integration of the Maia engine, which predicts moves at different rating levels, provides a potential path toward skill-level-targeted content, though they haven't fully leveraged this capability yet.

## Scalability and Growth

The growth metrics are impressive for such a new project. The YouTube channel gained over 4,000 subscribers in approximately one month of operation, with most of the subscriber growth concentrated in that recent period. Over 500,000 views indicates that the content is finding an audience. This rapid growth suggests that there is genuine demand for this type of automatically generated chess educational content.

The automation enables scalability that would be impossible with human content creators. The system can analyze and produce videos for essentially unlimited numbers of games, limited only by compute costs. The nightly batch processing approach, where games are downloaded and analyzed automatically, represents a mature production deployment pattern that can scale linearly with resources.

However, scalability also raises questions about content strategy. YouTube's algorithms and policies around repetitive or automated content can be challenging to navigate. The team mentioned being somewhat cautious about upload volume, not wanting to flood the platform with content that might be perceived as low-quality or automated spam. This represents a different kind of LLMOps challenge around platform policies and content moderation rather than purely technical considerations.

## Limitations and Balanced Assessment

While the presentation highlighted the system's successes, it's important to note some limitations and areas for skepticism. The 5% error rate, while manageable, is non-trivial for educational content where accuracy is important. Users learning from videos with significant analytical errors could develop misunderstandings about chess principles.

The claim that this represents the "holy grail of chess programming" is borrowed from a newspaper article and may be somewhat hyperbolic. While the system is impressive, it's combining existing technologies rather than creating fundamentally new capabilities. The quality of the explanations, while fluent, may not match the pedagogical insight of experienced human chess teachers who can identify what students struggle with and address misconceptions more effectively.

The business model remains unproven. While view counts are encouraging, reaching profitability with ad revenue alone may be challenging given the per-video costs. The personalized video service model is mentioned but not yet implemented, and it's unclear whether there's sufficient demand at a price point that would make sense economically.

The system's reliance on a specific model, Gemini Flash 1.5 Pro, introduces dependencies on Google's API availability and pricing. Model updates could improve or degrade performance unpredictably. The team's experience with different models performing better at different times suggests some fragility in the approach.

## Broader LLMOps Insights

This case study illustrates several important LLMOps patterns and principles. The shift from preprocessing to agentic reasoning as models improve is a common evolution pattern. The use of domain-specific tools to ground LLM reasoning is essential for specialized applications. The balance between automation and quality control requires careful consideration of acceptable error rates for the specific use case.

The cost management approach of prioritizing quality over aggressive optimization early in development is pragmatic, but the identified inefficiencies suggest room for significant cost reduction as the system matures. The business model development alongside technical development reflects the reality that LLMOps projects need to consider unit economics from early stages.

The production deployment with nightly batch processing, automated publishing, and monitoring represents mature infrastructure thinking. The ability to review error cases and improve the system based on failures creates a feedback loop for continuous improvement. The content strategy questions around skill-level targeting and personalization show how LLMOps projects must consider user experience and product design alongside technical capabilities.

Overall, this case study demonstrates a working production LLM system that generates real value at scale, while also highlighting the ongoing challenges around quality control, cost management, and business model development that LLMOps practitioners must navigate.
