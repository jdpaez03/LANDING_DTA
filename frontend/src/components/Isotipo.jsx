export default function Isotipo({ size = 40, color = 'currentColor' }) {
  return (
    <svg width={size * 0.64} height={size} viewBox="0 0 64 100" fill="none"
      stroke={color} strokeWidth="3.5" strokeLinejoin="round" aria-hidden="true">
      <path d="M32 4 L52 40 A24 24 0 1 1 12 40 Z" />
      <path d="M32 30 L44 52 A13 13 0 1 1 20 52 Z" />
      <line x1="24" y1="94" x2="40" y2="94" />
    </svg>
  )
}
