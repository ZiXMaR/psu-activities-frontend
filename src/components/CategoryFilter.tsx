import { ALL_CATEGORIES, getCategoryStyle } from '../utils/format'

interface Props {
  value: string
  onChange: (value: string) => void
}

export default function CategoryFilter({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="กรองตามประเภทกิจกรรม">
      {ALL_CATEGORIES.map((category) => {
        const active = value === category
        const style = getCategoryStyle(category)
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={active}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              active ? 'bg-ink text-white border-ink' : `${style.bg} ${style.text} border-transparent`
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
