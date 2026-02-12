---
title: "Discord"
slug: "discord"
draft: false
webflow:
  siteId: "64a817a2e7e2208272d1ce30"
  itemId: "665712efa0aeb7463bbe4651"
  exportedAt: "2026-02-11T13:30:32.135Z"
  source: "live"
  lastPublished: "2024-10-22T12:54:05.951Z"
  lastUpdated: "2024-10-14T07:40:30.362Z"
  createdOn: "2024-05-29T11:35:11.444Z"
integrationType: "alerter"
logo:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/65d6b0d7/66d867a04ca00e02f4e6542d_discord.png"
shortDescription: "Seamlessly Integrate Automated Alerts and Human Interaction into Your ML Pipelines with ZenML's Discord Integration"
docsUrl: "https://docs.zenml.io/integrations/discord"
githubUrl: "https://github.com/zenml-io/zenml/tree/main/examples/integration_discord"
mainImage:
  url: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/a7078b6e/665712e6c81ad89f31118007_CleanShot_2024-05-29_at_13.34.05.png"
seo:
  title: "Integrate Discord with ZenML - Alerter Integrations"
  description: "Seamlessly Integrate Automated Alerts and Human Interaction into Your ML Pipelines with ZenML's Discord Integration"
  canonical: "https://www.zenml.io/integrations/discord"
  ogImage: "https://pub-41d587b95acb4b579d9280542922084b.r2.dev/webflow/64a817a2e7e2208272d1ce30/a7078b6e/665712e6c81ad89f31118007_CleanShot_2024-05-29_at_13.34.05.png"
  ogTitle: "Integrate Discord with ZenML - Alerter Integrations"
  ogDescription: "Seamlessly Integrate Automated Alerts and Human Interaction into Your ML Pipelines with ZenML's Discord Integration"
---

<ul><li>Effortlessly send automated alerts and notifications to Discord channels from ZenML pipelines</li><li>Integrate human-in-the-loop interactions by posting messages and waiting for user approval</li><li>Customize alert messages using dedicated formatter steps to communicate relevant pipeline artifacts</li><li>Enhance pipeline monitoring, failure detection, and model deployment workflows</li><li>Seamlessly install and configure the Discord integration using simple ZenML CLI commands</li></ul>

<ul><li>Real-time messaging and collaboration platform</li><li>Customizable bots for automated interactions</li><li>Secure and scalable infrastructure for reliable message delivery</li><li>Granular permission controls and access management</li><li>Rich message formatting options including embeds, attachments, and reactions</li></ul>

You need to first setup a Discord bot in your workspace and have a channel with its ID where you want to post messages to. Once you’re ready with the details, you can register your Discord alerter stack component in ZenML, as follows.

```shell
zenml alerter register discord_alerter \
    --flavor=discord \
    --discord_token=<DISCORD_TOKEN> \
    --default_discord_channel_id=<DISCORD_CHANNEL_ID>
```

```python
from zenml.integrations.discord.steps.discord_alerter_post_step import discord_alerter_post_step
from zenml import step, pipeline

@step
def generate_alert_message(accuracy: float) -> str:
    return f"Model training completed with accuracy: {accuracy:.2f}"

@pipeline
def discord_alerts_pipeline(accuracy: float):
    message = generate_alert_message(accuracy)
    discord_alerter_post_step(message)

if __name__ == "__main__":
    # Ensure the discord integration is installed
    # zenml integration install discord -y

    # Register the discord alerter
    # zenml alerter register discord_alerter --flavor=discord --discord_token=<DISCORD_TOKEN> --default_discord_channel_id=<DISCORD_CHANNEL_ID>

    # Add the discord alerter to your stack
    # zenml stack update -al discord_alerter

    discord_alerts_pipeline(accuracy=0.87)
```
The provided code example demonstrates how to send automated alerts to a Discord channel from a ZenML pipeline. The generate_alert_message step takes a model accuracy value and formats it into a message string. The discord_alerter_post_step is then used in the pipeline to post this generated message to the configured Discord channel. The example also includes commented instructions for installing the Discord integration, registering the alerter, and updating the ZenML stack.