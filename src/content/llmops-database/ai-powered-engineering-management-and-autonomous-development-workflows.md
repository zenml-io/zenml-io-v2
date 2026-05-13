---
title: "AI-Powered Engineering Management and Autonomous Development Workflows"
slug: "ai-powered-engineering-management-and-autonomous-development-workflows"
draft: false
llmopsTags:
  - "code-generation"
  - "summarization"
  - "chatbot"
  - "document-processing"
  - "poc"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "harness-engineering"
  - "human-in-the-loop"
  - "latency-optimization"
  - "mcp"
  - "evals"
  - "cicd"
  - "docker"
  - "kubernetes"
  - "fastapi"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "continuous-integration"
  - "continuous-deployment"
  - "open-source"
  - "documentation"
  - "devops"
  - "scaling"
  - "microservices"
  - "anthropic"
  - "openai"
industryTags: "tech"
company: "Notion"
summary: "Ryan Nestrom, an Engineering Manager at Notion, demonstrates how AI has transformed engineering team management and software development workflows. The case study covers three primary use cases: automated meeting preparation using Notion AI custom agents that compile 24-hour activity updates from Slack, GitHub, Honeycomb metrics, and meeting transcripts to eliminate manual standup prep; background coding agents integrated via at-mentions that trigger virtual machines to autonomously generate pull requests from brief task descriptions; and spec-driven development where comprehensive markdown specifications serve as the source of truth, enabling coding agents like Aider to one-shot entire feature implementations. These approaches have eliminated meeting prep overhead, accelerated development velocity, and shifted engineering focus from implementation to architecture and verification, while maintaining high-quality output through automated testing and review processes."
link: "https://www.youtube.com/watch?v=pUHA_jNwuYE"
year: 2026
seo:
  title: "Notion: AI-Powered Engineering Management and Autonomous Development Workflows - ZenML LLMOps Database"
  description: "Ryan Nestrom, an Engineering Manager at Notion, demonstrates how AI has transformed engineering team management and software development workflows. The case study covers three primary use cases: automated meeting preparation using Notion AI custom agents that compile 24-hour activity updates from Slack, GitHub, Honeycomb metrics, and meeting transcripts to eliminate manual standup prep; background coding agents integrated via at-mentions that trigger virtual machines to autonomously generate pull requests from brief task descriptions; and spec-driven development where comprehensive markdown specifications serve as the source of truth, enabling coding agents like Aider to one-shot entire feature implementations. These approaches have eliminated meeting prep overhead, accelerated development velocity, and shifted engineering focus from implementation to architecture and verification, while maintaining high-quality output through automated testing and review processes."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-engineering-management-and-autonomous-development-workflows"
  ogTitle: "Notion: AI-Powered Engineering Management and Autonomous Development Workflows - ZenML LLMOps Database"
  ogDescription: "Ryan Nestrom, an Engineering Manager at Notion, demonstrates how AI has transformed engineering team management and software development workflows. The case study covers three primary use cases: automated meeting preparation using Notion AI custom agents that compile 24-hour activity updates from Slack, GitHub, Honeycomb metrics, and meeting transcripts to eliminate manual standup prep; background coding agents integrated via at-mentions that trigger virtual machines to autonomously generate pull requests from brief task descriptions; and spec-driven development where comprehensive markdown specifications serve as the source of truth, enabling coding agents like Aider to one-shot entire feature implementations. These approaches have eliminated meeting prep overhead, accelerated development velocity, and shifted engineering focus from implementation to architecture and verification, while maintaining high-quality output through automated testing and review processes."
notion:
  pageId: "35ff8dff-2538-802a-b0c5-f554f0e0d777"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-05-13T06:08:00.000Z"
  lastEditedTime: "2026-05-13T06:08:00.000Z"
  publishedAt: "2026-05-13T06:15:49Z"
---

## Overview

This case study presents a comprehensive view of how Notion's engineering organization, specifically through Engineering Manager Ryan Nestrom and his team working on the "Afterburner" project (focused on CI/CD optimization), has integrated AI agents and LLMs into production engineering workflows. Nestrom manages a team of six to seven engineers as a technical engineering manager who both manages people and writes code. The case study is particularly notable for demonstrating how AI has fundamentally changed not just coding practices but also team management, meeting structures, and the entire software development lifecycle.

