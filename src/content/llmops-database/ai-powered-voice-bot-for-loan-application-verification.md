---
title: "AI-Powered Voice Bot for Loan Application Verification"
slug: "ai-powered-voice-bot-for-loan-application-verification"
draft: false
llmopsTags:
  - "fraud-detection"
  - "customer-support"
  - "chatbot"
  - "prompt-engineering"
  - "latency-optimization"
  - "error-handling"
  - "evals"
  - "monitoring"
  - "google-gcp"
  - "openai"
  - "amazon-aws"
industryTags: "finance"
company: "Upstart"
summary: "Upstart, a lending company, faced a significant backlog in processing loan applications, with approximately 7,000 calls per week requiring manual verification for applicants who triggered fraud signals. The verification process involved three simple questions but consumed 5-7 minutes per call with human agents handling mundane, repetitive tasks. The company implemented an AI voice bot using a cascading architecture with Google for speech-to-text, Gemini Flash Lite for inference, and Ryme for text-to-speech, orchestrated through Pipecat over WebRTC. After six months in production, the solution achieved 96% accuracy, reduced latency to 2 seconds between turns, handled 4,000 calls weekly at $0.86 per call (compared to $5 with human agents), and significantly reduced the application backlog while freeing human agents from repetitive work."
link: "https://www.youtube.com/watch?v=u1691Io3mb0"
year: 2025
seo:
  title: "Upstart: AI-Powered Voice Bot for Loan Application Verification - ZenML LLMOps Database"
  description: "Upstart, a lending company, faced a significant backlog in processing loan applications, with approximately 7,000 calls per week requiring manual verification for applicants who triggered fraud signals. The verification process involved three simple questions but consumed 5-7 minutes per call with human agents handling mundane, repetitive tasks. The company implemented an AI voice bot using a cascading architecture with Google for speech-to-text, Gemini Flash Lite for inference, and Ryme for text-to-speech, orchestrated through Pipecat over WebRTC. After six months in production, the solution achieved 96% accuracy, reduced latency to 2 seconds between turns, handled 4,000 calls weekly at $0.86 per call (compared to $5 with human agents), and significantly reduced the application backlog while freeing human agents from repetitive work."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-voice-bot-for-loan-application-verification"
  ogTitle: "Upstart: AI-Powered Voice Bot for Loan Application Verification - ZenML LLMOps Database"
  ogDescription: "Upstart, a lending company, faced a significant backlog in processing loan applications, with approximately 7,000 calls per week requiring manual verification for applicants who triggered fraud signals. The verification process involved three simple questions but consumed 5-7 minutes per call with human agents handling mundane, repetitive tasks. The company implemented an AI voice bot using a cascading architecture with Google for speech-to-text, Gemini Flash Lite for inference, and Ryme for text-to-speech, orchestrated through Pipecat over WebRTC. After six months in production, the solution achieved 96% accuracy, reduced latency to 2 seconds between turns, handled 4,000 calls weekly at $0.86 per call (compared to $5 with human agents), and significantly reduced the application backlog while freeing human agents from repetitive work."
notion:
  pageId: "3b5f8dff-2538-8048-9346-f98b9e17ea59"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-08-07T12:27:00.000Z"
  lastEditedTime: "2026-08-07T12:27:00.000Z"
  publishedAt: "2026-08-07T13:06:10Z"
---

## Overview and Business Context

Upstart is a lending company that leverages AI extensively in its operations, particularly for customer success-related activities. The company processes a high volume of loan applications, with approximately 90% automatically approved. However, 10% of applicants trigger fraud signals and must call in to verify their information before their applications can proceed. This verification process was creating a significant operational bottleneck, with roughly 7,000 calls per week requiring human agents to ask three standardized questions: whether income sources would continue for the next three months, how the applicant planned to spend the loan funds, and whether they had any outstanding obligations like back taxes or wage garnishments.

Each call consumed 5-7 minutes of agent time, and the company found itself in a massive backlog situation where more people were applying for loans than the team could process. The mundane nature of the work—repeating the same three questions throughout the day—made it particularly unsuitable for human agents. This presented what the team identified as a limited scope, low-risk, high-reward opportunity for voice AI implementation that would meet customers where they are (including availability for middle-of-the-night calls), reduce backlog, and improve conversion rates.

## Architectural Decision-Making: Multimodal vs. Cascading

