---
title: "AI-Powered Personalized Year-in-Review Campaign at Scale"
slug: "ai-powered-personalized-year-in-review-campaign-at-scale"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "694addcf328ed577857a36ba"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-01-07T09:40:39.763Z"
  lastUpdated: "2025-12-23T20:11:48.343Z"
  createdOn: "2025-12-23T18:22:07.553Z"
llmopsTags:
  - "summarization"
  - "classification"
  - "translation"
  - "content-moderation"
  - "multi-modality"
  - "caption-generation"
  - "prompt-engineering"
  - "semantic-search"
  - "few-shot"
  - "latency-optimization"
  - "cost-optimization"
  - "microservices"
  - "scaling"
  - "databases"
  - "monitoring"
  - "api-gateway"
industryTags: "media-entertainment"
company: "Canva"
summary: "Canva launched DesignDNA, a year-in-review campaign in December 2024 to celebrate their community's design achievements. The campaign needed to create personalized, shareable experiences for millions of users while respecting privacy constraints. Canva leveraged generative AI to match users to design trends using keyword analysis, generate design personalities, and create over a million unique personalized poems across 9 locales. The solution combined template metadata analysis, prompt engineering, content generation at scale, and automated review processes to produce 95 million unique DesignDNA stories. Each story included personalized statistics, AI-generated poems, design personality profiles, and predicted emerging design trends, all dynamically assembled using URL parameters and tagged template elements."
link: "https://www.canva.dev/blog/engineering/behind-the-scenes-of-canvas-designdna-campaign/"
year: 2025
seo:
  title: "Canva: AI-Powered Personalized Year-in-Review Campaign at Scale - ZenML LLMOps Database"
  description: "Canva launched DesignDNA, a year-in-review campaign in December 2024 to celebrate their community's design achievements. The campaign needed to create personalized, shareable experiences for millions of users while respecting privacy constraints. Canva leveraged generative AI to match users to design trends using keyword analysis, generate design personalities, and create over a million unique personalized poems across 9 locales. The solution combined template metadata analysis, prompt engineering, content generation at scale, and automated review processes to produce 95 million unique DesignDNA stories. Each story included personalized statistics, AI-generated poems, design personality profiles, and predicted emerging design trends, all dynamically assembled using URL parameters and tagged template elements."
  canonical: "https://www.zenml.io/llmops-database/ai-powered-personalized-year-in-review-campaign-at-scale"
  ogTitle: "Canva: AI-Powered Personalized Year-in-Review Campaign at Scale - ZenML LLMOps Database"
  ogDescription: "Canva launched DesignDNA, a year-in-review campaign in December 2024 to celebrate their community's design achievements. The campaign needed to create personalized, shareable experiences for millions of users while respecting privacy constraints. Canva leveraged generative AI to match users to design trends using keyword analysis, generate design personalities, and create over a million unique personalized poems across 9 locales. The solution combined template metadata analysis, prompt engineering, content generation at scale, and automated review processes to produce 95 million unique DesignDNA stories. Each story included personalized statistics, AI-generated poems, design personality profiles, and predicted emerging design trends, all dynamically assembled using URL parameters and tagged template elements."
---

## Campaign Overview and Business Context

Canva's DesignDNA campaign represents a sophisticated application of generative AI to create personalized marketing content at massive scale. Launched in December 2024, the year-in-review campaign aimed to celebrate millions of users' design achievements over the past year while showcasing Canva's AI capabilities. The campaign connected users to Canva's 2025 Design Trends—seven emerging design directions identified through analysis of user searches, favorite elements, and trending templates. The core challenge was creating memorable, shareable experiences that felt genuinely personal to each user while adhering to strict privacy policies and operating at the scale of Canva's user base.

The campaign demonstrates several important LLMOps considerations including handling privacy-constrained data, generating content at scale across multiple locales, implementing review processes for AI-generated content, and orchestrating multiple AI systems to work together in a production pipeline. The final deliverable consisted of 95 million unique DesignDNA stories, each containing personalized statistics, AI-generated poems, design personality profiles, and predicted design trends.

