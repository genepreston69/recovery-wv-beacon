-- Enable RLS on routes_data table (critical security fix)
ALTER TABLE public.routes_data ENABLE ROW LEVEL SECURITY;

-- Create admin-only access policy for routes_data
CREATE POLICY "Admin only access to routes data" 
ON public.routes_data 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create audit_logs table for monitoring sensitive data access
CREATE TABLE public.audit_logs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit_logs (admin only)
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Admin-only access to audit logs
CREATE POLICY "Admin only access to audit logs" 
ON public.audit_logs 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Function to log sensitive data access
CREATE OR REPLACE FUNCTION public.log_data_access(
    action_type TEXT,
    table_name TEXT,
    record_id TEXT DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
    INSERT INTO public.audit_logs (user_id, action, table_name, record_id)
    VALUES (auth.uid(), action_type, table_name, record_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;