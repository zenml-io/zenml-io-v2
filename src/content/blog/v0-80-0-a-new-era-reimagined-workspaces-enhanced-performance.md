---
title: "ZenML 0.80.0: Workspace Hierarchy for Pro, Performance Gains for All"
slug: "v0-80-0-a-new-era-reimagined-workspaces-enhanced-performance"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "67dbd6e69b9a7bd5d4022853"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2026-02-03T15:19:04.226Z"
  lastUpdated: "2026-02-03T10:53:48.349Z"
  createdOn: "2025-03-20T08:50:46.880Z"
author: "hamza-tahir"
category: "zenml-updates"
tags:
  - "release"
  - "release-notes"
  - "dashboard"
  - "modal"
  - "pro"
  - "zenml"
  - "latest-news"
date: "2025-03-21T00:00:00.000Z"
readingTime: 6 min
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/735e319a/6981d36ce92aa039b696b894_6981d2af5c146b4b5a8cdcc3_zenml-release.avif"
seo:
  title: "ZenML 0.80.0: Workspace Hierarchy for Pro, Performance Gains for All - ZenML Blog"
  description: "ZenML 0.80.0 transforms tenant structures into workspace/project hierarchies with advanced RBAC for Pro users, while enhancing tagging, resource filtering, and dashboard design. Open-source improvements include Kubernetes security upgrades, SkyPilot integration, and significantly faster CLI operations. Both Pro and OSS users benefit from dramatic performance optimizations, GitLab improvements, and enhanced build tracking."
  canonical: "https://www.zenml.io/blog/v0-80-0-a-new-era-reimagined-workspaces-enhanced-performance"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/735e319a/6981d36ce92aa039b696b894_6981d2af5c146b4b5a8cdcc3_zenml-release.avif"
  ogTitle: "ZenML 0.80.0: Workspace Hierarchy for Pro, Performance Gains for All - ZenML Blog"
  ogDescription: "ZenML 0.80.0 transforms tenant structures into workspace/project hierarchies with advanced RBAC for Pro users, while enhancing tagging, resource filtering, and dashboard design. Open-source improvements include Kubernetes security upgrades, SkyPilot integration, and significantly faster CLI operations. Both Pro and OSS users benefit from dramatic performance optimizations, GitLab improvements, and enhanced build tracking."
---

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/fc4ef930/67dd31af6dc3ab266ec34552_Organization_-_Home.png" alt="__wf_reserved_inherit" />
  <figcaption>Tenants are now Workspaces!</figcaption>
</figure>

We're thrilled to announce the release of ZenML 0.80.0, one of our most significant updates to date! This release introduces fundamental architectural changes, substantial performance improvements, and enhanced resource management capabilities that benefit both our open-source users and ZenML Pro subscribers in distinct ways.

## ⭐ Pro Features: Redefining Resource Management with Projects

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/fdc3f7f7/67dd333134b4bd77e6d99b4d_org_hierarchy_pro.png" alt="__wf_reserved_inherit" />
  <figcaption>The new hierarchy introduced in ZenML 0.80.0. See a zoomed in version of the diagram here.</figcaption>
</figure>

The standout feature for **ZenML Pro users** is our complete refactoring of workspaces into a more flexible, hierarchical resource management system. What were previously called "tenants" are now "workspaces," and within these workspaces, we've introduced "projects" as a new scoping mechanism.

This architectural shift allows Pro users to subdivide a workspace into multiple logical namespaces, providing granular control over resources. Certain resources like Stacks and Secrets remain workspace-scoped, while others like pipelines, artifacts, and models become project-scoped. The result? Much more intuitive resource organization that scales with your team's growth.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/871499c6/67dd31d094daf71acca0333e_Workspace_-_Home.png" alt="__wf_reserved_inherit" />
  <figcaption>Users can create projects easily from the dashboard</figcaption>
</figure>

#### Enhanced Permission Management

