import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/_authenticated/admin/segmentos")({
  component: () => (
    <CrudList
      collection="segments"
      title="Segmentos"
      subtitle="Níveis de ensino exibidos na home e nas páginas internas."
      primaryField="name"
      secondaryField="age_range"
      fields={[
        { key: "slug", label: "Slug", type: "text", required: true, helper: "Usado na URL. Ex: educacao-infantil" },
        { key: "name", label: "Nome", type: "text", required: true },
        { key: "short_description", label: "Descrição curta", type: "textarea" },
        { key: "long_description", label: "Descrição longa (página interna)", type: "textarea" },
        { key: "age_range", label: "Faixa etária", type: "text" },
        { key: "image_url", label: "Imagem", type: "image" },
        { key: "color", label: "Cor", type: "color" },
        { key: "link", label: "Link", type: "text", helper: "Ex: /educacao-infantil" },
      ]}
    />
  ),
});
