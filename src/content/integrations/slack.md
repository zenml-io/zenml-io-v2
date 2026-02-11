---
title: "Slack"
slug: "slack"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "6527b8aadd793c0f747942da"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-22T12:54:05.951Z"
  lastUpdated: "2024-10-15T11:25:18.328Z"
  createdOn: "2023-10-12T09:13:14.316Z"
integrationType: "alerter"
logo:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/99c12230/66d86892964104ce1a20cdf4_slack.png"
shortDescription: "Streamline ML Monitoring and Human-in-the-Loop Interactions with ZenML's Slack Integration"
docsUrl: "https://docs.zenml.io/stack-components/alerters/slack"
mainImage:
  url: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/526fd846/66db5ac639fa09de947c0145_image.png"
seo:
  title: "Integrate Slack with ZenML - Alerter Integrations"
  description: "Streamline ML Monitoring and Human-in-the-Loop Interactions with ZenML's Slack Integration"
  canonical: "https://www.zenml.io/integrations/slack"
  ogImage: "https://pub-d0f853843b954aadbcd60eaff1d9c6e2.r2.dev/webflow/64a817a2e7e2208272d1ce30/526fd846/66db5ac639fa09de947c0145_image.png"
  ogTitle: "Integrate Slack with ZenML - Alerter Integrations"
  ogDescription: "Streamline ML Monitoring and Human-in-the-Loop Interactions with ZenML's Slack Integration"
---

<ul><li><strong>Automated Slack Alerts</strong>:<br />Receive real-time notifications in designated Slack channels for critical events like model performance degradation or data drift.</li></ul>

<ul><li><strong>Human-in-the-Loop Workflows</strong>: <br />Integrate human feedback and approvals directly into ZenML pipelines via Slack interactions before executing critical steps like model deployment.</li><li><strong>Customizable Message Formatting</strong>: <br />Tailor Slack messages using custom formatter steps to effectively communicate relevant artifacts and insights.</li><li><strong>Flexible Slack Block Support</strong>: <br />Leverage Slack's rich messaging capabilities by incorporating custom Slack blocks for enhanced alerts and interactions.</li></ul>

<ul><li>Real-time messaging and collaboration platform</li><li>Customizable bot integrations for automated interactions</li><li>Rich message formatting with Slack blocks</li><li>Targeted communication via dedicated channels and direct messages</li><li>Extensive API and webhook support for integration with external tools</li></ul>

```python
from zenml import pipeline, step
from zenml.integrations.slack.steps.slack_alerter_post_step import slack_alerter_post_step

@step
def generate_message() -> str:
    return "Hello from ZenML pipeline!"

@pipeline
def slack_alert_pipeline():
    message = generate_message()
    slack_alerter_post_step(message)

if __name__ == "__main__":
    # Ensure you have installed the slack integration
    # zenml integration install slack -y

    # Make sure you have registered a Slack alerter
    # zenml alerter register slack_alerter --flavor=slack --slack_token=<SLACK_TOKEN> --default_slack_channel_id=<SLACK_CHANNEL_ID>

    # Ensure you're using an active stack that includes the Slack alerter
    # zenml stack register --set my_stack -al slack_alerter ... (other components)

    slack_alert_pipeline()
    
```

This code example demonstrates a simple ZenML pipeline that sends an alert to a designated Slack channel. The generate_message step creates the message content, which is then passed to the slack_alerter_post_step for posting to Slack. Before running the pipeline, ensure the Slack integration is installed, a Slack alerter is registered with the required token and channel ID, and the alerter is added to the active ZenML stack.