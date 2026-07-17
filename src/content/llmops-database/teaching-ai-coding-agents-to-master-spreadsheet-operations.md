---
title: "Teaching AI Coding Agents to Master Spreadsheet Operations"
slug: "teaching-ai-coding-agents-to-master-spreadsheet-operations"
draft: false
llmopsTags:
  - "data-analysis"
  - "code-generation"
  - "agent-based"
  - "prompt-engineering"
  - "harness-engineering"
  - "human-in-the-loop"
  - "evals"
  - "fastapi"
  - "anthropic"
  - "cloudflare"
industryTags: "finance"
company: "Witan Labs"
summary: "Witan Labs undertook a four-month project to improve AI coding agents' performance on spreadsheet tasks, aiming to match their proficiency in general programming languages. The team tackled the challenge that spreadsheets are inherently visual and structurally complex, making them difficult for LLMs to navigate and manipulate. Through extensive experimentation with different architectures and representations, they discovered that replacing multiple discrete tools with a single Node.js REPL environment was the breakthrough that dramatically improved performance. This approach, combined with high-fidelity formula and rendering engines for verification, domain-specific prompting, and robust evaluation methods, increased accuracy from 50% to 92% on their internal financial analysis benchmark while eliminating timeout issues."
link: "https://www.youtube.com/watch?v=HEFSExa0xl0"
year: 2026
seo:
  title: "Witan Labs: Teaching AI Coding Agents to Master Spreadsheet Operations - ZenML LLMOps Database"
  description: "Witan Labs undertook a four-month project to improve AI coding agents' performance on spreadsheet tasks, aiming to match their proficiency in general programming languages. The team tackled the challenge that spreadsheets are inherently visual and structurally complex, making them difficult for LLMs to navigate and manipulate. Through extensive experimentation with different architectures and representations, they discovered that replacing multiple discrete tools with a single Node.js REPL environment was the breakthrough that dramatically improved performance. This approach, combined with high-fidelity formula and rendering engines for verification, domain-specific prompting, and robust evaluation methods, increased accuracy from 50% to 92% on their internal financial analysis benchmark while eliminating timeout issues."
  canonical: "https://www.zenml.io/llmops-database/teaching-ai-coding-agents-to-master-spreadsheet-operations"
  ogTitle: "Witan Labs: Teaching AI Coding Agents to Master Spreadsheet Operations - ZenML LLMOps Database"
  ogDescription: "Witan Labs undertook a four-month project to improve AI coding agents' performance on spreadsheet tasks, aiming to match their proficiency in general programming languages. The team tackled the challenge that spreadsheets are inherently visual and structurally complex, making them difficult for LLMs to navigate and manipulate. Through extensive experimentation with different architectures and representations, they discovered that replacing multiple discrete tools with a single Node.js REPL environment was the breakthrough that dramatically improved performance. This approach, combined with high-fidelity formula and rendering engines for verification, domain-specific prompting, and robust evaluation methods, increased accuracy from 50% to 92% on their internal financial analysis benchmark while eliminating timeout issues."
notion:
  pageId: "397f8dff-2538-80be-929b-dc0430dd1d76"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-07-08T20:00:00.000Z"
  lastEditedTime: "2026-07-08T20:00:00.000Z"
  publishedAt: "2026-07-08T20:10:50Z"
---

## Overview

Witan Labs embarked on a focused four-month engineering effort to dramatically improve how AI coding agents interact with and manipulate spreadsheets. The project was motivated by the observation that while LLMs excel at programming tasks in languages like Python and JavaScript, they struggle significantly with spreadsheet operations despite spreadsheets being ubiquitous in business contexts, particularly financial analysis. The team started with agents achieving approximately 50% accuracy on an internal financial analysis benchmark and systematically improved this to 92% through architectural innovations, better tooling, and rigorous evaluation practices.

The case study is particularly valuable from an LLMOps perspective because it documents both successful approaches and numerous dead ends, providing insight into the iterative experimentation required to build production-grade AI systems. The presenter, Nuno, emphasizes that the journey involved trying "every conceivable way" of representing spreadsheets to LLMs and testing multiple agent architectures before arriving at solutions that actually moved the needle on performance.

## The Core Challenge: Spreadsheets and Visual Reasoning

