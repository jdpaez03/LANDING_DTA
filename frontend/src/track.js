// Pushes conversion events to window.dataLayer (Google Tag Manager).
// Harmless until a GTM container or Meta Pixel is installed in index.html.
export function track(event, data = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...data })
}

// A typology button tells every LeadForm on the page which residence the visitor looked at
export function requestLead({ interest } = {}) {
  window.dispatchEvent(new CustomEvent('lead-request', { detail: { interest } }))
}
