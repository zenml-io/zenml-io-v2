---
title: "Building Production AI Coding Assistants and Agents at Scale"
slug: "building-production-ai-coding-assistants-and-agents-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "691468765ff321af2567bfa7"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:27:04.914Z"
  createdOn: "2025-11-12T10:59:02.397Z"
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "code-interpretation"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "agent-based"
  - "multi-agent-systems"
  - "semantic-search"
  - "vector-search"
  - "few-shot"
  - "evals"
  - "system-prompts"
  - "langchain"
  - "llama-index"
  - "open-source"
  - "documentation"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "cache"
  - "chromadb"
  - "pinecone"
  - "anthropic"
  - "openai"
  - "google-gcp"
  - "meta"
industryTags: "tech"
company: "Sourcegraph"
summary: "Sourcegraph's CTO discusses the evolution from their code search engine to building Cody, an enterprise AI coding assistant, and AMP, a coding agent released in 2024. The company serves hundreds of Fortune 500 companies and government agencies, deploying LLM-powered tools that achieve 30-60% developer productivity gains. Their approach emphasizes multi-model architectures, rapid iteration without traditional code review processes, and building application scaffolds around frontier models to generate training data for next-generation systems. The discussion explores the transition from chat-based LLM applications (requiring sophisticated RAG systems) to agentic architectures (using simple tool-calling loops), the challenges of scaling in enterprise environments, and philosophical debates about whether pure model scaling will lead to AGI or whether alternating between application development and model training is necessary for continued progress."
link: "https://www.youtube.com/watch?v=hR6zyA-EUPo"
year: 2025
seo:
  title: "Sourcegraph: Building Production AI Coding Assistants and Agents at Scale - ZenML LLMOps Database"
  description: "Sourcegraph's CTO discusses the evolution from their code search engine to building Cody, an enterprise AI coding assistant, and AMP, a coding agent released in 2024. The company serves hundreds of Fortune 500 companies and government agencies, deploying LLM-powered tools that achieve 30-60% developer productivity gains. Their approach emphasizes multi-model architectures, rapid iteration without traditional code review processes, and building application scaffolds around frontier models to generate training data for next-generation systems. The discussion explores the transition from chat-based LLM applications (requiring sophisticated RAG systems) to agentic architectures (using simple tool-calling loops), the challenges of scaling in enterprise environments, and philosophical debates about whether pure model scaling will lead to AGI or whether alternating between application development and model training is necessary for continued progress."
  canonical: "https://www.zenml.io/llmops-database/building-production-ai-coding-assistants-and-agents-at-scale"
  ogTitle: "Sourcegraph: Building Production AI Coding Assistants and Agents at Scale - ZenML LLMOps Database"
  ogDescription: "Sourcegraph's CTO discusses the evolution from their code search engine to building Cody, an enterprise AI coding assistant, and AMP, a coding agent released in 2024. The company serves hundreds of Fortune 500 companies and government agencies, deploying LLM-powered tools that achieve 30-60% developer productivity gains. Their approach emphasizes multi-model architectures, rapid iteration without traditional code review processes, and building application scaffolds around frontier models to generate training data for next-generation systems. The discussion explores the transition from chat-based LLM applications (requiring sophisticated RAG systems) to agentic architectures (using simple tool-calling loops), the challenges of scaling in enterprise environments, and philosophical debates about whether pure model scaling will lead to AGI or whether alternating between application development and model training is necessary for continued progress."
---

## Overview and Company Background

Sourcegraph, founded by CTO Benji Weber and his co-founder Quinn after their time at Palantir, originally focused on building code search engines to help developers navigate large enterprise codebases. The company has evolved through multiple product generations, ultimately serving hundreds of Fortune 500 companies and government agencies including Uber, Lyft, Stripe, OpenAI, major banks, and various government entities worldwide. Their journey from code search to AI-powered coding tools provides insights into the practical challenges of deploying LLMs in production at enterprise scale.

