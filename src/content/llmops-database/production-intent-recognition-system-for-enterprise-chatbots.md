---
title: "Production Intent Recognition System for Enterprise Chatbots"
slug: "production-intent-recognition-system-for-enterprise-chatbots"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ba5cde8495fec1051bf"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:42:36.465Z"
  createdOn: "2024-11-21T13:54:45.035Z"
llmopsTags:
  - "api-gateway"
  - "cache"
  - "chatbot"
  - "customer-support"
  - "error-handling"
  - "fallback-strategies"
  - "few-shot"
  - "microservices"
  - "microsoft-azure"
  - "monitoring"
  - "prompt-engineering"
  - "reliability"
  - "scalability"
industryTags: "tech"
company: "FeedYou"
summary: "FeedYou developed a sophisticated intent recognition system for their enterprise chatbot platform, addressing challenges in handling complex conversational flows and out-of-domain queries. They experimented with different NLP approaches before settling on a modular architecture using NLP.js, implementing hierarchical intent recognition with local and global intents, and integrating generative models for handling edge cases. The system achieved a 72% success rate for local intent matching and effectively handled complex conversational scenarios across multiple customer deployments."
link: "https://www.youtube.com/watch?v=_KcsYUv2iuA"
year: 2023
seo:
  title: "FeedYou: Production Intent Recognition System for Enterprise Chatbots - ZenML LLMOps Database"
  description: "FeedYou developed a sophisticated intent recognition system for their enterprise chatbot platform, addressing challenges in handling complex conversational flows and out-of-domain queries. They experimented with different NLP approaches before settling on a modular architecture using NLP.js, implementing hierarchical intent recognition with local and global intents, and integrating generative models for handling edge cases. The system achieved a 72% success rate for local intent matching and effectively handled complex conversational scenarios across multiple customer deployments."
  canonical: "https://www.zenml.io/llmops-database/production-intent-recognition-system-for-enterprise-chatbots"
  ogTitle: "FeedYou: Production Intent Recognition System for Enterprise Chatbots - ZenML LLMOps Database"
  ogDescription: "FeedYou developed a sophisticated intent recognition system for their enterprise chatbot platform, addressing challenges in handling complex conversational flows and out-of-domain queries. They experimented with different NLP approaches before settling on a modular architecture using NLP.js, implementing hierarchical intent recognition with local and global intents, and integrating generative models for handling edge cases. The system achieved a 72% success rate for local intent matching and effectively handled complex conversational scenarios across multiple customer deployments."
---

## Overview

This case study is drawn from a machine learning meetup (MLMU Prague) featuring two complementary presentations on chatbot development in production environments. The first presentation by Tomáš from FeedYou discusses their practical experiences with intent matching using lightweight NLP models, while the second by Honza from Prometeus AI covers their Flowstorm conversational AI platform built on lessons learned from winning the Alexa Prize competition. Together, they provide valuable insights into the operational challenges and solutions for deploying conversational AI systems at scale.

## FeedYou's Chatbot Platform and NLP Approach

FeedYou develops a visual chatbot designer tool called Feedbot Designer that allows users to build chatbots through drag-and-drop interfaces and deploy them to channels like Facebook Messenger and web chat. The majority of their chatbots operate on tree structures—essentially branching scenarios where the bot follows predefined routes. These structures can become quite complex, with hundreds of dialogues and conditions, particularly for production use cases in domains like HR and market research.

### Production Results and Use Case

FeedYou shared compelling production statistics: approximately 72% of customer queries handled by their chatbots don't require human intervention, allowing support staff to focus on more complex problems. They also noted that about half of users interact with chatbots outside of standard working hours, demonstrating the value of automated conversational systems for 24/7 availability.

One highlighted case was their work with Ipsos for market research, where chatbots collect survey responses from users. The HR domain was also mentioned as particularly successful for their platform.

### User Input Analysis and Model Performance

A critical insight from FeedYou's production data analysis was the distribution of user input lengths. Looking at one month of data from a QnA bot with over 4,000 queries, they found that most inputs are very short—typically one or two words. Approximately 25% of inputs are essentially noise (greetings like "hello" or random text), which tends to skew toward one or two words.

More importantly, they discovered an inverse relationship between input length and match success rate: shorter inputs are matched successfully more often, while longer inputs (50+ words) see dramatically lower match rates. This finding had significant implications for their model selection and training strategy.

### Model Selection: NLP.js vs. FastText

FeedYou uses NLP.js, a lightweight JavaScript library specifically designed for chatbots. When they evaluated whether more sophisticated models like Facebook's FastText would improve results, they found no significant benefit for their use case. The reasons were instructive:

- User inputs are typically too short (1-2 words) for FastText to derive meaningful context
- Each chatbot has its own NLP model rather than sharing a common model across all bots
- Training data is extremely limited—typically 10-20 intents with a maximum of 20 examples each
- NLP.js is optimized for exactly this scenario of small datasets and short inputs
- Model training is fast (approximately 3 seconds on Azure), enabling rapid iteration
- The entire codebase is JavaScript, avoiding the complexity of multiple languages

The NLP.js pipeline involves normalization (removing accents and punctuation), tokenization (splitting by spaces), optional stop word removal (though they found keeping stop words helped with very short inputs), stemming (removing word endings), and finally classification via a neural network. The output includes confidence scores for each intent plus a list of recognized entities.

### Multi-Model Approach Challenges

FeedYou experimented with splitting intents across multiple models to improve matching accuracy. While this did improve match rates for targeted intents, it introduced a worse problem: incorrect matches with high confidence. In one example, a small talk model containing a "marry me" intent with the phrase "meet me at the altar" would incorrectly match when users asked to "schedule a meeting" because "meet" appeared only once in that model's vocabulary.

