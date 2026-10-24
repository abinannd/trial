import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react'
import './doodle-chase-experiment.css'

// Keep the source artwork intact. Encoding the filename avoids broken asset URLs
// caused by spaces and the Unicode ellipsis in the uploaded filename.
const VIDEO_FILE = 'Build_cursor_reactive_doodle_ani…_20261025010427 (1) (1).mp4'
const SOURCE = `${import.meta.env.BASE_URL}${encodeURIComponent(VIDEO_FILE)}`

type Point = { x: number; y: number }
const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n))

// Screen coordinates: right = 0°, down = 90°, left = 180°, up = 270°.
// Times select authored poses from the supplied MP4; they do not synthesize new art.
const POSE_TIMES = {
  right: 1.78,
  downRight: 2.75,
  down: 5.92,
  downLeft: 4.72,
  left: 4.15,
  upLeft: 3.55,
  up: 7.72,
  upRight: 1.05,
  neutral: 7.72,
} as const

function poseTime({ x, y }: Point) {
  if (Math.hypot(x, y) < 0.16) return POSE_TIMES.neutral

  const degrees = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360
  if (degrees >= 337.5 || degrees < 22.5) return POSE_TIMES.right
  if (degrees < 67.5) return POSE_TIMES.downRight
  if (degrees < 112.5) return POSE_TIMES.down
  if (degrees < 157.5) return POSE_TIMES.downLeft
  if (degrees < 202.5) return POSE_TIMES.left
  if (degrees < 247.5) return POSE_TIMES.upLeft
  if (degrees < 292.5) return POSE_TIMES.up
  return POSE_TIMES.upRight
}

export function DoodleChaseExperiment({ onBack }: { onBack: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const frameRef = useRef<number | null>(null)
  const targetRef = useRef(POSE_TIMES.neutral)
  const pendingPointRef = useRef<Point>({ x: 0, y: 0 })
  const seekingRef = useRef(false)
  const [ready, setReady] = useState(false)
  const [look, setLook] = useState<Point>({ x: 0, y: 0 })

  const seekLatest = useCallback(() => {
    const video = videoRef.current
    if (!video || !ready || seekingRef.current || video.readyState < HTMLMediaElement.HAVE_METADATA) return

    const target = clamp(targetRef.current, 0, Math.max(0, video.duration - 0.04))
    if (Math.abs(video.currentTime - target) < 0.04) return

    seekingRef.current = true
    try {
      video.currentTime = target
    } catch {
      seekingRef.current = false
    }
  }, [ready])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const loaded = () => {
      video.pause()
      targetRef.current = POSE_TIMES.neutral
      setReady(true)
      try {
        video.currentTime = Math.min(POSE_TIMES.neutral, Math.max(0, video.duration - 0.04))
      } catch {
        // The browser may not permit seeking until media data is available.
      }
    }

    const seeked = () => {
      seekingRef.current = false
      // If the pointer moved during a seek, immediately service the latest target.
      if (Math.abs(video.currentTime - targetRef.current) > 0.12) seekLatest()
    }

    const failed = () => setReady(false)
    video.addEventListener('loadedmetadata', loaded)
    video.addEventListener('seeked', seeked)
    video.addEventListener('error', failed)

    return () => {
      video.removeEventListener('loadedmetadata', loaded)
      video.removeEventListener('seeked', seeked)
      video.removeEventListener('error', failed)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [seekLatest])

  const scheduleTarget = (point: Point) => {
    pendingPointRef.current = point
    targetRef.current = poseTime(point)

    // Coalesce rapid pointer events into one UI update and seek request per frame.
    if (frameRef.current !== null) return
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null
      setLook(pendingPointRef.current)
      seekLatest()
    })
  }

  const updatePointer = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    scheduleTarget({
      x: clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1),
      y: clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1),
    })
  }

  const reset = () => {
    scheduleTarget({ x: 0, y: 0 })
  }

  return (
    <main className="doodle6">
      <header className="doodle6-topbar">
        <button className="back-link" type="button" onClick={onBack}>
          <ArrowLeft size={15} /><span>ALL EXPERIMENTS</span>
        </button>
        <div className="topbar-right">
          <span className="status-dot" /><span className="status-label">EXPERIMENT 006</span>
          <a className="icon-link" href="https://github.com/abinannd/trial" target="_blank" rel="noreferrer" aria-label="View source on GitHub">
            <Github size={17} />
          </a>
        </div>
      </header>

      <section className="doodle6-hero">
        <div className="doodle6-copy">
          <div className="doodle6-kicker"><span /> INTERACTIVE CHARACTER STUDY / 006</div>
          <h1>Not just a doodle.<br /><em>A little alive.</em></h1>
          <p>Move around the scene. The character reacts to your position using the original hand-drawn animation, with its navy atmosphere and crayon texture preserved.</p>
          <div className="doodle6-meta">
            <span><i /> LIVE POINTER RESPONSE</span><span>ORIGINAL MP4 / FRAME SCRUB</span>
          </div>
          <a className="doodle6-link" href="#doodle6-notes">How it works <ArrowUpRight size={15} /></a>
        </div>

        <div className="doodle6-shell">
          <div className="doodle6-label">
            <span>FIG. 06 — DOODLE CHASE</span>
            <span>{ready ? 'LIVE' : 'LOADING'} <i className={ready ? 'ready' : ''} /></span>
          </div>
          <section
            className="doodle6-stage"
            onPointerMove={updatePointer}
            onPointerLeave={reset}
            aria-label="Move the pointer around the scene to make the doodle look in different directions"
          >
            <video
              ref={videoRef}
              className="doodle6-video"
              src={SOURCE}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
            />
            <div className="doodle6-vignette" />
            {!ready && <div className="doodle6-loading">Preparing the doodle…</div>}
            <div className="doodle6-corner top-left" />
            <div className="doodle6-corner bottom-right" />
            <div className="doodle6-caption">
              <span>SUBJECT 006</span><strong>FOLLOW THE FEELING</strong><span>MOVE TO INTERACT ↗</span>
            </div>
          </section>
          <div className="doodle6-coordinates">
            <span>LOOK X / {Math.round(look.x * 100).toString().padStart(3, '0')}</span>
            <span>LOOK Y / {Math.round(look.y * 100).toString().padStart(3, '0')}</span>
            <span>CURSOR IS INPUT ONLY</span>
          </div>
        </div>
      </section>

      <section className="doodle6-notes" id="doodle6-notes">
        <div><span>01 / PRESERVE</span><h2>The original art<br />stays itself.</h2></div>
        <p>This prototype uses the supplied MP4 frames, so it does not redraw the face or invent new features. Pointer direction selects the closest available pose and preserves the source's existing head and body movement. Some directions may be approximate because the video contains a limited set of authored poses.</p>
        <small>FRAME-BASED CHASE</small>
      </section>
    </main>
  )
}
