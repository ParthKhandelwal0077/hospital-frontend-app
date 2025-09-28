'use client';

import { useForm } from 'react-hook-form';
import { DoctorFormData, SPECIALIZATION_CHOICES } from '@/lib/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

interface DoctorFormProps {
  initialData?: Partial<DoctorFormData>;
  onSubmit: (data: DoctorFormData) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  submitLabel: string;
}

const DoctorForm: React.FC<DoctorFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorFormData>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          {...register('first_name', {
            required: 'First name is required',
          })}
          error={errors.first_name?.message}
          placeholder="John"
        />

        <Input
          label="Last Name"
          {...register('last_name', {
            required: 'Last name is required',
          })}
          error={errors.last_name?.message}
          placeholder="Smith"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          error={errors.email?.message}
          placeholder="dr.smith@example.com"
        />

        <Input
          label="Phone Number"
          type="tel"
          {...register('phone_number', {
            required: 'Phone number is required',
          })}
          error={errors.phone_number?.message}
          placeholder="+1234567890"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Specialization"
          options={SPECIALIZATION_CHOICES}
          {...register('specialization', {
            required: 'Specialization is required',
          })}
          error={errors.specialization?.message}
          placeholder="Select specialization"
        />

        <Input
          label="License Number"
          {...register('license_number', {
            required: 'License number is required',
          })}
          error={errors.license_number?.message}
          placeholder="MD123456"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Years of Experience"
          type="number"
          {...register('years_of_experience', {
            required: 'Years of experience is required',
            min: { value: 0, message: 'Must be 0 or greater' },
            valueAsNumber: true,
          })}
          error={errors.years_of_experience?.message}
          placeholder="10"
        />

        <Input
          label="Qualification"
          {...register('qualification', {
            required: 'Qualification is required',
          })}
          error={errors.qualification?.message}
          placeholder="MD, MBBS"
        />
      </div>

      <div>
        <Input
          label="Clinic Name"
          {...register('clinic_name', {
            required: 'Clinic name is required',
          })}
          error={errors.clinic_name?.message}
          placeholder="City Medical Center"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Clinic Address
        </label>
        <textarea
          {...register('clinic_address', {
            required: 'Clinic address is required',
          })}
          rows={3}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter clinic address"
        />
        {errors.clinic_address && (
          <p className="mt-1 text-sm text-red-600">{errors.clinic_address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Input
          label="City"
          {...register('city', {
            required: 'City is required',
          })}
          error={errors.city?.message}
          placeholder="New York"
        />

        <Input
          label="State"
          {...register('state', {
            required: 'State is required',
          })}
          error={errors.state?.message}
          placeholder="NY"
        />

        <Input
          label="ZIP Code"
          {...register('zip_code', {
            required: 'ZIP code is required',
          })}
          error={errors.zip_code?.message}
          placeholder="10001"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Consultation Fee ($)"
          type="number"
          step="0.01"
          {...register('consultation_fee', {
            required: 'Consultation fee is required',
            min: { value: 0, message: 'Must be 0 or greater' },
            valueAsNumber: true,
          })}
          error={errors.consultation_fee?.message}
          placeholder="150.00"
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_available"
            {...register('is_available')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="is_available" className="ml-2 block text-sm text-gray-900">
            Currently Available
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default DoctorForm;
