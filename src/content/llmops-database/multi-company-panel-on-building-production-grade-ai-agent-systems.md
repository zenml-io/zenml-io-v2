---
title: "Multi-Company Panel on Building Production-Grade AI Agent Systems"
slug: "multi-company-panel-on-building-production-grade-ai-agent-systems"
draft: false
llmopsTags:
  - "healthcare"
  - "code-generation"
  - "data-analysis"
  - "high-stakes-application"
  - "regulatory-compliance"
  - "realtime-application"
  - "rag"
  - "prompt-engineering"
  - "few-shot"
  - "model-optimization"
  - "cost-optimization"
  - "latency-optimization"
  - "harness-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "chunking"
  - "evals"
  - "docker"
  - "kubernetes"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "load-balancing"
  - "microservices"
  - "cicd"
  - "scaling"
  - "serverless"
  - "devops"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "fastapi"
  - "pytorch"
  - "tensorflow"
  - "cache"
  - "redis"
  - "anthropic"
  - "openai"
  - "meta"
  - "microsoft-azure"
  - "amazon-aws"
  - "google-gcp"
industryTags: "tech"
company: "Abridge / Replit / Hebbia"
summary: "This panel discussion features engineering leaders from Abridge, Replit, and Hebbia discussing their experiences building sophisticated AI agent systems at production scale. Abridge tackles clinical documentation by recording and summarizing doctor-patient conversations for over 250 healthcare systems, addressing challenges around clinical compliance and trust. Replit builds autonomous coding agents that can plan, design, write, test, and debug software with increasingly long-running capabilities. Hebbia creates AI tooling for major financial institutions like KKR and Morgan Stanley, managing extremely spiky workloads with hundreds of thousands of agents processing high-value questions worth hundreds of millions of dollars. All three companies leverage Temporal for durable execution, have moved beyond proof-of-concept to production systems with high stakes, and share common challenges around reliability, cost optimization, model selection, and the evolving balance between agent autonomy and human control."
link: "https://www.youtube.com/watch?v=uC2m61JpyDs"
year: 2026
seo:
  title: "Abridge / Replit / Hebbia: Multi-Company Panel on Building Production-Grade AI Agent Systems - ZenML LLMOps Database"
  description: "This panel discussion features engineering leaders from Abridge, Replit, and Hebbia discussing their experiences building sophisticated AI agent systems at production scale. Abridge tackles clinical documentation by recording and summarizing doctor-patient conversations for over 250 healthcare systems, addressing challenges around clinical compliance and trust. Replit builds autonomous coding agents that can plan, design, write, test, and debug software with increasingly long-running capabilities. Hebbia creates AI tooling for major financial institutions like KKR and Morgan Stanley, managing extremely spiky workloads with hundreds of thousands of agents processing high-value questions worth hundreds of millions of dollars. All three companies leverage Temporal for durable execution, have moved beyond proof-of-concept to production systems with high stakes, and share common challenges around reliability, cost optimization, model selection, and the evolving balance between agent autonomy and human control."
  canonical: "https://www.zenml.io/llmops-database/multi-company-panel-on-building-production-grade-ai-agent-systems"
  ogTitle: "Abridge / Replit / Hebbia: Multi-Company Panel on Building Production-Grade AI Agent Systems - ZenML LLMOps Database"
  ogDescription: "This panel discussion features engineering leaders from Abridge, Replit, and Hebbia discussing their experiences building sophisticated AI agent systems at production scale. Abridge tackles clinical documentation by recording and summarizing doctor-patient conversations for over 250 healthcare systems, addressing challenges around clinical compliance and trust. Replit builds autonomous coding agents that can plan, design, write, test, and debug software with increasingly long-running capabilities. Hebbia creates AI tooling for major financial institutions like KKR and Morgan Stanley, managing extremely spiky workloads with hundreds of thousands of agents processing high-value questions worth hundreds of millions of dollars. All three companies leverage Temporal for durable execution, have moved beyond proof-of-concept to production systems with high stakes, and share common challenges around reliability, cost optimization, model selection, and the evolving balance between agent autonomy and human control."
