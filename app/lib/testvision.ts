// TestVision workflow data — derived from DexUM manual + exam coordinator workflow summary.

export type TVPhase = {
  id: string;
  marker: string;
  title: string;
  tagline: string;
  when: string;
  steps: TVStep[];
};

export type TVStep = {
  id: string;
  title: string;
  intro?: string;
  bullets: string[];
  warning?: string;
  tip?: string;
};

export const TV_PHASES: TVPhase[] = [
  {
    id: "setup", marker: "01", title: "Setup", tagline: "Folders, imports, and access", when: "2–3 weeks before exam",
    steps: [
      {
        id: "folders", title: "Check / create TestVision folders",
        intro: "Most folders exist from previous years, but always verify CCs can access BEFORE they try to upload at the deadline.",
        bullets: [
          "Check if course folder exists: TestVision → Tests → [Course folder]",
          "If missing: create folder (three dots → New Folder → 'COURSECODE – Course Name')",
          "Create both a Tests folder AND a Questions folder",
          "Give the CC access immediately: Management → Developers and Domain → link CC to both folders",
          "Contact DEXUM (dexum-ub@maastrichtuniversity.nl) if you need access or training yourself",
        ],
        warning: "This prevents situations where CCs discover they have no access at deadline. Verify 2 weeks before.",
      },
      {
        id: "import", title: "Import sessions from SAP via DexUM Portal",
        intro: "This is the automated step that does most of the work. The DexUM Portal pulls student data from SAP and creates sessions in TestVision.",
        bullets: [
          "Log into DexUM Portal: https://dexumportal.library.maastrichtuniversity.nl/",
          "Must be on UM network or VPN. Uses UM Single Sign-On with MFA",
          "Select course codes for the period and click Import",
          "The portal automatically creates 2 sessions per course:",
          "→ [COURSECODE]_[YEAR]_[PERIOD] — regular students",
          "→ [COURSECODE]_[YEAR]_[PERIOD]_SA — SPAR students with +30 min extra time",
          "It also creates/updates student accounts and assigns them to the correct session",
          "SPAR students with a valid time-related SPAR provision in SAP get the extra-time flag automatically",
          "Wait for import to complete (status indicator turns green)",
        ],
        tip: "SAP is the source of truth. If a student's SPAR provision start date is after the block start, it won't activate automatically — check manually.",
        warning: "If you re-import, the portal overwrites the existing session. Manual changes you made in TestVision will be reset.",
      },
      {
        id: "verify-import", title: "Verify the import in TestVision",
        intro: "After importing, check in TestVision that everything landed correctly.",
        bullets: [
          "Go to Sessions in TestVision — find the folder [Academic Year] → [Period]",
          "You should see 2 sessions per course: regular and _SA (SPAR)",
          "Click the 'i' icon to quickly check student counts per session",
          "The SA session should have 30 minutes extra time pre-set",
          "Do NOT create subfolders inside the import folder structure — the portal won't find them on re-import",
        ],
      },
    ],
  },
  {
    id: "configure", marker: "02", title: "Configure", tagline: "Session settings, security, test linking", when: "After import, before exam",
    steps: [
      {
        id: "general-tab", title: "Tab: Algemeen / General",
        intro: "Configure the display name, timing, and availability for each session (regular + SPAR).",
        bullets: [
          "Display name: include course code + title. For SPAR: also add the extra minutes (e.g. '+30 min')",
          "Skin: select 'MU standaard'",
          "Max test duration: usually set by CC in the test itself — verify it's correct",
          "Extension factor: leave at 1.0 (only change in emergencies)",
          "Extra time: 30 min for SPAR sessions (auto-set by import). Adjust if a student needs 45 or 60 min",
          "Attempts: set to 1",
          "Availability period: start time = exam time from schedule, end time = start + duration + extra time (SPAR) + 15 min buffer",
          "Show exclusively: check this — hides other exams from 30 min before start",
        ],
        warning: "Always add 15 minutes buffer to the end time. If a Chromebook needs replacing, the student can still finish within the availability window.",
      },
      {
        id: "security-tab", title: "Tab: Beveiliging / Control",
        intro: "Set the correct security for the exam location. You cannot mix security types in one session.",
        bullets: [
          "Postpone results processing: should be ON with 30-minute delay (default). This lets you put a student back if they accidentally click 'Ready'",
          "For UM Sports (Chromebooks): check 'IP check session' → select 'UMExam Wi-Fi'",
          "For UNS50 (computer rooms / SPAR): check 'Safe Exam Browser' → select 'VDIdefault'",
          "You CANNOT combine IP check + SEB in one session — if you need both locations, create separate sessions",
          "SEB can only be used at UNS50/UNS40 computer rooms",
          "SEB limitations: no text-to-speech, no video playback, no spell check",
          "If using SEB outside exam weeks: email servicedesk-icts@maastrichtuniversity.nl at least 2 weeks before",
        ],
        warning: "Wrong wifi setting = students locked out of their exam. Double-check: UM Sports = UMExam Wi-Fi, UNS50 = VDIdefault.",
      },
      {
        id: "add-test", title: "Add the test to the session",
        bullets: [
          "Click the (+) Test icon in the session",
          "Navigate to the test folder and select the correct test version",
          "Verify the test template shows minimal info — usually 'MU Standard Safe Template'",
          "The test template controls what students see during and after the exam",
          "For summative exams: show as little as possible on the results page to avoid unrest in the hall",
          "If the test bar appears ORANGE: the CC has modified the test but it hasn't been republished in the session",
        ],
        tip: "The Tab Inzage/Review and Tab Beoordelen/Grade can be configured after the exam — no need to set them up now.",
      },
      {
        id: "candidates", title: "Verify candidates",
        bullets: [
          "Regular session: should only have students WITHOUT the extra-time (⏱) symbol",
          "SPAR session (_SA): should only have students WITH the extra-time symbol",
          "Check student count matches your expectations",
          "If a student is in the wrong session: remove from incorrect, add to correct (don't forget to save)",
          "Students with non-time SPAR (e.g. separate room only) CAN be in the _SA session — they won't get extra time if the flag isn't set",
        ],
      },
    ],
  },
  {
    id: "spar", marker: "03", title: "SPAR in TestVision", tagline: "Special arrangements for digital exams", when: "During configuration",
    steps: [
      {
        id: "spar-types", title: "Types of SPAR in TestVision",
        intro: "Four special arrangements can be configured digitally. Other SPAR needs (separate room, own mouse) are handled logistically, not in TestVision.",
        bullets: [
          "Extra time — auto-imported from SAP. Default +30 min. Adjustable per student",
          "Text-to-speech (voorleessoftware) — you tick 'Text-to-speech' for the student AND email DEXUM with the student number (no medical info in the email!). Student practices at https://umlib.nl/readaloud-exams",
          "Spell check — can be set per-student or per-test. Per-student: open candidate → tick 'Spell check'. The student sees it in every test",
          "Paper supplement (Toets op papier) — tick 'Test on paper' for the student. They get a printed version matching their randomised digital exam. Answers must still be entered digitally",
        ],
        warning: "If 'Test on Paper' is ticked, the student sees a pop-up at exam start. You MUST have the printed version ready — otherwise the student panics.",
      },
      {
        id: "spar-paper", title: "Printing paper supplements",
        bullets: [
          "When students with 'Test on Paper' are in a session, a RED warning appears above the candidate list",
          "Click '...' → 'Test on Paper' → 'Generate PDF' to create per-student PDFs",
          "After generating, the red warning disappears and each candidate gets a ✓",
          "If the CC modifies and republishes the test: all prints become invalid — you must regenerate. A '!' appears in the column",
          "The student compares version codes on the pop-up with the printed copy before starting",
        ],
      },
      {
        id: "spar-tts", title: "Text-to-speech setup",
        bullets: [
          "Students with TTS should be in the SPAR session (_SA), but the session MUST be set to Chromebooks (UMExam Wi-Fi), not Safe Exam Browser",
          "If the SPAR session uses SEB: create a separate session with suffix _RA, set to Chromebooks",
          "These students probably also get extra time — make sure it's set on the new session",
          "They get a special Chromebook with audio profile enabled + headphones + separate mouse",
          "Seat them at some distance from other students",
        ],
      },
    ],
  },
  {
    id: "pre-exam", marker: "04", title: "Pre-exam checks", tagline: "Day before — turn on and verify", when: "Day before exam, by 9:00 AM",
    steps: [
      {
        id: "turn-on", title: "Turn sessions ON",
        intro: "Sessions must be on by 9:00 AM the day before the exam so DEXUM can run their checks.",
        bullets: [
          "Go to Sessions → toggle the session to 'AAN / ON'",
          "The session turns green",
          "Students can now see the exam in their list (but can't start until the availability period)",
          "Students see the exam from 1 week before the availability period starts",
          "'Show exclusively' activates 30 min before start — hiding all other exams",
        ],
      },
      {
        id: "final-checks", title: "Final verification checklist",
        intro: "Run through the DEXUM checklist. They check too during exam weeks, but you should catch issues first.",
        bullets: [
          "Course code in session name matches test name AND display name",
          "Test bar is NOT orange (orange = test changed but not updated in session)",
          "Skin = MU standaard",
          "Max test duration correct",
          "Extension factor = 1",
          "Extra time correct (30 min for SPAR, or adjusted)",
          "Attempts = 1",
          "Availability period: start matches SSC schedule, end includes extra time + 15 min buffer",
          "Show exclusively = checked",
          "Postpone results processing = checked",
          "Security: UMExam Wi-Fi (UM Sports) or VDIdefault (UNS50)",
          "Regular session: no students with ⏱ symbol. SPAR session: only students with ⏱",
        ],
        tip: "During exam weeks DEXUM checks all sessions the day before. Outside exam weeks: request a check by emailing dexum-ub@maastrichtuniversity.nl.",
      },
    ],
  },
  {
    id: "exam-day", marker: "05", title: "Exam day", tagline: "Monitor, intervene, close", when: "During and after the exam",
    steps: [
      {
        id: "monitor", title: "Monitor via the Session Dashboard",
        intro: "TestVision has a live dashboard showing all active sessions. Open it from the main menu → Session Dashboard.",
        bullets: [
          "Add up to 25 sessions to the dashboard view",
          "See per-student status: not started, in progress, completed",
          "If a '!!!' appears in the Problems column: something is wrong with that session",
          "You can send a broadcast message to all students in a session (appears as pop-up in their exam)",
          "You can add extra time per session or per individual student",
          "You can put a student back in if they accidentally clicked 'Ready' (within the 30-min postpone window)",
        ],
        warning: "No wifi? Call Team Netwerken immediately: 043-388 5500. TestVision issue? Call DEXUM emergency: 088-388 6390 (staffed during exam weeks).",
      },
      {
        id: "extra-time-emergency", title: "Adding extra time in emergencies",
        intro: "If something goes wrong (Chromebook crash, network issues), you can extend time from the dashboard.",
        bullets: [
          "Session level: click '...' → 'Change time settings' → adjust Extension factor (e.g. 1.25 = 25% more time). Also extend the Availability period!",
          "Student level: click '...' next to the student → 'Set extra time' → enter minutes. This auto-extends the student's availability period",
          "SPAR extra time is NOT affected by the extension factor — it stays fixed",
          "Extension factor multiplies the base test time for all students in the session",
        ],
      },
      {
        id: "wrong-test", title: "Replacing a wrong test (emergency)",
        intro: "If the wrong exam is attached to the session. Two scenarios:",
        bullets: [
          "Students NOT started yet: turn session OFF → open session → swap the test → turn back ON. Extend availability if >15 min lost",
          "Students ALREADY started: turn session OFF → send broadcast telling students to close → COPY the session → swap test in the copy → check student counts match → turn copy ON → send second broadcast → extend time if needed",
          "Also do this for the _SA and any _RA sessions",
        ],
        warning: "This is a nightmare scenario. Stay calm, follow the steps. DEXUM can help — call 088-388 6390.",
      },
      {
        id: "close", title: "Close sessions after the exam",
        intro: "After all students have finished, close the sessions so grading can begin.",
        bullets: [
          "Toggle session to 'UIT / OFF' — students can no longer take the exam",
          "Then click to close (Afgesloten) — session is locked for grading",
          "OFF ≠ Closed. OFF means 'can't take exam'. Closed means 'ready for grading, can't reopen'",
          "If a student is still showing as 'Busy' and you can't close: go to Dashboard → click '...' next to student → 'Finalise session'. Or: Sessions → Results → select student → click 'Stop'",
          "This happens when a student closes the browser without clicking 'Ready' — TestVision keeps them as active for 30 days otherwise",
        ],
      },
    ],
  },
  {
    id: "post-exam", marker: "06", title: "Post-exam", tagline: "Grading access, reviews, troubleshooting", when: "After exam week",
    steps: [
      {
        id: "grading-setup", title: "Enable grading for CCs",
        intro: "CCs can't grade unless they're set as Grading Coordinator. The first person who attaches a test to a session becomes the coordinator by default — that's usually you, not the CC.",
        bullets: [
          "Go to Test → Results → Grading tab",
          "Check who is Grading Coordinator — if it's you, add the CC",
          "Also add your fellow exam coordinators as grading coordinators (backup)",
          "Save",
          "Ask the CC to verify they can see and open student submissions",
        ],
        warning: "'CC says they can't see the exam': check grading coordinator role, check developer role in domain, check test is in the correct folder.",
      },
      {
        id: "review", title: "Set up student review (inzage)",
        intro: "After grading is complete and results are published. The review lets students see their evaluated work.",
        bullets: [
          "Go to Session → Inzage/Review tab",
          "Click 'Inzage plannen / Plan Review'",
          "Select First review or Second review",
          "Set date/time window",
          "Set security (usually none, or UMExam Wi-Fi if on Chromebooks)",
          "Choose what students can see: their answers, correct answers, CC feedback, points per question",
          "Assign all candidates (or individual students)",
          "Save — the review is now scheduled",
          "First review: student comments are anonymous. After second review: names are visible",
          "A review can be re-opened as long as the assessor hasn't commented yet",
        ],
        tip: "Need a third review? Reuse the first review slot (change date/settings) BEFORE the assessor comments. Once they comment, the first review locks permanently.",
      },
      {
        id: "results-hold", title: "Holding back individual results",
        intro: "Sometimes the BoE requires that a specific student's result is not published.",
        bullets: [
          "Go to Sessions → open the session → Results",
          "Find the student and click on their result status",
          "Set it to 'Ongeldig / Invalid' — the result won't be shown to the student",
          "When it can be released: set it back to 'Geldig / Valid'",
        ],
      },
    ],
  },
];

