'use client';

import { useState } from 'react';
import { Edit, Trash2, Eye, Plus } from 'lucide-react';
import { Patient } from '@/lib/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface PatientListProps {
  patients: Patient[];
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
  onAdd: () => void;
  isLoading: boolean;
}

const PatientList: React.FC<PatientListProps> = ({
  patients,
  onView,
  onEdit,
  onDelete,
  onAdd,
  isLoading,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone_number.includes(searchTerm)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <Button onClick={onAdd} className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </div>

      {filteredPatients.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {searchTerm ? 'No patients found matching your search.' : 'No patients yet.'}
            </p>
            {!searchTerm && (
              <Button onClick={onAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Patient
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {patient.full_name}
                      </h3>
                      <div className="mt-1 space-y-1">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Email:</span> {patient.email}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Phone:</span> {patient.phone_number}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">DOB:</span> {new Date(patient.date_of_birth).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Gender:</span> {
                            patient.gender === 'M' ? 'Male' : 
                            patient.gender === 'F' ? 'Female' : 'Other'
                          }
                        </p>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className="text-xs text-gray-500">
                        Added {new Date(patient.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-0 sm:ml-6 flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onView(patient)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(patient)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onDelete(patient)}
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

export default PatientList;
