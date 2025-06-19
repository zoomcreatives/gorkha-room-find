
import React, { useState } from 'react';
import { Plus, Home, Clock, CheckCircle, XCircle, Eye, Edit, TrendingUp, Users, MapPin } from 'lucide-react';
import { DUMMY_ROOMS } from '../data/dummyRooms';
import { Room } from '../types/room';
import { useAuth } from '../contexts/AuthContext';
import ModernHeader from '../components/layout/ModernHeader';
import RoomCard from '../components/rooms/RoomCard';
import AddRoomForm from '../components/forms/AddRoomForm';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const OwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('all');
  const [showAddRoomForm, setShowAddRoomForm] = useState(false);
  const [rooms, setRooms] = useState(DUMMY_ROOMS.filter(room => room.ownerId === user?.id));

  const roomStats = {
    total: rooms.length,
    approved: rooms.filter(room => room.status === 'approved').length,
    pending: rooms.filter(room => room.status === 'pending').length,
    rejected: rooms.filter(room => room.status === 'rejected').length,
  };

  const totalRevenue = rooms.filter(r => r.status === 'approved').reduce((sum, room) => sum + room.price, 0);
  const avgPrice = rooms.length > 0 ? Math.round(totalRevenue / rooms.filter(r => r.status === 'approved').length) : 0;

  const filteredRooms = selectedTab === 'all' 
    ? rooms 
    : rooms.filter(room => room.status === selectedTab);

  const handleViewRoom = (room: Room) => {
    console.log('Viewing room:', room);
  };

  const handleEditRoom = (room: Room) => {
    console.log('Editing room:', room);
  };

  const handleAddRoom = () => {
    setShowAddRoomForm(true);
  };

  const handleAddRoomSubmit = (roomData: any) => {
    const newRoom: Room = {
      id: Date.now().toString(),
      title: roomData.title,
      description: roomData.description,
      price: roomData.price,
      location: {
        area: roomData.area,
        city: roomData.city,
        address: roomData.address,
      },
      roomType: roomData.roomType,
      amenities: roomData.amenities,
      images: roomData.images,
      ownerId: user?.id || '',
      ownerName: user?.name || '',
      ownerPhone: roomData.ownerPhone,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      availability: {
        available: true,
        availableFrom: roomData.availableFrom,
        minStay: roomData.minStay,
      },
      features: {
        furnished: roomData.furnished,
        parking: roomData.parking,
        wifi: roomData.wifi,
        kitchen: roomData.kitchen,
        washroom: roomData.washroom,
      },
      preferences: {
        gender: roomData.gender,
        profession: roomData.profession,
        smokingAllowed: roomData.smokingAllowed,
        petsAllowed: roomData.petsAllowed,
      },
    };

    setRooms(prev => [newRoom, ...prev]);
    setShowAddRoomForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your property listings and track performance
              </p>
            </div>
            <Button 
              onClick={handleAddRoom} 
              className="mt-4 lg:mt-0 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Property
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Total Properties</CardTitle>
              <Home className="h-5 w-5 text-blue-100" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roomStats.total}</div>
              <p className="text-xs text-blue-100 mt-1">All your listings</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-100">Active Listings</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-100" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roomStats.approved}</div>
              <p className="text-xs text-green-100 mt-1">Live on platform</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-100">Pending Review</CardTitle>
              <Clock className="h-5 w-5 text-yellow-100" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roomStats.pending}</div>
              <p className="text-xs text-yellow-100 mt-1">Under review</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">Avg. Price</CardTitle>
              <TrendingUp className="h-5 w-5 text-purple-100" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{avgPrice.toLocaleString()}</div>
              <p className="text-xs text-purple-100 mt-1">Per month</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Property Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-green-900">Active Listings</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-700">{roomStats.approved}</div>
                    <div className="text-sm text-green-600">₹{totalRevenue.toLocaleString()}/mo total</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="font-medium text-yellow-900">Pending Approval</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-700">{roomStats.pending}</div>
                    <div className="text-sm text-yellow-600">Awaiting review</div>
                  </div>
                </div>

                {roomStats.rejected > 0 && (
                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="font-medium text-red-900">Need Attention</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-700">{roomStats.rejected}</div>
                      <div className="text-sm text-red-600">Require updates</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleAddRoom}
                className="w-full justify-start bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Property
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                onClick={() => setSelectedTab('pending')}
              >
                <Clock className="h-4 w-4 mr-2" />
                Review Pending ({roomStats.pending})
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start border-green-300 text-green-700 hover:bg-green-50"
                onClick={() => setSelectedTab('approved')}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Active Listings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Property Listings */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
            <CardTitle className="text-xl text-gray-800">Your Properties</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="all" className="text-sm">
                  All ({roomStats.total})
                </TabsTrigger>
                <TabsTrigger value="approved" className="text-sm">
                  <span className="flex items-center space-x-1">
                    <span>Active</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      {roomStats.approved}
                    </Badge>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="pending" className="text-sm">
                  <span className="flex items-center space-x-1">
                    <span>Pending</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                      {roomStats.pending}
                    </Badge>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="rejected" className="text-sm">
                  <span className="flex items-center space-x-1">
                    <span>Rejected</span>
                    <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                      {roomStats.rejected}
                    </Badge>
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab}>
                {filteredRooms.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRooms.map(room => (
                      <RoomCard
                        key={room.id}
                        room={room}
                        showStatus={true}
                        onView={handleViewRoom}
                        onEdit={handleEditRoom}
                        userRole="owner"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Home className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {selectedTab === 'all' ? 'No properties yet' : `No ${selectedTab} properties`}
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      {selectedTab === 'all' 
                        ? 'Start building your property portfolio by listing your first room.'
                        : `You don't have any ${selectedTab} properties at the moment.`
                      }
                    </p>
                    {selectedTab === 'all' && (
                      <Button 
                        onClick={handleAddRoom} 
                        className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
                        size="lg"
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        List Your First Property
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Add Room Form Modal */}
      {showAddRoomForm && (
        <AddRoomForm
          onClose={() => setShowAddRoomForm(false)}
          onSubmit={handleAddRoomSubmit}
        />
      )}
    </div>
  );
};

export default OwnerDashboard;
