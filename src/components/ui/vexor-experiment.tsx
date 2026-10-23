import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowLeft, ExternalLink, Github, Laptop, Smartphone, Tablet } from 'lucide-react'
import './vexor-experiment.css'

export function VexorExperiment({ onBack }: { onBack: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [btnText, setBtnText] = useState('Get Free Access')
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'phone'>('desktop')

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (video.readyState >= 2) {
      setVideoLoaded(true)
    } else {
      const handleLoadedData = () => setVideoLoaded(true)
      video.addEventListener('loadeddata', handleLoadedData)
      return () => video.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return

    setBtnText('Securing Access...')
    setTimeout(() => {
      setSubmitted(true)
      setBtnText('Access Reserved ✓')
      setEmail('')

      setTimeout(() => {
        setBtnText('Get Free Access')
      }, 3500)

      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    }, 600)
  }

  return (
    <div className="vexor-experiment-shell">
      {/* Topbar consistent with other interface experiments */}
      <header className="vexor-topbar">
        <button className="back-link" type="button" onClick={onBack}>
          <ArrowLeft size={15} /> <span>ALL EXPERIMENTS</span>
        </button>

        <div className="vexor-topbar-right">
          <div className="vexor-viewport-selector" role="group" aria-label="Reference Frame Preview">
            <button
              type="button"
              className={`vexor-vp-btn ${viewportMode === 'desktop' ? 'is-active' : ''}`}
              onClick={() => setViewportMode('desktop')}
              title="1440 Desktop frame"
            >
              <Laptop size={12} style={{ display: 'inline', marginRight: 4 }} />
              1440
            </button>
            <button
              type="button"
              className={`vexor-vp-btn ${viewportMode === 'tablet' ? 'is-active' : ''}`}
              onClick={() => setViewportMode('tablet')}
              title="768 Tablet frame"
            >
              <Tablet size={12} style={{ display: 'inline', marginRight: 4 }} />
              768
            </button>
            <button
              type="button"
              className={`vexor-vp-btn ${viewportMode === 'phone' ? 'is-active' : ''}`}
              onClick={() => setViewportMode('phone')}
              title="390 Mobile frame"
            >
              <Smartphone size={12} style={{ display: 'inline', marginRight: 4 }} />
              390
            </button>
          </div>

          <a
            className="vexor-raw-link"
            href="/vexor.html"
            target="_blank"
            rel="noreferrer"
            title="Open standalone zero-framework single-file HTML"
          >
            <span>RAW HTML</span>
            <ExternalLink size={12} />
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="vexor-status-dot" />
            <span className="vexor-status-label">EXPERIMENT 005</span>
          </div>

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

      {/* Main interactive stage container */}
      <div
        className={`vexor-stage-container ${
          viewportMode === 'desktop'
            ? 'vp-desktop'
            : viewportMode === 'tablet'
            ? 'vp-tablet-700'
            : 'vp-phone-655'
        }`}
      >
        <main className="vexor-root">
          <div className="vexor-wrap">
            {/* CTA Card (1380 × 340u reference) */}
            <section className="vexor-card" aria-labelledby="vexor-title">
              {/* Animated SVG Border */}
              <svg className="vexor-border-svg" viewBox="0 0 1380 340" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="vexorCardBorderGradReact" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(244, 118, 104, 0.67)" />
                    <stop offset="100%" stopColor="rgba(244, 118, 104, 0.29)" />
                  </linearGradient>
                </defs>
                <rect className="vexor-border-rect" x="1" y="1" width="1378" height="338" rx="20" ry="20" />
              </svg>

              {/* Still plate: Abstract coral, pink and crimson smoke on black */}
              <img
                className="vexor-still-plate"
                src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/03c58212-3a59-4c80-b19d-30d05a174563.webp"
                alt=""
                loading="eager"
                decoding="async"
                aria-hidden="true"
              />

              {/* Loop video: 5s seamless smoke, 80% opacity, cover anchored right bottom */}
              <video
                ref={videoRef}
                className={`vexor-loop-video ${videoLoaded ? 'is-loaded' : ''}`}
                src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/f6f4ec49-d5dd-4893-8eb4-fa0f932aceaf.mp4"
                playsInline
                muted
                autoPlay
                loop
                preload="auto"
                aria-hidden="true"
              />

              {/* Contrast vignette behind copy */}
              <div className="vexor-card-vignette" aria-hidden="true" />

              {/* Content layer */}
              <div className="vexor-card-content">
                <h1 id="vexor-title" className="vexor-headline">
                  Get your Vexor Account
                </h1>
                <p className="vexor-sub">
                  Join 200+ businesses like yours, powering their global<br />transactions with Vexor.
                </p>

                {/* Dark waitlist input with coral button */}
                <form className="vexor-form" onSubmit={handleSubmit}>
                  <div className="vexor-input-pill">
                    <input
                      className="vexor-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email to join the waitlist"
                      aria-label="Enter your email to join the waitlist"
                    />
                    <button className="vexor-submit-btn" type="submit">
                      {btnText}
                    </button>
                  </div>
                  <div className={`vexor-form-toast ${submitted ? 'is-active' : ''}`} role="status">
                    ✓ You're on the priority waitlist.
                  </div>
                </form>
              </div>
            </section>

            {/* Footer with exact layout and copy */}
            <footer className="vexor-footer">
              <div className="vexor-footer-grid">
                {/* Left column: 3-slash "W"-like mark & 4-line paragraph */}
                <div className="vexor-footer-left">
                  <div className="vexor-mark-wrap" aria-label="Vexor mark">
                    <svg
                      className="vexor-mark-svg"
                      viewBox="0 0 36 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id="vexorMarkGradReact" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#FF8A73" />
                          <stop offset="100%" stopColor="#F0605A" />
                        </linearGradient>
                      </defs>
                      <rect x="2" y="2" width="5.5" height="22" rx="2.75" transform="skewX(-24)" fill="#ffffff" />
                      <rect x="14" y="6" width="5.5" height="18" rx="2.75" transform="skewX(-24)" fill="url(#vexorMarkGradReact)" />
                      <rect x="26" y="2" width="5.5" height="22" rx="2.75" transform="skewX(-24)" fill="#ffffff" />
                    </svg>
                    <span className="vexor-brand-text">VEXOR</span>
                  </div>

                  <p className="vexor-footer-copy">
                    Get paid for free from countries in the EU, Asia, and the US. There are no deposit charges. Create an
                    account in your preferred currency and share the details to get paid. We make it easy to go
                    international.
                  </p>
                </div>

                {/* Right column: Contact Us, phone, address */}
                <div className="vexor-footer-right">
                  <div className="vexor-contact-title">Contact Us</div>
                  <a className="vexor-contact-phone" href="tel:+442079460321">
                    +44 20 7946 0321
                  </a>
                  <address className="vexor-contact-address">
                    Vexor Labs Ltd,<br />
                    12 Harbour Row,<br />
                    Bristol BS1 5TT, UK
                  </address>
                </div>
              </div>

              {/* Thin rule: white at 20% */}
              <hr className="vexor-rule" />

              {/* Bottom line: Copyright & email */}
              <div className="vexor-footer-bottom">
                <div className="vexor-copyright">Copyright © Vexor Labs. 2025. All Rights Reserved.</div>
                <div className="vexor-email-box">
                  Email us: <a className="vexor-email-link" href="mailto:hello@vexor.example">hello@vexor.example</a>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
