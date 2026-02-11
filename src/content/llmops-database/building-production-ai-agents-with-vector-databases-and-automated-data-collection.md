---
title: "Building Production AI Agents with Vector Databases and Automated Data Collection"
slug: "building-production-ai-agents-with-vector-databases-and-automated-data-collection"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3abb3966980059999310"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:40:05.538Z"
  createdOn: "2024-11-21T13:50:51.568Z"
llmopsTags:
  - "data-integration"
  - "databases"
  - "monitoring"
  - "multi-agent-systems"
  - "openai"
  - "orchestration"
  - "prompt-engineering"
  - "rag"
  - "realtime-application"
  - "reliability"
  - "scalability"
  - "scaling"
  - "semantic-search"
  - "unstructured-data"
  - "vector-search"
industryTags: "consulting"
company: "Devin Kearns"
summary: "Over 18 months, a company built and deployed autonomous AI agents for business automation, focusing on lead generation and inbox management. They developed a comprehensive approach using vector databases (Pinecone), automated data collection, structured prompt engineering, and custom tools through n8n for deployment. Their solution emphasizes the importance of up-to-date data, proper agent architecture, and tool integration, resulting in scalable AI agent teams that can effectively handle complex business workflows."
link: "https://www.youtube.com/watch?v=8N2_iXC16uo"
year: 2023
seo:
  title: "Devin Kearns: Building Production AI Agents with Vector Databases and Automated Data Collection - ZenML LLMOps Database"
  description: "Over 18 months, a company built and deployed autonomous AI agents for business automation, focusing on lead generation and inbox management. They developed a comprehensive approach using vector databases (Pinecone), automated data collection, structured prompt engineering, and custom tools through n8n for deployment. Their solution emphasizes the importance of up-to-date data, proper agent architecture, and tool integration, resulting in scalable AI agent teams that can effectively handle complex business workflows."
  canonical: "https://www.zenml.io/llmops-database/building-production-ai-agents-with-vector-databases-and-automated-data-collection"
  ogTitle: "Devin Kearns: Building Production AI Agents with Vector Databases and Automated Data Collection - ZenML LLMOps Database"
  ogDescription: "Over 18 months, a company built and deployed autonomous AI agents for business automation, focusing on lead generation and inbox management. They developed a comprehensive approach using vector databases (Pinecone), automated data collection, structured prompt engineering, and custom tools through n8n for deployment. Their solution emphasizes the importance of up-to-date data, proper agent architecture, and tool integration, resulting in scalable AI agent teams that can effectively handle complex business workflows."
---

## Overview

This case study documents Devin Kearns' 18-month journey building autonomous AI agents for business process automation. The presenter is not a coder or AI engineer by background, but rather a business operator who sees AI agents as a way to gain leverage in business operations at a fraction of the cost of hiring employees. The content provides practical insights into building production-ready AI agent systems, though it should be noted that this is presented from an individual practitioner's perspective rather than a large-scale enterprise deployment.

The core thesis is that AI agents represent the evolution from simple chatbot interfaces to systems that can actually take actions in business systems—moving beyond the input-output paradigm of tools like ChatGPT to agents that can send emails, update CRMs, schedule meetings, and manage workflows autonomously.

## Platform Selection and Infrastructure

After experimenting with various platforms over 18 months, the team settled on **n8n** as their primary platform for building AI agents. The presenter evaluated multiple alternatives and shares candid assessments:

- **Crew AI**: Popular but requires coding knowledge and has a steep learning curve
- **AutoGen (Microsoft)**: Also requires coding, and despite improvements, experienced brittleness and breakage
- **Zapier Central**: Conceptually heading in the right direction but has an unintuitive approach that treats agents like automations with embedded AI rather than virtual assistants
- **VoiceFlow and Stack AI**: Traditional chatbot builders now adding agent capabilities
- **Relevance AI**: Intuitive platform but experiences reliability issues; originated as a vector database provider
- **Mind Studio**: Simple no-code platform, was one of their early experiments

The reasons cited for choosing n8n include its visual workflow builder that makes agent architecture intuitive, no-code capabilities, cost-effectiveness, LangChain integration through advanced AI nodes, and the ability to self-host for data security. The platform provides modules for AI agents, LLM chains, question-answer chains, summarization, text classification, and vector store integrations.

For vector storage, the team uses **Pinecone** as their primary vector database. They evaluated alternatives including Supabase but found Pinecone easiest to set up, highly reliable (with failures typically being user error), and cost-effective—essentially free up to their usage levels after months of operation. The vector database is crucial for implementing RAG (Retrieval Augmented Generation) to give agents contextual awareness about business operations.

## Key Learnings and Technical Approach

### Data as Foundation

The presenter emphasizes that data quality and freshness are paramount for agent effectiveness. The analogy used is employee onboarding—just as a human employee needs to be trained and given context about the business, agents need comprehensive and current data to operate effectively.

A critical insight is that one-time data loading is insufficient. Building a vector database and populating it with six months of historical data leaves the agent outdated within weeks. The solution is building automated data collection workflows that continuously update the vector database in near real-time. Examples include:

- Emails sent and received immediately saved to the database
- Calendar events and their details captured upon creation
- New projects, tasks, leads, and hires logged automatically
- All business interactions and information flows captured

This requires building separate automation workflows dedicated solely to data collection, running in parallel with the agent workflows themselves.

### Prompt Engineering Framework

