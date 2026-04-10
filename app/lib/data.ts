// Source of truth — derived from MSP Exam Coordination Operations Manual (09 Apr 2026)

export type Period = {
  id: string;            // e.g. "P1-2025-2026"
  code: "P1" | "P2" | "P4" | "P5" | "P5R"; // P5R = standalone P5 resit week
  ay: string;            // "2025–2026"
  label: string;         // "P1 — Oct 2025"
  examWeek: { start: string; end: string };
  periodStart?: string;
  timetablePublished?: string;
  ccInformEmail?: string;
  invigilatorRequestBy: string;
  examSubmissionDeadline: string;
  printingOrder?: string;
  examsDelivered?: string;
  firstCartCollected?: string;
  sscRequestDeadline?: string;  // SSC deadline for submitting exam requests for this exam week
  ccGradeDeadlineNote: string;
  osaPublishNote: string;
  notes?: string[];
};

export const PERIODS: Period[] = [
  // AY 2025-2026
  { id: "P1-2025-2026", code: "P1", ay: "2025–2026", label: "P1 — Oct 2025",
    examWeek: { start: "2025-10-13", end: "2025-10-17" },
    periodStart: "2025-09-01", timetablePublished: "2025-08-14", ccInformEmail: "2025-09-01",
    invigilatorRequestBy: "2025-09-22", examSubmissionDeadline: "2025-09-29",
    printingOrder: "2025-09-30", examsDelivered: "2025-10-07", firstCartCollected: "2025-10-09",
    ccGradeDeadlineNote: "10 working days from Fri 17 Oct 2025",
    osaPublishNote: "15 working days from Fri 17 Oct 2025" },
  { id: "P2-2025-2026", code: "P2", ay: "2025–2026", label: "P2 — Dec 2025 (+ P1 resits)",
    examWeek: { start: "2025-12-08", end: "2025-12-12" },
    periodStart: "2025-10-27", timetablePublished: "2025-10-09", ccInformEmail: "2025-10-27",
    invigilatorRequestBy: "2025-11-17", examSubmissionDeadline: "2025-11-24",
    printingOrder: "2025-11-25", examsDelivered: "2025-12-02", firstCartCollected: "2025-12-04",
    ccGradeDeadlineNote: "10 working days from Fri 12 Dec 2025",
    osaPublishNote: "15 working days from Fri 12 Dec 2025" },
  { id: "P4-2025-2026", code: "P4", ay: "2025–2026", label: "P4 — Mar 2026 (+ P2/P3 resits)",
    examWeek: { start: "2026-03-16", end: "2026-03-20" },
    periodStart: "2026-01-26", timetablePublished: "2026-01-15", ccInformEmail: "2026-01-26",
    invigilatorRequestBy: "2026-02-23", examSubmissionDeadline: "2026-03-02",
    printingOrder: "2026-03-03", examsDelivered: "2026-03-10", firstCartCollected: "2026-03-12",
    ccGradeDeadlineNote: "10 working days from Fri 20 Mar 2026",
    osaPublishNote: "15 working days from Fri 20 Mar 2026" },
  { id: "P5-2025-2026", code: "P5", ay: "2025–2026", label: "P5 — May 2026 (+ P4 resits)",
    examWeek: { start: "2026-05-18", end: "2026-05-22" },
    periodStart: "2026-03-30", timetablePublished: "2026-03-19", ccInformEmail: "2026-03-30",
    invigilatorRequestBy: "2026-04-27", examSubmissionDeadline: "2026-05-04",
    printingOrder: "2026-05-05", examsDelivered: "2026-05-12", firstCartCollected: "2026-05-14",
    ccGradeDeadlineNote: "10 working days from Fri 22 May 2026",
    osaPublishNote: "15 working days from Fri 22 May 2026",
    notes: ["⚠ P5 holidays: 27 Apr (King's), 4 May (Bridging), 5 May (Liberation), 14 May (Ascension), 15 May (Bridging)"] },
  { id: "P5R-2025-2026", code: "P5R", ay: "2025–2026", label: "P5 Resit Week — Jun 2026",
    examWeek: { start: "2026-06-15", end: "2026-06-19" },
    invigilatorRequestBy: "2026-05-25", examSubmissionDeadline: "2026-06-08",
    ccGradeDeadlineNote: "10 working days from Fri 19 Jun 2026",
    osaPublishNote: "15 working days from Fri 19 Jun 2026" },
  // AY 2026-2027 (SSC official dates)
  { id: "P1-2026-2027", code: "P1", ay: "2026–2027", label: "P1 — Oct 2026",
    examWeek: { start: "2026-10-19", end: "2026-10-23" },
    periodStart: "2026-08-31", timetablePublished: "2026-08-13", ccInformEmail: "2026-08-31",
    invigilatorRequestBy: "2026-09-28", examSubmissionDeadline: "2026-10-05",
    printingOrder: "2026-10-06", examsDelivered: "2026-10-13", firstCartCollected: "2026-10-15",
    sscRequestDeadline: "2026-08-03",
    ccGradeDeadlineNote: "10 working days from Fri 23 Oct 2026",
    osaPublishNote: "15 working days from Fri 23 Oct 2026" },
  { id: "P2-2026-2027", code: "P2", ay: "2026–2027", label: "P2 — Dec 2026 (+ P1 resits)",
    examWeek: { start: "2026-12-14", end: "2026-12-18" },
    periodStart: "2026-10-26", timetablePublished: "2026-10-15", ccInformEmail: "2026-10-26",
    invigilatorRequestBy: "2026-11-23", examSubmissionDeadline: "2026-11-30",
    printingOrder: "2026-12-01", examsDelivered: "2026-12-08", firstCartCollected: "2026-12-10",
    sscRequestDeadline: "2026-09-28",
    ccGradeDeadlineNote: "10 working days from Fri 18 Dec 2026",
    osaPublishNote: "15 working days from Fri 18 Dec 2026" },
  { id: "P4-2026-2027", code: "P4", ay: "2026–2027", label: "P4 — Mar/Apr 2027 (+ P2/P3 resits)",
    examWeek: { start: "2027-03-30", end: "2027-04-02" },
    periodStart: "2027-01-25", timetablePublished: "2027-01-14", ccInformEmail: "2027-01-25",
    invigilatorRequestBy: "2027-03-09", examSubmissionDeadline: "2027-03-16",
    printingOrder: "2027-03-17", examsDelivered: "2027-03-24", firstCartCollected: "2027-03-26",
    sscRequestDeadline: "2027-01-04",
    ccGradeDeadlineNote: "10 working days from Fri 2 Apr 2027",
    osaPublishNote: "15 working days from Fri 2 Apr 2027",
    notes: ["⚠ 29 March is Easter Monday (Paasmaandag). Exam week starts the day after."] },
  { id: "P5-2026-2027", code: "P5", ay: "2026–2027", label: "P5 — Jun 2027 (+ P4 resits)",
    examWeek: { start: "2027-05-31", end: "2027-06-04" },
    periodStart: "2027-04-12", timetablePublished: "2027-04-01", ccInformEmail: "2027-04-12",
    invigilatorRequestBy: "2027-05-11", examSubmissionDeadline: "2027-05-18",
    printingOrder: "2027-05-19", examsDelivered: "2027-05-26", firstCartCollected: "2027-05-28",
    sscRequestDeadline: "2027-03-15",
    ccGradeDeadlineNote: "10 working days from Fri 4 Jun 2027",
    osaPublishNote: "15 working days from Fri 4 Jun 2027",
    notes: ["⚠ 13 May (Ascension), 14 May (Bridging), 24 May (Whit Monday) fall in the run-up. Plan around them."] },
  { id: "P5R-2026-2027", code: "P5R", ay: "2026–2027", label: "P5 Resit Week — Jun 2027",
    examWeek: { start: "2027-06-07", end: "2027-06-11" },
    invigilatorRequestBy: "2027-05-17", examSubmissionDeadline: "2027-06-01",
    sscRequestDeadline: "2027-03-08",
    ccGradeDeadlineNote: "10 working days from Fri 11 Jun 2027",
    osaPublishNote: "15 working days from Fri 11 Jun 2027" },
];

