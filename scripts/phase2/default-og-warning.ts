/** Advisory even under --strict: a missing card still has the generic fallback. */
export function missingDatabaseOgWarning(
  collection: string,
  slug: string,
  draft: boolean,
  manifest: { llmops: readonly string[]; mlops: readonly string[] },
): string | undefined {
  const family =
    collection === "llmops-database"
      ? "llmops"
      : collection === "mlops-database"
        ? "mlops"
        : undefined;
  if (!family || draft || manifest[family].includes(slug)) return undefined;
  return `${family}/${slug} has no default OG card in src/data/og-cards.json. Run pnpm og:sync, then pnpm og:sync --write and commit the manifest with the entry.`;
}
