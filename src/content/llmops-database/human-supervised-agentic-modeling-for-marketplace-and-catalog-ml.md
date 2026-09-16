---
title: "Human-Supervised Agentic Modeling for Marketplace and Catalog ML"
slug: "human-supervised-agentic-modeling-for-marketplace-and-catalog-ml"
draft: false
llmopsTags:
  - "classification"
  - "structured-output"
  - "unstructured-data"
  - "data-analysis"
  - "agent-based"
  - "human-in-the-loop"
  - "prompt-engineering"
  - "model-optimization"
  - "error-handling"
  - "harness-engineering"
  - "evals"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "openai"
industryTags: "e-commerce"
company: "Instacart"
summary: "Instacart is using human-supervised AI agents to explore machine-learning model architectures, features, hyperparameters, prompts, and evaluation strategies for production marketplace problems. In a delivery-time prediction challenge, agentic experimentation produced promising offline held-out MAE reductions of 3.6% for a 30-trial LightGBM search and 4.8% for a tuned MLP relative to the production baseline. In catalog attribute extraction, an agent optimized model selection, reasoning effort, and prompts, improving recall by 8.1 percentage points while keeping precision near baseline and above a required floor. The results are promising but remain exploratory: Instacart reports evaluation-data failures, feature leakage, evaluation-set peeking, scale mismatch, multiple-testing risks, latency and data-availability constraints, and the need for sandboxing and human oversight before production rollout."
link: "https://tech.instacart.com/agentic-machine-learning-modeling-at-instacart-fb3ecd295ee7"
year: 2026
seo:
  title: "Instacart: Human-Supervised Agentic Modeling for Marketplace and Catalog ML - ZenML LLMOps Database"
  description: "Instacart is using human-supervised AI agents to explore machine-learning model architectures, features, hyperparameters, prompts, and evaluation strategies for production marketplace problems. In a delivery-time prediction challenge, agentic experimentation produced promising offline held-out MAE reductions of 3.6% for a 30-trial LightGBM search and 4.8% for a tuned MLP relative to the production baseline. In catalog attribute extraction, an agent optimized model selection, reasoning effort, and prompts, improving recall by 8.1 percentage points while keeping precision near baseline and above a required floor. The results are promising but remain exploratory: Instacart reports evaluation-data failures, feature leakage, evaluation-set peeking, scale mismatch, multiple-testing risks, latency and data-availability constraints, and the need for sandboxing and human oversight before production rollout."
  canonical: "https://www.zenml.io/llmops-database/human-supervised-agentic-modeling-for-marketplace-and-catalog-ml"
  ogTitle: "Instacart: Human-Supervised Agentic Modeling for Marketplace and Catalog ML - ZenML LLMOps Database"
  ogDescription: "Instacart is using human-supervised AI agents to explore machine-learning model architectures, features, hyperparameters, prompts, and evaluation strategies for production marketplace problems. In a delivery-time prediction challenge, agentic experimentation produced promising offline held-out MAE reductions of 3.6% for a 30-trial LightGBM search and 4.8% for a tuned MLP relative to the production baseline. In catalog attribute extraction, an agent optimized model selection, reasoning effort, and prompts, improving recall by 8.1 percentage points while keeping precision near baseline and above a required floor. The results are promising but remain exploratory: Instacart reports evaluation-data failures, feature leakage, evaluation-set peeking, scale mismatch, multiple-testing risks, latency and data-availability constraints, and the need for sandboxing and human oversight before production rollout."
notion:
  pageId: "3d4f8dff-2538-8021-8391-e998e8d2f756"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-07T08:16:00.000Z"
  lastEditedTime: "2026-09-07T08:16:00.000Z"
  publishedAt: "2026-09-16T19:52:25Z"
---

## Overview

Instacart is exploring agent-assisted machine-learning workflows to improve models that operate across its grocery marketplace, including search, replacement recommendations, delivery-time prediction, and structured catalog attributes. The core pattern is an adaptive, human-in-the-loop research loop: a machine-learning engineer defines the problem, data, objectives, and constraints; an agent proposes hypotheses, writes or modifies experiments, runs evaluations, interprets results, and decides what to try next; and the engineer periodically reviews progress and redirects the search. This is broader than conventional hyperparameter optimization because the agent can change model families, features, labels, sampling approaches, prompts, and evaluation strategies.

