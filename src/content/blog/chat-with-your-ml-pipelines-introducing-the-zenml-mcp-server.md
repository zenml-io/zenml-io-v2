---
title: "Chat With Your ML Pipelines: Introducing the ZenML MCP Server"
slug: "chat-with-your-ml-pipelines-introducing-the-zenml-mcp-server"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67ce93be6b67ed5660a243cb"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-03-20T15:18:26.207Z"
  lastUpdated: "2025-03-20T14:57:25.657Z"
  createdOn: "2025-03-10T07:24:46.158Z"
author: "alex-strick-van-linschoten"
category: "zenml"
tags:
  - "llm"
  - "llmops"
  - "mlops"
  - "mcp"
  - "genai"
date: "2025-03-10T00:00:00.000Z"
readingTime: 5 mins
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/6b48c576/67ce93b1e21d3fd4c6f08672_CleanShot_Mar_10_2025.png"
seo:
  title: "Chat With Your ML Pipelines: Introducing the ZenML MCP Server - ZenML Blog"
  description: "Discover the new ZenML MCP Server that brings conversational AI to ML pipelines. Learn how this implementation of the Model Context Protocol allows natural language interaction with your infrastructure, enabling query capabilities, pipeline analytics, and run management through simple conversation. Explore current features, engineering decisions, and future roadmap for this timely addition to the rapidly evolving MCP ecosystem."
  canonical: "https://www.zenml.io/blog/chat-with-your-ml-pipelines-introducing-the-zenml-mcp-server"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/6b48c576/67ce93b1e21d3fd4c6f08672_CleanShot_Mar_10_2025.png"
  ogTitle: "Chat With Your ML Pipelines: Introducing the ZenML MCP Server - ZenML Blog"
  ogDescription: "Discover the new ZenML MCP Server that brings conversational AI to ML pipelines. Learn how this implementation of the Model Context Protocol allows natural language interaction with your infrastructure, enabling query capabilities, pipeline analytics, and run management through simple conversation. Explore current features, engineering decisions, and future roadmap for this timely addition to the rapidly evolving MCP ecosystem."
---

