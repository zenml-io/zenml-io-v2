---
title: "One-Click Simulation and Evaluation Platform for Support Chatbots"
slug: "one-click-simulation-and-evaluation-platform-for-support-chatbots"
draft: false
llmopsTags:
  - "customer-support"
  - "chatbot"
  - "prompt-engineering"
  - "evals"
  - "few-shot"
  - "system-prompts"
  - "fastapi"
  - "monitoring"
  - "microservices"
industryTags: "e-commerce"
company: "Doordash"
summary: "DoorDash built a comprehensive simulation and evaluation platform to address bottlenecks in their LLM-powered support chatbot development cycle. Previously, validation required deploying changes to 1% of live traffic and manually reviewing transcripts—a process that took hours to weeks and struggled to catch long-tail edge cases. The solution implements an end-to-end white-box testing system that generates realistic multi-turn customer conversations grounded in production data, routes all tool calls through configurable mocks, and evaluates results against feature-specific rubrics using LLM-as-a-judge. The platform reduced validation time from seven hours to five minutes while maintaining production-like behavior (46% vs 44% escalation rates), reduced hallucinations in simulations by 90%, and enabled teams to iterate with confidence before exposing changes to customers."
link: "https://careersatdoordash.com/blog/doordashs-one-click-simulation-and-evaluation-platform-for-support-chatbots/"
year: 2026
seo:
  title: "Doordash: One-Click Simulation and Evaluation Platform for Support Chatbots - ZenML LLMOps Database"
  description: "DoorDash built a comprehensive simulation and evaluation platform to address bottlenecks in their LLM-powered support chatbot development cycle. Previously, validation required deploying changes to 1% of live traffic and manually reviewing transcripts—a process that took hours to weeks and struggled to catch long-tail edge cases. The solution implements an end-to-end white-box testing system that generates realistic multi-turn customer conversations grounded in production data, routes all tool calls through configurable mocks, and evaluates results against feature-specific rubrics using LLM-as-a-judge. The platform reduced validation time from seven hours to five minutes while maintaining production-like behavior (46% vs 44% escalation rates), reduced hallucinations in simulations by 90%, and enabled teams to iterate with confidence before exposing changes to customers."
  canonical: "https://www.zenml.io/llmops-database/one-click-simulation-and-evaluation-platform-for-support-chatbots"
  ogTitle: "Doordash: One-Click Simulation and Evaluation Platform for Support Chatbots - ZenML LLMOps Database"
  ogDescription: "DoorDash built a comprehensive simulation and evaluation platform to address bottlenecks in their LLM-powered support chatbot development cycle. Previously, validation required deploying changes to 1% of live traffic and manually reviewing transcripts—a process that took hours to weeks and struggled to catch long-tail edge cases. The solution implements an end-to-end white-box testing system that generates realistic multi-turn customer conversations grounded in production data, routes all tool calls through configurable mocks, and evaluates results against feature-specific rubrics using LLM-as-a-judge. The platform reduced validation time from seven hours to five minutes while maintaining production-like behavior (46% vs 44% escalation rates), reduced hallucinations in simulations by 90%, and enabled teams to iterate with confidence before exposing changes to customers."
notion:
  pageId: "375f8dff-2538-8004-a9bd-c15ec9d1f78f"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-04T07:57:00.000Z"
  lastEditedTime: "2026-06-04T07:57:00.000Z"
  publishedAt: "2026-06-04T08:03:33Z"
---

## Overview and Business Context

DoorDash's case study describes a sophisticated LLMOps platform built to address fundamental challenges in developing and validating LLM-powered support chatbots at scale. The company operates a food delivery marketplace where customer support is critical to user experience, making chatbot quality and reliability essential business metrics. Prior to building this platform, DoorDash relied on testing in production by rolling out changes to 1% of live users and manually reviewing conversation transcripts—an approach that worked when launches were infrequent but became untenable as they scaled their LLM-powered support infrastructure.

The core problem statement reveals several production LLMOps challenges: slow and manual pre-launch validation, iteration cycles bottlenecked by transcript review, difficulty testing long-tail scenarios systematically (policy edge cases, data-dependent failures, rare escalation paths), and the risk of silent regressions from prompt edits, knowledge base changes, or infrastructure updates. The platform they built represents a comprehensive approach to shifting left in the development cycle—catching issues before production exposure while maintaining production-realistic testing conditions.

## System Architecture and Design Principles

