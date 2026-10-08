import { useEffect, useState } from 'react'
import { TYPOLOGIES } from '../content.js'

const EMPTY = { name: '', email: '', phone: '', interest: '', message: '' }

// Campaign attribution from the landing URL (?utm_source=...&utm_medium=...&utm_campaign=...)
function readUtm() {
  const p = new URLSearchParams(window.location.search)
  return {
    utm_source: p.get('utm_source'),
    utm_medium: p.get('utm_medium'),
    utm_campaign: p.get('utm_campaign'),
  }
}

export default function LeadForm() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const [error, setError] = useState('')

  // Pre-select the typology when the user clicks "Solicitar información" on a card
  useEffect(() => {
    const onSelect = (e) => setForm((f) => ({ ...f, interest: e.detail }))
    window.addEventListener('select-typology', onSelect)
    return () => window.removeEventListener('select-typology', onSelect)
  }, [])

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          interest: form.interest || null,
          message: form.message || null,
          ...readUtm(),
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.detail?.[0]?.msg || 'No pudimos enviar tus datos.')
      }
      setStatus('ok')
      setForm(EMPTY)
    } catch (err) {
      setStatus('error')
      setError(err.message)
    }
  }

  return (
    <section id="contacto" className="contact">
      <div className="contact-copy">
        <p className="kicker">Agenda tu visita</p>
        <h2 className="title">Conoce <em>Torre Acqua.</em></h2>
        <p>Déjanos tus datos y un asesor te contactará para compartirte disponibilidad y agendar una visita a Sonoma.</p>
      </div>

      {status === 'ok' ? (
        <div className="form-success">
          <h3>¡Gracias!</h3>
          <p>Recibimos tu información. Un asesor se pondrá en contacto contigo muy pronto.</p>
        </div>
      ) : (
        <form className="form" onSubmit={submit}>
          <label>Nombre completo
            <input name="name" value={form.name} onChange={update} required minLength={2} autoComplete="name" />
          </label>
          <label>Teléfono
            <input type="tel" name="phone" value={form.phone} onChange={update} required minLength={7} autoComplete="tel" />
          </label>
          <label>Correo electrónico
            <input type="email" name="email" value={form.email} onChange={update} required autoComplete="email" />
          </label>
          <label>Residencia de interés
            <select name="interest" value={form.interest} onChange={update}>
              <option value="">Aún no lo sé</option>
              {TYPOLOGIES.map((t) => (
                <option key={t.id} value={t.name}>{t.name} · {t.program.split(' · ')[0]}</option>
              ))}
            </select>
          </label>
          <label className="full">Mensaje (opcional)
            <textarea name="message" rows={3} value={form.message} onChange={update} />
          </label>
          {status === 'error' && <p className="form-error full">{error}</p>}
          <button className="btn btn-primary full" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando…' : 'Quiero que me contacten'}
          </button>
        </form>
      )}
    </section>
  )
}
