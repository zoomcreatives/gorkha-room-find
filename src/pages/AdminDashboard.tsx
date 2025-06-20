
import React, { useState } from 'react';
import { Users, Home, Clock, CheckCircle, XCircle, AlertTriangle, TrendingUp, Shield, Activity, Settings, HelpCircle, LogOut, Database, BarChart3, Bell, Search } from 'lucide-react';
import { DUMMY_ROOMS } from '../data/dummyRooms';
import { DUMMY_USERS } from '../types/auth';
import { Room } from '../types/room';
import RoomCard from '../components/rooms/RoomCard';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../hooks/use-toast';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
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

  const navigationItems = [
    { id: 'pending', label: 'Pending', icon: Clock, count: roomStats.pending, color: 'amber' },
    { id: 'approved', label: 'Approved', icon: CheckCircle, count: roomStats.approved, color: 'green' },
    { id: 'rejected', label: 'Rejected', icon: XCircle, count: roomStats.rejected, color: 'red' },
    { id: 'all', label: 'All Properties', icon: Database, count: roomStats.total, color: 'blue' },
    { id: 'users', label: 'Users', icon: Users, count: null, color: 'purple' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, count: null, color: 'indigo' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo & Title */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
                  Admin Control Panel
                </h1>
                <p className="text-xs text-gray-500">Platform Management System</p>
              </div>
            </div>

            {/* Center: Search */}
            <div className="hidden md:flex items-center space-x-2 bg-gray-100/50 rounded-2xl px-4 py-2 min-w-96">
              <Search className="h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search properties, users..." 
                className="bg-transparent border-none outline-none text-sm flex-1"
              />
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {roomStats.pending > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                    {roomStats.pending}
                  </Badge>
                )}
              </Button>
              
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>

              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8 ring-2 ring-blue-200">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-700 text-white text-xs font-bold">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-gray-600 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Navigation Tabs */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-3 overflow-x-auto">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={selectedTab === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 whitespace-nowrap ${
                  selectedTab === item.id 
                    ? `bg-gradient-to-r ${
                        item.color === 'amber' ? 'from-amber-500 to-orange-500' :
                        item.color === 'green' ? 'from-green-500 to-emerald-500' :
                        item.color === 'red' ? 'from-red-500 to-rose-500' :
                        item.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                        item.color === 'purple' ? 'from-purple-500 to-violet-500' :
                        'from-indigo-500 to-purple-500'
                      } text-white shadow-lg hover:shadow-xl transform hover:scale-105`
                    : 'hover:bg-gray-100/80'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
                {item.count !== null && item.count > 0 && (
                  <Badge 
                    variant="secondary" 
                    className={`${selectedTab === item.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'} text-xs px-2 py-0.5`}
                  >
                    {item.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Priority Alert */}
        {roomStats.pending > 0 && (
          <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-xl">
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
                  className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg transform hover:scale-105 transition-all"
                >
                  Review Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">Total Listings</CardTitle>
              <Home className="h-5 w-5 text-blue-100" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roomStats.total}</div>
              <p className="text-xs text-blue-100 mt-1">All properties</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-100">Pending Review</CardTitle>
              <Clock className="h-5 w-5 text-amber-100" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roomStats.pending}</div>
              <p className="text-xs text-amber-100 mt-1">Need approval</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-emerald-100">Active Listings</CardTitle>
              <CheckCircle className="h-5 w-5 text-emerald-100" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roomStats.approved}</div>
              <p className="text-xs text-emerald-100 mt-1">Live now</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
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
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-600" />
                Platform Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <div>
                    <p className="font-medium text-blue-900">Total Revenue Potential</p>
                    <p className="text-2xl font-bold text-blue-700">₹{totalRevenue.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
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

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800 flex items-center">
                <Users className="h-5 w-5 mr-2 text-violet-600" />
                User Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-green-900">Room Searchers</span>
                  </div>
                  <span className="text-2xl font-bold text-green-700">{userStats.searchers}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-blue-900">Property Owners</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-700">{userStats.owners}</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
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
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="text-xl text-gray-800">Room Listings Management</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4 mb-6 bg-gray-100/50 rounded-2xl p-1">
                <TabsTrigger value="pending" className="text-sm rounded-xl">
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
                <TabsTrigger value="approved" className="text-sm rounded-xl">
                  <span className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4" />
                    <span>Approved</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      {roomStats.approved}
                    </Badge>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="rejected" className="text-sm rounded-xl">
                  <span className="flex items-center space-x-1">
                    <XCircle className="h-4 w-4" />
                    <span>Rejected</span>
                    <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                      {roomStats.rejected}
                    </Badge>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="all" className="text-sm rounded-xl">
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
    </div>
  );
};

export default AdminDashboard;
