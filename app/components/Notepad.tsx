"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { StickyNote, X, Maximize2, Check } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "msp-notes";

export function Notepad() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setValue(raw);
    } catch {}
    setLoaded(true);
  }, []);

  // Sync changes from other tabs/pages (storage event)
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue !== null) setValue(e.newValue);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  // Debounced save with a "Saved" indicator flash
  useEffect(() => {
    if (!loaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, value);
        setSaved(true);
        setTimeout(() => setSaved(false), 1200);
      } catch {}
    }, 300);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [value, loaded]);

  // Close on Escape
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);
  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, handleEscape]);

  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <>
      {/* Floating button (top right of every page) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open notes"
        title="Notes"
        className="fixed top-[70px] right-4 md:top-5 md:right-5 z-40 inline-flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-xl bg-[var(--card)] text-[var(--brand)] shadow-[var(--shadow-md)] ring-1 ring-[var(--border)] hover:ring-[var(--brand)] hover:scale-105 transition-all no-print"
      >
        <StickyNote size={18} strokeWidth={2.2} />
        {value.trim().length > 0 && (
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[var(--cta)] ring-2 ring-[var(--background)]" />
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm no-print animate-[fade-up_0.15s_ease]"
        />
      )}

      {/* Slide-out panel */}
      <aside
        className={`fixed top-0 right-0 z-50 h-screen w-full md:max-w-[480px] bg-[var(--card)] shadow-[var(--shadow-lg)] border-l border-[var(--border)] no-print
                    transition-transform duration-300 ease-out flex flex-col
                    ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="relative shrink-0 bg-gradient-to-br from-[var(--um-darker-blue)] via-[var(--um-dark-blue)] to-[#02325a] text-white p-5">
          <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_2px_2px,white_1.5px,transparent_0)] [background-size:24px_24px]" />
          <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-[var(--um-light-blue)]/20 blur-3xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/60">
                <StickyNote size={12} /> Notes
              </div>
              <div className="mt-1 text-2xl font-semibold tracking-tight">Quick notepad</div>
              <div className="mt-1 text-xs text-white/70">
                Saves automatically · stays put across page reloads
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link
                href="/notes"
                onClick={() => setOpen(false)}
                title="Open full page"
                className="rounded-lg p-2 text-white/70 hover:text-white hover:bg-white/10 transition"
              >
                <Maximize2 size={16} />
              </Link>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-lg p-2 text-white/70 hover:text-white hover:bg-white/10 transition"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Textarea */}
        <div className="flex-1 p-5 flex flex-col min-h-0">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Jot anything down — to-dos, things to remember, follow-ups, the name of the CC who never replies…"
            className="flex-1 w-full resize-none rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-sm leading-relaxed text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--brand)] focus:ring-4 focus:ring-[var(--brand-soft)] transition font-sans"
          />
          <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--muted)]">
            <div className="tabular-nums">{wordCount} words · {charCount} chars</div>
            <div className={`flex items-center gap-1 transition-opacity ${saved ? "opacity-100 text-[var(--success)]" : "opacity-50"}`}>
              <Check size={12} /> {saved ? "Saved" : "Auto-saving"}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
