import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RequireAdmin({ children }) {
  const { user, isLoading } = useAuth()

  if (isLoading) return null

  if (!user) return <Navigate to="/login" replace />

  if (user.role !== 'admin') return <Navigate to="/" replace />

  return children
}

export default RequireAdmin