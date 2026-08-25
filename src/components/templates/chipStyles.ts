/**
 * Shared chip color variants for the Wave 2 templates (issue #249).
 *
 * One source for the per-variant background/text classes so Badge (the chip
 * component) and RelatedRail's tag chips cannot drift apart. Only the colors
 * are shared — RelatedRail keeps its own base shape classes (radius/padding
 * differ between the live surfaces and are parity, not drift).
 */
export type ChipVariant = "gray" | "primary" | "success" | "warning" | "blue";

export const CHIP_VARIANT_CLASS: Record<ChipVariant, string> = {
  gray: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  primary: "bg-zenml-50 text-zenml-700 hover:bg-zenml-100",
  success: "bg-success-50 text-success-700",
  warning: "bg-orange-50 text-orange-700",
  blue: "bg-blue-50 text-blue-700",
};
