---
title: "Building an Evaluation-First Culture for Enterprise Agent Platform"
slug: "building-an-evaluation-first-culture-for-enterprise-agent-platform"
draft: false
llmopsTags:
  - "customer-support"
  - "speech-recognition"
  - "chatbot"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "agent-based"
  - "human-in-the-loop"
  - "evals"
  - "monitoring"
industryTags: "tech"
company: "Uber"
summary: "Uber's agent platform team faced a common challenge where development teams would ship LLM-powered agents to production and defer evaluation development until later, creating a cycle of retrofitting and debugging. To solve this, they built platform capabilities that made evaluations the default from day one, including automatic tracing across all environments, AI-generated starter evaluation kits delivered via Slack, and CLI-based tools that democratized eval ownership beyond engineering to product and customer teams. This shift from treating evals as a checkbox to an engine for continuous improvement enabled them to catch critical issues early, such as discovering that their voice booking agent had a 95% offline eval score but was misinterpreting background conversations in production, leading to fundamental changes in how the agent understood intent."
link: "https://www.youtube.com/watch?v=UTcKagbKp4A"
year: 2026
seo:
  title: "Uber: Building an Evaluation-First Culture for Enterprise Agent Platform - ZenML LLMOps Database"
  description: "Uber's agent platform team faced a common challenge where development teams would ship LLM-powered agents to production and defer evaluation development until later, creating a cycle of retrofitting and debugging. To solve this, they built platform capabilities that made evaluations the default from day one, including automatic tracing across all environments, AI-generated starter evaluation kits delivered via Slack, and CLI-based tools that democratized eval ownership beyond engineering to product and customer teams. This shift from treating evals as a checkbox to an engine for continuous improvement enabled them to catch critical issues early, such as discovering that their voice booking agent had a 95% offline eval score but was misinterpreting background conversations in production, leading to fundamental changes in how the agent understood intent."
  canonical: "https://www.zenml.io/llmops-database/building-an-evaluation-first-culture-for-enterprise-agent-platform"
  ogTitle: "Uber: Building an Evaluation-First Culture for Enterprise Agent Platform - ZenML LLMOps Database"
  ogDescription: "Uber's agent platform team faced a common challenge where development teams would ship LLM-powered agents to production and defer evaluation development until later, creating a cycle of retrofitting and debugging. To solve this, they built platform capabilities that made evaluations the default from day one, including automatic tracing across all environments, AI-generated starter evaluation kits delivered via Slack, and CLI-based tools that democratized eval ownership beyond engineering to product and customer teams. This shift from treating evals as a checkbox to an engine for continuous improvement enabled them to catch critical issues early, such as discovering that their voice booking agent had a 95% offline eval score but was misinterpreting background conversations in production, leading to fundamental changes in how the agent understood intent."
notion:
  pageId: "3c1f8dff-2538-8037-a4ce-c06c99835c74"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T09:01:00.000Z"
  lastEditedTime: "2026-08-19T09:01:00.000Z"
  publishedAt: "2026-08-19T09:19:36Z"
---

## Overview

Uber has developed an enterprise-scale agent platform that powers both external-facing conversational experiences, such as voice-based ride booking, and internal agent systems. The platform team managing this infrastructure spent over a year addressing a fundamental challenge in LLMOps: how to make evaluation an integral part of the agent development lifecycle rather than an afterthought. Their journey represents a sophisticated evolution from treating evaluations as a compliance checkbox to positioning them as a continuous improvement engine that fundamentally shapes product direction.

## The Core Problem

The platform team observed a consistent pattern across all agent development teams within Uber. Despite universally wanting high-quality production agents, teams would prioritize shipping quickly to prove product-market fit and validate that their use cases worked at all. This led to a rational but ultimately costly decision: deferring evaluation development until after initial deployment. The consequences of this approach became apparent as teams entered an endless cycle of retrofitting evaluations after the fact and struggling to diagnose why agents broke in production. The platform team identified this not as a motivation problem but as a friction problem requiring platform-level solutions.

## Making Evaluations Default: The Infrastructure Approach

