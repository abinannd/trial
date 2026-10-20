import { useEffect, useState, type CSSProperties } from 'react'
import { ArrowLeft, ArrowUpRight, Copy } from 'lucide-react'
import './character-hero.css'

export function CharacterHeroExperiment({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(false)
  const [pointer, setPointer] = useState({ x: 50, y: 50 })
  useEffect(() => {
    const move = (event: MouseEvent) => setPointer({ x: event.clientX / window.innerWidth * 100, y: event.clientY / window.innerHeight * 100 })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hello@mainframe.co')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch { window.location.href = 'mailto:hello@mainframe.co' }
  }
  return <main className="character-hero" style={{ '--pointer-x': pointer.x + '%', '--pointer-y': pointer.y + '%' } as CSSProperties}>
    <div className="character-grain" />
    <header className="character-nav">
      <button className="character-back" onClick={onBack}><ArrowLeft size={15} /> ALL EXPERIMENTS</button>
      <a className="character-brand" href="#character-home">little<span>big</span>studio<span className="character-brand-star">✳</span></a>
      <a className="character-nav-contact" href="mailto:hello@mainframe.co">LET'S TALK <ArrowUpRight size={14} /></a>
    </header>
    <section className="character-main" id="character-home">
      <div className="character-copy">
        <p className="character-eyebrow"><span /> EXPERIMENT 004 — CHARACTER STUDY</p>
        <h1>Big ideas.<br /><em>Little</em> guy.</h1>
        <p className="character-description">A little character with a big point of view. Built for curious minds, bold ideas, and things that refuse to look ordinary.</p>
        <div className="character-actions">
          <a href="mailto:hello@mainframe.co?subject=Let%27s%20build%20something" className="character-primary">Let's build something <ArrowUpRight size={16} /></a>
          <button className="character-copy-email" onClick={copyEmail}><span>{copied ? 'Email copied!' : 'hello@mainframe.co'}</span>{copied ? <span>✓</span> : <Copy size={13} />}</button>
        </div>
        <div className="character-note"><span>01</span><i /> SMALL IN SIZE. BIG ON PERSONALITY.</div>
      </div>
      <div className="character-art" aria-label="Full-body stylized character wearing a black jacket against an orange background">
        <div className="character-orbit orbit-one" /><div className="character-orbit orbit-two" />
        <div className="character-art-tag tag-top">FIG. 004 <span>THE ORIGINAL</span></div>
        <img src="/mainframe-character.jpg" alt="Stylized full-body character with voluminous dark hair, black jacket, cargo pants and sneakers" />
        <div className="character-sticker">VERY<br />SERIOUS<br /><b>™</b></div>
        <div className="character-art-foot"><span>CHARACTER / 001</span><span>100% GOOD ENERGY ↗</span></div>
      </div>
    </section>
    <footer className="character-footer"><span>INDEPENDENT BY DESIGN.</span><span>MADE FOR THE CURIOUS.</span><span>SCROLL TO EXPLORE ↓</span></footer>
  </main>
}