notion:
  pageId: "373f8dff-2538-804b-a8c5-e55539baf88e"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-02T07:18:00.000Z"
  lastEditedTime: "2026-06-02T07:18:00.000Z"
  publishedAt: "2026-06-04T08:03:42Z"
---

This panel discussion provides a rich cross-sectional view of production AI agent systems across three distinct verticals: healthcare documentation, software development, and financial services. The companies represented are Abridge, Replit, and Hebbia, each building sophisticated multi-step AI pipelines that operate at significant scale with high-stakes requirements.

## Company Overview and Use Cases

**Abridge** operates in the healthcare space, recording, transcribing, and summarizing medical conversations between doctors and patients. The primary goal is reducing clinical burnout, which has reached epidemic levels in the healthcare industry. The system is deployed across over 250 major enterprise health systems including Kaiser Permanente, Sutter Health, and Mayo Clinic, making it one of the largest AI deployments in healthcare. The workflow is tightly integrated into clinical practice: doctors press record at the start of a patient encounter, forget about the system during the conversation, and within 90 seconds of creating a note request have a clinical documentation draft ready for review. The hardest challenge they face is building a production-grade AI system that is both clinically relevant and compliant, with trust and safety being paramount concerns.

**Replit** builds coding agents capable of planning, designing, writing, testing, debugging, and increasingly operating software autonomously. The company launched agents two years ago and has iterated through multiple versions, with Agent 3 representing a significant leap in capability when launched in September of the prior year. The biggest challenge they face is marrying LLM capabilities with distributed systems to achieve reliability at scale. Their agents are designed to be long-running and increasingly autonomous, capable of building complex applications end-to-end.

**Hebbia** develops AI tooling for some of the world's largest financial institutions including KKR, Morgan Stanley, and MetLife. These clients pose unique challenges because they're asking high-value questions that can involve hundreds of millions or even billions of dollars in capital, often under time pressure. This translates into extremely spiky workloads where a single job can spin up hundreds of thousands of agents executing multiple LLM calls. Managing these spiky loads with constrained resources, particularly token limits from different providers, represents one of the harder distributed systems problems the company faces.

## Evolution of Understanding and Architecture

All three companies described significant shifts in their thinking about AI agents over the past 12 months. A common theme emerged around the evolution from constraining agents to empowering them. Prior approaches focused on preventing agents from going down wrong paths, but advances in model capability, particularly with Claude and similar models, led to an inflection point where teams realized they could lean into agent capabilities and give them more tooling and autonomy. The discovery came somewhat suddenly, with teams coming into the office asking if colleagues had tried the new Claude release, particularly around previously difficult problems like Excel question answering that were once treated as parsing problems but could now be solved by simply giving the LLM Python tools.

From an organizational perspective, there was an initial expectation that teams building agents would be distinct from typical full-stack software engineers, but this distinction has blurred significantly. The challenge now is upskilling full-stack engineers to take on evaluation skills and basic data science capabilities. Some engineers naturally adapt and figure things out independently, while others benefit from more structured education and documented best practices.

An interesting learning from Replit was that they had launched a platform enabling other people to build custom agents about 12 months prior, which they now recognize may have been too early. Building agents doesn't come as naturally to most people as building traditional applications, and most people still think about agents narrowly as work automation rather than recognizing the broader possibilities.

## Critical Architectural Decisions

Each company identified architectural decisions that proved crucial to their success. For Replit, a major breakthrough came from decoupling the agent harness from the sandbox lifecycle. Initially they were running the agent harness within the sandbox, which impacted overall reliability because the agent was bound to the sandbox lifecycle. Decoupling these components not only improved infrastructure reliability but also led to better agent outcomes, as unreliable infrastructure would cause agents to try fixing problems that weren't actually related to the task at hand, wasting time and sometimes preventing successful outcomes. This architectural change coincided with their introduction of Temporal for durable execution.

