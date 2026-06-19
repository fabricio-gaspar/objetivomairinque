import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { listMessages, setMessageRead, deleteMessage } from "@/lib/messages";
import { Button } from "@/components/ui/button";
import { Trash2, Mail, MailOpen } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/mensagens")({
  component: MessagesPage,
});

function MessagesPage() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["messages"], queryFn: () => listMessages() });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["messages"] });

  const toggle = async (id: string, read: boolean) => {
    try { await setMessageRead({ id, read }); invalidate(); } catch (e) { toast.error((e as Error).message); }
  };
  const remove = async (id: string) => {
    if (!confirm("Excluir esta mensagem?")) return;
    try { await deleteMessage({ id }); invalidate(); toast.success("Excluída."); } catch (e) { toast.error((e as Error).message); }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-primary">Mensagens</h1>
      <p className="mt-1 text-sm text-muted-foreground">Mensagens enviadas pelo formulário de contato.</p>
      <div className="mt-6 space-y-3">
        {(data ?? []).map((m) => (
          <div key={m.id} className={`rounded-xl border p-4 shadow-soft ${m.read ? "bg-card" : "bg-primary/5 border-primary/30"}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="font-medium">{m.name} <span className="text-xs text-muted-foreground">&lt;{m.email}&gt;</span></div>
                {m.phone && <div className="text-xs text-muted-foreground">{m.phone}</div>}
                {m.subject && <div className="mt-1 text-sm font-medium">{m.subject}</div>}
                <p className="mt-2 whitespace-pre-wrap text-sm">{m.message}</p>
                <div className="mt-2 text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString("pt-BR")}</div>
              </div>
              <div className="flex shrink-0 flex-col gap-1">
                <Button variant="outline" size="sm" onClick={() => toggle(m.id, !m.read)}>
                  {m.read ? <MailOpen className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
                </Button>
                <Button variant="outline" size="sm" onClick={() => remove(m.id)}><Trash2 className="h-3 w-3" /></Button>
              </div>
            </div>
          </div>
        ))}
        {data && data.length === 0 && <div className="text-sm text-muted-foreground">Nenhuma mensagem ainda.</div>}
      </div>
    </div>
  );
}
