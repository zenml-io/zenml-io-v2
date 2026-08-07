---
title: "Scaling User Feedback Analysis with LLM-Powered Classification and Clustering"
slug: "scaling-user-feedback-analysis-with-llm-powered-classification-and-clustering"
draft: false
llmopsTags:
  - "customer-support"
  - "classification"
  - "data-analysis"
  - "data-cleaning"
  - "chatbot"
  - "embeddings"
  - "prompt-engineering"
  - "few-shot"
  - "semantic-search"
  - "vector-search"
  - "agent-based"
  - "multi-agent-systems"
  - "mcp"
  - "langchain"
  - "fastapi"
  - "chromadb"
  - "pinecone"
  - "qdrant"
  - "monitoring"
  - "databases"
  - "orchestration"
  - "open-source"
  - "openai"
industryTags: "tech"
company: "OpenAI"
summary: "OpenAI's Future of Work team built a comprehensive system to analyze millions of pieces of user feedback from diverse channels including support tickets, message ratings, social media, and user behavior to systematically improve ChatGPT and other products. The problem was that feedback was fragmented across many sources, analyzed inconsistently by different teams, and decisions were made based on intuition rather than data-driven insights. The solution involved consolidating all feedback into a unified data layer, using LLMs to classify feedback into a shared taxonomy, employing clustering with embeddings to detect emergent issues, and routing actionable insights to teams through both interactive applications and autonomous platform agents. The system increased feedback signal volume by 2-3x by incorporating synthetic feedback from implicit user behavior, and enabled end-to-end workflows from bug detection to automated pull request generation, with teams now able to track trending issues and validate that interventions actually reduce customer pain points over time."
link: "https://www.youtube.com/watch?v=c1xPkDi-038"
year: 2026
seo:
  title: "OpenAI: Scaling User Feedback Analysis with LLM-Powered Classification and Clustering - ZenML LLMOps Database"
  description: "OpenAI's Future of Work team built a comprehensive system to analyze millions of pieces of user feedback from diverse channels including support tickets, message ratings, social media, and user behavior to systematically improve ChatGPT and other products. The problem was that feedback was fragmented across many sources, analyzed inconsistently by different teams, and decisions were made based on intuition rather than data-driven insights. The solution involved consolidating all feedback into a unified data layer, using LLMs to classify feedback into a shared taxonomy, employing clustering with embeddings to detect emergent issues, and routing actionable insights to teams through both interactive applications and autonomous platform agents. The system increased feedback signal volume by 2-3x by incorporating synthetic feedback from implicit user behavior, and enabled end-to-end workflows from bug detection to automated pull request generation, with teams now able to track trending issues and validate that interventions actually reduce customer pain points over time."
  canonical: "https://www.zenml.io/llmops-database/scaling-user-feedback-analysis-with-llm-powered-classification-and-clustering"
  ogTitle: "OpenAI: Scaling User Feedback Analysis with LLM-Powered Classification and Clustering - ZenML LLMOps Database"
  ogDescription: "OpenAI's Future of Work team built a comprehensive system to analyze millions of pieces of user feedback from diverse channels including support tickets, message ratings, social media, and user behavior to systematically improve ChatGPT and other products. The problem was that feedback was fragmented across many sources, analyzed inconsistently by different teams, and decisions were made based on intuition rather than data-driven insights. The solution involved consolidating all feedback into a unified data layer, using LLMs to classify feedback into a shared taxonomy, employing clustering with embeddings to detect emergent issues, and routing actionable insights to teams through both interactive applications and autonomous platform agents. The system increased feedback signal volume by 2-3x by incorporating synthetic feedback from implicit user behavior, and enabled end-to-end workflows from bug detection to automated pull request generation, with teams now able to track trending issues and validate that interventions actually reduce customer pain points over time."
notion:
  pageId: "3b5f8dff-2538-80e0-b6cb-c3af1fd9f993"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T12:28:00.000Z"
  lastEditedTime: "2026-08-07T12:28:00.000Z"
  publishedAt: "2026-08-07T12:42:10Z"
---

## Overview

OpenAI's Future of Work team developed a sophisticated LLMOps system to address the challenge of managing and analyzing user feedback at scale as the company approaches one billion users. The presenter, Stewart, describes how the team built infrastructure to transform fragmented feedback from multiple channels into actionable insights that drive product improvements and model refinements. This case study exemplifies production LLMOps challenges around data aggregation, classification, clustering, and automated decision-making at massive scale.

