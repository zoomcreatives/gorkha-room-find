
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
  FileText,
  HelpCircle,
  LogOut,
  Building2,
  TrendingUp,
  Eye,
  AlertCircle,
  Database,
  Activity
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

  // Admin navigation items - focused on platform management
  const adminItems = [
    {
      title: 'Overview',
      url: '/admin-dashboard',
      icon: Activity,
      badge: null,
      description: 'Platform metrics'
    },
    {
      title: 'Pending Reviews',
      url: '/admin-dashboard?tab=pending',
      icon: AlertCircle,
      badge: stats?.pending || 0,
      description: 'Awaiting approval'
    },
    {
      title: 'Active Listings',
      url: '/admin-dashboard?tab=approved',
      icon: CheckCircle,
      badge: stats?.approved || 0,
      description: 'Live properties'
    },
    {
      title: 'Rejected Items',
      url: '/admin-dashboard?tab=rejected',
      icon: XCircle,
      badge: stats?.rejected || 0,
      description: 'Need attention'
    },
    {
      title: 'All Properties',
      url: '/admin-dashboard?tab=all',
      icon: Database,
      badge: stats?.total || 0,
      description: 'Complete database'
    },
    {
      title: 'User Management',
      url: '/admin-dashboard/users',
      icon: Users,
      badge: null,
      description: 'Manage accounts'
    },
    {
      title: 'Analytics',
      url: '/admin-dashboard/analytics',
      icon: BarChart3,
      badge: null,
      description: 'Platform insights'
    },
  ];

  // Owner navigation items - focused on property management
  const ownerItems = [
    {
      title: 'Dashboard',
      url: '/owner-dashboard',
      icon: Home,
      badge: null,
      description: 'Your overview'
    },
    {
      title: 'Add Property',
      url: '/owner-dashboard?action=add',
      icon: Plus,
      badge: null,
      description: 'List new room'
    },
    {
      title: 'My Properties',
      url: '/owner-dashboard?tab=all',
      icon: Building2,
      badge: stats?.total || 0,
      description: 'All your listings'
    },
    {
      title: 'Live Listings',
      url: '/owner-dashboard?tab=approved',
      icon: Eye,
      badge: stats?.approved || 0,
      description: 'Currently active'
    },
    {
      title: 'Under Review',
      url: '/owner-dashboard?tab=pending',
      icon: Clock,
      badge: stats?.pending || 0,
      description: 'Awaiting approval'
    },
    {
      title: 'Need Updates',
      url: '/owner-dashboard?tab=rejected',
      icon: AlertCircle,
      badge: stats?.rejected || 0,
      description: 'Require changes'
    },
    {
      title: 'Performance',
      url: '/owner-dashboard/analytics',
      icon: TrendingUp,
      badge: null,
      description: 'Your analytics'
    },
  ];

  const items = userRole === 'admin' ? adminItems : ownerItems;

  const getActiveClass = (url: string) => {
    const currentPath = window.location.pathname + window.location.search;
    const isActive = currentPath === url || (url.includes('?') && currentPath.includes(url.split('?')[1]));
    return isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' : 'hover:bg-sidebar-accent/50';
  };

  // Different designs for admin vs owner
  if (userRole === 'admin') {
    return (
      <Sidebar className="border-r border-gray-200 bg-gradient-to-b from-slate-900 to-slate-800">
        <SidebarHeader className="p-4 bg-slate-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold text-white">Admin Control</h2>
                <p className="text-sm text-blue-200">Platform Management</p>
              </div>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className="bg-slate-900">
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {!isCollapsed && 'Platform Controls'}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="mx-2 mb-1">
                      <NavLink
                        to={item.url}
                        className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                          getActiveClass(item.url) 
                            ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && (
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{item.title}</span>
                              {item.badge !== null && item.badge > 0 && (
                                <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs opacity-75 mt-1">{item.description}</p>
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator className="my-4 bg-slate-700" />

          <SidebarGroup>
            <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {!isCollapsed && 'System'}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="mx-2 mb-1">
                    <NavLink to="/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-slate-300 hover:bg-slate-800 hover:text-white">
                      <Settings className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span>System Settings</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="mx-2">
                    <NavLink to="/help" className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-slate-300 hover:bg-slate-800 hover:text-white">
                      <HelpCircle className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && <span>Admin Support</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-slate-700 bg-slate-800/50">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="w-8 h-8 ring-2 ring-blue-500">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-sm font-bold">
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                <p className="text-xs text-blue-200 truncate">System Administrator</p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="w-full flex items-center space-x-2 bg-slate-700 border-slate-600 text-slate-200 hover:bg-red-600 hover:border-red-500 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          )}
        </SidebarFooter>
      </Sidebar>
    );
  }

  // Owner sidebar design - warmer, property-focused
  return (
    <Sidebar className="border-r border-orange-200 bg-gradient-to-b from-orange-50 to-rose-50">
      <SidebarHeader className="p-4 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold text-gray-900">Property Hub</h2>
              <p className="text-sm text-rose-600">Manage Your Listings</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-b from-orange-50 to-rose-50">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-3 text-xs font-semibold text-rose-700 uppercase tracking-wider">
            {!isCollapsed && 'Property Management'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mx-2 mb-2">
                    <NavLink
                      to={item.url}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        getActiveClass(item.url) 
                          ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg transform scale-105' 
                          : 'text-gray-700 hover:bg-white/80 hover:shadow-md'
                      }`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{item.title}</span>
                            {item.badge !== null && item.badge > 0 && (
                              <Badge className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs opacity-75 mt-1">{item.description}</p>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4 bg-orange-200" />

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold text-rose-700 uppercase tracking-wider">
            {!isCollapsed && 'Support & Tools'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="mx-2 mb-1">
                  <NavLink to="/settings" className="flex items-center space-x-3 px-4 py-2 rounded-xl transition-colors text-gray-700 hover:bg-white/80">
                    <Settings className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span>Account Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="mx-2">
                  <NavLink to="/help" className="flex items-center space-x-3 px-4 py-2 rounded-xl transition-colors text-gray-700 hover:bg-white/80">
                    <HelpCircle className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span>Owner Support</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-orange-200 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="w-8 h-8 ring-2 ring-rose-500">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-gradient-to-br from-rose-500 to-pink-600 text-white text-sm font-bold">
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-rose-600 truncate">Property Owner</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <Button
            onClick={logout}
            variant="outline"
            size="sm"
            className="w-full flex items-center space-x-2 text-gray-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
