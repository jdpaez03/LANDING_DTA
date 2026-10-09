import { useEffect, useState } from 'react'
import { requestLead } from '../track.js'
import { trackWhatsapp, whatsappUrl } from '../whatsapp.js'

// Fixed bottom bar on phones. Appears once the hero is out of view and hides
// again when the final form is on screen, so it never covers a form.
export default function MobileBar() {
  const [show, setShow] = useState(false)
  const wa = whatsappUrl()

  useEffect(() => {
    const hero = document.querySelector('.hero')
    const final = document.querySelector('#contacto')
    if (!hero || !final) return
    const seen = { hero: true, final: false }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { seen[e.target === hero ? 'hero' : 'final'] = e.isIntersecting })
      setShow(!seen.hero && !seen.final)
    })
    io.observe(hero)
    io.observe(final)
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
      <a href="#contacto" className="btn btn-primary" tabIndex={tab} onClick={() => requestLead({ intent: 'visita' })}>
        Agenda tu visita
      </a>
    </div>
  )
}
