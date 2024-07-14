import { api } from '../lib/axios'

export interface Participant {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export interface ParticipantsResponse {
  participants: Participant[]
}

interface GetParticipantsProps {
  tripId: string | undefined
}

export async function getParticipants({ tripId }: GetParticipantsProps) {
  const response = await api.get<ParticipantsResponse>(
    `/trips/${tripId}/participants`,
  )

  return response.data.participants
}
