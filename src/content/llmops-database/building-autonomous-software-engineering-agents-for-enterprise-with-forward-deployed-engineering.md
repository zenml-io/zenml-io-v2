---
title: "Building Autonomous Software Engineering Agents for Enterprise with Forward Deployed Engineering"
slug: "building-autonomous-software-engineering-agents-for-enterprise-with-forward-deployed-engineering"
draft: false
llmopsTags:
  - "code-generation"
  - "agent-based"
  - "harness-engineering"
  - "prompt-engineering"
  - "multi-agent-systems"
  - "human-in-the-loop"
  - "monitoring"
  - "cicd"
  - "devops"
  - "orchestration"
  - "continuous-deployment"
  - "continuous-integration"
  - "guardrails"
  - "security"
  - "anthropic"
  - "openai"
  - "google-gcp"
  - "microsoft-azure"
  - "hugging-face"
industryTags: "tech"
company: "Factory"
summary: "Factory, a company building autonomous software engineering agents for enterprise teams, employs forward deployed engineers to embed AI-powered software development capabilities within customer organizations. Rather than performing traditional professional services work, Factory's deployed engineers act as the \"tip of the spear\" for product development, gathering deep insights from enterprise customers to refine their Droid agent harness platform. The solution focuses on creating \"software factories\" - end-to-end automated pipelines that transform business signals into deployed code with minimal human intervention. Success requires making customer codebases \"agent-ready\" through extensive validation loops and verification systems, with some customers achieving high levels of autonomy including 15-20% fully autonomous code changes and autonomy ratios in the upper 80% range."
link: "https://www.youtube.com/watch?v=wpOA-UXynoM"
year: 2026
seo:
  title: "Factory: Building Autonomous Software Engineering Agents for Enterprise with Forward Deployed Engineering - ZenML LLMOps Database"
  description: "Factory, a company building autonomous software engineering agents for enterprise teams, employs forward deployed engineers to embed AI-powered software development capabilities within customer organizations. Rather than performing traditional professional services work, Factory's deployed engineers act as the \"tip of the spear\" for product development, gathering deep insights from enterprise customers to refine their Droid agent harness platform. The solution focuses on creating \"software factories\" - end-to-end automated pipelines that transform business signals into deployed code with minimal human intervention. Success requires making customer codebases \"agent-ready\" through extensive validation loops and verification systems, with some customers achieving high levels of autonomy including 15-20% fully autonomous code changes and autonomy ratios in the upper 80% range."
  canonical: "https://www.zenml.io/llmops-database/building-autonomous-software-engineering-agents-for-enterprise-with-forward-deployed-engineering"
  ogTitle: "Factory: Building Autonomous Software Engineering Agents for Enterprise with Forward Deployed Engineering - ZenML LLMOps Database"
  ogDescription: "Factory, a company building autonomous software engineering agents for enterprise teams, employs forward deployed engineers to embed AI-powered software development capabilities within customer organizations. Rather than performing traditional professional services work, Factory's deployed engineers act as the \"tip of the spear\" for product development, gathering deep insights from enterprise customers to refine their Droid agent harness platform. The solution focuses on creating \"software factories\" - end-to-end automated pipelines that transform business signals into deployed code with minimal human intervention. Success requires making customer codebases \"agent-ready\" through extensive validation loops and verification systems, with some customers achieving high levels of autonomy including 15-20% fully autonomous code changes and autonomy ratios in the upper 80% range."
notion:
  pageId: "3b4f8dff-2538-80f5-a698-fed68e1a8139"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:31:00.000Z"
  lastEditedTime: "2026-08-06T11:31:00.000Z"
  publishedAt: "2026-08-06T11:46:26Z"
---

Factory is building autonomous software engineering agents for enterprise teams through a platform called Droid. The company has adopted a distinctive approach to forward deployed engineering that differs significantly from traditional models pioneered by companies like Palantir. Rather than embedding engineers to perform professional services work or custom development on behalf of customers, Factory's deployed engineers serve as a critical feedback mechanism between large enterprise customers and the product team.

## Overall Architecture and Product Vision

At the core of Factory's offering is the concept of a "software factory" - an instrumented, AI-enhanced pipeline that transforms business signals into deployed software with minimal human intervention. The company views software development as an implicit feedback loop that exists at every organization: signals from the outside world (customer conversations, bug reports, internal communications, executive directives) flow into the system, humans prioritize and plan around these signals, developers convert plans into code changes, those changes flow through validation stages (code review, QA, security analysis, automated testing with SAST tools, linters, type checkers), and finally the software is deployed and monitored, generating new signals that restart the cycle.

