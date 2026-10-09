import { LEGAL, LEGAL_URL, LOCATION, PRELIMINARY_LONG, PRIVACY_URL } from '../content.js'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Logo variant="principal" height={88} />
        <div className="footer-text">
          <p>Torre Acqua en Sonoma Club &amp; Residences</p>
          <p>{LOCATION.address}</p>
          <ul className="footer-links">
            <li><a href={PRIVACY_URL}>Aviso de privacidad</a></li>
            <li><a href={LEGAL_URL}>Aviso legal</a></li>
          </ul>
          <p className="fine">{PRELIMINARY_LONG}</p>
          <p className="fine">{LEGAL}</p>
          <p className="fine">© {new Date().getFullYear()} PAGA Desarrollos y Grupo DAGS</p>
        </div>
      </div>
    </footer>
  )
}
