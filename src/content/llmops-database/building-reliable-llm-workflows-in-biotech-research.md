---
title: "Building Reliable LLM Workflows in Biotech Research"
slug: "building-reliable-llm-workflows-in-biotech-research"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "695f6f73c4ddc28d3c03a9de"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-09T09:15:03.353Z"
  lastUpdated: "2026-01-08T08:51:45.395Z"
  createdOn: "2026-01-08T08:48:51.980Z"
llmopsTags:
  - "healthcare"
  - "regulatory-compliance"
  - "document-processing"
  - "code-generation"
  - "fine-tuning"
  - "prompt-engineering"
  - "rag"
  - "embeddings"
  - "few-shot"
  - "error-handling"
  - "human-in-the-loop"
  - "cost-optimization"
  - "evals"
  - "system-prompts"
  - "vllm"
  - "open-source"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "sqlite"
  - "serverless"
  - "anthropic"
  - "openai"
industryTags: "healthcare"
company: "Moderna"
summary: "Moderna Therapeutics applies large language models primarily for document reformatting and regulatory submission preparation within their research organization, deliberately avoiding autonomous agents in favor of highly structured workflows. The team, led by Eric Maher in research data science, focuses on automating what they term \"intellectual drudgery\" - reformatting laboratory records and experiment documentation into regulatory-compliant formats. Their approach prioritizes reliability over novelty, implementing rigorous evaluation processes matched to consequence levels, with particular emphasis on navigating the complex security and permission mapping challenges inherent in regulated biotech environments. The team employs a \"non-LLM filter\" methodology, only reaching for generative AI after exhausting simpler Python or traditional ML approaches, and leverages serverless infrastructure like Modal and reactive notebooks with Marimo to enable rapid experimentation and deployment."
link: "https://www.youtube.com/watch?v=GvCFFvMw2uo"
year: 2026
seo:
  title: "Moderna: Building Reliable LLM Workflows in Biotech Research - ZenML LLMOps Database"
  description: "Moderna Therapeutics applies large language models primarily for document reformatting and regulatory submission preparation within their research organization, deliberately avoiding autonomous agents in favor of highly structured workflows. The team, led by Eric Maher in research data science, focuses on automating what they term \"intellectual drudgery\" - reformatting laboratory records and experiment documentation into regulatory-compliant formats. Their approach prioritizes reliability over novelty, implementing rigorous evaluation processes matched to consequence levels, with particular emphasis on navigating the complex security and permission mapping challenges inherent in regulated biotech environments. The team employs a \"non-LLM filter\" methodology, only reaching for generative AI after exhausting simpler Python or traditional ML approaches, and leverages serverless infrastructure like Modal and reactive notebooks with Marimo to enable rapid experimentation and deployment."
  canonical: "https://www.zenml.io/llmops-database/building-reliable-llm-workflows-in-biotech-research"
  ogTitle: "Moderna: Building Reliable LLM Workflows in Biotech Research - ZenML LLMOps Database"
  ogDescription: "Moderna Therapeutics applies large language models primarily for document reformatting and regulatory submission preparation within their research organization, deliberately avoiding autonomous agents in favor of highly structured workflows. The team, led by Eric Maher in research data science, focuses on automating what they term \"intellectual drudgery\" - reformatting laboratory records and experiment documentation into regulatory-compliant formats. Their approach prioritizes reliability over novelty, implementing rigorous evaluation processes matched to consequence levels, with particular emphasis on navigating the complex security and permission mapping challenges inherent in regulated biotech environments. The team employs a \"non-LLM filter\" methodology, only reaching for generative AI after exhausting simpler Python or traditional ML approaches, and leverages serverless infrastructure like Modal and reactive notebooks with Marimo to enable rapid experimentation and deployment."
---

## Overview

Eric Maher leads a research data science team of six people within Moderna Therapeutics' Digital for Research organization. The team serves research scientists by co-designing experiments, conducting statistical analysis, building custom machine learning models, and reverse engineering algorithms from academic literature. Their mission centers on making molecule discovery faster and enabling research to run at "the speed of thought" while quantifying the previously unquantified. The team delivers work products packaged as software, including machine learning models and custom algorithms wrapped in command-line interfaces.

