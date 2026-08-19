---
title: "Enterprise-Scale Agentic Engineering: Building LLM Infrastructure and Tooling for 250+ Engineering Teams"
slug: "enterprise-scale-agentic-engineering-building-llm-infrastructure-and-tooling-for-250-engineering-teams"
draft: false
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "chatbot"
  - "content-moderation"
  - "classification"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "cost-optimization"
  - "latency-optimization"
  - "evals"
  - "mcp"
  - "token-optimization"
  - "kubernetes"
  - "docker"
  - "api-gateway"
  - "monitoring"
  - "cicd"
  - "orchestration"
  - "devops"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "langchain"
  - "fastapi"
  - "scalability"
  - "reliability"
  - "cache"
  - "microservices"
  - "openai"
  - "google-gcp"
  - "amazon-aws"
  - "anthropic"
industryTags: "e-commerce"
company: "Zalando"
summary: "Zalando, a major e-commerce company, shares their 2.5-year journey implementing agentic engineering and LLMOps practices across 250+ engineering teams. The company built a comprehensive LLM infrastructure starting with a LiteLLM-based API proxy deployed in January 2024, complemented by chat UIs, CLI tools, and coding agents. They addressed challenges around vendor independence, model access, authentication, and governance while implementing risk-based PR approval systems and training programs. The initiative resulted in measurable impacts on PR throughput, code complexity patterns, and developer productivity, with 33% of PRs achieving low-risk auto-approval and significant reductions in PR lead time (20-40% for auto-approved changes)."
link: "https://engineering.zalando.com/posts/2026/08/agentic-engineering-at-zalando-a-snapshot.html"
year: 2026
seo:
  title: "Zalando: Enterprise-Scale Agentic Engineering: Building LLM Infrastructure and Tooling for 250+ Engineering Teams - ZenML LLMOps Database"
  description: "Zalando, a major e-commerce company, shares their 2.5-year journey implementing agentic engineering and LLMOps practices across 250+ engineering teams. The company built a comprehensive LLM infrastructure starting with a LiteLLM-based API proxy deployed in January 2024, complemented by chat UIs, CLI tools, and coding agents. They addressed challenges around vendor independence, model access, authentication, and governance while implementing risk-based PR approval systems and training programs. The initiative resulted in measurable impacts on PR throughput, code complexity patterns, and developer productivity, with 33% of PRs achieving low-risk auto-approval and significant reductions in PR lead time (20-40% for auto-approved changes)."
  canonical: "https://www.zenml.io/llmops-database/enterprise-scale-agentic-engineering-building-llm-infrastructure-and-tooling-for-250-engineering-teams"
  ogTitle: "Zalando: Enterprise-Scale Agentic Engineering: Building LLM Infrastructure and Tooling for 250+ Engineering Teams - ZenML LLMOps Database"
  ogDescription: "Zalando, a major e-commerce company, shares their 2.5-year journey implementing agentic engineering and LLMOps practices across 250+ engineering teams. The company built a comprehensive LLM infrastructure starting with a LiteLLM-based API proxy deployed in January 2024, complemented by chat UIs, CLI tools, and coding agents. They addressed challenges around vendor independence, model access, authentication, and governance while implementing risk-based PR approval systems and training programs. The initiative resulted in measurable impacts on PR throughput, code complexity patterns, and developer productivity, with 33% of PRs achieving low-risk auto-approval and significant reductions in PR lead time (20-40% for auto-approved changes)."
notion:
  pageId: "3c1f8dff-2538-802c-87db-c3046497b15c"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-19T09:06:00.000Z"
  lastEditedTime: "2026-08-19T09:06:00.000Z"
  publishedAt: "2026-08-19T09:12:27Z"
---

## Overview

