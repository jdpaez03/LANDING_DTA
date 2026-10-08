import Picture from './Picture.jsx'

// The isotipo's drop used as an image mask (brandbook graphic resource).
// `file` is a render base name (see Picture); without it a branded gradient placeholder is shown.
export default function DropImage({ file, alt = '', label }) {
  return (
    <figure className="drop">
      <svg width="0" height="0" aria-hidden="true">
        <clipPath id="drop-clip" clipPathUnits="objectBoundingBox">
          <path d="M0.5 0 L0.9167 0.491 A0.5 0.327 0 1 1 0.0833 0.491 Z" />
        </clipPath>
      </svg>
      {file
        ? <Picture file={file} alt={alt} sizes="340px" />
        : <div className="drop-placeholder">{label}</div>}
    </figure>
  )
}
