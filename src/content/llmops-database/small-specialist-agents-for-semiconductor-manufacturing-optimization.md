---
title: "Small Specialist Agents for Semiconductor Manufacturing Optimization"
slug: "small-specialist-agents-for-semiconductor-manufacturing-optimization"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67a31205593825749bbcd2dd"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:59:39.900Z"
  createdOn: "2025-02-05T07:23:49.888Z"
llmopsTags:
  - "high-stakes-application"
  - "regulatory-compliance"
  - "internet-of-things"
  - "multi-agent-systems"
  - "agent-based"
  - "model-optimization"
  - "documentation"
  - "security"
  - "compliance"
  - "microsoft-azure"
industryTags: "tech"
company: "Tokyo Electron"
summary: "Tokyo Electron is addressing complex semiconductor manufacturing challenges by implementing Small Specialist Agents (SSAs) powered by LLMs. These agents combine domain expertise with LLM capabilities to optimize manufacturing processes. The solution includes both public and private SSAs managed by a General Management Agent (GMA), with plans to utilize domain-specific smaller models to overcome computational and security challenges in production environments. The approach aims to replicate expert decision-making in semiconductor processing while maintaining scalability and data security."
link: "https://www.youtube.com/watch?v=gcJy0i20yzk"
year: 2023
seo:
  title: "Tokyo Electron: Small Specialist Agents for Semiconductor Manufacturing Optimization - ZenML LLMOps Database"
  description: "Tokyo Electron is addressing complex semiconductor manufacturing challenges by implementing Small Specialist Agents (SSAs) powered by LLMs. These agents combine domain expertise with LLM capabilities to optimize manufacturing processes. The solution includes both public and private SSAs managed by a General Management Agent (GMA), with plans to utilize domain-specific smaller models to overcome computational and security challenges in production environments. The approach aims to replicate expert decision-making in semiconductor processing while maintaining scalability and data security."
  canonical: "https://www.zenml.io/llmops-database/small-specialist-agents-for-semiconductor-manufacturing-optimization"
  ogTitle: "Tokyo Electron: Small Specialist Agents for Semiconductor Manufacturing Optimization - ZenML LLMOps Database"
  ogDescription: "Tokyo Electron is addressing complex semiconductor manufacturing challenges by implementing Small Specialist Agents (SSAs) powered by LLMs. These agents combine domain expertise with LLM capabilities to optimize manufacturing processes. The solution includes both public and private SSAs managed by a General Management Agent (GMA), with plans to utilize domain-specific smaller models to overcome computational and security challenges in production environments. The approach aims to replicate expert decision-making in semiconductor processing while maintaining scalability and data security."
---

## Overview

Tokyo Electron, headquartered in Tokyo with an AI and Digital Transformation Center in Sapporo, Japan, is one of the world's leading semiconductor manufacturing equipment companies. According to their presentation, almost all semiconductor chips in the world pass through their equipment at some point in the manufacturing process. The company joined the AI Alliance in May 2024 and is actively working on developing a semiconductor foundation model called "SemiCon" in collaboration with Automattic and FPT.

This case study presents Tokyo Electron's conceptual framework and early-stage development of a multi-agent LLM system designed to tackle the increasingly complex challenges in semiconductor manufacturing. It's important to note that this presentation describes ideas and proof-of-concept work rather than a fully deployed production system, so the claims should be viewed as aspirational goals rather than proven outcomes.

## The Problem: Semiconductor Manufacturing Complexity

The semiconductor manufacturing industry faces escalating technical challenges driven by several factors:

- Manufacturing a semiconductor chip requires anywhere from 100 to 1,000+ individual processes
- Each process requires specialized equipment and manufacturing techniques
- Miniaturization, high stacking, new structures, and new materials (in logic, NAND, DRAM, and CMOS image sensors) have dramatically increased complexity
- Investment amounts per unit of production have been steadily increasing, indicating rising technological difficulty
- Front-end processes (wafer processing) require repeated processing for complex 3D shapes

Currently, finding optimal processing conditions relies heavily on human experts who repeatedly conduct experiments based on their domain knowledge. This is time-consuming, expensive, and doesn't scale well as complexity increases.

## The Solution: Small Specialist Agents (SSA)

Tokyo Electron proposes using what they call "Small Specialist Agents" (SSA) to address these challenges. An SSA is described as software that effectively uses LLMs to solve complex problems through several key mechanisms:

### Technical Architecture

The SSA architecture incorporates several notable techniques:

**RAG Integration**: Each SSA uses Retrieval-Augmented Generation to query domain-specific data when formulating responses. This allows the agents to ground their outputs in actual experimental data, equipment specifications, and historical process information.

**OODA Loop Decision Framework**: The SSA implements the OODA (Observe, Orient, Decide, Act) decision-making loop at each step. For each phase, the SSA queries the LLM using relevant domain data and generates expert-like responses. This structured approach helps maintain coherent reasoning chains for complex multi-step problems.

