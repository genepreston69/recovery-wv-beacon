import { useState, useEffect } from 'react';
import { useAzureAuth } from '@/hooks/useAzureAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAdminAuth = () => {
  const { user, loading: azureLoading } = useAzureAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        // Check if user has admin role in Supabase
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.localAccountId)
          .eq('role', 'admin')
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking admin role:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(!!data);
        }

        // Log admin access attempt
        if (data) {
          await supabase.rpc('log_data_access', {
            action_type: 'admin_panel_access',
            table_name: 'admin_panel',
          });
        }
      } catch (error) {
        console.error('Error in admin auth check:', error);
        setIsAdmin(false);
        toast({
          title: "Authorization Error",
          description: "Unable to verify admin privileges",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (!azureLoading) {
      checkAdminRole();
    }
  }, [user, azureLoading, toast]);

  return {
    user,
    isAdmin,
    loading: azureLoading || loading,
    isAuthenticated: !!user,
  };
};