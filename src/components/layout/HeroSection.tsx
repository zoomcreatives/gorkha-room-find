
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NEPAL_LOCATIONS } from '../../types/room';

const heroImages = [
  'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=1080&fit=crop'
];

const HeroSection: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Hero ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
        onClick={prevImage}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
        onClick={nextImage}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
              Room Space
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Discover comfortable, affordable rooms in the best locations across Nepal
          </p>

          {/* Search Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Select>
                  <SelectTrigger className="pl-10 bg-white/90 border-white/30 text-gray-900">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {NEPAL_LOCATIONS.map((location) => (
                      <SelectItem key={location} value={location.toLowerCase()}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Input
                placeholder="Budget range"
                className="bg-white/90 border-white/30 text-gray-900 placeholder:text-gray-500"
              />
              
              <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-0">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImage 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
