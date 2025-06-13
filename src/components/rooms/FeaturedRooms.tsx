
import React, { useState } from 'react';
import { TrendingUp, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ModernRoomCard from './ModernRoomCard';
import { Room } from '../../types/room';

interface FeaturedRoomsProps {
  rooms: Room[];
  onViewRoom: (room: Room) => void;
  userRole?: 'searcher' | 'owner' | 'admin';
}

const FeaturedRooms: React.FC<FeaturedRoomsProps> = ({ 
  rooms, 
  onViewRoom, 
  userRole = 'searcher' 
}) => {
  const [displayCount, setDisplayCount] = useState(6);
  const [filter, setFilter] = useState<'all' | 'trending' | 'latest'>('all');

  const filteredRooms = rooms.filter(room => {
    if (filter === 'trending') {
      // Mock trending logic - in real app, this would be based on views/popularity
      return room.price > 15000;
    }
    if (filter === 'latest') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(room.createdAt) > oneWeekAgo;
    }
    return true;
  });

  const displayedRooms = filteredRooms.slice(0, displayCount);
  const hasMore = displayCount < filteredRooms.length;

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 6, filteredRooms.length));
  };

  return (
    <section className="py-16 px-4 bg-background/50">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
          <div className="space-y-2 mb-6 md:mb-0">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-rose-500" />
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Featured Rooms
              </h2>
            </div>
            <p className="text-muted-foreground text-lg">
              Discover the most popular and well-rated rooms in your area
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white border-0' : ''}
            >
              All Rooms
            </Button>
            <Button
              variant={filter === 'trending' ? 'default' : 'outline'}
              onClick={() => setFilter('trending')}
              className={filter === 'trending' ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white border-0' : ''}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </Button>
            <Button
              variant={filter === 'latest' ? 'default' : 'outline'}
              onClick={() => setFilter('latest')}
              className={filter === 'latest' ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white border-0' : ''}
            >
              Latest
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="text-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <p className="text-2xl font-bold text-rose-500">{filteredRooms.length}+</p>
            <p className="text-sm text-muted-foreground">Available Rooms</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <p className="text-2xl font-bold text-orange-500">50+</p>
            <p className="text-sm text-muted-foreground">Locations</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <p className="text-2xl font-bold text-green-500">1000+</p>
            <p className="text-sm text-muted-foreground">Happy Tenants</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50">
            <p className="text-2xl font-bold text-blue-500">4.8★</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>
        </div>

        {/* Room Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedRooms.map((room) => (
            <ModernRoomCard
              key={room.id}
              room={room}
              onView={onViewRoom}
              userRole={userRole}
            />
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <Button
              onClick={loadMore}
              size="lg"
              className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-0 px-8"
            >
              Load More Rooms
            </Button>
          </div>
        )}

        {/* No results message */}
        {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold mb-2">No rooms found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedRooms;
