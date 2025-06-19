
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { NEPAL_LOCATIONS, KATHMANDU_AREAS, ROOM_AMENITIES } from '@/types/room';

const roomSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  price: z.number().min(1000, 'Price must be at least NPR 1000'),
  city: z.string().min(1, 'City is required'),
  area: z.string().min(1, 'Area is required'),
  address: z.string().min(10, 'Full address is required'),
  roomType: z.enum(['single', 'double', 'shared', 'studio', 'apartment']),
  furnished: z.boolean(),
  parking: z.boolean(),
  wifi: z.boolean(),
  kitchen: z.boolean(),
  washroom: z.enum(['attached', 'shared', 'common']),
  gender: z.enum(['male', 'female', 'any']),
  smokingAllowed: z.boolean(),
  petsAllowed: z.boolean(),
  availableFrom: z.string().min(1, 'Available from date is required'),
  minStay: z.number().min(1, 'Minimum stay is required'),
  ownerPhone: z.string().min(10, 'Phone number is required'),
  amenities: z.array(z.string()),
  profession: z.array(z.string()),
});

type RoomFormData = z.infer<typeof roomSchema>;

interface AddRoomFormProps {
  onClose: () => void;
  onSubmit: (data: RoomFormData & { images: string[] }) => void;
}

const AddRoomForm: React.FC<AddRoomFormProps> = ({ onClose, onSubmit }) => {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [customProfession, setCustomProfession] = useState('');

  const form = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      furnished: false,
      parking: false,
      wifi: false,
      kitchen: false,
      smokingAllowed: false,
      petsAllowed: false,
      washroom: 'shared',
      gender: 'any',
      roomType: 'single',
      minStay: 3,
      amenities: [],
      profession: [],
    },
  });

  const professionOptions = [
    'Student', 'Professional', 'Engineer', 'Doctor', 'Teacher', 'Business', 'IT Professional', 'Government Employee'
  ];

  const handleAmenityToggle = (amenity: string) => {
    const updated = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter(a => a !== amenity)
      : [...selectedAmenities, amenity];
    setSelectedAmenities(updated);
    form.setValue('amenities', updated);
  };

  const handleProfessionToggle = (profession: string) => {
    const updated = selectedProfessions.includes(profession)
      ? selectedProfessions.filter(p => p !== profession)
      : [...selectedProfessions, profession];
    setSelectedProfessions(updated);
    form.setValue('profession', updated);
  };

  const addCustomProfession = () => {
    if (customProfession.trim() && !selectedProfessions.includes(customProfession.trim())) {
      const updated = [...selectedProfessions, customProfession.trim()];
      setSelectedProfessions(updated);
      form.setValue('profession', updated);
      setCustomProfession('');
    }
  };

  const handleImageUpload = () => {
    // Mock image upload - in real app, this would handle file upload
    const mockImages = [
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    ];
    setUploadedImages(mockImages);
    toast({
      title: "Images uploaded successfully",
      description: "Your room images have been uploaded.",
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (data: RoomFormData) => {
    if (uploadedImages.length === 0) {
      toast({
        title: "Images required",
        description: "Please upload at least one image of your room.",
        variant: "destructive",
      });
      return;
    }

    onSubmit({ ...data, images: uploadedImages });
    toast({
      title: "Room posted successfully!",
      description: "Your room listing has been submitted for review.",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-bold">Post Your Room</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="p-6 space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Cozy Studio Apartment in Thamel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your room in detail - location benefits, nearby facilities, room features..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Rent (NPR)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="15000"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="roomType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Room Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select room type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="single">Single Room</SelectItem>
                            <SelectItem value="double">Double Room</SelectItem>
                            <SelectItem value="shared">Shared Room</SelectItem>
                            <SelectItem value="studio">Studio</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select city" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {NEPAL_LOCATIONS.map(city => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select area" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {KATHMANDU_AREAS.map(area => (
                              <SelectItem key={area} value={area}>{area}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Address</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Thamel Marg, Ward 29, near Garden of Dreams" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Features & Amenities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Features */}
                <div className="space-y-4">
                  <h4 className="font-medium">Basic Features</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="furnished"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Furnished</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="parking"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Parking</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="wifi"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">WiFi</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="kitchen"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Kitchen</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Washroom */}
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="washroom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Washroom Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select washroom type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="attached">Attached</SelectItem>
                            <SelectItem value="shared">Shared</SelectItem>
                            <SelectItem value="common">Common</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Additional Amenities */}
                <div className="space-y-3">
                  <h4 className="font-medium">Additional Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {ROOM_AMENITIES.map(amenity => (
                      <Badge
                        key={amenity}
                        variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleAmenityToggle(amenity)}
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tenant Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tenant Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male Only</SelectItem>
                          <SelectItem value="female">Female Only</SelectItem>
                          <SelectItem value="any">Any</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-3">
                  <Label>Preferred Professions</Label>
                  <div className="flex flex-wrap gap-2">
                    {professionOptions.map(profession => (
                      <Badge
                        key={profession}
                        variant={selectedProfessions.includes(profession) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleProfessionToggle(profession)}
                      >
                        {profession}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add custom profession"
                      value={customProfession}
                      onChange={(e) => setCustomProfession(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" onClick={addCustomProfession}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="smokingAllowed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">Smoking Allowed</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="petsAllowed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">Pets Allowed</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Availability & Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Availability & Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="availableFrom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Available From</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="minStay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Stay (months)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="ownerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+977-9851234567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Room Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button type="button" variant="outline" onClick={handleImageUpload} className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Images
                  </Button>
                  
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Room ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Buttons */}
            <div className="flex space-x-4 pt-6">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-rose-600 hover:bg-rose-700">
                Post Room
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddRoomForm;
