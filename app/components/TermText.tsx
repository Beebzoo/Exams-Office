"use client";
import { useState, useEffect, useCallback, Fragment } from "react";
import { createPortal } from "react-dom";
import { GLOSSARY_REGEX, GLOSSARY_INDEX, GLOSSARY_CATEGORIES, type GlossaryTerm } from "@/lib/glossary";
import { X, BookOpen } from "lucide-react";

/**
 * Renders a string and turns any known glossary term into a clickable chip
 * that opens an explanation modal. Use anywhere you want passive onboarding.
 */
export function TermText({ children, className }: { children: string; className?: string }) {
  const [active, setActive] = useState<GlossaryTerm | null>(null);

  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  // The regex is global; we re-use a fresh exec loop.
  const re = new RegExp(GLOSSARY_REGEX.source, GLOSSARY_REGEX.flags);
  let m: RegExpExecArray | null;
  while ((m = re.exec(children)) !== null) {
    const start = m.index;
    const matched = m[0];
    const term = GLOSSARY_INDEX.get(matched.toLowerCase());
    if (!term) continue;
    if (start > lastIdx) parts.push(children.slice(lastIdx, start));
    parts.push(
      <button
        key={`${term.id}-${start}`}
        type="button"
        onClick={() => setActive(term)}
        className="inline cursor-pointer underline decoration-dotted decoration-[var(--brand)]/50 underline-offset-2 hover:decoration-[var(--brand)] hover:bg-[var(--brand-soft)] rounded px-0.5 transition-colors text-[var(--brand)] font-medium"
      >
        {matched}
      </button>
    );
    lastIdx = start + matched.length;
  }
  if (lastIdx < children.length) parts.push(children.slice(lastIdx));

  return (
    <>
      <span className={className}>
        {parts.map((p, i) => <Fragment key={i}>{p}</Fragment>)}
      </span>
      <TermModal term={active} onClose={() => setActive(null)} />
    </>
  );
}

export function TermModal({ term, onClose }: { term: GlossaryTerm | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (!term) return;
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [term, handleEscape]);

  if (!term || !mounted) return null;

  const modal = (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-[fade-up_0.15s_ease]"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[var(--card)] shadow-[var(--shadow-lg)] overflow-hidden border border-[var(--border)] border-t-2 border-t-[var(--um-orange)] rounded-sm"
      >
        <div className="relative bg-gradient-to-br from-[var(--um-darker-blue)] via-[var(--um-dark-blue)] to-[#02325a] text-white p-6">
          <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_2px_2px,white_1.5px,transparent_0)] [background-size:24px_24px]" />
          <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-[var(--um-light-blue)]/20 blur-3xl" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
            aria-label="Close"
          >
            <X size={18} />
          </button>
          <div className="relative">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/60 font-semibold">
              <BookOpen size={12} /> {GLOSSARY_CATEGORIES[term.category]}
            </div>
            <h2 className="mt-2 font-display text-3xl tracking-tight leading-[0.95]">
              {term.term}<span className="text-[var(--um-orange)]">.</span>
            </h2>
            {term.aliases && term.aliases.length > 0 && (
              <div className="mt-2 text-xs text-white/60 font-display-italic">
                also: {term.aliases.join(" · ")}
              </div>
            )}
          </div>
        </div>
        <div className="p-6 space-y-3">
          <div className="text-sm font-medium text-[var(--brand)]">{term.short}</div>
          <p className="text-sm text-[var(--muted)] leading-relaxed">{term.long}</p>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
