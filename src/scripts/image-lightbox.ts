/**
 * image-lightbox — click-to-expand lightbox for blog content images.
 *
 * Native <dialog> supplies focus trapping and Escape-to-close. The script marks
 * only eligible blog images as button-like triggers, then uses one shared dialog
 * and one delegated listener set for pointer and keyboard opening.
 */

const ZOOMABLE_SELECTOR = ".prose-zoomable img, img.blog-hero-zoomable";
const LIGHTBOX_ID = "blog-image-lightbox";
const TRIGGER_ATTRIBUTE = "data-image-lightbox-trigger";
const TRIGGER_ATTRIBUTE_VALUE = "true";
const FALLBACK_IMAGE_LABEL = "blog image";
const MIGRATED_PLACEHOLDER_LABELS = new Set(["__wf_reserved_inherit"]);
const TRIGGER_ATTRIBUTES = [
  "tabindex",
  "role",
  "aria-haspopup",
  "aria-controls",
  "aria-label",
] as const;

type TriggerAttribute = (typeof TRIGGER_ATTRIBUTES)[number];
type OriginalAttributes = Partial<Record<TriggerAttribute, string | null>>;

interface LightboxState {
  dialog: HTMLDialogElement;
  image: HTMLImageElement;
  closeButton: HTMLButtonElement;
  lastTrigger: HTMLImageElement | null;
}

let lightboxState: LightboxState | null = null;
const originalAttributes = new WeakMap<HTMLImageElement, OriginalAttributes>();

export function initImageLightbox(): void {
  if (typeof document === "undefined") return;
  if (typeof HTMLDialogElement === "undefined") return;
  if (!document.body) return;

  const state = getLightboxState();
  ensureDialogAttached(state);
  prepareZoomableImages();
}

function getLightboxState(): LightboxState {
  if (lightboxState) return lightboxState;

  const state = buildLightbox();
  lightboxState = state;

  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleDocumentKeydown);

  state.dialog.addEventListener("click", (event) => {
    if (event.target === state.dialog) state.dialog.close();
  });

  state.dialog.addEventListener("close", () => {
    const trigger = state.lastTrigger;
    state.lastTrigger = null;

    if (trigger?.isConnected) trigger.focus({ preventScroll: true });
  });

  return state;
}

function buildLightbox(): LightboxState {
  const dialog = document.createElement("dialog");
  dialog.id = LIGHTBOX_ID;
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
  return { dialog, image, closeButton, lastTrigger: null };
}

function ensureDialogAttached(state: LightboxState): void {
  if (!state.dialog.isConnected) document.body.appendChild(state.dialog);
}

function handleDocumentClick(event: MouseEvent): void {
  const target = event.target;
  if (!(target instanceof HTMLImageElement)) return;
  if (!isEligibleImage(target)) return;

  openLightbox(target, getImageLabel(target));
}

function handleDocumentKeydown(event: KeyboardEvent): void {
  if (event.key !== "Enter" && event.key !== " ") return;

  const target = event.target;
  if (!(target instanceof HTMLImageElement)) return;
  if (!isEligibleImage(target)) return;

  event.preventDefault();
  openLightbox(target, getImageLabel(target));
}

function prepareZoomableImages(): void {
  document
    .querySelectorAll<HTMLImageElement>(ZOOMABLE_SELECTOR)
    .forEach(prepareImageTrigger);
}

function prepareImageTrigger(image: HTMLImageElement): void {
  if (!isEligibleImage(image)) {
    clearTriggerAttributes(image);
    return;
  }

  setTriggerAttributes(image, getTriggerAttributeValues(getImageLabel(image)));
}

function isEligibleImage(image: HTMLImageElement): boolean {
  if (!image.matches(ZOOMABLE_SELECTOR)) return false;
  if (image.closest("a")) return false;
  if (isExplicitlyDecorativeImage(image)) return false;

  return Boolean(image.currentSrc || image.src || image.getAttribute("src"));
}

