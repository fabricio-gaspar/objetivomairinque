import { createFileRoute } from "@tanstack/react-router";
import { CrudList } from "@/components/admin/CrudList";

export const Route = createFileRoute("/_authenticated/admin/faqs")({
  component: () => (
    <CrudList
      collection="faqs"
      title="FAQs"
      subtitle="Perguntas e respostas frequentes."
      primaryField="question"
      secondaryField="category"
      fields={[
        { key: "question", label: "Pergunta", type: "text", required: true },
        { key: "answer", label: "Resposta", type: "textarea", required: true },
        { key: "category", label: "Categoria", type: "text" },
      ]}
    />
  ),
});
