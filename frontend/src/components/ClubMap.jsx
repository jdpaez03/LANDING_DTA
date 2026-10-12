import { useState } from 'react'
import { CLUB_MAP } from '../content.js'

const src = (w) => `/img/renders/${CLUB_MAP.image.file}-${w}.webp`

// The real aerial photo of the club, shown whole, with numbered points on each facility.
// Hovering or focusing a point or a list item highlights its pair.
export default function ClubMap() {
  const [active, setActive] = useState(null)
  const on = (n) => () => setActive(n)
  const off = () => setActive(null)

  return (
    <section className="club-map" aria-labelledby="club-map-title">
      <div className="club-map-inner">
        <figure className="club-map-photo">
          <img
            src={src(800)}
            srcSet={CLUB_MAP.image.widths.map((w) => `${src(w)} ${w}w`).join(', ')}
            sizes="(max-width: 1000px) 100vw, 640px"
            alt={CLUB_MAP.image.caption}
            loading="lazy"
          />
          {CLUB_MAP.points.map((p) => (
            <button
              key={p.n}
              type="button"
              className={`map-pin ${active === p.n ? 'on' : ''}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              aria-label={p.label}
              onMouseEnter={on(p.n)} onMouseLeave={off} onFocus={on(p.n)} onBlur={off}
              onClick={() => setActive(active === p.n ? null : p.n)}
            >
              {p.n}
            </button>
          ))}
          <figcaption>{CLUB_MAP.image.caption}</figcaption>
        </figure>

        <div className="club-map-text">
          <h2 id="club-map-title" className="title">Más de 15 hectáreas de club.</h2>
          <ol className="map-list">
            {CLUB_MAP.points.map((p) => (
              <li key={p.n}>
                <button type="button" className={active === p.n ? 'on' : ''}
                  onMouseEnter={on(p.n)} onMouseLeave={off} onFocus={on(p.n)} onBlur={off}
                  onClick={() => setActive(active === p.n ? null : p.n)}>
                  <span className="map-n">{p.n}</span>{p.label}
                </button>
              </li>
            ))}
          </ol>
          <a href="#contacto" className="btn btn-light">Agendar visita al club</a>
        </div>
      </div>
    </section>
  )
}
