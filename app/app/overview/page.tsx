import Link from "next/link";
import { Building2, Users, UserCog, ArrowUpRight } from "lucide-react";

type LocationCard = {
  marker: string;
  code: string;
  name: string;
  full: string;
  examType: string;
  who: string;
  invigilatorOwner: string;
  staffNeeded: string;
  needs: string[];
  accent: string;     // tailwind border color class
  accentText: string; // tailwind text color
};

const LOCATIONS: LocationCard[] = [
  {
    marker: "01",
    code: "UM SPORTS",
    name: "UM Sports",
    full: "Sports hall · Universiteitssingel",
    examType: "Paper exams",
    who: "All regular students (the majority)",
    invigilatorOwner: "Anja Ronken / SSC arranges these",
    staffNeeded: "Head Invigilator + block invigilators",
    needs: [
      "Exam carts arrive 90 min before start",
      "Cover sheets, attendance sheets, scrap paper",
      "Block arrangements + signage",
      "Stationery boxes per block",
    ],
    accent: "border-l-[var(--um-light-blue)]",
    accentText: "text-[var(--um-light-blue)]",
  },
  {
    marker: "02",
    code: "PHS",
    name: "PHS",
    full: "Paul-Henri Spaaklaan 1 · FSE building",
    examType: "Paper exams (SPAR)",
    who: "SPAR students with special arrangements",
    invigilatorOwner: "YOU request via InterUM (≥3 weeks ahead)",
    staffNeeded: "1 invigilator per SPAR room per slot",
    needs: [
      "SPAR exam box (printed exams + accommodations)",
      "Attendance sheet with accommodations listed",
      "WC phone number, irregularity form, clock",
      "Earplugs / laptop / extra time as needed",
    ],
    accent: "border-l-[var(--um-orange)]",
    accentText: "text-[var(--um-orange)]",
  },
  {
    marker: "03",
    code: "UNS50",
    name: "UNS50",
    full: "Universiteitssingel 50 · FHML Computerlandschap",
    examType: "Digital exams (TestVision)",
    who: "Both regular AND SPAR students taking digital exams",
    invigilatorOwner: "YOU request via InterUM (≥3 weeks ahead)",
    staffNeeded: "Gian (ESD) + invigilators",
    needs: [
      "TV SPAR box (attendance, scrap, password reset flyer)",
      "TestVision Session Dashboard live monitoring",
      "Login credentials + UNS50 checklist",
      "ICTS support on call for login issues",
    ],
    accent: "border-l-[var(--um-dark-blue)]",
    accentText: "text-[var(--um-dark-blue)]",
  },
];

