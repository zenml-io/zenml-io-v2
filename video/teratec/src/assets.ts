import type { CustomerLogo } from "./types";

/** Static paths are rooted at the Remotion public directory. */
export const brandAssets = {
  zenmlHorizontal: "assets/brand/zenml-horizontal.svg",
  zenmlHorizontalLight: "assets/brand/zenml-horizontal-light.svg",
  kitaruHorizontal: "assets/brand/kitaru-horizontal.svg",
  rethinkSans: "fonts/rethink-sans-variable.woff2",
} as const;

/** Approved customer-wall artwork reused from public/ and homepage R2 assets. */
export const customerLogos: Readonly<Record<CustomerLogo, string>> = {
  safran: "assets/customers/safran.png",
  "airbus-defence-and-space": "assets/customers/airbus-defence-and-space.svg",
  aecom: "assets/customers/aecom.svg",
  rivian: "assets/customers/rivian.svg",
  axa: "assets/customers/axa.svg",
  vodafone: "assets/customers/vodafone.svg",
  ikea: "assets/customers/ikea.svg",
  "leroy-merlin": "assets/customers/leroy-merlin.svg",
  adeo: "assets/customers/adeo.svg",
  stepstone: "assets/customers/stepstone.svg",
  jetbrains: "assets/customers/jetbrains.svg",
  brevo: "assets/customers/brevo.svg",
  rohlik: "assets/customers/rohlik.svg",
  knuspr: "assets/customers/knuspr.svg",
  gema: "assets/customers/gema.svg",
  neara: "assets/customers/neara.svg",
  veridas: "assets/customers/veridas.svg",
  "maven-robotics": "assets/customers/maven-robotics.svg",
};
