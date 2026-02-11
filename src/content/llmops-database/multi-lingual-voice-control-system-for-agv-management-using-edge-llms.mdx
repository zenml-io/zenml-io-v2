---
title: "Multi-Lingual Voice Control System for AGV Management Using Edge LLMs"
slug: "multi-lingual-voice-control-system-for-agv-management-using-edge-llms"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "675b2292f2132f0ed17afd65"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:47:40.671Z"
  createdOn: "2024-12-12T17:51:14.665Z"
llmopsTags:
  - "translation"
  - "speech-recognition"
  - "realtime-application"
  - "internet-of-things"
  - "prompt-engineering"
  - "model-optimization"
  - "latency-optimization"
  - "fastapi"
  - "triton"
  - "meta"
  - "openai"
industryTags: "tech"
company: "Addverb"
summary: "Addverb developed an AI-powered voice control system for AGV (Automated Guided Vehicle) maintenance that enables warehouse workers to communicate with robots in their native language. The system uses a combination of edge-deployed Llama 3 and cloud-based ChatGPT to translate natural language commands from 98 different languages into AGV instructions, significantly reducing maintenance downtime and improving operational efficiency."
link: "https://addverb.com/agv-maintenance-with-generative-ai/"
year: 2024
seo:
  title: "Addverb: Multi-Lingual Voice Control System for AGV Management Using Edge LLMs - ZenML LLMOps Database"
  description: "Addverb developed an AI-powered voice control system for AGV (Automated Guided Vehicle) maintenance that enables warehouse workers to communicate with robots in their native language. The system uses a combination of edge-deployed Llama 3 and cloud-based ChatGPT to translate natural language commands from 98 different languages into AGV instructions, significantly reducing maintenance downtime and improving operational efficiency."
  canonical: "https://www.zenml.io/llmops-database/multi-lingual-voice-control-system-for-agv-management-using-edge-llms"
  ogTitle: "Addverb: Multi-Lingual Voice Control System for AGV Management Using Edge LLMs - ZenML LLMOps Database"
  ogDescription: "Addverb developed an AI-powered voice control system for AGV (Automated Guided Vehicle) maintenance that enables warehouse workers to communicate with robots in their native language. The system uses a combination of edge-deployed Llama 3 and cloud-based ChatGPT to translate natural language commands from 98 different languages into AGV instructions, significantly reducing maintenance downtime and improving operational efficiency."
---

## Overview

Addverb, a global robotics company founded in 2016 that provides warehouse and industrial automation solutions, has developed an AI-powered control assistant for their fleet of Zippy sorting robots (Automated Guided Vehicles or AGVs). The company serves over 350 clients including major enterprises like Coca-Cola, Amazon, and DHL. This case study examines their implementation of generative AI for AGV maintenance, which represents an interesting application of LLMs in an industrial edge computing context.

The core problem Addverb aims to solve is reducing AGV downtime in warehouse environments. As AGV fleets grow, maintenance demands increase, and there is typically a shortage of trained maintenance engineers. Many AGV issues could potentially be resolved by untrained warehouse staff if they had a way to communicate with the machines effectively. The language barrier presents an additional challenge in global warehouse operations where workers may speak any of dozens of different languages.

## Technical Architecture

Addverb's solution employs a multi-stage pipeline that converts spoken language into AGV commands:

The system uses speech-to-text technology as the first processing stage, supporting 98 languages to accommodate the diverse workforce in modern warehouses. This multilingual capability is particularly relevant for global logistics operations where workers from various linguistic backgrounds need to interact with automated systems.

The core of the system relies on a **hybrid LLM architecture** that leverages two different large language models depending on requirements:

- **Meta's Llama 3**: This open-source, freely available LLM is deployed on edge servers for on-premises inference. Addverb specifically notes that Llama 3 is "cost-effective enough" to deploy on edge servers, suggesting that operational cost was a significant consideration in their architecture decisions. The use of Llama 3 for edge deployment allows for local processing without requiring constant cloud connectivity.

