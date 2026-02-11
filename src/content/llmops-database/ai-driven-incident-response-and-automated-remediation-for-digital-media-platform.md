---
title: "AI-Driven Incident Response and Automated Remediation for Digital Media Platform"
slug: "ai-driven-incident-response-and-automated-remediation-for-digital-media-platform"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6936bdbbfe9e98761d0a2e1d"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:35:01.808Z"
  createdOn: "2025-12-08T11:59:55.327Z"
llmopsTags:
  - "content-moderation"
  - "realtime-application"
  - "high-stakes-application"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "semantic-search"
  - "error-handling"
  - "latency-optimization"
  - "system-prompts"
  - "evals"
  - "kubernetes"
  - "monitoring"
  - "databases"
  - "microservices"
  - "devops"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "elasticsearch"
  - "amazon-aws"
industryTags: "media-entertainment"
company: "iHeart"
summary: "iHeart Media, serving 250 million monthly users across broadcast radio, digital streaming, and podcasting platforms, faced significant operational challenges with incident response requiring engineers to navigate multiple monitoring systems, VPNs, and dashboards during critical 3 AM outages. The company implemented a multi-agent AI system using AWS Bedrock Agent Core and the Strands AI framework to automate incident triage, root cause analysis, and remediation. The solution reduced triage response time dramatically (from minutes of manual investigation to 30-60 seconds), improved operational efficiency by eliminating repetitive manual tasks, and enabled knowledge preservation across incidents while maintaining 24/7 uptime requirements for their infrastructure handling 5-7 billion requests per month."
link: "https://www.youtube.com/watch?v=qvhmFAvG_QI"
year: 2025
seo:
  title: "iHeart: AI-Driven Incident Response and Automated Remediation for Digital Media Platform - ZenML LLMOps Database"
  description: "iHeart Media, serving 250 million monthly users across broadcast radio, digital streaming, and podcasting platforms, faced significant operational challenges with incident response requiring engineers to navigate multiple monitoring systems, VPNs, and dashboards during critical 3 AM outages. The company implemented a multi-agent AI system using AWS Bedrock Agent Core and the Strands AI framework to automate incident triage, root cause analysis, and remediation. The solution reduced triage response time dramatically (from minutes of manual investigation to 30-60 seconds), improved operational efficiency by eliminating repetitive manual tasks, and enabled knowledge preservation across incidents while maintaining 24/7 uptime requirements for their infrastructure handling 5-7 billion requests per month."
  canonical: "https://www.zenml.io/llmops-database/ai-driven-incident-response-and-automated-remediation-for-digital-media-platform"
  ogTitle: "iHeart: AI-Driven Incident Response and Automated Remediation for Digital Media Platform - ZenML LLMOps Database"
  ogDescription: "iHeart Media, serving 250 million monthly users across broadcast radio, digital streaming, and podcasting platforms, faced significant operational challenges with incident response requiring engineers to navigate multiple monitoring systems, VPNs, and dashboards during critical 3 AM outages. The company implemented a multi-agent AI system using AWS Bedrock Agent Core and the Strands AI framework to automate incident triage, root cause analysis, and remediation. The solution reduced triage response time dramatically (from minutes of manual investigation to 30-60 seconds), improved operational efficiency by eliminating repetitive manual tasks, and enabled knowledge preservation across incidents while maintaining 24/7 uptime requirements for their infrastructure handling 5-7 billion requests per month."
---

## Overview

iHeart Media represents a compelling production implementation of multi-agent AI systems for Site Reliability Engineering (SRE) operations at massive scale. The company operates 850+ AM/FM radio stations, reaches a quarter billion people through iHeartRadio, and serves as one of the world's largest podcast platforms with approximately 150 million podcast downloads monthly. Their digital infrastructure handles 5-7 billion requests per month with peak loads of 60,000-70,000 hits per second, all running on AWS with over 70 AWS services and 100+ microservices across 15 EKS clusters. The presentation, delivered at AWS re:Invent by Sudipta Bose (AWS Senior Solutions Architect), Harish Naraj (VP of Cloud Engineering at iHeart), and Serkan Ayak (Principal Engineer at iHeart), documents their journey from traditional manual incident response to AI-powered automated operations.

## The Problem Space

