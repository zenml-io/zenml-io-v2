---
title: "LLM-Powered GraphQL Mock Data Generation for Developer Productivity"
slug: "llm-powered-graphql-mock-data-generation-for-developer-productivity"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694adb7e861b211ef6edb7ce"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:49.877Z"
  createdOn: "2025-12-23T18:12:14.045Z"
llmopsTags:
  - "code-generation"
  - "poc"
  - "prompt-engineering"
  - "error-handling"
  - "evals"
  - "guardrails"
  - "fastapi"
  - "open-source"
  - "reliability"
  - "google-gcp"
industryTags: "tech"
company: "Airbnb"
summary: "Airbnb developed an innovative solution to address the persistent challenge of creating and maintaining realistic GraphQL mock data for testing and prototyping. Engineers traditionally spent significant time manually writing and updating mock data, which would often drift out of sync with evolving queries. Airbnb introduced the @generateMock directive, which combines GraphQL schema validation, product context (including design mockups), and LLMs (specifically Gemini 2.5 Pro) to automatically generate type-safe, realistic mock data. The solution integrates seamlessly into their existing code generation workflow (Niobe CLI), keeping engineers in their local development loops. A companion @respondWithMock directive enables client engineers to prototype features before server implementations are complete. Since deployment, Airbnb engineers have generated and merged over 700 mocks across iOS, Android, and Web platforms, significantly reducing manual effort and accelerating development cycles."
link: "https://medium.com/airbnb-engineering/graphql-data-mocking-at-scale-with-llms-and-generatemock-30b380f12bd6"
year: 2025
seo:
  title: "Airbnb: LLM-Powered GraphQL Mock Data Generation for Developer Productivity - ZenML LLMOps Database"
  description: "Airbnb developed an innovative solution to address the persistent challenge of creating and maintaining realistic GraphQL mock data for testing and prototyping. Engineers traditionally spent significant time manually writing and updating mock data, which would often drift out of sync with evolving queries. Airbnb introduced the @generateMock directive, which combines GraphQL schema validation, product context (including design mockups), and LLMs (specifically Gemini 2.5 Pro) to automatically generate type-safe, realistic mock data. The solution integrates seamlessly into their existing code generation workflow (Niobe CLI), keeping engineers in their local development loops. A companion @respondWithMock directive enables client engineers to prototype features before server implementations are complete. Since deployment, Airbnb engineers have generated and merged over 700 mocks across iOS, Android, and Web platforms, significantly reducing manual effort and accelerating development cycles."
  canonical: "https://www.zenml.io/llmops-database/llm-powered-graphql-mock-data-generation-for-developer-productivity"
  ogTitle: "Airbnb: LLM-Powered GraphQL Mock Data Generation for Developer Productivity - ZenML LLMOps Database"
  ogDescription: "Airbnb developed an innovative solution to address the persistent challenge of creating and maintaining realistic GraphQL mock data for testing and prototyping. Engineers traditionally spent significant time manually writing and updating mock data, which would often drift out of sync with evolving queries. Airbnb introduced the @generateMock directive, which combines GraphQL schema validation, product context (including design mockups), and LLMs (specifically Gemini 2.5 Pro) to automatically generate type-safe, realistic mock data. The solution integrates seamlessly into their existing code generation workflow (Niobe CLI), keeping engineers in their local development loops. A companion @respondWithMock directive enables client engineers to prototype features before server implementations are complete. Since deployment, Airbnb engineers have generated and merged over 700 mocks across iOS, Android, and Web platforms, significantly reducing manual effort and accelerating development cycles."
---

## Overview

Airbnb's case study presents a sophisticated production implementation of LLMs integrated directly into their GraphQL development tooling to solve a longstanding developer productivity challenge. The company identified that engineers were spending considerable time manually creating and maintaining mock data for GraphQL operations, which hampered both testing and the ability to prototype features before backend implementations were complete. Their solution demonstrates how LLMs can be embedded within existing development infrastructure with strong validation guardrails to produce reliable, production-grade outputs.