- **OpenAI's ChatGPT**: This commercial cloud-based LLM is used when "performance is needed," offering "reduced time to generate the instructions (tokens)" sent to the AGVs. This suggests that ChatGPT serves as a fallback or performance-optimized option for more complex queries or when faster response times are required.

This dual-LLM approach represents a practical architectural pattern where organizations balance cost, latency, and performance by routing requests to different models based on requirements. However, it's worth noting that the source material (which appears to be marketing content) does not provide specific metrics on latency differences, cost savings, or the decision logic for routing between the two models.

## Edge Computing Infrastructure

For the compute infrastructure, Addverb selected the **Supermicro IoT SuperServer SYS-111E-FWTR**, which is designed for AI and machine learning workloads. The server specifications include:

- Single socket design with 4th Generation Intel Xeon Scalable Processors
- Up to 32 cores (64 threads)
- Up to 2TB of DDR5 RAM
- 1GbE and 10GbE network ports for handling large datasets and fast communication between nodes
- Three PCIe 5.0 expansion slots that can accommodate GPUs such as the Intel Data Center GPU Flex Series for additional AI/LLM processing power

The choice of edge computing over pure cloud deployment reflects several considerations relevant to industrial LLMOps:

- **Latency requirements**: In warehouse operations, quick response times are critical to minimize downtime
- **Connectivity reliability**: Edge processing reduces dependency on consistent internet connectivity
- **Data locality**: Processing on-premises may address data security and privacy concerns in industrial environments
- **Cost optimization**: Running Llama 3 locally avoids per-token API costs for routine queries

## Production Considerations

Several aspects of this deployment are relevant to LLMOps practitioners:

**Model Selection and Cost-Performance Trade-offs**: The decision to use both an open-source model (Llama 3) and a commercial API (ChatGPT) demonstrates a pragmatic approach to balancing costs and capabilities. Organizations running LLMs in production often face similar decisions about when to use cheaper local inference versus more expensive but potentially more capable cloud services.

**Multilingual Support**: Supporting 98 languages is a significant operational requirement. This likely involves either selecting models with strong multilingual capabilities or potentially implementing additional translation layers. The speech-to-text component must also handle multiple languages, which adds complexity to the system.

**Edge Deployment Challenges**: Deploying LLMs at the edge introduces operational challenges not present in cloud deployments, including hardware maintenance, model updates across distributed locations, and ensuring consistent performance across different edge sites.

**Integration with Industrial Systems**: The system must translate natural language into specific AGV commands, which requires careful prompt engineering and potentially fine-tuning to ensure reliable command generation. Incorrect translations could lead to operational issues or safety concerns in an industrial setting.

## Critical Assessment

While this case study presents an innovative application of LLMs in industrial automation, several aspects warrant cautious interpretation:

The source material is clearly marketing content from Addverb and its partners (Intel/Supermicro), so claims about effectiveness and performance should be taken with appropriate skepticism. No specific metrics are provided regarding accuracy rates for speech recognition or command translation, reduction in downtime, cost savings, or comparative performance between Llama 3 and ChatGPT in this application.

The claim that "untrained warehouse staff" can resolve AGV issues using the system raises questions about the scope of issues that can actually be addressed this way. Complex mechanical or software problems would still likely require trained personnel.

The architecture decision to use two different LLMs adds operational complexity. Managing two different inference pathways, handling failover scenarios, and ensuring consistent behavior across both models requires careful engineering.

Additionally, the safety implications of voice-controlled industrial equipment are not discussed. In production environments with AGVs moving materials (some Zippy models handle up to 2,000 kg payloads), ensuring that natural language commands are correctly interpreted is critical for worker safety.

## Conclusion

Addverb's AGV maintenance assistant represents an interesting real-world application of LLMs in industrial settings, demonstrating a hybrid cloud-edge architecture that balances cost and performance considerations. The multilingual speech-to-text capability addresses a genuine challenge in global logistics operations. However, as with many vendor case studies, the lack of specific performance metrics and the marketing-oriented nature of the content means that the actual operational benefits would need to be independently verified. The case study nonetheless provides useful insights into architectural patterns for deploying LLMs in edge computing scenarios where latency, cost, and reliability all play important roles.