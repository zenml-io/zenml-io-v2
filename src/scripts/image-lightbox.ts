/**
 * image-lightbox — click-to-expand lightbox for blog content images.
 *
 * Built on the native <dialog> element so we get focus-trapping, Escape-to-close,
 * and a ::backdrop click zone for free — no lightbox library.
 *
 * One dialog is created and appended to <body>. A single delegated click listener
 * on `document` opens it for any matching image, so dynamically-rendered/markdown
 * images are picked up without per-image wiring.
 *
 * Zoomable set:
 *   - `.prose-zoomable img`    → blog body images. The `prose-zoomable` marker
 *                                (added by BlogLayout) keeps the zoom-in cursor
 *                                and this behaviour scoped to pages where the
 *                                lightbox actually runs — other `.prose` content
 *                                site-wide (legal pages, DB entries) is untouched.
 *                                Author avatars, logos and related-post thumbs
 *                                live outside `.prose` and are excluded anyway.
 *   - `img.blog-hero-zoomable` → the hero/cover image (rendered outside `.prose`)
 *
 * Open/close motion lives entirely in CSS, gated behind
 * `prefers-reduced-motion: no-preference`, so this script stays motion-agnostic.
 */

const ZOOMABLE_SELECTOR = ".prose-zoomable img, img.blog-hero-zoomable";

export function initImageLightbox(): void {
  // Guard for non-browser contexts and browsers without <dialog> support.
  if (typeof document === "undefined") return;
  if (typeof HTMLDialogElement === "undefined") return;

  const { dialog, image } = buildLightbox();
  document.body.appendChild(dialog);

  // Single delegated listener: matches current and future images alike.
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) return;
    if (!target.matches(ZOOMABLE_SELECTOR)) return;

    // If the image is wrapped in a link, the author's link intent wins —
    // let the anchor navigate instead of hijacking the click.
    if (target.closest("a")) return;

    openLightbox(dialog, image, target);
  });

  // Click on the dialog itself (its box or the ::backdrop) closes it. Clicks on
  // the image or close button report those elements as the target, so they pass
  // through untouched.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

interface Lightbox {
  dialog: HTMLDialogElement;
  image: HTMLImageElement;
}

function buildLightbox(): Lightbox {
  const dialog = document.createElement("dialog");
  dialog.className = "image-lightbox";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "image-lightbox__close";
  closeButton.setAttribute("aria-label", "Close image");
  closeButton.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    "</svg>";
  closeButton.addEventListener("click", () => dialog.close());

  const image = document.createElement("img");
  image.className = "image-lightbox__img";

  dialog.append(closeButton, image);
  return { dialog, image };
}

function openLightbox(
  dialog: HTMLDialogElement,
  image: HTMLImageElement,
  source: HTMLImageElement,
): void {
  // currentSrc resolves srcset/responsive choices; falls back to src.
  image.src = source.currentSrc || source.src;
  image.alt = source.alt;
  // Give the modal an accessible name derived from the image's alt text.
  dialog.setAttribute("aria-label", source.alt || "Enlarged image");
  dialog.showModal();
}
