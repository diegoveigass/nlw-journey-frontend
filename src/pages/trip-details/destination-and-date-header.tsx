import { MapPin, Calendar, Settings2 } from 'lucide-react'
import { Button } from '../../components/button'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { getTripDetails } from '../../api/get-trip-details'

export function DestinationAndDateHeader() {
  const { tripId } = useParams()

  const { data: tripDetails } = useQuery({
    queryFn: () => getTripDetails({ tripId }),
    queryKey: ['trip', tripId],
  })

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
