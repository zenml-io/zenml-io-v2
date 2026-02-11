---
title: "Incremental LLM Adoption Strategy in Email Processing API Platform"
slug: "incremental-llm-adoption-strategy-in-email-processing-api-platform"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "679200c38d878e66766015c8"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:57:09.615Z"
  createdOn: "2025-01-23T08:41:39.974Z"
llmopsTags:
  - "data-analysis"
  - "data-cleaning"
  - "regulatory-compliance"
  - "high-stakes-application"
  - "multi-agent-systems"
  - "prompt-engineering"
  - "cost-optimization"
  - "latency-optimization"
  - "fallback-strategies"
  - "fine-tuning"
  - "kubernetes"
  - "cicd"
  - "monitoring"
  - "fastapi"
  - "postgresql"
  - "redis"
  - "vllm"
  - "wandb"
  - "openai"
  - "google-gcp"
  - "meta"
  - "microsoft-azure"
industryTags: "tech"
company: "Nylas"
summary: "Nylas, an email/calendar/contacts API platform provider, implemented a systematic three-month strategy to integrate LLMs into their production systems. They started with development workflow automation using multi-agent systems, enhanced their annotation processes with LLMs, and finally integrated LLMs as a fallback mechanism in their core email processing product. This measured approach resulted in 90% reduction in bug tickets, 20x cost savings in annotation, and successful deployment of their own LLM infrastructure when usage reached cost-effective thresholds."
link: "https://www.youtube.com/watch?v=ktatsqlAjHs&list=PLlcxuf1qTrwDDRUmXJA-x-uqp-qutke_x&index=16"
year: 2023
seo:
  title: "Nylas: Incremental LLM Adoption Strategy in Email Processing API Platform - ZenML LLMOps Database"
  description: "Nylas, an email/calendar/contacts API platform provider, implemented a systematic three-month strategy to integrate LLMs into their production systems. They started with development workflow automation using multi-agent systems, enhanced their annotation processes with LLMs, and finally integrated LLMs as a fallback mechanism in their core email processing product. This measured approach resulted in 90% reduction in bug tickets, 20x cost savings in annotation, and successful deployment of their own LLM infrastructure when usage reached cost-effective thresholds."
  canonical: "https://www.zenml.io/llmops-database/incremental-llm-adoption-strategy-in-email-processing-api-platform"
  ogTitle: "Nylas: Incremental LLM Adoption Strategy in Email Processing API Platform - ZenML LLMOps Database"
  ogDescription: "Nylas, an email/calendar/contacts API platform provider, implemented a systematic three-month strategy to integrate LLMs into their production systems. They started with development workflow automation using multi-agent systems, enhanced their annotation processes with LLMs, and finally integrated LLMs as a fallback mechanism in their core email processing product. This measured approach resulted in 90% reduction in bug tickets, 20x cost savings in annotation, and successful deployment of their own LLM infrastructure when usage reached cost-effective thresholds."
---

## Overview

Nylas is a company that develops APIs to help businesses connect their application backends to email, calendar, and contact data. They serve over 1,000 businesses who use their platform to access valuable data and enable workflows or automation to improve customer experiences. The machine learning team at Nylas, led by Nadia, focuses on developing intelligence functions that help identify specific information within emails or identify email types to trigger workflows. This case study covers their journey from not using generative AI to successfully integrating it across their Extract AI product family.

## Strategic Approach to LLM Adoption

The presenter emphasized the importance of having a simple, achievable strategy when introducing generative AI to an organization. This approach served two purposes: it helped gain approval from leadership (who needed to accept roadmap adjustments) and it helped the team gain confidence with the technology. The strategy was designed to be completed in three months.

The team started by assessing their baseline—recognizing that team members had varying levels of experience with generative AI, from none to regular users. They conducted internal knowledge sharing sessions and hands-on labs (including GCP labs) to ensure everyone started from the same foundation. This assessment informed the creation of achievable goals with a realistic timeline.

A critical element was conducting a cost-benefit analysis and long-term cost comparisons, which provided the necessary justification for leadership to approve capacity allocation for this initiative. Rather than jumping straight to production use cases, the team set up intermediate milestones: first using LLMs in development workflows, then in annotation tools, and finally in production systems.

## Spike Sprint for Model Evaluation

Before diving into milestone projects, the team conducted a two-week spike sprint to test multiple models—different versions and sizes. This helped narrow down the options for subsequent development. They evaluated OpenAI, Mistral, Meta, and Google models. Notably, they found Anthropic models to be almost twice as expensive for their use case, leading to its removal from consideration despite liking the model quality. This highlights an important LLMOps consideration: cost efficiency often trumps raw model capability when scaling to production.

## Use Case 1: Multi-Agent System for Development Automation

The first integration targeted what the team called "toil"—repetitive tasks that engineers struggle to volunteer for. They identified two specific tasks: updating and generating new regex patterns based on ground truth data flow, and updating configuration files with allow-lists. Previously, one engineer spent 2-3 hours weekly on these tasks.

The solution was a cron job triggering GitHub Actions workflows that open pull requests automatically. The implementation uses a multi-agent system based on the MetaGPT workflow, featuring three roles:

- **Developer Agent** (LLM-based): Checks ground truth for new data and proposes changes
- **Reviewer Agent** (LLM-based): Reviews proposed changes and decides if they're sufficient or need iteration
- **QA Tester** (Script-based): Runs integration tests and unit tests

