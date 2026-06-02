---
title: "Workflow Simulator for Testing Flight Integration Connectors"
slug: "workflow-simulator-for-testing-flight-integration-connectors"
draft: false
llmopsTags: []
industryTags: "e-commerce"
company: "Agoda"
summary: "Agoda faced challenges testing supplier connectors for their flight booking platform, where traditional end-to-end testing required spinning up full production-like stacks, causing late bug discovery and slow iteration cycles. They built a Workflow Simulator that validates supplier connectors by simulating the surrounding ecosystem, enabling engineers to run realistic multi-step booking scenarios locally without dependencies on the full stack. The article mentions exploring AI-assisted techniques in the future to generate test scenarios and edge cases, though the current implementation focuses on DAG-based workflow simulation. This shift-left testing approach enables faster feedback loops, earlier defect detection, and reusable supplier-agnostic testing infrastructure."
link: "https://medium.com/agoda-engineering/how-agoda-simulates-booking-flows-to-test-flight-integrations-204ec4f2e128"
year: 2026
seo:
  title: "Agoda: Workflow Simulator for Testing Flight Integration Connectors - ZenML LLMOps Database"
  description: "Agoda faced challenges testing supplier connectors for their flight booking platform, where traditional end-to-end testing required spinning up full production-like stacks, causing late bug discovery and slow iteration cycles. They built a Workflow Simulator that validates supplier connectors by simulating the surrounding ecosystem, enabling engineers to run realistic multi-step booking scenarios locally without dependencies on the full stack. The article mentions exploring AI-assisted techniques in the future to generate test scenarios and edge cases, though the current implementation focuses on DAG-based workflow simulation. This shift-left testing approach enables faster feedback loops, earlier defect detection, and reusable supplier-agnostic testing infrastructure."
  canonical: "https://www.zenml.io/llmops-database/workflow-simulator-for-testing-flight-integration-connectors"
  ogTitle: "Agoda: Workflow Simulator for Testing Flight Integration Connectors - ZenML LLMOps Database"
  ogDescription: "Agoda faced challenges testing supplier connectors for their flight booking platform, where traditional end-to-end testing required spinning up full production-like stacks, causing late bug discovery and slow iteration cycles. They built a Workflow Simulator that validates supplier connectors by simulating the surrounding ecosystem, enabling engineers to run realistic multi-step booking scenarios locally without dependencies on the full stack. The article mentions exploring AI-assisted techniques in the future to generate test scenarios and edge cases, though the current implementation focuses on DAG-based workflow simulation. This shift-left testing approach enables faster feedback loops, earlier defect detection, and reusable supplier-agnostic testing infrastructure."
notion:
  pageId: "372f8dff-2538-80d3-ab0a-ccbc9303a229"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-06-01T11:10:00.000Z"
  lastEditedTime: "2026-06-01T11:10:00.000Z"
  publishedAt: "2026-06-02T07:03:14Z"
---

## Overview and Context

This case study from Agoda, published in May 2026, describes their approach to testing flight integration connectors, with a notable mention of future plans to incorporate AI-assisted techniques for test scenario generation. While the current implementation primarily focuses on workflow simulation using directed acyclic graphs (DAGs), the article explicitly states future intentions to "explore AI-assisted techniques to help generate scenarios and edge cases, improving test coverage and quality."

Agoda operates a flight booking platform that integrates with numerous external partners including airlines, OTAs (Online Travel Agencies), and various providers. Each supplier has unique API contracts, constraints, and protocols, necessitating a connector layer that sits between Agoda's platform and suppliers to translate communications, map requests and responses, and handle errors and retry logic. The connector is business-critical as it facilitates translation across all business operations including search, pricing, ancillaries, booking, and post-booking flows like cancellations.

## The Problem with Traditional Testing

The traditional end-to-end testing approach for supplier connectors presented several significant challenges. Testing required spinning up a full production-like stack that mirrored the production architecture, including frontend services, asynchronous messaging systems, caching layers, multiple microservices, and background workers. These tests could only be executed after connector implementation was complete and required connection to the supplier's test environment.

This methodology introduced multiple pain points. First, it slowed development considerably and increased costs. Defects were discovered late in the delivery cycle when remediation costs were significantly higher. When bugs were found during E2E testing, the entire test suite typically needed to be rerun after fixes were applied, further increasing effort and slowing delivery. Additionally, E2E tests could be blocked by issues in unrelated dependencies such as platform problems or unstable upstream or downstream services, creating bottlenecks in supplier integrations.