The implementation is noteworthy for several reasons: it showcases tight integration of LLM capabilities with existing type systems and validation infrastructure, demonstrates practical prompt engineering with rich contextual information, and provides a real-world example of self-healing error correction through iterative LLM calls. The system has seen substantial adoption with over 700 mocks generated across multiple platforms within just a few months of deployment.

## Problem Context and Motivation

Airbnb identified three core challenges through engineer surveys and internal research. First, manually creating mocks was extremely time-consuming, with GraphQL queries often extending to hundreds of lines requiring tedious hand-crafted JSON responses. Engineers would either write raw JSON files, instantiate types from generated schemas, or copy-paste and modify server responses. While these approaches could produce realistic-looking data, they required significant time investment and were error-prone.

Second, prototyping features without completed server implementations created substantial friction. The typical workflow involved server and client engineers agreeing on a GraphQL schema early in development, then splitting off to work in parallel. This left client engineers unable to properly test their UI implementations until backend work was complete. Common workarounds included hardcoding data into views, using proxies to manipulate responses, or implementing custom networking layer hacks—all representing wasted effort.

Third, the lack of coupling between manually written mocks and the underlying queries and schemas meant mocks would inevitably drift out of sync over time. When teams returned to features months later to add functionality backed by additional GraphQL fields, engineers had to remember to manually update mock data. Without forcing functions to maintain synchronization, mock data quality degraded as it diverged from production reality, undermining test reliability.

These challenges are industry-wide rather than Airbnb-specific, and existing tooling like random value generators and local field resolvers provided insufficient solutions because they lacked the domain knowledge and contextual understanding needed to produce meaningful, realistic data.

## Solution Architecture and Design

Airbnb's solution centers on a new client-side GraphQL directive called @generateMock that can be applied to any operation, fragment, or field. The directive accepts optional arguments including an identifier for naming, hints providing additional context or instructions, and a designURL pointing to design mockups. Engineers can repeat the directive with different arguments to generate multiple mock variations for the same query.

The implementation integrates with Airbnb's existing code generation tool called Niobe, which engineers already use to generate TypeScript, Kotlin, and Swift code from GraphQL files. After adding the @generateMock directive to a .graphql file, engineers simply run Niobe code generation as they normally would. The tool automatically performs mock generation as the final step, producing both JSON files containing the actual mock data and source files providing functions for loading and consuming that data from demo apps, snapshot tests, and unit tests.

The generated code creates type-safe interfaces, so engineers can access instantiated types populated with mock data without manually loading JSON. This approach maintains strong typing guarantees throughout the workflow while eliminating manual mock creation effort.

## LLM Integration and Context Engineering

The sophistication of Airbnb's implementation lies in the rich contextual information provided to the LLM. Rather than simply asking an LLM to generate JSON matching a schema, Niobe carefully aggregates multiple context sources to enable realistic output generation.

The system collects the definitions of queries, fragments, or fields marked with @generateMock along with their dependencies. Critically, it includes a pruned subset of the GraphQL schema rather than the entire schema—Niobe traverses the schema and strips out types and fields not needed to resolve the query, along with extra whitespace. This pruning is essential because including the full schema would likely overflow the context window. The schema subset includes any associated documentation present as inline comments, enabling the LLM to better infer appropriate values for the types being queried.

When a designURL is provided, Niobe integrates with an internal API to generate a snapshot image of the specified node in the design document. This image is pushed to a storage bucket, and the resulting URL is fed to the LLM along with specialized instructions on how to use it. This visual context helps the LLM produce mock data matching design mockups by generating appropriate names, addresses, and similar content that align with the intended user interface.

Additional context includes any hints specified in the @generateMock directive, the platform (iOS, Android, or Web) for which mock data is being generated to enable platform-specific styling, and a curated list of Airbnb-hosted image URLs with textual descriptions. This image seed data prevents the LLM from hallucinating invalid URLs and ensures mock data contains valid, loadable images for prototypes and demos.

