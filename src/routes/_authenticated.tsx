import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Settings, FileText, Image as ImageIcon, LogOut, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
});

type Status = "checking" | "ok" | "not-admin" | "anon";

function AuthenticatedLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [status, setStatus] = useState<Status>("checking");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!mounted) return;
      if (!user) {
        setStatus("anon");
        navigate({ to: "/login" });
        return;
      }
      setEmail(user.email ?? "");
      const { data: role } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!mounted) return;
      if (role) setStatus("ok");
      else setStatus("not-admin");
    };
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/login" });
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, [navigate]);

  const claimAdmin = async () => {
    const { data, error } = await supabase.rpc("claim_first_admin");
    if (error) return toast.error(error.message);
    if (data === true) {
      toast.success("Você agora é administrador.");
      setStatus("ok");
    } else {
      toast.error("Já existe um administrador. Peça acesso a ele.");
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  if (status === "checking" || status === "anon") {
    return <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Carregando…</div>;
  }

  if (status === "not-admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
        <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-soft">
          <h1 className="font-display text-xl font-bold text-primary">Acesso restrito</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sua conta ({email}) não é administradora.
          </p>
          <div className="mt-6 space-y-2">
            <Button onClick={claimAdmin} className="w-full">Tornar-se o primeiro administrador</Button>
            <Button variant="outline" onClick={logout} className="w-full">Sair</Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Só funciona se ainda não existir nenhum administrador no sistema.
          </p>
        </div>
      </div>
    );
  }

  const nav = [
    { to: "/admin", label: "Início", icon: LayoutDashboard, exact: true },
    { to: "/admin/configuracoes", label: "Configurações", icon: Settings },
    { to: "/admin/paginas", label: "Páginas", icon: FileText },
    { to: "/admin/midia", label: "Mídia", icon: ImageIcon },
  ] as const;

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="hidden w-64 shrink-0 border-r bg-card md:flex md:flex-col">
        <div className="border-b px-5 py-5">
          <div className="font-display text-lg font-bold text-primary">Painel</div>
          <div className="mt-0.5 truncate text-xs text-muted-foreground">{email}</div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            const Icon = n.icon;
            return (
              <Link key={n.to} to={n.to} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${active ? "bg-primary text-primary-foreground" : "text-foreground/80 hover:bg-muted"}`}>
                <Icon className="h-4 w-4" /> {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-3 space-y-1">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-muted">
            <ExternalLink className="h-4 w-4" /> Ver site
          </a>
          <button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-muted">
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-2 border-b bg-card px-4 py-3 md:hidden">
          <div className="font-display text-base font-bold text-primary">Painel</div>
          <div className="ml-auto flex gap-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="rounded px-2 py-1 text-xs hover:bg-muted">{n.label}</Link>
            ))}
            <button onClick={logout} className="rounded px-2 py-1 text-xs hover:bg-muted">Sair</button>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