The tests themselves were highly supplier-specific with limited reusability, meaning each new connector integration required substantial effort to validate. Because incorrect mapping logic in connectors can propagate across multiple domains or expose customers to incorrect or incomplete information, extensive testing including unit, functional, and E2E tests was mandatory to ensure quality and reliability.

## The Workflow Simulator Solution

Agoda's solution was to build a Workflow Simulator that validates supplier connectors by simulating their surrounding ecosystem rather than requiring the entire system to be operational. The core insight was asking: "What if we could test connectors without spinning up the entire system around them?"

The simulator is designed specifically for connector testing and prioritizes simplicity and clarity of execution over scalability and availability. Unlike production systems that rely on caching and asynchronous communication to achieve scale, the simulator intentionally omits these optimizations. Instead, it performs synchronous calls and records all interactions in a straightforward and transparent manner, making execution easier to trace and failures easier to diagnose.

The simulator models realistic scenarios that reflect business logic in production, such as searched itineraries, selected pricing, provided passenger information, and selected ancillaries. It simulates the same sequence of requests that upstream systems would make while maintaining state so that carry-over data like supplier-specific information, selected seats, and paid bags remains consistent throughout the flow. After execution completes, the simulator runs assertions on the recorded request-response pairs at both individual endpoint levels and across multiple endpoints to ensure end-to-end connector correctness.

## Architecture Components

The Workflow Simulator consists of four main components that work together to simulate, execute, and validate connector behavior:

**Scenario Builder**: This component enables definition of target acceptance testing scenarios that reflect real business use cases, such as domestic one-way flights with multiple passenger types, international multi-segment round-trips, or flights with technical stops and various ancillary selections. The Scenario Builder instantiates the Scenario Context containing key information like passenger composition, itinerary details, cabin class, and selected ancillaries. These attributes are used for both request generation and assertions. Some fields that would normally originate from upstream systems or user input are generated using a strategy pattern, which can employ either deterministic strategies for fixed, repeatable values or randomization strategies to generate unique requests for each execution. The latter is particularly useful for suppliers with stateful test environments where repeated identifiers may be rejected or cached.

**Workflow Executor**: This component simulates upstream behaviors and orchestrates the sequence of calls to a connector. It is supplier-agnostic because it interacts with connectors via internal contracts, making it reusable across multiple suppliers including new suppliers under development. The workflow is modeled as a directed acyclic graph (DAG) representing simulated business steps. This representation helps determine execution sequences, improving clarity and making dependencies easier to understand. Complex interactions such as asynchronous operations, cache polling, and message passing are simplified to nodes and edges on the DAG.

The executor traverses the graph from start to end node, interacting with nodes, the connector, and eventually suppliers. It records each request and response while maintaining shared state, carrying forward required information from one step to the next. After workflow execution terminates—either due to error or reaching the final node—the executor runs subsequent assertions based on recorded interactions and accumulated state.

**Assertions**: The simulator supports two types of assertions. Endpoint assertions validate individual connector endpoint requests and responses, including contract validation, required fields, field types, formats, length constraints, and logical consistency across fields. For example, at the pricing endpoint, it validates that flight number fields are alphanumeric with valid length and that total prices match the sum of per-passenger prices.

Workflow-Scenario assertions validate end-to-end consistency across multiple connector endpoints using the defined scenario context and recorded request-response logs. These ensure responses align with intended scenarios (passenger details, leg counts for round-trips, segment counts for multi-segment itineraries), verify cross-step data propagation, and compare supplier-side booking details against recorded requests and scenarios. For example, for paid baggage, the system validates that Ancillaries Pricing returns available options, selected baggage is included in booking requests, and the same selection is reflected when retrieving booking information from the supplier.

**Test Runner**: This serves as the entry point for initializing the simulator and executing the connector under test. Even if implementation is incomplete, engineers can use the simulator to automate interactions across multiple supplier endpoints and validate behavior and mapping logic using endpoint-level assertions.

## Benefits and Impact

The Workflow Simulator enables fast local testing by allowing engineers to run realistic flows on their machines without spinning up the entire E2E stack. This significantly shortens feedback loops, making it easier to reproduce issues, iterate on fixes, and validate changes early in the development cycle. The scenario-aware assertions validate that overall behavior matches intended scenarios rather than just checking that single endpoints return valid responses.

