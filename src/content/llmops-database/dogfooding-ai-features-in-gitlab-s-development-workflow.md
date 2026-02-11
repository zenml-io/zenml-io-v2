---
title: "Dogfooding AI Features in GitLab's Development Workflow"
slug: "dogfooding-ai-features-in-gitlab-s-development-workflow"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3c5165737b028783774c"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:39:13.035Z"
  createdOn: "2024-11-21T13:57:37.952Z"
llmopsTags:
  - "api-gateway"
  - "cicd"
  - "code-generation"
  - "code-interpretation"
  - "continuous-deployment"
  - "continuous-integration"
  - "devops"
  - "document-processing"
  - "documentation"
  - "error-handling"
  - "microsoft-azure"
  - "monitoring"
  - "prompt-engineering"
  - "reliability"
  - "scalability"
  - "security"
  - "semantic-search"
  - "system-prompts"
industryTags: "tech"
company: "Gitlab"
summary: "GitLab shares their experience of integrating and testing their AI-powered features suite, GitLab Duo, within their own development workflows. The case study demonstrates how different teams within GitLab leverage AI capabilities for various tasks including code review, documentation, incident response, and feature testing. The implementation has resulted in significant efficiency gains, reduced manual effort, and improved quality across their development processes."
link: "https://about.gitlab.com/blog/2024/05/20/developing-gitlab-duo-how-we-are-dogfooding-our-ai-features/"
year: 2024
seo:
  title: "Gitlab: Dogfooding AI Features in GitLab's Development Workflow - ZenML LLMOps Database"
  description: "GitLab shares their experience of integrating and testing their AI-powered features suite, GitLab Duo, within their own development workflows. The case study demonstrates how different teams within GitLab leverage AI capabilities for various tasks including code review, documentation, incident response, and feature testing. The implementation has resulted in significant efficiency gains, reduced manual effort, and improved quality across their development processes."
  canonical: "https://www.zenml.io/llmops-database/dogfooding-ai-features-in-gitlab-s-development-workflow"
  ogTitle: "Gitlab: Dogfooding AI Features in GitLab's Development Workflow - ZenML LLMOps Database"
  ogDescription: "GitLab shares their experience of integrating and testing their AI-powered features suite, GitLab Duo, within their own development workflows. The case study demonstrates how different teams within GitLab leverage AI capabilities for various tasks including code review, documentation, incident response, and feature testing. The implementation has resulted in significant efficiency gains, reduced manual effort, and improved quality across their development processes."
---

## Overview

This case study from GitLab documents how the company internally uses its own AI-powered feature suite, GitLab Duo, across various engineering and product teams. The practice of "dogfooding"—using one's own products—is a common approach in tech companies, and GitLab applies this to test and demonstrate the value of their AI capabilities before and alongside customer adoption. The case study is part of a broader blog series aimed at showcasing how GitLab creates, tests, and deploys AI features integrated throughout the enterprise DevSecOps platform.

It is important to note that this case study is inherently promotional, coming directly from GitLab's marketing and product teams. While it provides useful insights into how AI tools can be integrated into developer workflows, readers should approach the claimed benefits with appropriate skepticism, as specific quantitative metrics are largely absent from the discussion.

## GitLab Duo Feature Suite

GitLab Duo encompasses multiple AI-powered capabilities designed to assist developers and other team members throughout the software development lifecycle. The key features highlighted in this case study include:

- **Code Suggestions**: AI-powered code completion and generation that works across multiple programming languages including JavaScript, Ruby, Python, and Rust
- **Duo Chat**: A conversational AI interface for answering coding questions, explaining code, drafting content, and providing general assistance
- **Merge Request Summarization**: Automated summarization of code changes and merge request discussions
- **Code Explanation**: AI-generated explanations of code snippets and external codebases

## Production Use Cases and Integration Patterns

### Code Review and Development Workflows

The case study describes how Staff Backend Developer Gosia Ksionek uses GitLab Duo to streamline code review processes. The AI summarizes merge requests, making it faster to review code changes, and answers coding questions while explaining complex code snippets. This represents a common LLMOps pattern where AI is integrated directly into developer tooling to reduce cognitive load during code review.

Senior Frontend Engineer Peter Hegman reportedly uses Code Suggestions for full-stack JavaScript and Ruby development, demonstrating the tool's ability to work across different programming languages and frameworks. This multi-language support is important for production AI tools in heterogeneous development environments.

