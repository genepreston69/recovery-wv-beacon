
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAzureAuth } from '@/hooks/useAzureAuth';
import { LogIn, LogOut, User } from 'lucide-react';

export const AzureAuthButton = () => {
  const { user, signIn, signOut, loading } = useAzureAuth();

  if (loading) {
    return <Button variant="ghost" disabled>Loading...</Button>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-md">
          <User className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-700 font-medium">
            {user.name || user.username}
          </span>
        </div>
        <Button variant="outline" onClick={signOut} size="sm">
          <LogOut className="w-4 h-4 mr-1" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={signIn} size="sm">
      <LogIn className="w-4 h-4 mr-2" />
      Sign in with Microsoft
    </Button>
  );
};
