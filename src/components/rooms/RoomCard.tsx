
import React from 'react';
import { MapPin, User, Wifi, Car } from 'lucide-react';
import { Room } from '../../types/room';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';

interface RoomCardProps {
  room: Room;
  showStatus?: boolean;
  onView?: (room: Room) => void;
  onEdit?: (room: Room) => void;
  onApprove?: (roomId: string) => void;
  onReject?: (roomId: string) => void;
  userRole?: 'searcher' | 'owner' | 'admin';
}

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  showStatus = false,
  onView,
  onEdit,
  onApprove,
  onReject,
  userRole = 'searcher'
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoomTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1) + ' Room';
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {showStatus && (
          <Badge className={`absolute top-3 right-3 ${getStatusColor(room.status)}`}>
            {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
          </Badge>
        )}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/90">
            {getRoomTypeLabel(room.roomType)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title and Price */}
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 flex-1 mr-2">
              {room.title}
            </h3>
            <div className="text-right flex-shrink-0">
              <p className="text-xl font-bold text-gray-900">₹{room.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500">per month</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm">{room.location.area}, {room.location.city}</span>
          </div>

          {/* Amenities */}
          <div className="flex items-center space-x-3 text-gray-600">
            {room.features.wifi && <Wifi className="h-4 w-4" />}
            {room.features.parking && <Car className="h-4 w-4" />}
            {room.preferences.gender !== 'any' && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span className="text-xs">{room.preferences.gender}</span>
              </div>
            )}
          </div>

          {/* Key Features */}
          <div className="flex flex-wrap gap-1">
            {room.features.furnished && (
              <Badge variant="outline" className="text-xs">Furnished</Badge>
            )}
            {room.features.kitchen && (
              <Badge variant="outline" className="text-xs">Kitchen</Badge>
            )}
            <Badge variant="outline" className="text-xs">
              {room.features.washroom} washroom
            </Badge>
          </div>

          {/* Availability */}
          <div className="text-sm text-gray-600">
            <p>Available from: {new Date(room.availability.availableFrom).toLocaleDateString()}</p>
            <p>Min stay: {room.availability.minStay} months</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-2">
        {userRole === 'searcher' && (
          <Button onClick={() => onView?.(room)} className="w-full bg-rose-500 hover:bg-rose-600">
            View Details
          </Button>
        )}

        {userRole === 'owner' && (
          <div className="flex space-x-2 w-full">
            <Button onClick={() => onView?.(room)} variant="outline" className="flex-1">
              View
            </Button>
            <Button onClick={() => onEdit?.(room)} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Edit
            </Button>
          </div>
        )}

        {userRole === 'admin' && room.status === 'pending' && (
          <div className="flex space-x-2 w-full">
            <Button 
              onClick={() => onReject?.(room.id)} 
              variant="outline" 
              className="flex-1 text-red-600 border-red-600 hover:bg-red-50"
            >
              Reject
            </Button>
            <Button 
              onClick={() => onApprove?.(room.id)} 
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Approve
            </Button>
          </div>
        )}

        {userRole === 'admin' && room.status !== 'pending' && (
          <Button onClick={() => onView?.(room)} variant="outline" className="w-full">
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RoomCard;
