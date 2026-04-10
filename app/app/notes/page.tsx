"use client";
import { useEffect, useState, useRef } from "react";
import { Check, Trash2, StickyNote } from "lucide-react";

const STORAGE_KEY = "msp-notes";

export default function NotesPage() {
  const [value, setValue] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setValue(raw);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue !== null) setValue(e.newValue);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

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
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [value, loaded]);

  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  const clear = () => {
    if (confirm("Clear all notes? This cannot be undone.")) setValue("");
  };

  return (
    <div className="space-y-6 h-[calc(100vh-5rem)] flex flex-col">
      <header className="shrink-0">
        <div className="section-marker">01 / PERSONAL</div>
        <div className="flex items-center justify-between gap-4 mt-2 flex-wrap">
          <h1 className="font-display text-5xl text-[var(--brand)] leading-[0.95] flex items-center gap-3">
            <StickyNote size={28} className="text-[var(--um-orange)]" />
            Notes<span className="text-[var(--um-orange)]">.</span>
          </h1>
          <div className="flex items-center gap-3">
            <span className={`text-xs flex items-center gap-1 transition-opacity ${saved ? "opacity-100 text-[var(--success)]" : "opacity-60 text-[var(--muted)]"}`}>
              <Check size={12} /> {saved ? "Saved" : "Auto-saving"}
            </span>
            <button
              onClick={clear}
              className="flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--card)] px-3 py-1.5 text-xs text-[var(--muted)] hover:text-[var(--danger)] hover:border-[var(--danger)] transition"
            >
              <Trash2 size={12} /> Clear
            </button>
          </div>
        </div>
        <p className="text-sm text-[var(--muted)] mt-2 max-w-2xl">
          A single shared notepad. Anything you write here also appears when you click the
          notes button on the top right of any page in the app.
        </p>
      </header>

      <div className="flex-1 min-h-0 bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--brand)] rounded-sm overflow-hidden flex flex-col">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Anything goes — running to-dos, names of people to follow up with, tricky cases, ideas, reminders…"
          className="flex-1 w-full resize-none p-6 text-sm leading-relaxed text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none bg-transparent font-sans"
        />
        <div className="shrink-0 border-t border-[var(--border)] px-6 py-2.5 text-[11px] text-[var(--muted)] tabular-nums flex items-center justify-between">
          <span>{wordCount} words · {charCount} characters</span>
          <span className="opacity-60">Saved locally to this browser</span>
        </div>
      </div>
    </div>
  );
}
