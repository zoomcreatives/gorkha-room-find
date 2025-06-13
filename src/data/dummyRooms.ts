
import { Room } from '../types/room';

export const DUMMY_ROOMS: Room[] = [
  {
    id: '1',
    title: 'Cozy Single Room in Thamel',
    description: 'Beautiful single room in the heart of Thamel with all modern amenities. Perfect for students and working professionals.',
    price: 15000,
    location: {
      area: 'Thamel',
      city: 'Kathmandu',
      address: 'Thamel Marg, Kathmandu',
      coordinates: { lat: 27.7172, lng: 85.3240 }
    },
    roomType: 'single',
    amenities: ['WiFi', 'Parking', 'Kitchen Access', 'Security', 'Water Tank'],
    images: [
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
    ],
    ownerId: '2',
    ownerName: 'Rajesh Thapa',
    ownerPhone: '+977-9851234567',
    status: 'approved',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-16',
    availability: {
      available: true,
      availableFrom: '2024-02-01',
      minStay: 3
    },
    features: {
      furnished: true,
      parking: true,
      wifi: true,
      kitchen: true,
      washroom: 'attached'
    },
    preferences: {
      gender: 'any',
      profession: ['Student', 'Professional'],
      smokingAllowed: false,
      petsAllowed: false
    }
  },
  {
    id: '2',
    title: 'Spacious Double Room in New Baneshwor',
    description: 'Modern double room with attached bathroom, perfect for couples or shared accommodation.',
    price: 25000,
    location: {
      area: 'New Baneshwor',
      city: 'Kathmandu',
      address: 'New Baneshwor, Kathmandu',
      coordinates: { lat: 27.6915, lng: 85.3398 }
    },
    roomType: 'double',
    amenities: ['WiFi', 'Parking', 'Kitchen Access', 'Laundry', 'Security', 'Backup Power'],
    images: [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
    ],
    ownerId: '2',
    ownerName: 'Rajesh Thapa',
    ownerPhone: '+977-9851234567',
    status: 'pending',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    availability: {
      available: true,
      availableFrom: '2024-02-15',
      minStay: 6
    },
    features: {
      furnished: true,
      parking: true,
      wifi: true,
      kitchen: true,
      washroom: 'attached'
    },
    preferences: {
      gender: 'any',
      profession: ['Professional', 'Graduate Student'],
      smokingAllowed: false,
      petsAllowed: true
    }
  },
  {
    id: '3',
    title: 'Studio Apartment in Pulchowk',
    description: 'Self-contained studio apartment with kitchen and all amenities included.',
    price: 35000,
    location: {
      area: 'Pulchowk',
      city: 'Lalitpur',
      address: 'Pulchowk, Lalitpur',
      coordinates: { lat: 27.6784, lng: 85.3206 }
    },
    roomType: 'studio',
    amenities: ['WiFi', 'Parking', 'Kitchen Access', 'Laundry', 'Security', 'Water Tank', 'Garden/Terrace'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
    ],
    ownerId: '2',
    ownerName: 'Rajesh Thapa',
    ownerPhone: '+977-9851234567',
    status: 'approved',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
    availability: {
      available: true,
      availableFrom: '2024-03-01',
      minStay: 12
    },
    features: {
      furnished: true,
      parking: true,
      wifi: true,
      kitchen: true,
      washroom: 'attached'
    },
    preferences: {
      gender: 'any',
      profession: ['Professional', 'Graduate Student'],
      smokingAllowed: false,
      petsAllowed: false
    }
  },
  {
    id: '4',
    title: 'Shared Room in Kirtipur',
    description: 'Budget-friendly shared accommodation perfect for students near Tribhuvan University.',
    price: 8000,
    location: {
      area: 'Kirtipur',
      city: 'Kathmandu',
      address: 'Kirtipur, Kathmandu',
      coordinates: { lat: 27.6789, lng: 85.2789 }
    },
    roomType: 'shared',
    amenities: ['WiFi', 'Kitchen Access', 'Security', 'Study Table'],
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ],
    ownerId: '2',
    ownerName: 'Rajesh Thapa',
    ownerPhone: '+977-9851234567',
    status: 'rejected',
    createdAt: '2024-01-25',
    updatedAt: '2024-01-26',
    availability: {
      available: true,
      availableFrom: '2024-02-10',
      minStay: 2
    },
    features: {
      furnished: true,
      parking: false,
      wifi: true,
      kitchen: true,
      washroom: 'shared'
    },
    preferences: {
      gender: 'male',
      profession: ['Student'],
      smokingAllowed: false,
      petsAllowed: false
    }
  }
];