The fundamental problem the team identified is that spreadsheets are inherently visual artifacts optimized for human perception. When a person opens an Excel file, they instantly parse the visual layout: revenue tables in one area, assumptions in another, charts elsewhere. This visual comprehension happens almost unconsciously and allows humans to quickly understand structure and relationships. However, LLMs lack this visual intuition and instead encounter spreadsheets as complex data structures where seemingly simple questions like "What's the revenue?" become ambiguous. The agent must determine which revenue metric is meant (net versus gross), which time period is relevant (quarter versus year), and whether a cell contains a raw input value or a computed formula. This disambiguation problem makes spreadsheet manipulation a deceptively challenging task for AI systems.

## Initial Architecture: Multi-Agent Approach and Its Limitations

Early in the project, the team experimented with splitting work across three specialized agents. The central component was an "edit agent" that followed a structured five-step process: defining the end state, creating a plan, executing the plan, verifying results, and iterating. This architecture did provide some benefits by changing the nature of errors. Instead of making mistakes during the actual construction of financial models, agents would make errors during the planning phase, which proved easier to diagnose and rectify.

However, this multi-agent approach ultimately proved to be a dead end. The architecture was too rigid in practice. The discovery phase ran only once at the beginning of each task and couldn't be revisited later when new information emerged. More critically, context didn't flow effectively between the different specialized agents, creating information silos that prevented the system from building on insights gained during execution. This architectural limitation forced the team to reconsider their fundamental approach.

## Representation Experiments: Many Attempts, Few Successes

The team conducted extensive experiments with different ways to represent spreadsheets to LLMs, trying approximately every major format they could conceive. Each representation had theoretical advantages that made it worth exploring, but almost none worked well as a standalone solution.

SQL was an obvious candidate because it's been used for decades to query structured data and appears extensively in LLM training data, theoretically giving models strong familiarity with the syntax and semantics. However, SQL proved inadequate for spreadsheet operations, likely because spreadsheets contain layout, formatting, and formula dependencies that don't map cleanly to relational database concepts.

XML was another natural choice since Excel files are actually stored on disk in XML format. The team hypothesized that working with the native file format might give the LLM advantages, but this approach also failed to deliver results.

From these experiments, two concepts did emerge as useful components in the final solution, even though they didn't work as complete representations. CSV/TSV views of spreadsheet regions turned out to be valuable as one tool among many. When the agent needed to examine a portion of a spreadsheet in tabular form, these simple text representations proved effective. HTML representations also contributed by introducing notions of layout and formatting, which led the team toward building a rendering engine that could show agents what a spreadsheet actually looks like visually.

## The REPL Breakthrough: From Many Tools to One Interface

The most significant breakthrough came when the team replaced their accumulated collection of approximately 15 specialized tools with a single unified interface: a Node.js REPL (Read-Eval-Print Loop). This architectural shift fundamentally changed how agents interacted with spreadsheets.

In the previous architecture, agents would need to make 10 to 15 sequential tool calls to explore a spreadsheet and derive an answer. Each tool call was essentially a discrete operation, and even parallel tool calling didn't help much because there was no way to combine results or build on previous work. This sequential approach frequently resulted in timeouts, as tasks exceeded the five-minute threshold the team had set for practical usability.

With the REPL approach, all those specialized tools became JavaScript functions that could be composed and combined within a single tool call. The agent could write JavaScript code that invoked multiple operations, stored intermediate results in variables, and built complex analytical workflows. This composability was transformative.

The choice of JavaScript was pragmatic rather than ideological. The team needed a scripting language that was easy to sandbox for security, well-understood by LLMs due to extensive training data, and suitable for agent interaction. Python would likely have worked equally well. Importantly, the actual implementation that manipulated spreadsheet files was written in C#, demonstrating the architectural principle of using different languages for different purposes: the scripting language for agent interaction and the right implementation language for the actual file operations.

## REPL Versus Code Mode: The Power of Persistent State

The team distinguishes their REPL approach from the increasingly popular "code mode" pattern that has appeared in various LLM APIs. Code mode allows agents to combine multiple tool operations into a single code block, which is valuable for reducing roundtrip overhead. However, a true REPL goes further by maintaining persistent state across multiple tool invocations.

With REPL semantics, an agent can call the tool once, define variables and intermediate results, see the output, engage in reasoning about what was learned, and then make subsequent tool calls where those previously defined variables remain accessible. This statefulness enables incremental problem-solving and allows agents to build scaffolding for complex tasks.

