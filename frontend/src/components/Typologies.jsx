import { TYPOLOGIES } from '../content.js'

const m2 = (n) => n.toLocaleString('es-MX', { minimumFractionDigits: 2 })

export default function Typologies() {
  return (
    <section id="residencias" className="section typologies">
      <p className="kicker">136 residencias · 6 tipologías</p>
      <h2 className="title">Una residencia <em>para cada etapa.</em></h2>
      <p className="intro">
        Terraza en cada residencia y recámaras con baño completo. Penthouses de un departamento
        por nivel, del 42 al 49.
      </p>
      <div className="typo-grid">
        {TYPOLOGIES.map((t) => (
          <article key={t.id} className="typo">
            <h3>{t.name}</h3>
            <p className="typo-program">{t.program}</p>
            <p className="typo-total">{m2(t.total)} <span>m² totales</span></p>
            <dl>
              <div><dt>Interior</dt><dd>{m2(t.interior)} m²</dd></div>
              <div><dt>Terraza</dt><dd>{m2(t.terrace)} m²</dd></div>
            </dl>
            <a href="#contacto" className="typo-link"
              onClick={() => window.dispatchEvent(new CustomEvent('select-typology', { detail: t.name }))}>
              Solicitar información →
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
