import { LEGAL } from '../content.js'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <Logo variant="isotipo" height={56} />
      <p>Torre ACQUA · Sonoma Club &amp; Residences</p>
      <p className="muted">{LEGAL}</p>
      <p className="muted">© {new Date().getFullYear()}</p>
    </footer>
  )
}
