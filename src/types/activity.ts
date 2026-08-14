export interface Activity {
  id: number
  title: string
  category: string
  description: string
  date: string
  location: string
  capacity: number
  imageUrl: string
}

export interface Registration {
  id?: number
  fullName: string
  studentId: string
  faculty: string
  email: string
  phone: string
  activityId: number
  consent: boolean
}

export interface PaginatedResult<T> {
  items: T[]
  totalCount: number
}