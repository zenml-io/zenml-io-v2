---
title: "Production Evaluation Pipeline for AI-Powered Dealer Stock Search Agent"
slug: "production-evaluation-pipeline-for-ai-powered-dealer-stock-search-agent"
draft: false
llmopsTags:
  - "customer-support"
  - "classification"
  - "agent-based"
  - "multi-agent-systems"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "evals"
  - "prompt-engineering"
  - "monitoring"
  - "cicd"
  - "databases"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "langchain"
  - "postgresql"
  - "redis"
  - "cache"
  - "elasticsearch"
  - "pinecone"
  - "wandb"
  - "anthropic"
  - "amazon-aws"
industryTags: "automotive"
company: "Motorway"
summary: "Motorway, a UK-based online car marketplace handling up to 2,500 vehicles and 8,000 dealer bids daily, worked with AWS to build an AI-powered dealer stock search agent that replaces hours of manual filtering with natural language queries. The challenge was ensuring reliable performance with real money on the line, particularly addressing tool selection errors, semantic search misinterpretations, context drift in multi-turn conversations, and non-deterministic outputs. By implementing an end-to-end evaluation pipeline combining the Strands Agents SDK with Amazon Bedrock AgentCore, Motorway reduced incorrect results from 1 in 8 queries to 1 in 50, improved tool selection accuracy from 87% to 98%, task completion from 82% to 96%, and cut issue detection time from hours to minutes."
link: "https://aws.amazon.com/blogs/machine-learning/evaluating-ai-agents-a-production-blueprint-with-strands-and-agentcore/"
year: 2026
seo:
  title: "Motorway: Production Evaluation Pipeline for AI-Powered Dealer Stock Search Agent - ZenML LLMOps Database"
  description: "Motorway, a UK-based online car marketplace handling up to 2,500 vehicles and 8,000 dealer bids daily, worked with AWS to build an AI-powered dealer stock search agent that replaces hours of manual filtering with natural language queries. The challenge was ensuring reliable performance with real money on the line, particularly addressing tool selection errors, semantic search misinterpretations, context drift in multi-turn conversations, and non-deterministic outputs. By implementing an end-to-end evaluation pipeline combining the Strands Agents SDK with Amazon Bedrock AgentCore, Motorway reduced incorrect results from 1 in 8 queries to 1 in 50, improved tool selection accuracy from 87% to 98%, task completion from 82% to 96%, and cut issue detection time from hours to minutes."
  canonical: "https://www.zenml.io/llmops-database/production-evaluation-pipeline-for-ai-powered-dealer-stock-search-agent"
  ogTitle: "Motorway: Production Evaluation Pipeline for AI-Powered Dealer Stock Search Agent - ZenML LLMOps Database"
  ogDescription: "Motorway, a UK-based online car marketplace handling up to 2,500 vehicles and 8,000 dealer bids daily, worked with AWS to build an AI-powered dealer stock search agent that replaces hours of manual filtering with natural language queries. The challenge was ensuring reliable performance with real money on the line, particularly addressing tool selection errors, semantic search misinterpretations, context drift in multi-turn conversations, and non-deterministic outputs. By implementing an end-to-end evaluation pipeline combining the Strands Agents SDK with Amazon Bedrock AgentCore, Motorway reduced incorrect results from 1 in 8 queries to 1 in 50, improved tool selection accuracy from 87% to 98%, task completion from 82% to 96%, and cut issue detection time from hours to minutes."
notion:
  pageId: "3aaf8dff-2538-80f8-8298-f6fc2fe2a8c4"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-27T11:55:00.000Z"
  lastEditedTime: "2026-07-27T11:55:00.000Z"
  publishedAt: "2026-07-27T12:08:56Z"
---

## Overview

Motorway is a UK-based online car marketplace that operates a high-volume daily auction platform where approximately 8,000 dealers bid on up to 2,500 vehicles. The company partnered with AWS Prototyping and AI Customer Engineering (PACE) to develop a conversational AI agent that fundamentally transforms how dealers discover vehicles in their marketplace. Before this implementation, dealers spent hours manually browsing listings through CSVs and navigating rigid filtering systems. The AI agent enables natural language interactions like "Find me diesel SUVs under 25k near my dealership" or "something sporty and automatic for a family," dramatically reducing search time while improving result relevance.

The agent architecture is built on the Strands Agents SDK and deployed through Amazon Bedrock AgentCore. It exposes eight distinct tools that combine structured filtering across more than 89 vehicle attributes with vector similarity search powered by LanceDB and Amazon Titan Text Embeddings V2. During peak hours, the system handles around 1,500 concurrent users, making reliability and accuracy critical business requirements. The post explicitly acknowledges that confident-sounding agent responses don't guarantee correct behavior, particularly when real financial transactions depend on the results.

