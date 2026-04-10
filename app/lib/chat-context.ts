// Builds a condensed knowledge base string that gets sent to Claude as system context.
// Kept under ~30k chars so it fits comfortably in the context window with room for conversation.

import { PROCEDURES } from "./procedures";
import { GLOSSARY } from "./glossary";
import { REGULATIONS } from "./regulations";
import { RULES_OF_PROCEDURE } from "./rules-of-procedure";
import { CONTACTS, SYSTEMS, SAP_CODES, KEY_RULES, CHECKLIST } from "./data";
import { TV_PHASES, TV_COMMON_ISSUES } from "./testvision";

function section(title: string, content: string) {
  return `\n## ${title}\n${content}\n`;
}

export function buildContext(): string {
  const parts: string[] = [];

  // Contacts
  parts.push(section("KEY CONTACTS", CONTACTS.map(c => `- ${c.name}: ${c.contact} — ${c.when}`).join("\n")));

  // Systems
  parts.push(section("SYSTEMS", SYSTEMS.map(s => `- ${s.system} (${s.url}): ${s.use}`).join("\n")));

  // SAP codes
  parts.push(section("SAP TRANSACTION CODES", SAP_CODES.map(s => `- ${s.code}: ${s.purpose}. ${s.inputs}`).join("\n")));

  // Key rules
  parts.push(section("GRADING RULES", KEY_RULES.grading.join("\n")));
  parts.push(section("EXAM RULES", KEY_RULES.exams.join("\n")));
  parts.push(section("STUDENT ENTRY RULES", KEY_RULES.studentEntry.join("\n")));

  // Checklist
  parts.push(section("PER-PERIOD CHECKLIST (T-relative to exam week)", CHECKLIST.map(c => `- ${c.whenLabel}: ${c.task} [${c.category}]`).join("\n")));

  // Procedures (condensed)
  parts.push(section("PROCEDURES",
    PROCEDURES.map(p => {
      const steps = p.steps.map((s, i) => `  Step ${i+1} — ${s.title}: ${s.bullets.join("; ")}`).join("\n");
      const warn = p.warnings?.length ? `  ⚠ ${p.warnings.join("; ")}` : "";
      return `### §${p.id} ${p.title}\n${p.intro ?? ""}\n${steps}${warn ? "\n" + warn : ""}`;
    }).join("\n\n")
  ));

  // Regulations (EER)
  parts.push(section("EER REGULATIONS",
    REGULATIONS.map(r => `- Art. ${r.id} ${r.title}: ${r.summary}${r.implication ? ` → In practice: ${r.implication}` : ""}`).join("\n")
  ));

  // Rules of Procedure
  parts.push(section("RULES OF PROCEDURE (EXAM DAY)",
    RULES_OF_PROCEDURE.map(r => `- ${r.id} ${r.title}: ${r.summary}${r.implication ? ` → In practice: ${r.implication}` : ""}`).join("\n")
  ));

  // Glossary
  parts.push(section("GLOSSARY",
    GLOSSARY.map(t => `- ${t.term}${t.aliases?.length ? ` (${t.aliases.join(", ")})` : ""}: ${t.short} — ${t.long}`).join("\n")
  ));

  // TestVision workflow
  parts.push(section("TESTVISION WORKFLOW",
    TV_PHASES.map(phase =>
      `### Phase: ${phase.title} (${phase.when})\n` +
      phase.steps.map(s =>
        `- ${s.title}: ${s.bullets.join("; ")}${s.warning ? ` ⚠ ${s.warning}` : ""}`
      ).join("\n")
    ).join("\n\n")
  ));

  parts.push(section("TESTVISION COMMON ISSUES",
    TV_COMMON_ISSUES.map(i => `- Problem: ${i.problem}. Cause: ${i.cause}. Fix: ${i.fix}`).join("\n")
  ));

  return parts.join("\n");
}

export const SYSTEM_PROMPT = `You are the MSP Exams Office Assistant — an expert on exam coordination at the Maastricht Science Programme (MSP), part of the Faculty of Science and Engineering at Maastricht University.

You have access to the complete operations manual, all procedures, regulations (EER and Rules of Procedure), glossary, TestVision workflow, contacts, SAP codes, and checklists.

Guidelines:
- Answer questions about exam coordination clearly and concisely.
- Reference specific procedures (§4.1, §4.2 etc), regulations (Art. 5.2, RoP-13 etc), or glossary terms when relevant.
- If something is the Board of Examiners' decision (not yours), say so.
- If you're not sure about something, say so — don't make things up.
- Use plain language. The person asking may be new to the role.
- Keep answers focused and practical. Lead with what to DO, then explain why.
- You can reference specific contacts (e.g. "email Anja Ronken at toetsen@") when relevant.
- Dates and deadlines are T-relative to exam week unless specified otherwise.

You are part of the MSP Exams Office web app. The user can also search the app directly, check checklists, browse procedures etc. Point them to specific pages when useful (e.g. "check the Procedures page, §4.10 for the full ANDIDRUK steps").`;
