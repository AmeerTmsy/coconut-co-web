import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import FormInput from '../components/FormInput'

function Register() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (formData) => {
    setServerError('')
    setSubmitting(true)
    try {
      await registerUser(formData)
      toast.success('Account created!')
      navigate('/', { replace: true })
    } catch (err) {
      setServerError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="font-display text-3xl font-semibold text-coconut-900 mb-2">Create your account</h1>
      <p className="text-coconut-600 mb-8">Join us for fresh coconut goodness.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Full Name"
          placeholder="Your name"
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />
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
          placeholder="At least 6 characters"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
          })}
        />

        {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-coconut-800 text-white font-medium py-3 rounded-full hover:bg-coconut-900 transition-colors disabled:opacity-60"
        >
          {submitting ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <p className="text-center text-coconut-600 text-sm mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-leaf-600 font-medium hover:underline">Log in</Link>
      </p>
    </div>
  )
}

export default Register