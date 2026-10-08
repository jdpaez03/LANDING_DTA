import { LEGAL } from '../content.js'
import Isotipo from './Isotipo.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <Isotipo size={40} />
      <p>Torre ACQUA · Sonoma Club &amp; Residences</p>
      <p className="muted">{LEGAL}</p>
      <p className="muted">© {new Date().getFullYear()}</p>
    </footer>
  )
}
