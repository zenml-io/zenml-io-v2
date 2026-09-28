---
title: "Per-user spend enforcement for production generative AI"
slug: "per-user-spend-enforcement-for-production-generative-ai"
draft: false
llmopsTags:
  - "data-analysis"
  - "realtime-application"
  - "regulatory-compliance"
  - "cost-optimization"
  - "fallback-strategies"
  - "error-handling"
  - "human-in-the-loop"
  - "databases"
  - "monitoring"
  - "serverless"
  - "security"
  - "guardrails"
  - "reliability"
  - "scalability"
  - "orchestration"
  - "amazon-aws"
  - "anthropic"
industryTags: "tech"
company: "Jamf"
summary: "Jamf expanded Amazon Bedrock access for its engineering organization to support AI-assisted development, but needed visibility and controls for rapidly changing per-user token costs. It built a serverless governance system that records Bedrock invocation logs in Amazon S3, calculates daily user-level spend through an Amazon Athena view, and uses an AWS Lambda function scheduled by Amazon EventBridge to update IAM Customer Managed Policies. As engineers cross configurable spending thresholds, access to expensive models is restricted while a lower-cost model remains available; Slack notifications and a time-boxed exception workflow reduce disruption. The source reports that the architecture costs well under $10 per month for the Lambda, DynamoDB, and S3 components serving hundreds of engineers, while noting that Athena scan volume, pricing maintenance, policy-version limits, and the approximately 15-minute enforcement interval are important operational tradeoffs."
link: "https://aws.amazon.com/blogs/machine-learning/tokenomics-at-scale-how-jamf-built-real-time-spend-enforcement-for-amazon-bedrock/"
year: 2026
seo:
  title: "Jamf: Per-user spend enforcement for production generative AI - ZenML LLMOps Database"
  description: "Jamf expanded Amazon Bedrock access for its engineering organization to support AI-assisted development, but needed visibility and controls for rapidly changing per-user token costs. It built a serverless governance system that records Bedrock invocation logs in Amazon S3, calculates daily user-level spend through an Amazon Athena view, and uses an AWS Lambda function scheduled by Amazon EventBridge to update IAM Customer Managed Policies. As engineers cross configurable spending thresholds, access to expensive models is restricted while a lower-cost model remains available; Slack notifications and a time-boxed exception workflow reduce disruption. The source reports that the architecture costs well under $10 per month for the Lambda, DynamoDB, and S3 components serving hundreds of engineers, while noting that Athena scan volume, pricing maintenance, policy-version limits, and the approximately 15-minute enforcement interval are important operational tradeoffs."
  canonical: "https://www.zenml.io/llmops-database/per-user-spend-enforcement-for-production-generative-ai"
  ogTitle: "Jamf: Per-user spend enforcement for production generative AI - ZenML LLMOps Database"
  ogDescription: "Jamf expanded Amazon Bedrock access for its engineering organization to support AI-assisted development, but needed visibility and controls for rapidly changing per-user token costs. It built a serverless governance system that records Bedrock invocation logs in Amazon S3, calculates daily user-level spend through an Amazon Athena view, and uses an AWS Lambda function scheduled by Amazon EventBridge to update IAM Customer Managed Policies. As engineers cross configurable spending thresholds, access to expensive models is restricted while a lower-cost model remains available; Slack notifications and a time-boxed exception workflow reduce disruption. The source reports that the architecture costs well under $10 per month for the Lambda, DynamoDB, and S3 components serving hundreds of engineers, while noting that Athena scan volume, pricing maintenance, policy-version limits, and the approximately 15-minute enforcement interval are important operational tradeoffs."
notion:
  pageId: "3e9f8dff-2538-807d-893a-c4ec9451416c"
  databaseId: "1a9eaa1f57dd47d5af958caa57742b6b"
  createdTime: "2026-09-28T08:16:00.000Z"
  lastEditedTime: "2026-09-28T08:16:00.000Z"
  publishedAt: "2026-09-28T08:24:57Z"
---

## Overview

Jamf, a company that manages and secures Apple devices for more than 76,000 organizations, gave its engineering organization broad access to Amazon Bedrock for AI-assisted development. The resulting productivity benefits came with a new operational problem: generative AI spending is driven by user behavior and token consumption rather than by relatively predictable provisioned capacity. Leadership needed to understand spend per engineer, place limits on expensive model usage, and expand access without waiting for an unexpectedly large bill.

Jamf addressed this as an AI FinOps and LLMOps problem rather than as a one-time budgeting exercise. Its production system measures each engineer's daily Bedrock usage, computes an estimated dollar total, communicates threshold crossings, and dynamically changes model permissions. At an example policy configuration, Claude Opus access is denied at 80% of a daily budget and Claude Sonnet access is denied at 100%, while Claude Haiku remains available. The design therefore degrades access to more expensive models instead of stopping all AI work. The source describes the pattern as production-tested and reports that Lambda, DynamoDB, and S3 costs were well under $10 per month for hundreds of engineers, although Athena usage and the accuracy of the pricing map require ongoing management.

## Problem and operating model

The system is designed for engineers invoking Bedrock through AWS IAM Identity Center single sign-on sessions. Bedrock invocation logging supplies the model identifier, input and output token counts, and user identity. These records provide the operational signal needed to associate model consumption with a person and a daily budget. The implementation described focuses on the `bedrock:InvokeModel` permission path and uses the user's `saml:sub` identity value in policy conditions.

