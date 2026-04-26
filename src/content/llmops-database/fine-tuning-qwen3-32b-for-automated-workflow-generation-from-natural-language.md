---
title: "Fine-Tuning Qwen3-32B for Automated Workflow Generation from Natural Language"
slug: "fine-tuning-qwen3-32b-for-automated-workflow-generation-from-natural-language"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "code-generation"
  - "structured-output"
  - "fine-tuning"
  - "few-shot"
  - "agent-based"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "evals"
  - "prompt-engineering"
  - "instruction-tuning"
  - "pytorch"
  - "monitoring"
  - "cicd"
  - "continuous-deployment"
  - "continuous-integration"
  - "documentation"
  - "hugging-face"
industryTags: "e-commerce"
company: "Shopify"
summary: "Shopify built a fine-tuned tool-calling agent based on Qwen3-32B to generate Flow automation workflows from natural language queries within their Sidekick AI assistant. The team addressed the cold-start problem by reverse-engineering synthetic training data from existing production workflows, then improved model performance by translating their JSON DSL into Python for training. The resulting model is 2.2x faster and 68% cheaper than the frontier model it replaced, though initial deployment revealed a 35% gap in activation rates that was closed through a weekly retraining flywheel incorporating real merchant data, LLM-based evaluation judges, and continuous improvement loops."
link: "https://shopify.engineering/fine-tuning-agent-shopify-flow"
year: 2026
seo:
  title: "Shopify: Fine-Tuning Qwen3-32B for Automated Workflow Generation from Natural Language - ZenML LLMOps Database"
  description: "Shopify built a fine-tuned tool-calling agent based on Qwen3-32B to generate Flow automation workflows from natural language queries within their Sidekick AI assistant. The team addressed the cold-start problem by reverse-engineering synthetic training data from existing production workflows, then improved model performance by translating their JSON DSL into Python for training. The resulting model is 2.2x faster and 68% cheaper than the frontier model it replaced, though initial deployment revealed a 35% gap in activation rates that was closed through a weekly retraining flywheel incorporating real merchant data, LLM-based evaluation judges, and continuous improvement loops."
  canonical: "https://www.zenml.io/llmops-database/fine-tuning-qwen3-32b-for-automated-workflow-generation-from-natural-language"
  ogTitle: "Shopify: Fine-Tuning Qwen3-32B for Automated Workflow Generation from Natural Language - ZenML LLMOps Database"
  ogDescription: "Shopify built a fine-tuned tool-calling agent based on Qwen3-32B to generate Flow automation workflows from natural language queries within their Sidekick AI assistant. The team addressed the cold-start problem by reverse-engineering synthetic training data from existing production workflows, then improved model performance by translating their JSON DSL into Python for training. The resulting model is 2.2x faster and 68% cheaper than the frontier model it replaced, though initial deployment revealed a 35% gap in activation rates that was closed through a weekly retraining flywheel incorporating real merchant data, LLM-based evaluation judges, and continuous improvement loops."
notion:
  pageId: "34df8dff-2538-80b0-a904-fa45801d90d1"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-25T14:05:00.000Z"
  lastEditedTime: "2026-04-25T14:05:00.000Z"
  publishedAt: "2026-04-26T09:57:35Z"
---

## Overview

Shopify developed a production LLMOps system for their Sidekick AI commerce assistant to automatically generate Shopify Flow workflows from natural language descriptions. Shopify Flow is an automation platform where merchants build workflows composed of triggers, conditions, and actions—a powerful but complex tool that presents a high barrier for non-technical users. The team fine-tuned Qwen3-32B into a specialized tool-calling agent that translates plain English requests into executable workflow automations, replacing a previous system built on closed frontier models.

The case study is particularly valuable because it demonstrates the full lifecycle of taking a fine-tuned model to production: from addressing the cold-start data problem, through representation design decisions, infrastructure considerations, production deployment challenges, and ultimately building a continuous improvement flywheel. The team's transparency about failures and lessons learned—including benchmark metrics that masked real-world performance gaps—provides rare insight into production LLMOps challenges.

## The Cold Start Problem and Synthetic Data Generation

Since the feature hadn't been deployed yet, there was no production conversation data to train on. The team addressed this by reverse-engineering user intent from existing production workflows. They sampled thousands of anonymized workflows that merchants had manually built in Flow, filtering for quality signals: workflows that had executed at least once in the last seven days, from merchants with multiple qualifying workflows, ensuring diversity across workflow types.

Their synthetic data generation process involved three steps: sampling a validated production workflow, using a stronger LLM to generate plausible natural-language requests that would lead to that workflow, and constructing the complete multi-turn sequence of tool calls that an ideal agent would execute. The team notes that constructing these tool trajectories was "the bulk of the engineering effort," highlighting that synthetic data generation for agentic systems requires significant domain expertise beyond simple prompt engineering.

