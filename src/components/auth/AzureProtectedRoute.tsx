
import React from 'react';
import { useAzureAuth } from '@/hooks/useAzureAuth';
import { Loader2 } from 'lucide-react';

interface AzureProtectedRouteProps {
  children: React.ReactNode;
}

export const AzureProtectedRoute = ({ children }: AzureProtectedRouteProps) => {
  const { user, loading } = useAzureAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we check your authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please sign in to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
