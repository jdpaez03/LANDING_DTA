import { RENDERS } from '../content.js'
import { requestLead } from '../track.js'
import Picture from './Picture.jsx'

// Full-screen opening: the whole tower at dusk against the Sierra Madre, headline in ivory over the dark hillside
export default function Hero() {
  return (
    <section id="top" className="hero">
      <Picture file={RENDERS.portada.file} alt="Torre Acqua al atardecer, al pie de la Sierra Madre, junto a las torres de Sonoma" sizes="100vw" eager priority="high" className="hero-img" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-text">
        <h1 className="hero-title">La forma más pura de vivir.</h1>
        <p className="hero-lede">Cincuenta niveles al pie de la Sierra Madre. Monterrey.</p>
        <div className="hero-actions">
          <a href="#contacto" className="btn btn-light" onClick={() => requestLead({ intent: 'visita' })}>Agendar visita privada</a>
          <a href="#contacto" className="link link-light" onClick={() => requestLead({ intent: 'precios' })}>Recibir precios y planos</a>
        </div>
      </div>
      <a href="#origen" className="hero-scroll" aria-label="Continuar">Desliza</a>
    </section>
  )
}