The presenter admits initial skepticism about prompt engineering, viewing it as potentially "grifty" given the marketing around prompt packs and templates. However, production experience revealed that structured prompting is essential for reliable agent behavior.

Without proper prompting, agents exhibit problematic failure modes. The worst case isn't complete failure (which is easy to diagnose) but intermittent failure—working 60-70% of the time, succeeding during testing, then failing on edge cases in production due to prompts that didn't account for specific scenarios.

Their prompt template structure includes:

- **Objective**: A clear, broad statement of the agent's role (e.g., "Your role is to manage my inbox. You must accurately categorize every email I receive.")
- **Context**: Details about whose inbox, volume expectations, types of emails expected, categorization taxonomy, and priority levels
- **Tools Available**: Explicit description of what tools can be used for what purposes
- **Instructions**: Detailed step-by-step guidance, similar to SOPs for human employees
- **Output Requirements**: Whether the agent needs to output JSON, trigger other tools, or produce no output at all
- **Examples**: Described as the "lynchpin" that makes everything work—without examples, success rates hover around 90%; with plentiful examples, success approaches 99.9%

The presenter stresses that examples should cover various scenarios the agent might encounter, showing the complete decision chain from input to tool selection to output.

### Tool Architecture

Tools are what transform LLMs into agents by giving them agency to take actions. The presenter highlights n8n's capability to build custom workflows that serve as tools, creating modular, reusable components.

For example, their "email actions tool" is a complete n8n workflow that handles all email-related operations: sending, replying, marking as read/unread, adding labels, deleting, trashing, and retrieving emails. Rather than defining each operation separately, the workflow accepts parameters and routes to the appropriate action. This creates a more maintainable architecture where a single tool handles an entire domain of operations.

A live demonstration shows the agent receiving a Telegram message requesting to "send an email to Andrew and schedule a meeting with him for tomorrow at 2." The agent interprets this, accesses the Pinecone database for contact information, uses window buffer memory for conversation context, calls the OpenAI chat model for reasoning, and triggers the email actions tool. The presenter notes that there's a slight learning curve in how to phrase requests—the agent interpreted the request as sending an email to ask about meeting availability rather than directly booking.

### Integration Philosophy

The approach to integrations differs from traditional automation thinking. Rather than designing precise automation workflows with specific data transformations, the presenter advocates thinking about agents as human employees needing platform access.

This means providing broad API scopes rather than narrow permissions. For platforms like Google, Microsoft, or Slack, APIs have granular scopes (read-only, write, delete, etc.). The recommendation is to err on the side of providing comprehensive access so agents can handle any required action within their domain.

Three integration considerations are highlighted:

- Which platforms would you sign up a new employee for to complete their job?
- What data does the agent need to complete its tasks?
- What events in the tech stack should trigger agent actions?

### Architecture and Multi-Agent Systems

The architecture section represents what the presenter describes as their "biggest learning" and "huge unlock." The framework involves mapping job functions to workflows to tasks, then assigning specialized agents to handle individual workflows.

Using lead generation as an example, rather than trying to build one super-agent that handles everything, the architecture deploys four specialized agents:

- **Inbox Management Agent**: Monitors the inbox, categorizes emails, and routes interested leads to the lead qualification agent
- **Lead Qualification Agent**: Responds to lead queries, asks qualifying questions, checks CRM data, views calendar availability, and books appointments with qualified prospects
- **Lead Enrichment Agent**: Triggered when new leads enter the CRM; searches Google, scrapes LinkedIn and websites, summarizes information, assigns quality scores, and updates the CRM
- **Lead Nurturing Agent**: Runs on a schedule (e.g., daily morning trigger), identifies leads without recent contact, drafts personalized emails, finds relevant content from Google Drive, and sends follow-up messages

The key insight is that these agents don't need a centralized "commander" or group chat architecture as some frameworks promote. Each agent handles one workflow, triggered by one or two specific events. The inbox agent triggers on new emails; lead nurturing runs on a schedule; lead enrichment fires on new CRM entries. The only cross-agent connection needed is from inbox management to lead qualification when interested leads are identified.

This simplified architecture reduces complexity and failure points compared to frameworks that emphasize complex multi-agent coordination.

## Business Philosophy and Future Outlook

The presenter frames AI agents as the next evolution in business leverage. Historical technological innovations have provided leverage; AI agents represent the next major frontier. The business case centers on decreasing the cost of scaling while increasing margins.

Rather than asking "who do I need to hire?" the new question becomes "can we build an AI agent or team of agents to fulfill this job?" Examples include podcast booking outreach, recruiting functions, and customer success roles. The vision is that agents handle maintenance and routine tasks while human employees focus on relationship building, strategy, and high-value work.

It's worth noting that while the presenter is enthusiastic about this approach, the content is primarily experiential rather than quantitatively measured. Specific metrics on cost savings, success rates, or business outcomes are not provided. The framework and learnings are valuable, but readers should validate approaches in their own contexts.

## Technical Caveats and Considerations

The presentation acknowledges several challenges:

- Platform stability varies significantly; even favored tools like Relevance AI experience breakage
- Agent behavior can be unpredictable on edge cases not covered in examples
- There's a learning curve in how users phrase requests to agents
- Data security concerns are addressed through self-hosting capabilities in n8n
- The space is rapidly evolving, with frameworks and tools potentially becoming obsolete

The 18-month timeframe provides useful longitudinal perspective, as the presenter notes significant improvements in agent capabilities over this period while also experiencing the churn of trying and abandoning multiple platforms.