The case study effectively articulates what they call the "7 circles of on-call hell" that characterized their pre-AI incident response process. When incidents occurred (particularly the dreaded 3 AM pages), engineers faced an alarm storm requiring them to authenticate through VPN, log into AWS console, access multiple monitoring dashboards (New Relic, Prometheus, Grafana, Fastly CDN stats), and potentially SSH into production systems. Each authentication step consumed precious minutes during critical incidents. The information hunt that followed involved sifting through endless metrics and logs across distributed systems. Engineers faced significant tribal knowledge dependency, often needing to ask "who last worked on this service?" or "where's the runbook?" Manual diagnosis required running commands, checking service dependencies, and analyzing service health across nested distributed systems. After resolving issues, documentation debt accumulated as solutions remained in someone's head rather than being captured systematically.

The scale of iHeart's architecture makes root cause analysis particularly challenging. Their digital platform runs entirely on AWS with a completely serverless broadcast vertical supporting multi-region automatic failover. The ad and sales tech vertical generates approximately 40% of all audio advertising spend. The digital platform itself uses multi-level caching with external CDN and internal caching, multiple Kubernetes clusters (separate for backend, frontend, and other purposes), and integrates with numerous third-party ecosystems like TikTok, Alexa, Roku, and Sonos. With 170+ AWS accounts and services that are interdependent across clusters (Service A in cluster one calling Service B in cluster two), determining whether an issue is a root cause or symptom becomes extraordinarily difficult.

## Solution Architecture

The team built a sophisticated multi-agent orchestration system using AWS Bedrock Agent Core as the foundation. The architecture consists of three primary layers: a trigger layer (integrating with Slack and PagerDuty), an orchestration platform serving as the "brain," and a data layer containing server logs and knowledge bases of previous operational procedures.

The orchestration layer handles four critical functions. First is intent recognition, understanding what humans or systems are requesting. Second is context assembly, gathering relevant contextual data for the specific incident. Third is task delegation, identifying which specialized sub-agents are best suited for particular jobs. Fourth is response generation, synthesizing findings from multiple agents into actionable insights.

Rather than building a monolithic AI agent, they implemented specialized sub-agents trained for specific activities that work collaboratively. The orchestrator agent (also called the SRE agent) receives incident questions, identifies appropriate sub-agents, delegates tasks, and synthesizes responses. Specialized sub-agents include monitoring agents that identify performance anomalies and latency issues, log agents optimized to process millions of lines of code quickly, Kubernetes agents providing pod-level details about health and service mesh issues, and knowledge-based agents that access previous operational history to recommend resolution steps based on similar past incidents.

## Technology Stack and Implementation Details

The team selected AWS Bedrock Agent Core specifically for its managed runtime that eliminates infrastructure management overhead, flexibility in agent types and model selection, and enterprise-grade security with seamless AWS integration. Bedrock Runtime proved critical as it supports long-running instances up to 8 hours (essential for multi-agent orchestration) and provides complete session isolation for security. Bedrock Memory enables persistence of conversational context and learned behaviors, while integration with knowledge bases allows retrieval of institutional knowledge on-demand.

For the agent framework, they chose Strands AI, an open-source framework providing developer tools for rapid development and integration with AWS services including Model Context Protocol (MCP) support. While Bedrock Agent Core supports other frameworks like LangChain, they found Strands particularly well-suited for building scalable solutions.

The Slack bot interface, built on the Slack Bolt framework, supports two invocation patterns. Engineers can directly mention the bot in Slack threads (e.g., tagging the SRE bot under a PagerDuty alert), or for specific alert types the system knows it can handle, the bot automatically investigates without requiring tagging. When alerts fire, lightweight metadata flows to the orchestrator: Slack channel ID, PagerDuty alert content, and message content. The SRE agent consults its system prompt (essentially an instruction manual for incident response) to extract key details like cluster, environment, and namespace based on the metadata.

## Advanced Context Management

A particularly sophisticated aspect of their implementation addresses the fundamental constraint of finite context windows. The presentation includes an excellent technical deep-dive into this challenge. Initially, they faced context window exhaustion where a single agent carrying forward all prompt text, tool definitions, and responses would exceed token limits after just a few tool calls. For example, starting with 70K tokens for system prompt and tools, adding 50K tokens from a Kubernetes events call, then attempting to retrieve logs would push them over the context limit, stopping the agent mid-investigation.

