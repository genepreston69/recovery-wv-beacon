
-- Fix Auth RLS Initialization Plan issues by replacing auth.uid() with (select auth.uid())
-- This prevents re-evaluation for each row and improves performance

-- Drop existing policies that have performance issues
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Anyone can view published stories" ON public.success_stories;
DROP POLICY IF EXISTS "Admins can view all stories" ON public.success_stories;
DROP POLICY IF EXISTS "Admins can insert stories" ON public.success_stories;
DROP POLICY IF EXISTS "Admins can update stories" ON public.success_stories;
DROP POLICY IF EXISTS "Admins can delete stories" ON public.success_stories;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own intakes" ON public.intakes;
DROP POLICY IF EXISTS "Users can create their own intakes" ON public.intakes;
DROP POLICY IF EXISTS "Users can update their own intakes" ON public.intakes;
DROP POLICY IF EXISTS "Users can delete their own intakes" ON public.intakes;
DROP POLICY IF EXISTS "Users can view their own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can create their own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can update their own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Staff can view all conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can view messages in their conversations" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can create messages in their conversations" ON public.chat_messages;
DROP POLICY IF EXISTS "Staff can view all messages" ON public.chat_messages;

-- Also drop any duplicate policies that might exist
DROP POLICY IF EXISTS "Anyone can read published success stories" ON public.success_stories;

-- Recreate optimized policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING ((select auth.uid()) = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role((select auth.uid()), 'admin'))
WITH CHECK (public.has_role((select auth.uid()), 'admin'));

-- Recreate optimized policies for success_stories
CREATE POLICY "Anyone can view published stories"
ON public.success_stories
FOR SELECT
USING (is_published = true OR public.has_role((select auth.uid()), 'admin'));

CREATE POLICY "Admins can manage stories"
ON public.success_stories
FOR ALL
USING (public.has_role((select auth.uid()), 'admin'))
WITH CHECK (public.has_role((select auth.uid()), 'admin'));

-- Recreate optimized policies for profiles
CREATE POLICY "Users can manage their own profile"
ON public.profiles
FOR ALL
USING ((select auth.uid()) = id)
WITH CHECK ((select auth.uid()) = id);

-- Recreate optimized policies for intakes
CREATE POLICY "Users can manage their own intakes"
ON public.intakes
FOR ALL
USING ((select auth.uid()) = user_id)
WITH CHECK ((select auth.uid()) = user_id);

-- Recreate optimized policies for conversations
CREATE POLICY "Users can manage their own conversations"
ON public.conversations
FOR ALL
USING ((select auth.uid()) = user_id OR public.has_role((select auth.uid()), 'admin'))
WITH CHECK ((select auth.uid()) = user_id OR public.has_role((select auth.uid()), 'admin'));

-- Recreate optimized policies for chat_messages
CREATE POLICY "Users can view and create messages in their conversations"
ON public.chat_messages
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.conversations 
    WHERE id = conversation_id 
    AND (user_id = (select auth.uid()) OR public.has_role((select auth.uid()), 'admin'))
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.conversations 
    WHERE id = conversation_id 
    AND (user_id = (select auth.uid()) OR public.has_role((select auth.uid()), 'admin'))
  )
);
