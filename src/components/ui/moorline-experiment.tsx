import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, ArrowLeft, Github } from 'lucide-react'
import './moorline-experiment.css'

type Dot = { x:number; y:number; z:number; depth:number; phase:number; size:number }
function ParticleTree({ morph }: { morph:number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const pointer = useRef({x:0,y:0,active:false})
  const morphRef = useRef(morph); morphRef.current = morph
  useEffect(() => {
    const canvas=ref.current, ctx=canvas?.getContext('2d',{alpha:false})
    if(!canvas||!ctx)return
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr=Math.min(devicePixelRatio||1,1.5), dots:Dot[]=[]
    let w=1,h=1,raf=0,frame=0,last=0
    const rand=(a:number,b:number)=>a+Math.random()*(b-a)
    const limbs:Array<{x:number;y:number;X:number;Y:number;d:number}>=[]
    const grow=(x:number,y:number,a:number,len:number,d:number)=>{
      if(d>8||len<.008)return
      const X=x+Math.sin(a)*len,Y=y-Math.cos(a)*len
      limbs.push({x,y,X,Y,d})
      const spread=d<2?.55:.67
      grow(X,Y,a-spread+rand(-.12,.12),len*rand(.68,.79),d+1)
      grow(X,Y,a+spread+rand(-.12,.12),len*rand(.68,.79),d+1)
      if(d<4&&Math.random()>.24)grow(X,Y,a+rand(-.2,.2),len*.68,d+1)
    }
    grow(0,0,0,1,0)
    for(let i=0;i<1850;i++){
      const b=limbs[Math.floor(Math.random()*limbs.length)],q=Math.random()
      dots.push({x:b.x+(b.X-b.x)*q,y:b.y+(b.Y-b.y)*q,z:rand(-1,1),depth:b.d,phase:rand(0,6.28),size:rand(.45,b.d<3?1.7:1.2)})
    }
    const resize=()=>{const r=canvas.getBoundingClientRect();w=Math.max(1,r.width);h=Math.max(1,r.height);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}
    resize();const ro=new ResizeObserver(resize);ro.observe(canvas)
    const draw=(now:number)=>{
      if(reduced&&frame>1)return
      if(now-last<15){raf=requestAnimationFrame(draw);return}
      last=now;frame++;const t=reduced?0:now*.00022
      ctx.fillStyle='#01040a';ctx.fillRect(0,0,w,h)
      const cx=w*(.5+pointer.current.x*.025),ground=h*.68,scale=Math.min(w*.39,h*.43),m=Math.max(0,Math.min(1,morphRef.current))
      const glow=ctx.createRadialGradient(cx,ground-scale*.62,2,cx,ground-scale*.55,scale*1.65)
      glow.addColorStop(0,'rgba(18,105,255,.18)');glow.addColorStop(.5,'rgba(10,54,140,.08)');glow.addColorStop(1,'rgba(1,4,10,0)')
      ctx.fillStyle=glow;ctx.fillRect(0,0,w,h)
      dots.forEach((p,i)=>{
        const tx=p.x*scale,ty=p.y*scale,cx2=(Math.sin(i*12.9898)*.5+Math.cos(i*3.17)*.5)*scale*.58,cy2=(Math.sin(i*7.77)*.5+Math.cos(i*5.23)*.5)*scale*.58
        const sway=Math.sin(t*(.4+(i%9)*.11)+p.phase)*(1+p.depth*.18)
        let x=cx+(tx+p.z*scale*.14)*(1-m)+(cx2+p.z*scale*.28)*m+sway,y=ground+ty*(1-m)+cy2*m
        const dx=x-(cx+pointer.current.x*w*.19),dy=y-(ground-pointer.current.y*h*.19),dist=Math.hypot(dx,dy)
        if(pointer.current.active&&dist<100){const f=(100-dist)/100;x+=dx/(dist||1)*f*25;y+=dy/(dist||1)*f*25}
        const alpha=(.42+.58*Math.abs(Math.sin(t*3+p.phase)))*(.38+(8-p.depth)*.075)
        ctx.fillStyle=p.depth<3?`rgba(72,174,255,${alpha})`:`rgba(30,125,255,${alpha})`
        ctx.beginPath();ctx.arc(x,y,p.size*(1-m*.22),0,Math.PI*2);ctx.fill()
        if(i%18===0){ctx.strokeStyle=`rgba(29,130,255,${alpha*.13})`;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+sway*3,y-6);ctx.stroke()}
      })
      const water=ctx.createLinearGradient(0,ground,0,h);water.addColorStop(0,'rgba(5,25,55,.36)');water.addColorStop(1,'rgba(1,4,10,.98)')
      ctx.fillStyle=water;ctx.fillRect(0,ground,w,h-ground)
      for(let ring=0;ring<13;ring++){
        const yy=ground+7+ring*ring*1.65;if(yy>h)break
        ctx.beginPath()
        for(let x=cx-scale*1.2;x<=cx+scale*1.2;x+=4){const y=yy+Math.sin(x*.018+t*5+ring*.55)*(1.5+ring*.08)+Math.sin(x*.042-t*2)*1.1;if(x===cx-scale*1.2)ctx.moveTo(x,y);else ctx.lineTo(x,y)}
        ctx.strokeStyle=`rgba(22,112,255,${.15*(1-ring/14)})`;ctx.lineWidth=.7;ctx.stroke()
      }
      for(let i=0;i<dots.length;i+=2){const p=dots[i],x=cx+p.x*scale*(1-m)+Math.sin(i*.3)*scale*.5*m,y=ground+5+Math.abs(p.y*scale)*.38;if(y<h&&Math.abs(x-cx)<scale*1.2){ctx.fillStyle='rgba(24,116,255,.09)';ctx.fillRect(x,y+Math.sin(x*.025+t*4+p.phase)*2,p.size*2.5,.8)}}
      if(!reduced)raf=requestAnimationFrame(draw)
    }
    raf=requestAnimationFrame(draw)
    const move=(e:PointerEvent)=>{const r=canvas.getBoundingClientRect();pointer.current={x:((e.clientX-r.left)/r.width-.5)*2,y:((e.clientY-r.top)/r.height-.5)*2,active:true}}
    const leave=()=>{pointer.current.active=false}
    canvas.addEventListener('pointermove',move,{passive:true});canvas.addEventListener('pointerleave',leave,{passive:true})
    return()=>{cancelAnimationFrame(raf);ro.disconnect();canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerleave',leave)}
  },[])
  return <canvas ref={ref} className="moorline-canvas" aria-label="Interactive blue particle tree above rippling water"/>
}
const features=[
  {n:'01',tag:'PARTICLE SYSTEM',title:'Intelligence with presence',copy:'A living structure made from thousands of points of light.'},
  {n:'02',tag:'CONNECTED BY DESIGN',title:'Streamlined operations',copy:'Every element finds its place inside a single, coherent system.'},
  {n:'03',tag:'ADAPTIVE INTERFACE',title:'Clarity in motion',copy:'Complexity folds into form. Signals become a system you can see.'},
  {n:'04',tag:'GENERATIVE DESIGN',title:'Built for the next layer',copy:'An interface that changes shape as you move through it.'},
]
export function MoorlineExperiment({onBack}:{onBack:()=>void}){
  const [morph,setMorph]=useState(0)
  useEffect(()=>{const update=()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);setMorph(Math.max(0,Math.min(1,scrollY/max*2.3)))};update();addEventListener('scroll',update,{passive:true});addEventListener('resize',update);return()=>{removeEventListener('scroll',update);removeEventListener('resize',update)}},[])
  return <main className="moorline-page">
    <section className="moorline-hero"><ParticleTree morph={morph}/>
      <nav className="moorline-nav"><button className="moorline-back" onClick={onBack}><ArrowLeft size={15}/> ALL EXPERIMENTS</button><a className="moorline-wordmark" href="#moorline-top"><span className="moorline-mark">M</span> MOORLINE<span className="moorline-version"> / 007</span></a><a className="moorline-source" href="https://uberdesigner.ai/t/moorline" target="_blank" rel="noreferrer"><Github size={15}/> REFERENCE</a></nav>
      <div className="moorline-hero-copy" id="moorline-top"><div className="moorline-eyebrow"><span/> INTELLIGENCE, IN A LIVING FORM</div><h1>Make complexity<br/><em>feel natural.</em></h1><p>A study in living systems, luminous particles, and interfaces that move like the world around them.</p><a href="#moorline-details" className="moorline-cta">Explore the system <ArrowUpRight size={16}/></a></div>
      <div className="moorline-scene-label"><span>FIG. 01</span><span>LIVE PARTICLE FIELD</span><span>MOVE TO DISTURB</span></div><a className="moorline-scroll" href="#moorline-details"><span>SCROLL TO EXPLORE</span><ArrowDown size={14}/></a>
    </section>
    <section className="moorline-details" id="moorline-details"><div className="moorline-section-intro"><div className="moorline-eyebrow"><span/> FROM SIGNAL TO STRUCTURE</div><h2>A system that<br/><em>finds its shape.</em></h2><p>Scroll transforms the particle tree into a geometric field. The visual language stays quiet; the motion does the talking.</p></div>
      <div className="moorline-feature-grid">{features.map(f=><article className="moorline-feature" key={f.n}><div className="moorline-feature-top"><span>{f.n} / 04</span><span className="moorline-feature-dot"/></div><div className="moorline-mini-orb" aria-hidden="true"><span/><span/><span/></div><div className="moorline-feature-tag">{f.tag}</div><h3>{f.title}</h3><p>{f.copy}</p><ArrowUpRight className="moorline-feature-arrow" size={18}/></article>)}</div>
    </section>
    <footer className="moorline-footer"><span className="moorline-wordmark"><span className="moorline-mark">M</span> MOORLINE</span><span>EXPERIMENT 007 · A STUDY IN PARTICLES & PRESENCE</span><button onClick={onBack}>BACK TO EXPERIMENTS <ArrowLeft size={13}/></button></footer>
  </main>
}
