---
title: "Building a Search Engine for AI Agents: Infrastructure, Product Development, and Production Deployment"
slug: "building-a-search-engine-for-ai-agents-infrastructure-product-development-and-production-deployment"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "692815cc942e1711f53c019f"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:29:14.514Z"
  createdOn: "2025-11-27T09:11:40.505Z"
llmopsTags:
  - "question-answering"
  - "data-analysis"
  - "chatbot"
  - "document-processing"
  - "customer-support"
  - "structured-output"
  - "unstructured-data"
  - "realtime-application"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "rag"
  - "reranking"
  - "agent-based"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "latency-optimization"
  - "model-optimization"
  - "evals"
  - "chunking"
  - "kubernetes"
  - "docker"
  - "monitoring"
  - "databases"
  - "api-gateway"
  - "scaling"
  - "microservices"
  - "cicd"
  - "devops"
  - "orchestration"
  - "open-source"
  - "documentation"
  - "pytorch"
  - "tensorflow"
  - "fastapi"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "postgresql"
  - "redis"
  - "cache"
  - "elasticsearch"
  - "openai"
  - "anthropic"
  - "google-gcp"
  - "amazon-aws"
  - "meta"
industryTags: "tech"
company: "Exa.ai"
summary: "Exa.ai has built the first search engine specifically designed for AI agents rather than human users, addressing the fundamental problem that existing search engines like Google are optimized for consumer clicks and keyword-based queries rather than semantic understanding and agent workflows. The company trained its own models, built its own index, and invested heavily in compute infrastructure (including purchasing their own GPU cluster) to enable meaning-based search that returns raw, primary data sources rather than listicles or summaries. Their solution includes both an API for developers building AI applications and an agentic search tool called Websites that can find and enrich complex, multi-criteria queries. The results include serving hundreds of millions of queries across use cases like sales intelligence, recruiting, market research, and research paper discovery, with 95% inbound growth and expanding from 7 to 28+ employees within a year."
link: "https://www.youtube.com/watch?v=pltf9IdH6fA"
year: 2025
seo:
  title: "Exa.ai: Building a Search Engine for AI Agents: Infrastructure, Product Development, and Production Deployment - ZenML LLMOps Database"
  description: "Exa.ai has built the first search engine specifically designed for AI agents rather than human users, addressing the fundamental problem that existing search engines like Google are optimized for consumer clicks and keyword-based queries rather than semantic understanding and agent workflows. The company trained its own models, built its own index, and invested heavily in compute infrastructure (including purchasing their own GPU cluster) to enable meaning-based search that returns raw, primary data sources rather than listicles or summaries. Their solution includes both an API for developers building AI applications and an agentic search tool called Websites that can find and enrich complex, multi-criteria queries. The results include serving hundreds of millions of queries across use cases like sales intelligence, recruiting, market research, and research paper discovery, with 95% inbound growth and expanding from 7 to 28+ employees within a year."
  canonical: "https://www.zenml.io/llmops-database/building-a-search-engine-for-ai-agents-infrastructure-product-development-and-production-deployment"
  ogTitle: "Exa.ai: Building a Search Engine for AI Agents: Infrastructure, Product Development, and Production Deployment - ZenML LLMOps Database"
  ogDescription: "Exa.ai has built the first search engine specifically designed for AI agents rather than human users, addressing the fundamental problem that existing search engines like Google are optimized for consumer clicks and keyword-based queries rather than semantic understanding and agent workflows. The company trained its own models, built its own index, and invested heavily in compute infrastructure (including purchasing their own GPU cluster) to enable meaning-based search that returns raw, primary data sources rather than listicles or summaries. Their solution includes both an API for developers building AI applications and an agentic search tool called Websites that can find and enrich complex, multi-criteria queries. The results include serving hundreds of millions of queries across use cases like sales intelligence, recruiting, market research, and research paper discovery, with 95% inbound growth and expanding from 7 to 28+ employees within a year."
---

## Overview and Mission

