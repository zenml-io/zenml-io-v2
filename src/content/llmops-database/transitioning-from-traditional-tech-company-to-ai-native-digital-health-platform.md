---
title: "Transitioning from Traditional Tech Company to AI-Native Digital Health Platform"
slug: "transitioning-from-traditional-tech-company-to-ai-native-digital-health-platform"
draft: false
llmopsTags:
  - "healthcare"
  - "chatbot"
  - "code-generation"
  - "prompt-engineering"
  - "error-handling"
  - "evals"
  - "human-in-the-loop"
  - "documentation"
  - "monitoring"
  - "guardrails"
  - "reliability"
  - "anthropic"
industryTags: "healthcare"
company: "Maven Clinic"
summary: "Maven Clinic, the largest digital health platform focused on women and families, describes their two-year journey transforming from a traditional technology company to an AI-native organization. The company built Maven Intelligence, an orchestration layer that enables AI across all their products. Their transformation focused on three pillars: adopting AI tools internally for daily operations, integrating AI into products to improve user experience and reduce operational costs (like 24/7 AI chatbots), and fundamentally changing their culture, processes, and hiring practices. The initiative resulted in dramatic productivity gains, with engineers now producing thousands of lines of code daily instead of hundreds, while maintaining reliability through rigorous testing protocols including integration test suites with 90% pass rates and dedicated conversation review processes to manage LLM hallucinations."
link: "https://www.youtube.com/watch?v=WJRdLNhrsLQ"
year: 2026
seo:
  title: "Maven Clinic: Transitioning from Traditional Tech Company to AI-Native Digital Health Platform - ZenML LLMOps Database"
  description: "Maven Clinic, the largest digital health platform focused on women and families, describes their two-year journey transforming from a traditional technology company to an AI-native organization. The company built Maven Intelligence, an orchestration layer that enables AI across all their products. Their transformation focused on three pillars: adopting AI tools internally for daily operations, integrating AI into products to improve user experience and reduce operational costs (like 24/7 AI chatbots), and fundamentally changing their culture, processes, and hiring practices. The initiative resulted in dramatic productivity gains, with engineers now producing thousands of lines of code daily instead of hundreds, while maintaining reliability through rigorous testing protocols including integration test suites with 90% pass rates and dedicated conversation review processes to manage LLM hallucinations."
  canonical: "https://www.zenml.io/llmops-database/transitioning-from-traditional-tech-company-to-ai-native-digital-health-platform"
  ogTitle: "Maven Clinic: Transitioning from Traditional Tech Company to AI-Native Digital Health Platform - ZenML LLMOps Database"
  ogDescription: "Maven Clinic, the largest digital health platform focused on women and families, describes their two-year journey transforming from a traditional technology company to an AI-native organization. The company built Maven Intelligence, an orchestration layer that enables AI across all their products. Their transformation focused on three pillars: adopting AI tools internally for daily operations, integrating AI into products to improve user experience and reduce operational costs (like 24/7 AI chatbots), and fundamentally changing their culture, processes, and hiring practices. The initiative resulted in dramatic productivity gains, with engineers now producing thousands of lines of code daily instead of hundreds, while maintaining reliability through rigorous testing protocols including integration test suites with 90% pass rates and dedicated conversation review processes to manage LLM hallucinations."
notion:
  pageId: "3c6f8dff-2538-8090-8f75-cbfd260312d2"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-24T09:05:00.000Z"
  lastEditedTime: "2026-08-24T09:05:00.000Z"
  publishedAt: "2026-08-24T09:16:19Z"
---

## Overview

Maven Clinic operates as the largest digital health platform specializing in women's and family health, covering maternity, fertility, parenting, and menopause services. Starting their AI journey approximately two years ago, the company embarked on a comprehensive transformation from a traditional technology company to what they term an "AI-native" organization. Central to this transformation is Maven Intelligence, an orchestration layer built across all their products to enable AI capabilities company-wide for both internal teams and clients. The presentation provides a candid look at the operational, cultural, and technical changes required to successfully deploy and maintain LLMs in production at scale.

