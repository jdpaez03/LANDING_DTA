import { useEffect, useRef, useState } from 'react'
import { FACTS } from '../content.js'

// Parses '1,656 m²' into { n: 1656, suffix: ' m²' }; years are left as they are
const parse = (v) => {
  const m = v.match(/^([\d,]+)(.*)$/)
  return m ? { n: Number(m[1].replace(/,/g, '')), suffix: m[2] } : null
}
const fmt = (n) => n.toLocaleString('en-US')

function Count({ value, run }) {
  const p = parse(value)
  const isYear = p && p.n > 1900 && p.n < 2100
  const [shown, setShown] = useState(p && !isYear ? 0 : null)

  useEffect(() => {
    if (!run || !p || isYear) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setShown(p.n)
    const start = performance.now()
    let raf
    const step = (t) => {
      const k = Math.min(1, (t - start) / 1400)
      setShown(Math.round(p.n * (1 - Math.pow(1 - k, 3))))
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [run])

  if (shown === null) return value
  // Units (m²) set smaller so long figures stay on one line
  return <>{fmt(run ? shown : p.n)}{p.suffix && <span className="unit">{p.suffix}</span>}</>
}

export default function Facts() {
  const ref = useRef(null)
  const [run, setRun] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRun(true); io.disconnect() } }, { threshold: 0.4 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section className="facts-band" ref={ref} aria-label="Torre Acqua en cifras">
      <dl className="facts">
        {FACTS.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd><Count value={f.value} run={run} /></dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
