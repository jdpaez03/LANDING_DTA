import Isotipo from './Isotipo.jsx'

const NAV = [
  ['#club', 'Club Sonoma'],
  ['#amenidades', 'Amenidades'],
  ['#residencias', 'Residencias'],
  ['#ubicacion', 'Ubicación'],
]

export default function Header() {
  return (
    <header className="header">
      <a href="#top" className="brand">
        <Isotipo size={34} />
        <span className="brand-text">
          <small>TORRE</small>
          <strong>ACQUA</strong>
        </span>
      </a>
      <nav className="nav">
        {NAV.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <a href="#contacto" className="btn btn-outline">Agenda una visita</a>
    </header>
  )
}