The founding story reveals important motivations: at Palantir, the founders observed that 98-99% of professional software engineering time was spent on "toil" - reading existing code, understanding systems, finding libraries, and other mechanical tasks rather than creative problem-solving. This insight drove their mission to "take the drudgery out of professional software development" by making large codebases easier to understand and work with.

## Product Evolution: From Code Search to AI Assistants to Agents

### Code Search Foundation

The original Sourcegraph product was a code search engine, which proved challenging to sell because it wasn't recognized as a standard tool category like editors or terminals. Their early innovation included building what was essentially the Language Server Protocol (LSP) before LSP existed - creating a uniform layer that mapped compiler-level nodes and types from specific languages to a language-agnostic schema. This allowed applications to perform code navigation actions like "go to definition" or "find references" without language-specific knowledge at the application layer.

The technical challenges centered on scaling indices for large codebases across different branches and implementing "precise code intelligence" with compiler-level understanding. Interestingly, the CTO notes that the compiler part wasn't the difficult aspect - it was adapting the system to all the different build systems encountered in enterprise environments.

### Cody: The Chat-Based AI Coding Assistant

When ChatGPT emerged, Sourcegraph recognized synergy between frontier LLMs' ability to synthesize information through in-context learning and their existing code search capabilities. This led to Cody, their "gen one AI coding assistant" based on the chat LLM application model. The core idea was combining Sourcegraph's "DNA around code search" with frontier LLMs to build an assistant particularly good at generating code and answering questions in the context of large, messy enterprise codebases where base models alone wouldn't perform well.

However, Sourcegraph pushed Cody directly to enterprise customers rather than riding the consumer hype wave of 2023-2024, which the CTO acknowledges may have been a strategic mistake in terms of market awareness. Despite this, Cody has achieved significant traction in enterprise environments, with customers reporting 30-60% efficiency gains in development productivity. These metrics are tied to ROI calculations that customers present to their CFOs to justify purchasing the software, representing real bottom-line business justifications rather than vanity metrics.

The architecture of Cody represents what the CTO calls the "chat era" of LLMs, characterized by applications built around sophisticated context engines (often called "fancy retrieval engines" or RAG systems) that would fetch relevant context to place in an LLM's context window for single-turn responses. This architecture was necessary because earlier models lacked robust tool-use capabilities and couldn't gather their own context.

### AMP: The Agentic Architecture

Released in April 2024 (making it only five months old at the time of this discussion), AMP represents Sourcegraph's entry into the coding agent space. The CTO emphasizes how dramatically the landscape has shifted - coding agents as a product category "weren't really a thing until mid to late spring of this year," yet they've already fundamentally changed how engineers code.

The decision to build AMP from scratch rather than bolting agent capabilities into Cody reflects a fundamental architectural insight: the agentic era of LLMs represents a distinct paradigm from the chat era. At its most basic, an agent is described as "a for loop plus a model and a set of tools that it can invoke to gather context or act on the world." This represents a fundamentally different application architecture because frontier models can now reliably use tools, enabling them to gather their own context rather than requiring sophisticated external retrieval systems.

The shift changes the optimization focus from building super-smart context engines to simply giving models primitive tools and letting their agency and iterative search capabilities find relevant information. The agentic approach can perform multiple iterated hops and is often competitive with or better than sophisticated vector search systems. This architectural change also fundamentally alters the ideal user experience - from chat-based single interactions to expressing intent in text, having the agent perform multiple actions, communicating progress, and reacting iteratively.

## Technical Philosophy and Architectural Decisions

### Multi-Model Architecture

AMP employs a multi-model design, but not as a simple "model selector" approach. The philosophy treats agents and tools as functions that can be composed, with the design focused on how these functions should be structured rather than on properties of individual models. The CTO criticizes how popular discourse focuses on model quirks ("GPT-5 has this behavior," "Claude has that behavior") when the real differentiator is the embodiment of the model within the application scaffolding - tweaking system prompts slightly can produce dramatically different behaviors from the same model.

