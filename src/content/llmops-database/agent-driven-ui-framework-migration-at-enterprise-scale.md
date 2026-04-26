---
title: "Agent-Driven UI Framework Migration at Enterprise Scale"
slug: "agent-driven-ui-framework-migration-at-enterprise-scale"
draft: false
llmopsTags:
  - "code-generation"
  - "prompt-engineering"
  - "agent-based"
  - "error-handling"
  - "latency-optimization"
  - "cost-optimization"
  - "open-source"
  - "documentation"
  - "cicd"
  - "orchestration"
  - "monitoring"
  - "guardrails"
  - "reliability"
industryTags: "tech"
company: "Block"
summary: "Block faced the challenge of migrating their internal web platform, Console, from an unmaintained UI library (Base Web) to Fluent UI across a React monorepo containing 11,000 files while 40-60 engineers continued daily development. Rather than using naive prompting or manual migration, they developed a sophisticated agent-driven migration system built on TypeScript diagnostics, selective context injection, explicit rule validation, custom linters, and a temporary migration lane. The 451-day effort, driven primarily by one IC, successfully migrated over 80 distinct targets by treating AI-assisted migration as a validated program with tight feedback loops and enforceable end states rather than as a simple search-and-replace operation."
link: "https://engineering.block.xyz/blog/from-base-web-to-fluent-ui-without-a-flag-day"
year: 2026
seo:
  title: "Block: Agent-Driven UI Framework Migration at Enterprise Scale - ZenML LLMOps Database"
  description: "Block faced the challenge of migrating their internal web platform, Console, from an unmaintained UI library (Base Web) to Fluent UI across a React monorepo containing 11,000 files while 40-60 engineers continued daily development. Rather than using naive prompting or manual migration, they developed a sophisticated agent-driven migration system built on TypeScript diagnostics, selective context injection, explicit rule validation, custom linters, and a temporary migration lane. The 451-day effort, driven primarily by one IC, successfully migrated over 80 distinct targets by treating AI-assisted migration as a validated program with tight feedback loops and enforceable end states rather than as a simple search-and-replace operation."
  canonical: "https://www.zenml.io/llmops-database/agent-driven-ui-framework-migration-at-enterprise-scale"
  ogTitle: "Block: Agent-Driven UI Framework Migration at Enterprise Scale - ZenML LLMOps Database"
  ogDescription: "Block faced the challenge of migrating their internal web platform, Console, from an unmaintained UI library (Base Web) to Fluent UI across a React monorepo containing 11,000 files while 40-60 engineers continued daily development. Rather than using naive prompting or manual migration, they developed a sophisticated agent-driven migration system built on TypeScript diagnostics, selective context injection, explicit rule validation, custom linters, and a temporary migration lane. The 451-day effort, driven primarily by one IC, successfully migrated over 80 distinct targets by treating AI-assisted migration as a validated program with tight feedback loops and enforceable end states rather than as a simple search-and-replace operation."
notion:
  pageId: "34ef8dff-2538-81e1-8f16-e8e42e2b16f2"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-04-26T09:51:00.000Z"
  lastEditedTime: "2026-04-26T09:51:00.000Z"
  publishedAt: "2026-04-26T10:09:47Z"
---

## Overview

Block's engineering team undertook a major UI framework migration for Console, their internal web platform used for deploying and monitoring services. The challenge was migrating from Base Web (an unmaintained library) to Fluent UI across a massive React monorepo containing approximately 11,000 tracked files (10,000 TypeScript/TSX files) while maintaining zero downtime and allowing 40-60 engineers to continue daily development. This case study is particularly valuable for LLMOps practitioners because it demonstrates the evolution from naive prompting to a sophisticated, production-grade agent-driven migration system, with detailed technical insights into what makes AI-assisted code migrations reliable at enterprise scale.

