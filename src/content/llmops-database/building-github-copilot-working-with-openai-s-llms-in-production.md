---
title: "Building GitHub Copilot: Working with OpenAI's LLMs in Production"
slug: "building-github-copilot-working-with-openai-s-llms-in-production"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694ad9b958519648e4aee748"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:12:19.317Z"
  createdOn: "2025-12-23T18:04:41.880Z"
llmopsTags:
  - "code-generation"
  - "chatbot"
  - "prompt-engineering"
  - "fine-tuning"
  - "few-shot"
  - "token-optimization"
  - "latency-optimization"
  - "model-optimization"
  - "fastapi"
  - "monitoring"
  - "documentation"
  - "open-source"
  - "openai"
  - "microsoft-azure"
industryTags: "tech"
company: "GitHub"
summary: "GitHub developed GitHub Copilot by integrating OpenAI's large language models, starting with GPT-3 and evolving through multiple iterations of the Codex model. The problem was creating an effective AI-powered code generation tool that could work seamlessly within developer IDEs. The solution involved extensive prompt crafting to create optimal \"pseudo-documents\" that guide the model toward better completions, fine-tuning on specific codebases, and implementing contextual improvements such as incorporating code from neighboring editor tabs and file paths. The results included dramatic improvements in code acceptance rates, with the multilingual model eventually solving over 90% of test problems compared to about 50% initially, and noticeable quality improvements particularly for non-top-five programming languages when new model versions were deployed."
link: "https://github.blog/2023-05-17-inside-github-working-with-the-llms-behind-github-copilot/"
year: 2023
seo:
  title: "GitHub: Building GitHub Copilot: Working with OpenAI's LLMs in Production - ZenML LLMOps Database"
  description: "GitHub developed GitHub Copilot by integrating OpenAI's large language models, starting with GPT-3 and evolving through multiple iterations of the Codex model. The problem was creating an effective AI-powered code generation tool that could work seamlessly within developer IDEs. The solution involved extensive prompt crafting to create optimal \"pseudo-documents\" that guide the model toward better completions, fine-tuning on specific codebases, and implementing contextual improvements such as incorporating code from neighboring editor tabs and file paths. The results included dramatic improvements in code acceptance rates, with the multilingual model eventually solving over 90% of test problems compared to about 50% initially, and noticeable quality improvements particularly for non-top-five programming languages when new model versions were deployed."
  canonical: "https://www.zenml.io/llmops-database/building-github-copilot-working-with-openai-s-llms-in-production"
  ogTitle: "GitHub: Building GitHub Copilot: Working with OpenAI's LLMs in Production - ZenML LLMOps Database"
  ogDescription: "GitHub developed GitHub Copilot by integrating OpenAI's large language models, starting with GPT-3 and evolving through multiple iterations of the Codex model. The problem was creating an effective AI-powered code generation tool that could work seamlessly within developer IDEs. The solution involved extensive prompt crafting to create optimal \"pseudo-documents\" that guide the model toward better completions, fine-tuning on specific codebases, and implementing contextual improvements such as incorporating code from neighboring editor tabs and file paths. The results included dramatic improvements in code acceptance rates, with the multilingual model eventually solving over 90% of test problems compared to about 50% initially, and noticeable quality improvements particularly for non-top-five programming languages when new model versions were deployed."
---

## Overview

GitHub Copilot represents one of the most significant production deployments of large language models for code generation, demonstrating the evolution of LLMOps practices from early experimentation with GPT-3 in 2020 through continuous model improvements and refinements. This case study provides deep insights into how GitHub's engineering and research teams worked with OpenAI's evolving LLM capabilities to build, test, and iteratively improve a developer-facing AI tool that operates within integrated development environments.

