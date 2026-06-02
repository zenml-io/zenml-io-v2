---
title: "Autonomous Security Investigation Agent at Scale"
slug: "autonomous-security-investigation-agent-at-scale"
draft: false
llmopsTags:
  - "fraud-detection"
  - "classification"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "memory"
  - "harness-engineering"
  - "human-in-the-loop"
  - "evals"
industryTags: "tech"
company: "Wiz"
summary: "Wiz developed an autonomous agent called AutoAgent to conduct daily security threat investigations at massive scale, handling over 3,000 investigations per day. The system addresses the challenge of security event investigation in cloud environments, where the investigative path is unpredictable and context can explode to gigabytes of data per tool call. The agent uses a multi-agent architecture with specialized sub-agents, implements reflection loops for deliberate decision-making, manages context through radical compression techniques, and leverages domain expertise through playbooks. A comprehensive evaluation and improvement framework enables continuous learning from real investigations, with profile-based performance tracking and simulation capabilities that allow teams across the organization to identify gaps and improve the agent without creating bottlenecks."
link: "https://www.youtube.com/watch?v=sGj_ZFLX-VE"
year: 2026
seo:
  title: "Wiz: Autonomous Security Investigation Agent at Scale - ZenML LLMOps Database"
  description: "Wiz developed an autonomous agent called AutoAgent to conduct daily security threat investigations at massive scale, handling over 3,000 investigations per day. The system addresses the challenge of security event investigation in cloud environments, where the investigative path is unpredictable and context can explode to gigabytes of data per tool call. The agent uses a multi-agent architecture with specialized sub-agents, implements reflection loops for deliberate decision-making, manages context through radical compression techniques, and leverages domain expertise through playbooks. A comprehensive evaluation and improvement framework enables continuous learning from real investigations, with profile-based performance tracking and simulation capabilities that allow teams across the organization to identify gaps and improve the agent without creating bottlenecks."
  canonical: "https://www.zenml.io/llmops-database/autonomous-security-investigation-agent-at-scale"
  ogTitle: "Wiz: Autonomous Security Investigation Agent at Scale - ZenML LLMOps Database"
  ogDescription: "Wiz developed an autonomous agent called AutoAgent to conduct daily security threat investigations at massive scale, handling over 3,000 investigations per day. The system addresses the challenge of security event investigation in cloud environments, where the investigative path is unpredictable and context can explode to gigabytes of data per tool call. The agent uses a multi-agent architecture with specialized sub-agents, implements reflection loops for deliberate decision-making, manages context through radical compression techniques, and leverages domain expertise through playbooks. A comprehensive evaluation and improvement framework enables continuous learning from real investigations, with profile-based performance tracking and simulation capabilities that allow teams across the organization to identify gaps and improve the agent without creating bottlenecks."
notion:
  pageId: "373f8dff-2538-80de-ac8c-fce4bccb198a"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:31:00.000Z"
  lastEditedTime: "2026-06-02T07:31:00.000Z"
  publishedAt: "2026-06-02T07:35:00Z"
---

## Overview and Business Context

Wiz developed AutoAgent, an autonomous security investigation agent that operates at significant scale in production, conducting over 3,000 threat investigations daily. The system represents a sophisticated application of LLMOps principles to solve the complex problem of security event investigation in cloud environments. The speaker, Tal Wittenberg, a data science expert and part of the research team at Wiz, presented this case study emphasizing the unique challenges of applying autonomous agents to security investigation versus more deterministic tasks like code generation.

The fundamental problem AutoAgent addresses is determining whether a security event in a cloud environment is malicious or a false positive. Unlike code generation tasks where the workflow can be predetermined and broken into known steps, security investigation has an unpredictable path - investigators know where they start but not where they'll end up. Actions taken at step five might influence what happens at step ten, and the investigation might lead to discovering lateral movement attacks when it started with a simple suspicious login event. This non-deterministic nature creates unique challenges for LLM-based agents.

## Core Technical Challenges

The team identified several critical challenges that differentiate this application from typical agent use cases. First is context explosion - cloud environments are massive, and each tool call can return gigabytes of information. The agent connects to numerous organizational systems, causing context to grow exponentially. Second, different areas of cloud security require different domain expertise, necessitating specialized knowledge application. Third, the system must operate at significant scale, handling thousands of investigations daily with heavy token consumption and numerous tool calls per investigation. Finally, and most importantly, the system requires continuous improvement - a closed feedback loop that enables the agent to learn from investigations rather than remaining static.

