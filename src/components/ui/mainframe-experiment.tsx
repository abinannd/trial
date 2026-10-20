import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Copy, Check, Github } from 'lucide-react'
import './mainframe-experiment.css'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4'
const INTRO = "Glad you stopped in. Good taste tends to find us. Now, what are we building?"

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    let index = 0
    let interval = 0
    const delay = window.setTimeout(() => {
      interval = window.setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))
        if (index >= text.length) {
          window.clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, startDelay)
    return () => { window.clearTimeout(delay); window.clearInterval(interval) }
  }, [text, speed, startDelay])
  return { displayed, done }
}

export function MainframeExperiment({ onBack }: { onBack: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const prevX = useRef<number | null>(null)
  const targetTime = useRef(0)
  const seeking = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [actionsVisible, setActionsVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const { displayed, done } = useTypewriter(INTRO)
  useEffect(() => {
    const timer = window.setTimeout(() => setActionsVisible(true), 400)
    return () => window.clearTimeout(timer)
  }, [])
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleMove = (event: MouseEvent) => {
      if (!video.duration || !Number.isFinite(video.duration)) { prevX.current = event.clientX; return }
      if (prevX.current !== null) {
        const delta = event.clientX - prevX.current
        targetTime.current = Math.max(0, Math.min(video.duration, targetTime.current + (delta / window.innerWidth) * 0.8 * video.duration))
        if (!seeking.current && Math.abs(video.currentTime - targetTime.current) > 0.025) {
          seeking.current = true
          try { video.currentTime = targetTime.current } catch { seeking.current = false }
        }
      }
      prevX.current = event.clientX
    }
    const handleSeeked = () => {
      seeking.current = false
      if (Math.abs(video.currentTime - targetTime.current) > 0.04) {
        seeking.current = true
        try { video.currentTime = targetTime.current } catch { seeking.current = false }
      }
    }
    const resetPointer = () => { prevX.current = null }
    video.addEventListener('seeked', handleSeeked)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('blur', resetPointer)
    return () => {
      video.removeEventListener('seeked', handleSeeked)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('blur', resetPointer)
    }
  }, [])
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@mainframe.co')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch { window.location.href = 'mailto:hello@mainframe.co' }
  }
  const links = ['Labs', 'Studio', 'Openings', 'Shop']
  return (
    <main className="mainframe-experiment">
      <video ref={videoRef} className="mainframe-video" muted playsInline preload="auto" aria-hidden="true">
        <source src={VIDEO_URL} type="video/mp4" />
      </video>
      <div className="mainframe-video-shade" />
      <header className="mainframe-nav">
        <button className="mainframe-back" onClick={onBack} aria-label="Back to experiments"><ArrowLeft size={15} /><span>EXPERIMENTS</span></button>
        <a className="mainframe-logo" href="#mainframe-home" aria-label="Mainframe home"><span>Mainframe<sup>(R)</sup></span><b>✳︎</b></a>
        <nav className="mainframe-desktop-links" aria-label="Main navigation">
          {links.map((link, i) => <span key={link}>{i > 0 && <span className="mainframe-comma">, </span>}<a href={link === 'Labs' ? '#mainframe-home' : '#mainframe-contact'}>{link}</a></span>)}
        </nav>
        <a className="mainframe-contact-link" href="mailto:hello@mainframe.co">Get in touch</a>
        <button className={'mainframe-hamburger ' + (menuOpen ? 'is-open' : '')} onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}><span /><span /><span /></button>
      </header>
      <div className={'mainframe-mobile-menu ' + (menuOpen ? 'is-open' : '')} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {links.map(link => <a key={link} href={link === 'Labs' ? '#mainframe-home' : '#mainframe-contact'} onClick={() => setMenuOpen(false)}>{link}</a>)}
          <a href="mailto:hello@mainframe.co" onClick={() => setMenuOpen(false)}>Get in touch ↗</a>
        </nav>
        <span className="mainframe-menu-foot">INDEPENDENT BY DESIGN. CURIOUS BY DEFAULT.</span>
      </div>
      <section className="mainframe-hero" id="mainframe-home">
        <div className="mainframe-copy">
          <p className="mainframe-intro-label">Hey there, meet A.R.I.A,<br />Mainframe's Adaptive Response Interface Agent</p>
          <p className="mainframe-typewriter">{displayed}{!done && <span className="mainframe-caret" aria-hidden="true" />}</p>
          <div className={'mainframe-actions ' + (actionsVisible ? 'is-visible' : '')}>
            <div className="mainframe-pill-row">
              <a className="mainframe-pill" href="mailto:hello@mainframe.co?subject=Pitch%20an%20idea">Pitch us an idea</a>
              <a className="mainframe-pill" href="mailto:hello@mainframe.co?subject=Careers">Come work here</a>
              <a className="mainframe-pill" href="mailto:hello@mainframe.co?subject=Hello">Send a brief hello</a>
              <a className="mainframe-pill" href="#mainframe-contact">See how we operate</a>
            </div>
            <button className="mainframe-email-pill" id="mainframe-contact" onClick={copyEmail}>
              <span>Reach us: <u>hello@mainframe.co</u></span>{copied ? <Check size={13} /> : <Copy size={13} />}
              <span className="mainframe-copy-status" aria-live="polite">{copied ? 'Copied' : ''}</span>
            </button>
          </div>
        </div>
      </section>
      <div className="mainframe-bottomline"><span>EXPERIMENT 003 / MAINFRAME</span><span>MOVE HORIZONTALLY TO SCRUB ↔</span><a href="https://github.com/abinannd/trial" target="_blank" rel="noreferrer" aria-label="View source on GitHub"><Github size={14} /></a></div>
    </main>
  )
}