They evaluated on a benchmark of 300 hand-crafted examples covering expected Flow usage patterns, measuring semantic correctness (does it do the right thing, evaluated by an LLM judge), syntactic correctness (is it malformed, checked programmatically), and latency. While this synthetic approach got them to initial deployment, it's worth noting the team's critical assessment: working backwards from existing output artifacts was "the right first step before your metrics have caught up," but as deployment revealed, it wasn't sufficient for production-quality performance.

## Representation Design: The Python DSL Innovation

One of the most technically interesting aspects of this case study is the decision to transform the task representation. Shopify Flow workflows are internally represented in a JSON-based domain-specific language designed for backend parsing and execution. However, this format embeds conditional, program-like logic in deeply nested JSON structures—a pattern rare in LLM pretraining data and thus out-of-distribution for the model.

The team built a bidirectional transpiler to convert Flow's JSON DSL into semantically equivalent Python code. The same workflow logic is expressed using Python decorators, if/else statements, variables, loops, and function calls—representations abundant in pretraining data. This shifts the learning problem from "learn a new language and the task" to just "learn the task," since the model already understands Python patterns.

The impact was substantial: switching from JSON to Python DSL improved syntactic correctness by 22 percentage points and semantic correctness by 13 points, holding training data constant. This demonstrates how representation choices can have first-order effects on model performance, sometimes rivaling the impact of substantially more training data.

To ensure reliability, they implemented comprehensive round-trip testing: every workflow merchants created through Sidekick in production was converted from JSON to Python and back to JSON, with verification that the output matched the original exactly. Any mismatch was caught before reaching training data. At inference, the model generates Python which the transpiler converts to JSON for the Flow backend, making Python an internal representation transparent to both merchants and backend systems.

The team references prior work (SPEAC, LLMLift, WorkflowLLM) that explored Python as an intermediate representation but notes their distinction: fine-tuning on Python combined with a production-grade round-trip transpiler, without modifying any downstream systems.

## Production Environment Mirroring and Format Sensitivity

A surprising finding was the extreme sensitivity of model performance to seemingly minor formatting differences between training and inference environments. The team discovered that "every difference we closed, no matter how minor, improved eval scores," revealing that LLMs treat formatting details as signals even when they carry no semantic content.

Specific issues included tool naming mismatches (training used `flow_app_agent_task_search` while inference used `task_search`), tool ordering in system prompts (different orderings between training and serving degraded performance), tool response format variations (alphabetically sorted keys in training vs. different orderings or extra fields in production), and system prompt drift as product teams iterated on tool descriptions without corresponding updates to training data.

This highlights a critical but under-discussed LLMOps challenge: maintaining exact parity between training and production environments requires ongoing discipline across multiple teams and systems. It's not a one-time setup but continuous synchronization, particularly challenging when product requirements evolve rapidly.

## Tool Interface Optimization for Context Management

The team optimized their tool-calling architecture to minimize context length, both for performance reasons and to improve reasoning quality. Instead of returning full details for every search result upfront, tools return lightweight summaries first. The agent scans summaries, selects relevant items, then retrieves full details only for those specific items through a second call.

For example, Flow has hundreds of available triggers, conditions, and actions. A search might return 100 matches. Rather than loading complete configuration schemas for all results, `task_search` returns only names and descriptions, the model selects the 2-3 it needs, then `task_configuration` retrieves full schemas only for those selections. This trades one expensive context-heavy call for two cheaper calls with focused context, keeping reasoning manageable and reducing both latency and cost.

## Training Infrastructure and Speed

The model trains on two nodes of H200 GPUs using Fully Sharded Data Parallel (FSDP), completing a full training run in 12 hours. This speed was explicitly designed to enable weekly retraining with room for multiple experimental runs between production deployments—a concrete example of how infrastructure choices directly enable or constrain iteration velocity.

The entire pipeline runs on Tangle, Shopify's open-source ML experimentation platform, which composes data collection, training, evaluation, and deployment into a single reproducible workflow with intelligent caching that only re-runs affected steps when changes occur. CometML tracks experiments, HuggingFace hosts datasets and checkpoints, and CentML serves the deployed model. The weekly retraining runs without manual intervention, demonstrating mature MLOps automation.

## Deployment Reality vs. Benchmark Performance

Initial deployment at 1% traffic revealed a critical lesson: benchmark parity doesn't guarantee production performance. Despite offline metrics showing the fine-tuned model was ready for production, the real-world workflow activation rate (whether merchants actually turn on generated workflows) came in 35% lower than the prompt-based frontier model it was replacing.

The team's analysis is insightful: "The benchmark covered what we expected merchants to ask. It didn't cover what they actually asked." Real traffic surfaced out-of-distribution requests the synthetic data hadn't covered: editing existing workflows, handling email configurations, working with third-party integrations, and questions about Flow that weren't workflow creation requests. The model performed well in-domain but couldn't handle the full breadth of production use cases.

This reinforces a fundamental LLMOps principle: synthetic benchmarks are useful for development but can't substitute for real user interactions. The team notes they treated the low-traffic early deployment as a diagnostic tool "to see exactly where to focus next," which proved essential for closing the gap.

