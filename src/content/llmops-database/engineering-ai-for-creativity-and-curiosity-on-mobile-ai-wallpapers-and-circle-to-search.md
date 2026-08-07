---
title: "Engineering AI for Creativity and Curiosity on Mobile: AI Wallpapers and Circle to Search"
slug: "engineering-ai-for-creativity-and-curiosity-on-mobile-ai-wallpapers-and-circle-to-search"
draft: false
llmopsTags:
  - "content-moderation"
  - "multi-modality"
  - "translation"
  - "question-answering"
  - "classification"
  - "fine-tuning"
  - "prompt-engineering"
  - "reinforcement-learning"
  - "rlhf"
  - "instruction-tuning"
  - "embeddings"
  - "semantic-search"
  - "latency-optimization"
  - "cost-optimization"
  - "human-in-the-loop"
  - "error-handling"
  - "monitoring"
  - "guardrails"
  - "cache"
  - "google-gcp"
industryTags: "tech"
company: "Google"
summary: "Google developed two AI-powered mobile features to solve common user friction points: AI Wallpapers for personalized phone customization and Circle to Search for instant visual search. AI Wallpapers addressed the time-consuming process of finding the perfect wallpaper by using generative AI with guided prompt engineering, extensive quality evaluation pipelines, and multilayered safety guardrails to create unique, high-quality wallpapers on-device. Circle to Search eliminated the multi-step screenshot-upload-search workflow by integrating deep OS-level visual understanding that allows users to search anything on their screen with a simple gesture. Both features achieved massive scale, with AI Wallpapers being adopted by major OEMs like Samsung and Circle to Search launching on over 300 million devices with a 70% year-over-year increase in visual searches, demonstrating successful productization of foundation models through careful post-training, fine-tuning, grounding, and robust inference infrastructure."
link: "https://www.infoq.com/presentations/ai-mobile/"
year: 2026
seo:
  title: "Google: Engineering AI for Creativity and Curiosity on Mobile: AI Wallpapers and Circle to Search - ZenML LLMOps Database"
  description: "Google developed two AI-powered mobile features to solve common user friction points: AI Wallpapers for personalized phone customization and Circle to Search for instant visual search. AI Wallpapers addressed the time-consuming process of finding the perfect wallpaper by using generative AI with guided prompt engineering, extensive quality evaluation pipelines, and multilayered safety guardrails to create unique, high-quality wallpapers on-device. Circle to Search eliminated the multi-step screenshot-upload-search workflow by integrating deep OS-level visual understanding that allows users to search anything on their screen with a simple gesture. Both features achieved massive scale, with AI Wallpapers being adopted by major OEMs like Samsung and Circle to Search launching on over 300 million devices with a 70% year-over-year increase in visual searches, demonstrating successful productization of foundation models through careful post-training, fine-tuning, grounding, and robust inference infrastructure."
  canonical: "https://www.zenml.io/llmops-database/engineering-ai-for-creativity-and-curiosity-on-mobile-ai-wallpapers-and-circle-to-search"
  ogTitle: "Google: Engineering AI for Creativity and Curiosity on Mobile: AI Wallpapers and Circle to Search - ZenML LLMOps Database"
  ogDescription: "Google developed two AI-powered mobile features to solve common user friction points: AI Wallpapers for personalized phone customization and Circle to Search for instant visual search. AI Wallpapers addressed the time-consuming process of finding the perfect wallpaper by using generative AI with guided prompt engineering, extensive quality evaluation pipelines, and multilayered safety guardrails to create unique, high-quality wallpapers on-device. Circle to Search eliminated the multi-step screenshot-upload-search workflow by integrating deep OS-level visual understanding that allows users to search anything on their screen with a simple gesture. Both features achieved massive scale, with AI Wallpapers being adopted by major OEMs like Samsung and Circle to Search launching on over 300 million devices with a 70% year-over-year increase in visual searches, demonstrating successful productization of foundation models through careful post-training, fine-tuning, grounding, and robust inference infrastructure."