This approach views the agent as the fundamental building block rather than the model itself, enabling more robust and flexible systems that aren't overly dependent on specific model characteristics or providers.

### Development Practices Without Traditional Code Review

Perhaps most radically, the AMP team operates without traditional code review processes. Every team member has push access to main, and the default is to own changes completely and push directly unless specific expertise is needed. If code breaks, the author is directly responsible - no "blameless postmortems." This represents a deliberate rejection of what are considered software engineering best practices.

The reasoning reveals deep thinking about efficiency in the age of AI coding assistants. Traditional best practices like "blame the process, not the person" arose from necessity when many hands touched each feature and you couldn't point to a single responsible party. These practices created massive diffusion of responsibility that resulted in tremendous inefficiency. The CTO suggests that code review is often "kabuki theater" - for 10-line changes, reviewers nitpick every detail, but for thousand-line changes, it becomes a rubber stamp "LGTM" because engineers have their own deadlines.

With coding agents, one person can drive many parallel iterations of the development loop, fundamentally changing the economics. The CTO notes spending about 80% of development time "effectively doing code review" - reading agent output, understanding what it's doing, ensuring it's not subtly wrong - but doing this within the editor many times over on a thorough basis, because failing to do so will "shitify your code."

This represents building software "in the way that we think everyone should be building software in one to five years" - cutting through process when the fundamental structure has changed from many hands driving one loop to one person driving many loops in parallel.

### Evaluation Approach

Sourcegraph doesn't employ traditional academic-style evaluations. Instead, they use evals in the sense of unit tests or regression tests - if a workflow is important, they create an example and run it when making major changes to catch regressions. 

The transition from chat-based to agentic LLMs was so dramatic that comparative evaluation wasn't necessary - it was "obvious to anyone who uses this thing inside of 5 minutes that it's capable of things you could not even have dreamed of before." This led to building for the new paradigm using the standard product development approach: build for yourself first, use it extensively, and let your own internal reinforcement learning process guide improvements.

## Scaling Philosophy and Enterprise Deployment

### The Anti-Premature-Scaling Approach

Despite having hundreds of enterprise customers for their core products, Sourcegraph is deliberately not prematurely scaling AMP. While some enterprise customers are adopting it, they're not "bending over backward to solve a bunch of enterprise compliance checkbox requirements when the landscape is not settled." The product is run almost like a separate entity or research lab with a core team of about 10 people.

This reflects lessons learned from earlier years spent "trying to sell not just Sourcegraph specifically but the whole product category" to people who didn't understand why they needed code search. The early customer journey was challenging - Twitter became their first customer around 2015 (an ex-Google employee who missed Google's internal code search), but then churned after 18 months, sending them "from zero to one back to zero again" to "wander in the desert for a little bit more" until Uber became their "second first customer."

### The Perils of Following Standard SaaS Playbooks

A major theme in the discussion is how standard SaaS playbooks have been "completely inverted" and are now "probably actively harmful" in the current rapidly-changing AI landscape. Between 2010-2022, there was a relatively stable way to do B2B SaaS - strategic selling, predictable revenue, enterprise sales pipelines, listening to enterprise customers to understand their needs, building products based on their feedback.

However, in the current environment, "there's very few enterprise customers that actually know what they want." They might think they know what they want in two days, but in six months the landscape will have shifted completely. Even the companies building these tools don't know where things will be. This led to the mistake of pushing Cody through standard enterprise channels, resulting in significant real-world impact (those 30-60% productivity gains at major companies) but lower public awareness compared to consumer-focused alternatives.

The new approach embraces uncertainty, running AMP almost as a separate research-oriented entity focused on "figuring out what the future looks like and inventing it" rather than responding to enterprise checkbox requirements.

## Philosophical Perspectives on AI Progress

### The Limits of Pure Scaling

