# ZenML Design Tokens

Extracted from the live Webflow site (`64a817a2e7e2208272d1ce30`) on 2026-02-10.

Sources: Webflow MCP variable tool + parsed production CSS
(`zenml.webflow.shared.951bbfeff.min.css`, 371 KB).

---

## 1. CSS Custom Properties (`:root`)

These are the Webflow variables defined as CSS custom properties:

```css
:root {
  /* === ZenML Brand === */
  --zenml-primary-500: #7a3ef4;        /* Main brand purple */
  --zenml-primary-600: #361776;        /* Dark purple */
  --zenml-primary-700: #281158;        /* Darker purple */
  --zenml-primary-800: #1b0c3b;        /* Darkest purple */
  --zenml-primary-025: #f1ebfe;        /* Lightest purple tint */
  --zenml-light-gradient: #f6f2ff;     /* Light purple background */
  --zenml-gray-50: var(--untitled-ui-gray50); /* #f9fafb */

  /* === Gray Scale (Untitled UI) === */
  --untitled-ui--gray25: #fcfcfd;
  --untitled-ui-gray50: #f9fafb;
  --untitled-ui-gray100: #f2f4f7;
  --untitled-ui-gray200: #e5e7eb;
  --untitled-ui-gray300: #d1d5db;
  --untitled-ui-gray400: #9ca3af;
  --untitled-ui-gray500: #6b7280;
  --untitled-ui-gray600: #4b5563;
  --untitled-ui-gray700: #374151;
  --untitled-ui-gray800: #1f2937;
  --untitled-ui-gray900: #111827;
  --untitled-ui-white: white;

  /* === Purple Scale (Untitled UI / legacy) === */
  --untitled-ui--primary25: #fcfaff;
  --untitled-ui-primary50: #f9f5ff;
  --untitled-ui-primary100: #f4ebff;
  --untitled-ui-primary300: #d6bbfb;
  --untitled-ui-primary500: #9e77ed;
  --untitled-ui-primary600: #7f56d9;
  --untitled-ui-primary700: #6941c6;
  --untitled-ui-primary800: #53389e;

  /* === Status Colors === */
  --untitled-ui-success50: #ecfdf3;
  --untitled-ui-success500: #12b76a;
  --untitled-ui-success700: #137f31;
  --untitled-ui-warning300: #fec84b;
  --untitled-ui-warning500: #f79009;
  --untitled-ui-orange50: #fef6ee;
  --untitled-ui-orange700: #b93815;
  --untitled-ui-blue50-501: #eff8ff;
  --untitled-ui-blue500: #2e90fa;
  --untitled-ui-blue700: #175cd3;
  --untitled-ui-indigo50: #eef4ff;
  --untitled-ui-indigo500: #6172f3;
  --untitled-ui-indigo700: #3538cd;
  --untitled-ui-pink50: #fdf2fa;
  --untitled-ui-pink500: #ee46bc;
  --untitled-ui-pink700: #c11574;

  /* === Miscellaneous === */
  --light-green: #dbf2ec;
  --radius-md: 8px;
}
```

---

## 2. Color Palette Summary

### Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `zenml-primary-025` | `#f1ebfe` | Lightest purple tint, subtle backgrounds |
| `zenml-light-gradient` | `#f6f2ff` | Light purple gradient background |
| `zenml-primary-500` | `#7a3ef4` | **Primary brand purple** (buttons, accents, links) |
| `zenml-primary-600` | `#361776` | Dark purple |
| `zenml-primary-700` | `#281158` | Darker purple (CTA section backgrounds) |
| `zenml-primary-800` | `#1b0c3b` | Darkest purple (CTA components) |

### Gray Scale

| Token | Hex | Usage |
|-------|-----|-------|
| `white` | `#ffffff` | Page background, button text on primary |
| `gray-25` | `#fcfcfd` | Barely-off-white |
| `gray-50` | `#f9fafb` | Light section backgrounds |
| `gray-100` | `#f2f4f7` | Badge backgrounds, borders, subtle fills |
| `gray-200` | `#e5e7eb` | Divider lines, subtle borders |
| `gray-300` | `#d1d5db` | Secondary button borders |
| `gray-400` | `#9ca3af` | Muted text, placeholders |
| `gray-500` | `#6b7280` | Secondary text |
| `gray-600` | `#4b5563` | Body text (default paragraph color) |
| `gray-700` | `#374151` | Strong secondary text, secondary button text |
| `gray-800` | `#1f2937` | Near-black text, dark section borders |
| `gray-900` | `#111827` | **Primary text color** (headings, dark sections bg) |

