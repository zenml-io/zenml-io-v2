---
title: "AI-Powered Citizen Inquiry Automation with Ticketing System Integration"
slug: "ai-powered-citizen-inquiry-automation-with-ticketing-system-integration"
draft: false
llmopsTags:
  - "customer-support"
  - "question-answering"
  - "classification"
  - "chatbot"
  - "rag"
  - "prompt-engineering"
  - "embeddings"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "human-in-the-loop"
  - "evals"
  - "kubernetes"
  - "docker"
  - "langchain"
  - "postgresql"
  - "fastapi"
  - "chromadb"
  - "openai"
  - "microsoft-azure"
industryTags: "government"
company: "City of Munich"
summary: "The City of Munich IT department developed an AI-powered system to automate citizen inquiries through their Zammad ticketing platform, initially targeting the driver's licensing authority which handles approximately 16,000 requests annually. The solution uses a RAG-based architecture combining LLM-driven ticket classification, automated response generation from knowledge bases, and human-in-the-loop oversight. A comprehensive pre-study analyzed over 15,000 historical tickets using prompt-engineered LLM categorization to validate feasibility and calculate ROI. The system, still in development at the time of presentation, is designed as a reusable, event-driven platform that can scale across multiple city departments through configuration rather than custom development, following open-source principles and EU AI Act compliance requirements."
link: "https://www.youtube.com/watch?v=9Sfxy2nmUU0"
year: 2026
seo:
  title: "City of Munich: AI-Powered Citizen Inquiry Automation with Ticketing System Integration - ZenML LLMOps Database"
  description: "The City of Munich IT department developed an AI-powered system to automate citizen inquiries through their Zammad ticketing platform, initially targeting the driver's licensing authority which handles approximately 16,000 requests annually. The solution uses a RAG-based architecture combining LLM-driven ticket classification, automated response generation from knowledge bases, and human-in-the-loop oversight. A comprehensive pre-study analyzed over 15,000 historical tickets using prompt-engineered LLM categorization to validate feasibility and calculate ROI. The system, still in development at the time of presentation, is designed as a reusable, event-driven platform that can scale across multiple city departments through configuration rather than custom development, following open-source principles and EU AI Act compliance requirements."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-citizen-inquiry-automation-with-ticketing-system-integration"
  ogTitle: "City of Munich: AI-Powered Citizen Inquiry Automation with Ticketing System Integration - ZenML LLMOps Database"
  ogDescription: "The City of Munich IT department developed an AI-powered system to automate citizen inquiries through their Zammad ticketing platform, initially targeting the driver's licensing authority which handles approximately 16,000 requests annually. The solution uses a RAG-based architecture combining LLM-driven ticket classification, automated response generation from knowledge bases, and human-in-the-loop oversight. A comprehensive pre-study analyzed over 15,000 historical tickets using prompt-engineered LLM categorization to validate feasibility and calculate ROI. The system, still in development at the time of presentation, is designed as a reusable, event-driven platform that can scale across multiple city departments through configuration rather than custom development, following open-source principles and EU AI Act compliance requirements."
notion:
  pageId: "3b8f8dff-2538-800d-9c17-e0286cdc45b1"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-10T12:43:00.000Z"
  lastEditedTime: "2026-08-10T12:43:00.000Z"
  publishedAt: "2026-08-10T15:25:30Z"
---

## Overview

The City of Munich represents one of the largest municipal employers in Germany with approximately 30,000 employees across 15 different departments. The IT department, known as IT@M, serves as the central service provider with 1,300 employees managing workplaces, smartphones, laptops, and processing over 5 million emails annually. The AI team consists of just seven people, with the architect for AI presenting this case study alongside developers who implemented the solution.

The specific use case focuses on automating citizen inquiries for the driver's licensing authority, a high-volume service where citizens apply for new licenses, replacements for lost licenses, and other related matters. This initiative is part of a broader strategic shift from email-based citizen contact to a centralized ticketing system, recognizing that Outlook and other email tools provide insufficient transparency and workflow management for high-volume citizen service operations.

## Business Problem and Pre-Study Approach

