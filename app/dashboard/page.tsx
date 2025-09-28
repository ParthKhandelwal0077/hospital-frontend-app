'use client';

import { useState, useEffect } from 'react';
import { Users, UserCheck, GitBranch, Activity } from 'lucide-react';
import AuthGuard from '@/components/auth/AuthGuard';
import Card from '@/components/ui/Card';
import { patientsAPI, doctorsAPI, mappingsAPI } from '@/lib/api';
import { Patient, Doctor, PatientDoctorMapping } from '@/lib/types';

interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalMappings: number;
  activeMappings: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    totalDoctors: 0,
    totalMappings: 0,
    activeMappings: 0,
  });
  const [recentPatients, setRecentPatients] = useState<Patient[]>([]);
  const [recentDoctors, setRecentDoctors] = useState<Doctor[]>([]);
  const [recentMappings, setRecentMappings] = useState<PatientDoctorMapping[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      console.log('Dashboard - Starting to fetch data...');
      console.log('Dashboard - Token check:', localStorage.getItem('access_token') ? 'Present' : 'Missing');
      try {
        console.log('Dashboard - Making API calls...');
        const [patientsRes, doctorsRes, mappingsRes] = await Promise.all([
          patientsAPI.list(),
          doctorsAPI.list(),
          mappingsAPI.list(),
        ]);
        
        console.log('Dashboard - API responses received:', {
          patients: patientsRes.status,
          doctors: doctorsRes.status,
          mappings: mappingsRes.status
        });

        const patients = patientsRes.data.results || patientsRes.data;
        const doctors = doctorsRes.data.results || doctorsRes.data;
        const mappings = mappingsRes.data.results || mappingsRes.data;

        setStats({
          totalPatients: patients.length,
          totalDoctors: doctors.length,
          totalMappings: mappings.length,
          activeMappings: mappings.filter((m: PatientDoctorMapping) => m.status === 'ACTIVE').length,
        });

        console.log('Dashboard - Data extracted:', {
          patients: patients.length,
          doctors: doctors.length,
          mappings: mappings.length
        });

        setRecentPatients(patients.slice(0, 5));
        setRecentDoctors(doctors.slice(0, 5));
        setRecentMappings(mappings.slice(0, 5));
      } catch (error: unknown) {
        console.error('Dashboard - Failed to fetch dashboard data:', error);
        const err = error as { response?: { data?: unknown } };
        console.error('Dashboard - Error details:', err.response?.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Doctors',
      value: stats.totalDoctors,
      icon: UserCheck,
      color: 'bg-green-500',
    },
    {
      title: 'Total Mappings',
      value: stats.totalMappings,
      icon: GitBranch,
      color: 'bg-purple-500',
    },
    {
      title: 'Active Mappings',
      value: stats.activeMappings,
      icon: Activity,
      color: 'bg-orange-500',
    },
  ];

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Overview of your healthcare management system
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Recent Data */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Patients */}
            <Card title="Recent Patients" subtitle="Latest patient registrations">
              <div className="space-y-3">
                {recentPatients.length > 0 ? (
                  recentPatients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{patient.full_name}</p>
                        <p className="text-sm text-gray-500">{patient.email}</p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(patient.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No patients yet</p>
                )}
              </div>
            </Card>

            {/* Recent Doctors */}
            <Card title="Recent Doctors" subtitle="Latest doctor registrations">
              <div className="space-y-3">
                {recentDoctors.length > 0 ? (
                  recentDoctors.map((doctor) => (
                    <div key={doctor.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{doctor.full_name}</p>
                        <p className="text-sm text-gray-500">{doctor.specialization}</p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(doctor.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No doctors yet</p>
                )}
              </div>
            </Card>

            {/* Recent Mappings */}
            <Card title="Recent Mappings" subtitle="Latest patient-doctor assignments">
              <div className="space-y-3">
                {recentMappings.length > 0 ? (
                  recentMappings.map((mapping) => (
                    <div key={mapping.id} className="py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {mapping.patient_name}
                        </p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          mapping.status === 'ACTIVE' 
                            ? 'bg-green-100 text-green-800'
                            : mapping.status === 'INACTIVE'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {mapping.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        → {mapping.doctor_name}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No mappings yet</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
