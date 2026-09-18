import React, { type CSSProperties, type ReactNode } from 'react';
import { AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { fonts, palette as c } from './brand';
import { brandAssets, customerLogos } from './assets';
import { script } from './script';
import { Opening, Closing } from './Film';
import { Atmosphere } from './Atmosphere';
import { Glyph } from './components/Glyph';
import { EventWorkflow, EventControl } from './EventWorkflow';
import { eventChapters } from './eventTimeline';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const p = (f: number, start: number, length = 24) => {
  const x = interpolate(f, [start, start + length], [0, 1], clamp);
  return x * x * (3 - 2 * x);
};
const display: CSSProperties = { fontFamily: fonts.display, fontWeight: 500, letterSpacing: '-.035em', lineHeight: 1.03 };
const mono: CSSProperties = { fontFamily: fonts.label, fontSize: 25, letterSpacing: '.035em' };
function Title({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ ...display, fontSize: 110, ...style }}>{children}</div>;
}
function Enter({ children, at = 0, style }: { children: ReactNode; at?: number; style?: CSSProperties }) {
  const value = p(useCurrentFrame(), at);
  return <div style={{ opacity: value, transform: `translateY(${(1 - value) * 44}px)`, ...style }}>{children}</div>;
}
function Page({ children, dark = false, cream = false }: { children: ReactNode; dark?: boolean; cream?: boolean }) {
  return <AbsoluteFill style={{ background: dark ? c.ink : cream ? c.cream : c.mist, color: dark ? c.mist : c.ink, fontFamily: fonts.body }}>
    {dark && <Atmosphere strength={0.7} />}{children}
  </AbsoluteFill>;
}
function Product({ name, dark = false }: { name: string; dark?: boolean }) {
  return <div style={{ position: 'absolute', top: 68, left: 88, ...mono, color: dark ? c.sage : c.sageDark }}>{name}</div>;
}
function Hook() {
  const f = useCurrentFrame();
  const wide = p(f, 115, 45);
  const nodeX = 760 - wide * 370;
  return <Page dark>
    <div style={{ position: 'absolute', left: 90, top: 82 }}><Title style={{ fontSize: 110 }}>Training is the start.</Title></div>
    <svg width="1920" height="1080" style={{ position: 'absolute' }}>
      {[0, 1, 2].map(i => <path key={i} d={`M ${nodeX + 250} 610 C 1100 610 1000 ${360 + i * 250} 1280 ${360 + i * 250}`} stroke={c.sage} strokeWidth="4" fill="none" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - wide} opacity={0.5} />)}
    </svg>
    <div style={{ position: 'absolute', top: 460, left: nodeX, width: 300, height: 300, background: c.sage, borderRadius: 40, color: c.ink, transform: `rotate(${(1 - wide) * -7}deg)`, display: 'grid', placeItems: 'center', boxShadow: '24px 28px 0 #3C4C38' }}><Glyph name="pipeline" size={126} /><span style={{ ...mono, position: 'absolute', bottom: 30 }}>TRAIN</span></div>
    {['Data', 'Compute', 'Production'].map((word, i) => <div key={word} style={{ position: 'absolute', left: 1250, top: 280 + i * 250, opacity: wide, transform: `translateX(${(1 - wide) * 130}px)`, width: 470, height: 170, border: `2px solid ${c.sageDark}`, borderRadius: 26, display: 'flex', alignItems: 'center', gap: 28, padding: 35, fontSize: 48 }}><Glyph name={i === 1 ? 'server' : i === 2 ? 'check' : 'trace'} size={58}/>{word}</div>)}
    <div style={{ position: 'absolute', left: 90, top: 250, opacity: wide }}><Title style={{ fontSize: 68, color: c.sage }}>Run AI on infrastructure you control.</Title></div>
  </Page>;
}
function Community() {
  const f = useCurrentFrame();
  const beat = Math.min(2, Math.floor(f / 120));
  const local = f - beat * 120;
  const items = [{ number: '5,600+', text: 'GitHub stars', foot: 'zenml-io/zenml' }, { number: '2,900', text: 'Community engineers', foot: 'ZenML community' }, { number: '60+', text: 'AI integrations', foot: 'CNCF Silver Member · since March 2026' }];
  const item = items[beat];
  return <Page cream>
    <Product name="ZENML / OPEN SOURCE" />
    <div style={{ position: 'absolute', left: 90, top: 250 + (1 - p(local, 0, 18)) * 55, opacity: p(local, 0, 14) }}>
      <Title style={{ fontSize: 240 }}>{item.number}</Title>
      <Title style={{ fontSize: 65, marginTop: 32 }}>{item.text}</Title>
      <div style={{ ...mono, marginTop: 50 }}>{item.foot}</div>
    </div>
    <div style={{ position: 'absolute', left: 1030, top: 220, width: 790, height: 650, transform: `rotate(${-9 + beat * 9}deg) scale(${.94 + p(local, 0, 90) * .06})` }}>
      {beat === 2 && <svg width={720} height={680} style={{ position: 'absolute', opacity: p(local, 0, 40) }}>{Array.from({ length: 7 }, (_, i) => <React.Fragment key={i}><path d={`M32 ${32+i*98} H620`} stroke={c.sageDark} strokeWidth={2}/><path d={`M${32+i*98} 32 V620`} stroke={c.sageDark} strokeWidth={2}/></React.Fragment>)}</svg>}
      {Array.from({ length: 49 }, (_, i) => {
        const x = i % 7, y = Math.floor(i / 7);
        const spread = beat === 2 ? 98 : beat === 1 ? 90 : 82;
        return <div key={i} style={{ position: 'absolute', width: beat === 1 ? 52 : 64, height: beat === 1 ? 52 : 64, borderRadius: beat === 1 ? '50%' : 12, left: x * spread, top: y * spread, background: (x + y + beat) % 4 === 0 ? c.ink : c.sage, opacity: p(local, (x + y) * 2, 22), transform: `translateY(${Math.sin((f / 90) + x * .4 + y * .3) * 5}px)` }} />;
      })}
    </div>
  </Page>;
}
function Customers() {
  const f = useCurrentFrame();
  const customerScene = script.scenes.find(s => s.kind === 'logoWall');
  if (!customerScene || customerScene.kind !== 'logoWall') return null;
  const wave = Math.min(2, Math.floor(f / 180));
  const local = f - wave * 180;
  const logos = customerScene.waves[wave].logos;
  const columns = logos.length === 4 ? 2 : 4;
  return <Page>
    <Title style={{ position: 'absolute', left: 88, top: 80, fontSize: 100 }}>Trusted in production.</Title>
    <div style={{ position: 'absolute', left: 88, top: 228, ...mono, color: c.sageDark }}>ZENML / CUSTOMERS</div>
    <div style={{ position: 'absolute', left: 100, top: 355, width: 1720, display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 28, transform: `translateX(${(1 - p(local, 0, 25)) * 180}px)`, opacity: p(local, 0, 18) }}>
      {logos.map((logo, i) => <div key={logo} style={{ height: 240, background: 'white', borderRadius: 32, padding: 48, display: 'grid', placeItems: 'center', transform: `translateY(${(1 - p(local, i * 2, 25)) * 30}px)`, boxShadow: `0 ${10 + Math.sin(f / 120) * 3}px 0 ${c.cream}` }}><Img src={staticFile(customerLogos[logo])} style={{ width: '100%', maxWidth: logos.length === 4 ? 430 : 270, height: 120, objectFit: 'contain' }}/></div>)}
    </div>
  </Page>;
}
function Results() {
  const f = useCurrentFrame();
  const beat = Math.min(2, Math.floor(f / 180));
  const local = f - beat * 180;
  const data = [{ label: 'Active users', before: 8, after: 44 }, { label: 'Production pipelines', before: 3, after: 49 }, { label: 'Monthly pipeline runs', before: 150, after: 2765 }][beat];
  const grow = p(local, 28, 48);
  return <Page dark>
    <Product name="ZENML / JETBRAINS" dark />
    <div style={{ position: 'absolute', left: 90, top: 175, opacity: p(local, 0, 18) }}><Title style={{ fontSize: 80 }}>{data.label}</Title></div>
    <div style={{ position: 'absolute', left: 90, top: 395, width: 1660, display: 'flex', alignItems: 'center', gap: 65, transform: `translateY(${(1 - p(local, 0, 25)) * 60}px)`, opacity: p(local, 0, 20) }}>
      <Title style={{ fontSize: beat === 2 ? 170 : 230, color: c.sage, minWidth: 290 }}>{data.before.toLocaleString('en-US')}</Title>
      <svg width="220" height="90"><path d="M 0 45 H 200 M 168 12 L 205 45 L 168 78" fill="none" stroke={c.sage} strokeWidth="5"/></svg>
      <Title style={{ fontSize: beat === 2 ? 225 : 290 }}>{Math.round(data.before + (data.after - data.before) * grow).toLocaleString('en-US')}</Title>
    </div>
    <div style={{ position: 'absolute', left: 90, top: 780, width: 1660, height: 64, borderRadius: 12, background: c.sageDark, overflow: 'hidden' }}><div style={{ height: '100%', width: `${100 * (data.before / data.after + (1 - data.before / data.after) * grow)}%`, background: c.sage, borderRadius: 12 }}/><div style={{ position: 'absolute', top: 0, bottom: 0, left: `${100 * data.before/data.after}%`, borderLeft: `3px solid ${c.ink}` }}/></div>
    <div style={{ position: 'absolute', left: 90, top: 902, fontSize: 28, color: c.sage }}>JetBrains · Published case study · zenml.io/case-study/jetbrains</div>
  </Page>;
}
function Kitaru() {
  const f = useCurrentFrame();
  const split = p(f, 150, 36);
  const compare = p(f, 330, 30);
  return <Page cream>
    <Img src={staticFile(brandAssets.kitaruHorizontal)} style={{ position: 'absolute', left: 88, top: 62, width: 270, height: 62, objectFit: 'contain', objectPosition: 'left' }} />
    <Title style={{ position: 'absolute', left: 88, top: 164, width: 1740, fontSize: 85 }}>Replay your agents on production data.</Title>
    <div style={{ position: 'absolute', left: 90, top: 303, ...mono, color: c.sageDark }}>{compare > .5 ? 'COMPARE BEHAVIOR' : split > .5 ? 'REPLAY A CHANGE' : 'START WITH PRODUCTION TRACES'}</div>
    <svg width="1920" height="1080" style={{ position: 'absolute', top: 0 }}>
      <path d={`M 330 610 H 650 Q 730 610 780 ${610 - split * 145} H 1680`} fill="none" stroke={c.sageDark} strokeWidth="5"/>
      <path d={`M 650 610 Q 730 610 780 ${610 + split * 145} H 1680`} fill="none" stroke={c.sageDark} strokeWidth="5" opacity={split}/>
    </svg>
    <div style={{ position: 'absolute', left: 90, top: 500, width: 240, height: 220, background: c.ink, color: c.mist, borderRadius: 30, display: 'grid', placeItems: 'center' }}><Glyph name="trace" size={85}/><span style={{ ...mono, fontSize: 24 }}>TRACES</span></div>
    {[0, 1].map(lane => <React.Fragment key={lane}>
      <div style={{ position: 'absolute', left: 785, top: 610 + (lane === 0 ? -1 : 1) * split * 145 - 120, ...mono, opacity: lane === 0 ? 1 : split }}>{lane === 0 ? 'BASELINE' : 'CHANGED AGENT'}</div>
      {[0, 1, 2, 3].map(i => {
        const changed = lane === 1 && i === 2 && compare > .01;
        const flagged = lane === 1 && i === 3 && compare > .01;
        const signal = ((f - 30) % 150) / 150;
        return <div key={i} style={{ position: 'absolute', left: 785 + i * 235, top: 550 + (lane === 0 ? -1 : 1) * split * 145, width: 130, height: 120, borderRadius: 22, border: `3px solid ${c.ink}`, background: changed ? c.ink : c.sage, color: changed ? c.mist : c.ink, opacity: lane === 0 ? 1 : split, transform: `scale(${1 + .08 * Math.max(0, 1 - Math.abs(signal - i / 4) / .08)})`, display: 'grid', placeItems: 'center' }}>{changed || flagged ? <span style={{ fontSize: 50 }}>{flagged ? '!' : '≠'}</span> : <Glyph name={i === 3 ? 'check' : 'code'} size={42}/>}</div>;
      })}
    </React.Fragment>)}
    <div style={{ position: 'absolute', left: 1460, top: 832, opacity: compare, ...mono, fontSize: 22 }}>Review difference</div>
    <div style={{ position: 'absolute', left: 90, top: 920, display: 'flex', gap: 55, alignItems: 'baseline' }}><Title style={{ fontSize: 48, opacity: compare }}>Catch regressions before release.</Title><span style={{ ...mono, fontSize: 20 }}>Illustrative replay · github.com/zenml-io/kitaru</span></div>
  </Page>;
}
function Company() {
  const f = useCurrentFrame();
  const team = p(f, 115, 36);
  const reach = p(f, 265, 36);
  return <Page>
    <Product name="ZENML LABS" />
    <div style={{ position: 'absolute', left: 90, top: 320 - team * 160, transformOrigin: 'left top', transform: `scale(${1 - team * .45})`, opacity: 1 - reach }}>
      <Title style={{ fontSize: 200 }}>Built in Munich.</Title>
      <Title style={{ fontSize: 67, color: c.sageDark, marginTop: 40 }}>An open-source company.</Title>
    </div>
    <div style={{ position: 'absolute', left: 210 - reach * 85, top: 415 - reach * 15, width: 820, height: 500, opacity: team, transform: `translateY(${(1-team)*220}px)` }}>
      {Array.from({ length: 15 }, (_, i) => <div key={i} style={{ position: 'absolute', left: (i % 5) * 145, top: Math.floor(i / 5) * 145, height: 104, width: 104, borderRadius: 25, background: i < 2 ? c.ink : c.sage, transform: `rotate(${(1-team)*-20}deg)` }}/>) }
    </div>
    <div style={{ position: 'absolute', left: 1090, top: 390, opacity: team * (1-reach), transform: `translateX(${(1-team)*300}px)` }}><Title style={{ fontSize: 250 }}>15</Title><Title style={{ fontSize: 70 }}>people.</Title></div>
    <div style={{ position: 'absolute', left: 90, top: 915, opacity: team * (1-reach), fontSize: 34 }}>Founded by Adam Probst and Hamza Tahir.</div>
    <div style={{ position: 'absolute', left: 90, top: 190, opacity: reach }}><Title style={{ fontSize: 103 }}>Customers across continents.</Title></div>
    <div style={{ position: 'absolute', left: 1030, top: 430, opacity: reach }}><Title style={{ fontSize: 105 }}>Europe</Title><div style={{ width: 500, height: 4, background: c.sage, margin: '45px 0', transformOrigin: 'left', transform: `scaleX(${reach})` }}/><Title style={{ fontSize: 105 }}>North America</Title></div>
  </Page>;
}
const components: Record<string, React.ComponentType> = { hook: Hook, workflow: EventWorkflow, control: EventControl, community: Community, customers: Customers, results: Results, kitaru: Kitaru, company: Company };
function Chapter({ id, duration }: { id: string; duration: number }) {
  const f = useCurrentFrame();
  const incoming = p(f, 0, 16);
  const outgoing = id === 'closing' ? 0 : p(f, duration - 16, 16);
  const open = script.scenes[0];
  const close = script.scenes.at(-1)!;
  const Component = components[id];
  return <AbsoluteFill style={{ opacity: id === 'opening' ? 1 : incoming, transform: id === 'opening' || id === 'closing' ? undefined : `translateX(${(1 - incoming) * 90 - outgoing * 65}px) scale(${1 + outgoing * .035})` }}>
    {id === 'opening' && open.kind === 'logo' ? <Opening scene={open} /> : id === 'closing' && close.kind === 'cta' ? <Closing scene={close} /> : <Component/>}
  </AbsoluteFill>;
}
export function EventFilm() {
  let from = 0;
  return <AbsoluteFill style={{ background: c.ink }}>{eventChapters.map(chapter => {
    const start = from; const duration = chapter.seconds * 30; from += duration;
    return <Sequence key={chapter.id} from={start} durationInFrames={duration + (chapter.id === 'closing' ? 0 : 16)}><Chapter id={chapter.id} duration={duration}/></Sequence>;
  })}</AbsoluteFill>;
}
