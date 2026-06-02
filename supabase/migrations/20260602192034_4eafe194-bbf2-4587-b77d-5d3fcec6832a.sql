
-- Add social media fields to site_settings
ALTER TABLE public.site_settings
  ADD COLUMN IF NOT EXISTS facebook_url text DEFAULT '',
  ADD COLUMN IF NOT EXISTS instagram_url text DEFAULT '',
  ADD COLUMN IF NOT EXISTS youtube_url text DEFAULT '';

-- =============================================================
-- HERO SLIDES
-- =============================================================
CREATE TABLE public.hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text DEFAULT '',
  image_url text DEFAULT '',
  cta_label text DEFAULT '',
  cta_link text DEFAULT '',
  position integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.hero_slides TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.hero_slides TO authenticated;
GRANT ALL ON public.hero_slides TO service_role;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read hero_slides" ON public.hero_slides FOR SELECT USING (true);
CREATE POLICY "admin insert hero_slides" ON public.hero_slides FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin update hero_slides" ON public.hero_slides FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete hero_slides" ON public.hero_slides FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'));

-- =============================================================
-- SEGMENTS (níveis de ensino)
-- =============================================================
CREATE TABLE public.segments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  short_description text DEFAULT '',
  long_description text DEFAULT '',
  age_range text DEFAULT '',
  image_url text DEFAULT '',
  color text DEFAULT '#1e40af',
  link text DEFAULT '',
  position integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.segments TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.segments TO authenticated;
GRANT ALL ON public.segments TO service_role;
ALTER TABLE public.segments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read segments" ON public.segments FOR SELECT USING (true);
CREATE POLICY "admin insert segments" ON public.segments FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin update segments" ON public.segments FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete segments" ON public.segments FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'));

-- =============================================================
-- ACCESSORIES
-- =============================================================
CREATE TABLE public.accessories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT 'Sparkles',
  image_url text DEFAULT '',
  position integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.accessories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.accessories TO authenticated;
GRANT ALL ON public.accessories TO service_role;
ALTER TABLE public.accessories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read accessories" ON public.accessories FOR SELECT USING (true);
CREATE POLICY "admin insert accessories" ON public.accessories FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin update accessories" ON public.accessories FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete accessories" ON public.accessories FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'));

-- =============================================================
-- DIFFERENTIALS
-- =============================================================
CREATE TABLE public.differentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  icon text DEFAULT 'Star',
  position integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.differentials TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.differentials TO authenticated;
GRANT ALL ON public.differentials TO service_role;
ALTER TABLE public.differentials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read differentials" ON public.differentials FOR SELECT USING (true);
CREATE POLICY "admin insert differentials" ON public.differentials FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin update differentials" ON public.differentials FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete differentials" ON public.differentials FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'));

-- =============================================================
-- STATS
-- =============================================================
CREATE TABLE public.stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value text NOT NULL,
  suffix text DEFAULT '',
  position integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.stats TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.stats TO authenticated;
GRANT ALL ON public.stats TO service_role;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read stats" ON public.stats FOR SELECT USING (true);
CREATE POLICY "admin insert stats" ON public.stats FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin update stats" ON public.stats FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete stats" ON public.stats FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'));

