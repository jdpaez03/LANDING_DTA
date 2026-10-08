import { LOGOS } from './logoPaths.js'

// Official brandbook logo. variant: 'principal' (stacked) | 'horizontal' | 'isotipo' (drop only).
// Inherits its color from CSS `color`; brandbook allows only palette colors.
export default function Logo({ variant = 'principal', height = 40, title = 'Torre Acqua', className }) {
  const { viewBox, paths } = LOGOS[variant]
  return (
    <svg viewBox={viewBox} height={height} fill="currentColor" role="img" aria-label={title} className={className}>
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  )
}
