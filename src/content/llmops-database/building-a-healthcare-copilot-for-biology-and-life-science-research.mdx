---
title: "Building a Healthcare Copilot for Biology and Life Science Research"
slug: "building-a-healthcare-copilot-for-biology-and-life-science-research"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69242caf379cdb1410b9a30b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:28:00.651Z"
  createdOn: "2025-11-24T10:00:15.053Z"
llmopsTags:
  - "healthcare"
  - "question-answering"
  - "summarization"
  - "chatbot"
  - "data-analysis"
  - "high-stakes-application"
  - "structured-output"
  - "regulatory-compliance"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "reranking"
  - "semantic-search"
  - "vector-search"
  - "human-in-the-loop"
  - "error-handling"
  - "chunking"
  - "system-prompts"
  - "token-optimization"
  - "cost-optimization"
  - "latency-optimization"
  - "evals"
  - "monitoring"
  - "databases"
  - "open-source"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "qdrant"
  - "langchain"
  - "anthropic"
  - "hugging-face"
industryTags: "healthcare"
company: "Owkin"
summary: "Owkin, a company focused on drug discovery and AI for healthcare, developed a copilot system in four months to help biology and life science researchers navigate complex healthcare data and answer scientific questions. The system addresses challenges unique to healthcare including strict regulations, semantic complexity, and data sensitivity by implementing two main tools: a text-to-SQL system that queries structured biological databases (using natural language to SQL translation with Polars), and a RAG-based literature search tool that retrieves relevant information from PubMed's 26 million abstracts. The copilot was deployed for academic researchers with monitoring via LangFuse and OpenTelemetry, though the team faced challenges with evaluation in a domain where questions rarely have binary answers, and noted that frameworks and models change rapidly in the LLM space."
link: "https://www.youtube.com/watch?v=y-51szsYIMo"
year: 2025
seo:
  title: "Owkin: Building a Healthcare Copilot for Biology and Life Science Research - ZenML LLMOps Database"
  description: "Owkin, a company focused on drug discovery and AI for healthcare, developed a copilot system in four months to help biology and life science researchers navigate complex healthcare data and answer scientific questions. The system addresses challenges unique to healthcare including strict regulations, semantic complexity, and data sensitivity by implementing two main tools: a text-to-SQL system that queries structured biological databases (using natural language to SQL translation with Polars), and a RAG-based literature search tool that retrieves relevant information from PubMed's 26 million abstracts. The copilot was deployed for academic researchers with monitoring via LangFuse and OpenTelemetry, though the team faced challenges with evaluation in a domain where questions rarely have binary answers, and noted that frameworks and models change rapidly in the LLM space."
  canonical: "https://www.zenml.io/llmops-database/building-a-healthcare-copilot-for-biology-and-life-science-research"
  ogTitle: "Owkin: Building a Healthcare Copilot for Biology and Life Science Research - ZenML LLMOps Database"
  ogDescription: "Owkin, a company focused on drug discovery and AI for healthcare, developed a copilot system in four months to help biology and life science researchers navigate complex healthcare data and answer scientific questions. The system addresses challenges unique to healthcare including strict regulations, semantic complexity, and data sensitivity by implementing two main tools: a text-to-SQL system that queries structured biological databases (using natural language to SQL translation with Polars), and a RAG-based literature search tool that retrieves relevant information from PubMed's 26 million abstracts. The copilot was deployed for academic researchers with monitoring via LangFuse and OpenTelemetry, though the team faced challenges with evaluation in a domain where questions rarely have binary answers, and noted that frameworks and models change rapidly in the LLM space."
---

## Overview

Owkin developed a copilot system aimed at helping biology and life science researchers navigate the overwhelming complexity of healthcare data and answer scientific questions more efficiently. The speaker, Laura, a senior ML engineer at Owkin, presented this case study describing how the company built production LLM systems that bridge the gap between non-programmers (wet lab researchers), biostatisticians who code in R, and data scientists who need to build scalable tools. The copilot was developed over a four-month period from January to May, with three primary tools: patient data visualization, omics data visualization, a prior knowledge database query system, and a literature search tool powered by RAG.

## Healthcare Context and Unique Challenges

