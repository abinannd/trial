import type { CSSProperties } from 'react'
import { ArrowDownRight, ArrowUpRight, AudioLines, CircleHelp, Command, Github, Sparkles } from 'lucide-react'
import { GlyphPortal } from './components/ui/glyph-portal'

const glyphs = ['✳', '⌘', '⟡', '⌬', '⧖', '◈', '⎔', '⌁', '✺', '⟢', '⊹', '⏣']

export default function App() {
  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Glyph Portal home">
          <span className="brand-mark"><Sparkles size={17} /></span>
          <span>GLYPH<span className="brand-light">PORTAL</span></span>
        </a>
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
