"use client";
import { useEffect, useState } from "react";
import { PHYSICAL_CHECKLISTS, TV_CREDENTIALS } from "@/lib/checklists";
import { Printer, RotateCcw, Check } from "lucide-react";

export default function ChecklistsPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try { const raw = localStorage.getItem("msp-physical-checks"); if (raw) setChecked(JSON.parse(raw)); } catch {}
  }, []);
  useEffect(() => { localStorage.setItem("msp-physical-checks", JSON.stringify(checked)); }, [checked]);

  return (
    <div className="stagger space-y-10">
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="section-marker">01 / ON THE GROUND</div>
          <h1 className="font-display text-5xl text-[var(--brand)] mt-2 leading-[0.95]">
            Checklists<span className="text-[var(--um-orange)]">.</span>
          </h1>
          <p className="text-sm text-[var(--muted)] mt-3 max-w-2xl">Boxes, carts, and on-day procedures.</p>
        </div>
        <div className="flex gap-2 no-print">
          <button onClick={() => setChecked({})}
                  className="label-caps inline-flex items-center gap-1.5 hover:text-[var(--um-orange)] transition-colors">
            <RotateCcw size={11} /> Reset
          </button>
          <button onClick={() => window.print()}
                  className="label-caps inline-flex items-center gap-1.5 hover:text-[var(--um-orange)] transition-colors">
            <Printer size={11} /> Print
          </button>
        </div>
      </header>

      {PHYSICAL_CHECKLISTS.map((cl, ci) => (
        <section key={cl.id} className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <div className="md:sticky md:top-6">
              <div className="section-marker">0{ci + 2} / CHECKLIST</div>
              <h2 className="font-display text-2xl text-[var(--brand)] leading-tight mt-1">
                {cl.title.split(" — ")[0]}<span className="text-[var(--um-orange)]">.</span>
              </h2>
              {cl.title.includes("—") && (
                <p className="label-caps mt-1.5">{cl.title.split(" — ")[1]}</p>
              )}
            </div>
          </div>

          <div className="col-span-12 md:col-span-9 md:border-l md:border-[var(--border)] md:pl-6 space-y-6">
            {cl.groups.map(g => (
              <div key={g.name}>
                <div className="label-caps mb-3 pb-2 border-b border-[var(--um-gray-300)]">{g.name}</div>
                <ul>
                  {g.items.map((item, i) => {
                    const key = `${cl.id}-${g.name}-${i}`;
                    const isDone = !!checked[key];
                    return (
                      <li key={key} className="flex items-start gap-3 py-2 border-b border-dotted border-[var(--um-gray-300)]">
                        <button
                          onClick={() => setChecked(s => ({ ...s, [key]: !s[key] }))}
                          className={`shrink-0 mt-0.5 h-4 w-4 rounded-sm border-2 flex items-center justify-center transition-all ${
                            isDone
                              ? "bg-[var(--brand)] border-[var(--brand)] text-white"
                              : "border-[var(--um-gray-300)] hover:border-[var(--brand)]"
                          }`}
                        >
                          {isDone && <Check size={10} strokeWidth={3} />}
                        </button>
                        <span className={`text-sm leading-snug ${isDone ? "line-through text-[var(--muted)]" : "text-[var(--brand)]"}`}>
                          {item}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Credentials */}
      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="section-marker">0{PHYSICAL_CHECKLISTS.length + 2} / CREDENTIALS</div>
          <h2 className="font-display text-2xl text-[var(--brand)] leading-tight mt-1">
            TV SPAR<span className="text-[var(--um-orange)]">.</span>
          </h2>
          <p className="label-caps mt-1.5">UNS50 fallback login</p>
        </div>
        <div className="col-span-12 md:col-span-9 md:border-l md:border-[var(--border)] md:pl-6">
          <dl className="space-y-3">
            {[
              ["Login username",       TV_CREDENTIALS.loginUsername],
              ["Login password",       TV_CREDENTIALS.loginPassword],
              ["Quit password (after)", TV_CREDENTIALS.quitPassword],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 border-b border-dotted border-[var(--um-gray-300)] pb-2">
                <dt className="label-caps">{k}</dt>
                <dd className="font-mono text-sm text-[var(--brand)] bg-[var(--brand-soft)] px-2 py-0.5">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ====== PRINT-OPTIMISED VERSION (hidden on screen) ====== */}
      <div className="hidden print-only">
        <div style={{ textAlign: "center", marginBottom: "12pt", borderBottom: "2pt solid black", paddingBottom: "8pt" }}>
          <div style={{ fontSize: "8pt", textTransform: "uppercase", letterSpacing: "0.15em", color: "#666" }}>
            MSP · Educational Support Department · PHS B0.005
          </div>
          <div style={{ fontSize: "22pt", fontWeight: 700, marginTop: "4pt" }}>
            Physical Checklists
          </div>
          <div style={{ fontSize: "9pt", color: "#666", marginTop: "2pt" }}>
            Print date: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>

        {PHYSICAL_CHECKLISTS.map((cl, ci) => (
          <div key={cl.id} className={ci > 0 ? "print-page-break" : ""}>
            <div className="print-checklist-title">{cl.title}</div>
            {cl.groups.map(g => (
              <div key={g.name}>
                <div className="print-group-title">{g.name}</div>
                {g.items.map((item, i) => (
                  <div key={i} className="print-item">
                    <span className="print-checkbox" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}

        <div className="print-page-break print-credentials">
          <div style={{ fontSize: "12pt", fontWeight: 700, marginBottom: "8pt" }}>
            TestVision SPAR Credentials (UNS50)
          </div>
          <div style={{ fontSize: "10pt", lineHeight: 2 }}>
            <div>Login username: <strong>{TV_CREDENTIALS.loginUsername}</strong></div>
            <div>Login password: <strong>{TV_CREDENTIALS.loginPassword}</strong></div>
            <div>Quit password (after exam): <strong>{TV_CREDENTIALS.quitPassword}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
