import { FACTS } from '../content.js'

export default function Highlights() {
  return (
    <section className="highlights">
      {FACTS.map((item) => (
        <div key={item.label} className="highlight">
          <span className="highlight-value">{item.value}</span>
          <span className="highlight-label">{item.label}</span>
        </div>
      ))}
    </section>
  )
}
