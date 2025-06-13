
import React, { useState, useMemo } from 'react';
import { Search, Filter, MapPin, SlidersHorizontal } from 'lucide-react';
import { DUMMY_ROOMS } from '../data/dummyRooms';
import { Room, SearchFilters as SearchFiltersType } from '../types/room';
import Header from '../components/layout/Header';
import RoomCard from '../components/rooms/RoomCard';
import SearchFilters from '../components/search/SearchFilters';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const SearcherDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Filter approved rooms only for searchers
  const approvedRooms = DUMMY_ROOMS.filter(room => room.status === 'approved');

  const filteredRooms = useMemo(() => {
    let filtered = approvedRooms.filter(room => {
      // Text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          room.title.toLowerCase().includes(query) ||
          room.location.area.toLowerCase().includes(query) ||
          room.location.city.toLowerCase().includes(query) ||
          room.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Location filter
      if (filters.location && 
          !room.location.city.toLowerCase().includes(filters.location.toLowerCase()) &&
          !room.location.area.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Price range
      if (filters.minPrice && room.price < filters.minPrice) return false;
      if (filters.maxPrice && room.price > filters.maxPrice) return false;

      // Room type
      if (filters.roomType && filters.roomType.length > 0 && !filters.roomType.includes(room.roomType)) {
        return false;
      }

      // Amenities
      if (filters.amenities && filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(amenity => room.amenities.includes(amenity));
        if (!hasAllAmenities) return false;
      }

      // Features
      if (filters.furnished && !room.features.furnished) return false;
      if (filters.parking && !room.features.parking) return false;
      if (filters.wifi && !room.features.wifi) return false;
      if (filters.kitchen && !room.features.kitchen) return false;

      // Washroom type
      if (filters.washroom && room.features.washroom !== filters.washroom) return false;

      // Gender preference
      if (filters.gender && room.preferences.gender !== filters.gender && room.preferences.gender !== 'any') {
        return false;
      }

      // Availability date
      if (filters.availableFrom) {
        const filterDate = new Date(filters.availableFrom);
        const roomDate = new Date(room.availability.availableFrom);
        if (roomDate > filterDate) return false;
      }

      // Minimum stay
      if (filters.minStay && room.availability.minStay > filters.minStay) return false;

      return true;
    });

    // Sort results
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        break;
    }

    return filtered;
  }, [approvedRooms, searchQuery, filters, sortBy]);

  const handleViewRoom = (room: Room) => {
    setSelectedRoom(room);
  };

  const activeFiltersCount = Object.keys(filters).filter(key => {
    const value = filters[key as keyof SearchFiltersType];
    return value !== undefined && value !== '' && (Array.isArray(value) ? value.length > 0 : true);
  }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearchToggle={() => setShowFilters(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Room</h1>
          <p className="text-gray-600">Discover the best rooms available across Nepal</p>
        </div>

        {/* Search and Filters Bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by location, area, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filter and Sort Controls */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(true)}
                  className="flex items-center space-x-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-rose-500 text-white text-xs rounded-full px-2 py-1">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {filteredRooms.length} rooms found with active filters
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFilters({})}
                className="text-rose-600 hover:text-rose-700"
              >
                Clear all filters
              </Button>
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map(room => (
            <RoomCard
              key={room.id}
              room={room}
              onView={handleViewRoom}
              userRole="searcher"
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredRooms.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No rooms found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters to find more options.
              </p>
              <Button onClick={() => setFilters({})} variant="outline">
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Search Filters Modal */}
        {showFilters && (
          <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClose={() => setShowFilters(false)}
            isModal
          />
        )}
      </main>
    </div>
  );
};

export default SearcherDashboard;
