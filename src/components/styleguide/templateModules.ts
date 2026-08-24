/**
 * templateModules — the merged eager glob of every template/primitive
 * component `TemplateStage` can resolve a registry entry's `componentPath`
 * against (#248).
 *
 * Hoisted to module scope so the two `import.meta.glob` calls run once at
 * module load, not once per `TemplateStage` instantiation — the styleguide
 * renders one `TemplateStage` per `built` registry entry (8 today, growing
 * every wave), and each was re-running both globs before this existed.
 * Eager (not lazy), so the styleguide stays a static page with no client JS.
 */
export const templateModules = {
  ...import.meta.glob("/src/components/templates/**/*.astro", { eager: true }),
  ...import.meta.glob("/src/components/system/**/*.astro", { eager: true }),
} as Record<string, { default: unknown }>;