One of the most critical technical decisions involved choosing between two fundamentally different architectural approaches for the voice bot: multimodal architecture versus cascading architecture. This decision reveals important tradeoffs in production LLM systems that are often underappreciated.

The multimodal architecture approach involves using models like GPT Realtime or AWS Nova Sonic that can directly process audio input and produce audio output, essentially treating the entire pipeline as a single end-to-end model. The advantages of this approach were clear: extremely fast response times under half a second, and significantly lower complexity due to having fewer moving parts. However, the team discovered critical limitations including premium pricing, limited customization options, and crucially, no ability to intercept and intervene in the processing pipeline.

The cascading architecture takes a more modular approach, dividing the system into three distinct stages: speech-to-text transcription that produces text, an LLM that reasons over the text, and text-to-speech synthesis for the response. While this introduced more complexity with multiple moving parts and potential points of failure, it provided ultimate flexibility in choosing specialized providers for each component and crucially enabled granular control over the pipeline. This control proved essential for implementing features like conversation time limits—since LLMs have no concept of time, the only way to enforce a four-minute cutoff (required for regulatory compliance to prevent misuse) was to intercept between pipeline stages and programmatically route to call termination.

The team ultimately chose the cascading architecture, which proved prescient given the numerous production challenges they encountered that required precisely this kind of granular control and intervention capability.

## Multi-Vendor Journey and Production Challenges

The path to production was far from smooth, involving three major pivots in their technology stack. The team initially pursued AWS Nova Sonic, motivated by having a good relationship with AWS and direct access to the Nova Sonic team. During development everything appeared to work well, but upon moving to staging, the system experienced severe CPU and memory usage spikes. After several weeks of investigation, the team discovered the issue lay within AWS's boto3 library. This consumed approximately three weeks of development time and represented a critical lesson about vendor-specific implementation challenges.

Unable to wait for AWS to resolve the boto3 issues, the team pivoted to OpenAI, which offered flexibility for both multimodal and cascading architectures through Whisper for transcription and their speech capabilities. Interestingly, everything worked seamlessly on local development machines, but staging revealed a devastating latency problem: the bot would take approximately 8 seconds to respond after a user spoke. The team learned that such challenges vary unpredictably across cloud providers and depend on factors like which data center requests route to. Even more surprisingly, they discovered that newer OpenAI models like GPT-4 mini and GPT-4o mini performed worse on latency than earlier versions, requiring extensive experimentation with different model combinations.

The third and ultimately successful approach combined Google for speech-to-text, Gemini Flash Lite as the inference layer, and Ryme for text-to-speech synthesis. This combination finally eliminated CPU spikes, achieved acceptable latency of around one second between turns, and provided good reasoning capability. The team began development in August and reached production by November, though the speaker acknowledged it took longer than expected.

## Production Bugs and Edge Cases

The production deployment revealed a remarkably diverse set of edge cases and failure modes that illustrate the complexity of voice AI in real-world settings. These challenges demonstrate that even seemingly simple applications require extensive debugging and iteration.

The early termination bug involved the bot hanging up prematurely when saying goodbye, with the word "goodbye" finishing but the call immediately terminating. This turned out to be an issue with the Pipecat orchestration library, requiring collaboration with the Daily team to fix. The interim solution involved sending blank audio buffer frames to force the bot to wait until the goodbye message completed.

The phantom yes problem was particularly insidious. When users paused too long, a silence detector would kick in asking "Are you there?" If the user responded "yes," the bot would interpret this as an affirmative answer to the previous question about income continuation, completely losing context. This context-tracking issue proved surprisingly challenging to fix and required extensive prompt engineering to resolve.

The Moby Dick incident reveals the importance of conversation guardrails. During testing, an engineer read Moby Dick to the bot, after which it would only answer questions related to the novel and engaged in a ten-minute literary discussion. For a regulated fintech company, this presented unacceptable risk of misuse as a therapy bot or off-topic conversation tool. The solution was implementing a four-minute conversation cutoff, which as mentioned earlier, could only be accomplished through the cascading architecture's ability to intercept and intervene.

The first message freeze represented another architectural challenge. If users interrupted during the bot's initial message, the system would freeze—still alive but completely unresponsive. The team solved this by using Pipecat's functionality to temporarily mute the user during the first turn, preventing interruptions from breaking the system. They later integrated better models from providers like Krisp that handle this situation more gracefully.

## Infrastructure and Connectivity Challenges

