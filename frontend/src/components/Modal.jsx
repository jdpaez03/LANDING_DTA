import { useEffect, useRef } from 'react'

// Native <dialog>: gives Esc-to-close, focus trapping and a backdrop for free.
export default function Modal({ open, onClose, className = '', label, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-label={label}
      onClose={onClose}
      // Clicking the backdrop (the dialog element itself, outside its content) closes it
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>
      {open && children}
    </dialog>
  )
}
