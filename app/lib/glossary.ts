// Onboarding glossary — every acronym/jargon term that shows up in MSP exam coordination.
// `aliases` are alternative spellings the auto-linker should match in text.

export type GlossaryTerm = {
  id: string;
  term: string;
  aliases?: string[];
  short: string;        // 1-line summary
  long: string;         // paragraph explanation
  category: "people" | "system" | "place" | "concept" | "document" | "rule" | "acronym";
};

export const GLOSSARY: GlossaryTerm[] = [
  // ========== PEOPLE / TEAMS ==========
  // (the OSA → ESD merge happens at the ESD entry below)
  {
    id: "boe", term: "BoE", aliases: ["Board of Examiners"], category: "people",
    short: "Board of Examiners — the formal authority that decides on exam matters.",
    long: "The Board of Examiners is the legal body that has final say over fraud cases, exemptions, accommodations, exam invalidation, and edge cases beyond standard rules. When something can't be solved by the regulations alone, it goes to the BoE. You don't decide these — you escalate.",
  },
  {
    id: "cc", term: "CC", aliases: ["Course Coordinator", "course coordinators"], category: "people",
    short: "Course Coordinator — the academic in charge of a specific course.",
    long: "Each MSP course has one Course Coordinator. They write the exam, mark it, submit grades to ESD, and respond when you send grading sheets. They also organise their own midterms (printing, invigilators) — you only handle the final exam logistics for them.",
  },
  {
    id: "ar", term: "AR", aliases: ["Anja Ronken"], category: "people",
    short: "Anja Ronken — SSC scheduler at toetsen@maastrichtuniversity.nl.",
    long: "Anja is your main contact at the Student Service Centre (SSC). She coordinates the year plan, requests final student numbers from you, arranges invigilators for the main UM Sports halls, and handles transport logistics with ANDIDRUK and UTS. Always loop her in early on changes.",
  },
  {
    id: "esd", term: "ESD", aliases: ["Educational Support Department", "Office of Student Affairs", "OSA"], category: "people",
    short: "Educational Support Department — the team you work in (formerly OSA).",
    long: "ESD (Educational Support Department) is the back-office team within MSP that handles student records, registrations, exam coordination, grading, graduation, and on-the-ground exam-day support (Heather at PHS, Gian at TestVision). It sits inside the Faculty of Science and Engineering. Your role as Exam Coordinator is part of ESD. The team was previously called OSA (Office of Student Affairs) — older documents and J-drive folders may still use the old name.",
  },
  {
    id: "dexum", term: "DEXUM", category: "people",
    short: "TestVision support team — DEXUM-UB@maastrichtuniversity.nl.",
    long: "DEXUM is the central UM team that manages TestVision. They onboard new exam coordinators, give you access to TestVision folders, run training, and help with platform issues. First point of contact when something is broken in TestVision.",
  },
  {
    id: "ds", term: "DS", aliases: ["Disability Support"], category: "people",
    short: "Disability Support — advises the BoE on adapted exam conditions.",
    long: "Disability Support assesses students with disabilities or chronic illnesses and advises the Board of Examiners on what adaptations to grant. The BoE then decides. The result is a SPAR registration that flows through to your planning overview.",
  },
  {
    id: "icts", term: "ICTS", category: "people",
    short: "Central UM IT services — at the front of exam halls during TV exams.",
    long: "ICTS supports student logins for digital exams. If a student can't log into their UM account during a TestVision exam, they go to ICTS at the front of the hall with their UM card and phone.",
  },
  {
    id: "interum", term: "InterUM", category: "people",
    short: "Invigilator agency at surveillantenrooster.interum.eu/admin.",
    long: "InterUM is the third party that supplies invigilators. You request invigilators per time slot per location (SPAR at PHS, SPAR at UNS50, resits at PHS) at least 3 weeks in advance. The system shows yellow (pending) → green (confirmed).",
  },

  // ========== SYSTEMS ==========
  {
    id: "sap", term: "SAP", category: "system",
    short: "Enterprise system used for grading, attendance, and registration.",
    long: "SAP is UM's central administration system. You use it for everything that touches student records: pulling SPAR data, generating attendance sheets, exporting grading files, importing grades, calculating final results, and registering students for resits. All the 'ZPIQ_*' transaction codes live inside SAP.",
  },
  {
    id: "testvision", term: "TestVision", aliases: ["TV"], category: "system",
    short: "Digital exam platform used at UM Sports and UNS50.",
    long: "TestVision is the platform for digital exams. CCs build their exams in it, you create folders for new courses, you monitor sessions live during exam week from the Session Dashboard, and you close sessions afterwards so CCs can grade. Login: maastrichtuniversity.testvision.nl/online/developers/.",
  },
  {
    id: "syllabus", term: "Syllabus", aliases: ["S+", "Syllabus / S+", "Syllabus/S+"], category: "system",
    short: "UM-wide scheduling system. Internet Explorer ONLY.",
    long: "Syllabus / S+ (also called Enterprise Timetabler) is where the exam schedule and midterms get published. Always run CleanEnterpriseProcessRebuildCERemoveImage from the Education server before opening it. After ANY change you must Unschedule then Reschedule and Write Back, otherwise the change won't appear in MyTimetable.",
  },
  {
    id: "andidruk", term: "ANDIDRUK", aliases: ["Andi Smart Print Solutions"], category: "system",
    short: "External printer for all final exams.",
    long: "ANDIDRUK (Andi Smart Print Solutions) prints every final exam. You upload exams + a transport overview to um.andi-printsolutions.com. UTS then transports the printed exams in secured carts from the depot to UM Sports. No self-printing, ever.",
  },
  {
    id: "qualtrics", term: "Qualtrics", category: "system",
    short: "Survey tool used to collect exam format info from CCs each period.",
    long: "Each period you send CCs a Qualtrics form asking about exam format, allowed aids (calculator model, scrap paper, notes), open or closed book, and midterm details. You then process the responses into the exam overview document. Access via Lo-FSE.",
  },
  {
    id: "mytimetable", term: "MyTimetable", category: "system",
    short: "The published timetable students and staff actually see.",
    long: "MyTimetable is the public-facing timetable. It pulls from Syllabus. If a change you made in Syllabus doesn't appear in MyTimetable, you forgot to Unschedule → Reschedule → Write Back. Wait 10–20 minutes after a change for it to propagate.",
  },
  {
    id: "canvas", term: "Canvas", category: "system",
    short: "UM's learning management system. Stores partial grades.",
    long: "CCs publish partial grades in Canvas during the course. After the exam period you download them via SIS Imported Courses → Grades → Export. Final grades come to you via the SAP grading sheet, not Canvas.",
  },
  {
    id: "uts", term: "UTS", category: "system",
    short: "Transport company that moves exam carts.",
    long: "UTS handles the secured transport of exam carts between PHS and UM Sports. The first cart is collected from PHS Thursday/Friday afternoon (~3:30pm) the week before exam week. Each subsequent cart moves the morning of its exam day.",
  },

  // ========== PLACES ==========
  {
    id: "phs", term: "PHS", aliases: ["PHS1", "Paul-Henri Spaaklaan"], category: "place",
    short: "Paul-Henri Spaaklaan 1 — your office building.",
    long: "PHS1 (Paul-Henri Spaaklaan 1) is the main MSP/FSE building. Your office is room B0.005. Cart key is in B2.007. SPAR pen-and-paper exams take place here, and resits run from B0.001.",
  },
  {
    id: "uns50", term: "UNS50", aliases: ["Universiteitssingel 50"], category: "place",
    short: "FHML building where SPAR digital exams take place.",
    long: "UNS50 (Universiteitssingel 50) is the FHML faculty building. SPAR students taking digital (TestVision) exams go to the 'Computerlandschap' there. Enter via the main South entrance: first door left, then first door right.",
  },
  {
    id: "umsports", term: "UM Sports", aliases: ["USC"], category: "place",
    short: "Main exam location for non-SPAR final exams.",
    long: "UM Sports is the big sports hall where all non-SPAR final exams happen. Students enter via the main entrance, find their fuchsia MSP block, and sit at numbered tables. Exam carts must arrive 90 minutes before exam start — non-negotiable.",
  },

  // ========== ROLES / DOCS ==========
  {
    id: "head-invigilator", term: "Head Invigilator", aliases: ["Hoofd-Surveillant"], category: "people",
    short: "The lead invigilator at UM Sports during exam week.",
    long: "The Head Invigilator runs the room on exam day at UM Sports. You provide them with the Toetsoverzicht (exam overview), block arrangements, allowed aids per exam, and a folder of supporting docs. They use the title-box-on-every-page attendance sheets you prepared.",
  },
  {
    id: "spar", term: "SPAR", category: "concept",
    short: "Students with adapted exam conditions (disability/chronic illness).",
    long: "SPAR refers to students who have been granted special exam arrangements by the Board of Examiners following advice from Disability Support. They take exams in separate rooms (PHS for paper, UNS50 for digital), often with accommodations like extra time, separate room, earplugs, or laptops. SPAR data lives in SAP — pull it with ZPIQ_REP_MOD_SPAR.",
  },
  {
    id: "cover-sheet", term: "Cover Sheet", aliases: ["CoverSheet", "Cover Sheet for Exams"], category: "document",
    short: "Standardised first page that every paper exam must have.",
    long: "Every paper exam at MSP must start with the official Cover Sheet for Exams. It's where the student writes their name and student ID. CCs are reminded to use it in the inform email at the start of the period. If a submitted exam doesn't have it, you return the exam to the CC for correction (24h turnaround).",
  },
  {
    id: "toetsoverzicht", term: "Toetsoverzicht", category: "document",
    short: "Dutch exam overview given to invigilators per period.",
    long: "The Toetsoverzicht is the per-period exam overview document, in Dutch (the language Head Invigilators use). It lists exam dates, times, courses, student counts, allowed aids, and SPAR accommodations. There's a regular version and a SPAR version — both go in the relevant boxes.",
  },
  {
    id: "irregularity-form", term: "Irregularity Report Form", aliases: ["irregularity report", "irregularity form"], category: "document",
    short: "Form for documenting fraud attempts or incidents during an exam.",
    long: "Invigilators fill out the Irregularity Report Form on the spot if they suspect fraud or witness an incident. It must be returned to OSA as the ORIGINAL (not a photocopy). It then feeds into the Board of Examiners' fraud process under EER article 5.14.",
  },
  {
    id: "jaaroverzicht", term: "Jaaroverzicht", aliases: ["year plan", "year plan form"], category: "document",
    short: "Annual exam request form sent to FSE Student Affairs in April.",
    long: "The Jaaroverzicht is the year plan form you submit to toetsen@maastrichtuniversity.nl at the beginning of April each year. You fill it in based on the frame schedules received from the MSP directors, using this year's student numbers plus 10% as the estimate. The form lives at J:\\SSC\\Planning toetsen\\Aanvraagformulier toetsen. This is one of the first things you do each calendar year — it kicks off the entire scheduling process with Anja Ronken and the SSC.",
  },
  {
    id: "frame-schedule", term: "frame schedule", category: "document",
    short: "Structural year plan agreed with GO before submitting the year plan.",
    long: "The frame schedule is the high-level outline of the next academic year — which courses run when, in which blocks. You discuss it with GO by end of March, then use it to fill the year plan request form for AR by April. Within one frame block, courses can be scheduled simultaneously.",
  },

  // ========== ACADEMIC TERMS ==========
  {
    id: "ng", term: "NG", aliases: ["Not Graded"], category: "rule",
    short: "Not Graded — used when a student didn't participate.",
    long: "NG = 'Not Graded'. Entered in the attendance column of the SAP grading sheet for any student who failed to participate in the exam (or in a required partial assessment). NG counts as a fail on the transcript. Per EER 5.2, no participation means no appraisal.",
  },
  {
    id: "rounding", term: "5.5 rounding rule", aliases: ["rounding rule"], category: "rule",
    short: "5.45–5.49 rounds DOWN to 5.4 (FAIL). Do not round up.",
    long: "The pass mark is 5.5 'without rounding'. That means a calculated grade of 5.45–5.49 rounds DOWN to 5.4 — which is below 5.5 — which is a FAIL. CCs sometimes try to round up. Catch it before importing.",
  },
  {
    id: "bsa", term: "BSA", aliases: ["nBSA"], category: "rule",
    short: "Binding Study Advice — first-year credit threshold.",
    long: "BSA is the Binding Study Advice given to first-year students. If they don't meet the credit threshold, they get a negative BSA (nBSA) and must leave the programme. Personal circumstances (illness, etc.) reported to the BoE can soften this.",
  },
  {
    id: "gpa", term: "GPA", category: "rule",
    short: "Grade Point Average — credit-weighted average shown on diploma.",
    long: "GPA is the credit-weighted average of all numerical grades on a student's transcript. Compensated failing modules ARE included; credit-transfer credits are NOT. It appears on the diploma supplement.",
  },
  {
    id: "additional-assignment", term: "additional assignment", aliases: ["compensation assignment"], category: "rule",
    short: "Make-up task for students who missed 15–30% of tutorials.",
    long: "If a student attended between 70% and 85% of tutorials, the CC may grant an additional assignment to compensate for the missed attendance. The student must submit a request form within 10 working days after the last tutorial meeting. The CC decides if the reasons are valid. If granted, the assignment must be completed within 20 working days. Until it's passed, only a provisional grade is issued — no credits. If the student missed more than 30%, no additional assignment is possible: they fail the course.",
  },
  {
    id: "waiver", term: "waiver", category: "rule",
    short: "Exception to a course prerequisite, granted by the CC.",
    long: "Some 2000-level and all 3000-level courses have prerequisites. If a student doesn't meet them, they can ask the CC for a waiver. Waivers are requested twice a year — November and May — during course registration. The student emails the CC, the CC replies with approval, and the student submits it with their course selection form. Without a waiver before the registration deadline, the student cannot register.",
  },
  {
    id: "capstone", term: "Capstone", category: "concept",
    short: "Final independent research project / thesis.",
    long: "The Capstone (or Bachelor Thesis Research at MSP) is the final-year independent research project. Assessed by at least two assessors, one of whom must be affiliated with the programme. Capstones cannot be exempted. Retained for 7 years (vs 2 for regular exams).",
  },

  // ========== PERIODS ==========
  {
    id: "periods", term: "periods", aliases: ["P1", "P2", "P3", "P4", "P5", "P6"], category: "concept",
    short: "MSP academic year = P1, P2, P3, P4, P5, P6.",
    long: "P1, P2, P4, P5 = teaching periods with final exams. P3 and P6 = resit periods. SAP session codes: P1=100, P2=200, P4=400, P5=500. Resits for P1 happen in P2, for P2 in P3, for P4 in P5, etc.",
  },
  {
    id: "t-relative", term: "T-relative", aliases: ["T −", "T -"], category: "concept",
    short: "Timing notation relative to exam week.",
    long: "Most exam-coordination tasks are scheduled relative to the exam week itself, not absolute dates. T = Monday of exam week. T−10 weeks = qualtrics + scheduling. T−2 weeks = exam check + ANDIDRUK. T−1 week = cart prep. T = exam week. T+1/2/3 = closing TV, grading sheets, processing.",
  },

  // ========== REGS ==========
  {
    id: "eer", term: "EER", aliases: ["Education and Examination Regulations"], category: "document",
    short: "Education and Examination Regulations — the legal framework.",
    long: "The EER (Education and Examination Regulations) is the formal document setting out the rules for assessment at MSP/MSLAS. It's adopted by the Faculty Board each year. The Regulations page in this app summarises the articles relevant to exam coordination.",
  },
  {
    id: "rr", term: "R&R", aliases: ["Rules and Regulations"], category: "document",
    short: "Rules and Regulations — the BoE's operational rules.",
    long: "The R&R (Rules and Regulations) is set by the Board of Examiners and contains the operational rules referred to by the EER (e.g. specific fraud measures, assessment standards). Updated yearly.",
  },
  {
    id: "ssc", term: "SSC", aliases: ["Student Service Centre"], category: "people",
    short: "Student Service Centre — central UM body for scheduling.",
    long: "The SSC handles UM-wide scheduling and exam logistics. Anja Ronken sits in the SSC. They maintain the J:\\SSC drive with year plan forms.",
  },
  {
    id: "fse", term: "FSE", aliases: ["Faculty of Science and Engineering"], category: "place",
    short: "Faculty of Science and Engineering — MSP's parent faculty.",
    long: "FSE is the Faculty of Science and Engineering. MSP sits within FSE. The MSP J-drive lives at J:\\FSE_MSP\\Secretariat\\OSA.",
  },
  {
    id: "msp", term: "MSP", aliases: ["Maastricht Science Programme"], category: "place",
    short: "Maastricht Science Programme — the bachelor programme you support.",
    long: "MSP (Maastricht Science Programme) is a small-scale liberal-arts science bachelor at Maastricht University, sitting within MSLAS (Maastricht School of Liberal Arts and Sciences) in FSE. You support its exam organisation.",
  },
];

