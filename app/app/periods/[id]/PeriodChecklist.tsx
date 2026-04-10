"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { format, parseISO, differenceInCalendarDays } from "date-fns";
import { TermText } from "@/components/TermText";
import { Check } from "lucide-react";

type Item = {
  id: string;
  task: string;
  whenLabel: string;
  dateISO: string;        // yyyy-MM-dd (timezone-safe)
  procedureRef?: string;
  category: string;
  weeksBefore?: number;
  daysBefore?: number;
};

const CAT_COLORS: Record<string, string> = {
  schedule:  "bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900",
  data:      "bg-purple-50 text-purple-700 ring-1 ring-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:ring-purple-900",
  comms:     "bg-pink-50 text-pink-700 ring-1 ring-pink-200 dark:bg-pink-950/40 dark:text-pink-300 dark:ring-pink-900",
  logistics: "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900",
  exams:     "bg-red-50 text-red-700 ring-1 ring-red-200 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-900",
  grading:   "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900",
  resit:     "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:ring-indigo-900",
};

type Phase = { id: string; marker: string; label: string; tagline: string; match: (i: Item) => boolean };

const PHASES: Phase[] = [
  {
    id: "setup", marker: "04", label: "Setup", tagline: "Ten weeks out — schedule, inform, request",
    match: i => (i.weeksBefore ?? 0) >= 4,
  },
  {
    id: "countdown", marker: "05", label: "Countdown", tagline: "Two weeks out — check, print, prepare",
    match: i => (i.weeksBefore ?? 0) < 4 && (i.weeksBefore ?? 0) >= 1 || (i.daysBefore ?? 0) > 0,
  },
  {
    id: "exam-week", marker: "06", label: "Exam week", tagline: "On the ground — daily logistics, monitoring",
    match: i => i.weeksBefore === 0 && i.daysBefore == null,
  },
  {
    id: "post", marker: "07", label: "After", tagline: "Closing, grading, publishing",
    match: i => (i.weeksBefore ?? 0) < 0 && (i.weeksBefore ?? 0) > -5,
  },
  {
    id: "resit", marker: "08", label: "Resit", tagline: "The next exam cycle, opened",
    match: i => (i.weeksBefore ?? 0) <= -5,
  },
];

function bucketize(items: Item[]): { phase: Phase; items: Item[] }[] {
  return PHASES.map(phase => ({ phase, items: items.filter(phase.match) })).filter(b => b.items.length > 0);
}

