---
title: "Building a Natural Language Agent Builder with Comprehensive LLMOps Practices"
slug: "building-a-natural-language-agent-builder-with-comprehensive-llmops-practices"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6928196ec2d29c6527293c49"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:29:40.171Z"
  createdOn: "2025-11-27T09:27:10.429Z"
llmopsTags:
  - "chatbot"
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "rag"
  - "agent-based"
  - "multi-agent-systems"
  - "error-handling"
  - "semantic-search"
  - "system-prompts"
  - "evals"
  - "monitoring"
  - "api-gateway"
  - "orchestration"
  - "documentation"
  - "langchain"
  - "fastapi"
industryTags: "tech"
company: "Vellum"
summary: "Vellum, a company that has spent three years building tools for production-grade agent development, launched a beta natural language agent builder that allows users to create agents through conversation rather than drag-and-drop interfaces or code. The speaker shares lessons learned from building this meta-level agent, focusing on tool design, testing strategies, execution monitoring, and user experience considerations. Key insights include the importance of carefully designing tool abstractions from first principles, balancing vibes-based testing with rigorous test suites, storing and analyzing all execution data to iterate on agent performance, and creating enhanced UI/UX by parsing agent outputs into interactive elements beyond simple text responses."
link: "https://www.youtube.com/watch?v=hIMvuMVLTy8"
year: 2025
seo:
  title: "Vellum: Building a Natural Language Agent Builder with Comprehensive LLMOps Practices - ZenML LLMOps Database"
  description: "Vellum, a company that has spent three years building tools for production-grade agent development, launched a beta natural language agent builder that allows users to create agents through conversation rather than drag-and-drop interfaces or code. The speaker shares lessons learned from building this meta-level agent, focusing on tool design, testing strategies, execution monitoring, and user experience considerations. Key insights include the importance of carefully designing tool abstractions from first principles, balancing vibes-based testing with rigorous test suites, storing and analyzing all execution data to iterate on agent performance, and creating enhanced UI/UX by parsing agent outputs into interactive elements beyond simple text responses."
  canonical: "https://www.zenml.io/llmops-database/building-a-natural-language-agent-builder-with-comprehensive-llmops-practices"
  ogTitle: "Vellum: Building a Natural Language Agent Builder with Comprehensive LLMOps Practices - ZenML LLMOps Database"
  ogDescription: "Vellum, a company that has spent three years building tools for production-grade agent development, launched a beta natural language agent builder that allows users to create agents through conversation rather than drag-and-drop interfaces or code. The speaker shares lessons learned from building this meta-level agent, focusing on tool design, testing strategies, execution monitoring, and user experience considerations. Key insights include the importance of carefully designing tool abstractions from first principles, balancing vibes-based testing with rigorous test suites, storing and analyzing all execution data to iterate on agent performance, and creating enhanced UI/UX by parsing agent outputs into interactive elements beyond simple text responses."
---

## Overview

Vellum presents a comprehensive case study on building a natural language agent builder, which represents a meta-level LLMOps challenge: using LLMs to build LLM-based agents. The speaker, Sid from Vellum, shares insights from three years of experience building production agent infrastructure, culminating in their beta launch of a conversational agent builder. This case study is particularly valuable because it demonstrates LLMOps principles applied recursively—the lessons learned from building an agent that builds agents provide insights applicable to production LLM systems more broadly.

The company's evolution is telling: they spent two and a half years building a drag-and-drop editor and robust SDK for agent development, only to pivot to a natural language interface. This shift reflects broader industry trends toward more accessible AI development tools, though the speaker's somewhat promotional tone ("drag and drop is dead") should be balanced against the reality that different interfaces serve different use cases and user sophistication levels.

## Core Problem and Solution Architecture

The fundamental challenge Vellum addressed was democratizing agent building. Rather than requiring users to learn frameworks, SDKs, or navigate complex visual editors, they built an agent that accepts natural language descriptions and generates working agents. This represents a significant LLMOps challenge because the system must handle ambiguous requirements, make design decisions, generate code or configurations, and produce deployable artifacts—all while maintaining reliability and quality standards expected in production environments.

The agent builder operates through a conversational interface where users describe their desired agent functionality. The system then produces one of several output formats: executable SDK code that can be integrated into user codebases, API endpoints that run on Vellum's servers, or standalone AI applications that can be published with one click. This multi-modal deployment strategy addresses different user needs and deployment contexts, which is an important consideration for production LLM systems.

