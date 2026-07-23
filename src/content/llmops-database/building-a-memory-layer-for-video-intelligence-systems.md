---
title: "Building a Memory Layer for Video Intelligence Systems"
slug: "building-a-memory-layer-for-video-intelligence-systems"
draft: false
llmopsTags:
  - "content-moderation"
  - "classification"
  - "summarization"
  - "embeddings"
  - "semantic-search"
  - "vector-search"
  - "memory"
  - "harness-engineering"
  - "chunking"
  - "api-gateway"
  - "fastapi"
industryTags: "media-entertainment"
company: "Twelve Labs"
summary: "Twelve Labs, a Series B startup, addresses the fundamental limitation that most video AI systems lack true memory capabilities, treating videos as bags of frames rather than spatial-temporal volumes. The company built a production video intelligence infrastructure consisting of foundation models that preserve temporal, multimodal, and relational context across massive video corpora. Their solution includes semantic chunking, multimodal embeddings (Marengo encoder), a spatial-temporal context store, and a video-aware language model (Pegasus) exposed via API. The system enables applications across sports analysis, security surveillance, and advertising by shifting from simple clip retrieval to corpus-level memory and reasoning, supporting workflows that require understanding across years of footage and multiple camera perspectives."
link: "https://www.youtube.com/watch?v=mOf-PP4mVjA"
year: 2026
seo:
  title: "Twelve Labs: Building a Memory Layer for Video Intelligence Systems - ZenML LLMOps Database"
  description: "Twelve Labs, a Series B startup, addresses the fundamental limitation that most video AI systems lack true memory capabilities, treating videos as bags of frames rather than spatial-temporal volumes. The company built a production video intelligence infrastructure consisting of foundation models that preserve temporal, multimodal, and relational context across massive video corpora. Their solution includes semantic chunking, multimodal embeddings (Marengo encoder), a spatial-temporal context store, and a video-aware language model (Pegasus) exposed via API. The system enables applications across sports analysis, security surveillance, and advertising by shifting from simple clip retrieval to corpus-level memory and reasoning, supporting workflows that require understanding across years of footage and multiple camera perspectives."
  canonical: "https://www.zenml.io/llmops-database/building-a-memory-layer-for-video-intelligence-systems"
  ogTitle: "Twelve Labs: Building a Memory Layer for Video Intelligence Systems - ZenML LLMOps Database"
  ogDescription: "Twelve Labs, a Series B startup, addresses the fundamental limitation that most video AI systems lack true memory capabilities, treating videos as bags of frames rather than spatial-temporal volumes. The company built a production video intelligence infrastructure consisting of foundation models that preserve temporal, multimodal, and relational context across massive video corpora. Their solution includes semantic chunking, multimodal embeddings (Marengo encoder), a spatial-temporal context store, and a video-aware language model (Pegasus) exposed via API. The system enables applications across sports analysis, security surveillance, and advertising by shifting from simple clip retrieval to corpus-level memory and reasoning, supporting workflows that require understanding across years of footage and multiple camera perspectives."
notion:
  pageId: "3a6f8dff-2538-80f3-bbcb-d5da024bcd01"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-23T08:31:00.000Z"
  lastEditedTime: "2026-07-23T08:31:00.000Z"
  publishedAt: "2026-07-23T08:58:37Z"
---

## Overview

Twelve Labs is a Series B startup that has developed foundation models specifically designed for video understanding at production scale. The company's core thesis is that existing video AI systems fundamentally misunderstand the nature of video data by treating it as a collection of discrete frames with attached transcripts, rather than as continuous spatial-temporal volumes. This architectural limitation prevents these systems from preserving the relationships and continuity that define meaningful video content, especially at enterprise scale where organizations manage petabytes of footage across entertainment, sports, security, and advertising domains.

The presentation articulates a clear LLMOps challenge: how to build a durable, queryable memory layer for video intelligence that can preserve context across millions of moments and enable applications to traverse this information efficiently. Unlike text-based LLM systems where memory typically means retrieval-augmented generation, vector search, or extended context windows, video memory requires linking scenes across different files, episodes, camera angles, seasons, and years while maintaining spatial-temporal coherence.

