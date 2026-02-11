---
title: "Cloud-Based Generative AI for Preliminary Engineering Design"
slug: "cloud-based-generative-ai-for-preliminary-engineering-design"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "675b1c0612c6ac3c02a9820b"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:49:49.527Z"
  createdOn: "2024-12-12T17:23:18.235Z"
llmopsTags:
  - "high-stakes-application"
  - "data-analysis"
  - "data-integration"
  - "model-optimization"
  - "knowledge-distillation"
  - "latency-optimization"
  - "cost-optimization"
  - "monitoring"
  - "databases"
  - "cicd"
  - "scaling"
  - "pytorch"
  - "wandb"
  - "databricks"
  - "microsoft-azure"
industryTags: "automotive"
company: "Rolls-Royce"
summary: "Rolls-Royce implemented a cloud-based generative AI approach using GANs (Generative Adversarial Networks) to support preliminary engineering design tasks. The system combines geometric parameters and simulation data to generate and validate new design concepts, with a particular focus on aerospace applications. By leveraging Databricks' cloud infrastructure, they reduced training time from one week to 4-6 hours while maintaining data security through careful governance and transfer learning approaches."
link: "https://www.youtube.com/watch?v=KlAIvPnC7QE"
seo:
  title: "Rolls-Royce: Cloud-Based Generative AI for Preliminary Engineering Design - ZenML LLMOps Database"
  description: "Rolls-Royce implemented a cloud-based generative AI approach using GANs (Generative Adversarial Networks) to support preliminary engineering design tasks. The system combines geometric parameters and simulation data to generate and validate new design concepts, with a particular focus on aerospace applications. By leveraging Databricks' cloud infrastructure, they reduced training time from one week to 4-6 hours while maintaining data security through careful governance and transfer learning approaches."
  canonical: "https://www.zenml.io/llmops-database/cloud-based-generative-ai-for-preliminary-engineering-design"
  ogTitle: "Rolls-Royce: Cloud-Based Generative AI for Preliminary Engineering Design - ZenML LLMOps Database"
  ogDescription: "Rolls-Royce implemented a cloud-based generative AI approach using GANs (Generative Adversarial Networks) to support preliminary engineering design tasks. The system combines geometric parameters and simulation data to generate and validate new design concepts, with a particular focus on aerospace applications. By leveraging Databricks' cloud infrastructure, they reduced training time from one week to 4-6 hours while maintaining data security through careful governance and transfer learning approaches."
---

## Overview

This case study presents a collaboration between Rolls-Royce, Databricks, and the University of Southampton to apply generative AI techniques—specifically Conditional Generative Adversarial Networks (cGANs)—to accelerate preliminary engineering design in the aerospace sector. The presentation, delivered by multiple speakers from the collaborative team, outlines both the technical approach and the operational infrastructure needed to train and deploy these models in a production context.

It is worth noting that while the presentation discusses "GenAI," the specific technology being used is not a Large Language Model (LLM) in the traditional sense but rather a cGAN architecture for image generation. However, the operational patterns, infrastructure choices, and governance considerations discussed are highly relevant to broader MLOps/LLMOps practices and represent a sophisticated approach to deploying generative models in a regulated industrial environment.

## Problem Context

Rolls-Royce faces a common challenge in aerospace engineering: the preliminary design phase requires rapid exploration of many design concepts, but detailed physics-based simulations (such as Computational Fluid Dynamics or Finite Element Analysis) are computationally expensive and time-consuming. At the early conceptual stage, engineers often lack the full 3D geometric detail needed for traditional simulation approaches, yet they still need to evaluate and compare potential design solutions.

The goal was to develop a system that could generate viable design suggestions based on a set of requirements and simultaneously predict the performance characteristics of those designs—essentially creating a "semi-instant alternative" to expensive traditional simulation studies.

## Technical Approach

The foundation of this work builds on cGAN (Conditional Generative Adversarial Network) research initiated at the University of Southampton. The key innovation lies in how engineering data is fused with pictorial representations for training the generative model.

### Data Encoding and Image Fusion

The methodology involves encoding simulation results into images in a structured way. Original images come directly from physics-based simulations (CFD, FEA, etc.) and represent the performance characteristics of specific designs. Engineering parameters—geometric parameters, performance parameters, and environmental parameters—are then encoded onto these images using bars and glyphs.

Each parameter is normalized to a specific range and embedded visually in the image. This approach is critical because it allows the model to learn the relationship between design parameters and visual performance outcomes. The team developed automated tooling to handle this encoding process at scale, as they needed to process thousands of images for training.

A key constraint mentioned is that the encoded parameters must not encroach on the "area of interest" in the image—designers need to be able to visually inspect the generated designs to make decisions. If the bars and glyphs obscure important information, the generated designs become less useful.

### Categorical Training Structure

The training database is organized into categories based on output parameter values. For example, in one use case involving airfoils, designs were categorized by their loss coefficient values—from low on one end to high on the other. This categorical structure enables targeted generation during inference: engineers can request designs from a specific performance category.

The presentation showed an example using "cone angle" (the angle at which flow exits a component), represented by a glyph similar to a speedometer. This visual encoding allows the model to differentiate between various design categories and enables engineers to understand at a glance which category a generated design falls into.

### Validation Pipeline

Critically, unlike typical GAN applications where qualitative assessment of generated images is sufficient, aerospace engineering requires quantitative validation. The team emphasized that the aerospace industry cannot accept decisions based solely on generated images—physics-based validation is mandatory.

