
# Caminho B — SPA estático no cPanel + Lovable Cloud no backend

Domínio final: **www.objetivomairinque.com.br**

## Visão geral

Converter o projeto de TanStack Start (SSR/Cloudflare Workers) para **React SPA puro** que roda 100% no navegador, consumindo Supabase (Lovable Cloud) diretamente via chave publishable + RLS. O resultado é uma pasta `dist/` que você faz upload no `public_html` do cPanel.

## Mudanças no projeto

### 1. Stack / build
- Substituir `@lovable.dev/vite-tanstack-config` por Vite + React puro.
- Remover: `src/server.ts`, `src/start.ts`, `wrangler.jsonc`, `src/integrations/supabase/client.server.ts`, `auth-middleware.ts`, `auth-attacher.ts`.
- Criar `index.html` na raiz com `<div id="root">` e bootstrap React.
- Trocar roteamento de file-based para **TanStack Router code-based com `createBrowserHistory`** (mantém os componentes existentes; só muda como as rotas são registradas).
- Remover `src/routeTree.gen.ts` e configurar router manualmente em `src/router.tsx`.

### 2. Camada de dados (de server functions → client direto)
Converter todas as `*.functions.ts` em módulos client-side que chamam `supabase` do navegador:

| Antes (server) | Depois (client) | Proteção |
|---|---|---|
| `cms.functions.ts` | `src/lib/cms.ts` | RLS (leitura pública / escrita admin) |
| `collections.functions.ts` | `src/lib/collections.ts` | RLS via `has_role` |
| `messages.functions.ts` | `src/lib/messages.ts` | RLS (insert público, select admin) |
| `media.functions.ts` | `src/lib/media.ts` | Storage policies do bucket `site-media` |
| `users.functions.ts` | `src/lib/users-admin.ts` | Só promover/revogar admin (RLS) |
| `public-cms.functions.ts` | `src/lib/public-cms.ts` | Leitura pública |

Componentes admin trocam `useServerFn(getX)` por chamadas diretas: `const { data } = useQuery({ queryFn: () => getX() })`.

### 3. Autenticação
- Login continua com `supabase.auth.signInWithPassword` (já é client-side).
- Guard `_authenticated` continua igual (já é client-only).
- Remover seção "Convidar usuário por email" do admin de usuários; manter apenas: listar admins, promover usuário existente (insert em `user_roles`), revogar admin (delete).

### 4. RLS (auditoria)
Revisar as 17 tabelas para garantir que toda operação de escrita do admin tem policy `USING (has_role(auth.uid(), 'admin'))`. Tabelas que precisam de leitura pública (hero_slides, segments, etc.) já têm — confirmar.

### 5. SEO (substituindo SSR)
- Adicionar `react-helmet-async` para definir `<title>`, `description`, `og:*` por rota.
- Criar `public/robots.txt` apontando para `https://www.objetivomairinque.com.br/sitemap.xml`.
- Criar `public/sitemap.xml` estático com as rotas públicas (Home, Educação Infantil, Fundamental I, Fundamental II, Integral, Sobre, Contato).
- Adicionar JSON-LD (EducationalOrganization) no `<head>` do `index.html`.

### 6. Variáveis de ambiente
- `.env.production` com `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` (já são públicas, vão embutidas no bundle — seguro).

### 7. Configurações no Supabase (Lovable Cloud)
Adicionar nas configurações de Auth:
- **Site URL**: `https://www.objetivomairinque.com.br`
- **Redirect URLs**: `https://www.objetivomairinque.com.br/**`, `https://objetivomairinque.com.br/**`

## Arquivos para o cPanel

### `public/.htaccess` (vai para a raiz do `public_html`)

```apache
# Forçar HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Forçar www
RewriteCond %{HTTP_HOST} ^objetivomairinque\.com\.br$ [NC]
RewriteRule ^(.*)$ https://www.objetivomairinque.com.br/$1 [L,R=301]

# SPA fallback — qualquer rota não-arquivo cai no index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Compressão
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>

# Cache de assets com hash (1 ano) e HTML sem cache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 6 months"
  ExpiresByType image/png "access plus 6 months"
  ExpiresByType image/webp "access plus 6 months"
  ExpiresByType image/svg+xml "access plus 6 months"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Segurança
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
  Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>
```

### `DEPLOY-CPANEL.md` (guia incluído no projeto)
Documento com passo a passo:
1. Baixar projeto da Lovable (botão "Export to GitHub" ou ZIP).
2. Localmente: `bun install && bun run build` → gera pasta `dist/`.
3. cPanel → File Manager → entrar em `public_html`.
4. Apagar conteúdo antigo (se houver).
5. Upload de **todo o conteúdo** de `dist/` (não a pasta `dist` inteira, só o que está dentro) + o `.htaccess`.
6. cPanel → SSL/TLS Status → instalar Let's Encrypt para `objetivomairinque.com.br` e `www.objetivomairinque.com.br`.
7. Testar: abrir `https://www.objetivomairinque.com.br` e fazer refresh em rota interna (ex: `/contato`) para validar o `.htaccess`.

## Limitações conhecidas
- **Sem SSR** → SEO depende de JS. Google indexa normalmente; previews de WhatsApp/Facebook podem mostrar título genérico em algumas rotas. Mitigável depois com pré-render estático se necessário.
- **Sem convite por email no admin** → admin promove usuários já cadastrados (decidido).
- **Bundle maior** → toda a lógica admin vai para o cliente (~200-400KB extras gzip), só carregada quando o admin loga.

## Estimativa de arquivos
- **Criados (~10)**: `index.html`, `public/.htaccess`, `public/robots.txt`, `public/sitemap.xml`, `src/main.tsx`, 6× novos `src/lib/*.ts`, `DEPLOY-CPANEL.md`.
- **Modificados (~25)**: `vite.config.ts`, `package.json`, `src/router.tsx`, `src/routes/__root.tsx`, todas as 17 rotas admin, 7 rotas públicas.
- **Removidos (~7)**: `src/server.ts`, `src/start.ts`, `wrangler.jsonc`, `src/integrations/supabase/client.server.ts`, `auth-middleware.ts`, `auth-attacher.ts`, todos os `*.functions.ts`.

## Observação importante
Esta migração é **grande** (~30-40 arquivos tocados) e é uma via de mão única dentro do Lovable: depois de feita, a publicação direta pela Lovable não fará mais sentido (você passa a depender só do cPanel). Se quiser manter as duas opções abertas ("publicar pela Lovable" + "exportar pro cPanel"), o ideal seria publicar primeiro pela Lovable como backup antes de aprovar.

Confirma para eu iniciar a implementação?
