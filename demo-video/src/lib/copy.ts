/** All on-screen text — single source of truth, grounded in project docs */

export const HOOK = {
  context: 'We migrated a production website from Webflow',
  project: 'zenml.io — an ML platform company',
  numbers: ['2,224 Pages.', '20 Content Collections.', '1 Week.'],
  subtitle: 'Built entirely with Claude Code + Opus 4.6',
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
  punchline: 'Migrating a site this large would normally take months',
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
  shots: [
    { src: 'screens/01-homepage-hero.png', caption: 'Homepage — pixel-perfect recreation' },
    { src: 'screens/04-blog-listing.png', caption: 'Blog — sidebar browse + card grid' },
    { src: 'screens/02-llmops-filters.png', caption: 'LLMOps Database — faceted sidebar + search' },
    { src: 'screens/05-blog-post-toc.png', caption: 'Blog post — table of contents + reading progress' },
    { src: 'screens/03-llmops-mobile.png', caption: 'Mobile — responsive filter drawer' },
    { src: 'screens/06-case-study.png', caption: 'Case study — Brevo' },
  ],
};

export const OPUS = {
  headline: 'What Makes Opus 4.6 Different',
  moments: [
    {
      title: 'Self-Auditing Course Correction',
      body: 'Opus 4.6 used an external MCP server to audit its own architectural plan — found 7 critical issues — then rewrote the entire phase.',
      commit: 'cf41669',
    },
    {
      title: 'The .md Architectural Pivot',
      body: 'Recognized that MDX v2 would silently break on Webflow HTML. Switched all 1,904 content files from .mdx to .md — one decision that prevented weeks of debugging.',
      commit: '3c14121',
    },
    {
      title: 'Beyond Parity',
      body: 'After building a 1:1 copy, redesigned the LLMOps Database with faceted search, AND/OR filtering, and Pagefind. Then ran its own accessibility audit.',
      commit: '6565f6c',
    },
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
