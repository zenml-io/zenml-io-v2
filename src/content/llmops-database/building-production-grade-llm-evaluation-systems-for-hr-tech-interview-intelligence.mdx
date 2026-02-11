---
title: "Building Production-Grade LLM Evaluation Systems for HR Tech Interview Intelligence"
slug: "building-production-grade-llm-evaluation-systems-for-hr-tech-interview-intelligence"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6925a0261e14432c4914a269"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:28:56.293Z"
  createdOn: "2025-11-25T12:25:10.313Z"
llmopsTags:
  - "healthcare"
  - "customer-support"
  - "classification"
  - "chatbot"
  - "high-stakes-application"
  - "structured-output"
  - "regulatory-compliance"
  - "prompt-engineering"
  - "few-shot"
  - "human-in-the-loop"
  - "error-handling"
  - "agent-based"
  - "evals"
  - "langchain"
  - "monitoring"
  - "cicd"
  - "documentation"
  - "compliance"
  - "guardrails"
  - "reliability"
  - "security"
  - "openai"
  - "anthropic"
  - "microsoft-azure"
industryTags: "hr"
company: "Zebra"
summary: "Spotted Zebra, an HR tech company building AI-powered hiring software for large enterprises, faced challenges scaling their interview intelligence product when transitioning from slow research-phase development to rapid client-driven iterations. The company developed a comprehensive evaluation framework centered on six key lessons: codifying human judgment through golden examples, versioning prompts systematically, using LLM-as-a-judge for open-ended tasks, building adversarial testing banks, implementing robust API logging, and treating evaluation as a strategic capability. This approach enabled faster development cycles, improved product quality, better client communication around fairness and transparency, and successful compliance certification (ISO 42001), positioning them for EU AI Act requirements."
link: "https://www.youtube.com/watch?v=PlddJSisZFM"
year: 2025
seo:
  title: "Zebra: Building Production-Grade LLM Evaluation Systems for HR Tech Interview Intelligence - ZenML LLMOps Database"
  description: "Spotted Zebra, an HR tech company building AI-powered hiring software for large enterprises, faced challenges scaling their interview intelligence product when transitioning from slow research-phase development to rapid client-driven iterations. The company developed a comprehensive evaluation framework centered on six key lessons: codifying human judgment through golden examples, versioning prompts systematically, using LLM-as-a-judge for open-ended tasks, building adversarial testing banks, implementing robust API logging, and treating evaluation as a strategic capability. This approach enabled faster development cycles, improved product quality, better client communication around fairness and transparency, and successful compliance certification (ISO 42001), positioning them for EU AI Act requirements."
  canonical: "https://www.zenml.io/llmops-database/building-production-grade-llm-evaluation-systems-for-hr-tech-interview-intelligence"
  ogTitle: "Zebra: Building Production-Grade LLM Evaluation Systems for HR Tech Interview Intelligence - ZenML LLMOps Database"
  ogDescription: "Spotted Zebra, an HR tech company building AI-powered hiring software for large enterprises, faced challenges scaling their interview intelligence product when transitioning from slow research-phase development to rapid client-driven iterations. The company developed a comprehensive evaluation framework centered on six key lessons: codifying human judgment through golden examples, versioning prompts systematically, using LLM-as-a-judge for open-ended tasks, building adversarial testing banks, implementing robust API logging, and treating evaluation as a strategic capability. This approach enabled faster development cycles, improved product quality, better client communication around fairness and transparency, and successful compliance certification (ISO 42001), positioning them for EU AI Act requirements."
---

## Overview

Spotted Zebra is an HR technology company that builds software-as-a-service solutions for large enterprises (typically over 5,000 employees) focused on AI-powered hiring software. The company's approach centers on "skill science at scale," using AI to help organizations handle both high-volume hiring scenarios (e.g., 200 job roles with 10,000 applicants) and senior executive hiring where differentiation between highly qualified candidates is critical. The company combines comprehensive psychometric testing, AI-powered interview intelligence, and occupational psychology best practices delivered by in-house psychometricians and occupational psychologists (referred to internally as "OP" or "oxy").

The case study focuses specifically on Brad Smith, the AI lead at Spotted Zebra, who joined in August 2024 and was tasked with building out the AI team, establishing AI infrastructure, and creating AI-native products. The primary product discussed is "Skills Evaluation," which moved from development to production during the period covered by this talk. This presentation shares six critical lessons learned about evaluation when operating LLMs in production, with the central thesis that evaluation fundamentals have provided more business impact than advanced techniques like fine-tuning, RAG, or agents.