## Technical Architecture and Production System Design

Twelve Labs has built a multi-layered production infrastructure designed specifically for video cognition. At the foundation level, the system employs semantic chunking to capture meaningful temporal units rather than arbitrary frame samples. This chunking preserves the continuity that makes video distinct from other modalities, recognizing that meaning in video derives from sequences across space, time, visual information, speech, sound, motion, OCR, camera changes, scene transitions, and metadata.

The second layer consists of a multimodal embedding encoder called Marengo, which transforms semantic chunks into spatial-temporal vector representations. Unlike traditional approaches that sample frames independently, Marengo preserves the relationships within what the company calls the "spatial-temporal volume" of video content. This embedding layer is critical for the production system's ability to maintain coherence across the multiple modalities inherent in video.

The third component is a spatial-temporal context store that preserves reusable structures including moments, entities, and metadata. This store functions as the persistent memory layer, allowing the system to avoid reprocessing entire archives for each query. The architecture embodies a database-like mental model where expensive interpretation happens once during ingestion, and the resulting primitives become available for multiple downstream applications.

At the reasoning layer, Twelve Labs developed Pegasus, a video context-aware language model that operates over the preserved video content. Pegasus handles synthesis tasks including summarization, metadata generation, and cross-video comparison. Critically, the entire stack is exposed as API infrastructure rather than as end-user applications, positioning Twelve Labs as a platform for developers building video-centric products.

## The Video Memory Problem and Production Challenges

The presentation identifies five specific technical challenges that distinguish video understanding from text-based LLM systems in production. First, temporal dependency means that meaning depends on before-and-after relationships, making single frames or isolated segments misleading. The same expression, product placement, or physical action can carry entirely different semantic meaning depending on sequence context.

Second, video is inherently multimodal in ways that transcend simply processing multiple input types. A transcript alone may miss visual logos or actions, while frames alone may miss spoken claims or audio cues. The production system must fuse these modalities while preserving their temporal relationships.

Third, video density presents a signal distribution challenge. A few minutes of footage can contain dozens of shots, people, objects, actions, locations, and claims, but useful signal is distributed unevenly across frames. Some moments are decisive while others are noisy, requiring the system to make judgments about what to preserve and how deeply to inspect different segments.

Fourth, video exhibits fundamental ambiguity. People reappear under different lighting conditions and camera angles, brands appear partially visible, and locations are often implied through context rather than explicitly named. The production system must resolve these entities across appearances while maintaining uncertainty estimates.

Fifth, video processing is computationally expensive, and production workflows require provenance back to source moments. Applications need to know where information originated, demanding that the system maintain bidirectional links between derived knowledge and timestamp references.

## Context Graphs as a Production Memory Model

Twelve Labs conceptualizes video collections as context graphs, which represents a significant departure from traditional vector search architectures common in text-based RAG systems. A context graph is a durable, queryable representation that connects video moments, entities, appearances, relationships, timestamps, metadata, and corpus-level context in a navigable structure.

The graph architecture has five levels. At the bottom are time-bounded moments representing scenes and shots, which serve as evidence units. One level up are appearances, tracking where and when each entity shows up across the video collection. The third level contains entities themselves including people, brands, places, and concepts. The fourth level captures relationships such as co-occurrences, sequences, and patterns between entities. At the top level, corpus-level context encodes themes, patterns, gaps, and coverage across the entire video collection.

This graph structure enables different query patterns to traverse different paths through the memory layer. Simple search queries may go directly to moments, entity-based workflows start with a person or brand and expand to appearances, while narrative or storyline queries follow relationships across time. The key production insight is that memory is not a single retrieval mechanism but a navigable structure over the entire video volume, allowing the system to support diverse downstream applications from the same underlying representation.

## Production Principles and System Design Decisions

The presentation articulates five core principles that guide the production deployment of video intelligence systems. The first principle is "ingest once, reason many times," which moves expensive understanding operations into the ingestion phase rather than repeating them for every query. This design choice optimizes for production economics by paying computational costs upfront and amortizing them across many downstream requests.

