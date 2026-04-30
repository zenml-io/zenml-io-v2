---
title: "2x Engineering Throughput Through AI-First Development Platform"
slug: "2x-engineering-throughput-through-ai-first-development-platform"
draft: false
llmopsTags:
  - "customer-support"
  - "code-generation"
  - "chatbot"
  - "poc"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "evals"
  - "human-in-the-loop"
  - "latency-optimization"
  - "cost-optimization"
  - "error-handling"
  - "mcp"
  - "cicd"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "microservices"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "open-source"
  - "documentation"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "anthropic"
  - "openai"
  - "google-gcp"
industryTags: "tech"
company: "Intercom"
summary: "Intercom, a customer support platform company, successfully doubled their R&D throughput measured by pull requests per head over nine months by implementing a comprehensive AI-first development approach centered on Claude Code. The company faced the challenge of maintaining engineering velocity while simultaneously transforming their product to be AI-native after ChatGPT's release. Their solution involved treating internal AI adoption as a product, building a custom skills repository with hundreds of specialized tools, implementing sophisticated telemetry across all AI interactions, and establishing high-quality standards enforced through automated hooks and evaluations. The results included not only 2x PR throughput but also improved code quality as measured by third-party research, faster time-to-market for features, and a cultural shift toward treating all technical work as agent-first, with leadership openly targeting 10x improvements as the next milestone."
link: "https://www.youtube.com/watch?v=BRDKft0-dUU"
year: 2026
seo:
  title: "Intercom: 2x Engineering Throughput Through AI-First Development Platform - ZenML LLMOps Database"
  description: "Intercom, a customer support platform company, successfully doubled their R&D throughput measured by pull requests per head over nine months by implementing a comprehensive AI-first development approach centered on Claude Code. The company faced the challenge of maintaining engineering velocity while simultaneously transforming their product to be AI-native after ChatGPT's release. Their solution involved treating internal AI adoption as a product, building a custom skills repository with hundreds of specialized tools, implementing sophisticated telemetry across all AI interactions, and establishing high-quality standards enforced through automated hooks and evaluations. The results included not only 2x PR throughput but also improved code quality as measured by third-party research, faster time-to-market for features, and a cultural shift toward treating all technical work as agent-first, with leadership openly targeting 10x improvements as the next milestone."
  canonical: "https://www.zenml.io/llmops-database/2x-engineering-throughput-through-ai-first-development-platform"
  ogTitle: "Intercom: 2x Engineering Throughput Through AI-First Development Platform - ZenML LLMOps Database"
  ogDescription: "Intercom, a customer support platform company, successfully doubled their R&D throughput measured by pull requests per head over nine months by implementing a comprehensive AI-first development approach centered on Claude Code. The company faced the challenge of maintaining engineering velocity while simultaneously transforming their product to be AI-native after ChatGPT's release. Their solution involved treating internal AI adoption as a product, building a custom skills repository with hundreds of specialized tools, implementing sophisticated telemetry across all AI interactions, and establishing high-quality standards enforced through automated hooks and evaluations. The results included not only 2x PR throughput but also improved code quality as measured by third-party research, faster time-to-market for features, and a cultural shift toward treating all technical work as agent-first, with leadership openly targeting 10x improvements as the next milestone."
notion:
  pageId: "352f8dff-2538-80e8-b2a1-efaa03b7b909"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-30T13:33:00.000Z"
  lastEditedTime: "2026-04-30T13:33:00.000Z"
  publishedAt: "2026-04-30T13:36:30Z"
---

## Overview

Intercom is a 15-year-old SaaS company providing customer support and communication tools. The case study focuses on their comprehensive transformation of engineering practices through AI-assisted development, led by Brian Scanland, a senior principal engineer. The company made a strategic decision to go all-in on AI the same weekend ChatGPT launched, recognizing it as an existential challenge to their business model. This case study demonstrates one of the most sophisticated implementations of LLMs in production for internal engineering productivity, with detailed metrics, infrastructure, and cultural considerations.

## Business Context and Problem