// Build a fast lookup map (lowercased keys → term)
export const GLOSSARY_INDEX = (() => {
  const m = new Map<string, GlossaryTerm>();
  for (const t of GLOSSARY) {
    m.set(t.term.toLowerCase(), t);
    for (const a of t.aliases ?? []) m.set(a.toLowerCase(), t);
  }
  return m;
})();

// Pre-built regex matching any term/alias as a whole word.
// Longer terms first to avoid "BoE" eating "Board of Examiners".
export const GLOSSARY_REGEX = (() => {
  const all: string[] = [];
  for (const t of GLOSSARY) {
    all.push(t.term);
    for (const a of t.aliases ?? []) all.push(a);
  }
  all.sort((a, b) => b.length - a.length);
  // Escape regex special chars
  const escaped = all.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  // (?<![\w]) ... (?![\w]) approximates word boundaries that also work for terms starting/ending with non-word chars.
  return new RegExp(`(?<![\\w/])(${escaped.join("|")})(?![\\w/])`, "g");
})();

export const GLOSSARY_CATEGORIES: Record<GlossaryTerm["category"], string> = {
  people: "People & teams",
  system: "Systems",
  place: "Places & rooms",
  document: "Documents",
  concept: "Concepts",
  rule: "Rules",
  acronym: "Acronyms",
};
