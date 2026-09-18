import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Atmosphere } from "./Atmosphere";
import { fonts, palette as p } from "./brand";
import { Glyph, type GlyphName } from "./components/Glyph";

const ease = (f: number, start: number, length = 30) => {
  const t = Math.max(0, Math.min(1, (f - start) / length));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const label: React.CSSProperties = { fontFamily: fonts.label, fontSize: 26, letterSpacing: 1 };
const headline: React.CSSProperties = { fontFamily: fonts.display, fontWeight: 500, lineHeight: 1.05, margin: 0 };
function WordBeat({ children, f, at, end, style }: { children: React.ReactNode; f: number; at: number; end?: number; style?: React.CSSProperties }) {
  const enter = ease(f, at, 22);
  const leave = end === undefined ? 0 : ease(f, end, 18);
  return <div style={{ position: "absolute", opacity: enter * (1 - leave), transform: `translateY(${24 * (1 - enter) - leave * 16}px)`, ...style }}>{children}</div>;
}
function Node({ x, y, title, icon, active = false, width = 230, scale = 1 }: { x: number; y: number; title: string; icon: GlyphName; active?: boolean; width?: number; scale?: number }) {
  return <div style={{ position: "absolute", left: x, top: y, width, height: 140, border: `2px solid ${active ? p.sage : p.sageDark}`, borderRadius: 24, background: active ? p.sage : p.ink, color: active ? p.ink : p.mist, display: "flex", alignItems: "center", justifyContent: "center", gap: 20, transform: `scale(${scale})`, boxShadow: active ? "0 18px 70px #151e1933" : undefined }}><Glyph name={icon} size={42}/><span style={{ fontFamily: fonts.display, fontSize: 33 }}>{title}</span></div>;
}
function Pulse({ f, start, duration, from, to }: { f: number; start: number; duration: number; from: [number, number]; to: [number, number] }) {
  const t = Math.max(0, Math.min(1, (f - start) / duration));
  return <circle cx={lerp(from[0], to[0], t)} cy={lerp(from[1], to[1], t)} r={8} fill={p.cream} opacity={f >= start && f <= start + duration ? 1 : 0}/>;
}

/** 22s. One definition builds a sequential graph, then illustrates compute choice. */
export function EventWorkflow() {
  const f = useCurrentFrame();
  const expand = ease(f, 100, 40);
  const compute = ease(f, 245, 40);
  const production = ease(f, 505, 35);
  const codeX = lerp(490, 95, expand);
  const codeY = lerp(345, 430, expand);
  const codeScale = lerp(1, .68, expand);
  const selection = interpolate(f, [305, 325, 360, 380, 415, 435, 470, 490], [0, 1, 1, 2, 2, 3, 3, 3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ background: p.ink, color: p.mist, fontFamily: fonts.body }}>
    <Atmosphere strength={.7}/>
    <WordBeat f={f} at={0} end={235} style={{ left: 112, top: 105 }}><div style={{ ...label, color: p.sage, marginBottom: 28 }}>ZENML</div><h2 style={{ ...headline, fontSize: 91 }}>Start with your code.</h2></WordBeat>
    <WordBeat f={f} at={252} end={495} style={{ left: 112, top: 135 }}><h2 style={{ ...headline, fontSize: 91 }}>Choose your compute.</h2></WordBeat>
    <WordBeat f={f} at={515} style={{ left: 112, top: 130 }}><h2 style={{ ...headline, fontSize: 91 }}>One workflow.<br/><span style={{ color: p.sage }}>Into production.</span></h2></WordBeat>
    <div style={{ position: "absolute", inset: 0, transform: `translate(${production * -30}px, ${production * 75}px) scale(${lerp(1, .94, production)})`, transformOrigin: "960px 640px" }}>
      <div style={{ position: "absolute", left: codeX, top: codeY, width: 940, height: 370, borderRadius: 30, background: p.cream, color: p.ink, padding: "42px 48px", boxSizing: "border-box", transform: `scale(${codeScale})`, transformOrigin: "top left" }}>
        <div style={{ ...label, fontSize: 25, color: p.sageDark, marginBottom: 30 }}>CONCEPTUAL WORKFLOW</div>
        <div style={{ fontFamily: fonts.label, fontSize: 46, lineHeight: 1.55 }}><span style={{ color: p.sageDark }}>@pipeline</span><br/>def ai_workflow():<br/>&nbsp; prepare → train → evaluate</div>
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute", opacity: expand }}>
        <g fill="none" stroke={p.sageDark} strokeWidth={3}>
          <path d="M735 555H820"/><path d="M1050 555H1160M1390 555H1490" opacity={1 - compute}/>
        </g>
        <Pulse f={f} start={155} duration={35} from={[740, 555]} to={[820, 555]}/>
        <Pulse f={f} start={190} duration={25} from={[1050, 555]} to={[1160, 555]}/>
        <Pulse f={f} start={220} duration={25} from={[1390, 555]} to={[1490, 555]}/>
      </svg>
      <div style={{ opacity: expand }}>
        <Node x={820} y={485} title="Pipeline" icon="pipeline" active/>
        <div style={{ opacity: 1 - compute }}><Node x={1160} y={485} title="Train" icon="server"/><Node x={1490} y={485} title="Evaluate" icon="check"/></div>
      </div>
      <div style={{ opacity: compute * (1 - production), position: "absolute", top: 330, left: 1120, width: 650, height: 530 }}>
        <div style={{ ...label, fontSize: 24, color: p.sage, marginBottom: 30 }}>SAME WORKFLOW DEFINITION</div>
        {['Kubernetes', 'Slurm', 'Cloud', 'On-prem'].map((name, i) => <div key={name} style={{ position: "absolute", top: 65 + i * 105, left: 0, width: 650, height: 90, border: `1px solid ${p.sageDark}`, borderRadius: 16, display: "flex", alignItems: "center", paddingLeft: 115, fontSize: 39, boxSizing: "border-box" }}>{name}</div>)}
        <div style={{ position: "absolute", top: 77 + selection * 105, left: 17, width: 64, height: 64, display: "grid", placeItems: "center", background: p.sage, color: p.ink, borderRadius: 13 }}><Glyph name="server" size={36}/></div>
      </div>
      <div style={{ opacity: production }}><svg width={1920} height={1080} style={{ position: "absolute" }}><path d="M1050 555H1380" stroke={p.sage} strokeWidth={4}/><Pulse f={f} start={545} duration={45} from={[1050,555]} to={[1380,555]}/></svg><Node x={1380} y={475} title="Production" icon="check" active width={340}/></div>
    </div>
    <WordBeat f={f} at={120} end={240} style={{ left: 112, bottom: 95, ...label, color: p.sage }}>Versioned. Reproducible. Portable.</WordBeat>
    <WordBeat f={f} at={520} style={{ left: 112, bottom: 95, ...label, color: p.sage }}>Models · pipelines · agents</WordBeat>
  </AbsoluteFill>;
}

/** 20s. The workflow stays inside the ownership boundary through deployment choices. */
export function EventControl() {
  const f = useCurrentFrame();
  const enclosed = ease(f, 15, 40);
  const airgap = ease(f, 150, 30);
  const choice = ease(f, 295, 30);
  const proof = ease(f, 435, 30);
  const boundaryX = lerp(95, 115, enclosed);
  return <AbsoluteFill style={{ background: p.ink, color: p.mist, fontFamily: fonts.body }}>
    <Atmosphere strength={.7}/>
    <WordBeat f={f} at={0} end={138} style={{ left: 112, top: 95 }}><h2 style={{ ...headline, fontSize: 94 }}>Your data.<br/><span style={{ color: p.sage }}>Your infrastructure.</span></h2></WordBeat>
    <WordBeat f={f} at={155} end={285} style={{ left: 112, top: 95 }}><h2 style={{ ...headline, fontSize: 94 }}>Air-gapped deployment.</h2><div style={{ fontSize: 38, marginTop: 22, color: p.sage }}>No outbound connection.</div></WordBeat>
    <WordBeat f={f} at={305} end={427} style={{ left: 112, top: 95 }}><h2 style={{ ...headline, fontSize: 94 }}>Choose your control plane.</h2></WordBeat>
    <WordBeat f={f} at={445} style={{ left: 112, top: 95 }}><h2 style={{ ...headline, fontSize: 94 }}>Enterprise controls.<br/><span style={{ color: p.sage }}>Open-source foundation.</span></h2></WordBeat>
    <div style={{ position: "absolute", left: boundaryX, top: lerp(420, 490, proof), width: 1690, height: lerp(495, 390, proof), border: `2px solid ${proof > .99 ? "transparent" : p.sage}`, borderRadius: 42, opacity: enclosed, transform: `scale(${lerp(1.03,1,enclosed)})` }}>
      <div style={{ position: "absolute", top: -20, left: 46, opacity: 1 - proof, background: p.ink, padding: "0 20px", ...label, color: p.sage }}>YOUR VPC</div>
      <div style={{ opacity: 1 - proof, transform: `translateY(${lerp(0, -20, choice)}px)` }}>
        <svg width={1680} height={480} style={{ position: "absolute" }}><path d="M415 230H640M905 230H1150" fill="none" stroke={p.sageDark} strokeWidth={3}/><Pulse f={f} start={55} duration={70} from={[415,230]} to={[1150,230]}/><Pulse f={f} start={210} duration={65} from={[415,230]} to={[1150,230]}/></svg>
        <Node x={145} y={160} title="Data" icon="trace" width={270}/><Node x={640} y={160} title="Artifacts" icon="pipeline" width={265}/><Node x={1150} y={160} title="Compute" icon="server" width={300} active/>
      </div>
      <div style={{ position: "absolute", left: 752, top: -34, opacity: airgap * (1 - choice), width: 150, height: 67, display: "flex", justifyContent: "center", alignItems: "center", background: p.sage, color: p.ink, borderRadius: 14, transform: `translateY(${-70 * (1 - airgap)}px)` }}><Glyph name="lock" size={42}/></div>
      <div style={{ position: "absolute", bottom: -110, left: 255, display: "flex", gap: 24, alignItems: "center", opacity: choice * (1 - proof) }}>
        <div style={{ borderRadius: 14, background: p.cream, color: p.ink, padding: "20px 32px", fontSize: 31 }}>Self-hosted control plane</div><span style={{ ...label, color: p.sage }}>OR</span><div style={{ borderRadius: 14, border: `1px solid ${p.sage}`, padding: "20px 32px", fontSize: 31 }}>Managed control plane</div>
      </div>
      <div style={{ position: "absolute", inset: "65px 60px", display: "flex", alignItems: "center", justifyContent: "space-between", opacity: proof }}>
        {[['SOC 2 Type II','Certified','shield'],['ISO/IEC 27001','Certified','shield'],['Apache 2.0','Open-source core','code']].map(([title, subtitle, icon],i) => <div key={title} style={{ width: 480, transform: `translateY(${(1-ease(f,435+i*9,27))*25}px)` }}><Glyph name={icon as GlyphName} size={65} color={p.sage}/><div style={{ ...headline, fontSize: 46, marginTop: 25 }}>{title}</div><div style={{ fontSize: 28, color: p.sage, marginTop: 12 }}>{subtitle}</div></div>)}
      </div>
    </div>
  </AbsoluteFill>;
}
