---
title: "Journey Towards Autonomous Network Operations with AI/ML and Dark NOC"
slug: "journey-towards-autonomous-network-operations-with-ai-ml-and-dark-noc"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "681355c95586a294aed61495"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:06:47.426Z"
  createdOn: "2025-05-01T11:06:49.920Z"
llmopsTags:
  - "internet-of-things"
  - "regulatory-compliance"
  - "realtime-application"
  - "semantic-search"
  - "model-optimization"
  - "error-handling"
  - "latency-optimization"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "microservices"
  - "scaling"
  - "devops"
  - "orchestration"
  - "reliability"
  - "scalability"
  - "amazon-aws"
industryTags: "telecommunications"
company: "BT"
summary: "BT is undertaking a major transformation of their network operations, moving from traditional telecom engineering to a software-driven approach with the goal of creating an autonomous \"Dark NOC\" (Network Operations Center). The initiative focuses on handling massive amounts of network data, implementing AI/ML for automated analysis and decision-making, and consolidating numerous specialized tools into a comprehensive intelligent system. The project involves significant organizational change, including upskilling teams and partnering with AWS to build data foundations and AI capabilities for predictive maintenance and autonomous network management."
link: "https://www.youtube.com/watch?v=3ywSa9OeuN8"
seo:
  title: "BT: Journey Towards Autonomous Network Operations with AI/ML and Dark NOC - ZenML LLMOps Database"
  description: "BT is undertaking a major transformation of their network operations, moving from traditional telecom engineering to a software-driven approach with the goal of creating an autonomous \"Dark NOC\" (Network Operations Center). The initiative focuses on handling massive amounts of network data, implementing AI/ML for automated analysis and decision-making, and consolidating numerous specialized tools into a comprehensive intelligent system. The project involves significant organizational change, including upskilling teams and partnering with AWS to build data foundations and AI capabilities for predictive maintenance and autonomous network management."
  canonical: "https://www.zenml.io/llmops-database/journey-towards-autonomous-network-operations-with-ai-ml-and-dark-noc"
  ogTitle: "BT: Journey Towards Autonomous Network Operations with AI/ML and Dark NOC - ZenML LLMOps Database"
  ogDescription: "BT is undertaking a major transformation of their network operations, moving from traditional telecom engineering to a software-driven approach with the goal of creating an autonomous \"Dark NOC\" (Network Operations Center). The initiative focuses on handling massive amounts of network data, implementing AI/ML for automated analysis and decision-making, and consolidating numerous specialized tools into a comprehensive intelligent system. The project involves significant organizational change, including upskilling teams and partnering with AWS to build data foundations and AI capabilities for predictive maintenance and autonomous network management."
---

## Overview

This case study presents a conversation between Ajay Ravindranathan, a Principal Solutions Architect at AWS's Telecom Industries Business Unit, and Reza Rahnama, the Managing Director of Mobile Networks at British Telecom (BT). The discussion centers on BT's ambitious vision called "DarkKnock" — a journey toward autonomous network operations where the network can self-heal and self-optimize with minimal human intervention.

BT operates one of the largest mobile networks in the UK, encompassing thousands of radio sites, thousands of gateways, a massive IP network, and distributed core and IMS (IP Multimedia Subsystem) networks. The organization faces the classic telecommunications challenge: despite technological evolution from 2G through 5G, operational practices have remained largely unchanged. The same functional teams that managed HLR (Home Location Register) in 2G days now manage HSS (Home Subscriber Server) in 5G, with similar manual processes and siloed expertise.

## The Problem Space

The core challenge BT faces is multi-dimensional. First, the network generates enormous amounts of data — described as "petabytes and petabytes" — flowing from various element managers into network management services. Currently, this data is monitored using basic SNMP protocols and analyzed through syslog reviews by siloed teams with specialized expertise. This approach is neither scalable nor efficient for modern network operations.

Second, BT operates with "hundreds and hundreds of tools that are very bespoke for a function." Each module or function in the network has its own dedicated monitoring tools, creating fragmentation and preventing holistic network intelligence. The lack of integration means that when issues occur, it's extremely difficult to correlate events across different network domains to understand root causes.

Third, there's a significant organizational and skills gap. The team needs to transform from a traditional network engineering organization into what Rahnama describes as "a software team that runs the mobile network." This requires upskilling personnel to understand both the domain expertise (radio, core, transmission, IMS, devices) and new technology paradigms around data engineering, ML, and AI.

## The Solution Approach and AI/ML Strategy

BT's approach with AWS follows a phased methodology that prioritizes foundational work before advanced AI implementation. This is a notably pragmatic approach that contrasts with many organizations that rush to implement AI without proper data foundations.

### Phase 1: Data Foundation

