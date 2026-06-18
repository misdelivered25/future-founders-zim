import { MessageCircle } from "lucide-react";

export const WHATSAPP_NUMBER = "263717428535"; // +263 71 742 8535
const MSG = encodeURIComponent("Hi Future Founders! I'd like to learn more.");

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Future Founders on WhatsApp"
      className="fixed bottom-5 right-5 z-50 group flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#22c55e] text-white shadow-elegant px-4 py-3 transition-all hover:scale-105"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline text-sm font-semibold pr-1">WhatsApp</span>
    </a>
  );
}
