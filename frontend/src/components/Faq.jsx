import { FAQ } from '../content.js'

export default function Faq() {
  return (
    <section id="preguntas" className="section faq">
      <h2 className="title">Preguntas frecuentes</h2>
      <div className="faq-list">
        {FAQ.map(([q, a]) => (
          <details key={q} className="faq-item">
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
