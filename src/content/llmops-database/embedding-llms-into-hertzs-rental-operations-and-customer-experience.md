---
title: "Embedding LLMs into Hertz’s Rental Operations and Customer Experience"
slug: "embedding-llms-into-hertzs-rental-operations-and-customer-experience"
draft: false
llmopsTags:
  - "customer-support"
  - "classification"
  - "data-analysis"
  - "unstructured-data"
  - "human-in-the-loop"
  - "evals"
  - "databases"
  - "monitoring"
  - "openai"
  - "databricks"
industryTags: "automotive"
company: "OpenAI / Hertz Global / Databricks"
summary: "Hertz is using OpenAI models and Databricks to turn operational expertise and large volumes of unstructured customer feedback into production workflows. In insurance-replacement rentals, nontechnical domain experts built a Databricks application that operationalizes a high-performing general manager’s meeting and accountability process, reportedly bringing lower-performing divisions closer to the best-performing standard. In customer experience, models classify phone and survey feedback into employee recognition and operational issues, routing actionable intelligence to managers and systemic teams. The approach emphasizes workflow redesign, human oversight, observability, evaluations, and focused deployment rather than isolated productivity pilots; however, the presentation provides limited independently validated outcome metrics and does not establish that the reported improvements were caused solely by the AI systems."
link: "https://www.youtube.com/watch?v=jjxYvFWh4do"
year: 2026
seo:
  title: "OpenAI / Hertz Global / Databricks: Embedding LLMs into Hertz’s Rental Operations and Customer Experience - ZenML LLMOps Database"
  description: "Hertz is using OpenAI models and Databricks to turn operational expertise and large volumes of unstructured customer feedback into production workflows. In insurance-replacement rentals, nontechnical domain experts built a Databricks application that operationalizes a high-performing general manager’s meeting and accountability process, reportedly bringing lower-performing divisions closer to the best-performing standard. In customer experience, models classify phone and survey feedback into employee recognition and operational issues, routing actionable intelligence to managers and systemic teams. The approach emphasizes workflow redesign, human oversight, observability, evaluations, and focused deployment rather than isolated productivity pilots; however, the presentation provides limited independently validated outcome metrics and does not establish that the reported improvements were caused solely by the AI systems."
  canonical: "https://www.zenml.io/llmops-database/embedding-llms-into-hertzs-rental-operations-and-customer-experience"
  ogTitle: "OpenAI / Hertz Global / Databricks: Embedding LLMs into Hertz’s Rental Operations and Customer Experience - ZenML LLMOps Database"
  ogDescription: "Hertz is using OpenAI models and Databricks to turn operational expertise and large volumes of unstructured customer feedback into production workflows. In insurance-replacement rentals, nontechnical domain experts built a Databricks application that operationalizes a high-performing general manager’s meeting and accountability process, reportedly bringing lower-performing divisions closer to the best-performing standard. In customer experience, models classify phone and survey feedback into employee recognition and operational issues, routing actionable intelligence to managers and systemic teams. The approach emphasizes workflow redesign, human oversight, observability, evaluations, and focused deployment rather than isolated productivity pilots; however, the presentation provides limited independently validated outcome metrics and does not establish that the reported improvements were caused solely by the AI systems."
notion:
  pageId: "3e9f8dff-2538-803e-97c0-e3c07dbb87ed"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:12:00.000Z"
  lastEditedTime: "2026-09-28T08:12:00.000Z"
  publishedAt: "2026-09-28T08:25:55Z"
---

## Overview

Hertz is embedding generative AI into rental operations rather than treating it solely as an employee productivity add-on. The most concrete examples are an insurance-replacement rental workflow and a customer-feedback intelligence workflow. The company uses operational data held in Databricks together with OpenAI models to convert business rules, expert practices, and unstructured feedback into applications that managers and frontline teams use as part of recurring work. A notable feature is that business-domain employees, rather than only professional software engineers, reportedly built and iterated on at least one of the applications using Codex and Databricks capabilities.

The presentation positions this as a move from experimentation toward production deployment: AI is inserted into operational decision-making, assigned to accountable people, and connected to existing reporting and management routines. The reported results are promising, including improved consistency across insurance-replacement divisions and more actionable handling of customer comments. Nevertheless, the available evidence is primarily an account from the companies involved. It does not provide a controlled comparison, detailed quality metrics, cost data, error rates, or independently verified attribution of business improvements to the models.

## Problem and Use Cases

Hertz’s insurance-replacement business receives opportunities from insurance partners when a customer’s vehicle is being repaired after an accident. A rental opportunity does not automatically become a completed rental, and the company reported that roughly 60–65% of such opportunities converted into rentals. Performance varied substantially among divisions. Analysis reportedly indicated that geography and insurance-partner type were not the strongest correlating factors; leadership practices, especially those of the general manager responsible for a division, were more closely associated with conversion performance.

A high-performing general manager had a structured operating process for reviewing leads with branch managers. The review examined every lead and asked what happened: whether the customer did not need a vehicle, did not want one, or whether Hertz could not provide a vehicle when it was needed. Previously, disseminating this practice would have depended more heavily on traditional IT delivery and broad management instruction. Hertz instead converted the process into an application that guides leaders through meeting preparation, lead-level accountability, reporting, and follow-up.

