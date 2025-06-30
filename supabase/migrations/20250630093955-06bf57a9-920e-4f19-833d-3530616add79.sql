
-- Fix the remaining multiple permissive policies issues by consolidating overlapping SELECT policies

-- Drop the overlapping policies for success_stories
DROP POLICY IF EXISTS "Anyone can view published stories" ON public.success_stories;
DROP POLICY IF EXISTS "Admins can manage stories" ON public.success_stories;

-- Drop the overlapping policies for user_roles  
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- Create single consolidated policy for success_stories
CREATE POLICY "View and manage success stories"
ON public.success_stories
FOR ALL
USING (
  is_published = true OR public.has_role((select auth.uid()), 'admin')
)
WITH CHECK (public.has_role((select auth.uid()), 'admin'));

-- Create single consolidated policy for user_roles
CREATE POLICY "View and manage user roles"
ON public.user_roles
FOR ALL
USING (
  (select auth.uid()) = user_id OR public.has_role((select auth.uid()), 'admin')
)
WITH CHECK (public.has_role((select auth.uid()), 'admin'));