The primary challenge Intercom faced was twofold. First, they needed to completely reimagine their product to be AI-first in response to the ChatGPT moment, which required massive engineering effort. Second, they recognized that AI would fundamentally change how engineering work gets done and wanted to capture that productivity gain rather than be disrupted by it. The company had been observing tools like Cursor gaining traction but hadn't seen the transformative breakthrough in velocity they expected until late 2025 when models like Claude Opus 4.6 were released. Leadership, particularly CTO Dara, set an explicit goal of doubling R&D throughput, using pull requests as a crude but effective measure of productivity.

## Technical Implementation

### Platform Architecture

Intercom built what they describe as a comprehensive AI development platform rather than simply adopting tools. The foundation is Claude Code, but they layer extensive customization on top. A critical architectural decision was to not rely on Claude Code's native plugin mechanism, which they found flaky and unreliable. Instead, they partnered closely with their IT team to use internal IT systems to synchronize plugins directly to disk on all developer laptops. This ensures consistency and eliminates debugging issues related to plugin installation states.

The platform consists of several layers. At the base is a "base plugin" that gets installed on every laptop, containing safety hooks, foundational settings, and core telemetry. This is kept minimalist to be appropriate even for non-technical roles. The next layer is "developer tools," which includes skills appropriate for any engineer's day-to-day work. These require high quality standards and must pass evaluations before deployment. Beyond this, teams build hundreds of specialized skills for specific use cases.

### Skills and Hooks System

The skills repository represents a key innovation in their LLMOps approach. Skills are essentially sets of instructions and sometimes scripts that the LLM or agent harness can invoke at specific steps. As of the recording in spring 2026, they had hundreds of skills with daily growth, particularly during special "AI day" events where teams are encouraged to contribute.

A particularly illustrative example is the "create PR" skill. Intercom noticed that Claude Code was generating poor pull request descriptions that simply regurgitated code into English rather than capturing intent and context. They built an LLM judge to evaluate PR description quality across months of historical data and confirmed the trend was declining. The create PR skill was designed to use session context to generate meaningful descriptions. To enforce its use, they implemented a hook that blocks the GitHub CLI when Claude tries to open a PR directly, forcing it to use the create PR skill instead. After implementing this system, their LLM judge confirmed they returned to high-quality PR descriptions.

Another sophisticated skill is for fixing flaky tests. This skill was built by harvesting all historical flaky spec data, having Claude research patterns, and building a comprehensive checklist. The skill not only fixes individual flaky tests but discovers novel patterns, updates itself when it learns something new, and fans out to find similar issues across the codebase. This transformed what would be distinguished engineer-level work requiring possibly days into an automated, reliable process that runs continuously.

### Observability and Telemetry

Intercom treats their AI development platform as a product, which means comprehensive instrumentation. They implement telemetry at multiple levels. First, all skills emit basic usage information sent to Honeycomb using a shared API key deployed to all laptops. Anyone in the organization can query this data to see skill usage patterns, adoption rates, and identify popular or underutilized skills. This is critical for skill developers to understand impact and for leadership to see actual adoption versus aspirational goals.

The most frequently invoked skills shown in their Honeycomb dashboards include creating PRs, admin tools for internal APIs, their CI system called Build Kai, and Snowflake logs for troubleshooting. This reveals that much of the AI-assisted work focuses on the build-deploy-debug cycle.

Beyond event-level telemetry, Intercom collects all Claude Code session data. These sessions are stored as JSON files locally, which they upload to S3 after anonymization to respect privacy since people sometimes have personal conversations with Claude. This session data enables sophisticated analysis. They built internal tools to provide personalized insights to individual developers, showing metrics like which percentile they fall into for AI usage, effectiveness of their sessions, and specific feedback about interaction patterns. For example, one developer received feedback about ineffective interactions when repeatedly trying to force Claude to use a specific Google integration incorrectly.

The session data also enables organization-wide analysis of dropout rates, time-to-value metrics, and pattern detection. They're working on identifying which skills produce highest quality outputs and which need improvement. This represents a feedback loop where skill quality can be continuously improved based on production usage data.

### Quality Assurance and Evaluation

Quality control is enforced through multiple mechanisms. Intercom uses LLM judges for evaluation at several points. The PR description quality judge is one example. They're also working with a research group at Stanford, providing them data to independently assess code quality. According to their analysis, code quality has actually improved over the period of AI adoption, contradicting common fears about AI-generated code being lower quality.

