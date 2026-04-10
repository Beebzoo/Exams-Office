import Anthropic from "@anthropic-ai/sdk";
import { buildContext, SYSTEM_PROMPT } from "@/lib/chat-context";
import { SEARCH_INDEX } from "@/lib/search-index";

export const runtime = "nodejs";

// Simple keyword search fallback when no API key is configured
function searchFallback(query: string): string {
  const words = query.toLowerCase().split(/\s+/);
  const scored = SEARCH_INDEX.map(r => {
    const hay = (r.title + " " + r.subtitle + " " + r.text).toLowerCase();
    let score = 0;
    for (const w of words) {
      if (r.title.toLowerCase().includes(w)) score += 10;
      else if (r.subtitle.toLowerCase().includes(w)) score += 5;
      else if (hay.includes(w)) score += 1;
    }
    return { r, score };
  }).filter(s => s.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);

  if (scored.length === 0) {
    return "I couldn't find anything matching your question in the manual. Try rephrasing, or use the search (Cmd+K) to browse.";
  }

  let out = "I don't have an AI connection right now, but here's what I found in the manual:\n\n";
  for (const { r } of scored) {
    out += `**${r.title}** (${r.section})\n${r.subtitle}\n→ See: ${r.href}\n\n`;
  }
  out += "_To get full AI-powered answers, add an Anthropic API key to `.env.local`._";
  return out;
}

export async function POST(req: Request) {
  const { messages } = await req.json() as {
    messages: { role: "user" | "assistant"; content: string }[];
  };

  const lastUserMessage = messages.filter(m => m.role === "user").pop()?.content ?? "";

  // Check for API key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Fallback: keyword search
    const answer = searchFallback(lastUserMessage);
    return new Response(JSON.stringify({ content: answer, fallback: true }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Build context on first call (it's static data, fast to rebuild)
  const knowledgeBase = buildContext();

  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: SYSTEM_PROMPT + "\n\n--- KNOWLEDGE BASE ---\n" + knowledgeBase,
    messages: messages.map(m => ({ role: m.role, content: m.content })),
  });

  const text = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map(b => b.text)
    .join("");

  return new Response(JSON.stringify({ content: text, fallback: false }), {
    headers: { "Content-Type": "application/json" },
  });
}
