
import React from 'react';
import { User, Search, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface HeaderProps {
  onSearchToggle?: () => void;
  onMenuToggle?: () => void;
  showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSearchToggle, onMenuToggle, showSearch = true }) => {
  const { user, logout } = useAuth();

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-red-600';
      case 'owner': return 'text-blue-600';
      case 'searcher': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'owner': return 'Owner';
      case 'searcher': return 'Searcher';
      default: return role;
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Menu */}
          <div className="flex items-center space-x-4">
            {onMenuToggle && (
              <Button variant="ghost" size="sm" onClick={onMenuToggle} className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center space-x-2">
              <div className="bg-rose-500 p-2 rounded-lg">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">RoomRental Nepal</h1>
            </div>
          </div>

          {/* Search Bar (for main pages) */}
          {showSearch && (
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search by location, area..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  onClick={onSearchToggle}
                  readOnly
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {showSearch && (
              <Button variant="ghost" size="sm" onClick={onSearchToggle} className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className={`text-xs ${getRoleColor(user?.role || '')}`}>
                      {getRoleBadge(user?.role || '')}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  <p className={`text-xs font-medium ${getRoleColor(user?.role || '')}`}>
                    {getRoleBadge(user?.role || '')}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
