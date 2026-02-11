---
title: "Automating Code Sample Updates with LLMs for Technical Documentation"
slug: "automating-code-sample-updates-with-llms-for-technical-documentation"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67e417d96a01a4f019cdcf66"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T17:04:37.903Z"
  createdOn: "2025-03-26T15:06:01.260Z"
llmopsTags:
  - "code-generation"
  - "code-interpretation"
  - "prompt-engineering"
  - "error-handling"
  - "cicd"
  - "documentation"
  - "open-source"
  - "microsoft-azure"
  - "openai"
industryTags: "tech"
company: "Wix"
summary: "When Wix needed to update over 2,000 code samples in their API reference documentation due to a syntax change, they implemented an LLM-based automation solution instead of manual updates. The team used GPT-4 for code classification and GPT-3.5 Turbo for code conversion, combined with TypeScript compilation for validation. This automated approach reduced what would have been weeks of manual work to a single morning of team involvement, while maintaining high accuracy in the code transformations."
link: "https://www.wix.engineering/post/docs-automating-bulk-api-reference-rewrites-with-ai"
year: 2024
seo:
  title: "Wix: Automating Code Sample Updates with LLMs for Technical Documentation - ZenML LLMOps Database"
  description: "When Wix needed to update over 2,000 code samples in their API reference documentation due to a syntax change, they implemented an LLM-based automation solution instead of manual updates. The team used GPT-4 for code classification and GPT-3.5 Turbo for code conversion, combined with TypeScript compilation for validation. This automated approach reduced what would have been weeks of manual work to a single morning of team involvement, while maintaining high accuracy in the code transformations."
  canonical: "https://www.zenml.io/llmops-database/automating-code-sample-updates-with-llms-for-technical-documentation"
  ogTitle: "Wix: Automating Code Sample Updates with LLMs for Technical Documentation - ZenML LLMOps Database"
  ogDescription: "When Wix needed to update over 2,000 code samples in their API reference documentation due to a syntax change, they implemented an LLM-based automation solution instead of manual updates. The team used GPT-4 for code classification and GPT-3.5 Turbo for code conversion, combined with TypeScript compilation for validation. This automated approach reduced what would have been weeks of manual work to a single morning of team involvement, while maintaining high accuracy in the code transformations."
---

## Summary

Wix, the web development platform company, encountered a significant documentation maintenance challenge when they introduced a syntax change to their Velo JavaScript development platform. The change affected how web methods are exported from backend code to frontend code, requiring updates to potentially thousands of code samples scattered across their API reference documentation. This case study demonstrates a practical application of LLMs for internal tooling and automation rather than customer-facing features, specifically targeting the problem of large-scale code migration in documentation.

The Velo API reference contained over 2,000 code samples, and a significant portion of these needed to be updated to reflect the new syntax for exporting web methods. The old syntax used files with a `.jsw` extension and simple function exports, while the new syntax required `.web.js` files with functions wrapped in a `webMethod` function call. Manually updating these samples would have consumed enormous technical writing resources and brought the team's regular work to a halt.

## Problem Complexity

The team identified several factors that made this problem particularly challenging for automation:

The syntax change only affected a subset of the code samples—specifically those demonstrating web method exports and imports. Many samples in the documentation didn't include this pattern at all, and there was no programmatic way to identify which samples needed changes without analyzing the code content itself.

The code samples had been written over several years as the style guide evolved, meaning they existed in a variety of formats and structures. This inconsistency ruled out simple pattern-matching or regex-based solutions for conversion.

The documentation system at Wix follows a docs-as-code approach, with source files distributed across multiple GitHub repositories—some in a dedicated documentation repo and others co-located with the API source code across Wix's many codebases. There was no straightforward way to locate the source file for any given code sample.

## LLM-Based Solution Architecture

The solution consisted of a multi-stage pipeline that leveraged LLMs for classification and conversion, combined with traditional tooling for validation and file management.

### Classification with GPT-4

The first stage used GPT-4 to classify code samples and determine which ones required conversion. The team developed a detailed system prompt that defined what constitutes a "relevant backend code sample" requiring updates. The prompt included specific rules such as: samples must include an import statement from packages with 'backend' or version suffixes like '.v1', '.v2' in the name; they must include an exported function (usually asynchronous); and certain patterns like event handlers and HTTP functions should be explicitly excluded even though they contain exported functions.

