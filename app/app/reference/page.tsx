import { CONTACTS, SYSTEMS, SAP_CODES, KEY_RULES } from "@/lib/data";
import { TermText } from "@/components/TermText";

export default function ReferencePage() {
  return (
    <div className="stagger space-y-12">
      <header>
        <div className="section-marker">01 / LIBRARY</div>
        <h1 className="font-display text-5xl text-[var(--brand)] mt-2 leading-[0.95]">
          Reference<span className="text-[var(--um-orange)]">.</span>
        </h1>
        <p className="text-sm text-[var(--muted)] mt-3 max-w-2xl">Contacts, systems, SAP codes, and key rules.</p>
      </header>

      {/* Contacts */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-6">
            <div className="section-marker">02 / PEOPLE</div>
            <h2 className="font-display text-2xl text-[var(--brand)] leading-tight mt-1">
              Contacts<span className="text-[var(--um-orange)]">.</span>
            </h2>
            <p className="label-caps mt-1.5">{CONTACTS.length} entries</p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9 md:border-l md:border-[var(--border)] md:pl-6">
          <ul>
            {CONTACTS.map(c => (
              <li key={c.name} className="grid sm:grid-cols-3 gap-2 py-3 border-b border-dotted border-[var(--um-gray-300)]">
                <div className="font-display text-base text-[var(--brand)] leading-tight">
                  <TermText>{c.name}</TermText>
                </div>
                <div className="font-mono text-[11px] text-[var(--um-orange)] break-all self-center">{c.contact}</div>
                <div className="text-xs text-[var(--muted)] leading-snug self-center"><TermText>{c.when}</TermText></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Systems */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-6">
            <div className="section-marker">03 / TOOLS</div>
            <h2 className="font-display text-2xl text-[var(--brand)] leading-tight mt-1">
              Systems<span className="text-[var(--um-orange)]">.</span>
            </h2>
            <p className="label-caps mt-1.5">{SYSTEMS.length} systems</p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9 md:border-l md:border-[var(--border)] md:pl-6">
          <ul>
            {SYSTEMS.map(s => (
              <li key={s.system} className="grid sm:grid-cols-3 gap-2 py-3 border-b border-dotted border-[var(--um-gray-300)]">
                <div className="font-display text-base text-[var(--brand)] leading-tight">
                  <TermText>{s.system}</TermText>
                </div>
                <div className="font-mono text-[11px] break-all self-center">
                  {s.url.startsWith("http")
                    ? <a href={s.url} target="_blank" className="text-[var(--um-orange)] hover:underline">{s.url}</a>
                    : <span className="text-[var(--muted)]">{s.url}</span>}
                </div>
                <div className="text-xs text-[var(--muted)] leading-snug self-center"><TermText>{s.use}</TermText></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SAP codes */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-6">
            <div className="section-marker">04 / SAP</div>
            <h2 className="font-display text-2xl text-[var(--brand)] leading-tight mt-1">
              Transactions<span className="text-[var(--um-orange)]">.</span>
            </h2>
            <p className="label-caps mt-1.5">{SAP_CODES.length} codes</p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9 md:border-l md:border-[var(--border)] md:pl-6">
          <ul>
            {SAP_CODES.map(s => (
              <li key={s.code} className="py-3 border-b border-dotted border-[var(--um-gray-300)]">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-mono text-[12px] font-semibold text-[var(--um-orange)] tracking-wider">{s.code}</span>
                  <span className="font-display text-base text-[var(--brand)] leading-tight">{s.purpose}</span>
                </div>
                <div className="mt-1.5 text-xs text-[var(--muted)] leading-relaxed">{s.inputs}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Rules */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-6">
            <div className="section-marker">05 / DOGMA</div>
            <h2 className="font-display text-2xl text-[var(--brand)] leading-tight mt-1">
              Key rules<span className="text-[var(--um-orange)]">.</span>
            </h2>
            <p className="label-caps mt-1.5">non-negotiables</p>
          </div>
        </div>
        <div className="col-span-12 md:col-span-9 md:border-l md:border-[var(--border)] md:pl-6 grid gap-6 md:grid-cols-3">
          {([
            ["Grading", KEY_RULES.grading],
            ["Exams", KEY_RULES.exams],
            ["Student entry", KEY_RULES.studentEntry],
          ] as const).map(([title, rules]) => (
            <div key={title}>
              <h3 className="font-display text-lg text-[var(--brand)] leading-tight border-b-2 border-[var(--brand)] pb-2 mb-3">
                {title}<span className="text-[var(--um-orange)]">.</span>
              </h3>
              <ul className="space-y-2 text-xs text-[var(--brand)]">
                {rules.map(r => (
                  <li key={r} className="leading-snug pl-3 relative before:absolute before:left-0 before:top-[0.45rem] before:h-1 before:w-1 before:rounded-full before:bg-[var(--um-orange)]">{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
