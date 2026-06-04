---
title: "Building and Operating Agentic AI Coding Products at Scale with Temporal"
slug: "building-and-operating-agentic-ai-coding-products-at-scale-with-temporal"
draft: false
llmopsTags:
  - "code-generation"
  - "poc"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "prompt-engineering"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "token-optimization"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "cicd"
  - "scaling"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "open-source"
  - "reliability"
  - "scalability"
  - "redis"
  - "cache"
  - "fastapi"
  - "anthropic"
  - "openai"
  - "meta"
  - "google-gcp"
  - "amazon-aws"
industryTags: "tech"
company: "Cursor"
summary: "Cursor, an AI-powered code editor company, developed Cloud Agents to enable independent, asynchronous AI coding agents that run in dedicated cloud environments. The company transitioned from a homegrown orchestration system with 90% reliability to Temporal-based workflows achieving over 99% activity success rates. By leveraging Temporal for workflow orchestration, they enabled parallel agent execution, automated code reviews, and proof-of-correctness through screenshots and videos. The system now processes over 50 million Temporal actions daily across 7+ million workflows, with cloud agents generating one-third of internal merged pull requests, demonstrating significant developer productivity gains."
link: "https://www.youtube.com/watch?v=IYcBMHm6xO4"
year: 2026
seo:
  title: "Cursor: Building and Operating Agentic AI Coding Products at Scale with Temporal - ZenML LLMOps Database"
  description: "Cursor, an AI-powered code editor company, developed Cloud Agents to enable independent, asynchronous AI coding agents that run in dedicated cloud environments. The company transitioned from a homegrown orchestration system with 90% reliability to Temporal-based workflows achieving over 99% activity success rates. By leveraging Temporal for workflow orchestration, they enabled parallel agent execution, automated code reviews, and proof-of-correctness through screenshots and videos. The system now processes over 50 million Temporal actions daily across 7+ million workflows, with cloud agents generating one-third of internal merged pull requests, demonstrating significant developer productivity gains."
  canonical: "https://www.zenml.io/llmops-database/building-and-operating-agentic-ai-coding-products-at-scale-with-temporal"
  ogTitle: "Cursor: Building and Operating Agentic AI Coding Products at Scale with Temporal - ZenML LLMOps Database"
  ogDescription: "Cursor, an AI-powered code editor company, developed Cloud Agents to enable independent, asynchronous AI coding agents that run in dedicated cloud environments. The company transitioned from a homegrown orchestration system with 90% reliability to Temporal-based workflows achieving over 99% activity success rates. By leveraging Temporal for workflow orchestration, they enabled parallel agent execution, automated code reviews, and proof-of-correctness through screenshots and videos. The system now processes over 50 million Temporal actions daily across 7+ million workflows, with cloud agents generating one-third of internal merged pull requests, demonstrating significant developer productivity gains."
notion:
  pageId: "373f8dff-2538-80f3-9582-ddf025e4b468"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:22:00.000Z"
  lastEditedTime: "2026-06-02T07:22:00.000Z"
  publishedAt: "2026-06-04T08:05:02Z"
---

## Overview

Cursor is building AI-powered software development tools, and this case study focuses on their Cloud Agents product—a system that enables developers to run multiple independent AI coding agents in parallel, each with dedicated cloud environments. The presentation details their evolution from a fragile homegrown orchestration system to a robust production system built on Temporal workflow orchestration, achieving significant improvements in reliability and developer productivity.

The speaker, Jeremy Stribbling, a software engineer on cloud agents infrastructure at Cursor, provides a detailed technical account of their architecture, deployment challenges, and solutions. This case study is particularly valuable because it demonstrates the practical challenges of operationalizing LLM-based agents at scale and shows how proper orchestration infrastructure can dramatically improve reliability metrics.

## Evolution of AI Coding

Cursor identifies three distinct eras in AI coding. The first era, approximately 18 months prior to the presentation, was dominated by autocomplete functionality using lightweight AI models to predict the next code snippets while developers typed. While useful, this still operated at human speed with developers making all navigation and editing decisions.

About a year before the presentation, models became capable of working autonomously on extended tasks, leading to the second era of synchronous prompt-and-response agents. In this paradigm, developers craft prompts, agents work independently using local computer resources, and eventually produce code diffs for review. However, these agents compete for resources on the same machine and lack strong proof mechanisms beyond code review.

The third era, which Cloud Agents represents, involves independent asynchronous agents running in parallel in the cloud. Each agent receives its own dedicated environment, eliminating resource competition and enabling direct proof of correctness through screenshots, videos, and log files. This architectural shift fundamentally changes how developers can parallelize their work and verify agent outputs.