## Tool Design Philosophy and Implementation

One of the most substantive technical insights from this case study centers on tool design for LLM agents. The speaker identifies tool-related issues as the primary source of agent failures, with symptoms including not calling tools when appropriate, calling wrong tools, calling tools with incorrect arguments, and making excessive tool calls. This pain point will resonate with anyone deploying production agents.

Vellum's approach emphasizes first-principles thinking about tool abstractions rather than blindly exposing underlying APIs. The key insight is that tools should represent high-level actions the agent should take, not low-level API endpoints. For example, if an agent typically makes three API calls in sequence, passing the output of one to the next, this should be abstracted into a single tool rather than three separate ones. This reduces cognitive load on the LLM and decreases error rates.

The reasoning here is economically sound from a computational perspective: investing human effort upfront to design clear, purpose-built tool abstractions means the agent doesn't have to figure out the right sequence of low-level operations on every execution. This trades one-time human design work for repeated inference-time computational savings and improved reliability. However, it's worth noting that this approach requires domain expertise and careful analysis—the "right" abstractions may not be obvious initially and may need iteration.

Specific tool design practices recommended include omitting and simplifying arguments where possible, grouping related API calls into coherent actions, providing descriptive error messages (specifying whether errors are timeouts requiring retry versus bad arguments that need correction), and ensuring tool names and descriptions are intuitive to humans (since models are trained on human data and exhibit similar confusion patterns). The recommendation to make similar tools more distinct or combine them with differentiating arguments reflects an understanding of how models handle ambiguous choices.

An interesting failure mode mentioned is tools that simply return "error" without context. The speaker rightfully points out that this gives the model no basis for recovery. Production LLM systems need error messages that support graceful degradation and self-correction, specifying error types and suggesting remediation paths when possible.

## Knowledge Management and Context Handling

Vellum's approach to managing the large corpus of documentation about their platform demonstrates practical thinking about context management. They have approximately 100,000 tokens of Vellum documentation covering agent building, SDK usage, and related topics. Rather than loading all of this into the system prompt (which would be slow and expensive) or implementing a complex retrieval system, they took a middle path that leverages the model's own capabilities.

Specifically, they created a knowledge base of about 30 documents and included small summaries of each—comparable to paper abstracts—in the system prompt. The agent can then call a "read knowledge base" tool to retrieve full content for entries relevant to the current task. This is essentially a lightweight RAG (Retrieval-Augmented Generation) approach, but with the model making explicit retrieval decisions rather than relying on automatic similarity-based retrieval.

This design has several advantages: it keeps the base prompt manageable, reduces costs compared to always including all documentation, gives the model agency in deciding what information it needs (which may lead to more relevant retrievals than automatic similarity search), and creates an observable trail of what information the agent consulted. The speaker notes the agent uses this throughout the building process, for example reading about specific node types when it needs to create them.

However, there are tradeoffs to consider. This approach assumes the summaries contain sufficient information for the model to make good retrieval decisions, which may not always hold. Automatic retrieval based on semantic similarity might surface relevant information the model wouldn't know to ask for. The optimal approach likely depends on characteristics of the document corpus and task structure.

## Testing Strategy and Philosophy

The case study presents a nuanced perspective on testing that acknowledges real-world tradeoffs rather than prescribing a one-size-fits-all approach. The speaker frames testing in terms of a fundamental tension: you can have two of "moving fast," "avoiding regressions," and "not writing many tests," but not all three. This framing is more honest than typical testing advice that assumes unlimited resources.

Importantly, the speaker explicitly gives permission to not write tests in certain contexts: if it's a single developer working on something without heavy iteration needs, or if occasional regressions are acceptable given the application domain (explicitly contrasting this with high-stakes domains like hospital systems). This pragmatism is refreshing and acknowledges that testing has costs that may not always be justified.

When testing is appropriate, Vellum distinguishes between "vibes-based" testing (manual, qualitative assessment) and rigorous test suites, arguing both have legitimate uses rather than positioning them as competing approaches. Vibes-based testing excels in early development when it's obvious whether something works at all, and for assessing subjective qualities like interaction feel and UX that are difficult to quantify. Rigorous test suites become valuable when pass rates are already high (distinguishing 85% from 88% is difficult by feel), for preventing regressions on established capabilities, and for practicing test-driven development (writing tests for desired behaviors before achieving them, then iterating until they pass).

