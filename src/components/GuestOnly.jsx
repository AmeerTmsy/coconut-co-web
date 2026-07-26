import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function GuestOnly({ children }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()
  if (isLoading) return null // wait for the "am I logged in?" check to finish before deciding

  if (user) {
    const redirectTo = location.state?.from || '/'
    return <Navigate to={redirectTo} replace />
  }

  return children
}

export default GuestOnly