Interestingly, the team observed that agents using pure code mode without REPL persistence would often write long scripts, commonly 50 lines of JavaScript or more, attempting to accomplish everything in a single shot. With REPL persistence, agents wrote shorter scripts because they could work incrementally. This turned out to be beneficial because it allowed more interleaving of computation and reasoning. The agent could perform some operations, reflect on the results, and then decide what to do next, leading to better answers achieved more quickly. The system became more adaptive and less static.

## Extensibility and Developer Experience

Another advantage of the REPL architecture emerged around extensibility. In the previous multi-tool approach, adding new capabilities meant creating additional tool definitions that would be injected into the tool schema. Each new tool had to be carefully documented, and the team needed to observe how it interacted with existing tools, leading to combinatorial complexity as the toolkit grew.

With the REPL approach, adding new capabilities simply meant exposing additional methods in the JavaScript environment. Making agents aware of these new methods was as straightforward as creating TypeScript type definition files and including them in the prompt. This pattern scaled much better and reduced the engineering overhead of expanding the agent's capabilities.

## Verification Loops: The Role of High-Fidelity Engines

A recurring theme in the presentation is the critical importance of feedback loops in enabling agents to produce high-quality work. The team draws an analogy to conventional software development: coding agents perform much better when they can compile code, run linters, and execute tests, then iterate based on those results. Human developers similarly struggle to write correct code if denied the ability to compile, test, and debug. The same principle applies to spreadsheet operations.

To enable effective verification loops for spreadsheet tasks, Witan Labs built two sophisticated engines. The formula engine calculates spreadsheet formulas, allowing agents to verify that their formulas produce expected results. The rendering engine generates images showing how a range of cells appears with all formatting and layout applied, providing a visual source of truth.

These engines serve as verification mechanisms that close the feedback loop. After an agent modifies a spreadsheet, it can use these engines to confirm the changes produced the intended effect. When results don't match expectations, the agent can iterate, fixing formulas or adjusting formatting until the verification succeeds.

However, the team emphasizes that these verification loops only work if the underlying engines are high-fidelity. If the formula engine only implements 50% of Excel's formula functions, the verification loop actually becomes counterproductive. The agent will write a formula that should work in real Excel, attempt to verify it with the incomplete engine, receive an error or incorrect result, and then "fix" the formula in ways that make it wrong for actual use. Low-fidelity verification is worse than no verification at all. This insight has significant implications for LLMOps: building production AI systems often requires substantial investment in accurate simulation and testing infrastructure.

## Domain Knowledge and Prompt Engineering

Throughout all the architectural iterations, one intervention consistently improved results: incorporating domain-specific knowledge into prompts. This isn't primarily about teaching LLMs concepts they don't already know. Base models generally understand what revenue, ARR, or other financial metrics mean. Rather, domain knowledge in prompts serves to focus the model's attention on relevant concepts and interpretations for the specific task at hand.

LLMs have vast knowledge spanning many domains, which can sometimes work against them when solving specialized tasks. By including domain-specific context and terminology in prompts, the team could "pigeonhole" the model, guiding it to activate relevant knowledge and interpretations while de-emphasizing less applicable information. This prompt engineering technique proved remarkably portable, delivering benefits across all the different architectural approaches the team tried, from multi-agent systems to the final REPL design.

## Evaluation: The Journey to Reliable Metrics

Building an effective evaluation framework proved to be substantial work and a critical enabler of the entire project. Without reliable evaluation, the team couldn't have confidently determined whether changes like adopting CSV representations or SQL approaches were actually beneficial.

Initially, the team relied entirely on LLM-as-judge evaluation, where another language model assesses the quality of agent outputs. This approach is sometimes the only practical option and can provide useful signals. However, it has a significant weakness: when evaluation scores change, it's ambiguous whether the change reflects actual improvements in agent performance or merely variations in how the evaluator model judges outputs. This ambiguity undermines confidence in the development process.

The team invested in replacing LLM-as-judge with deterministic comparisons wherever possible. For example, they created golden reference spreadsheets with defined input cells and output cells. These reference spreadsheets functioned as black-box specifications: given specific input values, they would produce specific output values through their formulas. To evaluate an agent-generated spreadsheet, the team would inject the same input values and verify whether the outputs matched. This deterministic comparison is more trustworthy and doesn't suffer from evaluator inconsistency.

