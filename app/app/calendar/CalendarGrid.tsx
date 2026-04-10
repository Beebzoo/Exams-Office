"use client";
import { useMemo, useState } from "react";
import {
  format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval,
  startOfWeek, endOfWeek, isSameMonth, isSameDay, isWeekend,
} from "date-fns";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type SerializedDeadline = {
  dateISO: string;
  label: string;
  periodLabel: string;
  periodCode: string;
  kind: "exam-week" | "deadline" | "milestone" | "checklist";
};

const KIND_DOT: Record<string, string> = {
  "exam-week": "bg-[var(--brand)]",
  "deadline":  "bg-[var(--danger)]",
  "milestone": "bg-[var(--success)]",
  "checklist": "bg-[var(--warn)]",
};

const KIND_ORDER = ["exam-week", "deadline", "milestone", "checklist"] as const;

export function CalendarGrid({ deadlines }: { deadlines: SerializedDeadline[] }) {
  // Index deadlines by yyyy-MM-dd for fast lookup
  const byDay = useMemo(() => {
    const m = new Map<string, SerializedDeadline[]>();
    for (const d of deadlines) {
      const k = d.dateISO.slice(0, 10);
      if (!m.has(k)) m.set(k, []);
      m.get(k)!.push(d);
    }
    return m;
  }, [deadlines]);

  // Build sorted list of months that have any deadline
  const months = useMemo(() => {
    const set = new Set<string>();
    for (const d of deadlines) set.add(d.dateISO.slice(0, 7));
    return [...set].sort().map(k => parseISO(k + "-01"));
  }, [deadlines]);

  const [monthIndex, setMonthIndex] = useState(() => {
    const today = new Date();
    const idx = months.findIndex(m => m.getFullYear() === today.getFullYear() && m.getMonth() === today.getMonth());
    return idx >= 0 ? idx : 0;
  });
  const [selected, setSelected] = useState<string | null>(null);

  const month = months[monthIndex];
  const selectedItems = selected ? byDay.get(selected) ?? [] : [];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMonthIndex(i => Math.max(0, i - 1))}
            disabled={monthIndex === 0}
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-1.5 text-[var(--muted)] hover:text-[var(--brand)] hover:border-[var(--brand)] disabled:opacity-30 disabled:hover:border-[var(--border)] transition"
          >
            <ChevronLeft size={16} />
          </button>
          <h2 className="text-2xl font-semibold tracking-tight tabular-nums min-w-[12ch]">
            {format(month, "MMMM yyyy")}
          </h2>
          <button
            onClick={() => setMonthIndex(i => Math.min(months.length - 1, i + 1))}
            disabled={monthIndex === months.length - 1}
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-1.5 text-[var(--muted)] hover:text-[var(--brand)] hover:border-[var(--brand)] disabled:opacity-30 disabled:hover:border-[var(--border)] transition"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-[var(--muted)]">
          {Object.entries({ "exam-week": "Exam", "deadline": "Deadline", "milestone": "Milestone" }).map(([k, label]) => (
            <span key={k} className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${KIND_DOT[k]}`} /> {label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <MonthGrid month={month} byDay={byDay} selected={selected} onSelect={setSelected} />
        <DetailPanel
          dateISO={selected}
          items={selectedItems}
          onClose={() => setSelected(null)}
        />
      </div>
    </section>
  );
}

function MonthGrid({
  month, byDay, selected, onSelect,
}: {
  month: Date;
  byDay: Map<string, SerializedDeadline[]>;
  selected: string | null;
  onSelect: (k: string | null) => void;
}) {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });
  const today = new Date();

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[var(--shadow-sm)]">
      <div className="grid grid-cols-7 gap-1 mb-2 text-[10px] uppercase tracking-wider text-[var(--muted)] font-medium text-center">
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => <div key={d} className="py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => {
          const k = format(day, "yyyy-MM-dd");
          const inMonth = isSameMonth(day, month);
          const items = byDay.get(k) ?? [];
          const hasItems = items.length > 0;
          const isSelected = selected === k;
          const isToday = isSameDay(day, today);
          const weekend = isWeekend(day);
          const uniqueKinds = KIND_ORDER.filter(kind => items.some(i => i.kind === kind));

          return (
            <button
              key={k}
              disabled={!hasItems}
              onClick={() => onSelect(isSelected ? null : k)}
              className={`
                relative aspect-square rounded-lg text-sm tabular-nums transition-all overflow-hidden
                ${!inMonth ? "text-[var(--muted)]/40" : ""}
                ${weekend && inMonth && !hasItems ? "text-[var(--muted)]" : ""}
                ${hasItems
                  ? "cursor-pointer font-semibold text-[var(--brand)] hover:scale-[1.04] hover:shadow-[var(--shadow-md)] bg-gradient-to-b from-[#dbe3f7] to-[#e8ecf7] dark:from-[#1a2750] dark:to-[#14204a]"
                  : "cursor-default hover:bg-[var(--background)]"}
                ${isSelected
                  ? "ring-2 ring-[var(--brand)] shadow-[var(--shadow-md)]"
                  : hasItems
                    ? "ring-1 ring-[var(--brand)]/20"
                    : ""}
              `}
            >
              <span className="absolute top-2 left-0 right-0">{format(day, "d")}</span>
              {isToday && !hasItems && (
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-[var(--um-orange)]" />
              )}
              {hasItems && (
                <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-center gap-1">
                  {uniqueKinds.slice(0, 4).map(kind => (
                    <span key={kind} className={`h-1.5 w-3 rounded-full ${KIND_DOT[kind]}`} />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DetailPanel({
  dateISO, items, onClose,
}: {
  dateISO: string | null;
  items: SerializedDeadline[];
  onClose: () => void;
}) {
  if (!dateISO) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)]/50 p-6 text-sm text-[var(--muted)] flex items-center justify-center min-h-[200px] text-center">
        Click any highlighted day to see what&apos;s happening then.
      </div>
    );
  }
  const date = parseISO(dateISO);
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-md)] overflow-hidden sticky top-6">
      <div className="bg-gradient-to-br from-[var(--brand)] to-[#1e3a8a] text-white p-5 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-white/70 hover:text-white">
          <X size={16} />
        </button>
        <div className="text-[10px] uppercase tracking-[0.18em] text-white/60">{format(date, "EEEE")}</div>
        <div className="text-3xl font-semibold tabular-nums mt-1">{format(date, "d MMMM")}</div>
        <div className="text-xs text-white/70 mt-1">{format(date, "yyyy")}</div>
      </div>
      <div className="p-5 space-y-3">
        {items.map((item, i) => (
          <div key={i} className="text-sm">
            <div className="flex items-start gap-2">
              <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${KIND_DOT[item.kind]}`} />
              <div>
                <div className="font-medium leading-snug">{item.label}</div>
                <div className="text-xs text-[var(--muted)] mt-0.5">{item.periodLabel}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
