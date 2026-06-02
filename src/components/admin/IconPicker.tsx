import * as Icons from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COMMON_ICONS = [
  "Award","BookOpen","Sparkles","Building2","Users","HandHeart","Star","Heart","Trophy",
  "GraduationCap","School","Laptop","FlaskConical","Palette","Music","Globe","Languages",
  "Calendar","Clock","MapPin","Phone","Mail","MessageCircle","Shield","CheckCircle2",
  "Target","Lightbulb","Rocket","Brain","Smile","Activity","Map","Library","PencilRuler",
];

export function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const Current = (Icons[value as keyof typeof Icons] as React.ComponentType<{ className?: string }> | undefined) ?? Icons.Star;
  return (
    <div className="flex items-center gap-2">
      <Select value={value || "Star"} onValueChange={onChange}>
        <SelectTrigger className="w-full"><SelectValue placeholder="Ícone" /></SelectTrigger>
        <SelectContent className="max-h-80">
          {COMMON_ICONS.map((n) => {
            const I = Icons[n as keyof typeof Icons] as React.ComponentType<{ className?: string }>;
            return (
              <SelectItem key={n} value={n}>
                <span className="inline-flex items-center gap-2"><I className="h-4 w-4" /> {n}</span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-muted">
        <Current className="h-4 w-4" />
      </div>
    </div>
  );
}

export function renderIcon(name: string, className = "h-5 w-5") {
  const I = (Icons[name as keyof typeof Icons] as React.ComponentType<{ className?: string }> | undefined) ?? Icons.Star;
  return <I className={className} />;
}
