---
title: "AI Agent System for Automated Design System Documentation"
slug: "ai-agent-system-for-automated-design-system-documentation"
draft: false
llmopsTags:
  - "document-processing"
  - "code-generation"
  - "structured-output"
  - "prompt-engineering"
  - "mcp"
  - "agent-based"
  - "multi-agent-systems"
  - "open-source"
  - "documentation"
  - "security"
  - "anthropic"
industryTags: "tech"
company: "Uber"
summary: "Uber's design systems team faced the challenge of maintaining accurate, comprehensive component specifications for hundreds of design system components across seven implementation stacks—a process that traditionally took weeks of manual work per component. They built uSpec, an agentic system that connects AI agents in Cursor to Figma via the open-source Figma Console MCP (Model Context Protocol), enabling the automatic generation of complete component specifications including anatomy, API documentation, properties, color annotations, structure details, and multi-platform accessibility specs. The system runs entirely locally to meet enterprise security requirements, generates complete specs in minutes instead of weeks, and has transformed a months-long documentation process into one that takes days while maintaining consistency and accuracy across the entire design system."
link: "https://www.uber.com/us/en/blog/automate-design-specs/"
year: 2026
seo:
  title: "Uber: AI Agent System for Automated Design System Documentation - ZenML LLMOps Database"
  description: "Uber's design systems team faced the challenge of maintaining accurate, comprehensive component specifications for hundreds of design system components across seven implementation stacks—a process that traditionally took weeks of manual work per component. They built uSpec, an agentic system that connects AI agents in Cursor to Figma via the open-source Figma Console MCP (Model Context Protocol), enabling the automatic generation of complete component specifications including anatomy, API documentation, properties, color annotations, structure details, and multi-platform accessibility specs. The system runs entirely locally to meet enterprise security requirements, generates complete specs in minutes instead of weeks, and has transformed a months-long documentation process into one that takes days while maintaining consistency and accuracy across the entire design system."
  canonical: "https://www.zenml.io/llmops-database/ai-agent-system-for-automated-design-system-documentation"
  ogTitle: "Uber: AI Agent System for Automated Design System Documentation - ZenML LLMOps Database"
  ogDescription: "Uber's design systems team faced the challenge of maintaining accurate, comprehensive component specifications for hundreds of design system components across seven implementation stacks—a process that traditionally took weeks of manual work per component. They built uSpec, an agentic system that connects AI agents in Cursor to Figma via the open-source Figma Console MCP (Model Context Protocol), enabling the automatic generation of complete component specifications including anatomy, API documentation, properties, color annotations, structure details, and multi-platform accessibility specs. The system runs entirely locally to meet enterprise security requirements, generates complete specs in minutes instead of weeks, and has transformed a months-long documentation process into one that takes days while maintaining consistency and accuracy across the entire design system."
notion:
  pageId: "34ef8dff-2538-8117-9091-ebc15fd6f770"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:51:00.000Z"
  lastEditedTime: "2026-04-26T09:51:00.000Z"
  publishedAt: "2026-04-26T13:10:55Z"
---

## Overview

Uber's design systems team developed uSpec, an agentic AI system that automates the generation of comprehensive design component specifications. The Uber Base design system serves thousands of engineers, and the team was facing a critical documentation bottleneck: every component needed detailed, accurate specifications covering anatomy, API properties, accessibility requirements, and implementation details across seven different technology stacks (UIKit, SwiftUI, Android XML, Android Compose, Web React, Go, and SDUI). Manual documentation was slow, inconsistent, and quickly fell out of sync with the actual components, leading to engineering teams building from assumptions rather than accurate definitions.

The solution represents a sophisticated application of LLMs in production through an agentic architecture that combines AI judgment with programmatic precision. The system generates complete component specifications in minutes that previously required weeks of manual work, while maintaining enterprise-grade security by running entirely locally without sending proprietary design data to external APIs.

## Technical Architecture and LLMOps Implementation

The uSpec system demonstrates several important LLMOps patterns and practices. At its core, the architecture separates concerns between AI-driven interpretation and programmatic execution. The system uses Cursor IDE as the development environment where AI agents operate, connecting to Figma Desktop through the open-source Figma Console MCP (Model Context Protocol). This MCP serves as a critical infrastructure layer that provides the agent with both read and write access to Figma files through a local WebSocket connection.

