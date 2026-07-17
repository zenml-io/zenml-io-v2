---
title: "Multi-Agent Collaboration for Space Mission Planning Using Agent-to-Agent Protocol"
slug: "multi-agent-collaboration-for-space-mission-planning-using-agent-to-agent-protocol"
draft: false
llmopsTags:
  - "poc"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "a2a"
  - "open-source"
  - "documentation"
industryTags: "tech"
company: "Wix"
summary: "Wix conducted an experimental demonstration of autonomous multi-agent AI systems collaborating to solve complex space mission planning problems without human intervention. The system deployed three specialized AI agents—a mission coordinator, an astrophysicist agent, and a logistics agent—each with distinct expertise and constraints, to plan missions to Mars and Jupiter. The agents used an Agent-to-Agent (A2A) protocol to discover each other, negotiate, and resolve conflicting requirements through dynamic conversation. When faced with an initially infeasible Jupiter mission due to excessive delta-v requirements, the agents autonomously negotiated and the trajectory agent discovered an optimized solution using gravitational slingshot maneuvers around Venus, reducing fuel requirements from 14.44 to 11.83 delta-v units—a solution not pre-programmed by the developers. This demonstrated how multi-agent architectures can solve open-ended problems through emergent collaboration rather than deterministic workflows."
link: "https://www.youtube.com/watch?v=JbhoQHr0mU8"
year: 2026
seo:
  title: "Wix: Multi-Agent Collaboration for Space Mission Planning Using Agent-to-Agent Protocol - ZenML LLMOps Database"
  description: "Wix conducted an experimental demonstration of autonomous multi-agent AI systems collaborating to solve complex space mission planning problems without human intervention. The system deployed three specialized AI agents—a mission coordinator, an astrophysicist agent, and a logistics agent—each with distinct expertise and constraints, to plan missions to Mars and Jupiter. The agents used an Agent-to-Agent (A2A) protocol to discover each other, negotiate, and resolve conflicting requirements through dynamic conversation. When faced with an initially infeasible Jupiter mission due to excessive delta-v requirements, the agents autonomously negotiated and the trajectory agent discovered an optimized solution using gravitational slingshot maneuvers around Venus, reducing fuel requirements from 14.44 to 11.83 delta-v units—a solution not pre-programmed by the developers. This demonstrated how multi-agent architectures can solve open-ended problems through emergent collaboration rather than deterministic workflows."
  canonical: "https://www.zenml.io/llmops-database/multi-agent-collaboration-for-space-mission-planning-using-agent-to-agent-protocol"
  ogTitle: "Wix: Multi-Agent Collaboration for Space Mission Planning Using Agent-to-Agent Protocol - ZenML LLMOps Database"
  ogDescription: "Wix conducted an experimental demonstration of autonomous multi-agent AI systems collaborating to solve complex space mission planning problems without human intervention. The system deployed three specialized AI agents—a mission coordinator, an astrophysicist agent, and a logistics agent—each with distinct expertise and constraints, to plan missions to Mars and Jupiter. The agents used an Agent-to-Agent (A2A) protocol to discover each other, negotiate, and resolve conflicting requirements through dynamic conversation. When faced with an initially infeasible Jupiter mission due to excessive delta-v requirements, the agents autonomously negotiated and the trajectory agent discovered an optimized solution using gravitational slingshot maneuvers around Venus, reducing fuel requirements from 14.44 to 11.83 delta-v units—a solution not pre-programmed by the developers. This demonstrated how multi-agent architectures can solve open-ended problems through emergent collaboration rather than deterministic workflows."
notion:
  pageId: "387f8dff-2538-808e-8ce5-cad2e1f299a7"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-22T14:41:00.000Z"
  lastEditedTime: "2026-06-22T14:41:00.000Z"
  publishedAt: "2026-06-29T15:48:48Z"
---

## Overview

This case study represents an experimental exploration by Wix's AI Core Architecture team into autonomous multi-agent collaboration for solving complex optimization problems. Dror Artzi, Chief Architect for AI at Wix, presented this work as a demonstration of how AI agents can work together without human intervention to tackle problems that would be intractable for a single agent or traditional deterministic software. The experiment centered on space mission planning—specifically calculating trajectories and resource requirements for missions to Mars and Jupiter—chosen deliberately as a brutally complex optimization problem representing the pinnacle of human technological achievement.