## The Skills Evaluation Product

The Skills Evaluation product addresses a common challenge for hiring managers who conduct numerous interviews daily (5-10 or more), creating significant cognitive load. The system works by having a bot join interview calls (either in-person with a laptop or online via Teams or other conferencing software). The bot transcribes the conversation in real-time and passes the transcript to AI models for post-processing. The models extract evidence of soft skills, technical skills, and alignment with company values from the transcript. This reduces cognitive load for hiring managers while helping them make better-informed decisions, positioning AI as a decision-support tool rather than a decision-maker. The system is fundamentally about "driving skill science at scale using AI to help humans make decisions."

## Initial Development Challenges

When the project started, it was a greenfield research initiative with no hard deadlines and an acceptable pace. Development followed a simple iterative cycle: Smith would modify prompts in what was initially a purely prompt-based system, share changes with the occupational psychology team for feedback, incorporate their suggestions, and repeat. This informal and frequent feedback loop worked adequately for the research phase.

However, the development pace dramatically shifted when a prospective client expressed strong interest in the software. The feedback cycle transformed from informal and frequent to formal and very regular—sometimes multiple times per day. The company describes this period as compressing "a year's worth of development" into just a few months. This acceleration necessitated fundamental changes to how they approached evaluation and testing, leading to the six lessons shared in the presentation.

## Lesson 1: Codify Human Judgment Through Golden Examples

While "human in the loop" was a buzzword two to three years prior, the question isn't whether to include humans but where to place that human effort most effectively. The previous approach of having humans review every prompt iteration was labor-intensive and slow, creating bottlenecks as each party waited for the other to respond.

Spotted Zebra's solution was to frontload domain expert effort at the project's beginning by creating "golden examples" (also called "golden samples" or a "gold standard set"). A golden example consists of an input document paired with the exact output a human expert believes the model should produce. This creates a definitive reference standard against which model outputs can be automatically compared. For the Skills Evaluation product, inputs are interview transcripts and outputs are JSON files containing evidence organized by skill categories.

The evaluation pipeline flows from interview transcript input through the model's evidence extraction process, then compares the extracted evidence against the golden examples. This approach transforms prompt engineering from an art form based on gut feeling into quantifiable experiments with precise metrics including coverage (how many pieces of evidence were captured), accuracy, precision, recall, and F1 scores—all familiar metrics from traditional machine learning.

Spotted Zebra invested deeply in golden examples, going beyond simple creation to stratification across multiple dimensions. They created golden example sets representing different role levels (junior versus senior positions) and a broad spectrum of industries. This stratification enabled highly granular analysis, such as identifying that prompts optimized for senior roles might fail to capture evidence of skills from university experiences because they only looked for workplace evidence—a critical gap for junior candidates with limited work history.

The benefits of this approach are substantial. It enables autonomous development since engineers no longer wait for feedback loops with domain experts, allowing much faster iteration. It provides fine-grained feedback that pinpoints specific prompt weaknesses across different scenarios. Perhaps most importantly, it enables rapid model evaluation—keeping prompts constant while changing the underlying model to assess model performance directly.

This capability proved particularly valuable when GPT-4o (referred to as "GPT5" in the transcript, likely meaning a new major model version) was released. Rather than naively switching to the new model assuming it would be better, Spotted Zebra tested it on day one using their golden examples. They discovered that every new model, even within the same model family, has unique quirks and behaviors. The fine-grained feedback from golden examples revealed exactly what GPT-4o's quirks were, enabling "prompt tuning" (a newly emerging term for adjusting prompts to specific model behaviors) to optimize for the new model's characteristics.

The speaker emphasizes that golden examples were so impactful they could have devoted an entire talk to the topic, underscoring the technique's centrality to their LLMOps practice.

## Lesson 2: Version Prompts Systematically

Having established prompts as experiments rather than ad-hoc text, Spotted Zebra implemented systematic versioning practices. The foundation is using a structured file system rather than hardcoding prompts in application code. Hardcoded prompts make iteration, comparison, and rollback significantly more difficult. Extracting prompts to files enables proper versioning and experiment tracking.

The company adopted semantic versioning for prompts, using a major.minor.patch format. They defined explicit criteria for what constitutes a major change, minor change, or patch to a prompt, creating consistency across the team and clear communication about the significance of changes.

