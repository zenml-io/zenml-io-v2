---
title: "Building a Secure AI Assistant for Visual Effects Artists Using Amazon Bedrock"
slug: "building-a-secure-ai-assistant-for-visual-effects-artists-using-amazon-bedrock"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67a8c0d5330d6923ca92e0e3"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:00:03.893Z"
  createdOn: "2025-02-09T14:51:01.782Z"
llmopsTags:
  - "chatbot"
  - "document-processing"
  - "question-answering"
  - "structured-output"
  - "unstructured-data"
  - "legacy-system-integration"
  - "rag"
  - "embeddings"
  - "prompt-engineering"
  - "semantic-search"
  - "vector-search"
  - "error-handling"
  - "system-prompts"
  - "serverless"
  - "api-gateway"
  - "microservices"
  - "documentation"
  - "security"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "elasticsearch"
  - "langchain"
  - "amazon-aws"
  - "anthropic"
industryTags: "media-entertainment"
company: "Untold Studios"
summary: "Untold Studios developed an AI assistant integrated into Slack to help their visual effects artists access internal resources and tools more efficiently. Using Amazon Bedrock with Claude 3.5 Sonnet and a serverless architecture, they created a natural language interface that handles 120 queries per day, reducing information search time from minutes to seconds while maintaining strict data security. The solution combines RAG capabilities with function calling to access multiple knowledge bases and internal systems, significantly reducing the support team's workload."
link: "https://aws.amazon.com/blogs/machine-learning/how-untold-studios-empowers-artists-with-an-ai-assistant-built-on-amazon-bedrock?tag=soumet-20"
year: 2025
seo:
  title: "Untold Studios: Building a Secure AI Assistant for Visual Effects Artists Using Amazon Bedrock - ZenML LLMOps Database"
  description: "Untold Studios developed an AI assistant integrated into Slack to help their visual effects artists access internal resources and tools more efficiently. Using Amazon Bedrock with Claude 3.5 Sonnet and a serverless architecture, they created a natural language interface that handles 120 queries per day, reducing information search time from minutes to seconds while maintaining strict data security. The solution combines RAG capabilities with function calling to access multiple knowledge bases and internal systems, significantly reducing the support team's workload."
  canonical: "https://www.zenml.io/llmops-database/building-a-secure-ai-assistant-for-visual-effects-artists-using-amazon-bedrock"
  ogTitle: "Untold Studios: Building a Secure AI Assistant for Visual Effects Artists Using Amazon Bedrock - ZenML LLMOps Database"
  ogDescription: "Untold Studios developed an AI assistant integrated into Slack to help their visual effects artists access internal resources and tools more efficiently. Using Amazon Bedrock with Claude 3.5 Sonnet and a serverless architecture, they created a natural language interface that handles 120 queries per day, reducing information search time from minutes to seconds while maintaining strict data security. The solution combines RAG capabilities with function calling to access multiple knowledge bases and internal systems, significantly reducing the support team's workload."
---

## Overview

Untold Studios is a tech-driven creative studio specializing in high-end visual effects and animation. The company faced a common enterprise challenge: how to enable diverse teams of artists with varying levels of technical expertise to efficiently access internal resources, tools, and workflows while maintaining strict data security requirements. Their solution was to build "Untold Assistant," an AI-powered natural language interface integrated directly into Slack, leveraging Amazon Bedrock and Anthropic's Claude 3.5 Sonnet model.

The case study is notable for its practical, production-focused approach to deploying LLMs in an enterprise setting. Rather than building complex custom infrastructure, Untold Studios leveraged managed AWS services and pre-built connectors to accelerate development while maintaining control over their data. The result is a system that handles up to 120 queries per day, with 10-20% of those queries triggering additional tool calls like image generation or knowledge base search.

## Architecture and Infrastructure

The solution is built on a serverless AWS architecture, which provides scalability and responsiveness without the overhead of managing servers. The key AWS services used include:

- **Amazon Bedrock** for hosting Claude 3.5 Sonnet (NLP) and Stable Diffusion 3 (image generation)
- **AWS Lambda** for workflow execution
- **Amazon API Gateway** for the Slack event handler
- **Amazon S3** for unstructured data storage
- **Amazon DynamoDB** for persistent storage and logging

The architecture follows a two-function Lambda pattern to meet Slack's 3-second acknowledgment requirement. When an incoming event arrives from Slack via API Gateway, the first Lambda function (with reserved capacity) quickly acknowledges the event and forwards the request to a second Lambda function for processing without time restrictions. Importantly, they chose to invoke the second function directly rather than using Amazon SNS or SQS as an intermediary, prioritizing low latency over loose coupling.

## Slack Integration as the User Interface

A key decision in this implementation was to use Slack as the primary user interface rather than building a custom frontend. This approach offers several practical advantages for production deployment:

- Artists already use Slack throughout their workday, eliminating context switching
- Slack provides built-in features like message threads for complex queries, emoji reactions for feedback, and file sharing
- The system uses emoji reactions (gear, check mark, X) for immediate visual feedback on query status
- Users can interact via direct messages or by mentioning the assistant in channels

This decision reflects a pragmatic approach to LLMOps: leveraging existing infrastructure and user habits rather than requiring adoption of new tools. It's worth noting that this approach does create a dependency on Slack's platform and API, which could be a consideration for other organizations.

## Retrieval Augmented Generation (RAG) Implementation

