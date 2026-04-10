"use client";
import { useMemo, useState } from "react";
import { TEMPLATES } from "@/lib/templates";
import { Copy, Check } from "lucide-react";

export default function TemplatesPage() {
  const [activeId, setActiveId] = useState(TEMPLATES[0].id);
  const active = TEMPLATES.find(t => t.id === activeId)!;
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const filled = useMemo(() => {
    let body = active.body;
    for (const f of active.fields) {
      const v = values[f];
      if (v) body = body.split(f).join(v);
    }
    return body;
  }, [active, values]);

  const copy = async () => {
    await navigator.clipboard.writeText(filled);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="stagger space-y-10">
      <header>
        <div className="section-marker">01 / COMMUNICATIONS</div>
        <h1 className="font-display text-5xl text-[var(--brand)] mt-2 leading-[0.95]">
          Templates<span className="text-[var(--um-orange)]">.</span>
        </h1>
        <p className="text-sm text-[var(--muted)] mt-3 max-w-2xl">Fill in the bracketed fields, then copy to clipboard.</p>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Template list (left rail) */}
        <aside className="col-span-12 md:col-span-4">
          <div className="section-marker mb-3">02 / TEMPLATES</div>
          <ul className="border-t-2 border-[var(--brand)]">
            {TEMPLATES.map((t, i) => {
              const isActive = t.id === activeId;
              return (
                <li key={t.id}>
                  <button
                    onClick={() => { setActiveId(t.id); setValues({}); }}
                    className={`group block w-full text-left grid grid-cols-[auto_1fr] gap-3 py-3 px-2 -mx-2 border-b border-dotted border-[var(--um-gray-300)] transition-colors ${
                      isActive ? "bg-[var(--brand-soft)]" : "hover:bg-[var(--um-gray-50)]"
                    }`}
                  >
                    <span className={`section-marker tabular-nums ${isActive ? "!text-[var(--um-orange)]" : "!text-[var(--um-gray-400)]"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className={`font-display text-base leading-tight transition-colors ${
                        isActive ? "text-[var(--um-orange)]" : "text-[var(--brand)] group-hover:text-[var(--um-orange)]"
                      }`}>{t.title}</div>
                      <div className="label-caps mt-1 !text-[9px]">{t.when}</div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Template editor (right) */}
        <div className="col-span-12 md:col-span-8 md:border-l md:border-[var(--border)] md:pl-6 space-y-6">
          <section>
            <div className="section-marker">03 / FIELDS</div>
            <h2 className="font-display text-2xl text-[var(--brand)] mt-1 leading-tight">
              {active.title}<span className="text-[var(--um-orange)]">.</span>
            </h2>
            <p className="label-caps mt-2">{active.when}</p>

            {active.attachments && (
              <div className="mt-4 border-l-2 border-[var(--um-light-blue)] pl-3 py-1">
                <div className="label-caps !text-[9px]">Attach</div>
                <div className="text-xs text-[var(--brand)] mt-1">{active.attachments.join(" · ")}</div>
              </div>
            )}

            {active.fields.length > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {active.fields.map(f => (
                  <label key={f} className="block">
                    <span className="label-caps font-mono !text-[10px] !tracking-[0.05em]">{f}</span>
                    <input
                      type="text"
                      value={values[f] ?? ""}
                      onChange={e => setValues(v => ({ ...v, [f]: e.target.value }))}
                      className="mt-1.5 w-full bg-[var(--card)] border border-[var(--border)] border-b-[var(--brand)] border-b-2 rounded-none px-2 py-1.5 text-sm focus:outline-none focus:border-b-[var(--um-orange)] transition-colors"
                    />
                  </label>
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="flex items-end justify-between border-b-2 border-[var(--brand)] pb-2">
              <div>
                <div className="section-marker">04 / OUTPUT</div>
                <h3 className="font-display text-2xl text-[var(--brand)] mt-1 leading-tight">
                  Email body<span className="text-[var(--um-orange)]">.</span>
                </h3>
              </div>
              <button
                onClick={copy}
                className="btn-cta inline-flex items-center gap-1.5 px-3 py-1.5 text-xs no-print rounded-sm"
              >
                {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
              </button>
            </div>
            <pre className="mt-4 whitespace-pre-wrap text-sm font-sans leading-relaxed text-[var(--brand)]">{filled}</pre>
          </section>
        </div>
      </div>
    </div>
  );
}
