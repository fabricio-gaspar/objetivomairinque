# Deploy no cPanel — Colégio Objetivo Mairinque

Guia completo para hospedar o site no cPanel mantendo o backend (banco de dados, autenticação, storage) na Lovable Cloud.

**Domínio:** `www.objetivomairinque.com.br`

---

## Visão geral da arquitetura

```
[Visitante]
    │
    ▼
[cPanel - public_html]  ← Site estático (HTML/CSS/JS gerado pelo build)
    │
    ▼  chamadas HTTPS via JavaScript
[Lovable Cloud / Supabase]  ← Banco, autenticação, storage, formulário de contato
```

- O **frontend** (tudo que o navegador vê) fica no cPanel.
- O **backend** (banco de dados, login, upload de imagens, mensagens) continua na Lovable Cloud.
- A comunicação acontece diretamente do navegador para a Lovable Cloud, usando a chave pública (`VITE_SUPABASE_PUBLISHABLE_KEY`) protegida por RLS (Row Level Security).

---

## Pré-requisitos

- [ ] cPanel com **mod_rewrite** habilitado (padrão na maioria dos provedores).
- [ ] **Node.js 20+** e **Bun** instalados no seu computador (para gerar o build).
  - Bun: https://bun.sh/docs/installation
- [ ] Acesso ao **File Manager** do cPanel ou cliente FTP (FileZilla, por exemplo).
- [ ] Domínio `objetivomairinque.com.br` apontado para o cPanel.

---

## Passo 1 — Baixar o projeto da Lovable

1. No editor da Lovable, clique no menu **⋯** no topo direito → **Export to GitHub** (ou use o botão de download do projeto se preferir um ZIP).
2. Clone o repositório no seu computador:
   ```bash
   git clone https://github.com/SEU_USUARIO/SEU_REPO.git
   cd SEU_REPO
   ```

---

## Passo 2 — Converter para SPA estático

> Esta conversão é feita **fora da Lovable** para não quebrar o preview.

### 2.1) Remover a camada SSR (Cloudflare Workers)

Apague os arquivos:

```bash
rm src/server.ts
rm src/start.ts
rm wrangler.jsonc
rm src/integrations/supabase/client.server.ts
rm src/integrations/supabase/auth-middleware.ts
rm src/integrations/supabase/auth-attacher.ts
```

### 2.2) Trocar `vite.config.ts`

Substitua o conteúdo por:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
```

Instale o plugin React:
```bash
bun remove @lovable.dev/vite-tanstack-config @tanstack/react-start @cloudflare/vite-plugin wrangler
bun add -D @vitejs/plugin-react-swc
```

### 2.3) Criar `index.html` na raiz

```html
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Colégio Objetivo Mairinque — Educação de excelência há mais de 20 anos</title>
    <meta name="description" content="Colégio Objetivo Mairinque: Educação Infantil, Fundamental I e II em Mairinque-SP. Tradição, autoridade pedagógica e formação integral." />
    <link rel="canonical" href="https://www.objetivomairinque.com.br/" />
    <meta property="og:site_name" content="Colégio Objetivo Mairinque" />
    <meta property="og:type" content="website" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 2.4) Criar `src/main.tsx`

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter, createBrowserHistory } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import "./styles.css";

