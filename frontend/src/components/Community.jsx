import { useEffect, useRef, useState } from 'react'
import { COMMUNITY } from '../content.js'

// "Una comunidad viva": the towers of Sonoma on a timeline. When the section scrolls into view
// the line fills tower by tower and stops at Acqua ("Tu turno").
export default function Community() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  const towers = COMMUNITY.towers
  const currentIdx = towers.findIndex((t) => t.status === 'current')

  useEffect(() => {
    const el = ref.current
    // Already on screen (or reduced motion): show the finished state right away
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || el.getBoundingClientRect().top < window.innerHeight * 0.6) {
      setShown(true)
      return
    }
    const onScroll = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.6) {
        setShown(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Markers sit at the start of each column; the CSS adds half a marker so the line ends on Acqua's
  const fill = shown ? (currentIdx / towers.length) * 100 : 0

  return (
    <section ref={ref} className={`community ${shown ? 'shown' : ''}`} aria-labelledby="community-title">
      <div className="community-head">
        <h2 id="community-title" className="title">{COMMUNITY.title}</h2>
        <p className="community-lede">{COMMUNITY.lede}</p>
      </div>

      <ol className="timeline" style={{ '--fill': `${fill}%`, '--steps': towers.length }}>
        {towers.map((t, i) => (
          <li key={t.name} className={`tower-step ${t.status}`} style={{ '--i': i }}>
            <span className="step-marker" aria-hidden="true" />
            <span className="step-year">{t.year}</span>
            <span className="step-name">{t.name}</span>
            <span className="step-note">{t.note}</span>
          </li>
        ))}
      </ol>

      <div className="community-foot">
        <p className="community-closing">{COMMUNITY.closing}</p>
      </div>
    </section>
  )
}
