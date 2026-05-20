---
title: "Building Production-Ready Coding Agents with Skills and Observability"
slug: "building-production-ready-coding-agents-with-skills-and-observability"
draft: false
llmopsTags:
  - "code-generation"
  - "customer-support"
  - "agent-based"
  - "prompt-engineering"
  - "rag"
  - "semantic-search"
  - "few-shot"
  - "evals"
  - "human-in-the-loop"
  - "langchain"
  - "open-source"
  - "documentation"
  - "cicd"
  - "monitoring"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Langfuse / Clickhouse"
summary: "Langfuse, an open-source LLM observability platform, faced the challenge of helping thousands of users integrate their complex tracing and evaluation system into diverse codebases through 478+ pages of documentation. The team built a custom \"skill\" for coding agents (like Claude Code) that acts as an expert guide, combining up-to-date documentation references, interactive CLI tools, and natural language search capabilities. The solution reduced implementation errors caused by outdated pre-training data, accelerated setup time by eliminating trial-and-error approaches, and enabled agents to ask contextual questions before implementation. The team learned six key lessons through production deployment: traces provide 80% of insights, navigation aids help agents find relevant information, basic evaluation setups are better than none, dynamic content should be referenced not duplicated, and auto-research can explore improvements when bounded by proper target functions."
link: "https://www.youtube.com/watch?v=vNCY9kXXyDQ"
year: 2026
seo:
  title: "Langfuse / Clickhouse: Building Production-Ready Coding Agents with Skills and Observability - ZenML LLMOps Database"
  description: "Langfuse, an open-source LLM observability platform, faced the challenge of helping thousands of users integrate their complex tracing and evaluation system into diverse codebases through 478+ pages of documentation. The team built a custom \"skill\" for coding agents (like Claude Code) that acts as an expert guide, combining up-to-date documentation references, interactive CLI tools, and natural language search capabilities. The solution reduced implementation errors caused by outdated pre-training data, accelerated setup time by eliminating trial-and-error approaches, and enabled agents to ask contextual questions before implementation. The team learned six key lessons through production deployment: traces provide 80% of insights, navigation aids help agents find relevant information, basic evaluation setups are better than none, dynamic content should be referenced not duplicated, and auto-research can explore improvements when bounded by proper target functions."
  canonical: "https://www.zenml.io/llmops-database/building-production-ready-coding-agents-with-skills-and-observability"
  ogTitle: "Langfuse / Clickhouse: Building Production-Ready Coding Agents with Skills and Observability - ZenML LLMOps Database"
  ogDescription: "Langfuse, an open-source LLM observability platform, faced the challenge of helping thousands of users integrate their complex tracing and evaluation system into diverse codebases through 478+ pages of documentation. The team built a custom \"skill\" for coding agents (like Claude Code) that acts as an expert guide, combining up-to-date documentation references, interactive CLI tools, and natural language search capabilities. The solution reduced implementation errors caused by outdated pre-training data, accelerated setup time by eliminating trial-and-error approaches, and enabled agents to ask contextual questions before implementation. The team learned six key lessons through production deployment: traces provide 80% of insights, navigation aids help agents find relevant information, basic evaluation setups are better than none, dynamic content should be referenced not duplicated, and auto-research can explore improvements when bounded by proper target functions."
notion:
  pageId: "366f8dff-2538-800c-8acd-ebe1d894f684"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-20T15:33:00.000Z"
  lastEditedTime: "2026-05-20T15:33:00.000Z"
  publishedAt: "2026-05-20T15:37:53Z"
---

## Overview

Langfuse is an open-source LLM observability and evaluation platform that was founded approximately three years ago when the agent space was still in early stages. The company positions itself as infrastructure-focused rather than opinionated, providing tracing capabilities that scale to billions of traces and flexible evaluation systems. The team does all product engineering out of Europe and has grown to become what they claim is the largest open-source project in the LLM observability space by their tracked metrics.

The specific use case centers on a fundamental LLMOps challenge: how to enable thousands of users to correctly instrument their AI applications with observability tooling when the platform has grown to 478 pages of documentation spanning five different feature areas with significant implementation flexibility. The company built a custom "skill" for coding agents that acts as an automated expert consultant, helping users navigate the complexity of adding tracing, prompt management, and evaluation capabilities to their applications.

## The Production Problem

