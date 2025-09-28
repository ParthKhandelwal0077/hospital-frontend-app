'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import AuthGuard from '@/components/auth/AuthGuard';
import MappingList from '@/components/mappings/MappingList';
import MappingForm from '@/components/mappings/MappingForm';
import Modal from '@/components/ui/Modal';
import { PatientDoctorMapping, MappingFormData, Patient, Doctor } from '@/lib/types';
import { mappingsAPI, patientsAPI, doctorsAPI } from '@/lib/api';

export default function MappingsPage() {
  const [mappings, setMappings] = useState<PatientDoctorMapping[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [selectedMapping, setSelectedMapping] = useState<PatientDoctorMapping | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'add' | 'edit' | 'view'>('list');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [mappingsRes, patientsRes, doctorsRes] = await Promise.all([
        mappingsAPI.list(),
        patientsAPI.list(),
        doctorsAPI.list(),
      ]);
      setMappings(mappingsRes.data.results || mappingsRes.data);
      setPatients(patientsRes.data.results || patientsRes.data);
      setDoctors(doctorsRes.data.results || doctorsRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = () => {
    if (patients.length === 0) {
      toast.error('Please add patients first');
      return;
    }
    if (doctors.length === 0) {
      toast.error('Please add doctors first');
      return;
    }
    setSelectedMapping(null);
    setViewMode('add');
    setIsModalOpen(true);
  };

  const handleEdit = (mapping: PatientDoctorMapping) => {
    setSelectedMapping(mapping);
    setViewMode('edit');
    setIsModalOpen(true);
  };

  const handleView = (mapping: PatientDoctorMapping) => {
    setSelectedMapping(mapping);
    setViewMode('view');
    setIsModalOpen(true);
  };

  const handleDelete = async (mapping: PatientDoctorMapping) => {
    if (!confirm(`Are you sure you want to delete the mapping between ${mapping.patient.full_name} and ${mapping.doctor.full_name}?`)) {
      return;
    }

    try {
      await mappingsAPI.delete(mapping.id);
      setMappings(mappings.filter(m => m.id !== mapping.id));
      toast.success('Mapping deleted successfully');
    } catch (error) {
      toast.error('Failed to delete mapping');
      console.error('Failed to delete mapping:', error);
    }
  };

  const handleFormSubmit = async (data: MappingFormData) => {
    setIsFormLoading(true);
    try {
      if (viewMode === 'add') {
        const response = await mappingsAPI.create(data);
        const newMapping = response.data.mapping || response.data;
        setMappings([newMapping, ...mappings]);
        toast.success(response.data.message || 'Mapping created successfully');
      } else if (viewMode === 'edit' && selectedMapping) {
        const response = await mappingsAPI.update(selectedMapping.id, data);
        const updatedMapping = response.data.mapping || response.data;
        setMappings(mappings.map(m => m.id === selectedMapping.id ? updatedMapping : m));
        toast.success(response.data.message || 'Mapping updated successfully');
      }
      setIsModalOpen(false);
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'Operation failed';
      toast.error(errorMessage);
      console.error('Form submission error:', error);
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMapping(null);
    setViewMode('list');
  };

  const getModalTitle = () => {
    switch (viewMode) {
      case 'add':
        return 'Create New Mapping';
      case 'edit':
        return 'Edit Mapping';
      case 'view':
        return 'Mapping Details';
      default:
        return '';
    }
  };

  const getInitialFormData = (): Partial<MappingFormData> | undefined => {
    if (!selectedMapping) return undefined;
    return {
      patient: selectedMapping.patient,
      doctor: selectedMapping.doctor,
      status: selectedMapping.status,
      notes: selectedMapping.notes,
    };
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Patient-Doctor Mappings</h1>
            <p className="mt-2 text-gray-600">
              Manage patient-doctor assignments and relationships
            </p>
          </div>

          <MappingList
            mappings={mappings}
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
            size="lg"
          >
            {viewMode === 'view' && selectedMapping ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      Patient Information
                    </h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {selectedMapping.patient_name}</p>
                      <p><span className="font-medium">Patient ID:</span> {selectedMapping.patient}</p>
                      {/* Find the full patient details */}
                      {(() => {
                        const patient = patients.find(p => p.id === selectedMapping.patient);
                        return patient ? (
                          <>
                            <p><span className="font-medium">Email:</span> {patient.email}</p>
                            <p><span className="font-medium">Phone:</span> {patient.phone_number}</p>
                            <p><span className="font-medium">DOB:</span> {new Date(patient.date_of_birth).toLocaleDateString()}</p>
                            <p><span className="font-medium">Gender:</span> {
                              patient.gender === 'M' ? 'Male' : 
                              patient.gender === 'F' ? 'Female' : 'Other'
                            }</p>
                          </>
                        ) : (
                          <p className="text-gray-500">Patient details not available</p>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                      Doctor Information
                    </h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {selectedMapping.doctor_name}</p>
                      <p><span className="font-medium">Specialization:</span> {selectedMapping.doctor_specialization}</p>
                      <p><span className="font-medium">Doctor ID:</span> {selectedMapping.doctor}</p>
                      {/* Find the full doctor details */}
                      {(() => {
                        const doctor = doctors.find(d => d.id === selectedMapping.doctor);
                        return doctor ? (
                          <>
                            <p><span className="font-medium">Email:</span> {doctor.email}</p>
                            <p><span className="font-medium">Phone:</span> {doctor.phone_number}</p>
                            <p><span className="font-medium">Clinic:</span> {doctor.clinic_name}</p>
                            <p><span className="font-medium">Experience:</span> {doctor.years_of_experience} years</p>
                          </>
                        ) : (
                          <p className="text-gray-500">Doctor details not available</p>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Mapping Details</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
                        selectedMapping.status === 'ACTIVE' 
                          ? 'bg-green-100 text-green-800'
                          : selectedMapping.status === 'INACTIVE'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {selectedMapping.status}
                      </span>
                    </p>
                    <p><span className="font-medium">Assigned Date:</span> {new Date(selectedMapping.assigned_date).toLocaleString()}</p>
                    {selectedMapping.notes && (
                      <div>
                        <span className="font-medium">Notes:</span>
                        <p className="mt-1 text-gray-700 bg-white p-3 rounded border">{selectedMapping.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  <p>Created: {new Date(selectedMapping.created_at).toLocaleString()}</p>
                  <p>Last Updated: {new Date(selectedMapping.updated_at).toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <MappingForm
                patients={patients}
                doctors={doctors}
                initialData={getInitialFormData()}
                onSubmit={handleFormSubmit}
                onCancel={handleCloseModal}
                isLoading={isFormLoading}
                submitLabel={viewMode === 'add' ? 'Create Mapping' : 'Update Mapping'}
              />
            )}
          </Modal>
        </div>
      </div>
    </AuthGuard>
  );
}
