export interface RegisterFormValues {
  fullName: string
  studentId: string
  faculty: string
  email: string
  phone: string
  consent: boolean
}

export type FormErrors = Partial<Record<keyof RegisterFormValues, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^0\d{8,9}$/
const STUDENT_ID_RE = /^\d{8,10}$/

export function validateRegisterForm(values: RegisterFormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.fullName.trim()) errors.fullName = 'กรุณากรอกชื่อ-นามสกุล'

  if (!values.studentId.trim()) {
    errors.studentId = 'กรุณากรอกรหัสนักศึกษา'
  } else if (!STUDENT_ID_RE.test(values.studentId.trim())) {
    errors.studentId = 'รหัสนักศึกษาต้องเป็นตัวเลข 8-10 หลัก'
  }

  if (!values.faculty.trim()) errors.faculty = 'กรุณากรอกคณะ'

  if (!values.email.trim()) {
    errors.email = 'กรุณากรอกอีเมล'
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'รูปแบบอีเมลไม่ถูกต้อง'
  }

  if (!values.phone.trim()) {
    errors.phone = 'กรุณากรอกเบอร์โทรศัพท์'
  } else if (!PHONE_RE.test(values.phone.trim())) {
    errors.phone = 'รูปแบบเบอร์โทรไม่ถูกต้อง (ขึ้นต้นด้วย 0 และมี 9-10 หลัก)'
  }

  if (!values.consent) errors.consent = 'กรุณายืนยันความยินยอมก่อนส่งข้อมูล (PDPA)'

  return errors
}

export function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0
}