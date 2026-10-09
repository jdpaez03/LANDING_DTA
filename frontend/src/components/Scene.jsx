import { useEffect, useRef, useState } from 'react'
import Modal from './Modal.jsx'
import Picture from './Picture.jsx'

// Immersive scene: a render stays pinned full screen while text "beats" scroll over it,
// one screen per beat. A beat can bring its own render ({ render, node }); the pinned image
// then crossfades to it while that beat is on screen, like walking from room to room.
// `side` puts the beats left or right; `id` makes it a nav target.
export default function Scene({ id, render, beats, side = 'left', label }) {
  const items = beats.map((b) => (b && typeof b === 'object' && 'node' in b ? b : { node: b }))
  // Distinct renders in order of appearance; the scene's own render first
  const renders = [render, ...items.map((b) => b.render).filter(Boolean)]
    .filter((r, i, all) => all.findIndex((x) => x.file === r.file) === i)
  const [current, setCurrent] = useState(render.file)
  const [open, setOpen] = useState(false)
  const beatRefs = useRef([])

  // The beat crossing the middle of the screen decides which render is shown
  useEffect(() => {
    if (renders.length < 2) return
    const onScroll = () => {
      const mid = window.innerHeight / 2
      const i = beatRefs.current.findIndex((el) => {
        const r = el?.getBoundingClientRect()
        return r && r.top <= mid && r.bottom > mid
      })
      if (i !== -1) setCurrent((items[i].render || render).file)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])

  const shown = renders.find((r) => r.file === current) || render

  return (
    <section id={id} className={`scene scene-${side}`} aria-label={label || render.caption}>
      <div className="scene-media">
        {/* Loaded up front at low priority so a scene is never empty when it arrives, even on a fast scroll */}
        {renders.map((r) => (
          <Picture key={r.file} file={r.file} alt={r.file === current ? r.caption : ''} sizes="100vw" eager priority="low"
            className={`scene-img ${r.file === current ? 'on' : ''}`} />
        ))}
        <div className="scene-shade" aria-hidden="true" />
        {renders.length > 1 && <p className="scene-caption" aria-live="polite">{shown.caption}</p>}
        <button type="button" className="scene-expand" onClick={() => setOpen(true)}>Ver imagen completa</button>
      </div>
      <div className="scene-beats">
        {items.map((beat, i) => (
          <div key={i} ref={(el) => { beatRefs.current[i] = el }} className="scene-beat">
            <div className="beat-card">{beat.node}</div>
          </div>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} className="lightbox" label={shown.caption}>
        <figure>
          <Picture file={shown.file} alt={shown.caption} sizes="96vw" eager />
          <figcaption>{shown.caption}<span>Render ilustrativo</span></figcaption>
        </figure>
      </Modal>
    </section>
  )
}