Before committing to full development, the team conducted an extensive pre-study to validate feasibility and calculate return on investment. This pre-study analyzed over 15,000 historical tickets from the driver's licensing authority using what they termed "LLM-driven ticket analysis." Rather than manually categorizing thousands of tickets, they built an LLM pipeline with prompt-engineered categorization using a custom taxonomy.

The pre-study process was explicitly iterative. Subject matter experts initially provided categories, but these proved inadequate upon testing. The team worked collaboratively with domain experts and the LLM to discover the actual patterns in citizen inquiries and how they were being answered. This represents a balanced approach to LLMOps where domain expertise guides the process but data-driven discovery through LLM analysis reveals actual usage patterns.

The analysis revealed three major categories of inquiries: status checks on existing submissions (the largest category, representing a significant drain on staff time), general questions answerable from knowledge bases, and subsequent document submissions for incomplete applications. The team evaluated each category for AI answerability and estimated time savings per human agent, ultimately calculating a positive ROI that justified proceeding with the full system.

## Technical Architecture

The system follows an event-driven architecture built around the Zammad open-source ticketing system. Zammad serves as the core platform, accepting citizen inquiries through web forms and managing ticket lifecycle, ownership, groups, status, and priorities. Critically, Zammad includes a built-in knowledge base that both human agents and AI can leverage for consistent responses.

The overall flow begins when a citizen fills out a form on the munich.de website, which creates a ticket in Zammad. The ticket event is published to Kafka, triggering the AI processing pipeline. The architecture separates concerns across several services within what they call "Zammad AI":

A Kafka broker listens for ticket events with specific topics, triggering a triage service that retrieves ticket information from an enterprise application integration API and decides what action to take. The triage service routes tickets to an action service that handles three possible outcomes: no action if AI cannot answer and a human agent is required, static answers from configuration files for very basic questions, or dynamic answers generated through the answer service.

The answer service leverages two distinct knowledge bases. For public information, it queries an existing RAG system on munich.de that already contained citizen information including driver's license procedures. Rather than rebuilding this capability, the team pragmatically reused existing infrastructure. For internal or semi-private information, they built a separate Qdrant vector database fed from Zammad's own knowledge base, which domain experts can edit directly within Zammad. This design allows the driver's licensing authority staff to update procedures and have the AI system automatically incorporate changes without developer intervention.

Both knowledge bases are updated through nightly cron jobs that index new or modified content. This separation of public and internal knowledge reflects practical information governance in government contexts where certain information is freely available online while other information is provided only upon request.

## Implementation Details and LLMOps Practices

The team employed several sophisticated LLMOps techniques that demonstrate maturity beyond basic LLM integration. They use structured output calls with Pydantic models to extract structured objects from LLM responses rather than parsing text, making downstream processing more reliable and maintainable. Their Pydantic models include fields for categorization, confidence scores, reasoning strings, and system prompts. The confidence score is explicitly acknowledged as somewhat of a "black box" since the model self-reports confidence, but the team finds it useful nonetheless. This honest assessment of limitations is refreshing compared to typical vendor claims.

For prompt management, they employ Jinja2 templating to dynamically generate prompts from dictionaries rather than hardcoding logic directly in prompts. This architectural choice supports their scaling strategy: onboarding a new city department should require only creating new configuration files and prompts rather than programming new logic. The presentation included a pull request showing how hardcoded elements were converted to dynamic templating, demonstrating active refinement of the codebase for maintainability.

Observability is provided through LangFuse, which traces all LLM calls throughout the pipeline. A real example showed a ticket requiring 9 seconds to process with visibility into each step and the model's reasoning. The team emphasizes that tracing is critical during development for debugging what the system actually does and equally important in production for monitoring model drift and detecting changes in behavior over time.

## Testing and Evaluation Strategy

The testing approach recognizes different requirements for different components. For RAG retrieval evaluation, they created gold standard datasets mapping queries to expected relevant documents, then automatically compute standard metrics like recall at K and mean reciprocal rank. This enables objective comparison of embedding models by running evaluation scripts with different models and comparing scores.

