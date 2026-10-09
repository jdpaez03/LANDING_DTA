// Responsive render image. `file` is the base name produced by scripts/optimize_images.py.
const WIDTHS = [800, 1600, 2400]

export const renderSrc = (file, w = 1600) => `/img/renders/${file}-${w}.webp`

// `priority`: 'high' for the hero, 'low' for images that should load early without competing with it
export default function Picture({ file, alt, sizes = '100vw', className, eager = false, priority }) {
  return (
    <img
      className={className}
      src={renderSrc(file)}
      srcSet={WIDTHS.map((w) => `${renderSrc(file, w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={priority}
      decoding="async"
    />
  )
}