Upon conducting an audit of all LLM applications developed internally at Moderna, Maher discovered that by Anthropic's definition distinguishing workflows from agents, the organization has no true agents deployed. Instead, they operate highly structured workflows. This finding emerged from careful consideration of what constitutes agency - while autonomy defines agency, even microscopic examples like a git commit message writer that chooses commit types (feature, CI improvement, bug fix) blur definitional boundaries. However, such limited agency lacks meaningful business impact compared to truly autonomous systems like flight booking agents.

## Primary Use Cases and Problem Space

The dominant application pattern at Moderna involves document reformatting and what Maher describes as "filling forms" - though not HTML forms but free-form documentation. The core use case involves extracting source information from laboratory experiment records and reports stored in centralized systems as PDFs, then reformatting these contents into documents for regulatory submissions. This work represents low-value intellectual labor that nonetheless must be done correctly.

For example, in regulatory work, humans previously clicked through systems manually searching for curated documents, then reformatted information into required formats. LLM-based automation allows scientists to declare curated documents they've identified, specify their intents, and have CLI tools read these sources along with Python reports to draft documentation automatically. The underlying theme across these applications amounts to information reformatting into target formats - essentially automated form filling that delivers enormous time savings when implemented correctly.

Maher emphasizes this isn't high-level intellectual work but rather "intellectual drudgery" that LLMs excel at automating. A significant portion of regulatory work fundamentally involves filling forms and writing required documents, making this an ideal automation target. The business value derives not from novel AI capabilities but from freeing scientists from tedious reformatting tasks.

## Security and Permission Management Challenges

Operating in a regulated environment introduces profound data security challenges that dominate the implementation complexity. When building either RAG systems or fine-tuning pipelines, data access authorization becomes what Maher characterizes as a "huge problem" and potentially a "nightmare."

The fundamental issue: a data scientist may be personally authorized to view and extract data from regulated systems, but pulling that data into an S3 bucket for processing suddenly creates new permission requirements. The destination storage must maintain the same security permissions as the source documents. Mapping these permissions across heterogeneous systems proves extraordinarily difficult - some systems use Active Directory, others use internal identity systems, some use Okta, and some employ vendor-proprietary solutions. Despite being conceptually just an email address mapping exercise, obtaining accurate permission information from vendors remains challenging.

The problem compounds when considering model artifacts. If an LLM is fine-tuned on documents with different permission sets, determining who should access the resulting model becomes ambiguous. For example, if Document A authorizes three people and Document B authorizes four different people, and both documents are used for fine-tuning, who gets access to the resulting LLM artifact? The model naturally has some probability of revealing information from either document. The same challenge applies to vector stores in RAG systems.

Logging and observability introduce additional permission complexity. LLM traces captured during fine-tuning or RAG operations contain information from the source documents. In regulated environments, determining access rights to these logs requires answering difficult questions: Should only the data scientist access traces? Should the people authorized on original documents get access? What about the data scientist's line management, who may not have been authorized on source documents but have supervisory responsibility?

Maher notes there are no established patterns for solving these permission mapping problems in regulated environments. The issues represent business process challenges rather than purely technical ones, requiring cross-functional coordination between data science, IT infrastructure, security, and regulatory teams.

## The Non-LLM Filter and Model Selection

Moderna employs what Maher calls an "essential non-LLM filter" - a systematic approach to technology selection that prioritizes simpler solutions. The decision process follows a clear hierarchy: first assess whether the problem can be solved with simple Python code. If it can, use that approach to eliminate the stochasticity inherent in LLMs. Only if simple Python doesn't suffice should the team move to a simple machine learning model. If that proves insufficient, then consider LLMs - or skip directly to LLMs if it's obvious simpler approaches would waste time.

This philosophy reflects a production-oriented mindset. While agents may be exciting and novel, production systems demand reliability over novelty. The team wants predictable, dependable systems in production, not experimental cutting-edge approaches that introduce unnecessary failure points.

Even when LLMs are appropriate, the team doesn't immediately reach for agents. Workflows with structured tool usage patterns prove more reliable than autonomous agent architectures. This aligns with their observation that biotech organizations don't sell consumer products and thus lack the customer service use cases where truly autonomous agents (like flight booking assistants) provide clear value. While LLMs can accelerate regulatory response processes, these don't demand the near-realtime nature of customer-facing agents.

