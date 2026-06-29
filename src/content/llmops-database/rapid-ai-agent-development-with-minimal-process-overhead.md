---
title: "Rapid AI Agent Development with Minimal Process Overhead"
slug: "rapid-ai-agent-development-with-minimal-process-overhead"
draft: false
llmopsTags:
  - "chatbot"
  - "customer-support"
  - "code-generation"
  - "agent-based"
  - "prompt-engineering"
  - "evals"
  - "human-in-the-loop"
  - "serverless"
  - "fastapi"
  - "anthropic"
  - "cloudflare"
industryTags: "hr"
company: "Gusto"
summary: "Gusto, a payroll and HR platform serving thousands of small businesses, rebuilt their application as an AI-powered agent platform called \"Gusto Co-founder\" in just 10 weeks using a team of four engineers and one designer. The problem they addressed was the extensive manual work business owners face in payroll processing, particularly around integrating data from multiple systems and performing repetitive calculations. The solution involved building an agentic system using Cloudflare Workers and Vercel AI SDK that could interact with users via SMS, Slack, and web interfaces while connecting to third-party systems like QuickBooks and Google Sheets. The team achieved this rapid development by eliminating traditional software development processes like documentation, Figma designs, Jira boards, and formal meetings, instead relying on a permanent Zoom room, AI-assisted coding tools like Claude Code, and 9-minute median PR review times. The result was a production-ready AI agent that automates complex payroll workflows, with the designer achieving 94th percentile code throughput across the entire thousand-person R&D organization."
link: "https://www.youtube.com/watch?v=5FKBkUCaLa8"
year: 2026
seo:
  title: "Gusto: Rapid AI Agent Development with Minimal Process Overhead - ZenML LLMOps Database"
  description: "Gusto, a payroll and HR platform serving thousands of small businesses, rebuilt their application as an AI-powered agent platform called \"Gusto Co-founder\" in just 10 weeks using a team of four engineers and one designer. The problem they addressed was the extensive manual work business owners face in payroll processing, particularly around integrating data from multiple systems and performing repetitive calculations. The solution involved building an agentic system using Cloudflare Workers and Vercel AI SDK that could interact with users via SMS, Slack, and web interfaces while connecting to third-party systems like QuickBooks and Google Sheets. The team achieved this rapid development by eliminating traditional software development processes like documentation, Figma designs, Jira boards, and formal meetings, instead relying on a permanent Zoom room, AI-assisted coding tools like Claude Code, and 9-minute median PR review times. The result was a production-ready AI agent that automates complex payroll workflows, with the designer achieving 94th percentile code throughput across the entire thousand-person R&D organization."
  canonical: "https://www.zenml.io/llmops-database/rapid-ai-agent-development-with-minimal-process-overhead"
  ogTitle: "Gusto: Rapid AI Agent Development with Minimal Process Overhead - ZenML LLMOps Database"
  ogDescription: "Gusto, a payroll and HR platform serving thousands of small businesses, rebuilt their application as an AI-powered agent platform called \"Gusto Co-founder\" in just 10 weeks using a team of four engineers and one designer. The problem they addressed was the extensive manual work business owners face in payroll processing, particularly around integrating data from multiple systems and performing repetitive calculations. The solution involved building an agentic system using Cloudflare Workers and Vercel AI SDK that could interact with users via SMS, Slack, and web interfaces while connecting to third-party systems like QuickBooks and Google Sheets. The team achieved this rapid development by eliminating traditional software development processes like documentation, Figma designs, Jira boards, and formal meetings, instead relying on a permanent Zoom room, AI-assisted coding tools like Claude Code, and 9-minute median PR review times. The result was a production-ready AI agent that automates complex payroll workflows, with the designer achieving 94th percentile code throughput across the entire thousand-person R&D organization."
notion:
  pageId: "38ef8dff-2538-801f-81d7-f97c1b4d36e3"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-29T15:45:00.000Z"
  lastEditedTime: "2026-06-29T15:45:00.000Z"
  publishedAt: "2026-06-29T15:48:51Z"
---

## Overview

Gusto, an established payroll and HR platform with over 1,000 people in its R&D organization, built an entirely new AI agent product called "Gusto Co-founder" in 10 weeks with a team of just five people. The case study provides detailed insights into both the technical architecture of the production AI agent system and the radically streamlined development process that enabled such rapid deployment. Eddie Kim, CTO and co-founder of Gusto, led this initiative which began as a prototype built during a flight layover using Claude Code and evolved into a tier-one product launch.

The product addresses a real pain point for small business owners: the extensive manual work required before running payroll, particularly integrating data from multiple third-party systems and performing custom calculations. Gusto Co-founder functions as an autonomous agent that can access business data, connect to external systems, execute complex workflows, and interact with users through multiple channels including SMS, Slack, and web interfaces.

## Technical Architecture and LLMOps Implementation

