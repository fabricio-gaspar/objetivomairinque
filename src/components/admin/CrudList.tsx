import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listCollection,
  createCollectionItem,
  updateCollectionItem,
  deleteCollectionItem,
  reorderCollection,
  type Collection,
} from "@/lib/collections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ImagePicker } from "./ImagePicker";
import { IconPicker } from "./IconPicker";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Eye, EyeOff } from "lucide-react";

export type FieldType = "text" | "textarea" | "image" | "icon" | "color" | "url" | "select";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  helper?: string;
};

type Props = {
  collection: Collection;
  title: string;
  subtitle?: string;
  fields: FieldDef[];
  primaryField?: string;
  secondaryField?: string;
  hasActive?: boolean;
};

type Row = Record<string, unknown> & { id: string; position?: number; active?: boolean };

export function CrudList({ collection, title, subtitle, fields, primaryField = "title", secondaryField, hasActive = true }: Props) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["collection", collection],
    queryFn: () => listCollection({ collection }),
  });

  const [editing, setEditing] = useState<Row | null>(null);
  const [open, setOpen] = useState(false);

  const invalidate = () => qc.invalidateQueries({ queryKey: ["collection", collection] });

  const openNew = () => {
    const blank: Row = { id: "" };
    fields.forEach((f) => (blank[f.key] = ""));
    if (hasActive) blank.active = true;
    blank.position = data?.length ?? 0;
    setEditing(blank);
    setOpen(true);
  };

  const openEdit = (row: Row) => { setEditing({ ...row }); setOpen(true); };

  const save = async () => {
    if (!editing) return;
    try {
      const values: Record<string, unknown> = {};
      fields.forEach((f) => { values[f.key] = editing[f.key] ?? ""; });
      if (hasActive) values.active = editing.active ?? true;
      if (!editing.id) {
        values.position = editing.position ?? 0;
        await createCollectionItem({ collection, values });
        toast.success("Item criado.");
      } else {
        await updateCollectionItem({ collection, id: editing.id, values });
        toast.success("Item atualizado.");
      }
      setOpen(false);
      invalidate();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const del = async (id: string) => {
    if (!confirm("Excluir este item?")) return;
    try {
      await deleteCollectionItem({ collection, id });
      toast.success("Item excluído.");
      invalidate();
    } catch (err) { toast.error((err as Error).message); }
  };

  const move = async (id: string, dir: -1 | 1) => {
    const list = (data ?? []) as Row[];
    const i = list.findIndex((r) => r.id === id);
    if (i < 0) return;
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const reordered = [...list];
    [reordered[i], reordered[j]] = [reordered[j], reordered[i]];
    try {
      await reorderCollection({ collection, ids: reordered.map((r) => r.id) });
      invalidate();
    } catch (err) { toast.error((err as Error).message); }
  };

  const toggleActive = async (row: Row) => {
    try {
      await updateCollectionItem({ collection, id: row.id, values: { active: !row.active } });
      invalidate();
    } catch (err) { toast.error((err as Error).message); }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <Button onClick={openNew}><Plus className="mr-2 h-4 w-4" />Novo</Button>
      </div>

      <div className="mt-6 space-y-2">
        {isLoading && <div className="text-sm text-muted-foreground">Carregando…</div>}
        {!isLoading && (data?.length ?? 0) === 0 && (
          <div className="rounded-lg border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
            Nenhum item ainda. Clique em "Novo" para criar.
          </div>
        )}
        {(data as Row[] | undefined)?.map((row, i, arr) => (
          <div key={row.id} className="flex items-center gap-3 rounded-xl border bg-card p-3 shadow-soft">
            <div className="flex flex-col gap-0.5">
              <button onClick={() => move(row.id, -1)} disabled={i === 0} className="rounded p-0.5 hover:bg-muted disabled:opacity-30"><ArrowUp className="h-3 w-3" /></button>
              <button onClick={() => move(row.id, 1)} disabled={i === arr.length - 1} className="rounded p-0.5 hover:bg-muted disabled:opacity-30"><ArrowDown className="h-3 w-3" /></button>
            </div>
            {("image_url" in row && typeof row.image_url === "string" && row.image_url) ? (
              <img src={row.image_url as string} alt="" className="h-12 w-12 rounded object-cover" />
            ) : null}
            <div className="flex-1 min-w-0">
              <div className="truncate font-medium">{String(row[primaryField] ?? "")}</div>
              {secondaryField && <div className="truncate text-xs text-muted-foreground">{String(row[secondaryField] ?? "")}</div>}
            </div>
            {hasActive && (
              <button onClick={() => toggleActive(row)} className="rounded p-1.5 hover:bg-muted" title={row.active ? "Desativar" : "Ativar"}>
                {row.active ? <Eye className="h-4 w-4 text-primary" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
              </button>
            )}
            <Button variant="outline" size="sm" onClick={() => openEdit(row)}><Pencil className="h-3 w-3" /></Button>
            <Button variant="outline" size="sm" onClick={() => del(row.id)}><Trash2 className="h-3 w-3" /></Button>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing?.id ? "Editar" : "Novo"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              {fields.map((f) => (
                <div key={f.key} className="space-y-1.5">
                  <Label>{f.label}{f.required && <span className="text-destructive"> *</span>}</Label>
                  {f.type === "textarea" ? (
                    <Textarea rows={4} value={String(editing[f.key] ?? "")} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} />
                  ) : f.type === "image" ? (
                    <ImagePicker value={String(editing[f.key] ?? "")} onChange={(v) => setEditing({ ...editing, [f.key]: v })} />
                  ) : f.type === "icon" ? (
                    <IconPicker value={String(editing[f.key] ?? "Star")} onChange={(v) => setEditing({ ...editing, [f.key]: v })} />
                  ) : f.type === "color" ? (
                    <Input type="color" value={String(editing[f.key] ?? "#1e40af")} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} />
                  ) : f.type === "select" ? (
                    <select className="h-9 w-full rounded-md border bg-background px-2 text-sm" value={String(editing[f.key] ?? "")} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}>
                      <option value="">—</option>
                      {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  ) : (
                    <Input value={String(editing[f.key] ?? "")} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} />
                  )}
                  {f.helper && <p className="text-xs text-muted-foreground">{f.helper}</p>}
                </div>
              ))}
              {hasActive && (
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <Label htmlFor="active">Ativo (visível no site)</Label>
                  <Switch id="active" checked={Boolean(editing.active)} onCheckedChange={(v) => setEditing({ ...editing, active: v })} />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={save}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