The model selection process itself follows rigorous evaluation practices. When the team wanted to switch their git commit message writer from GPT-4o to GPT-4o-mini to reduce costs by 80%, Maher blocked the change until proper evaluation could be conducted. Despite personally accepting changes from less powerful to more powerful models without extensive testing, moving to a less capable model demanded validation.

The team had collected representative git diffs and old commit messages stored locally in a SQLite database. This enabled a side-by-side experiment comparing commit messages generated by both models. For this particular application, the evaluation formality matched the consequence level - a quick human "vibe check" sufficed. A human could rapidly judge whether new commit messages met quality standards by examining diffs alongside generated messages. This repeatable evaluation used the same benchmark diffs for any model changes, creating a lightweight but principled process.

## Evaluation Philosophy: Matching Rigor to Consequences

Maher articulates a clear philosophy: the level of evaluation formality should be commensurate with the consequence level of bad LLM outputs. The non-negotiable foundation consists of maintaining a curated set of inputs consistently used over time and expanded as new edge cases emerge. This input set provides the basis for any evaluation approach.

Beyond that foundation, formality scales with stakes. For a git commit message writer, consequences of errors remain minimal - someone might be confused for two minutes looking at commit history, but nothing is regulatory-critical. Therefore, vibing through outputs by quickly examining diffs and generated messages provides sufficient validation.

Conversely, if bad LLM outputs could affect patient life and death in clinical settings, or determine whether regulators approve a product to advance to the next phase, evaluation becomes far more stringent. In such cases, the team implements proper characterization of error modes and works systematically to minimize them. Multiple layers of evaluation may be necessary to reduce failure probability to acceptable levels.

This pragmatic approach rejects one-size-fits-all evaluation methodologies. Rather than always building comprehensive test harnesses with automated scoring, the team adapts evaluation investment to business needs. For low-stakes applications, maintaining curated inputs and conducting human vibe checks suffices. For high-stakes applications, full formal evaluation with pass/fail labels, automated scoring, and comprehensive error analysis becomes mandatory.

## Fine-Tuning Considerations

Maher generally agrees that fine-tuning should be a last resort, attempted after exploring retrieval augmentation and prompt engineering. However, specific circumstances in regulated biotech environments may necessitate fine-tuning.

The hypothetical scenario involves applications in regulated environments where only open-source LLMs are permissible. APIs from Claude, Azure, Bedrock, or OpenAI cannot be used - the organization must host model weights entirely within internal infrastructure. They might deploy Ollama or vLLM for serving, but the models must be self-hosted. If RAG performance using these open-source models fails to reach the 95-98% success rate needed for meaningful human work offloading, fine-tuning becomes the only option.

Even for more routine applications like automatic chromatography trace integration, Moderna's custom algorithms and ML models suffer 2-5% failure rates, sometimes reaching 50% for unusual chemistry. Similar failure rates would be expected for general-purpose LLMs without domain-specific training. For instance, an LLM with general knowledge but no specific training on regulatory documents would miss nuances in regulatory language. Making drafts sound appropriately regulatory requires fine-tuning on regulatory documents.

Another consideration involves context windows. Early experimentation uses API providers with long context windows establishing baseline performance. However, GXP-validated systems require moving off API providers to internally hosted LLMs. Open-source models haven't proven themselves against GPT-4o, Claude 3.7, or o1 for longer document drafting tasks. RAG primarily extracts information from knowledge bases but struggles to teach models specific writing styles without sufficient context window for full documents as in-context examples. When style adoption matters alongside information extraction, and context windows remain insufficient, fine-tuning becomes necessary.

Maher notes his team explores efficient, hands-free fine-tuning methods despite viewing it as low-probability for their use cases. This reflects their forward-looking approach to maintaining technical capabilities even for unlikely scenarios. The team recognizes that fine-tuning tooling has improved significantly over the past 18 months, making it less of a burden than previously, though it remains a measure of last resort philosophically.

## Infrastructure and Tooling

Moderna's data science team leverages modern serverless infrastructure and reactive notebook environments to operate rapidly. Modal figures prominently in their infrastructure strategy, with team members receiving Modal credits through various educational opportunities. Maher praises Modal's deployment model extensively, noting that deploying Marimo notebooks on Modal takes approximately ten minutes from start to finish.

Maher articulates a thesis that an entire modern biotech data stack could be built completely eliminating AWS, instead relying entirely on Modal. He describes Modal's patterns as potentially representing the future of cloud infrastructure, emphasizing how significantly it simplifies deployment and operations.

