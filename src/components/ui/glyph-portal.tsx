import { useEffect, useRef } from 'react'

type Glyph = { char: string; x: number; y: number; size: number; phase: number; radius: number }

const SYMBOLS = ['✳', '⌘', '⟡', '⌬', '⧖', '◈', '⎔', '⌁', '✺', '⟢', '⊹', '⏣', '⧫', '⌖', '⟐', '⟁']

export function GlyphPortal() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointer = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let frame = 0
    let width = 0
    let height = 0
    let dpr = 1

    const glyphs: Glyph[] = SYMBOLS.map((char, i) => ({
      char,
      x: 0.12 + ((i * 0.61803398875) % 0.76),
      y: 0.12 + ((i * 0.38196601125) % 0.76),
      size: 12 + (i % 4) * 4,
      phase: i * 1.71,
      radius: 22 + (i % 5) * 10,
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      const cx = width / 2
      const cy = height / 2
      const scale = Math.min(width, height) / 340
      const t = time * 0.00022

      // Concentric orbital paths
      for (let i = 0; i < 7; i++) {
        const r = (48 + i * 19) * scale
        ctx.beginPath()
        ctx.ellipse(cx, cy, r * 0.82, r * 1.08, t * (i % 2 ? 1 : -1) * 0.22, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(126, 135, 255, ${0.16 - i * 0.014})`
        ctx.lineWidth = i === 0 ? 1.1 : 0.65
        ctx.stroke()
      }

      // Fine radial threads
      for (let i = 0; i < 44; i++) {
        const a = (i / 44) * Math.PI * 2 + t * 0.16
        const inner = 58 * scale
        const outer = (120 + 13 * Math.sin(t * 2 + i)) * scale
        ctx.beginPath()
        ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner)
        ctx.lineTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer)
        ctx.strokeStyle = `rgba(115, 130, 255, ${0.07 + 0.07 * (0.5 + 0.5 * Math.sin(t + i))})`
        ctx.lineWidth = 0.7
        ctx.stroke()
      }

      // Luminous core
      const glow = ctx.createRadialGradient(cx, cy, 2, cx, cy, 92 * scale)
      glow.addColorStop(0, 'rgba(157, 133, 255, 0.26)')
      glow.addColorStop(0.35, 'rgba(92, 92, 255, 0.12)')
      glow.addColorStop(1, 'rgba(92, 92, 255, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      // Central portal
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(-t * 0.24)
      ctx.beginPath()
      ctx.ellipse(0, 0, 35 * scale, 54 * scale, 0, 0, Math.PI * 2)
      const portalGlow = ctx.createRadialGradient(0, 0, 1, 0, 0, 58 * scale)
      portalGlow.addColorStop(0, 'rgba(175, 164, 255, 0.36)')
      portalGlow.addColorStop(0.5, 'rgba(113, 100, 255, 0.16)')
      portalGlow.addColorStop(1, 'rgba(113, 100, 255, 0)')
      ctx.fillStyle = portalGlow
      ctx.fill()
      ctx.strokeStyle = 'rgba(188, 183, 255, 0.88)'
      ctx.lineWidth = 1.5
      ctx.shadowColor = '#8880ff'
      ctx.shadowBlur = 20
      ctx.stroke()
      ctx.restore()

      // Floating glyphs respond gently to the pointer
      glyphs.forEach((g, i) => {
        const a = t * (i % 2 ? 0.65 : -0.45) + g.phase
        const orbit = g.radius * scale
        let x = cx + Math.cos(a) * (orbit + 45 * scale) + (g.x - 0.5) * width * 0.26
        let y = cy + Math.sin(a * 0.8) * (orbit + 34 * scale) + (g.y - 0.5) * height * 0.24
        if (pointer.current.active) {
          const dx = x - pointer.current.x
          const dy = y - pointer.current.y
          const dist = Math.hypot(dx, dy)
          if (dist < 100) {
            const force = (100 - dist) / 100
            x += (dx / (dist || 1)) * force * 22
            y += (dy / (dist || 1)) * force * 22
          }
        }
        const alpha = 0.38 + 0.35 * (0.5 + 0.5 * Math.sin(t * 2 + g.phase))
        ctx.font = `${g.size * scale + 5}px ui-monospace, monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = `rgba(204, 202, 255, ${alpha})`
        ctx.shadowColor = '#7772ff'
        ctx.shadowBlur = 9
        ctx.fillText(g.char, x, y)
        ctx.shadowBlur = 0
        ctx.beginPath()
        ctx.arc(x, y + 15 * scale, 1.1, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(139, 146, 255, 0.72)'
        ctx.fill()
      })

      // Pointer halo
      if (pointer.current.active) {
        const p = pointer.current
        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 72)
        halo.addColorStop(0, 'rgba(155, 147, 255, 0.12)')
        halo.addColorStop(1, 'rgba(155, 147, 255, 0)')
        ctx.fillStyle = halo
        ctx.fillRect(p.x - 72, p.y - 72, 144, 144)
      }

      frame = window.requestAnimationFrame(draw)
    }

    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.current = { x: event.clientX - rect.left, y: event.clientY - rect.top, active: true }
    }
    const leave = () => { pointer.current.active = false }
    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerleave', leave)
    frame = window.requestAnimationFrame(draw)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div className="glyph-portal" aria-label="Animated field of glowing glyphs">
      <div className="portal-vignette" />
      <canvas ref={canvasRef} />
      <div className="portal-center-label"><span className="center-symbol">⟡</span><span>THRESHOLD</span><small>36° 18′ 09″</small></div>
      <div className="portal-coordinate coordinate-a">X / 048.22</div>
      <div className="portal-coordinate coordinate-b">Y / 102.08</div>
    </div>
  )
}
