---
title: "How Cross Screen Media Trains Models for 210 Markets in Hours, Not Weeks, with ZenML"
slug: "cross-screen-media"
draft: false

hub:
  cardTitle: "How Cross Screen Media Trains Models for 210 Markets in Hours, Not Weeks, with ZenML"
  order: 4
  logos:
    - url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/86cd6b7b/cross-screen-media.png"
      alt: "Cross Screen Media logo"

hero:
  logos:
    - url: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/86cd6b7b/cross-screen-media.png"
      alt: "Cross Screen Media logo"

sidebar:
  company: "Cross Screen Media"
  website:
    label: "crossscreen.media"
    href: "https://crossscreen.media/"
  mlTeamSize: "3"
  cloudProvider: "Google Cloud Platform"
  industry: "Media"
  useCases:
    - "ML pipelines"
    - "Cross-platform"
    - "Dev to prod"

seo:
  title: "Cross Screen Media and ZenML - Case Study"
  description: "How Cross Screen Media Trains Models for 210 Markets in Hours, Not Weeks, with ZenML"
  ogTitle: "Cross Screen Media and ZenML - Case Study"
  ogDescription: "How Cross Screen Media Trains Models for 210 Markets in Hours, Not Weeks, with ZenML"
  ogImage: "https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/748836a4/68d6ad1ae7536c8616ebff0e_cross-screen-media-case-study.png"

webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "static-page:case-study/cross-screen-media"
  exportedAt: "2026-02-11T06:26:00.000Z"
  source: live
---

