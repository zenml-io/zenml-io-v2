---
title: "Building Production-Grade LLM Applications: An Architectural Guide"
slug: "building-production-grade-llm-applications-an-architectural-guide"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3bd3ea1d2f001872b918"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:38:24.359Z"
  createdOn: "2024-11-21T13:55:31.150Z"
llmopsTags:
  - "compliance"
  - "cost-optimization"
  - "customer-support"
  - "databases"
  - "embeddings"
  - "error-handling"
  - "fallback-strategies"
  - "latency-optimization"
  - "microsoft-azure"
  - "monitoring"
  - "prompt-engineering"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "scaling"
  - "security"
  - "semantic-search"
  - "structured-output"
  - "vector-search"
industryTags: "tech"
company: "Github"
summary: "A comprehensive technical guide on building production LLM applications, covering the five key steps from problem definition to evaluation. The article details essential components including input processing, enrichment tools, and responsible AI implementations, using a practical customer service example to illustrate the architecture and deployment considerations."
link: "https://github.blog/ai-and-ml/llms/the-architecture-of-todays-llm-applications/"
year: 2023
seo:
  title: "Github: Building Production-Grade LLM Applications: An Architectural Guide - ZenML LLMOps Database"
  description: "A comprehensive technical guide on building production LLM applications, covering the five key steps from problem definition to evaluation. The article details essential components including input processing, enrichment tools, and responsible AI implementations, using a practical customer service example to illustrate the architecture and deployment considerations."
  canonical: "https://www.zenml.io/llmops-database/building-production-grade-llm-applications-an-architectural-guide"
  ogTitle: "Github: Building Production-Grade LLM Applications: An Architectural Guide - ZenML LLMOps Database"
  ogDescription: "A comprehensive technical guide on building production LLM applications, covering the five key steps from problem definition to evaluation. The article details essential components including input processing, enrichment tools, and responsible AI implementations, using a practical customer service example to illustrate the architecture and deployment considerations."
---

## Summary

This GitHub Blog article, authored by Nicole Choi with input from GitHub's machine learning researchers Alireza Goudarzi and Albert Ziegler, serves as a comprehensive architectural guide for developers looking to build LLM-powered applications. Rather than documenting a specific deployment case study, this piece provides a reference architecture and best practices framework that GitHub's team has developed through their experience building GitHub Copilot. The guide walks through the end-to-end process of creating production LLM applications, from initial problem scoping through deployment and ongoing evaluation.

The article is notable for its practical orientation, using a hypothetical ISP customer service assistant (helping a user named "Dave" troubleshoot his Wi-Fi issues) to illustrate how the various architectural components work together. While the content is presented in an educational format, it draws heavily from GitHub's direct experience with LLM operations and provides actionable guidance for practitioners.

## The Five-Step Framework for Building LLM Applications

The guide establishes a structured approach to LLM application development that emphasizes iterative, focused development over broad ambitious projects.

### Problem Scoping

The first critical step involves identifying a problem of appropriate scope. The GitHub team emphasizes finding something focused enough for quick iteration but substantial enough to deliver meaningful value. They cite GitHub Copilot's evolution as an example, noting that rather than attempting to address all developer problems with AI, the team initially focused specifically on coding functions within the IDE. This narrow focus allowed for rapid iteration and measurable improvements before expanding the scope. For LLMOps practitioners, this underscores the importance of starting with a well-defined use case rather than attempting to build a general-purpose AI system from the outset.

### Model Selection Criteria

The guide provides a framework for evaluating pre-trained LLMs across three dimensions. First, licensing considerations are paramount for commercial applications, with the article pointing to community-sourced lists of open LLMs licensed for commercial use. Second, model size receives nuanced treatment, with the authors noting that while models range from 350 million parameters (like Ada) to 175 billion parameters, the conventional wisdom that larger equals better is being challenged by improvements in smaller models. They highlight that smaller models offer advantages in speed and cost, making them viable contenders for many production applications. Third, model performance should be evaluated through offline evaluations before any customization work begins. These assessments measure latency, accuracy, and contextual relevance by testing the model against known correct answers. The guide also mentions incremental scoring as a subset of evaluation that allows for partial correctness scoring (e.g., 80% correct) rather than binary right/wrong assessments.

### Model Customization Techniques

The article distinguishes between training an LLM from scratch (building scaffolding and neural networks for deep learning) and customizing a pre-trained model for specific tasks. For production applications, the latter is far more common, and the guide covers three primary customization approaches.

In-context learning, sometimes called prompt engineering by end users, involves providing specific instructions or examples at inference time. The model infers what's needed and generates contextually relevant output. This approach can be implemented through example provision, query rephrasing, and high-level goal statements. This is the lightest-weight customization approach and doesn't require any model training.

