interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-8" aria-label="เปลี่ยนหน้า">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="min-w-[36px] h-9 px-2 rounded-lg text-sm font-medium border border-line bg-white disabled:opacity-30"
      >
        ‹
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          className={`min-w-[36px] h-9 px-2 rounded-lg text-sm font-medium border transition-colors ${
            p === page ? 'bg-ink text-white border-ink' : 'bg-white text-ink border-line'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className="min-w-[36px] h-9 px-2 rounded-lg text-sm font-medium border border-line bg-white disabled:opacity-30"
      >
        ›
      </button>
    </nav>
  )
}