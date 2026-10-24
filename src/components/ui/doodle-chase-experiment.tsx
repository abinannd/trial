import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react'
import './doodle-chase-experiment.css'

const SOURCE = `${import.meta.env.BASE_URL}Build_cursor_reactive_doodle_ani…_20261025010427%20(1)%20(1).mp4`
type Point = { x: number; y: number }
const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n))

// The video contains the original doodle artwork. Use the closest authored pose
// rather than redrawing or morphing any facial features.
function poseTime({ x, y }: Point) {
  if (Math.hypot(x, y) < 0.16) return 7.72
  const d = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360
  if (d >= 337.5 || d < 22.5) return 1.78
  if (d < 67.5) return 2.75
  if (d < 112.5) return 5.92
  if (d < 157.5) return 4.72
  if (d < 202.5) return 4.15
  if (d < 247.5) return 3.55
  if (d < 292.5) return 7.72
  return 1.05
}

export function DoodleChaseExperiment({ onBack }: { onBack: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const frameRef = useRef<number | null>(null)
  const targetRef = useRef(7.72)
  const seekingRef = useRef(false)
  const [ready, setReady] = useState(false)
  const [look, setLook] = useState<Point>({ x: 0, y: 0 })

  const seekLatest = useCallback(() => {
    const video = videoRef.current
    if (!video || !ready || seekingRef.current || !Number.isFinite(video.duration)) return
    const target = clamp(targetRef.current, 0, Math.max(0, video.duration - 0.04))
    if (Math.abs(video.currentTime - target) < 0.035) return
    seekingRef.current = true
    try { video.currentTime = target } catch { seekingRef.current = false }
  }, [ready])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const loaded = () => {
      video.pause()
      setReady(true)
      targetRef.current = 7.72
      try { video.currentTime = Math.min(7.72, Math.max(0, video.duration - 0.04)) } catch { /* metadata can arrive before seek is available */ }
    }
    const seeked = () => {
      seekingRef.current = false
      if (Math.abs(video.currentTime - targetRef.current) > 0.12) seekLatest()
    }
    video.addEventListener('loadedmetadata', loaded)
    video.addEventListener('seeked', seeked)
    return () => {
      video.removeEventListener('loadedmetadata', loaded)
      video.removeEventListener('seeked', seeked)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [seekLatest])

  const updatePointer = (event: PointerEvent<HTMLElement>) => {
    const r = event.currentTarget.getBoundingClientRect()
    const point = { x: clamp(((event.clientX - r.left) / r.width - .5) * 2, -1, 1), y: clamp(((event.clientY - r.top) / r.height - .5) * 2, -1, 1) }
    setLook(point)
    targetRef.current = poseTime(point)
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => { frameRef.current = null; seekLatest() })
  }
  const reset = () => {
    setLook({ x: 0, y: 0 })
    targetRef.current = 7.72
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => { frameRef.current = null; seekLatest() })
  }

  return <main className="doodle6">
    <header className="doodle6-topbar">
      <button className="back-link" type="button" onClick={onBack}><ArrowLeft size={15} /><span>ALL EXPERIMENTS</span></button>
      <div className="topbar-right"><span className="status-dot" /><span className="status-label">EXPERIMENT 006</span><a className="icon-link" href="https://github.com/abinannd/trial" target="_blank" rel="noreferrer" aria-label="View source on GitHub"><Github size={17} /></a></div>
    </header>
    <section className="doodle6-hero">
      <div className="doodle6-copy">
        <div className="doodle6-kicker"><span /> INTERACTIVE CHARACTER STUDY / 006</div>
        <h1>Not just a doodle.<br /><em>A little alive.</em></h1>
        <p>Move around the scene. The character reacts to your position using the original hand-drawn animation, with its navy gradient and crayon texture preserved.</p>
        <div className="doodle6-meta"><span><i /> LIVE POINTER RESPONSE</span><span>8-SECOND SOURCE / 24 FPS</span></div>
        <a className="doodle6-link" href="#doodle6-notes">How it works <ArrowUpRight size={15} /></a>
      </div>
      <div className="doodle6-shell">
        <div className="doodle6-label"><span>FIG. 06 — DOODLE CHASE</span><span>{ready ? 'LIVE' : 'LOADING'} <i className={ready ? 'ready' : ''} /></span></div>
        <section className="doodle6-stage" onPointerMove={updatePointer} onPointerLeave={reset} aria-label="Move the pointer around the scene to make the doodle look in different directions">
          <video ref={videoRef} className="doodle6-video" src={SOURCE} muted playsInline preload="auto" aria-hidden="true" />
          <div className="doodle6-vignette" />
          {!ready && <div className="doodle6-loading">Preparing the doodle…</div>}
          <div className="doodle6-corner top-left" /><div className="doodle6-corner bottom-right" />
          <div className="doodle6-caption"><span>SUBJECT 006</span><strong>FOLLOW THE FEELING</strong><span>MOVE TO INTERACT ↗</span></div>
        </section>
        <div className="doodle6-coordinates"><span>LOOK X / {Math.round(look.x * 100).toString().padStart(3, '0')}</span><span>LOOK Y / {Math.round(look.y * 100).toString().padStart(3, '0')}</span><span>CURSOR IS INPUT ONLY</span></div>
      </div>
    </section>
    <section className="doodle6-notes" id="doodle6-notes">
      <div><span>01 / PRESERVE</span><h2>The original art<br />stays itself.</h2></div>
      <p>This prototype uses the supplied MP4 frames, so it does not redraw the face or invent new features. Pointer direction selects the closest available pose. The source has several clear directions, but not a unique authored pose for every point on a full 360° circle.</p>
      <small>FRAME-BASED CHASE</small>
    </section>
  </main>
}