Zalando, a major European e-commerce platform, has been implementing agentic engineering practices across their organization for approximately 2.5 years, serving more than 250 engineering teams. This case study provides a comprehensive look at their LLMOps journey, from initial infrastructure deployment in early 2024 through mid-2026, covering the full lifecycle of enabling LLM access at scale, managing costs, ensuring governance, and measuring impact. The company took a distributed approach, allowing teams to innovate independently while providing centralized infrastructure and guidance.

## Infrastructure: LLM Proxy as the Foundation

The cornerstone of Zalando's LLMOps infrastructure is a LiteLLM-based API proxy deployed in January 2024. This proxy provides API-based access to models from multiple providers including OpenAI, AWS Bedrock, and Google Vertex. The architectural decision to deploy a proxy from day one proved critical for several reasons: it created a single point for measuring adoption through metrics like MAU (Monthly Active Users), WAU (Weekly Active Users), model usage, and User-Agent tracking; it enabled experimentation with different tools and models without vendor lock-in; and it provided a control point for cost management and policy enforcement.

Zalando leveraged LiteLLM's extensibility features extensively. They implemented post-call hooks for anonymized cost tracking, allowing them to monitor spending patterns without violating privacy. Pre-call hooks enforce client version upgrades by restricting access based on User-Agent headers—a practical necessity when dealing with self-managed client installations where blocking access is the only effective enforcement mechanism. They also implemented auto-injection of prompt caching checkpoints, which reduced costs for custom agents while developers were still learning about prompt caching capabilities. This is a notable example of the platform team optimizing for users rather than expecting all users to implement optimizations themselves.

The team encountered stability and memory leak issues with LiteLLM, which they mitigated by enforcing restarts after 20,000 requests using the `--max_requests_before_restart` flag. This pragmatic workaround enabled them to run the proxy for 2,000 MAU with just six small pods (2 CPU cores, 4 GB memory each), demonstrating impressive resource efficiency. The team notes they're looking forward to a Rust rewrite expected to improve performance and stability, indicating ongoing challenges with the current implementation despite workarounds.

Beyond the API proxy itself, Zalando complemented the offering with a simple chat UI (forked from an unmaintained open-source codebase) and a custom-built CLI tool using pydantic-ai. Surprisingly, the chat UI maintained high adoption rates even in an environment where IDE plugins and CLIs are ubiquitous, suggesting that different user personas prefer different interaction modalities. The CLI tool originated from a hackathon in August 2024, before dedicated coding agents existed, and evolved through community contributions to include features like image generation with file format conversion, interactive multi-turn chat mode with context management, agent mode with MCP (Model Context Protocol) support, automatic Bearer token injection for internally hosted MCP servers, HTTP-to-stdio MCP proxy capabilities, and built-in MCP server configuration for low-friction experimentation.

A particularly important innovation was the token injection and MCP proxy functionality, which enabled safe configuration of MCP servers without hardcoding secrets in configuration files. This became especially important as LLM usage expanded beyond engineering to other roles with varying security intuition. Deployed MCP servers are automatically protected by default ingress OAuth filters, providing defense-in-depth.

## Challenges with Tooling and Authentication

Zalando identified two persistent challenges across different LLM-enabled tools. First, many tools use generic User-Agent headers, making it difficult to identify which tools are being used as proxy clients. For their own LLM applications, such as custom code review agents, they ensure User-Agent headers include the name, originating repository, and version. For third-party tools, they request upstream changes or contribute fixes themselves.

Second, most tools lack support for custom auth commands for token generation, instead supporting only static credentials or defaulting to subscription offerings. This creates significant user friction as tokens expire and need manual refreshing, typically requiring application restarts. To bridge this gap, Zalando developed a local proxy that injects auth headers and wrote plugins for coding agents that handle both model access and model discovery along with their parameters.

