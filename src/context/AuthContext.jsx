import { createContext, useContext, useEffect, useState } from 'react'
import { fetchCurrentUser, loginUser, logoutUser, registerUser } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true) // true while we check "are you already logged in?"

  // On app load, check if a valid session cookie already exists
  useEffect(() => {
    fetchCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false))
  }, [])

  const login = async (credentials) => {
    const loggedInUser = await loginUser(credentials)
    setUser(loggedInUser)
    return loggedInUser
  }

  const register = async (payload) => {
    const newUser = await registerUser(payload)
    setUser(newUser)
    return newUser
  }

  const logout = async () => {
    await logoutUser()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}