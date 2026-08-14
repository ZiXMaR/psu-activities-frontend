import { useEffect, useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchActivityById } from '../api/activities'
import { fetchRegistrantsByActivity } from '../api/registrations'
import type { Activity, Registration } from '../types/activity'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import { maskEmail, maskPhone } from '../utils/format'
import { ApiError } from '../api/client'


export default function RegistrantsPage() {

    const { id } = useParams<{ id: string }>()
    const [activity, setActivity] = useState<Activity | null>(null)
    const [registrants, setRegistrants] = useState<Registration[]>([])
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading')
    const [errorMessage, setErrorMessage] = useState('')

    const load = useCallback(async () => {

        if (!id) return
            setStatus('loading')
        try {
        const [activityData, registrantsData] = await Promise.all([
            fetchActivityById(id),
            fetchRegistrantsByActivity(id),
        ])
            setActivity(activityData)
            setRegistrants(registrantsData)
            setStatus('success')
        } 

    catch (err) {
      setErrorMessage(err instanceof ApiError ? err.message : 'เกิดข้อผิดพลาดที่ไม่คาดคิด')
      setStatus('error')
    }
        }, [id])

    useEffect(() => {
        load()
        }, [load])

    return (
    
        <div className="max-w-3xl mx-auto">
        <Link to={`/activities/${id}`} className="inline-block text-sm text-ink3 hover:text-ink mb-5">
            ← กลับไปหน้ารายละเอียดกิจกรรม
        </Link>

        <h1 className="font-display font-bold text-xl text-ink mb-1">รายชื่อผู้ลงทะเบียน</h1>
            {activity && <p className="text-ink3 text-sm mb-6">{activity.title}</p>}

            {status === 'loading' && <LoadingState rows={3} />}
            {status === 'error' && <ErrorState message={errorMessage} onRetry={load} />}

            {status === 'success' && registrants.length === 0 && (
                <EmptyState title="ยังไม่มีผู้ลงทะเบียน" description="เมื่อมีผู้ลงทะเบียนเข้าร่วมกิจกรรมนี้ รายชื่อจะแสดงที่นี่" />
            )}

        {status === 'success' && registrants.length > 0 && (

            <div className="bg-card border border-line rounded-2xl overflow-hidden shadow-board">
            <p className="text-xs text-ink3 px-5 pt-4 pb-3">
            ทั้งหมด {registrants.length.toLocaleString('th-TH')} คน · ข้อมูลติดต่อถูกปิดบังบางส่วนเพื่อความเป็นส่วนตัวตาม PDPA
            </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead>
                <tr className="text-left text-ink3 text-xs border-y border-line bg-paper/60">
                  <th className="px-5 py-2.5 font-medium">ชื่อ-นามสกุล</th>
                  <th className="px-5 py-2.5 font-medium">รหัสนักศึกษา</th>
                  <th className="px-5 py-2.5 font-medium">คณะ</th>
                  <th className="px-5 py-2.5 font-medium">อีเมล</th>
                  <th className="px-5 py-2.5 font-medium">เบอร์โทร</th>
                </tr>

              </thead>

              <tbody>
                {registrants.map((r, i) => (

                  <tr key={r.id ?? i} className="border-b border-line last:border-0">
                    <td className="px-5 py-3 font-medium text-ink">{r.fullName}</td>
                    <td className="px-5 py-3 text-ink3">{r.studentId}</td>
                    <td className="px-5 py-3 text-ink3">{r.faculty}</td>
                    <td className="px-5 py-3 text-ink3 font-mono text-xs">{maskEmail(r.email)}</td>
                    <td className="px-5 py-3 text-ink3 font-mono text-xs">{maskPhone(r.phone)}</td>
                  </tr>

                ))}
              </tbody>

            </table>

          </div>
        </div>
      )}
    </div>
  )
}