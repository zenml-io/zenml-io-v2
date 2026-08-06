---
title: "Evolution of Forward Deployed Engineering and Agent Engineering in the AI Era"
slug: "evolution-of-forward-deployed-engineering-and-agent-engineering-in-the-ai-era"
draft: false
llmopsTags:
  - "customer-support"
  - "data-integration"
  - "agent-based"
  - "prompt-engineering"
  - "cost-optimization"
  - "devops"
  - "kubernetes"
  - "docker"
  - "cicd"
  - "microservices"
  - "scaling"
  - "databases"
  - "api-gateway"
  - "anthropic"
  - "openai"
  - "google-gcp"
industryTags: "tech"
company: "Sierra"
summary: "Sierra's Head of Agent Engineering traces the evolution of forward deployed engineering from Palantir's DevOps-focused origins in 2008 through to the modern AI era, examining how the role has expanded to encompass data integration, custom solutions, and enablement. The presentation argues that with code becoming cheap to produce through LLMs and coding agents, forward deployed engineers can now build end-to-end solutions while the distinction between product engineering and customer-facing roles blurs. Sierra applies these insights through agent engineering focused on outcome-based pricing models where AI agents solve customer inquiries autonomously, with forward deployed engineers responsible for deploying agents into production and ensuring measurable outcomes like completed sales or resolved customer issues."
link: "https://www.youtube.com/watch?v=Byv311hdoHE"
year: 2026
seo:
  title: "Sierra: Evolution of Forward Deployed Engineering and Agent Engineering in the AI Era - ZenML LLMOps Database"
  description: "Sierra's Head of Agent Engineering traces the evolution of forward deployed engineering from Palantir's DevOps-focused origins in 2008 through to the modern AI era, examining how the role has expanded to encompass data integration, custom solutions, and enablement. The presentation argues that with code becoming cheap to produce through LLMs and coding agents, forward deployed engineers can now build end-to-end solutions while the distinction between product engineering and customer-facing roles blurs. Sierra applies these insights through agent engineering focused on outcome-based pricing models where AI agents solve customer inquiries autonomously, with forward deployed engineers responsible for deploying agents into production and ensuring measurable outcomes like completed sales or resolved customer issues."
  canonical: "https://www.zenml.io/llmops-database/evolution-of-forward-deployed-engineering-and-agent-engineering-in-the-ai-era"
  ogTitle: "Sierra: Evolution of Forward Deployed Engineering and Agent Engineering in the AI Era - ZenML LLMOps Database"
  ogDescription: "Sierra's Head of Agent Engineering traces the evolution of forward deployed engineering from Palantir's DevOps-focused origins in 2008 through to the modern AI era, examining how the role has expanded to encompass data integration, custom solutions, and enablement. The presentation argues that with code becoming cheap to produce through LLMs and coding agents, forward deployed engineers can now build end-to-end solutions while the distinction between product engineering and customer-facing roles blurs. Sierra applies these insights through agent engineering focused on outcome-based pricing models where AI agents solve customer inquiries autonomously, with forward deployed engineers responsible for deploying agents into production and ensuring measurable outcomes like completed sales or resolved customer issues."
notion:
  pageId: "3b4f8dff-2538-805d-83c4-d6cbebe68fbd"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-06T11:27:00.000Z"
  lastEditedTime: "2026-08-06T11:27:00.000Z"
  publishedAt: "2026-08-06T11:46:57Z"
---

## Overview

This case study from Sierra, presented by Natalie Mier, Head of Agent Engineering, provides a comprehensive examination of how the role of forward deployed engineering has evolved in the AI era, with particular focus on how large language models and coding agents are transforming the traditional boundaries between product engineering, solutions engineering, and customer-facing technical roles. The presentation traces the historical development of forward deployed engineering from its origins at Palantir through to Sierra's current approach to agent engineering, which the speaker positions as a subdiscipline of AI engineering specifically focused on customer accountability and outcome delivery.

The speaker presents the provocative thesis that "forward deployed engineering doesn't exist" as a coherent single discipline, but rather represents an expanding set of capabilities that are becoming essential across all engineering roles as code becomes cheap to produce through LLMs. Sierra's approach to agent engineering emerged from recognizing that the traditional forward deployed engineering model needed to evolve for the AI agent era, where outcomes can be directly measured and priced.

## Historical Context and Evolution