This local proxy evolved to include debugging features valuable for LLM application development. It ships with a TUI (Text User Interface) that displays current costs per model, highlights gaps in usage of cached tokens, and shows per-request metadata including User-Agent, model, costs, and token statistics including cache write/read metrics. Future enhancements include adding tips for better prompt caching usage (inspired by the pi coding agent's `showCacheMissNotices` feature) through analysis of outgoing requests. This represents a thoughtful approach to helping users optimize their LLM usage patterns through instrumentation and feedback.

## Vendor Independence and Tool Choice

Zalando's proxy-based architecture provides vendor independence, allowing them to onboard additional LLM providers easily while users pick tools that work best for them. Notably, the company has never centrally mandated the use of a single tool, instead allowing users to choose based on available models and personal preferences (IDE vs. CLI). This approach acknowledges that in a rapidly evolving ecosystem with frequent capability shifts, premature standardization can be counterproductive.

Users naturally progress from chat-based interactions to agentic loops orchestrated through CLIs or desktop UIs, often driving tool switches. For some users, tools like opencode and pi offer a "sweet spot" by allowing mixing of models between GitHub Copilot subscriptions and Zalando's API-based access. The move toward open tools is likely to accelerate as moving off closed-weight models requires switching to more open tooling.

However, Zalando observes interesting user psychology: users become attached to the coding agent they've been using for a while, and model preference matters significantly, with users preferring the "style" of answers from one provider over another. This hesitance to switch exists despite relatively low switching costs, as tool capabilities are largely similar. The company maintains reference configurations for different coding agents and plugins for model providers, and while they explore Device Management for developer tooling (a new need for them), tool configurations can be applied with a special command in their CLI tool that reads latest configuration state from a git repository.

## Measuring Impact: PR Data and Code Complexity

Zalando has been seeing the impact of AI coding in their PR data for two years. They observe a consistent increase in PR sizes in the 100-500 line range, with growth in higher buckets (500-1k and 1k-2k lines) becoming more pronounced since the Sonnet 4 release in Q2 2025. Some teams that found large PRs problematic have reached internal agreements to limit PR sizes to fixed values, though hard enforcement through pre-commit hooks is less popular. Other teams accustomed to larger PRs now rely on tooling features like semantic grouping of changes in GitHub PRs or Linear Reviews rather than meticulously crafted commit sequences.

The company also analyzed commit-level evolution of code quality metrics in Java and Golang codebases, mapping each commit to several metrics and plotting their evolution over time. They examined four codebases: a new Go codebase built with full agent adoption from day zero using spec-driven development, a 10+ year old OSS Go reference codebase that adopted agents after commit 3000, a 4-year-old Java codebase with gradual agent adoption from commit 1600, and a 12+ year old Java reference macroservice with code extracted to other repositories and no agent adoption.

Looking at total cyclomatic complexity evolution per commit, Zalando could pinpoint inflection points in code complexity coinciding with when coding agents entered the picture. Some codebases carry "Co-authored-by" markers that confirm these inflection points, though OSS codebases show less consistency as not all authors disclose coding agent usage. For codebases that started with full agentic coding adoption, complexity built up very quickly with growth eventually fading out. While well-scoped microservices might be expected to plateau in complexity, it remains to be seen whether this indicates drastically reduced time to build or other factors. The data also shows complexity dropping following refactoring efforts in some codebases.

Interestingly, even commit messages carry the footprint of coding agents, typically around 5,000 characters. In one extreme case, a commit message included a full log of unit test execution. While such issues can easily go unnoticed in code reviews, they represent good candidates for pre-commit hook constraints. This observation highlights how AI coding assistance affects not just code but all artifacts in the development workflow.

## Risk-Based PR Approval

To protect lead time to merge for PRs, Zalando built a risk-based PR approval tool triggered at PR creation stage. Each PR is evaluated for rollout risk as low, medium, or high. Impressively, 33% of their PRs are classified as low-risk and are auto-approved by the bot. Authors can then choose to merge these PRs immediately, which reduced PR lead time by 20-40% compared with all PRs. This particularly accelerated individuals building prototypes or maintaining internal tooling who would otherwise need to interrupt colleagues to rubberstamp their changes.

The rule set for the approval bot is built based on analysis of their production incidents and typical drivers for outages. The rules are highly specific to Zalando's tech stack, deployment manifests, configuration files, and other contextual factors. Typos that break configuration are assessed as high risk (which would have saved them from what they reference as the "metadpata incident"). Breaking backwards-compatibility is classified as medium risk, requiring human judgment to double-check business rationale. Documentation-only changes are low risk.

Anecdotal evidence suggests the bot affects engineer behavior to increase the probability of low-risk PRs. For example, PRs are increasingly broken down into those that can be shipped quickly (low risk) with backwards-compatible changes, while less important medium-risk PRs that drop unused fields and require additional approval are deferred. Previously, such changes were often mixed together, increasing time to market and rollout risk. This represents an interesting example of how tooling can shape developer behavior in beneficial ways.

## Learning from Session Data

Zalando finds that looking at session data from coding agents is highly educational. Besides spotting non-essential traffic that costs tokens (such as generating plan names, terminal window titles, or recaps for idle sessions), users can learn about their own prompting patterns. They found tools like agentsview useful to inspect session data across multiple tools and codeburn to understand usage across projects and task types.

One insight from session data analysis involved a user with very low cache hit ratio for opencode (less than 30% versus the expected 80%+). To help pinpoint sessions with low cache hit ratios, they wrote a simple parser calculating cache hit ratios across sessions. Fortunately, this turned out not to be a systematic bug across their user base but rather an individual configuration issue. This type of observability into LLM usage patterns is crucial for optimizing costs and user experience.

## Agent Skills and Plugin Marketplace

Zalando maintains a centralized agent skill collection grouped into plugins. These skills address common tasks or concerns across the organization spanning different disciplines (data, engineering, frontend, SRE) and programming languages. A widely popular category is migration skills that guide teams in adopting new platform tools or infrastructure practices, such as multi-arch builds. The skill collection is distributed via managed configuration settings or CLI commands that install needed symlinks (as opencode doesn't support plugin marketplaces).

By encouraging broad contribution of skills that teams found useful, Zalando created an opportunity to discover and disseminate best practices across the organization. This includes practices related to validation of plugin syntax in CI/CD pipelines and separation of concerns between skills and scripts (for example, determining where OAuth token generation belongs). Teams building their own skills use the collection as reference and inspiration, including copying the use of agent-skills-eval for testing their skills.

## Governance in a Fast-Moving Environment

With more than 200 teams innovating and broadly exploring the ecosystem, Zalando faced questions about whether and when to converge on specific tools or approaches. Their position is that it's far too early for standardization. While agentic engineering practices are still in early stages, their key objective is transparency and exchange across teams through structured knowledge sharing and proven governance methods.

One governance mechanism is their Tech Radar, which they extended with an AI section focused on providing overviews and entry points to key documentation on their offering, policies, and guidelines. While library choices have been offloaded to language communities of practice for the past 10 years and kept out of scope for the Tech Radar, the Cambrian explosion of AI tools and rapid ecosystem expansion increased the need for clearer guidance on proven versus early-stage practices. They therefore see value in tracking practices, tools, and libraries for AI use cases. To increase transparency, the AI section of the radar has a separate entry point in their Backstage-based developer portal called Sunrise.

For early-stage projects, Zalando provides entry points for legal assessments on a per-use-case basis to ensure compliance. They also auto-detect AI model usage through scanning of deployed Docker images. The system is auto-registered in their developer portal and owners are asked to provide needed documentation or undergo additional legal review. This represents a pragmatic approach to governance that provides oversight without becoming a bottleneck to innovation.

## Knowledge Sharing and Training

Zalando's knowledge sharing efforts account for the pace at which the ecosystem changes. When state of the art changes daily, early adopters have different needs than those early in their journey. They've developed several formats that work well at different maturity levels.

The LLM Guild, established in 2024, is a chat channel where members share and discuss industry news, announcements related to their LLM offering, and team up for experiments. They run one-hour weekly knowledge-sharing sessions with 20-minute slots for presentations or demos, which are recorded. Sessions have a moderator who curates the agenda, encourages individuals from their network to present, or issues open calls for presentations. This format works well for early adopters seeking the most recent knowledge and experiment results from peers. The presentations also serve as a talent source for hands-on project support, exploration of new approaches, and expanding their pool of internal trainers.

They experiment with different formats for weekly meetings. For example, they ran a session on agent skills where they promoted their company-wide agent skill marketplace by mapping skills against developer journey steps (idea, design, code, test, monitor, operate, maintain). They asked attendees to add examples of team-level skills that could complement their global collection, then ran breakout rooms for each journey step where groups compiled opportunity statements for skills that don't yet exist.

For Guided Experimentation, Zalando has had success with hackathons featuring approximately 10 topics chosen upfront by the organizing team. Topics include defined goals, hints on what to consider, what's out of scope, and potential synergies with other groups. These are tackled in 2-3 day hackathons with open sign-ups where groups of 4-6 people attempt to meet stated objectives while respecting set constraints. Scope and constraints can be negotiated with facilitators during the event. In early days, this approach allowed them to explore parallel paths and choose which tools to invest in. One topic explored in this format was building MCP servers following a template, which seeded their initial set of community-maintained MCP servers. Another group was explicitly asked not to look at MCP but rather explore a generic approach for APIs by searching their API definition catalogue and generating API calls based on user prompts. This effort was successful, building on their internal API catalogue now also exposed as an MCP tool, and it highlighted gaps in API spec quality, such as missing hostnames making it impossible to generate working API calls.

Zalando developed a format called "GenAI Labs" to share knowledge across the organization. Labs are on-site sessions for approximately 20 people, hosted by 1-2 trainers with duration of 1-4 hours. After a short briefing introducing the topic, attendees work through exercises in pairs. In longer sessions, there's a mid-point break for group sharing. For the first session on a topic, they pre-assign attendees by their past experience with agentic engineering using a short sign-up form, allowing time-efficient exploration: over three days they can run six sessions with 120-150 participants across multiple locations.

Lab sessions intended for repeated hosting are converted into monthly trainings. The trainer pool is recruited from attendees of prior Lab sessions, and trainers improve content based on feedback. Their Tech Academy team helps with facilitation, managing attendee and trainer experience. They currently run two monthly sessions: using MCP servers and building agents with pydantic-ai. The first helps onboard everyone to MCP concepts and promotes their internal MCP servers. The second explains basic concepts about tool calling and agent loops, providing foundational understanding of how the agents they use daily work under the hood. They're planning to extend the agents training with prompt caching instruction and add new sessions on using coding agents, agent skills, and building agentic loops. They tested these three sessions as workshops alongside their annual engineering conference to gauge demand.

One important guidance for training sessions is explicitly stating when manual coding is expected from attendees, given that training aims to build new skills. They've observed that participants' temptation to use coding agents as a shortcut to achieve results is high, yet using coding agents during training usually inhibits actual learning—a nuanced challenge unique to teaching in the age of AI assistance.

## AI Readiness and Fleet Management

Across the industry, many AI wins and increases in PR throughput are reported for monorepos where leverage is high. While Zalando has a few monorepos, they largely use separate repositories for microservices. They plan to implement a scanner to assess the AI readiness of each repository, allowing correlations between delivery posture and codebase health. A beneficial side effect of readiness assessment is increased overall code quality and promotion of engineering best practices that otherwise might not be applied due to missing ROI.

To manage their fleet of microservices, they have a tool where they define transformations to be run across a set of repositories. These transformations now include AI-based adjustments with a coding agent CLI run against codebases. They expect to see significant increases in the use of this feature when improving and standardizing their codebases.

## Observations on Amplification Effects

Like others in the industry, Zalando observes how AI amplifies both good and bad practices across their organization. Teams that get carried away with agentic engineering end up with large PRs that discourage reviewers and slow down delivery until the team adjusts their practices. This represents a common pattern where productivity tools can create downstream bottlenecks if not used thoughtfully.

However, they also see their platform investments pay off. Their Zalando web monorepo sets up a deployment for each PR wired to live data. This mechanism now enables not only agents but also non-engineers to prompt changes and easily review results before asking engineers to take over. Other frontend teams are implementing similar mechanisms. Their internal documentation hosting is used to safely host applications and prototypes as static websites. Enabled by coding agents, engineers ship dashboards, demos, data visualization tools, and applications with client-side logic. To ease prototype setup, they plan to make the process more accessible to non-engineers who today must start with a repository, when their need is typically to share a prototype running on localhost with peers. They cite inspiration from Shopify's Quick for this direction.

## Future Directions: Agent Platform and Identity Management

Like many tech companies, Zalando is building an agent platform aiming to allow teams to easily define and deploy agents without handling sandboxing themselves. They're composing the platform from OSS components, such as kagent that handles runtime aspects of agents on Kubernetes. They're also building an Identity Broker component that captures delegation chains for on-behalf-of flows, brokers between different OAuth2 infrastructures, and implements a token vault. This is designed for use by an infrastructure gateway in the call path between an agent and an MCP server or between agents. Their goal is to simplify both agent and MCP server development while solving hard authentication and authorization problems in agentic systems in one place. This Identity Broker work was scheduled to be presented at AGNTCon + MCPCon Europe on September 18th, 2026 in Amsterdam.

They still have a long list of problems to solve, including managing tooling and configuration on users' devices (or moving local environments completely to the cloud), local sandboxing, and auto-routing across models including open-weight ones (noting that users rarely switch models unless nudged by hitting a limit or error). The team expressed interest in connecting with non-vendor engineering teams tackling similar problems.

## Critical Assessment

This case study presents a comprehensive and thoughtful approach to enterprise LLMOps, though readers should consider several factors when evaluating the claims. The measurable impacts (33% of PRs auto-approved, 20-40% reduction in lead time) are specific but only reported for the subset of low-risk PRs, not the overall PR population. The increases in PR sizes and code complexity are presented as observations but the long-term impacts remain to be seen, as the team itself acknowledges.

The vendor independence strategy is sound in principle, though the overhead of supporting multiple tools and maintaining reference configurations represents a real cost that may not scale indefinitely. The decision to avoid premature standardization is defensible given the ecosystem's immaturity, but this creates ongoing complexity for users navigating tool choices.

The governance approach is notably pragmatic, using existing mechanisms like their Tech Radar and Backstage portal rather than creating entirely new processes. However, the reliance on scanning Docker images for AI model usage detection is reactive rather than proactive, potentially catching issues late in the development cycle.

The knowledge sharing and training efforts are impressive in scope and thoughtfulness, particularly the progression from Guild to Labs to formal training. The observation that participants are tempted to use coding agents during training sessions meant to teach foundational skills reveals an interesting pedagogical challenge unique to this technology.

The technical decisions around LiteLLM show both pragmatism (restart after 20k requests) and technical sophistication (auto-injection of prompt caching checkpoints). The need for workarounds like forced restarts suggests the underlying technology isn't fully mature, though the team's ability to run the proxy efficiently (six small pods for 2000 MAU) demonstrates good operational practices.

Overall, this represents a mature, multi-year LLMOps journey with measurable impacts, thoughtful governance, and honest acknowledgment of ongoing challenges. The case study is valuable for organizations at similar scale dealing with distributed teams and microservices architectures, though the specific solutions are tightly coupled to Zalando's existing infrastructure and may not transfer directly to other contexts.
