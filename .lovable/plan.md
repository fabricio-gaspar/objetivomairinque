# Plano: Confirmar deploy automático Lovable -> cPanel

## Contexto atual
- O repositório já tem `.github/workflows/deploy-cpanel.yml`: a cada push na `main` ele converte SSR -> SPA, gera `dist/` e faz FTP para `/public_html` no cPanel.
- `public/.htaccess` já existe com fallback SPA, HTTPS, www e headers de segurança.
- O workflow **apaga tudo em `/public_html` antes de subir** (`dangerous-clean-slate: true`), mas preserva pastas do sistema do cPanel.

## O que falta para "atualizar sozinho"
O workflow só funciona depois que 3 secrets forem adicionados no repositório GitHub:

| Secret | De onde vem |
|--------|-------------|
| `FTP_HOST` | Host FTP do cPanel (ex: `ftp.objetivomairinque.com.br` ou IP) |
| `FTP_USERNAME` | Usuário FTP (geralmente igual ao usuário cPanel) |
| `FTP_PASSWORD` | Senha da conta FTP |

Caminho no GitHub: **Repositório -> Settings -> Secrets and variables -> Actions -> New repository secret**.

## Passos do plano

1. **Confirmar os 3 secrets no GitHub**
   - Verificar se `FTP_HOST`, `FTP_USERNAME` e `FTP_PASSWORD` existem.
   - Se faltarem, solicitar os dados e criar.

2. **Testar o workflow manualmente**
   - Ir em **Actions -> Deploy to cPanel -> Run workflow** no GitHub.
   - Verificar se todos os passos passam, especialmente "Deploy via FTP".

3. **Validar o resultado no cPanel**
   - Abrir `https://www.objetivomairinque.com.br/` e confirmar que carrega com CSS/JS.
   - No File Manager do cPanel, confirmar que `public_html` tem `index.html`, `.htaccess` e a pasta `assets/`.

4. **Ajustar o workflow se houver erro de FTPS**
   - Se a hospedagem bloquear FTPS na porta 21, trocar `protocol: ftps` por `protocol: ftp` no workflow.

5. **Melhoria de segurança (opcional, recomendado)**
   - Mover as chaves do Supabase de dentro do workflow para secrets do GitHub (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`), em vez de deixá-las hardcoded no arquivo YAML.

## Resultado esperado
- Toda alteração salva no Lovable vai para o GitHub automaticamente.
- GitHub Actions dispara sozinho e publica em `www.objetivomairinque.com.br` em ~2-4 minutos.
- Não precisa mais subir a pasta `dist/` manualmente.