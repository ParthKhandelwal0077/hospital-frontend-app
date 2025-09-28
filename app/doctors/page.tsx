'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import AuthGuard from '@/components/auth/AuthGuard';
import DoctorList from '@/components/doctors/DoctorList';
import DoctorForm from '@/components/doctors/DoctorForm';
import Modal from '@/components/ui/Modal';
import { Doctor, DoctorFormData } from '@/lib/types';
import { doctorsAPI } from '@/lib/api';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'add' | 'edit' | 'view'>('list');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await doctorsAPI.list();
      setDoctors(response.data.results || response.data);
    } catch (error) {
      toast.error('Failed to fetch doctors');
      console.error('Failed to fetch doctors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedDoctor(null);
    setViewMode('add');
    setIsModalOpen(true);
  };

  const handleEdit = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setViewMode('edit');
    setIsModalOpen(true);
  };

  const handleView = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setViewMode('view');
    setIsModalOpen(true);
  };

  const handleDelete = async (doctor: Doctor) => {
    if (!confirm(`Are you sure you want to delete Dr. ${doctor.full_name}?`)) {
      return;
    }

    try {
      await doctorsAPI.delete(doctor.id);
      setDoctors(doctors.filter(d => d.id !== doctor.id));
      toast.success('Doctor deleted successfully');
    } catch (error) {
      toast.error('Failed to delete doctor');
      console.error('Failed to delete doctor:', error);
    }
  };

  const handleFormSubmit = async (data: DoctorFormData) => {
    setIsFormLoading(true);
    try {
      if (viewMode === 'add') {
        const response = await doctorsAPI.create(data);
        const newDoctor = response.data.doctor || response.data;
        setDoctors([newDoctor, ...doctors]);
        toast.success(response.data.message || 'Doctor added successfully');
      } else if (viewMode === 'edit' && selectedDoctor) {
        const response = await doctorsAPI.update(selectedDoctor.id, data);
        const updatedDoctor = response.data.doctor || response.data;
        setDoctors(doctors.map(d => d.id === selectedDoctor.id ? updatedDoctor : d));
        toast.success(response.data.message || 'Doctor updated successfully');
      }
      setIsModalOpen(false);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string } } };
      const errorMessage = err.response?.data?.detail || 'Operation failed';
      toast.error(errorMessage);
      console.error('Form submission error:', error);
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
    setViewMode('list');
  };

  const getModalTitle = () => {
    switch (viewMode) {
      case 'add':
        return 'Add New Doctor';
      case 'edit':
        return 'Edit Doctor';
      case 'view':
        return 'Doctor Details';
      default:
        return '';
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Doctors</h1>
            <p className="mt-2 text-gray-600">
              Manage your doctor profiles
            </p>
          </div>

          <DoctorList
            doctors={doctors}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
            isLoading={isLoading}
          />

          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={getModalTitle()}
            size="xl"
          >
            {viewMode === 'view' && selectedDoctor ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedDoctor.full_name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedDoctor.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedDoctor.phone_number}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Specialization</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedDoctor.specialization}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">License Number</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedDoctor.license_number}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedDoctor.years_of_experience} years</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Qualification</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedDoctor.qualification}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Consultation Fee</label>
                        <p className="mt-1 text-sm text-gray-900">${selectedDoctor.consultation_fee}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Availability</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedDoctor.is_available ? (
                            <span className="text-green-600">Available</span>
                          ) : (
                            <span className="text-red-600">Not Available</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Clinic Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Clinic Name</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedDoctor.clinic_name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Clinic Address</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedDoctor.clinic_address}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedDoctor.city}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedDoctor.state}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedDoctor.zip_code}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  <p>Created: {new Date(selectedDoctor.created_at).toLocaleString()}</p>
                  <p>Last Updated: {new Date(selectedDoctor.updated_at).toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <DoctorForm
                initialData={selectedDoctor ? {
                  ...selectedDoctor,
                  consultation_fee: parseFloat(selectedDoctor.consultation_fee)
                } : undefined}
                onSubmit={handleFormSubmit}
                onCancel={handleCloseModal}
                isLoading={isFormLoading}
                submitLabel={viewMode === 'add' ? 'Add Doctor' : 'Update Doctor'}
              />
            )}
          </Modal>
        </div>
      </div>
    </AuthGuard>
  );
}
