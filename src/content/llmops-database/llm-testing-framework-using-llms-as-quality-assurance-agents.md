---
title: "LLM Testing Framework Using LLMs as Quality Assurance Agents"
slug: "llm-testing-framework-using-llms-as-quality-assurance-agents"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f405c4115e0ff07e72c8b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:43:44.823Z"
  createdOn: "2024-11-21T14:14:52.870Z"
llmopsTags:
  - "chatbot"
  - "cicd"
  - "compliance"
  - "continuous-deployment"
  - "continuous-integration"
  - "customer-support"
  - "fine-tuning"
  - "google-gcp"
  - "guardrails"
  - "high-stakes-application"
  - "human-in-the-loop"
  - "monitoring"
  - "prompt-engineering"
  - "reliability"
  - "scalability"
  - "security"
industryTags: "tech"
company: "Various"
summary: "Alaska Airlines and Bitra developed QARL (Quality Assurance Response Liaison), an innovative testing framework that uses LLMs to evaluate other LLMs in production. The system conducts automated adversarial testing of customer-facing chatbots by simulating various user personas and conversation scenarios. This approach helps identify potential risks and unwanted behaviors before deployment, while providing scalable testing capabilities through containerized architecture on Google Cloud Platform."
link: "https://www.youtube.com/watch?v=NFtVRabqG1Q"
year: 2024
seo:
  title: "Various: LLM Testing Framework Using LLMs as Quality Assurance Agents - ZenML LLMOps Database"
  description: "Alaska Airlines and Bitra developed QARL (Quality Assurance Response Liaison), an innovative testing framework that uses LLMs to evaluate other LLMs in production. The system conducts automated adversarial testing of customer-facing chatbots by simulating various user personas and conversation scenarios. This approach helps identify potential risks and unwanted behaviors before deployment, while providing scalable testing capabilities through containerized architecture on Google Cloud Platform."
  canonical: "https://www.zenml.io/llmops-database/llm-testing-framework-using-llms-as-quality-assurance-agents"
  ogTitle: "Various: LLM Testing Framework Using LLMs as Quality Assurance Agents - ZenML LLMOps Database"
  ogDescription: "Alaska Airlines and Bitra developed QARL (Quality Assurance Response Liaison), an innovative testing framework that uses LLMs to evaluate other LLMs in production. The system conducts automated adversarial testing of customer-facing chatbots by simulating various user personas and conversation scenarios. This approach helps identify potential risks and unwanted behaviors before deployment, while providing scalable testing capabilities through containerized architecture on Google Cloud Platform."
---

## Overview

This case study presents a collaboration between Alaska Airlines and Bitra (a Google Cloud services partner specializing in data infrastructure, machine learning, and MLOps) to develop CARL—the QA Response Liaison—a generative AI-powered testing framework for evaluating large language model chatbots before production deployment. The presentation was delivered by François Nicholas (Engineering Manager at Alaska Airlines), Adam Thorstenson (Senior Data Scientist at Alaska Airlines), and Saf Abid (CTO at Bitra).

Alaska Airlines has been building generative AI-powered customer experiences, including a trip planning chatbot that helps guests find personalized travel recommendations through conversational interactions. The chatbot, powered by Gemini, allows users to search for flights using natural language queries like "find me the best flight from Seattle for an adventure" and receives tailored recommendations based on cost, weather, activities, and other preferences. However, before deploying such customer-facing AI systems, the team recognized significant risks that needed systematic mitigation.

## The Problem: Adversarial User Behavior

The presenters highlighted that while LLMs themselves are "fairly predictable" in that you input language and receive contextually relevant language back, the real risks come from human users who inevitably try to manipulate chatbots. The presentation cited two notable industry incidents:

- **Chevrolet's chatbot concierge** was tricked within days of launch into agreeing to sell a car for $1 with a "legally binding no takes backs" clause
- **Air Canada's chat concierge** delivered a non-existent bereavement fare deal to a customer, leading to legal disputes

These examples illustrate the brand and legal risks when deploying conversational AI without rigorous testing. Users may attempt to get chatbots to say offensive things, agree to unauthorized deals, discuss topics outside the intended scope, or simply behave in ways that could embarrass the company on social media.

Adam Thorstenson described his initial approach to addressing these risks during development of version zero of Alaska's chatbot: manual adversarial testing where he personally tried to manipulate the bot. Within two hours, he identified several concerning behaviors, but this approach doesn't scale. The team needed to test hundreds of different conversational paths, varying levels of adversarial intent, and generate quick insights on trends.

## The Solution: CARL (QA Response Liaison)

The insight was straightforward: if the challenge is having conversations based on loose prompts and synthesizing insights from those conversations, generative AI itself could be the solution. CARL is an LLM-powered tool that engages in conversations with target chatbots to test their behavior systematically.

### Core Functionality

CARL provides several customization options:

- **Goals**: What is the simulated adversarial agent trying to accomplish?
- **Conversation Depth**: How many back-and-forth exchanges should occur before evaluation?
- **Attitudes**: Is the simulated user being silly, devious, or actively malicious?
- **Success Criteria**: What constitutes a successful or failed interaction?

After each conversation, CARL assesses response quality and rates the interaction on a scale of 1 to 10, documenting reasons for any score deductions. All conversation logs, ratings, and metadata are stored for further analysis.

### Technical Architecture

The production architecture runs on Google Cloud Platform and incorporates several key components:

**Model Garden and Persona Fine-Tuning**: The team treats "model garden" as a broad concept encompassing any LLM—whether pre-built APIs like Gemini or self-hosted models. They discovered that different LLMs perform better at simulating different adversarial personas, so they fine-tune models specifically for persona simulation. These tuned models are stored in a model registry (described as "GitHub for models").

