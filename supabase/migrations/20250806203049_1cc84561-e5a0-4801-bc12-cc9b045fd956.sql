-- Fix sync_azure_user function to handle user creation properly
CREATE OR REPLACE FUNCTION public.sync_azure_user(p_azure_id text, p_email text, p_display_name text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  user_uuid uuid;
  role_exists boolean;
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
      
      -- Check if role already exists to avoid unique constraint violation
      SELECT EXISTS(
        SELECT 1 FROM public.user_roles 
        WHERE user_id = user_uuid AND role = 'user'::app_role
      ) INTO role_exists;
      
      -- Only assign default user role if it doesn't exist
      IF NOT role_exists THEN
        INSERT INTO public.user_roles (user_id, role)
        VALUES (user_uuid, 'user'::app_role);
      END IF;
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
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error and return null to prevent app crashes
    RAISE LOG 'Error in sync_azure_user: %', SQLERRM;
    RETURN NULL;
END;
$function$