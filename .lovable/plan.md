## Diagnóstico

O build está **100% funcional** — gera `dist/` com CSS (39.75 kB) e JS (1.44 MB) corretamente. O problema é exclusivamente na etapa de FTP:

```
FTPError: 530 Login authentication failed
```

Isso significa que o servidor `server.ssd1br.com.br:21` **respondeu** (não é firewall/SFTP), mas **rejeitou usuário+senha**. Conexão OK, credencial NÃO.

## Causa mais provável

A senha cadastrada (`0Rpr)rUnoj&K;De`) tem caracteres problemáticos: `)`, `&`, `;`. Quando você copiou do cPanel para o GitHub Secrets, é muito comum:
- Um espaço invisível no início ou fim
- O `;` ter sido truncado em algum campo
- Algum caractere ter sido reinterpretado por copy/paste do navegador

Outra possibilidade: alguns servidores cPanel exigem formato alternativo de usuário (ex: `deploy.objetivomairinqu` sem o `@dominio`).

## O que fazer (nenhuma mudança de código necessária)

### Passo 1 — Resetar a senha FTP no cPanel (recomendado)
1. No cPanel → **FTP Accounts**
2. Localize `deploy@objetivomairinque.com.br` → **Change Password**
3. Gere uma senha **só com letras e números** (ex: 20 chars alfanuméricos, sem símbolos)
4. Copie e salve essa senha em local seguro

### Passo 2 — Atualizar o secret no GitHub
1. GitHub → repositório → **Settings → Secrets and variables → Actions**
2. Clique em `FTP_PASSWORD` → **Update secret**
3. Cole a nova senha alfanumérica (cuidado: sem espaço no início/fim)
4. Salvar

### Passo 3 — Re-disparar o workflow
1. GitHub → **Actions → Deploy to cPanel → Run workflow**
2. Aguardar ~2 min

### Passo 4 — Se ainda der 530, testar formato alternativo de usuário
No cPanel → FTP Accounts → ao lado da conta, clique em **Configure FTP Client**. Lá aparece o username exato que o servidor espera. Pode ser:
- `deploy@objetivomairinque.com.br` (o que você usou)
- `deploy+objetivomairinque.com.br` (formato alternativo de alguns provedores)
- Apenas o prefixo curto da conta cPanel principal

Atualize o secret `FTP_USERNAME` com o valor exato mostrado em "Configure FTP Client" e re-rode o workflow.

## Por que NÃO é problema de arquitetura

O log prova que tudo antes do FTP funcionou: `convert-to-spa`, `bun install`, `vite build`, sanity check do `dist/`, bloqueio de SSR — todos passaram ✅. Trocar a stack para a da APACE não resolveria esse erro, porque o FTP rejeitaria a senha do mesmo jeito.

## O que eu farei depois que você confirmar que o deploy passou

- Adicionar um aviso no workflow para mascarar melhor erros de credencial
- (Opcional) Adicionar code-splitting para reduzir o aviso de chunk >500 kB que apareceu no build — puramente cosmético, não bloqueia nada

**Sem alterações de código nesta etapa.** Você só precisa resetar a senha no cPanel e atualizar o secret no GitHub.
