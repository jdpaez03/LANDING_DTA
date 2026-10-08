// The isotipo's drop used as an image mask (brandbook graphic resource).
// Without `src` it renders a branded gradient placeholder until renders are available.
export default function DropImage({ src, alt = '', label }) {
  return (
    <figure className="drop">
      <svg width="0" height="0" aria-hidden="true">
        <clipPath id="drop-clip" clipPathUnits="objectBoundingBox">
          <path d="M0.5 0 L0.9167 0.491 A0.5 0.327 0 1 1 0.0833 0.491 Z" />
        </clipPath>
      </svg>
      {src ? <img src={src} alt={alt} /> : <div className="drop-placeholder">{label}</div>}
    </figure>
  )
}
