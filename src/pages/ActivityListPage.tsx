import { useEffect, useState, useCallback } from 'react'
import { fetchActivities } from '../api/activities'
import type { Activity } from '../types/activity'
import ActivityCard from '../components/ActivityCard'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import Pagination from '../components/Pagination'
import LoadingState from '../components/LoadingState'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import { ApiError } from '../api/client'

const PAGE_SIZE = 9

export default function ActivityListPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('ทั้งหมด')

  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading')
  const [errorMessage, setErrorMessage] = useState('')

  const load = useCallback(async () => {
    setStatus('loading')
    try {
      const result = await fetchActivities({ page, limit: PAGE_SIZE, q: search, category })
      setActivities(result.items)
      setTotalCount(result.totalCount)
      setStatus('success')
    } catch (err) {
      setErrorMessage(err instanceof ApiError ? err.message : 'เกิดข้อผิดพลาดที่ไม่คาดคิด')
      setStatus('error')
    }
  }, [page, search, category])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    setPage(1)
  }, [search, category])

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-ink">
          กิจกรรมพัฒนานักศึกษา
        </h1>
        <p className="text-ink3 text-sm mt-1.5">
          ค้นหาและลงทะเบียนเข้าร่วมกิจกรรมพัฒนานักศึกษา
        </p>
      </section>

      <section className="flex flex-col gap-3 mb-6">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter value={category} onChange={setCategory} />
      </section>

      {status === 'loading' && <LoadingState rows={PAGE_SIZE} />}

      {status === 'error' && <ErrorState message={errorMessage} onRetry={load} />}

      {status === 'success' && activities.length === 0 && (
        <EmptyState
          title="ไม่พบกิจกรรมที่ตรงกับเงื่อนไข"
          description="ลองค้นหาด้วยคำอื่น หรือเลือกดูประเภทกิจกรรมอื่น ๆ"
        />
      )}

      {status === 'success' && activities.length > 0 && (
        <>
          <p className="text-xs text-ink3 mb-3">
            พบ {totalCount.toLocaleString('th-TH')} กิจกรรม
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  )
}