notion:
  pageId: "3a6f8dff-2538-80e1-bbc2-e42a19fa7910"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-23T08:33:00.000Z"
  lastEditedTime: "2026-08-07T12:56:00.000Z"
  publishedAt: "2026-08-07T13:12:53Z"
---

## Overview

This case study, presented by Bhavuk Jain, Tech Lead at Google, describes the engineering journey of productizing two major AI features for mobile devices: AI Wallpapers and Circle to Search. The presentation occurred in July 2026 at QCon San Francisco and provides deep insights into how Google translates foundational AI models into scalable, production-ready mobile products. The case study is particularly valuable because it contrasts two different AI engineering challenges—one focused on generation (AI Wallpapers) and another on understanding (Circle to Search)—while revealing the architectural patterns, tradeoffs, and LLMOps practices necessary to ship AI features at massive scale.

## General AI Productization Framework

Before diving into the specific case studies, Jain establishes a foundational framework for how modern AI systems become products. This framework consists of four non-negotiable architectural steps that transform raw foundational models into viable user-facing features.

The first step is post-training, where the massive base model is aligned with human preferences, style, and essential safety rules. Google employs two major families of techniques for this alignment. The RLHF (Reinforcement Learning from Human Feedback) family offers flexibility but comes with complexity, requiring management of a base model, a separate reward model, and a complex RL loop. The DPO (Direct Preference Optimization) family provides a simpler, more scalable path by skipping the separate reward model and working directly on preferred versus rejected outputs using supervised learning objectives. A critical insight here is that rigorous evaluation becomes essential because "good behavior" is inherently subjective—teams must engineer clear, measurable evaluation criteria for human raters, focusing on aspects like format, quality, completeness, and accuracy.

The second step is fine-tuning, which transforms the generalist model into a domain specialist. Google employs several approaches including task and instruction tuning (standard supervised fine-tuning with input-output pairs) and Parameter-Efficient Fine-Tuning (PEFT) techniques like LoRA, QLoRA, and adapters. PEFT has become the "modern sweet spot" because it allows training of tiny specialized modules adjacent to the large model while keeping most original weights frozen, making training dramatically cheaper and faster. Importantly, Jain notes that fine-tuning isn't always necessary—if the core problem is lack of fresh, factual, or private knowledge, the right solution is grounding rather than more training.

The third step is retrieval and grounding, which has become essential for keeping systems accurate, factual, and up-to-date. Rather than relying purely on the model's parametric memory (frozen at training time), Google connects models to external sources of truth including structured knowledge, fresh web results, and on-device context. This dramatically reduces hallucinations and enables the model to answer with real knowledge rather than guesses. This is where modern AI systems integrate search, embeddings, RAG (Retrieval-Augmented Generation), and tool use.

The fourth step is inference, scaling, and guardrails. Google implements a multilayered safety architecture that includes data guardrails (filtering and redacting sensitive or toxic content from training and evaluation data), model guardrails (using safety-tuned base models, strong system prompts, and sometimes separate safety heads or classifiers), runtime guardrails (real-time inspection of inputs and outputs to detect PII, toxicity, or jailbreak attempts, plus strict control over which external tools or APIs the model can call), and governance and UX (logging and audits, human review flows for high-risk actions, and clear user-facing controls like reporting and feedback).

For deployment, Google emphasizes three critical considerations: unified multimodal serving (one unified API or pipeline that handles diverse input types rather than separate stacks for each modality), latency and cost optimization (using batching, caching, and autoscaling to keep costs low and responses fast, with every millisecond of latency representing potential dollar costs), and observability and control (rich logging and metrics to track latency, errors, and usage).

## Case Study 1: AI Wallpapers - The Generative Challenge

AI Wallpapers represents the generative phase of AI engineering, where Google optimized primarily for creativity. The feature allows users to create unique, high-quality wallpapers instantly on their phones by describing their idea. This case study began approximately two and a half years before the presentation (around early 2024), when models were still in relatively early stages.

### Product Motivation and Strategy