## Cloud Agents Architecture and Capabilities

Cloud Agents provide each AI coding assistant with an isolated virtual machine in the cloud. When a user initiates an agent, Cursor's servers launch a dedicated coding environment exclusively for that agent. The agent loop—the back-and-forth between the LLM and the environment—happens entirely between the VM and the large language model without consuming any user computer resources. This enables developers to kick off agents, close their laptops, and return hours or days later to review results.

The dedicated environments support various interaction modes. Developers can use VNC to observe the actual desktop, watching agents navigate browsers and interact with UIs in real-time. They can take control themselves to guide agents. Shared terminal sessions allow developers to see command execution. These environments can be accessed from any surface where developers use Cursor—mobile apps, Slack, GitHub, Jira—wherever code work happens.

A critical architectural decision involves VM lifecycle management. Since dedicated VMs are expensive to maintain continuously, Cursor tears down VMs after periods of inactivity. When new prompts arrive, the system spins up fresh VMs, checks out the relevant branch, seeds the conversation history, and the agent resumes work seamlessly. This creates the illusion of infinitely-lived agents while controlling infrastructure costs.

The proof-of-correctness capability represents a significant advancement over traditional code review. The demonstration showed an agent setting up the Temporal UI repository and producing an unedited video of the setup process, navigating pages, listing workflows, and clicking through the interface. Another example showed agents adding visual features and returning screenshots proving the implementation worked. For many use cases, especially UI changes, developers care more about visual confirmation than inspecting code diffs.

## The Road to Temporal: Initial Architecture and Limitations

The Cloud Agents project began over a year before the presentation with the premise of running multiple agents simultaneously. Running agents locally on the same repository created conflicts—agents editing the same files simultaneously, managing different tasks on different branches. Initial explorations included virtualized file systems with copy-on-write semantics, but this proved impractical across Linux, Mac, and Windows platforms. Git worktrees offered a partial solution but still suffered from resource competition and cleanup complexity.

The decision to provide dedicated cloud VMs led to the first architecture iteration. This system used runner nodes deployed on Amazon ECS with a database to assign agents to specific nodes. All user queries and agent loops for a given agent routed through a single assigned node. That node orchestrated communication between the LLM and the dedicated VM, running the agent loop to completion.

The critical weakness was fault tolerance. When runner nodes crashed—which happened frequently—the system stored progress to S3 buckets periodically. When node failure was detected, the agent would be reassigned to a different runner node, which would contact the VM and attempt to continue. As the speaker candidly acknowledged, this was essentially building a poor version of Temporal. The reliability metrics reflect this: the homegrown system achieved only about 90% success rates with cloud agents.

## Temporal-Based Architecture

The current architecture uses stateless frontend nodes to receive user prompts. These nodes are not assigned to specific agents; any node can handle any agent traffic. When starting an agent, the frontend creates a database entry and initiates a Temporal workflow. Cursor uses Temporal Cloud rather than self-hosting, which the speaker credits with accelerating product development significantly.

Temporal Cloud distributes work through queues to worker nodes that Cursor runs in Amazon infrastructure. These stateless workers handle activities as they arrive in standard Temporal fashion. The workflow begins by checking for an existing reachable VM; if none exists, it creates one. The workflow then steps through the agent loop: sending prompts to the model, receiving responses with tool calls, sending those to the VM, waiting for VM responses, and feeding back to the model with full conversation history. This continues until the agent completes its task and outputs results to the appropriate channel—web interface, Slack, GitHub, or elsewhere.

Throughout execution, activities write to content-addressable storage in both S3 and Redis streams, providing the reliability foundation. Activities can restart from their last successful state without replaying expensive model token sequences, which was a major efficiency gain.

## Follow-Up Prompts and Signal-With-Start

A key product requirement was supporting follow-up prompts that users might send minutes, hours, days, or months after initial agent creation. Cursor implements this using Temporal's signal-with-start feature applied to the same workflow structure. If an agent is currently running, the follow-up arrives as a signal inserted into the conversation at the next available opportunity. If no workflow is running, signal-with-start initiates a new workflow instance. At workflow start, the system checks for an existing VM or creates a new one, giving users the experience of infinitely-lived agents despite the actual VM lifecycle management underneath.

## Sub-Agents and Child Workflows

Cloud Agents support sub-agents—a tool call that parent agents can make to spawn brand new agents with focused prompts. Sub-agents share the same environment as their parent but start with fresh conversation contexts. This prevents polluting the parent agent's context window with details from specific subtasks while still allowing focused work on targeted problems.