### Accent / Status Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `success-500` | `#12b76a` | Success green |
| `warning-500` | `#f79009` | Warning orange |
| `blue-500` | `#2e90fa` | Informational blue |
| `orange` | `#fb923c` | Orange accent (`.color-orange`) |
| `light-green` | `#dbf2ec` | Green tint background |

### Additional Direct Hex Colors (frequently used)

| Hex | Usage |
|-----|-------|
| `#7839f3` | Alternate brand purple |
| `#5c2aff` | Deep purple accent |
| `#501ef3` | Deep purple accent |
| `#ab3ef4` | Light purple accent |
| `#d6c0fe` | Light purple |
| `#e4d8fd` | Lightest purple |
| `#e7defd` | Near-white purple |
| `#f3edff` | Subtle purple background |
| `#f9f4ff` | Barely purple |
| `#bcfd2e` | Lime/neon green accent |
| `#070e27` | Near-black (hero backgrounds) |

---

## 3. Typography

### Font Families

| Font | Weights | Usage |
|------|---------|-------|
| **Plus Jakarta Sans** | 400, 600, 700 | Primary font for all headings and body text |
| **Inconsolata** | 400, 700 | Monospace / code font (loaded via Google Fonts) |

Self-hosted woff2 files for Plus Jakarta Sans are at:
- `…/plus-jakarta-sans-v8-latin-regular.woff2` (400)
- `…/plus-jakarta-sans-v8-latin-600.woff2` (600)
- `…/plus-jakarta-sans-v8-latin-700.woff2` (700)

### Heading Styles (Component Classes)

| Class | Font Size | Weight | Line Height | Letter Spacing |
|-------|-----------|--------|-------------|----------------|
| `.heading-style-h1` | 5rem (80px) | 600 | 1.2 | -- |
| `.uui-heading-xlarge` | 3.75rem (60px) | 700 | 1.2 | -0.05rem |
| `.uui-heading-large` | 3rem (48px) | 700 | 1.2 | -0.05rem |
| `.uui-heading-medium` | 2.25rem (36px) | 700 | 1.3 | -0.4px |
| `.uui-heading-small` | 1.875rem (30px) | 700 | 1.4 | -0.2px |
| `.uui-heading-xsmall` | 1.5rem (24px) | 700 | 1.4 | 0 |
| `.uui-heading-xxsmall` | 1rem (16px) | 600 | 1.25rem | -- |
| `.uui-heading-subheading` | 1rem (16px) | 600 | 1.5 | -- |

