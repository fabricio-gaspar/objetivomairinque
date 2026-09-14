import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Login — Painel" }, { name: "robots", content: "noindex" }] }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    }).catch(() => undefined);
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/admin" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success(
          data.session
            ? "Conta criada. Você já pode entrar."
            : "Conta criada. Verifique seu e-mail antes de entrar.",
        );
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      const rawMessage = err instanceof Error ? err.message : "Não foi possível concluir a operação.";
      const normalizedMessage = rawMessage.toLowerCase();
      const message =
        normalizedMessage.includes("failed to fetch") ||
        normalizedMessage.includes("network") ||
        normalizedMessage.includes("dns") ||
        normalizedMessage.includes("host") ||
        normalizedMessage.includes("connect")
          ? "Não foi possível conectar ao serviço de autenticação. O Supabase deste site está indisponível."
          : rawMessage;
      setFormError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-soft">
        <h1 className="font-display text-2xl font-bold text-primary">Painel administrativo</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "signin" ? "Entre com seu e-mail e senha." : "Crie a conta do administrador."}
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "signin" ? "current-password" : "new-password"} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Aguarde…" : mode === "signin" ? "Entrar" : "Criar conta"}
          </Button>
        </form>
        {formError && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {formError}
          </p>
        )}

        <div className="mt-4 text-center text-sm text-muted-foreground">
          {mode === "signin" ? (
            <button onClick={() => setMode("signup")} className="hover:text-primary">Não tem conta? Cadastre-se</button>
          ) : (
            <button onClick={() => setMode("signin")} className="hover:text-primary">Já tem conta? Entrar</button>
          )}
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">← Voltar para o site</Link>
        </div>
      </div>
    </div>
  );
}