Exa.ai represents a comprehensive case study in building production LLM infrastructure from the ground up. Founded to address the fundamental mismatch between traditional search engines (designed for human keyword queries and optimized for ad clicks) and the needs of AI agents (requiring semantic understanding, raw data, and high customization), the company has taken a research-first approach to solving search for the AI era. The interview with Tai Castello, Head of Marketing and Strategy, provides insights into how the company balances research, infrastructure, and product development while scaling LLM operations in production.

The core insight driving Exa is that AI agents don't want "one listicle that summarizes the answer" - they want raw information they can ingest in bulk with precise control over what information to find. Traditional search engines like Google work primarily on keyword matching and don't truly understand the semantic meaning of either queries or documents. This creates a fundamental limitation when AI systems need to search for complex, nuanced information that may not contain exact keyword matches.

## Technical Architecture and Infrastructure Decisions

Exa made several bold infrastructure decisions that differentiate them from competitors and enable their production LLM operations. Most significantly, they purchased and operate their own GPU cluster rather than relying on cloud providers. This decision, made very early in the company's lifecycle (when they were only around 7-8 people), was initially seen as potentially crazy but has proven essential for their operations. The cluster is "utilized at all times" and the team is "even constrained" by compute availability, with plans to expand. The cluster is named after their company's etymology - "Exa" meaning 10 to the 18th power - reflecting their ambition for scale.

Owning their own compute infrastructure provides several critical advantages for their LLMOps:
- **Zero data retention guarantees**: Because they control the entire stack (model, index, and infrastructure), they can provide privacy guarantees that matter significantly to enterprise customers, especially in finance, consulting, and government sectors. This is impossible when wrapping third-party APIs.
- **Latency optimization**: They can optimize every layer of the stack without being constrained by intermediate services. They're currently releasing what they claim will be "the fastest search API in the world" by training their own re-ranker, parallelizing operations, and controlling all intermediate steps.
- **Research flexibility**: The team can allocate compute for experimental research without negotiating with external providers or worrying about cost per experiment.

The company built their own index of the web and trained their own models rather than wrapping existing search APIs (like Google or Bing). This allows them to ingest all documents on the web and turn them into embeddings, capturing semantic understanding of websites. Their search works through a combination of keyword matching and "full vector matching and cosine similarity" - enabling meaning-based search rather than pure keyword matching.

## Research-First Organizational Structure

Exa positions itself as a "research-first organization from the start," dedicating what Castello acknowledges might seem "disproportional to our stage" in terms of engineering resources to research. They spent "millions of dollars on a cluster" early on specifically to enable R&D and "truly discover breakthroughs in search." This investment is paying off as they encounter use cases that competitors who wrapped existing platforms simply cannot serve due to privacy, latency, or capability constraints.

The research team works on fundamental problems in search technology, including developing their own re-ranker models for result ranking. The company runs research paper reading sessions every Thursday, and uses their own Websites product to monitor for new research papers from top PhD programs on topics like retrieval, embeddings, and vector spaces. This continuous learning loop ensures they stay at the cutting edge of search and retrieval technology.

The company has been strategic about when to emphasize pure research versus product engineering. In the beginning, heavy research investment was critical to establish their technical moat. As they've matured, they're balancing research breakthroughs with productization efforts to serve emerging use cases they're seeing in the market.

## Product Architecture: API and Websites

Exa offers two main products that reflect different approaches to deploying LLMs in production contexts:

**The Exa API** provides four main endpoints for developers building AI applications:
- **URLs only**: Returns just URLs for ultra-low latency use cases
- **URLs + full content**: Returns URLs plus full markdown text of pages for LLMs to ingest
- **Answer endpoint**: Pre-processes information and returns structured answers or reports in customizable formats
- **Research endpoint**: Performs more complex agentic searches for hard-to-find information, returning structured output in developer-specified formats

This tiered approach recognizes that different production use cases have different compute/latency/complexity tradeoffs. Some applications need "very simple fast search" with "low latency, low compute" for instant data, while others involve "very valuable questions that you're willing to wait a little longer" for "high compute, higher latency search" that can solve problems "you would never be able to find with a traditional search engine."

