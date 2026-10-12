import LeadForm from './LeadForm.jsx'

// Short form placed along the page, so a visitor can leave their data the moment they are
// interested instead of having to reach the end of the page
export default function LeadStrip({ id, title, text = 'Déjanos tus datos y un asesor te contacta por WhatsApp.' }) {
  return (
    <section id={id} className="lead-strip" aria-labelledby={`${id}-title`}>
      <div className="lead-strip-text">
        <h2 id={`${id}-title`} className="lead-strip-title">{title}</h2>
        <p>{text}</p>
      </div>
      <div className="lead-strip-form">
        <LeadForm location={id} />
      </div>
    </section>
  )
}
