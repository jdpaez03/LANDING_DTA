import { useEffect } from 'react'
import Logo from '../Logo.jsx'
import Footer from '../Footer.jsx'
import { SITE_URL } from '../../content.js'

// Placeholder for data the legal team still has to provide; highlighted so it is never published by mistake
export function Pending({ children }) {
  return <mark className="pending">[Pendiente: {children}]</mark>
}

// Shared shell for the legal pages: plain header back to the site, readable column, site footer
export default function LegalLayout({ title, updated, children }) {
  useEffect(() => {
    document.title = `${title} | Torre Acqua`
    window.scrollTo(0, 0)
  }, [title])

  return (
    <>
      <header className="legal-header">
        <a href={SITE_URL} className="brand" aria-label="Torre Acqua, volver al sitio">
          <Logo variant="horizontal" height={32} />
        </a>
        <a href={SITE_URL} className="link">Volver al sitio</a>
      </header>
      <main className="legal">
        <p className="legal-status">Versión preliminar</p>
        <h1 className="title">{title}</h1>
        {updated && <p className="legal-updated">Última actualización: {updated}</p>}
        {children}
      </main>
      <Footer />
    </>
  )
}
