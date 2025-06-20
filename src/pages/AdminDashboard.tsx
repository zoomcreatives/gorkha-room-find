
import React, { useState } from 'react';
import { Users, Home, Clock, CheckCircle, XCircle, AlertTriangle, TrendingUp, Shield, Activity } from 'lucide-react';
import { DUMMY_ROOMS } from '../data/dummyRooms';
import { DUMMY_USERS } from '../types/auth';
import { Room } from '../types/room';
import RoomCard from '../components/rooms/RoomCard';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '../components/ui/sidebar';
import DashboardSidebar from '../components/layout/DashboardSidebar';
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
        ? { ...room, status: 'approved' as const, updatedAt: new Date().toISOString() }
        : room
    ));
    
    toast({
      title: "Room Approved ✅",
      description: "The room listing has been approved and is now live on the platform.",
    });
  };

  const handleRejectRoom = (roomId: string) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId 
        ? { ...room, status: 'rejected' as const, updatedAt: new Date().toISOString() }
        : room
    ));
    
    toast({
      title: "Room Rejected ❌",
      description: "The room listing has been rejected. The owner will be notified.",
      variant: "destructive",
    });
  };

  const handleViewRoom = (room: Room) => {
    console.log('Viewing room details:', room);
  };

  const totalRevenue = rooms.filter(r => r.status === 'approved').reduce((sum, room) => sum + room.price, 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <DashboardSidebar userRole="admin" stats={roomStats} />
        
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b bg-white/80 backdrop-blur-sm">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Platform management and oversight</p>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-6">
            {/* Priority Alert */}
            {roomStats.pending > 0 && (
              <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-amber-900">
                        {roomStats.pending} room{roomStats.pending > 1 ? 's' : ''} awaiting your review
                      </h3>
                      <p className="text-amber-700">
                        Quick action needed to keep the platform updated and owners satisfied.
                      </p>
                    </div>
                    <Button 
                      onClick={() => setSelectedTab('pending')}
                      className="bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Review Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-100">Total Listings</CardTitle>
                  <Home className="h-5 w-5 text-blue-100" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{roomStats.total}</div>
                  <p className="text-xs text-blue-100 mt-1">All properties</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-amber-100">Pending Review</CardTitle>
                  <Clock className="h-5 w-5 text-amber-100" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{roomStats.pending}</div>
                  <p className="text-xs text-amber-100 mt-1">Need approval</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-emerald-100">Active Listings</CardTitle>
                  <CheckCircle className="h-5 w-5 text-emerald-100" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{roomStats.approved}</div>
                  <p className="text-xs text-emerald-100 mt-1">Live now</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-100">Platform Users</CardTitle>
                  <Users className="h-5 w-5 text-purple-100" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{userStats.total}</div>
                  <p className="text-xs text-purple-100 mt-1">Registered users</p>
                </CardContent>
              </Card>
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-blue-600" />
                    Platform Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-blue-900">Total Revenue Potential</p>
                        <p className="text-2xl font-bold text-blue-700">₹{totalRevenue.toLocaleString()}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-900">Approval Rate</p>
                        <p className="text-2xl font-bold text-green-700">
                          {roomStats.total > 0 ? Math.round((roomStats.approved / roomStats.total) * 100) : 0}%
                        </p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-violet-600" />
                    User Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-green-900">Room Searchers</span>
                      </div>
                      <span className="text-2xl font-bold text-green-700">{userStats.searchers}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="font-medium text-blue-900">Property Owners</span>
                      </div>
                      <span className="text-2xl font-bold text-blue-700">{userStats.owners}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                        <span className="font-medium text-purple-900">Administrators</span>
                      </div>
                      <span className="text-2xl font-bold text-purple-700">{userStats.admins}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Room Management */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="text-xl text-gray-800">Room Listings Management</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="grid w-full grid-cols-4 mb-6">
                    <TabsTrigger value="pending" className="text-sm">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Pending</span>
                        {roomStats.pending > 0 && (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800 text-xs">
                            {roomStats.pending}
                          </Badge>
                        )}
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="approved" className="text-sm">
                      <span className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>Approved</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          {roomStats.approved}
                        </Badge>
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="rejected" className="text-sm">
                      <span className="flex items-center space-x-1">
                        <XCircle className="h-4 w-4" />
                        <span>Rejected</span>
                        <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                          {roomStats.rejected}
                        </Badge>
                      </span>
                    </TabsTrigger>
                    <TabsTrigger value="all" className="text-sm">
                      All ({roomStats.total})
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
                            onApprove={handleApproveRoom}
                            onReject={handleRejectRoom}
                            userRole="admin"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Home className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          No {selectedTab} listings
                        </h3>
                        <p className="text-gray-600">
                          {selectedTab === 'pending' 
                            ? 'All room listings have been reviewed. Great job!'
                            : `No ${selectedTab} listings found.`
                          }
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
