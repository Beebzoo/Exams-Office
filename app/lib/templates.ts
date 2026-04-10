export type EmailTemplate = {
  id: string;
  title: string;
  when: string;
  attachments?: string[];
  body: string;
  fields: string[]; // bracket placeholders
};

export const TEMPLATES: EmailTemplate[] = [
  {
    id: "inform-cc",
    title: "Inform Course Coordinators (start of period)",
    when: "Start of each period",
    attachments: ["Cover Sheet for Exams", "Allowed Calculators List"],
    fields: ["[X]", "[DATE]", "[Your name]"],
    body: `Dear P[X] Course Coordinators of FSE-MSP,

I am reaching out to provide you with some information regarding the organization of midterms and final exams.

MIDTERMS
- Midterms have been scheduled in MyTimetable (if you have informed us). Please check it and let me know if you have questions.
- Midterms will be organized as always:
  • Scheduled within faculty buildings
  • Invigilators arranged by yourselves
  • Exams printed by yourselves

FINAL WRITTEN EXAMS ON PAPER
- You can find the exam schedule in MyTimetable. Please check it and let me know if you have questions.
- Invigilators are arranged via InterUM. You do not need to arrange them, nor be present at UM Sports.
- Students cannot ask content questions during the exam — please triple-check your exam before it is printed.
- All written exams will be printed externally by Andi Smart Print Solutions and transported (secured) to the exam location by UTS. Self-printing or self-transporting is not permitted.
- Please submit your final exam to ESD by email no later than: [DATE]
- SPAR students will be scheduled at PHS1. Invigilators arranged.
- Reminders:
  • Use the Cover Sheet for Exams as the basis (attached)
  • Update all details (exam name, AY) throughout the document
  • Students bring their own MSP-approved calculator
  • Open Book Exam = paper documents only, no internet
  • Include formula sheets within the exam itself
  • Integrate answering space within the exam (only scrap paper handed out)
  • Add 2 extra blank pages at the end as extra answering space

FINAL EXAMS IN TESTVISION
- Exam schedule in MyTimetable.
- Invigilators arranged via InterUM.
- Students cannot ask content questions — triple-check before publishing.
- TV exams take place on Chromebooks at UM Sports. Students only have access to TestVision.
- Please enter the test yourself to make optimal use of TestVision. Intro course: https://maastrichtuniversity.instructure.com/enroll/NGLGTC
- Please have your exam ready in TestVision no later than: [DATE]
- SPAR students at computer rooms at UNS50. Invigilators arranged.
- Reminders:
  • Update all details
  • MSP-approved calculator
  • Open Book = paper only, no internet
  • Include formula sheets within TestVision

If you have any questions, please let us know.

Kind regards,
[Your name]
Maastricht Science Programme | Educational Support Department`,
  },
  {
    id: "grading-first",
    title: "Grading Sheets — First Sit",
    when: "After exam week, with grading sheet attached",
    attachments: ["SAP export/import file", "Tips and instructions"],
    fields: ["[Name]", "[X]", "[DATE]", "[Day]", "[time]", "[Your name]"],
    body: `Dear [Name],

This email consists of 2 attachments: the SAP export/import file and 'Tips and instructions how to fill in the SAP grade file'.

We hereby shortly explain how to submit grades to the MSP Educational Support Department (ESD):
- Please fill out the completed SAP export/import file (attendance in column D, final grades in column F).
- Upload all partial grades on CANVAS and indicate which students are entitled to a resit (article 15.5 R&R MSP).
- For more information, please check the instruction video or use the online manual on how to use the gradebook in CANVAS.

The deadline for the aforementioned actions is: [DATE]

Please check the attached instructions document for more information about the SAP grading file and Canvas gradebook.

Please note that, according to article 5.9 of the EER, students may inspect their evaluated work within 10 working days of the date on which the result is announced in Student Portal by ESD. Please proactively inform your students about the exam inspection.

Exams can be collected at PHS1 B2.007 during the following time slots:
- [Day] [DATE] from [time] – [time]
- [Day] [DATE] from [time] – [time]

Finally, the Submission Deadline for P[X] Resit Exams is [DATE]. Please submit your resit exam no later than this date.

If you have any questions, just let me know.

Kind regards,
[Your name]
Maastricht Science Programme | Educational Support Department`,
  },
  {
    id: "grading-resit",
    title: "Grading Sheets — Resit",
    when: "1 week before resit week",
    fields: ["[Name]", "[X]", "[DATE]", "[Day]", "[time]", "[Your name]"],
    body: `Dear [Name],

Please find the resit grading sheet attached, including all students eligible for your P[X] resit.

Please fill out the completed SAP export/import resit file (attendance in column D and final (new) grades in column F).

Make sure to:
- Fill in NG for those students that were NOT present during the resit
- Fill in the NEW final grade after the resit
- Fill in the NEW final grade even if this grade is lower than the original final grade

The deadline for submitting the new final grades after the resit is: [DATE]

Finally, Resit Exams can be collected at PHS1 B0.005 during the following time slots:
- [Day] [DATE] from [time] – [time]
- [Day] [DATE] from [time] – [time]

Next week at PHS B2.007:
- Monday/Tuesday/Thursday/Friday from 09:00 – 16:00

If you have any questions/comments, feel free to contact me.

Best,
[Your name]
Maastricht Science Programme | Educational Support Department`,
  },
  {
    id: "grades-published",
    title: "Reply: Grades Received and Published",
    when: "After publishing grades to a CC",
    fields: ["[Name]", "[DATE]", "[COURSE CODE]", "[DAY DATE]", "[TIME]", "[Your name]"],
    body: `Dear [Name],

Thank you for sending the grades.

I have just published the grades, so students should have access to their final grade via their Student Portal.

According to article 5.9 of the EER, students may inspect their evaluated work within 10 working days of the date on which the result of a written exam is announced in Student Portal by ESD.

For this practical/course, this means that students have until [DATE] to inspect their evaluated work. It would be great if you could actively inform your students about this.

The [COURSE CODE] Resit Exam will take place on [DAY DATE] from [TIME] – [TIME]. There is no need for you to be present during the resit, as invigilators will be arranged by us.

Please submit the resit exam no later than [DATE].

The students eligible for the resit have been registered. They will see the resit in their Timetable within 30 minutes.

If you have any questions, just let us know.

Best,
[Your name]
Maastricht Science Programme | Educational Support Department`,
  },
  {
    id: "midterm-att",
    title: "Attendance Sheets — Midterm",
    when: "1 week before midterms",
    attachments: ["Attendance sheets", "Irregularity Report Form"],
    fields: ["[Name]", "[Your name]"],
    body: `Dear [Name],

Attached you will find the attendance sheets for the midterm and the Irregularity Report Form.

We hereby shortly explain the procedure regarding the Irregularity Report Form:
- Please print the attached Irregularity Report Form twice per exam room and provide the invigilators with the forms.
- If an irregularity is suspected during an exam, please fill out the form directly on the spot.
- Provide the filled-out form to ESD using the ORIGINAL Irregularity Report Form.

During the midterm, ESD will be available at PHS to guide students to the toilet to decrease the possibilities of fraud.

The invigilators/you can send a TEXT message (i.e. SMS) to the following number if a student needs to go to the toilet: +31 6 346 400 43

Could you also let us know the name(s) of the invigilator(s) who will be present during the midterm?

If you have any remarks/questions, just let us know.

Kind regards,
[Your name]
Maastricht Science Programme | Educational Support Department`,
  },
  {
    id: "student-exam-info",
    title: "Student Email — Exam Week Information (UM Sports)",
    when: "~1 week before exam week",
    attachments: ["Rules of Procedure", "USC info", "Calculator List", "Hall Arrangements", "Block Arrangements"],
    fields: ["[X]", "[DATES]", "[Your name]"],
    body: `Dear student,

In about a week from now, the exam week of Period [X] ([DATES]) will take place.

The information below contains important information for ALL students! (If any other arrangement like special exam arrangements should apply to you personally, you will receive a separate email.)

In principle, all MSP exams will take place at UM Sports (as shown in your Timetable). Enter via the main entrance.

Enclosed you will find:
- The Rules of Procedure
- Information about UM Sports as an exam location
- Hall arrangements of MSP exams (fuchsia blocks indicate MSP exams)
- Specific block arrangements (which exam takes place in which block)
- The MSP list of allowed calculators

FOR ALL STUDENTS — PLEASE READ CAREFULLY:
- You can only participate if you can show your UM-card or passport/official ID at the START of your exam (no scan or photo). Keep your student ID on your table for the entire exam.
- Ask your lecturer beforehand if a calculator is allowed. If only simple calculators are allowed, choose from the attached list.
- For each exam: you cannot be even 1 minute late. Doors close exactly at starting time.
- Follow the fuchsia signs mentioning MSP and find your block to be seated.
- You can bring a jacket and a bag. Both must fit entirely UNDER your own exam table.
- Food is NOT allowed. Drinks in a bottle/cup with a closeable lid are fine.
- Toilet: raise your hand and wait for the invigilator to give you a 'toilet pass'. Max ONE toilet visit per 2-hour exam. Not in the first or last 30 minutes.
- Electronic devices of any kind are not allowed (watches, earphones, headphones, hats, phones).
- Any fraud attempt will be reported by an irregularity report to the Board of Examiners.
- You may not leave before 30 minutes after the start of the exam.
- Once you receive your exam: read the front page, write your name and student ID on the cover sheet.

DIGITAL EXAMS (TestVision):
- You will take your digital exam on a Chromebook set up at the exam location.
- Log in immediately when seated!
- You need to log in with your own UM credentials. Make sure your account is active before the exam day.
- More info: https://library.maastrichtuniversity.nl/study/digital-exams/

If you have any questions, please do not hesitate to contact me.

Wishing you good luck on your exams,
[Your name]
Maastricht Science Programme | Educational Support Department`,
  },
  {
    id: "student-spar",
    title: "Student Email — SPAR Special Arrangements",
    when: "Same time as the general student email (BCC SPAR students)",
    fields: ["[Your name]"],
    body: `Dear student (SPAR),

You are entitled to take your exams under special exam conditions. These exams do NOT take place at UM Sports!

The email about UM Sports exams (sent to all students) contains important information for ALL students — please read it carefully.

- Electronic devices of any kind are not allowed (watches, earphones, headphones, hats, phones, etc.).
- Any type or attempt of fraud will be reported by an irregularity report sent to the Board of Examiners.
- Once you receive your exam: read the front page thoroughly, write your name AND student ID number on the front page.

Please be in time for the exam — 10 to 15 minutes earlier than the actual start. Check your timetable. For each exam: you cannot be even 1 minute late.

LOCATION OF EXAMS FOR STUDENTS WITH SPECIAL EXAM CONDITIONS:

Pen-and-paper exams: PHS1 (Paul-Henri Spaaklaan 1). Check your Timetable for the specific room.

Digital exams: UNS50 (Universiteitssingel 50), at the 'Computerlandschap' of faculty FHML. Enter UNS50 via the main entrance (South side), first door left and then first door right. An invigilator will meet you there.

DIGITAL EXAMS — IMPORTANT:
- Log in with your own UM credentials.
- Make sure your account is active before the exam day.
- More info: https://library.maastrichtuniversity.nl/study/digital-exams/

If you have any questions, please do not hesitate to contact me.

Wishing you all good luck,
[Your name]
Maastricht Science Programme | Educational Support Department`,
  },
];
