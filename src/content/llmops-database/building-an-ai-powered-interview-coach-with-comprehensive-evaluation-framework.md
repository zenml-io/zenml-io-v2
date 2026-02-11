---
title: "Building an AI-Powered Interview Coach with Comprehensive Evaluation Framework"
slug: "building-an-ai-powered-interview-coach-with-comprehensive-evaluation-framework"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69088b5e4a108565edb8af64"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:23:08.362Z"
  createdOn: "2025-11-03T11:00:46.683Z"
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "classification"
  - "structured-output"
  - "prompt-engineering"
  - "evals"
  - "human-in-the-loop"
  - "error-handling"
  - "system-prompts"
  - "token-optimization"
  - "cost-optimization"
  - "serverless"
  - "fastapi"
  - "pytorch"
  - "documentation"
  - "anthropic"
  - "openai"
industryTags: "education"
company: "Product Talk"
summary: "Teresa Torres, founder of Product Talk, describes her journey building an AI interview coach over four months to help students in her Continuous Discovery course practice customer interviewing skills. Starting from a position of limited AI engineering experience, she developed a production system that analyzes interview transcripts and provides detailed feedback across four dimensions of interviewing technique. The case study focuses extensively on her implementation of a comprehensive evaluation (eval) framework, including human annotation, code-based assertions, and LLM-as-judge evaluations, to ensure quality and reliability of the AI coach's feedback before deploying it to real students."
link: "https://www.youtube.com/watch?v=CG4O5zLICFg"
year: 2025
seo:
  title: "Product Talk: Building an AI-Powered Interview Coach with Comprehensive Evaluation Framework - ZenML LLMOps Database"
  description: "Teresa Torres, founder of Product Talk, describes her journey building an AI interview coach over four months to help students in her Continuous Discovery course practice customer interviewing skills. Starting from a position of limited AI engineering experience, she developed a production system that analyzes interview transcripts and provides detailed feedback across four dimensions of interviewing technique. The case study focuses extensively on her implementation of a comprehensive evaluation (eval) framework, including human annotation, code-based assertions, and LLM-as-judge evaluations, to ensure quality and reliability of the AI coach's feedback before deploying it to real students."
  canonical: "https://www.zenml.io/llmops-database/building-an-ai-powered-interview-coach-with-comprehensive-evaluation-framework"
  ogTitle: "Product Talk: Building an AI-Powered Interview Coach with Comprehensive Evaluation Framework - ZenML LLMOps Database"
  ogDescription: "Teresa Torres, founder of Product Talk, describes her journey building an AI interview coach over four months to help students in her Continuous Discovery course practice customer interviewing skills. Starting from a position of limited AI engineering experience, she developed a production system that analyzes interview transcripts and provides detailed feedback across four dimensions of interviewing technique. The case study focuses extensively on her implementation of a comprehensive evaluation (eval) framework, including human annotation, code-based assertions, and LLM-as-judge evaluations, to ensure quality and reliability of the AI coach's feedback before deploying it to real students."
---

## Overview

Teresa Torres, author of "Continuous Discovery Habits" and founder of Product Talk Academy, built an AI-powered interview coach over a four-month period starting in April 2024. The tool is designed to provide feedback to students learning customer interviewing techniques in her Continuous Interviewing course. This case study is particularly valuable because it documents the complete journey from non-expert to production deployment, with extensive focus on evaluation methodologies for ensuring LLM quality in an educational context.

The interview coach analyzes student practice interviews (submitted as transcripts) and provides detailed feedback across four specific dimensions: opening with a story-based question, setting the scene, building the timeline, and redirecting generalizations. Students receive personalized coaching emails that include scores, excerpted examples from their interviews, and specific tips for improvement. What makes this case study exceptional is Torres's transparency about her learning process and her deep dive into evaluation frameworks—the mechanisms for determining whether an AI product is performing adequately.

## The Problem and Initial Context

