
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
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="flex items-center gap-2 text-center">
          <User className="w-4 h-4" />
          <span className="text-sm text-gray-600">
            {user.name || user.username}
          </span>
        </div>
        <Button variant="outline" onClick={signOut} className="w-full max-w-xs">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={signIn} className="w-full max-w-xs">
      <LogIn className="w-4 h-4 mr-2" />
      Sign in with Microsoft
    </Button>
  );
};
