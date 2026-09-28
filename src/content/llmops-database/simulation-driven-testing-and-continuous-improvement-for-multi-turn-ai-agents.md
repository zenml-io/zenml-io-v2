---
title: "Simulation-Driven Testing and Continuous Improvement for Multi-Turn AI Agents"
slug: "simulation-driven-testing-and-continuous-improvement-for-multi-turn-ai-agents"
draft: false
llmopsTags:
  - "customer-support"
  - "question-answering"
  - "chatbot"
  - "document-processing"
  - "multi-modality"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "unstructured-data"
  - "rag"
  - "prompt-engineering"
  - "fine-tuning"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "fallback-strategies"
  - "error-handling"
  - "evals"
  - "cicd"
  - "continuous-integration"
  - "continuous-deployment"
  - "databases"
  - "open-source"
  - "compliance"
  - "reliability"
  - "scalability"
industryTags: "tech"
company: "Arklex"
summary: "Arklex applies LLM-based user simulation to the testing and improvement of production-oriented AI agents, addressing the limits of manual testing and static single-turn benchmarks. Synthetic users are generated from personas, goals, agent capabilities, and contextual knowledge, then used to exercise conversational and workflow agents through multi-turn trajectories, tool calls, and optional interface actions. The resulting simulations are integrated into CI/CD, scored with task-specific rules and LLM-as-judge metrics, and compared with production logs to evolve a golden scenario set. The approach is presented as reducing manual testing and exposing edge cases earlier, with reported work involving Pearson, but the source provides no independently validated quantitative results and acknowledges that simulation quality depends on expert input, realistic data, and ongoing calibration."
link: "https://www.infoq.com/presentations/ai-agent-testing-evaluation/?utm_campaign=infoq_content&utm_source=infoq&utm_medium=feed&utm_term=AI%2C+ML+%26+Data+Engineering-presentations"
year: 2026
seo:
  title: "Arklex: Simulation-Driven Testing and Continuous Improvement for Multi-Turn AI Agents - ZenML LLMOps Database"
  description: "Arklex applies LLM-based user simulation to the testing and improvement of production-oriented AI agents, addressing the limits of manual testing and static single-turn benchmarks. Synthetic users are generated from personas, goals, agent capabilities, and contextual knowledge, then used to exercise conversational and workflow agents through multi-turn trajectories, tool calls, and optional interface actions. The resulting simulations are integrated into CI/CD, scored with task-specific rules and LLM-as-judge metrics, and compared with production logs to evolve a golden scenario set. The approach is presented as reducing manual testing and exposing edge cases earlier, with reported work involving Pearson, but the source provides no independently validated quantitative results and acknowledges that simulation quality depends on expert input, realistic data, and ongoing calibration."
  canonical: "https://www.zenml.io/llmops-database/simulation-driven-testing-and-continuous-improvement-for-multi-turn-ai-agents"
  ogTitle: "Arklex: Simulation-Driven Testing and Continuous Improvement for Multi-Turn AI Agents - ZenML LLMOps Database"
  ogDescription: "Arklex applies LLM-based user simulation to the testing and improvement of production-oriented AI agents, addressing the limits of manual testing and static single-turn benchmarks. Synthetic users are generated from personas, goals, agent capabilities, and contextual knowledge, then used to exercise conversational and workflow agents through multi-turn trajectories, tool calls, and optional interface actions. The resulting simulations are integrated into CI/CD, scored with task-specific rules and LLM-as-judge metrics, and compared with production logs to evolve a golden scenario set. The approach is presented as reducing manual testing and exposing edge cases earlier, with reported work involving Pearson, but the source provides no independently validated quantitative results and acknowledges that simulation quality depends on expert input, realistic data, and ongoing calibration."
notion:
  pageId: "3e9f8dff-2538-80df-b426-dd96528e85fe"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:19:00.000Z"
  lastEditedTime: "2026-09-28T08:19:00.000Z"
  publishedAt: "2026-09-28T08:24:11Z"
---

## Overview

Arklex is an AI startup spun out of research at Columbia University. Its use case is the operational testing and improvement of multi-turn AI agents before and after deployment. The central problem is that agents that look convincing in a demonstration can fail when they must maintain context across several turns, call tools, modify real records, follow business rules, or respond to users whose intentions and behavior were not anticipated by developers. Arklex's proposed solution is to use LLM-driven synthetic users as repeatable test participants. These simulated users interact with a product agent, generate realistic or deliberately varied trajectories, and provide test evidence that can be evaluated automatically in a CI/CD pipeline.