The platform team's strategy centered on removing friction at two critical points in the development lifecycle. Their first intervention was implementing comprehensive tracing from the very beginning of development. Rather than requiring teams to instrument tracing later, the platform automatically provided it across every environment as soon as development started. This foundational observability layer gave teams immediate visibility into agent behavior over time without requiring any additional effort. Developers could build an agent, experiment with it informally, and have a complete audit trail of how it evolved, creating the data foundation necessary for more sophisticated evaluation strategies.

The second major friction point addressed was the knowledge gap around evaluation design. Even when teams had access to traces and data, they often didn't know what kinds of evaluations to write, what patterns to look for, or how to get started. The platform team leveraged their unique position: they had context about how each agent was built, access to its documentation, and understanding of common failure modes. Using this information, the platform automatically generated starter evaluation kits tailored to each specific agent and delivered these insights directly to builders via Slack. This approach was deliberately designed to meet developers where they were, translating complex concepts like LLM judges into actionable, domain-specific evaluations like detecting tool contradictions. By framing evaluations in terms of the actual problems teams cared about rather than abstract testing concepts, the platform lowered the barrier to entry significantly.

## Democratizing Evaluation Beyond Engineering

A critical insight from Uber's experience was recognizing that agent evaluations differ fundamentally from traditional QA tests. While traditional software testing is primarily an engineering discipline, effective agent evaluation requires input from teams closest to the customer, including product managers and customer support teams. These non-technical stakeholders have crucial insights into what constitutes acceptable agent behavior but were previously excluded from the evaluation process due to technical barriers.

To bridge this gap, the platform team built CLI-based tools that abstracted away technical complexity while still giving product teams meaningful control over the evaluation process. This democratization allowed teams beyond engineering to own significant portions of the evaluation lifecycle, ensuring that customer-centric perspectives shaped how agents were assessed and improved.

## Shifting the Evaluation Narrative

Beyond tooling, the platform team recognized they needed to change the organizational narrative around what evaluations mean. They actively moved teams away from fixating on achieving high percentage scores on evaluation metrics, which often became vanity metrics divorced from actual product quality. Instead, they pushed teams to ask fundamentally different questions: Do you actually trust your evaluations? What specific changes have you made to your roadmap based on evaluation insights? How current is your evaluation dataset, and does it reflect your actual production workload?

This narrative shift was crucial because it reframed evaluations from a compliance activity to a strategic tool for product development. The platform team couldn't build tooling to enforce this cultural change; it required ongoing education and modeling of how evaluation insights should inform decision-making.

## Production Impact: The Voice Booking Case Study

The voice booking feature for Uber rides provides a concrete example of how this evaluation-first approach delivered value. During development, the team achieved impressive offline evaluation scores exceeding 95%, which traditionally would have been considered sufficient for launch. However, their production evaluation infrastructure revealed a critical issue: the number of conversational turns per session was significantly higher than expected, indicating users were struggling to complete bookings efficiently.

Deep investigation into production traces revealed a fundamental flaw in how the agent processed audio input. In one case, a customer attempting to book a ride to San Francisco International Airport had someone in the background mention wanting pizza. The agent interpreted this background conversation as a legitimate user intent and began rerouting the trip to nearby pizza restaurants. This failure mode would have been nearly impossible to catch with traditional offline evaluations, which typically test agents in clean, controlled conditions.

The production evaluation insights led to fundamental architectural changes in how the agent understood intent and when it should ignore input. The team developed capabilities for the agent to distinguish genuine user intent from background noise and implemented no-op behaviors where appropriate. This change was only possible because the evaluation infrastructure provided visibility into production behavior and because product teams were empowered to interpret those insights and make consequential decisions.

## Evolution Toward an Evaluation Engine

The presentation describes Uber's evaluation infrastructure as evolving through distinct phases. The initial state was evaluation as default, where the platform ensured that tracing, basic evaluations, and continuous monitoring existed from day one for every agent. The next phase, which the team was actively building toward, positions evaluation as an engine for continuous improvement.

In this more advanced model, production traces automatically feed into failure detection systems that categorize issues without human intervention. These categorized failures then drive proposals for both agent improvements and evaluation suite updates. Development teams review these automated proposals, accepting or rejecting them, creating a tight feedback loop where production behavior continuously informs both the agent implementation and how it is tested. This represents a significant leap beyond traditional evaluation approaches, positioning the evaluation infrastructure as an active participant in the development process rather than a passive measurement tool.