The discussion includes substantial philosophical reflection on whether "scaling is all you need" for achieving AGI. The CTO offers a nuanced take, positioning current LLMs as "universal pattern matchers or curve fitters" - given a distribution from which you're sampling data, sample enough and train a model, and you have a machine that will predict that distribution. This is powerful for anything representable in the model's input modalities (text, images, etc.) - you can train functions mapping X to Y.

However, this still requires collecting data representing the distribution you're trying to fit. While there's enormous abundance of data for certain domains (textbooks, written word, code, images), once you conquer these "primitive tasks," what remains at the frontier falls into two categories:

- Tasks at the frontier of human knowledge requiring genuine new discoveries (not discoverable through simple combinatorics of existing knowledge)
- Adversarial domains where you're competing against other humans with AI, with constantly shifting frontiers and novel strategies emerging

For true AGI - "globally dominating on the set of all things humans can do" where no element exists that humans do better - the question becomes: what datasets exist for that? How do you generate such data?

### The EM Algorithm Analogy and Alternating Ascent

The CTO proposes an "alternating ascent" model for frontier advancement, drawing on the Expectation-Maximization (EM) algorithm from classical machine learning. EM works by alternating two steps: generating expected data given current model parameters, then finding parameters that maximize likelihood for that data. This alternating staircase somehow leads to convergence toward global maxima.

Applied to AI product development, the vision is:
- Take current frontier models
- Build application scaffolds that accomplish previously impossible tasks (e.g., generating web applications from natural language without hand-writing React code)
- Using those applications generates new data - mapping from human inputs to ultimate outputs, a distribution that didn't previously exist
- This new data trains next-generation models
- Those models enable new application scaffolds with reduced need for old scaffolding
- This iteration continues, each generation expanding capabilities

This view suggests that simply consuming more tokens isn't enough - you must actively generate the right tokens through application development, then feed that back into training. This requires both model training expertise and application building expertise, forming a dual core competency.

### Critiques of Pure RL Approaches

The podcast includes a fascinating sidebar critique of pure reinforcement learning approaches from the host, particularly targeting Policy Optimization methods like PPO, TRPO, and similar algorithms used in RLHF. The argument centers on plasticity and distribution shift:

