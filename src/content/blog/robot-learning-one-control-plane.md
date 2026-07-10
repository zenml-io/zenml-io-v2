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
  url: "https://assets.zenml.io/content/blog/robot-learning-one-control-plane/d158c178/robot-cover2.avif"
  alt: "Diagram showing scattered GPU sources — neocloud H100 cluster, on-prem SLURM, hyperscaler credits, lab workstation — converging into one ZenML control plane"
seo:
  title: "One Control Plane for Robot Learning Across Clouds - ZenML Blog"
  description: "Robotics compute is spreading across clouds and clusters. Learn how one portable pipeline layer can keep the robot-learning loop reproducible."
  canonical: "https://www.zenml.io/blog/robot-learning-one-control-plane"
  ogImage: "https://assets.zenml.io/content/blog/robot-learning-one-control-plane/ef375457/robot-cover.jpg"
---

Robotics teams do not have a training job. They have a loop.

A robot records camera frames, joint states, actions, and failures. That data is cleaned and turned into episodes. A policy is trained, evaluated in simulation, tested on hardware, and eventually deployed. The next day, the fleet produces new evidence and the loop begins again.

Each part wants different infrastructure. Data processing belongs near the data. Simulation may need a large CPU and GPU fleet. Training wants the fastest accelerators the team can obtain. Hardware evaluation happens in the lab. Deployment ends at the edge.

That is why the defining infrastructure problem in robotics is not simply getting a large training run to finish. It is keeping the whole learning loop coherent while the compute underneath it keeps changing.

## Robot learning has outgrown a single cluster

The upper end of the market makes the scale visible. NVIDIA reports that GR00T N1 used up to 1,024 H100 GPUs for a single model and roughly 50,000 H100 GPU-hours for pretraining. The cluster was managed by OSMO, NVIDIA's orchestration platform for robotics workloads ([GR00T N1 technical report](https://arxiv.org/pdf/2503.14734)).

Most robotics companies will not train at NVIDIA's scale. But smaller teams face a messier version of the same systems problem. Capacity may come from a hyperscaler agreement, an AI cloud, an on-premises Kubernetes cluster, or a workstation in the lab. The mix changes as credits expire, new hardware arrives, and model requirements grow.

The strongest evidence comes from the teams themselves. Dyna Robotics is hiring an ML infrastructure engineer to turn its "multi-cloud GPU fleet into a training engine" where every run is reproducible and a researcher's next experiment is one command away ([Dyna Robotics job posting](https://jobs.ashbyhq.com/dyna-robotics/ec8f09de-ee26-4117-9b41-d317b074c2dc)). That is the problem in one sentence: the GPUs exist, but the team still needs a reliable way to use them as one system.

