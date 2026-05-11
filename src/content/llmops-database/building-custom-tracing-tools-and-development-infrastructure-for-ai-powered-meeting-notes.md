---
title: "Building Custom Tracing Tools and Development Infrastructure for AI-Powered Meeting Notes"
slug: "building-custom-tracing-tools-and-development-infrastructure-for-ai-powered-meeting-notes"
draft: false
llmopsTags:
  - "customer-support"
  - "summarization"
  - "question-answering"
  - "chatbot"
  - "prompt-engineering"
  - "cost-optimization"
  - "agent-based"
  - "harness-engineering"
  - "human-in-the-loop"
  - "cicd"
  - "continuous-deployment"
  - "monitoring"
  - "databases"
industryTags: "tech"
company: "Granola"
summary: "Granola, a meeting notes application that uses LLMs to generate summaries from real-time transcription, faced challenges in production with LLM behavior unpredictability, cost control, and feature testing. The company moved beyond simple one-shot LLM implementations by building custom internal tracing tools that provide complete visibility into tool calls, reasoning processes, and costs, structured specifically for their team's needs rather than relying on generic SaaS providers. Additionally, they transformed their Electron desktop app's front-end into a web shell deployed online, enabling preview links for every pull request and significantly speeding up their development and testing feedback loops for AI features."
link: "https://www.youtube.com/watch?v=ON5LIT0M4do"
year: 2026
seo:
  title: "Granola: Building Custom Tracing Tools and Development Infrastructure for AI-Powered Meeting Notes - ZenML LLMOps Database"
  description: "Granola, a meeting notes application that uses LLMs to generate summaries from real-time transcription, faced challenges in production with LLM behavior unpredictability, cost control, and feature testing. The company moved beyond simple one-shot LLM implementations by building custom internal tracing tools that provide complete visibility into tool calls, reasoning processes, and costs, structured specifically for their team's needs rather than relying on generic SaaS providers. Additionally, they transformed their Electron desktop app's front-end into a web shell deployed online, enabling preview links for every pull request and significantly speeding up their development and testing feedback loops for AI features."
  canonical: "https://www.zenml.io/llmops-database/building-custom-tracing-tools-and-development-infrastructure-for-ai-powered-meeting-notes"
  ogTitle: "Granola: Building Custom Tracing Tools and Development Infrastructure for AI-Powered Meeting Notes - ZenML LLMOps Database"
  ogDescription: "Granola, a meeting notes application that uses LLMs to generate summaries from real-time transcription, faced challenges in production with LLM behavior unpredictability, cost control, and feature testing. The company moved beyond simple one-shot LLM implementations by building custom internal tracing tools that provide complete visibility into tool calls, reasoning processes, and costs, structured specifically for their team's needs rather than relying on generic SaaS providers. Additionally, they transformed their Electron desktop app's front-end into a web shell deployed online, enabling preview links for every pull request and significantly speeding up their development and testing feedback loops for AI features."
notion:
  pageId: "35df8dff-2538-800d-b02d-fb0afe7dd497"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-11T20:32:00.000Z"
  lastEditedTime: "2026-05-11T20:32:00.000Z"
  publishedAt: "2026-05-11T20:39:05Z"
---

## Overview

Granola is a meeting notes application that sits on users' docks and captures both system audio and microphone input to provide real-time transcription. The application allows users to write their own notes alongside the automated transcription, creating a hybrid experience that aligns with natural note-taking behaviors. At the end of meetings, the application uses LLMs to generate comprehensive summaries that consider both the transcription and the user's manual annotations. The company has built its reputation on shipping numerous AI features while maintaining a product philosophy of "not getting in the way" of users regardless of their role.

The presentation, delivered by a product engineer at Granola, focuses on the practical challenges encountered when deploying LLM-based features in production and the custom solutions the team built to address them. The discussion emphasizes moving beyond simplistic "one-shot" LLM implementations toward more sophisticated systems that provide visibility, control, and rapid iteration capabilities.

## Production Challenges with LLM Features

