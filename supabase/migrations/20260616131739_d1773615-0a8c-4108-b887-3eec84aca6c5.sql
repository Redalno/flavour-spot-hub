REVOKE SELECT, UPDATE, DELETE ON public.contact_inquiries FROM anon, authenticated;
GRANT INSERT ON public.contact_inquiries TO anon, authenticated;
GRANT ALL ON public.contact_inquiries TO service_role;