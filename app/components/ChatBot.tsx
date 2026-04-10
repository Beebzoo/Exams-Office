"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { MessageCircle, X, Send, Loader2, Bot, User, Sparkles } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What do I do 2 weeks before exam week?",
  "How do toilet visits work during exams?",
  "What is SPAR and how do I handle it?",
  "What happens if a student commits fraud?",
  "How do I set up a TestVision session?",
  "When is the CC grading deadline?",
];

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");

    const updated: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(updated);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setIsFallback(data.fallback ?? false);
      setMessages([...updated, { role: "assistant", content: data.content }]);
    } catch {
      setMessages([...updated, { role: "assistant", content: "Sorry, something went wrong. Try again." }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  if (!mounted) return null;

  const trigger = (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--um-dark-blue)] text-white shadow-[var(--shadow-lg)] hover:scale-105 transition-all no-print"
      aria-label="Open assistant"
    >
      <MessageCircle size={22} />
      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[var(--um-orange)] ring-2 ring-[var(--background)]" />
    </button>
  );

  const panel = open ? createPortal(
    <>
      {/* Backdrop on mobile */}
      <div onClick={() => setOpen(false)} className="md:hidden fixed inset-0 z-[90] bg-black/30" />

      <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-[91] w-full md:w-[420px] h-full md:h-[600px] md:max-h-[80vh] flex flex-col bg-[var(--card)] md:border md:border-[var(--border)] md:border-t-2 md:border-t-[var(--um-orange)] md:rounded-sm shadow-[var(--shadow-lg)] overflow-hidden">
        {/* Header */}
        <div className="shrink-0 relative bg-gradient-to-br from-[var(--um-darker-blue)] via-[var(--um-dark-blue)] to-[#02325a] text-white px-5 py-4">
          <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_2px_2px,white_1.5px,transparent_0)] [background-size:24px_24px]" />
          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[var(--um-light-blue)]/15 blur-2xl" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-sm bg-white/10 flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div>
                <div className="font-display text-lg leading-none">
                  Assistant<span className="text-[var(--um-orange)]">.</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/50 mt-1">
                  {isFallback ? "search mode" : "powered by claude"}
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white p-1">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 h-7 w-7 rounded-sm bg-[var(--brand-soft)] flex items-center justify-center">
                  <Sparkles size={14} className="text-[var(--um-orange)]" />
                </div>
                <div className="text-sm text-[var(--brand)] leading-relaxed">
                  <p className="font-display text-base">Hi! I know the entire MSP exam coordination manual.</p>
                  <p className="mt-2 text-[var(--muted)]">Ask me anything about procedures, deadlines, regulations, TestVision, SPAR, grading — whatever you need.</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="label-caps !text-[9px]">Try asking</div>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="block w-full text-left text-xs text-[var(--brand)] bg-[var(--um-gray-50)] hover:bg-[var(--brand-soft)] px-3 py-2 rounded-sm transition-colors border border-[var(--border)]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex items-start gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`shrink-0 h-7 w-7 rounded-sm flex items-center justify-center ${
                m.role === "user"
                  ? "bg-[var(--um-orange)]/10 text-[var(--um-orange)]"
                  : "bg-[var(--brand-soft)] text-[var(--brand)]"
              }`}>
                {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-[var(--um-dark-blue)] text-white rounded-sm rounded-tr-none px-3.5 py-2.5"
                  : "text-[var(--brand)]"
              }`}>
                {m.content.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                  part.startsWith("**") && part.endsWith("**")
                    ? <strong key={j}>{part.slice(2, -2)}</strong>
                    : <span key={j}>{part}</span>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="shrink-0 h-7 w-7 rounded-sm bg-[var(--brand-soft)] flex items-center justify-center text-[var(--brand)]">
                <Bot size={14} />
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <Loader2 size={14} className="animate-spin" /> Thinking…
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="shrink-0 border-t border-[var(--border)] px-4 py-3">
          <form
            onSubmit={e => { e.preventDefault(); send(); }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about exam coordination…"
              className="flex-1 bg-[var(--background)] border border-[var(--border)] rounded-sm px-3 py-2 text-sm text-[var(--brand)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--um-orange)] transition-colors"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="btn-cta h-9 w-9 rounded-sm flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={14} />
            </button>
          </form>
          <div className="mt-2 text-[9px] text-[var(--muted)] text-center">
            Answers are based on the MSP operations manual. Always verify critical decisions.
          </div>
        </div>
      </div>
    </>,
    document.body
  ) : null;

  return <>{trigger}{panel}</>;
}