The challenge Langfuse faced illustrates a broader tension in LLMOps infrastructure. As an unopinionated platform designed to work with diverse architectures—from chatbots to real-time voice, video generation, and batch invoice processing—the system offers tremendous flexibility but creates a steep learning curve. Users need to understand not just how to technically integrate the SDK, but which evaluation strategies are appropriate for their specific use case (online vs offline evaluation, human-in-the-loop, etc.), how to structure their traces, and how to set up prompt management workflows.

Before implementing their skill-based solution, the team observed several failure modes when users attempted to use coding agents like Claude Code to add Langfuse instrumentation. The agents would rely on outdated pre-training context, implementing deprecated methods and interfaces. This would lead to a trial-and-error workflow where the agent would first implement instrumentation incorrectly, attempt to verify it worked, discover the failure, and only then fetch up-to-date documentation to correct the issues. This process was slow, produced suboptimal configurations, and didn't help users discover which features were most relevant for their specific application context.

Additionally, Langfuse existed in pre-training data for major models, which initially seemed like an advantage. However, as the project evolved over two years with interface changes and new features, being in pre-training context became a liability. Agents would confidently generate code using methods that no longer existed, creating hallucinated API calls that appeared plausible but didn't work.

## Solution Architecture: Skills as Formalized Shortcuts

The team conceptualizes "skills" as a middle ground between fully autonomous agents and rigid workflows. The analogy presented is solving a Rubik's cube: with just a bash tool, you can manipulate the cube in infinite ways but make no progress. A manual (skill) provides the structured knowledge to solve it reliably. In agent systems, skills provide formalized shortcuts that make agents more reliable in domains where you would have historically built deterministic workflows.

The Langfuse skill architecture consists of several interconnected components:

**Skill Definition and Style Guide**: The core skill includes a reference document that defines the interaction style, particularly emphasizing that agents should ask follow-up questions before making implementation decisions. This addresses the problem of users arriving with vague requirements like "I need evals" without understanding what evaluation strategy suits their application.

**Product Module References**: Rather than embedding complete documentation in the skill (which would create stale duplicates), the skill provides references to different product modules. This enables progressive disclosure where the agent fetches only the documentation needed for the specific implementation path.

**Documentation Access Layer**: The skill provides multiple mechanisms for agents to access current information:
- A sitemap (similar to llms.txt) that helps agents understand what documentation exists before fetching specific pages
- Content negotiation that returns markdown instead of HTML when appropriate headers are sent
- A natural language search endpoint that wraps their existing docs Q&A RAG system, allowing agents to ask questions and receive relevant documentation chunks rather than fetching multiple full pages

**CLI Wrapper**: Langfuse had always provided APIs for all functionality because users built custom tooling on top of their platform. They wrapped these APIs in a CLI specifically for agent use, enabling agents to perform any action that humans previously did through the UI—creating evaluations, managing prompts, configuring data regions, etc.

The workflow operates as a feedback loop: the agent runtime executes user requests, traces capture all execution details (which the team instruments with their own platform), and production traces are analyzed to identify new use cases or skill improvements needed.

## Implementation Insights and Learnings

The team identified six major lessons from building and deploying their skill in production:

**Lesson 1: Traces Get You 80% of the Way**
The team emphasizes that manually reviewing traces remains the highest-value activity before attempting to build complex evaluation systems. They instrumented Claude Code itself and interactively used Langfuse with the coding agent, then examined the execution traces to understand where agents made errors. This hands-on debugging revealed specific improvement opportunities. For example, they discovered that their human-oriented design decision to default the data region to Europe (initially assuming only Europeans cared about data regionality) caused problems for agents. Since agents don't face friction from additional environment variables, the team modified the skill to prompt agents to determine the user's actual data region rather than assuming. They also found agents hallucinating CLI parameters and responded by more aggressively advertising the help flag, which added an extra turn but ensured agents understood available commands.

**Lesson 2: Help Agents Navigate Information**
With 500+ documentation pages, the team realized agents would loop inefficiently, fetching one page, learning something, then fetching another with thought processes in between. The sitemap approach gives agents a high-level view of available documentation before diving deep. The addition of the natural language search endpoint proved particularly valuable for both agent performance and observability. Agents could ask targeted questions and receive relevant chunks immediately rather than fetching multiple full pages. Crucially, because these searches hit Langfuse's servers (unlike local documentation fetches on user machines), the team could track what agents were searching for, revealing which problems users encountered and where documentation gaps existed.

