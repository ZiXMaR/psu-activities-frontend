import { getCategoryStyle } from '../utils/format'

export default function CategoryBadge({ category }: { category: string }) {
  const style = getCategoryStyle(category)
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.bg} ${style.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {category}
    </span>
  )
}