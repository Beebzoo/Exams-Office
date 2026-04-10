"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Command } from "lucide-react";
import { SEARCH_INDEX, type SearchResult } from "@/lib/search-index";

const SECTION_ICONS: Record<string, string> = {
  Procedures: "§",
  Glossary: "A",
  Regulations: "⚖",
  Templates: "✉",
  Reference: "◎",
  Checklist: "☐",
  TestVision: "▶",
};

export function CommandSearch() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Cmd+K / Ctrl+K toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opening
  useEffect(() => {
    if (open) {
      setQ("");
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Search
  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    const words = needle.split(/\s+/);
    const scored: { r: SearchResult; score: number }[] = [];
    for (const r of SEARCH_INDEX) {
      const haystack = (r.title + " " + r.subtitle + " " + r.text).toLowerCase();
      let score = 0;
      let allMatch = true;
      for (const w of words) {
        if (!haystack.includes(w)) { allMatch = false; break; }
        // Boost title matches
        if (r.title.toLowerCase().includes(w)) score += 10;
        else if (r.subtitle.toLowerCase().includes(w)) score += 5;
        else score += 1;
      }
      if (allMatch) scored.push({ r, score });
    }
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 12).map(s => s.r);
  }, [q]);

  // Keyboard nav
  const navigate = useCallback((r: SearchResult) => {
    setOpen(false);
    router.push(r.href);
  }, [router]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && results[activeIdx]) { navigate(results[activeIdx]); }
  }, [results, activeIdx, navigate]);

  // Scroll active into view
  useEffect(() => {
    const el = listRef.current?.children[activeIdx] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  if (!mounted) return null;

  const trigger = (
    <button
      onClick={() => setOpen(true)}
      className="fixed top-[70px] right-16 md:top-5 md:right-20 z-40 inline-flex h-10 md:h-11 items-center gap-2 rounded-xl bg-[var(--card)] text-[var(--muted)] shadow-[var(--shadow-md)] ring-1 ring-[var(--border)] hover:ring-[var(--brand)] hover:text-[var(--brand)] transition-all px-3 md:px-3.5 no-print text-xs"
    >
      <Search size={14} />
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden md:inline-flex items-center gap-0.5 rounded bg-[var(--um-gray-100)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--um-gray-500)]">
        <Command size={10} />K
      </kbd>
    </button>
  );

  const modal = open ? createPortal(
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-4 md:pt-[12vh] px-3 md:px-0 bg-black/40 backdrop-blur-sm animate-[fade-up_0.1s_ease]"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-xl bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--um-orange)] rounded-sm shadow-[var(--shadow-lg)] overflow-hidden flex flex-col max-h-[85vh] md:max-h-[70vh]"
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 border-b border-[var(--border)]">
          <Search size={16} className="text-[var(--muted)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={q}
            onChange={e => { setQ(e.target.value); setActiveIdx(0); }}
            onKeyDown={onKeyDown}
            placeholder="Search everything…"
            className="flex-1 py-4 bg-transparent text-sm text-[var(--brand)] placeholder:text-[var(--muted)] focus:outline-none"
          />
          <button onClick={() => setOpen(false)} className="text-[var(--muted)] hover:text-[var(--brand)]">
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} className="flex-1 overflow-y-auto">
          {q.trim() === "" && (
            <div className="p-6 text-center">
              <div className="text-sm text-[var(--muted)]">Type to search across procedures, glossary, regulations, templates, contacts, and more.</div>
              <div className="mt-3 flex justify-center gap-2 flex-wrap">
                {["SPAR", "grading deadline", "ANDIDRUK", "toilet visits", "TestVision", "fraud"].map(s => (
                  <button
                    key={s}
                    onClick={() => { setQ(s); setActiveIdx(0); }}
                    className="text-[10px] font-mono px-2 py-1 rounded-sm bg-[var(--um-gray-100)] text-[var(--um-gray-600)] hover:bg-[var(--brand-soft)] hover:text-[var(--brand)] transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {q.trim() !== "" && results.length === 0 && (
            <div className="p-6 text-center text-sm text-[var(--muted)]">No results for &ldquo;{q}&rdquo;</div>
          )}

          {results.map((r, i) => (
            <button
              key={r.id}
              onClick={() => navigate(r)}
              className={`w-full text-left flex items-start gap-3 px-4 py-3 transition-colors border-b border-[var(--border)] ${
                i === activeIdx ? "bg-[var(--brand-soft)]" : "hover:bg-[var(--um-gray-50)]"
              }`}
            >
              <span className="shrink-0 mt-0.5 w-6 h-6 inline-flex items-center justify-center rounded-sm bg-[var(--um-gray-100)] text-[var(--um-gray-600)] text-[11px]">
                {SECTION_ICONS[r.section] ?? "·"}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-[var(--brand)] font-medium truncate">{r.title}</div>
                <div className="text-[11px] text-[var(--muted)] truncate mt-0.5">{r.subtitle}</div>
              </div>
              <div className="shrink-0 self-center">
                <span className="label-caps !text-[9px] text-[var(--um-gray-400)]">{r.section}</span>
              </div>
              {i === activeIdx && (
                <ArrowRight size={12} className="shrink-0 self-center text-[var(--um-orange)]" />
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-[var(--border)] px-4 py-2 flex items-center justify-between text-[10px] text-[var(--muted)]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><kbd className="font-mono bg-[var(--um-gray-100)] px-1 rounded">↑↓</kbd> navigate</span>
            <span className="flex items-center gap-1"><kbd className="font-mono bg-[var(--um-gray-100)] px-1 rounded">↵</kbd> open</span>
            <span className="flex items-center gap-1"><kbd className="font-mono bg-[var(--um-gray-100)] px-1 rounded">esc</kbd> close</span>
          </div>
          <span className="tabular-nums">{results.length} results</span>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return <>{trigger}{modal}</>;
}