Evaluating answer quality proves more challenging. They acknowledge using "LLM as judge" approaches where a larger or different LLM evaluates whether generated answers match expected answers from the gold standard dataset. The team explicitly notes the limitations of this approach, using an LLM to check an LLM, and recommends treating results with caution. This works better when a larger model evaluates a smaller model but still requires careful interpretation. The candor about evaluation challenges reflects mature understanding of current limitations rather than overselling capabilities.

Their gold standard dataset includes ticket text, proposed category, and canonical answers for automated verification. This supports both classification accuracy testing and answer quality evaluation.

## Model Selection and Data Privacy

The architecture demonstrates sophisticated thinking about model selection based on data sensitivity. For public use cases where data is already available online, they use Azure OpenAI models for cost-effectiveness and superior performance. For confidential use cases involving citizen data not publicly available, they use private models hosted by a German provider to comply with data protection requirements and avoid US Cloud Act exposure.

This dual-track approach pragmatically balances capability, cost, and compliance. The team was specifically asked about using OpenAI products given data protection challenges, and their response demonstrated clear thinking about when public cloud services are appropriate versus when on-premises or European hosting is required. The confidential pathway was described as "still in progress," indicating ongoing work to operationalize the private model infrastructure.

All development work involving real citizen data was conducted using local models running on workstations in their office rather than cloud services, demonstrating attention to data handling throughout the development lifecycle, not just production deployment.

## Human-in-the-Loop Design

The system is explicitly designed with configurable human oversight. In the initial deployment phase, all AI-generated responses will be posted as drafts requiring human agent approval before being sent to citizens. The configuration allows setting approval requirements category by category, so high-confidence categories might eventually auto-send while others remain human-supervised.

The team plans to collect statistics on approval rates by category during the initial months of operation, then make data-driven decisions about which categories can safely auto-send. The default configuration is no auto-publishing, with selective enablement based on demonstrated performance. This conservative approach prioritizes quality and builds trust incrementally rather than launching with full automation.

An important safeguard prevents repeated AI responses to the same citizen: if a citizen replies to an AI-generated answer, the system assumes escalation is needed and routes to human agents rather than attempting another automated response. This prevents unhelpful loops where AI cannot satisfy the citizen's actual need.

## Scaling Strategy and Reusability

A core design principle is reusability across city departments. The initial implementation for the driver's licensing authority is architected to avoid custom development for each new use case. Onboarding a new department theoretically requires only creating new YAML configuration files specifying Kafka topics and other parameters, writing new prompts, and deploying to a new OpenShift namespace. The configuration controls critical behaviors like whether responses auto-send or require human review.

This configuration-driven approach reflects sophisticated platform thinking rather than building bespoke solutions. However, the team is honest that this is theoretical until validated by actually onboarding a second department. The presentation described the system as "three-quarters finished in development" and not yet live, so the reusability hypothesis remains to be tested in practice.

Before onboarding any new department, they require the department to first adopt Zammad as their ticketing system, recognizing that the standardized ticketing platform is the technical foundation enabling AI automation. They note that simply adopting proper ticketing probably provides more value than AI capabilities, since it improves workflow transparency, ownership tracking, and ticket lifecycle management regardless of automation.

Each new department would undergo a pre-study analyzing their tickets to validate that AI can meaningfully answer inquiries and calculating ROI to ensure deployment costs are justified by efficiency gains. This disciplined approach prevents overextending the system to use cases where automation provides insufficient value.

## Integration with Zammad Built-in AI Features

The team pragmatically leverages Zammad's built-in AI features rather than reinventing capabilities. Zammad includes ticket summarization and writing assistance features that the team enables through their central AI proxy, which manages API keys and usage across the city's AI initiatives. The presenter emphasized that embedding these features directly in the tool where agents work is critical for adoption, since even saving 10-20 seconds through AI summarization gets lost if users must copy-paste content to external tools and back.

Basic features like grammar and spelling correction are treated as table stakes that should simply be enabled. This reflects mature understanding that LLM value comes from seamless integration into existing workflows rather than standalone capabilities requiring context switching.