The first and most critical phase involves "fixing the data." This means taking the raw data output from the network, cleaning it, and creating "a sensible data architecture." As Rahnama emphasizes, this work happens "way before we predict anything" — a crucial acknowledgment that AI and ML are only as good as the data they're trained on.

AWS is helping BT create what they call a "network graph" or "knowledge graph" — essentially a unified topology that represents the relationships between different network elements. This involves:

- Data discovery and topology creation across disparate systems
- Breaking down silos between systems that currently have inaccessible data
- Creating "data products" with proper governance across the organization
- Establishing data as a shared asset rather than replicating data across organizational units

### Phase 2: The AI Continuum and Agentic Framework

The AWS representative introduces an important concept: the "AI continuum." This recognizes that different types of AI models serve different purposes, and production systems need to orchestrate multiple approaches. The framework includes:

- Traditional ML models for specific prediction and classification tasks
- Generative AI models for more complex reasoning and analysis
- An "agentic AI framework" that coordinates these different models together

The philosophy articulated is to "use the right tool for the right job" — acknowledging that some problems are better solved with traditional ML while others benefit from generative AI capabilities. This is a mature LLMOps perspective that avoids the trap of treating Gen AI as a universal solution.

### Target Use Cases

The discussion outlines several specific applications for the AI system:

**Automated Data Analysis**: Currently, humans spend significant time "looking at huge amount of data and trying to figure out what's wrong with the network." The goal is to automate this analysis, having the system identify problems and potentially make decisions autonomously.

**Root Cause Analysis**: When network events occur, determining the underlying cause is currently extremely difficult given the network's complexity. AI can help correlate events across network domains to pinpoint issues faster.

**Service Impact Analysis**: Understanding how network issues affect customer services and applications.

**Anomaly Detection**: Particularly important for both operational stability and cybersecurity. The example given involves detecting if "a container just got access through something that maybe a basic RBACs could stop it."

**Predictive Maintenance**: The "holy grail" according to Rahnama — predicting failures before they occur and preventing them. This is explicitly tied to continuous service availability.

**Network Optimization**: Using predictive analysis to optimize the radio network performance.

**Application-Aware Networking**: An advanced vision where "the network adjusts itself for the applications that you use" — essentially dynamic network behavior based on workload requirements.

## Infrastructure and Technology Context

Several technical aspects of BT's infrastructure are relevant to the LLMOps context:

**Containerized Core Network**: BT has moved to a "huge containerized network" which enables capabilities like moving traffic from faulty nodes to working nodes. This modern infrastructure is more amenable to automated management and provides better observability for AI systems.

**AWS Partnership**: The cloud partnership provides both the data platform capabilities and AI/ML services. AWS is specifically mentioned as providing services around network graph, topology, discovery, and analytics.

**Consolidation Strategy**: Rather than building AI capabilities for each existing tool, the vision is to create "a bigger network monitoring system" that consolidates hundreds of tools into unified intelligence.

## Organizational Transformation

A critical but often overlooked aspect of LLMOps is the organizational change required. BT's approach explicitly addresses this:

**Skills Development**: The team needs to understand "how all these new technology works" — specifically combining domain expertise (radio engineering, core engineering) with data and software skills.

**Process Automation**: Before applying AI, basic processes need to be cleaned and automated. Some decisions can be made with "very basic wall-do statements" once processes are well-defined.

**Human-Machine Division**: The vision clarifies that machines handle immediate decisions "to keep the network going" while humans "go figure out why it failed, was it a design issue or not." This is a thoughtful approach to human-AI collaboration.

## Balanced Assessment

It's important to note that this case study represents a vision and early-stage work rather than a deployed production system. Several honest acknowledgments in the discussion deserve attention:

- The work is described as building "foundations" with actual AI implementation still ahead
- DarkKnock is explicitly called "a vision" that represents "continuous improvement" rather than a destination
- The two-year roadmap focuses primarily on data foundation and upskilling, with AI utilization as a later phase
- The speakers acknowledge this is "a huge task" and "a huge journey"

The partnership with AWS positions this as a vendor-customer relationship where AWS is promoting its services, so the positive framing should be considered in that context. However, the phased approach and emphasis on data foundations before AI implementation reflects industry best practices.

## Key LLMOps Lessons

Several themes from this case study are relevant for LLMOps practitioners:

The importance of data quality and accessibility cannot be overstated — even the most sophisticated Gen AI systems require clean, governed, accessible data. The concept of the "AI continuum" recognizes that production AI systems often need multiple model types working together, not just LLMs. The agentic framework approach suggests orchestrating different AI capabilities rather than relying on single models. Human-in-the-loop design remains crucial even in "autonomous" visions — the goal is augmentation, not complete replacement. Finally, organizational transformation (skills, processes, culture) is just as important as technology choices for successful AI deployment at scale.