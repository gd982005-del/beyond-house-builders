-- Create storage bucket for portfolio and services images
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view images in the media bucket
CREATE POLICY "Public can view media"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Allow authenticated admins to upload images
CREATE POLICY "Admins can upload media"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'media' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to update their uploaded files
CREATE POLICY "Admins can update media"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'media' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to delete files
CREATE POLICY "Admins can delete media"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'media' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);