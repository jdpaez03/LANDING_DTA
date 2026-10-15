import { DEVELOPERS } from '../content.js'

// Two independent developers, each with its own block and logo (linked to its site), split by a gold rule.
// `title={null}` leaves the heading out when the page headline already says it.
export default function Developers({ title = 'La suma de dos grandes desarrolladores. Una sola visión.' }) {
  return (
    <section id="equipo" className="developers">
      {title && <h2 className="title">{title}</h2>}
      <div className="dev-pair">
        {DEVELOPERS.map((d) => (
          <article key={d.name} className="dev">
            <h3 className="dev-logo">
              <a href={d.url} target="_blank" rel="noreferrer" aria-label={`${d.name} (abre su sitio en otra pestaña)`}>
                <img src={d.logo} alt={d.name} loading="lazy" />
              </a>
            </h3>
            <p className="motto">{d.motto}</p>
            <p className="dev-text">{d.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
