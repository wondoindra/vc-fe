'use client'

import { createContext, useState, useContext } from "react"

export const UserContext = createContext({})

export function Context({ children }) {
  const [user, setUser] = useState({ mode: 'USER', loggedIn: false })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}