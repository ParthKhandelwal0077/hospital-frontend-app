'use client';

import { useForm } from 'react-hook-form';
import { MappingFormData, STATUS_CHOICES, Patient, Doctor } from '@/lib/types';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

interface MappingFormProps {
  patients: Patient[];
  doctors: Doctor[];
  initialData?: Partial<MappingFormData>;
  onSubmit: (data: MappingFormData) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
  submitLabel: string;
}

const MappingForm: React.FC<MappingFormProps> = ({
  patients,
  doctors,
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
  } = useForm<MappingFormData>({
    defaultValues: initialData,
  });

  const patientOptions = patients.map(patient => ({
    value: patient.id.toString(),
    label: patient.full_name,
  }));

  const doctorOptions = doctors.map(doctor => ({
    value: doctor.id.toString(),
    label: `${doctor.full_name} (${doctor.specialization})`,
  }));

  const onFormSubmit = (data: MappingFormData) => {
    // Convert string IDs back to numbers
    const formattedData = {
      ...data,
      patient: parseInt(data.patient.toString()),
      doctor: parseInt(data.doctor.toString()),
    };
    return onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <Select
        label="Patient"
        options={patientOptions}
        {...register('patient', {
          required: 'Patient is required',
        })}
        error={errors.patient?.message}
        placeholder="Select a patient"
      />

      <Select
        label="Doctor"
        options={doctorOptions}
        {...register('doctor', {
          required: 'Doctor is required',
        })}
        error={errors.doctor?.message}
        placeholder="Select a doctor"
      />

      <Select
        label="Status"
        options={STATUS_CHOICES}
        {...register('status', {
          required: 'Status is required',
        })}
        error={errors.status?.message}
        placeholder="Select status"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes (Optional)
        </label>
        <textarea
          {...register('notes')}
          rows={4}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Add any notes about this assignment"
        />
        {errors.notes && (
          <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
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

export default MappingForm;
