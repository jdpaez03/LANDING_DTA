import { useState } from 'react'
import { TYPOLOGIES } from '../content.js'
import { requestLead } from '../track.js'

const m2 = (n) => n.toLocaleString('es-MX', { minimumFractionDigits: 2 })

export default function Residences() {
  const [activeId, setActiveId] = useState(TYPOLOGIES[0].id)
  const [planIdx, setPlanIdx] = useState(0)
  const t = TYPOLOGIES.find((x) => x.id === activeId)
  const plan = t.plans[planIdx]

  return (
    <section id="residencias" className="residences">
      <div className="residences-head">
        <h2 className="title">Seis maneras de vivir Acqua.</h2>
        <p className="residences-lede">De 2 recámaras a penthouse.</p>
      </div>

      <div className="residences-body">
        <ul className="type-index" role="tablist" aria-label="Tipologías">
          {TYPOLOGIES.map((x) => (
            <li key={x.id} role="presentation">
              <button role="tab" id={`tab-${x.id}`} aria-selected={x.id === activeId} aria-controls="type-panel"
                className={x.id === activeId ? 'active' : ''} onClick={() => { setActiveId(x.id); setPlanIdx(0) }}>
                <span className="type-name">{x.name}</span>
                <span className="type-beds">{x.beds} recámaras</span>
                <span className="type-area">{Math.round(x.total)} m²</span>
              </button>
            </li>
          ))}
        </ul>

        <div key={`${t.id}-${planIdx}`} id="type-panel" role="tabpanel" aria-labelledby={`tab-${t.id}`} className="type-panel">
          <figure className="type-plan">
            <img src={`/img/planos/${plan.file}.webp`} alt={`Plano ${t.name}${t.plans.length > 1 ? ` ${plan.label}` : ''}`} />
            {t.plans.length > 1 && (
              <div className="plan-variants" role="group" aria-label="Variante del plano">
                {t.plans.map((p, i) => (
                  <button key={p.file} aria-pressed={i === planIdx} className={i === planIdx ? 'active' : ''} onClick={() => setPlanIdx(i)}>
                    {p.label}
                  </button>
                ))}
              </div>
            )}
          </figure>

          <div className="type-data">
            <h3>{t.name}</h3>
            <p className="type-program">{t.program}</p>
            <dl className="type-areas">
              <div><dt>Total</dt><dd>{m2(t.total)} m²</dd></div>
              <div><dt>Interior</dt><dd>{m2(t.interior)} m²</dd></div>
              <div><dt>Terraza</dt><dd>{m2(t.terrace)} m²</dd></div>
            </dl>
            <details className="rooms">
              <summary>Áreas por espacio</summary>
              <ol>
                {t.rooms.map(([name, area, opts], i) => (
                  <li key={name} className={opts?.excluded ? 'excluded' : ''}>
                    <span>{i + 1}</span><span>{name}{opts?.excluded && '*'}</span><span>{m2(area)}</span>
                  </li>
                ))}
              </ol>
              {t.rooms.some(([, , o]) => o?.excluded) && <p className="fine">*No se suma al área total.</p>}
            </details>
            <a href="#form-residencias" className="btn btn-primary" onClick={() => requestLead({ interest: t.name })}>
              Recibir precio y disponibilidad
            </a>
            <p className="fine">Planos y áreas ilustrativos, sujetos a cambio sin previo aviso.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
