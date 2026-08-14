import { useEffect, useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchActivityById } from '../api/activities'
import type { Activity } from '../types/activity'
import CategoryBadge from '../components/CategoryBadge'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import { formatThaiDateTime } from '../utils/format'
import { ApiError } from '../api/client'

export default function ActivityDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [activity, setActivity] = useState<Activity | null>(null)
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading')
  const [errorMessage, setErrorMessage] = useState('')

  const load = useCallback(async () => {
    if (!id) return
    setStatus('loading')
    try {
      const data = await fetchActivityById(id)
      setActivity(data)
      setStatus('success')
    } catch (err) {
      setErrorMessage(err instanceof ApiError ? err.message : 'ไม่พบกิจกรรมนี้')
      setStatus('error')
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/" className="inline-block text-sm text-ink3 hover:text-ink mb-5">
        ← กลับไปหน้ารายการกิจกรรม
      </Link>

      {status === 'loading' && <LoadingState rows={1} />}
      {status === 'error' && <ErrorState message={errorMessage} onRetry={load} />}

      {status === 'success' && activity && (
        <article className="rounded-2xl border border-line bg-card overflow-hidden shadow-board">
          <div className="h-56 sm:h-72 w-full bg-line">
            <img src={activity.imageUrl} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="p-5 sm:p-7">
            <CategoryBadge category={activity.category} />
            <h1 className="font-display font-bold text-xl sm:text-2xl text-ink mt-3">
              {activity.title}
            </h1>

            <dl className="grid sm:grid-cols-2 gap-4 mt-5 text-sm">
              <div>
                <dt className="text-ink3 text-xs">วันและเวลา</dt>
                <dd className="text-ink font-medium">{formatThaiDateTime(activity.date)}</dd>
              </div>
              <div>
                <dt className="text-ink3 text-xs">สถานที่</dt>
                <dd className="text-ink font-medium">{activity.location}</dd>
              </div>
              <div>
                <dt className="text-ink3 text-xs">จำนวนรับสมัคร</dt>
                <dd className="text-ink font-medium">{activity.capacity.toLocaleString('th-TH')} คน</dd>
              </div>
            </dl>

            <div className="mt-6 pt-6 border-t border-dashed border-line">
              <h2 className="font-display font-semibold text-ink mb-2">รายละเอียดกิจกรรม</h2>
              <p className="text-ink3 text-sm leading-relaxed">{activity.description}</p>
            </div>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                to={`/activities/${activity.id}/register`}
                className="inline-flex justify-center items-center h-11 px-6 rounded-xl bg-gold text-ink2 font-semibold text-sm hover:bg-gold2 hover:text-white transition-colors"
              >
                ลงทะเบียนเข้าร่วมกิจกรรม
              </Link>
              <Link
                to={`/activities/${activity.id}/registrants`}
                className="inline-flex justify-center items-center h-11 px-6 rounded-xl border border-line text-ink font-medium text-sm hover:border-ink/40 transition-colors"
              >
                ดูรายชื่อผู้ลงทะเบียน
              </Link>
            </div>
          </div>
        </article>
      )}
    </div>
  )
}