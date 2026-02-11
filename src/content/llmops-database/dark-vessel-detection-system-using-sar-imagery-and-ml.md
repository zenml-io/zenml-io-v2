---
title: "Dark Vessel Detection System Using SAR Imagery and ML"
slug: "dark-vessel-detection-system-using-sar-imagery-and-ml"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "673f3ab89cbd6f1ca3a2f331"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-12-23T12:21:17.478Z"
  lastUpdated: "2025-12-18T16:37:56.365Z"
  createdOn: "2024-11-21T13:50:48.874Z"
llmopsTags:
  - "amazon-aws"
  - "devops"
  - "documentation"
  - "high-stakes-application"
  - "human-in-the-loop"
  - "internet-of-things"
  - "microsoft-azure"
  - "model-optimization"
  - "monitoring"
  - "open-source"
  - "orchestration"
  - "regulatory-compliance"
  - "reliability"
  - "scalability"
  - "scaling"
  - "security"
industryTags: "government"
company: "Defense Innovation Unit"
summary: "The Defense Innovation Unit developed a system to detect illegal, unreported, and unregulated fishing vessels using satellite-based synthetic aperture radar (SAR) imagery and machine learning. They created a large annotated dataset of SAR images, developed ML models for vessel detection, and deployed the system to over 100 countries through a platform called SeaVision. The system successfully identifies \"dark vessels\" that turn off their AIS transponders to hide illegal fishing activities, enabling better maritime surveillance and law enforcement."
link: "https://www.youtube.com/watch?v=CT21h9fU6V8&list=PLSrTvUm384I9PV10koj_cqit9OfbJXEkq&index=99"
year: 2023
seo:
  title: "Defense Innovation Unit: Dark Vessel Detection System Using SAR Imagery and ML - ZenML LLMOps Database"
  description: "The Defense Innovation Unit developed a system to detect illegal, unreported, and unregulated fishing vessels using satellite-based synthetic aperture radar (SAR) imagery and machine learning. They created a large annotated dataset of SAR images, developed ML models for vessel detection, and deployed the system to over 100 countries through a platform called SeaVision. The system successfully identifies \"dark vessels\" that turn off their AIS transponders to hide illegal fishing activities, enabling better maritime surveillance and law enforcement."
  canonical: "https://www.zenml.io/llmops-database/dark-vessel-detection-system-using-sar-imagery-and-ml"
  ogTitle: "Defense Innovation Unit: Dark Vessel Detection System Using SAR Imagery and ML - ZenML LLMOps Database"
  ogDescription: "The Defense Innovation Unit developed a system to detect illegal, unreported, and unregulated fishing vessels using satellite-based synthetic aperture radar (SAR) imagery and machine learning. They created a large annotated dataset of SAR images, developed ML models for vessel detection, and deployed the system to over 100 countries through a platform called SeaVision. The system successfully identifies \"dark vessels\" that turn off their AIS transponders to hide illegal fishing activities, enabling better maritime surveillance and law enforcement."
---

## Overview

This case study comes from a seminar presentation by Jal Dunman, Senior Adviser for Strategic Initiatives at the Defense Innovation Unit (DIU), who previously served as Technical Director of the AI portfolio at DIU. The presentation covers both high-level challenges of deploying AI in the public sector and a specific deep-dive into a maritime monitoring system designed to detect illegal fishing activity using machine learning applied to synthetic aperture radar (SAR) satellite imagery.

The project represents a fascinating intersection of environmental protection, international maritime law enforcement, and cutting-edge ML systems deployed at global scale. The system was ultimately deployed to SeaVision, a maritime domain awareness platform used by over 100 countries worldwide.

## The Problem Space

Illegal, unreported, and unregulated (IUU) fishing represents a massive global challenge. According to the presentation, approximately one in five fish caught globally originates from IUU fishing. This problem is exacerbated by the fact that deep-water fishing fleets frequently overfish in other countries' exclusive economic zones (EEZs), causing significant environmental, economic, and legal issues.

The International Maritime Organization requires ships over approximately 300 gross tons to be equipped with Automatic Identification Systems (AIS) – radio frequency transponders that broadcast ship identity, location, and activity. However, vessels engaged in illegal fishing typically disable these transponders to avoid detection, becoming what are termed "dark vessels."

Traditional monitoring approaches face a fundamental scaling challenge: the ocean is enormous, and no country has sufficient patrol vessels to monitor everywhere simultaneously. This is particularly acute for nations like Pacific island states that have massive EEZs but limited coast guard resources.

## Technical Approach: Synthetic Aperture Radar

The solution leverages the revolution in commercial space-based sensing, specifically synthetic aperture radar (SAR) satellites. SAR offers critical advantages over electro-optical (camera-based) imagery for this use case:

- **All-weather capability**: SAR penetrates cloud cover and works at night
- **Difficult to evade**: Unlike optical sensors, vessels cannot hide from SAR by covering themselves with tarps
- **Metal detection**: Ships (particularly their metal hulls and structures) produce strong radar reflections

SAR works by having a satellite emit radar signals while moving, then receiving the reflected signals. The resulting imagery shows reflectivity rather than visible light intensity, creating distinctive visual patterns where metal objects appear as bright star-like patterns. The imagery includes different polarizations (VV and VH) that reveal different features.

However, SAR imagery presents unique ML challenges compared to standard computer vision:

- **Unusual artifacts**: Radar creates interference patterns, especially near shorelines where signals bounce off multiple surfaces
- **Large image sizes**: Individual scenes are approximately 20,000 x 20,000 pixels
- **Different modalities**: The raw single-look complex (SLC) data includes both magnitude and phase information
- **Limited training resources**: Few pre-trained models or foundation models exist for SAR

