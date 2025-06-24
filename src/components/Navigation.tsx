

import React from 'react';
import { AuthButton } from '@/components/auth/AuthButton';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  const { isAdmin } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center py-1">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-black tracking-wide">RECOVERY</span>
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">POINT</span>
                </div>
              </div>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-700 transition-colors">Home</Link>
              <a href="#impact" className="text-gray-600 hover:text-blue-700 transition-colors">Impact</a>
              <a href="#success" className="text-gray-600 hover:text-blue-700 transition-colors">Stories</a>
              <Link to="/recovery-dynamics" className="text-gray-600 hover:text-blue-700 transition-colors">Recovery Dynamics</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/admin'}
              >
                <Shield className="w-4 h-4 mr-1" />
                Admin
              </Button>
            )}
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

