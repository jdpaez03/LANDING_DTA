import Isotipo from './Isotipo.jsx'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-inner">
        <Isotipo size={96} />
        <p className="eyebrow">TORRE</p>
        <h1>ACQUA</h1>
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