The team also adopts Marimo for reactive notebooks, which Maher describes enthusiastically. Key advantages include reactive execution where changes propagate automatically, and critically, the prohibition against redeclaring variables within notebooks. This constraint serves as a guardrail against common programming errors in notebook environments. While Marimo requires adjustment to new patterns, these constraints improve code quality.

Another significant Marimo feature involves standalone execution. When structured to be self-contained, Marimo notebooks define their environment using PEP 723-compatible inline script metadata. A colleague can receive a single notebook file and run it directly using `uvx marimo run file.py` without needing separate environment configuration files. Notebooks can even be run directly from URLs using `uvx marimo run <URL>`, automatically downloading and executing them locally. Additionally, Marimo notebooks can be served via web server, enabling easy sharing of interactive applications.

For version control automation, the team built a git commit message writer that generates conventional commit messages automatically. This tool uses LLMs to analyze diffs and determine commit types (feature, CI improvement, bug fix, etc.) according to conventional commits conventions. While representing a microscopic form of "agency" in choosing commit types, it provides practical productivity gains. The tool logs generated messages locally in SQLite databases, creating data for subsequent evaluation when considering model changes.

## Logging and Observability

The team emphasizes comprehensive logging of LLM traces as fundamental practice. Every LLM interaction should be logged somewhere, creating audit trails and enabling retrospective analysis. These logs serve multiple purposes: debugging during development, evaluation when making changes, and compliance documentation in regulated contexts.

However, logging in regulated environments introduces the permission management challenges discussed earlier. Logs contain information derived from source documents and may reveal protected information. Therefore, access controls for logs must be as carefully managed as access to the original documents and model artifacts.

The SQLite-based logging approach for the git commit writer demonstrates lightweight but effective logging practice. By storing commit diffs and generated messages locally, the team creates reusable evaluation datasets without complex infrastructure. This data enables comparing model performance across versions, supporting evidence-based decisions about model changes.

## Cultural and Philosophical Approach

Moderna's approach reflects a strong production engineering culture that values reliability, pragmatism, and appropriate technology selection over chasing trends. The team explicitly rejects hype-driven development, as evidenced by their lack of autonomous agents despite industry enthusiasm. Maher's characterization of "agent" as partly a marketing term reflects this skepticism toward buzzwords.

The philosophy of matching evaluation rigor to consequences demonstrates mature engineering judgment. Rather than either ignoring evaluation or over-engineering it uniformly, the team calibrates effort to actual business needs. This allows rapid iteration on low-stakes applications while maintaining high standards for critical systems.

The non-LLM filter embodies responsible AI engineering. By systematically considering simpler approaches before reaching for generative AI, the team avoids unnecessary complexity and maintains systems that are easier to understand, debug, and maintain. This approach acknowledges that LLMs introduce stochasticity and failure modes that traditional code doesn't have.

The team's willingness to discuss challenges openly, including unsolved permission mapping problems and security complexities, indicates a learning-oriented culture. Rather than claiming to have solved all problems, Maher candidly describes ongoing challenges and areas where patterns don't yet exist.

## Future Directions and Open Questions

Several themes emerge as ongoing concerns and future work areas. Permission and security mapping in regulated environments remains a partially solved problem requiring continued innovation. The team actively explores approaches like prompt-based authorization layers suggested during the discussion, where system prompts could be selected based on user authorization levels to control information disclosure. While this provides one defense layer, it can't reduce leakage probability to zero due to jailbreaking possibilities, making it potentially suitable for "classified for internal use" scenarios but not for trade secrets or personal information.

The exploration of fine-tuning techniques continues despite low current probability of need. The team maintains readiness for scenarios where regulatory requirements and performance demands might necessitate moving beyond RAG to knowledge-baked-into-weights approaches.

Infrastructure evolution toward serverless patterns like Modal represents another trajectory, with Maher suggesting this might enable completely reimagining biotech data stacks without traditional cloud providers. This indicates ongoing evaluation of infrastructure choices and willingness to adopt novel platforms when they provide meaningful advantages.

The balance between open-source and proprietary models remains an active consideration, particularly regarding how to achieve comparable performance from self-hosted open-source models for regulated applications where API-based services aren't permissible. This involves both technical evaluation and regulatory compliance work to validate models for GXP environments.