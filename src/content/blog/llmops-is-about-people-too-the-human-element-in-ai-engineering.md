---
title: "LLMOps Is About People Too: The Human Element in AI Engineering"
slug: "llmops-is-about-people-too-the-human-element-in-ai-engineering"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67dd419200f7b9e03da2cc24"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-03-24T10:40:48.221Z"
  lastUpdated: "2025-03-21T11:57:08.755Z"
  createdOn: "2025-03-21T10:38:10.288Z"
author: "alex-strick-van-linschoten"
category: "llmops"
tags:
  - "llmops"
  - "thought-leadership"
  - "teams"
date: "2025-03-21T00:00:00.000Z"
readingTime: 9 mins
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/d771078e/67dd5360c8261853d109ead7_LLMOps_People__1___1_.png"
seo:
  title: "LLMOps Is About People Too: The Human Element in AI Engineering - ZenML Blog"
  description: "We explore how successful LLMOps implementation depends on human factors beyond just technical solutions. It addresses common challenges like misaligned executive expectations, siloed teams, and subject-matter expert resistance that often derail AI initiatives. The piece offers practical strategies for creating effective team structures (hub-and-spoke, horizontal teams, cross-functional squads), improving communication, and integrating domain experts early. With actionable insights from companies like TomTom, Uber, and Zalando, readers will learn how to balance technical excellence with organizational change management to unlock the full potential of generative AI deployments."
  canonical: "https://www.zenml.io/blog/llmops-is-about-people-too-the-human-element-in-ai-engineering"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/d771078e/67dd5360c8261853d109ead7_LLMOps_People__1___1_.png"
  ogTitle: "LLMOps Is About People Too: The Human Element in AI Engineering - ZenML Blog"
  ogDescription: "We explore how successful LLMOps implementation depends on human factors beyond just technical solutions. It addresses common challenges like misaligned executive expectations, siloed teams, and subject-matter expert resistance that often derail AI initiatives. The piece offers practical strategies for creating effective team structures (hub-and-spoke, horizontal teams, cross-functional squads), improving communication, and integrating domain experts early. With actionable insights from companies like TomTom, Uber, and Zalando, readers will learn how to balance technical excellence with organizational change management to unlock the full potential of generative AI deployments."
---

When teams deploy generative AI, it's easy to focus solely on models, pipelines, and frameworks—and overlook the human factors critical to success. Misaligned executive expectations, resistance from subject-matter experts, and ineffective team structures often pose greater challenges than the technology itself. In this article, you'll learn practical strategies for aligning executives, engaging experts early, and structuring teams effectively—essential solutions for overcoming human-centric LLMOps hurdles and ensuring successful AI deployments.

## Misaligned Expectations and Siloed Teams

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/aa3d5e51/67dd40e7a91cdf8c7d7d40c2_LLMOps_is_about_people_too.png" alt="__wf_reserved_inherit" />
</figure>

Navigating executive expectations, overcoming siloed teams, conducting readiness assessments, establishing champion networks, handling skeptical experts, and aligning on evaluation criteria often prove trickier than the technical challenges themselves.