**Lesson 3: Basic Evaluation Setup Beats None**
The breadth of Langfuse use cases made evaluation setup challenging—chat applications, voice systems, video generation, and batch processing all require different evaluation strategies. Rather than trying to build a perfect universal approach, the team created five different basic evaluation templates. They implemented checks as natural language statements evaluated by LLM-as-a-judge on the filesystem and git state before and after running the skill. For example, for an OpenAI RAG application, they expect OpenAI instrumentation to be added and retrieval spans to appear in traces (indicating they captured more than just LLM calls). This basic evaluation infrastructure proved sufficient to prevent regressions when modifying the skill, even though it doesn't cover all edge cases.

**Lesson 4: Dynamic Content Should Be Referenced**
There's a strong temptation for both developers and community members to embed extensive context directly in skills, creating a local cache of documentation immediately available to agents. However, this creates the same staleness problem as pre-training data—you now have multiple representations of what the system is, and they drift out of sync. The team's approach of pointing to canonical documentation sources and providing discovery mechanisms (search, sitemap) maintains a single source of truth. They considered adding timestamps to skills to indicate when content was fetched and alerting users when skills are more than a month old, though this remains an open challenge given current skill distribution mechanisms.

**Lesson 5: Auto-Research Explores Ideas Within Target Function Bounds**
The team experimented with using agents to improve their own skill through auto-research. They defined a target function focused on migrating prompts from local git repositories into Langfuse's managed prompt system (used by larger teams for collaboration between engineers and product managers). The auto-research system generated six suggestions, of which three were accepted and implemented. This represents a success in expanding the team's exploration capacity beyond what they could manually achieve as a small team.

However, the experiment revealed that target functions must be extremely carefully designed. Initially, they optimized for speed measured in number of turns, but the optimization agent removed all documentation-fetching steps because it "knew" how prompt management worked and didn't need references. This defeated the entire purpose of maintaining up-to-date context. Similarly, their target function didn't include requirements around linking prompt versions to production traces (a key feature for understanding how different prompts impact production results), so optimizations removed nudges toward this functionality as unnecessary complexity.

The team also wanted to maintain an approval gate where agents suggest a plan before pushing user prompts to remote repositories, but their sandbox environment didn't support this interaction pattern, so it couldn't be optimized for. The challenge of defining target functions is particularly acute for Langfuse because they balance two competing goals: getting users to an initial "aha moment" quickly versus implementing a comprehensive best-practice setup that typically takes AI engineering teams a month to configure properly.

**Lesson 6: Production Signals Inform Development**
The search endpoint provided unexpected value beyond helping agents find information. By tracking what coding agents search for when users try to integrate Langfuse, the team gains visibility into problems and confusion that would otherwise be invisible. When agents fetch documentation directly on user laptops, there's no visibility into what challenges they encounter.

## Technical Implementation Details

The skill includes several specific technical patterns worth noting:

**Environment Variable Handling**: The team made explicit decisions about when to prompt for user input versus making assumptions. For humans, minimizing required environment variables reduces friction. For agents, environment variables are costless, so the skill prompts for data region selection, API keys, and other configuration explicitly rather than using defaults.

**Content Negotiation**: The documentation system returns markdown when agents send appropriate request headers, avoiding HTML parsing overhead. The team also provides a shortcut where appending ".md" to any documentation URL returns markdown directly.

**CLI Design**: The CLI wraps all functionality previously only available through APIs or the UI. This enables agents to programmatically create evaluations aligned with user preferences, configure prompt management, set up tracing, and execute evaluation runs—all the workflows teams currently perform manually.

**Instrumentation Strategy**: For applications that use Langfuse, the skill guides agents to add different types of spans (retrieval, LLM calls, etc.) that provide observability into execution. The evaluation checks verify that appropriate spans appear, indicating successful instrumentation beyond just capturing top-level LLM calls.

## Production Deployment and Results

The skill is now the primary recommended integration method advertised across all Langfuse documentation. The team notes that users universally prefer not to read documentation themselves and simply want things to work through their coding agent. The skill-based approach has become the default workflow for both onboarding new users and enabling existing users to add new capabilities.

The improved agent behavior is evident in trace comparisons. Before the skill, traces showed just two LLM calls with minimal visibility into agent reasoning. After implementing the skill, traces show detailed evaluations relevant to the specific use case and structured steps around tool execution, providing much better observability into what the agent is actually doing.

