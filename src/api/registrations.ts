import { apiFetch } from './client'
import type { Registration } from '../types/activity'

export async function submitRegistration(payload: Registration): Promise<Registration> {
  const { data } = await apiFetch<Registration>('/registrations', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return data
}

export async function fetchRegistrantsByActivity(activityId: string | number): Promise<Registration[]> {
  const { data } = await apiFetch<Registration[]>(`/registrations?activityId=${activityId}`)
  return data
}