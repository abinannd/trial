import { useState, type CSSProperties } from 'react'
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, AudioLines, CircleHelp, Command, Github, Sparkles } from 'lucide-react'
import { GlyphPortal } from './components/ui/glyph-portal'
import { CursorTrackingExperiment } from './components/ui/cursor-tracking-experiment'

const glyphs = ['✳', '⌘', '⟡', '⌬', '⧖', '◈', '⎔', '⌁', '✺', '⟢', '⊹', '⏣']

function IntroPage({ onEnter, onEnterCursor }: { onEnter: () => void; onEnterCursor: () => void }) {
  return (
    <main className="intro-shell">
      <div className="intro-orb intro-orb-one" />
      <div className="intro-orb intro-orb-two" />
      <header className="intro-topbar">
        <a className="brand" href="#intro" aria-label="Intro home">
          <span className="brand-mark"><Sparkles size={17} /></span>
          <span>STUDIO<span className="brand-light"> / EXPERIMENTS</span></span>
        </a>
        <span className="intro-index">INTERFACE STUDY <i /> 001</span>
      </header>

      <section className="intro-content" id="intro">
        <div className="intro-kicker"><span className="eyebrow-line" /> A SMALL COLLECTION OF DIGITAL WORLDS</div>
        <h1 className="intro-heading" aria-label="Heading animation test">
          <span className="heading-line heading-line-one">Heading</span>
          <span className="heading-line heading-line-two">Animation <em>Test.</em></span>
        </h1>
        <p className="intro-subtitle">A first step into motion, atmosphere, and interactive experiments.</p>

        <button className="project-panel" type="button" onClick={onEnter} aria-label="Open Glyph Portal">
          <span className="panel-symbol"><Sparkles size={23} strokeWidth={1.5} /></span>
          <span className="panel-copy">
            <span className="panel-overline">EXPERIMENT 001</span>
            <span className="panel-title">Glyph Portal</span>
            <span className="panel-description">An interactive field of symbols, motion & light.</span>
          </span>
          <span className="panel-arrow"><ArrowRight size={21} strokeWidth={1.7} /></span>
          <span className="panel-edge" />
        </button>

        <button className="project-panel experiment-two-panel" type="button" onClick={onEnterCursor} aria-label="Open cursor tracking experiment">
          <span className="panel-symbol experiment-two-symbol"><span aria-hidden="true" style={{ fontSize: 22, lineHeight: 1 }}>◉</span></span>
          <span className="panel-copy">
            <span className="panel-overline">EXPERIMENT 002</span>
            <span className="panel-title">Cursor Character</span>
            <span className="panel-description">A character that follows your cursor with its eyes.</span>
          </span>
          <span className="panel-arrow"><ArrowRight size={21} strokeWidth={1.7} /></span>
          <span className="panel-edge" />
        </button>

        <div className="intro-bottom-note"><span className="note-pulse" /> SELECT A PROJECT <span className="note-divider" /> ONE EXPERIMENT AVAILABLE</div>
      </section>
      <footer className="intro-footer">
        <span>DESIGNED TO BE EXPLORED</span>
        <span>SCROLL LESS. DISCOVER MORE.</span>
      </footer>
    </main>
  )
}

function GlyphPortalPage({ onBack }: { onBack: () => void }) {
  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <button className="back-link" type="button" onClick={onBack}><ArrowLeft size={15} /> <span>ALL EXPERIMENTS</span></button>
        <div className="topbar-right">
          <span className="status-dot" />
          <span className="status-label">EXPERIMENT 001</span>
          <a className="icon-link" href="https://github.com/abinannd/trial" target="_blank" rel="noreferrer" aria-label="View source on GitHub"><Github size={17} /></a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> AN INTERACTIVE STUDY OF FORM</div>
          <h1>Step through<br />the <span className="gradient-word">unknown.</span></h1>
          <p className="hero-description">A small portal into a world of symbols, motion, and light. Move your cursor. Find your own way through.</p>
          <div className="hero-actions">
            <a className="primary-action" href="#portal">Enter the portal <ArrowUpRight size={16} /></a>
            <span className="micro-note"><AudioLines size={14} /> SOUND NOT REQUIRED</span>
          </div>
        </div>
        <div className="portal-stage" id="portal">
          <div className="stage-topline"><span>FIG. 01 — GLYPH ENGINE</span><span>LIVE RENDER <i /></span></div>
          <GlyphPortal />
          <div className="stage-bottomline"><span>FIELD / 12 SYMBOLS</span><span>MOVE TO INTERACT <ArrowDownRight size={13} /></span></div>
        </div>
      </section>

      <section className="glyph-section">
        <div className="section-heading">
          <div><div className="eyebrow"><span className="eyebrow-line" /> THE SYMBOL FIELD</div><h2>Every shape has<br /><span>a little gravity.</span></h2></div>
          <p>Symbols drift around the threshold. Each one is a tiny mark in a larger, living system.</p>
        </div>
        <div className="glyph-grid">
          {glyphs.map((glyph, i) => <div className="glyph-tile" key={glyph} style={{ '--delay': `${i * -0.37}s` } as CSSProperties}><span>{glyph}</span><small>{String(i + 1).padStart(2, '0')} / GLYPH</small></div>)}
        </div>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><Command size={15} /></span><span>GLYPH<span className="brand-light">PORTAL</span></span></a>
        <span className="footer-note">A STUDY IN MOTION & MEANING</span>
        <a className="help-link" href="https://github.com/abinannd/trial" target="_blank" rel="noreferrer"><CircleHelp size={14} /> ABOUT THIS EXPERIMENT</a>
      </footer>
    </main>
  )
}

export default function App() {
  const [showPortal, setShowPortal] = useState(false)
  const [showCursorExperiment, setShowCursorExperiment] = useState(false)
  if (showCursorExperiment) return <CursorTrackingExperiment onBack={() => setShowCursorExperiment(false)} />
  return showPortal
    ? <GlyphPortalPage onBack={() => setShowPortal(false)} />
    : <IntroPage onEnter={() => setShowPortal(true)} onEnterCursor={() => setShowCursorExperiment(true)} />
}