## Building the Continuous Improvement Flywheel

To systematically close the production performance gap, the team built a multi-component evaluation and data curation system. They developed an LLM-based judge that scores conversations across the workflow lifecycle: whether the assistant correctly understood intent, chose Flow appropriately, selected correct components, and provided clear next steps. Critically, the judge evaluates each facet separately rather than treating quality as binary.

The judge was calibrated against hundreds of human annotations, tuned until scores aligned with human judgment, then validated against production activation rates. This calibration process is important—it grounds the automated evaluation in both expert assessment and real user behavior, though the team notes activation rate itself is noisy since it "reflects merchant behavior, not model quality."

A complementary tagging system classifies every workflow along multiple dimensions: which triggers, conditions, actions, and whether third-party integrations are involved. Comparing performance across tagged slices pinpoints exactly where the model struggles. When performance drops on a specific slice, the team knows what kind of data to add. This slice-based analysis revealed that email workflows accounted for 25% of failures, diverse condition patterns another 16%, and workflow editing (never covered in synthetic data) was a significant gap.

The continuous improvement loop runs weekly: ingest production conversations, score with the LLM judge, route high-scoring conversations (particularly where merchants activated the workflow) into training automatically, quarantine low-quality ones for review, identify gaps through slice analysis, retrain and deploy. This transforms every production interaction into a potential training signal while maintaining quality controls, freeing the team to focus on expanding coverage rather than manual curation.

The approach is explicitly compared to Karpathy's Autoresearch concept: an automated loop that evaluates, keeps what works, discards what doesn't, and iterates—applied here to production data curation rather than training code.

## Results and Cost Comparison

The fine-tuned model now serves the majority of production traffic, achieving 2.2x faster inference and 68% lower cost compared to the closed frontier model it replaced. The quality gap revealed at initial deployment was closed within two weeks through the flywheel system. The team emphasizes that "no single technique got us here"—each stage built on the last, from synthetic data to DSL design to production mirroring to infrastructure stability to the continuous flywheel.

An honest assessment: they acknowledge the model running now is "already worse than the one retraining behind it," highlighting the ongoing nature of the improvement process rather than treating deployment as a terminal state.

## Future Directions and On-Policy Learning

The team outlines several next steps that reveal production LLMOps frontiers:

**Simulation environments** for verifiable rewards: a sandbox where the model generates workflows and receives structured feedback on whether they would succeed, without impacting real merchants. The model would write test cases and run them against simulated Flow environments, creating settings for verifiable rewards that enable both distillation from stronger teacher models and on-policy optimization.

**Transitioning from off-policy to on-policy learning**: everything described so far is off-policy—learning from curated examples collected after the fact. With verifiable rewards from simulation, they plan to move toward policy optimization where the model learns from its own generated trajectories, potentially discovering better strategies rather than only replicating observed patterns.

**Automating judge calibration**: currently the LLM judge is manually calibrated against human annotations and activation rates, but merchant behavior shifts, new integrations launch, and workflow patterns emerge faster than manual recalibration can track. Automating judge calibration against live production signals is framed as the next evaluation challenge.

## When This Approach Generalizes

The team provides explicit conditions for when this approach applies: tasks requiring tool calling where the model must reason, act, and incorporate external results; output formats that are custom DSLs not in pretraining data but expressible in familiar languages; feasibility of building a round-trip transpiler between in-distribution representation and production format; and availability of production feedback loops, since "synthetic data gets you started, but real-world data is what gets you to production quality."

They note this pattern is already being applied to other skills within Sidekick, with the recipe being: isolate the skill, fine-tune the tool-calling model, build the continuous improvement loop.

## Critical Assessment

While the case study demonstrates impressive engineering and thoughtful LLMOps practices, several claims warrant balanced consideration:

The comparison to frontier models is primarily on cost and latency rather than quality parity. The 35% initial activation rate gap and two-week recovery period suggests the fine-tuned model may have launched with lower quality than claimed by offline metrics, though the flywheel did close this gap relatively quickly.

The emphasis on "proprietary data" and "owned ground" as moats should be tempered by recognition that frontier models continue improving rapidly. The value proposition depends on whether the improvement rate from the flywheel can outpace general frontier model progress—a challenging empirical question not fully addressed.

The Python DSL transpiler is presented as a major innovation, but the round-trip testing requirement and maintenance burden of keeping it synchronized with the evolving JSON DSL could be substantial ongoing costs not fully explored in the writeup.

The LLM judge calibration process is described but not deeply validated. How well does it actually predict activation rates? How stable is calibration over time as merchant behavior and product features evolve? These are critical questions for the flywheel's reliability.

Overall, this case study exemplifies mature production LLMOps: thoughtful representation design, rigorous environment mirroring, fast iteration infrastructure, honest assessment of benchmark vs. production gaps, and systematic continuous improvement. The transparency about failures and the emphasis on building feedback loops rather than one-time optimizations make it particularly valuable for practitioners building similar systems.
