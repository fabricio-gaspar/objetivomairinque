import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/_authenticated/admin/hero-slides")({
  component: () => (
    <CrudList
      collection="hero_slides"
      title="Hero Slides"
      subtitle="Slides exibidos no topo da home."
      primaryField="title"
      secondaryField="subtitle"
      fields={[
        { key: "title", label: "Título", type: "text", required: true },
        { key: "subtitle", label: "Subtítulo", type: "text" },
        { key: "image_url", label: "Imagem de fundo", type: "image" },
        { key: "cta_label", label: "Texto do botão", type: "text" },
        { key: "cta_link", label: "Link do botão", type: "text" },
      ]}
    />
  ),
});
