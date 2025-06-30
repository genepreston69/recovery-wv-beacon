
import { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { AccountInfo } from '@azure/msal-browser';
import { loginRequest } from '@/config/msalConfig';
import { useToast } from '@/hooks/use-toast';

export const useAzureAuth = () => {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (accounts.length > 0) {
      setUser(accounts[0]);
    }
    setLoading(false);
  }, [accounts]);

  const signIn = async () => {
    try {
      setLoading(true);
      const loginResponse = await instance.loginPopup(loginRequest);
      setUser(loginResponse.account);
      toast({
        title: "Signed in successfully",
        description: `Welcome, ${loginResponse.account?.name}!`,
      });
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Sign in failed",
        description: error.message || "An error occurred during sign in",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await instance.logoutPopup();
      setUser(null);
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "Sign out failed",
        description: error.message || "An error occurred during sign out",
        variant: "destructive",
      });
    }
  };

  return {
    user,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };
};
