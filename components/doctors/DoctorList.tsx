'use client';

import { useState } from 'react';
import { Edit, Trash2, Eye, Plus, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { Doctor } from '@/lib/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface DoctorListProps {
  doctors: Doctor[];
  onView: (doctor: Doctor) => void;
  onEdit: (doctor: Doctor) => void;
  onDelete: (doctor: Doctor) => void;
  onAdd: () => void;
  isLoading: boolean;
}

const DoctorList: React.FC<DoctorListProps> = ({
  doctors,
  onView,
  onEdit,
  onDelete,
  onAdd,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('');

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = 
      doctor.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.clinic_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialization = 
      !filterSpecialization || doctor.specialization === filterSpecialization;

    return matchesSearch && matchesSpecialization;
  });

  const specializations = [...new Set(doctors.map(d => d.specialization))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="max-w-xs">
          <select
            value={filterSpecialization}
            onChange={(e) => setFilterSpecialization(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All Specializations</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
        <Button onClick={onAdd} className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Doctor
        </Button>
      </div>

      {filteredDoctors.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {searchTerm || filterSpecialization 
                ? 'No doctors found matching your criteria.' 
                : 'No doctors yet.'}
            </p>
            {!searchTerm && !filterSpecialization && (
              <Button onClick={onAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Doctor
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {doctor.full_name}
                        </h3>
                        <div className="flex items-center">
                          {doctor.is_available ? (
                            <div title="Available">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            </div>
                          ) : (
                            <div title="Not Available">
                              <XCircle className="h-5 w-5 text-red-500" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Specialization:</span> {doctor.specialization}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Experience:</span> {doctor.years_of_experience} years
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Email:</span> {doctor.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Phone:</span> {doctor.phone_number}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Clinic:</span> {doctor.clinic_name}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span className="font-medium">Fee:</span> ${doctor.consultation_fee}
                        </p>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className="text-xs text-gray-500">
                        Added {new Date(doctor.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 lg:mt-0 lg:ml-6 flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onView(doctor)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(doctor)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onDelete(doctor)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorList;
