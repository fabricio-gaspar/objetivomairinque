import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleton, updateSingleton } from "@/lib/collections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImagePicker } from "@/components/admin/ImagePicker";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/big-counter")({
  component: BigCounterPage,
});

type BC = { title: string; number_value: string; caption: string; background_url: string; active: boolean };

function BigCounterPage() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["singleton", "big_counter"], queryFn: () => getSingleton("big_counter") });
  const [f, setF] = useState<BC>({ title: "", number_value: "0", caption: "", background_url: "", active: true });

  useEffect(() => { if (data) setF(data as unknown as BC); }, [data]);

  const onSave = async () => {
    try {
      await updateSingleton({ name: "big_counter", values: f as unknown as Record<string, unknown> });
      toast.success("Salvo.");
      qc.invalidateQueries({ queryKey: ["singleton", "big_counter"] });
    } catch (e) { toast.error((e as Error).message); }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-primary">Big Counter</h1>
      <p className="mt-1 text-sm text-muted-foreground">Bloco grande com número de destaque.</p>
      <div className="mt-6 space-y-4 rounded-2xl border bg-card p-6 shadow-soft">
        <div><Label>Título</Label><Input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></div>
        <div><Label>Número</Label><Input value={f.number_value} onChange={(e) => setF({ ...f, number_value: e.target.value })} /></div>
        <div><Label>Legenda</Label><Textarea value={f.caption} onChange={(e) => setF({ ...f, caption: e.target.value })} /></div>
        <div><Label>Imagem de fundo</Label><ImagePicker value={f.background_url} onChange={(v) => setF({ ...f, background_url: v })} /></div>
        <div className="flex items-center justify-between rounded-lg border p-3">
          <Label>Ativo</Label>
          <Switch checked={f.active} onCheckedChange={(v) => setF({ ...f, active: v })} />
        </div>
        <Button onClick={onSave}>Salvar</Button>
      </div>
    </div>
  );
}
