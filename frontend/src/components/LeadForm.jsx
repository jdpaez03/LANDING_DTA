import { useEffect, useId, useState } from 'react'
import { INTENTS, PRIVACY_URL, TYPOLOGIES } from '../content.js'
import { track } from '../track.js'
import { trackWhatsapp, whatsappUrl } from '../whatsapp.js'

const EMPTY = { name: '', phone: '', email: '', message: '', privacy: false, website: '' }

// Campaign attribution from the landing URL (?utm_source=...&utm_medium=...&utm_campaign=...)
function readUtm() {
  const p = new URLSearchParams(window.location.search)
  return { utm_source: p.get('utm_source'), utm_medium: p.get('utm_medium'), utm_campaign: p.get('utm_campaign') }
}

async function post(url, method, body) {
  const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  if (!res.ok) {
    const err = new Error(res.status === 422
      ? 'Revisa tu correo y tu número de WhatsApp.'
      : 'No pudimos enviar tus datos. Intenta de nuevo en un momento.')
    err.status = res.status
    throw err
  }
  return res.json()
}

// Step 1: what they want + name, WhatsApp, email (+ message in the full variant).
// Step 2 (optional): typology, purpose, broker, best time to call. Then a thank-you.
export default function LeadForm({ variant = 'full', location }) {
  const uid = useId()
  const id = (n) => `${uid}-${n}`
  const [step, setStep] = useState('contact') // contact | qualify | done
  const [intent, setIntent] = useState('visita')
  const [interest, setInterest] = useState('')
  const [form, setForm] = useState(EMPTY)
  const [qualify, setQualify] = useState({ purpose: '', is_broker: '', contact_time: '' })
  const [publicId, setPublicId] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  // A CTA elsewhere on the page can preselect the intent and/or typology
  useEffect(() => {
    const onRequest = (e) => {
      if (e.detail.intent) setIntent(e.detail.intent)
      if (e.detail.interest) setInterest(e.detail.interest)
    }
    window.addEventListener('lead-request', onRequest)
    return () => window.removeEventListener('lead-request', onRequest)
  }, [])

  const update = (e) => {
    const { name, type, checked, value } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }
  const chosen = INTENTS.find((i) => i.id === intent)

  async function sendContact(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const out = await post('/api/leads', 'POST', {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        intent,
        interest: interest || null,
        message: form.message.trim() || null,
        privacy_accepted: form.privacy,
        website: form.website || null,
        form_location: location,
        ...readUtm(),
      })
      track('generate_lead', { form_location: location, intent, interest: interest || 'sin definir' })
      setPublicId(out.public_id)
      setFirstName(form.name.trim().split(/\s+/)[0])
      setStep('qualify')
    } catch (err) {
      setError(err.status ? err.message : 'Sin conexión. Revisa tu internet e intenta de nuevo.')
    } finally {
      setBusy(false)
    }
  }

  async function sendQualify(e) {
    e.preventDefault()
    setBusy(true)
    const body = {}
    if (interest) body.interest = interest
    if (qualify.purpose) body.purpose = qualify.purpose
    if (qualify.is_broker) body.is_broker = qualify.is_broker === 'si'
    if (qualify.contact_time) body.contact_time = qualify.contact_time
    // Step 2 is a bonus: the lead is already saved, so a failure here never blocks the thank-you
    try {
      if (Object.keys(body).length) await post(`/api/leads/${publicId}`, 'PATCH', body)
      track('lead_qualified', { form_location: location, ...body })
    } catch { /* ignored on purpose */ }
    setBusy(false)
    setStep('done')
  }

  if (step === 'done') {
    const wa = whatsappUrl(interest || chosen.label)
    return (
      <div className="lead-done" role="status">
        <h3>Gracias, {firstName}.</h3>
        <p>{chosen.done}</p>
        {wa && (
          <a className="btn btn-primary" href={wa} target="_blank" rel="noreferrer" onClick={() => trackWhatsapp(`${location}-gracias`)}>
            Escribir ahora por WhatsApp
          </a>
        )}
      </div>
    )
  }

  if (step === 'qualify') {
    return (
      <form className="lead-form" onSubmit={sendQualify} aria-labelledby={id('q-title')}>
        <div className="lead-qualify-head full">
          <h3 id={id('q-title')}>Listo, {firstName}. Ya tenemos tus datos.</h3>
          <p>Si nos cuentas un poco más, tu asesor llega con la información correcta. Es opcional.</p>
        </div>
        <div className="field">
          <label htmlFor={id('interest2')}>Residencia que te interesa</label>
          <select id={id('interest2')} value={interest} onChange={(e) => setInterest(e.target.value)}>
            <option value="">Aún no lo sé</option>
            {TYPOLOGIES.map((t) => <option key={t.id} value={t.name}>{t.name}, {t.beds} recámaras</option>)}
          </select>
        </div>
        <fieldset className="field">
          <legend>La compra es para</legend>
          <div className="choice-row">
            {[['vivir', 'Vivir'], ['invertir', 'Invertir']].map(([v, l]) => (
              <label key={v} className={`choice ${qualify.purpose === v ? 'on' : ''}`}>
                <input type="radio" name={id('purpose')} value={v} checked={qualify.purpose === v}
                  onChange={() => setQualify((q) => ({ ...q, purpose: v }))} />{l}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="field">
          <legend>Mejor horario para llamarte</legend>
          <div className="choice-row">
            {[['manana', 'Mañana'], ['tarde', 'Tarde'], ['noche', 'Noche']].map(([v, l]) => (
              <label key={v} className={`choice ${qualify.contact_time === v ? 'on' : ''}`}>
                <input type="radio" name={id('time')} value={v} checked={qualify.contact_time === v}
                  onChange={() => setQualify((q) => ({ ...q, contact_time: v }))} />{l}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="field">
          <legend>¿Eres asesor inmobiliario?</legend>
          <div className="choice-row">
            {[['no', 'No'], ['si', 'Sí, soy broker']].map(([v, l]) => (
              <label key={v} className={`choice ${qualify.is_broker === v ? 'on' : ''}`}>
                <input type="radio" name={id('broker')} value={v} checked={qualify.is_broker === v}
                  onChange={() => setQualify((q) => ({ ...q, is_broker: v }))} />{l}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="lead-actions full">
          <button className="btn btn-primary" disabled={busy}>{busy ? 'Guardando…' : 'Terminar'}</button>
          <button type="button" className="btn-text" onClick={() => setStep('done')}>Omitir</button>
        </div>
      </form>
    )
  }

  return (
    <form className={`lead-form ${variant}`} onSubmit={sendContact}>
      <fieldset className="intent full">
        <legend>¿Qué te gustaría recibir?</legend>
        <div className="intent-options">
          {INTENTS.map((i) => (
            <label key={i.id} className={`intent-option ${intent === i.id ? 'on' : ''}`}>
              <input type="radio" name={id('intent')} value={i.id} checked={intent === i.id} onChange={() => setIntent(i.id)} />
              {i.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor={id('name')}>Nombre</label>
        <input id={id('name')} name="name" value={form.name} onChange={update} required minLength={2} autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor={id('phone')}>WhatsApp</label>
        <input id={id('phone')} type="tel" name="phone" value={form.phone} onChange={update} required minLength={10}
          autoComplete="tel" inputMode="tel" placeholder="10 dígitos" />
      </div>
      <div className={`field ${variant === 'compact' ? 'full' : ''}`}>
        <label htmlFor={id('email')}>Correo</label>
        <input id={id('email')} type="email" name="email" value={form.email} onChange={update} required autoComplete="email" />
      </div>
      {variant === 'full' && (
        <div className="field">
          <label htmlFor={id('interest')}>Residencia de interés</label>
          <select id={id('interest')} value={interest} onChange={(e) => setInterest(e.target.value)}>
            <option value="">Aún no lo sé</option>
            {TYPOLOGIES.map((t) => <option key={t.id} value={t.name}>{t.name}, {t.beds} recámaras</option>)}
          </select>
        </div>
      )}
      {variant === 'full' && (
        <div className="field full">
          <label htmlFor={id('message')}>Mensaje <span className="optional">opcional</span></label>
          <textarea id={id('message')} name="message" rows={3} value={form.message} onChange={update} />
        </div>
      )}
      {variant === 'compact' && interest && (
        <p className="interest-note full">Residencia: <strong>{interest}</strong>
          <button type="button" className="btn-text" onClick={() => setInterest('')}>Quitar</button>
        </p>
      )}

      {/* Honeypot: off-screen and skipped by keyboard; real visitors never fill it */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={id('website')}>Sitio web</label>
        <input id={id('website')} name="website" value={form.website} onChange={update} tabIndex={-1} autoComplete="off" />
      </div>

      <label className="consent full" htmlFor={id('privacy')}>
        <input id={id('privacy')} type="checkbox" name="privacy" checked={form.privacy} onChange={update} required />
        <span>
          Acepto el{' '}
          {PRIVACY_URL ? <a href={PRIVACY_URL} target="_blank" rel="noreferrer">aviso de privacidad</a> : 'aviso de privacidad'}
          {' '}y que un asesor me contacte por WhatsApp.
        </span>
      </label>

      {error && <p className="form-error full" role="alert">{error}</p>}
      <button className="btn btn-primary full" disabled={busy}>{busy ? 'Enviando…' : chosen.button}</button>
    </form>
  )
}
