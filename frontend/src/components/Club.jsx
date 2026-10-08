import { CLUB } from '../content.js'

const GROUPS = [
  ['Deportivas', CLUB.sports],
  ['Sociales', CLUB.social],
  ['Servicios', CLUB.services],
]

export default function Club() {
  return (
    <section id="club" className="section club">
      <p className="kicker">Sonoma Club &amp; Residences</p>
      <h2 className="title">El club, <em>en tu casa.</em></h2>
      <p className="intro">
        El único master plan de Monterrey con un club privado dentro. Tu residencia incluye la
        acción del Club Sonoma: <strong>una sola compra, dos patrimonios.</strong>
      </p>
      <p className="intro muted-text">
        Más de 15 hectáreas de reserva natural. Sede del Abierto GNP Seguros (WTA/ATP)
        y del GNP Mexico Major Premier Padel.
      </p>
      <div className="columns">
        {GROUPS.map(([title, items]) => (
          <div key={title} className="card">
            <h3>{title}</h3>
            <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
      <p className="community">
        Una comunidad que ya existe desde 2012: Vento, Alberi, Foresta y Pietra habitadas; Fiori en obra.
        Acqua es el siguiente capítulo.
      </p>
    </section>
  )
}