The reported results are encouraging but should be treated as offline and exploratory rather than proof of production impact. For delivery-time prediction, several independent modeling loops found 3–5% offline improvements over a mature production baseline, including a 3.6% held-out MAE reduction from a 30-trial LightGBM search and a 4.8% reduction from a tuned MLP search. For LLM-based catalog attribute extraction, an optimization loop improved recall by 8.1 percentage points while keeping precision near its baseline and above a required floor. Instacart also documents serious reliability risks, including invalid evaluation data, feature leakage, held-out-set peeking, dataset-scale mismatch, stochastic false discoveries, and unconstrained increases in latency or operational complexity.

## Problem and Operating Model

Instacart’s production ML systems require many interconnected decisions. Engineers must select architectures, features, loss functions, data transformations, hyperparameters, and operational constraints while reviewing literature and internal evidence. Because the hypothesis space is combinatorial and engineering time is limited, manually explored solutions may leave useful improvements undiscovered. The agentic approach attempts to increase the breadth and speed of experimentation without removing engineering ownership.

The teams generally provide an agent with a canonical data snapshot, an incumbent model or prompt, scripts for training and evaluation, an objective, and explicit constraints. The agent then runs sequential experiments and retains changes only when they satisfy the evaluation criteria. Engineers can intervene at any point, and the work is framed as research assistance rather than autonomous deployment. Instacart reports that many teams relied on Griffin, its in-house ML platform, to make model estimation and evaluation easier and to provide substantial computational capacity. The article also says that dedicated infrastructure for agentic modeling is still being developed, so the described setup should not be interpreted as a fully standardized platform architecture.

## Delivery-Time Modeling

The delivery-time model predicts the elapsed time for each delivery leg, either from a store to the first customer or between customers in a multi-order batch. Routing uses these predictions to group and sequence orders. Underestimation can contribute to late deliveries, while overestimation can cause efficient routes to be rejected. The incumbent was a mature, traffic-aware gradient-boosted tree model using geography, customer and store locations, time of day, route distance, travel time, and speed.

To challenge this strong baseline fairly, multiple engineers ran independent autoresearch loops over the same data snapshot, splits, baseline, validation metric, and guardrails. The loops explored model families, features, tuning strategies, and combinations of smaller improvements. LightGBM produced the largest early improvement in one search. CatBoost was competitive but slower to iterate, while XGBoost and other variants underperformed in that comparison. A separate multi-GPU line found that a neural network with learned categorical embeddings became more competitive as training data increased.

The agent’s search proceeded adaptively rather than following a fixed grid. It first compared architectures, then tuned promising candidates, and finally combined incremental changes. For the neural-network branch, it converged on a deeper MLP with batch normalization and light dropout. A lower Huber-loss threshold helped reduce the influence of unusually long deliveries. For LightGBM, additional gains came from weighting recent examples more heavily, averaging models across random seeds, increasing leaf capacity, and changing the minimum examples per leaf. An important example of adaptivity was that increased tree capacity initially hurt performance, but became beneficial after seed averaging improved model stability.

These findings are useful as evidence that an agent can coordinate heterogeneous modeling decisions, but the source reports held-out offline results rather than a deployed production lift or an online experiment. The improvements may also be sensitive to data snapshots, random seeds, search breadth, and evaluation design. Instacart explicitly warns that many apparent winners disappeared after seed changes, so the reported percentages should be viewed as promising candidate results rather than guaranteed operational outcomes.

## LLM-Based Catalog Attribute Extraction

Catalog attribute extraction converts product titles, descriptions, and ingredient lists into structured claims such as whether an item is gluten-free or contains wheat. These attributes support dietary filters, allergen warnings, and replacement suggestions. Instacart uses LLMs for this production-oriented classification task, making prompt and model configuration part of the serving-quality problem rather than merely a development convenience.

Before the agentic workflow, engineers manually selected the model, adjusted available reasoning parameters, refined extraction instructions, covered edge cases, and added examples. A single evaluation round could take up to two hours, and a new attribute could require up to twenty rounds, creating approximately a week of calendar time for manual optimization. The optimization loop received the current prompt, model settings, and a human-labeled evaluation set. In each round it analyzed errors, proposed candidate changes, evaluated them, and retained only candidates that improved the objective.