The fundamental premise of the experiment was to test whether AI agents could collaborate, argue, negotiate, and make compromises to solve problems that none could solve independently, all without any human in the loop. This represents a significant departure from traditional software development approaches and even from many current LLM applications that follow predetermined workflows.

## The Problem Domain: Space Mission Planning

The case study uses space mission planning as its challenge domain because it involves multiple competing constraints and specialized knowledge domains. Space navigation relies on Newtonian mechanics and orbital trajectories rather than straight-line paths. The Hohmann transfer method—the most energy-efficient way to travel between planetary orbits—requires two fuel burns: one to expand the orbit from the departure planet and another to circularize at the destination planet's orbit. The complexity arises from several factors:

- Delta-v budget constraints: Every maneuver costs fuel, and fuel is a finite resource that competes with life support, scientific equipment, and other mission requirements
- Launch windows: Planets align optimally for transfer only at specific intervals (Earth and Mars align every 26 months)
- Multiple gravitational influences from various celestial bodies throughout the journey
- Trade-offs between mission objectives, crew size, payload mass, fuel requirements, and timeline constraints

Each of these factors represents a different concern or constraint that must be balanced against the others, making it an ideal test case for multi-agent negotiation and optimization.

## Agent Architecture and Design

The system consists of three specialized agents, each representing a distinct domain of expertise:

**Agent 1: Mission Coordinator** - Written in Python, this agent serves as the team captain responsible for mission constraints. It knows the overall mission objectives, crew requirements, payload specifications, and maximum allowable parameters. It coordinates the other agents but doesn't solve technical problems directly.

**Agent 2: Trajectory Agent (Astrophysicist)** - This agent is responsible for orbital mechanics, knows how to calculate Hohmann transfers, understands delta-v requirements, can identify launch windows, and can perform trajectory optimizations. It has knowledge of historical space missions and various optimization techniques in astrodynamics.

**Agent 3: Resource Agent (Logistics)** - This agent handles logistics and resource management, including fuel calculations, life support requirements per astronaut, rocket capacity constraints, payload mass budgets, and equipment needs. It performs feasibility analysis and optimization to maximize mission capability within physical constraints.

## The Agent-to-Agent (A2A) Protocol

The core technical innovation demonstrated in this experiment is the Agent-to-Agent protocol, which enables dynamic collaboration patterns that mirror human organizational structures. The A2A protocol provides several key capabilities:

**Agent Discovery**: When agents enter the collaborative space, they automatically discover each other and broadcast their capabilities, skills, and expertise. Each agent publishes what it knows how to do, similar to how humans introduce themselves in a meeting. For example, the trajectory agent publishes that it can calculate delta-v requirements, optimize trajectories, and determine launch windows.

**Open-Ended Communication**: Agents communicate in natural language through questions and answers rather than through rigid tool calls or predetermined workflows. This allows for flexible, context-appropriate dialogue that can adapt to unexpected situations.

**Selective Engagement**: Only agents whose concerns conflict actually engage in detailed negotiation. This prevents unnecessary context pollution and optimizes token usage. If the trajectory agent and resource agent have conflicting requirements, they negotiate directly without involving the coordinator unless needed.

**Dynamic Workflow Generation**: The conversation flow is not predetermined. Agents decide autonomously how to proceed based on the evolving situation, allowing them to solve problems the developer never explicitly coded for.

This approach represents a fundamental shift from deterministic software development. Rather than following a predetermined "train track" of code, agents exercise judgment and collaborate dynamically within their domains of expertise.

## Demonstration 1: Mars Mission (Straightforward Case)

The first demonstration involved planning a mission to Mars with a crew of four astronauts and two tons of payload. The prompt was deliberately simple, and the execution proved relatively straightforward. The coordinator agent passed the request to the trajectory agent, which calculated the required Hohmann transfer orbit. The trajectory agent computed a delta-v requirement of approximately 5.59 units, which the resource agent confirmed fell well within the rocket's capabilities.

Because all constraints were satisfied without conflict, no extended negotiation was necessary. The agents quickly produced a complete mission statement with trajectory visualization showing the elliptical transfer orbit from Earth to Mars. The visualization revealed the importance of launch windows: Mars was at a different position in its orbit when the mission launched versus when the spacecraft arrived at the rendezvous point, demonstrating that the trajectory must account for future planetary positions rather than current locations.

