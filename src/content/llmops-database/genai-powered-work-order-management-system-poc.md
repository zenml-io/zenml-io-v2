---
title: "GenAI-Powered Work Order Management System POC"
slug: "genai-powered-work-order-management-system-poc"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3e5848f0202b77dd8007"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:45:40.016Z"
  createdOn: "2024-11-21T14:06:16.146Z"
llmopsTags:
  - "classification"
  - "databases"
  - "documentation"
  - "error-handling"
  - "human-in-the-loop"
  - "legacy-system-integration"
  - "microsoft-azure"
  - "monitoring"
  - "poc"
  - "prompt-engineering"
  - "reliability"
  - "scalability"
  - "security"
  - "semantic-search"
industryTags: "other"
company: "NTT Data"
summary: "An international infrastructure company partnered with NTT Data to evaluate whether GenAI could improve their work order management system that handles 500,000+ annual maintenance requests. The POC focused on automating classification, urgency assessment, and special handling requirements identification. Using a privately hosted LLM with company-specific knowledge base, the solution demonstrated improved accuracy and consistency in work order processing compared to the manual approach, while providing transparent reasoning for classifications."
link: "https://us.nttdata.com/en/blog/2024/june/lessons-learned-from-a-genai-proof-of-concept"
year: 2024
seo:
  title: "NTT Data: GenAI-Powered Work Order Management System POC - ZenML LLMOps Database"
  description: "An international infrastructure company partnered with NTT Data to evaluate whether GenAI could improve their work order management system that handles 500,000+ annual maintenance requests. The POC focused on automating classification, urgency assessment, and special handling requirements identification. Using a privately hosted LLM with company-specific knowledge base, the solution demonstrated improved accuracy and consistency in work order processing compared to the manual approach, while providing transparent reasoning for classifications."
  canonical: "https://www.zenml.io/llmops-database/genai-powered-work-order-management-system-poc"
  ogTitle: "NTT Data: GenAI-Powered Work Order Management System POC - ZenML LLMOps Database"
  ogDescription: "An international infrastructure company partnered with NTT Data to evaluate whether GenAI could improve their work order management system that handles 500,000+ annual maintenance requests. The POC focused on automating classification, urgency assessment, and special handling requirements identification. Using a privately hosted LLM with company-specific knowledge base, the solution demonstrated improved accuracy and consistency in work order processing compared to the manual approach, while providing transparent reasoning for classifications."
---

## Overview

This case study describes a GenAI proof of concept (POC) conducted by NTT Data for a leading international infrastructure company that manages housing complexes across the United States. The company handles over 500,000 maintenance requests annually, with approximately 70 employees manually processing around 1,500 work orders per day. The core challenge was that the manual approach to categorizing and managing work orders created significant opportunities for error and inconsistency in how each request was handled.

The POC was developed in under two weeks, demonstrating a rapid prototyping approach to GenAI adoption. It's worth noting that this case study comes from NTT Data's own blog, so the perspective is naturally favorable to their services and approach. However, the technical details and lessons learned provide valuable insights into real-world LLMOps considerations.

## Business Problem and Use Case Definition

The infrastructure company wanted to understand if GenAI could improve both accuracy and efficiency in their work order management system. The specific tasks involved in work order processing include scheduling, dispatching, updating, and solving service-related problems. The POC was scoped to address three main business questions:

- What expertise is required to address the resident's problem (classification into one of over 160 categories)
- What is the urgency level for the request (time prioritization)
- Are there any special-handling requirements (such as resident not home, return trip needed, or parts needing to be ordered)

This scoping exercise is a critical LLMOps consideration—the team focused on specific, measurable outcomes rather than attempting to automate the entire work order process at once. This incremental approach is a best practice for GenAI adoption, as it allows for faster iteration and clearer success metrics.

## Technical Architecture and Security Considerations

A notable aspect of this implementation was the client's requirement that the POC be built and hosted in a secure, third-party environment with a privately hosted large language model. NTT Data used their own infrastructure to host the LLM, which mitigated data privacy and security risks. This approach demonstrated that a fully functional AI tool could be built and eventually deployed within the client's own firewall.

This security-first approach is increasingly important in enterprise LLMOps, particularly for companies handling sensitive resident information and maintenance data. The decision to use a privately hosted LLM rather than a public API service reflects growing enterprise concerns about data sovereignty, compliance, and the risks associated with sending proprietary information to third-party services.

## Knowledge Base Construction and Prompt Engineering

The solution leveraged the client's existing documentation, including well-documented policies, procedures, requirements, and a comprehensive list of over 160 work order categories. This information was used to prompt the LLM on the intricacies of accurately classifying incoming requests.

