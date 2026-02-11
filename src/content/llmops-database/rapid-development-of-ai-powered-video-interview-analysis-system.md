---
title: "Rapid Development of AI-Powered Video Interview Analysis System"
slug: "rapid-development-of-ai-powered-video-interview-analysis-system"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67a311d4a84012d27a408c4b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:59:49.555Z"
  createdOn: "2025-02-05T07:23:00.356Z"
llmopsTags:
  - "summarization"
  - "document-processing"
  - "structured-output"
  - "prompt-engineering"
  - "system-prompts"
  - "error-handling"
  - "human-in-the-loop"
  - "documentation"
  - "fastapi"
  - "openai"
  - "microsoft-azure"
industryTags: "education"
company: "Vericant"
summary: "Vericant, an educational testing company, developed and deployed an AI-powered video interview analysis system in just 30 days. The solution automatically processes 15-minute admission interview videos to generate summaries, key points, and topic analyses, enabling admissions teams to review interviews in 20-30 seconds instead of watching full recordings. The implementation was achieved through iterative prompt engineering and a systematic evaluation framework, without requiring significant engineering resources or programming expertise."
link: "https://www.youtube.com/watch?v=Sz_F8p2fBBk"
year: 2023
seo:
  title: "Vericant: Rapid Development of AI-Powered Video Interview Analysis System - ZenML LLMOps Database"
  description: "Vericant, an educational testing company, developed and deployed an AI-powered video interview analysis system in just 30 days. The solution automatically processes 15-minute admission interview videos to generate summaries, key points, and topic analyses, enabling admissions teams to review interviews in 20-30 seconds instead of watching full recordings. The implementation was achieved through iterative prompt engineering and a systematic evaluation framework, without requiring significant engineering resources or programming expertise."
  canonical: "https://www.zenml.io/llmops-database/rapid-development-of-ai-powered-video-interview-analysis-system"
  ogTitle: "Vericant: Rapid Development of AI-Powered Video Interview Analysis System - ZenML LLMOps Database"
  ogDescription: "Vericant, an educational testing company, developed and deployed an AI-powered video interview analysis system in just 30 days. The solution automatically processes 15-minute admission interview videos to generate summaries, key points, and topic analyses, enabling admissions teams to review interviews in 20-30 seconds instead of watching full recordings. The implementation was achieved through iterative prompt engineering and a systematic evaluation framework, without requiring significant engineering resources or programming expertise."
---

## Overview

This case study documents how Vericant, a third-party video interview company serving high schools and universities with their admissions processes, rapidly deployed a generative AI solution to help admissions teams process interview content more efficiently. The company was later acquired by ETS (Educational Testing Service), the world's largest private nonprofit educational testing organization. The discussion is presented as a conversation between Kevin (the interviewer/host) and Guy Savon, co-founder and CEO of Vericant, recorded approximately one month after they had an initial conversation about potential generative AI use cases.

Vericant's core business involves making interviews scalable for educational institutions. They conduct video interviews (approximately 15 minutes each) with applicants, particularly international students, to help admissions teams get a more holistic view of candidates and assess their English speaking capabilities. The fundamental challenge they addressed was that while Vericant had successfully scaled the interview collection process (handling tens of thousands of interviews), they hadn't solved the problem of helping admissions teams actually process and consume all those interviews efficiently.

## The Problem

Admissions officers faced a significant time bottleneck: to understand what happened in each 15-minute interview, they had to watch the entire video. This didn't scale well when dealing with large numbers of applicants. The company recognized an opportunity to use generative AI to dramatically reduce this processing time while still providing meaningful insights from each interview.

## Technical Implementation

### Development Approach

The most notable aspect of this case study is the low-code, rapid prototyping approach. Guy Savon, the CEO, built the initial solution himself without any programming. The key tools used were:

- **OpenAI Playground**: This was the primary development environment. The playground allowed direct interaction with GPT models using a system message (containing the prompt) and user message (containing the interview transcript). Guy would paste prompts into the system message section, paste interview transcripts into the user message section, and observe the outputs.

- **Google Sheets**: Used as both a data management tool and evaluation framework. Outputs from the OpenAI playground were copied back to spreadsheets for review and scoring.

### Prompt Engineering Process

The system prompt evolved through iterative refinement. The initial prompt structure included:

- Role definition: "You are an assistant assisting an admission officer at a US educational institution"
- Primary task specification: "Your primary task is to digest an interview transcript of a potential candidate and produce a concise summary"
- Specific behavioral instructions: Refer to the student by name, avoid flowery or "salesy" language, and various do's and don'ts

The prompts were refined based on observing actual outputs and identifying patterns of errors or suboptimal results. This is a practical example of prompt engineering in action, where the CEO personally iterated on the instructions until the outputs met quality standards.

