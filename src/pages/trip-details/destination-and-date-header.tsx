import { MapPin, Calendar, Settings2 } from 'lucide-react'
import { Button } from '../../components/button'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { format } from 'date-fns'

export interface TripDetails {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export function DestinationAndDateHeader() {
  const [tripDetails, setTripDetails] = useState<TripDetails | null>(null)
  const { tripId } = useParams()

  useEffect(() => {
    api
      .get(`/trips/${tripId}`)
      .then((response) => setTripDetails(response.data.trip))
  }, [tripId])

  const displayedDate = tripDetails
    ? format(tripDetails.starts_at, "d' de 'LLL")
        .concat(' até ')
        .concat(format(tripDetails.ends_at, "d' de 'LLL"))
    : null

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{tripDetails?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  )
}
