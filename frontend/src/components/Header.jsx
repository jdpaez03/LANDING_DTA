import { useEffect, useState } from 'react'
import { SITE_PAGES, SITE_URL } from '../content.js'
import { trackWhatsapp, whatsappUrl } from '../whatsapp.js'
import Logo from './Logo.jsx'

// Kept short on purpose: a few places to look, and every page ends at the form
const NAV = SITE_PAGES.filter((p) => p.path !== SITE_URL)

// Dark full-screen areas the header floats over (transparent, ivory type); anything else gets a solid bar
const DARK = '.hero, .scene, .club-map, .footer'

export default function Header({ current }) {
  const [over, setOver] = useState(true)
  const [open, setOpen] = useState(false)
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

  // Phone menu: the page behind stays still while it is open; Escape closes it
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])
  const wa = whatsappUrl()

  return (
    <header className={`header ${over && !open ? 'over' : 'solid'} ${open ? 'menu-open' : ''}`}>
      <a href={SITE_URL} className="brand" aria-label="Torre Acqua, inicio">
        <Logo variant="horizontal" height={32} />
      </a>
      <nav id="site-nav" className="nav" aria-label="Páginas">
        {NAV.map((p) => (
          <a key={p.key} href={p.path} aria-current={p.key === current ? 'page' : undefined}>{p.label}</a>
        ))}
      </nav>
      <div className="header-actions">
        {wa && <a className="link" href={wa} target="_blank" rel="noreferrer" onClick={() => trackWhatsapp('header')}>WhatsApp</a>}
        <a href="#contacto" className={`btn btn-sm ${over && !open ? 'btn-light' : 'btn-primary'}`} onClick={() => setOpen(false)}>
          Agendar visita privada
        </a>
        <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
          {open ? 'Cerrar' : 'Menú'}
        </button>
      </div>
    </header>
  )
}