The second use case concerns customer experience. Hertz receives millions of customer feedback points from channels including phone calls and Net Promoter Score surveys. Feedback may identify an employee who deserves recognition, a vehicle-specific problem such as low tire pressure, or a broader service and infrastructure issue such as insufficient roadside tire coverage in a region. The objective is to classify each comment at an actionable level and route it to the appropriate location, manager, or systemic improvement process.

## Architecture and Production Workflow

The described data foundation is Databricks. The insurance-replacement application uses data exported from Excel as well as data in Lakebase and existing Unity Catalog volumes. The application was reportedly built and made live in approximately 11 business days, or roughly five to six days for the initial team build in another description of the effort. The builders were described as operational-domain experts rather than software engineers. OpenAI models, identified in the presentation as GPT 5.5, and Codex were used to help turn the business process into a working Databricks application.

The architecture is best understood as an application layer over governed business data, with model-supported interpretation and workflow generation rather than an unconstrained conversational chatbot. The insurance-replacement system presents structured meeting preparation and review steps. It uses operational records to focus leaders on individual opportunities and to make follow-up behavior visible. This is important from an LLMOps perspective: the model-enabled component is embedded in a repeatable process with defined users, inputs, outputs, and accountability rather than being left as an optional assistant.

For customer feedback, the system processes phone and survey comments and categorizes them into operationally meaningful issues. The output can identify a named employee for recognition, associate a problem with a specific vehicle, or expose a pattern that should be addressed across a location or region. The intended routing is part of the value chain. A classification that is not delivered to a person or team able to act on it would have limited operational value, so the system connects inference with manager stand-ups, maintenance follow-up, employee recognition, and coverage decisions.

The examples imply a mixture of structured and unstructured data. Existing transactional and reporting data supplies context, while natural-language comments provide details that were previously difficult to analyze at line-item scale. Model inference makes it possible to extract categories, entities, and action cues from individual comments, but the final operating model still depends on Hertz’s business systems and human teams.

## LLMOps and Deployment Practices

The deployment philosophy is to redesign the workflow instead of adding AI to an unchanged sequence of handoffs. One proposed pattern is to let AI take the first pass while retaining humans for specified intents, thresholds, or exceptions. In an enterprise setting, this creates an explicit control boundary: routine cases may receive automated interpretation or preparation, while sensitive, ambiguous, or high-impact cases can be escalated. The presentation does not specify the exact thresholds or escalation policy used by Hertz, so those controls should be treated as design requirements rather than documented implementation details.

The approach also emphasizes choosing a narrow, measurable wedge instead of accumulating many disconnected pilots. A suitable production initiative should have accountable owners, a dedicated group, a deadline, and outcome metrics. Hertz’s insurance-replacement application illustrates this pattern because it targets a specific operational process and a defined performance difference between divisions. The application then provides a mechanism for scaling a best-known management practice without requiring every division to independently recreate it.

Trust and observability are presented as prerequisites for broader adoption. Recommended practices include tracing system behavior, auditing outputs, and writing evaluations that compare model-supported results with objective expectations. These practices are particularly important in customer-feedback classification: errors could misrecognize employees, misroute a maintenance issue, or cause a local symptom to be mistaken for a systemic trend. A mature implementation would monitor classification quality by category, routing accuracy, escalation rates, latency, cost, and the downstream completion of assigned actions, although the presentation does not report those measurements.

The use of Codex and similar tools changes the development and iteration model. Domain experts can describe the process they already run, produce an initial application, and refine it directly instead of submitting a long sequence of IT tickets. This can shorten time to deployment and preserve process knowledge that might otherwise be lost in a requirements handoff. It also introduces governance concerns: nontechnical builders still need secure access controls, code review, data protection, dependency management, testing, rollback procedures, and ownership for production incidents. The reported speed of development should therefore be interpreted as time to an operational application, not as evidence that conventional software and model-risk controls are unnecessary.

## Results and Tradeoffs

Hertz reports that the insurance-replacement tool helped bring middle- and lower-performing divisions toward the performance level associated with the best-performing general manager. The application also created additional reporting and accountability around every lead. For customer experience, the claimed benefit is that individual feedback can become actionable intelligence: positive comments can support employee recognition, while vehicle and roadside complaints can trigger both immediate remediation and broader operational analysis.

These outcomes are plausible because the systems connect model outputs to established management actions. They are not presented with enough detail to calculate a return on investment or verify a causal effect. The source does not state post-deployment conversion percentages, the number of divisions using the application, model precision and recall, human override rates, infrastructure costs, or the proportion of feedback successfully routed and resolved. It also does not explain whether model outputs are advisory, automatically written to downstream systems, or reviewed before assignment. Those gaps matter when assessing production reliability and economic value.

The principal tradeoff is between speed and control. Enabling domain experts to build quickly can unlock many small improvements and reduce dependence on centralized engineering, but decentralized development can create inconsistent prompts, duplicate systems, privacy risks, and uneven testing. Central governance through Databricks data controls and Unity Catalog can help, but governance must extend to model access, prompt and code changes, evaluation datasets, audit logs, and the permissions associated with customer and employee data.

Overall, the Hertz example demonstrates a practical LLMOps pattern: start with a bounded business wedge, use governed enterprise data, embed model inference in a recurring workflow, preserve human accountability, and measure the system rather than relying on enthusiasm about model capability. Its strongest evidence is the reported deployment speed and the alignment between AI outputs and concrete operational actions. Its main limitation is that the public account supplies directional claims rather than a complete production scorecard, so the reported business improvements should be validated with longitudinal metrics and independent evaluation before being generalized to other Hertz processes or enterprises.
