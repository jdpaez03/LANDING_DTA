import { useEffect, useState } from 'react'

// "N" hangs to the left so the digits themselves sit centered on the line
function Level({ value, className }) {
  if (value === 0) return <span className={className}>PB</span>
  return (
    <span className={className}>
      <span className="floor-n">N</span>{String(value).padStart(2, '0')}
    </span>
  )
}

// Fixed level counter: scrolling the page climbs the tower from PB to N50 (desktop only)
export default function FloorIndicator() {
  const [level, setLevel] = useState(0)
  useEffect(() => {
    // React skips re-rendering when the level is unchanged, so updating on every scroll is cheap
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setLevel(max > 0 ? Math.round((window.scrollY / max) * 50) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])

  return (
    <div className="floor" aria-hidden="true">
      <Level value={level} className="floor-num" />
      <span className="floor-track"><span className="floor-fill" style={{ height: `${(level / 50) * 100}%` }} /></span>
      <Level value={50} className="floor-top" />
    </div>
  )
}