The work began in late 2024 and spanned 451 days through February 2026, primarily driven by one individual contributor. What makes this case study especially instructive is its historical framing: the team explicitly notes that in late 2024, "AI tab completion was starting to feel normal, but long-lived coding agents were still barely a concept in day-to-day engineering." The patterns they developed were not obvious at the time but became foundational to how they think about trustworthy agentic migrations.

## The Migration Challenge and Strategic Context

Block initially explored forking Base Web and maintaining it themselves, even building a working prototype. However, they recognized this would trap them in ongoing maintenance of a dead-end technology that the ecosystem had abandoned. The knowledge cost was particularly concerning—every hour spent mastering Base Web was time learning something with minimal value outside their codebase, making it harder to onboard new engineers who were unlikely to know the library.

They chose Fluent UI because its primitives mapped reasonably well to Base Web components they were already using, making automated migration feasible. Critically, Fluent UI had "clear long-term backing and active investment," solving the strategic sustainability problem. The migration had to happen without downtime, freeze windows, or a flag-day cutover while the platform remained live and actively developed.

## Building the Foundation: TypeScript Intelligence Layer

The first tool they built was not an agent but a TypeScript language service and diagnostics server. This choice reflects a crucial LLMOps principle: understanding the actual problem before jumping to AI solutions. They needed fast, local answers to fundamental questions: which file to migrate next, what symbols resolve to, what references matter, whether changes broke compilation, and whether the project still worked.

This diagnostics server became the core substrate for safe migration loops. As the author notes, "if you read the final system first, it is easy to imagine that the agent came first and the tooling came later. In practice, the tooling came first, and then almost immediately we started wrapping it with model-driven orchestration." This architecture—solid tooling as foundation, AI as orchestration layer—proved essential to the system's reliability.

## Agentic Orchestration with Goose

The team wrapped their TypeScript server in Goose, an early Python-based agent runtime. This established the fundamental architecture that persisted through later iterations: a long-lived server providing TypeScript intelligence, and a separate migrator process that selected files, built prompts, and invoked models that could call back into the server's tools.

This architectural decision was transformative. It shifted the problem from "ask a model for a rewrite" to "put a model inside a tool-backed loop." The difference is fundamental to production LLMOps: single-shot prompting versus iterative, tool-augmented agent workflows that can validate and refine their own outputs.

## The Limits of Naive Prompting

Early experiments with single-shot prompting—giving the model a file and asking it to migrate—worked "just well enough to be dangerous." The model could generate TypeScript that compiled cleanly but wasn't semantically correct for the target framework. A recurring failure was creating `makeStyles` hook factories inside component bodies instead of at module scope. TypeScript accepted this code, but React didn't—exactly the kind of mistake that makes automated migrations look promising in demos but painful in production.

The team also hit a prompt-design wall with component-specific migration hints. They documented how each Base Web component's props and behavior mapped to Fluent primitives, including examples. While helpful, including all hints in every prompt consumed about 25% of a 256k context window before the model even saw the file to migrate. This was wasteful and noisy, spending tokens on irrelevant instructions.

## Selective Context Injection: A Key Breakthrough

One of the biggest quality improvements came from selective context injection. Instead of global prompting, they used the TypeScript AST to inspect import statements and injected only relevant hints for that specific file. If a file imported `Button` and `Tag`, it received only `Button` and `Tag` hints. Files that never touched tables, modals, or selects got none of that context.

This seemingly simple change represents a crucial LLMOps pattern: using static analysis and structured code understanding to dynamically construct minimal, targeted context. It reduced token waste, improved signal-to-noise ratio, and produced higher quality outputs. The system was becoming more structured, evolving from a focused migration assistant into a platform with explicit project definitions, shared instructions, module hints, and clean separation between the long-lived server and the migrator driving it.

## Rule Engines and Explicit End States

The transformation from unreliable to production-grade came from making end states explicit and enforceable through a rule engine. Hints are advisory—models can ignore, half-follow, or inconsistently apply them. What changed the reliability curve was not better prompting but defining explicit, checkable success criteria.