The journey began in June 2020 when OpenAI released GPT-3, which finally made general-purpose code generation feasible after years of the technology being considered too difficult. GitHub's initial evaluation process involved giving the model coding-like tasks through crowdsourced self-contained problems. The early model could solve approximately 50% of these problems, but improvements came rapidly, with accuracy climbing to over 90%. This initial success led the team to first conceptualize an AI-powered chatbot for answering coding questions, but they quickly pivoted to IDE integration when they discovered this modality was "interactive and useful in almost every situation."

## Model Evolution and Selection

GitHub's collaboration with OpenAI involved working through multiple model iterations. The first model OpenAI provided was Python-only, followed by a JavaScript model and then a multilingual model. Interestingly, the JavaScript model exhibited particular problems that the multilingual model did not have, and it came as a surprise to the team that the multilingual model could perform so well. This challenged assumptions about specialization versus generalization in model training. In 2021, OpenAI released the multilingual Codex model, built in partnership with GitHub, which was an offshoot of GPT-3 trained on billions of lines of public code. The Codex model contained upwards of 170 billion parameters and could generate both natural language and code suggestions.

As GitHub Copilot moved toward launch as a technical preview, the team established a dedicated Model Improvements team responsible for monitoring and improving quality through better communication with the underlying LLM. This team focused on increasing "completion" rates—the measure of when users accept and keep GitHub Copilot suggestions in their code. The two primary techniques they employed were prompt crafting and fine-tuning.

## Prompt Crafting Techniques

Prompt crafting emerged as a critical LLMOps practice for GitHub Copilot. At its core, the LLM is a document completion model trained on partial documents, learning to complete them one token at a time. The art of prompt crafting involves creating a "pseudo-document" that leads the model to a completion that benefits the customer. Rather than simply providing the model with the file the user is currently editing, the team discovered they could look for additional pieces of context inside the IDE that could hint the model toward better completions.

One of the most impactful prompt crafting improvements involved pulling similar text from the user's neighboring editor tabs. This single change resulted in a huge lift in acceptance rate and characters retained. The underlying philosophy is particularly noteworthy: making developers more productive by incorporating the way they think about code into the algorithm itself. Where developers might flip back and forth between tabs to reference code, GitHub Copilot does this automatically, providing completions as if the user had taken the time to look up that information manually.

Another significant improvement came from adding the file path at the top of the document rather than just the language name. While a language header helped prevent the model from suggesting Python code in a C# project, the file path provided much richer context. For example, a file named "connectiondatabase.py" signals both the programming language and that the file likely deals with databases or connections, allowing GitHub Copilot to suggest appropriate boilerplate code like SQL library imports. This simple change solved language confusion issues and improved quality by a surprising margin.

Later iterations introduced a component that lifted code from other files open in the IDE, scanning for similar text to what's at the current cursor position. This represented a major architectural advancement in context handling and resulted in a huge boost in code acceptance because GitHub Copilot suddenly had awareness beyond the single file being edited.

## Fine-Tuning Approaches

Fine-tuning is employed to adapt the pre-trained model for specific tasks or domains by training it on smaller, more specific datasets relevant to particular use cases. In GitHub Copilot's case, this involves training the underlying Codex model on a user's specific codebase to provide more focused, customized completions. The challenge lies in understanding why users reject or accept suggestions—determining what context or information served to the model caused helpful or unhelpful outputs.

The team acknowledges they cannot troubleshoot in the typical engineering way given the statistical nature of large language models. Instead, they must figure out how to ask the right questions to get desired outputs. It's particularly difficult to statistically define what constitutes a "good" response when working with models containing hundreds of billions of parameters. The fine-tuning work focuses on learning from user acceptance and rejection patterns to understand which contextual signals lead to better suggestions.

## Model Performance and Quality Improvements

The case study provides specific examples of how model improvements manifested in user experience. When OpenAI released the third iteration of Codex, the improvements were substantial enough to be felt by end users, particularly when working with programming languages outside the top five most popular languages. One team member recounts working on a programming competition in F# and experiencing dramatically better suggestions within 24 hours of the new model being deployed—a noticeable "magic" moment where the quality leap was immediately apparent.

