'use client';

import { useForm } from 'react-hook-form';
import { PatientFormData, GENDER_CHOICES } from '@/lib/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

interface PatientFormProps {
  initialData?: Partial<PatientFormData>;
  onSubmit: (data: PatientFormData) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  submitLabel: string;
}

const PatientForm: React.FC<PatientFormProps> = ({
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
  } = useForm<PatientFormData>({
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
          placeholder="Doe"
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
          placeholder="john@example.com"
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
        <Input
          label="Date of Birth"
          type="date"
          {...register('date_of_birth', {
            required: 'Date of birth is required',
          })}
          error={errors.date_of_birth?.message}
        />

        <Select
          label="Gender"
          options={GENDER_CHOICES}
          {...register('gender', {
            required: 'Gender is required',
          })}
          error={errors.gender?.message}
          placeholder="Select gender"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <textarea
          {...register('address', {
            required: 'Address is required',
          })}
          rows={3}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter full address"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
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
          label="Blood Type (Optional)"
          {...register('blood_type')}
          error={errors.blood_type?.message}
          placeholder="A+"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Allergies (Optional)
        </label>
        <textarea
          {...register('allergies')}
          rows={3}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="List any known allergies"
        />
        {errors.allergies && (
          <p className="mt-1 text-sm text-red-600">{errors.allergies.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Medical History (Optional)
        </label>
        <textarea
          {...register('medical_history')}
          rows={4}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter relevant medical history"
        />
        {errors.medical_history && (
          <p className="mt-1 text-sm text-red-600">{errors.medical_history.message}</p>
        )}
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

export default PatientForm;