At the core was a small DSL for import migration rules. Simple rules looked like:
```
baseui/button { Button } -> @fluentui/react-components { Button }
```

The DSL evolved from regex parsing to a full ANTLR grammar, enabling complex rules like:
```
// Remove all import specifiers containing "overrides"
glob:"**/*override*" { ... } -> [ null ] --always

// Replace Skeleton from baseui with Skeleton and SkeletonItem from fluent
baseui/skeleton {
  Skeleton -> @fluentui/react-components { Skeleton & SkeletonItem }
  ... -> null
}
```

These rules did more than document mappings. They defined which files were in scope, constrained which imports the model could add or remove, and because imports must remain internally consistent, forced the rest of the file toward the new component vocabulary. Import statements provided a precise, tool-checkable definition of "done."

For each file, the system derived a file-specific subset of rules from current imports, creating clear end states. After every model edit, the system returned specific steering messages: "this import cannot be removed yet," "this Base Web import must be replaced with that Fluent import," "these new imports are not allowed," "this required binding exists but is still unused." When import changes were correct, the rest of the file naturally followed due to TypeScript diagnostics.

The team found even diagnostic wording mattered. The default TypeScript message for unused bindings nudged models toward deletion, potentially sending files back into failed rule states. Rewriting "Unused variable" to "Unused variable, use it or remove it" made a surprisingly large difference. As they note, "the migration stopped being impressive when it worked and started being useful when it failed predictably."

## Custom Linters: Converting Failures into Policy

With enforceable end states from rules, the next step was encoding repeated model mistakes. They developed more than 50 module-hint files and more than 20 custom linters. This wasn't prompt bloat—it was accumulated operational knowledge from repeated failures converted into automated policy.

Linters fell into three categories:

**Component-Level Correctness**: Some checks existed because specific migrated components needed more than import swaps. Props might be technically optional but required for parity, or particular Fluent components might need specific usage shapes for styling or accessibility.

**Framework-Level Correctness**: Some checks existed because models kept generating TypeScript-valid but React-wrong code. The `makeStyles` check enforced that calls must live at module scope because it's a hook factory—not a style preference but a framework contract.

**"Don't Do That" Correctness**: The third category captured behaviors learned from watching models in production:
- Don't add new `as any` casts
- Don't invent type assertions to silence errors
- Don't add obvious comments everywhere
- Don't delete existing comments
- Don't quietly delete large code chunks to make problems disappear

The no-new-comments check was particularly valuable. Early 2025 models loved sprinkling obvious commentary everywhere. Under context pressure, they would also "fix" files by deleting problematic code. File-size-change checks were blunt but effective at catching this failure class.

This represents a critical LLMOps principle often skipped in AI migration discussions: the interesting work isn't getting the first successful rewrite, it's converting repeated failures into policy so they stop recurring. The linters embody learned operational knowledge about how LLMs fail in specific contexts.

## Validation in the Hot Path

The system had diagnostics, prompts, hints, rules, and linters, but the next bottleneck was feedback speed. A full `tsc --no-emit` run took about four minutes—survivable for humans, brutal for iterative model loops. The solution was pulling more validation into the runtime's hot path.

Instead of waiting on full-project typechecking after every attempt, the model could edit a file and get near-real-time feedback from the TypeScript language server against the relevant codebase slice. Only after files were locally clean did they spend on broader validation.

Tests also became part of the contract. Starting Jest for even one file in a large monorepo can take 10-30 seconds, expensive when models run tests after each change. To reduce startup cost, they kept a Jest process warm in memory and added an RPC layer on top. Jest doesn't expose public APIs for this usage pattern, so making it reliable required wiring together internal pieces—unglamorous but essential infrastructure work.

The migration loop became highly layered:
- Migrate a file inside a tool-backed loop
- Check import rules
- Run linters
- Ask TypeScript server for diagnostics
- Run and fix only related tests when needed
- Spend on broader validation only after local cleanliness

