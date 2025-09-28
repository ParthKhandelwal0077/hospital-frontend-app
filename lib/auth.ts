import { authAPI } from './api';
import {User , AuthResponse, RegisterFormData} from './types';




export const auth = {
  login: async (username: string, password: string): Promise<AuthResponse> => {
    console.log('Auth.login - attempting login for username:', username);
    try {
      const response = await authAPI.login({ username, password });
      const data = response.data;
      
      console.log('Auth.login - response status:', response.status);
      console.log('Auth.login - response data:', data);
      
      // Store tokens in localStorage
      if (typeof window !== 'undefined') {
        console.log('Auth.login - storing tokens in localStorage');
        localStorage.setItem('access_token', data.tokens.access);
        localStorage.setItem('refresh_token', data.tokens.refresh);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        console.log('Auth.login - tokens stored, access_token:', data.tokens.access ? 'Present' : 'Missing');
        console.log('Auth.login - tokens stored, refresh_token:', data.tokens.refresh ? 'Present' : 'Missing');
        
        // Verify tokens were stored
        const storedToken = localStorage.getItem('access_token');
        console.log('Auth.login - verification - stored token:', storedToken ? `Present (${storedToken.substring(0, 20)}...)` : 'Missing');
      }
      
      return data;
    } catch (error) {
      console.error('Auth.login - Login failed:', error);
      throw error;
    }
  },

  register: async (userData: RegisterFormData): Promise<AuthResponse> => {
    const response = await authAPI.register(userData);
    const data = response.data;
    
    // Store tokens in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', data.tokens.access);
      localStorage.setItem('refresh_token', data.tokens.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  },

  getCurrentUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },

  isAuthenticated: (): boolean => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('access_token');
    }
    return false;
  },

  getProfile: async (): Promise<User> => {
    const response = await authAPI.profile();
    return response.data.user;
  },
};
