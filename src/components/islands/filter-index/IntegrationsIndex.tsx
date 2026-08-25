/**
 * Integrations hub filter island — thin FilterIndex config on top of the
 * shared `ControlFilterIndex` engine (#249, replaces the vanilla
 * `<script>` filter in `src/pages/integrations/index.astro`). Card markup
 * stays 100% Astro-rendered (see ControlFilterIndex's TSDoc for why) and is
 * passed through as this component's children; this file only owns the
 * facet rail's data shape and search text.
 */
import type { ComponentChildren } from "preact";
import { ControlFilterIndex } from "./ControlFilterIndex";
import type { FilterOption } from "./types";

export interface IntegrationIndexItem {
  slug: string;
  title: string;
  type: string;
}

export interface IntegrationsIndexProps {
  items: IntegrationIndexItem[];
  types: FilterOption[];
  children?: ComponentChildren;
}

export default function IntegrationsIndex({
  items,
  types,
  children,
}: IntegrationsIndexProps) {
  return (
    <ControlFilterIndex<IntegrationIndexItem>
      idPrefix="integrations"
      items={items}
      getSlug={(item) => item.slug}
      getSearchText={(item) => item.title}
      singleFacet={{
        label: "Type",
        urlParam: "type",
        options: types,
        getValue: (item) => item.type,
      }}
      singleTone="primary"
      resultNounPlural="integrations"
      searchPlaceholder="Search integrations..."
      searchAriaLabel="Search integrations"
    >
      {children}
    </ControlFilterIndex>
  );
}