The approach is relevant to LLMOps because it treats agent quality as an ongoing production engineering concern rather than a one-time model benchmark. Scenarios are versioned and rerun when an agent changes; task completion can be checked against application state; qualitative behavior can be assessed with grounded evaluators; and production logs can be used to discover missing scenarios. The presentation describes work with organizations including Pearson and examples from e-commerce, education, finance, and mortgage underwriting. However, most examples are demonstrations or proposed workflows, and the source does not provide independently verified reductions in testing time, failure rates, deployment incidents, or operating cost.

## Problem and operational context

Traditional model validation generally assumes a static input, a reference answer, and a measurable score. That model is insufficient for an agent that receives a sequence of related messages, invokes tools whose results change over time, and is expected to complete an external action. A current account balance, inventory state, order status, or return eligibility may not have one permanent golden answer. Similarly, an agent claiming that it canceled an order is not necessarily correct unless the underlying system confirms that the cancellation occurred and followed the applicable policy.

Arklex identifies manual testing as a common substitute. Developers send an agent endpoint to colleagues, product managers, or friends, who conduct conversations and report errors. The team then clusters and annotates those errors, changes the agent, and repeats the exercise. This process is expensive and difficult to reproduce. Internal testers may not represent actual customers, and technically oriented testers may explore unusual technical prompts while missing ordinary user misunderstandings. Once the agent changes, earlier conversations may no longer be a reliable regression set.

The compliance implications are especially important in finance and healthcare. A voice or chat agent that recommends a credit card, sends an application link, or activates a product may need authorization, auditability, policy enforcement, and controlled changes to customer data. The source explicitly presents the financial voice interaction as a demo rather than a production system and explains that compliance is a major reason sophisticated agents remain difficult to deploy in high-risk domains. E-commerce is described as a comparatively lower-risk environment, not as a risk-free one.

## Synthetic-user architecture

Arklex's simulation model has two interacting components: a synthetic user agent and the product agent under test. A scenario is assembled from three main inputs:

- A user profile, such as demographics, education status, budget sensitivity, language, emotional state, or access to particular account history.
- A user goal or intent, derived partly from the capabilities and tools exposed by the product agent.
- Context information, including relevant documents, business knowledge, user history, policies, or other data needed to make the interaction meaningful.

Different values for these dimensions can be permuted into a collection of scenarios. Each scenario becomes a repeatable simulated interaction that can be invoked through an API. The simulated user can follow a goal over multiple turns, react to the product agent's responses, call or exercise tools, and in some cases perform GUI actions such as selecting product cards. This enables testing beyond text quality: the system can examine whether a tool was called correctly, whether the user was asked to clarify an ambiguous request, and whether the intended state change actually occurred.

The source describes Arklex's open-source ArkSim project as an implementation intended to automate this process. Engineers configure agent capabilities, accessible knowledge, persona attributes, conversation counts, and turns per scenario. A build can start an agent in an isolated test environment, run simulated conversations, evaluate them, and apply a threshold to determine whether the build passes or fails. The resulting report is described as including scores for helpfulness, coherence, verbosity, relevance, and faithfulness, along with categorized problems such as failure to clarify, repetition, disobedience of a user request, false information, and insufficiently specific information.

## Evaluation and CI/CD integration

A key design choice is to combine deterministic checks with model-based evaluation. When the goal is objectively verifiable, such as canceling an order or completing a return, an evaluator can inspect the environment or application database rather than trusting the agent's natural-language assertion. This is stronger than judging the transcript alone because it tests whether the requested operation was actually completed and whether the action followed the relevant business process.

For softer properties, Arklex proposes LLM-as-judge evaluators grounded in the scenario, task context, examples, and domain requirements. Helpfulness, brand voice, recommendation quality, and response behavior may require qualitative judgments. The presentation emphasizes that a general-purpose judge should not be expected to understand an application's documents, policies, or customer expectations without additional context. Simulated conversations can supply candidate positive and negative examples, which domain experts can review and use to refine the evaluator. This creates a feedback loop between synthetic data generation, evaluator calibration, and agent development.

The CI/CD workflow is intended to run on agent changes. A new build starts the agent, executes a selected scenario set, generates trajectories, computes task and behavioral scores, and fails or passes according to configured thresholds. This makes agent behavior part of the deployment gate. It also creates a regression mechanism for prompts, routing logic, retrieval configuration, tool definitions, and workflow changes. The design does not eliminate human review: experts remain necessary to inspect failures, validate whether synthetic behavior is realistic, and decide whether an apparent failure reflects a product defect or an implausible test.

