import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Concept from './components/Concept.jsx'
import Highlights from './components/Highlights.jsx'
import Club from './components/Club.jsx'
import Amenities from './components/Amenities.jsx'
import Gallery from './components/Gallery.jsx'
import Typologies from './components/Typologies.jsx'
import Location from './components/Location.jsx'
import Developers from './components/Developers.jsx'
import LeadForm from './components/LeadForm.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Concept />
        <Club />
        <Amenities />
        <Gallery />
        <Typologies />
        <Location />
        <Developers />
        <LeadForm />
      </main>
      <Footer />
    </>
  )
}