Google identified wallpapers as the "perfect canvas" for several strategic reasons. First, it offered clear and immediate user benefit through personalization, aligning perfectly with Android's Material You design philosophy, where the entire phone interface (icons, menus, etc.) adapts its color palette to match the wallpaper. Second, there was massive clear user need—changing wallpapers is by far the most popular way people customize their phones, and users were already spending significant time scrolling through photos to find the ideal wallpaper. Third, generative AI could deliver a truly infinite range of high-quality content, allowing users to become artists creating something one-of-a-kind rather than being limited to static galleries.

### Core Engineering Challenges

Google identified four major challenges that had to be solved before launch. The UX challenge around prompt engineering recognized that while prompt engineering is powerful, it's also a complex skill that typical users don't possess—asking users to type complex modifiers like "cinematic lighting, 8K, ethereal watercolor" would be a recipe for failure. The quality challenge acknowledged that generative models don't inherently have "good taste"—they can create technically correct but artistically messy or weird images. The safety challenge was non-negotiable for a feature shipping on millions of consumer devices—preventing generation of inappropriate, harmful, or copyrighted content had to be solved from day one, not fixed later. The emerging viability challenge (which Jain calls "the price of success") recognized that initial server-based models were incredibly powerful but very expensive to run, with operational costs becoming a significant concern as usage scaled.

### Critical Product Decision: Restriction vs. Freedom

Google faced a fundamental product question that had deep engineering implications: how much control should they give users? The restricted approach offers beautiful, pre-made concepts—simple with almost guaranteed high quality but very limited freedom. This approach essentially engineers the evaluation metric by limiting the output space, making quality control straightforward. The open approach provides a blank text box with maximum freedom for power users but creates the "blank canvas problem" that puts huge burden on users to be great prompt engineers. The hybrid model attempts a sweet spot with guided prompt building that teaches users while leaving room for unique ideas and allowing guardrails to guide model behavior.

Despite prevailing wisdom that "more freedom is always better," Google made what Jain describes as a "non-obvious bet, almost counterintuitive." After examining public products with blank text boxes, they saw significant user frustration. More critically for engineers, the blank canvas approach creates a non-deterministic product that maximizes the difficulty of setting reliable guardrails. Google decided their role was to be the user's "creative partner" rather than just providing a powerful but complex tool.

This represents a core tradeoff: Google deliberately chose simplicity and restriction over total complexity and freedom because that was the only reliable path to consistent quality. This allowed them to engineer specific metrics with narrow, measurable quality criteria around format, conciseness, and accuracy. Critically, this decision was validated through extensive user experience research, where the UX team built and tested concepts with real users to provide confidence before proceeding.

### Investment in Delight

With restriction came huge responsibility—if you're guiding users down a specific path, that path needs to be rewarding. Google invested heavily in micro-interactions and delight moments. For example, they created three different animation effects for chip selections (wavy motion, horizontal scroll, fade-up) that are barely noticeable but make the interface feel alive. They designed uniquely fun visuals for error states—instead of harsh "Error 404" messages, users might see a T-Rex trying to paint, turning potential frustration into playful moments.

Importantly, these principles directly reduced the likelihood and dollar cost of catastrophic safety failures. The guided approach makes the engineering challenge of risk assessment tractable, ensuring output is always safe. Jain shows an example of what could go wrong—the system generating Waluigi (a Mario franchise character popular with kids) holding a weapon—and notes that a well-designed system should not be generating images of weapons in fun, creative contexts.

### Technical Architecture

The high-level architecture shows a complete loop from user input to final output. On the frontend, the user experience is intentionally simple with guided choices. These choices are sent to a prompt engineering service that acts as a crucial translator, converting user selections into highly-structured, detailed prompts, often injecting specific artistic modifiers and negative keywords to reliably guard the model toward high-quality results.

Before image generation, the prompt goes through the backend service, which contains the first layer of guardrails—fast server-side checks using classifiers and block lists to ensure the request is safe and appropriate. Once cleared, the prompt is sent to the inference platform, with the media generation service at its heart based on a fine-tuned model. This platform contains a second safety layer—visual classifiers that analyze the output image to ensure it's visually safe before a final image upscaling step enhances resolution. The finished high-resolution wallpaper is sent back to the frontend for user selection.

