import { CONTACT, SHOWROOM } from '../content.js'
import { trackWhatsapp, whatsappUrl } from '../whatsapp.js'
import LeadForm from './LeadForm.jsx'

export default function Contact() {
  const wa = whatsappUrl()
  return (
    <section id="contacto" className="contact">
      <div className="contact-text">
        <h2 className="title">Conoce Torre Acqua en persona.</h2>
        <p>Un asesor te responde por WhatsApp.</p>
        {(wa || CONTACT.phone || CONTACT.email) && (
          <ul className="contact-direct">
            {wa && <li><a className="link" href={wa} target="_blank" rel="noreferrer" onClick={() => trackWhatsapp('contacto')}>Escribir por WhatsApp</a></li>}
            {CONTACT.phone && <li>Teléfono: {CONTACT.phone}</li>}
            {CONTACT.email && <li>Correo: {CONTACT.email}</li>}
          </ul>
        )}
        {SHOWROOM && (
          <div className="showroom">
            <h3>Sala de ventas</h3>
            <p>{SHOWROOM.address}</p>
            {SHOWROOM.hours && <p>{SHOWROOM.hours}</p>}
            {SHOWROOM.mapsUrl && <a href={SHOWROOM.mapsUrl} target="_blank" rel="noreferrer" className="link">Cómo llegar</a>}
          </div>
        )}
      </div>
      <div className="contact-form">
        <LeadForm variant="full" location="contacto" />
      </div>
    </section>
  )
}