## The Core LLMOps Challenge

The case study frames agent evaluation as fundamentally different from traditional LLM evaluation. While LLM evaluation focuses on text generation quality such as coherence, factual accuracy, and response relevance, agent evaluation must assess how the entire system performs across varied real-world conditions. The post uses an effective metaphor: LLM evaluation examines engine performance, while agent evaluation assesses how the whole car drives in traffic, rain, or with passengers.

Traditional LLM metrics fail to capture whether the agent called the right search tool for specific queries, whether it passed correct filter parameters to the underlying database, or whether it maintains context appropriately when dealers refine their searches across multiple conversational turns. The evaluation framework must address several specific failure modes: tool selection errors that cause incorrect search results and erode dealer trust, semantic search misinterpretations that return irrelevant results when parsing complex queries with multiple constraints, context drift in multi-turn conversations that loses dealer refinements, and non-deterministic outputs that make single-trial testing unreliable.

## Two-Phase Evaluation Strategy

The solution implements evaluation across two distinct phases that map to the GenAIOps lifecycle. The first phase is build-time evaluation, which catches issues before deployment using the strands-agents-evals framework during development and CI/CD. The second phase is production evaluation, which catches what synthetic tests miss through continuous monitoring with Amazon Bedrock AgentCore Evaluations after deployment.

The strands-agents-evals framework provides several key capabilities designed to work natively with agents built on the Strands Agents SDK: output validation, trajectory evaluation (examining the sequence of tool calls and reasoning steps), multi-turn conversation simulation, and automated experiment generation. The framework is structured around three primitives: Experiment (a collection of test cases run against the agent), Case (input query, expected output, and expected tool trajectory), and Evaluator (scoring logic that can be either deterministic or LLM-based).

## Three-Layer Assessment Framework

Build-time evaluation operates across three distinct layers, each with specific pass/fail thresholds that act as quality gates. Layer 1 focuses on tool usage and requires greater than 95 percent accuracy. This layer validates whether the agent called the right tools with correct parameters. For example, a query like "Diesel vehicles from £7,000 to £20,000" should use the search_vehicles tool with typed filters for fuel_type=diesel, min_price=7000, and max_price=20000. A query like "Modern hatchback with low mileage" should trigger hybrid_search, which combines semantic embeddings with structured filters. This layer uses deterministic measurement through components like ToolSelectionGrader (which checks which tools were called) and TrajectoryOrderGrader (which verifies the call sequence).

Layer 2 assesses reasoning quality and requires greater than 85 percent accuracy. This layer evaluates whether the decision-making process was logical. The HelpfulnessEvaluator and TrajectoryEvaluator from strands-agents-evals use LLM-as-judge scoring to assess whether the agent's reasoning holds together. The rationale is that an agent arriving at the right response through illogical reasoning will fail unpredictably as conditions change.

Layer 3 measures output quality and requires greater than 90 percent accuracy. This layer evaluates whether the response was helpful, accurate, and actionable from the user's perspective. The OutputEvaluator and GoalSuccessRateEvaluator use LLM-as-judge evaluation to assess whether the user received a useful, well-formatted response. All three layers must pass before deployment can proceed, with failure in any layer blocking the pipeline.

## Handling Non-Determinism with pass^k

A critical insight in the case study is that because LLM outputs vary between runs, single-trial results can be misleading. To address this, the evaluation framework accepts a num_trials parameter and implements two metrics from code generation research. The first is pass@k, which measures the likelihood of succeeding at least once in k attempts—useful when finding one correct solution is sufficient. The second is pass^k (pass to the power of k), which measures the probability of succeeding in k consecutive trials—crucial when users expect reliable behavior every time.

For customer-facing agents, the post emphasizes that pass^k matters most. An agent with a 75 percent per-trial success rate has only a 42 percent chance of passing three consecutive trials (0.75³). Users expect consistent quality on every interaction, not probabilistic success. The companion code implementation uses run_all_layers with multi-trial support and gates deployment on pass^k rather than single-trial success.

## Grader Types and Trade-offs

The evaluation framework employs three grader types, each suited to different evaluation needs. Code-based deterministic graders operate at Layer 1 and measure tool selection, parameter passing, and trajectory ordering. These are fast, cheap, and reproducible. LLM-as-judge graders using Claude Sonnet 4.6 operate at Layers 2-3 and measure reasoning quality, output helpfulness, and goal success. These are flexible but non-deterministic, with that non-determinism controlled through the pass^k approach. Human review is used for calibration, specifically for edge cases and safety concerns, but is expensive and primarily used to calibrate LLM judge prompts.

