import { useForm } from 'react-hook-form'
import FormInput from './FormInput'

function AddressForm({ defaultValues, onSubmit, onCancel, submitting }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Full Name"
          error={errors.fullName?.message}
          {...register('fullName', { required: 'Required' })}
        />
        <FormInput
          label="Phone"
          error={errors.phone?.message}
          {...register('phone', {
            required: 'Required',
            pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit number' },
          })}
        />
      </div>

      <FormInput
        label="Address Line 1"
        error={errors.line1?.message}
        {...register('line1', { required: 'Required' })}
      />
      <FormInput label="Address Line 2 (optional)" {...register('line2')} />

      <div className="grid grid-cols-3 gap-4">
        <FormInput
          label="City"
          error={errors.city?.message}
          {...register('city', { required: 'Required' })}
        />
        <FormInput
          label="State"
          error={errors.state?.message}
          {...register('state', { required: 'Required' })}
        />
        <FormInput
          label="Pincode"
          error={errors.pincode?.message}
          {...register('pincode', {
            required: 'Required',
            pattern: { value: /^[0-9]{6}$/, message: '6 digits' },
          })}
        />
      </div>

      <FormInput label="Label (e.g. Home, Work)" {...register('label')} />

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-coconut-800 text-white font-medium px-6 py-2.5 rounded-full hover:bg-coconut-900 transition-colors disabled:opacity-60"
        >
          {submitting ? 'Saving...' : 'Save Address'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-coconut-600 font-medium px-6 py-2.5 rounded-full hover:bg-coconut-100 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default AddressForm