This two-layer guardrail strategy (backend and inference platform) allowed Google to launch version one safely, with consistent high-quality results, and even open the feature to ages 13-plus.

### Quality Engineering Deep Dive

Google's key insight was that "models aren't all made equal"—an AI model is more like an artist that excels at certain styles and struggles with others. Rather than trying to make the model good at everything, they identified what it was naturally brilliant at and built the product around those strengths. They created a map representing different idea clusters (art, animals, people, clothing) and pinpointed themes where the model consistently produced outstanding results. By constraining user choices to domains where the model shines, they could guarantee high-quality outputs, simplify quality control, and reduce risk of low-quality generations.

Validation required large-scale testing. Google built a pipeline to mass test prompt variations, always ending with manual human review. They generated thousands of images, taking single concepts and running them through dozens of stylistic modifiers, and comparing outputs across multiple models. The final judge was always human—designers and researchers reviewed images not just for technical correctness but for aesthetic quality and "wow factor." To make this subjective process measurable, they created explicit evaluation criteria covering format, quality, completeness, and overall appeal.

This led to prompt engineering at scale. For every potential chip in the UI, they had to make a tough call: keep it or drop it? Does this term consistently yield great images or introduce unpredictability? Across all combinations, they generated and reviewed over one million images just to decide which few words should appear in the final UI. This structured approach had an engineering payoff—by using consistent, repeated prompt templates, they unlocked inference optimizations like prefix caching, allowing the model to reuse shared prompt segments for faster, more efficient generation.

Google's collaboration with internal research teams was a game changer. First, they established a powerful feedback loop where product data helped research teams improve core models for everybody. Second, they investigated fine-tuning for specific categories needing extra polish. Finally, this collaboration meant the product was built on an ever-improving foundation—as underlying AI models get better, user experience automatically improves.

### Scaling and Launch

Google's philosophy was to build with scaling in mind from day one for a global user base. This started with relentless UX exploration to understand user intent on mobile and define evaluation criteria and metrics. Quality focus meant establishing a rigorous evaluation pipeline with human raters to move beyond subjective feelings to define consistently high-quality results. The architectural decision to use a scalable endpoint reused internally across multiple Google products helped reduce overall cost and improve reliability.

The launch was measured in two ways: user praise (users called the concept "freaking insane" and "a childhood dream") and scale (thoughtfully integrated across different surfaces and form factors, and adopted by major OEMs like Samsung). This validated the non-obvious bet on partially restricted input.

### Cost Management

When asked about cost, Jain noted the model was very expensive two years ago. Cost management included migrating to more efficient models, batching prompts instead of running each individually, using prefix caching techniques, and sharing the same endpoint internally across multiple products to reduce engineering and operational costs. He expressed optimism that costs will continue declining as models become more efficient.

## Case Study 2: Circle to Search - The Understanding Challenge

Circle to Search represents the understanding phase of AI engineering. The concept is simple but powerful: if you can see it on your screen, you can search for it instantly without leaving the app. From an engineering perspective, this is a complex, real-time, multimodal retrieval task—taking visual input and a gesture on a complex screen and translating it into a query that delivers high fidelity and relevant results.

### Motivation and User Friction

For years, the standard visual search workflow was a multi-step process: take a screenshot, switch to a different app, find and upload the screenshot, then finally search. Every step is a point of friction where users can abandon the search. Google's North Star was achieving zero context switching, zero interruption, and seamless flow from curiosity to answer. This vision was achievable because Google Lens already possessed world-class visual understanding—they could build on this by adding deeper AI integration and much deeper system-level OS integration.

### Evolution from Google Lens

Google Lens has long been a powerful way to search the world through your camera, but it came with friction—you had to stop, open a separate app, and point the camera. Circle to Search was the next natural step in that evolution. Its core innovation: Lens is world-facing, Circle to Search is screen-facing. It turns whatever is on your screen into the query. By replacing multiple steps with a single gesture, it removes nearly all friction, letting users act on curiosity instantly without leaving their current app.