The broader context is that Nestrom has been in software engineering for over 20 years, primarily with iOS and mobile development background, and describes the last year as one of unprecedented change where he has switched IDEs, terminals, and tools more than ten times. Despite this disruption, he reports experiencing more joy, freshness, and productivity than ever before in his career, working faster but in what he describes as a sustainable and energizing way.

## Use Case 1: Automated Meeting Preparation with Custom AI Agents

The first major production use case centers on completely reimagining how engineering standups and team meetings are conducted. Nestrom's team runs daily standups, and he recognized that traditional standups where team members go around in a circle giving rote updates are "painful and a huge waste of time." The goal was to eliminate the dead-eyed recitation of "I did this, I shipped this change" or "no updates for me, thanks" and instead focus meeting time on problems, decisions, wins, and findings.

The technical implementation leverages Notion AI's custom agent functionality. Nestrom created a custom agent nicknamed "Hot Potato" (fitting with a potato theme the team adopted for the Afterburner project, metaphorically turning CI from a cobbled-together mess into a rocket ship). The agent is configured to run automatically every day at 9:00 AM and is explicitly instructed to look back only at the last 24 hours of activity to keep information current and relevant.

The agent's architecture is sophisticated and demonstrates real production LLMOps considerations. It uses a map-reduce pattern where it fans out to multiple data sources and then synthesizes the information. The specific data sources include:

- The team's Slack project channel, searching for updates, feedback, questions, and general conversation
- The Notion task database, querying for tasks that were closed or updated within the project
- Pull requests from GitHub that have been merged
- Honeycomb metrics via MCP (Model Context Protocol) integration to pull the latest CI speed metrics
- The previous day's meeting transcript to maintain continuity

The agent is configured with explicit sub-agent capabilities, which Nestrom notes is a "sleeper feature" in Notion AI that isn't heavily promoted because it's expensive and can be finicky, but is crucial for this use case. The sub-agents allow parallel processing of different data sources before consolidation.

The output format is templated in the agent's instructions. The agent compiles a structured pre-read document covering: CI speed metrics, recent decisions made, progress on different projects and optimization efforts, bugs discovered, feedback received, open questions that need team discussion, and any risks or concerns. Importantly, Nestrom instructs the agent on tone, asking it to be brief, fun, and sometimes quirky. The agent posts results to Slack with context like "Hey, here's your pre-read" and occasionally adds personality like commenting "you guys are not making enough progress."

From a security and access control perspective, the agent is configured with view-only permissions for most databases (tasks, projects) to prevent accidental modifications, but has edit permissions specifically for the meetings database where it needs to write the daily summary. It can read from Slack channels and respond to the project channel, and has MCP access configured for Honeycomb queries.

The agent setup itself was meta-engineered using AI. Nestrom describes literally giving the agent a screenshot of a Honeycomb query rather than copying and pasting details, telling it "I don't know how this works. Can you just update your instructions?" The agent used OCR to read the screenshot and mostly configured itself with minor human adjustments needed.

The business impact is significant. What previously took 20 minutes of manual compilation daily (scanning Slack, checking GitHub, reviewing metrics, writing up summaries) is now automated. More importantly, it removes context-switching burden and protects engineering focus. Nestrom can work right up until the meeting starts without prep. The team spends the entire meeting discussing substantive issues rather than status updates. The detailed, automated summaries also democratize information sharing, surfacing contributions from quieter team members who might not naturally speak up in meetings but whose work is just as important. One example Nestrom gives is discovering from the automated summary that someone had fixed the mock server environment in tests, yielding a 13% test improvement that he had missed, which then sparked valuable discussion about additional optimization opportunities.

The broader organizational impact relates to burnout prevention. Managers can code up until meetings start rather than spending pre-meeting time on status compilation. This allows technical managers to maintain hands-on coding skills while still effectively managing teams, striking what Nestrom calls a "sweet spot" where he can support talented individuals without drowning in paperwork and administrative overhead.