The team conceptualized the agent architecture not as a trivial system but as an operating system. In this model, the LLM functions as the CPU, the conversation (the investigation itself) acts as RAM that must be carefully managed, the state represents external persistent storage (like a disk) where information can be recorded outside the conversation context, and the ecosystem includes all tools, skills, and sub-agents that the main agent can leverage.

## Multi-Agent Architecture and Context Isolation

To address the challenge of varying domain expertise across different cloud security areas, Wiz implemented a hierarchical multi-agent architecture with context isolation. The main agent functions both as an investigator and as a manager of specialized sub-agents. When encountering areas requiring deeper expertise, the main agent delegates to sub-agents, providing them with the relevant problem. These sub-agents conduct their analysis within their own isolated context and return only the essential findings to the main agent. This approach prevents the main agent's context from being overwhelmed by specialized investigative details while still leveraging domain-specific expertise.

## Reflection Mechanism for Deliberate Decision-Making

A critical innovation in the system is the reflection mechanism, which addresses the tendency of agents to make overly generic decisions too quickly. Without proper guidance, agents often take predictable, generic actions and can easily repeat themselves. The team developed a mechanism combining several known techniques into a unified approach where the model operates in iterations. At the end of each iteration, the agent stops, reflects on its actions so far, summarizes if necessary, and then plans its next steps. These next steps might be additional tool calls, or the agent might determine it has sufficient information to make a decision and terminate the investigation.

This self-reflection approach ensures agents remain within appropriate scope and make deliberate choices rather than generic ones. The reflection checkpoints force the model to constantly evaluate whether it's on the right track or needs to adjust its approach, preventing the aimless wandering that can occur with unconstrained agent loops.

## Agent State and Radical Context Compression

The team implemented what they call agent state - a form of memory external to the conversation that the LLM can write to but that doesn't consume context window space. This enables a radical context compression strategy. After each iteration, the agent can extract key findings or investigation steps from the context and store them as structured records in the external state. Once this information is extracted and stored, the original conversational context that generated these findings can be thrown away, freeing up the context window.

This approach ensures that while the agent may process enormous amounts of tokens across an entire investigation, the active context window remains bounded within manageable limits. The system continuously offloads context early rather than accumulating it throughout the investigation, with the understanding that if previously discarded information is needed later, a tool can retrieve it from the external state.

## Knowledge Base and Playbooks for Domain Expertise

Generic agents struggle to know where to begin investigations and which direction to pursue when faced with massive amounts of information. To address this, Wiz developed a knowledge base system using what the security domain calls playbooks. These playbooks are essentially documents containing sets of instructions, questions, and tools relevant to specific threat types. When an investigation begins, the appropriate playbook is loaded based on the detected threat category. This provides the agent with a starting direction and prevents it from becoming distracted or wandering aimlessly. The playbook guides the initial investigative steps while still allowing the agent flexibility to follow the evidence wherever it leads.

## Evaluation and Continuous Improvement Framework

Operating a production agent at scale requires robust evaluation and continuous improvement processes. Wiz implemented a weekly feedback loop for systematic improvement. The process involves sampling investigations, running them through evaluation, comparing results against a golden set of ground truth data, understanding mismatches, identifying improvement opportunities, and pushing updates if improvements are validated.

The key goals of this evaluation framework are threefold: understanding how to assess model performance and identify which areas are strong versus weak; determining what specifically needs improvement; and identifying which team should handle each improvement task. The challenge is that improving a production agent at this scale involves multiple stakeholders - developers, product managers, analysts, researchers, data scientists, and others - all needing to coordinate improvements to the same system.

## Profile-Based Performance Tracking

To manage this complexity, Wiz developed a profiling system that segments investigations into meaningful populations. They created features from thousands of real customer investigations with actual feedback, generating characteristics that when combined create distinct profiles. For example, one feature might be total tool calls (categorized as high, medium, or low based on ranges like 0-10, 10-20, or 20+), while another might be threat severity (critical, high, medium, low). Combining these features creates profiles like "high critical severity threats with high number of tool calls."

These profiles enable the team to visualize agent performance across different investigation types. They created performance graphs plotting completeness versus correctness for each profile, with dot size representing the number of investigations in that profile. This visualization immediately revealed patterns - for instance, if all profiles show poor performance, it indicates a systemic issue affecting all investigation types. In one case, this approach identified a high false positive rate where the model was too trigger-happy, marking many benign events as malicious.