The healthcare domain presents distinctive challenges for LLMOps that significantly impact system design and deployment. Healthcare data must comply with strict regulations including GDPR and HIPAA, with particularly stringent requirements around patient consent and data usage. The speaker emphasized that deploying AI in healthcare is extraordinarily expensive—a liver segmentation algorithm in a medical device costs a minimum of half a million dollars, while a computer-aided diagnosis device requires three to four million dollars minimum due to mandatory clinical trials. This regulatory burden extends to software dependencies, where teams must review all open bugs in dependencies to ensure they don't alter diagnostic accuracy.

The domain also faces semantic complexity. For example, the gene TP53, its RNA transcript (also called TP53), and the protein it produces (p53) all have different but related names. BRCA is both an acronym for breast cancer and the name of two genes (BRCA1 and BRCA2) that can have alternative names in other classification systems. This semantic ambiguity requires careful prompt engineering and metadata enrichment to ensure LLMs interpret queries correctly.

Additionally, explainability is critical—doctors will never trust black-box algorithms, and insurance companies demand accountability and refuse to pay for algorithmic errors. A notable regulatory quirk mentioned was that in China, AI algorithms for Chinese market approval must use Chinese data, which is only accessible if developed within China.

## System Architecture: Prior Knowledge Database Tool

The first major tool addresses querying structured biological databases. Owkin had historically created around 17 open-source databases, cleaned and automated according to biomedical rules. These databases contain information like UniProt, which might have over 200 columns and 80,000 rows. Researchers previously had to manually search through massive Excel files to answer questions like "Where is KRAS expressed in the cell?"

The architecture uses a multi-step pipeline:

- The biological database is loaded as a Parquet file using Polars, a fast dataframe library that supports SQL queries for filtering
- Natural language questions are transformed into SQL queries that can be executed by Polars to retrieve a smaller subset of the database
- This filtered subset is then passed to another LLM to generate a structured answer in natural language, complete with source links
- The copilot formats this into a readable response with properly placed citations

**Technical Implementation Details:**

The team discovered that simply providing the database schema to the LLM was insufficient. They enhanced the metadata extensively, providing thorough explanations of each column that go far beyond simple type information. For a boolean column named "localization_cytoplasm," the metadata needed to explain what cytoplasm localization means in biological context, what the boolean represents, and how it relates to other data. This domain-specific context was essential because of the semantic complexity inherent to biology and healthcare.

Structured output was critical. The team used Pydantic models with the Instructor library to enforce schema constraints on LLM outputs, ensuring the generated SQL query conformed to expected formats. If the LLM failed to produce valid output, Instructor would retry internally. The speaker also mentioned more advanced token-level masking tools like Outlines or Guidance (possibly "gizen former" in the transcript) that can mask tokens during inference that don't match the defined schema.

**Security and Validation:**

SQL injection and malicious queries were serious concerns. The team implemented several protective measures:
- Blacklisting and whitelisting of SQL keywords (like UPDATE, DELETE, DROP)
- Launching SQL queries in sandbox environments with non-production data to verify they're valid and non-malicious
- Leveraging Polars' built-in exception handling, which raises errors for invalid or overly complex SQL

**Managing Context Windows:**

The output of the SQL query (the filtered subset) becomes the input to the next LLM, creating a potential problem: if the filtered data is too large, it can exceed token limits or become prohibitively expensive. The team addressed this by:
- Using Polars' `describe()` function to provide meaningful statistics about the table when row counts exceeded thresholds, rather than passing raw data
- Semantically-aware summarization for text fields
- Iteratively refining which columns to include in the initial LLM prompt to avoid the "lost in the middle" problem, where excessive information causes the LLM to lose focus on the specific question

The iterative refinement of column descriptions was also a cost optimization. Initially providing thorough descriptions of all 200+ columns was both expensive and led to accuracy problems due to information overload. The team refined this to provide only the columns necessary to answer specific types of questions.

## System Architecture: Literature Search with RAG

The second major tool helps researchers search scientific literature, specifically PubMed, which contains over 26 million abstracts that are regularly updated with roughly one million abstracts added or discarded annually. The team implemented a Retrieval-Augmented Generation (RAG) system.

**Initial Implementation:**

The standard RAG approach was used: encode all 26 million abstracts into embeddings in a vector space where semantically similar documents are positioned close together and dissimilar ones are far apart. When a researcher asks a question like "What is the role of plur in cancer?", the question is encoded and the top 100 closest documents are retrieved and provided to an LLM along with the question to generate an answer with citations.

