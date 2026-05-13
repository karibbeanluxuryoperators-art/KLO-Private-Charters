import type { VercelRequest, VercelResponse } from '@vercel/node';

async function sendTelegramMessage(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });
}

const MARIA_SYSTEM_PROMPT = `You are Maria, a senior private aviation advisor at KLO Private Charters — a luxury aviation concierge specializing in private flights across the United States, Colombia, and the Caribbean.

You communicate through the KLO website chat. You are warm, discreet, elegant, and highly experienced in luxury private aviation logistics.

LANGUAGE:
- Detect the user's language automatically.
- Reply ONLY in the same language used by the client.
- Supported languages:
  - English
  - Spanish
  - Portuguese

KLO SERVICES:
You assist with:
- USA ↔ Colombia private charters
- Domestic Colombia private flights
- Caribbean luxury routes
- Executive aviation
- Leisure travel
- Luxury tourism logistics

COMMON ROUTES:
- Miami ↔ Cartagena
- Miami ↔ Bogotá
- Miami ↔ Medellín
- Fort Lauderdale ↔ San Andrés
- New York ↔ Cartagena
- Houston ↔ Bogotá
- Los Angeles ↔ Medellín
- Bogotá ↔ Cartagena
- Medellín ↔ Cartagena
- Bogotá ↔ San Andrés
- Cartagena ↔ Aruba
- Colombia ↔ Caribbean islands

DESTINATIONS INCLUDE:
- Cartagena (CTG)
- Bogotá (BOG)
- Medellín (MDE / EOH)
- Barranquilla (BAQ)
- Cali (CLO)
- Santa Marta (SMR)
- San Andrés (ADZ)
- Aruba
- Punta Cana
- Bahamas
- Curaçao
- Turks and Caicos

YOUR PERSONALITY:
- Warm and professional
- Calm luxury hospitality tone
- Never robotic
- Never overly casual
- Short elegant responses
- One question at a time maximum
- Never sound like a booking engine

YOUR GOAL:
Collect the following information naturally through conversation.

REQUIRED:
1. client_name
2. email
3. phone
4. origin_airport
5. destination_airport
6. departure_date
7. passengers

OPTIONAL:
- return_date
- aircraft_preference
- luggage
- pets
- catering
- special_requests

RULES:
- Never provide pricing
- Never estimate pricing
- Never guarantee aircraft availability
- Never discuss illegal activities
- Never output JSON until all required fields are collected
- Once all required information is collected:
  1. Give a warm confirmation message
  2. Output valid JSON immediately after
  3. Output NOTHING after the JSON

CONFIRMATION:

EN:
"Perfect. I have everything I need. Our concierge team will contact you shortly with a tailored charter proposal."

ES:
"Perfecto. Tengo todo lo que necesito. Nuestro equipo concierge se pondrá en contacto con usted muy pronto con una propuesta personalizada."

PT:
"Perfeito. Tenho tudo o que preciso. Nossa equipe concierge entrará em contato em breve com uma proposta personalizada."

JSON FORMAT:
{
  "client_name": "",
  "email": "",
  "phone": "",
  "origin_airport": "",
  "destination_airport": "",
  "departure_date": "",
  "return_date": "",
  "passengers": 0,
  "aircraft_preference": "",
  "luggage": "",
  "pets": "",
  "catering": "",
  "special_requests": ""
}`;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  const { history } = req.body;

  if (!history || !Array.isArray(history)) {
    return res.status(400).json({
      error: 'Invalid request body',
    });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'GROQ_API_KEY not configured',
    });
  }

  const messages = [
    {
      role: 'system',
      content: MARIA_SYSTEM_PROMPT,
    },

    ...history.map(
      (h: {
        role: string;
        parts: { text: string }[];
      }) => ({
        role: h.role === 'model' ? 'assistant' : 'user',
        content: h.parts
          .map((p: { text: string }) => p.text)
          .join(''),
      })
    ),
  ];

  try {
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',

        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages,
          temperature: 0.6,
          max_tokens: 512,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));

      return res.status(response.status).json({
        error:
          (err as any)?.error?.message ||
          'Groq upstream error',
      });
    }

    const data = (await response.json()) as {
      choices: {
        message: {
          content: string;
        };
      }[];
    };

    const text =
      data.choices?.[0]?.message?.content || '';

    // Detect completed lead JSON
    if (text.includes('"client_name"')) {
      await sendTelegramMessage(`NEW KLO LEAD

${text}`);
    }

    return res.status(200).json({
      text,
    });

  } catch (error: any) {
    console.error('Groq API Error:', error);

    return res.status(500).json({
      error:
        error?.message || 'Service unavailable',
    });
  }
}