The technical stack for Gusto Co-founder is deliberately simple and represents a pragmatic approach to production AI agent deployment. The core agent loop runs on Cloudflare Workers, leveraging the serverless compute platform for stateless agent execution. The team uses Vercel AI SDK as their primary framework for building the agentic system, which handles model abstraction and tool calling capabilities. Notably, the team explicitly avoided adding additional agent frameworks or harnesses on top of this foundation.

The agent architecture is built around a stateless design pattern where the agent loop exists in its own repository, separated from the main application code. This architectural decision was made after the initial prototype and involved completely rewriting the original code in TypeScript. The stateless nature of the Cloudflare Worker implementation allows the agent to scale efficiently while maintaining clean separation of concerns.

Memory management in the system is implemented as a simple tool that writes to a database column rather than using specialized third-party memory services. This demonstrates a minimalist approach where complex agent capabilities are reduced to fundamental primitives. The team found that many of the sophisticated agent harnesses and planning frameworks that were previously considered necessary are no longer required with current LLM capabilities.

Tool calling is central to the agent's functionality. The system includes connectors to third-party services including QuickBooks, Google Sheets, and Notion, as well as tools that interact with Gusto's existing data about employees, payrolls, schedules, and time-off requests. Tools are also used for actions like approving time-off requests and submitting payroll. The agent can execute multi-step workflows by calling multiple tools in sequence, such as reading data from a Google Sheet, performing calculations according to user-specified business rules, updating payroll records, and then waiting for user confirmation before submitting.

The multi-channel interface represents an important LLMOps consideration for production deployment. The agent uses the same tool-calling infrastructure regardless of whether the user is interacting via web, SMS, or Slack. This channel-agnostic architecture means the core agent logic remains consistent while the presentation layer adapts to different communication modalities. For small business owners who are frequently mobile, SMS becomes a primary interface for complex operations like payroll approval.

## Development Process and AI-Assisted Coding

The development methodology employed by the Gusto Co-founder team represents a significant departure from traditional software engineering practices and demonstrates how AI coding assistants fundamentally change the economics of software development. The team eliminated all traditional process overhead including meetings, text specifications, Figma designs, Jira boards, stand-ups, and retrospectives. The only structured element retained was a permanent Zoom room that team members could join at any time for synchronous collaboration and code review.

Claude Code was extensively used throughout the development process. The CTO describes using Claude Code to build the initial prototype during the flight layover and continued using it for feature development throughout the 10-week build period. The typical workflow involves using voice input through Whisper for prompting, providing context such as GitHub issues with customer feedback, and instructing Claude to read the issue, write a failing evaluation, implement a fix, and verify the fix works by showing the eval passes. This represents a test-driven development approach specifically adapted for AI agent development where evals serve as the primary quality gate.

The evaluation-driven development process is particularly notable. The team always writes failing evals first when attempting to fix conversation issues or agent behavior problems, then implements code changes to make the eval pass, and finally verifies that the rest of the eval suite continues to pass before opening a pull request. This is described as "basically kind of the only way we work now" when dealing with AI conversation quality issues. The emphasis on evals rather than traditional unit tests reflects the unique quality assurance challenges of LLM-based systems where behavior is less deterministic and more context-dependent.

Code review happens with exceptional speed, with a median PR review time of just 9 minutes on the team. This is enabled by the permanent Zoom room where developers can immediately request review, often conducting reviews in breakout rooms or group settings. PRs are not drafts but are actual production-ready code that has been verified by AI coding assistants before human review. The team developed a cultural practice of being willing to delete entire PRs if the feature doesn't align with product direction, recognizing that the low cost of AI-generated code makes this economically viable.

The "trash can method of software engineering" is a key concept that emerged from this project. Because code generation is so inexpensive with AI tools, the team became comfortable completely discarding code including starting from scratch with a /v2 branch to rebuild features with better architecture based on learnings from the initial implementation. This represents a shift from viewing code as precious to viewing it as highly malleable and disposable.

## Team Structure and Cross-Functional Collaboration

The team composition of four engineers and one designer is notable particularly for what it lacks: no product manager. Product decisions were made collaboratively with everyone functioning as product managers. Features would be built speculatively, reviewed in the permanent Zoom room, and either merged or deleted based on group discussion. The low cost of code generation enabled this experimental approach where building the feature was often faster than debating whether to build it.

The designer Katie's role evolution demonstrates how AI coding tools can enable non-engineers to become effective production contributors. Katie shipped code to production and achieved 94th percentile throughput across the entire R&D organization according to DX metrics. Her approach involved initially shipping faked front-end experiences with canned responses to production behind feature flags, which engineers would then progressively enhance by connecting real backend functionality. This progressive enhancement approach where prototypes literally transform into real products in place represents a new development pattern enabled by AI tools.