Spotted Zebra created a custom prompt format as a YAML file because they couldn't find existing formats that met their needs. Their format encapsulates everything necessary to reproduce an experiment, following scientific best practices of changing only one variable at a time. The YAML file includes:

- **Provider information** (OpenAI, Anthropic, Mistral, etc.—Spotted Zebra uses a mixture)
- **Model parameters** (temperature, top-p, etc.)
- **System prompt** (explicitly versioned separately from user prompts)
- **User prompt** (using Mustache templating engine for parameter control)
- **All other configuration needed for reproducibility**

This structured approach enables precise experiment tracking and comparison. Engineers across the organization can use the same format, preventing fragmentation of prompting practices.

Complementing the versioning system is a **model gateway**—essentially a centralized function (implemented in Python or TypeScript) that handles all LLM API calls. Without intentional architecture, engineers across a company often re-implement API call logic in different parts of the codebase, creating maintenance challenges and inconsistent behavior. By consolidating this logic in a commons library, Spotted Zebra ensures:

- **Consistent API call packaging** using the YAML format
- **Automatic collection of latency metrics**
- **Cost tracking**
- **Retry logic** for handling transient failures
- **Any other cross-cutting concerns**

This centralization follows the principle of frontloading effort—building robust infrastructure once that everyone can leverage, rather than duplicating work across teams.

Additional practices include maintaining a **changelog** that documents differences between prompt versions with quantitative improvements, enabling data-driven decisions about which versions to promote. On production servers, they maintain recent prompt versions (perhaps the last five) to enable quick rollbacks if issues arise. Their configuration system allows rollback by updating a config file without requiring server restarts, minimizing downtime during incident response.

## Lesson 3: LLM-as-a-Judge for Open-Ended Tasks

While golden examples work exceptionally well for certain task types, they have limitations. Golden examples are ideal for **closed tasks**—tasks with a definitive correct answer for a given input. Information extraction tasks (like Skills Evaluation) and classification tasks fit this category perfectly. You can specify exactly what evidence should be extracted from a transcript or which category an item belongs to.

However, not all tasks have singular correct answers. Spotted Zebra's **Interview Guide** feature generates interview questions that are contextually aware and pull from job descriptions. For this use case, there isn't "one correct interview question"—thousands of variations could be equally valid and high-quality. Golden examples become impractical or impossible for such open-ended generation tasks.

The solution is **LLM-as-a-judge**, which shifts from defining perfect outputs to defining **golden criteria**—the characteristics that make an output good or bad. For interview questions, criteria might include relevance to the job description, clarity, open-endedness to encourage detailed responses, fairness, and alignment with company values.

The evaluation pipeline for LLM-as-a-judge differs from golden examples. The primary model generates the output (e.g., an interview question), then a separate LLM—preferably from a different model family to avoid self-bias—evaluates the output against the golden criteria. The judge LLM produces an information-rich assessment listing what's good and bad about the output, enabling targeted prompt improvements.

A critical distinction highlighted by the speaker is the **development-time versus inference-time** evaluation difference. Golden examples require human creation upfront, making them primarily a development-time tool for testing systems before production deployment. LLM-as-a-judge requires no human intervention per evaluation, enabling **inference-time** evaluation—automatic quality assessment as each output is generated in production. This provides an MLOps capability, monitoring production quality continuously rather than only during development.

The speaker acknowledges practical tradeoffs. Golden criteria are much faster to create than golden examples—they're literally just a list of rules rather than labor-intensive manual annotation of hour-long transcripts. However, articulating what "good" means in precise, actionable criteria is intellectually challenging. Getting diverse stakeholders to agree on criteria requires "many, many, many, many workshops," as the speaker emphasizes with some humor. Despite this upfront investment, the benefits include real-time quality assessment and ongoing MLOps monitoring capabilities.

## Lesson 4: Turn Failures Into Tests (Adversarial Testing Bank)

Spotted Zebra maintains an **adversarial testing bank**—a curated collection of the most difficult and challenging inputs for their models. They maintain separate adversarial testing banks for each production product. The philosophy underlying this practice is that at scale, edge cases become the norm. When processing thousands or tens of thousands of inputs, rare scenarios occur frequently enough to matter significantly.

The adversarial testing bank includes various categories of challenging inputs:

