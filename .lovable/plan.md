# Painel Administrativo — Escopo Essencial

Criar um CMS simples e seguro para que 1 administrador edite o conteúdo do site sem mexer em código.

## O que será administrável

- **Configurações do site**: telefone fixo, WhatsApp (número e label), email, endereço, URL do portal do aluno
- **Páginas de nível** (Educação Infantil, Fundamental I, Fundamental II, Integral): eyebrow, título, parágrafos, lista de atividades, imagem
- **Página Sobre**: textos editáveis
- **Página Início**: títulos/subtítulos do hero e textos das seções
- **Imagens**: upload via biblioteca de mídia (storage), substituível em cada seção

## Arquitetura

- **Backend**: Lovable Cloud (Supabase) — PostgreSQL + Auth + Storage
- **Acesso**: 1 único usuário admin (criado por convite/email+senha)
- **Rotas admin**: `/admin/login` e área protegida em `/admin/*` (layout `_authenticated`)
- **Frontend público**: continua igual, mas lendo conteúdo do banco (com fallback para textos atuais)

## Estrutura técnica

### Tabelas (todas com RLS)
- `site_settings` — singleton com contatos e links globais
- `pages` — uma linha por página (`home`, `sobre`, `educacao-infantil`, `fundamental-1`, `fundamental-2`, `integral`, `contato`) com campos JSONB para conteúdo flexível
- `media` — referência aos arquivos no bucket de storage

Leitura pública via `createServerFn` + `supabaseAdmin` (projeção segura, só colunas públicas).
Escrita só por admin autenticado (RLS via `has_role(auth.uid(), 'admin')`).

### Storage
- Bucket `site-media` público para imagens do site

### Telas admin
1. `/admin/login` — login email+senha
2. `/admin` — dashboard simples (atalhos para cada seção)
3. `/admin/configuracoes` — contatos e links
4. `/admin/paginas` — lista das páginas
5. `/admin/paginas/$slug` — editor de campos (textos + upload de imagem)
6. `/admin/midia` — biblioteca de imagens

### Migração de conteúdo
Seed inicial popula o banco com todos os textos/imagens atuais (de `src/lib/site.ts` e dos componentes de página), para que nada visualmente mude na primeira publicação.

## O que NÃO está incluído (fora do escopo combinado)

Editor drag-and-drop, Blog, SEO por página editável, depoimentos, banners dinâmicos, captura de leads, Google Analytics embutido, integrações com redes sociais/ads, CRM, email marketing, IA generativa, MFA, múltiplos perfis. Esses módulos podem ser adicionados depois em iterações separadas.

## Passos de implementação

1. Ativar Lovable Cloud
2. Criar migrations: `app_role` enum, tabela `user_roles` + função `has_role`, tabelas `site_settings`, `pages`, `media`, bucket de storage, políticas RLS, seed inicial
3. Criar layout `_authenticated` + página de login
4. Criar telas admin (configurações, lista de páginas, editor de página, mídia)
5. Refatorar `src/lib/site.ts` e cada rota pública para ler do banco via `createServerFn` (com TanStack Query)
6. Criar o usuário admin inicial (você informa o email; eu deixo instruções para você definir a senha no primeiro acesso)

Depois disso, qualquer alteração de texto, telefone, WhatsApp ou imagem é feita pelo painel — sem precisar de novo deploy de código.