**Hybrid ML Capabilities**: Beyond just language model queries, SSAs can build and use simple machine learning models for prediction tasks and execute external applications. This hybrid approach allows them to handle both qualitative reasoning and quantitative prediction tasks.

### Agent Orchestration: The GMA System

A key innovation in Tokyo Electron's approach is the concept of a General Management Agent (GMA) that orchestrates multiple specialized SSAs. The agents are categorized into two types:

**Public SSAs**: These are common knowledge agents shared across the organization, covering domains like physics, chemistry, mathematics, and machine learning fundamentals. These agents can be trained on publicly available scientific knowledge.

**Private SSAs**: These are confidential agents specific to the organization, containing proprietary information such as:
- Experiment history and results
- Equipment specifications and functionality
- Process-specific knowledge (etching, deposition, etc.)
- Documentation formatting standards

The GMA allows users to create workflows that involve multiple SSAs working together. The presenters describe this as simulating "human experts discussing or debating among themselves"—essentially a digital twin of human collaborative problem-solving. This multi-agent approach is particularly suited to semiconductor manufacturing because problems often span multiple domains of expertise (physics, chemistry, materials science, equipment engineering, etc.).

## Platform Development

Tokyo Electron is developing this system in collaboration with Automattic (the company behind WordPress) to create a flexible platform for operating SSAs. The platform is designed with four customizable elements:

- Agent technology selection
- Data import and fetching from various sources
- LLM selection based on application requirements
- Flexible application creation using agents

This modular approach is explicitly designed to meet the needs of industrial sector companies that need to operate AI systems in actual business operations with varying requirements across different use cases.

## Scalability Challenges and Small Domain-Specific Models

One of the most practically significant aspects of this presentation is the acknowledgment of scalability challenges. When SSA groups work on complex workflows, the number of LLM queries multiplies with the number of agents involved. With 18,000 employees at Tokyo Electron potentially using the system simultaneously, LLM access could become a major bottleneck.

Their solution is to develop small, domain-specific models rather than relying on large general-purpose LLMs. The first such model is "SemiCon," a semiconductor-focused foundation model. The benefits they cite for smaller domain-specific models include:

- **Internal Operation**: Models can run within the company's environment, removing usage limitations and external dependencies
- **Cost Efficiency**: Lower computational requirements reduce operational costs
- **Faster Response Times**: Reduced computational load leads to quicker responses, important for interactive use cases
- **Data Privacy**: Local operation prevents leakage of confidential information—critical in an industry where process parameters are highly proprietary
- **Continuous Updates**: Easier to update with daily generated data, allowing the model to stay current with new experimental findings
- **Fab-Level Deployment**: Small models could potentially run within individual manufacturing facilities (fabs)

The claim that domain-specific models can match or exceed large general-purpose models is notable but should be treated with appropriate skepticism until validated with benchmarks. This is a common assertion in the small language model space that often requires specific conditions to hold true.

## Application to Process Optimization

A concrete use case discussed is optimizing semiconductor manufacturing processes, with a current proof-of-concept focusing on etching processes (described as particularly challenging due to plasma physics complexity). The vision is for GMA workflow agents to:

- Integrate various data accumulated over years
- Provide insights similar to human experts
- Present not just predictions but also the rationale behind them
- Suggest next actions the user should take
- Support iterative experiments that progressively improve SSA performance
- Eventually enable "condition exploration without human intervention"—essentially autonomous process development

During the Q&A session, a question was raised about extending this to co-optimization of multiple processes (like deposition and etching together). The presenters indicated they are currently focused on single-process optimization (etching) but plan to extend to multi-process co-optimization after proving the concept.

## Organizational Considerations

An interesting aspect raised in the Q&A is how the GMA/SSA structure might reflect or model the actual collaborative work environment and organizational culture within Tokyo Electron. The presenters suggested they are considering using SSA simulations to test organizational approaches before implementing them with real human teams—a form of organizational modeling using AI agents.

## Assessment and Critical Notes

This case study represents early-stage development and conceptual exploration rather than a mature production deployment. Several aspects warrant careful consideration:

- The presentation is aspirational and describes ideas being developed rather than proven results
- No specific metrics or benchmarks are provided for SSA performance
- The claim about domain-specific models matching large general-purpose models needs validation
- The complexity of orchestrating multiple agents for real-world manufacturing optimization is significant
- Integration with existing manufacturing execution systems and equipment is not addressed in detail

However, the approach does address real challenges in semiconductor manufacturing, and the emphasis on practical concerns (scalability, data privacy, cost efficiency) suggests a thoughtful approach to production deployment. The collaboration with external partners (Automattic, FPT) and participation in the AI Alliance indicates Tokyo Electron is building an ecosystem approach rather than going it alone.

The focus on small, domain-specific models is particularly relevant for LLMOps in industrial settings where data privacy, response latency, and operational costs are significant concerns. This represents a departure from the "bigger is better" approach and aligns with emerging trends toward efficient, specialized models for enterprise applications.