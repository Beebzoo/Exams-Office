"use client";
import { useMemo, useState } from "react";
import { PROCEDURES } from "@/lib/procedures";
import { Search, AlertTriangle } from "lucide-react";
import { TermText } from "@/components/TermText";

export default function ProceduresPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return PROCEDURES;
    return PROCEDURES.filter(p =>
      p.title.toLowerCase().includes(needle) ||
      p.id.includes(needle) ||
      p.intro?.toLowerCase().includes(needle) ||
      p.steps.some(s => s.title.toLowerCase().includes(needle) || s.bullets.some(b => b.toLowerCase().includes(needle)))
    );
  }, [q]);

  const sections = Array.from(new Set(filtered.map(p => p.section)));

  return (
    <div className="stagger space-y-10">
      <header>
        <div className="section-marker">01 / KNOWLEDGE</div>
        <h1 className="font-display text-5xl text-[var(--brand)] mt-2 leading-[0.95]">
          Procedures<span className="text-[var(--um-orange)]">.</span>
        </h1>
        <p className="text-sm text-[var(--muted)] mt-3 max-w-2xl">Step-by-step guides for every coordination task.</p>
      </header>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search procedures (e.g. 'andidruk', 'spar', 'grading')…"
          className="w-full bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--brand)] rounded-sm pl-9 pr-3 py-3 text-sm focus:outline-none focus:border-[var(--um-orange)] focus:border-t-[var(--um-orange)] transition-colors"
        />
      </div>

      {sections.map((section, secIdx) => {
        const secProcs = filtered.filter(p => p.section === section);
        return (
          <section key={section} className="grid grid-cols-12 gap-6">
            {/* Section label column */}
            <div className="col-span-12 md:col-span-3">
              <div className="md:sticky md:top-6">
                <div className="section-marker">0{secIdx + 2} / SECTION</div>
                <h2 className="font-display text-2xl text-[var(--brand)] leading-tight mt-1">
                  {section}<span className="text-[var(--um-orange)]">.</span>
                </h2>
                <p className="label-caps mt-2 tabular-nums">{secProcs.length} procedures</p>
              </div>
            </div>

            {/* Procedures column */}
            <div className="col-span-12 md:col-span-9 md:border-l md:border-[var(--border)] md:pl-6 space-y-6">
              {secProcs.map(p => (
                <article
                  key={p.id}
                  id={p.id}
                  className="bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--brand)] rounded-sm p-6 scroll-mt-8 hover:border-t-[var(--um-orange)] transition-colors"
                >
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-mono text-[11px] text-[var(--um-orange)] font-semibold tracking-wider">§ {p.id}</span>
                    <h3 className="font-display text-2xl text-[var(--brand)] leading-tight">{p.title}</h3>
                  </div>
                  {p.intro && (
                    <p className="mt-2 text-sm text-[var(--muted)] font-display-italic">
                      <TermText>{p.intro}</TermText>
                    </p>
                  )}
                  {p.warnings?.map(w => (
                    <div key={w} className="mt-4 border-l-2 border-[var(--um-orange)] bg-[var(--um-orange)]/5 px-4 py-3 flex items-start gap-3">
                      <AlertTriangle size={14} className="mt-0.5 shrink-0 text-[var(--um-orange)]" />
                      <span className="text-sm text-[var(--brand)] font-display-italic">
                        <TermText>{w}</TermText>
                      </span>
                    </div>
                  ))}
                  <ol className="mt-6 space-y-6">
                    {p.steps.map((step, i) => (
                      <li key={i} className="relative pl-12">
                        <span className="absolute left-0 top-0 font-display text-2xl text-[var(--um-orange)] tabular-nums leading-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="font-display text-base text-[var(--brand)] leading-tight">
                          <TermText>{step.title}</TermText>
                        </div>
                        <ul className="mt-2 space-y-1.5 text-sm text-[var(--brand)]">
                          {step.bullets.map((b, j) => (
                            <li key={j} className="relative pl-4 before:absolute before:left-0 before:top-[0.55rem] before:h-1 before:w-1 before:rounded-full before:bg-[var(--um-orange)]">
                              <TermText>{b}</TermText>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {filtered.length === 0 && <div className="text-sm text-[var(--muted)]">No procedures match.</div>}
    </div>
  );
}
