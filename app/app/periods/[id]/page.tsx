import { notFound } from "next/navigation";
import Link from "next/link";
import { PERIODS } from "@/lib/data";
import { periodChecklistDated, fmt } from "@/lib/dates";
import { PeriodChecklist } from "./PeriodChecklist";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { differenceInCalendarDays, format } from "date-fns";
import { PhaseTimeline } from "@/components/PhaseTimeline";
import { PeriodEmails } from "@/components/PeriodEmails";
import { PeriodNotes } from "@/components/PeriodNotes";

export default async function PeriodPage(props: PageProps<"/periods/[id]">) {
  const { id } = await props.params;
  const period = PERIODS.find(p => p.id === id);
  if (!period) notFound();

  const items = periodChecklistDated(period);
  const today = new Date();
  const examMon = new Date(period.examWeek.start);
  const daysToExamWeek = differenceInCalendarDays(examMon, today);
  const inExamWeek = daysToExamWeek <= 0 && differenceInCalendarDays(new Date(period.examWeek.end), today) >= 0;

  return (
    <div className="stagger space-y-10">
      {/* ====== HEADER ====== */}
      <header>
        <Link href="/periods" className="label-caps inline-flex items-center gap-1.5 hover:text-[var(--um-orange)] transition-colors">
          <ArrowLeft size={11} /> All periods
        </Link>
        <div className="mt-4 section-marker">01 / EXAM PERIOD</div>
        <div className="mt-2 flex flex-wrap items-baseline gap-4">
          <span className="inline-flex items-center justify-center rounded bg-[var(--brand)] text-white px-2.5 py-1 text-xs font-semibold tracking-wider tabular-nums">
            {period.code}
          </span>
          <h1 className="font-display text-5xl text-[var(--brand)] leading-[0.95] tracking-tight">
            {period.label.replace(/^P\d[R]?\s—\s/, "")}<span className="text-[var(--um-orange)]">.</span>
          </h1>
        </div>
        <div className="mt-3 text-sm text-[var(--muted)]">
          Academic year <span className="font-display-italic text-[var(--brand)]">{period.ay}</span>
        </div>
      </header>

      {period.notes?.map(n => (
        <div key={n} className="border-y border-[var(--um-orange)] py-3 px-4 flex items-start gap-3 bg-[var(--um-orange)]/5">
          <AlertTriangle size={14} className="mt-0.5 shrink-0 text-[var(--um-orange)]" />
          <span className="text-sm text-[var(--brand)] font-display-italic">{n}</span>
        </div>
      ))}

      {/* ====== PHASE TIMELINE ====== */}
      <PhaseTimeline examWeekStart={period.examWeek.start} />

      {/* ====== HERO STAT ====== */}
      <section className="relative overflow-hidden bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--brand)] rounded-sm">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--um-light-blue)]/8 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-[var(--um-orange)]/6 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-12 gap-6 p-8">
          {/* Big number */}
          <div className="col-span-12 md:col-span-5">
            <div className="section-marker">02 / TIME REMAINING</div>
            <div className="mt-3 flex items-end gap-4">
              <div
                className="font-display leading-[0.78] text-[var(--brand)] tabular-nums"
                style={{ fontSize: "clamp(5rem, 11vw, 9rem)" }}
              >
                {Math.abs(daysToExamWeek)}
              </div>
              <div className="pb-3">
                <div className="font-display text-xl leading-tight text-[var(--brand)]">
                  {daysToExamWeek > 0 ? "days until" : inExamWeek ? "in progress" : "days since"}
                </div>
                <div className="label-caps mt-1">exam week</div>
              </div>
            </div>
            <div className="mt-3 text-sm text-[var(--muted)]">
              {fmt(period.examWeek.start, "EEEE d MMMM")} – {fmt(period.examWeek.end, "EEEE d MMMM yyyy")}
            </div>
          </div>

          {/* Key dates as definition list */}
          <div className="col-span-12 md:col-span-7 md:border-l md:border-[var(--border)] md:pl-8">
            <div className="section-marker">03 / KEY DATES</div>
            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {([
                ["SSC request deadline", period.sscRequestDeadline],
                ["Period start", period.periodStart],
                ["Timetable published", period.timetablePublished],
                ["CC inform email", period.ccInformEmail],
                ["Invigilator request by", period.invigilatorRequestBy],
                ["Submission deadline", period.examSubmissionDeadline],
                ["ANDIDRUK order", period.printingOrder],
                ["Exams delivered", period.examsDelivered],
                ["First cart collected", period.firstCartCollected],
              ] as const).filter(([, v]) => v).map(([label, v]) => {
                const d = v ? new Date(v) : null;
                const past = d ? d < today : false;
                return (
                  <div key={label} className="flex items-baseline justify-between gap-3 border-b border-dotted border-[var(--um-gray-300)] pb-1.5">
                    <dt className="label-caps !text-[9px]">{label}</dt>
                    <dd className={`font-display text-sm tabular-nums ${past ? "text-[var(--um-gray-400)] line-through" : "text-[var(--brand)]"}`}>
                      {d ? format(d, "d MMM") : "—"}
                    </dd>
                  </div>
                );
              })}
            </dl>

            <div className="mt-5 space-y-2">
              <div className="flex items-baseline justify-between gap-3">
                <span className="label-caps !text-[9px]">CC grade deadline</span>
                <span className="font-display-italic text-xs text-[var(--brand)] text-right">{period.ccGradeDeadlineNote}</span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="label-caps !text-[9px]">ESD publish by</span>
                <span className="font-display-italic text-xs text-[var(--brand)] text-right">{period.osaPublishNote}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CHECKLIST ====== */}
      <PeriodChecklist
        periodId={period.id}
        items={items.map(i => ({
          id: i.id,
          task: i.task,
          whenLabel: i.whenLabel,
          dateISO: format(i.date, "yyyy-MM-dd"),
          procedureRef: i.procedureRef,
          category: i.category,
          weeksBefore: i.weeksBefore,
          daysBefore: i.daysBefore,
        }))}
      />

      {/* ====== PERIOD NOTES ====== */}
      <PeriodNotes periodId={period.id} periodLabel={period.label} />

      {/* ====== PERIOD-SPECIFIC EMAILS ====== */}
      <PeriodEmails dates={{
        code: period.code,
        examWeekStart: period.examWeek.start,
        examWeekEnd: period.examWeek.end,
        examSubmissionDeadline: period.examSubmissionDeadline,
        periodStart: period.periodStart,
      }} />
    </div>
  );
}