## Open Source and Public Code Philosophy

The City of Munich follows a "public money, public code" philosophy, making their work open source because it is funded by taxpayers. The project code is already available on GitHub under the IT@M organization, and they actively welcome contributions and reuse by other municipalities. They collaborate with other German cities, though acknowledge that smaller municipalities often lack the Kubernetes and infrastructure capabilities required to run the system.

This openness is commendable and contrasts with many government IT projects that remain proprietary despite public funding. The transparency also enables the scrutiny and balanced assessment recommended in evaluating such case studies.

## Security and Prompt Injection Defenses

Asked about prompt injection defenses, the team outlined a multi-layered approach. First, they note that the limited scope constrains potential damage since a successful injection would only result in a poor answer to the attacker's own inquiry rather than broader system compromise. Second, they use extensive prompt templates and instructions to constrain behavior. Third, they employ specialized small models like Purple Llama specifically designed to detect prompt injections, which can kill requests identified as attacks.

This defense-in-depth approach is reasonable given the threat model. The limited blast radius of successful attacks in this particular use case reduces urgency compared to systems where prompt injection might access sensitive data or cause broader harm.

## Challenges and Honest Limitations

Throughout the presentation, the team demonstrated refreshing honesty about limitations and uncertainties. They acknowledge that LLM-reported confidence scores are somewhat black box but still useful. They recognize that LLM-as-judge evaluation has significant limitations. They admit the reusability architecture is theoretical until proven with a second department. They note that the private model infrastructure for confidential data is still in progress. They candidly state they don't yet know if citizens will get upset about AI-generated responses since the system isn't live.

When asked about handling multi-question emails, the presenter had to pass to colleagues and suggested adding it as a test case rather than claiming existing coverage. Asked about ensuring approval rate data remains meaningful if human supervisors stop paying attention to consistently good AI output, they acknowledged the risk rather than dismissing it, committing to training and doing their best to minimize risks while admitting perfection is unlikely.

This honest, balanced perspective on an in-progress project is valuable for understanding real-world LLMOps beyond polished success stories. The project demonstrates sophisticated architecture and thoughtful LLMOps practices while acknowledging the remaining work and uncertainties.

## Compliance and Transparency

The team is planning for compliance with EU AI Act transparency requirements, intending to disclose AI usage to citizens. They acknowledge this wasn't yet implemented at the time of presentation since the system remained in development. The regulatory landscape for government AI use is evolving, and their awareness of compliance obligations demonstrates responsible development practices.

The question about transparency also revealed interesting dynamics: the presenter noted receiving feedback that since AI tools became widely available, citizen requests themselves appear increasingly AI-generated, making them longer and more frequent. This creates a feedback loop where citizens using AI to write requests drives government to use AI to answer them, an interesting illustration of how LLM adoption reshapes communication patterns in both directions.

## Development Team and Technology Stack

The seven-person AI team at City of Munich is notably small for the scope of work described. The presenter specifically acknowledged two developers in the audience who did all the coding, drawing applause. This lean team demonstrates that sophisticated LLMOps doesn't necessarily require large teams, though the broader IT@M organization of 1,300 employees provides supporting infrastructure.

The technology stack includes Kafka for event streaming, OpenShift for container orchestration, Qdrant for vector storage, LangFuse for observability, Pydantic for structured outputs, Jinja2 for templating, and Zammad as the ticketing platform. For LLM access, they use Azure OpenAI for public use cases and German-hosted private models for confidential data. This represents a pragmatic mix of open source, commercial cloud, and private infrastructure selected for specific purposes rather than dogmatic commitment to any single approach.

## Production Readiness and Next Steps

At the time of presentation, the system was approximately three-quarters complete and not yet deployed to production. The initial deployment plan involves human review of all responses for the first months to gather statistics on approval rates and identify which categories can safely move to auto-sending. This phased rollout demonstrates appropriate caution for a government service directly impacting citizens.

The real test of the reusability architecture will come when onboarding additional city departments beyond the driver's licensing authority. Success there would validate the configuration-driven approach and demonstrate genuine platform value rather than a one-off solution.
