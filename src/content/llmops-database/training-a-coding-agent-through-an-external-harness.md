---
title: "Training a Coding Agent Through an External Harness"
slug: "training-a-coding-agent-through-an-external-harness"
draft: false
llmopsTags:
  - "code-generation"
  - "reinforcement-learning"
  - "agent-based"
  - "evals"
  - "docker"
  - "monitoring"
  - "open-source"
  - "hugging-face"
industryTags: "tech"
company: "Hugging Face"
summary: "Hugging Face demonstrated an open training pipeline for improving a small language model on coding-agent tasks without modifying the coding-agent harness itself. The system combines TRL's asynchronous GRPO trainer, the OpenEnv framework, OpenCode as a containerized agent harness, a capture proxy that records model interactions and log probabilities, isolated Hugging Face Sandboxes for each rollout, and hidden-test-based rewards. In a 10-step demonstration using two H100 GPUs and eight rollouts per step, the reported reward increased and reached 1, showing that the integration can run end to end; however, the result is explicitly preliminary because task difficulty was not controlled and the evaluation did not establish generalization or parity with a frontier model."
link: "https://www.youtube.com/watch?v=tjcQCnSk620"
year: 2026
seo:
  title: "Hugging Face: Training a Coding Agent Through an External Harness - ZenML LLMOps Database"
  description: "Hugging Face demonstrated an open training pipeline for improving a small language model on coding-agent tasks without modifying the coding-agent harness itself. The system combines TRL's asynchronous GRPO trainer, the OpenEnv framework, OpenCode as a containerized agent harness, a capture proxy that records model interactions and log probabilities, isolated Hugging Face Sandboxes for each rollout, and hidden-test-based rewards. In a 10-step demonstration using two H100 GPUs and eight rollouts per step, the reported reward increased and reached 1, showing that the integration can run end to end; however, the result is explicitly preliminary because task difficulty was not controlled and the evaluation did not establish generalization or parity with a frontier model."
  canonical: "https://www.zenml.io/llmops-database/training-a-coding-agent-through-an-external-harness"
  ogTitle: "Hugging Face: Training a Coding Agent Through an External Harness - ZenML LLMOps Database"
  ogDescription: "Hugging Face demonstrated an open training pipeline for improving a small language model on coding-agent tasks without modifying the coding-agent harness itself. The system combines TRL's asynchronous GRPO trainer, the OpenEnv framework, OpenCode as a containerized agent harness, a capture proxy that records model interactions and log probabilities, isolated Hugging Face Sandboxes for each rollout, and hidden-test-based rewards. In a 10-step demonstration using two H100 GPUs and eight rollouts per step, the reported reward increased and reached 1, showing that the integration can run end to end; however, the result is explicitly preliminary because task difficulty was not controlled and the evaluation did not establish generalization or parity with a frontier model."
notion:
  pageId: "401f8dff-2538-8061-821f-faa9bfb012e4"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-10-22T13:29:00.000Z"
  lastEditedTime: "2026-10-22T13:29:00.000Z"
  publishedAt: "2026-10-27T13:50:25Z"
---

## Overview

Hugging Face built an experimental pipeline to train a coding model through an agent harness that the training team did not write or directly control. The central use case is reducing reliance on a frontier model for a narrowly defined coding task: a smaller open model should learn to operate a coding agent effectively, including deciding when and how to use its tools. Rather than flattening the agent into a conventional supervised-learning prompt, the project treats the complete harness as part of the reinforcement-learning environment.

The demonstration combines a 1.8-billion-parameter Qwen model, a coding-task dataset, OpenCode, TRL's asynchronous GRPO implementation, and OpenEnv components for defining and running reinforcement-learning environments. A capture proxy sits between the harness and the inference service, preserving the protocol expected by the agent while extracting the generated turns, identifiers, and log probabilities needed to update the policy. Each rollout runs in an isolated Hugging Face Sandbox, and the resulting code is evaluated with visible and hidden tests. The reported reward improved over a 10-step run and reached 1, but this should be regarded as a systems proof of concept rather than evidence that the model has robustly learned coding or matches a frontier model.

## Problem and Use Case

Modern coding agents are composites rather than single models. Their behavior depends on both a language model and a harness that manages prompts, tools, files, execution, summaries, sub-agents, and stopping behavior. Different harnesses can produce materially different results even when they use the same underlying model. OpenCode is used here as an example of such a harness, but the approach is intended to apply to other coding-agent implementations as well.

This creates a training problem that differs from ordinary GRPO or reinforcement-learning workflows. In a conventional white-box setup, the trainer controls each environment step: it supplies a prompt, samples an action, decides when an episode ends, and obtains a reward. An external coding agent may instead generate titles, issue tool calls, summarize context, launch additional processes, and make other internal requests without exposing a clean step boundary to the trainer. The objective is therefore to learn from the useful model-generated actions while avoiding unnecessary or non-training interactions.

## Architecture and Runtime Components

The training stack uses TRL as the post-training library and its asynchronous GRPO trainer to generate online rollouts and update the policy. OpenEnv supplies a common approach for defining reinforcement-learning environments, including environments for coding and other interactive tasks. The policy model generates through a vLLM-style inference service, referred to in the system as the generation backend, while OpenCode performs the actual agent workflow.

