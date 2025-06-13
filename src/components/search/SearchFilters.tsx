
import React, { useState } from 'react';
import { X, Search, Filter } from 'lucide-react';
import { SearchFilters as SearchFiltersType, NEPAL_LOCATIONS, KATHMANDU_AREAS, ROOM_AMENITIES } from '../../types/room';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onClose?: () => void;
  isModal?: boolean;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onClose,
  isModal = false
}) => {
  const [localFilters, setLocalFilters] = useState<SearchFiltersType>(filters);

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    if (isModal && onClose) {
      onClose();
    }
  };

  const handleClearFilters = () => {
    const clearedFilters: SearchFiltersType = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const updateFilter = (key: keyof SearchFiltersType, value: any) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const currentAmenities = localFilters.amenities || [];
    if (checked) {
      updateFilter('amenities', [...currentAmenities, amenity]);
    } else {
      updateFilter('amenities', currentAmenities.filter(a => a !== amenity));
    }
  };

  const handleRoomTypeChange = (roomType: string, checked: boolean) => {
    const currentTypes = localFilters.roomType || [];
    if (checked) {
      updateFilter('roomType', [...currentTypes, roomType]);
    } else {
      updateFilter('roomType', currentTypes.filter(t => t !== roomType));
    }
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Location */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Location</Label>
        <Select value={localFilters.location || ''} onValueChange={(value) => updateFilter('location', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select city or area" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Locations</SelectItem>
            {NEPAL_LOCATIONS.map(location => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
            <Separator className="my-2" />
            <Label className="px-2 py-1 text-sm font-medium text-gray-500">Kathmandu Areas</Label>
            {KATHMANDU_AREAS.map(area => (
              <SelectItem key={area} value={area}>{area}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Price Range (₹)</Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="minPrice" className="text-sm">Min Price</Label>
            <Input
              id="minPrice"
              type="number"
              placeholder="0"
              value={localFilters.minPrice || ''}
              onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
          <div>
            <Label htmlFor="maxPrice" className="text-sm">Max Price</Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="No limit"
              value={localFilters.maxPrice || ''}
              onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
        </div>
      </div>

      {/* Room Type */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Room Type</Label>
        <div className="grid grid-cols-2 gap-3">
          {['single', 'double', 'shared', 'studio', 'apartment'].map(type => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={localFilters.roomType?.includes(type) || false}
                onCheckedChange={(checked) => handleRoomTypeChange(type, checked as boolean)}
              />
              <Label htmlFor={type} className="text-sm capitalize">{type}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Amenities</Label>
        <div className="grid grid-cols-2 gap-3">
          {ROOM_AMENITIES.slice(0, 6).map(amenity => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={localFilters.amenities?.includes(amenity) || false}
                onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
              />
              <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Features</Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="furnished"
              checked={localFilters.furnished || false}
              onCheckedChange={(checked) => updateFilter('furnished', checked)}
            />
            <Label htmlFor="furnished" className="text-sm">Furnished</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="parking"
              checked={localFilters.parking || false}
              onCheckedChange={(checked) => updateFilter('parking', checked)}
            />
            <Label htmlFor="parking" className="text-sm">Parking Available</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="wifi"
              checked={localFilters.wifi || false}
              onCheckedChange={(checked) => updateFilter('wifi', checked)}
            />
            <Label htmlFor="wifi" className="text-sm">WiFi Included</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="kitchen"
              checked={localFilters.kitchen || false}
              onCheckedChange={(checked) => updateFilter('kitchen', checked)}
            />
            <Label htmlFor="kitchen" className="text-sm">Kitchen Access</Label>
          </div>
        </div>
      </div>

      {/* Washroom Type */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Washroom</Label>
        <Select value={localFilters.washroom || ''} onValueChange={(value) => updateFilter('washroom', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any type</SelectItem>
            <SelectItem value="attached">Attached</SelectItem>
            <SelectItem value="shared">Shared</SelectItem>
            <SelectItem value="common">Common</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Gender Preference */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Gender Preference</Label>
        <Select value={localFilters.gender || ''} onValueChange={(value) => updateFilter('gender', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Any gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any gender</SelectItem>
            <SelectItem value="male">Male only</SelectItem>
            <SelectItem value="female">Female only</SelectItem>
            <SelectItem value="any">No preference</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Availability */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Availability</Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="availableFrom" className="text-sm">Available From</Label>
            <Input
              id="availableFrom"
              type="date"
              value={localFilters.availableFrom || ''}
              onChange={(e) => updateFilter('availableFrom', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="minStay" className="text-sm">Min Stay (months)</Label>
            <Input
              id="minStay"
              type="number"
              placeholder="Any"
              value={localFilters.minStay || ''}
              onChange={(e) => updateFilter('minStay', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4">
        <Button onClick={handleClearFilters} variant="outline" className="flex-1">
          Clear All
        </Button>
        <Button onClick={handleApplyFilters} className="flex-1 bg-rose-500 hover:bg-rose-600">
          <Search className="w-4 h-4 mr-2" />
          Apply Filters
        </Button>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Search Filters
            </CardTitle>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <FilterContent />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Search Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FilterContent />
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