This taught them that false positives create worse user experiences than acknowledging "I don't understand"—when users receive an incorrect answer, it's more frustrating than being asked to rephrase their question.

### Intent Consolidation with Named Entity Recognition

Their most successful approach involved consolidating similar intents and using named entity recognition to determine user intent. For example, instead of separate "forgotten password" and "new password" intents that the model struggles to distinguish, they created a single "password" intent with a custom named entity for "action" (forgotten vs. new).

The dialog flow then handles disambiguation: if the entity is recognized, it routes to the appropriate branch; if not, the bot asks a clarifying question. This approach improved both model accuracy and user experience, as the bot appears to engage in natural conversation rather than failing silently.

### Real-Time Model Validation

FeedYou implemented a validation system that runs during chatbot development. Every time a user modifies the NLP model, the system:

- Trains the model (approximately 3 seconds)
- Tests every training example against the model
- Flags warnings when examples don't match their intended intent or when multiple intents have similar confidence scores

This provides immediate feedback to chatbot designers about overlapping intents that need refinement.

## Prometeus AI's Flowstorm Platform

The second presentation by Honza from Prometeus AI covered their Flowstorm conversational AI platform, which evolved from four years of competing in the Amazon Alexa Prize (winning the final year with their "Alquist" bot). This background is notable because the Alexa Prize requires building coherent, engaging social chatbots capable of open-domain conversation—a significantly more challenging task than task-oriented bots.

### Lessons from Alexa Prize Competition

The Alexa Prize required handling long-tail content with generic conversation handlers, manually managing engaging content, quickly creating and testing conversational models, implementing dialog management logic, and incorporating external knowledge (sports scores, movie information, etc.).

Their early approach used a visual editor to design flows, export to code, train NLU models, implement custom logic, and redeploy the entire application. This process was slow and created versioning problems since the visual state was separate from the code state. The complexity of managing high-level intent recognition combined with hierarchical intent recognition across topics led to edge cases and development speed issues.

### Sub-Dialog Hierarchy Architecture

Flowstorm's architecture is built around sub-dialogs—modular conversation components that can be nested hierarchically. The main dialog serves as an entry point, with sub-dialog nodes that reference other sub-dialogs. When the flow enters a sub-dialog, it follows that sub-dialog's flow until reaching an exit node, then returns to the parent dialog.

Benefits of this approach include:

- **Reusability**: A sub-dialog about favorite movies can be plugged into a beer bot, film bot, or general entertainment bot
- **Modularity**: Easier maintenance and sharing across applications
- **Testability**: Sub-dialogs can be tested in isolation
- **Development speed**: Changes to sub-dialogs don't require full application redeployment

### Hierarchical Intent Recognition

The sub-dialog architecture necessitated a hierarchical approach to intent recognition with four categories:

- **Local intents**: Expected responses immediately following a bot question (e.g., "I'm fine" after "How are you?")
- **Global intents**: Applicable anywhere within a specific dialog (e.g., "help" commands)
- **Parent global intents**: Global intents from parent dialogs that remain active in nested sub-dialogs (e.g., "stop" commands)
- **Out-of-domain**: Utterances not matching any active intent

Their production data showed that local intents account for approximately 73% of matches, global intents 11%, and out-of-domain 16%—though these numbers vary based on dialog structure.

### Model Architecture and Classification Approach

Flowstorm uses one model per decision point (for local intents) plus one model per dialog (for global intents). This results in multiple models that must be combined at runtime, but enables modular development where sub-dialogs can be developed and tested independently.

They evaluated two classification approaches:

- **Bottom-up**: Classify against local intents first (plus out-of-domain), then move to global intents if out-of-domain, continuing up the hierarchy. This required explicit out-of-domain training examples.
- **Top-down**: First classify which level (local, global, parent global, or out-of-domain), then use the level-specific model to determine the exact intent. This approach doesn't require explicit out-of-domain examples.

The top-down approach was preferred as it avoided the problem of enumerating infinite out-of-domain examples.

### Generative Models for Out-of-Domain Handling

A key challenge is that out-of-domain utterances represent an infinite set of possibilities that cannot be enumerated or pre-designed. Flowstorm addresses this by incorporating GPT-2 generative models to handle out-of-domain responses.

When the system detects an out-of-domain utterance, the generative model receives the conversation context (several previous turns) and generates multiple candidate responses. A ranking system then scores and selects the most appropriate response.

They chose GPT-2 over GPT-3 because it's less resource-demanding while still providing adequate quality for these purposes. The models are also used for incorporating external knowledge—for example, generating contextual responses based on news articles or other text the conversation references.

### Research Directions

Prometeus AI is actively researching ways to add control over generative model outputs, including:

- Dialog act conditioning (generating statements vs. questions)
- Topic conditioning (generating sports-related vs. general responses)
- External knowledge injection
- Combinations of all these control mechanisms

## Key Takeaways for LLMOps

Both presentations highlight important production considerations for conversational AI:

- **Right-sized models matter**: More sophisticated models don't always outperform simpler ones; the key is matching model complexity to actual use case requirements (short inputs, limited training data)
- **Rapid iteration is essential**: Model training times of seconds (not hours) enable continuous improvement workflows
- **Modular architectures pay off**: Sub-dialog hierarchies and modular model architectures simplify development, testing, and maintenance
- **Validation during development**: Real-time feedback about model quality during chatbot design catches issues before deployment
- **Hybrid approaches work**: Combining rule-based dialog flows with machine learning intent recognition and generative models handles the full spectrum of user interactions
- **User experience over accuracy**: False positives are often worse than admitting confusion; asking clarifying questions creates better experiences than incorrect responses