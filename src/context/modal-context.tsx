import { ReactNode, createContext, useContext, useState } from 'react'

interface ModalContextProps {
  isGuestsInputOpen: boolean
  isGuestsModalOpen: boolean
  isConfirmTripModalOpen: boolean
  openGuestsInput: () => void
  closeGuestsInput: () => void
  openGuestsModal: () => void
  closeGuestsModal: () => void
  openConfirmTripModal: () => void
  closeConfirmTripModal: () => void
}

const ModalContext = createContext({} as ModalContextProps)

interface ModalProviderProps {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  return (
    <ModalContext.Provider
      value={{
        openGuestsInput,
        closeGuestsInput,
        openGuestsModal,
        closeGuestsModal,
        openConfirmTripModal,
        closeConfirmTripModal,
        isGuestsInputOpen,
        isConfirmTripModalOpen,
        isGuestsModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
