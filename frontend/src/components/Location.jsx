import { LOCATION } from '../content.js'

export default function Location() {
  return (
    <section id="ubicacion" className="section location">
      <p className="kicker">Ubicación</p>
      <h2 className="title">Al pie de la Sierra. <em>A minutos de todo.</em></h2>
      <p className="intro">
        En una reserva natural al pie del Cerro del Chupón y la Sierra Madre, a minutos de
        Valle Oriente y San Pedro Garza García vía Av. Lázaro Cárdenas.
      </p>
      <ul className="chips">
        {LOCATION.nearby.map((n) => <li key={n}>{n}</li>)}
      </ul>
      <p className="address">{LOCATION.address}</p>
      <a href={LOCATION.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-outline-dark">Ver en Google Maps</a>
    </section>
  )
}
