
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogIn, LogOut, User } from 'lucide-react';

export const AuthButton = () => {
  const { user, signInWithEmail, signOut, loading } = useAuth();

  if (loading) {
    return <Button variant="ghost" disabled>Loading...</Button>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          <User className="inline w-4 h-4 mr-1" />
          {user.email}
        </span>
        <Button variant="ghost" size="sm" onClick={signOut}>
          <LogOut className="w-4 h-4 mr-1" />
          Sign Out
        </Button>
      </div>
    );
  }

  const handleSignIn = async () => {
    const email = prompt('Enter your admin email:');
    const password = prompt('Enter your password:');
    if (email && password) {
      await signInWithEmail(email, password);
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleSignIn}>
      <LogIn className="w-4 h-4 mr-1" />
      Admin Login
    </Button>
  );
};
