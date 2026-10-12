import { useEffect, useId, useState } from 'react'
import { PRIVACY_URL, PRIVACY_VERSION } from '../content.js'
import { track } from '../track.js'
import { trackWhatsapp, whatsappUrl } from '../whatsapp.js'

const EMPTY = { name: '', phone: '', email: '', privacy: false, website: '' }
const SAVED_KEY = 'acqua-lead'

// Once a visitor leaves their data in any form, the other forms on the page thank them instead
// of asking again (per tab; storage can be unavailable, so every access is guarded)
function savedName() {
  try { return sessionStorage.getItem(SAVED_KEY) || '' } catch { return '' }
}
function rememberLead(firstName, source) {
  try { sessionStorage.setItem(SAVED_KEY, firstName) } catch { /* not critical */ }
  window.dispatchEvent(new CustomEvent('lead-saved', { detail: { firstName, source } }))
}

// Campaign attribution from the landing URL (?utm_source=...&utm_medium=...&utm_campaign=...)
function readUtm() {
  const p = new URLSearchParams(window.location.search)
  return { utm_source: p.get('utm_source'), utm_medium: p.get('utm_medium'), utm_campaign: p.get('utm_campaign') }
}

// Data capture only: name, WhatsApp and email, then a thank-you. Every form on the page is this one.
export default function LeadForm({ location }) {
  const uid = useId()
  const id = (n) => `${uid}-${n}`
  const [step, setStep] = useState(() => (savedName() ? 'known' : 'contact')) // contact | done | known
  const [interest, setInterest] = useState('')
  const [form, setForm] = useState(EMPTY)
  const [firstName, setFirstName] = useState(savedName)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // A typology button (Residences) tells the forms which residence they looked at
    const onRequest = (e) => { if (e.detail.interest) setInterest(e.detail.interest) }
    // Another form on the page already has their data
    const onSaved = (e) => {
      if (e.detail.source === uid) return
      setFirstName(e.detail.firstName)
      setStep((s) => (s === 'contact' ? 'known' : s))
    }
    window.addEventListener('lead-request', onRequest)
    window.addEventListener('lead-saved', onSaved)
    return () => {
      window.removeEventListener('lead-request', onRequest)
      window.removeEventListener('lead-saved', onSaved)
    }
  }, [])

  const update = (e) => {
    const { name, type, checked, value } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  async function send(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          interest: interest || null,
          privacy_accepted: form.privacy,
          privacy_version: PRIVACY_VERSION,
          website: form.website || null,
          form_location: location,
          ...readUtm(),
        }),
      })
      if (!res.ok) {
        setError(res.status === 422
          ? 'Revisa tu correo y tu número de WhatsApp.'
          : 'No pudimos enviar tus datos. Intenta de nuevo en un momento.')
        return
      }
      track('generate_lead', { form_location: location, interest: interest || 'sin definir' })
      const first = form.name.trim().split(/\s+/)[0]
      setFirstName(first)
      setStep('done')
      rememberLead(first, uid)
    } catch {
      setError('Sin conexión. Revisa tu internet e intenta de nuevo.')
    } finally {
      setBusy(false)
    }
  }

  if (step !== 'contact') {
    const wa = whatsappUrl(interest)
    return (
      <div className="lead-done" role="status">
        <h3>Gracias{firstName ? `, ${firstName}` : ''}. Ya tenemos tus datos.</h3>
        <p>Un asesor te escribirá por WhatsApp.</p>
        {step === 'done' && wa && (
          <a className="btn btn-primary" href={wa} target="_blank" rel="noreferrer" onClick={() => trackWhatsapp(`${location}-gracias`)}>
            Escribir ahora por WhatsApp
          </a>
        )}
      </div>
    )
  }

  return (
    <form className="lead-form" onSubmit={send}>
      <div className="field">
        <label htmlFor={id('name')}>Nombre</label>
        <input id={id('name')} name="name" value={form.name} onChange={update} required minLength={2} autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor={id('phone')}>WhatsApp</label>
        <input id={id('phone')} type="tel" name="phone" value={form.phone} onChange={update} required minLength={10}
          autoComplete="tel" inputMode="tel" placeholder="10 dígitos" />
      </div>
      <div className="field">
        <label htmlFor={id('email')}>Correo</label>
        <input id={id('email')} type="email" name="email" value={form.email} onChange={update} required autoComplete="email" />
      </div>
      {interest && (
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
          <a href={PRIVACY_URL} target="_blank" rel="noreferrer">aviso de privacidad</a>
          {' '}y que un asesor me contacte por WhatsApp.
        </span>
      </label>

      {error && <p className="form-error full" role="alert">{error}</p>}
      <button className="btn btn-primary submit" disabled={busy}>{busy ? 'Enviando…' : 'Quiero que me contacten'}</button>
    </form>
  )
}
