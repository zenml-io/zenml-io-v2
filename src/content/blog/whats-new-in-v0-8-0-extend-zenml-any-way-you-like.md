---
title: "What's New in v0.8.0: Extend ZenML Any Way You Like!"
slug: "whats-new-in-v0-8-0-extend-zenml-any-way-you-like"
draft: true
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "65316c5fc5d4b19bf3948e86"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "staged-only"
  lastUpdated: "2024-01-26T10:10:37.975Z"
  createdOn: "2023-10-19T17:50:23.294Z"
author: "alex-strick-van-linschoten"
category: "zenml"
tags:
  - "zenml"
  - "release-notes"
date: "2022-05-18T00:00:00.000Z"
readingTime: 5 Mins Read
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/0d4f0275/65316c1fb883ff6e88e6f882_audrey-martin-FJpHcqMud_Y-unsplash.jpg"
---

**Last updated:** November 3, 2022.

ZenML 0.8.0 – and a number of changes around the edges including our messaging and website – is all about extensibility. We’ve been working hard to make it clear and comprehensible how you can add custom components to the core framework. You’ll love how we’ve upgraded and beautified the CLI, even giving it a speed boost while we were there!

Beyond this, a host of smaller bugfixes and documentation changes combine to make ZenML 0.8.0 a more pleasant user experience overall. For a detailed look at what’s changed, give [our full release notes](https://github.com/zenml-io/zenml/releases/tag/0.8.0) a glance.

## ⏲️ EVENT: Join the ZenML team for an MLOps Day

We are hosting a MLOps day on Wednesday, May 25, where we’ll be building a vendor-agnostic MLOps pipeline from scratch.

Sign up [here](https://www.eventbrite.com/e/zenml-mlops-day-join-us-in-building-a-vendor-agnostic-mlops-pipeline-tickets-336331515617) to join the entire ZenML team in showcasing the latest release, answering the community’s questions, and live-coding vendor-agnostic MLOps features with the ZenML framework!

## 🧘♀️ Extensibility is our middle name

From talking to many of you in our Slack community, we know that custom stack components and integrations is often at the top of your collective minds. ZenML 0.8.0 makes it much easier to extend the core ZenML framework. To achieve this, we changed the underlying code and wrote better documentation and guides on exactly how to do this.

<ul><li>We added the ability to register custom stack component flavors, and type was renamed to flavor everywhere.</li><li>We added the ability to easily extend orchestrators along with extended documentation on how you can do this yourself.</li><li>Our documentation for stacks, stack components and flavors has been fully fleshed out. We know you’re going to love it!</li><li>We added in new MySQL metadata stores along with the ability to use SSL to connect to those MySQL clients (e.g. in the cloud)</li></ul>

## 🥞 Manage your Stacks

We added some extra functionality that’s going to improve your quality of life considerably when interacting with your stacks!

<ul><li>You can now update your stacks and stack components directly! No need to delete and re-register things from scratch. Check out <a href="https://apidocs.zenml.io/0.8.0/cli/">the CLI docs</a> to learn how this works.</li><li>You can also remove custom (optional) attributes from stack components directly.</li><li>When deleting stacks with stack delete..., we’ll be sure to confirm with you before we go ahead and delete the stack now.</li><li>You can <a href="https://docs.zenml.io/">export the stack</a> to a shareable YAML file with zenml stack export and import from a compatible YAML file with zenml stack import. For the full collaborative experience you’ll want to <a href="https://docs.zenml.io/getting-started/core-concepts#zenml-server">use the ZenServer</a>, but this will still be a useful feature for some of you!</li></ul>

## 👭 Collaboration

<ul><li>The ZenServer now enables shared projects along with the foundations of a shared and collaborative user experience. We added some functionality to <a href="https://docs.zenml.io/platform-guide/set-up-your-mlops-platform/user-management">manage users</a> interacting with your shared ZenServer.</li><li>All of the new collaboration features have been fully documented <a href="https://docs.zenml.io/platform-guide/set-up-your-mlops-platform/user-management">here</a>.</li></ul>

## 🖥 CLI Improvements

<ul><li>We saw how it was sometimes difficult to see the full details of stack components and their configuration when using the CLI tool, so we made some fixes and tweaks to make sure text doesn’t get shortened. Instead, it just wraps onto the next line.</li><li>We added a zenml go command which launches an easy tutorial on how to get started with ZenML and some of its features.</li><li>We’ve noticed that the CLI has started to become a little sluggish and took the first steps towards adding some 🚄 speed back in.</li><li>We’ve been adding more and more stack components to handle the full MLOps story, so the list of options in the CLI has been growing and growing. With this release you’ll see that the CLI options are split into menu groups which should make everything a lot more comprehensible and navigable! Check it out! Doesn’t it look beautiful now?</li></ul>

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/1e5b72eb/65316c2776785fb3e3304e1d_zenml-cli.png" alt="Screenshot of how our CLI looksnow" />
</figure>

## 🚀 New Integrations

<ul><li>We saw we didn’t have <a href="https://zenml.io/integrations/pytorch">a PyTorch example</a> on the books yet, so we added that in.</li><li>We added a GCP ☁️ Secrets Manager to sit alongside our AWS Secrets Manager integration.</li></ul>

## 📖 Documentation & User Guides

<ul><li>We completely overhauled the ZenBytes introductory guide. You not only learn about ZenML but we teach some MLOps basics from the ground up. Check out the <a href="https://github.com/zenml-io/zenbytes">notebook-based lessons here</a>! (Shout out to Felix for making this happen!)</li><li>Like our CLI commands, our examples directory was starting to get a bit unwieldy with all the additions so we updated how that all looks and is presented. <a href="https://github.com/zenml-io/zenml/tree/main/examples">The main README</a> subdivides the examples by use case.</li></ul>

## ➕ Other Updates, Additions and Fixes

<ul><li>We improved how secrets are passed around in a deployed or cloud setting.</li><li>We added additional metadata tracking for pipeline runs which adds to what you can see as part of the post-execution workflow. (This includes tracking the Git SHA, the Docker SHA as well as docstrings.)</li><li>Model deployer logs can now be streamed through the CLI and not just accessed post-facto. Viewing the logs is as simple as calling zenml model-deployer models logs from the CLI.</li><li>After popular request, the -f or --force flag has now been replaced with -y or --yes. Don’t worry, though, this won’t break your workflows just yet. We’ve deprecated the -f flags and you’ll see an error message for a while before we remove it completely.</li><li>You can now pass in-line pip requirements into your pipeline decorator instead of only being able to pass in a requirements.txt file. We also renamed this parameter from requirements_file to just requirements, but don’t worry we just deprecated the old parameter to give you time to adjust your code.</li><li>We fixed <a href="https://docs.zenml.io/stacks-and-components/component-guide/data-validators/evidently">the Evidently drift detection visualizer</a> so that it now works on Google Colab notebooks again. (Hamza is doing an AMA with the Evidently community on May 24; <a href="https://www.eventbrite.co.uk/e/ama-whamza-tahir-co-founder-zenml-tickets-336732525047">click here</a> to register!)</li></ul>

## 🙌 Community Contributions

We received a new community contribution during this release cycle, from Avram Ðorđević in Belgrade. It’s great to have the community returning to contribute to the codebase! Avram added support for scipy sparse matrices [in his PR](https://github.com/zenml-io/zenml/pull/534).

## 👩💻 Contribute to ZenML!

Join our [Slack](https://zenml.io/slack-invite/) to let us know if you have an idea for a feature or something you’d like to contribute to the framework.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/bd349247/65316c27ed57d3587fa6da75_roadmap.png" alt="Screenshot of the new hub for ourroadmap" />
</figure>

We’re super excited to be able to share [the new home for our roadmap](https://zenml.io/roadmap) where you can vote on your favorite upcoming feature or propose new ideas for what the core team should work on. You can vote without needing to log in, so please do let us know what you want us to build!

[Photo by [Audrey Martin](https://unsplash.com/@avmartin) on [Unsplash](https://unsplash.com/photos/FJpHcqMud_Y)]

