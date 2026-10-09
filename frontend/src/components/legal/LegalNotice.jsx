import { DATA_CONTROLLER, PRIVACY_UPDATED, PRIVACY_URL } from '../../content.js'
import LegalLayout, { Pending } from './LegalLayout.jsx'

// Aviso legal: the site and everything on it is preliminary and conceptual, not an offer.
// DRAFT: to be reviewed by the legal team before going live.
export default function LegalNotice() {
  const c = DATA_CONTROLLER
  const email = c.privacyEmail ? <a href={`mailto:${c.privacyEmail}`}>{c.privacyEmail}</a> : <Pending>correo de contacto</Pending>

  return (
    <LegalLayout title="Aviso legal" updated={PRIVACY_UPDATED}>
      <p className="legal-lede">
        Este sitio es una versión preliminar de la presentación de Torre Acqua y tiene fines exclusivamente informativos.
      </p>

      <section>
        <h2>1. Carácter preliminar y conceptual</h2>
        <p>
          Torre Acqua se encuentra en etapa de diseño. La información publicada se basa en el diseño esquemático del
          proyecto y puede modificarse durante su desarrollo, sin previo aviso, por razones técnicas, normativas,
          comerciales o de diseño.
        </p>
      </section>

      <section>
        <h2>2. Imágenes, planos, áreas y fechas</h2>
        <ul>
          <li>Los renders e imágenes son ilustraciones conceptuales; acabados, mobiliario, vegetación, entorno y vistas pueden variar.</li>
          <li>Los planos, superficies y distribuciones son aproximados e ilustrativos.</li>
          <li>El número de niveles, residencias, tipologías y amenidades puede ajustarse.</li>
          <li>La fecha de entrega es estimada.</li>
        </ul>
      </section>

      <section>
        <h2>3. No constituye una oferta</h2>
        <p>
          Nada de lo publicado en este sitio constituye una oferta, promesa de venta, compromiso ni contrato. Los precios,
          la disponibilidad, las formas de pago y las condiciones de compra se informan únicamente por un asesor autorizado
          y quedan sujetos a lo que se establezca por escrito en los documentos de compraventa.
        </p>
      </section>

      <section>
        <h2>4. Club Sonoma</h2>
        <p>
          La acción del Club Sonoma, sus instalaciones y servicios se describen de forma informativa y están sujetos a los
          términos de compraventa y al reglamento del club vigentes. Las imágenes del club pueden no reflejar su estado actual.
        </p>
      </section>

      <section>
        <h2>5. Marcas y contenido</h2>
        <p>
          Las marcas, logotipos, nombres comerciales, imágenes y textos de este sitio pertenecen a sus respectivos
          titulares, incluidas las marcas de terceros mencionadas con fines descriptivos. No pueden usarse sin su autorización.
        </p>
      </section>

      <section>
        <h2>6. Enlaces a otros sitios</h2>
        <p>Los enlaces a sitios de terceros se ofrecen como referencia; no somos responsables de su contenido ni de su disponibilidad.</p>
      </section>

      <section>
        <h2>7. Datos personales</h2>
        <p>El tratamiento de los datos que nos proporcionas se rige por nuestro <a href={PRIVACY_URL}>aviso de privacidad</a>.</p>
      </section>

      <section>
        <h2>8. Contacto</h2>
        <p>Para cualquier duda sobre este aviso escríbenos a {email}.</p>
      </section>
    </LegalLayout>
  )
}
