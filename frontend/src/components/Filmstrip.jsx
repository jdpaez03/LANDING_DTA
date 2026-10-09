import { useEffect, useRef, useState } from 'react'
import { GALLERY } from '../content.js'
import Modal from './Modal.jsx'
import Picture from './Picture.jsx'

// Horizontal strip of every render at its natural proportion. Scrolls with touch, trackpad,
// mouse drag or the arrows; clicking a render opens it full screen with keyboard navigation.
export default function Filmstrip() {
  const track = useRef(null)
  const drag = useRef({ active: false, x: 0, left: 0, moved: false })
  const [current, setCurrent] = useState(0)
  const [open, setOpen] = useState(null)

  const items = () => [...track.current.children]

  // Counter follows whichever render is nearest the left edge
  const onScroll = () => {
    const left = track.current.scrollLeft
    const offsets = items().map((el) => Math.abs(el.offsetLeft - track.current.offsetLeft - left))
    setCurrent(offsets.indexOf(Math.min(...offsets)))
  }

  const go = (i) => {
    const target = items()[Math.max(0, Math.min(GALLERY.length - 1, i))]
    track.current.scrollTo({ left: target.offsetLeft - track.current.offsetLeft, behavior: 'smooth' })
  }

  // Mouse drag to scroll (touch and trackpads scroll natively)
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse') return
    drag.current = { active: true, x: e.clientX, left: track.current.scrollLeft, moved: false }
    track.current.classList.add('dragging')
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d.active) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 5) d.moved = true
    track.current.scrollLeft = d.left - dx
  }
  const endDrag = () => {
    drag.current.active = false
    track.current?.classList.remove('dragging')
  }

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % GALLERY.length)
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + GALLERY.length) % GALLERY.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <section className="filmstrip" aria-label="Galería de renders">
      <div className="filmstrip-head">
        <h2 className="title">Galería</h2>
        <div className="filmstrip-nav">
          <span className="filmstrip-count" aria-live="polite">{current + 1} / {GALLERY.length}</span>
          <button type="button" onClick={() => go(current - 1)} disabled={current === 0} aria-label="Anterior">‹</button>
          <button type="button" onClick={() => go(current + 1)} disabled={current === GALLERY.length - 1} aria-label="Siguiente">›</button>
        </div>
      </div>

      <div
        ref={track}
        className="filmstrip-track"
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        {GALLERY.map((r, i) => (
          <figure key={r.file} className="filmstrip-item">
            <button type="button" aria-label={`Ver imagen completa: ${r.caption}`}
              onClick={() => { if (!drag.current.moved) setOpen(i) }}>
              <Picture file={r.file} alt={r.caption} sizes="(max-width: 760px) 90vw, 70vw" />
            </button>
            <figcaption>{r.caption}</figcaption>
          </figure>
        ))}
      </div>

      <Modal open={open !== null} onClose={() => setOpen(null)} className="lightbox" label="Galería de renders">
        {open !== null && (
          <figure>
            <Picture file={GALLERY[open].file} alt={GALLERY[open].caption} sizes="96vw" eager />
            <figcaption>{GALLERY[open].caption}<span>{open + 1} / {GALLERY.length}</span></figcaption>
            <button type="button" className="lightbox-nav prev" onClick={() => setOpen((i) => (i - 1 + GALLERY.length) % GALLERY.length)} aria-label="Anterior">‹</button>
            <button type="button" className="lightbox-nav next" onClick={() => setOpen((i) => (i + 1) % GALLERY.length)} aria-label="Siguiente">›</button>
          </figure>
        )}
      </Modal>
    </section>
  )
}
