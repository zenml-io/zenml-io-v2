---
title: "Building an AI-Powered Email Writing Assistant with Personalized Style Matching"
slug: "building-an-ai-powered-email-writing-assistant-with-personalized-style-matching"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3babed978765d2d03604"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:37:51.553Z"
  createdOn: "2024-11-21T13:54:51.310Z"
llmopsTags:
  - "data-cleaning"
  - "data-integration"
  - "databases"
  - "embeddings"
  - "fine-tuning"
  - "guardrails"
  - "openai"
  - "prompt-engineering"
  - "reliability"
  - "scalability"
  - "security"
  - "semantic-search"
  - "vector-search"
industryTags: "tech"
company: "Ghostwriter"
summary: "Shortwave developed Ghostwriter, an AI writing feature that helps users compose emails that match their personal writing style. The system uses embedding-based semantic search to find relevant past emails, combines them with system prompts and custom instructions, and uses fine-tuned LLMs to generate contextually appropriate suggestions. The solution addresses two key challenges: making AI-generated text sound authentic to each user's style and incorporating accurate, relevant information from their email history."
link: "https://www.youtube.com/watch?v=9B-BiKH_xjg"
year: 2024
seo:
  title: "Ghostwriter: Building an AI-Powered Email Writing Assistant with Personalized Style Matching - ZenML LLMOps Database"
  description: "Shortwave developed Ghostwriter, an AI writing feature that helps users compose emails that match their personal writing style. The system uses embedding-based semantic search to find relevant past emails, combines them with system prompts and custom instructions, and uses fine-tuned LLMs to generate contextually appropriate suggestions. The solution addresses two key challenges: making AI-generated text sound authentic to each user's style and incorporating accurate, relevant information from their email history."
  canonical: "https://www.zenml.io/llmops-database/building-an-ai-powered-email-writing-assistant-with-personalized-style-matching"
  ogTitle: "Ghostwriter: Building an AI-Powered Email Writing Assistant with Personalized Style Matching - ZenML LLMOps Database"
  ogDescription: "Shortwave developed Ghostwriter, an AI writing feature that helps users compose emails that match their personal writing style. The system uses embedding-based semantic search to find relevant past emails, combines them with system prompts and custom instructions, and uses fine-tuned LLMs to generate contextually appropriate suggestions. The solution addresses two key challenges: making AI-generated text sound authentic to each user's style and incorporating accurate, relevant information from their email history."
---

## Overview

Shortwave is a startup building an AI-first email client that integrates with Gmail, positioning itself as a smarter alternative to traditional email interfaces. Their feature called "Ghost Rider" provides AI-powered email writing assistance that learns from individual users to produce drafts and autocomplete suggestions that authentically match their personal writing style. This case study, presented by one of the co-founders and CTO (Johnny), provides a detailed look at the architecture and production challenges of building a personalized AI writing system.

The company has been working on this product for approximately four years, with AI integration exploration beginning around two and a half years ago—notably before the widespread ChatGPT frenzy. This early start gave them experience with the fundamental challenges that led to the creation of many modern LLMOps frameworks, while also requiring them to adapt rapidly as the landscape evolved.

## The Problem Space

The case study identifies two fundamental problems with using generic LLMs (like GPT-4) for email writing:

- **Style Mismatch**: When you ask a standard LLM to write an email, it produces generic, boilerplate text with phrases like "I hope this message finds you well" followed by long-winded paragraphs. This doesn't match how individual users actually write, making the output feel obviously AI-generated and unsuitable for sending without significant editing.

- **Information Accuracy**: Generic LLMs cannot include specific, factual information relevant to the user's context—things like promo codes, Wi-Fi passwords, office addresses, or other details that would naturally appear in real correspondence. Without access to this information, the AI either omits crucial details or hallucinates incorrect ones.

## Solution Architecture

The Ghost Rider system employs a Retrieval-Augmented Generation (RAG) architecture specifically designed for personalized email writing. The system consists of two main pipelines:

### Indexing Pipeline (Offline Stage)

The indexing pipeline processes all incoming emails through an embedding model, storing the resulting vectors in a vector database. This creates a semantic index of the user's entire email history, making it readily available for similarity searches when needed. A critical prerequisite for this pipeline is a robust email data cleaning system that extracts the actual text content from emails—separating it from nested reply threads, quoted text, and other formatting artifacts that make raw email data notoriously messy.

The speaker acknowledges that building this data cleaning pipeline was substantial work but proved invaluable across multiple features. Having clean text representations of emails enables not just the writing feature but also AI search, summarization, and other capabilities. However, they note there's still ongoing work to improve data cleanup, as email remains "really really messy."

### Query Pipeline (Real-time Stage)

When a user requests an email draft or is actively writing in the editor:

- The current thread or draft is run through the same embedding model
- Semantic similarity search finds emails the user has previously sent that are similar to the current context
- The top 5-10 most relevant emails are retrieved (with the exact number depending on email length and other conditions)
- These examples are combined with a system prompt, custom user instructions (preferred language, sign-offs, etc.)
- The combined prompt is sent to an LLM, which generates output mimicking both the style and content of the examples