The implementation uses Temporal child workflows, reusing the agent loop activities from the main workflow but skipping VM provisioning steps since the environment already exists. When the child workflow completes, it returns results to the parent agent as a tool call response, enabling compositional agent architectures.

## Presentation Layer and Streaming Architecture

An early architectural decision involved routing user queries through Temporal queries to workers for the most current state. This proved problematic for several reasons. When workflows were not actively running, queries required replaying workflows, which was slow and expensive. More critically, if workflow code had changed since execution, replay could trigger non-determinism errors, causing failures when users simply tried to check agent status.

The solution separates user presentation from workflow execution through a strict contract. Stateless frontend nodes read directly from S3 buckets for historical data and stream from Redis when agents are actively working. This eliminates direct interaction between users and running Temporal workflows, allowing workflow execution to proceed independently.

Activities streaming data back to users can fail mid-execution, potentially displaying partial messages before restart. To handle this gracefully, all activities output markers into the stream identifying which activity produced which content. Frontend nodes watch for these markers and, if a marker appears that is temporally backwards—indicating an activity restart—the frontend rewinds the stream to that earlier offset and resumes from the corrected position. This creates a seamless user experience despite underlying activity retries.

## Temporal Infrastructure Evolution and Deployment Challenges

The evolution of Cursor's Temporal infrastructure reveals common challenges in operationalizing workflow orchestration systems. Initially, workers deployed via Terraform to Amazon ECS, interacting with Temporal Cloud through standard queuing. The first implementation used infinitely-running workflows that waited for signals when idle—a tempting pattern given Temporal's promises.

Deployments proved problematic. Provisioning new worker nodes while old ones drained led to a 90-minute waiting period for activities to complete. The ECS interface caused new workers to immediately start listening on queues while old workers were still active, resulting in workflows bouncing between code versions—a classic source of non-determinism errors and workflow failures. Old workers would receive SIGTERM signals and attempt to drain, but many would simply hang, requiring hard kills after the timeout period.

To address these issues, Cursor introduced workflow auto-upgrade and restructured workflows into smaller units called "turns" rather than infinitely-running processes. This shortened activity durations and simplified reasoning about workflow behavior. The signal-with-start pattern replaced the infinite workflow approach, allowing workflows to complete and restart cleanly with each user interaction.

The deployment pipeline integrated the Temporal CLI to manage version transitions. After bringing up new ECS nodes, the pipeline gradually ramped traffic using the set-ramping-version command, starting at 1% and increasing incrementally. Old version workers would scale down proportionally as traffic shifted. When ramping reached 100%, the pipeline set the current version to the new deployment.

However, this homegrown ramping system proved fragile. ECS provided poor visibility into when new Temporal workers were actually ready to service activities. Edge cases like CLI rate limiting could prevent setting the current version correctly. If version setting failed, the old nodes would terminate while the version pointer still referenced them, leaving no workers servicing the queue and causing production downtime.

The final solution involved migrating entirely from ECS to Kubernetes with the Temporal-provided Kubernetes controller. This controller integrates tightly with worker lifecycles, detecting when workers are actually ready to service activities before shifting traffic. It reliably spins down old workers only after confirming new workers have sufficient capacity. As long as the Temporal Kubernetes controller stays updated, this system has operated without deployment-related incidents.

## Testing Workflow Upgrades and Non-Determinism

With auto-upgrade enabled and workflows not pinned to specific versions, upgraded workflows must replay all activities using new workflow code against old activity histories. Incorrect workflow upgrades that violate determinism requirements cause non-determinism errors, preventing workflows from running entirely when history and expectations mismatch.

To catch these issues before production deployment, Cursor implemented a CI-based workflow history replay system. A periodic cron job in production contacts Temporal Cloud, lists all production workflows, fetches their histories, and saves them to a locked-down S3 bucket with restricted access. During CI runs on new pull requests, scripts access this bucket, fetch a sample of production histories, and replay them using the proposed new workflow code. If any non-determinism errors occur, the CI job fails, preventing the problematic code from reaching production.

The speaker strongly recommends this approach for anyone using Temporal auto-upgrade, noting it has prevented numerous production incidents over the months of operation.

## Production Metrics and Impact

The production metrics demonstrate both scale and reliability improvements. As of the presentation, Cloud Agents processes approximately 50 million Temporal actions per day across over 7 million unique workflows daily, with usage growing steadily. Activity success rates exceed 99%, a dramatic improvement from the 90% success rate of the homegrown system.