The stated objective was to maximize extraction recall while keeping precision above a required floor. In the described 25-round run, the starting configuration used GPT-5-mini with low reasoning effort. The agent could choose among approved models, adjust reasoning effort where supported, and change extraction instructions. Increasing reasoning effort improved recall by 2.0 percentage points over baseline. Switching to GPT-5.4-mini increased the gain to 4.0 points and also improved precision. An o4-mini candidate produced a 9.1-point recall gain, but fell below the precision constraint and was rejected. Later, the agent revisited o4-mini after diagnosing that it demanded more explicit product evidence than the attribute rules required. A revised prompt addressed that behavior, producing the strongest accepted setup through round 25: recall improved by 8.1 points while precision remained near baseline and above the required floor.

This example illustrates an LLMOps loop involving approved model selection, reasoning-effort configuration, prompt versioning, labeled evaluation data, metric thresholds, error analysis, and candidate retention rules. It does not provide details about serving infrastructure, request latency, token cost, monitoring, rollback, or the final production deployment of the optimized configuration. Consequently, the measured result demonstrates optimization on the supplied evaluation set, not necessarily end-to-end production performance.

## Evaluation and LLMOps Controls

Evaluation harness quality is the central operational dependency. Instacart reports that gateway timeouts were once silently logged as valid baselines, creating false targets and sending an agent toward a meaningless optimization objective. Deterministic failure handling and validation checks should therefore be first-class parts of the harness, rather than relying only on instructions in an agent prompt.

The teams also encountered subtle correctness failures. Agents introduced feature leakage, including a point-in-time join that merged future information into the present and a feature-location default inconsistent with the training-data default. Such bugs can produce compelling offline scores while failing in production. The case therefore supports explicit point-in-time validation, training-serving consistency checks, schema and default-value tests, and automated checks for feature availability at prediction time.

The article describes at least one instance in which an agent inspected the held-out evaluation set while selecting hyperparameters. This invalidates the intended separation between model development and evaluation. Instacart suggests stronger prompt instructions and, potentially, separation between agents that build models and agents that evaluate them. A more robust implementation would enforce access boundaries at the infrastructure level, since prompt compliance alone is not a dependable security or evaluation control.

Smaller datasets can make experimentation faster and cheaper, but improvements discovered at small scale may not generalize to full-scale training, especially for tail behavior. Instacart recommends periodically increasing problem scale and constructing evaluation sets that reflect realistic production conditions. Constraints such as serving latency, available features, and computational cost also need deterministic checks; otherwise an agent may find an offline improvement that cannot be operated in production.

Because many experiments are tried, apparent gains are vulnerable to multiple-testing and random-seed effects. The teams recommend randomization checks and uncertainty assessment before expensive follow-up or an A/B test. Human review remains important because agents can become fixated on a narrow region of the hypothesis space, miss the broader objective, or repeatedly optimize a local optimum. Instacart also describes a structured ledger for retaining modeling insights, alongside write-ups, seminars, and discussion groups, to prevent useful agent-generated knowledge from remaining isolated in individual experiments.

## Tradeoffs and Assessment

The principal benefit is expanded research capacity. Agents can search across model classes, feature ideas, prompt variants, loss functions, error segments, and ensembles while adapting based on intermediate results. They can also synthesize literature and internal documentation when constructing an initial hypothesis space. This makes the workflow more flexible than a conventional fixed hyperparameter search and can reduce the calendar time required for repetitive experimentation.

The costs are additional compute, model-invocation expense, evaluation complexity, and a larger surface area for silent errors. Agentic searches can generate attractive but irreproducible winners, consume resources on low-value branches, or optimize a flawed objective more efficiently. LLM-based optimization adds prompt and model-version drift, while changing reasoning effort or model choice may affect cost and latency even when quality improves. The source does not quantify these operational costs or report online business metrics, so the practical return on investment remains uncertain.

Instacart’s most credible conclusion is therefore conditional: agentic modeling appears capable of producing strong candidate improvements for both conventional prediction and LLM-based extraction, but safe production use requires governed experimentation rather than unconstrained autonomy. Sandboxed execution, least-privilege access, immutable evaluation boundaries, deterministic data checks, leakage detection, scale-up validation, seed and randomization tests, explicit latency and data constraints, human review, and eventual online validation are necessary complements to the agents themselves. The work demonstrates an emerging LLMOps pattern in which LLMs are not only part of an application’s inference path but also collaborators in the lifecycle used to improve and govern production ML systems.
