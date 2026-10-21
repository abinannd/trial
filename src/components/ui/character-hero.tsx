import { useEffect, useRef, useState } from 'react'
import './character-hero.css'
const HERO_COPY = "Glad you stopped in. Good taste tends to find us. Now, what are we building?"
function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    let intervalId: number | undefined
    const delayId = window.setTimeout(() => {
      let index = 0
      intervalId = window.setInterval(() => {
        index += 1; setDisplayed(text.slice(0, index))
        if (index >= text.length) { if (intervalId !== undefined) window.clearInterval(intervalId); setDone(true) }
      }, speed)
    }, startDelay)
    return () => { window.clearTimeout(delayId); if (intervalId !== undefined) window.clearInterval(intervalId) }
  }, [text, speed, startDelay])
  return { displayed, done }
}
function CopyIcon() {
  return <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="3.5" y="1.5" width="7" height="8" rx=".7" stroke="currentColor" /><path d="M1.5 3.5v7h6" stroke="currentColor" strokeLinecap="round" /></svg>
}
export function CharacterHeroExperiment({ onBack }: { onBack: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetTimeRef = useRef(0)
  const seekingRef = useRef(false)
  const prevXRef = useRef<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [actionsVisible, setActionsVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const { displayed, done } = useTypewriter(HERO_COPY)
  useEffect(() => { const timer = window.setTimeout(() => setActionsVisible(true), 400); return () => window.clearTimeout(timer) }, [])
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const seekToTarget = () => {
      if (!video.duration || !Number.isFinite(video.duration) || seekingRef.current) return
      const target = Math.max(0, Math.min(video.duration, targetTimeRef.current))
      if (Math.abs(video.currentTime - target) < 0.015) return
      seekingRef.current = true
      try { video.currentTime = target } catch { seekingRef.current = false }
    }
    const onSeeked = () => { seekingRef.current = false; seekToTarget() }
    const onMetadata = () => { targetTimeRef.current = Math.max(0, Math.min(video.duration || 0, video.currentTime || 0)) }
    const onMouseMove = (event: MouseEvent) => {
      if (prevXRef.current === null) { prevXRef.current = event.clientX; return }
      const delta = event.clientX - prevXRef.current
      prevXRef.current = event.clientX
      if (!video.duration || !Number.isFinite(video.duration)) return
      targetTimeRef.current = Math.max(0, Math.min(video.duration, targetTimeRef.current + (delta / Math.max(window.innerWidth, 1)) * 0.8 * video.duration))
      seekToTarget()
    }
    video.addEventListener('seeked', onSeeked); video.addEventListener('loadedmetadata', onMetadata); window.addEventListener('mousemove', onMouseMove)
    return () => { video.removeEventListener('seeked', onSeeked); video.removeEventListener('loadedmetadata', onMetadata); window.removeEventListener('mousemove', onMouseMove) }
  }, [])
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText('hello@mainframe.co'); setCopied(true); window.setTimeout(() => setCopied(false), 1500) }
    catch { window.location.href = 'mailto:hello@mainframe.co' }
  }
  const closeMenu = () => setMenuOpen(false)
  return <main className="character-hero">
    <video ref={videoRef} className="mainframe-background-video" muted playsInline preload="auto" aria-hidden="true"><source src="/mainframe-character.mp4" type="video/mp4" /></video>
    <div className="mainframe-video-shade" aria-hidden="true" />
    <header className="mainframe-nav">
      <button className="character-back mainframe-back" onClick={onBack} aria-label="Back to all experiments">← <span>ALL EXPERIMENTS</span></button>
      <a className="mainframe-logo" href="#mainframe-home" aria-label="Mainframe home"><span>Mainframe®</span><span className="mainframe-logo-star" aria-hidden="true">✳︎</span></a>
      <nav className="mainframe-desktop-links" aria-label="Main navigation"><a href="#labs">Labs</a><span>, </span><a href="#studio">Studio</a><span>, </span><a href="#openings">Openings</a><span>, </span><a href="#shop">Shop</a></nav>
      <a className="mainframe-contact-desktop" href="mailto:hello@mainframe.co">Get in touch</a>
      <button className={'mainframe-menu-button ' + (menuOpen ? 'is-open' : '')} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}><span /><span /><span /></button>
    </header>
    <div className={'mainframe-mobile-overlay ' + (menuOpen ? 'is-open' : '')} aria-hidden={!menuOpen}><nav aria-label="Mobile navigation"><a href="#labs" onClick={closeMenu}>Labs</a><a href="#studio" onClick={closeMenu}>Studio</a><a href="#openings" onClick={closeMenu}>Openings</a><a href="#shop" onClick={closeMenu}>Shop</a><a className="mobile-contact-link" href="mailto:hello@mainframe.co" onClick={closeMenu}>Get in touch</a></nav></div>
    <section className="mainframe-hero" id="mainframe-home"><div className="mainframe-hero-content">
      <p className="mainframe-intro-label">Hey there, meet A.R.I.A,<br />Mainframe's Adaptive Response Interface Agent</p>
      <p className="mainframe-typewriter" aria-live="polite">{displayed}{!done && <span className="mainframe-type-cursor" aria-hidden="true" />}</p>
      <div className={'mainframe-actions ' + (actionsVisible ? 'is-visible' : '')}><div className="mainframe-action-pills">
        <a href="mailto:hello@mainframe.co?subject=Pitch%20us%20an%20idea" className="mainframe-pill">Pitch us an idea</a>
        <a href="mailto:hello@mainframe.co?subject=Come%20work%20here" className="mainframe-pill">Come work here</a>
        <a href="mailto:hello@mainframe.co?subject=Send%20a%20brief%20hello" className="mainframe-pill">Send a brief hello</a>
        <a href="#studio" className="mainframe-pill">See how we operate</a>
      </div><button className="mainframe-pill mainframe-email-pill" onClick={copyEmail}><span>Reach us: <span className="mainframe-email-text">{copied ? 'Email copied!' : 'hello@mainframe.co'}</span></span><CopyIcon /></button></div>
    </div></section>
  </main>
}
