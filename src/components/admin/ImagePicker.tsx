import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listMedia } from "@/lib/media.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Image as ImageIcon, X } from "lucide-react";

export function ImagePicker({ value, onChange, label = "Imagem" }: { value: string; onChange: (url: string) => void; label?: string }) {
  const fetchList = useServerFn(listMedia);
  const { data } = useQuery({ queryKey: ["media"], queryFn: () => fetchList() });
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="URL da imagem" />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="sm"><ImageIcon className="mr-1 h-3 w-3" />Biblioteca</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader><DialogTitle>Selecionar {label.toLowerCase()}</DialogTitle></DialogHeader>
            <div className="grid max-h-[60vh] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3 md:grid-cols-4">
              {data?.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => { onChange(m.url); setOpen(false); }}
                  className="overflow-hidden rounded-lg border bg-card text-left transition-all hover:border-primary"
                >
                  {m.mime_type?.startsWith("image/") ? (
                    <img src={m.url} alt={m.name} className="aspect-video w-full object-cover" />
                  ) : (
                    <div className="aspect-video grid place-items-center text-xs">{m.mime_type}</div>
                  )}
                  <div className="truncate p-1.5 text-[11px]">{m.name}</div>
                </button>
              ))}
              {!data?.length && <div className="col-span-full text-sm text-muted-foreground">Nenhuma imagem. Envie em "Mídia".</div>}
            </div>
          </DialogContent>
        </Dialog>
        {value && (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}><X className="h-3 w-3" /></Button>
        )}
      </div>
      {value && <img src={value} alt="" className="h-24 rounded-md border object-cover" />}
    </div>
  );
}
