
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
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          <User className="inline w-4 h-4 mr-1" />
          {user.name || user.username}
        </span>
        <Button variant="ghost" size="sm" onClick={signOut}>
          <LogOut className="w-4 h-4 mr-1" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button variant="ghost" size="sm" onClick={signIn}>
      <LogIn className="w-4 h-4 mr-1" />
      Sign in with Microsoft
    </Button>
  );
};