WebRTC infrastructure emerged as one of the biggest production challenges. The team initially attempted to host WebRTC within their AWS infrastructure but achieved only a 50% connectivity rate—completely unacceptable for production. The speaker's strong recommendation was clear: if building voice infrastructure on WebRTC, do not attempt to build it yourself due to its complexity. After switching to Daily as a managed provider for the WebRTC layer, the team saw connectivity issues drop to essentially 0%.

Background noise represented another significant real-world challenge, as demonstrated in the demo where a child's voice in the background caused the bot to miss user responses entirely. The team addressed this by integrating Krisp, which intercepts and cleans audio to isolate foreground speech before passing it to the transcription layer.

## Model Behavior Drift and Output Sanitization

One of the most surprising production issues emerged several months after successful deployment: Gemini suddenly developed what the speaker described as a "Gen Z personality," beginning to include emojis or even Chinese characters in its inference layer outputs. This was compounded by a simultaneous regression in the text-to-speech model, which began reading out emojis instead of filtering them. The result was the bot outputting controversial or inappropriate content—particularly problematic for a regulated financial services company. The team had to build a custom filtering layer to strip out all non-English characters before passing text to the TTS system.

This incident illustrates a critical but underappreciated challenge in production LLM systems: model behavior can drift over time even without any changes to your code or prompts. Providers update their models, and these updates can introduce unexpected behavior changes that break previously working systems.

## Transcription Challenges and Specialized Model Solutions

Certain transcription errors proved remarkably persistent. The word "no" is frequently misinterpreted as "now" or "know," especially with Southern accents. In a yes/no question context, this causes the bot to become confused and repeat questions, degrading user experience. The team's solution involved building a small specialized model that understands the context of the previous question and, if it was a yes/no question, maps the transcription output to just "yes" or "no" despite transcription errors. Notably, they still have not been able to fix the underlying transcription errors through model improvements alone, requiring this downstream correction layer.

## Monitoring, Evaluation, and Testing

The team recognized that comprehensive monitoring and evaluation were critical for production voice systems. For simulations and testing, they needed to account for different acoustic environments, conversation scenarios, languages, and speech variations. Real-time performance monitoring tracked metrics including number of turns, time between turns, and time-to-first-byte. The team used two primary tools: Arize for general observability and tracing, and Coval specifically for voice-related evaluation. The speaker particularly recommended Coval for voice use cases due to its audio-specific metrics and out-of-the-box functionality for voice applications.

## Production Performance and Business Impact

After six months in production, the system demonstrated strong performance metrics: latency between turns reduced to approximately 2 seconds, handling 4,000 calls per week with 96% accuracy. Cost efficiency was substantial at $0.86 per call compared to approximately $5 with human agents. The solution successfully reduced the application backlog and improved conversion rates while freeing human agents from repetitive, mundane work they did not enjoy.

## Ecosystem and Community Support

The speaker emphasized the collaborative nature of solving these challenges, noting extensive work with Databricks, AWS, Coval, Arize, and Pipecat. The relative newness of production voice AI meant that the entire community was learning together, with vendors invested in customer success and willing to spend significant time debugging issues. This ecosystem support proved crucial to eventual success.

## Critical Assessment

While the case study presents impressive results, several caveats and considerations deserve attention. The 96% accuracy figure, while strong, still means 4% of calls fail to achieve their goal—approximately 160 calls per week given their volume. The text does not detail what happens with these failed calls or whether they require human escalation. The cost comparison of $0.86 versus $5 per call likely does not account for the extensive development time, ongoing monitoring infrastructure, and engineering resources required to build and maintain the system.

The numerous pivots and production issues—requiring three major technology stack changes and months of debugging—suggest that voice AI remains significantly more challenging than text-based LLM applications. Organizations should budget substantially more development time than initially estimated. The model drift issue with Gemini suddenly developing a "Gen Z personality" raises important questions about production stability and the ongoing maintenance burden of LLM-based systems that extend beyond typical software maintenance.

The reliance on multiple third-party providers (Google, Ryme, Pipecat, Daily, Krisp, Coval, Arize) creates a complex vendor dependency web with potential points of failure and ongoing cost implications. The case study would benefit from more detailed cost analysis including total cost of ownership beyond per-call costs. Nevertheless, for the specific use case of standardized verification questions with limited scope, the solution appears well-suited and the cascading architecture's flexibility proved essential for handling the numerous edge cases and production challenges encountered.