The presentation provides valuable historical context by tracing forward deployed engineering through distinct eras at Palantir, each adding new responsibilities while retaining previous ones. In 2008, the role primarily focused on platform stability and DevOps, with engineers literally deployed to customer locations to maintain on-premise deployments. This often involved troubleshooting runtime issues and responding to infrastructure problems at all hours. The speaker's own onboarding project at Palantir involved deploying software on an EC2 instance, illustrating the DevOps-heavy nature of early forward deployed work.

By 2012, as Palantir's platform stabilized, forward deployed engineers took on data integration responsibilities. The speaker uses the analogy of a movie theater without movies to explain why data integration software is useless without integrated data. Forward deployed engineers became responsible for integrating data from disparate sources and creating ontologies to taxonomize that data appropriately. This required deep understanding of customer environments and data landscapes.

The 2016 era introduced custom solutions building, typically in the form of Slate dashboards. Slate was Palantir's drag-and-drop builder similar to Retool that allowed mapping components to data sources. Forward deployed engineers became the individuals best positioned to make data useful because they understood both the technical data structures and the customer context. However, a key learning emerged that dashboards without write-back capabilities to data sources tended to decay over time and deliver limited value.

By 2020, approaching IPO, Palantir shifted toward platform enablement, wanting to empower customers to do more work themselves rather than requiring engineers to be shipped to remote locations globally. This manifested in efforts like Skywise with Airbus, where thousands of Airbus engineers were enabled to use the Foundry platform to perform work previously done by forward deployed engineers. More recently, Palantir introduced AIP that leverages large language models for similar enablement work, though this occurred after the speaker's departure.

## The LLMOps Transformation

The critical insight for LLMOps practitioners is that when code becomes cheap to produce through coding agents and LLM-powered development tools, the role of forward deployed engineers transforms fundamentally. Rather than being constrained by implementation velocity, forward deployed engineers can now prototype and build end-to-end solutions rapidly by leveraging coding agents. This shifts the bottleneck from implementation to understanding customer needs and ensuring outcomes.

Sierra's approach to agent engineering emerged from this realization. In July 2024, the speaker published an article proposing agent engineering as a subdiscipline of AI engineering that maintains the customer accountability characteristic of forward deployed engineering while focusing specifically on the agent domain. The vision was that agent engineers would be responsible for building, deploying, and ensuring outcomes from AI agents in production environments.

However, the speaker notes that their thinking has evolved over the subsequent two years. Rather than agent engineering being a distinct discipline, they now see a convergence happening where all engineering roles are becoming more customer-facing and outcome-oriented. Product engineers are becoming more client-facing, while forward deployed engineers are contributing more deeply to product development. The availability of coding agents accelerates this convergence by enabling engineers in any role to rapidly build solutions.

## Outcome-Based Pricing and LLMOps

A crucial aspect of Sierra's LLMOps approach involves the shift to outcome-based pricing models enabled by AI agents. The speaker presents a framework with two axes: the degree to which outcomes can be attributed to the product, and the agency/autonomy to achieve those outcomes. Traditional seat-based pricing exists in scenarios where attribution is low. Usage-based pricing, like what companies pay to OpenAI or Anthropic for foundation model access, provides better usage tracking but still doesn't directly measure outcomes.

AI agents in customer experience contexts enable true outcome-based pricing because both attribution and agency are high. For Sierra's use case, outcomes might include completed sales or successfully resolved customer inquiries. The agent has the autonomy to take actions to achieve these outcomes, and the outcome can be directly attributed to the agent's performance. The speaker argues that most pricing in the AI market will move toward outcome-based models.

This pricing model has profound implications for LLMOps. When customers pay based on outcomes rather than seats or API calls, engineering teams must ensure reliable delivery of those outcomes in production. This requires forward deployed engineers or agent engineers who can deploy agents into production environments, monitor their performance against outcome metrics, and iterate rapidly when outcomes aren't being achieved. The accountability is no longer just for uptime or feature delivery, but for measurable business outcomes.

## Agent Engineering in Practice

While the presentation is somewhat light on specific technical implementation details of Sierra's agent engineering practices, several key principles emerge. Agent engineers at Sierra are responsible for the full lifecycle of agents in production: building them, deploying them, and ensuring they deliver measurable outcomes. This requires combining traditional forward deployed engineering capabilities like DevOps and customer understanding with new AI-specific skills around agent design and LLM orchestration.

The speaker mentions that Sierra has been working with this model from 2024 to 2026, suggesting approximately two years of production experience with agent engineering as a discipline. During this time, they've observed the emergence of even more specialized roles like "harness engineering" which they position as a subset of agent engineering, suggesting increasing specialization within the agent domain even as engineering roles broadly converge.