Torres teaches a very specific methodology of customer interviewing that emphasizes collecting concrete stories about past behavior rather than hypothetical scenarios or generalizations. In her course, students practice interviewing each other, and the pedagogy relies heavily on deliberate practice—the concept that skill-building requires not just practice but expert feedback on that practice. The challenge was that while students could give each other feedback using a rubric, they weren't yet experts themselves, so the feedback quality was limited.

During her recovery from ankle surgery in spring 2024, Torres began exploring what generative AI made "just now possible" in the context of her courses. She wondered whether AI could help students give each other better feedback, or more directly, whether AI could model what good expert feedback looks like. This led to early experiments with what would become the interview coach.

Torres's background includes early career work as a front-end developer and interaction designer in the late 1990s, followed by product management roles. She had returned to coding about three to four years prior after reading "Ask Your Developer" by Jeff Lawson, which inspired her to use code to automate business operations. However, she explicitly states she was not an engineering expert when starting this project and had never written Python or used Jupyter notebooks before beginning this work.

## Technical Architecture and Implementation

The interview coach operates as a workflow-based system deployed in a serverless AWS environment using Lambda functions orchestrated through Step Functions. Students upload interview transcripts (as SRT files with timestamps) through the course platform, and the system processes these through multiple LLM calls to generate comprehensive feedback emails.

The architecture evolved from a single "mega prompt" to a workflow pattern where each of the four feedback dimensions is handled by separate prompts. This modular approach allows for more targeted optimization and clearer evaluation. Torres uses a mix of Anthropic Claude models (primarily for the main coach responses due to fewer hallucinations with transcript data) and OpenAI models (particularly GPT-4 Mini for cost efficiency in certain operations). The system includes multiple helper functions that pre-process transcripts and LLM responses before they reach individual evaluation or coaching components.

A critical technical decision was implementing prompt caching for Anthropic's API. Since interview transcripts can be quite long (up to 20,000 tokens), and the coach makes multiple LLM calls on the same transcript, caching the transcript significantly reduces costs. Torres reports that she moved away from using the Python library Instructor for structured JSON output specifically because it broke prompt caching functionality. Instead, she implemented her own JSON validation as a guardrail that runs before returning responses to users.

The cost per transcript analysis ranges from 2 to 20 cents depending on transcript length, including both the coach response and all evaluation runs. Torres expects this to continue decreasing over time as model costs decline. She manages a development environment and production environment through AWS CloudFormation, which she learned specifically for this project.

## The Evaluation Framework: Core Concepts and Implementation

The heart of this case study is Torres's comprehensive discussion of evaluations (evals)—the mechanisms for assessing whether an AI product is performing well. She emphasizes that she was initially confused by conflicting definitions of evals from various sources, including OpenAI's documentation, technical blog posts, and AI engineering tools. Through taking an AI Evaluations course taught by Shreya Shankar and Hamel Husain on Maven, she developed a clearer framework.

Torres defines evals simply as "how we're going to evaluate if our AI product is good or not." She draws an analogy to software testing: evals are to LLM systems what unit tests and integration tests are to traditional software. Just as development teams write tests to ensure code works as expected and run them continuously in CI/CD pipelines, AI product teams need evals to ensure their LLM systems perform as intended.

She identifies three primary types of evals:

**Data set-based evals** involve defining specific inputs with their expected outputs, running those inputs through the LLM, and comparing actual outputs to expected outputs. Torres initially struggled with this approach because generating realistic synthetic interview transcripts proved difficult—interviews are long, nuanced interactions that are hard to simulate convincingly.

**Code-based assertions** use programmatic logic to evaluate LLM responses. For example, Torres implemented a remarkably effective code assertion to detect when the coach suggests "general questions" (questions asking about typical or usual behavior rather than specific instances). The eval simply searches for keywords like "typically," "typical," "general," "generally," "usual," and "usually" in suggested questions. Despite being crude, this eval performs exceptionally well and aligns closely with human judgment. She notes this taught her to "start with the simplest dumbest eval because it might work."

