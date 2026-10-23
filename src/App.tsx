import { useState, type CSSProperties } from 'react'
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  CircleHelp,
  Command,
  Github,
  Sparkles,
} from 'lucide-react'
import { GlyphPortal } from './components/ui/glyph-portal'
import { CursorTrackingExperiment } from './components/ui/cursor-tracking-experiment'
import { MainframeExperiment } from './components/ui/mainframe-experiment'
import { CharacterHeroExperiment } from './components/ui/character-hero'
import { VexorExperiment } from './components/ui/vexor-experiment'

const glyphs = ['✳', '⌘', '⟡', '⌬', '⧖', '◈', '⎔', '⌁', '✺', '⟢', '⊹', '⏣']

function IntroPage({
  onEnter,
  onEnterCursor,
  onEnterMainframe,
  onEnterCharacter,
  onEnterVexor,
}: {
  onEnter: () => void
  onEnterCursor: () => void
  onEnterMainframe: () => void
  onEnterCharacter: () => void
  onEnterVexor: () => void
}) {
  return (
    <main className="intro-shell">
      <div className="intro-orb intro-orb-one" />
      <div className="intro-orb intro-orb-two" />

      <header className="intro-topbar">
        <a className="brand" href="#intro" aria-label="Intro home">
          <span className="brand-mark">
            <Sparkles size={17} />
          </span>
          <span>
            STUDIO<span className="brand-light"> / EXPERIMENTS</span>
          </span>
        </a>
        <span className="intro-index">
          INTERFACE STUDY <i /> 001
        </span>
      </header>

      <section className="intro-content" id="intro">
        <div className="intro-kicker">
          <span className="eyebrow-line" /> A SMALL COLLECTION OF DIGITAL WORLDS
        </div>

        <h1 className="intro-heading" aria-label="Heading animation test">
          <span className="heading-line heading-line-one">Heading</span>
          <span className="heading-line heading-line-two">
            Animation <em>Test.</em>
          </span>
        </h1>

        <p className="intro-subtitle">A first step into motion, atmosphere, and interactive experiments.</p>

        {/* Experiment 001: Glyph Portal */}
        <button className="project-panel" type="button" onClick={onEnter} aria-label="Open Glyph Portal">
          <span className="panel-symbol">
            <Sparkles size={23} strokeWidth={1.5} />
          </span>
          <span className="panel-copy">
            <span className="panel-overline">EXPERIMENT 001</span>
            <span className="panel-title">Glyph Portal</span>
            <span className="panel-description">An interactive field of symbols, motion & light.</span>
          </span>
          <span className="panel-arrow">
            <ArrowRight size={21} strokeWidth={1.7} />
          </span>
          <span className="panel-edge" />
        </button>

        {/* Experiment 002: Cursor Character */}
        <button
          className="project-panel experiment-two-panel"
          type="button"
          onClick={onEnterCursor}
          aria-label="Open cursor tracking experiment"
        >
          <span className="panel-symbol experiment-two-symbol">
            <span aria-hidden="true" style={{ fontSize: 22, lineHeight: 1 }}>
              ◉
            </span>
          </span>
          <span className="panel-copy">
            <span className="panel-overline">EXPERIMENT 002</span>
            <span className="panel-title">Cursor Character</span>
            <span className="panel-description">A character that follows your cursor with its eyes.</span>
          </span>
          <span className="panel-arrow">
            <ArrowRight size={21} strokeWidth={1.7} />
          </span>
          <span className="panel-edge" />
        </button>

        {/* Experiment 003: Mainframe */}
        <button
          className="project-panel experiment-three-panel"
          type="button"
          onClick={onEnterMainframe}
          aria-label="Open Mainframe hero experiment"
        >
          <span className="panel-symbol">
            <span aria-hidden="true" style={{ fontSize: 25, lineHeight: 1 }}>
              ✳
            </span>
          </span>
          <span className="panel-copy">
            <span className="panel-overline">EXPERIMENT 003</span>
            <span className="panel-title">Mainframe</span>
            <span className="panel-description">A video-scrubbed creative agency landing page.</span>
          </span>
          <span className="panel-arrow">
            <ArrowRight size={21} strokeWidth={1.7} />
          </span>
          <span className="panel-edge" />
        </button>

        {/* Experiment 004: Character Hero */}
        <button
          className="project-panel experiment-four-panel"
          type="button"
          onClick={onEnterCharacter}
          aria-label="Open character hero experiment"
        >
          <span className="panel-symbol experiment-four-symbol">
            <span aria-hidden="true" style={{ fontSize: 25, lineHeight: 1 }}>
              ☺
            </span>
          </span>
          <span className="panel-copy">
            <span className="panel-overline">EXPERIMENT 004</span>
            <span className="panel-title">Big Ideas, Little Guy</span>
            <span className="panel-description">A character-led orange hero with playful motion.</span>
          </span>
          <span className="panel-arrow">
            <ArrowRight size={21} strokeWidth={1.7} />
          </span>
          <span className="panel-edge" />
        </button>

        {/* Experiment 005: Vexor Signup CTA & Footer */}
        <button
          className="project-panel experiment-five-panel"
          type="button"
          onClick={onEnterVexor}
          aria-label="Open Vexor payments CTA experiment"
        >
          <span className="panel-symbol experiment-five-symbol">
            <svg width="24" height="18" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="2" y="2" width="5.5" height="22" rx="2.75" transform="skewX(-24)" fill="currentColor" />
              <rect x="14" y="6" width="5.5" height="18" rx="2.75" transform="skewX(-24)" fill="#ffffff" />
              <rect x="26" y="2" width="5.5" height="22" rx="2.75" transform="skewX(-24)" fill="currentColor" />
            </svg>
          </span>
          <span className="panel-copy">
            <span className="panel-overline" style={{ color: '#ff8a73' }}>
              EXPERIMENT 005
            </span>
            <span className="panel-title">Vexor Payments</span>
            <span className="panel-description">Swirling coral smoke signup CTA with minimal footer.</span>
          </span>
          <span className="panel-arrow">
            <ArrowRight size={21} strokeWidth={1.7} />
          </span>
          <span className="panel-edge" />
        </button>

        <div className="intro-bottom-note">
          <span className="note-pulse" /> SELECT A PROJECT <span className="note-divider" /> FIVE EXPERIMENTS AVAILABLE
        </div>
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
        <button className="back-link" type="button" onClick={onBack}>
          <ArrowLeft size={15} /> <span>ALL EXPERIMENTS</span>
        </button>
        <div className="topbar-right">
          <span className="status-dot" />
          <span className="status-label">EXPERIMENT 001</span>
          <a
            className="icon-link"
            href="https://github.com/abinannd/trial"
            target="_blank"
            rel="noreferrer"
            aria-label="View source on GitHub"
          >
            <Github size={17} />
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" /> AN INTERACTIVE STUDY OF FORM
          </div>
          <h1>
            Step through
            <br />
            the <span className="gradient-word">unknown.</span>
          </h1>
          <p className="hero-description">
            A small portal into a world of symbols, motion, and light. Move your cursor. Find your own way through.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#portal">
              Enter the portal <ArrowUpRight size={16} />
            </a>
            <span className="micro-note">
              <AudioLines size={14} /> SOUND NOT REQUIRED
            </span>
          </div>
        </div>

        <div className="portal-stage" id="portal">
          <div className="stage-topline">
            <span>FIG. 01 — GLYPH ENGINE</span>
            <span>
              LIVE RENDER <i />
            </span>
          </div>
          <GlyphPortal />
          <div className="stage-bottomline">
            <span>FIELD / 12 SYMBOLS</span>
            <span>
              MOVE TO INTERACT <ArrowDownRight size={13} />
            </span>
          </div>
        </div>
      </section>

      <section className="glyph-section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" /> THE SYMBOL FIELD
            </div>
            <h2>
              Every shape has
              <br />
              <span>a little gravity.</span>
            </h2>
          </div>
          <p>Symbols drift around the threshold. Each one is a tiny mark in a larger, living system.</p>
        </div>

        <div className="glyph-grid">
          {glyphs.map((glyph, i) => (
            <div className="glyph-tile" key={glyph} style={{ '--delay': `${i * -0.37}s` } as CSSProperties}>
              <span>{glyph}</span>
              <small>{String(i + 1).padStart(2, '0')} / GLYPH</small>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark">
            <Command size={15} />
          </span>
          <span>
            GLYPH<span className="brand-light">PORTAL</span>
          </span>
        </a>
        <span className="footer-note">A STUDY IN MOTION & MEANING</span>
        <a className="help-link" href="https://github.com/abinannd/trial" target="_blank" rel="noreferrer">
          <CircleHelp size={14} /> ABOUT THIS EXPERIMENT
        </a>
      </footer>
    </main>
  )
}

export default function App() {
  const [showPortal, setShowPortal] = useState(false)
  const [showCursorExperiment, setShowCursorExperiment] = useState(false)
  const [showMainframe, setShowMainframe] = useState(false)
  const [showCharacter, setShowCharacter] = useState(false)
  const [showVexor, setShowVexor] = useState(false)

  // Support direct deep linking via URL hash
  useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#vexor' || hash === '#experiment-5' || hash === '#005') {
        setShowVexor(true)
      } else if (hash === '#mainframe' || hash === '#003') {
        setShowMainframe(true)
      } else if (hash === '#character' || hash === '#004') {
        setShowCharacter(true)
      } else if (hash === '#cursor' || hash === '#002') {
        setShowCursorExperiment(true)
      } else if (hash === '#portal' || hash === '#001') {
        setShowPortal(true)
      }
    }
  })

  const resetAll = () => {
    setShowVexor(false)
    setShowCharacter(false)
    setShowMainframe(false)
    setShowCursorExperiment(false)
    setShowPortal(false)
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }

  if (showVexor) return <VexorExperiment onBack={resetAll} />
  if (showCharacter) return <CharacterHeroExperiment onBack={resetAll} />
  if (showMainframe) return <MainframeExperiment onBack={resetAll} />
  if (showCursorExperiment) return <CursorTrackingExperiment onBack={resetAll} />
  if (showPortal) return <GlyphPortalPage onBack={resetAll} />

  return (
    <IntroPage
      onEnter={() => setShowPortal(true)}
      onEnterCursor={() => setShowCursorExperiment(true)}
      onEnterMainframe={() => setShowMainframe(true)}
      onEnterCharacter={() => setShowCharacter(true)}
      onEnterVexor={() => {
        window.location.hash = 'vexor'
        setShowVexor(true)
      }}
    />
  )
}