Brian Scanland, as a senior engineer, joins every incident as what he calls an "ambulance chaser" to watch for any increase in customer-facing problems or outages. He reports seeing no increase in regular incidents, though there have been occasional weird problems unrelated to production. The company also tracks time from first line of code to feature announcement in their updates channel, which has consistently decreased.

Skills themselves require evaluation before being promoted to the core developer tools layer. While the exact evaluation methodology isn't detailed, the emphasis on having evals before model upgrades or switching to cheaper models suggests they have automated test suites for critical skills.

### Code Quality and Technical Debt

One of the most compelling aspects of Intercom's approach is treating AI as a way to unlock previously intractable technical debt work. When engineering capacity was limited by human typing speed and coordination costs, businesses could only allocate limited resources to internal quality improvements because they don't directly generate revenue. AI fundamentally changes this equation by compressing the cost of these improvements.

Brian advocates that engineering teams "speedrun" their technical debt, taking everything they hate about the codebase and spending a month fixing it with AI assistance. This has practical benefits beyond cleaner code. When you can address developer experience issues, security compliance, maintainability, flaky tests, and CI/CD improvements, you create a better foundation that actually unlocks more velocity for both agents and humans. The cultural impact is also significant because engineers see the organization values quality when they invest in these improvements.

Intercom has a "mature environment" as a 15-year-old SaaS company with millions of lines of code in their Ruby on Rails monolith, which predates the company's incorporation. This maturity in software delivery practices, testing, and deployment appears to be a strength that AI amplifies rather than exposes as a weakness.

## Deployment and Production Use

The deployment model is carefully considered. Rather than relying on individual developers to install and update plugins, the IT team pushes updates to all laptops. This provides consistency and eliminates an entire class of support issues. While this might seem heavy-handed, it reflects treating the AI platform as critical infrastructure.

For actual code deployment, Intercom maintains their existing high standards. Pull requests must pass all CI checks, and they've had to upgrade their CI infrastructure significantly because throughput increased so much it originally caused the system to melt down and become 10x more expensive. After fixing bottlenecks and improving performance, CI is no longer the bottleneck, though code review has become one.

The company uses feature flags extensively and has sophisticated deployment practices built over years. The AI agents are trained to work within these existing systems rather than inventing their own solutions, which is enforced through skills and context.

## Cost Management

Cost is a significant consideration. Brian notes their Anthropic bill "looks exactly like" their PR throughput chart, growing at a similar exponential rate. He compares it to hiring whole new offices of people. However, their attitude has been to treat this as an investment and prioritize speed over optimization at this stage. Everyone uses Claude Opus with a 1 million token context window on the API plan, all on-demand without trying to optimize token usage.

This approach is deliberate. They recognize not every business can afford this strategy, and there's value in being forced to think carefully about token use, which can sometimes lead to better results. But given Intercom's position and goals, they're capturing alpha by moving as fast as possible and worrying about the bill later. Brian jokes that "if this keeps going at this rate we should all work for Anthropic."

The investment appears justified by results. Beyond the 2x throughput increase, they're seeing improvements in time-to-market, code quality, and cultural energy that would be difficult to achieve through other means.

## Organizational and Cultural Aspects

The cultural transformation is as significant as the technical implementation. Brian emphasizes that Intercom had it on "easy mode" because leadership was already convinced of AI's transformative potential from the ChatGPT weekend. There was impatience about why it wasn't happening faster rather than skepticism about whether it would happen.

A critical element is permission-giving. Brian's biggest contribution is often simply telling people they can do things, both pre-AI and post-AI. He explicitly tells people to blame him if anything goes wrong, removing the personal risk from experimentation. This is particularly important when pushing boundaries like giving agents access to production Snowflake databases or the ability to run code in the Rails console via API.

The company maintains a high-trust environment where gaming metrics isn't expected or tolerated. Setting a goal to double PRs could lead to splitting PRs artificially, but in a high-trust culture with mature engineers, this doesn't happen. Instead, people embrace the challenge and the measurement becomes a useful leading indicator.

The investment extends beyond just providing API keys. Intercom runs "enablement" programs, gives people freedom to explore, encourages skill building, but also sets expectations around throughput increases. They ran special AI day events to boost skill contributions. They provide personalized feedback through their session analysis tools.