The team at Granola encountered typical challenges that arise when deploying LLM-based features to production users. Using their chat feature as an example—which allows users to ask questions about current or past meetings—they found that a simple one-shot chat system quickly revealed numerous issues once exposed to real users. Users would make requests that the system wasn't designed to handle, such as asking for lists of cities, expecting web search results instantly, requesting follow-up emails written in their personal style, or asking for coaching advice that the system would misinterpret.

These challenges highlighted a fundamental problem: molding LLMs to work for specific use cases is significantly harder than initial implementations suggest. The team found that what LLM providers present as simple solutions often involve hidden complexities that become apparent only at scale and in production environments.

### Web Search Complexity

Web search functionality exemplifies the gap between perceived and actual complexity. Most LLM providers market web search as a simple addition—essentially a single line of code to add a web search tool. However, in practice, Granola discovered several critical issues. Token usage and costs can escalate dramatically, especially for complex queries, potentially inflating context windows and making individual chat interactions cost-prohibitive at scale. When serving millions of users, these per-interaction costs become unsustainable.

More concerning was the lack of control over provider implementations. During development, Granola experienced a situation where they had been using a particular model successfully, only to have the provider ship an overnight update that degraded web search performance. This was completely outside their control, and they had no insight into what changed beyond the option to switch providers entirely. This experience reinforced that web search is fundamentally more complex than simply adding a tool to an LLM pipeline—a fact evidenced by the existence of billion-dollar companies dedicated solely to search functionality.

### Output Customization Challenges

Another significant challenge centered on output customization. While the generic summaries Granola generates might be adequate for general use cases, different user roles have vastly different needs. Sales professionals need summaries focused on deals and business opportunities. Engineering teams require action items, blockers, and integration with systems like Linear for ticket creation. HR professionals have entirely different requirements. A single prompt cannot effectively serve all these diverse needs, yet LLMs can be stubborn and difficult to control with precision.

The team recognized that LLM behavior is largely treated as a black box, but they wanted to dive deep into the details to understand exactly what was happening within their systems. This desire for deeper understanding and control led them to develop custom solutions rather than accepting the limitations of off-the-shelf tools.

## Custom Tracing Infrastructure

In response to these challenges, Granola built their own tracing tools, leveraging the ironic advantage that LLMs themselves can be used to one-shot the development of such tools. Their custom tracing system provides complete visibility into the entire lifecycle of LLM interactions, from beginning to end.

The tracing infrastructure captures individual tool calls, the reasoning behind those calls, search tool usage, and cost information, all structured exactly as the team needs it. The most valuable aspect of this approach is that the data structure and user interface are purpose-built to serve their internal teams—not just engineers, but also product managers, data analysts, and customer experience staff. This accessibility is critical: team members no longer need to dive into CloudWatch or construct complex queries to diagnose failures. Instead, they have a user-friendly interface that makes debugging and analysis straightforward.

The team acknowledges that previously, building such custom tooling would have been prohibitively time-consuming, leading companies to rely on SaaS providers instead. However, with LLMs accelerating development, building custom tracing tools that precisely serve an organization's needs has become feasible. While their implementation is relatively basic—essentially wrapping around AI SDK and saving data to a database—they note that teams could also leverage OpenTelemetry or other providers as foundations.

The front-end interface is emphasized as the most important component because it's what people actually use to diagnose issues. At Granola, even the founder uses this tool to follow agent loops completely from start to finish to pinpoint failures. This level of visibility transforms the debugging process from identifying vague issues like "this output feels off" to understanding exactly what failed in the execution chain. With this precision, iteration becomes targeted and effective, allowing the team to systematically improve specific failure modes rather than making blind adjustments.

## Development Infrastructure Transformation

Beyond observability, Granola addressed another significant challenge specific to their product architecture. Because they ship a desktop application, users can only run one instance at a time, which created substantial friction when testing new features, experimenting with variants, and conducting parallel tests of different approaches. The team recognized that LLMs enable one-shotting more features and creating more variants, which they value for experimentation purposes. They wanted the ability to show one feature looking completely different to four different users, but their desktop architecture made rapid testing difficult.

