---
title: "Automating Field Development Engineering Workflows with Agentic AI"
slug: "automating-field-development-engineering-workflows-with-agentic-ai"
draft: false
llmopsTags:
  - "customer-support"
  - "document-processing"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "rag"
  - "latency-optimization"
  - "human-in-the-loop"
  - "evals"
  - "harness-engineering"
industryTags: "finance"
company: "Ramp"
summary: "Ramp's Field Development Engineering (FDE) team evolved their approach to scaling enterprise customer support by implementing AI agents to automate the requirements gathering and scoping process. The team built an agent-powered system using Notion that automatically engages with internal stakeholders submitting feature requests, conducts multi-round questioning to gather necessary context, and ultimately generates well-scoped specifications. This initiative saved approximately 20% of the time previously spent manually scoping requests while dramatically reducing response latency from hours or days to seconds, enabling the 30-person FDE organization to better support Ramp's enterprise customers without proportionally scaling headcount."
link: "https://www.youtube.com/watch?v=ITMXwI6QL6A"
year: 2026
seo:
  title: "Ramp: Automating Field Development Engineering Workflows with Agentic AI - ZenML LLMOps Database"
  description: "Ramp's Field Development Engineering (FDE) team evolved their approach to scaling enterprise customer support by implementing AI agents to automate the requirements gathering and scoping process. The team built an agent-powered system using Notion that automatically engages with internal stakeholders submitting feature requests, conducts multi-round questioning to gather necessary context, and ultimately generates well-scoped specifications. This initiative saved approximately 20% of the time previously spent manually scoping requests while dramatically reducing response latency from hours or days to seconds, enabling the 30-person FDE organization to better support Ramp's enterprise customers without proportionally scaling headcount."
  canonical: "https://www.zenml.io/llmops-database/automating-field-development-engineering-workflows-with-agentic-ai"
  ogTitle: "Ramp: Automating Field Development Engineering Workflows with Agentic AI - ZenML LLMOps Database"
  ogDescription: "Ramp's Field Development Engineering (FDE) team evolved their approach to scaling enterprise customer support by implementing AI agents to automate the requirements gathering and scoping process. The team built an agent-powered system using Notion that automatically engages with internal stakeholders submitting feature requests, conducts multi-round questioning to gather necessary context, and ultimately generates well-scoped specifications. This initiative saved approximately 20% of the time previously spent manually scoping requests while dramatically reducing response latency from hours or days to seconds, enabling the 30-person FDE organization to better support Ramp's enterprise customers without proportionally scaling headcount."
notion:
  pageId: "3b4f8dff-2538-80f2-8dce-f72c94408bd0"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:27:00.000Z"
  lastEditedTime: "2026-08-06T11:27:00.000Z"
  publishedAt: "2026-08-06T11:47:26Z"
---

## Overview

Ramp, a financial technology company, has developed an innovative approach to scaling their Field Development Engineering organization through agentic AI systems. The FDE team at Ramp, which has grown from 2 engineers to approximately 30 engineers across four functions (deployed, developer API, and AI services), focuses on helping Ramp win upmarket by making core products and agentic features work effectively for large enterprise customers. This case study presents a practical example of how LLMs are being deployed in production to automate knowledge work traditionally performed by engineers, specifically the critical but time-consuming process of requirements gathering and feature scoping.

The presentation articulates two core principles that guide Ramp's FDE approach: "always be scoping" and "scale with tokens." The first principle emphasizes the importance of building the right thing rather than simply saying yes to every customer request. The second principle recognizes that to remain competitive, organizations must leverage model capabilities to automate increasingly sophisticated workflows. The intersection of these principles led to the development of an agent-based system that automates the scoping process while maintaining the quality standards that prevent poor engineering decisions.

## The Business Problem and Context

The FDE team at Ramp operates within the engineering organization with a mandate to help the company succeed with large enterprise customers. This involves customizing core products and developing new agentic features tailored to enterprise needs. A critical challenge emerged as the team scaled: handling the high volume and variance of feature requests coming from account managers, customer success managers, and sales representatives.

