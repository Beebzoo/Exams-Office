// Plain-language summaries of the UM Rules of Procedure for (Course) Exams 2025-2026.
// Source: adopted by UM Boards of Examiners chairs, 10 Sep 2025.

import type { Regulation } from "./regulations";

export const RULES_OF_PROCEDURE: Regulation[] = [
  // === HIGH ===
  {
    id: "RoP-3", title: "Proof of identity", category: "students", importance: "high",
    summary: "Students must show their UM Card (with recent passport photo) or an original legal ID: passport, EU driving licence/ID card, or Dutch residence permit. Copies (paper or digital) are not accepted. The ID stays on the table throughout the exam.",
    implication: "If a student shows up with only a phone screenshot of their ID — they cannot sit the exam. No exceptions. The invigilator sends them away.",
  },
  {
    id: "RoP-4", title: "No late entry", category: "exams", importance: "high",
    summary: "No student is admitted after the exam has officially begun. Late arrival = no participation, regardless of reason.",
    implication: "Doors close at the exact start time. Not 1 minute, not 30 seconds. This is the rule your student email warns about — make it crystal clear.",
  },
  {
    id: "RoP-7", title: "Food & drinks", category: "exams", importance: "high",
    summary: "Exams under 3 hours: drinks OK (bottle/cup with lid), food NOT allowed. Exams 3+ hours: drinks OK, small quiet snacks OK (no meals, no cutlery, no noisy wrappers). Medical exceptions require prior BoE approval via Disability Support.",
    implication: "Most MSP exams are 2 hours → food is banned. If a student has a medical need (e.g. diabetes), they need to go through DS BEFORE exam day, not explain it to the invigilator on the spot.",
  },
  {
    id: "RoP-9", title: "Personal belongings & materials", category: "exams", importance: "high",
    summary: "Before the exam: coats and bags under the table, bags closed. Only exam-specified materials on the table. Phones, headphones, electronic earplugs, smartwatches, health trackers must be switched OFF and stored in the bag or face-down on the floor. No watches on the person at all. Non-electronic soft foam earplugs are allowed (show to invigilator first).",
    implication: "This is more granular than the manual. Key additions: (1) watches must be IN the bag, not just off the wrist. (2) Foam earplugs are fine without BoE approval — just show the invigilator. (3) Electronic earplugs need BoE + DS approval in advance.",
  },
  {
    id: "RoP-10", title: "Leaving the room", category: "exams", importance: "high",
    summary: "Students may not leave the exam room during the first 30 minutes. After that, they may only leave with the invigilator's permission.",
    implication: "Combined with RoP-12: students can hand in after 30 minutes but must then leave quietly and cannot re-enter.",
  },
  {
    id: "RoP-13", title: "Toilet visits", category: "exams", importance: "high",
    summary: "No toilet visits in the first or last 30 minutes. Max visits scale with exam duration: 1 visit for 61–120 min, 2 visits for 121–180 min, 3 visits for 181–240 min. Max 2 students per block at the toilet at once. Student raises hand → gets a toilet pass in exchange for their ID → returns pass, gets ID back. Pockets checked before and after. Medical exceptions require prior BoE approval via DS.",
    implication: "Your manual says '1 visit per 2-hour exam' which is correct (61–120 min = 1). But note: SPAR exams with extra time may cross into the 121–180 min bracket → those students get 2 visits. The pocket-check and ID-swap procedure should be in the invigilator briefing.",
  },
  {
    id: "RoP-15", title: "Irregularity Report Form", category: "fraud", importance: "high",
    summary: "If fraud or irregularity is suspected, the invigilator fills an Irregularity Report Form describing the factual situation. The student reads it, agrees or marks disagreement, and both sign. The student may NOT add their own statement to the form.",
    implication: "Train invigilators: describe FACTS only ('student had phone on desk'), not conclusions ('student was cheating'). The student signs but cannot write a rebuttal on the form — they can dispute it later via the BoE appeal process (EER 8.6).",
  },
  {
    id: "RoP-16", title: "What counts as fraud", category: "fraud", importance: "high",
    summary: "Fraud is suspected when a student: (a) exchanges info with anyone before/during/after exam; (b) exchanges info near the toilet; (c) has unauthorised materials on table or within reach (including watches, phones, notes, extra IDs); (d) leaves without permission; (e) goes to toilet without permission; (f) takes something from bag without permission; (g) writes on exam after official end; (h) ignores invigilator instructions; (i) impersonates someone; (j) obtains exam access falsely.",
    implication: "This is the complete list. Writing ANYTHING after 'pens down' is fraud (g). Taking a phone out of a bag before leaving the room is fraud (f). Having a smartwatch on is fraud (c). Brief invigilators on all 10 scenarios.",
  },

  // === MEDIUM ===
  {
    id: "RoP-8", title: "Room arrangement", category: "exams", importance: "medium",
    summary: "Exam room opens at least 15 minutes before start. Students take seats according to the posted seating plan. For digital exams, the university provides computers which must stay in the room.",
    implication: "15 minutes is the minimum door-open time — plan your support staff arrival accordingly. The seating plan must be posted AT the room entrance.",
  },
  {
    id: "RoP-11", title: "Disruptive behaviour", category: "fraud", importance: "medium",
    summary: "The invigilator determines what is disruptive. They speak to the student first. If serious disruption continues, the student can be excluded from the exam and an Irregularity Report is filed.",
    implication: "Escalation path: verbal warning first → exclusion if it continues → Irregularity Report → BoE handles the case.",
  },
  {
    id: "RoP-11a", title: "Emergencies during exam", category: "exams", importance: "medium",
    summary: "In an emergency (fire alarm, medical incident), students follow instructions from invigilators, exam coordinator, emergency services, and/or building emergency responders.",
    implication: "If a fire alarm interrupts an exam, the BoE can declare the exam invalid (EER 5.15). Document everything — times, duration, which students were affected.",
  },
  {
    id: "RoP-12", title: "Handing in exams", category: "exams", importance: "medium",
    summary: "Students can hand in after 30 minutes. Before the end: bring papers to invigilator or close digital exam. At the end: close digital exam, remain seated until invigilator collects papers. No writing after the exam ends. Students must leave quietly and cannot re-enter. Name/student ID must be filled in BEFORE the exam ends.",
    implication: "The 'no writing after end' rule is legally fraud (Article 16-g). If an invigilator sees it, they MUST file an Irregularity Report. Include this in the briefing.",
  },
  {
    id: "RoP-14", title: "Completion instructions", category: "exams", importance: "medium",
    summary: "Students must follow the completion instructions on the exam/cover sheet/digital system. If they don't (wrong materials, altered pre-printed info, notes in wrong place), the answer form cannot be processed. Students bear full responsibility. Suspected errors in instructions must be reported to the invigilator immediately.",
    implication: "This is why the cover sheet matters — it IS the completion instruction. And why students cannot ask content questions: any issue with the instructions goes to the invigilator, not the CC.",
  },
  {
    id: "RoP-17", title: "Confiscation of materials", category: "fraud", importance: "medium",
    summary: "If an invigilator finds unauthorised materials, they inform the student, confiscate the materials, photograph/video them as evidence. The student may continue the exam. Materials are returned at the BoE's discretion (phones returned after the exam). If the student objects, it's noted on the Irregularity Report.",
    implication: "Key: the student can keep taking the exam even after confiscation. The BoE decides later whether it's fraud. The invigilator is not judge and jury — they collect evidence.",
  },
  {
    id: "RoP-20", title: "Unforeseen situations", category: "process", importance: "medium",
    summary: "For situations not covered by these Rules, the Exam Coordinator decides in consultation with the Head Invigilator and, if possible, the Examiner or Board of Examiners.",
    implication: "If something truly weird happens and there's no rule for it — YOU decide, in consultation. Document your decision and reasoning.",
  },
];