function isExplicitlyDecorativeImage(image: HTMLImageElement): boolean {
  const ariaHidden = image.getAttribute("aria-hidden")?.toLowerCase();
  const role = image.getAttribute("role")?.toLowerCase();

  return ariaHidden === "true" || role === "presentation" || role === "none";
}

function getImageLabel(image: HTMLImageElement): string {
  return getAuthoredImageLabel(image) ?? FALLBACK_IMAGE_LABEL;
}

function getAuthoredImageLabel(image: HTMLImageElement): string | null {
  const alt = normalizeImageLabel(image.getAttribute("alt"));
  if (alt) return alt;

  const originals = originalAttributes.get(image);
  const ariaLabel = normalizeImageLabel(
    originals ? originals["aria-label"] : image.getAttribute("aria-label"),
  );
  if (ariaLabel) return ariaLabel;

  const figcaption = image.closest("figure")?.querySelector("figcaption");
  return normalizeImageLabel(figcaption?.textContent ?? null);
}

function normalizeImageLabel(label: string | null | undefined): string | null {
  const normalized = label?.trim();
  if (!normalized) return null;
  if (MIGRATED_PLACEHOLDER_LABELS.has(normalized)) return null;

  return normalized;
}

function getTriggerAttributeValues(
  label: string,
): Record<TriggerAttribute, string> {
  return {
    tabindex: "0",
    role: "button",
    "aria-haspopup": "dialog",
    "aria-controls": LIGHTBOX_ID,
    "aria-label": getTriggerAriaLabel(label),
  };
}

function getTriggerAriaLabel(label: string): string {
  return label === FALLBACK_IMAGE_LABEL
    ? "Enlarge blog image"
    : `Enlarge image: ${label}`;
}

function getDialogAriaLabel(label: string): string {
  return label === FALLBACK_IMAGE_LABEL
    ? "Enlarged blog image"
    : `Enlarged image: ${label}`;
}

function setTriggerAttributes(
  image: HTMLImageElement,
  values: Record<TriggerAttribute, string>,
): void {
  const originals = originalAttributes.get(image) ?? {};

  setAttributeIfChanged(image, TRIGGER_ATTRIBUTE, TRIGGER_ATTRIBUTE_VALUE);

  for (const attribute of TRIGGER_ATTRIBUTES) {
    if (!(attribute in originals)) {
      originals[attribute] = image.getAttribute(attribute);
    }

    setAttributeIfChanged(image, attribute, values[attribute]);
  }

  originalAttributes.set(image, originals);
}

function clearTriggerAttributes(image: HTMLImageElement): void {
  removeAttributeIfPresent(image, TRIGGER_ATTRIBUTE);

  const originals = originalAttributes.get(image);
  if (!originals) return;

  for (const attribute of TRIGGER_ATTRIBUTES) {
    const originalValue = originals[attribute];

    if (originalValue === null) {
      removeAttributeIfPresent(image, attribute);
    } else if (originalValue !== undefined) {
      setAttributeIfChanged(image, attribute, originalValue);
    }
  }

  originalAttributes.delete(image);
}

function setAttributeIfChanged(
  element: HTMLElement,
  attribute: string,
  value: string,
): void {
  if (element.getAttribute(attribute) !== value) {
    element.setAttribute(attribute, value);
  }
}

function removeAttributeIfPresent(
  element: HTMLElement,
  attribute: string,
): void {
  if (element.hasAttribute(attribute)) element.removeAttribute(attribute);
}

function openLightbox(source: HTMLImageElement, label: string): void {
  const state = getLightboxState();
  ensureDialogAttached(state);

  state.image.src = source.currentSrc || source.src;
  state.image.alt = label;
  state.dialog.setAttribute("aria-label", getDialogAriaLabel(label));
  state.lastTrigger = source;

  if (!state.dialog.open) state.dialog.showModal();

  state.closeButton.focus({ preventScroll: true });
}
