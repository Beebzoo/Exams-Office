"use client";
import { useMemo, useState } from "react";
import { GLOSSARY, GLOSSARY_CATEGORIES, type GlossaryTerm } from "@/lib/glossary";
import { Search, BookOpen } from "lucide-react";
import { TermModal } from "@/components/TermText";

const CAT_ACCENT: Record<GlossaryTerm["category"], { border: string; chip: string }> = {
  people:   { border: "border-l-purple-400 dark:border-l-purple-500",  chip: "bg-purple-50 text-purple-700 ring-1 ring-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:ring-purple-900" },
  system:   { border: "border-l-blue-400 dark:border-l-blue-500",      chip: "bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900" },
  place:    { border: "border-l-pink-400 dark:border-l-pink-500",      chip: "bg-pink-50 text-pink-700 ring-1 ring-pink-200 dark:bg-pink-950/40 dark:text-pink-300 dark:ring-pink-900" },
  document: { border: "border-l-amber-400 dark:border-l-amber-500",    chip: "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900" },
  concept:  { border: "border-l-indigo-400 dark:border-l-indigo-500",  chip: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:ring-indigo-900" },
  rule:     { border: "border-l-emerald-400 dark:border-l-emerald-500",chip: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900" },
  acronym:  { border: "border-l-slate-400 dark:border-l-slate-500",    chip: "bg-slate-50 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-900/40 dark:text-slate-300 dark:ring-slate-700" },
};

export default function GlossaryPage() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState<GlossaryTerm | null>(null);
  const [activeCat, setActiveCat] = useState<GlossaryTerm["category"] | "all">("all");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return GLOSSARY.filter(t => {
      if (activeCat !== "all" && t.category !== activeCat) return false;
      if (!needle) return true;
      return (
        t.term.toLowerCase().includes(needle) ||
        (t.aliases?.some(a => a.toLowerCase().includes(needle)) ?? false) ||
        t.short.toLowerCase().includes(needle) ||
        t.long.toLowerCase().includes(needle)
      );
    });
  }, [q, activeCat]);

  // Group filtered by category
  const byCat = useMemo(() => {
    const m = new Map<GlossaryTerm["category"], GlossaryTerm[]>();
    for (const t of filtered) {
      if (!m.has(t.category)) m.set(t.category, []);
      m.get(t.category)!.push(t);
    }
    for (const list of m.values()) list.sort((a, b) => a.term.localeCompare(b.term));
    return m;
  }, [filtered]);

  return (
    <div className="stagger space-y-10">
      <header>
        <div className="section-marker">01 / ONBOARDING</div>
        <h1 className="font-display text-5xl text-[var(--brand)] mt-2 leading-[0.95]">
          Glossary<span className="text-[var(--um-orange)]">.</span>
        </h1>
        <p className="text-sm text-[var(--muted)] mt-3 max-w-2xl">
          Every acronym, system, role, and piece of jargon you&apos;ll meet in MSP exam coordination.
          Click any term anywhere in this app and an explanation will pop up.
        </p>
      </header>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search the glossary…"
          className="w-full bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--brand)] rounded-sm pl-9 pr-3 py-3 text-sm focus:outline-none focus:border-[var(--um-orange)] focus:border-t-[var(--um-orange)] transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterChip label="All" active={activeCat === "all"} onClick={() => setActiveCat("all")} count={GLOSSARY.length} />
        {(Object.keys(GLOSSARY_CATEGORIES) as GlossaryTerm["category"][]).map(c => (
          <FilterChip
            key={c}
            label={GLOSSARY_CATEGORIES[c]}
            active={activeCat === c}
            onClick={() => setActiveCat(c)}
            count={GLOSSARY.filter(t => t.category === c).length}
            colorClass={CAT_ACCENT[c].chip}
          />
        ))}
      </div>

      {[...byCat.entries()].map(([cat, terms], ci) => (
        <section key={cat} className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <div className="md:sticky md:top-6">
              <div className="section-marker">0{ci + 2} / CATEGORY</div>
              <h2 className="font-display text-2xl text-[var(--brand)] leading-tight mt-1">
                {GLOSSARY_CATEGORIES[cat]}<span className="text-[var(--um-orange)]">.</span>
              </h2>
              <p className="label-caps mt-1.5 tabular-nums">{terms.length} terms</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-9 md:border-l md:border-[var(--border)] md:pl-6 grid gap-3 sm:grid-cols-2">
            {terms.map(t => {
              const accent = CAT_ACCENT[t.category];
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t)}
                  className={`text-left bg-[var(--card)] border border-[var(--border)] border-l-4 ${accent.border} border-t-2 border-t-[var(--brand)] rounded-sm p-4 hover:border-t-[var(--um-orange)] transition-colors group`}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen size={12} className="text-[var(--um-orange)] shrink-0" />
                    <span className="font-display text-lg text-[var(--brand)] leading-tight group-hover:text-[var(--um-orange)] transition-colors">{t.term}</span>
                  </div>
                  <p className="mt-2 text-xs text-[var(--muted)] line-clamp-3 leading-relaxed">{t.short}</p>
                </button>
              );
            })}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-[var(--border)] p-8 text-sm text-[var(--muted)] text-center">
          No terms match.
        </div>
      )}

      <TermModal term={active} onClose={() => setActive(null)} />
    </div>
  );
}

function FilterChip({
  label, active, onClick, count, colorClass,
}: { label: string; active: boolean; onClick: () => void; count: number; colorClass?: string }) {
  const base = colorClass ?? "bg-[var(--card)] ring-1 ring-[var(--border)] text-[var(--foreground)]";
  return (
    <button
      onClick={onClick}
      className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all hover:scale-[1.03] ${base} ${
        active ? "ring-2 ring-offset-2 ring-offset-[var(--background)] !ring-[var(--brand)] shadow-[var(--shadow-md)] font-semibold" : ""
      }`}
    >
      {label} <span className="opacity-70 tabular-nums">· {count}</span>
    </button>
  );
}