In a week where the Machine Learning community has been buzzing with unprecedented enthusiasm around the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/), our announcement of the [ZenML MCP Server](https://github.com/zenml-io/mcp-zenml) couldn't be more timely. As social media feeds, YouTube and developer forums overflow with MCP implementations and discussions, we're excited to introduce our contribution that brings the power of conversational AI directly to your ML pipelines—allowing you to interact with your infrastructure through natural language rather than commands or dashboards.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/cf0c6655/67ce91a51be70e2d8c349dc3_ZenML_MCP_Chat.png" alt="__wf_reserved_inherit" />
</figure>

## What We Built

We've developed a complete MCP server that integrates with MCP clients (like Claude Desktop, Cursor, and WindSurf). This integration allows you to communicate with your ML pipelines through natural language interfaces, making your workflows more accessible and interactive.

<iframe src="https://www.loom.com/embed/4cac0c90bd424df287ed5700e7680b14?sid=ef054cdc-548b-46bf-9c6a-1cec129ee9b9" frameBorder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>

Currently, we've focused on providing read-only capabilities to ensure safe interactions with your metadata and pipelines. The server gives you access to information about users, stacks, pipelines, pipeline runs, pipeline steps, services, stack components, flavors, pipeline run templates, schedules, artifacts, service connectors, and step code. As an exception to the read-only approach, you can trigger new pipeline runs through existing run templates.

This implementation enables a range of practical use cases:

<ul><li>Querying your ZenML server using natural language</li><li>Generating analytics and visualizations from your pipeline run data</li><li>Creating detailed reports about pipeline performance</li><li>Investigating failing pipelines without switching contexts</li></ul>

## Why It's Useful

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/796c66f3/67ce91c2fc513aa8497c87e5_CleanShot_Mar_9_from_ZenML_MCP_Server.png" alt="__wf_reserved_inherit" />
</figure>

The ZenML MCP Server offers numerous advantages for developers and teams:

<ol><li><strong>Natural Language Interaction</strong>: Query your ZenML metadata, code and logs using conversational language instead of memorizing CLI commands or navigating dashboard interfaces.</li><li><strong>Contextual Development</strong>: Get insights about failing pipelines or performance metrics without switching away from your development environment.</li><li><strong>Accessible Analytics</strong>: Generate custom reports and visualizations about your pipelines directly through conversation.</li><li><strong>Streamlined Workflows</strong>: Trigger pipeline runs via natural language requests when you're ready to execute.</li></ol>

The ability to "chat with your pipelines" opens up new possibilities for how teams can interact with their machine learning and LLM-based work, making complex operations more accessible to team members regardless of their familiarity with the underlying systems.

## Understanding the MCP Landscape

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/a121477b/67ce91dd9abf6487e364e76c_MCP_Overview_Chat_with_ML_Pipelines.png" alt="__wf_reserved_inherit" />
</figure>

The Model Context Protocol (MCP) was released in late November 2024 and it took a while for the protocol to really take off. More recently Mahesh Murag (Anthropic) [held a workshop](https://www.youtube.com/watch?v=kQmXtrmQ5Zg) at the AI Engineering conference in which he spoke about how Anthropic saw future updates and expansions to the MCP.

### Short-Term Developments

The engineering team are apparently working to implement these pieces at the moment, so we should expect to see them released in the not-so-distant future:

<ul><li><strong>Remote Server Hosting</strong>: Moving from standard I/O to Server-Sent Events (SSE)</li><li><strong>OAuth Support</strong>: Authentication mechanisms to connect with various services</li><li><strong>MCP Registry</strong>: A centralized discovery service for finding and verifying MCP servers</li></ul>

### Medium-Term Directions

As he moved into discussing things beyond the first half of 2025, it seemed like there were many more questions than necessarily fixed plans, but some of the items that they were looking into and exploring how to support were:

<ul><li><strong>Stateful vs. Stateless Connections</strong>: Support for more flexible connection patterns</li><li><strong>Streaming Improvements</strong>: Enhanced data streaming between components</li><li><strong>Namespacing Solutions</strong>: Addressing tool naming conflicts across multiple servers</li><li><strong>Proactive Server Behavior</strong>: Patterns for servers to initiate interactions</li></ul>

Of course, over the longer-term you can imagine that they want MCP to be *the*standard protocol for agents and agents interactions. With this foundational layer for the development of agents in place, it'd be something a website or service would advertise and make available to their users.

The enthusiasm around MCP stems from its potential to standardize how AI systems interact with tools and services, creating network effects as more developers adopt the protocol and build compatible systems.

## Engineering Choices and Tradeoffs

While quite a few implementations of MCP servers already exist, there nevertheless are some parts of the protocol that caused us to pause and I'd like to mention some of those here.

### Read-Only for Now

We've deliberately chosen to make our MCP server primarily read-only for important safety reasons. While MCP clients typically request permission before executing tools, we've seen that users may become desensitized to these prompts after multiple interactions, potentially leading to unintended consequences with destructive actions.

By restricting our server to read-only operations (with the exception of triggering pipeline runs through templates), we've prioritized safety while still providing substantial utility. We're open to considering expanded capabilities based on community feedback and evolving best practices for secure MCP implementations. The code is also released openly and as it is run on your local machine you can of course add whatever write-based methods you'd like, at your own risk.

### Local Running

Currently, the ZenML MCP server is designed to run locally, meaning you'll need to use it with a local MCP client like Claude Desktop or Cursor. This approach aligns with the current state of the MCP ecosystem, which is still developing standards for remote authentication and authorization.

Local execution offers advantages in terms of security and simplicity, though it does require some technical configuration. As the MCP standard evolves to support secure remote execution through SSE and other mechanisms, we anticipate exploring options for hosted versions of the ZenML MCP server.

### Installation and Dependencies

We've configured the server to work with [uv](https://docs.astral.sh/uv/) for dependency management, which provides a reliable way to reproduce the necessary Python environment. While this represents an additional component to install, it significantly simplifies the overall setup process by handling environment configuration automatically.

The installation requires minimal technical effort: cloning the repository, configuring your connection details, and setting up the integration with your preferred MCP client. [Detailed instructions](https://github.com/zenml-io/mcp-zenml) are available in the [GitHub repository](https://github.com/zenml-io/mcp-zenml).

## Getting Started

The setup process for the ZenML MCP Server is straightforward:****

<ul><li><strong>Prerequisites</strong>:<ul><li>Access to a ZenML Cloud server</li><li>UV installed locally</li><li>A local clone of the repository</li></ul></li><li><strong>Configuration</strong>:<ul><li>Create an MCP config file with your ZenML server details</li><li>Configure your preferred MCP client (Claude Desktop or Cursor)</li></ul></li><li><strong>Usage</strong>:<ul><li>Start interacting with your ZenML infrastructure through natural language</li></ul></li></ul>

For detailed setup instructions, please refer to the [GitHub repository](https://github.com/zenml-io/mcp-zenml).

## Example Prompts to Try

Once you've set up the ZenML MCP Server, you're only limited by your imagination. To give you an idea of some of the kinds of prompts you might want to write, here are some to play around with. The first three have screenshots of the kind of output you might expect to see.

### Pipeline Analysis Report

"Can you write me a report (as a markdown artifact) about the `simple_pipeline` and tell the story of the history of its runs, which were successful etc., and what stacks worked, which didn't, as well as some performance metrics + recommendations?"

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/89a09555/67ce92936799949f71629e83_CleanShot_Mar_10_2025_from_TinyPNG.png" alt="__wf_reserved_inherit" />
</figure>

### Comparative Pipeline Analysis

"Could you analyze all our ZenML pipelines and create a comparison report (as a markdown artifact) that highlights differences in success rates, average run times, and resource usage? Please include a section on which stacks perform best for each pipeline type."

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/31fde8b0/67ce92da53b173ac13b5a874_CleanShot_Mar_9_from_ZenML__1_.png" alt="__wf_reserved_inherit" />
</figure>

### Stack Component Analysis

"Please generate a comprehensive report or dashboard on our ZenML stack components, showing which ones are most frequently used across our pipelines. Include information about version compatibility issues and performance variations."

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/55a7e67a/67ce92f01cb444c9c5bf805d_CleanShot_Mar_9_from_ZenML_Chat.gif" alt="__wf_reserved_inherit" />
</figure>

### Run Template Analysis

"Could you analyze our ZenML pipeline run templates and create a markdown report that shows how frequently each template is used, their average success rates, and execution times?"

## Future Directions

We're excited about the potential evolution of the ZenML MCP Server:

<ul><li><strong>Hosted Servers</strong>: Depending on how Anthropic and the MCP ecosystem develop, we may offer hosted versions to eliminate local setup requirements</li><li><strong>Write Actions</strong>: Potential expansion to include safe write operations based on community feedback</li><li><strong>Extended Capabilities</strong>: Further integration with evolving MCP features and protocols</li></ul>

The development roadmap will be heavily influenced by user feedback and the broader MCP ecosystem's evolution.

## Get Involved

We invite you to try the ZenML MCP Server and share your experiences with us through Slack. We're particularly interested in:

<ul><li>Whether you need additional write actions (creating stacks, registering components, etc.)</li><li>Examples of how you're using the server in your workflows</li><li>Suggestions for additional features or improvements</li></ul>

Contributions and pull requests to the [core repository](https://github.com/zenml-io/mcp-zenml) are always welcome!

By bringing natural language interfaces to your ML pipelines, we're taking another step toward making machine learning operations more accessible, efficient, and integrated with your development workflow. We look forward to seeing how you incorporate this capability into your ML projects.