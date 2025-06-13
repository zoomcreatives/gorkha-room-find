
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { toast } from '../../hooks/use-toast';
import { DUMMY_CREDENTIALS } from '../../types/auth';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'searcher' | 'owner' | 'admin'>('searcher');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await login({ email, password });
    
    if (success) {
      toast({
        title: "Login Successful",
        description: "Welcome to RoomRental Nepal!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleQuickLogin = (role: 'searcher' | 'owner' | 'admin') => {
    const credentials = DUMMY_CREDENTIALS[role];
    setEmail(credentials.email);
    setPassword(credentials.password);
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="bg-rose-500 p-3 rounded-xl">
              <span className="text-white font-bold text-2xl">R</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">RoomRental Nepal</h1>
          </div>
          <p className="text-gray-600">Find your perfect room in Nepal</p>
        </div>

        {/* Login Form */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Login Options */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">Quick Login (Demo)</CardTitle>
            <CardDescription>
              Use these credentials to test different user roles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => handleQuickLogin('searcher')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Room Searcher</p>
                  <p className="text-xs text-gray-500">searcher@example.com</p>
                </div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => handleQuickLogin('owner')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Room Owner</p>
                  <p className="text-xs text-gray-500">owner@example.com</p>
                </div>
              </div>
            </Button>
            
            <Button
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => handleQuickLogin('admin')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div>
                  <p className="font-medium">Administrator</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