This represents a form of retrieval-augmented generation (RAG) or at minimum, extensive prompt engineering using domain-specific knowledge. By grounding the LLM's responses in the company's actual policies and categorization schema, the team was able to achieve reasonably accurate output even for ambiguous cases that human operators might struggle with—for example, determining whether a reported leak is a plumbing or HVAC issue.

The case study mentions that long-term, the client will use a custom application to adjust policies and add clarifications for the LLM, suggesting a continuous improvement model where the knowledge base and prompts can be refined over time. This iterative refinement is a key aspect of production LLM systems—the initial deployment is rarely perfect, and organizations need mechanisms to update and improve the system based on real-world feedback.

## Explainability and Audit Trail

One of the distinguishing features of this GenAI solution was its ability to provide reasoning behind each classification decision. The LLM not only classifies each work order but explains why it was categorized in a particular way. This transparency provides several benefits:

- Creates a valuable audit trail for accountability
- Enables insights into how the current manual process can be improved
- Allows human operators to verify and learn from the AI's reasoning
- Supports compliance and quality assurance requirements

Explainability is increasingly recognized as essential for enterprise AI adoption. Many organizations are reluctant to deploy "black box" systems, particularly for customer-facing or operationally critical processes. By having the LLM articulate its reasoning, the solution becomes more trustworthy and easier to debug when errors occur.

## Performance and Outcomes

According to NTT Data, the GenAI solution demonstrated the capability to more quickly, accurately, and consistently classify work orders than the current manual approach. The case study suggests that over time, the LLM will continue to improve as policies are tweaked, potentially providing superior consistency compared to human operators with little to no additional training.

However, it's important to note that this was a proof of concept, and specific quantitative metrics (accuracy rates, time savings, error reduction percentages) are not provided. The claim that the solution outperforms human operators should be viewed with appropriate skepticism until validated in a production environment with rigorous evaluation.

## Deployment Strategy and Change Management

The client's near-term plan is not to immediately replace human operators but rather to use the solution to understand how best to train and equip the current work-order processing team. This human-in-the-loop approach is a prudent strategy for initial GenAI deployments, as it allows the organization to:

- Validate the system's accuracy in real-world conditions
- Build organizational trust in the technology
- Identify edge cases and failure modes before full automation
- Use AI insights to improve human processes

Only once the LLM consistently demonstrates its usefulness will the company plan a full deployment. This staged rollout approach reduces risk and allows for course correction if issues arise.

## Lessons Learned and Best Practices

The case study offers several lessons that are relevant to LLMOps practitioners:

**Business Value First**: The recommendation to start with business value before examining technology enablement is sound. Identifying and prioritizing the right use cases is critical for GenAI success, and this particular POC had clear potential to improve efficiency and resident satisfaction.

**Speed with Patience**: The advice to move fast but be patient acknowledges the experimental nature of early GenAI initiatives. POCs may not prove their value immediately, and organizations should be prepared to iterate or pivot based on learnings. The two-week development timeline demonstrates that rapid prototyping is possible with GenAI.

**Partner Selection**: The case study emphasizes the value of working with external partners who can bring both technical skills and strategic perspective. This is particularly relevant for organizations new to GenAI who may not have the internal expertise to evaluate the technology landscape or identify optimal use cases.

## Critical Assessment

While the case study presents a positive narrative, several aspects warrant careful consideration:

- The specific accuracy metrics and comparative performance data are not disclosed, making it difficult to objectively assess the solution's effectiveness
- The two-week development timeline, while impressive, may not include the time required for proper testing, validation, and production hardening
- The claim that the LLM will "continue to improve over time" assumes effective feedback mechanisms and ongoing maintenance, which require sustained investment
- The focus on a proof of concept means the real challenges of production deployment (scalability, reliability, monitoring, edge cases) have not yet been addressed

That said, the approach taken—scoped POC, security-first architecture, explainable outputs, staged deployment—reflects sensible LLMOps practices that other organizations can learn from. The emphasis on using GenAI to augment rather than immediately replace human workers is also a pragmatic strategy for building organizational buy-in and managing change.

## Conclusion

This case study illustrates how a traditional, process-heavy organization can begin exploring GenAI capabilities through carefully scoped proofs of concept. The infrastructure company's work order classification challenge represents a common enterprise use case: high-volume, semi-structured text classification with the need for accuracy, consistency, and auditability. The solution's emphasis on explainability, private hosting, and human-in-the-loop deployment reflects mature thinking about enterprise AI adoption, even at the POC stage.