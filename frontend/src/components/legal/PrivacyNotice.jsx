import { DATA_CONTROLLER, LEGAL_URL, PRIVACY_UPDATED, PRIVACY_VERSION } from '../../content.js'
import LegalLayout, { Pending } from './LegalLayout.jsx'

// Aviso de privacidad integral. Structure follows art. 15 of the LFPDPPP (DOF 20-mar-2025).
// DRAFT: must be reviewed by the legal team and completed (DATA_CONTROLLER) before going live.
export default function PrivacyNotice() {
  const c = DATA_CONTROLLER
  const name = c.name || <Pending>razón social del responsable</Pending>
  const address = c.address || <Pending>domicilio del responsable</Pending>
  const email = c.privacyEmail ? <a href={`mailto:${c.privacyEmail}`}>{c.privacyEmail}</a> : <Pending>correo de privacidad</Pending>

  return (
    <LegalLayout title="Aviso de privacidad" updated={PRIVACY_UPDATED}>
      <p className="legal-lede">
        Este aviso explica qué datos personales recabamos a través de este sitio, para qué los usamos
        y cómo puedes ejercer tus derechos. Corresponde a una versión preliminar del sitio de Torre Acqua
        y puede actualizarse antes de su publicación definitiva.
      </p>

      <section>
        <h2>1. Responsable de tus datos</h2>
        <p>{name}, con domicilio en {address}, es responsable del tratamiento de los datos personales que nos proporcionas en este sitio.</p>
      </section>

      <section>
        <h2>2. Datos que recabamos</h2>
        <p>Únicamente los que tú nos das en el formulario de contacto:</p>
        <ul>
          <li>Nombre.</li>
          <li>Número de teléfono o WhatsApp.</li>
          <li>Correo electrónico.</li>
          <li>Lo que deseas recibir (visita, brochure y planos, o precios y disponibilidad).</li>
          <li>De forma opcional: residencia de interés, mensaje, si la compra es para vivir o invertir, si eres asesor inmobiliario y tu horario preferido para que te contactemos.</li>
        </ul>
        <p>
          También registramos la fecha de tu solicitud, la versión de este aviso que aceptaste y, si llegaste
          desde un anuncio, la campaña de origen indicada en el enlace. No recabamos datos personales sensibles.
        </p>
      </section>

      <section>
        <h2>3. Para qué usamos tus datos</h2>
        <h3>Finalidades necesarias</h3>
        <ul>
          <li>Atender tu solicitud: agendar tu visita o enviarte el brochure, los planos, los precios y la disponibilidad que pediste.</li>
          <li>Contactarte por teléfono, WhatsApp o correo para dar seguimiento a tu interés en Torre Acqua.</li>
          <li>Llevar el registro de las solicitudes recibidas.</li>
        </ul>
        <h3>Finalidades voluntarias</h3>
        <p>Con tu consentimiento, también podemos:</p>
        <ul>
          <li>Enviarte información sobre otros proyectos de las empresas desarrolladoras.</li>
          <li>Medir de forma estadística el resultado de nuestras campañas.</li>
        </ul>
        <p>
          Si no deseas que usemos tus datos para las finalidades voluntarias, escríbenos a {email}. Negarte a ellas
          no afecta la atención de tu solicitud.
        </p>
      </section>

      <section>
        <h2>4. Con quién se comparten</h2>
        <p>
          No vendemos tus datos. Pueden ser tratados por las empresas que desarrollan Torre Acqua (PAGA Desarrollos
          y Grupo DAGS), por los asesores comerciales autorizados del proyecto y por proveedores que nos prestan
          servicios, como el hospedaje de este sitio, únicamente para las finalidades de este aviso.
        </p>
      </section>

      <section>
        <h2>5. Cómo limitar el uso de tus datos</h2>
        <p>
          Puedes pedirnos en cualquier momento que dejemos de contactarte escribiendo a {email}. También puedes
          inscribirte en el Registro Público para Evitar Publicidad (REPEP) de la Procuraduría Federal del Consumidor.
        </p>
      </section>

      <section>
        <h2>6. Tus derechos ARCO y la revocación del consentimiento</h2>
        <p>
          Tienes derecho a acceder a tus datos, rectificarlos, cancelarlos u oponerte a su tratamiento, así como a
          revocar tu consentimiento. Para hacerlo, envía tu solicitud a {email} con:
        </p>
        <ul>
          <li>Tu nombre y un medio para responderte.</li>
          <li>Una copia de tu identificación oficial o, en su caso, la de tu representante.</li>
          <li>La descripción clara de los datos y del derecho que quieres ejercer.</li>
        </ul>
        <p>Te responderemos por el mismo medio dentro de los plazos que establece la ley.</p>
      </section>

      <section>
        <h2>7. Cookies y tecnologías de este sitio</h2>
        <p>
          Este sitio no utiliza cookies de rastreo ni herramientas de publicidad de terceros. Para mostrar la tipografía
          se cargan fuentes desde Adobe Fonts, y los enlaces a Google Maps, WhatsApp y los sitios de las desarrolladoras
          te llevan a servicios de terceros con sus propios avisos de privacidad.
        </p>
      </section>

      <section>
        <h2>8. Cuánto tiempo conservamos tus datos</h2>
        <p>Solo el tiempo necesario para atender tu solicitud y dar seguimiento comercial al proyecto, o hasta que nos pidas cancelarlos.</p>
      </section>

      <section>
        <h2>9. Cambios a este aviso</h2>
        <p>
          Cualquier cambio se publicará en esta misma página con su fecha de actualización. Versión vigente:{' '}
          <code>{PRIVACY_VERSION}</code>.
        </p>
      </section>

      <section>
        <h2>10. Autoridad</h2>
        <p>
          Si consideras que tu derecho a la protección de datos personales ha sido vulnerado, puedes acudir a la
          Secretaría Anticorrupción y Buen Gobierno, autoridad en la materia conforme a la Ley Federal de Protección
          de Datos Personales en Posesión de los Particulares.
        </p>
      </section>

      <p className="legal-see-also">Consulta también el <a href={LEGAL_URL}>aviso legal</a> sobre el carácter preliminar de este sitio.</p>
    </LegalLayout>
  )
}
