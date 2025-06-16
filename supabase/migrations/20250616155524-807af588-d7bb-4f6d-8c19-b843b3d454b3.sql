
-- Create storage bucket for story images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('story-images', 'story-images', true);

-- Create storage policies to allow authenticated users to upload
CREATE POLICY "Authenticated users can upload story images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'story-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Anyone can view story images" ON storage.objects
FOR SELECT USING (bucket_id = 'story-images');

CREATE POLICY "Admins can delete story images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'story-images' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);