The speaker mentions they experienced "two steps forward, one step back" issues before implementing a more rigorous test suite, with capabilities regressing as they made other improvements. This is a common pattern in complex LLM systems where changes to prompts or logic can have non-local effects. The solution—systematic testing with baseline preservation—is straightforward but requires discipline and infrastructure.

What's notably absent from this testing discussion is specific mention of evaluation metrics, automated scoring of outputs, or LLM-as-judge approaches. The binary framing of vibes versus test suites glosses over the spectrum of semi-automated evaluation approaches that have become common in LLMOps. This may reflect the particular challenges of evaluating agent builders, where outputs are complex artifacts (workflows, code) rather than text responses, making standard evaluation approaches less applicable.

## Execution Monitoring and Observability

The emphasis on examining actual executions reflects mature thinking about production LLM systems. The speaker likens reviewing executions to watching videos of yourself giving talks—uncomfortable but essential. The core message is that execution traces represent what users actually experience, making them invaluable for improvement.

The foundational principle stated is "store everything" because "storage is cheap" and "user data is invaluable." While token costs are meaningful, the data about how users interact with the system and how it responds is positioned as even more valuable. This reflects best practices in LLMOps where comprehensive logging and tracing enable both debugging and continuous improvement.

The case study shows a specific example of a poor execution from their agent builder involving import errors, type errors, and unclear communication to the user, with excessive thinking steps and tool calls. The speaker notes they extracted "20 takeaways" from reviewing this single execution and fixed the identified issues. This illustrates the high information density of execution traces when reviewed thoughtfully—a single failure can reveal multiple improvement opportunities.

The ability to "think like your agent" is positioned as crucial, with execution review being the primary method for developing this skill. This anthropomorphization is somewhat informal but points to a real skill: understanding the model's context, decision points, and failure modes by observing its behavior patterns. The speaker even jokes about humans being next-token predictors, suggesting that empathetic modeling of LLM cognition is achievable.

Vellum provides "full visibility and tracing" as part of their platform, which they use internally for developing the agent builder and offer to customers. This self-hosting of their own observability tools provides credibility—they're using the same infrastructure they're selling. The screenshot shown appears to display execution steps, tool calls, and outputs in a hierarchical or sequential format, though details are limited in the transcript.

## User Experience and Interface Design

An innovative aspect of this case study is the emphasis on agent-driven UX enhancement. The core insight is that "just because models output text doesn't mean that's all you can show to your user"—agents can elevate their own UI/UX by having their text outputs parsed into richer interface elements.

The example given shows thinking blocks and tool calls that are collapsed by default (giving "reasonable defaults but full visibility for users that want to dig deep"), status indicators for what's completed versus in progress, and interactive UI elements like a button to connect Slack that appears when the agent determines Slack integration is needed for the workflow being built. All of this is generated from structured text output from the agent, not hardcoded interface logic.

This "text in, UI out" paradigm is positioned as the future direction. It represents a middle ground between pure conversational interfaces (which may lack the structure and scannability users want) and traditional UIs (which lack flexibility and require extensive hardcoding). The approach requires careful design of output formats and parsing logic but can provide significantly better user experiences than raw text while maintaining the flexibility of LLM-generated content.

Specific UX principles mentioned include collapsing advanced information by default, creating interactive buttons rather than requiring typed commands for common actions, and generally optimizing for the expected user flow while allowing power users to access details. These principles are not LLM-specific but take on new dimensions when the system itself is generating the content that needs to be surfaced appropriately.

## Deployment and Integration Options

Vellum's multi-modal deployment strategy deserves attention as it addresses a key LLMOps challenge: different users and use cases require different deployment models. The three options provided are:

- **Executable SDK code**: Users can export code that they integrate into their own codebases, giving them full control, allowing customization, and keeping execution in their infrastructure. This appeals to engineering-centric organizations that want ownership and flexibility.

- **API endpoints**: The agent runs on Vellum's servers and users integrate via API calls. This is lower-friction for users without MLOps infrastructure, provides better reliability if Vellum maintains the infrastructure well, but creates vendor dependency.

- **One-click AI apps**: Complete standalone applications that can be published immediately. This is the lowest-friction option, suitable for non-technical users or rapid prototyping, but offers minimal customization.