Reinforcement Learning from Human Feedback (RLHF) introduces a reward model that predicts whether users will accept or reject LLM outputs. The pre-trained LLM then adjusts its outputs based on user acceptance rates. A key advantage highlighted is that RLHF doesn't require supervised learning with exact labels, expanding the criteria for acceptable outputs. If there's an 80% probability of user acceptance, the output can be considered acceptable. The guide links to resources and codebases for implementing RLHF.

Fine-tuning uses supervised learning where model outputs are evaluated against known correct outputs. The guide uses sentiment classification as an example: feeding "The soup is too salty" to the model and adjusting parameters if it incorrectly classifies the sentiment. While fine-tuning can produce highly specialized models, it requires time-intensive labeling where each input sample needs an exactly correct output label.

## Production Architecture Components

The guide organizes the LLM application stack into three major categories, each with specific tooling requirements.

### User Input Tools

The user interaction layer requires several components working in concert. LLM API and hosting decisions involve choosing between cloud deployment (for handling high volumes, as an ISP would need) and local hosting (more cost-effective for experimentation). The article references tools like Vercel and jina-ai/rungpt for cloud-native LLM deployment and scaling, while also pointing to GitHub Discussions about hardware requirements for running models like LLaMA locally.

The UI layer needs to handle user input routing, and for voice applications, speech-to-text translation tools are necessary to process verbal queries before they reach the LLM.

### Input Enrichment and Prompt Construction

This is where much of the production complexity lives. Vector databases store embeddings (indexed high-dimensional vectors) that increase the probability of helpful responses by providing additional context beyond the base model's training. The guide mentions MongoDB's Vector Atlas Search, Qdrant, Pinecone, and Milvus as options for vector storage.

Embedding models translate user queries into the same high-dimensional vector space as the stored embeddings, enabling semantic similarity search rather than just syntactic matching. This captures both the semantics and intention of natural language. OpenAI and Hugging Face embedding models are referenced, along with open-source alternatives.

Data filters ensure LLMs don't process unauthorized data like personally identifiable information. The guide mentions projects like amoffat/HeimdaLLM that are working on ensuring LLMs access only authorized data.

Prompt optimization tools package end-user queries with relevant context, prioritizing which context embeddings are most relevant and in what order they should be organized. The guide specifically distinguishes between algorithmic prompt engineering (where algorithms construct prompts) and end-user prompt engineering (in-context learning). LangChain is mentioned as a tool for compiling prompts, with the alternative being custom algorithms for context retrieval and ordering. The GitHub Copilot team's use of Jaccard similarity for determining context relevance is highlighted as a practical technique.

### Efficient and Responsible AI Tooling

LLM caching stores outputs to reduce latency, computational costs, and output variability by retrieving cached responses for similar queries rather than generating new ones. GPTCache from Zilliz is mentioned as an experimental tool for this purpose.

Content classifiers or filters prevent harmful or offensive outputs. The guide acknowledges that tools like derwiki/llm-prompt-injection-filtering and laiyer-ai/llm-guard are in early stages but working toward this goal.

Telemetry services enable online evaluation of application performance with actual users. OpenTelemetry is specifically mentioned as an open-source framework providing standardized collection, processing, and export of telemetry data across development, testing, staging, and production environments. The guide links to GitHub's own use of OpenTelemetry for measuring Git performance.

## Evaluation Strategy

The guide makes a clear distinction between offline and online evaluations, emphasizing that both are necessary for production LLM applications.

Offline evaluations test models before user interaction, measuring latency, accuracy, and contextual relevance with known correct answers. These serve as gatekeeping tests that ensure models meet performance standards before deployment.

Online evaluations assess performance during actual user interaction. For GitHub Copilot, these are measured through acceptance rate (how often developers accept completions) and retention rate (how often and to what extent developers edit accepted completions). The guide emphasizes that models passing offline tests may perform differently with real users because user behavior is difficult to model in offline testing.

## Practical Considerations and Limitations

While the guide is comprehensive, it should be noted that this is primarily educational content rather than a detailed case study of a specific deployment. The ISP customer service example is hypothetical and used for illustration. The architectural recommendations draw from GitHub's experience with Copilot but are presented as general guidance rather than specific deployment details.

The guide acknowledges that many of the tools mentioned (content classifiers, prompt injection filters) are "in early stages" or "preliminary projects," suggesting that the LLMOps tooling ecosystem is still maturing. This is an honest assessment that practitioners should keep in mind when selecting tools for production deployments.

The article concludes with references to real-world LLM applications, including NASA and IBM's open-sourced geospatial AI model, Johns Hopkins Applied Physics Laboratory's conversational AI for medical guidance, and companies like Duolingo and Mercado Libre using GitHub Copilot. These examples provide inspiration for problem spaces but are mentioned briefly rather than analyzed in depth.

Overall, this guide serves as a valuable reference architecture for LLMOps practitioners, synthesizing GitHub's internal experience into an accessible framework for building production LLM applications.