Along with this restructuring comes a complete overhaul of our RBAC (Role-Based Access Control) system with new default roles that simplify permission management for Pro users. As your ML teams grow and your models proliferate, you'll appreciate the fine-grained permission controls that make it easier to maintain security while facilitating collaboration. Please consult [the docs for more information](https://docs.zenml.io/pro/core-concepts/roles) as to how you can control roles and permissions with the new project architecture.

#### Supercharged Tagging System

Our enhanced tagging system is another major upgrade **exclusively for Pro users** managing complex ML workflows. Pro subscribers can now:

<ul><li>Filter resources by type</li><li>Apply exclusive tag behavior (ensuring tags are uniquely applied)</li><li>Filter for multiple tags simultaneously</li><li>Easily sort pipelines, artifacts, and models</li></ul>

This makes resource discovery and organization significantly more powerful, helping Pro teams manage increasingly complex ML ecosystems. The advanced filtering capabilities are particularly valuable for larger organizations with numerous models and pipelines in production.

#### Complete Dashboard Redesign

**ZenML Pro users** will immediately notice our completely redesigned dashboard that ditches the left sidebar for a more spacious, tab-based navigation system. This isn't just a cosmetic change—we've completely revamped the underlying architecture to deliver Pro subscribers:

<ul><li>Dramatically faster load times</li><li>Smoother interactions</li><li>A more modern, breathable interface that gives your resources room to shine</li></ul>

Don't worry, OSS users—we're planning to roll many of these UI/UX improvements into the open-source version in the coming months, but Pro users get immediate access to this significant enhancement!

## 🏃Performance Optimizations + Enhanced Integrations

**All ZenML users** (both open-source and Pro) will benefit from these significant performance improvements, including a vastly faster CLI. These core performance improvements form a solid foundation for both our OSS community members and Pro subscribers, ensuring everyone enjoys a faster, more efficient ZenML experience. 

On top, the following integrations have been improved:

<ul><li>Better GitLab repository support with improved URL parsing and matching</li><li>Support for environment variables in <code>KubernetesPodSettings</code></li><li>Fixed SkyPilot Orchestrator with upgraded dependencies to the latest version</li><li>Improved Kubernetes orchestrator security by passing API tokens as Kubernetes secrets</li><li>Enhanced Weights &amp; Biases integration with Weave</li><li>Added project ID override capability in the GCP service connector</li><li>Fixed ACR support in the Azure service connector</li><li>Persistent resource support for the Vertex orchestrator, reducing spin-up times</li></ul>

These improvements represent our continued commitment to the open-source community, ensuring that OSS users have access to robust, enterprise-grade infrastructure integrations. Of course, Pro users inherit all these enhancements as well.

## 📜Meet our new and shiny docs

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/b37da05b/67dd33aab24227d87a98960a_docs_screenshot.png" alt="__wf_reserved_inherit" />
  <figcaption>Easier navigation for docs.zenml.io</figcaption>
</figure>

If you've been to the [docs site](https://docs.zenml.io/pro/) recently, you might have noticed some changes! We've introduced site sections at the top to make it simpler to navigate for both new and veteran users! The new docs also include a new [ZenML Pro section](https://docs.zenml.io/pro) which includes all details of the latest changes.

Don't forget to use the handy search or *Ask AI* features that makes finding what you need even easier.

## ⛩️Looking Ahead: A Big Year for Both OSS and Pro

This release marks just the beginning of what promises to be ZenML's biggest year yet. As we move through 2025, expect substantial updates for both our free open-source users and Pro subscribers:

<ul><li><strong>For OSS users</strong>: We're committed to bringing many Pro UI improvements to open source in the coming months, along with continued enhancements to our core performance and infrastructure integrations.</li><li><strong>For Pro users</strong>: Look forward to even more advanced resource management capabilities, deeper team collaboration features, and additional enterprise-grade security controls.</li></ul>

Ready to upgrade? Install the latest version with:

`pip install -U zenml`

For detailed information about all changes, check out the [full changelog](https://github.com/zenml-io/zenml/releases).

*What improvements are you most excited about? Let us know in the comments below or join our *[community Slack](https://zenml.io/slack)* to discuss!*