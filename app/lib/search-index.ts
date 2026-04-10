// Build a flat searchable index across all content in the app.

import { PROCEDURES } from "./procedures";
import { GLOSSARY } from "./glossary";
import { REGULATIONS } from "./regulations";
import { RULES_OF_PROCEDURE } from "./rules-of-procedure";
import { TEMPLATES } from "./templates";
import { CONTACTS, SYSTEMS, SAP_CODES } from "./data";
import { CHECKLIST } from "./data";
import { TV_PHASES, TV_COMMON_ISSUES } from "./testvision";
import { TESTVISION_COURSES } from "./courses";

export type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  section: string;
  href: string;
  text: string;       // flattened searchable text
};

function build(): SearchResult[] {
  const results: SearchResult[] = [];

  // Procedures
  for (const p of PROCEDURES) {
    const text = [p.title, p.intro ?? "", ...p.steps.flatMap(s => [s.title, ...s.bullets]), ...(p.warnings ?? [])].join(" ");
    results.push({ id: `proc-${p.id}`, title: `§${p.id} ${p.title}`, subtitle: p.section, section: "Procedures", href: `/procedures#${p.id}`, text });
  }

  // Glossary
  for (const t of GLOSSARY) {
    results.push({ id: `glos-${t.id}`, title: t.term, subtitle: t.short, section: "Glossary", href: `/glossary`, text: [t.term, ...(t.aliases ?? []), t.short, t.long].join(" ") });
  }

  // Regulations (EER)
  for (const r of REGULATIONS) {
    results.push({ id: `eer-${r.id}`, title: `Art. ${r.id} — ${r.title}`, subtitle: "EER", section: "Regulations", href: `/regulations`, text: [r.title, r.summary, r.implication ?? ""].join(" ") });
  }

  // Rules of Procedure
  for (const r of RULES_OF_PROCEDURE) {
    results.push({ id: `rop-${r.id}`, title: `${r.id} — ${r.title}`, subtitle: "Rules of Procedure", section: "Regulations", href: `/regulations`, text: [r.title, r.summary, r.implication ?? ""].join(" ") });
  }

  // Templates
  for (const t of TEMPLATES) {
    results.push({ id: `tmpl-${t.id}`, title: t.title, subtitle: t.when, section: "Templates", href: `/templates`, text: [t.title, t.when, t.body].join(" ") });
  }

  // Contacts
  for (const c of CONTACTS) {
    results.push({ id: `contact-${c.name}`, title: c.name, subtitle: c.contact, section: "Reference", href: `/reference`, text: [c.name, c.contact, c.when].join(" ") });
  }

  // Systems
  for (const s of SYSTEMS) {
    results.push({ id: `sys-${s.system}`, title: s.system, subtitle: s.url, section: "Reference", href: `/reference`, text: [s.system, s.url, s.use].join(" ") });
  }

  // SAP codes
  for (const s of SAP_CODES) {
    results.push({ id: `sap-${s.code}`, title: s.code, subtitle: s.purpose, section: "Reference", href: `/reference`, text: [s.code, s.purpose, s.inputs].join(" ") });
  }

  // Checklist items
  for (const c of CHECKLIST) {
    results.push({ id: `check-${c.id}`, title: c.task, subtitle: c.whenLabel, section: "Checklist", href: `/periods`, text: [c.task, c.whenLabel, c.category].join(" ") });
  }

  // TestVision
  for (const phase of TV_PHASES) {
    for (const step of phase.steps) {
      const text = [step.title, step.intro ?? "", ...step.bullets, step.warning ?? "", step.tip ?? ""].join(" ");
      results.push({ id: `tv-${step.id}`, title: step.title, subtitle: `TestVision · ${phase.title}`, section: "TestVision", href: `/testvision#tv-${step.id}`, text });
    }
  }
  for (const issue of TV_COMMON_ISSUES) {
    results.push({ id: `tv-issue-${issue.problem}`, title: issue.problem, subtitle: issue.fix, section: "TestVision", href: `/testvision`, text: [issue.problem, issue.cause, issue.fix].join(" ") });
  }

  // TestVision courses
  for (const c of TESTVISION_COURSES) {
    results.push({ id: `tvc-${c.code}`, title: `${c.code} — ${c.name}`, subtitle: c.coordinators, section: "TestVision", href: `/testvision`, text: [c.code, c.name, c.coordinators, "testvision digital exam"].join(" ") });
  }

  return results;
}

export const SEARCH_INDEX = build();
