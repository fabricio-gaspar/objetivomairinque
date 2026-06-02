import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/_authenticated/admin/diferenciais")({
  component: () => (
    <CrudList
      collection="differentials"
      title="Diferenciais"
      subtitle='Cards de "por que escolher o colégio".'
      primaryField="title"
      secondaryField="description"
      fields={[
        { key: "title", label: "Título", type: "text", required: true },
        { key: "description", label: "Descrição", type: "textarea" },
        { key: "icon", label: "Ícone", type: "icon" },
      ]}
    />
  ),
});