The second principle is to store primitives rather than just answers. Moments, entities, and appearances are reusable building blocks that can be composed into different workflows including search, editing, analytics, and compliance review. This contrasts with end-to-end systems that produce task-specific outputs without intermediate representations that can be leveraged across applications.

The third principle is grounding every claim to specific evidence. If the system makes an assertion about video content, it must cite back to the specific timestamp where that evidence appears. This requirement is fundamental to production deployments in domains like compliance, security, and sports analysis where provenance and verifiability matter.

The fourth principle acknowledges that intent should shape memory. The same footage carries different meaning in different workflows. Sports applications need tracking of players and game events, security applications need anomaly detection and threat assessment, advertising applications need brand safety and creative intelligence. The memory layer must be configurable, allowing developers to specify what primitives matter for their use case.

The fifth principle is maintaining composability by being API-first. The system provides structured, grounded metadata that can be integrated into any application rather than being locked into a specific product or interface. This architectural decision enables the ecosystem model where Twelve Labs provides cognition infrastructure while partners and customers build vertical applications.

## Harness Engineering for Video Workers

The presentation introduces the concept of "video workers" as a production pattern distinct from stateless model calls. While a static model produces a single answer, starts fresh each time, and operates without constraints, a video worker operates within a deterministic system with awareness of available resources and explicit operating parameters.

A video worker's lifecycle includes understanding what memory is available, planning tasks based on the query, receiving and inspecting evidence, synthesizing information, validating outputs, and returning results in a specified format. This entire workflow can be evaluated, enabling the kind of observability and quality control necessary for production systems.

The harness for video workers includes six key capabilities. First is memory, providing access to the context graph and preserved primitives. Second is task planning, which determines whether a query requires search, summarization, multi-step reasoning, or other operations. Third is retrieval, selecting the right evidence from the video corpus for the specific task. Fourth is expert tools, which can include frame-level operations like zoom, comparison, or integration with external metadata. Fifth is the operating envelope, which sets explicit limits on time, cost, depth, scope, and autonomy. Sixth is the output contract, which specifies whether the response should be natural language, structured data with references and timestamps, or another format.

This harness engineering approach addresses a core LLMOps challenge in video understanding: how to make the system's behavior predictable, measurable, and controllable while still leveraging the flexibility of foundation models. The operating envelope concept is particularly relevant for production economics, as it allows the system to make explicit tradeoffs between quality and cost based on application requirements.

## Production Demonstrations and Use Cases

The presentation includes three concrete demonstrations of the production system applied to different domains. The first demo involves sports understanding using 67 videos from the 2022 World Cup. The system successfully identifies "near misses" that almost became goals while excluding actual goals, demonstrating temporal reasoning about action outcomes. It can also track the build-up play leading to goals, identifying passing sequences and player names, showing entity tracking and relationship extraction across temporal sequences.

A particularly sophisticated capability shown is player tracking across an entire corpus, including scenes where the target player is one of many figures on screen. The system describes camera framing and identifies key moments like skill moves and goals, demonstrating the ability to maintain entity identity across varying visual conditions and compositional contexts.

The second demo focuses on security and surveillance applications using publicly available camera footage from traffic intersections and urban areas. The system counts and classifies vehicles by type, detects pedestrian traffic, and identifies safety events like near-collisions and red light violations. Critically, it operates across different environmental conditions including rain and varying crowd densities, showing robustness to visual variation.

The third demo addresses advertising and brand safety using a five-minute Adidas commercial. The system identifies moments suitable for ad placement including reveals, hard cuts, impact moments, energy peaks, and logo appearances. This demonstrates understanding of both content elements and production techniques like slow motion and beat synchronization, which are relevant for advertising workflows.

These demonstrations illustrate the range of applications enabled by the same underlying infrastructure, validating the primitives-based architecture where moments, entities, and relationships can be composed into domain-specific workflows without rebuilding the core cognition layer.

## Production Scalability and System Architecture

