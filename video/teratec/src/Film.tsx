import React, { type CSSProperties, type ReactNode } from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { fonts, palette, themes } from "./brand";
import { script } from "./script";
import type { VideoScene, TextLine, ThemeName, Stat } from "./types";
import { customerLogos, brandAssets } from "./assets";
import { DrawLogo } from "./components/DrawLogo";
import { Glyph } from "./components/Glyph";
import { Atmosphere } from "./Atmosphere";
import { HookWorkflow } from "./components/HookWorkflow";
import { MunichMap } from "./components/MunichMap";

const FPS = script.meta.fps;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = (x: number) => 1 - Math.pow(1 - x, 3);
const progress = (f: number, at = 0, seconds = 0.8) =>
  ease(interpolate(f, [at, at + seconds * FPS], [0, 1], clamp));
const heading: CSSProperties = {
  fontFamily: fonts.display,
  fontWeight: 500,
  letterSpacing: "-0.02em",
  lineHeight: 1.08,
};
const label: CSSProperties = {
  fontFamily: fonts.label,
  fontSize: 23,
  fontWeight: 500,
  letterSpacing: ".06em",
  textTransform: "uppercase",
};

function Reveal({
  at = 0,
  children,
  style,
}: {
  at?: number;
  children: ReactNode;
  style?: CSSProperties;
}) {
  const p = progress(useCurrentFrame(), at);
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 32}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
function Copy({
  line,
  theme,
  size,
  style,
}: {
  line: TextLine;
  theme: ThemeName;
  size?: number;
  style?: CSSProperties;
}) {
  const f = useCurrentFrame();
  const t = themes[theme];
  const isTitle = line.style === "headline" || line.style === "subhead";
  const base = isTitle
    ? heading
    : line.style === "kicker"
      ? label
      : { fontFamily: fonts.body, lineHeight: 1.4 };
  const sizes = {
    headline: 100,
    subhead: 72,
    body: 42,
    kicker: 25,
    caption: 29,
  };
  const words = line.text.split(" ");
  let position = 0;
  const ranges = (line.emphasise ?? []).map((phrase) => ({
    from: line.text.indexOf(phrase),
    to: line.text.indexOf(phrase) + phrase.length,
  }));
  return (
    <div
      style={{
        ...base,
        fontSize: size ?? sizes[line.style],
        color:
          line.tone === "muted"
            ? t.muted
            : line.tone === "accent"
              ? t.accent
              : t.fg,
        ...style,
      }}
    >
      {words.map((word, index) => {
        const emphasized = ranges.some(
          (r) => position >= r.from && position < r.to,
        );
        position += word.length + 1;
        const stagger = Math.min(index * (isTitle ? 0.038 : 0.015), 0.65) * FPS;
        const p = progress(f, line.atFrame + stagger, isTitle ? 0.72 : 0.5);
        return (
          <React.Fragment key={index}>
            <span
              style={{
                display: "inline-block",
                verticalAlign: "top",
                paddingBottom: ".13em",
                marginBottom: "-.13em",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: `translateY(${(1 - p) * 38}px) scale(${0.97 + p * 0.03})`,
                  transformOrigin: "left bottom",
                  opacity: Math.min(1, p * 1.65),
                  color: emphasized ? t.muted : undefined,
                }}
              >
                {word}
              </span>
            </span>
            {index < words.length - 1 ? " " : ""}
          </React.Fragment>
        );
      })}
    </div>
  );
}
export function Opening({ scene }: { scene: Extract<VideoScene, { kind: "logo" }> }) {
  const f = useCurrentFrame();
  const lift = progress(f, 75, 1.1) * 70;
  return (
    <>
      <Atmosphere frame={f} strength={0.9} />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          transform: `translateY(${-lift}px)`,
        }}
      >
        <DrawLogo frame={f} width={1000} />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 640,
          textAlign: "center",
        }}
      >
        {scene.tagline && (
          <Copy
            line={{ ...scene.tagline, atFrame: 85 }}
            theme="dark"
            size={72}
          />
        )}
      </div>
    </>
  );
}
function Chrome({ scene }: { scene: VideoScene }) {
  const t = themes[scene.theme];
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 96,
          top: 43,
          display: "flex",
          alignItems: "center",
          gap: 28,
        }}
      >
        <Img
          src={staticFile(
            scene.theme === "dark"
              ? brandAssets.zenmlHorizontalLight
              : brandAssets.zenmlHorizontal,
          )}
          style={{ width: 330, height: 66, objectFit: "contain", display: "block" }}
        />
        <span style={{ height: 34, width: 1, background: t.line }} />
        <span style={{ ...label, fontSize: 22, lineHeight: 1, transform: "translateY(2px)", color: t.muted }}>
          Ship AI you can trust
        </span>
      </div>
    </>
  );
}
function Statement({
  scene,
}: {
  scene: Extract<VideoScene, { kind: "statement" }>;
}) {
  const f = useCurrentFrame();
  if (scene.id === "s03-who") return <>
    <MunichMap />
    <div style={{ position: "absolute", left: 112, top: 230, width: 690 }}>
      <Copy line={scene.lines[0]} theme={scene.theme} size={25} />
      <Copy line={scene.lines[1]} theme={scene.theme} size={86} style={{ marginTop: 38 }} />
      <Copy line={scene.lines[2]} theme={scene.theme} size={35} style={{ marginTop: 45, maxWidth: 630 }} />
    </div>
  </>;
  const hook = scene.rule;
  const settle = progress(f, 58, 1.0);
  if (hook)
    return (
      <>
        <div
          style={{
            position: "absolute",
            left: 112,
            top: 215 + (1 - settle) * 155,
            transformOrigin: "left top",
            transform: `scale(${1 + (1 - settle) * 0.4})`,
            width: 1500,
          }}
        >
          <Copy line={scene.lines[0]} theme={scene.theme} size={66} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 112,
            right: 140,
            top: 330,
            height: 2,
            background: themes[scene.theme].line,
            transformOrigin: "left",
            transform: `scaleX(${progress(f, 80, 0.8)})`,
          }}
        />
        <div style={{ position: "absolute", left: 112, right: 140, top: 395 }}>
          <Copy line={scene.lines[1]} theme={scene.theme} size={96} />
        </div>
        <HookWorkflow />
      </>
    );
  if (scene.theme === "kitaru")
    return (
      <>
        <div style={{ position: "absolute", left: 112, top: 195, right: 112 }}>
          <Img
            src={staticFile(brandAssets.kitaruHorizontal)}
            style={{
              position: "absolute",
              right: 0,
              top: -15,
              width: 240,
              height: 65,
              objectFit: "contain",
            }}
          />
          <Copy line={scene.lines[0]} theme={scene.theme} />
        </div>
        <div style={{ position: "absolute", left: 112, top: 310, width: 1500 }}>
          <Copy line={scene.lines[1]} theme={scene.theme} size={92} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 112,
            top: 600,
            right: 112,
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 48,
          }}
        >
          {(
            [
              { name: "trace", text: "Production traces" },
              { name: "replay", text: "Replay a change" },
              { name: "check", text: "Compare behavior" },
            ] as const
          ).map((item, i) => (
            <Reveal
              key={item.name}
              at={125 + i * 25}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                padding: 30,
                borderRadius: 20,
                background: palette.mist,
                border: "1px solid #BECAA6",
              }}
            >
              <Glyph name={item.name} color={palette.sageDark} />
              <div style={{ ...heading, fontSize: 36 }}>{item.text}</div>
            </Reveal>
          ))}
        </div>
        <div style={{ position: "absolute", left: 112, top: 795 }}>
          <Copy line={scene.lines[2]} theme={scene.theme} size={46} />
        </div>
        <div style={{ position: "absolute", left: 112, top: 912 }}>
          <Copy line={scene.lines[3]} theme={scene.theme} size={27} />
        </div>
      </>
    );
  return (
    <div
      style={{
        position: "absolute",
        left: 112,
        right: 140,
        top: 245,
      }}
    >
      {scene.lines.map((line, i) => (
        <React.Fragment key={i}>
          <Copy
            line={line}
            theme={scene.theme}
            style={{
              maxWidth: line.style === "body" ? 1410 : 1610,
              marginBottom: line.style === "kicker" ? 42 : 44,
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
function Pipeline({
  scene,
}: {
  scene: Extract<VideoScene, { kind: "pipeline" }>;
}) {
  const f = useCurrentFrame();
  const t = themes[scene.theme];
  return (
    <>
      <div style={{ position: "absolute", left: 112, top: 205, width: 1450 }}>
        <Copy line={scene.heading} theme={scene.theme} size={88} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 470,
          left: 112,
          right: 112,
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 36,
        }}
      >
        {scene.stages.map((stage, i) => (
          <Reveal
            key={stage.label}
            at={stage.atFrame}
            style={{
              position: "relative",
              height: 302,
              padding: 32,
              boxSizing: "border-box",
              borderRadius: 20,
              background: i === 1 ? palette.ink : "#FFFEFC",
              color: i === 1 ? palette.mist : t.fg,
              border: `1px solid ${t.line}`,
              boxShadow: "0 18px 38px #151E1908",
              transform: `translateY(${(1 - progress(f, stage.atFrame)) * 60}px) scale(${0.94 + 0.06 * progress(f, stage.atFrame)})`,
            }}
          >
            {i < 3 && (
              <div
                style={{
                  position: "absolute",
                  left: "100%",
                  top: 146,
                  width: 38,
                  height: 2,
                  background: t.muted,
                  transformOrigin: "left",
                  transform: `scaleX(${progress(f, stage.atFrame + 20, 1)})`,
                }}
              />
            )}
            <Glyph
              name={stage.icon}
              size={60}
              color={i === 1 ? palette.sage : t.muted}
            />
            <div
              style={{
                ...heading,
                fontSize: 40,
                marginTop: 27,
                marginBottom: 17,
              }}
            >
              {stage.label}
            </div>
            <div
              style={{
                fontSize: 29,
                lineHeight: 1.3,
                color: i === 1 ? palette.sage : t.muted,
              }}
            >
              {stage.detail}
            </div>
          </Reveal>
        ))}
      </div>
      <div style={{ position: "absolute", left: 112, top: 867 }}>
        {scene.footer && (
          <Copy line={scene.footer} theme={scene.theme} size={48} />
        )}
      </div>
    </>
  );
}
function Attributes({
  scene,
}: {
  scene: Extract<VideoScene, { kind: "attributeGrid" }>;
}) {
  const t = themes[scene.theme];
  return (
    <>
      <div style={{ position: "absolute", left: 112, top: 190, width: 1500 }}>
        <Copy line={scene.heading} theme={scene.theme} size={92} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 112,
          right: 112,
          top: 415,
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 34,
        }}
      >
        {scene.items.slice(0, 3).map((item) => (
          <Reveal
            key={item.label}
            at={item.atFrame}
            style={{
              minHeight: 300,
              padding: 36,
              boxSizing: "border-box",
              background: "#1D2922",
              border: `1px solid ${t.line}`,
              borderRadius: 20,
            }}
          >
            <Glyph name={item.glyph} color={palette.sage} size={68} />
            <div
              style={{
                ...heading,
                fontSize: 43,
                marginTop: 30,
                marginBottom: 18,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: 30,
                lineHeight: 1.3,
                color: t.muted,
                maxWidth: 430,
              }}
            >
              {item.detail}
            </div>
          </Reveal>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 112,
          right: 112,
          top: 795,
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 34,
        }}
      >
        {scene.items.slice(3).map((item) => (
          <Reveal
            key={item.label}
            at={item.atFrame}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              padding: 28,
              borderTop: `1px solid ${t.line}`,
            }}
          >
            <Glyph name={item.glyph} color={palette.sage} size={42} />
            <div>
              <div style={{ ...heading, fontSize: 35 }}>{item.label}</div>
              <div style={{ fontSize: 25, color: t.muted, marginTop: 10 }}>
                {item.detail}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
function Count({ stat }: { stat: Stat }) {
  const f = useCurrentFrame();
  if (stat.countTo === undefined) return <>{stat.value}</>;
  const p = progress(f, stat.atFrame, (stat.countFrames ?? 70) / FPS);
  return (
    <>
      {Math.round(
        (stat.countFrom ?? 0) + (stat.countTo - (stat.countFrom ?? 0)) * p,
      ).toLocaleString("en-US")}
      {stat.value.endsWith("+") ? "+" : ""}
    </>
  );
}
function Stats({ scene }: { scene: Extract<VideoScene, { kind: "stats" }> }) {
  const t = themes[scene.theme];
  return (
    <>
      <div style={{ position: "absolute", left: 112, top: 225 }}>
        {scene.heading && <Copy line={scene.heading} theme={scene.theme} />}
      </div>
      <div
        style={{
          position: "absolute",
          left: 112,
          right: 112,
          top: 450,
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 56,
        }}
      >
        {scene.stats.map((s) => (
          <Reveal
            key={s.label}
            at={s.atFrame}
            style={{ borderTop: `2px solid ${t.line}`, paddingTop: 38 }}
          >
            <div
              style={{
                ...heading,
                fontSize: 140,
                fontVariantNumeric: "tabular-nums",
                whiteSpace: "nowrap",
                marginBottom: 30,
              }}
            >
              <Count stat={s} />
            </div>
            <div
              style={{
                fontSize: 34,
                lineHeight: 1.35,
                maxWidth: 410,
                color: t.muted,
              }}
            >
              {s.label}
            </div>
          </Reveal>
        ))}
      </div>
      <div style={{ position: "absolute", left: 112, top: 878 }}>
        {scene.source && <Copy line={scene.source} theme={scene.theme} />}
      </div>
    </>
  );
}
function Customers({
  scene,
}: {
  scene: Extract<VideoScene, { kind: "logoWall" }>;
}) {
  // Reading order, with a consistent 0.2-second stagger between logos.
  const all = scene.waves.flatMap((wave) => wave.logos).map((slug, index) => ({
    slug,
    at: scene.waves[0].atFrame + index * 6,
  }));
  return (
    <>
      <div style={{ position: "absolute", left: 112, top: 178 }}>
        <Copy line={scene.heading} theme={scene.theme} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 112,
          right: 112,
          top: 375,
          display: "grid",
          gridTemplateColumns: "repeat(6,1fr)",
          gap: "22px 26px",
        }}
      >
        {all.map(({ slug, at }) => (
          <Reveal
            key={slug}
            at={at}
            style={{
              height: 138,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#FFFEFC",
              border: "1px solid #E3E8CD",
            }}
          >
            <Img
              src={staticFile(customerLogos[slug])}
              style={{ width: 184, height: 72, objectFit: "contain" }}
            />
          </Reveal>
        ))}
      </div>
      <div style={{ position: "absolute", left: 112, top: 885 }}>
        {scene.footer && (
          <Copy line={scene.footer} theme={scene.theme} size={27} />
        )}
      </div>
    </>
  );
}
function Results({
  scene,
}: {
  scene: Extract<VideoScene, { kind: "comparison" }>;
}) {
  const t = themes[scene.theme];
  return (
    <>
      <div style={{ position: "absolute", left: 112, top: 174, width: 1510 }}>
        <Copy line={scene.heading} theme={scene.theme} size={86} />
      </div>
      <div style={{ position: "absolute", left: 112, right: 112, top: 410 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 230px 120px 330px",
            ...label,
            color: t.muted,
            fontSize: 21,
            paddingBottom: 22,
          }}
        >
          <span>JetBrains / Platform adoption</span>
          <span>Before</span>
          <span />
          <span>With ZenML</span>
        </div>
        {scene.rows.map((row) => (
          <Reveal
            key={row.metric}
            at={row.atFrame}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 230px 120px 330px",
              alignItems: "center",
              height: 139,
              borderTop: `1px solid ${t.line}`,
            }}
          >
            <span style={{ fontSize: 36 }}>{row.metric}</span>
            <span style={{ ...heading, fontSize: 66, color: t.muted }}>
              {row.before}
            </span>
            <span style={{ fontSize: 42, color: t.muted }}>→</span>
            <span
              style={{
                ...heading,
                fontSize: 96,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <Count
                stat={{
                  value: row.after,
                  label: row.metric,
                  atFrame: row.atFrame + 10,
                  countFrom: Number(row.before.replaceAll(",", "")),
                  countTo: Number(row.after.replaceAll(",", "")),
                  countFrames: 50,
                }}
              />
            </span>
          </Reveal>
        ))}
      </div>
      <div style={{ position: "absolute", left: 112, top: 885 }}>
        {scene.source && (
          <Copy line={scene.source} theme={scene.theme} size={27} />
        )}
      </div>
    </>
  );
}
export function Closing({ scene }: { scene: Extract<VideoScene, { kind: "cta" }> }) {
  const f = useCurrentFrame();
  const ending = progress(f, scene.durationInFrames - 3 * FPS, 1);
  const undraw = interpolate(
    f,
    [scene.durationInFrames - 1.8 * FPS, scene.durationInFrames - 1],
    [0, 84],
    clamp,
  );
  const logoWidth = 650 + ending * 350;
  return (
    <>
      <Atmosphere
        frame={f - (scene.durationInFrames - 1)}
        strength={0.9}
      />
      <div
        style={{
          position: "absolute",
          left: 112 + (960 - 500 - 112) * ending,
          top: 160 + (540 - 80 - 160) * ending,
        }}
      >
        <DrawLogo
          frame={undraw > 0 ? undraw : f}
          reverse={undraw > 0}
          width={logoWidth}
        />
      </div>
      <AbsoluteFill style={{ opacity: 1 - ending }}>
        <div style={{ position: "absolute", left: 112, top: 355, width: 1500 }}>
          {scene.lines.map((line, i) => (
            <Copy
              key={i}
              line={line}
              theme={scene.theme}
              style={{ marginBottom: 38, maxWidth: 1400 }}
            />
          ))}
        </div>
        <Reveal
          at={130}
          style={{
            position: "absolute",
            left: 112,
            top: 717,
            ...heading,
            fontSize: 108,
            color: palette.cream,
          }}
        >
          {scene.url} <span style={{ paddingLeft: 30 }}>↗</span>
        </Reveal>
        <Reveal
          at={145}
          style={{
            position: "absolute",
            left: 112,
            bottom: 100,
            fontSize: 29,
            color: palette.sage,
          }}
        >
          {scene.standLine}
        </Reveal>
      </AbsoluteFill>
    </>
  );
}
function Content({ scene }: { scene: VideoScene }) {
  const f = useCurrentFrame();
  switch (scene.kind) {
    case "logo":
      return <Opening scene={scene} />;
    case "statement":
      return <Statement scene={scene} />;
    case "pipeline":
      return <Pipeline scene={scene} />;
    case "attributeGrid":
      return <Attributes scene={scene} />;
    case "stats":
      return <Stats scene={scene} />;
    case "logoWall":
      return <Customers scene={scene} />;
    case "comparison":
      return <Results scene={scene} />;
    case "cta":
      return <Closing scene={scene} />;
  }
}
function Scene({ scene, index }: { scene: VideoScene; index: number }) {
  const f = useCurrentFrame();
  const t = themes[scene.theme];
  // Short optical dissolve: whole text stays intact; no masks or blur.
  const enter = index === 0 ? 1 : progress(f, 0, 0.42);
  return (
    <AbsoluteFill
      style={{
        background: t.bg,
        color: t.fg,
        fontFamily: fonts.body,
        overflow: "hidden",
        opacity: enter,
      }}
    >
      {scene.theme === "dark" &&
        scene.kind !== "logo" &&
        scene.kind !== "cta" && (
          <Atmosphere frame={f} strength={0.7} />
        )}
      {scene.kind !== "logo" && scene.kind !== "cta" && (
        <Chrome scene={scene} />
      )}
      <Content scene={scene} />
    </AbsoluteFill>
  );
}
export function Film() {
  let start = 0;
  return (
    <AbsoluteFill style={{ background: palette.ink }}>
      {script.scenes.map((scene, index) => {
        const from = start;
        start += scene.durationInFrames;
        return (
          <Sequence
            key={scene.id}
            from={from}
            durationInFrames={
              scene.durationInFrames +
              (index < script.scenes.length - 1 ? FPS : 0)
            }
          >
            <Scene scene={scene} index={index} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
