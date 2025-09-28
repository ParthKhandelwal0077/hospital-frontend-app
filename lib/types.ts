// Patient types
export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: 'M' | 'F' | 'O';
  address: string;
  city: string;
  state: string;
  zip_code: string;
  blood_type?: string;
  allergies?: string;
  medical_history?: string;
  created_by_username: string;
  created_at: string;
  updated_at: string;
}

// Doctor types
export interface Doctor {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone_number: string;
  specialization: 'CARDIOLOGY' | 'DERMATOLOGY' | 'EMERGENCY' | 'ENDOCRINOLOGY' | 'GASTROENTEROLOGY' | 'GENERAL' | 'NEUROLOGY' | 'ONCOLOGY' | 'ORTHOPEDICS' | 'PEDIATRICS' | 'PSYCHIATRY' | 'RADIOLOGY' | 'SURGERY' | 'UROLOGY' | 'OTHER';
  license_number: string;
  years_of_experience: number;
  qualification: string;
  clinic_name: string;
  clinic_address: string;
  city: string;
  state: string;
  zip_code: string;
  consultation_fee: string;
  is_available: boolean;
  created_by_username: string;
  created_at: string;
  updated_at: string;
}

// Mapping types
export interface PatientDoctorMapping {
  id: number;
  patient: number;
  doctor: number;
  patient_name: string;
  doctor_name: string;
  doctor_specialization: string;
  assigned_date: string;
  status: 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
  notes?: string;
  created_by_username: string;
  created_at: string;
  updated_at: string;
}

//User types 
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}
// Form types
export interface PatientFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  gender: 'M' | 'F' | 'O';
  address: string;
  city: string;
  state: string;
  zip_code: string;
  blood_type?: string;
  allergies?: string;
  medical_history?: string;
}

export interface DoctorFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  specialization: 'CARDIOLOGY' | 'DERMATOLOGY' | 'EMERGENCY' | 'ENDOCRINOLOGY' | 'GASTROENTEROLOGY' | 'GENERAL' | 'NEUROLOGY' | 'ONCOLOGY' | 'ORTHOPEDICS' | 'PEDIATRICS' | 'PSYCHIATRY' | 'RADIOLOGY' | 'SURGERY' | 'UROLOGY' | 'OTHER';
  license_number: string;
  years_of_experience: number;
  qualification: string;
  clinic_name: string;
  clinic_address: string;
  city: string;
  state: string;
  zip_code: string;
  consultation_fee: number;
  is_available: boolean;
}

export interface MappingFormData {
  patient: number;
  doctor: number;
  status: 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
  notes?: string;
}

// Auth types
export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name: string;
  last_name: string;
}

// Constants
export const GENDER_CHOICES = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'O', label: 'Other' },
];

export const SPECIALIZATION_CHOICES = [
  { value: 'CARDIOLOGY', label: 'Cardiology' },
  { value: 'DERMATOLOGY', label: 'Dermatology' },
  { value: 'EMERGENCY', label: 'Emergency Medicine' },
  { value: 'ENDOCRINOLOGY', label: 'Endocrinology' },
  { value: 'GASTROENTEROLOGY', label: 'Gastroenterology' },
  { value: 'GENERAL', label: 'General Medicine' },
  { value: 'NEUROLOGY', label: 'Neurology' },
  { value: 'ONCOLOGY', label: 'Oncology' },
  { value: 'ORTHOPEDICS', label: 'Orthopedics' },
  { value: 'PEDIATRICS', label: 'Pediatrics' },
  { value: 'PSYCHIATRY', label: 'Psychiatry' },
  { value: 'RADIOLOGY', label: 'Radiology' },
  { value: 'SURGERY', label: 'Surgery' },
  { value: 'UROLOGY', label: 'Urology' },
  { value: 'OTHER', label: 'Other' },
];

export const STATUS_CHOICES = [
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'COMPLETED', label: 'Completed' },
];

//Auth Response 
export interface AuthResponse {
  message: string;
  user: User;
  tokens: {
    access: string;
    refresh: string;
  };
}