An important principle highlighted is that grading what the agent produced catches more issues than grading the path it took. The focus should be on whether the user got relevant results, not which tool the agent called first—though both have value in different contexts.

## Test Case Management and Growth

Test cases are organized into three categories: happy path cases for common queries that should succeed, edge cases for ambiguous queries involving slang or multi-turn refinements, and safety/guardrail cases for queries the agent should refuse or redirect. The test suite evolution is instructive: Motorway started with 50 test cases and grew to 150 over three months, with each addition grounded in real user behavior.

When production monitoring detects an issue, that interaction becomes a new test case, creating a feedback loop that consistently improves evaluation quality. The recommendation is to start with 20 to 50 cases and let production data grow the suite organically. Crucially, the post emphasizes including negative cases where the agent should not call certain tools—for instance, profile queries should call the profile tool not the search tool, and structured queries should use structured search not a raw SQL fallback.

## Multi-Turn Conversation Testing

Single-turn evaluation misses conversational coherence, which is critical since dealers naturally refine searches across multiple turns: "Find me diesel SUVs," then "Now show me only the automatics," then "What about estates instead?" The strands-agents-evals framework provides ActorSimulator to generate realistic multi-turn interactions and InteractionsEvaluator to score context retention across turns. Multi-turn tests catch context drift, filter accumulation errors, and pronoun resolution failures that single-turn tests miss.

## Production Monitoring with AgentCore Evaluations

After deploying the Strands Agent to Amazon Bedrock AgentCore Runtime, AgentCore Evaluations provides continuous monitoring. The integration works through OpenTelemetry instrumentation, the industry-standard observability framework. Observability traces are sampled at 1-5 percent, with metrics aggregating to Amazon CloudWatch.

AgentCore Evaluations offers two complementary monitoring modes. On-demand evaluation analyzes specific agent interactions by selecting spans from CloudWatch logs, useful for debugging issues or validating fixes. Online evaluation automatically samples live traffic and applies evaluators in the background. Configuration involves setting a sampling rate (1-5 percent recommended), selecting up to 10 evaluators, and letting it run continuously.

AgentCore provides several built-in evaluators: Builtin.Helpfulness measures how helpful the agent's response is (0-1 score across 7 levels) at the TRACE level, Builtin.GoalSuccessRate measures whether the user's overall goal was achieved at the SESSION level, Builtin.ToolSelection evaluates whether the agent selected appropriate tools at the TOOL_CALL level, and Builtin.Correctness assesses factual accuracy of the response at the TRACE level.

For domain-specific requirements, custom evaluators can be created using LLM-as-a-judge configuration. The post emphasizes that every agent has domain constraints that built-in evaluators don't cover, including data freshness, access scoping, forbidden actions, latency budgets, and cost limits. The companion repository includes five custom Evaluator subclasses: DataFreshnessEvaluator validates auction-cycle timestamps to prevent surfacing stale inventory, SafetyGuardrailEvaluator blocks automated bidding actions, DealerDataScopingEvaluator enforces dealer-scoped queries for data isolation, plus LatencyEvaluator and CostEvaluator examples.

## Key Metrics and Monitoring

The case study specifies concrete metrics to track for agent health. Task completion rate should target greater than 95 percent with alerts below 80 percent. Tool selection accuracy should target greater than 95 percent with alerts below 90 percent. Helpfulness score (0-1 scale) should target greater than 0.83 with alerts below 0.58. Response latency at P50/P99 should target less than 2s/10s with alerts above 5s/15s. Hallucination rate should target less than 2 percent with alerts above 5 percent. Cost per interaction should be monitored for trend with alerts at more than 2x baseline. The companion repository includes an AWS CDK stack that provisions CloudWatch dashboards and alarms for these metrics.

## Five-Stage Deployment Pipeline

The deployment pipeline integrates evaluation as a quality gate rather than an afterthought, following five phases. Build-time evaluation includes unit tests, tool correctness (ToolSelectionGrader greater than 95 percent), trajectory tests, and LLM-as-judge scoring (HelpfulnessEvaluator greater than 85 percent). Staging validation uses on-demand AgentCore evaluation with synthetic traffic against staging data. Shadow mode processes real production traffic in parallel without user impact—this should run for at least 4 hours with a 2 percent deviation threshold. A/B testing routes 5 percent of live traffic to the candidate agent for real outcome measurement. Production rollout then proceeds to 100 percent traffic with continuous online evaluation and monitoring.

Thresholds are defined for each phase, with tool selection accuracy below 95 percent or task completion below 80 percent blocking deployment. For major releases, multi-trial evaluation with num_trials=5 gates on pass^k to catch non-deterministic failures.

## Shadow Mode as a Critical Gate

