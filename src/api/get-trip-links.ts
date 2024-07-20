import { api } from '../lib/axios'

export interface TripLink {
  id: string
  title: string
  url: string
}

export interface TripLinkResponse {
  links: TripLink[]
}

interface GetTripLinkProps {
  tripId: string | undefined
}

export async function getTripLinks({ tripId }: GetTripLinkProps) {
  const response = await api.get<TripLinkResponse>(`/trips/${tripId}/links`)

  return response.data.links
}