## Strategic Framework for AI-Native Transformation

Maven Clinic's approach to becoming AI-native rests on three fundamental pillars that collectively address the sociotechnical challenges of LLMOps at an organizational level. First, they focus on internal adoption of AI tools for daily operations, encompassing everything from generating daily summaries and managing meetings to creating Jira tasks. The philosophy is that whenever someone would traditionally delegate work to another person, they should first consider whether AI can accomplish the task. This cultural shift has notably impacted leadership behavior, with sales leaders now using AI tools to complete tasks themselves rather than delegating to others.

The second pillar involves embedding AI directly into their product offerings with dual objectives: enhancing user experience and reducing operational costs. A prominent example is their AI-based chatbot system, which provides 24/7 availability to address customer issues instantly. This represents a classic LLMOps use case where the economics and availability benefits of AI agents compare favorably to human agents, though the presentation acknowledges this benefit somewhat uncritically without discussing the nuances of when human interaction might be preferable or necessary.

The third and arguably most critical pillar involves transforming organizational culture, processes, and work methodologies to maximize AI's potential. This represents the deeper systemic changes necessary for successful LLMOps implementation beyond simply deploying models.

## Change Management and Adoption Strategy

Maven Clinic segments their workforce into three groups when implementing AI technologies. Early adopters require minimal intervention beyond tool enablement and encouragement to share learnings across the organization. The majority of users represent the primary focus, for whom the company builds shared AI infrastructure and easy-to-use tools to make adoption seamless. Importantly, they actively listen to this group and iterate based on feedback. A concrete example is the shift in tool preferences: most engineers used Cursor in one year, but many switched to Claude Code the following year, requiring the infrastructure team to support both options to meet users where they are.

For slower adopters with concerns about new technologies, the approach involves understanding their specific worries while maintaining crystal clarity about the company's strategic direction. This balanced approach acknowledges legitimate concerns while ensuring alignment with organizational goals. The segmentation strategy reflects mature change management practices essential for successful LLMOps implementation at scale.

## Hiring and Talent Management in an AI-Native Context

The transformation significantly impacted hiring criteria and performance evaluation. Traditional workflows involved senior engineers identifying problems, designing solutions, and delegating implementation to other engineers for parallel execution. However, with AI coding tools, senior engineers can now implement solutions immediately after designing them, making delegation less efficient due to communication overhead. This fundamentally changes the talent model—new hires must be capable of solving problems independently from day one, as the traditional approach of delegating implementation tasks to junior developers is no longer economically viable.

When hiring, Maven Clinic prioritizes candidates with genuine interest in AI who can keep pace with the rapidly evolving domain and help teams stay current. They also seek engineers with strong product understanding, as the boundary between product managers and engineers has blurred considerably when engineers can accomplish far more with AI assistance. Deep system understanding and the ability to handle complex, ambiguous problems remain valuable, as these represent areas where AI capabilities still fall short. Performance reviews now explicitly include questions about AI contributions, and the company actively rewards individuals who leverage AI to multiply their impact, signaling organizational priorities through formal evaluation mechanisms.

## Process Transformation and Development Velocity

Maven Clinic radically restructured their development process to capitalize on AI's speed advantages. The traditional approach of spending weeks or months on business requirements and design before implementation made sense when implementation was expensive and changes costly. However, with AI making building extremely fast, the bottleneck shifted to refinement and iteration. Their new philosophy maintains long-term vision on a one-year horizon, assuming AI models will be capable of anything needed within that timeframe, but this serves primarily as inspiration and direction rather than rigid planning.

The operational focus concentrates intensely on two-to-four-week sprints. Product managers and designers specify deliverables for the current sprint, engineers focus on implementation and release within or before the sprint ends, while PMs simultaneously flesh out requirements for subsequent sprints. Critically, if decisions made two weeks prior prove incorrect, the team can pivot quickly without significant sunk costs. This requires a cultural shift away from extensive PRDs and technical design documents toward shorter one-to-two-page documents serving primarily as communication vehicles for iteration.

