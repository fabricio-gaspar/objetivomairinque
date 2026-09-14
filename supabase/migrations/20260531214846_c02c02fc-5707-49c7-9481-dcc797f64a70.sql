
-- Roles enum + table
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "users read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Site settings (singleton)
CREATE TABLE public.site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  name TEXT NOT NULL,
  short_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  phone_raw TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  whatsapp_label TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  portal_url TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT site_settings_singleton CHECK (id = 1)
);

GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read site settings" ON public.site_settings
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins update site settings" ON public.site_settings
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins insert site settings" ON public.site_settings
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Pages (one row per page, flexible JSONB content)
CREATE TABLE public.pages (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.pages TO anon, authenticated;
GRANT ALL ON public.pages TO service_role;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read pages" ON public.pages
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins update pages" ON public.pages
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins insert pages" ON public.pages
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins delete pages" ON public.pages
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Media library
CREATE TABLE public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  name TEXT NOT NULL,
  size INT,
  mime_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.media TO anon, authenticated;
GRANT ALL ON public.media TO service_role;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read media" ON public.media
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins insert media" ON public.media
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins delete media" ON public.media
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-media', 'site-media', true);

CREATE POLICY "public read site-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-media');

CREATE POLICY "admins upload site-media"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins update site-media"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins delete site-media"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));

-- Seed site settings
INSERT INTO public.site_settings (id, name, short_name, phone, phone_raw, whatsapp, whatsapp_label, email, address, portal_url)
VALUES (
  1,
  'Colégio Objetivo Mairinque',
  'Objetivo Mairinque',
  '(11) 99301-2284',
  '+5511993012284',
  '5511993012284',
  '(11) 99301-2284',
  'contato@objetivomairinque.com.br',
  'R. José Alves Ferreira Filho, 59 — Res. Parque Cristiane, Mairinque-SP, 18120-000',
  'https://portal.sponteeducacional.net.br/default.aspx?CID=54326'
);

-- Seed pages
INSERT INTO public.pages (slug, title, content) VALUES
('educacao-infantil', 'Educação Infantil', jsonb_build_object(
  'eyebrow', 'Educação Infantil',
  'heading', 'Desenvolvimento integral nos primeiros anos',
  'paragraphs', jsonb_build_array(
    'Acolhemos crianças com uma proposta pedagógica que respeita cada fase do desenvolvimento.',
    'Trabalhamos o cognitivo, socioemocional e motor por meio de atividades lúdicas e significativas.'
  ),
  'atividades', jsonb_build_array('Música', 'Artes', 'Movimento', 'Inglês', 'Hora do conto'),
  'whatsappMsg', 'Olá! Gostaria de saber mais sobre a Educação Infantil.'
)),
('fundamental-1', 'Fundamental I', jsonb_build_object(
  'eyebrow', 'Fundamental I',
  'heading', 'Base sólida para toda a vida escolar',
  'paragraphs', jsonb_build_array(
    'Do 1º ao 5º ano, com material didático do Sistema Objetivo de Ensino.',
    'Foco em leitura, escrita, raciocínio lógico e formação de hábitos de estudo.'
  ),
  'atividades', jsonb_build_array('Robótica', 'Esportes', 'Inglês', 'Artes'),
  'whatsappMsg', 'Olá! Gostaria de saber mais sobre o Fundamental I.'
)),
('fundamental-2', 'Fundamental II', jsonb_build_object(
  'eyebrow', 'Fundamental II',
  'heading', 'Autonomia, pensamento crítico e preparação para o futuro',
  'paragraphs', jsonb_build_array(
    'Do 6º ao 9º ano, com professores especialistas em cada área.',
    'Desenvolvimento da autonomia, pesquisa e protagonismo estudantil.'
  ),
  'atividades', jsonb_build_array('Olimpíadas do conhecimento', 'Robótica', 'Esportes', 'Inglês'),
  'whatsappMsg', 'Olá! Gostaria de saber mais sobre o Fundamental II.'
)),
('integral', 'Integral', jsonb_build_object(
  'eyebrow', 'Integral',
  'heading', 'Ensino moderno para o seu filho crescer feliz e brincando',
  'paragraphs', jsonb_build_array(
    'Destinado para crianças à partir de 2 a 10 anos de idade.',
    'Nosso objetivo é oferecer, além do período regular de aulas, atendimento especial e diferenciado para as famílias que necessitam deixar seus filhos em período integral ou parte do dia em local seguro e confiável.',
    'A programação respeita a faixa etária e desenvolvimento das crianças, intercalando momentos de brincar, descansar e se alimentar.'
  ),
  'atividades', jsonb_build_array('Oficinas', 'Hora do conto', 'Movimento', 'Atividades lúdicas'),
  'whatsappMsg', 'Olá! Gostaria de saber mais sobre o período Integral.'
));
