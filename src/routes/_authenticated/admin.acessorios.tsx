import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/_authenticated/admin/acessorios")({
  component: () => (
    <CrudList
      collection="accessories"
      title="Acessórios"
      subtitle="Itens/recursos extras exibidos na home."
      primaryField="title"
      secondaryField="description"
      fields={[
        { key: "title", label: "Título", type: "text", required: true },
        { key: "description", label: "Descrição", type: "textarea" },
        { key: "icon", label: "Ícone", type: "icon" },
        { key: "image_url", label: "Imagem (opcional)", type: "image" },
      ]}
    />
  ),
});