The platform architecture operates as a closed-loop system with several interconnected components. At a high level, the flow begins with a testing infrastructure trigger that initiates batch simulations, loads test scenarios from storage, conducts multi-turn conversations with the target chatbot while routing dependent tool calls through a mock layer, sends completed transcripts to an evaluation framework for scoring, and persists results in a dashboard for analysis and regression tracking.

Two architectural principles underpin the design. First, the platform implements white-box end-to-end testing rather than simple message-level simulation. The team recognized that LLM chatbot behavior is driven not just by user input but by how the system retrieves and reasons over context, interacts with tools, and reacts to system signals. They simulate the entire conversation loop including tool interactions and context retrieval while keeping every step observable and controllable. Second, the platform maintains production grounding throughout—scenarios and mock data derive from real production transcripts and APIs so simulations reflect realistic user and system behavior rather than synthetic placeholders.

## Test Scenario Generation Pipeline

The foundation of the platform is an offline generation pipeline that converts production support transcripts into structured, replayable test scenarios. This provides scalable translation of real customer interactions into reusable end-to-end test coverage. The pipeline starts with production support transcripts grouped by issue type. For each transcript, the system retrieves and analyzes contextual signals including customer order details, delivery address and drop-off options, drop-off instructions, customer-Dasher conversations, and account/order metadata.