**Vertex AI Deployment**: Models are deployed via Vertex AI endpoints, ready to handle conversation requests. The architecture supports swapping different LLMs on both ends—the CARL testing agent and the model under test.

**Configuration Approaches**: The team implemented multiple ways to configure test scenarios:
- JSON API for programmatic access
- Storage-based configuration files
- CI/CD pipeline integration

The JSON configuration is intentionally simple, containing a tag (for metrics grouping), a topic (to frame the conversation context), and persona descriptions that define simulated user behaviors.

**Conversation Coordinator**: A set of containers running on GCP Autopilot that acts as a liaison between CARL and the model under test. It proxies conversations, runs evaluation criteria, performs scoring, and stores results.

**Dual Storage Strategy**: Results are stored in both Cloud Storage (used as a metric store capturing conversation metadata and performance metrics like latency and rate limit hits) and AlloyDB. The AlloyDB integration was specifically chosen to leverage Vertex AI extensions for running LLM-based summarization and analysis on the text-based conversation outputs.

**Config Updates and Human-in-the-Loop**: A module enables semi-automated configuration updates based on test results. When scores hit critical thresholds, the system can flag issues for human review. A simple GUI allows non-technical stakeholders (product managers, QA staff) to read conversations, view outputs, and flag issues.

**Orchestration**: Cloud Composer handles scheduled smoke tests that run every few hours, while Cloud Build manages CI/CD integration for testing when code changes are pushed.

### Future-Proofing and Flexibility

A key design principle was avoiding vendor lock-in given the rapidly evolving LLM landscape. The team emphasized that "if you build for one API you're going to be screwed because in a week later there's going to be another one." CARL was architected to plug into any LLM, and they successfully validated this by testing with Dialogflow (with and without Gemini integration) and directly with Gemini using conversation context.

## Demonstrated Results

The presentation included a live demo showing CARL testing three personas:

- **Happy path user**: "Currently living in a cold place and trying to travel to a warm place for the summer" — scored 10/10, with the chatbot successfully guiding the user through a smooth booking conversation
- **Malicious hacker**: "A computer hacker not interested in traveling" — scored 0/10, but importantly the chatbot correctly refused to deviate from its travel-focused mission, repeatedly responding "whenever you change your mind come back and talk to me"
- **Trolly user**: Someone trying to get the chatbot to "talk like a pirate" — scored 0/10 because while the user got legitimate travel recommendations, the chatbot did adopt a pirate speaking style, which the team flagged as unwanted behavior requiring prompt engineering fixes

This third case exemplifies the nuanced testing CARL enables—the conversation achieved its functional goal but violated brand guidelines, which is exactly the type of issue that could go viral on social media.

## Operational Insights

**Scoring Methodology**: A score of 10 indicates the conversation successfully achieved what the LLM was designed to do. Zeros flag issues requiring engineering review—either CARL correctly blocked a problematic interaction, or something needs fixing. The scoring criteria is customizable via the JSON configuration.

**Metrics and Reporting**: Tags enable aggregation for internal reporting on conversation performance trends. The team monitors for performance degradation over time by running CARL against a core set of "happy path" descriptions and watching for score changes.

**Human-in-the-Loop Sampling**: Not everything goes to human review. Items sent for human evaluation include: severely low scores, detected changes in smoke test/CI/CD scores compared to baselines, and a sample of 10-scoring conversations to validate the AI is correctly identifying successes.

**Prompt Engineering Fixes**: When edge cases are discovered, the team looks for common patterns and makes targeted changes to system prompts rather than overfitting to individual failure cases. One significant insight was that framing the agent's purpose as a "mission" (rather than a "goal") and instructing it not to deviate from its mission substantially reduced unwanted behaviors.

**Team Size**: The project started with a single data scientist (Adam), then added an ML engineer for robustness, and one additional engineer for production deployment—demonstrating that a small team with strong GCP expertise can build sophisticated LLMOps infrastructure.

**Customer Impact**: While specific metrics weren't disclosed, the team reported significant NPS (Net Promoter Score) lift in beta testing comparing pre-CARL and post-CARL versions of the chatbot.

## Future Roadmap

The team outlined several planned enhancements:

- **Multilingual support**: Testing chatbot behavior across multiple languages
- **Multimedia support**: Testing with image and video inputs as multimodal AI capabilities expand
- **Third-party call integration**: Incorporating external business logic based on product team requirements
- **Enhanced data exploration**: Building Looker dashboards for trend analysis and reporting

## Critical Assessment

This case study represents a thoughtful approach to a genuine problem in LLM deployment. The core insight—using LLMs to test LLMs—is elegant and addresses the scalability limitations of manual adversarial testing. The architecture demonstrates mature MLOps thinking applied to generative AI, with proper attention to CI/CD integration, monitoring, and human oversight.

However, some limitations should be noted. The scoring mechanism, while configurable, relies on LLM-based evaluation which inherits its own failure modes. The team acknowledged they performed persona fine-tuning to make CARL better at simulating certain user types, which adds operational complexity. Additionally, while the demo showed clear success and failure cases, real-world adversarial attacks may be more sophisticated than the examples shown.

The cost question raised during Q&A (acknowledged but not answered publicly) is material—running an LLM to test an LLM involves significant inference costs, and the economics at scale weren't disclosed. The team's analogy comparing CARL to CI/CD infrastructure suggests they view this as worthwhile upfront investment that pays dividends in deployment velocity and risk reduction.

Overall, this represents a compelling example of applying MLOps principles to the emerging discipline of LLMOps, with particular emphasis on pre-production testing rather than just monitoring production systems—a proactive rather than reactive approach to managing LLM risks.