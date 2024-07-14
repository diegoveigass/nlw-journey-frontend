import { api } from '../lib/axios'

export interface TripDetails {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export interface TripDetailsResponse {
  trip: TripDetails
}

interface GetTripDetailsProps {
  tripId: string | undefined
}

export async function getTripDetails({ tripId }: GetTripDetailsProps) {
  const response = await api.get<TripDetailsResponse>(`/trips/${tripId}`)

  return response.data.trip
}