The most challenging aspect is mid-term planning at the three-to-six-month horizon. The company explicitly avoids focusing on this timeframe because predicting AI model capabilities three months forward is unreliable given the rapid release cycles. This represents a departure from traditional quarterly or bi-annual planning processes common in software development, and the presentation acknowledges this creates discomfort for people accustomed to those rhythms. However, they position adapting to this uncertainty as a necessary skill for the AI era, reflecting a pragmatic acceptance of the current pace of foundation model development.

## AI-Assisted Software Development Lifecycle

Maven Clinic's adoption of AI coding tools followed a risk-graduated approach. They started with lowest-risk tasks like writing unit tests and documentation, which are easy to verify and carry minimal risk. This initial phase built confidence and allowed engineers to develop their own rules, skills, and guardrails before expanding usage. The company then pushed adoption to the entire engineering team for all tasks, carefully studying situations where engineers chose not to use AI tools to understand barriers and limitations. Currently, they use AI coding tools for virtually all implementation, with engineers focusing on reviewing, architecting, and evaluation activities.

The dramatic increase in code production created new challenges for code review processes. Engineers who previously wrote hundreds of lines daily now easily produce thousands. Traditional code review processes cannot keep pace with this volume. While they experimented with multiple AI code review tools, which provided some help, the company doesn't yet feel comfortable relying on them entirely, still finding human engineer feedback extremely valuable. This reflects a balanced view recognizing both AI tool limitations and continued human value in quality assurance.

To address the code review bottleneck, Maven Clinic implemented several process changes. Engineers can self-identify PRs that don't require review if they're simple and they feel confident, with the engineer remaining accountable for outcomes. For PRs requiring review, they enforce best practices including limiting each PR to 500 lines maximum, recognizing that meaningful review of thousand-line changes is impractical. They enable stacked PRs where large features are broken into multiple reviewable PRs, allowing engineers to continue work while earlier PRs undergo review. The company actively works to avoid "rubber stamp" approvals where reviewers blindly approve PRs they cannot meaningfully assess, as this creates false confidence. They continue investing in AI code review tools, viewing automation of this process as the ultimate future state.

The long-term vision involves AI tools assisting at each step of the software development lifecycle, with the ultimate goal of automating the entire end-to-end process from design through implementation to release. More ambitiously, they aim for AI tools capable of monitoring live traffic, catching issues early, and automatically fixing problems. The presentation acknowledges they haven't achieved this vision yet, representing an honest assessment of current capabilities versus aspirational goals.

## Reliability, Testing, and Quality Assurance

The reliability challenges of GenAI systems represent a critical LLMOps concern that Maven Clinic addresses through a holistic, multi-layered approach. Unlike traditional software that behaves deterministically according to its implementation, GenAI solutions inherently produce hallucinations that cannot be completely eliminated, and total elimination might be unnecessarily costly. The key insight involves distinguishing between acceptable and unacceptable failures based on user impact and business risk.

For appointment scheduling functionality, they tolerate failure rates around one in a thousand as acceptable because users can simply retry with minimal friction. However, for reimbursement claim submissions where incorrect amounts would immediately cause escalations, they implement stringent safeguards. Their approach for high-risk functions involves using multiple different models to process the same input, proceeding only when results agree across models. When models disagree and the system cannot determine the correct answer, they proactively offer to connect the customer with a human agent rather than making a potentially incorrect automated decision. This represents a sophisticated risk-based approach to managing LLM non-determinism in production.

Their testing infrastructure includes hundreds of integration tests covering all known use cases, with continuous expansion of the test suite. Critically, because LLMs can produce different outputs, they run each test case multiple times rather than relying on single-pass validation. They consistently require high pass rates, specifically mentioning 90% as a threshold, across all test executions. This statistical approach to testing acknowledges LLM stochasticity while maintaining quality standards through aggregate metrics.

