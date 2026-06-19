#!/usr/bin/env node
/**
 * convert-to-spa.mjs
 *
 * Converte o projeto TanStack Start (SSR/Cloudflare Workers) em uma SPA
 * estática, pronta para hospedagem em cPanel.
 *
 * USO (na raiz do projeto baixado):
 *   node convert-to-spa.mjs
 *   bun install   (ou npm install)
 *   bun run build (ou npm run build)
 *
 * Depois: faça upload do conteúdo de dist/ para public_html do cPanel.
 *
 * O backend (Lovable Cloud / Supabase) continua o mesmo — só o frontend muda.
 */

import { existsSync, rmSync, writeFileSync, readFileSync, copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const p = (...s) => join(root, ...s);
const rm = (f) => existsSync(p(f)) && rmSync(p(f), { recursive: true, force: true });
const write = (f, c) => { mkdirSync(join(p(f), ".."), { recursive: true }); writeFileSync(p(f), c); };

console.log("→ Removendo arquivos SSR (Cloudflare Workers)...");
rm("src/server.ts");
rm("src/start.ts");
rm("wrangler.jsonc");
rm("src/lib/error-capture.ts");
rm("src/lib/error-page.ts");

console.log("→ Neutralizando middlewares/admin client server-only...");
write("src/integrations/supabase/auth-middleware.ts", `export const requireSupabaseAuth = {} as any;\n`);
write("src/integrations/supabase/auth-attacher.ts", `export const attachSupabaseAuth = {} as any;\n`);
write("src/integrations/supabase/client.server.ts", `export { supabase as supabaseAdmin } from "./client";\n`);

console.log("→ Corrigindo src/styles.css (Tailwind v4: remover source(none) para habilitar auto-scan)...");
if (existsSync(p("src/styles.css"))) {
  let css = readFileSync(p("src/styles.css"), "utf8");
  // Remove o modificador `source(none)` do @import "tailwindcss" para que o
  // plugin escaneie automaticamente os arquivos do projeto e gere as utilitárias.
  css = css.replace(/(@import\s+["']tailwindcss["'])\s+source\(none\)\s*;/g, "$1;");
  // Remove a diretiva @source manual (auto-scan cobre src/ a partir do CSS).
  css = css.replace(/^\s*@source\s+["'][^"']+["'];\s*\n/gm, "");
  writeFileSync(p("src/styles.css"), css);
}

console.log("→ Substituindo vite.config.ts por Vite + React puro...");
write("vite.config.ts", `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite({ routesDirectory: "src/routes", generatedRouteTree: "src/routeTree.gen.ts" }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@tanstack/react-start": path.resolve(__dirname, "./src/shims/react-start.ts"),
      "@/integrations/supabase/client.server": path.resolve(__dirname, "./src/shims/supabase-admin.ts"),
      "@/integrations/supabase/auth-middleware": path.resolve(__dirname, "./src/shims/auth-middleware.ts"),
      "@/integrations/supabase/auth-attacher": path.resolve(__dirname, "./src/shims/auth-attacher.ts"),
    },
  },
  build: { outDir: "dist", sourcemap: false },
});
`);

console.log("→ Criando index.html...");
write("index.html", `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Colégio Objetivo Mairinque — Educação de excelência</title>
    <meta name="description" content="Colégio Objetivo Mairinque: Educação Infantil, Fundamental I e II em Mairinque-SP. Tradição, autoridade pedagógica e formação integral." />
    <link rel="canonical" href="https://www.objetivomairinque.com.br/" />
    <meta property="og:site_name" content="Colégio Objetivo Mairinque" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`);

console.log("→ Criando src/main.tsx...");
write("src/main.tsx", `import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import "./styles.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, retry: 1 } },
});

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register { router: typeof router }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
`);

console.log("→ Criando shims (compatibilidade com createServerFn no client)...");
write("src/shims/react-start.ts", `// Shim client-side para @tanstack/react-start.
// Faz createServerFn rodar diretamente no navegador, usando o client supabase
// com auth via localStorage. RLS no banco controla o acesso.
import { supabase } from "@/integrations/supabase/client";

type Handler = (args: { data: any; context: any }) => any;

async function buildContext() {
  const { data } = await supabase.auth.getUser();
  return { userId: data.user?.id ?? null, supabase };
}

export function createServerFn(_opts?: any) {
  let validator: (d: any) => any = (d) => d;
  const builder: any = {
    middleware() { return builder; },
    inputValidator(fn: (d: any) => any) { validator = fn; return builder; },
    handler(fn: Handler) {
      const wrapped = async (arg?: { data?: any }) => {
        const data = arg && "data" in arg ? validator(arg.data) : undefined;
        const context = await buildContext();
        return fn({ data, context });
      };
      return wrapped;
    },
  };
  return builder;
}

export const useServerFn = <T extends (...a: any[]) => any>(fn: T): T => fn;

export const createMiddleware = () => ({ server: (_fn: any) => ({}) });
export const createStart = (_fn?: any) => ({});
`);

write("src/shims/supabase-admin.ts", `// No client não temos service role. Reaproveitamos o client público.
// Operações que exigem service role (auth.admin.*) NÃO funcionarão —
// veja src/lib/users.functions.ts (patched).
export { supabase as supabaseAdmin } from "@/integrations/supabase/client";
`);

write("src/shims/auth-middleware.ts", `export const requireSupabaseAuth = {} as any;
`);

write("src/shims/auth-attacher.ts", `export const attachSupabaseAuth = {} as any;
`);

console.log("→ Patchando users.functions.ts (admin user mgmt sem service role)...");
write("src/lib/users.functions.ts", `import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

// NOTA: client-side não tem service role. Sem auth.admin.listUsers / getUserById,
// só conseguimos listar user_ids. Para convidar usuários, peça que se cadastrem
// em /login; depois o admin promove pelo UUID.

export const listAdmins = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("user_id, created_at")
      .eq("role", "admin")
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []).map((r: any) => ({ user_id: r.user_id, email: "(não disponível em modo cPanel)", created_at: r.created_at }));
  });

export const grantAdminByEmail = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ email: z.string().trim().min(1) }).parse(d))
  .handler(async ({ data }) => {
    // Em modo cPanel não temos como buscar user por email no client.
    // Aceita o UUID do usuário no campo "email" como fallback.
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data.email);
    if (!isUuid) {
      throw new Error("Em modo cPanel, informe o UUID do usuário (não o e-mail). Peça para o usuário se cadastrar em /login e copie o user_id no painel de Usuários do backend.");
    }
    const { error } = await supabase.from("user_roles").insert({ user_id: data.email, role: "admin" });
    if (error && !error.message.includes("duplicate")) throw new Error(error.message);
    return { ok: true, user_id: data.email };
  });

export const revokeAdmin = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ userId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    if (data.userId === context.userId) throw new Error("Você não pode remover a si mesmo.");
    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", data.userId)
      .eq("role", "admin");
    if (error) throw new Error(error.message);
    return { ok: true };
  });
`);

console.log("→ Patchando __root.tsx (removendo SSR shell)...");
const rootPath = "src/routes/__root.tsx";
if (existsSync(p(rootPath))) {
  let s = readFileSync(p(rootPath), "utf8");
  s = s.replace(/,?\s*HeadContent,?/g, ",").replace(/,?\s*Scripts,?/g, ",");
  s = s.replace(/,\s*,/g, ",").replace(/{\s*,/g, "{").replace(/,\s*}/g, "}");
  s = s.replace(/import appCss[^\n]*\n/, "");
  s = s.replace(/links:\s*\[[^\]]*\],?/g, "");
  s = s.replace(/shellComponent:\s*RootShell,?/g, "");
  s = s.replace(/function RootShell[\s\S]*?^}\n/m, "");
  write(rootPath, s);
}

console.log("→ Patchando _authenticated.tsx (removendo head() server-only se houver)...");
// _authenticated geralmente é só guard; nada a remover obrigatoriamente.

console.log("→ Removendo src/router.tsx se existir (substituído por main.tsx)...");
rm("src/router.tsx");

console.log("→ Ajustando package.json (removendo deps SSR, adicionando React SWC)...");
const pkgPath = p("package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
delete pkg.dependencies?.["@tanstack/react-start"];
delete pkg.dependencies?.["@cloudflare/vite-plugin"];
delete pkg.dependencies?.["wrangler"];
delete pkg.devDependencies?.["@lovable.dev/vite-tanstack-config"];
delete pkg.devDependencies?.["@cloudflare/vite-plugin"];
delete pkg.devDependencies?.["wrangler"];
pkg.devDependencies = pkg.devDependencies || {};
pkg.devDependencies["@vitejs/plugin-react-swc"] = pkg.devDependencies["@vitejs/plugin-react-swc"] || "^3.7.2";
pkg.devDependencies["@tanstack/router-vite-plugin"] = pkg.devDependencies["@tanstack/router-vite-plugin"] || "^1.95.0";
pkg.devDependencies["@tailwindcss/vite"] = pkg.devDependencies["@tailwindcss/vite"] || "^4.0.0";
pkg.devDependencies["tailwindcss"] = pkg.devDependencies["tailwindcss"] || "^4.0.0";
pkg.scripts = pkg.scripts || {};
pkg.scripts.dev = "vite";
pkg.scripts.build = "vite build";
pkg.scripts.preview = "vite preview";
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

console.log("→ Criando .env.production...");
write(".env.production", `VITE_SUPABASE_URL=https://vhwhugcwrsltqlrlssyg.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZod2h1Z2N3cnNsdHFscmxzc3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNTAxODgsImV4cCI6MjA5NTgyNjE4OH0.kOsrd1_t-jzcV67M3d_fNga9OfQyvk7hMJkfUfoYd_c
VITE_SUPABASE_PROJECT_ID=vhwhugcwrsltqlrlssyg
`);

console.log("\n✓ Conversão concluída.");
console.log("\nPróximos passos:");
console.log("  1) bun install     (ou npm install)");
console.log("  2) bun run build   (ou npm run build)");
console.log("  3) Faça upload do CONTEÚDO de dist/ para public_html no cPanel.");
console.log("  4) Garanta que public/.htaccess foi para dist/ (Vite copia automaticamente).");
console.log("");