A capture proxy provides the key integration layer. It speaks the same interaction protocol as the agent's expected model backend, so OpenCode can operate without knowing that a training system is intercepting its requests. The proxy records the information required by the trainer, including request or prompt identifiers, generated content, and log probabilities. This makes it possible to recover policy-gradient training data from an existing harness instead of rewriting the harness to expose internal training hooks.

The rollout factory creates an isolated execution environment for every generated attempt. In the demonstration, each environment uses a Dockerized OpenCode image running on a CPU-oriented Hugging Face Sandbox. The sandbox does not require a GPU because it executes the harness and coding tools, while model generation is handled by the separate inference service. Isolation limits the effects of code execution and keeps individual rollouts separated from the trainer and from one another. Hugging Face Jobs provides remote GPU infrastructure for the trainer and generation backend, allowing the experiment to run without the team owning the GPUs directly.

The resource layout described for the demonstration used two H100 GPUs: one for the trainer and one for the generation backend. With eight generations per training step, the pipeline launched eight remote sandboxes for the corresponding rollouts. These figures describe the particular demonstration rather than a general capacity or cost benchmark.

## Data, Masking, and Reward Design

The dataset contains coding problems with problem descriptions, example inputs and outputs, visible tests, and additional hidden tests. The agent is allowed to use the visible examples and tests while working. Hidden tests are retained by the evaluation service and are used to assess whether the submitted solution generalizes beyond the examples shown in the prompt.

The captured interaction is selectively filtered. Some agent requests are not useful learning targets, such as a title-generation call. The implementation also removes prose or other turns that are not treated as the model's coding actions, retaining the relevant tool calls for policy training. More generally, the system applies a mask so that the loss is calculated on tokens generated by the policy rather than on the task description, system prompt, prior conversation history, or other context supplied to the model. This distinction is important: the model should be rewarded for the decisions and tool interactions it produces, not trained as though it had generated the entire agent context.

The reward combines two signals. One checks whether the agent uses the available visible tests, including whether it invokes the appropriate test-running tool. The other executes hidden tests to determine whether the resulting code solves cases unavailable in the prompt. The visible-test component encourages the agent to validate its own work, while the hidden-test component supplies a stronger measure of task completion. The exact reward implementation is tailored to this coding-agent environment, so a different harness or task would require different interaction filtering and reward logic.

## Training and Observability

The approach is online: the current policy generates fresh agent trajectories, the capture proxy collects the necessary training information, the sandbox evaluates the resulting artifact, and GRPO uses the reward to update the policy. This is operationally more complicated than supervised fine-tuning because generation, agent execution, evaluation, and optimization must remain coordinated across separate services.

Tracking is performed with Trackio, which exposes the training curves and provides visibility into whether the run is progressing. The system also stores traces of agent execution, including the system prompt, coding task, intermediate reasoning or actions, and tool calls. These traces are useful for diagnosing failures in the harness, reward function, masking logic, or sandbox execution rather than relying only on an aggregate reward.

## Results and Tradeoffs

After 10 training steps, the displayed reward increased and reached 1. This establishes that the end-to-end path—from an external harness, through captured model calls, into isolated execution and back to a GRPO trainer—can function. It does not, by itself, demonstrate durable capability improvement. The experiment did not control for the difficulty of the sampled problems, and the starting model may already have been able to solve some of them. A longer run and a fixed, held-out evaluation set would be needed to determine whether learning occurred and whether it generalized.

The architecture offers several advantages. It allows teams to reuse an existing agent rather than reproducing every orchestration detail inside a trainer, preserves realistic tool-use behavior, and isolates untrusted or failure-prone coding executions. It also creates a path for training on proprietary or independently evolving harnesses, provided the protocol can be intercepted and the relevant actions can be identified. The capture proxy makes the harness a black-box or gray-box environment from the trainer's perspective while still exposing enough information for policy updates.

The costs are substantial. Every rollout requires a separate sandbox, creating scheduling, startup, storage, and execution overhead. Agent-generated trajectories may be long and heterogeneous, making attribution and credit assignment difficult. Filtering out title generation, summaries, prose, or auxiliary calls is task-specific; incorrect masking can train on irrelevant behavior or discard useful signals. Reward design is also vulnerable to overfitting, especially when visible tests are easy or hidden tests are narrow. In addition, the demonstration does not report latency, monetary cost, failure rates, throughput, or a comparison against the original model and harness.

## Broader Direction

The longer-term goal is to train across multiple harnesses rather than optimizing for OpenCode alone. The project describes extending the system so that several coding agents can contribute rollouts, reflecting the observation that frontier models are often trained in environments involving multiple agent and tool configurations. Multi-harness training could improve robustness and reduce over-specialization to one orchestration style, but it would also complicate normalization of prompts, tool schemas, traces, rewards, and termination conditions. Reliable evaluation would need to separate improvement in general coding ability from improvement specific to one harness's conventions.

Overall, this case demonstrates a promising LLMOps pattern: use protocol-compatible interception, isolated execution environments, selective trajectory capture, automated tests, and online policy optimization to train a model through an existing agent. The evidence supports feasibility of the infrastructure, while the learning and production-readiness claims remain open pending longer training, controlled benchmarks, held-out tasks, multi-harness comparisons, and operational measurements.