The agent-based architecture is particularly notable from an LLMOps perspective. Rather than building a single monolithic AI system, Uber developed specialized agent skills, each focused on generating a specific section of component documentation. These skills include anatomy generation (numbered markers with attribute tables), API documentation (properties, values, defaults), properties specification (variant axes and boolean toggles), color annotation (token mapping across states), structure documentation (dimensions and spacing), and screen reader accessibility specs (covering VoiceOver, TalkBack, and ARIA in a single pass). This modular approach allows for easier maintenance, testing, and iteration on individual capabilities.

## Domain Knowledge Encoding and Prompt Engineering

A critical aspect of the LLMOps implementation is how domain knowledge is encoded into the system. Each agent skill loads its own instruction file containing validation rules, structured schemas, and reference documentation. This approach addresses one of the fundamental challenges in deploying LLMs for specialized tasks: ensuring that the model has access to accurate, current information about domain-specific APIs and standards. For example, the screen reader skill loads platform-specific accessibility property references covering hundreds of properties across VoiceOver modifiers and traits, TalkBack semantics, and ARIA roles and states. The agent doesn't generate property names from general training knowledge—it selects from documented APIs provided as context.

This represents a sophisticated approach to prompt engineering and context management. Rather than relying solely on the base model's training data or asking the model to hallucinate technical specifications, the system provides precise reference materials and structured schemas that guide the agent's output. This hybrid approach combines the LLM's ability to understand structure, make contextual decisions, and generate natural language with the precision of programmatic constraints and validated reference data.

## Data Extraction and Component Understanding

The system leverages the Figma Console MCP to extract rich, structured data from Figma design files. This goes beyond simple screenshot analysis or basic file parsing. The agent can crawl the component tree, identify sub-component structures and slot-based compositions, detect when designers have used variables instead of variants, extract design token values, access variable modes, read component properties, and understand parent-child relationships between layers. This deep integration allows the agent to build a comprehensive mental model of each component's structure and behavior.

The MCP connection enables the agent to work with actual design system data rather than approximations. Token names, variant axes, variable modes, and component properties come directly from the Figma file, ensuring accuracy and eliminating transcription errors. Different spec sections require different types of data—color annotations rely heavily on token values while screen reader specs depend more on component structure and visual analysis—and the modular skill architecture allows each to specify precisely what data it needs.

## Output Generation and Quality Control

The output generation process demonstrates a sophisticated balance between AI flexibility and programmatic precision. Once the agent has analyzed the component and compiled the necessary information, it imports the appropriate documentation template from the design system library, detaches it, and populates it by filling text fields, cloning sections, building tables, and placing annotation markers. This happens through the MCP connection, rendering the result directly in the Figma file without intermediate steps or manual formatting.

The case study emphasizes that the system uses "AI judgment where interpretation matters—classifying accessibility semantics, selecting the right token mappings, deciding how to structure a spec—and programmatic scripts where precision matters." This division of labor is an important LLMOps pattern: using AI for tasks that require understanding, context, and decision-making, while relying on deterministic code for tasks that require exact precision and repeatability. The structured schemas and templates enforce consistency across all generated specs, regardless of which team member initiates the generation process.

## Enterprise Security and Local Deployment

One of the most critical LLMOps considerations for Uber was security. The entire pipeline runs locally to ensure that no proprietary design data leaves the company's network. The Figma Console MCP connects to Figma Desktop over a local WebSocket, the AI agent runs in Cursor on the user's machine, and rendering happens directly in Figma through the same local connection. No cloud APIs are involved in the core workflow, and no design data is transmitted to external services.

This local-first architecture addresses a fundamental concern many enterprises have with AI deployment: data privacy and intellectual property protection. The case study explicitly states that this security model "is what makes AI-assisted documentation possible in the first place" at Uber. This represents an important pattern for LLMOps in regulated or security-conscious environments—leveraging local models or local execution environments rather than relying entirely on cloud-based API services.

## Production Workflow and User Experience

The production workflow is deliberately streamlined to two steps: sharing a Figma component link with context, and letting the agent read the file and render the spec. Users open Cursor, reference an agent skill with their Figma component link, and add contextual information about states, variants, or platform-specific behavior that the agent cannot infer from the design alone. The agent then executes the full pipeline autonomously.

This simple interface masks considerable complexity in the underlying system. The case study notes that a full screen reader spec covering three platforms generates in under two minutes, transforming a process that previously required hours of manual cross-referencing between platform documentation and the design file. The speed improvement is dramatic, but equally important is the consistency—every spec follows the same structure because structured schemas and templates enforce it rather than relying on individual authors' judgment.

