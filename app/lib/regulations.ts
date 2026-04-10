// Plain-language summaries of the EER articles relevant to exam coordination.
// Source: MSLAS Education and Examination Regulations 2025-2026.

export type Regulation = {
  id: string;            // article number e.g. "5.2"
  title: string;
  summary: string;       // plain-language
  implication?: string;  // operational meaning for the exam office
  category: "exams" | "grading" | "attendance" | "fraud" | "students" | "graduation" | "process";
  importance: "high" | "medium";
};

export const REGULATIONS: Regulation[] = [
  // === HIGH PRIORITY ===
  {
    id: "5.2", title: "Course examination grades", category: "grading", importance: "high",
    summary: "Grades are on a 1–10 scale to one decimal. The student needs 5.5 without rounding to pass. No participation = NG (fail). For resits, the highest grade is the final grade.",
    implication: "This is the legal source of the '5.45–5.49 rounds DOWN to fail' rule — it's literally 'without rounding'. Also why you fill NG when a student didn't show up.",
  },
  {
    id: "5.8", title: "Determination & announcement of results", category: "grading", importance: "high",
    summary: "The examiner determines the result within 10 working days and provides ESD with the information needed to announce it to the student.",
    implication: "This is the formal CC grading deadline you chase every period.",
  },
  {
    id: "5.9", title: "Right of inspection", category: "students", importance: "high",
    summary: "Students may inspect their evaluated work within 10 working days of the date ESD announces the result in Student Portal. They may also inspect the questions and assessment criteria.",
    implication: "This is exactly the line in your 'Grades Published' email template. Don't publish on a Friday afternoon if you can avoid it — the inspection clock starts immediately.",
  },
  {
    id: "5.5", title: "Adjustments for disability / chronic illness", category: "students", importance: "high",
    summary: "Students with a disability or chronic illness can request adapted exam conditions. Disability Support (DS) advises, the Board of Examiners decides. Adjustments must not alter difficulty or quality.",
    implication: "This is the legal foundation of SPAR. When a SPAR edge case comes up that isn't in the planning overview, the decision-maker is the Board of Examiners — not ESD.",
  },
  {
    id: "4.5", title: "Attendance requirement", category: "attendance", importance: "high",
    summary: "Modules require minimum 85% attendance (some 100%). Students who miss ≤30% with a valid reason may request a compensation assignment. The Board of Examiners can exempt in exceptional cases.",
    implication: "Source of the 70–85% compensation rule in your grading rules. A student with a sufficient grade but failed attendance still fails the transcript.",
  },
  {
    id: "5.3", title: "Twice per academic year", category: "exams", importance: "high",
    summary: "Each course examination is offered twice per AY: once during/after the course period (first sit), once during the rest of the year (resit). Periods are in the academic calendar.",
    implication: "Legal basis for the resit period structure. The BoE can decide an exam may be taken at another date in exceptional cases.",
  },
  {
    id: "5.4", title: "Registration for course examinations", category: "exams", importance: "high",
    summary: "ESD registers students for course examinations — both first sit and resit — based on their module registration. The student must meet attendance to actually sit.",
    implication: "This is your ZPIQ_MASS_EXAM step for resits. First sit is automatic from the module registration.",
  },
  {
    id: "5.11", title: "Retention period for exams", category: "process", importance: "high",
    summary: "Written exam questions, answers, and evaluated work must be kept (paper or digital) for 2 years after the result is determined. Capstones and theses: 7 years.",
    implication: "When a CC asks 'can I throw these out?' — the answer is no, not for 2 years. Useful for the post-inspection cleanup question.",
  },
  {
    id: "5.14", title: "Fraud", category: "fraud", importance: "high",
    summary: "If the Board of Examiners determines a student has committed fraud, it takes appropriate measures. In serious cases the student can be deregistered from the programme by UM's Executive Board.",
    implication: "Your irregularity report forms feed this process. You collect — the BoE decides.",
  },
  {
    id: "5.15", title: "Invalid exam", category: "fraud", importance: "high",
    summary: "If irregularities make it impossible to accurately assess the student's knowledge, the Board of Examiners may declare the exam invalid for one student or a group.",
    implication: "Power tool for cases like a fire alarm during an exam, system crash, or print error affecting many students. Escalate, don't decide alone.",
  },

  // === MEDIUM PRIORITY ===
  {
    id: "4.4", title: "Module registration deadline", category: "students", importance: "medium",
    summary: "Students must register for modules by the stated deadline by submitting a registration form to ESD. Late registrations are not guaranteed; in exceptional circumstances some form may still be possible.",
    implication: "Affects the student numbers you submit to AR at T−6 weeks. Late registrants can disturb room capacity.",
  },
  {
    id: "5.1", title: "General — Rules of Procedure", category: "exams", importance: "medium",
    summary: "Each module's course examination consists of at least two graded moments. The course manual states the ILOs and assessment criteria. The 'Rules of Procedure for (Course) Examinations at Maastricht University' describes operational rules.",
    implication: "There is a separate UM-wide Rules of Procedure document referenced here — worth tracking down and linking. Most exam-day student rules originate from it.",
  },
  {
    id: "5.6", title: "Oral exams", category: "exams", importance: "medium",
    summary: "Oral exams are taken one student at a time. An examiner conducts them in the presence of another staff member. They take place in public unless the BoE or examiner decides otherwise.",
    implication: "Rare for MSP, but if a CC arranges one, two staff need to be present. Not the standard exam-week workflow.",
  },
  {
    id: "5.13", title: "Exemption", category: "students", importance: "medium",
    summary: "The Board of Examiners may grant exemption from a course examination if the student has previously passed a similar one elsewhere or has equivalent professional experience. Exemptions cover an entire module, not parts. Capstones/theses cannot be exempted.",
    implication: "Affects which students appear on your grading sheets — exempted students should not be there.",
  },
  {
    id: "6.1", title: "Final examination / graduation", category: "graduation", importance: "medium",
    summary: "The Board of Examiners determines the date of the final examination. The graduation date is the last day of the month in which all obligations are satisfied. Graduation is automatic. Students may request postponement at least 1 month before the final assessment, in defined cases (dual degree, board year, etc.).",
    implication: "When a student says they want to delay graduation, they need to ask the BoE — and the request must come in BEFORE the final assessment.",
  },
  {
    id: "6.4", title: "GPA calculation", category: "graduation", importance: "medium",
    summary: "GPA is the credit-weighted average of all numerical grades. Compensated failing modules are included. Credit-transfer credits are excluded.",
    implication: "Useful when explaining final transcripts to students.",
  },
  {
    id: "7.6", title: "Personal circumstances", category: "students", importance: "medium",
    summary: "Personal circumstances (illness, impairment, pregnancy, family circumstances, board activities) may be considered by the BoE. Must be reported to the BoE, with supporting documentation if requested. Students should also notify their study/academic advisor.",
    implication: "Foundation for SPAR and individual exam adjustments. The student must report it formally — not just mention it in a hallway.",
  },
  {
    id: "7.8", title: "Leave of absence", category: "students", importance: "medium",
    summary: "Students who want to take a leave of absence must consult Academic Advising and inform ESD before taking leave. They are reinstated to pre-leave status when they return.",
    implication: "Sometimes returnees show up on registers unexpectedly. Cross-check leave status when something looks off.",
  },
  {
    id: "8.6", title: "Right of appeal", category: "process", importance: "medium",
    summary: "Students may appeal decisions of the Board of Examiners or examiners to the Board of Appeal for Examinations (CBE) via UM's Complaints Service Point, within 6 weeks of the decision.",
    implication: "If a student disputes a grade or fraud finding, this is the formal channel. Six-week clock starts at the decision date.",
  },
];

export const CATEGORY_LABELS: Record<Regulation["category"], string> = {
  exams: "Exams",
  grading: "Grading",
  attendance: "Attendance",
  fraud: "Fraud & irregularities",
  students: "Students & accommodations",
  graduation: "Graduation",
  process: "Process & appeals",
};
