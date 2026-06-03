# Pacote de deploy para cPanel

Vou gerar arquivos prontos em `/mnt/documents/` sem mexer no código do projeto Lovable.

## Arquivos gerados

1. **`.htaccess`** — SPA fallback, força HTTPS + www, gzip, cache de assets, headers de segurança, bloqueio de arquivos sensíveis. (Reaproveita o `public/.htaccess` já existente.)

2. **`.env.production`** — pré-preenchido:
   ```
   VITE_SUPABASE_URL=https://vhwhugcwrsltqlrlssyg.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJI...
   VITE_SUPABASE_PROJECT_ID=vhwhugcwrsltqlrlssyg
   ```

3. **`build-deploy.sh`** (Linux/Mac) e **`build-deploy.bat`** (Windows) — scripts que:
   - rodam `bun install` (ou `npm install` como fallback)
   - rodam `bun run build`
   - copiam `.htaccess`, `robots.txt`, `sitemap.xml` para `dist/`
   - empacotam `dist/` em `objetivo-cpanel.zip`

4. **`INSTRUCOES-DEPLOY.md`** — guia PT-BR passo a passo:
   - Baixar o código (GitHub ou Download codebase)
   - Colocar `.env.production` na raiz do projeto
   - Rodar o script de build
   - Upload do ZIP via File Manager do cPanel → extrair em `public_html`
   - Confirmar que `.htaccess` está presente (Show Hidden Files)
   - Ativar AutoSSL (Let's Encrypt)
   - Adicionar `https://www.objetivomairinque.com.br` em Redirect URLs do backend Lovable Cloud
   - Como atualizar (rodar build novamente + reupload)
   - Troubleshooting (404 em F5, tela branca, CORS, etc.)

## Observações importantes

- **O build atual do projeto é TanStack Start (SSR/Cloudflare Workers)**, que **não roda em cPanel compartilhado**. cPanel só serve arquivos estáticos + PHP.
- Para que o build gere algo hospedável em cPanel, é necessário **converter o projeto para SPA** (remover `src/server.ts`, `src/start.ts`, `wrangler.jsonc`, trocar `vite.config.ts`, criar `index.html` + `src/main.tsx`, converter `*.functions.ts` para client-side).
- **Essa conversão NÃO pode ser feita no projeto Lovable** (quebraria o preview). Ela precisa ser feita localmente, depois de baixar o código.
- O `INSTRUCOES-DEPLOY.md` vai incluir o passo de conversão SPA, ou alternativamente um **script `convert-to-spa.mjs`** que faz isso automaticamente em uma cópia do projeto.

## Pergunta antes de prosseguir

Você prefere:
- **(A)** Eu gerar também o `convert-to-spa.mjs` que automatiza a conversão SPA (você só roda `node convert-to-spa.mjs && bun run build`), OU
- **(B)** Apenas instruções manuais passo a passo no `INSTRUCOES-DEPLOY.md` (mais longo, sem script extra)?

Se você aprovar este plano sem responder, vou seguir com **(A)** — é o caminho mais fácil, condizente com seu pedido anterior.
