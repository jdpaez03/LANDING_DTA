// Pushes conversion events to window.dataLayer (Google Tag Manager).
// Harmless until a GTM container or Meta Pixel is installed in index.html.
export function track(event, data = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...data })
}

// Campaign attribution (?utm_source=...&utm_medium=...&utm_campaign=...). The site has several pages,
// so the parameters of the page they arrived on are kept for the visit and sent with any lead.
const UTM_KEY = 'acqua_utm'
const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign']

export function campaign() {
  const p = new URLSearchParams(window.location.search)
  const fromUrl = Object.fromEntries(UTM_FIELDS.map((k) => [k, p.get(k)]))
  try {
    if (UTM_FIELDS.some((k) => fromUrl[k])) sessionStorage.setItem(UTM_KEY, JSON.stringify(fromUrl))
    else return JSON.parse(sessionStorage.getItem(UTM_KEY)) || fromUrl
  } catch { /* storage blocked: only this page's parameters */ }
  return fromUrl
}

// A typology button tells every LeadForm on the page which residence the visitor looked at
export function requestLead({ interest } = {}) {
  window.dispatchEvent(new CustomEvent('lead-request', { detail: { interest } }))
}