Internal productivity metrics provide compelling evidence of value. Cursor developers are heavy users of their own tools, and internal adoption typically predicts external success. As Cloud Agents became more reliable, faster, and feature-rich, adoption grew significantly. A few months before the presentation, cloud agent-generated code crossed a milestone: one-third of all merged pull requests to Cursor's internal monorepo came from Cloud Agents. This proportion continues growing, representing a substantial shift in how the team builds software.

## Other Temporal Use Cases at Cursor

Beyond Cloud Agents, Cursor leverages Temporal for several other production systems. Cloud Agents themselves function as a tool for other products. The automation and SDK systems, launched the week before the presentation, enable scheduled, triggered, or programmatic cloud agent usage. Developers can schedule agents to run daily at specific times, trigger them on pull request creation, respond to Slack messages, or invoke them programmatically—all powered by Temporal since they utilize Cloud Agents underneath.

Bugbot, Cursor's automated code review product, analyzes pull requests via webhooks when new commits or PRs are opened. Originally built with custom orchestration, Bugbot migrated to Temporal after the team gained experience with it on Cloud Agents. The code review process now runs as Temporal workflows, posting discovered issues back to GitHub, GitLab, or other platforms.

Bugbot Autofix extends this further. When configured to automatically fix discovered bugs, it launches a Cloud Agent in the background to implement fixes, then posts merge commits back to the PR for developer review and approval. This entire flow operates through Temporal workflows.

Finally, Cursor uses Temporal for internal backend service deployments, enabling safe rollouts of new backend versions without concern for mid-deployment failures. This creates an interesting recursive situation where Temporal deploys Cursor's own Temporal workers, which has reportedly worked smoothly.

## Critical Assessment and Considerations

While the case study presents an impressive technical achievement and strong metrics, several aspects warrant balanced consideration. The migration from 90% to 99%+ reliability is significant, but the narrative doesn't deeply explore the failure modes of the remaining 1% or degradation patterns under various failure scenarios. Understanding what happens when VMs fail to provision, when LLM providers experience outages, or when network partitions occur would provide fuller operational context.

The cost structure receives limited discussion. Running dedicated VMs for each agent, even with lifecycle management to tear them down during inactivity, represents substantial infrastructure expense. The presentation doesn't address cost per agent, cost optimization strategies beyond basic VM lifecycle management, or how pricing impacts product economics and accessibility.

The workflow auto-upgrade strategy, while enabling continuous deployment, introduces complexity and risk. The CI-based replay testing mitigates this, but there's inherent tension between rapid iteration and maintaining determinism guarantees across workflow versions. Organizations adopting similar patterns should carefully weigh the operational overhead of history replay testing against the flexibility benefits.

The streaming architecture with activity markers and frontend rewinding is clever but adds complexity to the presentation layer. This approach trades temporal consistency for availability and user experience, which is often the right tradeoff, but debugging issues in this distributed streaming system likely requires sophisticated observability and could present challenges when things go wrong.

The claim that one-third of internal PRs come from Cloud Agents is impressive but lacks context about the nature of these PRs. Are they primarily simple refactorings, comprehensive feature implementations, bug fixes, or a mix? The quality distribution, review burden, and acceptance rates would provide fuller understanding of the productivity impact.

Finally, the case study focuses heavily on infrastructure and orchestration—the LLMOps aspects—with less detail about prompt engineering, model selection strategies, context management, or how they ensure agent outputs are secure and appropriate. The multi-model racing demonstration (running four models on the same prompt) suggests experimentation with different models, but the model selection, evaluation, and optimization processes remain largely unexplored.

## Conclusion

Despite these considerations, this case study provides valuable insights into operationalizing LLM-based agents at meaningful scale. The progression from homegrown orchestration to Temporal demonstrates how appropriate infrastructure foundations enable reliability improvements that unlock product adoption. The specific technical patterns—signal-with-start for follow-ups, child workflows for sub-agents, CI-based history replay testing, and the evolution from ECS to Kubernetes—offer concrete guidance for teams building similar systems.

The integration of workflow orchestration with VM lifecycle management, streaming presentation layers, and multi-surface access demonstrates thoughtful architecture addressing real product requirements. The production metrics indicate genuine scale and impact, while the internal adoption numbers suggest the system delivers tangible value to developers. For organizations considering agentic AI products or needing to orchestrate complex LLM-based workflows in production, Cursor's experience offers both cautionary lessons about homegrown solutions and a roadmap for building reliable systems with established orchestration platforms.
