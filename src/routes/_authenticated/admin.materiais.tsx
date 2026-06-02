import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/_authenticated/admin/materiais")({
  component: () => (
    <CrudList
      collection="materials"
      title="Materiais"
      subtitle="Materiais didáticos por segmento."
      primaryField="title"
      secondaryField="segment_slug"
      fields={[
        { key: "segment_slug", label: "Segmento (slug)", type: "text", helper: "Ex: educacao-infantil" },
        { key: "title", label: "Título", type: "text", required: true },
        { key: "description", label: "Descrição", type: "textarea" },
        { key: "file_url", label: "Link / Arquivo", type: "text" },
      ]}
    />
  ),
});
