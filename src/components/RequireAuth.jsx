import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RequireAuth({ children }) {
  const { user, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) return null

  if (!user) {
    console.log("pathname: ", location.pathname)
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}

export default RequireAuth