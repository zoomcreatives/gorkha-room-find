
import React, { useState } from 'react';
import { Users, Home, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { DUMMY_ROOMS } from '../data/dummyRooms';
import { DUMMY_USERS } from '../types/auth';
import { Room } from '../types/room';
import Header from '../components/layout/Header';
import RoomCard from '../components/rooms/RoomCard';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from '../hooks/use-toast';

const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('pending');
  const [rooms, setRooms] = useState(DUMMY_ROOMS);

  const roomStats = {
    total: rooms.length,
    approved: rooms.filter(room => room.status === 'approved').length,
    pending: rooms.filter(room => room.status === 'pending').length,
    rejected: rooms.filter(room => room.status === 'rejected').length,
  };

  const userStats = {
    total: DUMMY_USERS.length,
    searchers: DUMMY_USERS.filter(user => user.role === 'searcher').length,
    owners: DUMMY_USERS.filter(user => user.role === 'owner').length,
    admins: DUMMY_USERS.filter(user => user.role === 'admin').length,
  };

  const filteredRooms = selectedTab === 'all' 
    ? rooms 
    : rooms.filter(room => room.status === selectedTab);

  const handleApproveRoom = (roomId: string) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId 
        ? { ...room, status: 'approved' as const, updatedAt: new Date().toISOString().split('T')[0] }
        : room
    ));
    
    toast({
      title: "Room Approved",
      description: "The room listing has been approved and is now live on the platform.",
    });
  };

  const handleRejectRoom = (roomId: string) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId 
        ? { ...room, status: 'rejected' as const, updatedAt: new Date().toISOString().split('T')[0] }
        : room
    ));
    
    toast({
      title: "Room Rejected",
      description: "The room listing has been rejected. The owner will be notified.",
      variant: "destructive",
    });
  };

  const handleViewRoom = (room: Room) => {
    console.log('Viewing room details:', room);
    // Implement detailed room view modal
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showSearch={false} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage room listings and platform users</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Room Stats */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
              <Home className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roomStats.total}</div>
              <p className="text-xs text-muted-foreground">All room listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{roomStats.pending}</div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{roomStats.approved}</div>
              <p className="text-xs text-muted-foreground">Live on platform</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{userStats.total}</div>
              <p className="text-xs text-muted-foreground">Platform users</p>
            </CardContent>
          </Card>
        </div>

        {/* User Statistics */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>User Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-green-900">Room Searchers</p>
                  <p className="text-2xl font-bold text-green-700">{userStats.searchers}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-blue-900">Room Owners</p>
                  <p className="text-2xl font-bold text-blue-700">{userStats.owners}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-red-900">Administrators</p>
                  <p className="text-2xl font-bold text-red-700">{userStats.admins}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals Alert */}
        {roomStats.pending > 0 && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-900">
                    {roomStats.pending} room{roomStats.pending > 1 ? 's' : ''} awaiting your review
                  </p>
                  <p className="text-sm text-yellow-700">
                    Please review and approve/reject pending listings to keep the platform updated.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Room Listings Management */}
        <Card>
          <CardHeader>
            <CardTitle>Room Listings Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="pending">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Pending</span>
                    {roomStats.pending > 0 && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        {roomStats.pending}
                      </Badge>
                    )}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="approved">
                  <span className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>Approved</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {roomStats.approved}
                    </Badge>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  <span className="flex items-center space-x-1">
                    <XCircle className="h-4 w-4" />
                    <span>Rejected</span>
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      {roomStats.rejected}
                    </Badge>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="all">
                  All ({roomStats.total})
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
                        onApprove={handleApproveRoom}
                        onReject={handleRejectRoom}
                        userRole="admin"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No {selectedTab} listings
                    </h3>
                    <p className="text-gray-600">
                      {selectedTab === 'pending' 
                        ? 'All room listings have been reviewed.'
                        : `No ${selectedTab} listings found.`
                      }
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Admin Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => setSelectedTab('pending')}
              >
                <Clock className="h-8 w-8 text-yellow-600" />
                <span className="font-medium">Review Pending</span>
                <span className="text-sm text-gray-500">{roomStats.pending} awaiting review</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Users className="h-8 w-8 text-purple-600" />
                <span className="font-medium">Manage Users</span>
                <span className="text-sm text-gray-500">User account management</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Home className="h-8 w-8 text-blue-600" />
                <span className="font-medium">Platform Analytics</span>
                <span className="text-sm text-gray-500">View detailed reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
