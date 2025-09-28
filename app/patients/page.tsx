'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import AuthGuard from '@/components/auth/AuthGuard';
import PatientList from '@/components/patients/PatientList';
import PatientForm from '@/components/patients/PatientForm';
import Modal from '@/components/ui/Modal';
import { Patient, PatientFormData } from '@/lib/types';
import { patientsAPI } from '@/lib/api';

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'add' | 'edit' | 'view'>('list');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await patientsAPI.list();
      setPatients(response.data.results || response.data);
    } catch (error) {
      toast.error('Failed to fetch patients');
      console.error('Failed to fetch patients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedPatient(null);
    setViewMode('add');
    setIsModalOpen(true);
  };

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setViewMode('edit');
    setIsModalOpen(true);
  };

  const handleView = (patient: Patient) => {
    setSelectedPatient(patient);
    setViewMode('view');
    setIsModalOpen(true);
  };

  const handleDelete = async (patient: Patient) => {
    if (!confirm(`Are you sure you want to delete ${patient.full_name}?`)) {
      return;
    }

    try {
      await patientsAPI.delete(patient.id);
      setPatients(patients.filter(p => p.id !== patient.id));
      toast.success('Patient deleted successfully');
    } catch (error) {
      toast.error('Failed to delete patient');
      console.error('Failed to delete patient:', error);
    }
  };

  const handleFormSubmit = async (data: PatientFormData) => {
    setIsFormLoading(true);
    try {
      if (viewMode === 'add') {
        const response = await patientsAPI.create(data);
        const newPatient = response.data.patient || response.data;
        setPatients([newPatient, ...patients]);
        toast.success(response.data.message || 'Patient added successfully');
      } else if (viewMode === 'edit' && selectedPatient) {
        const response = await patientsAPI.update(selectedPatient.id, data);
        const updatedPatient = response.data.patient || response.data;
        setPatients(patients.map(p => p.id === selectedPatient.id ? updatedPatient : p));
        toast.success(response.data.message || 'Patient updated successfully');
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
    setSelectedPatient(null);
    setViewMode('list');
  };

  const getModalTitle = () => {
    switch (viewMode) {
      case 'add':
        return 'Add New Patient';
      case 'edit':
        return 'Edit Patient';
      case 'view':
        return 'Patient Details';
      default:
        return '';
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
            <p className="mt-2 text-gray-600">
              Manage your patient records
            </p>
          </div>

          <PatientList
            patients={patients}
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
            {viewMode === 'view' && selectedPatient ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedPatient.full_name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedPatient.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedPatient.phone_number}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(selectedPatient.date_of_birth).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedPatient.gender === 'M' ? 'Male' : 
                           selectedPatient.gender === 'F' ? 'Female' : 'Other'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedPatient.address}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedPatient.city}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedPatient.state}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedPatient.zip_code}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Blood Type</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedPatient.blood_type || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Allergies</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedPatient.allergies || 'None reported'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Medical History</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedPatient.medical_history || 'No history recorded'}</p>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  <p>Created: {new Date(selectedPatient.created_at).toLocaleString()}</p>
                  <p>Last Updated: {new Date(selectedPatient.updated_at).toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <PatientForm
                initialData={selectedPatient || undefined}
                onSubmit={handleFormSubmit}
                onCancel={handleCloseModal}
                isLoading={isFormLoading}
                submitLabel={viewMode === 'add' ? 'Add Patient' : 'Update Patient'}
              />
            )}
          </Modal>
        </div>
      </div>
    </AuthGuard>
  );
}
