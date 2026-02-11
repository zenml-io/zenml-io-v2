---
title: "LLM-Powered Requirements Generation and Virtual Testing for Automotive Software Development"
slug: "llm-powered-requirements-generation-and-virtual-testing-for-automotive-software-development"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67cd51a6b702cccaec94cbc1"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:02:38.682Z"
  createdOn: "2025-03-09T08:30:30.281Z"
llmopsTags:
  - "code-generation"
  - "regulatory-compliance"
  - "legacy-system-integration"
  - "prompt-engineering"
  - "semantic-search"
  - "cicd"
  - "devops"
  - "microservices"
  - "continuous-integration"
  - "continuous-deployment"
  - "documentation"
  - "amazon-aws"
industryTags: "automotive"
company: "Capgemini"
summary: "Capgemini developed an accelerator called \"amplifier\" that transforms automotive software development by using LLMs deployed on AWS Bedrock to convert whiteboard sketches into structured requirements and test cases. The solution addresses the traditionally lengthy automotive development cycle by enabling rapid requirement generation, virtual testing, and scalable simulation environments. This approach reduces development time from weeks to hours while maintaining necessary safety and regulatory compliance, effectively bringing cloud-native development speeds to automotive software development."
link: "https://www.youtube.com/watch?v=6klUt7p8sPI"
seo:
  title: "Capgemini: LLM-Powered Requirements Generation and Virtual Testing for Automotive Software Development - ZenML LLMOps Database"
  description: "Capgemini developed an accelerator called \"amplifier\" that transforms automotive software development by using LLMs deployed on AWS Bedrock to convert whiteboard sketches into structured requirements and test cases. The solution addresses the traditionally lengthy automotive development cycle by enabling rapid requirement generation, virtual testing, and scalable simulation environments. This approach reduces development time from weeks to hours while maintaining necessary safety and regulatory compliance, effectively bringing cloud-native development speeds to automotive software development."
  canonical: "https://www.zenml.io/llmops-database/llm-powered-requirements-generation-and-virtual-testing-for-automotive-software-development"
  ogTitle: "Capgemini: LLM-Powered Requirements Generation and Virtual Testing for Automotive Software Development - ZenML LLMOps Database"
  ogDescription: "Capgemini developed an accelerator called \"amplifier\" that transforms automotive software development by using LLMs deployed on AWS Bedrock to convert whiteboard sketches into structured requirements and test cases. The solution addresses the traditionally lengthy automotive development cycle by enabling rapid requirement generation, virtual testing, and scalable simulation environments. This approach reduces development time from weeks to hours while maintaining necessary safety and regulatory compliance, effectively bringing cloud-native development speeds to automotive software development."
---

## Overview

Capgemini presented a comprehensive approach to accelerating automotive software development through the integration of large language models with cloud-based virtualization infrastructure. The presentation featured three speakers from Capgemini: Fabian (Managing Delivery Architect and Cloud Architect), Warr (Enterprise Architecture Director working with cloud architectures and in-vehicle infotainment), and Stefan Kower (Head of Software Defined Vehicle). Their solution, branded as "Amplifier," represents an attempt to bring the speed and agility of cloud-native development to the traditionally slow-moving automotive industry.

The core problem being addressed is the stark contrast in development velocity between modern web/cloud development (where ideas can be deployed in a day or two) and automotive software development (where integration can take months or even years). This lengthy timeline creates significant challenges: late discovery of misunderstandings, expensive remediations, and suboptimal quality. The automotive industry's regulatory requirements around safety and security certification add additional complexity that cannot simply be bypassed.

## The LLM-Powered Solution

The Amplifier accelerator uses large language models deployed on AWS Bedrock to transform the typically informal and ephemeral outputs of creative ideation sessions into structured, actionable software artifacts. The workflow begins with a familiar scenario: teams gathering in a room with whiteboards to brainstorm ideas. Traditionally, these sessions end with someone photographing flip charts, and the ideas gradually fade from organizational memory. Capgemini's approach captures these photos and feeds them into an LLM-powered pipeline.

The LLM component performs several key functions in sequence. First, the models extract information from the photographs of whiteboard sketches and notes. This visual understanding capability allows the system to interpret handwritten text, diagrams, and conceptual sketches. The extracted information is then processed to create a consistent set of requirements. Critically, the system includes features to test requirements for ambiguity—a common source of problems in software development where vague or unclear requirements lead to implementation misunderstandings.