The presentation identifies two critical scaling dimensions for production video intelligence systems. The first is temporal scaling, where real systems must reason over years of footage without reprocessing entire archives for each query. This requires memory-first retrieval with reusable representations that are computed once and then support multiple operations including timeline reconstruction, episodic recall, and follow-up questions at lower latency and cost.

The second dimension is spatial scaling, where workflows involve multiple perspectives such as different camera angles, live streams, creator content, body cameras, stock footage, and event recordings. The production system must fuse evidence across these sources while maintaining coherent understanding, presenting a significant data integration challenge beyond single-stream processing.

The context graph architecture addresses both scaling dimensions by providing a unified representation that can link moments across time and across sources. This enables applications to query not just "what happened in this video" but "what does this collection of videos know about X over time and across perspectives."

## Critical Assessment and Production Considerations

While the presentation demonstrates sophisticated technical capabilities, several aspects warrant careful consideration for production deployment. The system's reliance on proprietary foundation models means that users depend on Twelve Labs' continued investment in model development and API availability. Unlike open-source alternatives, organizations cannot modify the core models or run them independently, creating vendor lock-in concerns.

The economics of the system require careful analysis. The presentation emphasizes ingesting once and reasoning many times, but the upfront cost of processing petabytes of footage through multimodal foundation models may be substantial. Organizations evaluating this infrastructure need to understand the cost structure including per-video ingestion fees, storage costs for the context graph, and per-query inference costs.

The configurability of the memory layer, while positioned as a strength, introduces complexity. Different workflows require different primitives, and developers must understand what to configure and how those choices affect downstream capabilities. The learning curve for effectively shaping the system's memory may be significant.

The evaluation methodology for the system remains unclear from the presentation. While the harness architecture enables evaluation of retrieval quality, synthesis accuracy, and budget adherence, the specific metrics, benchmarks, and validation approaches used in production are not detailed. For enterprise deployment, understanding false positive rates, recall, precision, and consistency across edge cases is critical.

The grounding requirement, while important for transparency, may create challenges in scenarios where video content is ambiguous or where assertions require inference across multiple non-contiguous segments. How the system handles uncertainty and presents confidence levels is not fully addressed.

## API-First Infrastructure Model and Ecosystem Strategy

Twelve Labs positions their offering as video cognition infrastructure rather than vertical applications, exposing capabilities through APIs. The product includes a knowledge store that serves as the video memory layer, configurable ingestion pipelines that let developers specify what to extract, corpus digest capabilities for understanding library contents, and resolution APIs for search and response generation.

This infrastructure positioning enables an ecosystem model where Twelve Labs provides the foundational capabilities while partners and customers build domain-specific applications for media archiving, content creation, sports analysis, security, advertising, and other verticals. The API-first approach supports integration into existing workflows and tool chains rather than requiring adoption of a complete platform.

The private beta status mentioned in the presentation suggests the product is still maturing, and production readiness for large-scale enterprise deployment may vary. Organizations interested in adoption should evaluate SLA guarantees, uptime commitments, versioning policies, and migration paths as the platform evolves.

## Broader LLMOps Implications

The Twelve Labs architecture illustrates several broader themes relevant to LLMOps beyond video understanding. The distinction between search and memory highlights that production LLM systems increasingly need to maintain durable, structured representations rather than simply retrieving and processing information on-demand. The context graph approach may have applications in other domains where relationships and temporal continuity matter.

The harness engineering concept, with its emphasis on task planning, operating envelopes, and output contracts, represents a production pattern that could apply to other complex LLM workflows. As systems move beyond simple question-answering to multi-step reasoning and autonomous operation, defining explicit constraints and evaluation criteria becomes essential.

The principle of storing primitives rather than answers reflects a maturation in thinking about LLM system architecture. Early RAG systems often focused on retrieval followed by generation, but production systems increasingly need intermediate representations that can be composed, validated, and reused across different tasks.

The acknowledgment that the same content means different things in different workflows speaks to the importance of configurability in production LLM systems. One-size-fits-all approaches may not serve diverse enterprise use cases, and enabling customization while maintaining system coherence is a significant design challenge.