## Privacy-First Approach and Data Constraints

A critical aspect of this LLMOps implementation was navigating privacy constraints while still delivering personalization. Canva strictly adhered to internal policies that prohibited accessing users' personal design content directly. This meant the team had to work with indirect signals rather than the most obvious data source. They could only target users who had consented to personalized marketing communications and met minimum activity thresholds.

The privacy constraints significantly shaped the technical architecture. Instead of analyzing actual user designs, the team leveraged metadata from public templates that users had utilized. Each template in Canva's marketplace includes style and theme tags, and by analyzing which templates users selected, the team could infer design preferences without ever accessing the actual content users created. This represents a thoughtful balance between personalization and privacy that many LLMOps practitioners face when dealing with user-generated content.

This approach has important implications for model performance and accuracy. The team was working with proxy signals rather than direct observations, which introduces uncertainty. A user might select a template but modify it substantially, meaning the template metadata might not fully represent their actual design choices. However, at scale, these patterns become statistically meaningful even if individual predictions are imperfect.

## Design Trend Matching Using Keyword Analysis

The first major AI component involved matching users to one of seven design trends: Shape Theory, Serious Fun, Refined Grit, Future in Motion, Opulence Era, Mechanical Botanical, and Analog Meets AI. Canva's Content Creative team defined each trend with a set of keywords, and the engineering team developed an algorithm to score users against each trend based on keyword matches from their template usage.

The initial keyword-matching approach successfully matched 95% of users to a design trend. This high success rate suggests that the hand-crafted keywords were well-calibrated to the actual template metadata and user behavior patterns. However, the remaining 5% posed a challenge—these users had template usage patterns that didn't align well with the predefined keyword sets.

To address this gap, the team employed generative AI to expand the keyword sets for each design trend. They first curated a list of commonly appearing template keywords that didn't directly match any trend keyword. Then, using generative AI, they expanded each trend's keywords by selecting the most contextually relevant keywords from the curated list. This approach demonstrates thoughtful prompt engineering—rather than allowing the AI to generate arbitrary new keywords, they constrained it to select from keywords that actually appeared in the data. This ensures the expanded keywords would have a chance of matching real user behavior rather than purely theoretical associations.

This hybrid approach combining rule-based matching with AI-assisted expansion achieved 99% coverage. The remaining 1% had insufficient template usage data to make meaningful matches. This pragmatic acknowledgment of limitations is an important aspect of production LLMOps—recognizing when the available data simply cannot support a prediction rather than forcing a match.

## Design Personality Generation Through Audience Segmentation

The second personalization dimension involved creating "design personalities" by combining design trends with audience groups. Canva categorized users into 10 audience groups based on the most frequent themes in their template usage, such as "Celebrations" or "Innovation." Each combination of design trend and audience group represented a distinct personality segment—for example, "Analog meets AI" combined with "Teacher (Education)" would yield a personality for teachers who used AI.