Their solution implements what they call the "agent as tools" pattern, essentially microservices architecture for AI agents. A coordinator agent with a 200K token context window delegates specific tasks to specialized agents, each with its own isolated context window. When the coordinator determines it needs Prometheus metrics, instead of calling a tool that dumps 150K tokens of raw data into its context, it spawns a completely separate Prometheus agent. That agent performs deep dives, queries Prometheus, crunches metrics, analyzes trends, then returns a compact summary (e.g., 500 tokens stating "service throughput dropped 80% at 2:47 UTC, correlates with increased error rates at session service"). The coordinator receives only the 500-token summary while the Prometheus agent's 160K context is discarded. Similarly, a Kubernetes agent might spend 61K tokens investigating pod crashes and OOM kills but returns only a 1,000-token summary identifying that 12 pods were killed due to memory limits set at 512MB while actual usage spiked to 890MB after a deployment at 12:45 UTC.

This architecture enabled them to conduct deep investigations across three different platforms (Prometheus, Kubernetes, New Relic) while barely making a dent in the coordinator's context window, leaving room for additional agent delegations or final synthesis. This demonstrates sophisticated understanding of LLM production constraints and creative architectural solutions.

## Integration with Observability and Operations Tools

The system integrates with iHeart's existing observability stack, which varies across teams. Some teams ship logs to New Relic while sending metrics to Prometheus/Grafana; others send both logs and metrics to New Relic. The agents handle this heterogeneity, querying the appropriate data sources based on the service and cluster in question. Integration with Fastly CDN provides visibility into content delivery issues. The Kubernetes agents interact directly with EKS clusters to retrieve pod status, events, deployment history, and resource utilization metrics.

Two powerful Bedrock capabilities proved particularly valuable in production. Bedrock Memory allows the system to learn from interactions and build upon previous context. In a concrete example from their demo, after the agent investigated a cron job failure, asked for permission to rerun it, and received approval, an engineer could tell the bot "next time you see this exact error, don't ask me, just rerun it automatically." The bot stores this preference in memory, and subsequent identical alerts trigger automatic remediation without human intervention. This represents supervised learning of operational preferences.

Bedrock Knowledge Bases store curated institutional knowledge including runbooks for specific applications, README files, Root Cause Analysis (RCA) documents, and postmortems. Agents query this data on-demand, pulling only relevant information when needed rather than preloading everything into context. If the artist service acts up, the agent retrieves the artist service runbook. When encountering a familiar error pattern, it can grab the RCA from three months ago documenting the previous fix. This just-in-time retrieval approach keeps context windows manageable while ensuring access to organizational memory.

## Demonstrated Capabilities and Results

The live demonstrations showcased impressive real-world functionality. In the first demo, when an alert triggered, an engineer simply asked "what's the issue with this service?" The agent automatically hit all necessary endpoints, checking Kubernetes events and New Relic logs, returning a comprehensive diagnosis with zero additional context needed. The engineer noted that while the agent gathered information, they could literally be making coffee rather than frantically opening browser tabs.

The second demo showed a PagerDuty alert for a cron job failure. Normally this would require authenticating to VPN, knowing which commands to run, switching contexts, and manually rerunning the job. Instead, the agent automatically investigated, identified the root cause, and asked "do you want me to rerun this job?" Upon receiving approval (a simple thumbs up), the agent executed the remediation. Critically, in both cases the engineer provided zero context—no service name, cluster name, cluster ID, or namespace. The agent figured out which service to investigate, in which cluster and namespace, and hit all the right data sources automatically.

The quantitative benefits are significant though the presentation focuses more on qualitative improvements. Response time for triage dropped from the multi-minute process of authentication, tool access, and manual investigation to 30-60 seconds for comprehensive root cause analysis. Operational efficiency improved by eliminating repetitive manual tasks, reducing toil and engineer burnout. The system provides consistency and reliability since machines perform repeated tasks more reliably than humans, especially at 3 AM. Knowledge preservation ensures that solutions to October incidents inform responses to similar November incidents, building institutional memory systematically rather than keeping it locked in individual engineers' heads.

## Deployment and Evolution Strategy

The team articulated a thoughtful maturity model for AI operations adoption that other organizations would be wise to follow. They advocate "crawl, walk, run" progression. In the crawl phase, agents handle read-only operations: incident response, data gathering, diagnostics. Organizations should watch agents work, fine-tune system prompts and tools, and build trust before advancing. In the walk phase, after establishing confidence, graduate to safe write operations handling high-toil, soul-crushing tasks like rerunning cron jobs. Only in the run phase, after proving reliability (not just hoping really hard), should organizations enable high-stakes actions like production rollbacks.

