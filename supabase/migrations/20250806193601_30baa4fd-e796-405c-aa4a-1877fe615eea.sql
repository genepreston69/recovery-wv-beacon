-- Create transportation_requests table to store ride request form data
CREATE TABLE public.transportation_requests (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    -- Personal Information
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    medicaid_id TEXT,
    request_date DATE NOT NULL,
    
    -- Appointment Information
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    
    -- Pickup Location
    pickup_name TEXT,
    pickup_phone TEXT,
    pickup_address TEXT NOT NULL,
    
    -- Destination Location
    dest_name TEXT NOT NULL,
    dest_phone TEXT,
    dest_address TEXT NOT NULL,
    
    -- Additional Information
    additional_info TEXT,
    
    -- Request Status and Tracking
    status TEXT NOT NULL DEFAULT 'pending',
    assigned_driver_id UUID,
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on transportation_requests
ALTER TABLE public.transportation_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for transportation requests
-- Users can view and create their own requests (if authenticated)
CREATE POLICY "Users can view their own transportation requests" 
ON public.transportation_requests 
FOR SELECT 
USING (
    user_id = auth.uid() OR 
    has_role(auth.uid(), 'admin'::app_role)
);

-- Anyone can create a transportation request (even unauthenticated users)
CREATE POLICY "Anyone can create transportation requests" 
ON public.transportation_requests 
FOR INSERT 
WITH CHECK (true);

-- Only admins can update transportation requests
CREATE POLICY "Admins can update transportation requests" 
ON public.transportation_requests 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete transportation requests
CREATE POLICY "Admins can delete transportation requests" 
ON public.transportation_requests 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_transportation_requests_updated_at
BEFORE UPDATE ON public.transportation_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better query performance
CREATE INDEX idx_transportation_requests_user_id ON public.transportation_requests(user_id);
CREATE INDEX idx_transportation_requests_status ON public.transportation_requests(status);
CREATE INDEX idx_transportation_requests_appointment_date ON public.transportation_requests(appointment_date);