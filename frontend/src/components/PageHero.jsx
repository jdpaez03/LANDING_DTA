import Picture from './Picture.jsx'

// Opening of the pages that do not start on a full-screen scene: a render with the page headline
export default function PageHero({ render, title }) {
  return (
    <section className="hero page-hero">
      <Picture file={render.file} alt={render.caption} sizes="100vw" eager priority="high" className="hero-img" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-text">
        <h1 className="hero-title">{title}</h1>
      </div>
    </section>
  )
}
