---
title: "AI-Driven Student Services and Prescriptive Pathways at UCLA Anderson School of Management"
slug: "ai-driven-student-services-and-prescriptive-pathways-at-ucla-anderson-school-of-management"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6936b61fb9dcd17c49ffedc0"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:34:19.097Z"
  createdOn: "2025-12-08T11:27:27.655Z"
llmopsTags:
  - "customer-support"
  - "question-answering"
  - "chatbot"
  - "data-integration"
  - "data-analysis"
  - "legacy-system-integration"
  - "poc"
  - "rag"
  - "multi-agent-systems"
  - "agent-based"
  - "prompt-engineering"
  - "latency-optimization"
  - "cost-optimization"
  - "microservices"
  - "api-gateway"
  - "orchestration"
  - "documentation"
  - "security"
  - "compliance"
  - "guardrails"
  - "amazon-aws"
industryTags: "education"
company: "UCLA"
summary: "UCLA Anderson School of Management partnered with Kindle to address the challenge of helping MBA students navigate their intensive two-year program more effectively. Students were overwhelmed with coursework, career decisions, club activities, and internship searches, receiving extensive information without clear guidance. The solution involved digitizing over 2 million paper records and building an AI-powered application that provides personalized, prescriptive roadmaps for students based on their career goals. The system integrates data from multiple sources including student records, career placement systems, clubs, and course catalogs to recommend specific courses, internships, clubs, and target companies. The project took approximately 8 months (December 2023 to August 2024) and demonstrates how educational institutions can leverage agentic AI frameworks to deliver better student experiences while maintaining data security and privacy standards."
link: "https://www.youtube.com/watch?v=jxLZxkco8tU"
year: 2025
seo:
  title: "UCLA: AI-Driven Student Services and Prescriptive Pathways at UCLA Anderson School of Management - ZenML LLMOps Database"
  description: "UCLA Anderson School of Management partnered with Kindle to address the challenge of helping MBA students navigate their intensive two-year program more effectively. Students were overwhelmed with coursework, career decisions, club activities, and internship searches, receiving extensive information without clear guidance. The solution involved digitizing over 2 million paper records and building an AI-powered application that provides personalized, prescriptive roadmaps for students based on their career goals. The system integrates data from multiple sources including student records, career placement systems, clubs, and course catalogs to recommend specific courses, internships, clubs, and target companies. The project took approximately 8 months (December 2023 to August 2024) and demonstrates how educational institutions can leverage agentic AI frameworks to deliver better student experiences while maintaining data security and privacy standards."
  canonical: "https://www.zenml.io/llmops-database/ai-driven-student-services-and-prescriptive-pathways-at-ucla-anderson-school-of-management"
  ogTitle: "UCLA: AI-Driven Student Services and Prescriptive Pathways at UCLA Anderson School of Management - ZenML LLMOps Database"
  ogDescription: "UCLA Anderson School of Management partnered with Kindle to address the challenge of helping MBA students navigate their intensive two-year program more effectively. Students were overwhelmed with coursework, career decisions, club activities, and internship searches, receiving extensive information without clear guidance. The solution involved digitizing over 2 million paper records and building an AI-powered application that provides personalized, prescriptive roadmaps for students based on their career goals. The system integrates data from multiple sources including student records, career placement systems, clubs, and course catalogs to recommend specific courses, internships, clubs, and target companies. The project took approximately 8 months (December 2023 to August 2024) and demonstrates how educational institutions can leverage agentic AI frameworks to deliver better student experiences while maintaining data security and privacy standards."
---

## Overview

This case study from AWS re:Invent features a collaboration between UCLA Anderson School of Management and Kindle, a consulting firm, to build AI-native systems for improving student services. The presentation includes perspectives from Anita Micas (Kindle's Government and Education Market lead), Howard Miller (CIO at UCLA Anderson), and Chin Vo (Kindle's VP of Innovation at Scale). The UCLA Anderson case represents a practical implementation of agentic AI in higher education, addressing real operational challenges while navigating complex data security requirements.

## Business Context and Problem Statement

The initiative began nearly three years ago when ChatGPT emerged publicly. The dean of UCLA Anderson posed a provocative question to Howard Miller: if ChatGPT could score a B+ on his final exam, what was the value proposition of higher education? This catalyzed a strategic shift toward becoming an "AI thought leader" as a school.