Post-deployment evaluation involves an automated evaluation system that carefully assesses each conversation against predefined rubrics specifying what constitutes good or bad interactions. This generates scores that teams review regularly. Beyond automation, they maintain a dedicated group whose primary responsibility is reviewing conversations through spot-checking, which serves dual purposes: identifying system improvements and calibrating whether rubrics themselves are too strict or too loose, enabling continuous improvement of evaluation criteria. When launching new features, they escalate from spot-checking to reviewing approximately 20% of conversations, demonstrating a risk-graduated monitoring approach. This comprehensive evaluation strategy combining automated metrics with human review reflects mature LLMOps practices for maintaining quality despite inherent hallucination risks.

## Critical Assessment and Tradeoffs

While the presentation offers valuable insights into real-world LLMOps implementation, it maintains a consistently positive framing that may not fully explore tradeoffs. The claim that AI chatbots are uniformly "way better and cheaper" than human agents oversimplifies situations where customers prefer or need human interaction, particularly in healthcare contexts involving sensitive personal matters. The dramatic productivity claims around engineers producing thousands versus hundreds of lines of code daily should be evaluated considering whether all generated code provides equivalent value, as volume doesn't necessarily equate to business impact.

The elimination of mid-term planning creates genuine challenges for resource allocation, cross-team coordination, and stakeholder communication that the presentation acknowledges only briefly. Organizations with longer procurement cycles, regulatory requirements, or complex interdependencies may find this approach impractical. The shift in work structure may negatively impact junior engineer development, as traditional learning through implementation tasks under senior guidance diminishes when seniors implement directly with AI assistance. Alternative mentorship approaches would likely be necessary to develop junior talent effectively.

The heavy emphasis on speed and iteration could potentially compromise thoughtful architecture and design, though the presentation doesn't address how they balance rapid iteration with technical debt management and long-term system sustainability. The accountability mechanisms for self-approved PRs without code review remain unclear, and whether engineers truly make sound judgments about when review is unnecessary represents a potential quality risk.

Nevertheless, the case study demonstrates sophisticated thinking about several LLMOps challenges. The risk-based approach to reliability, distinguishing between acceptable and unacceptable failures, shows practical wisdom. The statistical testing approach with multiple runs and aggregate metrics properly addresses LLM non-determinism. The combination of automated evaluation with dedicated human review represents a mature quality assurance strategy. The honest acknowledgment that they haven't achieved their vision of fully automated development lifecycle suggests realistic expectations rather than overblown claims.

## Organizational and Cultural Dimensions

The transformation at Maven Clinic illustrates that successful LLMOps extends far beyond model deployment to encompass organizational structure, incentive systems, hiring practices, and work processes. The explicit inclusion of AI contributions in performance reviews signals strategic priorities and shapes behavior across the engineering organization. The segmented change management approach recognizing different adoption profiles demonstrates understanding that technological transformation is fundamentally a human challenge requiring tailored interventions.

The shift from extensive documentation to lightweight communication artifacts reflects adaptation to increased iteration velocity, though this requires high trust and strong communication skills across teams. The willingness to support multiple tools based on user preferences rather than mandating standardization shows pragmatic flexibility prioritizing adoption over control, though this creates infrastructure complexity and support burden.

The Maven Intelligence orchestration layer represents architectural thinking about enabling AI broadly across products rather than point solutions, suggesting systematic rather than ad-hoc approaches to LLMOps infrastructure. While technical details about this layer remain sparse in the presentation, its existence indicates investment in reusable capabilities and platforms rather than reinventing foundational elements for each use case.

## Conclusion

Maven Clinic's journey offers a comprehensive view of organizational transformation necessary for effective LLMOps at scale. Their experience highlights that success requires coordinated changes across technology, process, culture, and people dimensions rather than simply deploying models. The risk-graduated approaches to both adoption and reliability, the statistical testing methodologies addressing non-determinism, and the hybrid automation-human evaluation systems demonstrate mature operational practices. However, the consistently positive framing should be balanced with recognition that tradeoffs exist around planning horizons, junior developer growth, technical debt, and the limits of automation. Organizations considering similar transformations should carefully evaluate which elements apply to their context, constraints, and risk tolerances rather than wholesale adoption of the approach.