-- =============================================================
-- BIG COUNTER (singleton id=1)
-- =============================================================
CREATE TABLE public.big_counter (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  title text NOT NULL DEFAULT '',
  number_value text NOT NULL DEFAULT '0',
  caption text DEFAULT '',
  background_url text DEFAULT '',
  active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.big_counter TO anon, authenticated;
GRANT INSERT, UPDATE ON public.big_counter TO authenticated;
GRANT ALL ON public.big_counter TO service_role;
ALTER TABLE public.big_counter ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read big_counter" ON public.big_counter FOR SELECT USING (true);
CREATE POLICY "admin insert big_counter" ON public.big_counter FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin update big_counter" ON public.big_counter FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));

-- =============================================================
-- HISTORY EVENTS
-- =============================================================
CREATE TABLE public.history_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year text NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  position integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.history_events TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.history_events TO authenticated;
GRANT ALL ON public.history_events TO service_role;
ALTER TABLE public.history_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read history_events" ON public.history_events FOR SELECT USING (true);
CREATE POLICY "admin insert history_events" ON public.history_events FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin update history_events" ON public.history_events FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete history_events" ON public.history_events FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'));

-- =============================================================
-- FAQs
-- =============================================================
CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL DEFAULT '',
  category text DEFAULT 'Geral',
  position integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.faqs TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "admin insert faqs" ON public.faqs FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin update faqs" ON public.faqs FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete faqs" ON public.faqs FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'));

-- =============================================================
-- MATERIALS
-- =============================================================
CREATE TABLE public.materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  segment_slug text NOT NULL DEFAULT '',
  title text NOT NULL,
  description text DEFAULT '',
  file_url text DEFAULT '',
  position integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.materials TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.materials TO authenticated;
GRANT ALL ON public.materials TO service_role;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read materials" ON public.materials FOR SELECT USING (true);
CREATE POLICY "admin insert materials" ON public.materials FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin update materials" ON public.materials FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete materials" ON public.materials FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'));

-- =============================================================
-- HOME LAYOUT (singleton)
-- =============================================================
CREATE TABLE public.home_layout (
  id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.home_layout TO anon, authenticated;
GRANT INSERT, UPDATE ON public.home_layout TO authenticated;
GRANT ALL ON public.home_layout TO service_role;
ALTER TABLE public.home_layout ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read home_layout" ON public.home_layout FOR SELECT USING (true);
CREATE POLICY "admin insert home_layout" ON public.home_layout FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin update home_layout" ON public.home_layout FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));

-- =============================================================
-- MENU ITEMS
-- =============================================================
CREATE TABLE public.menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  link text NOT NULL DEFAULT '/',
  parent_id uuid REFERENCES public.menu_items(id) ON DELETE CASCADE,
  position integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  external boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.menu_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.menu_items TO authenticated;
GRANT ALL ON public.menu_items TO service_role;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read menu_items" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "admin insert menu_items" ON public.menu_items FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin update menu_items" ON public.menu_items FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete menu_items" ON public.menu_items FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'));

-- =============================================================
-- FOOTER COLUMNS + LINKS
-- =============================================================
CREATE TABLE public.footer_columns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.footer_columns TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.footer_columns TO authenticated;
GRANT ALL ON public.footer_columns TO service_role;
ALTER TABLE public.footer_columns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read footer_columns" ON public.footer_columns FOR SELECT USING (true);
CREATE POLICY "admin insert footer_columns" ON public.footer_columns FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin update footer_columns" ON public.footer_columns FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete footer_columns" ON public.footer_columns FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'));

CREATE TABLE public.footer_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  column_id uuid NOT NULL REFERENCES public.footer_columns(id) ON DELETE CASCADE,
  label text NOT NULL,
  link text NOT NULL DEFAULT '/',
  position integer NOT NULL DEFAULT 0,
  external boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.footer_links TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.footer_links TO authenticated;
GRANT ALL ON public.footer_links TO service_role;
ALTER TABLE public.footer_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read footer_links" ON public.footer_links FOR SELECT USING (true);
CREATE POLICY "admin insert footer_links" ON public.footer_links FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin update footer_links" ON public.footer_links FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete footer_links" ON public.footer_links FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'));

-- =============================================================
-- MESSAGES (contact form leads)
-- =============================================================
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  subject text DEFAULT '',
  message text NOT NULL,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit messages" ON public.messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admin read messages" ON public.messages FOR SELECT TO authenticated USING (has_role(auth.uid(),'admin'));
CREATE POLICY "admin update messages" ON public.messages FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete messages" ON public.messages FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'));

CREATE INDEX idx_messages_created ON public.messages(created_at DESC);
CREATE INDEX idx_messages_unread ON public.messages(read) WHERE read = false;

-- =============================================================
-- SEEDS
-- =============================================================
INSERT INTO public.big_counter (id, title, number_value, caption) VALUES
  (1, 'Mais de', '20', 'anos formando estudantes em Mairinque')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.home_layout (id, sections) VALUES
  (1, '["hero","segments","differentials","stats","big_counter","accessories","faqs"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.segments (slug, name, short_description, age_range, color, link, position) VALUES
  ('educacao-infantil', 'Educação Infantil', 'Acolhimento, brincar e descobertas', '2 a 5 anos', '#f59e0b', '/educacao-infantil', 1),
  ('fundamental-1', 'Ensino Fundamental I', 'Alfabetização e formação de hábitos de estudo', '6 a 10 anos', '#10b981', '/fundamental-1', 2),
  ('fundamental-2', 'Ensino Fundamental II', 'Aprofundamento e protagonismo estudantil', '11 a 14 anos', '#3b82f6', '/fundamental-2', 3),
  ('integral', 'Período Integral', 'Ampliação da jornada com oficinas e acompanhamento', 'Todos os níveis', '#8b5cf6', '/integral', 4);

INSERT INTO public.differentials (title, description, icon, position) VALUES
  ('Tradição', 'Mais de 20 anos de excelência educacional em Mairinque.', 'Award', 1),
  ('Método Objetivo', 'Material didático reconhecido nacionalmente.', 'BookOpen', 2),
  ('Formação Integral', 'Educação que vai além do conteúdo acadêmico.', 'Sparkles', 3),
  ('Estrutura Completa', 'Salas climatizadas, laboratórios e espaços de convivência.', 'Building2', 4),
  ('Equipe Qualificada', 'Professores especialistas e formação continuada.', 'Users', 5),
  ('Acompanhamento Próximo', 'Diálogo constante entre escola, aluno e família.', 'HandHeart', 6);

INSERT INTO public.stats (label, value, suffix, position) VALUES
  ('Anos de tradição', '20', '+', 1),
  ('Alunos formados', '5.000', '+', 2),
  ('Aprovação em vestibulares', '95', '%', 3),
  ('Professores especialistas', '40', '+', 4);

INSERT INTO public.faqs (question, answer, category, position) VALUES
  ('Como funciona a matrícula?', 'A matrícula pode ser feita presencialmente na secretaria ou agendada pelo WhatsApp.', 'Matrícula', 1),
  ('Quais os horários de aula?', 'Manhã das 7h30 às 12h e tarde das 13h às 17h30, com opção de período integral.', 'Funcionamento', 2),
  ('A escola oferece transporte?', 'Trabalhamos com empresas parceiras de transporte escolar credenciadas.', 'Serviços', 3),
  ('Tem material incluído?', 'O material didático é à parte, com condições especiais para alunos do colégio.', 'Matrícula', 4),
  ('Qual o método de ensino?', 'Utilizamos o consagrado Sistema Objetivo de Ensino, com tradição nacional.', 'Pedagógico', 5),
  ('Posso visitar a escola?', 'Sim! Agende uma visita pelo WhatsApp e conheça nossa estrutura.', 'Geral', 6),
  ('Há atividades extracurriculares?', 'Oferecemos oficinas no período integral: esportes, artes, idiomas e robótica.', 'Pedagógico', 7),
  ('Como acompanho o desempenho do meu filho?', 'Reuniões periódicas, boletins online e contato direto com a coordenação.', 'Geral', 8);

INSERT INTO public.history_events (year, title, description, position) VALUES
  ('2003', 'Fundação', 'Início das atividades do Colégio Objetivo Mairinque.', 1),
  ('2010', 'Expansão', 'Ampliação para todos os segmentos do Ensino Fundamental.', 2),
  ('2018', 'Período Integral', 'Implantação do programa de período integral.', 3),
  ('2023', '20 anos', 'Duas décadas formando estudantes em Mairinque.', 4);

INSERT INTO public.accessories (title, description, icon, position) VALUES
  ('Plataforma Digital', 'Acesso a conteúdos exclusivos do Sistema Objetivo.', 'Laptop', 1),
  ('Esportes', 'Quadras e atividades esportivas variadas.', 'Trophy', 2),
  ('Laboratórios', 'Ciências e informática equipados.', 'FlaskConical', 3);

-- Menu padrão
INSERT INTO public.menu_items (label, link, position) VALUES
  ('Início', '/', 1),
  ('Sobre', '/sobre', 2),
  ('Educação Infantil', '/educacao-infantil', 3),
  ('Fundamental I', '/fundamental-1', 4),
  ('Fundamental II', '/fundamental-2', 5),
  ('Integral', '/integral', 6),
  ('Contato', '/contato', 7);

-- Rodapé padrão
WITH c1 AS (
  INSERT INTO public.footer_columns (title, position) VALUES ('Institucional', 1) RETURNING id
), c2 AS (
  INSERT INTO public.footer_columns (title, position) VALUES ('Ensino', 2) RETURNING id
)
INSERT INTO public.footer_links (column_id, label, link, position, external)
SELECT id, 'Início', '/', 1, false FROM c1
UNION ALL SELECT id, 'Sobre Nós', '/sobre', 2, false FROM c1
UNION ALL SELECT id, 'Período Integral', '/integral', 3, false FROM c1
UNION ALL SELECT id, 'Contato', '/contato', 4, false FROM c1
UNION ALL SELECT id, 'Educação Infantil', '/educacao-infantil', 1, false FROM c2
UNION ALL SELECT id, 'Fundamental I', '/fundamental-1', 2, false FROM c2
UNION ALL SELECT id, 'Fundamental II', '/fundamental-2', 3, false FROM c2;