Cloud vendors see the same demand. CoreWeave now has a [physical AI offering](https://www.coreweave.com/industries/physical-ai) for simulation, policy training, VLA fine-tuning, and sim-to-real validation. Nebius and NVIDIA have launched a [managed physical AI stack](https://nebius.com/newsroom/nebius-teams-with-nvidia-to-build-cloud-for-robotics-and-physical-ai) built around OSMO, Cosmos, and Nebius infrastructure. This is more than a new cloud category. It is a signal that robotics infrastructure has become a market of its own.

## The expensive failure is a broken handoff

GPU utilization matters, but utilization is downstream of the workflow.

If data preparation, simulation, training, evaluation, and deployment are separate scripts owned by separate people, every transition becomes a place to lose context. Which episode set produced this checkpoint? Which preprocessing code ran? Was the failed evaluation caused by a model change, a simulator change, or a different dataset? Can the team reproduce the result on another backend next week?

RoboForce described the operational cost plainly: "Manual handoffs between data generation, simulation, and training means our GPUs can sit idle." After moving the workflow behind a single configuration, the company says its iteration cycle fell from weeks to days ([Nebius and NVIDIA customer announcement](https://nebius.com/newsroom/nebius-teams-with-nvidia-to-build-cloud-for-robotics-and-physical-ai)). It is a vendor case study, so the numbers deserve the usual caution. The workflow problem it describes is nevertheless familiar: idle compute is often a symptom of disconnected stages, not a lack of schedulers.

The data side is just as demanding. Wayve describes a fleet-learning loop that continuously collects, curates, trains, re-simulates, and validates models. Its public architecture evolved from an office server to custom ingest stations, Kubernetes-based simulation, Apache Beam preprocessing, and Azure storage capable of feeding production training from petabyte-scale datasets ([Wayve's engineering account](https://wayve.ai/thinking/scaling-machine-learning-from-garage-to-fleet-with-microsoft-azure/)). The hard part is not any one tool. It is maintaining the contract between all of them.

## Three reasonable strategies — and their trade-offs

There is no universal answer to this problem. Robotics teams generally choose some combination of three strategies.

**Standardize on one infrastructure vendor.** This reduces integration work and can be the right choice when capacity, pricing, and geography line up. Managed offerings from NVIDIA, Nebius, CoreWeave, and the hyperscalers are increasingly capable. The trade-off is that workflow decisions can become coupled to one provider's execution model.

**Build a platform in-house.** At sufficient scale, this is rational. Wayve built a sophisticated fleet-learning platform because its data volume and autonomy workflow justified the investment. The cost is not only the initial build: a platform team must keep adapting it as researchers, models, clusters, and deployment targets change.

**Add a portable pipeline layer above the infrastructure.** This does not replace Kubernetes, SageMaker, Vertex AI, or a cluster scheduler. It defines the workflow independently and delegates execution to those systems. The team gets one representation of the learning loop while retaining the ability to change where it runs.

The third strategy is most useful for the awkward middle: teams with more than one useful compute environment, but without the appetite to build and maintain an internal orchestration product.

## What a control plane must preserve

A credible control plane for robot learning needs to preserve five things as infrastructure changes:

1. **The pipeline.** Episode ingestion, preprocessing, training, evaluation, and release should have one explicit dependency graph instead of a chain of scripts and messages.
2. **Execution choice.** The pipeline definition should stay stable while configured infrastructure determines where it runs. Individual high-compute steps should be able to use a specialized environment when necessary.
3. **Artifacts and lineage.** A checkpoint should point back to its producing run, parameters, code, and upstream artifacts. External datasets still need deliberate versioning, but the workflow should not discard their identity at each handoff.
4. **Repeatability without waste.** When code, parameters, and inputs are unchanged, safe steps should reuse previous outputs. Steps that read mutable external systems must opt out or use an explicit cache policy.
5. **Automation with gates.** Schedules and external events should be able to start the loop, while evaluation thresholds and human review control what reaches a robot.

These requirements are deliberately above the scheduler. A scheduler decides which node runs a job. A pipeline control plane records why that job exists, what it consumes, what it produces, and what should happen next.

## Where ZenML fits

ZenML is that pipeline layer. It does not sell GPU capacity or replace the systems that schedule it. It lets a team express the learning loop as Python steps and map those steps onto a configured stack.

ZenML supports orchestrators including Kubernetes, Kubeflow, SageMaker, Vertex AI, AzureML, and SkyPilot. Changing the active stack changes the execution backend without requiring a second copy of the pipeline. Backend-specific credentials, images, storage, and settings still have to be configured; portability is an architectural boundary, not magic.

[Step operators](https://docs.zenml.io/stacks/stack-components/step-operators) provide a second level of control. A pipeline can run under its normal orchestrator while a training step is submitted to a specialized environment such as SageMaker, Vertex AI, AzureML, Kubernetes, Modal, or Run:AI. A shared artifact store carries the inputs and outputs across that boundary.

Around execution, ZenML records pipeline runs and artifacts, supports configurable [step caching](https://docs.zenml.io/user-guides/starter-guide/cache-previous-executions), and can be invoked by schedules or external systems. For a robotics workflow, that means the episode batch, processed dataset, policy checkpoint, evaluation report, and release decision can remain parts of one traceable run rather than five disconnected jobs.

The result is not "one giant cluster." It is one learning loop that can survive several clusters.

## When this approach is not the right one

If all of your workloads fit comfortably in one managed platform, adding another abstraction may not pay for itself. If your company has the scale and platform-engineering depth to build a robotics-specific system like OSMO, owning every layer may be a strategic advantage. And no workflow tool will make a tightly coupled distributed training job span arbitrary clouds with poor network links; that job still needs an appropriate cluster.

But if your data, simulation, training, and evaluation workloads already cross infrastructure boundaries, those boundaries should not leak into every pipeline. Researchers should be able to improve the policy without relearning the deployment topology. Platform engineers should be able to change the topology without rewriting the science.

That is the opportunity for a neutral control plane: not to hide the real differences between clouds and clusters, but to keep those differences from breaking the robot-learning loop.

If that describes your team, [book a demo](https://www.zenml.io/book-your-demo) or try the [open-source framework](https://github.com/zenml-io/zenml).
