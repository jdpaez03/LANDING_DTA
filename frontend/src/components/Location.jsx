import { LOCATION, RENDERS } from '../content.js'
import Picture from './Picture.jsx'

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
      <Picture file={RENDERS.aerea.file} alt={RENDERS.aerea.caption} className="location-img" sizes="(max-width: 1160px) 100vw, 1100px" />
      <p className="address">{LOCATION.address}</p>
      <a href={LOCATION.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-outline-dark">Ver en Google Maps</a>
    </section>
  )
}
