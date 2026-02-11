---
title: "Making ML Documentation AI-Friendly: ZenML's Implementation of llms.txt"
slug: "llms-txt"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67a9c548f565103025ebaf79"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-02-10T11:09:34.503Z"
  lastUpdated: "2025-02-10T09:25:38.181Z"
  createdOn: "2025-02-10T09:22:16.550Z"
author: "jayesh-sharma"
category: "zenml"
tags:
  - "llm"
  - "documentation"
  - "summarization"
date: "2025-02-10T00:00:00.000Z"
readingTime: 5 mins
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/ae684426/67a9c607b928c67f1a678408_Postimage_from_TinyPNG.png"
seo:
  title: "Making ML Documentation AI-Friendly: ZenML's Implementation of llms.txt - ZenML Blog"
  description: "Discover how ZenML implements the llms.txt standard to make ML documentation more accessible to both AI assistants and humans. Learn about our modular approach using specialized documentation files, practical integration with AI development tools, and how this structured format enhances the developer experience across different context window sizes."
  canonical: "https://www.zenml.io/blog/llms-txt"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/ae684426/67a9c607b928c67f1a678408_Postimage_from_TinyPNG.png"
  ogTitle: "Making ML Documentation AI-Friendly: ZenML's Implementation of llms.txt - ZenML Blog"
  ogDescription: "Discover how ZenML implements the llms.txt standard to make ML documentation more accessible to both AI assistants and humans. Learn about our modular approach using specialized documentation files, practical integration with AI development tools, and how this structured format enhances the developer experience across different context window sizes."
---

Large Language Models are transforming how developers interact with documentation, but they're constrained by context windows and struggle with traditional documentation formats. Here's how we're addressing this at ZenML by implementing [the llms.txt standard](https://llmstxt.org/)—a structured approach to making our documentation more accessible to both AI assistants and human readers.

<iframe src="https://www.loom.com/embed/8cfc87ac6804453aa9b0a3151b28e78b?sid=17b6692c-7f47-4168-aa3b-45a9d16bea3d" frameBorder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>

## Understanding llms.txt

