import Link from "next/link";
import { TV_PHASES, TV_CONTACTS, TV_COMMON_ISSUES } from "@/lib/testvision";
import { TESTVISION_COURSES } from "@/lib/courses";
import { AlertTriangle, Lightbulb, ArrowUpRight, Phone, ExternalLink, Monitor } from "lucide-react";

export default function TestVisionPage() {
  return (
    <div className="stagger space-y-12">
      <header>
        <div className="section-marker">01 / DIGITAL EXAMS</div>
        <h1 className="font-display text-5xl text-[var(--brand)] mt-2 leading-[0.95]">
          TestVision<span className="text-[var(--um-orange)]">.</span>
        </h1>
        <p className="text-sm text-[var(--muted)] mt-3 max-w-2xl">
          Complete workflow for setting up, running, and closing digital exams.
          From DexUM Portal import to post-exam grading and student reviews.
        </p>
        <a
          href="#tv-courses"
          className="mt-4 group inline-flex items-center gap-2 text-sm font-medium text-[var(--brand)] hover:text-[var(--um-orange)] transition-colors"
        >
          <Monitor size={14} />
          <span className="border-b border-current pb-0.5">Which MSP exams are in TestVision?</span>
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </header>

      {/* Quick contacts bar */}
      <section className="bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--brand)] rounded-sm p-5">
        <div className="section-marker mb-3">02 / EMERGENCY CONTACTS</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {TV_CONTACTS.filter(c => c.value.startsWith("0") || c.value.startsWith("http")).slice(0, 4).map(c => (
            <div key={c.label}>
              <div className="label-caps !text-[9px]">{c.label}</div>
              <div className="font-mono text-sm text-[var(--um-orange)] mt-0.5">{c.value}</div>
              <div className="text-[10px] text-[var(--muted)] mt-0.5">{c.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow phases */}
      {TV_PHASES.map((phase, pi) => (
        <section key={phase.id} className="grid grid-cols-12 gap-6">
          {/* Phase label */}
          <div className="col-span-12 md:col-span-3">
            <div className="md:sticky md:top-6">
              <div className="section-marker">{String(pi + 3).padStart(2, "0")} / PHASE {phase.marker}</div>
              <h2 className="font-display text-3xl text-[var(--brand)] leading-tight mt-1">
                {phase.title}<span className="text-[var(--um-orange)]">.</span>
              </h2>
              <p className="text-xs text-[var(--muted)] font-display-italic mt-1.5">{phase.tagline}</p>
              <div className="label-caps mt-2">{phase.when}</div>
            </div>
          </div>

          {/* Steps */}
          <div className="col-span-12 md:col-span-9 md:border-l md:border-[var(--border)] md:pl-6 space-y-6">
            {phase.steps.map((step, si) => (
              <article
                key={step.id}
                id={`tv-${step.id}`}
                className="bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--brand)] rounded-sm p-5 hover:border-t-[var(--um-orange)] transition-colors scroll-mt-8"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-2xl text-[var(--um-orange)] tabular-nums leading-none">
                    {String(si + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl text-[var(--brand)] leading-tight">{step.title}</h3>
                </div>

                {step.intro && (
                  <p className="mt-3 text-sm text-[var(--muted)] font-display-italic leading-relaxed">{step.intro}</p>
                )}

                <ul className="mt-4 space-y-1.5 text-sm text-[var(--brand)]">
                  {step.bullets.map((b, j) => {
                    const isSubItem = b.startsWith("→");
                    return (
                      <li
                        key={j}
                        className={`relative leading-snug ${
                          isSubItem
                            ? "pl-7 before:absolute before:left-3 before:top-[0.55rem] before:h-px before:w-2 before:bg-[var(--um-orange)]"
                            : "pl-4 before:absolute before:left-0 before:top-[0.55rem] before:h-1 before:w-1 before:rounded-full before:bg-[var(--um-orange)]"
                        }`}
                      >
                        {isSubItem ? b.slice(2) : b}
                      </li>
                    );
                  })}
                </ul>

                {step.warning && (
                  <div className="mt-4 border-l-2 border-[var(--um-orange)] bg-[var(--um-orange)]/5 px-4 py-3 flex items-start gap-3">
                    <AlertTriangle size={14} className="mt-0.5 shrink-0 text-[var(--um-orange)]" />
                    <span className="text-xs text-[var(--brand)] leading-relaxed">{step.warning}</span>
                  </div>
                )}

                {step.tip && (
                  <div className="mt-4 border-l-2 border-[var(--um-light-blue)] bg-[var(--um-light-blue)]/5 px-4 py-3 flex items-start gap-3">
                    <Lightbulb size={14} className="mt-0.5 shrink-0 text-[var(--um-light-blue)]" />
                    <span className="text-xs text-[var(--brand)] leading-relaxed">{step.tip}</span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}

      {/* Common issues */}
      <section>
        <div className="border-b-2 border-[var(--brand)] pb-3 mb-5">
          <div className="section-marker">09 / TROUBLESHOOTING</div>
          <h2 className="font-display text-3xl text-[var(--brand)] leading-tight mt-1">
            Common issues<span className="text-[var(--um-orange)]">.</span>
          </h2>
          <p className="text-xs text-[var(--muted)] font-display-italic mt-1.5">The things that go wrong most often and how to prevent them.</p>
        </div>

        <div className="space-y-0">
          {TV_COMMON_ISSUES.map((issue, i) => (
            <div key={i} className="grid grid-cols-[auto_1fr] gap-4 py-4 border-b border-dotted border-[var(--um-gray-300)]">
              <span className="section-marker !text-[var(--um-gray-400)] tabular-nums mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="text-sm font-semibold text-[var(--brand)]">{issue.problem}</div>
                <div className="mt-1 text-xs text-[var(--muted)]">
                  <span className="label-caps !text-[9px]">Cause</span> {issue.cause}
                </div>
                <div className="mt-1 text-xs text-[var(--um-orange)]">
                  <span className="label-caps !text-[9px] !text-[var(--um-orange)]">Fix</span> {issue.fix}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TestVision courses */}
      <section id="tv-courses" className="grid grid-cols-12 gap-6 scroll-mt-8">
        <div className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-6">
            <div className="section-marker">10 / COURSES</div>
            <h2 className="font-display text-2xl text-[var(--brand)] leading-tight mt-1">
              Digital exams<span className="text-[var(--um-orange)]">.</span>
            </h2>
            <p className="label-caps mt-1.5 tabular-nums">{TESTVISION_COURSES.length} courses</p>
            <p className="text-xs text-[var(--muted)] mt-2 font-display-italic leading-relaxed">
              These courses are known to use TestVision. They need DexUM Portal imports, session setup, and Chromebook/UNS50 logistics.
            </p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9 md:border-l md:border-[var(--border)] md:pl-6">
          <ul>
            {TESTVISION_COURSES.map((c, i) => (
              <li key={c.code} className="grid grid-cols-[auto_1fr] gap-4 py-3 border-b border-dotted border-[var(--um-gray-300)]">
                <div className="min-w-[5rem]">
                  <span className="font-mono text-[11px] text-[var(--um-orange)] font-semibold tracking-wider">{c.code}</span>
                </div>
                <div>
                  <div className="text-sm text-[var(--brand)] font-medium">{c.name}</div>
                  <div className="label-caps mt-1 !text-[9px]">{c.coordinators}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* All links & contacts */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-6">
            <div className="section-marker">11 / LINKS</div>
            <h2 className="font-display text-2xl text-[var(--brand)] leading-tight mt-1">
              Systems & contacts<span className="text-[var(--um-orange)]">.</span>
            </h2>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9 md:border-l md:border-[var(--border)] md:pl-6">
          <dl>
            {TV_CONTACTS.map(c => (
              <div key={c.label} className="flex items-baseline justify-between gap-4 py-3 border-b border-dotted border-[var(--um-gray-300)]">
                <div>
                  <dt className="text-sm text-[var(--brand)]">{c.label}</dt>
                  <dd className="label-caps mt-0.5 !text-[9px]">{c.note}</dd>
                </div>
                <dd className="shrink-0 text-right">
                  {c.value.startsWith("http") ? (
                    <a href={c.value} target="_blank" className="font-mono text-[11px] text-[var(--um-orange)] hover:underline inline-flex items-center gap-1">
                      {c.value.replace(/https?:\/\//, "").split("/")[0]} <ExternalLink size={10} />
                    </a>
                  ) : c.value.startsWith("0") ? (
                    <span className="font-mono text-sm text-[var(--um-orange)] inline-flex items-center gap-1">
                      <Phone size={10} /> {c.value}
                    </span>
                  ) : (
                    <span className="font-mono text-[11px] text-[var(--um-orange)]">{c.value}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Jump-off */}
      <section>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { href: "/overview",    label: "Overview",   desc: "Three-location model" },
            { href: "/procedures",  label: "Procedures", desc: "Paper exam logistics" },
            { href: "/checklists",  label: "Checklists", desc: "SPAR boxes & on-day" },
          ].map(q => (
            <Link
              key={q.href}
              href={q.href}
              className="group block bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--brand)] hover:border-t-[var(--um-orange)] rounded-sm p-4 transition-colors"
            >
              <div className="flex items-baseline justify-between">
                <div className="font-display text-lg text-[var(--brand)] group-hover:text-[var(--um-orange)] transition-colors">{q.label}</div>
                <ArrowUpRight size={14} className="text-[var(--um-gray-400)] group-hover:text-[var(--um-orange)] transition-all" />
              </div>
              <div className="label-caps mt-1.5">{q.desc}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
