import { Mail, User, X } from 'lucide-react'
import { FormEvent } from 'react'
import { Button } from '../../components/button'
import { useModal } from '../../context/modal-context'
import { useTrip } from '../../context/trip-context'
import { useMutation } from '@tanstack/react-query'
import { createTrip } from '../../api/create-trip'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function ConfirmTripModal() {
  const navigate = useNavigate()
  const { closeConfirmTripModal } = useModal()

  const {
    destination,
    emailsToInvite,
    eventStartAndEndDates,
    ownerName,
    ownerEmail,
    setTripOwnerName,
    setTripOwnerEmail,
  } = useTrip()

  const { mutateAsync: tripCreate, isPending } = useMutation({
    mutationFn: createTrip,
    async onSuccess(data) {
      navigate(`/trips/${data.tripId}`)
    },
  })

  async function handleCreateTrip(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()
      if (!destination) {
        return
      }

      if (!eventStartAndEndDates?.from || !eventStartAndEndDates.to) {
        return
      }

      if (emailsToInvite.length === 0) {
        return
      }

      if (!ownerName || !ownerEmail) {
        return
      }

      await tripCreate({
        destination,
        starts_at: eventStartAndEndDates.from,
        ends_at: eventStartAndEndDates.to,
        emails_to_invite: emailsToInvite,
        owner_name: ownerName,
        owner_email: ownerEmail,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d' de 'LLLL", { locale: ptBR })
          .concat(' até ')
          .concat(
            format(eventStartAndEndDates.to, "d' de 'LLLL", { locale: ptBR }),
          )
      : null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button type="button" onClick={closeConfirmTripModal}>
              <X className="size-5" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{' '}
            <span className="font-semibold text-zinc-100">{destination}</span>{' '}
            nas datas de{' '}
            <span className="font-semibold text-zinc-100">{displayedDate}</span>{' '}
            preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={handleCreateTrip} className="space-y-3">
          <div className="py-2.5 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 h-14">
            <User className="size-5 text-zinc-400" />
            <input
              name="name"
              placeholder="Seu nome completo"
              className="bg-transparent text-base placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setTripOwnerName(event.target.value)}
            />
          </div>
          <div className="py-2.5 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 h-14">
            <Mail className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal"
              className="bg-transparent text-base placeholder-zinc-400 outline-none flex-1"
              onChange={(event) => setTripOwnerEmail(event.target.value)}
            />
          </div>

          <Button type="submit" size="full" disabled={isPending}>
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  )
}
