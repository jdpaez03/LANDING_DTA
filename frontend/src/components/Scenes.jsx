import { AMENITY_RENDERS, LOCATION, RENDERS } from '../content.js'
import { requestLead } from '../track.js'
import Scene from './Scene.jsx'

const visit = () => requestLead({ intent: 'visita' })

export function OriginScene() {
  return (
    <Scene id="origen" render={RENDERS.torre} label="Origen" beats={[
      <p className="beat-big">Hay lugares que no solo se habitan, se sienten.</p>,
      <p className="beat-big">Acqua nació del agua: de su calma, su claridad, su profundidad.</p>,
    ]} />
  )
}

// Facilities and the visit button follow right after, on the club map (ClubMap.jsx)
export function ClubScene() {
  return (
    <Scene id="club" render={RENDERS.aerea} side="right" label="Club Sonoma" beats={[
      <>
        <h2 className="beat-title">El club, en tu casa.</h2>
        <p className="beat-text">Tu residencia incluye la acción del Club Sonoma.</p>
      </>,
    ]} />
  )
}

export function ViewScene() {
  return (
    <Scene render={RENDERS.vista} label="Vistas" beats={[
      <p className="beat-big">Vistas abiertas al cerro y a la ciudad.</p>,
    ]} />
  )
}

// A walk through the building: the pinned image crossfades from room to room as each beat arrives
export function AmenitiesScene() {
  return (
    <Scene id="amenidades" render={RENDERS.lobby} side="right" label="Amenidades" beats={[
      <>
        <h2 className="beat-title">Espacio en tu vida.</h2>
        <p className="beat-text">1,656 m² de amenidades propias: lobby de doble altura, gimnasio, ludoteca, salón de eventos, coworking y más.</p>
      </>,
      {
        render: AMENITY_RENDERS.gameroom,
        node: <>
          <p className="beat-tag">Nivel 41</p>
          <h3 className="beat-title">Game room</h3>
          <p className="beat-text">Billar, mesa de juego y la ciudad de fondo.</p>
        </>,
      },
      {
        render: AMENITY_RENDERS.sportsbar,
        node: <>
          <p className="beat-tag">Nivel 41</p>
          <h3 className="beat-title">Sports bar y wine cellar</h3>
        </>,
      },
      {
        render: AMENITY_RENDERS.cabanas,
        node: <>
          <p className="beat-tag">Nivel 41</p>
          <h3 className="beat-title">Cinco cabanas privadas con terraza</h3>
          <a href="#contacto" className="btn btn-light" onClick={visit}>Agendar visita privada</a>
        </>,
      },
    ]} />
  )
}

export function LocationScene() {
  return (
    <Scene id="ubicacion" render={RENDERS.atardecer} label="Ubicación" beats={[
      <>
        <h2 className="beat-title">Al pie de la Sierra. A minutos de todo.</h2>
        <p className="beat-text">{LOCATION.address}</p>
        <a href={LOCATION.mapsUrl} target="_blank" rel="noreferrer" className="link link-light">Abrir en Google Maps</a>
      </>,
      <>
        <h3 className="beat-level">Cerca de Torre Acqua</h3>
        <ul className="beat-list">{LOCATION.nearby.slice(0, 4).map((n) => <li key={n}>{n}</li>)}</ul>
      </>,
    ]} />
  )
}
