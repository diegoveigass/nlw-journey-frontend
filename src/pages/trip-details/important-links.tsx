import { Link2, Plus } from 'lucide-react'
import { Button } from '../../components/button'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getTripLinks } from '../../api/get-trip-links'
import { useState } from 'react'
import { CreateImportantLinkModal } from './create-important-link-modal'

export function ImportantLinks() {
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false)

  function openAddLinkModal() {
    setIsAddLinkModalOpen(true)
  }

  function closeAddLinkModal() {
    setIsAddLinkModalOpen(false)
  }

  const { tripId } = useParams()

  const { data: tripLinks } = useQuery({
    queryFn: () => getTripLinks({ tripId }),
    queryKey: ['trip-links', tripId],
  })

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        {!tripLinks ? (
          <span className="text-zinc-400 text-sm">Sem links cadastrados</span>
        ) : (
          tripLinks.map((link) => {
            return (
              <div
                key={link.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <span className="block text-zinc-100 font-medium">
                    {link.title}
                  </span>
                  <a
                    href={link.url}
                    target="_blank"
                    className="block truncate text-zinc-400 text-xs hover:text-zinc-200"
                    rel="noreferrer"
                  >
                    {link.url}
                  </a>
                </div>
                <Link2 className="text-zinc-400 size-5 shrink-0" />
              </div>
            )
          })
        )}
      </div>

      <Button variant="secondary" size="full" onClick={openAddLinkModal}>
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {isAddLinkModalOpen && (
        <CreateImportantLinkModal closeAddLinkModal={closeAddLinkModal} />
      )}
    </div>
  )
}
