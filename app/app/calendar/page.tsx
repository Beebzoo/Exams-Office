import { allDeadlines, currentPeriod, fmt } from "@/lib/dates";
import { format, differenceInCalendarDays } from "date-fns";
import { CalendarGrid, type SerializedDeadline } from "./CalendarGrid";

const COLORS: Record<string, string> = {
  "exam-week": "bg-[var(--brand-soft)] text-[var(--brand)]",
  "deadline":  "bg-[var(--um-orange)]/10 text-[var(--um-orange)]",
  "milestone": "bg-emerald-50 text-emerald-700",
  "checklist": "bg-amber-50 text-amber-700",
};

export default function CalendarPage() {
  const deadlines = allDeadlines();
  const today = new Date();
  const period = currentPeriod(today);
  const periodStart = period.periodStart ? new Date(period.periodStart) : new Date(period.examWeek.start);
  const periodEnd = new Date(period.examWeek.end);
  const totalDays = differenceInCalendarDays(periodEnd, periodStart);
  const elapsed = Math.max(0, Math.min(totalDays, differenceInCalendarDays(today, periodStart)));
  const pct = totalDays > 0 ? (elapsed / totalDays) * 100 : 0;
  // Group by month
  const groups = new Map<string, typeof deadlines>();
  for (const d of deadlines) {
    const k = format(d.date, "yyyy-MM");
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k)!.push(d);
  }

  return (
    <div className="stagger space-y-10">
      <header>
        <div className="section-marker">01 / PLANNING</div>
        <h1 className="font-display text-5xl text-[var(--brand)] mt-2 leading-[0.95]">
          Calendar<span className="text-[var(--um-orange)]">.</span>
        </h1>
        <p className="text-sm text-[var(--muted)] mt-3 max-w-2xl">All exam-period deadlines for AY 2025–26 and 2026–27.</p>
      </header>

      {/* Currently in */}
      <section className="bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--brand)] rounded-sm p-5">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <div>
            <div className="section-marker">02 / CURRENTLY IN</div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="inline-flex items-center justify-center rounded bg-[var(--brand)] text-white px-2 py-0.5 text-[11px] font-semibold tracking-wider">{period.code}</span>
              <span className="font-display text-2xl text-[var(--brand)] leading-tight">{period.label}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-display text-base text-[var(--brand)] tabular-nums">{fmt(periodStart, "d MMM")} → {fmt(periodEnd, "d MMM yyyy")}</div>
            <div className="label-caps mt-1 tabular-nums">Day {elapsed + 1} of {totalDays + 1}</div>
          </div>
        </div>
        <div className="mt-4 h-[3px] bg-[var(--um-gray-200)] overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[var(--um-light-blue)] via-[var(--um-dark-blue)] to-[var(--um-orange)]" style={{ width: `${pct}%` }} />
        </div>
      </section>

      <CalendarGrid deadlines={deadlines.map<SerializedDeadline>(d => ({
        dateISO: format(d.date, "yyyy-MM-dd"),
        label: d.label,
        periodLabel: d.period.label,
        periodCode: d.period.code,
        kind: d.kind,
      }))} />

      {/* Full chronological list */}
      <section>
        <div className="border-b-2 border-[var(--brand)] pb-3 mb-5">
          <div className="section-marker">03 / CHRONICLE</div>
          <h2 className="font-display text-3xl text-[var(--brand)] mt-1 leading-tight">
            All deadlines<span className="text-[var(--um-orange)]">.</span>
          </h2>
          <p className="text-xs text-[var(--muted)] mt-1.5 font-display-italic">Full chronological list.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries({ "exam-week": "Exam week", "deadline": "Deadline", "milestone": "Milestone" }).map(([k, label]) => (
            <span key={k} className={`px-2.5 py-1 rounded-sm font-semibold uppercase tracking-wider text-[10px] ${COLORS[k]}`}>{label}</span>
          ))}
        </div>

        <div className="space-y-8">
          {[...groups.entries()].map(([month, items]) => (
            <div key={month}>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 md:col-span-3">
                  <div className="md:sticky md:top-6">
                    <div className="section-marker">{format(items[0].date, "yyyy")}</div>
                    <h3 className="font-display text-2xl text-[var(--brand)] leading-tight mt-1">
                      {format(items[0].date, "MMMM")}<span className="text-[var(--um-orange)]">.</span>
                    </h3>
                    <div className="label-caps mt-1.5 tabular-nums">{items.length} {items.length === 1 ? "entry" : "entries"}</div>
                  </div>
                </div>
                <ul className="col-span-12 md:col-span-9 md:border-l md:border-[var(--border)] md:pl-6">
                  {items.map((d, i) => (
                    <li key={i} className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-3.5 border-b border-dotted border-[var(--um-gray-300)] hover:bg-[var(--um-gray-50)] transition-colors px-2 -mx-2">
                      <div className="text-center min-w-[3rem]">
                        <div className="label-caps !text-[9px]">{format(d.date, "EEE")}</div>
                        <div className="font-display text-2xl text-[var(--brand)] tabular-nums leading-none mt-0.5">{format(d.date, "d")}</div>
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm text-[var(--brand)] leading-snug">{d.label}</div>
                        <div className="label-caps mt-1 !text-[9px]">{d.period.label}</div>
                      </div>
                      <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-semibold shrink-0 ${COLORS[d.kind]}`}>{d.kind.replace("-", " ")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