The workflow therefore includes:
- Generation of synthetic design images via the trained cGAN
- Decoding of the embedded parameters back into numerical values
- Running actual physics-based simulations (CFD, FEA) using those parameters
- Comparison between predicted performance (from the generated image) and actual simulated performance

The team reported achieving "really good correlation" between CFD results and the predictions encoded in synthetic cGAN-generated images, though specific error metrics were not provided in the transcript.

## Infrastructure and MLOps Practices

### Cloud Migration and Databricks Platform

Initially, the team was running training on desktop machines, with a single training run taking approximately one week to reach convergence (around 500 epochs). This was unsustainable for iterative design exploration, as each new design concept essentially requires training a new model from scratch rather than fine-tuning an existing one.

Databricks was selected as the platform for scaling this work. The choice was driven by several factors:

**Governance and Data Sensitivity**: Rolls-Royce deals with highly sensitive data, including designs that may have export control restrictions. The team implemented a framework where only data classified as "EAR99" (dual-use civil data without sensitive information) is pushed to the cloud. For sensitive data, they use transfer learning: the model is pre-trained on non-sensitive data in the cloud, then the trained model is brought back to local machines where transfer learning is performed on sensitive data. This ensures that proprietary or export-controlled information never leaves the secure local environment.

**Experiment Tracking with MLflow**: MLflow was integrated to track all training iterations. The team logged losses for both the discriminator and generator at every epoch and even at step-level granularity. Generated images at each epoch were stored as artifacts, enabling complete traceability. This is particularly important because if a CFD design choice needs to be questioned later, engineers can backtrack through MLflow to identify exactly which experiment, configuration, and training data produced that design.

**Data Management**: Because the training data consists of images (unstructured data), the team explored multiple approaches within Databricks. One approach is embedding images as Delta tables and programmatically reading them via Spark. With Unity Catalog, they also have a dedicated space for storing unstructured data in a governed fashion using Volumes.

### GPU Optimization and Compute Scaling

The team developed empirical rules for compute resource selection:
- For datasets under approximately 500,000 images, a single GPU is sufficient
- For larger datasets, a single-node multi-GPU architecture is recommended
- Multi-node clusters are reserved for hyperparameter search space analysis

Simply switching from V100 to A10 GPU clusters provided approximately 3x speedup without any code changes. The platform's flexibility in GPU selection allows the team to leverage newer hardware generations (with H100 availability mentioned as coming soon) for continued performance improvements.

The overall result was a reduction in training time from approximately 7 days to 4-6 hours per training run—a substantial improvement that makes iterative experimentation practical.

### Automated Hyperparameter Optimization

The team mentioned ongoing work to create a fully automated hyperparameter optimization architecture using Ray, which is available in the Databricks ML runtime. This would serialize and automate the search for optimal configurations within the Databricks environment.

## Experimental Results and Challenges

The team presented detailed results from a simplified beam-bending use case, chosen because simpler simulations run faster and have fewer parameters than complex aerospace components, enabling more thorough experimentation.

### Data Curation Insights

Initial experiments with a 98,000-image training dataset showed poor results. The root cause was identified as uneven data distribution: high density of data points in certain regions of the design space and sparse points elsewhere. When normalized, variations at the second decimal place produced negligible differences in pixel representation, causing the model to output nearly constant values.

After filtering to 63,000 images within a more constrained normalization range, results improved dramatically, with generated designs showing strong correlation to diagonal (perfect prediction) lines. This highlights the critical importance of data curation—a lesson that transfers directly to LLM training and fine-tuning contexts.

### CPU vs GPU Anomaly

An unexpected finding was that CPU training produced better-quality results than GPU training in some cases, even when running identical architectures and hyperparameters. The GPU results showed "flat line" predictions while CPU results showed the expected variance and correlation. The team acknowledged they do not yet fully understand this phenomenon and are still investigating.

This candid admission is noteworthy and suggests that GPU training for cGANs with embedded numerical precision requirements may require different architectural considerations than traditional image generation tasks where qualitative assessment is sufficient.

## Current Limitations and Future Work

The team is actively investigating:
- **Loss function optimization**: Literature suggests different loss functions (KL Divergence, Wasserstein with gradient penalty, Jensen-Shannon, etc.) may significantly impact model performance
- **Configuration parameter sensitivity**: Understanding how learning rates, epoch counts, filter counts, and network depth affect different types of training data
- **3D model generation**: Moving beyond 2D image-based representations to true 3D models, as actual aerospace products are three-dimensional. Early experiments with 3D models, including turbine blades, show promising results
- **Handling unconverged simulations**: Embedding knowledge of failed simulation parameters to tell the neural network which design spaces to avoid
- **Multi-objective optimization**: Real aerospace designs must satisfy multiple conflicting requirements (e.g., reduce weight while increasing efficiency). The current single-glyph approach handles only one objective at a time

## Assessment and Considerations

This case study demonstrates a sophisticated approach to applying generative AI in a highly regulated industrial context. The governance model—using transfer learning to keep sensitive data local while leveraging cloud compute for pre-training—is a pragmatic solution that other regulated industries might consider.

However, several caveats should be noted. The technology is still at the "example use case" stage, not yet applied to actual production components. The unexpected CPU vs GPU discrepancy suggests the approach is not yet fully mature. The requirement for physics-based validation of every generated design means this is augmentation of, not replacement for, traditional simulation workflows.

The collaboration model between Rolls-Royce, Databricks, and University of Southampton appears effective, combining domain expertise, cloud infrastructure, and academic research. The use of MLflow for complete experiment traceability is particularly well-suited to the aerospace industry's stringent documentation requirements.