// Per-period checklist (T-relative). Dates computed from examWeek.
export type ChecklistItem = {
  id: string;
  weeksBefore?: number;       // negative = after; integer relative to exam week Monday
  daysBefore?: number;         // alternative: days before exam week Monday
  whenLabel: string;
  task: string;
  procedureRef?: string;       // procedure id
  category: "schedule" | "data" | "comms" | "logistics" | "exams" | "grading" | "resit";
};

export const CHECKLIST: ChecklistItem[] = [
  { id: "year-plan",          whenLabel: "April (annual)", task: "Send the Jaaroverzicht (year plan) to FSE Student Affairs. Fill in based on new frame schedules from MSP directors + this year's student numbers +10%", procedureRef: "4.1", category: "schedule", weeksBefore: undefined, daysBefore: undefined },
  { id: "qualtrics-process",  weeksBefore: 10, whenLabel: "T − 10 weeks", task: "Receive Qualtrics responses from CCs. Process into exam overview document", procedureRef: "4.2", category: "data" },
  { id: "spar-data",          weeksBefore: 10, whenLabel: "T − 10 weeks", task: "Enter SPAR data from SAP (ZPIQ_REP_MOD_SPAR). Fill planning overview", procedureRef: "4.2", category: "data" },
  { id: "syllabus-publish",   weeksBefore: 10, whenLabel: "T − 10 weeks", task: "Publish exam and midterm schedule in Syllabus/S+", procedureRef: "4.4", category: "schedule" },
  { id: "cc-inform",          weeksBefore: 10, whenLabel: "T − 10 weeks", task: "Send CC inform email (cover sheet, calculator list, submission deadline)", procedureRef: "4.3", category: "comms" },
  { id: "tv-folders",         weeksBefore: 10, whenLabel: "T − 10 weeks", task: "Create TestVision folders for any new courses (contact DEXUM if needed)", procedureRef: "4.5", category: "schedule" },
  { id: "final-numbers",      weeksBefore: 6,  whenLabel: "T − 6 weeks",  task: "Submit final student numbers (total minus SPAR) to Anja Ronken / toetsen@", procedureRef: "4.6", category: "data" },
  { id: "invigilators",       weeksBefore: 4,  whenLabel: "T − 4 weeks",  task: "Request invigilators via InterUM: SPAR at PHS, SPAR at UNS50, resit at PHS", procedureRef: "4.8", category: "logistics" },
  { id: "esd",                weeksBefore: 4,  whenLabel: "T − 4 weeks",  task: "Confirm ESD availability. Brief Heather and Gian with schedule + locations", procedureRef: "4.7", category: "logistics" },
  { id: "exam-deadline",      weeksBefore: 2,  whenLabel: "T − 2 weeks (Mon)", task: "Exam submission deadline for CCs", procedureRef: "4.9", category: "exams" },
  { id: "exam-check",         weeksBefore: 2,  whenLabel: "T − 2 weeks (Tue)", task: "Check all submitted exams: cover sheet, writing space, two blank pages", procedureRef: "4.9", category: "exams" },
  { id: "exam-return",        weeksBefore: 2,  whenLabel: "T − 2 weeks (Tue)", task: "Return any non-compliant exams. CCs have 24 hours to correct", procedureRef: "4.9", category: "exams" },
  { id: "andidruk",           weeksBefore: 2,  whenLabel: "T − 2 weeks (Tue/Wed)", task: "Place printing order on ANDIDRUK. Upload all exams + transport overview", procedureRef: "4.10", category: "exams" },
  { id: "att-sheets",         weeksBefore: 2,  whenLabel: "T − 2 weeks", task: "Run attendance sheets in SAP (ZPIQ_ATT_SHEET). Format and save per course", procedureRef: "4.12", category: "data" },
  { id: "toetsoverzicht-ar",  daysBefore: 10,  whenLabel: "T − 2 weeks (Thu/Fri)", task: "Send block arrangements + Toetsoverzicht (exam overview with allowed aids) to Anja Ronken", category: "comms" },
  { id: "chase-invig-names",  weeksBefore: 1,  whenLabel: "T − 1 week (Mon) ⊕", task: "Confirm you have UM Sports invigilator names from Anja. Chase if not received — needed for Head Invigilator folder", category: "logistics" },
  { id: "delivered",          weeksBefore: 1,  whenLabel: "T − 1 week (Tue)", task: "Confirm printed exams delivered to PHS by ANDIDRUK", procedureRef: "4.10", category: "logistics" },
  { id: "carts",              weeksBefore: 1,  whenLabel: "T − 1 week", task: "Prepare exam carts: exams, attendance sheets, scrap paper, stationery, labels", procedureRef: "4.13", category: "logistics" },
  { id: "spar-phs",           weeksBefore: 1,  whenLabel: "T − 1 week", task: "Prepare SPAR box (PHS): exams, attendance, WC number, scrap, irregularity form, overview, clock", procedureRef: "4.14", category: "logistics" },
  { id: "spar-uns50",         weeksBefore: 1,  whenLabel: "T − 1 week", task: "Prepare TV SPAR box (UNS50): attendance, scrap, password reset flyer, checklist, overview", procedureRef: "4.14", category: "logistics" },
  { id: "head-folder",        weeksBefore: 1,  whenLabel: "T − 1 week", task: "Update Head Invigilator folder", procedureRef: "4.13", category: "logistics" },
  { id: "first-cart",         daysBefore: 4,   whenLabel: "T − 4 days (Thu/Fri ~3:30pm)", task: "First exam cart collected by UTS from PHS. Ensure cart is ready", procedureRef: "4.10", category: "logistics" },
  { id: "morning-verify",     weeksBefore: 0,  whenLabel: "Exam week — each morning", task: "Verify cart contents before transport. Ensure next-day cart is ready", category: "logistics" },
  { id: "tv-monitor",         weeksBefore: 0,  whenLabel: "Exam week", task: "Monitor TestVision sessions live via Session Dashboard", procedureRef: "4.15", category: "exams" },
  { id: "tv-close",           weeksBefore: -1, whenLabel: "Post exam week", task: "Close TestVision sessions (Dashboard → Sessions → switch off slider)", procedureRef: "4.16", category: "exams" },
  { id: "grading-sheets",     weeksBefore: -1, whenLabel: "Post exam week", task: "Run and send grading sheets (ZPIQ_EXPORT_APPR) to ALL CCs + practical coordinators", procedureRef: "4.11", category: "grading" },
  { id: "process-grades",     weeksBefore: -3, whenLabel: "CC deadline + 5 days", task: "Process all received grades in SAP (ZPIQ_IMPORT_APPR → ZPIQSMFU_CALC)", procedureRef: "6.5", category: "grading" },
  { id: "publish-grades",     weeksBefore: -3, whenLabel: "Within 15 working days of last exam", task: "Publish all final grades in Student Portal", procedureRef: "6.6", category: "grading" },
  { id: "resit-draft",        weeksBefore: -3, whenLabel: "After grades published", task: "Draft resit schedule based on frame schedule", procedureRef: "4.18", category: "resit" },
  { id: "resit-register",     weeksBefore: -3, whenLabel: "After grades published", task: "Register eligible resit students in SAP (ZPIQ_MASS_EXAM)", procedureRef: "4.18", category: "resit" },
  { id: "resit-reply",        weeksBefore: -3, whenLabel: "After grades published", task: "Send resit reply email to CCs with resit date and submission deadline", procedureRef: "4.18", category: "resit" },
  { id: "resit-print",        weeksBefore: -5, whenLabel: "Resit − 1 week", task: "Print resit exams. Prepare boxes (procedure 4.14). Brief invigilators", procedureRef: "4.18", category: "resit" },
  { id: "resit-grading",      weeksBefore: -5, whenLabel: "Resit − 1 week", task: "Send grading sheets to CCs for resit", procedureRef: "4.18", category: "resit" },
  { id: "resit-process",      weeksBefore: -7, whenLabel: "After resit week", task: "Process new final grades in SAP. Update overview. Reply to CCs", procedureRef: "4.18", category: "resit" },
];

