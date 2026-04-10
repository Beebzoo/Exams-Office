import Link from "next/link";
import { PERIODS } from "@/lib/data";
import { fmt } from "@/lib/dates";
import { ArrowUpRight } from "lucide-react";

export default function PeriodsIndex() {
  const byAY = new Map<string, typeof PERIODS>();
  for (const p of PERIODS) {
    if (!byAY.has(p.ay)) byAY.set(p.ay, []);
    byAY.get(p.ay)!.push(p);
  }
  return (
    <div className="stagger space-y-10">
      <header>
        <div className="section-marker">01 / WORKFLOW</div>
        <h1 className="font-display text-5xl text-[var(--brand)] mt-2 leading-[0.95]">
          Periods<span className="text-[var(--um-orange)]">.</span>
        </h1>
        <p className="text-sm text-[var(--muted)] mt-3 max-w-2xl">Pick a period to open its full T-relative checklist.</p>
      </header>

      {[...byAY.entries()].map(([ay, periods], ayIdx) => (
        <section key={ay} className="grid grid-cols-12 gap-6">
          {/* AY label column */}
          <div className="col-span-12 md:col-span-3">
            <div className="md:sticky md:top-6">
              <div className="section-marker">0{ayIdx + 2} / ACADEMIC YEAR</div>
              <h2 className="font-display text-3xl text-[var(--brand)] leading-tight mt-1">
                {ay}<span className="text-[var(--um-orange)]">.</span>
              </h2>
              <p className="label-caps mt-2">{periods.length} periods</p>
            </div>
          </div>

          {/* Period list column */}
          <div className="col-span-12 md:col-span-9 md:border-l md:border-[var(--border)] md:pl-6">
            <ul>
              {periods.map((p, i) => (
                <li key={p.id}>
                  <Link
                    href={`/periods/${p.id}`}
                    className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-5 py-5 border-b border-dotted border-[var(--um-gray-300)] hover:bg-[var(--um-gray-50)] transition-colors px-2 -mx-2"
                  >
                    <span className="section-marker !text-[var(--um-gray-400)] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="inline-flex items-center justify-center rounded bg-[var(--brand)] text-white px-2 py-0.5 text-[10px] font-semibold tracking-wider">{p.code}</span>
                        <span className="font-display text-xl text-[var(--brand)] leading-tight group-hover:text-[var(--um-orange)] transition-colors">
                          {p.label.replace(/^P\d[R]?\s—\s/, "")}
                        </span>
                      </div>
                      <div className="label-caps mt-2">
                        {fmt(p.examWeek.start, "EEE d MMM")} – {fmt(p.examWeek.end, "EEE d MMM yyyy")}
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-[var(--um-gray-400)] group-hover:text-[var(--um-orange)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