Brian reports that the last three months have been the most fun of his career. Engineers, designers, product managers, and TPMs are all actively using Claude Code and shipping code regardless of their role. The physical limits of typing are no longer the constraint on what people can accomplish. This has returned the company to feeling like its earlier startup roots despite being a mature organization, with fast decisions and rapid feedback loops.

One reflection on culture is around backlog management. Brian suggests "backlog zero is a realistic thing for teams to be able to go after" because previously impossible wishes are now achievable. This fundamentally changes how teams think about investment and prioritization.

## Agent-First Development Philosophy

A key strategic insight is the movement toward "all technical work will become agent-first." Intercom is setting deadlines where agents will be the first thing invoked in response to alarms, in planning meetings, or for basic work. This isn't just moving faster for the sake of it but reimagining work from first principles in an agentic world.

This philosophy extends to how they think about their product. Brian notes that agents are making build-versus-buy decisions, and often choose to build because they can achieve the goal without requiring human intervention to sign up for services. This creates pressure on SaaS companies to become more agent-friendly. Intercom is building CLI tools and designing APIs with agents in mind, not just humans.

An example shown in the case study is an experimental Intercom CLI that guides agents through setup, including hints like checking email for verification codes if the agent has email access configured. While the demo didn't complete successfully, the learning process of trying these experiments quickly is itself valuable. The conversion drop-off point for agent-based installation is simply pressing escape and trying a different approach, so speed of iteration is critical.

## Results and Impact

The headline result is doubling merge PRs per R&D head over nine months, measured from nine months before spring 2026 to spring 2026. This metric includes all R&D roles, not just software engineers, and the organization has been hiring during this period, so the raw number of PRs is dramatically higher than just 2x. The chart shows a clear inflection point around December 2025, coinciding with the release of Claude Opus 4.6 and the Christmas break where many engineers experimented extensively with AI coding tools.

Beyond throughput, they're seeing improved code quality from independent Stanford research analysis, decreased time from first code to feature announcement, and increased volume of shipped features. They're running experiments like how far one person can get building what would normally be a whole product area.

The raw number of active skills in production is in the hundreds and growing daily. The most popular skills are fundamental building blocks like PR creation, admin access, CI interaction, and logging access. Usage is widespread across the organization, with the percentile distribution tool showing most people are actively engaged.

Cultural indicators are strong. Brian describes excitement, velocity, varied work, and fun. People wake up excited about what they can accomplish. The variety of work has increased because people can tackle things that would have required weeks of coordination and specialized expertise.

## Challenges and Limitations

The case study is refreshingly honest about challenges. The demo of installing Intercom via CLI agent didn't complete successfully in the recorded session, showing that these workflows aren't yet perfectly reliable. Brian's reflection is that the cost was just five minutes and some tokens, so rapid iteration is feasible.

Model behavior can be frustrating. Brian mentions occasionally giving Claude smiley or frowny face feedback, and his session analysis flagged ineffective interaction patterns when he was repeatedly trying to force a specific approach.

Cost is a real constraint that not every organization can ignore. Intercom's ability to treat it as an investment and optimize later is a position of relative strength.

Code review has become the bottleneck after CI was fixed, suggesting new organizational challenges emerge even when old ones are solved.

The session analysis tools show people are at different adoption levels, and new hires may not have seen systems like this before, requiring ongoing enablement and support.

## Broader Implications

This case study demonstrates several important LLMOps principles. First, treating internal tools as products with proper instrumentation, quality standards, and user support is critical at scale. Second, enforcement mechanisms like hooks are sometimes necessary to maintain quality when relying on AI agents. Third, evaluation using LLM judges and independent research can provide confidence that quality isn't degrading. Fourth, organizational permission and high-trust culture enable rapid experimentation. Fifth, cost considerations exist but may be worth deferring during high-learning phases.

The case also shows the value of building on strong foundations. Intercom's mature CI/CD, testing practices, and software delivery discipline became amplified advantages rather than obstacles. Their Rails monolith, despite being older than the company, is well-maintained and provides good context for LLMs.

Finally, the agent-first philosophy represents a significant shift in how work is conceived. Rather than agents as assistants to human-centric workflows, the vision is workflows designed for agents with humans in elevated roles. This has implications for tool design, API design, and product strategy across the industry.
