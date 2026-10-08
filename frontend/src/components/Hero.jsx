import { RENDERS } from '../content.js'
import Logo from './Logo.jsx'
import Picture from './Picture.jsx'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <Picture file={RENDERS.nocturna.file} alt="" className="hero-bg" eager />
      <div className="hero-inner">
        <h1 className="hero-logo">
          <Logo variant="principal" height={260} />
        </h1>
        <p className="tagline">La forma más pura de vivir.</p>
        <p className="hero-sub">Cincuenta niveles al pie de la Sierra Madre · Sonoma Club &amp; Residences, Monterrey</p>
        <div className="hero-ctas">
          <a href="#contacto" className="btn btn-primary">Quiero más información</a>
          <a href="#residencias" className="btn btn-ghost">Ver residencias</a>
        </div>
      </div>
    </section>
  )
}
