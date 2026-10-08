import { useEffect, useState } from 'react'
import { GALLERY } from '../content.js'
import Modal from './Modal.jsx'
import Picture from './Picture.jsx'

export default function Gallery() {
  const [index, setIndex] = useState(null)
  const open = index !== null
  const step = (d) => setIndex((i) => (i + d + GALLERY.length) % GALLERY.length)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <section id="galeria" className="section gallery">
      <p className="kicker">Galería</p>
      <h2 className="title">Una forma <em>de vivir.</em></h2>
      <div className="gallery-grid">
        {GALLERY.map((r, i) => (
          <button key={r.file} className="gallery-item" onClick={() => setIndex(i)}>
            <Picture file={r.file} alt={r.caption} sizes="(max-width: 700px) 100vw, 50vw" />
            <span className="gallery-caption">{r.caption}</span>
          </button>
        ))}
      </div>

      <Modal open={open} onClose={() => setIndex(null)} className="lightbox" label="Galería de renders">
        {open && (
          <figure>
            <Picture file={GALLERY[index].file} alt={GALLERY[index].caption} sizes="95vw" eager />
            <figcaption>
              {GALLERY[index].caption}
              <span>{index + 1} / {GALLERY.length}</span>
            </figcaption>
            <button className="lightbox-nav prev" onClick={() => step(-1)} aria-label="Anterior">‹</button>
            <button className="lightbox-nav next" onClick={() => step(1)} aria-label="Siguiente">›</button>
          </figure>
        )}
      </Modal>
    </section>
  )
}