The ingestion process took 24 hours and was expensive, costing approximately $800 per month just for hosting on Qdrant (the vector database). However, the speaker emphasized hidden costs including the computing resources for creating embeddings and ongoing maintenance to add new papers and remove discarded ones.

**Challenges and Refinements:**

The initial semantic search using dense vectors encountered problems. When researchers queried "What is the role of plur in cancer?" (where "plur" encodes the protein uPAR), the system returned papers about LY6, which contains "plur" in the name but refers to a different protein family (LY6/uPAR domain family). While technically related, these weren't the papers researchers wanted.

The team pivoted to **hybrid search**, combining:
- **Sparse vectors** (keyword-based search) to capture exact term matches
- **Dense vectors** (semantic embeddings) to capture meaning and context

This combination provided better results by balancing precision and recall.

**Metadata Filtering:**

Researchers also complained that the system retrieved too many review papers rather than original research. To address this, the team added **metadata indexing** to their vector database, including fields like author, date, and paper type (review vs. original research). This allowed filtering before retrieval, eliminating unwanted document types upfront.

**Reranking:**

After retrieving the top 100 documents, the team added a **reranker** that evaluates which papers are most relevant to answering the specific question. This reranking step helps prioritize the most important sources before they're passed to the LLM for answer generation.

**A Competitive Challenge:**

The speaker candidly noted that after spending significant time and money developing their RAG system, PubMed launched "PubMed AI" shortly after, which works with entire papers rather than just abstracts. This highlights the rapid pace of change in the LLM space and the risk of building features that may be superseded by platform providers.

## Operational Concerns: Security, Cost, Privacy, and Compliance

Throughout the presentation, the speaker emphasized several production concerns that shaped their LLMOps approach:

**Prompt Security:**

Everything placed in an LLM prompt must be comfortable to share publicly, as system prompts can be easily extracted through clever queries. While tools exist to check prompts for malicious content or prompt injection attempts, they add latency. More critically, patient data must never be included in prompts or outputs, which constrains the types of questions the system can answer.

**Data Compliance:**

Working with vector databases—even though they're "just numbers"—still requires GDPR and HIPAA compliance if the embeddings were generated from patient data. The team had to carefully consider what data could be used for embeddings and ensure appropriate anonymization and consent.

**Synthetic Data for Development:**

Developers working on the system couldn't access real patient data, even anonymized data, in development environments. This necessitated generating synthetic data, which proved challenging for omics data since it must be biologically meaningful (e.g., for differential gene expression analysis) rather than random values.

**Cost Management:**

The team tracked costs across multiple dimensions:
- Hosting vector databases (~$800/month for Qdrant)
- Embedding generation (compute-intensive)
- LLM API calls (particularly for Claude/Anthropic models used in the system)
- Database maintenance (re-encoding updated papers)

They optimized costs through careful context window management, only providing necessary metadata, and using techniques like `describe()` to summarize large tables.

**Latency:**

Latency was a key consideration, particularly for interactive research use. The team balanced accuracy with speed, noting that adding security checks for prompts or expanding context windows could significantly impact response times.

## Monitoring and Evaluation

Owkin deployed the copilot with comprehensive monitoring infrastructure using **LangFuse** and **OpenTelemetry**. The system included human feedback mechanisms where users could provide thumbs up/down ratings and detailed reviews of responses.

**Evaluation Challenges:**

The speaker candidly discussed the difficulty of evaluating LLM performance in scientific domains. Biology questions rarely have simple yes/no answers—almost everything is "it depends" based on context. This makes traditional benchmark approaches problematic.

A striking example was the Humanity's Last Exam benchmark, specifically its biology/life science section. Recent analysis found that nearly 30% of the Q&A pairs were likely incorrect due to lack of scientific consensus or insufficiently detailed answers to make definitive judgments.

**Custom Benchmarking:**

The speaker strongly advocated for building custom benchmarks with domain experts. Rather than relying on public benchmarks, Owkin worked with their internal panel of biomedical researchers, biostatisticians, and data scientists to validate tools and agents. This domain expert validation was essential to truly understand what the system was doing and whether it was providing value.

## User Base and Adoption