The prompt design is notable for its specificity and the inclusion of counterexample patterns—a common prompt engineering technique to reduce false positives. The team acknowledged the probabilistic nature of LLMs and reasoned that if they could write a prompt that performed well on a testing dataset, the classification error rate might not be worse than human error. The model was instructed to respond with only "yes" or "no" to keep responses structured and parseable.

### Conversion with GPT-3.5 Turbo

For the actual code conversion, the team opted for GPT-3.5 Turbo after experimentation, finding it produced the best results among models available at the time. This is an interesting choice that likely balanced cost, speed, and accuracy for what was essentially a mechanical transformation task with well-defined rules.

The conversion prompt was structured with a detailed explanation of the syntax change, followed by before-and-after examples, and finally the code sample to convert. The prompt emphasized that only specific elements should change and everything else should remain exactly as is. It also included instructions about preserving comments with sample values or responses. This approach of providing context, rules, examples, and then the task is a well-established prompt engineering pattern.

### Validation Layer

A critical aspect of the solution was the validation layer. Recognizing that LLM outputs could contain errors, the team implemented a validation step using the TypeScript compiler. They used a utility that retrieves type definitions for all Velo APIs and compiles each converted code sample. This approach verified that the new code was valid JavaScript and used the Velo APIs correctly.

Interestingly, the team reports that in practice they never encountered a single example of the LLM failing to properly convert the code. The only errors they found were token limit cut-offs where the LLM hit the return limit before completing longer samples, and cases where the type definitions were out of sync with the underlying APIs (which was not an LLM error at all). This speaks to the reliability of LLMs for well-defined, mechanical transformation tasks when given clear instructions and examples.

### GitHub Integration

The team built scripts using the GitHub CLI to search Wix's repositories for code sample files based on API identifiers and retrieve all relevant files. A mapping file was created to correlate file locations between their working repository and the source repositories. For replacing files after conversion, another script cloned relevant source repos locally, made changes, and created pull requests automatically.

## Workflow Implementation

The complete workflow was organized into distinct phases:

The search phase used GitHub CLI to locate code sample files across Wix's source repositories and save them to a working repository, creating a mapping file for tracking.

The classify phase used GPT to identify which samples required rewriting, with the prompt inserting each code sample dynamically via API calls. Files requiring changes were flagged in the mapping file.

The convert and validate phase sent flagged files to GPT with the conversion prompt, stored rewritten files alongside originals for easy comparison, and ran the TypeScript validator. Errors were logged with both original and converted code for review.

The error handling phase distributed validation errors among writers who checked for conversion issues and applied fixes.

The replace phase used the mapping file to apply conversions to source repositories and create pull requests for merging.

## Results and Outcomes

The automation approach significantly reduced the manual effort required. Instead of the entire team spending weeks on tedious updates, only six writers worked on the project for one morning, primarily handling the error review phase. The upfront investment in planning and development was borne by fewer team members, allowing the rest of the team to continue their normal work.

Beyond the immediate project, the team gained reusable knowledge and code that helped them complete similar tasks more quickly in the future. This highlights an often-overlooked benefit of investing in LLM-based tooling: the infrastructure and patterns developed for one task can accelerate future automation efforts.

## LLMOps Considerations

This case study represents a batch processing use case rather than a real-time production system, but it still demonstrates several important LLMOps principles. The team used appropriate model selection (GPT-4 for the more nuanced classification task, GPT-3.5 for the mechanical conversion task), implemented output validation to catch errors before they could affect end users, and designed prompts with testing datasets to verify performance.

The validation layer using TypeScript compilation is particularly noteworthy as a pattern for LLM-assisted code generation. By having an external verification mechanism, the team could confidently rely on LLM outputs while maintaining quality standards.

The acknowledgment that LLMs are probabilistic and the proactive approach to error handling (expecting some failures and planning for manual review) represents mature thinking about LLM deployment. Rather than treating the LLM as a perfect oracle, the team designed a system that could tolerate and correct errors.

The case study also demonstrates that LLMs can be valuable for internal tooling and developer experience improvements, not just customer-facing products. Documentation maintenance is often a neglected area, and this approach could be adapted by other organizations facing similar large-scale update challenges.