The role requires a diverse skillset that the speaker humorously characterizes as needing "staff engineer for eight years with six years of direct sales experience and four years as a solution architect" plus teaching experience. While exaggerated for effect, this reflects the genuine multidisciplinary nature of agent engineering: deep technical skills, customer-facing abilities, solutions architecture, and enablement capabilities.

## Critical Assessment

The presentation offers valuable insights into how LLM-powered tools are transforming engineering roles, but several aspects warrant balanced consideration. The claim that "forward deployed engineering doesn't exist" is deliberately provocative and somewhat contradicted by Sierra's active hiring for these roles. More accurately, the presentation demonstrates that forward deployed engineering has become so multifaceted that it's difficult to define precisely, which is different from not existing.

The vision of outcome-based pricing enabled by AI agents is compelling but may be more applicable to certain use cases than others. Customer experience agents solving support inquiries or completing sales transactions are natural fits for outcome measurement. However, many enterprise AI applications may have outcomes that are harder to measure or attribute directly, potentially limiting the applicability of this model. The presentation doesn't deeply address how to handle scenarios where outcome attribution is ambiguous.

The claim that coding agents make code cheap to produce and enable forward deployed engineers to build end-to-end solutions rapidly is optimistic and aligns with vendor narratives around AI-assisted development. While coding agents certainly accelerate development, production-quality code still requires significant engineering judgment, testing, security considerations, and architectural thinking that coding agents don't fully automate. The presentation would benefit from more nuanced discussion of coding agent capabilities and limitations in production contexts.

The historical analysis of Palantir's forward deployed engineering evolution is valuable and appears accurate based on publicly available information. However, Palantir's model involved significant human capital investment in deploying engineers globally to customer sites, which may not be economically viable for most companies. Sierra's approach appears to leverage remote work and agent automation to make this model more scalable, but the presentation doesn't deeply explore the economics.

The convergence thesis that all engineering is becoming forward deployed engineering is thought-provoking but perhaps overstated. While product engineers certainly benefit from customer understanding and deployed engineers benefit from product thinking, distinct specializations and focus areas likely remain valuable. Not every engineer needs to be equally strong across DevOps, data integration, solutions building, enablement, and agent development.

## LLMOps Implications

For LLMOps practitioners, several key takeaways emerge from Sierra's experience. First, as LLMs and coding agents accelerate development velocity, the bottleneck shifts from implementation to understanding customer needs and ensuring production outcomes. This suggests LLMOps practices should emphasize outcome measurement, production monitoring, and rapid iteration cycles rather than just deployment automation.

Second, outcome-based pricing models create strong incentives to invest in production reliability and outcome measurement for AI systems. LLMOps teams need instrumentation that tracks not just technical metrics like latency and uptime, but business outcomes like task completion rates, customer satisfaction, or conversion metrics. This requires close collaboration between engineering, product, and business teams.

Third, the role of the forward deployed engineer or agent engineer becomes critical in the LLMOps lifecycle. These individuals bridge the gap between generic platform capabilities and specific customer outcomes, customizing agent behavior, integrating customer data, and iterating based on production performance. Organizations adopting AI agents likely need dedicated roles focused on this deployment and outcome delivery function.

Fourth, enablement and platform approaches can help scale deployment expertise. Just as Palantir enabled Airbus engineers to do forward deployed work themselves, organizations can build platforms and tooling that enable broader teams to deploy and manage agents in production. This suggests LLMOps platforms should prioritize user-friendly interfaces and self-service capabilities alongside technical sophistication.

Finally, the blurring of lines between product engineering and customer-facing roles suggests that LLMOps skills may need to become more broadly distributed across engineering organizations rather than concentrated in specialized teams. Engineers working on LLM-powered products may need to develop skills in deployment, monitoring, customer understanding, and outcome measurement that traditionally lived in separate roles.

## Conclusion

Sierra's perspective on agent engineering and the evolution of forward deployed engineering offers a valuable lens for understanding how LLMs are transforming not just what engineering teams build, but how they're organized and how they deliver value. The shift from seat-based to outcome-based pricing enabled by autonomous AI agents creates new accountability models that ripple through organizational structure and LLMOps practices. While some claims in the presentation may be somewhat optimistic or promotional, the core insights around outcome focus, role convergence, and the importance of deployment expertise are valuable for organizations building production LLM systems. The historical context from Palantir's evolution also provides useful perspective on how customer-facing technical roles have adapted to increasingly sophisticated platforms over time, offering potential foresight into how similar roles may evolve in the AI era.