Such disconnects often lead to organizational silos, particularly pronounced in remote or distributed teams, where geographical separation can reinforce isolation. Teams may form independent "pioneer units" to quickly explore innovative use cases, unintentionally disconnecting from broader business objectives. Although initially valuable for experimentation, these teams risk becoming detached from broader business objectives, leading to technically advanced solutions that fail to address real-world needs. Analysts from AIMResearch [noted this common pitfall](https://aimresearch.co/ai-startups/ai-startups-that-failed-in-2024-and-why), highlighting how isolated teams frequently create "cutting-edge solutions without addressing a pressing need," resulting in poor product-market fit.

Additionally, these siloed teams often suffer from inadequate knowledge sharing and documentation. Without robust version control and clear protocols, essential knowledge about prompts, datasets, and configurations is lost or duplicated, resulting in inefficiencies and increased risk of project delays or failures.

Further complicating these issues are disparities in team expertise. Data scientists skilled in model training may lack deployment knowledge, while engineers focused on stability might not grasp nuanced model behaviors such as prompt engineering or fine-tuning. This skill gap can lead to ineffective workflows, difficult troubleshooting, and strained collaboration.

Ultimately, misaligned expectations—whether due to executive skepticism, unrealistic demands, or inadequate communication—significantly contribute to the isolation of teams. Effective LLMOps requires proactive alignment of expectations, clear communication across functions, and intentional team integration from the outset.

These high-level misconceptions trickle down, exacerbating cross-team communication gaps. [According to IBM](https://www.ibm.com/downloads/documents/us-en/10a99803fb2fdbe5), "74% of CEOs say their teams are appropriately skilled in generative AI, yet only 29% of their C-suite agree," reflecting significant internal misunderstandings. Additionally, each team involved—data scientists, DevOps engineers, and business stakeholders—brings distinct priorities and vocabularies, further complicating communication. Data scientists focus heavily on model accuracy, engineers prioritize stability and scalability, and business stakeholders emphasize rapid time-to-market and ROI. Without effective bridging of these perspectives, projects often stall due to miscommunication and friction.

Finally, misalignment can also originate from skepticism within senior management, who may doubt the value or applicability of generative AI altogether. Technical teams, therefore, face the additional challenge of convincing hesitant executives of the strategic benefits and realistic potential of these initiatives. Without addressing this skepticism effectively, potentially valuable projects can stall or fail to launch.

Collectively, these various forms of misalignment—stemming from hype, communication barriers, technical misunderstandings, stalled prototypes, or executive skepticism—represent significant hurdles in deploying effective generative AI solutions.

**Key Takeaways:**

<ul><li>Actively align executive expectations early to avoid unrealistic demands.</li><li>Foster cross-functional communication to prevent silo formation.</li><li>Bridge skill gaps between data science and engineering teams through targeted education.</li><li>Proactively address senior management skepticism with clear, strategic business cases.</li></ul>

## Integrating Subject-Matter Experts (SMEs)

Effective deployment of generative AI (GenAI) hinges significantly on robust **education, communication, and structured Organizational Change Management (OCM)** strategies.

### Fears of Job Loss and Role Changes

A common source of resistance among SMEs stems from the fear that involvement in generative AI initiatives might ultimately lead to job displacement. Olga Tsubiks of RBC succinctly [captured this concern](https://thefinancialbrand.com/news/artificial-intelligence-banking/why-ai-tech-flops-at-so-many-banks-and-what-to-do-165159): "When an LLM system encroaches on tasks that defined someone's job, it's natural to worry." SMEs may feel that contributing their expertise is effectively training a system designed to replace them. Such fears can severely hinder cooperation, limiting access to vital domain knowledge required for successful model development.

Similarly, [Babbel encountered skepticism](https://www.youtube.com/watch?v=fIFA4eHBI8s) from content creators who perceived AI-assisted tools as a threat to their roles. While some content creators were open-minded, others remained doubtful of AI's ability to match human expertise, creating significant challenges in building trust and acceptance.

### Underutilized SMEs

Even when SMEs are not specifically resistant, their expertise often remains underutilized. SMEs are intended to be "the architects of quality and precision in AI development," responsible for identifying errors, biases, and ensuring practical alignment. However, organizations frequently involve SMEs too late in the process or inadequately leverage their insights. This approach fails to utilize the SMEs' in-depth understanding effectively, resulting in superficial evaluations and overlooked issues that only surface post-deployment.

A meaningful involvement of SMEs demands a deep understanding of both the technical aspects and the practical implications of AI solutions. When SMEs lack context or clear evaluation objectives, their contributions become less impactful, significantly reducing the quality and effectiveness of AI implementations.

### Pride in Existing Processes and Resistance to Change

SMEs can also exhibit resistance rooted in pride over existing methods, particularly when new AI systems appear to trivialize their specialized knowledge. In some organizations, experts have invested years mastering complex processes and take pride in navigating intricate challenges manually. Introducing an LLM that automates or simplifies these processes can threaten their professional identity and sense of achievement. For example, seasoned staff at a financial institution [resisted a new AI-driven tool](https://thefinancialbrand.com/news/artificial-intelligence-banking/why-ai-tech-flops-at-so-many-banks-and-what-to-do-165159) that abstracted away complexity, preferring traditional processes they felt validated their expertise. Such resistance often leads SMEs to subtly sabotage AI initiatives, meticulously highlighting every flaw and reverting to legacy processes whenever possible, significantly slowing adoption and implementation.

Addressing these human-centric challenges through structured OCM interventions such as change readiness evaluations, targeted communication strategies, and SME-focused champion networks is crucial for successful generative AI projects.

Evaluations serve as a critical intersection point in LLM deployments, often highlighting and intensifying underlying conflicts across teams, SMEs, and management. Different teams typically approach evaluations with diverse metrics and expectations, creating significant friction when aligning on what constitutes a "good" model outcome.

**Key Takeaways:**

<ul><li>Engage SMEs early and continuously to prevent resistance and leverage their expertise effectively.</li><li>Clearly communicate the practical implications and objectives of GenAI initiatives to SMEs.</li><li>Use structured Organizational Change Management (OCM) strategies to address fears of job displacement and resistance to change.</li><li>Align evaluation metrics and objectives collaboratively across technical teams and SMEs to reduce friction.</li></ul>

### Conflicting Evaluation Metrics and Expectations

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/4cc2e2c5/67dd4100916f6e9c25c432af_LLMOps_Human_Element_in_AI_Engineering__1___1_.png" alt="__wf_reserved_inherit" />
</figure>

[A Microsoft case study](https://devblogs.microsoft.com/ise/llmops-in-restricted-networks-and-continuous-evaluation-long-run-constraints/) on LLM deployment within restricted networks demonstrated how divergent expectations between Data Science and Engineering teams can significantly impede progress. Data scientists prioritized thorough evaluation runs, whereas engineers focused on the speed and frequency of CI/CD cycles. Addressing these tensions required introducing deliberate human decision-making into the evaluation process, underscoring that evaluations are as much about effective communication and collaboration as they are about technical assessments.

### Subjectivity of Evaluations

The inherently subjective nature of generative AI outputs further complicates evaluations. Industry expert Ashu Garg [articulated this challenge](https://www.linkedin.com/posts/ashugargvc_evaluations-remain-a-persistent-pain-point-activity-7267206781469114369-BVZX/), noting that "the subjectivity of generative outputs makes them difficult to evaluate systematically." Technical metrics that engineering teams might optimize for, such as accuracy scores or token efficiency, often fail to capture end-user satisfaction or actual business utility. As a result, evaluation metrics can become misaligned with practical outcomes, causing uncertainty around model effectiveness.

### Data Labeling and Consistency Challenges

Further compounding the complexity of evaluations are challenges related to data labeling consistency. Startups with constrained resources frequently struggle to maintain rigorous and consistent data labeling practices. Complex or ambiguous datasets in specialized domains demand nuanced human judgment, increasing the likelihood of inconsistency and negatively impacting model performance. Additionally, the absence of standardized labeling guidelines can lead to varied interpretations among labelers, resulting in a fragmented and less effective training dataset.

These combined issues make evaluations a focal point of friction, exposing underlying misalignments across teams, SMEs, and management. Recognizing evaluations as both a technical and deeply human challenge sets the stage for solutions that prioritize communication, collaboration, and clear alignment on shared goals.

## Solution Context 1: Team Composition & Process

Successfully addressing the challenges associated with deploying generative AI involves rethinking team structures and processes. Effective approaches emphasize cross-functional collaboration, clear communication, and flexible team configurations tailored to organizational needs.

### Cross-functional Teams

Cross-functional teams, integrating SMEs closely with engineers and data scientists, emerge as a recurring best practice. Such collaboration ensures continuous SME involvement in evaluations, promoting a shared understanding of quality criteria. For instance, teams have developed detailed evaluation rubrics enabling SMEs to provide nuanced assessments on aspects like factual accuracy and appropriateness. Supplementing SME judgment with automated evaluations creates a balanced approach that enhances accuracy and builds trust among stakeholders.

[Experiences](https://www.zenml.io/llmops-database/enterprise-genai-implementation-strategies-across-industries) from organizations like AstraZeneca, Adobe, and Allianz Technology further underscore the critical role of cross-functional partnerships in successful LLM implementations. At [Twilio](https://www.youtube.com/watch?v=AVjrkXGnF2M), a dedicated cross-functional team comprising engineering, product design, and go-to-market specialists operated independently from traditional units to explore and rapidly iterate on AI capabilities. Their approach prioritized customer feedback, curiosity-driven problem-solving, and flexible technical architecture, facilitating swift innovation and effective communication across the organization.

### GenAI Pioneer Teams

While initially valuable for rapidly prototyping and validating ideas, standalone GenAI pioneer teams must eventually evolve to maintain broader organizational alignment. Early-stage pioneer teams risk isolation if not integrated with the overall business structure, potentially limiting their long-term impact and utility. Therefore, as generative AI initiatives mature, organizations need to transition from isolated vanguard teams to embedded or integrated models to ensure ongoing alignment with core business goals.

### Team Configuration Approaches

Organizations have successfully adopted various detailed team configurations to structure their GenAI efforts:

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/57f9e8a1/67dd41187750eed060476882_LLMOps_is_About_People.png" alt="__wf_reserved_inherit" />
</figure>

### Centralized Hub-and-Spoke Model

[TomTom](https://engineering.tomtom.com/GenAI-journey/) implemented a strategic hub-and-spoke model to democratize generative AI innovation across their organization. At its core, this structure featured an innovation "hub," a compact central team of GenAI specialists tasked with overseeing strategic direction, managing GenAI proficiency, and supporting local initiatives across the organization. Complementing this central hub were numerous domain-specific "spokes," composed of local teams who leveraged their deep understanding of particular business areas to identify practical and impactful opportunities for generative AI.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/733dbe54/67dd412987f98cfcd24cdba3_TomTom_Hub_and_Spoke_Model__1_.png" alt="__wf_reserved_inherit" />
</figure>

**Collaborative Ownership and Project Lifecycle**Initially, the central hub team maintained ownership of key AI projects, such as the ChatGPT location plugin and the Tommy in-car AI assistant, allowing for rapid prototyping and controlled innovation. However, as these solutions matured, ownership and maintenance responsibilities transitioned to dedicated spoke teams with greater domain knowledge. This transition ensured ongoing alignment with local business objectives while freeing the central specialists to pursue further innovation. The hub continued providing consultative support when necessary, promoting continuity and expertise sharing.

**Distributed Resources and Risk Mitigation**To balance innovation with risk mitigation, TomTom strategically distributed resources across small, agile teams capable of rapidly exploring proof-of-concept solutions—often employing just one or two people over several weeks. The hub team collaborated closely with spokes to jointly frame problems, design preliminary solutions, and allocate modest resources for initial development. This collaborative model significantly reduced investment risks while enabling swift validation of new ideas.

**Central Oversight with Distributed Innovation**The central hub also provided vital oversight across the entire portfolio of sponsored projects, assessing technical maturity, team preparedness, and strategic alignment. By prioritizing initiatives from teams already embracing GenAI, the hub ensured quick wins and built momentum for broader organizational adoption. This structured yet flexible approach encouraged widespread exploration of AI applications while allowing the central team to refine and distribute best practices effectively.

**Upskilling and Knowledge Sharing**An essential element of TomTom’s approach involved extensive workforce upskilling and ongoing knowledge sharing. Initiatives included targeted leadership workshops, regular AMA sessions, weekly AI-focused newsletters, structured training programs for new hires, hackathons, and regularly scheduled office hours. These activities cultivated widespread AI proficiency, enabling decentralized innovation without the need for significant additional hiring or investment.

Through this centralized hub-and-spoke model, TomTom effectively scaled generative AI innovation, driving significant performance improvements (between 30% and 60% in various tasks), while maintaining strategic alignment and minimizing organizational disruption.

### Horizontal AI Developer Experience Teams

[Uber's approach](https://www.youtube.com/watch?v=jp-fBw07r7c&t=1s) to enhancing developer productivity through AI innovation is exemplified by their dedicated Horizontal AI Developer Experience Team. This team, comprised of experts drawn from diverse monorepos, focuses on understanding the nuances of developer workflows across various programming languages and environments. Not required to be deep ML specialists, these team members leverage their software engineering expertise to integrate AI solutions seamlessly into everyday developer tools.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/9e3bc3e3/67dd413a34b4bd77e6e6e981_TomTom_Hub_and_Spoke_Model_for_AI.png" alt="__wf_reserved_inherit" />
</figure>

Working in tandem with a separate ML expert team responsible for core model hosting, fine-tuning, and maintaining model gateways, the Horizontal AI Developer Experience Team adopts a hybrid strategy.

A key takeaway from Uber’s horizontal team model is the emphasis on hiring engineers with a strong sense of curiosity and creativity, rather than relying solely on existing AI expertise. The team's flexible roadmap, which anticipates rapid changes in AI technology and the potential for models to become redundant, has enabled them to adapt quickly and measure impact through both qualitative feedback and concrete metrics such as developer time saved.

Overall, the Horizontal AI Developer Experience Team serves as an innovation layer across Uber’s extensive codebases, proving that a well-structured horizontal team can drive significant improvements in developer workflows while mitigating the inherent risks of fully automated AI solutions.

### Cross-functional Squads or Virtual Teams

Inspired by Spotify's squad model, organizations like [Zalando](https://www.youtube.com/watch?v=6s9Y5fgP3dg) have increasingly adopted cross-functional virtual teams to drive successful AI deployments. Zalando transitioned from discrete, project-based approaches to ongoing product development, recognizing that the lifecycle of machine learning models begins rather than ends at deployment. This shift led to assembling teams that emphasize continuous feature delivery and iterative improvement rather than short-term milestones.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/ad4a92a9/67dd417087f98cfcd24d3e76_LLMOps_is_about_people_too__1_.png" alt="__wf_reserved_inherit" />
</figure>

Effective cross-functional squads at Zalando included diverse roles beyond traditional ML practitioners, integrating UX researchers, full-stack engineers, domain experts, and increasingly, specialized designers focused specifically on ML-driven user experiences. This varied composition ensured a comprehensive approach to AI development, balancing technical expertise with deep domain knowledge and usability considerations.

As Zalando's AI maturity grew, so did the composition and structure of its teams. Initially, smaller groups composed mainly of data scientists sufficed, but scaling AI initiatives required adding specialized roles such as ML engineers and MLOps specialists to manage complex pipelines and maintain operational stability. Zalando also emphasized adjusting the ratio of these roles dynamically, recognizing that different stages of AI maturity demand varying proportions of expertise to effectively maintain the ecosystem.

However, this structure was not without challenges. Balancing diverse expertise within teams required careful communication and alignment on shared goals. Zalando’s experience highlights that successfully deploying AI at scale demands intentional adjustments to team composition as organizational needs evolve, emphasizing ongoing integration and clear cross-functional collaboration.

### Embedded Teams

Embedded teams integrate engineers directly into data science units or product teams to foster closer collaboration and mutual understanding. [Patrick Debois highlights](https://www.youtube.com/watch?v=5qNXdLbEdew) how embedding engineers within data science teams was pivotal in reducing friction and enhancing integration between traditionally separate domains. Initially, the push toward deploying generative AI heavily impacted data scientists, who found themselves struggling with production responsibilities outside their usual expertise. By gradually embedding engineers into the data science team, the company facilitated smoother operational integration, addressing both the practical deployment challenges and the inherent skill gaps.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/ac3cd678/67dd417f17208162d021c833_Embedded_Engineers_from_LLMOps.png" alt="__wf_reserved_inherit" />
</figure>

Over time, Debois noted that this embedding strategy naturally shifted the composition and responsibilities within teams. Engineers, familiar with production concerns and infrastructure, began to play a larger role in operational aspects, while data scientists became increasingly focused on their core strengths in model development and experimentation. This gradual rebalancing significantly reduced friction by clearly delineating responsibilities according to expertise, leading to more efficient collaboration.

However, this approach also presented challenges. The embedding process required careful management to ensure the data scientists and engineers maintained clear and complementary roles rather than creating overlapping or ambiguous responsibilities. Additionally, as integration deepened, the ratio of data scientists to engineers inevitably shifted, with fewer data scientists needed relative to the increased engineering support required for integration and productionization.

Debois also references the ["experience crew" concept from the unFIX model](https://unfix.com/experience-crew) as an alternative approach to embedded teams. This specialized team type focuses on ensuring consistency of AI integration across various product teams by engaging directly with feature teams to harmonize UX and AI capabilities. The benefit of such embedded or specialized crews is enhanced cross-collaboration and governance, leveraging shared knowledge about cloud platforms, infrastructure, and deployment standards.

In practice, the ideal embedded team composition typically combines traditional application developers with data scientists. This integration ensures comprehensive expertise, blending deep domain knowledge in model building with practical skills in deployment, infrastructure, and productization. Ultimately, embedded teams provide a flexible and responsive structure that can dynamically adapt as organizational needs evolve, effectively bridging traditional divides between data science and engineering.

By thoughtfully selecting and adapting these detailed team configurations, organizations can significantly improve collaboration, alignment, and ultimately the effectiveness of their generative AI initiatives.

**Key Takeaways:**

<ul><li>Implement cross-functional teams to integrate SMEs and technical roles effectively.</li><li>Transition pioneer teams to embedded or integrated teams to maintain alignment with business goals.</li><li>Choose a team structure (Hub-and-Spoke, Horizontal Teams, Squads, Embedded Teams) based on organizational context and maturity.</li><li>Clearly define roles and responsibilities within team structures early to ensure smooth collaboration.</li></ul>

## Solution Context 2: Education & Communication

Effective deployment of generative AI also hinges significantly on robust **education and communication** strategies. These elements break down organizational silos, align expectations, and ensure all stakeholders—technical and non-technical alike—are moving in the same direction.

### The Role of Education

Education is foundational for successful LLMOps initiatives. Technical teams often understand the capabilities and limits of GenAI deeply, while subject matter experts (SMEs) and business stakeholders may not fully grasp the implications for their roles or the broader business. Initiatives to proactively educate stakeholders can bridge this gap by:

<ul><li>Clarifying the goals and potential impact of GenAI technologies on business processes.</li><li>Demystifying the technical aspects to alleviate fears and misconceptions.</li><li>Highlighting practical use-cases relevant to specific departments or roles within the company.</li></ul>

A particularly effective educational practice involves leveraging evaluation processes as teaching tools. Evals naturally draw attention to practical outcomes and offer concrete examples around which education can be structured. Stakeholders, seeing tangible results, become more engaged and can better visualize the real-world implications of GenAI.

### Open Communication and Iterative Improvement

Transparent, continuous communication is equally crucial. Industry experts consistently highlight the importance of maintaining open channels throughout the lifecycle of GenAI projects. As [one best-practice guide](https://shelf.io/blog/10-ai-output-review-best-practices-for-smes/) suggests, “collaborating and maintaining open lines of communication are essential” for achieving a “shared understanding and comprehensive integration of expert insights.”

In practice, this could mean establishing regular virtual meetings, such as weekly demos, where stakeholders from distributed locations collectively review GenAI outputs. These joint remote sessions encourage open discussion, rapid feedback loops, and collaborative refinement of both models and evaluation criteria, ensuring alignment despite even potential geographic dispersion. Such transparency ensures no team becomes isolated, fostering mutual trust across the organization:

<ul><li><strong>Engineers</strong> receive clear, actionable feedback grounded in real-world needs.</li><li><strong>SMEs</strong> feel valued, ensuring their expertise shapes outcomes meaningfully.</li><li><strong>Business leaders</strong> see rigorous, transparent evaluations directly linked to strategic objectives.</li></ul>

[Roblox](https://www.youtube.com/watch?v=pSD_Sg3SSZc&list=PLHYy8ChnMLKB1mP4ohDv3MYwmalr1wA33&index=11) provides a notable example of this approach in practice. They emphasize "fearless transparency and iteration in public," openly sharing their product roadmap and actively inviting user and community feedback. This rapid, iterative process allows Roblox to quickly adapt features based on real-world usage and user input, releasing improvements weekly rather than quarterly or annually. Their commitment to transparency, both internally and externally, ensures swift responsiveness, cross-functional collaboration, and alignment with community needs—core reasons behind their successful GenAI deployment.

### Managing Communication Overhead

However, proactive communication isn't without its challenges. Organizations risk generating excessive overhead through too many meetings, redundant documentation, and cumbersome approval processes. [A PagerDuty case study](https://www.zenml.io/llmops-database/rapid-development-and-deployment-of-enterprise-llm-features-through-centralized-llm-service-architecture) highlights this issue clearly, noting how managing multiple stakeholders sometimes slowed development cycles.

To mitigate this, organizations should adopt structured OCM best practices, including:

<ul><li>Clearly define roles and responsibilities early in the project lifecycle.</li><li>Establish standardized communication processes that balance transparency with efficiency.prioritizing people and collaboration through deliberate OCM practices, such as readiness assessments, communication cascades, and champion networks, just as rigorously as technical excellence.</li></ul>

By carefully balancing thoroughness and efficiency in education and communication, organizations can maintain momentum in GenAI projects, foster productive collaboration, and avoid the pitfalls of unnecessary complexity.

**Key Takeaways:**

<ul><li>Prioritize proactive education to align stakeholders and demystify GenAI capabilities.</li><li>Maintain open, transparent communication through regular collaborative sessions and iterative feedback loops.</li><li>Leverage evaluations as educational tools to build stakeholder understanding and buy-in.</li><li>Balance communication transparency with efficiency to minimize overhead.</li></ul>

## Conclusion

For platform engineers and technical leaders, deploying successful generative AI systems requires more than just technical expertise—it demands deep organizational awareness, proactive communication skills, and genuine empathy toward the human factors that inevitably arise. Misaligned expectations from executives, siloed teams disconnected from business goals, resistance from subject-matter experts, and conflicts crystallizing around evaluation metrics—all these challenges underscore the importance of prioritizing people and collaboration just as rigorously as technical excellence.

Effective LLMOps requires proactive alignment of expectations through structured readiness assessments, clear communication cascades across functions, establishment of champion networks, and intentional team integration from the outset.

Ignoring these aspects isn't simply an oversight; it poses serious risks to generative AI projects. Embracing the human element proactively and thoughtfully isn’t optional—it's essential for unlocking the real value of AI across your organization.

## Action Plan for LLMOps Success

Every organisation or company is slightly different which makes the task of coming up with a generic list of suggestions much harder. Nevertheless in the list that follows I tried to condense down some of the actionable points from the text above. You will certainly want to think through each one and assess the extent to which it matches your particular situation(s).

<ol><li><strong>Conduct Readiness Assessments</strong><ul><li>Evaluate organizational preparedness and identify potential human-centric challenges before initiating projects.</li></ul></li><li><strong>Align Executive Expectations Early</strong><ul><li>Hold strategic briefings to set realistic expectations, clarify goals, and secure executive buy-in.</li></ul></li><li><strong>Create Cross-functional Squads</strong><ul><li>Establish teams combining SMEs, data scientists, engineers, and business stakeholders to ensure comprehensive understanding and collaboration.</li></ul></li><li><strong>Identify and Empower SME Champions</strong><ul><li>Select subject-matter experts to champion GenAI initiatives, providing them clear roles and visibility to influence project outcomes.</li></ul></li><li><strong>Implement Structured Communication Plans</strong><ul><li>Develop and maintain transparent, regular communication channels (e.g., weekly demos, newsletters) to ensure continuous alignment.</li></ul></li><li><strong>Bridge Skill Gaps Through Targeted Education</strong><ul><li>Provide tailored educational programs to address technical knowledge gaps between data science, engineering teams, and SMEs.</li></ul></li><li><strong>Standardize Evaluation Metrics Collaboratively</strong><ul><li>Facilitate joint sessions to agree on shared evaluation criteria that combine technical performance with practical business outcomes.</li></ul></li><li><strong>Address Distributed Team Dynamics Proactively</strong><ul><li>Implement standardized asynchronous communication channels, regular synchronous check-ins, and intentional virtual social interactions to enhance cohesion, communication, and alignment in geographically dispersed teams.</li></ul></li></ol>

By systematically addressing these areas, organizations can proactively tackle human-centered hurdles, maximizing the success and impact of their generative AI deployments.