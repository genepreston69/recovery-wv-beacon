
import React from 'react';
import { AzureAuthButton } from '@/components/auth/AzureAuthButton';
import { useAzureAuth } from '@/hooks/useAzureAuth';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  const { isAuthenticated } = useAzureAuth();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <img 
                src="https://pvxbkqdeyrhuumjtwgzm.supabase.co/storage/v1/object/public/story-images//RPWV%20Logo%20with%20transparent%20background.png" 
                alt="Recovery Point Logo" 
                className="h-16 w-auto"
              />
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-600 hover:text-blue-700 transition-colors">Home</Link>
              <Link to="/recovery-dynamics" className="text-gray-600 hover:text-blue-700 transition-colors">Recovery Dynamics</Link>
              {isAuthenticated && (
                <>
                  <Link to="/statistics" className="text-gray-600 hover:text-blue-700 transition-colors">Data Insights</Link>
                  <Link to="/los-analysis" className="text-gray-600 hover:text-blue-700 transition-colors">LOS Analysis</Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/admin'}
              >
                <Shield className="w-4 h-4 mr-1" />
                Admin
              </Button>
            )}
            <AzureAuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