// Contacts
export const CONTACTS = [
  { name: "Anja Ronken (SSC Scheduler)", contact: "toetsen@maastrichtuniversity.nl", when: "Year plan, student numbers, head invigilator coordination, transport logistics" },
  { name: "DEXUM", contact: "DEXUM-UB@maastrichtuniversity.nl", when: "TestVision support. New coordinator onboarding, folder access, training, manuals" },
  { name: "InterUM", contact: "surveillantenrooster.interum.eu/admin", when: "Requesting and tracking invigilators for SPAR and resit slots" },
  { name: "ANDIDRUK", contact: "um.andi-printsolutions.com", when: "All final exam and SPAR exam printing orders" },
  { name: "ICTS Support", contact: "Front of exam hall during TV exams", when: "Student login issues during TestVision exams. Student must bring UM card" },
  { name: "MSP Exams inbox", contact: "msp-exams@maastrichtuniversity.nl", when: "Main outgoing address for all exam-related emails to CCs and students" },
  { name: "MSP General", contact: "msp-btr@maastrichtuniversity.nl", when: "General MSP operations inbox" },
  { name: "Katja Zambib-Otten (BoE Secretary)", contact: "msp-boe@maastrichtuniversity.nl", when: "Escalation: fraud, exemptions, SPAR decisions, irregularity reports, graduation edge cases" },
];

