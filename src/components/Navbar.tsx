import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-ink text-white shadow-board">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center font-display font-bold text-ink text-sm">
            มอ.
          </span>
          <span className="font-display text-sm sm:text-base font-semibold">กิจกรรมพัฒนานักศึกษา</span>
        </Link>
      </div>
    </header>
  )
}