---
title: "What I Learned Building a Compliant Credit Scoring Pipeline (and how ZenML made it simple)"
slug: "building-a-compliant-credit-scoring-pipeline"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "68307cb3a6c1647bf47477b6"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2025-05-23T23:02:56.480Z"
  lastUpdated: "2025-05-23T14:30:14.105Z"
  createdOn: "2025-05-23T13:48:35.447Z"
author: "marwan-zaarab"
category: "mlops"
tags:
  - "mlops"
  - "ai-act"
  - "compliance"
  - "automation"
date: "2025-05-23T00:00:00.000Z"
readingTime: 8 mins
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/0e082bd0/68307ed1fc375b559622d05b_credit-scoring-eu-ai-act-compliance__1_.png"
seo:
  title: "What I Learned Building a Compliant Credit Scoring Pipeline (and how ZenML made it simple) - ZenML Blog"
  description: "Manual EU AI Act compliance is unmanageable. This credit scoring pipeline shows how ZenML transforms regulatory requirements into automated workflows—from bias detection and risk assessment to human oversight gates and Annex IV documentation."
  canonical: "https://www.zenml.io/blog/building-a-compliant-credit-scoring-pipeline"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/0e082bd0/68307ed1fc375b559622d05b_credit-scoring-eu-ai-act-compliance__1_.png"
  ogTitle: "What I Learned Building a Compliant Credit Scoring Pipeline (and how ZenML made it simple) - ZenML Blog"
  ogDescription: "Manual EU AI Act compliance is unmanageable. This credit scoring pipeline shows how ZenML transforms regulatory requirements into automated workflows—from bias detection and risk assessment to human oversight gates and Annex IV documentation."
---

