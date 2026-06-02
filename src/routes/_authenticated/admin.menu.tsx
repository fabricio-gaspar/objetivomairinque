import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/_authenticated/admin/menu")({
  component: () => (
    <CrudList
      collection="menu_items"
      title="Menu do site"
      subtitle="Itens do menu principal."
      primaryField="label"
      secondaryField="link"
      hasActive={false}
      fields={[
        { key: "label", label: "Rótulo", type: "text", required: true },
        { key: "link", label: "Link", type: "text", required: true, helper: "Ex: /sobre ou https://..." },
      ]}
    />
  ),
});