For Hebbia, the most important principle wasn't a single architectural decision but rather a stance around flexibility and adaptability. They've found that decisions that seem correct often become wrong six months to a year later as capabilities shift dramatically. A key example is their approach to information retrieval. Hebbia was early to RAG, putting it into production in 2020, but quickly moved away from it because it wasn't delivering the quality of answers their customers needed. Their current approach, instead of using RAG to select potentially relevant context, breaks down entire documents into chunks and runs everything through an LLM. This became feasible as LLMs advanced to the point where they were both accurate enough and cheap enough to do this at scale. This flexibility to completely change approaches as the landscape evolves has been critical to their success.

## Autonomy, Control, and Human-in-the-Loop

The companies occupy different points on the spectrum of autonomy versus control, largely dictated by their domain constraints. Abridge operates under the tightest quality thresholds given the medical context. Their philosophy is that they will do extensive work in the background for clinicians, but the clinician always signs off on any documentation entering the medical record. They describe their role as being air conditioning for clinicians rather than replacing them. The workflow provides a tight feedback loop for training, as they have clear data on what was generated versus what the clinician ultimately submitted to the medical record. This human-in-the-loop approach is critical for quality and compliance reasons.

Replit takes a more ambitious approach to autonomy, with Agent 3 specifically focused on enabling fully autonomous, long-running agents capable of building complex applications. However, they pair this capability focus with a collaborative product philosophy. Users can view the workspace at any time, connect to sandboxes to observe applications as they're being built, and intervene when needed. They've implemented important controls like app testing and integration testing to ensure applications don't regress, preventing agents from running in loops. This combination of autonomous capability with collaborative interaction represents their balanced approach.

Hebbia faces a unique challenge in that the outputs they're creating are highly subjective. Two investment professionals might have completely different opinions about whether an investment is good. Their system focuses on aligning with the subjectivity of individual users, producing outputs that match what the specific user would create themselves. They achieve this through product features like skills, which allow clients to encode their subjective context into the system. This encoded context then enables the production of different levels of output using different levels of autonomy tailored to each user.

## Infrastructure and Operational Challenges

All three companies use Temporal as their foundation for durable execution, which speaks to the importance of workflow orchestration in production AI systems. Beyond this shared infrastructure, each company highlighted different operational challenges and missing primitives.

Replit called out the need for more reliable source control, particularly designed with agent workflows in mind. There was acknowledgment that new companies are emerging to address source control specifically for agents, representing an interesting space to watch.

Abridge is focused heavily on agent identity and access control, both in development processes and in production. The question of which datasets and systems agents should have access to is particularly critical in healthcare contexts given privacy and compliance requirements. While there are players in this space, the problem hasn't been fully solved yet.

Hebbia described in detail their custom-built infrastructure for handling their unique workload characteristics. They've created a service called Maximizer that acts as a routing and rate-limiting layer between clients and LLM providers. When agents need to call an LLM, they call out to Maximizer, which handles dynamic re-prioritization and rate limiting. If rate limits are available, requests are granted immediately; if not, they're queued. The dynamic prioritization is crucial because if a user leaves a page, the 100,000 agents that might be running for that page need to be immediately downgraded in priority. Maximizer also handles provider routing, so if three different providers offer GPT models, it does the matching. The system also incorporates feedback loops, so if a provider becomes unreliable due to high load, that feeds back into the queuing decisions. Hebbia expressed interest in seeing these kinds of semantics, particularly dynamic re-prioritization, potentially built into workflow systems like Temporal's queuing mechanisms. To illustrate scale, they mentioned a morning job that consumed 6 billion tokens within 10 minutes for a single user.

## Model Selection and Cost Management

Model strategy emerged as a critical and evolving concern for all three companies, with nuanced approaches reflecting their different constraints.

Abridge takes a hybrid approach, leveraging the latest frontier models in safe and useful ways while also running in-house models at scale. On the speech recognition side, they've built systems they believe outperform state-of-the-art specifically within medical and multilingual contexts. Better ASR leads to better downstream outputs, and they can run it faster, better, and cheaper than alternatives. On the language model side, they do extensive post-training with open source models. They were mentioned by OpenAI as part of a "trillion token club," and at that scale the economics of using frontier APIs become questionable. Their in-house models can meet or beat quality while being faster and less expensive to run, making this a critical piece of their inference strategy.

