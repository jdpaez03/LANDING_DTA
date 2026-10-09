import { DEVELOPERS } from '../content.js'

// Two independent developers, each with its own block and logo, split by a gold rule
export default function Developers() {
  return (
    <section className="developers">
      <h2 className="title">La suma de dos grandes desarrolladores. Una sola visión.</h2>
      <div className="dev-pair">
        {DEVELOPERS.map((d) => (
          <article key={d.name} className="dev">
            <h3 className="dev-logo">
              <img src={d.logo} alt={d.name} loading="lazy" />
            </h3>
            <p className="motto">{d.motto}</p>
            <p className="dev-text">{d.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
