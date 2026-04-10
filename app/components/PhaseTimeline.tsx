"use client";
import { useMemo } from "react";
import { differenceInCalendarDays, parseISO } from "date-fns";

type Phase = {
  id: string;
  label: string;
  short: string;
  weekRange: [number, number]; // inclusive, relative to exam week Monday (negative = before)
};

const PHASES: Phase[] = [
  { id: "setup",     label: "Setup",     short: "T−10 → T−4", weekRange: [-10, -4] },
  { id: "countdown", label: "Countdown", short: "T−2 → T−1",  weekRange: [-3, -1] },
  { id: "exam",      label: "Exam week",  short: "T",          weekRange: [0, 0] },
  { id: "after",     label: "After",      short: "T+1 → T+4", weekRange: [1, 4] },
  { id: "resit",     label: "Resit",      short: "T+5 →",     weekRange: [5, 12] },
];

export function PhaseTimeline({ examWeekStart }: { examWeekStart: string }) {
  const currentPhaseId = useMemo(() => {
    const today = new Date();
    const examMon = parseISO(examWeekStart);
    const daysDiff = differenceInCalendarDays(today, examMon);
    const weeksDiff = Math.floor(daysDiff / 7);

    for (const phase of PHASES) {
      if (weeksDiff >= phase.weekRange[0] && weeksDiff <= phase.weekRange[1]) return phase.id;
    }
    // Before setup or after resit
    if (weeksDiff < PHASES[0].weekRange[0]) return "before";
    return "done";
  }, [examWeekStart]);

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--brand)] rounded-sm px-5 py-4">
      <div className="section-marker mb-3">PHASE TRACKER</div>

      {/* Desktop: horizontal */}
      <div className="hidden sm:flex items-start gap-0">
        {PHASES.map((phase, i) => {
          const isCurrent = phase.id === currentPhaseId;
          const isPast = (() => {
            const currentIdx = PHASES.findIndex(p => p.id === currentPhaseId);
            if (currentPhaseId === "done") return true;
            if (currentPhaseId === "before") return false;
            return i < currentIdx;
          })();

          return (
            <div key={phase.id} className="flex-1 relative">
              {/* Connector line */}
              {i > 0 && (
                <div className={`absolute top-3 right-1/2 left-0 h-[2px] -translate-x-0 ${
                  isPast ? "bg-[var(--um-orange)]" : "bg-[var(--um-gray-200)]"
                }`} />
              )}
              {i < PHASES.length - 1 && (
                <div className={`absolute top-3 left-1/2 right-0 h-[2px] ${
                  isPast ? "bg-[var(--um-orange)]" : isCurrent ? "bg-gradient-to-r from-[var(--um-orange)] to-[var(--um-gray-200)]" : "bg-[var(--um-gray-200)]"
                }`} />
              )}

              {/* Dot */}
              <div className="relative flex flex-col items-center">
                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center z-10 transition-all ${
                  isCurrent
                    ? "border-[var(--um-orange)] bg-[var(--um-orange)] text-white shadow-[0_0_0_4px_rgba(232,78,16,0.15)]"
                    : isPast
                      ? "border-[var(--um-orange)] bg-[var(--um-orange)] text-white"
                      : "border-[var(--um-gray-300)] bg-[var(--card)] text-[var(--um-gray-400)]"
                }`}>
                  {isPast && !isCurrent ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5L4.5 7.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ) : (
                    <span className="text-[9px] font-semibold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  )}
                </div>
                <div className={`mt-2 text-center ${isCurrent ? "text-[var(--um-orange)]" : isPast ? "text-[var(--brand)]" : "text-[var(--um-gray-400)]"}`}>
                  <div className={`text-xs font-semibold ${isCurrent ? "font-display text-sm" : ""}`}>{phase.label}</div>
                  <div className="label-caps !text-[8px] mt-0.5">{phase.short}</div>
                </div>
                {isCurrent && (
                  <div className="mt-1.5 text-[9px] font-semibold text-[var(--um-orange)] uppercase tracking-wider">You are here</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: vertical */}
      <div className="sm:hidden space-y-0">
        {PHASES.map((phase, i) => {
          const isCurrent = phase.id === currentPhaseId;
          const isPast = (() => {
            const currentIdx = PHASES.findIndex(p => p.id === currentPhaseId);
            if (currentPhaseId === "done") return true;
            if (currentPhaseId === "before") return false;
            return i < currentIdx;
          })();

          return (
            <div key={phase.id} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isCurrent
                    ? "border-[var(--um-orange)] bg-[var(--um-orange)] text-white"
                    : isPast
                      ? "border-[var(--um-orange)] bg-[var(--um-orange)] text-white"
                      : "border-[var(--um-gray-300)] bg-[var(--card)]"
                }`}>
                  <span className="text-[8px] font-semibold">{i + 1}</span>
                </div>
                {i < PHASES.length - 1 && (
                  <div className={`w-[2px] h-6 ${isPast ? "bg-[var(--um-orange)]" : "bg-[var(--um-gray-200)]"}`} />
                )}
              </div>
              <div className={`pb-4 ${isCurrent ? "text-[var(--um-orange)]" : isPast ? "text-[var(--brand)]" : "text-[var(--um-gray-400)]"}`}>
                <div className={`text-xs font-semibold leading-none ${isCurrent ? "text-sm" : ""}`}>
                  {phase.label} {isCurrent && <span className="text-[9px] ml-1">← now</span>}
                </div>
                <div className="label-caps !text-[8px] mt-0.5">{phase.short}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
