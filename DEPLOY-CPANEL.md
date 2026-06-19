# Deploy automatico Lovable -> cPanel

Toda alteracao feita no Lovable e publicada automaticamente em
`www.objetivomairinque.com.br` (hospedado no cPanel), enquanto o banco de dados,
autenticacao e storage continuam na Lovable Cloud.

## Como funciona

```
Voce edita no Lovable
        |
        v
Lovable sincroniza com GitHub (sync automatica bidirecional)
        |
        v
GitHub Actions (.github/workflows/deploy-cpanel.yml):
   - converte SSR -> SPA estatico  (node convert-to-spa.mjs)
   - bun install
   - bun run build                  (gera dist/)
   - envia dist/ via FTP -> /public_html  (cPanel)
        |
        v
Site atualizado em ~2-4 minutos
```

O preview do Lovable continua rodando SSR normalmente. A conversao SPA
acontece **so dentro do runner do GitHub**, em arquivos descartaveis.

---

## Configuracao inicial (uma unica vez)

### 1) Conectar o projeto ao GitHub

No editor Lovable: menu **+** (canto inferior esquerdo do chat) -> **GitHub**
-> **Connect project** -> **Create Repository**.

### 2) Adicionar 3 secrets no GitHub

No repositorio criado, va em **Settings -> Secrets and variables -> Actions
-> New repository secret** e crie:

| Nome           | Valor                                                     |
|----------------|-----------------------------------------------------------|
| `FTP_HOST`     | Host FTP do cPanel (ex: `ftp.objetivomairinque.com.br`)   |
| `FTP_USERNAME` | Usuario FTP (geralmente o mesmo do cPanel)                |
| `FTP_PASSWORD` | Senha FTP                                                 |

> Os dados de FTP estao em **cPanel -> FTP Accounts**. Se nao quiser usar a
> conta principal, crie uma conta FTP dedicada apontando para `/public_html`.

### 3) Configurar URLs de redirecionamento no backend

No painel da Lovable Cloud, em **Backend -> Auth -> URL Configuration**:

- **Site URL**: `https://www.objetivomairinque.com.br`
- **Redirect URLs**: adicione
  - `https://www.objetivomairinque.com.br/**`
  - `https://objetivomairinque.com.br/**`

### 4) Ativar SSL no cPanel

cPanel -> **SSL/TLS Status** -> selecione os dominios -> **Run AutoSSL**.

### 5) Disparar o primeiro deploy

- Faca qualquer pequena alteracao no Lovable (ou clique em **Actions** no
  GitHub e rode o workflow **Deploy to cPanel** manualmente em **Run workflow**).
- Acompanhe a execucao na aba **Actions** do GitHub.
- Em 2-4 minutos o site estara no ar.

---

## Fluxo do dia a dia

1. Voce abre o Lovable e pede uma alteracao.
2. Lovable salva e commita no GitHub automaticamente.
3. GitHub Actions roda o workflow.
4. Site atualizado em `www.objetivomairinque.com.br`.

Em caso de erro, voce recebe um email do GitHub com link para os logs.

---

## Verificacoes pos-deploy

- [ ] `https://www.objetivomairinque.com.br` carrega a home.
- [ ] `https://www.objetivomairinque.com.br/contato` abre direto e tambem
      ao apertar F5 (testa o `.htaccess`).
- [ ] `https://objetivomairinque.com.br` (sem www) redireciona para `www.`.
- [ ] `http://...` redireciona para `https://...`.
- [ ] Formulario de contato envia mensagem (aparece no admin).
- [ ] Login funciona em `/login`.

---

## Troubleshooting

| Sintoma                                | Causa provavel                                  | Acao                                                                                       |
|----------------------------------------|--------------------------------------------------|--------------------------------------------------------------------------------------------|
| Action falha em "Deploy via FTP"       | Host/usuario/senha errados ou FTPS bloqueado    | Confira os secrets. Se necessario troque `protocol: ftps` por `protocol: ftp` no workflow. |
| Action falha em "Build (gera dist/)"   | Erro de codigo introduzido na ultima alteracao  | Abra os logs no GitHub. O preview do Lovable provavelmente ja indica o erro.               |
| 404 ao apertar F5 em rotas internas    | `.htaccess` nao subiu, ou mod_rewrite off       | Conferir `public_html/.htaccess` no File Manager (Show Hidden Files).                      |
| Tela branca                            | `.env.production` faltando ou chaves erradas    | Editar o workflow e re-rodar.                                                              |
| Login nao funciona                     | Redirect URLs nao atualizadas no backend         | Voltar ao passo 3 da configuracao inicial.                                                 |
| Deploy demora muito                    | FTP lento ou muitos arquivos                    | Normal: 2-4 min. Acima disso, ver logs.                                                    |

---

## Rodar build localmente (opcional)

So necessario se quiser testar antes de subir, ou fazer um upload manual de
emergencia (com o GitHub fora do ar, por exemplo):

```bash
# pre-requisitos: Node 20+, Bun (https://bun.sh)
node convert-to-spa.mjs
bun install
bun run build
# resultado: pasta dist/ pronta para o public_html
```

Apos rodar localmente, **desfaca a conversao** (`git checkout .`) antes de
commitar, caso contrario voce vai quebrar o preview do Lovable.

---

## Limitacoes

- **Convidar admin por email**: nao disponivel (sem service role no
  frontend). Para promover um admin, o usuario se cadastra em `/login` e
  outro admin o promove pelo painel **Usuarios**.
- **Preview de WhatsApp/Facebook**: mostra o titulo generico do `index.html`
  (sem SSR de metadata por rota). O Google indexa normalmente.
- **Latencia de deploy**: 2-4 minutos entre salvar no Lovable e ver no site.
