export type Procedure = {
  id: string;
  title: string;
  section: "Annual" | "Per-Period" | "Exams" | "Grading" | "Resit" | "Syllabus";
  intro?: string;
  steps: { title: string; bullets: string[] }[];
  warnings?: string[];
};

export const PROCEDURES: Procedure[] = [
  {
    id: "4.1", title: "Creating the Year Plan", section: "Annual",
    intro: "Done once per year, in early spring. Takes ~1 hour. Access to J:\\SSC required. Contact: Anja Ronken.",
    steps: [
      { title: "Receive the request form", bullets: [
        "In February you receive an email from toetsen@maastrichtuniversity.nl",
        "It includes the draft request form for next AY exams",
        "Deadline for submission: April",
        "Form location: J:\\SSC\\Planning toetsen\\Aanvraagformulier toetsen",
      ]},
      { title: "Complete the form", bullets: [
        "Fill in based on the new frame schedules you should have received from the MSP directors",
        "Discuss frame schedule with GO — needs to be provided by end of March",
        "Within the frame schedule: everything in one block can be scheduled simultaneously",
        "First preference = Mon 9am (mandatory). Second preference = Mon afternoon",
        "Total student numbers = this year's enrolment + 10% (to account for growth)",
        "Column H: indicate if exam is in TestVision (based on last AY — can change)",
      ]},
      { title: "Submit to FSE Student Affairs", bullets: [
        "Email completed Jaaroverzicht to toetsen@maastrichtuniversity.nl by beginning of April",
        "Form location: J:\\SSC\\Planning toetsen\\Aanvraagformulier toetsen",
      ]},
    ],
  },
  {
    id: "4.2", title: "Schedule Check (Qualtrics)", section: "Per-Period",
    intro: "Per period. Gathers exam format details from Course Coordinators. Note: can differ from year plan.",
    steps: [
      { title: "Send Qualtrics link to CCs", bullets: [
        "Access: library.maastrichtuniversity.nl/apps-tools/qualtrics/",
        "Send link to all CCs with clear deadline",
        "Midterm questions: when, replaces a teaching activity?, duration, format",
        "Final exam questions: format, allowed aids (BE SPECIFIC: calculator model, A5 scrap, notes), open or closed book",
        "No duration question for finals — UM policy is standard 2 hours",
      ]},
      { title: "Process responses", bullets: [
        "Enter info into the exam overview document",
        "EN file: J:\\FSE_MSP\\Secretariat\\ESD\\13. Scheduling P4\\…\\Overview mid-terms and exams Period 4",
        "NL file: Toetsoverzicht MSP Final Exams P4 incl aantallen en bijzonderheden",
        "Column J = allowed aids (provided to Head Invigilators)",
        "Run ZPIQ_REP_MOD_SPAR in SAP. Sessions: P1=100, P2=200, P4=400, P5=500",
        "If unclear: run ZPIQ_REP_STUD_SPAR",
      ]},
      { title: "Inform AR of changes", bullets: [
        "Inform Anja Ronken of any change vs year plan. AR confirms feasibility — rescheduling may happen here.",
      ]},
    ],
    warnings: ["CHECK before sending. AR confirms if the change is possible."],
  },
  {
    id: "4.3", title: "Inform Course Coordinators", section: "Per-Period",
    intro: "Send at start of each period. ALWAYS attach: Cover Sheet for Exams + Allowed Calculators List.",
    steps: [
      { title: "Prepare attachments", bullets: [
        "Cover Sheet: J:\\…\\CoverSheet Exam MSP.docx",
        "Calculator List: MSP Allowed Calculators List.pdf",
      ]},
      { title: "Send email", bullets: [
        "Use template in Templates page",
        "Address to all P[X] CCs of FSE-MSP",
        "Submission deadline: Mon 2 weeks before exam week",
        "TestVision ready deadline: same",
      ]},
    ],
  },
  {
    id: "4.4", title: "Exam Schedule in Syllabus / S+", section: "Syllabus",
    intro: "UM-wide system. Internet Explorer ONLY. Full guidance in the Syllabus Manual procedures.",
    steps: [
      { title: "Enter the schedule", bullets: [
        "URL: http://syllabus.unimaas.nl/Scientia/Portal/Login.aspx",
        "Before opening: run CleanEnterpriseProcessRebuildCERemoveImage from Education server",
        "Log in → select correct AY → Enterprise Timetabler",
        "PROGRAMMES > year > semester > Courses > MSP",
      ]},
      { title: "Publish", bullets: [
        "Publish on UM-wide publication deadline (UM Calendar)",
        "Use tag 'My Timetable' (not draft) on go-live",
        "Use 'Published' tag once per course on the first lecture where all students allocated",
      ]},
    ],
    warnings: ["Always Modify + Write Back (WB) after any change. After any change: Unschedule then Reschedule, otherwise it won't appear in MyTimetable."],
  },
  {
    id: "4.5", title: "Create TestVision Folders", section: "Exams",
    intro: "Only for courses that have never had a TestVision exam before. Contact DEXUM for access first.",
    steps: [
      { title: "Create folders", bullets: [
        "Login: maastrichtuniversity.testvision.nl/online/developers/",
        "Tests Folder → 3 dots → New Folder → 'COURSECODE – Course Name'",
        "Repeat for Questions Folder",
      ]},
      { title: "Link CC to folders", bullets: [
        "Management → Developers and Domain → 'link to role' → 'All Developers'",
        "CC name → Roles → Add → role CC",
        "Dropdown next to CC → plus → 'top' dropdown → MSP → specific course → Add",
        "Do this for BOTH Questions and Tests folders",
      ]},
    ],
  },
  {
    id: "4.6", title: "Final Student Numbers", section: "Per-Period",
    steps: [
      { title: "Get SPAR count", bullets: [
        "Run ZPIQ_REP_MOD_SPAR. Session: P1=100, P2=200, P4=400, P5=500",
        "Module code → Execute → scroll right",
      ]},
      { title: "Calculate and submit", bullets: [
        "Number to submit = Total enrolled MINUS SPAR",
        "Enter in column B of overview file",
        "Copy A & B into email to toetsen@maastrichtuniversity.nl",
      ]},
    ],
  },
  {
    id: "4.7", title: "ESD Availability", section: "Per-Period",
    intro: "ESD = Education Support Department (Heather for PHS, Gian for TestVision).",
    steps: [
      { title: "PHS briefing (Heather)", bullets: [
        "Identify who is needed at PHS and when",
        "Detailed overview with times and locations per slot. Mark deviations in red",
      ]},
      { title: "TestVision briefing (Gian)", bullets: [
        "Identify who is needed at UNS50 and when",
        "Provide overview + the TV exam checklist",
      ]},
    ],
  },
  {
    id: "4.8", title: "Request Invigilators", section: "Per-Period",
    intro: "Request at least 3 weeks in advance. AR (SSC) does final exams at UM Sports. YOU do SPAR at PHS, SPAR at UNS50, and resits at PHS. CCs do their own midterms.",
    steps: [
      { title: "Create request", bullets: [
        "Login: surveillantenrooster.interum.eu/admin",
        "Tentamens → New → fill form",
        "Request per TIME SLOT and per LOCATION (not per individual exam)",
        "Usually 1 invigilator per SPAR room per slot",
        "Invigilator present 30 min before, 15 min after",
        "Opmerkingen: report to B0.005",
        "Save → overview shows status (yellow=pending, green=confirmed)",
      ]},
      { title: "Track", bullets: [
        "Once names confirmed, update your own Excel doc",
      ]},
    ],
  },
  {
    id: "4.9", title: "Request and Check Exams from CCs", section: "Exams",
    steps: [
      { title: "Reminder email", bullets: [
        "Deadline: Mon 2 weeks before exam week",
        "Include cover sheet attachment + deadline",
      ]},
      { title: "Check exams", bullets: [
        "Cover sheet present as FIRST page",
        "Enough writing/answering space throughout",
        "Two blank pages at the very end",
      ]},
      { title: "Return non-compliant", bullets: [
        "CC must return corrected within 24 hours",
      ]},
    ],
    warnings: ["Printing order goes out the DAY AFTER submission deadline — no time to waste."],
  },
  {
    id: "4.10", title: "Exam Printing Order (ANDIDRUK)", section: "Exams",
    intro: "Final exams + SPAR final exams only. NOT resits or midterms.",
    steps: [
      { title: "Upload exams", bullets: [
        "Source: J:\\…\\Submitted Final Exams",
        "Go to: https://um.andi-printsolutions.com",
        "Drag each exam file individually",
        "With FIRST exam only: also upload transport overview",
        "Email transport overview to AR / toetsen@",
      ]},
      { title: "ANDIDRUK form per exam", bullets: [
        "Omschrijving = course code",
        "Te bestellen aantal = copies",
        "Sort = 'enkele niet'",
        "Bedrukking = dubbelzijdig (unless otherwise)",
        "Eindformaat = A4 Staand",
        "Kleur = Kleuren Print, Kleur Papier = Wit",
        "A3 must be a separate order",
      ]},
      { title: "Delivery details", bullets: [
        "Toets(week)code = MSP+week+year (e.g. MSP40-25)",
        "Afleveradres = FSE/MSP",
        "Aantal transportgangen Container = usually 4",
        "Spoed = No",
        "Afleverdatum = Tue before exam week, as early as possible",
        "Opmerkingen productie = Piles of 50 (UM Sports blocks are 50, not 60)",
      ]},
      { title: "Transport logistics", bullets: [
        "1 cart = 1 exam day",
        "Cart from Depot 7am → UM Sports",
        "After exam: collected, brought to PHS (~30 min after)",
        "Next day's cart must also be ready at this point",
        "First collection: Thu/Fri before exam week ~3:30pm",
      ]},
    ],
    warnings: ["Exam carts must be at UM Sports 90 minutes before exam start. Non-negotiable.", "No self-printing or self-transport. Ever."],
  },
  {
    id: "4.11", title: "Run and Send Grading Sheets", section: "Grading",
    steps: [
      { title: "Run in SAP", bullets: ["Use ZPIQ_EXPORT_APPR (full process in Section 6)"]},
      { title: "Email to CCs", bullets: [
        "Email ALL CCs — including non-exam courses and practical coordinators",
        "Use Grading Sheets template from Templates page",
      ]},
    ],
  },
  {
    id: "4.12", title: "Run Attendance Sheets", section: "Per-Period",
    steps: [
      { title: "Generate in SAP", bullets: [
        "ZPIQ_ATT_SHEET",
        "Event type * → Enter → select exam/course code",
        "Change columns 12 → 1",
        "Execute → saves to C:\\temp",
      ]},
      { title: "Format for UM Sports", bullets: [
        "Transfer raw export into formatted sheet (rows + chair numbers)",
        "Includes UM card check, total sheet count, student signature",
        "Document prints title boxes on every page (Head Invigilator requirement)",
      ]},
      { title: "SPAR attendance", bullets: [
        "Keep raw SAP export as-is",
        "Column K: enter accommodation after student signature",
      ]},
    ],
  },
  {
    id: "4.13", title: "Prepare the Exam Carts", section: "Exams",
    intro: "Cart key in B2.007.",
    steps: [
      { title: "Load exam boxes", bullets: [
        "1 box = 1 course in 1 block",
        "Each box: exams, 2 attendance sheets per block, counted scrap paper",
        "Sticker label per box",
      ]},
      { title: "Stationery boxes", bullets: [
        "1 per block + 1 Head Invigilator + 1 SPAR",
        "Each: 5 pens, 5 calculators, calculator list, stapler/staples, tape, marker, post-its, elastic bands, 2 plastic folders",
      ]},
      { title: "Cardboard box", bullets: ["MSP signs, block numbers, block arrangements, block signs"]},
      { title: "Head Invigilator folder", bullets: ["Update per period"]},
      { title: "Transport overview", bullets: ["Print and tape to TOP of each cart"]},
      { title: "Additional", bullets: ["Spare scrap paper box in every cart", "Calculator box in cart"]},
    ],
  },
  {
    id: "4.14", title: "SPAR Exams — PHS and TestVision", section: "Exams",
    steps: [
      { title: "PHS SPAR box", bullets: [
        "Exams (SPAR count)",
        "Attendance sheets with accommodations after names",
        "WC phone: +31 6 346 400 43",
        "Sufficient scrap paper",
        "Irregularity report form",
        "Printed SPAR overview (Toetsoverzicht)",
        "Stationery box",
        "Clock",
        "Earplugs / laptop / other accommodations as needed",
      ]},
      { title: "TV SPAR box (UNS50)", bullets: [
        "Attendance sheets (TV SPAR only)",
        "Scrap paper",
        "Printed Password Reset Flyer",
        "Printed UNS50 Checklist",
        "Printed SPAR overview",
        "Stationery box",
        "Earplugs if needed",
      ]},
    ],
  },
  {
    id: "4.15", title: "Monitoring TestVision Exams", section: "Exams",
    steps: [
      { title: "Set up", bullets: [
        "Login: maastrichtuniversity.testvision.nl/online/developers/",
        "Home → Session Dashboard → click session → add tests",
      ]},
      { title: "Monitor", bullets: [
        "Live overview per student",
        "System error: add minutes to that student directly from dashboard",
      ]},
    ],
  },
  {
    id: "4.16", title: "Closing TestVision Sessions", section: "Exams",
    intro: "Closing sessions allows CCs to view/edit grading criteria after exam.",
    steps: [
      { title: "Close", bullets: [
        "Dashboard → Sessions → period folder",
        "Switch off slider AND click X to close each session",
      ]},
    ],
  },
  {
    id: "4.17", title: "Midterm Procedure", section: "Per-Period",
    intro: "CCs handle most of midterms themselves. Your job: attendance sheets + briefing email.",
    steps: [
      { title: "Run attendance sheets", bullets: ["BEFORE the email goes out (ZPIQ_ATT_SHEET)"]},
      { title: "Send midterm briefing", bullets: [
        "Send 1 week before midterms",
        "Include: attendance sheets, request for invigilator names, irregularity form, WC phone",
        "WC SMS: +31 6 346 400 43",
        "ESD available at PHS during midterms to escort to toilet",
        "Print irregularity form 2× per room",
        "Return ORIGINAL irregularity forms to ESD (not copies)",
      ]},
    ],
  },
  {
    id: "4.18", title: "Resit Planning", section: "Resit",
    intro: "Resit invigilators ≥ 3 weeks in advance. ESD coverage may be needed.",
    steps: [
      { title: "Draft resit schedule", bullets: [
        "Excel based on frame schedule",
        "Regular students: B0.001",
        "SPAR students: tutorial room(s)",
        "TestVision resits: book a computer room",
        "Check for SPAR students among resit students",
        "Enter in Syllabus (same process)",
      ]},
      { title: "Register in SAP (ZPIQ_MASS_EXAM)", bullets: [
        "AY = FIRST year of AY (e.g. 2024 for AY 2024-2025)",
        "Period = period course took place (NOT resit period)",
        "e.g. course in P5, resit in P6 → enter P5",
        "Multiple Selection → paste student numbers → upload from clipboard",
        "Auto-tick: 'Register for exam/resit'. UN-tick 'Test'",
        "Execute → Close pop-up → Select all → Save",
      ]},
      { title: "One week before resit week", bullets: [
        "Print exams, attendance sheets, block signs",
        "Send grading sheets to CCs",
      ]},
      { title: "Prepare boxes", bullets: ["Same as procedure 4.14. Regular resits: B0.001"]},
      { title: "Process resit grades", bullets: [
        "After resit week: process new grades in SAP",
        "Update grading overview",
        "Reply to CCs",
      ]},
    ],
  },
  // ---- Section 6: SAP Grading ----
  {
    id: "6.1", title: "General Grading Rules", section: "Grading",
    intro: "Check & update yearly after new EER and R&R has been set.",
    steps: [
      { title: "Rules", bullets: [
        "All grades 1–10, rounded to 1 decimal",
        "Below 5.5 = fail. 5.45–5.49 rounds DOWN (FAIL)",
        "No participation / missing partial = NG",
        "Sufficient grade + attendance fail = fail",
        "Attendance 70–85%: compensation possible via additional assignment",
        "CC deadline: 10 working days from Friday of exam week",
        "ESD: 5 additional working days to process",
        "Student Portal publication: 15 working days from last exam",
        "Transcripts updated within 1 working day of final publication",
      ]},
    ],
    warnings: ["5.45–5.49 rounds DOWN to 5.4 — FAIL. Do not round up."],
  },
  {
    id: "6.2", title: "Reminder Schedule for Late Grades", section: "Grading",
    steps: [
      { title: "Cadence", bullets: [
        "1 day before CC's 10-wd deadline → first reminder",
        "2–3 days after CC deadline → second reminder",
        "After 15-wd ESD deadline → final reminder on behalf of Leon de Windt (ask permission first)",
        "Late entries: discuss with team and Board of Examiners",
      ]},
    ],
  },
  {
    id: "6.3", title: "Preparing the Grading File (ZPIQ_EXPORT_APPR)", section: "Grading",
    steps: [
      { title: "Export to Excel", bullets: [
        "ZPIQ_EXPORT_APPR",
        "Course code, AY, period",
        "Do NOT tick 'Exam Only'",
        "Appraiser + appraisal date: exact exam date for ESD exams; last Friday of exam week for others; resits → exact date or last date of resit period",
        "Execute → C:\\TEMP",
        "Copy CSV to applicable J-drive folder",
        "Email instructions + deadline to CC. Attach empty Excel + SAP manual",
      ]},
    ],
    warnings: ["To update appraiser: contact Eva Nelissen."],
  },
  {
    id: "6.4", title: "Checking the Received Excel", section: "Grading",
    steps: [
      { title: "Validate", bullets: [
        "Attendance column: P, F, or NG",
        "Grades: rounded to 1 decimal",
        "If wrong: email CC with instructions",
        "Save to J-drive AND local desktop (import must be from local)",
      ]},
    ],
  },
  {
    id: "6.5", title: "Importing Grades (ZPIQ_IMPORT_APPR)", section: "Grading",
    steps: [
      { title: "Simulation run", bullets: [
        "ZPIQ_IMPORT_APPR",
        "Input File from DESKTOP folder",
        "Leave 'Test' ticked → Execute (simulation)",
        "If errors: correct Excel before continuing",
      ]},
      { title: "Official run", bullets: [
        "Untick 'Test' → Execute. Grades now saved.",
      ]},
    ],
  },
  {
    id: "6.6", title: "Calculating and Publishing Final Grades (ZPIQSMFU_CALC)", section: "Grading",
    steps: [
      { title: "Run", bullets: [
        "ZPIQSMFU_CALC, fill course code (AY/session auto-fill)",
        "Students → Attendance → Grade Supervisor → Final Result (verify each)",
        "Select all students → calculator icon → Accord → Block → Save",
        "Published in Student Portal. Update resit overview.",
      ]},
    ],
  },
  {
    id: "6.7", title: "Updating a Single Student (ZPIQSTFU)", section: "Grading",
    steps: [
      { title: "Update", bullets: [
        "ZPIQSTFU → student number → AY + period → Search",
        "Double-click course → adjust attendance + Grade Symbol",
        "Grade in Grade Supervisor row → select Final Result",
        "Calculator → select all → Accord → Block → Save",
      ]},
    ],
  },
  {
    id: "6.8", title: "Downloading Partial Grades from Canvas", section: "Grading",
    steps: [
      { title: "Export", bullets: [
        "Canvas → SIS Imported courses → select course",
        "Grades → Actions → Export → CSV",
        "Open from Downloads → select column A",
        "If all in one column: Text to Columns → Delimited → Comma → Finish",
        "Final grades column shows 2 decimals — paste into SAP file and round to 1 decimal",
        "If partial grades not published in Canvas: email CC",
      ]},
    ],
  },
  // Syllabus
  {
    id: "5.4", title: "Syllabus: Creating / Editing a Schedule Entry", section: "Syllabus",
    steps: [
      { title: "Set up activity", bullets: [
        "Find course in PROGRAMMES → select template → Duplicate (do NOT overwrite parent 'moeder')",
        "ID tab: Duration (15-min increments), Day, Suggested time, Planned size",
        "Name the activity (e.g. 'do 21.12')",
        "Modify → WB to save",
      ]},
      { title: "Set availability", bullets: [
        "Availability tab → select weeks (Ctrl multi-select)",
        "To extend: top-right box in ID screen → Availability: period (none) → extend → Modify + WB",
      ]},
      { title: "Assign resources", bullets: [
        "Resource tab → select lecturer (not all are in Syllabus — that's OK)",
        "Check room availability via Timetable view (top right) → tick room",
        "SBE rooms: choose SBE in top-left dropdown. Only bookable max 2 weeks before block start",
        "Modify + WB. Locations + staff must be 'preset'",
      ]},
      { title: "Schedule", bullets: [
        "Planning → double-click → Timetab → click grey block(s)",
        "Diamond/rhombus = constraints satisfied → Schedule",
        "If not: uncheck constraints → choose block → Schedule → re-check → WB",
        "Tags: 'My draft Timetable' before go-live, 'My Timetable' on go-live",
        "'Published' tag: ONCE per course on first lecture where ALL students allocated",
      ]},
      { title: "Allocate students", bullets: [
        "Allocate tab → double-click activity column or use Allocate button",
        "2 groups: split list upper/lower half → WB",
        "Greyed-out student: Planning → Unschedule → allocate → reschedule",
      ]},
    ],
    warnings: ["Internet Explorer ONLY. Run CleanEnterpriseProcessRebuildCERemoveImage from Education server before opening."],
  },
  {
    id: "5.5", title: "Syllabus: Making Changes", section: "Syllabus",
    steps: [
      { title: "Remove a date", bullets: [
        "Select template (optionally rename)",
        "Availability → remove week (Ctrl)",
        "Planning → Unschedule all → Reschedule",
        "SBE rooms removed immediately. SSC rooms: remove via Outlook",
      ]},
      { title: "Add a date", bullets: [
        "Availability → add week",
        "Planning → Unschedule all → Reschedule",
        "Don't forget to book the room!",
      ]},
      { title: "All other changes", bullets: [
        "Always Unschedule → Reschedule otherwise it won't appear in MyTimetable",
      ]},
    ],
  },
];