This case established the baseline functionality of the system and demonstrated that when constraints align favorably, the agents can efficiently produce solutions through straightforward collaboration.

## Demonstration 2: Jupiter Mission (Emergent Problem-Solving)

The second demonstration provided the most striking results. The speaker initially designed this test to observe how the system handles errors and failures, expecting the agents to return a meaningful error message when faced with an infeasible Jupiter mission using the same crew size and payload as the Mars mission.

Jupiter's greater distance requires significantly more fuel. The trajectory agent initially calculated a delta-v requirement of 14.44 units—well beyond the 11-unit maximum that the rocket could support according to the resource agent's constraints. In traditional deterministic software, this would have resulted in an error: "insufficient fuel, mission failed."

However, what happened instead was remarkable. The resource agent, recognizing the discrepancy, contacted the trajectory agent directly and requested an optimized trajectory with a delta-v budget of 11 units or less. The trajectory agent then performed autonomous optimization and discovered a solution that the human developer had not anticipated: it adjusted the launch window and incorporated a gravitational slingshot maneuver around Venus.

The optimized trajectory passed near Venus during the Hohmann transfer to Jupiter, using Venus's gravitational field to add velocity to the spacecraft without burning fuel. This gravitational assist—essentially getting "free" energy from Venus's gravity—reduced the total delta-v requirement from 14.44 to 11.83 units, making the mission feasible.

The speaker emphasized that this solution was completely emergent. The developer had not programmed the agents to consider gravitational slingshots. The trajectory agent knew about this technique from its training data (likely including historical missions like Cassini and Galileo that used similar maneuvers) and autonomously decided to apply it when faced with constraints that required optimization. The negotiation between the resource agent and trajectory agent, facilitated by the A2A protocol, enabled this creative problem-solving without human intervention.

## Technical Implementation and Architecture Principles

The speaker outlined several key principles for designing effective multi-agent systems:

**Separation of Concerns**: Following service-oriented architecture principles, agents should be divided by distinct concerns to maintain high cohesion and low coupling. An agent should not try to represent multiple conflicting concerns simultaneously, as this leads to suboptimal compromises. Just as microservices separate functionality, agents should separate expertise.

**Security and Data Boundaries**: Some agents may need exclusive access to restricted data sources or sensitive information. Rather than giving all agents broad access, designate specific agents as gatekeepers for sensitive resources, with auditing and monitoring. Other agents can request information through the authorized agent, creating a security perimeter.

**Context Limit Management**: This emerged as perhaps the most critical practical consideration. If an agent's knowledge base and prompts consume 30% or more of the model's context window, it becomes a strong signal that the agent should be subdivided. The speaker aimed for minimal token bloat, recognizing that context exhaustion leads to failures. In the demonstration, the trajectory agent potentially required the most extensive context because it needed to know physics, kinematics, orbital mechanics, quantum principles, and historical mission data. In a production system, this agent would likely be decomposed into multiple sub-agents.

**Model-Agnostic Design**: The architecture doesn't depend on increasingly sophisticated models. The future isn't about waiting for smarter individual models but about orchestrating smarter conversations between models. The agents can operate with current-generation LLMs because the intelligence emerges from their collaboration rather than individual capability.

## Framework Development at Wix

Following this experiment, Wix built an internal framework for developing agents that supports the demonstrated patterns. The framework provides:

- Automatic agent discovery mechanisms
- Communication through the A2A protocol
- Comprehensive logging and auditing of all agent interactions
- State management for debugging and analysis
- Development tools that make it easy to create, test, and deploy agent systems

The speaker positioned this framework as foundational to Wix's approach to AI development going forward, suggesting that agent development represents the future of the software engineering profession.

## Philosophical and Strategic Implications

The presentation made several broader arguments about the trajectory of software development:

**From Deterministic to Emergent Software**: Traditional software follows deterministic paths—if a condition isn't met, execution stops with an error. Agent-based systems can exhibit emergent problem-solving, finding solutions the developer never explicitly programmed. This represents a paradigm shift in how we think about software capability.

**Human Organizational Patterns in AI**: The multi-agent architecture mirrors how human organizations solve complex problems. NASA doesn't have one person who knows astrophysics, logistics, and mission management—these are separate departments that collaborate when their concerns intersect. The A2A protocol models these human collaboration patterns in AI systems.