This seemingly small shift has huge implications technically, transforming the task into a real-time retrieval problem that demands extremely low latency and highly relevant results at every interaction.

### Technical Architecture

The architecture breaks down into two parts: the overall end-to-end flow and a deeper dive into the AI pipeline. The overall architecture starts on-device where a user gesture (circle or tap) triggers capture of on-screen content. This isn't just a flat screenshot—it's a "multimodal prompt" containing both pixels and the structural layout of the device. This rich prompt is passed to the AI pipeline for core reasoning and heavy lifting, then the final answer is sent back to the device and appears as a results overlay seamlessly integrated where the user currently is.

The AI pipeline specifically handles the multimodal input by first hitting the core multimodal model—not just a generic model but one fine-tuned to understand relationships between an image, the user's question, and the screen context. Once the model understands user intent, it kicks off reasoning and retrieval across multiple sources in parallel, querying the knowledge graph for structured facts while simultaneously querying web and image search to find visually similar items, products, and articles.

For example, if you circle sneakers, the system queries the knowledge graph to identify brand and model while simultaneously querying web and image search to find shopping links, reviews, and photos in different colors. The final stage is synthesis and delivery—all potential answers from retrieval systems are fed into an AI overview synthesis model (the generative part) that crafts helpful natural language answers. Before any answer is sent, it must pass through a final non-negotiable checkpoint: safety and responsibility filters serving as runtime guardrails ensuring every answer is helpful and harmless.

### Key Technical Components

Two distinct layers make the instant, seamless experience a reality. The MUM (Multitask Unified Model) moves the system beyond simple keyword matching to intent understanding across modalities. For example, if a user circles shoes (image) and types "blue" (text), MUM understands both visual attributes and semantic refinement to provide precise answers. Gemini integration powers richer AI overviews and contextual help, handling the reasoning layer that elevates the tool from simple identification to complex reasoning.

### Deep System-Level Integration

What makes Circle to Search a game changer beyond the AI model is deep system-level integration. Instead of forcing users to hunt for an app, it's built directly into the Android OS with a simple universal gesture that works everywhere. This is a seamless entry point removing all friction from the old screenshot-upload workflow.

Because of system-level integration, when you circle an object on screen, the system isn't just guessing what you're pointing at in a flat image—it gives the AI a deeper level of context. This provides a "huge hybrid advantage," allowing focus on the exact item selected along with semantic layout. When you circle a handbag in a busy photo, the system knows exactly which specific pixels belong to the handbag in the entire screen, delivering highly accurate search results.

### Guardrails and Safety