**Websites** is their second product - an agentic search tool that emerged from user research showing customers were using the API internally for sales intelligence, market research, and recruiting. Websites combines Exa's search backend with "intelligent agentic workflows" to return fully validated lists matching complex, multi-criteria queries. The output is structured as a spreadsheet-like matrix where each row is a validated result and columns can be dynamically added to enrich entities with additional information scraped from the web.

The architectural insight here is powerful: by understanding that different LLM applications have different needs (from instant consumer-facing features to deep research that can take minutes), Exa built flexibility into their product design rather than forcing one-size-fits-all solutions.

## Production Use Cases and LLMOps Patterns

Castello describes several emerging patterns in how customers deploy Exa in production LLM systems:

**Instant Consumer Applications**: Some customers build consumer apps with chat features that pull live recommendations from the web. These require "very instant" responses - typically "one search max two" that quickly fetches results, summarizes them, and presents to users. The LLMOps challenge here is extreme latency sensitivity and the need for high reliability at scale.

**Deep Research Agents**: Consulting firms and finance companies build "multi-step agents that can go research the web, compile information and go do another search" to produce comprehensive reports or market monitoring. These might take 20+ minutes but solve problems that previously required expensive human labor. The LLMOps challenge is orchestrating multiple search calls, managing context across calls, and ensuring accuracy of synthesized results.

**Coding Agents with Search Deciders**: Some customers build coding agents that first use an LLM to decide "is this query that the user is writing answerable just with an LLM or do you even need search?" If search is needed, the agent fetches technical documentation to ground the code generation. This pattern of using one LLM to route or decide when to invoke external tools is becoming common in production agentic systems.

**Chained and Contextual Search**: The ability to chain searches together represents a significant advancement over traditional search. After an initial search retrieves information, that knowledge can inform subsequent queries rather than starting from a "clean state." With embeddings and semantic search, agents can "start with a query, retrieve information, distill it, and then trigger another query that's even better."

Exa uses its own products extensively in production for recruiting and outbound sales, providing validation of their approach. They run "pretty much all of our recruiting and all of our outbound sales now on Websites," finding candidates with very specific combinations of skills and identifying companies matching complex criteria for outbound.

## Evaluation and Performance Optimization

Castello is candid that evaluation remains one of "the hardest problems to solve" and acknowledges they're "on step one as a category of evals." They've implemented traditional benchmarks and QA tests, but recognize these "don't end up being so practical or they don't really represent how the world works and how search is being used in the real world."

Their approach to evaluation is evolving toward use-case-specific benchmarks based on actual customer queries rather than purely academic benchmarks. With "hundreds of millions of queries" run through their system, they have rich data on frequency of topics and how search is used in practice. They're planning to "release our own benchmark" based on real-world scenarios and specific use cases their customers care about.

Performance optimization is a critical focus area, with Castello emphasizing that "performance is actually the bottleneck for a lot of use cases because if you can't use your compute efficiently, if you can't have low latency, a lot of things just won't make sense." They recently held an event with AWS, Modal, Anthropic, and others on "high performance engineering in the age of AI."

The company invested heavily in developing "the fastest search API in the world" through:
- Training their own re-ranker for faster results
- Parallelizing operations throughout the stack
- Optimizing every layer they control (which is only possible because they own the full stack)

Latency matters especially for use cases like voice agents, which "need to work instantly" and where search has historically been the bottleneck. It also matters for multi-step agents that might do "30 different searches" where latencies compound.

## Business Model and GTM Strategy

Exa operates purely B2B, building infrastructure for "companies that are either AI-first startups or big companies building AI features" who "plug in whatever AI system they have to Exa." This positioning as infrastructure/enabler rather than end-user application is a strategic LLMOps decision that shapes their entire approach.

The company has achieved 95% inbound growth, largely driven by a strong developer brand built through excellent documentation, quick adoption of new standards (like MCP - Model Context Protocol), and active engagement on Twitter. Castello emphasizes that "distribution and brand" represent a significant moat, noting that "anything that we do ends up multiplying if you have a strong brand."

