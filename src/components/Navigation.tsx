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
              <img 
                src="https://pvxbkqdeyrhuumjtwgzm.supabase.co/storage/v1/object/public/story-images//RPWV%20Logo%20with%20transparent%20background.png" 
                alt="Recovery Point Logo" 
                className="h-14 w-auto"
              />
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
