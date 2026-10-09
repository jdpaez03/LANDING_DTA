import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Facts from './components/Facts.jsx'
import { AmenitiesScene, ClubScene, LocationScene, OriginScene, ViewScene } from './components/Scenes.jsx'
import ClubMap from './components/ClubMap.jsx'
import Community from './components/Community.jsx'
import Residences from './components/Residences.jsx'
import Filmstrip from './components/Filmstrip.jsx'
import Developers from './components/Developers.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import MobileBar from './components/MobileBar.jsx'
import FloorIndicator from './components/FloorIndicator.jsx'
import PrivacyNotice from './components/legal/PrivacyNotice.jsx'
import LegalNotice from './components/legal/LegalNotice.jsx'
import { LEGAL_URL, PRIVACY_URL } from './content.js'

// Minimal path routing; the server must send index.html for these paths (see README)
const PAGES = { [PRIVACY_URL]: PrivacyNotice, [LEGAL_URL]: LegalNotice }

// Immersive sequence: full-screen scenes (render pinned, text scrolling over it) alternate with
// calm editorial sections. Scrolling the page "climbs" the tower (FloorIndicator) up to the form.
export default function App() {
  const Page = PAGES[window.location.pathname.replace(/\/$/, '')]
  if (Page) return <Page />

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
        <ViewScene />
        <Residences />
        <AmenitiesScene />
        <Filmstrip />
        <LocationScene />
        <Developers />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
