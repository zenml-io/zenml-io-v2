import { type CollectionEntry, getCollection } from "astro:content";

type TeamMember = CollectionEntry<"team">;

/** Sort team members by their explicit display order, then by name. */
export function orderTeamMembers<T extends Pick<TeamMember, "data">>(
  members: readonly T[],
): T[] {
  return [...members].sort((a, b) => {
    const orderA = a.data.order ?? 999;
    const orderB = b.data.order ?? 999;
    if (orderA !== orderB) return orderA - orderB;
    return a.data.title.localeCompare(b.data.title);
  });
}

/** Return published team members in their canonical display order. */
export async function getPublishedTeamMembers(): Promise<TeamMember[]> {
  const members = await getCollection("team", ({ data }) => !data.draft);
  return orderTeamMembers(members);
}
