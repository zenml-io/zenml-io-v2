---
title: "Your GPUs Are Everywhere. Your Robot-Learning Loop Shouldn't Be."
slug: "robot-learning-one-control-plane"
draft: false
author: "hamza-tahir"
category: "mlops"
tags:
  - "robotics"
  - "mlops"
  - "infrastructure"
  - "foundationmodels"
  - "orchestrators"
date: "2026-07-10T00:00:00.000Z"
readingTime: "8 mins"
mainImage:
  url: "https://assets.zenml.io/content/blog/robot-learning-one-control-plane/4657a09c/robot-cover.avif"
  alt: "Diagram showing scattered GPU sources — neocloud H100s, on-prem SLURM, hyperscaler, lab workstation — converging into one pipeline on any stack"
seo:
  title: "One Control Plane for Robot Learning Across Clouds - ZenML Blog"
  description: "The GPU crunch scattered robotics compute across neoclouds, on-prem, and hyperscalers. Here's why the robot-learning loop needs one control plane."
  canonical: "https://www.zenml.io/blog/robot-learning-one-control-plane"
  ogImage: "https://assets.zenml.io/content/blog/robot-learning-one-control-plane/ef375457/robot-cover.jpg"
---

Over the last year, a pattern started showing up in our conversations with robotics teams. It goes something like this: the ML team needs workstation-class GPUs for sim-to-real work and B200-class capacity for large-scale training. Neither is available where they'd like it to be. So they take what they can get — a reserved block on a neocloud, an on-prem cluster the hardware team stood up, hyperscaler credits from their last funding round, and a university SLURM allocation someone's co-founder still has access to.

One infrastructure lead at a Bay Area humanoid robotics company put it to us plainly: their GPUs "can be in Europe, or Asia Pacific, or literally anywhere." Their challenge wasn't finding a model architecture. It was building the orchestration layer to consume compute wherever it happens to exist.

Robotics companies became AI companies fast. The GPU crunch met them at the door.

## The scale is real, and so is the scatter

If you think robot learning is a small-compute problem, the public numbers say otherwise. NVIDIA's GR00T N1 foundation model was trained on up to 1,024 H100s for a single model, with roughly 50,000 H100-hours of pretraining — on a dedicated InfiniBand cluster, managed by an internal orchestration platform NVIDIA built specifically for robotics workloads ([GR00T N1 technical report](https://arxiv.org/pdf/2503.14734)).

Most robotics companies are not NVIDIA. They don't get a dedicated fat-tree cluster and an in-house orchestration team. What they get is the scatter: CoreWeave now runs a dedicated [Physical AI vertical](https://www.coreweave.com/industries/physical-ai) with robot foundation model companies as customers. Nebius and NVIDIA are [packaging a robotics cloud](https://nebius.com/newsroom/nebius-teams-with-nvidia-to-build-cloud-for-robotics-and-physical-ai) together. And the job boards tell you what's happening inside these companies: robot foundation model startups are hiring infrastructure engineers whose explicit charter is to "turn our multi-cloud GPU fleet into a training engine" — every GPU busy, every run reproducible.

Read that charter again. It's not a hiring ad for a research role. It's a company announcing, publicly, that its compute is scattered and its training loop is not.

## The problem isn't the GPUs. It's the loop.

Here's what the day-to-day actually looks like for a robot learning team. You collect episodes on real robots — trajectories of camera frames and joint states, thousands of short demonstrations. You preprocess them into a training-ready format. You train, producing a checkpoint. You evaluate that checkpoint, often on a physical robot the next morning. Then you do it all again, every day, forever — because the model is never done, and the fleet keeps generating data.

Now stretch that loop across four compute environments and watch what happens. The preprocessing runs where the data landed. The training runs wherever GPUs were available this week. The evaluation results live on someone's laptop. Every handoff is a Slack message, a manually copied path, an SSH session.

