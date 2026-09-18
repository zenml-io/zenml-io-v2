/** One-competitor cards with a title panel and paired product/logo tiles. */
import { readFileSync } from "node:fs";
import type { ReactElement } from "react";
import type { CompareOgBrand } from "../../src/lib/constants.js";

export type { CompareOgBrand };
export const OG_WIDTH = 1920;
export const OG_HEIGHT = 1080;

export interface CompareOgProps {
  competitor: string;
  subtitle: string;
  competitorLogo: string;
  brand: CompareOgBrand;
}

// Satori needs resolved colours rather than CSS custom properties.
const tokens = readFileSync(
  new URL("../../src/styles/global.css", import.meta.url),
  "utf8",
);
function token(name: string): string {
  const value = tokens.match(
    new RegExp(`--color-${name}:\\s*(#[\\da-fA-F]+);`),
  )?.[1];
  if (!value) throw new Error(`Missing OG colour token: ${name}`);
  return value;
}
const palettes = {
  zenml: {
    ground: token("sage-100"),
    panel: token("sage-50"),
    border: token("sage-300"),
    accent: token("sage-600"),
    ink: token("sage-900"),
  },
  kitaru: {
    ground: token("orange-100"),
    panel: token("cream-50"),
    border: token("orange-300"),
    accent: token("orange-600"),
    ink: token("cream-900"),
  },
};
function artwork(filename: string): string {
  return `data:image/svg+xml;base64,${readFileSync(new URL(`../../public/images/og/${filename}.svg`, import.meta.url)).toString("base64")}`;
}
const assets = {
  zenml: {
    lockup: artwork("zenml-lockup"),
    hero: artwork("zenml-hexagon"),
    backdrop: artwork("zenml-backdrop"),
  },
  kitaru: {
    lockup: artwork("kitaru-lockup"),
    hero: artwork("kitaru-hexagon"),
    backdrop: artwork("kitaru-backdrop"),
  },
};
const tileSvg = readFileSync(
  new URL("../../public/images/og/competitor-hexagon.svg", import.meta.url),
  "utf8",
);
function competitorTile(brand: CompareOgBrand): string {
  const palette = palettes[brand];
  return `data:image/svg+xml;base64,${Buffer.from(tileSvg.replace("#FAF8F4", palette.panel).replace("#9AAC82", brand === "zenml" ? token("sage-500") : palette.border)).toString("base64")}`;
}

export function compareOgBackground(brand: CompareOgBrand): string {
  return palettes[brand].ground;
}

export function CompareOg({
  competitor,
  subtitle,
  competitorLogo,
  brand,
}: CompareOgProps): ReactElement {
  const palette = palettes[brand];
  const art = assets[brand];
  const product = brand === "zenml" ? "ZenML" : "Kitaru";
  const title = `${product} vs ${competitor}`;
  const backdropWidth = brand === "zenml" ? 1173.83 : 1285.83;
  const backdropHeight = brand === "zenml" ? 1348 : 1460;
  return (
    <div
      style={{
        width: OG_WIDTH,
        height: OG_HEIGHT,
        backgroundColor: palette.ground,
        display: "flex",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Borna",
        fontWeight: 500,
      }}
    >
      <img
        src={art.backdrop}
        width={backdropWidth}
        height={backdropHeight}
        alt=""
        style={{
          position: "absolute",
          left: (OG_WIDTH - backdropWidth) / 2,
          top: (OG_HEIGHT - backdropHeight) / 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 80,
          width: 1760,
          height: 250,
          border: `3px solid ${palette.border}`,
          borderRadius: 28,
          backgroundColor: palette.panel,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "36px 60px",
          gap: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 1220,
            gap: 10,
          }}
        >
          <div
            style={{
              fontSize: title.length > 32 ? 60 : 72,
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              color: palette.ink,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 38,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: palette.accent,
            }}
          >
            {subtitle}
          </div>
        </div>
        <img
          src={art.lockup}
          width={brand === "zenml" ? 315 : 304}
          height={68}
          alt={product}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 422,
          left: 84,
          width: 1752,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <img src={art.hero} width={480} height={513} alt={product} />
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: 45,
            border: `1.5px solid ${palette.accent}`,
            backgroundColor: palette.panel,
            color: palette.accent,
            fontFamily: "Rethink Sans",
            fontSize: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 4,
          }}
        >
          VS
        </div>
        <div
          style={{
            width: 420,
            height: 452.102,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            src={competitorTile(brand)}
            width={420}
            height={452.102}
            alt=""
            style={{ position: "absolute", left: 0, top: 0 }}
          />
          <img src={competitorLogo} width={260} height={260} alt={competitor} />
        </div>
      </div>
    </div>
  );
}