<div class="uui-text-markdown-text w-richtext">
                <p>The data science team at Cross Screen Media manages ML workflows across <strong>210 local markets</strong> on <strong>trillions-of-rows-scale</strong> tabular data. Through two key projects, they demonstrated ZenML's impact: first, a critical pipeline that previously took <strong>~1 week</strong> now completes all 210 markets in <strong>~2 hours</strong> after code optimization and ZenML implementation. Building on this success, the team applied ZenML to a second project involving model development, achieving a <strong>~17% average AUC improvement</strong> across all markets. These wins freed the 3-person team to tackle more ambitious methodologies.</p>
                <figure style="max-width:2860px" class="w-richtext-align-fullwidth w-richtext-figure-type-image">
                  <div><img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/74e4d350/cross-screen-media-metrics.png" loading="lazy" alt="Cross Screen Media and ZenML metrics: 210 markets coverage, team of 3, runtime reduced from 1 week to 2 hours, 17% avg AUC uplift"></div>
                </figure>
                <h3><strong>The Challenge: A Week-Long Training Bottleneck</strong></h3>
                <p>At the core of Cross Screen Media's business is its ability to plan and measure hyper-local advertising campaigns across 210 markets. Working with massive structured datasets scaling to <strong>trillions of rows</strong>, the data science team of three found themselves spending more time managing infrastructure than building models.</p>
              </div>
              <section class="uui-section_testimonial04">
                <div>
                  <div class="uui-container-large-22">
                    <div class="uui-testimonial04_component margin-bottom">
                      <h3 class="uui-heading-small text-weight-medium">"Before ZenML, our process was entirely manual. We ran models locally or on custom cloud instances. We didn't have a platform to do things in a repeatable way."</h3>
                      <div class="uui-testimonial04_client">
                        <div class="uui-testimonial04_client-image-wrapper"><img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/34171ae8/tab_bg.avif" loading="lazy" width="248" alt="" class="uui-testimonial04_client-image"></div>
                        <div class="uui-testimonial04_client-info">
                          <div class="uui-heading-tiny">Shey and Junyi Lin</div>
                          <div class="uui-text-size-medium">Data Scientists at Cross Screen Media</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div class="uui-text-markdown-text w-richtext">
                <p>This manual process created several critical issues:</p>
                <ul role="list">
                  <li><strong>A Two-Codebase Problem:</strong> The team was forced to maintain two separate codebases—Jupyter notebooks for experimentation and different Python scripts for production. This required constant, error-prone translation between environments.</li>
                  <li><strong>Operational Risk:</strong> The workflow created single points of failure. As the team noted, if the person responsible for a model run was sick, the entire process could stall, jeopardizing delivery.</li>
                  <li><strong>A Week-Long Bottleneck:</strong> Running models for all 210 markets was a slow operation that stifled iteration and took over a week to complete. The hardware and process limitations also forced them to simplify their models, sacrificing predictive accuracy for the sake of finishing the job. The team knew they could build better models but lacked the platform to do it efficiently.</li>
                </ul>
                <figure style="max-width:2552px" class="w-richtext-align-fullwidth w-richtext-figure-type-image">
                  <div><img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/e5f84a94/cross-screen-media-workflow.png" loading="lazy" alt="Before/After workflow comparison: Fragmented (two codebases, manual translation) vs Unified (single codebase via ZenML Platform to local testing and Kubernetes production)"></div>
                </figure>
                <h3><strong>The Solution: A Standardized Platform for Automation</strong></h3>
                <p>The team chose ZenML to build a new MLOps strategy. With ZenML, they engineered a standardized workflow, building a single codebase with pipeline templates that could be parameterized for each of the 210 markets.</p>
                <figure style="max-width:2340px" class="w-richtext-align-fullwidth w-richtext-figure-type-image">
                  <div><img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/249df31f/cross-screen-media-markets.png" loading="lazy" alt="ZenML pipeline template scaling: Single template to ZenML Orchestration to Parameterized pipeline to Kubernetes cluster running 210 markets in parallel"></div>
                </figure>
                <figure style="max-width:2492px" class="w-richtext-align-fullwidth w-richtext-figure-type-image">
                  <div><img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/7f15de05/cross-screen-media-flow.png" loading="lazy" alt="Cross Screen Media ML workflow: Airflow/dbt (data prep) to ZenML (pipelines, lineage, UI) to Kubernetes to Artifacts/Metrics Store"></div>
                </figure>
              </div>
              <div class="uui-testimonial04_component margin-bottom">
                <h3 class="uui-heading-small text-weight-medium">"The biggest benefit is easily utilizing Kubernetes. Once ZenML is set up, we can use it for all our parallel runs, which lifts our efficiency a lot."</h3>
                <div class="uui-testimonial04_client">
                  <div class="uui-testimonial04_client-image-wrapper"><img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/34171ae8/tab_bg.avif" loading="lazy" width="248" alt="" class="uui-testimonial04_client-image"></div>
                  <div class="uui-testimonial04_client-info">
                    <div class="uui-heading-tiny">Shey and Junyi Lin</div>
                    <div class="uui-text-size-medium">Data Scientists at Cross Screen Media</div>
                  </div>
                </div>
              </div>
              <div class="uui-text-markdown-text w-richtext">
                <p>This change meant a model could be tested locally on a small data sample with confidence that it would scale in production. ZenML acted as the orchestration layer, empowering the data science team to operate as a self-sufficient unit</p>
              </div>
              <section class="uui-section_testimonial04">
                <div class="uui-padding-vertical-small">
                  <div class="uui-container-large-22">
                    <div class="uui-testimonial04_component">
                      <h3 class="uui-heading-small text-weight-medium">"Everything has changed now that we have a single codebase. We test locally and know it will run in production. It’s a huge time saver."</h3>
                      <div class="uui-testimonial04_client">
                        <div class="uui-testimonial04_client-image-wrapper"><img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/34171ae8/tab_bg.avif" loading="lazy" width="248" alt="" class="uui-testimonial04_client-image"></div>
                        <div class="uui-testimonial04_client-info">
                          <div class="uui-heading-tiny">Shey and Junyi Lin</div>
                          <div class="uui-text-size-medium">Data Scientists at Cross Screen Media</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div class="uui-text-markdown-text w-richtext">
                <p>This investment in standardization pays dividends for future work. "The incremental cost of new projects is much less now," Shey and Junyi Lin add. "Once you have the patterns and templates set up, you can reuse most of it for subsequent projects."</p>
                <h3><strong>A Partnership That Accelerates</strong></h3>
                <p>Beyond the technology itself, the CSM team highlighted the value of ZenML's responsive support model. In contrast to experiences with larger providers, they noted the benefit of having direct access to the technical team. "The team has been responsive and quick to work on the unique challenges we faced," Shey and Junyi Lin noted, ensuring that implementation hurdles were overcome without losing momentum.</p>
                <h3><strong>The Results: Two Projects, Two Wins</strong></h3>
                <p>Cross Screen Media's ZenML implementation delivered impact across two sequential projects, each demonstrating different dimensions of value.</p>
                <h4><strong><em>Project 1: Pipeline Acceleration</em></strong></h4>
                <p>The first project focused on optimizing a critical data pipeline that processed all 210 markets. The team refactored their code and implemented ZenML orchestration, collapsing the runtime dramatically.</p>
                <p><strong>Runtime collapse:</strong> A pipeline that previously required <strong>~1 week</strong> to complete across all 210 markets now finishes in <strong>~2 hours</strong>. <em>(This reflects both ZenML orchestration </em><strong><em>and</em></strong><em> code optimizations.)</em></p>
                <p>This acceleration was transformative. The team no longer spent days waiting for pipeline runs to complete, freeing them to iterate and explore more sophisticated approaches.</p>
                <h4><strong><em>Project 2: Model Quality Improvements</em></strong></h4>
                <p>Building on the infrastructure and patterns established in Project 1, the team applied ZenML to a second initiative focused on improving their modeling methodology. With the platform handling orchestration and parallelization across 210 markets, they could invest in more advanced techniques.</p>
                <figure style="max-width:2326px" class="w-richtext-align-fullwidth w-richtext-figure-type-image">
                  <div><img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/c732b5a9/cross-screen-media-time.png" loading="lazy" alt="Pipeline acceleration comparison: Without ZenML takes 1 week, With ZenML takes ~2 hours - achieving over 99% runtime reduction"></div>
                </figure>
                <blockquote><em>"ZenML gave us the opportunity to make our models more complex and add more attributes," said Shey and Junyi Lin. "This was impossible before because we lacked the right platform."</em></blockquote>
                <p>The additional model complexity paid off. By implementing more sophisticated approaches, the team achieved a <strong>~17% average improvement in AUC score</strong>across all 210 markets—a direct enhancement of Cross Screen Media's core product quality.</p>
                <h4><strong><em>Operational Excellence</em></strong></h4>
                <p>Beyond the project-specific wins, the ZenML dashboard became the team's command center for MLOps, providing observability across all pipeline runs.</p>
              </div>
              <div class="uui-testimonial04_component margin-bottom">
                <h3 class="uui-heading-small text-weight-medium">"The UI really helps. If something fails, we can see exactly where it happened and check the logs directly in ZenML. That wasn't possible for us before."</h3>
                <div class="uui-testimonial04_client">
                  <div class="uui-testimonial04_client-image-wrapper"><img src="https://assets.zenml.io/webflow/64a817a2e7e2208272d1ce30/34171ae8/tab_bg.avif" loading="lazy" width="248" alt="" class="uui-testimonial04_client-image"></div>
                  <div class="uui-testimonial04_client-info">
                    <div class="uui-heading-tiny">Shey and Junyi Lin</div>
                    <div class="uui-text-size-medium">Data Scientists at Cross Screen Media</div>
                  </div>
                </div>
              </div>
              <div class="uui-text-markdown-text w-richtext">
                <ul role="list">
                  <li><strong>Fewer <code>kubectl</code> dives:</strong> The team now debugs primarily in the ZenML UI; shelling into Kubernetes is rarely necessary.</li>
                </ul>
                <p>This centralized observability provides long-term business value. The ZenML dashboard acts as a historical ledger, allowing the team to look back at year-old model runs, see which markets failed, and track performance metrics over time—a capability that was impossible with their previous, fragmented approach.</p>
                <h3>Looking forward</h3>
                <p>The team is eager for <strong>fully dynamic templating</strong> of market subsets to reduce manual grouping. This aligns with ZenML’s ongoing templating work and will further simplify large-fanout runs.</p>
                <p>By solving their primary bottleneck of speed, the team at Cross Screen Media unlocked a new level of model performance and business value.</p>
              </div>