The team observes a significant reduction in trial-and-error loops. Instead of implementing instrumentation incorrectly, discovering failure, and then correcting, agents now follow a more direct path: asking clarifying questions, fetching appropriate documentation, and implementing correctly on the first attempt.

## Broader LLMOps Implications and Challenges

The case study surfaces several important tensions in LLMOps infrastructure:

**Unopinionated vs. Opinionated Infrastructure**: Langfuse explicitly positioned itself as unopinionated infrastructure that scales and provides flexibility rather than prescribing specific workflows. This was previously a weakness compared to more opinionated solutions that provided end-to-end chatbot solutions. With coding agents, this becomes a strength—agents can customize implementations for different workflows, making the infrastructure layer more valuable than opinionated end-to-end solutions.

**Skill Distribution and Management**: The ecosystem currently lacks good patterns for skill distribution, versioning, and updates. The team suggests a "well-known skill" convention where agents auto-discover skills when users express intent (like wanting to use Langfuse), but questions remain about trust levels, caching, and staleness detection. They're exploring timestamp-based approaches where agents check if installed skills are outdated and fetch updates, but this requires agent environments to support skill installation and upgrading, which varies by coding agent platform.

**Target Function Design**: The auto-research experiments reveal that target functions for agent improvement require extremely careful design. Missing constraints (like maintaining documentation references or supporting approval gates) or oversimplified metrics (like minimizing turns) can cause optimization in unhelpful directions. This mirrors broader challenges in LLM alignment where specifying objectives precisely enough to avoid Goodharting is difficult.

**Human-Agent Interaction Patterns**: The team grapples with whether skills should aim for a quick initial success or guide users toward comprehensive best-practice implementations. Quick wins reduce time-to-value but may not represent optimal setups. Comprehensive implementations better serve users long-term but require extended agent-user dialogue to gather context. The team is exploring patterns where the skill gets users to an initial working state, then can be re-invoked with "improve my setup" prompts to incrementally add sophistication.

**Workflows vs. Autonomous Agents**: The presentation reinforces the emerging consensus that pure workflows and pure autonomy represent ends of a spectrum. Skills formalize agent capabilities in ways that provide reliability approaching workflows while maintaining agent flexibility to handle multi-domain problems that would have required multiple separate workflow systems.

## Future Roadmap

The team's vision extends beyond documentation-guided setup toward full automation of the evaluation lifecycle. Their roadmap includes:

**In-Product Skill Integration**: Bringing skill-driven automation directly into the Langfuse product UI rather than requiring external coding agents, enabling the platform itself to guide users through configuration and improvement.

**Orchestration Agents**: Developing agents that perform the work currently done by AI engineering teams—reviewing user feedback on production traces, identifying common patterns, creating LLM-as-a-judge evaluations aligned with user preferences, and iteratively improving applications. The goal is for users to connect their repository to Langfuse and have agents auto-regressively improve the system.

**Automated Evaluation Workflows**: Many teams currently spend hours each week clicking through the Langfuse UI to evaluate and improve applications. The CLI foundation enables agents to perform these workflows programmatically—fetching feedback, analyzing patterns, configuring evaluations, and running experiments.

## Critical Assessment

While the presentation demonstrates genuine production deployment and technical sophistication, several claims warrant skepticism:

The assertion that they are "the largest open source project in the space" is unverifiable and self-reported based on metrics they track. The competitive landscape for LLM observability includes several well-funded projects, and "largest" is ambiguous (users, contributors, deployments?).

The success rate of auto-research (3 out of 6 suggestions accepted) is presented positively, but 50% acceptance indicates the approach still requires significant human oversight. This doesn't diminish the value of expanding exploration capacity, but it's far from autonomous improvement.

The case study is inherently a vendor presentation about their own product, so success stories are naturally emphasized over failures. The team does acknowledge challenges with target function design and skill distribution, which adds credibility, but we should expect that production deployments encounter more issues than discussed.

The evaluation approach using LLM-as-a-judge on filesystem state is pragmatic but limited. It catches obvious failures (missing instrumentation, wrong spans) but likely misses subtle issues around evaluation quality, prompt management workflow appropriateness, or optimal configuration for specific use cases.

Despite these caveats, the case study provides valuable insights into real production challenges of building agent tooling, the importance of observability infrastructure for understanding agent behavior, and emerging patterns around skill-based agent capabilities. The team's willingness to discuss failures in target function design and the ongoing challenges with skill distribution adds credibility to their claims about what works.
