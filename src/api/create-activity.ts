import { api } from '../lib/axios'

export interface CreateActivityBody {
  tripId: string | undefined
  title: string
  occurs_at: string
}

export async function createActivity({
  occurs_at,
  title,
  tripId,
}: CreateActivityBody) {
  await api.post(`/trips/${tripId}/activities`, { title, occurs_at })
}
