## Objetivo

Toda alteração feita no Lovable é automaticamente publicada em `www.objetivomairinque.com.br` (hospedado no cPanel), mantendo o banco/auth na Lovable Cloud.

## Como vai funcionar

```
Você edita no Lovable
        │
        ▼
Lovable sincroniza com GitHub (sync automática bidirecional)
        │
        ▼
GitHub Actions detecta o push na branch main
        │
        ├─ roda: node convert-to-spa.mjs   (converte SSR → SPA estático)
        ├─ roda: bun install
        ├─ roda: bun run build             (gera pasta dist/)
        │
        ▼
Action envia conteúdo de dist/ via FTP para /public_html do cPanel
        │
        ▼
Site atualizado em www.objetivomairinque.com.br (1-3 min após o save)
```

Você não precisa mais rodar build manual nem subir arquivos no cPanel — só editar no Lovable.

## Pré-requisitos (você faz uma única vez)

1. **Conectar o projeto ao GitHub** no Lovable: menu **+** → **GitHub** → **Connect project** → criar o repo.
2. **Adicionar 3 secrets no GitHub** (Settings → Secrets and variables → Actions → New repository secret):
   - `FTP_HOST` — ex: `ftp.objetivomairinque.com.br` (ou IP do servidor)
   - `FTP_USERNAME` — usuário FTP do cPanel
   - `FTP_PASSWORD` — senha FTP do cPanel
3. **No painel da Lovable Cloud (Backend → Auth)**, adicionar em Redirect URLs:
   - `https://www.objetivomairinque.com.br/**`
   - `https://objetivomairinque.com.br/**`
4. **No cPanel**, ativar **AutoSSL** para o domínio (Let's Encrypt).

## O que vou criar/ajustar no projeto

1. **`.github/workflows/deploy-cpanel.yml`** — workflow que roda em todo push na `main`:
   - checkout do código
   - setup Node 20 + Bun
   - cria `.env.production` com as chaves públicas do Supabase (a partir de secrets do GitHub `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID` — ou hardcoded, pois são chaves públicas)
   - executa `node convert-to-spa.mjs`
   - executa `bun install && bun run build`
   - usa `SamKirkland/FTP-Deploy-Action` para enviar `dist/` para `/public_html/`
2. **`convert-to-spa.mjs`** — já existe no pacote anterior, vou copiar para a raiz do projeto (no GitHub, não no preview do Lovable — para não quebrar o preview, ele só roda dentro do GitHub Action, em uma cópia temporária do código).
   - Alternativa mais limpa: o script roda dentro do workflow e modifica os arquivos só no runner do GitHub, sem commitar de volta. Preview do Lovable continua intacto (SSR).
3. **`public/.htaccess`, `public/robots.txt`, `public/sitemap.xml`** — já existem; o build copia automaticamente para `dist/`.
4. **`DEPLOY-CPANEL.md`** — atualizar com o passo a passo dos 3 secrets do GitHub e troubleshooting do workflow.

## O que NÃO muda

- Preview do Lovable continua funcionando normalmente (SSR / TanStack Start).
- Código-fonte continua igual; a conversão para SPA acontece **só dentro do GitHub Action**, em arquivos descartáveis.
- Backend (banco, login, storage) permanece na Lovable Cloud.

## Fluxo do dia a dia depois de configurado

1. Você abre o Lovable, pede uma alteração, salva.
2. Lovable faz commit no GitHub.
3. GitHub Actions roda (~2 min) e publica no cPanel.
4. Você atualiza o site no navegador e vê a mudança.

Se algo der errado no deploy, você recebe email do GitHub e a aba **Actions** mostra os logs.

## Limitações conhecidas

- **Convidar usuário admin por email**: continua não disponível (sem service role no frontend). Para promover admin, o usuário se cadastra em `/login` e outro admin promove ele pelo painel.
- **Previews de WhatsApp/Facebook**: mostram o título genérico do `index.html` (sem SSR de metadata por rota).
- **Tempo de propagação**: 2-4 minutos entre salvar no Lovable e ver no domínio.

## Para você aprovar

Confirma que quer seguir com este plano? Após aprovar, eu:
1. Crio o arquivo do workflow `.github/workflows/deploy-cpanel.yml`.
2. Coloco o `convert-to-spa.mjs` na raiz (sem afetar o preview, ele só executa no GitHub).
3. Atualizo o `DEPLOY-CPANEL.md` com instruções dos secrets do GitHub.

Depois, você só precisa conectar o GitHub no Lovable e adicionar os 3 secrets FTP no GitHub — eu te guio nesse momento.
