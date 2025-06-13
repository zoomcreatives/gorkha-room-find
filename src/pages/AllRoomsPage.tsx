
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Filter } from 'lucide-react';
import ModernHeader from '../components/layout/ModernHeader';
import RoomDetailPage from '../components/rooms/RoomDetailPage';
import ModernRoomCard from '../components/rooms/ModernRoomCard';
import SearchFilters from '../components/search/SearchFilters';
import { Room, SearchFilters as SearchFiltersType } from '../types/room';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

// Mock data fetch function
const fetchAllRooms = async (): Promise<Room[]> => {
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
    },
    {
      id: '4',
      title: 'Luxury Apartment in Boudha',
      description: 'A fully furnished luxury apartment with modern amenities in peaceful Boudha area.',
      price: 25000,
      location: {
        area: 'Boudha',
        city: 'Kathmandu',
        address: 'Boudha Stupa Area',
        coordinates: { lat: 27.7215, lng: 85.3620 }
      },
      roomType: 'apartment',
      amenities: ['WiFi', 'Parking', 'Kitchen Access', 'Laundry', 'Security', 'Balcony'],
      images: [
        'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop'
      ],
      ownerId: '5',
      ownerName: 'Pemba Sherpa',
      ownerPhone: '+977-9871234567',
      status: 'approved',
      createdAt: '2024-01-05T16:45:00Z',
      updatedAt: '2024-01-05T16:45:00Z',
      availability: {
        available: true,
        availableFrom: '2024-02-15',
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
        profession: ['Professional', 'Family'],
        smokingAllowed: false,
        petsAllowed: true
      }
    }
  ];
};

const AllRoomsPage: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const { data: rooms = [], isLoading, error } = useQuery({
    queryKey: ['allRooms'],
    queryFn: fetchAllRooms,
  });

  const handleViewRoom = (room: Room) => {
    setSelectedRoom(room);
  };

  const handleBackToList = () => {
    setSelectedRoom(null);
  };

  const handleBackToDashboard = () => {
    navigate(-1);
  };

  const filterRooms = (rooms: Room[], filters: SearchFiltersType): Room[] => {
    return rooms.filter(room => {
      // Price filter
      if (filters.minPrice && room.price < filters.minPrice) return false;
      if (filters.maxPrice && room.price > filters.maxPrice) return false;

      // Location filter
      if (filters.location && 
          !room.location.area.toLowerCase().includes(filters.location.toLowerCase()) &&
          !room.location.city.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Room type filter
      if (filters.roomType && filters.roomType.length > 0 && 
          !filters.roomType.includes(room.roomType)) {
        return false;
      }

      // Amenities filter
      if (filters.amenities && filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => 
          room.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      // Features filter
      if (filters.furnished && !room.features.furnished) return false;
      if (filters.parking && !room.features.parking) return false;
      if (filters.wifi && !room.features.wifi) return false;
      if (filters.kitchen && !room.features.kitchen) return false;

      // Washroom type filter
      if (filters.washroom && room.features.washroom !== filters.washroom) return false;

      // Gender preference filter
      if (filters.gender && room.preferences.gender !== 'any' && 
          room.preferences.gender !== filters.gender) return false;

      // Availability filter
      if (filters.availableFrom) {
        const roomAvailableDate = new Date(room.availability.availableFrom);
        const filterDate = new Date(filters.availableFrom);
        if (roomAvailableDate > filterDate) return false;
      }

      // Minimum stay filter
      if (filters.minStay && room.availability.minStay > filters.minStay) return false;

      return true;
    });
  };

  const filteredRooms = filterRooms(rooms, filters);

  if (selectedRoom) {
    return <RoomDetailPage room={selectedRoom} onBack={handleBackToList} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading all rooms...</p>
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
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={handleBackToDashboard}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">All Rooms</h1>
              <p className="text-muted-foreground">
                {filteredRooms.length} {filteredRooms.length === 1 ? 'room' : 'rooms'} available
              </p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-80 flex-shrink-0`}>
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClose={() => setShowFilters(false)}
              isModal={showFilters && window.innerWidth < 768}
            />
          </div>

          {/* Rooms Grid */}
          <div className="flex-1">
            {filteredRooms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map(room => (
                  <ModernRoomCard
                    key={room.id}
                    room={room}
                    onViewRoom={handleViewRoom}
                    userRole="searcher"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No rooms found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters to see more results.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setFilters({})}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRoomsPage;
