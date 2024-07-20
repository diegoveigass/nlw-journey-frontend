import { Link2, Tag, X } from 'lucide-react'
import { Button } from '../../components/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { FormEvent } from 'react'
import { createImportantLink } from '../../api/create-important-link'

interface CreateImportantLinkModalProps {
  closeAddLinkModal: () => void
}

export function CreateImportantLinkModal({
  closeAddLinkModal,
}: CreateImportantLinkModalProps) {
  const queryClient = useQueryClient()
  const { tripId } = useParams()

  const { mutateAsync: importantLinkCreate, isPending } = useMutation({
    mutationFn: createImportantLink,
    async onSuccess() {
      closeAddLinkModal()
      queryClient.invalidateQueries({
        queryKey: ['trip-links', tripId],
      })
    },
  })

  async function handleCreateImportantLink(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault()

      const data = new FormData(event.currentTarget)

      const title = data.get('title')?.toString()
      const url = data.get('url')?.toString()

      if (!title || !url) {
        return
      }

      await importantLinkCreate({ tripId, title, url })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>
            <button type="button" onClick={closeAddLinkModal}>
              <X className="size-5" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>

        <form className="space-y-3" onSubmit={handleCreateImportantLink}>
          <div className="py-2.5 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 h-14">
            <Tag className="size-5 text-zinc-400" />
            <input
              name="title"
              placeholder="Título do link"
              className="bg-transparent text-base placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <div className="py-2.5 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 h-14 flex-1">
            <Link2 className="size-5 text-zinc-400" />
            <input
              name="url"
              placeholder="URL"
              className="bg-transparent text-base placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button size="full" disabled={isPending}>
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  )
}
