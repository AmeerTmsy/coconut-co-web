import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import FormInput from '../components/FormInput'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  // If we were redirected here from a protected page, send the user back there after login
  setTimeout(() => {
    console.log('Login page state:', location.state ,":", location.state?.from || '/')
  }, 1000);
  const redirectTo = location.state?.from || '/'

  const onSubmit = async (formData) => {
    setServerError('')
    setSubmitting(true)
    try {
      await login(formData)
      toast.success('Welcome back!')
      console.log("last check:", redirectTo)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setServerError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="font-display text-3xl font-semibold text-coconut-900 mb-2">Welcome back</h1>
      <p className="text-coconut-600 mb-8">Log in to continue shopping.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email', { required: 'Email is required' })}
        />
        <FormInput
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password', { required: 'Password is required' })}
        />

        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-coconut-800 text-white font-medium py-3 rounded-full hover:bg-coconut-900 transition-colors disabled:opacity-60"
        >
          {submitting ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <p className="text-center text-coconut-600 text-sm mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-leaf-600 font-medium hover:underline">Sign up</Link>
      </p>
    </div>
  )
}

export default Login