
-- Enable Row Level Security on book_chapters table
ALTER TABLE public.book_chapters ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to read book chapters (public read access)
CREATE POLICY "Anyone can read book chapters" 
ON public.book_chapters 
FOR SELECT 
USING (true);

-- Policy to allow only admin users to insert new chapters
CREATE POLICY "Only admins can insert book chapters" 
ON public.book_chapters 
FOR INSERT 
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy to allow only admin users to update existing chapters
CREATE POLICY "Only admins can update book chapters" 
ON public.book_chapters 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy to allow only admin users to delete chapters
CREATE POLICY "Only admins can delete book chapters" 
ON public.book_chapters 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
