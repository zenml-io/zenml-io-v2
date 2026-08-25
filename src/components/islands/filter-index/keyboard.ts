/**
 * Arrow-key navigation within a facet list (ul > li > button). Shared
 * verbatim by every FilterIndex facet rail — behavior must not drift
 * between call sites.
 */
export function handleFacetListKeyDown(e: KeyboardEvent): void {
  const { key } = e;
  if (
    key !== "ArrowDown" &&
    key !== "ArrowUp" &&
    key !== "Home" &&
    key !== "End"
  )
    return;

  const list = e.currentTarget as HTMLElement;
  const buttons = [
    ...list.querySelectorAll<HTMLButtonElement>("button:not([disabled])"),
  ];
  if (!buttons.length) return;

  const idx = buttons.indexOf(document.activeElement as HTMLButtonElement);
  if (idx === -1) return;

  e.preventDefault();
  let next: number;
  switch (key) {
    case "ArrowDown":
      next = (idx + 1) % buttons.length;
      break;
    case "ArrowUp":
      next = (idx - 1 + buttons.length) % buttons.length;
      break;
    case "Home":
      next = 0;
      break;
    case "End":
      next = buttons.length - 1;
      break;
    default:
      return;
  }
  buttons[next].focus();
}