These requests arrived through an internal Slack channel called "FDE requests" and were documented in Notion. The quality and completeness of these requests varied dramatically—some submissions were comprehensive and well-detailed, while others consisted of single-line descriptions like "we need an SAP integration." Before automation, FDE engineers manually processed each request, reading through documentation, understanding context, researching existing product capabilities, and conducting extensive back-and-forth with stakeholders to validate requirements.

The presentation shared concrete examples of why scoping is critical. In one case, the team spent weeks building a reimbursement feature for both iOS and Android platforms, only to discover during rollout that the customer mandated iOS-only devices for all employees, rendering half the work unnecessary. Another example involved urgent requests for integrations like SAP S/4HANA, where perceived urgency was sometimes driven by sales quotas rather than actual customer needs. These experiences reinforced that thorough upfront scoping prevents wasted engineering effort and ensures alignment between what's built and what's actually needed.

## The AI-Powered Solution Architecture

Ramp's solution involved building an agent-based system integrated with Notion to automate the initial stages of the request scoping pipeline. The system represents a practical implementation of agentic AI in a production enterprise environment, designed to handle real-world variance in request quality while maintaining the rigor necessary for sound engineering decisions.

The agent workflow begins when a request is submitted to the FDE requests channel. The initial version of the system performed basic analysis of the request and posed follow-up questions to the submitter. This simple first iteration proved valuable enough that the team expanded it into a more sophisticated multi-round questioning system. The current implementation conducts several rounds of back-and-forth dialogue with the submitter, asking clarifying questions until it determines that sufficient context has been gathered to create a specification.

The system is designed to be approachable and encourage engagement—the team even added a penguin mascot to make the interaction feel more friendly. This attention to user experience reflects an understanding that adoption of AI systems within organizations depends not just on technical capability but also on how people perceive and interact with the tools.

## Production Deployment and Results

The deployment of this agent system delivered measurable impact across multiple dimensions. Most significantly, response latency dropped from hours or days to seconds, enabling much faster engagement with stakeholders. The team estimates the system saves approximately 20% of the time previously spent on manually scoping requests, representing substantial efficiency gains for a 30-person organization.

Beyond time savings, the system improved consistency in the scoping process. By systematically gathering necessary information through structured questioning, the agent helps ensure that critical details aren't overlooked even when initial submissions are sparse. The immediate engagement also changed stakeholder behavior—account managers and sales representatives began interacting with the agent more proactively, knowing they would receive rapid feedback rather than waiting for engineer availability.

The presentation characterized this implementation as addressing the first stage of a larger pipeline that encompasses the entire FDE workflow: gathering context, scoping requests, writing specifications, and implementing features. While frontier models can increasingly handle the final implementation stage for medium-sized features through one-shot generation, the middle stages—particularly converting gathered context into well-formed specifications—remain challenging and represent ongoing areas of investment.

## LLMOps Challenges and Considerations

The case study surfaces several important LLMOps challenges that emerge when deploying agents in production environments. A primary concern is context management—ensuring the agent has access to the right information when processing requests. This includes historical data about previous requests and implementations, detailed product knowledge that typically resides in product managers' tacit understanding, and existing documentation spread across Notion and help articles. The presentation acknowledged that existing knowledge bases only partially capture this institutional knowledge, creating a gap that impacts agent effectiveness.

Quality assurance represents another critical challenge. The organization needs mechanisms to evaluate the quality of agent outputs at each stage of the pipeline. The presentation mentioned evaluations, rubrics, and human feedback as approaches to quality control, though specific implementation details weren't provided. This reflects a common LLMOps pattern where human oversight remains essential even as automation increases, particularly for high-stakes decisions that impact customer commitments and engineering resource allocation.

The discussion emphasized that despite increasing automation, FDE engineers retain responsibility for "taste and judgment over the final output." This human-in-the-loop approach recognizes that while agents can handle much of the mechanical work of information gathering and initial analysis, final decisions about what to build require human expertise that incorporates business context, technical feasibility, strategic priorities, and customer relationships.