Not all aspects of spreadsheet quality can be evaluated deterministically, so LLM-as-judge remained valuable for subjective assessments like formatting quality or layout appropriateness. The key insight is to use deterministic evaluation wherever possible and reserve LLM-based evaluation for aspects that genuinely require subjective judgment.

## Debugging: Agent Confusion Versus Infrastructure Bugs

An important operational insight from the project concerns debugging agent systems. Many apparent reasoning failures in agents actually turn out to be infrastructure bugs rather than model limitations. When an agent repeatedly makes the same mistake, it's tempting to conclude the model is "being dumb" or failing to understand something. However, careful trace analysis often reveals root causes like bugs in tool implementations, incorrect examples in prompts that the model faithfully follows, or other infrastructure issues that cause tools to fail.

The team emphasizes the importance of meticulously examining execution traces to distinguish between genuine model reasoning limitations and fixable engineering problems. Agents often attempt to work around broken tools or follow misleading examples, making the symptom look like an AI problem when the underlying issue is purely engineering. There's significant value in this debugging work, as fixing infrastructure issues often yields larger improvements than prompt tuning or model selection.

## Performance Results and Timeline

The project achieved dramatic improvements over its four-month timeline. Starting from 50% accuracy on the internal financial analysis benchmark before implementing the REPL, the team reached 74% immediately after the REPL transition. Subsequent refinements, while individually less dramatic than the REPL breakthrough, collectively brought performance to 92%. These refinements included better fuzzy search functions, formula dependency tracing, system prompt improvements, and bug fixes.

Beyond accuracy improvements, the REPL architecture essentially eliminated timeout issues. In the previous architecture, many tasks would exceed the five-minute threshold and become impractical. The efficiency gains from composable REPL operations meant virtually no tasks timed out in the new system, representing a qualitative improvement in reliability.

## Model Evolution and Interface Durability

The team reflects thoughtfully on which aspects of their solution are likely to remain relevant as AI capabilities evolve. They note that four or five major model releases occurred during their four-month project, and each new model was better able to leverage the verification loops they had built. More capable models extracted more value from the feedback provided by formula calculation and rendering engines.

The REPL interface, while optimal for current models, is explicitly acknowledged as potentially temporary. The team chose the REPL because coding is what current state-of-the-art models excel at. However, as labs invest heavily in computer use capabilities, future models might become as proficient with mouse-and-keyboard interactions as they currently are with coding. At that point, a visual interface mimicking human interaction might outperform the REPL approach.

What the team believes will endure is the need for high-fidelity verification loops. Regardless of the interface through which agents interact with spreadsheets, having accurate engines that can verify results and provide feedback for iteration will remain valuable. In fact, as models become more capable, they increasingly benefit from these verification mechanisms. This suggests a durable investment thesis for LLMOps: building accurate simulation, calculation, and rendering infrastructure that supports agent verification pays compounding dividends as model capabilities improve.

## Generalizable Lessons for LLMOps

The presentation concludes with several lessons the team believes generalize beyond spreadsheet automation to other agent-building efforts.

First, if an agent is making many sequential or parallel tool calls, the architecture has essentially created a poorly designed scripting language. It's better to provide a real scripting language through code mode or REPL patterns that allow compositional operations.

Second, feedback loops matter profoundly. If working in a domain where verification tools already exist, that's advantageous. But if the domain lacks such tools, it's worth the substantial engineering investment to build them. The accuracy gains and reliability improvements justify the effort.

Third, interfaces are crucial and worth extensive experimentation. The REPL dramatically changed Witan Labs' results. However, teams should expect to revisit interface decisions as model capabilities evolve. What's optimal today may not remain optimal as models develop new strengths.

Fourth, planning and structured reasoning remain valuable, even as agent architectures evolve. The think-before-acting pattern consistently helps performance.

Fifth, domain knowledge injection through prompting delivers consistent benefits. The goal is less about teaching models and more about focusing their attention on domain-relevant concepts and interpretations.

Finally, evaluation should be as deterministic as possible. LLM-as-judge is valuable when subjective assessment is unavoidable, but deterministic comparisons provide more trustworthy signals when feasible. Teams should also invest time in trace analysis and debugging, as many apparent agent limitations are actually fixable infrastructure bugs.

This case study provides a unusually detailed view into the iterative, experimental process of building production AI systems, including candid discussion of failed approaches alongside successful ones. The focus on fundamental challenges like representation, interfaces, verification, and evaluation offers valuable guidance for practitioners working on similar agentic systems across different domains.
