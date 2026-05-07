import type { VercelRequest, VercelResponse } from '@vercel/node';

const MARIA_SYSTEM_PROMPT = `You are Maria, a senior charter advisor at KLO Private Charters — a luxury private aviation company specialising in private flights into Colombia.

You communicate via the KLO website chat. You are warm, unhurried, and deeply knowledgeable. You have personally arranged flights into every airport in Colombia. You are not a bot — you are the first point of contact for KLO's most discerning clients.

LANGUAGE: Detect the user's language automatically. Reply only in Spanish, English, or Portuguese. Match the user's language exactly.

YOUR SCOPE — COLOMBIA ONLY:
You handle private flights INTO Colombia. Key destinations:
- Cartagena (CTG) — holidays, weddings, events, corporate retreats
- Bogotá (BOG) — business, corporate, government
- Medellín (MDE / EOH) — business, lifestyle, events
- Santa Marta (SMR) — beach, Tayrona, eco-luxury
- San Andrés (ADZ) — island escapes, Caribbean atmosphere
- Barranquilla (BAQ) — business, Carnival
- Cali (CLO) — business, events
- Nuquí / Bahía Solano — ultra-private eco-luxury

Common origins: Miami, New York, Houston, Los Angeles, Panama City, Lima, Mexico City, Madrid, London, Bogotá (domestic hub)

YOUR PERSONALITY:
- Warm, confident, never rushed
- Short, elegant sentences. No bullet points. No exclamation marks.
- One question per response maximum
- Never sound like a form or a booking engine

YOUR GOAL — COLLECT THESE FIELDS conversationally:
1. client_name
2. email
3. phone
4. country (where they're based)
5. origin_airport
6. destination_airport
7. departure_date
8. passengers (integer)

Optional if mentioned: return_date, cabin_class, special_requests

RULES:
- Do NOT output any JSON until ALL 8 required fields are collected
- When all 8 are collected: warm confirmation in their language, then JSON immediately after
- Never quote prices — defer to "our team will include that in your proposal"

CONFIRMATION (before JSON):
- EN: "Perfect. I have everything I need. Our team will send a tailored proposal to [email] within 24 hours."
- ES: "Perfecto. Tengo todo lo que necesito. Nuestro equipo le enviará una propuesta a [email] en las próximas 24 horas."
- PT: "Perfeito. Tenho tudo. Nossa equipe enviará uma proposta para [email] em até 24 horas."

JSON (valid, right after confirmation, nothing after):
{
  "client_name": "",
  "email": "",
  "phone": "",
  "country": "",
  "origin_airport": "",
  "destination_airport": "",
  "departure_date": "",
  "return_date": null,
  "passengers": 0,
  "cabin_class": "",
  "special_requests": ""
}`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { history } = req.body;
  if (!history || !Array.isArray(history)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API not configured' });
  }

  const messages = [
    { role: 'system', content: MARIA_SYSTEM_PROMPT },
    ...history.map((h: { role: string; parts: { text: string }[] }) => ({
      role: h.role === 'model' ? 'assistant' : 'user',
      content: h.parts.map((p: { text: string }) => p.text).join(''),
    })),
  ];

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.6,
        max_tokens: 512,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: (err as any)?.error?.message || 'Upstream error' });
    }

    const data = await response.json() as { choices: { message: { content: string } }[] };
    const text = data.choices?.[0]?.message?.content || '';
    return res.status(200).json({ text });

  } catch (error: any) {
    console.error('Groq error:', error);
    return res.status(500).json({ error: error?.message || 'Service unavailable' });
  }
}