## Use Case 2: Background Coding Agents with Virtual Machine Infrastructure

The second major use case demonstrates autonomous code generation in response to minimal task descriptions, enabled by infrastructure called "Boxy" (or "Software Factory") that runs coding agents in isolated virtual machines.

Prior to this system, Nestrom was using Aider's CLI and then the Aider app, but found himself writing prompts in Notion pages for better structure and formatting, then copy-pasting into terminals. This was workable but suboptimal. The Boxy system eliminates this friction by allowing engineers to invoke coding agents directly from Notion tasks via at-mentions.

The technical architecture involves virtual machines provisioned with Aider and Claude Code, which can be triggered from within Notion comments using at-mentions. When invoked, the system spins up an isolated VM environment, clones the relevant repository, and executes the coding agent against the specified task description and any attached context.

A concrete example occurred the morning of the interview when a friend texted Nestrom about wanting a "copy link to tab" feature for Notion's tab blocks. Nestrom created a task in Notion with a brief description (four sentences and one screenshot showing where the UI element should appear), mentioned some edge cases like handling URL landing on specific tabs, and noted a minor bug about hover states on delete buttons not turning red. The entire task description was three to four paragraphs.

Nestrom then at-mentioned Aider from the comments. The system began implementation at 10:40, replied with a pull request link and preview URL at 10:51 (11 minutes later), and completed the entire implementation about 10 minutes after that. The agent generated multiple files of changes, wrote up implementation notes, and notably performed its own UI verification by uploading screenshots demonstrating it had tested the functionality.

When a CI failure occurred with type checking issues, Nestrom simply replied "I don't know what is going on here. This doesn't make sense." The agent explained the reasoning behind the change and fixed the type errors. When a merge conflict appeared, it resolved that as well.

This interaction style represents a significant shift in code review dynamics. Instead of carefully crafting diplomatic code review comments to human colleagues, engineers can be blunt with agents: "I don't get it. Fix." Nestrom explicitly notes he's been adding to his prompts "I literally don't know what I'm doing here. You need to explain it like I'm a 5-year-old," especially when working on CI infrastructure where he's outside his core expertise. This directness would be problematic with human teammates but works perfectly with agents.

The choice of Aider as the primary coding agent is deliberate and based on several technical factors. Nestrom notes that when evaluating Claude Code versus Aider, he found Claude Code would lose context and "lose the plot" when filling up its context window, while Aider could "grind for hours" through long-running tasks, whether due to the model, context compaction strategies, or both. This long-running capability is crucial for Nestrom's working style where he fires off multiple agents simultaneously and round-robins between them while attending meetings or doing other work, rather than sitting and iterating in real-time with an agent. He optimizes for one-shot or near-one-shot solutions that free him up for other activities.

Additional factors in favoring Aider include its simplicity (not too many bells and whistles), support for MCP and skills, and strong performance with GPT-4 models. Nestrom also specifically praises Aider's code review capabilities, describing it as tireless and uncomplaining for even the most tedious review work.

From an operational perspective, the VM-based approach is crucial for velocity and developer experience. Engineers aren't spinning up changes on local machines. The isolated environments prevent conflicts and allow truly parallel work. Combined with fast CI, this creates a tight feedback loop where agents can complete work, run tests, get results, and iterate without human bottlenecks.

## Use Case 3: Spec-Driven Development with Autonomous Implementation

The third major use case represents perhaps the most forward-looking LLMOps pattern: using natural language specifications as the primary source of truth and single source of change control, with code generated deterministically from specs.

This approach emerged from a rebuild of Notion's entire agent harness. Like many organizations, Notion reached a point of "tool and instruction fatigue" with a bloated system prompt. They decided to simplify by borrowing the skills and progressive disclosure concepts from coding agents and applying them to Notion AI. During this rewrite, only six months after the previous rewrite, the team asked what they would do differently this time.

The key insight was to start with specifications rather than code. In practice, this means Notion maintains an agent-specs subfolder in their codebase containing comprehensive markdown documents for each feature or capability. These are not lightweight sketches but detailed technical specifications.

Nestrom's process for creating the "Ask Mode" feature specification illustrates the workflow:

- Started with an empty markdown document
- Used Whisper to record a voice session where he simply talked through how the feature should work
- Gave the transcribed yap session to Aider with the instruction: "Here's our other spec library, learn the format, take my information, write a spec"
- Aider generated the first draft; Nestrom did a couple revisions

The resulting spec is comprehensive and includes code pointers, implementation details, and crucially, a verification section at the bottom describing exactly how to verify the feature works correctly. Notion built custom CLI tools allowing agents to run Notion AI from the command line, send queries, enable/disable Ask Mode, and inspect transcripts to verify behavior.

With the spec complete, Nestrom then pointed Aider at it and said "Build it." The agent one-shotted the implementation because the spec was so comprehensive. The first pass took a couple hours and generated several thousand lines of code. Nestrom did code review and testing, and the implementation was correct and complete.

The ongoing workflow is equally important: the spec remains the source of truth in version control. When updates are needed, engineers update the spec markdown file, then tell the agent to make the code changes to match. The git history of the spec file becomes a readable changelog showing how the feature has evolved over time, which is far more accessible than trying to piece together the evolution from code commits alone.

This approach represents a fundamental shift in what engineering work means. Engineers become systems thinkers and architects rather than implementers. The critical human work is designing the behavior, considering edge cases, and most importantly, defining verification loops. As Nestrom emphasizes, if verification is unclear or hazy, the first priority should be building tools that allow agents to verify correctness, like the Notion AI CLI they built.

This pattern also isn't entirely new from an organizational perspective. Software teams have always written technical design documents and specifications, and held meetings to debate implementation approaches. The difference is the dramatically compressed timeline: specs don't wait for review meetings and coordinated calendar availability. Engineers write specs, agents implement, verification runs, and debate happens on working code rather than theoretical designs.

## Developer Experience and CI/CD as AI Enablers

A critical thread throughout the case study is the emphasis on developer experience and CI speed as fundamental enablers of AI-powered development, not ancillary concerns.

Nestrom was recruited to the Afterburner project specifically to bring "puppy dog energy" to improving Notion's CI performance, which he felt was slower than necessary. The aggressive goal was to cut CI time to a quarter of the current duration, and the team was on track to achieve this.

The reasoning for prioritizing CI speed is multifaceted. Even before agents, faster CI meant faster feedback loops, which made engineers more comfortable making changes and shipping to production quickly. Engineers could learn through doing, pushing changes, getting user feedback, and iterating rapidly without deploy train delays.

With agents, fast CI becomes even more critical. Agents don't tire and can work continuously, including while humans sleep. If CI takes an hour to run, agents sit idle waiting for results before proceeding. If CI takes three minutes, both humans and their "swarm of agents" accomplish dramatically more work. There's a mathematical limit on code shipping capacity directly related to CI pipeline speed.

The case study references that Stripe is doing 1,300 agent-generated PRs per week, which is impossible without fast CI. Slow CI creates a bottleneck that negates the productivity gains from agents. Organizations tolerating slow CI won't realize AI's full potential benefits.

Nestrom's personal workflow demonstrates this in practice. He describes running multiple work trees, with ports 3000 through 3009 all occupied by different parallel development efforts. This level of parallelism requires both fast CI and robust developer experience infrastructure.

## Model Selection and Tool Preferences

The case study reveals thoughtful model and tool selection driven by real production needs rather than hype.

For coding agents, Aider running GPT-4 models (presumably GPT-4 Turbo or similar) is the primary choice, selected for long-running task capability, context management, simplicity, and code review quality.

For the meeting automation agent, the implementation uses Notion AI, which in turn can be configured with various underlying models. The sub-agent capability and MCP integration are highlighted as important features despite being expensive and somewhat finicky.

Notion's overall AI harness rebuild focused on reducing bloat and implementing progressive disclosure, borrowing concepts from coding agents. This suggests a maturing understanding of how to architect production LLM systems that scale.

The use of MCP (Model Context Protocol) for Honeycomb integration demonstrates integration patterns for pulling external data into agent workflows. The agent was able to self-configure its MCP integration from a screenshot, showing both the power and the pragmatic "good enough" approach to agent tooling.

## Organizational and Cultural Shifts

