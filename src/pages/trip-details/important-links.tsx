import { Link2, Plus } from 'lucide-react'
import { Button } from '../../components/button'

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block text-zinc-100 font-medium">
              Reserva do AirBnB
            </span>
            <a
              href="#"
              className="block truncate text-zinc-400 text-xs hover:text-zinc-200"
            >
              https://www.airbnb.com.br/rooms/10470001122223123111111111111111
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block text-zinc-100 font-medium">
              Reserva do AirBnB
            </span>
            <a
              href="#"
              className="block truncate text-zinc-400 text-xs hover:text-zinc-200"
            >
              https://www.airbnb.com.br/rooms/10470001122223123111111111111111
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0" />
        </div>
      </div>

      <Button variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  )
}