Imagine you're responsible for a credit scoring system that evaluates thousands of loan applications daily. Your models directly impact people's financial opportunities. They determine who gets approved for loans, mortgages, and credit cards, and under what terms. When working properly, these algorithms can increase financial inclusion by making consistent, data-driven decisions. When flawed, they risk perpetuating or amplifying existing biases—as Goldman Sachs discovered when a [single viral tweet exposed a 20× gender gap](https://time.com/5724098/new-york-investigating-goldman-sachs-apple-card/) in Apple Card credit limits, triggering multi-year regulatory scrutiny.

Under the EU AI Act, these systems fall under the category of "high-risk AI" (Annex III), which triggers strict requirements for documentation, fairness, oversight, and risk management. The [SCHUFA ruling](https://www.hunton.com/privacy-and-information-security-law/cjeu-rules-that-gdpr-prohibition-on-automated-decision-making-applies-to-credit-scoring) in late 2023 tightened these requirements further. For financial institutions, this introduces a new compliance landscape that fundamentally changes how credit scoring models are built, deployed, and maintained.

> This post walks through a demo project using ZenML to automate most EU AI Act compliance requirements.

> For a deep dive into the EU AI Act itself and its February 2025 updates, check out Alex’s overview post. This blog focuses on the practical implementation of those requirements.

## The Compliance Challenge in Banking

Banks have always needed to justify their models, but the AI Act raises the bar. It's no longer sufficient to demonstrate that your model works. You must prove *how* it works, *why* it works, and ensure it works **fairly**, **securely**, and **accountably**.

The documentation requirements are extensive: system descriptions, technical specs, development processes, risk procedures, validation results, and monitoring plans. This must stay current across model lifecycles and remain audit-ready. With weekly retrains and hundreds of production models, manual compliance becomes unmanageable

Non-compliance carries serious consequences: [fines up to €35 million or 7% of global turnover](https://artificialintelligenceact.eu/article/99/), not to mention the potential reputational damage. Yet only [14% of financial organizations](https://www.notion.so/zenml/pwc-link) still track models in spreadsheets.

What’s needed is infrastructure that makes compliance a natural outcome of good engineering, not a separate and burdensome process. The EU AI Act essentially codifies ML best practices:

<ul><li><a href="https://artificialintelligenceact.eu/article/9/"><strong>Article 9</strong>: Comprehensive risk management system</a></li><li><a href="https://artificialintelligenceact.eu/article/10"><strong>Article 10</strong>: Data governance and quality controls</a></li><li><a href="https://artificialintelligenceact.eu/article/11"><strong>Article 11</strong>: Detailed technical documentation (Annex IV)</a></li><li><a href="https://artificialintelligenceact.eu/article/12"><strong>Article 12</strong>: Automatic recording and event logging</a></li><li><a href="https://artificialintelligenceact.eu/article/14"><strong>Article 14</strong>: Effective human oversight measures</a></li><li><a href="https://artificialintelligenceact.eu/article/15"><strong>Article 15</strong>: Accuracy, robustness, and cybersecurity</a></li><li><a href="https://artificialintelligenceact.eu/article/17"><strong>Article 17</strong>: Post-market monitoring and feedback</a></li><li><a href="https://artificialintelligenceact.eu/article/18"><strong>Article 18</strong>: Incident reporting mechanisms</a></li></ul>

I built a credit-scoring pipeline satisfying every requirement without spreadsheets or manual processes. What made the process dramatically easier was leveraging ZenML’s [lineage tracking](https://docs.zenml.io/concepts/metadata), [versioning](https://docs.zenml.io/concepts/dashboard-features#model-version-management), [artifact management](https://docs.zenml.io/concepts/artifacts), and [automatic logging](https://docs.zenml.io/concepts/steps_and_pipelines/logging), turning compliance into a natural byproduct of a well-designed ML pipeline.

## Architecture for Compliance: Three-Pipeline Design

The credit-scoring workflow is split into three ZenML pipelines:

<ul><li><strong>Feature Engineering</strong>: Ingests raw loan-application data, profiles quality with WhyLogs, applies cleaning and encoding steps, and stores versioned feature sets for downstream use.</li><li><strong>Model Training</strong>: Trains and tunes a <code>LightGBMClassifier</code>, logs hyperparameters, evaluates performance across demographic groups, and bundles the model with full lineage.</li><li><strong>Deployment &amp; Monitoring</strong>: Adds an approval gate, packages the model with its compliance artifacts (including <a href="https://artificialintelligenceact.eu/annex/4/">Annex IV</a>), and deploys it as a FastAPI service on Modal.</li></ul>

Let's dive into each pipeline to see how they address specific EU AI Act compliance requirements.

### Feature Engineering Pipeline: Data Governance in Action

The first pipeline lays the groundwork for EU AI Act compliance by focusing on data governance. [Articles 10](https://artificialintelligenceact.eu/article/10/) emphasizes strong data quality controls, while [Article 12](https://artificialintelligenceact.eu/article/12/)  requires meticulous record-keeping for all data processing activities.

```python
@pipeline(name=FEATURE_ENGINEERING_PIPELINE_NAME)
def feature_engineering(
    dataset_path: str = "src/data/credit_scoring.csv",
    test_size: float = 0.2,
    normalize: bool = True,
    target: str = "TARGET",
    random_state: int = 42,
    sample_fraction: Optional[float] = None,
    sensitive_attributes: List[str] = None,
):
    """End-to-end feature engineering pipeline with data governance controls."""
    # Load data with provenance tracking (Art. 10)
    df, whylogs_data_profile = ingest(
        dataset_path=dataset_path,
        sample_fraction=sample_fraction,
        target=target,
        sensitive_attributes=sensitive_attributes,
    )

    # Split dataset with documented rationale (Art. 10)
    train_df, test_df = data_splitter(
        df=df,
        test_size=test_size,
        target=target,
        random_state=random_state,
    )

    # Preprocess with transformation tracking (Art. 10)
    train_df_processed, test_df_processed, preprocess_pipeline = data_preprocessor(
        train_df=train_df,
        test_df=test_df,
        normalize=normalize,
        target=target,
    )

    return whylogs_data_profile,train_df_processed, test_df_processed, preprocess_pipeline
```

The pipeline incorporates several essential compliance features:

<ul><li><strong>Data Provenance with SHA-256 Hashing:</strong> Ensures the exact data used for training is traceable and tamper-proof.</li><li><strong>WhyLogs Profiling:</strong> Captures comprehensive quality metrics like data drift and anomalies.</li><li><strong>Preprocessing Transparency:</strong> Each transformation is logged, enabling full visibility into how data is prepared.</li><li><strong>Sensitive Attribute Identification:</strong> Flags protected demographic features for fairness assessments.</li></ul>

By wrapping these steps in ZenML's pipeline framework, we gain automatic lineage tracking, artifact versioning, and metadata persistence, which are all essential for meeting the record-keeping requirements of [Article 12](https://artificialintelligenceact.eu/article/12/).

### Training Pipeline: Performance with Accountability

The second pipeline handles model training, evaluation, and risk assessment, directly addressing [Articles 9 (Risk Management)](https://artificialintelligenceact.eu/article/9/), [11 (Technical Documentation)](https://artificialintelligenceact.eu/article/11/), and [15 (Accuracy)](https://artificialintelligenceact.eu/article/15/) of the EU AI Act.

```python
@pipeline(name=TRAINING_PIPELINE_NAME)
def training(
    train_df: Any = None,
    test_df: Any = None,
    target: str = "TARGET",
    hyperparameters: Optional[Dict[str, Any]] = None,
    protected_attributes: Optional[List[str]] = None,
    approval_thresholds: Optional[Dict[str, float]] = None,
    risk_register_path: str = "docs/risk/risk_register.xlsx",
    model_path: str = "models/model.pkl",
):
    """Training pipeline with integrated evaluation and risk assessment."""
    # Train model with documented hyperparameters (Art. 11)
    model = train_model(
        train_df=train_df,
        test_df=test_df,
        target=target,
        hyperparameters=hyperparameters,
    )

    # Evaluate with fairness metrics (Art. 15)
    evaluation_results, fairness_metrics = evaluate_model(
        model=model,
        test_df=test_df,
        target=target,
        protected_attributes=protected_attributes,
        approval_thresholds=approval_thresholds,
    )

    # Conduct risk assessment (Art. 9)
    risk_scores = risk_assessment(
        evaluation_results=evaluation_results,
	fairness_metrics=fairness_metrics,
        risk_register_path=risk_register_path,
    )

    return model, evaluation_results, risk_scores
```

The key compliance features here include:

<ul><li><strong>Hyperparameter documentation</strong> for reproducibility (satisfying Article 11's technical documentation requirements)</li><li><strong>Performance metrics</strong> across demographic groups (providing the transparency needed for Article 15 compliance)</li><li><strong>Risk scoring</strong> with mitigation tracking (providing the structured risk management required by Article 9)</li></ul>

The `evaluate_model` step automatically calculates fairness metrics across protected attributes and generates alerts when potential bias is detected, which addresses the fairness requirements of Article 15.

### Deployment Pipeline: Human Oversight and Documentation

The third pipeline manages model approval, deployment, and monitoring, addressing [Articles 14](https://artificialintelligenceact.eu/article/14), [17](https://artificialintelligenceact.eu/article/17), and [18](https://artificialintelligenceact.eu/article/18) of the EU AI Act. This pipeline demonstrates how meaningful human oversight can be integrated into automated deployment workflows.

```python
@pipeline(name=DEPLOYMENT_PIPELINE_NAME)
def deployment(
    model: Annotated[Any, MODEL_NAME] = None,
    preprocess_pipeline: Annotated[Any, PREPROCESS_PIPELINE_NAME] = None,
    evaluation_results: Annotated[Any, EVALUATION_RESULTS_NAME] = None,
    risk_scores: Annotated[Any, RISK_SCORES_NAME] = None,
    environment: str = MODAL_ENVIRONMENT,
):
    """Deployment pipeline with human oversight and monitoring."""
    # Human approval gate (Art. 14)
    approved, approval_record = approve_deployment(
        evaluation_results=evaluation_results,
        risk_scores=risk_scores,
        approval_thresholds=DEFAULT_APPROVAL_THRESHOLDS,
    )

    # Deploy with versioning (Art. 16)
    if not approved:
        return None

    deployment_info = modal_deployment(
        model=model,
        preprocess_pipeline=preprocess_pipeline,
        environment=environment,
    )

    # Generate SBOM for security tracking (Art. 15)
    sbom = generate_sbom(model=model, preprocess_pipeline=preprocess_pipeline)

    # Setup monitoring (Art. 17)
    monitoring_plan = post_market_monitoring(
        model=model,
        evaluation_results=evaluation_results,
        deployment_info=deployment_info,
    )

    # Generate technical documentation (Art. 11)
    documentation_path = generate_annex_iv_documentation(
        evaluation_results=evaluation_results,
        risk_scores=risk_scores,
        deployment_info=deployment_info,
        sbom=sbom,
        monitoring_plan=monitoring_plan,
        approval_record=approval_record,
    )

    return documentation_path
```

The key compliance features include:

<ul><li><strong>Human approval gate</strong> with documented rationale via the <code>approve_deployment</code> step (important for Article 14)</li><li><strong>Software Bill of Materials</strong> generation</li><li><strong>Post-market monitoring</strong> configuration</li><li><strong>Annex IV documentation</strong> generation</li></ul>

The human oversight implementation is particularly important. The `approve_deployment` step requires explicit review and sign-off before models can be deployed, creating an auditable record of human oversight. When the system detects issues requiring review, it sends structured Slack notifications using [ZenML's Slack alerter integration](https://docs.zenml.io/stack-components/alerters/slack) with this assessment:

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/153ad03c/68307dc451faf16a76bceb15_slack-deployment-alert.png" alt="__wf_reserved_inherit" />
</figure>

This wasn't a false positive. Our model exhibited severe disparate impact (0.161 ratio) across age groups, meaning it was systematically discriminating against certain age demographics. The Slack alert enabled immediate visibility into this critical bias issue, ensuring it didn't get lost in terminal logs or overlooked during deployment cycles.

The EU AI Act's requirements allowed me to discover a critical fairness issue that demanded immediate remediation, which could've gone undetected without full compliance monitoring. It shows how compliance infrastructure becomes a quality assurance mechanism that protects both institutions and the people they serve.

## The Documentation Engine: Automating Annex IV

Automating comprehensive technical documentation turned out to be one of the most technically challenging aspects of compliance. The EU AI Act's Annex IV requirements are extensive and specific, demanding everything from general system descriptions to detailed post-market monitoring plans.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/e29f8309/683081ae8c84b030ce3cccc2_annex-iv-compressed.gif" alt="__wf_reserved_inherit" />
</figure>

These requirements become manageable when you understand how existing MLOps infrastructure can address them. Rather than building compliance systems from scratch, ZenML's native capabilities handle most requirements through features you're likely already using for good ML engineering practices.

<table class="zenml-table"> <thead> <tr> <th>Article</th> <th>Key Requirements</th> <th>ZenML Implementation</th> </tr> </thead> <tbody> <tr> <td><strong>Art. 9</strong> Risk Management</td> <td>Risk assessment, mitigation measures</td> <td><a href="https://docs.zenml.io/concepts/steps_and_pipelines" target="_blank">Step output tracking</a>, <a href="https://docs.zenml.io/concepts/metadata" target="_blank">metadata logging</a></td> </tr> <tr> <td><strong>Art. 10</strong> Data Governance</td> <td>Data quality, representativeness</td> <td><a href="https://docs.zenml.io/concepts/artifacts" target="_blank">Artifact lineage</a>, <a href="https://docs.zenml.io/user-guides/tutorial/datasets" target="_blank">dataset versioning</a></td> </tr> <tr> <td><strong>Art. 11</strong> Documentation</td> <td>Complete system documentation</td> <td><a href="https://docs.zenml.io/user-guides/tutorial/fetching-pipelines" target="_blank">Pipeline run history</a>, <a href="https://docs.zenml.io/concepts/metadata" target="_blank">step metadata</a></td> </tr> <tr> <td><strong>Art. 12</strong> Record-keeping</td> <td>Automated event logging</td> <td><a href="https://docs.zenml.io/user-guides/tutorial/fetching-pipelines" target="_blank">Run history tracking</a>, <a href="https://docs.zenml.io/stacks/stack-components/artifact-stores" target="_blank">artifact storage</a></td> </tr> <tr> <td><strong>Art. 14</strong> Human Oversight</td> <td>Human review capabilities</td> <td><a href="https://docs.zenml.io/concepts/steps_and_pipelines/advanced_features" target="_blank">Approval steps</a>, <a href="https://docs.zenml.io/concepts/models" target="_blank">model workflows</a></td> </tr> <tr> <td><strong>Art. 15</strong> Accuracy</td> <td>Performance metrics, robustness</td> <td><a href="https://docs.zenml.io/concepts/metadata" target="_blank">Metrics tracking</a>, <a href="https://docs.zenml.io/concepts/artifacts" target="_blank">evaluation artifacts</a></td> </tr> <tr> <td><strong>Art. 17</strong> Post-market Monitoring</td> <td>Deployed model monitoring</td> <td><a href="https://docs.zenml.io/concepts/artifacts" target="_blank">Artifact versioning</a>, <a href="https://docs.zenml.io/user-guides/tutorial/trigger-pipelines-from-external-systems" target="_blank">pipeline triggers</a></td> </tr> <tr> <td><strong>Art. 18</strong> Incident Notification</td> <td>Incident reporting mechanisms</td> <td><a href="https://docs.zenml.io/concepts/steps_and_pipelines" target="_blank">Step outcomes tracking</a>, <a href="https://docs.zenml.io/stacks/stack-components/alerters" target="_blank">failure monitoring</a></td> </tr> </tbody></table>

The `generate_annex_iv_documentation` step transforms scattered pipeline metadata into structured compliance packages. Rather than maintaining separate compliance documentation, the system leverages ZenML's automatic metadata capture and artifact store to generate complete technical documentation bundles.

Each documentation package includes multiple artifacts that address specific compliance requirements:

<table class="zenml-table"> <thead> <tr> <th>Artifact</th> <th>Content Source</th> <th>EU AI Act Coverage</th> </tr> </thead> <tbody> <tr> <td><strong>annex_iv.md</strong></td> <td>ZenML metadata + Jinja templates</td> <td>Art. 11 (Technical Documentation)</td> </tr> <tr> <td><strong>model_card.md</strong></td> <td>Performance metrics + fairness analysis</td> <td>Art. 13 (Transparency)</td> </tr> <tr> <td><strong>evaluation_results.yaml</strong></td> <td>Model evaluation step outputs</td> <td>Art. 15 (Accuracy)</td> </tr> <tr> <td><strong>risk_scores.yaml</strong></td> <td>Risk assessment step results</td> <td>Art. 9 (Risk Management)</td> </tr> <tr> <td><strong>git_info.md</strong></td> <td>Repository commit information</td> <td>Art. 12 (Record-keeping)</td> </tr> <tr> <td><strong>sbom.json</strong></td> <td>Requirements.txt parsing</td> <td>Art. 15 (Cybersecurity)</td> </tr> <tr> <td><strong>log_metadata.json</strong></td> <td>Pipeline execution logs</td> <td>Art. 12 (Record-keeping)</td> </tr> <tr> <td><strong>README.md</strong></td> <td>Generated artifact index</td> <td>Cross-article compliance mapping</td> </tr> </tbody></table>

This automated approach eliminates the inconsistency and incompleteness that plague manual documentation processes. The system ensures documentation accurately reflects actual implementation since it's generated directly from the same metadata that drives model training and deployment.

## Benefits Beyond Compliance

While regulatory compliance is often perceived as a cost center, my experience implementing the EU AI Act requirements revealed several unexpected business benefits that extend far beyond regulatory checkbox exercises.

The documentation and validation requirements forced me to implement more rigorous testing protocols, resulting in models with better performance and reliability. Explicit fairness assessments led to more equitable predictions across demographic groups. Comprehensive validation procedures identified edge cases that might otherwise have been missed. Structured risk assessment practices helped prioritize model improvements based on actual impact and likelihood.

## The Competitive Advantage of Compliance-Ready Infrastructure

The EU AI Act represents more than a regulatory burden. It's an opportunity to build better AI systems. Organizations that approach compliance as an infrastructure challenge rather than a documentation exercise will discover that regulatory requirements become competitive advantages.

ZenML's pipeline-based approach demonstrates how compliance can be embedded directly into development workflows, creating systems that are simultaneously more reliable, more transparent, and more trustworthy. As the AI Act's implementation timeline advances, the organizations that build these capabilities now will be positioned to innovate confidently within the regulatory framework.

Although this project focused on the financial sector, similar approaches apply to other high-stakes domains like the energy sector, where regulators like [Ofgem are rolling out new AI oversight guidelines](https://www.zenml.io/blog/navigating-ofgem-compliance-for-ml-systems-in-energy-a-practical-guide).

## Try It Yourself

You can explore the CreditScorer project and experiment with it by following these steps:

<ol><li>Clone the <a href="https://github.com/zenml-io/zenml-projects/tree/main/credit-scorer">project</a>.</li><li>Follow the setup and installation instructions detailed in the project's <code>README</code> file.</li><li>Run pipelines or launch the demo compliance dashboard:</li></ol>

```bash
streamlit run_dashboard.py
```

The included Streamlit app provides an interactive UI that provides real-time visibility into EU AI Act compliance status, a summary of current risk levels and compliance metrics, and a generated Annex IV documentation with export options.

<figure>
  <img src="https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/42eed789/6830813230201b5756b1ea7d_streamlit-dashboard-comp.gif" alt="__wf_reserved_inherit" />
</figure>