All headings use `color: var(--untitled-ui-gray900)` (#111827) except
`.uui-heading-subheading` which uses `color: var(--zenml-primary-500)` (#7a3ef4).

### Responsive Heading Sizes (from CSS cascade)

| Class | Desktop | Tablet (<=991px) | Mobile L (<=767px) | Mobile S (<=479px) |
|-------|---------|-------------------|---------------------|---------------------|
| `.heading-style-h1` | 5rem | 3rem | 2rem | 1.75rem |
| `.uui-heading-xlarge` | 3.75rem | 3.25rem | 2.25rem | -- |
| `.uui-heading-large` | 3rem | 2.75rem | 2.25rem | -- |
| `.uui-heading-medium` | 2.25rem | -- | 1.75rem | -- |
| `.uui-heading-small` | 1.875rem | -- | 1.5rem | -- |
| `.uui-heading-xsmall` | 1.5rem | -- | 1.25rem | -- |

### Text / Body Styles

| Class | Font Size | Line Height | Color |
|-------|-----------|-------------|-------|
| `.uui-text-size-xlarge` | 1.125rem (18px) | 1.5 | gray-600 |
| `.uui-text-size-large` | 1.125rem (18px) | 1.5 | -- (inherits) |
| `.uui-text-size-medium` | 1rem (16px) | 1.5 | gray-600 |
| `.uui-text-size-small` | 0.875rem (14px) | 1.5 | gray-600 |
| Base `body` | 14px (fallback), Plus Jakarta Sans | 20px | #333 |

### Font Weight Scale

- 300 (light) -- rarely used
- 400 (regular) -- body text
- 500 (medium) -- some UI elements
- 600 (semibold) -- subheadings, buttons, badges
- 700 (bold) -- headings

---

## 4. Spacing System

### Spacer Components (min-height based)

| Class | Size |
|-------|------|
| `.uui-space-xxsmall` | 0.5rem (8px) |
| `.uui-space-xsmall` | 1rem (16px) |
| `.uui-space-small` | 1.5rem (24px) |
| `.uui-space-medium` | 2rem (32px) |
| `.uui-space-large` | 3rem (48px) |
| `.uui-space-xxlarge` | 5rem (80px) |

### Page Padding

| Class | Value |
|-------|-------|
| `.padding-global` | 2.5rem (40px) left/right |
| `.padding-sides` | 2rem (32px) left/right |
| `.uui-page-padding` | 2rem (32px) left/right |
| `.page-padding` | 5em top/bottom, 5% left/right |
| `.padding-bottom` | 3rem (48px) |
| `.padding-top` | 2rem (32px) |
| `.padding-left` | 3rem (48px) |

### Container Widths

| Class | Max Width |
|-------|-----------|
| `.container-large` / `.uui-container-large` | **80rem (1280px)** |

Other max-widths observed: 1500px, 1280px, 1240px, 1140px, 960px, 940px,
720px, and various smaller component-specific widths.

---

## 5. Border Radius

### Common Values Used

| Value | Rem | Pixels |
|-------|-----|--------|
| `var(--radius-md)` | -- | **8px** |
| `0.25rem` | 0.25rem | 4px |
| `0.375rem` | 0.375rem | 6px |
| `0.5rem` | 0.5rem | **8px** (buttons) |
| `0.625rem` | 0.625rem | 10px |
| `0.75rem` | 0.75rem | 12px |
| `1rem` | 1rem | **16px** (cards, CTA blocks) |
| `10rem` / `999px` / `999rem` | -- | **Pill shape** (badges, tags) |
| `50%` / `100%` | -- | **Circle** (avatars) |
| `12px` | -- | 12px |
| `16px` | -- | 16px |
| `20px` | -- | 20px |

---

## 6. Box Shadows

### Named Shadows

| Name | Value |
|------|-------|
| Button default | `0 1px 2px rgba(16,24,40,0.05)` |
| Card / elevated | `0 4px 24px rgba(150,163,181,0.08)` |
| Medium | `0 12px 16px -4px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(16,24,40,0.03)` |
| Large | `0 24px 48px -12px rgba(16,24,40,0.18)` |
| Subtle | `0 8px 50px rgba(0,0,0,0.05)` |
| Focus ring (primary) | `0 1px 2px 0 rgba(16,24,40,0.05), 0 0 0 4px var(--untitled-ui-primary100)` |
| Focus ring (gray) | `0 1px 2px 0 rgba(16,24,40,0.05), 0 0 0 4px var(--untitled-ui-gray100)` |
| Inner border | `inset 0 -1px 0 0 var(--untitled-ui-gray200)` |

---

## 7. Buttons

### Primary Button (`.uui-button`)

```css
.uui-button {
  gap: 0.5rem;
  border: 1px solid var(--untitled-ui-primary600);    /* #7f56d9 */
  background-color: var(--zenml-primary-500);          /* #7a3ef4 */
  color: var(--untitled-ui-white);
  border-radius: 0.5rem;                               /* 8px */
  padding: 0.625rem 1.125rem;                          /* 10px 18px */
  font-family: Plus Jakarta Sans, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  box-shadow: 0 1px 2px rgba(16,24,40,0.05);
  transition: all 0.3s;
}
.uui-button:hover {
  border-color: var(--untitled-ui-primary700);         /* #6941c6 */
  background-color: var(--untitled-ui-primary700);     /* #6941c6 */
}
```

### Secondary Button (`.uui-button-secondary-gray`)

```css
.uui-button-secondary-gray {
  gap: 0.5rem;
  border: 1px solid var(--untitled-ui-gray300);        /* #d1d5db */
  background-color: var(--untitled-ui-white);
  color: var(--untitled-ui-gray700);                    /* #374151 */
  border-radius: 0.5rem;
  padding: 0.625rem 1.125rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  box-shadow: 0 1px 2px rgba(16,24,40,0.05);
}
.uui-button-secondary-gray:hover {
  background-color: var(--untitled-ui-gray50);         /* #f9fafb */
  color: var(--untitled-ui-gray800);                    /* #1f2937 */
}
```

### Link Button (`.uui-button-link`)

```css
.uui-button-link {
  gap: 0.5rem;
  color: var(--untitled-ui-primary700);                /* #6941c6 */
  background-color: transparent;
  padding: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
}
.uui-button-link:hover {
  color: var(--untitled-ui-primary800);                /* #53389e */
}
```

### Dark Mode Button (`.uui-button.over-dark`)

```css
.uui-button.over-dark:hover {
  border-color: var(--untitled-ui-gray700);
  background-color: var(--untitled-ui-gray700);
}
```

---

## 8. Breakpoints

| Name | Max Width | Tailwind Equivalent |
|------|-----------|---------------------|
| Desktop (default) | -- | `lg:` and up |
| Large desktop | min-width: 1440px | `2xl:` (custom) |
| Tablet | max-width: 991px | `md:` |
| Mobile Landscape | max-width: 767px | `sm:` |
| Mobile Portrait | max-width: 479px | (default / base) |

**Note**: Webflow uses a desktop-first (max-width) approach. Tailwind uses
mobile-first (min-width). The breakpoint mapping is:

| Tailwind breakpoint | Webflow equivalent |
|---------------------|--------------------|
| Default (base) | Mobile Portrait (<=479px) |
| `sm:` (>=640px) | Mobile Landscape (<=767px) |
| `md:` (>=768px) | Tablet (<=991px) |
| `lg:` (>=1024px) | Desktop (default) |
| `xl:` (>=1280px) | Desktop (default) |
| `2xl:` (>=1440px) | Large desktop (min-width: 1440px) |

---

## 9. Gradients

Common gradients used across the site:

| Name | Value |
|------|-------|
| Light section bg | `linear-gradient(180deg, #fff, var(--zenml-light-gradient))` |
| Light purple tint | `linear-gradient(#fff, #f6f2ff)` |
| Light purple stronger | `linear-gradient(#e7defd, #f6f2ff)` |
| Purple section bg | `linear-gradient(135deg, #f9f4ff, #fff)` |
| CTA diagonal | `linear-gradient(120deg, var(--zenml-primary-500), ...)` |
| Warm tint | `linear-gradient(135deg, rgba(255,204,51,0.1), #fff)` |

---

## 10. Badges / Tags

```css
.uui-badge {
  gap: 0.375rem;
  background-color: var(--untitled-ui-gray100);        /* #f2f4f7 */
  color: var(--untitled-ui-gray700);                    /* #374151 */
  border-radius: 10rem;                                 /* pill */
  padding: 0.125rem 0.625rem;                           /* 2px 10px */
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;
}
```

---

## 11. Dark Sections

```css
.over-dark {
  border-color: var(--untitled-ui-gray800);            /* #1f2937 */
  background-color: var(--untitled-ui-gray900);        /* #111827 */
}
```

CTA component dark background: `var(--untitled-ui-primary800)` = `#53389e`.

---

## 12. Nav & Footer

### Navbar Links

```css
.nav-link {
  color: #1a1b1f;
  letter-spacing: 0.25px;
  font-size: 14px;
  line-height: 20px;
}
```

---

## 13. Utility Classes (Color)

| Class | Property | Value |
|-------|----------|-------|
| `.text-color-dark` | color | `var(--untitled-ui-gray900)` (#111827) |
| `.text-color-primary` | color | `var(--zenml-primary-500)` (#7a3ef4) |
| `.text-color-white` | color | `var(--untitled-ui-white)` (white) |
| `.text-color-gray400` | color | `var(--untitled-ui-gray400)` (#9ca3af) |
| `.color-grey` | color | `var(--untitled-ui-gray500)` (#6b7280) |
| `.color-orange` | color | `#fb923c` |
| `.secondary-color` | color | `var(--untitled-ui-gray600)` (#4b5563) |
| `.uui-color-primary` | color | `var(--zenml-primary-500)` (#7a3ef4) |
| `.uui-color-primary-dark` | color | `var(--zenml-primary-700)` (#281158) |

---

## 14. Recommended Tailwind Configuration

```js
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        // ZenML Brand
        zenml: {
          25: '#f1ebfe',
          50: '#f6f2ff',   // light gradient
          500: '#7a3ef4',  // primary
          600: '#361776',
          700: '#281158',
          800: '#1b0c3b',
        },
        // Grays (Untitled UI)
        gray: {
          25: '#fcfcfd',
          50: '#f9fafb',
          100: '#f2f4f7',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Legacy purple scale (Untitled UI)
        purple: {
          25: '#fcfaff',
          50: '#f9f5ff',
          100: '#f4ebff',
          300: '#d6bbfb',
          500: '#9e77ed',
          600: '#7f56d9',
          700: '#6941c6',
          800: '#53389e',
        },
        // Status
        success: {
          50: '#ecfdf3',
          500: '#12b76a',
          700: '#137f31',
        },
        warning: {
          300: '#fec84b',
          500: '#f79009',
        },
        blue: {
          50: '#eff8ff',
          500: '#2e90fa',
          700: '#175cd3',
        },
        orange: {
          50: '#fef6ee',
          400: '#fb923c',
          700: '#b93815',
        },
        indigo: {
          50: '#eef4ff',
          500: '#6172f3',
          700: '#3538cd',
        },
        pink: {
          50: '#fdf2fa',
          500: '#ee46bc',
          700: '#c11574',
        },
        'light-green': '#dbf2ec',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['Inconsolata', 'monospace'],
      },
      fontSize: {
        // Heading scale
        'heading-xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.05rem', fontWeight: '700' }],
        'heading-lg': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.05rem', fontWeight: '700' }],
        'heading-md': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.4px', fontWeight: '700' }],
        'heading-sm': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.2px', fontWeight: '700' }],
        'heading-xs': ['1.5rem', { lineHeight: '1.4', fontWeight: '700' }],
        'heading-xxs': ['1rem', { lineHeight: '1.25rem', fontWeight: '600' }],
        // Text scale
        'text-xl': ['1.125rem', { lineHeight: '1.5' }],
        'text-lg': ['1.125rem', { lineHeight: '1.5' }],
        'text-md': ['1rem', { lineHeight: '1.5' }],
        'text-sm': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        // Spacer scale
        'space-xxs': '0.5rem',    // 8px
        'space-xs': '1rem',       // 16px
        'space-sm': '1.5rem',     // 24px
        'space-md': '2rem',       // 32px
        'space-lg': '3rem',       // 48px
        'space-xxl': '5rem',      // 80px
      },
      maxWidth: {
        container: '80rem',       // 1280px
      },
      borderRadius: {
        md: '0.5rem',             // 8px (buttons)
        lg: '0.75rem',            // 12px
        xl: '1rem',               // 16px (cards, CTA)
        pill: '10rem',            // pill shape (badges)
      },
      boxShadow: {
        'button': '0 1px 2px rgba(16,24,40,0.05)',
        'card': '0 4px 24px rgba(150,163,181,0.08)',
        'medium': '0 12px 16px -4px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(16,24,40,0.03)',
        'large': '0 24px 48px -12px rgba(16,24,40,0.18)',
        'subtle': '0 8px 50px rgba(0,0,0,0.05)',
        'focus-primary': '0 1px 2px 0 rgba(16,24,40,0.05), 0 0 0 4px #f4ebff',
        'focus-gray': '0 1px 2px 0 rgba(16,24,40,0.05), 0 0 0 4px #f2f4f7',
      },
      screens: {
        '2xl': '1440px',
      },
    },
  },
}
```
