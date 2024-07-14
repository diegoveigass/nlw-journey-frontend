import { api } from '../lib/axios'

export interface CreateTripBody {
  destination: string
  starts_at: Date
  ends_at: Date
  emails_to_invite: string[]
  owner_name: string
  owner_email: string
}

export interface CreateTripResponse {
  tripId: string
}

export async function createTrip({
  destination,
  emails_to_invite,
  ends_at,
  owner_email,
  owner_name,
  starts_at,
}: CreateTripBody) {
  const response = await api.post<CreateTripResponse>('/trips', {
    destination,
    starts_at,
    ends_at,
    emails_to_invite,
    owner_name,
    owner_email,
  })

  return response.data
}
