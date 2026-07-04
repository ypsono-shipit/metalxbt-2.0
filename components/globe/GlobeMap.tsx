'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { X, ExternalLink } from 'lucide-react'
import { COMPANIES } from '@/lib/mock-data'
import { cn, fmtPct } from '@/lib/utils'
import type { MiningCompany } from '@/types'

function latLonToVec3(lat: number, lon: number, r = 1): [number, number, number] {
  const phi = (90 - lat) * Math.PI / 180
  const theta = (lon + 180) * Math.PI / 180
  return [
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  ]
}

export default function GlobeMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<{ remove: () => void } | null>(null)
  const [selected, setSelected] = useState<MiningCompany | null>(null)
  const [hovered, setHovered] = useState<MiningCompany | null>(null)
  const [hoveredPos, setHoveredPos] = useState({ x: 0, y: 0 })
  const [filter, setFilter] = useState<string>('All')

  const FILTERS = ['All', 'Gold', 'Copper', 'Iron Ore', 'Uranium', 'Lithium', 'Nickel']
  const filtered = filter === 'All' ? COMPANIES : COMPANIES.filter(c => c.commodity.includes(filter))

  useEffect(() => {
    const _canvas = canvasRef.current
    if (!_canvas) return
    const canvas: HTMLCanvasElement = _canvas
    let animId: number
    let THREE!: typeof import('three')
    let globe!: import('three').Mesh
    let mGroup!: import('three').Group
    let camera!: import('three').PerspectiveCamera
    let renderer!: import('three').WebGLRenderer
    let scene!: import('three').Scene
    let sprites: { sprite: import('three').Sprite; co: MiningCompany }[] = []
    let isDragging = false
    let prevMouse = { x: 0, y: 0 }
    let mouseDownAt = { x: 0, y: 0 }
    let autoRotate = true
    let camZ = 3.0
    let targetCamZ = 3.0
    let targetQ: import('three').Quaternion | null = null
    ;(async () => {
      const T = await import('three')
      THREE = T

      renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0, 0)
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)

      scene = new T.Scene()
      camera = new T.PerspectiveCamera(42, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
      camera.position.z = 3.0

      scene.add(new T.AmbientLight(0xffffff, 1.0))
      const sun = new T.DirectionalLight(0xfff8f0, 0.8)
      sun.position.set(5, 3, 5); scene.add(sun)

      globe = new T.Mesh(
        new T.SphereGeometry(1, 64, 64),
        new T.MeshPhongMaterial({ color: 0x2C6DB5, shininess: 15, specular: new T.Color(0x3366aa) })
      )
      scene.add(globe)

      new T.TextureLoader().load('https://unpkg.com/three-globe/example/img/earth-day.jpg', tex => {
        if (globe) globe.material = new T.MeshPhongMaterial({ map: tex, shininess: 12 }) as any
      })

      scene.add(new T.Mesh(
        new T.SphereGeometry(1.06, 64, 64),
        new T.MeshBasicMaterial({ color: 0x4488ff, transparent: true, opacity: 0.06, side: T.FrontSide })
      ))

      mGroup = new T.Group()
      scene.add(mGroup)

      function makeSprite(color: string): import('three').Sprite {
        const sz = 96
        const c2 = document.createElement('canvas')
        c2.width = sz; c2.height = sz
        const ctx = c2.getContext('2d')!
        const g = ctx.createRadialGradient(sz/2,sz/2,sz*.1, sz/2,sz/2,sz*.48)
        g.addColorStop(0, color + 'CC'); g.addColorStop(1, color + '00')
        ctx.fillStyle = g; ctx.fillRect(0,0,sz,sz)
        ctx.beginPath(); ctx.arc(sz/2,sz/2,sz*.26,0,Math.PI*2)
        ctx.fillStyle = color; ctx.fill()
        ctx.strokeStyle = 'white'; ctx.lineWidth = sz*.07; ctx.stroke()
        const mat = new T.SpriteMaterial({ map: new T.CanvasTexture(c2), transparent: true, depthWrite: false })
        const sprite = new T.Sprite(mat)
        sprite.scale.set(0.1, 0.1, 1)
        return sprite
      }

      sprites = []
      filtered.forEach(co => {
        const sprite = makeSprite(co.color)
        const [x,y,z] = latLonToVec3(co.lat, co.lon, 1.05)
        sprite.position.set(x,y,z)
        ;(sprite as any).__co = co
        mGroup.add(sprite)
        sprites.push({ sprite, co })
      })

      const rc = new T.Raycaster()
      let hoveredIdx = -1

      function onMouseMove(e: MouseEvent) {
        const rect = canvas.getBoundingClientRect()
        const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1
        const my = -((e.clientY - rect.top) / rect.height) * 2 + 1
        rc.setFromCamera({ x: mx, y: my }, camera)
        const hits = rc.intersectObjects(sprites.map(s => s.sprite))
        if (hits.length > 0) {
          const co = (hits[0].object as any).__co as MiningCompany
          setHovered(co)
          setHoveredPos({ x: e.clientX - rect.left + 12, y: e.clientY - rect.top - 80 })
          canvas.style.cursor = 'pointer'
        } else {
          setHovered(null)
          canvas.style.cursor = isDragging ? 'grabbing' : 'grab'
        }
        if (isDragging) {
          const dx = e.clientX - prevMouse.x, dy = e.clientY - prevMouse.y
          const q = new T.Quaternion()
          q.setFromEuler(new T.Euler(dy * .004, dx * .004, 0, 'XYZ'))
          globe.quaternion.premultiply(q)
          mGroup.quaternion.copy(globe.quaternion)
          targetQ = null
          prevMouse = { x: e.clientX, y: e.clientY }
        }
      }

      function onMouseDown(e: MouseEvent) {
        isDragging = true; autoRotate = false
        prevMouse = { x: e.clientX, y: e.clientY }
        mouseDownAt = { x: e.clientX, y: e.clientY }
        canvas.style.cursor = 'grabbing'
      }

      function onMouseUp(e: MouseEvent) {
        const dist = Math.hypot(e.clientX - mouseDownAt.x, e.clientY - mouseDownAt.y)
        isDragging = false; canvas.style.cursor = 'grab'
        if (dist < 6) {
          const rect = canvas.getBoundingClientRect()
          const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1
          const my = -((e.clientY - rect.top) / rect.height) * 2 + 1
          rc.setFromCamera({ x: mx, y: my }, camera)
          const hits = rc.intersectObjects(sprites.map(s => s.sprite))
          if (hits.length > 0) {
            const co = (hits[0].object as any).__co as MiningCompany
            setSelected(co)
            // Focus globe on company
            const localPos = hits[0].object.position.clone().normalize()
            const worldDir = localPos.applyQuaternion(globe.quaternion).normalize()
            const rotNeeded = new T.Quaternion().setFromUnitVectors(worldDir, new T.Vector3(0,0,1))
            targetQ = rotNeeded.multiply(globe.quaternion.clone())
            targetCamZ = 2.4; autoRotate = false
          }
        }
        setTimeout(() => { if (!isDragging) autoRotate = true }, 5000)
      }

      canvas.addEventListener('mousemove', onMouseMove)
      canvas.addEventListener('mousedown', onMouseDown)
      window.addEventListener('mouseup', onMouseUp)
      canvas.addEventListener('mouseleave', () => setHovered(null))
      canvas.addEventListener('wheel', (e) => {
        e.preventDefault()
        targetCamZ = Math.max(1.8, Math.min(5, targetCamZ + e.deltaY * .003))
      }, { passive: false })

      const ro = new ResizeObserver(() => {
        if (!canvas || !renderer || !camera) return
        renderer.setSize(canvas.clientWidth, canvas.clientHeight)
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()
      })
      ro.observe(canvas)

      let t = 0
      function animate() {
        animId = requestAnimationFrame(animate)
        t += 0.012
        if (autoRotate && !targetQ) {
          const q = new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0), 0.0015)
          globe.quaternion.premultiply(q); mGroup.quaternion.copy(globe.quaternion)
        }
        if (targetQ) {
          globe.quaternion.slerp(targetQ, 0.05); mGroup.quaternion.copy(globe.quaternion)
          if (globe.quaternion.angleTo(targetQ) < 0.005) { globe.quaternion.copy(targetQ); targetQ = null }
        }
        camZ += (targetCamZ - camZ) * 0.06
        camera.position.z = camZ
        sprites.forEach(({ sprite }, i) => {
          const pulse = 1 + 0.15 * Math.sin(t * 2.2 + i * 0.7)
          sprite.scale.setScalar(0.1 * pulse)
          sprite.material.opacity = 0.7 + 0.3 * Math.sin(t * 1.8 + i * 0.9)
        })
        renderer.render(scene, camera)
      }
      animate()

      rendererRef.current = {
        remove: () => {
          cancelAnimationFrame(animId)
          canvas.removeEventListener('mousemove', onMouseMove)
          canvas.removeEventListener('mousedown', onMouseDown)
          window.removeEventListener('mouseup', onMouseUp)
          ro.disconnect()
          renderer.dispose()
        }
      }
    })()

    return () => { rendererRef.current?.remove() }
  }, [filter])

  return (
    <div className="flex gap-0 h-full relative">
      {/* Globe */}
      <div className="flex-1 relative min-h-0">
        {/* Filters */}
        <div className="absolute top-4 left-4 z-10 flex gap-1.5 flex-wrap">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn('px-3 py-1 rounded-xl text-xs font-bold transition-all duration-150 shadow-sm',
                filter === f ? 'bg-primary text-white shadow-glow' : 'bg-white/90 text-ink-secondary hover:bg-white hover:text-ink'
              )}>
              {f}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1.5">
          {['+','−','⌂'].map((c,i) => (
            <button key={i} className="w-8 h-8 rounded-xl bg-white/90 shadow-sm border border-surface-border flex items-center justify-center text-sm font-bold text-ink hover:bg-white transition-colors">
              {c}
            </button>
          ))}
        </div>

        <canvas ref={canvasRef} id="globe-canvas" style={{ cursor: 'grab', width: '100%', height: '100%' }} />

        {/* Hover popup */}
        {hovered && !selected && (
          <div className="absolute z-20 pointer-events-none bg-white rounded-2xl shadow-float border border-surface-border p-3 min-w-[180px]"
            style={{ left: hoveredPos.x, top: hoveredPos.y }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black" style={{ background: hovered.color }}>
                {hovered.initials}
              </div>
              <div>
                <p className="text-sm font-bold text-ink">{hovered.name}</p>
                <p className="text-xs text-ink-secondary">📍 {hovered.country}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <div><span className="text-ink-secondary">Ticker</span><br/><span className="font-bold">{hovered.ticker}</span></div>
              <div><span className="text-ink-secondary">Exchange</span><br/><span className="font-bold">{hovered.exchange}</span></div>
              <div><span className="text-ink-secondary">Price</span><br/><span className="font-bold">${hovered.price.toFixed(2)}</span></div>
              <div><span className="text-ink-secondary">Cap</span><br/><span className="font-bold">{hovered.cap}</span></div>
            </div>
            <p className="text-[10px] text-ink-secondary text-center mt-2">Click to explore →</p>
          </div>
        )}
      </div>

      {/* Detail Panel */}
      <div className={cn(
        'flex-shrink-0 bg-white border-l border-surface-border overflow-y-auto transition-all duration-300',
        selected ? 'w-[320px]' : 'w-0'
      )}>
        {selected && (
          <div className="p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black" style={{ background: selected.color }}>
                  {selected.initials}
                </div>
                <div>
                  <h3 className="font-bold text-ink">{selected.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-sm font-semibold text-ink-secondary">{selected.ticker}</span>
                    <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded-md',
                      selected.exchange === 'NYSE' ? 'bg-blue-100 text-blue-700' : selected.exchange === 'NASDAQ' ? 'bg-purple-100 text-purple-700' : 'bg-surface text-ink-secondary'
                    )}>
                      {selected.exchange}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-xl hover:bg-surface transition-colors">
                <X size={16} className="text-ink-secondary" />
              </button>
            </div>

            {/* Price */}
            <div className="mb-4">
              <p className="text-3xl font-black text-ink">${selected.price.toFixed(2)}</p>
              <span className={cn('text-sm font-bold', selected.change >= 0 ? 'text-success' : 'text-danger')}>
                {fmtPct(selected.change)} today
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { l: 'Market Cap', v: selected.cap },
                { l: 'P/E Ratio', v: selected.pe },
                { l: 'EV/EBITDA', v: selected.ev },
                { l: 'Dividend', v: selected.div },
                { l: 'Status', v: selected.status },
                { l: 'Capacity', v: selected.capacity },
              ].map(({ l, v }) => (
                <div key={l} className="bg-surface rounded-xl p-2.5">
                  <p className="text-[9px] font-bold text-ink-secondary uppercase tracking-wider">{l}</p>
                  <p className="text-xs font-bold text-ink mt-0.5">{v}</p>
                </div>
              ))}
            </div>

            {/* Commodities */}
            <div className="mb-4">
              <p className="label mb-2">Commodities</p>
              <div className="flex flex-wrap gap-1.5">
                {selected.commodity.map(c => (
                  <span key={c} className="px-2.5 py-1 rounded-xl text-xs font-bold bg-primary/10 text-primary">{c}</span>
                ))}
              </div>
            </div>

            {/* Operations */}
            <div className="mb-4">
              <p className="label mb-2">Operations</p>
              <div className="space-y-1.5">
                {selected.operations.map(o => (
                  <div key={o} className="flex items-center gap-2 text-sm">
                    <span className="text-sm">⛏️</span>
                    <span className="text-ink-secondary">{o}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* News */}
            <div className="mb-5">
              <p className="label mb-2">Latest News</p>
              <div className="space-y-2">
                {selected.news.map((n, i) => (
                  <div key={i} className="bg-surface rounded-xl p-2.5 cursor-pointer hover:bg-surface-hover transition-colors">
                    <p className="text-xs font-semibold text-ink leading-snug">{n.headline}</p>
                    <p className="text-[10px] text-ink-secondary mt-0.5">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="btn-primary flex-1 text-xs">⭐ Watchlist</button>
              <button className="btn-secondary flex-1 text-xs gap-1">
                <ExternalLink size={12} /> {selected.exchange}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
