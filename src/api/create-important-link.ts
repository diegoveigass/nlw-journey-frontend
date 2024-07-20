import { api } from '../lib/axios'

export interface CreateImportantLinkBody {
  tripId: string | undefined
  url: string
  title: string
}

export async function createImportantLink({
  title,
  url,
  tripId,
}: CreateImportantLinkBody) {
  await api.post(`/trips/${tripId}/links`, { title, url })
}
