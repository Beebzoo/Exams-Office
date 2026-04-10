"use client";
import { useEffect, useState, useRef } from "react";
import { StickyNote, Check } from "lucide-react";

export function PeriodNotes({ periodId, periodLabel }: { periodId: string; periodLabel: string }) {
  const storageKey = `msp-period-notes-${periodId}`;
  const [value, setValue] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) { setValue(raw); setExpanded(true); }
    } catch {}
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, value);
        setSaved(true);
        setTimeout(() => setSaved(false), 1200);
      } catch {}
    }, 300);
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [value, loaded, storageKey]);

  const lineCount = value.split("\n").length;
  const hasContent = value.trim().length > 0;

  return (
    <section>
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center justify-between gap-3 bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--brand)] hover:border-t-[var(--um-orange)] rounded-sm px-5 py-3.5 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <StickyNote size={14} className="text-[var(--um-orange)]" />
          <div>
            <div className="text-sm font-medium text-[var(--brand)]">
              Period notes
              {hasContent && <span className="ml-2 text-[10px] font-mono text-[var(--um-orange)]">{lineCount} {lineCount === 1 ? "line" : "lines"}</span>}
            </div>
            <div className="label-caps !text-[9px] mt-0.5">Private notes for {periodLabel}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-[10px] text-[var(--success)] flex items-center gap-1"><Check size={10} /> Saved</span>
          )}
          <span className="label-caps !text-[9px]">{expanded ? "collapse" : hasContent ? "expand" : "add notes"}</span>
        </div>
      </button>

      {expanded && (
        <div className="bg-[var(--card)] border border-t-0 border-[var(--border)] rounded-sm overflow-hidden">
          <textarea
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={`Notes for this period — e.g. "CC for BIO2006 hasn't responded", "Heather unavailable Wed", "Extra SPAR student added late"…`}
            rows={Math.max(4, Math.min(12, lineCount + 1))}
            className="w-full resize-y px-5 py-4 text-sm leading-relaxed text-[var(--brand)] placeholder:text-[var(--muted)] bg-transparent focus:outline-none"
          />
          <div className="border-t border-[var(--border)] px-5 py-2 flex items-center justify-between text-[10px] text-[var(--muted)]">
            <span>Saved locally · specific to {periodLabel}</span>
            {hasContent && (
              <button
                onClick={() => { if (confirm("Clear all notes for this period?")) setValue(""); }}
                className="hover:text-[var(--um-orange)] transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