Different customer segments care about different aspects of the LLMOps:
- **Startups** prioritize customization, easy integration, excellent documentation, and low friction to get started. They need to implement quickly "in a very intuitive way."
- **Enterprises** care deeply about customization, latency for specific use cases, and especially privacy/zero data retention. The ability to guarantee privacy "matters way more than I ever imagined" according to Castello, particularly for finance, consulting, and government customers.

Pricing and business model details aren't extensively covered in the interview, but the flexibility to serve both rapid experimentation (for startups) and production-scale deployments (for enterprises) requires careful LLMOps architecture.

## Scaling Challenges and Team Growth

The company grew dramatically from 7-8 people when Castello joined (a little over a year before the interview) to 28 at the time of interview, with plans to reach 55 by end of quarter. This rapid scaling creates significant LLMOps challenges around:
- Allocating scarce compute resources across competing priorities
- Maintaining quality bar while hiring quickly
- Onboarding new team members to complex infrastructure

Their recruiting process is notably rigorous, including "technical interviews" and "on-site work trials for everyone." Castello mentions with pride that a person who was later discovered to be working at "20 different SF startups at the same time" failed their work trial, validating their screening process.

The company recruits heavily from academia, attending conferences like NeurIPS and ACL, and building relationships with university career offices. This academic recruiting pipeline feeds their research-first culture and ensures they have talent capable of pushing the boundaries of search technology.

## Technical Philosophy and Future Direction

Several philosophical points emerge about how Exa thinks about LLMs in production:

**Knowledge vs. Intelligence**: Castello articulates clearly that "intelligence by itself is not enough" - LLMs need access to knowledge and context. The analogy: "would you want a super high IQ person that has not been trained as a doctor to operate on you?" This drives their focus on retrieval and search as essential infrastructure for capable LLM applications.

**The Web as Database**: Exa is working toward a vision of "querying the web as a database" - treating the entire web as a live, queryable data source rather than a collection of pages to browse. This enables finding information that matches complex criteria without pre-tagging or building stale datasets.

**Beyond Keywords to Semantic Understanding**: The shift from keyword-based to meaning-based search represents a fundamental rethinking of how information retrieval works. Traditional search required humans to learn how to search (finding the right keywords), whereas semantic search allows more natural language descriptions of what you're looking for.

**Customization Over One-Size-Fits-All**: Rather than building a single search experience, Exa provides extensive customization options (number of results, latency vs. quality tradeoffs, output formats) recognizing that production LLM applications have diverse needs.

Looking forward, Castello notes that while Exa currently focuses on text search over public web data, they're interested in "how do they query not just the web but other types of data" including private, paywalled, or internal company data. They see potential in combining their web search with tools like Glean (for internal document search) to create "perfectly knowledgeable" AI systems.

## Broader LLMOps Insights

The Exa case study illuminates several important principles for LLMOps:

**Infrastructure decisions matter immensely**: The choice to build their own models, index, and even purchase compute rather than wrapping existing services creates both constraints (high upfront investment) and capabilities (full stack optimization, privacy guarantees) that directly impact what production use cases they can serve.

**Research and production engineering must coexist**: Exa's research-first approach while simultaneously serving production customers at scale demonstrates that cutting-edge LLM applications require both research breakthroughs and production engineering excellence.

**Evaluation remains an open problem**: Despite hundreds of millions of production queries, the team acknowledges evaluation is still early-stage. Creating meaningful benchmarks that reflect real-world use cases rather than academic test sets is an ongoing challenge.

**Performance optimization is critical**: As LLM applications move beyond demos to production, latency, cost, and compute efficiency become make-or-break factors. The ability to optimize these requires control over the full stack.

**Different use cases need different approaches**: The tiered API design and separate Websites product reflect understanding that one-size-fits-all doesn't work in production. Some use cases need instant responses with lower accuracy, others can tolerate latency for higher quality results.

The interview provides a rare window into the practical realities of building and operating LLM infrastructure at scale, showing the intricate tradeoffs between research, engineering, product, and business considerations that characterize successful LLMOps in the current AI landscape.