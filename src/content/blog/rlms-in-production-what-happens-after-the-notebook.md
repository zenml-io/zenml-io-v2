---
title: "RLMs in Production: What Happens After the Notebook"
slug: "rlms-in-production-what-happens-after-the-notebook"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "69988c9c33f1bf68ae4d44f7"
  exportedAt: "2026-02-23T10:04:49.317Z"
  source: "live"
  lastPublished: "2026-02-20T17:37:38.589Z"
  lastUpdated: "2026-02-20T17:37:38.589Z"
  createdOn: "2026-02-20T16:32:28.060Z"
author: "alex-strick-van-linschoten"
category: "llms"
tags:
  - "llm"
  - "agents"
  - "production"
  - "llmops"
date: "2026-02-20T00:00:00.000Z"
readingTime: 7 mins
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/96774f67/69989a5d85555f7a204d0e68_rlm-pipelines__1_.png"
---

Recursive Language Models are having a moment. The [original paper by Zhang, Kraska, and Khattab](https://arxiv.org/abs/2512.24601) showed that instead of cramming documents into ever-longer context windows, you can let an LLM *programmatically explore* its data, calling tools, delegating sub-tasks, and iterating until it finds what it needs. DSPy's [experimental dspy.RLM module](https://dspy.ai/api/modules/RLM/) brought the pattern to a broader audience. Viral posts about [auditing codebases for 87 cents](https://kmad.ai/Recursive-Language-Models-Security-Audit) caught everyone's attention (worth noting: even that experiment frames itself as a demo, not a replacement for a real security audit, and reruns catch different issues). Prime Intellect called RLMs ["the paradigm of 2026."](https://www.primeintellect.ai/blog/rlm)

We agree. We've been running RLM-style workflows in production using ZenML's dynamic pipelines, and we wanted to share what we learned about making them observable, debuggable, and cost-controlled.

We're not here to replace DSPy or any other framework. We're here to show what happens when you wrap the RLM pattern in proper orchestration.

## What Are RLMs? A Quick Primer

If you've heard the buzz but haven't read the paper, here's the short version.

### The Problem: Context Rot

When you stuff massive documents into an LLM's context window, performance degrades. Even models with 200K+ token windows lose accuracy as the prompt grows. This is a measured phenomenon, not just vibes.

Long context windows do not guarantee long-context *competence*. Controlled studies show models can be [sensitive to where the relevant information sits](https://arxiv.org/abs/2307.03172) ("lost in the middle"), and that popular "needle in a haystack" tests can [overstate real performance because they reward lexical matching](https://arxiv.org/abs/2502.05167). When lexical cues disappear, performance drops sharply with longer inputs, even for models marketed as long-context. Chroma's ["context rot" report](https://research.trychroma.com/context-rot) shows that even with simple, controlled tasks, performance degrades with increased input length, and NIAH is not representative of real workloads.

A helpful way to think about why long context fails is: **how much work must the model do as the prompt grows?** Some tasks are essentially constant-complexity (find one needle). But many real problems scale with the amount of information. You need to scan most items (linear), or compare many pairs (quadratic). The RLM paper uses this exact ladder in its evaluation, and it explains why models can look great on needle tests yet collapse on aggregation-heavy tasks.

### The RLM Solution

Instead of feeding everything into one prompt, RLMs treat the context as a variable the model can programmatically explore:

<ol><li>Store the context externally (in a REPL environment, a database, a file)</li><li>The LLM writes code or selects tools to peek at, search, slice, and process the data</li><li>The LLM can recursively call itself (or cheaper models) on sub-chunks</li><li>A "root LM" orchestrates the process and assembles the final answer</li></ol>

Think of it this way: instead of reading a 10,000-page archive cover-to-cover, you sit at a desk with the archive in filing cabinets. You write a research plan, pull specific folders, delegate sections to research assistants. You never try to hold everything in your head at once.

### Key Results from the Paper

The numbers are striking:

<ul><li>RLMs can handle inputs up to <strong>two orders of magnitude beyond</strong> model context windows</li><li>RLM-Qwen3-8B (a Qwen3-8B model fine-tuned to run inside the RLM scaffold) improves median performance by 28.3% versus an untuned Qwen3-8B running in the same RLM scaffold, across the paper’s four long-context evaluation tasks.</li><li>On three tasks where the paper reports a meaningful direct GPT-5 baseline (CodeQA, OOLONG, OOLONG-Pairs), RLM-Qwen3-8B closes much of the quality gap to a direct GPT-5 call. On BrowseComp+ (1K documents), the full input does not fit in a direct prompt baseline, but the RLM scaffold can still operate.</li><li>Cost is comparable or lower than direct LLM calls at the median (more on the variance later)</li><li>It's primarily an inference strategy, not a training method: it works as a wrapper around existing LLMs (though a small amount of training can improve scaffold-use)</li></ul>

The paper's evaluation includes tasks where base models cannot even fit the input. BrowseComp+ at 1K documents is in the multi-million token range. RLM variants can still operate.

### How RLMs Differ from RAG

People sometimes confuse these. They're quite different:

<ul><li><strong>RAG</strong> retrieves chunks via embedding similarity. It's essentially a search engine: your query gets turned into a vector, and the system finds the nearest chunks.</li><li><strong>RLMs</strong> programmatically explore data. The model decides what to look at, what to search for, and what to delegate. It's a research assistant with a filing system, not a keyword search.</li></ul>

RAG retrieves. RLMs investigate.

RLMs are also part of a broader pattern: systems that treat "what's in context" as a first-class design problem. Recent work on [context folding](https://arxiv.org/abs/2510.11967) and [proactive context management](https://arxiv.org/abs/2510.24699) explores different approaches. RLMs push this further by letting the model programmatically explore externalized context instead of compressing it into a single prompt.

## The Production Gap

So the RLM pattern is powerful. `dspy.RLM` is excellent for prototyping and research. The trajectory output is fascinating: you can see what the model did, step by step. Budget knobs like `max_iterations` and `max_llm_calls` give you cost control per call.

But when you start running RLMs in production, new questions come up:

<ul><li>"I ran this on 500 documents. 3 chunks failed. Which ones? Why?"</li><li>"How much did each chunk cost? Where are my dollars going?"</li><li>"Can I cache the results so I don't re-process unchanged chunks?"</li><li>"This works on my laptop. How do I run it on Kubernetes with 50 chunks in parallel?"</li><li>"My teammate wants to understand what the model did on chunk 17. Where do I point them?"</li></ul>

There's also a less obvious concern: **variance**. RLM-style loops can have a heavy tail. The RLM paper reports cases where the median RLM run is cheaper than the median base-model query, but some RLM outliers become significantly more expensive, driven by long, variable-length trajectories. This is exactly the kind of tail risk that feels fine in a notebook and becomes painful at scale, unless you have per-chunk cost attribution, caps, and retries.

These are orchestration problems. DSPy is a framework for building LLM programs. ZenML is a framework for running them in production. They're complementary layers.

## ZenML Dynamic Pipelines as the RLM Runtime

### The Structural Parallel

The RLM pattern and ZenML's dynamic pipelines have the same shape:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/6293f041/699898420b4f9161462e8d3f_final.avif" alt="__wf_reserved_inherit" />
</figure>

The number of `process_chunk` steps is decided at runtime based on the query and corpus. ZenML auto-names repeated invocations (`process_chunk`, `process_chunk_2`, etc.).

### The Key Mechanism: .load() vs .chunk()

Here's the core of the dynamic fan-out, straight from the pipeline code:

```python
@pipeline(dynamic=True, enable_cache=True)
def rlm_analysis_pipeline(
    source_path: str = "data/sample_emails.json",
    query: str = "What financial irregularities or concerns are discussed?",
    max_chunks: int = 4,
    max_iterations: int = 6,
):
    # Clamp budgets to prevent resource exhaustion
    max_chunks = min(max(max_chunks, 1), 10)
    max_iterations = min(max(max_iterations, 2), 12)

    # Step 1: Load and summarize the corpus
    documents, doc_summary = load_documents(source_path=source_path)

    # Step 2: Decompose into chunk specs
    chunk_specs = plan_decomposition(
        doc_summary=doc_summary, query=query, max_chunks=max_chunks
    )

    # Step 3: Dynamic fan-out — one process_chunk step per chunk
    process_step = process_chunk.with_options(
        parameters={"query": query, "max_iterations": max_iterations}
    )

    chunk_specs_data = chunk_specs.load()  # Materialize for control flow
    chunk_results, chunk_trajectories = [], []
    for idx in range(len(chunk_specs_data)):
        result, trajectory = process_step(
            documents=documents,
            chunk_spec=chunk_specs.chunk(index=idx),  # DAG edge per chunk
        )
        chunk_results.append(result)
        chunk_trajectories.append(trajectory)

    # Step 4: Synthesize all chunk findings
    return aggregate_results(chunk_results, chunk_trajectories, query)
```

Two ZenML-specific APIs are doing the heavy lifting here, and they're easy to confuse:

<ul><li><strong><code>.load()</code></strong> means "bring this data into Python so I can make a decision." Here, we load <code>chunk_specs</code> to learn how many chunks the LLM created, so we know how many times to loop. It's synchronous.</li><li><strong><code>.chunk(index=idx)</code></strong> means "create a DAG edge to this specific element." Each <code>chunk_spec</code> gets passed to its own <code>process_chunk</code> step without materializing the entire list. This is what creates the dynamic fan-out in the DAG.</li></ul>

### What You Get for Free

Here's the practical comparison:

<div data-rt-embed-type="true"><div class="table-container">
  <table>
    <thead>
      <tr>
        <th>Capability</th>
        <th>Notebook/Script</th>
        <th>ZenML Dynamic Pipeline</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Recursive sub-calls</td>
        <td>Yes (in-process)</td>
        <td>Yes (each is a visible step)</td>
      </tr>
      <tr>
        <td>Per-chunk observability</td>
        <td>Manual logging</td>
        <td>Built-in: metadata, artifacts, logs</td>
      </tr>
      <tr>
        <td>Cost tracking per chunk</td>
        <td>DIY</td>
        <td><code>log_metadata</code> per step</td>
      </tr>
      <tr>
        <td>Caching unchanged chunks</td>
        <td>No</td>
        <td><a href="https://docs.zenml.io/concepts/steps_and_pipelines/advanced_features">Artifact caching</a></td>
      </tr>
      <tr>
        <td>Retries on failed chunks</td>
        <td>DIY</td>
        <td><a href="https://docs.zenml.io/concepts/steps_and_pipelines/advanced_features">Step-level retries</a></td>
      </tr>
      <tr>
        <td>Visual DAG</td>
        <td>No</td>
        <td>Dashboard shows runtime shape</td>
      </tr>
      <tr>
        <td>Run on K8s/Vertex/SageMaker</td>
        <td>Manual infra</td>
        <td>Stack abstraction</td>
      </tr>
    </tbody>
  </table>
</div></div>

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/16776c54/6998986544fad6cf49ba3bea_rlm-pipeline-dag-zenml-dashboard.avif" alt="ZenML dashboard showing the RLM analysis pipeline DAG visualization with steps for load_documents, plan_decomposition, parallel process_chunk workers, and aggregate_results, alongside the Run Insights panel displaying pipeline parameters including query, max_chunks, and max_iterations." />
</figure>

## Inside the RLM-inspired Loop

Our production example is RLM-inspired rather than a line-by-line reproduction of the paper’s REPL-based Algorithm 1. Instead of letting the model write arbitrary Python in a REPL, we constrain it to a small set of typed, deterministic tools and run a bounded plan → execute → reflect loop. This keeps the action space auditable and cost-capped while still capturing the core idea: programmatically exploring externalized context under explicit budgets.

### The Iterative Reasoning Pattern

Each `process_chunk` step runs a bounded iterative loop. Here's the simplified flow:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/7a713677/699898979588c3305133edad_final.avif" alt="__wf_reserved_inherit" />
</figure>

Each plan+reflect iteration costs 2 LLM calls. The final summarize costs 1. So `max_iterations=6` allows up to 2 full search-reflect rounds plus the final synthesis.

One clarification on terminology: in the original RLM paper, “recursive” refers to symbolic recursion inside a REPL, where the model writes code that can programmatically invoke sub-model calls over slices or transformations of the input and store intermediate results as variables. A reflect step is a useful control mechanism for deciding whether to keep searching, but recursion in the RLM sense is about those programmatic sub-calls inside the environment, not reflection alone. In the code, this looks like:

```python
while llm_calls < max_iterations - 1:  # Reserve 1 call for summarize
    # PLAN: LLM decides which tools to use
    plan_response = llm_call(SEARCH_PLAN_SYSTEM, plan_prompt, json_mode=True)
    llm_calls += 1

    # SEARCH: Execute the planned tools (no LLM calls)
    for search in searches:
        result = _execute_search(chunk_emails, search)

    # REFLECT: Is the evidence sufficient?
    reflect_response = llm_call(REFLECT_SYSTEM, reflect_prompt, json_mode=True)
    llm_calls += 1

    if sufficient:
        break  # Move to summarize
    # else: loop back with reflect_feedback guiding the next plan

# SUMMARIZE: Final synthesis
summary = llm_call(SUMMARIZE_SYSTEM, summarize_prompt, json_mode=True)
```

### The 5 Typed Tools

Instead of giving the model a full REPL where it can write arbitrary Python, this implementation constrains it to 5 typed, deterministic tools:

```python
TOOL_DESCRIPTIONS = {
    "grep":      "grep_emails(pattern) - Search email bodies/subjects by regex",
    "sender":    "filter_by_sender(sender) - Filter by sender name/email",
    "recipient": "filter_by_recipient(recipient) - Filter by recipient",
    "date":      "filter_by_date(start, end) - Filter by ISO date range",
    "count":     "count_matches(pattern) - Count regex matches across emails",
}
```

This is a deliberate design choice. The original RLM paper gives the model a full REPL, and DSPy’s dspy.RLM defaults to executing code in a local sandbox (Deno + Pyodide), and can be configured with different interpreters depending on your security and dependency requirements. In production, though, sandboxing alone doesn't cover the whole story. You also want to constrain the agent's *action space* so runs are auditable, deterministic where possible, and resistant to prompt injection and "excessive agency" style failures. This aligns with the [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) categories: prompt injection (LLM01), insecure output handling (LLM02), model denial of service via runaway computation (LLM04), and excessive agency (LLM08).

We made this trade-off deliberately. In production, you want to know exactly what the model *can* do, not hope it writes safe code. You lose some generality but gain safety, auditability, and consistent trajectory events.

### Two-Layer Budget Control

The pipeline enforces budgets at two levels:

```python
# Pipeline-level: controls DAG width (how many chunks)
max_chunks = min(max(max_chunks, 1), 10)

# Step-level: controls LLM calls per chunk
max_iterations = min(max(max_iterations, 2), 12)
```

Neither layer alone is sufficient. Without pipeline-level control, the LLM could decide to create 1,000 chunks. Without step-level control, a single chunk could loop forever. Together, they put a hard ceiling on both the total parallelism and the per-chunk LLM spend.

This matters because of the heavy-tail cost profile mentioned earlier. You need to track p95 cost per chunk, not just averages.

## The Trajectory Artifact: Seeing What the Model Did

This is where it clicks for most people.

Every action in the RLM loop gets logged to a trajectory artifact. Here's what one looks like, stored as a JSON artifact in ZenML:

```json
[
  {"step": "preview", "action": "Examined 15 emails", "output": "Chunk contains 15 emails, Date range: 2001-01..."},
  {"step": "plan", "iteration": 1, "action": "Planned 3 searches", "searches": [{"tool": "grep", "reason": "Search for LJM references"}]},
  {"step": "search", "iteration": 1, "tool": "grep", "args": {"pattern": "LJM"}, "match_count": 7},
  {"step": "extract", "iteration": 1, "new_matches": 7, "total_matches": 7},
  {"step": "reflect", "iteration": 1, "sufficient": false, "reasoning": "Found LJM mentions but need dates to establish timeline..."},
  {"step": "plan", "iteration": 2, "action": "Planned 1 searches", "searches": [{"tool": "date", "reason": "Filter to early 2001"}]},
  {"step": "search", "iteration": 2, "tool": "date", "args": {"start": "2001-01-01", "end": "2001-06-30"}, "match_count": 4},
  {"step": "reflect", "iteration": 2, "sufficient": true, "reasoning": "Have enough evidence about LJM timeline"},
  {"step": "summarize", "finding_preview": "4 emails from early 2001 discuss LJM unwinding...", "confidence": "high", "total_iterations": 2, "total_llm_calls": 5}
]
```

This matters for three reasons:

**Debugging.** "Why did the model say X?" Click into the step, read the trajectory. You can see exactly which tools it called, what it found, and why it decided the evidence was sufficient (or not).

**Cost attribution.** Each trajectory event is tied to a step with logged metadata: duration, LLM calls, matches found. The `log_metadata` call at the end of each `process_chunk` records everything you need for per-chunk cost breakdown, without writing any custom logging.

```python
log_metadata(
    metadata={
        "chunk_range": f"{start_idx}-{end_idx}",
        "chunk_size": len(chunk_emails),
        "llm_calls": llm_calls,
        "iterations": iteration,
        "matches_found": len(all_matches),
        "duration_s": duration,
    }
)
```

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/b28ec946/699898ad5c6f85fac61c8025_rlm-per-chunk-analysis-results.avif" alt="Per-chunk analysis output from the RLM pipeline showing detailed results for Chunk 1 (Emails 0-100) and Chunk 2 (Emails 100-200), each with findings about potential financial irregularities, supporting code snippets for email filtering logic, and significance scores." />
</figure>

**Reproducibility.** Trajectory + artifacts = you can reconstruct exactly what happened in any chunk, months later. This is the same instinct behind good experiment tracking, applied to LLM reasoning.

A trajectory is basically a structured trace: a sequence of decisions, tool calls, and evidence. That framing is becoming standard. [OpenTelemetry now defines GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/) for events and spans, including model name, token usage, and opt-in capture of inputs and outputs. Thinking of trajectories as traces makes it easier to plug RLM workloads into existing observability practices.

## Try It Yourself

The full example is in the ZenML repo and runs locally with just an OpenAI API key:

<figure>
  <img src="https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/80d9d154/699898e5761afcfde5227c9a_rlm-document-analysis-report.avif" alt="ZenML dashboard displaying the RLM Document Analysis Report with a synthesis showing 2 high-severity findings about financial irregularities, key findings with evidence summaries, evidence gaps noting areas for further investigation, and per-chunk analysis breakdown." />
</figure>

```bash
git clone https://github.com/zenml-io/zenml.git
cd zenml/examples/rlm_document_analysis
pip install -r requirements.txt
export OPENAI_API_KEY="your-key"

# Run with the bundled sample data (60 synthetic Enron-style emails)
python run.py --query "What were the key financial irregularities?"

# Or scale up with the full Enron dataset from Hugging Face
pip install datasets
python setup_data.py
python run.py --source data/emails.json --max-chunks 8
```

The pipeline works without an API key too (it falls back to keyword matching), so you can explore the dynamic pipeline structure without spending anything.

A few things to note:

<ul><li>The dynamic DAG is visible in the ZenML dashboard. Each <code>process_chunk</code> is a separate step you can click into.</li><li>The example includes a <a href="https://github.com/zenml-io/zenml/tree/main/examples/rlm_document_analysis/ui">deployable UI</a> for running queries interactively.</li><li>For Kubernetes deployment, it's a <a href="https://docs.zenml.io/concepts/steps_and_pipelines/dynamic_pipelines">stack configuration</a> change, not a code rewrite.</li></ul>

**Practical notes:** Dynamic pipelines are experimental and have orchestrator-specific support for isolated parallel steps. Also, `.load()` is synchronous: use it for control flow, but avoid loading large artifacts unnecessarily. Parallel logging can be noisy today because logs from concurrent steps may interleave.

**Links:**

<ul><li><a href="https://github.com/zenml-io/zenml/tree/main/examples/rlm_document_analysis">The example code</a></li><li><a href="https://docs.zenml.io/concepts/steps_and_pipelines/dynamic_pipelines">ZenML dynamic pipelines documentation</a></li><li><a href="https://arxiv.org/abs/2512.24601">The RLM paper (Zhang, Kraska, Khattab)</a></li><li><a href="https://dspy.ai/api/modules/RLM/">DSPy RLM module</a></li></ul>

## What's Next

There are several natural extensions we're excited about:

**Deeper recursion.** The current example is depth-1: decompose, process chunks, aggregate. Depth-2+ would have `process_chunk` spawn sub-pipelines for really large corpora. ZenML dynamic pipelines don’t yet support the spawning of sub-pipelines, but we kept it simple for the initial example.

**Evaluation pipeline.** Run the same queries through vanilla LLM, RAG, and the RLM pipeline, then compare accuracy, cost, and latency. This is a natural follow-up task.

**dspy.RLM inside steps.** You can drop `dspy.RLM` directly into the `process_chunk` step as the reasoning engine while keeping ZenML as the orchestration layer. The trajectory output plugs right in. DSPy builds the LLM programs. ZenML runs them in production.

**Community contributions welcome.** If you extend this for your own use case, we'd love to hear about it. The [example is on GitHub](https://github.com/zenml-io/zenml/tree/main/examples/rlm_document_analysis) and the pipeline structure is designed to be adapted.