- **Edge cases** like empty inputs, malformed data, or unusual formatting
- **Prompt injection attacks** attempting to manipulate model behavior
- **Real production errors**, which form a particularly valuable category

Every time an error occurs in production, the team analyzes the root cause and adds that specific input or error condition to the adversarial testing bank. This creates a growing repository of known failure modes, and every new prompt or model version is tested against the entire bank to ensure regressions don't reintroduce previously solved problems.

The cultural shift around errors is notable. The speaker mentions that initially the team "absolutely dreaded seeing errors," as most engineering teams do. However, as errors became less frequent due to the adversarial testing approach, the team's perspective shifted. Now when errors occur, there's "a little bit of excitement" because each new error represents an opportunity to add a new test case and strengthen the system. This reflects a mature testing culture where failures are learning opportunities rather than purely negative events.

The adversarial testing bank serves as a form of **regression testing** specific to LLM applications, ensuring that improvements in one area don't inadvertently break previously working functionality—a common challenge when dealing with the probabilistic nature of large language models.

## Lesson 5: Log API Calls Properly

The speaker acknowledges this lesson is "not the sexiest topic" but emphasizes its critical importance with the warning: "if you don't do the work now, you will hate your past self. Ask me how I know." This personal anecdote suggests Spotted Zebra learned this lesson the hard way.

The fundamental principle is that you won't know when you need your logs until you desperately need them, and when that moment comes, you need them immediately. Logs must be designed proactively to include all potentially necessary information, even if current use cases don't require it.

**Metadata** is absolutely critical. While tools like LangSmith (which the speaker notes some audience members have used based on their nods) automatically capture some metadata—datetime, model version, usage metrics—they don't capture domain-specific or application-specific metadata. Examples of critical custom metadata include:

- **Prompt version** (since Spotted Zebra versions prompts systematically)
- **Correlation IDs** or UUIDs to tie together chains of prompts when running multi-step processes
- **Any application-specific context** needed to understand the circumstances of an API call

The speaker specifically criticizes LangSmith's built-in search functionality, stating bluntly that "it sucks, it's really poor." This limitation caused significant problems for Spotted Zebra, leading them to migrate their logs to **S3** where they can query everything effectively using standard data analysis tools. The S3-based approach provides additional benefits:

- **Better auditing capabilities** for compliance requirements
- **More flexible querying** for investigation and analysis
- **Foundation for building fine-tuning datasets** in the future by analyzing production interactions

The emphasis on searchability highlights a practical reality: logs are only useful if you can efficiently find relevant information when investigating issues, analyzing patterns, or demonstrating compliance. Investing in proper logging infrastructure pays dividends throughout the product lifecycle.

## Lesson 6: Evaluation as Strategic Capability

The final lesson synthesizes the previous five into an overarching principle: **evaluation is your superpower**. The speaker admits not fully appreciating the breadth of benefits until going through the entire process, concluding that Spotted Zebra is now "definitely more resilient and robust as a company because of it."

The benefits span multiple dimensions:

**Development Speed**: With comprehensive evaluation infrastructure in place, developers can iterate rapidly without waiting for feedback loops. They can confidently make changes, run automated evaluations, and immediately see quantified impacts. This autonomous development cycle dramatically accelerates the pace of improvement.

**Product Quality**: Systematic evaluation catches issues earlier and more comprehensively than ad-hoc testing. The combination of golden examples, LLM-as-a-judge, and adversarial testing creates multiple layers of quality assurance, each catching different types of problems. The result is noticeably higher product quality than before implementing these practices.

**Client Communication**: One of the most valuable but often overlooked benefits is the ability to answer client questions about the "black box" nature of AI systems. Clients frequently ask: "How do you know your system is working well? How do you know what's going on inside? How can you say it's fair?" Having comprehensive evaluation metrics, test results, and documentation organized in one place makes these conversations dramatically easier. Spotted Zebra even automated the communication process—they have a Python script that runs their evaluation suite whenever code is merged to the main branch, automatically uploading results to Google Docs. This creates continuously updated documentation with zero manual effort beyond the initial setup. The speaker emphasizes the freedom this automation provides: "Once you set it up, honestly, it is so freeing."

**Compliance and Certification**: Spotted Zebra became the first company in the interview intelligence category to achieve **ISO 42001 certification** (an international standard for AI management systems). The speaker directly attributes this achievement to their evaluation metrics, stating "I don't think we would have gotten that without all of our evaluation metrics." This certification provides competitive differentiation and customer confidence.

