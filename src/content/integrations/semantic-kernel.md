---
title: "Semantic Kernel"
slug: "semantic-kernel"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68adc86dd2298aafc5dd5898"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T14:51:22.115Z"
  lastUpdated: "2025-08-26T14:49:52.171Z"
  createdOn: "2025-08-26T14:45:01.429Z"
integrationType: "agents"
logo:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/cc4daf0e/68adc8724b8c436be609f693_semantic-kernel.png"
shortDescription: "Microsoft Semantic Kernel integrated with ZenML"
docsUrl: "https://docs.zenml.io"
githubUrl: "https://github.com/zenml-io/zenml/tree/main/examples/agent_framework_integrations/semantic-kernel"
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/02915c9a/68adc98b06ee4a979e26f97b_semantickernel-img.png"
relatedBlogPosts:
  - "rag-tools"
  - "best-agentic-ai-frameworks"
seo:
  title: "Integrate Semantic Kernel with ZenML - Agents Integrations"
  description: "Microsoft Semantic Kernel integrated with ZenML"
  canonical: "https://www.zenml.io/integrations/semantic-kernel"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/02915c9a/68adc98b06ee4a979e26f97b_semantickernel-img.png"
  ogTitle: "Integrate Semantic Kernel with ZenML - Agents Integrations"
  ogDescription: "Microsoft Semantic Kernel integrated with ZenML"
overviewTitle: "Microsoft Semantic Kernel integrated with ZenML"
overviewDescription: "Semantic Kernel lets you build plugin-based agents using @kernel_function, auto function calling, and async chat with OpenAI; integrating it with ZenML runs those agents inside reproducible pipelines with artifact lineage, observability, and a smooth path from notebooks to production."
featuresWithZenmlHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Function-calling orchestration.</strong> Execute SK agents with automatic function calling inside versioned ZenML pipelines.</li><li id=\"\">‍<strong id=\"\">Message and tool lineage.</strong> Track user prompts, tool invocations, and responses as artifacts for audit and replay.</li><li id=\"\">‍<strong id=\"\">Async-first execution.</strong> Run async chat workflows cleanly inside steps with proper event-loop handling.</li><li id=\"\">‍<strong id=\"\">Evaluation ready.</strong> Add post-run checks to score response quality, tool accuracy, latency, or cost.</li><li id=\"\">‍<strong id=\"\">Portable deployment.</strong> Move the same agent pipeline from local to Kubernetes or Airflow without code changes.</li></ul>"
toolFeaturesHtml: "<ul id=\"\"><li id=\"\"><strong id=\"\">Plugin-based architecture.</strong> Build skills with <code id=\"\">@kernel_function</code> and compose them as plugins.</li><li id=\"\">‍<strong id=\"\">Automatic function calling.</strong> Let the model choose and call functions when needed.</li><li id=\"\">‍<strong id=\"\">Async chat completion.</strong> Stream or await chat responses with OpenAI-backed connectors.</li></ul>"
codeExampleHtml: "<div data-rt-embed-type='true'><pre><code fs-codehighlight-element=\"code\">from zenml import ExternalArtifact, pipeline, step\nfrom semantic_kernel_agent import kernel\nimport asyncio\nfrom semantic_kernel.connectors.ai.function_choice_behavior import FunctionChoiceBehavior\nfrom semantic_kernel.connectors.ai.open_ai.prompt_execution_settings.open_ai_prompt_execution_settings import (\n   OpenAIChatPromptExecutionSettings,\n)\nfrom semantic_kernel.contents.chat_history import ChatHistory\n\n@step\ndef run_semantic_kernel(query: str) -> str:\n   async def _run():\n       chat = kernel.get_service(\"openai-chat\")\n       history = ChatHistory()\n       history.add_user_message(query)\n       settings = OpenAIChatPromptExecutionSettings()\n       settings.function_choice_behavior = FunctionChoiceBehavior.Auto()\n       resp = await chat.get_chat_message_content(\n           chat_history=history, settings=settings, kernel=kernel\n       )\n       return str(getattr(resp, \"content\", resp))\n   return asyncio.run(_run())\n\n@pipeline\ndef semantic_kernel_agent_pipeline() -> str:\n   q = ExternalArtifact(value=\"What is the weather in Tokyo?\")\n   return run_semantic_kernel(q.value)\n\nif __name__ == \"__main__\":\n   print(semantic_kernel_agent_pipeline())</code></pre></div>"
documentationLinkText: "ZenML Documentation"
githubLinkText: "ZenML Agent Framework Integrations (GitHub)"
additionalResources:
  - label: "Semantic Kernel Documentation"
    href: "https://learn.microsoft.com/semantic-kernel/"
isUpdatedToNewFormat: true
---

<ul><li><strong>Function-calling orchestration.</strong> Execute SK agents with automatic function calling inside versioned ZenML pipelines.</li><li><strong>Message and tool lineage.</strong> Track user prompts, tool invocations, and responses as artifacts for audit and replay.</li><li><strong>Async-first execution.</strong> Run async chat workflows cleanly inside steps with proper event-loop handling.</li><li><strong>Evaluation ready.</strong> Add post-run checks to score response quality, tool accuracy, latency, or cost.</li><li><strong>Portable deployment.</strong> Move the same agent pipeline from local to Kubernetes or Airflow without code changes.</li></ul><ul><li><strong>Plugin-based architecture.</strong> Build skills with <code>@kernel_function</code> and compose them as plugins.</li><li><strong>Automatic function calling.</strong> Let the model choose and call functions when needed.</li><li><strong>Async chat completion.</strong> Stream or await chat responses with OpenAI-backed connectors.</li></ul>
```
from zenml import ExternalArtifact, pipeline, step
from semantic_kernel_agent import kernel
import asyncio
from semantic_kernel.connectors.ai.function_choice_behavior import FunctionChoiceBehavior
from semantic_kernel.connectors.ai.open_ai.prompt_execution_settings.open_ai_prompt_execution_settings import (
   OpenAIChatPromptExecutionSettings,
)
from semantic_kernel.contents.chat_history import ChatHistory

@step
def run_semantic_kernel(query: str) -> str:
   async def _run():
       chat = kernel.get_service("openai-chat")
       history = ChatHistory()
       history.add_user_message(query)
       settings = OpenAIChatPromptExecutionSettings()
       settings.function_choice_behavior = FunctionChoiceBehavior.Auto()
       resp = await chat.get_chat_message_content(
           chat_history=history, settings=settings, kernel=kernel
       )
       return str(getattr(resp, "content", resp))
   return asyncio.run(_run())

@pipeline
def semantic_kernel_agent_pipeline() -> str:
   q = ExternalArtifact(value="What is the weather in Tokyo?")
   return run_semantic_kernel(q.value)

if __name__ == "__main__":
   print(semantic_kernel_agent_pipeline())
```
