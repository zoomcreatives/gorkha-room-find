
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  Users, 
  Shield, 
  Plus, 
  Eye, 
  Clock, 
  CheckCircle,
  XCircle,
  BarChart3,
  FileText,
  HelpCircle,
  LogOut
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

  const adminItems = [
    {
      title: 'Dashboard',
      url: '/admin-dashboard',
      icon: Home,
      badge: null,
    },
    {
      title: 'Pending Reviews',
      url: '/admin-dashboard?tab=pending',
      icon: Clock,
      badge: stats?.pending || 0,
    },
    {
      title: 'Active Listings',
      url: '/admin-dashboard?tab=approved',
      icon: CheckCircle,
      badge: stats?.approved || 0,
    },
    {
      title: 'Rejected Items',
      url: '/admin-dashboard?tab=rejected',
      icon: XCircle,
      badge: stats?.rejected || 0,
    },
    {
      title: 'All Listings',
      url: '/admin-dashboard?tab=all',
      icon: FileText,
      badge: stats?.total || 0,
    },
    {
      title: 'User Management',
      url: '/admin-dashboard/users',
      icon: Users,
      badge: null,
    },
    {
      title: 'Analytics',
      url: '/admin-dashboard/analytics',
      icon: BarChart3,
      badge: null,
    },
  ];

  const ownerItems = [
    {
      title: 'Dashboard',
      url: '/owner-dashboard',
      icon: Home,
      badge: null,
    },
    {
      title: 'Add Property',
      url: '/owner-dashboard?action=add',
      icon: Plus,
      badge: null,
    },
    {
      title: 'My Properties',
      url: '/owner-dashboard?tab=all',
      icon: FileText,
      badge: stats?.total || 0,
    },
    {
      title: 'Active Listings',
      url: '/owner-dashboard?tab=approved',
      icon: CheckCircle,
      badge: stats?.approved || 0,
    },
    {
      title: 'Pending Review',
      url: '/owner-dashboard?tab=pending',
      icon: Clock,
      badge: stats?.pending || 0,
    },
    {
      title: 'Need Updates',
      url: '/owner-dashboard?tab=rejected',
      icon: XCircle,
      badge: stats?.rejected || 0,
    },
    {
      title: 'Analytics',
      url: '/owner-dashboard/analytics',
      icon: BarChart3,
      badge: null,
    },
  ];

  const items = userRole === 'admin' ? adminItems : ownerItems;

  const getActiveClass = (url: string) => {
    const currentPath = window.location.pathname + window.location.search;
    const isActive = currentPath === url || (url.includes('?') && currentPath.includes(url.split('?')[1]));
    return isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' : 'hover:bg-sidebar-accent/50';
  };

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            userRole === 'admin' 
              ? 'bg-gradient-to-br from-blue-600 to-purple-600' 
              : 'bg-gradient-to-br from-rose-500 to-pink-600'
          }`}>
            {userRole === 'admin' ? (
              <Shield className="h-5 w-5 text-white" />
            ) : (
              <Home className="h-5 w-5 text-white" />
            )}
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {userRole === 'admin' ? 'Admin Panel' : 'Property Manager'}
              </h2>
              <p className="text-sm text-gray-600">
                {userRole === 'admin' ? 'Platform Management' : 'Manage Listings'}
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            {!isCollapsed && 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mx-2">
                    <NavLink
                      to={item.url}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${getActiveClass(item.url)}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          {item.badge !== null && item.badge > 0 && (
                            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            {!isCollapsed && 'Support'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="mx-2">
                  <NavLink to="/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent/50">
                    <Settings className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="mx-2">
                  <NavLink to="/help" className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors hover:bg-sidebar-accent/50">
                    <HelpCircle className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span>Help & Support</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <Button
            onClick={logout}
            variant="outline"
            size="sm"
            className="w-full flex items-center space-x-2 text-gray-600 hover:text-red-600 hover:border-red-300"
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
