
-- Enable RLS and public read access for success_stories table
ALTER TABLE public.success_stories ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published success stories
CREATE POLICY "Anyone can read published success stories" 
ON public.success_stories 
FOR SELECT 
USING (is_published = true);

-- Keep existing admin policies for write operations
-- (These already exist, so no need to recreate them)

-- Enable RLS and public read access for meetings table
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read meeting information (public AA/NA meetings)
CREATE POLICY "Anyone can read meetings" 
ON public.meetings 
FOR SELECT 
USING (true);

-- Enable RLS and public read access for table_of_contents
ALTER TABLE public.table_of_contents ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read table of contents
CREATE POLICY "Anyone can read table of contents" 
ON public.table_of_contents 
FOR SELECT 
USING (true);

-- Only allow admins to modify table of contents
CREATE POLICY "Only admins can insert table of contents" 
ON public.table_of_contents 
FOR INSERT 
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update table of contents" 
ON public.table_of_contents 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete table of contents" 
ON public.table_of_contents 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