## Critical Assessment and Balanced Perspective

While Uber's approach demonstrates significant sophistication, several aspects warrant critical examination. The presentation focuses heavily on the infrastructure and tooling enablement but provides limited detail on the actual evaluation methodologies employed. The mention of LLM judges suggests they're using model-based evaluation, but there's no discussion of the well-documented challenges with this approach, including bias, consistency issues, and the need to validate the judges themselves.

The voice booking example, while compelling, represents a relatively straightforward failure mode—misinterpreting background conversation. It's unclear from the presentation how the evaluation infrastructure handles more subtle degradations in agent quality, such as gradually less helpful responses or biases that emerge over time. The focus on conversational turn count as a metric is reasonable but represents a fairly coarse-grained signal.

The democratization of evaluation to product teams, while valuable, also introduces risks not addressed in the presentation. Product teams may lack the technical context to understand the limitations of certain evaluation approaches or may push for evaluation criteria that are difficult to operationalize reliably. The balance between accessibility and rigor is delicate, and it's unclear how Uber manages this tradeoff.

The emphasis on making evaluations "default" is commendable, but the presentation doesn't address the computational and operational costs of running comprehensive evaluation suites continuously. At enterprise scale, this could represent significant infrastructure investment, and teams need to make thoughtful decisions about what to evaluate, how frequently, and with what level of rigor.

Finally, while the narrative shift from eval scores to eval trust is philosophically sound, measuring whether teams actually trust their evaluations is inherently subjective and difficult to operationalize. Without concrete metrics or qualitative research methodology, it's challenging to assess whether this cultural intervention actually succeeded beyond anecdotal evidence.

## Technical Architecture Implications

The description of Uber's approach implies a sophisticated technical architecture, though specific implementation details are scarce. The automatic generation of starter evaluation kits suggests they've built some form of agent introspection capability that can analyze agent configurations and propose relevant evaluation strategies. This likely involves pattern matching against common agent architectures and failure modes observed across their platform.

The integration with Slack for delivering evaluation insights represents a thoughtful approach to meeting developers in their existing workflows rather than forcing them to adopt new tools. This "evaluation insights as notifications" model reduces context switching and increases the likelihood that insights actually influence development decisions.

The CLI tools for democratizing evaluation access suggest Uber has developed abstractions that hide the complexity of their evaluation infrastructure while still exposing meaningful control surfaces. This is a challenging design problem—providing enough power for sophisticated use cases while remaining accessible to non-technical users.

## Broader LLMOps Implications

Uber's experience reinforces several important lessons for organizations deploying LLMs at scale. First, evaluation infrastructure cannot be an afterthought; it must be a first-class platform capability from the beginning. The cost of retrofitting evaluations after deployment is prohibitively high, both in engineering effort and in the production issues that go undetected in the interim.

Second, effective LLMOps requires breaking down silos between engineering, product, and operations teams. Agents exist at the intersection of these domains, and evaluation strategies that exclude any of these perspectives will have blind spots. The tooling and organizational structure must actively facilitate cross-functional collaboration.

Third, offline evaluation, no matter how comprehensive, cannot substitute for production monitoring and evaluation. The voice booking example powerfully illustrates how production conditions introduce complexities—background noise, edge cases, unexpected user behaviors—that are nearly impossible to simulate in offline testing environments.

Finally, treating evaluation as an engine for continuous improvement rather than a gating mechanism represents a maturity model for LLMOps. Organizations early in their journey often focus on evaluation as a checkpoint: "Is this agent good enough to ship?" More mature organizations treat evaluation as an ongoing feedback mechanism that continuously shapes both the agent and the evaluation criteria themselves. Uber's vision of automated failure categorization and proposal generation represents the logical endpoint of this evolution, though it remains to be seen how well this ambitious vision translates to practice across diverse use cases.

The case study ultimately represents a significant contribution to the emerging field of LLMOps, demonstrating how platform thinking can address evaluation challenges at enterprise scale. However, as with many conference presentations from vendors or large tech companies, it should be read with appropriate skepticism about the completeness of the picture presented and the generalizability of the approach to different organizational contexts and use cases.
