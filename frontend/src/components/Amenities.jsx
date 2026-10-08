import { AMENITIES } from '../content.js'
import DropImage from './DropImage.jsx'

export default function Amenities() {
  return (
    <section id="amenidades" className="section amenities">
      <div className="split">
        <div>
          <p className="kicker">1,656 m² de amenidades propias</p>
          <h2 className="title">Espacio <em>en tu vida.</em></h2>
        </div>
        <DropImage label="Render amenidades N41" />
      </div>
      <div className="columns">
        {AMENITIES.map((a) => (
          <div key={a.level} className="card">
            <h3>{a.level}</h3>
            <ul>{a.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  )
}
