---
title: "Scaling AI Coding Tool Adoption Across Engineering Teams"
slug: "scaling-ai-coding-tool-adoption-across-engineering-teams"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ad960d1d9bcb15fa364fd"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:12:20.122Z"
  createdOn: "2025-12-23T18:03:12.402Z"
llmopsTags:
  - "code-generation"
  - "data-analysis"
  - "prompt-engineering"
  - "cost-optimization"
  - "agent-based"
  - "documentation"
  - "monitoring"
industryTags: "finance"
company: "Plaid"
summary: "Plaid, a fintech company operating in the regulated consumer finance space, faced the challenge of transforming hundreds of highly effective engineers into AI power users without disrupting existing workflows. Over six months, they developed a comprehensive strategy that achieved over 75% adoption of advanced AI coding tools through streamlined procurement processes, dedicated ownership of adoption metrics, creation of in-house content demonstrating tools on their actual codebase, and positioning AI tools as complements rather than replacements to existing IDEs. The initiative culminated in a company-wide AI Day with 80%+ engineering participation and 90%+ satisfaction scores, though they continue to address challenges around cost controls, benchmarking, and code review processes adapted for AI-generated code."
link: "https://plaid.com/blog/ai-coding-adoption-plaid/"
year: 2025
seo:
  title: "Plaid: Scaling AI Coding Tool Adoption Across Engineering Teams - ZenML LLMOps Database"
  description: "Plaid, a fintech company operating in the regulated consumer finance space, faced the challenge of transforming hundreds of highly effective engineers into AI power users without disrupting existing workflows. Over six months, they developed a comprehensive strategy that achieved over 75% adoption of advanced AI coding tools through streamlined procurement processes, dedicated ownership of adoption metrics, creation of in-house content demonstrating tools on their actual codebase, and positioning AI tools as complements rather than replacements to existing IDEs. The initiative culminated in a company-wide AI Day with 80%+ engineering participation and 90%+ satisfaction scores, though they continue to address challenges around cost controls, benchmarking, and code review processes adapted for AI-generated code."
  canonical: "https://www.zenml.io/llmops-database/scaling-ai-coding-tool-adoption-across-engineering-teams"
  ogTitle: "Plaid: Scaling AI Coding Tool Adoption Across Engineering Teams - ZenML LLMOps Database"
  ogDescription: "Plaid, a fintech company operating in the regulated consumer finance space, faced the challenge of transforming hundreds of highly effective engineers into AI power users without disrupting existing workflows. Over six months, they developed a comprehensive strategy that achieved over 75% adoption of advanced AI coding tools through streamlined procurement processes, dedicated ownership of adoption metrics, creation of in-house content demonstrating tools on their actual codebase, and positioning AI tools as complements rather than replacements to existing IDEs. The initiative culminated in a company-wide AI Day with 80%+ engineering participation and 90%+ satisfaction scores, though they continue to address challenges around cost controls, benchmarking, and code review processes adapted for AI-generated code."
---

## Overview

Plaid, a major player in the financial technology sector providing API connectivity solutions for banks and fintech applications, embarked on an ambitious initiative to scale AI coding tool adoption across their engineering organization. This case study represents an organizational transformation effort rather than a customer-facing AI product deployment, but it provides valuable insights into LLMOps challenges around tool evaluation, adoption metrics, integration with existing development infrastructure, and the operational realities of deploying AI coding assistants at scale within a regulated industry.

The core business problem was straightforward but challenging: how to transform hundreds of experienced engineers who already had established, effective workflows into AI power users without disrupting productivity or the company's ability to ship products. This is a particularly interesting LLMOps challenge because it focuses on the "ops" side of getting AI tools into production use within an engineering organization, including procurement, security review, adoption tracking, and continuous optimization.

## Strategic Approach to AI Tool Piloting

Plaid developed a sophisticated framework for evaluating and piloting AI coding tools that balanced the rapid pace of AI tool evolution with the company's position in regulated consumer finance. Their approach centered on three key principles that represent important LLMOps considerations for enterprise adoption.

First, they prioritized tools where they could obtain strong value signals very quickly. This is a pragmatic response to the high variability in quality and performance across the AI coding tool landscape. Notably, they conducted initial assessments on large open-source or public projects before beginning any internal procurement process. This pre-procurement technical evaluation allowed them to baseline quality without exposing any proprietary code or requiring internal infrastructure setup. This represents an important pattern for LLMOps: the ability to evaluate model and tool performance in a production-like context before committing resources to full deployment.