**LLM-as-judge evals** use another LLM to evaluate the primary LLM's output. For instance, Torres created an LLM-as-judge eval to detect when the coach suggests "leading questions" (questions that imply an expected answer). She provides the judge LLM with a prompt explaining what constitutes a leading question and asks it to evaluate individual questions suggested by the coach. This approach worked well because LLMs understand the concept of leading questions effectively.

## The Evaluation Loop and Error Analysis Process

Torres emphasizes a critical concept from the AI Evals course: the evaluation loop, which consists of three stages—analyze, measure, and improve. This mirrors the scientific method and resonates with her product discovery methodology.

The **analyze stage** involves examining traces (detailed records of AI interactions including system prompts, user inputs, and LLM responses) to identify errors. Torres stores all traces in Airtable, though she acknowledges this isn't optimal for long text performance. She built a custom annotation interface using Airtable's interface designer where she reviews each trace, writes notes about what the coach did well or poorly, and tags failure modes.

Her first round of error analysis revealed numerous problems, which was initially discouraging. She found that looking across many annotated traces revealed patterns—certain types of errors occurred repeatedly. The most common failure modes became the focus for developing specific evals. She strongly emphasizes that error analysis is use-case specific: "if we don't do the error analysis, we don't know what errors to measure in the first place." Off-the-shelf eval tools measure generic things, but they won't capture the specific problems occurring in your particular application.

The **measure stage** involves building evals that can quantify how often each identified failure mode occurs. Torres documented two particularly concerning failure modes: the coach suggesting leading questions and suggesting general questions. These were "catastrophic failures" from a teaching perspective because they would teach students bad habits. She prioritized building evals for these errors first.

The **improve stage** involves making changes to prompts, models, temperature settings, or system architecture and then re-running evals to determine if the changes helped. Torres emphasizes this created a fast feedback loop that allowed her to iterate confidently. She could make a change, run her evals, visualize the results, and decide whether to release based on concrete data rather than intuition.

## Technical Tools and Development Environment

Torres's journey through tool selection is instructive for teams starting LLM projects. She explicitly chose to start with tools she already knew (Airtable) rather than immediately adopting specialized AI evaluation frameworks, even though Airtable wasn't optimal for her use case. This strategy minimized cognitive load while she learned new concepts.

She began writing evals in Apple Notes using pseudocode but found this frustrating due to formatting issues (smart quotes breaking JSON). Her husband, also an engineer, suggested Jupyter notebooks, which she had never used. Notebooks provided a crucial capability: combining markdown notes, executable code blocks, and data visualizations in a single file. This became her "thinking space" where she could draft approaches in plain English, write code to test them, run experiments in parallel cells, and immediately visualize results.

Despite being a JavaScript/Node.js programmer, Torres chose Python for her eval work specifically because Python has powerful data visualization libraries she wanted to leverage. She had never written Python before starting on a Sunday and had her first five evals running by Thursday, relying heavily on ChatGPT to answer basic questions like "How do I use a Jupyter notebook?" and "What does this line of code do?"

She later transitioned to VS Code with Claude Code integration. The benefits included having Claude as an AI assistant with access to her entire repository context, proper version control integration, and the ability to move eval code from throwaway notebooks into her production codebase. She maintains notebooks for data analysis while keeping eval logic in her regular code repository so it can be deployed to development and production environments and potentially run as guardrails.

Torres built custom tooling to support her workflow, including a trace annotation interface that Claude Code generated based on her description. This tool provides a progress bar, displays full LLM responses, and includes text boxes for annotations and failure mode tags, with keyboard shortcuts for efficient labeling. She also developed diagnostic tools in her notebooks that show which traces failed which evals and allow her to drill into specific failures to examine all intermediate outputs.

## Scoring Evals and Human Alignment

A crucial insight from Torres's work is that evals themselves need evaluation. Simply having an eval detect errors isn't sufficient—you need confidence that the eval is correctly identifying errors. She addresses this through comparison with human labels, generating statistical measures of eval performance.

