import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSiteSettings, updateSiteSettings, type SiteSettings } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/configuracoes")({
  component: ConfigPage,
});

const fields: { key: keyof SiteSettings; label: string; textarea?: boolean }[] = [
  { key: "name", label: "Nome completo" },
  { key: "shortName", label: "Nome curto" },
  { key: "phone", label: "Telefone (exibição)" },
  { key: "phoneRaw", label: "Telefone (para tel:, ex. +5511993012285)" },
  { key: "whatsapp", label: "WhatsApp (só números com DDI, ex. 5511993012285)" },
  { key: "whatsappLabel", label: "WhatsApp (exibição)" },
  { key: "email", label: "E-mail" },
  { key: "address", label: "Endereço", textarea: true },
  { key: "portalUrl", label: "URL do Portal do Aluno" },
];

function ConfigPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["site-settings"], queryFn: () => getSiteSettings() });
  const [form, setForm] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (data) setForm(data); }, [data]);

  if (isLoading || !form) return <div className="text-sm text-muted-foreground">Carregando…</div>;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSiteSettings(form);
      toast.success("Configurações salvas.");
      qc.invalidateQueries({ queryKey: ["site-settings"] });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-primary">Configurações do site</h1>
      <p className="mt-1 text-sm text-muted-foreground">Edite os dados de contato exibidos no cabeçalho, rodapé e página de contatos.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl border bg-card p-6 shadow-soft">
        {fields.map((f) => (
          <div key={f.key} className="space-y-1.5">
            <Label htmlFor={f.key}>{f.label}</Label>
            {f.textarea ? (
              <Textarea id={f.key} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} rows={2} />
            ) : (
              <Input id={f.key} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
            )}
          </div>
        ))}
        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={saving}>{saving ? "Salvando…" : "Salvar alterações"}</Button>
        </div>
      </form>
    </div>
  );
}
