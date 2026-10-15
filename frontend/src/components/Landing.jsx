import { useEffect } from 'react'
import { LANDING_SPECS, LEGAL_URL, PRELIMINARY_SHORT, RENDERS, SITE_URL } from '../content.js'
import { track } from '../track.js'
import LeadForm from './LeadForm.jsx'
import Logo from './Logo.jsx'
import Picture from './Picture.jsx'

// Entry landing at the root URL, where campaign posts send people: the tower full screen carrying
// the logo, the headline and the key figures; one card with only the short form. The curious can go
// on to the full site; the campaign parameters (?utm_...) travel with them so a lead left there
// keeps its attribution.
export default function Landing() {
  useEffect(() => { document.title = 'Torre Acqua · Sonoma Club & Residences' }, [])
  const siteHref = SITE_URL + window.location.search

  return (
    <main className="landing">
      <div className="landing-hero">
        <Picture file={RENDERS.portada.file} alt="Torre Acqua al atardecer, al pie de la Sierra Madre, junto a las torres de Sonoma"
          sizes="100vw" eager priority="high" className="landing-img" />
        <div className="landing-shade" aria-hidden="true" />

        <Logo variant="principal" height={150} className="landing-logo" />
        <div className="landing-text">
          <h1 className="landing-title">La forma más pura de vivir.</h1>
          <dl className="landing-specs">
            {LANDING_SPECS.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className="landing-lede">Sonoma Club &amp; Residences, al pie de la Sierra Madre. Tu residencia incluye la acción del Club Sonoma.</p>
        </div>
      </div>

      <section className="landing-card" aria-labelledby="landing-form-title">
        <h2 id="landing-form-title" className="landing-form-title">Recibe información y disponibilidad por WhatsApp.</h2>
        <LeadForm location="landing" />
        <a href={siteHref} className="landing-site" onClick={() => track('landing_to_site')}>
          Conocer Torre Acqua <span aria-hidden="true">→</span>
        </a>
        <p className="landing-note"><a href={LEGAL_URL}>{PRELIMINARY_SHORT}</a></p>
      </section>
    </main>
  )
}
