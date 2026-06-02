import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/_authenticated/admin/historia")({
  component: () => (
    <CrudList
      collection="history_events"
      title="História"
      subtitle="Eventos da trajetória do colégio (timeline)."
      primaryField="year"
      secondaryField="title"
      fields={[
        { key: "year", label: "Ano", type: "text", required: true },
        { key: "title", label: "Título", type: "text", required: true },
        { key: "description", label: "Descrição", type: "textarea" },
      ]}
    />
  ),
});
