import { ReactNode, createContext, useContext, useState } from 'react'
import { DateRange } from 'react-day-picker'

interface TripContextProps {
  destination: string
  emailsToInvite: string[]
  ownerName: string
  ownerEmail: string
  eventStartAndEndDates: DateRange | undefined
  setTripDestination: (destination: string) => void
  setTripOwnerName: (name: string) => void
  setTripOwnerEmail: (email: string) => void
  addEmailToInvite: (email: string) => void
  removeEmailFromInvite: (email: string) => void
  setTripEventStartAndEndDates: (date: DateRange | undefined) => void
}

interface TripProviderProps {
  children: ReactNode
}

const TripContext = createContext({} as TripContextProps)

export function TripProvider({ children }: TripProviderProps) {
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])
  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >()

  function setTripOwnerName(ownerName: string) {
    setOwnerName(ownerName)
  }

  function setTripOwnerEmail(ownerEmail: string) {
    setOwnerEmail(ownerEmail)
  }

  function setTripDestination(destination: string) {
    setDestination(destination)
  }

  function setTripEventStartAndEndDates(date: DateRange | undefined) {
    setEventStartAndEndDates(date)
  }

  function addEmailToInvite(email: string) {
    setEmailsToInvite((prevState) => [...prevState, email])
  }

  function removeEmailFromInvite(emailToRemove: string) {
    setEmailsToInvite((prevState) =>
      prevState.filter((email) => email !== emailToRemove),
    )
  }

  return (
    <TripContext.Provider
      value={{
        setTripOwnerName,
        setTripOwnerEmail,
        setTripDestination,
        setTripEventStartAndEndDates,
        addEmailToInvite,
        removeEmailFromInvite,
        emailsToInvite,
        destination,
        eventStartAndEndDates,
        ownerEmail,
        ownerName,
      }}
    >
      {children}
    </TripContext.Provider>
  )
}

export const useTrip = () => useContext(TripContext)
