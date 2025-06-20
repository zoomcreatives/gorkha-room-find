
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  Users, 
  Shield, 
  Plus, 
  Clock, 
  CheckCircle,
  XCircle,
  BarChart3,
  HelpCircle,
  LogOut,
  Building2,
  TrendingUp,
  Eye,
  AlertCircle,
  Database,
  Activity,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '../ui/sidebar';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

interface DashboardSidebarProps {
  userRole: 'admin' | 'owner';
  stats?: {
    total?: number;
    pending?: number;
    approved?: number;
    rejected?: number;
  };
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ userRole, stats }) => {
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  // Admin navigation items
  const adminItems = [
    {
      title: 'Dashboard',
      url: '/admin-dashboard',
      icon: Activity,
      badge: null,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Pending',
      url: '/admin-dashboard?tab=pending',
      icon: Clock,
      badge: stats?.pending || 0,
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Approved',
      url: '/admin-dashboard?tab=approved',
      icon: CheckCircle,
      badge: stats?.approved || 0,
      color: 'from-emerald-500 to-green-500'
    },
    {
      title: 'Rejected',
      url: '/admin-dashboard?tab=rejected',
      icon: XCircle,
      badge: stats?.rejected || 0,
      color: 'from-red-500 to-rose-500'
    },
    {
      title: 'All Properties',
      url: '/admin-dashboard?tab=all',
      icon: Database,
      badge: stats?.total || 0,
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Users',
      url: '/admin-dashboard/users',
      icon: Users,
      badge: null,
      color: 'from-indigo-500 to-blue-500'
    },
    {
      title: 'Analytics',
      url: '/admin-dashboard/analytics',
      icon: BarChart3,
      badge: null,
      color: 'from-teal-500 to-cyan-500'
    },
  ];

  // Owner navigation items
  const ownerItems = [
    {
      title: 'Dashboard',
      url: '/owner-dashboard',
      icon: Home,
      badge: null,
      color: 'from-rose-500 to-pink-500'
    },
    {
      title: 'Add Property',
      url: '/owner-dashboard?action=add',
      icon: Plus,
      badge: null,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'All Properties',
      url: '/owner-dashboard?tab=all',
      icon: Building2,
      badge: stats?.total || 0,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Active',
      url: '/owner-dashboard?tab=approved',
      icon: Eye,
      badge: stats?.approved || 0,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Pending',
      url: '/owner-dashboard?tab=pending',
      icon: Clock,
      badge: stats?.pending || 0,
      color: 'from-amber-500 to-yellow-500'
    },
    {
      title: 'Rejected',
      url: '/owner-dashboard?tab=rejected',
      icon: AlertCircle,
      badge: stats?.rejected || 0,
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Analytics',
      url: '/owner-dashboard/analytics',
      icon: TrendingUp,
      badge: null,
      color: 'from-purple-500 to-indigo-500'
    },
  ];

  const items = userRole === 'admin' ? adminItems : ownerItems;

  const getActiveClass = (url: string) => {
    const currentPath = window.location.pathname + window.location.search;
    const isActive = currentPath === url || (url.includes('?') && currentPath.includes(url.split('?')[1]));
    return isActive;
  };

  return (
    <Sidebar className="border-none shadow-2xl bg-white">
      <SidebarHeader className="p-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${
            userRole === 'admin' ? 'from-blue-600 to-indigo-700' : 'from-rose-500 to-pink-600'
          } shadow-lg`}>
            {userRole === 'admin' ? (
              <Shield className="h-6 w-6 text-white" />
            ) : (
              <Building2 className="h-6 w-6 text-white" />
            )}
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {userRole === 'admin' ? 'Admin Panel' : 'Property Manager'}
              </h2>
              <p className="text-sm text-gray-500">
                {userRole === 'admin' ? 'System Control' : 'Your Dashboard'}
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 bg-gradient-to-b from-white to-gray-50">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">
            {!isCollapsed && 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => {
                const isActive = getActiveClass(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={`group relative flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                          isActive 
                            ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-black/10` 
                            : 'text-gray-700 hover:bg-gray-100 hover:shadow-md'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          isActive 
                            ? 'bg-white/20' 
                            : `bg-gradient-to-r ${item.color} text-white shadow-sm`
                        }`}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        
                        {!isCollapsed && (
                          <>
                            <div className="flex-1 ml-3">
                              <span className="font-semibold text-sm">{item.title}</span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              {item.badge !== null && item.badge > 0 && (
                                <Badge className={`${
                                  isActive 
                                    ? 'bg-white/20 text-white border-white/30' 
                                    : 'bg-gray-100 text-gray-700'
                                } text-xs px-2 py-1 font-semibold`}>
                                  {item.badge}
                                </Badge>
                              )}
                              
                              {isActive && (
                                <ChevronRight className="h-4 w-4 text-white/80" />
                              )}
                            </div>
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-6 bg-gray-200" />

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-wider">
            {!isCollapsed && 'Support'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/settings" 
                    className="group flex items-center px-4 py-3 rounded-xl transition-all duration-300 text-gray-700 hover:bg-gray-100 hover:shadow-md"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-sm">
                      <Settings className="h-4 w-4" />
                    </div>
                    {!isCollapsed && (
                      <span className="ml-3 font-semibold text-sm">Settings</span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/help" 
                    className="group flex items-center px-4 py-3 rounded-xl transition-all duration-300 text-gray-700 hover:bg-gray-100 hover:shadow-md"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm">
                      <HelpCircle className="h-4 w-4" />
                    </div>
                    {!isCollapsed && (
                      <span className="ml-3 font-semibold text-sm">Help & Support</span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-gray-100 bg-gradient-to-br from-white to-gray-50">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-10 h-10 ring-2 ring-gray-200 shadow-md">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className={`bg-gradient-to-br ${
              userRole === 'admin' ? 'from-blue-600 to-indigo-700' : 'from-rose-500 to-pink-600'
            } text-white text-sm font-bold`}>
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">
                {userRole === 'admin' ? 'Administrator' : 'Property Owner'}
              </p>
            </div>
          )}
        </div>
        
        {!isCollapsed && (
          <Button
            onClick={logout}
            variant="outline"
            size="sm"
            className="w-full flex items-center justify-center space-x-2 border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200"
          >
            <LogOut className="h-4 w-4" />
            <span className="font-semibold">Sign Out</span>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
