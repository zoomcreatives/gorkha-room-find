
export interface Room {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    area: string;
    city: string;
    address: string;
    coordinates?: { lat: number; lng: number };
  };
  roomType: 'single' | 'double' | 'shared' | 'studio' | 'apartment';
  amenities: string[];
  images: string[];
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  availability: {
    available: boolean;
    availableFrom: string;
    minStay: number; // in months
  };
  features: {
    furnished: boolean;
    parking: boolean;
    wifi: boolean;
    kitchen: boolean;
    washroom: 'attached' | 'shared' | 'common';
  };
  preferences: {
    gender: 'male' | 'female' | 'any';
    profession: string[];
    smokingAllowed: boolean;
    petsAllowed: boolean;
  };
}

export interface SearchFilters {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  roomType?: string[];
  amenities?: string[];
  furnished?: boolean;
  parking?: boolean;
  wifi?: boolean;
  kitchen?: boolean;
  washroom?: string;
  gender?: string;
  availableFrom?: string;
  minStay?: number;
}

export const NEPAL_LOCATIONS = [
  'Kathmandu',
  'Pokhara',
  'Lalitpur',
  'Bhaktapur',
  'Biratnagar',
  'Birgunj',
  'Dharan',
  'Butwal',
  'Nepalgunj',
  'Hetauda'
];

export const KATHMANDU_AREAS = [
  'Thamel',
  'New Baneshwor',
  'Balaju',
  'Kirtipur',
  'Pulchowk',
  'Baneshwor',
  'Dillibazar',
  'Maharajgunj',
  'Budhanilkantha',
  'Gongabu',
  'Kalanki',
  'Koteshwor'
];

export const ROOM_AMENITIES = [
  'WiFi',
  'Parking',
  'Kitchen Access',
  'Laundry',
  'Security',
  'Water Tank',
  'Backup Power',
  'Garden/Terrace',
  'Study Table',
  'Wardrobe'
];
