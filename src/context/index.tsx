import { ReactNode } from 'react'
import { ModalProvider } from './modal-context'
import { TripProvider } from './trip-context'

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  return (
    <ModalProvider>
      <TripProvider>{children}</TripProvider>
    </ModalProvider>
  )
}