## Simulation Engine for Rapid Iteration

Rather than re-running entire investigations from scratch to test improvements, Wiz built a simulation engine that can replay specific steps from existing investigations with modified parameters. This is particularly valuable for testing changes to end-of-investigation steps like the final reflection or the decision-making tool, where ground truth is already established. The team can modify prompts, add extra steps, or adjust parameters and simulate how these changes would affect the final decision across a large sample of investigations.

When they identified the false positive problem, they added a calibration step to reduce false positives and used the simulation engine to test this across most threats in their dataset. The results showed significant improvement across profiles, validating that the change was worth deploying to production. This simulation capability dramatically accelerates the improvement cycle by avoiding the time and cost of re-running complete investigations.

## LLM-as-Judge for Gap Analysis

Beyond identifying that a profile performs poorly, teams need to understand what specifically is wrong. Wiz employs an LLM-as-judge approach for detailed gap analysis. For each profile, they sample investigations and run them through a separate LLM (different from the one that conducted the investigation) configured with extensive labels representing potential failure modes. These labels are specific, task-oriented categories rather than lengthy text descriptions. An additional LLM tier then aggregates these individual analyses to create a profile-level summary.

This approach identifies specific gaps such as: a tool that should have been called but wasn't, issues with prompts, steps in the playbook that were specified but not executed, or problems with the final decision prompt. This granular gap identification enables the relevant team to understand exactly what needs fixing for each profile. Human analysts or the appropriate specialized team can then investigate these gaps, determine root causes, and implement fixes targeted to improve specific investigation populations.

## Agent Democratization for Organizational Scale

As the agent matured, the data science team found themselves becoming a bottleneck. Every team across the organization would approach them with problems: the agent isn't performing well in this area, fix this issue, improve that behavior. The team realized they needed to shift from being centralized gatekeepers to enabling distributed ownership of agent improvement.

They developed an "agent democratization" framework that empowers different teams to work on the agent independently. This framework allows teams to define the population (threat types) they want to focus on, identify problems through the profiling and gap analysis tools, make changes, test those changes through simulation, and if improvements are validated, publish them to production - all without requiring intervention from the core data science team. This approach eliminates the bottleneck while maintaining quality through the validation and testing frameworks.

## Key Production LLMOps Principles

The case study emphasizes several critical principles for operating agents in production at scale. Context management is identified as the most serious bottleneck, requiring intelligent strategies to "offload early" - extracting value from context, storing it externally, and discarding the raw context rather than accumulating it indefinitely. Agents must be forced to stop and think about their actions through reflection mechanisms; without proper constraints and starting points, they make generic decisions and repeat themselves.

Everything must be evaluated continuously. While this is challenging, particularly when ground truth is limited, combining ground truth evaluation with LLM-as-judge approaches and careful monitoring of failure points provides sufficient signal to drive improvement. The human factor requires as much planning as the technical architecture - the team learned that scaling from a small group to handling thousands of daily investigations requires proactive collaboration planning. Failing to address organizational coordination early created confusion about roles and responsibilities that had to be remediated later.

## Balanced Assessment

The presentation is clearly from the team that built AutoAgent and emphasizes their successes, but the speaker demonstrates appropriate technical humility by acknowledging several limitations. The simulation engine is explicitly noted as not capable of simulating everything - only certain types of steps like end-of-investigation decisions where context is already established. The evaluation problem is acknowledged as "very difficult" and dependent on having good ground truth data, which "takes time to collect."

The team's frank admission about organizational bottlenecks - that they initially failed to plan for multi-team collaboration and had to address this reactively - demonstrates honest reflection on both technical and organizational challenges. The false positive problem they discovered through profiling (the model being too trigger-happy) shows they're actively identifying and addressing real production issues rather than claiming perfect performance.

The architecture decisions represent reasonable engineering tradeoffs. The multi-agent approach with context isolation trades some coordination complexity for better context management and domain specialization. The radical compression strategy of discarding context with the understanding that it can be retrieved if needed later trades potential retrieval overhead for bounded context windows. The playbook approach for injecting domain expertise trades some agent flexibility for more focused and effective investigations.

Overall, this case study represents a mature, production-scale implementation of autonomous agents with sophisticated LLMOps practices around evaluation, continuous improvement, and organizational enablement. The challenges are specific to operating agents at significant scale in an unpredictable domain, and the solutions demonstrate thoughtful engineering rather than merely applying standard agent frameworks.