After running her first five evals, she created comparison tables showing true positives (eval and human both identified an error), false positives (eval identified an error but human didn't), false negatives (human identified an error but eval didn't), and true negatives (both agreed no error existed). These metrics revealed which evals were performing well and which needed refinement.

Interestingly, Torres discovered that in some cases, the evals were actually better than her initial human judgment. When writing deterministic logic to detect certain errors (like "too much setting the scene"), she had to think more rigorously about what constituted the error than when she relied on intuition during manual annotation. This led her to revise her own rubric, improving both the eval and her teaching materials. She describes this as "mind-blowing"—the process of training an AI to evaluate interviews helped her better understand the material she had been teaching for years.

She emphasizes ongoing alignment checking: even after evals are working well, they should be periodically compared against new human labels to ensure they haven't drifted. LLM behavior can change with model updates, and the distribution of errors can shift as the system improves in some areas.

## Production Deployment and Guardrails

Torres deployed the interview coach to two cohorts totaling 20-50 students in July 2024, with plans for broader release. She maintains complete transparency with users, explicitly stating in the feedback emails that an AI coach generated the response and that the system is in beta with known issues. She personally reviews every email sent during this period as part of ongoing error analysis.

The system implements certain evals as guardrails—evals that run before returning a response to users. If a guardrail fails, the system takes corrective action rather than showing potentially problematic output to students. For example, Torres implemented a guardrail to validate JSON structure (since she stopped using the Instructor library). If the JSON validation fails, instead of re-running the entire coach, a separate LLM call attempts to fix the JSON output before returning it.

She currently runs all her evals on every production trace because volume is manageable with cohort-based courses (20-50 students at a time). As usage scales, particularly through a partnership with the opportunity solution tree tool Visibly, she plans to run evals on a percentage of traces, though she'll need to assess costs first to determine what's sustainable.

Torres implements clear data governance policies. She informs users that interview transcripts and LLM responses are stored for 90 days to support product improvement, and she has automated deletion processes for data exceeding this retention period. Student transcripts are stored in Airtable, but for the Visibly partnership involving real customer interviews, only LLM responses are stored in Airtable, not the actual transcripts. She ensures all third-party tools (Airtable, AWS, Zapier) are SOC 2 compliant and verifies that none train on customer data.

## Development Process and Methodology

Torres maintains two sets of traces for evaluation: a development set of 25 transcripts used for iterative improvement, and a hold-out test set of 100 transcripts used for final validation before releases. The dev set is smaller to keep costs manageable during rapid iteration, while the test set provides confidence that improvements generalize beyond the development data.

Her release process involves making changes, running evals on the dev set to assess impact, and then—if results look promising—running evals on the full test set before deploying to production. She notes this is essentially A/B testing: comparing eval performance between the current production version and the proposed change. She acknowledges that no change is categorically better across all dimensions; there's still judgment involved in deciding whether overall performance has improved enough to warrant release.

A key challenge is ensuring that dev and test sets represent the diversity of actual production usage. Torres continuously refines both sets to match the types of transcripts appearing in production traces. This prevents overfitting to narrow cases and helps ensure eval results predict real-world performance.

Torres's workflow evolved from working entirely in Airtable and Jupyter notebooks to a more sophisticated setup with VS Code, proper development and production environments, CloudFormation infrastructure management, error handling, and actual unit and integration tests for her code. She learned all of these practices during the project, never having previously worked in an IDE, managed separate environments, or written comprehensive tests. She credits ChatGPT and Claude with enabling this rapid learning, describing them as teachers that handle "all my dumb questions" without judgment.

## Cost Management and Performance Optimization

Cost optimization emerged as a critical concern given the length of interview transcripts and the multiple LLM calls involved in generating feedback. Torres employs several strategies:

**Model selection**: She starts with the best-performing model for each eval, then gradually experiments with smaller/cheaper models, comparing performance at each step. She seeks the smallest model that performs as well as the best model. For simple tasks like checking individual questions for leading language, GPT-4 Mini proves sufficient at extremely low cost (around $0.001 per eval).

