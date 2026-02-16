/** All on-screen text — single source of truth, grounded in project docs */

/* ── V2 copy (voice-driven video) ─────────────────────────────────────── */

export const V2_HOOK = {
  /** Flashed on screen as Alex says each number */
  numbers: ['2,224 Pages', '20 Collections', '~5 Days'],
  subtitle: 'Claude Code + Opus 4.6',
};

export const V2_WHY = {
  headline: 'Platform lock-in is a trap',
  bullets: [
    '$800/yr rent — $0 on Cloudflare',
    '1 editor at a time — site locked',
    'No version control. No CI/CD.',
    'Manual migration: months + $$$',
  ],
};

export const V2_LEARNINGS = {
  planning: {
    tag: 'Planning',
    headline: '22 Planning Docs. Self-Correcting.',
    broll: 'clips/03-llmops-database.mp4',
    brollSkip: 0,
    broll2: 'clips/03b-llmops-entry.mp4',
    brollSkip2: 0,
  },
  multimodal: {
    tag: 'Multi-Modal',
    headline: 'Playwright → Frame Extraction → Understanding',
    broll: 'clips/01-homepage-scroll.mp4',
    brollSkip: 0,
    broll2: 'clips/05-case-study.mp4',
    brollSkip2: 0,
  },
  verification: {
    tag: 'Verification',
    headline: 'SEO 100. Accessibility 100. On Mobile.',
    broll: 'clips/04-blog-post.mp4',
    brollSkip: 0,
    broll2: 'clips/02-blog-listing.mp4',
    brollSkip2: 0,
  },
};

export const V2_RESULTS = {
  metrics: [
    { label: 'SEO', value: '92 → 100', detail: 'perfect score on mobile' },
    { label: 'Accessibility', value: '89 → 100', detail: 'Webflow couldn\'t on desktop' },
    { label: 'Hosting', value: '$800 → $0', detail: 'Cloudflare Pages free tier' },
  ],
};

export const V2_CLOSE = {
  lines: [
    'zenml-io-v2.pages.dev',
    'github.com/zenml-io/zenml-io-v2',
    'Claude Code Hackathon — Feb 10–16, 2026',
  ],
};

/* ── V1 copy (kept for reference, used by old scenes) ───────────────── */

export const HOOK = {
  context: 'We migrated a production website from Webflow',
  project: 'zenml.io — an ML platform company',
  numbers: ['2,224 Pages.', '20 Content Collections.', '1 Week.'],
  subtitle: 'Built with Claude Code + Opus 4.6',
  asterisk: '*with a little help from Sonnet & Haiku',
};

export const PROBLEM = {
  headline: 'Webflow is great until you outgrow it',
  bullets: [
    'Vendor lock-in — no version control',
    'No CI/CD or branch previews',
    'Customization ceiling',
    'Cost at scale — $$$',
  ],
  scale: '2,224 pages across 20 CMS collections',
  punchline: 'A manual migration would take months.',
  punchline2: 'And you\'d still get things wrong.',
};

export const PIPELINE = {
  headline: 'The Migration Pipeline',
  subtitle: 'From Webflow → self-hosted Astro static site on Cloudflare',
  phases: [
    { num: 1, name: 'Export', detail: '2,340 CMS items extracted via Webflow API' },
    { num: 2, name: 'Transform', detail: 'HTML → Markdown with SEO metadata preserved' },
    { num: 3, name: 'Schema', detail: '20 Zod schemas with build-time validation' },
    { num: 4, name: 'Build', detail: 'All pages, layouts, and 7 Preact interactive islands' },
    { num: 5, name: 'Verify', detail: 'SEO parity testing + 52 redirect rules' },
    { num: 6, name: 'Go Beyond', detail: 'LLMOps research hub redesign + accessibility audit' },
  ],
};

export const WALKTHROUGH = {
  clips: [
    { src: 'clips/01-homepage-scroll.webm', caption: 'Homepage — pixel-perfect recreation', skipFrames: 30 },
    { src: 'clips/02-blog-listing.webm', caption: 'Blog — sidebar browse + card grid', skipFrames: 90 },
    { src: 'clips/03-llmops-database.webm', caption: 'LLMOps Database — faceted sidebar + search', skipFrames: 60 },
    { src: 'clips/04-blog-post.webm', caption: 'Blog post — TOC + reading progress', skipFrames: 90 },
    { src: 'clips/05-case-study.webm', caption: 'Case study — JetBrains', skipFrames: 90 },
  ],
};

export const OPUS = {
  headline: 'What Makes Opus 4.6 Different',
  moments: [
    { tag: 'Planning', title: 'Incremental Planning', body: 'Created 22 planning documents — not upfront waterfall, but phase-by-phase plans that adapted as complexity emerged. Spikes and sub-phases added on the fly.' },
    { tag: 'Self-Correction', title: 'Self-Auditing Course Correction', body: 'Autonomously audited its own architectural plan — found 7 critical issues — then rewrote the entire phase.' },
    { tag: 'Architecture', title: 'The .md Architectural Pivot', body: 'Recognized that MDX v2 would silently break on Webflow HTML. Switched all 1,904 content files — one decision that prevented weeks of debugging.' },
    { tag: 'Going Beyond', title: 'Beyond Parity', body: 'Redesigned the LLMOps Database with faceted filtering and Pagefind — build-time semantic search with zero server infrastructure.' },
    { tag: 'SEO', title: 'SEO Beyond Parity', body: 'Preserved every URL, redirect, and meta tag. Google\'s own tools rated the migrated site\'s SEO higher than the Webflow original.' },
  ],
};

export const NUMBERS = {
  stats: [
    { value: 2224, label: 'pages', suffix: '' },
    { value: 33, label: 'second build', suffix: 's' },
    { value: 120, label: 'commits', suffix: '' },
    { value: 2397, label: 'assets migrated', suffix: '' },
    { value: 52, label: 'redirect rules', suffix: '' },
    { value: 7, label: 'Preact islands', suffix: '' },
    { value: 22, label: 'planning docs', suffix: '' },
    { value: 6, label: 'phases', suffix: '' },
  ],
};

export const OUTRO = {
  lines: [
    'zenml-io-v2.pages.dev',
    'github.com/zenml-io/zenml-io-v2',
    'Claude Code Hackathon — Feb 10–16, 2026',
  ],
};
