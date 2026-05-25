import { MessageCircle } from "lucide-react";
import { wa } from "@/lib/site";

export function WhatsAppFloat({ message = "Olá! Gostaria de mais informações sobre o Colégio Objetivo Mairinque." }: { message?: string }) {
  return (
    <a
      href={wa(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[var(--whatsapp)] px-5 py-3.5 text-white shadow-elegant transition-all hover:scale-105 hover:shadow-2xl"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden text-sm font-semibold sm:inline">Fale conosco</span>
    </a>
  );
}
