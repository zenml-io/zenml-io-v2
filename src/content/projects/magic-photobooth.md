---
title: "Magic Photobooth"
slug: "magic-photobooth"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67e0ee9183d26b789d12a870"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-08-26T08:34:18.968Z"
  lastUpdated: "2025-08-26T08:34:06.718Z"
  createdOn: "2025-03-24T05:33:05.112Z"
description: "A personalized AI image generation product that can create your avatars from a selfie."
githubUrl: "https://github.com/zenml-io/zenml-projects/tree/main/magic-photobooth"
mainImageLink: "https://public-flavor-logos.s3.eu-central-1.amazonaws.com/projects/4.jpg"
previewImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/e3859126/67e242f8a2222c5e150495f1_batch-dreambooth.png"
tags:
  - "image-generation"
  - "video-generation"
  - "fine-tuning"
  - "stable-diffusion"
  - "lora"
tools:
  - "zenml"
  - "modal"
  - "kubernetes"
  - "huggingface-231eb"
  - "flux"
  - "stable-video-diffusion"
createdAt: "2025-03-24T11:03:04.312Z"
updatedAt: "2025-08-26T08:34:00.703Z"
projectId: "magic-photobooth"
seo:
  title: "Magic Photobooth"
  description: "A personalized AI image generation product that can create your avatars from a selfie."
  canonical: "https://www.zenml.io/projects/magic-photobooth"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/e3859126/67e242f8a2222c5e150495f1_batch-dreambooth.png"
  ogTitle: "Magic Photobooth"
  ogDescription: "A personalized AI image generation product that can create your avatars from a selfie."
---

#### Dreambooth Pipeline

Pipeline that finetunes Flux models using DreamBooth and LoRA adapters for personalized image generation.

#### Inference Pipeline

Pipeline that generates personalized images and short animated videos using finetuned models.#### Stack Components

<ul><li><strong>Orchestrator:</strong> kubernetes</li><li><strong>Artifact Store:</strong> default</li><li><strong>Step Operator:</strong> default</li></ul>Magic Photobooth transforms ordinary photos into personalized AI-generated avatars, allowing users to see themselves in any style, setting, or scenario imaginable.

### What It Does

Magic Photobooth creates custom AI avatars from your personal photos. It uses advanced AI technology to generate high-quality images of you as superheroes, historical figures, or in fantasy worlds, and can even create short animated videos featuring your digital twin.

### How It Works

<ul>
<li>Collects a small dataset of 5-10 clear photos of the subject</li>
<li>Trains a personalized AI model using DreamBooth and Low-Rank Adaptation (LoRA) technology</li>
<li>Customizes the powerful Flux image generation model specifically for your facial features</li>
<li>Generates images based on text prompts that describe desired styles and scenarios</li>
<li>Creates both static image galleries and animated video clips of your personalized avatars</li>
<li>Delivers results through a user-friendly interface with minimal technical requirements</li>
</ul>