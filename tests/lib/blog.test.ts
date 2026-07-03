import { beforeEach, describe, expect, it, vi } from "vitest";

const { getCollectionMock } = vi.hoisted(() => ({
  getCollectionMock: vi.fn(),
}));

vi.mock("astro:content", () => ({
  getCollection: getCollectionMock,
  getEntry: vi.fn(),
}));

import {
  type BlogPost,
  blogPageHref,
  buildBlogSearchIndex,
  getPaginationItems,
  getPrevNext,
  getRelatedPosts,
  sortByDateDesc,
} from "../../src/lib/blog";

function fakePost(input: {
  slug: string;
  title?: string;
  date: string;
  tags?: string[];
  category?: string;
  description?: string;
}): BlogPost {
  return {
    data: {
      slug: input.slug,
      title: input.title ?? input.slug,
      date: new Date(input.date),
      tags: input.tags ?? [],
      category: input.category,
      seo: { description: input.description },
    },
  } as BlogPost;
}

describe("blog helpers", () => {
  beforeEach(() => {
    getCollectionMock.mockReset();
    getCollectionMock.mockResolvedValue([
      { data: { slug: "mlops", name: "MLOps" } },
      { data: { slug: "kitaru", name: "Kitaru" } },
    ]);
  });

  it("sorts posts newest-first without mutating the input array", () => {
    const older = fakePost({ slug: "older", date: "2024-01-01" });
    const newer = fakePost({ slug: "newer", date: "2025-01-01" });
    const posts = [older, newer];

    expect(sortByDateDesc(posts).map((post) => post.data.slug)).toEqual([
      "newer",
      "older",
    ]);
    expect(posts).toEqual([older, newer]);
  });

  it("returns newer prev and older next posts", () => {
    const newest = fakePost({ slug: "newest", date: "2025-03-01" });
    const current = fakePost({ slug: "current", date: "2025-02-01" });
    const oldest = fakePost({ slug: "oldest", date: "2025-01-01" });
    const posts = [newest, current, oldest];

    expect(getPrevNext(posts, "current")).toEqual({
      prev: newest,
      next: oldest,
    });
    expect(getPrevNext(posts, "newest")).toEqual({ next: current });
    expect(getPrevNext(posts, "oldest")).toEqual({ prev: current });
    expect(getPrevNext(posts, "missing")).toEqual({});
  });

  it("orders related posts by relevance, then newer date, and respects the limit", () => {
    const current = fakePost({
      slug: "current",
      date: "2025-04-01",
      tags: ["agents", "durability"],
      category: "kitaru",
    });
    const highRelevance = fakePost({
      slug: "high",
      date: "2024-01-01",
      tags: ["agents", "durability"],
      category: "kitaru",
    });
    const equalNewer = fakePost({
      slug: "equal-newer",
      date: "2025-03-01",
      tags: ["agents"],
    });
    const equalOlder = fakePost({
      slug: "equal-older",
      date: "2025-02-01",
      tags: ["agents"],
    });
    const unrelated = fakePost({
      slug: "unrelated",
      date: "2026-01-01",
      tags: ["mlops"],
      category: "mlops",
    });

    expect(
      getRelatedPosts(
        [current, equalOlder, unrelated, equalNewer, highRelevance],
        current,
        3,
      ).map((post) => post.data.slug),
    ).toEqual(["high", "equal-newer", "equal-older"]);
  });

  it("returns compact pagination items for small, near-start, middle, and near-end ranges", () => {
    expect(getPaginationItems(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPaginationItems(2, 10)).toEqual([1, 2, 3, 4, 5, "ellipsis", 10]);
    expect(getPaginationItems(5, 10)).toEqual([
      1,
      "ellipsis",
      3,
      4,
      5,
      6,
      7,
      "ellipsis",
      10,
    ]);
    expect(getPaginationItems(9, 10)).toEqual([1, "ellipsis", 6, 7, 8, 9, 10]);
  });

  it("builds blog page hrefs", () => {
    expect(blogPageHref(1)).toBe("/blog");
    expect(blogPageHref(2)).toBe("/blog/page/2");
  });

  it("builds search index entries with resolved category names", async () => {
    const posts = [
      fakePost({
        slug: "first-post",
        title: "First post",
        date: "2025-05-01T12:00:00.000Z",
        category: "kitaru",
        description: "First excerpt",
      }),
    ];

    await expect(buildBlogSearchIndex(posts)).resolves.toEqual([
      {
        title: "First post",
        slug: "first-post",
        excerpt: "First excerpt",
        date: "2025-05-01T12:00:00.000Z",
        category: "Kitaru",
      },
    ]);
    expect(getCollectionMock).toHaveBeenCalledWith("categories");
  });
});
