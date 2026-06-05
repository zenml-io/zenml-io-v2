import {
  joinMarkdownSections,
  markdownBulletList,
  markdownCtaList,
  markdownPreamble,
  markdownResponse,
} from "../../lib/agentMarkdown";
import {
  PRODUCT_ZENML_BENEFITS,
  PRODUCT_ZENML_FINAL_CTA,
  PRODUCT_ZENML_HERO,
  PRODUCT_ZENML_SEO,
} from "../../lib/productZenml";

export const prerender = true;

export function GET(): Response {
  const markdown = joinMarkdownSections(
    markdownPreamble({
      title: `${PRODUCT_ZENML_HERO.headline.trimEnd()} ${PRODUCT_ZENML_HERO.headlineAccent}`,
      description: PRODUCT_ZENML_SEO.description,
      canonicalPath: "/product/zenml",
    }),
    joinMarkdownSections(
      "## Summary",
      `${PRODUCT_ZENML_HERO.subtitleLead} ${PRODUCT_ZENML_HERO.subtitle}`,
      `Install: \`${PRODUCT_ZENML_HERO.installCmd}\``,
    ),
    joinMarkdownSections(
      "## Main CTAs",
      markdownCtaList([
        PRODUCT_ZENML_HERO.primaryCta,
        PRODUCT_ZENML_HERO.secondaryCta,
      ]),
    ),
    joinMarkdownSections(
      `## ${PRODUCT_ZENML_BENEFITS.eyebrow}`,
      ...PRODUCT_ZENML_BENEFITS.items.map((item) =>
        joinMarkdownSections(`### ${item.name}`, item.body),
      ),
    ),
    joinMarkdownSections(
      "## Infrastructure flexibility",
      markdownBulletList([
        "Write one pipeline and run it locally or on production orchestrators such as Kubernetes, Vertex AI, SageMaker, AzureML, and Airflow.",
        "Keep your own artifact store, experiment tracker, model registry, and cloud provider instead of moving everything into a monolithic platform.",
        "Use ZenML as the connective layer: the pipeline definition stays stable while the infrastructure underneath can change.",
      ]),
    ),
    joinMarkdownSections(
      "## Reproducibility path",
      markdownBulletList([
        "Every pipeline run records steps, parameters, artifacts, metadata, and lineage.",
        "Teams can inspect what happened after a run, compare runs, and re-execute historical pipelines from known states.",
        "The open-source SDK is the starting point; managed Pro adds governance, collaboration, and a hosted control plane.",
      ]),
    ),
    joinMarkdownSections(
      `## ${PRODUCT_ZENML_FINAL_CTA.headline}`,
      PRODUCT_ZENML_FINAL_CTA.body,
      `Install: \`${PRODUCT_ZENML_FINAL_CTA.installCmd}\``,
      "### CTAs",
      markdownCtaList([
        PRODUCT_ZENML_FINAL_CTA.primaryCta,
        PRODUCT_ZENML_FINAL_CTA.secondaryCta,
      ]),
    ),
  );

  return markdownResponse(markdown);
}
