import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Facts from './components/Facts.jsx'
import { AmenitiesScene, ClubScene, LocationScene, OriginScene, ViewScene } from './components/Scenes.jsx'
import ClubMap from './components/ClubMap.jsx'
import Residences from './components/Residences.jsx'
import Filmstrip from './components/Filmstrip.jsx'
import Developers from './components/Developers.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import MobileBar from './components/MobileBar.jsx'
import FloorIndicator from './components/FloorIndicator.jsx'

// Immersive sequence: full-screen scenes (render pinned, text scrolling over it) alternate with
// calm editorial sections. Scrolling the page "climbs" the tower (FloorIndicator) up to the form.
export default function App() {
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