Beyond the technical implementations, the case study illuminates significant organizational changes.

Meeting culture has transformed. High-quality, high-frequency, high-bandwidth meetings are now achievable without corresponding overhead. Remote teams in particular benefit from rich, detailed status updates that don't require synchronous information gathering.

The role of engineering managers is evolving. Technical managers can maintain hands-on coding contributions while effectively managing teams, avoiding the traditional forced choice between technical work and people management. This addresses burnout by allowing managers to engage in creative, fulfilling technical work rather than spending days on status compilation and reporting.

Code review dynamics have shifted. The emotional labor of carefully worded feedback to human colleagues doesn't apply to agents. Engineers can be direct, admit ignorance freely, and ask for explanations "like I'm a 5-year-old" without social friction.

The concept of engineering work itself is changing. After 20+ years of writing code, Nestrom describes writing specs and letting agents implement as not adding work but shifting emphasis. The documents (technical designs, specs) were always being written; the difference is they're now executable without manual coding labor, and decisions happen on working code rather than theoretical designs.

Teams known for moving fast and being "AI-ed" are being recruited to bring that energy to other parts of the organization, as happened with Nestrom being pulled into CI/CD work despite not being an infrastructure or CI expert.

## Production LLMOps Considerations

Several production LLMOps patterns emerge:

**Access control and permissions**: The meeting agent demonstrates thoughtful permission scoping, with view-only access to most resources and edit permissions only where needed for writing meeting summaries.

**Cost management**: Sub-agents are noted as expensive, requiring conscious decisions about when to use them.

**Reliability and flakiness**: Sub-agents are described as "finicky," indicating these systems require operational maturity and monitoring.

**Verification loops**: The emphasis on building tools (like the Notion AI CLI) specifically to allow agents to verify their own work represents a key LLMOps pattern. Verification capability should precede autonomous implementation.

**Iteration and debugging**: When agents fail or produce unclear results, the human approach is direct correction and re-prompting rather than abandoning automation. Nestrom describes being "a little bit of a diva" when agents go off the rails, and demanding agents defend their reasoning with cited evidence rather than accepting hand-wavy reassurances.

**Prompting strategies**: Explicit prompting patterns include admitting ignorance, asking for simple explanations, demanding evidence and citations, and providing templates for output format. The instruction to be "brief and fun" for the meeting agent shows attention to user experience even in automated outputs.

**Infrastructure investment**: The Boxy VM system represents significant infrastructure investment to enable agent workflows, not just adopting off-the-shelf tools.

**Source control integration**: Keeping specs in git alongside code, using git history for changelogs, and treating specs as the source of truth all demonstrate mature software engineering practices applied to AI-driven development.

## Challenges and Balanced Assessment

While the case study is overwhelmingly positive, some challenges and limitations emerge:

The pace of change is genuinely disruptive, with Nestrom changing core development tools ten times in a year. While he finds this energizing, it represents significant organizational overhead and learning curves.

Sub-agents are expensive and finicky, requiring cost-benefit analysis for each use case.

Not all engineers may share Nestrom's enthusiasm for constant tool switching and AI-first workflows. The case study self-selects for an early adopter who thrives in rapidly changing environments.

The Boxy system and custom infrastructure represent significant engineering investment that smaller organizations might struggle to replicate.

The emphasis on verification and testing suggests these systems require robust test suites and verification infrastructure to work safely. Organizations with weak testing cultures might struggle to adopt similar patterns.

The one-shot or near-one-shot goal for agent tasks suggests there's still human review and intervention needed; these aren't fully autonomous systems yet.

## Conclusion

This case study represents a comprehensive view of LLMs in production across multiple dimensions: meeting automation and team management, autonomous code generation with background agents, and spec-driven development where natural language specifications become executable source of truth. The implementations demonstrate mature LLMOps practices including thoughtful access control, cost management, verification loops, and infrastructure investment. The organizational impacts extend beyond code velocity to meeting culture, manager roles, and the fundamental nature of engineering work. The emphasis on developer experience and CI speed as enablers rather than afterthoughts reflects sophisticated understanding of how to realize AI's potential benefits in software development at scale.
