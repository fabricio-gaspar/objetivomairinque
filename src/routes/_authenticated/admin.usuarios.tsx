import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listAdmins, grantAdminByEmail, revokeAdmin } from "@/lib/users.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/usuarios")({
  component: UsersPage,
});

function UsersPage() {
  const qc = useQueryClient();
  const fetchList = useServerFn(listAdmins);
  const grant = useServerFn(grantAdminByEmail);
  const revoke = useServerFn(revokeAdmin);
  const { data } = useQuery({ queryKey: ["admins"], queryFn: () => fetchList() });
  const [email, setEmail] = useState("");

  const add = async () => {
    if (!email.trim()) return;
    try { await grant({ data: { email: email.trim() } }); setEmail(""); toast.success("Admin adicionado."); qc.invalidateQueries({ queryKey: ["admins"] }); }
    catch (e) { toast.error((e as Error).message); }
  };
  const remove = async (id: string) => {
    if (!confirm("Remover este administrador?")) return;
    try { await revoke({ data: { userId: id } }); toast.success("Removido."); qc.invalidateQueries({ queryKey: ["admins"] }); }
    catch (e) { toast.error((e as Error).message); }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-primary">Usuários administradores</h1>
      <p className="mt-1 text-sm text-muted-foreground">O usuário precisa se cadastrar antes em /login. Depois adicione o e-mail aqui para promovê-lo a admin.</p>
      <div className="mt-6 flex gap-2">
        <Input placeholder="email@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={add}>Adicionar admin</Button>
      </div>
      <div className="mt-6 space-y-2">
        {(data ?? []).map((u) => (
          <div key={u.user_id} className="flex items-center justify-between rounded-xl border bg-card p-3 shadow-soft">
            <div>
              <div className="font-medium">{u.email}</div>
              <div className="text-xs text-muted-foreground">desde {new Date(u.created_at).toLocaleDateString("pt-BR")}</div>
            </div>
            <Button variant="outline" size="sm" onClick={() => remove(u.user_id)}><Trash2 className="h-3 w-3" /></Button>
          </div>
        ))}
      </div>
    </div>
  );
}