This spectrum from maximum control to maximum convenience is thoughtfully designed. Different organizations at different stages with different technical capabilities can all find an appropriate deployment path. However, it's worth noting that this flexibility comes with engineering costs—Vellum must maintain three different export/deployment pipelines and ensure feature parity across them.

## Future Directions and Limitations

The speaker outlines several areas for future development that reveal both ambitions and current limitations. The desire for real-time updates showing the workflow as it's being modified addresses a current limitation: users must wait 30 seconds to 2 minutes for results without visibility into progress. This "black box" period likely creates anxiety and uncertainty for users. Showing incremental progress would improve perceived performance and allow early intervention if the agent is heading in the wrong direction.

The acknowledgment that mobile experience is poor (explicitly advising against using Vellum on phones) is notably honest for what's essentially a promotional talk. The recognition that mobile is important for the future reflects broader trends toward mobile-first AI tools, though the specific UX challenges of agent building on small screens are non-trivial.

The distinction between "foreground" versus "background" agents represents an interesting direction. Currently, the agent builder works on one change at a time with the user waiting for completion. Background agents would allow users to queue multiple changes and check back later, similar to how CI/CD pipelines operate. This would require sophisticated state management, conflict resolution, and notification systems but could dramatically improve productivity for complex projects.

## Meta-Lessons and Philosophy

Beyond specific technical practices, the speaker offers two high-level principles that reflect practical experience with agent development:

The first is "if you think something might work, just try it"—emphasizing rapid experimentation over theoretical analysis. The claim is that you can "hill climb your way to something successful" by trying anything that might improve the agent. While this reflects the reality that LLM system behavior is often difficult to predict, it's worth balancing this against the risks of unsystematic changes. Without proper versioning, testing, and measurement, rapid experimentation can lead to instability and loss of institutional knowledge about what works and why.

The second principle is to "step into the shoes of the LLM" by recognizing that models "don't think that differently from the way we think." The playful suggestion that humans might also be "just predicting the next token" and the advice to "prompt yourself" in high-pressure situations mixes humor with a genuine insight: anthropomorphizing models (thoughtfully) can build intuition about their behavior. The recommendation to try stating "what we usually do in this situation is..." and observing your own response suggests that both humans and LLMs rely heavily on pattern matching and probabilistic completion of familiar scenarios.

However, it's important to note the limits of anthropomorphization. LLMs lack consistent memory, true reasoning capabilities, and the embodied experience that shapes human cognition. The similarities are useful for intuition-building but shouldn't obscure fundamental differences that affect how systems should be designed and deployed.

## Critical Assessment and Balanced Perspective

This case study offers valuable practical insights from hands-on experience building production agent systems, particularly around tool design, testing tradeoffs, and execution monitoring. The speaker's experience building an agent that builds agents provides useful meta-level perspective on LLMOps challenges.

However, several caveats warrant mention. The presentation is explicitly promotional for Vellum's platform, and some claims should be viewed skeptically. The declaration that "drag and drop is dead" is rhetorical flourish rather than technical analysis—visual programming interfaces continue to serve important use cases, particularly for non-technical users and for providing structural guardrails. The timing reference to "three months ago" suggests this is more about staying current with trends than a fundamental technical insight.

The claimed build time of "30 seconds to 2 minutes" for generating working agents is impressive if accurate but likely applies to relatively simple agents. Complex agents with extensive integrations, custom logic, and specific performance requirements probably require more iteration and manual refinement. The "beta" designation and acknowledgment of "some hiccups" suggest the system's capabilities are still developing.

The testing discussion, while pragmatic, could benefit from more specificity about what metrics are used, how test cases are generated and maintained, and how they balance coverage with maintenance burden. The execution monitoring section would be strengthened by discussion of how patterns are identified across executions, whether any automated analysis is performed, and how insights are systematically captured and addressed.

The knowledge base approach using summaries and a read tool is clever but its effectiveness likely depends on the quality and granularity of summaries, the model's ability to recognize when it needs information, and the breadth of the knowledge base. More complex information needs might require more sophisticated retrieval approaches.

Overall, this case study provides valuable insights into practical LLMOps challenges, particularly around tool design, testing philosophy, and observability. The experience of building a meta-level agent provides useful perspective on production agent development. However, readers should balance the insights presented with awareness of the promotional context and recognize that many of the approaches discussed represent reasonable choices among multiple valid alternatives rather than universal best practices.