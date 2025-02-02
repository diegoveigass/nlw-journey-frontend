import { Calendar, Tag, X } from 'lucide-react'
import { Button } from '../../components/button'
import { FormEvent } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createActivity } from '../../api/create-activity'

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const queryClient = useQueryClient()
  const { tripId } = useParams()

  const { mutateAsync: activityCreate, isPending } = useMutation({
    mutationFn: createActivity,
    async onSuccess() {
      closeCreateActivityModal()
      queryClient.invalidateQueries({
        queryKey: ['trip-activities', tripId],
      })
    },
  })

  async function handleCreateActivity(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()

      const data = new FormData(event.currentTarget)

      const title = data.get('title')?.toString()
      const occurs_at = data.get('occurs_at')?.toString()

      if (!title || !occurs_at) {
        return
      }

      await activityCreate({ tripId, occurs_at, title })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button type="button" onClick={closeCreateActivityModal}>
              <X className="size-5" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form onSubmit={handleCreateActivity} className="space-y-3">
          <div className="py-2.5 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 h-14">
            <Tag className="size-5 text-zinc-400" />
            <input
              name="title"
              placeholder="Qual a atividade?"
              className="bg-transparent text-base placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <div className="py-2.5 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 h-14 flex-1">
            <Calendar className="size-5 text-zinc-400" />
            <input
              type="datetime-local"
              name="occurs_at"
              placeholder="Data e horário da atividade"
              className="bg-transparent text-base placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button size="full" disabled={isPending}>
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  )
}
