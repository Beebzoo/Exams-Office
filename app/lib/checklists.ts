export type Checklist = {
  id: string;
  title: string;
  intro?: string;
  groups: { name: string; items: string[] }[];
};

export const PHYSICAL_CHECKLISTS: Checklist[] = [
  {
    id: "exam-cart",
    title: "Exam Cart Checklist (UM Sports)",
    groups: [
      { name: "Per Exam Box (one per course per block)", items: [
        "Exams — correct course, correct number of copies",
        "Attendance sheets — 2 per block",
        "Counted scrap paper — sufficient per student in that block",
        "Label/sticker on box identifying course and block",
      ]},
      { name: "Per Block Stationery Box", items: [
        "5 pens", "5 calculators", "Overview of allowed calculator list",
        "Stapler", "Staples", "Tape", "Marker", "Post-its", "Elastic bands", "2 plastic folders",
      ]},
      { name: "General Cardboard Box", items: [
        "MSP signs", "Block numbers", "Block arrangements", "Block signs",
      ]},
      { name: "Head Invigilator Folder", items: [
        "Updated for current period",
        "Contains correct exam overview (Toetsoverzicht)",
      ]},
      { name: "Cart Itself", items: [
        "Transport overview taped to the top of the cart",
        "Box with spare scrap paper",
        "Box with calculators",
        "Cart key returned to B2.007 after loading",
      ]},
    ],
  },
  {
    id: "spar-phs",
    title: "SPAR Box Checklist — PHS",
    groups: [
      { name: "Box contents", items: [
        "Exams (correct course, correct number for SPAR students)",
        "Attendance sheets (with student accommodations listed after names)",
        "WC phone number (+31 6 346 400 43)",
        "Scrap paper (sufficient per student)",
        "Irregularity report form",
        "Printed SPAR overview (Toetsoverzicht)",
        "Stationery box (pens, calculators, calculator list, stapler, staples, tape, marker, post-its, elastic bands, 2 folders)",
        "Clock",
        "Earplugs (if any student requires them)",
        "Laptop (if any student requires it)",
        "Any other required accommodations (check per student in SPAR overview)",
      ]},
    ],
  },
  {
    id: "spar-uns50",
    title: "SPAR Box Checklist — TestVision (UNS50)",
    groups: [
      { name: "Box contents", items: [
        "Attendance sheets (TestVision SPAR students only)",
        "Scrap paper",
        "Printed Password Reset Flyer",
        "Printed UNS50 TestVision Checklist",
        "Printed SPAR overview (Toetsoverzicht)",
        "Stationery box (same as regular exams)",
        "Earplugs (if any student requires them)",
      ]},
    ],
  },
  {
    id: "tv-uns50-day",
    title: "On-Day Checklist — TestVision at UNS50",
    groups: [
      { name: "Before Exam Start (15 min before)", items: [
        "Computers started and ready",
        "Invigilator briefed and present",
        "Students entering: UM card / ID / Passport checked",
        "Attendance sheets being ticked as students arrive",
        "Students told to log in immediately",
        "Bags and coats under table or at front of room",
        "Scrap paper ready to distribute right after exam starts",
      ]},
      { name: "During Exam", items: [
        "Invigilator walking through the room (not between rows)",
        "Toilet procedure: invigilator calls support colleague to escort student (max 2 per exam)",
        "Login issues: use Password Reset Flyer. Login: FSETVS / !@#FSEtestvspec",
        "Computer issues: move student to new computer WITHOUT logging out of broken one first",
      ]},
      { name: "After Exam", items: [
        "Log out of TestVision: password Quit&quit!",
        "Sign out of computers normally",
        "Collect attendance sheets",
        "Return all materials to ESD",
      ]},
    ],
  },
];

export const TV_CREDENTIALS = {
  loginUsername: "FSETVS",
  loginPassword: "!@#FSEtestvspec",
  quitPassword: "Quit&quit!",
};