An LLM then extracts higher-level abstractions from each transcript: the customer story (what happened from the customer's perspective), customer characteristics and behavior patterns, canonical issue types, and escalation signals and resolution paths. Each transcript produces a single structured test scenario, maintaining one-to-one traceability so every simulation can be tied back to a real production case. These generated scenarios persist in storage and serve as connective tissue between the platform's runtime components—the LLM simulator consumes customer story and behavioral signals to drive realistic conversations, while the mock server consumes delivery context to construct consistent, scenario-appropriate mock data.

This automated pipeline transforms historical support volume into reusable, scenario-diverse test coverage. Rather than manually curating edge cases, teams can replay real production interactions on demand and evaluate how the current chatbot would handle them. This represents a particularly powerful LLMOps pattern: leveraging production data to systematically generate comprehensive test coverage that evolves with actual user behavior.

## LLM Simulator Design

The LLM Simulator acts as a realistic DoorDash customer interacting with the support chatbot. Rather than following fixed scripts, it uses an LLM with structured decision-making prompts to drive dynamic, scenario-based behavior across multi-turn conversations. This design choice reflects a key insight: realistic chatbot testing requires adaptive user simulation that can respond contextually to chatbot behavior rather than mechanically following predetermined paths.

Given a test scenario, the simulator initiates and sustains a conversation reflecting the customer's issue, tone, and behavioral patterns. At each turn, it evaluates the chatbot's latest response against the scenario, determining whether the issue is being addressed, whether meaningful progress is occurring, and whether the customer should clarify, provide more information, push back, continue, or escalate. This enables common-sense behaviors that make interactions feel realistic while maintaining consistency with the customer persona. The simulator also supports multimodal interactions such as image uploads when requested by the chatbot.

The simulator runs as an independent service through DoorDash's internal load testing infrastructure, enabling high-volume conversation generation at high query rates. It can connect bidirectionally to either prototype chatbots for rapid prompt iteration or production chatbots in sandbox environments. Critically, this is not a stateless prompt replay system—the simulator maintains conversation state, contextual grounding, and behavioral consistency across turns, producing coherent multi-turn exchanges suitable for true end-to-end regression testing. For targeted validation, it also supports a scripted mode for deterministic testing of specific flows, providing flexibility between exploratory and regression testing modalities.

## Mock Server and Production-Safe Testing

Realistic simulation requires controlling external tools and downstream services the chatbot depends on without touching production systems. DoorDash applies unit testing principles (arrange, act, assert) at the conversation level. Test scenarios define conditions (the "arrange" phase—fraud case, appeal pending, delayed delivery), the simulator conducts a conversation with the chatbot which calls various tools (the "act" phase), and evaluators verify correct handling across multiple turns (the "assert" phase).

The chatbot itself is mock-aware, differentiating between production and simulation traffic and routing simulation requests to the mock service for data retrieval, context generation, and downstream operations. This allows identical chatbot logic to run in both environments while keeping simulation isolated from live systems. At the start of each run, a routing header attaches to every simulated conversation so downstream systems recognize it as simulation traffic. Depending on the integration point, routing happens differently: for services accessed over gRPC, a common wrapper redirects simulation traffic to a centralized mock service; for tools based on Model Context Protocol (MCP), the tool layer detects simulation requests through request metadata such as HTTP headers and returns mocked responses directly.

The platform supports several mocking strategies. Tool-level mocking allows controlling individual tool responses for MCP-based chatbots based on scenario requirements, deterministically controlling inputs like delivery context lookups, refund eligibility, account retrieval, or order status. Production-backed mock data grounds context in production data—for example, fetching the delivery context from the original conversation then modifying selected fields (timestamps, flags, status) to match the test scenario, preserving realism while maintaining determinism and safety. For features relying on downstream services (like credit refund resolution), DoorDash built lightweight mock downstream services to simulate resolution outcomes without touching production systems. The chatbot calls these mock services during simulation runs, which apply configurable rules to return deterministic, scenario-driven outcomes for cases like fraud, high-value orders, and other policy-driven edge conditions.

This mock service design is extensible—as new domains or business workflows are added, new handlers and rules can be registered for the simulator and mock layer to use during runs. This encapsulation enables exercising end-to-end flows that depend on case resolution (escalation, refunds, routing to specialized human agents) while keeping tests isolated and repeatable.

## Evaluation Service and LLM-as-a-Judge

DoorDash recognizes that simulation without evaluation is merely replay. The evaluation service transforms simulated conversations into measurable signals teams can use to assess chatbot quality before launch. After each simulation run completes, evaluation triggers asynchronously from the testing platform. Each conversation is scored against feature-specific rubrics defined by the chatbot production team, with every rubric producing a binary pass/fail result that makes outcomes easy to aggregate, compare, and track over time.

The platform employs an LLM-as-a-judge approach, but critically, not a single generic standard. Each chatbot feature defines its own evaluation criteria based on the behaviors that matter most for that workflow: escalation correctness, policy adherence, resolution quality, tone compliance. This keeps evaluation grounded in how the chatbot is expected to behave in real customer interactions. The provided example shows evaluation dimensions including escalation decision, issue identification correctness, appropriate empathy, policy compliant action, verbosity, repetitiveness, hallucination presence, and whether responses sound robotic.

All evaluation results persist for analysis. Teams can query them via SQL, monitor trends through dashboards, and compare results across runs to detect regressions. This transforms simulation from a one-off validation step into a repeatable, trackable signal in the development workflow. Most importantly, evaluation closes the simulation feedback loop—when issues are detected, teams can adjust prompts, scenarios, or system behavior and immediately re-run simulations, turning what was previously a slow, manual validation process into a faster and more continuous iteration cycle.

## Supported Testing Capabilities and Workflow Integration

The platform integrates directly into the chatbot development workflow addressing specific gaps in the previous validation loop. Teams can perform draft prompt testing to validate prompt changes before promotion instead of relying on live traffic to uncover issues. Sandbox targeting enables running end-to-end simulations against sandbox chatbot services before launch. Regression tracking compares prototype and production chatbot behavior side by side to catch regressions introduced by prompt, knowledge base, or model changes. The platform stores persistent artifacts (simulated conversations and evaluation results) for historical comparison, debugging, and root-cause analysis. It also supports deterministic testing by running a fixed suite of scenarios with expected outcomes to guarantee coverage of critical flows and produce clear pass/fail metrics for regression testing.

These capabilities shift validation earlier in the development cycle. What previously depended on exposing 1% of live traffic and manually reviewing transcripts can now be done through one-click, end-to-end testing workflows with broader scenario coverage, faster feedback, and measurable confidence before launch.

## Validation Results and Production Alignment

The platform's effectiveness is demonstrated through concrete validation metrics. When testing the chatbot's order status inquiry feature, simulation generated 302 conversations in five minutes with a 46% escalation rate, while production 1% traffic generated 175 conversations in seven hours with a 44% escalation rate. This close alignment (46% vs 44% escalation rates) gave the team confidence that the simulator generated not just plausible conversations but representative ones that matched production-like behavior in a fraction of the time.

More broadly, the platform helped reduce hallucinations in simulations by 90% for chatbot development, reinforcing simulation as a quantitative pre-production gate rather than just a qualitative sandbox. The practical impact includes validating business-critical outcomes earlier (escalation rate, resolution quality), reducing launch risk before customer exposure, and running more experiments with far less manual overhead. While the 90% hallucination reduction claim is impressive, it's worth noting the text doesn't provide detailed methodology for measuring hallucinations or baseline metrics, so this should be interpreted as a directional improvement indicator rather than a precisely validated metric.

## Example Simulation Outputs

The case study provides detailed examples of both production transcript replay and scripted simulation. In the production replay example, a test scenario derived from a real transcript includes customer characteristics ("polite, detail-oriented, frustrated"), a detailed customer story about missing items, issue types (missing_items, item_unavailable, store_unresponsive), and context for the LLM simulator. The resulting multi-turn conversation shows the simulator engaging naturally with the chatbot, asking clarifying questions about refund timelines and credit usage, and ultimately accepting a refund resolution. The evaluation shows mixed results with passes on escalation decision, issue identification, empathy, and hallucination avoidance, but failures on policy compliance, verbosity, repetitiveness, and robotic tone.

The scripted simulation example demonstrates a more controlled approach where a tester reference defines the conversation trajectory: customer wants to speak to a real person, agent deflects, customer reports order never came, agent proceeds with never-delivered flow, customer cooperates through resolution. This allows validating specific end-to-end flows deterministically, complementing the more exploratory production replay approach.

## Critical Assessment and LLMOps Patterns

This case study represents a mature LLMOps implementation addressing several critical production challenges. The strength lies in the comprehensive approach—not just building simulation or evaluation in isolation, but creating an integrated platform that generates realistic scenarios from production data, simulates with behavioral fidelity, controls dependencies through sophisticated mocking, and evaluates with feature-specific criteria.

The production grounding throughout the pipeline is particularly noteworthy. Rather than relying on synthetic test cases that may miss real-world complexity, the team systematically mines production transcripts to generate scenario coverage. This creates a self-updating test suite that evolves with actual user behavior patterns. The white-box testing approach with full observability into tool calls, context retrieval, and system signals provides debugging capabilities that black-box testing cannot offer.

The mock architecture demonstrates sophisticated thinking about testing distributed LLM systems. Supporting multiple mocking strategies (tool-level, production-backed, mock downstream services) provides flexibility for different testing needs while maintaining isolation. The mock-aware routing using headers and protocol-specific interception shows production-grade infrastructure thinking.

However, the case study also reveals areas where claims should be interpreted carefully. The 90% hallucination reduction is presented without detailed methodology or baseline definition. The evaluation using LLM-as-a-judge is powerful but introduces its own reliability questions—LLMs evaluating LLMs can perpetuate biases or miss subtle issues that human reviewers would catch. The binary pass/fail rubrics provide clear metrics but may oversimplify nuanced quality dimensions.

The platform's reliance on LLM simulation also means it inherits LLM limitations. The simulator may not fully capture the diversity of real user behavior, particularly for adversarial users, edge case communication styles, or cultural/linguistic variations. The quality of simulations depends heavily on prompt engineering for the simulator itself, which may require ongoing tuning as user behavior evolves.

The case study mentions the platform "became an inflection point" enabling teams to "ship with more confidence," but doesn't provide quantitative business metrics like reduction in production incidents, improvement in first-contact resolution rates, or reduction in escalation to human agents over time. These would provide stronger validation of the platform's real-world impact.

## Broader LLMOps Implications

This implementation demonstrates several important LLMOps patterns applicable beyond DoorDash's specific use case. The simulation-evaluation flywheel creates a continuous improvement cycle where teams iterate rapidly with quantitative feedback before production exposure. This addresses a fundamental challenge in LLM development: the difficulty of predicting behavior changes from prompt modifications, context adjustments, or model updates.

The production data mining approach for test generation represents a scalable alternative to manual test case authoring. As LLM applications handle increasing volume and diversity of interactions, manually maintaining comprehensive test coverage becomes infeasible. Automated extraction of test scenarios from production maintains coverage that evolves with actual usage patterns.

The integration of simulation into existing testing infrastructure (using their internal load testing framework) rather than building completely separate tooling demonstrates pragmatic engineering. Reusing existing infrastructure reduces maintenance burden and leverages familiar workflows.

The mock-aware architecture pattern—where production code contains conditional routing logic based on execution context—is a practical approach to making complex distributed systems testable. While it introduces some complexity into production code, it enables realistic end-to-end testing without duplicate implementations or complex test harnesses.

Overall, this case study represents a sophisticated, production-grade LLMOps platform addressing real challenges in developing conversational AI at scale. While some claims would benefit from more rigorous quantitative validation, the architectural approach, integration patterns, and systematic thinking about the simulation-evaluation loop provide valuable insights for teams building similar systems.