The key insight is that providing the LLM with examples of the user's own writing accomplishes both goals simultaneously: the AI can mimic the user's writing style from the examples, and if those examples contain relevant factual information, the AI will appropriately incorporate that information into new drafts.

## Approaches Tried and Evaluated

The team experimented with multiple approaches before arriving at their current solution:

### Psychological Style Descriptions
Their first version created a textual description of the user's writing style by analyzing 10 representative emails with an LLM. This produced a "psychological profile" covering sentence structure, tone (professional vs. casual), emoji usage, technical terminology, and other dimensions. This description was added to the system prompt. The team reports this worked "fairly well" and was "surprisingly accurate."

### Per-User Fine-Tuning on Sent Emails
They experimented with fine-tuning models on individual users' sent emails, which worked "really really well" at capturing unique writing styles. However, this approach proved "very challenging to do at scale across all users" at the time. The speaker notes that per-user fine-tuning may become more feasible in the future as costs decrease.

### Few-Shot Learning with Examples
They discovered that simply including examples of the user's past emails in the prompt allows the LLM to effectively mimic the style. This became the foundation of their production system.

## Model Selection and Fine-Tuning

For the AI assistant's draft generation, Shortwave uses "off-the-shelf GPT-4." However, the autocomplete feature (which suggests completions as you type in the editor) required custom fine-tuning to achieve acceptable quality.

### Autocomplete-Specific Challenges

The autocomplete use case presents unique requirements that proved difficult to solve with prompt engineering alone:

- **Whitespace and Formatting**: The model needs to correctly handle spacing and punctuation. For example, if the user has typed "happy to," the model must output " help" (with a leading space), not "happy to help" (which would duplicate text).

- **Cursor Position Handling**: The model must correctly continue text from arbitrary cursor positions—beginning of draft, end of sentence, mid-word, or at the end of a completed draft.

- **Knowing When to Stop**: The model needed to learn when a draft is complete and not continue suggesting repetitive additions.

Despite extensive prompt engineering attempts, they "could not get it to reliably output the right thing" with instructions alone. This necessitated fine-tuning.

### Fine-Tuning Approach

A key finding was that fine-tuning is remarkably effective with small datasets: **only 400-500 examples were needed for "massive" improvements**. The training data was synthesized from real emails using the following methodology:

- Take an actual sent email
- Simulate the writing process by performing semantic similarity search as if writing that email
- Randomize cursor position within the email (start, end, mid-sentence, mid-word)
- Use the remainder of the email (either complete rest or just the current paragraph) as the target completion

For fact lookup capabilities, they handcrafted approximately a dozen examples where specific facts (Wi-Fi passwords, office addresses, phone numbers) appeared in the example emails and should be incorporated into the output. Critically, they also included examples where information was missing to teach the model not to hallucinate facts.

## Safety and User Experience Considerations

A guiding principle mentioned is "no actions without user confirmation." The team explicitly acknowledges that LLMs are vulnerable to hallucination and prompt injection attacks. Their mitigation strategy is to keep humans in the loop for all consequential actions:

- The AI writes emails but doesn't send them automatically
- The AI can suggest calendar events but won't add them without confirmation
- All AI suggestions require explicit user acceptance

This represents a thoughtful production approach to deploying AI in sensitive contexts where incorrect actions could have real consequences.

## Modular Architecture for Rapid Iteration

The speaker emphasizes building systems where components can be swapped out independently. For example, they don't rely on a specific embedding model—the infrastructure supports changing models, with the understanding that switching would require reprocessing embeddings and additional compute. This modularity allows them to:

- Start new users on updated models while maintaining existing user experiences
- Experiment with different components without full system rewrites
- Quickly adopt new models as the landscape evolves (they note optimal models change "on a weekly or monthly basis")

## Future Directions

The team outlined several areas for continued development:

- **Expanded Fine-Tuning**: More diverse examples, additional languages, larger training sets, and incorporating user acceptance/rejection signals as training feedback
- **Per-User Fine-Tuning**: Becoming more feasible as costs decrease
- **Improved Retrieval**: Moving beyond simple similarity to cross-encoding, exploring more fine-grained snippets (extracting just relevant text rather than full emails), and using multiple embeddings per email to capture different semantic aspects
- **Model Experimentation**: Evaluating new models as they become available
- **Learning from User Edits**: Using changes users make to generated drafts as training signal (not yet implemented)
- **Proactive AI**: Moving from user-initiated to AI-initiated suggestions (e.g., automatically showing calendar availability when someone asks about meeting times)

## Production Realities and Lessons Learned

Several candid observations emerged about building AI products in production:

- **Trial and Error**: Much of the development process involved experimentation and learning from failures
- **Avoiding Premature Limitations**: Multiple team members reported being proven wrong when claiming something was impossible—the guidance is to try things before concluding they won't work
- **Self-Reflection Through AI**: Using the system revealed uncomfortable truths about personal writing habits (overused phrases, passive voice patterns)
- **Reusable Infrastructure**: Investments in data pipelines and vector databases pay dividends across multiple features
- **Rapid Landscape Changes**: Information from six months ago is already outdated; staying current is essential

The case study provides a realistic view of the iterative, experimental nature of LLMOps work, while demonstrating how thoughtful architecture decisions and targeted fine-tuning can solve problems that prompt engineering alone cannot address.