export const SYSTEMS = [
  { system: "SAP", url: "UM SAP portal (UM account)", use: "Grading, attendance sheets, SPAR data, student registration for resits" },
  { system: "TestVision", url: "https://maastrichtuniversity.testvision.nl/online/developers/", use: "Digital exams — folders, sessions, monitoring, closing" },
  { system: "Syllabus / S+", url: "http://syllabus.unimaas.nl (Internet Explorer ONLY)", use: "Scheduling exams and midterms in the official timetable" },
  { system: "Qualtrics", url: "https://library.maastrichtuniversity.nl/apps-tools/qualtrics/", use: "Collecting exam format info from CCs each period (personal login, via Lo-FSE)" },
  { system: "InterUM", url: "https://surveillantenrooster.interum.eu/admin", use: "Requesting and tracking invigilators" },
  { system: "ANDIDRUK", url: "https://um.andi-printsolutions.com", use: "Placing printing orders for final exams" },
  { system: "MyTimetable", url: "https://timetable.maastrichtuniversity.nl", use: "Published timetable visible to students and staff" },
  { system: "J-Drive (SSC)", url: "J:\\SSC", use: "Year plan forms and central scheduling documents" },
  { system: "J-Drive (MSP)", url: "J:\\FSE_MSP\\Secretariat\\ESD", use: "All MSP exam files, overviews, templates, attendance sheets" },
  { system: "Canvas", url: "UM Canvas (UM account)", use: "Partial grades published by CCs; downloaded by ESD after exam period" },
];

