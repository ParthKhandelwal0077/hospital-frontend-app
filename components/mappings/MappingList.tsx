'use client';

import { useState } from 'react';
import { Edit, Trash2, Eye, Plus, User, UserCheck } from 'lucide-react';
import { PatientDoctorMapping } from '@/lib/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface MappingListProps {
  mappings: PatientDoctorMapping[];
  onView: (mapping: PatientDoctorMapping) => void;
  onEdit: (mapping: PatientDoctorMapping) => void;
  onDelete: (mapping: PatientDoctorMapping) => void;
  onAdd: () => void;
  isLoading: boolean;
}

const MappingList: React.FC<MappingListProps> = ({
  mappings,
  onView,
  onEdit,
  onDelete,
  onAdd,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredMappings = mappings.filter(mapping => {
    const matchesSearch = 
      mapping.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mapping.doctor_specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      !filterStatus || mapping.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
            placeholder="Search mappings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="max-w-xs">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <Button onClick={onAdd} className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Mapping
        </Button>
      </div>

      {filteredMappings.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {searchTerm || filterStatus 
                ? 'No mappings found matching your criteria.' 
                : 'No patient-doctor mappings yet.'}
            </p>
            {!searchTerm && !filterStatus && (
              <Button onClick={onAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Mapping
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredMappings.map((mapping) => (
            <Card key={mapping.id}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(mapping.status)}`}>
                        {mapping.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        Assigned {new Date(mapping.assigned_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Patient</p>
                        <p className="text-lg font-semibold text-gray-900">{mapping.patient_name}</p>
                        <p className="text-sm text-gray-600">Patient ID: {mapping.patient}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
                        <UserCheck className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Doctor</p>
                        <p className="text-lg font-semibold text-gray-900">{mapping.doctor_name}</p>
                        <p className="text-sm text-gray-600">{mapping.doctor_specialization}</p>
                        <p className="text-sm text-gray-600">Doctor ID: {mapping.doctor}</p>
                      </div>
                    </div>
                  </div>

                  {mapping.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">Notes:</span> {mapping.notes}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 lg:mt-0 lg:ml-6 flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onView(mapping)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(mapping)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onDelete(mapping)}
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

export default MappingList;