From these validated requirements, the system generates user stories that are described as "ready for refinement" and suitable for immediate handoff to development teams. The presenters claimed that for their demonstration use case (a pet mode application running on Android Automotive), the entire process from whiteboard photo to over 30 structured requirements takes approximately 15 minutes—a dramatic reduction from the days or weeks this process would traditionally require.

## Prompt Engineering and Model Customization

The presentation mentions that Capgemini has engineered specific prompts for the purpose of extracting information and generating requirements. This indicates a significant investment in prompt engineering to tailor the LLM outputs for automotive-specific needs. The system also references the use of "pre-trained and LoRA-modified AI models," suggesting that Capgemini has gone beyond basic prompt engineering to fine-tune models for their specific domain using Low-Rank Adaptation techniques.

The mention of "vector databases" in the architecture suggests that the system likely incorporates retrieval-augmented generation (RAG) capabilities, potentially to ground the LLM outputs in automotive-specific knowledge, previous project artifacts, or regulatory requirements. This would help ensure that generated requirements are not only coherent but also aligned with industry standards and organizational practices.

## Integration with Development Infrastructure

A key differentiator of this solution is its integration with a broader development infrastructure rather than being a standalone LLM application. The requirements generated by the LLM feed directly into several downstream processes:

The virtualization layer uses AWS Engineering Workbench and ECU virtualization technology to provide developers with complete development environments that simulate in-vehicle systems. Developers can work with virtualized ECUs (Electronic Control Units) running real software, allowing them to test integrations without waiting for physical hardware. This addresses a significant pain point in automotive development where access to hardware test benches (referred to as "racks" in the presentation) is limited and time-consuming.

The test automation component takes the same requirements generated by the LLM and creates automated test cases. This represents a "shift left" strategy where testing is integrated early in the development lifecycle rather than being deferred until late-stage integration. The consistency between requirements and tests is emphasized as a key benefit—both artifacts derive from the same source, reducing the risk of misalignment.

The presenters describe the system as enabling developers to receive Jira tickets and test cases derived from the same consistent requirement set, creating an end-to-end chain from initial concept to development workflow.

## Scalability and Fleet Testing

The cloud-native architecture enables a particularly compelling use case: fleet-scale testing. The presenters describe a scenario where a security protocol change needs to be validated before deployment to thousands of vehicles. Using the same virtualized infrastructure that supports individual development, the system can scale up to simulate a fleet of a thousand vehicles through cloud automation scripts.

This capability directly addresses a risk management concern: discovering that a backend infrastructure cannot handle the load only after changes have been pushed to vehicles in the field. The virtualized approach allows these scenarios to be tested in advance.

## Maintaining Regulatory Compliance

An important nuance in the presentation is the acknowledgment that this approach does not replace all traditional automotive development practices. The V-model, which is the standard development methodology in automotive and other safety-critical industries, remains relevant for regulated aspects of vehicle development. The LLM-powered approach is positioned as enabling a more iterative process within this framework, particularly by leveraging the text understanding capabilities of generative AI to recognize semantic similarity between differently-phrased requirements.

Hardware testing in physical test benches will still be required for certain validation activities such as timing tests and safety certifications. However, the presenters argue that much of the integration burden can be addressed earlier in the process through virtualization, reducing the frequency and severity of issues discovered during hardware testing.

## Critical Assessment

While the presentation makes compelling claims about efficiency gains, several aspects warrant careful consideration. The 15-minute timeline for generating 30 requirements from a whiteboard photo is impressive, but the quality and completeness of these requirements compared to traditionally elicited requirements is not demonstrated. Automotive software has stringent quality requirements, and LLM-generated content typically requires human review and validation.

The end-to-end integration claimed by Capgemini represents significant infrastructure investment. Organizations considering similar approaches should recognize that the LLM component, while central to the pitch, is only one part of a larger ecosystem that includes ECU virtualization, cloud infrastructure, and DevOps automation.

The reliance on AWS Bedrock for LLM deployment provides enterprise-grade infrastructure but also creates cloud vendor dependency. For organizations with specific data sovereignty requirements or existing multi-cloud strategies, this architecture choice has implications.

The presentation is clearly promotional in nature, delivered at what appears to be an AWS-related event, and the claims should be evaluated with that context in mind. However, the architectural approach of combining LLM capabilities with virtualization and automation for automotive development represents a credible direction for the industry as it grapples with increasing software complexity in vehicles.