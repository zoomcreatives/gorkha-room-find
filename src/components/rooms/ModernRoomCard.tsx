
import React from 'react';
import { MapPin, User, Wifi, Car, Heart, Share, Eye } from 'lucide-react';
import { Room } from '../../types/room';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface ModernRoomCardProps {
  room: Room;
  onView?: (room: Room) => void;
  onEdit?: (room: Room) => void;
  userRole?: 'searcher' | 'owner' | 'admin';
}

const ModernRoomCard: React.FC<ModernRoomCardProps> = ({
  room,
  onView,
  onEdit,
  userRole = 'searcher'
}) => {
  const getRoomTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1) + ' Room';
  };

  return (
    <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-500 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Button size="icon" variant="outline" className="h-8 w-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" className="h-8 w-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
            <Share className="h-4 w-4" />
          </Button>
        </div>

        {/* Room Type Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            {getRoomTypeLabel(room.roomType)}
          </Badge>
        </div>

        {/* Price */}
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-2xl font-bold">₹{room.price.toLocaleString()}</p>
          <p className="text-sm opacity-90">per month</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title and Location */}
        <div className="space-y-2">
          <h3 className="font-semibold text-xl text-foreground line-clamp-2 group-hover:text-rose-500 transition-colors">
            {room.title}
          </h3>
          
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm">{room.location.area}, {room.location.city}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-muted-foreground">
            {room.features.wifi && <Wifi className="h-4 w-4" />}
            {room.features.parking && <Car className="h-4 w-4" />}
            {room.preferences.gender !== 'any' && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span className="text-xs capitalize">{room.preferences.gender}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span className="text-xs">245 views</span>
          </div>
        </div>

        {/* Key Features Tags */}
        <div className="flex flex-wrap gap-2">
          {room.features.furnished && (
            <Badge variant="secondary" className="text-xs bg-secondary/50">Furnished</Badge>
          )}
          {room.features.kitchen && (
            <Badge variant="secondary" className="text-xs bg-secondary/50">Kitchen</Badge>
          )}
          <Badge variant="secondary" className="text-xs bg-secondary/50 capitalize">
            {room.features.washroom} washroom
          </Badge>
        </div>

        {/* Availability Info */}
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Available from: {new Date(room.availability.availableFrom).toLocaleDateString()}</p>
          <p>Min stay: {room.availability.minStay} months</p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2">
          {userRole === 'searcher' && (
            <Button 
              onClick={() => onView?.(room)} 
              className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-0"
            >
              View Details
            </Button>
          )}

          {userRole === 'owner' && (
            <div className="flex space-x-2">
              <Button onClick={() => onView?.(room)} variant="outline" className="flex-1">
                View
              </Button>
              <Button onClick={() => onEdit?.(room)} className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0">
                Edit
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ModernRoomCard;