**The Evolving Role of Developers**: The speaker drew an analogy to the Industrial Revolution. Just as humans moved from manually assembling products on assembly lines to designing the machines that do the assembly, software developers are transitioning from writing code directly to designing agent systems that generate and execute code. The emerging profession is "agent whisperer" or agent developer—someone who designs, prompts, and orchestrates AI agents rather than writing traditional code.

**Open-Ended Problem Solving**: The most valuable capability demonstrated is solving problems in open-ended domains that the developer didn't anticipate. Traditional software requires the developer to foresee every scenario and code for it. Agent systems with proper architecture can navigate unforeseen situations by applying their knowledge dynamically.

## Critical Assessment and Caveats

While the demonstration is impressive, several considerations warrant balanced assessment:

**Limited Production Evidence**: This is explicitly described as an experiment rather than a production system. The actual knowledge provided to each agent was minimal—just enough to solve the specific demonstrated problems. A real space mission planning system would require vastly more extensive knowledge bases, which would introduce significant challenges around context management, cost, and reliability.

**Computational Cost**: The demonstration doesn't discuss the computational expense of running three separate LLM instances with potentially extensive back-and-forth negotiation. Token costs and latency could be substantial, especially for more complex problems requiring extended negotiation.

**Reliability and Consistency**: LLMs can produce inconsistent results across runs. The demonstration doesn't address how the system ensures reliable, reproducible results or handles cases where agents fail to reach agreement or produce incorrect solutions.

**Verification and Validation**: While the gravitational slingshot solution is clever, the presentation doesn't discuss how to verify that agent-generated solutions are actually correct. Space mission planning requires rigorous validation—how would one ensure an agent-generated trajectory is safe and physically accurate?

**Scope of Emergent Behavior**: It's unclear how often emergent problem-solving occurs versus how often agents simply follow patterns from their training data. The Venus slingshot is impressive but may simply reflect the trajectory agent recalling similar historical missions rather than truly novel reasoning.

## Practical Takeaways for LLMOps

Several concrete lessons emerge for teams building production LLM systems:

**Context Management is Critical**: The 30% context usage threshold provides a practical heuristic for when to decompose agents. This is essential for maintaining performance and avoiding context window exhaustion.

**Design for Modularity**: Following separation of concerns principles from traditional software architecture remains valid and perhaps even more important in agent systems. Clear boundaries between agent responsibilities improve both performance and debuggability.

**Logging and Observability**: The speaker emphasizes that their framework includes comprehensive logging of all agent interactions and state management. This is essential for debugging non-deterministic systems where the exact execution path can't be predicted in advance.

**Token Optimization Through Selective Communication**: Having only relevant agents communicate about specific conflicts prevents token waste and keeps conversations focused. This architectural pattern could significantly reduce costs in production systems.

**Framework Development**: Building internal frameworks for agent development, rather than building each agent system from scratch, allows organizations to standardize patterns, implement security controls, and accumulate best practices.

## Connection to Broader AI Development Trends

This work connects to several current trends in AI systems:

**Multi-Agent Frameworks**: The A2A protocol shares conceptual similarities with emerging frameworks like AutoGen, CrewAI, and LangGraph, though the specific implementation details differ.

**Agentic AI**: The broader movement toward agentic AI systems that can plan, reason, and take actions aligns with this exploration of agent collaboration.

**Compositional AI Systems**: Rather than building monolithic AI systems, the trend toward composing multiple specialized models or agents reflects similar principles to those demonstrated here.

**Human-AI Collaboration Patterns**: While this demonstration excluded humans from the loop intentionally, the organizational patterns it implements could extend to hybrid human-AI teams.

## Future Directions and Open Questions

The presentation concludes by inviting the community to experiment with the open-source demonstration code and explore different agent configurations. Several interesting questions remain open:

- How do these patterns scale to more than three agents?
- What happens when agents genuinely cannot reach agreement on a solution?
- How can we ensure that emergent solutions are correct and safe?
- What are the cost-performance trade-offs compared to traditional approaches?
- How do we handle cases where the problem is genuinely unsolvable within constraints?

The speaker's vision positions agent development as the future of software engineering, suggesting that current developers will increasingly become orchestrators of AI systems rather than code writers. Whether this vision fully materializes remains to be seen, but the demonstrated capabilities suggest that multi-agent architectures represent a promising direction for building more flexible and capable AI systems that can handle complex, multi-constraint optimization problems autonomously.
