import { Link } from 'react-router-dom'
import type { Activity } from '../types/activity'
import CategoryBadge from './CategoryBadge'
import { formatThaiDateTime } from '../utils/format'

export default function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Link
      to={`/activities/${activity.id}`}
      className="group flex flex-col rounded-2xl border border-line bg-card overflow-hidden shadow-board hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
    >
      <div className="h-36 w-full overflow-hidden bg-line">
        <img
          src={activity.imageUrl}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <CategoryBadge category={activity.category} />
        <h3 className="font-display font-semibold text-ink leading-snug line-clamp-2">
          {activity.title}
        </h3>
        <p className="text-sm text-ink3 line-clamp-2">{activity.description}</p>
        <div className="mt-auto pt-2 flex flex-col gap-1 text-xs text-ink3 border-t border-dashed border-line">
          <span className="mt-2">{formatThaiDateTime(activity.date)}</span>
          <span className="truncate">{activity.location}</span>
        </div>

      </div>

    </Link>
  )
}