## Coverage, realism, and cost controls

Arklex proposes measuring the simulator itself rather than assuming that more generated conversations mean better testing. Coverage-oriented measures include tool-call distribution entropy, tool-call transition entropy, and trajectory distance. These are intended to encourage different tools, tool sequences, and interaction paths rather than thousands of nearly identical conversations. The downstream objective is failure identification: whether the simulator can expose meaningful defects in the product agent.

Coverage must be balanced with realism. A simulator that only behaves adversarially may find exploitable weaknesses but fail to represent ordinary customers. Arklex describes using profile and goal adherence, comparison with available real-user distributions, and expert review to make simulated behavior more credible. It also proposes selecting a smaller number of scenarios that provide broad coverage, because executing very large numbers of model-generated conversations on every CI run could become costly. The source does not provide a demonstrated cost curve or a validated minimum test-suite size, so these remain design objectives rather than established outcomes.

## Examples of defects and improvement loops

In an order-support example, a simulated user has multiple orders and asks for the status of one. The agent must clarify which order is intended, retrieve the appropriate status, and respond to follow-up questions about delivery timing. If shipping data cannot be retrieved, or if the agent cannot find the correct customer-service contact, the trajectory can expose a broken tool, incomplete retrieval data, or conflicting knowledge-base content. The simulation therefore functions not just as a score generator but as a way to localize likely causes for engineering investigation.

Another example concerns a user saying that an undelivered order should be returned. A rigid workflow might route the phrase directly to a return-order tool and report that nothing is eligible for return. A more robust flow recognizes that an undelivered item may need to be canceled instead. The source presents this as a corner case that simulated users can discover and that can lead to changes in intent handling, fallback logic, prompts, and tool routing. Synthetic trajectories may also be used to create training data or fine-tune smaller models, although the presentation does not report a production fine-tuning result.

After deployment, production logs are intended to extend the scenario set. The team can compare observed user and trajectory distributions with simulated ones, identify missing combinations of profiles, goals, and context, and add scenarios to the golden set. This is important because policies, products, promotions, tools, and user behavior change over time. In LLMOps terms, the proposed lifecycle is a closed loop: generate scenarios, test candidate changes, deploy under gates, observe production, mine new cases, and update the test and evaluation assets.

## Broader workflows and tradeoffs

The approach is not limited to conversational customer service. For mortgage underwriting, Arklex describes generating synthetic users and consistent document collections such as forms, pay stubs, and bank statements, including malformed or incomplete documents and visual variations such as skewing, blur, or missing pages. Such data could support testing multimodal document-processing workflows where real records are restricted by personally identifiable information. Synthetic records can improve coverage of underwriting-rule corner cases without exposing actual borrowers, but they must still be validated against real operational distributions and legal or compliance requirements. Synthetic consistency can also conceal failure modes if the generator does not reproduce the messiness and correlations present in production.

The source describes Pearson as having used simulations over a period of two years to test services across more than 200 countries, languages, and differing testing or purchasing policies. It presents this as evidence of enterprise use and an automated optimization loop, but gives no numerical before-and-after metrics or independent evaluation. Claims that the system significantly reduces manual testing time and helps identify issues before product managers should therefore be treated as vendor-reported positioning rather than established causal results.

The main benefits are repeatability, scalable scenario generation, earlier feedback in the delivery pipeline, state-aware task verification, and a mechanism for turning production observations into regression tests. The main risks are simulator bias, correlated errors between the user model and the system under test, evaluator hallucinations, excessive model-call cost, privacy leakage in scenario construction, and false confidence from high scores on an incomplete scenario set. Cold-start environments are especially difficult: without production data, Arklex relies on domain experts and interviews to define initial personas and goals. Warm-start environments can align simulations to observed distributions, but those distributions may underrepresent rare, harmful, or newly emerging cases.

Consequently, synthetic-user testing should complement—not replace—unit tests for tools, deterministic workflow checks, security and authorization tests, red-team exercises, human review, monitoring, and carefully governed production experiments. Its strongest LLMOps contribution is making multi-turn behavioral and state-transition testing repeatable enough to participate in an engineering lifecycle, while retaining explicit uncertainty about how well the simulated users and judges represent real customers.
