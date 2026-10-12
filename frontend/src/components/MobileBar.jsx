import { useEffect, useState } from 'react'
import { trackWhatsapp, whatsappUrl } from '../whatsapp.js'

// Fixed bottom bar on phones. Appears once the hero is out of view and hides
// again while any form is on screen, so it never covers one.
export default function MobileBar() {
  const [show, setShow] = useState(false)
  const wa = whatsappUrl()

  useEffect(() => {
    const hiders = [...document.querySelectorAll('.hero, .lead-strip')]
    if (!hiders.length) return
    const visible = new Set(hiders.filter((el) => el.matches('.hero')))
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)))
      setShow(visible.size === 0)
    })
    hiders.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const tab = show ? 0 : -1
  return (
    <div className={`mobile-bar ${show ? 'show' : ''}`} aria-hidden={!show}>
      {wa && (
        <a href={wa} target="_blank" rel="noreferrer" className="btn btn-outline" tabIndex={tab} onClick={() => trackWhatsapp('mobile-bar')}>
          WhatsApp
        </a>
      )}
      <a href="#contacto" className="btn btn-primary" tabIndex={tab}>
        Agenda tu visita
      </a>
    </div>
  )
}
