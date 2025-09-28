import axios from 'axios';
import { PatientFormData, DoctorFormData, MappingFormData, LoginFormData, RegisterFormData } from './types';

const API_BASE_URL = 'hospital-backend-app.vercel.app';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    console.log(`Request interceptor - Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      console.log('Request interceptor - token:', token ? `Present (${token.substring(0, 20)}...)` : 'Missing');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Request interceptor - Authorization header set');
      } else {
        console.log('Request interceptor - No token found in localStorage');
      }
    }
    console.log('Request interceptor - Final headers:', config.headers);
    return config;
  },
  (error) => {
    console.log('Request interceptor - Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    console.log(`Response interceptor - Success: ${response.status} for ${response.config.method?.toUpperCase()} ${response.config.url}`);
    return response;
  },
  async (error) => {
    console.log('Response interceptor - error:', error.response?.status, error.response?.data);
    console.log('Response interceptor - error config:', error.config?.url);
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('Response interceptor - 401 error, attempting token refresh');
      originalRequest._retry = true;

      if (typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('refresh_token');
        console.log('Response interceptor - refresh token:', refreshToken ? 'Present' : 'Missing');
        
        if (refreshToken) {
          try {
            console.log('Response interceptor - attempting to refresh token');
            const response = await axios.post(`${API_BASE_URL}/api/auth/token/refresh/`, {
              refresh: refreshToken,
            });

            const { access } = response.data;
            localStorage.setItem('access_token', access);
            console.log('Response interceptor - token refreshed successfully');

            // Retry the original request
            originalRequest.headers.Authorization = `Bearer ${access}`;
            return api(originalRequest);
          } catch (refreshError) {
            console.log('Response interceptor - token refresh failed:', refreshError);
            // Refresh failed, redirect to login
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            window.location.href = '/auth/login';
          }
        } else {
          console.log('Response interceptor - no refresh token, redirecting to login');
          // No refresh token, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          window.location.href = '/auth/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// API endpoints
export const authAPI = {
  register: (data: RegisterFormData) => api.post('/api/auth/register/', data),
  login: (data: LoginFormData) => api.post('/api/auth/login/', data),
  profile: () => api.get('/api/auth/profile/'),
  refreshToken: (refreshToken: string) => 
    api.post('/api/auth/token/refresh/', { refresh: refreshToken }),
};

export const patientsAPI = {
  list: () => api.get('/api/patients/'),
  create: (data: PatientFormData) => api.post('/api/patients/', data),
  get: (id: number) => api.get(`/api/patients/${id}/`),
  update: (id: number, data: Partial<PatientFormData>) => api.put(`/api/patients/${id}/`, data),
  delete: (id: number) => api.delete(`/api/patients/${id}/`),
};

export const doctorsAPI = {
  list: () => api.get('/api/doctors/'),
  create: (data: DoctorFormData) => api.post('/api/doctors/create/', data),
  get: (id: number) => api.get(`/api/doctors/${id}/`),
  update: (id: number, data: Partial<DoctorFormData>) => api.put(`/api/doctors/${id}/update/`, data),
  delete: (id: number) => api.delete(`/api/doctors/${id}/delete/`),
};

export const mappingsAPI = {
  list: () => api.get('/api/mappings/'),
  create: (data: MappingFormData) => api.post('/api/mappings/', data),
  getByPatient: (patientId: number) => api.get(`/api/mappings/patient/${patientId}/`),
  update: (id: number, data: Partial<MappingFormData>) => api.put(`/api/mappings/${id}/update/`, data),
  delete: (id: number) => api.delete(`/api/mappings/${id}/`),
};
