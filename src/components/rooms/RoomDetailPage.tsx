
import React, { useState } from 'react';
import { ArrowLeft, MapPin, User, Wifi, Car, Share, Heart, Phone, MessageCircle, Calendar, Home, Shield, Star } from 'lucide-react';
import { Room } from '../../types/room';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';

interface RoomDetailPageProps {
  room: Room;
  onBack: () => void;
}

const RoomDetailPage: React.FC<RoomDetailPageProps> = ({ room, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getRoomTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1) + ' Room';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to listings</span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <Share className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[60vh]">
          {/* Main Image */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-xl">
            <img
              src={room.images[currentImageIndex]}
              alt={room.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-lg backdrop-blur-sm">
              {currentImageIndex + 1} / {room.images.length}
            </div>
          </div>
          
          {/* Thumbnail Grid */}
          <div className="grid grid-cols-2 gap-4">
            {room.images.slice(1, 5).map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => setCurrentImageIndex(index + 1)}
              >
                <img
                  src={image}
                  alt={`Room ${index + 2}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {index === 3 && room.images.length > 5 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold">
                    +{room.images.length - 5} more
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">{room.title}</h1>
                      <div className="flex items-center text-muted-foreground mb-4">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span>{room.location.address}, {room.location.area}, {room.location.city}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(room.status)}>
                      {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary" className="text-sm">
                      {getRoomTypeLabel(room.roomType)}
                    </Badge>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4" />
                      <span className="ml-2 text-sm text-muted-foreground">4.2 (23 reviews)</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{room.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Features & Amenities</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Room Features */}
                  <div>
                    <h4 className="font-medium mb-3 text-muted-foreground">Room Features</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Home className="h-4 w-4 mr-2 text-rose-500" />
                        <span className="text-sm">{room.features.furnished ? 'Fully Furnished' : 'Unfurnished'}</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-rose-500" />
                        <span className="text-sm capitalize">{room.features.washroom} Washroom</span>
                      </div>
                      {room.features.kitchen && (
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-2 text-rose-500" />
                          <span className="text-sm">Kitchen Access</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Additional Amenities */}
                  <div>
                    <h4 className="font-medium mb-3 text-muted-foreground">Additional Amenities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {room.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <div className="h-2 w-2 bg-rose-500 rounded-full mr-2"></div>
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Tenant Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-rose-500" />
                    <span className="text-sm">Gender: <span className="font-medium capitalize">{room.preferences.gender}</span></span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-rose-500" />
                    <span className="text-sm">Smoking: <span className="font-medium">{room.preferences.smokingAllowed ? 'Allowed' : 'Not Allowed'}</span></span>
                  </div>
                  <div className="flex items-center">
                    <Home className="h-4 w-4 mr-2 text-rose-500" />
                    <span className="text-sm">Pets: <span className="font-medium">{room.preferences.petsAllowed ? 'Allowed' : 'Not Allowed'}</span></span>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-rose-500" />
                    <span className="text-sm">Profession: <span className="font-medium">{room.preferences.profession.join(', ')}</span></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Booking */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-foreground">₹{room.price.toLocaleString()}</p>
                  <p className="text-muted-foreground">per month</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Available from:</span>
                    <span className="font-medium">{new Date(room.availability.availableFrom).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Minimum stay:</span>
                    <span className="font-medium">{room.availability.minStay} months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium capitalize">{room.availability.available ? 'Available' : 'Not Available'}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-0">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Owner
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Visit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Owner Information</h3>
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-12 w-12 bg-gradient-to-br from-rose-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {room.ownerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{room.ownerName}</p>
                    <p className="text-sm text-muted-foreground">Property Owner</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{room.ownerPhone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Response rate: 95%</span>
                  <span>Usually responds within 1 hour</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoomDetailPage;
