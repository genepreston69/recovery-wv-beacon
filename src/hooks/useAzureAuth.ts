
import { useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { AccountInfo } from '@azure/msal-browser';
import { loginRequest } from '@/config/msalConfig';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const useAzureAuth = () => {
  const { instance, accounts, inProgress } = useMsal();
  const [user, setUser] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [supabaseUserId, setSupabaseUserId] = useState<string | null>(null);
  const { toast } = useToast();

  const syncUserToSupabase = async (account: AccountInfo) => {
    try {
      const { data, error } = await supabase.rpc('sync_azure_user', {
        p_azure_id: account.localAccountId,
        p_email: account.username,
        p_display_name: account.name || account.username
      });

      if (error) {
        console.error('Error syncing user to Supabase:', error);
        toast({
          title: "Sync Warning",
          description: "User signed in but profile sync failed",
          variant: "destructive",
        });
      } else {
        setSupabaseUserId(data);
      }
    } catch (error) {
      console.error('Error in syncUserToSupabase:', error);
    }
  };

  useEffect(() => {
    if (accounts.length > 0) {
      setUser(accounts[0]);
      syncUserToSupabase(accounts[0]);
    } else {
      setSupabaseUserId(null);
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
      if (loginResponse.account) {
        await syncUserToSupabase(loginResponse.account);
      }
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
      setSupabaseUserId(null);
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
    supabaseUserId,
    loading: loading && inProgress === "startup",
    signIn,
    signOut,
    isAuthenticated: !!user,
  };
};
