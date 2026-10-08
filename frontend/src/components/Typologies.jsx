import { useState } from 'react'
import { TYPOLOGIES } from '../content.js'

const m2 = (n) => n.toLocaleString('es-MX', { minimumFractionDigits: 2 })

// Tells LeadForm which typology to pre-select
const selectInForm = (name) => window.dispatchEvent(new CustomEvent('select-typology', { detail: name }))

export default function Typologies() {
  const [activeId, setActiveId] = useState(TYPOLOGIES[0].id)
  const [planIdx, setPlanIdx] = useState(0)
  const t = TYPOLOGIES.find((x) => x.id === activeId)
  const plan = t.plans[planIdx]

  const choose = (id) => {
    setActiveId(id)
    setPlanIdx(0)
  }

  return (
    <section id="residencias" className="section typologies">
      <p className="kicker">136 residencias · 6 tipologías</p>
      <h2 className="title">Una residencia <em>para cada etapa.</em></h2>
      <p className="intro">
        Terraza en cada residencia y recámaras con baño completo. Penthouses de un departamento
        por nivel, del 42 al 49. Elige una tipología para ver su plano.
      </p>

      <div className="typo-explorer">
        <div className="typo-menu" role="tablist" aria-label="Tipologías">
          {TYPOLOGIES.map((x) => (
            <button
              key={x.id}
              role="tab"
              id={`tab-${x.id}`}
              aria-selected={x.id === activeId}
              aria-controls="typo-panel"
              className={`typo-tab ${x.id === activeId ? 'active' : ''}`}
              onClick={() => choose(x.id)}
            >
              <span className="typo-tab-name">{x.name}</span>
              <span className="typo-tab-program">{x.program.split(' · ')[0]}</span>
              <span className="typo-tab-area">{m2(x.total)} <small>m²</small></span>
            </button>
          ))}
        </div>

        {/* key forces a remount so the fade-in animation replays on every switch */}
        <div key={`${t.id}-${planIdx}`} id="typo-panel" role="tabpanel" aria-labelledby={`tab-${t.id}`} className="typo-panel">
          <div className="plan-image">
            {t.plans.length > 1 && (
              <div className="plan-toggle" role="group" aria-label="Variante">
                {t.plans.map((p, i) => (
                  <button key={p.file} aria-pressed={i === planIdx}
                    className={i === planIdx ? 'active' : ''} onClick={() => setPlanIdx(i)}>
                    {p.label}
                  </button>
                ))}
              </div>
            )}
            <img src={`/img/planos/${plan.file}.webp`} alt={`Plano ${t.name} ${t.plans.length > 1 ? plan.label : ''}`} />
          </div>

          <div className="plan-info">
            <p className="kicker">{t.program}</p>
            <h3>{t.name}</h3>
            <p className="plan-total">{m2(t.total)} <span>m² totales</span></p>
            <ol className="rooms">
              {t.rooms.map(([name, area, opts], i) => (
                <li key={name} className={opts?.excluded ? 'excluded' : ''}>
                  <span className="room-num">{i + 1}</span>
                  <span className="room-name">{name}{opts?.excluded && '*'}</span>
                  <span className="room-area">{m2(area)} m²</span>
                </li>
              ))}
            </ol>
            <dl className="plan-sums">
              <div><dt>Área interior</dt><dd>{m2(t.interior)} m²</dd></div>
              <div><dt>Área exterior</dt><dd>{m2(t.terrace)} m²</dd></div>
            </dl>
            {t.rooms.some(([, , o]) => o?.excluded) && <p className="plan-note">* No se suma al área total.</p>}
            <a href="#contacto" className="btn btn-primary" onClick={() => selectInForm(t.name)}>
              Me interesa el {t.name}
            </a>
            <p className="plan-note">Planos y áreas ilustrativos, sujetos a cambio sin previo aviso.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
