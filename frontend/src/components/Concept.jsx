import DropImage from './DropImage.jsx'

export default function Concept() {
  return (
    <section className="section split">
      <div>
        <h2 className="title">Hay lugares que no solo se habitan, <em>se sienten.</em></h2>
        <p>ACQUA nació del agua: de su calma, su claridad, su profundidad.</p>
        <p>
          La torre más alta de Sonoma nace del bosque: una base de celosías de madera iluminada
          y una corona con vistas abiertas al cerro y a la ciudad.
        </p>
        <p className="quote">Acqua no es solo un lugar para vivir. Es una forma de vivir.</p>
      </div>
      <DropImage label="Render fachada" />
    </section>
  )
}
