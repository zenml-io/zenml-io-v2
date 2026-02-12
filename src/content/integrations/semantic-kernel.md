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
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/cc4daf0e/68adc8724b8c436be609f693_semantic-kernel.png"
shortDescription: "Microsoft Semantic Kernel integrated with ZenML"
docsUrl: "https://docs.zenml.io"
githubUrl: "https://github.com/zenml-io/zenml/tree/main/examples/agent_framework_integrations/semantic-kernel"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/02915c9a/68adc98b06ee4a979e26f97b_semantickernel-img.png"
relatedBlogPosts:
  - "rag-tools"
  - "best-agentic-ai-frameworks"
seo:
  title: "Integrate Semantic Kernel with ZenML - Agents Integrations"
  description: "Microsoft Semantic Kernel integrated with ZenML"
  canonical: "https://www.zenml.io/integrations/semantic-kernel"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/02915c9a/68adc98b06ee4a979e26f97b_semantickernel-img.png"
  ogTitle: "Integrate Semantic Kernel with ZenML - Agents Integrations"
  ogDescription: "Microsoft Semantic Kernel integrated with ZenML"
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