Traditional development workflows for their Electron app required running the application locally, installing dependencies, and coorduring complex setup procedures. If a coworker needed to test changes, they had to replicate this entire process. This lacked the conveniences that web applications enjoy, where preview deployments and parallel testing are straightforward.

### Web Shell Architecture

Granola's solution was to transform their Electron app's front-end into a web shell that could be deployed online. For those unfamiliar with Electron architecture, the framework consists of two main processes: the main process, which interacts with system APIs, and the render process, which handles the front-end interface. Granola abstracted their IPC APIs, which provide access to system functionality, to fall back to web standards when running in a web environment. They similarly adapted React-specific concerns like routing, session management, and query layers to use web standards. This approach made the render process agnostic to Electron, enabling it to run as a standard web application.

With this architecture in place, their continuous integration system automatically generates a preview link whenever a pull request is opened. Developers can immediately test changes in a browser without any local setup. This transformation dramatically accelerated their development cycle and reduced friction in the testing process.

### AI-Assisted Testing

The web shell deployment enabled an additional innovation: because LLMs can self-verify their work, they integrated automated testing where an AI agent tests changes when a PR is opened and uploads screenshots directly into the pull request. This automation further accelerates the review and testing process, providing immediate visual feedback on how changes appear in practice.

While this might seem like substantial engineering effort, the team emphasizes that the implementation was relatively straightforward given the componentization already present in modern front-end architectures. The key insight was recognizing that abstracting platform-specific APIs to fall back to web standards would enable the flexibility they needed.

### Impact on Feature Development

This infrastructure transformation had significant effects on their product development velocity and quality. The ability to rapidly test one feature in multiple variants means that by the time a feature ships, the team has confidence that they've explored the solution space thoroughly. They can experience features in practice rather than merely reviewing them in design tools like Figma. This hands-on experimentation leads to end products that "feel super good" because the team has validated multiple approaches and selected the best option based on actual usage rather than speculation.

## Philosophy and Approach

The overarching message from Granola's experience is that the answer to LLM production challenges isn't to "one-shot better"—that is, to craft better prompts or use more sophisticated models in isolation. Instead, success comes from establishing feedback loops that enable rapid iteration and deep understanding. The metaphor used is "playing a tennis game with LLM," suggesting a back-and-forth process of testing, observing, and refining.

This iterative approach, enabled by custom tracing tools and streamlined development infrastructure, transforms AI features from black boxes into systems the team can understand, control, and improve systematically. The result is products that feel like magic to end users rather than unpredictable systems that the team hopes will work well. Importantly, this approach gives the team conviction that what they're shipping will genuinely connect with users because they've validated it through extensive testing and observation.

## Critical Evaluation

While the presentation provides valuable insights into practical LLMOps challenges and solutions, several aspects deserve balanced consideration. The custom tracing tool development is presented as feasible due to LLM assistance, but the actual complexity and maintenance burden of such systems may be understated. Organizations should carefully evaluate whether custom tooling truly provides advantages over mature third-party observability platforms that offer extensive features, ongoing maintenance, and ecosystem integrations.

The web search cost concerns are valid and important, but the presentation doesn't explore alternative approaches such as hybrid retrieval systems, caching strategies, or more sophisticated routing that might address these issues without building entirely custom solutions. Similarly, while provider updates causing degradation is frustrating, this is also an argument for more robust evaluation frameworks and gradual rollout strategies rather than necessarily building custom solutions.

The web shell deployment strategy is genuinely innovative for desktop applications and addresses real constraints. However, organizations should consider the maintenance burden of supporting both desktop and web environments and ensure that the web shell adequately represents the production desktop experience for testing purposes.

The automated testing with LLM verification is intriguing but lacks detail on reliability, cost, and how false positives or negatives are handled. While AI-assisted testing shows promise, it should complement rather than replace traditional testing strategies, particularly for critical functionality.

Overall, Granola's approach demonstrates sophisticated thinking about LLMOps challenges and practical solutions tailored to their specific constraints. The emphasis on observability, rapid iteration, and hands-on testing aligns with best practices in production AI systems. However, teams should carefully evaluate whether custom solutions are necessary for their context or whether existing tools and practices might suffice, considering the long-term maintenance implications of custom infrastructure.