**Prompt caching**: By caching the interview transcript across multiple LLM calls, she significantly reduces token costs. This was important enough that she abandoned the Instructor library specifically because it broke caching.

**Efficient eval design**: She structures her evals to receive minimal, targeted context rather than full responses. Helper functions extract only relevant portions (like questions the coach suggested) before sending to evals. A simple task with minimal input tokens costs much less than sending entire coaching responses and asking the LLM to find specific elements.

**Smart development practices**: Running helper functions once and storing their outputs allows her to re-run evals during development without re-processing transcripts. Her dev set eval runs cost about $3 total, but only $2.40 of that is the helpers. She can iterate on evals for around $0.50-$0.60 per run by skipping helper re-execution.

**Volume management**: She logs input tokens, output tokens, whether tokens were cached, and estimated cost for every trace. This data informs pricing decisions, rate limiting strategies, and partnership planning.

Torres also tracks LLM response performance, noting that LLMs return token usage details in their API responses, which she logs for cost calculation and monitoring purposes.

## Key Lessons and Insights

Several important themes emerge from Torres's experience that have broader implications for LLMOps:

**Product managers need deep involvement in LLM development**: Torres argues that while engineers might write the eval code, product managers and designers must be involved in prompt design and eval design because they possess domain expertise that's critical for identifying relevant errors and evaluating whether fixes work. She questions "how in the world are product teams going to do this" without closer cross-functional collaboration than traditional software development requires.

**Start simple and iterate**: Her most effective eval was a simple keyword search. She advocates starting with "the simplest dumbest eval" rather than immediately building complex solutions, because simple approaches often work surprisingly well.

**Evals are use-case specific**: Off-the-shelf eval tools measure generic metrics that may not align with your specific product's failure modes. Error analysis must come first to identify what actually matters for your application.

**AI products require continuous investment**: Torres believes that unlike traditional software where you can "finish" a feature, AI products will drift over time and require ongoing evaluation and refinement. Teams must commit to continuous investment if they care about quality.

**Fixing one error often reveals new errors**: As she improved the coach in certain dimensions, new categories of errors emerged. This necessitates continuous human labeling, continuous error analysis, and evolution of the eval suite.

**The learning curve is surmountable**: Torres's journey from Python novice to production deployment in four months demonstrates that the barrier to entry for LLM development has lowered significantly. She attributes much of this to using LLMs themselves as learning tools—asking ChatGPT and Claude basic questions without fear of judgment.

**Tooling choices matter less than starting**: She emphasizes not getting overwhelmed by the ecosystem of specialized AI tools. Starting with familiar tools (even suboptimal ones like Airtable) and learning incrementally proved more effective than trying to adopt best-in-class tooling immediately.

## Broader Context and Future Direction

Torres is building the interview coach as part of Product Talk Academy's offering, with plans to make it available to course alumni through a CDH membership program. She's partnering with Visibly, an opportunity solution tree tool, to integrate the interview coach into their platform for broader access.

She's launching a podcast called "Just Now Possible" exploring what generative AI enables that wasn't previously feasible, indicating ongoing exploration in this space. An August 20th blog post will share additional lessons from building the interview coach.

Torres explicitly positions her sharing as "working out loud" rather than expert advice. She's transparent about being exhausted with AI hype and carefully avoids contributing to claims like "product management is dead" or "PRDs are dead." Her behind-the-scenes webinar format is deliberately raw and unpolished, contrasting with her more polished product discovery content, as a way to create space for genuine learning without inflating capabilities or promises.

The case demonstrates that effective LLMOps for educational applications requires not just technical competence but pedagogical expertise, careful attention to what constitutes quality in domain-specific contexts, and willingness to invest significantly in evaluation infrastructure before and after deployment. Torres's transparency about challenges, costs, ongoing limitations, and the continuous nature of the work provides a realistic counterweight to much of the breathless AI product discourse.