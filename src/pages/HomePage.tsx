
import React from 'react';
import ModernHeader from '../components/layout/ModernHeader';
import HeroSection from '../components/layout/HeroSection';
import FeaturedRooms from '../components/rooms/FeaturedRooms';
import { useQuery } from '@tanstack/react-query';
import { Room } from '../types/room';
import { useNavigate } from 'react-router-dom';

// Mock data fetch function for featured rooms (showing only 3)
const fetchFeaturedRooms = async (): Promise<Room[]> => {
  // Simulated API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: '1',
      title: 'Cozy Studio Apartment in Thamel',
      description: 'A beautiful studio apartment located in the heart of Thamel with modern amenities and great connectivity.',
      price: 18000,
      location: {
        area: 'Thamel',
        city: 'Kathmandu',
        address: 'Thamel Marg, Ward 29',
        coordinates: { lat: 27.7172, lng: 85.3240 }
      },
      roomType: 'studio',
      amenities: ['WiFi', 'Parking', 'Kitchen Access', 'Laundry', 'Security'],
      images: [
        'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop'
      ],
      ownerId: '2',
      ownerName: 'Rajesh Thapa',
      ownerPhone: '+977-9851234567',
      status: 'approved',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      availability: {
        available: true,
        availableFrom: '2024-02-01',
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
        profession: ['Student', 'Professional'],
        smokingAllowed: false,
        petsAllowed: false
      }
    },
    {
      id: '2',
      title: 'Modern Single Room in Baneshwor',
      description: 'A comfortable single room with attached bathroom and modern facilities in Baneshwor area.',
      price: 12000,
      location: {
        area: 'Baneshwor',
        city: 'Kathmandu',
        address: 'New Baneshwor, Ward 32',
        coordinates: { lat: 27.6890, lng: 85.3459 }
      },
      roomType: 'single',
      amenities: ['WiFi', 'Water Tank', 'Backup Power', 'Security'],
      images: [
        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop'
      ],
      ownerId: '3',
      ownerName: 'Sunita Magar',
      ownerPhone: '+977-9841234567',
      status: 'approved',
      createdAt: '2024-01-10T14:30:00Z',
      updatedAt: '2024-01-10T14:30:00Z',
      availability: {
        available: true,
        availableFrom: '2024-01-20',
        minStay: 3
      },
      features: {
        furnished: true,
        parking: false,
        wifi: true,
        kitchen: false,
        washroom: 'attached'
      },
      preferences: {
        gender: 'female',
        profession: ['Student'],
        smokingAllowed: false,
        petsAllowed: false
      }
    },
    {
      id: '3',
      title: 'Spacious Double Room in Pulchowk',
      description: 'A spacious double room perfect for students near Pulchowk Engineering Campus with all necessary amenities.',
      price: 15000,
      location: {
        area: 'Pulchowk',
        city: 'Lalitpur',
        address: 'Pulchowk Engineering Campus Area',
        coordinates: { lat: 27.6794, lng: 85.3164 }
      },
      roomType: 'double',
      amenities: ['WiFi', 'Kitchen Access', 'Study Table', 'Wardrobe'],
      images: [
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop'
      ],
      ownerId: '4',
      ownerName: 'Krishna Shrestha',
      ownerPhone: '+977-9861234567',
      status: 'approved',
      createdAt: '2024-01-08T09:15:00Z',
      updatedAt: '2024-01-08T09:15:00Z',
      availability: {
        available: true,
        availableFrom: '2024-01-25',
        minStay: 4
      },
      features: {
        furnished: true,
        parking: true,
        wifi: true,
        kitchen: true,
        washroom: 'shared'
      },
      preferences: {
        gender: 'male',
        profession: ['Student', 'Engineer'],
        smokingAllowed: false,
        petsAllowed: true
      }
    }
  ];
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const { data: rooms = [], isLoading, error } = useQuery({
    queryKey: ['featuredRooms'],
    queryFn: fetchFeaturedRooms,
  });

  const handleViewRoom = (room: Room) => {
    navigate(`/room-detailed/${room.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading amazing rooms...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h1>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      <HeroSection />
      <FeaturedRooms 
        rooms={rooms} 
        onViewRoom={handleViewRoom}
        userRole="searcher"
      />
    </div>
  );
};

export default HomePage;