Shadow mode deserves special attention as it operates between staging and production. The candidate agent receives a copy of production traffic, processes it in parallel, and compares outcomes without affecting users. Running shadow mode for at least 4 hours before A/B testing is recommended, with a deviation threshold (2 percent suggested) that pauses deployment automatically. Shadow mode catches issues that other stages miss: timeout handling under concurrent load, domain terminology missing from synthetic tests, and tool call ordering that causes latency spikes under real traffic patterns.

## Infrastructure and Implementation Details

The architecture in production involves dealer queries submitted through a web interface, routing to Amazon Bedrock AgentCore Runtime. The runtime orchestrates calls to eight different tools while using Amazon Bedrock models—specifically Claude for reasoning and Amazon Titan for embeddings. Tool responses flow back through the runtime to generate final dealer-facing results. The companion repository provides a deployable blueprint that can be adapted for other agents, with the core principles being system-agnostic requirements for any production-ready AI agent.

Prerequisites for implementation include an AWS account with permissions for Amazon Bedrock, AWS Lambda, Amazon S3, Amazon DynamoDB, Amazon EventBridge, Amazon CloudWatch, and Amazon SNS. AWS CDK v2 must be installed and bootstrapped, Python 3.14+ is required, and access to Anthropic Claude models and Amazon Titan models through Amazon Bedrock model access is necessary. The estimated time to complete is 30-45 minutes for initial deployment and 2-3 hours to customize for a specific domain. Running the sample evaluation suite costs approximately $5-10 in Amazon Bedrock inference charges, with production monitoring costs varying based on sampling rate.

The repository implements security best practices including least-privilege IAM roles, API keys stored in AWS Systems Manager Parameter Store rather than environment variables, and typed parameters to help prevent injection attacks.

## Measured Results and Business Impact

Before implementing the evaluation pipeline, the agent had 87 percent tool selection accuracy, meaning 1 in 8 dealer queries returned wrong results. The team experienced 12 production incidents per month, and it took an average of 4 hours to detect issues after they started affecting dealers. After implementing the pipeline, tool selection accuracy improved to 98 percent, task completion rate increased from 82 percent to 96 percent, context retention in multi-turn conversations improved from 71 percent to 94 percent, production incidents dropped from 12 per month to 2, and mean time to detect issues decreased from hours to minutes.

The business impact is quantified as dealers now completing vehicle searches in minutes instead of hours, with confidence that results are accurate and current. While the post comes from AWS and naturally promotes their services, the specific metrics and the before-after comparison provide concrete evidence of improvement.

## Critical Principles and Best Practices

Several key principles emerge as essential for production agent deployment. First, layer your evaluation across tool usage (greater than 95 percent), reasoning (greater than 85 percent), and output quality (greater than 90 percent) to catch different failure modes. Second, gate on pass^k rather than single trials, since a 75 percent per-trial success rate means only 42 percent reliability across three consecutive runs. Third, turn production failures into test cases to let real user behavior grow your evaluation suite. Fourth, use shadow mode to catch what synthetic tests miss, as real traffic reveals timeout handling, rare terminology, and latency patterns. Fifth, start monitoring at 1 percent sampling and scale gradually to manage evaluator costs.

The post acknowledges that while it demonstrates these patterns using AWS services, the core principles apply broadly to most multi-tool, customer-facing agents, whether building customer service agents querying knowledge bases and ticketing systems, financial advisory agents pulling portfolio data and market feeds, or healthcare triage agents accessing patient records and scheduling tools.

## Balanced Assessment

The case study provides substantial technical detail and concrete metrics that support the claimed improvements. The before-and-after comparison shows meaningful improvements across multiple dimensions. However, several caveats warrant consideration. The content originates from AWS and is explicitly promotional—the repository and approach heavily feature AWS services, though the post acknowledges that core principles are system-agnostic. The 87 percent initial tool selection accuracy suggests the agent may have been deployed prematurely or that the problem space is genuinely challenging. The case study doesn't discuss the engineering effort required to build and maintain the evaluation infrastructure, the operational complexity of managing multiple evaluation layers, or the ongoing costs of LLM-as-judge evaluators at scale. The 1-5 percent sampling rate for production monitoring means not all interactions are evaluated, potentially missing rare but critical failures. The reliance on Claude Sonnet 4.6 for LLM-as-judge evaluation introduces both cost and potential bias in evaluation results.

Nevertheless, the systematic approach to agent evaluation is sophisticated and addresses real production challenges. The emphasis on pass^k for consistency, multi-turn conversation testing, shadow mode deployment, and the feedback loop from production to test cases all represent mature LLMOps practices. The three-layer framework provides a useful mental model for thinking about agent reliability beyond simple output quality.
