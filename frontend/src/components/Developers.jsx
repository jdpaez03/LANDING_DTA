import { DEVELOPERS } from '../content.js'

export default function Developers() {
  return (
    <section className="section developers">
      <h2 className="title">La suma de dos grandes desarrolladores. <em>Una sola visión.</em></h2>
      <div className="columns two">
        {DEVELOPERS.map((d) => (
          <div key={d.name} className="dev">
            <h3>{d.name}</h3>
            <p className="dev-motto">{d.motto}</p>
            <p>{d.text}</p>
          </div>
        ))}
      </div>
      <p className="muted-text">Arquitectura: Gómez Vázquez International (GVI)</p>
    </section>
  )
}
