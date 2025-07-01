
import { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { AccountInfo } from '@azure/msal-browser';
import { loginRequest } from '@/config/msalConfig';
import { useToast } from '@/hooks/use-toast';

export const useAzureAuth = () => {
  const { instance, accounts, inProgress } = useMsal();
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
    // Check if there's already an interaction in progress
    if (inProgress !== "none") {
      console.log('Authentication interaction already in progress, skipping...');
      return;
    }

    try {
      console.log('Starting sign in process...');
      const loginResponse = await instance.loginPopup(loginRequest);
      console.log('Login successful:', loginResponse);
      setUser(loginResponse.account);
      toast({
        title: "Signed in successfully",
        description: `Welcome, ${loginResponse.account?.name}!`,
      });
    } catch (error: any) {
      console.error('Login error:', error);
      // Only show error toast if it's not an interaction_in_progress error or user cancellation
      if (error.errorCode !== 'interaction_in_progress' && error.errorCode !== 'user_cancelled') {
        toast({
          title: "Sign in failed",
          description: error.message || "An error occurred during sign in",
          variant: "destructive",
        });
      }
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading: loading || inProgress !== "none",
    signIn,
    signOut,
    isAuthenticated: !!user,
  };
};
