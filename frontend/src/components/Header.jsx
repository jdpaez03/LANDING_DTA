import { useEffect, useState } from 'react'
import { requestLead } from '../track.js'
import { trackWhatsapp, whatsappUrl } from '../whatsapp.js'
import Logo from './Logo.jsx'

const NAV = [
  ['#club', 'Club Sonoma'],
  ['#residencias', 'Residencias'],
  ['#amenidades', 'Amenidades'],
  ['#ubicacion', 'Ubicación'],
]

// Dark full-screen areas the header floats over (transparent, ivory type); anything else gets a solid bar
const DARK = '.hero, .scene, .club-map, .footer'

export default function Header() {
  const [over, setOver] = useState(true)
  useEffect(() => {
    // Is a dark area under the bottom edge of the bar? Uses section positions, not hit-testing
    const onScroll = () => {
      const y = 80
      setOver([...document.querySelectorAll(DARK)].some((el) => {
        const r = el.getBoundingClientRect()
        return r.top <= y && r.bottom > y
      }))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])
  const wa = whatsappUrl()

  return (
    <header className={`header ${over ? 'over' : 'solid'}`}>
      <a href="#top" className="brand" aria-label="Torre Acqua, inicio">
        <Logo variant="horizontal" height={32} />
      </a>
      <nav className="nav" aria-label="Secciones">
        {NAV.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <div className="header-actions">
        {wa && <a className="link" href={wa} target="_blank" rel="noreferrer" onClick={() => trackWhatsapp('header')}>WhatsApp</a>}
        <a href="#contacto" className={`btn btn-sm ${over ? 'btn-light' : 'btn-primary'}`} onClick={() => requestLead({ intent: 'visita' })}>
          Agendar visita privada
        </a>
      </div>
    </header>
  )
}
