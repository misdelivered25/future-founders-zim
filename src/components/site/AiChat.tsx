import { useState, useRef, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { chatWithAssistant } from "@/lib/aiChat.functions";
import { Sparkles, Send, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

export function AiChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "Hey 👋 I'm the Future Founders assistant. Ask me about our programs, how to join, events or donations." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const send = useServerFn(chatWithAssistant);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [msgs, open]);

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    const next: Msg[] = [...msgs, { role: "user", content: text }];
    setMsgs(next);
    setBusy(true);
    try {
      const { reply } = await send({ data: { messages: next.slice(-10) } });
      setMsgs([...next, { role: "assistant", content: reply }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Sorry, I had trouble responding. Try again, or reach us via the contact page." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI assistant"
        className="fixed bottom-5 right-[5.5rem] sm:right-44 z-50 flex items-center gap-2 rounded-full bg-primary text-primary-foreground shadow-elegant px-4 py-3 hover:scale-105 transition-all"
      >
        {open ? <X className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
        <span className="hidden sm:inline text-sm font-semibold">{open ? "Close" : "Ask AI"}</span>
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-[380px] h-[520px] max-h-[80vh] bg-card border border-border rounded-2xl shadow-elegant flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-border bg-surface flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <div className="flex-1">
              <div className="font-display text-sm leading-none">Future Founders Assistant</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Powered by AI · not human</div>
            </div>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-surface text-foreground border border-border"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {busy && <div className="text-xs text-muted-foreground">Thinking…</div>}
          </div>
          <form onSubmit={onSend} className="border-t border-border p-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              maxLength={500}
              className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button type="submit" disabled={busy || !input.trim()} className="h-10 w-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
