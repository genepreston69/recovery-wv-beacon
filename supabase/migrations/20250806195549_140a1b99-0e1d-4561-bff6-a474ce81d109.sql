-- Update users table to accommodate Azure AD users
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS azure_id text UNIQUE,
ADD COLUMN IF NOT EXISTS display_name text,
ADD COLUMN IF NOT EXISTS last_login timestamp with time zone DEFAULT now();

-- Create index for faster azure_id lookups
CREATE INDEX IF NOT EXISTS idx_users_azure_id ON public.users(azure_id);

-- Update user_roles foreign key to reference users.id instead of auth.users
-- First, check if we have any existing user_roles that need to be updated
-- (This is safe since we're adding new functionality)

-- Create a function to sync Azure AD users to our users table
CREATE OR REPLACE FUNCTION public.sync_azure_user(
  p_azure_id text,
  p_email text,
  p_display_name text
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_uuid uuid;
BEGIN
  -- Check if user already exists by azure_id
  SELECT id INTO user_uuid 
  FROM public.users 
  WHERE azure_id = p_azure_id;
  
  IF user_uuid IS NULL THEN
    -- Check if user exists by email (for migration purposes)
    SELECT id INTO user_uuid 
    FROM public.users 
    WHERE email = p_email;
    
    IF user_uuid IS NULL THEN
      -- Create new user
      INSERT INTO public.users (azure_id, email, display_name, last_login)
      VALUES (p_azure_id, p_email, p_display_name, now())
      RETURNING id INTO user_uuid;
      
      -- Assign default user role
      INSERT INTO public.user_roles (user_id, role)
      VALUES (user_uuid, 'user'::app_role);
    ELSE
      -- Update existing user with Azure ID
      UPDATE public.users 
      SET azure_id = p_azure_id, 
          display_name = p_display_name,
          last_login = now()
      WHERE id = user_uuid;
    END IF;
  ELSE
    -- Update last login for existing user
    UPDATE public.users 
    SET last_login = now(),
        display_name = p_display_name
    WHERE id = user_uuid;
  END IF;
  
  RETURN user_uuid;
END;
$$;