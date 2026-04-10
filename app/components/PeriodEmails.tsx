"use client";
import { useState } from "react";
import { TEMPLATES, type EmailTemplate } from "@/lib/templates";
import { Copy, Check, Mail, ChevronDown, ChevronUp } from "lucide-react";
import { format, parseISO, addDays } from "date-fns";

type PeriodDates = {
  code: string;
  examWeekStart: string;
  examWeekEnd: string;
  examSubmissionDeadline?: string;
  periodStart?: string;
};

// Map of which templates are relevant per period + how to pre-fill them
function prefill(template: EmailTemplate, dates: PeriodDates): { fields: Record<string, string>; relevant: boolean } {
  const f: Record<string, string> = {};
  const code = dates.code.replace("P5R", "P5 Resit");

  // Period number
  if (template.fields.includes("[X]")) f["[X]"] = code.replace("P", "");
  if (template.fields.includes("[DATES]")) {
    f["[DATES]"] = `${format(parseISO(dates.examWeekStart), "d MMM")} – ${format(parseISO(dates.examWeekEnd), "d MMM yyyy")}`;
  }

  // Submission deadline
  if (template.fields.includes("[DATE]") && dates.examSubmissionDeadline) {
    f["[DATE]"] = format(parseISO(dates.examSubmissionDeadline), "EEEE d MMMM yyyy");
  }

  // Determine relevance
  const relevantIds: Record<string, boolean> = {
    "inform-cc": true,
    "grading-first": true,
    "grading-resit": true,
    "grades-published": true,
    "midterm-att": true,
    "student-exam-info": true,
    "student-spar": true,
  };

  return { fields: f, relevant: !!relevantIds[template.id] };
}

export function PeriodEmails({ dates }: { dates: PeriodDates }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [overrides, setOverrides] = useState<Record<string, Record<string, string>>>({});

  const templates = TEMPLATES.map(t => {
    const { fields, relevant } = prefill(t, dates);
    return { template: t, prefilled: fields, relevant };
  }).filter(t => t.relevant);

  const copyBody = async (template: EmailTemplate, prefilled: Record<string, string>) => {
    let body = template.body;
    const merged = { ...prefilled, ...(overrides[template.id] ?? {}) };
    for (const [k, v] of Object.entries(merged)) {
      if (v) body = body.split(k).join(v);
    }
    await navigator.clipboard.writeText(body);
    setCopied(template.id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <section>
      <div className="border-b-2 border-[var(--brand)] pb-3 mb-5">
        <div className="flex items-end justify-between">
          <div>
            <div className="section-marker">05 / EMAILS</div>
            <h2 className="font-display text-3xl text-[var(--brand)] leading-tight mt-1">
              Quick send<span className="text-[var(--um-orange)]">.</span>
            </h2>
          </div>
          <div className="label-caps">{templates.length} templates pre-filled</div>
        </div>
      </div>

      <div className="space-y-2">
        {templates.map(({ template, prefilled }) => {
          const isExpanded = expanded === template.id;
          const isCopied = copied === template.id;
          const myOverrides = overrides[template.id] ?? {};

          // Count unfilled fields
          let body = template.body;
          const merged = { ...prefilled, ...myOverrides };
          for (const [k, v] of Object.entries(merged)) {
            if (v) body = body.split(k).join(v);
          }
          const remaining = (body.match(/\[[^\]]+\]/g) ?? []).length;

          return (
            <div key={template.id} className="bg-[var(--card)] border border-[var(--border)] border-t-2 border-t-[var(--brand)] rounded-sm overflow-hidden hover:border-t-[var(--um-orange)] transition-colors">
              {/* Header row — always visible */}
              <button
                onClick={() => setExpanded(isExpanded ? null : template.id)}
                className="w-full flex items-center justify-between gap-4 px-5 py-3.5 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Mail size={14} className="text-[var(--um-orange)] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-[var(--brand)] truncate">{template.title}</div>
                    <div className="label-caps !text-[9px] mt-0.5">{template.when}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {remaining > 0 && (
                    <span className="text-[10px] text-[var(--um-orange)] font-mono">{remaining} fields left</span>
                  )}
                  {remaining === 0 && (
                    <span className="text-[10px] text-[var(--success)] font-mono">ready</span>
                  )}
                  {isExpanded ? <ChevronUp size={14} className="text-[var(--muted)]" /> : <ChevronDown size={14} className="text-[var(--muted)]" />}
                </div>
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="border-t border-[var(--border)] px-5 py-4 space-y-4">
                  {/* Editable fields */}
                  {template.fields.length > 0 && (
                    <div className="grid gap-2 sm:grid-cols-3">
                      {template.fields.map(f => (
                        <label key={f} className="block">
                          <span className="label-caps font-mono !text-[9px] !tracking-[0.05em]">{f}</span>
                          <input
                            type="text"
                            value={myOverrides[f] ?? prefilled[f] ?? ""}
                            onChange={e => setOverrides(o => ({
                              ...o,
                              [template.id]: { ...(o[template.id] ?? {}), [f]: e.target.value },
                            }))}
                            placeholder={prefilled[f] ?? f}
                            className="mt-1 w-full bg-[var(--background)] border border-[var(--border)] border-b-2 border-b-[var(--brand)] rounded-none px-2 py-1.5 text-xs focus:outline-none focus:border-b-[var(--um-orange)] transition-colors"
                          />
                        </label>
                      ))}
                    </div>
                  )}

                  {template.attachments && (
                    <div className="border-l-2 border-[var(--um-light-blue)] pl-3 py-1">
                      <div className="label-caps !text-[9px]">Remember to attach</div>
                      <div className="text-xs text-[var(--brand)] mt-0.5">{template.attachments.join(" · ")}</div>
                    </div>
                  )}

                  {/* Preview + copy */}
                  <div className="relative">
                    <button
                      onClick={() => copyBody(template, prefilled)}
                      className="btn-cta absolute top-2 right-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-sm"
                    >
                      {isCopied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                    </button>
                    <pre className="whitespace-pre-wrap text-xs font-sans leading-relaxed text-[var(--brand)] bg-[var(--background)] border border-[var(--border)] p-4 pr-24 max-h-60 overflow-y-auto">
                      {body}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