### Documentation and Content Generation

Several use cases focus on using LLMs for documentation and content generation tasks:

Taylor McCaslin, Group Manager for the Data Science Section, used GitLab Duo to create documentation for GitLab Duo itself—a meta use case that the company highlights as demonstrating the tool's utility. Staff Technical Writer Suzanne Selhorn used the AI to optimize documentation site navigation by providing a workflow-based ordering of pages and drafting Getting Started documentation more quickly than manual approaches.

Senior Product Manager Amanda Rueda uses GitLab Duo to craft release notes, employing specific prompts like requesting "a two sentence summary of this change, which can be used for our release notes" with guidance on tone, perspective, and value proposition. This prompt engineering approach is a practical example of how production AI tools can be customized for specific content generation tasks through carefully crafted prompts.

### Administrative and Communication Tasks

The case study highlights non-coding applications of the AI tools. Engineering Manager François Rosé uses Duo Chat for drafting and refining OKRs (Objectives and Key Results), providing example prompts that request feedback on objective and key result formulations. Staff Frontend Engineer Denys Mishunov used Chat to formulate text for email templates used in technical interview candidate communications.

These use cases demonstrate that LLM-powered tools in production environments often extend beyond purely technical tasks into administrative and communication workflows.

### Incident Response and DevOps

Staff Site Reliability Engineer Steve Xuereb employs GitLab Duo to summarize production incidents and create detailed incident reviews. He also uses Chat to create boilerplate `.gitlab-ci.yml` files, which reportedly speeds up workflow significantly. The Code Explanation feature provides detailed answers during incidents, enhancing productivity and understanding of the codebase during time-critical situations.

This incident response use case is particularly relevant to LLMOps, as it demonstrates AI assistance in operational contexts where speed and accuracy are critical.

### Testing and Quality Assurance

Senior Developer Advocate Michael Friedrich uses GitLab Duo to generate test source code for CI/CD components, sharing this approach in talks and presentations. The case study mentions that engineers test new features like Markdown support in Code Suggestions internally before release, using GitLab Duo for writing blog posts and documentation in VS Code.

### External Codebase Understanding

The `/explain` feature is highlighted as particularly useful for understanding external projects imported into GitLab. This capability was demonstrated during a livestream with open source expert Eddie Jaoude, showcasing how AI can help developers quickly understand unfamiliar codebases, dependencies, and open source projects.

## Claimed Benefits and Critical Assessment

GitLab claims several benefits from integrating GitLab Duo:

- Automation of tasks that previously required manual intervention
- Decreased time for documentation and summarization
- Higher quality code with fewer errors and faster debugging
- Streamlined administrative tasks

However, these claims warrant scrutiny. The case study provides anecdotal evidence and user testimonials but lacks specific quantitative metrics such as percentage improvements in cycle time, reduction in bugs, or time savings measurements. The mention of an "AI Impact analytics dashboard" suggests GitLab is developing metrics capabilities, but concrete data from this dashboard is not provided in this case study.

The self-referential nature of the case study—a company promoting its own products using internal testimonials—means that the evidence should be considered accordingly. Real-world enterprise adoption and independent benchmarks would provide more reliable validation of the claimed benefits.

## Technical Implementation Considerations

While the case study does not delve deeply into technical architecture, several LLMOps-relevant aspects can be inferred:

- **IDE Integration**: Code Suggestions works within VS Code and presumably other IDEs, requiring client-side integration and real-time communication with AI services
- **Multi-language Support**: The system handles multiple programming languages (JavaScript, Ruby, Python, Rust, YAML for CI/CD configurations)
- **Context Awareness**: Features like merge request summarization and code explanation require context from the GitLab platform itself
- **Prompt Engineering**: The examples show how users craft specific prompts for desired outputs, particularly for content generation tasks

The mention of validating and testing AI models at scale in related blog posts suggests GitLab has developed internal infrastructure for model evaluation, though details are not provided in this specific case study.

## Conclusion

This case study provides a useful window into how a major DevOps platform company integrates AI capabilities throughout their internal workflows. The breadth of use cases—from code generation to documentation to incident response—demonstrates the versatility of LLM-powered tools in production software development environments. However, the promotional nature of the content and absence of quantitative metrics mean the claimed benefits should be viewed as indicative rather than definitive. The case study is most valuable as a catalog of potential AI integration points in software development workflows rather than as proof of specific productivity improvements.