First, Google grounds the visual AI in factual data. To prevent errors (like identifying a plant as a rare species when it isn't), they don't just trust pixels alone—they cross-reference any recognized entity with a structured, reliable knowledge base (the knowledge graph). This grounding in facts is the first line of defense against misinformation.

Second, they implement a dedicated safety layer as a core part of architecture. Every single synthesized result, especially those using generative models, must pass through a final, non-negotiable responsible AI filter before being shown to users. This layer catches anything potentially harmful, hateful, or inappropriate.

Third, they design for ambiguity. Sometimes the AI simply won't have a confident answer (blurry image, obscure object). In low-confidence scenarios, guessing wrong erodes trust faster than no answer at all, so they designed UX to handle these situations gracefully, offering broad suggestions instead of wrong answers.

### Results and Impact

The core hypothesis was that removing friction through deep system-level integration would unlock a new level of engagement. Results validated this: massive scale launching on over 300 million devices, 70% year-over-year increase in visual searches driven by easier access, and becoming a fast-growing query type especially with younger users, with shopping and translation working particularly well.

## Key Learnings and Architectural Insights

After walking through these two very different AI engineering challenges, Jain highlights distinct lessons from each project while acknowledging that many principles (scaling, grounding in quality) apply to both.

From AI Wallpapers (generative product), the unique challenge was managing the blank canvas problem. The most important lesson was the power of having clear principles and tight product definitions. The non-obvious bet on guided creation and obsession over the evaluation pipeline to ensure artistic quality were absolutely critical for a generative experience. They also learned the importance of over-investing in moments of delight to make a restrictive experience feel magical.

From Circle to Search, they learned a different set of lessons. While improving the model certainly helped, what turned out to be amazing was the deep OS integration that made the feature seamless to invoke. That frictionless experience is what users really valued, along with the search results. This integration also unlocked a deeper level of intelligence by providing semantic layout of the screen. Finally, to build trust, they learned the importance of grounding visual AI in factual data—cross-referencing what the model thinks it sees with a structured knowledge base was crucial to ensure answers were not just fast but reliable.

## Actionable Takeaways for Practitioners

For AI engineers, Jain emphasizes thinking about productizing AI, not just deploying it. A powerful model is just the starting point—the real work is building the entire system around it, including evaluation pipelines, cost and latency optimizations, and safety guardrails. Productized AI is a reliable and trustworthy experience.

For tech leaders, he champions principle-led development. The non-obvious bet on guided creation for AI Wallpapers was a hard decision guided by principles of quality and safety. Those principles served as the North Star and paid off. As leaders, it's the job to define those principles and empower teams to stick to them, especially when it's hard.

For product managers and designers, he advises obsessing over the user's workflow. With Circle to Search, the AI was indeed very important, but identifying and eliminating friction in the user's journey really made the difference.

## Development Timeline and Testing Philosophy

When asked about maintaining velocity with all the safety checks and processes, Jain was candid that it wasn't a quick process. AI Wallpapers took about a year to build, especially because it was done two and a half years ago when models were still advancing and weren't as sophisticated. They made mistakes and had to ensure quality was right, requiring significant time investment.

Regarding testing philosophy and determining when testing is "good enough," Jain emphasized that product managers, UX design teams, and human-in-the-loop review were crucial. Whatever came out of the testing pipeline, they saw the final output and didn't just accept or reject it—they evolved the pipeline and the model being provided by research teams to do better. For instance, if an image wasn't up to standard, they'd add more prompt modifiers like "8K" or specific artistic styles. This was a continuous evolving loop where humans reviewed output and then improved tests running at scale.

## Balanced Assessment and Critical Considerations

While this case study provides valuable insights into Google's LLMOps practices, several aspects deserve balanced consideration. First, the presentation naturally emphasizes successes and may understate the true complexity and resource requirements of these implementations. The fact that AI Wallpapers took a year to build with extensive quality pipelines and over one million images reviewed suggests a level of investment that may not be accessible to all organizations.

Second, the "non-obvious bet" on restricted input for AI Wallpapers, while presented as a principled decision, also conveniently aligns with Google's ability to control costs and reduce safety risks. Organizations without Google's resources might need to make similar restrictions purely out of practical constraints rather than design philosophy.

Third, the claimed results (300 million devices, 70% year-over-year growth) are impressive but lack detailed methodology or comparative baselines. It's unclear whether these metrics reflect genuine product-market fit or simply the advantage of deep OS integration on a platform with billions of users.

Fourth, both features rely heavily on proprietary Google infrastructure (knowledge graph, search infrastructure, MUM, Gemini) that external teams cannot replicate, limiting the generalizability of some architectural patterns.

Finally, while the presentation emphasizes safety and quality, there's limited discussion of failure modes that did occur in production, what percentage of requests are filtered by guardrails, or how the team handles edge cases that slip through multiple safety layers. A more complete view of production LLMOps would include these challenges alongside the successes.

## Conclusion

This case study provides a comprehensive view of LLMOps at Google for mobile AI features, demonstrating how foundational models are transformed into production systems through careful architectural decisions, extensive evaluation, multilayered safety, and deep platform integration. The contrast between generative (AI Wallpapers) and understanding (Circle to Search) challenges highlights different optimization priorities while maintaining common principles around quality, safety, and scale. Both features achieved massive adoption by balancing cutting-edge AI capabilities with practical engineering constraints around cost, latency, user experience, and safety—illustrating that successful AI productization requires far more than just a good model. However, practitioners should carefully consider which patterns from Google's approach are truly generalizable versus which depend on unique advantages of platform ownership, massive user bases, and extensive proprietary infrastructure.
