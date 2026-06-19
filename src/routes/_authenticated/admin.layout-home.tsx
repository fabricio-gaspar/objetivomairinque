import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleton, updateSingleton } from "@/lib/collections";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/layout-home")({
  component: LayoutHomePage,
});

const ALL_SECTIONS: { key: string; label: string }[] = [
  { key: "hero", label: "Hero (Slides)" },
  { key: "segments", label: "Segmentos" },
  { key: "differentials", label: "Diferenciais" },
  { key: "stats", label: "Estatísticas" },
  { key: "big_counter", label: "Big Counter" },
  { key: "accessories", label: "Acessórios" },
  { key: "history", label: "História" },
  { key: "faqs", label: "FAQs" },
  { key: "cta", label: "CTA Matrículas" },
];

function LayoutHomePage() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["singleton", "home_layout"], queryFn: () => getSingleton("home_layout") });
  const [order, setOrder] = useState<string[]>([]);

  useEffect(() => { if (data) setOrder(((data as { sections?: string[] }).sections) ?? []); }, [data]);

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[i], next[j]] = [next[j], next[i]];
    setOrder(next);
  };
  const toggle = (k: string) => setOrder(order.includes(k) ? order.filter((x) => x !== k) : [...order, k]);

  const onSave = async () => {
    try {
      await updateSingleton({ name: "home_layout", values: { sections: order } });
      toast.success("Layout salvo.");
      qc.invalidateQueries({ queryKey: ["singleton", "home_layout"] });
    } catch (e) { toast.error((e as Error).message); }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-primary">Layout da Home</h1>
      <p className="mt-1 text-sm text-muted-foreground">Reordene e mostre/esconda seções da home.</p>
      <div className="mt-6 space-y-2">
        {order.map((k, i) => {
          const def = ALL_SECTIONS.find((s) => s.key === k);
          return (
            <div key={k} className="flex items-center gap-3 rounded-xl border bg-card p-3 shadow-soft">
              <div className="flex flex-col">
                <button onClick={() => move(i, -1)} disabled={i === 0} className="rounded p-0.5 hover:bg-muted disabled:opacity-30"><ArrowUp className="h-3 w-3" /></button>
                <button onClick={() => move(i, 1)} disabled={i === order.length - 1} className="rounded p-0.5 hover:bg-muted disabled:opacity-30"><ArrowDown className="h-3 w-3" /></button>
              </div>
              <div className="flex-1 font-medium">{def?.label ?? k}</div>
              <button onClick={() => toggle(k)} className="rounded p-1.5 hover:bg-muted"><Eye className="h-4 w-4 text-primary" /></button>
            </div>
          );
        })}
        <div className="mt-4 text-xs font-semibold uppercase text-muted-foreground">Disponíveis (clique para adicionar)</div>
        <div className="flex flex-wrap gap-2">
          {ALL_SECTIONS.filter((s) => !order.includes(s.key)).map((s) => (
            <button key={s.key} onClick={() => toggle(s.key)} className="flex items-center gap-1 rounded-lg border bg-card px-3 py-1.5 text-sm hover:bg-muted">
              <EyeOff className="h-3 w-3" /> {s.label}
            </button>
          ))}
        </div>
      </div>
      <Button className="mt-6" onClick={onSave}>Salvar ordem</Button>
    </div>
  );
}
