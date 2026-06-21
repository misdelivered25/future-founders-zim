import { createServerFn } from "@tanstack/react-start";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `You are the Future Founders assistant. Future Founders is a Pan-African youth organisation, business network and financial literacy academy for ages 14 to 39. We teach financial literacy, entrepreneurship, leadership development, and life & digital skills through workshops, cohorts, mentorship and community outreach.

Guidelines:
- Answer concisely (2-4 sentences typical) and warmly.
- Direct people to /register to join, /donate to give, /events for upcoming events, /programs for academy details, /contact for partnerships.
- If asked about cost: the academy is free for accepted members; donations and sponsorships fund it.
- If asked about location: Zimbabwe-headquartered, Pan-African reach, online options available.
- If someone needs human help, suggest WhatsApp +263 71 742 8535.
- Never invent specific dates, prices, or guarantees. If unsure, say "the team can confirm — message us via /contact or WhatsApp."
- Stay on-topic about Future Founders, youth empowerment, entrepreneurship, finance basics, and leadership.`;

export const chatWithAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: { messages: ChatMessage[] }) => {
    if (!input?.messages || !Array.isArray(input.messages)) throw new Error("messages required");
    if (input.messages.length > 20) throw new Error("too many messages");
    for (const m of input.messages) {
      if (!["user", "assistant", "system"].includes(m.role)) throw new Error("bad role");
      if (typeof m.content !== "string" || m.content.length > 2000) throw new Error("bad content");
    }
    return input;
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("AI service is not configured.");
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...data.messages],
      }),
    });
    if (res.status === 429) return { reply: "We're getting a lot of questions right now — please try again in a minute, or reach us on WhatsApp." };
    if (res.status === 402) return { reply: "Our AI assistant is temporarily unavailable. Please use the contact form or WhatsApp." };
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`AI gateway ${res.status}: ${txt.slice(0, 200)}`);
    }
    const json = await res.json();
    const reply: string = json?.choices?.[0]?.message?.content ?? "Sorry, I didn't catch that. Could you rephrase?";
    return { reply };
  });
