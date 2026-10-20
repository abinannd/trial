import './cursor-tracking-experiment.css'
import { useState, type PointerEvent } from 'react'
import { ArrowLeft, ArrowUpRight, Github, MoveUpRight } from 'lucide-react'

export function CursorTrackingExperiment({ onBack }: { onBack: () => void }) {
  const [look, setLook] = useState({ x: 0, y: 0 })

  const trackPointer = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    setLook({
      x: Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2)),
      y: Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2)),
    })
  }

  return (
    <main className="cursor-experiment">
      <header className="cursor-topbar">
        <button className="back-link" type="button" onClick={onBack}><ArrowLeft size={15} /> <span>ALL EXPERIMENTS</span></button>
        <div className="topbar-right"><span className="status-dot" /><span className="status-label">EXPERIMENT 002</span><a className="icon-link" href="https://github.com/abinannd/trial" target="_blank" rel="noreferrer" aria-label="View source on GitHub"><Github size={17} /></a></div>
      </header>

      <section className="cursor-hero" onPointerMove={trackPointer} onPointerLeave={() => setLook({ x: 0, y: 0 })}>
        <div className="cursor-hero-copy">
          <div className="cursor-kicker"><span /> INTERACTIVE CHARACTER STUDY / 002</div>
          <h1>Look who's<br /><em>looking back.</em></h1>
          <p>Move your cursor around the scene. The character follows your movement with their eyes and a subtle head tilt — a little digital personality, built for the web.</p>
          <div className="cursor-hero-meta"><span><i /> LIVE POINTER TRACKING</span><span>SVG + REACT</span></div>
          <a className="cursor-scroll-link" href="#cursor-notes">Explore the interaction <ArrowUpRight size={15} /></a>
        </div>

        <div className="character-stage">
          <div className="character-stage-top"><span>FIG. 02 — CURSOR TRACKING</span><span>LIVE <i /></span></div>
          <div className="character-art" aria-label="Animated character that follows the cursor with its eyes">
            <div className="character-glow" />
            <div className="character-crosshair crosshair-one" />
            <div className="character-crosshair crosshair-two" />
            <svg className="character-svg" viewBox="0 0 520 570" role="img" aria-label="Friendly 3D-inspired cartoon character">
              <defs>
                <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffd6b5"/><stop offset=".55" stopColor="#f4b48e"/><stop offset="1" stopColor="#d98165"/></linearGradient>
                <linearGradient id="shirt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8ca75b"/><stop offset="1" stopColor="#40582f"/></linearGradient>
                <linearGradient id="hair" x1="0" y1="0" x2="0.8" y2="1"><stop offset="0" stopColor="#65412f"/><stop offset="1" stopColor="#2b1b19"/></linearGradient>
                <radialGradient id="cheek"><stop offset="0" stopColor="#ee8f86" stopOpacity=".65"/><stop offset="1" stopColor="#ee8f86" stopOpacity="0"/></radialGradient>
                <filter id="softShadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#5b090b" floodOpacity=".3"/></filter>
              </defs>
              <g className="character-body" filter="url(#softShadow)">
                <path d="M115 570 Q124 463 180 435 L340 435 Q397 463 406 570Z" fill="url(#shirt)"/>
                <path d="M208 438 L260 493 L312 438 L294 570 L226 570Z" fill="#d3d9b2"/>
                <path d="M239 463 L260 488 L281 463 L270 570 L250 570Z" fill="#62734a"/>
                <path d="M230 405 L230 461 Q260 492 290 461 L290 405Z" fill="url(#skin)"/>
                <path d="M178 212 Q147 201 147 249 Q147 287 183 292Z" fill="#e99c7c"/>
                <path d="M342 212 Q373 201 373 249 Q373 287 337 292Z" fill="#e99c7c"/>
                <path d="M168 174 Q171 90 260 89 Q349 90 352 174 L348 298 Q337 394 260 420 Q183 394 172 298Z" fill="url(#skin)"/>
                <ellipse cx="192" cy="299" rx="32" ry="19" fill="url(#cheek)"/><ellipse cx="328" cy="299" rx="32" ry="19" fill="url(#cheek)"/>
                <path d="M177 182 Q148 155 170 117 Q183 84 214 92 Q217 59 250 76 Q279 49 299 79 Q335 61 351 103 Q379 122 350 178 L333 151 Q307 138 292 116 Q262 144 215 132 Q199 156 177 182Z" fill="url(#hair)"/>
                <g className="character-eyes">
                  <path d="M187 215 Q212 195 239 215 Q242 242 213 247 Q187 243 187 215Z" fill="#fff9ef"/>
                  <path d="M281 215 Q307 195 333 215 Q333 243 307 247 Q280 242 281 215Z" fill="#fff9ef"/>
                  <ellipse cx={214 + look.x * 8} cy={225 + look.y * 6} rx="10" ry="13" fill="#543b30"/>
                  <ellipse cx={307 + look.x * 8} cy={225 + look.y * 6} rx="10" ry="13" fill="#543b30"/>
                  <ellipse cx={217 + look.x * 8} cy={221 + look.y * 6} rx="3.5" ry="4.5" fill="white"/>
                  <ellipse cx={310 + look.x * 8} cy={221 + look.y * 6} rx="3.5" ry="4.5" fill="white"/>
                  <path d="M184 203 Q210 185 238 202" fill="none" stroke="#55352b" strokeWidth="10" strokeLinecap="round"/>
                  <path d="M282 202 Q307 185 335 203" fill="none" stroke="#55352b" strokeWidth="10" strokeLinecap="round"/>
                </g>
                <path d={`M260 235 Q${250 + look.x * 3} 257 246 271 Q260 281 275 270`} fill="none" stroke="#d68b6e" strokeWidth="6" strokeLinecap="round"/>
                <path d="M231 313 Q260 336 289 313 Q282 348 260 348 Q238 347 231 313Z" fill="#9d4d47"/>
                <path d="M238 316 Q260 329 282 316 Q274 334 260 334 Q246 334 238 316Z" fill="#fff1dc"/>
                <path d="M220 364 Q260 374 300 364" fill="none" stroke="#d68b6e" strokeWidth="3" strokeLinecap="round" opacity=".65"/>
                <circle cx="260" cy="452" r="7" fill="#d9bd75"/><circle cx="260" cy="482" r="7" fill="#d9bd75"/>
              </g>
            </svg>
            <div className="character-caption"><span>SUBJECT 002</span><strong>CURIOUS BY DESIGN</strong><span>MOVE YOUR POINTER ↗</span></div>
          </div>
          <div className="character-stage-bottom"><span>POINTER X / {Math.round(look.x * 100 + 100).toString().padStart(3, '0')}</span><span>POINTER Y / {Math.round(look.y * 100 + 100).toString().padStart(3, '0')}</span></div>
        </div>
      </section>

      <section className="cursor-notes" id="cursor-notes">
        <div><span className="cursor-note-index">01 / INPUT</span><h2>Every movement<br />has a response.</h2></div>
        <p>The eyes track the pointer in real time. The character stays anchored in the composition, so the interaction feels expressive without becoming distracting. This is a lightweight prototype; the same behavior can later drive a rigged 3D model.</p>
        <div className="cursor-note-tag"><MoveUpRight size={16} /><span>BUILT FOR THE HERO</span></div>
      </section>
    </main>
  )
}