## Scale and Impact

The impact at Uber's scale is significant. The design system contains hundreds of components, each requiring comprehensive documentation across seven implementation stacks. The manual approach was described as a "dedicated workstream that still struggles to keep pace," with documentation inevitably drifting out of date as components evolved. The case study states that "a system with hundreds of components that previously required months of spec-writing can generate complete specs in days."

Beyond raw speed, the system addresses several quality issues inherent in manual documentation. Accuracy improves because the agent reads real token names and variant values directly from Figma, eliminating transcription errors. Consistency improves because every spec follows the same template and structure. Maintainability improves because changelogs can update directly in Figma via MCP with a single prompt. The multi-platform capability is particularly valuable, with one prompt generating iOS, Android, and Web accessibility specs in a single pass.

## Open Source Foundation and Tooling Ecosystem

The case study emphasizes the importance of open-source infrastructure, specifically the Figma Console MCP built by Southleft. This represents an interesting aspect of the LLMOps ecosystem—the emergence of specialized infrastructure tools that enable AI agents to interact with existing enterprise software systems. The Model Context Protocol appears to be a pattern for creating secure, local bridges between AI systems and existing tools, expanding the range of tasks that can be automated with agentic systems.

Uber's decision to open-source uSpec itself and document the process publicly reflects a belief that the documentation bottleneck is not unique to their organization. The case study notes that after presenting their manual framework for creating detailed specs, "designers and design systems leads from across the industry reached out asking how to replicate the process." By sharing both the methodology and the implementation, Uber is contributing to a broader ecosystem of LLMOps practices for design systems work.

## Critical Assessment and Limitations

While the case study presents impressive results, it's important to note some limitations and areas where claims should be evaluated carefully. The system is presented as generating specs "in minutes instead of weeks," but this comparison may not account for the upfront investment in building the agent skills, creating structured schemas, maintaining reference documentation, and designing the templates that the system uses. The ongoing maintenance burden of keeping instruction files and reference documentation current as platform APIs evolve is not discussed in detail.

The case study also doesn't provide specific metrics on accuracy rates or discuss what percentage of generated specs require manual review or correction. While the system is described as reading "real data" and eliminating "transcription errors," there's no discussion of validation processes or quality assurance procedures to ensure that the agent's interpretations and classifications are correct. For complex decisions like "classifying accessibility semantics" or "selecting the right token mappings," human oversight may still be necessary.

The claim that the system works "at Uber's scale" is supported by the description of the problem, but the case study doesn't provide detailed information about deployment across teams, adoption rates, or user feedback from the broader design systems community at Uber. The system appears to be operational, but the maturity level and extent of production usage beyond the design systems team isn't entirely clear.

## Future Directions and Evolution

The case study mentions several areas for future development, including drift detection (presumably to identify when design files have changed and specs need updating), code-to-spec generation (generating specifications from implementation code rather than design files), and new spec types. These directions suggest the team views this as an evolving platform rather than a finished product.

The broader observation about "design moving closer to code" and designers "submitting pull requests, fixing issues directly in code" positions this work within a larger trend toward increased technical capabilities in design roles. The automation of specification generation may accelerate this trend by freeing designers from documentation work and allowing them to focus on higher-level problems.

## LLMOps Patterns and Lessons

Several LLMOps patterns emerge from this case study that are applicable beyond design system documentation. The modular agent skill architecture allows different capabilities to be developed, tested, and maintained independently. The combination of AI judgment with programmatic precision leverages the strengths of both approaches while mitigating their weaknesses. The local-first security model demonstrates that sophisticated AI workflows can be implemented without sacrificing data privacy. The emphasis on structured schemas, reference documentation, and templates as guardrails for AI output shows how to constrain model behavior for enterprise requirements.

The integration of AI agents with existing tools through protocols like MCP represents an important infrastructure pattern. Rather than building standalone AI applications, this approach embeds AI capabilities into existing workflows and tools, potentially increasing adoption and reducing friction. The dependency on open-source infrastructure also highlights how the LLMOps ecosystem is developing through community collaboration rather than purely proprietary solutions.

Overall, this case study presents a sophisticated implementation of agentic AI in production for a specific enterprise use case. The system addresses real pain points at scale, implements important security and quality controls, and demonstrates thoughtful architectural decisions that balance flexibility with precision. While some claims about speed and accuracy would benefit from more detailed validation metrics, the fundamental approach represents a valuable contribution to LLMOps practices for design systems and technical documentation workflows.
