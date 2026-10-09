import { LEGAL, LOCATION, PRIVACY_URL } from '../content.js'
import Logo from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Logo variant="principal" height={88} />
        <div className="footer-text">
          <p>Torre Acqua en Sonoma Club &amp; Residences</p>
          <p>{LOCATION.address}</p>
          {PRIVACY_URL && <p><a href={PRIVACY_URL} target="_blank" rel="noreferrer">Aviso de privacidad</a></p>}
          <p className="fine">{LEGAL}</p>
          <p className="fine">© {new Date().getFullYear()} PAGA Desarrollos y Grupo DAGS</p>
        </div>
      </div>
    </footer>
  )
}