The specific business problem addressed by the student services application relates to the inherent complexity of the two-year MBA program at UCLA Anderson. Students enter the program quickly, often starting in summer before fall classes begin. They face multiple simultaneous pressures: intensive coursework, early internship interviews, club involvement decisions, and career planning—sometimes while still uncertain about their ultimate career direction. The school was "inundating them from the beginning" with information through extensive emails and resources, essentially saying "good luck" without providing structured guidance. While career advisors existed, there was no systematic, personalized roadmap tool to help students navigate optimal paths based on their stated career objectives.

## AI Framework and Architecture

Kindle's approach centers on what they call their "Agentic AI Framework," which represents a philosophy of embedding AI into core operations rather than treating it as a standalone project or pilot. The framework consists of three main components:

**Data Ingestion Layer**: This component enables capture of both structured and unstructured data from diverse sources. In the UCLA case, this included source code analysis to understand dependencies, security and IT policies to ensure agents operate within safe standards, and policy/procedure guides to map operational flows and identify bottlenecks. For the student services application specifically, data was pulled from disparate systems including student record databases, career placement systems, club information, and course catalogs.

**Agent Builder**: This layer deploys intelligent agents for specific business functions. These agents can automate tasks, make decisions, and adapt based on context. The framework supports progressive AI maturity from simple reactive generative AI to independent agents to multi-agent systems to full agentic workflows.

**Agent Catalog**: Described as "where the magic happens," this is a centralized repository of reusable AI agents that enables scaling by deploying repeatable models across organizations. This component allows the framework to be lightweight and adaptable, avoiding heavy investment in any particular technology stack that might become obsolete quickly.

## Technical Implementation Details

The UCLA Anderson implementation involved several significant technical challenges and architectural decisions:

**Data Consolidation**: A major technical hurdle was consolidating data from multiple disparate systems into a single environment and engine. The team pulled together student records, career placement data, club information, and course catalog data. Howard Miller acknowledged that if they were to start the project in 2024 rather than late 2023, they wouldn't need to consolidate data into one place—modern AI integration capabilities have advanced significantly in just 6-9 months, allowing systems to access data in place rather than requiring migration.

**Security and Privacy Architecture**: Because the application dealt with sensitive student data, UCLA Anderson faced substantial institutional hurdles beyond typical organizational change management. They needed to pass third-party risk management reviews and convince central campus administration that the project could proceed safely. The team took "extra care to architect that environment such that it mirrored the information security policy of the UC system almost line for line" to ensure it would pass audits. This security-first approach added complexity but was essential for dealing with confidential educational records.

**Timeline and Development Process**: The project began with an AI task force formed in September 2023, which was cross-functional including faculty, staff, and students. By December 2023, they had identified a platform and pricing model that the dean approved. Two months later (approximately February 2024), they were working with consultants and had a platform in place. Another two months after that (approximately April 2024), they had their first two production use cases. The full project was completed around August 2024—roughly 8 months from platform selection to completion.

**User Experience Design**: A critical component was creating a user interface that students would actually want to use. The application provides prescriptive guidance: if a student indicates they want to become a product manager at LinkedIn or another specific company, the system recommends which courses to take, which internships to pursue, which clubs to join, and identifies companies that historically align with that career path.

**Multi-Agent Architecture**: Howard Miller described implementing an agentic approach where one agent can call another agent and successfully hand off context, allowing users to seamlessly transition between specialized agents. He characterized this as a building-blocks approach rather than trying to architect something overly comprehensive from the beginning. He candidly noted these aren't "the sexy what everybody thinks agentic AI should be" but represent practical, foundational implementations that deliver business value.

## LLMOps Operational Considerations

**Fail Fast Philosophy**: A recurring theme throughout the discussion was the importance of failing fast. Howard Miller explicitly stated that if he were to do the project differently, he would have "failed faster to begin with." He felt they spent too much time trying to perfect the architecture, and by the time they launched, technology had changed so dramatically that they should have put something in users' hands sooner and iterated from there. This reflects a key LLMOps principle of rapid experimentation and iteration.

**Technology Stack Adaptability**: Chin Vo emphasized that their framework is intentionally lightweight because they know "3 months from now, 6 months or 12 months, it's gonna change. Something's gonna come up." This approach mirrors lessons from compute services evolution (virtualization → containerization → serverless) where architectural patterns evolved rapidly, and organizations needed flexibility to adopt new approaches without massive reinvestment.

**Quick Time to Value**: Howard Miller stressed the importance of finding projects with quick time to value rather than trying to "boil the ocean." He advised not starting with sensitive and confidential data but acknowledged that the UCLA Anderson project deliberately tackled student data despite this being more challenging. His recommendation for others is to begin with less sensitive use cases to build momentum and confidence.

