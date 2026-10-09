import { CONTACT } from './content.js'
import { track } from './track.js'

// wa.me link with a pre-filled message that says where on the page the visitor came from,
// so the advisor knows what they were looking at. Returns null while no number is configured.
export function whatsappUrl(context) {
  if (!CONTACT.whatsapp) return null
  const text = context ? `${CONTACT.whatsappMessage} (Me interesa: ${context})` : CONTACT.whatsappMessage
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`
}

export const trackWhatsapp = (location) => track('whatsapp_click', { location })
