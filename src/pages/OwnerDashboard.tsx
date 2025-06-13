
import React, { useState } from 'react';
import { Plus, Home, Clock, CheckCircle, XCircle } from 'lucide-react';
import { DUMMY_ROOMS } from '../data/dummyRooms';
import { Room } from '../types/room';
import { useAuth } from '../contexts/AuthContext';
import ModernHeader from '../components/layout/ModernHeader';
import RoomCard from '../components/rooms/RoomCard';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const OwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('all');

  // Filter rooms belonging to the current owner
  const ownerRooms = DUMMY_ROOMS.filter(room => room.ownerId === user?.id);

  const roomStats = {
    total: ownerRooms.length,
    approved: ownerRooms.filter(room => room.status === 'approved').length,
    pending: ownerRooms.filter(room => room.status === 'pending').length,
    rejected: ownerRooms.filter(room => room.status === 'rejected').length,
  };

  const filteredRooms = selectedTab === 'all' 
    ? ownerRooms 
    : ownerRooms.filter(room => room.status === selectedTab);

  const handleViewRoom = (room: Room) => {
    console.log('Viewing room:', room);
    // Implement room details modal
  };

  const handleEditRoom = (room: Room) => {
    console.log('Editing room:', room);
    // Implement edit room functionality
  };

  const handleAddRoom = () => {
    console.log('Adding new room');
    // Implement add room functionality
  };

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Properties</h1>
            <p className="text-muted-foreground">Manage your room listings and track their status</p>
          </div>
          <Button onClick={handleAddRoom} className="bg-rose-500 hover:bg-rose-600">
            <Plus className="h-4 w-4 mr-2" />
            Add New Room
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
              <Home className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roomStats.total}</div>
              <p className="text-xs text-muted-foreground">All your properties</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{roomStats.approved}</div>
              <p className="text-xs text-muted-foreground">Live on platform</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{roomStats.pending}</div>
              <p className="text-xs text-muted-foreground">Under review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{roomStats.rejected}</div>
              <p className="text-xs text-muted-foreground">Need revision</p>
            </CardContent>
          </Card>
        </div>

        {/* Listings */}
        <Card>
          <CardHeader>
            <CardTitle>Your Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">
                  All ({roomStats.total})
                </TabsTrigger>
                <TabsTrigger value="approved">
                  <span className="flex items-center space-x-1">
                    <span>Approved</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {roomStats.approved}
                    </Badge>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="pending">
                  <span className="flex items-center space-x-1">
                    <span>Pending</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {roomStats.pending}
                    </Badge>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  <span className="flex items-center space-x-1">
                    <span>Rejected</span>
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      {roomStats.rejected}
                    </Badge>
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab} className="mt-6">
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
                  <div className="text-center py-12">
                    <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {selectedTab === 'all' ? 'No listings yet' : `No ${selectedTab} listings`}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {selectedTab === 'all' 
                        ? 'Start by adding your first room listing to the platform.'
                        : `You don't have any ${selectedTab} listings at the moment.`
                      }
                    </p>
                    {selectedTab === 'all' && (
                      <Button onClick={handleAddRoom} className="bg-rose-500 hover:bg-rose-600">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Room
                      </Button>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Plus className="h-8 w-8 text-blue-600" />
                <span className="font-medium">Add New Room</span>
                <span className="text-sm text-muted-foreground">List a new property</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Clock className="h-8 w-8 text-yellow-600" />
                <span className="font-medium">Review Pending</span>
                <span className="text-sm text-muted-foreground">Check pending listings</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <span className="font-medium">Manage Active</span>
                <span className="text-sm text-muted-foreground">Update live listings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default OwnerDashboard;