The fundamental problem OpenAI faced was common to many organizations deploying LLMs at scale: feedback was fragmented across numerous channels including customer support tickets, sales calls, user interviews, thumbs up/down ratings, message ratings, and social media. Each channel exhibited bias toward different user segments and issue types. Analysis was inconsistent across teams, with each group looking at data sources closest to them through the lens of their own metrics, lacking holistic context. This led to decisions being made based on intuition rather than systematic evidence about how many users were actually impacted by specific issues.

## System Architecture and Data Layer

The solution architecture follows a three-stage pipeline: unified data collection, shared understanding through classification and clustering, and routing insights to appropriate teams in usable formats. The first critical step was consolidating all feedback sources into a single unified data layer. This involved significant groundwork to identify and integrate disparate data sources scattered across Google Sheets, Airtable, and various team-specific data pipelines. While conceptually simple, this consolidation required substantial engineering effort to establish a comprehensive view of user sentiment and issues.

## Expanding Signal with Synthetic Feedback

A particularly innovative aspect of the system addresses the inherent friction in explicit user feedback. OpenAI observed a barbell distribution where users typically only provide feedback when experiencing extremely good or extremely bad interactions, leaving a large middle section of the distribution where issues occur but aren't reported. To address this signal gap, the team developed synthetic feedback generation from implicit user behavior. For example, when a user corrects ChatGPT with a message like "No, that's wrong because of XYZ," the system infers negative feedback about the response quality.

The synthetic feedback approach proved especially valuable for detecting subtle model behavior issues. The case of Goblin Mode illustrates this well: a particular model personality exhibited an unwanted tendency to frequently reference goblins, trolls, and fantastical creatures in responses. By analyzing user corrections and follow-up messages with an LLM, the system could generate synthetic feedback indicating style problems or irrelevant context insertion. This synthetic feedback generation increased the total feedback signal by two to three times, providing substantially richer data for analysis. The team noted that this approach respects user privacy, only sampling from users who opted into model training, with only the LLM analyzing the content to produce aggregate signals.

## Classification with Shared Taxonomy

Once feedback is consolidated, the system applies a hierarchical taxonomy for classification. This shared language enables different teams across OpenAI to view feedback through a consistent lens. The taxonomy has multiple levels of granularity, allowing broad categorization at higher levels and fine-grained classification at lower levels. For instance, the hypothetical Goblin Mode issue might be classified as Response Quality at level one, Relevance at level two, and Style at level three. This hierarchical structure enables teams to identify trending issues at various levels of abstraction, understand prevalence of different issue types, and make data-driven prioritization decisions.

The taxonomy provides a top-down view of feedback, but inherently cannot capture unanticipated emergent issues. To address this limitation, the system complements taxonomy-based classification with clustering approaches.

## Clustering for Emergent Issue Detection

The clustering system uses an embedding and k-nearest neighbors based approach augmented with LLM analysis to identify clusters of similar feedback that may not fit neatly into the predefined taxonomy. The system searches for clusters of certain sizes and characteristics within rolling time windows, such as the past week of feedback. When significant clusters are detected, the system can either push reports about new and emerging issues or allow teams to pull queries like "I saw this tweet, are users actually experiencing this issue?" This combination of push and pull interfaces enables both proactive issue detection and reactive investigation.

The clustering approach proved essential for discovering the Goblin Mode issue and similar unexpected model behaviors that wouldn't be captured by existing taxonomy categories until they became severe enough to warrant classification schema updates.

## Output Formats and Agent Integration

The system evolved through multiple generations of output mechanisms, reflecting the diversity of internal user needs and workflows. Initially, the team built an interactive application allowing users to browse issues and trends within the taxonomy, perform deep dives into specific categories, and explore data through a chat-based data agent. This allowed product managers and engineers to ask questions like "What did people think of GPT 5.x?" and receive summarized feedback across different categories and data slices.

However, different teams wanted different workflows and output formats, leading to the next evolution: integration with Model Context Protocol and skills to enable self-service access. Teams could use Code Acts or custom agents to pull and interact with feedback data directly. For example, a product manager could request a weekly report of top pain points for the ChatGPT iOS app, formatted in a specific way and delivered to a designated Slack channel. This flexibility enabled teams to create customized workflows aligned with their specific needs.