Because the simulator communicates through the connector's internal contract, it is supplier-agnostic and reusable across multiple suppliers and connectors with minimal additional work. This enables shift-left testing, as engineers can run realistic flows early in implementation, catching issues sooner and reducing the risk of late-cycle defects and downstream surprises.

## Limitations and Boundaries

The article clearly acknowledges that this approach is not a replacement for full end-to-end testing. E2E tests remain required for final validation and integration to verify behavior against production architecture, including asynchronous communication, messaging, and parallelism. Some complex failures may not be applicable to the workflow simulator. For example, race conditions and production-only constraints such as rate limiting cannot be reproduced without a full staging environment. Additionally, if a supplier's test environment is unstable, that instability propagates to the workflow simulator, reducing its reliability and overall effectiveness.

## AI-Assisted Testing: Future Direction

While the current implementation of the Workflow Simulator does not appear to incorporate LLMs or AI-assisted techniques in its production operation, the article explicitly mentions future plans in this direction. The "What's next?" section states that Agoda will "explore AI-assisted techniques to help generate scenarios and edge cases, improving test coverage and quality."

This future direction represents a potential LLMOps use case where language models could be employed to automatically generate diverse test scenarios based on business requirements, create edge cases that human testers might not consider, and potentially improve overall test coverage. The application of AI to generate test scenarios could address one of the ongoing challenges in software testing: achieving comprehensive coverage of realistic user journeys and edge cases without requiring extensive manual scenario definition.

The mention of AI-assisted scenario generation suggests Agoda is considering using generative AI to automate what is currently a manual process in the Scenario Builder component. This could involve using LLMs to understand business requirements and automatically generate comprehensive test scenarios that reflect realistic booking patterns, edge cases involving unusual passenger compositions, complex multi-segment itineraries, or various combinations of ancillary services.

Additionally, the article mentions plans to "expose the simulator capability to suppliers so both sides can validate the integration earlier, with shorter feedback loops and lower communication overhead." This suggests a collaborative testing approach where AI-generated scenarios might help both Agoda and their supplier partners identify integration issues more quickly.

## LLMOps Considerations and Assessment

From an LLMOps perspective, this case study is notable primarily for its forward-looking statements rather than current implementation. The current Workflow Simulator represents sophisticated testing infrastructure that could serve as a foundation for LLM-based enhancements, but the LLM components have not yet been implemented as of the publication date.

If Agoda proceeds with AI-assisted scenario generation, they would need to address several LLMOps considerations. The quality and diversity of generated test scenarios would need to be evaluated to ensure they genuinely improve coverage beyond manually defined scenarios. There would be challenges around ensuring generated scenarios remain realistic and aligned with actual business requirements rather than creating nonsensical edge cases. The determinism versus randomization tradeoff mentioned in the current Scenario Builder implementation would become more complex with AI-generated scenarios, as LLM outputs can be non-deterministic unless carefully controlled.

The evaluation framework for AI-generated scenarios would be critical—how would Agoda measure whether AI-generated scenarios are better, more comprehensive, or more realistic than human-defined ones? This might involve metrics around code coverage, defect detection rates, or diversity of scenario characteristics. Additionally, there would be questions around the maintenance and versioning of AI-generated scenarios, particularly as business requirements evolve and new types of bookings or ancillaries are introduced.

The supplier-agnostic nature of the current simulator is a strength that could extend to AI-assisted testing. If LLMs can generate scenarios based on general business requirements rather than supplier-specific details, this could maintain the reusability benefits of the current approach while expanding coverage.

It's worth noting with appropriate critical perspective that while AI-assisted test generation is a promising direction, the actual value will depend on implementation quality and integration with existing testing practices. Not all test generation problems are well-suited to LLM approaches, and there's a risk that automatically generated scenarios could create maintenance burden if they generate low-value or redundant test cases. The success of this future direction will depend on careful prompt engineering, output validation, and integration with the existing DAG-based workflow execution framework.

The case study demonstrates thoughtful engineering in the current DAG-based simulator implementation, with clear articulation of benefits and limitations. The planned AI integration appears to be a considered enhancement rather than a wholesale replacement of proven testing methodology, which suggests a pragmatic approach to adopting LLM capabilities where they can provide genuine value.