export default function OverviewPage() {
  return (
    <div className="stagger space-y-12">
      {/* ====== HEADER ====== */}
      <header>
        <div className="section-marker">01 / MENTAL MODEL</div>
        <h1 className="font-display text-5xl text-[var(--brand)] mt-2 leading-[0.95]">
          How it works<span className="text-[var(--um-orange)]">.</span>
        </h1>
        <p className="text-sm text-[var(--muted)] mt-3 max-w-2xl">
          Start here. The procedures, checklists, and templates all hang off the same three-location model.
          Once you understand the split, the rest of the manual reads itself.
        </p>
      </header>

      {/* ====== INTRO SECTION ====== */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-6">
            <div className="section-marker">02 / THE LOGIC</div>
            <h2 className="font-display text-2xl text-[var(--brand)] leading-tight mt-1">
              Three locations<span className="text-[var(--um-orange)]">.</span>
            </h2>
            <p className="label-caps mt-1.5">at any given exam slot</p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9 md:border-l md:border-[var(--border)] md:pl-6">
          <p className="text-base text-[var(--brand)] leading-relaxed font-display-italic">
            Every exam period, you are organising people, materials, and information across three
            simultaneous locations. Each one has a different audience, a different exam format,
            and a different person responsible for staffing it.
          </p>
          <ul className="mt-5 space-y-3 text-sm text-[var(--brand)]">
            <li className="grid grid-cols-[auto_1fr] gap-3 items-baseline">
              <span className="font-mono text-[11px] text-[var(--um-orange)] font-semibold">→</span>
              <span><span className="font-semibold">Regular students</span> taking paper exams go to <span className="font-display-italic">UM Sports</span>.</span>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-3 items-baseline">
              <span className="font-mono text-[11px] text-[var(--um-orange)] font-semibold">→</span>
              <span><span className="font-semibold">SPAR students</span> taking paper exams go to <span className="font-display-italic">PHS</span>.</span>
            </li>
            <li className="grid grid-cols-[auto_1fr] gap-3 items-baseline">
              <span className="font-mono text-[11px] text-[var(--um-orange)] font-semibold">→</span>
              <span><span className="font-semibold">Regular and SPAR students</span> taking <span className="font-semibold">digital</span> exams both go to <span className="font-display-italic">UNS50</span>.</span>
            </li>
          </ul>
          <p className="mt-5 text-sm text-[var(--brand)] leading-relaxed">
            That means: for every exam slot, there are up to <span className="font-display-italic">three rooms running in parallel</span> — and your job is to make sure each one
            has the right materials, the right invigilator, and a support staff member with all the instructions ready.
          </p>
        </div>
      </section>

      {/* ====== THREE LOCATION CARDS ====== */}
      <section>
        <div className="border-b-2 border-[var(--brand)] pb-3 mb-6">
          <div className="section-marker">03 / THE THREE LOCATIONS</div>
          <h2 className="font-display text-3xl text-[var(--brand)] leading-tight mt-1">
            Where everyone goes<span className="text-[var(--um-orange)]">.</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {LOCATIONS.map((loc) => (
            <article
              key={loc.code}
              className={`bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--brand)] border-l-4 ${loc.accent} rounded-sm p-5 hover:border-t-[var(--um-orange)] transition-colors flex flex-col`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className={`section-marker ${loc.accentText}`}>{loc.marker} / LOCATION</span>
                <Building2 size={14} className={loc.accentText} />
              </div>
              <h3 className="font-display text-3xl text-[var(--brand)] leading-[0.95] mt-2">
                {loc.name}<span className="text-[var(--um-orange)]">.</span>
              </h3>
              <p className="label-caps mt-1">{loc.full}</p>

              <div className="mt-5 space-y-3 text-sm">
                <div>
                  <div className="label-caps !text-[9px]">Exam type</div>
                  <div className="text-[var(--brand)] mt-0.5">{loc.examType}</div>
                </div>
                <div>
                  <div className="label-caps !text-[9px] flex items-center gap-1"><Users size={9} /> Who attends</div>
                  <div className="text-[var(--brand)] mt-0.5">{loc.who}</div>
                </div>
                <div>
                  <div className="label-caps !text-[9px] flex items-center gap-1"><UserCog size={9} /> Invigilators</div>
                  <div className="text-[var(--brand)] mt-0.5">{loc.invigilatorOwner}</div>
                </div>
                <div>
                  <div className="label-caps !text-[9px]">Staff needed</div>
                  <div className="text-[var(--brand)] mt-0.5">{loc.staffNeeded}</div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-dotted border-[var(--um-gray-300)]">
                <div className="label-caps !text-[9px] mb-2">Must have ready</div>
                <ul className="space-y-1.5 text-xs text-[var(--brand)]">
                  {loc.needs.map((n) => (
                    <li key={n} className="relative pl-3 before:absolute before:left-0 before:top-[0.45rem] before:h-1 before:w-1 before:rounded-full before:bg-[var(--um-orange)]">
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ====== KEY PRINCIPLE ====== */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-6">
            <div className="section-marker">04 / THE PRINCIPLE</div>
            <h2 className="font-display text-2xl text-[var(--brand)] leading-tight mt-1">
              One slot, three rooms<span className="text-[var(--um-orange)]">.</span>
            </h2>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9 md:border-l md:border-[var(--border)] md:pl-6">
          <div className="border-l-2 border-[var(--um-orange)] bg-[var(--um-orange)]/5 px-4 py-4">
            <p className="text-sm text-[var(--brand)] leading-relaxed">
              For every single exam time slot, you must make sure that{" "}
              <span className="font-display-italic">a support staff member is present at each relevant location</span>,
              with the correct exam materials, the right attendance sheets, and all the instructions
              they need to run that room without you. You cannot be in three places at once — your job
              is to make the logistics so airtight that you don&apos;t have to be.
            </p>
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-4 text-xs">
            <div>
              <div className="label-caps">UM Sports</div>
              <p className="text-[var(--muted)] mt-1.5 leading-relaxed">
                Heather (ESD) handles the day. SSC supplies the invigilators. You ensure the carts arrive on time.
              </p>
            </div>
            <div>
              <div className="label-caps">PHS</div>
              <p className="text-[var(--muted)] mt-1.5 leading-relaxed">
                You arrange the invigilators via InterUM. SPAR boxes are prepared by you the week before. You can be at PHS in person.
              </p>
            </div>
            <div>
              <div className="label-caps">UNS50</div>
              <p className="text-[var(--muted)] mt-1.5 leading-relaxed">
                Gian (ESD) covers the room. You request invigilators via InterUM. Monitor TestVision live from your desk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== BEYOND EXAM DAY ====== */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-6">
            <div className="section-marker">05 / BEYOND EXAM DAY</div>
            <h2 className="font-display text-2xl text-[var(--brand)] leading-tight mt-1">
              Other things you&apos;ll encounter<span className="text-[var(--um-orange)]">.</span>
            </h2>
            <p className="label-caps mt-1.5">side processes</p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9 md:border-l md:border-[var(--border)] md:pl-6 space-y-8">

          {/* Attendance & additional assignment */}
          <div>
            <h3 className="font-display text-xl text-[var(--brand)] leading-tight">
              Attendance & additional assignments<span className="text-[var(--um-orange)]">.</span>
            </h3>
            <p className="mt-2 text-sm text-[var(--brand)] leading-relaxed">
              All MSP courses require <span className="font-semibold">85% attendance</span> (typically 10/12 or 9/11 tutorials).
              Skills and projects require <span className="font-semibold">100%</span>.
              A student who fails attendance but hasn&apos;t missed more than 30% can request an <span className="font-display-italic">additional assignment</span> to make up for it.
            </p>
            <div className="mt-4 space-y-2.5 text-sm text-[var(--brand)]">
              {[
                { label: "Request deadline", value: "Within 10 working days after the last tutorial meeting" },
                { label: "Who decides", value: "The Course Coordinator evaluates the reasons for absence" },
                { label: "Completion deadline", value: "20 working days after receiving the assignment" },
                { label: "Until it's passed", value: "A provisional grade is issued — no credits granted" },
                { label: "Missed > 30%", value: "No additional assignment possible — student fails the course" },
              ].map(row => (
                <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-dotted border-[var(--um-gray-300)] pb-1.5">
                  <span className="label-caps !text-[9px]">{row.label}</span>
                  <span className="text-right text-xs">{row.value}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-[var(--muted)]">
              See EER Article 4.5 and R&R Articles 15–16.
            </p>
          </div>

          {/* Illness & absence */}
          <div>
            <h3 className="font-display text-xl text-[var(--brand)] leading-tight">
              Illness & absence<span className="text-[var(--um-orange)]">.</span>
            </h3>
            <p className="mt-2 text-sm text-[var(--brand)] leading-relaxed">
              When a student is ill or absent, the escalation path is:
            </p>
            <ol className="mt-3 space-y-4 text-sm text-[var(--brand)]">
              {[
                { step: "01", text: "Student emails the Course Coordinator with the cause and expected duration." },
                { step: "02", text: "If absence > 1 week or severe: student informs their Academic Advisor or ESD." },
                { step: "03", text: "If needed: the Board of Examiners is informed (by the student or in consultation) to discuss further action, e.g. a leave of absence." },
              ].map(s => (
                <li key={s.step} className="relative pl-12">
                  <span className="absolute left-0 top-0 font-display text-xl text-[var(--um-orange)] tabular-nums leading-none">{s.step}</span>
                  <span>{s.text}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Waivers */}
          <div>
            <h3 className="font-display text-xl text-[var(--brand)] leading-tight">
              Waivers<span className="text-[var(--um-orange)]">.</span>
            </h3>
            <p className="mt-2 text-sm text-[var(--brand)] leading-relaxed">
              Some 2000-level and all 3000-level courses have prerequisites. A student who doesn&apos;t meet them can request a
              waiver from the Course Coordinator. Waivers are processed <span className="font-semibold">twice a year</span> (November & May)
              during course registration — this can affect the student numbers you submit at T−6 weeks.
            </p>
          </div>

          {/* Transcripts */}
          <div>
            <h3 className="font-display text-xl text-[var(--brand)] leading-tight">
              Transcripts<span className="text-[var(--um-orange)]">.</span>
            </h3>
            <p className="mt-2 text-sm text-[var(--brand)] leading-relaxed">
              Official transcripts are issued by ESD. Students can also download a certified transcript
              from the Student Portal (My Courses → Grade list). If a student asks you for a transcript,
              point them to the self-service option first; issue one manually only if they need a specific format.
            </p>
          </div>

          {/* BoE */}
          <div>
            <h3 className="font-display text-xl text-[var(--brand)] leading-tight">
              Board of Examiners<span className="text-[var(--um-orange)]">.</span>
            </h3>
            <p className="mt-2 text-sm text-[var(--brand)] leading-relaxed">
              MSP shares one MSLAS Board of Examiners with UCM and UCV. The BoE handles: Binding Study Advice,
              special module requests, credit transfer, exemptions, SPAR, fraud/irregularities, and graduation.
              The MSP BoE secretary is <span className="font-semibold">Katja Zambib-Otten</span> — reach her at{" "}
              <span className="font-mono text-[11px] text-[var(--um-orange)]">msp-boe@maastrichtuniversity.nl</span>.
              When you file an Irregularity Report or need a SPAR edge-case decision, she&apos;s the point of contact.
            </p>
          </div>
        </div>
      </section>

      {/* ====== JUMP-OFF LINKS ====== */}
      <section>
        <div className="border-b-2 border-[var(--brand)] pb-3 mb-5">
          <div className="section-marker">06 / NEXT</div>
          <h2 className="font-display text-3xl text-[var(--brand)] leading-tight mt-1">
            Now go deeper<span className="text-[var(--um-orange)]">.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { href: "/procedures",  label: "Procedures",  desc: "How each step works" },
            { href: "/checklists",  label: "Checklists",  desc: "Boxes & on-day items" },
            { href: "/periods",     label: "Periods",     desc: "What to do this period" },
            { href: "/glossary",    label: "Glossary",    desc: "Decode the acronyms" },
          ].map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="group block bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--brand)] hover:border-t-[var(--um-orange)] rounded-sm p-4 transition-colors"
            >
              <div className="flex items-baseline justify-between">
                <div className="font-display text-lg text-[var(--brand)] group-hover:text-[var(--um-orange)] transition-colors">{q.label}</div>
                <ArrowUpRight size={14} className="text-[var(--um-gray-400)] group-hover:text-[var(--um-orange)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div className="label-caps mt-1.5">{q.desc}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
