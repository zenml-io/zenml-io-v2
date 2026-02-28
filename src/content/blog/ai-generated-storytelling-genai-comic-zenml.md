---
title: "AI-Generated Storytelling: A GenAI Comic About ZenML"
slug: "ai-generated-storytelling-genai-comic-zenml"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "66c31c577a37989a2291bb64"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-03T15:19:04.226Z"
  lastUpdated: "2026-02-03T10:53:46.279Z"
  createdOn: "2024-08-19T10:20:07.564Z"
author: "alex-strick-van-linschoten"
category: "zenml"
tags:
  - "genai"
  - "zenml"
  - "education"
  - "mlops"
date: "2024-08-19T00:00:00.000Z"
readingTime: 4 mins
mainImage:
  url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/5a7b5a8c/6981d389ab6d2820d701bc00_6981d2aba626881724d7d4df_CleanShot_2024-08-19_at_11.49.00_402x.avif"
seo:
  title: "AI-Generated Storytelling: A GenAI Comic About ZenML - ZenML Blog"
  description: "Playing around with some genAI services and tools to create a story and comic that showcases the journey of MLOps adoption for a small team."
  canonical: "https://www.zenml.io/blog/ai-generated-storytelling-genai-comic-zenml"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/5a7b5a8c/6981d389ab6d2820d701bc00_6981d2aba626881724d7d4df_CleanShot_2024-08-19_at_11.49.00_402x.avif"
  ogTitle: "AI-Generated Storytelling: A GenAI Comic About ZenML - ZenML Blog"
  ogDescription: "Playing around with some genAI services and tools to create a story and comic that showcases the journey of MLOps adoption for a small team."
---

I spent a good chunk of Saturday making [ And ](https://drive.google.com/file/d/1cY-F67WBeGghImmiPZKpcbl8g2lQR4Xw/). The idea (thanks [Stefan](https://www.linkedin.com/in/stefan-daniel-nica/)!) was to showcase the value that the [open-source framework](https://github.com/zenml-io/zenml) we build can add to a team that's experiencing some pain in scaling their mostly-manual deployment and iteration processes. We speak to companies every day about the challenges that they face and the story I wanted to tell was one that represented the common patterns of companies moving through [their journey to MLOps maturity](https://www.zenml.io/blog/everything-you-ever-wanted-to-know-about-mlops-maturity-models).

<iframe src="https://drive.google.com/file/d/1cY-F67WBeGghImmiPZKpcbl8g2lQR4Xw/preview" width="595" height="842" frameBorder="0"></iframe>

## GenAI tooling

For this, I mainly used [getimg.ai](https://getimg.ai/) and [Replicate](https://replicate.com/) for the image generation. I started out using my local GPU machine but it was just much more convenient to use a service like getimg which allowed you to generate 6 or 8 images at once. (Fun fact: I created almost 2000 images during the course of the day!) I used [Replicate for Flux](https://replicate.com/black-forest-labs/flux-pro) since I had a bunch of credits there leftover from the [Hamel Husain / Dan Becker finetuning course](https://hamel.dev/blog/posts/course/) and it was impossible for me to play around with the Pro model locally (way too big!).

I used [Adobe Express](https://www.adobe.com/express/) for the layout after a 10 minute browse around for suggestions. There are fancier options for layout, but I needed something simple and it was extremely quick to get going. I watched [a really great tutorial on Twitter](https://x.com/icreatelife/status/1688652821334265856) (shout out to [Jordan Dené Ellis](https://x.com/jordandeneellis) and [Kris Kashtanova](https://x.com/icreatelife)!) for how to get started which taught me basically everything needed for the layout.

Storyboarding the panels was the product of a very long conversation with [Claude Sonnet](https://claude.ai/), starting with some priming around story archetypes, engaging flows, and then moving on to the panels & layout. Once I'd settled on a version I was happy with, I moved to image generation and actually making it happen, during which I sometimes then had to go back and reiterate or remove images / panels which felt redundant. No plan survives contact with reality and all that!

## Visual continuity challenges

The hardest part by far was to achieve visual continuity through the course of the whole story, namely how to make sure that the face of the main character didn't change from image to image. There are ways to achieve this through prompts (e.g. give the character a scar or glasses or a vibrant hair colour) but those all felt a bit hacky and didn't respond well to other changes (i.e. when his emotions changed). In the end I settled on a trick I'd learned during [Part 2 of the FastAI course](https://course.fast.ai/Lessons/part2.html) which was more along the lines of passing in an image into the prompt as well. I got this working with [diffusers](https://huggingface.co/docs/diffusers/index) first just as a proof that it was possible and then I quite quickly switched to having getimg.ai handle this — you can pass in characters, styles or other content.

<figure>
  <img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/b2e75b16/66c31c577a37989a2291bb59_66c31ba3d321355051a7b9dd_getimg-ai-generation.png" alt="Screenshot of the getimg.ai image generation tool, using custom characters" />
</figure>

Then the rest of the work was just many iterations, tweaking how much the image reference was to be followed, and adjusting the number of inference steps and the guidance scale. I also had a standard negative prompt as well ('Disfigured, blurry, nude'), but I didn't play around with that much. 

Aside from Flux, the other model I used was [realcartoon-xl-v6](https://huggingface.co/stablediffusionapi/realcartoon-xl-v6) and that was the main one I used for facial continuity. Unfortunately this means that some of the images in this comic book are photorealistic and others have more of a cartoon feel to them. I was too excited to play around with Flux and probably I should have just stuck with the cartoon styles and using a single model.

I saw that there is [a version of flux which works img2img on Replicate](https://replicate.com/bxclib2/flux_img2img) but I didn't have much success with that and the inference speeds were pretty slow. If I were to spend more time on this I'd definitely dive more into developing more characters with [DreamBooth-adjacent techniques](https://huggingface.co/docs/diffusers/v0.30.0/en/training/dreambooth#dreambooth), ideally on top of [flux-schnell](https://huggingface.co/black-forest-labs/FLUX.1-schnell). (There are also services which claim to handle character continuity for you (mainly in the 'AI girlfriend / boyfriend' space, it seemed) but none of them were flexible and speedy enough to handle the task. [Leonardo.ai](https://leonardo.ai), e.g. was one that I tried.)

## How to try this out

Nevertheless, it was really fun to play around with this. If you're planning on working on something similar, I'd recommend [getimg.ai](https://getimg.ai/) and do upgrade your account so you can get the fastest inference possible. (No affiliate links with them here; I just really found their service to be super solid!) That said, I reckon something like 1/10 of my time working on this was spent waiting for images to generate which felt just not-instant enough to be annoying throughout.

Let me know if you've worked on similar projects and you know of services or techniques or ways to make this a bit easier! It was just fun enough that I might try this again some time! And please do [give the comic a read](https://drive.google.com/file/d/1cY-F67WBeGghImmiPZKpcbl8g2lQR4Xw/)!