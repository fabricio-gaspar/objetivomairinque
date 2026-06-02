import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/_authenticated/admin/rodape")({
  component: () => (
    <div className="space-y-10">
      <CrudList
        collection="footer_columns"
        title="Rodapé — Colunas"
        subtitle="Crie as colunas do rodapé. Depois adicione os links abaixo associando o ID da coluna."
        primaryField="title"
        hasActive={false}
        fields={[{ key: "title", label: "Título da coluna", type: "text", required: true }]}
      />
      <CrudList
        collection="footer_links"
        title="Rodapé — Links"
        subtitle="Links de cada coluna. Cole o ID da coluna no campo correspondente."
        primaryField="label"
        secondaryField="link"
        hasActive={false}
        fields={[
          { key: "column_id", label: "ID da coluna", type: "text", required: true, helper: "Copie do item da lista acima" },
          { key: "label", label: "Rótulo", type: "text", required: true },
          { key: "link", label: "Link", type: "text", required: true },
        ]}
      />
    </div>
  ),
});
