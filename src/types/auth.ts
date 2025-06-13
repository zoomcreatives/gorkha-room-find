
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'searcher' | 'owner' | 'admin';
  avatar?: string;
  phone?: string;
  location?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Dummy credentials for testing
export const DUMMY_CREDENTIALS = {
  searcher: { email: 'searcher@example.com', password: 'searcher123' },
  owner: { email: 'owner@example.com', password: 'owner123' },
  admin: { email: 'admin@example.com', password: 'admin123' }
};

export const DUMMY_USERS: User[] = [
  {
    id: '1',
    email: 'searcher@example.com',
    name: 'Priya Sharma',
    role: 'searcher',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    phone: '+977-9841234567',
    location: 'Kathmandu'
  },
  {
    id: '2',
    email: 'owner@example.com',
    name: 'Rajesh Thapa',
    role: 'owner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    phone: '+977-9851234567',
    location: 'Pokhara'
  },
  {
    id: '3',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    phone: '+977-9861234567',
    location: 'Kathmandu'
  }
];
