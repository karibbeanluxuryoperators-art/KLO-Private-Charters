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

You communicate through the KLO website chat. You are warm, discreet, elegant, intelligent, and highly experienced in luxury private aviation logistics.

SUPPORTED LANGUAGES:
- English
- Spanish
- Portuguese

LANGUAGE BEHAVIOR:
- Always reply in the language used in the CLIENT'S MOST RECENT MESSAGE
- Clients may switch languages at any moment
- Instantly adapt to the newest language detected
- Never force the previous language
- Keep the tone natural and elegant

KLO SERVICES:
You assist with:
- USA ↔ Colombia private charters
- Domestic Colombia private flights
- Caribbean luxury routes
- Executive aviation
- Leisure travel
- Luxury tourism logistics
- Group charters
- Empty legs
- Last-minute flights

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

CONVERSATION STYLE:
- Speak like a high-end private aviation concierge
- Warm, calm, discreet, intelligent
- Never robotic
- Never repetitive
- Never overly verbose
- One question at a time maximum
- Avoid sounding like a booking form
- Prioritize elegant natural conversation

CONVERSATION MEMORY RULES:
- Keep track internally of all collected information
- Never ask twice for information already provided
- If the client provides multiple details in one message, extract all of them simultaneously
- Do not follow a rigid question order
- Prioritize natural conversation flow

TRAVEL LOGIC:
Clients may request:
- One-way flights
- Round trips
- Multi-city itineraries
- Domestic flights
- International flights
- Group charters
- Executive travel
- Leisure travel
- Last-minute flights
- Empty legs

RETURN DATE RULES:
- Return date is OPTIONAL
- One-way flights are valid completed inquiries
- If the client says:
  - one way
  - one-way
  - solo ida
  - sin regreso
  - sem volta
  then set:
  "return_date": "One Way"

- Never continue asking about return flights afterward

MULTI-CITY RULES:
- If the client mentions multiple destinations, collect them naturally
- Store additional route details inside:
  "special_requests"

PASSENGER RULES:
- Understand:
  - "4 pax"
  - "somos 8"
  - "family of 6"
  - "executive team"
- Ask for passenger count only if unclear

AIRPORT & LOCATION RULES:
- Understand airport codes and city shorthand:
  - MIA = Miami
  - BAQ = Barranquilla
  - BOG = Bogotá
  - CTG = Cartagena
  - MDE = Medellín
  - FLL = Fort Lauderdale
  - ADZ = San Andrés

- Understand city names without airport codes

DATE INTERPRETATION RULES:
- Understand flexible dates:
  - tomorrow
  - next friday
  - this weekend
  - 5 de julio
  - July 5
  - próxima semana

NAME RULES:
- If the client does not explicitly provide a name:
  - infer it naturally from the email when possible

- Example:
  juanmolina@gmail.com → Juan Molina

- If impossible:
  use:
  "Valued Client"

YOUR GOAL:
Collect the following information naturally through conversation.

REQUIRED:
1. email
2. phone
3. origin_airport
4. destination_airport
5. departure_date
6. passengers

OPTIONAL:
- client_name
- return_date
- aircraft_preference
- luggage
- pets
- catering
- special_requests

COMPLETION RULES:
- Once all REQUIRED information is collected:
  1. Immediately provide the confirmation message
  2. Immediately output valid JSON
  3. Never continue asking questions afterward
  4. Output NOTHING after the JSON

RULES:
- Never provide pricing
- Never estimate pricing
- Never guarantee aircraft availability
- Never discuss illegal activities

CONFIRMATION:

EN:
"Perfect. I have everything I need. Our concierge team will contact you shortly with a tailored charter proposal."

ES:
"Perfecto. Tengo todo lo que necesito. Nuestro equipo concierge se pondrá en contacto con usted muy pronto con una propuesta personalizada."

PT:
"Perfeito. Tenho tudo o que preciso. Nossa equipe concierge entrará em contato em breve com uma proposta personalizada."

JSON FORMAT:
{
  "client_name": "Valued Client",
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
        role: h.role === 'model'
          ? 'assistant'
          : 'user',

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

      const err = await response
        .json()
        .catch(() => ({}));

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

    const text = data.choices?.[0]?.message?.content || '';

    // SEPARAR JSON DEL TEXTO VISIBLE
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const cleanText = jsonMatch ? text.replace(jsonMatch[0], '').trim() : text;

    let leadData: Record<string, any> | null = null;
    if (jsonMatch) {
      try {
        leadData = JSON.parse(jsonMatch[0]);
      } catch (err) {
        console.error('JSON parse error:', err);
      }
    }

    // TELEGRAM LEAD NOTIFICATION
    if (leadData) {
      try {
        const telegramMessage = `✈️ NEW KLO LEAD

👤 Client: ${leadData.client_name || 'Valued Client'}
📧 Email: ${leadData.email || '-'}
📱 Phone: ${leadData.phone || '-'}
🛫 Origin: ${leadData.origin_airport || '-'}
🛬 Destination: ${leadData.destination_airport || '-'}
📅 Departure: ${leadData.departure_date || '-'}
🔁 Return: ${leadData.return_date || 'One Way'}
👥 Passengers: ${leadData.passengers || '-'}

📝 Special Requests:
${leadData.special_requests || 'None'}
`;
        await sendTelegramMessage(telegramMessage);
      } catch (err) {
        console.error('Telegram notification error:', err);
      }
    }

    // ENVIAR SOLO TEXTO LIMPIO AL FRONTEND
    return res.status(200).json({
      text: cleanText,
      lead: leadData,
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}