**Trust and Observability**: A major operational challenge discussed was building trust in autonomous agents. Chin Vo identified trust as one of the two main barriers (along with data) preventing organizations from becoming AI-native. Recent AWS announcements around agent core services address this through policy engines that ensure agents access the right tools, monitoring to verify agents are doing what they're supposed to do, and observability features that provide audit trails showing what agents are doing at all times.

**Organizational Change Management**: Both speakers emphasized that people and process changes are as important as technology. Chin Vo's role encompasses data and AI practice, enterprise strategy and architecture, people and performance (OCM), and user experience—all coordinated to ensure successful adoption. The UCLA project included a cross-functional task force from the beginning, bringing together faculty, staff, and students to set direction collaboratively.

## Broader Context and Other Kindle Use Cases

The presentation included examples of Kindle's AI work in government and public sector contexts:

- **Stockton, California**: Delivered the city's first public-facing AI predictive dashboards providing 320,000 residents real-time insights into road safety and estimated repair times.
- **Large Midwest City**: Modernized parking and citation management systems with an AWS AI-powered omni-channel contact center, reducing wait times by up to 20%.
- **Rental Car Company Example**: A video case study showed how Kindle's agentic ingestion tool analyzes dependencies in legacy systems, extracts embedded business rules, and creates modernization roadmaps. For a rental car company with rigid legacy pricing engines, they transformed static logic into structured, human-readable format, automatically generated tests and modern code, and created a flexible microservices architecture. The solution involved three distinct agents: one ingesting external data (weather, flight patterns) for probabilistic pricing, another running Monte Carlo simulations for revenue and fleet utilization scenarios, and a third performing compliance checks against state and federal guidelines.

## Critical Assessment

The presentation exhibits several characteristics common to vendor-led conference sessions, where Kindle is clearly positioning its services and framework. However, the inclusion of Howard Miller as a genuine client provides valuable ground truth and balanced perspective. His candid admissions—that the agents aren't particularly sophisticated yet, that they spent too much time on architecture, that timing matters enormously in this fast-moving field—add credibility.

The 8-month timeline from platform selection to production is relatively fast for an educational institution dealing with sensitive data, suggesting effective project management. However, the project's timing (late 2023 to mid-2024) means it was developed during a period of extremely rapid AI evolution, which partially validates Howard's concern about over-architecting.

The security approach—mirroring UC system information security policy "almost line for line"—demonstrates appropriate caution with student data but may have contributed to slower development. The tradeoff between speed and security/compliance is inherent in educational and government contexts.

The "fail fast" recommendation conflicts somewhat with the security-first approach UCLA Anderson necessarily took. This tension between rapid experimentation and careful governance is a central challenge in LLMOps for regulated sectors.

The claim that modern AI can access data in place without consolidation is somewhat optimistic—while technically possible through APIs and integration layers, practical challenges around data quality, consistency, and real-time access often still favor some degree of consolidation or data preparation, particularly for RAG-based systems.

## Future Outlook

Both speakers anticipated that agentic AI will continue to dominate the landscape through 2025 and likely 2026. Chin Vo predicted that agents as part of enterprises will become an accepted reality rather than a question, similar to how serverless computing on AWS became normalized after initial skepticism. Howard Miller expects continued evolution toward agents calling other agents and delivering business outcomes, with a deliberate focus on not "scaring away the humans who think their jobs are going to be replaced."

The emphasis on building blocks and incremental progress rather than attempting transformative implementations all at once reflects mature thinking about AI adoption in production environments. The UCLA Anderson case demonstrates that even relatively straightforward agentic implementations—like prescriptive student guidance based on career goals—can deliver meaningful business value when properly scoped and executed.

## Key LLMOps Takeaways

The case study illustrates several important LLMOps principles: the critical importance of organizational buy-in and cross-functional collaboration from the start; the need for rapid iteration and willingness to fail fast; the value of starting with clear business outcomes rather than technology-first approaches; the challenge of balancing security, privacy, and compliance requirements with development speed; the rapidly evolving nature of AI technology requiring flexible, adaptable architectures; the importance of trust-building through observability, audit trails, and policy enforcement; and the reality that successful AI implementations often start modestly rather than attempting to solve every problem at once. The UCLA Anderson implementation represents a practical, production-grade agentic AI system that delivers measurable value while navigating the complex requirements of educational data governance.