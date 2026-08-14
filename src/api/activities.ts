import { apiFetch } from './client'
import type { Activity, PaginatedResult } from '../types/activity'

export interface FetchActivitiesParams {
  page: number
  limit?: number
  q?: string
  category?: string
}

export async function fetchActivities(params: FetchActivitiesParams): Promise<PaginatedResult<Activity>> {
  const { page, limit = 9, q, category } = params
  const sp = new URLSearchParams()
  sp.set('_page', String(page))
  sp.set('_limit', String(limit))
  if (q && q.trim()) sp.set('q', q.trim())
  if (category && category !== 'ทั้งหมด') sp.set('category', category)

  const { data, headers } = await apiFetch<Activity[]>(`/activities?${sp.toString()}`)
  const totalCount = Number(headers.get('X-Total-Count') ?? data.length)
  return { items: data, totalCount }
}

export async function fetchActivityById(id: string | number): Promise<Activity> {
  const { data } = await apiFetch<Activity>(`/activities/${id}`)
  return data
}