## Model Selection and Performance

Airbnb selected Gemini 2.5 Pro after evaluating various options through internal testing. The key factors were the model's 1-million token context window and significantly faster performance compared to comparable models while maintaining similar mock data quality. The large context window is particularly important given the rich contextual information being provided—GraphQL schemas, queries, design images, and additional metadata can consume substantial tokens.

The team fine-tuned their prompt against Gemini 2.5 Pro specifically, demonstrating investment in prompt engineering as a critical component of the solution. While the case study doesn't provide detailed performance metrics like latency or token consumption, the emphasis on speed suggests this was an important consideration for maintaining developer workflow efficiency.

## Validation and Self-Healing

A critical architectural decision was placing the LLM within Airbnb's existing GraphQL infrastructure to enable robust validation guardrails. This distinguishes their approach from using external tools like ChatGPT, which couldn't provide the same validation guarantees.

After receiving the LLM-generated mock JSON response, Niobe performs a validation step by passing the GraphQL schema, client GraphQL document, and generated JSON data to the graphql NPM package's graphqlSync function. This validation checks for issues like hallucinated enum values, missing required fields, or type mismatches.

When validation produces errors, Niobe implements a self-healing mechanism by aggregating the errors and feeding them back to the LLM along with the initial mock data. This retry loop allows the system to automatically fix invalid mock data, dramatically improving reliability. The case study emphasizes this validation step as critical to reliably generating production-ready mock data, providing strong guarantees that output is fully valid according to the GraphQL schema.

This validation-and-retry pattern represents a sophisticated LLMOps approach where the probabilistic nature of LLM outputs is contained within deterministic validation boundaries, producing reliable results suitable for production development workflows.

## Runtime Integration with @respondWithMock

Beyond mock generation, Airbnb developed a companion directive @respondWithMock that enables client engineers to use generated mocks at runtime, unblocking feature development before backend implementations are complete. When this directive is present, Niobe alters the generated code to include metadata about the annotation. At runtime, the GraphQL client uses this metadata to load the generated mock data and return the mocked response instead of making server requests.

This capability can be applied at the query level to fully mock responses, or at the field level to create hybrid responses combining production data from the server with locally mocked data for unimplemented fields. The field-level approach is particularly powerful, allowing client engineers to develop against new schema additions within existing queries without waiting for backend implementation.

The directive can be repeated with different identifiers and used with conditional logic based on query variables, providing flexible runtime control over which mocks are returned and when. This flexibility supports various development and testing scenarios.

## Schema Evolution and Mock Maintenance

Airbnb addressed the challenge of keeping mocks synchronized with evolving queries through an intelligent versioning system. Niobe embeds two hash values in each generated JSON file: a hash of the client entity being mocked (the GraphQL query document) and a hash of the input arguments to @generateMock.

During each code generation run, Niobe compares existing mock hashes against what the current hashes should be based on the GraphQL document. When hashes match, mock generation is skipped for those types, avoiding unnecessary work. When a hash changes, indicating the query or arguments have evolved, Niobe intelligently updates the mock by including the existing mock data in the context provided to the LLM along with instructions on how to modify it.

The system is designed to avoid spurious changes to unmodified fields, which is important because engineers may have manually tweaked JSON files or tests may depend on specific values. To achieve this, Niobe provides the LLM with a diff of what changed in the query and tunes the prompt to focus on that diff while avoiding unrelated modifications.

An automated check ensures mock version hashes are up to date when code is submitted, providing a forcing function that guarantees all generated mocks stay synchronized with queries over time. When engineers encounter validation failures, they simply re-run code generation locally without manual updates.

## Production Deployment and Adoption

The case study reports that in just the past few months since deployment, Airbnb engineers have generated and merged over 700 mocks across iOS, Android, and Web platforms using @generateMock. The company plans to extend support to backend services soon, indicating confidence in the approach and desire to expand its scope.