This fast-feedback architecture is fundamental to production LLM agents. Without tight validation loops, models wander into failure states that are expensive to recover from. The investment in tooling infrastructure—TypeScript server, warm Jest processes, RPC layers—pays dividends in iteration speed and reliability.

## Runtime Evolution and Architecture

The runtime continuously evolved. It started as a diagnostics server, grew a Python-based Goose orchestration layer, became a configurable migration platform with project definitions and rules, then became a first-party agent runtime, and finally a TypeScript-native rewrite with industrial features: isolated worktrees, resumable commits, targeted tests, progress tracking, and operational controls for running large migration campaigns.

Each layer was added in response to concrete failure modes in the previous version. This iterative hardening based on production failures is characteristic of mature LLMOps practice. The team didn't design the perfect system upfront; they built minimal infrastructure, ran it against real code, observed failures, and systematically addressed them.

## Product Rollout: The Temporary Migration Lane

The migration engine solved only half the problem. The product rollout had a separate constraint: they couldn't stop the world. Console is a live internal platform with daily active development. A migration requiring weeks of frozen development would never finish. Without an intermediate state, migration debt would accumulate as new code landed on the old framework.

They created a temporary Fluent lane inside the repo where new surfaces could migrate gradually while old ones kept working. Shared providers and host wiring could update first, product surfaces could follow in waves, and new code had somewhere to go that wasn't "please keep adding Base Web while we remove Base Web."

The final system had three layers:
- **Product rollout layer**: Introduced temporary migration lane, moved real surfaces gradually, then removed scaffolding
- **Product-specific migration layer**: Encoded component mappings, hints, rules, and linters
- **Shared migration engine**: Provided TypeScript server, runtime, worktrees, diagnostics, and test execution

This separation mattered for reusability—the shared engine could be reused for future migrations across the company. The temporary lane is a sophisticated migration pattern: introducing transitional architecture to enable incremental migration, then deliberately removing it to return to clean steady state. It's the opposite of permanent technical debt.

## Migration Execution as a Program

Once the temporary lane existed, the migration became a delivery program rather than a theoretical tooling exercise. They started with platform work: providers, host wiring, landing experiences, and shared foundation. Only then did high-volume rollout across product surfaces begin. By commit history, more than 80 distinct targets were migrated to Fluent across shared code and product surfaces.

The middle phase looked like a factory: migrate a surface, fix styling and behavioral regressions, rerun tests, repeat. Like any real migration program, it had exceptions. Some migrations stuck on first pass, some didn't, and a few required reverting and manual redoing after edge cases surfaced, especially where visual parity, overrides, or product-specific interactions mattered more than raw component substitution.

As they plainly state: "the agent got us through the bulk mechanics, but humans still had to do the last mile." This is honest reporting about AI capabilities—the system handled high-volume mechanical work reliably, but human judgment remained essential for edge cases and quality verification.

In February 2026, they started collapsing the migration lane back into steady-state platform. Base Web was removed from the temporary lane and product surfaces. Large shared areas moved back into main shared foundation. They added lint rules to block direct imports from the migration layer. The temporary lane existed to make migration possible but was never meant to become permanent architecture.

## Results and Metrics

The project clearly delineates three phases:

**Pre-Work (210 days)**: Before the first large migration wave hit product codebase, they spent 210 days building migration machinery and product-specific rules: 809 commits, 4,912 file changes.

**Actual Migration (240 days)**: Once the temporary Fluent lane existed in product codebase, migration ran for 240 days: 195 migration-related commits, 9,801 file changes overall.

**Total Effort (451 days)**: From first migration-engine commit on December 2, 2024, to cleanup endpoint on February 26, 2026, the effort spanned 451 days, driven primarily by one IC. Across tooling, product-specific migration layer, and rollout: 1,004 commits, 14,713 file changes.

