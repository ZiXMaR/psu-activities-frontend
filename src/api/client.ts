export const API_BASE_URL = 'http://localhost:3001'

export class ApiError extends Error {
  status?: number
  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<{ data: T; headers: Headers }> {
  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options?.headers ?? {}) },
      ...options,
    })
  } catch {
    throw new ApiError(
      'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบว่า Mock API กำลังทำงานอยู่ที่พอร์ต 3001'
    )
  }

  if (!response.ok) {
    throw new ApiError(`เกิดข้อผิดพลาดจากเซิร์ฟเวอร์ (รหัส ${response.status})`, response.status)
  }

  const text = await response.text()
  const data = (text ? JSON.parse(text) : null) as T
  return { data, headers: response.headers }
}