Second, they invested heavily in upfront alignment with legal and security partners. Operating in regulated consumer finance meant they couldn't simply adopt tools without careful consideration of data handling practices. They developed a classification framework based on two dimensions: inputs (what data is being sent, where it's going) and outputs (what's being done with results, potential legal or compliance implications). This framework allowed them to determine appropriate review levels for different tools during the pilot stage. This represents a mature approach to LLMOps governance that many organizations struggle with—creating a systematic way to evaluate AI tools against regulatory and security requirements without creating bottlenecks that prevent innovation.

Third, they streamlined their overall procurement process to enable new AI tool pilots to launch in days rather than weeks. In the fast-moving AI landscape, the ability to quickly test and evaluate new tools provides significant competitive advantage. This operational efficiency in the pilot process is itself an important LLMOps capability.

## Ownership and Data-Driven Adoption

One of the most valuable insights from this case study is Plaid's recognition that simply enabling tools in their identity management system (Okta) was insufficient for driving adoption. They observed that after announcements of general availability, adoption would quickly plateau. This led them to convene a core team that treated internal adoption as its own product.

The team built an internal dashboard to track not just usage over time but also retention by cohorts and teams. This represents sophisticated application of product analytics principles to internal tooling, which is an underutilized approach in many LLMOps contexts. The metrics allowed them to identify specific patterns, such as tools working well for frontend engineers but struggling with infrastructure teams. This level of granularity in adoption metrics is crucial for LLMOps at scale—it's not enough to know that "some engineers are using AI tools," you need to understand which teams, which use cases, and where adoption is struggling.

The ownership mindset enabled interventions that wouldn't normally scale in a commercial product context but made sense given their "total addressable market" of a few hundred internal customers. They messaged every churned user to understand what worked and what didn't. This direct user research approach provided qualitative insights that complemented their quantitative metrics and helped them understand the true friction points in their AI tooling.

The case study doesn't provide specific details about the dashboard technology or data collection mechanisms, but the approach demonstrates important LLMOps principles around observability and measurement. Understanding actual usage patterns, retention curves, and team-level differences is essential for optimizing AI tool deployments, yet many organizations lack this instrumentation.

## Content Creation and Knowledge Sharing

Plaid discovered that generic vendor-provided content was insufficient for driving adoption and created their own internal content showing AI tools working on their actual systems. This is a critical insight for LLMOps: the value proposition of AI coding tools is highly context-dependent, and engineers need to see tools working on their specific codebase, build systems, and workflows before they'll invest time in learning them.

Clay Allsopp, one of the authors, published a series of 1-3 minute internal short-form videos on Cursor (an AI-native code editor) that were described as "a huge hit." The brevity and specificity of these videos is notable—they weren't comprehensive tutorials but rather quick demonstrations of specific workflows on Plaid's actual code and tools. This lightweight content creation model is more sustainable than producing extensive documentation and appears to be more effective at driving initial adoption.

They also encouraged organic sharing of wins and losses via Slack, creating a form of user-generated content that helped drive adoption through peer influence. This social dimension of tool adoption is often overlooked in LLMOps discussions but can be crucial for changing engineering culture and habits.

Interestingly, their data showed that the most engaged teams typically had engineering managers who were already excited and knowledgeable about AI. Rather than treating this as a happy accident, they turned it into a targeted intervention strategy, focusing training content and Plaid-specific examples on engineering managers. They also surfaced adoption analytics into the reports managers already used to track their team's work. This represents sophisticated thinking about organizational change management as a component of LLMOps—recognizing that middle management buy-in and knowledge is often the key to team-level adoption.

## Integration Strategy: Complement Rather Than Replace

Plaid encountered a classic challenge in developer tool adoption: engineers have strong preferences for their existing IDEs and tools. Rather than fighting this, they positioned new AI-enabled tools as complements to existing workflows rather than replacements. This proved to be a much more effective adoption strategy.

In some cases, like migrating from VS Code to Cursor, they found it was possible to migrate entirely without productivity regressions. However, for IDEs where they had established tooling, some features weren't yet implemented in newer AI-native editors. For those engineers, they encouraged "dual wielding"—using new AI tools in tandem with robust existing IDEs.

They made specific improvements to workflows through better integrations with their Bazel build system (Bazel is a build and test tool open-sourced by Google, commonly used for monorepo setups). This highlights an important LLMOps consideration: AI coding tools need to integrate with the full development toolchain, not just the editor. Understanding how tools interact with build systems, test frameworks, code review systems, and other development infrastructure is crucial for successful deployment.

Notably, they acknowledge they're still searching for great AI coding assistance that integrates natively into JetBrains IDEs, which suggests that tool coverage across the IDE ecosystem remains incomplete. This is an important reality check—despite the hype around AI coding tools, there are still gaps in ecosystem coverage that organizations need to work around.

## AI Day Event

Plaid organized a company-wide AI Day that served as a catalyst for the final push in adoption. For engineering specifically, they held a workshop where participants rapidly built demos with Plaid's public APIs using AI tools, followed by deeper technical talks on LLM fundamentals.

The hands-on portion was only one hour, but engineers across specialties were able to build working and styled applications through prompting alone. The authors are careful to note these were "far from the capabilities of our customers' products," which is an important caveat—these were demo-quality applications, not production systems. However, the exercise was valuable for demonstrating the power of AI tools and resulted in several new internal AI coding projects.

The event achieved 80%+ engineering participation and 90%+ satisfaction scores, suggesting it was highly successful. The authors note that these "stop-the-world" events were extremely helpful for getting the last mile of adoption, but they emphasize that success depended on the preparation work done in preceding weeks around examples and integration with their existing stack. This reinforces a key theme: successful AI tool adoption requires sustained effort, not just one-time events, though well-executed events can serve as important milestone moments.

## Growing Pains and Ongoing Challenges

The case study is refreshingly honest about challenges and limitations, which provides valuable balance to what could otherwise read as purely promotional content. Several areas of ongoing concern are highlighted:

**Cost controls** are mentioned as a hot spot, especially for tools with variable or per-token costs. This is a common LLMOps challenge that becomes more acute as adoption scales. Unlike traditional software with predictable per-seat pricing, AI tools with usage-based pricing can have unpredictable cost profiles, especially as engineers explore different features and use patterns. The case study doesn't detail their cost control mechanisms, but this remains an area they're actively working on.

**Benchmarking** emerges as a significant challenge. They note that for every problem quickly solved with AI, they also encountered tasks that seemed like they should be solvable but ended up "driving the AI around in circles." They're building an internal catalog of these tasks to use as reference points as models improve and tools update. This is sophisticated LLMOps practice—creating organization-specific benchmarks that reflect actual use cases rather than relying solely on vendor-provided or academic benchmarks. The lack of consistent and relevant benchmarking techniques for AI coding tools in the context of specific codebases is called out as a gap that would be helpful for larger organizations.

**Code review processes** require revision to catch AI-centric failure modes. This is an important operational consideration that's often overlooked in discussions of AI coding tools. AI-generated code can fail in different ways than human-written code, and review processes need to adapt. The case study doesn't provide specific details about what these failure modes are or how they're adapting their review processes, which would be valuable to know.

**Lack of standardization** across tools creates ongoing maintenance burden. They note that there's no consensus on mechanisms for common functionality like version-controlled settings, filtering sensitive files from AI usage, or memory/context hinting. This means each new tool requires figuring out how to support these features and maintaining them for existing tools. This represents a maturity problem in the AI coding tool ecosystem that creates operational overhead for enterprises trying to deploy multiple tools.

**Settings and context optimization** is an area they're still exploring. Tweaking settings and context hints could improve tool performance, but this further exacerbates the benchmarking problem—it's hard to know if changes are helping without good benchmarks. They're planning to dig beyond simple "usage" metrics into understanding which features are actually being used (for example, agentic editing capabilities versus tab completion) and how this impacts overall productivity and reliability.

## Future Directions

Looking ahead, Plaid is expanding beyond just adoption metrics to understand actual impact. They want to measure not just whether engineers are using AI tools, but how they're using them and what the ultimate impact is on productivity and code quality. This represents a maturation of their LLMOps approach from "get tools deployed" to "optimize tool usage for business outcomes."

They deliberately focused their initial effort on coding to deliver quick impact and organizational wins, but they're now looking at other areas of the software development lifecycle including incident response, data analysis, and code review. This phased approach—starting with one high-value area, achieving success, then expanding—is a sensible strategy for organizational transformation around AI tools.

The authors acknowledge they have "work cut out for us, but now at least we have AI to help along the way," which is both self-aware and captures the recursive nature of using AI tools to improve the deployment and operation of AI tools.

## LLMOps Lessons and Critical Assessment

This case study provides several valuable LLMOps insights, though it's important to note what it does and doesn't cover. It's primarily about organizational adoption of third-party AI coding tools rather than building and deploying custom LLM applications. However, the operational challenges around evaluation, adoption, integration, and measurement are highly relevant to broader LLMOps practice.

**Strengths of their approach** include the systematic pilot framework that balances speed with security/legal considerations, the data-driven adoption tracking with team-level granularity, the investment in context-specific content creation, the pragmatic "complement not replace" positioning that reduced friction, and the honesty about ongoing challenges and limitations.

**Notable gaps in the case study** include limited technical detail about the specific tools they're using (Cursor is mentioned, but other tools are not specified), no quantitative data on productivity improvements (only adoption metrics), limited information about cost management strategies or actual costs incurred, no details about how they're adapting code review processes for AI-generated code, and no discussion of quality issues or incidents caused by AI tool usage.

The case study is clearly written to share learnings with peer engineering leaders rather than as a marketing piece for Plaid's products, which lends it credibility. However, it's published on Plaid's blog and presents a uniformly positive narrative (with acknowledged challenges but no serious setbacks), so some skepticism about selection bias in what's shared is warranted.

**The biggest open question** is around actual impact on engineering productivity and product quality. They achieved high adoption rates, but the case study doesn't provide data on whether this translated to measurable improvements in velocity, code quality, bug rates, or other business outcomes. This is a common gap in LLMOps case studies around AI coding tools—adoption is easier to measure than impact, but impact is ultimately what matters. Their future work on measuring beyond usage to actual productivity and reliability impact will be critical for determining long-term success.

Overall, this represents a thoughtful, systematic approach to deploying AI coding tools at scale within a regulated industry. The emphasis on data-driven adoption tracking, context-specific content, and organizational change management provides a useful playbook for other engineering leaders facing similar challenges. The honest acknowledgment of ongoing challenges around cost, benchmarking, and tooling standardization provides important balance and reflects the reality that LLMOps for AI coding tools is still a maturing practice with significant operational challenges to solve.