## The Broader Vision: Agent Factories

The presentation articulated an ambitious vision for the future of FDE work centered on building what was termed an "agent factory"—a comprehensive system of agents handling different stages of the requirements-to-implementation pipeline. Looking ahead six to twelve months, the expectation is that FDE engineers will spend most of their time on applied AI problems: ensuring agent harnesses run smoothly, maintaining output quality through evaluations and feedback mechanisms, and solving context provisioning challenges.

This vision includes equipping agents with appropriate skills, memories, and tools to effectively replicate the work previously done by human engineers. The presentation emphasized this isn't about completely removing humans from the process but rather elevating their role from executing routine scoping and implementation tasks to managing and improving the agent systems that handle those tasks.

An important cautionary point was raised about the risks of automation without proper scoping discipline. The presentation warned against creating a "token-maxing slop cannon"—a system that generates large volumes of low-quality output because it lacks the scoping discipline to focus on the right problems. This reflects a mature understanding that LLM capabilities must be paired with strong engineering practices rather than simply deployed to maximize throughput.

Conversely, the presentation noted that excellent scoping practices without investment in automation will leave organizations vulnerable to "agent-native competitors" who can move faster and scale more efficiently. This creates a mandate for organizations to pursue both dimensions simultaneously: maintaining rigorous engineering discipline while aggressively adopting AI capabilities.

## Insights on Production LLM Deployment

This case study offers several valuable insights for organizations deploying LLMs in production. First, it demonstrates the value of starting with targeted, well-defined use cases rather than attempting comprehensive automation immediately. The initial agent version simply asked a few questions, yet proved valuable enough to justify expansion. This iterative approach allows teams to learn about agent behavior, user interaction patterns, and integration challenges in a controlled context before scaling up.

Second, the case illustrates how latency improvements can drive behavioral change and adoption. By reducing response times from hours to seconds, the agent fundamentally changed how stakeholders engaged with the scoping process, making it more interactive and dynamic rather than a batch-oriented workflow.

Third, the presentation highlighted the importance of thinking about end-to-end pipelines rather than isolated automation opportunities. While the current implementation addresses the first stage of the FDE workflow, the broader vision encompasses the entire process from request to implementation. This systems-level thinking helps ensure that individual automation efforts contribute to a coherent overall architecture rather than creating disconnected point solutions.

Fourth, the case demonstrates the reality that different stages of knowledge work pipelines have different levels of automation readiness. Code generation for well-scoped features is becoming increasingly tractable with frontier models, while the middle stages of analysis and specification generation remain more challenging. Understanding these gradients helps prioritize development efforts and set realistic expectations.

Finally, the emphasis on maintaining human judgment and taste reflects an important principle for production LLM systems: automation should augment and elevate human capabilities rather than simply replace them. The goal is to free engineers from routine tasks so they can focus on higher-level problems like system design, quality assurance, and strategic decision-making about what capabilities to build.

## Technical Implementation Details

While the presentation focused more on principles and outcomes than low-level implementation details, it revealed that Notion serves as the primary platform for the agent system. The integration with Notion workflows allows the agent to access request documentation, engage with submitters, and generate outputs within the tools the team already uses daily. This approach of embedding AI capabilities into existing workflows rather than requiring adoption of entirely new tools likely contributed to successful adoption.

The multi-round questioning capability suggests the system implements some form of conversational state management, allowing the agent to build up context across multiple interactions before determining that it has sufficient information to proceed. The decision logic about when enough context has been gathered represents a critical component—too few rounds might miss important details, while too many could frustrate users and reduce adoption.

The system appears designed to handle the high variance in input quality, effectively normalizing requests from terse one-liners to comprehensive documents into a more consistent format through structured questioning. This input normalization capability is particularly valuable in enterprise contexts where different stakeholders have varying levels of technical sophistication and documentation discipline.