Their journey began with a different use case entirely—using agentic AI for AWS cost optimization across their 170 accounts, enabling anyone to query "what was the cost of this particular account in November?" via Slack and receive immediate reports. This proof-of-concept built confidence before pivoting to their biggest operational pain point: incident response and on-call management. The current implementation handles straightforward incidents (service restarts, pod failures, basic recovery tasks). Future phases involve expanding capabilities for complex multi-step remediation procedures and incorporating additional tools and services.

## Future Roadmap and Evaluation

The next major initiative is particularly noteworthy from an LLMOps perspective: building a comprehensive evaluation system where AI agents create known issues in test clusters (synthetic incidents with predetermined causes and fixes), then unleashing their SRE agent on these manufactured problems to verify it arrives at the expected diagnosis and remediation. They describe this as "a dojo for your SRE agent," representing mature thinking about testing and validation in production AI systems. This addresses a critical gap in many AI operations implementations—the lack of systematic evaluation infrastructure.

Additional planned expansions include incorporating more tools and services, particularly new Model Context Protocol (MCP) implementations from their vendors. This will enrich agent context with additional data sources like APM metrics, distributed tracing, and security posture information, enabling more comprehensive infrastructure views and informed decision-making for proactive incident management. The modular architecture with agent-as-tools patterns positions them well for these expansions without context window concerns.

## Critical Lessons and Balanced Assessment

The team shared three critical lessons that demonstrate mature understanding of production AI challenges. First, "context is everything"—the quality of agent outputs directly depends on input quality. As they noted, "slapping AI on top of your existing chaos doesn't magically fix it." Agents are only as good as what they're fed. Garbage context produces garbage responses. Asking an agent to debug production issues with only "well, it's broken" and a screenshot of a 500 error won't work. This represents hard-won wisdom about the limitations of AI that many vendors gloss over.

Second, organizations must build evaluation infrastructure from day one because "your agent needs CI/CD too." Prompts drift, models update, and patterns change monthly. Without proper testing, organizations are essentially "shipping to production based on 'oh well it worked on my computer.'" They advocate treating AI deployments with the same rigor as code deployments—you wouldn't deploy code without testing, so don't deploy AI without comprehensive evaluation. As they colorfully warned, build proper evaluation environments or "prepare to explain to your CTO why your agent suggested to delete database as a fix."

Third, the crawl-walk-run approach requires discipline. Organizations must build trust before handing over "keys to the kingdom" through systematic demonstration of reliability in progressively higher-stakes scenarios.

From a balanced perspective, this case study represents genuine production deployment at scale with real business value, not a proof-of-concept or marketing pitch. The technical details about context management, the agent-as-tools pattern, and integration challenges demonstrate deep engagement with real LLMOps problems. The emphasis on evaluation infrastructure and phased rollout shows operational maturity. However, the presentation is delivered at an AWS conference about AWS services using AWS Bedrock, so some healthy skepticism about vendor lock-in is warranted. The architecture is tightly coupled to AWS-specific services (Bedrock Agent Core, Bedrock Memory, Bedrock Knowledge Bases), which may limit portability.

The claims about 30-60 second response times are impressive but the presentation doesn't detail failure modes, accuracy rates, or false positive/negative rates. What happens when the agent gets it wrong? How often does it require human correction? What guardrails prevent catastrophic automated actions? The future plans for evaluation infrastructure suggest these questions are recognized but not yet fully addressed. The knowledge that they're still in the "crawl to walk" phase for many capabilities indicates this is an ongoing journey rather than a completed transformation.

The cost implications of this architecture also aren't discussed. Running multiple specialized agents with separate context windows, maintaining knowledge bases, and storing conversational memory in Bedrock presumably incurs significant costs at iHeart's scale. Organizations considering similar implementations should carefully model these costs against the benefits of reduced incident response time and engineer toil.

Overall, this represents one of the more technically sophisticated and honestly presented LLMOps case studies for incident response automation, with valuable lessons about context management, architectural patterns, and evaluation practices that apply well beyond this specific use case. The emphasis on starting with safe, low-risk use cases, building trust systematically, and developing evaluation infrastructure before expanding to higher-stakes automation provides a replicable playbook for other organizations pursuing AI-driven operations.