- Classic RL with gradient clipping can't make the dramatic policy updates humans make (example: a car accident leading to fear of cars for a year, versus a model that would need that specific scenario repeated many times to learn the general principle)
- Trust region methods in PO approaches prevent moving too far from the current policy to maintain stability, which clips out strong learning signals
- Training on one task reduces performance on orthogonal tasks (the loss of plasticity problem from Sutton's research)
- This fundamentally doesn't map to how human learning works, where we can make massive policy shifts from single experiences and maintain flexibility across diverse domains

The self-driving car example is particularly illustrative: a model trained on 100 million hours of US driving data would perform disastrously in Australia (wrong side of the road) while humans adapt almost immediately. This suggests fundamental limitations in current approaches to achieving human-like general intelligence.

## Market Positioning and Competitive Landscape

### The Compressed Timeline and Competitive Dynamics

The CTO reflects on the surreal compression of time in AI - AMP being "only five months old" but feeling like "five years old," and coding agents as a product category emerging just in "mid to late spring" of 2024 yet already fundamentally changing how everyone codes. This compression means that "if you squint, everyone seems like a potential competitor" since everyone is chasing greater intelligence and better code generation with feedback.

However, Sourcegraph doesn't view the market primarily through a competitive lens. Their focus remains specific: "creating software that works at scale" - the software powering digital infrastructure of the world. This differentiates them from pure coding tools or editor plugins, as they're thinking holistically about the entire software development lifecycle transformation.

### The Inevitable Disruption Cycle

A meta-perspective emerges on how incumbents inevitably get disrupted. In 2020, everyone thought Google would monopolize AI given their research dominance, but they're not even leading most categories. The explanation offered is that regulatory pressure from monopoly lawsuits made leadership risk-averse. Behind closed doors, the suggestion is Sundar Pichai would celebrate OpenAI taking market share because it reduces regulatory scrutiny.

This pattern applies to any company above $100M revenue with more than 100 people, an enterprise sales team, and high-paying customers - they get on a treadmill of optimizing for current customers, listening to their requests, and responding to their demands. While this is "good business," it creates political pressures and incentive misalignments. High-paying customers (10%+ of revenue) become an unofficial board of directors steering the company toward short-term gains over long-term innovation.

The example of competitors exchanging roadmaps illustrates this - sharing your entire roadmap with competitors likely wouldn't change what they do because they're all trapped in similar dynamics, responding to their own customer bases and organizational inertia. This creates persistent opportunities for smaller, nimbler organizations to innovate around incumbents.

## Data and Privacy in Enterprise Contexts

An important practical consideration discussed is the limitation of enterprise tokens for training general models. While Sourcegraph has access to "all the tokens" from hundreds of Fortune 500 codebases (each potentially terabytes in size), they can't use this for training general models due to enterprise privacy and data sensitivity concerns. Customers are "very privacy and data sensitive" and won't allow their proprietary code to be rolled into models deployed outside their organizations.

This creates an interesting constraint on the "scaling is all you need" hypothesis - even with access to enormous amounts of high-quality, specialized data, contractual and privacy limitations prevent using it to advance general-purpose models. The value becomes deployment of models within specific enterprise contexts rather than improving frontier models for everyone.

## The Productivity Paradox and Labor Market Effects

The discussion addresses the common fear that AI coding assistants will eliminate developer jobs - if engineers are 60% more productive, why not hire half as many? The response emphasizes competitive dynamics: as long as you're not a monopoly and software quality matters, your competitor can achieve the same efficiency gains. This creates an arms race where the advantage isn't in reducing headcount but in building superior products faster.

The vision is that pre-2023 software will eventually be viewed as "really bad" - full of horrible user experiences, pitfalls, and poor UX that we currently tolerate. More streamlined software experiences will become standard, and "there should be way more software engineers in the world because the demand for quality software tackling different knowledge domains is almost limitless."

This parallels the retail example from the host's experience: making stockers twice as efficient doesn't mean cutting staff when you have 20% out-of-stocks - it means capturing more sales. Similarly, more productive developers enable building better software that captures more value, not necessarily with fewer people.

## Future of Software Roles

The CTO predicts that traditional roles will transform or disappear. Product management as it exists in large companies today will go away, as will classic front-end or application-level engineering roles in their current form. The survivors will be those who "think at the product level and deliver features end to end that solve real user pains" - essentially technical product managers (TPMs) who understand code, know what's technically possible, understand users, and can build great products.

This maps to the changed SDLC where one person drives many parallel iterations rather than many people driving one iteration. The entire loop needs rethinking - even code review in GitHub PRs becomes questionable. Why do code review in PRs anymore when you're spending 80% of development time doing thorough code review within your editor as you work with agents? The traditional checkpoint-based process made sense when many hands touched the work, but becomes inefficient when single engineers own changes end-to-end.

## Conclusion and Forward-Looking Perspective

The Sourcegraph case study reveals the practical realities of deploying LLMs in production at enterprise scale over multiple product generations. Their evolution from code search to RAG-based assistants to agentic systems tracks the broader evolution of LLM capabilities and application architectures. The willingness to fundamentally rethink development processes (eliminating code review), organizational structure (small nimble teams rather than premature scaling), and go-to-market strategy (avoiding standard SaaS playbooks) demonstrates how the AI era requires challenging long-held assumptions about software development and business models.

The philosophical discussions around scaling laws, the necessity of alternating between application development and model training, and the competitive dynamics ensuring continued innovation even as incumbents gain advantages provide valuable context for understanding where the industry may be heading. The grounding in real enterprise deployments with measurable productivity gains, combined with the experimental approach to the next generation of tooling, offers a balanced perspective on both the current state and future potential of AI coding tools in production environments.