The striking insight: almost as much work went into making the migration possible as went into running it. This is typical of production LLMOps at scale—infrastructure, tooling, validation, and safety mechanisms consume substantial effort, but enable reliable execution.

## Key LLMOps Lessons and Critical Assessment

This case study offers several critical lessons for production LLMOps:

**Tooling Before AI**: The TypeScript diagnostics server came first, establishing the substrate for safe operations. AI orchestration was layered on top of solid tooling infrastructure, not used as a replacement for it.

**Selective Context Is Superior to Comprehensive Context**: Using AST analysis to inject only relevant component hints based on actual imports dramatically improved quality while reducing token consumption. This generalizes to many LLMOps scenarios—dynamic, targeted context construction beats static, comprehensive context.

**Explicit End States Enable Validation**: The rule engine provided checkable success criteria. This shifted the problem from "did the model do something reasonable?" to "does this file satisfy explicit, tool-checkable requirements?" The latter is far more reliable for production systems.

**Convert Failures to Policy**: The 20+ custom linters represent accumulated operational knowledge from model failures. Production LLMOps requires systematic observation of failure modes and encoding them as automated checks.

**Fast Feedback Loops Are Essential**: The investment in warm Jest processes, RPC layers, and incremental validation enabled tight iteration loops. Without fast feedback, agents drift into expensive failure states.

**Incremental Migration Architecture**: The temporary migration lane enabled zero-downtime migration of a live platform with active development. This is sophisticated migration engineering that would be necessary with or without AI, but becomes more manageable with reliable automation.

**Human-in-the-Loop for Edge Cases**: Honestly reporting that "the agent got us through the bulk mechanics, but humans still had to do the last mile" is refreshing. The system handled volume; humans handled quality and edge cases.

**Historical Context Matters**: The team's emphasis that these patterns weren't obvious in late 2024 is important. They were discovering what trustworthy agentic migration requires, not following established playbooks. This is genuine LLMOps innovation, not merely applying known techniques.

**Critical Assessment**: The case study is notably honest about what worked and what didn't. They openly discuss failures: models generating syntactically valid but semantically wrong code, context bloat from comprehensive prompting, diagnostic wording affecting model behavior, and the need for manual intervention on edge cases. This transparency is valuable for practitioners.

However, some claims warrant scrutiny. The migration was "driven primarily by one IC," which is impressive but raises questions about knowledge concentration and reproducibility. The 451-day timeline for one person suggests either very high leverage from the tooling or significant manual work hidden in the "last mile" human intervention. The case doesn't quantify automation percentage—how many of the 9,801 migration-phase file changes were fully automated versus human-fixed?

The economic justification is implicit rather than explicit. They argue forking Base Web would be a "trap" due to ecosystem abandonment and knowledge costs, which is reasonable. But the actual cost-benefit of 451 days of IC time to build and run this system versus alternative approaches (coordinated manual migration, gradual rewrite with deprecation periods, hybrid approaches) isn't explicitly analyzed.

The reusability claim—that the shared migration engine can be reused for future migrations—is valuable but unproven in this narrative. Until the system successfully tackles a second, different migration, the generalizability remains theoretical.

## Conclusion

Block's Base Web to Fluent UI migration represents mature, production-grade LLMOps engineering. They built a sophisticated agent-driven migration system grounded in solid TypeScript tooling, selective context injection, explicit rule validation, custom linters encoding operational knowledge, fast feedback loops through warm processes and incremental validation, and clever migration architecture with temporary lanes.

The work demonstrates that successful AI-assisted code migration at enterprise scale requires treating it as a validated program with tight feedback loops and enforceable end states, not as a search-and-replace operation or naive prompting exercise. The system design—solid tooling foundation with AI as orchestration layer—is a pattern applicable well beyond this specific migration.

Most valuably, the case study honestly reports both successes and limitations, providing genuine operational knowledge for practitioners building similar systems. It's a significant contribution to understanding what production LLMOps actually requires when reliability matters and the codebase can't stop moving.