The RAG implementation is a highlight of this case study, demonstrating effective use of managed connectors to reduce development complexity. The team uses Amazon Bedrock's pre-built connectors for:

- **Confluence** for internal documentation and knowledge bases
- **Salesforce** for customer and business data

For data sources without pre-built connectors, they export content to Amazon S3 and use the S3 connector. A notable example is their asset library, where they export pre-chunked asset metadata to S3 and let Amazon Bedrock handle embeddings, vector storage, and search automatically.

This approach significantly decreased development time and complexity by eliminating the need to build custom vector store integrations and embedding pipelines. The trade-off is less control over the embedding and retrieval process, but for their use case, the speed of development was more valuable than fine-grained control.

Access to data sources is controlled through a tool-based permission system, where every tool encapsulates a data source and the LLM's access to tools is restricted based on user roles and clearance levels.

## Function Calling for Extensibility

The system uses Claude's function calling capabilities to extend the assistant's abilities beyond text generation. Rather than implementing a complex agentic loop, they opted for a single-pass function call approach to keep things "simple and robust." However, in certain cases, the function itself may use the LLM internally to process and format data for the end user.

The implementation uses a Python base class pattern (AiTool) that enables automatic discovery and registration of new tools. To add a new capability, developers simply create a new class that inherits from AiTool, and the system automatically:

- Extracts the function specification from code and docstrings
- Adds the specification to LLM requests when appropriate
- Respects user role restrictions (EXCLUSIVE_ACCESS_DEPARTMENTS)
- Provides progress feedback to users via Slack

Current capabilities include knowledge base queries, internal asset library search, image generation via Stable Diffusion, and user-specific memory management. The modular architecture allows for rapid addition of new tools as needs arise.

The team explicitly chose not to use frameworks like LangChain, opting instead for a "lightweight, custom approach tailored to [their] specific needs." This decision allowed them to maintain a smaller footprint and focus on essential features.

## User Memory and Personalization

A notable production feature is the user memory system. Users can tell the assistant to remember preferences like "Keep all your replies as short as possible" or "If I ask for code it's always Python." These preferences are stored in DynamoDB and added to the context for every subsequent request from that user.

User management maps Slack user IDs to an internal user pool in DynamoDB (designed to be compatible with Amazon Cognito for future migration). This enables personalized capabilities based on each user's role and clearance level.

## Logging, Monitoring, and Analytics

For production observability, the system uses:

- **CloudWatch** integration with Lambda for performance and error tracking
- **Direct Slack notifications** for critical errors, enabling immediate awareness
- **DynamoDB logging** for all queries and tool invocations

The comprehensive logging provides a rich dataset for analyzing usage patterns and optimizing performance. The team plans to use this data proactively: by analyzing saved queries using Amazon Titan Text Embeddings and agglomerative clustering, they can identify semantically similar questions. When cluster frequency exceeds a threshold (e.g., more than 10 similar questions from different users in a week), they enhance their knowledge base or update onboarding materials to address common queries.

## Security Considerations

The case study emphasizes that security and control are "paramount" in their AI adoption strategy. By keeping all data within the AWS ecosystem, they eliminated dependencies on third-party AI tools and associated data privacy risks. The tool-based permission system ensures users only access data appropriate to their role.

It's worth noting that while this approach provides control over data residency and access, it still relies on Amazon Bedrock's managed service, meaning Anthropic's Claude model is processing the queries. Organizations with stricter data handling requirements may need to consider self-hosted model options.

## Production Results and Impact

The Untold Assistant currently handles up to 120 queries per day, with 10-20% triggering additional tool calls. The team reports that for new users unfamiliar with internal workflows, the assistant can reduce information retrieval time from minutes to seconds by serving as a "virtual member of the support team."

Reported benefits include:

- Enhanced discoverability of previously underutilized internal resources
- Significant reduction in time spent searching for information
- Streamlined access to multiple internal systems from a single entry point
- Reduced load on support and technology teams
- Faster adoption of new technologies through an accessible interface

The development timeline is also notable: using managed services and pre-built connectors reduced development from "months to weeks."

## Future Development Plans

The team has specific technical improvements planned:

- **Render job error analysis**: Automatically fetching logs from recent renders, analyzing errors using Claude, and providing explanations using both internet resources and internal knowledge bases
- **Proactive knowledge base enhancement**: Using embedding clustering to identify common questions and update documentation before users need to ask

These plans demonstrate a mature approach to LLMOps, where production systems are continuously improved based on real usage data.

## Balanced Assessment

This case study presents a practical, well-executed production deployment of LLM technology. The strengths include pragmatic architecture decisions (Slack as UI, managed connectors over custom RAG), a modular design for extensibility, and thoughtful attention to security and user permissions.

However, as with any vendor-authored case study (this was published on the AWS blog with AWS employees as co-authors), the presented results should be considered with appropriate skepticism. The usage metrics (120 queries/day, time savings) are self-reported without detailed methodology. The claim that development was reduced from "months to weeks" is difficult to verify and may not translate to other organizations with different requirements.

The single-pass function calling approach, while pragmatic, limits the system's ability to handle complex multi-step tasks that would benefit from agentic reasoning. For organizations with more complex workflow automation needs, additional development would be required.

Overall, this case study provides a useful template for organizations looking to deploy LLM-powered assistants using AWS managed services, with realistic scope and practical architectural patterns.