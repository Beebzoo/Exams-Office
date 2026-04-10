"use client";
import { useMemo, useState } from "react";
import { REGULATIONS, CATEGORY_LABELS, type Regulation } from "@/lib/regulations";
import { RULES_OF_PROCEDURE } from "@/lib/rules-of-procedure";
import { Search, Scale, AlertTriangle } from "lucide-react";

// Tag/chip background — soft fill, colored text
const CAT_TAG: Record<Regulation["category"], string> = {
  exams:      "bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:ring-blue-900",
  grading:    "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900",
  attendance: "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900",
  fraud:      "bg-red-50 text-red-700 ring-1 ring-red-200 dark:bg-red-950/40 dark:text-red-300 dark:ring-red-900",
  students:   "bg-purple-50 text-purple-700 ring-1 ring-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:ring-purple-900",
  graduation: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:ring-indigo-900",
  process:    "bg-pink-50 text-pink-700 ring-1 ring-pink-200 dark:bg-pink-950/40 dark:text-pink-300 dark:ring-pink-900",
};

// Card left border + top accent line per category
const CAT_ACCENT: Record<Regulation["category"], { border: string; bar: string; iconBg: string; iconText: string }> = {
  exams:      { border: "border-l-blue-400 dark:border-l-blue-500",       bar: "bg-blue-400",      iconBg: "bg-blue-50 dark:bg-blue-950/40",      iconText: "text-blue-600 dark:text-blue-300" },
  grading:    { border: "border-l-emerald-400 dark:border-l-emerald-500", bar: "bg-emerald-400",   iconBg: "bg-emerald-50 dark:bg-emerald-950/40", iconText: "text-emerald-600 dark:text-emerald-300" },
  attendance: { border: "border-l-amber-400 dark:border-l-amber-500",     bar: "bg-amber-400",     iconBg: "bg-amber-50 dark:bg-amber-950/40",    iconText: "text-amber-600 dark:text-amber-300" },
  fraud:      { border: "border-l-red-400 dark:border-l-red-500",         bar: "bg-red-400",       iconBg: "bg-red-50 dark:bg-red-950/40",        iconText: "text-red-600 dark:text-red-300" },
  students:   { border: "border-l-purple-400 dark:border-l-purple-500",   bar: "bg-purple-400",    iconBg: "bg-purple-50 dark:bg-purple-950/40",  iconText: "text-purple-600 dark:text-purple-300" },
  graduation: { border: "border-l-indigo-400 dark:border-l-indigo-500",   bar: "bg-indigo-400",    iconBg: "bg-indigo-50 dark:bg-indigo-950/40",  iconText: "text-indigo-600 dark:text-indigo-300" },
  process:    { border: "border-l-pink-400 dark:border-l-pink-500",       bar: "bg-pink-400",      iconBg: "bg-pink-50 dark:bg-pink-950/40",      iconText: "text-pink-600 dark:text-pink-300" },
};

type Doc = "eer" | "rop";

const DOCS: { id: Doc; marker: string; label: string; full: string }[] = [
  { id: "eer", marker: "EER", label: "Education & Examination Regulations", full: "EER 2025–2026 — the legal framework for assessment, grading, and student rights." },
  { id: "rop", marker: "RoP", label: "Rules of Procedure", full: "UM-wide rules for on-the-day exam conduct: identity, materials, toilets, fraud." },
];

