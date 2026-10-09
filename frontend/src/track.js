// Pushes conversion events to window.dataLayer (Google Tag Manager).
// Harmless until a GTM container or Meta Pixel is installed in index.html.
export function track(event, data = {}) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...data })
}

// Any call to action can open a lead form with an intent and/or typology preselected.
// Every LeadForm on the page listens; the CTA's href scrolls to the nearest one.
export function requestLead({ intent, interest } = {}) {
  window.dispatchEvent(new CustomEvent('lead-request', { detail: { intent, interest } }))
}
