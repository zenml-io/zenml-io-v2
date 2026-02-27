/**
 * BlogSearch — inline search input with dropdown results.
 *
 * Embedded in CategoryBar. Receives a pre-built post index as JSON prop.
 * Supports Cmd+K / Ctrl+K focus, arrow key navigation, Escape to clear.
 */
import { useState, useRef, useEffect, useCallback } from "preact/hooks";

interface PostEntry {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
}

interface Props {
  posts: PostEntry[];
}

export default function BlogSearch({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = query.trim().length >= 2
    ? posts
        .filter((p) => {
          const q = query.toLowerCase();
          return p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
        })
        .slice(0, 6)
    : [];

  const showDropdown = isOpen && query.trim().length >= 2;

  // Cmd+K / Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQuery("");
        setIsOpen(false);
        inputRef.current?.blur();
        return;
      }
      if (!showDropdown) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i < results.length - 1 ? i + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i > 0 ? i - 1 : results.length - 1));
      } else if (e.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
        e.preventDefault();
        window.location.href = `/blog/${results[activeIndex].slug}`;
      }
    },
    [showDropdown, activeIndex, results],
  );

  const formatDate = (dateStr: string) => {
    try {
      return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(
        new Date(dateStr),
      );
    } catch {
      return "";
    }
  };

  return (
    <div ref={containerRef} class="relative">
      <div class="relative">
        {/* Search icon */}
        <svg
          class="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search posts..."
          class="w-48 rounded-md border border-gray-200 bg-white py-1.5 pl-8 pr-12 text-sm text-gray-700 placeholder-gray-400 transition-colors focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
          onInput={(e) => {
            setQuery((e.target as HTMLInputElement).value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          aria-label="Search blog posts"
          aria-expanded={showDropdown}
          role="combobox"
          aria-autocomplete="list"
          aria-controls="blog-search-results"
        />
        {/* Cmd+K badge */}
        <span class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
          ⌘K
        </span>
      </div>

      {/* Dropdown results */}
      {showDropdown && (
        <div
          id="blog-search-results"
          role="listbox"
          class="absolute right-0 top-full z-50 mt-1.5 w-80 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
        >
          {results.length > 0 ? (
            results.map((post, i) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                role="option"
                aria-selected={i === activeIndex}
                class={`block border-b border-gray-50 px-4 py-3 transition-colors last:border-0 ${
                  i === activeIndex ? "bg-gray-50" : "hover:bg-gray-50"
                }`}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <div class="line-clamp-1 text-sm font-medium text-gray-900">{post.title}</div>
                <div class="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                  {post.category && <span>{post.category}</span>}
                  {post.category && post.date && (
                    <span class="text-gray-300" aria-hidden="true">
                      &middot;
                    </span>
                  )}
                  {post.date && <span>{formatDate(post.date)}</span>}
                </div>
              </a>
            ))
          ) : (
            <div class="px-4 py-6 text-center text-sm text-gray-500">No posts found</div>
          )}
        </div>
      )}
    </div>
  );
}