## Dataset Creation and Crowdsourced Model Development

Rather than building models entirely in-house, the DIU team partnered with Global Fishing Watch (a nonprofit focused on monitoring legal fishing) and other organizations to create a large-scale public dataset and challenge. This approach reflects a common pattern in government ML work: demonstrating value on open-source analogs before accessing classified or restricted data.

The dataset characteristics:
- **Scale**: 991 SAR scenes, each 20,000 x 20,000 pixels
- **Annotations**: 243,000 annotations across 82 million square kilometers of imagery
- **Multi-modal features**: Co-registered channels including bathymetry (water depth), wind speed, wind direction, wind quality, and land/ice masks
- **Quality assurance**: Combination of automated and manual annotation with extensive quality checks

The task design was carefully structured to match operational needs rather than simple object detection:
- Detect objects in imagery
- Estimate vessel size
- Classify whether detected objects are vessels
- Characterize whether vessels are fishing vessels
- Special emphasis on performance within 2 kilometers of shoreline (where radar artifacts are worst but much fishing occurs)

The competition attracted thousands of submissions from around the world, with performance improving substantially over time.

## MLOps Challenges in Government Deployment

The presentation highlights several persistent MLOps challenges specific to public sector AI deployment:

**Legacy infrastructure**: Most government systems were built decades ago, before modern ML practices existed. The concept of software as a "living thing" requiring constant updates is not common practice in many government IT environments.

**Hardware and software access**: Applications lead access to compute resources. Even when cloud environments exist, they may lack the GPU resources needed for ML workloads. Some use cases require on-premises deployment for security reasons, fundamentally changing the engineering trade-offs.

**Acquisition timelines**: The government budgets three years in advance, meaning current-year budgets were written before ChatGPT existed. This creates significant lag between capability availability and deployment authorization.

**Model lifecycle management**: The ability to create, deploy, and manage multiple models while ensuring the workforce has the necessary skills remains a significant challenge. Bureaucratic processes can interfere with the rapid update cycles that ML systems require.

**Domain shift monitoring**: Unlike cloud deployments where models can be easily monitored, edge deployments (discussed below) require on-device performance monitoring, out-of-distribution detection, and autonomous decision-making about when to trust model outputs.

## Inference Optimization and Edge Deployment Challenges

One of the most interesting technical challenges discussed involves efficient inference for operational deployment. The best-performing competition models were ensembles that took approximately 15 minutes to process a single scene on a V100 GPU. While this might seem acceptable for occasional analysis, the operational reality creates different constraints:

**Communication bottleneck**: The limiting factor for satellite-based monitoring is not compute but downlink bandwidth. Commercial satellite constellations typically don't record images over open ocean because there's insufficient economic value to justify the communication costs.

**On-satellite processing**: The ideal solution involves running compressed models directly on the satellite, processing images to identify interesting targets, and only transmitting relevant detections to ground stations. This requires dramatic model compression while maintaining detection performance.

**Power and compute constraints**: Satellite hardware operates under severe power and compute restrictions, similar to embedded or "tiny ML" applications but with the added complexity of space-qualified hardware requirements.

**Latency requirements**: For detections to be actionable, they must reach decision-makers within hours. This requires intelligent prioritization of what data to transmit.

## Deployment to SeaVision

The culmination of the project was deployment to SeaVision, a maritime domain awareness platform used by over 100 countries. The system displays:
- Yellow dots representing vessels broadcasting AIS (self-reported positions)
- Red dots representing SAR detections not correlated with known AIS signals (dark vessels)

The visualization powerfully demonstrates the scale of dark fishing activity. In areas like the waters off Chennai, India, or the Galápagos Islands, the number of untracked vessels vastly exceeds those visible through AIS alone. Manual analysis of SAR imagery at this scale is infeasible – it's "hard, slow, unreliable, and frankly not feasible" for most countries.

The team implemented an efficient queuing and inference system to minimize costs while providing coverage for a large number of countries. Even occasional patrols informed by this data can affect fishing behavior, providing deterrence value beyond direct enforcement.

## Human-in-the-Loop Considerations

The presentation emphasizes that the vast majority of government AI systems are human-in-the-loop by design. Department of Defense policy specifies required levels of human control for various system types. For the dark fishing detection system, the ML flags potential targets, but humans make final determinations about vessel identity and enforcement actions.

This pattern – high recall ML to reduce human workload, with human decision-making retained – is described as particularly useful across government applications, from document analysis to financial systems.

## Research Contributions

The work was published at NeurIPS in the Datasets and Benchmarks track, demonstrating that public sector AI work can contribute to academic research. The dataset and challenge created multiple open research problems:

- Long-range context over extremely large images (20,000 x 20,000 pixels)
- Representation learning for SAR modality
- Leveraging single-look complex (raw) data rather than processed imagery
- Model compression for edge deployment while maintaining performance

## Lessons for Public Sector AI

The speaker offers several insights for successful government AI projects:

- **Understand actual stakeholder problems**: The stated problem may not be the real problem. Getting out of the building and observing workflows is essential.
- **Start with open-source analogs**: Demonstrating value on accessible data creates motivation for opening access to restricted resources.
- **Accept that data work is the majority of effort**: Government data is often in legacy systems with outdated ontologies, requiring substantial integration work.
- **Build dual-fluency talent**: The optimal pattern involves practitioners moving between public and private sectors, bringing technical currency from industry and mission understanding from government.

The case study demonstrates that while government AI faces unique challenges around infrastructure, acquisition, and regulatory constraints, it also offers unique opportunities: problems that don't exist in the private sector, massive distribution potential, and genuine societal impact.