## Causa raiz (confirmada)

O site **está** sendo publicado no cPanel com CSS e JS — o deploy FTP funciona. O problema é diferente: o **CSS chega cru, sem compilação do Tailwind v4**.

Verifiquei o CSS publicado em `https://objetivomairinque.com.br/assets/index-CtlNWbGX.css` e ele começa com:

```css
@media source(none){@layer theme,base,components,utilities;}@media source(none){@layer theme{@theme default{...
```

`@media source(none)` é uma diretiva interna do **Tailwind v4 não processado**. O navegador não conhece esse media-type, ignora todas as regras dentro, e a página renderiza **sem nenhum estilo** (branca/preta com texto cru). É exatamente o sintoma que você descreveu.

## Por que acontece

O `convert-to-spa.mjs` (executado pelo GitHub Actions antes do build) **reescreve `vite.config.ts`** para um Vite puro com apenas:

```ts
plugins: [TanStackRouterVite({...}), react()]
```

**Falta o plugin `@tailwindcss/vite`**. Sem ele, o `@import "tailwindcss"` em `src/styles.css` não é compilado — o CSS sai com as diretivas internas do Tailwind v4 intactas, e o browser as ignora.

(Esse problema é exclusivo do build SPA do cPanel. O preview do Lovable funciona porque usa a config original que tem o plugin embutido.)

## Correção

Editar **apenas** `convert-to-spa.mjs`:

1. No bloco que reescreve `vite.config.ts` (linhas 46-67), adicionar o import e o plugin:
   ```ts
   import tailwindcss from "@tailwindcss/vite";
   // ...
   plugins: [
     TanStackRouterVite({...}),
     react(),
     tailwindcss(),
   ]
   ```

2. No bloco que ajusta `package.json` (linhas 235-251), garantir que `@tailwindcss/vite` esteja em `devDependencies` (na versão `^4.0.0`) para o `bun install` baixar antes do build.

Nenhuma alteração em código de aplicação, rotas, componentes, workflow ou secrets — o workflow do GitHub Actions e o deploy FTP continuam exatamente como estão.

## Verificação após o próximo push

1. O GitHub Actions roda `convert-to-spa.mjs` → `bun install` → `bun run build`.
2. O novo CSS em `dist/assets/index-*.css` **não terá** mais `@media source(none)` — começará com regras CSS normais (`*,::before{...}`, `.flex{...}`, etc.).
3. Subir o site no navegador (Ctrl+F5) deve mostrar o layout completo com cores, fontes e componentes.
4. Se ainda houver problema, eu inspeciono os assets publicados e os logs do Action.