export const SAP_CODES = [
  { code: "ZPIQ_REP_MOD_SPAR", purpose: "Get SPAR students per course", inputs: "Academic session (P1=100, P2=200, P4=400, P5=500) + course code → Execute → scroll right" },
  { code: "ZPIQ_REP_STUD_SPAR", purpose: "Get ALL MSP SPAR students", inputs: "Execute → find student → scroll right for details. Use when individual accommodation is unclear" },
  { code: "ZPIQ_ATT_SHEET", purpose: "Generate attendance sheets", inputs: "Event type * → Enter → select exam/course → change columns 12→1 → Execute → saves to C:\\temp" },
  { code: "ZPIQ_EXPORT_APPR", purpose: "Export grading sheets to Excel", inputs: "Course code + AY + period. Do NOT tick 'Exam Only'. Fill appraiser + appraisal date" },
  { code: "ZPIQ_IMPORT_APPR", purpose: "Import completed grades from Excel", inputs: "Select file from DESKTOP (not server). Always run with 'Test' ticked first, then untick for real run" },
  { code: "ZPIQSMFU_CALC", purpose: "Calculate and publish final grades", inputs: "Course code → Students → Attendance → Grade Supervisor → Final Result → select all → calculator → Accord → Block → Save" },
  { code: "ZPIQSTFU", purpose: "Update single student grade/attendance", inputs: "Student number → AY + period → double-click course → adjust → Grade Supervisor row → Final Result → calculator → Accord → Block → Save" },
  { code: "ZPIQ_MASS_EXAM", purpose: "Register resit students", inputs: "AY = FIRST year of AY. Period = period course took place (NOT resit period). Course code → multiple selection → paste student numbers → upload → Execute → untick Test → Execute → Save" },
];

export const KEY_RULES = {
  grading: [
    "All grades on a scale of 1–10, rounded to 1 decimal (nearest decimal)",
    "Grades below 5.5 = fail on transcript",
    "⚠ CRITICAL: 5.45–5.49 rounds DOWN to 5.4 (FAIL). Do not round up to 5.5",
    "No participation or missing partial assessment = NG (not graded)",
    "Sufficient overall grade + attendance fail = fail on transcript",
    "Attendance 70–85%: student may compensate via additional assignment",
    "CC deadline: 10 working days from Friday of exam week",
    "ESD has 5 additional working days to process after CC deadline",
    "Student Portal publication deadline: 15 working days from last exam date",
    "Transcripts of all active students must be updated within 1 working day of final publication",
  ],
  exams: [
    "Final exams are standard 2 hours (UM policy). No exceptions",
    "All final exams printed by ANDIDRUK. No self-printing permitted",
    "Exam carts must be at UM Sports 90 minutes before exam start",
    "SPAR students are separate — different locations, different boxes",
    "Students cannot ask content questions during exam — exam must be triple-checked before printing",
    "Open book exam = paper documents only. No internet access",
    "Formula sheets must be included in the exam (paper) or within TestVision (digital)",
    "Cover sheet must be the first page of every paper exam",
    "Every paper exam must have 2 blank extra pages at the end",
  ],
  studentEntry: [
    "Valid UM card OR official ID/Passport required. Scans and photos not accepted",
    "Zero tolerance for lateness — doors close at exact start time",
    "No food. Drinks in sealed bottle/cup with lid only",
    "Electronic devices of any kind are not allowed (watches, earphones, phones, hats with electronics)",
    "One toilet visit per 2-hour exam at UM Sports. Not in first/last 30 min. SPAR (PHS, UNS50): up to 2 visits",
    "Students may not leave before 30 minutes after start of exam",
    "No papers of any kind may leave the exam hall",
  ],
};