The system includes a budget mechanism to limit iterations and prevent infinite loops. When a new iteration starts, the developer checks for new data, proposes changes, which pass to the QA tester. Test results and proposed changes then go to the reviewer, who either approves (opening a PR) or requests another iteration with specific feedback.

An illustrative example showed the reviewer identifying that a proposed regex pattern was too broad and could lead to false positives, suggesting specific improvements and recommending additional tests. This demonstrates the quality control possible with multi-agent approaches.

**Results**: Over 200 PRs opened, with approximately 50 merged (roughly 25% merge rate). The ~75% not merged fell into two categories: PRs where the LLM agents lacked full context (e.g., customer-specific exceptions or product requirements), and approximately 10% where LLMs hallucinated. Human review provided the necessary context layer. The system moved from weekly to daily updates, reducing latency by 7x. Time savings translated to approximately 2.5 hours per week per engineer, or about $9,000 annually per engineer—potentially scaling to $50,000+ across multiple similar tasks.

## Use Case 2: Annotation System Transformation

The second milestone addressed annotation quality, a critical concern for ML teams. The existing "blind annotation system" had two contractors independently annotate the same data, with discrepancies requiring unified resolution. While effective at reducing annotation errors, this approach doubled costs and time.

The initial plan was to use LLMs within the blind annotation system alongside one contractor. However, the LLM-based system performed so well that they completely replaced the blind annotation approach.

**Technical implementation**: GPT-4 was the model of choice. Analysis showed the 99th percentile of prompt input size was below 5,000 tokens, with average output below 1,000 tokens (annotations being relatively uniform in size). This resulted in approximately $0.22 per annotation.

**Cost comparison**:
- LLM system: $0.22 per annotation × 5,000 emails = $1,100
- Blind annotation: ~$1 per annotation × 10,000 (5,000 × 2) = $10,000

**Time comparison** (perhaps more impactful):
- LLM system: Script-parallelizable, completed in hours (~3.5 hours with four parallel processes)
- Blind annotation: ~5 minutes per annotation + unification discussions, requiring 200+ hours with four contractors = weeks of work

The time advantage proved crucial for iteration—when teams need to add fields, change definitions, or redo annotations mid-project, the LLM approach prevents project delays. When GPT-4 Turbo launched, costs dropped further to $0.10 per annotation.

**Final results**: 20x cost reduction and 60x speed improvement compared to the previous system.

## Use Case 3: LLM Fallback Strategy in Production

After the first two milestones, the team gained clarity on production integration. They determined that LLMs could not replace their existing Extract AI system due to latency and cost constraints. Their system processes emails in under half a second—LLM inference typically takes seconds, which customers wouldn't accept. Additionally, processing 20-30 million emails monthly with LLMs at production cost would make it impossible to price the product at fractions of a dollar per API call.

Instead, they implemented an LLM fallback strategy. Extract AI uses a library of strategies leveraging statistics and insights from email templates. When a new email arrives, the system selects appropriate strategies based on expected fields. Crucially, the system can estimate its own confidence in predictions. When confidence is low, the email is reprocessed with LLMs, and those results are sent to customers.

**Results**: Only 1-3% of emails are processed with LLMs monthly, keeping costs reasonable without requiring price increases. More surprisingly, bug tickets dropped by over 90%—from over 400 tickets to a manageable number. Previously, minor discrepancies between returned data and email content generated bug tickets requiring triage and investigation time. The LLM fallback handles edge cases that previously became support burden, freeing engineering time for feature development.

## Self-Hosting Infrastructure

Recognizing LLM costs scale linearly with API provider usage, the team built self-hosting infrastructure. They performed break-even analysis comparing API costs (linear growth) versus self-hosting (higher initial cost but lower per-call cost at scale).

Two deployment options were considered:
- **Quick setup via cloud provider** (GCP Vertex AI Model Garden): Deploy models in under 5 minutes with managed infrastructure, but no autoscaling and fixed hardware
- **Framework-based deployment** (using Llama CPP with Kubernetes): More flexible, supports autoscaling, allows model swapping within the same infrastructure, but requires more build effort

They chose the Llama CPP framework approach for flexibility. The infrastructure uses G2 standard instances on GCP with L4 NVIDIA GPUs and 80GB bootstrap for CUDA, costing approximately $500 per node per month.

**Break-even calculation example**: With $1,000/month infrastructure (two redundant nodes) and $0.10 per API call (GPT Turbo pricing), break-even occurs at 10,000 API calls. Beyond this, self-hosting becomes more economical—50,000 API calls would cost $5,000 via API versus $2,000 self-hosted, saving $3,000 monthly.

**Architecture components**:
- Extract AI makes API calls to inference service
- Inference service queries Prompt DB for correct prompts (supporting multiple use cases)
- Model loaded at initialization from model registry (supporting easy model swapping)
- Feature storage supports fine-tuned model deployment

This infrastructure enables the team to use LLMs more freely, knowing increased usage benefits the company economically rather than increasing costs.

## Additional Developments

The team also developed an "LLM Anonymizer" internal tool for removing PII from emails before LLM processing, and they are currently expanding Extract AI to other verticals while exploring fine-tuned models.

## Key Takeaways and Leadership Perspective

The presenter emphasized starting with smaller use cases rather than jumping to production-grade implementations. These smaller projects yielded surprising results with lower failure risk, building team confidence and demonstrating value to leadership. The approach of incremental milestones with measurable outcomes proved effective for getting organizational buy-in and maintaining momentum. The feedback from leadership was positive, with results justifying the mid-quarter roadmap adjustments and capacity reallocation to generative AI initiatives.