### Evaluation Framework

A particularly noteworthy aspect of this implementation is the systematic evaluation framework. Rather than relying on subjective impressions, the team implemented a structured approach:

- Each transcript was processed through the same prompt three times, generating three separate outputs
- Team members watched the original video, read the transcript, and then evaluated each of the three outputs
- Evaluations included both quantitative scores and qualitative comments
- The scoring system used a simple scale: Amazing, Good, Passable (usable but not great), and Unsatisfactory (unusable)
- Results were color-coded in Google Sheets (dark green, green, yellow, red) for quick visual assessment

This evaluation framework was inspired by content about dealing with LLM hallucinations, specifically a video about creating evaluation frameworks to determine whether outputs are usable for specific use cases.

### Iterative Improvement

The case study clearly demonstrates an iterative refinement cycle:

- First round of evaluations showed mostly dark greens but also some greens, yellows, and a few reds
- Based on the detailed feedback, the prompt was revised
- Second round of evaluations showed significant improvement: almost all green, only one yellow (passable), and no reds
- This iterative process continued until quality thresholds were met

### Production Deployment

Once the prompts were sufficiently refined, they were handed off to the engineering team for integration. The production feature, called "AI Insights," was integrated into the existing admissions portal where teams access interview content. The feature includes:

- Summary: A concise overview readable in approximately 15 seconds
- Key Points: Important highlights from the interview
- Key Topics: Subject areas discussed during the interview

The naming decision is interesting from a product perspective—they deliberately chose to include "AI" in the feature name (AI Insights) rather than something like "Vericant Assistant." The reasoning was that at the current moment in AI adoption, there's more user forgiveness for AI-generated content, and being transparent about the AI nature of the feature sets appropriate expectations.

The deployment also included appropriate disclaimers indicating the feature was in beta and requesting feedback, demonstrating responsible AI deployment practices.

## Resource Requirements and Timeline

One of the most compelling aspects of this case study is the minimal resource investment:

- Total CEO time: A few hours spread over a few weeks
- No dedicated resources or team
- No programming required for the initial development
- The evaluation work (the more time-consuming portion) was delegated to team members
- Approximately 30 days from initial concept discussion to deployed feature

This demonstrates that for certain use cases, generative AI features can be prototyped and deployed with remarkably low overhead, particularly when the technical approach (prompt engineering vs. custom model development) matches the problem complexity.

## Strategic Outcomes

### First-Mover Advantage

Vericant achieved first-to-market status in their specific niche. The case study emphasizes this as a significant opportunity during periods of transformative technology—being early provides substantial leverage because there are no established standards or expectations to meet.

### Business Model Evolution

Perhaps most significantly, this small initial project catalyzed a broader strategic vision. Before this implementation, Vericant's value proposition was focused on scaling interviews (collecting tens of thousands of interviews). After deploying the AI insights feature, the company articulated a new complementary value proposition: scaling the admissions team's ability to process interviews.

This represents a meaningful expansion of their business model, transforming from primarily an interview collection platform to a full-cycle interview intelligence platform. The CEO explicitly noted that this broader vision only crystallized after doing the hands-on work with the actual technology.

## Lessons and Observations

### Overcoming Fear of the Unknown

The case study addresses the psychological barriers to adopting new technology. When approaching something never done before, time estimates have very wide ranges (could be 2 hours or 3 weeks), creating anxiety about commitment. Having a framework and methodology reduced uncertainty and increased confidence to "just jump in."

### Concrete Experience Over Abstract Planning

The CEO emphasized the value of hands-on experimentation over extended planning phases. Playing with the tools made abstract possibilities concrete, and the strategic vision emerged from practical experimentation rather than preceding it.

### Low Barrier to Entry

The case demonstrates that generative AI deployment doesn't necessarily require specialized AI/ML expertise or significant engineering resources for initial prototyping. Using existing tools like OpenAI's playground and Google Sheets, a non-technical CEO was able to develop and validate a production-ready prompt system.

## Critical Assessment

While this case study presents an encouraging picture of rapid AI deployment, several caveats are worth noting:

- The use case (interview summarization) is relatively well-suited to current LLM capabilities and may not generalize to more complex applications
- The evaluation framework, while systematic, relied on human judgment rather than automated metrics, which may limit scalability
- Long-term quality monitoring and prompt maintenance are not discussed
- The sample size for evaluation is not specified, raising questions about statistical validity
- Handling of edge cases, errors, or particularly challenging transcripts is not addressed

Nevertheless, this case study provides a practical template for organizations considering similar applications, particularly in the education sector where processing large volumes of qualitative content (interviews, essays, applications) is common.