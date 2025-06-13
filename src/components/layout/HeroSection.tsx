
import React from 'react';
import { Search, MapPin, Star, Grid } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const heroImages = [
    'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=800&fit=crop'
  ];

  const handleBrowseAllRooms = () => {
    navigate('/all-rooms');
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === 0 ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                animation: `slideshow 15s infinite ${index * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Find Your Perfect
          <span className="block bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
            Room in Nepal
          </span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Discover comfortable, affordable rooms across Kathmandu, Lalitpur, and beyond. 
          Your ideal living space is just a search away.
        </p>

        {/* Search Bar */}
        <div className="glass rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Enter location (e.g., Thamel, Baneshwor)"
                className="pl-10 h-12 bg-white/90 border-white/30 text-gray-800 placeholder:text-gray-500"
              />
            </div>
            <Button className="h-12 px-8 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold">
              <Search className="w-5 h-5 mr-2" />
              Search Rooms
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={handleBrowseAllRooms}
            variant="outline" 
            className="glass border-white/30 text-white hover:bg-white/20 h-12 px-8"
          >
            <Grid className="w-5 h-5 mr-2" />
            Browse All Rooms
          </Button>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>4.8/5 Rating</span>
            </div>
            <div className="text-gray-300">•</div>
            <span>1000+ Happy Tenants</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideshow {
          0%, 20% { opacity: 1; }
          25%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
