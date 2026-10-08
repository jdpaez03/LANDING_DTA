import Logo from './Logo.jsx'

const NAV = [
  ['#club', 'Club Sonoma'],
  ['#amenidades', 'Amenidades'],
  ['#galeria', 'Galería'],
  ['#residencias', 'Residencias'],
  ['#ubicacion', 'Ubicación'],
]

export default function Header() {
  return (
    <header className="header">
      <a href="#top" className="brand">
        <Logo variant="horizontal" height={38} />
      </a>
      <nav className="nav">
        {NAV.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <a href="#contacto" className="btn btn-outline">Agenda una visita</a>
    </header>
  )
}
