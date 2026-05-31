
DROP POLICY IF EXISTS "public read site-media" ON storage.objects;

CREATE POLICY "admins list site-media"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));