This is cost enforcement rather than model-quality evaluation. The source does not report changes in code quality, developer productivity measurements, latency, task success, or return on investment. Its claim that governance enabled broader adoption is an organizational observation, not a measured causal result. The system can establish visibility and access guardrails, but proving whether productivity gains justify the spend would require separate evaluation of engineering outcomes and model-assisted work.

## Architecture and data flow

Bedrock invocation logs are delivered as JSON to an Amazon S3 bucket. An Athena table is defined over that location, and a view named `bedrock_cost_today` translates token counts into estimated dollars by applying model-specific input and output rates. The view groups usage by user identity and current day, using a selected reference time zone. Published Bedrock rates are represented as explicit branches for each supported model family. An unmapped model is assigned the highest tier as a fail-safe rather than being priced at zero, which prevents a newly enabled model from silently bypassing enforcement. However, this conservative fallback can overstate spend until the model's real rate is added.

An AWS Lambda enforcement handler runs on an Amazon EventBridge schedule every 15 minutes. It queries the Athena cost view, reads an Amazon DynamoDB exceptions table, and calculates which users belong in each restriction tier. A second DynamoDB state table records previously observed user states. When a user crosses a new threshold, the handler sends a one-time Slack direct message so the access change is not unexpected. The Slack workflow also exposes a `/bedrock-limit` command for administrators. An approved exception stores the engineer identity, an elevated limit, an expiry timestamp, and audit information such as the granting administrator and optionally an associated ticket. DynamoDB Time to Live removes expired exceptions automatically, after which the normal enforcement calculation applies again.

For enforcement, the Lambda publishes new versions of IAM Customer Managed Policies using `iam:CreatePolicyVersion`. These policies contain deny statements for selected model families and target users through a `saml:sub` condition. The policies are attached to the relevant IAM Identity Center permission set. On a subsequent Bedrock request, IAM evaluates the current policy and allows or denies access without requiring the engineer to re-authenticate. The daily reset is implicit: once the Athena view's daily window rolls over, the next full recomputation removes users who are no longer over the threshold and publishes policies that lift their restrictions.

## Reliability and operational design

The enforcement loop is idempotent because it recomputes the complete restricted-user list from cumulative daily spend instead of applying incremental add and remove operations. Running the handler twice produces the same policy state, and a missed invocation can be corrected by the next run. This also avoids a separate unblock workflow that could become inconsistent with the spend database. The exception path is similarly time bounded, reducing the risk of permanent manual overrides.

The design has several implementation constraints. Athena queries are asynchronous: Lambda must submit the query, poll for completion, and then read the results, so the function timeout must accommodate that lifecycle. IAM managed policies retain a maximum of five versions, requiring the handler to delete the oldest non-default version before creating another one. Failure to manage versions would eventually make enforcement fail. The source also emphasizes that model pricing is an operational artifact: every newly enabled model needs an explicit pricing branch and monitoring or alerting for unmapped identifiers.

The stated fifteen-minute schedule means this is near-real-time rather than instantaneous enforcement. A user can continue invoking a restricted model between the time usage is logged, the Athena query observes it, and the Lambda publishes a policy version. The source says restrictions take effect within minutes and do not disrupt active sessions, but it does not provide a measured worst-case delay or discuss behavior when logging, Athena, Lambda, IAM policy propagation, or Slack delivery is degraded. Organizations adopting the pattern would need to define those failure modes and decide whether hard spending guarantees require a synchronous gateway or another control point.

## Cost and data-engineering tradeoffs

The serverless components are operationally lightweight for the described scale. S3 stores the raw logs, DynamoDB stores state and exceptions, EventBridge supplies scheduling, and Lambda performs the decision and policy-update work. The reported sub-$10 monthly cost applies to Lambda, DynamoDB, and S3 for hundreds of engineers, not necessarily to the complete architecture under all usage patterns. Athena is the important variable because its cost depends on bytes scanned and query frequency.

The source reports that JSON logs force Athena to deserialize every row, so selecting fewer columns does not reduce the scanned data in the described arrangement. Four differently filtered queries against the same view each scanned approximately 11 GB. The recommended mitigations are to combine derived queries into one grouped query and split the results in application code, or to convert the logs to a columnar format such as Parquet. A production implementation should also consider retention, partitioning, query concurrency, and the effect of increased engineer count or invocation volume, although those topics are not quantified in the source.

## Results and balanced assessment

The principal reported result is controllable expansion of Bedrock access: Jamf could give more engineers access while maintaining per-user visibility and tiered guardrails. Keeping a low-cost model available preserves a minimum level of productivity after a user reaches the highest budget tier. Slack warnings and documented, expiring exceptions make the controls more usable than an opaque hard block. The architecture also avoids manual policy editing and automatically restores normal access after the daily budget window resets.

The system should nevertheless be understood as an estimated accounting and authorization mechanism, not a complete AI governance platform. It depends on Bedrock logs arriving with usable identity and token data, on current model-price mappings, and on IAM policy updates succeeding. It does not demonstrate model-output safety, privacy controls, prompt or response logging policy, quality evaluation, or verified financial ROI. Daily thresholds can also be affected by the selected time zone and by the difference between estimated token-based rates and the final service bill. Within those boundaries, the case is a concrete LLMOps pattern for making production model access financially observable, automatically constrained, and reversible while preserving a lower-cost fallback.