The teams living this describe it in remarkably consistent terms. RoboForce, a robot foundation model company, [said it publicly](https://nebius.com/newsroom/nebius-teams-with-nvidia-to-build-cloud-for-robotics-and-physical-ai): "Manual handoffs between data generation, simulation, and training means our GPUs can sit idle — costing us both time and money." A large AI-infra team building embodied-AI training systems wrote in their [technical report](https://arxiv.org/html/2603.11101v1) that the field "lacks industrial-grade systems that seamlessly connect simulation, training, and evaluation." Idle GPUs are the visible symptom. The disease is a loop held together by hand.

## The three ways teams cope today

**Build it in-house.** This is the default, and for a certain size of company it works. Wayve standardized on a single cloud and built its own fleet-learning platform on top — Kubernetes for the simulation fleet, Apache Beam for preprocessing, custom ingest infrastructure for [petabytes per year of driving data](https://wayve.ai/thinking/scaling-machine-learning-from-garage-to-fleet-with-microsoft-azure/). It's genuinely impressive. It also took a platform team that most Series A-C robotics companies cannot afford to staff — and the in-house route is exactly what those job postings above are trying to hire for, one engineer at a time.

**Marry one vendor.** NVIDIA's OSMO — the platform GR00T was trained on — is now being offered as a managed service through Nebius. CoreWeave ships SUNK, its Slurm-on-Kubernetes layer, and markets it for long-running RL and simulation jobs. These are good products solving real problems. But notice the shape of the deal: the orchestration layer belongs to the compute vendor. It organizes your workloads beautifully — inside their environment. The moment your compute spans a neocloud contract, an on-prem cluster, and hyperscaler credits (which, in a GPU crunch, it will), a vendor-anchored control plane becomes another silo with better branding.

**Duct tape.** SSH scripts, cron jobs, a shared drive of checkpoints, tribal knowledge about which cluster has the good drivers. Nobody chooses this. Everybody has some of it.

## What the missing layer actually needs to do

Strip away the vendor pitches and the requirements are fairly crisp:

1. **One pipeline definition, many backends.** The same training pipeline — written once, in Python — should run on your Kubernetes cluster today, a SLURM allocation tomorrow, and SageMaker next quarter, without rewriting the code. Compute is a deployment decision, not an architecture decision.
2. **Split a single pipeline across environments.** Preprocessing belongs near the data. Training belongs on whichever cluster has free accelerators. A real control plane lets individual steps of one pipeline land on different infrastructure.
3. **Caching, because the loop repeats daily.** When you rerun a continuous-training pipeline, the steps whose inputs haven't changed shouldn't burn GPU-hours again. In daily robot-learning loops, redundant recomputation is where compute budgets quietly die.
4. **Lineage from episode to checkpoint.** When a robot in the field misbehaves, you need to trace the deployed checkpoint back through the training run to the exact data that produced it. In regulated and safety-adjacent domains, this stops being nice-to-have.
5. **Triggers and schedules that close the loop.** New batch of teleop episodes lands, preprocessing kicks off, training follows, evaluation gates the checkpoint. The loop should run itself and page a human at the gate.

## Where ZenML fits — and where it doesn't

This is the layer ZenML occupies. To be clear about what we are not: we don't sell GPUs, and we don't own the compute layer. ZenML is the pipeline authoring and orchestration layer that sits on top of whatever compute you have — the neocloud block, the basement cluster, the hyperscaler account.

You write steps and pipelines in Python. A stack maps them onto infrastructure — Kubernetes, SageMaker, Vertex, SkyPilot, and the rest of the [integration list](https://docs.zenml.io). Switching backends is a one-line change, not a migration:

```bash
zenml stack set neocloud-k8s
python train_policy.py

zenml stack set onprem-cluster
python train_policy.py   # same pipeline, different GPUs
```

Step operators go further: one pipeline where the data-heavy preprocessing runs next to your storage and the training step runs on whichever environment currently has accelerators. Caching means the preprocessing you ran yesterday doesn't run again today just because the training config changed. Every run is tracked — code version, data version, config, checkpoint — so the episode-to-deployed-model lineage exists by default rather than by heroics. And because pipelines can be triggered by schedules or events, "data operator finishes a collection session, pipeline takes it from there" is configuration, not a night of scripting.

For the robot-learning loop specifically, the mapping is direct: episode ingestion, trajectory preprocessing, policy training, checkpoint evaluation, and fleet rollout each become pipeline steps with tracked artifacts between them — instead of five workflows connected by Slack messages.

We're also leaning further into where robotics compute actually lives: alongside the Kubernetes-shaped world, SLURM-based clusters — the default on on-prem pods and HPC allocations — are a first-class target we're actively building toward.

## The honest counter-argument

If you're an NVIDIA-scale company, you'll build your own OSMO. If you're Wayve-scale with a strategic hyperscaler relationship, single-cloud plus in-house platform is a rational bet. And if your entire compute footprint fits inside one neocloud contract and you expect it to stay there, the vendor's own tooling may carry you for a while.

The thesis breaks down at exactly the place most robotics companies live: too big for one cluster, too small to staff a platform team, holding a compute portfolio that changes with every funding round and every GPU shortage. If that's you, the control plane you need is the one that doesn't care whose logo is on the datacenter.

That's the bet we've made. If your GPUs are everywhere and your loop is held together by hand, we'd like to show you what it looks like when it isn't — [book a demo](https://www.zenml.io/book-your-demo), or start with the [open-source framework](https://github.com/zenml-io/zenml) and see how far it takes you.