Factory's thesis is that this feedback loop is poorly instrumented at most organizations, and that AI can transform each stage of this pipeline. The end goal is achieving a flow from signal to deployment that has no human interruption, though this explicitly does not mean humans are removed from engineering - rather, they shift from directly manipulating software to maintaining and managing the system that builds software.

## The Droid Platform and Model Independence

The Droid harness is Factory's canonical, model-independent agent platform that provides the foundation for building these software factories. Model independence is treated as a critical architectural principle for several reasons. First, vendor lock-in to a single model provider creates financial risk and limits flexibility. Second, there are concerns about model providers potentially dictating what customers can or cannot build with their software factories. Third, owning all traces and data that flow through the system is essential for evolving the software factory over time.

The platform provides centralized governance and control at the enterprise layer, allowing organizations to dictate where information flows. Droid can be air-gapped for customers in highly secure environments including finance, healthcare, and government sectors. Factory engineers mention that Droid could theoretically run in a submarine if needed, emphasizing the platform's ability to operate in completely isolated environments.

The product encompasses multiple components including enterprise controls, the Droid harness itself, workflows that run on top of it, observability tools, cost controls, automated model routing, and the overall quality of the harness. Each of these represents potential areas for improvement that deployed engineers discover while working closely with diverse customer organizations.

## Forward Deployed Engineering Model

Factory's deployed engineers differ from traditional models in several key ways. They are explicitly not doing professional services work - if a customer requests a codebase modernization that would typically be quoted by consulting firms, Factory's goal is not to execute that migration on the customer's behalf, even using Factory's own product. The reasoning is that such work doesn't meaningfully improve the product and doesn't scale as a business model.

Instead, deployed engineers serve as an information conduit from large critical customers back to the product team. They embed with engineering leadership and on-the-ground tactical engineers to understand thought processes around software development and AI adoption, then rapidly feed this information back to adjust the product to fit customer environments better. The ultimate goal is for Factory's platform to self-assemble inside customer environments with minimal manual intervention - a necessity when dealing with organizations that may have 45,000 people, tens of thousands of engineers, and potentially tens of thousands of codebases.

The role encompasses several key responsibilities: teaching customers about the autonomy maturity model and what it means to build an autonomous software organization, making codebases agent-ready through the introduction of validation loops, designing workflows that fit into existing development practices, and constructing clear ROI stories that connect software factory outputs to core business goals. For example, demonstrating that AI-assisted code review, QA, and security analysis reduces bug rates by a specific percentage, which in turn increases customer satisfaction and drives revenue growth.

## Agent Readiness and Validation Loops

A critical concept that Factory has developed is "agent readiness" - a measure of how many deterministic validation loops are present inside a codebase. Most organizations have some degree of consistency in how they've built deterministic validation: linters, type checkers, security scans, end-to-end tests that either pass or fail. Agent readiness quantifies the volume and quality of these feedback loops.

The fundamental principle is that when a codebase has a huge volume of these feedback loops, agents can operate for greater periods of time on more complex tasks without human intervention. The quality of output from long-running agent harnesses is directly proportional to the degree to which their work can be validated. If validation can be introduced at scale, autonomy increases proportionally.

Factory has developed tools to scan codebases and identify opportunities to improve agent readiness. Approximately 30-40% of the low-hanging fruit can be fixed by simply instructing Droid to address the issues automatically. However, the remaining 60% involves workflow changes and human adaptation. Humans are not always accustomed to the "nitpickiness" of automated systems, so deployed engineers must carefully introduce validation strategies without disrupting existing development workflows and while addressing human concerns.

This approach aligns with how modern language models are actually trained. Models receive dense reward signals during post-training on complex tasks. In the same way, verification signals form the basis of the reward that keeps agents on track over long-term, goal-directed problems.

## Missions: Long-Running Autonomous Harnesses

Factory has developed a product called Missions that represents what they consider the "end game of the agent era" before reaching full software factory automation. Missions is an elaborate harness built around the concept of working on extremely difficult knowledge work problems that are validatable. It operates as a long-running harness with almost no human intervention except for the planning stage.

The workflow for Missions is straightforward: define a very bounded task, specify what "solving this task" means in verifiable terms, and then push a lever of inference until the task is complete. The system is described as "unbelievably competent" at solving problems where completion is verifiable. The key insight is that if any problem can be framed as a set of verification systems that need to validate it, that problem can be solved with AI today.