For each segment, the team used Magic Write (Canva's text generation tool) to create a personality name and description. This involved significant prompt engineering to ensure the generated personalities were coherent, appropriate, and aligned with the specific combination of trend and audience group. The generated text was then translated across different locales using AI, which introduces additional complexity around maintaining tone and cultural appropriateness across languages.

Additionally, they used Dream Lab (Canva's image generation tool) to create hero images aligned with each personality's content. This multimodal generation—coordinating text and images to work together—represents a more sophisticated LLMOps challenge than single-modality generation. The images needed to visually represent abstract concepts while maintaining consistency with the textual description.

Matching users to personalities followed a similar keyword-matching approach to trend matching, but using theme metadata rather than style metadata. This demonstrates how different dimensions of the template metadata could be leveraged for different personalization goals, creating a richer overall profile by combining multiple weak signals.

## Large-Scale Poem Generation and Localization

Perhaps the most ambitious AI generation task was creating personalized poems based on each user's top three design styles. The team aggregated style metadata from users' template usage to identify their top three styles, balancing between uniqueness (capturing individual behavior) and statistical reliability (ensuring enough data to make meaningful inferences).

The combination of locales and top three styles resulted in over one million distinct combinations requiring unique poems. This scale made manual creation infeasible and necessitated automated generation. The team created unique prompts for each locale, then provided the three styles as inputs to generate locale-specific poems. This represents a significant prompt engineering challenge—the prompts needed to consistently produce appropriate, engaging poems across vastly different style combinations while maintaining the tone and linguistic characteristics appropriate for each locale.

The localization aspect is particularly noteworthy. Poetry is highly language-dependent, with different cultural expectations around rhyme, meter, and figurative language. Creating a single prompt template that could be adapted across nine locales while maintaining quality required careful linguistic consideration and likely significant iteration. The involvement of Canva's Localization team in reviewing samples and providing feedback for prompt refinement demonstrates the importance of domain expertise in production LLMOps.

## Content Review and Safety Processes

Generating a million poems presents significant content safety and quality challenges. While manual review of all outputs was impossible, the team implemented a multi-layered review process that balanced thoroughness with scalability. This represents a critical LLMOps challenge—how to ensure quality and safety when outputs vastly exceed human review capacity.

The review process included several components. First, the Localization team reviewed samples of poems in non-English locales, providing feedback that informed prompt refinement. This sampling approach allows domain experts to calibrate the generation process without reviewing every output. The feedback loop between review and prompt iteration is essential for improving generation quality.

Second, the team implemented automated flagging for poems containing potentially sensitive words. This keyword-based approach provides a first-pass filter to identify potentially problematic content. Third, they used generative AI itself to identify poems with negative tone. This meta-application of AI—using AI to evaluate AI outputs—is increasingly common in LLMOps but requires careful consideration. The tone detection model needs to be reliable enough that its judgments can be trusted, or it could either flag too many false positives (requiring unnecessary human review) or miss genuine problems.

Any flagged poems were regenerated, and the review cycle repeated until an appropriate alternative was found. This iterative regeneration approach is practical but has limitations. If certain style combinations consistently produce problematic outputs, repeated regeneration might not solve the underlying issue. The text doesn't mention whether they tracked patterns in flagged content to identify systematic prompt problems, but this would be a valuable practice.

It's worth noting that despite these review processes, some quality issues might have slipped through at such large scale. The text presents this as a successful campaign, but a balanced assessment should acknowledge that content generation at this scale inherently involves some quality-quantity tradeoffs. The review processes seem reasonable given the constraints, but perfect content quality across a million poems is essentially impossible.

## Dynamic Content Assembly and Delivery

The final LLMOps component involved assembling all generated content into personalized experiences. The team stored all building blocks—locale, design count, top design type, design personality, poem, and emerging design trend—in a data store. They created base Canva templates for each of the seven design trends and used Canva's tagging feature to mark elements that could be dynamically replaced.

For each user, they constructed a URL with parameters containing the tailored content. When a user accessed the URL, it dynamically generated their personalized DesignDNA by replacing tagged elements with the user-specific content. This URL-based assembly approach is elegant and scalable—it avoids needing to pre-render 95 million static designs, instead generating them on-demand. This reduces storage requirements and allows for last-minute content updates if needed.

However, this approach also introduces potential failure points. URL parameter handling needs to be robust to special characters, different character sets across locales, and varying content lengths. The dynamic rendering needs to be fast enough that users don't experience long load times. The text doesn't detail how these challenges were addressed, but they represent important production considerations.

## Cross-Functional Orchestration and Team Collaboration

The campaign involved coordination across Canva's Personalisation & Engagement, Lifecycle, Brand Marketing, Creative, Localisation, and Content & Discovery teams. This cross-functional complexity is characteristic of production LLMOps projects, which rarely exist in purely technical silos. The Creative team defined design trends and personalities, the Localization team ensured linguistic appropriateness, and the technical teams implemented the generation and delivery systems.

Managing this complexity requires clear interfaces between teams and well-defined handoffs. For instance, the Creative team defined design trends through keywords, creating a structured format that the engineering team could work with algorithmically. The Localization team provided feedback on poem samples, which the technical team translated into prompt refinements. These structured collaboration patterns are essential for successful LLMOps projects but are often underemphasized in technical discussions.

## Scaling Considerations and Performance

The campaign successfully generated 95 million unique DesignDNAs, demonstrating impressive scale. However, the text provides limited details about the computational infrastructure, generation costs, or performance optimization. Several questions remain unanswered: How long did it take to generate a million poems? What was the cost per generation? How was the generation workload distributed and parallelized? Were there any rate limits or API constraints that needed to be managed?

These operational details are crucial for LLMOps practitioners trying to learn from this case study. Content generation at this scale likely required significant computational resources and careful cost management. The team presumably batched generation requests, implemented caching where possible, and monitored for failures requiring regeneration. The lack of detail about these operational aspects is a limitation of this case study, though it's common for companies to omit cost and infrastructure details from public communications.

## Evaluation and Success Metrics

The case study reports that 95 million DesignDNAs were created, but provides limited information about how success was measured. Did users actually engage with their DesignDNAs? How many shared them on social media as intended? What was the quality feedback on the generated poems and personalities? Were there any notable failures or negative responses?

These questions are important for understanding whether the LLMOps implementation truly achieved its goals. Generating millions of outputs is impressive technically, but the business value depends on user engagement and brand perception. A balanced assessment should acknowledge that we're seeing Canva's presentation of their own campaign, which naturally emphasizes positive results. Independent evaluation of user engagement and content quality would provide a more complete picture.

The text mentions that 99% of users were matched to design trends and implies that the campaign was successful, but doesn't provide quantitative engagement metrics. This is understandable from a public communications perspective—companies often don't share detailed performance metrics—but it limits our ability to assess the actual impact of the LLMOps implementation.

## Technical Architecture and Tool Integration

The campaign leveraged several of Canva's internal AI tools, including Magic Write for text generation and Dream Lab for image generation. The integration of these tools into a cohesive pipeline demonstrates mature MLOps/LLMOps practices. The team essentially built a content generation assembly line where different AI models contributed specific components that were then orchestrated together.

This modular architecture has advantages—each model can be optimized for its specific task, and components can be updated independently. However, it also requires careful coordination to ensure consistency across generated elements. For instance, the hero image generated by Dream Lab needs to visually align with the personality description generated by Magic Write, even though they're produced by separate systems operating on potentially different representations of the personality concept.

The text doesn't describe the technical details of how these tools were integrated, what APIs or interfaces were used, or how the generation pipeline was implemented. We can infer that some orchestration layer coordinated the different generation steps, managed data flow between components, and handled error conditions, but the specifics remain unclear.

## Lessons and Tradeoffs for LLMOps Practitioners

This case study illustrates several important considerations for production LLMOps. First, privacy constraints significantly shape what's possible, and creative approaches like using template metadata as proxy signals can enable personalization while respecting user privacy. Second, hybrid approaches combining rule-based methods with AI generation can achieve better coverage than either approach alone, as demonstrated by the keyword matching followed by AI expansion for edge cases.

Third, content review processes must be designed for scale when generating large volumes of outputs. The combination of sample reviews by domain experts, automated keyword flagging, and AI-assisted quality checks represents a pragmatic approach, though perfect quality is unattainable at this scale. Fourth, localization adds substantial complexity to content generation, requiring linguistic expertise and locale-specific prompt engineering.

Fifth, dynamic assembly of pre-generated components can be more scalable than generating complete artifacts for each user. Finally, successful LLMOps projects require extensive cross-functional collaboration, with clear interfaces between creative, localization, and technical teams. The technical implementation of AI generation is only one piece of a much larger organizational effort.

A critical perspective should note that this case study represents a relatively low-risk application of generative AI—personalized marketing content where some imperfections are tolerable. The stakes are different than in higher-consequence domains like healthcare or financial advice. The acceptable error rate and review processes would need to be substantially more rigorous in higher-stakes contexts. Additionally, the campaign generated content for consumption by users, but didn't involve ongoing user interaction or feedback loops that would require more sophisticated monitoring and adjustment.