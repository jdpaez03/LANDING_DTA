import { SITE_PAGES } from '../content.js'

// Closing link of each page to the next one in the menu, so the site still reads as one walk
export default function PageNext({ current }) {
  const next = SITE_PAGES[SITE_PAGES.findIndex((p) => p.key === current) + 1]
  if (!next) return null
  return (
    <nav className="page-next" aria-label="Siguiente página">
      <a href={next.path}>
        <span className="page-next-label">Continúa en</span>
        <span className="page-next-title">{next.label} <span aria-hidden="true">→</span></span>
      </a>
    </nav>
  )
}