Availability is also a major concern for Abridge given they're mission-critical infrastructure for healthcare delivery. They hear from providers immediately when systems aren't responding, and they've faced challenges with frontier API reliability. Running production inference in-house provides them more control over availability in addition to the cost and performance benefits.

Replit's model strategy has evolved significantly over time. They started off heavily using Anthropic but now use almost 10 different models from three different providers. Cost, capability, and other factors all play important roles in their selection process. They're trying to build a fast and capable agent harness using different models for their various strengths, with some choices driven by cost and others by capability. Their pricing model has also evolved. They initially charged users per token, but found this doesn't work well for coding agents. Users want outcome-focused pricing, so they've moved to checkpoint-based billing that abstracts out token usage, allowing them to own the outcome while optimizing model selection under the hood. To manage availability concerns with frontier APIs, they use different labs and different cloud providers with complex fallback mechanisms to manage reliability without having to manually manage it.

Hebbia's workload characteristics give them a different perspective on model providers. While their overall footprint might be smaller than Abridge's, their challenge is handling massive spikes. They actually benefit from using provider APIs because the providers have the capacity to handle these spikes, essentially allowing Hebbia to piggyback on capacity that serves steadier workloads from other customers. All their models go through Maximizer, which serves as the critical routing and rate-limiting layer, making it a critical component that allows them to handle massive spikes in requests.

## Economic Realities and Future Outlook

A recurring theme in the discussion was concern about the economics of frontier model usage. There's an expectation across the panel that frontier model costs will continue increasing over time, not decreasing. This creates pressure to find alternatives and optimize costs.

All three companies expressed strong interest in the continued advancement of open source models as a counterbalance to frontier pricing. There's particular hope that US-based open source can keep pace with what the labs are producing, providing downward pressure on pricing. China has been producing interesting models, but there are concerns about which models will be allowed in production by different constituencies in the US, particularly for regulated industries.

From a capability perspective, there's recognition that a threshold has been crossed where open source models are already good enough for certain tasks, particularly in coding. As these continue to improve and costs decrease, it enables offering tools to more people, which is seen as broadly positive for democratizing software development and other capabilities.

Multimodal capabilities, particularly vision, were highlighted as an area of strong interest once pricing becomes more affordable and latency decreases. Hebbia shared an example of an oil and gas company using their system to analyze metrics that engineers write on paper at drill sites. The vision of being able to also pass in maps of drill sites and have the LLM understand spatial relationships between sites represents the kind of unlock that affordable multimodal capabilities could enable. The point was made that many use cases like the drill site example weren't anticipated, suggesting that affordable vision could unlock entirely new applications.

There's also recognition that the foundational model landscape is evolving in terms of target use cases. Early use cases were things like coding support and turning unstructured data into structured data, which are becoming commoditized with open source models. The cutting-edge models are now targeting institutions and governments with more sophisticated capabilities, and these high-end models will likely continue increasing in price as capabilities increase.

## Software Development Lifecycle Evolution

Beyond the immediate technical challenges, there was discussion of how the entire software development lifecycle is changing in response to AI capabilities. At Replit, as a company building coding agents, they try to adopt new capabilities very quickly internally, learning what works before applying it to their product. They believe their strength comes from leaning into these changes as much as possible. The whole industry is rethinking parts of the software development lifecycle including the inner loop, outer loop, code reviews, and CI/CD processes. How these will evolve remains to be seen, but represents a fundamental shift in how software is built.

This comprehensive view across three distinct production AI systems reveals common patterns in how sophisticated AI agents are being built and operated at scale: the critical importance of reliability and durability infrastructure, the ongoing challenge of balancing autonomy with appropriate human oversight, the complexity of managing costs and model selection across multiple providers, the necessity of building custom infrastructure for unique workload patterns, and the constant need for architectural flexibility as the underlying capabilities evolve rapidly. These are not proof-of-concept systems but production infrastructure powering critical workflows in healthcare, software development, and financial services, representing the current state of the art in LLMOps at scale.
