"use client";
import { useMemo } from "react";
import { differenceInCalendarDays, parseISO, format } from "date-fns";

type Milestone = {
  label: string;
  shortLabel: string;
  date: Date;
  kind: "start" | "deadline" | "comms" | "logistics" | "exam";
};

const KIND_COLOR: Record<string, { dot: string; line: string; text: string }> = {
  start:     { dot: "bg-[var(--um-light-blue)]", line: "bg-[var(--um-light-blue)]", text: "text-[var(--um-light-blue)]" },
  deadline:  { dot: "bg-[var(--um-orange)]",     line: "bg-[var(--um-orange)]",     text: "text-[var(--um-orange)]" },
  comms:     { dot: "bg-purple-500",             line: "bg-purple-500",             text: "text-purple-600" },
  logistics: { dot: "bg-[var(--brand)]",         line: "bg-[var(--brand)]",         text: "text-[var(--brand)]" },
  exam:      { dot: "bg-[var(--um-orange)]",     line: "bg-[var(--um-orange)]",     text: "text-[var(--um-orange)]" },
};

type Props = {
  periodStart?: string;
  sscRequestDeadline?: string;
  invigilatorRequestBy: string;
  examSubmissionDeadline: string;
  printingOrder?: string;
  toetsoverzichtToAnja?: string;
  chaseInvigilatorNames?: string;
  examsDelivered?: string;
  firstCartCollected?: string;
  examWeekStart: string;
  examWeekEnd: string;
};

export function CountdownTimeline(props: Props) {
  const today = new Date();

  const milestones = useMemo(() => {
    const m: Milestone[] = [];
    const push = (label: string, shortLabel: string, dateStr: string | undefined, kind: Milestone["kind"]) => {
      if (!dateStr) return;
      m.push({ label, shortLabel, date: parseISO(dateStr), kind });
    };
    push("Period start",       "Start",     props.periodStart,            "start");
    push("SSC request",        "SSC",       props.sscRequestDeadline,     "deadline");
    push("Invigilator request","Invig.",     props.invigilatorRequestBy,   "deadline");
    push("Exam submission",    "Exams due",  props.examSubmissionDeadline, "deadline");
    push("Printing order",     "Print",     props.printingOrder,          "logistics");
    push("Toetsoverzicht + block arrangements to Anja", "→ Anja", props.toetsoverzichtToAnja, "comms");
    push("Chase invigilator names from Anja", "Names?", props.chaseInvigilatorNames, "comms");
    push("Delivered to PHS",   "Delivered",  props.examsDelivered,         "logistics");
    push("Cart collected",     "Cart",      props.firstCartCollected,     "logistics");
    push("Exam week starts",   "Exam →",    props.examWeekStart,          "exam");
    push("Exam week ends",     "← End",     props.examWeekEnd,            "exam");
    return m.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [props]);

  if (milestones.length < 2) return null;

  const first = milestones[0].date;
  const last = milestones[milestones.length - 1].date;
  const totalSpan = Math.max(1, differenceInCalendarDays(last, first));

  const pct = (d: Date) => Math.max(0, Math.min(100, (differenceInCalendarDays(d, first) / totalSpan) * 100));
  const todayPct = pct(today);
  const todayInRange = todayPct >= 0 && todayPct <= 100;

  return (
    <section className="bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--brand)] rounded-sm p-5 overflow-hidden">
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <div className="section-marker">02 / COUNTDOWN</div>
          <h2 className="font-display text-xl text-[var(--brand)] mt-1 leading-tight">
            Road to exam week<span className="text-[var(--um-orange)]">.</span>
          </h2>
        </div>
        <div className="label-caps tabular-nums">
          {format(first, "d MMM")} → {format(last, "d MMM yyyy")}
        </div>
      </div>

      {/* Timeline bar */}
      <div className="relative h-24">
        {/* Background track */}
        <div className="absolute top-8 left-0 right-0 h-[3px] bg-[var(--um-gray-200)]" />

        {/* Filled portion up to today */}
        {todayInRange && (
          <div
            className="absolute top-8 left-0 h-[3px] bg-gradient-to-r from-[var(--um-light-blue)] to-[var(--um-orange)]"
            style={{ width: `${todayPct}%` }}
          />
        )}

        {/* Today marker */}
        {todayInRange && (
          <div className="absolute top-0" style={{ left: `${todayPct}%`, transform: "translateX(-50%)" }}>
            <div className="flex flex-col items-center">
              <div className="text-[9px] font-semibold text-[var(--um-orange)] uppercase tracking-wider whitespace-nowrap">Today</div>
              <div className="mt-1 w-[2px] h-5 bg-[var(--um-orange)]" />
              <div className="w-3 h-3 rounded-full bg-[var(--um-orange)] ring-4 ring-[var(--um-orange)]/15" />
            </div>
          </div>
        )}

        {/* Milestone markers */}
        {milestones.map((m, i) => {
          const x = pct(m.date);
          const days = differenceInCalendarDays(m.date, today);
          const isPast = days < 0;
          const isToday = days === 0;
          const colors = KIND_COLOR[m.kind];
          // Alternate labels above/below to avoid overlap
          const above = i % 2 === 0;

          return (
            <div
              key={m.label}
              className="absolute group"
              style={{ left: `${x}%`, transform: "translateX(-50%)", top: "32px" }}
            >
              {/* Dot */}
              <div className={`relative z-10 w-2.5 h-2.5 rounded-full border-2 border-[var(--card)] ${
                isPast || isToday ? colors.dot : "bg-[var(--um-gray-300)]"
              }`} />

              {/* Label */}
              <div
                className={`absolute whitespace-nowrap text-center ${above ? "bottom-full mb-6" : "top-full mt-2"}`}
                style={{ left: "50%", transform: "translateX(-50%)" }}
              >
                <div className={`text-[9px] font-semibold uppercase tracking-wider ${
                  isPast ? "text-[var(--um-gray-400)]" : isToday ? colors.text : colors.text
                }`}>
                  {m.shortLabel}
                </div>
                <div className="text-[9px] text-[var(--muted)] tabular-nums mt-0.5">{format(m.date, "d MMM")}</div>
              </div>

              {/* Hover tooltip */}
              <div className="absolute bottom-full mb-10 left-1/2 -translate-x-1/2 hidden group-hover:block z-20">
                <div className="bg-[var(--um-dark-blue)] text-white text-[10px] px-2.5 py-1.5 rounded-sm whitespace-nowrap shadow-[var(--shadow-md)]">
                  {m.label} · {format(m.date, "EEE d MMM")}
                  <span className="ml-1.5 opacity-70">
                    {isPast ? `(${-days}d ago)` : isToday ? "(today)" : `(in ${days}d)`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-[9px] uppercase tracking-wider text-[var(--muted)]">
        {Object.entries({ start: "Period start", deadline: "Deadlines", comms: "Comms to Anja", logistics: "Logistics", exam: "Exam week" }).map(([k, label]) => (
          <span key={k} className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${KIND_COLOR[k].dot}`} />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
