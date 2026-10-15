import { useEffect } from 'react'
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
import PageHero from './components/PageHero.jsx'
import PageNext from './components/PageNext.jsx'
import PrivacyNotice from './components/legal/PrivacyNotice.jsx'
import LegalNotice from './components/legal/LegalNotice.jsx'
import Landing from './components/Landing.jsx'
import { LEGAL_URL, PRIVACY_URL, RENDERS, SITE_PAGES } from './content.js'
import { campaign } from './track.js'

// Remember the campaign parameters of the page they arrived on, before they move between pages
campaign()

// Content of each page of the full site. Pages open on a full-screen render (Hero, a scene or
// PageHero) and end with the short form (#contacto); pages that open on a scene get a hidden h1.
const SITE = {
  inicio: () => (
    <>
      <Hero />
      <OriginScene />
      <Facts />
      <LeadStrip location="inicio" title="Conoce Torre Acqua de cerca." />
    </>
  ),
  club: () => (
    <>
      <h1 className="sr-only">Club Sonoma</h1>
      <ClubScene />
      <ClubMap />
      <Community />
      <LeadStrip location="club" title="Conoce el club en persona." />
    </>
  ),
  residencias: () => (
    <>
      <h1 className="sr-only">Torre Acqua</h1>
      <ViewScene />
      <Residences />
      <AmenitiesScene />
      <Filmstrip />
      <LeadStrip location="residencias" title="¿Te interesa una residencia?" />
    </>
  ),
  ubicacion: () => (
    <>
      <h1 className="sr-only">Ubicación</h1>
      <LocationScene />
      <LeadStrip location="ubicacion" title="Visítanos." />
    </>
  ),
  equipo: () => (
    <>
      <PageHero render={RENDERS.motorLobby} title="La suma de dos grandes desarrolladores. Una sola visión." />
      <Developers title={null} />
      <LeadStrip location="equipo" title="Hablemos." />
    </>
  ),
  contacto: () => (
    <>
      <PageHero render={RENDERS.nocturna} title="Hablemos." />
      <LeadStrip location="contacto" title="Agenda tu visita privada." />
      <Faq />
    </>
  ),
}

// Minimal path routing; the server must send index.html for these paths (see README).
// The root (and any unknown path) is the entry landing; the full site lives under SITE_URL.
const LEGAL_PAGES = { [PRIVACY_URL]: PrivacyNotice, [LEGAL_URL]: LegalNotice }

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '')
  const page = SITE_PAGES.find((p) => p.path === path)
  if (page) return <Site page={page} />
  const Page = LEGAL_PAGES[path] || Landing
  return <Page />
}

// Every page shares the header (menu), the level indicator (scrolling climbs the tower), the
// link on to the next page and the footer
function Site({ page }) {
  useEffect(() => {
    document.title = page.key === 'inicio' ? 'Torre Acqua · Sonoma Club & Residences' : `${page.label} · Torre Acqua`
  }, [page])
  const Content = SITE[page.key]
  return (
    <>
      <Header current={page.key} />
      <FloorIndicator />
      <main>
        <Content />
        <PageNext current={page.key} />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