Looking forward, the speaker notes that the **EU AI Act** is coming into full force by 2026. For any company using AI systems in production, comprehensive evaluation practices will likely be essential for compliance. Spotted Zebra's proactive investment in evaluation positions them well for these regulatory requirements, while companies without such practices may face significant catch-up work.

## Technical Architecture and Tools

While the presentation focuses primarily on practices and principles rather than specific technical implementations, several technical details emerge:

- **Model Providers**: Spotted Zebra uses a mixture of providers including OpenAI, Anthropic, and Mistral, rather than committing to a single provider. This multi-provider strategy likely provides flexibility, resilience, and the ability to use the best model for each specific task.

- **Templating**: They use the **Mustache templating engine** for managing prompt parameters, providing structured control over how dynamic content is inserted into prompts.

- **Configuration Format**: Custom **YAML files** capture all prompt and experiment configuration, parsed by their model gateway.

- **Logging Infrastructure**: Initially used **LangSmith** for logging and observability, but migrated to **S3-based logging** due to LangSmith's poor search functionality. This suggests they query S3 logs using tools like AWS Athena, standard SQL databases, or data analysis frameworks.

- **Automation**: Python scripts integrated into their CI/CD pipeline automatically run evaluations on commits to main and upload results to Google Docs for stakeholder visibility.

The architecture reflects pragmatic choices balancing standardization (YAML format, model gateway) with flexibility (multiple providers, custom formats when existing tools don't fit).

## Balanced Assessment and Limitations

While the presentation is enthusiastically positive about evaluation practices, several implicit limitations and tradeoffs deserve consideration:

**Initial Investment**: Implementing these evaluation practices requires substantial upfront investment. Creating golden examples requires intensive domain expert time, particularly for stratified sets covering diverse scenarios. Establishing LLM-as-a-judge requires extensive workshops to define criteria. Building model gateways, logging infrastructure, and automation requires engineering effort. For smaller organizations or earlier-stage projects, this investment may be challenging to justify before demonstrating product-market fit.

**Maintenance Overhead**: The presentation doesn't discuss the ongoing maintenance burden. Golden examples may become stale as products evolve, requiring periodic updates. Adversarial testing banks grow over time, potentially increasing test suite runtime. Prompt versioning systems need governance to prevent proliferation of variants. These ongoing costs should be factored into the total cost of ownership.

**Golden Examples Limitations**: The speaker acknowledges that golden examples only work for closed tasks with definitive correct answers. Even within this domain, creating truly representative golden examples is challenging—how do you know your stratification captures all relevant dimensions? Biases in golden example creation could embed those biases into the evaluation system.

**LLM-as-a-Judge Reliability**: While positioned as a solution for open-ended tasks, LLM-as-a-judge has known limitations not discussed here. Judge LLMs can be inconsistent across evaluations, may favor certain styles or approaches, and can exhibit biases. The recommendation to use a different model family than the generation model helps but doesn't eliminate these concerns. The speaker also doesn't discuss how they validate that their judge LLM actually aligns with human judgment.

**Compliance Claims**: While ISO 42001 certification is a genuine achievement, the EU AI Act compliance suggestion is more speculative. The Act's requirements are still being interpreted, and what will actually be required for compliance remains somewhat uncertain. Evaluation practices will certainly help, but may not be sufficient on their own.

**Generalizability**: The case study focuses heavily on extraction and generation tasks in the HR domain. The approaches may transfer well to similar domains, but very different applications (e.g., creative generation, multimodal systems, real-time interactive applications) might require substantially different evaluation approaches.

Despite these considerations, the fundamental message that systematic evaluation should be a core competency for any organization deploying LLMs in production is sound. Spotted Zebra's experience demonstrates that evaluation infrastructure provides returns across multiple dimensions—technical quality, operational efficiency, customer confidence, and regulatory compliance. The specific techniques (golden examples, LLM-as-a-judge, versioning, adversarial testing, comprehensive logging) represent proven patterns that other organizations can adapt to their contexts.

The presentation effectively illustrates a mature LLMOps practice that has moved beyond the excitement of novel capabilities (fine-tuning, RAG, agents) to focus on the operational fundamentals that actually determine success in production. This pragmatic focus on evaluation as foundational infrastructure, rather than an afterthought, represents a significant insight for organizations at any stage of LLM adoption.