Qualitative feedback from engineers suggests significant impact on developer experience, with one senior software engineer noting that "@generateMock has significantly sped up my local development and made working with local data much more enjoyable." The solution has "fundamentally changed how engineers mock GraphQL data for tests and prototypes at Airbnb," according to the case study.

## Critical Assessment and Considerations

While the case study presents impressive capabilities and adoption metrics, readers should consider several factors when evaluating this approach. The text is written by Airbnb engineering as a form of technical marketing, highlighting successes without deeply exploring limitations, costs, or failure modes.

The reliance on a commercial LLM service (Gemini 2.5 Pro) introduces dependencies on external vendors with associated costs. The case study doesn't discuss pricing implications, though generating 700+ mocks with rich context likely involves non-trivial API costs. Organizations would need to evaluate whether these costs are justified by developer productivity gains.

The solution's effectiveness depends heavily on the quality of contextual information provided. Organizations without similar design tooling, comprehensive schema documentation, or image assets may achieve less impressive results. The approach is also specifically tailored to GraphQL ecosystems—teams using REST APIs, gRPC, or other protocols would need substantially different implementations.

The validation-and-retry mechanism is clever but introduces complexity and potential latency. The case study doesn't discuss how many retry iterations are typically needed or what happens when the LLM repeatedly fails validation. Understanding failure modes and fallback strategies would be important for production deployment.

The intelligent diff-based updating to avoid spurious changes is conceptually sound but relies on prompt engineering quality and LLM behavior consistency. There's inherent unpredictability in whether the LLM will actually respect instructions to only modify changed fields, particularly as models are updated over time.

From an LLMOps perspective, notable gaps include monitoring and observability (how does Airbnb track mock generation success rates, LLM costs, validation failures?), version management (how are prompt updates rolled out?), and model update handling (what happens when Gemini 2.5 Pro is deprecated or significantly changed?).

## LLMOps Best Practices Demonstrated

Despite these considerations, the case study demonstrates several LLMOps best practices worth highlighting. The tight integration with existing developer tooling and workflows rather than requiring separate tools or context switches shows mature product thinking about LLM capabilities.

The validation-first architecture where LLM outputs pass through deterministic validation before being accepted provides a model for safely using probabilistic systems in deterministic contexts like type systems and compilation. The self-healing retry loop demonstrates effective error handling for LLM outputs.

Rich context engineering—combining schema information, visual design context, domain-specific seed data, and natural language hints—shows sophisticated prompt design that goes well beyond simple template prompting. The pruning of schema information to fit context windows demonstrates practical constraint handling.

The version hashing system for tracking when regeneration is needed represents thoughtful state management for LLM-generated artifacts, addressing the challenge of knowing when to regenerate versus preserve existing outputs. The automated validation check on code submission provides a forcing function ensuring generated artifacts stay synchronized.

The directive-based API design provides a clean, declarative interface for LLM capabilities that fits naturally into GraphQL's existing directive system, lowering cognitive load for engineers.

## Conclusion and Broader Implications

Airbnb's implementation represents a mature, production-grade integration of LLM capabilities into development tooling that delivers measurable productivity improvements. The solution addresses real pain points with a well-architected approach that balances LLM flexibility with strong validation guarantees.

The success suggests opportunities for similar LLM integrations in other areas of developer tooling where contextual understanding and natural language processing can automate tedious manual work while maintaining correctness through validation. The directive-based, declarative API approach could serve as a model for exposing LLM capabilities in other contexts.

For organizations considering similar implementations, the key lessons include the importance of rich context engineering, integration with existing workflows, strong validation boundaries, and thoughtful handling of artifact versioning and updates. The approach demonstrates that LLMs can be successfully deployed in production developer workflows when properly constrained and validated, opening possibilities for reimagining how various development tasks are accomplished.