The copilot was initially designed for the entire medical community but faced regulatory constraints. Under French gift law, pharmaceutical companies (which Owkin qualifies as, having a molecule in clinical trials) cannot offer free tools to doctors. Consequently, the system was restricted to:
- Academic researchers
- Individuals with no links to the healthcare industry
- Excluding medical students

Internally, Owkin's diverse team of biomedical researchers, biostatisticians, and data scientists provided rapid feedback during development, helping refine the system before broader release.

## Technical Stack

Based on the presentation, the technical stack includes:
- **LLM Provider**: Anthropic (Claude models mentioned)
- **Database/Query Engine**: Polars for dataframe operations and SQL query execution
- **Structured Output**: Pydantic with Instructor library
- **Vector Database**: Qdrant
- **Monitoring**: LangFuse and OpenTelemetry
- **Data Formats**: Parquet files, CSV, TXT files
- **Embedding Strategy**: Hybrid search combining sparse and dense vectors

## Lessons Learned and Production Realities

The speaker shared several important lessons about LLMOps in production:

**Rapid Change:**

The LLM landscape evolves extremely quickly. Models, frameworks, and APIs chosen at the start of development may not be the best by launch time. The team started in January and launched in May, but already the model they chose (Anthropic) was no longer necessarily the best for their use cases. Frameworks promise to do everything but often lack stability. This requires flexible architecture and willingness to adapt.

**Prompt Engineering is Critical:**

The quality of metadata and column descriptions in the text-to-SQL system directly impacted accuracy. Simply providing schema information was insufficient—domain knowledge about genes, proteins, acronyms, and their relationships needed to be embedded in the prompts.

**Context Window Management:**

Even with large context windows (Claude Sonnet 4's 1 million tokens mentioned), putting entire datasets in prompts is slow and prohibitively expensive. Careful selection of what goes into prompts, using techniques like semantic summarization and statistical descriptions, is essential.

**Complex Queries are Hard:**

The text-to-SQL system struggled with complex queries involving aggregations, joins, or nested queries. Polars also doesn't handle all SQL syntax. The team learned to keep queries simple and clearly document limitations.

**Hybrid Approaches Work Better:**

Pure semantic search had precision problems in specialized domains. Combining keyword-based (sparse) and semantic (dense) retrieval, along with metadata filtering and reranking, provided much better results than any single approach.

**Query Decomposition:**

For long, complex questions, decomposing into multiple sub-queries and then gathering and reranking results proved more effective than treating everything as a single retrieval task.

**Human Feedback is Essential:**

Rather than relying solely on automated metrics, the team built in thumbs up/down feedback and detailed reviews. Processing this production feedback helped them understand real-world usage patterns and failure modes.

**Domain Experts Must Validate:**

Given the challenges of automated evaluation in scientific domains, having domain experts validate outputs and help build custom benchmarks was essential. The goal wasn't to replace researchers but to help them access and analyze data more efficiently.

**Future Directions**

The speaker mentioned that Owkin plans to expand the copilot to allow researchers to:
- Work with proprietary datasets (Owkin offers samples of spatial transcriptomic data from Mosaic)
- Add their own data to analyses
- Integrate more types of visualizations and exploratory tools

The system is explicitly designed not to replace researchers but to augment their capabilities by making open-source and proprietary biological data more accessible and queryable.

## Critical Assessment

This case study presents a realistic view of deploying LLMs in a highly regulated, semantically complex domain. The speaker was refreshingly candid about challenges, costs, and limitations rather than overselling the technology's capabilities. The admission that PubMed launched a competing product shortly after their development effort highlights real risks in the fast-moving LLM space.

The emphasis on domain-specific metadata enrichment, custom evaluation with experts, and the "it depends" nature of scientific questions provides valuable insights for anyone deploying LLMs in specialized domains. The cost transparency ($800/month hosting plus hidden costs for embeddings and maintenance) and the candid discussion of evaluation difficulties (30% error rate in a major benchmark's biology section) are particularly valuable for practitioners.

However, the case study would benefit from more specific metrics about accuracy improvements, user satisfaction scores, or productivity gains to substantiate the value delivered. The presentation also doesn't deeply address how they handle cases where the LLM generates scientifically incorrect answers or how they prevent hallucinations in citation generation, though the emphasis on providing source links suggests some mitigation strategy.

Overall, this represents a thoughtful, pragmatic approach to LLMOps in healthcare, balancing innovation with the regulatory, ethical, and technical constraints inherent to the domain.