const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  context: { queryClient },
  history: createBrowserHistory(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
```

### 2.5) Converter as `*.functions.ts` para client-side

Cada arquivo `src/lib/*.functions.ts` precisa virar uma função client que chama `supabase` diretamente. Exemplo de conversão:

**Antes** (`src/lib/messages.functions.ts`):
```ts
export const createMessage = createServerFn({ method: "POST" })
  .inputValidator(...)
  .handler(async ({ data }) => { ... supabaseAdmin ... });
```

**Depois** (`src/lib/messages.ts`):
```ts
import { supabase } from "@/integrations/supabase/client";

export async function createMessage(data: { name: string; email: string; message: string }) {
  const { error } = await supabase.from("messages").insert(data);
  if (error) throw error;
}
```

Faça isso para todos os arquivos `*.functions.ts`. As policies de RLS já estão configuradas no banco para permitir as operações corretas.

Nos componentes, troque:
```tsx
const fn = useServerFn(createMessage);
await fn({ data: payload });
```
por:
```tsx
await createMessage(payload);
```

### 2.6) Variáveis de ambiente

Crie `.env.production` com:
```
VITE_SUPABASE_URL=https://vhwhugcwrsltqlrlssyg.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIs... (mesma chave atual)
```

Estas chaves são **públicas** — podem ficar embutidas no bundle.

---

## Passo 3 — Configurar URLs no Supabase

No painel da Lovable Cloud (**Cloud → Backend → Auth Settings**), adicione:

- **Site URL:** `https://www.objetivomairinque.com.br`
- **Redirect URLs:**
  - `https://www.objetivomairinque.com.br/**`
  - `https://objetivomairinque.com.br/**`

---

## Passo 4 — Gerar o build

```bash
bun install
bun run build
```

Resultado: pasta `dist/` com `index.html`, `assets/`, `.htaccess`, `robots.txt`, `sitemap.xml`.

Confirme que estes 3 arquivos estão dentro de `dist/`:
- `dist/.htaccess`
- `dist/robots.txt`
- `dist/sitemap.xml`

(Eles vêm de `public/` automaticamente.)

---

## Passo 5 — Upload no cPanel

### Opção A — File Manager (interface do cPanel)

1. Acesse o cPanel → **File Manager** → entre na pasta `public_html`.
2. Apague o conteúdo antigo (se houver).
3. Clique em **Upload** e envie **todo o conteúdo de `dist/`** (não a pasta `dist` em si, apenas o que está dentro).
4. Importante: garanta que o `.htaccess` foi enviado. Ative **"Show Hidden Files"** no File Manager para visualizá-lo.

### Opção B — FTP (FileZilla)

1. Conecte ao seu servidor com as credenciais FTP do cPanel.
2. Entre em `/public_html`.
3. Arraste todo o conteúdo de `dist/` para lá.
4. Confirme que `.htaccess` aparece no servidor (em **Server → Force showing hidden files**).

---

## Passo 6 — SSL (HTTPS)

No cPanel → **SSL/TLS Status**:
1. Marque `objetivomairinque.com.br` e `www.objetivomairinque.com.br`.
2. Clique em **Run AutoSSL** (usa Let's Encrypt automaticamente).
3. Aguarde 1-5 minutos.

---

## Passo 7 — Testes finais

Abra o navegador:

- [ ] `https://www.objetivomairinque.com.br` → deve carregar o site.
- [ ] `https://www.objetivomairinque.com.br/contato` → deve abrir a página de contato.
- [ ] **Aperte F5** na página de contato → deve continuar funcionando (testa o `.htaccess`).
- [ ] `https://objetivomairinque.com.br` (sem www) → deve redirecionar para `www.`.
- [ ] `http://www.objetivomairinque.com.br` (sem HTTPS) → deve redirecionar para `https://`.
- [ ] Envie uma mensagem pelo formulário de contato → deve aparecer no admin.
- [ ] Faça login no `/login` com seu usuário admin → deve abrir o painel.

---

## Atualizando o site depois

Sempre que mudar algo no projeto (no GitHub ou na Lovable):

1. `git pull` (se você sincroniza com a Lovable via GitHub).
2. `bun run build`
3. Upload do conteúdo de `dist/` no `public_html` (sobrescrever).

> Dica: você pode automatizar isso com **GitHub Actions + FTP deploy** se quiser.

---

## Problemas comuns

| Sintoma | Causa | Solução |
|---|---|---|
| 404 ao dar F5 numa rota interna | `.htaccess` não foi enviado ou mod_rewrite desativado | Confirme que o `.htaccess` está em `public_html`. Ative "Show Hidden Files". |
| Tela branca | Variáveis `VITE_*` faltando no build | Confirme o `.env.production` antes de rodar `bun run build`. |
| Login não funciona | Site URL/Redirect URLs do Supabase não atualizados | Volte ao Passo 3. |
| CSS/JS não carrega | Caminhos relativos errados | Verifique no DevTools → Network. Deve carregar de `/assets/*.js`. |
| Erro de CORS no console | Domínio não autorizado no Supabase | Adicione o domínio em **Auth → URL Configuration**. |

---

## Limitações desta hospedagem

- **Convidar usuários por email** não funciona no cPanel (precisa de service role server-side). Para adicionar um novo admin, o usuário precisa primeiro se cadastrar pelo `/login`, depois um admin existente promove ele no painel **Usuários**.
- **SEO de páginas dinâmicas** depende de JavaScript (sem SSR). Google indexa normalmente; previews de WhatsApp/Facebook podem mostrar o título genérico do `index.html`.

---

## Suporte

Em caso de dúvida, abra um chamado com seu provedor de cPanel passando:
1. O domínio.
2. Um print do erro.
3. Confirmação de que `mod_rewrite`, `mod_headers`, `mod_deflate` e `mod_expires` estão ativos.
