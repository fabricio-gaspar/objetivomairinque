import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/_authenticated/admin/estatisticas")({
  component: () => (
    <CrudList
      collection="stats"
      title="Estatísticas"
      subtitle="Números exibidos na seção de realizações."
      primaryField="label"
      secondaryField="value"
      fields={[
        { key: "label", label: "Rótulo (ex: Alunos formados)", type: "text", required: true },
        { key: "value", label: "Valor (ex: 5.000)", type: "text", required: true },
        { key: "suffix", label: "Sufixo (ex: + ou %)", type: "text" },
      ]}
    />
  ),
});
