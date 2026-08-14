import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchActivityById } from '../api/activities'
import { submitRegistration } from '../api/registrations'
import type { Activity } from '../types/activity'
import { validateRegisterForm, hasErrors, type FormErrors, type RegisterFormValues } from '../utils/validate'
import { ApiError } from '../api/client'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'

const initialValues: RegisterFormValues = {
  fullName: '',
  studentId: '',
  faculty: '',
  email: '',
  phone: '',
  consent: false,
}

export default function RegisterPage() {
  const { id } = useParams<{ id: string }>()

  const [activity, setActivity] = useState<Activity | null>(null)
  const [loadStatus, setLoadStatus] = useState<'loading' | 'error' | 'success'>('loading')
  const [loadError, setLoadError] = useState('')

  const [values, setValues] = useState<RegisterFormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!id) return
    fetchActivityById(id)
      .then((data) => {
        setActivity(data)
        setLoadStatus('success')
      })
      .catch((err) => {
        setLoadError(err instanceof ApiError ? err.message : 'ไม่พบกิจกรรมนี้')
        setLoadStatus('error')
      })
  }, [id])

  function updateField<K extends keyof RegisterFormValues>(key: K, value: RegisterFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!id) return

    const validationErrors = validateRegisterForm(values)
    setErrors(validationErrors)
    if (hasErrors(validationErrors)) return

    setSubmitting(true)
    setSubmitError('')
    try {
      await submitRegistration({ ...values, activityId: Number(id) })
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : 'ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
    } finally {
      setSubmitting(false)
    }
  }

  if (loadStatus === 'loading') return <LoadingState rows={1} />
  if (loadStatus === 'error') return <ErrorState message={loadError} />

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-14">
        <h1 className="font-display font-bold text-xl text-ink">ลงทะเบียนสำเร็จ</h1>
        <p className="text-ink3 text-sm mt-2">
          บันทึกข้อมูลลงทะเบียนเข้าร่วม{activity ? ` "${activity.title}"` : 'กิจกรรม'} เรียบร้อยแล้ว
        </p>
        <div className="flex justify-center gap-3 mt-6">
          <Link
            to={`/activities/${id}/registrants`}
            className="h-10 px-5 inline-flex items-center rounded-xl border border-line text-sm font-medium text-ink"
          >
            ดูรายชื่อผู้ลงทะเบียน
          </Link>
          <Link
            to="/"
            className="h-10 px-5 inline-flex items-center rounded-xl bg-ink text-white text-sm font-medium"
          >
            กลับหน้ารายการกิจกรรม
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <Link to={`/activities/${id}`} className="inline-block text-sm text-ink3 hover:text-ink mb-5">
        ← กลับไปหน้ารายละเอียดกิจกรรม
      </Link>

      <h1 className="font-display font-bold text-xl text-ink mb-1">ลงทะเบียนเข้าร่วมกิจกรรม</h1>
      {activity && <p className="text-ink3 text-sm mb-6">{activity.title}</p>}

      <form onSubmit={handleSubmit} noValidate className="bg-card border border-line rounded-2xl p-5 sm:p-6 space-y-4 shadow-board">
        <Field label="ชื่อ-นามสกุล" error={errors.fullName} htmlFor="fullName">
          <input
            id="fullName"
            type="text"
            value={values.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            className={inputClass(!!errors.fullName)}
          />
        </Field>

        <Field label="รหัสนักศึกษา" error={errors.studentId} htmlFor="studentId">
          <input
            id="studentId"
            type="text"
            inputMode="numeric"
            value={values.studentId}
            onChange={(e) => updateField('studentId', e.target.value)}
            className={inputClass(!!errors.studentId)}
          />
        </Field>

        <Field label="คณะ" error={errors.faculty} htmlFor="faculty">
          <input
            id="faculty"
            type="text"
            value={values.faculty}
            onChange={(e) => updateField('faculty', e.target.value)}
            className={inputClass(!!errors.faculty)}
          />
        </Field>

        <Field label="อีเมล" error={errors.email} htmlFor="email">
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => updateField('email', e.target.value)}
            className={inputClass(!!errors.email)}
          />
        </Field>

        <Field label="เบอร์โทรศัพท์" error={errors.phone} htmlFor="phone">
          <input
            id="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className={inputClass(!!errors.phone)}
          />
        </Field>

        <div className="pt-2 border-t border-dashed border-line">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={values.consent}
              onChange={(e) => updateField('consent', e.target.checked)}
              className="mt-0.5 w-4 h-4"
            />
            <span className="text-xs text-ink3 leading-relaxed">
              ข้าพเจ้ายินยอมให้มหาวิทยาลัยเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลข้างต้น
              เพื่อวัตถุประสงค์ในการลงทะเบียนกิจกรรมนี้ ตาม PDPA
            </span>
          </label>
          {errors.consent && <p className="text-xs text-rose-600 mt-1.5">{errors.consent}</p>}
        </div>

        {submitError && (
          <p role="alert" className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full h-11 rounded-xl bg-gold text-ink2 font-semibold text-sm hover:bg-gold2 hover:text-white transition-colors disabled:opacity-60"
        >
          {submitting ? 'กำลังส่งข้อมูล...' : 'ยืนยันการลงทะเบียน'}
        </button>
      </form>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-ink mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-rose-600 mt-1.5">{error}</p>}
    </div>
  )
}

function inputClass(hasError: boolean): string {
  return `w-full h-11 px-3.5 rounded-xl border bg-white text-sm outline-none transition-colors ${
    hasError ? 'border-rose-400 focus:border-rose-500' : 'border-line focus:border-ink'
  }`
}