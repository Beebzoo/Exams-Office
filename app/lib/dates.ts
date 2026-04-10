import { addWeeks, addDays, parseISO, format, differenceInCalendarDays } from "date-fns";
import { PERIODS, type Period, CHECKLIST, type ChecklistItem } from "./data";

export function fmt(d: Date | string, f = "EEE d MMM yyyy") {
  return format(typeof d === "string" ? parseISO(d) : d, f);
}

export function checklistDate(period: Period, item: ChecklistItem): Date {
  const examMonday = parseISO(period.examWeek.start);
  if (item.daysBefore != null) return addDays(examMonday, -item.daysBefore);
  if (item.weeksBefore != null) return addWeeks(examMonday, -item.weeksBefore);
  return examMonday;
}

export function currentPeriod(today = new Date()): Period {
  // Pick the period whose exam week is closest in the future, or currently happening.
  const upcoming = PERIODS
    .map(p => ({ p, end: parseISO(p.examWeek.end) }))
    .filter(({ end }) => differenceInCalendarDays(end, today) >= -14)
    .sort((a, b) => a.end.getTime() - b.end.getTime());
  return upcoming[0]?.p ?? PERIODS[PERIODS.length - 1];
}

export type DeadlineEntry = {
  date: Date;
  label: string;
  period: Period;
  kind: "exam-week" | "deadline" | "milestone" | "checklist";
  category?: ChecklistItem["category"];
};

export function allDeadlines(): DeadlineEntry[] {
  const out: DeadlineEntry[] = [];
  for (const p of PERIODS) {
    const push = (d: string | undefined, label: string, kind: DeadlineEntry["kind"]) => {
      if (!d) return;
      out.push({ date: parseISO(d), label, period: p, kind });
    };
    push(p.sscRequestDeadline, "SSC exam request deadline", "deadline");
    push(p.timetablePublished, "Timetable published", "milestone");
    push(p.ccInformEmail, "CC inform email", "milestone");
    push(p.invigilatorRequestBy, "Invigilator request deadline", "deadline");
    push(p.examSubmissionDeadline, "Exam submission deadline (CCs)", "deadline");
    push(p.printingOrder, "ANDIDRUK printing order", "deadline");
    push(p.examsDelivered, "Exams delivered to PHS", "milestone");
    push(p.firstCartCollected, "First cart collected by UTS", "milestone");
    push(p.examWeek.start, `${p.code} exam week starts`, "exam-week");
    push(p.examWeek.end, `${p.code} exam week ends`, "exam-week");
  }
  return out.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function periodChecklistDated(period: Period) {
  return CHECKLIST.map(item => ({
    ...item,
    date: checklistDate(period, item),
  })).sort((a, b) => a.date.getTime() - b.date.getTime());
}