Factory has seen Missions applied to remarkably complex problems including migrating 30-50 million line codebases fully autonomously, working on advanced deep learning strategies around biomedical and healthcare problems, and building models for financial institutions to optimize equity research with systems that analyze, compare, and potentially trade on equities. However, success with Missions absolutely requires agent readiness - without a properly prepared codebase, even the most capable AI systems will fail.

## Autonomy Metrics and Current State

Factory tracks two key metrics around autonomy. The "autonomy percentage" represents the proportion of changes that are fully autonomous. The "autonomy ratio" measures the ratio of actions done by humans to AI systems before interruption. Factory's own codebase has achieved roughly 15-20% autonomy with an autonomy ratio in the upper 80%, meaning most action sequences are dominated by AI with minimal human interruption.

Interestingly, some customer codebases are actually more autonomous than Factory's own because they operate in more constrained domains. Factory has found that it's not obvious which types of software will reach 100% autonomy first - the prediction is that very contained internal tools will likely be first. For example, Factory has an internal "legal droid" workflow for legal tasks that is effectively 100% autonomously maintained.

However, Factory's core harness is not yet fully autonomous because they lack validators that can validate certain hard visual problems in their terminal-based harness. Issues like visual flickering are difficult to catch in a verifiable way, so the loop cannot yet be closed on those challenges. This illustrates an important point about the future of work: building the verification systems to validate difficult problems is itself an engineering task, and humans have advantages in visual processing and contextual understanding that provide substantial work in building these systems.

## Scaling Strategy and Change Management

Factory's approach to scaling emphasizes creating working examples rather than building complete solutions for every customer. The analogy used is Walt Disney's original vision for Epcot - creating an exemplary model city that would inspire other cities to adopt similar innovations. While Epcot became a theme park, some contemporary cities did cite Disney's ideas about centralized urban transit when developing their infrastructure.

Factory aims to create a "working example of a city of the future, of a codebase of the future" that demonstrates what's possible without being so advanced that it seems like an unreachable theme park. The balance is critical: build something that demonstrates the future is achievable, but don't scare away organizations worried about transformation costs. The philosophy is that humans are smart and clever - if shown a compelling example, they'll figure out how to bring those ideas to their own parts of the codebase.

This philosophy acknowledges the uneven distribution of technological advancement. There are specific codebases (not even entire companies, but individual codebases within companies) that are truly remarkable and beginning to run on autopilot. The future exists in pockets, and the deployed engineer's role is to expand those pockets thoughtfully.

## Critical Assessment and Tradeoffs

While Factory's vision is compelling, several important considerations and potential concerns emerge. The claim that "if you can frame any problem as the set of verification systems that need to validate it, then you can solve that problem with AI today" is bold but comes with significant caveats. This only works for problems where comprehensive verification is possible, which excludes many creative, open-ended, or novel problem domains where success criteria are emergent or subjective.

The requirement for agent readiness creates a substantial upfront investment that may not be trivial. The 60% of improvements that require workflow changes and human adaptation could face significant organizational resistance. The presentation acknowledges humans must adapt to the "nitpickiness" of automated systems, but this cultural change could be more challenging than portrayed, particularly in organizations with established engineering cultures.

The model independence claim is valuable, but the platform still represents vendor lock-in to Factory's own harness and architecture. While customers own their data and traces, migrating away from the Droid platform after deep integration would likely be complex. The air-gapped deployment capability is genuinely impressive for security-conscious industries but may limit the ability to benefit from centralized model improvements and shared learnings.

The shift from engineers directly writing code to maintaining systems that write code represents a fundamental change in the nature of engineering work. While presented as an "upgrade in the level of abstraction," this may not suit all engineers or all problem domains. The acknowledgment that "most people, even very thoughtful software engineers, will have a learning curve" suggests this transition could be more disruptive than optimistic framing suggests.

The economic model is interesting - explicitly rejecting professional services revenue in favor of product improvement and scalability is admirable from a product perspective but may limit near-term revenue opportunities. The success of this model depends on the platform becoming genuinely self-assembling, which remains an aspirational goal for complex enterprise environments.

Finally, the metrics shared (15-20% autonomy, upper 80% autonomy ratio) suggest we're still in early stages despite remarkable progress. The visual validation problem with Factory's own terminal harness demonstrates that even the company building autonomous systems faces fundamental challenges in achieving full autonomy. This honest acknowledgment is refreshing but also illustrates that the "software factory" vision of signal-to-deployment without human interruption remains substantially in the future for most organizations and use cases.