Katie's success is attributed to two factors: inherent technical curiosity that made her more comfortable with technical concepts than typical designers, and critically, a team of engineers willing to invest time in code review, feedback, and pairing to help her improve. The case study emphasizes the cultural importance of engineering teams prioritizing review of non-engineer PRs at the same level as engineer PRs, treating code review as a mentorship and knowledge-sharing opportunity rather than a bottleneck.

The development process involved shipping features behind feature flags to a hidden page in production, treating the product like a block of marble being progressively refined in place. This meant that at any given time the product in production had rough edges or incomplete features, but it continuously improved through iteration. This stands in contrast to traditional approaches where products are polished in staging environments before production deployment.

## Production Deployment and Real-World Usage

The Gusto Co-founder product handles real business operations including actual payroll processing with financial consequences. The agent can execute complex workflows such as accessing a Google Sheet export from Mindbody (a booking system for massage therapists), applying custom business rules for calculating bonuses based on service upsells and tip pooling, updating payroll amounts, and presenting the calculated payroll for user approval before final submission. This demonstrates the agent operating with appropriate human-in-the-loop safeguards for high-stakes financial transactions.

The multi-channel deployment strategy addresses real user behavior patterns. Small business owners are typically mobile and busy, making SMS and Slack more natural interfaces than web applications for many interactions. The agent can answer questions like "Do I have any time off requests that I need to approve?" via text message and execute actions based on simple responses like "Yes." This represents a significant UX shift from traditional B2B web applications to conversational interfaces.

The system comes with pre-integrated access to all existing Gusto data including employee records, payroll history, schedules, and time-off requests, giving the agent comprehensive context about each business. This integration with existing system state is crucial for the agent to provide useful assistance without requiring users to repeatedly provide context.

## Lessons for LLMOps and Organizational Change

The case study reveals several important lessons about deploying LLMs in production at scale. First, the technical complexity of building production agent systems is lower than many teams assume. The stack of Cloudflare Workers plus Vercel AI SDK with custom tools is sufficient without additional agent frameworks. Memory and planning can be implemented as simple database operations and tool calls rather than requiring specialized services.

Second, the development velocity enabled by AI coding tools fundamentally changes project economics. A five-person team operating for 10 weeks represents a small investment for a 1,000-person R&D organization, making it feasible to run multiple experimental projects in parallel with acceptable risk if some fail to gain traction. The implication is that companies can afford to be more ambitious and take more product risks.

Third, process overhead that made sense in traditional software development becomes counterproductive with AI-assisted development. Documentation, detailed specifications, and extensive planning add more friction than value when code can be generated and modified rapidly. The team's elimination of these artifacts represents an extreme but effective approach for zero-to-one projects.

Fourth, evaluation-driven development is essential for LLM-based systems. Traditional unit tests are insufficient for validating conversation quality and agent behavior. The practice of always writing failing evals first, implementing fixes, and verifying eval suites pass provides the quality assurance needed for production deployment of non-deterministic systems.

Fifth, executive and leadership involvement in hands-on coding has renewed importance. The CTO's ability to contribute production code and achieve high throughput percentiles helped establish credibility and model the expected working style. Leaders building AI products should be actively using AI tools to understand capabilities and limitations viscerally.

The case study acknowledges that some lessons are project-specific. Having the CTO on the team provided implicit permission to break company conventions around process and documentation. For other teams to work this way, explicit permission must be granted and potentially even enforced. The team suggests telling other teams "we're not giving you permission to do it in any other way" to overcome organizational inertia.

The intense working style with significant nights and weekends is noted as unsustainable long-term but was voluntary based on team passion and the fun of building at high velocity. The team emphasized that despite working harder, people were happier because the work felt more creative and closer to impact.

## Future Directions and Scaling Challenges

The team plans to expand the multi-channel capabilities beyond SMS and Slack to include WhatsApp and Telegram, inspired by experiences with personal AI agents. The product launched to a tier-one launch at Gusto with a waitlist for new users, indicating significant organizational commitment to the initiative.

A key challenge identified is how to scale the learnings from this five-person team to the broader 1,000-person R&D organization. The development approach worked exceptionally well for this zero-to-one project but may not apply universally to all types of work. The organization is exploring how to identify which projects can benefit from this minimal-process approach versus which still require traditional software engineering practices.

The experience has also raised questions about talent development and team composition. If designers can become high-throughput code contributors with appropriate support and AI tools, it suggests potential for broader cross-functional contribution and more fluid role boundaries. However, this requires intentional investment in mentorship and code review from engineering teams.

Overall, the Gusto Co-founder case study demonstrates that production deployment of sophisticated AI agents with multi-channel interfaces, tool calling, and real business impact is achievable with small teams in short timeframes using relatively simple technical stacks. The key enablers are AI-assisted coding tools, streamlined development processes, evaluation-driven quality assurance, and cultural willingness to delete code and iterate rapidly. The case provides a concrete example of how established companies can operate with startup-like velocity on AI initiatives when given appropriate permission and tooling.