export function PeriodChecklist({ periodId, items }: { periodId: string; items: Item[] }) {
  const storageKey = `msp-checklist-${periodId}`;
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const [hideDone, setHideDone] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setDone(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (loaded) localStorage.setItem(storageKey, JSON.stringify(done));
  }, [done, loaded, storageKey]);

  const today = new Date();
  const total = items.length;
  const completed = Object.values(done).filter(Boolean).length;
  const pct = total > 0 ? (completed / total) * 100 : 0;
  const buckets = useMemo(() => bucketize(items), [items]);

  return (
    <section>
      {/* Section header */}
      <div className="border-b-2 border-[var(--brand)] pb-3">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div className="section-marker">04 / WORKFLOW</div>
            <h2 className="font-display text-3xl text-[var(--brand)] mt-1 leading-tight">
              The checklist<span className="text-[var(--um-orange)]">.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setHideDone(h => !h)}
              className="label-caps hover:text-[var(--um-orange)] transition-colors"
            >
              {hideDone ? "Show completed" : "Hide completed"}
            </button>
            <div className="text-right">
              <div className="font-display text-2xl text-[var(--brand)] tabular-nums leading-none">
                {completed}<span className="text-[var(--um-gray-400)]">/{total}</span>
              </div>
              <div className="label-caps mt-0.5 !text-[9px]">tasks complete</div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-[3px] w-full bg-[var(--um-gray-200)] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--um-light-blue)] via-[var(--um-dark-blue)] to-[var(--um-orange)] transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Phase groups */}
      <div className="mt-8 space-y-10">
        {buckets.map(({ phase, items: phaseItems }, phaseIdx) => {
          const visibleItems = hideDone ? phaseItems.filter(i => !done[i.id]) : phaseItems;
          if (visibleItems.length === 0) return null;
          const phaseDone = phaseItems.filter(i => done[i.id]).length;
          const phasePct = (phaseDone / phaseItems.length) * 100;

          return (
            <div key={phase.id} className="grid grid-cols-12 gap-6">
              {/* Phase label column */}
              <div className="col-span-12 md:col-span-3">
                <div className="md:sticky md:top-6">
                  <div className="section-marker">{phase.marker} / PHASE {String(phaseIdx + 1).padStart(2, "0")}</div>
                  <h3 className="font-display text-2xl text-[var(--brand)] mt-1 leading-tight">
                    {phase.label}<span className="text-[var(--um-orange)]">.</span>
                  </h3>
                  <p className="mt-1.5 text-xs text-[var(--muted)] font-display-italic">{phase.tagline}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-[2px] bg-[var(--um-gray-200)] overflow-hidden">
                      <div className="h-full bg-[var(--um-orange)]" style={{ width: `${phasePct}%` }} />
                    </div>
                    <span className="label-caps tabular-nums !text-[9px]">{phaseDone}/{phaseItems.length}</span>
                  </div>
                </div>
              </div>

              {/* Items column */}
              <ul className="col-span-12 md:col-span-9 md:border-l md:border-[var(--border)] md:pl-6 space-y-0">
                {visibleItems.map((item) => {
                  const date = parseISO(item.dateISO);
                  const days = differenceInCalendarDays(date, today);
                  const isDone = !!done[item.id];
                  const overdue = !isDone && days < 0;

                  return (
                    <li
                      key={item.id}
                      className={`group relative grid grid-cols-[auto_1fr_auto] items-start gap-4 py-4 border-b border-dotted border-[var(--um-gray-300)] transition-all ${
                        isDone ? "opacity-50" : ""
                      } ${overdue ? "bg-[var(--um-orange)]/5 px-3 -mx-3" : ""}`}
                    >
                      {/* Custom checkbox */}
                      <button
                        onClick={() => setDone(s => ({ ...s, [item.id]: !s[item.id] }))}
                        className={`shrink-0 mt-0.5 h-5 w-5 rounded-sm border-2 transition-all flex items-center justify-center ${
                          isDone
                            ? "bg-[var(--brand)] border-[var(--brand)] text-white"
                            : "border-[var(--um-gray-300)] hover:border-[var(--brand)] hover:bg-[var(--brand-soft)]"
                        }`}
                        aria-label={isDone ? "Mark as not done" : "Mark as done"}
                      >
                        {isDone && <Check size={12} strokeWidth={3} />}
                      </button>

                      {/* Task body */}
                      <div className="min-w-0">
                        <div className={`text-sm leading-snug ${isDone ? "line-through text-[var(--muted)]" : "text-[var(--brand)]"}`}>
                          <TermText>{item.task}</TermText>
                        </div>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px]">
                          <span className="label-caps !text-[10px]">{item.whenLabel}</span>
                          <span className="text-[var(--um-gray-400)]">·</span>
                          <span className="font-display tabular-nums text-[var(--brand)]">{format(date, "EEE d MMM")}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider ${CAT_COLORS[item.category] ?? ""}`}>
                            {item.category}
                          </span>
                          {item.procedureRef && (
                            <Link
                              href={`/procedures#${item.procedureRef}`}
                              className="font-mono text-[10px] text-[var(--um-orange)] hover:underline"
                            >
                              §{item.procedureRef}
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Days badge */}
                      <div className="shrink-0 text-right">
                        <div className={`font-display text-lg tabular-nums leading-none ${
                          isDone ? "text-[var(--um-gray-400)]" :
                          overdue ? "text-[var(--um-orange)]" :
                          days === 0 ? "text-[var(--brand)]" : "text-[var(--brand)]"
                        }`}>
                          {isDone ? "✓" : overdue ? `−${-days}` : days === 0 ? "·" : days}
                        </div>
                        <div className="label-caps mt-0.5 !text-[8px]">
                          {isDone ? "done" : overdue ? "days late" : days === 0 ? "today" : days === 1 ? "day" : "days"}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