export const TV_CONTACTS = [
  { label: "DEXUM (Team Digital Exams)", value: "dexum-ub@maastrichtuniversity.nl", note: "Access, training, session checks, all questions" },
  { label: "DEXUM emergency (exam weeks)", value: "088-388 6390", note: "Staffed during all exam sessions" },
  { label: "VDI / ICTS (UNS50 computer issues)", value: "043-388 3400", note: "VDI login problems, computer crashes" },
  { label: "Team Netwerken (wifi issues)", value: "043-388 5500", note: "UMExam Wi-Fi down, no connectivity" },
  { label: "DexUM Portal (production)", value: "https://dexumportal.library.maastrichtuniversity.nl/", note: "Import sessions from SAP" },
  { label: "DexUM Portal (test environment)", value: "https://dexumportal-test.library.maastrichtuniversity.nl/", note: "Safe testing — writes nothing to production" },
  { label: "TestVision (production)", value: "https://maastrichtuniversity.testvision.nl/online/developers/", note: "Live system" },
  { label: "TestVision status page", value: "https://status.testvision.nl/", note: "Check during outages" },
];

export const TV_COMMON_ISSUES = [
  { problem: "CC can't upload their exam", cause: "Folder doesn't exist or no access", fix: "Verify access 2 weeks before deadline" },
  { problem: "CC can't see student exams for grading", cause: "Not set as grading coordinator", fix: "Add CC as grading coordinator immediately after closing session" },
  { problem: "Students can't access exam", cause: "Wrong wifi/security settings", fix: "UM Sports = UMExam Wi-Fi, UNS50 = VDIdefault" },
  { problem: "SPAR students don't get extra time", cause: "Students in wrong session, or extra-time flag not set", fix: "Check ⏱ symbols — SPAR session should ONLY have students with clock icon" },
  { problem: "Students locked out or get too much time", cause: "Session times wrong", fix: "Start time from schedule, end = start + duration + extra (SPAR) + 15 min" },
  { problem: "Can't close session (error 3326)", cause: "A student is still 'Busy' (closed browser without clicking Ready)", fix: "Dashboard → '...' next to student → Finalise session. Or: Results → select student → Stop" },
  { problem: "Test bar is orange", cause: "CC modified the test after it was added to the session", fix: "Ask CC to republish, or re-add the test to the session" },
];
