import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Facts from './components/Facts.jsx'
import { AmenitiesScene, ClubScene, LocationScene, OriginScene, ViewScene } from './components/Scenes.jsx'
import ClubMap from './components/ClubMap.jsx'
import Community from './components/Community.jsx'
import Residences from './components/Residences.jsx'
import Filmstrip from './components/Filmstrip.jsx'
import Developers from './components/Developers.jsx'
import LeadStrip from './components/LeadStrip.jsx'
import Faq from './components/Faq.jsx'
import Footer from './components/Footer.jsx'
import MobileBar from './components/MobileBar.jsx'
import FloorIndicator from './components/FloorIndicator.jsx'
import PrivacyNotice from './components/legal/PrivacyNotice.jsx'
import LegalNotice from './components/legal/LegalNotice.jsx'
import Landing from './components/Landing.jsx'
import { LEGAL_URL, PRIVACY_URL, SITE_URL } from './content.js'

// Minimal path routing; the server must send index.html for these paths (see README).
// The root (and any unknown path) is the entry landing; the full site lives at SITE_URL.
const PAGES = { [PRIVACY_URL]: PrivacyNotice, [LEGAL_URL]: LegalNotice, [SITE_URL]: Site }

export default function App() {
  const Page = PAGES[window.location.pathname.replace(/\/$/, '')] || Landing
  return <Page />
}

// Immersive sequence: full-screen scenes (render pinned, text scrolling over it) alternate with
// calm editorial sections. Scrolling the page "climbs" the tower (FloorIndicator).
// Short data-capture forms (LeadStrip) along the way, so nobody has to reach the end to leave their data;
// the last one (#contacto) is where the Contacto button and the calls to action lead.
function Site() {
  return (
    <>
      <Header />
      <FloorIndicator />
      <main>
        <Hero />
        <OriginScene />
        <Facts />
        <ClubScene />
        <ClubMap />
        <Community />
        <LeadStrip id="form-comunidad" title="Conoce Torre Acqua de cerca." />
        <ViewScene />
        <Residences />
        <LeadStrip id="form-residencias" title="¿Te interesa una residencia?" />
        <AmenitiesScene />
        <Filmstrip />
        <LocationScene />
        <LeadStrip id="contacto" title="Hablemos." />
        <Developers />
        <Faq />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