export default function RegulationsPage() {
  const [q, setQ] = useState("");
  const [activeCat, setActiveCat] = useState<Regulation["category"] | "all">("all");
  const [activeDoc, setActiveDoc] = useState<Doc>("eer");

  const source = activeDoc === "eer" ? REGULATIONS : RULES_OF_PROCEDURE;

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return source.filter(r => {
      if (activeCat !== "all" && r.category !== activeCat) return false;
      if (!needle) return true;
      return (
        r.id.includes(needle) ||
        r.title.toLowerCase().includes(needle) ||
        r.summary.toLowerCase().includes(needle) ||
        r.implication?.toLowerCase().includes(needle)
      );
    });
  }, [q, activeCat, source]);

  const high = filtered.filter(r => r.importance === "high");
  const medium = filtered.filter(r => r.importance === "medium");

  return (
    <div className="stagger space-y-10">
      <header>
        <div className="section-marker">01 / LEGAL BASIS</div>
        <h1 className="font-display text-5xl text-[var(--brand)] mt-2 leading-[0.95]">
          Regulations<span className="text-[var(--um-orange)]">.</span>
        </h1>
        <p className="text-sm text-[var(--muted)] mt-3 max-w-2xl">
          Two documents govern exam coordination: the EER (what gets graded, when, and who decides)
          and the Rules of Procedure (what happens inside the exam room on the day).
        </p>
      </header>

      {/* Document switcher */}
      <div className="grid sm:grid-cols-2 gap-3">
        {DOCS.map(doc => (
          <button
            key={doc.id}
            onClick={() => { setActiveDoc(doc.id); setActiveCat("all"); }}
            className={`text-left bg-[var(--card)] border border-[var(--border)] border-t-2 rounded-sm p-4 transition-colors ${
              activeDoc === doc.id
                ? "border-t-[var(--um-orange)] ring-2 ring-[var(--um-orange)]/20"
                : "border-t-[var(--brand)] hover:border-t-[var(--um-orange)]"
            }`}
          >
            <div className="flex items-baseline gap-2">
              <span className={`font-mono text-[12px] font-semibold tracking-wider ${activeDoc === doc.id ? "text-[var(--um-orange)]" : "text-[var(--um-gray-400)]"}`}>{doc.marker}</span>
              <span className="font-display text-lg text-[var(--brand)] leading-tight">{doc.label}</span>
            </div>
            <p className="label-caps mt-2">{doc.full}</p>
          </button>
        ))}
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
        <input
          type="search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder={`Search ${activeDoc === "eer" ? "EER" : "Rules of Procedure"} (e.g. '${activeDoc === "eer" ? "rounding" : "toilet"}', '${activeDoc === "eer" ? "inspection" : "phone"}')…`}
          className="w-full bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--brand)] rounded-sm pl-9 pr-3 py-3 text-sm focus:outline-none focus:border-[var(--um-orange)] focus:border-t-[var(--um-orange)] transition-colors"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <CategoryChip label="All" active={activeCat === "all"} onClick={() => setActiveCat("all")} count={source.length} />
        {(Object.keys(CATEGORY_LABELS) as Regulation["category"][])
          .filter(c => source.some(r => r.category === c))
          .map(c => (
            <CategoryChip
              key={c}
              label={CATEGORY_LABELS[c]}
              active={activeCat === c}
              onClick={() => setActiveCat(c)}
              count={source.filter(r => r.category === c).length}
              colorClass={CAT_TAG[c]}
            />
          ))}
      </div>

      {high.length > 0 && (
        <section>
          <div className="border-b-2 border-[var(--brand)] pb-3 mb-5">
            <div className="section-marker">02 / CORE</div>
            <h2 className="font-display text-3xl text-[var(--brand)] leading-tight mt-1">
              Core articles<span className="text-[var(--um-orange)]">.</span>
            </h2>
            <p className="label-caps mt-1.5 tabular-nums">{high.length} entries</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {high.map(r => <RegulationCard key={r.id} r={r} />)}
          </div>
        </section>
      )}

      {medium.length > 0 && (
        <section>
          <div className="border-b-2 border-[var(--brand)] pb-3 mb-5">
            <div className="section-marker">03 / SUPPORTING</div>
            <h2 className="font-display text-3xl text-[var(--brand)] leading-tight mt-1">
              Good to know<span className="text-[var(--um-orange)]">.</span>
            </h2>
            <p className="label-caps mt-1.5 tabular-nums">{medium.length} entries</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {medium.map(r => <RegulationCard key={r.id} r={r} />)}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <div className="rounded-sm border border-dashed border-[var(--border)] p-8 text-sm text-[var(--muted)] text-center">
          No regulations match.
        </div>
      )}

      <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider pt-4 border-t border-[var(--border)]">
        {activeDoc === "eer"
          ? "Source: MSLAS Education and Examination Regulations 2025–2026 · For the authoritative text, consult the PDF."
          : "Source: Rules of Procedure for (Course) Exams at UM 2025–2026 · Adopted 10 Sep 2025 · For the authoritative text, consult the PDF."}
      </div>
    </div>
  );
}

function CategoryChip({
  label, active, onClick, count, colorClass,
}: { label: string; active: boolean; onClick: () => void; count: number; colorClass?: string }) {
  // Active state keeps the category color and adds a ring + bold (no white-flip).
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

function RegulationCard({ r }: { r: Regulation }) {
  const accent = CAT_ACCENT[r.category];
  return (
    <article className={`group relative bg-[var(--card)] border border-[var(--border)] border-l-4 ${accent.border} border-t-2 border-t-[var(--brand)] rounded-sm p-5 pl-6 hover:border-t-[var(--um-orange)] transition-colors`}>
      <div className="flex items-start gap-3">
        <div className={`shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-sm ${accent.iconBg} ${accent.iconText}`}>
          <Scale size={18} strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[11px] text-[var(--um-orange)] font-semibold tracking-wider">
              Art. {r.id}
            </span>
            <span className={`label-caps !text-[9px] px-2 py-0.5 rounded-sm font-semibold ${CAT_TAG[r.category]}`}>
              {CATEGORY_LABELS[r.category]}
            </span>
          </div>
          <h3 className="mt-1 font-display text-xl text-[var(--brand)] leading-tight">{r.title}</h3>
        </div>
      </div>

      <p className="mt-4 text-sm text-[var(--brand)] leading-relaxed">{r.summary}</p>

      {r.implication && (
        <div className="mt-4 border-l-2 border-[var(--um-orange)] bg-[var(--um-orange)]/5 pl-3 py-2 flex items-start gap-2 text-xs text-[var(--brand)]">
          <AlertTriangle size={12} className="mt-0.5 shrink-0 text-[var(--um-orange)]" />
          <span><span className="label-caps !text-[9px]">In practice </span>{r.implication}</span>
        </div>
      )}
    </article>
  );
}
