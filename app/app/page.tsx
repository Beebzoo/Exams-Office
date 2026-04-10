import Link from "next/link";
import { allDeadlines, currentPeriod, periodChecklistDated, fmt } from "@/lib/dates";
import { differenceInCalendarDays, format, addDays, parseISO } from "date-fns";
import { ArrowUpRight, AlertTriangle, CalendarDays, Mail, BookOpen, Library, Scale, GraduationCap, Coffee } from "lucide-react";
import { CountdownTimeline } from "@/components/CountdownTimeline";

export default function Dashboard() {
  const today = new Date();
  const period = currentPeriod(today);

  const upcoming = allDeadlines()
    .filter(d => differenceInCalendarDays(d.date, today) >= 0 && differenceInCalendarDays(d.date, today) <= 30)
    .slice(0, 6);

  const checklist = periodChecklistDated(period);
  const next = checklist.filter(c => differenceInCalendarDays(c.date, today) >= -3).slice(0, 5);
  const daysToExamWeek = differenceInCalendarDays(new Date(period.examWeek.start), today);

  // Urgent items: due within 3 days only (no overdue)
  const urgent = [
    ...allDeadlines()
      .filter(d => { const days = differenceInCalendarDays(d.date, today); return days >= 0 && days <= 3; })
      .map(d => ({ label: d.label, date: d.date, days: differenceInCalendarDays(d.date, today), period: d.period.code })),
    ...checklist
      .filter(c => { const days = differenceInCalendarDays(c.date, today); return days >= 0 && days <= 3; })
      .map(c => ({ label: c.task, date: c.date, days: differenceInCalendarDays(c.date, today), period: period.code })),
  ].sort((a, b) => a.days - b.days);

  // Deduplicate by label
  const seen = new Set<string>();
  const urgentUnique = urgent.filter(u => { if (seen.has(u.label)) return false; seen.add(u.label); return true; }).slice(0, 5);

  return (
    <div className="stagger space-y-10">
      {/* ====== URGENT BANNER ====== */}
      {urgentUnique.length > 0 && (
        <div className="border-l-4 border-l-[var(--um-light-blue)] bg-[var(--um-light-blue)]/5 px-5 py-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={14} className="text-[var(--um-light-blue)]" />
            <span className="label-caps !text-[10px]">Coming up</span>
          </div>
          <ul className="space-y-1.5">
            {urgentUnique.map((u, i) => (
              <li key={i} className="flex items-baseline justify-between gap-4 text-sm">
                <span className="text-[var(--brand)]">{u.label}</span>
                <span className={`shrink-0 font-display tabular-nums text-sm ${
                  u.days < 0 ? "text-[var(--um-orange)] font-semibold" :
                  u.days === 0 ? "text-[var(--um-orange)]" : "text-[var(--brand)]"
                }`}>
                  {u.days < 0 ? `${-u.days}d overdue` : u.days === 0 ? "today" : `in ${u.days}d`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ====== HEADER ====== */}
      <header>
        <div className="label-caps">{format(today, "EEEE · d MMMM yyyy")}</div>
        <h1 className="font-display text-5xl text-[var(--brand)] mt-2 leading-[0.95]">
          Good day<span className="text-[var(--um-orange)]">.</span>
          <Coffee size={32} strokeWidth={1.5} className="inline-block ml-3 -translate-y-1 text-[var(--brand)]" />
        </h1>
      </header>

      {/* ====== HERO PERIOD CARD ====== */}
      <section className="relative overflow-hidden bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--brand)] rounded-sm">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[var(--um-light-blue)]/8 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-60 w-60 rounded-full bg-[var(--um-orange)]/6 blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-12 gap-6 p-8">
          {/* Big number */}
          <div className="col-span-12 md:col-span-5">
            <div className="section-marker">01 / TIME REMAINING</div>
            <div className="mt-3 flex items-end gap-4">
              <div
                className="font-display leading-[0.78] text-[var(--brand)] tabular-nums"
                style={{ fontSize: "clamp(5rem, 11vw, 9rem)" }}
              >
                {Math.abs(daysToExamWeek)}
              </div>
              <div className="pb-3">
                <div className="font-display text-xl leading-tight text-[var(--brand)]">
                  {daysToExamWeek > 0 ? "days until" : daysToExamWeek === 0 ? "today" : "days into"}
                </div>
                <div className="label-caps mt-1">exam week</div>
              </div>
            </div>
          </div>

          {/* Period info */}
          <div className="col-span-12 md:col-span-7 md:border-l md:border-[var(--border)] md:pl-8">
            <div className="section-marker">02 / CURRENT PERIOD</div>
            <div className="mt-3">
              <div className="flex items-baseline gap-3">
                <span className="inline-flex items-center justify-center rounded bg-[var(--brand)] text-white px-2 py-0.5 text-[11px] font-semibold tracking-wider">
                  {period.code}
                </span>
                <h2 className="font-display text-3xl text-[var(--brand)] leading-tight">
                  {period.label.replace(/^P\d[R]?\s—\s/, "")}
                </h2>
              </div>
              <div className="mt-2 text-sm text-[var(--muted)]">
                Exam week <span className="font-display-italic text-[var(--brand)]">
                  {fmt(period.examWeek.start, "EEEE d MMMM")}
                </span> – {fmt(period.examWeek.end, "EEEE d MMMM yyyy")}
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {[
                ["Submission deadline", period.examSubmissionDeadline],
                ["ANDIDRUK order", period.printingOrder],
                ["Exams delivered", period.examsDelivered],
                ["First cart collected", period.firstCartCollected],
              ].filter(([, v]) => v).map(([k, v]) => (
                <div key={k as string} className="flex items-baseline justify-between gap-3 border-b border-dotted border-[var(--um-gray-300)] pb-1.5">
                  <dt className="label-caps !text-[9px]">{k}</dt>
                  <dd className="font-display text-sm text-[var(--brand)] tabular-nums">{fmt(v as string, "d MMM")}</dd>
                </div>
              ))}
            </dl>

            <Link
              href={`/periods/${period.id}`}
              className="mt-6 group inline-flex items-baseline gap-2 text-sm font-medium text-[var(--brand)] hover:text-[var(--um-orange)] transition-colors"
            >
              <span className="border-b border-current pb-0.5">Open period checklist</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {period.notes?.map(n => (
          <div key={n} className="border-t border-[var(--brand)] px-8 py-3 flex items-start gap-3 bg-[var(--um-orange)]/5">
            <AlertTriangle size={14} className="mt-0.5 shrink-0 text-[var(--um-orange)]" />
            <span className="text-sm text-[var(--brand)] font-display-italic">{n}</span>
          </div>
        ))}
      </section>

      {/* ====== COUNTDOWN TIMELINE ====== */}
      <CountdownTimeline
        periodStart={period.periodStart}
        sscRequestDeadline={period.sscRequestDeadline}
        invigilatorRequestBy={period.invigilatorRequestBy}
        examSubmissionDeadline={period.examSubmissionDeadline}
        printingOrder={period.printingOrder}
        toetsoverzichtToAnja={period.examWeek.start ? format(addDays(parseISO(period.examWeek.start), -10), "yyyy-MM-dd") : undefined}
        chaseInvigilatorNames={period.examWeek.start ? format(addDays(parseISO(period.examWeek.start), -7), "yyyy-MM-dd") : undefined}
        examsDelivered={period.examsDelivered}
        firstCartCollected={period.firstCartCollected}
        examWeekStart={period.examWeek.start}
        examWeekEnd={period.examWeek.end}
      />

      {/* ====== TWO-UP ====== */}
      <section className="grid grid-cols-12 gap-6">
        {/* Deadlines list */}
        <div className="col-span-12 lg:col-span-7">
          <PanelHeader marker="03 / DEADLINES" title="Next thirty" href="/calendar" cta="Calendar" />
          <ol className="mt-4">
            {upcoming.length === 0 && <li className="text-sm text-[var(--muted)] py-3">Nothing in the next 30 days.</li>}
            {upcoming.map((d, i) => {
              const days = differenceInCalendarDays(d.date, today);
              return (
                <li key={i} className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-3.5 border-b border-[var(--um-gray-200)] hover:bg-[var(--um-gray-50)] transition-colors px-2 -mx-2 rounded-sm">
                  <span className="section-marker !text-[var(--um-gray-400)] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="text-sm font-medium text-[var(--brand)] leading-tight">{d.label}</div>
                    <div className="label-caps mt-1 !text-[9px]">{d.period.code} · {d.period.ay}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-base text-[var(--brand)] tabular-nums leading-none">{format(d.date, "d MMM")}</div>
                    <div className="label-caps mt-1 !text-[9px] tabular-nums">in {days}d</div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Up next checklist */}
        <aside className="col-span-12 lg:col-span-5">
          <PanelHeader marker="04 / WORKFLOW" title="Up next" href={`/periods/${period.id}`} cta="Checklist" />
          <ul className="mt-4">
            {next.map(item => {
              const days = differenceInCalendarDays(item.date, today);
              const overdue = days < 0;
              return (
                <li key={item.id} className="py-3.5 border-b border-dotted border-[var(--um-gray-300)]">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm text-[var(--brand)] leading-snug">{item.task}</span>
                    <span className={`label-caps !text-[9px] shrink-0 tabular-nums ${overdue ? "text-[var(--um-orange)]" : ""}`}>
                      {overdue ? `${-days}d late` : days === 0 ? "today" : `${days}d`}
                    </span>
                  </div>
                  <div className="label-caps mt-1 !text-[9px]">{item.whenLabel}</div>
                </li>
              );
            })}
          </ul>
        </aside>
      </section>

      {/* ====== QUICK LINKS ====== */}
      <section>
        <div className="section-marker">05 / SHORTCUTS</div>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { href: "/templates",   label: "Templates",  icon: Mail },
            { href: "/procedures",  label: "Procedures", icon: BookOpen },
            { href: "/regulations", label: "Regulations",icon: Scale },
            { href: "/glossary",    label: "Glossary",   icon: GraduationCap },
            { href: "/calendar",    label: "Calendar",   icon: CalendarDays },
            { href: "/reference",   label: "Reference",  icon: Library },
          ].map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="group block border border-[var(--border)] border-t-2 border-t-[var(--um-gray-300)] hover:border-t-[var(--um-orange)] hover:bg-[var(--um-gray-50)] p-4 rounded-sm transition-all"
            >
              <q.icon size={16} className="text-[var(--um-gray-400)] group-hover:text-[var(--um-orange)] transition-colors" />
              <div className="mt-3 font-display text-base text-[var(--brand)] leading-tight">{q.label}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function PanelHeader({ marker, title, href, cta }: { marker: string; title: string; href: string; cta: string }) {
  return (
    <div className="flex items-end justify-between border-b-2 border-[var(--brand)] pb-2">
      <div>
        <div className="section-marker">{marker}</div>
        <h2 className="font-display text-2xl text-[var(--brand)] leading-tight mt-1">
          {title}<span className="text-[var(--um-orange)]">.</span>
        </h2>
      </div>
      <Link href={href} className="label-caps hover:text-[var(--um-orange)] transition-colors">{cta} →</Link>
    </div>
  );
}