Early versions of GitHub Copilot had the tendency to suggest lines of code in completely different programming languages, creating poor developer experiences. The team addressed this through the headline and file path improvements mentioned earlier, but these issues highlight the challenges of working with general-purpose models in specific contexts. Deep within a file, the model could understand context, but at the top of files where ambiguity existed, early models defaulted to the most popular languages in their training data.

## LLMOps Challenges and Learnings

Several important LLMOps principles emerge from GitHub's experience. First, the value of iterative model evaluation using real-world tasks—the crowdsourced programming problems approach provided early validation but became obsolete as models improved too much to be tested this way. Second, the critical importance of modality selection—the pivot from a question-and-answer chatbot to IDE integration fundamentally changed the product's value proposition and user experience.

Third, the discovery that multilingual models could outperform specialized single-language models challenged conventional wisdom about model design. Fourth, the recognition that context engineering (through prompt crafting) can be as important as model architecture in determining output quality. The neighboring tab content and file path improvements demonstrate how understanding developer workflow can inform better context selection strategies.

Fifth, the difficulty of debugging and troubleshooting statistical models compared to traditional software. The team cannot simply trace through code execution but must instead develop intuitions about what contextual signals will elicit desired model behaviors. Sixth, the importance of acceptance metrics as a north star for measuring product quality—GitHub's focus on completion rates provides a clear signal of whether improvements actually help users in practice.

## Production Deployment Considerations

While the case study focuses primarily on model selection and prompt engineering, it touches on the operational aspects of deploying LLMs in production. The fact that model updates could be felt by users within 24 hours suggests a deployment pipeline capable of relatively rapid model swapping. The existence of a dedicated Model Improvements team indicates organizational specialization around LLM quality management.

The case study also implicitly addresses the challenge of managing model costs and latency through prompt optimization—pulling just the right amount of context from neighboring files and using file paths effectively allows the model to generate better suggestions without exponentially increasing prompt sizes. The focus on in-IDE integration requires low-latency responses, placing constraints on model selection and prompt complexity.

## Critical Assessment

While this case study provides valuable insights into GitHub's LLMOps practices, readers should note that it comes from GitHub's own blog and thus represents a somewhat promotional narrative. The claimed improvements in acceptance rates and quality are not accompanied by detailed metrics or independent validation. The case study focuses heavily on successes and learning moments while providing limited discussion of ongoing challenges, failures, or limitations.

The reliance on OpenAI's proprietary models also means GitHub's LLMOps practices are constrained by what their model provider offers. The case study mentions receiving model "drops" from OpenAI, suggesting limited control over model architecture and training compared to companies developing models in-house. This dependency relationship is common in LLMOps but does introduce risks around model availability, pricing changes, and alignment between provider and user needs.

The discussion of fine-tuning is relatively brief and lacks technical detail about datasets, training procedures, or how user acceptance data flows back into model improvements. Similarly, the prompt crafting examples provided are helpful but represent only a subset of the likely hundreds of experiments and iterations the team conducted. The case study would benefit from more discussion of failures, dead ends, and tradeoffs made during development.

## Future Directions

The case study concludes by mentioning GitHub Copilot X, announced in March 2023, which aims to bring AI beyond the IDE to more components of the GitHub platform, including documentation and pull requests. This suggests an expansion of LLMOps practices from single-point code completion to broader workflow integration. The evolution from Copilot to Copilot X indicates how successful LLM deployment in one area can catalyze exploration of adjacent use cases, with the infrastructure and learnings from initial deployment supporting expansion.

Overall, this case study demonstrates mature LLMOps practices around model evaluation, prompt engineering, contextual optimization, and iterative improvement based on user acceptance metrics. It highlights the importance of understanding user workflows and thinking carefully about how to provide models with the right context to generate valuable outputs. While light on operational details like deployment infrastructure, monitoring, and cost management, it provides valuable insights into the product development and model optimization aspects of bringing LLMs to production at scale.