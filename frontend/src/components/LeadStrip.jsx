import LeadForm from './LeadForm.jsx'

// Short form at the end of every page, so a visitor can leave their data the moment they are
// interested. `location` tells the leads apart by page; the id is #contacto on every page, where
// the header and the calls to action lead.
export default function LeadStrip({ id = 'contacto', location, title, text = 'Déjanos tus datos y un asesor te contacta por WhatsApp.' }) {
  return (
    <section id={id} className="lead-strip" aria-labelledby={`${id}-title`}>
      <div className="lead-strip-text">
        <h2 id={`${id}-title`} className="lead-strip-title">{title}</h2>
        <p>{text}</p>
      </div>
      <div className="lead-strip-form">
        <LeadForm location={location || id} />
      </div>
    </section>
  )
}