The [llms.txt standard](https://llmstxt.org/), proposed by Jeremy Howard and the team at [Answer.ai](https://answer.ai/), addresses a fundamental challenge in the age of AI assistants: how to make website content more accessible to Large Language Models (LLMs) while working within their context window limitations. Traditional documentation, with its complex HTML structure, navigation elements, and JavaScript, can be challenging for LLMs to process effectively. The `llms.txt` standard offers an elegant solution by providing a markdown-based format that's both human-readable and machine-friendly.

At its core, the `llms.txt` format follows a precise structure that begins with a project name as a top-level header, followed by a required summary block that provides essential context. This summary serves as a quick overview for both humans and machines to understand the scope and purpose of the documentation. Beyond these required elements, the format supports optional detailed information sections and resource listings, all organized under second-level headers.

You can get a sense of just how much the specification / standard took of by browsing one of the popular directories of codebases that support `llms.txt`, [llmstxt.site](https://llmstxt.site/):

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/79094d3c/67a9c45b7ab5f3e0c26d31f9_CleanShot_Feb_7_from_TinyPNG.png" alt="Screenshot of the llms.txt directory, showing a table with different implementations of the llms.txt file." />
</figure>

## Technical Specification

The technical implementation is straightforward yet powerful. Files must be served at `/llms.txt` in the website root, ensuring consistent access across different projects. Using markdown to define structure enables easy parsing and processing while maintaining human readability. This approach allows for automated expansion of URLs, structured parsing of sections, and transformation into various formats like XML or JSON for different use cases.

## ZenML's Implementation

We've taken a thoughtful approach to implementing llms.txt, focusing on scalability and usability across different context window sizes. Our implementation follows a modular approach with specialized files for different documentation aspects, all hosted with a [HuggingFace dataset](https://huggingface.co/datasets/zenml/llms.txt) and available via the [https://www.zenml.io/](https://www.zenml.io/) domain prefix as well.

The foundation of our implementation is the base [llms.txt](https://www.zenml.io/llms.txt) file, which contains approximately 120,000 tokens covering our documentation’s User Guides and Getting Started information. This file serves as the primary entry point for basic queries and initial exploration of ZenML's capabilities. We've structured it to begin with a clear overview of ZenML as an extensible, open-source MLOps framework, followed by carefully organized sections covering our core documentation and component integrations.

Beyond the base file, we've created specialized documentation files to address different user needs:

<ul><li>Our <a href="https://www.zenml.io/component-guide.txt"><code>component-guide.txt</code></a>, containing 180,000 tokens, provides detailed information about ZenML integrations and stack components, making it invaluable for users working with specific integrations or configuring their MLOps stack.</li><li>The <a href="https://www.zenml.io/how-to-guides.txt"><code>how-to-guides.txt</code></a>, at 75,000 tokens, offers practical implementation guidance and summarized workflows, perfect for users seeking concrete examples and step-by-step instructions.</li><li>For users requiring comprehensive documentation access, we also maintain <a href="https://www.zenml.io/llms-full.txt"><code>llms-full.txt</code></a>, a complete corpus of 600,000 tokens that serves as an unabridged reference. This file is particularly useful when working with AI models that support larger context windows or when dealing with complex queries that require deep context.</li></ul>

## Practical Applications and Integration

The real power of our `llms.txt` versions becomes apparent when integrated with modern AI development tools. We've tested out our documentation across various environments to ensure optimal usability. Through practical experience, we've developed insights into effective usage patterns and integration strategies.

Working with the ZenML documentation in Cursor demonstrates how seamlessly the `llms.txt` format integrates with modern development environments. The structured format enables precise code completion and documentation lookup, enhancing the development experience without breaking flow.

<iframe src="https://www.loom.com/embed/ac0d966e23bd49ff9e4b53e43e306541?sid=813890a2-b6b7-472e-bdb2-486fc2e710e5" frameBorder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>

When working with larger documentation files, Vertex AI Studio's capabilities shine. The platform's ability to handle our comprehensive [llms-full.txt](https://www.zenml.io/llms-full.txt) file enables deep documentation analysis and complex query resolution, particularly valuable for advanced scenarios or where you’re not quite sure which file to use.

<iframe src="https://www.loom.com/embed/047f50704f754c00921dd4e033fa0a37?sid=38c28178-630c-4cd1-b9fe-49a87151e9cf" frameBorder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>

Our built-in RunLLM tool on the ZenML docs website showcases how documentation can power immediate documentation queries, and I wanted to include this as part of this overview since not everyone knows about it. This integration demonstrates the format's flexibility and utility in web-based environments.

<iframe src="https://www.loom.com/embed/57e9cd782a8f4eae8f793db87c97ace3?sid=4afab46b-138d-4129-8e71-6ed7b0f83bf3" frameBorder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>

Finally, if you use [NotebookLM](https://notebooklm.google.com/) with the [llms-full.txt](https://www.zenml.io/llms-full.txt) sources you can both chat with the documentation as well as generate custom podcasts around a theme of your choice.

<iframe src="https://www.loom.com/embed/9a6f36b4535a4a94aa08e5d3a85994be?sid=22bd7a92-9205-4c89-9d4f-1a839ebd55b3" frameBorder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>

## Looking Forward

We adopted the `llms.txt` standard because we found it a useful approach and users had asked us about it. We think it’ll open up some useful options for using AI to improve your pipelines, enabling better context understanding, more accurate code suggestions, and improved documentation search and retrieval.

You can find our base `llms.txt` file at [https://zenml.io/llms.txt](https://zenml.io/llms.txt), and access all our specialized files through [our HuggingFace dataset](https://huggingface.co/datasets/zenml/llms.txt) too if you’d like. We encourage you to explore these resources and provide feedback on how we can make them even more useful for your MLOps journey.