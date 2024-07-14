import { ArrowRight, UserRoundPlus } from 'lucide-react'
import { Button } from '../../../components/button'
import { useModal } from '../../../context/modal-context'
import { useTrip } from '../../../context/trip-context'

export function InviteGuestsStep() {
  const { openConfirmTripModal, openGuestsModal } = useModal()
  const { emailsToInvite } = useTrip()

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button
        onClick={openGuestsModal}
        type="button"
        className="flex items-center gap-2 flex-1 "
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-lg text-zinc-100">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="text-lg text-zinc-400">Quem estará na viagem?</span>
        )}
      </button>

      <div className="w-px h-6 bg-zinc-800" />

      <Button onClick={openConfirmTripModal}>
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}
