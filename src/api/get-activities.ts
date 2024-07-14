import { api } from '../lib/axios'

export interface Activity {
  date: string
  activities: {
    id: string
    title: string
    occurs_at: string
  }[]
}

export interface ActivitiesResponse {
  activities: Activity[]
}

interface GetActivitiesProps {
  tripId: string | undefined
}

export async function getActivities({ tripId }: GetActivitiesProps) {
  const response = await api.get<ActivitiesResponse>(
    `/trips/${tripId}/activities`,
  )

  return response.data.activities
}