## Organizational and Cultural Considerations

The case study provides insights into how Ramp's organizational structure and culture enable effective AI adoption. The FDE team operates within the engineering organization rather than as a traditional sales engineering or customer success function. This positioning likely facilitates the team's focus on building automation tools and treating their own workflows as engineering problems worth solving with software.

The presentation's emphasis on not just saying yes to customers reflects a product-oriented mindset that prioritizes building the right things over maximizing short-term customer satisfaction. This discipline creates the foundation for effective automation—if the human process lacks rigor, automating it simply scales dysfunction.

The willingness to invest 30-person engineering team resources in building internal tools for their own productivity demonstrates commitment to efficiency and scaling. Many organizations struggle to justify internal tooling investments, but Ramp appears to view these capabilities as strategic differentiators that enable the team to support more enterprise customers without proportionally scaling headcount.

The iterative approach—starting with a simple version, gathering feedback, and expanding capabilities based on demonstrated value—reflects agile development practices applied to AI systems. This reduces risk compared to big-bang deployments and builds organizational confidence in AI capabilities through concrete demonstrated value.

## Implications for Field Development Engineering and Similar Roles

This case study has significant implications for how technical go-to-market roles evolve in an AI-powered future. The traditional FDE role involved substantial manual work gathering requirements, scoping features, writing specifications, and implementing customizations. The vision presented suggests these roles will increasingly focus on building and managing AI systems that perform these tasks rather than executing them directly.

This transformation parallels broader patterns across knowledge work where the fundamental question becomes: what aspects of a job can be delegated to agents, and what uniquely human capabilities remain essential? For FDE at Ramp, the answer appears to be that mechanical aspects of information gathering and initial analysis can be automated, while strategic judgment about what to build, quality assurance, and relationship management remain human responsibilities.

The skills required for success in these evolved roles shift accordingly. Deep understanding of AI capabilities and limitations becomes essential. Expertise in prompt engineering, evaluation design, and context management replaces or augments traditional software development skills. The ability to identify automation opportunities and design effective agent workflows becomes as important as the ability to implement features directly.

For organizations with similar technical go-to-market functions—solutions engineers, implementation engineers, professional services teams—this case study provides a roadmap for thinking about how AI can amplify these teams' capabilities. The key is identifying high-volume, high-variance workflows where automation can provide consistency and speed while freeing human experts to focus on complex cases and strategic work.

## Open Questions and Future Directions

While the presentation outlined an ambitious vision, several important questions remain about how this evolution will unfold. The challenge of capturing and providing appropriate context to agents—particularly the tacit knowledge that experienced product managers and engineers possess—remains partially unsolved. Techniques like retrieval-augmented generation can help surface relevant documentation, but truly replicating expert judgment may require more sophisticated approaches like learning from human feedback on agent decisions over time.

The balance between automation and human oversight will continue to evolve as model capabilities improve. Currently, humans maintain final judgment over outputs, but as agents become more reliable, the nature of oversight may shift from reviewing individual decisions to monitoring aggregate metrics and intervening on exceptions.

The presentation didn't detail specific evaluation frameworks or quality metrics beyond the general mention of evals, rubrics, and human feedback. Understanding how organizations measure agent performance in these workflows—what constitutes a well-scoped requirement, how to detect when agents miss critical context, how to balance thoroughness against efficiency—represents an important area for further development.

As Ramp builds out the full "agent factory" covering all stages of the FDE pipeline, integration challenges between different agents will likely emerge. Ensuring that context flows appropriately between stages, that agents handling different parts of the process maintain consistency, and that the overall system remains manageable and debuggable will require careful system design.

The broader competitive dynamics mentioned in the presentation—the risk of being overtaken by "agent-native competitors"—raises interesting questions about how AI adoption creates competitive pressure across industries. Organizations that successfully leverage AI to scale knowledge work without proportionally scaling headcount gain significant advantages, potentially forcing competitors to adopt similar approaches regardless of their readiness or comfort level.