The most recent evolution involves platform agents that run scheduled workflows in the cloud. Teams iterate on a workflow locally until satisfied with the results, then submit the prompt, tool set, desired output format, and schedule to the platform. The system then runs these reports autonomously in the background. This agent-based approach supports diverse output types including formatted reports, alerts on trending issues for specific product areas, direct ticket creation in Linear or Jira, root cause analysis, and even pull request generation from clustered bug reports. This represents a vision of autonomous agents constantly working on the self-improvement loop.

## Case Study: Voice Mode Image Rendering Bug

A concrete example demonstrates the end-to-end workflow. A few months after deploying the system, someone forwarded a screenshot showing an image rendering bug in voice mode. The Code Acts agent used the MCP skills to search for related feedback, finding relevant conversations with metadata that enabled log lookup. The agent then performed root cause analysis directly in the codebase and submitted both a report and a pull request. This represented the first instance of the complete loop: from random screenshot to quantified user impact, evidence gathering, automated fix generation, all driven by the feedback analysis system.

This workflow exemplifies the LLMOps principle of closing the loop between production issues and automated remediation, reducing the time from issue detection to resolution while ensuring fixes address real user pain points backed by evidence.

## Evaluation and Success Metrics

The team tracks success through both proxies and ultimate metrics. Short to mid-term proxies include report usage, code or pull requests generated and accepted, and decisions made based on insights. However, the ultimate validation is whether the system actually reduces customer pain points. By tracking taxonomy categories and clusters over time, teams can verify that interventions successfully reduce the prevalence of specific issues. For example, if user onboarding is identified as a problem area, the relevant feedback cluster should trend downward after improvements are shipped, alongside improvements in top-line product metrics like activation rate or time to first value.

## Practical Implementation Guidance

The presentation concludes with actionable guidance for teams wanting to implement similar systems. The recommended approach is to start small rather than attempting to boil the ocean. Begin by consolidating existing feedback sources like support tickets, or use agents to scrape forums and social media. Bootstrap an initial taxonomy by having an LLM like Claude or GPT sample existing feedback to generate starter categories. Implement classification as feedback arrives, allowing the taxonomy to evolve based on emerging patterns. Finally, ensure the system delivers value by integrating with team workflows, whether through weekly email newsletters, Slack pain point reports, or direct bug filing into Linear or Jira. The emphasis is on creating an end-to-end system that people can start using immediately, demonstrating value early and iterating based on actual usage patterns.

## Critical Assessment and Tradeoffs

While the presentation focuses on OpenAI's successes, several important tradeoffs and challenges merit consideration. The synthetic feedback generation approach, while innovative, introduces potential risks around bias amplification and misinterpretation of user intent. The system makes inferences about user satisfaction from behavioral signals, but user corrections might reflect various motivations beyond quality issues. The two to three times increase in signal is impressive, but the quality and reliability of synthetic feedback compared to explicit feedback isn't thoroughly addressed.

The taxonomy-based classification approach requires ongoing maintenance and evolution. As new product features launch and model behaviors change, the taxonomy must be updated to remain relevant. The balance between stability for trend analysis and flexibility for emerging issues presents an ongoing operational challenge. Similarly, the clustering approach using embeddings and k-nearest neighbors requires careful parameter tuning around cluster size thresholds, similarity metrics, and time windows. The presentation doesn't detail how these parameters are set or validated.

The evolution toward autonomous platform agents running scheduled workflows represents significant trust in agent reliability. The system apparently generates pull requests automatically from bug clusters, raising questions about code review processes, safety checks, and potential for unintended consequences. While the voice mode bug case study showed successful automated root cause analysis and PR generation, it's unclear what percentage of generated PRs are actually accepted or what safeguards prevent problematic automated changes.

The reliance on user opt-in for model training to enable synthetic feedback analysis may introduce selection bias, as users who opt in may have systematically different characteristics or usage patterns than those who don't. The aggregate signals derived from this potentially biased sample might not fully represent the broader user base.

Despite these considerations, the system represents sophisticated LLMOps practice around closing the feedback loop in production AI systems. The combination of structured classification, unsupervised clustering, and increasingly autonomous agent-driven workflows demonstrates maturity in operationalizing LLMs not just for user-facing features but for internal tooling and process automation. The emphasis on connecting interventions back to measurable reductions in user pain points reflects appropriate focus on business outcomes rather than intermediate metrics alone.
